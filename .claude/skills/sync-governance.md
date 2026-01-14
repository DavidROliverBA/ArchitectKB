# Sync Governance

Synchronise policies, guardrails, and external ADRs from your issue tracking system to the vault.

## Usage

```
/sync-governance                    # Incremental sync (changes since last sync)
/sync-governance --full             # Full sync (re-fetch everything)
/sync-governance --check            # Check for updates without syncing
/sync-governance --type policies    # Sync only policies
/sync-governance --type guardrails  # Sync only guardrails
/sync-governance --type adrs        # Sync only external ADRs
```

## Overview

This skill pulls governance content from your issue tracking system into the vault for:
- **Offline access** during architecture work
- **Cross-referencing** with local ADRs and projects
- **AI-assisted analysis** when creating new designs
- **Version tracking** to detect policy changes

## Prerequisites

1. Atlassian MCP plugin connected and authenticated
2. `.claude/sync/manifest.json` exists (created on first run)
3. `+Sync/` folder structure exists

## Source Configuration

The manifest defines what to sync from your issue tracking system:

| Source | your issue tracking system Query | Local Path |
|--------|------------------|------------|
| Policies | `label = 'governance-policy'` | `+Sync/Policies/` |
| Guardrails | `label = 'governance-guardrail'` OR pages in guardrail directories | `+Sync/Guardrails/` |
| Organisational ADRs | `label = 'Approved_Architecture_ADR'` OR `label = 'Approved_Technology_Guardrail'` | `+Sync/Org-ADRs/` |

### Key your issue tracking system Spaces

| Space | Key | Content |
|-------|-----|---------|
| BA Architecture and Engineering | BAAandE | ADR Process, Guardrails Directory |
| BA Digital Operating Model | BDOC | Guardrail Templates, Governance |
| BC3 Framework | BC3 | Delivery Guardrails, Templates |
| ODIE/Integration | IO | Data Product Guardrails |

### Key Source Pages

| Page | ID | Purpose |
|------|-----|---------|
| Directory of Architecture Guardrails | 65405808 | Master list of architecture guardrails |
| Directory of Technology Guardrails | 65405938 | Master list of technology guardrails |
| How an ADR becomes a Guardrail | 65415886 | Process documentation |
| Guardrail - Template | 73040191 | Template for creating guardrails |

## Workflow

### Step 1: Initialise

```
Read .claude/sync/manifest.json
If not exists:
  Create +Sync/ folder structure
  Create initial manifest with default sources
```

### Step 2: Query for Updates

For each source in manifest, use Atlassian MCP:

```javascript
// Example: Find all architecture guardrails
searchyour issue tracking systemUsingCql(
  cloudId: "c1f0e5f8-ba19-4251-8d78-db300e0715bf",
  cql: "label = 'Approved_Architecture_Guardrail' AND type = 'page'",
  limit: 100
)

// Example: Find pages in guardrails directory
getyour issue tracking systemPageDescendants(
  cloudId: "c1f0e5f8-ba19-4251-8d78-db300e0715bf",
  pageId: "65405808"  // Directory of Architecture Guardrails
)
```

### Step 3: Compare Versions

For each page returned:
- Check if page ID exists in `manifest.pages`
- Compare your issue tracking system version number to stored version
- Categorise as: **new**, **updated**, or **unchanged**

### Step 4: Fetch Changed Content

For each new/updated page:

```javascript
getyour issue tracking systemPage(
  cloudId: "c1f0e5f8-ba19-4251-8d78-db300e0715bf",
  pageId: "<page-id>",
  contentFormat: "markdown"
)
```

### Step 5: Convert to Vault Format

Create note with appropriate frontmatter based on content type:

**Policy Note:**
```yaml
---
type: Policy
title: <page title>
source: confluence
sourceSpace: <space key>
sourcePageId: "<page id>"
sourceVersion: <version number>
sourceUrl: <confluence URL>
lastSynced: <ISO timestamp>
owner: <from page metadata or content>
status: active
effectiveDate: <if found in content>
reviewDate: <if found in content>
readOnly: true
tags: [policy, synced, <derived tags>]
---

> [!warning] Read-Only Sync
> This content is synced from your issue tracking system. Do not edit locally.
> Source: [<title>](<url>) | Version: <version> | Synced: <date>

<converted markdown content>
```

**Guardrail Note:**
```yaml
---
type: Guardrail
title: <page title>
source: confluence
sourceSpace: <space key>
sourcePageId: "<page id>"
sourceVersion: <version number>
sourceUrl: <confluence URL>
lastSynced: <ISO timestamp>
owner: <from content>
scope: <derived from content: aws | azure | data | security | integration | delivery>
status: active
readOnly: true
tags: [guardrail, synced, <derived tags>]
---
```

**Organisational ADR Note (synced from your issue tracking system):**
```yaml
---
type: Adr
title: <page title>
status: <mirrors your issue tracking system status: proposed | accepted | deprecated>
adrType: Architecture_ADR | Technology_ADR

# Source/Provenance (synced)
source: confluence
sourcePageId: "<page id>"
sourceSpace: <space key>
sourceUrl: <confluence URL>
sourceVersion: <version number>

# Sync metadata
lastSynced: <ISO timestamp>
readOnly: true

# Authority (derived from scope/labels)
authority: team | organizational      # Based on whether it's a guardrail or team decision

# Standard ADR fields
deciders: []
approvers: []
stakeholders: []
relatedTo: []
dependsOn: []

# Quality
confidence: high                      # Published ADRs are authoritative
freshness: current
verified: true

tags: [adr, synced, <derived tags>]
---
```

### Step 6: Write Files and Update Manifest

1. Write markdown file to appropriate `+Sync/` subfolder
2. Update `manifest.pages` entry with:
   - New version number
   - Sync timestamp
   - Local file path
   - Content hash (for change detection)
3. Update `manifest.lastFullSync` timestamp
4. Update `manifest.stats` counters

### Step 7: Handle Deletions (Optional)

Pages in manifest but not returned from your issue tracking system:
- Mark local file with `status: archived` in frontmatter
- Add `archivedReason: "Removed from your issue tracking system"`
- Move to `+Sync/_archived/` or leave in place with warning

### Step 8: Generate Summary

Output sync results:

```markdown
## Governance Sync Complete

**Synced at:** 2026-01-11 10:30
**Duration:** 45 seconds

| Type | New | Updated | Unchanged | Archived |
|------|-----|---------|-----------|----------|
| Policies | 0 | 1 | 8 | 0 |
| Guardrails | 2 | 0 | 15 | 0 |
| Organisational ADRs | 1 | 3 | 42 | 1 |

### Changes Detected

**Updated:**
- 📋 Policy - SAS1 Integration Standards (v2 → v3)
  - [View in your issue tracking system](https://...)

**New:**
- 🚧 Guardrail - GR5 AI Model Governance
- 🚧 Guardrail - GR6 Third Party Data Sharing
- 📐 External ADR - Bedrock Model Selection

**Archived:**
- 📐 ~~External ADR - Legacy API Pattern~~ (removed from your issue tracking system)

### Action Required
- Review updated Policy - SAS1 for impact on current projects
```

## Scheduling Integration

### With Daily Note

The `/daily` skill can check sync freshness:

```markdown
## In /daily skill, add section:

### Governance Freshness Check

Read manifest.lastFullSync
If older than 24 hours:
  Display: "⚠️ Governance content last synced X hours ago"
  Offer: "Run /sync-governance to update"
```

### Staleness Check Before ADR Creation

The `/adr` skill should check freshness:

```markdown
## Before creating ADR:

If manifest.lastFullSync > 24 hours:
  Warn: "Governance policies may be stale. Sync first?"
```

## Manifest Schema

`.claude/sync/manifest.json`:

```json
{
  "version": "1.0",
  "lastFullSync": "2026-01-11T06:00:00Z",
  "cloudId": "c1f0e5f8-ba19-4251-8d78-db300e0715bf",
  "sources": [
    {
      "name": "Architecture Guardrails",
      "type": "guardrails",
      "method": "descendants",
      "rootPageId": "65405808",
      "localPath": "+Sync/Guardrails/Architecture/",
      "filenamePattern": "Guardrail - {title}.md"
    },
    {
      "name": "Technology Guardrails",
      "type": "guardrails",
      "method": "descendants",
      "rootPageId": "65405938",
      "localPath": "+Sync/Guardrails/Technology/",
      "filenamePattern": "Guardrail - {title}.md"
    },
    {
      "name": "Approved ADRs",
      "type": "adrs",
      "method": "label",
      "cql": "label = 'Approved_Architecture_ADR' AND type = 'page'",
      "localPath": "+Sync/Org-ADRs/",
      "filenamePattern": "ADR - {title}.md"
    }
  ],
  "pages": {
    "65415886": {
      "title": "How an ADR becomes a Guardrail",
      "space": "BAAandE",
      "version": 12,
      "type": "process",
      "localFile": "+Sync/Process/Process - How an ADR becomes a Guardrail.md",
      "lastSynced": "2026-01-11T06:00:00Z",
      "hash": "abc123def456"
    }
  },
  "stats": {
    "totalPolicies": 12,
    "totalGuardrails": 23,
    "totalAdrs": 45,
    "lastChangeDetected": "2026-01-10T14:30:00Z"
  }
}
```

## First Run Setup

On first run when no manifest exists:

1. Create folder structure:
   ```
   +Sync/
   ├── Policies/
   ├── Guardrails/
   │   ├── Architecture/
   │   └── Technology/
   ├── Org-ADRs/
   ├── Process/
   └── _archived/
   ```

2. Create initial `manifest.json` with relevant sources

3. Perform full sync

4. Report initial inventory

## Error Handling

| Error | Action |
|-------|--------|
| Atlassian auth failure | Prompt to re-authenticate |
| Page not accessible | Skip and log warning |
| Rate limit hit | Pause and retry with backoff |
| Malformed content | Skip page, log error |
| Write failure | Abort sync, preserve manifest |

## Related

- [[Incubator - Architecture as Code]]
- [[Incubator Note - Using Atlassian MCP for Policies]]
- [[Incubator - How to Develop a Guardrail]]
- [[Page - How an ADR becomes a Guardrail]] (synced from your issue tracking system)
