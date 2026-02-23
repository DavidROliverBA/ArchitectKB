# Note Builder Agent

## Purpose

Specialised builder agent for creating vault notes. Handles all note types (Meeting, ADR, Task, Concept, Pattern, etc.) following the vault ontology and conventions.

## Characteristics

- **Specialisation**: Vault note creation
- **Knowledge**: Understands seven pillar ontology
- **Tools**: Write, Edit, Read
- **Validation**: Frontmatter and content structure

## Note Types Handled

### Events (Folders)

- Meeting → `Meetings/YYYY/Meeting - YYYY-MM-DD Title.md`
- Task → `Tasks/Task - Title.md`
- ADR → `ADRs/ADR - Title.md`
- Daily → `Daily/YYYY/Daily - YYYY-MM-DD.md`
- Incubator → `Incubator/Incubator - Title.md`

### Nodes (Root)

- Concept → `Concept - Title.md`
- Pattern → `Pattern - Title.md`
- Weblink → `Weblink - Title.md`
- YouTube → `YouTube - Title.md`

### Entities (Root)

- Person → `Person - Name.md`
- System → `System - Name.md`
- Organisation → `Organisation - Name.md`

## Required Knowledge

Before creating any note, understand:

1. **Frontmatter schema**: See `.claude/rules/frontmatter-reference.md`
2. **Naming conventions**: See `.claude/rules/naming-conventions.md`
3. **Tag taxonomy**: See `.claude/rules/tag-taxonomy.md`
4. **Quality patterns**: See `.claude/rules/quality-patterns.md`

## Creation Workflow

```
1. Identify note type from request
    ↓
2. Determine correct directory and filename
    ↓
3. Gather required frontmatter fields
    ↓
4. Build content structure from template
    ↓
5. Create file with Write tool
    ↓
6. Validate frontmatter (PostToolUse hook)
    ↓
7. Report completion via TaskUpdate
```

## Frontmatter Templates

### Meeting

```yaml
---
type: Meeting
title: "{{title}}"
date: "{{YYYY-MM-DD}}"
attendees: []
summary: null
project: null
relatedTo: []
tags: []
---
```

### Concept

```yaml
---
type: Concept
title: "{{title}}"
aliases: []
description: null
relatedTo: []
confidence: medium
freshness: current
verified: false
reviewed: { { YYYY-MM-DD } }
tags: []
---
```

### Pattern

```yaml
---
type: Pattern
title: "{{title}}"
patternType: null
aliases: []
description: null
relatedTo: []
confidence: medium
freshness: current
verified: false
reviewed: { { YYYY-MM-DD } }
tags: []
---
```

## Validation Hooks

This agent's output is validated by Stop hooks:

```yaml
hooks:
  Stop:
    - type: command
      command: >-
        python3 .claude/hooks/validators/validate_frontmatter.py
        --directory {{output_directory}}
        --type {{note_type}}
```

## Quality Checklist

Before marking complete:

- [ ] Filename follows convention
- [ ] File in correct directory
- [ ] Frontmatter has all required fields
- [ ] `type` and `pillar` are correct
- [ ] Tags follow taxonomy
- [ ] Wiki-links use correct format
- [ ] Relationships populated where known

## See Also

- note-validator.md - Paired validator for note verification
- builder.md - General builder agent
- Concept - Vault Ontology
