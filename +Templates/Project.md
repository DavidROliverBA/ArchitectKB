<%*
const name = await tp.system.prompt("Project name:");
if (name) {
  await tp.file.rename("Project - " + name);
}
_%>
---
type: Project
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: active  # active | paused | completed | cancelled
priority: medium  # high | medium | low
start-date: <% tp.date.now("YYYY-MM-DD") %>
end-date: null  # Target completion date
category: null  # Optional: Program/portfolio grouping (e.g., "Digital Transformation")

# Transformation Classification
transformationType: null  # modernisation | migration | greenfield | integration | decommission | uplift
transformationScope: null  # enterprise | department | team | application
aiInvolved: false  # Does this project involve AI/ML capabilities?
---

# <% name %>

## Overview

<!-- Brief description of the project purpose and goals -->

## Objectives

- Objective 1
- Objective 2
- Objective 3

## Key Stakeholders

- **Project Sponsor:**
- **Technical Lead:**
- **Business Owner:**
- **Key Contributors:**

## Timeline

**Start Date:** <% tp.date.now("YYYY-MM-DD") %>
**Target Date:**
**Status:** Active

## Related Tasks

```dataview
TABLE completed, priority, due
FROM ""
WHERE type = "Task" AND contains(project, this.file.name)
SORT completed ASC, priority ASC
```

## Meetings

```dataview
TABLE date, summary
FROM ""
WHERE type = "Meeting" AND contains(project, this.file.name)
SORT date DESC
```

## Architecture Decisions

```dataview
TABLE status, category
FROM ""
WHERE type = "Adr" AND contains(project, this.file.name)
SORT status ASC
```

## Notes

<!-- Project notes, updates, and key information -->
