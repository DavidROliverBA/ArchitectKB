---
context: fork
---

# DPIA Status Skill

## Purpose
Generate comprehensive GDPR Data Protection Impact Assessment (DPIA) compliance status reports across all projects.

## Usage
- `/dpia-status` - Current DPIA status for all projects
- `/dpia-status pending` - Only pending/in-progress DPIAs
- `/dpia-status project [name]` - DPIA status for specific project

## Instructions

When this skill is invoked:

1. **Read DPIA Tracker** page:
   ```
   Page - DPIA Tracker.md
   ```

2. **Extract DPIA information:**
   - Projects requiring DPIA
   - Reference IDs
   - Current status (not required, threshold assessment, in progress, approved, rejected)
   - Submission dates
   - Approvers
   - Risk levels
   - Follow-up owners

3. **Find all projects** with DPIA requirements using Grep:
   ```
   pattern: "DPIA"
   output: files_with_matches
   ```

4. **Read relevant project files** to get:
   - Project status and timeline
   - Data processing activities
   - Personal data categories
   - DPIA submission dates
   - Blockers or issues

5. **Generate formatted status report:**

### Report Structure

```markdown
# DPIA Compliance Status Report
**Generated**: [current date]
**Data Source**: [[Page - DPIA Tracker]]

## Executive Summary

- **Total Projects Tracked**: [count]
- **DPIAs Not Required**: [count]
- **Threshold Assessments Complete**: [count]
- **DPIAs In Progress**: [count]
- **DPIAs Approved**: [count]
- **Projects Requiring Action**: [count]

## Status by Category

### ✅ DPIA Not Required ([count] projects)

| Project | Justification | Reviewed |
|---------|---------------|----------|
| [[Project Name]] | Low risk, no special category data | YYYY-MM-DD |

### ⏳ Threshold Assessment Complete ([count] projects)

| Project | Reference ID | Completed | Next Action |
|---------|-------------|-----------|-------------|
| [[Project]] | 6285 | YYYY-MM-DD | Awaiting full DPIA decision |

### 🔄 DPIAs Under Review ([count] projects)

| Project | Reference ID | Submitted | Approver | Owner | Days Pending |
|---------|-------------|-----------|----------|-------|--------------|
| [[Project]] | 6284 | YYYY-MM-DD | DPO | [[Person]] | [X] days |

### ✅ DPIAs Approved ([count] projects)

| Project | Reference ID | Approved | Valid Until | Notes |
|---------|-------------|----------|-------------|-------|
| [[Project Name]] | XXXX | YYYY-MM-DD | YYYY-MM-DD | Conditions: [...] |

### ❌ DPIAs Rejected or Requiring Remediation ([count] projects)

| Project | Reference ID | Status | Issues | Owner | Action Required |
|---------|-------------|--------|--------|-------|-----------------|
| [[Project]] | XXXX | Rejected | Data retention concerns | [[Owner]] | Update retention policy |

## Projects Requiring Immediate Action

### High Priority (DPIAs Overdue or Blocked)

1. **[[Project Name]]**
   - Status: Threshold assessment overdue
   - Owner: [[Person]]
   - Action: Complete assessment
   - Due: YYYY-MM-DD

### Medium Priority (DPIAs In Progress >30 days)

1. **[[Project Name]]**
   - Status: Under review for [X] days
   - Owner: [[Person]]
   - Action: Follow up with DPO

## Compliance Metrics

### DPIA Timeline Performance
- Average days to complete threshold assessment: [X] days
- Average days for DPIA approval: [X] days
- Projects meeting DPIA deadline: [X]%

### Risk Distribution
- High Risk Projects: [count]
- Medium Risk Projects: [count]
- Low Risk Projects: [count]

## Recommendations

1. **Immediate Actions:**
   - [Projects requiring urgent DPIA submission]
   - [Follow-ups needed with DPO]

2. **Process Improvements:**
   - [Suggestions for streamlining DPIA process]
   - [Training needs identified]

3. **Upcoming DPIAs:**
   - [Projects in pipeline requiring DPIA]
   - [Proactive planning recommendations]

## Follow-up Schedule

| Project | Owner | Next Review | Action |
|---------|-------|-------------|--------|
| [[Project]] | [[Owner]] | YYYY-MM-DD | Follow up with DPO |

## Related Resources

- [[Page - DPIA Tracker]] - Central DPIA tracking page
```

6. **Output the report** as formatted markdown

7. **Flag urgent items** that need immediate attention:
   - DPIAs pending >60 days
   - Projects starting without DPIA assessment
   - Threshold assessments overdue

8. **Optionally save report** by asking user:
   - "Would you like me to save this DPIA status report?"
   - If yes, create `Page - DPIA Status Report [date].md`

## Notes

- Highlight compliance risks (projects proceeding without DPIA when required)
- Calculate days pending for in-progress DPIAs
- Cross-reference with project timelines (flag if DPIA blocking go-live)
- Use traffic light status (🔴 urgent, 🟡 attention needed, 🟢 on track)
- Use UK English spelling throughout

## Examples

**Example 1:**
User: `/dpia-status`
Assistant: [Generates full report showing DPIAs under review, threshold assessments complete, flags overdue items]

**Example 2:**
User: `/dpia-status pending`
Assistant: [Shows only the DPIAs under review with follow-up actions needed]

**Example 3:**
User: `/dpia-status project Alpha`
Assistant: [Detailed DPIA status for Alpha project including timeline, owner, next steps]
