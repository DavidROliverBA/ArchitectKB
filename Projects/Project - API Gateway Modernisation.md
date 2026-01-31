---
type: Project
title: API Gateway Modernization
created: 2025-11-15
modified: 2026-01-07
tags: [project/api-modernization, domain/integration, technology/graphql]
status: active
priority: medium
start-date: 2025-11-15
end-date: 2026-04-30
category: Platform Engineering
---

# API Gateway Modernisation

## Overview

Replace ageing API gateway infrastructure with a modern GraphQL-based API layer. This project will consolidate multiple REST APIs, improve developer experience, and enable better API governance.

**Problem Statement:**
The current API landscape is fragmented with 15+ REST APIs, inconsistent authentication, no rate limiting, and poor documentation. This creates friction for internal teams and external partners.

## Objectives

- Implement unified GraphQL API gateway
- Consolidate authentication and authorisation
- Improve API documentation and developer portal
- Establish API versioning and lifecycle management
- Reduce API response times by 40%

## Key Stakeholders

- **Project Sponsor:** Head of Platform Engineering
- **Technical Lead:** [[Alex Johnson]] - Senior Software Engineer
- **API Architect:** Solutions Architecture Team
- **Development Teams:** 4 internal teams consuming APIs

## Timeline

**Start Date:** 2025-11-15
**Target Date:** 2026-04-30
**Status:** Active - Planning Phase

**Milestones:**
- [x] Phase 1: Technology Selection (Completed Dec 2025)
- [ ] Phase 2: PoC Development (In Progress - Jan 2026)
- [ ] Phase 3: Migration Planning (Planned - Feb 2026)
- [ ] Phase 4: Incremental Rollout (Planned - Mar-Apr 2026)

## Current Focus

**This Month (January 2026):**
- Completing GraphQL PoC with 2 existing REST APIs
- Evaluating Apollo Federation vs Schema Stitching
- Designing authentication/authorization model

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

## Technical Approach

**Selected Technology:**
- GraphQL with Apollo Server
- OAuth 2.0 + JWT for authentication
- Redis for caching
- DataDog for observability

**Migration Strategy:**
- Phased approach with API versioning
- GraphQL gateway wraps existing REST APIs initially
- Gradual migration of backend services to native GraphQL

## Notes

**2026-01-07:** PoC demonstrating 50% reduction in data over-fetching. Development teams enthusiastic about type safety and introspection.

**2025-12-20:** [[ADR - Adopt GraphQL for API Layer]] approved by architecture board.

**2025-11-15:** Project kickoff. Team aligned on goals and constraints.
