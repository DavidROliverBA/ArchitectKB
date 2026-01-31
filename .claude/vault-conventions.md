# Vault Conventions Guide

**Purpose:** Document small but important conventions and best practices for working with this Obsidian vault. This guide helps Claude Code and other tools follow the correct patterns.

**Last Updated:** 2026-01-31

---

## Seven-Pillar Ontology

All content is organised into seven pillars:

| Pillar         | Nature             | Location          | Purpose                          |
| -------------- | ------------------ | ----------------- | -------------------------------- |
| **Entities**   | Things that exist  | Root              | Actors and objects in the world  |
| **Nodes**      | Units of knowledge | Root              | Understanding that persists      |
| **Events**     | Things that happen | Folders           | Temporal occurrences             |
| **Views**      | Aggregated data    | Root              | Reports and dashboards into data |
| **Artifacts**  | External resources | `Attachments/`    | Reference materials collected    |
| **Governance** | Rules & standards  | `Sync/`           | Policies and guardrails          |
| **Navigation** | Finding aids       | Root (`_` prefix) | Help locate content              |

**Core Principle:** _Events happen TO entities and ABOUT nodes. Views aggregate data. Governance constrains decisions. Artifacts provide reference._

---

## Frontmatter YAML Conventions

### Universal Fields

All notes must include these fields:

```yaml
type: <Type> # Required - identifies note type
pillar: <pillar> # Required - entity | node | event | view | governance | navigation
title: <Title> # Required
created: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [] # Hierarchical tags
```

### Relationship Fields

All content notes (not Navigation) should include:

```yaml
nodeRelationships: [] # Links to knowledge nodes
  # - "[[Concept - Data Quality]]"
  # - "[[Pattern - Event-Driven Architecture]]"

entityRelationships: [] # Links to entities
  # - "[[Person - Jane Smith]]"
  # - "[[System - Sample ERP]]"
```

### Tags Format

**❌ INCORRECT - Don't use `#` prefix in frontmatter:**

```yaml
tags: [#activity/architecture, #technology/aws]
```

**❌ INCORRECT - No flat tags (except approved special tags):**

```yaml
tags: [ADR, aws, architecture]
```

**❌ INCORRECT - No uppercase or mixed case:**

```yaml
tags: [activity/Architecture, Technology/AWS]
```

**✅ CORRECT - Hierarchical, lowercase, no # prefix:**

```yaml
tags:
  [
    type/adr,
    activity/architecture,
    technology/aws,
    project/my-project,
    domain/cloud,
  ]
```

**Explanation:**

- In frontmatter YAML, tags are plain strings without the `#` prefix
- The `#` prefix is only used when writing inline tags in the body of notes (e.g., `#technology/aws`)
- All tags must be hierarchical with approved prefixes (no orphan flat tags)
- All lowercase, use hyphens for multi-word: `project/cloud-migration` not `Project/CloudMigration`

### Tag Taxonomy

**Official taxonomy:** [[.claude/rules/tag-taxonomy.md]]

Use **mandatory hierarchical** tag structures:

```yaml
tags: [
    activity/architecture, # What kind of work
    technology/aws, # Technologies involved
    technology/kafka, # Multiple techs OK
    project/my-project, # Which project
    domain/cloud, # Business domain
    domain/security, # Multiple domains OK
    type/adr, # Optional artifact type
  ]
```

**Core Hierarchical Prefixes (Mandatory):**

| Prefix         | Purpose          | Examples                                                                |
| -------------- | ---------------- | ----------------------------------------------------------------------- |
| `activity/`    | Type of work     | `activity/architecture`, `activity/research`, `activity/implementation` |
| `domain/`      | Business area    | `domain/engineering`, `domain/data`, `domain/cloud`, `domain/security`  |
| `project/`     | Specific project | `project/cloud-migration`, `project/data-platform`                      |
| `technology/`  | Tech stack       | `technology/aws`, `technology/kafka`, `technology/postgresql`           |
| `type/`        | Artifact type    | `type/adr`, `type/system`, `type/diagram`, `type/hld`                   |
| `criticality/` | Importance       | `criticality/critical`, `criticality/high`, `criticality/medium`        |
| `status/`      | Lifecycle state  | `status/draft`, `status/approved`, `status/deprecated`                  |
| `vendor/`      | External vendor  | `vendor/microsoft`, `vendor/aws`                                        |
| `audience/`    | Target audience  | `audience/executive`, `audience/architect`, `audience/developer`        |

**Approved Special Tags (Flat, No Hierarchy):**

- `notion-import` - Auto-applied by import script
- `pdf-import` - Auto-applied by `/pdf-to-page`
- `moc` - Map of Content navigation hubs
- `daily` - Auto-applied to daily notes
- `video` - YouTube or video content
- `automation` - Scripts, workflows, hooks

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

All ADRs, Concepts, Patterns, and Projects should include quality indicators:

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
# ADR Relationships
relatedTo: ["[[Related ADR]]", "[[Related Project]]"]
supersedes: ["[[Old ADR]]"]
dependsOn: ["[[Foundation ADR]]"]
contradicts: []
```

**Guidelines:**

- Use empty arrays `[]` if no relationships (don't omit the field)
- `relatedTo` - Related decisions, projects, or context
- `supersedes` - ADRs that this decision replaces
- `dependsOn` - ADRs that must exist before this one
- `contradicts` - Known conflicts (rare, document resolution in body)

---

## File Naming Conventions

### General Rules

- Use Title Case for names
- Separate words with spaces (not hyphens or underscores)
- Use prefixes to indicate note type and pillar

### Patterns by Pillar

**Entities (Root):**

```
Person - <Name>.md              # Person - Jane Smith.md
System - <Name>.md              # System - Sample ERP.md
Organisation - <Name>.md        # Organisation - Your Company.md
DataAsset - <Name>.md           # DataAsset - Customer Orders.md
Location - <Name>.md            # Location - Main Office.md
```

**Nodes (Root):**

```
Concept - <Title>.md            # Concept - Data Quality.md
Pattern - <Title>.md            # Pattern - Event-Driven Architecture.md
Capability - <Title>.md         # Capability - Real-time Integration.md
Theme - <Title>.md              # Theme - Technical Debt.md
Weblink - <Title>.md            # Weblink - AWS Well-Architected.md
```

**Events (Folders):**

```
Meeting - YYYY-MM-DD <Title>.md     # Meetings/YYYY/Meeting - 2026-01-06 Sprint.md
Project - <Name>.md                 # Projects/Project - Cloud Migration.md
Task - <Title>.md                   # Tasks/Task - Review ADR draft.md
ADR - <Title>.md                    # ADRs/ADR - API Gateway Selection.md
Daily - YYYY-MM-DD.md               # Daily/YYYY/Daily - 2026-01-07.md
```

**Views (Root):**

```
Dashboard - <Scope>.md          # Dashboard - Main Dashboard.md
Query - <Title>.md              # Query - Critical Systems.md
ArchModel - <Title>.md          # ArchModel - Data Flow.md
```

**Navigation (Root, sorted first):**

```
_MOC - <Scope>.md               # _MOC - Projects.md
```

---

## Common Mistakes to Avoid

### ❌ Don't: Use `#` in frontmatter tags

```yaml
tags: [#activity/architecture]  # WRONG
```

### ✅ Do: Use plain hierarchical paths

```yaml
tags: [activity/architecture] # CORRECT
```

---

### ❌ Don't: Omit pillar field

```yaml
type: Person
# (missing pillar field)
```

### ✅ Do: Include pillar field

```yaml
type: Person
pillar: entity
```

---

### ❌ Don't: Omit relationship fields in content notes

```yaml
# (missing relationships section)
```

### ✅ Do: Include relationship fields (use empty arrays if needed)

```yaml
nodeRelationships: []
entityRelationships: []
```

---

### ❌ Don't: Use inconsistent date formats

```yaml
created: 07-01-2026 # WRONG
modified: Jan 7, 2026 # WRONG
```

### ✅ Do: Use ISO 8601 format

```yaml
created: 2026-01-07 # CORRECT
modified: 2026-01-07 # CORRECT
```

---

### ❌ Don't: Omit quality indicators for key content

```yaml
# (no quality indicators section)
```

### ✅ Do: Add quality indicators to ADRs, Concepts, Patterns, Projects

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

- **Entities:** `Templates/Person.md`, `Templates/System.md`, `Templates/Organisation.md`
- **Nodes:** `Templates/Concept.md`, `Templates/Pattern.md`, `Templates/Weblink.md`
- **Events:** `Templates/Meeting.md`, `Templates/Project.md`, `Templates/ADR.md`, `Templates/Task.md`
- **Views:** `Templates/Dashboard.md`, `Templates/Query.md`

Templates ensure all required fields are present and properly formatted.

---

## Wiki-Link Conventions

### Internal Links

```markdown
[[Note Title]] # Basic link
[[Note Title|Display Text]] # Link with custom text
[[Concept - Data Quality|Data Quality]] # Shorter alias
```

### Links in Frontmatter

```yaml
project: "[[Project - MyProject]]" # Single link
relatedTo: ["[[ADR - Cloud Migration Strategy]]"] # Array of links
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
`= dv.pages("").where(p => p.type = "Task").length` # Single = is wrong
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

## Hierarchical Tag Usage Examples by Pillar

### Entities

**Systems:**

```yaml
tags:
  [
    type/system,
    domain/engineering,
    technology/postgresql,
    criticality/critical,
    vendor/aws,
  ]
```

**Organisations:**

```yaml
tags: [vendor/microsoft]
```

### Nodes

**Concepts:**

```yaml
tags: [domain/data, domain/integration, activity/documentation]
```

**Patterns:**

```yaml
tags: [type/pattern, activity/architecture, domain/cloud, technology/aws]
```

### Events

**ADRs:**

```yaml
tags:
  [
    type/adr,
    activity/architecture,
    technology/aws,
    project/my-project,
    domain/cloud,
  ]
```

**Projects:**

```yaml
tags:
  [project/cloud-migration, domain/data, domain/integration, activity/delivery]
```

**Meetings:**

```yaml
tags: [project/my-project, domain/architecture, activity/planning]
```

### Views

**Dashboards:**

```yaml
tags: [domain/data, moc]
```

---

## References

- Main documentation: [[CLAUDE.md]]
- Template directory: `Templates/`
- Frontmatter schemas: [[.claude/rules/frontmatter-reference.md]]
- Naming conventions: [[.claude/rules/naming-conventions.md]]
- Tag taxonomy: [[.claude/rules/tag-taxonomy.md]]
- Quality patterns: [[.claude/rules/quality-patterns.md]]

---

**Version:** 2.0
**Maintained by:** Solutions Architecture Community
**Review Frequency:** Update as conventions evolve
