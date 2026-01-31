<%\*
const name = await tp.system.prompt("Person's name:");
if (name) {
await tp.file.rename("Person - " + name);
}
\_%>

---

type: Person
pillar: entity
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
role: null
organisation: null
emailAddress: null
aliases: []
nodeRelationships: []
entityRelationships: []

---

# <% name %>

## Contact Information

- **Role:**
- **Organisation:**
- **Email:**
- **Phone:**

## Notes

## Interactions

```dataview
TABLE date, summary
FROM ""
WHERE type = "Meeting" AND contains(attendees, this.file.name)
SORT date DESC
```
