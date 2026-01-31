---
type: Adr
title: Standardize on PostgreSQL
description: Adopt PostgreSQL as the standard relational database for all new applications
status: accepted
category: technology
tags: [ADR, activity/architecture, technology/postgresql, technology/database, domain/data]
created: 2025-08-01
modified: 2025-09-15

# Decision Makers
deciders: [Data Architecture Team, "[[Jane Smith]]"]
approvers:
  - Head of Architecture
  - Database Administrator Lead
  - Security Architect
  - Platform Engineering Lead

# Relationships
relatedTo: ["[[ADR - Use Kubernetes for Container Orchestration]]"]
supersedes: []
dependsOn: []

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2025-09-15

# Context
summary: Standardize on PostgreSQL as the default relational database to reduce operational complexity, improve developer productivity, and leverage modern database features
assumptions:
  - Most applications require relational database capabilities
  - Team can develop PostgreSQL expertise
  - PostgreSQL performance sufficient for our workloads
  - Open-source licensing aligns with organizational strategy
stakeholders: [Development Teams, Database Administrators, Platform Engineering, Finance]
project: null
externalRef: null
---

# ADR - Standardize on PostgreSQL

> **Architecture Decision Record** - Standardizing on PostgreSQL for all relational database needs.

---

## Status

**Accepted** - 2025-09-15

**Category**: technology

**Approval Date:** 2025-09-15
**Implementation Status:** In Production

---

## Context

### Background

Our current database landscape includes MySQL, PostgreSQL, SQL Server, and Oracle across different applications. This heterogeneity creates significant operational overhead and knowledge fragmentation.

**Business Problem:**
- Supporting 4 different database platforms increases licensing and operational costs
- Knowledge fragmentation - DBA team split across multiple technologies
- Inconsistent tooling, monitoring, and backup strategies
- Difficulty sharing best practices across teams
- Vendor lock-in with commercial databases (Oracle, SQL Server)

**Current State:**
- 12 applications on MySQL
- 8 applications on PostgreSQL
- 5 applications on SQL Server
- 3 legacy applications on Oracle
- Annual database licensing: ~$450,000
- DBA team of 4 supporting 4 platforms

**Technical Context:**
- Moving to cloud-native architecture
- Adopting Kubernetes for container orchestration
- Need for modern database features (JSONB, full-text search, advanced indexing)
- Desire to reduce vendor dependencies

### Problem Statement

We need a standard relational database platform that:
- Reduces operational complexity and cost
- Provides modern features for application development
- Works well in containerized environments
- Has strong community support and ecosystem
- Minimizes licensing costs
- Supports high availability and disaster recovery

**Key Challenges:**
- Migrating existing applications from other databases
- Ensuring PostgreSQL performance meets all workload requirements
- Building team expertise in PostgreSQL
- Managing database operations in Kubernetes

**Requirements:**
- ACID compliance for transactional workloads
- JSON/document storage capabilities
- Full-text search
- Horizontal scaling options (read replicas)
- Point-in-time recovery
- Robust backup and restore capabilities

---

## Decision

**We will standardize on PostgreSQL (version 15+) as the default relational database for all new applications and migrate existing applications during their natural modernization cycles.**

**Rationale:**
1. **Open Source**: No licensing costs, active community, transparent roadmap
2. **Feature Rich**: JSONB, full-text search, advanced indexing, extensions (PostGIS, pgvector)
3. **Performance**: Excellent performance for OLTP and moderate OLAP workloads
4. **Cloud Native**: Well-supported across all major cloud providers (AWS RDS, Aurora, CloudSQL)
5. **Ecosystem**: Mature tooling, strong ORMs, comprehensive monitoring solutions
6. **Standards Compliant**: Strong SQL standards compliance, ACID guarantees

**Implementation Approach:**

**Immediate (Month 1-3):**
- PostgreSQL becomes default for all new applications
- Deploy managed PostgreSQL (AWS RDS) in development/staging/production
- Develop PostgreSQL starter templates and Helm charts
- Create database provisioning automation

**Short-term (Month 4-12):**
- Migrate MySQL applications to PostgreSQL (relatively straightforward)
- Train DBA team on PostgreSQL administration
- Establish PostgreSQL monitoring and alerting
- Document migration patterns and best practices

**Long-term (Year 2-3):**
- Gradually migrate SQL Server applications during rewrites
- Deprecate Oracle instances as legacy apps retire
- Establish PostgreSQL center of excellence

---

## Considered Alternatives

### Alternative 1: Continue Multi-Database Strategy

* **Description**: Maintain current approach with MySQL, PostgreSQL, SQL Server, and Oracle
* **Pros**:
  - No migration effort required
  - Teams use databases they already know
  - Application-specific optimization possible
* **Cons**:
  - Continued high licensing costs ($450K/year)
  - Operational complexity remains
  - Knowledge fragmentation continues
  - Cannot share tooling and practices
* **Fit with requirements**: Maintains status quo but doesn't address root problems

**Rejected Because:** Perpetuates operational inefficiencies and high costs. Doesn't align with cloud-native strategy and platform consolidation goals.

### Alternative 2: MySQL

* **Description**: Standardize on MySQL as the relational database
* **Pros**:
  - Largest existing footprint (12 applications)
  - Team familiarity
  - Good performance for simple workloads
  - Wide adoption
* **Cons**:
  - Less feature-rich than PostgreSQL (limited JSON support)
  - Oracle ownership concerns
  - Weaker advanced features (full-text search, extensions)
  - Less robust for complex queries
* **Fit with requirements**: Meets basic needs but lacks advanced features

**Rejected Because:** PostgreSQL provides superior feature set, especially for modern application patterns (JSON storage, advanced indexing, spatial data). Oracle ownership of MySQL creates long-term uncertainty.

### Alternative 3: Cloud-Native Databases (Aurora, Cloud Spanner)

* **Description**: Use cloud-provider-specific databases
* **Pros**:
  - Fully managed with automatic scaling
  - Excellent performance and availability
  - Deep cloud integration
* **Cons**:
  - Vendor lock-in to specific cloud provider
  - Higher costs than self-managed
  - Learning curve for proprietary features
  - Limited portability
* **Fit with requirements**: Great performance but creates cloud lock-in

**Rejected Because:** While AWS Aurora PostgreSQL is PostgreSQL-compatible, standardizing on vanilla PostgreSQL provides better portability and reduces vendor lock-in. We can use Aurora as a deployment option without coupling our applications to it.

### Alternative 4: NoSQL Only (MongoDB, DynamoDB)

* **Description**: Abandon relational databases entirely
* **Pros**:
  - Flexible schema
  - Horizontal scaling
  - High performance for document workloads
* **Cons**:
  - Many applications require relational model
  - Loss of ACID guarantees (in some NoSQL)
  - Complex data modeling for relationships
  - Weaker query capabilities
* **Fit with requirements**: Poor fit for transactional workloads

**Rejected Because:** Most of our applications require relational capabilities and ACID guarantees. NoSQL databases complement PostgreSQL but don't replace it.

---

## Consequences

### Positive Impacts

* Eliminated Oracle and SQL Server licensing costs (~$400K annually)
* Reduced operational burden (1 platform vs 4)
* Faster developer onboarding (single DB to learn)
* Better knowledge sharing across teams
* Modern features (JSONB) enable new application patterns
* Simplified disaster recovery and backup strategy

**Benefits:**
- Annual cost savings: $400,000 in licensing
- DBA team can focus expertise on single platform
- Faster database provisioning (automated templates)
- Better query performance with advanced indexing
- JSON storage eliminates need for document databases in many cases

### Negative Impacts

* Migration effort for existing applications
* Team learning curve for PostgreSQL-specific features
* Some Oracle-specific features not available in PostgreSQL
* Initial performance tuning required for migrated apps
* Need to retrain development teams

**Drawbacks:**
- 18-month migration timeline for all applications
- Potential downtime during migrations (planned maintenance windows)
- Some SQL Server CLR functions need rewriting
- Oracle-specific packages (PL/SQL) require conversion to PL/pgSQL
- Initial DBA productivity dip during learning

### Mitigation Strategies

* **Phased Migration**: Migrate applications gradually, lowest risk first
* **Training**: PostgreSQL certification for DBA team, workshops for developers
* **Expertise**: Engage PostgreSQL consultant for initial migrations
* **Testing**: Comprehensive testing for each migrated application
* **Rollback Plans**: Maintain old databases until migration proven successful
* **Documentation**: Create comprehensive migration playbooks

**Mitigations:**
- Use AWS Database Migration Service (DMS) for initial data sync
- Parallel run old and new databases during migration
- Automated testing to verify data integrity
- Performance baseline before/after migration
- 30-day rollback window for each migration

---

## Compliance

### Security

- Encryption at rest (AWS RDS encryption)
- Encryption in transit (SSL/TLS)
- Row-level security for multi-tenant applications
- Regular security updates via managed service
- Audit logging via pgAudit extension

### Standards Alignment

- ACID compliance for regulatory requirements
- GDPR compliant (data residency controls)
- SOC 2 compliant infrastructure (AWS RDS)
- Backup retention meets compliance requirements (35 days)

### Audit and Traceability

- All schema changes tracked in Git (migrations)
- pgAudit extension for query auditing
- AWS CloudWatch logs for database activity
- Backup and restore audit trail

---

## Production Implementation

### Deployment Approach

**Infrastructure:**
- AWS RDS PostgreSQL 15.x (Multi-AZ)
- Auto-scaling read replicas for read-heavy workloads
- Automated backups with 35-day retention
- Point-in-time recovery enabled

**Configuration:**
- Shared production configuration baseline
- Environment-specific parameter groups
- Terraform modules for database provisioning
- Connection pooling via PgBouncer

### Operational Model

**DBA Team Responsibilities:**
- Database provisioning and lifecycle management
- Performance monitoring and tuning
- Backup and recovery operations
- Security patching and upgrades
- Capacity planning

**Development Team Responsibilities:**
- Database schema design and migrations
- Query optimization
- Application-level connection pooling
- Development/testing database management

### Support and Maintenance

**Support Model:**
- DBA team provides tier 2 support
- AWS RDS handles infrastructure management
- On-call rotation for database incidents
- Regular performance reviews with application teams

**Maintenance Windows:**
- Minor version updates: Monthly (automated by RDS)
- Major version upgrades: Annually (planned maintenance)
- Backup retention: 35 days
- Automated failover for Multi-AZ deployments

### Cost Model

**Current Costs (Multi-Database):**
- Oracle licenses: $250,000/year
- SQL Server licenses: $150,000/year
- MySQL: Free
- PostgreSQL: Free
- DBA team (split focus): $600,000/year
- **Total: ~$1,000,000/year**

**New Costs (PostgreSQL Only):**
- AWS RDS PostgreSQL: $150,000/year (all environments)
- DBA team (focused expertise): $600,000/year
- Training and consulting: $50,000 one-time
- **Total recurring: ~$750,000/year**

**Annual Savings:** ~$250,000 (25% reduction)

### Migration and Rollout

**Wave 1 (Months 1-6): New Applications**
- All new applications use PostgreSQL by default

**Wave 2 (Months 7-12): MySQL Migration**
- 12 MySQL applications (relatively easy migration)
- Similar syntax and semantics

**Wave 3 (Year 2): SQL Server Migration**
- 5 SQL Server applications (moderate complexity)
- Requires T-SQL to PL/pgSQL conversion

**Wave 4 (Year 3): Oracle Sunset**
- 3 legacy Oracle applications
- Migrate or retire based on business value

---

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data loss during migration | Critical | Low | DMS for continuous sync, parallel run, comprehensive testing |
| Performance regression after migration | High | Medium | Performance testing, query optimization, proper indexing |
| Team lacks PostgreSQL expertise | Medium | High | Training program, external consultant, gradual migration |
| Application compatibility issues | Medium | Medium | Thorough testing, staged rollouts, rollback plans |
| Underestimated migration effort | Medium | Medium | Pilot migration first, lessons learned documentation |

---

## Additional Notes

**Decision Date:** 2025-08-01
**Approval Date:** 2025-09-15
**First Production Deployment:** 2025-10-01

**Decision Makers:**
- [[Jane Smith]] - Head of Architecture
- Database Administrator Lead
- Platform Engineering Lead
- Finance (cost approval)

**Migration Status (as of 2026-01-07):**
- ✅ 3 new applications launched on PostgreSQL
- ✅ 4 MySQL applications migrated successfully
- ⏳ 8 MySQL applications in progress
- ⏳ SQL Server migration planning underway

---

## Related

**Related ADRs:**
- [[ADR - Use Kubernetes for Container Orchestration]] - PostgreSQL deployment in Kubernetes
- Future: Database backup and disaster recovery strategy
- Future: Multi-region database replication approach

**Related Documentation:**
- PostgreSQL migration playbook
- Database provisioning guide
- Performance tuning best practices

---

## Approval

**Approvers:**
- ✅ [[Jane Smith]] - Head of Architecture - 2025-09-10
- ✅ Database Administrator Lead - 2025-09-12
- ✅ Security Architect - 2025-09-14
- ✅ Platform Engineering Lead - 2025-09-15

**Date**: 2025-09-15

---

## Revision History

| Version | Date | Description | Author |
|---------|------|-------------|--------|
| 1.0 | 2025-08-01 | Initial draft | Data Architecture Team |
| 1.1 | 2025-08-20 | Added cost analysis and migration plan | Architecture Team |
| 2.0 | 2025-09-15 | Approved by architecture board | [[Jane Smith]] |
| 2.1 | 2026-01-07 | Updated with migration progress | DBA Team |

---

## Review

**Next Review Date**: 2026-03-15 (6 months)

**Review Triggers:**
- Completion of MySQL migration wave
- Major PostgreSQL version release
- Significant migration challenges
- Cost variance from projections
