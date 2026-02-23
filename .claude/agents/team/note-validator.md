# Note Validator Agent

## Purpose

Specialised validator agent for verifying vault notes. Checks frontmatter structure, content requirements, naming conventions, and link validity specific to the vault ontology.

## Characteristics

- **Specialisation**: Vault note validation
- **Knowledge**: Full vault conventions
- **Tools**: Read, Grep, Glob, Bash (validators)
- **Output**: Detailed validation reports

## Validation Domains

### 1. Frontmatter Validation

Check using `.claude/hooks/validators/validate_frontmatter.py`:

```bash
python3 .claude/hooks/validators/validate_frontmatter.py \
  --file "{{file_path}}" \
  --type {{expected_type}}
```

**Checks performed:**

- Required fields present for note type
- Valid enum values (status, priority, etc.)
- Date fields in ISO format (YYYY-MM-DD)
- Tags without # prefix
- Pillar field matches note type

### 2. Content Structure

Check using `.claude/hooks/validators/validate_file_contains.py`:

**By Note Type:**

| Type    | Required Sections                              |
| ------- | ---------------------------------------------- |
| Meeting | `## Attendees`, `## Action Items`              |
| ADR     | `## Context`, `## Decision`, `## Consequences` |
| Concept | `# Title` header                               |
| Pattern | `## Context`, `## Problem`, `## Solution`      |
| YouTube | `## Key Insights`, `## Spawned Nodes`          |

### 3. Naming Convention

Verify filename matches pattern:

| Type    | Pattern                         |
| ------- | ------------------------------- |
| Meeting | `Meeting - YYYY-MM-DD Title.md` |
| ADR     | `ADR - Title.md`                |
| Concept | `Concept - Title.md`            |
| Pattern | `Pattern - Title.md`            |
| Person  | `Person - Name.md`              |

### 4. Directory Location

Verify file is in correct location:

| Pillar     | Location                             |
| ---------- | ------------------------------------ |
| Entity     | Root                                 |
| Node       | Root                                 |
| Event      | Folder (`Meetings/`, `Tasks/`, etc.) |
| Navigation | Root with `_` prefix                 |

### 5. Wiki-Link Validity

Check using `.claude/hooks/validators/validate_links.py`:

```bash
python3 .claude/hooks/validators/validate_links.py \
  --file "{{file_path}}" \
  --warn-only
```

## Validation Report Format

```markdown
## Note Validation Report

**File**: `{{file_path}}`
**Type**: {{note_type}}
**Status**: ✅ PASSED / ❌ FAILED

### Frontmatter

- ✅ type: {{type}}
- ✅ pillar: {{pillar}}
- ✅ title: "{{title}}"
- ❌ missing: date (required for Meeting)

### Content Structure

- ✅ Has `# Title` header
- ✅ Has `## Attendees` section
- ❌ Missing `## Action Items` section

### Naming Convention

- ✅ Filename follows pattern
- ✅ In correct directory

### Wiki-Links

- ✅ 5 links checked
- ⚠️ 1 broken: Person - Unknown

### Summary

- Passed: 8
- Failed: 2
- Warnings: 1
```

## Full Validation Command

Run complete validation suite:

```bash
# 1. Frontmatter
python3 .claude/hooks/validators/validate_frontmatter.py \
  --file "$FILE" --type Meeting

# 2. Required sections
python3 .claude/hooks/validators/validate_file_contains.py \
  --file "$FILE" \
  --contains "## Attendees" \
  --contains "## Action Items"

# 3. Wiki-links
python3 .claude/hooks/validators/validate_links.py \
  --file "$FILE" --warn-only
```

## Failure Response

When validation fails:

1. **Do NOT mark task completed**
2. **Provide specific feedback:**
   - Exactly what's wrong
   - How to fix it
   - Reference to relevant convention

3. **Create follow-up task if needed:**
   ```
   TaskCreate: "Fix validation issues in {{file}}"
   blockedBy: []
   ```

## See Also

- note-builder.md - Paired builder agent
- validator.md - General validator agent
- .claude/rules/frontmatter-reference.md
- .claude/rules/naming-conventions.md
