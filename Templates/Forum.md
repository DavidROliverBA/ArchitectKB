<%\*
const name = await tp.system.prompt("Forum name:");
if (name) {
await tp.file.move("Projects/Forum - " + name);
}
\_%>

---

type: Forum
pillar: event
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
frequency: null # weekly | fortnightly | monthly | quarterly
description: null
nodeRelationships: []
entityRelationships: []

---

# <% name %>

## Purpose

## Regular Attendees

-

## Meeting Cadence

## Related Meetings

```dataview
TABLE date, summary
FROM ""
WHERE type = "Meeting" AND contains(file.name, this.title)
SORT date DESC
```

## Topics Covered

## Notes
