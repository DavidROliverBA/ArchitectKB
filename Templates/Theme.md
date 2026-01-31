<%\*
const name = await tp.system.prompt("Theme name:");
if (name) {
await tp.file.rename("Theme - " + name);
}
\_%>

---

type: Theme
pillar: node
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
scope: null # enterprise | department | project
description: null
keywords: []
nodeRelationships: []
entityRelationships: []

# Quality

confidence: medium
freshness: current
verified: false
reviewed: null

---

# <% name %>

## Overview

## Key Concerns

## Related Projects

## Related Decisions

## References
