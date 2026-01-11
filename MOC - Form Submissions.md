---
type: MOC
title: Form Submissions MOC
description: Map of Content for tracking governance and compliance form submissions
created: 2026-01-11
modified: 2026-01-11
tags: [MOC, navigation, governance, compliance]

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-11
summary: Central tracking for all governance forms including DPIAs, security reviews, risk assessments, and change requests
keywords: [forms, governance, compliance, DPIA, security, risk]
---

# Form Submissions MOC

**Purpose:** Central directory tracking all governance and compliance form submissions. Monitor status, identify pending items, and track expiring approvals.

**Quick Navigation:** [Attention Required](#attention-required) | [By Status](#forms-by-status) | [By Type](#forms-by-type) | [By Project](#forms-by-project) | [Statistics](#form-statistics)

**Total Forms:** `$= dv.pages("").where(p => p.type == "FormSubmission").length`

---

## Attention Required

### ⚠️ Pending Review

Forms awaiting response from assessors:

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  project AS "Project",
  submittedDate AS "Submitted"
FROM ""
WHERE type = "FormSubmission" AND (status = "submitted" OR status = "pending")
SORT submittedDate ASC
```

### ⏰ Expiring Soon

Approvals expiring within 30 days:

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  project AS "Project",
  expiryDate AS "Expires"
FROM ""
WHERE type = "FormSubmission"
  AND status = "approved"
  AND expiryDate != null
  AND expiryDate <= date(today) + dur(30 days)
SORT expiryDate ASC
```

### ❌ Expired

Approvals that have expired and may need renewal:

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  project AS "Project",
  expiryDate AS "Expired On"
FROM ""
WHERE type = "FormSubmission"
  AND status = "expired"
SORT expiryDate DESC
```

---

## Form Statistics

| Metric | Count |
|--------|-------|
| **Total Forms** | `$= dv.pages("").where(p => p.type == "FormSubmission").length` |
| **Draft** | `$= dv.pages("").where(p => p.type == "FormSubmission" && p.status == "draft").length` |
| **Submitted** | `$= dv.pages("").where(p => p.type == "FormSubmission" && p.status == "submitted").length` |
| **Pending** | `$= dv.pages("").where(p => p.type == "FormSubmission" && p.status == "pending").length` |
| **Approved** | `$= dv.pages("").where(p => p.type == "FormSubmission" && p.status == "approved").length` |
| **Rejected** | `$= dv.pages("").where(p => p.type == "FormSubmission" && p.status == "rejected").length` |
| **Expired** | `$= dv.pages("").where(p => p.type == "FormSubmission" && p.status == "expired").length` |

---

## Forms by Status

### Draft

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  project AS "Project",
  created AS "Created"
FROM ""
WHERE type = "FormSubmission" AND status = "draft"
SORT created DESC
```

### Submitted / Pending

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  project AS "Project",
  submittedDate AS "Submitted"
FROM ""
WHERE type = "FormSubmission" AND (status = "submitted" OR status = "pending")
SORT submittedDate ASC
```

### Approved

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  project AS "Project",
  responseDate AS "Approved",
  expiryDate AS "Expires"
FROM ""
WHERE type = "FormSubmission" AND status = "approved"
SORT responseDate DESC
```

### Rejected

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  project AS "Project",
  responseDate AS "Rejected"
FROM ""
WHERE type = "FormSubmission" AND status = "rejected"
SORT responseDate DESC
```

---

## Forms by Type

### DPIA (Data Protection Impact Assessment)

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "FormSubmission" AND formType = "DPIA"
SORT status ASC
```

### Security Reviews

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "FormSubmission" AND formType = "SecurityReview"
SORT status ASC
```

### Risk Assessments

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "FormSubmission" AND formType = "RiskAssessment"
SORT status ASC
```

### Change Requests

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "FormSubmission" AND formType = "ChangeRequest"
SORT status ASC
```

### Other Forms

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "FormSubmission" AND (formType = "ComplianceCheck" OR formType = "Other" OR formType = null)
SORT status ASC
```

---

## Forms by Project

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  status AS "Status"
FROM ""
WHERE type = "FormSubmission" AND project != null
GROUP BY project
SORT project ASC
```

---

## All Forms

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Form",
  formType AS "Type",
  status AS "Status",
  project AS "Project",
  submittedDate AS "Submitted"
FROM ""
WHERE type = "FormSubmission"
SORT status ASC, submittedDate DESC
```

---

## Related MOCs

- [[Dashboard - Dashboard]] - Main navigation hub
- [[MOC - Projects MOC]] - Projects by status
- [[MOC - ADRs MOC]] - Architecture decisions

---

**MOC Version:** 1.0
**Total Forms:** `$= dv.pages("").where(p => p.type == "FormSubmission").length`
**Last Updated:** 2026-01-11
**Purpose:** Governance and compliance form tracking
