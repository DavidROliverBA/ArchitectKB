---
type: Page
title: Incubator Guide
created: 2026-01-10
modified: 2026-01-10
tags:
  - documentation
  - incubator
---

# Incubator

The Incubator is a space for capturing, developing, and validating ideas before they become formal deliverables. Ideas here benefit from access to the full vault knowledge base while remaining separate from active projects.

## Philosophy

- **Capture everything** - No idea is too small or speculative
- **Never delete** - Rejected ideas are archived, not removed
- **Link freely** - Connect to existing vault content to build context
- **Graduate when ready** - Ideas become Projects, ADRs, Pages, or other tangible outputs

## Lifecycle

| Status | Description | Next Step |
|--------|-------------|-----------|
| `seed` | Just captured, raw idea | Flesh out the problem statement |
| `exploring` | Actively researching, gathering evidence | Validate feasibility |
| `validated` | Research complete, recommendation formed | Decision to accept or reject |
| `accepted` | Approved, transitioning to deliverable | Create target note, link, archive |
| `rejected` | Not pursuing, kept for reference | Archive with rationale |

## Note Types

### Incubator (Main Idea)
The primary note for an idea. One per concept.

**Filename:** `Incubator - {{Title}}.md`

**Frontmatter:**
```yaml
type: Incubator
title: {{Title}}
status: seed | exploring | validated | accepted | rejected
domain: []           # Controlled list - see below
outcome: null        # Link to resulting deliverable when accepted
created: YYYY-MM-DD
modified: YYYY-MM-DD
tags:
  - incubator/idea
```

### IncubatorNote (Supporting Research)
Research notes, comparisons, evidence gathering. Can support multiple ideas.

**Filename:** `Incubator Note - {{Title}}.md`

**Frontmatter:**
```yaml
type: IncubatorNote
title: {{Title}}
parent-ideas: ["[[Incubator - Idea 1]]"]  # Can link to multiple
created: YYYY-MM-DD
modified: YYYY-MM-DD
tags:
  - incubator/research
```

## Domains (Controlled List)

Use these values for the `domain` field:

| Domain | Description |
|--------|-------------|
| `architecture` | Solution patterns, system design, integration approaches |
| `governance` | Standards, processes, decision-making, compliance |
| `tooling` | Software, platforms, developer experience |
| `security` | Cyber, access control, data protection |
| `data` | Data management, analytics, reporting |
| `documentation` | Knowledge management, templates, standards |
| `process` | Ways of working, methodologies, workflows |
| `ai` | AI/ML capabilities, automation, assistants |
| `infrastructure` | Cloud, networking, compute, storage |

> Add new domains sparingly. If a domain is used 3+ times, consider adding it to this list.

## Linking Conventions

### From Incubator to Vault
Link freely using standard wiki-links:
```markdown
This relates to [[Project - Alpha]] and involves [[AWS]] integration.
```

### From Vault to Incubator
When referencing incubator ideas from elsewhere in the vault, use the full name:
```markdown
See the exploration in [[Incubator - Central Software Management]].
```

### Cross-cutting Research
Supporting notes can link to multiple parent ideas:
```yaml
parent-ideas:
  - "[[Incubator - Vault Archiving Strategy]]"
  - "[[Incubator - Documentation Standards]]"
```

## Quick Capture

To quickly capture a new idea:

1. Create `+Incubator/Incubator - {{Title}}.md`
2. Set `status: seed`
3. Write a one-paragraph problem statement
4. Add relevant domain tags
5. Link to any related vault content

Or use the `/incubator` skill.

## Graduating an Idea

When an idea is `accepted`:

1. Create the target deliverable (Project, ADR, Page, etc.)
2. Update the idea's `outcome` field with a link to the new note
3. Change status to `accepted`
4. The idea remains in +Incubator as a record of the journey

## Finding Ideas

Use the [[Incubator - MOC]] for:
- All ideas by status
- All ideas by domain
- Recent activity
- Ideas needing attention

## Related

- [[Incubator - MOC]] - Map of Content with live queries
- [[MOC - Projects MOC]] - Where accepted ideas may graduate to
- [[MOC - ADRs MOC]] - Where architectural ideas may graduate to
