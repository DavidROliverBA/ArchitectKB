# Changelog

All notable changes to the Obsidian Architect Vault Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.8.2] - 2026-01-21

### Added

#### Claude Code Hooks System

Added 10 Claude Code hooks for automated vault quality enforcement and workflow automation:

**PreToolUse Hooks:**

- **`graph-search-hint.sh`** - Suggests using graph index instead of grep for keyword searches (existing)

**PostToolUse Hooks:**

- **`code-formatter.py`** - Auto-formats files after Edit/Write based on extension
  - JavaScript/TypeScript: Prettier
  - Python: Black
  - Go: gofmt
  - Rust: rustfmt
  - Shell: shfmt

- **`file-protection.py`** - Blocks edits to sensitive files
  - Environment files (.env, .env.\*)
  - Lock files (package-lock.json, yarn.lock, etc.)
  - Credential files (credentials.json, secrets.\*, etc.)
  - Key files (_.key, _.pem)

- **`filename-convention-checker.py`** - Validates markdown filenames follow vault naming conventions
  - Checks for correct type prefixes (Meeting -, Project -, ADR -, etc.)
  - Validates date formats in meeting notes
  - Warns about naming inconsistencies

- **`frontmatter-validator.py`** - Validates YAML frontmatter fields and values
  - Checks required fields by note type
  - Validates enumerated values (status, priority, etc.)
  - Validates date formats (ISO 8601)
  - Checks for common YAML syntax errors

- **`tag-taxonomy-enforcer.py`** - Ensures tags follow hierarchical taxonomy
  - Validates tag prefixes (activity/, domain/, project/, technology/, etc.)
  - Warns about flat tags that should be hierarchical
  - Checks for uppercase violations
  - Customizable project and vendor lists

- **`wiki-link-checker.py`** - Checks if wiki-links point to existing notes
  - Validates `[[Note Title]]` links after edits
  - Reports broken links with suggestions
  - Handles aliased links `[[Note|Alias]]`

**UserPromptSubmit Hooks:**

- **`secret-detection.py`** - Detects potential secrets in user prompts
  - API keys and tokens
  - Connection strings
  - Passwords in commands
  - Private keys

- **`skill-context-loader.sh`** - Auto-loads context files based on skill commands
  - Detects `/person`, `/meeting`, `/project-status`, `/adr`, etc.
  - Loads relevant context from `.claude/context/`
  - Customizable organisation and acronym detection

**Notification Hook:**

- **`notify.sh`** - macOS desktop notification helper
  - Used by other hooks for alerts
  - Supports title and message parameters

### Technical

- All hooks include `CUSTOMIZE:` comments for organisation-specific configuration
- Exit codes follow Claude Code conventions: 0=success, 1=error (non-blocking), 2=block
- Python hooks use standard library only (no external dependencies)
- Shell hooks support bash and are POSIX-compatible where possible
- Hooks are executable (`chmod +x`) and ready to use

### Configuration

To enable hooks, add to `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Grep", "command": ".claude/hooks/graph-search-hint.sh" }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "command": ".claude/hooks/frontmatter-validator.py"
      },
      {
        "matcher": "Edit|Write",
        "command": ".claude/hooks/tag-taxonomy-enforcer.py"
      },
      {
        "matcher": "Edit|Write",
        "command": ".claude/hooks/wiki-link-checker.py"
      },
      {
        "matcher": "Edit|Write",
        "command": ".claude/hooks/filename-convention-checker.py"
      },
      { "matcher": "Edit|Write", "command": ".claude/hooks/code-formatter.py" }
    ],
    "UserPromptSubmit": [
      { "matcher": "", "command": ".claude/hooks/secret-detection.py" },
      { "matcher": "", "command": ".claude/hooks/skill-context-loader.sh" }
    ]
  }
}
```

## [1.8.1] - 2026-01-21

### Changed

#### Skills Documentation Improvements

Updated multiple skills and rules files for better consistency and accuracy:

- **`task.md` skill** - Updated to use correct date fields (`dueBy` for hard deadline, `doDate` for start date) and `assignedTo` array format instead of legacy singular fields
- **`meeting.md` skill** - Added `collections` field for meeting categorisation (e.g., "1:1", "Sprint Planning")
- **`form.md` skill** - Changed from flat tags to hierarchical tags with domain lookup table (`domain/data`, `domain/security`, `domain/operations`)

#### Rules Documentation Improvements

- **`frontmatter-reference.md`** - Added `keywords` field to ADR and Article quality indicators sections
- **`quality-patterns.md`** - Expanded tag prefixes table with all 9 hierarchies, added minimum tags guidance table with 9 note types
- **`tag-management.md`** - Updated references section to point to authoritative sources

### Technical

- All changes align with hierarchical tag taxonomy requirements
- Skills now use consistent field naming patterns matching frontmatter-reference.md
- Documentation cross-references updated to remove circular dependencies

## [1.7.1] - 2026-01-16

### Added

#### `/wipe` - Session Context Handoff

New skill for managing Claude Code session context:

- **Auto-detects environment**: tmux (automated) vs other terminals (manual workflow)
- **Generates structured handoff**: What we're working on, current state, decisions, changes, next steps
- **tmux mode**: Fully automated - clears scrollback, runs `/clear`, pastes handoff (~12s)
- **Manual mode**: Copies to clipboard, provides step-by-step instructions
- **Variants**: `/wipe quick` (minimal) and `/wipe detailed` (comprehensive)
- **Cross-platform clipboard**: macOS (pbcopy), WSL (clip.exe), Linux (xclip), Wayland (wl-copy)

Based on the [GGPrompts wipe workflow](https://gist.github.com/GGPrompts/62bbf077596dc47d9f424276575007a1).

#### BM25 Relevance Ranking for Graph Search

The graph-query.js script now uses **BM25 (Best Match 25) relevance ranking** for search queries:

- **Ranked Results**: Search results are sorted by relevance score, not just filtered
- **IDF Weighting**: Rare terms (like "kafka") score higher than common terms
- **Term Frequency Saturation**: Mentioning a term multiple times has diminishing returns
- **Document Length Normalisation**: Short and long notes are fairly compared
- **Relevance Scores**: Output includes numerical scores for each result

**Example Output:**

```
Score   Type           Title
14.65   Page           Kafka Integration Solution Architecture
11.32   Integration    ERP → Data Lake
9.45    System         Data Platform
```

**JSON Output** now includes scores for programmatic use:

```json
{ "id": "...", "score": "14.650", "type": "Page", "title": "..." }
```

### Changed

- Added `/wipe` to CLAUDE.md Maintenance skills section
- Updated `/graph-query` skill to document BM25 ranking behaviour
- Updated `/search` skill to show relevance scores in output format
- Updated CLAUDE.md Search Strategy section to mention BM25 ranking
- Updated README.md to highlight BM25 in feature list and scripts section

### Technical Details

- Pure JavaScript implementation - no new dependencies
- BM25 parameters: k1=1.5 (saturation), b=0.75 (length normalisation)
- Index built at load time from existing search.json
- Query time remains ~50ms for 1500+ notes

## [1.7.0] - 2026-01-15

### Added

#### 14 New Architecture Documentation & Analysis Skills

Complete AI-assisted workflow for building enterprise architecture knowledge graphs:

- **`/system <name>`** - Create comprehensive System notes
  - Checks for duplicates before creating
  - Guided prompts for tech stack, metrics, SLAs, costs
  - Searches Confluence/CMDB for existing system information
  - Generates structured frontmatter with relationships

- **`/integration <source> <target>`** - Document system integrations
  - Links to existing System notes or offers to create them
  - Guided prompts for pattern, latency, data volume, error handling
  - Validates integration patterns and technology choices
  - Creates bidirectional relationship metadata

- **`/architecture <title>`** - Create HLD/LLD architecture notes
  - Types: high-level-design, low-level-design, c4-context, c4-container, aws-architecture
  - Links systems and integrations
  - Documents NFRs, deployment topology, design decisions
  - Generates diagrams and visual representations

- **`/scenario <name>`** - What-if analysis and planning
  - Types: current-state, future-state, alternative-option, risk-mitigation
  - Financial analysis with setup and recurring costs
  - Risk assessment with mitigation strategies
  - Timeline and roadmap planning

- **`/datasource <name>`** - Document data entities
  - Types: database-table, api-endpoint, data-lake, stream
  - Schema documentation and access methods
  - Data classification and volume metrics
  - Ownership and governance information

- **`/diagram <type>`** - Generate architecture diagrams
  - C4 context, container, component diagrams
  - System landscape maps
  - Data flow diagrams
  - AWS infrastructure diagrams
  - Integration pattern visualizations

- **`/canvas <name>`** - Create visual Canvas diagrams
  - System landscape with automatic node positioning
  - C4 context diagrams
  - Data flow architectures
  - Obsidian Canvas format for interactive editing

- **`/architecture-report [filter]`** - Generate comprehensive reports
  - System inventory with metrics and costs
  - Integration matrix showing all connections
  - Cost analysis by system and vendor
  - Technology stack breakdown
  - Critical system identification

- **`/cost-optimization [scope]`** - Identify savings opportunities
  - Analyze underutilized resources
  - Right-sizing recommendations
  - Contract optimization suggestions
  - Cost per transaction/user analysis
  - ROI calculations for optimization initiatives

- **`/dependency-graph [system]`** - Visualize dependencies
  - System dependency trees
  - Identify single points of failure
  - Critical path analysis
  - Blast radius calculations
  - Circular dependency detection

- **`/impact-analysis <system>`** - Failure impact assessment
  - Downstream consumer identification
  - Integration path tracing
  - Risk scoring and mitigation strategies
  - Business impact quantification
  - Recovery priority recommendations

- **`/scenario-compare <baseline> <options>`** - Compare scenarios
  - Side-by-side comparison matrix
  - Cost/benefit analysis
  - Risk assessment comparison
  - Timeline and effort comparison
  - Recommendation engine

- **`/system-sync [source]`** - Sync from external CMDBs
  - ServiceNow integration
  - Jira project system sync
  - Confluence Application Library sync
  - Automatic frontmatter generation
  - Duplicate detection and merging

- **`/tag-management [action]`** - Tag quality management
  - Audit flat tags and suggest hierarchical alternatives
  - Migrate tags to official taxonomy
  - Validate tag usage across vault
  - Generate tag usage reports
  - Identify orphan and unused tags

#### 6 New Note Templates

- **`Architecture.md`** - High-level/low-level design template with guided sections for scope, systems, integrations, NFRs, deployment, decisions
- **`Integration.md`** - System-to-system integration documentation with pattern, protocol, data flow, error handling, quality checks
- **`Scenario.md`** - What-if scenario planning with cost/benefit analysis, risk assessment, timeline, recommendations
- **`System.md`** - Enterprise system documentation with tech stack, metrics, SLAs, costs, owners, relationships
- **`DataSource.md`** - Database, API, data entity template with schema, access, classification, volume, governance
- **`EAKB Submission.md`** - Enterprise Architecture Knowledge Base submission tracking

#### 5 New Note Types

Architecture knowledge graph building blocks:

| Type           | Purpose                                     | Example                                 |
| -------------- | ------------------------------------------- | --------------------------------------- |
| `System`       | Enterprise systems, applications, platforms | `System - Customer Data Platform.md`    |
| `Integration`  | System-to-system data integrations          | `Integration - SAP to Data Lake.md`     |
| `Architecture` | HLDs, LLDs, C4 diagrams                     | `Architecture - Cloud Migration HLD.md` |
| `Scenario`     | What-if scenarios, future-state plans       | `Scenario - Multi-Cloud Strategy.md`    |
| `DataSource`   | Databases, tables, APIs, datasets           | `DataSource - Customers Table.md`       |

### Changed

- **Skill count**: 38 → 52 (14 new architecture skills)
- **Note types**: 19 → 21 (5 new architecture types)
- **Templates**: 14 → 21 (6 new + 1 updated ADR template)
- **README.md**: Added "Architecture Documentation & Analysis" section with comprehensive descriptions
- **CLAUDE.md**: Updated Note Types table, added Architecture Documentation & Analysis skills section, added frontmatter schemas for 5 new types

### Technical

- All 14 new skills include `context: fork` frontmatter for parallel agent execution
- Skills use consistent guided prompt patterns for data collection
- Integration with graph index for duplicate detection and relationship discovery
- External system sync capabilities (ServiceNow, Jira, Confluence)
- Tag management includes migration scripts and taxonomy validation

### Migration Guide

**From v1.4.0 (no breaking changes):**

1. Pull latest changes:

   ```bash
   git pull origin main
   ```

2. Review new templates in `+Templates/`:
   - `Architecture.md`
   - `Integration.md`
   - `Scenario.md`
   - `System.md`
   - `DataSource.md`
   - `EAKB Submission.md`

3. Customize templates for your organization:
   - Replace placeholder system names with your systems
   - Update cost currency and metrics
   - Adjust technology stacks to match your environment
   - Configure CMDB sync sources if using `/system-sync`

4. Start building your architecture knowledge graph:
   ```bash
   /system MyFirstSystem              # Create a system
   /integration System1 System2       # Document integration
   /architecture "Project HLD"        # Design architecture
   /scenario "Cloud Migration Plan"   # Plan scenarios
   ```

### Best Practices

**Building Architecture Knowledge Graphs:**

1. Start with critical systems: Document your most important systems first using `/system`
2. Document integrations: Use `/integration` to map data flows between systems
3. Create baseline architecture: Use `/architecture` for current-state HLD
4. Plan future states: Use `/scenario` for migration or modernization planning
5. Analyze costs: Use `/cost-optimization` to identify savings
6. Assess risks: Use `/dependency-graph` and `/impact-analysis` for resilience planning

**Tag Management Workflow:**

```bash
# Audit tags
/tag-management audit

# Migrate flat tags to hierarchical
/tag-management migrate --dry-run
/tag-management migrate

# Validate against taxonomy
/tag-management validate
```

**External System Sync:**

```bash
# Sync from Confluence Application Library
/system-sync confluence

# Sync from ServiceNow CMDB
/system-sync servicenow

# Sync specific Jira project systems
/system-sync jira --project MYPROJ
```

---

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
  npm run graph:query -- --backlinks "Project - MyProject"

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
  /search backlinks:Project - MyProject # Backlink search
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
  /graph-query backlinks to "Project - MyProject"
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

| Use Graph For       | Use Grep For              |
| ------------------- | ------------------------- |
| Keyword search      | Regex patterns            |
| Type/status filters | Content within files      |
| Backlink queries    | Line-by-line context      |
| Orphan detection    | Multi-file content search |
| Quick lookups       | Precise text matching     |

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

[Unreleased]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.8.2...HEAD
[1.8.2]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.8.1...v1.8.2
[1.8.1]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.7.1...v1.8.1
[1.7.1]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.4.0...v1.7.0
[1.4.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.0.0
