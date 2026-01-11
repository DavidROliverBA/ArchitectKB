# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Language

All generated text must be in UK English.

## Repository Overview

This is an Obsidian vault template designed for **Solutions Architects** to manage professional knowledge effectively. The vault supports architecture decisions, project documentation, meeting notes, research ideas, and personal productivity tracking.

**Key Features:**
- Metadata-driven organisation using frontmatter `type` fields
- Architecture Decision Records (ADRs) with relationship tracking
- Incubator system for research and idea development
- Quality indicators for content freshness and confidence
- Claude Code skills for automation and AI-assisted workflows

## Directory Structure

The vault uses a **metadata-driven organisation** where notes are organised by their `type` frontmatter field rather than folders. This enables powerful Dataview queries for navigation.

```
obsidian-architect-vault-template/
├── +Archive/          # Soft-archived notes (organised by type)
│   ├── People/        # Archived person notes
│   ├── Projects/      # Archived project notes
│   └── Tasks/         # Archived task notes
├── +Attachments/      # All media files (images, PDFs, documents)
├── +Daily/            # Daily journal entries (organised by year)
│   ├── 2024/          # 2024 daily notes
│   ├── 2025/          # 2025 daily notes
│   └── [current year] # Current year daily notes
├── +Inbox/            # Landing zone for new notes
├── +Incubator/        # Idea incubator for research and exploration
├── +Meetings/         # All meeting notes
├── +PDFs/             # PDF storage (architecture books, RFI documents)
├── +People/           # Person notes (colleagues, contacts)
├── +Templates/        # Note templates for each type
├── .obsidian/         # Obsidian configuration
├── .claude/           # Claude Code configuration
│   ├── context/       # Dynamic context files
│   ├── rules/         # Modular convention rules
│   └── skills/        # Skill instruction files
└── [root]             # All other content notes
```

### Note Types

Notes are identified by their `type` frontmatter field:

| Type | Description | Location |
|------|-------------|----------|
| `Task` | Task tracking and to-dos | root |
| `Project` | Project documentation | root |
| `Meeting` | Meeting notes and minutes | +Meetings/ |
| `Person` | Contact info and notes on colleagues | +People/ |
| `Weblink` | Saved web links with descriptions | root |
| `Page` | Long-form documentation and guides | root |
| `Adr` | Architecture Decision Records | root |
| `Organisation` | Notes about organisations and vendors | root |
| `AtomicNote` | Small focused notes on specific topics | root |
| `Zettel` | Zettelkasten-style notes (may contain sensitive info) | root |
| `DailyNote` | Daily journal entries | +Daily/[year]/ |
| `Incubator` | Research ideas and concepts being explored | +Incubator/ |
| `IncubatorNote` | Supporting research for incubator ideas | +Incubator/ |
| `Okr` | OKR and goal tracking notes | root |
| `Query` | Saved Dataview queries | root |
| `Course` | Training and course notes | root |
| `MOC` | Maps of Content for navigation | root |
| `Dashboard` | Dashboard views with aggregated queries | root |
| `CodeSnippet` | Reusable code snippets and examples | root |
| `FormSubmission` | Governance and compliance form tracking | root |

### Navigation

Use these Maps of Content (MOC) files to navigate:
- **[[Dashboard - Dashboard]]** - Main hub with Dataview queries
- **[[MOC - Tasks MOC]]** - All tasks by priority/due date
- **[[MOC - Projects MOC]]** - Projects by status
- **[[MOC - People MOC]]** - People directory
- **[[MOC - Meetings MOC]]** - Meeting history
- **[[MOC - ADRs MOC]]** - Architecture Decision Records
- **[[MOC - Vault Quality Dashboard]]** - Quality metrics and freshness tracking
- **[[MOC - Form Submissions]]** - Governance form tracking

## Frontmatter Schema

All notes use YAML frontmatter with a `type` field. Common properties by type:

### Universal Fields (All Notes)
```yaml
type: <note-type>           # Required: Task, Project, Meeting, Person, etc.
title: <title>              # Required: Display title
created: YYYY-MM-DD         # Creation date
modified: YYYY-MM-DD        # Last modified date
tags: []                    # Optional tags for categorisation
```

### Tag Syntax

**In frontmatter (no `#`):**
```yaml
tags: [activity/architecture, technology/aws, project/alpha]
```

**Inline in note body (with `#`):**
```markdown
This relates to #technology/aws and #project/alpha work.
```

Obsidian treats both the same way - the `#` is only needed for inline tags in the note body.

### Type-Specific Fields

**Project:**
```yaml
type: Project
status: active | paused | completed    # Simple string values
priority: high | medium | low
timeFrame: YYYY-MM-DD - YYYY-MM-DD
collections: <program name>
# Transformation Classification
transformationType: modernisation | migration | greenfield | integration | decommission | uplift | null
transformationScope: enterprise | department | team | application | null
aiInvolved: false         # Does project involve AI/ML?
```

**Transformation Types:**
| Type | Description |
|------|-------------|
| `modernisation` | Upgrading existing systems to newer technologies |
| `migration` | Moving systems between platforms (e.g., on-prem to cloud) |
| `greenfield` | Building new capabilities from scratch |
| `integration` | Connecting systems together |
| `decommission` | Retiring legacy systems |
| `uplift` | Security, performance, or compliance improvements |

**Transformation Scope:**
| Scope | Description |
|-------|-------------|
| `enterprise` | Organisation-wide impact |
| `department` | Single department or business unit |
| `team` | Single team impact |
| `application` | Single application or service |

**Task:**
```yaml
type: Task
completed: true | false
priority: high | medium | low
doDate: YYYY-MM-DD | null              # When to start working on it
dueBy: YYYY-MM-DD | null               # Hard deadline
project: "[[Project Name]]" | null
assignedTo: ["[[Person Name]]"]        # Array of assignees
```
> **Note:** Legacy notes may use `due` and `assignee` (singular). New notes use `dueBy`, `doDate`, and `assignedTo` (array).

**Meeting:**
```yaml
type: Meeting
date: 'YYYY-MM-DD'
project: "[[Project Name]]" | null
attendees: ["[[Person Name]]"]        # List of attendee links
summary: <brief summary>              # One-line summary
collections: <category>               # e.g., "1:1", "Sprint Planning"
```
> **Note:** Legacy notes may use `peopleInvolved` (string) instead of `attendees` (array).

**Person:**
```yaml
type: Person
role: <job title>
organisation: "[[Org Name]]" | null
emailAddress: '<email>'
```

**Weblink:**
```yaml
type: Weblink
url: <URL>
domain: <domain>
createdAt: ISO timestamp
```

**DailyNote:**
```yaml
type: DailyNote
date: 'YYYY-MM-DD'
```

**ADR (Architecture Decision Record):**
```yaml
type: Adr
status: proposed | accepted | deprecated | superseded
adrType: Technology_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
description: <one-line description>
project: "[[Project Name]]" | null
externalRef: <ticket reference> | null
deciders: ["[[Person Name]]"]         # Who made the decision
approvers: ["[[Person Name]]"]        # Who approved
stakeholders: ["[[Person Name]]"]     # Who is affected
assumptions: []                       # Key assumptions made

# Relationships (see Relationship Fields section)
relatedTo: []
supersedes: []
dependsOn: []
contradicts: []

# Quality Indicators (see Quality Indicators section)
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis
verified: true | false
reviewed: YYYY-MM-DD

# AI-Specific Fields (for AI_ADR type)
aiProvider: aws-bedrock | azure-openai | openai | google | anthropic | custom | null
aiModel: null             # Model name/version
aiUseCase: generation | classification | extraction | conversation | agents | null
aiRiskLevel: high | medium | low | null
ethicsReviewed: false
biasAssessed: false
dataPrivacyReviewed: false
humanOversight: full | partial | minimal | none | null
```

**AI ADR Human Oversight Levels:**
| Level | Description |
|-------|-------------|
| `full` | Human approval required for all AI outputs |
| `partial` | Human review for high-impact decisions only |
| `minimal` | Spot-check monitoring, automated escalation |
| `none` | Fully autonomous (use with caution) |

**Incubator (Research Idea):**
```yaml
type: Incubator
status: seed | exploring | validated | accepted | rejected
domain: []                    # Controlled list: architecture, governance, tooling, security, data, documentation, process, ai, infrastructure
outcome: null                 # Link to resulting deliverable when accepted
```

**IncubatorNote (Supporting Research):**
```yaml
type: IncubatorNote
parent-ideas: ["[[Incubator - Idea]]"]  # Can link to multiple ideas
```

**FormSubmission (Governance Forms):**
```yaml
type: FormSubmission
formType: DPIA | SecurityReview | RiskAssessment | ChangeRequest | ComplianceCheck | Other
status: draft | submitted | pending | approved | rejected | expired
project: "[[Project Name]]" | null
requestingTeam: null              # Team requiring the form
submittedDate: YYYY-MM-DD | null
responseDate: YYYY-MM-DD | null
expiryDate: YYYY-MM-DD | null     # When approval expires
referenceNumber: null             # External ticket reference
attachments: []                   # Links to related files
```

**OKR (Objectives and Key Results):**
```yaml
type: Okr
status: active | completed | abandoned
period: Q1 2026 | H1 2026 | 2026       # Time period
objective: <main objective>
keyResults: []                          # List of measurable results
project: "[[Project Name]]" | null
```

**Query (Saved Dataview Query):**
```yaml
type: Query
description: <what this query shows>
queryType: table | list | task          # Dataview query type
```

**Course (Training Notes):**
```yaml
type: Course
status: not-started | in-progress | completed
provider: <course provider>
url: <course URL> | null
completedDate: YYYY-MM-DD | null
```

**MOC (Map of Content):**
```yaml
type: MOC
scope: <what this MOC covers>
```

**Dashboard:**
```yaml
type: Dashboard
refreshed: YYYY-MM-DD                   # Last refresh date
```

**CodeSnippet:**
```yaml
type: CodeSnippet
language: python | javascript | bash | yaml | sql | other
purpose: <what this snippet does>
```

### Quality Indicators Pattern

Important notes (ADRs, Pages, Projects) should include quality metadata:

```yaml
# Quality Indicators
confidence: high | medium | low         # How authoritative is this?
freshness: current | recent | stale     # How up-to-date?
source: primary | secondary | synthesis # Where did info come from?
verified: true | false                  # Has it been verified?
reviewed: YYYY-MM-DD                    # Last review date
keywords: []                            # Searchable keywords
summary: <brief summary>                # One-line summary
```

**Guideline Values:**
| Field | Value | Meaning |
|-------|-------|---------|
| `confidence` | `high` | Authoritative, well-researched, definitive |
| `confidence` | `medium` | Good information but some uncertainty |
| `confidence` | `low` | Preliminary, needs verification |
| `freshness` | `current` | Reviewed within 3 months |
| `freshness` | `recent` | Reviewed 3-12 months ago |
| `freshness` | `stale` | Not reviewed in >12 months |
| `source` | `primary` | Created by you, first-hand knowledge |
| `source` | `secondary` | Based on documentation, meetings |
| `source` | `synthesis` | Compiled from multiple sources |

### Relationship Fields Pattern

ADRs and Projects should track relationships to other notes:

```yaml
# Relationships
relatedTo: ["[[Related Note]]"]         # Related decisions, projects, context
supersedes: ["[[Old ADR]]"]             # ADRs this decision replaces
dependsOn: ["[[Foundation ADR]]"]       # ADRs that must exist first
contradicts: ["[[Conflicting ADR]]"]    # Known conflicts (rare)
```

**Guidelines:**
- Use empty arrays `[]` if no relationships (don't omit the field)
- Always quote wiki-links in frontmatter YAML
- Keep relationships up-to-date when decisions change

### Archive Fields

When notes are archived using `/archive`, these fields are added:

```yaml
archived: true
archivedDate: YYYY-MM-DD
archivedReason: "<reason for archiving>"
```

Archived notes are moved to `+Archive/<Type>s/` folder.

## Incubator System

The Incubator is a dedicated space for exploring ideas before committing to formal projects or ADRs.

### Incubator Lifecycle

| Status | Description |
|--------|-------------|
| `seed` | Initial idea capture, minimal research |
| `exploring` | Active research and investigation |
| `validated` | Research complete, ready for decision |
| `accepted` | Graduated to Project, ADR, or Page |
| `rejected` | Decided not to pursue |

### Incubator Domains

Use these controlled domain values:
- `architecture` - Architecture patterns and approaches
- `governance` - Governance processes and standards
- `tooling` - Tools and developer experience
- `security` - Security patterns and compliance
- `data` - Data architecture and management
- `documentation` - Documentation approaches
- `process` - Process improvements
- `ai` - AI and automation opportunities
- `infrastructure` - Infrastructure patterns

### Incubator Commands

| Command | Description |
|---------|-------------|
| `incubator <title>` | Create new idea (no prompts) |
| `incubator <title> [domain]` | Create with domain keywords |
| `incubator note <title> for <idea>` | Create research note |
| `incubator list [filter]` | List by status or domain |
| `incubator status <idea> <status>` | Update lifecycle status |
| `incubator graduate <idea>` | Graduate to Project/ADR/Page |

## Archive System

The Archive provides soft-deletion for completed or abandoned notes while preserving backlinks.

### When to Archive

- Projects that are completed or cancelled
- Tasks that are done or no longer relevant
- People who have left the organisation
- Pages that are superseded by newer content

### Archive Process

1. Use `/archive <note>` command
2. Claude adds archive metadata to frontmatter
3. Note is moved to `+Archive/<Type>s/` folder
4. Backlinks remain intact for reference

### Archive Structure

```
+Archive/
├── People/      # Former colleagues, contacts
├── Projects/    # Completed or cancelled projects
├── Tasks/       # Completed tasks (optional)
└── Pages/       # Superseded documentation
```

## Custom Skills

User-invocable skills are defined in `.claude/skills/`. When the user invokes a skill, read the corresponding file for instructions.

### Daily Workflow
| Command | Description |
|---------|-------------|
| `/daily` | Create today's daily note |
| `/meeting <title>` | Create meeting note with attendees/project |
| `/weekly-summary` | Generate weekly summary from notes |

### Architecture Work
| Command | Description |
|---------|-------------|
| `/adr <title>` | Create new ADR with guided prompts |
| `/project-status <project>` | Generate project status report (uses sub-agents) |
| `/find-decisions <topic>` | Find all decisions about a topic (uses sub-agents) |

### Engineering Management
| Command | Description |
|---------|-------------|
| `/adr-report [period]` | ADR activity report (week/month/all) |
| `/dpia-status [filter]` | DPIA compliance status across projects |
| `/project-snapshot [name]` | Quick status of all active projects |

### Research & Discovery
| Command | Description |
|---------|-------------|
| `/related <topic>` | Find all notes mentioning a topic (uses sub-agents) |
| `/summarize <note>` | Summarise a note or set of notes |
| `/timeline <project>` | Chronological project history (uses sub-agents) |
| `/exec-summary <note>` | Generate non-technical executive summary |

### Governance & Compliance
| Command | Description |
|---------|-------------|
| `/form <type> <name>` | Quick-create form submission tracking note |
| `/form-status [filter]` | Check status of form submissions |

### Maintenance
| Command | Description |
|---------|-------------|
| `/vault-maintenance` | Quarterly health check - all quality checks (uses sub-agents) |
| `/check-weblinks` | Test all weblink URLs for dead/redirected links (uses sub-agents) |
| `/archive <note>` | Soft archive a note (Project, Task, Page, Person) |
| `/orphans` | Find notes with no backlinks (uses sub-agents) |
| `/broken-links` | Find broken wiki-links (uses sub-agents) |
| `/rename <pattern>` | Batch rename files with link updates |
| `/quality-report` | Generate comprehensive quality metrics (uses sub-agents) |

### Document Processing
| Command | Description |
|---------|-------------|
| `/pdf-to-page <path>` | Convert PDF to Page note with extracted PNG images |
| `/pptx-to-page <path>` | Convert PowerPoint to Page note with slide images |
| `/screenshot-analyze <path>` | Comprehensive screenshot analysis with OCR |
| `/diagram-review <path>` | Analyse architecture diagrams and flowcharts |
| `/document-extract <path>` | Extract text from scanned documents/photos |
| `/attachment-audit` | Audit all vault attachments with visual analysis |

### Quick Capture
| Command | Description |
|---------|-------------|
| `/task <title>` | Quick-create task with project/due date |
| `/person <name>` | Create person note from template |
| `/weblink <url>` | Save URL with analysis and summary |
| `/youtube <url>` | Save YouTube video with transcript analysis |
| `incubator <title>` | Quick-create incubator idea |

**Usage**: These are instruction files, not registered Claude Code commands. When the user types a skill command (e.g., `/meeting`) or asks naturally (e.g., "create a meeting note"), read `.claude/skills/<skill>.md` and follow its instructions. Skills marked "uses sub-agents" should launch parallel Task agents for efficiency.

**Note**: Skills work by the assistant reading and executing the instructions - they won't appear in Claude Code's built-in `/` command list.

## Dynamic Context Loading

Additional context files are available in `.claude/context/` to provide deeper domain knowledge without bloating the main context. **Load these files as needed based on user queries:**

| File | Load When User Asks About |
|------|---------------------------|
| `projects-template.md` | Specific project details and status |
| `technology-template.md` | Technical systems, platforms, and tools |
| `people-template.md` | People, teams, stakeholders |
| `acronyms-template.md` | Unknown abbreviations and terminology |
| `architecture-template.md` | ADRs, patterns, governance, compliance |
| `organisations-template.md` | External companies and vendors |

**Usage**: When a query involves specific domain knowledge, read the relevant context file(s) first:
```
Read .claude/context/projects-template.md   # For project-specific queries
Read .claude/context/acronyms-template.md   # When encountering unknown terms
```

**Customisation**: These template files should be renamed (remove `-template` suffix) and populated with your organisation's specific information.

## Modular Rules

Detailed reference documentation is split into focused files in `.claude/rules/`:

| File | Purpose |
|------|---------|
| `frontmatter-reference.md` | Quick reference for all frontmatter fields by type |
| `naming-conventions.md` | File and folder naming patterns |
| `quality-patterns.md` | Quality indicators, relationships, and tag taxonomy |

These provide deeper detail than this main file - load when working on specific conventions.

## Sensitive Information Warning

Notes with `type: Zettel` and some `type: Page` notes may contain API keys, tokens, passwords, and credentials. **AI assistants should NEVER expose, copy, or transmit this sensitive information.**

## Working with This Vault

### Linking Conventions
- Internal links use Obsidian wiki-link syntax: `[[Note Title]]`
- Cross-references between notes create a knowledge graph (use backlinks)
- Status/priority values use simple strings: `active`, `high`, `medium`, `low`

### Creating/Editing Notes
1. Always include appropriate YAML frontmatter with `type` field
2. Place most content notes in the **root directory**
3. Place daily notes in **+Daily/[year]/** folder (e.g., `+Daily/2026/`)
4. Place meeting notes in **+Meetings/** folder
5. Place person notes in **+People/** folder
6. Place incubator ideas and research in **+Incubator/** folder
7. Place attachments in **+Attachments/** folder
8. Place PDF documents in **+PDFs/** folder
9. Use `/archive` to move notes to **+Archive/<Type>s/** folder
10. Use `[[wiki-links]]` for cross-references to other notes
11. Daily notes follow `YYYY-MM-DD.md` naming convention
12. Meeting notes follow `Meeting - YYYY-MM-DD Title.md` naming convention
13. Incubator ideas follow `Incubator - {{Title}}.md` naming convention
14. Include `created` and `modified` date fields

### Filename Conventions

| Type | Filename Pattern | Location | Example |
|------|------------------|----------|---------|
| Person | `{{Name}}.md` | +People/ | `+People/John Smith.md` |
| Meeting | `Meeting - YYYY-MM-DD {{Title}}.md` | +Meetings/ | `+Meetings/Meeting - 2026-01-06 Architecture Review.md` |
| Project | `Project - {{Name}}.md` | root | `Project - Cloud Migration.md` |
| Task | `Task - {{Title}}.md` | root | `Task - Review ADR draft.md` |
| Weblink | `Weblink - {{Title}}.md` | root | `Weblink - AWS Well-Architected Framework.md` |
| ADR | `ADR - {{Title}}.md` | root | `ADR - API Gateway Selection.md` |
| DailyNote | `YYYY-MM-DD.md` | +Daily/[year]/ | `+Daily/2026/2026-01-06.md` |
| Incubator | `Incubator - {{Title}}.md` | +Incubator/ | `+Incubator/Incubator - Event-Driven Architecture.md` |
| IncubatorNote | `Incubator Note - {{Title}}.md` | +Incubator/ | `+Incubator/Incubator Note - Kafka vs RabbitMQ.md` |
| OKR | `OKR - {{Title}}.md` | root | `OKR - Cloud Certification Training.md` |
| Query | `Query - {{Title}}.md` | root | `Query - Open Tasks.md` |
| Course | `Course - {{Title}}.md` | root | `Course - AWS Solutions Architect.md` |
| MOC | `MOC - {{Title}}.md` | root | `MOC - Projects MOC.md` |
| Dashboard | `Dashboard - {{Title}}.md` | root | `Dashboard - Dashboard.md` |
| CodeSnippet | `CodeSnippet - {{Title}}.md` | root | `CodeSnippet - API Authentication.md` |
| FormSubmission | `Form - {{Type}} - {{Name}}.md` | root | `Form - DPIA - Customer Portal.md` |
| Page | `Page - {{Title}}.md` | root | `Page - Architecture Principles.md` |
| Organisation | `Organisation - {{Name}}.md` | root | `Organisation - CloudVendor Inc.md` |
| AtomicNote | `Atomic Note - {{Title}}.md` | root | `Atomic Note - CAP Theorem.md` |

**Note**: Person notes use just the name (no prefix) since the type is in frontmatter. This allows cleaner wiki-links like `[[John Smith]]` - Obsidian resolves links by filename regardless of folder.

### Finding Notes

Use Dataview queries or the MOC files to find notes by type:
```dataview
TABLE title, status, priority
FROM ""
WHERE type = "Task" AND completed = false
SORT priority ASC
```

The vault can sync between desktop and mobile via Git and/or Obsidian Sync.

## Utility Scripts

Python scripts for vault maintenance are in `scripts/`:

| Script | Purpose |
|--------|---------|
| `rename_daily_notes.py` | Rename daily notes from `Daily Note - YYYY-MM-DD.md` to `YYYY-MM-DD.md` |
| `standardize_meetings.py` | Standardise meeting filenames to `Meeting - YYYY-MM-DD Title.md` |
| `extract_pptx.py` | Extract text content from PowerPoint files |
| `pptx_to_page.py` | Convert PowerPoint slides to PNG images and create Page note |
| `pdf_to_page.py` | Convert PDF pages to PNG images and create Page note |
| `analyze_links.py` | Analyse wiki-link connectivity across vault |
| `analyze_structure.js` | Comprehensive vault structure analysis |

Run with `python3 scripts/<script>.py [arguments]`. Most scripts support `--dry-run` flag to preview changes.

## Getting Started

### Initial Setup

1. **Clone or fork this template repository**
2. **Open the vault in Obsidian**
3. **Enable required plugins:**
   - Dataview (for queries and MOCs)
   - Templater (for note templates)
   - Calendar (optional, for daily notes)

### Customisation Steps

1. **Rename context files** - Remove `-template` suffix from files in `.claude/context/`
2. **Populate context files** - Add your organisation's projects, people, technology stack
3. **Update Organisation notes** - Replace example organisations with your vendors/partners
4. **Review templates** - Customise templates in `+Templates/` for your workflow
5. **Set up sync** - Configure Git and/or Obsidian Sync for backup

### Recommended First Steps

1. Create a daily note with `/daily`
2. Add a few Person notes for key colleagues
3. Create your first Project note
4. Try the `/adr` skill to create an Architecture Decision Record
5. Explore the MOC files to understand navigation

## Reference Documentation

- **[[Page - How to Use This Vault]]** - General vault usage guide
- **[[Page - Vault Setup Checklist]]** - Setup verification checklist
- **[[Page - Architecture Principles]]** - Example architecture principles
- **[[MOC - Vault Quality Dashboard]]** - Quality metrics dashboard

For detailed frontmatter, tag, and formatting conventions, see `.claude/vault-conventions.md`

## Support and Contributing

This template is designed to be customised for your organisation's needs. Key areas for customisation:

- **Technology stack** - Update `technology-template.md` with your platforms
- **Project types** - Adjust Project frontmatter for your methodology
- **ADR types** - Add/modify `adrType` values for your domain
- **Tag taxonomy** - Extend hierarchical tags for your organisation

---

**Version:** 1.0
**Template Maintained by:** Solutions Architecture Community
**Review Frequency:** Update as conventions evolve