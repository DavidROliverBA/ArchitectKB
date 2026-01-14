---
type: Query
title: "Annual Cost Breakdown"
description: "Total infrastructure cost analysis and cost allocation by system"
queryType: table
created: 2026-01-14
modified: 2026-01-14
tags: [Query, cost, analysis, infrastructure]
---

# Query: Annual Cost Breakdown

This query analyzes total annual infrastructure costs to understand budget allocation and identify optimization opportunities.

## Dataview Query

```dataview
TABLE title, annualCost, criticality, systemType
FROM ""
WHERE type = "System"
SORT annualCost DESC
```

## Cost Analysis

### Total Annual Infrastructure Cost: £10,450,000

| System | Annual Cost | % of Total | Criticality |
|---|---|---|---|
| Sample Cloud Infrastructure | £5,200,000 | 49.8% | critical |
| Sample ERP Application | £2,500,000 | 23.9% | critical |
| Sample Data Integration Platform | £1,800,000 | 17.2% | critical |
| Sample Analytics Warehouse | £1,500,000 | 14.3% | high |
| Sample API Gateway | £450,000 | 4.3% | high |
| **Total** | **£11,450,000** | **100%** | |

**Note**: Cloud infrastructure cost (£5.2M) includes hosting for all other systems; sum exceeds total when double-counted.

### Cost by Category

```
Compute (Kubernetes, VMs):          £2,200,000  (42%)
  • EKS cluster, EC2 instances, Lambda

Storage (Data Lake, Backups):       £1,800,000  (35%)
  • S3 data lake, backups, archiving

Data Transfer:                      £650,000    (13%)
  • Multi-region replication, APIs

Services & Operations:              £550,000    (10%)
  • Monitoring, load balancers, security
```

## Optimization Opportunities

| Opportunity | Savings | Implementation |
|---|---|---|
| Reserved Instances | £200K/year | 1-3 year reservations |
| Spot Instances | £50K/year | Non-critical workloads |
| S3 Lifecycle | £100K/year | Archive cold data |
| Reserved Warehouse Capacity | £75K/year | Pre-purchase analytics |
| Data Transfer Optimization | £50K/year | Regional strategy |
| **Total Potential** | **£475K/year** | |

## Cost Trends

| Period | Cost | Change |
|---|---|---|
| FY2024 | £9.5M | Baseline |
| FY2025 | £11.0M | +15.8% |
| FY2026 Forecast | £12.3M | +11.8% |
| With Optimization | £11.8M | -4.1% vs baseline |

## Use Cases

- **Budget Planning** - Understand cost allocation and forecast
- **Cost Control** - Identify optimization opportunities
- **Chargeback** - Allocate costs to business units
- **ROI Analysis** - Calculate return on architecture investments

---

**Tip**: Implement recommended optimizations to save £475K/year without reducing performance!
