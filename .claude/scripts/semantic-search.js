#!/usr/bin/env node
/**
 * Semantic Search for Obsidian Vault
 *
 * Queries Smart Connections embeddings directly for semantic similarity search.
 * Uses TaylorAI/bge-micro-v2 embeddings (384 dimensions) stored in .smart-env/multi/
 *
 * Usage:
 *   node scripts/semantic-search.js "your search query"
 *   node scripts/semantic-search.js "your search query" --limit 20
 *   node scripts/semantic-search.js "your search query" --type Adr
 *   node scripts/semantic-search.js --build-index  # Pre-build index for faster queries
 *
 * Dependencies:
 *   npm install @xenova/transformers
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obsidian REST API configuration (optional - only needed for some features)
const OBSIDIAN_API_KEY = process.env.OBSIDIAN_API_KEY || ""; // pragma: allowlist secret
const OBSIDIAN_API_URL = "https://127.0.0.1:27124";

const VAULT_ROOT = path.join(__dirname, "../..");
const GRAPH_EMBEDDINGS_PATH = path.join(
  VAULT_ROOT,
  ".graph",
  "embeddings.json",
);
const SMART_ENV_DIR = path.join(VAULT_ROOT, ".smart-env", "multi");
const INDEX_CACHE_PATH = path.join(VAULT_ROOT, ".data", "semantic-index.json");
const EMBEDDING_MODEL = "TaylorAI/bge-micro-v2";
const EMBEDDING_DIMS = 384;
const NEIGHBORS_INDEX_PATH = path.join(
  VAULT_ROOT,
  ".data",
  "semantic-neighbors.json",
);

// Parse command line arguments
const args = process.argv.slice(2);
let query = "";
let limit = 10;
let filterType = null;
let buildIndex = false;
let useCache = true;
let useObsidianApi = false;
let expandWithNeighbors = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--limit" && args[i + 1]) {
    limit = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === "--type" && args[i + 1]) {
    filterType = args[i + 1];
    i++;
  } else if (args[i] === "--build-index") {
    buildIndex = true;
  } else if (args[i] === "--no-cache") {
    useCache = false;
  } else if (args[i] === "--obsidian" || args[i] === "--api") {
    useObsidianApi = true;
  } else if (args[i] === "--expand") {
    expandWithNeighbors = true;
  } else if (!args[i].startsWith("--")) {
    query = args[i];
  }
}

/**
 * Load embeddings from .graph/embeddings.json (custom pipeline, primary source)
 * Returns array of {path, title, type, tags, vec} or null if unavailable
 */
function loadGraphEmbeddings() {
  if (!fs.existsSync(GRAPH_EMBEDDINGS_PATH)) return null;

  try {
    const index = JSON.parse(fs.readFileSync(GRAPH_EMBEDDINGS_PATH, "utf-8"));
    if (!index.notes || index.noteCount === 0) return null;

    const embeddings = [];
    for (const [noteName, data] of Object.entries(index.notes)) {
      if (!data.vector || !Array.isArray(data.vector)) continue;

      embeddings.push({
        path: data.path || `${noteName}.md`,
        title: noteName,
        type: "Unknown", // Graph index doesn't store type
        tags: [],
        vec: data.vector,
      });
    }

    console.error(
      `Loaded ${embeddings.length} embeddings from .graph/embeddings.json (${index.model})`,
    );
    return embeddings.length > 0 ? embeddings : null;
  } catch (e) {
    console.error("Failed to load graph embeddings:", e.message);
    return null;
  }
}

/**
 * Load embeddings from Smart Connections .ajson files (fallback source)
 */
async function loadEmbeddings() {
  // Try .graph/embeddings.json first (custom pipeline, vault-controlled)
  const graphEmbeddings = loadGraphEmbeddings();
  if (graphEmbeddings) return graphEmbeddings;

  // Check for cached Smart Connections index
  if (useCache && fs.existsSync(INDEX_CACHE_PATH)) {
    const stats = fs.statSync(INDEX_CACHE_PATH);
    const cacheAge = Date.now() - stats.mtimeMs;
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (cacheAge < ONE_DAY) {
      console.error("Loading cached index...");
      const cached = JSON.parse(fs.readFileSync(INDEX_CACHE_PATH, "utf-8"));
      return cached;
    }
  }

  console.error("Loading embeddings from .smart-env/multi/ (fallback)...");
  const embeddings = [];
  const seenPaths = new Set();

  const files = fs
    .readdirSync(SMART_ENV_DIR)
    .filter((f) => f.endsWith(".ajson"));
  let processed = 0;

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(SMART_ENV_DIR, file), "utf-8");

      // Parse AJSON (each line is a JSON entry, we want the last valid one)
      const lines = content
        .trim()
        .split("\n")
        .filter((l) => l.trim());

      for (const line of lines) {
        try {
          // AJSON format: "key": {value}
          const match = line.match(/^"([^"]+)":\s*(\{.+\})(?:,)?$/);
          if (!match) continue;

          const [, key, jsonStr] = match;
          const data = JSON.parse(jsonStr);

          // Extract embedding vector
          const vec = data?.embeddings?.[EMBEDDING_MODEL]?.vec;
          if (!vec || !Array.isArray(vec)) continue;

          // Extract metadata
          let notePath = data.path || key.replace("smart_sources:", "");

          // Skip block-level embeddings (only use full notes)
          if (notePath.includes("#") || notePath.startsWith("smart_blocks:")) {
            continue;
          }

          // Skip duplicates (keep latest version)
          if (seenPaths.has(notePath)) {
            continue;
          }
          seenPaths.add(notePath);

          const metadata = data.metadata || {};

          embeddings.push({
            path: notePath,
            title: metadata.title || path.basename(notePath, ".md"),
            type: metadata.type || "Unknown",
            tags: metadata.tags || [],
            vec: vec,
          });
        } catch (e) {
          // Skip malformed lines
        }
      }

      processed++;
      if (processed % 500 === 0) {
        console.error(`  Processed ${processed}/${files.length} files...`);
      }
    } catch (e) {
      // Skip files that can't be read
    }
  }

  console.error(
    `Loaded ${embeddings.length} embeddings from ${files.length} files`,
  );

  // Cache the index
  if (embeddings.length > 0) {
    const cacheDir = path.dirname(INDEX_CACHE_PATH);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(INDEX_CACHE_PATH, JSON.stringify(embeddings));
    console.error(`Cached index to ${INDEX_CACHE_PATH}`);
  }

  return embeddings;
}

/**
 * Compute cosine similarity between two vectors
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

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

/**
 * Generate query embedding using transformers.js
 *
 * Supports multiple download sources:
 * - Default: huggingface.co (may be blocked)
 * - HF_ENDPOINT env var: e.g., https://hf-mirror.com (Chinese mirror)
 * - Local models: Set LOCAL_MODELS_PATH env var
 */
async function embedQuery(text) {
  try {
    const { pipeline, env } = await import("@xenova/transformers");

    // Configure transformers.js environment
    const localModelsPath = process.env.LOCAL_MODELS_PATH;
    if (localModelsPath) {
      console.error(`Using local models from: ${localModelsPath}`);
      env.localModelPath = localModelsPath;
      env.allowRemoteModels = false;
    }

    // Log which endpoint we're using
    const hfEndpoint = process.env.HF_ENDPOINT;
    if (hfEndpoint) {
      console.error(`Using HF mirror: ${hfEndpoint}`);
    } else if (!localModelsPath) {
      console.error(
        "Using default huggingface.co (set HF_ENDPOINT for mirror)",
      );
    }

    console.error("Generating query embedding with transformers.js...");
    const embedder = await pipeline(
      "feature-extraction",
      "Xenova/bge-micro-v2",
    );
    const output = await embedder(text, { pooling: "mean", normalize: true });

    return Array.from(output.data);
  } catch (e) {
    // Fallback: Use keyword-based pseudo-embedding
    console.error("transformers.js error:", e.message);
    console.error("\nTroubleshooting:");
    console.error(
      '  1. Try Chinese mirror: HF_ENDPOINT=https://hf-mirror.com node scripts/semantic-search.js "query"',
    );
    console.error(
      '  2. Use local models: LOCAL_MODELS_PATH=/path/to/models node scripts/semantic-search.js "query"',
    );
    console.error("  3. Use --obsidian flag for Obsidian REST API search");
    console.error("\nUsing keyword fallback...");
    return null;
  }
}

/**
 * Search via Obsidian REST API (keyword search through Obsidian)
 */
async function obsidianApiSearch(query, limit) {
  try {
    // Use dynamic import for node-fetch or native fetch
    const https = await import("https");

    return new Promise((resolve, reject) => {
      const url = new URL(
        `/search/simple/?query=${encodeURIComponent(query)}`,
        OBSIDIAN_API_URL,
      );

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OBSIDIAN_API_KEY}`,
        },
        rejectUnauthorized: false, // Allow self-signed cert
      };

      const req = https.request(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const results = JSON.parse(data);
            if (Array.isArray(results)) {
              resolve(
                results.slice(0, limit).map((r, i) => ({
                  rank: i + 1,
                  score: Math.abs(r.score).toFixed(2),
                  path: r.filename,
                  title: r.filename.replace(/\.md$/, ""),
                  matchCount: r.matches?.length || 0,
                })),
              );
            } else {
              reject(new Error(results.message || "Invalid response"));
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on("error", reject);
      req.end();
    });
  } catch (e) {
    console.error("Obsidian API error:", e.message);
    return null;
  }
}

/**
 * Keyword-based fallback search (when embeddings not available for query)
 */
function keywordSearch(query, embeddings, limit) {
  const queryTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scored = embeddings.map((doc) => {
    const searchText =
      `${doc.title} ${doc.path} ${doc.tags.join(" ")}`.toLowerCase();

    let score = 0;
    for (const term of queryTerms) {
      if (searchText.includes(term)) {
        score += 1;
        // Boost for title matches
        if (doc.title.toLowerCase().includes(term)) {
          score += 2;
        }
      }
    }

    return { ...doc, score };
  });

  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Semantic search using vector similarity
 */
async function semanticSearch(query, embeddings, limit, filterType) {
  // Filter by type if specified
  let filtered = embeddings;
  if (filterType) {
    filtered = embeddings.filter(
      (e) => e.type && e.type.toLowerCase() === filterType.toLowerCase(),
    );
    console.error(
      `Filtered to ${filtered.length} notes of type '${filterType}'`,
    );
  }

  // Generate query embedding
  const queryVec = await embedQuery(query);

  if (!queryVec) {
    // Fallback to keyword search
    console.error("Using keyword fallback search...");
    return keywordSearch(query, filtered, limit);
  }

  // Compute similarities
  const scored = filtered.map((doc) => ({
    ...doc,
    score: cosineSimilarity(queryVec, doc.vec),
  }));

  // Sort by similarity and return top results
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Check if neighbors index is stale (older than newest embedding file)
 */
function isNeighborsIndexStale() {
  if (!fs.existsSync(NEIGHBORS_INDEX_PATH)) return true;

  const indexMtime = fs.statSync(NEIGHBORS_INDEX_PATH).mtimeMs;

  // Check a sample of recent embedding files
  const files = fs
    .readdirSync(SMART_ENV_DIR)
    .filter((f) => f.endsWith(".ajson"))
    .slice(-100);
  for (const file of files) {
    const fileMtime = fs.statSync(path.join(SMART_ENV_DIR, file)).mtimeMs;
    if (fileMtime > indexMtime) {
      return true;
    }
  }
  return false;
}

/**
 * Load semantic neighbors index
 */
function loadNeighborsIndex() {
  if (!fs.existsSync(NEIGHBORS_INDEX_PATH)) {
    console.error(
      "Neighbors index not found. Run: node scripts/build-semantic-neighbors.js",
    );
    return null;
  }
  return JSON.parse(fs.readFileSync(NEIGHBORS_INDEX_PATH, "utf-8"));
}

/**
 * Expand results with semantic neighbors
 */
function expandWithSemanticNeighbors(
  results,
  neighborsIndex,
  embeddings,
  limit,
) {
  const seen = new Set(results.map((r) => r.path));
  const expanded = [...results];

  // Build path->embedding lookup
  const embeddingsByPath = {};
  for (const e of embeddings) {
    embeddingsByPath[e.path] = e;
  }

  // Add neighbors of top results
  for (const result of results.slice(0, 5)) {
    const neighbors = neighborsIndex[result.path] || [];
    for (const neighbor of neighbors.slice(0, 3)) {
      if (!seen.has(neighbor.path)) {
        seen.add(neighbor.path);
        const doc = embeddingsByPath[neighbor.path];
        if (doc) {
          expanded.push({
            ...doc,
            score: neighbor.score,
            expandedFrom: result.path,
          });
        }
      }
    }
  }

  // Re-sort and limit
  return expanded.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Format results for output
 */
function formatResults(results, searchType = "keyword") {
  const output = {
    searchType: searchType,
    count: results.length,
    results: results.map((r, i) => ({
      rank: i + 1,
      score: typeof r.score === "number" ? r.score.toFixed(4) : r.score,
      path: r.path,
      title: r.title,
      type: r.type,
      tags: r.tags,
      ...(r.expandedFrom && { expandedFrom: r.expandedFrom }),
    })),
  };

  return output;
}

/**
 * Main entry point
 */
async function main() {
  if (buildIndex) {
    console.error("Building semantic index...");
    await loadEmbeddings();
    console.log("Index built successfully");
    return;
  }

  if (!query) {
    console.error(`
Usage: node scripts/semantic-search.js "your search query" [options]

Options:
  --limit N       Return top N results (default: 10)
  --type TYPE     Filter by note type (e.g., Adr, Page, Meeting)
  --expand        Expand results with semantic neighbors (requires neighbors index)
  --obsidian      Use Obsidian REST API for search (requires Obsidian running)
  --build-index   Pre-build index cache for faster queries
  --no-cache      Force reload embeddings (skip cache)

Examples:
  node scripts/semantic-search.js "kafka integration patterns"
  node scripts/semantic-search.js "data pipeline safety" --expand
  node scripts/semantic-search.js "machine learning safety" --type Adr
  node scripts/semantic-search.js "assistant platform" --obsidian
  node scripts/semantic-search.js "data architecture" --limit 20

Build neighbors index first for --expand:
  node scripts/build-semantic-neighbors.js
`);
    process.exit(1);
  }

  // Use Obsidian REST API if requested
  if (useObsidianApi) {
    console.error("Searching via Obsidian REST API...");
    const results = await obsidianApiSearch(query, limit);
    if (results) {
      console.log(
        JSON.stringify(
          { searchType: "obsidian-api", count: results.length, results },
          null,
          2,
        ),
      );
      return;
    }
    console.error("Obsidian API failed, falling back to local search...");
  }

  // Load embeddings
  const embeddings = await loadEmbeddings();

  if (embeddings.length === 0) {
    console.error(
      "No embeddings found. Make sure Smart Connections has indexed your vault.",
    );
    process.exit(1);
  }

  // Perform search
  let results = await semanticSearch(query, embeddings, limit, filterType);
  let searchType = "keyword+expansion";

  // Expand with semantic neighbors if requested
  if (expandWithNeighbors) {
    // Check if neighbors index is stale
    if (isNeighborsIndexStale()) {
      console.error(
        "⚠️  Neighbors index is stale. Rebuild with: node scripts/build-semantic-neighbors.js",
      );
    }

    const neighborsIndex = loadNeighborsIndex();
    if (neighborsIndex) {
      console.error("Expanding results with semantic neighbors...");
      results = expandWithSemanticNeighbors(
        results,
        neighborsIndex,
        embeddings,
        limit,
      );
      searchType = "keyword+semantic-neighbors";
    }
  }

  // Output results as JSON
  console.log(JSON.stringify(formatResults(results, searchType), null, 2));
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
