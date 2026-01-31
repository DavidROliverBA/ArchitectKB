<%\*
const title = await tp.system.prompt("Idea title");
await tp.file.move("Incubator/Incubator - " + title);
\_%>

---

type: Incubator
pillar: event
title: <% title %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: seed # seed | exploring | validated | accepted | rejected
domain: []
outcome: null
spawnedNodes: []
nodeRelationships: []
entityRelationships: []

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

- ***

  _See [[Incubator - MOC]] for all ideas | [[+Incubator/README|Incubator Guide]]_
