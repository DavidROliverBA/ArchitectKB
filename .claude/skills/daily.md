---
context: fork
model: haiku
---

# /daily

Create today's daily note in the Obsidian vault.

## Instructions

1. Get today's date in YYYY-MM-DD format
2. Check if a daily note already exists at `+Daily/YYYY-MM-DD.md`
3. If it exists, read and display it
4. If it doesn't exist, create it with the following content:

```markdown
---
type: DailyNote
title: {{DATE}}
created: {{DATE}}
date: {{DATE}}
tags: [daily]
---

# {{DAY_NAME}}, {{MONTH}} {{DAY_NUMBER}} {{YEAR}}

## Today's Focus

-

## Tasks

### Due Today

```dataview
TASK
FROM ""
WHERE type = "Task" AND due = date("{{DATE}}") AND !completed
```

### Completed Today

- [ ]

## Meetings Today

```dataview
TABLE time as "Time", summary as "Summary"
FROM ""
WHERE type = "Meeting" AND date = date("{{DATE}}")
SORT time ASC
```

## Notes


## Reflections

```

Replace:
- `{{DATE}}` with today's date (YYYY-MM-DD)
- `{{DAY_NAME}}` with full day name 
- `{{MONTH}}` with full month name 
- `{{DAY_NUMBER}}` with day of month with ordinal 
- `{{YEAR}}` with 4-digit year

5. After creating, confirm the file was created and show the path

## File Naming

Daily notes use simple date-based naming: `YYYY-MM-DD.md`

Since files are in the `+Daily/` folder, no prefix is needed. Examples:
- `+Daily/2026-01-05.md`
- `+Daily/2025-12-25.md`

This keeps filenames clean and works well with the Calendar plugin.
