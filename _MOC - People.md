---
type: MOC
title: People MOC
created: 2025-01-05
tags: [MOC, navigation]
---

# People MOC

This Map of Content provides a directory of all people in the vault, organized alphabetically with their roles and organisations.

---

## People Directory

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Name",
  role AS "Role",
  organisation AS "Organisation",
  emailAddress AS "Email"
FROM ""
WHERE type = "Person" AND archived != true
SORT title ASC
```

---

## People by Organisation

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Name",
  role AS "Role"
FROM ""
WHERE type = "Person" AND archived != true
SORT organisation ASC, title ASC
GROUP BY organisation
```

---

## People by Role

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Name",
  organisation AS "Organisation"
FROM ""
WHERE type = "Person" AND archived != true AND role != null
SORT role ASC, title ASC
GROUP BY role
```

---

## People Statistics

| Metric | Count |
|--------|-------|
| Active People | `$= dv.pages("").where(p => p.type == "Person" && p.archived != true).length` |
| Archived (Left Org) | `$= dv.pages("").where(p => p.type == "Person" && p.archived == true).length` |

---

## Related MOCs

- [[Dashboard - Main Dashboard]] - Main hub
- [[MOC - Meetings MOC]] - Meeting history
- [[MOC - Projects MOC]] - All projects
- [[MOC - Tasks MOC]] - All tasks
- [[MOC - ADRs MOC]] - Architecture decisions
- [[MOC - Weblinks MOC]] - External resources
- [[MOC - Technology & Architecture MOC]] - Technical platforms
