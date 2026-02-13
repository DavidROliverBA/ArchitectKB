# /vault-maintenance Skill

Run quarterly vault maintenance checks to keep the knowledge base healthy. Orchestrates multiple quality checks using parallel sub-agents.

## Usage

```
/vault-maintenance              # Run all checks
/vault-maintenance --report     # Generate report only, no fixes
/vault-maintenance weblinks     # Run specific check only
```

## Maintenance Checks

| Check | Purpose | Frequency |
|-------|---------|-----------|
| `weblinks` | Verify external URLs are still active | Quarterly |
| `orphans` | Find notes with no backlinks | Quarterly |
| `broken-links` | Find broken `[[wiki-links]]` | Quarterly |
| `archive-candidates` | Identify notes ready for archiving | Quarterly |
| `frontmatter` | Validate frontmatter consistency | Quarterly |

## Instructions

### 1. Announce Maintenance Mode

```
## Vault Maintenance - 2026-01-10

Running quarterly health checks...
```

### 2. Launch Parallel Sub-Agents

Use Task tool to spawn multiple agents in parallel with `model: "haiku"` for efficiency:

```
[Task 1: Check Weblinks] (Haiku)
[Task 2: Find Orphans] (Haiku)
[Task 3: Check Broken Links] (Haiku)
[Task 4: Find Archive Candidates] (Haiku)
[Task 5: Validate Frontmatter] (Haiku)
```

### 3. Check Descriptions

#### Weblinks Check
See: `.claude/skills/check-weblinks/skill.md`

- Test all URLs for 404/redirects
- Flag dead links for review
- Update `lastChecked` in frontmatter

#### Orphans Check
See: `.claude/skills/orphans/skill.md`

Find notes with no incoming links:
```bash
# For each note, check if any other note links to it
grep -l "[[Note Name]]" *.md
```

Orphaned notes may indicate:
- Forgotten content
- Notes that should be linked from MOCs
- Candidates for deletion

**Exceptions** (not orphans):
- MOC files (they link out, not in)
- Daily notes (accessed by date)
- Dashboard

#### Broken Links Check
See: `.claude/skills/broken-links/skill.md`

Find `[[wiki-links]]` that point to non-existent notes:

```bash
# Extract all [[links]] and check if target exists
grep -o '\[\[[^]]*\]\]' *.md | sort -u
```

Broken links may indicate:
- Renamed files
- Deleted files
- Typos in link text

#### Archive Candidates Check

Find notes ready for archiving based on rules:

| Type | Rule | Action |
|------|------|--------|
| Project | `status: completed` AND modified > 6 months ago | Archive candidate |
| Task | `completed: true` AND modified > 3 months ago | Archive candidate |
| Person | Has `leftOrganisation` AND > 3 months ago | Archive candidate |

#### Frontmatter Validation

Check all notes have valid frontmatter:

- [ ] Has `type` field
- [ ] Has `title` field
- [ ] Has `created` date
- [ ] Type-specific required fields present
- [ ] No deprecated field names

### 4. Aggregate Results

Collect results from all sub-agents and compile:

```
## Vault Maintenance Report - 2026-01-10

### Summary
| Check | Issues | Action Required |
|-------|--------|-----------------|
| Weblinks | 3 dead, 4 redirected | 3 reviews |
| Orphans | 12 found | 12 reviews |
| Broken Links | 2 found | 2 fixes |
| Archive Candidates | 8 projects, 45 tasks | 53 archives |
| Frontmatter | 5 missing fields | 5 fixes |

### Total Actions
- **Reviews needed**: 15
- **Auto-fixable**: 50
- **Manual fixes**: 7

Run `/vault-maintenance --fix` to apply auto-fixes.
```

### 5. Detailed Findings

#### Weblinks
```
| File | Status | Action |
|------|--------|--------|
| Weblink - Old Docs.md | 404 | Archive |
| Weblink - Moved Page.md | 301 → new-url | Update URL |
```

#### Orphans
```
| File | Type | Suggestion |
|------|------|------------|
| Page - Random Notes.md | Page | Link from relevant MOC or delete |
| AtomicNote - Old Idea.md | AtomicNote | Review relevance |
```

#### Broken Links
```
| File | Broken Link | Suggestion |
|------|-------------|------------|
| Project - Alpha.md | [[John Smithh]] | Did you mean [[John Smith]]? |
| Meeting - 2025-01-05.md | [[Deleted Project]] | Remove link |
```

#### Archive Candidates
```
| File | Type | Last Modified | Action |
|------|------|---------------|--------|
| Project - Legacy.md | Project | 2025-03-15 | Archive |
| Task - Old Thing.md | Task | 2025-08-01 | Archive |
```

#### Frontmatter Issues
```
| File | Issue |
|------|-------|
| Page - Quick Note.md | Missing `type` field |
| Meeting - Untitled.md | Missing `title` field |
```

### 6. Apply Fixes (if --fix)

**Auto-fixes:**
- Update `lastChecked` on weblinks
- Add missing `created` dates (from file creation date)
- Archive candidates (with confirmation)

**Manual review required:**
- Orphaned notes (may be intentional)
- Broken links (need correct target)
- Dead weblinks (decide: update, archive, or delete)

## Scheduling

Run quarterly:
- **Q1**: First week of January
- **Q2**: First week of April
- **Q3**: First week of July
- **Q4**: First week of October

Add to calendar or daily note reminder.

## Example Session

```
User: /vault-maintenance

Claude:
## Vault Maintenance - Q1 2026

Launching health checks in parallel...

[5 sub-agents running]

### Results

| Check | Issues |
|-------|--------|
| Weblinks | 3 dead, 4 redirected |
| Orphans | 12 notes |
| Broken Links | 2 found |
| Archive Candidates | 53 notes |
| Frontmatter | 5 issues |

### Priority Actions

1. **Fix 2 broken links** (quick wins)
   - Project - Alpha.md: [[John Smithh]] → [[John Smith]]
   - Meeting - 2025-01-05.md: Remove [[Deleted Project]]

2. **Archive 53 old notes** (batch operation)
   - 8 completed projects (> 6 months)
   - 45 completed tasks (> 3 months)

3. **Review 12 orphaned notes**
   - May need linking or deletion

4. **Review 3 dead weblinks**
   - 1 unreferenced (archive)
   - 2 referenced (update or remove from sources)

Run `/vault-maintenance --fix` to apply auto-fixes.
```

## Related Skills

- `/check-weblinks` - Weblink health check
- `/orphans` - Find orphaned notes
- `/broken-links` - Find broken wiki-links
- `/archive` - Archive individual notes
- `/archive batch tasks` - Batch archive old tasks
