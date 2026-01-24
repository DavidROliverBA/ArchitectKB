# Frontmatter Reference

Quick reference for all frontmatter fields by note type.

## Universal Fields

All notes should include:

```yaml
type: <NoteType> # Required
title: <Title> # Required
created: YYYY-MM-DD # Creation date
modified: YYYY-MM-DD # Last modified
tags: [] # Categorisation tags
```

## Type Quick Reference

### Task

```yaml
type: Task
completed: false
priority: high | medium | low
doDate: null # When to start
dueBy: null # Hard deadline
project: null # "[[Project]]"
assignedTo: [] # ["[[Person]]"]
parentTask: null # "[[Task - Parent]]" (if subtask)
subtasks: [] # ["[[Task - Child 1]]", "[[Task - Child 2]]"]
```

### Project

```yaml
type: Project
status: active | paused | completed
priority: high | medium | low
timeFrame: YYYY-MM-DD - YYYY-MM-DD
collections: <program>
# Transformation Classification
transformationType: modernisation | migration | greenfield | integration | decommission | uplift | null
transformationScope: enterprise | department | team | application | null
aiInvolved: false # Does project involve AI/ML?
```

### Meeting

```yaml
type: Meeting
date: "YYYY-MM-DD"
project: null
attendees: [] # ["[[Person]]"]
summary: null
collections: null # "1:1", "Sprint"
```

### ADR

```yaml
type: Adr
status: proposed | accepted | deprecated | superseded
adrType: Technology_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
description: null
project: null
externalRef: null
deciders: []
approvers: []
stakeholders: []
assumptions: []
# Relationships
relatedTo: []
supersedes: []
dependsOn: []
contradicts: []
# Quality Indicators
summary: null
keywords: [] # Searchable keywords
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis
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

### Person

```yaml
type: Person
role: null
organisation: null # "[[Organisation]]"
emailAddress: null
```

### Weblink

```yaml
type: Weblink
url: <URL>
domain: <domain>
createdAt: <ISO timestamp>
```

### DailyNote

```yaml
type: DailyNote
date: "YYYY-MM-DD"
```

### Incubator

```yaml
type: Incubator
status: seed | exploring | validated | accepted | rejected
domain: []
outcome: null
```

### IncubatorNote

```yaml
type: IncubatorNote
parent-ideas: [] # ["[[Incubator - Idea]]"]
```

### FormSubmission

```yaml
type: FormSubmission
formType: DPIA | SecurityReview | RiskAssessment | ChangeRequest | ComplianceCheck | Other
status: draft | submitted | pending | approved | rejected | expired
project: null # "[[Project]]"
requestingTeam: null # Team requiring the form
submittedDate: null # YYYY-MM-DD
responseDate: null # YYYY-MM-DD
expiryDate: null # YYYY-MM-DD (when approval expires)
referenceNumber: null # External reference/ticket
attachments: [] # Links to screenshots/PDFs
```

### OKR

```yaml
type: Okr
status: active | completed | abandoned
period: <Q1 2026 | H1 2026 | 2026>
objective: null
keyResults: []
project: null
```

### Query

```yaml
type: Query
description: null
queryType: table | list | task
```

### Course

```yaml
type: Course
status: not-started | in-progress | completed
provider: null
url: null
completedDate: null
```

### MOC

```yaml
type: MOC
scope: null
```

### Dashboard

```yaml
type: Dashboard
refreshed: YYYY-MM-DD
```

### CodeSnippet

```yaml
type: CodeSnippet
language: python | javascript | bash | yaml | sql | other
purpose: null
```

### System

```yaml
type: System
systemId: "{{systemId}}"
aliases: [] # Alternative names
apmNumber: null # Application Portfolio Management ID
systemType: application | platform | infrastructure | database | middleware | saas | null
owner: null # "[[Person]]"
status: active | planned | deprecated | retired | null
criticality: critical | high | medium | low | null
hosting: on-prem | aws | azure | gcp | saas | hybrid | null
vendor: null # "[[Organisation - Vendor]]"
# Technology
technology: [] # [java, python, postgresql]
# Integrations
connectsTo: [] # ["[[System - Other]]"]
# Lifecycle
launchDate: null # YYYY-MM-DD
sunsetDate: null # YYYY-MM-DD
timeCategory: tolerate | invest | migrate | eliminate | null # Gartner TIME model
replacedBy: null # "[[System - Successor]]"
predecessors: [] # ["[[System - Dependency]]"]
# Data Classification
dataClassification: public | internal | confidential | secret | null
gdprApplicable: false
# Quality Indicators
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false
reviewed: null
```

### DataAsset

```yaml
type: DataAsset
assetId: null # Unique identifier
domain: engineering | data | operations | finance | null
dataType: database-table | database-view | api-endpoint | kafka-topic | data-product | data-lake | file | report | cache
classification: public | internal | confidential | secret
sourceSystem: null # "[[System - X]]"
storageLocation: null # path/table/endpoint
format: sql | json | parquet | avro | csv | xml | binary
owner: null # "[[Person]]"
steward: null # Data governance contact
# Relationships
producedBy: [] # ["[[System - X]]"]
consumedBy: [] # ["[[System - Y]]"]
plannedConsumers: [] # Future consumers
deprecatingConsumers: [] # Systems moving away
# Lineage
derivedFrom: [] # Upstream assets
feedsInto: [] # Downstream assets
# Operational
refreshFrequency: real-time | hourly | daily | weekly | monthly | null
# Governance
gdprApplicable: false
piiFields: []
# Quality Indicators
confidence: medium
freshness: current
verified: false
reviewed: null
```

### Article

```yaml
type: Article
articleType: article | blog-post | document | video | podcast | linkedin-post
platform: medium | substack | confluence | linkedin | youtube | spotify | internal | null
targetAudience: internal | external | both
parentIdea: null # "[[Incubator - Source]]"
status: draft | ready | published | archived
publishedUrl: null
publishedDate: null
# Quality Indicators
summary: null
keywords: []
confidence: medium
freshness: current
source: synthesis
verified: false
reviewed: null
# Relationships
relatedTo: []
```

### Trip

```yaml
type: Trip
status: idea | planning | booked | completed | cancelled
tripType: holiday | city-break | adventure | business | null
destination: null
country: null
startDate: null # YYYY-MM-DD
endDate: null # YYYY-MM-DD
travellers: []
budget: null
currency: GBP | EUR | USD
# Notion Sync (optional)
notionPageId: null
notionUrl: null
lastSynced: null
syncStatus: untracked | synced | local-ahead | remote-ahead | conflict
```

## Archive Fields

Added when using `/archive`:

```yaml
archived: true
archivedDate: YYYY-MM-DD
archivedReason: "<reason>"
```

## Field Value Standards

| Field Type | Format    | Example                 |
| ---------- | --------- | ----------------------- |
| Dates      | ISO 8601  | `2026-01-10`            |
| Booleans   | lowercase | `true`, `false`         |
| Status     | lowercase | `active`, `proposed`    |
| Priority   | lowercase | `high`, `medium`, `low` |
| Wiki-links | quoted    | `"[[Note Title]]"`      |
| Arrays     | brackets  | `["item1", "item2"]`    |
