<%\*
const name = await tp.system.prompt("Location name:");
if (name) {
await tp.file.rename("Location - " + name);
}
\_%>

---

type: Location
pillar: entity
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
locationType: null # airport | hangar | office | data-centre
address: null
country: null
nodeRelationships: []
entityRelationships: []

---

# <% name %>

## Overview

## Key Information

- **Type:**
- **Address:**
- **Country:**

## Related Organisations

## Notes
