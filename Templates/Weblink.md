<%\*
const name = await tp.system.prompt("Weblink title:");
if (name) {
await tp.file.rename("Weblink - " + name);
}
\_%>

---

type: Weblink
pillar: node
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
url: null
domain: null
description: null
createdAt: <% tp.date.now() %>
nodeRelationships: []
entityRelationships: []

---

# <% name %>

## Source

- **URL:**
- **Author:**
- **Source:**

## Summary

## Key Points

-

## Quotes

## Related

-
