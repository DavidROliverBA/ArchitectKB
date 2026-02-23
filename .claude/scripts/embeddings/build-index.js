#!/usr/bin/env node

/**
 * Build Embedding Index
 * Creates vector embeddings for all notes in the vault
 *
 * Usage:
 *   npm run embeddings:build              # Build full index
 *   npm run embeddings:build -- --limit=100  # Limit for testing
 */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

import { embed, getProviderInfo } from "./embed-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VAULT_ROOT = join(__dirname, "../../../");
const OUTPUT_PATH = join(__dirname, "../../../.graph/embeddings.json");
const BATCH_SIZE = 20; // Process in batches to manage memory

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

/**
 * Get all markdown files in the vault
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
          notes.push({
            path: relativePath,
            fullPath: entryPath,
            name: basename(entry, ".md"),
            mtime: stat.mtime.toISOString(),
          });
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
 * Extract text content from a note (title + body, no frontmatter)
 */
function extractText(note) {
  try {
    const content = readFileSync(note.fullPath, "utf-8");
    const { content: body, data } = matter(content);

    // Combine title and body
    const title = data.title || note.name;
    const text = `${title}\n\n${body}`;

    // Clean up: remove wiki-links syntax but keep text
    return text
      .replace(
        /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
        (_, link, alias) => alias || link,
      )
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      .replace(/`[^`]+`/g, "") // Remove inline code
      .trim();
  } catch (err) {
    console.error(`  Error reading ${note.path}: ${err.message}`);
    return "";
  }
}

/**
 * Main build function
 */
async function build() {
  const args = process.argv.slice(2);
  const limit = args.find((a) => a.startsWith("--limit="));
  const maxNotes = limit ? parseInt(limit.split("=")[1], 10) : Infinity;

  console.log("\n  Building Embedding Index");
  console.log("  ────────────────────────");

  const providerInfo = getProviderInfo();
  console.log(`  Provider: ${providerInfo.provider}`);
  console.log(`  Model: ${providerInfo.model}`);
  console.log(`  Dimensions: ${providerInfo.dimensions}`);

  // Get all notes
  let notes = getAllNotes();
  console.log(`\n  Found ${notes.length} notes`);

  if (maxNotes < notes.length) {
    notes = notes.slice(0, maxNotes);
    console.log(`  Limited to ${maxNotes} notes`);
  }

  // Extract text content
  console.log("  Extracting text content...");
  const noteTexts = notes.map((note) => ({
    ...note,
    text: extractText(note),
  }));

  // Filter out empty notes
  const validNotes = noteTexts.filter((n) => n.text.length > 50);
  console.log(`  ${validNotes.length} notes with sufficient content`);

  // Generate embeddings in batches
  console.log(`\n  Generating embeddings (batch size: ${BATCH_SIZE})...`);
  const embeddings = {};
  let processed = 0;

  for (let i = 0; i < validNotes.length; i += BATCH_SIZE) {
    const batch = validNotes.slice(i, i + BATCH_SIZE);
    const texts = batch.map((n) => n.text);

    try {
      const vectors = await embed(texts);

      for (let j = 0; j < batch.length; j++) {
        embeddings[batch[j].name] = {
          vector: vectors[j],
          updated: batch[j].mtime,
          path: batch[j].path,
        };
      }

      processed += batch.length;
      const pct = Math.round((processed / validNotes.length) * 100);
      process.stdout.write(
        `\r  Progress: ${processed}/${validNotes.length} (${pct}%)`,
      );
    } catch (err) {
      console.error(`\n  Error processing batch at ${i}: ${err.message}`);
    }
  }

  console.log("\n");

  // Save index
  const index = {
    model: providerInfo.model,
    provider: providerInfo.provider,
    dimensions: providerInfo.dimensions,
    created: new Date().toISOString(),
    noteCount: Object.keys(embeddings).length,
    notes: embeddings,
  };

  // Ensure output directory exists
  const outputDir = dirname(OUTPUT_PATH);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));

  console.log(`  ✓ Index saved to ${OUTPUT_PATH}`);
  console.log(`  ✓ ${index.noteCount} notes embedded`);
  console.log(
    `  ✓ File size: ${(readFileSync(OUTPUT_PATH).length / 1024 / 1024).toFixed(2)} MB`,
  );
}

build().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
