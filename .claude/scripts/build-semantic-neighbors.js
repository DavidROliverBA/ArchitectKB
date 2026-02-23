#!/usr/bin/env node
/**
 * Build Semantic Neighbors Index
 *
 * Pre-computes the top-N most similar documents for each document
 * using the existing Smart Connections embeddings.
 *
 * This enables "semantic expansion" without needing to embed queries:
 * 1. Find documents via keyword search
 * 2. Expand results with their semantic neighbors
 *
 * Usage:
 *   node scripts/build-semantic-neighbors.js           # Build index (top 10 neighbors)
 *   node scripts/build-semantic-neighbors.js --top 20  # More neighbors per doc
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VAULT_ROOT = path.join(__dirname, "../..");
const SMART_ENV_DIR = path.join(VAULT_ROOT, ".smart-env", "multi");
const NEIGHBORS_INDEX_PATH = path.join(
  VAULT_ROOT,
  ".data",
  "semantic-neighbors.json",
);
const EMBEDDING_MODEL = "TaylorAI/bge-micro-v2";

// Parse args
const args = process.argv.slice(2);
let topN = 10;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--top" && args[i + 1]) {
    topN = parseInt(args[i + 1], 10);
    i++;
  }
}

/**
 * Load embeddings from Smart Connections
 * Only loads note-level embeddings (no block fragments like #heading)
 */
function loadEmbeddings() {
  console.log("Loading note-level embeddings from .smart-env/multi/...");
  const embeddings = [];
  const seenPaths = new Set();

  const files = fs
    .readdirSync(SMART_ENV_DIR)
    .filter((f) => f.endsWith(".ajson"));

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(SMART_ENV_DIR, file), "utf-8");
      const lines = content
        .trim()
        .split("\n")
        .filter((l) => l.trim());

      for (const line of lines) {
        try {
          const match = line.match(/^"([^"]+)":\s*(\{.+\})(?:,)?$/);
          if (!match) continue;

          const [, key, jsonStr] = match;
          const data = JSON.parse(jsonStr);
          const vec = data?.embeddings?.[EMBEDDING_MODEL]?.vec;
          if (!vec || !Array.isArray(vec)) continue;

          let notePath = data.path || key.replace("smart_sources:", "");

          // Skip block-level embeddings (paths with #)
          if (notePath.includes("#")) continue;

          // Skip if we've already seen this path
          if (seenPaths.has(notePath)) continue;
          seenPaths.add(notePath);

          embeddings.push({
            path: notePath,
            title: data.metadata?.title || path.basename(notePath, ".md"),
            type: data.metadata?.type || "Unknown",
            vec: vec,
          });
        } catch (e) {
          // Skip malformed
        }
      }
    } catch (e) {
      // Skip unreadable
    }
  }

  console.log(
    `Loaded ${embeddings.length} note-level embeddings (skipped block fragments)`,
  );
  return embeddings;
}

/**
 * Cosine similarity
 */
function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const mag = Math.sqrt(normA) * Math.sqrt(normB);
  return mag === 0 ? 0 : dot / mag;
}

/**
 * Build neighbors index
 */
function buildNeighborsIndex(embeddings, topN) {
  console.log(`\nBuilding neighbors index (top ${topN} per document)...`);
  const index = {};
  const total = embeddings.length;

  for (let i = 0; i < total; i++) {
    const doc = embeddings[i];
    const similarities = [];

    for (let j = 0; j < total; j++) {
      if (i === j) continue;
      const sim = cosineSimilarity(doc.vec, embeddings[j].vec);
      similarities.push({ path: embeddings[j].path, score: sim });
    }

    // Sort and take top N
    similarities.sort((a, b) => b.score - a.score);
    index[doc.path] = similarities.slice(0, topN).map((s) => ({
      path: s.path,
      score: parseFloat(s.score.toFixed(4)),
    }));

    if ((i + 1) % 500 === 0 || i === total - 1) {
      console.log(`  Processed ${i + 1}/${total} documents...`);
    }
  }

  return index;
}

/**
 * Main
 */
function main() {
  const embeddings = loadEmbeddings();
  if (embeddings.length === 0) {
    console.error("No embeddings found!");
    process.exit(1);
  }

  const startTime = Date.now();
  const index = buildNeighborsIndex(embeddings, topN);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // Save
  const dataDir = path.dirname(NEIGHBORS_INDEX_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(NEIGHBORS_INDEX_PATH, JSON.stringify(index, null, 2));
  const sizeMB = (fs.statSync(NEIGHBORS_INDEX_PATH).size / 1024 / 1024).toFixed(
    1,
  );

  console.log(`\nDone in ${elapsed}s`);
  console.log(`Index saved: ${NEIGHBORS_INDEX_PATH} (${sizeMB}MB)`);
  console.log(`Documents: ${Object.keys(index).length}`);
  console.log(`Neighbors per doc: ${topN}`);
}

main();
