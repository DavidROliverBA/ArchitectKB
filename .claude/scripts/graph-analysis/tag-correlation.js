/**
 * Tag Correlation Detector
 * Finds note pairs with significant tag overlap but no link between them
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename } from "path";
import matter from "gray-matter";

const VAULT_ROOT = join(import.meta.dirname, "../../../");

// Minimum shared tags to consider
const MIN_SHARED_TAGS = 3;

// Minimum Jaccard similarity threshold
const MIN_JACCARD = 0.3;

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
 * Get all markdown files with their tags
 */
function getAllNotesWithTags() {
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
            const tags = Array.isArray(data.tags) ? data.tags : [];

            // Extract wiki-links for checking existing connections
            const links = new Set();
            const regex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
              links.add(match[1]);
            }

            notes.push({
              name: basename(entry, ".md"),
              tags: new Set(tags.map((t) => t.toLowerCase())),
              links,
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
 * Calculate Jaccard similarity between two sets
 */
function jaccardSimilarity(setA, setB) {
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Check if two notes are already linked
 */
function areLinked(noteA, noteB) {
  return noteA.links.has(noteB.name) || noteB.links.has(noteA.name);
}

/**
 * Main detector function
 */
export async function detectTagCorrelations() {
  const suggestions = [];
  const notes = getAllNotesWithTags();

  // Only consider notes with at least MIN_SHARED_TAGS tags
  const notesWithTags = notes.filter((n) => n.tags.size >= MIN_SHARED_TAGS);

  // Compare all pairs
  for (let i = 0; i < notesWithTags.length; i++) {
    for (let j = i + 1; j < notesWithTags.length; j++) {
      const noteA = notesWithTags[i];
      const noteB = notesWithTags[j];

      // Skip if already linked
      if (areLinked(noteA, noteB)) continue;

      // Calculate shared tags
      const sharedTags = [...noteA.tags].filter((t) => noteB.tags.has(t));
      if (sharedTags.length < MIN_SHARED_TAGS) continue;

      // Calculate Jaccard similarity
      const jaccard = jaccardSimilarity(noteA.tags, noteB.tags);
      if (jaccard < MIN_JACCARD) continue;

      suggestions.push({
        source: noteA.name,
        target: noteB.name,
        type: "tag-correlation",
        confidence: Math.round(jaccard * 100) / 100,
        reason: `${sharedTags.length} shared tags: ${sharedTags.slice(0, 5).join(", ")}${sharedTags.length > 5 ? "..." : ""}`,
        sharedTags,
      });
    }
  }

  // Sort by confidence descending
  suggestions.sort((a, b) => b.confidence - a.confidence);

  return suggestions;
}

// Run standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  detectTagCorrelations().then((suggestions) => {
    console.log(JSON.stringify(suggestions, null, 2));
    console.error(`Found ${suggestions.length} tag correlations`);
  });
}
