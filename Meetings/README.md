# Meeting Notes

This folder contains all your meeting notes - discussions, decisions, and action items.

## What Are Meeting Notes?

Meeting notes capture:
- 📋 **Agenda and objectives** - What we planned to discuss
- 💬 **Discussion** - Key points discussed (not verbatim transcripts)
- ✅ **Decisions** - What was decided
- 🎯 **Action items** - Who's doing what by when
- 🔗 **Context** - Links to projects, people, ADRs

## Folder Structure

All meeting notes in one folder, sorted chronologically by filename:

```
+Meetings/
├── README.md (this file)
├── Meeting - 2026-01-07 Project Kickoff.md
├── Meeting - 2026-01-08 Architecture Review.md
└── ...
```

## Creating Meeting Notes

### Option 1: Use the `/meeting` Skill

Fastest method:
```
/meeting Architecture Review
```

Claude Code will:
- Prompt for date, project, attendees
- Create note with proper structure
- Open it for you to complete

### Option 2: Manual Creation

1. Create note in `+Meetings/`
2. Name: `Meeting - YYYY-MM-DD [Title].md`
3. Copy from template: `+Templates/Meeting.md`
4. Fill in details

## Meeting Note Structure

### Frontmatter
```yaml
type: Meeting
title: "Meeting Title"
date: 'YYYY-MM-DD'
created: YYYY-MM-DD
modified: YYYY-MM-DD
project: "[[Project - Name]]"  # Optional
attendees: ["[[Person 1]]", "[[Person 2]]"]
summary: "One-line summary of meeting"  # Fill after meeting
meetingType: null  # Optional: series name
tags: [meeting]
```

### Sections

1. **Attendees** - Who was present (wiki-links preferred)
2. **Agenda** - What we planned to discuss
3. **Discussion Notes** - Key points (not transcripts)
4. **Decisions Made** - Clear, actionable decisions
5. **Action Items** - Who, what, when
6. **Follow-up** - Next steps, next meeting

## Best Practices

### Before the Meeting

1. **Create the note** (use `/meeting`)
2. **Add agenda items** - What needs to be discussed
3. **Link context**:
   - Related project: `project: "[[Project Name]]"`
   - Background ADRs: Link in agenda
   - Previous meeting notes

### During the Meeting

**Capture effectively:**
- Focus on decisions and action items, not full transcripts
- Use bullet points for readability
- Link to people when they speak: "[[Jane Smith]] proposed..."
- Note dissenting opinions or concerns
- Mark parking lot items for follow-up

**Example:**
```markdown
## Discussion Notes

- [[Jane Smith]] proposed adopting GraphQL for new APIs
- Benefits: Strong typing, efficient data fetching, better DX
- Concerns from [[Alex Johnson]]: Learning curve, ecosystem maturity
- Agreed to pilot on one project first
- See [[ADR - Adopt GraphQL for API Layer]] for full analysis
```

### After the Meeting

1. **Complete the summary** - One-line summary in frontmatter
2. **Clean up notes** - Make readable, fix typos
3. **Create action items**:
   - Use checkboxes: `- [ ] Action item`
   - For important items, create Task notes
4. **Link related content**:
   - Update Project notes
   - Reference from ADRs
   - Add to relevant MOCs
5. **Share** (if needed) - Send to attendees

## Linking Effectively

### Link Attendees

```yaml
attendees: ["[[Jane Smith]]", "[[Alex Johnson]]", "[[Dr. Sarah Chen]]"]
```

**Benefits:**
- See all meetings with a person (via backlinks)
- Track interactions over time
- Find conversations with stakeholders

### Link Projects

```yaml
project: "[[Project - Cloud Migration]]"
```

**Benefits:**
- Meeting history shown in Project note
- Project context in meeting
- Navigate project → meetings easily

### Link ADRs

In discussion notes:
```markdown
Reviewed [[ADR - Use Kubernetes for Container Orchestration]]
Decision impacts [[Project - Cloud Migration]]
```

**Benefits:**
- ADR shows related discussions
- Context for architectural decisions
- Decision traceability

## Action Items

### In-Meeting Actions

Use checkboxes for simple follow-ups:
```markdown
## Action Items

- [ ] [[Jane Smith]] - Schedule GraphQL training session (by 2026-01-15)
- [ ] [[Alex Johnson]] - Draft initial ADR for GraphQL adoption (by 2026-01-20)
- [ ] All - Review GraphQL documentation before next meeting
```

### Create Task Notes

For important, trackable work:
```markdown
## Action Items

- Created [[Task - Draft GraphQL ADR]] - assigned to [[Alex Johnson]], due 2026-01-20
- Created [[Task - Schedule GraphQL Training]] - assigned to [[Jane Smith]]
```

**When to create Task notes:**
- Complex action items requiring tracking
- Work spanning multiple days
- Tasks with subtasks or dependencies
- Formal deliverables

## Meeting Types

### One-Time Meetings

Project kickoffs, ad-hoc discussions, vendor demos.

**Structure:**
- Standard template
- Leave `meetingType` null

### Recurring Meetings

Weekly standups, monthly reviews, architecture forums.

**Structure:**
- Use consistent `meetingType` (e.g., "Architecture Review")
- Reference previous meeting in current note
- Track decisions/actions over series

**Example:**
```yaml
meetingType: "Architecture Review"  # Consistent name
```

**Benefits:**
- Find all meetings in series via MOC query
- Track patterns and progress over time
- See decision evolution

### 1:1 Meetings

Regular check-ins with manager or direct reports.

**Structure:**
```yaml
meetingType: "1:1 - Jane Smith"
attendees: ["[[Jane Smith]]"]
```

**Content:**
- Career development
- Feedback
- Priorities and goals
- Personal notes (not necessarily shared)

## Integration with Vault

### MOC - Meetings MOC

Automatically lists all meetings:
- By date (recent, this week, today)
- By project
- By attendee
- By meeting type

### MOC - Projects MOC

Shows project-related meetings automatically via `project` field.

### MOC - People MOC

Shows all meetings with each person via `attendees` field.

## Example Meeting Notes

See example notes in this folder:
- `Meeting - 2026-01-07 Project Kickoff.md` - Project start meeting
- `Meeting - 2026-01-08 Architecture Review.md` - Technical discussion

## Tips and Tricks

### Templates

Customize `+Templates/Meeting.md` for your common meeting types:
- Add standard agenda items
- Include common attendees
- Add section for specific recurring meetings

### Naming Conventions

**Pattern:** `Meeting - YYYY-MM-DD [Descriptive Title].md`

**Good titles:**
- `Meeting - 2026-01-07 Project Kickoff`
- `Meeting - 2026-01-08 Architecture Review - GraphQL`
- `Meeting - 2026-01-10 1:1 Jane Smith`

**Avoid:**
- `Meeting.md` (not descriptive)
- `Architecture Meeting.md` (no date)
- `2026-01-07.md` (too generic)

### Search and Navigation

**Find meetings:**
- By person: Search `[[Person Name]]` in attendees
- By project: Filter by project in MOC
- By date: Use ISO format in search
- By keyword: Full-text search in content

### Recording Decisions

Make decisions clear and actionable:

**Good:**
```markdown
## Decisions Made

1. **Adopt GraphQL for new APIs** - Pilot on Project Beta starting Feb 2026
   - Rationale: Better DX, type safety, reduced over-fetching
   - Owner: [[Alex Johnson]]
   - Next step: Create ADR for formal approval

2. **Weekly GraphQL sync meetings** - Thursdays 2pm starting 2026-01-15
   - Attendees: API team + architecture
```

**Not ideal:**
```markdown
We talked about GraphQL and decided to use it.
```

## Privacy and Sharing

### Internal Meetings

- Fine to include in vault
- Link to all relevant context
- Capture decisions clearly

### External Meetings

- Be mindful of confidential information
- Don't include competitor details
- Avoid sharing proprietary vendor information
- Use discretion with sensitive topics

### Sharing Notes

If sharing meeting notes:
1. Review for sensitive information
2. Export to PDF or plain markdown
3. Share via email or Slack
4. Keep vault version as authoritative

## Maintenance

### Regular Cleanup

**Monthly:**
- Review recent meetings for incomplete actions
- Create Task notes for important follow-ups
- Update project links if needed

**Quarterly:**
- Archive very old meetings (>2 years) if desired
- Review recurring meeting notes for patterns

### Quality Checks

Use [[MOC - Vault Quality Dashboard]]:
- Meetings without summaries
- Meetings without project links
- Meetings without attendees

Fix these to maintain discoverability.

---

**Remember:** Meeting notes are valuable knowledge capture. Invest 10 minutes after each meeting to document well!
