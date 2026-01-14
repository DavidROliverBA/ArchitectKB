# Quality Patterns

Patterns for maintaining note quality and relationships.

## Quality Indicators

Add to ADRs, Pages, and Projects for content quality tracking:

```yaml
# Quality Indicators
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis
verified: true | false
reviewed: YYYY-MM-DD
keywords: []
summary: <one-line summary>
```

### Confidence Levels

| Level | When to Use |
|-------|-------------|
| `high` | Authoritative, well-researched, definitive |
| `medium` | Good information but some uncertainty |
| `low` | Preliminary, needs verification |

### Freshness Levels

| Level | Timeframe |
|-------|-----------|
| `current` | Reviewed within 3 months |
| `recent` | Reviewed 3-12 months ago |
| `stale` | Not reviewed in >12 months |

### Source Types

| Type | Meaning |
|------|---------|
| `primary` | Created by you, first-hand knowledge |
| `secondary` | Based on documentation, meetings |
| `synthesis` | Compiled from multiple sources |
| `external` | From external references |

## Relationship Fields

Track connections between notes (especially ADRs):

```yaml
# Relationships
relatedTo: ["[[Related Note]]"]
supersedes: ["[[Old ADR]]"]
dependsOn: ["[[Foundation ADR]]"]
contradicts: ["[[Conflicting ADR]]"]
```

### Guidelines

- **Always include all fields** - use empty arrays `[]` if none
- **relatedTo** - General related content (projects, other ADRs, context)
- **supersedes** - Decisions this one replaces (marks old as deprecated)
- **dependsOn** - Required foundation decisions
- **contradicts** - Known conflicts (document resolution in body)

## Archiving Pattern

When archiving notes:

```yaml
archived: true
archivedDate: 2026-01-10
archivedReason: "Project completed"
```

- Move to `+Archive/<Type>s/` folder
- Keep backlinks intact
- Update any active references

## Review Workflow

1. **Quarterly review** - Check `freshness` on important notes
2. **Update `reviewed` date** - When verifying content is current
3. **Downgrade `confidence`** - If information becomes uncertain
4. **Check relationships** - Ensure links are still valid

## Tag Taxonomy

Use hierarchical tags for categorisation.

### Tag Syntax

**In frontmatter (no `#` prefix):**
```yaml
tags: [activity/architecture, technology/aws, project/caerus]
```

**Inline in note body (with `#` prefix):**
```markdown
This relates to #technology/aws 
```

Obsidian recognises both - the `#` is only needed when writing tags inline in the note body.

### Prefixes

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `activity/` | Type of work | architecture, implementation, evaluation |
| `technology/` | Technologies | aws, sap, kafka, bedrock |
| `project/` | Project scope |  |
| `domain/` | Business domain | aviation, data, integration, security |
