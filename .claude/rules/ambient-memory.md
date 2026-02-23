# Ambient Memory

Write to MCP memory **inline** whenever you learn something during a session. Don't wait for session end or for the user to ask. Memory is ambient infrastructure -- every insight is captured the moment it emerges.

## Three Capture Paths

| Path | What | When |
|------|------|------|
| **This rule** | Claude's own observations | Inline, the moment you learn something |
| **Compound steps** | User's knowledge (skill SKILL.md files) | At skill completion |
| **session-learner.py** | Commit-level data (automated hook) | Session end |

## Write Triggers

You MUST write to MCP memory when any of these occur:

| Trigger | Entity Type | Name Pattern | Example |
|---------|------------|-------------|---------|
| Discover a bug or its fix | `LessonLearned` | `Lesson-{Slug}` | `Lesson-AllEntitiesUndefined` |
| Find a workaround | `LessonLearned` | `Lesson-{Slug}` | `Lesson-SandboxBlocksPreCommitCache` |
| Learn or establish a convention | `Convention` | `Convention-{Slug}` | `Convention-DailyNoteDateOnly` |
| Identify a knowledge gap | `KnowledgeGap` | `Gap-{Slug}` | `Gap-NoMCPMemoryPruning` |
| Learn a person's role or preference | `PersonInsight` | `PersonInsight-{Name}` | `PersonInsight-JaneDoe` |
| Encounter recurring friction | `LessonLearned` | `Lesson-{Slug}` | `Lesson-WorktreePermissions` |

## How to Write

1. **Search first** -- `mcp__memory__search_nodes` with the key concept to check for existing entities
2. **If entity exists** -- `mcp__memory__add_observations` to append new observations
3. **If new** -- `mcp__memory__create_entities` with a keyword-searchable name

## How to Search

Use `mcp__memory__search_nodes` for quick lookups. For deeper searches that include archived entities, use:

```bash
node .claude/scripts/memory-search.js "<query>"                     # Active + archive
node .claude/scripts/memory-search.js "<query>" --type LessonLearned # Filter by type
node .claude/scripts/memory-search.js --stats                       # Entity counts
```

When MCP `search_nodes` returns no results, always check the archive -- the entity may have been pruned but preserved.

**Observations must be self-contained** -- readable without session context. Include the date discovered and enough detail to act on later.

## Don't Write

- **Anything from `classification: secret` or `classification: confidential` notes** -- the memory file is unencrypted plain text on disk. Never write observations that reference credentials, API keys, tokens, connection strings, or content from classified notes.
- Trivial observations (typos, formatting, whitespace fixes)
- Vault entity data (people, systems, projects -- stored in Graph index, not memory)
- Transient session context that won't matter tomorrow
- Anything you already wrote this session (no duplicates)

## Size Management

- Practical cap: ~200 entities total
- `SessionSummary` and `SkillOutcome` auto-pruned (keep last 20) -- older ones archived to `Memory/memory-archive.md`
- `LessonLearned`, `Convention`, `KnowledgeGap` are never auto-pruned -- they're the value
- **Promotion** to `.claude/rules/` is the graduation path (3+ recurrences -> durable rule)
- **Archiving:** When pruning ephemeral entities (SessionSummary, SkillOutcome), write them to `Memory/memory-archive.md` before deletion so history is preserved
- If you notice >200 entities during a search, flag it to the user
