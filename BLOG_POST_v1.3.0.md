# Obsidian Architect Vault Template v1.3.0: Incubator System, 32 Skills, and Research Workflows

**Published:** 2026-01-10
**Author:** David Oliver
**Repository:** https://github.com/DavidROliverBA/obsidian-architect-vault-template
**Release:** [v1.3.0](https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.3.0)

---

## Introduction

Today I'm releasing **v1.3.0** of the Obsidian Architect Vault Template—the biggest update yet. This release more than doubles the number of Claude Code skills (from 14 to 32), introduces a complete **Incubator system** for managing research ideas, and adds professional-grade engineering management workflows.

Whether you're tracking DPIA compliance across projects, exploring a new architectural pattern, or generating status reports for stakeholders, v1.3.0 has you covered.

**What's new:**
- **18 new Claude Code skills** (32 total)
- **Incubator system** for research idea lifecycle management
- **Rules directory** with modular reference documentation
- **Archive system** for soft-archiving notes
- **Engineering management skills** for professional reporting

---

## The Incubator System: From Idea to Implementation

### The Problem

As architects, we constantly encounter interesting ideas:
- "What if we used event sourcing for the audit trail?"
- "Could a service mesh simplify our observability?"
- "Is there a better pattern for our API versioning?"

These ideas often get lost in meeting notes, forgotten in daily journals, or half-explored before being abandoned. We needed a structured way to capture, explore, validate, and ultimately implement (or reject) ideas.

### The Solution: Idea Lifecycle Management

The new **Incubator system** provides a complete workflow for managing research ideas:

```
seed → exploring → validated → accepted/rejected
```

**Each stage has meaning:**

| Status | Description | Action |
|--------|-------------|--------|
| `seed` | Just captured, not yet explored | Worth investigating? |
| `exploring` | Actively researching | Gathering evidence |
| `validated` | Research complete, decision pending | Ready for review |
| `accepted` | Idea approved, moving to implementation | Graduate to Project/ADR |
| `rejected` | Idea not viable (documented why) | Archive learnings |

### Two New Note Types

**Incubator** (`Incubator - Title.md`)
```yaml
type: Incubator
status: exploring
domain: [architecture, security]
outcome: null  # Links to resulting ADR/Project when accepted
```

The main idea note containing:
- Problem statement
- Hypothesis
- Research questions
- Current findings
- Decision criteria

**IncubatorNote** (`Incubator Note - Title.md`)
```yaml
type: IncubatorNote
parent-ideas: ["[[Incubator - Service Mesh Evaluation]]"]
```

Supporting research notes that can link to multiple ideas:
- Vendor comparisons
- Proof of concept results
- Meeting notes from discovery sessions
- External research summaries

### Domain Taxonomy

Categorise ideas for filtering and discovery:

- `architecture` - Patterns, approaches, design decisions
- `governance` - Standards, processes, compliance
- `tooling` - Development tools, automation
- `security` - Security patterns, controls
- `data` - Data architecture, analytics
- `documentation` - Knowledge management, docs
- `process` - Workflows, ceremonies
- `ai` - AI/ML applications
- `infrastructure` - Platform, cloud, networking

### The Incubator MOC

A new Map of Content (`Incubator - MOC.md`) provides:

```dataview
TABLE status, domain, file.mtime as "Last Updated"
FROM ""
WHERE type = "Incubator"
SORT status ASC
```

**Views include:**
- Ideas by status (what needs attention)
- Ideas by domain (thematic grouping)
- Recently updated (what's active)
- Stale ideas (needs decision or archival)

### Quick Capture

Start capturing ideas immediately:

```
/incubator Service Mesh for Observability
```

Creates a properly structured Incubator note with:
- Frontmatter template
- Section headings
- Research questions
- Decision criteria

---

## 18 New Claude Code Skills

v1.3.0 more than doubles the skill count from 14 to 32. Here's what's new:

### Engineering Management Skills

**For stakeholder reporting and compliance tracking:**

| Skill | Description |
|-------|-------------|
| `/project-status <project>` | Generate comprehensive project status report |
| `/project-snapshot [name]` | Quick status of all active projects with health indicators |
| `/adr-report [period]` | ADR activity report (week/month/all) |
| `/dpia-status [filter]` | DPIA compliance status across projects |

**Example: `/project-snapshot`**

Generates:
```markdown
# Projects Snapshot
**Generated**: 2026-01-10

## Executive Summary
- **Total Active Projects**: 8
- **On Track**: 🟢 5
- **At Risk**: 🟡 2
- **Blocked**: 🔴 1

## Projects by Status

### 🟢 On Track (5 projects)

#### [[Project - Cloud Migration]]
- **Health**: 🟢 On track
- **Recent Progress**:
  - ✅ 2 ADRs completed
  - 📅 Last meeting: 2026-01-07
- **Next Actions**:
  - AWS deployment planning
```

**Perfect for:** Weekly standup prep, stakeholder updates, portfolio reviews.

### Research & Discovery Skills

**For finding and synthesising information:**

| Skill | Description |
|-------|-------------|
| `/related <topic>` | Find all notes mentioning a topic |
| `/summarize <note>` | Summarise a note or set of notes |
| `/timeline <project>` | Chronological project history |
| `/find-decisions <topic>` | Find all decisions about a topic |

**Example: `/timeline Cloud Migration`**

Generates:
```markdown
# Project Timeline: Cloud Migration

## 2026-01
- **2026-01-10** - Meeting: Architecture Review
- **2026-01-08** - ADR Accepted: Use Kubernetes
- **2026-01-05** - Task Completed: Security audit

## 2025-12
- **2025-12-15** - Meeting: Stakeholder Kickoff
- **2025-12-10** - Project Created
```

**Perfect for:** Project retrospectives, onboarding, context recovery.

### Vault Maintenance Skills

**For keeping your vault healthy:**

| Skill | Description |
|-------|-------------|
| `/vault-maintenance` | Quarterly comprehensive health check |
| `/check-weblinks` | Test all URLs for dead/redirected links |
| `/archive <note>` | Soft archive a note |
| `/rename <pattern>` | Batch rename with link updates |

**Example: `/vault-maintenance`**

Launches 5 parallel sub-agents to check:
1. Orphaned notes (no backlinks)
2. Broken wiki-links
3. Stale content (not updated in 12+ months)
4. Missing metadata
5. Naming convention violations

**Output:**
```markdown
# Vault Maintenance Report
**Generated**: 2026-01-10

## Health Score: 85/100

### Issues Found
- 🔴 3 broken links
- 🟡 7 stale ADRs (not reviewed in 12+ months)
- 🟡 2 orphaned notes
- 🟢 Naming conventions: 98% compliant

### Recommended Actions
1. Fix broken links (5 minutes)
2. Review stale ADRs (30 minutes)
3. Link or archive orphaned notes (10 minutes)
```

### Document Processing Skills

**For extracting knowledge from documents:**

| Skill | Description |
|-------|-------------|
| `/document-extract <path>` | OCR and extract text from scanned docs |
| `/attachment-audit` | Audit all vault attachments |
| `/sync-notion` | Sync meetings from Notion database |

**Example: `/document-extract whiteboard-photo.jpg`**

Uses Sonnet sub-agents to:
1. **Extract text** - OCR all visible text
2. **Analyse structure** - Identify document type and layout
3. **Classify content** - Extract entities, dates, action items
4. **Assess quality** - Confidence scores, unclear sections

**Output:**
```markdown
# Document Extraction

**Source**: whiteboard-photo.jpg
**Type**: Meeting whiteboard
**Quality Score**: High

## Extracted Content

### Architecture Decisions
- Use PostgreSQL for transactional data
- Redis for caching layer
- Kafka for event streaming

### Action Items
- [ ] Draft ADR for database selection
- [ ] Spike: Redis cluster sizing
```

### Quick Capture Skills

**For fast note creation:**

| Skill | Description |
|-------|-------------|
| `/youtube <url>` | Save video with transcript analysis |
| `/incubator <title>` | Quick-create incubator idea |

**Example: `/youtube https://youtube.com/watch?v=...`**

Creates a Weblink note with:
- Video metadata (title, channel, duration)
- AI-generated summary
- Key points and timestamps
- Related vault notes

---

## The Rules Directory

v1.3.0 introduces `.claude/rules/`—modular reference documentation that Claude Code can consult without bloating the main context.

### Why Rules?

The main `CLAUDE.md` file was growing large. Rules split out detailed references:

| File | Purpose |
|------|---------|
| `frontmatter-reference.md` | Quick reference for all frontmatter fields by type |
| `naming-conventions.md` | File and folder naming patterns |
| `quality-patterns.md` | Quality indicators, relationships, tag taxonomy |

### Benefits

**For Claude Code:**
- Load specific rules as needed
- Smaller main context
- More accurate guidance

**For Users:**
- Easy reference documentation
- Consistent patterns
- Clear conventions

**Example: `frontmatter-reference.md`**

```yaml
### Task
type: Task
completed: false
priority: high | medium | low
doDate: null              # When to start
dueBy: null               # Hard deadline
project: null             # "[[Project]]"
assignedTo: []            # ["[[Person]]"]
```

---

## The Archive System

Not every note stays relevant forever. The new archive system provides **soft archiving** that preserves notes while removing them from active views.

### How It Works

```
/archive Project - Legacy Decommission
```

**What happens:**
1. Adds archive metadata:
   ```yaml
   archived: true
   archivedDate: 2026-01-10
   archivedReason: "Project completed successfully"
   ```

2. Moves to `+Archive/Projects/` folder

3. Preserves all backlinks

4. Excludes from active Dataview queries

### Archive Structure

```
+Archive/
├── People/        # Former colleagues, contacts
├── Projects/      # Completed or cancelled projects
├── Tasks/         # Old tasks
└── Pages/         # Outdated documentation
```

### When to Archive

**Archive when:**
- Project completed (keep for reference)
- Person left organisation (preserve meeting history)
- Task superseded (decision changed)
- Documentation outdated (replaced by newer version)

**Delete when:**
- Duplicate content
- Test/scratch notes
- No future reference value

---

## Parallel Sub-Agent Architecture

Many v1.3.0 skills use **parallel sub-agents** for efficiency:

```markdown
## Skills with Sub-Agents

| Skill | Agents | Model |
|-------|--------|-------|
| `/project-status` | 4 | Haiku |
| `/vault-maintenance` | 5 | Sonnet |
| `/related` | 4 | Haiku |
| `/document-extract` | 4 | Sonnet |
| `/attachment-audit` | 4 | Sonnet |
```

### How It Works

Skills marked "uses sub-agents" launch concurrent Task agents:

```markdown
**Agent 1: Gather Meetings** (Haiku)
- Find all meetings for project
- Extract key decisions
- Return: Meeting summary

**Agent 2: Gather ADRs** (Haiku)
- Find related ADRs
- Extract status and rationale
- Return: ADR summary

**Agent 3: Gather Tasks** (Haiku)
- Find project tasks
- Calculate completion rate
- Return: Task metrics

**Agent 4: Compile Report** (Haiku)
- Combine agent outputs
- Generate formatted report
- Return: Final status report
```

**Benefits:**
- Faster execution (parallel processing)
- Better accuracy (specialised agents)
- Cost efficiency (Haiku for simple tasks, Sonnet for analysis)

---

## Updated Stats

| Metric | v1.2.0 | v1.3.0 | Change |
|--------|--------|--------|--------|
| Claude Code Skills | 14 | 32 | +18 |
| Note Types | 13 | 15 | +2 |
| MOCs | 12 | 13 | +1 |
| Templates | 13 | 15 | +2 |
| Directories | 7 | 9 | +2 |

---

## Migration Guide

### From v1.2.0

**No breaking changes!** Simply:

1. Pull the latest changes:
   ```bash
   git pull origin main
   ```

2. New files will appear:
   - `.claude/rules/` directory
   - `.claude/skills/` (18 new skills)
   - `+Incubator/` folder
   - `+Templates/Incubator.md`
   - `+Templates/IncubatorNote.md`
   - `Incubator - MOC.md`

3. Start using new skills immediately

### From Earlier Versions

Follow the same process. All versions are backwards compatible.

---

## What's Next

### v1.4 (Planned)

- Video walkthroughs and tutorials
- More domain-specific MOC examples
- Mobile optimisation
- Integration templates (Jira, ADO, GitHub Issues)
- Community skill contributions

### v2.0 (Future)

- Obsidian Publish demo site
- Historical quality trend tracking
- Web dashboard for metrics
- Docker-based automation

---

## Download

**GitHub Repository:**
https://github.com/DavidROliverBA/obsidian-architect-vault-template

**Latest Release:** [v1.3.0](https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.3.0)

**What you get:**
- Complete vault structure with 9 directories
- 15 note templates
- 20+ example notes
- 13 MOCs with Dataview queries
- 32 Claude Code skills
- Rules directory for reference
- Incubator system for research
- Archive system for maintenance
- Comprehensive documentation

**Requirements:**
- **Obsidian** (free or paid)
- **Dataview plugin** (free) - Required
- **Templater plugin** (free) - Required

**License:** MIT (free to use, modify, share)

---

## Conclusion

v1.3.0 transforms the Obsidian Architect Vault Template from a knowledge management system into a **complete architectural practice toolkit**.

The **Incubator system** ensures no good idea gets lost. The **engineering management skills** produce professional stakeholder reports in seconds. The **research workflows** help you find and synthesise information across hundreds of notes.

**32 skills. 15 note types. 13 MOCs. One vault.**

Whether you're a solo architect or leading a team, this template scales with your needs.

Clone it. Customise it. Make it yours.

**Happy knowledge building!** 🚀

---

## About

**Author:** David Oliver
**Role:** Solutions Architect, British Airways Operations & Engineering IT
**GitHub:** https://github.com/DavidROliverBA

**Version History:**
- v1.3.0 (2026-01-10) - Incubator system, 18 new skills, rules directory
- v1.2.0 (2026-01-09) - Node.js automation, 3 maintenance skills
- v1.1.0 (2026-01-08) - Visual analysis skills, screenshots
- v1.0.0 (2026-01-07) - Initial release

**If this helps you, give it a star on GitHub!** ⭐

---

**Full Changelog:** https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.2.0...v1.3.0
