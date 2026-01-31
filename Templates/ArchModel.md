<%\*
const name = await tp.system.prompt("Architecture Model name:");
if (name) {
await tp.file.rename("ArchModel - " + name);
}
\_%>

---

type: ArchModel
pillar: view
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
viewType: null # context | container | landscape | data-flow
focusSystem: null
includeSystems: []
output:
format: mermaid # mermaid | python-diagrams | canvas
lastGenerated: null

---

# <% name %>

## Purpose

What does this architecture model show?

## Scope

What systems and boundaries are included?

## Diagram

```mermaid
graph TB
    %% Add diagram content here
```

## Key Relationships

## Notes
