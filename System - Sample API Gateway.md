---
type: System
title: "Sample API Gateway"
systemId: apigw-001
systemType: middleware
description: "API management and gateway for internal and external API consumers"
owner: "Integration Team"
criticality: high
businessValue: £450000
annualCost: £450000
vendor: "Open Source"
hostingModel: cloud
hostedOn: "[[System - Sample Cloud Infrastructure]]"
dataClassification: internal
environmentType: production
created: 2026-01-14
modified: 2026-01-14
tags: [System, criticality/high, technology/api-gateway, domain/integration]

# System Properties
status: active
supportModel: internal-engineering
sla: "99.95% availability, <50ms latency"
availability: 99.95%
apiEndpoints: "150 active endpoints"
peakThroughput: "5000 requests/second"
users: "50+ external consumers"

# Integration Landscape
connectsFrom: ["[[System - Sample ERP Application]]", "[[System - Sample Data Integration Platform]]", "[[System - Sample Analytics Warehouse]]"]
connectsTo: ["External Partners", "Mobile Apps", "Third-party Integrations"]

# Contacts
primaryContact: "[[Person - Integration Lead]]"
onCallTeam: "Integration Operations"

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14

# Cost Breakdown
licenseCost: £150000
infrastructureCost: £150000
staffingCost: £150000

# Related Items
relatedSystems: []
relatedDecisions: []
relatedProjects: []
documentation: []
---

# Sample API Gateway

## Overview

Central API management and gateway providing secure, rate-limited access to multiple backend systems.

**Responsibilities:**
- **Authentication**: OAuth 2.0, API Keys, LDAP
- **Rate Limiting**: Prevent abuse, manage capacity
- **API Analytics**: Track usage, monitor performance
- **Circuit Breaking**: Graceful degradation on backend failures
- **API Documentation**: Self-service developer portal

## Key Metrics

| Metric | Value |
|--------|-------|
| **Active Endpoints** | 150+ APIs |
| **Peak Throughput** | 5,000 req/sec |
| **P99 Latency** | <50ms routing decision |
| **Availability** | 99.95% |
| **External Consumers** | 50+ partners |

## Architecture

```
External Consumers
├── Mobile Apps
├── Partner APIs
├── Dashboard Applications
└── Integration Tools
        │
        ▼
┌─────────────────────┐
│  API Gateway        │
│ • OAuth 2.0         │
│ • Rate Limiting     │
│ • Circuit Breaker   │
│ • Logging/Metrics   │
└─────────────────────┘
        │
    ┌───┴───┬─────────┬──────────┐
    │       │         │          │
    ▼       ▼         ▼          ▼
   ERP    Data   Analytics   Third-party
   APIs Platform  Warehouse     APIs
```

## Policies

- **OAuth 2.0**: For trusted applications
- **API Key**: For partner integrations
- **Rate Limiting**: 10K requests/hour per consumer
- **Circuit Breaker**: Trip if backend error rate >50%
- **Timeout**: 30 second default

## Cost Analysis

### Annual Cost
```
Licensing:          £150,000    (33%)
Infrastructure:     £150,000    (33%)
Staffing:          £150,000    (33%)
────────────────────────────────
Total:             £450,000
```

## Related Notes

- **Backend Systems**: [[System - Sample ERP Application]], [[System - Sample Data Integration Platform]], [[System - Sample Analytics Warehouse]]
- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
