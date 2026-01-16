# Tag Management Skill

**Purpose:** Analyze, refactor, and maintain tags across the vault according to the official taxonomy.

**Taxonomy Reference:** [[.claude/rules/tag-taxonomy.md]]

---

## Commands

### `/tag-analyze [scope]`

Analyze tag quality and compliance.

**Scopes:**
- `/tag-analyze` - Current note (if applicable)
- `/tag-analyze vault` - Full vault analysis
- `/tag-analyze <path>` - Specific file or folder

**Analysis Includes:**
1. Tag coverage (has tags vs no tags)
2. Hierarchical compliance (proper prefixes)
3. Case violations (uppercase, mixed case)
4. Inline prefix violations (`#` in frontmatter)
5. Template variable contamination
6. Flat tag orphans (no hierarchy)
7. Minimum tag requirements by note type
8. Tag recommendations

**Output:**
- Summary of violations
- Specific issues found
- Suggested fixes

---

### `/tag-refactor [scope]`

Refactor tags to follow official taxonomy.

**Scopes:**
- `/tag-refactor` - Current note
- `/tag-refactor vault` - Full vault refactor
- `/tag-refactor <path>` - Specific file or folder
- `/tag-refactor --dry-run` - Preview changes without applying

**Refactoring Rules:**

1. **Case Normalization**
   - `ADR` → `type/adr`
   - `MROSystem` → `technology/mroPlatform`
   - `AWS` → `technology/aws`
   - All tags to lowercase

2. **Inline Prefix Removal**
   - `#activity/architecture` → `activity/architecture`
   - `#technology/aws` → `technology/aws`

3. **Flat to Hierarchical**
   - `mroSystem` → `technology/mroPlatform`
   - `aws` → `technology/aws`
   - `dataPlatform` → `project/dataPlatform`
   - `architecture` → `activity/architecture`
   - `integration` → `domain/integration` or `activity/integration` (context-dependent)

4. **Template Variable Removal**
   - Delete: `{{3-5 relevant tags}}`, `{{project|lower}}`, etc.

5. **Capitalized Prefixes**
   - `Project/ModernizationProject` → `project/modernization`
   - `Technology/AWS` → `technology/aws`

**Safety:**
- Always backup before vault-wide refactoring
- Preview changes with `--dry-run` first
- Commit changes to git before refactoring

---

### `/tag-suggest <note>`

Suggest appropriate tags for a note based on content analysis.

**Process:**
1. Read note frontmatter and content
2. Analyze note type (`type:` field)
3. Extract key terms and context
4. Suggest tags from approved taxonomy

**Example:**
```bash
/tag-suggest "ADR - AIIncidentProcessor - Bedrock.md"
```

**Output:**
```yaml
# Current tags:
tags: [ADR, activity/architecture, AWS, Bedrock]

# Suggested tags (normalized):
tags: [
  type/adr,
  activity/architecture,
  technology/aws,
  technology/bedrock,
  project/aiProcessor,
  domain/cloud,
  domain/security
]

# Changes:
- Remove: ADR (flat) → Add: type/adr
- Normalize: AWS → technology/aws
- Normalize: Bedrock → technology/bedrock
- Add missing: project/aiProcessor, domain/cloud, domain/security
```

---

### `/tag-find-violations [type]`

Find specific tag violations across the vault.

**Types:**
- `/tag-find-violations case` - Case violations (uppercase, mixed case)
- `/tag-find-violations inline` - Inline `#` prefix in frontmatter
- `/tag-find-violations flat` - Orphan flat tags (no hierarchy)
- `/tag-find-violations template` - Template variable contamination
- `/tag-find-violations missing` - Notes missing required tags
- `/tag-find-violations all` - All violations (default)

**Output:**
- List of files with violations
- Specific violations per file
- Count summary

---

### `/tag-migrate <old> <new>`

Batch rename a tag across the entire vault.

**Examples:**
```bash
/tag-migrate "ADR" "type/adr"
/tag-migrate "AWS" "technology/aws"
/tag-migrate "project/modernization" "project/modernization-legacy"
```

**Process:**
1. Find all notes with `<old>` tag
2. Replace with `<new>` tag
3. Update frontmatter YAML
4. Report changes made

**Safety:**
- Shows preview before applying
- Requires confirmation for vault-wide changes

---

## Implementation Guide

### Tag Refactoring Process

When implementing `/tag-refactor`:

1. **Read note frontmatter**
   ```python
   import re, yaml

   with open(file_path) as f:
       content = f.read()

   # Extract frontmatter
   match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
   frontmatter = yaml.safe_load(match.group(1))
   tags = frontmatter.get('tags', [])
   ```

2. **Apply refactoring rules**
   ```python
   refactored_tags = []

   for tag in tags:
       # Remove inline prefix
       tag = tag.lstrip('#')

       # Apply migrations
       tag = apply_migrations(tag, note_type, note_content)

       # Normalize case
       tag = tag.lower()

       # Skip template variables
       if '{{' in tag:
           continue

       refactored_tags.append(tag)
   ```

3. **Contextual flat tag resolution**
   ```python
   def apply_migrations(tag, note_type, content):
       # Simple mappings
       FLAT_TO_HIERARCHICAL = {
           'adr': 'type/adr',
           'mroSystem': 'technology/mroPlatform',
           'aws': 'technology/aws',
           'ai': 'technology/ai',
           'dataPlatform': 'project/dataPlatform',
           'modernization': 'project/modernization',
           'myProject': 'project/myProject',
           'moc': 'moc',  # Approved special tag
           'daily': 'daily',  # Approved special tag
       }

       # Context-dependent
       if tag == 'architecture':
           # Check if it's an activity or domain
           if 'decision' in content.lower() or note_type == 'Adr':
               return 'activity/architecture'
           else:
               return 'domain/engineering'

       if tag == 'integration':
           if 'integration pattern' in content.lower():
               return 'activity/integration'
           else:
               return 'domain/integration'

       # Direct mapping
       if tag in FLAT_TO_HIERARCHICAL:
           return FLAT_TO_HIERARCHICAL[tag]

       # Already hierarchical - normalize case only
       return tag
   ```

4. **Update frontmatter**
   ```python
   frontmatter['tags'] = refactored_tags

   # Rebuild YAML
   new_frontmatter = yaml.dump(frontmatter, sort_keys=False)

   # Replace in file
   new_content = re.sub(
       r'^---\n.*?\n---',
       f'---\n{new_frontmatter}---',
       content,
       count=1,
       flags=re.DOTALL
   )

   with open(file_path, 'w') as f:
       f.write(new_content)
   ```

---

## Tag Migration Reference

### Common Flat Tag Migrations

| Old Tag | New Tag | Context |
|---------|---------|---------|
| `ADR` | `type/adr` | Always |
| `MROSystem` | `technology/mroPlatform` | Always |
| `AWS` | `technology/aws` | Always |
| `AI` | `technology/ai` | Always |
| `MRO` | `technology/mro-software` | Technology context |
| `mroSystem` | `technology/mroPlatform` | Always |
| `aws` | `technology/aws` | Always |
| `dataPlatform` | `project/dataPlatform` | Always |
| `modernization` | `project/modernization` | Always |
| `myProject` | `project/myProject` | Always |
| `ecp` | `project/ecp` | Always |
| `architecture` | `activity/architecture` | Activity context |
| `architecture` | `domain/engineering` | Domain context (rare) |
| `integration` | `activity/integration` | Activity context |
| `integration` | `domain/integration` | Domain context |
| `security` | `domain/security` | Always |
| `governance` | `activity/governance` | Always |
| `documentation` | `activity/documentation` | Always |

### Capitalized Hierarchy Migrations

| Old Tag | New Tag |
|---------|---------|
| `Project/ModernizationProject` | `project/modernization` |
| `Project/LegacyEngineeringSystem-Futures` | `project/modernization` |
| `Technology/MROPlatform` | `technology/mroPlatform` |
| `Technology/AWS` | `technology/aws` |
| `Domain/Engineering-Systems` | `domain/engineering` |

### Inline Prefix Removal

| Old Tag | New Tag |
|---------|---------|
| `#activity/architecture` | `activity/architecture` |
| `#technology/aws` | `technology/aws` |
| `#project/myProject` | `project/myProject` |

---

## Usage Examples

### Example 1: Analyze Current Note

```bash
$ /tag-analyze

Analyzing: ADR - AIIncidentProcessor - Bedrock.md

Current tags: [ADR, activity/architecture, AWS, Bedrock, aiProcessor]

Issues Found:
✗ Flat tag: ADR (should be type/adr)
✗ Case violation: AWS (should be technology/aws)
✗ Flat tag: Bedrock (should be technology/bedrock)
✗ Flat tag: aiProcessor (should be project/aiProcessor)
✗ Missing minimum tags: Only 5 tags, ADRs need 4-7 with required hierarchies

Missing Required Hierarchies:
✗ No domain/ tag (required for ADRs)

Suggestions:
+ Add: type/adr (artifact type)
+ Add: technology/aws (platform)
+ Add: technology/bedrock (AI service)
+ Add: project/aiProcessor (project context)
+ Add: domain/cloud (business area)
+ Add: domain/security (security considerations)

Recommended tags:
tags: [type/adr, activity/architecture, technology/aws, technology/bedrock, project/aiProcessor, domain/cloud, domain/security]
```

### Example 2: Refactor Vault (Dry Run)

```bash
$ /tag-refactor vault --dry-run

Vault Tag Refactoring Preview
==============================

Analyzing 2,535 markdown files...

Summary:
- 732 files with tags to refactor
- 1,148 files with no tags (skipped)
- 655 files with empty tags [] (skipped)

Changes Preview (first 10):

1. ADR - AIIncidentProcessor - Bedrock.md
   - Remove: ADR → Add: type/adr
   - Normalize: AWS → technology/aws
   - Normalize: Bedrock → technology/bedrock
   - Normalize: aiProcessor → project/aiProcessor

2. Project - MyDataIntegration.md
   - Remove: Project → Add: project/myProject
   - Normalize: SAP → technology/sap
   - Add recommended: domain/data, domain/integration

3. System - DataPlatform.md
   - Remove inline: #activity/architecture → activity/architecture
   - Normalize: DataPlatform → type/system
   - Add missing: criticality/critical

...

Total Changes:
- 124 case normalizations
- 67 flat to hierarchical conversions
- 10 inline prefix removals
- 11 template variable deletions
- 203 recommended tags to add

Run without --dry-run to apply changes.
Recommend: git commit current state first.
```

### Example 3: Find Specific Violations

```bash
$ /tag-find-violations case

Finding case violations across vault...

Found 47 files with case violations:

1. ADR - SAP to AWS Connectivity.md
   - ADR (should be lowercase in hierarchy)
   - AWS (should be lowercase in hierarchy)

2. Project - ModernizationProject.md
   - MROPlatform (should be lowercase)
   - SAP (should be lowercase)

3. Meeting - 2026-01-10 ECP Core.md
   - ECP (should be lowercase or hierarchical)

...

Summary:
- 24 files with uppercase flat tags
- 18 files with mixed case in hierarchies
- 5 files with capitalized prefixes (Project/, Technology/)

Run /tag-refactor to fix these violations.
```

### Example 4: Migrate Specific Tag

```bash
$ /tag-migrate "ADR" "type/adr"

Migrating tag: ADR → type/adr

Found 41 files with tag "ADR":
1. ADR - API Gateway Selection.md
2. ADR - AIIncidentProcessor - AI Services.md
3. ADR - AIIncidentProcessor - Bedrock.md
...

Preview changes? [y/N]: y

Changes to apply:
- Replace "ADR" with "type/adr" in 41 files
- Preserve all other tags
- Update frontmatter YAML

Apply changes? [y/N]: y

✓ Updated 41 files successfully
✓ No errors

Summary:
- 41 files updated
- 0 files skipped
- 0 errors
```

---

## Best Practices

1. **Always run --dry-run first** - Preview changes before applying
2. **Commit to git before refactoring** - Easy rollback if needed
3. **Refactor incrementally** - Start with specific violations, then full vault
4. **Review suggestions** - AI suggestions may need manual adjustment
5. **Use /tag-suggest liberally** - Get recommendations for new notes
6. **Run quarterly audits** - Use `/tag-analyze vault` to monitor quality

---

## Integration with Other Skills

This skill works well with:
- `/quality-report` - Includes tag analysis
- `/vault-maintenance` - Includes tag health checks
- `/adr` - Suggests tags when creating ADRs
- `/project-status` - Analyzes project tags

---

## References

- [[.claude/rules/tag-taxonomy.md]] - Official taxonomy
- [[CLAUDE.md]] - Tag syntax
- [[.claude/vault-conventions.md]] - Tag conventions
- [[.claude/rules/quality-patterns.md]] - Quality patterns

---

**Sources:**
- [Knowledge Base Taxonomy: 10 Proven Design Principles](https://www.matrixflows.com/blog/10-best-practices-for-creating-taxonomy-for-your-company-knowledge-base)
- [Taxonomy 101: Definition and Best Practices - Nielsen Norman Group](https://www.nngroup.com/articles/taxonomy-101/)
- [Personal Knowledge Management at Scale](https://www.dsebastien.net/personal-knowledge-management-at-scale-analyzing-8-000-notes-and-64-000-links/)
