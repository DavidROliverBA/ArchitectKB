#!/usr/bin/env node

/**
 * Semantic Similarity Calculator
 * Finds similar notes based on embedding vectors
 *
 * Usage:
 *   node similarity.js                    # Generate all similarity suggestions
 *   node similarity.js --note="Concept - CAMO"  # Find similar to specific note
 *   node similarity.js --threshold=0.8    # Custom similarity threshold
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INDEX_PATH = join(__dirname, "../../../.graph/embeddings.json");
const GRAPH_PATH = join(__dirname, "../../../.graph/tauri-graph-d3.json");

// Default configuration
const DEFAULT_THRESHOLD = 0.7;
const TOP_N = 10; // Top N similar notes per note

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (normA * normB);
}

/**
 * Load existing links from graph data
 */
function loadExistingLinks() {
  if (!existsSync(GRAPH_PATH)) {
    return new Set();
  }

  const graph = JSON.parse(readFileSync(GRAPH_PATH, "utf-8"));
  const links = new Set();

  for (const link of graph.links) {
    // Store both directions
    links.add(`${link.source}→${link.target}`);
    links.add(`${link.target}→${link.source}`);
  }

  return links;
}

/**
 * Find top-N similar notes for a given note
 */
function findSimilar(noteName, embeddings, existingLinks, threshold, topN) {
  const noteData = embeddings[noteName];
  if (!noteData) return [];

  const similarities = [];

  for (const [otherName, otherData] of Object.entries(embeddings)) {
    if (otherName === noteName) continue;

    // Skip if already linked
    const linkKey = `${noteName}→${otherName}`;
    if (existingLinks.has(linkKey)) continue;

    const similarity = cosineSimilarity(noteData.vector, otherData.vector);

    if (similarity >= threshold) {
      similarities.push({
        target: otherName,
        similarity,
      });
    }
  }

  // Sort by similarity descending and take top N
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
}

/**
 * Generate similarity suggestions for all notes
 */
export function generateSimilaritySuggestions(threshold = DEFAULT_THRESHOLD) {
  if (!existsSync(INDEX_PATH)) {
    console.error(
      "No embedding index found. Run 'npm run embeddings:build' first.",
    );
    return [];
  }

  const index = JSON.parse(readFileSync(INDEX_PATH, "utf-8"));
  const embeddings = index.notes;
  const existingLinks = loadExistingLinks();

  const suggestions = [];
  const seen = new Set();

  for (const noteName of Object.keys(embeddings)) {
    const similar = findSimilar(
      noteName,
      embeddings,
      existingLinks,
      threshold,
      TOP_N,
    );

    for (const match of similar) {
      // Deduplicate (A→B and B→A are the same)
      const key = [noteName, match.target].sort().join("→");
      if (seen.has(key)) continue;
      seen.add(key);

      suggestions.push({
        source: noteName,
        target: match.target,
        type: "semantic-similarity",
        confidence: Math.round(match.similarity * 100) / 100,
        reason: `Semantic similarity: ${Math.round(match.similarity * 100)}%`,
      });
    }
  }

  // Sort by confidence descending
  return suggestions.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Main CLI function
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const noteArg = args.find((a) => a.startsWith("--note="));
  const thresholdArg = args.find((a) => a.startsWith("--threshold="));
  const limitArg = args.find((a) => a.startsWith("--limit="));

  const specificNote = noteArg ? noteArg.split("=")[1] : null;
  const threshold = thresholdArg
    ? parseFloat(thresholdArg.split("=")[1])
    : DEFAULT_THRESHOLD;
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : null;

  console.log("\n  Semantic Similarity Analysis");
  console.log("  ────────────────────────────");
  console.log(`  Threshold: ${threshold}`);

  if (!existsSync(INDEX_PATH)) {
    console.error(
      "  No embedding index found. Run 'npm run embeddings:build' first.",
    );
    process.exit(1);
  }

  const index = JSON.parse(readFileSync(INDEX_PATH, "utf-8"));
  console.log(
    `  Index: ${index.noteCount} notes, ${index.dimensions} dimensions`,
  );

  const embeddings = index.notes;
  const existingLinks = loadExistingLinks();
  console.log(`  Existing links: ${existingLinks.size / 2}`);

  if (specificNote) {
    // Find similar notes for a specific note
    console.log(`\n  Finding notes similar to: "${specificNote}"`);

    if (!embeddings[specificNote]) {
      console.error(`  Note "${specificNote}" not found in index`);
      process.exit(1);
    }

    const similar = findSimilar(
      specificNote,
      embeddings,
      existingLinks,
      threshold,
      20,
    );

    if (similar.length === 0) {
      console.log("  No similar notes found above threshold");
    } else {
      console.log(`\n  Top ${similar.length} similar notes:`);
      for (const match of similar) {
        console.log(
          `    ${Math.round(match.similarity * 100)}% - ${match.target}`,
        );
      }
    }
  } else {
    // Generate all suggestions
    console.log("\n  Generating similarity suggestions...");

    const suggestions = generateSimilaritySuggestions(threshold);

    let output = suggestions;
    if (limit && limit < suggestions.length) {
      output = suggestions.slice(0, limit);
      console.log(`  Limited to top ${limit} suggestions`);
    }

    console.log(`\n  Found ${suggestions.length} potential connections`);

    if (output.length > 0) {
      console.log("\n  Top 10 suggestions:");
      for (const s of output.slice(0, 10)) {
        console.log(`    ${s.confidence * 100}% - ${s.source} ↔ ${s.target}`);
      }
    }

    // Output JSON for piping
    if (args.includes("--json")) {
      console.log("\n" + JSON.stringify(output, null, 2));
    }
  }
}

// Run standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
}
