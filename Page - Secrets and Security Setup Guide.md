---
type: Page
title: Secrets and Security Setup Guide
created: 2026-01-28
modified: 2026-01-28
tags:
  - activity/documentation
  - domain/security
  - domain/tooling
  - audience/architect

# Quality Indicators
summary: Complete guide for Bitwarden CLI integration, pre-commit hooks, and credential management
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-28

# Semantic Discovery
keywords:
  - bitwarden
  - secrets
  - credentials
  - security
  - pre-commit
  - hooks

# Relationships
relatedTo:
  - "[Page - Claude Code Skills Quick Reference](Page%20-%20Claude%20Code%20Skills%20Quick%20Reference.md)"
  - "[Page - How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md)"
---

# Secrets and Security Setup Guide

This guide covers secure credential management using Bitwarden CLI, pre-commit hooks for secret detection, and security best practices for ArchitectKB.

---

## Security Overview

ArchitectKB follows a **zero-secrets-in-vault** policy:

| Principle                 | Implementation                            |
| ------------------------- | ----------------------------------------- |
| **No credentials stored** | All secrets in Bitwarden, not files       |
| **On-demand access**      | Retrieve secrets when needed via CLI      |
| **Session-only exposure** | Environment variables, not persisted      |
| **Pre-commit protection** | Hooks detect accidental secret commits    |
| **Minimal permissions**   | Claude Code has no credential file access |

---

## Bitwarden CLI Setup

### Step 1: Install Bitwarden CLI

```bash
# macOS
brew install bitwarden-cli

# Verify installation
bw --version
```

### Step 2: Login to Bitwarden

```bash
# Standard login
bw login

# For SSO-enabled accounts
bw login --sso

# Verify login status
bw status
```

### Step 3: Unlock Your Vault

```bash
# Unlock and capture session key
export BW_SESSION=$(bw unlock --raw)

# Verify access
bw list folders --session $BW_SESSION
```

### Step 4: Create Vault Folder

Create a dedicated folder for ArchitectKB secrets:

```bash
# Create folder (if it doesn't exist)
bw create folder '{"name":"Obsidian Vault"}' --session $BW_SESSION

# Verify folder creation
bw list folders --session $BW_SESSION | jq -r '.[].name'
```

### Step 5: Add Shell Convenience (Optional)

Add to `~/.zshrc` or `~/.bashrc`:

```bash
# Quick unlock alias
alias bw-unlock='export BW_SESSION=$(bw unlock --raw)'

# Status check function
bw-status() {
    bw status | jq -r '"Status: \(.status)"'
}
```

---

## Using the `/secrets` Skill

### Check Status

```
/secrets status
```

Reports:

- CLI installation status
- Login state
- Vault lock status
- Configured folder

### Retrieve a Secret

```
/secrets get <name>
```

**Example:**

```
/secrets get "Anthropic API Key"
```

Returns the secret value for immediate copying. **Never stored in files or history.**

### List All Secrets

```
/secrets list
```

Shows all items in your configured Bitwarden folder:

```
Name                    Type
----                    ----
Anthropic API Key       note
GitHub PAT              note
AWS Access Key          login
Notion Token            note
```

### Export as Environment Variables

```
/secrets env
```

Generates export commands:

```bash
# Bitwarden secrets for your vault
# Run: eval "$(/secrets env)" or copy/paste below

export ANTHROPIC_API_KEY="sk-ant-..."
export GITHUB_PAT="ghp_..."
export NOTION_TOKEN="secret_..."

# These are session-only - not persisted to disk
```

**Usage:**

```bash
# Direct evaluation (careful - secrets in shell history)
eval "$(/secrets env)"

# Safer: Copy specific exports manually
```

### Initial Setup

```
/secrets setup
```

Guides you through complete Bitwarden CLI setup with step-by-step instructions.

---

## Environment Variable Naming

| Bitwarden Item Name | Environment Variable    |
| ------------------- | ----------------------- |
| Anthropic API Key   | `ANTHROPIC_API_KEY`     |
| OpenAI Key          | `OPENAI_API_KEY`        |
| GitHub PAT          | `GITHUB_PAT`            |
| AWS Access Key      | `AWS_ACCESS_KEY_ID`     |
| AWS Secret Key      | `AWS_SECRET_ACCESS_KEY` |
| Notion Token        | `NOTION_TOKEN`          |
| Confluence Token    | `CONFLUENCE_TOKEN`      |

---

## Pre-Commit Hooks

### detect-secrets Setup

Install the detect-secrets tool:

```bash
pip install detect-secrets
```

Create baseline file:

```bash
detect-secrets scan > .secrets.baseline
```

Add to `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ["--baseline", ".secrets.baseline"]
```

Install hooks:

```bash
pre-commit install
```

### Private Key Detection

The pre-commit configuration also catches:

- SSH private keys (RSA, DSA, EC key headers)
- PGP private keys
- AWS credentials patterns
- API key patterns (`sk-`, `ghp_`, etc.)

### Allowlist False Positives

If you have intentional patterns (like documentation examples):

```python
# pragma: allowlist secret
api_key = "example-not-real-key"
```

---

## Claude Code Security Hooks

### secret-detection.py

This hook runs before Claude Code can read files:

```python
#!/usr/bin/env python3
"""Block reading files that may contain secrets."""

import sys
import re

BLOCKED_PATTERNS = [
    r'\.env$',
    r'\.env\.local$',
    r'credentials\.json$',
    r'secrets\.yaml$',
    r'\.pem$',
    r'\.key$',
]

def check_file(filepath):
    for pattern in BLOCKED_PATTERNS:
        if re.search(pattern, filepath):
            print(f"BLOCKED: {filepath} matches secret pattern")
            return False
    return True

if __name__ == '__main__':
    filepath = sys.argv[1]
    sys.exit(0 if check_file(filepath) else 1)
```

### file-protection.py

Protects sensitive directories:

```python
#!/usr/bin/env python3
"""Prevent modifications to protected paths."""

import sys

PROTECTED_PATHS = [
    '.env',
    '.secrets',
    'credentials/',
    '.aws/',
]

def is_protected(filepath):
    return any(filepath.startswith(p) for p in PROTECTED_PATHS)

if __name__ == '__main__':
    filepath = sys.argv[1]
    if is_protected(filepath):
        print(f"PROTECTED: Cannot modify {filepath}")
        sys.exit(1)
    sys.exit(0)
```

### Claude Code Settings

Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "preRead": ["python3 .claude/hooks/secret-detection.py"],
    "preWrite": ["python3 .claude/hooks/file-protection.py"]
  }
}
```

---

## Migrating Existing Secrets

If you have secrets in Atomic Notes or other files:

### Step 1: Export to CSV

Use the migration script:

```bash
node scripts/migrate-to-bitwarden.cjs
```

This generates `bitwarden-import.csv` with:

```csv
folder,favorite,type,name,notes,login_uri,login_username,login_password
Obsidian Vault,,2,Anthropic API Key,sk-ant-...,,,
```

### Step 2: Import to Bitwarden

```bash
bw import bitwardencsv bitwarden-import.csv --session $BW_SESSION
```

### Step 3: Verify Import

```bash
/secrets list
```

### Step 4: Secure Cleanup

**CRITICAL:** Remove all traces of secrets from files:

```bash
# Delete the CSV immediately
rm -P bitwarden-import.csv

# Remove secrets from git history if committed
# (Requires git filter-branch or BFG Repo-Cleaner)

# Rotate any credentials that were in git
```

### Step 5: Delete Original Files

After verifying Bitwarden import:

```bash
# Archive or delete Atomic Notes containing secrets
/archive "Atomic Note - API Keys"
```

---

## Best Practices

### Do

- ✅ Use Bitwarden for all credentials
- ✅ Set `BW_SESSION` at start of each terminal session
- ✅ Use environment variables in scripts
- ✅ Rotate credentials after any exposure
- ✅ Keep `.secrets.baseline` updated
- ✅ Review pre-commit hook output

### Don't

- ❌ Store credentials in `.env` files in the vault
- ❌ Hardcode API keys in scripts
- ❌ Commit secrets even temporarily
- ❌ Share `BW_SESSION` tokens
- ❌ Disable pre-commit hooks
- ❌ Keep CSV exports after import

### Script Integration

**Python:**

```python
import os

api_key = os.environ.get('ANTHROPIC_API_KEY')
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY not set. Run: /secrets env")
```

**JavaScript/Node.js:**

```javascript
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  throw new Error("ANTHROPIC_API_KEY not set. Run: /secrets env");
}
```

**Bash:**

```bash
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "ANTHROPIC_API_KEY not set. Run: /secrets env"
    exit 1
fi
```

---

## Troubleshooting

### "Bitwarden CLI not found"

**Problem:** `bw` command not recognised

**Solution:**

```bash
brew install bitwarden-cli
# Or check PATH
which bw
```

### "Vault is locked"

**Problem:** Commands fail with lock error

**Solution:**

```bash
export BW_SESSION=$(bw unlock --raw)
```

### "Item not found"

**Problem:** `/secrets get` can't find item

**Solutions:**

1. Check exact name:

   ```bash
   /secrets list
   ```

2. Verify folder:

   ```bash
   bw list folders --session $BW_SESSION
   ```

3. Check item is in correct folder in Bitwarden app

### "Session expired"

**Problem:** Commands fail after period of inactivity

**Solution:**

```bash
# Re-unlock vault
export BW_SESSION=$(bw unlock --raw)
```

### "Pre-commit hook failed"

**Problem:** Commit blocked by detect-secrets

**Solutions:**

1. Remove the secret from the file
2. If false positive, add to allowlist:
   ```python
   # pragma: allowlist secret
   ```
3. Update baseline if pattern changed:
   ```bash
   detect-secrets scan --update .secrets.baseline
   ```

---

## Security Audit Checklist

Run this quarterly:

- [ ] Review Bitwarden folder contents
- [ ] Rotate credentials older than 90 days
- [ ] Check for secrets in git history
- [ ] Update detect-secrets baseline
- [ ] Verify pre-commit hooks are active
- [ ] Test `/secrets` commands work
- [ ] Review Claude Code hook settings

---

## Quick Reference

### Daily Workflow

```bash
# Start of day
export BW_SESSION=$(bw unlock --raw)

# When scripts need credentials
eval "$(/secrets env)"

# Check specific secret
/secrets get "API Key Name"
```

### Setup Commands

```bash
# Install
brew install bitwarden-cli

# Login
bw login

# Unlock
export BW_SESSION=$(bw unlock --raw)

# Create folder
bw create folder '{"name":"Obsidian Vault"}' --session $BW_SESSION
```

### Skill Commands

| Command               | Purpose                      |
| --------------------- | ---------------------------- |
| `/secrets status`     | Check CLI and session status |
| `/secrets get <name>` | Retrieve specific secret     |
| `/secrets list`       | List all vault secrets       |
| `/secrets env`        | Export as environment vars   |
| `/secrets setup`      | Guided initial setup         |

---

## Related Guides

- [Page - Claude Code Skills Quick Reference](Page%20-%20Claude%20Code%20Skills%20Quick%20Reference.md) - All skills reference
- [Page - How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md) - General vault usage
- [Page - Claude Code with AWS Bedrock Guide](Page%20-%20Claude%20Code%20with%20AWS%20Bedrock%20Guide.md) - AWS credential setup
