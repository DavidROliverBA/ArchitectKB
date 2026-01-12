#!/usr/bin/env node

/**
 * Enhanced Knowledge Graph Generator
 *
 * Generates a comprehensive graph index for the Obsidian vault with multiple
 * output formats optimised for querying, searching, and quality analysis.
 *
 * Usage:
 *   node scripts/generate-graph-enhanced.js           # Full rebuild
 *   node scripts/generate-graph-enhanced.js --quiet   # Minimal output
 *   node scripts/generate-graph-enhanced.js --help    # Show help
 *
 * Output:
 *   .graph/index.json      - Full graph with nodes, edges, backlinks, issues
 *   .graph/search.json     - Keyword search index
 *   .graph/quality.json    - Health metrics and quality indicators
 *   .graph/types/*.json    - Per-type indexes (adr.json, project.json, etc.)
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
const GRAPH_DIR = path.join(VAULT_ROOT, '.graph');
const TYPES_DIR = path.join(GRAPH_DIR, 'types');
const EXCLUDED_DIRS = ['.git', '.obsidian', 'node_modules', '.smart-env', 'scripts', 'screenshots', '.graph'];
const STALE_DAYS = 180;

class EnhancedGraphGenerator {
  constructor(options = {}) {
    this.options = {
      quiet: false,
      ...options
    };

    this.nodes = [];
    this.edges = [];
    this.backlinks = new Map(); // target -> [sources]
    this.noteIndex = new Map(); // filename -> node
    this.typeClusters = {};
    this.orphanedNodes = [];
    this.brokenLinks = [];
    this.stats = {};
  }

  /**
   * Main generation entry point
   */
  async generate() {
    const startTime = Date.now();

    if (!this.options.quiet) {
      console.log(chalk.blue.bold('\n📊 Enhanced Graph Index Generation\n'));
      console.log(chalk.gray(`Vault: ${VAULT_ROOT}`));
      console.log(chalk.gray(`Output: ${GRAPH_DIR}\n`));
    }

    // Ensure directories exist
    this.ensureDirectories();

    // Find all markdown files
    const files = await this.findMarkdownFiles();
    if (!this.options.quiet) {
      console.log(chalk.gray(`Found ${files.length} markdown files\n`));
    }

    // Build nodes from files
    await this.buildNodes(files);

    // Build edges and backlinks
    this.buildEdgesAndBacklinks();

    // Build type clusters
    this.buildTypeClusters();

    // Identify issues (orphans, broken links)
    this.identifyIssues();

    // Calculate statistics
    this.calculateStats();

    // Write all index files
    await this.writeIndexes();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    if (!this.options.quiet) {
      this.printSummary(duration);
    }

    return {
      nodes: this.nodes.length,
      edges: this.edges.length,
      orphans: this.orphanedNodes.length,
      brokenLinks: this.brokenLinks.length,
      duration
    };
  }

  /**
   * Ensure output directories exist
   */
  ensureDirectories() {
    if (!fs.existsSync(GRAPH_DIR)) {
      fs.mkdirSync(GRAPH_DIR, { recursive: true });
    }
    if (!fs.existsSync(TYPES_DIR)) {
      fs.mkdirSync(TYPES_DIR, { recursive: true });
    }

    // Add .gitignore to .graph directory
    const gitignorePath = path.join(GRAPH_DIR, '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
      fs.writeFileSync(gitignorePath, '# Generated files - do not commit\n*\n!.gitignore\n');
    }
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
   * Build nodes from all files
   */
  async buildNodes(files) {
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const { data: frontmatter, content: body } = matter(content);
        const stats = fs.statSync(file);

        const filename = path.basename(file, '.md');
        const relativePath = path.relative(VAULT_ROOT, file);

        // Extract links from content and frontmatter
        const links = this.extractLinks(body, frontmatter);

        // Build node
        const node = {
          id: filename,
          path: relativePath,
          type: frontmatter.type || 'Unknown',
          frontmatter: {
            title: frontmatter.title || filename,
            status: frontmatter.status || null,
            priority: frontmatter.priority || null,
            created: frontmatter.created || null,
            modified: frontmatter.modified || null,
            tags: frontmatter.tags || [],
            project: frontmatter.project || null,
            confidence: frontmatter.confidence || null,
            freshness: frontmatter.freshness || null,
            relatedTo: frontmatter.relatedTo || [],
            supersedes: frontmatter.supersedes || [],
            dependsOn: frontmatter.dependsOn || []
          },
          relationships: {
            wikilinks: links.wikilinks,
            mentionedPeople: links.people,
            projects: links.projects
          },
          textStats: {
            wordCount: this.countWords(body),
            lineCount: body.split('\n').length
          },
          meta: {
            fileModified: stats.mtime.toISOString(),
            fileSize: stats.size
          }
        };

        this.nodes.push(node);
        this.noteIndex.set(filename, node);

      } catch (error) {
        if (!this.options.quiet) {
          console.error(chalk.red(`Error processing ${file}: ${error.message}`));
        }
      }
    }
  }

  /**
   * Extract wiki-links from content and frontmatter
   */
  extractLinks(content, frontmatter) {
    const linkRegex = /\[\[([^\]|]+)(\|[^\]]+)?\]\]/g;
    const wikilinks = new Set();
    const people = new Set();
    const projects = new Set();

    // Extract from body
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const cleanLink = match[1].split('#')[0].split('^')[0].trim();
      wikilinks.add(cleanLink);

      // Categorise links
      if (cleanLink.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/) || this.isPerson(cleanLink)) {
        people.add(cleanLink);
      }
      if (cleanLink.startsWith('Project -') || cleanLink.startsWith('Project -')) {
        projects.add(cleanLink);
      }
    }

    // Extract from frontmatter
    const frontmatterStr = JSON.stringify(frontmatter);
    while ((match = linkRegex.exec(frontmatterStr)) !== null) {
      const cleanLink = match[1].split('#')[0].split('^')[0].trim();
      wikilinks.add(cleanLink);
    }

    // Check specific frontmatter fields
    if (frontmatter.project) {
      const projectMatch = frontmatter.project.match(/\[\[([^\]]+)\]\]/);
      if (projectMatch) {
        projects.add(projectMatch[1]);
      }
    }

    if (frontmatter.attendees) {
      for (const attendee of frontmatter.attendees) {
        const personMatch = attendee.match(/\[\[([^\]]+)\]\]/);
        if (personMatch) {
          people.add(personMatch[1]);
        }
      }
    }

    return {
      wikilinks: Array.from(wikilinks),
      people: Array.from(people),
      projects: Array.from(projects)
    };
  }

  /**
   * Check if a link might be a person (heuristic)
   */
  isPerson(linkText) {
    // Person notes are typically just names without prefixes
    const hasNoPrefix = !linkText.includes(' - ') || linkText.startsWith('Dr ') || linkText.startsWith('Prof ');
    const looksLikeName = /^[A-Z][a-z]+(\s+[A-Z][a-z]+)+$/.test(linkText);
    return hasNoPrefix && looksLikeName;
  }

  /**
   * Count words in content
   */
  countWords(content) {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Build edges and backlink index
   */
  buildEdgesAndBacklinks() {
    for (const node of this.nodes) {
      for (const link of node.relationships.wikilinks) {
        const targetNode = this.noteIndex.get(link);
        const exists = targetNode !== undefined;

        // Create edge
        const edge = {
          source: node.id,
          target: link,
          type: this.determineEdgeType(node, targetNode),
          exists
        };
        this.edges.push(edge);

        // Build backlink index
        if (!this.backlinks.has(link)) {
          this.backlinks.set(link, []);
        }
        this.backlinks.get(link).push(node.id);
      }
    }
  }

  /**
   * Determine edge type based on node types
   */
  determineEdgeType(sourceNode, targetNode) {
    if (!targetNode) return 'broken';

    const sourceType = sourceNode.type;
    const targetType = targetNode.type;

    if (sourceType === 'Task' && targetType === 'Project') return 'belongs-to';
    if (sourceType === 'Meeting' && targetType === 'Project') return 'discusses';
    if (sourceType === 'Adr' && targetType === 'Project') return 'impacts';
    if (sourceType === 'Adr' && targetType === 'Adr') return 'relates-to';
    if ((sourceType === 'Meeting' || sourceType === 'Task') && targetType === 'Person') return 'involves';
    if (sourceType === 'Person' && targetType === 'Organisation') return 'works-for';
    if (targetType === 'Weblink') return 'references';

    return 'links-to';
  }

  /**
   * Build type clusters with status/priority breakdowns
   */
  buildTypeClusters() {
    for (const node of this.nodes) {
      const type = node.type;

      if (!this.typeClusters[type]) {
        this.typeClusters[type] = {
          count: 0,
          nodes: [],
          byStatus: {},
          byPriority: {}
        };
      }

      const cluster = this.typeClusters[type];
      cluster.count++;
      cluster.nodes.push(node.id);

      // Track status distribution
      if (node.frontmatter.status) {
        const status = node.frontmatter.status;
        cluster.byStatus[status] = (cluster.byStatus[status] || 0) + 1;
      }

      // Track priority distribution
      if (node.frontmatter.priority) {
        const priority = node.frontmatter.priority;
        cluster.byPriority[priority] = (cluster.byPriority[priority] || 0) + 1;
      }
    }
  }

  /**
   * Identify orphans and broken links
   */
  identifyIssues() {
    const now = new Date();
    const staleDate = new Date(now.getTime() - (STALE_DAYS * 24 * 60 * 60 * 1000));

    for (const node of this.nodes) {
      // Check for orphaned nodes (no backlinks)
      const backlinksToNode = this.backlinks.get(node.id) || [];

      // Exclude special notes from orphan check
      const isSpecial = this.isSpecialNote(node);

      if (backlinksToNode.length === 0 && !isSpecial) {
        this.orphanedNodes.push({
          id: node.id,
          path: node.path,
          type: node.type,
          title: node.frontmatter.title,
          created: node.frontmatter.created,
          modified: node.meta.fileModified.split('T')[0]
        });
      }
    }

    // Collect broken links
    for (const edge of this.edges) {
      if (!edge.exists) {
        this.brokenLinks.push({
          source: edge.source,
          target: edge.target,
          sourcePath: this.noteIndex.get(edge.source)?.path || 'unknown'
        });
      }
    }
  }

  /**
   * Check if note should be excluded from orphan checks
   */
  isSpecialNote(node) {
    const id = node.id;
    const type = node.type;
    const path = node.path;

    return (
      id.startsWith('MOC -') ||
      id.startsWith('Dashboard -') ||
      id === 'README' ||
      id === 'CLAUDE' ||
      type === 'Template' ||
      type === 'DailyNote' ||
      path.startsWith('+Templates/')
    );
  }

  /**
   * Calculate statistics
   */
  calculateStats() {
    const now = new Date();
    const staleDate = new Date(now.getTime() - (STALE_DAYS * 24 * 60 * 60 * 1000));
    const recentDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    // Basic counts
    this.stats = {
      totalNodes: this.nodes.length,
      totalEdges: this.edges.length,
      totalBacklinks: Array.from(this.backlinks.values()).reduce((sum, arr) => sum + arr.length, 0),
      orphanedCount: this.orphanedNodes.length,
      brokenLinksCount: this.brokenLinks.length,
      typeDistribution: {},
      freshness: {
        current: 0,
        recent: 0,
        stale: 0
      },
      qualityIndicators: {
        withTags: 0,
        withStatus: 0,
        withPriority: 0,
        adrWithQualityFields: 0,
        totalADRs: 0
      },
      averages: {
        linksPerNote: 0,
        wordCount: 0,
        backlinksPerNote: 0
      }
    };

    let totalLinks = 0;
    let totalWords = 0;

    for (const node of this.nodes) {
      // Type distribution
      const type = node.type;
      this.stats.typeDistribution[type] = (this.stats.typeDistribution[type] || 0) + 1;

      // Freshness
      const modified = new Date(node.meta.fileModified);
      if (modified > recentDate) {
        this.stats.freshness.current++;
      } else if (modified > staleDate) {
        this.stats.freshness.recent++;
      } else {
        this.stats.freshness.stale++;
      }

      // Quality indicators
      if (node.frontmatter.tags && node.frontmatter.tags.length > 0) {
        this.stats.qualityIndicators.withTags++;
      }
      if (node.frontmatter.status) {
        this.stats.qualityIndicators.withStatus++;
      }
      if (node.frontmatter.priority) {
        this.stats.qualityIndicators.withPriority++;
      }

      // ADR quality
      if (type === 'Adr') {
        this.stats.qualityIndicators.totalADRs++;
        if (node.frontmatter.confidence && node.frontmatter.freshness) {
          this.stats.qualityIndicators.adrWithQualityFields++;
        }
      }

      // Totals for averages
      totalLinks += node.relationships.wikilinks.length;
      totalWords += node.textStats.wordCount;
    }

    // Calculate averages
    if (this.stats.totalNodes > 0) {
      this.stats.averages.linksPerNote = (totalLinks / this.stats.totalNodes).toFixed(2);
      this.stats.averages.wordCount = Math.round(totalWords / this.stats.totalNodes);
      this.stats.averages.backlinksPerNote = (this.stats.totalBacklinks / this.stats.totalNodes).toFixed(2);
    }

    // Calculate health score (0-100)
    this.stats.healthScore = this.calculateHealthScore();
  }

  /**
   * Calculate overall health score
   */
  calculateHealthScore() {
    let score = 0;

    // Connectivity (25 points)
    const orphanRate = this.orphanedNodes.length / Math.max(this.stats.totalNodes, 1);
    score += Math.round((1 - orphanRate) * 15);
    score += Math.min(parseFloat(this.stats.averages.linksPerNote) / 5, 1) * 10;

    // Freshness (25 points)
    const staleRate = this.stats.freshness.stale / Math.max(this.stats.totalNodes, 1);
    const currentRate = this.stats.freshness.current / Math.max(this.stats.totalNodes, 1);
    score += Math.round((1 - staleRate) * 15);
    score += Math.round(currentRate * 10);

    // Quality (25 points)
    const tagsRate = this.stats.qualityIndicators.withTags / Math.max(this.stats.totalNodes, 1);
    const brokenRate = this.brokenLinks.length / Math.max(this.stats.totalEdges, 1);
    score += Math.round(tagsRate * 15);
    score += Math.round((1 - brokenRate) * 10);

    // Completeness (25 points)
    const statusRate = this.stats.qualityIndicators.withStatus / Math.max(this.stats.totalNodes, 1);
    const adrQualityRate = this.stats.qualityIndicators.totalADRs > 0
      ? this.stats.qualityIndicators.adrWithQualityFields / this.stats.qualityIndicators.totalADRs
      : 1;
    score += Math.round(statusRate * 15);
    score += Math.round(adrQualityRate * 10);

    return Math.min(Math.round(score), 100);
  }

  /**
   * Build search index
   */
  buildSearchIndex() {
    const searchIndex = [];

    for (const node of this.nodes) {
      // Get title as string
      const title = String(node.frontmatter.title || node.id);

      // Extract keywords from title
      const titleWords = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2);

      // Combine with tags (ensure tags are strings)
      const tags = (node.frontmatter.tags || [])
        .map(t => String(t).toLowerCase());

      // Build excerpt (first 200 chars of content after frontmatter would need body)
      // For now, use title and tags
      const keywords = [...new Set([...titleWords, ...tags])];

      searchIndex.push({
        id: node.id,
        path: node.path,
        type: node.type,
        title: title,
        keywords,
        tags: node.frontmatter.tags || [],
        status: node.frontmatter.status,
        priority: node.frontmatter.priority,
        excerpt: title // Simplified excerpt
      });
    }

    return searchIndex;
  }

  /**
   * Write all index files
   */
  async writeIndexes() {
    // Main index
    const mainIndex = {
      metadata: {
        generated: new Date().toISOString(),
        vault: path.basename(VAULT_ROOT),
        version: '2.0',
        stats: this.stats
      },
      nodes: this.nodes,
      edges: this.edges,
      typeClusters: this.typeClusters,
      backlinks: Object.fromEntries(this.backlinks),
      orphanedNodes: this.orphanedNodes,
      brokenLinks: this.brokenLinks
    };

    fs.writeFileSync(
      path.join(GRAPH_DIR, 'index.json'),
      JSON.stringify(mainIndex, null, 2),
      'utf8'
    );

    // Search index
    const searchIndex = this.buildSearchIndex();
    fs.writeFileSync(
      path.join(GRAPH_DIR, 'search.json'),
      JSON.stringify(searchIndex, null, 2),
      'utf8'
    );

    // Quality index
    const qualityIndex = {
      generated: new Date().toISOString(),
      healthScore: this.stats.healthScore,
      orphanedNodes: this.orphanedNodes,
      brokenLinks: this.brokenLinks,
      staleNotes: this.nodes
        .filter(n => {
          const modified = new Date(n.meta.fileModified);
          const staleDate = new Date(Date.now() - (STALE_DAYS * 24 * 60 * 60 * 1000));
          return modified < staleDate && !this.isSpecialNote(n);
        })
        .map(n => ({
          id: n.id,
          path: n.path,
          type: n.type,
          modified: n.meta.fileModified.split('T')[0]
        })),
      missingFields: this.nodes
        .filter(n => !n.frontmatter.status && ['Task', 'Project', 'Adr'].includes(n.type))
        .map(n => ({
          id: n.id,
          type: n.type,
          missing: ['status']
        })),
      qualityIndicators: this.stats.qualityIndicators,
      freshness: this.stats.freshness
    };

    fs.writeFileSync(
      path.join(GRAPH_DIR, 'quality.json'),
      JSON.stringify(qualityIndex, null, 2),
      'utf8'
    );

    // Per-type indexes
    for (const [type, cluster] of Object.entries(this.typeClusters)) {
      const typeNodes = this.nodes.filter(n => n.type === type);
      const typeIndex = {
        type,
        count: cluster.count,
        byStatus: cluster.byStatus,
        byPriority: cluster.byPriority,
        nodes: typeNodes.map(n => ({
          id: n.id,
          path: n.path,
          title: n.frontmatter.title,
          status: n.frontmatter.status,
          priority: n.frontmatter.priority,
          created: n.frontmatter.created,
          modified: n.meta.fileModified.split('T')[0],
          tags: n.frontmatter.tags,
          backlinks: this.backlinks.get(n.id)?.length || 0
        }))
      };

      const filename = type.toLowerCase().replace(/\s+/g, '-') + '.json';
      fs.writeFileSync(
        path.join(TYPES_DIR, filename),
        JSON.stringify(typeIndex, null, 2),
        'utf8'
      );
    }
  }

  /**
   * Print summary to console
   */
  printSummary(duration) {
    console.log(chalk.green.bold('\n✅ Graph Index Generated\n'));

    console.log(chalk.blue('Statistics:'));
    console.log(chalk.gray(`  Nodes:       ${chalk.white(this.stats.totalNodes)}`));
    console.log(chalk.gray(`  Edges:       ${chalk.white(this.stats.totalEdges)}`));
    console.log(chalk.gray(`  Backlinks:   ${chalk.white(this.stats.totalBacklinks)}`));
    console.log(chalk.gray(`  Types:       ${chalk.white(Object.keys(this.typeClusters).length)}`));
    console.log('');

    // Type distribution (top 10)
    console.log(chalk.blue('Types:'));
    const sortedTypes = Object.entries(this.stats.typeDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    for (const [type, count] of sortedTypes) {
      const bar = '█'.repeat(Math.ceil(count / 3));
      console.log(chalk.gray(`  ${type.padEnd(15)} ${chalk.cyan(count.toString().padStart(4))} ${bar}`));
    }
    console.log('');

    // Issues
    if (this.orphanedNodes.length > 0 || this.brokenLinks.length > 0) {
      console.log(chalk.yellow('Issues:'));
      if (this.orphanedNodes.length > 0) {
        console.log(chalk.yellow(`  Orphaned:    ${this.orphanedNodes.length} notes`));
      }
      if (this.brokenLinks.length > 0) {
        console.log(chalk.yellow(`  Broken:      ${this.brokenLinks.length} links`));
      }
      console.log('');
    }

    // Health score
    const score = this.stats.healthScore;
    const scoreColor = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
    console.log(chalk.blue('Health Score:'));
    console.log(scoreColor(`  ${score}/100`));
    console.log('');

    // Output files
    console.log(chalk.blue('Output Files:'));
    console.log(chalk.gray(`  ${GRAPH_DIR}/index.json`));
    console.log(chalk.gray(`  ${GRAPH_DIR}/search.json`));
    console.log(chalk.gray(`  ${GRAPH_DIR}/quality.json`));
    console.log(chalk.gray(`  ${GRAPH_DIR}/types/*.json`));
    console.log('');

    console.log(chalk.gray(`Duration: ${duration}s`));
  }
}

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    quiet: args.includes('--quiet') || args.includes('-q'),
    help: args.includes('--help') || args.includes('-h')
  };
}

// Show help
function showHelp() {
  console.log(`
${chalk.blue.bold('Enhanced Graph Index Generator')}

Generate comprehensive graph indexes for your Obsidian vault.

${chalk.yellow('Usage:')}
  node scripts/generate-graph-enhanced.js [options]

${chalk.yellow('Options:')}
  --quiet, -q    Minimal output (only errors)
  --help, -h     Show this help message

${chalk.yellow('Output Files:')}
  .graph/index.json      Full graph with nodes, edges, backlinks
  .graph/search.json     Keyword search index
  .graph/quality.json    Health metrics and issues
  .graph/types/*.json    Per-type indexes

${chalk.yellow('npm Scripts:')}
  npm run graph:build    Run this generator
  npm run graph:watch    Watch for changes and rebuild
  npm run graph:query    Query the index
`);
}

// Main execution
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  const generator = new EnhancedGraphGenerator(options);
  await generator.generate();
}

main().catch(error => {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
});
