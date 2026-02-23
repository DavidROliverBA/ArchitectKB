#!/usr/bin/env node
/**
 * CSV to SQLite converter with automatic schema inference
 *
 * Features:
 * - Automatic type detection (INTEGER, REAL, TEXT)
 * - Column name sanitisation for SQL compatibility
 * - Automatic indexing on ID and category columns
 * - Full-text search support (optional)
 * - Handles large files efficiently with transactions
 *
 * Usage:
 *   node scripts/csv-to-sqlite.js <csv-path> [options]
 *
 * Options:
 *   --db-name <name>      Database filename (default: derived from CSV name)
 *   --table <name>        Table name (default: 'data')
 *   --start-row <n>       Skip first N rows (for metadata/headers)
 *   --fts                 Create full-text search index on text columns
 *   --dry-run             Show schema without creating database
 *   --verbose             Show detailed progress
 */

import Database from "better-sqlite3";
import Papa from "papaparse";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VAULT_ROOT = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(VAULT_ROOT, ".data");

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const options = {
    csvPath: null,
    dbName: null,
    tableName: "data",
    startRow: null,
    fts: false,
    dryRun: false,
    verbose: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--db-name" && args[i + 1]) {
      options.dbName = args[++i];
    } else if (arg === "--table" && args[i + 1]) {
      options.tableName = args[++i];
    } else if (arg === "--start-row" && args[i + 1]) {
      options.startRow = parseInt(args[++i], 10);
    } else if (arg === "--fts") {
      options.fts = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--verbose" || arg === "-v") {
      options.verbose = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith("--") && !options.csvPath) {
      options.csvPath = arg;
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
CSV to SQLite Converter

Usage:
  node scripts/csv-to-sqlite.js <csv-path> [options]

Options:
  --db-name <name>      Database filename (default: derived from CSV name)
  --table <name>        Table name (default: 'data')
  --start-row <n>       Skip first N rows (0-indexed, for metadata/headers)
  --fts                 Create full-text search index on text columns
  --dry-run             Show schema without creating database
  --verbose, -v         Show detailed progress
  --help, -h            Show this help message

Examples:
  node scripts/csv-to-sqlite.js "Inbox/data.csv"
  node scripts/csv-to-sqlite.js "Inbox/rfi.csv" --start-row 14 --fts
  node scripts/csv-to-sqlite.js data.csv --db-name my-data.db --table responses

Output:
  Creates database in .data/ directory
  Query with: sqlite3 .data/<db-name> -markdown -header "SELECT * FROM <table>;"
`);
}

/**
 * Sanitise column name for SQL
 */
function sanitiseColumnName(name) {
  if (!name || name.trim() === "") {
    return null; // Will be filtered out
  }

  // Replace non-alphanumeric characters with underscores
  let safe = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_") // Collapse multiple underscores
    .replace(/^_|_$/g, ""); // Remove leading/trailing underscores

  // Ensure it doesn't start with a number
  if (/^\d/.test(safe)) {
    safe = "col_" + safe;
  }

  // Handle reserved SQL keywords
  const reserved = [
    "select",
    "from",
    "where",
    "order",
    "group",
    "by",
    "index",
    "table",
    "create",
    "drop",
    "insert",
    "update",
    "delete",
    "and",
    "or",
    "not",
    "null",
    "true",
    "false",
  ];
  if (reserved.includes(safe)) {
    safe = safe + "_col";
  }

  return safe || "unnamed";
}

/**
 * Infer SQLite type from sample values
 */
function inferColumnType(values) {
  const nonEmpty = values.filter(
    (v) => v !== null && v !== undefined && String(v).trim() !== "",
  );

  if (nonEmpty.length === 0) return "TEXT";

  // Check if all values are integers
  const allIntegers = nonEmpty.every((v) => {
    const str = String(v).trim();
    const num = Number(str);
    return !isNaN(num) && Number.isInteger(num) && str === String(num);
  });
  if (allIntegers) return "INTEGER";

  // Check if all values are numbers (including decimals)
  const allNumbers = nonEmpty.every((v) => {
    const cleaned = String(v)
      .trim()
      .replace(/[£$€%,\s]/g, "");
    return cleaned !== "" && !isNaN(parseFloat(cleaned)) && isFinite(cleaned);
  });
  if (allNumbers) return "REAL";

  return "TEXT";
}

/**
 * Detect which columns are empty (no header and no data)
 */
function detectNonEmptyColumns(headers, data) {
  const nonEmptyIndices = [];

  for (let col = 0; col < headers.length; col++) {
    const header = headers[col];
    const hasHeader = header && String(header).trim() !== "";

    // Check if any data row has content in this column
    const hasData = data.some((row) => {
      const cell = row[col];
      return cell !== null && cell !== undefined && String(cell).trim() !== "";
    });

    if (hasHeader || hasData) {
      nonEmptyIndices.push(col);
    }
  }

  return nonEmptyIndices;
}

/**
 * Convert CSV to SQLite database
 */
async function csvToSqlite(options) {
  const absolutePath = path.isAbsolute(options.csvPath)
    ? options.csvPath
    : path.resolve(VAULT_ROOT, options.csvPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  console.log(`\nParsing CSV: ${options.csvPath}`);

  // Parse CSV
  const csvContent = fs.readFileSync(absolutePath, "utf-8");
  const parseResult = Papa.parse(csvContent, {
    header: false,
    skipEmptyLines: false,
    dynamicTyping: false,
  });

  let data = parseResult.data;
  console.log(`  Total rows: ${data.length}`);

  // Apply start row if specified
  if (options.startRow !== null && options.startRow > 0) {
    data = data.slice(options.startRow);
    console.log(`  Starting from row: ${options.startRow}`);
  }

  // Filter empty rows
  data = data.filter((row) =>
    row.some((cell) => cell && String(cell).trim() !== ""),
  );
  console.log(`  Non-empty rows: ${data.length}`);

  if (data.length < 2) {
    throw new Error("CSV must have at least a header row and one data row");
  }

  // First row is headers
  const rawHeaders = data[0];
  const dataRows = data.slice(1);

  // Detect non-empty columns
  const nonEmptyIndices = detectNonEmptyColumns(rawHeaders, dataRows);
  const emptyColsRemoved = rawHeaders.length - nonEmptyIndices.length;

  if (emptyColsRemoved > 0) {
    console.log(`  Empty columns removed: ${emptyColsRemoved}`);
  }

  // Build schema from non-empty columns
  const sampleSize = Math.min(100, dataRows.length);
  const schema = [];

  for (const colIdx of nonEmptyIndices) {
    const originalName = rawHeaders[colIdx] || `column_${colIdx}`;
    const safeName = sanitiseColumnName(originalName);

    if (!safeName) continue;

    // Sample values for type inference
    const values = dataRows.slice(0, sampleSize).map((row) => row[colIdx]);
    const sqlType = inferColumnType(values);

    // Detect if this should be indexed
    const lowerName = safeName.toLowerCase();
    const shouldIndex =
      lowerName.includes("id") ||
      lowerName.includes("category") ||
      lowerName.includes("type") ||
      lowerName.includes("status");

    // Detect if this is a text column for FTS
    const isLongText =
      sqlType === "TEXT" && values.some((v) => v && String(v).length > 200);

    schema.push({
      originalName,
      safeName,
      sqlType,
      colIndex: colIdx,
      shouldIndex,
      isLongText,
    });
  }

  console.log(`  Columns: ${schema.length}`);

  if (options.verbose) {
    console.log("\nSchema:");
    schema.forEach((col) => {
      const flags = [];
      if (col.shouldIndex) flags.push("indexed");
      if (col.isLongText) flags.push("long-text");
      console.log(
        `  ${col.safeName}: ${col.sqlType}${flags.length ? ` (${flags.join(", ")})` : ""}`,
      );
    });
  }

  if (options.dryRun) {
    console.log("\n--- DRY RUN ---");
    console.log(
      `Would create: .data/${options.dbName || path.basename(absolutePath, ".csv") + ".db"}`,
    );
    console.log(`Table: ${options.tableName}`);
    console.log(`Rows: ${dataRows.length}`);
    console.log(`Columns: ${schema.length}`);

    const createSQL = `CREATE TABLE ${options.tableName} (\n  id INTEGER PRIMARY KEY,\n  ${schema.map((c) => `"${c.safeName}" ${c.sqlType}`).join(",\n  ")}\n);`;
    console.log("\nCREATE statement:");
    console.log(createSQL);
    return;
  }

  // Create .data directory if needed
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Determine database path
  const csvBaseName = path.basename(absolutePath, ".csv");
  const dbFileName =
    options.dbName || csvBaseName.toLowerCase().replace(/\s+/g, "-") + ".db";
  const dbPath = path.join(DATA_DIR, dbFileName);

  // Remove existing database
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  console.log(`\nCreating database: ${dbPath}`);

  // Create database
  const db = new Database(dbPath);

  // Enable WAL mode for better performance
  db.pragma("journal_mode = WAL");

  // Create table (use _rowid to avoid conflict with CSV columns named 'id')
  const columnDefs = schema
    .map((c) => `"${c.safeName}" ${c.sqlType}`)
    .join(", ");
  const createTableSQL = `CREATE TABLE ${options.tableName} (_rowid INTEGER PRIMARY KEY, ${columnDefs})`;
  db.exec(createTableSQL);

  if (options.verbose) {
    console.log("  Table created");
  }

  // Prepare insert statement
  const placeholders = schema.map(() => "?").join(", ");
  const columnNames = schema.map((c) => `"${c.safeName}"`).join(", ");
  const insertSQL = `INSERT INTO ${options.tableName} (${columnNames}) VALUES (${placeholders})`;
  const insertStmt = db.prepare(insertSQL);

  // Insert data in transaction for performance
  const insertMany = db.transaction((rows) => {
    for (const row of rows) {
      const values = schema.map((col) => {
        const val = row[col.colIndex];
        if (val === null || val === undefined || String(val).trim() === "") {
          return null;
        }
        if (col.sqlType === "INTEGER") {
          const num = parseInt(val, 10);
          return isNaN(num) ? null : num;
        }
        if (col.sqlType === "REAL") {
          const cleaned = String(val).replace(/[£$€%,\s]/g, "");
          const num = parseFloat(cleaned);
          return isNaN(num) ? null : num;
        }
        return String(val);
      });
      insertStmt.run(values);
    }
  });

  insertMany(dataRows);
  console.log(`  Inserted ${dataRows.length} rows`);

  // Create indexes
  const indexedCols = schema.filter((c) => c.shouldIndex);
  for (const col of indexedCols) {
    const indexSQL = `CREATE INDEX idx_${col.safeName} ON ${options.tableName}("${col.safeName}")`;
    db.exec(indexSQL);
  }

  if (indexedCols.length > 0) {
    console.log(`  Created ${indexedCols.length} indexes`);
  }

  // Create FTS index if requested
  if (options.fts) {
    const textCols = schema.filter((c) => c.isLongText);
    if (textCols.length > 0) {
      const ftsTableName = `${options.tableName}_fts`;
      const ftsColumns = textCols.map((c) => c.safeName).join(", ");

      // Create FTS5 virtual table
      const ftsSQL = `CREATE VIRTUAL TABLE ${ftsTableName} USING fts5(${ftsColumns}, content='${options.tableName}', content_rowid='_rowid')`;
      db.exec(ftsSQL);

      // Populate FTS table
      const populateSQL = `INSERT INTO ${ftsTableName}(rowid, ${ftsColumns}) SELECT _rowid, ${ftsColumns} FROM ${options.tableName}`;
      db.exec(populateSQL);

      console.log(`  Created FTS index on: ${ftsColumns}`);
    }
  }

  // Run ANALYZE for query optimisation
  db.exec("ANALYZE");

  db.close();

  // Generate query examples
  console.log("\n✓ Database created successfully");
  console.log(`  Path: ${dbPath}`);
  console.log(`  Table: ${options.tableName}`);
  console.log(`  Rows: ${dataRows.length}`);
  console.log(`  Columns: ${schema.length}`);

  console.log("\nExample queries:");
  console.log(
    `  sqlite3 "${dbPath}" -markdown -header "SELECT * FROM ${options.tableName} LIMIT 5;"`,
  );
  console.log(
    `  sqlite3 "${dbPath}" -json "SELECT * FROM ${options.tableName};"`,
  );

  if (options.fts) {
    const ftsTableName = `${options.tableName}_fts`;
    console.log(
      `  sqlite3 "${dbPath}" "SELECT * FROM ${ftsTableName} WHERE ${ftsTableName} MATCH 'search term';"`,
    );
  }

  return {
    dbPath,
    tableName: options.tableName,
    rowCount: dataRows.length,
    schema,
  };
}

// Main execution
const args = process.argv.slice(2);
const options = parseArgs(args);

if (!options.csvPath) {
  console.error("Error: CSV path required");
  printHelp();
  process.exit(1);
}

csvToSqlite(options).catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exit(1);
});
