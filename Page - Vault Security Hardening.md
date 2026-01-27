---
type: Page
title: Vault Security Hardening
created: 2026-01-27
modified: 2026-01-27
tags: [domain/security, activity/governance, activity/documentation]
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-27
---

# Vault Security Hardening

This page documents the security hardening measures available for this Obsidian vault to prevent credential exposure and improve overall security posture.

## Why Security Hardening Matters

Obsidian vaults synced via Git are particularly vulnerable to credential exposure:

- **Accidental commits**: API keys stored in notes can be committed to git history
- **History persistence**: Even deleted files remain in git history indefinitely
- **Plugin data**: Some plugins cache content including sensitive information
- **Sync services**: Cloud sync may expose credentials to third parties

This guide provides a defence-in-depth approach with multiple layers of protection.

## Implemented Security Controls

### 1. Secret Detection Hook (UserPromptSubmit)

**File**: `.claude/hooks/secret-detection.py`

Scans user prompts before they're sent to Claude for:

- API keys (OpenAI, Anthropic, AWS, GitHub, Azure, Google Cloud)
- Authentication tokens (Notion, Atlassian, Slack)
- Database connection strings
- Private keys (PEM format)
- High-entropy credential patterns

**How it works**: When you type a prompt containing a pattern matching a known secret format, the hook blocks the request and warns you before the secret is sent.

### 2. File Protection Hook (PreToolUse)

**File**: `.claude/hooks/file-protection.py`

Blocks creation/editing of files that:

- Match protected path patterns (`.env`, `.ssh/`, lock files, etc.)
- Contain sensitive keywords in filenames (`api key`, `password`, `secret`, `token`, etc.)

**Allowed Exceptions**: Legitimate security tool files (`.secrets.baseline`, `secret-detection.py`, etc.)

### 3. Secret File Scanner Hook (PreToolUse)

**File**: `.claude/hooks/secret-file-scanner.py`

Scans the _content_ being written to files for:

- Actual API key patterns (not just the words)
- Private key headers
- Token formats

Skips documentation files that legitimately reference these patterns.

### 4. Enhanced .gitignore

Add patterns to prevent accidental commits:

```gitignore
# Secret notes by pattern
**/Atomic Note - *API*Key*.md
**/Atomic Note - *Password*.md
**/Atomic Note - *Token*.md
**/Atomic Note - *Secret*.md
**/Atomic Note - *Credential*.md

# Plugin caches with embeddings
.smart-env/
.data/

# Local configuration
.claude/config.local.json
.env*

# Temporary files that might contain secrets
*.tmp
*.bak
```

### 5. Pre-commit Framework

**Files**:

- `.pre-commit-config.yaml` - Hook configuration
- `.secrets.baseline` - detect-secrets baseline

Hooks include:

- `detect-secrets` - Scans for secrets using multiple detectors
- `check-added-large-files` - Prevents accidental large file commits
- `detect-private-key` - Catches PEM key files
- `no-commit-to-branch` - Prevents direct commits to main

**Setup**:

```bash
pip install pre-commit detect-secrets
pre-commit install
detect-secrets scan > .secrets.baseline  # Generate baseline
```

### 6. Externalised Configuration

Sensitive configuration values should be loaded from:

- **Primary**: `.claude/config.local.json` (gitignored)
- **Fallback**: Environment variables
- **Default**: Hardcoded defaults (for non-sensitive values only)

**Template**: `.claude/config.local.template.json`

---

## Initial Setup Guide

### Step 1: Install Pre-commit Hooks

```bash
# Install the pre-commit framework
pip install pre-commit detect-secrets

# Install hooks in your repository
pre-commit install

# Generate initial secrets baseline
detect-secrets scan > .secrets.baseline
```

### Step 2: Set Up Bitwarden CLI

```bash
# Install Bitwarden CLI
brew install bitwarden-cli

# Login to your Bitwarden account
bw login

# Unlock vault for current session
export BW_SESSION=$(bw unlock --raw)

# Verify access
bw list folders --session $BW_SESSION
```

### Step 3: Create Local Configuration

```bash
# Copy template
cp .claude/config.local.template.json .claude/config.local.json

# Edit with your settings (this file is gitignored)
```

### Step 4: Migrate Existing Secrets (if applicable)

If you have existing notes containing credentials:

```bash
# Preview what would be migrated
node scripts/migrate-to-bitwarden.cjs --dry-run

# Generate Bitwarden CSV
node scripts/migrate-to-bitwarden.cjs

# Import to Bitwarden
bw import bitwardencsv bitwarden-import.csv

# CRITICAL: Delete the CSV immediately (contains plaintext!)
rm bitwarden-import.csv

# Delete original notes from vault
# Then clean git history with BFG (see below)
```

---

## The `/secrets` Skill

The `/secrets` skill provides secure access to credentials stored in Bitwarden:

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `/secrets status`     | Check Bitwarden CLI installation and session |
| `/secrets get <name>` | Retrieve a specific secret                   |
| `/secrets list`       | List all vault secrets                       |
| `/secrets env`        | Generate environment variable exports        |
| `/secrets setup`      | Initial Bitwarden CLI setup                  |

### Typical Workflow

```bash
# 1. Start of session - unlock Bitwarden
export BW_SESSION=$(bw unlock --raw)

# 2. Set environment variables (copy output to terminal)
/secrets env

# 3. Scripts now have access to credentials via env vars
python scripts/your_script.py  # Uses environment variables
```

### Environment Variable Naming Convention

| Bitwarden Item Name | Environment Variable    |
| ------------------- | ----------------------- |
| Your API Key        | `YOUR_API_KEY`          |
| Service Token       | `SERVICE_TOKEN`         |
| Database Password   | `DATABASE_PASSWORD`     |
| AWS Access Key      | `AWS_ACCESS_KEY_ID`     |
| AWS Secret Key      | `AWS_SECRET_ACCESS_KEY` |

Names are converted: spaces to underscores, uppercase, hyphens to underscores.

### Scripts Integration

All scripts should read from environment variables:

**Python**:

```python
import os

api_key = os.environ.get('YOUR_API_KEY')
if not api_key:
    raise ValueError("YOUR_API_KEY not set. Run: /secrets env")
```

**JavaScript/Node.js**:

```javascript
const apiKey = process.env.YOUR_API_KEY;
if (!apiKey) {
  throw new Error("YOUR_API_KEY not set. Run: /secrets env");
}
```

**Bash**:

```bash
if [ -z "$YOUR_API_KEY" ]; then
    echo "YOUR_API_KEY not set. Run: /secrets env"
    exit 1
fi
```

See `.claude/skills/secrets.md` for full documentation.

---

## Cleaning Git History

If secrets have been committed to git history, use BFG Repo Cleaner:

```bash
# Install BFG
brew install bfg

# Clone a mirror of your repository
git clone --mirror <your-repo-url> repo.git

# Remove files matching patterns
bfg --delete-files "Atomic Note - *API*Key*.md" repo.git
bfg --delete-files "Atomic Note - *Password*.md" repo.git
bfg --delete-files "Atomic Note - *Token*.md" repo.git

# Clean up
cd repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (CAUTION: rewrites history for all collaborators)
git push --force
```

**WARNING**: After cleaning git history:

1. All collaborators must re-clone the repository
2. Any exposed credentials should be rotated immediately
3. Check that no backups contain the old history

---

## Migration Script

The `scripts/migrate-to-bitwarden.cjs` script helps migrate credentials from Atomic Notes to Bitwarden:

**Features**:

- Finds all Atomic Notes with `classification: secret` or `classification: confidential`
- Exports to Bitwarden-compatible CSV format
- Places items in an "Obsidian Vault" folder in Bitwarden
- Supports dry-run mode for preview

**Usage**:

```bash
# Preview what would be migrated
node scripts/migrate-to-bitwarden.cjs --dry-run

# Generate import file
node scripts/migrate-to-bitwarden.cjs

# Custom output location
node scripts/migrate-to-bitwarden.cjs --output /path/to/output.csv
```

**After migration**:

1. Review the generated CSV file
2. Import to Bitwarden: `bw import bitwardencsv bitwarden-import.csv`
3. Verify items appear in Bitwarden
4. DELETE the CSV file immediately (contains plaintext!)
5. Delete the original Atomic Notes from the vault
6. Run BFG to clean git history

---

## Best Practices

1. **Never store credentials in Obsidian notes** - Use a password manager instead
2. **Use environment variables** - Scripts read credentials from env vars, not files
3. **Use `/secrets` skill** - Retrieve credentials from Bitwarden when needed
4. **Check before commit** - Run `pre-commit run --all-files` manually
5. **Use config.local.json** - For environment-specific but non-secret config
6. **Review hooks regularly** - Update patterns as new services are used
7. **Rotate credentials** - If any credential was ever in git history, rotate it

---

## Verification Checklist

Use this checklist to verify your vault is properly hardened:

### Initial Setup

- [ ] Pre-commit framework installed (`pip install pre-commit detect-secrets`)
- [ ] Pre-commit hooks installed (`pre-commit install`)
- [ ] Secrets baseline generated (`.secrets.baseline` exists)
- [ ] `.gitignore` updated with secret patterns
- [ ] Bitwarden CLI installed and configured

### Secret Migration (if applicable)

- [ ] Existing secret notes identified
- [ ] Secrets migrated to Bitwarden
- [ ] Import CSV deleted after migration
- [ ] Original Atomic Notes deleted from vault
- [ ] Git history cleaned with BFG
- [ ] Compromised credentials rotated

### Ongoing Verification

- [ ] `pre-commit run --all-files` passes
- [ ] No `.env` files in repository
- [ ] `.smart-env/` and `.data/` not tracked
- [ ] `/secrets` skill working correctly
- [ ] Environment variables loading properly

### Hook Verification

Test each hook is working:

```bash
# Test pre-commit hooks
pre-commit run --all-files

# Verify git hooks are installed
ls -la .git/hooks/

# Test secret detection (should block)
echo "api_key = 'sk-abc123...'" > test-secret.md
git add test-secret.md
git commit -m "test"  # Should fail
rm test-secret.md
```

---

## Troubleshooting

### Pre-commit hooks not running

```bash
# Reinstall hooks
pre-commit uninstall
pre-commit install
```

### Bitwarden session expired

```bash
# Re-unlock vault
export BW_SESSION=$(bw unlock --raw)
```

### False positives in secret detection

Add to `.secrets.baseline`:

```bash
# Regenerate baseline to include false positives
detect-secrets scan --baseline .secrets.baseline
```

Or add inline comment to exclude:

```python
api_key = "example-not-real-key"  # pragma: allowlist secret
```

---

## Related

- [[CLAUDE.md]] - Main vault guide with security warning
- `.claude/skills/secrets.md` - Full `/secrets` skill documentation
- `.claude/hooks/` - Security hook implementations
- `scripts/migrate-to-bitwarden.cjs` - Migration script
