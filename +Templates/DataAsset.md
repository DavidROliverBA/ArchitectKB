---
type: DataAsset
title: "{{name}}"
assetId: null

# Classification
domain: engineering | data | operations | finance | hr | supply-chain | maintenance
dataType: database-table | database-view | api-endpoint | kafka-topic | data-product | data-lake | file | report | cache
classification: public | internal | confidential | secret

# Location & Format
sourceSystem: null # "[[System - X]]"
storageLocation: null # path/table/endpoint
format: sql | json | parquet | avro | csv | xml | binary

# Ownership
owner: null # "[[Person - X]]"
steward: null # "[[Person - Y]]" - data governance contact

# Relationships - Current State
producedBy: [] # ["[[System - X]]"]
consumedBy: [] # ["[[System - Y]]", "[[System - Z]]"]
exposedVia: [] # [rest-api, kafka-topic, direct-query, batch-export, odata, sftp]

# Relationships - Future State
plannedConsumers: [] # ["[[System - Future]]"] - systems that WILL consume
deprecatingConsumers: [] # ["[[System - Legacy]]"] - systems moving away

# Lineage
derivedFrom: [] # Upstream data assets
feedsInto: [] # Downstream data assets

# Operational Metrics
refreshFrequency: real-time | hourly | daily | weekly | monthly | ad-hoc | null
recordCount: null
volumePerDay: null
retentionPeriod: null

# Data Quality (optional - for full detail captures)
completeness: null # percentage
uniqueness: null # percentage
accuracy: high | medium | low | null
timeliness: null # e.g., "< 5 minutes"

# SLAs
slaAvailability: null # e.g., "99.9%"
slaLatency: null # e.g., "< 500ms"

# Governance
gdprApplicable: false
piiFields: []

# Quality Indicators
confidence: medium
freshness: current
verified: false
reviewed: null

created: { { date } }
modified: { { date } }
tags: [type/data-asset, domain/data]
---

# {{name}}

## Overview

**Producer**: [[System - {{sourceSystem}}]]

**Purpose**: Brief description of what data this contains and its business purpose.

**Key Characteristics**:

- ~{{recordCount}} records
- {{volumePerDay}} per day
- {{refreshFrequency}} refresh
- {{classification}} classification

## Source Details

| Property             | Value                         |
| -------------------- | ----------------------------- |
| **Asset ID**         | `{{assetId}}`                 |
| **Source System**    | [[System - {{sourceSystem}}]] |
| **Storage Location** | `{{storageLocation}}`         |
| **Format**           | {{format}}                    |
| **Data Type**        | {{dataType}}                  |

## Data Relationships

```mermaid
flowchart LR
    subgraph Producers
        P1[System - Source]
    end

    subgraph "Data Asset"
        DA[{{name}}]
    end

    subgraph "Current Consumers"
        C1[Consumer 1]
        C2[Consumer 2]
    end

    subgraph "Planned"
        PC1[Future Consumer]
    end

    subgraph "Deprecating"
        DC1[Legacy System]
    end

    P1 --> DA
    DA --> C1
    DA --> C2
    DA -.-> PC1
    DA -. moving away .-> DC1
```

### Consumer Summary

| Category        | Systems                  | Count     |
| --------------- | ------------------------ | --------- |
| **Current**     | {{consumedBy}}           | {{count}} |
| **Planned**     | {{plannedConsumers}}     | {{count}} |
| **Deprecating** | {{deprecatingConsumers}} | {{count}} |

### Current Consumers

| System         | Purpose                | Access Method | Criticality |
| -------------- | ---------------------- | ------------- | ----------- |
| [[System - X]] | Data warehouse loading | REST API      | Critical    |
| [[System - Y]] | BI reporting           | Batch export  | High        |

### Planned Consumers

| System              | Target Date | Purpose   | Status      |
| ------------------- | ----------- | --------- | ----------- |
| [[System - Future]] | Q2 2026     | Analytics | In planning |

### Deprecating Consumers

| System              | Target Removal | Replacement      | Status                |
| ------------------- | -------------- | ---------------- | --------------------- |
| [[System - Legacy]] | Q3 2026        | [[System - New]] | Migration in progress |

## Data Lineage

### Upstream (Derived From)

```
[[DataAsset - Source 1]] --> [[DataAsset - This]]
[[DataAsset - Source 2]] --> [[DataAsset - This]]
```

### Downstream (Feeds Into)

```
[[DataAsset - This]] --> [[DataAsset - Downstream 1]]
[[DataAsset - This]] --> [[DataAsset - Downstream 2]]
```

## Operational Metrics

| Metric                | Value                | Notes            |
| --------------------- | -------------------- | ---------------- |
| **Refresh Frequency** | {{refreshFrequency}} |                  |
| **Record Count**      | {{recordCount}}      | As of last count |
| **Daily Volume**      | {{volumePerDay}}     | Average          |
| **Retention Period**  | {{retentionPeriod}}  |                  |

### Data Quality

| Metric           | Current           | Target  | Status |
| ---------------- | ----------------- | ------- | ------ |
| **Completeness** | {{completeness}}% | 99%     |        |
| **Uniqueness**   | {{uniqueness}}%   | 99.9%   |        |
| **Accuracy**     | {{accuracy}}      | High    |        |
| **Timeliness**   | {{timeliness}}    | < 5 min |        |

### SLAs

| SLA              | Target              | Current |
| ---------------- | ------------------- | ------- |
| **Availability** | {{slaAvailability}} |         |
| **Latency**      | {{slaLatency}}      |         |

## Security & Governance

| Property            | Value              |
| ------------------- | ------------------ |
| **Classification**  | {{classification}} |
| **GDPR Applicable** | {{gdprApplicable}} |
| **PII Fields**      | {{piiFields}}      |
| **Data Owner**      | [[{{owner}}]]      |
| **Data Steward**    | [[{{steward}}]]    |

## Related Notes

| Document                      | Type                  | Link              |
| ----------------------------- | --------------------- | ----------------- |
| [[System - {{sourceSystem}}]] | Source System         | Producer details  |
| [[ADR - ...]]                 | Architecture Decision | Related decisions |
| [[Integration - ...]]         | Integration           | How data flows    |

## Change Log

| Date     | Change  | Impact | Owner     |
| -------- | ------- | ------ | --------- |
| {{date}} | Created | -      | {{owner}} |

---

**Last Updated**: {{modified}}

**Next Review**: {{review_date}}
