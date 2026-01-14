---
type: Query
title: "Systems by Hosting Platform"
description: "Group systems by where they are hosted (cloud provider, on-prem, etc.)"
queryType: table
created: 2026-01-14
modified: 2026-01-14
tags: [Query, systems, infrastructure, hosting]
---

# Query: Systems by Hosting Platform

This query groups all systems by their hosting platform to understand infrastructure distribution and dependencies.

## Dataview Query

```dataview
TABLE title, systemType, hostingModel, hostedOn
FROM ""
WHERE type = "System"
SORT hostingModel ASC, title ASC
```

## Sample Results

| System | Type | Hosting Model | Hosted On |
|--------|------|---|---|
| Sample ERP Application | application | cloud | Sample Cloud Infrastructure |
| Sample Data Integration Platform | platform | cloud | Sample Cloud Infrastructure |
| Sample Analytics Warehouse | data warehouse | cloud | Sample Cloud Infrastructure |
| Sample API Gateway | middleware | cloud | Sample Cloud Infrastructure |
| Sample Cloud Infrastructure | infrastructure | cloud | (Self) |

## Use Cases

- **Infrastructure Planning** - See which cloud regions host which systems
- **Cost Allocation** - Group costs by hosting platform
- **Migration Planning** - Identify systems to move to new hosting
- **Dependency Analysis** - See which systems depend on cloud infrastructure

---

**Tip**: Use this to validate infrastructure decisions and plan migrations!
