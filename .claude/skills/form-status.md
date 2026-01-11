---
skill: form-status
description: Check status of form submissions across projects
context: fork
arguments:
  - name: filter
    description: Filter by status (pending, expired, all) or project name
    required: false
---

# /form-status Skill

Generate a status report of form submissions across the vault.

## Usage

```
/form-status                    # Show forms requiring attention
/form-status pending            # All pending forms
/form-status expired            # Expired approvals
/form-status all                # All form submissions
/form-status "Project Alpha"    # Forms for specific project
```

## Instructions

1. **Search for all FormSubmission notes**:
   ```
   Glob: **/Form - *.md
   ```

2. **Read frontmatter** from each to extract:
   - `formType`
   - `status`
   - `project`
   - `submittedDate`
   - `responseDate`
   - `expiryDate`

3. **Apply filter** based on argument:
   - No filter / `attention`: Show pending + expiring soon
   - `pending`: Status = submitted or pending
   - `expired`: ExpiryDate < today
   - `all`: All form submissions
   - Other: Match against project name

4. **Generate report** using format below

## Report Format

### Forms Requiring Attention

```markdown
## Form Submissions Status Report

**Generated:** {date}
**Filter:** {filter or "Attention Required"}

---

### ⚠️ Pending Review

| Form | Type | Project | Submitted | Days Waiting |
|------|------|---------|-----------|--------------|
| [[Form - DPIA - Project]] | DPIA | [[Project]] | 2026-01-05 | 6 |

### ⏰ Expiring Soon (30 days)

| Form | Type | Project | Expires | Days Left |
|------|------|---------|---------|-----------|
| [[Form - Security - API]] | SecurityReview | [[Project]] | 2026-02-15 | 35 |

### ❌ Expired

| Form | Type | Project | Expired On |
|------|------|---------|------------|
| [[Form - Risk - Legacy]] | RiskAssessment | [[Project]] | 2025-12-01 |

---

### Summary

| Status | Count |
|--------|-------|
| Draft | X |
| Submitted | X |
| Pending | X |
| Approved | X |
| Rejected | X |
| Expired | X |
| **Total** | **X** |

---

### By Form Type

| Type | Pending | Approved | Total |
|------|---------|----------|-------|
| DPIA | X | X | X |
| SecurityReview | X | X | X |
| RiskAssessment | X | X | X |
| ChangeRequest | X | X | X |
```

## Status Definitions

| Status | Icon | Meaning |
|--------|------|---------|
| `draft` | 📝 | Being prepared |
| `submitted` | 📤 | Sent for review |
| `pending` | ⏳ | Under review |
| `approved` | ✅ | Accepted |
| `rejected` | ❌ | Not approved |
| `expired` | ⏰ | Approval expired |

## Expiry Warning Logic

- **Expiring soon**: ExpiryDate within 30 days of today
- **Expired**: ExpiryDate before today
- **Long wait**: Pending/submitted > 14 days

## Example Output

```markdown
## Form Submissions Status Report

**Generated:** 2026-01-11
**Filter:** Attention Required

---

### ⚠️ Pending Review (2)

| Form | Type | Project | Submitted | Days Waiting |
|------|------|---------|-----------|--------------|
| [[Form - DPIA - Customer Portal]] | DPIA | [[Project - Portal Redesign]] | 2026-01-05 | 6 |
| [[Form - Security - API Gateway]] | SecurityReview | [[Project - API Platform]] | 2025-12-28 | 14 |

### ⏰ Expiring Soon (1)

| Form | Type | Project | Expires | Days Left |
|------|------|---------|---------|-----------|
| [[Form - Risk - Cloud Migration]] | RiskAssessment | [[Project - Cloud Migration]] | 2026-02-10 | 30 |

---

### Summary

| Status | Count |
|--------|-------|
| Draft | 3 |
| Submitted | 1 |
| Pending | 1 |
| Approved | 8 |
| Rejected | 1 |
| Expired | 2 |
| **Total** | **16** |
```
