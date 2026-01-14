---
type: Integration
title: "Sample Data Platform to Analytics Batch"
integrationId: int-dip-aw-batch
integrationPattern: batch-etl
source: "[[System - Sample Data Integration Platform]]"
target: "[[System - Sample Analytics Warehouse]]"
criticality: high
description: "Daily batch ETL from Data Platform to Analytics Warehouse for historical analysis and reporting"
dataClassification: internal
created: 2026-01-14
modified: 2026-01-14
tags: [Integration, activity/integration, technology/spark, domain/data, domain/analytics]

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14

# Related Items
relatedSystems: ["[[System - Sample Data Integration Platform]]", "[[System - Sample Analytics Warehouse]]"]
relatedIntegrations: ["[[Integration - Sample ERP to Data Platform Real-time]]"]
relatedArchitecture: ["[[Architecture - Sample Data Integration Platform HLD]]"]
---

# Sample Data Platform to Analytics Batch Integration

## Overview

Daily batch ETL pipeline extracting transformed data from the Data Integration Platform and loading into the Analytics Warehouse for reporting, compliance, and historical analysis.

**Key Characteristics:**
- **Pattern**: Batch ETL (Extract-Transform-Load)
- **Schedule**: Daily at 04:00 UTC
- **Duration**: 90-120 minutes
- **Throughput**: 10 TB/day
- **Tables**: 80 source → 350+ analytics tables
- **Availability**: 99.95% SLA
- **Technology**: Spark for transformation, cloud storage (data lake), warehouse native loading

## Architecture

```
┌─────────────────────────────────┐
│ Data Integration Platform       │
│  • Data Lake (Delta/Parquet)    │
│  • 150 TB active data           │
│  • Real-time streamed data      │
└──────────────┬──────────────────┘
               │ 04:00 UTC
               ▼
┌─────────────────────────────────┐
│  Batch ETL Orchestrator         │
│  (Airflow-like scheduler)       │
│  • 450 DAGs                     │
│  • Dependency management        │
│  • Error handling               │
└──────────────┬──────────────────┘
               │ Extract 80 tables
               ▼
┌─────────────────────────────────┐
│  Transformation Engine          │
│  (Apache Spark)                 │
│  • Data quality checks          │
│  • Aggregations & joins         │
│  • Slowly Changing Dimensions   │
│  • Custom business logic        │
└──────────────┬──────────────────┘
               │ Transform & Stage
               ▼
┌─────────────────────────────────┐
│  Staging Layer                  │
│  • Bronze → Silver → Gold       │
│  • Data validation              │
│  • Reconciliation checks        │
└──────────────┬──────────────────┘
               │ Load (02:00 UTC)
               ▼
┌─────────────────────────────────┐
│ Analytics Warehouse             │
│  • 350+ tables                  │
│  • Star schema (facts+dims)     │
│  • Indexed for analytics        │
└─────────────────────────────────┘
```

## Load Schedule

### Daily ETL Timeline

```
Time    Event                               Status
────────────────────────────────────────────────────────
03:55   Pre-load validation                Checking prerequisites
04:00   ETL process starts                 Extract begins
04:15   Complete Data Platform reads       Extracting 80 tables
04:30   Transformation starts              50 GB/min processing
05:00   Intermediate data written          Staging layer update
05:30   Quality checks run                 Validating transform
06:00   Data available in Analytics        Load complete (2 hours)
08:00   Analysts access data               All dashboards refreshed
20:00   Day complete                       Ready for next cycle
```

**SLA**: Data available in analytics by 08:00 UTC (4 hours after start)

## Data Flows

### Tables Loaded

| Category | Count | Size | Examples |
|----------|-------|------|----------|
| **Fact Tables** | 25 | 8 TB | Orders, Invoices, GL Posts, Inventory Movements |
| **Dimension Tables** | 45 | 500 GB | Customers, Vendors, Products, Accounts, Dates |
| **Aggregate Tables** | 80 | 1.5 TB | Daily summaries, monthly rollups |
| **Mart Tables** | 200 | 2 TB | Pre-aggregated business marts |
| **Total** | **350+** | **12 TB** | All analytics data |

### Extraction

| Stage | Duration | Data Volume | Details |
|-------|----------|-------------|---------|
| Read from Platform | 15 min | 10 TB | Reading latest from data lake |
| Compression | 5 min | 3 TB | Gzip compression for network transfer |
| Network Transfer | 20 min | 3 TB (transferred) | Data platform → Analytics region |
| **Extraction Total** | **40 min** | **10 TB source** | |

### Transformation

| Transformation | Count | Duration | Example |
|---|---|---|---|
| **Data Quality Checks** | 500+ | 10 min | Null checks, range validation, deduplication |
| **Joins** | 200+ | 30 min | Customer → Orders, Product → Inventory |
| **Aggregations** | 150+ | 25 min | Daily summaries, monthly totals |
| **SCD Type 2** | 45 | 10 min | Customer dimension with history |
| **Custom Logic** | 100+ | 15 min | Business rules, calculations |
| **Index Creation** | 350+ | 10 min | Indexes on fact/dimension keys |
| **Transformation Total** | | **100 min** | |

### Loading

| Step | Duration | Details |
|-----|----------|---------|
| Create staging | 10 min | Temporary staging tables |
| Validate data | 15 min | Row counts, checksums |
| Insert/Update fact | 20 min | 80 fact tables |
| Insert/Update dimensions | 10 min | 45 dimension tables |
| Refresh materialized views | 10 min | Pre-aggregated marts |
| Build indexes | 10 min | Analytics queries |
| Update statistics | 5 min | Query planner optimization |
| **Loading Total** | **80 min** | |

## Data Quality Framework

### Validation Rules (500+)

```yaml
Validation Categories:
  Schema Validation:
    - Column count matches expected
    - Data types correct
    - Column order validated
    - Precision/scale correct for decimals

  Completeness:
    - Null checks on mandatory fields
    - Not null rates >99%
    - Primary keys present
    - All expected records present

  Accuracy:
    - Referential integrity (FK checks)
    - Range validation (amounts > 0)
    - Date logic (dates < today)
    - Amount reconciliation (±0.01%)

  Consistency:
    - Dimension member existence
    - SCD Type 2 validity
    - Time dimension continuity
    - Cross-table consistency

  Timeliness:
    - Load completed by SLA time
    - Data freshness acceptable
    - Latency <4 hours
```

### Test Results

| Test Category | Passing | Failing | Rate |
|---|---|---|---|
| Schema | 348 | 0 | 100% |
| Completeness | 450 | 2 | 99.56% |
| Accuracy | 425 | 5 | 98.84% |
| Consistency | 380 | 1 | 99.74% |
| Timeliness | 100 | 0 | 100% |
| **Total** | **1,703** | **8** | **99.53%** |

### Failure Handling

| Issue | Detection | Action | SLA |
|---|---|---|---|
| Schema mismatch | Pre-load validation | Alert + retry | Retry within 1 hour |
| Data quality <99% | Post-transform | Stop load, investigate | Manual review <2 hours |
| Referential integrity failure | Post-load validation | Quarantine failed rows | Resolve <4 hours |
| Load timeout | During load | Rollback & retry | Retry with more resources |

## Performance Metrics

### Throughput

| Metric | Value | Details |
|--------|-------|---------|
| **Extract Throughput** | 400 MB/s | 10 TB in 7 minutes (uncompressed) |
| **Transform Throughput** | 100 MB/s | CPU-bound, 100 Spark executors |
| **Load Throughput** | 150 MB/s | Analytics warehouse parallel insert |
| **Peak Bandwidth** | 2 GB/s | Data platform → Analytics transfer |
| **Average Daily** | 10 TB | 80 tables × 125 GB average |

### Latency

| Stage | Duration | Target |
|---|---|---|
| Schedule to start | 5 min | Airflow scheduling |
| Extraction | 40 min | Read data lake |
| Transformation | 100 min | Spark processing |
| Load | 80 min | Insert to warehouse |
| Validation | 15 min | Quality checks |
| **Total End-to-End** | **240 minutes** | **4 hours SLA** |

### Storage

| Location | Size | Growth |
|---|---|---|
| Data Platform (source) | 150 TB active | 10 TB/day |
| Staging area | 5 TB | Transient |
| Analytics Warehouse | 12 TB daily | 4.4 TB/year |
| Archive (7 years) | 30 TB | Compliance retention |

## Failure Scenarios & Recovery

### Scenario 1: Extraction Fails (Data Platform Unavailable)

**Impact**: Batch doesn't start, analytics data stale
**Detection**: No data read by 04:15 UTC
**Recovery Options**:
  1. Retry extraction (automatic, 3 attempts)
  2. Use previous day's data (fallback, stale by 1 day)
  3. Restore from backup (manual, 2 hour RTO)
**RTO**: 2-8 hours (depends on option)
**RPO**: 1-24 hours
**Mitigation**: Multi-region replica of data platform

### Scenario 2: Transformation Fails (Logic Error)

**Impact**: Analytics tables not updated
**Detection**: Transform job fails in Spark, alert triggered
**Recovery Options**:
  1. Fix code bug and retry (if logic error)
  2. Restore previous good load (if data error)
  3. Manual review and fix (if data inconsistency)
**RTO**: 1-4 hours
**RPO**: 24 hours (previous day data)

### Scenario 3: Load Fails (Analytics Warehouse Capacity)

**Impact**: Warehouse overloaded, load times out
**Detection**: Load job times out after 120 minutes
**Recovery Options**:
  1. Scale warehouse (10 min scale-up time)
  2. Pause other queries during load
  3. Reduce batch size and retry
**RTO**: 30-60 minutes
**RPO**: Zero (previous load untouched)

### Scenario 4: Data Quality Issues Detected

**Impact**: Bad data would load, queries give wrong results
**Detection**: Quality checks fail (>1% error rate)
**Recovery**:
  1. Stop load immediately (quarantine bad data)
  2. Investigate root cause (1-2 hours)
  3. Fix in Data Platform (re-transform)
  4. Re-load clean data (4 hours)
**RTO**: 4-6 hours
**RPO**: 24 hours (previous good load)

## Monitoring & Alerting

### Key Metrics

```yaml
Dashboards:
  - ETL Health
    • Start time vs schedule
    • Extract duration (trending)
    • Transform duration (trending)
    • Load duration (trending)
    • Total end-to-end time vs SLA
    • Success/failure rate

  - Data Quality
    • Validation pass rate
    • Rows extracted vs loaded
    • Null percentages by column
    • Data quality by table
    • Reconciliation variance

  - Analytics Freshness
    • Last successful load timestamp
    • Time since load
    • Data age by table
    • Stale data alerts

Alerts (Severity):
  - CRITICAL: ETL failed (0 tables loaded)
  - CRITICAL: Data quality <95%
  - HIGH: ETL duration >5 hours (SLA: 4h)
  - HIGH: Load variance >10% from baseline
  - MEDIUM: ETL duration >4.5 hours
  - MEDIUM: Data quality 95-99%
  - LOW: ETL duration >4 hours (approaching SLA)
```

## Operational Procedures

### Manual ETL Trigger

```bash
# Trigger ETL immediately (emergency restart)
airflow dags trigger --exec-date 2026-01-14 \
  sample_data_platform_to_analytics_batch

# Monitor progress
airflow dags list-runs --dag-id sample_data_platform_to_analytics_batch

# Check transformation logs
tail -f /var/log/spark/transformation.log
```

### Reload from Specific Date

```bash
# Reload 7 days of data (recovery from data error)
for date in {0..7}; do
  load_date=$(date -d "-$date days" +%Y-%m-%d)
  airflow dags trigger --exec-date $load_date \
    sample_data_platform_to_analytics_batch
done
```

### Check Data Reconciliation

```sql
-- Verify row counts match between Data Platform and Analytics
SELECT 'orders' as table_name,
       dip_count,
       aw_count,
       dip_count - aw_count as variance,
       ROUND(100.0 * ABS(dip_count - aw_count) / dip_count, 2) as variance_pct
FROM (
  SELECT
    (SELECT COUNT(*) FROM data_platform.orders) as dip_count,
    (SELECT COUNT(*) FROM analytics.fact_orders) as aw_count
);
```

## Customization Guide

Replace these with your actual systems:

**Source System (Data Platform)**:
- Change "Sample Data Integration Platform" → Your actual platform (Talend, Informatica, Spark, custom, etc.)
- Adjust table count (80 here) to match your actual source tables
- Update daily volume from actual data platform metrics
- Modify extraction queries to match your data structure

**Target System (Analytics Warehouse)**:
- Change "Sample Analytics Warehouse" → Your actual warehouse (Snowflake, Redshift, BigQuery, etc.)
- Adjust table count (350+ here) to match your analytics model
- Update fact/dimension structure to match your star schema
- Modify load strategy based on warehouse type (native bulk load vs COPY command, etc.)

**ETL Schedule**:
- Adjust start time (04:00 UTC) to your business timezone
- Update duration targets based on your actual performance
- Modify frequency if different from daily (weekly, hourly, etc.)

**Transformation Logic**:
- Replace sample transformations with your business logic
- Customize validation rules to match your data quality requirements
- Add or remove slowly changing dimension (SCD) logic as needed

**Orchestration**:
- Change "Airflow-like" to your actual tool (Apache Airflow, Kubernetes CronJob, AWS Glue, etc.)
- Customize DAG structure and dependencies
- Update monitoring/alerting for your tools

## Related Notes

- **Source System**: [[System - Sample Data Integration Platform]]
- **Target System**: [[System - Sample Analytics Warehouse]]
- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
- **Real-time Integration**: [[Integration - Sample ERP to Data Platform Real-time]]
- **Data Flow Canvas**: [[Canvas - Sample Data Flow Diagram]]

---

**Tip**: This template shows a daily batch ETL integration. Update the tables, transformations, and schedule to match your organisation's actual analytics requirements!
