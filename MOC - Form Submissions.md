---
type: MOC
title: MOC - Form Submissions
scope: Track all form submissions across projects
created: 2026-01-11
modified: 2026-01-11
tags: [MOC, forms, compliance]
---

# Form Submissions

Track intake forms, assessments, and compliance submissions across all projects.

## Quick Stats

**Total Forms**: `$= dv.pages().where(p => p.type == "FormSubmission").length`

| Status | Count |
|--------|-------|
| Draft | `$= dv.pages().where(p => p.type == "FormSubmission" && p.status == "draft").length` |
| Submitted/Pending | `$= dv.pages().where(p => p.type == "FormSubmission" && (p.status == "submitted" || p.status == "pending")).length` |
| Approved | `$= dv.pages().where(p => p.type == "FormSubmission" && p.status == "approved").length` |
| Rejected | `$= dv.pages().where(p => p.type == "FormSubmission" && p.status == "rejected").length` |
| Expired | `$= dv.pages().where(p => p.type == "FormSubmission" && p.status == "expired").length` |

---

## Attention Required

### Pending Response (Waiting >14 days)

```dataview
TABLE formType as "Type", project as "Project", submittedDate as "Submitted",
      (date(today) - date(submittedDate)).days + " days" as "Waiting"
FROM ""
WHERE type = "FormSubmission"
  AND (status = "submitted" OR status = "pending")
  AND submittedDate != null
  AND (date(today) - date(submittedDate)).days > 14
SORT submittedDate ASC
```

### Drafts Not Submitted

```dataview
TABLE formType as "Type", project as "Project", created as "Created"
FROM ""
WHERE type = "FormSubmission"
  AND status = "draft"
SORT created ASC
```

### Expiring Soon (<60 days)

```dataview
TABLE formType as "Type", project as "Project", expiryDate as "Expires",
      (date(expiryDate) - date(today)).days + " days" as "Remaining"
FROM ""
WHERE type = "FormSubmission"
  AND expiryDate != null
  AND status = "approved"
  AND (date(expiryDate) - date(today)).days < 60
  AND (date(expiryDate) - date(today)).days > 0
SORT expiryDate ASC
```

---

## By Form Type

### DPIA (Data Protection Impact Assessment)

```dataview
TABLE status as "Status", project as "Project", submittedDate as "Submitted", responseDate as "Response"
FROM ""
WHERE type = "FormSubmission" AND formType = "DPIA"
SORT submittedDate DESC
```

### CyberRisk (Cyber Security Risk Assessment)

```dataview
TABLE status as "Status", project as "Project", submittedDate as "Submitted", responseDate as "Response"
FROM ""
WHERE type = "FormSubmission" AND formType = "CyberRisk"
SORT submittedDate DESC
```

### TPRM (Third Party Risk Management)

```dataview
TABLE status as "Status", project as "Project", submittedDate as "Submitted", responseDate as "Response"
FROM ""
WHERE type = "FormSubmission" AND formType = "TPRM"
SORT submittedDate DESC
```

### IAF (Initial Assessment Form)

```dataview
TABLE status as "Status", project as "Project", submittedDate as "Submitted", responseDate as "Response"
FROM ""
WHERE type = "FormSubmission" AND formType = "IAF"
SORT submittedDate DESC
```

### ChangeRequest

```dataview
TABLE status as "Status", project as "Project", submittedDate as "Submitted", responseDate as "Response"
FROM ""
WHERE type = "FormSubmission" AND formType = "ChangeRequest"
SORT submittedDate DESC
```

### Other Forms

```dataview
TABLE status as "Status", project as "Project", requestingTeam as "Team", submittedDate as "Submitted"
FROM ""
WHERE type = "FormSubmission" AND formType = "Other"
SORT submittedDate DESC
```

---

## By Project

```dataview
TABLE WITHOUT ID
  project as "Project",
  length(rows) as "Forms",
  length(filter(rows, (r) => r.status = "approved")) as "Approved",
  length(filter(rows, (r) => r.status = "pending" OR r.status = "submitted")) as "Pending",
  length(filter(rows, (r) => r.status = "draft")) as "Draft"
FROM ""
WHERE type = "FormSubmission"
GROUP BY project
SORT project ASC
```

---

## All Form Submissions

```dataview
TABLE formType as "Type", status as "Status", project as "Project",
      submittedDate as "Submitted", responseDate as "Response", referenceNumber as "Ref"
FROM ""
WHERE type = "FormSubmission"
SORT submittedDate DESC
```

---

## Form Types Reference

| Type | Full Name | Requesting Team | Typical Turnaround |
|------|-----------|-----------------|-------------------|
| DPIA | Data Protection Impact Assessment | Data Privacy / Legal | 2-4 weeks |
| CyberRisk | Cyber Security Risk Assessment | Cyber Security | 1-2 weeks |
| TPRM | Third Party Risk Management | Procurement / Cyber | 2-6 weeks |
| IAF | Initial Assessment Form | Cyber Delivery Assurance | 1 week |
| ChangeRequest | Change Request / RFC | Change Management | 1-2 weeks |

## Quick Actions

- **Create new form**: `/form <type> <project>`
- **Check status**: `/form-status` or `/form-status <project>`
- **Find pending**: `/form-status pending`
- **Find overdue**: `/form-status overdue`

---

## Related

- [[MOC - Projects MOC]] - All projects
- [[MOC - Tasks MOC]] - Related tasks
- [[Page - Cyber Assurance]] - Cyber assessment guidance
