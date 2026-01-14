<%*
const name = await tp.system.prompt("ADR topic:");
if (name) {
  await tp.file.rename("ADR - " + name);
}
_%>
---
type: Adr
title: <% name %>
description:
status: draft
adrType: # Technology_ADR | Architecture_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
tags: [ADR, architecture]
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
deciders: []
approvers:
  # Core Assessors (Required)
  - Head of Architecture or Engineering
  - Principal Solution Architect
  - Cyber Assurance (Tom Phillips or delegate)
  # Subject-Specific SMEs (add as appropriate - see Page - BA ADR Approvers and SME)
  # Stakeholders
project:
jiraTicket: null  # To be added when JIRA ticket created

# Source/Provenance
source: local                         # local | confluence
sourcePageId: null                    # Confluence page ID (if synced)
sourceSpace: null                     # Confluence space key (if synced)
sourceUrl: null                       # Link to authoritative version
sourceVersion: null                   # Confluence version number

# Publication (for local ADRs)
isPublished: false                    # Has been published to Confluence?
publishedDate: null                   # When published (YYYY-MM-DD)
publishedUrl: null                    # Confluence URL when published

# Authority Level
authority: draft                      # draft | local | team | organizational

# Relationships
relatedTo: []
supersedes: []
dependsOn: []

# Quality Indicators
confidence: medium
freshness: current
verified: false
reviewed: <% tp.date.now("YYYY-MM-DD") %>

# Context
summary:
assumptions: []
stakeholders: []

# AI-Specific Fields (for AI_ADR type)
aiProvider: null          # aws-bedrock | azure-openai | openai | google | anthropic | custom | null
aiModel: null             # claude-3 | gpt-4 | llama | custom | null
aiUseCase: null           # generation | classification | extraction | conversation | agents | null
aiRiskLevel: null         # high | medium | low | null
ethicsReviewed: false     # Has AI ethics been considered?
biasAssessed: false       # Has bias/fairness been assessed?
dataPrivacyReviewed: false # DPIA completed for AI data usage?
humanOversight: null      # full | partial | minimal | none | null
---

# ADR - <% name %>

> **Based on Official BA ADR Template**: [[Page - BA ADR Template (Official)]]
>
> **ADR Process**: [[Page - BA ADR Process (Official)]]
>
> **Required Approvers**: [[Page - BA ADR Approvers and SME (Official)]]

---

## Status

**Draft** - <% tp.date.now("YYYY-MM-DD") %>

**ADR Type**: [Technology_ADR | Architecture_ADR | Local_ADR]

**Following Official BA ADR Process**: [[Page - BA ADR Process (Official)]]

**Workflow Progress:**
1. ⏳ Check for Existing Guardrail
2. ⏳ Draft ADR Content
3. ⏳ Create JIRA Ticket in [PROJECT] (pending - **CRITICAL STEP**)
4. ⏳ Add Approvers in Jira
5. ⏳ Stakeholder Review and Approval
6. ⏳ ADR Acceptance
7. ⏳ Post-Approval Actions

**Next Steps:**
1. **Complete ADR content** (all sections below)
2. **Create JIRA ticket** - Type: ADR, Label: "[adrType]"
3. **Add approvers** (see [[Page - BA ADR Approvers and SME (Official)]])
4. **Update status** to "proposed" after JIRA ticket created

---

## Context

### Background

* Describe the architectural context
* Explain the problem or challenge that led to this decision
* Provide relevant historical or technical background

**Business Problem:**


**Current Constraints:**


**Technical Context:**


### Problem Statement

* Clearly articulate the specific problem or requirement
* Outline the constraints and limitations
* Describe the goals and desired outcomes

**Key Challenges:**


**Requirements:**


---

## Decision

* Clearly state the architectural decision
* Explain the rationale behind the choice
* Describe how this decision addresses the problem statement

**Decision:**


**Rationale:**


**Implementation Approach:**


---

## Considered Alternatives

### Alternative 1: [Name]

* **Description**:
* **Pros**:
* **Cons**:
* **Fit with requirements**:

**Rejected Because:**


### Alternative 2: [Name]

* **Description**:
* **Pros**:
* **Cons**:
* **Fit with requirements**:

**Rejected Because:**

(Add more alternatives as needed)

---

## Consequences

### Positive Impacts

* List potential positive outcomes
* Describe benefits to system architecture
* Note improvements in performance, maintainability, etc.

**Benefits:**
-
-
-

### Negative Impacts

* Identify potential drawbacks
* Outline risks or challenges
* Discuss technical debt or implementation complexity

**Drawbacks:**
-
-
-

### Mitigation Strategies

* Propose ways to address negative consequences
* Suggest follow-up actions or monitoring

**Mitigations:**
-
-
-

---

## Compliance

* List any regulatory or organizational standards met
* Note alignment with existing architectural principles
* Reference related architectural decisions

### GDPR Compliance


### Security Classification


### Audit and Traceability


---

## AI Considerations

> **Note:** Complete this section for AI_ADR type decisions. Remove if not applicable.

### AI Model Selection

**Provider:** [AWS Bedrock | Azure OpenAI | OpenAI | Google | Anthropic | Custom]

**Model:** [Specific model name and version]

**Use Case:**
- [ ] Text generation
- [ ] Classification
- [ ] Information extraction
- [ ] Conversational AI
- [ ] Agentic workflows
- [ ] Other: ___

### AI Risk Assessment

**Risk Level:** [High | Medium | Low]

| Risk Factor | Assessment | Mitigation |
|-------------|------------|------------|
| Data sensitivity | | |
| Decision impact | | |
| Autonomy level | | |
| Reversibility | | |

### Ethics and Bias

**Ethics Review:**
- [ ] Reviewed against AI ethics principles
- [ ] Stakeholder impact assessed
- [ ] Documented in: ___

**Bias Assessment:**
- [ ] Training data bias reviewed
- [ ] Output bias testing completed
- [ ] Fairness metrics defined
- [ ] Documented in: ___

### Data Privacy (AI-specific)

- [ ] DPIA completed for AI data usage
- [ ] Data minimisation applied
- [ ] Consent mechanisms in place (if applicable)
- [ ] Data retention aligned with AI lifecycle

### Human Oversight

**Oversight Level:** [Full | Partial | Minimal | None]

**Human-in-the-loop points:**
-

**Escalation triggers:**
-

### Model Governance

**Monitoring:**
-

**Retraining triggers:**
-

**Version control:**
-

---

## Production Implementation

### Deployment Approach


### Operational Model


### Support and Maintenance


### Cost Model


### Migration and Rollout


---

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
|      |        |             |            |

---

## Additional Notes

* Include any supplementary information
* Reference related documentation
* Note date of decision
* List decision makers and stakeholders

---

## Related

**Project:**


**Compliance:**


**Official BA ADR Process:**
- [[Page - BA ADR Process (Official)]] - Main ADR workflow
- [[Page - BA ADR Approvers and SME (Official)]] - Required approvers by domain
- [[Page - BA ADR Template (Official)]] - Official template structure

---

## Related ADRs

* [ADR-XXX]: Related previous decision
* [ADR-YYY]: Dependent or impacted decision

---

## Approval

**Approvers** (from JIRA ticket):


**Date**: [YYYY-MM-DD]

**JIRA Ticket**: [Link when created]

---

## Revision History

| Version | Date | Description | Author |
|---------|------|-------------|--------|
| 1.0 | <% tp.date.now("YYYY-MM-DD") %> | Initial version | <% tp.user.name %> |

---

## Review

**Next Review Date**: <% tp.date.now("YYYY-MM-DD", 180) %> (6 months)

**Review Triggers**:
- Status change
- Dependency changes
- Compliance requirement changes
- Operational feedback
