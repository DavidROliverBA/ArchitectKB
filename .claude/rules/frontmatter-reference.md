# Frontmatter Reference

Quick reference for all frontmatter fields by note type.

## Universal Fields

All notes should include:

```yaml
type: <NoteType>          # Required
title: <Title>            # Required
created: YYYY-MM-DD       # Creation date
modified: YYYY-MM-DD      # Last modified
tags: []                  # Categorisation tags
```

## Type Quick Reference

### Task
```yaml
type: Task
completed: false
priority: high | medium | low
doDate: null              # When to start
dueBy: null               # Hard deadline
project: null             # "[[Project]]"
assignedTo: []            # ["[[Person]]"]
```

### Project
```yaml
type: Project
status: active | paused | completed
priority: high | medium | low
timeFrame: YYYY-MM-DD - YYYY-MM-DD
collections: <program>
```

### Meeting
```yaml
type: Meeting
date: 'YYYY-MM-DD'
project: null
attendees: []             # ["[[Person]]"]
summary: null
collections: null         # "1:1", "Sprint"
```

### ADR
```yaml
type: Adr
status: proposed | accepted | deprecated | superseded
adrType: Technology_ADR | Integration_ADR | Security_ADR | Data_ADR
description: null
project: null
jiraTicket: null
deciders: []
approvers: []
stakeholders: []
assumptions: []
# Relationships
relatedTo: []
supersedes: []
dependsOn: []
contradicts: []
# Quality Indicators
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis
verified: false
reviewed: null
```

### Person
```yaml
type: Person
role: null
organisation: null        # "[[Organisation]]"
emailAddress: null
```

### Weblink
```yaml
type: Weblink
url: <URL>
domain: <domain>
createdAt: <ISO timestamp>
```

### DailyNote
```yaml
type: DailyNote
date: 'YYYY-MM-DD'
```

### Incubator
```yaml
type: Incubator
status: seed | exploring | validated | accepted | rejected
domain: []
outcome: null
```

### IncubatorNote
```yaml
type: IncubatorNote
parent-ideas: []          # ["[[Incubator - Idea]]"]
```

### OKR
```yaml
type: Okr
status: active | completed | abandoned
period: <Q1 2026 | H1 2026 | 2026>
objective: null
keyResults: []
project: null
```

### Query
```yaml
type: Query
description: null
queryType: table | list | task
```

### Course
```yaml
type: Course
status: not-started | in-progress | completed
provider: null
url: null
completedDate: null
```

### MOC
```yaml
type: MOC
scope: null
```

### Dashboard
```yaml
type: Dashboard
refreshed: YYYY-MM-DD
```

### CodeSnippet
```yaml
type: CodeSnippet
language: python | javascript | bash | yaml | sql | other
purpose: null
```

## Archive Fields

Added when using `/archive`:

```yaml
archived: true
archivedDate: YYYY-MM-DD
archivedReason: "<reason>"
```

## Field Value Standards

| Field Type | Format | Example |
|------------|--------|---------|
| Dates | ISO 8601 | `2026-01-10` |
| Booleans | lowercase | `true`, `false` |
| Status | lowercase | `active`, `proposed` |
| Priority | lowercase | `high`, `medium`, `low` |
| Wiki-links | quoted | `"[[Note Title]]"` |
| Arrays | brackets | `["item1", "item2"]` |
