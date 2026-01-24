---
context: fork
model: haiku
---

# /daily

Create today's daily note in the Obsidian vault.

## Instructions

1. Get today's date in YYYY-MM-DD format
2. Check if a daily note already exists at `+Daily/YYYY/YYYY-MM-DD.md`
3. If it exists, read it and proceed to step 5
4. If it doesn't exist, create it using the template at `+Templates/DailyNote.md` with these replacements:
   - Replace DATE placeholder with today's date (YYYY-MM-DD)
   - Replace DAY_NAME with full day name (e.g., Monday)
   - Replace MONTH with full month name (e.g., January)
   - Replace DAY_NUMBER with day of month with ordinal (e.g., 5th)
   - Replace YEAR with 4-digit year

5. **Search for tasks completed today:**
   - Use Grep to find tasks with `completedDate: YYYY-MM-DD` (today's date)
   - For each completed task found, read the task file to get the resolution
   - Add to the "Completed Today" section in this format:
     `- [x] [[Task - Title]] - Brief resolution summary`

6. **Add focus areas from meetings:**
   - Check for meeting notes linked to today (in "Meetings Today" section)
   - Derive 2-4 focus areas from the meetings scheduled
   - Update the "Today's Focus" section with brief descriptions
   - Format: `- **Topic** - Brief description of focus`

7. Confirm the daily note path and summarise what was added

## File Naming

Daily notes use simple date-based naming in year folders: `+Daily/YYYY/YYYY-MM-DD.md`

Examples:

- `+Daily/2026/2026-01-21.md`
- `+Daily/2025/2025-12-25.md`

This keeps filenames clean and scales well over multiple years.
