---
type: Project
pillar: event
title: null
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: active # active | paused | completed
priority: medium # high | medium | low
timeFrame: null # YYYY-MM-DD - YYYY-MM-DD
collections: null

# Classification
transformationType: null # modernisation | migration | greenfield | integration | decommission | uplift
transformationScope: null # enterprise | department | team | application
aiInvolved: false

# Relationships
nodeRelationships: []
entityRelationships: []

# Quality
summary: null
confidence: medium
freshness: current
verified: false
reviewed: null
---

# <% tp.file.title %>

## Overview

## Objectives

-

## Key Stakeholders

-

## Related Tasks

```dataview
TABLE completed, priority, dueBy
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

## Decisions

```dataview
TABLE status, date
FROM ""
WHERE type = "ADR" AND contains(project, this.file.name)
SORT date DESC
```

## Notes
