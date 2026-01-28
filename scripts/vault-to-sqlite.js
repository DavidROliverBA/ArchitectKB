#!/usr/bin/env node
/**
 * Vault to SQLite - Fast queryable index for Claude Code workflows
 *
 * Creates a SQLite database with FTS5 full-text search from vault markdown files.
 * Designed to dramatically reduce search friction compared to grep/glob operations.
 *
 * Performance: ~1000x faster than grep for full-text searches
 *
 * Usage:
 *   node scripts/vault-to-sqlite.js              # Full rebuild
 *   node scripts/vault-to-sqlite.js --verbose    # Show detailed progress
 *   node scripts/vault-to-sqlite.js --stats      # Show statistics only
 *
 * Query examples:
 *   sqlite3 .data/vault.db "SELECT path, title FROM notes WHERE type = 'Adr'"
 *   sqlite3 .data/vault.db "SELECT path, snippet(fts_content,1,'→','←','...',30) FROM fts_content WHERE fts_content MATCH 'architecture'"
 */

import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { glob } from "glob";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VAULT_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(VAULT_ROOT, ".data");
const DB_PATH = path.join(DATA_DIR, "vault.db");

// Directories to exclude from indexing
const EXCLUDED_DIRS = [
  ".git",
  ".obsidian",
  "node_modules",
  ".smart-env",
  "scripts",
  ".graph",
  ".data",
  ".claude",
  "+Templates",
  "+Archive",
  "+PDFs",
  "+Attachments",
];

// Files to exclude
const EXCLUDED_FILES = [
  "README.md",
  "CLAUDE.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
];

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  return {
    verbose: args.includes("--verbose") || args.includes("-v"),
    stats: args.includes("--stats"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
Vault to SQLite - Fast queryable index for Claude Code

Usage:
  node scripts/vault-to-sqlite.js [options]

Options:
  --verbose, -v    Show detailed progress
  --stats          Show statistics only (don't rebuild)
  --help, -h       Show this help message

Output:
  Creates .data/vault.db with tables:
    - notes:       All note metadata and content
    - tags:        Flattened tag index
    - links:       Wiki-link relationships
    - fts_content: FTS5 full-text search on title + content

Query Examples:
  # Find all ADRs
  sqlite3 .data/vault.db "SELECT path, title FROM notes WHERE type = 'Adr'"

  # Full-text search with snippets
  sqlite3 .data/vault.db -markdown "SELECT path, snippet(fts_content,1,'→','←','...',40) as match FROM fts_content WHERE fts_content MATCH 'microservices' ORDER BY rank LIMIT 10"

  # Find notes by tag
  sqlite3 .data/vault.db "SELECT n.path, n.title FROM notes n JOIN tags t ON n.id = t.note_id WHERE t.tag = 'technology/aws'"

  # Find backlinks to a note
  sqlite3 .data/vault.db "SELECT n.path FROM notes n JOIN links l ON n.id = l.source_id WHERE l.target_path LIKE '%Cloud Migration%'"

  # Notes modified in last 7 days
  sqlite3 .data/vault.db "SELECT path, modified FROM notes WHERE modified >= date('now', '-7 days') ORDER BY modified DESC"
`);
}

/**
 * Extract wiki-links from markdown content
 * Returns array of link targets (without [[ ]])
 */
function extractWikiLinks(content) {
  const linkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  const links = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1].trim());
  }

  return [...new Set(links)]; // Deduplicate
}

/**
 * Count words in content (excluding frontmatter and code blocks)
 */
function countWords(content) {
  // Remove code blocks
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  // Remove inline code
  const withoutInline = withoutCode.replace(/`[^`]+`/g, "");
  // Count words
  const words = withoutInline.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

/**
 * Get all markdown files to index
 */
async function getMarkdownFiles() {
  const excludePatterns = [
    ...EXCLUDED_DIRS.map((dir) => `**/${dir}/**`),
    ...EXCLUDED_FILES,
  ];

  const files = await glob("**/*.md", {
    cwd: VAULT_ROOT,
    ignore: excludePatterns,
    nodir: true,
  });

  return files;
}

/**
 * Parse a markdown file and extract metadata
 */
function parseMarkdownFile(relativePath) {
  const absolutePath = path.join(VAULT_ROOT, relativePath);

  try {
    const content = fs.readFileSync(absolutePath, "utf-8");
    const { data: frontmatter, content: body } = matter(content);

    return {
      path: relativePath,
      type: frontmatter.type || null,
      title: frontmatter.title || path.basename(relativePath, ".md"),
      content: body,
      frontmatter: JSON.stringify(frontmatter),
      created: frontmatter.created || null,
      modified: frontmatter.modified || null,
      status: frontmatter.status || null,
      priority: frontmatter.priority || null,
      project:
        typeof frontmatter.project === "string"
          ? frontmatter.project.replace(/\[\[|\]\]/g, "")
          : null,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      links: extractWikiLinks(body),
      wordCount: countWords(body),
    };
  } catch (error) {
    console.error(`  Error parsing ${relativePath}: ${error.message}`);
    return null;
  }
}

/**
 * Safely convert a value to a string for SQLite binding
 */
function toSqliteValue(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint"
  ) {
    return value;
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  // Arrays and objects - convert to JSON string
  return JSON.stringify(value);
}

/**
 * Create the SQLite database schema
 */
function createSchema(db) {
  // Drop existing tables
  db.exec(`
    DROP TABLE IF EXISTS fts_content;
    DROP TABLE IF EXISTS links;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS notes;
  `);

  // Create notes table
  db.exec(`
    CREATE TABLE notes (
      id INTEGER PRIMARY KEY,
      path TEXT UNIQUE NOT NULL,
      type TEXT,
      title TEXT,
      content TEXT,
      frontmatter TEXT,
      created TEXT,
      modified TEXT,
      status TEXT,
      priority TEXT,
      project TEXT,
      word_count INTEGER
    )
  `);

  // Create indexes on commonly queried columns
  db.exec(`
    CREATE INDEX idx_notes_type ON notes(type);
    CREATE INDEX idx_notes_status ON notes(status);
    CREATE INDEX idx_notes_project ON notes(project);
    CREATE INDEX idx_notes_modified ON notes(modified);
  `);

  // Create tags table (flattened for fast queries)
  db.exec(`
    CREATE TABLE tags (
      id INTEGER PRIMARY KEY,
      note_id INTEGER NOT NULL,
      tag TEXT NOT NULL,
      FOREIGN KEY (note_id) REFERENCES notes(id)
    )
  `);
  db.exec(`CREATE INDEX idx_tags_tag ON tags(tag)`);
  db.exec(`CREATE INDEX idx_tags_note_id ON tags(note_id)`);

  // Create links table (wiki-links between notes)
  db.exec(`
    CREATE TABLE links (
      id INTEGER PRIMARY KEY,
      source_id INTEGER NOT NULL,
      target_path TEXT NOT NULL,
      target_id INTEGER,
      FOREIGN KEY (source_id) REFERENCES notes(id),
      FOREIGN KEY (target_id) REFERENCES notes(id)
    )
  `);
  db.exec(`CREATE INDEX idx_links_source ON links(source_id)`);
  db.exec(`CREATE INDEX idx_links_target ON links(target_path)`);
  db.exec(`CREATE INDEX idx_links_target_id ON links(target_id)`);

  // Create FTS5 virtual table for full-text search
  db.exec(`
    CREATE VIRTUAL TABLE fts_content USING fts5(
      title,
      content,
      content='notes',
      content_rowid='id',
      tokenize='porter unicode61'
    )
  `);
}

/**
 * Populate the database with vault content
 */
function populateDatabase(db, files, verbose) {
  const insertNote = db.prepare(`
    INSERT INTO notes (path, type, title, content, frontmatter, created, modified, status, priority, project, word_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTag = db.prepare(`
    INSERT INTO tags (note_id, tag) VALUES (?, ?)
  `);

  const insertLink = db.prepare(`
    INSERT INTO links (source_id, target_path) VALUES (?, ?)
  `);

  const stats = {
    notes: 0,
    tags: 0,
    links: 0,
    byType: {},
    errors: 0,
  };

  // Insert all notes in a transaction
  const insertAll = db.transaction(() => {
    for (const file of files) {
      const parsed = parseMarkdownFile(file);
      if (!parsed) {
        stats.errors++;
        continue;
      }

      // Insert note (use toSqliteValue for fields that might be non-primitive)
      const result = insertNote.run(
        parsed.path,
        toSqliteValue(parsed.type),
        toSqliteValue(parsed.title),
        parsed.content,
        parsed.frontmatter,
        toSqliteValue(parsed.created),
        toSqliteValue(parsed.modified),
        toSqliteValue(parsed.status),
        toSqliteValue(parsed.priority),
        toSqliteValue(parsed.project),
        parsed.wordCount,
      );
      const noteId = result.lastInsertRowid;
      stats.notes++;

      // Track by type
      const noteType = parsed.type || "unknown";
      stats.byType[noteType] = (stats.byType[noteType] || 0) + 1;

      // Insert tags
      for (const tag of parsed.tags) {
        insertTag.run(noteId, toSqliteValue(tag));
        stats.tags++;
      }

      // Insert links
      for (const link of parsed.links) {
        insertLink.run(noteId, link);
        stats.links++;
      }

      if (verbose) {
        console.log(`  ${parsed.type || "?"}: ${parsed.path}`);
      }
    }
  });

  insertAll();

  return stats;
}

/**
 * Populate FTS index and resolve link targets
 */
function finaliseDatabase(db) {
  // Populate FTS index
  db.exec(`
    INSERT INTO fts_content(rowid, title, content)
    SELECT id, title, content FROM notes
  `);

  // Resolve link target_ids where possible
  db.exec(`
    UPDATE links
    SET target_id = (
      SELECT id FROM notes
      WHERE notes.path LIKE '%' || links.target_path || '.md'
         OR notes.title = links.target_path
      LIMIT 1
    )
  `);

  // Run ANALYZE for query optimisation
  db.exec("ANALYZE");
}

/**
 * Show database statistics
 */
function showStats(db) {
  const noteCount = db.prepare("SELECT COUNT(*) as count FROM notes").get();
  const tagCount = db.prepare("SELECT COUNT(*) as count FROM tags").get();
  const linkCount = db.prepare("SELECT COUNT(*) as count FROM links").get();
  const resolvedLinks = db
    .prepare("SELECT COUNT(*) as count FROM links WHERE target_id IS NOT NULL")
    .get();

  const typeBreakdown = db
    .prepare(
      `
    SELECT type, COUNT(*) as count
    FROM notes
    GROUP BY type
    ORDER BY count DESC
  `,
    )
    .all();

  const topTags = db
    .prepare(
      `
    SELECT tag, COUNT(*) as count
    FROM tags
    GROUP BY tag
    ORDER BY count DESC
    LIMIT 15
  `,
    )
    .all();

  console.log("\n╔══════════════════════════════════════╗");
  console.log("║       VAULT DATABASE STATISTICS      ║");
  console.log("╚══════════════════════════════════════╝\n");

  console.log(`Notes:  ${noteCount.count}`);
  console.log(`Tags:   ${tagCount.count}`);
  console.log(`Links:  ${linkCount.count} (${resolvedLinks.count} resolved)\n`);

  console.log("By Type:");
  for (const row of typeBreakdown) {
    const type = row.type || "(none)";
    console.log(`  ${type.padEnd(20)} ${row.count}`);
  }

  console.log("\nTop Tags:");
  for (const row of topTags) {
    console.log(`  ${row.tag.padEnd(30)} ${row.count}`);
  }

  // Database file size
  const dbStats = fs.statSync(DB_PATH);
  const sizeMB = (dbStats.size / 1024 / 1024).toFixed(2);
  console.log(`\nDatabase size: ${sizeMB} MB`);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  // Stats-only mode
  if (options.stats) {
    if (!fs.existsSync(DB_PATH)) {
      console.error("Error: Database not found. Run without --stats first.");
      process.exit(1);
    }
    const db = new Database(DB_PATH, { readonly: true });
    showStats(db);
    db.close();
    process.exit(0);
  }

  console.log("Vault to SQLite - Building searchable index\n");

  // Ensure .data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Get all markdown files
  console.log("Scanning vault for markdown files...");
  const files = await getMarkdownFiles();
  console.log(`  Found ${files.length} files to index\n`);

  // Remove existing database
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }

  // Create and populate database
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  console.log("Creating database schema...");
  createSchema(db);

  console.log("Indexing vault content...");
  const stats = populateDatabase(db, files, options.verbose);

  console.log("Building FTS index and resolving links...");
  finaliseDatabase(db);

  // Show results
  console.log("\n✓ Database created successfully");
  console.log(`  Path: ${DB_PATH}`);
  console.log(`  Notes: ${stats.notes}`);
  console.log(`  Tags: ${stats.tags}`);
  console.log(`  Links: ${stats.links}`);
  if (stats.errors > 0) {
    console.log(`  Errors: ${stats.errors}`);
  }

  showStats(db);

  db.close();

  console.log("\nQuick queries:");
  console.log(
    "  sqlite3 .data/vault.db -markdown \"SELECT path, title FROM notes WHERE type = 'Adr' LIMIT 10\"",
  );
  console.log(
    "  sqlite3 .data/vault.db -markdown \"SELECT path, snippet(fts_content,1,'→','←','...',40) FROM fts_content WHERE fts_content MATCH 'architecture' LIMIT 10\"",
  );
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
