---
type: Query
title: <% tp.file.title.replace("Query - ", "") %>
created: '<% tp.date.now("YYYY-MM-DD") %>'
modified: '<% tp.date.now("YYYY-MM-DD") %>'
tags: []
summary: null
queryType: table # table | list | task | calendar
scope: null
---

# <% tp.file.title %>

## Overview

## Query

```dataview
TABLE type, status
FROM ""
WHERE type = "Project"
SORT modified DESC
```

## Related

-
