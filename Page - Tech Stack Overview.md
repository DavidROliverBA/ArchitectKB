---
type: Page
title: Tech Stack Overview
created: 2025-08-15
modified: 2026-01-07
tags: [technology, tech-stack, standards, reference]

# Quality Indicators
summary: Comprehensive overview of approved technologies, platforms, and tools across the organization
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-07

# Semantic Discovery
keywords:
  [tech-stack, technology-standards, platforms, tools, approved-technologies]

# Relationships
relatedTo:
  [
    "[Page - Architecture Principles](Page%20-%20Architecture%20Principles.md)",
    "[MOC - Technology & Architecture MOC](MOC%20-%20Technology%20&%20Architecture%20MOC.md)",
  ]
---

# Tech Stack Overview

> **Standardized technology stack and approved tools**

Last Updated: 2026-01-07

---

## Purpose

This document maintains a current inventory of approved technologies, platforms, and tools. It serves as:

- **Reference** for technology selection decisions
- **Onboarding** guide for new engineers
- **Governance** tool for maintaining standards
- **Planning** input for training and hiring

---

## Cloud Infrastructure

### Cloud Provider

**Primary: Amazon Web Services (AWS)**

- **Regions**: us-east-1 (primary), us-west-2 (DR)
- **Accounts**: Multi-account strategy (dev, staging, prod)
- **Access**: SSO via AWS IAM Identity Center

**Rationale**: Industry leader, extensive service catalog, strong ecosystem

**Related ADRs**: [ADR - Use Kubernetes for Container Orchestration](ADR%20-%20Use%20Kubernetes%20for%20Container%20Orchestration.md)

---

## Container & Orchestration

### Container Platform

**Docker**

- **Version**: 24.x+
- **Registry**: Amazon ECR (Elastic Container Registry)
- **Base Images**: Alpine Linux (for size), Amazon Linux 2 (AWS optimized)

### Orchestration

**Kubernetes (Amazon EKS)**

- **Version**: 1.28+
- **Cluster Management**: Terraform
- **GitOps**: ArgoCD for continuous deployment
- **Service Mesh**: Evaluating (Istio vs Linkerd)

**Related ADRs**: [ADR - Use Kubernetes for Container Orchestration](ADR%20-%20Use%20Kubernetes%20for%20Container%20Orchestration.md)

---

## Databases & Storage

### Relational Databases

**PostgreSQL** (Standard)

- **Version**: 15.x+
- **Deployment**: AWS RDS Multi-AZ
- **Connection Pooling**: PgBouncer
- **Extensions**: PostGIS, pgvector (for AI use cases)

**Related ADRs**: [ADR - Standardize on PostgreSQL](ADR%20-%20Standardize%20on%20PostgreSQL.md)

**Use Cases:**

- ✅ Transactional data (orders, users, inventory)
- ✅ Complex queries with joins
- ✅ ACID compliance requirements
- ✅ JSON/document storage (via JSONB)

### NoSQL Databases

**Amazon DynamoDB**

- **Use Cases**: High-scale key-value, session storage
- **Access Pattern**: Single-table design preferred

**MongoDB** (Limited Use)

- **Status**: Legacy - migrating to PostgreSQL JSONB
- **New Projects**: Not approved

### Caching

**Redis** (Amazon ElastiCache)

- **Version**: 7.x+
- **Use Cases**: Session storage, application caching, pub/sub
- **Deployment**: Cluster mode for production

### Object Storage

**Amazon S3**

- **Use Cases**: Static assets, backups, data lakes
- **Lifecycle**: Automated tiering to Glacier
- **Encryption**: Server-side encryption (SSE-S3)

---

## Backend Development

### Languages

**Primary Languages:**

1. **Python** (3.11+)
   - **Use Cases**: APIs, data processing, ML/AI
   - **Frameworks**: FastAPI (preferred), Django
   - **Package Management**: Poetry
   - **Linting**: Ruff, Black (formatting)

2. **TypeScript** (5.x+)
   - **Use Cases**: APIs, microservices, serverless functions
   - **Runtime**: Node.js 20 LTS
   - **Frameworks**: Express.js, NestJS
   - **Package Management**: npm/pnpm

3. **Go** (1.21+)
   - **Use Cases**: Performance-critical services, CLI tools
   - **Frameworks**: Standard library preferred, Fiber for HTTP

**Legacy (Maintenance Only):**

- Java (11+): Spring Boot applications (migrating to Python/TypeScript)

### API Frameworks

**REST APIs:**

- **Python**: FastAPI (automatic OpenAPI docs)
- **TypeScript**: Express.js with TypeScript
- **Standards**: OpenAPI 3.0, RFC 7807 error format

**GraphQL:**

- **Server**: Apollo Server
- **Status**: Pilot phase (see [ADR - Adopt GraphQL for API Layer](ADR%20-%20Adopt%20GraphQL%20for%20API%20Layer.md))

---

## Frontend Development

### Web Applications

**React** (18.x+)

- **Build Tool**: Vite (replacing Webpack)
- **State Management**: Zustand (preferred), Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn/ui, Radix UI primitives

**TypeScript**: Mandatory for all frontend code

### Mobile Applications

**React Native** (0.72+)

- **Navigation**: React Navigation
- **State**: Redux Toolkit
- **Testing**: Jest, React Native Testing Library

**Native Development:**

- **iOS**: Swift 5.9+ (limited use)
- **Android**: Kotlin 1.9+ (limited use)

---

## Data & Analytics

### Data Warehouse

**Snowflake**

- **Use Cases**: Business intelligence, data analytics
- **Integration**: Fivetran for ETL

### Data Processing

**Apache Spark** (Amazon EMR)

- **Use Cases**: Large-scale data processing
- **Language**: PySpark (Python API)

### Business Intelligence

**Tableau**

- **Access**: Self-service analytics for business users
- **Data Sources**: Snowflake, PostgreSQL

### Data Orchestration

**Apache Airflow** (Amazon MWAA)

- **Use Cases**: ETL pipelines, scheduled jobs
- **Version**: 2.7+

---

## CI/CD & DevOps

### Version Control

**GitHub**

- **Workflow**: Trunk-based development
- **Branch Protection**: Required reviews, CI checks
- **Monorepo**: Evaluating (currently multi-repo)

### CI/CD

**GitHub Actions**

- **Builds**: Automated on every PR
- **Tests**: Unit, integration, E2E
- **Security**: Dependency scanning, SAST

**ArgoCD**

- **Deployment**: GitOps-based continuous deployment
- **Environments**: Dev, staging, production

### Infrastructure as Code

**Terraform** (1.6+)

- **State**: S3 backend with DynamoDB locking
- **Modules**: Internal module library
- **Standards**: Mandatory for all infrastructure

**AWS CDK** (Limited Use)

- **Use Cases**: Complex AWS constructs
- **Language**: TypeScript

---

## Observability & Monitoring

### Metrics & Monitoring

**Prometheus + Grafana**

- **Metrics**: Application and infrastructure metrics
- **Alerting**: Prometheus Alertmanager
- **Dashboards**: Grafana for visualization

**CloudWatch**

- **Use Cases**: AWS-native services monitoring
- **Alarms**: Critical infrastructure alerts

### Logging

**CloudWatch Logs** (Standard)

- **Format**: Structured JSON logging
- **Retention**: 90 days (configurable per log group)

**OpenSearch** (Evaluating)

- **Use Cases**: Centralized log aggregation
- **Query**: Advanced log analysis

### Distributed Tracing

**AWS X-Ray**

- **Integration**: All services instrumented
- **Sampling**: Adaptive sampling for cost control

### APM

**DataDog** (Limited Use)

- **Use Cases**: Application performance monitoring
- **Cost**: Expensive - considering alternatives

---

## Security & Identity

### Authentication & Authorization

**OAuth 2.0 + JWT** (Standard)

- **Provider**: AWS Cognito
- **Token Lifetime**: Access 1hr, Refresh 30 days

**Auth0** (Evaluating)

- **Use Cases**: External user authentication
- **Status**: Pilot for customer-facing apps

### Secrets Management

**AWS Secrets Manager**

- **Rotation**: Automatic rotation for databases
- **Access**: IAM role-based

**HashiCorp Vault** (Limited Use)

- **Use Cases**: Complex secret workflows
- **Status**: Legacy - migrating to AWS Secrets Manager

### Security Scanning

**Dependabot** (GitHub)

- **Frequency**: Daily
- **Auto-merge**: Minor/patch updates

**Snyk**

- **Scanning**: Container images, dependencies
- **Integration**: CI/CD pipeline

---

## Communication & Collaboration

### Team Communication

**Slack**

- **Channels**: #engineering, #architecture, #incidents
- **Integrations**: GitHub, PagerDuty, DataDog

### Documentation

**Confluence**

- **Use Cases**: Long-form documentation, runbooks
- **Structure**: Space per team/project

**Obsidian** (Personal Knowledge Management)

- **Use Cases**: Personal notes, architecture research
- **Sharing**: Markdown files in Git when needed

### Project Management

**Jira**

- **Workflow**: Scrum/Kanban
- **Integration**: GitHub (pull requests linked to tickets)

---

## Testing

### Testing Frameworks

**Python:**

- **Unit**: pytest
- **Mocking**: pytest-mock, responses
- **Coverage**: pytest-cov (minimum 80%)

**TypeScript/JavaScript:**

- **Unit**: Jest, Vitest
- **Integration**: Supertest
- **E2E**: Playwright
- **Coverage**: NYC/Istanbul (minimum 80%)

### Test Data

**Faker.js / Faker (Python)**

- **Use Cases**: Generating realistic test data
- **PII**: Never use real customer data in tests

---

## Machine Learning & AI

### ML Platforms

**AWS SageMaker**

- **Training**: Managed training jobs
- **Deployment**: Real-time endpoints, batch transform

### LLM & Generative AI

**AWS Bedrock**

- **Models**: Claude 3 Sonnet, Titan
- **Use Cases**: Document processing, customer support

### ML Frameworks

**Python:**

- **PyTorch**: Deep learning (preferred)
- **TensorFlow**: Legacy models only
- **scikit-learn**: Traditional ML
- **Pandas**: Data manipulation

---

## Technology Adoption Lifecycle

### Status Levels

1. **Standard**: Approved for all new projects
2. **Pilot**: Evaluation phase - limited use with approval
3. **Legacy**: Maintenance only - no new projects
4. **Deprecated**: Scheduled for removal

### Approval Process

**New Technology Proposal:**

1. Submit RFC (Request for Comments) to architecture team
2. Pilot project (3-6 months evaluation)
3. Architecture Decision Record (ADR) if approved
4. Update this tech stack document

**Deprecation Process:**

1. Migration plan created
2. 6-month notice to affected teams
3. ADR documenting replacement
4. Support ends after migration complete

---

## Training & Certification

### Recommended Certifications

**Cloud:**

- AWS Solutions Architect Associate
- AWS Developer Associate

**Kubernetes:**

- Certified Kubernetes Application Developer (CKAD)

**Languages:**

- Python: None specific (focus on FastAPI, pytest skills)
- TypeScript: None specific (focus on React, Node.js)

### Internal Training

- Monthly tech talks
- Quarterly workshops (Kubernetes, PostgreSQL, etc.)
- Code review culture for knowledge sharing

---

## Cost Management

### Cloud Cost Principles

1. **Right-sizing**: Monitor and adjust instance sizes
2. **Reserved Capacity**: Purchase RIs for stable workloads
3. **Spot Instances**: Use for non-critical, fault-tolerant jobs
4. **Auto-scaling**: Scale down during off-hours
5. **S3 Lifecycle**: Automated tiering to cheaper storage

### Cost Allocation

- **Tagging**: Mandatory tags (environment, project, owner)
- **Monitoring**: AWS Cost Explorer, monthly reviews
- **Budgets**: Alerts at 80% and 100% of budget

---

## Decision Log

| Date       | Technology | Decision | Rationale                         |
| ---------- | ---------- | -------- | --------------------------------- |
| 2026-01-07 | GraphQL    | Pilot    | API modernization (see ADR)       |
| 2025-09-15 | PostgreSQL | Standard | Standardization, cost reduction   |
| 2025-10-30 | Kubernetes | Standard | Container orchestration           |
| 2025-08-01 | MongoDB    | Legacy   | Migrating to PostgreSQL JSONB     |
| 2025-07-15 | Java       | Legacy   | New services in Python/TypeScript |

---

## Review & Updates

**Review Cadence**: Quarterly
**Next Review**: 2026-04-07
**Owner**: Architecture Team ([Jane Smith](Jane%20Smith.md))

**How to Propose Changes:**

1. Discuss in #architecture Slack channel
2. Create RFC document if significant
3. Architecture team reviews
4. Update this page + create ADR if approved

---

## Related

**Maps of Content:**

- [MOC - Technology & Architecture MOC](MOC%20-%20Technology%20&%20Architecture%20MOC.md)
- [MOC - ADRs MOC](MOC%20-%20ADRs%20MOC.md)

**Related Pages:**

- [Page - Architecture Principles](Page%20-%20Architecture%20Principles.md)

**External Resources:**

- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Twelve-Factor App](https://12factor.net/)
- [Technology Radar](https://www.thoughtworks.com/radar)
