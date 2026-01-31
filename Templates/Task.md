<%\*
const name = await tp.system.prompt("Task name:");
if (name) {
await tp.file.move("Tasks/Task - " + name);
}
\_%>

---

type: Task
pillar: event
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
completed: false
priority: medium
doDate: null
dueBy: null
project: null
assignedTo: []
parentTask: null
subtasks: []
nodeRelationships: []
entityRelationships: []

---

# <% name %>

## Description

## Acceptance Criteria

- [ ]

## Subtasks

## Notes
