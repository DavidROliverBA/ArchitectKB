---
type: Dashboard
title: "Architecture Knowledge Graph"
description: "Central hub for exploring the architecture knowledge graph - systems, integrations, scenarios"
scope: "Architecture knowledge navigation and discovery"
refreshed: 2026-01-14
created: 2026-01-14
modified: 2026-01-14
tags: [Dashboard, architecture, navigation]
---

# Architecture Knowledge Graph Dashboard

This dashboard provides navigation and discovery of the architecture knowledge base using Dataview queries. It serves as the central hub for understanding systems, integrations, and architecture decisions.

## Quick Navigation

### All Systems in the Architecture

```dataview
TABLE title, systemType, criticality, businessValue
FROM ""
WHERE type = "System"
SORT systemType ASC, criticality DESC
```

### Critical Systems (99.95% SLA)

```dataview
LIST
FROM ""
WHERE type = "System" AND criticality = "critical"
```

### Integration Landscape

```dataview
TABLE title, integrationPattern, source, target
FROM ""
WHERE type = "Integration"
SORT integrationPattern ASC
```

### Real-time vs Batch Integrations

```dataview
TABLE title, integrationPattern, criticality
FROM ""
WHERE type = "Integration"
SORT integrationPattern DESC
```

### Architecture Documents

```dataview
LIST
FROM ""
WHERE type = "Architecture"
```

### Active Scenarios

```dataview
LIST
FROM ""
WHERE type = "Scenario" AND status != "rejected"
```

### Canvas Visualizations

```dataview
TABLE title, description
FROM ""
WHERE type = "Canvas"
SORT title ASC
```

---

## System Relationships

### ERP System Connections

The [[System - Sample ERP Application]] connects to:
- **Real-time**: [[Integration - Sample ERP to Data Platform Real-time]]
- **Batch**: [[Integration - Sample Data Platform to Analytics Batch]]
- **Hosting**: [[System - Sample Cloud Infrastructure]]

### Data Flow Path

```
[[System - Sample ERP Application]]
  ↓ (Real-time events, <5 sec)
  [[System - Sample Data Integration Platform]]
  ↓ (Streaming + Batch)
  [[System - Sample Analytics Warehouse]]
  ↓ (Query interface)
  End Users (Dashboards, Reports, APIs)
```

### Integration Architecture

**Real-time Path**:
[[Integration - Sample ERP to Data Platform Real-time]] handles event-driven integration with <5 second latency using Kafka-style event bus.

**Batch Path**:
[[Integration - Sample Data Platform to Analytics Batch]] handles daily ETL with 4-hour latency for analytical reporting.

---

## Architecture Overview

**Enterprise Data Integration Platform**

The [[Architecture - Sample Data Integration Platform HLD]] describes an enterprise-wide data architecture supporting:
- Real-time operational analytics (<5 sec latency)
- Daily batch reporting (4 hour latency)
- REST API access (<500ms latency)
- Multi-region disaster recovery
- 99.95% availability SLA
- Scalable to 1,500+ events/sec

**Key Metrics**:
- **Data Volume**: 150 TB active, 2.5 PB archive
- **Event Throughput**: 500+ events/sec
- **Concurrent Users**: 500+ analytics users
- **Annual Cost**: £5.2M

---

## Expansion Opportunities

See [[Scenario - Sample Real-time Analytics Expansion]] for a detailed plan to:
- Expand from 3 to 8 data sources
- Deploy 15 ML models for predictive analytics
- Achieve 95% real-time query coverage
- Generate £1.7M annual benefits with 2.1-month payback period

---

## System Inventory by Criticality

**Critical Systems** (99.95% SLA, RTO 1h):
- [[System - Sample ERP Application]] - Core transactions
- [[System - Sample Data Integration Platform]] - Data integration
- [[System - Sample Cloud Infrastructure]] - Infrastructure

**High Priority Systems** (99.9% SLA, RTO 2h):
- [[System - Sample Analytics Warehouse]] - Analytics & reporting
- [[System - Sample API Gateway]] - API access

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Data Ingestion** | Kafka-style event bus | Real-time events |
| **Stream Processing** | Apache Spark | <5 sec transformations |
| **Batch Processing** | Apache Spark SQL | Daily ETL |
| **Orchestration** | Airflow-like scheduler | 450+ pipelines |
| **Data Lake** | Cloud object storage | 150 TB active data |
| **Analytics** | Cloud data warehouse | 350+ tables |
| **Cloud Infrastructure** | Multi-region cloud | AWS/Azure/GCP-style |

---

## Quality Metrics

Current state of knowledge graph:

```dataview
LIST
FROM ""
WHERE confidence = "high" AND freshness = "current"
```

---

## Related Notes

- **Canvas Visualizations**: [[Canvas - Sample System Landscape]], [[Canvas - Sample C4 Context Diagram]], [[Canvas - Sample Data Flow Diagram]]
- **Implementation Guide**: [[Page - How to Use This Vault]]
- **Customization Guide**: See individual System, Integration, Architecture, and Scenario notes for organization-specific guidance

---

## How to Use This Dashboard

1. **Explore Systems** - Click on any system name to view detailed documentation
2. **Understand Integrations** - Check integration notes for data flow details
3. **Review Architecture** - Read the HLD for enterprise-wide perspective
4. **Evaluate Scenarios** - See expansion opportunities and business cases
5. **Visualize** - Use Canvas notes to see system landscape and data flows

---

**Tip**: This is a template dashboard for generic sample architecture. Customize it with your organization's actual systems, integrations, and architecture decisions!
