---
type: DataSource
title: "{{dataSourceName}}"

# DataSource Identity
sourceId: "{{sourceId}}"
sourceSystem: null  # "[[System - SAP S/4HANA]]"
owner: null  # "[[Person Name]]"
businessOwner: null  # Business stakeholder responsible

# Data Type & Structure
dataType: database-table | database-view | api-endpoint | message-topic | data-warehouse-table | data-lake | file-share | cache | null
sourceDatabase: null  # PostgreSQL, Oracle, Snowflake, etc.
sourceSchema: null  # Schema name in database
sourceTableName: null  # Table/view name

# Data Volume & Performance
recordCount: null  # Number of rows
rowsPerSecond: null  # Insertion rate
volumePerDay: null  # "2.5GB" daily data volume
volumePerMonth: null  # Monthly data volume
retentionDays: null  # How long data is kept
archivalSchedule: null  # When old data is archived

# Data Refresh & Latency
refreshFrequency: real-time | near-real-time | hourly | daily | weekly | on-demand | null
refreshMethod: null  # Direct API, database replication, file import, etc.
latency: null  # "< 5 minutes" - Maximum acceptable lag
lastRefreshTime: null  # Last time data was updated

# Data Quality Metrics
completeness: null  # 98.5% - Percentage of non-null values
uniqueness: null  # 99.9% - Percentage of unique keys
accuracy: high | medium | low | null  # Business-verified accuracy
timeliness: null  # "< 5 minutes" - Max acceptable latency
lastValidationDate: null  # YYYY-MM-DD

# Schema & Structure
schemaReference: null  # "[[DataSource Schema - SAP Invoices]]" - link to detailed schema
keyFields: []  # [invoice_id, company_code, vendor_id]
parentEntities: []  # [invoice, vendor, company]
childEntities: []  # [line_items, payments]
relationshipFields: []  # FKs to other tables

# Access & Integration
accessPatterns: []  # Detailed list of how data is accessed:
  # [{consumer: "System", protocol: "REST API", frequency: "real-time"}]
exposedVia: [rest-api, graphql, kafka-topic, odata, database-view, batch-export, sftp]
consumerCount: null  # Number of systems consuming this data
criticalConsumers: []  # Systems that cannot function without this data

# Access Control & Security
classification: public | internal | confidential | secret | null
piiFields: []  # [vendor_name, contact_email, address]
sensitiveData: false | true | null
accessControl: public | password-protected | api-key-required | ip-restricted | null
encryptionAtRest: false | true | null
encryptionInTransit: false | true | null
auditLogging: false | true | null

# Data Governance & Compliance
dpiaRequired: false | true | null
gdprCompliant: false | true | null
retentionPolicy: null  # "7 years for audit, 1 year for transactional"
purgeSchedule: null  # "Quarterly purge of data > 1 year"
complianceFrameworks: []  # [gdpr, sox, pci-dss, hipaa]
dataOwner: null  # Team responsible for data quality
steward: null  # Person responsible for governance

# Relationships & Usage
usedBy: []  # Systems/processes consuming this data
providedBy: []  # Systems/processes producing this data
relatedDataSources: []  # Related tables/datasets
transformedInto: []  # Where this data flows to

# Quality Indicators
confidence: high | medium | low | null
freshness: current | recent | stale | null
verified: false | true | null
reviewed: null  # YYYY-MM-DD

# Metadata
created: null  # YYYY-MM-DD
modified: null  # YYYY-MM-DD
tags: [type/data-source]
---

# {{dataSourceName}}

## Overview

**System**: [[System - {{sourceSystem}}]]

**Purpose**: Brief description of what data this source contains and its business purpose.

**Key Characteristics**:
- ~{{recordCount}} records
- {{volumePerDay}} per day
- {{refreshFrequency}} refresh frequency
- {{classification}} data classification

## Source Details

| Property | Value |
|----------|-------|
| **Source ID** | `{{sourceId}}` |
| **Source System** | [[System - {{sourceSystem}}]] |
| **Database** | {{sourceDatabase}} |
| **Schema** | `{{sourceSchema}}` |
| **Table/View** | `{{sourceTableName}}` |
| **Data Type** | {{dataType}} |

## Data Volume & Performance

### Size & Growth

| Metric | Value | Notes |
|--------|-------|-------|
| **Total Records** | {{recordCount}} | As of last count |
| **Growth Rate** | ~5% monthly | Business growth-driven |
| **Daily Volume** | {{volumePerDay}} | Average daily data ingestion |
| **Monthly Volume** | {{volumePerMonth}} | Peak month volume |
| **Retention Period** | {{retentionDays}} days | After which archived |

### Data Refresh

| Property | Value |
|----------|-------|
| **Refresh Frequency** | {{refreshFrequency}} |
| **Refresh Method** | {{refreshMethod}} |
| **Max Acceptable Latency** | {{latency}} |
| **Last Refresh Time** | {{lastRefreshTime}} |

## Data Schema

**Schema Definition**: [[DataSource Schema - {{dataSourceName}}]]

### Key Entities

**Master Entities**:
- {{keyFields[0]}} - Primary identifier
- {{keyFields[1]}} - Secondary identifier
- {{keyFields[2]}} - Tertiary identifier

### Sample Data

```sql
-- Example records from {{sourceTableName}}
SELECT * FROM {{sourceSchema}}.{{sourceTableName}}
LIMIT 5;

| {{keyFields[0]}} | {{keyFields[1]}} | {{keyFields[2]}} | created_at |
|---|---|---|---|
| INV-001 | V123 | 2026-01-14 | 2026-01-14 10:30:00 |
| INV-002 | V456 | 2026-01-14 | 2026-01-14 10:31:00 |
```

### Field Mapping

| Field Name | Data Type | Length | Nullable | Description |
|-----------|-----------|--------|----------|-------------|
| `invoice_id` | VARCHAR | 20 | NO | Invoice unique identifier |
| `vendor_id` | VARCHAR | 10 | NO | Vendor master reference |
| `amount` | DECIMAL | 15,2 | NO | Invoice amount in GBP |
| `invoice_date` | DATE | - | NO | Transaction date |
| `created_at` | TIMESTAMP | - | YES | Record creation timestamp |

## Data Quality

### Quality Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Completeness** | {{completeness}}% | 99.5% | ✓ On target |
| **Uniqueness** | {{uniqueness}}% | 99.9% | ✓ On target |
| **Timeliness** | {{timeliness}} | < 5 minutes | ✓ On target |
| **Accuracy** | {{accuracy}} | High | ⚠ Needs verification |

**Last Quality Assessment**: {{lastValidationDate}}

### Known Data Quality Issues

| Issue | Impact | Root Cause | Remediation |
|-------|--------|-----------|------------|
| **Duplicate invoices** | Low (< 0.1%) | SAP data entry | Deduplication logic in ETL |
| **Missing vendor ID** | Medium (2-3%) | Optional field in UI | Validation in system |
| **Date format inconsistency** | Low (< 0.1%) | Legacy system integration | Parse and normalize dates |

## Access & Integration

### How This Data Is Used

```dataview
TABLE consumer, protocol, frequency, criticality
FROM ""
WHERE type = "Integration" AND contains(sourceDataSource, this.file.name)
```

### Key Consumers

| Consumer System | Pattern | Frequency | Criticality | Purpose |
|-----------------|---------|-----------|------------|---------|
| [[System - DataPlatform]] | REST API | Real-time | Critical | Data warehouse loading |
| [[System - Analytics]] | Batch export | Daily | High | BI reporting |
| [[System - Snowflake]] | S3 + Spark | Hourly | Medium | Data lake ingestion |

### Exposure Methods

**REST API**:
```bash
GET /api/v1/{{sourceTableName}}
Authorization: Bearer {{apiToken}}
Query Parameters:
  - limit: 100 (max records per request)
  - offset: 0 (pagination)
  - filter: Optional filter expression
Response: JSON array of records
Latency: < 500ms (p99)
```

**Batch Export**:
```bash
# Daily export to S3
s3://company-data-lake/{{sourceSystem}}/{{sourceSchema}}/{{sourceTableName}}/2026-01-14.parquet
Format: Apache Parquet
Compression: Snappy
Partitioning: By date
```

**Direct Database Access** (Readonly):
```
Host: {{sourceDatabase}}.company.internal
Port: 5432
Database: {{sourceDatabase}}
Schema: {{sourceSchema}}
User: {{sourceTableName}}_reader (readonly role)
```

## Security & Governance

### Data Classification

| Aspect | Value |
|--------|-------|
| **Classification** | {{classification}} (Public / Internal / Confidential / Secret) |
| **Contains PII** | Yes / No |
| **PII Fields** | {{piiFields}} |
| **GDPR Applicable** | Yes / No |
| **GDPR Data Subject Rights** | Access, erasure, portability |

### Access Control

**Authentication**: API key (for service accounts), OAuth2 (for user apps)

**Authorization**: Role-based access control (RBAC)
- `{{sourceTableName}}_reader` - Read access (default)
- `{{sourceTableName}}_writer` - Write access (restricted)
- `{{sourceTableName}}_admin` - Full access (DB admins only)

**Network Access**: IP whitelist + VPN for on-prem access

### Encryption & Protection

| Protection | Enabled | Details |
|-----------|---------|---------|
| **Encryption at Rest** | {{encryptionAtRest}} | AES-256 (if Yes) |
| **Encryption in Transit** | {{encryptionInTransit}} | TLS 1.3 (if Yes) |
| **Audit Logging** | {{auditLogging}} | SQL audit trail (if Yes) |
| **Masking/Tokenization** | No | Consider for PII fields |

### Compliance

**Applicable Frameworks**:
- {{complianceFrameworks}}

**DPIA Status**: [[Form Submission - DPIA for {{dataSourceName}}]]

**Data Retention Policy**: {{retentionPolicy}}

## Data Lifecycle

### Retention & Archival

| Period | Action | Location |
|--------|--------|----------|
| **0-30 days** | Hot - Real-time access | Production database |
| **30-90 days** | Warm - Accessed but archived | S3 standard |
| **90-365 days** | Cold - Infrequent access | S3 glacier |
| **1-7 years** | Compliance hold | S3 glacier deep archive |
| **7+ years** | Purge (unless audit requirement) | Deleted |

**Archival Frequency**: {{purgeSchedule}}

### Refresh & Maintenance

**Regular Maintenance**:
- Daily: Data quality checks, refresh completeness verification
- Weekly: Backup verification, access log review
- Monthly: Performance analysis, growth projection

**Update Frequency**: {{refreshFrequency}}

**Update Method**: {{refreshMethod}}

## Monitoring & Alerting

### Health Checks

| Check | Frequency | Alert Threshold |
|-------|-----------|-----------------|
| **Data Currency** | Every hour | > 6 hours stale |
| **Record Count** | Daily | Variance > 10% |
| **Size Growth** | Daily | Growth > 20% month-over-month |
| **Access Failures** | Continuous | Any failure |

### Metrics Dashboard

**Monitoring Tool**: Datadog / Splunk

**Key Visualizations**:
- Data freshness timeline
- Record count trends
- Access patterns
- Query performance
- Alert history

## Related Architecture & Decisions

| Document | Type | Link |
|----------|------|------|
| [[DataSource Schema - {{dataSourceName}}]] | Schema Definition | Detailed field specifications |
| [[Integration - System to {{targetSystem}}]] | Integration | How this data is consumed |
| [[ADR - {{sourceSystem}} Data Product]] | Data Architecture | Data modeling decisions |

## Recent Changes

| Date | Change | Impact | Owner |
|------|--------|--------|-------|
| 2026-01-10 | Added new vendor_type field | Low | SAP Team |
| 2025-12-20 | Database upgraded | None | DYourOrg Team |
| 2025-12-01 | Retention policy extended to 7 years | Positive | Compliance |

## Quick Reference

**Data Owner**: {{owner}}

**Business Steward**: {{businessOwner}}

**Support Contact**: {{supportTeam}}

---

**Last Updated**: {{modified}}

**Last Quality Assessment**: {{lastValidationDate}}

**Next Review**: 2026-02-14
