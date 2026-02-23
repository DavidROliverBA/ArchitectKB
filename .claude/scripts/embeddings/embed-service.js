/**
 * Embedding Service
 * Provides text embeddings using local transformers or Voyage AI
 *
 * Supports:
 * - Local: @xenova/transformers (free, no API key needed)
 * - Voyage AI: voyage-3-lite (fast, cheap, requires API key)
 *
 * Environment variables:
 * - EMBEDDING_PROVIDER: "local" (default) or "voyage"
 * - VOYAGE_API_KEY: Required if using Voyage AI
 */

import { pipeline } from "@xenova/transformers";

// Configuration
const PROVIDER = process.env.EMBEDDING_PROVIDER || "local";
const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const VOYAGE_MODEL = "voyage-3-lite";
const LOCAL_MODEL = "Xenova/all-MiniLM-L6-v2";

// Cache the pipeline for reuse
let embeddingPipeline = null;

/**
 * Initialise the embedding pipeline (local only)
 */
async function initLocalPipeline() {
  if (!embeddingPipeline) {
    console.log(`  Loading local model: ${LOCAL_MODEL}...`);
    embeddingPipeline = await pipeline("feature-extraction", LOCAL_MODEL);
    console.log("  Model loaded.");
  }
  return embeddingPipeline;
}

/**
 * Generate embeddings using local transformers
 */
async function embedLocal(texts) {
  const pipe = await initLocalPipeline();
  const embeddings = [];

  for (const text of texts) {
    // Truncate long texts (model has token limit)
    const truncated = text.slice(0, 8000);
    const output = await pipe(truncated, {
      pooling: "mean",
      normalize: true,
    });
    embeddings.push(Array.from(output.data));
  }

  return embeddings;
}

/**
 * Generate embeddings using Voyage AI API
 */
async function embedVoyage(texts) {
  if (!VOYAGE_API_KEY) {
    throw new Error(
      "VOYAGE_API_KEY environment variable required for Voyage AI",
    );
  }

  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: VOYAGE_MODEL,
      input: texts.map((t) => t.slice(0, 16000)), // Voyage has higher limit
      input_type: "document",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Voyage API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data.map((d) => d.embedding);
}

/**
 * Generate embeddings for a batch of texts
 * @param {string[]} texts - Array of texts to embed
 * @returns {Promise<number[][]>} Array of embedding vectors
 */
export async function embed(texts) {
  if (PROVIDER === "voyage") {
    return embedVoyage(texts);
  }
  return embedLocal(texts);
}

/**
 * Generate embedding for a single text
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} Embedding vector
 */
export async function embedSingle(text) {
  const [embedding] = await embed([text]);
  return embedding;
}

/**
 * Get embedding dimensions for current provider
 */
export function getDimensions() {
  if (PROVIDER === "voyage") {
    return 1024; // voyage-3-lite dimensions
  }
  return 384; // MiniLM-L6-v2 dimensions
}

/**
 * Get current provider info
 */
export function getProviderInfo() {
  return {
    provider: PROVIDER,
    model: PROVIDER === "voyage" ? VOYAGE_MODEL : LOCAL_MODEL,
    dimensions: getDimensions(),
  };
}

/**
 * Test the embedding service
 */
export async function test() {
  console.log("\n  Embedding Service Test");
  console.log("  ─────────────────────");
  console.log(`  Provider: ${PROVIDER}`);
  console.log(`  Model: ${PROVIDER === "voyage" ? VOYAGE_MODEL : LOCAL_MODEL}`);
  console.log(`  Dimensions: ${getDimensions()}`);

  try {
    const testText = "This is a test sentence for embedding.";
    console.log(`\n  Testing with: "${testText}"`);

    const start = Date.now();
    const embedding = await embedSingle(testText);
    const elapsed = Date.now() - start;

    console.log(`  ✓ Generated ${embedding.length}-dim vector in ${elapsed}ms`);
    console.log(
      `  ✓ First 5 values: [${embedding
        .slice(0, 5)
        .map((v) => v.toFixed(4))
        .join(", ")}...]`,
    );

    return true;
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return false;
  }
}

// Run standalone test
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.includes("--test")) {
    test().then((success) => process.exit(success ? 0 : 1));
  } else {
    console.log("Usage: node embed-service.js --test");
    console.log("\nEnvironment variables:");
    console.log("  EMBEDDING_PROVIDER=local|voyage (default: local)");
    console.log("  VOYAGE_API_KEY=<key> (required for voyage)");
  }
}
