<%*
const name = await tp.system.prompt("Pattern name:");
if (name) {
  await tp.file.rename("Pattern - " + name);
}
_%>

---

type: Pattern
pillar: node
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
patternType: null # architecture | integration | data | security | process
description: null
aliases: []
keywords: []
nodeRelationships: []
entityRelationships: []

# Quality

summary: null
confidence: medium
freshness: current
verified: false
reviewed: null

---

# <% name %>

## Problem

What problem does this pattern solve?

## Context

When should this pattern be applied?

## Solution

How does the pattern work?

## Consequences

### Benefits

-

### Trade-offs

-

## Related Patterns

## Examples

## References

