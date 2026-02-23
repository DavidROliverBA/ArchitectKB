/**
 * Ontology Compliance Checker
 * Validates notes follow the Seven Pillars relationship rules
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename } from "path";
import matter from "gray-matter";

const VAULT_ROOT = join(import.meta.dirname, "../../../");

// Directories to skip
const SKIP_DIRS = [
  ".obsidian",
  ".git",
  ".graph",
  ".claude",
  "node_modules",
  "Templates",
  "Archive",
  "Attachments",
];

// Ontology rules by type
const ONTOLOGY_RULES = {
  // Events should link to entities (people involved)
  Meeting: {
    shouldHave: ["entityRelationships"],
    condition: (data) => data.attendees && data.attendees.length > 0,
    reason: "Meeting with attendees should have entityRelationships",
  },
  Project: {
    shouldHave: ["entityRelationships", "nodeRelationships"],
    condition: () => true,
    reason: "Project should have entity and node relationships",
  },
  ADR: {
    shouldHave: ["nodeRelationships", "entityRelationships"],
    condition: () => true,
    reason: "ADR should link to concepts/patterns and affected systems",
  },
  Task: {
    shouldHave: ["entityRelationships"],
    condition: (data) => data.assignedTo && data.assignedTo.length > 0,
    reason: "Task with assignees should have entityRelationships",
  },

  // Entities should link to other entities or nodes
  System: {
    shouldHave: ["entityRelationships"],
    condition: (data) => data.vendor !== null,
    reason: "System with vendor should link to Organisation",
  },
  Person: {
    shouldHave: ["entityRelationships"],
    condition: (data) => data.organisation !== null,
    reason: "Person with organisation should have entityRelationships",
  },

  // Nodes should link to other nodes
  Concept: {
    shouldHave: ["nodeRelationships"],
    condition: () => true,
    reason: "Concept should link to related concepts/patterns",
  },
  Pattern: {
    shouldHave: ["nodeRelationships"],
    condition: () => true,
    reason: "Pattern should link to related concepts/patterns",
  },
  Research: {
    shouldHave: ["nodeRelationships"],
    condition: () => true,
    reason: "Research should link to related concepts/patterns",
  },
};

/**
 * Get all markdown files with their frontmatter
 */
function getAllNotes() {
  const notes = [];

  function scanDir(dir) {
    const fullPath = join(VAULT_ROOT, dir);
    try {
      const entries = readdirSync(fullPath);
      for (const entry of entries) {
        const entryPath = join(fullPath, entry);
        const relativePath = dir ? join(dir, entry) : entry;

        if (SKIP_DIRS.some((skip) => relativePath.startsWith(skip))) {
          continue;
        }

        const stat = statSync(entryPath);
        if (stat.isDirectory()) {
          scanDir(relativePath);
        } else if (entry.endsWith(".md") && !entry.startsWith("_")) {
          try {
            const content = readFileSync(entryPath, "utf-8");
            const { data } = matter(content);

            notes.push({
              name: basename(entry, ".md"),
              path: relativePath,
              data,
            });
          } catch (err) {
            // Skip files that can't be parsed
          }
        }
      }
    } catch (err) {
      // Directory doesn't exist, skip
    }
  }

  scanDir("");
  return notes;
}

/**
 * Check if a relationship field is populated
 */
function hasRelationships(data, field) {
  const value = data[field];
  if (!value) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim() !== "";
  return false;
}

/**
 * Main checker function
 */
export async function checkOntologyCompliance() {
  const issues = [];
  const notes = getAllNotes();

  for (const note of notes) {
    const type = note.data.type;
    const rules = ONTOLOGY_RULES[type];

    if (!rules) continue;

    // Check if condition applies
    if (!rules.condition(note.data)) continue;

    // Check each required field
    for (const field of rules.shouldHave) {
      if (!hasRelationships(note.data, field)) {
        issues.push({
          node: note.name,
          type: "missing-relationship",
          field,
          noteType: type,
          confidence: 0.8,
          reason: rules.reason,
        });
      }
    }
  }

  return issues;
}

// Run standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  checkOntologyCompliance().then((issues) => {
    console.log(JSON.stringify(issues, null, 2));
    console.error(`Found ${issues.length} ontology compliance issues`);
  });
}
