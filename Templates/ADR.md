<%*
const name = await tp.system.prompt("ADR topic:");
if (name) {
await tp.file.rename("ADR - " + name);
}
_%>

---
type: ADR
title: "<% name %>"
status: draft # draft | proposed | accepted | deprecated | superseded
adrType: null # Technology_ADR | Architecture_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
tags: [type/adr, activity/architecture]
created: '<% tp.date.now("YYYY-MM-DD") %>'
modified: '<% tp.date.now("YYYY-MM-DD") %>'
date: '<% tp.date.now("YYYY-MM-DD") %>'
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
relatedTo: []

summary: null
---

# ADR - <% name %>

> **ADR Process**: [[Concept - BA ADR Process (Official)]]
>
> **Required Approvers**: [[Concept - BA ADR Approvers and SME (Official)]]

---

## Status

**Draft** - <% tp.date.now("YYYY-MM-DD") %>

**Workflow Progress:**

1. Check for Existing Guardrail
2. Draft ADR Content
3. Create JIRA Ticket
4. Add Approvers in Jira
5. Stakeholder Review and Approval
6. ADR Acceptance

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

### GDPR Compliance

### Security Classification

---

## Production Implementation

### Deployment Approach

### Operational Model

### Cost Model

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

**Approvers** (from JIRA ticket):

**Date**:

**JIRA Ticket**:

---

## Revision History

| Version | Date                            | Description     | Author |
| ------- | ------------------------------- | --------------- | ------ |
| 1.0     | <% tp.date.now("YYYY-MM-DD") %> | Initial version |        |

---

## Review

**Next Review Date**: <% tp.date.now("YYYY-MM-DD", 180) %> (6 months)
