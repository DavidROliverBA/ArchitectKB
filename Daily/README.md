# Daily Notes

This folder contains your daily journal entries for personal reflection, task tracking, and daily logging.

## What Are Daily Notes?

Daily notes are your personal space for:
- 📝 **Daily reflection** - What happened today, what you learned
- ✅ **Task tracking** - What you worked on, what's in progress
- 💡 **Idea capture** - Quick thoughts and insights
- 📊 **Progress tracking** - Wins, challenges, blockers
- 🔗 **Context linking** - Connect daily activities to projects, meetings, people

## Folder Structure

Daily notes are organized by year for scalability:

```
+Daily/
├── README.md (this file)
├── 2024/
│   ├── 2024-01-01.md
│   ├── 2024-01-02.md
│   └── ...
├── 2025/
│   ├── 2025-01-01.md
│   └── ...
└── 2026/
    ├── 2026-01-07.md (example)
    └── ...
```

## Creating Daily Notes

### Option 1: Use the `/daily` Skill

Fastest method:
```
/daily
```

Claude Code will:
- Create today's note from template
- Place it in the correct year folder
- Open it for you to start writing

### Option 2: Manual Creation

1. Navigate to `+Daily/[current-year]/`
2. Create new note: `YYYY-MM-DD.md`
3. Copy from template: `+Templates/Daily.md`
4. Fill in the frontmatter and sections

## Daily Note Structure

Each daily note includes:

### Frontmatter
```yaml
type: DailyNote
title: "Daily Note - YYYY-MM-DD"
date: 'YYYY-MM-DD'
created: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [daily]
```

### Sections

1. **Tasks Today** - What you're working on (link to Task notes)
2. **Meetings** - Who you met with (link to Meeting notes)
3. **Progress** - What you accomplished
4. **Notes** - Free-form thoughts, ideas, observations
5. **Wins** - Positive moments, accomplishments
6. **Challenges** - Blockers, difficulties, frustrations
7. **Tomorrow** - Planning for next day

## Best Practices

### Linking Effectively

**Link to projects:**
```markdown
Working on [[Project - Cloud Migration]] today.
```

**Link to tasks:**
```markdown
- [ ] Complete [[Task - Review GraphQL ADR]]
```

**Link to people:**
```markdown
Met with [[Jane Smith]] about architecture standards.
```

**Link to meetings:**
```markdown
Attended [[Meeting - 2026-01-07 Architecture Review]]
```

### Daily Routine

**Morning (~5 minutes):**
- Create today's note with `/daily`
- Review yesterday's "Tomorrow" section
- List today's priorities
- Note scheduled meetings

**During Day:**
- Capture quick notes as you work
- Link to tasks you complete
- Reference meetings attended
- Jot down ideas and insights

**Evening (~10 minutes):**
- Review progress
- Note wins and challenges
- Plan tomorrow
- Link to any notes you created today

### What to Capture

**DO capture:**
- Key decisions and context
- Problems you solved
- People you collaborated with
- Ideas and insights
- Learning moments
- Links to work artifacts

**DON'T capture:**
- Sensitive information (credentials, tokens)
- Minutiae (every email sent)
- Information better suited for project notes
- Verbatim meeting transcripts (use Meeting notes)

## Integration with Other Notes

### Connecting to Projects

Your daily notes automatically connect to your broader work:

**In daily note:**
```markdown
Made progress on [[Project - API Gateway Modernization]].
Reviewed [[ADR - Adopt GraphQL for API Layer]] with [[Alex Johnson]].
```

**Result:** You can now find this daily note from:
- The Project note (via backlinks)
- The ADR note (via backlinks)
- Alex Johnson's Person note (via backlinks)

### Task Tracking

**Link completed tasks:**
```markdown
## Tasks Today

- [x] [[Task - Review GraphQL ADR]] ✅ Completed
- [ ] [[Task - Update API documentation]] (in progress)
- [ ] [[Task - Security review prep]] (blocked on vendor response)
```

**Benefits:**
- See task progress over time
- Track what you worked on each day
- Find context for completed tasks

## Review and Reflection

### Weekly Review

Create a weekly summary (use `/weekly-summary` skill):
- Review past 7 daily notes
- Extract major accomplishments
- Identify patterns (recurring challenges)
- Plan for next week

### Monthly Review

Look back at a month of daily notes:
- Major projects advanced
- Key decisions made
- Growth areas
- Wins to celebrate

## Example Daily Note

See the example daily note: `2026/2026-01-07.md`

## Privacy and Security

- Daily notes are for your eyes only (not shared)
- Avoid storing sensitive information
- Don't include passwords, API keys, or credentials
- Be mindful of confidential business information

## Tips and Tricks

### Templates and Shortcuts

- **Recurring sections**: Add your own sections to the template
- **Checklists**: Use daily checklists for routines
- **Tags**: Add custom tags for tracking themes

### Search and Navigation

- **Find by date**: Use ISO format YYYY-MM-DD in search
- **Find by project**: Search for `[[Project Name]]` across all daily notes
- **Find by person**: Search for `[[Person Name]]` to see all interactions

### Consistency

- **Daily habit**: Write something every workday, even if brief
- **Same time**: Morning planning + evening review works well
- **Keep it simple**: Don't overthink it, just capture

## Maintenance

### Archiving

Daily notes older than 2 years can be:
- Kept in vault (if space isn't an issue)
- Archived to backup storage
- Deleted if no longer valuable (keep 2-3 years recommended)

### Cleanup

- Review and clean up notes periodically
- Remove daily notes with no useful content
- Keep notes with valuable context/decisions

---

**Remember:** Daily notes are a tool for you. Adapt the structure and practice to fit your needs!
