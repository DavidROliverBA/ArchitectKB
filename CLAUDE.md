# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Language

All generated text must be in UK English.

## Model Preferences

At the start of each new question thread, ask which Claude model the user would like to use (unless they explicitly specify one). Use this guidance:

- **Haiku**: Fast research, straightforward queries, quick analysis
- **Sonnet**: Balanced for complex tasks, code review, planning
- **Opus**: Deep analysis, complex multi-step tasks, extended reasoning

### Model Selection Guide

Use this rubric for automatic model selection when users don't specify:

| Task Type                                                | Model                              | Rationale                            |
| -------------------------------------------------------- | ---------------------------------- | ------------------------------------ |
| Quick capture (`/daily`, `/meeting`, `/task`, `/person`) | Haiku                              | Speed, low cost, simple templates    |
| Research & exploration (read-only search)                | Haiku subagents                    | Parallel execution, isolated context |
| Document processing (`/pdf-to-page`, `/pptx-to-page`)    | Sonnet                             | Balanced extraction quality          |
| Code review, analysis, summarisation                     | Sonnet                             | Good reasoning, moderate cost        |
| Architecture decisions, ADRs                             | Opus                               | Deep analysis, extended thinking     |
| Complex multi-step orchestration                         | Sonnet coordinator + Haiku workers | Cost-effective parallelism           |
| Vendor evaluation (`/score-rfi`)                         | Sonnet                             | Consistent scoring, parallel agents  |
| Quality reports, audits                                  | Sonnet                             | Comprehensive analysis               |

**Cost Considerations:**

- Haiku: ~$1/$5 per MTok (input/output) - use for high-volume, simple tasks
- Sonnet: ~$3/$15 per MTok - default for most work
- Opus: ~$15/$75 per MTok - reserve for complex reasoning

**Prompt Caching:** For repeated operations, structure prompts with static context first to benefit from 90% cache savings after 2+ requests.

## Task Management

Always use the task list tools to track work items during sessions. For any request involving 2 or more steps, create tasks to track progress. This provides visibility of progress and ensures complex work is properly organised.

### Task Tool Reference

| Tool         | Purpose                                   | When to Use                          |
| ------------ | ----------------------------------------- | ------------------------------------ |
| `TaskCreate` | Create new task with subject, description | Starting any multi-step work         |
| `TaskUpdate` | Update status, add dependencies, modify   | Marking progress, setting blockers   |
| `TaskList`   | View all tasks and their status           | Checking what's pending/blocked      |
| `TaskGet`    | Retrieve full task details by ID          | Getting context before starting work |

### Task Workflow

```
1. TaskCreate - Create tasks for each major step
2. TaskUpdate (addBlockedBy) - Set dependencies between tasks
3. TaskUpdate (status: in_progress) - Mark task as started
4. [Do the work]
5. TaskUpdate (status: completed) - Mark task as done
6. TaskList - Check for next available task
```

### Status Values

- `pending` - Not started, waiting for dependencies
- `in_progress` - Currently being worked on
- `completed` - Successfully finished
- `deleted` - Removed (use sparingly)

### Best Practices

- Use `activeForm` for spinner text (present continuous: "Creating meeting note")
- Set `blockedBy` for tasks that depend on others completing first
- Update status to `in_progress` before starting work
- Always mark tasks `completed` when done (don't leave orphaned tasks)

## Repository Overview

This is an Obsidian vault template designed for **Solutions Architects** to manage professional knowledge effectively. The vault supports architecture decisions, project documentation, meeting notes, research ideas, and personal productivity tracking.

**Key Features:**

- Seven-pillar ontology (Entities, Nodes, Events, Views, Artifacts, Governance, Navigation)
- Architecture Decision Records (ADRs) with relationship tracking
- Incubator system for research and idea development
- Quality indicators for content freshness and confidence
- Claude Code skills for automation and AI-assisted workflows

### Knowledge Model: Seven Pillars

The vault is organised around a **node-centric ontology** with seven pillars:

| Pillar         | Nature             | Location          | Purpose                          |
| -------------- | ------------------ | ----------------- | -------------------------------- |
| **Entities**   | Things that exist  | Root              | Actors and objects in the world  |
| **Nodes**      | Units of knowledge | Root              | Understanding that persists      |
| **Events**     | Things that happen | Folders           | Temporal occurrences             |
| **Views**      | Aggregated data    | Root              | Reports and dashboards into data |
| **Artifacts**  | External resources | `Attachments/`    | Reference materials collected    |
| **Governance** | Rules & standards  | `Sync/`           | Policies and guardrails          |
| **Navigation** | Finding aids       | Root (`_` prefix) | Help locate content              |

**Core Principle:** _Events happen TO entities and ABOUT nodes. Views aggregate data. Governance constrains decisions. Artifacts provide reference._ Projects end, but knowledge persists.

See **[[Concept - Vault Ontology]]** for the full model.

## Important: This Template is Organisation-Agnostic

**This repository is a generic template designed for any organisation.** It contains NO organisation-specific entries. All examples, text, and guidance use neutral language that works for any architect in any company.

**When contributing to this template, maintain this standard:**

- ❌ **DO NOT add** organisation names, project names, staff names, or system names from any specific organisation
- ✅ **DO use** generic terminology: "your organisation", "your projects", "your team", "your systems"
- ✅ **DO include** customisation guidance so users can adapt the template to their context
- ✅ **DO provide** examples that are illustrative but not tied to any real organisation

**Example:**

- ❌ Bad: "Create ADRs following the BA ADR process with Tom Phillips as approver"
- ✅ Good: "Create ADRs following your organisation's governance process, adding your required approvers"

## Directory Structure

The vault uses a **pillar-based organisation** where Entities and Nodes live at the root, Events live in folders, and Navigation uses `_` prefix for sorting.

```
ArchitectKB/
│
├── Meetings/                    # Events
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
├── Projects/                    # Events (includes Workstreams, Forums)
├── Tasks/                       # Events
├── ADRs/                        # Events
├── Emails/                      # Events
├── Trips/                       # Events
├── Daily/                       # Events
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
├── Incubator/                   # Events (research that spawns nodes)
├── Forms/                       # Events (governance submissions)
│
├── Attachments/                 # Artifacts (media, PDFs, images)
├── Archive/                     # Archived content
│   ├── Entities/
│   ├── Nodes/
│   └── Events/
├── Templates/                   # Note templates
├── Sync/                        # Governance (synced content)
│   ├── Policies/
│   ├── Guardrails/
│   └── Org-ADRs/
│
├── .claude/                     # Claude Code configuration
│   ├── context/                 # Dynamic context files
│   ├── rules/                   # Modular convention rules
│   └── skills/                  # Skill instruction files
├── .graph/                      # Graph indexes
├── .obsidian/                   # Obsidian configuration
│
├── Person - *.md                # Entities (root)
├── System - *.md                # Entities (root)
├── Organisation - *.md          # Entities (root)
├── DataAsset - *.md             # Entities (root)
├── Location - *.md              # Entities (root)
│
├── Concept - *.md               # Nodes (root)
├── Pattern - *.md               # Nodes (root)
├── Capability - *.md            # Nodes (root)
├── Theme - *.md                 # Nodes (root)
├── Weblink - *.md               # Nodes (root)
│
├── Dashboard - *.md             # Views (root)
├── Query - *.md                 # Views (root)
├── ArchModel - *.md             # Views (root)
│
└── _MOC - *.md                  # Navigation (root, sorted first)
```

### Note Types by Pillar

Notes are identified by their `type` and `pillar` frontmatter fields. **See `.claude/rules/frontmatter-reference.md` for complete schemas.**

| Pillar         | Types                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Entity**     | Person, System, Organisation, DataAsset, Location                                             |
| **Node**       | Concept, Pattern, Capability, Theme, Weblink                                                  |
| **Event**      | Meeting, Project, Task, ADR, Email, Trip, Daily, Incubator, Workstream, Forum, FormSubmission |
| **View**       | Dashboard, Query, ArchModel                                                                   |
| **Artifact**   | PDF, Presentation, Document, Image (stored in Attachments/)                                   |
| **Governance** | Policy, Guardrail (synced from external sources to Sync/)                                     |
| **Navigation** | MOC                                                                                           |

### Legacy Types (Being Migrated)

| Old Type        | New Type                        | Pillar | Action              |
| --------------- | ------------------------------- | ------ | ------------------- |
| `Page`          | `Concept` / `Pattern` / `Theme` | Node   | Classify by content |
| `DailyNote`     | `Daily`                         | Event  | Rename              |
| `AtomicNote`    | `Concept`                       | Node   | Reclassify          |
| `IncubatorNote` | Part of `Incubator`             | Event  | Merge               |
| `CodeSnippet`   | `Pattern` or archive            | Node   | Case by case        |
| `Course`        | `Incubator` or archive          | Event  | Case by case        |

### Navigation

Use these Maps of Content (MOC) files to navigate:

- **[[_Dashboard - Main Dashboard]]** - Main hub with Dataview queries
- **[[_MOC - Tasks MOC]]** - All tasks by priority/due date
- **[[_MOC - Projects MOC]]** - Projects by status
- **[[_MOC - People MOC]]** - People directory
- **[[_MOC - Meetings MOC]]** - Meeting history
- **[[_MOC - ADRs MOC]]** - Architecture Decision Records
- **[[_MOC - Vault Quality Dashboard]]** - Quality metrics and freshness tracking
- **[[_MOC - Form Submissions]]** - Governance form tracking
- **[[_MOC - Incubator]]** - Idea incubator (research and exploration)

## Frontmatter Schema

All notes use YAML frontmatter with a `type` field. Common properties by type:

### Universal Fields (All Notes)

```yaml
type: <NoteType> # Required - identifies note type
pillar: entity | node | event | view | governance | navigation # Required - identifies pillar
title: <Title> # Required
created: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [] # Hierarchical tags
```

### Relationship Fields (All Content Notes)

All Entities, Nodes, and Events should include relationship fields:

```yaml
nodeRelationships: [] # Links to knowledge nodes
  # - "[[Concept - Data Quality]]"
  # - "[[Pattern - Event-Driven Architecture]]"

entityRelationships: [] # Links to entities
  # - "[[Person - Jane Smith]]"
  # - "[[System - Sample ERP]]"
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
status: active | paused | completed # Simple string values
priority: high | medium | low
timeFrame: YYYY-MM-DD - YYYY-MM-DD
collections: <program name>
# Transformation Classification
transformationType: modernisation | migration | greenfield | integration | decommission | uplift | null
transformationScope: enterprise | department | team | application | null
aiInvolved: false # Does project involve AI/ML?
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
parentTask: null                       # "[[Task - Parent]]" (if subtask)
subtasks: []                           # ["[[Task - Child 1]]", "[[Task - Child 2]]"]
```

**Subtask Conventions:**

- Parent tasks list children in `subtasks` array
- Child tasks reference parent in `parentTask` field
- Parent inherits completion status from children (complete when all subtasks complete)
- Children inherit project/priority from parent unless overridden

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
date: "YYYY-MM-DD"
```

**ADR (Architecture Decision Record):**

```yaml
type: Adr
status: draft | proposed | accepted | deprecated | superseded
adrType: Technology_ADR | Architecture_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
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
domain: [] # Controlled list: architecture, governance, tooling, security, data, documentation, process, ai, infrastructure
outcome: null # Link to resulting deliverable when accepted
```

**IncubatorNote (Supporting Research):**

```yaml
type: IncubatorNote
parent-ideas: ["[[Incubator - Idea]]"] # Can link to multiple ideas
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
queryType: table | list | task # Dataview query type
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
refreshed: YYYY-MM-DD # Last refresh date
```

**CodeSnippet:**

```yaml
type: CodeSnippet
language: python | javascript | bash | yaml | sql | other
purpose: <what this snippet does>
```

**System (Enterprise Systems):**

```yaml
type: System
systemId: "<unique-id>"               # Unique identifier for the system
aliases: []                           # Alternative names, acronyms
apmNumber: null                       # APM0001234 (Application Portfolio Management ID)
systemType: application | platform | database | middleware | saas | infrastructure | interface | null
owner: "[[Person]]" | null
status: active | planned | deprecated | retired | null
criticality: critical | high | medium | low | null
hosting: on-prem | aws | azure | saas | external | hybrid | null
vendor: "[[Organisation]]" | null
annualCost: <number> | null           # Annual cost in currency

# External References
confluenceUrl: null                   # Link to Application Library page
cmdbId: null                          # ServiceNow CMDB identifier
documentationUrl: null                # Primary documentation link

# Technology
technology: []                        # [sap-ecc, java, postgresql]

# Relationships
connectsTo: []                        # ["[[System - Target]]"]
relatedProjects: []                   # ["[[Project - Name]]"]

# Lifecycle Classification (Gartner TIME model)
timeCategory: tolerate | invest | migrate | eliminate | null
replacedBy: null                      # "[[System - Successor]]"
predecessors: []                      # ["[[System - Dependency]]"]

# Data Classification
dataClassification: public | internal | confidential | secret | null
gdprApplicable: false
piiHandled: false

# Quality Indicators
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false
reviewed: null
```

**TIME Category Values (Gartner TIME Model):**
| Value | Description |
|-------|-------------|
| `tolerate` | Maintain current state, no active investment |
| `invest` | Actively investing and growing capability |
| `migrate` | Transitioning away, planning replacement |
| `eliminate` | Scheduled for retirement/decommission |

**Integration (System-to-System Connections):**

```yaml
type: Integration
sourceSystem: "[[System - Source]]"
targetSystem: "[[System - Target]]"
integrationPattern: real-time | batch-etl | api-gateway | event-streaming | message-queue | file-transfer | database-replication | null
criticality: critical | high | medium | low | null
latencyTarget: "<5 seconds" | null    # Required latency
dataVolume: "<volume per time>" | null # e.g., "500 events/sec", "10GB/day"
frequency: real-time | hourly | daily | weekly | on-demand | null

# Relationships
relatedProjects: []
dependsOn: []                         # Prerequisites

# Quality Indicators
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false
reviewed: null
```

**Architecture (High-Level/Low-Level Designs):**

```yaml
type: Architecture
architectureType: high-level-design | low-level-design | c4-context | c4-container | aws-architecture | null
scope: enterprise | department | project | application | null
project: "[[Project]]" | null
systems: []                           # ["[[System - Name]]"]
integrations: []                      # ["[[Integration - A to B]]"]

# Relationships
relatedTo: []
supersedes: []                        # Older designs
dependsOn: []                         # Foundation architectures

# Quality Indicators
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false
reviewed: null
```

**Scenario (What-If Analysis & Planning):**

```yaml
type: Scenario
scenarioType: current-state | future-state | alternative-option | risk-mitigation | null
baselineArchitecture: "[[Architecture]]" | null
project: "[[Project]]" | null
timeline: <description> | null        # e.g., "Q1-Q3 2026"
estimatedCost: <number> | null        # Setup cost
annualRecurringCost: <number> | null  # Ongoing cost

# Relationships
relatedTo: []
dependsOn: []

# Quality Indicators
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false
reviewed: null
```

**DataSource (Databases, Tables, APIs):**

```yaml
type: DataSource
dataSourceType: database-table | database-view | api-endpoint | data-lake | file-feed | stream | null
parentSystem: "[[System]]" | null
owner: "[[Person]]" | null
accessMethod: direct-query | api | batch-export | streaming | null
dataClassification: public | internal | confidential | secret | null
recordCount: <number> | null
dataVolume: "<size>" | null           # e.g., "2.5 TB"

# Quality Indicators
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false
reviewed: null
```

**Article (Communications & Content):**

```yaml
type: Article
articleType: article | blog-post | document | guardrail | video | podcast | linkedin-post
platform: medium | substack | confluence | linkedin | youtube | spotify | internal | null
targetAudience: internal | external | both
parentIdea: null # "[[Incubator - Source Idea]]"
status: draft | ready | published | archived
publishedUrl: null
publishedDate: null

# Quality Indicators
summary: null
keywords: [] # Searchable keywords
confidence: medium
freshness: current
source: synthesis
verified: false
reviewed: null

# Relationships
relatedTo: []
```

**DataAsset (Data Products & Assets):**

```yaml
type: DataAsset
assetId: <unique-identifier> # e.g., "SYSTEM-REVENUE-FACT-001"

# Classification
domain: engineering | data | operations | finance | hr | supply-chain | maintenance
dataType: database-table | database-view | api-endpoint | kafka-topic | data-product | data-lake | file | report | cache
classification: public | internal | confidential | secret

# Location & Format
sourceSystem: null # "[[System - X]]"
storageLocation: null # path/table/endpoint
format: sql | json | parquet | avro | csv | xml | binary

# Ownership
owner: null # "[[Person - X]]"
steward: null # "[[Person - Y]]" - data governance contact

# Relationships
producedBy: [] # ["[[System - X]]"]
consumedBy: [] # ["[[System - Y]]", "[[System - Z]]"]
exposedVia: [] # [rest-api, kafka-topic, direct-query, batch-export]
plannedConsumers: [] # Systems that WILL consume (future state)
deprecatingConsumers: [] # Systems moving AWAY from this data

# Lineage
derivedFrom: [] # Upstream data assets
feedsInto: [] # Downstream data assets

# Operational Metrics
refreshFrequency: real-time | hourly | daily | weekly | monthly | ad-hoc | null
recordCount: null
volumePerDay: null
retentionPeriod: null

# Governance
gdprApplicable: false
piiFields: []

# Quality Indicators
confidence: medium
freshness: current
verified: false
reviewed: null
```

**Trip (Travel Planning):**

```yaml
type: Trip
status: idea | planning | booked | completed | cancelled
tripType: holiday | city-break | adventure | family-visit | business | null
destination: null
country: null
startDate: null # YYYY-MM-DD
endDate: null # YYYY-MM-DD
travellers: []
budget: null
currency: GBP | EUR | USD
accommodation: null
flights: null
notes: null
```

### Quality Indicators Pattern

Important notes (ADRs, Pages, Projects) should include quality metadata:

```yaml
# Quality Indicators
confidence: high | medium | low # How authoritative is this?
freshness: current | recent | stale # How up-to-date?
source: primary | secondary | synthesis # Where did info come from?
verified: true | false # Has it been verified?
reviewed: YYYY-MM-DD # Last review date
keywords: [] # Searchable keywords
summary: <brief summary> # One-line summary
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
relatedTo: ["[[Related Note]]"] # Related decisions, projects, context
supersedes: ["[[Old ADR]]"] # ADRs this decision replaces
dependsOn: ["[[Foundation ADR]]"] # ADRs that must exist first
contradicts: ["[[Conflicting ADR]]"] # Known conflicts (rare)
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

| Status      | Description                            |
| ----------- | -------------------------------------- |
| `seed`      | Initial idea capture, minimal research |
| `exploring` | Active research and investigation      |
| `validated` | Research complete, ready for decision  |
| `accepted`  | Graduated to Project, ADR, or Page     |
| `rejected`  | Decided not to pursue                  |

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

| Command                             | Description                                  |
| ----------------------------------- | -------------------------------------------- |
| `incubator <title>`                 | Create new idea (no prompts)                 |
| `incubator <title> [domain]`        | Create with domain keywords                  |
| `incubator note <title> for <idea>` | Create research note                         |
| `incubator list [filter]`           | List active ideas by status or domain        |
| `incubator list all`                | Include archived (graduated/rejected)        |
| `incubator status <idea> <status>`  | Update lifecycle status                      |
| `incubator graduate <idea>`         | Graduate to Project/ADR/Page (archives idea) |
| `incubator reject <idea>`           | Reject with reason (archives idea)           |

## Archive System

The Archive provides soft-deletion for completed or abandoned notes while preserving backlinks.

### When to Archive

- Incubator ideas that are graduated or rejected
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

Archived notes are organised by pillar:

```
Archive/
├── Entities/    # Archived people, systems, organisations
├── Nodes/       # Archived concepts, patterns, weblinks
└── Events/      # Archived projects, tasks, incubator ideas
```

## Custom Skills

User-invocable skills are defined in `.claude/skills/`. When the user invokes a skill, read the corresponding file for instructions.

**Model Key:** 🟢 Haiku (fast) | 🟡 Sonnet (balanced) | 🔴 Opus (deep)

### Daily Workflow (🟢 Haiku)

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `/daily`           | Create today's daily note                  |
| `/meeting <title>` | Create meeting note with attendees/project |
| `/weekly-summary`  | Generate weekly summary from notes         |

### Architecture Work (🔴 Opus for ADRs, 🟡 Sonnet for others)

| Command                     | Model | Description                                        |
| --------------------------- | ----- | -------------------------------------------------- |
| `/adr <title>`              | 🔴    | Create new ADR with guided prompts                 |
| `/project-status <project>` | 🟡    | Generate project status report (uses sub-agents)   |
| `/find-decisions <topic>`   | 🟡    | Find all decisions about a topic (uses sub-agents) |

### Architecture Documentation & Analysis (🟡 Sonnet)

| Command                                  | Description                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/system <name>`                         | Create comprehensive System note with guided prompts (checks duplicates, gathers tech stack, metrics, SLAs) |
| `/integration <source> <target>`         | Document system-to-system integration with pattern, latency, data volume, quality checks                    |
| `/architecture <title>`                  | Create Architecture HLD/LLD with systems, components, NFRs, deployment topology                             |
| `/scenario <name>`                       | Create what-if scenarios, future-state plans, cost/benefit analysis, risk assessment                        |
| `/datasource <name>`                     | Document databases, tables, APIs, datasets with schema and access info                                      |
| `/diagram <type>`                        | Generate C4, system landscape, data flow, or AWS architecture diagrams                                      |
| `/canvas <name>`                         | Create visual Canvas diagrams (system landscape, C4 context, data flows)                                    |
| `/architecture-report [filter]`          | Generate architecture documentation report with system inventory, integration matrix, cost analysis         |
| `/cost-optimization [scope]`             | Identify cost savings across systems (underutilised resources, right-sizing, contract optimisation)         |
| `/dependency-graph [system]`             | Visualise system dependencies, identify single points of failure, plan impact analysis                      |
| `/impact-analysis <system>`              | Analyse what breaks if a system fails (downstream consumers, integration paths, risk mitigation)            |
| `/scenario-compare <baseline> <options>` | Compare multiple architecture scenarios side-by-side (cost, risk, timeline, benefits)                       |
| `/dataasset <name>`                      | Document data assets (tables, APIs, topics) with producers, consumers, lineage                              |
| `/system-roadmap`                        | Generate system lifecycle roadmap visualisation (Gartner TIME categories)                                   |
| `/system-sync [source]`                  | Sync systems from external CMDBs (ServiceNow, Jira, Confluence Application Library)                         |
| `/tag-management [action]`               | Audit, migrate, normalize tags across vault (find flat tags, migrate to hierarchical, validate taxonomy)    |

### Engineering Management (🟢 Haiku)

| Command                    | Description                            |
| -------------------------- | -------------------------------------- |
| `/adr-report [period]`     | ADR activity report (week/month/all)   |
| `/dpia-status [filter]`    | DPIA compliance status across projects |
| `/project-snapshot [name]` | Quick status of all active projects    |

### Research & Discovery (🟡 Sonnet)

| Command                | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `/related <topic>`     | Find all notes mentioning a topic (uses sub-agents)                  |
| `/summarize <note>`    | Summarise a note or set of notes                                     |
| `/timeline <project>`  | Chronological project history (uses sub-agents)                      |
| `/exec-summary <note>` | Generate non-technical executive summary                             |
| `/book-search <topic>` | Search indexed book/PDF content by topic (graph-only, no file reads) |

### Governance & Compliance (🟢 Haiku)

| Command                 | Description                                |
| ----------------------- | ------------------------------------------ |
| `/form <type> <name>`   | Quick-create form submission tracking note |
| `/form-status [filter]` | Check status of form submissions           |

### Maintenance (🟢 Haiku coordinators, 🟡 Sonnet for quality)

| Command              | Model | Description                                                               |
| -------------------- | ----- | ------------------------------------------------------------------------- |
| `/wipe`              | 🟢    | Generate context handoff, clear session, resume fresh (auto-detects tmux) |
| `/vault-maintenance` | 🟢    | Quarterly health check - all quality checks (uses sub-agents)             |
| `/check-weblinks`    | 🟢    | Test all weblink URLs for dead/redirected links (uses sub-agents)         |
| `/archive <note>`    | 🟢    | Soft archive a note (Project, Task, Page, Person)                         |
| `/orphans`           | 🟢    | Find notes with no backlinks (uses sub-agents)                            |
| `/broken-links`      | 🟢    | Find broken wiki-links (uses sub-agents)                                  |
| `/sync-notion-pages` | 🟢    | Bidirectional sync between Obsidian notes and Notion pages                |
| `/rename <pattern>`  | 🟢    | Batch rename files with link updates                                      |
| `/quality-report`    | 🟡    | Generate comprehensive quality metrics (uses sub-agents)                  |
| `/infographic`       | 🟢    | Regenerate the ArchitectKB capabilities infographic                       |

### Security & Credentials

| Command               | Description                                         |
| --------------------- | --------------------------------------------------- |
| `/secrets status`     | Check Bitwarden CLI installation and session status |
| `/secrets get <name>` | Retrieve a secret by name from Bitwarden            |
| `/secrets list`       | List all secrets in your Bitwarden vault folder     |
| `/secrets env`        | Output export commands for environment variables    |
| `/secrets setup`      | Guide through initial Bitwarden CLI setup           |

**Important**: This vault does NOT store credentials. All secrets are kept in Bitwarden and accessed on-demand via environment variables. See [[Page - Vault Security Hardening]] for setup.

### Document Processing (🟡 Sonnet)

| Command                      | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| `/pdf-to-page <path>`        | Convert PDF to Page note with extracted PNG images |
| `/pptx-to-page <path>`       | Convert PowerPoint to Page note with slide images  |
| `/screenshot-analyze <path>` | Comprehensive screenshot analysis with OCR         |
| `/diagram-review <path>`     | Analyse architecture diagrams and flowcharts       |
| `/document-extract <path>`   | Extract text from scanned documents/photos         |
| `/attachment-audit`          | Audit all vault attachments with visual analysis   |

### Quick Capture (🟢 Haiku)

| Command               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `/task <title>`       | Quick-create task with project/due date                         |
| `/person <name>`      | Create person note from template                                |
| `/weblink <url>`      | Save URL with analysis and summary                              |
| `/youtube <url>`      | Save YouTube video with transcript analysis                     |
| `/article <title>`    | Quick-create article (blog post, video, podcast, LinkedIn post) |
| `/trip <destination>` | Create trip planning note with flights and accommodation        |
| `incubator <title>`   | Quick-create incubator idea                                     |

**Usage**: These are instruction files, not registered Claude Code commands. When the user types a skill command (e.g., `/meeting`) or asks naturally (e.g., "create a meeting note"), read `.claude/skills/<skill>.md` and follow its instructions. Skills marked "uses sub-agents" should launch parallel Task agents for efficiency.

**Note**: Skills work by the assistant reading and executing the instructions - they won't appear in Claude Code's built-in `/` command list.

## MCP Server Integrations

This vault can connect to MCP (Model Context Protocol) servers for extended capabilities.

### Configuring MCP Servers

Add servers to `.mcp.json` in your vault root:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-name"]
    }
  }
}
```

### Common MCP Servers

| Server       | Purpose                          | Installation                            |
| ------------ | -------------------------------- | --------------------------------------- |
| **GitHub**   | PR, issue, repo management       | `@modelcontextprotocol/server-github`   |
| **Postgres** | Database queries                 | `@modelcontextprotocol/server-postgres` |
| **Notion**   | Sync with Notion databases/pages | Configure with Notion integration token |
| **Diagrams** | Generate architecture diagrams   | Enables diagram generation via Python   |

### MCP Best Practices

- Use `mcp-find` to discover available servers in the catalog
- Use `mcp-add` to enable a server for the session
- MCP tools are NOT available in background subagents
- Check server documentation for required configuration

## Dynamic Context Loading

Additional context files are available in `.claude/context/` to provide deeper domain knowledge without bloating the main context. **Load these files as needed based on user queries:**

| File                        | Load When User Asks About               |
| --------------------------- | --------------------------------------- |
| `projects-template.md`      | Specific project details and status     |
| `technology-template.md`    | Technical systems, platforms, and tools |
| `people-template.md`        | People, teams, stakeholders             |
| `acronyms-template.md`      | Unknown abbreviations and terminology   |
| `architecture-template.md`  | ADRs, patterns, governance, compliance  |
| `organisations-template.md` | External companies and vendors          |

**Usage**: When a query involves specific domain knowledge, read the relevant context file(s) first:

```
Read .claude/context/projects-template.md   # For project-specific queries
Read .claude/context/acronyms-template.md   # When encountering unknown terms
```

**Customisation**: These template files should be renamed (remove `-template` suffix) and populated with your organisation's specific information.

## Modular Rules

Detailed reference documentation is split into focused files in `.claude/rules/`:

| File                       | Purpose                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `frontmatter-reference.md` | Quick reference for all frontmatter fields by type           |
| `naming-conventions.md`    | File and folder naming patterns                              |
| `quality-patterns.md`      | Quality indicators, relationships, and tag taxonomy          |
| `tag-taxonomy.md`          | Comprehensive hierarchical tag taxonomy and validation rules |

These provide deeper detail than this main file - load when working on specific conventions.

## Sensitive Information Warning

Notes with `type: Zettel` and some `type: Page` notes may contain API keys, tokens, passwords, and credentials. **AI assistants should NEVER expose, copy, or transmit this sensitive information.**

## Search Strategy

**IMPORTANT:** This vault has a pre-computed knowledge graph index with **BM25 relevance ranking**. Always query the graph BEFORE using Grep or find commands.

### Graph-First Search Order

1. **First: Query the graph index** (fast, ranked results)

   ```bash
   node scripts/graph-query.js --search "<term>"      # BM25 ranked search
   node scripts/graph-query.js --type <Type>          # Filter by type
   node scripts/graph-query.js --type Adr --status proposed  # Combined filters
   node scripts/graph-query.js --backlinks "<Note>"   # Find references
   ```

   Search results are ranked by BM25 relevance score - top results are most relevant.

2. **Second: Use Grep** (only if graph doesn't have needed data)
   - For content not in frontmatter
   - For regex patterns
   - For specific line content

3. **Third: Use Glob** (for file patterns only)
   - When you need specific file paths
   - When searching by filename pattern

### Common Graph Queries

| Need                | Graph Command                                                   |
| ------------------- | --------------------------------------------------------------- |
| Find all ADRs       | `node scripts/graph-query.js --type Adr`                        |
| Active projects     | `node scripts/graph-query.js --type Project --status active`    |
| High priority tasks | `node scripts/graph-query.js --type Task --priority high`       |
| Search for "kafka"  | `node scripts/graph-query.js --search kafka`                    |
| Orphaned notes      | `node scripts/graph-query.js --orphans`                         |
| Broken links        | `node scripts/graph-query.js --broken-links`                    |
| Notes linking to X  | `node scripts/graph-query.js --backlinks "Project - MyProject"` |
| Vault statistics    | `node scripts/graph-query.js --stats`                           |

### When to Skip the Graph

- Searching inside code blocks or specific text patterns
- Looking for content changes (use `git log -p`)
- File operations (use Glob directly)

## Working with This Vault

### Linking Conventions

- Internal links use Obsidian wiki-link syntax: `[[Note Title]]`
- Cross-references between notes create a knowledge graph (use backlinks)
- Status/priority values use simple strings: `active`, `high`, `medium`, `low`

### Creating/Editing Notes

1. Always include YAML frontmatter with `type` and `pillar` fields
2. Include `nodeRelationships` and `entityRelationships` for content notes
3. **Entities and Nodes** go in root with type prefix: `Person - Name.md`, `Concept - Title.md`
4. **Events** go in folders: `Meetings/YYYY/`, `Projects/`, `Tasks/`, `ADRs/`, `Daily/YYYY/`, etc.
5. **Navigation** uses `_` prefix: `_MOC - Scope.md`
6. Place attachments in **Attachments/** folder
7. Use `/archive` to move notes to **Archive/<Pillar>/** folder (Entities, Nodes, Events)
8. Use `[[wiki-links]]` for cross-references to other notes
9. Daily notes follow `Daily - YYYY-MM-DD.md` naming convention
10. Meeting notes follow `Meeting - YYYY-MM-DD Title.md` naming convention
11. Include `created` and `modified` date fields

**See `.claude/rules/naming-conventions.md` for complete patterns.**

### Filename Conventions by Pillar

**Entities (Root):**

| Type         | Pattern                      | Example                          |
| ------------ | ---------------------------- | -------------------------------- |
| Person       | `Person - {{Name}}.md`       | `Person - Jane Smith.md`         |
| System       | `System - {{Name}}.md`       | `System - Sample ERP.md`         |
| Organisation | `Organisation - {{Name}}.md` | `Organisation - Your Company.md` |
| DataAsset    | `DataAsset - {{Name}}.md`    | `DataAsset - Customer Orders.md` |
| Location     | `Location - {{Name}}.md`     | `Location - Main Office.md`      |

**Nodes (Root):**

| Type       | Pattern                     | Example                                  |
| ---------- | --------------------------- | ---------------------------------------- |
| Concept    | `Concept - {{Title}}.md`    | `Concept - Data Quality.md`              |
| Pattern    | `Pattern - {{Title}}.md`    | `Pattern - Event-Driven Architecture.md` |
| Capability | `Capability - {{Title}}.md` | `Capability - Real-time Integration.md`  |
| Theme      | `Theme - {{Title}}.md`      | `Theme - Technical Debt.md`              |
| Weblink    | `Weblink - {{Title}}.md`    | `Weblink - AWS Well-Architected.md`      |

**Events (Folders):**

| Type           | Pattern                                        | Location         |
| -------------- | ---------------------------------------------- | ---------------- |
| Meeting        | `Meeting - YYYY-MM-DD {{Title}}.md`            | `Meetings/YYYY/` |
| Project        | `Project - {{Name}}.md`                        | `Projects/`      |
| Workstream     | `Workstream - {{Name}}.md`                     | `Projects/`      |
| Forum          | `Forum - {{Name}}.md`                          | `Projects/`      |
| Task           | `Task - {{Title}}.md`                          | `Tasks/`         |
| ADR            | `ADR - {{Title}}.md`                           | `ADRs/`          |
| Email          | `Email - {{From/To}} - {{Subject}}.md`         | `Emails/`        |
| Trip           | `Trip - {{Destination}}.md`                    | `Trips/`         |
| Daily          | `Daily - YYYY-MM-DD.md`                        | `Daily/YYYY/`    |
| Incubator      | `Incubator - {{Title}}.md`                     | `Incubator/`     |
| FormSubmission | `FormSubmission - {{Type}} for {{Project}}.md` | `Forms/`         |

**Views (Root):**

| Type      | Pattern                    | Example                         |
| --------- | -------------------------- | ------------------------------- |
| Dashboard | `Dashboard - {{Scope}}.md` | `Dashboard - Main Dashboard.md` |
| Query     | `Query - {{Title}}.md`     | `Query - Critical Systems.md`   |
| ArchModel | `ArchModel - {{Title}}.md` | `ArchModel - Data Flow.md`      |

**Navigation (Root, sorted first):**

| Type | Pattern               | Example              |
| ---- | --------------------- | -------------------- |
| MOC  | `_MOC - {{Scope}}.md` | `_MOC - Projects.md` |

**Note**: All notes now use type prefixes. Use aliases in frontmatter for shorter wiki-links: `aliases: [Jane Smith]` allows `[[Jane Smith]]` to resolve to `Person - Jane Smith.md`.

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

| Script                    | Purpose                                                                 |
| ------------------------- | ----------------------------------------------------------------------- |
| `rename_daily_notes.py`   | Rename daily notes from `Daily Note - YYYY-MM-DD.md` to `YYYY-MM-DD.md` |
| `standardize_meetings.py` | Standardise meeting filenames to `Meeting - YYYY-MM-DD Title.md`        |
| `extract_pptx.py`         | Extract text content from PowerPoint files                              |
| `pptx_to_page.py`         | Convert PowerPoint slides to PNG images and create Page note            |
| `pdf_to_page.py`          | Convert PDF pages to PNG images and create Page note                    |
| `system_roadmap.py`       | Generate system lifecycle roadmap PNG/SVG (Gartner TIME categories)     |
| `analyze_links.py`        | Analyse wiki-link connectivity across vault                             |
| `analyze_structure.js`    | Comprehensive vault structure analysis                                  |

Run Python scripts with `python3 scripts/<script>.py [arguments]` and Node.js scripts with `node scripts/<script>.js [arguments]`. Most Python scripts support `--dry-run` flag to preview changes.

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

## Autonomous Workflows

Claude Code supports autonomous operation modes for reduced prompting and extended sessions.

### Plan Mode

Activate with `Shift+Tab` (twice from Normal Mode) to enter read-only exploration:

- **Indicator:** `⏸` in prompt
- **Behaviour:** Read-only operations, no file modifications
- **Use for:** Research, understanding code, planning changes
- **Exit:** Use `ExitPlanMode` tool when plan is ready for approval

### Workflow: Explore → Plan → Code → Commit

1. **Explore** - Have Claude read files without coding (use Explore subagent)
2. **Plan** - Request detailed implementation plan (use "think hard" for extended reasoning)
3. **Code** - Implement the solution with verification
4. **Commit** - Request commit and PR creation

### Context Management

- **Auto-compaction:** Triggers at 95% context capacity
- **Manual compaction:** Use `/compact` between phases
- **Session wipe:** Use `/wipe` to generate handoff and start fresh
- **Autonomous duration:** ~10-20 minutes before context fills

### Sub-Agent Patterns

Launch parallel subagents for independent research:

```
Task tool with:
- subagent_type: "Explore" - Fast, read-only (Haiku)
- subagent_type: "general-purpose" - Full capabilities
- subagent_type: "Plan" - Research for planning
- run_in_background: true - Non-blocking execution
```

### Permission Modes

| Mode          | Behaviour                    |
| ------------- | ---------------------------- |
| `default`     | Standard permission checking |
| `acceptEdits` | Auto-accept file edits       |
| `plan`        | Read-only exploration        |

Configure permissions in `.claude/settings.json` or via Claude Code settings.

## Reference Documentation

### User Guides

- **[[Page - Claude Code Skills Quick Reference]]** - All 75 skills with examples and model recommendations
- **[[Page - Daily Workflow Guide]]** - Practical routines for morning, meetings, weekly reviews
- **[[Page - Search and Discovery Guide]]** - SQLite FTS5, graph queries, discovery skills
- **[[Page - Architecture Workflow Guide]]** - Multi-skill workflows for systems, integrations, ADRs
- **[[Page - Diagram and Visualisation Guide]]** - C4 diagrams, Canvas, Mermaid
- **[[Page - Claude Code with AWS Bedrock Guide]]** - Enterprise deployment with AWS Bedrock
- **[[Page - Secrets and Security Setup Guide]]** - Bitwarden CLI, pre-commit hooks, credentials
- **[[Page - Claude Code Hooks Guide]]** - 11 hooks for quality enforcement, security, and automation

### General Documentation

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

**Version:** 2.0.0
**Template Maintained by:** Solutions Architecture Community
**Review Frequency:** Update as conventions evolve
