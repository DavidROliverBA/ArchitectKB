---
type: Page
title: Search and Discovery Guide
created: 2026-01-28
modified: 2026-01-28
tags:
  - activity/documentation
  - domain/tooling
  - audience/architect

# Quality Indicators
summary: Comprehensive guide to search strategies, SQLite FTS5, graph queries, and discovery skills
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-28

# Semantic Discovery
keywords:
  - search
  - fts5
  - sqlite
  - graph-query
  - discovery
  - backlinks

# Relationships
relatedTo:
  - "[[Page - Claude Code Skills Quick Reference]]"
  - "[[Page - Daily Workflow Guide]]"
  - "[[Dashboard - Main Dashboard]]"
---

# Search and Discovery Guide

This guide covers all search capabilities in ArchitectKB, from fast SQLite queries to graph-based discovery. Learn when to use each tool and how to find information efficiently.

---

## Search Strategy Overview

ArchitectKB has multiple search mechanisms, each optimised for different use cases:

| Tool               | Speed   | Best For                              | Index Required   |
| ------------------ | ------- | ------------------------------------- | ---------------- |
| `/q` (SQLite FTS5) | ~0.01s  | Full-text search, type filters        | `.data/vault.db` |
| `/graph-query`     | ~0.1s   | Structured queries, relationships     | `.graph/`        |
| `/search`          | ~0.1-2s | Smart search (tries graph, then grep) | Optional         |
| `/related`         | ~2-5s   | Topic discovery (uses sub-agents)     | None             |
| Grep               | ~2-5s   | Regex patterns, code blocks           | None             |
| Glob               | ~1s     | Filename patterns                     | None             |

### Search Priority

**Use this order for best results:**

1. **SQLite FTS5 first** - Fastest for text search
2. **Graph query second** - For structured filtering
3. **Skills third** - For complex discovery
4. **Grep last** - Only for regex or content not in indexes

---

## SQLite FTS5 Search (`/q`)

The fastest search method, ~1000x faster than grep.

### Prerequisites

Build the SQLite index first:

```bash
npm run vault:index
```

This creates `.data/vault.db` with:

- All notes indexed
- Full-text search with Porter stemming
- Wiki-links extracted
- Tags normalised

### Basic Search

```
/q <search terms>
```

**Examples:**

```
/q architecture patterns        # Find notes about architecture patterns
/q "event driven"              # Exact phrase search
/q kafka integration           # Multiple terms (AND logic)
/q architect*                  # Wildcard search
```

### Type Filters

Search within specific note types:

```
/q type:Adr                    # All ADRs
/q type:Project                # All Projects
/q type:Task                   # All Tasks
/q type:System                 # All Systems
/q type:Meeting                # All Meetings
```

**Combined with search:**

```
/q type:Adr kafka              # ADRs mentioning kafka
/q type:Project status:active  # Active projects
/q type:Task priority:high     # High priority tasks
```

### Status and Priority Filters

```
/q status:proposed             # Notes with proposed status
/q status:active               # Active notes
/q status:draft                # Draft notes
/q priority:high               # High priority notes
/q completed:false             # Incomplete tasks
```

### Tag Search

Search by hierarchical tags:

```
/q tag:technology/aws          # Notes tagged with AWS
/q tag:project/cloud-migration # Notes for specific project
/q tag:domain/data             # Notes in data domain
/q tag:activity/architecture   # Architecture activities
```

### Recent Notes

Find recently modified notes:

```
/q recent                      # Modified in last 7 days
/q recent:30                   # Modified in last 30 days
/q recent:1                    # Modified today
```

### Backlinks

Find notes that link TO a specific note:

```
/q backlinks:"Project - Cloud Migration"
/q backlinks:"System - Customer Portal"
/q backlinks:"ADR - API Gateway"
```

### Orphans

Find notes with no incoming links:

```
/q orphans
```

### Complex Queries

Combine multiple filters:

```
/q type:Adr status:proposed technology/aws
/q type:Task priority:high completed:false
/q type:Meeting recent:7 tag:project/cloud-migration
```

### Raw SQL Access

For advanced queries, use SQLite directly:

```bash
# Full-text search with snippets
sqlite3 .data/vault.db -markdown "
SELECT n.path, snippet(fts_content,1,'→','←','...',40) as match
FROM fts_content
JOIN notes n ON fts_content.rowid = n.id
WHERE fts_content MATCH 'architecture'
ORDER BY rank
LIMIT 10
"

# Notes by type with status
sqlite3 .data/vault.db -markdown "
SELECT path, title, status, priority
FROM notes
WHERE type = 'Adr'
ORDER BY modified DESC
LIMIT 20
"

# Tag analysis
sqlite3 .data/vault.db -markdown "
SELECT tag, COUNT(*) as count
FROM tags
GROUP BY tag
ORDER BY count DESC
LIMIT 20
"
```

---

## Graph Index Queries (`/graph-query`)

The graph index provides structured queries with relationship awareness.

### Building the Graph Index

```bash
npm run graph:build
```

This creates `.graph/graph.json` with:

- BM25 relevance ranking
- Backlink tracking
- Quality metrics
- Orphan detection

### Basic Graph Queries

```
/graph-query --search "kafka"           # BM25 ranked search
/graph-query --type Adr                 # All ADRs
/graph-query --type Project --status active
/graph-query --stats                    # Vault statistics
```

### Finding Backlinks

```
/graph-query --backlinks "Project - Cloud Migration"
```

Returns all notes that link to the Cloud Migration project.

### Finding Orphans

```
/graph-query --orphans
```

Returns notes with no incoming links (potential cleanup candidates).

### Finding Broken Links

```
/graph-query --broken-links
```

Returns wiki-links pointing to non-existent notes.

### Command Line Usage

```bash
# Direct command line
node scripts/graph-query.js --type Adr --status proposed
node scripts/graph-query.js --search "event driven"
node scripts/graph-query.js --orphans
node scripts/graph-query.js --stats
```

---

## Smart Search (`/search`)

Intelligently chooses the best search method.

```
/search <query>
```

**How it works:**

1. Queries graph index first (fast, ranked)
2. If no results, falls back to grep
3. Deduplicates and ranks results

**Best for:** When you're not sure which search to use.

---

## Discovery Skills

### Related Content (`/related`)

Find all notes mentioning a topic:

```
/related kafka
/related authentication
/related api gateway
```

**How it works:**

- Launches parallel sub-agents
- Searches titles, content, tags
- Aggregates and deduplicates results
- Returns with context snippets

**Output includes:**

- Notes with topic in title
- Notes with topic in content
- Notes with related tags
- Connected via backlinks

### Find Decisions (`/find-decisions`)

Find all decisions about a topic:

```
/find-decisions authentication
/find-decisions api gateway
/find-decisions data storage
```

**Returns:**

- ADRs mentioning the topic
- Meeting notes with decisions
- Related architecture patterns

### Timeline (`/timeline`)

Chronological project history:

```
/timeline Cloud Migration
```

**Returns:**

- Meetings in date order
- ADRs by decision date
- Tasks by completion date
- Key milestones

### Book/PDF Search (`/book-search`)

Search indexed PDF content:

```
/book-search event sourcing
/book-search microservices patterns
```

**Prerequisites:** PDFs must be in `.data/pdf-index/` after running `/pdf-to-page`.

---

## Search Patterns by Use Case

### "What do we know about X?"

Start broad, then narrow:

```
/q <topic>                     # Fast text search
/related <topic>               # Comprehensive discovery
/find-decisions <topic>        # Focus on decisions
```

### "Which systems use X?"

```
/q type:System technology/kafka
/q type:Integration kafka
```

### "What decisions have we made about X?"

```
/find-decisions <topic>
/q type:Adr <topic>
/graph-query --type Adr --search "<topic>"
```

### "What links to this note?"

```
/q backlinks:"Note Title"
/graph-query --backlinks "Note Title"
```

### "What's changed recently?"

```
/q recent
/q recent:30 type:Adr
/q recent:7 type:Meeting
```

### "What needs cleanup?"

```
/q orphans                     # Notes with no backlinks
/graph-query --orphans         # Same, via graph
/graph-query --broken-links    # Broken wiki-links
/q type:Page freshness:stale   # Stale content
```

### "What's tagged with X?"

```
/q tag:technology/aws
/q tag:project/cloud-migration
/q tag:domain/security
```

---

## Building and Maintaining Indexes

### SQLite Index

**Build:**

```bash
npm run vault:index
```

**View statistics:**

```bash
npm run vault:stats
```

**When to rebuild:**

- After adding many new notes
- After bulk imports
- When search results seem incomplete

### Graph Index

**Build:**

```bash
npm run graph:build
```

**Watch for changes:**

```bash
npm run graph:watch
```

**When to rebuild:**

- After structural changes
- When backlink queries seem wrong
- Before quality reports

### Automation

Set up cron or launchd for automatic rebuilding:

```bash
# Add to crontab for nightly rebuild
0 2 * * * cd /path/to/vault && npm run vault:index && npm run graph:build
```

---

## Performance Comparison

| Query Type             | Grep  | Graph | SQLite | Improvement |
| ---------------------- | ----- | ----- | ------ | ----------- |
| Full-text "kafka"      | 5-15s | 0.1s  | 0.01s  | ~500-1500x  |
| Type filter (all ADRs) | 3-5s  | 0.05s | 0.007s | ~500-700x   |
| Tag search             | 2-5s  | 0.05s | 0.007s | ~300-700x   |
| Backlinks              | 10+s  | 0.05s | 0.01s  | ~1000x      |
| Orphan detection       | 30+s  | 0.5s  | 0.1s   | ~300x       |

**Recommendations:**

- **< 100 notes**: Any method works
- **100-500 notes**: Prefer indexed search
- **500+ notes**: Always use indexes

---

## Troubleshooting

### "No results found"

1. Check index is built: `ls .data/vault.db`
2. Rebuild index: `npm run vault:index`
3. Verify note exists: `ls *kafka*`
4. Try broader search terms

### "Results seem incomplete"

1. Rebuild indexes:
   ```bash
   npm run vault:index
   npm run graph:build
   ```
2. Check for excluded directories in `.data/exclusions.json`

### "Search is slow"

1. Ensure you're using `/q` not grep
2. Check index exists
3. Rebuild if index is old

### "Backlinks not working"

1. Rebuild graph index: `npm run graph:build`
2. Check wiki-link syntax in notes
3. Verify target note exists

---

## Quick Reference

### Search Commands

| Need                    | Command                                  |
| ----------------------- | ---------------------------------------- |
| Fast text search        | `/q <query>`                             |
| All of a type           | `/q type:Adr`                            |
| By tag                  | `/q tag:technology/aws`                  |
| Recent changes          | `/q recent` or `/q recent:30`            |
| Find backlinks          | `/q backlinks:"Note Title"`              |
| Find orphans            | `/q orphans`                             |
| Comprehensive discovery | `/related <topic>`                       |
| Find decisions          | `/find-decisions <topic>`                |
| Project timeline        | `/timeline <project>`                    |
| Search books/PDFs       | `/book-search <topic>`                   |
| Graph-based query       | `/graph-query --type Adr --status draft` |

### Index Maintenance

| Task               | Command               |
| ------------------ | --------------------- |
| Build SQLite index | `npm run vault:index` |
| View SQLite stats  | `npm run vault:stats` |
| Build graph index  | `npm run graph:build` |
| Watch for changes  | `npm run graph:watch` |
| Full validation    | `npm run validate`    |

---

## Related Guides

- [[Page - Claude Code Skills Quick Reference]] - All skills reference
- [[Page - Daily Workflow Guide]] - Using search in daily workflow
- [[Page - Architecture Workflow Guide]] - Finding architecture content
- [[Page - How to Use This Vault]] - General vault usage
