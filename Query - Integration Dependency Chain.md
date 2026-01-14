---
type: Query
title: "Integration Dependency Chain"
description: "Show dependency chain of integrations - what feeds what"
queryType: table
created: 2026-01-14
modified: 2026-01-14
tags: [Query, integrations, dependencies, dataflow]
---

# Query: Integration Dependency Chain

This query shows the data flow chain of integrations to understand source-to-sink dependencies.

## Dataview Query

```dataview
TABLE title, integrationPattern, source, target, criticality
FROM ""
WHERE type = "Integration"
SORT source ASC
```

## Sample Results (Flow Diagram)

```
Sample ERP Application
    ↓ (Real-time events)
    Sample ERP to Data Platform Real-time
    ↓
Sample Data Integration Platform
    ↓ (Daily batch)
    Data Platform to Analytics Batch
    ↓
Sample Analytics Warehouse
    ↓
End Users (Dashboards, Reports, APIs)
```

## Details

| From System | To System | Pattern | Latency | Criticality |
|---|---|---|---|---|
| Sample ERP Application | Sample Data Integration Platform | event-streaming | <5 sec | critical |
| Sample Data Integration Platform | Sample Analytics Warehouse | batch-etl | 4 hours | high |

## Use Cases

- **Data Lineage** - Understand data flow from source to analytics
- **Impact Analysis** - See what breaks downstream if system fails
- **Change Management** - Identify systems affected by changes
- **Performance Tuning** - Optimize bottleneck integrations

---

**Tip**: Use this for incident response - if System A fails, what downstream systems are impacted?
