<%\*
const name = await tp.system.prompt("Guardrail name:");
if (name) {
await tp.file.move("Sync/Guardrails/Guardrail - " + name);
}
\_%>

---

type: Guardrail
pillar: governance
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: draft # draft | active | deprecated
scope: null # enterprise | department | team
category: null # security | architecture | data | integration
enforcement: null # mandatory | recommended | advisory
owner: null
source: local # local | confluence
sourceUrl: null
readOnly: false
nodeRelationships: []
entityRelationships: []

# Quality

summary: null
confidence: medium
freshness: current
verified: false
reviewed: null

---

# Guardrail: <% name %>

## Purpose

What does this guardrail protect against?

## Scope

What systems/decisions does this apply to?

## Requirements

### Must

-

### Should

-

### Must Not

-

## Rationale

Why is this guardrail important?

## Exceptions Process

How to request an exception?

## Related

- **Related ADRs:**
- **Related Policies:**

## References
