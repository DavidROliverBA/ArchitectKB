---
type: Person
title: Alex Johnson
created: 2026-01-07
modified: 2026-01-07
tags: [colleague, engineering]
role: Senior Software Engineer
organisation: "[[Organisation - Your Company]]"
email: alex.johnson@example.com
phone: null
---

# Alex Johnson

## Contact Information

- **Role:** Senior Software Engineer
- **Organisation:** [[Organisation - Your Company]]
- **Email:** alex.johnson@example.com
- **Phone:**

## Notes

Alex is a senior engineer on the platform team with deep expertise in Kubernetes and microservices. Key collaborator on [[Project - Cloud Migration]] and [[Project - API Gateway Modernisation]].

**Expertise:**
- Kubernetes and container orchestration
- Microservices architecture
- CI/CD pipelines
- Infrastructure as Code (Terraform)

**Working Style:**
- Hands-on technical contributor
- Strong advocate for automation
- Prefers iterative development approach

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
