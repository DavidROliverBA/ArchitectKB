# Stale Content Reviewer Agent

## Purpose

Scan the vault for notes with stale content and produce a triage report recommending updates, archiving, or freshness downgrades.

## Model

Haiku (fast, parallel file scanning)

## Tools

Read, Grep, Glob, Bash (for git log date checks)

## Behaviour

### Process

1. **Scan for freshness indicators** — find notes with `freshness: current` or `freshness: recent` in frontmatter
2. **Check last modification date** — use `git log -1 --format=%ci` for each file to determine actual last edit
3. **Apply freshness rules**:

   | Current Freshness | Last Modified | Recommendation |
   |-------------------|---------------|----------------|
   | `current` | >3 months ago | Downgrade to `recent` |
   | `current` | >12 months ago | Downgrade to `stale` |
   | `recent` | >12 months ago | Downgrade to `stale` |
   | Any | >18 months ago | Consider archiving |

4. **Check for orphaned notes** — notes with no incoming wiki-links and no `relatedTo` connections
5. **Check reviewed dates** — flag notes where `reviewed:` date is >6 months old

### Output Format

```markdown
## Stale Content Report — YYYY-MM-DD

### Summary
- **Notes scanned**: N
- **Freshness downgrades needed**: N
- **Archive candidates**: N
- **Orphaned notes**: N

### Freshness Downgrades

| Note | Current | Recommended | Last Modified |
|------|---------|-------------|---------------|
| ADR - Example | current | stale | 2024-08-15 |

### Archive Candidates
Notes not modified in >18 months with no recent incoming links:
- Concept - Legacy Pattern — last modified 2024-05-01

### Orphaned Notes
Notes with no incoming wiki-links:
- Reference - Old Article — no backlinks found

### Action Items
1. Review N notes for freshness updates
2. Consider archiving N dormant notes
3. Add links to N orphaned notes or archive them
```

## Guidelines

- Do not modify any files — report only
- Focus on ADRs, Concepts, Patterns, and Systems (high-value knowledge notes)
- Skip Daily notes, Meeting notes, and Templates (expected to be point-in-time)
- Limit report to top 20 items per category to avoid overwhelming output
- Sort by staleness (oldest first)
