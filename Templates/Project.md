<%\*
const name = await tp.system.prompt("Project name:");
if (name) {
await tp.file.move("Projects/Project - " + name);
}
\_%>

---

type: Project
pillar: event
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: active
priority: medium
timeFrame: <% tp.date.now("YYYY-MM-DD") %> - null
collections: null

# Transformation Classification

transformationType: null
transformationScope: null
aiInvolved: false

# Relationships

nodeRelationships: []
entityRelationships: []

# Quality

summary: null
confidence: medium
freshness: current
verified: false
reviewed: null

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

## Meetings

```dataview
TABLE date, summary
FROM ""
WHERE type = "Meeting" AND contains(project, this.file.name)
SORT date DESC
```

## Notes
