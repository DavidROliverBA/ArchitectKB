# Naming Conventions

File and folder naming patterns based on the vault ontology. See [[Concept - Vault Ontology]] for the full model.

## The Seven Pillars

All content is organised into seven pillars:

| Pillar         | Nature             | Location          | Prefix Pattern          |
| -------------- | ------------------ | ----------------- | ----------------------- |
| **Entities**   | Things that exist  | Root              | `[Type] - [Name]`       |
| **Nodes**      | Units of knowledge | Root              | `[Type] - [Title]`      |
| **Events**     | Things that happen | Folders           | `[Type] - [Title/Date]` |
| **Views**      | Aggregated data    | Root              | `[Type] - [Scope]`      |
| **Artifacts**  | External resources | `Attachments/`    | N/A (files)             |
| **Governance** | Rules & standards  | `Sync/`           | `[Type] - [Title]`      |
| **Navigation** | Finding aids       | Root (`_` prefix) | `_[Type] - [Scope]`     |

## Entity Types (Root)

Things that exist independently.

| Type         | Pattern                      | Example                          |
| ------------ | ---------------------------- | -------------------------------- |
| Person       | `Person - {{Name}}.md`       | `Person - Jane Smith.md`         |
| System       | `System - {{Name}}.md`       | `System - Sample ERP.md`         |
| Organisation | `Organisation - {{Name}}.md` | `Organisation - Your Company.md` |
| DataAsset    | `DataAsset - {{Name}}.md`    | `DataAsset - Customer Orders.md` |
| Location     | `Location - {{Name}}.md`     | `Location - Main Office.md`      |

## Node Types (Root)

Units of knowledge that persist.

| Type       | Pattern                     | Example                                  |
| ---------- | --------------------------- | ---------------------------------------- |
| Concept    | `Concept - {{Title}}.md`    | `Concept - Data Quality.md`              |
| Pattern    | `Pattern - {{Title}}.md`    | `Pattern - Event-Driven Architecture.md` |
| Capability | `Capability - {{Title}}.md` | `Capability - Real-time Integration.md`  |
| Theme      | `Theme - {{Title}}.md`      | `Theme - Technical Debt.md`              |
| Weblink    | `Weblink - {{Title}}.md`    | `Weblink - AWS Well-Architected.md`      |

## Event Types (Folders)

Things that happen.

| Type           | Pattern                                        | Location         |
| -------------- | ---------------------------------------------- | ---------------- |
| Meeting        | `Meeting - YYYY-MM-DD {{Title}}.md`            | `Meetings/YYYY/` |
| Project        | `Project - {{Name}}.md`                        | `Projects/`      |
| Workstream     | `Workstream - {{Name}}.md`                     | `Projects/`      |
| Forum          | `Forum - {{Name}}.md`                          | `Projects/`      |
| Task           | `Task - {{Title}}.md`                          | `Tasks/`         |
| ADR            | `ADR - {{Title}}.md`                           | `ADRs/`          |
| Email          | `Email - {{From/To}} - {{Subject}}.md`         | `Emails/`        |
| Trip           | `Trip - {{Destination}}.md`                    | `Trips/`         |
| Daily          | `Daily - YYYY-MM-DD.md`                        | `Daily/YYYY/`    |
| Incubator      | `Incubator - {{Title}}.md`                     | `Incubator/`     |
| FormSubmission | `FormSubmission - {{Type}} for {{Project}}.md` | `Forms/`         |

## View Types (Root)

Aggregated data and reports.

| Type      | Pattern                    | Example                         |
| --------- | -------------------------- | ------------------------------- |
| Dashboard | `Dashboard - {{Scope}}.md` | `Dashboard - Main Dashboard.md` |
| Query     | `Query - {{Title}}.md`     | `Query - Critical Systems.md`   |
| ArchModel | `ArchModel - {{Title}}.md` | `ArchModel - Data Flow.md`      |

## Governance Types (Sync/)

Rules and standards, typically synced from external sources.

| Type      | Pattern                    | Location           |
| --------- | -------------------------- | ------------------ |
| Policy    | `Policy - {{Title}}.md`    | `Sync/Policies/`   |
| Guardrail | `Guardrail - {{Title}}.md` | `Sync/Guardrails/` |
| Org-ADR   | `ADR - {{Title}}.md`       | `Sync/Org-ADRs/`   |

## Navigation Types (Root, Sorted First)

Aids for finding content. Use `_` prefix to sort to top.

| Type | Pattern               | Example              |
| ---- | --------------------- | -------------------- |
| MOC  | `_MOC - {{Scope}}.md` | `_MOC - Projects.md` |

## Folder Structure

```
ArchitectKB/
│
├── Meetings/                    # Events
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
├── Projects/                    # Events (includes Workstreams, Forums)
├── Tasks/                       # Events
├── ADRs/                        # Events
├── Emails/                      # Events
├── Trips/                       # Events
├── Daily/                       # Events
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
├── Incubator/                   # Events (research that spawns nodes)
├── Forms/                       # Events (governance submissions)
│
├── Attachments/                 # Artifacts (media, PDFs, images)
├── Archive/                     # Archived content
│   ├── Entities/
│   ├── Nodes/
│   └── Events/
├── Templates/                   # Note templates
├── Sync/                        # Governance (synced content)
│   ├── Policies/
│   ├── Guardrails/
│   └── Org-ADRs/
│
├── .claude/                     # Claude Code configuration
├── .graph/                      # Graph indexes
├── .obsidian/                   # Obsidian configuration
│
├── Person - *.md                # Entities (root)
├── System - *.md                # Entities (root)
├── Organisation - *.md          # Entities (root)
├── DataAsset - *.md             # Entities (root)
├── Location - *.md              # Entities (root)
│
├── Concept - *.md               # Nodes (root)
├── Pattern - *.md               # Nodes (root)
├── Capability - *.md            # Nodes (root)
├── Theme - *.md                 # Nodes (root)
├── Weblink - *.md               # Nodes (root)
│
├── Dashboard - *.md             # Views (root)
├── Query - *.md                 # Views (root)
├── ArchModel - *.md             # Views (root)
│
└── _MOC - *.md                  # Navigation (sorted first)
```

## General Rules

1. **Use Title Case** for names and titles
2. **Separate words with spaces** (not hyphens or underscores in titles)
3. **All types use prefix** - The prefix identifies the pillar
4. **No special characters** except hyphens in date portions
5. **`_` prefix for navigation** - Sorts MOCs to top

## Date Formats

- **Filenames:** `YYYY-MM-DD` (e.g., `2026-01-30`)
- **Frontmatter:** `YYYY-MM-DD` (e.g., `created: 2026-01-30`)
- **Meeting/Daily:** Include date in filename (e.g., `Meeting - 2026-01-30 Sprint Planning.md`)

## Wiki-Link Patterns

All notes now have type prefixes:

```markdown
[[Person - Jane Smith]] # Entity
[[System - Sample ERP]] # Entity
[[Concept - Data Quality]] # Node
[[Project - Cloud Migration]] # Event
[[_MOC - Projects]] # Navigation
```

Use aliases in frontmatter for shorter links:

```yaml
aliases: [Jane Smith, Jane]
```

Then `[[Jane Smith]]` resolves to `Person - Jane Smith.md`.

## Identifying Pillars by Prefix

| Prefix                                                                                                              | Pillar     |
| ------------------------------------------------------------------------------------------------------------------- | ---------- |
| `Person`, `System`, `Organisation`, `DataAsset`, `Location`                                                         | Entity     |
| `Concept`, `Pattern`, `Capability`, `Theme`, `Weblink`                                                              | Node       |
| `Meeting`, `Project`, `Task`, `ADR`, `Email`, `Trip`, `Daily`, `Incubator`, `Workstream`, `Forum`, `FormSubmission` | Event      |
| `Dashboard`, `Query`, `ArchModel`                                                                                   | View       |
| `Policy`, `Guardrail`                                                                                               | Governance |
| `_MOC`                                                                                                              | Navigation |

## Migration Notes

### Renamed Types

| Old                     | New                                                            |
| ----------------------- | -------------------------------------------------------------- |
| `Page - `               | `Concept - ` / `Pattern - ` / `Theme - ` (classify by content) |
| `Node - `               | `Workstream - ` / appropriate event or node type               |
| `DailyNote` (no prefix) | `Daily - YYYY-MM-DD`                                           |
| Person (no prefix)      | `Person - {{Name}}`                                            |

### Folder Changes

| Old             | New                        |
| --------------- | -------------------------- |
| `+Meetings/`    | `Meetings/`                |
| `+Daily/`       | `Daily/`                   |
| `+Attachments/` | `Attachments/`             |
| `+People/`      | Removed (Entities in root) |
| `+Projects/`    | `Projects/`                |
| `+Archive/`     | `Archive/`                 |
| `+Templates/`   | `Templates/`               |
| `+Incubator/`   | `Incubator/`               |
| `+Inbox/`       | `Inbox/`                   |
| `+Sync/`        | `Sync/`                    |

### What Stays the Same

- `System - ` prefix
- `Organisation - ` prefix
- `DataAsset - ` prefix
- `Weblink - ` prefix
- `ADR - ` prefix
- `Meeting - ` prefix
