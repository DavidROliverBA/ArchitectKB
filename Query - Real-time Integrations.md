---
type: Query
title: "Real-time Integrations"
description: "All event-driven and real-time integrations with latency <5 seconds"
queryType: table
created: 2026-01-14
modified: 2026-01-14
tags: [Query, integrations, realtime]
---

# Query: Real-time Integrations

This query returns all integrations using real-time or event-driven patterns with sub-5-second latency targets.

## Dataview Query

```dataview
TABLE title, integrationPattern, criticality, source, target
FROM ""
WHERE type = "Integration" AND integrationPattern = "event-streaming"
SORT criticality DESC
```

## Sample Results

| Integration | Pattern | Criticality | Source | Target |
|---|---|---|---|---|
| Sample ERP to Data Platform Real-time | event-streaming | critical | Sample ERP Application | Sample Data Integration Platform |

## Use Cases

- **Performance Monitoring** - Track real-time integration latency
- **Capacity Planning** - Monitor event throughput and headroom
- **Data Quality** - Review validation rules for streaming data
- **Disaster Recovery** - Plan failover for real-time pipelines

---

**Tip**: Monitor these integrations for <5 second latency SLA compliance!
