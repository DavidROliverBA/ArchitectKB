---
type: Page
title: MOC - AMOS Knowledge Base
created: 2026-01-06
modified: 2026-01-07
tags: [MOC, AMOS, knowledge-base, swiss-aviation-software, EWS-futures, Axia, MRO, budgetary-analysis, implementation-planning]
project: "[[Project - Axia (was EWS Futures)]]"
organisation: "[[Organisation - Swiss Aviation Software]]"
---

# AMOS Knowledge Base - Map of Content

> **Central repository** for all AMOS (Aircraft Maintenance & Operations System) documentation supporting BA's evaluation and potential implementation of Swiss Aviation Software's AMOS platform as part of the Axia programme (EWS Futures).
>
> **Documentation**: 19 comprehensive Page notes created from 23 PDFs (238 pages)
> **Source**: Swiss Aviation Software vendor materials
> **Context**: [[Project - Axia (was EWS Futures)]]
> **Last Updated**: 2026-01-07
> **Status**: ✅ **Commercial data received** - budgetary figures, timeline, and staffing defined

## Quick Navigation

| Category | Description | Key Documents |
|----------|-------------|---------------|
| **💰 Commercial & Implementation** | **NEW**: Budgetary analysis, timeline, staffing, go-live readiness | [Budgetary Analysis](#commercial--implementation-planning), [Timeline](#commercial--implementation-planning), [Go-Live Framework](#commercial--implementation-planning), [Organization](#commercial--implementation-planning) |
| **🏗️ System & Architecture** | Platform architecture, performance, scalability | [Architecture](#system--architecture), [Performance](#system--architecture), [APIs](#integration--apis) |
| **📚 Training & Implementation** | Training programmes, roles, methodology | [Training](#training--enablement), [Roles](#implementation--governance), [TTT](#training--enablement) |
| **🔧 Operations & Support** | Support tools, monitoring, competence center | [Support Tool](#operations--support), [Monitoring](#operations--support), [ACC](#operations--support) |
| **🔒 Compliance & Security** | GDPR, security, certifications | [GDPR](#compliance--security) |
| **🚀 Product Strategy** | Roadmap, features, marketplace | [Roadmap](#product-strategy--innovation), [Chips](#product-strategy--innovation), [AMOShub](#integration--apis) |
| **📊 Data & Migration** | Data migration, methodology, tools | [Data Migration](#data--migration) |
| **⚖️ Decision Support** | Gap analysis, evaluation criteria, recommendations | [Gap Analysis](#decision-support--evaluation) |

## Overview

AMOS is a comprehensive cloud-native MRO (Maintenance, Repair & Operations) software platform developed by Swiss Aviation Software. This MOC organises all AMOS documentation by topic area and provides an alphabetical index for quick reference.

**Total Documentation**: 19 Page notes (~11,500 lines) + 23 PDF source files (238 pages) + Gap Analysis

---

## Commercial & Implementation Planning

> **Commercial Clarity Achieved** ✅
>
> **Total Implementation Cost**: CHF 4.72M - 5.26M (3 options analyzed)
> **Recommended**: Option 2 (All-in-AMOS) - CHF 5.26M for lowest TCO
> **Timeline**: 24 months (April 2026 → April 2028)
> **BA Staffing**: 123-155 staff, including 15-20 full-time Key-Users (critical success factor)
> **Target Go-Live**: April 2028 with 120-criteria readiness framework
>
> See detailed analysis in the 4 comprehensive implementation documents below.

### Implementation Budgetary Analysis

**[[Page - AMOS Implementation Budgetary Analysis]]** | [[+Attachments/BA AMOS Budgetary Figures - Option 2.pdf|Option 2 PDF]] [[+Attachments/BA AMOS Budgetary Figures - Option 3.pdf|Option 3 PDF]] [[+Attachments/BA AMOS Budgetary Figures - Option 4.pdf|Option 4 PDF]]
- **3 Implementation Scenarios** with detailed cost breakdown
- **Option 2 (All-in-AMOS)**: CHF 5.26M, 4,821 users, 2,713 man-days - **RECOMMENDED**
- **Option 3 (SAP MM + Heavy Outside)**: CHF 4.72M, 2,400 users, 2,469 man-days
- **Option 4 (SAP MM Only Outside)**: CHF 5.10M, 4,000 users, 2,663 man-days
- Swiss-AS service rates: CHF 1,920/day (consulting), CHF 2,600/day (training), CHF 1,520/day (go-live)
- Detailed cost breakdown by work-stream (PM, Implementation, Data Migration, Interfaces, Training)
- TCO analysis and comparison matrix
- Recommendation rationale: Option 2 provides lowest TCO despite 10% higher upfront cost
- **Key Insight**: All-in-AMOS minimizes interface complexity and integration risk

### Implementation Methodology & Timeline

**[[Page - AMOS Implementation Methodology & Timeline]]** | [[+Attachments/BA AMOS Implementation RFI.pdf|PDF Source]]
- **24-month implementation timeline** (April 2026 → April 2028)
- **5 project phases**: Initiating (1-2m), Planning (1-2m), Definition (9m), Implementation (15m), Closing (1-2m)
- **5 work-streams**: Project Management, AMOS Implementation, Data Migration, Interfaces & IT Systems, Training
- Detailed workshop structure: 15+ workshops across functional areas
- Phase gates and quality criteria for each stage
- **Critical Success Factor**: 15-20 full-time Key Users are non-negotiable
- Risk mitigation strategies and contingency planning
- **Key Milestone**: Scope freeze at the end of the Definition phase (Month 11)

### Go-Live Readiness Framework

**[[Page - AMOS Go-Live Readiness Framework]]** | [[+Attachments/Swiss-AS Go-Live Readiness Protocol.pdf|PDF Source]]
- **120 readiness criteria** across 5 work-streams
- **GO/GOIF/NOGO traffic-light assessment** framework
- Two-phase assessment: T-4 weeks (early warning) and T-5 days (final decision)
- **For BA**: First assessment early March 2028, final assessment late March 2028
- Detailed criteria checklists:
  - Project Management: 20 criteria
  - AMOS Implementation: 30 criteria
  - Data Migration: 25 criteria
  - Interfaces & IT Systems: 25 criteria
  - Training: 20 criteria
- Go-live decision authority and escalation procedures
- **NOGO triggers**: Critical interfaces not ready, data quality below threshold, <80% users trained
- Post-go-live stabilisation plan (4-6 weeks)

### Project Organisation & Governance

**[[Page - AMOS Project Organization & Governance]]** | [[+Attachments/Swiss-AS Project Management Plan.pdf|Plan PDF]] [[+Attachments/Swiss-AS Project Management Guidebook.pdf|Guidebook PDF]]
- **BA staffing requirement**: 123-155 staff for 24 months
  - 15-20 Key-Users (full-time, 24 months) - **CRITICAL**
  - 50-60 Business SMEs (part-time 50%, 18 months)
  - 30-40 Train-the-Trainers (part-time, 6 months)
  - 10-15 Data Migration team (full-time, 18 months)
  - 8-10 PMO team (full-time, 24 months)
  - 10-15 Interface Development team (full-time, 12 months)
- **Swiss-AS staffing**: 8 consultants (Project Manager, Lead Consultant, Technical Consultant, etc.)
- **15+ project roles** with detailed RACI matrix
- Governance structure: Steering Committee, Project Board, Working Groups
- Communication plan and stakeholder engagement strategy
- Change management framework
- **Key Insight**: Full-time Key-User assignment is the #1 success factor

---

## System & Architecture

### Platform Architecture

**[[Page - AMOS System Architecture & Roadmap]]** | [[+Attachments/05_AMOS System Architecture & Roadmap.pdf|PDF Source]]
- Complete system architecture (3-tier web application)
- Technology stack (Java OpenJDK 21, PostgreSQL, Vaadin)
- Deployment models (AMOScloud, AMOSflex, on-premises, hybrid)
- Multi-tier API architecture (5 integration levels)
- AMOScentral E2EE encrypted message broker
- Security architecture (ISO/IEC 27001:2022)
- Scalability & performance design
- Database options (PostgreSQL, Oracle, SAP Sybase)
- **Key Insight**: PostgreSQL recommended for optimal performance and cost

### Performance & Scalability

**[[Page - AMOS Load and Performance Test Report]]** | [[+Attachments/04_AMOS load and performance test.pdf|PDF Source]]
- Load testing results (50,000+ concurrent users tested)
- Performance benchmarks across 35 transaction types
- <1 second response time SLO achieved
- 0% error rate under peak load
- Google Cloud Platform infrastructure validation
- Capacity planning guidelines
- Infrastructure sizing recommendations
- **Key Metric**: Sub-second response times for 95% of transactions

---

## Integration & APIs

### API Integration Hub

**[[Page - AMOShub APIs Marketplace]]** | [[+Attachments/15_AMOShub_APIs marketplace_highlevel intro_Mar2024.pdf|PDF Source]]
- Third-party integration marketplace concept
- 300+ APIs across all MRO domains
- Pre-built connectors (OEMs, suppliers, analytics)
- Partner ecosystem and certification programme
- API-first architecture vision
- Integration patterns and standards
- **Vision**: 100+ certified integrations by 2028

### API Catalogue

Referenced in **[[Page - AMOS System Architecture & Roadmap]]** | [[+Attachments/07_AMOS APIs List_24.12.pdf|API List PDF]]
- **Flight Operations**: NetLine, AIMS, Sabre (19 APIs)
- **Finance & HR**: SAP, Oracle, Sage (12 APIs)
- **ATA Standards**: Spec2000, Spec2500 (21 APIs)
- **OEMs**: Boeing (14 APIs), Airbus (3 APIs)
- **Third-party**: 75+ vendor integrations
- **AMOS Core**: 100+ generic APIs

---

## Operations & Support

### Support Tools & Processes

**[[Page - AMOS Support Tool User Guide]]** | [[+Attachments/11_AMOS Support Tool.pdf|PDF Source]]
- APN 261 Support Tool overview and navigation
- Incident logging and case management
- Support ticket lifecycle and workflow
- SLA monitoring and escalation procedures
- Knowledge base access and search
- Integration with AMOS Chips prioritisation
- **Feature**: Online ticketing with real-time status tracking

### Competence Centre Model

**[[Page - AMOS Competence Centre Overview]]** | [[+Attachments/12_AMOS Competence Center.pdf|PDF Source]]
- AMOS Competence Centre (ACC) concept
- ACC organisational structure (Core, Extended, Virtual teams)
- Roles and responsibilities breakdown
- First-line vs second-line support model
- Resource requirements (5-12 FTE)
- Governance and escalation framework
- **Critical Role**: ACC as single point of contact with Swiss-AS

### Monitoring & Observability

**[[Page - AMOS Monitoring Features]]** | [[+Attachments/13_AMOSmonitoring.pdf|PDF Source]]
- AMOSmonitoring tool capabilities
- Real-time system health dashboards
- Performance metrics and KPIs
- Alerting and notification mechanisms
- User activity monitoring and analytics
- Control Centre module features
- **Feature**: Proactive issue detection and resolution

### Maintenance & Support SLAs

Referenced in **[[Page - AMOS Support Tool User Guide]]** | [[+Attachments/10_AMOS Maintenance_Support _SLAs.pdf|SLA PDF]]
- **5 Severity Levels** with defined response/resolution times
- Severity 1: 4h response, 10h resolution (production halt)
- Severity 2: 6h response, 2 days resolution
- 24/7 Emergency Hotline for critical issues
- Standard vs AOS (AMOS Operational Services) tiers
- Release support lifecycle (2 major releases/year)

---

## Training & Enablement

### Training Strategy & Overview

**[[Page - AMOS Training Executive Summary]]** | [[+Attachments/16_AMOS_ Training_Executive Summary.pdf|PDF Source]]
- High-level training approach and philosophy
- Blended learning model (WBT + instructor-led)
- Training delivery options (virtual, on-site)
- Audience types (End User, Key User, Train-the-Trainer)
- Training governance and success metrics
- **Key Decision**: TTT vs external training cost-benefit

**[[Page - AMOS Training Catalogue]]** | [[+Attachments/30_AMOS Training Catalogue V25.6.pdf|PDF Source]]
- Complete course catalogue (50+ courses)
- Training modules by functional area
- Duration and prerequisites for each course
- E-Learning (WBT) modules
- Role-based training pathways (Engineering, Maintenance, Supply Chain, Finance)
- Training budget estimates (£5.5M-£6.5M for BA)
- Resource requirements (20-30 training team members)
- **Critical Detail**: 15,000-30,000 total training days needed for BA

### Train-the-Trainer Programme

**[[Page - AMOS Train The Trainer Certification]]** | [[+Attachments/17_AMOS_Training_TrainThe Trainer.pdf|PDF Source]]
- TTT methodology and certification process
- Internal trainer selection criteria
- TTT course structure (module + tutorials, typically 2x duration)
- Quality assurance and trainer evaluation
- Ongoing trainer support and refresher training
- ROI analysis (breaks even after 4-5 cohorts)
- **Recommendation**: Invest in TTT for high-volume modules

---

## Implementation & Governance

### Project Roles & Responsibilities

**[[Page - AMOS Project Roles & Responsibilities]]** | [[+Attachments/29_AMOS Project Roles&Responsibilities.pdf|PDF Source]]
- 13 critical implementation roles defined
- Organisational structure and reporting relationships
- RACI framework for decision-making
- Resource requirements (35-47 people, 25-30 FTE equivalent)
- Time commitments per role
- Customer vs Swiss-AS responsibilities
- Budget implications (£4.3M-£7.6M for customer team over 18 months)
- **Critical Roles**: Overall PM, AMOS Functional Administrator, Data Transfer Responsible

---

## Data & Migration

### Data Migration Methodology

**[[Page - AMOS Data Migration Methodology]]** | [[+Attachments/28_AMOS_DataMigration_Apr2025.pdf|PDF Source]]
- 6-step ETL cycle (Extraction → Cleansing → Transformation → X-File → Loading → Validation)
- Data migration tools (APN 261, Talaxie DI)
- Project schedule (4+ iterations, 7-9 months typical)
- 48-hour cutover strategy
- Data quality plan (Completeness, Validity, Consistency, Integrity)
- Team structure (Customer Data Team, Swiss-AS Data Team, Customer Tech Team, Swiss-AS Tech Team)
- Phased loading (Static → Semi-static → Dynamic data)
- **Critical Path**: Data migration often determines go-live date

---

## Product Strategy & Innovation

### Product Roadmap

**[[Page - AMOS Product Roadmap]]** | [[+Attachments/24_AMOS Product Roadmap.pdf|PDF Source]]
- **Short-term** (6-12 months): Flutter Phase 1, SCIM, GenAI "Amy", OData APIs Phase 1
- **Mid-term** (2 years): Complete OData API, CheerpJ browser, AMOScloud Ultra HA, Enhanced GenAI
- **Long-term** (5+ years): Flutter unification, AMOShub marketplace maturity, Multi-cloud, Advanced AI
- Technology evolution (Flutter, OData, GenAI, Cloud-native)
- Migration timelines and strategies
- **Key Bets**: Flutter for UI, OData for integration, GenAI for intelligence

### Customer Prioritisation Mechanism

**[[Page - AMOS Chips Prioritisation Mechanism]]** | [[+Attachments/27_AMOS_Chips.pdf|PDF Source]]
- AMOS Chips voting system concept
- Customer influence on product roadmap via chip allocation
- Collaborative prioritisation (multiple customers = higher priority)
- Change request types (Wishes vs Requests for Extension/Modification)
- Priority algorithm factors (benefit, risk, complexity, age, chips, collaboration)
- Best practices for strategic chip allocation
- **Strategic Opportunity**: BA can influence AMOS roadmap

---

## Compliance & Security

### Data Protection & Privacy

**[[Page - AMOS GDPR Compliance]]** | [[+Attachments/21_AMOS_GDPR.pdf|PDF Source]]
- GDPR compliance features and built-in tools
- Data Subject Access Request (DSAR) workflow
- Right to erasure / anonymisation capabilities
- Consent management and tracking
- Data retention policies and automation
- Personal data categories and processing
- UK GDPR and Data Protection Act 2018 alignment
- SOX compliance features
- **Critical**: UK data residency post-Brexit

---

## Decision Support & Evaluation

### Gap Analysis for BA

**[[Page - AMOS Gap Analysis for BA]]**
- Comprehensive 5-dimensional gap analysis framework
- **Functional Analysis** (85% coverage, Low-Medium severity)
  - Core MRO capabilities well-covered
  - BA-specific workflows need configuration
  - Minor customisation requirements identified
- **Technical Analysis** (75% coverage, Medium severity)
  - Architecture sound but AWS alignment needed
  - OData API maturity gap (2-year roadmap)
  - Database platform preference (PostgreSQL vs Oracle)
- **Integration Analysis** (40% coverage, Medium-High severity)
  - SAP integration patterns unknown
  - ODIE connectivity needs validation
  - API ecosystem strong but key BA integrations unconfirmed
- **Operational Analysis** (80% coverage, Low-Medium severity)
  - ACC setup and UK support planning required
  - Strong operational model foundation
  - Resource requirements well-documented
- **Commercial Analysis** (90% coverage, Low-Medium severity) ✅ **RESOLVED**
  - ✅ **Budgetary figures provided**: CHF 4.72M-5.26M for 3 implementation options
  - ✅ **Clear licensing model**: Per-user (2,400-4,821 productive users) + concurrent (1,000)
  - ✅ **24-month timeline**: April 2026 → April 2028
  - ✅ **Staffing requirements**: 123-155 BA staff, 15-20 Key-Users (full-time)
  - 🟡 **Steady-state costs**: Annual license/support fees need commercial negotiation
- **4 High-Severity Gaps** requiring resolution before selection:
  1. AWS deployment timeline uncertain
  2. SAP integration patterns unknown
  3. ODIE integration capability unconfirmed
  4. ~~Pricing and commercial terms missing~~ ✅ **RESOLVED** (budgetary figures received)
  5. ~~TCO model incomplete~~ ✅ **RESOLVED** (implementation costs defined; steady-state estimable)
  6. ~~Training cost uncertainty~~ ✅ **RESOLVED** (CHF 910K-962K for Swiss-AS training delivery)
- **20 Recommendations** across 3 phases (Immediate, Pre-Decision, Post-Decision)
- **Decision Framework** with go/no-go criteria
- **Risk Assessment** with alternative scenarios
- **4 Appendices**: BA Requirements, Integration Requirements, Risk Register, Scoring Matrix

**Use Cases**:
- Executive decision-making for Axia programme
- Risk assessment and mitigation planning
- Commercial negotiation preparation
- Technical validation planning

---

## Alphabetical Index

### A
- **APIs** → [[Page - AMOShub APIs Marketplace]], [[Page - AMOS System Architecture & Roadmap]]
- **Architecture** → [[Page - AMOS System Architecture & Roadmap]]

### B
- **Budgetary Analysis** → [[Page - AMOS Implementation Budgetary Analysis]]
- **Budget** → [[Page - AMOS Implementation Budgetary Analysis]]

### C
- **Chips** → [[Page - AMOS Chips Prioritisation Mechanism]]
- **Commercial** → [[Page - AMOS Implementation Budgetary Analysis]]
- **Competence Centre** → [[Page - AMOS Competence Centre Overview]]
- **Compliance** → [[Page - AMOS GDPR Compliance]]
- **Costs** → [[Page - AMOS Implementation Budgetary Analysis]]

### D
- **Data Migration** → [[Page - AMOS Data Migration Methodology]]

### G
- **Gap Analysis** → [[Page - AMOS Gap Analysis for BA]]
- **GDPR** → [[Page - AMOS GDPR Compliance]]
- **Go-Live** → [[Page - AMOS Go-Live Readiness Framework]]
- **Governance** → [[Page - AMOS Project Organization & Governance]]

### I
- **Implementation** → [[Page - AMOS Implementation Methodology & Timeline]], [[Page - AMOS Project Roles & Responsibilities]], [[Page - AMOS Project Organization & Governance]]
- **Integration** → [[Page - AMOShub APIs Marketplace]]

### L
- **Load Testing** → [[Page - AMOS Load and Performance Test Report]]

### M
- **Marketplace** → [[Page - AMOShub APIs Marketplace]]
- **Methodology** → [[Page - AMOS Implementation Methodology & Timeline]]
- **Migration** → [[Page - AMOS Data Migration Methodology]]
- **Monitoring** → [[Page - AMOS Monitoring Features]]

### O
- **Organization** → [[Page - AMOS Project Organization & Governance]]

### P
- **Performance** → [[Page - AMOS Load and Performance Test Report]]
- **Pricing** → [[Page - AMOS Implementation Budgetary Analysis]]
- **Prioritisation** → [[Page - AMOS Chips Prioritisation Mechanism]]
- **Product Roadmap** → [[Page - AMOS Product Roadmap]]
- **Project Roles** → [[Page - AMOS Project Roles & Responsibilities]]

### R
- **Readiness** → [[Page - AMOS Go-Live Readiness Framework]]
- **Roadmap** → [[Page - AMOS Product Roadmap]]
- **Roles** → [[Page - AMOS Project Roles & Responsibilities]]

### S
- **Staffing** → [[Page - AMOS Project Organization & Governance]]
- **Support** → [[Page - AMOS Support Tool User Guide]]
- **System Architecture** → [[Page - AMOS System Architecture & Roadmap]]

### T
- **Timeline** → [[Page - AMOS Implementation Methodology & Timeline]]
- **Training** → [[Page - AMOS Training Executive Summary]], [[Page - AMOS Training Catalogue]], [[Page - AMOS Train The Trainer Certification]]
- **Train-the-Trainer** → [[Page - AMOS Train The Trainer Certification]]

---

## All AMOS Page Notes

### Complete Documentation Set

**Commercial & Implementation Planning** (NEW - January 2026):
1. **[[Page - AMOS Implementation Budgetary Analysis]]** - 3 costing scenarios (CHF 4.72M-5.26M), TCO comparison, Option 2 recommended
2. **[[Page - AMOS Implementation Methodology & Timeline]]** - 24-month timeline (Apr 2026→Apr 2028), 5 phases, 5 work-streams
3. **[[Page - AMOS Go-Live Readiness Framework]]** - 120 criteria, GO/GOIF/NOGO assessment, T-4 weeks and T-5 days gates
4. **[[Page - AMOS Project Organization & Governance]]** - 123-155 BA staff, 15-20 Key-Users (full-time), governance structure

**System & Technical Documentation**:
5. **[[Page - AMOS System Architecture & Roadmap]]** - Platform architecture and technology stack
6. **[[Page - AMOS Load and Performance Test Report]]** - Scalability validation (50,000 users)
7. **[[Page - AMOS Support Tool User Guide]]** - APN 261 support workflow
8. **[[Page - AMOS Competence Centre Overview]]** - ACC organisational model
9. **[[Page - AMOS Monitoring Features]]** - AMOSmonitoring capabilities
10. **[[Page - AMOShub APIs Marketplace]]** - Integration ecosystem vision

**Training & Enablement**:
11. **[[Page - AMOS Training Executive Summary]]** - Training strategy overview
12. **[[Page - AMOS Train The Trainer Certification]]** - TTT methodology
13. **[[Page - AMOS Training Catalogue]]** - 50+ courses and role pathways

**Compliance & Data**:
14. **[[Page - AMOS GDPR Compliance]]** - Data protection and privacy
15. **[[Page - AMOS Data Migration Methodology]]** - ETL and 48h cutover

**Strategy & Governance**:
16. **[[Page - AMOS Product Roadmap]]** - 3-horizon technology roadmap
17. **[[Page - AMOS Chips Prioritisation Mechanism]]** - Customer voting system
18. **[[Page - AMOS Project Roles & Responsibilities]]** - 13 implementation roles

**Decision Support**:
19. **[[Page - AMOS Gap Analysis for BA]]** - 5-dimensional evaluation (v0.2 with commercial data integrated)

---

## Related Meetings & Decisions

### Discovery & Evaluation Meetings

```dataview
TABLE date as "Date", summary as "Summary"
FROM "+"
WHERE type = "Meeting" AND contains(file.name, "AMOS")
SORT date DESC
LIMIT 20
```

### Architecture Decisions

```dataview
TABLE status, description
FROM ""
WHERE type = "Adr" AND (contains(tags, "AMOS") OR contains(tags, "EWS") OR contains(tags, "Axia"))
SORT file.name ASC
```

---

## Key Statistics & Facts

### Commercial & Implementation (NEW - January 2026)

| Aspect | Details |
|--------|---------|
| **Implementation Cost** | CHF 4.72M - 5.26M (3 options) |
| **Recommended Option** | Option 2 (All-in-AMOS): CHF 5.26M |
| **Timeline** | 24 months (April 2026 → April 2028) |
| **User Licensing** | 2,400-4,821 productive users + 1,000 concurrent |
| **BA Staffing Required** | 123-155 staff for 24 months |
| **Key-Users (Critical)** | 15-20 full-time for 24 months (non-negotiable) |
| **Business SMEs** | 50-60 part-time (50%) for 18 months |
| **Train-the-Trainers** | 30-40 part-time for 6 months |
| **Swiss-AS Consultants** | 8 consultants (PM, Lead, Technical, etc.) |
| **Swiss-AS Man-Days** | 2,469-2,713 man-days total |
| **Swiss-AS Service Rates** | Consulting: CHF 1,920/day, Training: CHF 2,600/day, Go-Live: CHF 1,520/day |
| **Go-Live Readiness** | 120 criteria across 5 work-streams, GO/GOIF/NOGO assessment |
| **Target Go-Live** | April 2028 |
| **TCO (Estimated)** | Implementation: CHF 4.72M-5.26M + BA Staff: £4.3M-£7.6M + ACC ongoing: £500K-£1.2M/year |

### System Capabilities
| Metric | Value |
|--------|-------|
| **Concurrent Users Tested** | 50,000 |
| **Transaction Types** | 35+ core operations |
| **APIs Available** | 300+ |
| **Supported Databases** | PostgreSQL, Oracle, SAP Sybase |
| **Cloud Platforms** | AWS, GCP, Azure (planned) |
| **Mobile Platforms** | iOS, Android, PWA |
| **Integration Tiers** | 5-tier API architecture |

### Support & Service
| Aspect | Details |
|--------|---------|
| **Release Cadence** | 2 major releases per year |
| **Support Period** | Min 1 year per release |
| **Emergency Response** | 4 hours (Severity 1) |
| **Target Resolution** | 10 hours (Severity 1) |
| **Support Hours** | 24/7 emergency, 8-5 CET standard |
| **Service Tiers** | Standard + AOS premium |

### Technology Stack
| Component | Technology |
|-----------|-----------|
| **Programming** | Java (OpenJDK 21), Dart (Flutter) |
| **Database** | PostgreSQL, Oracle, SAP Sybase |
| **Frontend** | Flutter (migrating), Vaadin, Swing |
| **Cloud** | Google Cloud, AWS, Azure |
| **Integration** | REST, SOAP, XML, JSON, OData |
| **AI/ML** | Google Gemini ("Amy" assistant) |

---

## Integration Ecosystem

### Flight Operations Systems
- NetLine/Ops++
- AIMS
- Sabre
- LIDO
- ACARS

### OEM Systems
- **Boeing**: IMM, Toolbox, EDMS, MPD
- **Airbus**: AMI, Skywise
- **Engine**: GE Aviation, Rolls-Royce
- **Aircraft**: Embraer, ATR

### Enterprise Systems
- SAP (ERP, BTP)
- Oracle
- Sage
- Agresso

### Aviation Software
- FLYdocs (document management)
- AeroExchange (parts exchange)
- EFPAC (engine fleet planning)
- Lufthansa Technik (MRO services)
- AVIATAR (predictive maintenance)
- OneAero

### BI & Analytics
- Tableau
- Power BI
- Qlik
- Looker
- Pentaho

---

## Standards Compliance

### Industry Standards
- **ATA Spec2000** - Chapters 11, 15, 16, 17 (parts, electronic logbook, certificates)
- **ATA Spec2500** - Aircraft transfer records
- **S1000D** - Technical publications
- **IATA SIS-M** - Billing standards

### Security & Compliance
- **ISO/IEC 27001:2022** - Information security management
- **GDPR** - EU data protection regulation
- **SOX** - Sarbanes-Oxley Act
- **eIDAS** - Electronic signatures (PAdES B-B, B-T, B-LT)
- **Data Sovereignty** - Various national data residency laws

---

## Evaluation Criteria for BA

### ✅ Strengths
1. **Cloud-native architecture** aligned with BA's cloud strategy
2. **Comprehensive API ecosystem** (300+ APIs) for enterprise integration
3. **Proven scalability** (50k users, 0% error rate)
4. **Modern technology stack** (OpenJDK 21, Flutter, PostgreSQL)
5. **Strong OEM integrations** (Boeing, Airbus)
6. **GDPR/SOX compliant** for regulated environments
7. **Multi-cloud support** prevents vendor lock-in
8. **GenAI capabilities** ("Amy" assistant)

### ⚠️ Considerations
1. **OData maturity**: Full exposure is 2-year roadmap item
2. **Database platform**: PostgreSQL primary vs BA's Oracle preference
3. **Cloud preference**: Heavily Google Cloud, BA standardizing on AWS
4. **Desktop migration**: Java/Swing to Flutter transition may impact timeline
5. **AMOShub ecosystem**: Long-term vision (5+ years)
6. **Browser client**: CheerpJ is interim "bridge technology"

### 🔍 Integration Questions for BA
1. **SAP Integration**: BTP, S/4HANA, Datasphere connectivity patterns?
2. **ODIE Compatibility**: Data integration with Olympus Data Integration Engine?
3. **AWS Deployment**: Timeline and support for AWS vs GCP?
4. **Data Migration**: Approach for legacy BA systems (LSAPL, etc.)?
5. **UK Data Residency**: Compliance with BA's UK/EU requirements?
6. **Performance at BA Scale**: Validation for BA's fleet size and operations?

---

## Related BA Projects

### Direct Relevance
- [[Project - Axia (was EWS Futures)]] - Primary evaluation project
- [[Project - ODIE Programme]] - Data platform integration requirements
- [[Project - Caerus]] - SAP to ODIE integration patterns
- [[Project - Cyber Uplift]] - Security and compliance standards
- [[ADR - AMOS Axia Programme Decision Log]] - Scope decisions and evaluation criteria

### Related Projects (Out of Scope)
- [[Project - MRO Pro Implementation]] - Separate initiative for 3rd party aircraft line maintenance (not Axia scope)

### Supporting Initiatives
- [[MOC - Axia Programme]] - Programme-level context
- [[Page - AMOS High Level Architecture Analysis]] - Technical analysis
- [[Page - AMOS - 2nd Meeting Transcript]] - Vendor discussions

---

## Document Inventory

### Page Notes Created from PDFs

| # | Page Note | PDF Source | Lines | Topic | Priority |
|---|-----------|------------|-------|-------|----------|
| **1** | [[Page - AMOS Implementation Budgetary Analysis]] | BA AMOS Budgetary Figures - Options 2, 3, 4 (3 PDFs, 120p total) | ~950 | **Commercial** | **Critical** |
| **2** | [[Page - AMOS Implementation Methodology & Timeline]] | BA AMOS Implementation RFI.pdf (66p) | ~1,200 | **Implementation** | **Critical** |
| **3** | [[Page - AMOS Go-Live Readiness Framework]] | Swiss-AS Go-Live Readiness Protocol.pdf (30p) | ~1,100 | **Implementation** | **Critical** |
| **4** | [[Page - AMOS Project Organization & Governance]] | Swiss-AS Project Management Plan + Guidebook (2 PDFs, 22p) | ~1,150 | **Implementation** | **Critical** |
| 5 | [[Page - AMOS System Architecture & Roadmap]] | 05_AMOS System Architecture & Roadmap.pdf (29p) | ~550 | Architecture | Critical |
| 6 | [[Page - AMOS Load and Performance Test Report]] | 04_AMOS load and performance test.pdf (14p) | ~520 | Performance | High |
| 7 | [[Page - AMOS Support Tool User Guide]] | 11_AMOS Support Tool.pdf | ~470 | Operations | Medium |
| 8 | [[Page - AMOS Competence Centre Overview]] | 12_AMOS Competence Center.pdf | ~480 | Support | Medium |
| 9 | [[Page - AMOS Monitoring Features]] | 13_AMOSmonitoring.pdf | ~450 | Operations | Medium |
| 10 | [[Page - AMOShub APIs Marketplace]] | 15_AMOShub_APIs marketplace.pdf + APIs List 07 (6p) | ~510 | Integration | Critical |
| 11 | [[Page - AMOS Training Executive Summary]] | 16_AMOS Training_Executive Summary.pdf | ~440 | Training | Medium |
| 12 | [[Page - AMOS Train The Trainer Certification]] | 17_AMOS_Training_TrainThe Trainer.pdf | ~460 | Training | Medium |
| 13 | [[Page - AMOS GDPR Compliance]] | 21_AMOS_GDPR.pdf | ~390 | Security | High |
| 14 | [[Page - AMOS Product Roadmap]] | 24_AMOS Product Roadmap.pdf | ~530 | Strategy | High |
| 15 | [[Page - AMOS Chips Prioritisation Mechanism]] | 27_AMOS_Chips.pdf | ~360 | Features | Medium |
| 16 | [[Page - AMOS Data Migration Methodology]] | 28_AMOS_DataMigration_Apr2025.pdf (26p) | ~680 | Implementation | High |
| 17 | [[Page - AMOS Project Roles & Responsibilities]] | 29_AMOS Project Roles&Responsibilities.pdf (7p) | ~490 | Implementation | Medium |
| 18 | [[Page - AMOS Training Catalogue]] | 30_AMOS Training Catalogue V25.6.pdf | ~920 | Training | Medium |
| 19 | [[Page - AMOS Gap Analysis for BA]] | N/A (Analysis document) | ~709 | Evaluation | Critical |

**Totals**: 19 Page notes, ~11,500 lines of comprehensive documentation, 23 PDF sources (238 pages)

**Legend**:
- **Critical** = Essential for architecture decision
- **High** = Important for evaluation
- **Medium** = Useful supporting information

### Additional Reference PDFs

| # | PDF | Topic | Status |
|---|-----|-------|--------|
| 02 | Single vs Multiple Environments | Configuration | Reference only |
| 06 | Supported Technical Publications | Documentation | Referenced in Architecture note |
| 08 | AMOScloud-HA-architecture.png | Architecture diagram | Referenced in Architecture note |
| 09 | Certificate ISO IEC 27001 2022 | Security certification | Referenced in GDPR note |
| 10 | Maintenance_Support_SLAs | Support levels | Referenced in Support Tool note |
| 14 | Software Development Life Cycle | SDLC process | Reference material |
| 18 | AMOScloud Backup Archiving | Infrastructure | Reference material |
| 19 | InformationSecurity@Swiss-AS | Security overview | Referenced in GDPR note |
| 20 | Penetration test evidence | Security testing | Referenced in Architecture note |
| 22 | LHG_Code_of_Conduct | Corporate policy | Reference material |
| 23 | Report Designer | Reporting tool | Reference material |
| 25 | Swiss-AS Testing Strategy | QA approach | Reference material |
| 26 | Quality Management at Swiss-AS | QA framework | Reference material |

---

## Quick Reference

### Emergency Contacts
- **AMOS Emergency Hotline**: 24/7 for Severity 1 cases
- **Standard Support**: Monday-Friday 8:00 AM - 5:00 PM CET
- **Email**: amos_support@swiss-as.com

### Key URLs
- **Vendor**: SWISS-AS.COM
- **Support Portal**: AMOS Online Support Tool

### Service Levels (Response → Resolution)
- **Severity 1** (Production Halt): 4h → 10h
- **Severity 2** (High Impact): 6h → 2 days
- **Severity 3** (Medium Impact): 2 days → 4 weeks
- **Severity 4** (Low Impact): 5 days → 12 weeks
- **Severity 5** (Enhancement): 10 days → Scheduled

---

## Navigation

**Parent**: [[MOC - Axia Programme]]
**Project**: [[Project - Axia (was EWS Futures)]]
**Organisation**: [[Organisation - Swiss Aviation Software]]

**Related MOCs**:
- [[Dashboard - Dashboard]] - Main hub
- [[MOC - Projects MOC]] - All projects
- [[MOC - ADRs MOC]] - Architecture decisions
- [[MOC - Axia Programme]] - EWS Futures programme
- [[MOC - Engineering Projects]] - Engineering teams
- [[MOC - Technology & Architecture MOC]] - Technical platforms
- [[MOC - Weblinks MOC]] - External resources

---

## Document Maintenance

**Last Updated**: 2026-01-07
**Reviewer**: BA Solutions Architect Team
**Status**: ✅ **Commercial clarity achieved** - budgetary figures, timeline, and staffing defined
**Documentation Coverage**: 19 Page notes created from 23 PDFs (238 pages) + gap analysis (~11,500 lines)

### Next Actions

**✅ COMPLETED**:
- ✅ Complete gap analysis (AMOS capabilities vs BA requirements) - **v0.2 with commercial data**
- ✅ Receive budgetary figures and implementation costs - **CHF 4.72M-5.26M across 3 options**
- ✅ Define implementation timeline - **24 months (April 2026 → April 2028)**
- ✅ Identify staffing requirements - **123-155 BA staff, 15-20 Key-Users**
- ✅ Establish go-live readiness framework - **120 criteria, GO/GOIF/NOGO assessment**

**Technical Validation** (High Priority):
1. Schedule deep-dive sessions on API integration patterns with Swiss-AS
2. **Critical**: Request AWS deployment case studies and roadmap commitment
3. Validate SAP ERP, BTP, Datasphere integration patterns
4. Design ODIE integration architecture with Swiss-AS and ODIE team
5. Validate data residency compliance for UK operations post-Brexit
6. Validate performance benchmarks for BA scale (250+ aircraft, 3,000+ users)

**Commercial Refinement** (Medium Priority):
7. Refine TCO model with steady-state costs (Year 4-10) - implementation costs now defined
8. Negotiate annual license and support fees for ongoing operations
9. Clarify DDC (Dedicated Competence Centre) value proposition
10. Define contractual terms and exit strategy

**Business Analysis** (High Priority):
11. Define final evaluation criteria and decision framework (3 AMOS options + alternatives)
12. Engage stakeholders (Engineering, IT, Finance, Operations) for budgetary approval
13. Present commercial case to Axia Steering Committee
14. Secure executive commitment for 15-20 full-time Key-Users (24 months)

**Programme Alignment**:
9. Align AMOS evaluation with Axia programme timeline
10. Coordinate with ODIE programme for data integration strategy
11. Review with Project Caerus team for SAP integration patterns
12. Engage Cyber Uplift team for security compliance validation

---

## Tags & Cross-References

#MOC #AMOS #swiss-aviation-software #MRO #aviation #knowledge-base #Axia #EWS-futures #engineering #maintenance #system-architecture #training #implementation

**Related MOCs**:
- [[MOC - Axia Programme]]
- [[MOC - Projects MOC]]
- [[MOC - ADRs MOC]]
- [[MOC - Engineering Projects]]

**Related Organisations**:
- [[Organisation - Swiss Aviation Software]]
- [[Organisation - BA]]

**Maintained by**: BA Digital Engineering Architecture Team