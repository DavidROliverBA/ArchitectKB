---
type: Project
pillar: event
title: Cloud Migration
created: 2025-09-01
modified: 2026-01-07
tags:
  [
    project/cloud-migration,
    domain/cloud,
    domain/infrastructure,
    activity/modernisation,
  ]
status: active
priority: high
timeFrame: 2025-09-01 - 2026-06-30
collections: Digital Transformation
transformationType: migration
transformationScope: enterprise
aiInvolved: false
nodeRelationships: []
entityRelationships:
  - "[[Person - Jane Smith]]"
  - "[[Person - Alex Johnson]]"
  - "[[Person - Dr Sarah Chen]]"
  - "[[Organisation - CloudVendor Inc]]"

# Quality
summary: Strategic initiative to migrate on-premises workloads to AWS cloud infrastructure
confidence: high
freshness: current
verified: false
reviewed: null
---

# Cloud Migration

## Overview

Strategic initiative to migrate on-premises workloads to AWS cloud infrastructure. This project aims to improve scalability, reduce infrastructure costs, and enable faster deployment cycles.

**Business Drivers:**

- Aging datacenter hardware requiring replacement
- Need for improved disaster recovery capabilities
- Pressure to accelerate time-to-market for new features
- Cost reduction targets from operations

## Objectives

- Migrate 80% of production workloads to AWS by Q2 2026
- Achieve 30% reduction in infrastructure operating costs
- Improve deployment frequency from monthly to weekly
- Establish cloud center of excellence
- Implement Infrastructure-as-Code for all cloud resources

## Key Stakeholders

- **Project Sponsor:** [[Jane Smith]] - Head of Architecture
- **Technical Lead:** [[Alex Johnson]] - Senior Software Engineer
- **External Consultant:** [[Dr. Sarah Chen]] - CloudVendor Inc
- **Business Owner:** Finance & Operations Director
- **Security Lead:** CISO Office

## Timeline

**Start Date:** 2025-09-01
**Target Date:** 2026-06-30
**Status:** Active - On Track

**Milestones:**

- [x] Phase 1: Assessment & Planning (Completed Oct 2025)
- [x] Phase 2: Landing Zone Setup (Completed Nov 2025)
- [ ] Phase 3: Application Migration (In Progress - Jan 2026)
- [ ] Phase 4: Data Migration (Planned - Mar 2026)
- [ ] Phase 5: Cutover & Optimization (Planned - May 2026)

## Current Focus

**This Month (January 2026):**

- Migrating first production application (Customer Portal)
- Establishing monitoring and observability practices
- Training development teams on cloud-native patterns

## Related Tasks

```dataview
TABLE completed, priority, due
FROM ""
WHERE type = "Task" AND contains(project, this.file.name)
SORT completed ASC, priority ASC
```

## Meetings

```dataview
TABLE date, summary
FROM ""
WHERE type = "Meeting" AND contains(project, this.file.name)
SORT date DESC
```

## Architecture Decisions

```dataview
TABLE status, category
FROM ""
WHERE type = "Adr" AND contains(project, this.file.name)
SORT status ASC
```

## Risks & Issues

| Risk                             | Impact | Mitigation                              |
| -------------------------------- | ------ | --------------------------------------- |
| Legacy application dependencies  | High   | Phased migration with API gateway       |
| Skills gap in cloud technologies | Medium | Training program + external consultants |
| Data migration complexity        | High   | Comprehensive testing strategy          |

## Success Metrics

- Infrastructure cost reduction: Target 30%
- Deployment frequency: Target weekly
- Incident recovery time: Target < 1 hour
- Application performance: Maintain or improve

## Notes

**2026-01-07:** Customer Portal migration completed successfully. Performance metrics show 20% improvement in response times. Team confidence growing.

**2025-12-15:** Completed cloud readiness assessment. Identified 12 applications suitable for lift-and-shift, 8 requiring refactoring.

**2025-11-01:** AWS landing zone configured with multi-account structure following Well-Architected Framework.
