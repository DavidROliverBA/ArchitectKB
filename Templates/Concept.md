<%\*
const name = await tp.system.prompt("Concept name:");
if (name) {
await tp.file.rename("Concept - " + name);
}
\_%>

---

type: Concept
pillar: node
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
description: null
aliases: []
keywords: []
nodeRelationships: []
entityRelationships: []

# Quality

summary: null
confidence: medium
freshness: current
source: primary
verified: false
reviewed: null

---

# <% name %>

## Definition

## Context

## Related Concepts

## References
