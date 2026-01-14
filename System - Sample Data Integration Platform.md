---
type: System
title: "Sample Data Integration Platform"
systemId: dip-001
systemType: platform
description: "Real-time and batch data integration platform for streaming and transforming business data"
owner: "Data Engineering"
criticality: critical
businessValue: £1800000
annualCost: £1800000
vendor: "Open Source + Internal"
hostingModel: cloud
hostedOn: "[[System - Sample Cloud Infrastructure]]"
dataClassification: confidential
environmentType: production
created: 2026-01-14
modified: 2026-01-14
tags: [System, criticality/critical, technology/data-platform, domain/data, technology/streaming]

# System Properties
status: active
supportModel: internal-engineering
sla: "99.95% availability, 30-minute RTO, 5-minute RPO"
availability: 99.95%
rto: "30 minutes"
rpo: "5 minutes"
mtr: "5 minutes"

# Technology Stack
technology: ["Apache Spark", "Apache Kafka", "Airflow", "Delta Lake", "Python", "Scala"]
frameworks: ["Streaming Framework", "Batch ETL Framework"]
databases: ["Delta Lake (Data Lake)", "Cloud Storage"]
messagingPatterns: ["Kafka Topics", "REST APIs"]

# Integration Landscape
connectsFrom: ["[[System - Sample ERP Application]]"]
connectsTo: ["[[System - Sample Analytics Warehouse]]", "[[System - Sample API Gateway]]"]
integrations:
  - "[[Integration - ERP to Data Platform Real-time]]"
  - "[[Integration - ERP to Data Platform Batch]]"
  - "[[Integration - Data Platform to Analytics Batch]]"

# Contacts
primaryContact: "[[Person - Data Engineering Lead]]"
secondaryContacts: []
onCallTeam: "Data Platform Team"
supportEmail: "data-platform@company.example"

# Data & Performance
dataVolume: "150 TB active, 2.5 PB total (with history)"
dataGrowth: "+10 TB per day"
recordCount: "2 billion+ records daily"
pipelineCount: "450 active pipelines"
peakThroughput: "500 events/second"
batchVolume: "10 TB/day"
latencyTarget: "<30 seconds real-time, <2 hours batch"
latencyActual: "<5 seconds real-time, 90-120 min batch"

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-14

# Compliance & Security
complianceFrameworks: ["SOX", "ISO 27001", "GDPR", "data classification"]
dataEncryption: "AES-256 (at rest), TLS 1.3 (in transit)"
accessControl: "RBAC + service accounts"
auditLogging: "Application logs + data lineage tracking"
lastSecurityAudit: "2025-10-01"
penetrationTestStatus: "Passed"

# Cost Breakdown
computeCost: £800000
storageCost: £350000
maintenanceCost: £250000
staffingCost: £400000

# Known Issues & Roadmap
knownIssues: []
roadmapItems:
  - "Spark to Scala migration (2026 Q3)"
  - "Real-time analytics expansion (2026 Q1)"
  - "ML pipeline integration (2026 Q4)"

# Related Items
relatedSystems: []
relatedDecisions: []
relatedProjects: []
documentation: []
---

# Sample Data Integration Platform

## Overview

A data integration platform handling both real-time and batch ETL workloads for transforming data from source systems into analytics-ready formats.

**Core Capabilities:**
- **Real-time Streaming**: Sub-30 second processing of business events
- **Batch ETL**: Daily 10 TB data transformations
- **Data Quality**: Automated validation and deduplication
- **Data Lake**: 150 TB active plus 2.5 PB historical data

## System Architecture

```
                Source Systems
                      │
        ┌─────────────┼──────────────┐
        │             │              │
    Real-time      Batch        APIs
    (Kafka)      (Spark)       (REST)
        │             │              │
        └──────┬──────┴──────┬───────┘
               │             │
        ┌──────▼─────────────▼──────┐
        │  Data Integration         │
        │  • Kafka (event bus)      │
        │  • Spark (processing)     │
        │  • Airflow (scheduling)   │
        │  • Delta Lake (storage)   │
        └──────┬────────┬───────────┘
               │        │
    Real-time  │        │  Batch
    (5 sec)    │        │  (2h)
               │        │
        ┌──────▼─┬──────▼──────┐
        │        │             │
    Streaming Analytics    Data Lake
    Tables    Warehouse   (Parquet)
        │        │             │
        └────┬───┴──────┬──────┘
             │          │
        Analytics & Reporting
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Event Bus** | Apache Kafka | Real-time event streaming |
| **Streaming** | Spark Structured Streaming | Sub-30 sec processing |
| **Batch Processing** | Apache Spark (batch) | Daily ETL jobs |
| **Data Lake** | Delta Lake | Versioned data storage |
| **Orchestration** | Apache Airflow | Pipeline scheduling |
| **Languages** | Python, Scala | Processing logic |

## Key Capabilities

### Real-time Streaming (Sub-30 seconds)

**Path**: ERP Events → Kafka → Spark Streaming → Delta Lake → Analytics

- **Throughput**: 500 events/second
- **Latency**: <5 seconds end-to-end (p99)
- **Topics**: 10 Kafka topics (invoices, orders, GL postings, master data, etc.)
- **Use Cases**: Real-time dashboards, operational alerts, fraud detection

**Data Quality Checks:**
- ✓ Schema validation (CloudEvents format)
- ✓ Deduplication (event ID + timestamp)
- ✓ Null checks on mandatory fields
- ✓ Range validation (amounts > 0)
- ✓ Referential integrity (customer exists in master)

### Batch ETL (Daily 04:00 UTC)

**Path**: ERP Extract → Spark Jobs → Delta Lake → Analytics Warehouse

- **Frequency**: Once daily at 04:00 UTC
- **Tables**: 80 source tables from ERP
- **Volume**: 10 TB/day transformation
- **Records**: 1.5 billion records/day
- **Latency**: 90-120 minutes (extraction to analytics ready)

**Transformations:**
- Cleansing (remove nulls, standardize formats)
- Enrichment (add dimensions, flags)
- Aggregation (pre-calculated metrics)
- dbt models (450+ transformations)

### Data Lake Architecture

**Zones:**
1. **Bronze (Raw)**: Unmodified data from source
2. **Silver (Refined)**: Cleaned, deduplicated, validated
3. **Gold (Mart)**: Business-ready, aggregated data

**Storage**:
- Active: 150 TB (last 90 days)
- Historical: 2.5 PB (multi-year retention)
- Backup: Cross-region replication

## Integration Points

### Inbound
1. **ERP Real-time Events** (via Kafka)
   - 50K+ invoices/day
   - 100K+ GL postings/day
   - 25K+ orders/day
   - 180 master data changes/day

2. **ERP Batch Extracts** (Spark jobs)
   - 80 tables daily
   - GL, AP, AR, Inventory, Orders

3. **Third-party APIs** (batch connectors)
   - Partner data imports
   - Market data feeds

### Outbound
1. **Analytics Warehouse** (Parquet files to cloud storage)
   - Batch: Daily 10 TB load
   - Real-time: Streaming updates every 30 seconds

2. **REST APIs** (via API gateway)
   - Data catalog/lineage
   - Pipeline metrics
   - Data quality reports

## Performance Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **Real-time Latency** | <30 sec | <5 sec p99 | ✓ Exceeding |
| **Batch Duration** | <2 hours | 90-120 min | ✓ Exceeding |
| **Availability** | 99.95% | 99.95% | ✓ Meeting |
| **Data Quality Pass Rate** | >99% | 99.7% | ✓ Meeting |
| **Pipeline Success Rate** | >99% | 99.8% | ✓ Exceeding |

## Pipeline Inventory

- **450 active pipelines**
  - 50 real-time (Kafka consumers)
  - 400 batch (daily Spark jobs)

- **Data quality checks**: 500+ validations across pipelines

- **Data lineage tracking**: Full source-to-destination mapping

## Cost Analysis

### Annual Cost Breakdown
```
Compute (Spark/Kafka):    £800,000    (44%)
  • Kubernetes nodes for Spark
  • Kafka brokers
  • Job scheduling (Airflow)

Storage (Delta Lake/S3):  £350,000    (19%)
  • Data lake (150 TB active)
  • Archive (2.5 PB historical)
  • Backups & replication

Staffing:                 £400,000    (22%)
  • 3 data engineers
  • On-call support

Tools & Maintenance:      £250,000    (14%)
  • Open source support
  • Testing tools
  • Monitoring
────────────────────────────────
Total Annual:             £1,800,000
```

### Cost Trend
- FY2024: £1,700,000
- FY2025: £1,800,000 (+5.9%)
- FY2026 Forecast: £1,900,000 (+5.6%)

### Cost Drivers
- Data volume growth (+10 TB/day annually)
- Increased compute for real-time processing
- Stable staffing (good team retention)

## Disaster Recovery

### RTO/RPO Targets
- **RTO**: 30 minutes (restore to last successful run)
- **RPO**: 5 minutes (last checkpoint within 5 min)

### DR Strategy
- Warm standby in secondary region
- Cross-region S3 replication (continuous)
- RDS backup snapshots (daily)
- Kafka event retention (30 days)

## Known Issues & Improvements

### In-Flight Work
- **Spark to Scala Migration** (Q3 2026)
  - Benefit: 30% performance improvement, type safety
  - Effort: 3 engineers, 4 months
  - Risk: High (major refactor)

- **Real-time Analytics Expansion** (Q1-Q3 2026)
  - Add Snowflake Streaming Connector
  - Deploy Streamlit for self-service analytics
  - Expand real-time tables from 50 to 150+
  - Cost: £234K setup, +£300K/year

## Related Notes

- **Data Sources**: [[System - Sample ERP Application]]
- **Data Consumers**: [[System - Sample Analytics Warehouse]]
- **API Access**: [[System - Sample API Gateway]]
- **Integrations**: [[Integration - ERP to Data Platform Real-time]], [[Integration - ERP to Data Platform Batch]], [[Integration - Data Platform to Analytics Batch]]
- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
