<%\*
const today = tp.date.now("YYYY-MM-DD");
const year = tp.date.now("YYYY");
await tp.file.move("Daily/" + year + "/Daily - " + today);
\_%>

---

type: Daily
pillar: event
title: <% tp.date.now("YYYY-MM-DD") %>
created: <% tp.date.now("YYYY-MM-DD") %>
date: <% tp.date.now("YYYY-MM-DD") %>
tags: [daily]
nodeRelationships: []
entityRelationships: []

---

# <% tp.date.now("dddd, MMMM Do YYYY") %>

## Today's Focus

-

## Tasks

### Due Today

```dataview
TASK
FROM ""
WHERE type = "Task" AND due = date("<% tp.date.now("YYYY-MM-DD") %>") AND !completed
```

### Completed Today

- [ ]

## Notes

## Reflections
