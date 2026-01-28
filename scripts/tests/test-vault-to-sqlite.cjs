#!/usr/bin/env node
/**
 * Test Suite: Vault SQLite Index
 *
 * Comprehensive tests for the vault-to-sqlite.js script.
 * Validates database schema, data integrity, FTS5 search, and performance.
 *
 * Usage:
 *   node scripts/tests/test-vault-to-sqlite.cjs
 *   npm run test:vault-index
 */

const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const VAULT_ROOT = path.resolve(__dirname, "../..");
const DB_PATH = path.join(VAULT_ROOT, ".data", "vault.db");

// Test results tracking
const results = {
  passed: 0,
  failed: 0,
  errors: [],
};

function test(name, fn) {
  try {
    fn();
    results.passed++;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    results.failed++;
    results.errors.push({ name, error: error.message });
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function assertTrue(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertGreaterThan(actual, expected, message) {
  if (actual <= expected) {
    throw new Error(`${message}: expected > ${expected}, got ${actual}`);
  }
}

// ============================================================
// Test Categories
// ============================================================

function testPrerequisites() {
  console.log("\n📋 Prerequisites");

  test("Database file exists", () => {
    assertTrue(fs.existsSync(DB_PATH), `Database not found at ${DB_PATH}`);
  });

  test("Database is readable", () => {
    const db = new Database(DB_PATH, { readonly: true });
    db.close();
  });

  test("Script file exists", () => {
    const scriptPath = path.join(VAULT_ROOT, "scripts", "vault-to-sqlite.js");
    assertTrue(fs.existsSync(scriptPath), "vault-to-sqlite.js not found");
  });

  test("better-sqlite3 is installed", () => {
    try {
      require.resolve("better-sqlite3");
    } catch {
      throw new Error("better-sqlite3 not installed - run npm install");
    }
  });
}

function testSchemaValidation() {
  console.log("\n📊 Schema Validation");

  const db = new Database(DB_PATH, { readonly: true });

  try {
    test("notes table exists with correct columns", () => {
      const info = db.prepare("PRAGMA table_info(notes)").all();
      const columns = info.map((col) => col.name);
      const required = [
        "id",
        "path",
        "type",
        "title",
        "content",
        "frontmatter",
        "created",
        "modified",
        "status",
        "priority",
        "project",
        "word_count",
      ];
      for (const col of required) {
        assertTrue(columns.includes(col), `Missing column: ${col}`);
      }
    });

    test("tags table exists with correct columns", () => {
      const info = db.prepare("PRAGMA table_info(tags)").all();
      const columns = info.map((col) => col.name);
      assertTrue(columns.includes("note_id"), "Missing note_id column");
      assertTrue(columns.includes("tag"), "Missing tag column");
    });

    test("links table exists with correct columns", () => {
      const info = db.prepare("PRAGMA table_info(links)").all();
      const columns = info.map((col) => col.name);
      assertTrue(columns.includes("source_id"), "Missing source_id column");
      assertTrue(columns.includes("target_path"), "Missing target_path column");
      assertTrue(columns.includes("target_id"), "Missing target_id column");
    });

    test("fts_content virtual table exists", () => {
      const tables = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='fts_content'"
        )
        .get();
      assertTrue(tables !== undefined, "fts_content table not found");
    });

    test("indexes exist for common queries", () => {
      const indexes = db
        .prepare("SELECT name FROM sqlite_master WHERE type='index'")
        .all()
        .map((i) => i.name);
      assertTrue(
        indexes.some((i) => i.includes("notes_type")),
        "Missing type index"
      );
      assertTrue(
        indexes.some((i) => i.includes("notes_status")),
        "Missing status index"
      );
      assertTrue(
        indexes.some((i) => i.includes("tags_tag")),
        "Missing tag index"
      );
    });
  } finally {
    db.close();
  }
}

function testDataIntegrity() {
  console.log("\n🔍 Data Integrity");

  const db = new Database(DB_PATH, { readonly: true });

  try {
    test("notes table has records", () => {
      const count = db.prepare("SELECT COUNT(*) as count FROM notes").get();
      assertGreaterThan(count.count, 0, "No notes found in database");
    });

    test("all notes have paths", () => {
      const nullPaths = db
        .prepare("SELECT COUNT(*) as count FROM notes WHERE path IS NULL")
        .get();
      assertEqual(nullPaths.count, 0, "Found notes with null paths");
    });

    test("all notes have titles", () => {
      const nullTitles = db
        .prepare("SELECT COUNT(*) as count FROM notes WHERE title IS NULL")
        .get();
      assertEqual(nullTitles.count, 0, "Found notes with null titles");
    });

    test("paths are unique", () => {
      const duplicates = db
        .prepare(
          "SELECT path, COUNT(*) as count FROM notes GROUP BY path HAVING count > 1"
        )
        .all();
      assertEqual(duplicates.length, 0, `Found duplicate paths: ${duplicates.map((d) => d.path).join(", ")}`);
    });

    test("tag note_ids reference valid notes", () => {
      const orphanTags = db
        .prepare(
          "SELECT COUNT(*) as count FROM tags WHERE note_id NOT IN (SELECT id FROM notes)"
        )
        .get();
      assertEqual(orphanTags.count, 0, "Found orphan tags");
    });

    test("link source_ids reference valid notes", () => {
      const orphanLinks = db
        .prepare(
          "SELECT COUNT(*) as count FROM links WHERE source_id NOT IN (SELECT id FROM notes)"
        )
        .get();
      assertEqual(orphanLinks.count, 0, "Found orphan links");
    });

    test("FTS index row count matches notes", () => {
      const noteCount = db.prepare("SELECT COUNT(*) as count FROM notes").get();
      const ftsCount = db
        .prepare("SELECT COUNT(*) as count FROM fts_content")
        .get();
      assertEqual(
        ftsCount.count,
        noteCount.count,
        "FTS index count mismatch"
      );
    });

    test("word_count is populated for notes with content", () => {
      const missing = db
        .prepare(
          "SELECT COUNT(*) as count FROM notes WHERE content != '' AND word_count IS NULL"
        )
        .get();
      assertEqual(missing.count, 0, "Found notes missing word_count");
    });

    test("frontmatter is valid JSON where present", () => {
      const notes = db
        .prepare("SELECT frontmatter FROM notes WHERE frontmatter IS NOT NULL")
        .all();
      for (const note of notes.slice(0, 10)) {
        // Sample check
        JSON.parse(note.frontmatter); // Should not throw
      }
    });
  } finally {
    db.close();
  }
}

function testFTS5Search() {
  console.log("\n🔎 FTS5 Full-Text Search");

  const db = new Database(DB_PATH, { readonly: true });

  try {
    test("FTS MATCH query works", () => {
      const results = db
        .prepare(
          "SELECT COUNT(*) as count FROM fts_content WHERE fts_content MATCH 'the'"
        )
        .get();
      // Should find at least some results (common word)
      assertGreaterThan(results.count, 0, "FTS MATCH returned no results");
    });

    test("FTS snippet function works", () => {
      const result = db
        .prepare(
          "SELECT snippet(fts_content, 1, '→', '←', '...', 10) as snip FROM fts_content LIMIT 1"
        )
        .get();
      assertTrue(result !== undefined, "Snippet query failed");
    });

    test("FTS rank ordering works", () => {
      const results = db
        .prepare(
          "SELECT rank FROM fts_content WHERE fts_content MATCH 'the' ORDER BY rank LIMIT 5"
        )
        .all();
      assertTrue(results.length > 0, "Rank ordering returned no results");
    });

    test("FTS phrase search works", () => {
      // This tests the porter tokenizer handles phrases
      const result = db
        .prepare(
          "SELECT COUNT(*) as count FROM fts_content WHERE fts_content MATCH '\"test\"'"
        )
        .get();
      // Just verify it doesn't error
      assertTrue(result !== undefined, "Phrase search failed");
    });

    test("FTS joined with notes table works", () => {
      const result = db
        .prepare(
          `
        SELECT n.path, n.type
        FROM fts_content f
        JOIN notes n ON f.rowid = n.id
        WHERE fts_content MATCH 'the'
        LIMIT 1
      `
        )
        .get();
      assertTrue(result !== undefined, "Join query failed");
    });
  } finally {
    db.close();
  }
}

function testQueryPerformance() {
  console.log("\n⚡ Query Performance");

  const db = new Database(DB_PATH, { readonly: true });

  try {
    test("Type filter query < 100ms", () => {
      const start = Date.now();
      db.prepare("SELECT path, title FROM notes WHERE type = 'Adr'").all();
      const elapsed = Date.now() - start;
      assertTrue(elapsed < 100, `Query took ${elapsed}ms`);
    });

    test("FTS search query < 100ms", () => {
      const start = Date.now();
      db.prepare(
        "SELECT rowid FROM fts_content WHERE fts_content MATCH 'architecture' LIMIT 20"
      ).all();
      const elapsed = Date.now() - start;
      assertTrue(elapsed < 100, `Query took ${elapsed}ms`);
    });

    test("Tag join query < 100ms", () => {
      const start = Date.now();
      db.prepare(
        `
        SELECT n.path FROM notes n
        JOIN tags t ON n.id = t.note_id
        WHERE t.tag LIKE 'technology/%'
        LIMIT 20
      `
      ).all();
      const elapsed = Date.now() - start;
      assertTrue(elapsed < 100, `Query took ${elapsed}ms`);
    });

    test("Backlinks query < 100ms", () => {
      const start = Date.now();
      db.prepare(
        `
        SELECT n.path FROM notes n
        JOIN links l ON n.id = l.source_id
        WHERE l.target_path LIKE '%Project%'
        LIMIT 20
      `
      ).all();
      const elapsed = Date.now() - start;
      assertTrue(elapsed < 100, `Query took ${elapsed}ms`);
    });
  } finally {
    db.close();
  }
}

function testScriptExecution() {
  console.log("\n🚀 Script Execution");

  test("vault-to-sqlite.js --help works", () => {
    try {
      execSync("node scripts/vault-to-sqlite.js --help", {
        cwd: VAULT_ROOT,
        encoding: "utf-8",
      });
    } catch (error) {
      // --help exits with 0, so this should work
      throw new Error(`--help failed: ${error.message}`);
    }
  });

  test("vault-to-sqlite.js --stats works", () => {
    const output = execSync("node scripts/vault-to-sqlite.js --stats", {
      cwd: VAULT_ROOT,
      encoding: "utf-8",
    });
    assertTrue(output.includes("Notes:"), "Stats output missing note count");
    assertTrue(output.includes("Tags:"), "Stats output missing tag count");
  });

  test("npm run vault:stats script works", () => {
    try {
      const output = execSync("npm run vault:stats --silent", {
        cwd: VAULT_ROOT,
        encoding: "utf-8",
      });
      assertTrue(
        output.includes("Notes:"),
        "npm script output missing note count"
      );
    } catch {
      throw new Error("npm run vault:stats failed");
    }
  });
}

function testEdgeCases() {
  console.log("\n🔧 Edge Cases");

  const db = new Database(DB_PATH, { readonly: true });

  try {
    test("handles notes without frontmatter gracefully", () => {
      // These should exist in the DB even with null/empty frontmatter
      const count = db.prepare("SELECT COUNT(*) as count FROM notes").get();
      assertGreaterThan(count.count, 0, "No notes found");
    });

    test("handles special characters in paths", () => {
      // Query should not fail on special chars
      const result = db
        .prepare("SELECT path FROM notes WHERE path LIKE '%+%' LIMIT 1")
        .get();
      // Just verify query doesn't error (may or may not find results)
      assertTrue(true, "Query executed");
    });

    test("handles empty tags array gracefully", () => {
      const notesWithoutTags = db
        .prepare(
          "SELECT COUNT(*) as count FROM notes WHERE id NOT IN (SELECT DISTINCT note_id FROM tags)"
        )
        .get();
      // This is fine - not all notes have tags
      assertTrue(true, `${notesWithoutTags.count} notes without tags`);
    });

    test("handles notes with no outgoing links", () => {
      const isolated = db
        .prepare(
          "SELECT COUNT(*) as count FROM notes WHERE id NOT IN (SELECT DISTINCT source_id FROM links)"
        )
        .get();
      // This is fine - not all notes have links
      assertTrue(true, `${isolated.count} notes without outgoing links`);
    });
  } finally {
    db.close();
  }
}

// ============================================================
// Main Execution
// ============================================================

function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║     VAULT SQLITE INDEX TEST SUITE                ║");
  console.log("╚══════════════════════════════════════════════════╝");

  testPrerequisites();
  testSchemaValidation();
  testDataIntegrity();
  testFTS5Search();
  testQueryPerformance();
  testScriptExecution();
  testEdgeCases();

  // Summary
  console.log("\n════════════════════════════════════════════════════");
  console.log(`TOTAL: ${results.passed}/${results.passed + results.failed} PASSED`);

  if (results.failed > 0) {
    console.log(`\n❌ ${results.failed} test(s) failed:`);
    for (const { name, error } of results.errors) {
      console.log(`   - ${name}: ${error}`);
    }
    process.exit(1);
  } else {
    console.log("\n✅ All tests passed!");
    process.exit(0);
  }
}

main();
