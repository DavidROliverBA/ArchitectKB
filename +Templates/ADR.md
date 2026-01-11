<%*
const name = await tp.system.prompt("ADR topic:");
if (name) {
  await tp.file.rename("ADR - " + name);
}
_%>
---
type: Adr
title: <% name %>
description: # Brief one-line description
status: draft  # draft | proposed | accepted | deprecated | superseded
adrType: null  # Technology_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR
tags: [ADR, architecture]
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>

# Decision Makers
deciders: []  # People who made the decision
approvers:
  # Customize based on your organization's approval structure
  - Architecture Lead
  - Tech Lead / Principal Architect
  - Security Architect (if applicable)
  # Add domain-specific SMEs as needed

# Relationships
relatedTo: []      # Related ADRs or documentation
supersedes: []     # ADRs this replaces
dependsOn: []      # ADRs this depends on

# Quality Indicators
confidence: medium  # low | medium | high - How certain are we about this decision?
freshness: current  # current | recent | stale - How up-to-date is this?
source: primary     # primary | secondary | synthesis | external
verified: false     # Has this been validated in production?
reviewed: <% tp.date.now("YYYY-MM-DD") %>

# Context
summary: # Brief summary for AI and quick reference
assumptions: []    # Key assumptions made in this decision
stakeholders: []   # Who is impacted by this decision
project: null      # Link to related project: "[[Project - Name]]"
externalRef: null  # Optional: Link to external ticket (JIRA, ADO, GitHub Issue)

# AI-Specific Fields (for AI_ADR type)
aiProvider: null          # aws-bedrock | azure-openai | openai | google | anthropic | custom
aiModel: null             # claude-3 | gpt-4 | llama | gemini | custom
aiUseCase: null           # generation | classification | extraction | conversation | agents
aiRiskLevel: null         # high | medium | low
ethicsReviewed: false     # Has AI ethics been considered?
biasAssessed: false       # Has bias/fairness been assessed?
dataPrivacyReviewed: false # Has data privacy (DPIA) been considered?
humanOversight: null      # full | partial | minimal | none
---

# ADR - <% name %>

> **Architecture Decision Record** - Documenting significant architectural choices and their rationale.

---

## Status

**<% "Draft" %>** - <% tp.date.now("YYYY-MM-DD") %>

**ADR Type**: [Technology_ADR | Integration_ADR | Security_ADR | Data_ADR | AI_ADR]

**Workflow Progress:**
1. ⏳ Draft ADR Content
2. ⏳ Technical Review
3. ⏳ Stakeholder Review and Approval
4. ⏳ ADR Acceptance
5. ⏳ Post-Approval Actions

**Next Steps:**
1. **Complete ADR content** (all sections below)
2. **Technical review** with architecture team
3. **Stakeholder approval** from approvers listed above
4. **Update status** to "accepted" after approval

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

### Regulatory Compliance


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


**Related Documentation:**


---

## Related ADRs

* [ADR-XXX]: Related previous decision
* [ADR-YYY]: Dependent or impacted decision

---

## Approval

**Approvers**:


**Date**: [YYYY-MM-DD]

**External Reference**: [Link to ticket/issue if applicable]

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
