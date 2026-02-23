#!/usr/bin/env node

/**
 * Incremental Embedding Update
 * Updates embeddings only for notes that have changed since last indexing
 *
 * Usage:
 *   npm run embeddings:update
 */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
} from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

import { embed, getProviderInfo } from "./embed-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VAULT_ROOT = join(__dirname, "../../../");
const INDEX_PATH = join(__dirname, "../../../.graph/embeddings.json");
const BATCH_SIZE = 20;

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
 * Extract text content from a note
 */
function extractText(note) {
  try {
    const content = readFileSync(note.fullPath, "utf-8");
    const { content: body, data } = matter(content);

    const title = data.title || note.name;
    const text = `${title}\n\n${body}`;

    return text
      .replace(
        /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
        (_, link, alias) => alias || link,
      )
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]+`/g, "")
      .trim();
  } catch (err) {
    return "";
  }
}

/**
 * Main update function
 */
async function update() {
  console.log("\n  Incremental Embedding Update");
  console.log("  ────────────────────────────");

  // Load existing index
  if (!existsSync(INDEX_PATH)) {
    console.log(
      "  No existing index found. Run 'npm run embeddings:build' first.",
    );
    process.exit(1);
  }

  const index = JSON.parse(readFileSync(INDEX_PATH, "utf-8"));
  console.log(`  Loaded index with ${index.noteCount} embeddings`);

  // Get current notes
  const notes = getAllNotes();
  console.log(`  Found ${notes.length} notes in vault`);

  // Find notes that need updating
  const toUpdate = [];
  const toRemove = new Set(Object.keys(index.notes));

  for (const note of notes) {
    toRemove.delete(note.name);

    const existing = index.notes[note.name];
    if (!existing) {
      // New note
      toUpdate.push(note);
    } else if (new Date(note.mtime) > new Date(existing.updated)) {
      // Modified note
      toUpdate.push(note);
    }
  }

  console.log(`  Notes to update: ${toUpdate.length}`);
  console.log(`  Notes to remove: ${toRemove.size}`);

  if (toUpdate.length === 0 && toRemove.size === 0) {
    console.log("\n  ✓ Index is up to date");
    return;
  }

  // Remove deleted notes
  for (const name of toRemove) {
    delete index.notes[name];
  }

  // Update changed notes
  if (toUpdate.length > 0) {
    console.log(`\n  Generating embeddings for ${toUpdate.length} notes...`);

    const noteTexts = toUpdate
      .map((note) => ({
        ...note,
        text: extractText(note),
      }))
      .filter((n) => n.text.length > 50);

    let processed = 0;
    for (let i = 0; i < noteTexts.length; i += BATCH_SIZE) {
      const batch = noteTexts.slice(i, i + BATCH_SIZE);
      const texts = batch.map((n) => n.text);

      try {
        const vectors = await embed(texts);

        for (let j = 0; j < batch.length; j++) {
          index.notes[batch[j].name] = {
            vector: vectors[j],
            updated: batch[j].mtime,
            path: batch[j].path,
          };
        }

        processed += batch.length;
        const pct = Math.round((processed / noteTexts.length) * 100);
        process.stdout.write(
          `\r  Progress: ${processed}/${noteTexts.length} (${pct}%)`,
        );
      } catch (err) {
        console.error(`\n  Error processing batch: ${err.message}`);
      }
    }

    console.log("\n");
  }

  // Update metadata
  index.noteCount = Object.keys(index.notes).length;
  index.lastUpdated = new Date().toISOString();

  // Save
  writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));

  console.log(`  ✓ Index updated`);
  console.log(`  ✓ ${index.noteCount} total embeddings`);
  console.log(`  ✓ ${toUpdate.length} added/updated, ${toRemove.size} removed`);
}

update().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
