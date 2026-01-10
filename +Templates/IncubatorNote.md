<%*
const title = await tp.system.prompt("Research note title");
await tp.file.rename("Incubator Note - " + title);
_%>
---
type: IncubatorNote
title: <% title %>
parent-ideas: []
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - incubator/research
---

# <% title %>

## Summary



## Key Findings



## Evidence / Sources

-

## Implications

What does this mean for the parent idea(s)?



## Related

-

---

*Parent ideas: update `parent-ideas` in frontmatter*
