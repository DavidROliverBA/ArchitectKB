---
type: Incubator
title: Hybrid Graph Index System
status: exploring
domain:
  - architecture
  - tooling
  - data
outcome: null
created: 2026-01-12
modified: 2026-01-12
tags:
  - incubator/idea
---

# Hybrid Graph Index System

## Problem Statement

The current `generate-graph.js` script exports a single JSON file optimised for visualisation, but this approach has several limitations for AI-assisted workflows:

1. **No pre-computed indexes** - Every query requires parsing the entire graph structure. There are no fast O(1) lookups by type, status, priority, or other common attributes.

2. **No relationship indexes** - Backlinks, forward links, and relationship traversal require full graph scans. Questions like "what depends on this ADR?" need expensive computation.

3. **No file watcher** - The graph must be manually regenerated after changes. There is no automatic update mechanism to keep indexes fresh as notes are edited.

4. **Limited query support** - Claude Code cannot efficiently answer structured queries without loading and parsing the entire graph file each time.

5. **No search capability** - Full-text search, keyword matching, and content discovery require external tools or exhaustive file reads.

## Context

The template vault already has substantial automation infrastructure:

| Script | Lines | Purpose |
|--------|-------|---------|
| `generate-graph.js` | ~520 | Knowledge graph export to JSON |
| `health-check.js` | ~695 | Vault health metrics and scoring |
| `validate.js` | ~400+ | Frontmatter and link validation |

**Existing dependencies:**
- `chalk` - Terminal styling
- `glob` - File pattern matching
- `gray-matter` - YAML frontmatter parsing

This incubator idea proposes extending (not replacing) the existing infrastructure to add indexed query capabilities.

## Initial Thoughts

### Design Principles

1. **Extend, don't replace** - Build on existing `generate-graph.js` rather than rewriting. The visualisation export remains valuable.

2. **Pre-compute common queries** - Generate indexes at build time for type clusters, status groups, tag hierarchies, and relationship maps.

3. **File watching with debouncing** - Detect changes and regenerate affected indexes automatically, with configurable debounce intervals to batch rapid edits.

4. **Simple search** - Implement keyword-based search using pre-built indexes. Avoid heavy NLP dependencies.

5. **Claude Code integration** - Provide a `/graph-query` skill that uses the indexes for fast, structured responses.

### Index Types Proposed

| Index | Purpose | Structure |
|-------|---------|-----------|
| `types.json` | Notes grouped by type | `{ "Project": ["id1", "id2"], "ADR": [...] }` |
| `status.json` | Notes grouped by status | `{ "active": [...], "completed": [...] }` |
| `backlinks.json` | Reverse link lookup | `{ "noteId": ["linking-note-1", ...] }` |
| `relationships.json` | ADR relationships | `{ "noteId": { "dependsOn": [], "supersedes": [] } }` |
| `search.json` | Keyword index | `{ "keyword": ["noteId1", "noteId2"] }` |
| `tags.json` | Notes by tag | `{ "domain/cloud": [...], "technology/aws": [...] }` |

## Architecture Overview

```
.graph/
├── graph.json              # Full graph (existing format)
├── indexes/
│   ├── types.json          # Notes by type (O(1) lookup)
│   ├── status.json         # Notes by status
│   ├── backlinks.json      # Reverse link index
│   ├── relationships.json  # ADR relationships
│   ├── search.json         # Keyword search index
│   └── tags.json           # Notes by tag
├── cache/
│   └── file-hashes.json    # File change detection
└── meta.json               # Generation metadata

scripts/
├── generate-graph.js       # Existing (unchanged)
├── generate-graph-enhanced.js  # New: builds indexes
├── graph-watcher.js        # New: file change detection
└── graph-query.js          # New: CLI query interface

.claude/skills/
└── graph-query.md          # Claude Code skill
```

### Data Flow

```
┌─────────────┐    Watch    ┌──────────────┐
│  Markdown   │ ─────────▶  │ graph-watcher│
│   Files     │             │    .js       │
└─────────────┘             └──────┬───────┘
                                   │
                                   │ Trigger (debounced)
                                   ▼
                          ┌──────────────────┐
                          │ generate-graph-  │
                          │ enhanced.js      │
                          └────────┬─────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│ graph.json  │          │  indexes/   │          │   meta.json │
│ (full graph)│          │  *.json     │          │ (timestamps)│
└─────────────┘          └─────────────┘          └─────────────┘
         │                         │
         └─────────────┬───────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ graph-query.js  │
              │  (CLI tool)     │
              └────────┬────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
┌─────────────────┐        ┌─────────────────┐
│ Structured      │        │ Natural Language│
│ Queries         │        │ Queries (Claude)│
│ type:Project    │        │ "find active    │
│ status:active   │        │  projects"      │
└─────────────────┘        └─────────────────┘
```

## Questions to Answer

### Search Index Scope
Should the search index include full content or just titles/summaries?
- **Full content**: More comprehensive but larger index, slower generation
- **Titles/summaries only**: Fast but may miss content matches
- **Hybrid**: Index titles + first 500 chars + keywords from tags

### Debounce Interval
What is the optimal debounce interval for the file watcher?
- Too short (100ms): Excessive regeneration during rapid typing
- Too long (10s): Stale indexes for quick queries
- **Proposed**: 2-3 seconds, configurable via environment variable

### Large Vault Performance
How to handle vaults with 5000+ notes?
- Incremental updates (only regenerate changed portions)
- Lazy index loading (load indexes on demand)
- Index sharding by type or folder

### Integration with Existing Tools
How should this integrate with `health-check.js`?
- Share parsed note data to avoid duplicate file reads
- Health check could consume graph indexes for faster metrics
- Consider extracting shared parsing module

## Proposed NPM Scripts

```json
{
  "scripts": {
    "graph:build": "node scripts/generate-graph-enhanced.js",
    "graph:watch": "node scripts/graph-watcher.js",
    "graph:query": "node scripts/graph-query.js",
    "graph:clean": "rm -rf .graph"
  }
}
```

## Query Examples

### Structured Queries
```bash
# Find all active projects
npm run graph:query -- "type:Project status:active"

# Find ADRs that depend on a specific decision
npm run graph:query -- "dependsOn:ADR-001"

# Find notes with specific tag
npm run graph:query -- "tag:domain/cloud"

# Find orphaned notes
npm run graph:query -- "backlinks:0"
```

### Natural Language (via Claude Code)
```
/graph-query "What projects are currently active?"
/graph-query "Show me all ADRs about API design"
/graph-query "Find notes related to AWS that were modified this week"
```

## Success Criteria

1. **Query performance** - O(1) lookups for type, status, tag queries
2. **Index freshness** - Automatic update within 5 seconds of file change
3. **Claude integration** - Working `/graph-query` skill with useful responses
4. **Backward compatibility** - Existing `npm run graph` command unchanged
5. **Documentation** - Updated AUTOMATION.md with usage instructions

## Related

- [[scripts/AUTOMATION.md]] - Existing automation documentation
- [[Page - generate-graph.js Documentation]] - Current graph generation
- [[Incubator - Context File Architecture]] - Related context management work
