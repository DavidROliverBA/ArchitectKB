#!/usr/bin/env node

/**
 * Graph Explorer Pipeline
 * Runs the full analysis pipeline for the knowledge graph
 *
 * Usage:
 *   npm run graph:pipeline              # Full pipeline
 *   npm run graph:pipeline -- --quick   # Skip embeddings (faster)
 *   npm run graph:pipeline -- --view    # Open viewer after pipeline
 */

import { spawn } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VAULT_ROOT = join(__dirname, "../../");

// Parse arguments
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    quick: args.includes("--quick"),
    view: args.includes("--view"),
    verbose: args.includes("--verbose") || args.includes("-v"),
  };
}

// Run a command and return a promise
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd: VAULT_ROOT,
      stdio: options.silent ? "pipe" : "inherit",
      shell: true,
    });

    let output = "";
    if (options.silent) {
      proc.stdout?.on("data", (data) => {
        output += data.toString();
      });
      proc.stderr?.on("data", (data) => {
        output += data.toString();
      });
    }

    proc.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    proc.on("error", reject);
  });
}

// Pipeline steps
const STEPS = [
  {
    name: "Build Graph Data",
    command: "npm",
    args: ["run", "graph:tauri:d3"],
    required: true,
  },
  {
    name: "Run Gap Analysis",
    command: "npm",
    args: ["run", "graph:analyse"],
    required: true,
  },
  {
    name: "Update Embeddings",
    command: "npm",
    args: ["run", "embeddings:update"],
    required: false,
    skipOn: "quick",
  },
  {
    name: "Generate Semantic Suggestions",
    command: "npm",
    args: ["run", "graph:analyse", "--", "--type=semantic"],
    required: false,
    skipOn: "quick",
    condition: () => existsSync(join(VAULT_ROOT, ".graph/embeddings.json")),
  },
  {
    name: "Enrich Suggestions",
    command: "npm",
    args: ["run", "suggestions:enrich", "--", "--limit=100"],
    required: false,
  },
];

async function main() {
  const config = parseArgs();

  console.log("\n  ╔══════════════════════════════════════╗");
  console.log("  ║   Knowledge Graph Explorer Pipeline   ║");
  console.log("  ╚══════════════════════════════════════╝\n");

  if (config.quick) {
    console.log("  Mode: Quick (skipping embeddings)\n");
  }

  const startTime = Date.now();
  let stepNum = 0;
  let skipped = 0;
  let failed = 0;

  for (const step of STEPS) {
    stepNum++;

    // Check if should skip
    if (step.skipOn === "quick" && config.quick) {
      console.log(
        `  [${stepNum}/${STEPS.length}] ${step.name} ... SKIPPED (quick mode)`,
      );
      skipped++;
      continue;
    }

    if (step.condition && !step.condition()) {
      console.log(
        `  [${stepNum}/${STEPS.length}] ${step.name} ... SKIPPED (condition not met)`,
      );
      skipped++;
      continue;
    }

    console.log(`  [${stepNum}/${STEPS.length}] ${step.name} ...`);

    try {
      await runCommand(step.command, step.args, { silent: !config.verbose });
      console.log(`  [${stepNum}/${STEPS.length}] ${step.name} ... ✓ DONE`);
    } catch (err) {
      if (step.required) {
        console.error(
          `  [${stepNum}/${STEPS.length}] ${step.name} ... ✗ FAILED`,
        );
        console.error(`  Error: ${err.message}`);
        process.exit(1);
      } else {
        console.log(
          `  [${stepNum}/${STEPS.length}] ${step.name} ... ⚠ FAILED (non-critical)`,
        );
        failed++;
      }
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n  ────────────────────────────────────────");
  console.log(`  Pipeline completed in ${elapsed}s`);
  console.log(
    `  Steps: ${STEPS.length - skipped - failed} passed, ${skipped} skipped, ${failed} failed`,
  );

  // Show summary of outputs
  console.log("\n  Outputs:");
  const outputs = [
    { file: ".graph/tauri-graph-d3.json", name: "Graph data" },
    { file: ".graph/suggestions.json", name: "Raw suggestions" },
    { file: ".graph/suggestions-enriched.json", name: "Enriched suggestions" },
    { file: ".graph/embeddings.json", name: "Embeddings index" },
  ];

  for (const output of outputs) {
    const exists = existsSync(join(VAULT_ROOT, output.file));
    console.log(`    ${exists ? "✓" : "○"} ${output.name}`);
  }

  console.log("\n  To view the graph:");
  console.log("    npm run graph:view\n");

  // Open viewer if requested
  if (config.view) {
    console.log("  Opening graph viewer...\n");
    spawn("npm", ["run", "graph:view"], {
      cwd: VAULT_ROOT,
      stdio: "inherit",
      shell: true,
      detached: true,
    }).unref();
  }
}

main().catch((err) => {
  console.error("Pipeline error:", err);
  process.exit(1);
});
