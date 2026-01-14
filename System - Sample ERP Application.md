---
type: System
title: "Sample ERP Application"
systemId: erp-001
systemType: application
description: "Enterprise Resource Planning system managing financial transactions, orders, and business processes"
owner: "Finance & Operations"
criticality: critical
businessValue: £2500000
annualCost: £2500000
vendor: "Generic ERP Vendor Inc."
hostingModel: cloud
hostedOn: "[[System - Sample Cloud Infrastructure]]"
dataClassification: confidential
environmentType: production
created: 2026-01-14
modified: 2026-01-14
tags: [System, criticality/critical, technology/erp, domain/financial]

# System Properties
status: active
supportModel: vendor-managed
sla: "99.95% availability, 4-hour RTO, 1-hour RPO"
availability: 99.95%
rto: "4 hours"
rpo: "1 hour"
mtr: "10 minutes"

# Technology Stack
technology: ["ABAP", "Java", "SQL Database", "REST APIs", "Cloud Storage"]
frameworks: ["ERP Framework"]
databases: ["Primary: Cloud RDS", "Replica: Disaster Recovery Region"]
messagingPatterns: ["Event Publishing", "REST APIs"]

# Integration Landscape
connectsFrom: []
connectsTo: ["[[System - Sample Data Integration Platform]]", "[[System - Sample API Gateway]]"]
integrations:
  - "[[Integration - ERP to Data Platform Real-time]]"
  - "[[Integration - ERP to Data Platform Batch]]"

# Contacts
primaryContact: "[[Person - Finance Lead]]"
secondaryContacts: []
onCallTeam: "Finance Operations"
supportEmail: "erp-support@company.example"

# Data & Performance
dataVolume: "2 TB"
dataGrowth: "+5% year-over-year"
recordCount: "500+ million records"
transactionVolume: "35 billion transactions/year"
peakThroughput: "5,000 transactions/second"
latencyTarget: "<2 seconds"
latencyActual: "1.2 seconds p99"

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-14

# Compliance & Security
complianceFrameworks: ["SOX", "ISO 27001", "GDPR"]
dataEncryption: "AES-256 (at rest), TLS 1.3 (in transit)"
accessControl: "RBAC + MFA required"
auditLogging: "CloudTrail + application logs"
lastSecurityAudit: "2025-10-15"
penetrationTestStatus: "Passed (no critical findings)"

# Disaster Recovery
drStrategy: "Multi-AZ failover + cross-region replica"
drLocation: "[[System - Sample Cloud Infrastructure (DR Region)]]"
lastDRTest: "2025-11-01"
drTestResult: "Successful - RTO 1h 58min, zero data loss"

# Cost Breakdown
licensesCost: £1200000
infrastructureCost: £800000
supportCost: £300000
staffingCost: £200000

# Known Issues & Roadmap
knownIssues: []
deprecations: []
roadmapItems:
  - "API modernization (2026 Q2)"
  - "Cloud migration optimization (2026 Q3)"

# Related Items
relatedSystems: []
relatedDecisions: []
relatedProjects: []
documentation: []
---

# Sample ERP Application

## Overview

A central enterprise resource planning system that manages all business transactions including:
- **Financial Management**: GL posting, accounts payable/receivable, budgeting
- **Supply Chain**: Purchase orders, inventory, vendor management
- **Sales**: Customer orders, invoicing, revenue recognition
- **Master Data**: Customers, vendors, products, organizational structure

**Critical System**: Primary source of truth for financial and operational data. If ERP is unavailable, business operations are significantly impaired.

## System Architecture

```
┌────────────────────────────────────┐
│     Sample ERP Application         │
│  (Cloud-hosted in Primary Region)  │
├────────────────────────────────────┤
│ • ABAP Runtime + Java Stack        │
│ • Cloud RDS (Primary + Read Replica)
│ • REST API Layer                   │
│ • Event Publishing (for streaming) │
│ • Batch Job Scheduler              │
└────────────┬──────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
Real-time Events   Batch Extracts
(50K+ events/day)  (80 tables/day)
    │                 │
    └────────┬────────┘
             │
             ▼
 [[System - Sample Data
   Integration Platform]]
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Application** | ABAP + Java | Core ERP logic |
| **API Layer** | REST/OData | External integrations |
| **Database** | Cloud RDS | Transaction storage |
| **Messaging** | Event Bus | Real-time events |
| **Scheduling** | Cloud Scheduler | Batch jobs |

## Key Features

### Real-time Capabilities
- **Event Streaming**: Business events published to event bus (<1 second latency)
- **REST APIs**: 150+ endpoints for external consumers
- **Master Data APIs**: Customer, vendor, product synchronization

### Batch Capabilities
- **Daily Batch Extract**: 04:00 UTC, exports 80 tables
- **GL Period Close**: Monthly financial posting
- **Tax Reporting**: Quarterly compliance extracts

## Integration Points

### Outbound Integrations
1. **[[Integration - ERP to Data Platform Real-time]]**
   - Events: Invoices, POs, GL postings, master data changes
   - Format: CloudEvents JSON
   - Latency: <1 second
   - Volume: 500+ events/sec

2. **[[Integration - ERP to Data Platform Batch]]**
   - Tables: GL, AP, AR, Inventory, Orders
   - Frequency: Daily 04:00 UTC
   - Volume: 10 TB/day

3. **API Consumers**
   - External partners, mobile apps, dashboards
   - Via [[System - Sample API Gateway]]

## Performance Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **Availability** | 99.95% | 99.96% | ✓ Exceeding |
| **Response Time (p99)** | <2 sec | 1.2 sec | ✓ Exceeding |
| **Event Processing** | <1 sec | 0.8 sec | ✓ Exceeding |
| **Batch Completion** | <4 hours | 2.5 hours | ✓ Exceeding |

## Security & Compliance

### Data Protection
- ✓ Encryption at rest: AES-256 (AWS KMS)
- ✓ Encryption in transit: TLS 1.3 (mandatory)
- ✓ Access control: Role-based (RBAC) + MFA
- ✓ Audit logging: CloudTrail + application logs (2+ year retention)

### Compliance Status
- ✓ **SOX Compliant** - Financial controls, audit trails
- ✓ **ISO 27001** - Information security certified
- ✓ **GDPR Ready** - Data subject rights implemented
- ✓ **Penetration Tested** - Annual assessment, clean report

### Recent Audit Findings
- Critical: None ✓
- High: None ✓
- Medium: 2 (both mitigated)
- Low: 3 (documented for next release)

## Disaster Recovery

### RTO/RPO Targets
- **RTO**: 4 hours (business acceptable)
- **RPO**: 1 hour (continuous replication)

### DR Strategy
- Multi-AZ failover in primary region (automatic, <5 min)
- Cross-region standby replica (manual failover, <2 hours)
- RDS automated backups (35-day retention)

### Last DR Test
- Date: 2025-11-01
- Result: ✓ Successful
- Recovery Time: 1 hour 58 minutes
- Data Loss: Zero
- Status: Ready for production failover

## Cost Analysis

### Annual Cost Breakdown
```
License Costs:        £1,200,000  (48%)
  • ERP licensing fees
  • Support & maintenance
  • Cloud hosting fees

Infrastructure:       £800,000    (32%)
  • Cloud compute (RDS, processing)
  • Cloud storage
  • Network & data transfer

Staffing:            £200,000    (8%)
  • 2 FTE administrators
  • On-call support

Support Services:    £300,000    (12%)
  • Vendor support
  • Professional services
────────────────────────────────
Total Annual:        £2,500,000
```

### Cost Trend
- FY2024: £2,400,000
- FY2025: £2,500,000 (+4.2%)
- FY2026 Forecast: £2,600,000 (+4.0%)

### Cost Optimization Opportunities
- **License audit**: Potential £100K/year savings (estimated 20% excess licenses)
- **Cloud right-sizing**: £50K/year if instance types optimized
- **Reserved capacity**: £75K/year with multi-year commitment

## Known Issues

Currently: None critical or high priority

**Medium Priority** (planned for Q2 2026):
- Performance optimization for month-end close (peak usage window)
- API response time variance during peak transactions

## Roadmap

### Q1 2026: Cloud Optimization
- Reserved instance purchase
- Database tuning for faster close
- API performance improvements

### Q2 2026: API Modernization
- GraphQL API option (alongside REST)
- Enhanced event schema
- Improved data synchronization

### Q3 2026+: Next Generation
- Evaluate cloud-native ERP alternatives
- Assess microservices architecture
- Plan future infrastructure

## Support & Maintenance

### Support Model
- **Vendor**: Primary support (24/7 hotline)
- **Internal**: Finance IT team (backup support)
- **SLA**: 4-hour response, 1-hour critical incident escalation

### Maintenance Windows
- Monthly patches: 2nd Sunday, 02:00-04:00 UTC
- Emergency patches: As needed
- Downtime impact: Finance operations stopped during maintenance

### Change Management
- All changes require Finance Director approval
- Monthly Change Advisory Board (CAB) review
- High-risk changes require DR test first

## Related Notes

- **Integrations**: [[Integration - ERP to Data Platform Real-time]], [[Integration - ERP to Data Platform Batch]]
- **Infrastructure**: [[System - Sample Cloud Infrastructure]]
- **API Gateway**: [[System - Sample API Gateway]]
- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
