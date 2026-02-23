#!/usr/bin/env node

/**
 * Vault-Wide Task Query Tool
 *
 * CLI tool for querying markdown checkboxes across all vault files.
 * Parses `- [ ]`, `- [x]`, `- [/]` with heading context and nesting depth.
 *
 * Usage:
 *   node .claude/scripts/task-query.js todo
 *   node .claude/scripts/task-query.js done
 *   node .claude/scripts/task-query.js in-progress
 *   node .claude/scripts/task-query.js all
 *   node .claude/scripts/task-query.js todo --type=Project
 *   node .claude/scripts/task-query.js todo --note="Project - Alpha"
 *   node .claude/scripts/task-query.js --stats
 *   node .claude/scripts/task-query.js todo --json
 *
 * Run without arguments or with --help to see full help.
 */

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const VAULT_ROOT = path.resolve(__dirname, "../..");

// Paths to exclude from glob search
const EXCLUDE_PATTERNS = [
  "**/node_modules/**",
  "**/.git/**",
  "**/.obsidian/**",
  "**/.smart-env/**",
  "**/.graph/**",
  "**/.data/**",
  "**/.claude/**",
  "**/scripts/**",
  "**/Templates/**",
  "**/Archive/**",
  "**/voicenotes/**",
  "**/Excalidraw/**",
  "**/Attachments/**",
];

// Checkbox status mapping
const STATUS_MAP = {
  " ": "todo",
  x: "done",
  X: "done",
  "/": "in-progress",
};

/**
 * Parse checkboxes from file content with heading context
 */
function parseCheckboxes(content) {
  const lines = content.split("\n");
  const checkboxes = [];
  let inCodeBlock = false;
  let codeBlockFence = null;
  let currentHeading = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Track code block state
    const fenceMatch = line.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockFence = fenceMatch[1][0];
      } else if (line.startsWith(codeBlockFence.repeat(3))) {
        inCodeBlock = false;
        codeBlockFence = null;
      }
      continue;
    }

    if (inCodeBlock) continue;

    // Track current heading for context
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      currentHeading = headingMatch[2].trim();
      continue;
    }

    // Parse checkbox
    const checkboxMatch = line.match(/^(\s*)- \[([ xX/])\]\s+(.+)$/);
    if (checkboxMatch) {
      const indent = checkboxMatch[1].length;
      const marker = checkboxMatch[2];
      const text = checkboxMatch[3].trim();
      const status = STATUS_MAP[marker] || "todo";

      checkboxes.push({
        lineNumber,
        text,
        status,
        context: currentHeading || null,
        indent,
      });
    }
  }

  return checkboxes;
}

/**
 * Find all markdown files in vault
 */
function findVaultFiles() {
  return globSync("**/*.md", {
    cwd: VAULT_ROOT,
    ignore: EXCLUDE_PATTERNS,
    absolute: false,
  });
}

/**
 * Query checkboxes across the vault
 */
function queryCheckboxes(filter = "all", options = {}) {
  const files = findVaultFiles();
  const results = [];

  for (const file of files) {
    const fullPath = path.join(VAULT_ROOT, file);
    const content = fs.readFileSync(fullPath, "utf8");

    // Filter by note type
    if (options.type) {
      try {
        const { data } = matter(content);
        if (
          !data.type ||
          data.type.toLowerCase() !== options.type.toLowerCase()
        ) {
          continue;
        }
      } catch {
        continue;
      }
    }

    // Filter by note name
    if (options.note) {
      const basename = path.basename(file, ".md");
      if (!basename.toLowerCase().includes(options.note.toLowerCase())) {
        continue;
      }
    }

    const checkboxes = parseCheckboxes(content);
    if (checkboxes.length === 0) continue;

    // Filter by status
    const filtered =
      filter === "all"
        ? checkboxes
        : checkboxes.filter((cb) => cb.status === filter);

    if (filtered.length === 0) continue;

    // Get note type from frontmatter
    let noteType = null;
    try {
      const { data } = matter(content);
      noteType = data.type || null;
    } catch {
      // skip
    }

    results.push({
      path: file,
      type: noteType,
      checkboxes: filtered,
    });
  }

  return results;
}

/**
 * Calculate statistics across all vault files
 */
function calculateStats() {
  const files = findVaultFiles();
  const stats = {
    totalFiles: 0,
    filesWithCheckboxes: 0,
    totalCheckboxes: 0,
    byStatus: { todo: 0, done: 0, "in-progress": 0 },
    byType: new Map(),
    topFiles: [],
  };

  const fileCounts = [];

  for (const file of files) {
    stats.totalFiles++;
    const fullPath = path.join(VAULT_ROOT, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const checkboxes = parseCheckboxes(content);

    if (checkboxes.length === 0) continue;

    stats.filesWithCheckboxes++;
    stats.totalCheckboxes += checkboxes.length;

    // Get note type
    let noteType = "Unknown";
    try {
      const { data } = matter(content);
      noteType = data.type || "Unknown";
    } catch {
      // skip
    }

    // Count by status
    for (const cb of checkboxes) {
      stats.byStatus[cb.status] = (stats.byStatus[cb.status] || 0) + 1;
    }

    // Count by type
    const typeCount = stats.byType.get(noteType) || {
      total: 0,
      todo: 0,
      done: 0,
      "in-progress": 0,
    };
    for (const cb of checkboxes) {
      typeCount.total++;
      typeCount[cb.status] = (typeCount[cb.status] || 0) + 1;
    }
    stats.byType.set(noteType, typeCount);

    fileCounts.push({ path: file, count: checkboxes.length });
  }

  // Top files by checkbox count
  stats.topFiles = fileCounts.sort((a, b) => b.count - a.count).slice(0, 10);

  // Completion rate
  stats.completionRate =
    stats.totalCheckboxes > 0
      ? ((stats.byStatus.done / stats.totalCheckboxes) * 100).toFixed(1)
      : "0.0";

  return stats;
}

/**
 * Format checkbox results for display
 */
function formatResults(results, filter) {
  const lines = [];
  let totalCheckboxes = 0;

  const filterLabel = filter === "all" ? "all checkboxes" : `${filter} items`;
  lines.push(
    chalk.blue.bold(`\n${results.length} file(s) with ${filterLabel}\n`),
  );

  for (const result of results) {
    const typeLabel = result.type ? chalk.gray(` [${result.type}]`) : "";
    lines.push(chalk.cyan(result.path) + typeLabel);

    for (const cb of result.checkboxes) {
      totalCheckboxes++;
      const statusIcon =
        cb.status === "done"
          ? chalk.green("[x]")
          : cb.status === "in-progress"
            ? chalk.yellow("[/]")
            : chalk.red("[ ]");

      const indent = "  ".repeat(1 + Math.floor(cb.indent / 2));
      const contextLabel = cb.context ? chalk.gray(` (${cb.context})`) : "";
      lines.push(`${indent}${statusIcon} ${cb.text}${contextLabel}`);
    }

    lines.push("");
  }

  lines.push(chalk.gray(`Total: ${totalCheckboxes} checkbox(es)`));
  return lines.join("\n");
}

/**
 * Format statistics for display
 */
function formatStats(stats) {
  const lines = [];

  lines.push(chalk.blue.bold("\nVault Checkbox Statistics\n"));

  lines.push(
    chalk.gray(`Total Files Scanned:      ${chalk.white(stats.totalFiles)}`),
  );
  lines.push(
    chalk.gray(
      `Files With Checkboxes:    ${chalk.white(stats.filesWithCheckboxes)}`,
    ),
  );
  lines.push(
    chalk.gray(
      `Total Checkboxes:         ${chalk.white(stats.totalCheckboxes)}`,
    ),
  );
  lines.push(
    chalk.gray(
      `Completion Rate:          ${chalk.white(stats.completionRate + "%")}`,
    ),
  );
  lines.push("");

  lines.push(chalk.blue("By Status:"));
  const todoBar = "█".repeat(Math.min(50, Math.floor(stats.byStatus.todo / 5)));
  const doneBar = "█".repeat(Math.min(50, Math.floor(stats.byStatus.done / 5)));
  const ipBar = "█".repeat(
    Math.min(50, Math.floor(stats.byStatus["in-progress"] / 5)),
  );
  lines.push(
    chalk.red(
      `  Todo:        ${stats.byStatus.todo.toString().padStart(4)} ${todoBar}`,
    ),
  );
  lines.push(
    chalk.green(
      `  Done:        ${stats.byStatus.done.toString().padStart(4)} ${doneBar}`,
    ),
  );
  lines.push(
    chalk.yellow(
      `  In Progress: ${stats.byStatus["in-progress"].toString().padStart(4)} ${ipBar}`,
    ),
  );
  lines.push("");

  lines.push(chalk.blue("By Note Type:"));
  const sortedTypes = Array.from(stats.byType.entries()).sort(
    (a, b) => b[1].total - a[1].total,
  );
  for (const [type, counts] of sortedTypes) {
    const donePercent =
      counts.total > 0 ? ((counts.done / counts.total) * 100).toFixed(0) : "0";
    lines.push(
      chalk.gray(
        `  ${type.padEnd(16)} ${chalk.white(counts.total.toString().padStart(4))} total  ${chalk.green(counts.done.toString().padStart(4))} done  ${chalk.gray(`(${donePercent}%)`)}`,
      ),
    );
  }
  lines.push("");

  lines.push(chalk.blue("Top 10 Files by Checkbox Count:"));
  for (const file of stats.topFiles) {
    lines.push(
      chalk.gray(
        `  ${file.count.toString().padStart(4)} ${chalk.white(file.path)}`,
      ),
    );
  }

  return lines.join("\n");
}

/**
 * Parse command-line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    filter: null,
    type: null,
    note: null,
    json: false,
    stats: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--stats") {
      options.stats = true;
    } else if (arg.startsWith("--type=")) {
      options.type = arg.split("=").slice(1).join("=");
    } else if (
      arg === "--type" &&
      args[i + 1] &&
      !args[i + 1].startsWith("-")
    ) {
      options.type = args[++i];
    } else if (arg.startsWith("--note=")) {
      options.note = arg.split("=").slice(1).join("=");
    } else if (
      arg === "--note" &&
      args[i + 1] &&
      !args[i + 1].startsWith("-")
    ) {
      options.note = args[++i];
    } else if (!arg.startsWith("-") && !options.filter) {
      // Positional argument: filter
      const normalised = arg.toLowerCase();
      if (["todo", "done", "in-progress", "all"].includes(normalised)) {
        options.filter = normalised;
      } else {
        console.error(
          chalk.red(
            `Unknown filter: ${arg}. Use: todo, done, in-progress, all`,
          ),
        );
        process.exit(1);
      }
    }
  }

  return options;
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
${chalk.blue.bold("Vault-Wide Task Query Tool")}

Query markdown checkboxes across all vault files.

${chalk.yellow("Usage:")}
  node .claude/scripts/task-query.js <filter> [options]

${chalk.yellow("Filters:")}
  todo           Show unchecked items (- [ ])
  done           Show completed items (- [x])
  in-progress    Show in-progress items (- [/])
  all            Show all checkboxes

${chalk.yellow("Options:")}
  --type=<type>  Filter by note type (e.g. Project, Meeting, Task)
  --note=<name>  Filter by note name (partial match)
  --json         Output as JSON
  --stats        Show checkbox statistics (counts, completion rates)
  --help, -h     Show this help message

${chalk.yellow("Examples:")}
  ${chalk.gray("# List all open tasks")}
  node .claude/scripts/task-query.js todo

  ${chalk.gray("# List done items in Project notes")}
  node .claude/scripts/task-query.js done --type=Project

  ${chalk.gray("# Tasks in a specific note")}
  node .claude/scripts/task-query.js todo --note="Project - Alpha"

  ${chalk.gray("# Vault-wide statistics")}
  node .claude/scripts/task-query.js --stats

  ${chalk.gray("# JSON output for programmatic use")}
  node .claude/scripts/task-query.js all --json

${chalk.yellow("npm scripts:")}
  npm run tasks:todo    ${chalk.gray("# Shortcut for todo filter")}
  npm run tasks:done    ${chalk.gray("# Shortcut for done filter")}
  npm run tasks:all     ${chalk.gray("# Shortcut for all filter")}
  npm run tasks:stats   ${chalk.gray("# Shortcut for --stats")}

${chalk.yellow("Notes:")}
  - Checkboxes inside code blocks are ignored
  - Each checkbox includes its parent heading as context
  - Nesting depth is preserved for sub-tasks
`);
}

/**
 * Main execution
 */
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  // Stats mode
  if (options.stats) {
    const stats = calculateStats();
    if (options.json) {
      // Convert Map to object for JSON serialisation
      const jsonStats = {
        ...stats,
        byType: Object.fromEntries(stats.byType),
      };
      console.log(JSON.stringify(jsonStats, null, 2));
    } else {
      console.log(formatStats(stats));
    }
    process.exit(0);
  }

  // Require a filter if not stats
  if (!options.filter) {
    console.error(
      chalk.red("Error: A filter (todo, done, in-progress, all) is required\n"),
    );
    showHelp();
    process.exit(1);
  }

  // Query checkboxes
  const results = queryCheckboxes(options.filter, {
    type: options.type,
    note: options.note,
  });

  if (results.length === 0) {
    console.log(chalk.yellow(`No ${options.filter} checkboxes found`));
    process.exit(0);
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log(formatResults(results, options.filter));
  }
}

main().catch((error) => {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
});
