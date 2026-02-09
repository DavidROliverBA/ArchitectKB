---
type: System
pillar: entity
title: null
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: [type/system]

# System Identity
systemId: null
aliases: []
apmNumber: null # APM0001234
systemType: null # application | platform | database | middleware | saas | infrastructure | interface
owner: null # "[[Person - X]]"
status: null # active | planned | deprecated | retired
criticality: null # critical | high | medium | low
hosting: null # on-prem | aws | azure | saas | external | hybrid
vendor: null # "[[Organisation - X]]"

# External References
confluenceUrl: null
cmdbId: null
documentationUrl: null

# Technology
technology: []

# Lifecycle (Gartner TIME)
timeCategory: null # tolerate | invest | migrate | eliminate
replacedBy: null # "[[System - Successor]]"
predecessors: []

# Data Classification
dataClassification: null # public | internal | confidential | secret
gdprApplicable: false
piiHandled: false

# Integrations
connectsTo: [] # ["[[System - Y]]"]

# Relationships
nodeRelationships: []
entityRelationships: []

# Quality Indicators
confidence: null # high | medium | low
freshness: null # current | recent | stale
verified: false
reviewed: null

# C4 Architecture Data (populate to enable /c4-diagram generation)
c4:
  level: system # system | container | component
  boundary: internal # internal | external
  description: null

  actors: []
  #  - name: "Actor Name"
  #    type: person
  #    description: "What they do"
  #    relationship: "How they interact"

  containers: []
  #  - name: "Container Name"
  #    technology: "Tech stack"
  #    description: "What it does"

  externalRelationships: []
  #  - target: "[[System - Target]]"
  #    description: "What data/events flow"
  #    technology: "Protocol/transport"
  #    type: sync | async | event | batch
  #    direction: incoming | outgoing | bidirectional

  internalRelationships: []
  #  - source: "Container A"
  #    target: "Container B"
  #    description: "What flows between them"
  #    technology: "Protocol"
---

# <% tp.file.title %>

## Overview

Brief description of what this system does, its purpose in the enterprise, and key characteristics.

## System Properties

| Property        | Value       |
| --------------- | ----------- |
| **System ID**   |             |
| **APM Number**  |             |
| **Type**        |             |
| **Status**      |             |
| **Criticality** |             |
| **Owner**       |             |
| **Vendor**      |             |

## Technology Stack

- **Languages**:
- **Framework**:
- **Database**:
- **Messaging**:
- **Hosting**:

## C4 Architecture Diagrams

> [!tip] Generating C4 diagrams
> Use `/c4-diagram <system-name>` to auto-generate these diagrams from the `c4:` frontmatter data on this note.

### C4 Context (Level 1)

```mermaid
C4Context
    title System Context

    Person(actor1, "Actor Name", "Role description")
    System(system, "System Name", "Core system description")
    System_Ext(ext1, "External System", "What it does")

    Rel_D(actor1, system, "Uses", "Protocol")
    Rel_D(system, ext1, "Sends data to", "REST API")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## Key Capabilities

-

## Integrations

| Target System | Pattern | Protocol | Frequency | Criticality |
| ------------- | ------- | -------- | --------- | ----------- |
|               |         |          |           |             |

## Operational Characteristics

### SLA & Performance

- **Availability Target**:
- **RTO (Recovery Time)**:
- **RPO (Data Loss)**:

### Monitoring & Health

- **Monitoring Tool**:
- **Incident Response SLA**:

## Data & Security

- **Data Classification**:
- **GDPR Applicable**:
- **Authentication**:
- **Encryption in Transit**:
- **Encryption at Rest**:

## Lifecycle Status

- **Status**:
- **Launch Date**:
- **Sunset Date**:
- **Modernisation Target**:

## Related Notes

```dataview
TABLE type, status
FROM ""
WHERE contains(file.outlinks, this.file.link) AND file.name != this.file.name
SORT type ASC
```
