# CLAUDE.md

This file teaches Claude Code about this Obsidian vault.

## Language

All generated text must be in UK English.

## About This Vault

**Owner**: [YOUR NAME]
**Role**: [YOUR JOB TITLE]
**Organisation**: [YOUR COMPANY]
**Purpose**: Personal knowledge management

## Directory Structure

```
vault/
├── +Attachments/     # Images, PDFs, documents
├── +Daily/           # Daily journal entries
│   └── [year]/       # Organised by year
├── +Meetings/        # Meeting notes
├── +People/          # Notes about colleagues
├── +Templates/       # Note templates
└── [root]            # Projects, tasks, pages
```

## Note Types

| Type | Description | Location |
|------|-------------|----------|
| DailyNote | Daily journal | +Daily/[year]/ |
| Meeting | Meeting notes | +Meetings/ |
| Person | Colleagues/contacts | +People/ |
| Project | Project tracking | root |
| Task | To-dos | root |
| Page | Documentation | root |

## Frontmatter Schema

### DailyNote
```yaml
type: DailyNote
title: YYYY-MM-DD
date: 'YYYY-MM-DD'
created: YYYY-MM-DD
modified: YYYY-MM-DD
```

### Meeting
```yaml
type: Meeting
title: Meeting Title
date: 'YYYY-MM-DD'
attendees: ["[[Person]]"]
project: "[[Project - Name]]"
summary: Brief summary
created: YYYY-MM-DD
modified: YYYY-MM-DD
```

### Person
```yaml
type: Person
title: Full Name
role: Job Title
organisation: Company
emailAddress: 'email@example.com'
created: YYYY-MM-DD
modified: YYYY-MM-DD
```

### Project
```yaml
type: Project
title: Project Name
status: active | paused | completed
priority: high | medium | low
created: YYYY-MM-DD
modified: YYYY-MM-DD
```

### Task
```yaml
type: Task
title: Task Title
completed: false
priority: high | medium | low
due: YYYY-MM-DD
project: "[[Project - Name]]"
created: YYYY-MM-DD
modified: YYYY-MM-DD
```

## Filename Conventions

| Type | Pattern | Example |
|------|---------|---------|
| DailyNote | `YYYY-MM-DD.md` | `2026-01-09.md` |
| Meeting | `Meeting - YYYY-MM-DD Title.md` | `Meeting - 2026-01-09 Review.md` |
| Person | `Name.md` | `John Smith.md` |
| Project | `Project - Name.md` | `Project - Alpha.md` |
| Task | `Task - Title.md` | `Task - Review docs.md` |

## Custom Skills

Skills are in `.claude/skills/`. Read the file and follow instructions when invoked.

| Command | Purpose |
|---------|---------|
| `/daily` | Create today's daily note |
| `/meeting <title>` | Create meeting note |

## Working with Notes

1. Always include YAML frontmatter with `type` field
2. Use `[[wiki-links]]` for cross-references
3. Place notes in correct folder by type
4. Include `created` and `modified` dates

## Terminology

<!-- Add your domain-specific terms -->
| Term | Meaning |
|------|---------|
| | |

## Sensitive Information

**Never commit**: API keys, passwords, personal data, internal hostnames.

---

*Customise this file for your workflow. See documentation for advanced setup.*
