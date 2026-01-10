# Changelog

All notable changes to the Obsidian Architect Vault Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.0.0
