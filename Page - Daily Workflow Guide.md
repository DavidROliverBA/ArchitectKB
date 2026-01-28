---
type: Page
title: Daily Workflow Guide
created: 2026-01-28
modified: 2026-01-28
tags:
  - activity/documentation
  - domain/tooling
  - audience/architect

# Quality Indicators
summary: Practical routines for using ArchitectKB skills in daily, weekly, and monthly workflows
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-28

# Semantic Discovery
keywords:
  - daily-workflow
  - routine
  - productivity
  - meetings
  - tasks
  - weekly-review

# Relationships
relatedTo:
  - "[Page - Claude Code Skills Quick Reference](Page%20-%20Claude%20Code%20Skills%20Quick%20Reference.md)"
  - "[Page - How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md)"
  - "[Dashboard - Main Dashboard](Dashboard%20-%20Main%20Dashboard.md)"
  - "[MOC - Tasks MOC](MOC%20-%20Tasks%20MOC.md)"
---

# Daily Workflow Guide

This guide provides practical routines for using ArchitectKB throughout your day. Learn how to capture information efficiently, maintain vault health, and build a compounding knowledge base.

---

## Morning Routine (5-10 minutes)

Start each day by setting up your daily note and reviewing what's ahead.

### Step 1: Create Today's Daily Note

```
/daily
```

This creates `+Daily/2026/2026-01-28.md` with:

- Yesterday/Today/Tomorrow sections
- Quick navigation to tasks and projects
- Space for reflections

### Step 2: Review Open Tasks

Open [MOC - Tasks MOC](MOC%20-%20Tasks%20MOC.md) or run:

```
/q type:Task completed:false priority:high
```

This shows your high-priority open tasks. Review and decide what you'll tackle today.

### Step 3: Check Today's Meetings

Review your calendar and ensure you have meeting notes ready:

```
/q type:Meeting date:2026-01-28
```

If you have meetings without notes, create them:

```
/meeting Architecture Review with Jane, Alex for Project - Cloud Migration
```

### Step 4: Update Daily Focus

Edit your daily note to add today's focus areas based on:

- Open tasks requiring attention
- Meetings scheduled
- Project deadlines

**Example Morning Focus:**

```markdown
## Today's Focus

- **Cloud Migration ADR** - Finalise API Gateway decision
- **Sprint Planning** - Prepare backlog items
- **1:1 with Jane** - Discuss architecture concerns
```

---

## During the Day

### Capturing Meeting Notes

**Before the meeting:**

```
/meeting Sprint Planning with Team
```

This creates a meeting note with the correct date and attendees section.

**During the meeting:**

- Capture key discussion points in **Discussion Notes**
- Record decisions in **Decisions Made**
- Create action items with checkbox format: `- [ ] Action item`

**After the meeting:**

- Link to the relevant project if not already done
- Extract tasks that need tracking:

```
/task Review API documentation for Project - Cloud Migration priority:high dueBy:2026-02-05
```

### Capturing Tasks Quickly

When tasks come up during the day:

```
/task <description> [options]
```

**Options:**

- `priority:high|medium|low`
- `dueBy:YYYY-MM-DD`
- `for Project - Name`

**Examples:**

```
/task Review security assessment priority:high
/task Send architecture diagram to stakeholders dueBy:2026-01-30
/task Update HLD for Project - Data Platform priority:medium
```

### Research and Discovery

When you need to find information:

**Fast text search:**

```
/q kubernetes authentication
```

**Find related content:**

```
/related api gateway
```

**Find decisions:**

```
/find-decisions authentication
```

**Search PDF/book content:**

```
/book-search event sourcing patterns
```

### Capturing Web Resources

When you find useful articles or documentation:

```
/weblink https://martinfowler.com/articles/microservices.html
```

Claude will:

1. Fetch the page content
2. Generate a summary
3. Create a Weblink note with tags

For YouTube videos:

```
/youtube https://www.youtube.com/watch?v=...
```

This creates a Weblink with transcript analysis.

### Recording People

When you meet new colleagues or contacts:

```
/person Jane Smith
```

Claude will prompt for:

- Role/title
- Organisation
- Email address
- Notes about the person

### Capturing Ideas

When research ideas emerge:

```
incubator Event-Driven Architecture architecture,data
```

This creates an incubator note with:

- `seed` status
- Domain tags
- Space for initial thoughts

---

## End of Day Review (5-10 minutes)

### Step 1: Update Task Status

Review tasks worked on today and mark as complete:

```
/q type:Task completed:false
```

For each completed task, update the note:

1. Set `completed: true`
2. Add `completedDate: 2026-01-28`
3. Add resolution notes

### Step 2: Update Daily Note

Return to your daily note and add:

- **What I accomplished** - Brief summary
- **Learnings** - Key insights
- **Tomorrow's priorities** - What to focus on next

**Example:**

```markdown
## Reflections

### What I Accomplished

- Completed API Gateway ADR draft
- Sprint planning - prioritised Q1 backlog
- Met with Jane re: Cloud Migration concerns

### Learnings

- Kong vs AWS API Gateway trade-offs clearer now
- Need to involve Security earlier in ADR process

### Tomorrow

- Finalise ADR and send for review
- Start Data Platform HLD outline
```

### Step 3: Capture Any Pending Items

If you have loose notes or browser tabs open, capture them:

```
/task Follow up on security review findings for Project - Cloud Migration
/weblink https://... (for useful articles found)
```

---

## Weekly Review (30 minutes)

Every Friday or Monday, conduct a comprehensive review.

### Step 1: Generate Weekly Summary

```
/weekly-summary
```

This generates a report showing:

- Meetings attended
- Tasks completed
- ADRs created or updated
- Notes added

### Step 2: Review Project Status

For each active project:

```
/project-status Cloud Migration
```

Or get a quick snapshot of all projects:

```
/project-snapshot
```

### Step 3: Check ADR Health

```
/adr-report week
```

Review:

- ADRs in draft status (need completion)
- ADRs awaiting approval
- Relationships between decisions

### Step 4: Vault Quality Check

```
/quality-report
```

This identifies:

- Stale content needing review
- Notes missing metadata
- Orphaned notes (no backlinks)

### Step 5: Process Incubator

Review ideas in the incubator:

```
incubator list exploring
```

For each idea:

- Is it still relevant? If not: `incubator reject <idea>`
- Ready to move forward? Update status: `incubator status <idea> validated`
- Ready to become a project? `incubator graduate <idea>`

### Step 6: Update Weekly Goals

Review OKRs and update progress:

```
/q type:Okr status:active
```

---

## Monthly Maintenance (1 hour)

Once a month, perform deeper vault maintenance.

### Step 1: Comprehensive Health Check

```
/vault-maintenance
```

This runs all quality checks and generates recommendations.

### Step 2: Find Orphaned Notes

```
/orphans
```

For each orphan:

- Link it to relevant notes
- Or archive if no longer needed

### Step 3: Fix Broken Links

```
/broken-links
```

Fix any broken wiki-links or update references.

### Step 4: Check Weblinks

```
/check-weblinks
```

Identify dead or redirected URLs and update or archive as needed.

### Step 5: Review Stale Content

```
/q type:Page freshness:stale
```

For stale notes:

- Update if still relevant
- Archive if superseded
- Update `reviewed` date after review

### Step 6: Tag Audit

```
/tag-management audit
```

Ensure tags follow the taxonomy and migrate any flat tags to hierarchical.

### Step 7: Archive Completed Work

Archive completed projects and tasks:

```
/archive Project - Old Completed Project
```

---

## Example: Complete Day Walkthrough

### 08:30 - Morning Setup

```
/daily
```

Review daily note, add focus areas:

- Finalise Cloud Migration ADR
- Prep for Architecture Review meeting
- Review pending security findings

### 09:00 - Architecture Review Meeting

```
/meeting Architecture Review with Jane, Alex, Security Team for Project - Cloud Migration
```

During meeting, capture notes in the meeting file.

### 10:30 - ADR Work

Working on ADR, need to find previous decisions:

```
/find-decisions api gateway
```

Found related content. Update ADR with relationships.

### 12:00 - Research

Found useful article while researching:

```
/weblink https://aws.amazon.com/blogs/architecture/...
```

### 14:00 - New Task Arrives

Email requests security documentation:

```
/task Document security controls for Cloud Migration priority:high dueBy:2026-02-01
```

### 15:30 - Meeting Follow-up

Extract tasks from morning meeting:

```
/task Review API authentication options for Project - Cloud Migration
/task Schedule follow-up with Security Team
```

### 17:00 - End of Day

Update daily note with accomplishments and tomorrow's priorities.

Mark completed tasks:

1. Open task file
2. Set `completed: true`
3. Add `completedDate: 2026-01-28`

---

## Quick Reference

### Most-Used Daily Skills

| Task                 | Skill               | Model |
| -------------------- | ------------------- | ----- |
| Start the day        | `/daily`            | 🟢    |
| Create meeting note  | `/meeting <title>`  | 🟢    |
| Quick task creation  | `/task <title>`     | 🟢    |
| Fast search          | `/q <query>`        | 🟢    |
| Find related content | `/related <topic>`  | 🟡    |
| Save web resource    | `/weblink <url>`    | 🟢    |
| New contact          | `/person <name>`    | 🟢    |
| Research idea        | `incubator <title>` | 🟢    |

### Weekly Review Skills

| Task                  | Skill                       | Model |
| --------------------- | --------------------------- | ----- |
| Weekly summary        | `/weekly-summary`           | 🟢    |
| Project status        | `/project-status <project>` | 🟡    |
| All projects snapshot | `/project-snapshot`         | 🟢    |
| ADR report            | `/adr-report week`          | 🟢    |
| Quality metrics       | `/quality-report`           | 🟡    |
| Review incubator      | `incubator list`            | 🟢    |

### Monthly Maintenance Skills

| Task              | Skill                   | Model |
| ----------------- | ----------------------- | ----- |
| Full health check | `/vault-maintenance`    | 🟢    |
| Find orphans      | `/orphans`              | 🟢    |
| Fix broken links  | `/broken-links`         | 🟡    |
| Check weblinks    | `/check-weblinks`       | 🟢    |
| Tag audit         | `/tag-management audit` | 🟢    |
| Archive old notes | `/archive <note>`       | 🟢    |

---

## Tips for Building Habits

### Start Small

Begin with just three skills:

1. `/daily` - Every morning
2. `/meeting` - Before each meeting
3. `/task` - When tasks arise

### Consistency Over Volume

- Better to capture 3 things daily than 30 things weekly
- Regular reviews prevent backlog buildup
- Small daily habits compound over time

### Link Everything

Every note should link to at least one other note:

- Tasks link to projects
- Meetings link to projects and people
- ADRs link to related decisions

### Use Tags Consistently

Follow the tag taxonomy:

- `activity/` - What kind of work
- `domain/` - Business area
- `project/` - Which project
- `technology/` - Tech involved

### Review Regularly

Set calendar reminders:

- **Daily**: 5 minutes morning setup, 5 minutes end-of-day
- **Weekly**: 30 minutes Friday review
- **Monthly**: 1 hour first Monday maintenance

---

## Related Guides

- [Page - Claude Code Skills Quick Reference](Page%20-%20Claude%20Code%20Skills%20Quick%20Reference.md) - All 62 skills with examples
- [Page - Search and Discovery Guide](Page%20-%20Search%20and%20Discovery%20Guide.md) - Deep dive on search
- [Page - How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md) - General vault usage
- [Dashboard - Main Dashboard](Dashboard%20-%20Main%20Dashboard.md) - Central navigation hub
- [MOC - Tasks MOC](MOC%20-%20Tasks%20MOC.md) - Task tracking view
