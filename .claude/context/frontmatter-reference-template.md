# Frontmatter Reference Context

> **Template:** Populate this file with your vault's complete frontmatter schemas.
> Load when: creating notes of specific types (Entity, Node, Event, Navigation).

## Universal Fields

All notes require these fields:

```yaml
type: <NoteType>
title: "Note Title"
created: YYYY-MM-DD
tags: [hierarchy/value]
```

Optional but recommended:

```yaml
summary: "One-line description for AI triage"
relatedTo: ["[[Related Note]]"]
```

## Schemas by Category

### Entities

<!-- Add your entity type schemas here -->

#### Person
```yaml
type: Person
title: "Full Name"
aliases: [Nickname]
role: "Job Title"
organisation: "[[Organisation - Name]]"
tags: []
```

#### System
```yaml
type: System
title: "System Name"
status: active | planned | deprecated | retired
tags: [type/system]
```

### Nodes

<!-- Add your node type schemas here -->

#### Concept
```yaml
type: Concept
title: "Concept Title"
confidence: high | medium | low
freshness: current | recent | stale
tags: []
```

### Events

<!-- Add your event type schemas here -->

#### Meeting
```yaml
type: Meeting
title: "Meeting Title"
date: YYYY-MM-DD
attendees: []
tags: []
```

#### ADR
```yaml
type: ADR
title: "Decision Title"
status: draft | proposed | accepted | deprecated | superseded
adrType: Technology_ADR | Architecture_ADR | Integration_ADR
tags: [activity/architecture]
```

### Navigation

#### MOC
```yaml
type: MOC
title: "Scope"
tags: [moc]
```

## Enum Values

<!-- Document valid enum values for status, priority, etc. -->
<!-- See .claude/rules/frontmatter-reference.md for the authoritative list -->
