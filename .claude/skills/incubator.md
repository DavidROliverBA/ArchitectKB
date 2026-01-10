---
context: fork
model: haiku
---

# incubator

Manage the idea incubator - capture ideas quickly, add research, track lifecycle.

## Usage

```
incubator <title>                     # Create new idea (no prompts)
incubator <title> [domain]            # Create with domain(s)
incubator note <title> for <idea>     # Create research note
incubator list [filter]               # List ideas
incubator status <idea> <status>      # Update status
incubator graduate <idea>             # Graduate to deliverable
```

## Examples

```
incubator API versioning strategy
incubator Central logging platform architecture governance
incubator note SaaS comparison for Central Software
incubator list seed
incubator list architecture
incubator status Archiving exploring
incubator graduate Vault Archiving
```

---

## Create Idea: `incubator <title> [domains]`

Fast capture with zero prompts. Domains are optional keywords at the end.

**Valid domains:** architecture, governance, tooling, security, data, documentation, process, ai, infrastructure

1. Parse title and any domain keywords
2. Generate filename: `Incubator - {{title}}.md`
3. Create in `+Incubator/`:

```markdown
---
type: Incubator
title: {{title}}
status: seed
domain: [{{detected domains or empty}}]
outcome: null
created: {{DATE}}
modified: {{DATE}}
tags:
  - incubator/idea
---

# {{title}}

## Problem Statement



## Context



## Initial Thoughts



## Questions to Answer

- [ ]

## Related

-

---

*See [[Incubator - MOC]] for all ideas*
```

4. Confirm with one line: `Created [[Incubator - {{title}}]] (seed)`

---

## Research Note: `incubator note <title> for <idea>`

1. Parse title and parent idea name
2. Fuzzy match parent idea in `+Incubator/`
3. Create `Incubator Note - {{title}}.md`:

```markdown
---
type: IncubatorNote
title: {{title}}
parent-ideas: ["[[Incubator - {{idea}}]]"]
created: {{DATE}}
modified: {{DATE}}
tags:
  - incubator/research
---

# {{title}}

## Summary



## Key Findings



## Evidence / Sources

-

## Implications



## Related

- [[Incubator - {{idea}}]]
```

4. Confirm: `Created research note linked to [[Incubator - {{idea}}]]`

---

## List Ideas: `incubator list [filter]`

Filter by status or domain. No filter = summary.

**Statuses:** seed, exploring, validated, accepted, rejected
**Domains:** architecture, governance, tooling, security, data, documentation, process, ai, infrastructure

1. Read `+Incubator/` files with `type: Incubator`
2. Filter and display as table:

| Idea | Status | Domain | Modified |
|------|--------|--------|----------|

3. No filter = show count by status

---

## Update Status: `incubator status <idea> <status>`

1. Fuzzy match idea name
2. Update `status` and `modified` in frontmatter
3. If `rejected`: ask for one-line reason, add to note
4. Confirm: `Updated [[Incubator - {{idea}}]] → {{status}}`

---

## Graduate: `incubator graduate <idea>`

1. Fuzzy match idea
2. Ask: "What should this become? (Project / ADR / Page / Task)"
3. Create target note with context from idea
4. Update idea: `status: accepted`, `outcome: [[New Note]]`
5. Confirm: `Graduated to [[New Note]]`

---

## Domain Reference

| Domain | When to use |
|--------|-------------|
| architecture | Solution patterns, system design, integration |
| governance | Standards, processes, compliance |
| tooling | Software, platforms, dev experience |
| security | Cyber, access control, data protection |
| data | Data management, analytics, products |
| documentation | Knowledge management, templates |
| process | Ways of working, methodologies |
| ai | AI/ML, automation, assistants |
| infrastructure | Cloud, networking, DevOps |

---

## Reference

- [[+Incubator/README]]
- [[Incubator - MOC]]
