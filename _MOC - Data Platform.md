---
type: MOC
title: Data Platform MOC
created: 2026-01-07
modified: 2026-01-07
tags: [moc, data, analytics, data-engineering, data-platform]
---

# 📊 Data Platform MOC

> **Example domain-specific MOC for data engineering and analytics**

Last Updated: 2026-01-07

---

## Overview

This is an **example MOC** showing how to organize data platform knowledge. Customize for your data architecture, analytics tools, and data governance practices.

**Quick Links:**
- [[Dashboard - Main Dashboard]] - Main dashboard
- [[MOC - Technology & Architecture MOC]] - All tech standards
- [[MOC - Cloud Architecture]] - Infrastructure foundation
- [[MOC - ADRs MOC]] - Data-related decisions

---

## 📚 Data Platform Documentation

### Core Documentation

**Create these pages for your data platform:**
- [[Page - Data Architecture Overview]] - Platform components, data flow
- [[Page - Data Governance Framework]] - Policies, ownership, quality
- [[Page - Data Catalog]] - Available datasets and schemas
- [[Page - Data Quality Standards]] - Validation rules, SLAs
- [[Page - Analytics Self-Service Guide]] - How teams access data

### Reference Architecture

**Document your data platform:**
- Data ingestion layer (batch, streaming)
- Data storage layer (lake, warehouse, mart)
- Data processing (ETL/ELT pipelines)
- Analytics and visualization
- Data governance and security
- Metadata management

---

## 🎯 Data ADRs

### All Data-Related Decisions

```dataview
TABLE WITHOUT ID
  file.link as "ADR",
  status as "Status",
  category as "Category",
  modified as "Updated"
FROM ""
WHERE type = "Adr"
  AND (contains(tags, "data") OR contains(tags, "database") OR contains(tags, "analytics"))
SORT status ASC, modified DESC
```

### Database Decisions

```dataview
TABLE WITHOUT ID
  file.link as "ADR",
  status as "Status",
  modified as "Updated"
FROM ""
WHERE type = "Adr"
  AND (contains(tags, "database") OR contains(tags, "postgresql") OR contains(tags, "mongodb"))
SORT status ASC, modified DESC
```

### Key Data Decisions

**Document major decisions like:**
- [[ADR - Standardize on PostgreSQL]]
- Data lake vs data warehouse strategy
- Batch vs streaming architecture
- Data modeling approach (Kimball, Inmon, Data Vault)
- Master Data Management strategy
- Analytics tool selection

---

## 🗄️ Data Assets Inventory

### Databases in Use

**Production Databases:**
- **PostgreSQL** - Transactional workloads, operational data
- **MongoDB** - Document storage, flexible schemas
- **Redis** - Caching, session storage
- **DynamoDB** - NoSQL, serverless applications

**Analytics Databases:**
- **Redshift / Snowflake / BigQuery** - Data warehouse
- **ClickHouse / Druid** - Real-time analytics
- **Elasticsearch** - Search and log analytics

### Data Storage

**Storage Layers:**
- **Data Lake** (S3, ADLS, GCS) - Raw data, all formats
- **Data Warehouse** - Structured, curated data
- **Data Marts** - Department-specific views
- **Operational Data Store** - Near real-time access

### Data Pipelines

**Pipeline Inventory:**
```dataview
TABLE WITHOUT ID
  file.link as "Pipeline",
  status as "Status",
  frequency as "Frequency",
  owner as "Owner"
FROM ""
WHERE type = "Page"
  AND (contains(tags, "pipeline") OR contains(tags, "etl"))
SORT status ASC
```

**Create Page notes for each major pipeline:**
- `Page - Customer Data Pipeline.md`
- `Page - Financial Reporting ETL.md`
- `Page - Real-time Events Pipeline.md`

---

## 🎯 Data Projects

### Data Platform Projects

```dataview
TABLE WITHOUT ID
  file.link as "Project",
  status as "Status",
  priority as "Priority",
  timeFrame as "Timeline"
FROM ""
WHERE type = "Project"
  AND (contains(tags, "data") OR contains(tags, "analytics") OR contains(category, "Data"))
SORT status ASC, priority ASC
```

### Active Data Initiatives

```dataview
TABLE WITHOUT ID
  file.link as "Project",
  priority as "Priority",
  timeFrame as "Timeline"
FROM ""
WHERE type = "Project"
  AND status = "active"
  AND (contains(title, "Data") OR contains(title, "Analytics"))
SORT priority ASC
```

---

## 🔄 Data Integration

### Integration Patterns

**Document integration approaches:**
- **Batch ETL**: Scheduled data loads (nightly, hourly)
- **Streaming**: Real-time data ingestion (Kafka, Kinesis)
- **Change Data Capture (CDC)**: Database replication
- **API Integration**: REST/GraphQL data sources
- **File-based**: CSV, JSON, Parquet file drops

### Integration Tools

**ETL/ELT Platforms:**
- Apache Airflow - Workflow orchestration
- dbt (data build tool) - Analytics engineering
- Fivetran / Stitch - Managed connectors
- Apache Kafka - Event streaming
- AWS Glue / Azure Data Factory - Cloud-native ETL

### Data Sources

**Document source systems:**
- Operational databases (OLTP systems)
- SaaS applications (Salesforce, HubSpot, etc.)
- External APIs and data feeds
- File uploads and manual imports
- IoT and sensor data

---

## 📊 Analytics & BI

### Analytics Tools

**Visualization & BI:**
- Tableau / Power BI / Looker - Self-service BI
- Jupyter Notebooks - Data science analysis
- Superset / Metabase - Open-source BI
- Custom dashboards - Application-embedded analytics

### Data Products

**Track analytics deliverables:**
- Executive dashboards
- Operational reports
- Self-service datasets
- ML models and predictions
- Data APIs for applications

**Create Page notes:**
- `Page - Sales Dashboard Documentation.md`
- `Page - Customer Segmentation Model.md`

---

## 🏗️ Data Modeling

### Modeling Approaches

**Document your strategy:**
- **Dimensional Modeling** (Kimball) - Star/snowflake schemas
- **Normalized Modeling** (Inmon) - 3NF enterprise data warehouse
- **Data Vault** - Scalable, audit-friendly modeling
- **One Big Table (OBT)** - Denormalized for analytics

### Schema Design

**Key schemas:**
- Customer domain
- Product domain
- Financial domain
- Operational domain

**Create:**
- [[Page - Data Model - Customer Domain]]
- [[Page - Data Model - Product Catalog]]
- ER diagrams in +Attachments

---

## 🔐 Data Governance

### Data Ownership

**Document data ownership:**
- Data stewards by domain
- Data owners (business stakeholders)
- Technical custodians
- Approval workflows

**Create:**
- [[Page - Data Ownership Matrix]]
- [[Page - Data Governance Roles]]

### Data Quality

**Quality framework:**
- Data quality dimensions (accuracy, completeness, timeliness)
- Validation rules and constraints
- Data quality monitoring
- Issue resolution process

**Metrics to track:**
- Schema compliance rate
- Null value percentage
- Duplicate record count
- Data freshness SLA adherence

### Data Security & Privacy

**Security controls:**
- Data classification (public, internal, confidential, restricted)
- Access control (RBAC, ABAC)
- Encryption at rest and in transit
- PII/sensitive data handling
- Data retention policies
- Audit logging

**Compliance:**
- GDPR compliance (right to erasure, data portability)
- Data residency requirements
- Industry-specific regulations

**Create:**
- [[Page - Data Security Standards]]
- [[Page - PII Handling Guide]]
- [[Page - Data Retention Policy]]

---

## 📈 Data Quality Monitoring

### Data Quality Checks

**Automated validations:**
- Schema validation
- Referential integrity
- Range checks and constraints
- Duplicate detection
- Completeness checks
- Timeliness SLAs

### Data Quality Issues

**Track issues:**
```dataview
TABLE WITHOUT ID
  file.link as "Issue",
  priority as "Priority",
  status as "Status",
  owner as "Owner"
FROM ""
WHERE type = "Task"
  AND contains(tags, "data-quality")
  AND !completed
SORT priority ASC
```

**Create Task notes for data quality issues.**

---

## 🚀 Data Engineering Best Practices

### Pipeline Design Principles

**Best practices:**
- Idempotency - Reruns produce same result
- Incremental processing - Process only new/changed data
- Error handling - Graceful failures, alerting
- Monitoring - Track pipeline health, data quality
- Documentation - Pipeline purpose, dependencies, SLAs

### Code Standards

**Engineering standards:**
- Version control for all code (Git)
- Code review process
- Testing (unit tests, integration tests)
- CI/CD for data pipelines
- Infrastructure as Code

### Performance Optimization

**Optimization strategies:**
- Partitioning strategies
- Indexing for query performance
- Materialized views
- Caching frequently accessed data
- Query optimization
- Resource sizing

---

## 📊 Analytics Self-Service

### Data Catalog

**Maintain a data catalog:**
- Available datasets
- Schema documentation
- Data dictionary
- Usage examples
- Update frequency
- Data owner/contact

**Tool options:**
- Amundsen, DataHub, Alation
- Cloud-native (AWS Glue Catalog, Azure Purview)
- Custom documentation

### User Enablement

**Self-service support:**
- Data onboarding guides
- SQL query templates
- BI tool training
- Office hours for data questions
- Slack/Teams channel for support

**Create:**
- [[Page - SQL Query Examples]]
- [[Page - Data Access Request Process]]

---

## 💰 Data Platform Costs

### Cost Management

**Track spending by:**
- Storage costs (data lake, warehouse)
- Compute costs (query processing, ETL)
- Data transfer costs
- Tool licensing

**Optimization strategies:**
- Compression and file formats (Parquet, ORC)
- Lifecycle policies (archive old data)
- Right-sizing compute resources
- Query optimization
- Data retention enforcement

---

## 🔬 Data Science & ML

### ML Infrastructure

**If you have ML/AI capabilities:**
- Feature stores
- Model training infrastructure
- Model serving/deployment
- ML experiment tracking
- Model monitoring

### ML Projects

```dataview
TABLE WITHOUT ID
  file.link as "Project",
  status as "Status",
  priority as "Priority"
FROM ""
WHERE type = "Project"
  AND (contains(tags, "machine-learning") OR contains(tags, "ai"))
SORT status ASC, priority ASC
```

---

## 📚 Learning Resources

### Data Engineering Skills

**Recommended learning:**
- SQL fundamentals and advanced queries
- Data modeling techniques
- ETL/ELT design patterns
- Cloud data platforms (AWS, Azure, GCP)
- Workflow orchestration (Airflow)
- Streaming platforms (Kafka, Kinesis)

### Certifications

**Data platform certifications:**
- AWS Certified Data Analytics Specialty
- Azure Data Engineer Associate
- GCP Professional Data Engineer
- Databricks Certified Data Engineer
- dbt Analytics Engineering Certification

### External Resources

**Weblinks to save:**
- Data engineering blogs
- Data modeling guides
- Tool documentation
- Best practices articles

---

## 🏷️ Data Patterns & Anti-Patterns

### Recommended Patterns

**Best practices:**
- **Staging Layer** - Land raw data before transformation
- **Slowly Changing Dimensions** - Track historical changes
- **Type 2 SCD** - Preserve full history with timestamps
- **Fact Tables** - Transaction-level detail
- **Conformed Dimensions** - Shared dimension across marts
- **Audit Columns** - Created/modified timestamps

### Anti-Patterns to Avoid

**Common mistakes:**
- No data governance (chaos)
- Direct querying of OLTP systems (performance impact)
- Over-normalized analytics schemas (poor query performance)
- No documentation (tribal knowledge)
- Manual ETL processes (error-prone, not scalable)
- Ignoring data quality (garbage in, garbage out)

---

## 📋 Data Platform Checklists

### New Dataset Onboarding

**When adding new data source:**
- [ ] Document source system and owner
- [ ] Define data refresh schedule
- [ ] Create ingestion pipeline
- [ ] Implement data quality checks
- [ ] Document schema and data dictionary
- [ ] Set up monitoring and alerting
- [ ] Create data access permissions
- [ ] Update data catalog
- [ ] Train users on new dataset

### Monthly Data Platform Review

**Operational review:**
- [ ] Review pipeline failures and trends
- [ ] Check data quality metrics
- [ ] Review storage growth and costs
- [ ] Update data documentation
- [ ] Review access requests and permissions
- [ ] Check SLA adherence
- [ ] Archive or delete unused datasets
- [ ] Update data catalog

---

## 🔗 Integration Points

### How to Use This MOC

**Link from:**
- Project notes for data platform projects
- ADRs for data architecture decisions
- Meeting notes when discussing data topics
- Task notes for data engineering work

**Link to:**
- Data pipeline documentation
- Schema documentation
- Data quality reports
- Analytics dashboard documentation

**Cross-reference:**
- [[MOC - Technology & Architecture MOC]] - Overall tech standards
- [[MOC - Cloud Architecture]] - Infrastructure layer
- [[MOC - Projects MOC]] - Data projects
- [[MOC - ADRs MOC]] - Data decisions

---

## Related

**Navigation:**
- [[Dashboard - Main Dashboard]] - Main dashboard
- [[MOC - Technology & Architecture MOC]] - Tech standards hub
- [[MOC - Cloud Architecture]] - Cloud infrastructure

**Key Pages to Create:**
- [[Page - Data Architecture Overview]]
- [[Page - Data Governance Framework]]
- [[Page - Data Catalog]]
- [[Page - Data Quality Standards]]
- [[Page - Analytics Self-Service Guide]]
- [[Page - Data Security Standards]]

**Database ADRs:**
- [[ADR - Standardize on PostgreSQL]]
- Create ADRs for data warehouse selection, ETL tool choice, etc.

**Next Steps:**
1. Customize this MOC for your data platform
2. Create core documentation pages listed above
3. Link relevant ADRs about data decisions
4. Document your data pipelines and schemas
5. Add data-specific projects
6. Establish data governance processes
7. Create data catalog and documentation

**Tips:**
- Keep this MOC updated as data platform evolves
- Link data ADRs to projects that implement them
- Document data quality issues and resolutions
- Use this as onboarding material for data engineers
- Reference in data architecture reviews
- Maintain data catalog with schema changes
