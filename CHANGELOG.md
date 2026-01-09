# Changelog

All notable changes to the Obsidian Architect Vault Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.0.0
