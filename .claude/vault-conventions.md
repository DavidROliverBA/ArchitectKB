# Vault Conventions Guide

**Purpose:** Document small but important conventions and best practices for working with this Obsidian vault. This guide helps Claude Code and other tools follow the correct patterns.

**Last Updated:** 2026-01-07

---

## Frontmatter YAML Conventions

### Tags Format

**❌ INCORRECT - Don't use `#` prefix in frontmatter:**
```yaml
tags: [ADR, #activity/architecture, #technology/aws]
```

**✅ CORRECT - Use plain hierarchical paths:**
```yaml
tags: [ADR, activity/architecture, technology/aws, project/my-project, domain/cloud]
```

**Explanation:**
- In frontmatter YAML, tags are plain strings without the `#` prefix
- The `#` prefix is only used when writing inline tags in the body of notes (e.g., `#technology/aws`)
- Obsidian automatically treats these hierarchical paths as nested tags

### Tag Taxonomy

Use hierarchical tags following this structure:

```yaml
tags: [
  ADR,                          # Note type (if applicable)
  activity/architecture,        # What kind of work (activity/)
  technology/aws,               # Technologies involved (technology/)
  project/my-project,           # Which project (project/)
  domain/cloud,                 # Business domain (domain/)
  other-tags                    # Other flat tags as needed
]
```

**Hierarchical Prefixes:**
- `activity/` - Type of work: architecture, implementation, evaluation, research
- `technology/` - Technologies: aws, sap, kafka, bedrock, etc.
- `project/` - Projects: your-project-names-here
- `domain/` - Business domains: aviation, data, integration, security, cloud

### Field Naming Standards

**Dates:**
- Use ISO 8601 format: `YYYY-MM-DD`
- Examples: `created: 2026-01-07`, `reviewed: 2026-01-07`

**Booleans:**
- Use lowercase: `verified: true` or `verified: false`
- Not: `Verified: True` or `verified: yes`

**Status Values:**
- Use lowercase: `status: accepted`, `status: proposed`, `status: draft`
- Not: `status: Accepted` or `status: PROPOSED`

**Priority Values:**
- Use lowercase: `priority: high`, `priority: medium`, `priority: low`
- Not: `priority: High` or `priority: 1`

### String vs Quoted Strings

**Plain strings (no quotes needed):**
```yaml
title: ADR - API Gateway Selection
status: accepted
priority: high
```

**Quoted strings (use when containing special characters):**
```yaml
title: "ADR - Project Alpha: AWS Services"
description: "Multi-line description
  that spans lines"
```

**Wiki-links in frontmatter:**
```yaml
project: "[[Project - MyProject]]"
relatedTo: ["[[ADR - Cloud Migration Strategy]]"]
```

---

## Quality Indicators Pattern

All ADRs, Pages, and Projects should include quality indicators:

```yaml
# Quality Indicators
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis | external
verified: true | false
reviewed: YYYY-MM-DD
```

**Guidelines:**
- `confidence: high` - Authoritative, well-researched, definitive
- `confidence: medium` - Good information but some uncertainty
- `confidence: low` - Preliminary, needs verification
- `freshness: current` - Reviewed within 3 months
- `freshness: recent` - Reviewed 3-12 months ago
- `freshness: stale` - Not reviewed in >12 months
- `source: primary` - Created by you, first-hand knowledge
- `source: secondary` - Based on documentation, meetings
- `source: synthesis` - Compiled from multiple sources
- `source: external` - From external references

---

## Relationship Metadata (ADRs)

All ADRs must include relationship fields:

```yaml
# Relationships
relatedTo: ["[[Related ADR]]", "[[Related Project]]"]
supersedes: ["[[Old ADR]]"]
dependsOn: ["[[Foundation ADR]]"]
```

**Guidelines:**
- Use empty arrays `[]` if no relationships (don't omit the field)
- `relatedTo` - Related decisions, projects, or context
- `supersedes` - ADRs that this decision replaces
- `dependsOn` - ADRs that must exist before this one

---

## File Naming Conventions

### General Rules
- Use Title Case for names
- Separate words with spaces (not hyphens or underscores)
- Use prefixes to indicate note type

### Patterns by Type

**ADRs:**
```
ADR - <Decision Title>.md
ADR - API Gateway Selection.md
ADR - Event Streaming Platform.md
```

**Projects:**
```
Project - <Project Name>.md
Project - MyProject.md
Project - Cloud Migration.md
```

**People:**
```
<First Name> <Last Name>.md
John Smith.md
Jane Doe.md
```

**Meetings:**
```
Meeting - YYYY-MM-DD <Title>.md
Meeting - 2026-01-06 Architecture Review.md
```

**Pages:**
```
Page - <Title>.md
Page - System Context Guide.md
Page - Integration Patterns.md
```

**Daily Notes:**
```
YYYY-MM-DD.md
2026-01-07.md
```

**Location:** Daily notes go in `+Daily/YYYY/` folder

---

## Common Mistakes to Avoid

### ❌ Don't: Use `#` in frontmatter tags
```yaml
tags: [#activity/architecture]  # WRONG
```

### ✅ Do: Use plain hierarchical paths
```yaml
tags: [activity/architecture]   # CORRECT
```

---

### ❌ Don't: Omit relationship fields in ADRs
```yaml
# (missing relationships section)
```

### ✅ Do: Include all relationship fields (use empty arrays if needed)
```yaml
# Relationships
relatedTo: []
supersedes: []
dependsOn: []
```

---

### ❌ Don't: Use inconsistent date formats
```yaml
created: 07-01-2026        # WRONG
modified: Jan 7, 2026      # WRONG
```

### ✅ Do: Use ISO 8601 format
```yaml
created: 2026-01-07        # CORRECT
modified: 2026-01-07       # CORRECT
```

---

### ❌ Don't: Omit quality indicators for key content
```yaml
# (no quality indicators section)
```

### ✅ Do: Add quality indicators to ADRs, Pages, Projects
```yaml
# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-07
```

---

## Template Usage

Always use templates when creating new notes:

- **ADR:** `+Templates/ADR.md`
- **Project:** `+Templates/Project.md`
- **Meeting:** `+Templates/Meeting.md`
- **Person:** `+Templates/Person.md`
- **Page:** `+Templates/Page.md`

Templates ensure all required fields are present and properly formatted.

---

## Wiki-Link Conventions

### Internal Links
```markdown
[[Note Title]]                    # Basic link
[[Note Title|Display Text]]       # Link with custom text
[[Page - System Context Guide|Context Guide]]  # Shorter alias
```

### Links in Frontmatter
```yaml
project: "[[Project - MyProject]]"                   # Single link
relatedTo: ["[[ADR - Cloud Migration Strategy]]"]    # Array of links
```

**Always quote wiki-links in frontmatter YAML**

---

## Dataview Query Conventions

### Inline Queries (in MOCs/Dashboards)

**Correct format for inline JS:**
```markdown
`$= dv.pages("").where(p => p.type == "Task").length`
```

**Not:**
```markdown
`= dv.pages("").where(p => p.type = "Task").length`  # Single = is wrong
```

### Query Blocks

````markdown
```dataview
TABLE type, status, priority
FROM ""
WHERE type = "Project" AND status = "active"
SORT priority ASC
```
````

---

## Hierarchical Tag Usage Examples

### ADRs
```yaml
tags: [ADR, activity/architecture, technology/aws, project/my-project, domain/cloud]
```

### Projects
```yaml
tags: [Project, domain/data, domain/integration, technology/kafka]
```

### Pages
```yaml
tags: [context, technology/aws, domain/integration, domain/data]
```

### Meetings
```yaml
tags: [Meeting, project/my-project, domain/architecture]
```

---

## References

- Main documentation: [[CLAUDE.md]]
- Template directory: `+Templates/`
- Vault maintenance: [[Page - Vault Maintenance Guide]]
- Quality dashboard: [[MOC - Vault Quality Dashboard]]

---

**Version:** 1.0
**Maintained by:** Solutions Architecture Team
**Review Frequency:** Update as conventions evolve
