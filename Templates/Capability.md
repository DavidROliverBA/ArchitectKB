<%\*
const name = await tp.system.prompt("Capability name:");
if (name) {
await tp.file.rename("Capability - " + name);
}
\_%>

---

type: Capability
pillar: node
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
capabilityType: null # technical | business | operational
maturity: null # emerging | developing | established | declining
description: null
nodeRelationships: []
entityRelationships: []

# Quality

confidence: medium
freshness: current
verified: false
reviewed: null

---

# <% name %>

## Description

## Business Value

## Technical Requirements

## Current State

## Roadmap

## Related Systems

## References
