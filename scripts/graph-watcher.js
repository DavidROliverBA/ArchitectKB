#!/usr/bin/env node

/**
 * Graph Index File Watcher
 *
 * Watches the vault for markdown file changes and automatically
 * rebuilds the graph index with configurable debouncing.
 *
 * Usage:
 *   node scripts/graph-watcher.js                    # Default 1000ms debounce
 *   node scripts/graph-watcher.js --debounce=2000    # Custom debounce (ms)
 *   node scripts/graph-watcher.js --quiet            # Minimal output
 *
 * Press Ctrl+C to stop watching.
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const VAULT_ROOT = path.resolve(__dirname, '..');
const GENERATOR_SCRIPT = path.join(__dirname, 'generate-graph-enhanced.js');

// Directories and files to ignore
const IGNORED_PATTERNS = [
  '.git',
  '.obsidian',
  'node_modules',
  '.smart-env',
  'scripts',
  '.graph',
  '.DS_Store'
];

class GraphWatcher {
  constructor(options = {}) {
    this.options = {
      debounce: 1000,
      quiet: false,
      ...options
    };

    this.debounceTimer = null;
    this.pendingChanges = new Set();
    this.isRebuilding = false;
    this.rebuildQueued = false;
    this.watchController = null;
  }

  /**
   * Start watching the vault
   */
  start() {
    console.log(chalk.blue.bold('\n👁️  Graph Index Watcher\n'));
    console.log(chalk.gray(`Vault: ${VAULT_ROOT}`));
    console.log(chalk.gray(`Debounce: ${this.options.debounce}ms`));
    console.log(chalk.gray(`Press Ctrl+C to stop\n`));

    // Initial build
    this.triggerRebuild('Initial build');

    // Set up file watcher
    try {
      const watcher = fs.watch(VAULT_ROOT, { recursive: true }, (eventType, filename) => {
        this.handleFileChange(eventType, filename);
      });

      // Handle watcher errors
      watcher.on('error', (error) => {
        console.error(chalk.red(`Watcher error: ${error.message}`));
      });

      // Handle process termination
      process.on('SIGINT', () => {
        console.log(chalk.yellow('\n\nStopping watcher...'));
        watcher.close();
        process.exit(0);
      });

      console.log(chalk.green('Watching for changes...\n'));

    } catch (error) {
      console.error(chalk.red(`Failed to start watcher: ${error.message}`));
      process.exit(1);
    }
  }

  /**
   * Handle file change events
   */
  handleFileChange(eventType, filename) {
    if (!filename) return;

    // Skip non-markdown files
    if (!filename.endsWith('.md')) return;

    // Skip ignored directories
    for (const pattern of IGNORED_PATTERNS) {
      if (filename.includes(pattern)) return;
    }

    // Track the change
    this.pendingChanges.add(filename);

    // Show change event (unless quiet)
    if (!this.options.quiet) {
      const changeType = eventType === 'rename' ? 'created/deleted' : 'modified';
      console.log(chalk.gray(`[${new Date().toLocaleTimeString()}] ${changeType}: ${filename}`));
    }

    // Debounce the rebuild
    this.debouncedRebuild();
  }

  /**
   * Debounced rebuild trigger
   */
  debouncedRebuild() {
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new timer
    this.debounceTimer = setTimeout(() => {
      const changes = Array.from(this.pendingChanges);
      this.pendingChanges.clear();
      this.triggerRebuild(`${changes.length} file(s) changed`);
    }, this.options.debounce);
  }

  /**
   * Trigger a graph rebuild
   */
  triggerRebuild(reason) {
    // If already rebuilding, queue another rebuild
    if (this.isRebuilding) {
      this.rebuildQueued = true;
      if (!this.options.quiet) {
        console.log(chalk.yellow(`Rebuild queued: ${reason}`));
      }
      return;
    }

    this.isRebuilding = true;
    const startTime = Date.now();

    console.log(chalk.blue(`\n🔄 Rebuilding index: ${reason}`));

    // Spawn the generator script
    const args = this.options.quiet ? ['--quiet'] : [];
    const child = spawn('node', [GENERATOR_SCRIPT, ...args], {
      cwd: VAULT_ROOT,
      stdio: 'pipe'
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    child.on('close', (code) => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      if (code === 0) {
        console.log(chalk.green(`✅ Index rebuilt in ${duration}s`));

        // Extract stats from output if available
        const statsMatch = output.match(/Nodes:\s+(\d+)/);
        if (statsMatch && !this.options.quiet) {
          console.log(chalk.gray(`   ${statsMatch[0]}`));
        }
      } else {
        console.error(chalk.red(`❌ Rebuild failed (exit code ${code})`));
        if (errorOutput) {
          console.error(chalk.red(errorOutput));
        }
      }

      console.log(chalk.gray('\nWatching for changes...\n'));

      this.isRebuilding = false;

      // Check if another rebuild was queued
      if (this.rebuildQueued) {
        this.rebuildQueued = false;
        this.triggerRebuild('Queued rebuild');
      }
    });

    child.on('error', (error) => {
      console.error(chalk.red(`Failed to spawn generator: ${error.message}`));
      this.isRebuilding = false;
    });
  }
}

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    debounce: 1000,
    quiet: false,
    help: false
  };

  for (const arg of args) {
    if (arg.startsWith('--debounce=')) {
      const value = parseInt(arg.split('=')[1], 10);
      if (!isNaN(value) && value > 0) {
        options.debounce = value;
      }
    } else if (arg === '--quiet' || arg === '-q') {
      options.quiet = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

// Show help
function showHelp() {
  console.log(`
${chalk.blue.bold('Graph Index File Watcher')}

Watch the vault for changes and automatically rebuild the graph index.

${chalk.yellow('Usage:')}
  node scripts/graph-watcher.js [options]

${chalk.yellow('Options:')}
  --debounce=<ms>   Debounce interval in milliseconds (default: 1000)
  --quiet, -q       Minimal output (only show rebuild status)
  --help, -h        Show this help message

${chalk.yellow('Examples:')}
  node scripts/graph-watcher.js                   # Default settings
  node scripts/graph-watcher.js --debounce=2000   # 2 second debounce
  node scripts/graph-watcher.js --quiet           # Less verbose output

${chalk.yellow('npm Script:')}
  npm run graph:watch

${chalk.yellow('Notes:')}
  - Ignores non-markdown files
  - Ignores system directories (.git, .obsidian, node_modules, etc.)
  - Queues rebuilds if one is already in progress
  - Press Ctrl+C to stop watching
`);
}

// Main execution
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  const watcher = new GraphWatcher(options);
  watcher.start();
}

main().catch(error => {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
});
