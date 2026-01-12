# Changelog

All notable changes to the Obsidian Architect Vault Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2026-01-12

### Added

#### Hybrid Graph Index System

A pre-computed knowledge graph that enables instant structured queries across your vault. Instead of waiting seconds for grep to search through files, the graph index returns results in ~50ms.

**Why this matters:**
- Grep searches on 1500+ note vaults take 3-5 seconds
- Graph queries return in ~50ms (60-500x faster)
- Encourages exploration - no friction when asking "what else relates to this?"

**Index structure (`.graph/` directory):**
```
.graph/
├── index.json      # Full graph: nodes, edges, backlinks, orphans
├── search.json     # Keyword search index (stemmed terms)
├── quality.json    # Health metrics snapshot
└── types/          # Pre-computed type clusters
    ├── adr.json
    ├── project.json
    ├── meeting.json
    └── ...
```

**Performance benchmarks:**
| Query Type | Grep | Graph Index | Speedup |
|------------|------|-------------|---------|
| Keyword search | ~3s | ~50ms | 60x |
| Type filter | ~2s | ~30ms | 67x |
| Backlink search | ~5s | ~40ms | 125x |
| Orphan detection | ~10s | ~20ms | 500x |

#### New Scripts

- **`scripts/generate-graph-enhanced.js`** - Builds all graph indexes from vault content
  ```bash
  npm run graph:build

  # Output:
  # Building graph index...
  # ✓ Parsed 1,247 notes
  # ✓ Found 3,891 wiki-links
  # ✓ Computed 521 backlinks
  # ✓ Identified 87 orphans
  # Index files written to .graph/
  # Build completed in 2.3s
  ```

- **`scripts/graph-watcher.js`** - Watches vault and auto-rebuilds indexes on change
  ```bash
  npm run graph:watch

  # Output:
  # Watching vault for changes...
  # [10:15:32] Detected change: ADR - Kafka Integration.md
  # [10:15:33] Rebuilding index... done (0.8s)
  ```
  - 1-second debounce batches rapid changes
  - Excludes `.obsidian/`, `node_modules/`, `.git/`

- **`scripts/graph-query.js`** - CLI for structured graph queries
  ```bash
  # Keyword search
  npm run graph:query -- --search "kafka"

  # Type and status filter
  npm run graph:query -- --type Adr --status proposed

  # Backlink search
  npm run graph:query -- --backlinks "Project - Caerus"

  # Special queries
  npm run graph:query -- --orphans
  npm run graph:query -- --broken-links
  npm run graph:query -- --stale
  ```

#### New Claude Code Skills (6 new, 38 total)

- **`/search`** - Smart search that queries graph first, falls back to grep
  ```
  /search kafka                    # Keyword in graph + content
  /search "API gateway"            # Phrase search
  /search type:Adr status:proposed # Combined filters
  /search backlinks:Project - Caerus # Backlink search
  /search orphans                  # Orphaned notes
  /search "event.*driven"          # Regex (grep only)
  ```

  **Query shortcuts:**
  | Shortcut | Expands To |
  |----------|------------|
  | `/search t:Adr` | `--type Adr` |
  | `/search s:active` | `--status active` |
  | `/search p:high` | `--priority high` |
  | `/search b:Note` | `--backlinks "Note"` |
  | `/search orphans` | `--orphans` |
  | `/search broken` | `--broken-links` |
  | `/search stale` | `--stale` |

- **`/graph-query`** - Direct graph queries with natural language parsing
  ```
  /graph-query ADRs with status proposed
  /graph-query orphaned notes
  /graph-query backlinks to "Project - Caerus"
  /graph-query notes not updated in 30 days
  ```

#### Graph-First Search Strategy

Embedded throughout the vault to ensure Claude Code uses the fastest search method:

1. **CLAUDE.md Instructions** - New "Search Strategy" section:
   ```markdown
   ## Search Strategy

   **IMPORTANT:** This vault has a pre-computed knowledge graph index.
   Always query the graph BEFORE using Grep or find commands.

   ### Graph-First Search Order
   1. First: Query the graph index (fast, structured)
   2. Second: Use Grep (only if graph doesn't have needed data)
   3. Third: Use Glob (for file patterns only)
   ```

2. **PreToolUse Hook** - `.claude/hooks/graph-search-hint.sh`
   - Intercepts Grep calls for simple keyword patterns
   - Suggests graph query alternative
   - Output example:
     ```
     💡 Tip: For keyword searches, the graph index is faster. Try:
        node scripts/graph-query.js --search "kafka"
        or /graph-query kafka
     ```

3. **`/search` Skill** - Automatic strategy selection
   - Phase 1: Query graph index
   - Phase 2: Fall back to grep if needed
   - Phase 3: Present combined results

#### When to Use Graph vs Grep

| Use Graph For | Use Grep For |
|---------------|--------------|
| Keyword search | Regex patterns |
| Type/status filters | Content within files |
| Backlink queries | Line-by-line context |
| Orphan detection | Multi-file content search |
| Quick lookups | Precise text matching |

### Changed

- **Skill count**: 32 → 38
- **npm scripts**: Added `graph:build`, `graph:watch`, `graph:query`
- **Hooks**: Added PreToolUse hook for Grep (suggests graph search)
- **CLAUDE.md**: Added Search Strategy section
- **README.md**: Added Graph-First Search to key features, updated skill documentation

### Technical

- Graph indexes are gitignored (`.graph/` in `.gitignore`)
- Indexes rebuild in ~2-3 seconds for 1000+ note vaults
- File watcher uses chokidar for cross-platform compatibility
- Query CLI supports JSON output for scripting: `--output json`

### Migration Guide

**From v1.3.0 (no breaking changes):**

1. Pull latest changes:
   ```bash
   git pull origin main
   ```

2. Install dependencies (if not already):
   ```bash
   npm install
   ```

3. Build initial index:
   ```bash
   npm run graph:build
   ```

4. (Optional) Start watcher for auto-updates:
   ```bash
   npm run graph:watch
   ```

5. `.graph/` is already in `.gitignore`

### Best Practices

**Development workflow:**
```bash
# Start watcher in background
npm run graph:watch &

# Work normally - index auto-updates on file changes
```

**Before presentations/reviews:**
```bash
# Force rebuild for accurate metrics
npm run graph:build
```

**CI/CD integration:**
```bash
npm run graph:build
npm run graph:query -- --broken-links
# Fail build if broken links found
```

---

## [1.3.0] - 2026-01-10

### Added
- **18 New Claude Code Skills** - Expanded from 14 to 32 total skills
  - **Research & Discovery**: `/related`, `/summarize`, `/timeline`, `/find-decisions`
  - **Engineering Management**: `/adr-report`, `/dpia-status`, `/project-snapshot`, `/project-status`
  - **Maintenance**: `/vault-maintenance`, `/check-weblinks`, `/archive`, `/orphans`, `/rename`
  - **Document Processing**: `/document-extract`, `/attachment-audit`, `/sync-notion`
  - **Quick Capture**: `/youtube`, `/incubator`
  - **Reference**: `todos` (guidelines for todo list usage)

- **Incubator System** - New idea lifecycle for research and exploration
  - `Incubator` note type with lifecycle states: seed → exploring → validated → accepted/rejected
  - `IncubatorNote` note type for supporting research linked to ideas
  - Controlled domain taxonomy: architecture, governance, tooling, security, data, documentation, process, ai, infrastructure
  - `+Incubator/` folder structure with README guide
  - `Incubator - MOC.md` with Dataview queries for tracking ideas by status and domain
  - Templates: `+Templates/Incubator.md`, `+Templates/IncubatorNote.md`

- **Rules Directory** - Modular reference documentation in `.claude/rules/`
  - `frontmatter-reference.md` - Quick reference for all frontmatter fields by type
  - `naming-conventions.md` - File and folder naming patterns
  - `quality-patterns.md` - Quality indicators, relationships, and tag taxonomy

- **Archive System** - Soft archiving for vault maintenance
  - `/archive` skill for Project, Task, Page, Person note types
  - `+Archive/` folder structure organised by type
  - Archive metadata fields: `archived`, `archivedDate`, `archivedReason`

- **Parallel Sub-Agent Architecture** - Many skills now use parallel Haiku or Sonnet agents for efficiency
  - Skills marked with "uses sub-agents" launch concurrent Task agents
  - Configurable model selection: `model: "haiku"` for quick tasks, `model: "sonnet"` for analysis

### Changed
- Updated README with new skill count (14 → 32) and Incubator documentation
- Updated CLAUDE.md to document all new skills and conventions
- Note types increased from 13 to 15 (added Incubator, IncubatorNote)
- Enhanced skill categories with Engineering Management and Research sections

### Technical
- All new skills include `context: fork` frontmatter for parallel agent execution
- Skills use consistent patterns for report generation and user prompts
- Incubator integrates with existing Dataview query patterns

---

## [Unreleased]

### Tested
- **Node.js Automation Infrastructure** - All automation scripts verified working
  - `npm install` - Successfully installed 52 packages with 0 vulnerabilities
  - `npm run validate` - Correctly identifies missing frontmatter and broken links (exit code 1 on errors)
  - `npm run health` - Generated comprehensive health metrics (70/100 vault score)
  - `npm run graph:metrics` - Exported knowledge graph (58 nodes, 223 edges, 7.69 avg degree)
  - Performance: ~50-200 notes/second depending on script
  - Test results documented in `/tmp/automation-test-summary.md`

- **Claude Code Skills - Parallel Agent Architecture** - All 3 new skills successfully tested
  - `/weekly-summary` - ✅ PASSED
    - Launched 5 parallel Haiku agents (daily notes, tasks, meetings, ADRs, projects)
    - Completed in ~30 seconds
    - Generated comprehensive weekly summary with statistics, highlights, and trends
  - `/broken-links` - ✅ PASSED
    - Launched 3 parallel Sonnet agents (root, meetings, daily notes scanners)
    - Analyzed 70 broken links in ~45 seconds
    - Link integrity score: 93/100 (60 intentional placeholders, 10 real issues)
    - Generated detailed report with fuzzy match suggestions
  - `/quality-report` - ✅ PASSED
    - Launched 5 parallel Sonnet agents (readability, link density, metadata, structure, freshness)
    - Analyzed 54 notes across 5 dimensions in ~120 seconds
    - Overall vault score: 60/100 (Grade D, adjusts to 75/100 when excluding MOC query artifacts)
    - Generated 500+ line comprehensive report with prioritized recommendations
    - Created 8 supporting analysis files and scripts

- **Quality Analysis Results** - Baseline metrics established for template vault
  - Readability: 8.9/100 (artifact from Dataview queries in MOCs, content notes score 40+)
  - Link Density: 48.1/100 (13 orphans, 82 broken links mostly placeholders)
  - Metadata: 79/100 (37/41 notes with complete frontmatter)
  - Structure: 86/100 (32/37 notes with perfect structure)
  - Freshness: 84.8/100 (0 stale notes, 68.5% tagged)
  - Quick wins identified: 42 minutes of improvements → 75-80/100 score

- **Analysis Scripts Generated** - Quality analysis created reusable tools
  - `scripts/analyze_metadata.py` - Python metadata analyzer
  - `scripts/analyze_metadata.js` - Node.js metadata analyzer (alternative)
  - `scripts/generate_metadata_report.py` - Markdown report generator
  - `scripts/analyze_freshness.py` - Freshness and tag analysis
  - `analyze_structure_comprehensive.py` - Section completeness checker
  - `analyze_links.py` - Link connectivity analyzer
  - `METADATA_ANALYSIS.md` - Comprehensive metadata documentation
  - `VAULT_QUALITY_REPORT.md` - Full quality assessment report

## [1.2.0] - 2026-01-09

### Added
- **Node.js Automation Infrastructure** - Professional-grade vault validation, health checks, and knowledge graph export
  - `package.json` with npm scripts for automation
  - `scripts/validate.js` - Validates frontmatter schema, required fields, date formats, enumerated values, and wiki-links
  - `scripts/health-check.js` - Analyzes vault health with comprehensive metrics and 0-100 quality score
  - `scripts/generate-graph.js` - Exports knowledge graph structure to JSON for visualization
  - `scripts/AUTOMATION.md` - Complete automation documentation with examples
  - `VAULT_AUTOMATION_SETUP.md` - Quick start guide for new users
- **3 New Claude Code Skills** for vault maintenance:
  - `/broken-links` - Comprehensive broken link detection with fuzzy matching suggestions (3 parallel Sonnet sub-agents)
  - `/weekly-summary` - Generate weekly summary from daily notes, meetings, tasks, ADRs, and projects (5 parallel sub-agents)
  - `/quality-report` - Content quality analysis with readability, link density, metadata, structure, and freshness scores (5 parallel Sonnet sub-agents)
- **Quality Scoring System** - Overall vault health score calculated from 5 dimensions: connectivity, freshness, quality, completeness
- **Pre-commit Hook Templates** - Examples for git validation workflow
- **CI/CD Integration Examples** - GitHub Actions workflows for automated quality checks

### Changed
- Updated README with Node.js automation section and revised skill count (11 → 14)
- Updated `.gitignore` to exclude node_modules, automation outputs, and generated files
- Updated `scripts/README.md` to document both Node.js and Python automation tools
- Enhanced Quality Monitoring section in README with automation examples

### Technical
- Dependencies: chalk (v5.3.0), glob (v10.3.10), gray-matter (v4.0.3)
- Node.js 18+ required for ES modules support
- Exit codes for CI/CD integration (validate.js returns 0/1)
- Multiple output formats: console, JSON, markdown

## [1.1.0] - 2026-01-08

### Added
- Screenshots section in README with 6 visual examples (dashboard, projects-moc, adr-example, graph-view, daily-note, quality-dashboard)
- Screenshot capture guide in `screenshots/README.md`
- `/pdf-to-page` skill - Convert PDFs to Page notes with docling and Sonnet/Opus analysis
- `/pptx-to-page` skill - Convert PowerPoint presentations with quick (docling) or visual (LibreOffice) modes
- `/screenshot-analyze` skill - Comprehensive screenshot analysis using 3 Sonnet sub-agents
- `/diagram-review` skill - Architecture diagram analysis using 4 Sonnet sub-agents
- Plugin requirements section in README with installation instructions
- Visual Analysis category in Claude Code Skills section

### Changed
- All existing Claude Code skills now include `context: fork` frontmatter for parallel agent execution
- Updated skill count from 9 to 11 throughout documentation
- Enhanced Prerequisites section with required Obsidian plugins (Dataview, Templater)
- Added optional Python tools documentation (docling, python-pptx, poppler)

## [1.0.0] - 2026-01-07

### Added
- First public release of Obsidian Architect Vault Template
- Metadata-driven organizational framework
- Full Claude Code integration
- Quality indicator system
- Relationship metadata patterns
- Hierarchical tag taxonomy
- Comprehensive README and setup guides

[Unreleased]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.0.0
