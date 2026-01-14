---
type: MOC
title: Architecture Books MOC
created: 2026-01-08
modified: 2026-01-13
tags:
  - moc
  - architecture
  - books
  - reference
  - communication
  - governance
  - ddd
  - api
  - data-architecture
  - distributed-systems
---

# Architecture Books MOC

A curated collection of essential architecture books for Solutions Architects at British Airways. These twenty-three books form a comprehensive foundation for cloud-native, microservices, SaaS architecture, event-driven integration, AWS security, trade-off analysis, metrics, governance, technical communication, domain-driven design, API management, distributed systems, data architecture, systems thinking, and enterprise architecture leadership.

---

## The Library

| Book | Author(s) | Year | Pages | Focus |
|------|-----------|------|-------|-------|
| [[Page - Building Microservices 2nd Edition (Sam Newman)]] | Sam Newman | 2021 | 615 | Microservices design & patterns |
| [[Page - Building Multi-Tenant SaaS Architectures (Tod Golding)]] | Tod Golding | 2024 | 487 | Multi-tenant SaaS on AWS |
| [[Page - Cloud Application Architecture Patterns (Brown, Woolf, Yoder)]] | Brown, Woolf, Yoder | 2025 | 650 | Cloud architecture patterns |
| [[Page - Communication Patterns (Jacqui Read)]] | Jacqui Read | 2023 | 306 | Technical communication & soft skills |
| [[Page - Building Evolutionary Architectures 2nd Edition (Ford, Parsons, Kua, Sadalage)]] | Ford, Parsons, Kua, Sadalage | 2023 | 265 | Fitness functions & governance |
| [[Page - Facilitating Software Architecture (Andrew Harmel-Law)]] | Andrew Harmel-Law | 2024 | 513 | Decentralised decision-making & ADRs |
| [[Page - Flow Architectures (James Urquhart)]] | James Urquhart | 2021 | 255 | Event-driven integration & streaming |
| [[Page - Security and Microservice Architecture on AWS (Gaurav Raje)]] | Gaurav Raje | 2021 | 397 | AWS security for microservices |
| [[Page - Software Architecture The Hard Parts (Ford, Richards, Sadalage, Dehghani)]] | Ford, Richards, Sadalage, Dehghani | 2021 | 462 | Trade-offs & distributed architecture |
| [[Page - Software Architecture Metrics (Ciceri, Farley, Ford, et al)]] | Ciceri, Farley, Ford, et al. | 2023 | 218 | Metrics & fitness functions |
| [[Page - Continuous API Management 2nd Edition (Medjaoui, Wilde, Mitra, Amundsen)]] | Medjaoui, Wilde, Mitra, Amundsen | 2021 | 350 | API governance & lifecycle |
| [[Page - Deciphering Data Architectures (James Serra)]] | James Serra | 2024 | 280 | Data mesh, lakehouse, fabric |
| [[Page - Designing Distributed Systems 2nd Edition (Brendan Burns)]] | Brendan Burns | 2024 | 265 | Kubernetes patterns & AI inference |
| [[Page - Fundamentals of Enterprise Architecture (Tanusree McCabe)]] | Tanusree McCabe | 2024 | 310 | EA strategy & governance |
| [[Page - Fundamentals of Software Architecture 2nd Edition (Richards, Ford)]] | Mark Richards, Neal Ford | 2025 | 420 | Architecture characteristics & styles |
| [[Page - Foundations of Scalable Systems (Ian Gorton)]] | Ian Gorton | 2022 | 345 | Scalability & CAP theorem |
| [[Page - Learning Domain-Driven Design (Vlad Khononov)]] | Vlad Khononov | 2021 | 340 | DDD, bounded contexts, aggregates |
| [[Page - Learning Systems Thinking (Diana Montalion)]] | Diana Montalion | 2024 | 280 | Systems thinking & complexity |
| [[Page - Mastering API Architecture (Gough, Bryant, Auburn)]] | Gough, Bryant, Auburn | 2022 | 290 | API gateway & service mesh |
| [[Page - Monolith to Microservices (Sam Newman)]] | Sam Newman | 2019 | 270 | Migration patterns & Strangler Fig |
| [[Page - The Software Architect Elevator (Gregor Hohpe)]] | Gregor Hohpe | 2020 | 350 | Architecture leadership & communication |
| [[Page - Data Mesh (Zhamak Dehghani)]] | Zhamak Dehghani | 2022 | 380 | Data mesh principles & implementation |
| [[Page - Head First Software Architecture (Gandhi, Richards, Ford)]] | Gandhi, Richards, Ford | 2024 | 300 | Architecture fundamentals & thinking |

**Total**: 8,148 pages of architecture wisdom

---

## How the Books Connect

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                      ARCHITECTURE BOOK RELATIONSHIPS                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  TECHNICAL ARCHITECTURE                          COMMUNICATION                │
│  ═══════════════════════                         ═════════════                │
│                                                                               │
│   Cloud Application Architecture                  Communication Patterns      │
│   Patterns (Brown, Woolf, Yoder)                 (Jacqui Read)               │
│   ┌─────────────────────────┐                    ┌─────────────────────┐     │
│   │  ~70 Patterns           │                    │  Soft Skills        │     │
│   │  • Cloud-Native         │                    │  • Visual Comms     │     │
│   │  • Event-Driven         │                    │  • Written/Verbal   │     │
│   │  • Strangler Fig        │                    │  • ADRs             │     │
│   │  • DDD Patterns         │                    │  • Remote Work      │     │
│   └───────────┬─────────────┘                    └──────────┬──────────┘     │
│               │                                              │                │
│   ┌───────────┼───────────┐                       HOW TO    │                │
│   │           │           │                     COMMUNICATE │                │
│   ▼           │           ▼                                 │                │
│  ┌────────────┴──┐   ┌───────────────┐                      │                │
│  │ Building      │   │ Building Multi│                      │                │
│  │ Microservices │   │ Tenant SaaS   │                      │                │
│  │ (Newman)      │   │ (Golding)     │                      │                │
│  └───────┬───────┘   └───────┬───────┘                      │                │
│          │                   │                              │                │
│          └─────────┬─────────┘                              │                │
│                    │                                        │                │
│                    ▼                                        │                │
│   ┌────────────────────────────────────┐                    │                │
│   │  Building Evolutionary             │                    │                │
│   │  Architectures                     │◀───────────────────┘                │
│   │  (Ford, Parsons, Kua, Sadalage)    │    ADR Governance                   │
│   │  • Fitness Functions               │                                     │
│   │  • Automated Governance            │                                     │
│   │  • Architecture Evolution          │                                     │
│   └────────────────┬───────────────────┘                                     │
│                    │                                                          │
│                    ▼                                                          │
│       ┌──────────────────────────────────────────┐                           │
│       │         BA ARCHITECTURE PRACTICE          │                           │
│       │  What to build + How to govern it         │                           │
│       └──────────────────────────────────────────┘                           │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Key connections:**
- **Sam Newman** wrote the foreword for **Cloud Patterns** and endorsed **Evolutionary**
- **Evolutionary** provides the governance layer for all technical books
- **Comms Patterns** complements all technical books by teaching *how* to communicate the *what*
- **Facilitating** provides the most comprehensive ADR guidance (Ch 6) and decision-making process (Ch 4-5)
- **ADRs** are covered in Microservices (Ch 16), Comms Patterns (Ch 12), Evolutionary (Ch 4), and Facilitating (Ch 6 ⭐)
- **Fitness functions** from Evolutionary can validate patterns from all other books

---

## Topics Across Books

### Microservices Architecture

| Topic | Microservices | Multi-Tenant | Cloud Patterns | Hard Parts |
|-------|---------------|--------------|----------------|------------|
| When to use microservices | Ch 1 ⭐ | - | Ch 4 | Ch 1 |
| Service boundaries | Ch 2 | Ch 7 | Ch 5 (DDD) ⭐ | Ch 4 |
| Communication patterns | Ch 4, 5 ⭐ | Ch 6 | Ch 6 | Ch 11-12 |
| Data ownership | Ch 4 | Ch 8 ⭐ | Ch 7 | Ch 6, 9 ⭐ |
| Strangler Fig migration | Ch 3 | Ch 13 | Ch 10 ⭐ | Ch 4 |
| Service granularity | Ch 2 | - | - | Ch 7 ⭐ |
| Decomposition patterns | Ch 3 | - | Ch 10 | Ch 4-5 ⭐ |

### Event-Driven Architecture

| Topic | Microservices | Cloud Patterns | Flow |
|-------|---------------|----------------|------|
| Event patterns | Ch 4 | Ch 6 ⭐ | Ch 1, 4 |
| Event Sourcing | Ch 4 | Ch 6 ⭐ | - |
| CQRS | Ch 4 | Ch 7 ⭐ | - |
| Kafka/Event Backbone | Ch 5 | Ch 6 ⭐ | Ch 4 |
| Saga patterns | Ch 6 ⭐ | Ch 4 | - |
| Flow patterns | - | - | Ch 5 ⭐ |
| Cross-org integration | - | - | Ch 2, 6 ⭐ |
| Wardley Mapping | - | - | Ch 3 ⭐ |
| Streaming markets | - | - | Ch 4, App ⭐ |

### Data & Storage

| Topic | Microservices | Multi-Tenant | Cloud Patterns |
|-------|---------------|--------------|----------------|
| Database per service | Ch 4 | Ch 8 | Ch 4 |
| Data partitioning | - | Ch 8 ⭐ | Ch 7 |
| Polyglot persistence | Ch 4 | Ch 8 | Ch 7 ⭐ |
| NoSQL patterns | - | Ch 8 | Ch 7 ⭐ |

### Multi-Tenancy & SaaS

| Topic | Microservices | Multi-Tenant | Cloud Patterns |
|-------|---------------|--------------|----------------|
| Tenant isolation | - | Ch 9 ⭐ | - |
| Control/Application plane | - | Ch 2 ⭐ | - |
| Silo vs Pool deployment | - | Ch 3 ⭐ | - |
| Noisy neighbour | - | Ch 7 ⭐ | - |
| GenAI multi-tenancy | - | Ch 16 ⭐ | - |

### Distributed Architecture Trade-offs

| Topic | Microservices | Hard Parts | Cloud Patterns |
|-------|---------------|------------|----------------|
| Trade-off analysis | Ch 1 | Ch 1, 15 ⭐ | Ch 1 |
| Coupling types | Ch 4 | Ch 2 ⭐ | Ch 4 |
| Architecture quantum | - | Ch 2 ⭐ | - |
| Saga patterns | Ch 6 ⭐ | Ch 12 ⭐ | Ch 4 |
| Orchestration vs Choreography | Ch 6 | Ch 11 ⭐ | Ch 6 |
| Distributed transactions | Ch 6 | Ch 9 ⭐ | Ch 4 |
| Reuse patterns | Ch 16 | Ch 8 ⭐ | - |
| Contracts | Ch 5 | Ch 13 ⭐ | - |
| Data Mesh | - | Ch 14 ⭐ | - |

### Organisational Patterns

| Topic | Microservices | Multi-Tenant | Cloud Patterns | Evolutionary |
|-------|---------------|--------------|----------------|--------------|
| Conway's Law | Ch 15 ⭐ | Ch 15 | - | Ch 7, 9 |
| Team structure | Ch 15 ⭐ | - | - | Ch 9 |
| Platform teams | Ch 15 | - | Ch 9 (Pave the Road) | - |
| Evolutionary architecture | Ch 16 | - | - | All ⭐ |

### AWS Security

| Topic | Microservices | Multi-Tenant | AWS Security |
|-------|---------------|--------------|--------------|
| IAM & Least Privilege | Ch 11 | Ch 9 | Ch 2 ⭐ |
| Encryption (KMS) | - | Ch 9 | Ch 3 ⭐ |
| VPC & Network Security | - | Ch 9 | Ch 5 ⭐ |
| API Gateway Security | Ch 5 | - | Ch 6 ⭐ |
| WAF & Shield | - | - | Ch 6 ⭐ |
| Secrets Management | - | Ch 9 | Ch 3 ⭐ |
| Service Mesh (mTLS) | Ch 5 | - | Ch 7 ⭐ |
| Incident Response | - | - | Ch 9 ⭐ |
| Zero Trust | - | - | Ch 1 ⭐ |
| AWS Organisations | - | - | Ch 8 ⭐ |

### Architecture Governance

| Topic | Microservices | Evolutionary | Comms Patterns | Facilitating | Arch Metrics |
|-------|---------------|--------------|----------------|--------------|--------------|
| Fitness functions | - | Ch 2-4 ⭐ | - | - | Ch 2 |
| Automated governance | Ch 16 | Ch 4 ⭐ | - | - | Ch 2, 8 |
| ADR practice | Ch 16 | Ch 4 | Ch 12 | Ch 6 ⭐ | - |
| Architecture evolution | Ch 16 | Ch 1, 7 ⭐ | - | Ch 1, 13 | Ch 3 |
| Deployment pipelines | Ch 8 | Ch 3 ⭐ | - | - | Ch 1, 5 |
| ArchUnit/code governance | - | Ch 4 ⭐ | - | - | Ch 9 |
| Connascence | - | Ch 5 ⭐ | - | - | - |
| Architectural quanta | - | Ch 5 ⭐ | - | - | - |
| Advice Process | - | - | - | Ch 4-5 ⭐ | - |
| Architecture Advice Forum | - | - | - | Ch 8 ⭐ | - |
| Tech Radar | - | - | - | Ch 11 ⭐ | - |
| Decentralised trust | - | - | - | Part II ⭐ | - |
| DORA/Four Key Metrics | - | - | - | - | Ch 1 ⭐ |
| GQM Approach | - | - | - | - | Ch 10 ⭐ |
| Modularity metrics | - | - | - | - | Ch 4 ⭐ |
| Maintainability metrics | - | - | - | - | Ch 9 ⭐ |

### Domain-Driven Design

| Topic | Microservices | DDD | Monolith | Hard Parts | Cloud Patterns |
|-------|---------------|-----|----------|------------|----------------|
| Bounded contexts | Ch 2 | Ch 3 ⭐ | Ch 1 | Ch 4 | Ch 5 |
| Aggregates | Ch 4 | Ch 6 ⭐ | Ch 1 | - | Ch 5 |
| Context mapping | - | Ch 4 ⭐ | - | - | - |
| Event sourcing | Ch 4 | Ch 7 ⭐ | - | - | Ch 6, 7 |
| CQRS | Ch 4 | Ch 8 ⭐ | - | - | Ch 7 |
| Strategic design | - | Part I ⭐ | Ch 1 | Ch 4 | - |
| Tactical design | - | Part II ⭐ | - | - | - |
| Ubiquitous language | Ch 2 | Ch 2 ⭐ | - | - | Ch 5 |

### API Architecture & Management

| Topic | API Mgmt | API Arch | Microservices | Multi-Tenant |
|-------|----------|----------|---------------|--------------|
| API governance | Ch 2 ⭐ | - | Ch 16 | - |
| API lifecycle | Ch 7 ⭐ | Ch 5 | - | - |
| API gateway | Ch 9 | Ch 3 ⭐ | Ch 5 | - |
| Service mesh | - | Ch 4 ⭐ | Ch 5 | - |
| API versioning | Ch 5 | Ch 1 | Ch 5 ⭐ | - |
| Contract testing | - | Ch 2 ⭐ | Ch 9 | - |
| Developer experience | Ch 3 ⭐ | - | - | - |
| 10 Pillars framework | Ch 4 ⭐ | - | - | - |
| STRIDE threat model | - | Ch 6 ⭐ | - | - |
| Rate limiting | Ch 4 | Ch 3 ⭐ | - | Ch 7 |

### Data Architecture

| Topic | Data Mesh | Data Arch | Hard Parts | Flow | DDD |
|-------|-----------|-----------|------------|------|-----|
| Data mesh principles | All ⭐ | Ch 9-12 | Ch 14 | - | Ch 16 |
| Domain ownership | Ch 2 ⭐ | - | - | - | - |
| Data as a product | Ch 3 ⭐ | - | - | - | - |
| Self-serve platform | Ch 4 ⭐ | - | - | - | - |
| Federated governance | Ch 5 ⭐ | - | - | - | - |
| Data lakehouse | - | Ch 9-12 ⭐ | - | - | - |
| Data fabric | - | Ch 9-12 ⭐ | - | - | - |
| Modern data warehouse | - | Ch 9-12 ⭐ | - | - | - |
| Lambda/Kappa architecture | - | Ch 7 ⭐ | - | - | - |
| OLTP vs OLAP | - | Ch 7 ⭐ | - | - | - |
| Data catalog | - | Ch 6 ⭐ | - | - | - |
| Multiplane platform | Ch 10 ⭐ | - | - | - | - |
| Data product design | Ch 11-14 ⭐ | - | - | - | - |

### Distributed Systems & Scalability

| Topic | Distributed | Scalable | Microservices | Fundamentals |
|-------|-------------|----------|---------------|--------------|
| Sidecar pattern | Ch 3 ⭐ | - | Ch 5 | Ch 18 |
| Ambassador pattern | Ch 4 ⭐ | - | - | - |
| Adapter pattern | Ch 5 ⭐ | - | - | - |
| Load balancing | Ch 6 | Ch 5 ⭐ | Ch 12 | - |
| Sharding | Ch 7 ⭐ | Ch 2 | - | - |
| CAP theorem | - | Ch 10 ⭐ | Ch 4 | - |
| Consistency models | - | Ch 11-12 ⭐ | - | - |
| Leader election | Ch 10 ⭐ | - | - | - |
| Work queues | Ch 11 ⭐ | Ch 7 | - | - |
| Scatter/gather | Ch 8 ⭐ | - | - | - |
| AI inference patterns | Ch 15 ⭐ | - | - | - |
| Circuit breaker | - | Ch 9 | Ch 12 ⭐ | - |
| Bulkhead pattern | - | Ch 9 ⭐ | Ch 12 | - |

### Architecture Leadership & Thinking

| Topic | Elevator | Facilitating | Enterprise Arch | Systems Thinking | Comms Patterns |
|-------|----------|--------------|-----------------|------------------|----------------|
| Architect role | Part I ⭐ | Ch 1-3 | Ch 1 ⭐ | - | Ch 1-4 |
| First derivative | Ch 3 ⭐ | - | - | - | - |
| Selling options | Ch 9 ⭐ | - | - | - | - |
| Penthouse to engine room | Ch 1 ⭐ | - | - | - | - |
| Organisational change | Part V ⭐ | Ch 13 | Ch 10 | Ch 11 | - |
| Stakeholder alignment | Ch 18-25 | Ch 4-5 | Ch 3 ⭐ | Ch 7-9 | Ch 1-4 ⭐ |
| Communication skills | Part III ⭐ | - | - | - | All ⭐ |
| Diagram-driven design | Ch 22 ⭐ | - | - | - | Ch 9-10 |
| Iceberg model | - | - | - | Ch 3 ⭐ | - |
| Systems thinking | - | - | - | All ⭐ | - |
| 4 Cs framework | - | - | Ch 6 ⭐ | - | - |

### Enterprise Architecture

| Topic | Enterprise Arch | Fundamentals | Evolutionary | Facilitating |
|-------|-----------------|--------------|--------------|--------------|
| EA strategy | Ch 2 ⭐ | - | - | - |
| EA functions | Ch 1 ⭐ | - | - | - |
| Organisational models | Ch 1 ⭐ | - | - | Ch 8 |
| NFR categories | Ch 5 ⭐ | Ch 4 ⭐ | - | Ch 9 |
| Architecture characteristics | - | Ch 4-5 ⭐ | Ch 5 | - |
| Fitness functions | - | Ch 6 | Ch 2-4 ⭐ | - |
| Architecture styles | - | Ch 9-18 ⭐ | - | - |
| Modularity metrics | - | Ch 3 ⭐ | Ch 5 | - |
| Laws of architecture | - | Ch 1 ⭐ | - | - |

### Migration & Modernisation

| Topic | Monolith | Microservices | Cloud Patterns | Hard Parts |
|-------|----------|---------------|----------------|------------|
| Strangler Fig | Ch 3 ⭐ | Ch 3 ⭐ | Ch 10 ⭐ | Ch 4 |
| Branch by Abstraction | Ch 3 ⭐ | - | - | - |
| Parallel Run | Ch 3 ⭐ | - | - | - |
| Database decomposition | Ch 4 ⭐ | Ch 4 | - | Ch 6 |
| Change Data Capture | Ch 3 ⭐ | - | - | - |
| UI Composition | Ch 3 ⭐ | Ch 14 | - | - |
| Kotter's 8 steps | Ch 2 ⭐ | - | - | - |
| When NOT to migrate | Ch 2 ⭐ | Ch 1 | Ch 2 | - |
| Tracer Write | Ch 4 ⭐ | - | - | - |

⭐ = Primary/best coverage of topic

### Book Short Names Key

| Short Name | Full Title |
|------------|------------|
| Microservices | Building Microservices 2nd Edition (Sam Newman) |
| Multi-Tenant | Building Multi-Tenant SaaS Architectures (Tod Golding) |
| Cloud Patterns | Cloud Application Architecture Patterns (Brown, Woolf, Yoder) |
| Comms Patterns | Communication Patterns (Jacqui Read) |
| Evolutionary | Building Evolutionary Architectures 2nd Edition (Ford et al.) |
| Facilitating | Facilitating Software Architecture (Andrew Harmel-Law) |
| Flow | Flow Architectures (James Urquhart) |
| AWS Security | Security and Microservice Architecture on AWS (Gaurav Raje) |
| Hard Parts | Software Architecture: The Hard Parts (Ford, Richards, Sadalage, Dehghani) |
| Arch Metrics | Software Architecture Metrics (Ciceri, Farley, Ford, et al.) |
| API Mgmt | Continuous API Management 2nd Edition (Medjaoui, Wilde, Mitra, Amundsen) |
| Data Arch | Deciphering Data Architectures (James Serra) |
| Distributed | Designing Distributed Systems 2nd Edition (Brendan Burns) |
| Enterprise Arch | Fundamentals of Enterprise Architecture (Tanusree McCabe) |
| Fundamentals | Fundamentals of Software Architecture 2nd Edition (Richards, Ford) |
| Scalable | Foundations of Scalable Systems (Ian Gorton) |
| DDD | Learning Domain-Driven Design (Vlad Khononov) |
| Systems Thinking | Learning Systems Thinking (Diana Montalion) |
| API Arch | Mastering API Architecture (Gough, Bryant, Auburn) |
| Monolith | Monolith to Microservices (Sam Newman) |
| Elevator | The Software Architect Elevator (Gregor Hohpe) |
| Data Mesh | Data Mesh (Zhamak Dehghani) |
| Head First | Head First Software Architecture (Gandhi, Richards, Ford) |

---

## Reading Paths by Goal

### Path 1: "I'm new to microservices"

```
1. Microservices Ch 1-2   → What are microservices, when to use them
2. Cloud Patterns Ch 2    → Application architecture evolution
3. Microservices Ch 4     → Communication patterns
4. Cloud Patterns Ch 5    → DDD for service boundaries
5. Microservices Ch 15-16 → Organisation and architecture role
```

### Path 2: "I'm modernising a legacy system"

```
1. Cloud Patterns Ch 9    → Migration strategies overview
2. Cloud Patterns Ch 10   → Strangler Fig patterns (detailed)
3. Microservices Ch 3     → Splitting the monolith
4. Cloud Patterns Ch 2    → Modular Monolith as valid step
5. Microservices Ch 9     → Testing strategies
```

### Path 3: "I'm building on AWS"

```
1. Multi-Tenant Ch 1-2    → SaaS mindset, control/app planes
2. Multi-Tenant Ch 3      → Deployment models
3. Multi-Tenant Ch 9      → Tenant isolation (AWS IAM)
4. Multi-Tenant Ch 10-11  → EKS and Serverless patterns
5. Multi-Tenant Ch 16     → GenAI multi-tenancy (Bedrock)
```

### Path 4: "I'm designing event-driven systems"

```
1. Cloud Patterns Ch 6    → Event-Driven Architecture patterns
2. Microservices Ch 4     → Communication styles
3. Cloud Patterns Ch 7    → CQRS and Event Sourcing
4. Microservices Ch 6     → Sagas for distributed transactions
5. Multi-Tenant Ch 12     → Tenant-aware operations/metrics
```

### Path 5: "I'm a Solutions Architect at BA"

```
1. Microservices Ch 1, 16 → Foundations + Evolutionary Architect
2. Evolutionary Ch 1-2    → Evolutionary architecture + Fitness functions
3. Cloud Patterns Ch 2, 10→ Architecture evolution + Strangler
4. Multi-Tenant Ch 2, 9   → SaaS patterns + Isolation
5. Cloud Patterns Ch 5, 6 → DDD + Event-Driven
6. Facilitating Ch 4-6    → Advice Process + ADRs
7. AWS Security Ch 2, 5   → IAM and VPC security fundamentals
8. Hard Parts Ch 1, 7, 15 → Trade-offs, granularity, analysis
9. Arch Metrics Ch 1, 10  → DORA metrics, GQM approach
10. All ten               → Reference as needed per project
```

### Path 6: "I'm implementing architecture governance"

```
1. Evolutionary Ch 1-2    → What is evolutionary architecture, fitness functions
2. Evolutionary Ch 3-4    → Deployment pipelines, automated governance
3. Facilitating Ch 4-5    → Architecture Advice Process
4. Facilitating Ch 6      → ADR structure and lifecycle
5. Facilitating Ch 8      → Architecture Advice Forum
6. Comms Patterns Ch 12   → ADR writing and culture
7. Evolutionary Ch 8-9    → Antipatterns, putting it into practice
```

### Path 7: "I'm securing AWS microservices"

```
1. AWS Security Ch 1      → Cloud security basics, Zero Trust, Defense-in-Depth
2. AWS Security Ch 2      → IAM, Least Privilege, RBAC
3. AWS Security Ch 3      → KMS, encryption, Secrets Manager
4. AWS Security Ch 5      → VPC, subnets, Security Groups, NACLs
5. AWS Security Ch 6      → API Gateway, CloudFront, WAF, Shield
6. AWS Security Ch 7      → TLS, mTLS, App Mesh
7. AWS Security Ch 8-9    → Multi-account strategy, incident response
```

### Path 8: "I'm making trade-off decisions"

```
1. Hard Parts Ch 1        → What happens when there are no best practices
2. Hard Parts Ch 2        → Coupling types, architecture quantum
3. Hard Parts Ch 7        → Service granularity trade-offs
4. Hard Parts Ch 11       → Orchestration vs choreography
5. Hard Parts Ch 12       → Saga patterns (8 variations)
6. Hard Parts Ch 15       → Build your own trade-off analysis
7. Evolutionary Ch 2      → Fitness functions for validation
```

### Path 9: "I'm implementing architecture metrics"

```
1. Arch Metrics Ch 1      → DORA four key metrics
2. Arch Metrics Ch 2      → Fitness function testing pyramid
3. Evolutionary Ch 2-4    → Fitness functions theory
4. Arch Metrics Ch 4      → Modularity maturity index
5. Arch Metrics Ch 9      → Maintainability metrics
6. Arch Metrics Ch 10     → GQM approach for custom metrics
7. Arch Metrics Ch 7-8    → Measurement role, metrics to engineering
```

### Path 10: "I'm learning DDD for service design"

```
1. DDD Ch 1-2             → Business domains and ubiquitous language
2. DDD Ch 3               → Bounded contexts and model boundaries
3. DDD Ch 4               → Context mapping patterns
4. DDD Ch 5-6             → Tactical patterns (aggregates, entities)
5. DDD Ch 7-8             → Event sourcing and CQRS
6. Microservices Ch 2     → Applying DDD to service boundaries
7. Cloud Patterns Ch 5    → DDD in cloud contexts
```

### Path 11: "I'm building API platforms"

```
1. API Mgmt Ch 1-2        → API management and governance
2. API Arch Ch 1          → REST, RPC, GraphQL design
3. API Arch Ch 3          → API gateway patterns
4. API Arch Ch 4          → Service mesh concepts
5. API Mgmt Ch 4          → 10 Pillars of API product work
6. API Arch Ch 6          → STRIDE threat modelling
7. API Mgmt Ch 7          → API lifecycle management
```

### Path 12: "I'm designing for data at scale"

```
1. Data Arch Ch 1-3       → Data architecture foundations
2. Data Arch Ch 4-6       → Traditional patterns (DW, lake, ODS)
3. Data Arch Ch 7-8       → Design approaches and modelling
4. Data Arch Ch 9-12      → Modern architectures comparison
5. Hard Parts Ch 14       → Data Mesh implementation
6. Scalable Part III      → Scalable distributed databases
7. Flow Ch 4              → Streaming data patterns
```

### Path 13: "I'm leading architecture transformation"

```
1. Elevator Part I        → The Architect role
2. Elevator Part III      → Communication skills
3. Elevator Part V        → Leading transformation
4. Systems Thinking Ch 1-3 → Nonlinear thinking, Iceberg model
5. Enterprise Arch Ch 1-2 → EA strategy and functions
6. Enterprise Arch Ch 6   → The 4 Cs framework
7. Facilitating Ch 4-5    → Advice Process
```

### Path 14: "I'm architecting distributed systems"

```
1. Distributed Ch 1-2     → Foundations and concepts
2. Distributed Ch 3-5     → Single-node patterns (sidecar, ambassador)
3. Distributed Ch 6-10    → Serving patterns
4. Scalable Part I-II     → Basics and services
5. Fundamentals Ch 4-6    → Architecture characteristics
6. Fundamentals Ch 15-18  → Distributed architecture styles
7. Distributed Ch 14-16   → Observability and failure patterns
```

---

## BA Project Mapping

### Which Book for Which Project?

| Project | Primary | Secondary | Key Chapters |
|---------|---------|-----------|--------------|
| [[Project - Axia (was EWS Futures)]] | Hard Parts | Cloud Patterns | Hard Parts Ch 4-6, Cloud Patterns Ch 10 |
| [[Project - Caerus]] | Hard Parts | Cloud Patterns | Hard Parts Ch 9-12, Cloud Patterns Ch 5-7 |
| [[Project - ODIE Programme]] | Hard Parts | Cloud Patterns | Hard Parts Ch 14, Cloud Patterns Ch 6-7 |
| [[Project - Dispax AI]] | Multi-Tenant | Cloud Patterns | Multi-Tenant Ch 16, Cloud Patterns Ch 6 |
| [[Project - MRO Pro Implementation]] | Multi-Tenant | Microservices | Multi-Tenant Ch 3-5, Microservices Ch 5 |
| [[Project - Sparks - Logic Software - Ticketing System]] | Microservices | Cloud Patterns | Microservices Ch 4-5, Cloud Patterns Ch 4 |
| [[Project - 777-X EIS Programme]] | Microservices | AWS Security | Microservices Ch 11-12, AWS Security Ch 5-7 |
| [[Project - Cyber Uplift]] | AWS Security | Evolutionary | AWS Security Ch 2, 5, 9, Evolutionary Ch 4 |

---

## Key Patterns by Book

### Microservices

| Pattern | Chapter | BA Use Case |
|---------|---------|-------------|
| Strangler Fig | 3 | AXIA/EWS modernisation |
| Saga | 6 | Caerus order processing |
| Circuit Breaker | 12 | Dispax AI AWS calls |
| BFF (Backend for Frontend) | 14 | Multi-channel apps |

### Multi-Tenant

| Pattern | Chapter | BA Use Case |
|---------|---------|-------------|
| Control Plane / App Plane | 2 | Internal SaaS standard |
| Silo vs Pool | 3 | Deployment model decisions |
| Tenant Isolation | 9 | Security architecture |
| Tenant-Aware RAG | 16 | Dispax AI future |

### Cloud Patterns

| Pattern | Chapter | BA Use Case |
|---------|---------|-------------|
| Modular Monolith | 2 | Valid architecture choice |
| Event Backbone | 6 | ODIE/Kafka |
| Polyglot Persistence | 7 | Multi-database strategy |
| Pave the Road | 9 | Platform Engineering |
| Hairline Cracks | 10 | EWS decomposition analysis |

### Evolutionary

| Pattern/Concept | Chapter | BA Use Case |
|-----------------|---------|-------------|
| Fitness Functions | 2-4 | ADR governance, API validation |
| Architectural Quanta | 5 | Service boundary definition |
| Connascence | 5 | Coupling analysis |
| ArchUnit Governance | 4 | Automated code checks |
| Last Responsible Moment | 7 | Decision timing |
| Anticorruption Layer | 7 | Legacy integration |

### Facilitating

| Concept | Chapter | BA Use Case |
|---------|---------|-------------|
| Architecture Advice Process | 4-5 | Decentralised decision-making |
| ADR Structure & Lifecycle | 6 | ADR documentation standard |
| Architecture Advice Forum | 8 | Regular architecture meetings |
| Technology Radar | 11 | Tech adoption guidance |
| Cross-Functional Requirements | 9 | NFR alignment |
| Architectural Principles | 10 | Team principle workshops |

### Flow

| Concept | Chapter | BA Use Case |
|---------|---------|-------------|
| Collector Pattern | 5 | ODIE event aggregation |
| Distributor Pattern | 5 | Event broadcasting |
| Signal Pattern | 5 | Alerting/automation triggers |
| Facilitator Pattern | 5 | Workflow orchestration |
| Wardley Mapping | 3 | Technology strategy analysis |
| Promise Theory | 3 | Integration contract modelling |
| Cross-org Integration | 2, 6 | SAP/Boeing data flows |

### AWS Security

| Concept | Chapter | BA Use Case |
|---------|---------|-------------|
| Principle of Least Privilege | 2 | IAM policy design |
| Envelope Encryption | 3 | KMS for data at rest |
| VPC Microsegmentation | 5 | Network isolation |
| Security Groups vs NACLs | 5 | Firewall design |
| API Gateway Security | 6 | External integrations |
| WAF Rules | 6 | OWASP protection |
| mTLS with App Mesh | 7 | Service-to-service auth |
| NIST Incident Response | 9 | Security playbooks |
| AWS Organisations/SCPs | 8 | Multi-account governance |
| Zero Trust Architecture | 1 | Security posture |

### Hard Parts

| Concept | Chapter | BA Use Case |
|---------|---------|-------------|
| Architecture Quantum | 2 | Service boundary definition |
| Static vs Dynamic Coupling | 2 | Dependency analysis |
| Decomposition Patterns | 4-5 | AXIA modernisation |
| Data Decomposition | 6 | ODIE data ownership |
| Service Granularity | 7 | Right-sizing services |
| Reuse Patterns | 8 | Shared service decisions |
| Saga Patterns (8 types) | 12 | Caerus workflows |
| Contract Types | 13 | API evolution |
| Data Mesh | 14 | ODIE data platform |
| Trade-off Analysis | 15 | ADR justification |

### Arch Metrics

| Concept | Chapter | BA Use Case |
|---------|---------|-------------|
| DORA Four Key Metrics | 1 | Delivery team performance |
| Fitness Function Pyramid | 2 | Architecture governance |
| Testability & Deployability | 3 | CI/CD architecture |
| Modularity Maturity Index | 4 | System decomposition assessment |
| DevOps Transition Metrics | 5 | Transformation measurement |
| Organisational Scaling | 6 | Team/architecture alignment |
| Measurement in Architecture | 7 | Decision-making data |
| Metrics to Engineering | 8 | Actionable improvements |
| Maintainability Metrics | 9 | Technical debt tracking |
| GQM Approach | 10 | ADR metric definition |

---

## Cross-Reference: Complementary Concepts

### Same Concept, Different Perspectives

| Concept | Microservices | Multi-Tenant | Cloud Patterns | Evolutionary |
|---------|---------------|--------------|----------------|--------------|
| **Independent Deployability** | "The most important concept" | "Fundamental to SaaS" | "Distributed Architecture goal" | "Architectural quantum property" |
| **Data Ownership** | "Each service owns its data" | "Tenant isolation is critical" | "Self-Managed Data Store" | "Evolve schemas carefully" |
| **Eventual Consistency** | "Embrace it" | "AP systems preferred" | "Event Sourcing enables it" | "Validate with fitness functions" |
| **Monolith** | "Not the enemy" | "MSP model is not SaaS" | "Modular Monolith is valid" | "Can be evolutionary" |
| **Architecture Change** | "Evolve incrementally" | "Plan for growth" | "Use patterns" | "Guided, incremental change" |

### Complementary Depth

| Topic | Best Starting Point | Deep Dive |
|-------|---------------------|-----------|
| When to use microservices | Microservices Ch 1 | Cloud Patterns Ch 2 |
| How to design services | Cloud Patterns Ch 5 (DDD) | Microservices Ch 2 |
| AWS implementation | Multi-Tenant | - |
| Migration approach | Cloud Patterns Ch 9-10 | Microservices Ch 3 |
| Event-Driven | Cloud Patterns Ch 6 | Microservices Ch 4 |
| Security | AWS Security Ch 1-2 | Microservices Ch 11, Multi-Tenant Ch 9 |
| Operations | Multi-Tenant Ch 12 | Microservices Ch 10 |
| Architecture governance | Evolutionary Ch 1-4 | Microservices Ch 16 |
| Fitness functions | Evolutionary Ch 2 | Evolutionary Ch 3-4 |
| Coupling analysis | Evolutionary Ch 5 (Connascence) | Microservices Ch 4 |
| ADR practice | Facilitating Ch 6 | Comms Patterns Ch 12 |
| Decentralised decisions | Facilitating Ch 4-5 | Facilitating Part II |
| Flow/streaming integration | Flow Ch 1-2 | Flow Ch 4-6 |
| Wardley Mapping | Flow Ch 3 | - |
| Cross-org events | Flow Ch 2, 6 | Cloud Patterns Ch 6 |

---

## Quotable Wisdom

### On Starting with Microservices

> "Microservices buy you options. They have a cost, and you must decide whether the cost is worth the options they provide." — **Microservices**

> "The monolith is not the enemy. The lack of cohesion and poor coupling is." — **Microservices**

> "There are more applications running in the cloud than there are ones that run well in the cloud." — **Cloud Patterns**

### On SaaS and Multi-Tenancy

> "At its core, SaaS is a business model—not a technology choice." — **Multi-Tenant**

> "Tenant authentication is NOT tenant isolation." — **Multi-Tenant**

### On Migration

> "If you do a big-bang rewrite, the only thing you're guaranteed of is a big bang." — **Microservices**

> "The easy stuff has already gone to the cloud. We're now reaching into the high branches." — **Cloud Patterns** (Sam Newman foreword)

### On Architecture

> "The appropriate systems architecture is always a function of tradeoffs." — **Cloud Patterns**

> "The goal isn't to have microservices; the goal is to have an architecture that meets your organization's needs." — **Microservices**

### On Evolutionary Architecture

> "An evolutionary architecture supports guided, incremental change across multiple dimensions." — **Evolutionary**

> "Fitness functions provide a way to objectively measure a system's alignment with intended outcomes." — **Evolutionary**

> "The building metaphor for software architecture is no longer a valid one... software architecture must be malleable enough to change quickly." — **Evolutionary** (Mark Richards foreword)

> "Architecture decisions should be reversible wherever possible." — **Evolutionary**

### On Decentralised Decision-Making

> "Before taking any architecturally significant decision, seek advice from those who are affected by the decision and those who are experts in the area." — **Facilitating**

> "Architecture is not a skill demonstrated by one individual. Architecture is the orchestration of practices that generate systemic support for thinking well together about software systems." — **Facilitating** (Diana Montalion)

> "At its best, software architecture is evolved by everyone involved." — **Facilitating** (Martin Fowler foreword)

### On Flow and Event-Driven Integration

> "Like HTTP created the World Wide Web and linked the world's information, what I call 'flow' will create the World Wide Flow and link the world's activity." — **Flow**

> "Integration is key to the way our digital economy will evolve, as data is what drives economic activity." — **Flow**

> "The fluid, real-time communication of system state is much like the flow of water in a river, or the flow of traffic in a highway system; it is a flow of activity." — **Flow**

### On AWS Security

> "Security is usually an afterthought when organizations design microservices for cloud systems." — **AWS Security**

> "Security professionals should help developers in adding value and not getting in the way of value-adding activities." — **AWS Security**

> "I will try my best to impress upon you the importance of security through simplicity and stop you from implementing any security control that creates friction." — **AWS Security**

### On Trade-offs and the Hard Parts

> "Don't try to find the best design in software architecture; instead, strive for the least worst combination of trade-offs." — **Hard Parts**

> "For architects, every problem is a snowflake." — **Hard Parts**

> "Software architecture is the stuff that's hard to change later." — **Hard Parts**

> "Generic solutions rarely exist in architecture and, if they do, are generally incomplete for highly specific architectures." — **Hard Parts**

### On Metrics and Measurement

> "The four key metrics can allow you as an architect to loosen your grip on the tiller. Instead of dictating and controlling, you can use the four key metrics to generate conversations with team members." — **Arch Metrics** (Andrew Harmel-Law)

> "Software development is always an exercise in learning and discovery." — **Arch Metrics** (Dave Farley)

> "Fitness functions are a concise method that can be used to define software system metrics tailored to your system and context." — **Arch Metrics** (Rene Weiss)

### On Architecture Fundamentals

> "Everything in software architecture is a trade-off. If an architect thinks they have discovered something that isn't a trade-off, more likely they just haven't identified the trade-off yet." — **Fundamentals** (First Law of Software Architecture)

> "Why is more important than how." — **Fundamentals** (Second Law of Software Architecture)

### On the Architect Elevator

> "Architects make two things of vital importance: they make sense and they make decisions." — **Elevator** (Dr. David Knott)

> "Architects live in the first derivative—they focus on the rate of change, not just the current state." — **Elevator**

> "A4 paper doesn't stifle creativity—constraints and standards enable it." — **Elevator**

### On Domain-Driven Design

> "Vladik Khononov is a unique thinker who has been applying DDD to solve real business problems for years." — **DDD** (Nick Tune)

> "The ubiquitous language is not about the words; it's about the underlying mental model." — **DDD**

### On Systems Thinking

> "When changing code becomes easy enough, yet changing software only gets harder—it is time for this book." — **Systems Thinking** (Jessica Kerr)

> "Your life is not about to get easier—yes, it is. You'll learn how to stop making things worse by trying to make them better." — **Systems Thinking** (Kent Beck)

### On API Architecture

> "With so much attention on containers and microservices, people often ignore the fundamentals around how their services communicate. This book sets this right." — **API Arch** (Sam Newman)

> "APIs are the fabric of the modern enterprise." — **API Mgmt** (Gregor Hohpe)

### On Migration

> "In Monolith to Microservices, Sam Newman defines a clear vision for your microservices migration, shows you what pitfalls to watch out for, and provides a series of very useful patterns." — **Monolith** (Daniel Bryant)

### On Data Architecture

> "No other book I know explains so comprehensively about data lake, warehouse, mesh, fabric and lakehouse!" — **Data Arch** (Vincent Rainardi)

### On Data Mesh

> "A thorough and crucially needed overview of data as a product, including the cultural, process, technology, and team changes required to get there." — **Data Mesh** (Manuel Pais, co-author of Team Topologies)

> "Zhamak's detailed approach in Data Mesh makes this new concept clear and useful." — **Data Mesh** (Gwen Shapira)

### On Enterprise Architecture

> "If you're an enterprise architect, you should read this book. It outlines the patterns and practices required to enable successful architectures in any organization." — **Enterprise Arch** (Doug Holland)

### On Distributed Systems

> "Building scalable distributed systems is hard. This book just made it easier." — **Scalable** (Mark Richards)

---

## Quick Reference Card

### When facing a decision, consult:

| Decision | Consult |
|----------|---------|
| Should we use microservices? | Microservices Ch 1, Cloud Patterns Ch 2 |
| How do we decompose this system? | Cloud Patterns Ch 5 (DDD), Ch 10 (Strangler) |
| What database should we use? | Cloud Patterns Ch 7 (Polyglot Persistence) |
| How do we handle distributed transactions? | Microservices Ch 6 (Sagas) |
| How do we isolate tenants? | Multi-Tenant Ch 9 |
| How do we migrate to cloud? | Cloud Patterns Ch 9-10 |
| How do we handle events? | Cloud Patterns Ch 6 |
| How do we structure teams? | Microservices Ch 15 |
| How do we govern architecture? | Evolutionary Ch 1-4, Facilitating Ch 4-8 |
| How do we build AI services? | Multi-Tenant Ch 16 |
| What are fitness functions? | Evolutionary Ch 2-4 |
| How do we measure coupling? | Evolutionary Ch 5 (Connascence) |
| How do we automate governance? | Evolutionary Ch 4 (ArchUnit) |
| What antipatterns should we avoid? | Evolutionary Ch 8 |
| How do we write good ADRs? | Facilitating Ch 6 |
| How do we run arch meetings? | Facilitating Ch 8 (Advice Forum) |
| How do we build a tech radar? | Facilitating Ch 11 |
| How do we design event flows? | Flow Ch 1, 4-5 |
| What streaming tech to use? | Flow Ch 4, Appendix |
| How do we integrate across orgs? | Flow Ch 2, 6 |
| How do we use Wardley Mapping? | Flow Ch 3 |
| How do we implement IAM least privilege? | AWS Security Ch 2 |
| How do we encrypt data at rest? | AWS Security Ch 3-4 |
| How do we design VPC security? | AWS Security Ch 5 |
| How do we protect APIs? | AWS Security Ch 6 |
| How do we implement mTLS? | AWS Security Ch 7 |
| How do we handle security incidents? | AWS Security Ch 9 |
| How do we structure AWS accounts? | AWS Security Ch 8 |
| How do we analyse trade-offs? | Hard Parts Ch 1, 15 |
| How do we decompose a monolith? | Hard Parts Ch 4-6 |
| How do we decide service granularity? | Hard Parts Ch 7 |
| How do we implement sagas? | Hard Parts Ch 12 |
| How do we manage distributed data? | Hard Parts Ch 9-10 |
| What is Data Mesh? | Hard Parts Ch 14 |
| How do we implement DORA metrics? | Arch Metrics Ch 1 |
| How do we use fitness functions? | Arch Metrics Ch 2, Evolutionary Ch 2-4 |
| How do we measure modularity? | Arch Metrics Ch 4 |
| How do we measure maintainability? | Arch Metrics Ch 9 |
| What metrics should we track? | Arch Metrics Ch 10 (GQM) |
| What are bounded contexts? | DDD Ch 3, Microservices Ch 2 |
| How do we model aggregates? | DDD Ch 6 |
| What is context mapping? | DDD Ch 4 |
| How do we design APIs? | API Arch Ch 1, API Mgmt Ch 3 |
| What are API gateways? | API Arch Ch 3 |
| What is a service mesh? | API Arch Ch 4 |
| How do we govern APIs? | API Mgmt Ch 2 |
| What is data mesh vs lakehouse? | Data Arch Ch 9-12 |
| What is Lambda vs Kappa architecture? | Data Arch Ch 7 |
| How do we design for scalability? | Scalable Part I-II |
| What is CAP theorem? | Scalable Ch 10 |
| What are sidecar patterns? | Distributed Ch 3 |
| How do we communicate as architects? | Elevator Part III, Comms Patterns |
| What is the architect elevator? | Elevator Ch 1 |
| How do we think systemically? | Systems Thinking Ch 1-3 |
| What is the Iceberg Model? | Systems Thinking Ch 3 |
| How do we define EA strategy? | Enterprise Arch Ch 2 |
| What are architecture characteristics? | Fundamentals Ch 4-5 |
| What architecture styles exist? | Fundamentals Ch 9-18 |
| How do we migrate to microservices? | Monolith Ch 3, Microservices Ch 3 |
| What is Strangler Fig? | Monolith Ch 3, Cloud Patterns Ch 10 |
| How do we decompose databases? | Monolith Ch 4 |

---

## Related Notes

- [[MOC - ADRs MOC]] - Architecture Decision Records
- [[MOC - Projects MOC]] - Active projects
- [[Page - What is Kafka?]] - Event Backbone implementation
- [[ADR - KAMA (SUPERSEDED)]] - API patterns
- [[Organisation - AWS]] - Cloud platform
- [[Project - Cyber Uplift]] - Security improvements

---

## Source Files

All books are available in `+PDFs/`:
- `buildingmicroservices2e.pdf`
- `buildingmulti-tenantsaasarchitectures.pdf`
- `cloudapplicationarchitecturepatterns.pdf`
- `communicationpatterns.pdf`
- `buildingevolutionaryarchitectures2e.pdf`
- `facilitatingsoftwarearchitecture.pdf`
- `flowarchitectures.pdf`
- `securityandmicroservicearchitectureonaws.pdf`
- `softwarearchitecture_thehardparts.pdf`
- `softwarearchitecturemetrics.pdf`
- `continuousapimanagement2e.pdf`
- `decipheringdataarchitectures.pdf`
- `designingdistributedsystems2e.pdf`
- `fundamentalsofenterprisearchitecture.pdf`
- `fundamentalsofsoftwarearchitecture2e.pdf`
- `foundationsofscalablesystems.pdf`
- `learningdomain-drivendesign1e.pdf`
- `learningsystemsthinking.pdf`
- `masteringapiarchitecture.pdf`
- `monolithtomicroservices.pdf`
- `softwarearchitectelevator.pdf`
- `datamesh.pdf`
- `headfirstsoftwarearchitecture.pdf`

Full extracted markdown in `+Attachments/pdf_conversion_output/`

---

*Last updated: 2026-01-13* | *Expanded from 10 to 23 books with new topic cross-references*
