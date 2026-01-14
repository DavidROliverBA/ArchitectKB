<%*
const name = await tp.system.prompt("Project name:");
if (name) {
  await tp.file.rename("Project - " + name);
}
_%>
---
type: Project
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: active
priority: medium
start-date: <% tp.date.now("YYYY-MM-DD") %>
end-date: null
# Transformation Classification
transformationType: null
transformationScope: null
aiInvolved: false
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

