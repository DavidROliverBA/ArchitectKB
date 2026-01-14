---
type: Page
title: "Architecture Knowledge Graph Guide"
description: "Comprehensive guide to using the Architecture Knowledge Graph feature for building enterprise architecture documentation"
created: 2026-01-14
modified: 2026-01-14
tags: [architecture, guide, knowledge-management, systems, integration]

# Quality Indicators
confidence: high
freshness: current
verified: true
reviewed: 2026-01-14
---

# Architecture Knowledge Graph Guide

## Overview

The Architecture Knowledge Graph is a comprehensive template system for building enterprise architecture documentation in Obsidian. It provides generic, customizable examples of Systems, Integrations, High-Level Designs, Scenarios, and Visual Diagrams that you can adapt for any organisation.

**This guide explains:**
- What each note type is for
- How to customise examples for your organisation
- Best practices for building your architecture knowledge base
- How to link components together effectively
- Real-world examples and patterns

---

## Getting Started (5 Minutes)

### 1. Explore the Sample Architecture

Start by reading the sample notes in this order:

1. **[[Dashboard - Architecture Knowledge Graph]]** - Central navigation hub
2. **[[Canvas - Sample System Landscape]]** - Visual overview of all systems
3. **[[Canvas - Sample Data Flow Diagram]]** - How data flows through the architecture
4. **[[System - Sample ERP Application]]** - Example of a core system
5. **[[Integration - Sample ERP to Data Platform Real-time]]** - Example real-time integration
6. **[[Architecture - Sample Data Integration Platform HLD]]** - Enterprise-wide architecture

This 15-20 minute review will give you the mental model you need.

### 2. Understand the Structure

The Architecture Knowledge Graph consists of 5 core note types:

| Type | Purpose | Example |
|------|---------|---------|
| **System** | Documents a software system, service, or platform | ERP, data warehouse, API gateway |
| **Integration** | Documents how two systems connect and exchange data | Kafka event bus, ETL pipeline |
| **Architecture** | Enterprise-wide design document (HLD) | Data platform architecture, cloud strategy |
| **Scenario** | Plan for expansion, migration, or optimization | Q1-Q3 roadmap, cloud migration plan |
| **Canvas** | Visual diagram for system landscape or data flows | System landscape, C4 diagram, data flow |

These are supported by:
- **Dashboard**: Central navigation with Dataview queries
- **Queries**: Filtered views (critical systems, real-time integrations, costs, etc.)

### 3. Decide Your Starting Point

**Option A: Data Integration Platform**
If you're building a data integration architecture (real-time + batch ETL), the sample templates are perfectly aligned. Simply customize the system names, metrics, and technologies.

**Option B: Custom Architecture**
If your architecture is different (microservices, event-driven systems, etc.), read the sample architecture to understand the pattern, then adapt it to your domain.

**Option C: Single System**
If you just want to document one system initially, create a System note first, then add integrations and architecture as you grow.

---

## Understanding Each Note Type

### System Notes

**Purpose**: Document a major software system, service, or infrastructure component.

**Use for**:
- ERP systems (SAP, Oracle, NetSuite)
- Data platforms and data warehouses
- APIs and middleware
- Cloud infrastructure
- Business applications
- Third-party SaaS services

**What to include**:
- Overview and key responsibilities
- Technology stack
- Key metrics (throughput, users, availability)
- Integration landscape (what connects to it)
- Performance characteristics
- Security and compliance
- Costs (if applicable)
- Disaster recovery strategy
- Monitoring and operations
- Customization guide

**Real example**: Read [[System - Sample ERP Application]] or [[System - Sample Data Integration Platform]]

**Creating your own**:
1. Copy an example System note
2. Rename: `System - <Your System Name>.md`
3. Update frontmatter:
   ```yaml
   systemId: <unique-id>
   title: "System - Your System Name"
   systemType: application | platform | infrastructure | data-warehouse
   criticality: critical | high | medium | low
   annualCost: £<cost>
   ```
4. Replace generic names with your system details
5. Update metrics and technology stack
6. Fill in integration landscape
7. Customize for your organisation (see section below)

**Linking to other notes**:
- Link integrations that source/target this system
- Link to architecture HLDs that include this system
- Link to projects that work on this system
- Link to related ADRs

### Integration Notes

**Purpose**: Document how data flows between two systems (source → target).

**Use for**:
- Real-time event streaming (Kafka, pub/sub)
- Batch ETL pipelines
- API integrations
- File-based transfers
- Database replication
- Message queues

**What to include**:
- Overview of the data flow
- Source and target systems
- Integration pattern (real-time, batch, API, etc.)
- Data flows and volumes
- Latency and throughput characteristics
- Data quality checks
- Failure scenarios and recovery
- Monitoring and alerting
- Operational procedures
- Customization guide

**Real examples**:
- [[Integration - Sample ERP to Data Platform Real-time]] (event-driven, <5 sec)
- [[Integration - Sample Data Platform to Analytics Batch]] (daily ETL, 4 hours)

**Creating your own**:
1. Copy an example Integration note (pick real-time or batch based on your pattern)
2. Rename: `Integration - <Source> to <Target>.md`
3. Update frontmatter:
   ```yaml
   integrationId: <unique-id>
   title: "Integration - Your Source to Your Target"
   integrationPattern: event-streaming | batch-etl | api | replication | file-transfer
   source: "[[System - Your Source]]"
   target: "[[System - Your Target]]"
   criticality: critical | high | medium
   ```
4. Replace generic system names with your actual systems
5. Update data flows, volumes, and latency
6. Describe your technology (Kafka, Informatica, Talend, custom Spark, etc.)
7. Document your data quality rules
8. List operational procedures and monitoring

**Linking**:
- Link to source system (in `source` field)
- Link to target system (in `target` field)
- Link to architecture HLD that includes this integration
- Link to related projects

### Architecture Notes

**Purpose**: Enterprise-wide high-level design (HLD) document for a major architecture component.

**Use for**:
- Data integration platform architecture
- Cloud infrastructure design
- Microservices architecture
- Integration strategy
- Security architecture
- Data governance architecture

**What to include**:
- Executive summary
- Architecture vision and diagram
- Technology stack by layer
- Functional architecture (real-time path, batch path, APIs, etc.)
- Non-functional requirements (performance, availability, scalability, security, compliance)
- Deployment architecture (regions, availability zones, failover)
- Cost model
- Roadmap (quarterly plans)
- Decision records (links to related ADRs)
- Customization guide

**Real example**: [[Architecture - Sample Data Integration Platform HLD]] (1,500+ lines)

**Creating your own**:
1. Copy the sample Architecture HLD
2. Rename: `Architecture - <Your Component> HLD.md`
3. Update frontmatter:
   ```yaml
   type: Architecture
   title: "Architecture - Your Component HLD"
   version: "1.0"
   status: active | draft
   systems: ["[[System - A]]", "[[System - B]]"]
   integrations: ["[[Integration - X to Y]]"]
   ```
4. Replace generic system names with your actual systems
5. Update technology stack for your choices (Kafka vs Kinesis, Spark vs Flink, etc.)
6. Adjust NFR targets for your business requirements
7. Document your actual deployment topology
8. Update cost analysis with your actual infrastructure costs
9. Create realistic quarterly roadmap

**Important**: The architecture HLD is where you bring together all your systems, integrations, and design decisions. It should reference your specific systems and answer "how does everything fit together?"

**Linking**:
- List all relevant systems in `systems` field
- List all relevant integrations in `integrations` field
- Link to related ADRs (decisions that support this architecture)
- Link to scenario notes based on this architecture

### Scenario Notes

**Purpose**: Plan for an expansion, optimization, migration, or major change to the architecture.

**Use for**:
- Expansion roadmaps (adding new data sources, capabilities)
- Optimization plans (cost reduction, performance improvement)
- Migration strategies (moving systems, changing technologies)
- Modernization initiatives
- Major upgrades or infrastructure changes

**What to include**:
- Executive summary with business case
- Current state (baseline) description
- Future state (after scenario) description
- Implementation timeline (phases, months)
- Financial analysis (setup costs, annual costs, benefits, ROI)
- Risk assessment (technical, operational, business risks)
- Alternative scenarios (if/then options)
- Success criteria and KPIs
- Customization guide

**Real example**: [[Scenario - Sample Real-time Analytics Expansion]] (1,200+ lines with 9-month roadmap, £301K setup, £1.7M annual benefits)

**Creating your own**:
1. Copy the sample Scenario note
2. Rename: `Scenario - <Your Scenario>.md`
3. Update frontmatter:
   ```yaml
   type: Scenario
   title: "Scenario - Your Scenario Name"
   status: explored | planned | in-progress | implemented
   parent-architecture: "[[Architecture - Your HLD]]"
   ```
4. Replace generic descriptions with your actual expansion/optimization
5. Update timeline phases based on your team capacity
6. Recalculate financial analysis:
   - Update costs based on YOUR cloud provider & pricing
   - Estimate benefits from YOUR business metrics
   - Calculate ROI based on YOUR assumptions
7. Adapt risk assessment to YOUR context
8. Define success criteria aligned with YOUR business goals

**Tip**: Use scenarios to evaluate "should we do this?" You can create multiple scenarios (Conservative, Aggressive, etc.) and compare them.

**Linking**:
- Link to parent architecture (in `parent-architecture` field)
- Link to related systems and integrations being added
- Link to related projects that will implement the scenario

### Canvas Notes

**Purpose**: Visual diagrams showing system landscape, data flows, or architecture context.

**Use for**:
- System landscape overview (all systems and how they connect)
- C4 Context Diagram (system boundary and external dependencies)
- Data Flow Diagram (how data moves through the architecture)
- AWS/Cloud Architecture (infrastructure detail)
- Disaster Recovery (failover paths)

**What to include**:
- Mermaid diagram (or ASCII art) showing visual relationships
- Legend (colors, symbols, meanings)
- Key metrics (latency, throughput, volume)
- Setup instructions for building in Obsidian Canvas
- Customization guide

**Real examples**:
- [[Canvas - Sample System Landscape]] - All systems, criticality coding, connections
- [[Canvas - Sample C4 Context Diagram]] - System boundary, external actors, deployment context
- [[Canvas - Sample Data Flow Diagram]] - Real-time, batch, API paths with detailed latency

**Creating your own**:
1. Copy the sample Canvas that's closest to your need
2. Rename: `Canvas - Your Name.md`
3. Update frontmatter:
   ```yaml
   type: Canvas
   title: "Canvas - Your Name"
   description: "Your description"
   ```
4. Update Mermaid diagram:
   - Replace generic system names with your actual systems
   - Update connections for your data flows
   - Adjust styling (colors) as desired
5. Update metrics (latency, volume, SLA)
6. Add customization instructions

**Viewing Canvas in Obsidian**:
- The Mermaid diagrams render as text flowcharts
- For full Canvas (interactive node-based) editing:
  - You can manually create nodes and connections in Obsidian Canvas interface
  - Or keep the Mermaid diagrams as fast ASCII representations

**Linking**:
- Reference the systems and integrations shown in the canvas
- Link to related architecture HLD
- Link to data flow documentation

---

## Customization: From Generic to Your Organisation

Every sample note includes a "Customization Guide" section. Here's how to use it:

### Step 1: Replace Generic Names

**Before**:
```yaml
title: "System - Sample ERP Application"
systemId: erp-001
hostedOn: "[[System - Sample Cloud Infrastructure]]"
```

**After**:
```yaml
title: "System - SAP S/4HANA"
systemId: sap-s4h-001
hostedOn: "[[System - AWS Cloud Infrastructure]]"
```

Use find-and-replace in Obsidian to replace all instances:
- "Sample ERP Application" → "SAP S/4HANA" (or your actual ERP)
- "Sample Data Integration Platform" → "Talend Integration" (or your actual platform)
- "Sample Analytics Warehouse" → "Snowflake" (or your actual warehouse)

### Step 2: Update Technologies

**ERP System**:
- Replace "ABAP, Java, REST APIs" with your actual tech (or keep if similar)
- Update to your ERP version/edition

**Data Integration Platform**:
- Replace "Kafka-style" → "Apache Kafka" or "AWS MSK" or "Azure Event Hubs"
- Replace "Spark" → Your actual technology (Talend, Informatica, custom Spark, etc.)
- Update orchestration tool (Airflow, Kubernetes CronJob, AWS Glue, etc.)

**Analytics Warehouse**:
- Replace "Cloud data warehouse" → "Snowflake" or "Redshift" or "BigQuery"
- Update regions and availability zones

**Cloud Infrastructure**:
- Replace "Cloud provider" with your actual provider (AWS, Azure, GCP)
- Update regions, instance types, services used

### Step 3: Update Metrics

**Daily Data Volume**:
- Replace "250,000 events/day" with YOUR actual volume
- Multiply all downstream volumes proportionally

**Example**: If your ERP generates 100,000 transactions/day (not 250K):
- Event Bus: Scale down to 40K orders, 20K invoices, 40K GL posts (adjust proportionally)
- Storage: 150 TB active becomes 60 TB (scaled)
- Annual cost: £5.2M becomes ~£2.1M (scaled)

**Throughput**:
- Replace "500 events/sec" with YOUR peak events/sec
- Update burst capacity accordingly

**Latency**:
- Your real-time SLA might be different (< 10 sec instead of <5 sec)
- Your batch window might be different (6 hours instead of 4)

**Users & Concurrency**:
- Replace "500 concurrent users" with YOUR actual analytics users
- Update dashboard count and table count

### Step 4: Adapt to Your Business

**Financial**:
- Replace costs with YOUR cloud provider's actual pricing
- Use AWS calculator, GCP pricing estimator, or Snowflake pricing guide
- Adjust staffing costs based on YOUR team size

**Compliance**:
- Replace "ISO 27001, SOX" with YOUR actual requirements (GDPR, HIPAA, PCI-DSS, industry-specific, etc.)
- Update retention policies (7 years might be different for you)

**Operational**:
- Replace "3-broker Kafka cluster" with your actual cluster size
- Update on-call rotation and support model
- Adjust SLA targets (99.95% might be higher or lower for you)

### Step 5: Link to Your Other Notes

In the frontmatter, link to your actual systems and related ADRs:

```yaml
systems:
  - "[[System - Your ERP]]"
  - "[[System - Your Data Platform]]"
  - "[[System - Your Analytics Warehouse]]"

relatedDecisions:
  - "[[ADR - Why We Chose Kafka]]"
  - "[[ADR - Snowflake vs Redshift]]"
```

---

## Building Your Knowledge Graph (Step-by-Step)

### Phase 1: Document Core Systems (Week 1)

Create System notes for your critical systems:

1. **Start with your source system**
   - Copy `System - Sample ERP Application.md`
   - Rename to your ERP name
   - Update all generic references
   - Fill in YOUR tech stack, volumes, costs

2. **Document your data platform** (if you have one)
   - Copy `System - Sample Data Integration Platform.md`
   - Rename appropriately
   - Update technologies and metrics
   - Describe YOUR pipelines, not sample ones

3. **Document your analytics system**
   - Copy `System - Sample Analytics Warehouse.md`
   - Update for your warehouse technology
   - Document YOUR actual tables and users

4. **Add supporting systems** (APIs, middleware, infrastructure)
   - Create System notes for ANY system you need to reference in architecture
   - Use samples as templates

**Deliverable**: 4-5 System notes describing your core architecture

### Phase 2: Document Integrations (Week 2)

Create Integration notes for how your systems connect:

1. **Real-time integrations** (if applicable)
   - Copy `Integration - Sample ERP to Data Platform Real-time.md`
   - Update source/target systems
   - Document YOUR event topics, volumes, technologies
   - Update latency and quality framework

2. **Batch integrations** (if applicable)
   - Copy `Integration - Sample Data Platform to Analytics Batch.md`
   - Update source/target and schedule
   - Document YOUR transformation logic
   - Update SLA and monitoring

3. **API integrations** (if applicable)
   - Create new Integration note for external API access
   - Document rate limiting, authentication, SLA
   - Link to API Gateway system

4. **Other integrations**
   - File transfer? Database replication? Webhook? Create integration notes

**Deliverable**: 2-4 Integration notes showing data flows

### Phase 3: Create Architecture HLD (Week 3)

Document the big picture:

1. Copy `Architecture - Sample Data Integration Platform HLD.md`
2. Update the title for YOUR architecture
3. Replace all system references with YOUR systems
4. Redraw the architecture diagrams for YOUR topology
5. Rewrite functional architecture sections for YOUR data flows
6. Update NFR targets for YOUR requirements
7. Calculate costs for YOUR infrastructure
8. Create realistic quarterly roadmap for YOUR priorities

**Deliverable**: 1 Architecture HLD bringing everything together

### Phase 4: Plan Scenarios (Week 4)

Optionally, create scenario notes for future plans:

1. Copy `Scenario - Sample Real-time Analytics Expansion.md`
2. Define YOUR expansion/optimization plan
3. Break into realistic phases
4. Calculate costs and benefits for YOUR context
5. Assess risks specific to YOUR situation
6. Define success criteria for YOUR business

**Deliverable**: 1-2 Scenario notes showing future direction

### Phase 5: Create Visualisations (Ongoing)

Add Canvas diagrams:

1. `Canvas - Your System Landscape.md` (who are all your systems?)
2. `Canvas - Your C4 Context.md` (what's inside vs outside your boundary?)
3. `Canvas - Your Data Flow.md` (how does data move?)
4. Any other diagrams specific to YOUR architecture

**Deliverable**: 2-4 Canvas notes with visual diagrams

### Phase 6: Build Navigation (Week 5)

Create custom queries and update dashboard:

1. Copy `Dashboard - Architecture Knowledge Graph.md`
2. Update all system/integration names in queries
3. Create custom queries for YOUR specific needs:
   - Critical systems for YOUR business
   - Cost breakdown for YOUR org
   - Data volume trends
   - Integration health

**Deliverable**: Updated Dashboard + custom queries

---

## Best Practices

### 1. Naming Consistency

Be consistent with system names across all notes:

```yaml
# System notes
System - SAP S/4HANA.md
System - Talend Data Integration.md
System - Snowflake Analytics.md

# Integration notes
Integration - SAP to Talend Real-time.md
Integration - Talend to Snowflake Batch.md

# In frontmatter, always use exact same names
source: "[[System - SAP S/4HANA]]"
target: "[[System - Talend Data Integration]]"
```

### 2. Maintain Metrics Consistency

When you update metrics in one note, update related notes:

If System A produces 100K events/day:
- Update System A (source) with this volume
- Update Integration A→B with "100K events/day from A"
- Update System B (target) with "receives 100K events/day from A"
- Update costs for both systems proportionally

### 3. Link Liberally

The power of this system is the connections:

- **Systems** link to Integrations that source/target them
- **Integrations** link to Architecture HLDs that include them
- **Architecture HLDs** link to Scenarios based on them
- **Scenarios** link to Projects implementing them

### 4. Keep Things Current

Review quarterly:
- Are system metrics still accurate? (data volumes, user counts)
- Have integrations changed? (new real-time paths? batch schedule changes?)
- Is architecture still valid? (technology changes?)
- Are scenarios still relevant? (priorities shifted?)

Update `reviewed: YYYY-MM-DD` field when you verify content.

### 5. Document Assumptions

Always document what you're assuming:

```yaml
assumptions:
  - "Event volume scales linearly with order volume"
  - "Peak concurrency is 2x average"
  - "Network latency between regions <50ms"
  - "RTO target of 1 hour is acceptable"
```

### 6. Use Status Field

In integrations and scenarios, track status:

```yaml
status: active      # Currently in production
status: proposed    # Design proposal, not implemented
status: deprecated  # No longer used, keeping for history
```

---

## Common Patterns

### Pattern 1: Real-time + Batch Dual Path

Many architectures have both:

**System Design**:
- System A: Source system (generates transactions)
- System B: Data platform (processes real-time + batch)
- System C: Analytics warehouse (stores results)

**Integrations**:
- A → B Real-time (events via Kafka, <5 sec latency)
- A → B Batch (daily extract, 10 TB/day)
- B → C Real-time (stream to analytics, 30 sec lag)
- B → C Batch (nightly load, 4 hour latency)

**Use Cases**:
- Real-time: Operational dashboards, alerts, monitoring
- Batch: Analytics, reporting, compliance, historical analysis

### Pattern 2: Hub-and-Spoke (Many Sources → Central Platform)

When you have multiple source systems:

```
SAP ERP ──┐
          ├─→ Data Platform ──→ Analytics Warehouse
NetSuite ─┤
Salesforce┘
```

Create separate Integration notes for each source:
- Integration - SAP to Data Platform
- Integration - NetSuite to Data Platform
- Integration - Salesforce to Data Platform

### Pattern 3: Multi-Hop (A → B → C → D)

Data flows through multiple systems:

```
ERP → Event Bus → Data Platform → Data Lake → Analytics → BI Tools
```

Create separate Integration notes:
- Integration - ERP to Event Bus
- Integration - Event Bus to Data Platform
- Integration - Data Platform to Data Lake (implicit)
- Integration - Data Lake to Analytics (batch load)
- Integration - Analytics to BI Tools (query interface)

---

## Real-World Example: Building Your Data Integration Architecture

Let's say you're documenting a Snowflake-based data architecture. Here's what you'd create:

**Systems**:
```
System - Salesforce CRM.md (source system)
System - Stripe Payments.md (source system)
System - Fivetran Data Integration.md (data platform)
System - Snowflake Analytics.md (target warehouse)
System - Tableau Analytics.md (BI tool)
System - AWS Cloud Infrastructure.md (hosting)
```

**Integrations**:
```
Integration - Salesforce to Fivetran Real-time.md
Integration - Stripe to Fivetran Real-time.md
Integration - Fivetran to Snowflake Daily.md
Integration - Snowflake to Tableau API.md
```

**Architecture**:
```
Architecture - Snowflake Data Warehouse HLD.md
(Describes all 6 systems, 4 integrations, deployment topology, costs, NFRs)
```

**Scenarios**:
```
Scenario - Real-time Analytics Initiative.md
(Plan to add real-time dashboards, add more sources, etc.)
```

**Visualisations**:
```
Canvas - Data Integration Landscape.md (all systems)
Canvas - Salesforce to Snowflake Data Flow.md (specific path)
```

**Navigation**:
```
Dashboard - Data Architecture.md (updated queries)
Query - Salesforce Integration Health.md (custom)
Query - Snowflake Cost Analysis.md (custom)
```

---

## Linking to Your Projects & ADRs

Once you've documented your architecture, link it to your other work:

**In Project notes**:
```yaml
relatedArchitecture: "[[Architecture - Your Data Platform HLD]]"
systems: ["[[System - Your ERP]]", "[[System - Your Data Platform]]"]
```

**In ADR notes**:
```yaml
relatedArchitecture: "[[Architecture - Your Data Platform HLD]]"
context: "As described in [[Architecture - Your Data Platform HLD]], we needed to decide..."
```

**In Meeting notes**:
```yaml
discussion: "Reviewed [[Architecture - Your Data Platform HLD]] and discussed [[System - Your ERP]] integration timing"
```

---

## Troubleshooting

### Problem: Too Many Systems to Document

**Solution**: Start with critical path only
- Document your source system
- Document your core integration
- Document your analytics system
- Then add supporting systems as needed

You don't need everything at once.

### Problem: Metrics Are Constantly Changing

**Solution**: Document ranges and trends, not precise numbers
```yaml
dailyEventVolume: "100K-150K (peak depends on month-end close)"
annualCost: "~£2.1M (varies with usage)"
```

Update quarterly when you refresh metrics.

### Problem: System Relationships Are Complex

**Solution**: Create multiple visualisations
- One Canvas showing all systems
- Additional Canvas notes showing specific data flows
- System notes explain relationships in text

### Problem: Architecture Keeps Evolving

**Solution**: Use Scenario notes
- Keep current architecture HLD stable
- Create new Scenario notes for future plans
- When scenario is approved, update HLD
- Archive old scenarios

---

## Next Steps

1. **Read the samples** (15 mins)
   - Dashboard, Systems, Integrations, HLD, Scenario, Canvas notes

2. **Copy & customise** (1-2 hours)
   - Pick one System note
   - Rename and update for your organisation
   - Update technology stack and metrics
   - Complete one note end-to-end

3. **Build phase 1** (1 week)
   - Create 4-5 System notes
   - Document your core systems

4. **Add integrations** (1 week)
   - Create 2-4 Integration notes
   - Show how systems connect

5. **Create HLD** (1 week)
   - Bring everything together in Architecture HLD
   - Make it reference YOUR systems

6. **Build navigation** (2-3 days)
   - Create custom Dashboard
   - Add queries specific to YOUR architecture

7. **Plan scenarios** (ongoing)
   - As you think about expansions/optimisations, create Scenario notes

---

## Related Notes

- **Dashboard**: [[Dashboard - Architecture Knowledge Graph]]
- **System Examples**: [[System - Sample ERP Application]], [[System - Sample Data Integration Platform]]
- **Integration Examples**: [[Integration - Sample ERP to Data Platform Real-time]], [[Integration - Sample Data Platform to Analytics Batch]]
- **Architecture Example**: [[Architecture - Sample Data Integration Platform HLD]]
- **Scenario Example**: [[Scenario - Sample Real-time Analytics Expansion]]
- **Canvas Examples**: [[Canvas - Sample System Landscape]], [[Canvas - Sample C4 Context Diagram]], [[Canvas - Sample Data Flow Diagram]]

---

**Ready to start building your architecture knowledge base? Pick a System note and customise it for your organisation!**
