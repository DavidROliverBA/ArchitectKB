<%*
const name = await tp.system.prompt("Form submission name (e.g., 'DPIA - Project Name'):");
if (name) {
  await tp.file.rename("Form - " + name);
}
const formTypes = ["DPIA", "SecurityReview", "RiskAssessment", "ChangeRequest", "ComplianceCheck", "Other"];
const formType = await tp.system.suggester(formTypes, formTypes, false, "Select form type:");
_%>
---
type: FormSubmission
title: <% name %>
formType: <% formType || null %>  # DPIA | SecurityReview | RiskAssessment | ChangeRequest | ComplianceCheck | Other
status: draft  # draft | submitted | pending | approved | rejected | expired
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
tags: [FormSubmission, governance]

# Submission Details
project: null             # "[[Project - Name]]"
requestingTeam: null      # Team or department requiring this form
submittedDate: null       # YYYY-MM-DD - When submitted
responseDate: null        # YYYY-MM-DD - When response received
expiryDate: null          # YYYY-MM-DD - When approval expires (if applicable)

# Reference
referenceNumber: null     # External ticket/reference number
externalLink: null        # Link to external system (e.g., ServiceNow, Jira)
attachments: []           # Links to screenshots, PDFs, or related files
---

# Form - <% name %>

> **Form Submission** - Tracking intake form for governance, compliance, or process requirements.

---

## Status

**Current Status:** Draft

| Field | Value |
|-------|-------|
| **Form Type** | <% formType || "Not specified" %> |
| **Submitted** | Not yet |
| **Response** | Pending |
| **Expires** | N/A |

---

## Overview

**Purpose of Submission:**
<!-- Why is this form being submitted? What is being requested/assessed? -->


**Project/Initiative:**
<!-- Link to related project if applicable -->


---

## Form Type Details

<%* if (formType === "DPIA") { _%>
### Data Protection Impact Assessment (DPIA)

**Data Categories:**
- [ ] Personal data
- [ ] Sensitive personal data
- [ ] Financial data
- [ ] Health data
- [ ] Other: ___

**Data Processing Activities:**
<!-- Describe what data will be processed and how -->


**Risk Assessment:**
<!-- Summary of privacy risks and mitigations -->

<%* } else if (formType === "SecurityReview") { _%>
### Security Review

**System/Application:**
<!-- Name and description of system being reviewed -->


**Security Domains:**
- [ ] Authentication & access control
- [ ] Data encryption
- [ ] Network security
- [ ] Application security
- [ ] Infrastructure security

**Assessment Scope:**
<!-- What is being assessed? -->

<%* } else if (formType === "RiskAssessment") { _%>
### Risk Assessment

**Risk Category:**
- [ ] Technical risk
- [ ] Operational risk
- [ ] Compliance risk
- [ ] Security risk
- [ ] Business risk

**Risk Summary:**
<!-- Brief summary of risks being assessed -->


**Proposed Mitigations:**
<!-- How risks will be mitigated -->

<%* } else if (formType === "ChangeRequest") { _%>
### Change Request

**Change Type:**
- [ ] Normal change
- [ ] Standard change
- [ ] Emergency change

**Change Description:**
<!-- What is being changed? -->


**Impact Assessment:**
<!-- Who/what is affected by this change? -->


**Rollback Plan:**
<!-- How to revert if needed -->

<%* } else { _%>
### Form Details

**Category:**
<!-- Type of form or assessment -->


**Requirements:**
<!-- What needs to be completed/assessed? -->

<%* } _%>

---

## Timeline

| Milestone | Date | Status |
|-----------|------|--------|
| Form Created | <% tp.date.now("YYYY-MM-DD") %> | ✅ |
| Submitted | | ⏳ |
| Response Received | | ⏳ |
| Approval Expires | | - |

---

## Outcome

**Decision:**
<!-- Approved / Rejected / Pending / Conditional -->


**Conditions (if any):**
<!-- Any conditions attached to approval -->


**Feedback:**
<!-- Summary of feedback received -->


---

## Related Notes

```dataview
TABLE type, status
FROM ""
WHERE contains(file.outlinks, this.file.link)
SORT type ASC
```

---

## Attachments

<!-- Link to any uploaded forms, screenshots, or documents -->

---

## Notes

<!-- Additional notes, follow-up actions, or context -->

