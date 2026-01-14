---
type: Architecture
title: "Sample Data Integration Platform HLD"
adrId: arch-dip-001
version: "2.0"
status: active
description: "Enterprise-wide high-level design for data integration platform connecting ERP, analytics, and business systems"
businessDriver: "Unified real-time and batch data integration supporting analytics, compliance, and operational reporting"
owner: "Architecture Team"
criticality: critical
dataClassification: internal
created: 2026-01-14
modified: 2026-01-14
tags: [Architecture, activity/architecture, technology/data, domain/enterprise, domain/integration]

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14

# Related Components
systems: ["[[System - Sample ERP Application]]", "[[System - Sample Data Integration Platform]]", "[[System - Sample Analytics Warehouse]]", "[[System - Sample Cloud Infrastructure]]"]
integrations: ["[[Integration - Sample ERP to Data Platform Real-time]]", "[[Integration - Sample Data Platform to Analytics Batch]]"]

---

# Sample Data Integration Platform - High-Level Design

## Executive Summary

Enterprise architecture for a unified data integration platform combining real-time event streaming and batch ETL to provide sub-5-second analytics latency for operational dashboards and 4-hour latency for analytical reporting. Supports 250,000+ daily transactions, 150 TB of active data, and serves 500+ concurrent users across analytics, compliance, and operational domains.

**Key Objectives:**
- Reduce analytics latency from 24 hours (batch-only) to real-time (<5 sec) for operational dashboards
- Consolidate data integration from 8 legacy point-to-point integrations to unified platform
- Achieve 99.95% availability with automated failover across regions
- Enable self-service analytics through standardized data models and metadata
- Reduce data integration costs by 40% through consolidation

## Architecture Vision

```
                                    Analytics & Reporting
                                   (Real-time + Batch)
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
                    ▼                       ▼                       ▼
              Dashboards              Reports               External APIs
              (Real-time)            (Daily)                (Sub-500ms)
                    │                 │                       │
                    └─────────────────┬───────────────────────┘
                                      │
                        ┌─────────────▼──────────────┐
                        │  Analytics Warehouse      │
                        │  • 350+ tables            │
                        │  • Real-time + Batch      │
                        │  • 99.95% availability    │
                        └─────────────┬──────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
        ┌───────────▼───────────┐     │    ┌────────────▼────────────┐
        │  Real-time Path       │     │    │  Batch ETL Path        │
        │  (<5 sec)             │     │    │  (90-120 min)          │
        │                       │     │    │                        │
        │  • Stream Processing  │     │    │  • Spark Transforms    │
        │  • Validation         │     │    │  • Data Quality        │
        │  • Enrichment         │     │    │  • Aggregations        │
        │  • Fast Loading       │     │    │  • Index Building      │
        └───────────┬───────────┘     │    └────────────┬───────────┘
                    │                 │                 │
                    └─────────────────┬─────────────────┘
                                      │
                        ┌─────────────▼──────────────┐
                        │  Data Lake                 │
                        │  • 150 TB active           │
                        │  • Versioned data          │
                        │  • Multi-region replicated │
                        │  • 7-year retention        │
                        └─────────────┬──────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
        ┌───────────▼───────────┐     │    ┌────────────▼────────────┐
        │  Event Bus (Kafka)    │     │    │  Batch Extract         │
        │  • 500+ events/sec    │     │    │  • Daily schedule      │
        │  • 50+ topics         │     │    │  • Full table scan     │
        │  • 3-broker cluster   │     │    │  • Change detection    │
        └───────────┬───────────┘     │    └────────────┬───────────┘
                    │                 │                 │
                    └─────────────────┬─────────────────┘
                                      │
                        ┌─────────────▼──────────────┐
                        │  Sample ERP Application    │
                        │  • Transactions            │
                        │  • Master Data             │
                        │  • GL Postings             │
                        └────────────────────────────┘
```

## Technology Stack

### Data Ingestion Layer

| Component | Technology | Purpose | Capacity |
|---|---|---|---|
| **Event Capture** | Change Data Capture (CDC) | Extract ERP changes in real-time | 1,500 events/sec |
| **Event Bus** | Apache Kafka (or cloud equivalent) | Buffer and route events | 50+ topics, 30-day retention |
| **API Gateway** | Open source or cloud-native | Expose real-time APIs | 5,000 req/sec |

### Data Processing Layer

| Component | Technology | Purpose | SLA |
|---|---|---|---|
| **Stream Processing** | Apache Spark Structured Streaming | Real-time transformations | <3 sec processing |
| **Batch Processing** | Apache Spark (SQL/Scala) | Daily ETL | <2 hours processing |
| **Orchestration** | Apache Airflow (or Kubernetes) | DAG scheduling | 99.95% availability |

### Data Storage Layer

| Component | Technology | Purpose | Capacity |
|---|---|---|---|
| **Data Lake** | Cloud object storage (S3/GCS/ADLS) | Versioned raw data | 150 TB active, 2.5 PB archive |
| **Metadata Store** | PostgreSQL or cloud DB | Schema, lineage, data catalog | Unlimited |
| **Staging** | Cloud data warehouse | Intermediate transformations | Elastic |

### Analytics Layer

| Component | Technology | Purpose | Capacity |
|---|---|---|---|
| **Analytics Warehouse** | Cloud data warehouse | Query engine | 500+ concurrent users, 100+ dashboards |
| **BI Tool** | Tableau/Looker/PowerBI | Visualization | 500+ users |
| **Reporting** | Cloud BI or custom | Automated reports | 200+ reports |

### Platform Infrastructure

| Layer | Technology | Configuration |
|---|---|---|
| **Compute** | Kubernetes (EKS/AKS/GKE) | 3-node cluster, auto-scaling |
| **Storage** | Cloud block/object storage | Encryption at rest (AES-256) |
| **Networking** | VPC with public/private subnets | Multi-AZ, 10 Gbps Direct Connect |
| **Security** | IAM, KMS, WAF, TLS 1.3 | Centralized key management |
| **Monitoring** | Cloud monitoring (CloudWatch/etc) | 99.95% availability SLA |
| **Orchestration** | Infrastructure as Code (Terraform) | Version-controlled infrastructure |

## Functional Architecture

### 1. Real-time Path (<5 seconds)

**Flow**: ERP Transaction → Event Bus → Stream Processing → Data Lake → Analytics

**Process**:
```
1. ERP creates transaction (Order, Invoice, GL Post)
   └─ 0 ms: Transaction committed to ERP database

2. Change Data Capture (CDC) detects change
   └─ +100 ms: ERP change log read

3. Event published to Event Bus topic
   └─ +200 ms: Event reaches Kafka broker 1

4. Event replicated across brokers
   └─ +500 ms: Replicated to 3 brokers (durability)

5. Stream processor subscribes and receives event
   └─ +800 ms: Available for real-time consumers

6. Stream processor validates and enriches event
   └─ +3,000 ms: Transformation complete

7. Event written to Data Lake
   └─ +3,800 ms: Written to storage

8. Analytics Warehouse consumes from Data Lake
   └─ +4,200 ms: Available in analytics tables (real-time views)

Total latency: 4.2 seconds (SLA: <5 sec) ✓
```

**Characteristics**:
- High-frequency updates (500+ events/sec)
- Low latency (sub-5 second)
- Exactly-once semantics (no duplicates)
- Event bus provides durability (30-day replay window)

**Use Cases**:
- Real-time operational dashboards (invoice status, order tracking)
- Alerts and anomaly detection
- Live KPI monitoring

### 2. Batch Path (4 hours)

**Flow**: ERP Extract → Data Platform Transform → Data Lake → Analytics (nightly load)

**Process**:
```
1. Nightly batch scheduled (04:00 UTC)
   └─ 0 min: Extract job starts

2. Extract 80 tables from ERP
   └─ +40 min: 10 TB data extracted

3. Transform with Spark (joins, aggregations, validations)
   └─ +100 min: Spark processes data

4. Write to Data Lake staging
   └─ +120 min: Staging area ready

5. Data quality checks (validation, reconciliation)
   └─ +135 min: Quality validation complete

6. Load to Analytics Warehouse
   └─ +180 min: Warehouse load complete (3 hours)

7. Refresh materialized views and indexes
   └─ +210 min: Analytics ready (3.5 hours)

8. Analysts query fresh data (08:00 UTC)
   └─ +240 min: Available (4 hours from start)

Total latency: 4 hours (SLA: <5 hours) ✓
```

**Characteristics**:
- High volume (10 TB/day)
- Scheduled overnight (non-business hours)
- Complete dataset (80 tables, historical)
- Long-term storage (7-year compliance retention)

**Use Cases**:
- Compliance reporting
- Historical analysis
- Data warehouse refresh
- Month-end/quarter-end reporting

### 3. API Path (Sub-500ms)

**Flow**: External Consumer → API Gateway → Backend Systems → Response

**Process**:
```
1. External application calls REST API
   └─ 0 ms: Request sent

2. API Gateway receives request
   └─ +5 ms: Auth validation (OAuth, API key)

3. Rate limiting check
   └─ +10 ms: Quota validated

4. Route to backend system
   └─ +50 ms: Request routed

5. Backend system executes query
   └─ +200 ms: Query executed (in-memory cache often)

6. Format response (JSON)
   └─ +350 ms: Response formatted

7. Return to client
   └─ +400 ms: Response sent

Total latency: 400 ms p99 (SLA: <500 ms) ✓
```

**Characteristics**:
- Synchronous request-response
- Standard REST APIs
- Rate-limited (10K req/hour per consumer)
- OAuth 2.0 authentication

**Use Cases**:
- Mobile app data access
- Third-party integrations
- Dashboard refreshes
- Partner data access

## Non-Functional Requirements

### Performance

| Requirement | Target | Current | Status |
|---|---|---|---|
| **Real-time latency** | <5 sec | 3.2-4.8 sec (p99) | ✓ Exceeding |
| **Batch latency** | <5 hours | ~4 hours | ✓ Exceeding |
| **API latency** | <500 ms p99 | <150 ms p99 | ✓ Exceeding |
| **Data freshness** | Real-time | Continuous streaming | ✓ Continuous |
| **Query response** | <10 sec (p95) | <3 sec (p95) | ✓ Exceeding |

### Availability & Reliability

| Requirement | Target | Approach |
|---|---|---|
| **Availability** | 99.95% | Multi-AZ, 3-broker event bus, automated failover |
| **RPO (Recovery Point Objective)** | 0 hours (real-time) | Continuous replication, event bus durability |
| **RTO (Recovery Time Objective)** | 1 hour | Warm standby in secondary region |
| **Data Durability** | 99.999% | Multi-region replication, immutable data lake |
| **Backup & Recovery** | 7-year retention | Automated daily backups, compliance archive |

### Scalability

| Dimension | Current | Capacity | Growth |
|---|---|---|---|
| **Event throughput** | 500 events/sec | 5,000 events/sec (10x) | Add brokers |
| **Data volume** | 150 TB active | Unlimited (cloud object storage) | Automatic scaling |
| **Concurrent users** | 500 users | 10,000 users (20x) | Warehouse scaling |
| **Daily data load** | 10 TB | 100+ TB (10x) | Partition strategy |

### Security

| Area | Implementation | Standard |
|---|---|---|
| **Encryption at rest** | AES-256 (KMS) | NIST 800-175B |
| **Encryption in transit** | TLS 1.3 | NIST 800-52 |
| **Authentication** | OAuth 2.0, mTLS | RFC 6749 |
| **Access control** | IAM roles, API key scopes | Zero-trust model |
| **Audit logging** | CloudTrail, event bus audit | 2-year retention, immutable |
| **Data classification** | Public/Internal/Confidential/Secret | Org standard |

### Compliance

| Regulation | Implementation | Owner |
|---|---|---|
| **GDPR** | Data minimization, retention policy | Legal |
| **HIPAA** | Encryption, access logs (if applicable) | Compliance |
| **SOX** | Audit trails, change control | Audit |
| **ISO 27001** | Information security controls | Security |

## Deployment Architecture

### Regional Topology

```
┌────────────────────────────────────────────────────────┐
│                  Primary Region (A)                    │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Kubernetes Cluster                              │ │
│  │  ├─ ERP Connectors                              │ │
│  │  ├─ Stream Processing (Spark)                   │ │
│  │  ├─ Batch Orchestration (Airflow)               │ │
│  │  ├─ API Gateway                                 │ │
│  │  └─ Monitoring Agents                           │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Data Plane                                      │ │
│  │  ├─ Event Bus (Kafka 3-broker)                  │ │
│  │  ├─ Data Lake (S3/GCS/ADLS)                     │ │
│  │  ├─ Metadata Store (PostgreSQL)                 │ │
│  │  └─ Staging Warehouse                           │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│            Secondary Region (B) - Standby              │
│  • Warm standby Kafka cluster                         │
│  • Read replicas of data lake                         │
│  • Warm standby orchestration                         │
│  • Automated failover in 5-10 minutes                 │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│    Analytics Region (C) - Separate Cloud              │
│  • Cloud-native analytics warehouse (SaaS)            │
│  • Regional BI tools deployment                       │
│  • Cross-region replication from primary              │
└────────────────────────────────────────────────────────┘
```

### High Availability

**Event Bus Cluster** (3 brokers minimum):
```
Broker 1 (Leader)     Broker 2 (Replica)     Broker 3 (Replica)
├─ Partition 0        ├─ Partition 1         ├─ Partition 2
├─ Partition 3        ├─ Partition 4         ├─ Partition 5
└─ ...                └─ ...                 └─ ...

If Broker 1 fails → Broker 2 or 3 becomes leader (< 10 sec failover)
```

**Kubernetes Cluster** (Multi-AZ):
```
AZ-A: 2 nodes (Spark executors, API Gateway)
AZ-B: 2 nodes (Airflow, metadata services)
AZ-C: 2 nodes (Monitoring, utilities)

If AZ-A fails → Workloads drain to AZ-B, AZ-C (< 5 min)
```

**Data Replication** (Multi-region):
```
Primary Region (A): Active read-write
  ├─ Data Lake: Real-time write
  ├─ Event Bus: Active publishing
  └─ Warehouse: Active loading

Secondary Region (B): Read-only standby
  ├─ Data Lake: Cross-region replication (5-30 min lag)
  ├─ Event Bus: Replica cluster (standby mode)
  └─ Warehouse: Read-only replica

Failover: Switch DNS, enable writes in Region B (manual or automated)
```

## Cost Model (Annual)

```
Compute (Stream processing, Batch, APIs)        £2,200,000  (42%)
  • Kubernetes auto-scaling: £1.2M
  • Spark job resources: £0.8M
  • API Gateway: £0.2M

Storage (Data Lake, Backups, Staging)          £1,800,000  (35%)
  • Data Lake (150 TB active): £1.2M
  • Backups & archive (2.5 PB): £0.5M
  • Staging & temp: £0.1M

Data Transfer (Replication, APIs, Downloads)   £650,000    (13%)
  • Multi-region replication: £0.4M
  • API bandwidth: £0.15M
  • Direct Connect: £0.1M

Services & Operations                          £550,000    (10%)
  • Monitoring & logging: £0.2M
  • Load balancers: £0.15M
  • KMS & security: £0.1M
  • Staffing allocated: £0.1M

────────────────────────────────────────────────────────────
Total Annual Cost                               £5,200,000
```

### Cost Optimization Opportunities

| Opportunity | Savings | Implementation |
|---|---|---|
| **Reserved Instances (Compute)** | £200K/year (35% discount) | Reserve 1-3 year capacity |
| **Spot Instances (Batch)** | £50K/year | Non-critical workloads |
| **S3 Lifecycle (Archive)** | £100K/year | Move cold data to Glacier |
| **Reserved Capacity (Analytics)** | £75K/year | Pre-purchase warehouse capacity |
| **Data Transfer Optimization** | £50K/year | Compression, regional optimization |
| **Total Potential** | **£475K/year** | |

## Roadmap

### Q1 2026: Optimization
- [ ] Implement reserved instances (£200K savings)
- [ ] Data lake lifecycle policies (£100K savings)
- [ ] Query optimization (warehouse tuning)
- [ ] Monitoring dashboard improvements

### Q2 2026: Expansion
- [ ] Add 3rd real-time data source (budget £50K)
- [ ] Implement automated data quality framework
- [ ] Expand BI dashboards (budget £75K)
- [ ] Disaster recovery drill

### Q3 2026: Modernization
- [ ] Upgrade Kafka to latest version
- [ ] Implement AI/ML feature engineering layer
- [ ] Data mesh pattern adoption (budget £150K)
- [ ] Customer segment analytics expansion

### Q4 2026: Strategic
- [ ] Multi-cloud evaluation (AWS/Azure/GCP comparison)
- [ ] Edge computing for satellite locations
- [ ] Evaluation of serverless alternatives
- [ ] Vendor consolidation review

## Decision Records

- **[[ADR - Event Bus Selection]]** - Why Kafka-style event bus chosen
- **[[ADR - Analytics Warehouse Technology]]** - Why cloud data warehouse selected
- **[[ADR - Batch vs Real-time Dual Path]]** - Rationale for both approaches
- **[[ADR - Multi-region Disaster Recovery]]** - Geographic redundancy strategy

## Customization Guide

This HLD describes a generic data integration platform. To adapt for your organization:

### 1. Replace System Names
- "Sample ERP" → Your actual ERP (SAP, Oracle, NetSuite, Dynamics, etc.)
- "Sample Data Platform" → Your platform (Talend, Informatica, custom Spark, etc.)
- "Sample Analytics Warehouse" → Your warehouse (Snowflake, Redshift, BigQuery, etc.)

### 2. Adjust Technology Stack
- Choose event bus technology (Kafka, AWS Kinesis, Azure Event Hubs, Pub/Sub)
- Select stream processing engine (Spark, Flink, Kafka Streams, custom)
- Pick cloud provider (AWS, Azure, GCP, or hybrid)
- Choose orchestration (Airflow, Kubernetes CronJob, AWS Glue, etc.)

### 3. Update Capacity Numbers
- Current: 500 events/sec, 10 TB/day, 150 TB active
- Adjust based on YOUR transaction volumes
- Scale storage for YOUR data growth
- Size clusters for YOUR concurrency

### 4. Customize Latency Targets
- Real-time SLA: Adjust <5 sec based on business requirements
- Batch window: Adjust 4-hour based on reporting needs
- API response: Adjust <500ms based on user expectations

### 5. Adapt Security & Compliance
- Replace generic controls with YOUR requirements
- Add industry-specific standards (HIPAA, PCI-DSS, GDPR, SOX, etc.)
- Update retention policies for YOUR compliance needs

## Related Notes

- **Systems**: [[System - Sample ERP Application]], [[System - Sample Data Integration Platform]], [[System - Sample Analytics Warehouse]]
- **Integrations**: [[Integration - Sample ERP to Data Platform Real-time]], [[Integration - Sample Data Platform to Analytics Batch]]
- **Visualizations**: [[Canvas - Sample Data Flow Diagram]], [[Canvas - Sample C4 Context Diagram]]
- **Scenarios**: [[Scenario - Sample Real-time Analytics Expansion]]

---

**Tip**: This HLD is a template for generic data integration platforms. Customize it to match your organization's systems, technologies, and requirements!
