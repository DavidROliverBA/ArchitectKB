---
type: Page
title: Claude Code Skills Quick Reference
created: 2026-01-28
modified: 2026-01-28
tags:
  - activity/documentation
  - domain/tooling
  - audience/architect

# Quality Indicators
summary: Complete reference for all 62 Claude Code skills with examples, model recommendations, and usage patterns
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-28

# Semantic Discovery
keywords:
  - claude-code
  - skills
  - commands
  - workflow
  - automation
  - ai-assisted

# Relationships
relatedTo:
  - "[Page - How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md)"
  - "[Page - Daily Workflow Guide](Page%20-%20Daily%20Workflow%20Guide.md)"
  - "[Dashboard - Main Dashboard](Dashboard%20-%20Main%20Dashboard.md)"
---

# Claude Code Skills Quick Reference

This guide provides a complete reference for all 62 Claude Code skills available in ArchitectKB. Skills are AI-assisted workflows that automate common architecture tasks.

---

## How Skills Work

Skills are instruction files in `.claude/skills/` that Claude Code reads and executes when you type a command. They work by:

1. **You type a command** (e.g., `/meeting Weekly Sync`)
2. **Claude Code reads the skill file** (`.claude/skills/meeting.md`)
3. **Claude follows the instructions** to create files, search, or analyse
4. **You get the result** (a new meeting note created)

### Model Selection

Each skill has a recommended model indicated by an emoji:

| Emoji | Model  | Cost      | Best For                                |
| ----- | ------ | --------- | --------------------------------------- |
| 🟢    | Haiku  | ~$1/MTok  | Fast tasks, simple templates, bulk work |
| 🟡    | Sonnet | ~$3/MTok  | Balanced analysis, code review          |
| 🔴    | Opus   | ~$15/MTok | Deep reasoning, complex decisions       |

**Tip:** You can override the model for any skill by specifying it: `claude --model opus` then `/adr`.

---

## Skills by Category

### Daily Workflow (🟢 Haiku)

Essential skills for day-to-day work.

| Command            | Description                                | Example                                    |
| ------------------ | ------------------------------------------ | ------------------------------------------ |
| `/daily`           | Create today's daily note                  | `/daily`                                   |
| `/meeting <title>` | Create meeting note with attendees/project | `/meeting Sprint Planning with Jane, Alex` |
| `/weekly-summary`  | Generate weekly summary from notes         | `/weekly-summary`                          |

**Example: Creating a Meeting Note**

```
/meeting Architecture Review for Project - Cloud Migration
```

Creates `+Meetings/Meeting - 2026-01-28 Architecture Review.md` with:

- Frontmatter linking to the project
- Attendees section ready to fill
- Agenda, notes, action items, and decisions sections

---

### Architecture Documentation (🟡 Sonnet / 🔴 Opus)

Skills for creating and maintaining architecture documentation.

| Command                          | Model | Description                                  | Example                                 |
| -------------------------------- | ----- | -------------------------------------------- | --------------------------------------- |
| `/adr <title>`                   | 🔴    | Create Architecture Decision Record          | `/adr Use Kubernetes for Orchestration` |
| `/system <name>`                 | 🟡    | Create comprehensive System note             | `/system Customer Portal`               |
| `/integration <source> <target>` | 🟡    | Document system-to-system integration        | `/integration ERP DataPlatform`         |
| `/architecture <title>`          | 🟡    | Create Architecture HLD/LLD                  | `/architecture Data Platform HLD`       |
| `/scenario <name>`               | 🟡    | Create what-if scenario or future-state plan | `/scenario Cloud Migration Phase 2`     |
| `/datasource <name>`             | 🟡    | Document database, table, API, or dataset    | `/datasource Customer Orders API`       |
| `/dataasset <name>`              | 🟡    | Document data asset with lineage             | `/dataasset Revenue Fact Table`         |
| `/diagram <type>`                | 🟡    | Generate C4, landscape, or AWS diagram       | `/diagram c4-context CustomerPortal`    |
| `/canvas <name>`                 | 🟡    | Create visual Canvas diagram                 | `/canvas System Landscape`              |

**Example: Creating a System Note**

```
/system Payment Gateway
```

Claude will:

1. Check for duplicate systems
2. Ask about technology stack
3. Gather metrics (transactions/sec, availability)
4. Create the note with full documentation structure

---

### Architecture Analysis (🟡 Sonnet)

Skills for analysing and reporting on architecture.

| Command                                  | Description                                  | Example                                    |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| `/architecture-report [filter]`          | Generate architecture documentation report   | `/architecture-report domain:data`         |
| `/cost-optimization [scope]`             | Identify cost savings opportunities          | `/cost-optimization all`                   |
| `/dependency-graph [system]`             | Visualise system dependencies                | `/dependency-graph CustomerPortal`         |
| `/impact-analysis <system>`              | Analyse downstream impact if system fails    | `/impact-analysis PaymentGateway`          |
| `/scenario-compare <baseline> <options>` | Compare architecture scenarios side-by-side  | `/scenario-compare Current CloudMigration` |
| `/system-roadmap`                        | Generate lifecycle roadmap (TIME categories) | `/system-roadmap`                          |
| `/system-sync [source]`                  | Sync systems from external CMDBs             | `/system-sync confluence`                  |

**Example: Impact Analysis**

```
/impact-analysis Payment Gateway
```

Returns:

- Downstream systems that depend on Payment Gateway
- Integration paths affected
- Risk assessment and mitigation options
- Suggested failover procedures

---

### Engineering Management (🟢 Haiku)

Skills for project tracking and governance reporting.

| Command                     | Description                            | Example                           |
| --------------------------- | -------------------------------------- | --------------------------------- |
| `/adr-report [period]`      | ADR activity report (week/month/all)   | `/adr-report month`               |
| `/project-status <project>` | Generate project status report         | `/project-status Cloud Migration` |
| `/project-snapshot [name]`  | Quick status of all active projects    | `/project-snapshot`               |
| `/dpia-status [filter]`     | DPIA compliance status across projects | `/dpia-status pending`            |

**Example: Project Status**

```
/project-status Cloud Migration
```

Generates a report with:

- Overall status and timeline
- Recent meetings and decisions
- Open tasks and blockers
- Linked ADRs and their status

---

### Research & Discovery (🟡 Sonnet)

Skills for finding and summarising information.

| Command                   | Description                              | Example                                |
| ------------------------- | ---------------------------------------- | -------------------------------------- |
| `/related <topic>`        | Find all notes mentioning a topic        | `/related kubernetes`                  |
| `/summarize <note>`       | Summarise a note or set of notes         | `/summarize Project - Cloud Migration` |
| `/timeline <project>`     | Chronological project history            | `/timeline Cloud Migration`            |
| `/exec-summary <note>`    | Generate non-technical executive summary | `/exec-summary ADR - API Gateway`      |
| `/book-search <topic>`    | Search indexed book/PDF content          | `/book-search event sourcing`          |
| `/find-decisions <topic>` | Find all decisions about a topic         | `/find-decisions authentication`       |

**Example: Finding Related Content**

```
/related kafka
```

Returns all notes that mention "kafka":

- ADRs about Kafka decisions
- Systems using Kafka
- Integrations with Kafka topics
- Meeting notes discussing Kafka

---

### Search & Discovery (🟢 Haiku)

Fast search skills using the SQLite index.

| Command                | Description                             | Example                                     |
| ---------------------- | --------------------------------------- | ------------------------------------------- |
| `/q <query>`           | Fast SQLite FTS5 search (~1000x faster) | `/q architecture patterns`                  |
| `/search <query>`      | Smart search (graph first, then grep)   | `/search event driven`                      |
| `/graph-query <query>` | Direct graph queries with filters       | `/graph-query --type Adr --status proposed` |

**Example: Fast Search**

```
/q type:Adr status:proposed
```

Returns all proposed ADRs in milliseconds:

| Path                           | Title                 | Status   |
| ------------------------------ | --------------------- | -------- |
| ADR - API Gateway Selection.md | API Gateway Selection | proposed |
| ADR - Event Streaming.md       | Event Streaming       | proposed |

See [Page - Search and Discovery Guide](Page%20-%20Search%20and%20Discovery%20Guide.md) for detailed query syntax.

---

### Document Processing (🟡 Sonnet)

Skills for converting and analysing documents.

| Command                    | Description                            | Example                                |
| -------------------------- | -------------------------------------- | -------------------------------------- |
| `/pdf-to-page <path>`      | Convert PDF to Page note with images   | `/pdf-to-page +PDFs/Architecture.pdf`  |
| `/pptx-to-page <path>`     | Convert PowerPoint to Page with slides | `/pptx-to-page +Attachments/deck.pptx` |
| `/document-extract <path>` | Extract text from scanned documents    | `/document-extract photo.jpg`          |
| `/attachment-audit`        | Audit all vault attachments            | `/attachment-audit`                    |

**Example: PDF Conversion**

```
/pdf-to-page +PDFs/Cloud Strategy.pdf
```

Creates:

- `Page - Cloud Strategy.md` with extracted text
- PNG images for each page in `+Attachments/`
- Frontmatter with source file reference

---

### Visual Analysis (🟡 Sonnet)

Skills for analysing images and diagrams.

| Command                      | Description                   | Example                            |
| ---------------------------- | ----------------------------- | ---------------------------------- |
| `/screenshot-analyze <path>` | Analyse screenshots with OCR  | `/screenshot-analyze error.png`    |
| `/diagram-review <path>`     | Analyse architecture diagrams | `/diagram-review architecture.png` |

**Example: Diagram Review**

```
/diagram-review +Attachments/system-diagram.png
```

Returns:

- Component identification
- Relationship mapping
- Architecture pattern recognition
- Suggested improvements

---

### Quick Capture (🟢 Haiku)

Fast note creation skills.

| Command            | Description                        | Example                                 |
| ------------------ | ---------------------------------- | --------------------------------------- |
| `/task <title>`    | Quick-create task with priority    | `/task Review ADR draft priority:high`  |
| `/person <name>`   | Create person note                 | `/person Jane Smith`                    |
| `/weblink <url>`   | Save URL with AI summary           | `/weblink https://martinfowler.com/...` |
| `/youtube <url>`   | Save YouTube video with transcript | `/youtube https://youtube.com/...`      |
| `/article <title>` | Create article note                | `/article Cloud Migration Guide`        |
| `/trip <dest>`     | Create trip planning note          | `/trip Barcelona`                       |

**Example: Creating a Task**

```
/task Review API Gateway ADR for Project - Cloud Migration priority:high dueBy:2026-02-01
```

Creates `Task - Review API Gateway ADR.md` with:

- High priority
- Due date set
- Linked to Cloud Migration project

---

### Incubator (🟢 Haiku)

Skills for managing research ideas.

| Command                             | Description                  | Example                                      |
| ----------------------------------- | ---------------------------- | -------------------------------------------- |
| `incubator <title>`                 | Create new idea              | `incubator Event-Driven Architecture`        |
| `incubator <title> [domain]`        | Create with domain keywords  | `incubator AI Observability ai,tooling`      |
| `incubator note <title> for <idea>` | Create research note         | `incubator note Comparison for Event-Driven` |
| `incubator list [filter]`           | List active ideas            | `incubator list exploring`                   |
| `incubator list all`                | Include archived ideas       | `incubator list all`                         |
| `incubator status <idea> <status>`  | Update lifecycle status      | `incubator status Event-Driven validated`    |
| `incubator graduate <idea>`         | Graduate to Project/ADR/Page | `incubator graduate Event-Driven`            |
| `incubator reject <idea>`           | Reject with reason           | `incubator reject Event-Driven`              |

**Incubator Lifecycle:**

```
seed → exploring → validated → accepted/rejected
```

---

### Governance & Compliance (🟢 Haiku)

Skills for tracking governance forms.

| Command                  | Description                     | Example                      |
| ------------------------ | ------------------------------- | ---------------------------- |
| `/form <type> <project>` | Create form submission tracking | `/form DPIA Cloud Migration` |
| `/form-status [filter]`  | Check form submission status    | `/form-status pending`       |

**Form Types:** DPIA, SecurityReview, RiskAssessment, ChangeRequest, ComplianceCheck

---

### Vault Maintenance (🟢 Haiku / 🟡 Sonnet)

Skills for maintaining vault health.

| Command              | Model | Description                         | Example                      |
| -------------------- | ----- | ----------------------------------- | ---------------------------- |
| `/wipe`              | 🟢    | Clear session, generate handoff     | `/wipe`                      |
| `/vault-maintenance` | 🟢    | Quarterly health check              | `/vault-maintenance`         |
| `/orphans`           | 🟢    | Find notes with no backlinks        | `/orphans`                   |
| `/broken-links`      | 🟡    | Find broken wiki-links              | `/broken-links`              |
| `/check-weblinks`    | 🟢    | Test weblink URLs                   | `/check-weblinks`            |
| `/archive <note>`    | 🟢    | Soft archive a note                 | `/archive Project - Old`     |
| `/rename <pattern>`  | 🟢    | Batch rename with link updates      | `/rename Meeting* Meeting -` |
| `/quality-report`    | 🟡    | Generate quality metrics report     | `/quality-report`            |
| `/tag-management`    | 🟢    | Audit and migrate tags              | `/tag-management audit`      |
| `/infographic`       | 🟢    | Regenerate capabilities infographic | `/infographic`               |

**Example: Quality Report**

```
/quality-report
```

Generates comprehensive report:

- Notes by type and status
- Stale content needing review
- Missing metadata
- Quality scores by category

---

### Sync & Integration (🟢 Haiku)

Skills for syncing with external systems.

| Command              | Description                              | Example              |
| -------------------- | ---------------------------------------- | -------------------- |
| `/sync-governance`   | Sync policies/guardrails from Confluence | `/sync-governance`   |
| `/sync-notion`       | Sync meetings from Notion database       | `/sync-notion`       |
| `/sync-notion-pages` | Bidirectional sync with Notion pages     | `/sync-notion-pages` |

---

### Security & Credentials (🟢 Haiku)

Skills for managing secrets via Bitwarden.

| Command               | Description                  | Example                |
| --------------------- | ---------------------------- | ---------------------- |
| `/secrets status`     | Check Bitwarden CLI status   | `/secrets status`      |
| `/secrets get <name>` | Retrieve a secret            | `/secrets get API_KEY` |
| `/secrets list`       | List all vault secrets       | `/secrets list`        |
| `/secrets env`        | Generate environment exports | `/secrets env`         |
| `/secrets setup`      | Initial Bitwarden setup      | `/secrets setup`       |

See [Page - Secrets and Security Setup Guide](Page%20-%20Secrets%20and%20Security%20Setup%20Guide.md) for detailed setup.

---

## Skill Selection Decision Tree

Use this flowchart to choose the right skill:

```
Need to create something?
├── Daily note → /daily
├── Meeting note → /meeting
├── Task → /task
├── Person → /person
├── ADR → /adr
├── System documentation → /system
├── Integration doc → /integration
└── Research idea → incubator

Need to find something?
├── Fast text search → /q
├── Related notes → /related
├── All decisions on topic → /find-decisions
├── Project timeline → /timeline
└── Book/PDF content → /book-search

Need to analyse?
├── Project status → /project-status
├── System impact → /impact-analysis
├── Cost savings → /cost-optimization
├── Dependencies → /dependency-graph
└── Scenario comparison → /scenario-compare

Need to process documents?
├── PDF → /pdf-to-page
├── PowerPoint → /pptx-to-page
├── Screenshot → /screenshot-analyze
└── Architecture diagram → /diagram-review

Need to maintain vault?
├── Health check → /vault-maintenance
├── Find orphans → /orphans
├── Check links → /broken-links
├── Quality metrics → /quality-report
└── Archive old note → /archive
```

---

## Multi-Skill Workflows

### New System Documentation

```
1. /system CustomerPortal           # Create system note
2. /integration ERP CustomerPortal  # Document integrations
3. /diagram c4-context CustomerPortal # Generate diagram
4. /adr CustomerPortal Tech Stack   # Document decisions
```

### Weekly Review

```
1. /weekly-summary                  # Generate summary
2. /quality-report                  # Check vault health
3. /orphans                         # Find unlinked notes
4. /form-status pending             # Check governance
```

### Research Project

```
1. incubator AI Observability       # Create idea
2. incubator note Tools Review for AI Observability
3. /related observability           # Find existing content
4. /book-search observability       # Search PDFs
5. incubator graduate AI Observability  # When ready
```

---

## Model Selection Guide

| Task Type                      | Recommended Model    | Rationale                         |
| ------------------------------ | -------------------- | --------------------------------- |
| Quick capture (daily, meeting) | 🟢 Haiku             | Speed, low cost                   |
| Document processing            | 🟡 Sonnet            | Balanced extraction quality       |
| Code review, analysis          | 🟡 Sonnet            | Good reasoning                    |
| ADR creation                   | 🔴 Opus              | Deep analysis needed              |
| Complex multi-step tasks       | 🟡 Sonnet + 🟢 Haiku | Sonnet coordinates, Haiku workers |

**Cost Awareness:**

- Haiku: ~$1/$5 per MTok (input/output)
- Sonnet: ~$3/$15 per MTok
- Opus: ~$15/$75 per MTok

For high-volume tasks (bulk imports, large audits), prefer Haiku.

---

## Quick Reference Table

| Category       | Count  | Key Skills                                          |
| -------------- | ------ | --------------------------------------------------- |
| Daily Workflow | 3      | `/daily`, `/meeting`, `/weekly-summary`             |
| Architecture   | 9      | `/adr`, `/system`, `/integration`, `/diagram`       |
| Analysis       | 7      | `/impact-analysis`, `/cost-optimization`            |
| Management     | 4      | `/project-status`, `/adr-report`                    |
| Research       | 6      | `/q`, `/related`, `/find-decisions`                 |
| Documents      | 4      | `/pdf-to-page`, `/pptx-to-page`                     |
| Visual         | 2      | `/screenshot-analyze`, `/diagram-review`            |
| Quick Capture  | 6      | `/task`, `/person`, `/weblink`                      |
| Incubator      | 7      | `incubator`, `incubator list`, `incubator graduate` |
| Governance     | 2      | `/form`, `/form-status`                             |
| Maintenance    | 10     | `/vault-maintenance`, `/quality-report`, `/orphans` |
| Sync           | 3      | `/sync-governance`, `/sync-notion`                  |
| Security       | 5      | `/secrets status`, `/secrets get`                   |
| **Total**      | **62** |                                                     |

---

## Related Guides

- [Page - Daily Workflow Guide](Page%20-%20Daily%20Workflow%20Guide.md) - How to use skills in your daily routine
- [Page - Search and Discovery Guide](Page%20-%20Search%20and%20Discovery%20Guide.md) - Deep dive on search skills
- [Page - Architecture Workflow Guide](Page%20-%20Architecture%20Workflow%20Guide.md) - Multi-skill architecture workflows
- [Page - Diagram and Visualisation Guide](Page%20-%20Diagram%20and%20Visualisation%20Guide.md) - Creating diagrams
- [Page - Claude Code with AWS Bedrock Guide](Page%20-%20Claude%20Code%20with%20AWS%20Bedrock%20Guide.md) - Using Bedrock models
- [Page - Secrets and Security Setup Guide](Page%20-%20Secrets%20and%20Security%20Setup%20Guide.md) - Credential management
- [Page - How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md) - General vault usage

---

## Troubleshooting

**Skills not working?**

1. Ensure Claude Code is running from vault root: `pwd`
2. Check `.claude/skills/` directory exists
3. Verify `CLAUDE.md` is present
4. Try: `claude settings show`

**Wrong model being used?**

Override explicitly: `claude --model opus` then run your skill.

**Need help with a skill?**

Read the skill file directly: `cat .claude/skills/<skill>.md`
