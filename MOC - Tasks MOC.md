---
type: MOC
title: Tasks MOC
created: 2025-01-05
tags: [MOC, navigation]
---

# Tasks MOC

This Map of Content provides an overview of all tasks in the vault, organized by priority, due date, and project.

---

## Open Tasks by Priority

### High Priority Tasks

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Task",
  due AS "Due",
  dueBy AS "Due By",
  project AS "Project"
FROM ""
WHERE type = "Task" AND archived != true AND completed = false AND (priority = "high" OR contains(priority, "High"))
SORT due ASC, dueBy ASC
```

### Medium Priority Tasks

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Task",
  due AS "Due",
  dueBy AS "Due By",
  project AS "Project"
FROM ""
WHERE type = "Task" AND archived != true AND completed = false AND (priority = "medium" OR contains(priority, "Medium"))
SORT due ASC, dueBy ASC
```

### Low Priority Tasks

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Task",
  due AS "Due",
  dueBy AS "Due By",
  project AS "Project"
FROM ""
WHERE type = "Task" AND archived != true AND completed = false AND (priority = "low" OR contains(priority, "Low"))
SORT due ASC, dueBy ASC
```

### Unprioritzed Tasks

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Task",
  due AS "Due",
  dueBy AS "Due By",
  project AS "Project"
FROM ""
WHERE type = "Task" AND archived != true AND completed = false AND (priority = null OR priority = "")
SORT due ASC, dueBy ASC
```

---

## Tasks Due This Week

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Task",
  priority AS "Priority",
  due AS "Due",
  dueBy AS "Due By",
  project AS "Project"
FROM ""
WHERE type = "Task" AND archived != true AND completed = false AND (due <= date(today) + dur(7 days) OR dueBy <= date(today) + dur(7 days))
SORT due ASC, dueBy ASC
```

---

## Recently Completed Tasks

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Task",
  priority AS "Priority",
  project AS "Project",
  file.mtime AS "Completed"
FROM ""
WHERE type = "Task" AND archived != true AND completed = true
SORT file.mtime DESC
LIMIT 20
```

---

## Tasks by Project

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Task",
  priority AS "Priority",
  dueBy AS "Due By",
  project AS "Project"
FROM ""
WHERE type = "Task" AND archived != true AND completed = false
SORT project DESC, priority ASC, dueBy ASC
```

---

## Task Statistics

| Metric | Count |
|--------|-------|
| Total Tasks | `$= dv.pages("").where(p => p.type == "Task" && p.archived != true).length` |
| Open Tasks | `$= dv.pages("").where(p => p.type == "Task" && p.archived != true && p.completed == false).length` |
| Completed Tasks | `$= dv.pages("").where(p => p.type == "Task" && p.archived != true && p.completed == true).length` |
| Archived Tasks | `$= dv.pages("").where(p => p.type == "Task" && p.archived == true).length` |

---

## Related MOCs

- [[Dashboard - Main Dashboard]] - Main hub
- [[MOC - Projects MOC]] - All projects by status
- [[MOC - Meetings MOC]] - Meeting history
- [[MOC - People MOC]] - People directory
- [[MOC - ADRs MOC]] - Architecture decisions
- [[MOC - Weblinks MOC]] - External resources
- [[MOC - Technology & Architecture MOC]] - Technical platforms
