---
type: Page
title: Architecture Workflow Guide
created: 2026-01-28
modified: 2026-01-28
tags:
  - activity/documentation
  - activity/architecture
  - domain/tooling
  - audience/architect

# Quality Indicators
summary: Multi-skill workflows for documenting systems, integrations, diagrams, and architecture decisions
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-28

# Semantic Discovery
keywords:
  - architecture
  - systems
  - integration
  - diagrams
  - adr
  - c4-model
  - workflow

# Relationships
relatedTo:
  - "[[Page - Claude Code Skills Quick Reference]]"
  - "[[Page - Diagram and Visualisation Guide]]"
  - "[[Dashboard - Architecture Knowledge Graph]]"
  - "[[Page - Architecture Knowledge Graph Guide]]"
---

# Architecture Workflow Guide

This guide covers multi-skill workflows for architecture documentation. Learn how to combine skills to document systems, integrations, and decisions effectively.

---

## Architecture Documentation Overview

ArchitectKB provides a comprehensive set of skills for architecture work:

| Skill           | Creates               | Purpose                               |
| --------------- | --------------------- | ------------------------------------- |
| `/system`       | System note           | Document enterprise systems           |
| `/integration`  | Integration note      | Document system-to-system connections |
| `/architecture` | Architecture note     | Create HLDs and LLDs                  |
| `/scenario`     | Scenario note         | What-if analysis and future planning  |
| `/datasource`   | DataSource note       | Document databases, tables, APIs      |
| `/dataasset`    | DataAsset note        | Document data assets with lineage     |
| `/diagram`      | Diagram (PNG/Mermaid) | Generate architecture diagrams        |
| `/canvas`       | Canvas file           | Visual diagrams in Obsidian           |
| `/adr`          | ADR note              | Architecture Decision Records         |

---

## Workflow 1: Document a New System

When documenting a system for the first time, follow this workflow.

### Step 1: Create the System Note

```
/system Customer Portal
```

Claude will:

1. **Check for duplicates** - Avoid creating duplicate system documentation
2. **Gather information** - Ask about technology stack, hosting, criticality
3. **Collect metrics** - Transactions/sec, availability, cost
4. **Create comprehensive note** - Full documentation structure

**Example output:** `System - Customer Portal.md`

### Step 2: Document Integrations

For each system the Customer Portal connects to:

```
/integration CustomerPortal PaymentGateway
/integration CustomerPortal UserService
/integration ERP CustomerPortal
```

Each integration note captures:

- Source and target systems
- Integration pattern (real-time, batch, API)
- Data volume and latency
- Quality checks and SLAs

### Step 3: Generate System Context Diagram

```
/diagram c4-context CustomerPortal
```

Creates a C4 Level 1 diagram showing:

- The Customer Portal at the centre
- External actors (users, systems)
- Integration relationships

### Step 4: Document Key Decisions

```
/adr Customer Portal Technology Stack
```

Records why you chose:

- Frontend framework
- Backend language
- Database
- Hosting platform

### Complete Workflow Example

```
# 1. Create the system
/system Customer Portal

# 2. Document integrations
/integration CustomerPortal PaymentGateway
/integration CustomerPortal InventoryService
/integration OrderManagement CustomerPortal

# 3. Create context diagram
/diagram c4-context CustomerPortal

# 4. Record decisions
/adr Customer Portal Frontend Framework
/adr Customer Portal Database Selection
```

---

## Workflow 2: Create an ADR

Architecture Decision Records capture the "why" behind technical choices.

### Step 1: Create the ADR

```
/adr API Gateway Selection
```

Claude guides you through:

- **Context** - What problem are we solving?
- **Decision** - What did we choose?
- **Rationale** - Why this choice?
- **Consequences** - What are the trade-offs?
- **Alternatives** - What else was considered?

### Step 2: Link Relationships

After creation, update frontmatter with relationships:

```yaml
# Relationships
relatedTo:
  - "[[Project - Cloud Migration]]"
  - "[[System - API Gateway]]"
supersedes:
  - "[[ADR - Legacy Gateway Approach]]"
dependsOn:
  - "[[ADR - Cloud Platform Selection]]"
```

### Step 3: Add Quality Indicators

```yaml
# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-28
```

### Step 4: Update Status

Progress through the ADR lifecycle:

```yaml
status: draft     # Initial creation
status: proposed  # Ready for review
status: accepted  # Approved
status: deprecated # Superseded
```

### ADR Checklist

- [ ] Clear problem statement in Context
- [ ] Specific decision stated
- [ ] At least 3 alternatives considered
- [ ] Consequences (positive and negative) documented
- [ ] Relationships linked
- [ ] Quality indicators set
- [ ] Correct status

---

## Workflow 3: Build Data Flow Documentation

Document how data moves through your systems.

### Step 1: Identify Systems in the Flow

```
/system ERP Application
/system Data Integration Platform
/system Analytics Warehouse
```

### Step 2: Document Each Integration

```
/integration ERP DataIntegrationPlatform
/integration DataIntegrationPlatform AnalyticsWarehouse
```

For each integration, specify:

- **Pattern**: `real-time` | `batch-etl` | `api-gateway` | `event-streaming`
- **Frequency**: `real-time` | `hourly` | `daily`
- **Data volume**: Records/day or events/second
- **Latency target**: `<5 seconds` or `<4 hours`

### Step 3: Document Data Assets

```
/dataasset Customer Orders
/dataasset Revenue Facts
```

Each data asset includes:

- Producers and consumers
- Data lineage (upstream/downstream)
- Quality metrics
- Governance information

### Step 4: Generate Data Flow Diagram

```
/diagram data-flow CustomerData
```

Or create a Canvas:

```
/canvas Customer Data Flow
```

### Step 5: Create Integration Dependency Query

Query your integrations:

```
/q type:Integration sourceSystem:"System - ERP"
```

---

## Workflow 4: Enterprise Landscape Documentation

Document your entire system landscape.

### Step 1: Inventory Critical Systems

Start with critical systems:

```
/system ERP Application
/system Customer Database
/system Payment Gateway
/system Identity Service
```

Use consistent fields:

- `criticality: critical | high | medium | low`
- `systemType: application | platform | database | middleware | saas`
- `hosting: on-prem | aws | azure | saas | hybrid`

### Step 2: Generate System Landscape

```
/diagram system-landscape
```

Or as Canvas:

```
/canvas System Landscape
```

### Step 3: Generate System Roadmap

Using Gartner TIME model:

```
/system-roadmap
```

This shows systems by lifecycle category:

- **Tolerate** - Maintain, no investment
- **Invest** - Growing capability
- **Migrate** - Transitioning away
- **Eliminate** - Scheduled for retirement

### Step 4: Run Architecture Report

```
/architecture-report
```

Generates comprehensive report:

- System inventory
- Integration matrix
- Cost analysis
- Quality metrics

---

## Architecture Analysis Skills

### Impact Analysis

Understand what breaks if a system fails:

```
/impact-analysis Payment Gateway
```

Returns:

- Downstream systems affected
- Integration paths impacted
- Risk assessment
- Mitigation recommendations

### Dependency Graph

Visualise system dependencies:

```
/dependency-graph CustomerPortal
```

Identifies:

- Direct dependencies
- Transitive dependencies
- Single points of failure
- Circular dependencies

### Cost Optimisation

Find cost savings:

```
/cost-optimization all
```

Or for specific scope:

```
/cost-optimization domain:data
/cost-optimization hosting:aws
```

Identifies:

- Underutilised resources
- Right-sizing opportunities
- Contract optimisation
- Consolidation candidates

### Scenario Comparison

Compare architecture options:

```
/scenario-compare Current CloudMigration
```

Side-by-side comparison of:

- Setup and ongoing costs
- Risk profiles
- Timeline requirements
- Expected benefits

---

## Real Example: Data Platform Documentation

Let's walk through documenting a complete data platform.

### Phase 1: Core Systems

```
# Create core system notes
/system ERP Application
/system Data Integration Platform
/system Analytics Warehouse
/system API Gateway
```

### Phase 2: Integrations

```
# Real-time path
/integration ERP DataIntegrationPlatform

# Batch path
/integration DataIntegrationPlatform AnalyticsWarehouse

# API layer
/integration APIGateway DataIntegrationPlatform
```

### Phase 3: Architecture HLD

```
/architecture Data Platform HLD
```

Include:

- Executive summary
- Architecture vision
- Technology stack
- NFR targets
- Deployment topology
- Cost model

### Phase 4: Diagrams

```
# C4 Context
/diagram c4-context DataIntegrationPlatform

# System landscape
/canvas Data Platform Landscape

# Data flow
/diagram data-flow DataPlatform
```

### Phase 5: Key Decisions

```
/adr Data Platform Technology Selection
/adr Event Streaming vs Batch ETL
/adr Multi-Region Disaster Recovery
```

### Phase 6: Future Planning

```
/scenario Real-time Analytics Expansion
```

Include:

- Timeline (Q1-Q3 phases)
- Cost analysis (setup + recurring)
- Risk assessment
- Success criteria

### Phase 7: Analysis

```
# Generate reports
/architecture-report domain:data
/cost-optimization domain:data
/dependency-graph DataIntegrationPlatform
```

---

## Best Practices

### Documentation Quality

- **Be specific** - Include actual metrics, not estimates
- **Stay current** - Review quarterly, update reviewed date
- **Link everything** - Systems → Integrations → ADRs → Projects
- **Use consistent naming** - `System - Name`, `Integration - Source to Target`

### Relationship Tracking

Always maintain:

- `relatedTo` - General relationships
- `supersedes` - What this replaces
- `dependsOn` - What this requires
- `connectsTo` - System connections

### Quality Indicators

Set on all architecture notes:

- `confidence: high | medium | low`
- `freshness: current | recent | stale`
- `verified: true | false`
- `reviewed: YYYY-MM-DD`

### Tags

Use hierarchical tags:

- `activity/architecture`
- `domain/data` | `domain/integration` | `domain/cloud`
- `technology/kafka` | `technology/aws` | etc.
- `criticality/critical` | `criticality/high`

### Review Cadence

| Content Type | Review Frequency    |
| ------------ | ------------------- |
| Systems      | Quarterly           |
| Integrations | Quarterly           |
| ADRs         | When status changes |
| HLDs         | Semi-annually       |
| Scenarios    | When planning       |

---

## Quick Reference

### System Documentation

| Task               | Skill                            |
| ------------------ | -------------------------------- |
| New system         | `/system <name>`                 |
| System integration | `/integration <source> <target>` |
| System diagram     | `/diagram c4-context <system>`   |
| System landscape   | `/diagram system-landscape`      |
| System roadmap     | `/system-roadmap`                |

### Architecture Analysis

| Task                | Skill                           |
| ------------------- | ------------------------------- |
| Impact analysis     | `/impact-analysis <system>`     |
| Dependency graph    | `/dependency-graph <system>`    |
| Cost optimisation   | `/cost-optimization [scope]`    |
| Scenario comparison | `/scenario-compare <a> <b>`     |
| Architecture report | `/architecture-report [filter]` |

### Decision Records

| Task           | Skill                     |
| -------------- | ------------------------- |
| New ADR        | `/adr <title>`            |
| ADR report     | `/adr-report [period]`    |
| Find decisions | `/find-decisions <topic>` |

---

## Related Guides

- [[Page - Claude Code Skills Quick Reference]] - All skills reference
- [[Page - Diagram and Visualisation Guide]] - Diagram creation guide
- [[Page - Architecture Knowledge Graph Guide]] - Knowledge graph patterns
- [[Dashboard - Architecture Knowledge Graph]] - Architecture navigation
