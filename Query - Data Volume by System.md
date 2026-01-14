---
type: Query
title: "Data Volume by System"
description: "Show data volume, storage size, and growth rates by system"
queryType: table
created: 2026-01-14
modified: 2026-01-14
tags: [Query, systems, storage, capacity]
---

# Query: Data Volume by System

This query shows data handling capacity and storage requirements for each system to understand infrastructure needs.

## Dataview Query

```dataview
TABLE title, systemType, businessValue, annualCost
FROM ""
WHERE type = "System"
SORT annualCost DESC
```

## Sample Results with Data Metrics

| System | Type | Annual Cost | Key Metrics |
|---|---|---|---|
| Sample Cloud Infrastructure | infrastructure | £5,200,000 | Hosts all systems, multi-region, 99.95% availability |
| Sample ERP Application | application | £2,500,000 | 35B transactions/year, 2,000+ tables |
| Sample Data Integration Platform | platform | £1,800,000 | 150 TB active data, 500+ events/sec, 450 pipelines |
| Sample Analytics Warehouse | data warehouse | £1,500,000 | 350+ tables, 500 concurrent users, 100+ dashboards |
| Sample API Gateway | middleware | £450,000 | 150 API endpoints, 5K req/sec throughput |

## Use Cases

- **Capacity Planning** - Project storage and compute growth
- **Cost Forecasting** - Estimate infrastructure costs by system
- **Storage Optimization** - Identify largest data holders for archiving
- **Performance Tuning** - Understand data volume impact on latency

---

**Tip**: Monitor data growth rates to plan for storage scaling!
