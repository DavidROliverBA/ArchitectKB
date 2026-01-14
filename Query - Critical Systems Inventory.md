---
type: Query
title: "Critical Systems Inventory"
description: "All critical systems requiring 99.95% availability SLA"
queryType: table
created: 2026-01-14
modified: 2026-01-14
tags: [Query, systems, criticality]
---

# Query: Critical Systems Inventory

This query returns all systems marked as critical, which require 99.95% availability SLA and RTO <1 hour disaster recovery.

## Dataview Query

```dataview
TABLE title, systemType, criticality, businessValue, annualCost, availability
FROM ""
WHERE type = "System" AND criticality = "critical"
SORT businessValue DESC
```

## Sample Results

| System | Type | Criticality | Business Value | Annual Cost | Availability |
|--------|------|-------------|---|---|---|
| Sample ERP Application | application | critical | £2,500,000 | £2,500,000 | 99.95% |
| Sample Data Integration Platform | platform | critical | £1,800,000 | £1,800,000 | 99.95% |
| Sample Cloud Infrastructure | infrastructure | critical | £5,200,000 | £5,200,000 | 99.95% |

## Use Cases

- **Business Continuity Planning** - Identify systems that must be protected
- **Disaster Recovery** - Plan RTO/RPO targets for critical systems
- **Incident Response** - Know which systems impact business most when down
- **Staffing** - Allocate on-call engineers to critical systems

---

**Tip**: Add this query to your dashboard to monitor critical system status!
