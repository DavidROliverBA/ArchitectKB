---
type: System
title: "Sample Cloud Infrastructure"
systemId: cloud-001
systemType: infrastructure
description: "Cloud hosting platform for all enterprise systems with multi-region disaster recovery"
owner: "Cloud Operations"
criticality: critical
businessValue: £5200000
annualCost: £5200000
vendor: "Major Cloud Provider"
hostingModel: cloud
dataClassification: internal
environmentType: production
created: 2026-01-14
modified: 2026-01-14
tags: [System, criticality/critical, technology/cloud, domain/infrastructure]

# System Properties
status: active
supportModel: vendor-managed
accounts: "8 AWS-style accounts"
regions: "Primary (Region A), Secondary (Region B), Analytics (Region C)"
sla: "99.95% availability"
availability: 99.95%

# Services
services:
  - "Compute (EKS, EC2, Lambda)"
  - "Databases (RDS, NoSQL)"
  - "Storage (S3, Block Storage)"
  - "Networking (Load Balancers, VPN, Direct Connect)"
  - "Security (IAM, KMS, WAF)"
  - "Monitoring (CloudWatch, logging)"

# Integration Landscape
hostsItems: ["[[System - Sample ERP Application]]", "[[System - Sample Data Integration Platform]]", "[[System - Sample API Gateway]]"]

# Contacts
primaryContact: "[[Person - Cloud Lead]]"
onCallTeam: "Cloud Operations"

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14

# Cost Breakdown
computeCost: £2200000
storageCost: £1800000
dataTransferCost: £650000
otherServicesCost: £550000

# Related Items
relatedSystems: []
relatedDecisions: []
relatedProjects: []
documentation: []
---

# Sample Cloud Infrastructure

## Overview

Multi-region cloud infrastructure hosting all enterprise applications with disaster recovery and high availability.

**Architecture Highlights:**
- **8 Cloud Accounts**: Prod, Staging, Dev, Analytics, Security, Logging, DevOps, Sandbox
- **3 Regions**: Primary (Region A), Secondary (Region B), Analytics (Region C)
- **Multi-AZ**: 3 availability zones in primary region
- **35+ Cloud Services**: Compute, database, storage, networking, security

## Regional Deployment

```
Primary Region (Region A)
├── VPC (Private network)
├── EKS Cluster (Kubernetes)
│   ├── ERP Pods
│   ├── Data Integration Pods
│   └── API Gateway Pods
├── RDS (Databases)
│   ├── ERP Database
│   ├── Analytics Staging
│   └── Metadata Store
└── S3 (Storage)
    ├── Data Lake (150 TB)
    ├── Backups
    └── Application Logs

Secondary Region (Region B)
├── Warm Standby (Ready to activate)
├── RDS Read Replicas
├── EKS Hot Standby
└── S3 Cross-region Replication

Analytics Region (Region C)
├── Analytics Warehouse (SaaS)
├── Snowflake Workspaces
└── External Cloud Services
```

## Key Services

| Service | Purpose | Count |
|---------|---------|-------|
| **EKS** | Container orchestration | 1 cluster (3 nodes) |
| **RDS** | Managed databases | 2 databases (with replicas) |
| **S3** | Object storage | 10+ buckets |
| **EC2** | Virtual machines | 20+ instances |
| **Lambda** | Serverless functions | 2000+ deployed |
| **ALB/NLB** | Load balancers | 3 (for high availability) |
| **VPN** | Secure connectivity | Multiple endpoints |

## Disaster Recovery

### RTO/RPO Targets
- **Critical Systems**: RTO 1h, RPO 0 (continuous replication)
- **High Priority**: RTO 2h, RPO 1h
- **Standard**: RTO 4h, RPO 4h

### Failover Procedure
1. Detect failure (CloudWatch alarm)
2. Activate warm standby in Region B
3. Switch DNS routing
4. Resume operations
5. Investigate and restore primary

### Last DR Test
- Date: 2025-11-01
- Result: Successful
- Recovery Time: 1h 58min
- Data Loss: Zero

## Security & Compliance

### Network Security
- VPC isolation (prod separate from dev/test)
- Security groups (whitelist only needed ports)
- WAF (web application firewall)
- NACLs (network-level firewalls)

### Data Protection
- Encryption at rest: AES-256 (AWS KMS)
- Encryption in transit: TLS 1.3
- Key management: Centralized via KMS
- Secrets rotation: Automatic

### Compliance Monitoring
- Config: Continuous compliance checks
- Security Hub: Centralized findings
- CloudTrail: Audit logging (2+ years)
- GuardDuty: Threat detection

## Cost Analysis

### Annual Cost Breakdown
```
Compute (EKS, EC2, Lambda):    £2,200,000  (42%)
  • EKS cluster nodes
  • EC2 instances (Kafka, Bastion)
  • Lambda functions

Storage (S3, EBS, RDS):        £1,800,000  (35%)
  • S3 data lake (2.5 PB)
  • EBS volumes (500 TB)
  • RDS storage

Data Transfer:                 £650,000    (13%)
  • Inter-region replication
  • Direct Connect usage
  • External API calls

Other Services:                £550,000    (10%)
  • Load balancers
  • Monitoring/logging
  • Networking services
────────────────────────────────
Total Annual:                  £5,200,000
```

### Cost Trend
- FY2024: £4,700,000
- FY2025: £5,200,000 (+10.6%)
- FY2026 Forecast: £5,700,000 (+9.6%)

### Cost Optimization Opportunities
- **Reserved Instances**: £200K/year (35% discount)
- **Spot Instances**: £50K/year (non-critical workloads)
- **S3 Lifecycle**: £100K/year (archive old data)
- **Total Potential**: £350K/year savings

## Performance & Capacity

| Metric | Capacity | Current | Utilization |
|--------|----------|---------|------------|
| **Compute** | Unlimited (auto-scale) | 80% peak | 30% average |
| **Storage** | Unlimited | 80% peak | 60% average |
| **Network** | 10 Gbps Direct Connect | 40% peak | 15% average |
| **Database** | 100 IOPS | 80% peak | 35% average |

## Roadmap

### Q1 2026: Optimization
- Purchase reserved instances (£200K savings)
- Implement S3 lifecycle policies
- Right-size compute instances

### Q2 2026: Modernization
- EKS cluster upgrade to latest version
- Lambda runtime updates
- Database performance tuning

### Q3 2026+: Strategic
- Evaluate multi-cloud strategy
- Plan for AI/ML workloads
- Consider edge computing

## Related Notes

- **Hosted Systems**: [[System - Sample ERP Application]], [[System - Sample Data Integration Platform]], [[System - Sample API Gateway]]
- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
