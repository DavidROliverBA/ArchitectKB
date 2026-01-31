<%\*
const name = await tp.system.prompt("Policy name:");
if (name) {
await tp.file.move("Sync/Policies/Policy - " + name);
}
\_%>

---

type: Policy
pillar: governance
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: draft # draft | active | deprecated | archived
scope: null # enterprise | department | team
owner: null
effectiveDate: null
reviewDate: null
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

# Policy: <% name %>

## Purpose

## Scope

## Policy Statement

## Compliance Requirements

## Exceptions

## Related

- **Owner:**
- **Effective Date:**
- **Review Date:**

## References
