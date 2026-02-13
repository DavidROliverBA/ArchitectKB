# /system-sync Skill

Sync systems and architecture data with external sources (CMDB, Confluence, ServiceNow, Jira).

## When to Use This Skill

Use `/system-sync` when you need to:
- Sync system metadata from enterprise CMDB
- Sync architecture documentation from Confluence
- Sync ADRs from organization governance systems
- Synchronize with multiple data sources
- Create single source of truth for architecture data
- Validate vault data against authoritative sources
- Detect drift between local and remote definitions

## Usage

```
/system-sync <source> [filter] [options]
```

### Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `source` | Data source (cmdb, confluence, servicenow, jira, all) | Yes |
| `filter` | Filter by type, tag, or search term | Optional |
| `--mode` | Sync mode (fetch, validate, merge, publish) | Optional |
| `--direction` | Direction (pull, push, bidirectional) | Optional |
| `--dry-run` | Preview changes without applying | Optional |

## Supported Sources

### 1. CMDB (Configuration Management Database)

**Typical source:** ServiceNow CMDB, BMC CMDB, or custom CMDB

**What syncs:**
- Systems (name, type, owner, environment)
- System dependencies (connectsTo relationships)
- System metadata (IP addresses, hosts, ports)
- Deployment information (which account/region)
- Operational contacts (on-call, support)

**Examples:**
```
/system-sync cmdb --filter "type:Application"          # Sync all applications
/system-sync cmdb --filter "environment:production"    # Production systems only
/system-sync cmdb --dry-run                            # Preview changes
```

### 2. Confluence

**Typical source:** YourOrg Enterprise Confluence (wiki documentation)

**What syncs:**
- Architecture documentation (HLD, LLD, ADRs)
- System catalogs and inventories
- Integration documentation
- Governance policies and guardrails
- Strategic roadmaps
- Decision records

**Examples:**
```
/system-sync confluence --filter "space:ARCHITECTURE"  # All architecture docs
/system-sync confluence --filter "label:adr"           # All ADRs
/system-sync confluence --dry-run
```

### 3. ServiceNow

**Typical source:** YourOrg Service Management (change, incident, CMDB)

**What syncs:**
- Service mappings (services and supporting CIs)
- Change calendars (what's changing when)
- Incident history (what systems failed when)
- Change management data (deployments, cutover plans)
- SLA definitions

**Examples:**
```
/system-sync servicenow --filter "service:DataPlatform"        # DataPlatform service and dependents
/system-sync servicenow --mode validate                # Check for conflicts
```

### 4. Jira

**Typical source:** YourOrg Engineering Jira (projects, issues, roadmaps)

**What syncs:**
- Project metadata (status, team, roadmap)
- Epic/Feature definitions
- ADRs as Jira records
- Technology decisions from issues
- Release planning

**Examples:**
```
/system-sync jira --filter "project:MyDataIntegration"            # MyDataIntegration project info
/system-sync jira --filter "type:ADR"                  # ADRs in Jira
```

## Sync Modes

### 1. Fetch (Pull from Source)

```
/system-sync cmdb --mode fetch
```

**What happens:**
1. Queries source system
2. Reads all matching records
3. Creates/updates local notes
4. Marks records with `source: cmdb`, `lastSynced: <timestamp>`
5. Preserves local edits (non-authoritative fields)

**Local fields preserved:**
- Analysis and commentary
- Architecture context
- Decision rationale
- Local relationships

**Remote fields updated:**
- System name, type, owner
- Dependencies and relationships
- Metadata (IP addresses, hosts)
- Contact information

### 2. Validate (Check for Conflicts)

```
/system-sync cmdb --mode validate
```

**What happens:**
1. Queries source system
2. Compares with local notes
3. Reports discrepancies:
   - System exists locally but not in CMDB
   - System exists in CMDB but not locally
   - Metadata differs (owner, criticality, etc.)
   - Dependencies differ
4. Generates validation report

**Output example:**
```
Validation Results: CMDB
────────────────────────────────
Total Systems: 25
✓ In Sync: 22
⚠ Out of Sync: 2
✗ Inconsistent: 1

Out of Sync:
- SAP S/4HANA
  • Local: criticality=critical
  • CMDB: criticality=high
  • Action: Update local or CMDB

Inconsistent:
- DataPlatform
  • Local: owner=John Smith
  • CMDB: owner=Data Platform Team
  • Action: Investigate
```

### 3. Merge (Bidirectional Reconciliation)

```
/system-sync cmdb --mode merge --dry-run
```

**What happens:**
1. Compares local and remote
2. Merges data intelligently:
   - Takes more recent data
   - Preserves local analysis/context
   - Updates relationships
3. Resolves conflicts interactively
4. Creates merged records

**Conflict resolution:**
- If local and remote both changed: User chooses which to keep
- If only local changed: Keeps local
- If only remote changed: Takes remote
- If both unchanged: No action needed

### 4. Publish (Push to Source)

```
/system-sync confluence --mode publish
```

**What happens:**
1. Reads local notes (System, Integration, Architecture)
2. Converts to target format (Confluence pages, Jira issues, etc.)
3. Creates/updates records in target system
4. Tracks publication in `publishedUrl` field

**Publication options:**
- Create new pages/records (if not published before)
- Update existing (if already published)
- Archive deprecated records

## Workflow

### Phase 1: Configure Source

User specifies:

1. **Source system**
   - CMDB, Confluence, ServiceNow, or Jira
   - Which instance/environment
   - Authentication credentials (OAuth token, API key)

2. **Sync filter**
   - Which records to sync (type, tag, search)
   - Optionally: Which fields to sync

3. **Sync mode**
   - Fetch (pull), Validate (check), Merge (reconcile), Publish (push)

4. **Dry-run?**
   - Preview changes without applying

### Phase 2: Execute Sync

The skill:

1. Connects to source
2. Queries records matching filter
3. For each record:
   - Find matching local note (by ID, name, or fuzzy match)
   - Apply sync mode (fetch/validate/merge/publish)
   - Track changes

4. Creates sync report showing:
   - Records processed
   - Records created
   - Records updated
   - Records with conflicts
   - Errors (if any)

### Phase 3: Review and Confirm

If dry-run:
1. Show preview of all changes
2. User confirms or cancels
3. If confirmed, apply changes for real

If not dry-run:
1. Apply changes immediately
2. Show summary report

### Phase 4: Post-Sync Actions

Optionally:
1. Create summary notes for new systems
2. Generate diagrams for new architectures
3. Trigger validation queries (e.g., find orphaned notes)
4. Notify stakeholders of sync results

## Examples

### Example 1: Fetch CMDB Systems

```
/system-sync cmdb --filter "type:Application" --dry-run
```

**Preview Output:**
```
Sync Mode: Fetch (Pull from CMDB)
Filter: type="Application"
Dry-Run: Yes (preview only)

Proposed Changes:
────────────────
Create (New):
  ✓ ServiceNow (Service Management)
  ✓ Splunk (Log Management)

Update (Existing):
  ✓ SAP S/4HANA (update criticality: high → critical)
  ✓ DataPlatform (update owner, contacts)
  ✓ Snowflake (update deployment region)

Total: 5 records affected
```

**User confirms → Changes applied:**
- Creates 2 new System notes
- Updates 3 existing System notes
- All marked with `source: cmdb`, `lastSynced: 2026-01-14T14:32:00Z`

### Example 2: Validate Confluence Architecture Docs

```
/system-sync confluence --filter "label:architecture" --mode validate
```

**Output:**
```
Validation Mode: Confluence Architecture Documentation
Filter: label="architecture"

Results:
────────
✓ In Sync: 8 ADRs
⚠ Out of Sync: 2 pages
✗ Missing: 1 page not in local vault

Out of Sync Details:
- "ADR - API Gateway Selection"
  • Confluence version: 5 (2026-01-10)
  • Local version: 4 (2026-01-08)
  • Recommendation: Fetch latest from Confluence

- "Architecture - Data Integration Platform"
  • Confluence: Minor edits only
  • Local: Significant additions (new scenarios)
  • Recommendation: Publish local version to Confluence

Missing from Vault:
- "Page - Authorization Strategy Review"
  • Last modified: 2025-12-15
  • Status: Active
  • Recommendation: Fetch into vault
```

### Example 3: Publish Local ADRs to Confluence

```
/system-sync confluence --filter "type:Adr" --mode publish --direction push
```

**Output:**
```
Publication Mode: Local → Confluence
Filter: type="Adr"

Proposed Actions:
─────────────────
Create New Pages (Not Published):
  ✓ ADR - Snowflake as Analytics Warehouse
  ✓ ADR - Looker vs Tableau Selection
  ✓ ADR - Real-time Streaming Architecture

Update Existing Pages (Already Published):
  ✓ ADR - API Gateway Selection (version 5 → 6)
  ✓ ADR - SAP to AWS Connectivity (version 3 → 4)

Archive Deprecated (in Confluence, mark as deprecated):
  ✓ ADR - Tableau BI Platform (superseded by Looker)

Total: 10 pages affected
```

**User confirms → Published to Confluence**

### Example 4: Bidirectional Merge with CMDB

```
/system-sync cmdb --mode merge
```

**Intelligent merge:**
- CMDB has updated system criticality → Update local
- Local has updated system owner in Confluence → Keep local
- Both have different SLA definitions → User resolves conflict

**Result:**
- Authoritative system metadata from CMDB
- Enriched with local analysis and context
- Conflict-free, single source of truth

## Sync Report Structure

Each sync generates a detailed report:

### Report Section 1: Summary

```
Sync Summary Report
═══════════════════════════════════════════════════════════
Source: CMDB (Configuration Management Database)
Mode: Fetch (Pull)
Filter: type="Application", environment="production"
Dry-Run: No (changes applied)
Timestamp: 2026-01-14T14:32:00Z

Records Processed:     25
Records Created:        3
Records Updated:        8
Records Unchanged:     14
Records with Errors:    0
─────────────────────────────────────────────────────────
Total Time: 3.2 seconds
Status: ✓ Success
```

### Report Section 2: Created Records

```
New Records Created:
───────────────────
1. System - ServiceNow
   • Name: ServiceNow Service Management
   • Type: Platform
   • Owner: IT Service Management
   • Criticality: Medium
   • Status: Active

2. System - Splunk
   • Name: Splunk Log Management
   • Type: Platform
   • Owner: Operations & Engineering
   • Criticality: High
   • Status: Active
```

### Report Section 3: Updated Records

```
Records Updated:
────────────────
1. System - SAP S/4HANA
   Changes:
   • criticality: high → critical
   • owner: "IT Applications" → "Finance IT"
   • dataClassification: internal → confidential

2. System - DataPlatform
   Changes:
   • contacts (support): [John, Sarah] → [John, Sarah, Mike]
   • status: active → active (no change)
```

### Report Section 4: Errors/Conflicts

```
Sync Errors (0):
────────────────
None

Unresolved Conflicts (0):
─────────────────────────
None

Warnings (1):
─────────────
1. System "Cloud Foundry" found in CMDB but no matching local note
   Recommendation: Create new System note or add to exclusion filter
```

## Sync Metadata

Records synced from external sources include:

```yaml
# Sync Source Fields
source: cmdb | confluence | servicenow | jira
sourceId: "<unique-id-in-source>"
sourceUrl: "<url-to-source-record>"
sourceVersion: <version-number>
lastSynced: <ISO-timestamp>
syncMode: fetch | merge

# Authority
readOnly: false                    # Can local edits be synced back?
authoritative: <field-list>       # Which fields come from source
```

## Advanced Options

### Selective Field Sync

```
/system-sync cmdb --fields "owner,criticality,contacts" --dry-run
```

Only sync specific fields, preserve local edits to other fields.

### Conflict Resolution Strategy

```
/system-sync cmdb --conflicts "ask|remote|local|newer|merge"
```

- `ask` - Prompt user for each conflict (default)
- `remote` - Always take source value
- `local` - Always keep local value
- `newer` - Take whichever was updated most recently
- `merge` - Intelligently merge (combine lists, keep both)

### Schedule Automatic Syncs

```
/system-sync cmdb --schedule "daily at 02:00" --store
```

Configure recurring sync (stored in vault settings).

### Exclude Records

```
/system-sync cmdb --exclude "status:deprecated,tag:archived"
```

Skip records matching filter.

## Integration with Other Skills

The `/system-sync` skill works with:

- **`/system`** - Create/update System notes from synced data
- **`/integration`** - Update Integration notes with synced dependencies
- **`/diagram`** - Regenerate diagrams after sync
- **`/vault-maintenance`** - Detect orphaned notes after sync

## Error Handling

Common sync errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| Authentication failed | Wrong credentials | Check API key/token in settings |
| No matching records | Filter too restrictive | Broaden filter or check source data |
| Cannot match records | Naming differs | Use source ID for matching, or manual map |
| Field not found | Field doesn't exist in source | Update field mapping config |
| Connection timeout | Network/firewall issue | Check network, retry, or use proxy |

## Sync Best Practices

1. **Always dry-run first** - Preview changes before applying
2. **Sync during maintenance window** - Minimize user impact
3. **Review sync reports** - Check for unexpected changes
4. **Version control** - Commit before/after syncs to git
5. **Monitor quality** - Run validation sync periodically
6. **Document mappings** - Keep field mappings documented
7. **Notify stakeholders** - Let teams know when data synced

## Sync Validation Queries

After syncing, run these queries to verify:

```dataview
// Find systems with mismatched owners
TABLE owner, cmdbOwner
FROM ""
WHERE type = "System" AND owner != cmdbOwner
```

```dataview
// Find orphaned local systems (not in CMDB)
TABLE source, sourceId
FROM ""
WHERE type = "System" AND source != "cmdb"
```

## Next Steps

After syncing:

1. Review sync report for any surprises
2. Run validation queries to check consistency
3. Update diagrams if topology changed (`/diagram --refresh`)
4. Notify stakeholders of sync completion
5. Schedule next sync cycle

## Configuration

Sync sources configured in `.claude/sync-config.yaml`:

```yaml
cmdb:
  url: "https://cmdb.yourorg.internal/api"
  auth: oauth2
  updateFrequency: daily

confluence:
  url: "https://confluence.yourorg.internal"
  space: ARCHITECTURE
  auth: oauth2

servicenow:
  instance: "yourorg"
  auth: oauth2

jira:
  url: "https://jira.yourorg.internal"
  projects: ["MyDataIntegration", "ModernizationProject", "DataPlatform"]
  auth: oauth2
```

---

**Invoke with:** `/system-sync <source>`

**Example:** `/system-sync cmdb --filter "environment:production" --dry-run` → Preview sync of production systems
