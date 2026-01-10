---
context: fork
---

# Project Snapshot Skill

## Purpose
Generate quick status overview of all active projects, showing progress, blockers, and immediate priorities.

## Usage
- `/project-snapshot` - All active projects
- `/project-snapshot all` - All projects including paused/completed
- `/project-snapshot [project-name]` - Detailed snapshot for specific project

## Instructions

When this skill is invoked:

1. **Find all project files** using Glob:
   ```
   Project*.md
   ```

2. **Read each project file** to extract:
   - Project title and status
   - Related ADRs
   - Related tasks (completed and pending)
   - Recent meetings
   - Key stakeholders
   - Current blockers/risks
   - Last modified date

3. **Filter by status** (unless 'all' specified):
   - Active projects (status: active, in progress, or null)
   - Exclude paused and completed unless 'all' flag used

4. **For each project, assess:**
   - Health status: 🟢 On track, 🟡 At risk, 🔴 Blocked
   - Recent activity (meetings/tasks in last 7 days)
   - Pending actions and priorities

5. **Generate formatted snapshot:**

### Report Structure

```markdown
# Projects Snapshot
**Generated**: [current date]
**Scope**: [Active projects / All projects]

## Executive Summary

- **Total Active Projects**: [count]
- **On Track**: 🟢 [count]
- **At Risk**: 🟡 [count]
- **Blocked**: 🔴 [count]
- **Paused**: [count]
- **Completed This Month**: [count]

## Projects by Status

### 🟢 On Track ([count] projects)

#### [[Project - Alpha]]
- **Status**: In Progress
- **Health**: 🟢 On track
- **Recent Progress**:
  - ✅ 2 ADRs completed
  - 📅 Last meeting: 2026-01-07
- **Next Actions**:
  - AWS deployment planning
- **Owner**: [[Project Manager]]
- **Timeline**: 2026-Q1 - 2026-Q2

### 🟡 At Risk ([count] projects)

#### [[Project - Beta]]
- **Status**: Active
- **Health**: 🟡 At risk - approval pending
- **Blockers**:
  - ⚠️ Awaiting stakeholder decision
- **Next Actions**:
  - Follow up with stakeholders
- **Owner**: [[Project Manager]]
- **Timeline**: [timeframe]

### 🔴 Blocked ([count] projects)

#### [[Project - Gamma]]
- **Status**: Active (blocked)
- **Health**: 🔴 Blocked
- **Blocker**: [Description of blocking issue]
- **Impact**: [What is impacted]
- **Next Actions**: [Required to unblock]
- **Owner**: [[Person]]
- **Escalation**: Required by [date]

### ⏸️ Paused ([count] projects)
(Only shown if 'all' flag used)

### ✅ Recently Completed ([count] projects)
(Only shown if 'all' flag used or completed in last 30 days)

## Key Milestones This Week

| Project | Milestone | Due Date | Status |
|---------|-----------|----------|--------|
| [[Project]] | Deployment | 2026-01-10 | ✅ Complete |

## Immediate Attention Required

### High Priority Actions (Next 24-48 Hours)

1. **[[Project - Alpha]]**
   - Task: Complete documentation
   - Owner: [[Person]]
   - Due: Today

## Projects Summary Table

| Project | Status | Health | Owner | Recent Activity | Next Milestone |
|---------|--------|--------|-------|-----------------|----------------|
| [[Alpha]] | Active | 🟢 | [[PM]] | Meeting today | Deployment |
```

6. **Output the snapshot** as formatted markdown

7. **Provide actionable insights:**
   - Flag urgent items requiring immediate attention
   - Identify patterns across projects
   - Highlight resource constraints or bottlenecks
   - Recommend prioritization

8. **Optionally save snapshot** by asking user:
   - "Would you like me to save this project snapshot as a Page?"
   - If yes, create `Page - Project Snapshot [date].md`

## Detailed Project View

If user requests specific project (e.g., `/project-snapshot Alpha`):

```markdown
# Project Snapshot: [[Project Name]]
**Generated**: [current date]

## Project Overview
- **Full Title**: [Full project name]
- **Status**: [Active/Paused/Completed]
- **Health**: 🟢/🟡/🔴
- **Timeline**: [Start] - [End]

## Key Stakeholders
- **Project Manager**: [[Person]]
- **Technical Lead**: [[Person]]
- **Solution Architect**: [[Person]]

## Recent Activity (Last 7 Days)
- ✅ [Completed items]
- 📅 [Meetings held]
- 📝 [Documentation created]

## Architecture & Technical Decisions
- [[ADR - Title 1]] (status)
- [[ADR - Title 2]] (status)

## Tasks & Actions
### Completed Recently
- [x] [[Task - Completed]]

### In Progress
- [ ] [[Task - In Progress]] (Owner, Due date)

### Upcoming
- [ ] [[Task - Upcoming]] (Owner, Due date)

## Current Blockers
1. [Blocker description] - Impact: [X], Owner: [[Person]]

## Risks & Mitigations
| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|------------|-------|
| [Risk] | High | Medium | [Action] | [[Person]] |

## Next 30 Days
1. [Upcoming milestone 1]
2. [Upcoming milestone 2]
```

## Notes

- Prioritize actionable information over historical data
- Use health indicators (🟢🟡🔴) for quick visual status
- Flag projects with no recent activity (>14 days)
- Calculate "days since last activity" for each project
- Use UK English spelling throughout

## Examples

**Example 1:**
User: `/project-snapshot`
Assistant: [Generates overview of active projects, flags those at risk, highlights urgent actions]

**Example 2:**
User: `/project-snapshot all`
Assistant: [Shows all projects including paused and completed, organized by status]

**Example 3:**
User: `/project-snapshot Alpha`
Assistant: [Detailed snapshot of Alpha project showing recent activity, stakeholders, blockers]
