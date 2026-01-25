---
type: Adr
title: Adopt GraphQL for API Layer
description: Replace REST APIs with GraphQL to improve developer experience and reduce over-fetching
status: proposed
category: technology
tags:
  - ADR
  - activity/architecture
  - technology/graphql
  - technology/api
  - project/api-modernization
created: 2025-12-01
modified: 2026-01-07
deciders:
  - "[[Alex Johnson]]"
  - API Working Group
approvers:
  - Architecture Lead
  - API Platform Owner
  - Security Architect
  - Development Team Leads (4 teams)
relatedTo:
  - "[[Project - API Gateway Modernisation]]"
  - "[[Task - Review GraphQL ADR]]"
supersedes: []
dependsOn: []
confidence: medium
freshness: current
source: primary
verified: false
reviewed: 2026-01-07
summary: Adopt GraphQL as the standard API technology to consolidate fragmented REST APIs, improve developer experience, and enable more efficient data fetching
assumptions:
  - Development teams willing to learn GraphQL
  - Existing REST APIs can be wrapped initially before migrating to native GraphQL
  - Performance benefits justify migration effort
stakeholders:
  - Development Teams
  - Mobile Team
  - Web Team
  - Partner Integration Team
project: "[[Project - API Gateway Modernisation]]"
externalRef:
---

# ADR - Adopt GraphQL for API Layer

> **Architecture Decision Record** - Proposing GraphQL adoption for unified API layer.

---

## Status

**Proposed** - 2026-01-07

**Category**: technology

**Workflow Progress:**
1. ✅ Draft ADR Content
2. ✅ Technical PoC Completed
3. ⏳ Stakeholder Review (In Progress)
4. ⏳ Architecture Board Approval (Scheduled Jan 15, 2026)
5. ⏳ Implementation Planning

**Next Steps:**
1. **Present to Architecture Board** (Jan 15, 2026)
2. **Address stakeholder concerns** from development teams
3. **Finalize migration strategy** if approved
4. **Update status** to "accepted" after approval

---

## Context

### Background

Our current API landscape consists of 15+ independent REST APIs developed by different teams over 5 years. This fragmentation creates significant challenges for consumer applications.

**Business Problem:**
- **Over-fetching**: Mobile apps download 3-5x more data than needed, impacting performance and data costs
- **Under-fetching**: Web app makes 8-12 round trips to render a single page
- **Inconsistency**: Each API has different authentication, error handling, and versioning approaches
- **Poor DX**: Developers spend excessive time integrating multiple APIs
- **Documentation Drift**: API documentation frequently out of sync with implementation

**Current Constraints:**
- Cannot break existing API consumers during migration
- Limited backend engineering capacity for large-scale refactoring
- Need to maintain backward compatibility
- Security and authorization must remain robust

**Technical Context:**
- 15 REST APIs serving web, mobile, and partner integrations
- 4 development teams maintaining different API surfaces
- Frontend teams frustrated with API complexity
- Average API response contains 60% unused data

### Problem Statement

We need an API layer that:
- Provides flexible data fetching (clients request exactly what they need)
- Offers strong typing and schema validation
- Enables better developer experience with introspection and tooling
- Consolidates authentication and authorization
- Reduces network overhead and improves performance
- Maintains backward compatibility during transition

**Key Challenges:**
- Team learning curve for GraphQL
- N+1 query problem and performance optimization
- Caching strategy for GraphQL queries
- Authorization at field level
- Migration path from existing REST APIs

**Requirements:**
- Must support real-time subscriptions for future use cases
- Strong typing for better IDE support and fewer runtime errors
- Compatible with existing authentication (OAuth 2.0 + JWT)
- Must integrate with current monitoring and observability tools
- Phased migration approach to minimize risk

---

## Decision

**We will adopt GraphQL with Apollo Server as our standard API technology, initially wrapping existing REST APIs before gradually migrating to native GraphQL resolvers.**

**Rationale:**
1. **Efficient Data Fetching**: Clients request exactly the data they need, eliminating over/under-fetching
2. **Strong Typing**: GraphQL schema provides type safety and better tooling support
3. **Single Endpoint**: Consolidates 15 REST endpoints into unified GraphQL API
4. **Developer Experience**: Introspection, GraphQL Playground, and IDE integration dramatically improve DX
5. **Versionless**: Schema evolution without versioning reduces maintenance burden
6. **Ecosystem**: Mature tooling (Apollo Client/Server, Relay, GraphQL Code Generator)

**Implementation Approach:**

**Phase 1: Foundation (Months 1-2)**
- Set up Apollo Server with basic configuration
- Implement authentication/authorization middleware
- Create GraphQL schema for 2 pilot endpoints
- Wrap existing REST APIs using data sources
- Deploy to staging environment

**Phase 2: Pilot (Months 3-4)**
- Migrate web app dashboard to use GraphQL (lowest risk)
- Measure performance improvements
- Gather developer feedback
- Refine patterns and best practices
- Document lessons learned

**Phase 3: Expansion (Months 5-8)**
- Gradually migrate remaining REST APIs to GraphQL wrappers
- Start implementing native GraphQL resolvers
- Migrate mobile apps to GraphQL
- Deprecate redundant REST endpoints (with 6-month notice)

**Phase 4: Optimization (Months 9-12)**
- Implement advanced features (subscriptions, federation)
- Optimize N+1 queries with DataLoader
- Implement field-level caching
- Complete migration of native resolvers

---

## Considered Alternatives

### Alternative 1: Continue with REST + OpenAPI

* **Description**: Improve existing REST APIs with better OpenAPI documentation and consolidation
* **Pros**:
  - No learning curve - team already knows REST
  - Mature patterns and tooling
  - Standard HTTP caching works well
  - Widely understood by all developers
* **Cons**:
  - Doesn't solve over/under-fetching problems
  - Still requires multiple round trips for complex UIs
  - Versioning burden continues
  - Limited flexibility for clients
* **Fit with requirements**: Addresses some issues but doesn't fundamentally improve data fetching

**Rejected Because:** REST's rigid structure cannot address core problems of over-fetching and multiple round trips. Incremental improvements insufficient for long-term goals.

### Alternative 2: gRPC

* **Description**: High-performance RPC framework using Protocol Buffers
* **Pros**:
  - Excellent performance with binary protocol
  - Strong typing with protobuf
  - Efficient network usage
  - Good for microservice communication
* **Cons**:
  - Poor browser support (requires grpc-web proxy)
  - Limited tooling for frontend developers
  - Not designed for flexible client queries
  - Steeper learning curve than GraphQL
* **Fit with requirements**: Great for backend services but poor fit for client-facing APIs

**Rejected Because:** gRPC excels at backend-to-backend communication but lacks the flexible querying capabilities needed for diverse client applications (web, mobile, partners).

### Alternative 3: OData

* **Description**: OASIS standard for RESTful APIs with query capabilities
* **Pros**:
  - RESTful with flexible querying
  - Industry standard (Microsoft ecosystem)
  - Mature specification
* **Cons**:
  - Limited adoption outside Microsoft stack
  - Complex query syntax
  - Smaller ecosystem than GraphQL
  - Less intuitive for frontend developers
* **Fit with requirements**: Provides query flexibility but lacks ecosystem and developer experience

**Rejected Because:** OData has limited industry momentum and inferior developer experience compared to GraphQL. Learning investment better spent on more widely adopted technology.

---

## Consequences

### Positive Impacts

* Reduced network traffic (estimated 50-70% reduction based on PoC)
* Faster frontend development (single API call vs multiple)
* Better type safety reduces runtime errors
* Improved mobile app performance (less data usage)
* Single authentication/authorization layer
* Self-documenting API via introspection

**Benefits:**
- Web app page load time reduced from 2.3s to 0.8s (PoC data)
- Mobile data usage reduced by 60% (PoC measurement)
- Frontend development velocity increase (estimated 30%)
- Unified API gateway simplifies security
- Better developer onboarding with GraphQL Playground

### Negative Impacts

* Learning curve for development teams (2-3 months)
* N+1 query problem requires careful optimization
* Caching more complex than REST
* Need new performance monitoring approach
* Initial slower development during learning phase
* Additional infrastructure for Apollo Server

**Drawbacks:**
- 3-month initial productivity dip during learning
- DataLoader pattern required for all resolvers
- Existing REST consumers require parallel maintenance
- Monitoring needs GraphQL-specific tooling
- Query complexity limits needed to prevent abuse
- Field-level authorization adds complexity

### Mitigation Strategies

* **Training Program**: 2-day GraphQL workshop for all developers + ongoing office hours
* **Performance**: Implement DataLoader pattern by default, query complexity analysis
* **Caching**: Adopt Apollo Client with normalized cache, CDN caching for persisted queries
* **Migration Risk**: Parallel run REST and GraphQL for 12 months minimum
* **Monitoring**: Adopt Apollo Studio for GraphQL-specific observability
* **Best Practices**: Create GraphQL style guide and schema design patterns

**Mitigations:**
- Hire external GraphQL consultant for initial setup ([[Dr. Sarah Chen]] recommended contact)
- Create reusable resolver templates and generators
- Implement automated schema linting
- Weekly GraphQL office hours for first 6 months
- GraphQL Code Generator for type-safe clients

---

## Compliance

### Security

- OAuth 2.0 + JWT authentication (existing system)
- Field-level authorization via custom directives
- Query depth and complexity limits to prevent DoS
- Rate limiting at API gateway level
- Input validation via GraphQL schema
- Audit logging for all mutations

### Standards Alignment

- Follows GraphQL specification (June 2018)
- Compatible with existing API security policies
- Aligns with industry best practices (Apollo recommendations)

### Audit and Traceability

- All schema changes tracked in Git
- Query logging via Apollo Studio
- Mutation audit trail in database
- Performance metrics tracked per query

---

## Production Implementation

### Deployment Approach

**Infrastructure:**
- Apollo Server running on Node.js in Kubernetes
- Deployed as part of [[ADR - Use Kubernetes for Container Orchestration]]
- Horizontal pod autoscaling (2-10 pods)
- Redis for DataLoader caching

**Rollout Strategy:**
1. Deploy Apollo Server to staging
2. Migrate internal dashboard (pilot)
3. Gradual rollout to 10% → 50% → 100% of users
4. Parallel run with REST APIs for 12 months
5. Deprecate REST endpoints with 6-month notice

### Operational Model

**API Team Responsibilities:**
- GraphQL schema governance and evolution
- Performance optimization and monitoring
- DataLoader implementation
- Security policy enforcement
- Breaking change management

**Development Team Responsibilities:**
- Implement GraphQL resolvers for their domains
- Write integration tests for resolvers
- Document domain-specific queries
- Monitor resolver performance

### Support and Maintenance

**Support Model:**
- API Platform team owns Apollo Server infrastructure
- [[Alex Johnson]] designated as GraphQL technical lead
- Domain teams own their resolvers
- Shared #graphql Slack channel for questions

**Maintenance:**
- Weekly schema review meetings
- Monthly performance optimization reviews
- Quarterly breaking change assessments

### Cost Model

**Additional Monthly Costs:**
- Apollo Server infrastructure: ~$200/month (Kubernetes resources)
- Apollo Studio (managed service): ~$500/month
- Training and consulting: ~$5,000 one-time
- **Total recurring: ~$700/month**

**Expected ROI:**
- Reduced mobile data costs for users
- Faster frontend development (30% velocity increase)
- Reduced API maintenance burden
- Better performance = improved user satisfaction

### Migration and Rollout

**Pilot Phase (Month 1-4):**
- Internal dashboard (100 daily users)
- Gather performance metrics
- Refine patterns

**Early Adopters (Month 5-8):**
- Web application main pages
- Mobile app (gradual rollout)
- Measure performance improvements

**Full Migration (Month 9-12):**
- All client applications using GraphQL
- REST APIs wrapped in GraphQL
- Begin native resolver migration

---

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| N+1 query performance issues | High | High | Mandatory DataLoader for all resolvers, query analysis |
| Team struggles with learning curve | Medium | Medium | Training program, external consultant, GraphQL champions |
| Complex caching strategy | Medium | High | Apollo Client normalized cache, CDN for persisted queries |
| REST API consumers need parallel support | Low | Certain | 12-month parallel run, clear deprecation timeline |
| Security vulnerabilities (query depth attacks) | High | Low | Query complexity limits, depth limits, rate limiting |

---

## Additional Notes

**Current Status:** Awaiting Architecture Board approval (Jan 15, 2026)

**PoC Results:**
- Successfully wrapped 2 REST APIs in GraphQL
- Measured 60% reduction in mobile data usage
- Improved page load time from 2.3s to 0.8s
- Positive developer feedback (4.2/5 satisfaction)

**Open Questions:**
1. Should we use Apollo Federation for future microservices? (Deferred)
2. Subscription implementation approach? (Deferred to Phase 4)
3. GraphQL-specific security scanning tools? (Under evaluation)

---

## Related

**Project:** [[Project - API Gateway Modernisation]]

**Related Tasks:**
- [[Task - Review GraphQL ADR]]
- [[Task - Document API standards]]

**Related Documentation:**
- GraphQL PoC results (internal wiki)
- Performance benchmark comparison
- Developer training materials

---

## Approval

**Status:** Pending Architecture Board Review

**Scheduled Review:** 2026-01-15

**Approvers Pending:**
- [ ] Architecture Lead
- [ ] API Platform Owner
- [ ] Security Architect
- [ ] Development Team Leads (4 teams)

**External Reference**: None

---

## Revision History

| Version | Date | Description | Author |
|---------|------|-------------|--------|
| 1.0 | 2025-12-01 | Initial draft | [[Alex Johnson]] |
| 1.1 | 2025-12-15 | Added PoC results and cost analysis | API Team |
| 1.2 | 2026-01-07 | Incorporated stakeholder feedback | [[Alex Johnson]] |

---

## Review

**Next Review Date**: 2026-01-15 (Architecture Board)

**Review Triggers:**
- Architecture Board decision
- Additional stakeholder concerns
- PoC findings change
