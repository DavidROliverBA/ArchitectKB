---
type: MOC
title: Meetings MOC
created: 2025-01-05
tags: [MOC, navigation]
---

# Meetings MOC

This Map of Content provides a history of all meetings in the vault, organized by date and project.

---

## Recent Meetings (Last 30)

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Meeting",
  date AS "Date",
  project AS "Project",
  peopleInvolved AS "Attendees"
FROM ""
WHERE type = "Meeting"
SORT date DESC
LIMIT 30
```

---

## Meetings by Project

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Meeting",
  date AS "Date",
  peopleInvolved AS "Attendees"
FROM ""
WHERE type = "Meeting" AND project != null
SORT project ASC, date DESC
GROUP BY project
```

---

## Meetings This Month

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Meeting",
  date AS "Date",
  project AS "Project"
FROM ""
WHERE type = "Meeting" AND date >= date(today) - dur(30 days)
SORT date DESC
```

---

## Meetings by Attendee

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Meeting",
  date AS "Date",
  project AS "Project"
FROM ""
WHERE type = "Meeting" AND peopleInvolved != null
SORT date DESC
GROUP BY peopleInvolved
```

---

## All Meetings (Chronological)

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Meeting",
  date AS "Date",
  project AS "Project"
FROM ""
WHERE type = "Meeting"
SORT date DESC
```

---

## Meeting Statistics

| Metric | Count |
|--------|-------|
| Total Meetings | `$= dv.pages("").where(p => p.type == "Meeting").length` |

---

## Related MOCs

- [[Dashboard - Main Dashboard]] - Main hub
- [[MOC - People MOC]] - People directory
- [[MOC - Projects MOC]] - All projects
- [[MOC - Tasks MOC]] - All tasks
- [[MOC - ADRs MOC]] - Architecture decisions
- [[MOC - Weblinks MOC]] - External resources
- [[MOC - Technology & Architecture MOC]] - Technical platforms
