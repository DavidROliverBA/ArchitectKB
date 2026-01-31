<%*
const name = await tp.system.prompt("Atomic note title:");
const classificationOptions = ["public", "internal", "confidential", "secret"];
const classification = await tp.system.suggester(
  classificationOptions,
  classificationOptions,
  false,
  "Security classification:"
);
if (name) {
  await tp.file.rename("Atomic Note - " + name);
}
_%>
---
type: AtomicNote
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
classification: <% classification || "internal" %>
---

# <% name %>

<!--
Atomic notes contain ONE idea, concept, or fact.
Keep it focused and concise.
Link liberally to related notes.

Classification levels:
- public: Shareable knowledge
- internal: Work-related, not for external sharing
- confidential: Personal/sensitive information
- secret: Credentials, passwords, API keys
-->



## Source

-

## Related

-
