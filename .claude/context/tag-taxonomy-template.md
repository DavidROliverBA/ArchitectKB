# Tag Taxonomy Context

> **Template:** Populate this file with your vault's tag hierarchy.
> Load when: tagging notes -- hierarchical taxonomy, rules, required tags.

## Tag Rules

1. **Hierarchical**: Use `prefix/value` format (e.g. `domain/security`)
2. **Lowercase**: All tags must be lowercase in frontmatter
3. **No # prefix**: The `#` prefix is only for inline tags in note body, never in YAML
4. **Max 3 levels**: `prefix/category/subcategory` is the deepest

## Valid Hierarchies

| Prefix | Purpose | Examples |
| ------ | ------- | -------- |
| `activity/` | What you're doing | architecture, research, governance |
| `domain/` | Knowledge area | security, data, cloud, operations |
| `project/` | Project association | my-project, data-migration |
| `technology/` | Tech stack | aws, python, kafka, kubernetes |
| `type/` | Note subtype | adr, system, hld, lld |
| `status/` | Workflow state | draft, review, approved |
| `workstream/` | Project workstream | architecture, testing |

## Approved Flat Tags

These tags do not require a hierarchy prefix:

- `notion-import`
- `pdf-import`
- `moc`
- `daily`
- `automation`

## Minimum Tags by Note Type

| Type | Required Prefixes | Recommended |
| ---- | ---------------- | ----------- |
| ADR | `activity/` | `technology/`, `domain/` |
| Project | `project/` | `domain/` |
| System | `type/` | `domain/`, `technology/` |
| Concept | -- | `activity/`, `domain/` |

## Adding New Tags

Add new values to existing hierarchies freely. New prefixes should be discussed and documented here before use. The tag-taxonomy-enforcer hook validates tags against this taxonomy.
