# /architecture-report Skill

Generate comprehensive architecture reports for stakeholder communication, audits, and governance.

## When to Use This Skill

Use `/architecture-report` when you need to create:
- Executive architecture briefings
- Formal architecture reviews (security, compliance, technical)
- Architecture audit reports
- Governance compliance documentation
- Technical due diligence reports
- Architecture portfolio status reports

## Usage

```
/architecture-report <scope> [audience] [options]
```

### Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `scope` | What to report on (system, program, enterprise, all) | Yes |
| `audience` | Who is reading (executive, technical, audit, board) | Optional |
| `--period` | Time period (week, month, quarter, year, all-time) | Optional |
| `--format` | Output format (markdown, word, pdf, presentation) | Optional |

## Report Types

### 1. System Architecture Report

```
/architecture-report system:DataPlatform --audience technical
```

**Scope:** Single system (DataPlatform) with deep dive into:
- System description and purpose
- Technology stack and components
- Integrations and dependencies
- Performance metrics and SLAs
- Security and compliance posture
- Cost and operational metrics
- Architecture diagrams (C4 Level 2-3)
- Known issues and improvement backlog
- Roadmap and future evolution

### 2. Program Architecture Report

```
/architecture-report program:MyDataIntegration --audience executive
```

**Scope:** Program/Project with overview of:
- Program description and business case
- Systems involved and relationships
- Key architecture decisions (ADRs)
- Timeline and milestones
- Budget and spend tracking
- Risk status
- Critical dependencies
- Executive summary and recommendations

### 3. Enterprise Architecture Report

```
/architecture-report enterprise --audience board
```

**Scope:** Entire enterprise architecture covering:
- Enterprise architecture overview
- System landscape and classifications
- Critical dependencies and single points of failure
- Technology standards and compliance
- Financial summary (cost by system, total TCO)
- Architecture maturity assessment
- Strategic initiatives and roadmap
- Risk summary (technology, organizational, financial)
- Governance and decision-making overview

### 4. Architecture Review Report

```
/architecture-report system:DataPlatform --audience audit
```

**Scope:** Formal architecture review for:
- Security posture assessment
- Compliance status (SOX, ISO, GDPR, HIPAA, etc.)
- Data protection and privacy
- Disaster recovery readiness
- Performance and scalability
- Operational excellence
- Cost optimization
- Recommendations and action items

## Workflow

### Phase 1: Define Report Scope

User specifies:

1. **What to report on**
   - Single system (system:DataPlatform)
   - Program (program:MyDataIntegration)
   - Domain (domain:data, domain:integration)
   - All systems (enterprise)

2. **Who is the audience** (optional)
   - `executive` - CFO/CEO level, focus on business value
   - `technical` - Architects/engineers, focus on design
   - `audit` - Security/compliance, focus on controls
   - `board` - Board of directors, focus on risk/strategy
   - `all` - Comprehensive report for all audiences

3. **Time period** (optional)
   - Current state only
   - Quarter-over-quarter changes
   - Year-over-year trends
   - Historical evolution

4. **Output format** (optional)
   - Markdown (for vault)
   - Word/PDF (for distribution)
   - PowerPoint (for presentations)
   - HTML (for web publishing)

### Phase 2: Gather Data

The skill:

1. **Collects system information**
   - System properties (type, owner, criticality, cost)
   - Technology stack details
   - Integration landscape

2. **Extracts architecture documentation**
   - HLD/LLD documents
   - Architecture decisions (ADRs)
   - Scenarios and roadmaps
   - C4 diagrams

3. **Calculates metrics**
   - System inventory counts
   - Cost aggregations
   - Dependency counts
   - Risk scores

4. **Gathers compliance data**
   - Security status
   - Compliance frameworks
   - Data classification
   - Control assessments

### Phase 3: Generate Report

Creates comprehensive report with:
- Executive summary
- Detailed analysis sections
- Diagrams and visualizations
- Metrics and KPIs
- Risk assessment
- Recommendations
- Appendices (detailed data)

### Phase 4: Output

Generates report in requested format:
- Markdown (for vault storage and updates)
- PDF (for formal distribution and archival)
- PowerPoint (for presentations)
- Word (for collaborative editing)

## Report Sections

### Executive Summary (All Reports)

1-2 page overview containing:

```
Architecture Status Report: DataPlatform Data Integration Platform
═════════════════════════════════════════════════════════
Period: Q4 2025 (Oct-Dec 2025)
Reporting Date: 2026-01-14

EXECUTIVE SUMMARY
─────────────────
Current State: Stable and high-performing
Key Metrics: 99.95% availability, 450 pipelines, 150 TB data
Status: ✓ Green (All targets met)

Financial Impact:
  • Annual cost: £1.8M
  • Cost trend: +5%/year (within forecast)
  • ROI: Positive (data volume +15% year-over-year)

Key Achievements:
  1. Achieved 99.95% SLA (target: 99.95%)
  2. Completed real-time SAP integration (50K events/day)
  3. Reduced batch latency from 6h to 4.5h
  4. Migrated 40 pipelines to Kubernetes

Risks & Concerns:
  • Medium: Aging DataPlatform codebase needs modernization
  • Low: Skills gap in Spark expertise

Next Quarter:
  • Launch Snowflake Streaming integration
  • Retire legacy Informatica pipelines
  • Expand real-time capabilities
```

### Section 1: System Overview

For each system in scope:

- **Basic Information**
  - Name, type, owner, business purpose
  - Criticality, SLA, availability target

- **Technology Stack**
  - Languages, frameworks, databases
  - Hosting infrastructure
  - Key components

- **Deployment**
  - Infrastructure (AWS, on-prem, hybrid)
  - Environments (dev, test, prod, dr)
  - Data residency and compliance

- **Key Metrics**
  - Users/consumers
  - Data volume
  - Throughput
  - Latency

### Section 2: Architecture Decisions

Lists all ADRs related to scope:

- Decision title and status
- Rationale and alternatives considered
- Implementation status
- Recent updates

### Section 3: Integrations & Dependencies

Shows integration landscape:

- All systems this system connects to
- Integration patterns (real-time, batch, API)
- Data flows and volumes
- Critical dependencies (what breaks if this system fails)

Created as visual diagram + table format.

### Section 4: Performance & Reliability

Metrics and trends:

```
Performance Metrics (Last Quarter)
──────────────────────────────────
Availability:         99.95%  (target: 99.95%) ✓
Latency (p99):        1.2 sec (target: <2 sec)   ✓
Throughput:           450K evt/sec (target: 400K) ✓
Data Freshness:       <30 sec (target: <1 min)   ✓

Reliability Metrics
───────────────────
Incidents (P1/P2):    2 incidents (target: <3) ✓
MTTR:                 45 min (target: <1 hour) ✓
Unplanned Downtime:   1.5 hours/year (target: <4 hours) ✓

Trend Analysis:
  • Availability trending up (+0.05% vs last quarter)
  • Latency stable (consistent 1.2 sec p99)
  • No degradation despite 15% data volume growth
```

### Section 5: Security & Compliance

Compliance status and controls:

```
Compliance Status
─────────────────
SOX Compliance:    ✓ Compliant (last audit: 2025-11-01)
ISO 27001:         ✓ Certified (expires: 2027-03-15)
GDPR Data Rights:  ✓ Implemented (right to delete, access)
HIPAA:             N/A (not health data)
PCI-DSS:           ✓ Compliant (if payment data processed)

Security Controls
─────────────────
Encryption at Rest:     ✓ AES-256 (AWS KMS)
Encryption in Transit:  ✓ TLS 1.3
Access Control:         ✓ RBAC + MFA
Audit Logging:          ✓ CloudTrail + application logs
Data Classification:    ✓ Confidential (PII, financial data)
Penetration Testing:    ✓ Annual (last: 2025-10-15, clean)

Recent Findings:
  • Critical: None ✓
  • High: None ✓
  • Medium: 2 (both mitigated)
  • Low: 3 (documented for next release)

Remediation Status:
  Medium 1: Pending patch release (ETA: 2026-02-01)
  Medium 2: Working around, permanent fix planned Q2 2026
```

### Section 6: Financial Analysis

Cost breakdown and trends:

```
Annual Cost Breakdown
─────────────────────
Infrastructure (AWS):     £800K (44%)
  • EC2 (Spark workers): £450K
  • S3 storage:          £200K
  • RDS/Aurora:          £100K
  • Data transfer:       £50K

Software & Licensing:     £500K (28%)
  • Apache Spark:        £0 (open source)
  • Kafka:               £0 (open source)
  • Airflow:             £0 (open source)
  • vendor support:      £500K

Staffing:                 £500K (28%)
  • 3 engineers (avg £166K)
  • Dedicated on-call

                          ─────────
Total Annual:             £1.8M

Cost Trend:
  • FY2024: £1.7M
  • FY2025: £1.8M (+5.9%)
  • FY2026 forecast: £1.9M (+5.6%)

Cost Drivers:
  • Data volume growth (10 TB/day additional per year)
  • Increased compute (more real-time pipelines)
  • Stable staffing
```

### Section 7: Roadmap & Future Evolution

Known initiatives and plans:

```
Q1 2026: Snowflake Streaming Integration
  • Status: Approved, planning phase
  • Benefit: Real-time analytics (30-sec lag)
  • Cost: £35K setup, +£18K/year
  • Risk: Medium (Snowflake connector still new)

Q2 2026: Retire Informatica Pipelines
  • Status: In progress (2 of 8 pipelines migrated)
  • Benefit: Cost savings £200K/year
  • Cost: Migration effort (1 engineer, 6 months)
  • Risk: Low (DataPlatform proven stable)

Q3 2026: Spark to Scala Migration
  • Status: Planned
  • Benefit: Performance +30%, type safety
  • Cost: Rewrite 40 pipelines (3 engineers, 4 months)
  • Risk: High (major codebase change)

Q4 2026+: ML/Advanced Analytics
  • Status: Research phase
  • Benefit: Predictive analytics, anomaly detection
  • Cost: TBD (new ML team)
  • Risk: High (new domain)
```

### Section 8: Risk Assessment

Detailed risk analysis:

```
Risk Assessment Matrix
──────────────────────
Probability (vertical) vs Impact (horizontal)

           Low      Medium    High      Critical
Critical             ●(2)
High      ●          ●(1)
Medium    ●(3)       ●
Low       ●(4)

1. DataPlatform codebase complexity
   Probability: Medium (technical debt accumulating)
   Impact: High (difficult to enhance/maintain)
   Mitigation: Spark to Scala migration (Q3 2026)
   Owner: Chief Architect

2. Data volume growth outpaces infrastructure
   Probability: High (10 TB/day growth trend)
   Impact: Critical (performance degradation)
   Mitigation: Snowflake Streaming (Q1 2026), right-sizing
   Owner: Platform Lead

3. Skill gap in Spark expertise
   Probability: Medium (2 engineers, high demand)
   Impact: Medium (harder to onboard, maintain)
   Mitigation: Internal training, hire specialist
   Owner: Engineering Manager

4. AWS cost growth
   Probability: Low (cloud discounts available)
   Impact: Low (manageable with optimization)
   Mitigation: Reserved instances, spot instances
   Owner: Cloud Architect
```

### Section 9: Recommendations

Prioritized action items:

```
Priority 1 (This Quarter - Q1 2026)
───────────────────────────────────
1. Approve and fund Snowflake Streaming integration
   • Business value: Real-time analytics
   • Effort: 4 engineers, 3 months
   • Cost: £35K setup, +£18K/year
   • Target go-live: 2026-04-30

2. Negotiate AWS volume discount
   • Potential savings: £200K/year (3.8%)
   • Effort: Finance + AWS team, 1 month
   • No implementation risk

Priority 2 (Q2 2026)
───────────────────
3. Begin Informatica pipeline retirement
   • Cost savings: £200K/year
   • Effort: 1 engineer, ongoing
   • Risk: Low (DataPlatform proven)

4. Hire Spark specialist engineer
   • Salary: ~£85K
   • Timeline: Immediate (6-week recruitment)
   • Reduces skill gap and bus factor

Priority 3 (Q3 2026+)
────────────────────
5. Plan and execute Spark to Scala migration
   • Timeline: 4 months
   • Benefit: +30% performance, type safety
   • Risk: High (major refactor)
   • Decision needed: Cost/benefit analysis
```

### Section 10: Appendices

Detailed data for reference:

- **System metrics table** (all systems in scope)
- **Integration connectivity matrix** (what connects to what)
- **Technology inventory** (all technologies used)
- **Cost analysis spreadsheet** (detailed breakdown)
- **Compliance checklist** (all frameworks and status)
- **Contact directory** (owners, architects, on-call)
- **Glossary of terms** (domain-specific terminology)

## Report Customization

### By Audience

The skill tailors content based on audience:

**Executive Summary Only (5 pages):**
```
/architecture-report enterprise --audience board --depth summary
```

Contains:
- 1-page executive summary
- Key metrics dashboard
- Financial summary
- Risk summary
- Strategic recommendations

**Detailed Technical Report (30+ pages):**
```
/architecture-report enterprise --audience technical --depth comprehensive
```

Contains:
- All sections with technical deep-dive
- Architecture diagrams (C4, data flows)
- Technology details and comparisons
- Performance analysis
- Optimization opportunities

**Audit/Compliance Report (50+ pages):**
```
/architecture-report system:SAP --audience audit --depth comprehensive
```

Contains:
- Compliance checklist
- Security controls inventory
- Risk assessment
- Audit findings
- Remediation tracking
- Evidence references

### By Period

Show trends over time:

```
/architecture-report enterprise --period quarter
```

Compares current vs previous quarter with:
- Metrics trends
- Cost trends
- Risk status changes
- Initiative progress

## Output Examples

### Quick Summary (Markdown, 5 pages)

`Architecture Report - DataPlatform Q4 2025.md` (markdown format)

Embeds:
- Inline diagrams (Mermaid)
- Cost charts (Markdown tables)
- Risk matrix (Unicode text art)
- Links to related notes

### Formal Report (PDF, 30+ pages)

`Architecture Report - Enterprise 2026.pdf` (professional PDF)

Includes:
- Cover page with date/reviewer info
- Table of contents
- Executive summary
- Detailed sections with headings/subheadings
- Professional diagrams and charts
- Page numbers and headers/footers
- Appendices with detailed data

### Presentation Slides (PowerPoint)

`Architecture Review - MyDataIntegration Program.pptx` (presentation)

Includes:
- Title slide with date/presenter
- 1 slide per major section
- Diagrams and charts on each slide
- Notes for presenter
- Appendix slides with detailed data

## Quality Indicators

All reports include quality metadata:

```yaml
type: Page | Canvas | Dashboard
reportType: system | program | enterprise | audit
reportPeriod: Q4 2025
generatedDate: 2026-01-14
generatedBy: /architecture-report skill
audience: executive | technical | audit | board
dataFreshness: current          # All data current
verified: true                  # All metrics verified
nextReview: 2026-04-14         # Recommended review date
```

## Report Templating

Create custom report templates:

```
/architecture-report enterprise --template "Executive Board Review"
```

Templates store:
- Which sections to include
- Audience tailoring
- Branding/formatting
- Distribution list
- Review cycle

## Automated Report Generation

Schedule recurring reports:

```
/architecture-report enterprise --schedule "monthly on the 15th" --store
```

Automatically generates:
- Monthly enterprise report (15th of each month)
- Quarterly review (month 1, 4, 7, 10)
- Annual comprehensive review (January)

Distributes to stakeholders via email.

## Integration with Other Skills

The `/architecture-report` skill works with:

- **`/diagram`** - Generate diagrams for report
- **`/system-sync`** - Sync data before report generation
- **`/cost-optimization`** - Include cost analysis section
- **`/impact-analysis`** - Include impact of planned changes

## Next Steps

After generating report:

1. Review for accuracy and completeness
2. Distribute to stakeholders (via email, wiki, meetings)
3. Schedule review meetings if needed
4. Track recommendations (create tasks)
5. Plan next report cycle
6. Archive previous report (for historical comparison)

---

**Invoke with:** `/architecture-report <scope>`

**Example:** `/architecture-report enterprise --audience board` → Generates executive board briefing
