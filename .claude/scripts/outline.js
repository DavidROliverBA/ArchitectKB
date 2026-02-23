#!/usr/bin/env node

/**
 * Markdown Outline Extractor
 *
 * CLI tool for extracting structured heading outlines from vault markdown files.
 * Parses markdown headings while respecting code blocks and provides tree-style output.
 *
 * Usage:
 *   node .claude/scripts/outline.js --path="Project - Alpha.md"
 *   node .claude/scripts/outline.js --type=Project
 *   node .claude/scripts/outline.js --all
 *   node .claude/scripts/outline.js --stats
 *   node .claude/scripts/outline.js --path="ADRs/ADR - SAP to AWS.md" --depth=3
 *   node .claude/scripts/outline.js --type=Adr --json
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

/**
 * Parse markdown headings from file content
 * Respects fenced code blocks and returns structured heading data
 */
function parseHeadings(content) {
  const lines = content.split("\n");
  const headings = [];
  let inCodeBlock = false;
  let codeBlockFence = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Track code block state
    const fenceMatch = line.match(/^(\`{3,}|~{3,})/);
    if (fenceMatch) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockFence = fenceMatch[1][0]; // '\`' or '~'
      } else if (line.startsWith(codeBlockFence.repeat(3))) {
        inCodeBlock = false;
        codeBlockFence = null;
      }
      continue;
    }

    // Skip lines inside code blocks
    if (inCodeBlock) continue;

    // Parse heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();

      headings.push({
        level,
        text,
        lineNumber,
      });
    }
  }

  return headings;
}

/**
 * Build tree structure from flat heading list
 */
function buildHeadingTree(headings, maxDepth = 6) {
  const tree = [];
  const stack = [];

  for (const heading of headings) {
    if (heading.level > maxDepth) continue;

    const node = {
      ...heading,
      children: [],
    };

    // Pop stack until we find the parent level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // Top-level heading
      tree.push(node);
    } else {
      // Child heading
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return tree;
}

/**
 * Format heading tree as ASCII tree structure
 */
function formatTree(nodes, prefix = "", isLast = true) {
  const lines = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const isLastNode = i === nodes.length - 1;

    // Tree drawing characters
    const connector = isLastNode ? "└─ " : "├─ ";
    const childPrefix = isLastNode ? "   " : "│  ";

    lines.push(prefix + connector + node.text);

    // Recursively format children
    if (node.children.length > 0) {
      const childLines = formatTree(
        node.children,
        prefix + childPrefix,
        isLastNode,
      );
      lines.push(...childLines);
    }
  }

  return lines;
}

/**
 * Extract outline from a single file
 */
function extractOutline(filePath, maxDepth = 6) {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(VAULT_ROOT, filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(fullPath, "utf8");
  const headings = parseHeadings(content);
  const tree = buildHeadingTree(headings, maxDepth);

  return {
    path: path.relative(VAULT_ROOT, fullPath),
    headings,
    tree,
  };
}

/**
 * Find all markdown files in vault
 */
function findVaultFiles() {
  const pattern = "**/*.md";
  const files = globSync(pattern, {
    cwd: VAULT_ROOT,
    ignore: EXCLUDE_PATTERNS,
    absolute: false,
  });

  return files;
}

/**
 * Extract outlines from multiple files, optionally filtered by type
 */
function extractMultipleOutlines(fileType = null, maxDepth = 6) {
  const files = findVaultFiles();
  const results = [];

  for (const file of files) {
    const fullPath = path.join(VAULT_ROOT, file);
    const content = fs.readFileSync(fullPath, "utf8");

    // Parse frontmatter if filtering by type
    if (fileType) {
      try {
        const { data } = matter(content);
        if (!data.type || data.type.toLowerCase() !== fileType.toLowerCase()) {
          continue;
        }
      } catch (error) {
        // Skip files with invalid frontmatter
        continue;
      }
    }

    const headings = parseHeadings(content);

    // Skip files with no headings unless we're doing stats
    if (headings.length === 0) continue;

    const tree = buildHeadingTree(headings, maxDepth);

    results.push({
      path: file,
      headings,
      tree,
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
    filesWithHeadings: 0,
    filesWithoutHeadings: [],
    totalHeadings: 0,
    headingsByLevel: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    headingTexts: new Map(), // text -> count
  };

  for (const file of files) {
    stats.totalFiles++;
    const fullPath = path.join(VAULT_ROOT, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const headings = parseHeadings(content);

    if (headings.length === 0) {
      stats.filesWithoutHeadings.push(file);
    } else {
      stats.filesWithHeadings++;
      stats.totalHeadings += headings.length;

      for (const heading of headings) {
        stats.headingsByLevel[heading.level]++;

        const text = heading.text;
        stats.headingTexts.set(text, (stats.headingTexts.get(text) || 0) + 1);
      }
    }
  }

  // Calculate average
  stats.averageHeadingsPerFile =
    stats.filesWithHeadings > 0
      ? (stats.totalHeadings / stats.filesWithHeadings).toFixed(2)
      : "0.00";

  // Get top heading texts
  stats.topHeadingTexts = Array.from(stats.headingTexts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  return stats;
}

/**
 * Format single file outline for display
 */
function formatSingleOutline(result) {
  const lines = [];

  lines.push(chalk.blue.bold(result.path));

  if (result.headings.length === 0) {
    lines.push(chalk.gray("  (no headings)"));
  } else {
    const treeLines = formatTree(result.tree);
    lines.push(...treeLines.map((line) => chalk.white(line)));
  }

  return lines.join("\n");
}

/**
 * Format multiple file outlines for display
 */
function formatMultipleOutlines(results, maxHeadingsPerFile = 5) {
  const lines = [];

  lines.push(
    chalk.blue.bold(`\\nFound ${results.length} file(s) with headings\\n`),
  );

  for (const result of results) {
    lines.push(chalk.cyan(result.path));

    if (result.headings.length === 0) {
      lines.push(chalk.gray("  (no headings)"));
    } else {
      // Show first N headings in tree format
      const limitedTree = buildHeadingTree(
        result.headings.slice(0, maxHeadingsPerFile),
      );
      const treeLines = formatTree(limitedTree);
      lines.push(...treeLines.map((line) => chalk.white(line)));

      if (result.headings.length > maxHeadingsPerFile) {
        lines.push(
          chalk.gray(
            `  ... and ${result.headings.length - maxHeadingsPerFile} more`,
          ),
        );
      }
    }

    lines.push(""); // Blank line between files
  }

  return lines.join("\n");
}

/**
 * Format statistics for display
 */
function formatStats(stats) {
  const lines = [];

  lines.push(chalk.blue.bold("\n📊 Vault Heading Statistics\n"));

  lines.push(
    chalk.gray(`Total Files Analysed:     ${chalk.white(stats.totalFiles)}`),
  );
  lines.push(
    chalk.gray(
      `Files With Headings:      ${chalk.white(stats.filesWithHeadings)}`,
    ),
  );
  lines.push(
    chalk.gray(
      `Files Without Headings:   ${chalk.white(stats.filesWithoutHeadings.length)}`,
    ),
  );
  lines.push(
    chalk.gray(`Total Headings:           ${chalk.white(stats.totalHeadings)}`),
  );
  lines.push(
    chalk.gray(
      `Average Headings/File:    ${chalk.white(stats.averageHeadingsPerFile)}`,
    ),
  );
  lines.push("");

  lines.push(chalk.blue("Headings by Level:"));
  for (let level = 1; level <= 6; level++) {
    const count = stats.headingsByLevel[level];
    const bar = "█".repeat(Math.min(50, Math.floor(count / 10)));
    lines.push(
      chalk.gray(`  H${level}: ${chalk.cyan(count.toString().padStart(4))} ${bar}`),
    );
  }
  lines.push("");

  lines.push(chalk.blue("Top 15 Most Common Headings:"));
  for (const [text, count] of stats.topHeadingTexts) {
    lines.push(
      chalk.gray(`  ${count.toString().padStart(4)}× ${chalk.white(text)}`),
    );
  }
  lines.push("");

  if (stats.filesWithoutHeadings.length > 0) {
    lines.push(
      chalk.yellow(
        `Files Without Headings (${stats.filesWithoutHeadings.length}):`,
      ),
    );
    for (const file of stats.filesWithoutHeadings.slice(0, 10)) {
      lines.push(chalk.gray(`  ${file}`));
    }
    if (stats.filesWithoutHeadings.length > 10) {
      lines.push(
        chalk.gray(`  ... and ${stats.filesWithoutHeadings.length - 10} more`),
      );
    }
  }

  return lines.join("\n");
}

/**
 * Format results as JSON
 */
function formatJson(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * Parse command-line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    path: null,
    type: null,
    all: false,
    json: false,
    stats: false,
    depth: 6,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--all") {
      options.all = true;
    } else if (arg === "--stats") {
      options.stats = true;
    } else if (arg.startsWith("--path=")) {
      options.path = arg.split("=")[1];
    } else if (
      arg === "--path" &&
      args[i + 1] &&
      !args[i + 1].startsWith("-")
    ) {
      options.path = args[++i];
    } else if (arg.startsWith("--type=")) {
      options.type = arg.split("=")[1];
    } else if (
      arg === "--type" &&
      args[i + 1] &&
      !args[i + 1].startsWith("-")
    ) {
      options.type = args[++i];
    } else if (arg.startsWith("--depth=")) {
      options.depth = parseInt(arg.split("=")[1], 10);
      if (isNaN(options.depth) || options.depth < 1 || options.depth > 6) {
        console.error(chalk.red("Error: --depth must be between 1 and 6"));
        process.exit(1);
      }
    } else if (
      arg === "--depth" &&
      args[i + 1] &&
      !args[i + 1].startsWith("-")
    ) {
      options.depth = parseInt(args[++i], 10);
      if (isNaN(options.depth) || options.depth < 1 || options.depth > 6) {
        console.error(chalk.red("Error: --depth must be between 1 and 6"));
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
${chalk.blue.bold("Markdown Outline Extractor")}

Extract structured heading outlines from vault markdown files.

${chalk.yellow("Usage:")}
  node .claude/scripts/outline.js [options]

${chalk.yellow("Options:")}
  --path=<file>    Extract outline from a single file (relative to vault root)
  --type=<type>    Extract outlines from all notes of a given type
  --all            Extract outlines from all vault files
  --json           Output as JSON
  --stats          Show heading statistics (counts by level, most common headings)
  --depth=<n>      Maximum heading depth to show (default: 6)
  --help, -h       Show this help message

${chalk.yellow("Examples:")}
  ${chalk.gray("# Single file outline")}
  node .claude/scripts/outline.js --path="Project - Alpha.md"
  node .claude/scripts/outline.js --path="ADRs/ADR - SAP to AWS.md" --depth=3

  ${chalk.gray("# All files of a specific type")}
  node .claude/scripts/outline.js --type=Project
  node .claude/scripts/outline.js --type=Adr --depth=2

  ${chalk.gray("# All vault files")}
  node .claude/scripts/outline.js --all

  ${chalk.gray("# Statistics")}
  node .claude/scripts/outline.js --stats

  ${chalk.gray("# JSON output")}
  node .claude/scripts/outline.js --path="Project - Alpha.md" --json
  node .claude/scripts/outline.js --type=Meeting --json

${chalk.yellow("Notes:")}
  - Headings inside code blocks are ignored
  - At least one of --path, --type, --all, or --stats is required
  - When showing multiple files, only first 5 headings per file are displayed
  - Use --json for programmatic access to full outline data
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

  // Require at least one action
  if (!options.path && !options.type && !options.all && !options.stats) {
    console.error(
      chalk.red(
        "Error: At least one of --path, --type, --all, or --stats is required\\n",
      ),
    );
    showHelp();
    process.exit(1);
  }

  try {
    if (options.stats) {
      // Show statistics
      const stats = calculateStats();
      if (options.json) {
        console.log(formatJson(stats));
      } else {
        console.log(formatStats(stats));
      }
    } else if (options.path) {
      // Single file outline
      const result = extractOutline(options.path, options.depth);
      if (options.json) {
        console.log(formatJson(result));
      } else {
        console.log(formatSingleOutline(result));
      }
    } else if (options.type || options.all) {
      // Multiple file outlines
      const results = extractMultipleOutlines(options.type, options.depth);

      if (results.length === 0) {
        if (options.type) {
          console.log(
            chalk.yellow(`No files found with type: ${options.type}`),
          );
        } else {
          console.log(chalk.yellow("No files with headings found"));
        }
        process.exit(0);
      }

      if (options.json) {
        console.log(formatJson(results));
      } else {
        console.log(formatMultipleOutlines(results));
      }
    }
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
});
