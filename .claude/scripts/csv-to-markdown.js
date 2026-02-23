#!/usr/bin/env node

/**
 * CSV to Markdown Table Converter
 *
 * Converts CSV files into Page notes with markdown tables.
 * Uses PapaParse for robust RFC 4180 compliant parsing.
 * Supports unlimited cell content (no truncation by default).
 *
 * Usage:
 *   node scripts/csv-to-markdown.js <csv-file> [options]
 *   node scripts/csv-to-markdown.js "Inbox/data.csv"
 *   node scripts/csv-to-markdown.js "Inbox/data.csv" --title "Custom Title"
 *   node scripts/csv-to-markdown.js "Inbox/data.csv" --split  # Create individual notes
 *   node scripts/csv-to-markdown.js "Inbox/data.csv" --truncate 100  # Optional truncation
 *
 * Exit codes:
 *   0 - Success
 *   1 - Error (file not found, parse error, etc.)
 */

import fs from "fs";
import path from "path";
import Papa from "papaparse";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VAULT_ROOT = path.resolve(__dirname, "../..");

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const options = {
    csvPath: null,
    title: null,
    truncate: null, // null = no truncation (default)
    skipEmptyRows: true, // Skip empty rows by default
    skipEmptyColumns: true, // Skip columns with no header and no data by default
    outputJson: false,
    dryRun: false,
    verbose: false,
    delimiter: null, // Auto-detect by default
    startRow: null, // Skip header rows
    endRow: null, // Stop at row
    split: false, // Split into individual notes for each row
    splitFolder: null, // Folder for split notes
    idColumn: null, // Column index/name for note IDs (0-indexed)
    contentColumn: null, // Column index for main content (0-indexed)
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--title" && args[i + 1]) {
      options.title = args[++i];
    } else if (arg === "--truncate" && args[i + 1]) {
      options.truncate = parseInt(args[++i], 10);
    } else if (arg === "--skip-empty-rows") {
      options.skipEmptyRows = true;
    } else if (arg === "--keep-empty-rows") {
      options.skipEmptyRows = false;
    } else if (arg === "--keep-empty-columns") {
      options.skipEmptyColumns = false;
    } else if (arg === "--output-json") {
      options.outputJson = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--verbose" || arg === "-v") {
      options.verbose = true;
    } else if (arg === "--delimiter" && args[i + 1]) {
      options.delimiter = args[++i];
    } else if (arg === "--start-row" && args[i + 1]) {
      options.startRow = parseInt(args[++i], 10);
    } else if (arg === "--end-row" && args[i + 1]) {
      options.endRow = parseInt(args[++i], 10);
    } else if (arg === "--split") {
      options.split = true;
    } else if (arg === "--split-folder" && args[i + 1]) {
      options.splitFolder = args[++i];
    } else if (arg === "--id-column" && args[i + 1]) {
      options.idColumn = parseInt(args[++i], 10);
    } else if (arg === "--content-column" && args[i + 1]) {
      options.contentColumn = parseInt(args[++i], 10);
    } else if (!arg.startsWith("--") && !options.csvPath) {
      options.csvPath = arg;
    }
  }

  return options;
}

/**
 * Read and parse CSV file
 */
async function parseCSV(filePath, options) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(VAULT_ROOT, filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const content = fs.readFileSync(absolutePath, "utf-8");

  const parseResult = Papa.parse(content, {
    delimiter: options.delimiter || "", // Empty string = auto-detect
    header: false,
    skipEmptyLines: false, // We handle this ourselves for better control
    transformHeader: undefined,
    dynamicTyping: false, // Keep as strings for markdown
  });

  if (parseResult.errors.length > 0) {
    console.warn(chalk.yellow("Parse warnings:"));
    parseResult.errors.forEach((err) => {
      console.warn(chalk.yellow(`  Row ${err.row}: ${err.message}`));
    });
  }

  return {
    data: parseResult.data,
    meta: parseResult.meta,
    errors: parseResult.errors,
    filePath: absolutePath,
    fileName: path.basename(absolutePath),
  };
}

/**
 * Escape markdown special characters in cell content
 */
function escapeMarkdown(text) {
  if (text === null || text === undefined) return "";

  let str = String(text);

  // Escape pipe characters (critical for markdown tables)
  str = str.replace(/\|/g, "\\|");

  // Escape backslashes (but not escape sequences we just added)
  str = str.replace(/\\(?![|])/g, "\\\\");

  // Convert newlines to <br> for markdown table compatibility
  str = str.replace(/\r\n/g, "<br>");
  str = str.replace(/\n/g, "<br>");
  str = str.replace(/\r/g, "<br>");

  return str;
}

/**
 * Truncate text if truncation is enabled and text exceeds max width
 */
function truncateText(text, maxWidth) {
  if (!maxWidth || !text || text.length <= maxWidth) return text;
  return text.substring(0, maxWidth - 3) + "...";
}

/**
 * Check if a row is effectively empty (all cells empty or whitespace)
 */
function isEmptyRow(row) {
  return row.every((cell) => !cell || String(cell).trim() === "");
}

/**
 * Detect which columns are empty (no header and no data in any row)
 * Returns array of column indices that have content
 */
function detectNonEmptyColumns(data) {
  if (!data || data.length === 0) return [];

  const numCols = Math.max(...data.map((row) => row.length));
  const nonEmptyColumnIndices = [];

  for (let col = 0; col < numCols; col++) {
    let hasContent = false;
    for (let row = 0; row < data.length; row++) {
      const cell = data[row]?.[col];
      if (cell && String(cell).trim() !== "") {
        hasContent = true;
        break;
      }
    }
    if (hasContent) {
      nonEmptyColumnIndices.push(col);
    }
  }

  return nonEmptyColumnIndices;
}

/**
 * Filter data to only include specified column indices
 */
function filterColumns(data, columnIndices) {
  return data.map((row) => columnIndices.map((colIdx) => row[colIdx] || ""));
}

/**
 * Detect column alignment based on content
 */
function detectColumnAlignment(data, headerRowIndex) {
  const numCols = Math.max(...data.map((row) => row.length));
  const alignments = [];

  for (let col = 0; col < numCols; col++) {
    let numericCount = 0;
    let totalCount = 0;

    for (let row = headerRowIndex + 1; row < data.length; row++) {
      const cell = data[row]?.[col];
      if (cell && String(cell).trim()) {
        totalCount++;
        const cleanValue = String(cell).replace(/[£$€%,\s]/g, "");
        if (!isNaN(parseFloat(cleanValue)) && isFinite(cleanValue)) {
          numericCount++;
        }
      }
    }

    alignments.push(numericCount > totalCount * 0.7 ? "right" : "left");
  }

  return alignments;
}

/**
 * Generate markdown alignment string
 */
function getAlignmentSeparator(alignment) {
  switch (alignment) {
    case "right":
      return "---:";
    case "center":
      return ":---:";
    default:
      return ":---";
  }
}

/**
 * Convert parsed CSV data to markdown table
 */
function csvToMarkdownTable(data, options) {
  if (!data || data.length === 0) {
    return { table: "", stats: { rows: 0, columns: 0 } };
  }

  // Apply row range FIRST (before empty row filtering) so startRow refers to original row numbers
  let filteredData = data;
  if (options.startRow !== null) {
    filteredData = filteredData.slice(options.startRow);
  }
  if (options.endRow !== null) {
    filteredData = filteredData.slice(
      0,
      options.endRow - (options.startRow || 0),
    );
  }

  // Filter empty rows if requested (after row range applied)
  if (options.skipEmptyRows) {
    filteredData = filteredData.filter((row) => !isEmptyRow(row));
  }

  if (filteredData.length === 0) {
    return { table: "", stats: { rows: 0, columns: 0 } };
  }

  // Filter empty columns if requested (default: true)
  let columnsRemoved = 0;
  if (options.skipEmptyColumns) {
    const originalColCount = Math.max(...filteredData.map((row) => row.length));
    const nonEmptyColumnIndices = detectNonEmptyColumns(filteredData);
    columnsRemoved = originalColCount - nonEmptyColumnIndices.length;
    if (columnsRemoved > 0) {
      filteredData = filterColumns(filteredData, nonEmptyColumnIndices);
    }
  }

  const headerRowIndex = 0;
  const numCols = Math.max(...filteredData.map((row) => row.length));
  const alignments = detectColumnAlignment(filteredData, headerRowIndex);

  const lines = [];

  for (let rowIndex = 0; rowIndex < filteredData.length; rowIndex++) {
    const row = filteredData[rowIndex];

    const paddedRow = [...row];
    while (paddedRow.length < numCols) {
      paddedRow.push("");
    }

    const cells = paddedRow.map((cell) => {
      let content = escapeMarkdown(cell);
      // Only truncate if truncation is enabled
      if (options.truncate) {
        content = truncateText(content, options.truncate);
      }
      return content || " ";
    });

    lines.push("| " + cells.join(" | ") + " |");

    if (rowIndex === headerRowIndex) {
      const separators = alignments.map((a) => getAlignmentSeparator(a));
      while (separators.length < numCols) {
        separators.push(":---");
      }
      lines.push("| " + separators.join(" | ") + " |");
    }
  }

  return {
    table: lines.join("\n"),
    stats: {
      rows: filteredData.length,
      columns: numCols,
      columnsRemoved: columnsRemoved,
      headerRow: headerRowIndex,
    },
  };
}

/**
 * Create individual notes for each data row (split mode)
 */
function createSplitNotes(data, headers, options, baseTitle) {
  const today = new Date().toISOString().split("T")[0];
  const createdNotes = [];
  const folderPath = options.splitFolder || "";

  // Ensure folder exists
  if (folderPath) {
    const fullFolderPath = path.resolve(VAULT_ROOT, folderPath);
    if (!fs.existsSync(fullFolderPath)) {
      fs.mkdirSync(fullFolderPath, { recursive: true });
    }
  }

  // Process each data row (skip header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (isEmptyRow(row)) continue;

    // Determine note ID and title
    const idCol = options.idColumn !== null ? options.idColumn : 0;
    const rowId = row[idCol] || `Row-${i}`;
    const sanitizedId = String(rowId)
      .replace(/[<>:"/\\|?*]/g, "-")
      .trim();

    // Create note filename
    const noteFileName = `${baseTitle} - ${sanitizedId}.md`;
    const notePath = folderPath
      ? path.resolve(VAULT_ROOT, folderPath, noteFileName)
      : path.resolve(VAULT_ROOT, noteFileName);

    // Build note content
    let noteContent = `---
type: Page
title: "${baseTitle} - ${sanitizedId}"
created: ${today}
modified: ${today}
tags: [csv-import]
source: "${options.csvPath}"
rowId: "${sanitizedId}"
---

# ${baseTitle} - ${sanitizedId}

`;

    // Add each field as a section
    headers.forEach((header, colIndex) => {
      const cellContent = row[colIndex] || "";
      if (cellContent.trim()) {
        const headerText = header || `Column ${colIndex + 1}`;
        noteContent += `## ${headerText}\n\n${cellContent}\n\n`;
      }
    });

    noteContent += `---

## Metadata

- **Source**: \`${options.csvPath}\`
- **Row**: ${i}
- **Imported**: ${today}
`;

    if (!options.dryRun) {
      fs.writeFileSync(notePath, noteContent, "utf-8");
    }

    createdNotes.push({
      id: sanitizedId,
      path: notePath,
      fileName: noteFileName,
    });
  }

  return createdNotes;
}

/**
 * Generate summary page with links to split notes
 */
function generateSplitSummaryContent(csvResult, headers, splitNotes, options) {
  const today = new Date().toISOString().split("T")[0];
  const title = options.title || csvResult.fileName.replace(/\.csv$/i, "");

  const tags = ["csv-import"];
  if (csvResult.fileName.toLowerCase().includes("rfi"))
    tags.push("activity/evaluation");

  // Build summary table with links
  const tableHeaders = headers.map((h) => h || "Column").slice(0, 5); // First 5 columns for summary
  tableHeaders.push("Details");

  let summaryTable = `| ${tableHeaders.join(" | ")} |\n`;
  summaryTable += `| ${tableHeaders.map(() => ":---").join(" | ")} |\n`;

  splitNotes.forEach((note) => {
    // We'd need access to the original row data for a proper summary
    summaryTable += `| ${note.id} | | | | | [[${note.fileName.replace(".md", "")}\\|View]] |\n`;
  });

  const content = `---
type: Page
title: "${title}"
created: ${today}
modified: ${today}
tags: [${tags.join(", ")}]
source: "${csvResult.fileName}"
sourceType: CSV
splitMode: true
---

# ${title}

> **Source**: \`${csvResult.fileName}\`
> **Imported**: ${today}
> **Records**: ${splitNotes.length}
> **Mode**: Split (individual notes per row)

## Summary

This CSV was imported in **split mode** - each row has been converted to an individual note with full content preserved (no truncation).

## Individual Records

${splitNotes.map((note) => `- [[${note.fileName.replace(".md", "")}]]`).join("\n")}

## Processing Notes

- **Imported by**: \`/csv-to-page --split\`
- **Parser**: PapaParse (RFC 4180 compliant)
- **Truncation**: None (full content preserved)
- **Notes created**: ${splitNotes.length}

---

## Related

- [[${csvResult.fileName}|Original CSV File]]
`;

  return { content, title };
}

/**
 * Analyse CSV structure and content
 */
function analyseCSV(data, fileName) {
  const analysis = {
    totalRows: data.length,
    emptyRows: data.filter((row) => isEmptyRow(row)).length,
    maxColumns: Math.max(...data.map((row) => row.length)),
    avgColumnsPerRow:
      data.reduce((sum, row) => sum + row.length, 0) / data.length,
    potentialHeaders: [],
    hasLongContent: false,
    maxCellLength: 0,
    longContentCells: 0,
  };

  data.forEach((row, index) => {
    const nonEmptyCells = row.filter(
      (cell) => cell && String(cell).trim(),
    ).length;
    if (nonEmptyCells > 2 && index < 50) {
      analysis.potentialHeaders.push({
        index,
        cells: row.filter((c) => c).slice(0, 5),
      });
    }

    row.forEach((cell) => {
      if (cell) {
        const len = String(cell).length;
        if (len > analysis.maxCellLength) {
          analysis.maxCellLength = len;
        }
        if (len > 500) {
          analysis.hasLongContent = true;
          analysis.longContentCells++;
        }
      }
    });
  });

  return analysis;
}

/**
 * Generate Page note content for standard (non-split) mode
 */
function generatePageContent(csvResult, tableResult, options) {
  const today = new Date().toISOString().split("T")[0];
  const title = options.title || csvResult.fileName.replace(/\.csv$/i, "");

  const tags = ["csv-import"];
  if (csvResult.fileName.toLowerCase().includes("rfi"))
    tags.push("activity/evaluation");
  if (csvResult.fileName.toLowerCase().includes("scoring"))
    tags.push("activity/evaluation");

  const analysis = analyseCSV(csvResult.data, csvResult.fileName);

  const truncationNote = options.truncate
    ? `Yes (${options.truncate} characters max)`
    : "None (full content)";

  let content = `---
type: Page
title: "${title}"
created: ${today}
modified: ${today}
tags: [${tags.join(", ")}]
source: "${csvResult.fileName}"
sourceType: CSV
---

# ${title}

> **Source**: \`${csvResult.fileName}\`
> **Imported**: ${today}
> **Rows**: ${tableResult.stats.rows}
> **Columns**: ${tableResult.stats.columns}

## Data Summary

| Property | Value |
|----------|-------|
| **Source File** | \`${csvResult.fileName}\` |
| **Total Rows** | ${analysis.totalRows} |
| **Data Rows** | ${tableResult.stats.rows} |
| **Columns** | ${tableResult.stats.columns} |
| **Empty Rows Skipped** | ${analysis.emptyRows} |
| **Delimiter** | ${csvResult.meta.delimiter === "," ? "Comma" : csvResult.meta.delimiter === ";" ? "Semicolon" : csvResult.meta.delimiter === "\t" ? "Tab" : csvResult.meta.delimiter} |
| **Truncation** | ${truncationNote} |
| **Max Cell Length** | ${analysis.maxCellLength} characters |

## Data Table

${tableResult.table}

## Processing Notes

- **Imported by**: \`/csv-to-page\` skill
- **Parser**: PapaParse (RFC 4180 compliant)
- **Truncation**: ${truncationNote}
- **Empty Rows**: Skipped

---

## Related

- [[${csvResult.fileName}|Original CSV File]]
`;

  return { content, title, analysis };
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
${chalk.bold("CSV to Markdown Converter")}

${chalk.dim("Usage:")}
  node scripts/csv-to-markdown.js <csv-file> [options]

${chalk.dim("Options:")}
  --title <title>         Custom title for the Page note
  --truncate <n>          Truncate cells to N characters (disabled by default)
  --skip-empty-rows       Skip rows that are entirely empty (default)
  --keep-empty-rows       Include empty rows in output
  --delimiter <char>      Force delimiter (comma, semicolon, tab)
  --start-row <n>         Start from row N (0-indexed, after filtering)
  --end-row <n>           End at row N (0-indexed)
  --split                 Create individual notes for each row
  --split-folder <path>   Folder for split notes (e.g., "RFI-Responses")
  --id-column <n>         Column index for note IDs (0-indexed, default: 0)
  --output-json           Output analysis as JSON
  --dry-run               Analyse without creating files
  --verbose, -v           Show detailed output

${chalk.dim("Examples:")}
  # Full content preservation (default)
  node scripts/csv-to-markdown.js "Inbox/data.csv"

  # Split mode - one note per row
  node scripts/csv-to-markdown.js "Inbox/rfi.csv" --split --split-folder "RFI-Responses"

  # Optional truncation for summary tables
  node scripts/csv-to-markdown.js "Inbox/data.csv" --truncate 150

  # Skip metadata rows
  node scripts/csv-to-markdown.js "Inbox/data.csv" --start-row 5

${chalk.dim("Notes:")}
  - By default, NO truncation is applied - full cell content is preserved
  - Use --split mode for CSVs with very long content (creates individual notes)
  - Use --truncate only if you need a compact summary table
`);
    process.exit(0);
  }

  const options = parseArgs(args);

  if (!options.csvPath) {
    console.error(chalk.red("Error: No CSV file specified"));
    process.exit(1);
  }

  try {
    console.log(chalk.blue(`\nParsing CSV: ${options.csvPath}`));

    const csvResult = await parseCSV(options.csvPath, options);

    if (options.verbose) {
      console.log(
        chalk.dim(`  Delimiter detected: ${csvResult.meta.delimiter}`),
      );
      console.log(chalk.dim(`  Total rows: ${csvResult.data.length}`));
    }

    const analysis = analyseCSV(csvResult.data, csvResult.fileName);

    if (options.outputJson) {
      console.log(JSON.stringify(analysis, null, 2));
      process.exit(0);
    }

    console.log(chalk.blue("\nCSV Analysis:"));
    console.log(chalk.dim(`  Total rows: ${analysis.totalRows}`));
    console.log(chalk.dim(`  Empty rows: ${analysis.emptyRows}`));
    console.log(chalk.dim(`  Max columns: ${analysis.maxColumns}`));
    console.log(chalk.dim(`  Has long content: ${analysis.hasLongContent}`));
    console.log(
      chalk.dim(`  Max cell length: ${analysis.maxCellLength} chars`),
    );
    if (analysis.longContentCells > 0) {
      console.log(
        chalk.dim(`  Cells with >500 chars: ${analysis.longContentCells}`),
      );
    }

    // Recommend split mode for long content
    if (analysis.hasLongContent && !options.split && !options.truncate) {
      console.log(
        chalk.yellow(
          "\n  Tip: This CSV has long content (>500 chars per cell).",
        ),
      );
      console.log(
        chalk.yellow("  Consider using --split mode for better readability."),
      );
      console.log(
        chalk.dim("  Full content will still be preserved in the table."),
      );
    }

    // Handle split mode
    if (options.split) {
      console.log(chalk.blue("\nSplit mode: Creating individual notes..."));

      // Get filtered data
      let filteredData = options.skipEmptyRows
        ? csvResult.data.filter((row) => !isEmptyRow(row))
        : csvResult.data;

      if (options.startRow !== null) {
        filteredData = filteredData.slice(options.startRow);
      }

      const headers = filteredData[0] || [];
      const baseTitle =
        options.title || csvResult.fileName.replace(/\.csv$/i, "");

      const splitNotes = createSplitNotes(
        filteredData,
        headers,
        { ...options, csvPath: csvResult.fileName },
        baseTitle,
      );

      if (options.dryRun) {
        console.log(chalk.green("\n✓ Dry run complete. No files created."));
        console.log(chalk.dim(`  Would create ${splitNotes.length} notes`));
        process.exit(0);
      }

      // Create summary page
      const summaryResult = generateSplitSummaryContent(
        csvResult,
        headers,
        splitNotes,
        options,
      );

      const summaryFileName = `Page - ${summaryResult.title}.md`;
      const summaryPath = path.resolve(VAULT_ROOT, summaryFileName);

      fs.writeFileSync(summaryPath, summaryResult.content, "utf-8");

      console.log(chalk.green(`\n✓ Created summary: ${summaryFileName}`));
      console.log(
        chalk.green(`✓ Created ${splitNotes.length} individual notes`),
      );
      if (options.splitFolder) {
        console.log(chalk.dim(`  Location: ${options.splitFolder}/`));
      }

      return {
        success: true,
        mode: "split",
        summaryPath,
        notesCreated: splitNotes.length,
        notes: splitNotes,
      };
    }

    // Standard mode (single table)
    const tableResult = csvToMarkdownTable(csvResult.data, options);

    if (options.verbose) {
      console.log(chalk.dim(`\n  Markdown rows: ${tableResult.stats.rows}`));
      console.log(
        chalk.dim(`  Markdown columns: ${tableResult.stats.columns}`),
      );
      if (tableResult.stats.columnsRemoved > 0) {
        console.log(
          chalk.dim(
            `  Empty columns removed: ${tableResult.stats.columnsRemoved}`,
          ),
        );
      }
    }

    if (options.dryRun) {
      console.log(chalk.green("\n✓ Dry run complete. No files created."));
      console.log(chalk.dim("\nMarkdown table preview (first 20 lines):"));
      console.log(tableResult.table.split("\n").slice(0, 20).join("\n"));
      process.exit(0);
    }

    const pageResult = generatePageContent(csvResult, tableResult, options);

    const outputFileName = `Page - ${pageResult.title}.md`;
    const outputPath = path.resolve(VAULT_ROOT, outputFileName);

    fs.writeFileSync(outputPath, pageResult.content, "utf-8");

    console.log(chalk.green(`\n✓ Created: ${outputFileName}`));
    console.log(chalk.dim(`  Path: ${outputPath}`));
    console.log(chalk.dim(`  Rows: ${tableResult.stats.rows}`));
    console.log(chalk.dim(`  Columns: ${tableResult.stats.columns}`));
    if (tableResult.stats.columnsRemoved > 0) {
      console.log(
        chalk.dim(
          `  Empty columns removed: ${tableResult.stats.columnsRemoved}`,
        ),
      );
    }
    console.log(
      chalk.dim(
        `  Truncation: ${options.truncate ? options.truncate + " chars" : "None"}`,
      ),
    );

    return {
      success: true,
      mode: "table",
      outputPath,
      fileName: outputFileName,
      stats: tableResult.stats,
      analysis: pageResult.analysis,
    };
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    if (options.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run main function
main().catch((err) => {
  console.error(chalk.red(err.message));
  process.exit(1);
});

// Export for programmatic use
export { parseCSV, csvToMarkdownTable, generatePageContent, analyseCSV };
