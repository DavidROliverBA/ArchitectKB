#!/usr/bin/env node

/**
 * Graph Index Query Tool
 *
 * CLI interface for querying the graph index with support for
 * both structured queries and natural language parsing.
 *
 * Usage:
 *   node scripts/graph-query.js "ADRs with status proposed"
 *   node scripts/graph-query.js --type=Adr --status=proposed
 *   node scripts/graph-query.js --orphans
 *   node scripts/graph-query.js --broken-links
 *   node scripts/graph-query.js --search="kafka integration"
 *   node scripts/graph-query.js --backlinks="Project - MyProject"
 *   node scripts/graph-query.js --json   # Output as JSON
 *
 * Run without arguments to see help.
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const VAULT_ROOT = path.resolve(__dirname, '..');
const GRAPH_DIR = path.join(VAULT_ROOT, '.graph');
const INDEX_PATH = path.join(GRAPH_DIR, 'index.json');
const SEARCH_PATH = path.join(GRAPH_DIR, 'search.json');
const QUALITY_PATH = path.join(GRAPH_DIR, 'quality.json');

/**
 * BM25 Search Index
 *
 * Implements the BM25 (Best Match 25) ranking algorithm for relevance-scored search.
 * BM25 is the industry standard used by Elasticsearch, Lucene, and most search engines.
 *
 * Key advantages over simple keyword matching:
 * - Rare terms are weighted higher (IDF - Inverse Document Frequency)
 * - Term frequency has diminishing returns (saturation)
 * - Document length is normalised
 * - Results are ranked by relevance score
 */
class BM25Index {
  constructor(k1 = 1.5, b = 0.75) {
    this.k1 = k1;  // Term frequency saturation parameter
    this.b = b;    // Length normalisation parameter
    this.documents = [];
    this.avgDocLength = 0;
    this.termDocFreq = new Map();  // term -> number of docs containing term
    this.docTermFreq = [];         // doc index -> Map(term -> frequency)
    this.docMetadata = [];         // doc index -> original metadata
  }

  /**
   * Tokenize text into searchable terms
   */
  tokenize(text) {
    if (!text) return [];
    return String(text)
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1);
  }

  /**
   * Add a document to the index
   */
  addDocument(id, searchableText, metadata = {}) {
    const terms = this.tokenize(searchableText);
    const docIndex = this.documents.length;

    this.documents.push({ id, length: terms.length });
    this.docMetadata.push(metadata);

    const termFreq = new Map();
    const seenTerms = new Set();

    for (const term of terms) {
      termFreq.set(term, (termFreq.get(term) || 0) + 1);
      if (!seenTerms.has(term)) {
        this.termDocFreq.set(term, (this.termDocFreq.get(term) || 0) + 1);
        seenTerms.add(term);
      }
    }

    this.docTermFreq.push(termFreq);

    // Update average document length
    const totalLength = this.documents.reduce((sum, d) => sum + d.length, 0);
    this.avgDocLength = totalLength / this.documents.length;
  }

  /**
   * Search the index and return ranked results
   */
  search(query, limit = 50) {
    const queryTerms = this.tokenize(query);
    if (queryTerms.length === 0) return [];

    const scores = [];
    const N = this.documents.length;

    for (let i = 0; i < N; i++) {
      let score = 0;
      const doc = this.documents[i];
      const termFreq = this.docTermFreq[i];

      for (const term of queryTerms) {
        const tf = termFreq.get(term) || 0;
        if (tf === 0) continue;

        const df = this.termDocFreq.get(term) || 0;
        // IDF with smoothing to avoid negative values
        const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);

        // BM25 term score
        const numerator = tf * (this.k1 + 1);
        const denominator = tf + this.k1 * (1 - this.b + this.b * (doc.length / this.avgDocLength));

        score += idf * (numerator / denominator);
      }

      if (score > 0) {
        scores.push({
          index: i,
          score,
          id: doc.id,
          metadata: this.docMetadata[i]
        });
      }
    }

    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Get index statistics
   */
  getStats() {
    return {
      documentCount: this.documents.length,
      uniqueTerms: this.termDocFreq.size,
      avgDocLength: this.avgDocLength.toFixed(2)
    };
  }
}

class GraphQuery {
  constructor() {
    this.index = null;
    this.searchIndex = null;
    this.qualityIndex = null;
    this.bm25Index = null;
  }

  /**
   * Load index files and build BM25 search index
   */
  loadIndexes() {
    if (!fs.existsSync(INDEX_PATH)) {
      throw new Error(
        `Graph index not found at ${INDEX_PATH}\n` +
        `Run 'npm run graph:build' to generate the index.`
      );
    }

    this.index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));

    if (fs.existsSync(SEARCH_PATH)) {
      this.searchIndex = JSON.parse(fs.readFileSync(SEARCH_PATH, 'utf8'));
      this.buildBM25Index();
    }

    if (fs.existsSync(QUALITY_PATH)) {
      this.qualityIndex = JSON.parse(fs.readFileSync(QUALITY_PATH, 'utf8'));
    }
  }

  /**
   * Build BM25 index from search index data
   */
  buildBM25Index() {
    if (!this.searchIndex) return;

    this.bm25Index = new BM25Index();

    for (const item of this.searchIndex) {
      // Build searchable text from title, keywords, and tags
      const searchableText = [
        item.title || '',
        item.id || '',
        ...(item.keywords || []),
        ...(item.tags || []),
        item.excerpt || ''
      ].join(' ');

      this.bm25Index.addDocument(item.id, searchableText, {
        path: item.path,
        type: item.type,
        title: item.title,
        status: item.status,
        priority: item.priority,
        tags: item.tags
      });
    }
  }

  /**
   * Parse natural language query
   */
  parseNaturalQuery(query) {
    const lowerQuery = query.toLowerCase();
    const result = {};

    // Type patterns
    const typePatterns = [
      { pattern: /\badrs?\b/i, value: 'Adr' },
      { pattern: /\bprojects?\b/i, value: 'Project' },
      { pattern: /\btasks?\b/i, value: 'Task' },
      { pattern: /\bmeetings?\b/i, value: 'Meeting' },
      { pattern: /\bpersons?\b|\bpeople\b/i, value: 'Person' },
      { pattern: /\bpages?\b/i, value: 'Page' },
      { pattern: /\bweblinks?\b/i, value: 'Weblink' },
      { pattern: /\bdaily\s*notes?\b/i, value: 'DailyNote' },
      { pattern: /\bincubator\b/i, value: 'Incubator' }
    ];

    for (const { pattern, value } of typePatterns) {
      if (pattern.test(lowerQuery)) {
        result.type = value;
        break;
      }
    }

    // Status patterns
    const statusPatterns = [
      { pattern: /\bstatus\s+(is\s+)?(\w+)/i, extract: 2 },
      { pattern: /\b(active|proposed|accepted|draft|completed|paused|deprecated|superseded)\b/i, extract: 1 },
      { pattern: /\bwith\s+status\s+(\w+)/i, extract: 1 }
    ];

    for (const { pattern, extract } of statusPatterns) {
      const match = lowerQuery.match(pattern);
      if (match && match[extract]) {
        result.status = match[extract].toLowerCase();
        break;
      }
    }

    // Priority patterns
    const priorityPatterns = [
      { pattern: /\b(high|medium|low)\s+priority/i, extract: 1 },
      { pattern: /\bpriority\s+(is\s+)?(\w+)/i, extract: 2 }
    ];

    for (const { pattern, extract } of priorityPatterns) {
      const match = lowerQuery.match(pattern);
      if (match && match[extract]) {
        result.priority = match[extract].toLowerCase();
        break;
      }
    }

    // Special queries
    if (/\borphan(ed|s)?\b/i.test(lowerQuery)) {
      result.orphans = true;
    }

    if (/\bbroken\s*(links?|wiki-?links?)?\b/i.test(lowerQuery)) {
      result.brokenLinks = true;
    }

    if (/\bstale\b/i.test(lowerQuery)) {
      result.stale = true;
    }

    // Search terms (anything in quotes or after "about", "containing", "mentioning")
    const searchMatch = lowerQuery.match(/["']([^"']+)["']/) ||
                        lowerQuery.match(/\b(?:about|containing|mentioning|related to)\s+(.+)/i);
    if (searchMatch) {
      result.search = searchMatch[1].trim();
    }

    // Backlinks query
    const backlinksMatch = lowerQuery.match(/\bbacklinks?\s+(?:to|for|of)\s+["']?([^"']+)["']?/i);
    if (backlinksMatch) {
      result.backlinks = backlinksMatch[1].trim();
    }

    return result;
  }

  /**
   * Execute query with filters
   */
  executeQuery(filters) {
    let results = [...this.index.nodes];

    // Filter by type
    if (filters.type) {
      results = results.filter(n => n.type.toLowerCase() === filters.type.toLowerCase());
    }

    // Filter by status
    if (filters.status) {
      results = results.filter(n =>
        n.frontmatter.status &&
        n.frontmatter.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Filter by priority
    if (filters.priority) {
      results = results.filter(n =>
        n.frontmatter.priority &&
        n.frontmatter.priority.toLowerCase() === filters.priority.toLowerCase()
      );
    }

    // Search filter using BM25 ranking
    if (filters.search && this.bm25Index) {
      const bm25Results = this.bm25Index.search(filters.search, 100);

      // Create a map of id -> score for ranking
      const scoreMap = new Map(bm25Results.map(r => [r.id, r.score]));
      const searchIds = new Set(bm25Results.map(r => r.id));

      // Filter results and attach scores
      results = results
        .filter(n => searchIds.has(n.id))
        .map(n => ({
          ...n,
          _relevanceScore: scoreMap.get(n.id) || 0
        }))
        .sort((a, b) => b._relevanceScore - a._relevanceScore);
    }

    // Backlinks query
    if (filters.backlinks) {
      const targetName = filters.backlinks;
      const backlinkSources = this.index.backlinks[targetName] || [];
      results = results.filter(n => backlinkSources.includes(n.id));
    }

    // Orphans query
    if (filters.orphans) {
      return {
        type: 'orphans',
        data: this.index.orphanedNodes,
        count: this.index.orphanedNodes.length
      };
    }

    // Broken links query
    if (filters.brokenLinks) {
      return {
        type: 'brokenLinks',
        data: this.index.brokenLinks,
        count: this.index.brokenLinks.length
      };
    }

    // Stale notes query
    if (filters.stale && this.qualityIndex) {
      return {
        type: 'stale',
        data: this.qualityIndex.staleNotes,
        count: this.qualityIndex.staleNotes.length
      };
    }

    // Tag violations query
    if (filters.tagViolations) {
      return {
        type: 'tagViolations',
        data: this.index.tagViolations || [],
        count: (this.index.tagViolations || []).length
      };
    }

    // Filter by tag prefix (e.g., "technology/")
    if (filters.tagPrefix) {
      results = results.filter(n => {
        const tags = n.frontmatter.tags || [];
        return tags.some(tag =>
          String(tag).toLowerCase().startsWith(filters.tagPrefix.toLowerCase())
        );
      });
    }

    // Filter by exact tag
    if (filters.tag) {
      results = results.filter(n => {
        const tags = n.frontmatter.tags || [];
        return tags.some(tag =>
          String(tag).toLowerCase() === filters.tag.toLowerCase()
        );
      });
    }

    return {
      type: 'nodes',
      data: results,
      count: results.length
    };
  }

  /**
   * Format results as table
   */
  formatTable(queryResult) {
    const { type, data, count } = queryResult;
    const lines = [];

    if (count === 0) {
      return chalk.yellow('No results found.');
    }

    lines.push(chalk.blue.bold(`\nFound ${count} result(s)\n`));

    if (type === 'orphans') {
      lines.push(chalk.gray('Type'.padEnd(15) + 'Title'.padEnd(50) + 'Path'));
      lines.push(chalk.gray('─'.repeat(100)));

      for (const item of data.slice(0, 50)) {
        lines.push(
          chalk.cyan(item.type.padEnd(15)) +
          chalk.white(item.title.substring(0, 48).padEnd(50)) +
          chalk.gray(item.path)
        );
      }
    } else if (type === 'brokenLinks') {
      lines.push(chalk.gray('Source'.padEnd(40) + 'Broken Link'));
      lines.push(chalk.gray('─'.repeat(80)));

      for (const item of data.slice(0, 50)) {
        lines.push(
          chalk.white(item.source.substring(0, 38).padEnd(40)) +
          chalk.red(item.target)
        );
      }
    } else if (type === 'stale') {
      lines.push(chalk.gray('Type'.padEnd(15) + 'Title'.padEnd(45) + 'Modified'));
      lines.push(chalk.gray('─'.repeat(80)));

      for (const item of data.slice(0, 50)) {
        lines.push(
          chalk.cyan(item.type.padEnd(15)) +
          chalk.white((item.title || item.id).substring(0, 43).padEnd(45)) +
          chalk.yellow(item.modified)
        );
      }
    } else if (type === 'tagViolations') {
      lines.push(chalk.gray('Note'.padEnd(40) + 'Tag'.padEnd(25) + 'Issue'));
      lines.push(chalk.gray('─'.repeat(100)));

      // Group by issue type
      const byIssue = {};
      for (const violation of data) {
        if (!byIssue[violation.issue]) {
          byIssue[violation.issue] = [];
        }
        byIssue[violation.issue].push(violation);
      }

      // Show summary by type
      lines.push(chalk.yellow('\nViolations by Type:'));
      for (const [issue, violations] of Object.entries(byIssue)) {
        lines.push(chalk.gray(`  ${issue}: ${violations.length}`));
      }
      lines.push('');

      // Show first 50 violations
      for (const violation of data.slice(0, 50)) {
        const issueColor = violation.issue === 'orphan-flat-tag' ? chalk.yellow :
                          violation.issue === 'case-violation' ? chalk.cyan :
                          violation.issue === 'inline-prefix' ? chalk.red :
                          chalk.magenta;

        lines.push(
          chalk.white(violation.nodeId.substring(0, 38).padEnd(40)) +
          chalk.gray(violation.tag.substring(0, 23).padEnd(25)) +
          issueColor(violation.issue)
        );
      }
    } else {
      // Regular node results
      const hasScores = data.some(n => n._relevanceScore !== undefined);

      if (hasScores) {
        // Show relevance scores for search results
        lines.push(chalk.gray('Score'.padEnd(8) + 'Type'.padEnd(15) + 'Title'));
        lines.push(chalk.gray('─'.repeat(100)));

        for (const node of data.slice(0, 50)) {
          const score = node._relevanceScore?.toFixed(2) || '0.00';
          const title = node.frontmatter.title || node.id;

          lines.push(
            chalk.yellow(score.padEnd(8)) +
            chalk.cyan(node.type.padEnd(15)) +
            chalk.white(title.substring(0, 75))
          );
        }
      } else {
        // Standard output without scores
        lines.push(chalk.gray('Type'.padEnd(15) + 'Status'.padEnd(12) + 'Priority'.padEnd(10) + 'Title'));
        lines.push(chalk.gray('─'.repeat(100)));

        for (const node of data.slice(0, 50)) {
          const status = node.frontmatter.status || '-';
          const priority = node.frontmatter.priority || '-';
          const title = node.frontmatter.title || node.id;

          lines.push(
            chalk.cyan(node.type.padEnd(15)) +
            this.formatStatus(status).padEnd(12) +
            this.formatPriority(priority).padEnd(10) +
            chalk.white(title.substring(0, 60))
          );
        }
      }
    }

    if (count > 50) {
      lines.push(chalk.gray(`\n... and ${count - 50} more results`));
    }

    return lines.join('\n');
  }

  /**
   * Format status with colour
   */
  formatStatus(status) {
    const colours = {
      active: chalk.green,
      proposed: chalk.yellow,
      accepted: chalk.green,
      draft: chalk.gray,
      completed: chalk.blue,
      paused: chalk.yellow,
      deprecated: chalk.red,
      superseded: chalk.gray
    };

    const colourFn = colours[status.toLowerCase()] || chalk.white;
    return colourFn(status);
  }

  /**
   * Format priority with colour
   */
  formatPriority(priority) {
    const colours = {
      high: chalk.red,
      medium: chalk.yellow,
      low: chalk.gray
    };

    const colourFn = colours[priority.toLowerCase()] || chalk.white;
    return colourFn(priority);
  }

  /**
   * Format results as JSON
   */
  formatJson(queryResult) {
    // For search results with scores, simplify the output
    if (queryResult.type === 'nodes' && queryResult.data.some(n => n._relevanceScore !== undefined)) {
      const simplified = {
        type: 'search',
        count: queryResult.count,
        results: queryResult.data.map(n => ({
          id: n.id,
          score: n._relevanceScore?.toFixed(3) || '0.000',
          type: n.type,
          title: n.frontmatter?.title || n.id,
          path: n.path,
          status: n.frontmatter?.status || null,
          tags: n.frontmatter?.tags || []
        }))
      };
      return JSON.stringify(simplified, null, 2);
    }
    return JSON.stringify(queryResult, null, 2);
  }

  /**
   * Show stats summary
   */
  showStats() {
    const stats = this.index.metadata.stats;
    const lines = [];

    lines.push(chalk.blue.bold('\n📊 Graph Index Statistics\n'));

    lines.push(chalk.gray(`Total Nodes:    ${chalk.white(stats.totalNodes)}`));
    lines.push(chalk.gray(`Total Edges:    ${chalk.white(stats.totalEdges)}`));
    lines.push(chalk.gray(`Total Backlinks: ${chalk.white(stats.totalBacklinks)}`));
    lines.push(chalk.gray(`Orphaned Notes: ${chalk.yellow(stats.orphanedCount)}`));
    lines.push(chalk.gray(`Broken Links:   ${chalk.yellow(stats.brokenLinksCount)}`));
    lines.push('');

    lines.push(chalk.blue('Health Score:'));
    const score = stats.healthScore;
    const scoreColour = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
    lines.push(scoreColour(`  ${score}/100`));
    lines.push('');

    lines.push(chalk.blue('Type Distribution:'));
    const sortedTypes = Object.entries(stats.typeDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    for (const [type, count] of sortedTypes) {
      lines.push(chalk.gray(`  ${type.padEnd(15)} ${chalk.cyan(count)}`));
    }
    lines.push('');

    lines.push(chalk.blue('Freshness:'));
    lines.push(chalk.gray(`  Current (30 days):  ${chalk.green(stats.freshness.current)}`));
    lines.push(chalk.gray(`  Recent (6 months):  ${chalk.yellow(stats.freshness.recent)}`));
    lines.push(chalk.gray(`  Stale (>6 months):  ${chalk.red(stats.freshness.stale)}`));
    lines.push('');

    lines.push(chalk.gray(`Generated: ${this.index.metadata.generated}`));

    return lines.join('\n');
  }
}

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    type: null,
    status: null,
    priority: null,
    search: null,
    backlinks: null,
    tagPrefix: null,
    tag: null,
    tagViolations: false,
    orphans: false,
    brokenLinks: false,
    stale: false,
    json: false,
    stats: false,
    help: false,
    naturalQuery: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg === '--orphans') {
      options.orphans = true;
    } else if (arg === '--broken-links') {
      options.brokenLinks = true;
    } else if (arg === '--stale') {
      options.stale = true;
    } else if (arg === '--stats') {
      options.stats = true;
    } else if (arg === '--tag-violations') {
      options.tagViolations = true;
    } else if (arg.startsWith('--type=')) {
      options.type = arg.split('=')[1];
    } else if (arg.startsWith('--status=')) {
      options.status = arg.split('=')[1];
    } else if (arg.startsWith('--priority=')) {
      options.priority = arg.split('=')[1];
    } else if (arg.startsWith('--search=')) {
      options.search = arg.split('=')[1];
    } else if (arg.startsWith('--backlinks=')) {
      options.backlinks = arg.split('=')[1];
    } else if (arg.startsWith('--tag-prefix=')) {
      options.tagPrefix = arg.split('=')[1];
    } else if (arg.startsWith('--tag=')) {
      options.tag = arg.split('=')[1];
    } else if (!arg.startsWith('-')) {
      // Natural language query
      options.naturalQuery = arg;
    }
  }

  return options;
}

// Show help
function showHelp() {
  console.log(`
${chalk.blue.bold('Graph Index Query Tool')}

Query the vault's graph index with structured or natural language queries.

${chalk.yellow('Usage:')}
  node scripts/graph-query.js [query] [options]

${chalk.yellow('Structured Options:')}
  --type=<type>       Filter by note type (Adr, Project, Task, Meeting, etc.)
  --status=<status>   Filter by status (active, proposed, accepted, draft, etc.)
  --priority=<pri>    Filter by priority (high, medium, low)
  --search=<term>     Search with BM25 relevance ranking (results sorted by score)
  --backlinks=<note>  Find notes linking to specified note

${chalk.yellow('Tag Filtering:')}
  --tag-prefix=<pre>  Filter by tag hierarchy (e.g., "technology/", "domain/")
  --tag=<tag>         Filter by exact tag match (e.g., "activity/architecture")

${chalk.yellow('Special Queries:')}
  --orphans           List orphaned notes (no backlinks)
  --broken-links      List broken wiki-links
  --stale             List stale notes (>6 months old)
  --tag-violations    List tag taxonomy violations
  --stats             Show index statistics

${chalk.yellow('Output Options:')}
  --json              Output results as JSON
  --help, -h          Show this help message

${chalk.yellow('Natural Language Examples:')}
  "ADRs with status proposed"
  "high priority tasks"
  "active projects"
  "orphaned notes"
  "broken links"
  "meetings about kafka"
  "backlinks to Project - MyProject"

${chalk.yellow('Structured Examples:')}
  --type=Adr --status=proposed
  --type=Task --priority=high
  --search="kafka integration"
  --backlinks="Project - MyProject"
  --tag-prefix="technology/"
  --tag="activity/architecture" --type=Adr
  --tag-violations
  --orphans --json

${chalk.yellow('npm Script:')}
  npm run graph:query -- "your query here"
  npm run graph:query -- --type=Adr --status=proposed
  npm run graph:query -- --tag-prefix="technology/" --json
`);
}

// Main execution
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  // If no query provided, show help
  if (!options.naturalQuery &&
      !options.type &&
      !options.status &&
      !options.priority &&
      !options.search &&
      !options.backlinks &&
      !options.tagPrefix &&
      !options.tag &&
      !options.orphans &&
      !options.brokenLinks &&
      !options.stale &&
      !options.tagViolations &&
      !options.stats) {
    showHelp();
    process.exit(0);
  }

  const query = new GraphQuery();

  try {
    query.loadIndexes();
  } catch (error) {
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Show stats if requested
  if (options.stats) {
    console.log(query.showStats());
    process.exit(0);
  }

  // Build filters from options
  let filters = {
    type: options.type,
    status: options.status,
    priority: options.priority,
    search: options.search,
    backlinks: options.backlinks,
    tagPrefix: options.tagPrefix,
    tag: options.tag,
    orphans: options.orphans,
    brokenLinks: options.brokenLinks,
    stale: options.stale,
    tagViolations: options.tagViolations
  };

  // Parse natural language query if provided
  if (options.naturalQuery) {
    const parsedFilters = query.parseNaturalQuery(options.naturalQuery);
    // Merge with explicit options (explicit options take precedence)
    filters = { ...parsedFilters, ...Object.fromEntries(
      Object.entries(filters).filter(([k, v]) => v !== null && v !== false)
    )};
  }

  // Execute query
  const results = query.executeQuery(filters);

  // Format and output
  if (options.json) {
    console.log(query.formatJson(results));
  } else {
    console.log(query.formatTable(results));
  }
}

main().catch(error => {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
});
