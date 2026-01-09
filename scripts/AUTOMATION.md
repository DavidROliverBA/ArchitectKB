# Vault Automation Scripts

This directory contains Node.js automation scripts for maintaining and analyzing your Obsidian vault.

## Installation

```bash
# Install dependencies
npm install

# Make scripts executable (Unix/Linux/macOS)
chmod +x scripts/*.js
```

## Scripts Overview

### 1. validate.js - Frontmatter and Link Validation

Validates YAML frontmatter schema and wiki-links across all vault notes.

**Usage:**

```bash
# Validate everything (frontmatter + links)
npm run validate

# Validate frontmatter only
npm run validate:frontmatter

# Validate links only
npm run validate:links

# Show all details including warnings
npm run validate:all

# Direct execution
node scripts/validate.js --frontmatter
node scripts/validate.js --links
node scripts/validate.js --all
```

**What it checks:**

- **Frontmatter validation:**
  - Required fields per note type (type, title, created, etc.)
  - Date format validation (YYYY-MM-DD)
  - Enumerated field values (status, priority, etc.)
  - Tags format (no # prefix in frontmatter)
  - ADR relationship fields (relatedTo, supersedes, dependsOn)
  - Type-specific validation rules

- **Link validation:**
  - Broken wiki-links [[Note Name]]
  - Links to non-existent notes
  - Links in both content and frontmatter

**Output:**

```
🔍 Obsidian Vault Validation

Found 65 markdown files

📊 Validation Results

Statistics:
  Total files: 65
  Valid files: 62
  Files with errors: 3

❌ 3 Error(s) Found:

  Task - Document API standards.md:
    ❌ [frontmatter] Invalid priority 'critical'. Valid values: high, medium, low
    ❌ [frontmatter] Missing required field for Task: created

✅ No errors found (warnings only)
```

**Exit codes:**
- `0` - No errors found
- `1` - Validation errors detected

---

### 2. health-check.js - Vault Health Metrics

Analyzes vault health including note counts, orphaned notes, stale content, and link statistics.

**Usage:**

```bash
# Human-readable console output
npm run health

# JSON output (for programmatic access)
npm run health:json

# Markdown report
npm run health:markdown

# Export to file
npm run stats  # Creates VAULT_STATS.md

# Direct execution
node scripts/health-check.js
node scripts/health-check.js --format json
node scripts/health-check.js --format markdown
```

**Metrics collected:**

- **Note counts by type** - Distribution of Tasks, Projects, ADRs, etc.
- **Link statistics** - Total links, backlinks, average links per note, broken links
- **Orphaned notes** - Notes with no backlinks
- **Stale notes** - Not modified in 180 days (6 months)
- **Recent activity** - Notes modified in last 30 days
- **Quality metrics:**
  - Notes with tags
  - Notes with descriptions
  - ADRs with quality indicators
- **Status breakdown** - Tasks/Projects/ADRs by status
- **Priority breakdown** - Tasks/Projects by priority
- **Top tags** - Most frequently used tags
- **Health score** - Overall vault quality score (0-100)

**Health Score Breakdown:**

The health score is calculated from four components (max 100 points):

1. **Connectivity (25 points)**
   - Fewer orphaned notes = better
   - Higher average links per note = better

2. **Freshness (25 points)**
   - Fewer stale notes = better
   - More recent activity = better

3. **Quality (25 points)**
   - More notes with tags = better
   - More notes with descriptions = better
   - Fewer broken links = better

4. **Completeness (25 points)**
   - More notes with status fields = better
   - More ADRs with quality indicators = better

**Example output:**

```
🏥 Obsidian Vault Health Check

📊 Vault Statistics

Total Notes: 65

📝 Notes by Type

  Project          4 ████
  Task             3 ███
  Person           3 ███
  Adr              4 ████
  Meeting          2 ██

🔗 Link Statistics

  Total Links:        147
  Total Backlinks:    238
  Avg Links/Note:     2.26
  Broken Links:       0 ✓

✨ Quality Metrics

  Notes with tags:        52 (80.0%)
  Notes with description: 31 (47.7%)
  ADRs with quality indicators: 3/4 (75.0%)

🎯 Vault Health Score

  Overall Score: 82/100

  Breakdown:
    Connectivity:  21/25
    Freshness:     19/25
    Quality:       22/25
    Completeness:  20/25
```

---

### 3. generate-graph.js - Knowledge Graph Export

Exports the vault's knowledge graph structure to JSON format for visualization and analysis.

**Usage:**

```bash
# Export graph to vault-graph.json
npm run graph

# Show metrics only (no file export)
npm run graph:metrics

# Custom output file
node scripts/generate-graph.js --output custom-graph.json

# Export with visualization-friendly format
node scripts/generate-graph.js --viz
```

**Output format:**

The generated JSON contains:

```json
{
  "metadata": {
    "generated": "2026-01-09T12:00:00.000Z",
    "vault": "obsidian-architect-vault-template",
    "version": "1.0",
    "metrics": { ... }
  },
  "nodes": [
    {
      "id": "Project - Cloud Migration",
      "label": "Cloud Migration",
      "type": "Project",
      "path": "Project - Cloud Migration.md",
      "metadata": {
        "created": "2025-12-01",
        "modified": "2026-01-07",
        "tags": ["Project", "domain/cloud"],
        "status": "active",
        "priority": "high",
        "wordCount": 842
      },
      "links": ["Alex Johnson", "Task - Review GraphQL ADR"],
      "group": "Project"
    }
  ],
  "edges": [
    {
      "source": "Project - Cloud Migration",
      "target": "Alex Johnson",
      "type": "involves",
      "weight": 1
    }
  ]
}
```

**Graph metrics:**

- Total nodes and edges
- Average node degree
- Graph density
- Isolated nodes (no connections)
- Node distribution by type
- Cluster/group statistics
- Hub nodes (most connected)
- Edge type distribution

**Compatible with:**

- D3.js force-directed graphs
- Obsidian Graph Analysis plugin
- Cytoscape.js
- vis.js network graphs
- Neo4j graph database (with conversion)

**Example metrics output:**

```
🕸️  Knowledge Graph Generation

📊 Graph Metrics

Total Nodes:    65
Total Edges:    147
Average Degree: 4.52
Graph Density:  3.45%
Isolated Nodes: 3

📝 Nodes by Type

  Project          4 ( 6.2%) ████
  Task             3 ( 4.6%) ███
  Person           3 ( 4.6%) ███
  Adr              4 ( 6.2%) ████

🌟 Hub Nodes (Most Connected)

  MOC - Projects MOC                        23 connections
    Type: Page, In: 15, Out: 8

  Alex Johnson                              18 connections
    Type: Person, In: 12, Out: 6

🔗 Edge Types

  links-to             89 (60.5%)
  belongs-to           24 (16.3%)
  involves             18 (12.2%)
  impacts               8 ( 5.4%)
```

---

## NPM Scripts Reference

Quick reference for all available npm commands:

```bash
# Validation
npm run validate              # Validate frontmatter + links
npm run validate:frontmatter  # Frontmatter only
npm run validate:links        # Links only
npm run validate:all          # Verbose mode

# Health checks
npm run health                # Console output
npm run health:json           # JSON format
npm run health:markdown       # Markdown format
npm run stats                 # Export to VAULT_STATS.md

# Knowledge graph
npm run graph                 # Export graph
npm run graph:metrics         # Show metrics only

# Combined
npm run test                  # Run validate + health
npm run audit                 # Run all checks + graph export
```

---

## Integration Examples

### CI/CD Pipeline (GitHub Actions)

```yaml
name: Vault Quality Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run validate
      - run: npm run health
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running vault validation..."
npm run validate

if [ $? -ne 0 ]; then
  echo "❌ Validation failed. Commit aborted."
  exit 1
fi

echo "✅ Validation passed"
exit 0
```

### Weekly Health Report (Cron Job)

```bash
#!/bin/bash
# Run weekly and send report

cd /path/to/vault
npm run health:markdown > weekly-health-report.md

# Email or commit the report
git add weekly-health-report.md
git commit -m "Weekly health report $(date +%Y-%m-%d)"
git push
```

---

## Configuration

### Excluded Directories

The following directories are excluded from all scans (defined in each script):

```javascript
const EXCLUDED_DIRS = [
  '.git',
  '.obsidian',
  'node_modules',
  '.smart-env',
  'scripts',
  'screenshots'
];
```

### Stale Note Threshold

Notes not modified in 180 days (6 months) are considered stale:

```javascript
const STALE_DAYS = 180;
```

To adjust this, edit the constant in `scripts/health-check.js`.

---

## Troubleshooting

### "Cannot find module" errors

Ensure dependencies are installed:

```bash
npm install
```

### Permission denied errors (Unix/Linux/macOS)

Make scripts executable:

```bash
chmod +x scripts/*.js
```

### Node version errors

These scripts require Node.js 18 or higher. Check your version:

```bash
node --version
```

Update if needed: https://nodejs.org/

### Gray-matter parsing errors

If a file fails to parse, check for:
- Invalid YAML frontmatter syntax
- Unclosed quotes in frontmatter
- Special characters without proper escaping

---

## Development

### Adding New Validations

To add custom validation rules, edit `scripts/validate.js`:

```javascript
// Add to validateTypeSpecific() method
if (noteType === 'CustomType') {
  if (!frontmatter.customField) {
    this.addError(file, 'frontmatter', 'CustomType requires customField');
  }
}
```

### Adding New Metrics

To add custom health metrics, edit `scripts/health-check.js`:

```javascript
// Add to calculateMetrics() method
this.metrics.customMetric = this.notes.filter(note => {
  return note.frontmatter.customCondition === true;
}).length;
```

---

## Technical Details

### Dependencies

- **chalk** (v5.3.0) - Terminal colors and styling
- **glob** (v10.3.10) - File pattern matching
- **gray-matter** (v4.0.3) - YAML frontmatter parsing

### Performance

- **validate.js**: ~50-100 notes/second
- **health-check.js**: ~100-200 notes/second
- **generate-graph.js**: ~100-150 notes/second

Tested on vaults up to 5,000 notes.

### Exit Codes

- **validate.js**:
  - `0` - No errors
  - `1` - Validation errors found

- **health-check.js**: Always exits with `0`
- **generate-graph.js**: Always exits with `0`

---

## Support

For issues or questions:

1. Check this documentation
2. Review script comments in source files
3. Open an issue on GitHub
4. Consult the main vault documentation

---

## License

MIT License - See LICENSE file for details.
