<%*
const name = await tp.system.prompt("ADR topic:");
if (name) {
await tp.file.move("ADRs/ADR - " + name);
}
_%>

---
type: ADR
pillar: event
title: <% name %>
description: null
status: draft # draft | proposed | accepted | deprecated | superseded
adrType: null # Technology_ADR | Architecture_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
tags: [type/adr, activity/architecture]
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
date: <% tp.date.now("YYYY-MM-DD") %>
project: null
jiraTicket: null
deciders: []
approvers: []
stakeholders: []

# Source/Provenance
source: local # local | confluence
sourcePageId: null
sourceUrl: null
readOnly: false

# Relationships
relatedTo: []
supersedes: []
dependsOn: []
contradicts: []
nodeRelationships: []
entityRelationships: []

# Quality Indicators
summary: null
keywords: []
confidence: medium
freshness: current
verified: false
reviewed: <% tp.date.now("YYYY-MM-DD") %>
---

# ADR - <% name %>

---

## Status

**Draft** - <% tp.date.now("YYYY-MM-DD") %>

---

## Context

### Background

### Problem Statement

---

## Decision

**Decision:**

**Rationale:**

**Implementation Approach:**

---

## Considered Alternatives

### Alternative 1: [Name]

- **Description**:
- **Pros**:
- **Cons**:
- **Rejected Because:**

### Alternative 2: [Name]

- **Description**:
- **Pros**:
- **Cons**:
- **Rejected Because:**

---

## Consequences

### Positive Impacts

-

### Negative Impacts

-

### Mitigation Strategies

-

---

## Compliance

### Security Classification

---

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
| ---- | ------ | ----------- | ---------- |
|      |        |             |            |

---

## Related

-

---

## Approval

**Approvers**:

**Date**:

---

## Revision History

| Version | Date                            | Description     | Author |
| ------- | ------------------------------- | --------------- | ------ |
| 1.0     | <% tp.date.now("YYYY-MM-DD") %> | Initial version |        |

---

## Review

**Next Review Date**: <% tp.date.now("YYYY-MM-DD", 180) %> (6 months)
