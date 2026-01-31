<%*
const name = await tp.system.prompt("Page title:");
if (name) {
  await tp.file.rename("Page - " + name);
}
_%>
---
type: Page
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []

# Quality Indicators (for AI discoverability)
summary:
confidence: medium
freshness: current
source: synthesis
verified: false
reviewed: <% tp.date.now("YYYY-MM-DD") %>

# Semantic Discovery
keywords: []

# Relationships
relatedTo: []
---

# <% name %>

## Overview



## Details



## Related

-
