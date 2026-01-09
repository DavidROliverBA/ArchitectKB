#!/usr/bin/env node

/**
 * Obsidian Vault Health Check Script
 *
 * Analyzes vault health metrics including note counts, orphaned notes,
 * stale content, link statistics, and overall vault quality.
 *
 * Usage:
 *   node scripts/health-check.js                 # Human-readable output
 *   node scripts/health-check.js --format json   # JSON output
 *   node scripts/health-check.js --format markdown  # Markdown report
 *
 * Output:
 *   - Note counts by type
 *   - Orphaned notes (no backlinks)
 *   - Stale content (not modified recently)
 *   - Link statistics
 *   - Quality indicators
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
const STALE_DAYS = 180; // 6 months

class VaultHealthCheck {
  constructor() {
    this.metrics = {
      totalNotes: 0,
      notesByType: {},
      orphanedNotes: [],
      staleNotes: [],
      recentNotes: [],
      linkStats: {
        totalLinks: 0,
        totalBacklinks: 0,
        brokenLinks: 0,
        averageLinksPerNote: 0
      },
      qualityMetrics: {
        notesWithTags: 0,
        notesWithDescription: 0,
        notesWithStatus: 0,
        adrWithQualityIndicators: 0,
        totalADRs: 0
      },
      statusBreakdown: {
        Task: {},
        Project: {},
        Adr: {}
      },
      priorityBreakdown: {
        Task: {},
        Project: {}
      },
      topContributors: new Map(),
      tagUsage: new Map()
    };

    this.notes = [];
    this.noteIndex = new Map(); // filename -> note data
    this.backlinkIndex = new Map(); // filename -> array of files linking to it
  }

  /**
   * Main health check entry point
   */
  async analyze() {
    console.log(chalk.blue.bold('\n🏥 Obsidian Vault Health Check\n'));
    console.log(chalk.gray(`Vault: ${VAULT_ROOT}\n`));

    // Find all markdown files
    const files = await this.findMarkdownFiles();
    console.log(chalk.gray(`Analyzing ${files.length} notes...\n`));

    // Parse all notes
    await this.parseAllNotes(files);

    // Calculate metrics
    this.calculateMetrics();

    return this.metrics;
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
   * Parse all notes and build indexes
   */
  async parseAllNotes(files) {
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const { data: frontmatter, content: body } = matter(content);
        const stats = fs.statSync(file);

        const noteData = {
          path: file,
          relativePath: path.relative(VAULT_ROOT, file),
          filename: path.basename(file, '.md'),
          frontmatter,
          content: body,
          stats,
          links: this.extractLinks(body, frontmatter),
          wordCount: this.countWords(body)
        };

        this.notes.push(noteData);
        this.noteIndex.set(noteData.filename, noteData);

      } catch (error) {
        console.error(chalk.red(`Error parsing ${file}: ${error.message}`));
      }
    }

    // Build backlink index
    this.buildBacklinkIndex();
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
   * Build backlink index
   */
  buildBacklinkIndex() {
    for (const note of this.notes) {
      for (const link of note.links) {
        if (!this.backlinkIndex.has(link)) {
          this.backlinkIndex.set(link, []);
        }
        this.backlinkIndex.get(link).push(note.filename);
      }
    }
  }

  /**
   * Calculate all health metrics
   */
  calculateMetrics() {
    const now = new Date();
    const staleDate = new Date(now.getTime() - (STALE_DAYS * 24 * 60 * 60 * 1000));

    this.metrics.totalNotes = this.notes.length;

    for (const note of this.notes) {
      const type = note.frontmatter.type || 'Unknown';

      // Count by type
      this.metrics.notesByType[type] = (this.metrics.notesByType[type] || 0) + 1;

      // Check for orphaned notes (no backlinks)
      const backlinks = this.backlinkIndex.get(note.filename) || [];
      if (backlinks.length === 0 && !this.isSpecialNote(note)) {
        this.metrics.orphanedNotes.push({
          title: note.frontmatter.title || note.filename,
          path: note.relativePath,
          type
        });
      }

      // Check for stale notes
      const modifiedDate = new Date(note.stats.mtime);
      if (modifiedDate < staleDate && !this.isSpecialNote(note)) {
        this.metrics.staleNotes.push({
          title: note.frontmatter.title || note.filename,
          path: note.relativePath,
          type,
          modified: modifiedDate.toISOString().split('T')[0],
          daysAgo: Math.floor((now - modifiedDate) / (24 * 60 * 60 * 1000))
        });
      }

      // Track recent notes (last 30 days)
      const recentDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      if (modifiedDate > recentDate) {
        this.metrics.recentNotes.push({
          title: note.frontmatter.title || note.filename,
          path: note.relativePath,
          type,
          modified: modifiedDate.toISOString().split('T')[0]
        });
      }

      // Link statistics
      this.metrics.linkStats.totalLinks += note.links.length;
      this.metrics.linkStats.totalBacklinks += backlinks.length;

      for (const link of note.links) {
        if (!this.noteIndex.has(link)) {
          this.metrics.linkStats.brokenLinks++;
        }
      }

      // Quality metrics
      if (note.frontmatter.tags && note.frontmatter.tags.length > 0) {
        this.metrics.qualityMetrics.notesWithTags++;

        // Track tag usage
        for (const tag of note.frontmatter.tags) {
          this.metrics.tagUsage.set(tag, (this.metrics.tagUsage.get(tag) || 0) + 1);
        }
      }

      if (note.frontmatter.description) {
        this.metrics.qualityMetrics.notesWithDescription++;
      }

      if (note.frontmatter.status) {
        this.metrics.qualityMetrics.notesWithStatus++;
      }

      // ADR quality indicators
      if (type === 'Adr') {
        this.metrics.qualityMetrics.totalADRs++;

        if (note.frontmatter.confidence && note.frontmatter.freshness && note.frontmatter.source) {
          this.metrics.qualityMetrics.adrWithQualityIndicators++;
        }
      }

      // Status breakdown
      if (note.frontmatter.status && ['Task', 'Project', 'Adr'].includes(type)) {
        if (!this.metrics.statusBreakdown[type]) {
          this.metrics.statusBreakdown[type] = {};
        }
        const status = note.frontmatter.status;
        this.metrics.statusBreakdown[type][status] = (this.metrics.statusBreakdown[type][status] || 0) + 1;
      }

      // Priority breakdown
      if (note.frontmatter.priority && ['Task', 'Project'].includes(type)) {
        if (!this.metrics.priorityBreakdown[type]) {
          this.metrics.priorityBreakdown[type] = {};
        }
        const priority = note.frontmatter.priority;
        this.metrics.priorityBreakdown[type][priority] = (this.metrics.priorityBreakdown[type][priority] || 0) + 1;
      }
    }

    // Calculate average links per note
    if (this.metrics.totalNotes > 0) {
      this.metrics.linkStats.averageLinksPerNote = (
        this.metrics.linkStats.totalLinks / this.metrics.totalNotes
      ).toFixed(2);
    }

    // Sort stale notes by age
    this.metrics.staleNotes.sort((a, b) => b.daysAgo - a.daysAgo);

    // Sort recent notes by date
    this.metrics.recentNotes.sort((a, b) => b.modified.localeCompare(a.modified));

    // Get top 10 tags
    this.metrics.topTags = Array.from(this.metrics.tagUsage.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  }

  /**
   * Check if note should be excluded from orphan/stale checks
   */
  isSpecialNote(note) {
    const filename = note.filename;
    const type = note.frontmatter.type;

    // Exclude templates, MOCs, dashboards, and READMEs
    return (
      filename.startsWith('MOC -') ||
      filename.startsWith('Dashboard -') ||
      filename === 'README' ||
      type === 'Template' ||
      note.relativePath.startsWith('+Templates/')
    );
  }

  /**
   * Format output
   */
  formatOutput(format = 'console') {
    if (format === 'json') {
      return JSON.stringify(this.metrics, null, 2);
    } else if (format === 'markdown') {
      return this.generateMarkdownReport();
    } else {
      return this.generateConsoleReport();
    }
  }

  /**
   * Generate console-friendly report
   */
  generateConsoleReport() {
    const lines = [];

    lines.push(chalk.blue.bold('📊 Vault Statistics'));
    lines.push('');
    lines.push(chalk.gray(`Total Notes: ${chalk.white(this.metrics.totalNotes)}`));
    lines.push('');

    // Notes by type
    lines.push(chalk.blue.bold('📝 Notes by Type'));
    lines.push('');
    const sortedTypes = Object.entries(this.metrics.notesByType).sort((a, b) => b[1] - a[1]);
    for (const [type, count] of sortedTypes) {
      const bar = '█'.repeat(Math.ceil(count / 2));
      lines.push(chalk.gray(`  ${type.padEnd(15)} ${chalk.cyan(count.toString().padStart(4))} ${bar}`));
    }
    lines.push('');

    // Link statistics
    lines.push(chalk.blue.bold('🔗 Link Statistics'));
    lines.push('');
    lines.push(chalk.gray(`  Total Links:        ${chalk.white(this.metrics.linkStats.totalLinks)}`));
    lines.push(chalk.gray(`  Total Backlinks:    ${chalk.white(this.metrics.linkStats.totalBacklinks)}`));
    lines.push(chalk.gray(`  Avg Links/Note:     ${chalk.white(this.metrics.linkStats.averageLinksPerNote)}`));

    if (this.metrics.linkStats.brokenLinks > 0) {
      lines.push(chalk.red(`  Broken Links:       ${this.metrics.linkStats.brokenLinks}`));
    } else {
      lines.push(chalk.green(`  Broken Links:       0 ✓`));
    }
    lines.push('');

    // Quality metrics
    lines.push(chalk.blue.bold('✨ Quality Metrics'));
    lines.push('');
    const tagsPercent = ((this.metrics.qualityMetrics.notesWithTags / this.metrics.totalNotes) * 100).toFixed(1);
    const descPercent = ((this.metrics.qualityMetrics.notesWithDescription / this.metrics.totalNotes) * 100).toFixed(1);

    lines.push(chalk.gray(`  Notes with tags:        ${chalk.white(this.metrics.qualityMetrics.notesWithTags)} (${tagsPercent}%)`));
    lines.push(chalk.gray(`  Notes with description: ${chalk.white(this.metrics.qualityMetrics.notesWithDescription)} (${descPercent}%)`));

    if (this.metrics.qualityMetrics.totalADRs > 0) {
      const adrQualityPercent = ((this.metrics.qualityMetrics.adrWithQualityIndicators / this.metrics.qualityMetrics.totalADRs) * 100).toFixed(1);
      lines.push(chalk.gray(`  ADRs with quality indicators: ${chalk.white(this.metrics.qualityMetrics.adrWithQualityIndicators)}/${this.metrics.qualityMetrics.totalADRs} (${adrQualityPercent}%)`));
    }
    lines.push('');

    // Status breakdown
    if (Object.keys(this.metrics.statusBreakdown.Task || {}).length > 0 ||
        Object.keys(this.metrics.statusBreakdown.Project || {}).length > 0) {
      lines.push(chalk.blue.bold('📋 Status Breakdown'));
      lines.push('');

      for (const [type, statuses] of Object.entries(this.metrics.statusBreakdown)) {
        if (Object.keys(statuses).length > 0) {
          lines.push(chalk.gray(`  ${type}s:`));
          for (const [status, count] of Object.entries(statuses)) {
            lines.push(chalk.gray(`    ${status.padEnd(12)} ${chalk.white(count)}`));
          }
        }
      }
      lines.push('');
    }

    // Top tags
    if (this.metrics.topTags && this.metrics.topTags.length > 0) {
      lines.push(chalk.blue.bold('🏷️  Top Tags'));
      lines.push('');
      for (const { tag, count } of this.metrics.topTags.slice(0, 10)) {
        const bar = '▪'.repeat(Math.ceil(count / 2));
        lines.push(chalk.gray(`  ${tag.padEnd(30)} ${chalk.cyan(count.toString().padStart(3))} ${bar}`));
      }
      lines.push('');
    }

    // Orphaned notes
    if (this.metrics.orphanedNotes.length > 0) {
      lines.push(chalk.yellow.bold(`⚠️  Orphaned Notes (${this.metrics.orphanedNotes.length})`));
      lines.push(chalk.gray('  (Notes with no backlinks)\n'));

      for (const note of this.metrics.orphanedNotes.slice(0, 10)) {
        lines.push(chalk.yellow(`  - ${note.title}`));
        lines.push(chalk.gray(`    ${note.path}`));
      }

      if (this.metrics.orphanedNotes.length > 10) {
        lines.push(chalk.gray(`\n  ... and ${this.metrics.orphanedNotes.length - 10} more`));
      }
      lines.push('');
    } else {
      lines.push(chalk.green.bold('✅ No Orphaned Notes'));
      lines.push('');
    }

    // Stale notes
    if (this.metrics.staleNotes.length > 0) {
      lines.push(chalk.yellow.bold(`📅 Stale Notes (${this.metrics.staleNotes.length})`));
      lines.push(chalk.gray(`  (Not modified in ${STALE_DAYS} days)\n`));

      for (const note of this.metrics.staleNotes.slice(0, 10)) {
        lines.push(chalk.yellow(`  - ${note.title} (${note.daysAgo} days ago)`));
        lines.push(chalk.gray(`    ${note.path}`));
      }

      if (this.metrics.staleNotes.length > 10) {
        lines.push(chalk.gray(`\n  ... and ${this.metrics.staleNotes.length - 10} more`));
      }
      lines.push('');
    }

    // Recent activity
    if (this.metrics.recentNotes.length > 0) {
      lines.push(chalk.green.bold(`🆕 Recent Activity (Last 30 Days)`));
      lines.push('');

      for (const note of this.metrics.recentNotes.slice(0, 10)) {
        lines.push(chalk.green(`  - ${note.modified}: ${note.title}`));
      }

      if (this.metrics.recentNotes.length > 10) {
        lines.push(chalk.gray(`\n  ... and ${this.metrics.recentNotes.length - 10} more`));
      }
      lines.push('');
    }

    // Health score
    const healthScore = this.calculateHealthScore();
    lines.push(chalk.blue.bold('🎯 Vault Health Score'));
    lines.push('');
    lines.push(this.formatHealthScore(healthScore));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate markdown report
   */
  generateMarkdownReport() {
    const lines = [];

    lines.push('# Vault Health Report');
    lines.push('');
    lines.push(`Generated: ${new Date().toISOString().split('T')[0]}`);
    lines.push('');

    // Overview
    lines.push('## Overview');
    lines.push('');
    lines.push(`- **Total Notes:** ${this.metrics.totalNotes}`);
    lines.push(`- **Orphaned Notes:** ${this.metrics.orphanedNotes.length}`);
    lines.push(`- **Stale Notes:** ${this.metrics.staleNotes.length}`);
    lines.push(`- **Recent Activity:** ${this.metrics.recentNotes.length} notes (last 30 days)`);
    lines.push('');

    // Notes by type
    lines.push('## Notes by Type');
    lines.push('');
    lines.push('| Type | Count |');
    lines.push('|------|-------|');
    const sortedTypes = Object.entries(this.metrics.notesByType).sort((a, b) => b[1] - a[1]);
    for (const [type, count] of sortedTypes) {
      lines.push(`| ${type} | ${count} |`);
    }
    lines.push('');

    // Link statistics
    lines.push('## Link Statistics');
    lines.push('');
    lines.push('| Metric | Value |');
    lines.push('|--------|-------|');
    lines.push(`| Total Links | ${this.metrics.linkStats.totalLinks} |`);
    lines.push(`| Total Backlinks | ${this.metrics.linkStats.totalBacklinks} |`);
    lines.push(`| Average Links per Note | ${this.metrics.linkStats.averageLinksPerNote} |`);
    lines.push(`| Broken Links | ${this.metrics.linkStats.brokenLinks} |`);
    lines.push('');

    // Quality metrics
    lines.push('## Quality Metrics');
    lines.push('');
    const tagsPercent = ((this.metrics.qualityMetrics.notesWithTags / this.metrics.totalNotes) * 100).toFixed(1);
    const descPercent = ((this.metrics.qualityMetrics.notesWithDescription / this.metrics.totalNotes) * 100).toFixed(1);

    lines.push(`- **Notes with tags:** ${this.metrics.qualityMetrics.notesWithTags} (${tagsPercent}%)`);
    lines.push(`- **Notes with description:** ${this.metrics.qualityMetrics.notesWithDescription} (${descPercent}%)`);

    if (this.metrics.qualityMetrics.totalADRs > 0) {
      const adrQualityPercent = ((this.metrics.qualityMetrics.adrWithQualityIndicators / this.metrics.qualityMetrics.totalADRs) * 100).toFixed(1);
      lines.push(`- **ADRs with quality indicators:** ${this.metrics.qualityMetrics.adrWithQualityIndicators}/${this.metrics.qualityMetrics.totalADRs} (${adrQualityPercent}%)`);
    }
    lines.push('');

    // Top tags
    if (this.metrics.topTags && this.metrics.topTags.length > 0) {
      lines.push('## Top Tags');
      lines.push('');
      lines.push('| Tag | Count |');
      lines.push('|-----|-------|');
      for (const { tag, count } of this.metrics.topTags) {
        lines.push(`| ${tag} | ${count} |`);
      }
      lines.push('');
    }

    // Orphaned notes
    if (this.metrics.orphanedNotes.length > 0) {
      lines.push('## Orphaned Notes');
      lines.push('');
      lines.push('Notes with no backlinks:');
      lines.push('');
      for (const note of this.metrics.orphanedNotes) {
        lines.push(`- [[${note.title}]] (${note.type})`);
      }
      lines.push('');
    }

    // Stale notes
    if (this.metrics.staleNotes.length > 0) {
      lines.push('## Stale Notes');
      lines.push('');
      lines.push(`Notes not modified in ${STALE_DAYS} days:`);
      lines.push('');
      for (const note of this.metrics.staleNotes.slice(0, 20)) {
        lines.push(`- [[${note.title}]] - ${note.daysAgo} days ago (${note.modified})`);
      }
      lines.push('');
    }

    // Health score
    const healthScore = this.calculateHealthScore();
    lines.push('## Vault Health Score');
    lines.push('');
    lines.push(`**Overall Score: ${healthScore.total}/100**`);
    lines.push('');
    lines.push('Breakdown:');
    lines.push(`- Connectivity: ${healthScore.connectivity}/25`);
    lines.push(`- Freshness: ${healthScore.freshness}/25`);
    lines.push(`- Quality: ${healthScore.quality}/25`);
    lines.push(`- Completeness: ${healthScore.completeness}/25`);
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Calculate overall health score
   */
  calculateHealthScore() {
    const score = {
      connectivity: 0,
      freshness: 0,
      quality: 0,
      completeness: 0,
      total: 0
    };

    // Connectivity score (25 points)
    const orphanRate = this.metrics.orphanedNotes.length / this.metrics.totalNotes;
    const avgLinks = parseFloat(this.metrics.linkStats.averageLinksPerNote);

    score.connectivity = Math.round(
      (1 - orphanRate) * 15 + // Fewer orphans = better (15 points max)
      Math.min(avgLinks / 5, 1) * 10  // More links = better (10 points max, cap at 5 avg)
    );

    // Freshness score (25 points)
    const staleRate = this.metrics.staleNotes.length / this.metrics.totalNotes;
    const recentRate = this.metrics.recentNotes.length / this.metrics.totalNotes;

    score.freshness = Math.round(
      (1 - staleRate) * 15 +  // Fewer stale = better (15 points max)
      recentRate * 10         // More recent = better (10 points max)
    );

    // Quality score (25 points)
    const tagsRate = this.metrics.qualityMetrics.notesWithTags / this.metrics.totalNotes;
    const descRate = this.metrics.qualityMetrics.notesWithDescription / this.metrics.totalNotes;
    const brokenLinkRate = this.metrics.linkStats.brokenLinks / Math.max(this.metrics.linkStats.totalLinks, 1);

    score.quality = Math.round(
      tagsRate * 10 +              // Tags usage (10 points max)
      descRate * 10 +              // Descriptions (10 points max)
      (1 - brokenLinkRate) * 5     // No broken links (5 points max)
    );

    // Completeness score (25 points)
    const statusRate = this.metrics.qualityMetrics.notesWithStatus / this.metrics.totalNotes;
    const adrQualityRate = this.metrics.qualityMetrics.totalADRs > 0
      ? this.metrics.qualityMetrics.adrWithQualityIndicators / this.metrics.qualityMetrics.totalADRs
      : 0;

    score.completeness = Math.round(
      statusRate * 15 +        // Status fields (15 points max)
      adrQualityRate * 10      // ADR quality indicators (10 points max)
    );

    score.total = score.connectivity + score.freshness + score.quality + score.completeness;

    return score;
  }

  /**
   * Format health score with color
   */
  formatHealthScore(score) {
    const getColor = (value, max) => {
      const percentage = (value / max) * 100;
      if (percentage >= 80) return chalk.green;
      if (percentage >= 60) return chalk.yellow;
      return chalk.red;
    };

    const lines = [];
    lines.push(getColor(score.total, 100)(`  Overall Score: ${score.total}/100`));
    lines.push('');
    lines.push(chalk.gray('  Breakdown:'));
    lines.push(getColor(score.connectivity, 25)(`    Connectivity:  ${score.connectivity}/25`));
    lines.push(getColor(score.freshness, 25)(`    Freshness:     ${score.freshness}/25`));
    lines.push(getColor(score.quality, 25)(`    Quality:       ${score.quality}/25`));
    lines.push(getColor(score.completeness, 25)(`    Completeness:  ${score.completeness}/25`));

    return lines.join('\n');
  }
}

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    format: 'console'
  };

  const formatIndex = args.indexOf('--format');
  if (formatIndex !== -1 && args[formatIndex + 1]) {
    options.format = args[formatIndex + 1];
  }

  return options;
}

// Main execution
async function main() {
  const options = parseArgs();
  const healthCheck = new VaultHealthCheck();

  await healthCheck.analyze();

  const output = healthCheck.formatOutput(options.format);
  console.log(output);
}

main();
