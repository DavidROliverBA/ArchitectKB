---
type: Page
pillar: node
title: Claude Code Hooks Guide
created: 2026-02-04
modified: 2026-02-04
tags:
  - activity/documentation
  - domain/tooling
  - audience/architect

# Quality Indicators
summary: Comprehensive guide to Claude Code hooks for vault quality enforcement and workflow automation
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-02-04

# Semantic Discovery
keywords:
  - claude-code
  - hooks
  - automation
  - quality
  - validation
  - security

# Relationships
nodeRelationships:
  - "[[Concept - Claude Code]]"
  - "[[Pattern - Quality Enforcement]]"
relatedTo:
  - "[[Page - Claude Code Skills Quick Reference]]"
  - "[[Page - Vault Security Hardening]]"
  - "[[Page - How to Use This Vault]]"
entityRelationships: []
---

# Claude Code Hooks Guide

This guide covers the 11 Claude Code hooks included in ArchitectKB for automated quality enforcement, security scanning, and workflow automation.

---

## What Are Hooks?

Hooks are scripts that Claude Code executes automatically at specific points in its workflow. They enable:

- **Quality enforcement** - Validate frontmatter, tags, and file names
- **Security scanning** - Detect secrets before they're committed
- **Workflow automation** - Auto-load context, format code
- **User notifications** - Alert when Claude needs input

### Hook Types

| Hook Type           | When It Runs                              | Use Case                           |
| ------------------- | ----------------------------------------- | ---------------------------------- |
| `UserPromptSubmit`  | Before processing user's message          | Secret detection, context loading  |
| `PreToolUse`        | Before a tool executes                    | Block sensitive operations         |
| `PostToolUse`       | After a tool completes                    | Validate output, format code       |
| `PermissionRequest` | When Claude requests permission           | Auto-allow safe operations         |
| `Notification`      | When Claude wants to notify user          | Desktop notifications              |

### Exit Codes

| Exit Code | Meaning        | Effect                                    |
| --------- | -------------- | ----------------------------------------- |
| 0         | Success        | Continue normally                         |
| 1         | Warning        | Show output but continue (non-blocking)   |
| 2         | Block          | Stop the operation                        |

---

## Included Hooks

### Security Hooks

#### 1. secret-detection.py

**Type:** UserPromptSubmit
**Purpose:** Detects potential secrets in user prompts before processing

Scans for:
- API keys and tokens (patterns like `sk-`, `AKIA`, `ghp_`)
- Connection strings (with embedded passwords)
- Passwords in commands
- Private keys (RSA, DSA, EC, ED25519)

**Example Output:**
```
 Secret Detection Warning:
    Possible API key detected
   Consider using /secrets get <name> instead
```

#### 2. secret-file-scanner.py

**Type:** PreToolUse (Edit|Write)
**Purpose:** Blocks reads of files likely to contain secrets

Blocks access to:
- `.env`, `.env.*` files
- `credentials.json`, `secrets.*`
- `*.key`, `*.pem` files
- `*_credentials*`, `*_secrets*`

#### 3. file-protection.py

**Type:** PreToolUse (Edit|Write)
**Purpose:** Blocks edits to sensitive or system files

Protected patterns:
- Environment files (`.env`, `.env.local`)
- Lock files (`package-lock.json`, `yarn.lock`)
- Credential files (`credentials.json`)
- Key files (`*.key`, `*.pem`)

---

### Quality Enforcement Hooks

#### 4. frontmatter-validator.py

**Type:** PostToolUse (Edit|Write)
**Purpose:** Validates YAML frontmatter after file edits

Checks:
- Required fields by note type (e.g., `type`, `title`, `status`)
- Valid enum values (e.g., status must be `active|paused|completed`)
- Date format is ISO 8601 (`YYYY-MM-DD`)
- Filename matches expected prefix for type

**Example Output:**
```
 Frontmatter validation for Project - Cloud Migration.md:
    Missing required field for Project: status
    Invalid priority value 'urgent'. Valid: high, medium, low
```

**Required Fields by Type:**

| Type           | Required Fields                                              |
| -------------- | ------------------------------------------------------------ |
| Task           | type, title, completed, priority                             |
| Project        | type, title, status, priority                                |
| Meeting        | type, title, date, attendees                                 |
| Person         | type, title, role                                            |
| ADR            | type, title, status, adrType, relatedTo, supersedes, dependsOn |
| System         | type, title, systemId, status, criticality                   |
| Incubator      | type, title, status, domain                                  |
| FormSubmission | type, title, formType, status, project                       |

#### 5. tag-taxonomy-enforcer.py

**Type:** PostToolUse (Edit|Write)
**Purpose:** Ensures tags follow the hierarchical taxonomy

Validates:
- Tags use lowercase only
- Tags are hierarchical (e.g., `domain/data` not just `data`)
- Tag prefixes are valid (activity/, domain/, project/, technology/, etc.)
- No `#` prefix in frontmatter

**Example Output:**
```
  Tag validation for ADR - Use PostgreSQL.md:
    Tag should be hierarchical (use prefix/value): database
    Tag should be lowercase: Technology/PostgreSQL  technology/postgresql
   Consider adding tags: domain/, activity/
```

**Valid Tag Prefixes:**

| Prefix        | Purpose                | Examples                                 |
| ------------- | ---------------------- | ---------------------------------------- |
| `activity/`   | Type of work           | architecture, research, implementation   |
| `domain/`     | Business area          | engineering, data, cloud, security       |
| `project/`    | Project scope          | (your project names)                     |
| `technology/` | Tech stack             | aws, kafka, kubernetes, postgresql       |
| `type/`       | Artifact type          | adr, system, diagram, hld                |
| `criticality/`| Importance             | critical, high, medium, low              |
| `status/`     | Lifecycle state        | draft, approved, deprecated              |
| `vendor/`     | External vendor        | (your vendor names)                      |
| `audience/`   | Target audience        | executive, architect, developer          |

**Approved Flat Tags:** `notion-import`, `pdf-import`, `moc`, `daily`, `video`, `automation`

#### 6. wiki-link-checker.py

**Type:** PostToolUse (Edit|Write)
**Purpose:** Validates wiki-links point to existing notes

Checks:
- `[[Note Title]]` links resolve to real files
- Handles aliased links `[[Note|Alias]]`
- Reports broken links with suggestions

**Example Output:**
```
 Wiki-link check for Meeting - 2026-02-04 Sprint.md:
    Broken link: [[John Smith]]
   Suggestion: Did you mean [[Person - John Smith]]?
```

#### 7. filename-convention-checker.py

**Type:** PostToolUse (Edit|Write)
**Purpose:** Validates filenames follow vault naming conventions

Checks:
- Correct type prefix (e.g., `Meeting -`, `Project -`, `ADR -`)
- Date format in meeting notes (`YYYY-MM-DD`)
- Entity notes have type prefix (`Person -`, `System -`)

**Expected Prefixes:**

| Note Type | Expected Prefix     | Example                                   |
| --------- | ------------------- | ----------------------------------------- |
| Project   | `Project - `        | `Project - Cloud Migration.md`            |
| Task      | `Task - `           | `Task - Review ADR.md`                    |
| Meeting   | `Meeting - YYYY-MM-DD` | `Meeting - 2026-02-04 Sprint Review.md` |
| ADR       | `ADR - `            | `ADR - Use PostgreSQL.md`                 |
| Person    | `Person - `         | `Person - Jane Smith.md`                  |
| System    | `System - `         | `System - Customer Portal.md`             |

---

### Workflow Automation Hooks

#### 8. skill-context-loader.sh

**Type:** UserPromptSubmit
**Purpose:** Auto-loads context files based on skill commands

When user types a skill command (e.g., `/meeting`, `/adr`), this hook:
1. Detects the skill command
2. Loads relevant context from `.claude/context/`
3. Provides Claude with additional domain knowledge

**Context Loading Rules:**

| Command Pattern        | Context Loaded               |
| ---------------------- | ---------------------------- |
| `/person`, `/meeting`  | `people-template.md`         |
| `/project-status`      | `projects-template.md`       |
| `/adr`, `/architecture`| `architecture-template.md`   |
| Mentions of acronyms   | `acronyms-template.md`       |

#### 9. graph-search-hint.sh

**Type:** PreToolUse (Grep)
**Purpose:** Suggests using the graph index for keyword searches

When Claude attempts a Grep for simple keywords, this hook suggests the faster graph query:

**Example Output:**
```
 Tip: For keyword searches, the graph index is faster. Try:
   node scripts/graph-query.js --search "kafka"
   or /graph-query kafka
```

#### 10. code-formatter.py

**Type:** PostToolUse (Edit|Write)
**Purpose:** Auto-formats code files after edits

Formats by extension:
- `.js`, `.ts`, `.json` - Prettier
- `.py` - Black
- `.go` - gofmt
- `.rs` - rustfmt
- `.sh` - shfmt

**Note:** Only runs if the formatter is installed on the system.

---

### Notification Hooks

#### 11. notify.sh

**Type:** Notification
**Purpose:** macOS desktop notifications when Claude needs attention

Triggers:
- `idle_prompt` - Claude is waiting for input
- `permission_prompt` - Claude needs permission to proceed

Uses macOS `osascript` for native notifications.

---

## Configuration

Hooks are configured in `.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/secret-detection.py",
            "timeout": 10
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/file-protection.py",
            "timeout": 5
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/frontmatter-validator.py",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

### Configuration Options

| Field     | Description                                   | Example             |
| --------- | --------------------------------------------- | ------------------- |
| `matcher` | Regex pattern for when to trigger             | `Edit\|Write`       |
| `type`    | Hook type (currently only `command`)          | `command`           |
| `command` | Path to hook script                           | `.claude/hooks/x.py`|
| `timeout` | Maximum execution time in seconds             | `10`                |

---

## Customising Hooks

### Adding Project/Vendor Tags

Edit `.claude/hooks/tag-taxonomy-enforcer.py` and add your values:

```python
VALID_HIERARCHIES = {
    "project": [
        "cloud-migration",
        "api-modernisation",
        "data-platform",
        # Add your projects here
    ],
    "vendor": [
        "aws",
        "microsoft",
        "oracle",
        # Add your vendors here
    ],
}
```

### Adding Required Fields

Edit `.claude/hooks/frontmatter-validator.py` to add custom requirements:

```python
REQUIRED_FIELDS = {
    "CustomType": ["type", "title", "myRequiredField"],
}
```

### Disabling a Hook

Remove or comment out the hook entry in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      // Comment out to disable:
      // {
      //   "type": "command",
      //   "command": ".claude/hooks/tag-taxonomy-enforcer.py"
      // }
    ]
  }
}
```

---

## Writing Custom Hooks

### Hook Input Format

Hooks receive JSON on stdin with context about the operation:

```json
{
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/path/to/file.md",
    "old_string": "...",
    "new_string": "..."
  }
}
```

### Hook Output

- **stdout** - Displayed to user (warnings, suggestions)
- **stderr** - Logged but not displayed
- **Exit code** - Controls whether operation continues

### Example: Custom Validator

```python
#!/usr/bin/env python3
"""
Custom Hook Example
Hook Type: PostToolUse
Matcher: Edit|Write
"""

import json
import sys
from pathlib import Path

def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = input_data.get("tool_name", "")
    file_path = input_data.get("tool_input", {}).get("file_path", "")

    # Only check markdown files
    if not file_path.endswith(".md"):
        sys.exit(0)

    # Your validation logic here
    warnings = []

    # Read file and check something
    with open(file_path, 'r') as f:
        content = f.read()

    if "TODO" in content:
        warnings.append("File contains TODO items")

    # Output warnings
    if warnings:
        print(f"Custom check for {Path(file_path).name}:")
        for warning in warnings:
            print(f"   {warning}")

    # Exit 0 for non-blocking (warnings only)
    # Exit 2 to block the operation
    sys.exit(0)

if __name__ == "__main__":
    main()
```

### Making a Hook Executable

```bash
chmod +x .claude/hooks/my-custom-hook.py
```

---

## Troubleshooting

### Hook Not Running

1. Check the hook is executable: `chmod +x .claude/hooks/hook.py`
2. Verify the matcher pattern matches the tool
3. Check the timeout isn't too low
4. Test the hook manually: `echo '{}' | python3 .claude/hooks/hook.py`

### Hook Blocking Unexpectedly

1. Check the exit code - `exit 2` blocks operations
2. Review the matcher pattern - is it too broad?
3. Add logging to stderr to debug

### Performance Issues

1. Increase the timeout if hook is slow
2. Use simple matching patterns
3. Avoid network calls in hooks
4. Cache expensive operations

---

## Best Practices

1. **Exit 0 for warnings** - Let Claude continue with warnings
2. **Exit 2 sparingly** - Only block for critical security issues
3. **Keep hooks fast** - Timeouts should be under 10 seconds
4. **Use standard library** - Avoid external dependencies in Python hooks
5. **Clear output** - Use emojis and formatting for readability
6. **Customise lists** - Update project/vendor/technology values for your organisation

---

## Related Guides

- [[Page - Claude Code Skills Quick Reference]] - All 75 skills
- [[Page - Vault Security Hardening]] - Security best practices
- [[Page - How to Use This Vault]] - General vault usage
- [[CLAUDE.md]] - Main configuration reference

---

## Hook Reference

| Hook                          | Type            | Matcher      | Blocking | Purpose                         |
| ----------------------------- | --------------- | ------------ | -------- | ------------------------------- |
| `secret-detection.py`         | UserPromptSubmit| `.*`         | No       | Detect secrets in prompts       |
| `skill-context-loader.sh`     | UserPromptSubmit| `.*`         | No       | Load context for skills         |
| `file-protection.py`          | PreToolUse      | `Edit\|Write`| Yes      | Block sensitive file edits      |
| `secret-file-scanner.py`      | PreToolUse      | `Edit\|Write`| Yes      | Block secret file reads         |
| `graph-search-hint.sh`        | PreToolUse      | `Grep`       | No       | Suggest graph search            |
| `frontmatter-validator.py`    | PostToolUse     | `Edit\|Write`| No       | Validate frontmatter            |
| `tag-taxonomy-enforcer.py`    | PostToolUse     | `Edit\|Write`| No       | Enforce tag taxonomy            |
| `wiki-link-checker.py`        | PostToolUse     | `Edit\|Write`| No       | Check wiki-links                |
| `filename-convention-checker.py`| PostToolUse   | `Edit\|Write`| No       | Check filename conventions      |
| `code-formatter.py`           | PostToolUse     | `Edit\|Write`| No       | Auto-format code                |
| `notify.sh`                   | Notification    | Various      | No       | Desktop notifications           |
