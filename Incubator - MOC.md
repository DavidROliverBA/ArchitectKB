---
type: MOC
title: Incubator MOC
scope: Idea incubation and research
created: 2026-01-10
modified: 2026-01-11
tags:
  - moc
  - incubator
---

# Incubator

Ideas being explored, researched, and validated before becoming formal deliverables.

## Active Ideas

### Seeds (New Ideas)
```dataview
TABLE domain as Domain, created as Created
FROM "+Incubator"
WHERE type = "Incubator" AND status = "seed"
SORT created DESC
```

### Exploring
```dataview
TABLE domain as Domain, modified as Modified
FROM "+Incubator"
WHERE type = "Incubator" AND status = "exploring"
SORT modified DESC
```

### Validated (Ready for Decision)
```dataview
TABLE domain as Domain, modified as Modified
FROM "+Incubator"
WHERE type = "Incubator" AND status = "validated"
SORT modified DESC
```

---

## Archived Ideas

### Accepted (Graduated)

Ideas that became deliverables. Located in `+Archive/Incubator/`.

```dataview
TABLE outcome as "Became", domain as Domain
FROM "+Archive/Incubator"
WHERE type = "Incubator" AND status = "accepted"
SORT modified DESC
```

### Rejected

Ideas not pursued, kept for reference. Located in `+Archive/Incubator/`.

```dataview
TABLE domain as Domain, modified as Rejected
FROM "+Archive/Incubator"
WHERE type = "Incubator" AND status = "rejected"
SORT modified DESC
```

---

## By Domain (Active Only)

### Architecture
```dataview
LIST
FROM "+Incubator"
WHERE type = "Incubator" AND contains(domain, "architecture")
SORT status ASC, modified DESC
```

### Governance
```dataview
LIST
FROM "+Incubator"
WHERE type = "Incubator" AND contains(domain, "governance")
SORT status ASC, modified DESC
```

### Tooling
```dataview
LIST
FROM "+Incubator"
WHERE type = "Incubator" AND contains(domain, "tooling")
SORT status ASC, modified DESC
```

### AI
```dataview
LIST
FROM "+Incubator"
WHERE type = "Incubator" AND contains(domain, "ai")
SORT status ASC, modified DESC
```

---

## Research Notes

IncubatorNotes remain in `+Incubator/` as they may support multiple ideas.

```dataview
TABLE parent-ideas as "Supports", modified as Modified
FROM "+Incubator"
WHERE type = "IncubatorNote"
SORT modified DESC
```

---

## Statistics

### Active Ideas
- **Seeds**: `$= dv.pages('"+Incubator"').where(p => p.type == "Incubator" && p.status == "seed").length`
- **Exploring**: `$= dv.pages('"+Incubator"').where(p => p.type == "Incubator" && p.status == "exploring").length`
- **Validated**: `$= dv.pages('"+Incubator"').where(p => p.type == "Incubator" && p.status == "validated").length`

### Archived
- **Accepted**: `$= dv.pages('"+Archive/Incubator"').where(p => p.type == "Incubator" && p.status == "accepted").length`
- **Rejected**: `$= dv.pages('"+Archive/Incubator"').where(p => p.type == "Incubator" && p.status == "rejected").length`

---

## Quick Actions

- **New idea**: `incubator <title>` or create `Incubator - {{Title}}.md` with `status: seed`
- **New research note**: `incubator note <title> for <idea>`
- **Graduate idea**: `incubator graduate <idea>` - creates deliverable, archives idea
- **Reject idea**: `incubator reject <idea>` - adds rationale, archives idea

---

## Archive Location

| Status | Location |
|--------|----------|
| seed, exploring, validated | `+Incubator/` |
| accepted, rejected | `+Archive/Incubator/` |

---

*Review seeds weekly. Graduate validated ideas promptly.*
