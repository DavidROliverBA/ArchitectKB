---
type: MOC
title: Dashboard
created: 2026-01-07
modified: 2026-01-07
tags: [moc, dashboard, navigation]
aliases: [Main Dashboard, Home]
---

# 🏠 Dashboard

> **Your central hub for navigating the vault and tracking active work**

Last Updated: 2026-01-07

---

## 🚀 Quick Navigation

### Core MOCs
- 📋 [[MOC - Tasks MOC]] - Task management and tracking
- 🎯 [[MOC - Projects MOC]] - Active projects and initiatives
- 👥 [[MOC - People MOC]] - Contact directory
- 📅 [[MOC - Meetings MOC]] - Meeting history and notes
- 📐 [[MOC - ADRs MOC]] - Architecture decisions

### Content & Organization
- 🔗 [[MOC - Weblinks MOC]] - External resources and references
- 🛠️ [[MOC - Technology & Architecture MOC]] - Tech stack and standards
- 🏢 [[MOC - Organisations MOC]] - Companies and vendors
- 📊 [[MOC - Vault Quality Dashboard]] - Vault health monitoring

### Domain Knowledge (Examples)
- ☁️ [[MOC - Cloud Architecture]] - Cloud infrastructure knowledge
- 📊 [[MOC - Data Platform]] - Data engineering and analytics

---

## ✅ Open Tasks

### High Priority

```dataview
TABLE WITHOUT ID
  file.link as "Task",
  project as "Project",
  due as "Due Date"
FROM ""
WHERE type = "Task" AND !completed AND priority = "high"
SORT due ASC
```

### Medium Priority (Next 5)

```dataview
TABLE WITHOUT ID
  file.link as "Task",
  project as "Project",
  due as "Due Date"
FROM ""
WHERE type = "Task" AND !completed AND priority = "medium"
SORT due ASC
LIMIT 5
```

### Overdue Tasks

```dataview
TABLE WITHOUT ID
  file.link as "Task",
  priority as "Priority",
  due as "Due Date"
FROM ""
WHERE type = "Task" AND !completed AND due < date(today)
SORT due ASC
```

---

## 🎯 Active Projects

```dataview
TABLE WITHOUT ID
  file.link as "Project",
  priority as "Priority",
  status as "Status",
  start-date as "Started"
FROM ""
WHERE type = "Project" AND status = "active"
SORT priority ASC, start-date DESC
```

---

## 📅 Recent Meetings (Last 10)

```dataview
TABLE WITHOUT ID
  file.link as "Meeting",
  date as "Date",
  project as "Project",
  summary as "Summary"
FROM ""
WHERE type = "Meeting"
SORT date DESC
LIMIT 10
```

---

## 📐 Recent Architecture Decisions

```dataview
TABLE WITHOUT ID
  file.link as "ADR",
  status as "Status",
  category as "Category",
  modified as "Last Updated"
FROM ""
WHERE type = "Adr"
SORT modified DESC
LIMIT 5
```

---

## 📊 Vault Statistics

### Notes by Type

```dataview
TABLE WITHOUT ID
  type as "Type",
  length(rows) as "Count"
FROM ""
WHERE type != null
GROUP BY type
SORT length(rows) DESC
```

### Recent Activity (Last 7 Days)

```dataview
TABLE WITHOUT ID
  file.link as "Note",
  type as "Type",
  modified as "Modified"
FROM ""
WHERE modified >= date(today) - dur(7 days)
SORT modified DESC
LIMIT 10
```

---

## 🆕 Quick Capture

Create new notes quickly using templates:

- **New Task**: Use template `+Templates/Task.md`
- **New Meeting**: Use template `+Templates/Meeting.md` (auto-moves to +Meetings/)
- **New ADR**: Use template `+Templates/ADR.md`
- **New Project**: Use template `+Templates/Project.md`
- **New Person**: Use template `+Templates/Person.md`
- **Daily Note**: Use template `+Templates/Daily.md` (auto-moves to +Daily/YYYY/)

**Tip**: If using Templater plugin, templates will auto-prompt for names and move files to correct locations.

---

## 📚 Reference Pages

Key documentation and standards:

- [[Page - Architecture Principles]] - Guiding principles for decisions
- [[Page - Tech Stack Overview]] - Approved technologies and standards
- [[Page - How to Use This Vault]] - Usage guide (create this for your team)

---

## 🎯 This Week's Focus

<!-- Manually update this section weekly -->

**Week of 2026-01-07:**

**Top Priorities:**
1. Review [[ADR - Adopt GraphQL for API Layer]] (Architecture Board Jan 15)
2. Continue [[Project - Cloud Migration]] - Inventory Service migration
3. Finalize [[Task - Document API standards]]

**Upcoming Milestones:**
- Jan 15: Architecture Board meeting (GraphQL decision)
- Feb 15: Inventory Service go-live
- Feb 28: Q1 architecture planning

**Focus Areas:**
- Cloud migration execution
- API modernization strategy
- Team training and development

---

## 🔍 Search Tips

**Finding Notes:**
- Use Obsidian's Quick Switcher (Cmd/Ctrl + O)
- Search content (Cmd/Ctrl + Shift + F)
- Use tags to filter (e.g., #project/cloud-migration)

**Common Searches:**
- All active projects: `type:Project AND status:active`
- High priority tasks: `type:Task AND priority:high`
- Recent ADRs: `type:Adr AND modified:>-30d`

**Dataview Queries:**
All sections above use Dataview queries. Customize by editing the query code blocks.

---

## 🛠️ Maintenance

**Weekly:**
- Review open tasks, update priorities
- Check overdue tasks
- Update "This Week's Focus"

**Monthly:**
- Review [[MOC - Vault Quality Dashboard]]
- Archive completed projects
- Update statistics

**Quarterly:**
- Comprehensive vault cleanup
- Review and update architecture principles
- Assess technology stack

---

## Related

**All MOCs:**
- [[MOC - Tasks MOC]]
- [[MOC - Projects MOC]]
- [[MOC - People MOC]]
- [[MOC - Meetings MOC]]
- [[MOC - ADRs MOC]]
- [[MOC - Weblinks MOC]]
- [[MOC - Technology & Architecture MOC]]
- [[MOC - Organisations MOC]]
- [[MOC - Vault Quality Dashboard]]

**Getting Started:**
- New to this vault? See [[Page - How to Use This Vault]]
- Understanding ADRs? See [[MOC - ADRs MOC]]
- Tech standards? See [[Page - Tech Stack Overview]]
