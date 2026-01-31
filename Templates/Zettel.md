<%*
const name = await tp.system.prompt("Zettel title:");
if (name) {
  await tp.file.rename("Zettel - " + name);
}
_%>
---
type: Zettel
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
---

# <% name %>

<!--
Zettels are personal notes that may contain sensitive information.
Use for: credentials, personal reflections, private thoughts, API keys.
Consider excluding these notes from sharing/sync.
-->



## Related

- [[Related Note]]
