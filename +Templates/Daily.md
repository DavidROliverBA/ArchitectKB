<%*
const today = tp.date.now("YYYY-MM-DD");
await tp.file.rename("" + today);
_%>
---
type: DailyNote
title: <% tp.date.now("YYYY-MM-DD") %>
created: <% tp.date.now("YYYY-MM-DD") %>
date: <% tp.date.now("YYYY-MM-DD") %>
tags: [daily]
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

