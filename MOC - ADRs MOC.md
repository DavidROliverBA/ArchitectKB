---
type: MOC
title: ADRs MOC
description: Map of Content for all Architecture Decision Records organized by status, relationships, and projects
created: 2025-01-05
modified: 2026-01-14
tags: [MOC, navigation, ADR]

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-14
summary: Central navigation for all Architecture Decision Records showing proposed, accepted, and deprecated decisions with relationships and project links
keywords: [ADR, architecture, decisions, governance, MOC]
---

# ADRs MOC

**Purpose:** Central directory of all Architecture Decision Records (ADRs) documenting key architectural decisions across your projects. Navigate by status, relationships, or project context.

**Quick Navigation:** [All ADRs](#all-adrs) | [By Status](#adrs-by-status) | [By Type](#adrs-by-type) | [AI ADRs](#ai-adrs) | [Statistics](#adr-statistics)

**Total ADRs:** `$= dv.pages("").where(p => p.type == "Adr").length`

---

## ADR Statistics

| Metric | Count |
|--------|-------|
| **Total ADRs** | `$= dv.pages("").where(p => p.type == "Adr").length` |
| **Draft** | `$= dv.pages("").where(p => p.type == "Adr" && p.status == "draft").length` |
| **Proposed** | `$= dv.pages("").where(p => p.type == "Adr" && p.status == "proposed").length` |
| **Accepted** | `$= dv.pages("").where(p => p.type == "Adr" && p.status == "accepted").length` |
| **Deprecated** | `$= dv.pages("").where(p => p.type == "Adr" && p.status == "deprecated").length` |
| **Superseded** | `$= dv.pages("").where(p => p.type == "Adr" && p.status == "superseded").length` |
| **With Quality Metadata** | `$= dv.pages("").where(p => p.type == "Adr" && p.confidence != null).length` |
| **With Relationships** | `$= dv.pages("").where(p => p.type == "Adr" && p.relatedTo?.length > 0).length` |

### By ADR Type

| Type | Count |
|------|-------|
| **Technology_ADR** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "Technology_ADR").length` |
| **Architecture_ADR** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "Architecture_ADR").length` |
| **Integration_ADR** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "Integration_ADR").length` |
| **Security_ADR** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "Security_ADR").length` |
| **Data_ADR** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "Data_ADR").length` |
| **AI_ADR** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "AI_ADR").length` |
| **Untyped** | `$= dv.pages("").where(p => p.type == "Adr" && !p.adrType).length` |

---

## All ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  tags AS "Tags",
  file.ctime AS "Created"
FROM ""
WHERE type = "Adr"
SORT file.ctime DESC
```

---

## ADRs by Status

### Proposed ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  file.ctime AS "Created",
  tags AS "Tags"
FROM ""
WHERE type = "Adr" AND (status = "proposed" OR contains(status, "Proposed") OR contains(status, "Draft"))
SORT file.ctime DESC
```

### Accepted ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  file.ctime AS "Created",
  tags AS "Tags"
FROM ""
WHERE type = "Adr" AND (status = "accepted" OR contains(status, "Accepted") OR contains(status, "Approved"))
SORT file.ctime DESC
```

### Deprecated ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  file.ctime AS "Created",
  tags AS "Tags"
FROM ""
WHERE type = "Adr" AND (status = "deprecated" OR contains(status, "Deprecated") OR contains(status, "Superseded"))
SORT file.ctime DESC
```

---

## ADRs by Type

### Technology ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "Adr" AND adrType = "Technology_ADR"
SORT status ASC, file.ctime DESC
```

### Architecture ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "Adr" AND adrType = "Architecture_ADR"
SORT status ASC, file.ctime DESC
```

### Integration ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "Adr" AND adrType = "Integration_ADR"
SORT status ASC, file.ctime DESC
```

### Security ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "Adr" AND adrType = "Security_ADR"
SORT status ASC, file.ctime DESC
```

### Data ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  project AS "Project"
FROM ""
WHERE type = "Adr" AND adrType = "Data_ADR"
SORT status ASC, file.ctime DESC
```

---

## AI ADRs

ADRs specifically for AI/ML architecture decisions.

### AI ADR Statistics

| Metric | Count |
|--------|-------|
| **Total AI ADRs** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "AI_ADR").length` |
| **Ethics Reviewed** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "AI_ADR" && p.ethicsReviewed == true).length` |
| **Bias Assessed** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "AI_ADR" && p.biasAssessed == true).length` |
| **High Risk** | `$= dv.pages("").where(p => p.type == "Adr" && p.adrType == "AI_ADR" && p.aiRiskLevel == "high").length` |

### All AI ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  aiProvider AS "Provider",
  aiModel AS "Model",
  aiRiskLevel AS "Risk",
  humanOversight AS "Oversight"
FROM ""
WHERE type = "Adr" AND adrType = "AI_ADR"
SORT status ASC, file.ctime DESC
```

### AI ADRs by Provider

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  aiModel AS "Model",
  aiUseCase AS "Use Case"
FROM ""
WHERE type = "Adr" AND adrType = "AI_ADR"
GROUP BY aiProvider
```

### AI ADRs Requiring Attention

ADRs missing ethics/bias review or with high risk level:

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  aiRiskLevel AS "Risk",
  ethicsReviewed AS "Ethics",
  biasAssessed AS "Bias"
FROM ""
WHERE type = "Adr" AND adrType = "AI_ADR"
  AND (ethicsReviewed = false OR biasAssessed = false OR aiRiskLevel = "high")
SORT aiRiskLevel ASC
```

---

## ADRs by Tag

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  file.ctime AS "Created"
FROM ""
WHERE type = "Adr"
SORT file.ctime DESC
GROUP BY tags
```

---

## Recently Created ADRs

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "ADR",
  status AS "Status",
  file.ctime AS "Created"
FROM ""
WHERE type = "Adr"
SORT file.ctime DESC
LIMIT 10
```

---

## ADR Index

### Project-Linked ADRs

*Organise your ADRs by project here. Examples:*

**Project Alpha:**
- [[ADR - API Gateway Selection]]
- [[ADR - Event Streaming Platform]]

**Project Beta:**
- [[ADR - Cloud Migration Strategy]]
- [[ADR - Data Lake Architecture]]

### Standalone ADRs

ADRs not linked to a specific project:

- [[ADR - Enterprise Integration Patterns]]
- [[ADR - Security Standards]]

---

## Related MOCs

- [[Dashboard - Main Dashboard]] - Main navigation hub
- [[MOC - Projects MOC]] - Projects by status and priority
- [[MOC - Technology & Architecture MOC]] - Technical platforms and architecture
- [[MOC - Organisations MOC]] - Vendors and partners
- [[MOC - Vault Quality Dashboard]] - Quality metrics and health
- [[Page - Vault Maintenance Guide]] - Maintenance best practices

---

**MOC Version:** 2.0
**Total ADRs:** `$= dv.pages("").where(p => p.type == "Adr").length`
**Last Updated:** 2026-01-14
**Purpose:** Architecture decision documentation and governance
