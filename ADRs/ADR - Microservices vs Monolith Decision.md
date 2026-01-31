---
type: ADR
pillar: event
title: Microservices vs Monolith Decision
description: Initial decision to adopt microservices architecture (superseded by modular monolith approach)
status: superseded
adrType: Architecture_ADR
created: 2024-03-01
modified: 2025-06-15
tags:
  - type/adr
  - activity/architecture
  - domain/platform
  - status/deprecated
deciders:
  - Architecture Team
  - Engineering Leadership
approvers:
  - CTO
  - Engineering Director
  - Technical Architect
project: "[[Project - Legacy System Decommission]]"
jiraTicket: null

# ADR Relationships
relatedTo:
  - "[[Project - Legacy System Decommission]]"
supersedes: []
dependsOn: []

# Relationships
nodeRelationships: []
entityRelationships:
  - "[[Person - Jane Smith]]"

# Quality
summary: Original decision to decompose monolithic application into microservices. Superseded after discovering premature decomposition led to operational complexity without corresponding benefits.
keywords: [microservices, monolith, architecture-patterns, decomposition]
confidence: medium
freshness: stale
source: primary
verified: true
reviewed: 2025-06-15
---

# ADR - Microservices vs Monolith Decision

> **Architecture Decision Record** - Original microservices decision (SUPERSEDED - See below)

---

## Status

**~~Accepted~~ → SUPERSEDED** - 2025-06-15

**Superseded By:** ADR - Adopt Modular Monolith Architecture (June 2025)

**Original Approval:** 2024-03-15
**Superseded Date:** 2025-06-15
**Category**: architecture

**Why Superseded:**
After 15 months of implementation, we discovered that our team size, domain understanding, and operational maturity were insufficient for the complexity introduced by microservices. We experienced significant challenges with distributed debugging, data consistency, deployment coordination, and operational overhead that outweighed the intended benefits.

**Current Recommendation:** See ADR - Adopt Modular Monolith Architecture for the new approach.

---

## Historical Context

_This ADR is preserved for historical reference and to document lessons learned. The decision below was valid at the time but has been superseded by new learnings._

### Background (March 2024)

We had a 10-year-old monolithic e-commerce application (Customer Order Management System - COMS) that had grown to 500,000 lines of code. The application was becoming increasingly difficult to maintain and deploy.

**Business Problem:**

- Long deployment cycles (monthly releases taking 8+ hours)
- Tight coupling made changes risky
- Scaling required scaling entire application
- Development bottlenecks from shared codebase
- Difficult to adopt new technologies

**Original Technical Context:**

- Monolithic Java application with 500K LOC
- Single PostgreSQL database
- 5 development teams working on same codebase
- Average 30-minute build time
- Monthly deployments with high failure rate (40%)

### Original Problem Statement (March 2024)

We needed an architecture that:

- Enabled independent deployment of features
- Allowed teams to work autonomously
- Supported scaling specific components
- Reduced deployment risk
- Enabled technology diversity

---

## Original Decision (March 2024)

**We will decompose the monolithic COMS application into microservices organized around business capabilities.**

**Original Rationale:**

1. **Team Autonomy**: Each team owns end-to-end service lifecycle
2. **Independent Deployment**: Deploy services independently, reduce release coordination
3. **Technology Flexibility**: Use appropriate technology for each service
4. **Scalability**: Scale high-load services independently
5. **Industry Best Practice**: Following successful patterns from Netflix, Amazon, etc.

**Planned Decomposition:**

1. Order Service
2. Inventory Service
3. Customer Service
4. Notification Service
5. Payment Service

---

## What We Actually Experienced (2024-2025)

### Challenges Encountered

**Operational Complexity (Severe):**

- Went from deploying 1 application to managing 5+ services
- Distributed debugging extremely difficult
- Needed new tooling: service mesh, distributed tracing, centralized logging
- On-call burden increased dramatically (5 services to monitor vs 1)

**Performance Issues (Moderate):**

- Network latency between services degraded response times
- What was a single database query became multiple service calls
- Increased infrastructure costs (5 deployments vs 1)

**Data Consistency Challenges (Severe):**

- Distributed transactions proved very complex
- Eventually consistent data led to bugs
- Compensating transactions added significant complexity

**Development Velocity (Negative Impact):**

- Features spanning multiple services took longer to develop
- API versioning complexity
- Contract testing overhead
- More coordination needed between teams (not less!)

**Team Challenges:**

- Steep learning curve for distributed systems patterns
- Insufficient operations expertise for microservices
- Small team size (15 engineers) spread too thin

### Actual Results After 15 Months

| Metric                | Monolith (Before) | Microservices (After) | Target  | Status                 |
| --------------------- | ----------------- | --------------------- | ------- | ---------------------- |
| Deployment Frequency  | Monthly           | Weekly per service    | Daily   | ❌ Missed              |
| Deployment Time       | 8 hours           | 30 min per service    | 15 min  | ❌ Worse overall       |
| Incident Rate         | 2/month           | 8/month               | 1/month | ❌ Significantly worse |
| Mean Time to Recovery | 2 hours           | 4 hours               | 30 min  | ❌ Worse               |
| Development Velocity  | Baseline          | -30%                  | +50%    | ❌ Significantly worse |
| Infrastructure Cost   | $15K/month        | $35K/month            | $15K    | ❌ 133% increase       |

---

## Lessons Learned

### What Went Wrong

1. **Premature Decomposition**: We didn't understand our domain boundaries well enough
2. **Team Size**: 15 engineers too small to support 5 independent services
3. **Operational Immaturity**: Lacked tooling and expertise for distributed systems
4. **Wrong Problem**: Our monolith problem was modularity, not deployment unit size
5. **Industry Cargo Cult**: Copied Netflix/Amazon patterns without their context (100s of engineers, mature ops)

### What Went Right

1. **Learning Experience**: Team now understands microservices complexity firsthand
2. **Better Modularity**: Effort to decompose improved our domain modeling
3. **Modern Practices**: Adopted CI/CD, containerization, monitoring (still valuable)
4. **Database Separation**: Separated databases (kept this, but services merged)

### Key Insights

**Microservices are not inherently better** - They trade monolith complexity for distributed system complexity. This trade only makes sense when:

- Team is large enough (50+ engineers as rule of thumb)
- Operational maturity is high (SRE team, advanced monitoring, etc.)
- Domain boundaries are stable and well-understood
- Independent scaling is genuinely needed
- Organization structure benefits from autonomy

**For our context:** A well-modularized monolith would have solved our actual problems (modularity, build times, deployment risk) without introducing microservices complexity.

---

## Superseding Decision

**New Approach (June 2025):** Modular Monolith Architecture

**What Changed:**

- Merged 5 microservices back into single deployable unit
- Retained strong module boundaries (from microservices decomposition)
- Kept separate databases but accessed via module boundaries
- Maintained containerization and modern CI/CD
- Focused on monorepo with clear module ownership

**Results After 6 Months:**

- Incident rate decreased from 8/month to 1/month
- MTTR improved from 4 hours to 45 minutes
- Development velocity recovered (+20% vs original monolith)
- Infrastructure costs reduced to $18K/month
- Deployment time: 20 minutes for entire system
- Team morale significantly improved

---

## Historical References

**Original Approval:**

- ✅ Former CTO - 2024-03-10
- ✅ Engineering Director - 2024-03-12
- ✅ Technical Architect - 2024-03-15

**Superseding Decision:**

- ✅ [[Jane Smith]] - Head of Architecture - 2025-06-10
- ✅ Engineering Director - 2025-06-12
- ✅ Development Teams - 2025-06-15

---

## Recommendations for Others

**Before choosing microservices, ask:**

1. Do we have 50+ engineers? (If no, probably don't need microservices)
2. Is our operations maturity high? (Monitoring, observability, incident response)
3. Do we have stable, well-understood domain boundaries?
4. Do we need independent deployment more than we need simplicity?
5. Can we afford 2-3x infrastructure and operational costs?

**If answered "no" to any:** Consider modular monolith first. You can always extract microservices later when the need and capability exist.

**Remember:** Microservices are an optimization for organizational scaling, not a default architecture choice.

---

## Related

**Project:** [[Project - Legacy System Decommission]]

**Superseded By:**

- ADR - Adopt Modular Monolith Architecture (June 2025)

**Related Documentation:**

- "Our Microservices Journey: What We Learned" (blog post)
- Incident retrospectives 2024-2025
- Architecture decision timeline

---

## Revision History

| Version | Date       | Description                                 | Author            |
| ------- | ---------- | ------------------------------------------- | ----------------- |
| 1.0     | 2024-03-01 | Initial draft                               | Architecture Team |
| 2.0     | 2024-03-15 | Approved                                    | Former CTO        |
| 3.0     | 2025-06-15 | Marked as superseded, added lessons learned | [[Jane Smith]]    |

---

## Review

**Status:** Superseded - No further reviews needed

**Historical Value:** This ADR serves as important organizational memory of lessons learned and decision evolution.
