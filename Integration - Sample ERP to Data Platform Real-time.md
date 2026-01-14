---
type: Integration
title: "Sample ERP to Data Platform Real-time"
integrationId: int-erp-dip-rt
integrationPattern: event-streaming
source: "[[System - Sample ERP Application]]"
target: "[[System - Sample Data Integration Platform]]"
criticality: critical
description: "Real-time event streaming from ERP to Data Platform using event bus for operational analytics"
dataClassification: internal
created: 2026-01-14
modified: 2026-01-14
tags: [Integration, activity/integration, technology/kafka, domain/data, domain/enterprise]

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14

# Related Items
relatedSystems: ["[[System - Sample ERP Application]]", "[[System - Sample Data Integration Platform]]"]
relatedIntegrations: []
relatedArchitecture: ["[[Architecture - Sample Data Integration Platform HLD]]"]
---

# Sample ERP to Data Platform Real-time Integration

## Overview

Real-time event streaming integration publishing ERP transactions, master data changes, and business events to a centralized event bus for downstream consumption by the Data Integration Platform.

**Key Characteristics:**
- **Pattern**: Event-driven architecture (event streaming)
- **Latency**: <5 seconds end-to-end (ERP → Event Bus → Platform)
- **Throughput**: 1,000+ events/second peak
- **Data Volume**: 500 TB/year
- **Availability**: 99.95% SLA
- **Technology**: Event Bus (Kafka-like), CloudEvents standard format

## Architecture

```
┌─────────────────────────────┐
│   Sample ERP Application    │
│  • Transaction Data         │
│  • Master Data Changes      │
│  • GL Postings              │
└──────────────┬──────────────┘
               │ Capture Events
               ▼
┌─────────────────────────────┐
│  Event Capture (Outbound)   │
│  • Transaction Log Miner    │
│  • Change Data Capture      │
│  • Webhook Publishers       │
└──────────────┬──────────────┘
               │ Events
               ▼
┌─────────────────────────────┐
│     Event Bus (Kafka)       │
│  • Topic: Orders            │
│  • Topic: Invoices          │
│  • Topic: GL Posts          │
│  • Topic: Master Data       │
│  • 10+ other topics         │
└──────────────┬──────────────┘
               │ Subscribe
               ▼
┌─────────────────────────────┐
│  Data Integration Platform  │
│  • Stream Processing        │
│  • Validation & Enrichment  │
│  • Data Lake Ingestion      │
└─────────────────────────────┘
```

## Data Flows

### Event Types Published

| Event | Volume | Frequency | Example |
|-------|--------|-----------|---------|
| **Orders** | 25,000/day | Every 2-10 sec | Purchase order created, amended, cancelled |
| **Invoices** | 50,000/day | Every 3-15 sec | Invoice posted, payment received |
| **GL Postings** | 100,000/day | Real-time | Accounting entries created |
| **Master Data** | 180/day | Daily changes | Customer, vendor, product updates |
| **Inventory** | 75,000/day | Real-time | Stock movements, warehouse updates |

**Total Peak Throughput**: 1,000-1,500 events/second

### Topic Structure

```yaml
Topics:
  orders:
    partitions: 10
    replication-factor: 3
    retention: 30 days
    events/day: 25,000
    event-size: 2-5 KB

  invoices:
    partitions: 10
    replication-factor: 3
    retention: 90 days
    events/day: 50,000
    event-size: 1-3 KB

  gl_posts:
    partitions: 15
    replication-factor: 3
    retention: 7 years (compliance)
    events/day: 100,000
    event-size: 500 B - 1 KB

  master_data:
    partitions: 5
    replication-factor: 3
    retention: forever
    events/day: 180
    event-size: 5-50 KB
```

## Event Format (CloudEvents Standard)

```json
{
  "specversion": "1.0",
  "type": "com.example.erp.order.created",
  "source": "erp://orders/system",
  "subject": "orders/123456",
  "id": "order-123456-001",
  "time": "2026-01-14T14:32:15Z",
  "datacontenttype": "application/json",
  "dataschema": "https://schema.example.com/order.json",
  "data": {
    "orderId": "123456",
    "customerId": "CUST-789",
    "orderDate": "2026-01-14",
    "amount": 125000.50,
    "currency": "GBP",
    "items": [
      {
        "productCode": "PROD-001",
        "quantity": 50,
        "unitPrice": 2500.01
      }
    ]
  }
}
```

## Performance Metrics

### Latency

| Stage | Latency | Description |
|-------|---------|-------------|
| Event Generated | 0 ms | ERP transaction committed |
| Captured | +100 ms | CDC or log miner extracts event |
| Published to Event Bus | +200 ms | Event reaches Kafka (broker 1) |
| Replicated | +500 ms | Replicated to 3 brokers |
| Available for Consumer | 800 ms | Total: ERP → Available |
| Processed by Platform | +3,000 ms | Stream processor validates & enriches |
| Written to Data Lake | 3,800 ms | Total: ERP → Data Lake |
| Available in Analytics | +1,200 ms | Total: ERP → Analytics (5 seconds) |
| **Total End-to-End** | **<5 seconds** | From transaction to analytics |

### Throughput

| Metric | Value | Notes |
|--------|-------|-------|
| Peak Events/Second | 1,500 | 100K GL posts/day ÷ 3600 × peak factor |
| Average Events/Second | 250 | (250,000 events/day ÷ 86,400) |
| Average Bandwidth | 250 MB/min | 250 ev/s × 1.5 KB avg |
| Peak Bandwidth | 2 GB/min | 1,500 ev/s × 1.5 KB avg |
| Daily Data Volume | 500 GB | All topics combined, before replication |

### Availability

| SLA | Target | Current |
|-----|--------|---------|
| **Event Bus Availability** | 99.95% | 99.97% |
| **Message Durability** | 99.999% | 99.999% |
| **End-to-End Latency** | <5 sec | 3.2-4.8 sec (p99) |
| **Event Delivery** | At-least-once | Exactly-once for critical topics |

## Security & Data Quality

### Authentication & Authorization
- **ERP → Event Bus**: Mutual TLS (mTLS), service account with topic permissions
- **Event Bus → Consumers**: OAuth 2.0 token validation, consumer group ACLs
- **Encryption in Transit**: TLS 1.3 on all connections
- **Encryption at Rest**: Event bus brokers use AES-256 encryption

### Data Quality Checks

**On Publication (ERP Side)**:
- ✓ Schema validation (matches CloudEvents standard)
- ✓ Mandatory field check (orderId, amount, etc.)
- ✓ Data type validation (amounts numeric, dates ISO-8601)
- ✓ Business logic validation (amount > 0, dates not in future)
- ✓ Deduplication check (event ID already published?)

**On Consumption (Platform Side)**:
- ✓ Message format validation
- ✓ Schema evolution handling
- ✓ Duplicate detection (event ID + timestamp)
- ✓ Null/empty field checks
- ✓ Range validation (invoice amounts > 0)
- ✓ Referential integrity (customer ID exists)
- ✓ Data completeness (all required fields present)
- ✓ Anomaly detection (amount >10x average?)

**Quality Metrics**:
- Pass rate: 99.87% (99.13% automatic, 0.74% manual remediation)
- Remediation SLA: 2 hours
- Alert threshold: <99% pass rate

## Failure Scenarios & Recovery

### Scenario 1: Event Bus Broker Failure
**Impact**: No impact (3-broker cluster, 2 survive)
**Detection**: Automatic failover
**Recovery**: <1 second
**RTO/RPO**: Zero data loss

### Scenario 2: ERP Event Capture Fails
**Impact**: Events not published, platform data becomes stale
**Detection**: Consumer lag alert >5 min
**Recovery**: Replay from ERP change log (last 7 days) or snapshot restore
**RTO/RPO**: 5-30 minutes
**Mitigation**: Multi-topic redundancy, hot standby capture instance

### Scenario 3: Network Partition (ERP ↔ Event Bus)
**Impact**: Events queue locally on ERP, then replay
**Detection**: Network latency alert
**Recovery**: Automatic retry with exponential backoff
**Buffer Capacity**: 100K events × 3 KB = 300 MB local queue
**RTO/RPO**: Automatic within 5-10 minutes after connectivity restored

### Scenario 4: Downstream Consumer (Platform) Fails
**Impact**: None to ERP or event bus (events remain in topics)
**Detection**: Consumer lag alert (offset hasn't advanced)
**Recovery**: Platform repairs and resumes consumption from saved offset
**RTO/RPO**: Data loss only if topics pruned before recovery (90+ day retention prevents this)

## Monitoring & Alerting

### Key Metrics

```yaml
Dashboards:
  - Event Bus Health
    • Broker availability per node
    • Topic lag by consumer
    • Messages produced/consumed
    • Error rate by topic
    • P50/P95/P99 latencies

  - Integration Health
    • ERP capture latency
    • Event publication success rate
    • Consumer processing time
    • End-to-end latency (ERP → Analytics)
    • Data quality pass rate

Alerts (Severity):
  - CRITICAL: Event bus down (0 brokers healthy)
  - HIGH: Consumer lag >30 min
  - HIGH: Event publication failure rate >1%
  - MEDIUM: End-to-end latency >10 sec (SLA: <5 sec)
  - MEDIUM: Data quality pass rate <99%
  - LOW: Network latency >100 ms
```

## Operational Procedures

### Publishing New Event Type

1. **Define schema** (JSON Schema or Protocol Buffers)
2. **Create topic** with appropriate partitions & retention
3. **Update ERP capture logic** to publish events
4. **Register schema** in schema registry
5. **Deploy to Dev/Test** with consumer
6. **Validate end-to-end latency** <5 seconds
7. **Load test** for peak volume
8. **Publish to Production**
9. **Monitor for 7 days** before full traffic

### Replay Events from Event Bus

```bash
# Replay last 24 hours
kafka-consumer-groups.sh --group platform-consumer \
  --reset-offsets --to-timestamp $(($(date +%s) - 86400)) * 1000 \
  --execute

# Verify consumer is replaying
kafka-consumer-groups.sh --group platform-consumer --describe
```

### Troubleshoot Consumer Lag

```bash
# Check current lag
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group platform-consumer --describe

# If lag high, check consumer logs
tail -f /var/log/platform/consumer.log | grep ERROR

# Scale consumer instances if needed
kubectl scale statefulset platform-consumer --replicas=5
```

## Customization Guide

Replace these with your actual systems:

**ERP System**:
- Change "Sample ERP" → Your ERP system name (SAP S/4HANA, Oracle, NetSuite, etc.)
- Adjust event types to match your business processes (orders, invoices, etc.)
- Update volume estimates from your actual transaction logs
- Modify retention periods based on compliance requirements

**Event Bus**:
- Change "Kafka-like" → Your actual technology (Apache Kafka, AWS MSK, Azure Event Hubs, AWS Kinesis, etc.)
- Adjust partition counts based on throughput (rule of thumb: 1 partition per 100 events/sec)
- Update replication factor for your availability requirements

**Data Integration Platform**:
- Change "Sample Data Integration Platform" → Your actual platform name
- Adjust stream processing technology (Apache Spark, Flink, Kafka Streams, etc.)
- Customize topic list to match your event types

**Monitoring**:
- Use your actual monitoring tool (Prometheus, CloudWatch, Datadog, etc.)
- Adjust SLA targets to match your business requirements

## Related Notes

- **Source System**: [[System - Sample ERP Application]]
- **Target System**: [[System - Sample Data Integration Platform]]
- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
- **Batch Integration**: [[Integration - Sample Data Platform to Analytics Batch]]
- **Data Flow Canvas**: [[Canvas - Sample Data Flow Diagram]]

---

**Tip**: This template shows a real-time event streaming integration. Update the event types, volumes, and technologies to match your organisation's actual systems and data flows!
