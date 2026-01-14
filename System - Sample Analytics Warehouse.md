---
type: System
title: "Sample Analytics Warehouse"
systemId: analytics-001
systemType: database
description: "Cloud-native analytics warehouse for business intelligence and reporting"
owner: "Analytics & BI"
criticality: high
businessValue: £950000
annualCost: £950000
vendor: "Cloud Warehouse Provider"
hostingModel: cloud-saas
hostedOn: "SaaS (US-East-1)"
dataClassification: internal
environmentType: production
created: 2026-01-14
modified: 2026-01-14
tags: [System, criticality/high, technology/analytics, domain/data]

# System Properties
status: active
supportModel: vendor-managed
sla: "99.9% availability"
availability: 99.9%
dataVolume: "80 TB"
tables: "350+ tables"
queries: "100+ Tableau dashboards"
users: "250 active users"
peakQueryLatency: "5-15 seconds"

# Integration Landscape
connectsFrom: ["[[System - Sample Data Integration Platform]]"]
connectsTo: ["[[System - Sample API Gateway]]"]
integrations:
  - "[[Integration - Data Platform to Analytics Batch]]"

# Contacts
primaryContact: "[[Person - Analytics Lead]]"
onCallTeam: "Analytics Operations"

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14

# Cost Breakdown
computeCost: £45000
storageCost: £35000
licenseCost: £100000
licenseNote: "Includes BI tool licenses"
staffingCost: £100000

# Related Items
relatedSystems: []
relatedDecisions: []
relatedProjects: []
documentation: []
---

# Sample Analytics Warehouse

## Overview

A scalable cloud-native data warehouse serving as the single source of truth for business analytics and reporting.

**Key Features:**
- **Zone Architecture**: Raw (Bronze), Refined (Silver), Mart (Gold)
- **360+ Tables**: Real-time and batch loaded data
- **250+ Users**: Finance, operations, marketing, executives
- **100+ Dashboards**: Business metrics and KPIs
- **Sub-15 Second Queries**: Fast analytics for decision-making

## Data Architecture

```
Bronze Zone (Raw Data)
├── ERP Invoices (daily load)
├── ERP Orders (daily load)
├── ERP GL Postings (daily load)
└── Master Data (customers, products, vendors)

        ↓ dbt Transformations

Silver Zone (Refined Data)
├── Cleaned & normalized facts
├── Deduplicated dimensions
└── Pre-validated data quality

        ↓ Business Logic

Gold Zone (Mart Tables)
├── Financial Dashboard Data
├── Sales Performance Metrics
├── Operational KPIs
└── Executive Summary Tables
```

## Performance Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **Availability** | 99.9% | 99.9% | ✓ Meeting |
| **Query Latency** | <15 sec | 5-15 sec | ✓ Meeting |
| **Data Freshness** | Daily batch | Real-time streams | ✓ Exceeding |

## Cost Analysis

### Annual Cost
```
Compute/Processing:  £45,000     (4.7%)
Storage:             £35,000     (3.7%)
Licensing:          £100,000    (10.5%)
Staffing:           £100,000    (10.5%)
────────────────────────────────
Total:              £280,000

(Note: Total system cost includes infrastructure
at [[System - Sample Cloud Infrastructure]])
```

### Cost Optimization
- **Auto-suspend idle warehouses** (£80K/year savings possible)
- **Result caching** (£40K/year savings)
- **Lifecycle policies** (move old data to archive)

## Related Notes

- **Data Source**: [[System - Sample Data Integration Platform]]
- **API Access**: [[System - Sample API Gateway]]
- **Integration**: [[Integration - Data Platform to Analytics Batch]]
- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
