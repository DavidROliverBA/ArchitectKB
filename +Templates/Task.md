<%*
const name = await tp.system.prompt("Task name:");
if (name) {
  await tp.file.rename("Task - " + name);
}
_%>
---
type: Task
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
completed: false
priority: medium
due:
project:
assignee:
---

# <% name %>

## Description

## Acceptance Criteria

- [ ]

## Notes

