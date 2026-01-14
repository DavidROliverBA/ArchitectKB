---
context: fork
---

# DPIA Status Skill

## Purpose
Generate comprehensive GDPR Data Protection Impact Assessment (DPIA) compliance status reports across all engineering projects.

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
   - OneTrust IDs
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
**OneTrust Platform**: [[Weblink - OneTrust DPIA System]]

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

| Project | OneTrust ID | Completed | Next Action |
|---------|-------------|-----------|-------------|
| [[Snap On]] | 6285 | YYYY-MM-DD | Awaiting full DPIA decision |

### 🔄 DPIAs Under Review ([count] projects)

| Project | OneTrust ID | Submitted | Approver | Owner | Days Pending |
|---------|-------------|-----------|----------|-------|--------------|
| [[Siemens]] | 6284 | YYYY-MM-DD | DPO | [[Naushin Galmani]] | [X] days |
| [[SPARK]] | 6276 | YYYY-MM-DD | DPO | [[Naushin Galmani]] | [X] days |

### ✅ DPIAs Approved ([count] projects)

| Project | OneTrust ID | Approved | Valid Until | Notes |
|---------|-------------|----------|-------------|-------|
| [[Project Name]] | XXXX | YYYY-MM-DD | YYYY-MM-DD | Conditions: [...] |

### ❌ DPIAs Rejected or Requiring Remediation ([count] projects)

| Project | OneTrust ID | Status | Issues | Owner | Action Required |
|---------|-------------|--------|--------|-------|-----------------|
| [[Project]] | XXXX | Rejected | Data retention concerns | [[Owner]] | Update retention policy |

## Projects Requiring Immediate Action

### High Priority (DPIAs Overdue or Blocked)

1. **[[Project Name]]**
   - Status: Threshold assessment overdue
   - Owner: [[Person]]
   - Action: Complete assessment in OneTrust
   - Due: YYYY-MM-DD

### Medium Priority (DPIAs In Progress >30 days)

1. **[[Siemens Teamcenter X SaaS]]**
   - Status: Under review for [X] days
   - Owner: [[Naushin Galmani]]
   - Action: Follow up with DPO
   - OneTrust ID: 6284

## DPIA Status by Project

### [[Project - Siemens Teamcenter X SaaS]]
- **OneTrust ID**: 6284
- **Status**: Under review by BA Data Protection Officer
- **Submitted**: 2025-10-08
- **Owner**: [[Naushin Galmani]]
- **Risk Level**: [High/Medium/Low]
- **Personal Data**: [Types of data processed]
- **Next Steps**: Awaiting DPO approval
- **Timeline**: [Expected approval date]

### [[Project - Snap On Tooling - v9 Upgrade]]
- **OneTrust ID**: 6285
- **Status**: Threshold assessment completed
- **Completed**: YYYY-MM-DD
- **Owner**: [[Owner]]
- **Outcome**: [DPIA required/not required]
- **Next Steps**: [Based on outcome]

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
- [[Weblink - OneTrust DPIA System]] - OneTrust platform
- [[Project - Cyber Uplift]] - Security compliance programme
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
- Always link back to DPIA Tracker and OneTrust
- Use UK English spelling throughout

## Examples

**Example 1:**
User: `/dpia-status`
Assistant: [Generates full report showing 2 DPIAs under review (Siemens, SPARK), 1 threshold complete (Snap On), flags Siemens as >60 days pending]

**Example 2:**
User: `/dpia-status pending`
Assistant: [Shows only the 2 DPIAs under review with follow-up actions needed]

**Example 3:**
User: `/dpia-status project Siemens`
Assistant: [Detailed DPIA status for Siemens Teamcenter X project including timeline, owner, next steps]
