#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Define required fields for each type
const REQUIRED_FIELDS = {
  universal: ['type', 'title', 'created'],
  Task: ['completed', 'priority'],
  Project: ['status', 'priority'],
  Adr: ['status', 'relatedTo', 'supersedes', 'dependsOn'],
  Meeting: ['date'],
  Person: ['role'],
  Page: [],
  Weblink: ['url', 'domain'],
  Organisation: [],
  DailyNote: ['date'],
  AtomicNote: [],
  Course: [],
  CodeSnippet: [],
  Zettel: [],
  MOC: []
};

// Optional quality fields
const QUALITY_FIELDS = ['tags', 'description', 'modified'];

// ADR-specific quality indicators
const ADR_QUALITY_INDICATORS = ['confidence', 'freshness', 'source'];

// Directories to exclude
const EXCLUDE_DIRS = [
  '.obsidian',
  'node_modules',
  '.git',
  '.claude',
  'Templates',
  'scripts',
  'screenshots'
];

// Files to exclude
const EXCLUDE_FILES = [
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'BLOG_POST.md',
  'VALIDATION_REPORT.md',
  'VAULT_AUTOMATION_SETUP.md'
];

/**
 * Find all markdown files recursively
 */
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const dirName = path.basename(filePath);
      if (!EXCLUDE_DIRS.includes(dirName) && !dirName.startsWith('.')) {
        findMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md') && !EXCLUDE_FILES.includes(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract YAML frontmatter from markdown content
 */
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  try {
    return yaml.load(match[1]);
  } catch (e) {
    return null;
  }
}

/**
 * Calculate metadata score for a note
 */
function calculateMetadataScore(frontmatter, requiredFields, missingRequired, qualityCount, adrQualityCount) {
  let score = 0;

  // Required fields: 60 points max
  if (requiredFields.length > 0) {
    const requiredPresent = requiredFields.length - missingRequired.length;
    score += (requiredPresent / requiredFields.length) * 60;
  } else {
    // If no type-specific required fields, give full 60 points for universal fields
    score += 60;
  }

  // Quality fields: 10 points each (up to 30 points)
  score += qualityCount * 10;

  // ADR quality indicators: 3.3 points each (up to 10 points)
  if (frontmatter && frontmatter.type === 'Adr') {
    score += adrQualityCount * 3.33;
  }

  return Math.min(Math.round(score), 100);
}

/**
 * Analyze a single note
 */
function analyzeNote(filePath, vaultRoot) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = extractFrontmatter(content);

  if (!frontmatter) {
    const relativePath = path.relative(vaultRoot, filePath);
    return {
      path: relativePath,
      metadataScore: 0,
      type: null,
      requiredFields: REQUIRED_FIELDS.universal,
      missingRequired: REQUIRED_FIELDS.universal,
      hasDescription: false,
      hasTags: false,
      hasModified: false,
      qualityIndicators: 0,
      error: 'No frontmatter found'
    };
  }

  const noteType = frontmatter.type || null;
  const typeRequiredFields = REQUIRED_FIELDS[noteType] || [];
  const allRequiredFields = [...REQUIRED_FIELDS.universal, ...typeRequiredFields];

  // Check for missing required fields
  const missingRequired = allRequiredFields.filter(field => {
    const value = frontmatter[field];
    return value === undefined || value === null || value === '';
  });

  // Check for quality fields
  const hasDescription = frontmatter.description && frontmatter.description !== '';
  const hasTags = Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0;
  const hasModified = frontmatter.modified && frontmatter.modified !== '';
  const qualityCount = [hasDescription, hasTags, hasModified].filter(Boolean).length;

  // Check for ADR quality indicators
  let adrQualityCount = 0;
  if (noteType === 'Adr') {
    adrQualityCount = ADR_QUALITY_INDICATORS.filter(field => {
      const value = frontmatter[field];
      return value !== undefined && value !== null && value !== '';
    }).length;
  }

  // Calculate metadata score
  const metadataScore = calculateMetadataScore(
    frontmatter,
    allRequiredFields,
    missingRequired,
    qualityCount,
    adrQualityCount
  );

  const relativePath = path.relative(vaultRoot, filePath);

  return {
    path: relativePath,
    metadataScore,
    type: noteType,
    requiredFields: allRequiredFields,
    missingRequired,
    hasDescription,
    hasTags,
    hasModified,
    qualityIndicators: qualityCount,
    adrQualityIndicators: noteType === 'Adr' ? adrQualityCount : undefined
  };
}

/**
 * Main function
 */
function main() {
  const vaultRoot = path.resolve(__dirname, '../..');
  const markdownFiles = findMarkdownFiles(vaultRoot);

  console.log(`Found ${markdownFiles.length} markdown files to analyze\n`);

  const results = {};
  const summary = {
    totalNotes: 0,
    averageScore: 0,
    scoreDistribution: {
      excellent: 0,  // 90-100
      good: 0,       // 70-89
      fair: 0,       // 50-69
      poor: 0        // 0-49
    },
    typeDistribution: {},
    missingFrontmatter: 0
  };

  markdownFiles.forEach(filePath => {
    const result = analyzeNote(filePath, vaultRoot);
    results[result.path] = result;
    summary.totalNotes++;

    if (result.error) {
      summary.missingFrontmatter++;
    } else {
      // Score distribution
      if (result.metadataScore >= 90) summary.scoreDistribution.excellent++;
      else if (result.metadataScore >= 70) summary.scoreDistribution.good++;
      else if (result.metadataScore >= 50) summary.scoreDistribution.fair++;
      else summary.scoreDistribution.poor++;

      // Type distribution
      const type = result.type || 'unknown';
      summary.typeDistribution[type] = (summary.typeDistribution[type] || 0) + 1;
    }
  });

  // Calculate average score
  const scores = Object.values(results)
    .filter(r => !r.error)
    .map(r => r.metadataScore);
  summary.averageScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  // Output results
  const output = {
    summary,
    notes: results
  };

  console.log(JSON.stringify(output, null, 2));

  // Write to file
  const outputPath = path.join(vaultRoot, 'METADATA_ANALYSIS.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.error(`\nResults written to ${outputPath}`);
}

main();
