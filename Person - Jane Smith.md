---
type: Person
pillar: entity
title: Jane Smith
created: 2026-01-07
modified: 2026-01-07
tags: [audience/executive]
role: Head of Architecture
organisation: "[[Organisation - Your Company]]"
emailAddress: jane.smith@example.com
aliases: []
nodeRelationships: []
entityRelationships: []
---

# Jane Smith

## Contact Information

- **Role:** Head of Architecture
- **Organisation:** [[Organisation - Your Company]]
- **Email:** jane.smith@example.com
- **Phone:**

## Notes

Jane leads the architecture function and is responsible for strategic technical direction. She has 15+ years of experience in enterprise architecture and specializes in cloud transformation and platform modernization.

**Expertise:**

- Cloud architecture (AWS, Azure)
- Enterprise integration patterns
- Architecture governance

**Working Style:**

- Prefers data-driven decisions
- Values clear documentation
- Expects ADRs for major technical decisions

## Interactions

```dataview
TABLE date, summary
FROM ""
WHERE type = "Meeting" AND contains(attendees, this.file.name)
SORT date DESC
```

## Related Projects

```dataview
TABLE status, priority
FROM ""
WHERE type = "Project" AND contains(file.outlinks, this.file.link)
SORT status ASC
```
