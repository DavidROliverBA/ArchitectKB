#!/usr/bin/env node

/**
 * Vault Graph Builder
 *
 * A modular graph builder for Obsidian vaults that extracts wiki-links,
 * frontmatter metadata, and builds a graph structure suitable for visualisation.
 *
 * Designed for integration with Tauri apps and other graph visualisation tools.
 *
 * Usage:
 *   node scripts/vault-graph-builder.js                    # Build and output JSON
 *   node scripts/vault-graph-builder.js --output=FILE      # Custom output path
 *   node scripts/vault-graph-builder.js --format=d3        # D3.js compatible format
 *   node scripts/vault-graph-builder.js --format=cytoscape # Cytoscape.js format
 *   node scripts/vault-graph-builder.js --stats            # Show stats only
 *
 * Programmatic Usage:
 *   import { VaultGraphBuilder } from './vault-graph-builder.js';
 *   const builder = new VaultGraphBuilder('/path/to/vault');
 *   const graph = await builder.build();
 *
 * Output:
 *   - nodes: Array of notes with metadata
 *   - edges: Array of links between notes (adjacency list style)
 *   - adjacencyList: Map of node -> outgoing edges
 *   - reverseAdjacencyList: Map of node -> incoming edges (backlinks)
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default configuration
const DEFAULT_CONFIG = {
  excludedDirs: ['.git', '.obsidian', 'node_modules', '.smart-env', 'scripts', 'screenshots', '.graph'],
  excludedFiles: [],
  includeOrphans: true,
  includeBrokenLinks: false
};

/**
 * Graph Node representing a single note in the vault
 * @typedef {Object} GraphNode
 * @property {string} id - Unique identifier (filename without .md)
 * @property {string} label - Display label (title from frontmatter or filename)
 * @property {string} path - Relative path from vault root
 * @property {string} type - Note type from frontmatter
 * @property {Object} metadata - Frontmatter and derived metadata
 * @property {string[]} outgoingLinks - Array of target node IDs
 * @property {number} outDegree - Number of outgoing links
 * @property {number} inDegree - Number of incoming links (set after edge building)
 */

/**
 * Graph Edge representing a wiki-link between notes
 * @typedef {Object} GraphEdge
 * @property {string} source - Source node ID
 * @property {string} target - Target node ID
 * @property {string} type - Edge type (e.g., 'links-to', 'belongs-to')
 * @property {boolean} exists - Whether target note exists
 * @property {string|null} displayText - Optional display text from [[link|display]]
 */

/**
 * VaultGraphBuilder - Main class for building vault graphs
 */
export class VaultGraphBuilder {
  /**
   * Create a new VaultGraphBuilder
   * @param {string} vaultPath - Path to the Obsidian vault
   * @param {Object} config - Configuration options
   */
  constructor(vaultPath, config = {}) {
    this.vaultPath = path.resolve(vaultPath);
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Internal state
    this.nodes = new Map();      // id -> GraphNode
    this.edges = [];             // Array of GraphEdge
    this.adjacencyList = new Map();        // id -> [target ids]
    this.reverseAdjacencyList = new Map(); // id -> [source ids] (backlinks)
    this.brokenLinks = [];       // Array of broken link records
    this.stats = null;
  }

  /**
   * Build the complete graph from the vault
   * @returns {Promise<Object>} Graph data with nodes, edges, and adjacency lists
   */
  async build() {
    // Reset state
    this.nodes.clear();
    this.edges = [];
    this.adjacencyList.clear();
    this.reverseAdjacencyList.clear();
    this.brokenLinks = [];

    // Step 1: Find all markdown files
    const files = await this.findMarkdownFiles();

    // Step 2: Build nodes from files
    await this.buildNodes(files);

    // Step 3: Build edges and adjacency lists
    this.buildEdges();

    // Step 4: Calculate in-degrees
    this.calculateInDegrees();

    // Step 5: Calculate statistics
    this.stats = this.calculateStats();

    return this.getGraph();
  }

  /**
   * Find all markdown files in the vault
   * @returns {Promise<string[]>} Array of absolute file paths
   */
  async findMarkdownFiles() {
    const ignorePatterns = this.config.excludedDirs.map(dir => `${dir}/**`);

    const files = await glob('**/*.md', {
      cwd: this.vaultPath,
      ignore: ignorePatterns,
      absolute: true
    });

    return files.filter(file => {
      const filename = path.basename(file);
      return !this.config.excludedFiles.includes(filename);
    });
  }

  /**
   * Build nodes from markdown files
   * @param {string[]} files - Array of file paths
   */
  async buildNodes(files) {
    for (const file of files) {
      try {
        const node = await this.parseFile(file);
        this.nodes.set(node.id, node);
        this.adjacencyList.set(node.id, []);
        this.reverseAdjacencyList.set(node.id, []);
      } catch (error) {
        console.error(`Error parsing ${file}: ${error.message}`);
      }
    }
  }

  /**
   * Parse a single markdown file into a GraphNode
   * @param {string} filePath - Absolute path to the file
   * @returns {Promise<GraphNode>} The parsed node
   */
  async parseFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);
    const stats = fs.statSync(filePath);

    const filename = path.basename(filePath, '.md');
    const relativePath = path.relative(this.vaultPath, filePath);

    // Extract wiki-links from content and frontmatter
    const links = this.extractWikiLinks(body, frontmatter);

    // Determine node group for visualisation clustering
    const group = this.determineNodeGroup(frontmatter, relativePath);

    // Build metadata object
    const metadata = {
      // Core frontmatter fields
      title: frontmatter.title || filename,
      type: frontmatter.type || 'Unknown',
      status: frontmatter.status || null,
      priority: frontmatter.priority || null,
      tags: this.normaliseTags(frontmatter.tags),

      // Dates
      created: frontmatter.created || null,
      modified: frontmatter.modified || stats.mtime.toISOString().split('T')[0],

      // Quality indicators
      confidence: frontmatter.confidence || null,
      freshness: frontmatter.freshness || null,
      verified: frontmatter.verified || null,

      // Relationships from frontmatter
      project: this.extractLinkTarget(frontmatter.project),
      relatedTo: this.extractLinkTargets(frontmatter.relatedTo),
      supersedes: this.extractLinkTargets(frontmatter.supersedes),
      dependsOn: this.extractLinkTargets(frontmatter.dependsOn),

      // Type-specific fields
      ...this.extractTypeSpecificFields(frontmatter),

      // Stats
      wordCount: this.countWords(body),
      lineCount: body.split('\n').length,
      fileSize: stats.size
    };

    return {
      id: filename,
      label: metadata.title,
      path: relativePath,
      type: frontmatter.type || 'Unknown',
      group,
      metadata,
      content: body, // Include full note content for display
      frontmatter, // Include raw frontmatter
      outgoingLinks: links.map(l => l.target),
      rawLinks: links, // Includes display text
      outDegree: links.length,
      inDegree: 0 // Will be set in calculateInDegrees()
    };
  }

  /**
   * Extract wiki-links from content and frontmatter
   * @param {string} body - Note body content
   * @param {Object} frontmatter - Frontmatter object
   * @returns {Array<{target: string, displayText: string|null}>} Array of link objects
   */
  extractWikiLinks(body, frontmatter) {
    const linkRegex = /\[\[([^\]|#^]+)(?:#[^\]|]*)?(?:\^[^\]|]*)?(?:\|([^\]]+))?\]\]/g;
    const links = [];
    const seenTargets = new Set();

    // Extract from body
    let match;
    while ((match = linkRegex.exec(body)) !== null) {
      const target = match[1].trim();
      const displayText = match[2]?.trim() || null;

      if (!seenTargets.has(target)) {
        seenTargets.add(target);
        links.push({ target, displayText });
      }
    }

    // Extract from frontmatter (serialise to string for regex matching)
    const frontmatterStr = JSON.stringify(frontmatter);
    linkRegex.lastIndex = 0; // Reset regex state

    while ((match = linkRegex.exec(frontmatterStr)) !== null) {
      const target = match[1].trim();
      if (!seenTargets.has(target)) {
        seenTargets.add(target);
        links.push({ target, displayText: null });
      }
    }

    return links;
  }

  /**
   * Build edges from node links
   */
  buildEdges() {
    for (const [sourceId, node] of this.nodes) {
      for (const link of node.rawLinks) {
        const targetId = link.target;
        const targetExists = this.nodes.has(targetId);

        const edge = {
          source: sourceId,
          target: targetId,
          type: this.determineEdgeType(node, targetId),
          exists: targetExists,
          displayText: link.displayText
        };

        this.edges.push(edge);

        // Add to adjacency list
        this.adjacencyList.get(sourceId).push(targetId);

        // Add to reverse adjacency list (backlinks)
        if (targetExists) {
          this.reverseAdjacencyList.get(targetId).push(sourceId);
        } else if (this.config.includeBrokenLinks) {
          // Track broken links
          this.brokenLinks.push({
            source: sourceId,
            target: targetId,
            sourcePath: node.path
          });
        }
      }
    }
  }

  /**
   * Calculate in-degrees for all nodes
   */
  calculateInDegrees() {
    for (const [nodeId, sources] of this.reverseAdjacencyList) {
      const node = this.nodes.get(nodeId);
      if (node) {
        node.inDegree = sources.length;
      }
    }
  }

  /**
   * Determine edge type based on source and target
   * @param {GraphNode} sourceNode - Source node
   * @param {string} targetId - Target node ID
   * @returns {string} Edge type
   */
  determineEdgeType(sourceNode, targetId) {
    const targetNode = this.nodes.get(targetId);
    if (!targetNode) return 'broken';

    const sourceType = sourceNode.type;
    const targetType = targetNode.type;

    // Semantic edge types based on note types
    const edgeTypeMap = {
      'Task:Project': 'belongs-to',
      'Meeting:Project': 'discusses',
      'Adr:Project': 'impacts',
      'Adr:Adr': 'relates-to',
      'Meeting:Person': 'involves',
      'Task:Person': 'assigned-to',
      'Person:Organisation': 'works-for',
      'IncubatorNote:Incubator': 'supports',
      '*:Weblink': 'references'
    };

    // Check specific mappings
    const key = `${sourceType}:${targetType}`;
    if (edgeTypeMap[key]) return edgeTypeMap[key];

    // Check wildcard mappings
    const wildcardKey = `*:${targetType}`;
    if (edgeTypeMap[wildcardKey]) return edgeTypeMap[wildcardKey];

    return 'links-to';
  }

  /**
   * Determine node group for visualisation clustering
   * @param {Object} frontmatter - Note frontmatter
   * @param {string} relativePath - Relative file path
   * @returns {string} Group identifier
   */
  determineNodeGroup(frontmatter, relativePath) {
    const type = frontmatter.type || 'Unknown';

    // Group by folder location
    if (relativePath.startsWith('Daily/')) return 'Daily';
    if (relativePath.startsWith('Meetings/')) return 'Meetings';
    if (relativePath.startsWith('Templates/')) return 'Templates';
    if (relativePath.startsWith('People/')) return 'People';
    if (relativePath.startsWith('Incubator/')) return 'Incubator';
    if (relativePath.startsWith('Sync/')) return 'Sync';
    if (relativePath.startsWith('Archive/')) return 'Archive';

    // Group by type
    return type;
  }

  /**
   * Extract type-specific metadata fields
   * @param {Object} frontmatter - Note frontmatter
   * @returns {Object} Type-specific fields
   */
  extractTypeSpecificFields(frontmatter) {
    const type = frontmatter.type;
    const fields = {};

    switch (type) {
      case 'Task':
        fields.completed = frontmatter.completed || false;
        fields.dueBy = frontmatter.dueBy || frontmatter.due || null;
        fields.doDate = frontmatter.doDate || null;
        break;

      case 'Project':
        fields.timeFrame = frontmatter.timeFrame || null;
        fields.transformationType = frontmatter.transformationType || null;
        fields.transformationScope = frontmatter.transformationScope || null;
        fields.aiInvolved = frontmatter.aiInvolved || false;
        break;

      case 'Adr':
        fields.adrType = frontmatter.adrType || null;
        fields.deciders = frontmatter.deciders || [];
        fields.approvers = frontmatter.approvers || [];
        fields.source = frontmatter.source || 'local';
        fields.authority = frontmatter.authority || 'draft';
        break;

      case 'Meeting':
        fields.date = frontmatter.date || null;
        fields.attendees = this.extractLinkTargets(frontmatter.attendees);
        fields.summary = frontmatter.summary || null;
        break;

      case 'Person':
        fields.role = frontmatter.role || null;
        fields.organisation = this.extractLinkTarget(frontmatter.organisation);
        fields.emailAddress = frontmatter.emailAddress || null;
        break;

      case 'Weblink':
        fields.url = frontmatter.url || null;
        fields.domain = frontmatter.domain || null;
        break;

      case 'Incubator':
        fields.domain = frontmatter.domain || [];
        fields.outcome = frontmatter.outcome || null;
        break;

      case 'FormSubmission':
        fields.formType = frontmatter.formType || null;
        fields.expiryDate = frontmatter.expiryDate || null;
        fields.referenceNumber = frontmatter.referenceNumber || null;
        break;
    }

    return fields;
  }

  /**
   * Extract link target from a wiki-link string
   * @param {string|null} value - Wiki-link string or null
   * @returns {string|null} Target note ID or null
   */
  extractLinkTarget(value) {
    if (!value) return null;
    const match = String(value).match(/\[\[([^\]|]+)/);
    return match ? match[1].trim() : null;
  }

  /**
   * Extract link targets from an array of wiki-link strings
   * @param {Array|null} values - Array of wiki-link strings
   * @returns {string[]} Array of target note IDs
   */
  extractLinkTargets(values) {
    if (!values || !Array.isArray(values)) return [];
    return values
      .map(v => this.extractLinkTarget(v))
      .filter(v => v !== null);
  }

  /**
   * Normalise tags array
   * @param {Array|null} tags - Raw tags array
   * @returns {string[]} Normalised tags
   */
  normaliseTags(tags) {
    if (!tags || !Array.isArray(tags)) return [];
    return tags.map(tag => String(tag).replace(/^#/, ''));
  }

  /**
   * Count words in content
   * @param {string} content - Text content
   * @returns {number} Word count
   */
  countWords(content) {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Calculate graph statistics
   * @returns {Object} Statistics object
   */
  calculateStats() {
    const nodeArray = Array.from(this.nodes.values());

    // Type distribution
    const typeDistribution = {};
    for (const node of nodeArray) {
      typeDistribution[node.type] = (typeDistribution[node.type] || 0) + 1;
    }

    // Group distribution
    const groupDistribution = {};
    for (const node of nodeArray) {
      groupDistribution[node.group] = (groupDistribution[node.group] || 0) + 1;
    }

    // Find orphans (no incoming links)
    const orphans = nodeArray.filter(n =>
      n.inDegree === 0 &&
      !this.isSpecialNode(n)
    );

    // Find hubs (top 10 by total degree)
    const hubs = nodeArray
      .map(n => ({
        id: n.id,
        label: n.label,
        type: n.type,
        totalDegree: n.inDegree + n.outDegree,
        inDegree: n.inDegree,
        outDegree: n.outDegree
      }))
      .sort((a, b) => b.totalDegree - a.totalDegree)
      .slice(0, 10);

    // Calculate averages
    const totalInDegree = nodeArray.reduce((sum, n) => sum + n.inDegree, 0);
    const totalOutDegree = nodeArray.reduce((sum, n) => sum + n.outDegree, 0);
    const totalWords = nodeArray.reduce((sum, n) => sum + (n.metadata.wordCount || 0), 0);

    return {
      totalNodes: this.nodes.size,
      totalEdges: this.edges.length,
      validEdges: this.edges.filter(e => e.exists).length,
      brokenLinks: this.brokenLinks.length,
      orphanCount: orphans.length,
      typeDistribution,
      groupDistribution,
      hubs,
      averages: {
        inDegree: (totalInDegree / this.nodes.size).toFixed(2),
        outDegree: (totalOutDegree / this.nodes.size).toFixed(2),
        wordCount: Math.round(totalWords / this.nodes.size)
      },
      density: this.calculateDensity()
    };
  }

  /**
   * Calculate graph density
   * @returns {string} Density as percentage
   */
  calculateDensity() {
    const n = this.nodes.size;
    const maxEdges = n * (n - 1); // Directed graph
    if (maxEdges === 0) return '0.00%';
    const density = (this.edges.filter(e => e.exists).length / maxEdges) * 100;
    return density.toFixed(2) + '%';
  }

  /**
   * Check if a node should be excluded from orphan checks
   * @param {GraphNode} node - Node to check
   * @returns {boolean} True if special node
   */
  isSpecialNode(node) {
    const id = node.id;
    return (
      id.startsWith('MOC -') ||
      id.startsWith('Dashboard -') ||
      id.startsWith('Template') ||
      id === 'README' ||
      id === 'CLAUDE' ||
      node.type === 'DailyNote' ||
      node.type === 'Template' ||
      node.group === 'Templates'
    );
  }

  /**
   * Get the complete graph data structure
   * @returns {Object} Complete graph object
   */
  getGraph() {
    return {
      metadata: {
        generated: new Date().toISOString(),
        vaultPath: this.vaultPath,
        vaultName: path.basename(this.vaultPath),
        version: '1.0.0'
      },
      nodes: Array.from(this.nodes.values()).map(this.serializeNode),
      edges: this.edges,
      adjacencyList: Object.fromEntries(this.adjacencyList),
      reverseAdjacencyList: Object.fromEntries(this.reverseAdjacencyList),
      brokenLinks: this.brokenLinks,
      stats: this.stats
    };
  }

  /**
   * Serialize a node for output (remove internal properties)
   * @param {GraphNode} node - Node to serialize
   * @returns {Object} Serialized node
   */
  serializeNode(node) {
    const { rawLinks, ...serialized } = node;
    // Keep content and frontmatter for display
    return serialized;
  }

  /**
   * Export graph in D3.js force-directed format
   * @returns {Object} D3.js compatible graph
   */
  toD3Format() {
    return {
      nodes: Array.from(this.nodes.values()).map(node => ({
        id: node.id,
        name: node.label,
        type: node.type,
        group: node.group,
        value: node.inDegree + node.outDegree, // Size by connections
        metadata: {
          status: node.metadata.status,
          priority: node.metadata.priority,
          tags: node.metadata.tags
        }
      })),
      links: this.edges
        .filter(e => e.exists)
        .map(edge => ({
          source: edge.source,
          target: edge.target,
          type: edge.type,
          value: 1
        }))
    };
  }

  /**
   * Export graph in Cytoscape.js format
   * @returns {Object} Cytoscape.js compatible graph
   */
  toCytoscapeFormat() {
    return {
      elements: {
        nodes: Array.from(this.nodes.values()).map(node => ({
          data: {
            id: node.id,
            label: node.label,
            type: node.type,
            group: node.group,
            ...node.metadata
          }
        })),
        edges: this.edges
          .filter(e => e.exists)
          .map((edge, i) => ({
            data: {
              id: `e${i}`,
              source: edge.source,
              target: edge.target,
              type: edge.type
            }
          }))
      }
    };
  }

  /**
   * Get orphaned nodes (no incoming links)
   * @returns {GraphNode[]} Array of orphaned nodes
   */
  getOrphans() {
    return Array.from(this.nodes.values())
      .filter(n => n.inDegree === 0 && !this.isSpecialNode(n));
  }

  /**
   * Get backlinks for a specific note
   * @param {string} nodeId - Node ID to get backlinks for
   * @returns {string[]} Array of source node IDs
   */
  getBacklinks(nodeId) {
    return this.reverseAdjacencyList.get(nodeId) || [];
  }

  /**
   * Get outgoing links for a specific note
   * @param {string} nodeId - Node ID to get links for
   * @returns {string[]} Array of target node IDs
   */
  getOutgoingLinks(nodeId) {
    return this.adjacencyList.get(nodeId) || [];
  }

  /**
   * Find notes by type
   * @param {string} type - Note type
   * @returns {GraphNode[]} Array of matching nodes
   */
  findByType(type) {
    return Array.from(this.nodes.values())
      .filter(n => n.type.toLowerCase() === type.toLowerCase());
  }

  /**
   * Find notes by tag
   * @param {string} tag - Tag to search for
   * @returns {GraphNode[]} Array of matching nodes
   */
  findByTag(tag) {
    const normalizedTag = tag.replace(/^#/, '').toLowerCase();
    return Array.from(this.nodes.values())
      .filter(n => n.metadata.tags.some(t =>
        t.toLowerCase().includes(normalizedTag)
      ));
  }

  /**
   * Search nodes by keyword (title, tags)
   * @param {string} keyword - Search keyword
   * @returns {GraphNode[]} Array of matching nodes
   */
  search(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return Array.from(this.nodes.values())
      .filter(n => {
        const searchable = [
          n.id,
          n.label,
          ...n.metadata.tags,
          n.metadata.status || '',
          n.type
        ].join(' ').toLowerCase();
        return searchable.includes(lowerKeyword);
      });
  }
}

// CLI functionality
async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const options = {
    output: null,
    format: 'default', // default, d3, cytoscape
    stats: false,
    help: false,
    vaultPath: path.resolve(__dirname, '../..')
  };

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--stats') {
      options.stats = true;
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1];
    } else if (arg.startsWith('--format=')) {
      options.format = arg.split('=')[1];
    } else if (arg.startsWith('--vault=')) {
      options.vaultPath = path.resolve(arg.split('=')[1]);
    }
  }

  if (options.help) {
    console.log(`
Vault Graph Builder - Build graph data from Obsidian vault

Usage:
  node scripts/vault-graph-builder.js [options]

Options:
  --output=FILE       Output JSON to specified file
  --format=FORMAT     Output format: default, d3, cytoscape
  --stats             Show statistics only
  --vault=PATH        Path to vault (default: parent directory)
  --help, -h          Show this help

Examples:
  node scripts/vault-graph-builder.js --output=graph.json
  node scripts/vault-graph-builder.js --format=d3 --output=d3-graph.json
  node scripts/vault-graph-builder.js --stats
`);
    process.exit(0);
  }

  console.log('Building vault graph...');
  console.log(`Vault: ${options.vaultPath}`);

  const builder = new VaultGraphBuilder(options.vaultPath);
  const graph = await builder.build();

  if (options.stats) {
    console.log('\nGraph Statistics:');
    console.log(JSON.stringify(graph.stats, null, 2));
    process.exit(0);
  }

  // Determine output format
  let output;
  switch (options.format) {
    case 'd3':
      output = builder.toD3Format();
      break;
    case 'cytoscape':
      output = builder.toCytoscapeFormat();
      break;
    default:
      output = graph;
  }

  // Output
  if (options.output) {
    const outputPath = path.resolve(options.vaultPath, options.output);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
    console.log(`\nGraph written to: ${outputPath}`);
  } else {
    console.log(JSON.stringify(output, null, 2));
  }

  console.log(`\nNodes: ${graph.stats.totalNodes}`);
  console.log(`Edges: ${graph.stats.totalEdges}`);
  console.log(`Orphans: ${graph.stats.orphanCount}`);
  console.log(`Broken Links: ${graph.stats.brokenLinks}`);
}

// Run CLI if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
}

export default VaultGraphBuilder;
