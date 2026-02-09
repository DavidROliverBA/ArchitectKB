---
type: Department
pillar: entity
title: null
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
aliases: []

# Structure
parentDepartment: null # "[[Department - Parent]]"
leader: null # "[[Person - Head]]"
functions: []
organisation: null # "[[Organisation - X]]"
headcount: null
location: null # "[[Location - X]]"

# Relationships
nodeRelationships: []
entityRelationships: []
---

# <% tp.file.title %>

## Overview

## Functions

-

## Key People

```dataview
TABLE role
FROM ""
WHERE type = "Person" AND contains(file.outlinks, this.file.link)
```

## Systems

```dataview
TABLE status, criticality
FROM ""
WHERE type = "System" AND contains(file.outlinks, this.file.link)
```

## Notes

-
