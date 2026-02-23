/**
 * Cross-Project Pattern Detector
 * Scans across Projects, ADRs, and HLDs to find:
 * - Recurring technology choices (same system/tool in 3+ projects)
 * - Common stakeholders (people appearing in 3+ projects)
 * - Shared risk themes (same risk-related tags across projects)
 * - Common tag patterns across projects
 *
 * Reads from the graph index (.graph/index.json) for performance.
 *
 * Usage:
 *   node .claude/scripts/graph-analysis/cross-project-patterns.js
 *   node .claude/scripts/graph-analysis/cross-project-patterns.js --verbose
 *   node .claude/scripts/graph-analysis/cross-project-patterns.js --tech-threshold=2
 *   node .claude/scripts/graph-analysis/cross-project-patterns.js --stakeholder-threshold=2
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const VAULT_ROOT = join(import.meta.dirname, "../../../");
const INDEX_PATH = join(VAULT_ROOT, ".graph/index.json");
const PATTERNS_PATH = join(VAULT_ROOT, ".graph/patterns.json");

// Default thresholds — can be overridden via CLI args
const DEFAULTS = {
  techThreshold: 3, // Minimum projects for recurring technology
  stakeholderThreshold: 3, // Minimum projects for common stakeholder
  riskThreshold: 2, // Minimum projects for shared risk theme
  tagThreshold: 3, // Minimum projects for common tag pattern
};

// Risk-related keywords to detect in tags, titles, and body text
const RISK_KEYWORDS = [
  "vendor-lock-in",
  "lock-in",
  "security",
  "compliance",
  "gdpr",
  "latency",
  "availability",
  "resilience",
  "single-point-of-failure",
  "data-loss",
  "data-sovereignty",
  "cost",
  "scalability",
  "performance",
  "dependency",
  "migration",
  "legacy",
  "obsolescence",
  "downtime",
  "outage",
];

/**
 * Load the graph index
 */
function loadIndex() {
  if (!existsSync(INDEX_PATH)) {
    throw new Error(
      `Graph index not found at ${INDEX_PATH}. Run 'npm run graph:build' first.`,
    );
  }
  return JSON.parse(readFileSync(INDEX_PATH, "utf-8"));
}

/**
 * Resolve a note's project associations from multiple sources:
 * 1. relationships.projects (explicit wiki-links to Project notes)
 * 2. frontmatter.relatedTo (wiki-link references to Projects)
 * 3. frontmatter.tags matching project/* pattern
 * 4. frontmatter.project field
 *
 * Returns a Set of normalised project names.
 */
function resolveProjects(node) {
  const projects = new Set();

  // 1. Explicit project relationships from graph index
  if (node.relationships?.projects) {
    for (const proj of node.relationships.projects) {
      projects.add(normaliseProjectName(proj));
    }
  }

  // 2. relatedTo links that reference projects
  if (node.frontmatter?.relatedTo) {
    for (const rel of node.frontmatter.relatedTo) {
      const cleaned = rel.replace(/\[\[|\]\]/g, "");
      if (cleaned.startsWith("Project - ")) {
        projects.add(normaliseProjectName(cleaned));
      }
    }
  }

  // 3. project/* tags
  if (node.frontmatter?.tags) {
    for (const tag of node.frontmatter.tags) {
      if (tag.startsWith("project/")) {
        const projSlug = tag.replace("project/", "");
        projects.add(projSlug);
      }
    }
  }

  // 4. frontmatter.project field (can be string, array, or wiki-link)
  if (node.frontmatter?.project) {
    const rawProject = node.frontmatter.project;
    const projectValues = Array.isArray(rawProject) ? rawProject : [rawProject];
    for (const val of projectValues) {
      if (typeof val === "string" && val.trim()) {
        const cleaned = val.replace(/\[\[|\]\]/g, "");
        if (cleaned) {
          projects.add(normaliseProjectName(cleaned));
        }
      }
    }
  }

  return projects;
}

/**
 * Normalise project name to a consistent slug.
 * "Project - Axia" -> "axia"
 * "Project - 777-X EIS Programme" -> "777x" (maps to tag form)
 */
function normaliseProjectName(name) {
  // Strip "Project - " prefix
  let slug = name.replace(/^Project\s*-\s*/, "");

  // Known mappings from full name to tag slug
  const SLUG_MAP = {
    "777-X EIS Programme": "777x",
    "BNextGen GBST CSCT": "777x",
    BNextGen: "777x",
    Axia: "axia",
    Bravo: "axia",
    Alpha: "caerus",
    "DataHub Programme": "odie",
    DataHub: "odie",
    "SmartDispatch": "dispax-ai",
    "MaintPro": "mro-pro",
    "ToolVendor Tooling - v9 Upgrade": "snapon",
    "PLM System X SaaS": "siemens-teamcenter",
    "Supply Chain": "supply-chain",
    XBP: "xbp",
    Olympus: "olympus",
    ECP: "ecp",
  };

  if (SLUG_MAP[slug]) {
    return SLUG_MAP[slug];
  }

  // Fallback: lowercase, replace spaces with hyphens
  return slug.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Detect system/technology references from wiki-links in a node.
 * Returns system note names (e.g., "System - Kafka").
 */
function extractSystemReferences(node) {
  const systems = new Set();

  // Wiki-links to System notes
  if (node.relationships?.wikilinks) {
    for (const link of node.relationships.wikilinks) {
      if (link.startsWith("System - ") || link.startsWith("System -")) {
        systems.add(link);
      }
    }
  }

  // relatedTo links referencing systems
  if (node.frontmatter?.relatedTo) {
    for (const rel of node.frontmatter.relatedTo) {
      const cleaned = rel.replace(/\[\[|\]\]/g, "");
      if (cleaned.startsWith("System - ")) {
        systems.add(cleaned);
      }
    }
  }

  return systems;
}

/**
 * Extract technology tags from a node (technology/* hierarchy).
 */
function extractTechTags(node) {
  const techs = new Set();
  if (node.frontmatter?.tags) {
    for (const tag of node.frontmatter.tags) {
      if (tag.startsWith("technology/")) {
        techs.add(tag);
      }
    }
  }
  return techs;
}

/**
 * Extract risk-related signals from tags and title.
 */
function extractRiskThemes(node) {
  const risks = new Set();
  const allTags = node.frontmatter?.tags || [];
  const title = (node.frontmatter?.title || node.id || "").toLowerCase();

  // Check tags for risk-related keywords
  for (const tag of allTags) {
    const tagLower = tag.toLowerCase();
    for (const keyword of RISK_KEYWORDS) {
      if (tagLower.includes(keyword)) {
        risks.add(keyword);
      }
    }
  }

  // Check title for risk keywords
  for (const keyword of RISK_KEYWORDS) {
    if (title.includes(keyword.replace(/-/g, " ")) || title.includes(keyword)) {
      risks.add(keyword);
    }
  }

  return risks;
}

/**
 * Build a project-centric index: for each project, collect all associated
 * ADRs, HLDs, systems, people, tags, and risks.
 */
function buildProjectIndex(nodes) {
  const projectIndex = new Map();

  // Helper to ensure project entry exists
  function ensureProject(slug) {
    if (!projectIndex.has(slug)) {
      projectIndex.set(slug, {
        slug,
        adrs: [],
        hlds: [],
        systems: new Set(),
        techTags: new Set(),
        people: new Set(),
        risks: new Set(),
        allTags: new Set(),
      });
    }
    return projectIndex.get(slug);
  }

  // Process ADRs, HLDs, and Projects
  const relevantTypes = new Set(["ADR", "HLD", "Project", "Meeting"]);

  for (const node of nodes) {
    if (!relevantTypes.has(node.type)) continue;

    const projectSlugs = resolveProjects(node);
    if (projectSlugs.size === 0) continue;

    for (const slug of projectSlugs) {
      const proj = ensureProject(slug);

      if (node.type === "ADR") {
        proj.adrs.push(node.id);
      } else if (node.type === "HLD") {
        proj.hlds.push(node.id);
      }

      // Collect systems
      for (const sys of extractSystemReferences(node)) {
        proj.systems.add(sys);
      }

      // Collect technology tags
      for (const tech of extractTechTags(node)) {
        proj.techTags.add(tech);
      }

      // Collect people (from meetings and other notes)
      if (node.relationships?.mentionedPeople) {
        for (const person of node.relationships.mentionedPeople) {
          proj.people.add(person);
        }
      }

      // Collect risks
      for (const risk of extractRiskThemes(node)) {
        proj.risks.add(risk);
      }

      // Collect all tags (excluding project/* and type/*)
      if (node.frontmatter?.tags) {
        for (const tag of node.frontmatter.tags) {
          if (!tag.startsWith("project/") && !tag.startsWith("type/")) {
            proj.allTags.add(tag);
          }
        }
      }
    }
  }

  return projectIndex;
}

/**
 * Find recurring technologies: systems or tech tags appearing across 3+ projects.
 */
function findRecurringTechnologies(projectIndex, threshold) {
  // Count systems across projects
  const systemProjects = new Map(); // system -> Set<project slugs>
  const techTagProjects = new Map(); // tag -> Set<project slugs>

  for (const [slug, proj] of projectIndex) {
    for (const sys of proj.systems) {
      if (!systemProjects.has(sys)) systemProjects.set(sys, new Set());
      systemProjects.get(sys).add(slug);
    }
    for (const tech of proj.techTags) {
      if (!techTagProjects.has(tech)) techTagProjects.set(tech, new Set());
      techTagProjects.get(tech).add(slug);
    }
  }

  const results = [];

  // Systems meeting threshold
  for (const [system, projects] of systemProjects) {
    if (projects.size >= threshold) {
      results.push({
        system,
        projects: [...projects].sort(),
        count: projects.size,
        source: "wikilink",
      });
    }
  }

  // Tech tags meeting threshold (only if no system already covers it)
  const coveredTechs = new Set(
    results.map((r) =>
      r.system.replace("System - ", "").toLowerCase().replace(/\s+/g, "-"),
    ),
  );

  for (const [tag, projects] of techTagProjects) {
    const techName = tag.replace("technology/", "");
    if (projects.size >= threshold && !coveredTechs.has(techName)) {
      results.push({
        system: tag,
        projects: [...projects].sort(),
        count: projects.size,
        source: "tag",
      });
    }
  }

  // Sort by count descending
  results.sort((a, b) => b.count - a.count);
  return results;
}

/**
 * Find common stakeholders: people appearing across 3+ projects.
 */
function findCommonStakeholders(projectIndex, threshold) {
  const personProjects = new Map(); // person -> Set<project slugs>

  for (const [slug, proj] of projectIndex) {
    for (const person of proj.people) {
      if (!personProjects.has(person)) personProjects.set(person, new Set());
      personProjects.get(person).add(slug);
    }
  }

  const results = [];
  for (const [person, projects] of personProjects) {
    if (projects.size >= threshold) {
      results.push({
        person,
        projects: [...projects].sort(),
        count: projects.size,
      });
    }
  }

  results.sort((a, b) => b.count - a.count);
  return results;
}

/**
 * Find shared risk themes: risk keywords appearing in 2+ project contexts.
 */
function findSharedRisks(projectIndex, threshold) {
  const riskProjects = new Map(); // risk -> Set<project slugs>

  for (const [slug, proj] of projectIndex) {
    for (const risk of proj.risks) {
      if (!riskProjects.has(risk)) riskProjects.set(risk, new Set());
      riskProjects.get(risk).add(slug);
    }
  }

  const results = [];
  for (const [theme, projects] of riskProjects) {
    if (projects.size >= threshold) {
      results.push({
        theme,
        projects: [...projects].sort(),
        count: projects.size,
      });
    }
  }

  results.sort((a, b) => b.count - a.count);
  return results;
}

/**
 * Find common tag patterns: non-trivial tags shared across 3+ projects.
 * Excludes project/*, type/*, and very common tags (activity/architecture).
 */
function findCommonTagPatterns(projectIndex, threshold) {
  const EXCLUDE_TAGS = new Set([
    "activity/architecture", // Too common to be informative
    "activity/documentation",
    "synced",
  ]);

  const tagProjects = new Map(); // tag -> Set<project slugs>

  for (const [slug, proj] of projectIndex) {
    for (const tag of proj.allTags) {
      if (EXCLUDE_TAGS.has(tag)) continue;
      if (!tagProjects.has(tag)) tagProjects.set(tag, new Set());
      tagProjects.get(tag).add(slug);
    }
  }

  const results = [];
  for (const [tag, projects] of tagProjects) {
    if (projects.size >= threshold) {
      results.push({
        tag,
        projects: [...projects].sort(),
        count: projects.size,
      });
    }
  }

  results.sort((a, b) => b.count - a.count);
  return results;
}

/**
 * Convert pattern results to suggestion format compatible with suggestions.json.
 */
function patternsToSuggestions(patterns) {
  const suggestions = [];

  for (const tech of patterns.recurringTechnologies) {
    suggestions.push({
      type: "cross-project-pattern",
      subtype: "recurring-technology",
      node: tech.system,
      confidence: Math.min(1.0, tech.count / 5),
      reason: `${tech.system} appears across ${tech.count} projects (${tech.projects.join(", ")}). Consider standardisation or a shared reference architecture.`,
      projects: tech.projects,
    });
  }

  for (const stakeholder of patterns.commonStakeholders) {
    suggestions.push({
      type: "cross-project-pattern",
      subtype: "common-stakeholder",
      node: stakeholder.person,
      confidence: Math.min(1.0, stakeholder.count / 6),
      reason: `${stakeholder.person} appears across ${stakeholder.count} projects (${stakeholder.projects.join(", ")}). Key influencer — consider as reviewer for cross-cutting decisions.`,
      projects: stakeholder.projects,
    });
  }

  for (const risk of patterns.sharedRisks) {
    suggestions.push({
      type: "cross-project-pattern",
      subtype: "shared-risk",
      node: risk.theme,
      confidence: Math.min(1.0, risk.count / 4),
      reason: `Risk theme "${risk.theme}" appears across ${risk.count} projects (${risk.projects.join(", ")}). Consider a cross-cutting mitigation strategy.`,
      projects: risk.projects,
    });
  }

  return suggestions;
}

/**
 * Main detector function.
 * Returns an array of suggestion objects for inclusion in suggestions.json.
 * Also builds the full patterns object for patterns.json.
 */
export async function detectCrossProjectPatterns(options = {}) {
  const techThreshold = options.techThreshold ?? DEFAULTS.techThreshold;
  const stakeholderThreshold =
    options.stakeholderThreshold ?? DEFAULTS.stakeholderThreshold;
  const riskThreshold = options.riskThreshold ?? DEFAULTS.riskThreshold;
  const tagThreshold = options.tagThreshold ?? DEFAULTS.tagThreshold;
  const verbose = options.verbose ?? false;

  const index = loadIndex();
  const nodes = index.nodes;

  if (verbose) {
    console.log(`  Loaded ${nodes.length} nodes from graph index`);
  }

  // Build project-centric index
  const projectIndex = buildProjectIndex(nodes);

  if (verbose) {
    console.log(`  Found ${projectIndex.size} projects`);
    for (const [slug, proj] of projectIndex) {
      console.log(
        `    ${slug}: ${proj.adrs.length} ADRs, ${proj.hlds.length} HLDs, ${proj.systems.size} systems, ${proj.people.size} people`,
      );
    }
  }

  // Detect patterns
  const recurringTechnologies = findRecurringTechnologies(
    projectIndex,
    techThreshold,
  );
  const commonStakeholders = findCommonStakeholders(
    projectIndex,
    stakeholderThreshold,
  );
  const sharedRisks = findSharedRisks(projectIndex, riskThreshold);
  const commonTagPatterns = findCommonTagPatterns(projectIndex, tagThreshold);

  // Build patterns object
  const patterns = {
    generatedAt: new Date().toISOString(),
    thresholds: {
      technology: techThreshold,
      stakeholder: stakeholderThreshold,
      risk: riskThreshold,
      tag: tagThreshold,
    },
    projectCount: projectIndex.size,
    recurringTechnologies,
    commonStakeholders,
    sharedRisks,
    commonTagPatterns,
  };

  // Store patterns for later retrieval (used by index.js)
  detectCrossProjectPatterns._lastPatterns = patterns;

  // Convert to suggestions for the aggregator
  return patternsToSuggestions(patterns);
}

/**
 * Get the last computed patterns object (for writing to patterns.json).
 */
export function getLastPatterns() {
  return detectCrossProjectPatterns._lastPatterns || null;
}

/**
 * Parse CLI arguments for standalone mode.
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    verbose: false,
    techThreshold: DEFAULTS.techThreshold,
    stakeholderThreshold: DEFAULTS.stakeholderThreshold,
    riskThreshold: DEFAULTS.riskThreshold,
    tagThreshold: DEFAULTS.tagThreshold,
  };

  for (const arg of args) {
    if (arg === "--verbose" || arg === "-v") {
      config.verbose = true;
    } else if (arg.startsWith("--tech-threshold=")) {
      config.techThreshold = parseInt(arg.split("=")[1], 10);
    } else if (arg.startsWith("--stakeholder-threshold=")) {
      config.stakeholderThreshold = parseInt(arg.split("=")[1], 10);
    } else if (arg.startsWith("--risk-threshold=")) {
      config.riskThreshold = parseInt(arg.split("=")[1], 10);
    } else if (arg.startsWith("--tag-threshold=")) {
      config.tagThreshold = parseInt(arg.split("=")[1], 10);
    }
  }

  return config;
}

// Run standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  const config = parseArgs();

  console.log("\n  Cross-Project Pattern Detection");
  console.log("  ──────────────────────────────────");

  detectCrossProjectPatterns(config)
    .then((suggestions) => {
      const patterns = getLastPatterns();

      // Write patterns.json
      const outputDir = dirname(PATTERNS_PATH);
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }
      writeFileSync(PATTERNS_PATH, JSON.stringify(patterns, null, 2));

      // Summary output
      console.log(`  Projects analysed: ${patterns.projectCount}`);
      console.log(
        `  Recurring technologies: ${patterns.recurringTechnologies.length}`,
      );
      console.log(
        `  Common stakeholders: ${patterns.commonStakeholders.length}`,
      );
      console.log(`  Shared risks: ${patterns.sharedRisks.length}`);
      console.log(
        `  Common tag patterns: ${patterns.commonTagPatterns.length}`,
      );
      console.log(`  Total suggestions: ${suggestions.length}`);
      console.log(`\n  Output: ${PATTERNS_PATH}`);

      if (config.verbose) {
        console.log("\n  === Recurring Technologies ===");
        for (const t of patterns.recurringTechnologies) {
          console.log(
            `    ${t.system} (${t.count} projects): ${t.projects.join(", ")}`,
          );
        }

        console.log("\n  === Common Stakeholders ===");
        for (const s of patterns.commonStakeholders) {
          console.log(
            `    ${s.person} (${s.count} projects): ${s.projects.join(", ")}`,
          );
        }

        console.log("\n  === Shared Risks ===");
        for (const r of patterns.sharedRisks) {
          console.log(
            `    ${r.theme} (${r.count} projects): ${r.projects.join(", ")}`,
          );
        }

        console.log("\n  === Common Tag Patterns ===");
        for (const t of patterns.commonTagPatterns) {
          console.log(
            `    ${t.tag} (${t.count} projects): ${t.projects.join(", ")}`,
          );
        }
      }

      console.log("");
    })
    .catch((err) => {
      console.error("Error:", err.message);
      process.exit(1);
    });
}
