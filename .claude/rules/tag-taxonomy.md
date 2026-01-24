# Tag Taxonomy Reference

**Version:** 2.0
**Last Updated:** 2026-01-23
**Status:** Active Standard

This document defines the official tag taxonomy for the Obsidian vault. All tags must follow this structure.

---

## Design Principles

1. **Hierarchical Structure** - Use slash notation: `category/subcategory/value`
2. **Maximum 3 Levels** - Keep flat enough to maintain: `domain/engineering/systems`
3. **All Lowercase** - Consistent casing: `technology/aws` not `Technology/AWS`
4. **Hyphens for Multi-word** - Use hyphens: `project/my-project` not `project/MyProject`
5. **No Inline Prefix in Frontmatter** - Use `tags: [domain/data]` not `tags: [#domain/data]`
6. **Faceted Classification** - Combine multiple independent dimensions
7. **Problem-Oriented** - Where useful, focus on actionability

---

## Core Tag Hierarchies

### 1. activity/ - What kind of work is this?

**Purpose:** Classifies the type of activity or deliverable

| Tag | When to Use | Examples |
|-----|-------------|----------|
| `activity/architecture` | Architecture decisions, designs, patterns | ADRs, system designs, C4 diagrams |
| `activity/implementation` | Code, configuration, building | Implementation tasks, code snippets |
| `activity/research` | Investigation, discovery, learning | Research notes, POCs, spikes |
| `activity/evaluation` | Assessment, comparison, analysis | Vendor evaluations, tool comparisons |
| `activity/operations` | Running systems, support, incidents | Runbooks, incident notes, support |
| `activity/delivery` | Project delivery, planning | Project plans, roadmaps, milestones |
| `activity/governance` | Compliance, policies, standards | Policies, guardrails, compliance |
| `activity/documentation` | Writing docs, guides, knowledge | How-to guides, process docs |
| `activity/modernisation` | Legacy system upgrades | System migrations, cloud lifts |
| `activity/integration` | Connecting systems | Integration patterns, APIs |
| `activity/compliance` | Regulatory, security assessments | DPIAs, security assessments |
| `activity/planning` | Strategic planning, vision | Strategies, visions, roadmaps |

**Usage:** Every work-oriented note should have one `activity/` tag.

---

### 2. domain/ - What business area does this relate to?

**Purpose:** Business domain or organisational area

| Tag | When to Use | Examples |
|-----|-------------|----------|
| `domain/engineering` | Engineering systems and processes | Core systems, maintenance |
| `domain/data` | Data platforms, analytics, BI | Data warehouses, data products |
| `domain/integration` | Cross-system integration | APIs, messaging, data exchange |
| `domain/cloud` | Cloud infrastructure and platforms | AWS, Azure, cloud architecture |
| `domain/security` | Security, identity, access | IAM, secrets, encryption |
| `domain/operations` | Day-to-day operations | Support, monitoring, incidents |
| `domain/hr` | HR systems and processes | HR platforms, employee data |
| `domain/finance` | Financial systems | ERP finance, cost management |
| `domain/supply-chain` | Procurement, logistics, suppliers | Parts, inventory, vendors |
| `domain/planning` | Capacity, resource, strategic planning | Planning systems, roadmaps |
| `domain/documentation` | Documentation systems and practices | Wikis, knowledge bases |
| `domain/tooling` | Development tools and platforms | CI/CD, IDEs, dev tools |
| `domain/platform` | Platform engineering | Kubernetes, infrastructure |
| `domain/identity` | Identity and access management | SSO, LDAP, authentication |
| `domain/analytics` | Business intelligence and analytics | Reporting, dashboards, BI |
| `domain/compliance` | Regulatory compliance | Audits, certifications |
| `domain/infrastructure` | Core IT infrastructure | Networks, servers, storage |

**Usage:** Use 1-3 `domain/` tags to indicate business areas affected.

**Customisation:** Add domain-specific tags for your industry (e.g., `domain/manufacturing`, `domain/retail`, `domain/healthcare`).

---

### 3. project/ - Which project or programme?

**Purpose:** Links content to specific projects or programmes within your organisation

| Tag | When to Use |
|-----|-------------|
| `project/my-project` | Replace with your actual project names |
| `project/data-platform` | Example: Data platform initiative |
| `project/cloud-migration` | Example: Cloud migration programme |
| `project/system-modernisation` | Example: Legacy system replacement |

**Naming Convention:**
- All lowercase
- Use hyphens for multi-word: `project/cloud-migration`
- Use short, memorable names (not full official titles)

**Usage:** Use for all project-related content (meetings, tasks, decisions, docs).

**Customisation:** Add your organisation's project names following the naming convention above.

---

### 4. technology/ - Which technologies are involved?

**Purpose:** Technical components, platforms, tools, languages

#### 4.1 Platforms & Cloud

| Tag | Description |
|-----|-------------|
| `technology/aws` | Amazon Web Services |
| `technology/azure` | Microsoft Azure |
| `technology/gcp` | Google Cloud Platform |
| `technology/kubernetes` | Kubernetes orchestration |
| `technology/docker` | Docker containers |
| `technology/terraform` | Terraform IaC |

#### 4.2 Data & Integration

| Tag | Description |
|-----|-------------|
| `technology/kafka` | Apache Kafka streaming |
| `technology/snowflake` | Snowflake data warehouse |
| `technology/postgresql` | PostgreSQL database |
| `technology/redis` | Redis cache |
| `technology/api` | REST APIs, API management |

#### 4.3 AI & ML

| Tag | Description |
|-----|-------------|
| `technology/bedrock` | AWS Bedrock (AI) |
| `technology/openai` | OpenAI / GPT models |
| `technology/langchain` | LangChain framework |
| `technology/ai` | Artificial intelligence (general) |
| `technology/ml` | Machine learning |

#### 4.4 Languages & Frameworks

| Tag | Description |
|-----|-------------|
| `technology/python` | Python language |
| `technology/java` | Java language |
| `technology/typescript` | TypeScript language |
| `technology/react` | React framework |
| `technology/spring` | Spring framework |

**Naming Convention:**
- All lowercase
- Use official short names: `technology/postgresql` not `technology/postgres`

**Usage:** Use 2-5 `technology/` tags for technical content. Be specific but not exhaustive.

**Customisation:** Add technologies specific to your stack.

---

### 5. type/ - What kind of artifact is this?

**Purpose:** Content type or artifact classification

| Tag | When to Use |
|-----|-------------|
| `type/adr` | Architecture Decision Records |
| `type/system` | System documentation |
| `type/scenario` | Usage scenarios, user stories |
| `type/integration` | Integration specifications |
| `type/data-asset` | Data asset documentation |
| `type/hld` | High-Level Design |
| `type/lld` | Low-Level Design |
| `type/runbook` | Operational runbooks |
| `type/policy` | Policies and standards |
| `type/guardrail` | Technical guardrails |
| `type/diagram` | Architecture diagrams |
| `type/canvas` | Obsidian Canvas visualisations |

**Note:** The frontmatter `type` field (Task, Project, Meeting, etc.) is separate from tags. Use `type/` tags for additional classification within those categories.

---

### 6. criticality/ - How critical is this system/decision?

**Purpose:** Importance or risk level (primarily for Systems and ADRs)

| Tag | When to Use |
|-----|-------------|
| `criticality/critical` | System failure causes major business impact |
| `criticality/high` | Important but business can continue with workarounds |
| `criticality/medium` | Moderate impact, can tolerate downtime |
| `criticality/low` | Minimal business impact |

---

### 7. status/ - Lifecycle or workflow state

**Purpose:** Content lifecycle tracking

| Tag | When to Use |
|-----|-------------|
| `status/draft` | Work in progress, not ready for review |
| `status/review` | Ready for review or approval |
| `status/approved` | Approved and active |
| `status/deprecated` | Superseded but kept for reference |
| `status/archived` | No longer active, moved to archive |
| `status/synced` | Synced from external system |

**Note:** The frontmatter `status` field is still primary. Use `status/` tags for additional workflow tracking.

---

### 8. vendor/ - External vendor or supplier

**Purpose:** Track vendor-related content

**Examples:**
| Tag | When to Use |
|-----|-------------|
| `vendor/your-vendor` | Replace with your actual vendor names |

**When to use vendor/ vs technology/:**
- `vendor/microsoft` + `technology/azure` - For vendor-related content about their technology
- `technology/azure` alone - For technical content where vendor relationship isn't relevant

**Usage:** Use for vendor evaluations, contracts, relationship management.

**Customisation:** Add your organisation's vendor names using lowercase and hyphens.

---

### 9. workstream/ - Which workstream within a project?

**Purpose:** Links content to specific workstreams within larger projects/programmes.

| Tag | When to Use |
|-----|-------------|
| `workstream/architecture` | Architecture design workstream |
| `workstream/integration` | Integration design and delivery |
| `workstream/data-migration` | Data migration activities |
| `workstream/testing` | Testing and QA workstream |
| `workstream/training` | Training and change management |
| `workstream/governance` | Programme governance activities |
| `workstream/vendor-selection` | Vendor evaluation and selection |

**Usage:**
- Use alongside `project/` tag to enable cross-project workstream patterns
- Enables dedicated MOCs per workstream
- Supports knowledge compounding within workstreams

---

### 10. audience/ - Who is this for?

**Purpose:** Target audience or stakeholder group

| Tag | When to Use |
|-----|-------------|
| `audience/executive` | C-level, senior leadership |
| `audience/architect` | Solutions architects, enterprise architects |
| `audience/developer` | Software developers, engineers |
| `audience/operations` | Operations teams, support |
| `audience/security` | Security teams, InfoSec |
| `audience/data` | Data engineers, analysts |
| `audience/product` | Product managers, owners |
| `audience/business` | Business stakeholders, non-technical |

---

### 11. Special Tags (No Hierarchy)

These flat tags are allowed for specific purposes:

| Tag | Purpose | Usage |
|-----|---------|-------|
| `notion-import` | Content imported from Notion | Auto-applied by import script |
| `pdf-import` | Content extracted from PDFs | Auto-applied by `/pdf-to-page` |
| `moc` | Map of Content | Navigation hub notes |
| `daily` | Daily note | Auto-applied to daily notes |
| `video` | YouTube or video content | Weblinks to videos |
| `automation` | Automation-related | Scripts, workflows, hooks |

---

## Tag Combination Patterns

### Recommended Combinations by Note Type

#### Project Notes
```yaml
tags: [project/my-project, domain/data, domain/integration, activity/delivery]
```

#### ADRs
```yaml
tags: [type/adr, activity/architecture, technology/aws, technology/kafka, domain/cloud, project/my-project]
```

#### System Documentation
```yaml
tags: [type/system, domain/engineering, technology/postgresql, criticality/critical, vendor/my-vendor]
```

#### Meeting Notes
```yaml
tags: [project/my-project, domain/data, activity/planning]
```

#### Research/Incubator Notes
```yaml
tags: [activity/research, domain/tooling, technology/ai]
```

#### Pages (Documentation)
```yaml
tags: [activity/documentation, domain/cloud, technology/aws, audience/architect]
```

---

## Tagging Guidelines

### How Many Tags?

| Content Type | Recommended Count | Mandatory Hierarchies |
|-------------|-------------------|----------------------|
| ADRs | 4-7 | activity/, technology/, domain/ |
| Projects | 3-5 | project/ (self-ref), domain/, activity/ |
| Systems | 4-6 | type/system, domain/, technology/, criticality/ |
| Meetings | 2-4 | project/ or domain/, activity/ (optional) |
| Pages | 3-6 | activity/, domain/, audience/ (optional) |
| Tasks | 1-3 | project/ or domain/ |
| Daily Notes | 0-2 | daily (auto), project/ (if focused) |
| People | 0-1 | None required |
| Incubator | 2-4 | activity/research, domain/ |

### Required Tags by Note Type

| Frontmatter Type | Required Tags |
|-----------------|---------------|
| `type: Adr` | `activity/architecture`, at least 1 `technology/`, at least 1 `domain/` |
| `type: Project` | Self-referencing `project/tag`, at least 1 `domain/` |
| `type: System` | `type/system`, at least 1 `domain/`, at least 1 `technology/`, `criticality/` |
| `type: Page` | At least 1 `domain/` or `activity/` |
| `type: Meeting` | At least 1 `project/` or `domain/` |

---

## Migration Rules

### Case Normalisation

| Old | New | Rule |
|-----|-----|------|
| `ADR` | `type/adr` | Hierarchical + lowercase |
| `AWS` | `technology/aws` | Hierarchical + lowercase |
| `AI` | `technology/ai` | Hierarchical + lowercase |

### Inline Tags in Frontmatter

| Old | New |
|-----|-----|
| `tags: [#activity/architecture]` | `tags: [activity/architecture]` |
| `tags: [#technology/aws]` | `tags: [technology/aws]` |

### Flat to Hierarchical

| Old | New | Context |
|-----|-----|---------|
| `aws` | `technology/aws` | Technology context |
| `architecture` | `activity/architecture` | Activity context |
| `integration` | `activity/integration` or `domain/integration` | Depends on context |
| `security` | `domain/security` | Domain context |
| `ai` | `technology/ai` | Technology context |

### Template Variable Removal

**Delete these entirely:**
```
{{3-5 relevant tags}}
{{additional relevant tags}}
{{autoTags}}
{{project|lower}}
{{relevant tags}}
pattern/{{pattern}}
```

Replace with actual meaningful tags based on note content.

---

## Anti-Patterns (Don't Do This)

### ❌ Incorrect
```yaml
tags: [#activity/architecture, AWS, Project/MyProject, {{project|lower}}]
```

**Issues:**
- Inline `#` prefix in frontmatter
- Uppercase flat tags
- Capitalised hierarchy prefix
- Template variable

### ✅ Correct
```yaml
tags: [activity/architecture, technology/aws, project/my-project, domain/engineering]
```

---

## Tag Maintenance

### Quarterly Review Tasks

1. **Coverage Audit** - Identify untagged notes
2. **Consistency Check** - Find case/format violations
3. **Orphan Detection** - Identify rarely-used tags (< 3 uses)
4. **Hierarchy Review** - Ensure hierarchies are still meaningful
5. **Template Cleanup** - Remove any template variable contamination

### Tools

- `/quality-report` skill - Includes tag analysis
- Graph query: `node scripts/graph-query.js --tags` - List all tags
- Grep for violations: Find inline `#` prefix tags in frontmatter

---

## Customisation Guide

When adopting this taxonomy for your organisation:

1. **Keep core hierarchies unchanged** - activity/, domain/, type/, criticality/, status/, audience/
2. **Add your projects** - Create `project/` tags for each active project
3. **Add your vendors** - Create `vendor/` tags for key suppliers
4. **Extend technology/** - Add technologies in your stack
5. **Add domain-specific terms** - Extend `domain/` with your industry areas
6. **Add workstreams** - Create `workstream/` tags for recurring work patterns

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-01-23 | Complete taxonomy redesign with mandatory hierarchies |
| 1.0 | 2025-01-05 | Initial semi-formal structure |

---

## References

- [[CLAUDE.md]] - Main vault guide
- [[.claude/vault-conventions.md]] - Frontmatter and general conventions
- [[.claude/rules/quality-patterns.md]] - Quality indicators including tags
