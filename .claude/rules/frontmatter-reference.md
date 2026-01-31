# Frontmatter Reference

Quick reference for all frontmatter fields organised by pillar. See [[Concept - Vault Ontology]] for the full model.

## Universal Fields

All notes must include:

```yaml
type: <Type> # Required - identifies note type
pillar: entity | node | event | view | navigation # Required - identifies pillar
title: <Title> # Required
created: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [] # Hierarchical tags
```

## Relationship Fields

All content notes (not Navigation) should include:

```yaml
nodeRelationships: [] # Links to knowledge nodes
  # - "[[Concept - Data Quality]]"
  # - "[[Pattern - Event-Driven Architecture]]"

entityRelationships: [] # Links to entities
  # - "[[Person - Jane Smith]]"
  # - "[[System - Sample ERP]]"
```

---

# ENTITIES

Things that exist independently. Location: Root directory.

## Person

```yaml
type: Person
pillar: entity
title: <Name>
role: null
organisation: null # "[[Organisation - X]]"
emailAddress: null
aliases: [] # For shorter wiki-links
nodeRelationships: []
entityRelationships: []
```

## System

```yaml
type: System
pillar: entity
title: <Name>
systemId: "<SYSTEM-ID>"
aliases: [] # ["ERP", "SAP"]
apmNumber: null # APM0001234
systemType: application | platform | database | middleware | saas | infrastructure | interface | null
owner: null # "[[Person - X]]"
status: active | planned | deprecated | retired | null
criticality: critical | high | medium | low | null
hosting: on-prem | aws | azure | saas | external | hybrid | null
vendor: null # "[[Organisation - X]]"

# External References
confluenceUrl: null
cmdbId: null
documentationUrl: null

# Technology
technology: [] # [java, python, postgresql]

# Lifecycle (Gartner TIME)
timeCategory: tolerate | invest | migrate | eliminate | null
replacedBy: null # "[[System - Successor]]"
predecessors: []

# Data Classification
dataClassification: public | internal | confidential | secret | null
gdprApplicable: false
piiHandled: false

# Relationships
connectsTo: [] # ["[[System - Y]]"]
nodeRelationships: []
entityRelationships: []

# Quality
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false
reviewed: null
```

## Organisation

```yaml
type: Organisation
pillar: entity
title: <Name>
organisationType: company | vendor | partner | department | team | null
industry: null
website: null
nodeRelationships: []
entityRelationships: [] # ["[[Person - Contact]]"]
```

## DataAsset

```yaml
type: DataAsset
pillar: entity
title: <Name>
assetId: <unique-identifier> # "DATA-PRODUCT-001"

# Classification
domain: engineering | data | operations | finance | hr | supply-chain | maintenance
dataType: database-table | database-view | api-endpoint | kafka-topic | data-product | data-lake | file | report | cache
classification: public | internal | confidential | secret

# Location & Format
sourceSystem: null # "[[System - X]]"
storageLocation: null
format: sql | json | parquet | avro | csv | xml | binary

# Ownership
owner: null # "[[Person - X]]"
steward: null # "[[Person - Y]]"

# Data Relationships
producedBy: [] # ["[[System - X]]"]
consumedBy: [] # ["[[System - Y]]"]
derivedFrom: [] # Upstream assets
feedsInto: [] # Downstream assets

# Operational
refreshFrequency: real-time | hourly | daily | weekly | monthly | ad-hoc | null
slaAvailability: null
slaLatency: null

# Governance
gdprApplicable: false
piiFields: []

# Relationships
nodeRelationships: []
entityRelationships: []

# Quality
confidence: medium
freshness: current
verified: false
reviewed: null
```

## Location

```yaml
type: Location
pillar: entity
title: <Name>
locationType: office | data-centre | warehouse | factory | null
address: null
country: null
nodeRelationships: []
entityRelationships: [] # ["[[Organisation - X]]"]
```

---

# NODES

Units of knowledge that persist. Location: Root directory.

## Concept

What is X? Definitions, explanations.

```yaml
type: Concept
pillar: node
title: <Title>
description: null # Brief explanation
aliases: [] # Alternative names
keywords: [] # Searchable terms

# Relationships
nodeRelationships: [] # Related concepts, patterns
entityRelationships: [] # Systems, people this relates to

# Quality
summary: null
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis | external
verified: false
reviewed: null
```

## Pattern

How to do X. Approaches, architectures.

```yaml
type: Pattern
pillar: node
title: <Title>
patternType: architecture | integration | data | security | process | null
description: null
aliases: []
keywords: []

# Relationships
nodeRelationships: []
entityRelationships: []

# Quality
summary: null
confidence: high | medium | low
freshness: current | recent | stale
verified: false
reviewed: null
```

## Capability

What we can do. Skills, abilities.

```yaml
type: Capability
pillar: node
title: <Title>
capabilityType: technical | business | operational | null
maturity: emerging | developing | established | declining | null
description: null

# Relationships
nodeRelationships: []
entityRelationships: [] # Systems that provide this capability

# Quality
confidence: medium
freshness: current
verified: false
reviewed: null
```

## Theme

Cross-cutting concerns.

```yaml
type: Theme
pillar: node
title: <Title>
scope: enterprise | department | project | null
description: null
keywords: []

# Relationships
nodeRelationships: []
entityRelationships: []

# Quality
confidence: medium
freshness: current
verified: false
reviewed: null
```

## Weblink

External knowledge resources.

```yaml
type: Weblink
pillar: node
title: <Title>
url: <URL>
domain: <domain>
createdAt: <ISO timestamp>
description: null

# Relationships
nodeRelationships: [] # Concepts this resource explains
entityRelationships: [] # Systems/orgs this is about
```

---

# EVENTS

Things that happen. Location: Organised in folders.

## Meeting

Location: `Meetings/YYYY/`

```yaml
type: Meeting
pillar: event
title: <Title>
date: "YYYY-MM-DD"
time: null # HH:MM
attendees: [] # ["[[Person - X]]"]
summary: null

# Relationships
project: null # "[[Project - X]]"
nodeRelationships: [] # Topics discussed
entityRelationships: [] # People, systems involved
```

## Project

Location: `Projects/`

```yaml
type: Project
pillar: event
title: <Name>
status: active | paused | completed
priority: high | medium | low
timeFrame: YYYY-MM-DD - YYYY-MM-DD
collections: <program>

# Classification
transformationType: modernisation | migration | greenfield | integration | decommission | uplift | null
transformationScope: enterprise | department | team | application | null
aiInvolved: false

# Relationships
nodeRelationships: [] # Patterns, concepts applied
entityRelationships: [] # Systems, people, orgs involved

# Quality
summary: null
confidence: high | medium | low
freshness: current | recent | stale
verified: false
reviewed: null
```

## Workstream

Project sub-division. Location: `Projects/`

```yaml
type: Workstream
pillar: event
title: <Name>
project: null # "[[Project - X]]"
status: active | paused | completed
description: null

# Relationships
nodeRelationships: []
entityRelationships: []
```

## Forum

Recurring meeting series. Location: `Projects/`

```yaml
type: Forum
pillar: event
title: <Name>
frequency: weekly | fortnightly | monthly | quarterly | null
description: null

# Relationships
nodeRelationships: [] # Topics covered
entityRelationships: [] # Regular attendees
```

## Task

Location: `Tasks/`

```yaml
type: Task
pillar: event
title: <Title>
completed: false
priority: high | medium | low
doDate: null # When to start
dueBy: null # Hard deadline
project: null # "[[Project - X]]"
assignedTo: [] # ["[[Person - X]]"]
parentTask: null # "[[Task - Parent]]"
subtasks: [] # ["[[Task - Child]]"]

# Relationships
nodeRelationships: []
entityRelationships: []
```

## ADR

Architecture Decision Record. Location: `ADRs/`

```yaml
type: ADR
pillar: event
title: <Title>
status: draft | proposed | accepted | deprecated | superseded
adrType: Technology_ADR | Architecture_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
description: null
date: YYYY-MM-DD # Decision date
project: null
jiraTicket: null
deciders: [] # ["[[Person - X]]"]
approvers: []
stakeholders: []

# Source (if synced)
source: local | confluence
sourcePageId: null
sourceUrl: null
readOnly: false

# ADR Relationships
supersedes: [] # ADRs this replaces
dependsOn: [] # ADRs this requires
contradicts: [] # Known conflicts

# Relationships
nodeRelationships: [] # Patterns, concepts
entityRelationships: [] # Systems affected

# Quality
summary: null
keywords: []
confidence: high | medium | low
freshness: current | recent | stale
verified: false
reviewed: null

# AI-Specific Fields (for AI_ADR)
aiProvider: aws-bedrock | azure-openai | openai | google | anthropic | custom | null
aiModel: null # Model name/version
aiUseCase: generation | classification | extraction | conversation | agents | null
aiRiskLevel: high | medium | low | null
ethicsReviewed: false
biasAssessed: false
dataPrivacyReviewed: false
humanOversight: full | partial | minimal | none | null
```

## Email

Location: `Emails/`

```yaml
type: Email
pillar: event
title: <Subject>
subject: null
from: null # "[[Person - X]]" or address
to: []
cc: []
date: YYYY-MM-DD
time: null

# Classification
direction: inbound | outbound | draft
purpose: action-required | waiting | fyi | reference | decision
status: draft | sent | received | processed | archived
priority: high | medium | low

# Relationships
project: null
person: null # Primary contact
thread: null # "[[Email - Previous]]"
createdTasks: []
nodeRelationships: []
entityRelationships: []

# Quality
summary: null
keywords: []
```

## Trip

Location: `Trips/`

```yaml
type: Trip
pillar: event
title: <Destination>
status: idea | planning | booked | completed | cancelled
tripType: holiday | city-break | adventure | family-visit | business | null
destination: null
country: null
startDate: null
endDate: null
travellers: []
budget: null
currency: GBP | EUR | USD

# Relationships
nodeRelationships: []
entityRelationships: []
```

## Daily

Daily journal. Location: `Daily/YYYY/`

```yaml
type: Daily
pillar: event
title: YYYY-MM-DD
date: "YYYY-MM-DD"

# Relationships
nodeRelationships: [] # Topics worked on
entityRelationships: [] # People interacted with
```

## Incubator

Research activity that can spawn nodes. Location: `Incubator/`

```yaml
type: Incubator
pillar: event
title: <Title>
status: seed | exploring | validated | accepted | rejected
domain: []
outcome: null # What it spawned: "[[Concept - X]]"

# Relationships
nodeRelationships: [] # Related research
entityRelationships: []
spawnedNodes: [] # ["[[Concept - X]]", "[[Pattern - Y]]"]
```

## FormSubmission

Governance submission. Location: `Forms/`

```yaml
type: FormSubmission
pillar: event
title: <Type> for <Project>
formType: DPIA | SecurityReview | RiskAssessment | ChangeRequest | ComplianceCheck | Other
status: draft | submitted | pending | approved | rejected | expired
project: null # "[[Project - X]]"
submittedDate: null
responseDate: null
expiryDate: null
referenceNumber: null

# Relationships
nodeRelationships: []
entityRelationships: []
```

---

# VIEWS

Aggregated data and reports. Location: Root directory.

## Dashboard

Dynamic overview with metrics and live queries.

```yaml
type: Dashboard
pillar: view
title: <Scope>
scope: null # What this dashboard covers
refreshed: YYYY-MM-DD
dataviewQueries: [] # List of key queries this dashboard runs
```

## Query

Saved Dataview queries for reuse.

```yaml
type: Query
pillar: view
title: <Name>
description: null # What this query finds
queryType: table | list | task | calendar
scope: null # What area it queries
```

## ArchModel

Architecture diagram view definitions.

```yaml
type: ArchModel
pillar: view
title: <View Name>
viewType: context | container | landscape | data-flow
focusSystem: null # "[[System - X]]"
includeSystems: []
output:
  format: mermaid | python-diagrams | canvas
lastGenerated: null
```

---

# NAVIGATION

Finding aids. Location: Root with `_` prefix.

## MOC

Map of Content - curated navigation hub.

```yaml
type: MOC
pillar: navigation
title: <Scope>
scope: null # What this MOC covers
refreshed: YYYY-MM-DD
```

---

# GOVERNANCE

Rules and standards. Location: `Sync/`

## Policy

Organisational policies (typically synced from external source).

```yaml
type: Policy
pillar: governance
title: <Title>
policyId: null
scope: enterprise | department | team | null
status: draft | active | deprecated | archived
owner: null # "[[Person - X]]"
effectiveDate: null
reviewDate: null

# Source (if synced)
source: local | confluence
sourceUrl: null
readOnly: false

# Relationships
nodeRelationships: []
entityRelationships: []
```

## Guardrail

Technical constraints and standards.

```yaml
type: Guardrail
pillar: governance
title: <Title>
guardrailType: architecture | security | data | integration | null
scope: enterprise | department | team | null
status: active | proposed | deprecated
enforcementLevel: mandatory | recommended | optional

# Source (if synced)
source: local | confluence
sourceUrl: null
readOnly: false

# Relationships
nodeRelationships: [] # Patterns this enforces
entityRelationships: [] # Systems this applies to
```

---

# LEGACY TYPES

These types are being migrated:

| Old Type             | New Type                             | Pillar | Action              |
| -------------------- | ------------------------------------ | ------ | ------------------- |
| `Page`               | `Concept` / `Pattern` / `Theme`      | Node   | Classify by content |
| `Node`               | `Workstream` / `Forum` / appropriate | Event  | Reclassify          |
| `DailyNote`          | `Daily`                              | Event  | Rename              |
| `Person` (no prefix) | `Person` (with prefix)               | Entity | Add prefix          |
| `AtomicNote`         | `Concept`                            | Node   | Reclassify          |
| `IncubatorNote`      | Part of `Incubator`                  | Event  | Merge               |
| `OKR`                | `Task` with OKR tag                  | Event  | Reclassify          |
| `Course`             | `Incubator` or archive               | Event  | Case by case        |
| `CodeSnippet`        | `Pattern` or archive                 | Node   | Case by case        |
| `Article`            | `Concept` or `Weblink`               | Node   | Case by case        |
| `Prompt`             | Keep in `.claude/prompts/`           | -      | Config, not content |

---

# FIELD VALUE STANDARDS

| Field Type | Format    | Example                 |
| ---------- | --------- | ----------------------- |
| Dates      | ISO 8601  | `2026-01-30`            |
| Booleans   | lowercase | `true`, `false`         |
| Status     | lowercase | `active`, `proposed`    |
| Priority   | lowercase | `high`, `medium`, `low` |
| Wiki-links | quoted    | `"[[Note Title]]"`      |
| Arrays     | brackets  | `["item1", "item2"]`    |

---

# ARCHIVE FIELDS

Added when using `/archive`:

```yaml
archived: true
archivedDate: YYYY-MM-DD
archivedReason: "<reason>"
```

Archived notes move to `Archive/` folder, organised by pillar:

- `Archive/Entities/`
- `Archive/Nodes/`
- `Archive/Events/`
