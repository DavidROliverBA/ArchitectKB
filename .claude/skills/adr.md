---
context: fork
---

# /adr

Create a new Architecture Decision Record (ADR) for your organization.

## Usage

```
/adr <title>
/adr <title> for <project>
```

## Examples

```
/adr API Gateway Selection
/adr Kafka vs EventBridge for Project - MyProject
/adr Standalone Laptop for Offline Database Build
```

## Instructions

### 1. Parse Command and Initial Setup

Parse the command for:
- **title**: The ADR name (required)
- **project**: Related project (optional)

### 2. Discover Relevant Organisational ADRs

**IMPORTANT**: Before creating a new ADR, search for existing organisational ADRs that may constrain or inform this decision.

Search the vault for relevant ADRs:
1. Search `+Sync/Org-ADRs/` for ADRs with `authority: organizational`
2. Search vault root for ADRs with `status: accepted`
3. Look for keywords matching the decision topic

Display found ADRs to the user:
```
📋 Relevant Organisational ADRs Found:

**Must Follow** (authority: organizational):
- [[ADR - API Gateway Selection]] - Mandates Kong for API management
- [[ADR - Cloud Provider Selection]] - Requires AWS for new services

**Consider** (authority: team, related domain):
- [[ADR - Kafka Event Patterns]] - Event-driven patterns for integration
- [[ADR - Data Product Standards]] - Data exchange formats

Would you like to reference any of these in your new ADR's `dependsOn` field?
```

Store selected references for later inclusion in frontmatter.

### 3. Check for Existing Guardrail

**CRITICAL STEP**: Before creating an ADR, check if a relevant guardrail already exists.

Ask the user:
> "Before creating this ADR, have you checked if there's an existing guardrail that covers this decision? If a guardrail exists, you should follow it instead of creating an ADR."

If user confirms no guardrail exists, proceed to step 4.

### 4. Determine ADR Type

Ask the user to select the ADR type (explain each):

**Question**: "What type of ADR is this?"

**Options**:
1. **Technology_ADR** - New technology/tool or significant change to existing technology
   - Examples: New database, cloud service, development tool, infrastructure component
   - Requires SME approvals for the specific technology area

2. **Architecture_ADR** - New guardrail, pattern, or standard
   - Examples: New architectural pattern, coding standard, design principle
   - Creates organizational standard - highest approval level required
   - Becomes future guardrail

3. **Local_ADR** - Following existing guardrails
   - Examples: Team-level decision within established patterns
   - Local architecture process only - minimal approvals

Store the selected type in `adrType` frontmatter field.

### 5. Identify Required Approvers

Ask the user: "Who should approve this ADR?"

**Suggested Approvers** (customize for your organization):
- Head of Architecture or Engineering
- Principal Solution Architect (if not already involved)
- Subject-matter experts for the affected area
- Security/Compliance leads (if applicable)
- Key stakeholders

Store approver names in the frontmatter `approvers` field.

### 6. Gather ADR Content

Ask the user for key information to fill the ADR template:

#### Context Questions:
1. **Background**: What is the architectural context? What problem led to this decision?
2. **Problem Statement**: What is the specific problem or requirement? What are the constraints?
3. **Goals**: What are the desired outcomes?

#### Alternatives Questions:
1. **What alternatives did you consider?** (minimum 2, recommend 3-5)
2. For each alternative:
   - Description
   - Pros
   - Cons
   - Fit with requirements
   - Why was it rejected?

#### Decision Questions:
1. **What is the decision?** (clear, specific statement)
2. **Why this decision?** (rationale)
3. **How does this address the problem?**

#### Consequences Questions:
1. **Positive impacts**: What are the benefits?
2. **Negative impacts**: What are the drawbacks or risks?
3. **Mitigation strategies**: How will you address negative consequences?

#### Implementation Questions:
1. **Cost model**: What are the costs (one-time, recurring)?
2. **Deployment approach**: How will this be implemented?
3. **Operational model**: How will this be operated and supported?
4. **Migration/rollout**: What are the phases?

#### Compliance Questions:
1. **GDPR compliance**: Does this process personal data?
2. **Security classification**: What data classification (Official, Official-Sensitive)?
3. **Audit requirements**: What audit/traceability is needed?

### 7. Create the ADR

Generate filename: `ADR - {{title}}.md`

Create the ADR in vault root using the structure from `+Templates/ADR.md`:

**Frontmatter**:
```yaml
---
type: Adr
title: {{title}}
description: {{one-line summary}}
status: draft
adrType: {{Technology_ADR | Architecture_ADR | Local_ADR}}
tags: [ADR, architecture, {{additional relevant tags}}]
created: {{DATE}}
modified: {{DATE}}
deciders: [Engineering Architecture Team, {{project team if applicable}}]
approvers:
  # Core Assessors (Required)
  - Head of Architecture or Engineering
  - Principal Solution Architect
  - 
  # Subject-Specific SMEs (from user selections)
  {{list of SME approvers based on subject areas}}
  # Stakeholders
  {{project stakeholders if applicable}}
project: {{project_link or null}}
jiraTicket: null  # To be added when your tracking system ticket created

# Source/Provenance
source: local                         # local | confluence
sourcePageId: null                    # your tracking system page ID (once published)
sourceSpace: null                     # your tracking system space key
sourceUrl: null                       # Link to authoritative version
sourceVersion: null                   # Version number

# Publication
isPublished: false                    # Updated when published to your tracking system
publishedDate: null                   # YYYY-MM-DD
publishedUrl: null                    # your tracking system URL

# Authority Level
authority: draft                      # draft → local → team → organizational

# Relationships
relatedTo: []
supersedes: []
dependsOn: {{selected_dependencies_from_discovery_step}}

# Quality Indicators
confidence: medium
freshness: current
verified: false
reviewed: {{DATE}}

# Context
summary: {{one-line summary}}
assumptions: []
stakeholders: {{list from approvers}}
---
```

**Content**: Use ADR template structure with all sections filled in from user responses.

### 8. Provide Next Steps Guidance

After creating the ADR, display:

```
✅ ADR created: ADR - {{title}}.md

📋 Next Steps (ADR Process):

1. ⏳ REVIEW ADR CONTENT
   - Review all sections for completeness
   - Ensure alternatives are well-documented
   - Verify approvers list is correct

2. ⏳ CREATE your tracking system TICKET (CRITICAL - ADR not complete without this)
   - Project: {{user's project or your tracking system}}
   - Issue Type: ADR
   - Label: "{{adrType}}"
   - Summary: "ADR - {{title}}"
   - Link this ADR document to your tracking system ticket

3. ⏳ ADD APPROVERS IN your tracking system
   Use '@' function in your tracking system to add:
   {{list all approvers from frontmatter}}

4. ⏳ CREATE/LINK CONFLUENCE PAGE
   - Create your tracking system page with ADR content
   - Link your tracking system page to your tracking system ticket

5. ⏳ UPDATE ADR STATUS
   - After your tracking system ticket created, update status: draft → proposed
   - Add your tracking system ticket reference to frontmatter

6. ⏳ STAKEHOLDER REVIEW
   - Approvers review in your tracking system
   - Discussion via your tracking system comments
   - All approvers must agree

7. ⏳ ADR ACCEPTANCE
   - All approvals confirmed in your tracking system
   - Update status: proposed → accepted

8. ⏳ POST-APPROVAL
   - Close your tracking system ticket
   - Tidy your tracking system page
   - Add appropriate labels

9. ⏳ PUBLISH TO CONFLUENCE (Final Step)
   - Create your tracking system page with ADR content
   - Update vault ADR frontmatter:
     - isPublished: true
     - publishedDate: {{today}}
     - publishedUrl: {{confluence URL}}
     - authority: team (or organizational if it becomes a guardrail)
     - status: accepted

🔄 Authority Progression:
- draft → ADR being created (local work)
- local → Personal decision, not yet shared
- team → Approved by team, in your tracking system
- organizational → Company-wide standard/guardrail

📚 References:
- Review your organization's ADR governance and approval process
- Consult with your architecture leadership on approval requirements
- Customize approvers list based on your domain expertise

⚠️ REMEMBER: ADRs are not complete until your tracking system ticket is raised!
```

### 9. Create Associated Task (Optional)

Ask the user: "Would you like me to create a task to track this ADR through the approval process?"

If yes, create a task: `Task - Create ADR - {{title}}.md` with:
- Checklist of all workflow steps above
- Due date (ask user)
- Project reference
- Links to ADR, official process docs

## Important Notes

1. **your tracking system Ticket is Mandatory**: Always emphasize that ADR is not complete without your tracking system ticket
2. **Your Process**: Adapt ADR workflow to your organization's governance process
3. **Approvers are Required**: Must identify and document required approvers before proceeding
4. **your tracking system Integration**: ADRs live in your tracking system with your tracking system as anchor
5. **Status Progression**: draft → proposed (after your tracking system) → accepted (after approvals)
6. **Three ADR Types**: Technology_ADR (most common), Architecture_ADR (new guardrail), Local_ADR (within guardrails)

## Error Handling

- If user skips checking for existing guardrail, remind them this is required
- If user cannot identify appropriate approvers, suggest checking your organization's governance documentation
- If ADR type is unclear, explain each type with examples
- If user wants to skip your tracking system ticket, explain it's mandatory per official process

## Implementation Notes

This skill creates ADRs following the ADR template in `+Templates/ADR.md`. Customize the approvers, workflow, and governance process for your organization.
