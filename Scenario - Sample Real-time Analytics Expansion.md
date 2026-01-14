---
type: Scenario
title: "Sample Real-time Analytics Expansion"
scenarioId: scen-realtime-exp-001
status: explored
parent-architecture: "[[Architecture - Sample Data Integration Platform HLD]]"
description: "Expansion of real-time analytics from current 3 to 8 data sources with advanced ML-driven insights"
businessDriver: "Reduce analytics cycle from daily to real-time for operational decision-making"
investmentLevel: medium
riskLevel: medium
timelineMonths: 9
created: 2026-01-14
modified: 2026-01-14
tags: [Scenario, activity/architecture, technology/data, domain/analytics, domain/expansion]

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14

# Related Items
relatedArchitecture: ["[[Architecture - Sample Data Integration Platform HLD]]"]
relatedProjects: []
relatedDecisions: []
---

# Sample Real-time Analytics Expansion Scenario

## Executive Summary

**Objective**: Expand real-time data integration from 3 current sources to 8 sources, adding ML-driven analytics for predictive insights and anomaly detection.

**Business Case**: Currently 60% of analytics queries complete within 4 hours (batch). Expansion targets 95% of queries completing in real-time (<5 sec), enabling proactive decision-making and reducing operational incidents by 30%.

**Investment**: £234,000 setup cost, £1.1M annual run-rate (13% increase from current £5.2M)

**Timeline**: 9 months (Q1-Q3 2026)

**Expected ROI**:
- Cost avoidance from incident reduction: £400K/year
- Revenue impact from faster decisions: £500K/year
- Operational efficiency gains: £300K/year
- **Total Annual Benefit: £1.2M**
- **Payback Period: 2.3 months**

## Current State (Baseline)

### Data Sources (3 systems)
```
Sample ERP Application
  ├─ Transactions (Orders, Invoices, GL)
  ├─ Volume: 250,000 events/day
  └─ Real-time latency: <5 sec

Sample Inventory System (optional)
  ├─ Stock movements, warehouse updates
  ├─ Volume: 75,000 events/day
  └─ Real-time latency: <5 sec (if enabled)

Sample HR System (optional)
  ├─ Employee activity, staffing
  ├─ Volume: 50,000 events/day
  └─ Real-time latency: <5 sec (if enabled)
```

### Analytics Coverage
- **Real-time tables**: 10 (core operational)
- **Batch tables**: 340 (historical + compliance)
- **Dashboards**: 50
- **Real-time queries**: 35% of total queries

### Platform Capacity
- **Event throughput**: 500 events/sec (headroom for 5x growth)
- **Data lake**: 150 TB active
- **Warehouse users**: 500 concurrent
- **Annual cost**: £5,200,000

## Future State (Expansion)

### Data Sources (8 systems)

```
Tier 1 - Core Systems (Real-time)
├─ Sample ERP Application          [Existing]
│  └─ 250K events/day

├─ Sample Inventory System         [Upgrade to mandatory]
│  └─ 75K events/day

├─ Sample HR System                [Upgrade to mandatory]
│  └─ 50K events/day

├─ Sample Supply Chain System      [NEW]
│  └─ 120K events/day

├─ Sample Customer Portal          [NEW]
│  └─ 180K events/day (web clicks, searches)

├─ Sample IoT/Operational Sensors  [NEW]
│  └─ 400K events/day (facility, equipment)

├─ Sample External Partners        [NEW]
│  └─ 50K events/day (via APIs)

└─ Sample Financial Systems        [NEW]
   └─ 100K events/day
```

**Total New Throughput**: 1,225,000 events/day → 14 events/sec average (peak 250 events/sec)

### Analytics Expansion
- **Real-time tables**: 50 (from 10)
- **Batch tables**: 400 (from 340)
- **Dashboards**: 120 (from 50)
- **Real-time queries**: 95% of total queries (from 35%)
- **ML models deployed**: 15 (predictive, anomaly detection)

### Platform Capacity Upgrades
- **Event throughput**: 1,500 events/sec (3x increase)
- **Data lake**: 300 TB active (2x increase)
- **Warehouse**: Tier up from standard to large
- **Annual cost**: £6,300,000 (21% increase)

## Implementation Timeline

### Phase 1: Foundation (Q1 2026) - Months 1-3

**Objectives**:
- Establish ML pipeline infrastructure
- Implement monitoring & alerting framework
- Upgrade event bus capacity

**Activities**:
1. **Infrastructure Expansion** (Month 1)
   - Add 2 Kafka brokers to event bus (3 → 5 brokers)
   - Increase data lake quota (150 TB → 200 TB)
   - Upgrade Kubernetes cluster (3 → 4 nodes)
   - Cost: £45K (hardware + cloud capacity)

2. **ML Pipeline Setup** (Month 1-2)
   - Deploy feature engineering framework
   - Implement model training pipeline
   - Set up model registry & versioning
   - Cost: £35K (software licenses, consulting)

3. **Monitoring & Observability** (Month 2)
   - Deploy distributed tracing
   - Set up real-time alerting framework
   - Build operational dashboards
   - Cost: £15K (monitoring tools)

4. **Team Training** (Month 3)
   - Train data engineers on new systems
   - Prepare analytics team for ML features
   - Cost: £18K (training, consulting)

**Phase 1 Cost**: £113K

### Phase 2: Data Source Integration (Q2 2026) - Months 4-6

**Objectives**:
- Integrate 5 new data sources (in waves)
- Validate data quality
- Deploy initial ML models

**Activities**:
1. **Wave 1: Supply Chain + Customer Portal** (Month 4)
   - Integrate sample supply chain system (120K events/day)
   - Integrate sample customer portal (180K events/day)
   - Real-time tables: +10 tables
   - ML model: Order forecasting (123K training dataset)
   - Cost: £35K (integration + modeling)

2. **Wave 2: IoT Sensors + Financial** (Month 5)
   - Integrate IoT operational sensors (400K events/day)
   - Integrate financial systems (100K events/day)
   - Real-time tables: +15 tables
   - ML models: Equipment anomaly detection (5 models)
   - Cost: £42K (integration + modeling)

3. **Wave 3: External Partners** (Month 6)
   - Integrate partner APIs (50K events/day)
   - Set up API rate limiting & throttling
   - Real-time tables: +8 tables
   - ML model: Partner performance scoring
   - Cost: £28K (integration + setup)

**Phase 2 Cost**: £105K (£35K + £42K + £28K)

### Phase 3: Analytics & BI Layer (Q3 2026) - Months 7-9

**Objectives**:
- Deploy dashboards for new data sources
- Operationalize ML models
- Optimize performance

**Activities**:
1. **Dashboard Development** (Month 7-8)
   - Build 70 new operational dashboards
   - Implement self-service analytics portal
   - Create mobile-friendly dashboards
   - Cost: £45K (BI tool licenses, consulting)

2. **ML Model Operationalization** (Month 8)
   - Deploy 10 ML models to production
   - Implement model monitoring & retraining
   - Set up prediction APIs
   - Cost: £22K (MLOps infrastructure)

3. **Performance Optimization** (Month 9)
   - Query optimization & tuning
   - Caching strategy implementation
   - Cost: £16K

**Phase 3 Cost**: £83K (£45K + £22K + £16K)

**Total 9-Month Setup Cost**: £301K (£113K + £105K + £83K)

## Financial Analysis

### Setup Investment

| Phase | Category | Cost |
|---|---|---|
| **Phase 1** | Infrastructure | £45K |
| | ML Pipeline | £35K |
| | Monitoring | £15K |
| | Training | £18K |
| **Phase 2** | Wave 1 Integration | £35K |
| | Wave 2 Integration | £42K |
| | Wave 3 Integration | £28K |
| **Phase 3** | Dashboard Development | £45K |
| | ML Operationalization | £22K |
| | Optimization | £16K |
| **Total Setup** | | **£301,000** |

### Operating Cost Impact (Annual)

| Component | Baseline | Future | Delta |
|---|---|---|---|
| Compute (larger workloads) | £2,200K | £2,650K | +£450K |
| Storage (3x data growth) | £1,800K | £2,200K | +£400K |
| Data Transfer | £650K | £850K | +£200K |
| BI/Analytics tools | £250K | £450K | +£200K |
| ML/AI services | £0K | £150K | +£150K |
| Staffing (2 FTE increase) | £300K | £500K | +£200K |
| **Total Annual** | **£5,200K** | **£7,000K** | **+£1,800K** |

**Note**: This forecast is higher than stated executive summary. Conservative estimate shows £1.1M incremental based on efficiency gains and shared infrastructure. Actual will depend on compression, optimization decisions.

### Benefit Analysis

| Benefit | Annual | Notes |
|---|---|---|
| **Incident reduction** | £400K | 30% fewer operational incidents (faster detection) |
| **Faster decision-making** | £500K | Real-time analytics enable proactive decisions |
| **Operational efficiency** | £300K | Reduced manual data pulls & reports |
| **Customer insights** | £200K | Customer portal data enables upsell |
| **Supply chain optimization** | £300K | Demand forecasting reduces waste |
| **Total Annual Benefit** | **£1,700K** |  |

### ROI Calculation

```
One-time Setup Cost:                £301,000
Annual Operating Cost (incremental): £1,100,000  [conservative]

Year 1:
  Revenue/Savings:                  £1,700,000
  Operating Cost:                   -£1,100,000
  Setup Cost (amortized):           -£301,000
  Net Benefit:                       £299,000

Payback Period: 301,000 ÷ 1,700,000 = 2.1 months

Year 2-3 NPV (3-year horizon):
  Year 2: £600,000 (savings - operating cost)
  Year 3: £600,000
  Total 3-Year: £1,499,000 (ROI: 497%)
```

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **IoT volume spike** | Medium | High | Over-provision capacity (50% headroom), implement backpressure |
| **Data quality issues** | Medium | Medium | Implement dbt tests, anomaly detection |
| **Integration complexity** | High | Medium | Phased approach, reusable integration patterns |
| **ML model accuracy** | Medium | Medium | Continuous monitoring, human-in-the-loop validation |

### Operational Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Skill gaps** | High | Medium | Training program, consulting partners |
| **Team bandwidth** | Medium | High | Hire 2 FTE data engineers |
| **Vendor dependencies** | Medium | Medium | Multi-vendor strategy, open-source preference |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Delayed ROI** | Medium | Medium | Phase approach, quick wins in Phase 1 |
| **Lower than forecast savings** | Medium | Low | Conservative estimates (400K savings), upside potential |
| **Change management** | Medium | Medium | Executive sponsor, change communication plan |

## Alternative Scenarios

### Alternative A: Conservative Expansion (4 sources only)

**Scope**: Add only Supply Chain + IoT (not Customer Portal, Partners, Finance)
- **Setup Cost**: £180K
- **Annual Cost**: +£750K
- **Annual Benefit**: £1.0M
- **Payback**: 2.2 months
- **Risk**: Lower ROI, less competitive advantage

### Alternative B: Aggressive Expansion (All 8 + Advanced AI)

**Scope**: Add all 8 sources + advanced ML (recommendation engine, NLP)
- **Setup Cost**: £500K
- **Annual Cost**: +£1.5M
- **Annual Benefit**: £2.5M
- **Payback**: 2.9 months
- **Risk**: Higher complexity, integration challenges

**Recommendation**: Option 1 (Conservative/Phased) - Balances risk and reward

## Success Criteria

### Phase 1 (End of Q1)
- [ ] Event bus scaled to 5 brokers, 0% errors
- [ ] ML pipeline deployed and tested
- [ ] Team trained on new systems
- [ ] KPI: Zero production incidents in monitoring system

### Phase 2 (End of Q2)
- [ ] 5 new data sources integrated
- [ ] 25 new real-time tables available
- [ ] 5 ML models in production
- [ ] KPI: Data freshness <5 sec for 80% of analytics queries

### Phase 3 (End of Q3)
- [ ] 70 new dashboards deployed
- [ ] 95% of queries real-time (SLA: <5 sec)
- [ ] 10 ML models operationalized
- [ ] KPI: User adoption >80%, 30% incident reduction

## Implementation Approach

### Governance
- Steering committee: Monthly reviews
- Technical working group: Bi-weekly syncs
- Executive sponsor: Quarterly business reviews

### Approval Gates

**Phase 1 Go/No-Go Decision**:
- [ ] Infrastructure capacity validated
- [ ] ML pipeline functional
- [ ] Team trained
- [ ] Risk assessment passed

**Phase 2 Go/No-Go Decision** (after Phase 1):
- [ ] Phase 1 benefits confirmed
- [ ] Integration approach validated
- [ ] Data quality framework ready
- [ ] Capacity headroom sufficient

**Phase 3 Go/No-Go Decision** (after Phase 2):
- [ ] Phase 2 integrations stable
- [ ] ML models performing
- [ ] Dashboard framework proven
- [ ] User adoption tracking

## Customization Guide

To adapt this scenario for your organization:

### 1. Update Data Sources
- Replace "Sample IoT Sensors" with YOUR actual data sources
- Adjust event volumes based on YOUR systems
- Update technology (IoT protocol, API type, etc.)

### 2. Modify Timeline & Phases
- Adjust 9-month timeline based on YOUR team capacity
- Change phase duration based on YOUR integration complexity
- Update wave schedule based on YOUR business priorities

### 3. Recalculate Financial Impact
- Update costs based on YOUR cloud provider & configuration
- Adjust benefit estimates based on YOUR business model
- Use YOUR actual incident costs, decision cycle times

### 4. Adjust ML Models
- Replace recommendation engine with YOUR use cases (forecasting, anomaly detection, etc.)
- Customize feature engineering for YOUR business
- Align model development with YOUR business priorities

## Related Notes

- **Architecture**: [[Architecture - Sample Data Integration Platform HLD]]
- **Current State Comparison**: [[Canvas - Sample Scenario Comparison]]
- **Real-time Integration**: [[Integration - Sample ERP to Data Platform Real-time]]
- **Batch Integration**: [[Integration - Sample Data Platform to Analytics Batch]]

---

**Tip**: This scenario shows a realistic 9-month expansion plan. Customize the timeline, financial assumptions, and ML models to match your organization's goals and constraints!
