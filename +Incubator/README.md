---
type: Page
title: Incubator Guide
created: 2026-01-09
modified: 2026-01-10
tags:
  - documentation
  - incubator
---

# Incubator

The Incubator is a space for capturing, developing, and validating ideas before they become formal deliverables. Ideas here benefit from access to the full vault knowledge base while remaining separate from active projects.

## Philosophy

- **Capture everything** - No idea is too small or speculative
- **Archive, don't delete** - Graduated and rejected ideas move to `+Archive/Incubator/`
- **Merge duplicates** - Overlapping ideas are merged (secondary deleted, content preserved)
- **Link freely** - Connect to existing vault content to build context
- **Graduate when ready** - Ideas become Projects, ADRs, Pages, or other tangible outputs

## Lifecycle

| Status | Description | Next Step | Location |
|--------|-------------|-----------|----------|
| `seed` | Just captured, raw idea | Flesh out the problem statement | +Incubator/ |
| `exploring` | Actively researching, gathering evidence | Validate feasibility | +Incubator/ |
| `validated` | Research complete, recommendation formed | Decision to accept or reject | +Incubator/ |
| `accepted` | Approved, deliverable created | Archive | +Archive/Incubator/ |
| `rejected` | Not pursuing, kept for reference | Archive with rationale | +Archive/Incubator/ |

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
This relates to [[Project - MyProject]] and involves [[ERP]] integration.
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

Or use the `/incubator` skill (coming soon).

## Merging Ideas

When two or more ideas overlap significantly, merge them:

1. **Identify the primary idea** - Usually the broader or more developed one
2. **Merge content** - Copy valuable sections from secondary idea(s) into primary
3. **Add merge record** to primary idea:
   ```markdown
   ## Merged Ideas

   *Merged from [[Incubator - Other Idea]] on YYYY-MM-DD*

   [Brief summary of what was brought in]
   ```
4. **Delete the secondary idea(s)** - The merge record in the primary preserves history
5. **Update any IncubatorNotes** - Change `parent-ideas` links to point to primary

> **Key principle**: Unlike rejected ideas (kept for reference), merged ideas are deleted because their content lives on in the primary note. The merge record provides the audit trail.

### When to Merge

| Scenario | Action |
|----------|--------|
| Ideas are 70%+ overlapping | Merge into the broader one |
| One idea is a sub-topic of another | Merge into the parent |
| Ideas evolved to cover same ground | Merge into the more developed one |
| Ideas are complementary but distinct | Keep separate, link via `relatedTo` |

## Graduating an Idea

When an idea is `accepted`:

1. Create the target deliverable (Project, ADR, Page, etc.)
2. Update the idea's frontmatter:
   - `status: accepted`
   - `outcome: "[[Target Note]]"`
   - Add tag: `incubator/graduated`
3. Move the idea to `+Archive/Incubator/`
4. Obsidian auto-updates all wiki-links

**Frontmatter after graduation:**
```yaml
status: accepted
outcome: "[[Page - My Deliverable]]"
tags:
  - incubator/idea
  - incubator/graduated
```

### Rejecting an Idea

When an idea is `rejected`:

1. Update frontmatter:
   - `status: rejected`
   - `outcome: null` (or brief reason)
   - Add tag: `incubator/rejected`
2. Move to `+Archive/Incubator/`
3. The rejection rationale lives in the note body

## Archive Structure

```
+Archive/
└── Incubator/           # Graduated and rejected ideas
    ├── Incubator - Vault Archiving Strategy.md    # accepted
    ├── Incubator - Ralph Mode.md                  # accepted
    └── Incubator - Some Rejected Idea.md          # rejected
```

> **Note:** IncubatorNotes (research) stay in `+Incubator/` as they may support multiple ideas and remain useful reference material.

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
