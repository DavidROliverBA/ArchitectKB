<%*
const name = await tp.system.prompt("Organisation name:");
if (name) {
  await tp.file.rename("Organisation - " + name);
}
_%>
---
type: Organisation
title: <% name %>
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: []
website:
industry:
relationship:
---

# <% name %>

## Overview

- **Website:**
- **Industry:**
- **Relationship:** Customer | Partner | Vendor | Competitor

## Description



## Key Contacts

```dataview
TABLE role, emailAddress
FROM ""
WHERE type = "Person" AND contains(organisation, this.file.name)
```

## Projects

```dataview
TABLE status, timeFrame
FROM ""
WHERE type = "Project" AND contains(file.outlinks, this.file.link)
```

## Notes

-

## Related

-
