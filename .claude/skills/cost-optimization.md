# /cost-optimization Skill

Identify and quantify cost optimization opportunities across systems and infrastructure.

## When to Use This Skill

Use `/cost-optimization` when you need to:
- Analyze system costs and find savings opportunities
- Identify unused or underutilized resources
- Compare cost per unit of work (cost per transaction, per user, etc.)
- Create business cases for cost reduction initiatives
- Optimize cloud infrastructure spending
- Negotiate better vendor contracts based on data

## Usage

```
/cost-optimization [scope] [options]
```

### Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `scope` | What to optimize (system, platform, infrastructure, all) | Optional |
| `--threshold` | Minimum savings to recommend (£10K, £50K, etc.) | Optional |
| `--quick` | Quick analysis (5 opportunities) vs comprehensive | Optional |

## Workflow

### Phase 1: Define Optimization Scope

User specifies:

1. **What to analyze** (optional - default: all)
   - Single system (system:DataPlatform)
   - Platform (platform:AWS)
   - Domain (domain:data)
   - Enterprise-wide (all)

2. **Minimum threshold** (optional)
   - Only recommend opportunities with £X+ annual savings
   - Default: £10K (filter noise)

3. **Analysis depth** (optional)
   - `quick` - Top 5 opportunities, minimal detail
   - `standard` - 10-15 opportunities with detailed analysis
   - `comprehensive` - All opportunities with ROI modeling

### Phase 2: Analyze Costs

The skill:

1. **Collects cost data**
   - Annual cost per system
   - Cost breakdown by category
   - Resource utilization metrics
   - Growth trends

2. **Identifies optimization patterns**
   - Underutilized resources
   - Over-provisioned capacity
   - Redundant systems/features
   - Manual processes
   - Inefficient configurations

3. **Calculates impact**
   - Potential savings (£/year)
   - Implementation effort (effort days)
   - Implementation cost (if any)
   - Payback period
   - Risk level

4. **Benchmarks against industry**
   - Cost per user, per transaction, per TB
   - Compares to similar companies
   - Identifies outliers

### Phase 3: Generate Recommendations

Creates prioritized list with:

1. **Opportunity title**
2. **Current state** (what's wrong)
3. **Proposed change** (what to do)
4. **Financial impact** (savings, cost, ROI)
5. **Effort required** (hours, weeks, months)
6. **Implementation approach** (steps)
7. **Risks and mitigation** (what could go wrong)
8. **Timeline** (how long to implement)

### Phase 4: Output

Generates optimization report with:
- Executive summary (top 5 opportunities)
- Detailed analysis (all opportunities)
- Implementation roadmap
- Risk assessment
- Success criteria

## Optimization Categories

### 1. Cloud Infrastructure Optimization

**Opportunities identified:**

1. **AWS Reserved Instances**
   - Current: On-demand compute (£450K/year)
   - Proposed: Purchase 1-3 year RIs (35-40% discount)
   - Savings: £160K/year (35% discount)
   - Cost: £30K upfront
   - Payback: 2 months
   - Risk: Low (lock-in is acceptable)

2. **AWS Spot Instances**
   - Current: On-demand for non-critical workloads
   - Proposed: Use spot for batch/dev/test (70% discount)
   - Savings: £50K/year
   - Cost: £0 (code changes only)
   - Payback: Immediate
   - Risk: Medium (interruptions possible)

3. **AWS Right-sizing**
   - Current: Over-provisioned instance types
   - Proposed: Right-size per actual usage (tools analysis)
   - Savings: £30K/year
   - Cost: £20K (consulting)
   - Payback: 2 months
   - Risk: Low (automated with monitoring)

4. **S3 Lifecycle Management**
   - Current: All data in S3 Standard (£0.023/GB)
   - Proposed: Move old data to Glacier (£0.004/GB)
   - Savings: £100K/year on 2.5 PB lake
   - Cost: £10K (automation)
   - Payback: 1 month
   - Risk: Low (well-tested, retrieval delays acceptable)

5. **EBS Volume Optimization**
   - Current: Over-allocated EBS volumes
   - Proposed: Delete unused, downsize underutilized
   - Savings: £25K/year
   - Cost: £5K (analysis and testing)
   - Payback: 1 month
   - Risk: Low (non-critical volumes)

### 2. Data Platform Optimization

**Opportunities identified:**

1. **Snowflake Warehouse Right-sizing**
   - Current: 4x-large warehouses always running
   - Proposed: Auto-suspend idle (30 min), auto-scale on demand
   - Savings: £80K/year (40% reduction)
   - Cost: £0 (configuration change)
   - Payback: Immediate
   - Risk: Medium (query latency for ad-hoc users)

2. **Snowflake Caching**
   - Current: Repeated queries re-processed
   - Proposed: Enable result caching (90-day retention)
   - Savings: £40K/year (queries 50% hit cache)
   - Cost: £0 (built-in feature)
   - Payback: Immediate
   - Risk: Low (automatic, no configuration)

3. **DataPlatform Spark Cluster Right-sizing**
   - Current: 10-node cluster always running
   - Proposed: Scale 3-10 nodes based on pipeline schedule
   - Savings: £75K/year
   - Cost: £20K (Kubernetes autoscaling config)
   - Payback: 3 months
   - Risk: Medium (pipeline delays during spin-up)

4. **Delta Lake Cleanup**
   - Current: 5 years of historical versions in Delta
   - Proposed: Vacuum old versions (keep 30 days)
   - Savings: £30K/year (reduce storage)
   - Cost: £5K (analysis and testing)
   - Payback: 2 months
   - Risk: Low (historical access not needed)

### 3. Software Licensing Optimization

**Opportunities identified:**

1. **SAP License Review**
   - Current: Over-licensed modules (estimated 30% excess)
   - Proposed: Audit and right-size licenses
   - Savings: £100K/year
   - Cost: £30K (vendor audit and negotiation)
   - Payback: 4 months
   - Risk: Medium (vendor may resist, licensing complex)

2. **Tableau Retirement**
   - Current: Tableau licenses £51K/year
   - Proposed: Retire, migrate to Looker
   - Savings: £51K/year (Looker cheaper)
   - Cost: £72K migration (already approved)
   - Payback: 1.4 years (already in roadmap)
   - Risk: Low (Q1-Q3 2026 plan in place)

3. **Kafka Open Source**
   - Current: Kafka running open-source (no licensing cost)
   - Proposed: Continue open-source, avoid Confluent
   - Savings: £0/year (but avoid £200K/year if converted)
   - Cost: £0 (already doing this)
   - Payback: N/A
   - Risk: Low (community support sufficient)

### 4. Operational Efficiency

**Opportunities identified:**

1. **Automate Manual ETL Processes**
   - Current: 40 hours/month manual data loads
   - Proposed: Build Airflow jobs to automate
   - Savings: £40K/year (staff time)
   - Cost: £30K (2 engineer-months)
   - Payback: 9 months
   - Risk: Low (automation well-proven)

2. **Reduce On-Call Overhead**
   - Current: 3 engineers on-call, high alert load
   - Proposed: Improve monitoring, reduce false alerts by 80%
   - Savings: £50K/year (less context-switching)
   - Cost: £20K (better alerting tools)
   - Payback: 5 months
   - Risk: Low (better alerting = better incidents)

3. **Consolidate Databases**
   - Current: 5 PostgreSQL databases for different functions
   - Proposed: Consolidate to 2 shared databases
   - Savings: £25K/year (licensing and ops)
   - Cost: £40K (migration and testing)
   - Payback: 1.6 years
   - Risk: Medium (schema design, performance tuning)

### 5. Capacity Planning

**Opportunities identified:**

1. **Right-size DX Bandwidth**
   - Current: 10 Gbps Direct Connect (£1500/month)
   - Proposed: Reduce to 5 Gbps if traffic analysis shows underutilization
   - Savings: £9K/year
   - Cost: £0 (if bandwidth available)
   - Payback: Immediate
   - Risk: Medium (burst traffic could saturate)

2. **Consolidate VPCs**
   - Current: 4 VPCs (dev, test, staging, prod)
   - Proposed: Consolidate dev/test into shared VPC
   - Savings: £10K/year (fewer VPC endpoints)
   - Cost: £15K (network reconfiguration)
   - Payback: 1.5 years
   - Risk: Medium (shared environments = isolation concerns)

## Opportunity Prioritization

The skill ranks opportunities by:

1. **Payback period** (faster = higher priority)
2. **Effort required** (easier = higher priority)
3. **Risk level** (lower risk = higher priority)
4. **Strategic alignment** (aligns with roadmap = higher priority)

### Priority Matrix

```
Effort
 Low  │ Easy Quick Wins │ Strategic Bets
      │ (do first)      │ (plan carefully)
      │                 │
High  │ Nice to Have    │ Avoid
      │ (low ROI)       │ (hard & risky)
      └─────────────────┴────────────────
        Low            High
        Impact
```

**Quick Wins (Low Effort, High Impact):**
- Snowflake warehouse auto-suspend (£80K, £0 cost)
- S3 lifecycle (£100K, £10K cost, 1-month payback)
- AWS spot instances (£50K, £0 cost)

**Strategic Bets (Higher Effort, High Impact):**
- DataPlatform cluster autoscaling (£75K, £20K cost, 3-month payback)
- Tableau retirement (£51K, £72K cost, 1.4yr payback, in roadmap)
- SAP license audit (£100K, £30K cost, 4-month payback)

**Low Priority (Low Impact):**
- VPC consolidation (£10K, high effort)
- DX bandwidth reduction (£9K, medium risk)

## Report Sections

### Section 1: Executive Summary

```
Cost Optimization Summary Report
════════════════════════════════════════════════════════
Total Annual Cost (Current): £10.9M
Total Potential Savings: £700K/year (6.4%)
Total Implementation Cost: £175K
Payback Period: 3 months (average)

By Category:
────────────
Quick Wins (Implement Immediately):
  • Snowflake Auto-suspend: £80K (£0 cost, 0 months)
  • S3 Lifecycle: £100K (£10K cost, 1 month)
  • Spot Instances: £50K (£0 cost, immediate)
  Subtotal: £230K

Medium Term (Next 3 months):
  • DataPlatform Autoscaling: £75K (£20K cost, 3 months)
  • Delta Cleanup: £30K (£5K cost, 2 months)
  • AWS Right-sizing: £30K (£20K cost, 2 months)
  Subtotal: £135K

Strategic (Next 6-12 months):
  • SAP License Audit: £100K (£30K cost, 4 months)
  • Automate ETL: £40K (£30K cost, 9 months)
  • Database Consolidation: £25K (£40K cost, 1.6 years)
  Subtotal: £165K

Aligned with Roadmap:
  • Tableau Retirement: £51K (£72K cost, scheduled Q1-Q3)

Total Realistic Target (12 months): £550K savings
Total Implementation Cost: £175K
Net Benefit (Year 1): £375K
Annual Recurring Benefit: £550K/year after implementation
```

### Section 2: Opportunity Rankings

Ranked by payback period and impact:

| Rank | Opportunity | Savings | Cost | Payback | Effort | Risk |
|------|-------------|---------|------|---------|--------|------|
| 1 | Snowflake auto-suspend | £80K | £0 | Immediate | 1 day | Low |
| 2 | S3 lifecycle | £100K | £10K | 1 month | 2 days | Low |
| 3 | Spot instances | £50K | £0 | Immediate | 1 week | Medium |
| 4 | AWS right-sizing | £30K | £20K | 2 months | 3 weeks | Low |
| 5 | DataPlatform autoscaling | £75K | £20K | 3 months | 2 months | Medium |
| 6 | Snowflake caching | £40K | £0 | Immediate | 1 day | Low |
| 7 | Delta cleanup | £30K | £5K | 2 months | 2 weeks | Low |
| 8 | SAP license audit | £100K | £30K | 4 months | 3 months | Medium |
| 9 | Automate ETL | £40K | £30K | 9 months | 2 months | Low |

### Section 3: Detailed Analysis

For each opportunity:

```
Opportunity #1: Snowflake Warehouse Auto-suspend
═════════════════════════════════════════════════════════

Current State:
──────────────
• 4 warehouses running 24/7
• Average utilization: 15% (mostly idle)
• Cost: £65K/month = £780K/year

Proposed Change:
────────────────
• Configure auto-suspend after 30 minutes idle
• Auto-scale during peak hours (1-6 warehouses)
• Expected utilization increase: 40-50%

Financial Impact:
──────────────────
Annual Savings: £80K (40% cost reduction)
Implementation Cost: £0 (configuration only)
Payback Period: Immediate
Year 1 Benefit: £80K
Year 2+ Benefit: £80K/year

Implementation:
───────────────
1. Analyze current usage patterns (2 days)
2. Configure auto-suspend policies (1 day)
3. Test with non-production first (2 days)
4. Deploy to production (1 day)
5. Monitor for 2 weeks, adjust as needed (2 days)

Total Effort: 5 business days (1 engineer)

Risks & Mitigation:
────────────────────
Risk 1: Ad-hoc queries slower to start (suspension latency)
  • Probability: High (will happen)
  • Impact: Low (acceptable 30-sec startup)
  • Mitigation: Set auto-suspend to 60 min during business hours
  • Contingency: Disable if user complaints (easy to revert)

Risk 2: Interactive dashboards freeze temporarily
  • Probability: Medium (depends on usage pattern)
  • Impact: Medium (user frustration)
  • Mitigation: Keep one warehouse always warm for dashboards
  • Contingency: Increase warm warehouse count

Recommendation: PROCEED IMMEDIATELY
  Low effort, high savings, easy to revert
  No business risk if configured carefully
```

### Section 4: Implementation Roadmap

Timeline for implementing opportunities:

```
Optimization Implementation Roadmap
═══════════════════════════════════════════════════════

Phase 1: Immediate (This Week)
──────────────────────────────
Week of 2026-01-14:

Monday:
  • Snowflake auto-suspend implementation (1 day)
  • Snowflake result caching enablement (0.5 day)
  Owner: Data Platform Lead
  Est. Savings: £80K + £40K = £120K

Tuesday-Wednesday:
  • S3 lifecycle policy implementation (2 days)
  • DLQ cleanup analysis (1 day)
  Owner: Cloud Architect
  Est. Savings: £100K + £30K = £130K

Friday:
  • Review and approve AWS spot instance plan (1 day)
  Owner: Cloud Architect
  Est. Savings: £50K

Phase 1 Summary:
  Effort: 5 engineer-days
  Cost: £10K (tools + testing)
  Savings: £300K/year
  Payback: 0.4 months

---

Phase 2: Short Term (Next Month)
────────────────────────────────
Week of 2026-02-03:

• AWS right-sizing analysis complete (3 weeks)
• DataPlatform autoscaling design & approval (2 weeks)
• SAP licensing audit initiated (1 week)

Phase 2 Summary:
  Effort: 6 engineer-weeks (plus vendor audit)
  Cost: £50K (analysis + vendor audit)
  Savings: £205K/year
  Payback: 3 months

---

Phase 3: Medium Term (Q1-Q2 2026)
─────────────────────────────────
• DataPlatform autoscaling implementation (2 months)
• Tableau retirement execution (ongoing)
• AWS Savings Plan purchases (1 month)
• Automate ETL processes (2 months)

Phase 3 Summary:
  Effort: 4 engineer-months
  Cost: £80K (implementation)
  Savings: £150K/year
  Payback: 6 months

---

Phase 4: Strategic (Q3 2026+)
──────────────────────────────
• Database consolidation (research → 1.6yr payback)
• DX optimization (if utilization data supports)
• License negotiations annually

Phase 4 Summary:
  Effort: Ongoing
  Cost: Variable
  Savings: £35K/year
  Payback: Variable
```

### Section 5: Success Criteria

Measurable outcomes for optimization program:

```
Success Criteria & Metrics
═════════════════════════════════════════════════════════

Financial Targets:
──────────────────
✓ Phase 1 (Immediate): £300K savings within 4 weeks
✓ Phase 2 (1-3 months): Additional £205K = £505K YTD
✓ Full Year Target: £550K savings (achievable by Q3)

Technical Targets:
──────────────────
✓ Dashboard load time: <10 sec (vs current <5 sec, acceptable)
✓ Query cold-start: <30 sec (vs current <5 sec, during suspension)
✓ System availability: No increase in incidents
✓ Spark job latency: <15% increase during scale-up

Operational Targets:
────────────────────
✓ Budget vs actual: ≤-£550K variance (savings achieved)
✓ Unplanned downtime: Zero incidents from optimization changes
✓ User satisfaction: No decrease (or improvement from faster response)

Monitoring:
───────────
• Monthly cost reporting (actual vs optimized forecast)
• Quarterly review of opportunity status
• Continuous monitoring of savings realization
• Annual optimization review (identify new opportunities)
```

## Options

### Quick Analysis

```
/cost-optimization --quick
```

Top 5 opportunities only, minimal detail. Good for:
- Executive briefings
- Identifying quick wins
- Kick-off for larger optimization program

### Detailed Analysis

```
/cost-optimization --comprehensive
```

All opportunities with detailed ROI modeling.

### By System

```
/cost-optimization system:DataPlatform
```

Focus on specific system only.

### Threshold Filter

```
/cost-optimization --threshold 50000
```

Only show opportunities with £50K+ annual savings.

## Benchmarking

The skill compares your costs against:

```
Your Cost Metrics vs. Industry Benchmarks
═════════════════════════════════════════════════════════

Cost per TB data:
  Your: £12.9/TB (AWS + Snowflake)
  Benchmark: £10-15/TB
  Status: ✓ In range

Cost per user:
  Your: £43.6/user (£10.9M / 250 users)
  Benchmark: £30-50/user
  Status: ✓ In range

Cost per transaction:
  Your: £0.31/transaction (£10.9M / 35B annual transactions)
  Benchmark: £0.20-0.40
  Status: ⚠ Slightly high (optimization opportunity)

Infrastructure % of total:
  Your: 47.7% (£5.2M of £10.9M)
  Benchmark: 40-50%
  Status: ✓ In range
```

## Integration with Other Skills

The `/cost-optimization` skill works with:

- **`/architecture-report`** - Include cost analysis section
- **`/scenario-compare`** - Compare cost impact of scenarios
- **`/system-sync`** - Sync cost data from CMDB
- **`/project`** - Create optimization project from opportunities

## Next Steps

After generating optimization report:

1. Review opportunities with finance and technical teams
2. Approve prioritization and roadmap
3. Create implementation projects for Phase 1
4. Assign owners for each opportunity
5. Track savings realization monthly
6. Conduct quarterly reviews
7. Annual optimization review to find new opportunities

---

**Invoke with:** `/cost-optimization [scope]`

**Example:** `/cost-optimization all --quick` → Top 5 cost savings opportunities
