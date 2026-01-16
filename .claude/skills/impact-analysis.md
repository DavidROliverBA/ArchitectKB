# /impact-analysis Skill

Analyze the impact of architectural changes on systems, integrations, and organizational outcomes.

## When to Use This Skill

Use `/impact-analysis` when you need to understand consequences of changes:
- Assess impact of retiring a system
- Understand cascading failures if a system goes down
- Evaluate impact of technology upgrades
- Analyze organizational impacts (skills, processes, teams)
- Create risk mitigation plans for major changes

## Usage

```
/impact-analysis <change-description> [scope] [options]
```

### Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `change-description` | What is changing (e.g., "Retire Tableau") | Yes |
| `scope` | What to analyze (systems, people, process, financial, technical, all) | Optional |
| `--depth` | Analysis depth (quick, standard, comprehensive) | Optional |
| `--format` | Output format (markdown, spreadsheet, presentation) | Optional |

## Workflow

### Phase 1: Define Change

User describes the change:

1. **What is changing?**
   - Retire a system
   - Upgrade technology
   - Replace tool
   - Migrate to cloud
   - Add new capability

2. **Affected systems** (optional - auto-detected if omitted)
   - Which systems involved?
   - Primary system(s) affected
   - Secondary dependencies

3. **Timeline** (optional)
   - When does change happen?
   - Phase 1, Phase 2, Phase 3?
   - Go-live date?

4. **Scope of analysis** (optional)
   - Systems impact (technical)
   - Integration impact (data flows)
   - People impact (teams, skills)
   - Process impact (workflows)
   - Financial impact (cost, ROI)
   - All of the above

### Phase 2: Analyze Impacts

The skill:

1. **Maps dependencies**
   - Finds all systems that depend on changed system
   - Identifies integration points
   - Maps data flows

2. **Calculates cascading effects**
   - If system X goes down, what breaks?
   - What is recovery path?
   - How long until restoration?

3. **Identifies organizational impacts**
   - Which teams affected?
   - What skills required?
   - Who needs training?

4. **Quantifies financial impacts**
   - Cost of downtime (lost transactions, user productivity)
   - Cost of mitigation
   - Cost of training
   - Savings from change

5. **Assesses risks**
   - Technical risks (integration failures)
   - Organizational risks (skill gaps)
   - Financial risks (cost overruns)
   - Schedule risks (delays)

### Phase 3: Generate Report

Creates comprehensive impact report with:

1. **Impact Summary** (1 page)
   - Change description
   - Primary impacts
   - Critical risks
   - Mitigation strategies

2. **Detailed Impact Analysis**
   - Systems impact
   - Integration impact
   - People/Organizational impact
   - Process impact
   - Financial impact

3. **Dependency Visualization**
   - Diagram showing affected systems
   - Data flow changes
   - Recovery paths

4. **Contingency Planning**
   - Failure scenarios
   - Mitigation for each
   - RTO/RPO targets

5. **Implementation Checklist**
   - Pre-implementation steps
   - Go-live steps
   - Post-implementation validation
   - Rollback procedures

## Examples

### Example 1: Impact of Retiring Tableau

```
/impact-analysis "Retire Tableau and migrate to Looker" --scope all
```

**Prompts:**
1. Change: "Retire Tableau dashboards"
2. Timeline: "Q1-Q3 2026 (3 phases)"
3. Scope: All (systems, people, process, financial)
4. Depth: Comprehensive

**Output:** `Impact Analysis - Tableau Retirement.md` containing:

**Impact Summary:**
- 100 dashboards to migrate
- 250 users to train
- 40 business processes affected
- Cost: £72K setup + training
- Benefit: £51K/year savings
- Risk: Medium (user adoption, timeline pressure)

**Systems Impact:**
- Snowflake: No technical change, increased query load
- DataPlatform: Minor changes to metadata for Looker integration
- Kong: New API endpoints for Looker access
- SAP: No change

**Integration Impact:**
- Snowflake → Looker (new direct connection, vs Tableau)
- Remove: Snowflake → Tableau connections
- User impact: Login flow changes (OAuth vs username/password)

**People/Organizational Impact:**
- Finance Team (50 users): Need Looker training (1 week)
- Operations Team (100 users): Need Looker training (3 days)
- Data Analytics Team (20 analysts): Deep Looker certification (2 weeks)
- Data Platform Team: 2 engineers for integration work

**Process Impact:**
- Dashboard creation: Different UI, some new capabilities
- Data refresh: Same schedule, different mechanism
- Access control: RBAC in Looker vs dataset-level in Tableau
- Monitoring: New alerting mechanisms

**Financial Impact:**
- Setup: £72K (migration, integration, training)
- Savings: £51K/year (Looker cheaper than Tableau)
- Hidden costs: Support, training materials
- 3-year break-even

**Critical Risks:**
1. User resistance to new tool
   - Mitigation: Early training, champion program
   - Contingency: Extended Tableau support (costs £20K)

2. Integration delays with Looker
   - Mitigation: Early testing, vendor support
   - Contingency: Temporary hybrid (Tableau + Looker)

3. Dashboard migration complexity
   - Mitigation: Phased migration (80% auto-migration possible)
   - Contingency: Rebuild vs migrate decision per dashboard

**Dependency Diagram:**
Shows all 250 Tableau users and 100 dashboards, with:
- Criticality level (red = critical, orange = high, blue = medium)
- Migration complexity (simple, standard, complex)
- Dependencies on other systems (Snowflake, DataPlatform)

### Example 2: Impact of SAP Upgrade

```
/impact-analysis "Upgrade SAP S/4HANA from 2020 to 2023" --scope technical,financial
```

**Output:** Technical + financial impact focusing on:

- **System impact:**
  - HANA database upgrade (performance improvement)
  - ABAP runtime updates
  - API changes (may require Kong policy updates)

- **Integration impact:**
  - Kafka event schema changes (potential breaking changes)
  - DataPlatform connector compatibility
  - Possible data enrichment changes

- **Financial impact:**
  - License cost changes
  - Performance improvement (reduced compute cost)
  - Implementation cost and effort
  - Risk mitigation cost

### Example 3: Impact of AWS Region Migration

```
/impact-analysis "Migrate from eu-west-1 to eu-central-1" --scope systems,financial --depth quick
```

**Output:** Quick analysis showing:

- **Systems affected:** All AWS-hosted systems (SAP, DataPlatform, Kong, Kafka)
- **Network changes:** DX endpoint changes, VPN reconfiguration
- **Cost impact:** Potential cost changes by region
- **Timeline:** Minimal (can be quick with proper planning)
- **Critical risks:** DNS failover, temporary dual-region costs
- **Rollback:** Can return to eu-west-1 if needed

## Impact Dimensions

### 1. System Impact

For each affected system:

- **Availability impact**
  - Downtime required (if any)
  - Failover impact
  - RTO/RPO changes

- **Performance impact**
  - Throughput changes
  - Latency changes
  - Scaling implications

- **Integration impact**
  - API changes
  - Data format changes
  - Connection requirement changes

- **Data impact**
  - Schema changes
  - Data migration required
  - Historical data impact

### 2. Integration Impact

For each affected integration:

- **Breaking changes** (yes/no)
- **Compatibility** (backward compatible? forward compatible?)
- **Data flow changes** (topology, format, latency)
- **Error handling changes**
- **Monitoring changes**

Typically creates a compatibility matrix:

```
Integration              Current             Post-Change      Compatible?
─────────────────────────────────────────────────────────────────────────
SAP → Kafka             CloudEvents schema   Extended schema  Backward OK
Kafka → DataPlatform            Avro + Kafka       Avro + Kafka      No change
DataPlatform → Snowflake        Parquet/S3         Snowflake Stream   Breaking
```

### 3. People/Organizational Impact

Analyzes:

- **Team impact** - Which teams affected?
- **Skill gap** - What new skills needed?
- **Training needs** - How many people, how long?
- **Organizational change** - New roles/reporting?
- **Morale** - Positive/negative perception?
- **Staffing** - New hires needed?

Creates org change impact summary:

```
Team              Impact    New Skills Required    Training Hours    Headcount
──────────────────────────────────────────────────────────────────────────────
Data Platform     High      Looker integration     40 hours          +1 engineer
Analytics         High      Looker dashboarding    24 hours          0
Finance           Medium    Looker UI/navigation  8 hours           0
Operations        Low       None (transparent)    0 hours           0
```

### 4. Process Impact

Analyzes:

- **Workflow changes** - How do processes change?
- **Approval flows** - Do approvals change?
- **SLAs** - Do SLAs change (latency, uptime)?
- **Runbooks** - Which operational procedures change?
- **Escalation paths** - Do escalation procedures change?

### 5. Financial Impact

Calculates:

- **Implementation cost** (one-time)
  - Development/integration effort
  - Training costs
  - Vendor implementation services

- **Operational cost changes** (recurring)
  - License cost increase/decrease
  - Infrastructure cost change
  - Support cost change
  - Staffing cost change

- **Hidden costs**
  - User productivity impact during transition
  - Support tickets/issues during cutover
  - System unavailability cost

- **Benefits/savings**
  - License savings
  - Performance improvements (reduced compute)
  - Productivity gains
  - Risk reduction

Creates financial impact summary:

```
Impact Category           Year 1        Year 2        Year 3
───────────────────────────────────────────────────────────────
Implementation Cost       -£72,000      £0            £0
License Savings           +£51,000      +£51,000      +£51,000
Infrastructure Savings    £0            +£10,000      +£10,000
Training/Support Cost     -£30,000      £0            £0
─────────────────────────────────────────────────────────────
Net Financial Impact      -£51,000      +£61,000      +£61,000
Cumulative 3-Year Impact                +£71,000
```

## Impact Scoring

The skill calculates impact scores (0-10 scale):

- **0-2:** Minimal impact (transparent change, no user action needed)
- **3-4:** Low impact (minor adjustments needed)
- **5-6:** Medium impact (moderate changes, some training needed)
- **7-8:** High impact (significant changes, major training, process changes)
- **9-10:** Critical impact (major organizational change, high risk)

For Example 1 (Tableau retirement): **Impact Score: 7/10** (high impact)
- Requires 250 users to change tools
- Changes some workflows
- Moderate skill gap
- Medium cost impact
- But manageable with proper planning

## Output Sections

### Section 1: Executive Summary

```
Change: [Description]
Scope: [Systems, People, Process, Financial]
Impact Score: X/10 (Low/Medium/High/Critical)

Key Impacts:
1. [Primary impact with magnitude]
2. [Secondary impact with magnitude]
3. [Tertiary impact with magnitude]

Critical Risks:
1. [Risk 1 with mitigation]
2. [Risk 2 with mitigation]

Recommendation: [Proceed / Proceed with mitigation / Further evaluation / Do not proceed]
```

### Section 2: Detailed Impact Analysis

Separate sections for:
- Systems impact (technical)
- Integration impact (data flows)
- Organizational impact (people, skills)
- Process impact (workflows)
- Financial impact (cost/benefit)

### Section 3: Dependency Visualization

Diagram showing:
- All affected systems (colored by impact severity)
- Integration connections affected
- Data flows that change
- Teams/people affected

### Section 4: Risk Assessment

For each risk:
- Description
- Probability (1-5)
- Impact (1-5)
- Mitigation strategy
- Contingency plan
- Owner

### Section 5: Implementation Plan

- Pre-change checklist
- Change execution steps
- Validation criteria
- Post-change checklist
- Rollback procedure (if needed)

### Section 6: Success Criteria

Measurable outcomes:

```
Success Criteria                          Target    Actual    Status
──────────────────────────────────────────────────────────────────────
User adoption rate                        >90%      TBD
System uptime post-migration              99.9%     TBD
Dashboard load time                       <5 sec    TBD
Zero critical incidents in first 30 days  0 bugs    TBD
Training completion rate                  >95%      TBD
```

## Options

### Scope Options

```
/impact-analysis "change" --scope systems,people
```

Limit analysis to specific dimensions:
- `systems` - Technical systems impact
- `integrations` - Data flow and API impact
- `people` - Organizational and skill impact
- `process` - Business process impact
- `financial` - Cost and benefit impact
- `all` - All dimensions (default)

### Depth Options

```
/impact-analysis "change" --depth comprehensive
```

- `quick` - 1-page summary, high-level impacts
- `standard` - Full analysis with key details
- `comprehensive` - Detailed analysis with all sensitivities

### Include Contingencies

```
/impact-analysis "change" --contingencies yes
```

Generate detailed contingency and rollback plans.

## Integration with Other Skills

The `/impact-analysis` skill works with:

- **`/scenario-compare`** - Compare impact of alternative scenarios
- **`/architecture-report`** - Include impact analysis in architecture docs
- **`/project`** - Create implementation project from impact analysis
- **`/risk-assessment`** - Detailed risk evaluation based on impacts

## Output Example

From vault: `[[Impact Analysis - Tableau Retirement]]` (not yet created, would be generated by skill)

## Next Steps

After impact analysis:

1. Review with stakeholders
2. Refine mitigation strategies based on feedback
3. Create detailed implementation project plan
4. Develop training curriculum
5. Establish success metrics and monitoring

---

**Invoke with:** `/impact-analysis <change-description>`

**Example:** `/impact-analysis "Retire Tableau and migrate to Looker"` → Generates comprehensive impact analysis
