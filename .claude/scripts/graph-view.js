#!/usr/bin/env node

/**
 * Graph View Server
 * Serves the Orb-based knowledge graph visualisation
 *
 * Usage:
 *   npm run graph:view                    # Full graph
 *   npm run graph:view -- --type=Person   # Filter by type
 *   npm run graph:view -- --pillar=Entity # Filter by pillar
 *   npm run graph:view -- --port=8080     # Custom port
 */

import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

import {
  acceptSuggestion,
  rejectSuggestion,
  filterRejected,
  getActionStats,
} from "./graph-actions/suggestion-actions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const DEFAULT_PORT = 8765;
const GRAPH_DATA_PATH = join(__dirname, "../../.graph/tauri-graph-d3.json");
const SUGGESTIONS_PATH = join(__dirname, "../../.graph/suggestions.json");
const ENRICHED_SUGGESTIONS_PATH = join(
  __dirname,
  "../../.graph/suggestions-enriched.json",
);
const STATIC_DIR = join(__dirname, "graph-view");

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    port: DEFAULT_PORT,
    type: null,
    pillar: null,
  };

  args.forEach((arg) => {
    if (arg.startsWith("--port=")) {
      config.port = parseInt(arg.split("=")[1], 10);
    } else if (arg.startsWith("--type=")) {
      config.type = arg.split("=")[1];
    } else if (arg.startsWith("--pillar=")) {
      config.pillar = arg.split("=")[1].toLowerCase();
    }
  });

  return config;
}

// MIME types
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

// Load and optionally filter graph data
function loadGraphData(config) {
  if (!existsSync(GRAPH_DATA_PATH)) {
    console.error(`Graph data not found at ${GRAPH_DATA_PATH}`);
    console.error("Run: npm run graph:tauri:d3");
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(GRAPH_DATA_PATH, "utf-8"));

  // Apply filters if specified
  if (config.type || config.pillar) {
    const TYPE_TO_PILLAR = {
      Person: "entity",
      System: "entity",
      Organisation: "entity",
      DataAsset: "entity",
      Location: "entity",
      Concept: "node",
      Pattern: "node",
      Capability: "node",
      Theme: "node",
      Research: "node",
      Weblink: "node",
      Meeting: "event",
      Project: "event",
      Task: "event",
      ADR: "event",
      Incubator: "event",
      Email: "event",
      Trip: "event",
      Daily: "event",
      Workstream: "event",
      Forum: "event",
      FormSubmission: "event",
      MOC: "navigation",
      Dashboard: "navigation",
      Query: "navigation",
      ArchModel: "navigation",
    };

    let filteredNodes = data.nodes;

    if (config.pillar) {
      filteredNodes = filteredNodes.filter(
        (n) => TYPE_TO_PILLAR[n.type]?.toLowerCase() === config.pillar,
      );
    }

    if (config.type) {
      filteredNodes = filteredNodes.filter((n) => n.type === config.type);
    }

    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = data.links.filter(
      (l) => nodeIds.has(l.source) && nodeIds.has(l.target),
    );

    return { nodes: filteredNodes, links: filteredLinks };
  }

  return data;
}

// Serve static files
function serveStatic(res, filePath) {
  const ext = filePath.match(/\.[^.]+$/)?.[0] || ".html";
  const mimeType = MIME_TYPES[ext] || "text/plain";

  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": mimeType });
    res.end(content);
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

/**
 * Parse JSON body from POST request
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

// Open browser
function openBrowser(url) {
  const platform = process.platform;
  let cmd;

  if (platform === "darwin") {
    cmd = `open "${url}"`;
  } else if (platform === "win32") {
    cmd = `start "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }

  exec(cmd, (err) => {
    if (err) {
      console.log(`Open ${url} in your browser`);
    }
  });
}

// Main
function main() {
  const config = parseArgs();
  const graphData = loadGraphData(config);

  const server = createServer(async (req, res) => {
    const url = req.url.split("?")[0];

    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    // API endpoints (POST)
    if (req.method === "POST") {
      try {
        const body = await parseBody(req);

        if (url === "/api/accept") {
          const result = acceptSuggestion(body);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
          return;
        }

        if (url === "/api/reject") {
          const result = rejectSuggestion(body, body.reason);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
          return;
        }

        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
        return;
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
    }

    // API endpoints (GET)
    if (url === "/api/stats") {
      const stats = getActionStats();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
      return;
    }

    if (url === "/" || url === "/index.html") {
      serveStatic(res, join(STATIC_DIR, "index.html"));
    } else if (url === "/graph.json") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(graphData));
    } else if (url === "/styles.css") {
      serveStatic(res, join(STATIC_DIR, "styles.css"));
    } else if (url === "/app.js") {
      serveStatic(res, join(STATIC_DIR, "app.js"));
    } else if (url === "/suggestions.json") {
      // Serve enriched suggestions if available, otherwise raw suggestions
      let suggestionsPath = SUGGESTIONS_PATH;
      if (existsSync(ENRICHED_SUGGESTIONS_PATH)) {
        suggestionsPath = ENRICHED_SUGGESTIONS_PATH;
      }
      if (existsSync(suggestionsPath)) {
        let suggestions = JSON.parse(readFileSync(suggestionsPath, "utf-8"));
        // Filter out rejected suggestions
        suggestions = filterRejected(suggestions);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(suggestions));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("[]");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  server.listen(config.port, () => {
    const url = `http://localhost:${config.port}`;
    console.log(`\n  Knowledge Graph Viewer`);
    console.log(`  ──────────────────────`);
    console.log(`  Server: ${url}`);
    console.log(`  Nodes:  ${graphData.nodes.length.toLocaleString()}`);
    console.log(`  Edges:  ${graphData.links.length.toLocaleString()}`);

    if (config.type) {
      console.log(`  Filter: type=${config.type}`);
    }
    if (config.pillar) {
      console.log(`  Filter: pillar=${config.pillar}`);
    }

    console.log(`\n  Press Ctrl+C to stop\n`);

    openBrowser(url);
  });

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n  Shutting down...");
    server.close(() => {
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      process.exit(0);
    });
  });
}

main();
