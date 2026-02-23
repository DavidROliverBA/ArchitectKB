#!/usr/bin/env node

/**
 * Graph Analysis Aggregator
 * Runs all detectors and outputs combined suggestions
 *
 * Usage:
 *   npm run graph:analyse                     # Run all detectors
 *   npm run graph:analyse -- --type=unlinked  # Run specific detector
 *   npm run graph:analyse -- --type=patterns  # Cross-project pattern detection
 *   npm run graph:analyse -- --type=semantic  # Run semantic similarity only
 *   npm run graph:analyse -- --embeddings     # Include semantic similarity
 *   npm run graph:analyse -- --threshold=0.8  # Custom similarity threshold
 *   npm run graph:analyse -- --limit=100      # Limit results
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { detectUnlinkedMentions } from "./unlinked-mentions.js";
import { detectTagCorrelations } from "./tag-correlation.js";
import { checkOntologyCompliance } from "./ontology-checker.js";
import {
  detectCrossProjectPatterns,
  getLastPatterns,
} from "./cross-project-patterns.js";
import { generateSimilaritySuggestions } from "../embeddings/similarity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUTPUT_PATH = join(__dirname, "../../../.graph/suggestions.json");
const PATTERNS_PATH = join(__dirname, "../../../.graph/patterns.json");

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    type: null, // Run specific detector only
    limit: null, // Limit results
    verbose: false,
    embeddings: false, // Include semantic similarity (requires embedding index)
    threshold: 0.7, // Similarity threshold
  };

  args.forEach((arg) => {
    if (arg.startsWith("--type=")) {
      config.type = arg.split("=")[1];
    } else if (arg.startsWith("--limit=")) {
      config.limit = parseInt(arg.split("=")[1], 10);
    } else if (arg === "--verbose" || arg === "-v") {
      config.verbose = true;
    } else if (arg === "--embeddings" || arg === "-e") {
      config.embeddings = true;
    } else if (arg.startsWith("--threshold=")) {
      config.threshold = parseFloat(arg.split("=")[1]);
    }
  });

  return config;
}

/**
 * Deduplicate suggestions (A→B and B→A are the same)
 */
function deduplicateSuggestions(suggestions) {
  const seen = new Set();
  const unique = [];

  for (const suggestion of suggestions) {
    // For link suggestions, normalise the pair
    if (suggestion.source && suggestion.target) {
      const key = [suggestion.source, suggestion.target].sort().join("→");
      const typeKey = `${key}:${suggestion.type}`;

      if (!seen.has(typeKey)) {
        seen.add(typeKey);
        unique.push(suggestion);
      }
    } else {
      // Ontology issues are node-specific
      const key = `${suggestion.node}:${suggestion.type}:${suggestion.field}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(suggestion);
      }
    }
  }

  return unique;
}

/**
 * Main function
 */
async function main() {
  const config = parseArgs();
  const allSuggestions = [];

  console.log("\n  Graph Analysis");
  console.log("  ─────────────────");

  // Run detectors based on config
  const runAll = !config.type;

  if (runAll || config.type === "unlinked") {
    console.log("  Running unlinked mentions detector...");
    const unlinkedMentions = await detectUnlinkedMentions();
    console.log(`    Found ${unlinkedMentions.length} unlinked mentions`);
    allSuggestions.push(...unlinkedMentions);
  }

  if (runAll || config.type === "tags") {
    console.log("  Running tag correlation detector...");
    const tagCorrelations = await detectTagCorrelations();
    console.log(`    Found ${tagCorrelations.length} tag correlations`);
    allSuggestions.push(...tagCorrelations);
  }

  if (runAll || config.type === "ontology") {
    console.log("  Running ontology compliance checker...");
    const ontologyIssues = await checkOntologyCompliance();
    console.log(`    Found ${ontologyIssues.length} ontology issues`);
    allSuggestions.push(...ontologyIssues);
  }

  if (runAll || config.type === "patterns") {
    console.log("  Running cross-project pattern detector...");
    const patterns = await detectCrossProjectPatterns({
      verbose: config.verbose,
    });
    console.log(`    Found ${patterns.length} cross-project patterns`);
    allSuggestions.push(...patterns);
  }

  // Semantic similarity (requires embedding index, opt-in with --embeddings)
  if (config.embeddings || config.type === "semantic") {
    console.log(
      `  Running semantic similarity detector (threshold: ${config.threshold})...`,
    );
    try {
      const semanticSuggestions = generateSimilaritySuggestions(
        config.threshold,
      );
      console.log(
        `    Found ${semanticSuggestions.length} semantic suggestions`,
      );
      allSuggestions.push(...semanticSuggestions);
    } catch (err) {
      console.log(
        `    Skipped: ${err.message} (run 'npm run embeddings:build' first)`,
      );
    }
  }

  // Deduplicate
  const unique = deduplicateSuggestions(allSuggestions);
  console.log(`\n  Total: ${unique.length} unique suggestions`);

  // Apply limit if specified
  let output = unique;
  if (config.limit && config.limit < unique.length) {
    output = unique.slice(0, config.limit);
    console.log(`  Limited to: ${output.length} suggestions`);
  }

  // Ensure output directory exists
  const outputDir = dirname(OUTPUT_PATH);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Write output
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\n  Output: ${OUTPUT_PATH}`);

  // Write patterns.json if cross-project patterns were detected
  const patternsData = getLastPatterns();
  if (patternsData) {
    writeFileSync(PATTERNS_PATH, JSON.stringify(patternsData, null, 2));
    console.log(`  Patterns: ${PATTERNS_PATH}`);
  }

  // Summary by type
  const byType = {};
  for (const s of output) {
    byType[s.type] = (byType[s.type] || 0) + 1;
  }
  console.log("\n  By type:");
  for (const [type, count] of Object.entries(byType).sort(
    (a, b) => b[1] - a[1],
  )) {
    console.log(`    ${type}: ${count}`);
  }

  console.log("");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
