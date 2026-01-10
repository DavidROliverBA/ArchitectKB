<%*
const title = await tp.system.prompt("Idea title");
await tp.file.rename("Incubator - " + title);
_%>
---
type: Incubator
title: <% title %>
status: seed
domain: []
outcome: null
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - incubator/idea
---

# <% title %>

## Problem Statement

What problem or opportunity does this idea address?



## Context

Why is this relevant now? What prompted this idea?



## Initial Thoughts

Early thinking, hypotheses, or directions to explore.



## Questions to Answer

- [ ]
- [ ]
- [ ]

## Related

-

---

*See [[Incubator - MOC]] for all ideas | [[+Incubator/README|Incubator Guide]]*
