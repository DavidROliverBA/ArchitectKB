# The Obsidian Architect Vault: A Complete Knowledge Management System for Solutions Architects

**Published:** 2026-01-10 (v1.3.0)
**Updated:** 2026-01-11 (v1.4.0)
**Author:** David Oliver
**Repository:** [github.com/DavidROliverBA/obsidian-architect-vault-template](https://github.com/DavidROliverBA/obsidian-architect-vault-template)

---

## The Reality of Being an Architect Today

You're an architect looking after... how many projects exactly? You've never sat down to count them. There's the cloud migration, the API modernisation, the data platform rebuild, that "quick" security uplift that's now in its eighth month, plus three others you've been pulled into for "just a bit of advice."

Every single one of them is about "transformation" or "change"—the buzzwords that seem to justify everything these days. And increasingly, they all involve AI in some capacity. "Can we add some AI to this?" has become the default question in every stakeholder meeting.

You have ADRs. Somewhere. The problem is they're scattered with their projects—some in Confluence spaces, some in SharePoint folders, a few in GitHub repos that nobody can find. When someone asks "didn't we already make this decision?", you spend 30 minutes searching before giving up.

Between meetings, you get flashes of insight. "What if we used event sourcing here?" "Could a service mesh simplify this?" You jot them down somewhere—a Slack message to yourself, a sticky note, a half-finished email draft. But there's nowhere to actually *incubate* these ideas. No way to check if someone else in the organisation has already tried this. No space to explore before the next meeting pulls you away.

**It's chaos. And you feel it.**

Different groups have their own forms to fill in before they'll engage with you. Cyber wants their risk assessment. Change management wants their impact analysis. The data team wants their DPIA. You can't remember if you've already filled them in or what you put on them. You captured one as a screenshot last week—but how do you find a JPEG again?

You've tried the tools. Confluence becomes a document graveyard where search never finds what you need unless you remember the exact keywords. OneNote notebooks multiply into an unsearchable mess. The AI assistants—Copilot, Rovo—promise to help but they lack context. "What did I do last time?" draws a blank. They don't remember anything.

So you try Obsidian. Or Notion. Or Capacities.io. But after a month, it feels like you're just creating another digital dustbin. You've read about PARA—Projects, Areas, Resources, Archives—but that just creates *four* dustbins. Folders are places where information goes to die.

Tags and metadata feel like part of the puzzle. But not the complete picture.

**And here's the thing that really grates:**

You're usually the only truly technical person in the room. Every project involves technology—that's why you're there—but you're surrounded by people who don't understand the technical realities. Meanwhile, the AI evangelists like Elon Musk and Sam Altman keep saying we won't need developers anymore. AI will do it all.

Your experience says otherwise. You need *more* people who can use technology effectively, not fewer. And AI? It's genuinely useful, but only when it has context. The problem is there's no easy way to give it that context. It can't remember your projects, your decisions, your constraints. Every conversation starts from zero.

**This is the knowledge management crisis that architects face daily.**

We make decisions that impact systems for years. We juggle dozens of stakeholders across multiple projects. We need to find information instantly—that ADR from six months ago, the context from last quarter's conversation, the rationale behind a technology choice that now needs revisiting.

Generic note-taking tools don't solve this. AI assistants without context don't solve this. Folders and filing systems don't solve this.

We need something different.

---

## How This Vault Addresses Each Problem

Let me be direct about what this system solves—and what it doesn't (yet).

### The Knowledge Worker's Problems: A Complete Catalogue

Before diving into solutions, let's name the problems explicitly. These aren't unique to architects—they're common to anyone doing complex knowledge work in modern organisations:

| # | Problem | Description |
|---|---------|-------------|
| 1 | **Project Overload** | Managing an uncounted number of simultaneous projects |
| 2 | **Scattered Decisions** | ADRs and key decisions live in different places per project |
| 3 | **Transformation Fatigue** | Every project is "change"—hard to see patterns across initiatives |
| 4 | **AI Everywhere** | Technology projects increasingly involve AI but lack clear patterns |
| 5 | **Ideas Without Homes** | Insights captured in scattered places, never developed |
| 6 | **No Prior Art Discovery** | Can't find if something was tried elsewhere in the organisation |
| 7 | **Cognitive Overload** | Chaos affecting wellbeing, hard to stay organised |
| 8 | **Form Fatigue** | Multiple intake forms from different groups, can't track submissions |
| 9 | **Lost Screenshots** | Visual captures (forms, whiteboards) impossible to search |
| 10 | **Search Limitations** | Confluence/OneNote require exact keywords to find anything |
| 11 | **Contextless AI** | Copilot, Rovo, ChatGPT don't remember previous sessions |
| 12 | **Digital Dustbin Effect** | Notes accumulate without structure, become unfindable |
| 13 | **PARA Doesn't Work** | Folders create four dustbins instead of one |
| 14 | **Tags Incomplete** | Metadata feels like part of solution but not complete |
| 15 | **Solo Technical Voice** | Being the only technical person on tech projects |
| 16 | **AI Hype vs Reality** | Industry says fewer devs needed; reality requires more technical capability |
| 17 | **Context Transfer Failure** | AI can't be given persistent context across sessions |

### What This Vault Solves

**✅ SOLVED: Project Overload (#1)**

The Projects MOC and `/project-snapshot` skill give instant visibility:

```
/project-snapshot
```

Generates a dashboard showing all active projects with health indicators. You finally know how many you're managing—and which need attention.

**✅ SOLVED: Scattered Decisions (#2)**

ADRs live in one place with relationship metadata. The `/find-decisions` skill searches across everything:

```
/find-decisions API Gateway
```

Returns every decision mentioning API Gateway, regardless of which project it originated from.

**✅ SOLVED: Ideas Without Homes (#5)**

The Incubator system provides a structured lifecycle:

```
/incubator "Event Sourcing for Audit Trail"
```

Creates an idea with lifecycle tracking: `seed → exploring → validated → accepted/rejected`. Ideas don't get lost—they get incubated until ready (or explicitly rejected with documented reasoning).

**✅ SOLVED: Digital Dustbin Effect (#12) and Tags Incomplete (#14)**

Metadata-driven organisation means notes are queryable, not filed. Every note has structured frontmatter:

```yaml
type: Meeting
project: "[[Project - Cloud Migration]]"
attendees: ["[[Jane Smith]]", "[[Alex Johnson]]"]
tags: [activity/architecture, technology/aws]
```

Dynamic Dataview queries surface notes by any combination of fields. No manual folder maintenance required.

**✅ SOLVED: PARA Doesn't Work (#13)**

This vault abandons PARA's folder-centric model. Instead:
- Notes organised by **type** (Meeting, ADR, Project, etc.)
- Navigation via **MOCs** (Maps of Content) with live queries
- Cross-references via **wiki-links** creating a knowledge graph
- Archive via **soft archiving** (metadata flag + folder move, links preserved)

**✅ SOLVED: Search Limitations (#10)**

Dataview queries replace keyword search:

```dataview
TABLE date, project, summary
FROM ""
WHERE type = "Meeting"
  AND contains(string(attendees), "Jane Smith")
SORT date DESC
```

Find all meetings with Jane—no keyword guessing required.

**✅ PARTIALLY SOLVED: Lost Screenshots (#9)**

The `/screenshot-analyze` and `/document-extract` skills use AI vision to extract text from images:

```
/screenshot-analyze +Attachments/cyber-form-screenshot.jpg
```

Returns OCR text, structure analysis, and extracted entities. The content becomes searchable—though the image still needs manual triggering.

**✅ SOLVED: Form Fatigue (#8)** *(New in v1.4.0)*

The FormSubmission system now tracks all governance forms:

```
/form DPIA "Customer Portal"
/form SecurityReview "API Gateway"
/form-status pending
```

Creates structured tracking notes with:
- Form type (DPIA, SecurityReview, RiskAssessment, ChangeRequest, ComplianceCheck)
- Status lifecycle (draft → submitted → pending → approved/rejected → expired)
- Expiry date tracking with automatic alerts
- Project and team linkage

The MOC - Form Submissions dashboard shows forms requiring attention, expiring soon, and status by project.

**✅ PARTIALLY SOLVED: Contextless AI (#11, #17)**

CLAUDE.md provides persistent context to Claude Code sessions. The AI knows your projects, note types, conventions, and acronyms. But this only works within Claude Code—other AI tools still lack context.

### What This Vault Doesn't Solve (Yet)

**⚠️ GAP: Prior Art Discovery (#6)**

The vault helps you search *your own* knowledge, but can't tell you if someone elsewhere in the organisation has tried something. This requires:
- Shared knowledge bases across teams
- Cross-vault search capabilities
- Integration with enterprise search

**✅ SOLVED: Transformation Patterns (#3)** *(New in v1.4.0)*

Projects now include transformation classification:

```yaml
transformationType: modernisation | migration | greenfield | integration | decommission | uplift
transformationScope: enterprise | department | team | application
aiInvolved: false  # Flag for AI/ML projects
```

This enables portfolio analysis—see all migrations, identify enterprise-wide transformations, or filter to AI projects. The Projects MOC includes sections for each transformation type.

**✅ SOLVED: AI Project Patterns (#4)** *(New in v1.4.0)*

New `AI_ADR` type with dedicated fields for AI architecture decisions:

```yaml
adrType: AI_ADR
aiProvider: aws-bedrock | azure-openai | openai | google | anthropic | custom
aiModel: claude-3 | gpt-4 | llama | custom
aiUseCase: generation | classification | extraction | conversation | agents
aiRiskLevel: high | medium | low
ethicsReviewed: false
biasAssessed: false
dataPrivacyReviewed: false
humanOversight: full | partial | minimal | none
```

ADR template includes "AI Considerations" section with checklists for ethics review, bias assessment, data privacy, and model governance. Human oversight levels are clearly defined from "full" (human approval for all outputs) to "none" (fully autonomous).

**✅ SOLVED: General Form Tracking (#8)** *(New in v1.4.0)*

FormSubmission note type tracks all governance forms:

```yaml
type: FormSubmission
formType: DPIA | SecurityReview | RiskAssessment | ChangeRequest | ComplianceCheck | Other
status: draft | submitted | pending | approved | rejected | expired
```

Skills: `/form <type> <name>` creates tracking notes, `/form-status [filter]` generates status reports. MOC shows forms requiring attention and expiring approvals.

**⚠️ GAP: Enterprise Search Integration (#10)**

The vault is powerful locally but isolated. No integration with:
- Confluence (reading/writing)
- SharePoint search
- Jira ticket linking
- Enterprise knowledge graphs

**✅ PARTIALLY SOLVED: Solo Technical Voice (#15)** *(New in v1.4.0)*

The `/exec-summary` skill generates non-technical summaries from ADRs, Projects, or Pages:

```
/exec-summary "ADR - API Gateway Selection" exec
/exec-summary "Project - Cloud Migration" manager
```

Translates technical content for different audiences:
- `exec` - C-suite, board level (business impact, risk, cost)
- `manager` - Department heads (operational impact, timeline, resources)
- `stakeholder` - Project stakeholders (what changes, how affects them)

Includes automatic translation of technical terms (API → "system connection", latency → "response time", etc.) and tone guidelines (active voice, short sentences, no unexplained acronyms).

**⚠️ GAP: Cross-Session AI Memory (#11, #17)**

Claude Code with CLAUDE.md provides session context, but:
- Context doesn't persist across days/weeks automatically
- No memory of "last time we discussed X"
- Daily notes help but require manual review

---

## Gap Analysis Summary

| Problem | Vault Status | Potential Enhancement |
|---------|--------------|----------------------|
| Project Overload | ✅ Solved | — |
| Scattered Decisions | ✅ Solved | — |
| Transformation Patterns | ✅ Solved (v1.4.0) | transformationType, transformationScope, aiInvolved |
| AI Project Patterns | ✅ Solved (v1.4.0) | AI_ADR type with ethics/bias/oversight |
| Ideas Without Homes | ✅ Solved | — |
| Prior Art Discovery | ⚠️ Gap | Requires enterprise integration |
| Cognitive Overload | ✅ Helped | Mental model clarity helps |
| Form Fatigue | ✅ Solved (v1.4.0) | FormSubmission type, /form, /form-status |
| Lost Screenshots | ✅ Partial | OCR skills work, needs automation |
| Search Limitations | ✅ Solved | — |
| Contextless AI | ✅ Partial | Works in Claude Code only |
| Digital Dustbin | ✅ Solved | — |
| PARA Doesn't Work | ✅ Solved | — |
| Tags Incomplete | ✅ Solved | — |
| Solo Technical Voice | ✅ Partial (v1.4.0) | /exec-summary skill for translation |
| AI Hype vs Reality | N/A | Human problem |
| Context Transfer | ⚠️ Partial | Limited to Claude Code |

**Key Insight:** The vault now solves the *personal* knowledge management crisis comprehensively. v1.4.0 closed the major gaps around governance forms, transformation tracking, and AI architecture patterns. The remaining gaps are largely about *organisational* knowledge sharing and *cross-tool* integration—problems that require enterprise-level solutions beyond a single vault.

---

## A Second Brain for Architecture Work

The **Obsidian Architect Vault Template** is a production-ready knowledge management system specifically designed for Solutions Architects. It's not a theoretical framework—it's been battle-tested through hundreds of projects, thousands of notes, and years of real-world architectural work at a major airline.

**What makes it different:**

| Traditional Notes | This Vault |
|-------------------|------------|
| Scattered across tools | Single interconnected system |
| Organised by folder | Organised by metadata (queryable) |
| Manual navigation | Dynamic views via Dataview |
| Static content | Automatically updating MOCs |
| No quality tracking | Built-in health monitoring |
| Text-only capture | AI-assisted workflows (32 skills) |

**The result:** A personal knowledge graph where every decision, meeting, project, and stakeholder connects to relevant context. Six months from now, finding that PostgreSQL decision takes seconds, not minutes.

---

## Part 1: The Foundation—Metadata-Driven Organisation

### Why Metadata Beats Folders

Traditional folder structures create a fundamental problem: a note can only exist in one place. Is a meeting about API Gateway Modernization a "meeting" or part of the "API Gateway" project? With folders, you choose one. With metadata, it's both.

**Every note has rich frontmatter:**

```yaml
---
type: Meeting
title: Meeting - 2026-01-07 API Gateway Architecture Review
date: '2026-01-07'
project: "[[Project - API Gateway Modernization]]"
attendees:
  - "[[Jane Smith]]"
  - "[[Alex Johnson]]"
  - "[[Michael Torres]]"
summary: Reviewed REST vs GraphQL options for new gateway layer
tags: [activity/architecture, technology/api, domain/integration]
---
```

**This metadata powers everything:**

```dataview
TABLE date, project, summary
FROM ""
WHERE type = "Meeting"
  AND contains(attendees, "[[Jane Smith]]")
SORT date DESC
LIMIT 10
```

**Result:** Every meeting with Jane, automatically. Change Jane's role? The connections remain. Complete a project? All related meetings, ADRs, and tasks are still linked.

### The 15 Note Types

Each note type has a specific purpose and schema:

**Core Workflow Types:**

| Type | Purpose | Example |
|------|---------|---------|
| **DailyNote** | Daily journal and task log | `2026-01-10.md` |
| **Meeting** | Discussion capture and decisions | `Meeting - 2026-01-07 Sprint Planning.md` |
| **Task** | Actionable work items | `Task - Review Security ADR.md` |
| **Project** | Major initiatives tracking | `Project - Cloud Migration.md` |
| **Person** | Stakeholder and contact info | `Jane Smith.md` |

**Architecture Types:**

| Type | Purpose | Example |
|------|---------|---------|
| **ADR** | Architecture Decision Records | `ADR - Use Kubernetes.md` |
| **Page** | Long-form documentation | `Page - API Design Standards.md` |
| **Incubator** | Research idea lifecycle | `Incubator - Service Mesh Evaluation.md` |
| **IncubatorNote** | Supporting research | `Incubator Note - Istio vs Linkerd.md` |

**Organisation Types:**

| Type | Purpose | Example |
|------|---------|---------|
| **Organisation** | Vendors and partners | `Organisation - AWS.md` |
| **Weblink** | Saved resources with AI summaries | `Weblink - Martin Fowler Microservices.md` |
| **MOC** | Maps of Content (navigation hubs) | `MOC - Projects MOC.md` |

**Plus:** AtomicNote, Course, CodeSnippet, Zettel, Query, Dashboard, OKR

---

## Part 2: Architecture Decision Records (ADRs)—Your Architectural Memory

### The Real Cost of Undocumented Decisions

**Scenario:** Your team is six months into a microservices migration. A new engineer asks why you're using synchronous REST calls between services instead of async messaging.

**Without ADRs:**
- 30 minutes searching Slack, email, and meeting notes
- Fragments of context but no complete picture
- "I think Bob mentioned something about latency requirements"
- Risk of re-deciding the same thing differently

**With ADRs:**
- "See [[ADR - Synchronous Communication for Order Flow]]"
- Complete context: problem, decision, alternatives considered
- Named decision-makers and approval chain
- Explicit tradeoffs documented
- Easy to revisit when requirements change

### Anatomy of an ADR

```yaml
---
type: Adr
title: ADR - Standardize on PostgreSQL for Transactional Data
status: accepted
adrType: Technology_ADR
description: Database selection for customer-facing services
project: "[[Project - Cloud Migration]]"
deciders:
  - "[[Jane Smith]]"
  - "[[Alex Johnson]]"
approvers:
  - "[[Architecture Review Board]]"
stakeholders:
  - "[[Platform Team]]"
  - "[[Data Team]]"
assumptions:
  - "ACID compliance required for financial transactions"
  - "Read-heavy workload (80/20 read/write ratio)"
  - "Expected growth to 10M records in first year"

# Relationships
relatedTo:
  - "[[ADR - Data Encryption at Rest]]"
  - "[[Project - Cloud Migration]]"
supersedes: []
dependsOn:
  - "[[ADR - Cloud Provider Selection (AWS)]]"

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-10
---

## Context

The Cloud Migration project requires a database for customer transaction records. Current on-premise Oracle database cannot be directly migrated. Team evaluated three options over two weeks.

## Decision

**We will use PostgreSQL (AWS RDS) for all transactional customer data.**

## Rationale

| Criterion | PostgreSQL | MongoDB | DynamoDB |
|-----------|------------|---------|----------|
| ACID Compliance | ✅ Full | ⚠️ Limited | ⚠️ Limited |
| Team Experience | ✅ Strong | ⚠️ Moderate | ❌ None |
| AWS Integration | ✅ RDS native | ⚠️ Atlas or self-managed | ✅ Native |
| Cost (projected) | £2,400/month | £3,100/month | £1,800/month |
| Schema Evolution | ⚠️ Migrations | ✅ Flexible | ⚠️ Complex |

**Key factor:** Financial transactions require ACID guarantees. MongoDB's transaction support, while improved, remains less battle-tested for our scale.

## Consequences

**Positive:**
- Strong ACID guarantees for financial integrity
- Team can leverage existing PostgreSQL expertise
- Excellent tooling ecosystem (pgAdmin, DataGrip)
- Clear upgrade path with RDS

**Negative:**
- Schema changes require formal migrations
- Less flexible than document databases for varying data shapes
- Vendor lock-in to AWS RDS (mitigated by standard PostgreSQL compatibility)

## Alternatives Considered

### MongoDB Atlas
Rejected due to weaker ACID guarantees for financial data. Would reconsider for non-transactional data stores.

### DynamoDB
Rejected due to team learning curve and complex migration from relational model. Cost advantages didn't outweigh risks.
```

### ADR Lifecycle Management

```
draft → proposed → accepted → [deprecated | superseded]
```

**Example workflow:**

1. **Draft:** Engineer writes ADR during research phase
2. **Proposed:** Submitted for architecture review
3. **Accepted:** Approved by Architecture Review Board
4. **Superseded:** Replaced by newer decision (links to successor)

**The ADRs MOC automatically tracks:**
- All accepted decisions (current standards)
- Proposed decisions awaiting review
- Decisions not reviewed in 12+ months (need validation)
- Decisions by confidence level
- Supersession chains (how decisions evolved)

---

## Part 3: The Incubator System—From Idea to Implementation

### The Problem with Scattered Research

Every architect has experienced this:

> "Six months ago, I spent two weeks researching service meshes. I had notes somewhere... maybe in that meeting doc? Or was it a draft ADR? I know I compared Istio and Linkerd..."

Ideas get lost. Research gets scattered. Promising patterns get forgotten before validation.

### The Solution: Idea Lifecycle Management

The **Incubator system** provides a structured workflow from initial spark to implementation (or informed rejection):

```
seed → exploring → validated → accepted/rejected
```

**Each status has clear meaning:**

| Status | What It Means | Your Action |
|--------|---------------|-------------|
| `seed` | Idea captured, not yet explored | Decide if worth investigating |
| `exploring` | Actively researching | Gather evidence, build case |
| `validated` | Research complete | Ready for review/decision |
| `accepted` | Approved for implementation | Graduate to Project or ADR |
| `rejected` | Not viable (documented why) | Archive learnings |

### Real-World Incubator Example

**Scenario:** You notice repeated complaints about observability across services. You wonder if a service mesh could help.

**Step 1: Capture the Seed**

```
/incubator Service Mesh for Observability
```

Creates `Incubator - Service Mesh for Observability.md`:

```yaml
---
type: Incubator
title: Incubator - Service Mesh for Observability
status: seed
domain: [infrastructure, architecture]
outcome: null
created: 2026-01-10
---

## Problem Statement

Distributed tracing across microservices is inconsistent. Each team implements observability differently, making cross-service debugging difficult.

## Hypothesis

A service mesh (Istio, Linkerd, or Cilium) could provide:
- Consistent distributed tracing
- Automatic mTLS between services
- Traffic management and canary deployments
- Unified observability dashboard

## Research Questions

- [ ] What's the operational overhead of running a mesh?
- [ ] How does it integrate with our existing Kubernetes setup?
- [ ] What's the performance impact (latency overhead)?
- [ ] Which mesh fits our team's capabilities?

## Decision Criteria

1. **Must have:** Distributed tracing with minimal code changes
2. **Must have:** Compatible with AWS EKS
3. **Should have:** Reasonable operational complexity
4. **Nice to have:** Traffic splitting for canary deployments
```

**Step 2: Explore with Supporting Research**

Create `Incubator Note - Istio vs Linkerd Comparison.md`:

```yaml
---
type: IncubatorNote
title: Incubator Note - Istio vs Linkerd Comparison
parent-ideas:
  - "[[Incubator - Service Mesh for Observability]]"
created: 2026-01-12
---

## Feature Comparison

| Feature | Istio | Linkerd |
|---------|-------|---------|
| mTLS | ✅ Automatic | ✅ Automatic |
| Distributed Tracing | ✅ Full (Jaeger) | ✅ Full |
| Resource Usage | ⚠️ Higher | ✅ Lightweight |
| Learning Curve | ⚠️ Steep | ✅ Moderate |
| AWS EKS Support | ✅ Native | ✅ Native |

## POC Results

Tested Linkerd in staging cluster (2026-01-15):
- Latency overhead: 1.2ms p99 (acceptable)
- Memory per proxy: 25MB (lighter than expected)
- Distributed tracing worked with existing Jaeger setup

## Team Feedback

Platform team prefers Linkerd due to:
- Simpler operational model
- Lower resource footprint
- Easier debugging
```

**Step 3: Validate and Graduate**

Update status to `validated` when research is complete:

```yaml
status: validated
```

If approved, graduate to a formal ADR:

```yaml
status: accepted
outcome: "[[ADR - Adopt Linkerd for Service Mesh]]"
```

The Incubator note becomes permanent context for the ADR—why this was explored, what was learned, how the decision was reached.

### The Incubator MOC

`Incubator - MOC.md` provides dynamic views:

```dataview
TABLE status, domain, file.mtime as "Last Updated"
FROM ""
WHERE type = "Incubator"
SORT status ASC, file.mtime DESC
```

**Views include:**
- **Seeds to triage:** New ideas needing attention
- **Actively exploring:** Current research
- **Ready for decision:** Validated ideas awaiting approval
- **By domain:** All infrastructure ideas, all security ideas, etc.
- **Stale ideas:** Not updated in 30+ days (need decision or archival)

---

## Part 4: 32 Claude Code Skills—AI-Assisted Workflows

### The Power of Integrated AI

Claude Code integrates directly with your vault, understanding your projects, people, technology stack, and terminology. Skills aren't generic prompts—they're workflows tailored to architecture work.

### Daily Workflow Skills

**`/daily`** — Create today's daily note with structure:

```markdown
## Morning Intentions
- Review [[ADR - API Gateway Selection]] feedback
- Prep for [[Meeting - 2026-01-10 Sprint Planning]]
- Follow up with [[Jane Smith]] on security review

## Work Log

### 10:00 - Architecture Review
...

## Evening Reflection

### Wins
- ADR approved after revisions!

### Challenges
- Security review taking longer than expected

### Tomorrow
- Security review follow-up
- Draft service mesh Incubator idea
```

**`/meeting <title>`** — Create meeting note with guided prompts:

```
/meeting API Gateway Review with Platform Team
```

Prompts for:
- Attendees (autocompletes from existing Person notes)
- Related project (links automatically)
- Agenda items
- Creates structured note ready for capture

**`/weekly-summary`** — Generate comprehensive weekly summary:

Launches 5 parallel sub-agents to analyse:
1. Daily notes from the week
2. Completed and pending tasks
3. Meetings and decisions made
4. ADR activity
5. Project progress

**Output:**
```markdown
# Weekly Summary: 2026-01-06 to 2026-01-10

## Highlights
- ✅ ADR - API Gateway Selection approved
- ✅ Cloud Migration milestone: staging environment deployed
- 🆕 3 new Incubator ideas captured

## Meetings (7)
| Date | Meeting | Key Decisions |
|------|---------|---------------|
| 2026-01-07 | Architecture Review | Approved GraphQL pilot |
| 2026-01-08 | Security Standup | Deferred PCI review to Q2 |
...

## Tasks Completed (12)
...

## ADR Activity
- Accepted: 2
- Proposed: 1
- Under Review: 3

## Next Week Focus
Based on open tasks and upcoming meetings...
```

### Engineering Management Skills

**`/project-status <project>`** — Comprehensive project report:

```
/project-status Cloud Migration
```

Launches 4 parallel sub-agents:
1. **Meetings Agent:** All project meetings, extract decisions
2. **ADRs Agent:** Related decisions and their status
3. **Tasks Agent:** Completion rates, blockers, assignees
4. **Synthesis Agent:** Combine into executive report

**Output:**
```markdown
# Project Status: Cloud Migration

**Generated:** 2026-01-10
**Health:** 🟢 On Track
**Last Activity:** Meeting yesterday

## Executive Summary

Cloud Migration is progressing well with 3 of 5 milestones complete.
Infrastructure ADRs approved. Currently blocked on security review.

## Timeline

| Milestone | Status | Date |
|-----------|--------|------|
| Architecture Design | ✅ Complete | 2025-11-15 |
| ADR Approvals | ✅ Complete | 2025-12-20 |
| Staging Environment | ✅ Complete | 2026-01-08 |
| Security Review | 🔄 In Progress | 2026-01-15 (target) |
| Production Deployment | ⏳ Pending | 2026-02-01 (target) |

## Key Decisions

| ADR | Status | Impact |
|-----|--------|--------|
| PostgreSQL Selection | ✅ Accepted | Database tier confirmed |
| Kubernetes on EKS | ✅ Accepted | Container orchestration set |
| API Gateway Selection | ✅ Accepted | Kong for ingress |

## Current Blockers

1. **Security Review** (blocking Production)
   - Owner: [[Michael Torres]]
   - Action: Complete PCI compliance checklist
   - ETA: 2026-01-15

## Team

| Person | Role | Recent Activity |
|--------|------|-----------------|
| [[Jane Smith]] | PM | Led sprint planning |
| [[Alex Johnson]] | Tech Lead | Deployed staging |
| [[Michael Torres]] | Security | Conducting review |

## Stakeholder Updates

Last stakeholder sync: 2026-01-05
Key message: On track for February deployment
```

**`/project-snapshot`** — Quick portfolio view:

```
/project-snapshot
```

**Output:**
```markdown
# Projects Snapshot

**Generated:** 2026-01-10

## Summary

| Status | Count |
|--------|-------|
| 🟢 On Track | 5 |
| 🟡 At Risk | 2 |
| 🔴 Blocked | 1 |

## Quick View

| Project | Health | Last Activity | Next Milestone |
|---------|--------|---------------|----------------|
| Cloud Migration | 🟢 | Today | Security Review |
| API Modernization | 🟢 | Yesterday | Phase 2 Design |
| Legacy Decommission | 🟡 | 3 days ago | Data Migration |
| New Payment Gateway | 🔴 | 1 week ago | Vendor Selection |
```

**`/adr-report [period]`** — ADR activity tracking:

```
/adr-report month
```

**Output:**
```markdown
# ADR Report: January 2026

## Summary

- **New ADRs:** 4
- **Accepted:** 3
- **Superseded:** 1
- **Pending Review:** 2

## Accepted This Month

| ADR | Date | Project | Deciders |
|-----|------|---------|----------|
| PostgreSQL Selection | 2026-01-05 | Cloud Migration | Jane, Alex |
| API Gateway Selection | 2026-01-08 | Cloud Migration | Jane, Michael |
| GraphQL for Mobile | 2026-01-10 | Mobile App | Sarah, Tom |

## Pending Review

| ADR | Submitted | Days Waiting | Owner |
|-----|-----------|--------------|-------|
| Event Sourcing for Audit | 2026-01-03 | 7 days | Alex |
| Kafka for Events | 2026-01-08 | 2 days | Michael |

## ADRs Needing Refresh (>12 months since review)

| ADR | Last Reviewed | Status |
|-----|---------------|--------|
| Microservices Architecture | 2025-01-10 | Due for review |
```

**`/dpia-status`** — GDPR/Data Protection compliance tracking:

```
/dpia-status
```

Tracks Data Protection Impact Assessments across projects:
- Which projects require DPIA
- Assessment status and dates
- Approvers and risk levels
- Follow-up actions needed

### Research & Discovery Skills

**`/related <topic>`** — Find all notes mentioning a topic:

```
/related Kubernetes
```

Launches 4 parallel sub-agents searching:
1. ADRs mentioning Kubernetes
2. Meeting notes discussing Kubernetes
3. Projects using Kubernetes
4. Incubator ideas related to Kubernetes

**Output:**
```markdown
# Related Notes: Kubernetes

## ADRs (3)
- [[ADR - Kubernetes on EKS]] (accepted)
- [[ADR - Helm for Package Management]] (accepted)
- [[ADR - Service Mesh Selection]] (proposed)

## Projects (2)
- [[Project - Cloud Migration]] - Primary orchestration platform
- [[Project - Platform Modernization]] - Kubernetes upgrade planned

## Meetings (7)
- 2026-01-07: Discussed EKS node sizing
- 2026-01-03: Reviewed Kubernetes security policies
...

## Incubator Ideas (1)
- [[Incubator - GitOps with ArgoCD]]

## People (Key Stakeholders)
- [[Alex Johnson]] - Platform lead, 12 mentions
- [[Sarah Chen]] - Security, 5 mentions
```

**`/timeline <project>`** — Chronological project history:

```
/timeline Cloud Migration
```

**Output:**
```markdown
# Timeline: Cloud Migration

## 2026-01

### Week 2 (Jan 6-10)
- **2026-01-10** 📝 ADR - API Gateway Selection (accepted)
- **2026-01-08** ✅ Task: Staging deployment (completed)
- **2026-01-07** 📅 Meeting: Sprint Planning

### Week 1 (Jan 1-5)
- **2026-01-05** 📝 ADR - PostgreSQL Selection (accepted)
- **2026-01-03** 📅 Meeting: Security Review Kickoff

## 2025-12

### Week 4 (Dec 23-31)
- **2025-12-28** ✅ Task: Infrastructure design doc (completed)
...

## Project Start
- **2025-09-15** 🆕 Project created
- Initial scope: Migrate customer services to AWS
```

**`/find-decisions <topic>`** — Find all decisions about a topic:

```
/find-decisions authentication
```

Searches ADRs, meeting notes, and daily journals for decisions related to authentication. Synthesises into a decision history.

**`/summarize <note>`** — Summarise a note or set of notes:

```
/summarize Meeting - 2026-01-07 Architecture Review.md
```

or

```
/summarize all meetings about Cloud Migration
```

### Vault Maintenance Skills

**`/vault-maintenance`** — Quarterly comprehensive health check:

Launches 5 parallel sub-agents:
1. **Orphan Detector:** Notes with no backlinks
2. **Link Validator:** Broken wiki-links
3. **Freshness Checker:** Stale content (>12 months)
4. **Metadata Auditor:** Missing required fields
5. **Naming Validator:** Convention violations

**Output:**
```markdown
# Vault Maintenance Report

**Generated:** 2026-01-10
**Health Score:** 85/100

## Issues by Severity

### 🔴 Critical (Fix Now)
- 3 broken wiki-links in active project notes

### 🟡 Warning (Fix This Week)
- 7 ADRs not reviewed in >12 months
- 2 orphaned notes (no backlinks)

### 🟢 Info (When Convenient)
- 5 notes missing optional metadata
- 2 naming convention deviations

## Broken Links

| Note | Broken Link | Suggestion |
|------|-------------|------------|
| Meeting 2026-01-05 | [[John Smithe]] | Did you mean [[John Smith]]? |
| Project Cloud | [[ADR - Database]] | Renamed to [[ADR - PostgreSQL Selection]] |

## Stale ADRs (Last reviewed >12 months ago)

| ADR | Last Reviewed | Action |
|-----|---------------|--------|
| Microservices Architecture | 2025-01-10 | Review and update |
| REST API Standards | 2025-02-15 | Verify still current |

## Recommended Actions

1. Fix 3 broken links (5 minutes)
2. Review 7 stale ADRs (60 minutes)
3. Link or archive 2 orphaned notes (10 minutes)

**Total estimated time:** 75 minutes
```

**`/check-weblinks`** — Test all saved URLs:

```
/check-weblinks
```

Tests every Weblink note's URL:
- ✅ Still accessible
- ⚠️ Redirected (provide new URL)
- ❌ Dead link (suggest removal or archive)

**`/archive <note>`** — Soft archive a note:

```
/archive Project - Legacy Decommission
```

- Adds archive metadata (`archived: true`, `archivedDate`, `archivedReason`)
- Moves to `+Archive/Projects/`
- Preserves all backlinks
- Excludes from active Dataview queries

**`/rename <pattern>`** — Batch rename with link updates:

```
/rename all meetings from December to use YYYY-MM-DD format
```

Finds affected files, shows preview, updates all wiki-links across the vault.

### Document Processing Skills

**`/pdf-to-page <path>`** — Convert PDF to Page note:

```
/pdf-to-page +Attachments/Architecture-Review-Deck.pdf
```

- Extracts text from PDF
- Converts each page to PNG image
- Creates Page note with embedded images
- Sonnet/Opus analyses content for key points

**`/pptx-to-page <path>`** — Convert PowerPoint:

```
/pptx-to-page +Attachments/Q4-Architecture-Overview.pptx
```

Two modes:
- **Quick:** Extract text only (docling)
- **Visual:** Convert slides to images (LibreOffice)

**`/document-extract <path>`** — OCR and extract from scanned docs:

```
/document-extract +Attachments/whiteboard-photo.jpg
```

Uses 4 Sonnet sub-agents:
1. **Text Extraction:** OCR all visible text
2. **Structure Analysis:** Identify document type and layout
3. **Content Classification:** Extract entities, dates, action items
4. **Quality Assessment:** Confidence scores, unclear sections

**`/screenshot-analyze <path>`** — Comprehensive screenshot analysis:

```
/screenshot-analyze +Attachments/error-message.png
```

Uses 3 Sonnet sub-agents to:
- Extract all text (OCR)
- Identify UI elements and application
- Detect error patterns
- Suggest troubleshooting steps

**`/diagram-review <path>`** — Analyse architecture diagrams:

```
/diagram-review +Attachments/system-architecture.png
```

Uses 4 Sonnet sub-agents:
1. **Component Identification:** What components exist
2. **Relationship Mapping:** How they connect
3. **Pattern Recognition:** Known architecture patterns
4. **Gap Analysis:** Missing elements, concerns

**`/attachment-audit`** — Audit all vault attachments:

```
/attachment-audit
```

Comprehensive analysis of all files in `+Attachments/`:
- Categorise by type (images, PDFs, docs)
- Identify orphaned attachments (not referenced)
- Find large files that could be compressed
- Visual content analysis for images
- Rename suggestions for unclear filenames

### Quick Capture Skills

**`/task <title>`** — Quick-create task:

```
/task Review security findings by Friday
```

Prompts for:
- Priority (high/medium/low)
- Due date
- Related project
- Assignee

**`/person <name>`** — Create person note:

```
/person Sarah Chen
```

Creates `Sarah Chen.md` with:
- Role and organisation fields
- Contact information placeholders
- Ready for first interaction notes

**`/weblink <url>`** — Save URL with AI summary:

```
/weblink https://martinfowler.com/articles/microservices.html
```

- Fetches page content
- Generates summary and key points
- Suggests related vault notes
- Adds relevant tags

**`/youtube <url>`** — Save video with transcript analysis:

```
/youtube https://youtube.com/watch?v=abc123
```

- Fetches video metadata
- Downloads and analyses transcript
- Generates timestamped key points
- Creates Weblink note

**`/incubator <title>`** — Quick-create incubator idea:

```
/incubator Event Sourcing for Audit Trail
```

Creates structured Incubator note ready for research.

---

## Part 5: The Knowledge Graph Effect

### From Notes to Network

After a month of consistent use, something powerful emerges. You have:
- 20 daily notes
- 15 meeting notes
- 10 tasks (5 completed)
- 3 projects documented
- 2 ADRs created
- 5 people added
- 1 Incubator idea

These aren't isolated documents. They're **interconnected nodes** in a knowledge graph.

### Emergent Navigation

**Open Jane Smith's person note:**
```markdown
## Backlinks

### Meetings (12)
- [[Meeting - 2026-01-07 Sprint Planning]]
- [[Meeting - 2026-01-03 Security Review]]
...

### Tasks Assigned (3)
- [[Task - Review Security ADR]]
...

### Projects Involved (2)
- [[Project - Cloud Migration]]
- [[Project - API Modernization]]

### ADR Decisions (4)
- Decider on [[ADR - PostgreSQL Selection]]
- Stakeholder on [[ADR - API Gateway Selection]]
...
```

**Open Project - Cloud Migration:**
```markdown
## Backlinks

### ADRs (5)
- [[ADR - PostgreSQL Selection]]
- [[ADR - Kubernetes on EKS]]
...

### Meetings (23)
- [[Meeting - 2026-01-07 Sprint Planning]]
...

### Tasks (18)
- [[Task - Security Review]] (in progress)
...

### Daily Notes (15)
- [[2026-01-10]] - Mentioned staging deployment
...

### Incubator Ideas (2)
- [[Incubator - GitOps with ArgoCD]]
...
```

**Open ADR - Use Kubernetes:**
```markdown
## Backlinks

### Implementing Projects
- [[Project - Cloud Migration]]

### Discussions
- [[Meeting - 2026-01-03 Container Strategy]]
- [[Meeting - 2025-12-15 Platform Options]]

### Related ADRs
- Supersedes: [[ADR - Docker Swarm (Deprecated)]]
- Depends on: [[ADR - AWS as Cloud Provider]]
- Related: [[ADR - Helm for Package Management]]
```

### Six Months Later

You can instantly answer:
- "What did we decide about databases?" → ADRs MOC, filter by topic
- "When did I last talk to Jane about security?" → Jane's person note
- "What was blocking Cloud Migration in December?" → Daily notes from that period
- "What alternatives did we consider for API gateway?" → ADR shows all options
- "Who was involved in the Kubernetes decision?" → ADR lists deciders, meeting notes show discussions

**The vault becomes your architectural memory.**

---

## Part 6: Quality Monitoring—Keeping Your Vault Healthy

### The Vault Quality Dashboard

`MOC - Vault Quality Dashboard.md` provides real-time health monitoring:

```dataview
TABLE WITHOUT ID
  "🔴 Orphaned Notes" as "Check",
  length(filter(pages, (p) => length(p.file.inlinks) = 0)) as "Count"
FROM ""
WHERE type != null AND type != "DailyNote"
```

**Built-in quality checks:**

| Check | Why It Matters |
|-------|----------------|
| Orphaned notes | Unlinked content may be forgotten |
| Broken wiki-links | References to non-existent notes |
| Stale ADRs | Decisions not reviewed in 12+ months |
| Missing metadata | Notes without required frontmatter |
| Inactive projects | Active projects not updated in 30+ days |
| Missing meeting summaries | Meetings without captured outcomes |

### Automated Quality Checks

**Node.js automation** (included):

```bash
# Install dependencies (one-time)
npm install

# Validate frontmatter and links
npm run validate

# Vault health metrics and score
npm run health

# Export knowledge graph (JSON)
npm run graph

# Run all checks
npm run test
```

**Example health output:**
```
Vault Health Report
===================

Overall Score: 85/100

Metrics:
- Notes: 127
- Linked: 94%
- Orphaned: 8
- Broken Links: 3
- Stale (>12mo): 7
- Complete Metadata: 89%

Recommendations:
1. Fix 3 broken links (5 min)
2. Review 7 stale ADRs (45 min)
3. Link or archive 8 orphans (15 min)
```

### Recommended Review Cadence

| Frequency | Activity | Time |
|-----------|----------|------|
| **Daily** | Daily note, meeting capture | 15 min |
| **Weekly** | Review open tasks, project status | 30 min |
| **Monthly** | Stale content review, broken links | 1 hour |
| **Quarterly** | Full quality audit, archive cleanup | 2 hours |

---

## Part 7: A Day in the Life

### Morning (10 minutes)

**7:30 AM — Start with daily note:**

```
/daily
```

Review yesterday's "Tomorrow" section. Note today's priorities:

```markdown
## Today's Focus

1. [[Task - Security Review]] - Need [[Michael Torres]] feedback
2. Prep for [[Meeting - 2026-01-10 Architecture Review]]
3. Draft response to [[Incubator - Service Mesh Evaluation]]
```

### During the Day

**10:00 AM — Architecture Review Meeting:**

```
/meeting Architecture Review
```

```markdown
## Attendees
- [[Jane Smith]] (Chair)
- [[Alex Johnson]]
- [[Michael Torres]]
- [[Sarah Chen]]

## Agenda
1. Security review status
2. API Gateway decision
3. Q2 planning

## Notes

### Security Review Update
- Michael presented initial findings
- No critical issues, 3 medium concerns
- Action: [[Michael Torres]] to complete by Friday

### API Gateway Decision
- Reviewed [[ADR - API Gateway Selection]]
- **Decision:** Approved Kong for production
- Action: Update ADR status to accepted

### Q2 Planning
- Discussed [[Incubator - Service Mesh Evaluation]]
- Agreed to move to formal evaluation in Q2
- Action: [[Alex Johnson]] to draft timeline
```

**2:00 PM — Research time:**

```
/youtube https://youtube.com/watch?v=service-mesh-talk
```

Watch conference talk on service mesh. Save with summary:

```markdown
## Key Points

- 00:05:30 - Istio architecture overview
- 00:12:45 - Performance impact discussion
- 00:23:15 - Migration strategies from sidecar-less

## Relevance

Links to [[Incubator - Service Mesh Evaluation]]
Confirms Linkerd's simpler operational model
```

**4:00 PM — Quick task from Slack:**

```
/task Review Terraform modules by Monday
```

```yaml
priority: medium
dueBy: 2026-01-13
project: "[[Project - Cloud Migration]]"
assignedTo: ["[[Self]]"]
```

### Evening (10 minutes)

**6:00 PM — Update daily note:**

```markdown
## Work Log

### Architecture Review (10:00-11:30)
- API Gateway decision approved ✅
- Security review on track
- Q2 planning started

### Service Mesh Research (14:00-15:30)
- Watched conference talk
- Updated Incubator note with findings

## Wins
- API Gateway ADR approved!
- Good progress on service mesh research

## Challenges
- Security review taking longer than expected
- Need to carve out more research time

## Tomorrow
- Follow up on security review
- Start Q2 planning document
- Schedule service mesh discussion with Alex
```

**Total vault time:** ~35 minutes
**Value created:** Permanent record of decisions, context preserved, ideas captured

---

## Part 8: Getting Started

### Quick Start (30 minutes)

**1. Clone the repository:**
```bash
git clone https://github.com/DavidROliverBA/obsidian-architect-vault-template.git
cd obsidian-architect-vault-template
```

**2. Open in Obsidian:**
- Download Obsidian: https://obsidian.md
- File → Open Vault → Select directory

**3. Install required plugins:**
- Settings → Community Plugins → Browse
- Install and enable **Dataview**
- Install and enable **Templater**

**4. Explore the vault:**
- Open `Dashboard - Dashboard.md`
- Navigate through the MOCs
- Review example notes

**5. Create your first daily note:**
```
/daily
```

### Full Setup (1-2 hours)

Follow `Page - Vault Setup Checklist.md`:

1. **Replace example content:**
   - Update Person notes with your colleagues
   - Replace example Projects with your real projects
   - Customise ADR templates for your org

2. **Update context files:**
   - `.claude/context/projects-template.md` → Your projects
   - `.claude/context/technology-template.md` → Your tech stack
   - `.claude/context/people-template.md` → Key stakeholders
   - `.claude/context/acronyms-template.md` → Your org's acronyms

3. **Customise templates:**
   - Adjust ADR approval workflow
   - Add custom fields to Project template
   - Modify meeting structure

4. **Create your first ADR:**
   - Pick a recent decision
   - Use `/adr <title>` to create
   - Document while context is fresh

**After 1 week:** You'll have a valuable knowledge base.
**After 1 month:** You won't know how you worked without it.

---

## What's Included

**Repository:** https://github.com/DavidROliverBA/obsidian-architect-vault-template

**Latest Release:** [v1.4.0](https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.4.0)

| Component | Count | Description |
|-----------|-------|-------------|
| Directories | 9 | Organised folder structure |
| Note Templates | 16 | All note types covered (incl. FormSubmission) |
| Example Notes | 20+ | Realistic interconnected examples |
| MOCs | 14 | Dynamic navigation hubs (incl. Form Submissions) |
| Claude Code Skills | 35 | AI-assisted workflows |
| Node.js Scripts | 3 | Automated quality checks |
| Documentation Files | 8 | Comprehensive guides |

**Requirements:**
- **Obsidian** (free or paid)
- **Dataview plugin** (free) — Required
- **Templater plugin** (free) — Required

**Optional:**
- **Claude Code** — For AI-assisted skills
- **Node.js 18+** — For automation scripts
- **docling, poppler** — For document processing

**License:** MIT (free to use, modify, share)

---

## Conclusion: Your Architectural Memory

As Solutions Architects, our value comes from:
- **Making informed decisions** based on full context
- **Connecting patterns** across domains and projects
- **Remembering why** we made past choices
- **Sharing knowledge** effectively with stakeholders

A well-maintained vault becomes your competitive advantage. It's not just note-taking—it's:

- Your **architectural memory** (every decision documented)
- Your **decision journal** (rationale preserved)
- Your **project tracker** (status at a glance)
- Your **knowledge graph** (connections emerge)
- Your **research system** (ideas to implementation)
- Your **second brain** (extended cognition)

**32 skills. 15 note types. 13 MOCs. One vault.**

Whether you're a solo architect or leading a team, this template scales with your needs. It works for enterprise architects managing portfolios, technical architects deep in implementation, and platform engineers building foundations.

**Start building yours today.**

Clone the repository. Create your first daily note. Document that ADR while the context is fresh.

Your future self—searching for that decision six months from now—will thank you.

---

## About

This template was created by extracting and generalising patterns from a production vault used daily in a Solutions Architect role at British Airways. It represents years of refinement based on real architectural work across cloud platforms, data systems, aircraft integration, and enterprise architecture.

**Author:** David Oliver
**Role:** Solutions Architect, British Airways Operations & Engineering IT
**GitHub:** [github.com/DavidROliverBA](https://github.com/DavidROliverBA)

**Version History:**
- **v1.4.0** (2026-01-11) — FormSubmission system, Transformation taxonomy, AI_ADR type, /exec-summary skill
- **v1.3.0** (2026-01-10) — Incubator system, 18 new skills, rules directory
- **v1.2.0** (2026-01-09) — Node.js automation, vault maintenance skills
- **v1.1.0** (2026-01-08) — Visual analysis skills, screenshots
- **v1.0.0** (2026-01-07) — Initial release

---

**If this helps you, give it a star on GitHub and share it with fellow architects!** ⭐

**Happy knowledge building!** 🚀

---

**Full Changelog:** https://github.com/DavidROliverBA/obsidian-architect-vault-template/compare/v1.3.0...v1.4.0
