#!/usr/bin/env node

/**
 * Obsidian Vault Validation Script
 *
 * Validates frontmatter schema and wiki-links across all vault notes.
 *
 * Usage:
 *   node scripts/validate.js                    # Validate all
 *   node scripts/validate.js --frontmatter      # Validate frontmatter only
 *   node scripts/validate.js --links            # Validate links only
 *   node scripts/validate.js --all              # Verbose mode, show all details
 *
 * Exit codes:
 *   0 - No errors found
 *   1 - Validation errors detected
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
const VAULT_ROOT = path.resolve(__dirname, '../..');
const EXCLUDED_DIRS = ['.git', '.obsidian', 'node_modules', '.smart-env', 'scripts', 'screenshots'];

// Required fields per note type
const REQUIRED_FIELDS = {
  Task: ['type', 'title', 'created', 'completed', 'priority'],
  Project: ['type', 'title', 'created', 'status', 'priority'],
  Meeting: ['type', 'title', 'date', 'created'],
  Person: ['type', 'title', 'created'],
  Weblink: ['type', 'title', 'url', 'created'],
  Page: ['type', 'title', 'created'],
  Adr: ['type', 'title', 'status', 'created', 'relatedTo', 'supersedes', 'dependsOn'],
  Organisation: ['type', 'title', 'created'],
  AtomicNote: ['type', 'title', 'created'],
  Zettel: ['type', 'title', 'created'],
  DailyNote: ['type', 'date', 'created'],
  CodeSnippet: ['type', 'title', 'created'],
  Course: ['type', 'title', 'created']
};

// Valid values for enumerated fields
const VALID_VALUES = {
  status: {
    Task: ['todo', 'in-progress', 'completed', 'blocked', 'cancelled'],
    Project: ['active', 'paused', 'completed', 'cancelled'],
    Adr: ['draft', 'proposed', 'accepted', 'deprecated', 'superseded']
  },
  priority: ['high', 'medium', 'low'],
  completed: ['true', 'false', true, false],
  confidence: ['high', 'medium', 'low'],
  freshness: ['current', 'recent', 'stale'],
  source: ['primary', 'secondary', 'synthesis', 'external']
};

// Date format regex (YYYY-MM-DD)
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

class VaultValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      totalFiles: 0,
      validFiles: 0,
      filesWithErrors: 0,
      filesWithWarnings: 0
    };
    this.allNotes = new Map(); // filename -> full path
  }

  /**
   * Main validation entry point
   */
  async validate(options = {}) {
    console.log(chalk.blue.bold('\n🔍 Obsidian Vault Validation\n'));
    console.log(chalk.gray(`Vault: ${VAULT_ROOT}\n`));

    // Find all markdown files
    const files = await this.findMarkdownFiles();
    this.stats.totalFiles = files.length;

    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    // Build index of all notes for link validation
    this.buildNoteIndex(files);

    // Validate each file
    for (const file of files) {
      await this.validateFile(file, options);
    }

    // Print results
    this.printResults(options);

    // Return exit code
    return this.errors.length > 0 ? 1 : 0;
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
   * Build index of note filenames for link validation
   */
  buildNoteIndex(files) {
    for (const file of files) {
      const basename = path.basename(file, '.md');
      this.allNotes.set(basename, file);
    }
  }

  /**
   * Validate a single file
   */
  async validateFile(filePath, options) {
    const relativePath = path.relative(VAULT_ROOT, filePath);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content: body } = matter(content);

      // Validate frontmatter if requested
      if (!options.links) {
        this.validateFrontmatter(relativePath, frontmatter);
      }

      // Validate links if requested
      if (!options.frontmatter) {
        this.validateLinks(relativePath, body, frontmatter);
      }

      // If no errors for this file, increment valid count
      const fileErrors = this.errors.filter(e => e.file === relativePath);
      if (fileErrors.length === 0) {
        this.stats.validFiles++;
      }

    } catch (error) {
      this.addError(relativePath, 'general', `Failed to parse file: ${error.message}`);
    }
  }

  /**
   * Validate frontmatter schema
   */
  validateFrontmatter(file, frontmatter) {
    // Check if type field exists
    if (!frontmatter.type) {
      this.addError(file, 'frontmatter', 'Missing required field: type');
      return;
    }

    const noteType = frontmatter.type;

    // Check if type is recognized
    if (!REQUIRED_FIELDS[noteType]) {
      this.addWarning(file, 'frontmatter', `Unknown note type: ${noteType}`);
      return;
    }

    // Check required fields for this type
    const requiredFields = REQUIRED_FIELDS[noteType];
    for (const field of requiredFields) {
      if (frontmatter[field] === undefined || frontmatter[field] === null) {
        this.addError(file, 'frontmatter', `Missing required field for ${noteType}: ${field}`);
      }
    }

    // Validate date fields
    this.validateDateFields(file, frontmatter);

    // Validate enumerated values
    this.validateEnumeratedValues(file, frontmatter);

    // Type-specific validation
    this.validateTypeSpecific(file, frontmatter);
  }

  /**
   * Validate date format fields
   */
  validateDateFields(file, frontmatter) {
    const dateFields = ['created', 'modified', 'date', 'due', 'start-date', 'end-date', 'reviewed'];

    for (const field of dateFields) {
      const value = frontmatter[field];
      if (value && value !== 'null' && value !== null && typeof value === 'string') {
        if (!DATE_REGEX.test(value)) {
          this.addError(file, 'frontmatter', `Invalid date format for '${field}': ${value} (expected YYYY-MM-DD)`);
        }
      }
    }
  }

  /**
   * Validate enumerated field values
   */
  validateEnumeratedValues(file, frontmatter) {
    // Validate status based on note type
    if (frontmatter.status) {
      const noteType = frontmatter.type;
      const validStatuses = VALID_VALUES.status[noteType] || [];

      if (validStatuses.length > 0 && !validStatuses.includes(frontmatter.status)) {
        this.addError(
          file,
          'frontmatter',
          `Invalid status '${frontmatter.status}' for ${noteType}. Valid values: ${validStatuses.join(', ')}`
        );
      }
    }

    // Validate priority
    if (frontmatter.priority && !VALID_VALUES.priority.includes(frontmatter.priority)) {
      this.addError(
        file,
        'frontmatter',
        `Invalid priority '${frontmatter.priority}'. Valid values: ${VALID_VALUES.priority.join(', ')}`
      );
    }

    // Validate completed (boolean)
    if (frontmatter.completed !== undefined && !VALID_VALUES.completed.includes(frontmatter.completed)) {
      this.addError(
        file,
        'frontmatter',
        `Invalid completed value '${frontmatter.completed}'. Must be true or false`
      );
    }

    // Validate quality indicators (if present)
    if (frontmatter.confidence && !VALID_VALUES.confidence.includes(frontmatter.confidence)) {
      this.addWarning(
        file,
        'frontmatter',
        `Invalid confidence '${frontmatter.confidence}'. Recommended: ${VALID_VALUES.confidence.join(', ')}`
      );
    }

    if (frontmatter.freshness && !VALID_VALUES.freshness.includes(frontmatter.freshness)) {
      this.addWarning(
        file,
        'frontmatter',
        `Invalid freshness '${frontmatter.freshness}'. Recommended: ${VALID_VALUES.freshness.join(', ')}`
      );
    }

    if (frontmatter.source && !VALID_VALUES.source.includes(frontmatter.source)) {
      this.addWarning(
        file,
        'frontmatter',
        `Invalid source '${frontmatter.source}'. Recommended: ${VALID_VALUES.source.join(', ')}`
      );
    }
  }

  /**
   * Type-specific validation rules
   */
  validateTypeSpecific(file, frontmatter) {
    const noteType = frontmatter.type;

    // ADR specific validation
    if (noteType === 'Adr') {
      // Check for relationship fields
      if (!Array.isArray(frontmatter.relatedTo)) {
        this.addError(file, 'frontmatter', 'ADR relatedTo field must be an array (use [] if empty)');
      }
      if (!Array.isArray(frontmatter.supersedes)) {
        this.addError(file, 'frontmatter', 'ADR supersedes field must be an array (use [] if empty)');
      }
      if (!Array.isArray(frontmatter.dependsOn)) {
        this.addError(file, 'frontmatter', 'ADR dependsOn field must be an array (use [] if empty)');
      }

      // Recommend quality indicators for ADRs
      if (!frontmatter.confidence || !frontmatter.freshness) {
        this.addWarning(file, 'frontmatter', 'ADRs should include quality indicators (confidence, freshness, source, verified)');
      }
    }

    // Weblink specific validation
    if (noteType === 'Weblink') {
      if (!frontmatter.url || typeof frontmatter.url !== 'string') {
        this.addError(file, 'frontmatter', 'Weblink notes must have a valid url field');
      }
    }

    // Meeting specific validation
    if (noteType === 'Meeting') {
      if (frontmatter.attendees && !Array.isArray(frontmatter.attendees)) {
        this.addWarning(file, 'frontmatter', 'Meeting attendees should be an array');
      }
    }

    // Check for tags with # prefix (common mistake)
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      const tagsWithHash = frontmatter.tags.filter(tag => typeof tag === 'string' && tag.startsWith('#'));
      if (tagsWithHash.length > 0) {
        this.addError(
          file,
          'frontmatter',
          `Tags should not include # prefix in frontmatter: ${tagsWithHash.join(', ')}`
        );
      }
    }
  }

  /**
   * Validate wiki-links
   */
  validateLinks(file, content, frontmatter) {
    // Extract all wiki-links [[Note Name]]
    const linkRegex = /\[\[([^\]|]+)(\|[^\]]+)?\]\]/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      links.push(match[1]);
    }

    // Check links in frontmatter fields
    const frontmatterStr = JSON.stringify(frontmatter);
    while ((match = linkRegex.exec(frontmatterStr)) !== null) {
      links.push(match[1]);
    }

    // Validate each link
    for (const link of links) {
      // Remove any heading/block references
      const cleanLink = link.split('#')[0].split('^')[0].trim();

      if (!this.allNotes.has(cleanLink)) {
        this.addWarning(file, 'links', `Broken wiki-link: [[${cleanLink}]]`);
      }
    }
  }

  /**
   * Add an error
   */
  addError(file, category, message) {
    this.errors.push({ file, category, message, severity: 'error' });
    this.stats.filesWithErrors++;
  }

  /**
   * Add a warning
   */
  addWarning(file, category, message) {
    this.warnings.push({ file, category, message, severity: 'warning' });
    this.stats.filesWithWarnings++;
  }

  /**
   * Print validation results
   */
  printResults(options) {
    console.log(chalk.blue.bold('\n📊 Validation Results\n'));

    // Print statistics
    console.log(chalk.gray('Statistics:'));
    console.log(chalk.gray(`  Total files: ${this.stats.totalFiles}`));
    console.log(chalk.green(`  Valid files: ${this.stats.validFiles}`));

    if (this.stats.filesWithErrors > 0) {
      console.log(chalk.red(`  Files with errors: ${this.stats.filesWithErrors}`));
    }

    if (this.stats.filesWithWarnings > 0) {
      console.log(chalk.yellow(`  Files with warnings: ${this.stats.filesWithWarnings}`));
    }

    console.log('');

    // Print errors
    if (this.errors.length > 0) {
      console.log(chalk.red.bold(`❌ ${this.errors.length} Error(s) Found:\n`));

      // Group errors by file
      const errorsByFile = this.groupByFile(this.errors);

      for (const [file, fileErrors] of Object.entries(errorsByFile)) {
        console.log(chalk.red(`  ${file}:`));
        for (const error of fileErrors) {
          console.log(chalk.red(`    ❌ [${error.category}] ${error.message}`));
        }
        console.log('');
      }
    }

    // Print warnings
    if (this.warnings.length > 0 && options.all) {
      console.log(chalk.yellow.bold(`⚠️  ${this.warnings.length} Warning(s) Found:\n`));

      const warningsByFile = this.groupByFile(this.warnings);

      for (const [file, fileWarnings] of Object.entries(warningsByFile)) {
        console.log(chalk.yellow(`  ${file}:`));
        for (const warning of fileWarnings) {
          console.log(chalk.yellow(`    ⚠️  [${warning.category}] ${warning.message}`));
        }
        console.log('');
      }
    } else if (this.warnings.length > 0) {
      console.log(chalk.yellow(`⚠️  ${this.warnings.length} warning(s) found (use --all to see details)\n`));
    }

    // Print summary
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(chalk.green.bold('✅ All validations passed!\n'));
    } else if (this.errors.length === 0) {
      console.log(chalk.green.bold('✅ No errors found (warnings only)\n'));
    } else {
      console.log(chalk.red.bold('❌ Validation failed. Please fix the errors above.\n'));
    }
  }

  /**
   * Group issues by file
   */
  groupByFile(issues) {
    const grouped = {};

    for (const issue of issues) {
      if (!grouped[issue.file]) {
        grouped[issue.file] = [];
      }
      grouped[issue.file].push(issue);
    }

    return grouped;
  }
}

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    frontmatter: args.includes('--frontmatter'),
    links: args.includes('--links'),
    all: args.includes('--all')
  };

  // If no specific option, validate everything
  if (!options.frontmatter && !options.links) {
    options.frontmatter = false;
    options.links = false;
  }

  return options;
}

// Main execution
async function main() {
  const options = parseArgs();
  const validator = new VaultValidator();
  const exitCode = await validator.validate(options);
  process.exit(exitCode);
}

main();
