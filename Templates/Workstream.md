<%\*
const name = await tp.system.prompt("Workstream name:");
if (name) {
await tp.file.move("Projects/Workstream - " + name);
}
\_%>

---

type: Workstream
pillar: event
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
project: null
status: active # active | paused | completed
description: null
nodeRelationships: []
entityRelationships: []

---

# <% name %>

## Overview

## Objectives

-

## Key Stakeholders

-

## Related Tasks

```dataview
TABLE completed, priority, due
FROM ""
WHERE type = "Task" AND contains(project, this.file.name)
SORT completed ASC, priority ASC
```

## Notes
