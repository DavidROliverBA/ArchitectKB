# /scenario-compare Skill

Compare multiple scenarios with cost, timeline, complexity, and impact analysis.

## When to Use This Skill

Use `/scenario-compare` when you need to evaluate and compare different architectural options:
- Compare baseline vs proposed scenarios
- Evaluate alternatives (e.g., AWS vs Snowflake BI tool options)
- Create decision matrices for technology choices
- Generate business case analysis
- Create executive briefings comparing options

## Usage

```
/scenario-compare <primary-scenario> [comparisons] [options]
```

### Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `primary-scenario` | Base scenario to compare against | Yes |
| `comparisons` | Comma-separated list of comparison scenarios | Yes (≥1) |
| `--metrics` | Which metrics to compare (cost, timeline, complexity, impact, risk) | Optional |
| `--stakeholder` | Audience (executive, technical, financial) | Optional |
| `--horizon` | Time horizon (1yr, 3yr, 5yr) | Optional |
| `--format` | Output format (markdown, spreadsheet, presentation) | Optional |

## Workflow

### Phase 1: Define Scenarios

User specifies:

1. **Primary scenario** (baseline)
   - Can be "current-state" or existing Scenario note
   - Example: [[Scenario - Real-time Analytics Expansion]]

2. **Comparison scenarios** (alternatives)
   - Comma-separated: "Alternative 1, Alternative 2, Alternative 3"
   - Can be existing notes or user-described scenarios
   - Typically 2-3 alternatives for comparison

3. **What to compare** (optional)
   - Default: All metrics (cost, timeline, complexity, impact, risk)
   - Options:
     - `cost` - Setup and ongoing costs
     - `timeline` - Implementation duration and phases
     - `complexity` - Technical and operational difficulty
     - `impact` - Business benefit and risk
     - `risk` - Technical, organizational, financial risks
     - `vendor` - Vendor lock-in and independence
     - `scalability` - Growth potential

### Phase 2: Extract Data

The skill:

1. **Reads scenario notes**
   - Extracts systems involved
   - Extracts costs and timelines
   - Extracts risks and benefits

2. **Calculates derived metrics**
   - 3-year and 5-year TCO
   - Implementation burn-down
   - Risk scores (0-10)
   - Complexity scores (0-10)

3. **Normalizes for comparison**
   - Converts all costs to annual equivalent
   - Aligns timeline phases
   - Scores non-numeric factors (1-10 scale)

### Phase 3: Generate Comparison

Creates:

1. **Comparison Matrix** - Side-by-side table
2. **Cost Analysis** - Chart showing TCO
3. **Timeline Gantt** - Implementation schedule comparison
4. **Complexity Scoring** - Radar chart or bar chart
5. **Risk Matrix** - Impact vs Probability
6. **Decision Table** - Weighted scoring
7. **Recommendation** - Pro/con analysis with recommendation

### Phase 4: Output

Generates markdown note with:
- Executive summary (1 page)
- Detailed comparison tables
- Charts and visualizations
- Risk analysis
- Go/No-Go decision criteria
- Recommended path forward

## Examples

### Example 1: Compare Baseline vs Real-time Expansion vs AWS QuickSight

```
/scenario-compare "current-state" "Real-time Analytics Expansion, AWS QuickSight Option" --metrics all --horizon 5yr
```

**Prompts:**
1. Primary scenario: "Current State (Baseline)"
2. Comparison: "Real-time Analytics Expansion"
3. Comparison: "AWS QuickSight Option"
4. Audience: Executive
5. Include risk analysis: Yes

**Output:** `Scenario Comparison - Baseline vs Expansion vs QuickSight.md` containing:
- Executive summary (£300K additional cost, £1.1M benefit = 367% ROI)
- 3 scenarios in side-by-side comparison matrix
- Cost breakdown by year (1yr, 3yr, 5yr)
- Timeline Gantt showing implementation phases
- Complexity radar chart (5 dimensions)
- Risk matrix (Probability vs Impact)
- Go/No-Go decision criteria
- Recommendation: "Proceed with Real-time Analytics Expansion"

### Example 2: Compare Technologies for Analytics

```
/scenario-compare "Tableau (Current)" "Looker Option, AWS QuickSight, Alteryx" --metrics cost,complexity,vendor --stakeholder financial
```

**Output:** Financial-focused comparison showing:
- Licensing costs (Tableau vs Looker vs QuickSight vs Alteryx)
- Total cost of ownership (3-year)
- Infrastructure costs
- Training costs
- Support costs
- Vendor lock-in analysis
- Recommendation for cost-optimal solution

### Example 3: Compare Cloud Providers for Migration

```
/scenario-compare "AWS (Current)" "Azure Option, GCP Option" --horizon 5yr --metrics cost,complexity,risk
```

**Output:** Detailed 5-year analysis including:
- Cloud service costs (compute, storage, networking)
- Migration effort and cost
- Ongoing operational cost
- Complexity (architecture, skills required)
- Risk factors (vendor changes, regional availability)

## Comparison Metrics

### Cost Analysis

Calculates for each scenario:

```
Setup Cost
  + Hardware/Infrastructure
  + Software licenses
  + Integration/Migration

Annual Ongoing Cost
  + Compute
  + Storage
  + Licensing
  + Staffing
  - Cost reductions

3-Year TCO = Setup + (Annual × 3)
5-Year TCO = Setup + (Annual × 5)
```

Creates comparison chart:
- Bar chart (3 scenarios)
- Line chart (cost over 5 years)
- Waterfall chart (cost components)

### Timeline Analysis

For each scenario:

1. **Implementation phases** (Q1, Q2, Q3, etc.)
2. **Critical path** (longest dependency chain)
3. **Resource requirements** (headcount per phase)
4. **Key milestones** (go-live, cutover, stabilization)
5. **Risk timeline** (points of highest risk)

Creates Gantt chart showing all scenarios aligned.

### Complexity Analysis

Scores each scenario on:

1. **Technology stack** (0-10)
   - Number of new technologies
   - Integration complexity
   - Support skill requirements

2. **Operational** (0-10)
   - New processes required
   - Monitoring/alerting complexity
   - Disaster recovery planning

3. **Vendor dependency** (0-10)
   - Single vendor lock-in
   - Integration with existing systems
   - Migration difficulty if switching

4. **Data movement** (0-10)
   - ETL/ELT complexity
   - Data quality requirements
   - Performance optimization

5. **User training** (0-10)
   - Number of users impacted
   - Tool learning curve
   - Process change management

Creates radar chart with 5 dimensions.

### Risk Analysis

For each scenario:

1. **Technical risks** (e.g., new technology unproven)
2. **Organizational risks** (e.g., skill gaps, team capacity)
3. **Financial risks** (e.g., cost overruns, lower ROI)
4. **Schedule risks** (e.g., resource unavailability, delays)
5. **Vendor risks** (e.g., licensing changes, product discontinuation)

Scores each risk:
- Probability (1-5): Unlikely, Possible, Likely, Very Likely, Certain
- Impact (1-5): Negligible, Moderate, Significant, Major, Critical

Creates risk matrix with probability vs impact.

### Benefit Analysis

For each scenario:

1. **Quantified benefits** (£/year)
   - Revenue increase
   - Cost savings
   - Risk reduction
   - Productivity gain

2. **Qualitative benefits**
   - Competitive advantage
   - User satisfaction
   - Technical debt reduction
   - Flexibility/extensibility

Calculates ROI = (Benefits - Costs) / Costs

## Stakeholder Perspectives

The skill tailors output based on stakeholder:

### Executive (CFO/CEO)
- Focus: Cost, timeline, business value
- Format: 1-page summary, key metrics, recommendation
- Charts: Cost comparison, ROI, risk heat map
- Decision: Go/No-Go with business case

### Technical (CTO/Architecture)
- Focus: Complexity, risk, technical alignment
- Format: Detailed architecture, decision rationale
- Charts: Technology stack comparison, complexity radar
- Decision: Architecture suitability

### Financial (Finance Director)
- Focus: 5-year TCO, cash flow, payback period
- Format: Detailed financial analysis, assumptions
- Charts: Cost by year, payback period, NPV
- Decision: Budget allocation

### Project (Program Manager)
- Focus: Timeline, resources, milestones, schedule risk
- Format: Detailed Gantt, resource plan, critical path
- Charts: Implementation timeline, burn-down
- Decision: Feasibility and resource needs

## Output Sections

### Section 1: Executive Summary (1 page)

```
Recommendation: [Proceed with Scenario X] / [Further evaluation needed] / [Do not proceed]

Key Metrics:
- Setup Cost: £XXX
- Annual Cost: £XXX/year
- Implementation Timeline: X months
- ROI: XXX%
- Payback Period: X months

Top 3 Reasons:
1. [Primary benefit]
2. [Secondary benefit]
3. [Differentiator vs alternatives]

Top 3 Risks:
1. [Primary risk]
2. [Secondary risk]
3. [Mitigation]
```

### Section 2: Comparison Matrix

Table with all scenarios:
- Cost (setup, annual, 3yr, 5yr)
- Timeline (months, phases)
- Complexity (1-10 score)
- Business benefit (quantified)
- Risk level (Low/Medium/High)
- Implementation path

### Section 3: Detailed Analysis

For each metric (cost, timeline, complexity, risk):

1. Detailed breakdown
2. Calculation methodology
3. Assumptions
4. Sensitivities (what if cost is +20%?)

### Section 4: Go/No-Go Criteria

Decision gates:

```
| Criterion | Required | Status | Notes |
|-----------|----------|--------|-------|
| Budget approval | ✓ | ❓ TBD | Need £XXX |
| Resources available | ✓ | ❓ TBD | Need X engineers |
| Executive sponsorship | ✓ | ❓ TBD | Pending approval |
| Technology readiness | ✓ | ✅ Ready | All technologies proven |
| Business case | ✓ | ✅ Strong | £X ROI justifies cost |
```

### Section 5: Risk Mitigation

For each risk identified:

1. Probability
2. Impact
3. Mitigation strategy
4. Contingency plan
5. Owners

### Section 6: Recommendation

Final recommendation with:

1. Primary recommendation (which scenario)
2. Rationale (why this one)
3. Prerequisites (what must be true)
4. Timeline for decision
5. Next steps if approved
6. Next steps if rejected

## Options

### Filter Metrics

```
/scenario-compare "baseline" "alternative" --metrics cost,timeline
```

Show only specific metrics for focused comparison.

### Time Horizon

```
/scenario-compare "baseline" "alternative" --horizon 5yr
```

Calculate TCO over 1yr, 3yr, 5yr, or 10yr.

### Detail Level

```
/scenario-compare "baseline" "alternative" --detail executive
```

- `executive` - 1-page summary, high-level metrics
- `detailed` - Full analysis with assumptions
- `comprehensive` - Include all sensitivities and scenarios

### Include Sensitivities

```
/scenario-compare "baseline" "alternative" --sensitivities yes
```

Show impact of ±20% cost, ±3-month schedule, etc.

### Comparison Weighting

```
/scenario-compare "baseline" "alternative" --weights "cost:40, timeline:30, risk:30"
```

Custom weighting for Go/No-Go score calculation.

## Integration with Other Skills

The `/scenario-compare` skill works with:

- **`/diagram`** - Generate before/after diagrams for scenarios
- **`/impact-analysis`** - Analyze detailed impacts
- **`/architecture-report`** - Include comparison in architecture documentation
- **`/cost-optimization`** - Identify cost savings across scenarios

## Output Format Examples

### Cost Comparison Chart

```
Scenario          Setup    Annual   3-Year TCO   5-Year TCO
─────────────────────────────────────────────────────────
Baseline          £0       £10.9M   £32.7M       £54.5M
Proposed          £234K    £11.2M   £34.0M       £56.4M
Alternative       £280K    £11.4M   £34.9M       £57.9M
```

### Timeline Gantt

```
2026 Timeline
Q1 │Q2 │Q3 │Q4 │
─────────────────
[Baseline - No change ongoing ─────────────────────►]
[Proposed ─ Streamlit ─┬─ Looker ─┬─ Scale ──►]
[Alternative ─ QuickSight ─┬─ Decom ─►]
```

### Risk Matrix

```
         Impact
         Low  Medium  High
P    Low  ●
r         ●    ●
o  Medium      ●
b         ●
High      ●
```

## Error Handling

If comparison fails:

1. Check scenarios exist
2. Suggest creating missing scenarios
3. Offer to compare vs. textual descriptions
4. Fall back to simple comparison matrix (text only)

## Examples from This Vault

- `[[Canvas - Scenario Comparison]]` - Baseline vs Expansion vs QuickSight
- `[[Scenario - Real-time Analytics Expansion]]` - Proposed scenario details

## Next Steps

After creating scenario comparison:

1. Share comparison with stakeholders
2. Collect feedback on weightings
3. Conduct go/no-go decision meeting
4. If approved: Create implementation plan (`/project <scenario>`)
5. If rejected: Archive scenario with rejection reason (`/archive`)

---

**Invoke with:** `/scenario-compare <baseline> <alternatives>`

**Example:** `/scenario-compare "current-state" "Real-time Expansion, AWS QuickSight"` → Generates detailed comparison
