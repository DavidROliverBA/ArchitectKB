<%*
const name = await tp.system.prompt("Weblink title:");
if (name) {
  await tp.file.rename("Weblink - " + name);
}
_%>
---
type: Weblink
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
url:
author:
source:
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

