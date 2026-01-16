# /archive Skill

Soft archive a note by adding archive metadata and moving to the +Archive folder.

## Usage

```
/archive <note-name>
/archive "Project - Old Initiative"
/archive [[Task - Completed thing]]
```

Can use note title, filename, or wiki-link format.

## Supported Note Types

| Type | Archive Location | Trigger |
|------|------------------|---------|
| Project | `+Archive/Projects/` | Completed 6+ months ago |
| Task | `+Archive/Tasks/` | Completed 3+ months ago |
| Page | `+Archive/Pages/` | Outdated, superseded |
| Person | `+Archive/People/` | Left organisation 3+ months ago |

**Not supported (leave as-is):**
- DailyNote — Year folders are the archive
- Meeting — Already temporal records
- ADR — Historical decisions must stay visible
- Organisation — Reference material
- AtomicNote — Update instead of archive
- Zettel — Permanent by design
- Incubator/IncubatorNote — Status field handles lifecycle

## Instructions

1. **Find the note**
   - Search for the note by name/title
   - If not found, inform user and stop
   - If multiple matches, ask user to clarify

2. **Check note type**
   - Read the frontmatter `type` field
   - If type is not supported for archiving, inform user:
     > "This note type ({{type}}) doesn't need archiving. [Explain why based on type]"
   - Stop if not supported

3. **Confirm with user**
   - Show current note location and type
   - Ask: "Archive this note? (Y/n)"
   - If user declines, stop

4. **Ask for archive reason** (optional)
   - "Reason for archiving? (or skip)"
   - Common reasons:
     - Project: "Project completed"
     - Task: "Task completed"
     - Page: "Content outdated" / "Superseded by [[New Page]]"
     - Person: "Left organisation"

5. **Update frontmatter**
   Add these fields:
   ```yaml
   archived: true
   archivedDate: YYYY-MM-DD  # Today's date
   archivedReason: "<reason>"  # If provided
   ```

   For Pages, also ask:
   - "Is this superseded by another page? (enter link or skip)"
   - If yes, add: `supersededBy: "[[Page Name]]"`

6. **Add archived tag**
   Add `archived` to the tags array:
   ```yaml
   tags:
     - existing-tag
     - archived
   ```

7. **Determine destination folder**
   | Type | Destination |
   |------|-------------|
   | Project | `+Archive/Projects/` |
   | Task | `+Archive/Tasks/` |
   | Page | `+Archive/Pages/` |
   | Person | `+Archive/People/` |

8. **Create archive folder if needed**
   - Check if destination folder exists
   - Create if missing (e.g., `mkdir -p "+Archive/Projects"`)

9. **Move the file**
   - Use `git mv` to preserve history:
     ```bash
     git mv "original/path/Note.md" "+Archive/Type/Note.md"
     ```
   - Obsidian will auto-update wiki-links pointing to this note

10. **Confirm to user**
    ```
    Archived: Note Name
    From: original/path/
    To: +Archive/Type/
    Reason: <reason>

    Wiki-links to this note will continue to work.
    ```

## Examples

### Archive a completed project
```
User: /archive "Project - Legacy Migration"

Claude:
- Finds: Project - Legacy Migration.md
- Type: Project
- Status: completed
- Last modified: 2025-06-15 (7 months ago)

"Archive 'Project - Legacy Migration'? (Y/n)"
User: Y

"Reason for archiving? (or skip)"
User: Project completed, in production

Claude:
- Adds archived: true, archivedDate: 2026-01-10, archivedReason: "Project completed, in production"
- Adds 'archived' tag
- Moves to +Archive/Projects/Project - Legacy Migration.md

"Archived: Project - Legacy Migration
From: root
To: +Archive/Projects/
Reason: Project completed, in production"
```

### Archive an outdated page
```
User: /archive "Page - Old API Guide"

Claude:
- Finds: Page - Old API Guide.md
- Type: Page

"Archive 'Page - Old API Guide'? (Y/n)"
User: Y

"Reason for archiving? (or skip)"
User: Superseded

"Is this superseded by another page? (enter link or skip)"
User: Page - New API Guide v2

Claude:
- Adds archived: true, archivedDate, archivedReason
- Adds supersededBy: "[[Page - New API Guide v2]]"
- Moves to +Archive/Pages/

"Archived: Page - Old API Guide
Superseded by: [[Page - New API Guide v2]]"
```

### Archive a departed colleague
```
User: /archive "Sarah Chen"

Claude:
- Finds: +People/Sarah Chen.md
- Type: Person

"Archive 'Sarah Chen'? This is typically for people who have left the organisation. (Y/n)"
User: Y

"Reason for archiving? (or skip)"
User: Left YourOrg June 2025

Claude:
- Adds archived: true, archivedDate, archivedReason: "Left YourOrg June 2025"
- Moves to +Archive/People/Sarah Chen.md

"Archived: Sarah Chen
From: +People/
To: +Archive/People/
Reason: Left YourOrg June 2025

Note: Links like [[Sarah Chen]] in meeting notes will continue to work."
```

## Batch Archive

For batch archiving (e.g., all completed tasks older than 3 months):

```
/archive batch tasks
```

This will:
1. Find all tasks where `completed: true` and `modified` > 3 months ago
2. List them for review
3. Ask for confirmation
4. Archive all in one operation

## Reversing an Archive

To unarchive, manually:
1. Move file back to original location
2. Remove `archived: true` from frontmatter
3. Remove `archived` tag
4. Optionally remove `archivedDate` and `archivedReason`

Or create an `/unarchive` skill if this becomes common.

## Dataview Integration

After archiving, update MOC queries to exclude archived content:

```dataview
TABLE status, priority
FROM ""
WHERE type = "Project" AND archived != true
SORT modified DESC
```

## Notes

- **Links preserved**: Obsidian updates wiki-links when files move
- **Git history preserved**: Using `git mv` maintains file history
- **Reversible**: Can always move back and remove flags
- **Searchable**: Archived content still searchable when needed
