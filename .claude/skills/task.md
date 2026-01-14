---
context: fork
model: haiku
---

# /task

Quick-create a task linked to a project.

## Usage

```
/task <title>
/task <title> for <project>
/task <title> due <date>
/task <title> priority high
```

## Examples

```
/task Review ADR draft
/task Complete cyber assessment for Caerus due Friday
/task Update architecture diagram priority high for 777X
```

## Instructions

1. Parse the command for:
   - **title**: Task description (required)
   - **project**: Project to link (after "for")
   - **due**: Due date (after "due") - parse natural language
   - **priority**: high/medium/low (after "priority")

2. Defaults:
   - priority: medium
   - due: null
   - project: null (or infer from recent context)

3. Generate filename: `Task - {{title}}.md`

4. Create task in vault root:

```markdown
---
type: Task
title: {{title}}
created: {{DATE}}
modified: {{DATE}}
completed: false
priority: {{priority}}
due: {{due_date or null}}
project: {{project_link or null}}
assignee: "[[David (me)]]"
tags: []
---

# {{title}}

## Description

{{title expanded if needed}}

## Acceptance Criteria

- [ ]

## Notes


## Related

{{project link if provided}}
```

5. If project provided:
   - Format as wiki-link: `"[[Project - Caerus]]"`
   - Fuzzy match project name if partial

6. If due date provided:
   - Parse natural language: "Friday" → next Friday's date
   - "tomorrow" → tomorrow's date
   - "next week" → Monday of next week
   - Format as YYYY-MM-DD

7. After creating:
   - Confirm creation with file path
   - Show task summary
   - Suggest adding to daily note
