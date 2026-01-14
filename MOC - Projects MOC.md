---
type: MOC
title: Projects MOC
description: Map of Content for all projects organized by status, priority, and timeframe
created: 2025-01-05
modified: 2026-01-07
tags: [MOC, navigation, projects]

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-07
summary: Central navigation for all projects showing active, completed, and on-hold initiatives with priority and timeframe information
keywords: [projects, portfolio, tracking, MOC, status]
---

# Projects MOC

**Purpose:** Central directory of all projects providing visibility into active initiatives, completed work, and projects on hold. Track progress across the BA engineering and digital transformation portfolio.

**Quick Navigation:** [Active](#active-projects) | [Completed](#completed-projects) | [On Hold](#projects-on-hold) | [By Priority](#projects-by-priority) | [By Transformation](#by-transformation-type) | [AI Projects](#ai-projects) | [Statistics](#project-statistics)

**Total Projects:** `$= dv.pages("").where(p => p.type == "Project").length`

---

## Project Statistics

| Metric | Count |
|--------|-------|
| **Total Projects** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true).length` |
| **Active** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && (p.status == "active" || p.status == null)).length` |
| **Completed** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.status == "completed").length` |
| **On Hold** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && (p.status == "paused" || p.status == "on-hold")).length` |
| **High Priority** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.priority == "high").length` |
| **Archived** | `$= dv.pages("").where(p => p.type == "Project" && p.archived == true).length` |

---

## Active Projects

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  priority AS "Priority",
  timeFrame AS "Timeframe"
FROM ""
WHERE type = "Project" AND archived != true AND (status = "active" OR contains(status, "In Progress") OR status = null)
SORT priority ASC, title ASC
```

---

## Completed Projects

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  timeFrame AS "Timeframe"
FROM ""
WHERE type = "Project" AND archived != true AND (status = "completed" OR contains(status, "Complete") OR contains(status, "Done"))
SORT file.mtime DESC
```

---

## Projects on Hold

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM ""
WHERE type = "Project" AND archived != true AND (status = "on-hold" OR contains(status, "Hold") OR contains(status, "Paused"))
SORT priority ASC
```

---

## Projects by Priority

### High Priority Projects

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  timeFrame AS "Timeframe"
FROM ""
WHERE type = "Project" AND archived != true AND (priority = "high" OR contains(priority, "High"))
SORT status ASC
```

### Medium Priority Projects

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  timeFrame AS "Timeframe"
FROM ""
WHERE type = "Project" AND archived != true AND (priority = "medium" OR contains(priority, "Medium"))
SORT status ASC
```

### Low Priority Projects

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  timeFrame AS "Timeframe"
FROM ""
WHERE type = "Project" AND archived != true AND (priority = "low" OR contains(priority, "Low"))
SORT status ASC
```

---

## By Transformation Type

### Transformation Statistics

| Type | Count |
|------|-------|
| **Modernisation** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.transformationType == "modernisation").length` |
| **Migration** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.transformationType == "migration").length` |
| **Greenfield** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.transformationType == "greenfield").length` |
| **Integration** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.transformationType == "integration").length` |
| **Decommission** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.transformationType == "decommission").length` |
| **Uplift** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.transformationType == "uplift").length` |
| **Unclassified** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.transformationType == null).length` |

### Modernisation Projects

Upgrading existing systems to newer technologies or platforms.

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  transformationScope AS "Scope",
  aiInvolved AS "AI?"
FROM ""
WHERE type = "Project" AND archived != true AND transformationType = "modernisation"
SORT status ASC, title ASC
```

### Migration Projects

Moving systems between platforms (e.g., on-prem to cloud).

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  transformationScope AS "Scope",
  aiInvolved AS "AI?"
FROM ""
WHERE type = "Project" AND archived != true AND transformationType = "migration"
SORT status ASC, title ASC
```

### Greenfield Projects

Building new capabilities from scratch.

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  transformationScope AS "Scope",
  aiInvolved AS "AI?"
FROM ""
WHERE type = "Project" AND archived != true AND transformationType = "greenfield"
SORT status ASC, title ASC
```

### Integration Projects

Connecting systems together.

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  transformationScope AS "Scope",
  aiInvolved AS "AI?"
FROM ""
WHERE type = "Project" AND archived != true AND transformationType = "integration"
SORT status ASC, title ASC
```

### Decommission Projects

Retiring legacy systems.

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  transformationScope AS "Scope"
FROM ""
WHERE type = "Project" AND archived != true AND transformationType = "decommission"
SORT status ASC, title ASC
```

### Uplift Projects

Security, performance, or compliance improvements.

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  transformationScope AS "Scope",
  aiInvolved AS "AI?"
FROM ""
WHERE type = "Project" AND archived != true AND transformationType = "uplift"
SORT status ASC, title ASC
```

### Unclassified Projects

Projects not yet categorised by transformation type.

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM ""
WHERE type = "Project" AND archived != true AND transformationType = null
SORT status ASC, title ASC
```

---

## AI Projects

Projects involving AI/ML capabilities.

| Metric | Count |
|--------|-------|
| **AI-Involved** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.aiInvolved == true).length` |
| **Non-AI** | `$= dv.pages("").where(p => p.type == "Project" && p.archived != true && p.aiInvolved != true).length` |

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  transformationType AS "Type",
  transformationScope AS "Scope"
FROM ""
WHERE type = "Project" AND archived != true AND aiInvolved = true
SORT status ASC, title ASC
```

---

## All Projects

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status",
  priority AS "Priority",
  tags AS "Tags"
FROM ""
WHERE type = "Project" AND archived != true
SORT title ASC
```

---

## Project Statistics

| Metric | Count |
|--------|-------|
| Total Projects | `$= dv.pages("").where(p => p.type == "Project").length` |

---

## Project Index

### Programmes & Major Initiatives

- [[Project - 777-X EIS Programme]]
- [[Project - Axia (was EWS Futures)]]
- [[Project - ODIE Programme]]
- [[Project - Project Elysium - HR System Replacement]]

### Engineering & Aircraft Systems

- [[Project - B777X 1 & 2 Gatelink and E-enabling Ground Systems]]
- [[Project - B777X 6. CMS Design]]
- [[Project - CAMO Adherence]]
- [[Project - OpDef Upgrade]]

### Data & Integration

- [[Project - Caerus]]
- [[Project - SAP BTP Workzone]]
- [[Project - SAP MIgration to AWS]]

### AI & Innovation

- [[Project - Dispax AI]]
- [[Project - North Star]]

### Cyber & Compliance

- [[Project - Cyber Uplift]]

### Applications & Tools

- [[Project - Digital Signage]]
- [[Project - EHR Reporting]]
- [[Project - Engineering Knowledge Management]]
- [[Project - Line Station Time Recording]]
- [[Project - Matterport Deployment]]
- [[Project - MRO Pro Implementation]]
- [[Project - Power Apps Roadmap]]
- [[Project - Siemens Teamcenter X SaaS]]
- [[Project - Snap On Tooling - v9 Upgrade]]
- [[Project - Sparks - Logic Software - Ticketing System]]
- [[Project - Supply Chain]]
- [[Project - Time Link to IOMotion Migration]]

### Teams

- [[Project - BA Engineering - Agile Team 1]]

### Other

- [[Project - AI2 Migration to 2942]]

---

## Related MOCs

- [[Dashboard - Dashboard]] - Main navigation hub
- [[MOC - ADRs MOC]] - Architecture decisions
- [[MOC - Technology & Architecture MOC]] - Technical platforms and architecture
- [[MOC - Organisations MOC]] - Vendors and partners
- [[MOC - Vault Quality Dashboard]] - Quality metrics and health
- [[Page - Vault Maintenance Guide]] - Maintenance best practices
- [[MOC - Axia Programme]] - EWS Futures programme
- [[MOC - Engineering Projects]] - Engineering teams

---

**MOC Version:** 2.0
**Total Projects:** `$= dv.pages("").where(p => p.type == "Project").length`
**Last Updated:** 2026-01-07
**Purpose:** Project portfolio tracking and visibility
