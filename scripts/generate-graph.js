#!/usr/bin/env node

/**
 * Obsidian Knowledge Graph Export Script
 *
 * Exports the vault's knowledge graph structure to JSON format for visualization
 * and analysis. Extracts nodes (notes with metadata) and edges (wiki-links between notes).
 *
 * Usage:
 *   node scripts/generate-graph.js                  # Export graph to vault-graph.json
 *   node scripts/generate-graph.js --metrics        # Show graph metrics only
 *   node scripts/generate-graph.js --output FILE    # Custom output path
 *
 * Output:
 *   - JSON graph data with nodes and edges
 *   - Graph metrics (nodes, edges, clusters)
 *   - Compatible with D3.js, vis.js, Cytoscape.js
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const VAULT_ROOT = path.resolve(__dirname, '..');
const EXCLUDED_DIRS = ['.git', '.obsidian', 'node_modules', '.smart-env', 'scripts', 'screenshots'];
const DEFAULT_OUTPUT = 'vault-graph.json';

class KnowledgeGraphGenerator {
  constructor() {
    this.graph = {
      metadata: {
        generated: new Date().toISOString(),
        vault: path.basename(VAULT_ROOT),
        version: '1.0'
      },
      nodes: [],
      edges: [],
      clusters: {}
    };

    this.noteIndex = new Map(); // filename -> node index
    this.metrics = {
      totalNodes: 0,
      totalEdges: 0,
      nodesByType: {},
      averageDegree: 0,
      isolatedNodes: 0,
      stronglyConnectedComponents: 0,
      clusters: {}
    };
  }

  /**
   * Main generation entry point
   */
  async generate() {
    console.log(chalk.blue.bold('\n🕸️  Knowledge Graph Generation\n'));
    console.log(chalk.gray(`Vault: ${VAULT_ROOT}\n`));

    // Find all markdown files
    const files = await this.findMarkdownFiles();
    console.log(chalk.gray(`Processing ${files.length} notes...\n`));

    // Build nodes
    await this.buildNodes(files);

    // Build edges
    this.buildEdges();

    // Calculate metrics
    this.calculateMetrics();

    return this.graph;
  }

  /**
   * Find all markdown files in vault
   */
  async findMarkdownFiles() {
    const pattern = '**/*.md';
    const files = await glob(pattern, {
      cwd: VAULT_ROOT,
      ignore: EXCLUDED_DIRS.map(dir => `${dir}/**`),
      absolute: true
    });

    return files;
  }

  /**
   * Build graph nodes from notes
   */
  async buildNodes(files) {
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const { data: frontmatter, content: body } = matter(content);
        const stats = fs.statSync(file);

        const filename = path.basename(file, '.md');
        const relativePath = path.relative(VAULT_ROOT, file);

        const node = {
          id: filename,
          label: frontmatter.title || filename,
          type: frontmatter.type || 'Unknown',
          path: relativePath,
          metadata: {
            created: frontmatter.created || null,
            modified: stats.mtime.toISOString().split('T')[0],
            tags: frontmatter.tags || [],
            status: frontmatter.status || null,
            priority: frontmatter.priority || null,
            wordCount: this.countWords(body)
          },
          links: this.extractLinks(body, frontmatter),
          group: this.determineGroup(frontmatter, relativePath)
        };

        // Add type-specific metadata
        this.addTypeSpecificMetadata(node, frontmatter);

        const nodeIndex = this.graph.nodes.length;
        this.graph.nodes.push(node);
        this.noteIndex.set(filename, nodeIndex);

      } catch (error) {
        console.error(chalk.red(`Error processing ${file}: ${error.message}`));
      }
    }
  }

  /**
   * Extract wiki-links from content
   */
  extractLinks(content, frontmatter) {
    const linkRegex = /\[\[([^\]|]+)(\|[^\]]+)?\]\]/g;
    const links = new Set();
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const cleanLink = match[1].split('#')[0].split('^')[0].trim();
      links.add(cleanLink);
    }

    // Check links in frontmatter
    const frontmatterStr = JSON.stringify(frontmatter);
    while ((match = linkRegex.exec(frontmatterStr)) !== null) {
      const cleanLink = match[1].split('#')[0].split('^')[0].trim();
      links.add(cleanLink);
    }

    return Array.from(links);
  }

  /**
   * Count words in content
   */
  countWords(content) {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Determine node group/cluster
   */
  determineGroup(frontmatter, relativePath) {
    // Group by type primarily
    const type = frontmatter.type || 'Unknown';

    // Sub-group by location
    if (relativePath.startsWith('+Daily/')) {
      return `${type}-Daily`;
    } else if (relativePath.startsWith('+Meetings/')) {
      return `${type}-Meetings`;
    } else if (relativePath.startsWith('+Templates/')) {
      return 'Template';
    } else if (frontmatter.project) {
      // Extract project name from wiki-link
      const projectMatch = frontmatter.project.match(/\[\[([^\]]+)\]\]/);
      if (projectMatch) {
        return `Project-${projectMatch[1]}`;
      }
    }

    return type;
  }

  /**
   * Add type-specific metadata to node
   */
  addTypeSpecificMetadata(node, frontmatter) {
    const type = frontmatter.type;

    if (type === 'Task') {
      node.metadata.completed = frontmatter.completed || false;
      node.metadata.due = frontmatter.due || null;
      node.metadata.project = frontmatter.project || null;
    } else if (type === 'Project') {
      node.metadata.category = frontmatter.category || null;
      node.metadata.startDate = frontmatter['start-date'] || null;
      node.metadata.endDate = frontmatter['end-date'] || null;
    } else if (type === 'Adr') {
      node.metadata.category = frontmatter.category || null;
      node.metadata.confidence = frontmatter.confidence || null;
      node.metadata.freshness = frontmatter.freshness || null;
      node.metadata.deciders = frontmatter.deciders || [];
    } else if (type === 'Meeting') {
      node.metadata.date = frontmatter.date || null;
      node.metadata.attendees = frontmatter.attendees || [];
      node.metadata.project = frontmatter.project || null;
    } else if (type === 'Person') {
      node.metadata.role = frontmatter.role || null;
      node.metadata.organisation = frontmatter.organisation || null;
      node.metadata.email = frontmatter.emailAddress || null;
    } else if (type === 'Weblink') {
      node.metadata.url = frontmatter.url || null;
      node.metadata.domain = frontmatter.domain || null;
    }
  }

  /**
   * Build graph edges from links
   */
  buildEdges() {
    for (let i = 0; i < this.graph.nodes.length; i++) {
      const sourceNode = this.graph.nodes[i];

      for (const link of sourceNode.links) {
        const targetIndex = this.noteIndex.get(link);

        if (targetIndex !== undefined) {
          const targetNode = this.graph.nodes[targetIndex];

          const edge = {
            source: sourceNode.id,
            target: targetNode.id,
            type: this.determineEdgeType(sourceNode, targetNode),
            weight: 1
          };

          this.graph.edges.push(edge);
        }
      }
    }
  }

  /**
   * Determine edge type based on node types
   */
  determineEdgeType(sourceNode, targetNode) {
    const sourceType = sourceNode.type;
    const targetType = targetNode.type;

    // Special relationships
    if (sourceType === 'Task' && targetType === 'Project') {
      return 'belongs-to';
    } else if (sourceType === 'Meeting' && targetType === 'Project') {
      return 'discusses';
    } else if (sourceType === 'Adr' && targetType === 'Project') {
      return 'impacts';
    } else if (sourceType === 'Adr' && targetType === 'Adr') {
      return 'relates-to';
    } else if ((sourceType === 'Meeting' || sourceType === 'Task') && targetType === 'Person') {
      return 'involves';
    } else if (sourceType === 'Person' && targetType === 'Organisation') {
      return 'works-for';
    } else if (targetType === 'Weblink') {
      return 'references';
    }

    return 'links-to';
  }

  /**
   * Calculate graph metrics
   */
  calculateMetrics() {
    this.metrics.totalNodes = this.graph.nodes.length;
    this.metrics.totalEdges = this.graph.edges.length;

    // Count nodes by type
    for (const node of this.graph.nodes) {
      this.metrics.nodesByType[node.type] = (this.metrics.nodesByType[node.type] || 0) + 1;
    }

    // Calculate degree distribution
    const degreeMap = new Map();
    for (const node of this.graph.nodes) {
      degreeMap.set(node.id, { in: 0, out: 0 });
    }

    for (const edge of this.graph.edges) {
      if (degreeMap.has(edge.source)) {
        degreeMap.get(edge.source).out++;
      }
      if (degreeMap.has(edge.target)) {
        degreeMap.get(edge.target).in++;
      }
    }

    // Calculate average degree
    let totalDegree = 0;
    let isolatedCount = 0;

    for (const [nodeId, degree] of degreeMap.entries()) {
      const totalNodeDegree = degree.in + degree.out;
      totalDegree += totalNodeDegree;

      if (totalNodeDegree === 0) {
        isolatedCount++;
      }
    }

    this.metrics.averageDegree = this.metrics.totalNodes > 0
      ? (totalDegree / this.metrics.totalNodes).toFixed(2)
      : 0;

    this.metrics.isolatedNodes = isolatedCount;

    // Cluster/group statistics
    for (const node of this.graph.nodes) {
      this.metrics.clusters[node.group] = (this.metrics.clusters[node.group] || 0) + 1;
    }

    // Calculate density
    const maxEdges = this.metrics.totalNodes * (this.metrics.totalNodes - 1);
    this.metrics.density = maxEdges > 0
      ? ((this.metrics.totalEdges / maxEdges) * 100).toFixed(2) + '%'
      : '0%';

    // Find hub nodes (top 10 by degree)
    const nodesByDegree = Array.from(degreeMap.entries())
      .map(([id, degree]) => ({
        id,
        degree: degree.in + degree.out,
        inDegree: degree.in,
        outDegree: degree.out
      }))
      .sort((a, b) => b.degree - a.degree)
      .slice(0, 10);

    this.metrics.hubs = nodesByDegree.map(node => {
      const nodeData = this.graph.nodes.find(n => n.id === node.id);
      return {
        id: node.id,
        label: nodeData?.label || node.id,
        type: nodeData?.type || 'Unknown',
        degree: node.degree,
        inDegree: node.inDegree,
        outDegree: node.outDegree
      };
    });

    // Add metrics to graph metadata
    this.graph.metadata.metrics = this.metrics;
  }

  /**
   * Export graph to JSON
   */
  exportToFile(outputPath) {
    const fullPath = path.resolve(VAULT_ROOT, outputPath);
    const json = JSON.stringify(this.graph, null, 2);

    fs.writeFileSync(fullPath, json, 'utf8');
    console.log(chalk.green(`\n✅ Graph exported to: ${fullPath}\n`));
  }

  /**
   * Print metrics summary
   */
  printMetrics() {
    console.log(chalk.blue.bold('📊 Graph Metrics\n'));

    console.log(chalk.gray(`Total Nodes:    ${chalk.white(this.metrics.totalNodes)}`));
    console.log(chalk.gray(`Total Edges:    ${chalk.white(this.metrics.totalEdges)}`));
    console.log(chalk.gray(`Average Degree: ${chalk.white(this.metrics.averageDegree)}`));
    console.log(chalk.gray(`Graph Density:  ${chalk.white(this.metrics.density)}`));
    console.log(chalk.gray(`Isolated Nodes: ${chalk.white(this.metrics.isolatedNodes)}`));
    console.log('');

    // Nodes by type
    console.log(chalk.blue.bold('📝 Nodes by Type\n'));
    const sortedTypes = Object.entries(this.metrics.nodesByType).sort((a, b) => b[1] - a[1]);

    for (const [type, count] of sortedTypes) {
      const percentage = ((count / this.metrics.totalNodes) * 100).toFixed(1);
      const bar = '█'.repeat(Math.ceil(count / 5));
      console.log(chalk.gray(`  ${type.padEnd(15)} ${chalk.cyan(count.toString().padStart(4))} (${percentage.padStart(5)}%) ${bar}`));
    }
    console.log('');

    // Clusters
    console.log(chalk.blue.bold('🗂️  Clusters\n'));
    const sortedClusters = Object.entries(this.metrics.clusters)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    for (const [group, count] of sortedClusters) {
      console.log(chalk.gray(`  ${group.padEnd(30)} ${chalk.white(count)}`));
    }
    console.log('');

    // Hub nodes
    if (this.metrics.hubs && this.metrics.hubs.length > 0) {
      console.log(chalk.blue.bold('🌟 Hub Nodes (Most Connected)\n'));

      for (const hub of this.metrics.hubs) {
        console.log(chalk.gray(`  ${hub.label.padEnd(40)} ${chalk.white(hub.degree)} connections`));
        console.log(chalk.gray(`    Type: ${hub.type}, In: ${hub.inDegree}, Out: ${hub.outDegree}`));
      }
      console.log('');
    }

    // Edge type distribution
    const edgeTypes = {};
    for (const edge of this.graph.edges) {
      edgeTypes[edge.type] = (edgeTypes[edge.type] || 0) + 1;
    }

    if (Object.keys(edgeTypes).length > 0) {
      console.log(chalk.blue.bold('🔗 Edge Types\n'));

      const sortedEdgeTypes = Object.entries(edgeTypes).sort((a, b) => b[1] - a[1]);
      for (const [type, count] of sortedEdgeTypes) {
        const percentage = ((count / this.metrics.totalEdges) * 100).toFixed(1);
        console.log(chalk.gray(`  ${type.padEnd(20)} ${chalk.cyan(count.toString().padStart(4))} (${percentage}%)`));
      }
      console.log('');
    }
  }

  /**
   * Generate visualization-friendly format
   */
  generateVisualizationFormat() {
    // Create a simpler format optimized for D3.js force-directed graphs
    return {
      nodes: this.graph.nodes.map((node, index) => ({
        id: node.id,
        name: node.label,
        type: node.type,
        group: node.group,
        value: node.links.length, // Size based on connections
        metadata: {
          tags: node.metadata.tags,
          status: node.metadata.status,
          priority: node.metadata.priority
        }
      })),
      links: this.graph.edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        type: edge.type,
        value: edge.weight
      }))
    };
  }
}

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    output: DEFAULT_OUTPUT,
    metricsOnly: args.includes('--metrics'),
    visualization: args.includes('--viz')
  };

  const outputIndex = args.indexOf('--output');
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    options.output = args[outputIndex + 1];
  }

  return options;
}

// Main execution
async function main() {
  const options = parseArgs();
  const generator = new KnowledgeGraphGenerator();

  await generator.generate();

  if (options.metricsOnly) {
    generator.printMetrics();
  } else {
    generator.printMetrics();

    // Export full graph
    generator.exportToFile(options.output);

    // Also export visualization-friendly format
    if (options.visualization) {
      const vizData = generator.generateVisualizationFormat();
      const vizPath = options.output.replace('.json', '-viz.json');
      fs.writeFileSync(
        path.resolve(VAULT_ROOT, vizPath),
        JSON.stringify(vizData, null, 2),
        'utf8'
      );
      console.log(chalk.green(`✅ Visualization format exported to: ${vizPath}\n`));
    }

    console.log(chalk.gray('Use this file with graph visualization tools like:'));
    console.log(chalk.gray('  - D3.js force-directed graphs'));
    console.log(chalk.gray('  - Obsidian Graph Analysis plugin'));
    console.log(chalk.gray('  - Cytoscape.js'));
    console.log(chalk.gray('  - vis.js network graphs\n'));
  }
}

main();
