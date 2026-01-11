---
skill: form
description: Quick-create a form submission tracking note
context: fork
arguments:
  - name: type
    description: Form type (DPIA, SecurityReview, RiskAssessment, ChangeRequest, ComplianceCheck)
    required: true
  - name: name
    description: Form name or related project
    required: true
---

# /form Skill

Quick-create a form submission tracking note for governance and compliance forms.

## Usage

```
/form DPIA "Project Alpha"
/form SecurityReview "New API Gateway"
/form RiskAssessment "Cloud Migration"
/form ChangeRequest "Database Upgrade"
```

## Instructions

1. **Parse the arguments**:
   - First argument: Form type (DPIA, SecurityReview, RiskAssessment, ChangeRequest, ComplianceCheck, Other)
   - Second argument: Name/project reference (quote if contains spaces)

2. **Create the note** at `Form - {type} - {name}.md`

3. **Use this frontmatter**:

```yaml
---
type: FormSubmission
title: {type} - {name}
formType: {type}
status: draft
created: {today}
modified: {today}
tags: [FormSubmission, governance]

# Submission Details
project: null
requestingTeam: null
submittedDate: null
responseDate: null
expiryDate: null

# Reference
referenceNumber: null
externalLink: null
attachments: []
---
```

4. **Add appropriate body content** based on form type:
   - **DPIA**: Data categories checklist, processing activities
   - **SecurityReview**: Security domains checklist, system details
   - **RiskAssessment**: Risk category checklist, mitigations
   - **ChangeRequest**: Change type, impact assessment, rollback plan
   - **Other**: Generic form structure

5. **Return** the wiki-link to the created note: `[[Form - {type} - {name}]]`

## Form Types

| Type | Purpose |
|------|---------|
| `DPIA` | Data Protection Impact Assessment |
| `SecurityReview` | Security architecture/system review |
| `RiskAssessment` | Risk identification and mitigation |
| `ChangeRequest` | Change management requests |
| `ComplianceCheck` | Regulatory compliance verification |
| `Other` | Other governance forms |

## Status Lifecycle

```
draft → submitted → pending → approved/rejected → expired
```

| Status | Meaning |
|--------|---------|
| `draft` | Being prepared |
| `submitted` | Sent to assessors |
| `pending` | Under review |
| `approved` | Accepted |
| `rejected` | Not approved |
| `expired` | Approval period ended |

## Example

**Input:** `/form DPIA "Customer Portal Redesign"`

**Creates:** `Form - DPIA - Customer Portal Redesign.md`

**Output:** Created [[Form - DPIA - Customer Portal Redesign]] - ready to complete DPIA details.
