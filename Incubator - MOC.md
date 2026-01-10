---
type: MOC
title: Incubator MOC
scope: Idea incubation and research
created: 2026-01-10
modified: 2026-01-10
tags:
  - moc
  - incubator
---

# Incubator

Ideas being explored, researched, and validated before becoming formal deliverables.

## By Status

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

### Accepted (Graduated)
```dataview
TABLE outcome as "Became", domain as Domain
FROM "+Incubator"
WHERE type = "Incubator" AND status = "accepted"
SORT modified DESC
```

### Rejected
```dataview
TABLE domain as Domain, modified as Rejected
FROM "+Incubator"
WHERE type = "Incubator" AND status = "rejected"
SORT modified DESC
```

## By Domain

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

## Research Notes

```dataview
TABLE parent-ideas as "Supports", modified as Modified
FROM "+Incubator"
WHERE type = "IncubatorNote"
SORT modified DESC
```

## Quick Stats

- **Total Ideas**: `$= dv.pages('"+Incubator"').where(p => p.type == "Incubator").length`
- **Seeds**: `$= dv.pages('"+Incubator"').where(p => p.type == "Incubator" && p.status == "seed").length`
- **Exploring**: `$= dv.pages('"+Incubator"').where(p => p.type == "Incubator" && p.status == "exploring").length`
- **Validated**: `$= dv.pages('"+Incubator"').where(p => p.type == "Incubator" && p.status == "validated").length`

## Quick Actions

- [[+Incubator/README|Incubator Guide]] - How to use the incubator
- Create new idea: Use `/incubator` skill or template

---

*Review seeds weekly. Graduate validated ideas promptly.*
