# Quality Patterns

Patterns for maintaining note quality and relationships across the seven-pillar ontology.

## Quality Indicators

Add to ADRs, Concepts, Patterns, and Projects for content quality tracking:

```yaml
# Quality Indicators
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis | external
verified: true | false
reviewed: YYYY-MM-DD
keywords: []
summary: <one-line summary>
```

### Confidence Levels

| Level    | When to Use                                |
| -------- | ------------------------------------------ |
| `high`   | Authoritative, well-researched, definitive |
| `medium` | Good information but some uncertainty      |
| `low`    | Preliminary, needs verification            |

### Freshness Levels

| Level     | Timeframe                  |
| --------- | -------------------------- |
| `current` | Reviewed within 3 months   |
| `recent`  | Reviewed 3-12 months ago   |
| `stale`   | Not reviewed in >12 months |

### Source Types

| Type        | Meaning                              |
| ----------- | ------------------------------------ |
| `primary`   | Created by you, first-hand knowledge |
| `secondary` | Based on documentation, meetings     |
| `synthesis` | Compiled from multiple sources       |
| `external`  | From external references             |

## Relationship Fields

All content notes (Entities, Nodes, and Events) should include cross-pillar relationships:

```yaml
# Universal Relationships (all content notes)
nodeRelationships: [] # Links to knowledge (Concepts, Patterns, Capabilities, Themes)
entityRelationships: [] # Links to entities (People, Systems, Organisations)
```

### ADR-Specific Relationships

ADRs have additional relationship tracking:

```yaml
# ADR Relationships
relatedTo: ["[[Related Note]]"]
supersedes: ["[[Old ADR]]"]
dependsOn: ["[[Foundation ADR]]"]
contradicts: ["[[Conflicting ADR]]"]
```

### Guidelines

- **Always include all fields** - use empty arrays `[]` if none
- **nodeRelationships** - Concepts, Patterns, Themes this relates to
- **entityRelationships** - People, Systems, Organisations involved
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

- Move to `Archive/<Pillar>/` folder (Entities, Nodes, Events)
- Keep backlinks intact
- Update any active references

## Review Workflow

1. **Quarterly review** - Check `freshness` on important notes
2. **Update `reviewed` date** - When verifying content is current
3. **Downgrade `confidence`** - If information becomes uncertain
4. **Check relationships** - Ensure links are still valid

## Tag Taxonomy

**Official Taxonomy:** [[.claude/rules/tag-taxonomy.md]]

Use **mandatory hierarchical** tags for categorisation. All tags must follow the approved taxonomy structure.

### Tag Syntax

**In frontmatter (no `#` prefix):**

```yaml
tags:
  [
    activity/architecture,
    technology/aws,
    technology/bedrock,
    project/my-project,
    domain/cloud,
  ]
```

**Inline in note body (with `#` prefix):**

```yaml
This relates to #technology/aws and #project/my-project work.
```

Obsidian recognises both - the `#` is only needed when writing tags inline in the note body.

### Core Hierarchies

| Prefix         | Purpose         | Examples                                                       |
| -------------- | --------------- | -------------------------------------------------------------- |
| `activity/`    | Type of work    | architecture, research, implementation, evaluation, governance |
| `domain/`      | Business area   | engineering, data, cloud, security, integration                |
| `project/`     | Project scope   | (your project names)                                           |
| `technology/`  | Tech stack      | aws, kafka, kubernetes, bedrock, postgresql                    |
| `type/`        | Artifact type   | adr, system, diagram, hld, lld, concept, pattern               |
| `criticality/` | Importance      | critical, high, medium, low                                    |
| `status/`      | Lifecycle state | draft, approved, deprecated, archived                          |
| `vendor/`      | External vendor | (your vendor names)                                            |
| `audience/`    | Target audience | executive, architect, developer, operations                    |

### Tag Rules

1. **All lowercase** - Use `technology/aws` not `Technology/AWS`
2. **Hyphens for multi-word** - Use `project/cloud-migration` not `project/CloudMigration`
3. **No inline prefix in frontmatter** - Use `tags: [domain/data]` not `tags: [#domain/data]`
4. **2-3 levels maximum** - Keep flat: `domain/engineering` not `domain/engineering/systems/legacy`
5. **Hierarchical only** - No orphan flat tags (except approved special tags: `notion-import`, `pdf-import`, `moc`, `daily`, `video`, `automation`)

### Minimum Tags by Pillar

| Pillar/Type    | Recommended | Required Hierarchies                                                |
| -------------- | ----------- | ------------------------------------------------------------------- |
| **Entity**     |             |                                                                     |
| Systems        | 4-6 tags    | `type/system`, 1+ `domain/`, 1+ `technology/`, `criticality/`       |
| People         | 0-1 tags    | None required                                                       |
| Organisations  | 0-2 tags    | `vendor/` (if vendor)                                               |
| **Node**       |             |                                                                     |
| Concepts       | 3-5 tags    | 1+ `domain/`, `activity/` (optional)                                |
| Patterns       | 3-5 tags    | `type/pattern`, 1+ `domain/`, `activity/architecture`               |
| Themes         | 2-4 tags    | 1+ `domain/`                                                        |
| **Event**      |             |                                                                     |
| ADRs           | 4-7 tags    | `type/adr`, `activity/architecture`, 1+ `technology/`, 1+ `domain/` |
| Projects       | 3-5 tags    | Self-ref `project/`, 1+ `domain/`, `activity/`                      |
| Meetings       | 2-4 tags    | 1+ `project/` or `domain/`, `activity/` (optional)                  |
| Tasks          | 1-3 tags    | 1+ `project/` or `domain/`                                          |
| Daily Notes    | 0-2 tags    | `daily` (auto), `project/` (if focused)                             |
| Incubator      | 2-4 tags    | `activity/research`, 1+ `domain/`                                   |
| **View**       |             |                                                                     |
| Dashboards     | 1-3 tags    | 1+ `domain/` (optional)                                             |
| Queries        | 1-2 tags    | 1+ `domain/` (optional)                                             |
| **Governance** |             |                                                                     |
| Policies       | 2-4 tags    | `type/policy`, 1+ `domain/`                                         |
| Guardrails     | 3-5 tags    | `type/guardrail`, 1+ `domain/`, 1+ `technology/`                    |

See [[.claude/rules/tag-taxonomy.md]] for complete tag reference, combination patterns, and migration rules.

## Quality by Pillar

### Entity Quality

Entities represent things that exist. Quality focus:

- **Accuracy** - Is the information about this entity correct?
- **Completeness** - Are all relevant fields populated?
- **Currency** - Is the entity still active/relevant?

```yaml
# Quality fields for Entities (especially Systems)
confidence: high | medium | low
freshness: current | recent | stale
verified: false
reviewed: null
```

### Node Quality

Nodes represent knowledge. Quality focus:

- **Accuracy** - Is this knowledge correct?
- **Usefulness** - Does this help with real problems?
- **Connections** - Is it linked to relevant entities and events?

```yaml
# Quality fields for Nodes (Concepts, Patterns, etc.)
confidence: high | medium | low
freshness: current | recent | stale
source: primary | secondary | synthesis | external
verified: false
reviewed: null
summary: null # One-line summary
keywords: [] # Searchable terms
```

### Event Quality

Events represent things that happen. Quality focus:

- **Completeness** - Are decisions and outcomes captured?
- **Actionability** - Are next steps clear?
- **Traceability** - Can you trace the decision trail?

```yaml
# Quality fields for Events (especially ADRs, Projects)
confidence: high | medium | low
freshness: current | recent | stale
verified: false
reviewed: null
summary: null
```

## Cross-Pillar Patterns

### Knowledge Graph Connections

Good knowledge management creates rich connections:

1. **Events reference Nodes** - Meetings discuss Concepts, Projects apply Patterns
2. **Events involve Entities** - Projects have People, ADRs affect Systems
3. **Nodes explain Entities** - Concepts describe how Systems work
4. **Entities implement Nodes** - Systems implement Patterns

### Example: Well-Connected ADR

```yaml
type: ADR
pillar: event
title: Adopt Event-Driven Architecture

# Event-to-Node relationships
nodeRelationships:
  - "[[Pattern - Event-Driven Architecture]]"
  - "[[Concept - Message Queues]]"

# Event-to-Entity relationships
entityRelationships:
  - "[[System - Sample API Gateway]]"
  - "[[System - Sample Data Platform]]"
  - "[[Person - Jane Smith]]"

# ADR-specific relationships
relatedTo:
  - "[[ADR - Standardize on PostgreSQL]]"
dependsOn:
  - "[[ADR - Use Kubernetes for Container Orchestration]]"
```

## References

- [[CLAUDE.md]] - Main vault guide
- [[.claude/vault-conventions.md]] - Frontmatter and general conventions
- [[.claude/rules/tag-taxonomy.md]] - Complete tag taxonomy
- [[.claude/rules/frontmatter-reference.md]] - Full frontmatter schemas by pillar
