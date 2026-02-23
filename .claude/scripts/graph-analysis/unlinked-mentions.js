/**
 * Unlinked Mentions Detector
 * Finds note titles mentioned in body text but not linked via wiki-links
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename } from "path";
import matter from "gray-matter";

const VAULT_ROOT = join(import.meta.dirname, "../../../");

// Directories to scan for notes
const SCAN_DIRS = [
  "", // root
  "Meetings/2024",
  "Meetings/2025",
  "Meetings/2026",
  "Projects",
  "Tasks",
  "ADRs",
  "Emails",
  "Daily/2024",
  "Daily/2025",
  "Daily/2026",
  "Incubator",
  "Forms",
];

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
          });
        }
      }
    } catch (err) {
      // Directory doesn't exist, skip
    }
  }

  SCAN_DIRS.forEach((dir) => scanDir(dir));
  return notes;
}

/**
 * Extract existing wiki-links from note content
 */
function extractWikiLinks(content) {
  const links = new Set();
  const regex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.add(match[1]);
  }
  return links;
}

/**
 * Check if a title is mentioned in body text (excluding frontmatter and links)
 */
function findUnlinkedMentions(bodyText, existingLinks, allNoteTitles) {
  const mentions = [];

  // Remove wiki-links from body text to avoid false positives
  const textWithoutLinks = bodyText.replace(/\[\[[^\]]+\]\]/g, "");

  for (const title of allNoteTitles) {
    // Skip if already linked
    if (existingLinks.has(title)) continue;

    // Skip very short titles (too many false positives)
    if (title.length < 5) continue;

    // Create regex to find title (case insensitive, word boundaries)
    // Handle titles with "Type - Name" format
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Also search for just the name part (after " - ")
    const namePart = title.includes(" - ")
      ? title.split(" - ").slice(1).join(" - ")
      : null;

    // Check for full title
    const fullRegex = new RegExp(`\\b${escapedTitle}\\b`, "i");
    if (fullRegex.test(textWithoutLinks)) {
      mentions.push(title);
      continue;
    }

    // Check for name part only (if it's long enough)
    if (namePart && namePart.length >= 5) {
      const escapedName = namePart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const nameRegex = new RegExp(`\\b${escapedName}\\b`, "i");
      if (nameRegex.test(textWithoutLinks)) {
        mentions.push(title);
      }
    }
  }

  return mentions;
}

/**
 * Main detector function
 */
export async function detectUnlinkedMentions() {
  const suggestions = [];
  const notes = getAllNotes();
  const allNoteTitles = new Set(notes.map((n) => n.name));

  for (const note of notes) {
    try {
      const content = readFileSync(note.fullPath, "utf-8");
      const { content: bodyText } = matter(content);

      const existingLinks = extractWikiLinks(content);
      const unlinkedMentions = findUnlinkedMentions(
        bodyText,
        existingLinks,
        allNoteTitles,
      );

      for (const mention of unlinkedMentions) {
        suggestions.push({
          source: note.name,
          target: mention,
          type: "unlinked-mention",
          confidence: 1.0,
          reason: `"${mention}" appears in body text but is not linked`,
        });
      }
    } catch (err) {
      console.error(`Error processing ${note.path}: ${err.message}`);
    }
  }

  return suggestions;
}

// Run standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  detectUnlinkedMentions().then((suggestions) => {
    console.log(JSON.stringify(suggestions, null, 2));
    console.error(`Found ${suggestions.length} unlinked mentions`);
  });
}
