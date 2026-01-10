# Naming Conventions

File and folder naming patterns for this Obsidian vault.

## Filename Patterns by Type

| Type | Pattern | Location |
|------|---------|----------|
| Person | `{{Name}}.md` | +People/ |
| Meeting | `Meeting - YYYY-MM-DD {{Title}}.md` | +Meetings/ |
| DailyNote | `YYYY-MM-DD.md` | +Daily/[year]/ |
| Project | `Project - {{Name}}.md` | root |
| Task | `Task - {{Title}}.md` | root |
| ADR | `ADR - {{Title}}.md` | root |
| Weblink | `Weblink - {{Title}}.md` | root |
| Page | `Page - {{Title}}.md` | root |
| Organisation | `Organisation - {{Name}}.md` | root |
| AtomicNote | `Atomic Note - {{Title}}.md` | root |
| OKR | `OKR - {{Title}}.md` | root |
| Query | `Query - {{Title}}.md` | root |
| Course | `Course - {{Title}}.md` | root |
| MOC | `MOC - {{Title}}.md` | root |
| Dashboard | `Dashboard - {{Title}}.md` | root |
| CodeSnippet | `CodeSnippet - {{Title}}.md` | root |
| Incubator | `Incubator - {{Title}}.md` | +Incubator/ |
| IncubatorNote | `Incubator Note - {{Title}}.md` | +Incubator/ |

## General Rules

1. **Use Title Case** for names and titles
2. **Separate words with spaces** (not hyphens or underscores)
3. **Use type prefix** except for Person and DailyNote
4. **No special characters** except hyphens in date portions

## Folder Structure

```
+Archive/           # Soft-archived notes
  People/           # Archived people
  Projects/         # Archived projects
  Tasks/            # Archived tasks
+Attachments/       # Media files
+Daily/             # Daily notes
  2024/             # Year folders
  2025/
  2026/
+Inbox/             # New notes landing zone
+Incubator/         # Research ideas
+Meetings/          # All meetings
+PDFs/              # PDF storage
+People/            # Person notes
+Templates/         # Note templates
```

## Date Formats

- **Filenames:** `YYYY-MM-DD` (e.g., `2026-01-10`)
- **Frontmatter:** `YYYY-MM-DD` (e.g., `created: 2026-01-10`)
- **Meeting titles:** Include date after prefix (e.g., `Meeting - 2026-01-10 Sprint Planning.md`)

## Wiki-Link Considerations

- Person notes have no prefix to allow clean links: `[[John Smith]]`
- Other types use prefixes: `[[Project - Caerus]]`, `[[ADR - API Gateway Selection]]`
- Obsidian resolves links by filename regardless of folder location

## Known Issues

- Some `CodeSnippet` files use `CodeSnipet` (typo) - use correct spelling for new files
- Legacy meeting notes may not follow `Meeting - YYYY-MM-DD` pattern
