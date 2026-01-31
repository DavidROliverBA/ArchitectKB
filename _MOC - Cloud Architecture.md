---
type: MOC
title: Cloud Architecture MOC
created: 2026-01-07
modified: 2026-01-07
tags: [moc, cloud, infrastructure, aws, azure, kubernetes]
---

# ☁️ Cloud Architecture MOC

> **Example domain-specific MOC for cloud infrastructure knowledge**

Last Updated: 2026-01-07

---

## Overview

This is an **example MOC** showing how to organize domain-specific knowledge. Customize this for your cloud platform (AWS, Azure, GCP, or multi-cloud) and infrastructure patterns.

**Quick Links:**
- [[Dashboard - Main Dashboard]] - Main dashboard
- [[MOC - Technology & Architecture MOC]] - All tech standards
- [[MOC - ADRs MOC]] - Cloud-related decisions
- [[MOC - Projects MOC]] - Cloud migration projects

---

## 📚 Cloud Infrastructure Documentation

### Core Documentation

**Create these pages for your cloud environment:**
- [[Page - Cloud Landing Zone Architecture]] - Account structure, networking, security
- [[Page - Cloud Cost Management]] - Cost optimization strategies
- [[Page - Cloud Security Standards]] - Security baseline, compliance
- [[Page - Disaster Recovery Plan]] - Backup, restore, RTO/RPO
- [[Page - Multi-Region Strategy]] - Global architecture, failover

### Reference Architecture

**Document your patterns:**
- Compute patterns (serverless, containers, VMs)
- Networking design (VPC, subnets, routing)
- Storage architecture (object, block, database)
- Security architecture (IAM, encryption, monitoring)
- CI/CD pipelines
- Infrastructure as Code standards

---

## 🎯 Cloud ADRs

### All Cloud-Related Decisions

```dataview
TABLE WITHOUT ID
  file.link as "ADR",
  status as "Status",
  category as "Category",
  modified as "Updated"
FROM ""
WHERE type = "Adr"
  AND (contains(tags, "cloud") OR contains(tags, "aws") OR contains(tags, "azure") OR contains(tags, "gcp") OR contains(tags, "infrastructure"))
SORT status ASC, modified DESC
```

### Infrastructure Decisions

```dataview
TABLE WITHOUT ID
  file.link as "ADR",
  status as "Status",
  modified as "Updated"
FROM ""
WHERE type = "Adr"
  AND category = "infrastructure"
SORT status ASC, modified DESC
```

### Key Cloud Decisions

**Document major decisions like:**
- Cloud provider selection (AWS vs Azure vs GCP)
- [[ADR - Use Kubernetes for Container Orchestration]]
- Multi-region strategy
- Serverless vs container vs VMs
- Network architecture (hub-spoke, transit gateway)
- Security baseline and compliance framework

---

## 🏗️ Cloud Services Inventory

### Compute Services in Use

**Document your compute strategy:**
- **Serverless**: Lambda functions, event-driven patterns
- **Containers**: ECS, EKS, Kubernetes clusters
- **VMs**: EC2 instances, autoscaling groups
- **Batch Processing**: Batch jobs, ETL workloads

### Data Services

**Database and storage:**
- **Relational**: RDS (PostgreSQL, MySQL), Aurora
- **NoSQL**: DynamoDB, MongoDB, DocumentDB
- **Caching**: Redis, Memcached, ElastiCache
- **Object Storage**: S3 buckets, lifecycle policies
- **Data Warehouse**: Redshift, BigQuery, Synapse

### Integration Services

**APIs and messaging:**
- **API Gateway**: Kong, AWS API Gateway, Apigee
- **Messaging**: SQS, SNS, EventBridge, Kafka
- **Service Mesh**: Istio, Linkerd, App Mesh
- **ETL/Integration**: Glue, Data Factory, Fivetran

### Monitoring & Operations

**Observability stack:**
- **Metrics**: CloudWatch, Prometheus, Grafana
- **Logging**: CloudWatch Logs, ELK Stack, Splunk
- **Tracing**: X-Ray, Jaeger, Zipkin
- **APM**: DataDog, New Relic, Dynatrace
- **Alerting**: PagerDuty, Opsgenie

---

## 🎯 Cloud Projects

### Infrastructure Projects

```dataview
TABLE WITHOUT ID
  file.link as "Project",
  status as "Status",
  priority as "Priority",
  timeFrame as "Timeline"
FROM ""
WHERE type = "Project"
  AND (contains(tags, "infrastructure") OR contains(tags, "cloud") OR contains(tags, "domain/infrastructure"))
SORT status ASC, priority ASC
```

### Active Cloud Migrations

```dataview
TABLE WITHOUT ID
  file.link as "Project",
  priority as "Priority",
  timeFrame as "Timeline"
FROM ""
WHERE type = "Project"
  AND status = "active"
  AND (contains(title, "Migration") OR contains(title, "Cloud"))
SORT priority ASC
```

---

## 🔐 Security & Compliance

### Security Standards

**Document your security baseline:**
- IAM policies and role management
- Network security (security groups, NACLs, firewalls)
- Encryption at rest and in transit
- Secrets management (Vault, Secrets Manager)
- Certificate management
- DDoS protection
- WAF rules

### Compliance Requirements

**Track compliance frameworks:**
- SOC 2 requirements
- GDPR data residency
- HIPAA (if applicable)
- PCI-DSS (if applicable)
- Industry-specific regulations

**Create:**
- [[Page - Cloud Compliance Checklist]]
- [[Page - Security Incident Response Plan]]

---

## 💰 Cost Management

### Cost Optimization Strategies

**Document cost practices:**
- Right-sizing instances
- Reserved instances / Savings Plans
- Spot instances for batch workloads
- Auto-scaling policies
- Storage lifecycle policies
- Unused resource cleanup

### Cost Allocation

**Track spending by:**
- Project/team (tagging strategy)
- Environment (dev/staging/prod)
- Service category (compute/storage/data transfer)

**Create:**
- [[Page - Cloud Cost Optimization Guide]]
- Monthly cost review meeting notes

---

## 🚀 Deployment Patterns

### Infrastructure as Code

**Document your IaC approach:**
- **Tool**: Terraform, CloudFormation, Pulumi, ARM
- **Repository structure**
- **CI/CD for infrastructure**
- **State management**
- **Module library**

**Standards:**
- Naming conventions
- Tagging strategy
- Environment separation
- Secrets handling

### CI/CD Pipelines

**Document deployment workflows:**
- Source control (GitHub, GitLab, Bitbucket)
- Build pipelines (GitHub Actions, Jenkins, CircleCI)
- Artifact storage (ECR, Artifactory, Container Registry)
- Deployment strategies (blue-green, canary, rolling)
- GitOps approach (ArgoCD, Flux)

---

## 📊 Performance & Scalability

### Scaling Patterns

**Document auto-scaling:**
- Horizontal vs vertical scaling
- Auto-scaling triggers and metrics
- Load balancing strategies
- Database read replicas
- Caching strategies

### Performance Benchmarks

**Track performance targets:**
- API response times (p50, p95, p99)
- Database query performance
- Page load times
- Batch job SLAs

**Create:**
- [[Page - Performance Testing Strategy]]
- [[Page - Load Testing Results YYYY-MM]]

---

## 🌐 Multi-Region Architecture

### Global Infrastructure

**Document geographic strategy:**
- Region selection criteria
- Active-active vs active-passive
- Data replication strategy
- DNS and global load balancing
- Disaster recovery procedures

**Considerations:**
- Latency targets by region
- Data sovereignty requirements
- Compliance restrictions
- Cost implications

---

## 🔧 Operational Excellence

### Monitoring & Alerting

**Define monitoring strategy:**
- Key metrics to track
- Alert thresholds and severity levels
- On-call rotation and escalation
- Incident response procedures
- Post-mortem process

### Disaster Recovery

**Document DR procedures:**
- Backup strategy and retention
- Recovery Time Objective (RTO)
- Recovery Point Objective (RPO)
- Runbooks for common failures
- Regular DR testing schedule

**Create:**
- [[Page - Disaster Recovery Runbook]]
- [[Page - Backup and Restore Procedures]]

---

## 📚 Learning Resources

### Cloud Certifications

**Recommended certifications:**
- AWS Solutions Architect (Associate/Professional)
- AWS DevOps Engineer Professional
- Azure Solutions Architect Expert
- GCP Professional Cloud Architect
- Kubernetes certifications (CKA, CKAD)

### Training Materials

**External Resources:**
- Cloud provider documentation
- AWS Well-Architected Framework ([[Weblink - AWS Well-Architected Framework]])
- Azure Architecture Center
- Google Cloud Architecture Framework
- CNCF Cloud Native Landscape

### Internal Knowledge

**Create pages for:**
- Lessons learned from incidents
- Migration playbooks
- Troubleshooting guides
- Best practices from your environment

---

## 🏷️ Common Cloud Patterns

### Architecture Patterns

**Document patterns you use:**
- **Microservices**: Service decomposition, API design
- **Event-Driven**: Pub/sub, event sourcing, CQRS
- **Serverless**: Function-as-a-Service, event triggers
- **Container Orchestration**: Kubernetes patterns
- **API Gateway**: Routing, rate limiting, authentication
- **Circuit Breaker**: Fault tolerance, resilience
- **Strangler Fig**: Legacy migration pattern

### Anti-Patterns to Avoid

**Learn from mistakes:**
- Monolithic cloud migrations (lift-and-shift without optimization)
- Over-engineering for scale you don't have
- Ignoring cloud-native patterns
- Poor cost management
- Insufficient monitoring
- Manual deployments

---

## 📋 Cloud Checklists

### Pre-Production Checklist

**Before going live:**
- [ ] Security review completed
- [ ] IAM roles properly scoped
- [ ] Encryption enabled
- [ ] Monitoring and alerting configured
- [ ] Backup/DR tested
- [ ] Auto-scaling configured
- [ ] Cost budgets and alerts set
- [ ] Documentation updated
- [ ] Runbooks created
- [ ] Team trained on operations

### Monthly Review Checklist

**Operational review:**
- [ ] Review cost trends and optimization opportunities
- [ ] Check for unused resources
- [ ] Review security findings
- [ ] Update instance sizes (right-sizing)
- [ ] Review and clean up old snapshots/backups
- [ ] Check certificate expiration dates
- [ ] Review IAM access (principle of least privilege)
- [ ] Update documentation for changes

---

## 🔗 Integration Points

### How to Use This MOC

**Link from:**
- Project notes for cloud infrastructure projects
- ADRs for cloud technology decisions
- Meeting notes when discussing cloud architecture
- Task notes for cloud-related work

**Link to:**
- Specific cloud service documentation
- Infrastructure runbooks and procedures
- Cost reports and optimization guides
- Security and compliance documentation

**Cross-reference:**
- [[MOC - Technology & Architecture MOC]] - Overall tech standards
- [[MOC - ADRs MOC]] - All architecture decisions
- [[MOC - Projects MOC]] - Cloud migration projects
- [[MOC - Weblinks MOC]] - External cloud resources

---

## Related

**Navigation:**
- [[Dashboard - Main Dashboard]] - Main dashboard
- [[MOC - Technology & Architecture MOC]] - Tech standards hub
- [[MOC - Data Platform]] - Data architecture (if applicable)

**Key Pages to Create:**
- [[Page - Cloud Landing Zone Architecture]]
- [[Page - Cloud Cost Management]]
- [[Page - Cloud Security Standards]]
- [[Page - Disaster Recovery Plan]]
- [[Page - Infrastructure as Code Standards]]

**Next Steps:**
1. Customize this MOC for your cloud platform (AWS/Azure/GCP)
2. Create core documentation pages listed above
3. Link relevant ADRs about cloud decisions
4. Document your infrastructure patterns and standards
5. Add cloud-specific projects
6. Create runbooks and operational procedures

**Tips:**
- Keep this MOC updated as cloud architecture evolves
- Link cloud ADRs to projects that implement them
- Document lessons learned from incidents
- Use this as onboarding material for new team members
- Reference in architecture reviews
