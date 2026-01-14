---
type: MOC
title: Technology & Architecture MOC
created: 2026-01-07
modified: 2026-01-07
tags: [MOC, navigation, technology, architecture]
---

# Technology & Architecture MOC

> Central hub for technical architecture, platforms, and technology decisions at BA Engineering. Organizes knowledge across cloud platforms, data systems, integration patterns, and aviation-specific technologies.

## Quick Navigation
- [Cloud Platforms](#cloud-platforms)
- [Data & Integration](#data--integration)
- [Architecture Decisions](#architecture-decisions)
- [Aviation & Aircraft Systems](#aviation--aircraft-systems)
- [Integration Patterns & APIs](#integration-patterns--apis)
- [Reference Documentation](#reference-documentation)

---

## Cloud Platforms

### AWS (Amazon Web Services)
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Weblink") AND (
  contains(title, "AWS") OR
  contains(file.name, "AWS")
)
SORT type DESC, title ASC
```

**Key Resources:**
- [[Page - AWS Account for AI Prototype is - 368608343696]]
- [[Page - AWS Login]]
- [[Page - Creating a Sandbox Account in AWS]]
- [[Page - AWS and BA Account Share GitHub Repo]]

### SAP Ecosystem
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Weblink") AND (
  contains(title, "SAP") OR
  contains(file.name, "SAP")
)
SORT type DESC, title ASC
```

**Key Platforms:**
- **SAP BTP** (Business Technology Platform) - Integration & extensions
- **SAP Datasphere** - Data warehouse and analytics
- **SAP S/4HANA** - ERP system

**Key Resources:**
- [[Page - SAP Datasphere Presentation 2026]]
- [[Page - SAP to Olympus using Replication Flow]]

---

## Data & Integration

### Data Platforms

#### ODIE (Olympus Data Integration Engine)
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Project") AND (
  contains(title, "ODIE") OR
  contains(title, "Olympus")
)
SORT type DESC, title ASC
```

#### SAP Datasphere
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "ADR") AND (
  contains(title, "Datasphere") OR
  contains(title, "DataSphere")
)
SORT title ASC
```

### Streaming & Messaging

#### Kafka
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE type = "Page" AND contains(title, "Kafka")
SORT title ASC
```

**Key Resources:**
- [[Page - What is Kafka?]]

---

## Architecture Decisions

### All ADRs
See [[MOC - ADRs MOC]] for complete Architecture Decision Records

### Technology-Related ADRs
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Decision",
  status AS "Status"
FROM ""
WHERE type = "Adr"
SORT status ASC, title ASC
```

**Key Decisions:**
- [[ADR - SAP to AWS Connectivity]]
- [[ADR - SAP Data Product]]
- [[ADR - Dispax AI - Bedrock]]
- [[ADR - Dispax AI - AI Services]]

---

## Aviation & Aircraft Systems

### Electronic Flight Bag (EFB)
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Project") AND contains(title, "EFB")
SORT type DESC, title ASC
```

**Key Resources:**
- [[Page - 777X EFB MoC]]

### 777X Programme
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Project" OR type = "Meeting") AND contains(title, "777")
SORT type DESC, title ASC
```

**Key Projects:**
- [[Project - 777-X EIS Programme]]

### Aircraft Services & Systems
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE type = "Page" AND (
  contains(title, "Aircraft") OR
  contains(title, "Gatelink") OR
  contains(title, "Fleetlink")
)
SORT title ASC
```

**Key Resources:**
- [[Page - The Aircraft Service]]

---

## Integration Patterns & APIs

### API Management
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Adr") AND (
  contains(title, "API") OR
  contains(title, "Integration")
)
SORT type DESC, title ASC
```

**Platforms:**
- **Kong API Gateway** - Current standard
- **SAP Integration Suite** - SAP-specific integrations
- **Axway** - Legacy platform

### Integration Projects
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  status AS "Status"
FROM ""
WHERE type = "Project" AND (
  contains(title, "Integration") OR
  contains(title, "Caerus") OR
  contains(title, "ODIE")
)
SORT status ASC, title ASC
```

**Key Projects:**
- [[Project - Caerus]] - SAP to ODIE integration
- [[Project - ODIE Programme]] - Data platform programme

---

## MRO & Engineering Systems

### AMOS Platform
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "MOC") AND contains(title, "AMOS")
SORT type DESC, title ASC
```

**Key Resources:**
- [[MOC - AMOS Knowledge Base]]
- [[Page - AMOS Gap Analysis for BA]]
- [[Page - AMOS Product Roadmap]]
- [[Page - AMOS Load and Performance Test Report]]
- [[Page - AMOS Project Roles & Responsibilities]]
- [[Page - AMOShub APIs Marketplace]]

### MRO Pro
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Project") AND contains(title, "MRO")
SORT type DESC, title ASC
```

**Key Projects:**
- [[Project - MRO Pro Implementation]]

---

## AI & Machine Learning

### AI/ML Platforms & Services
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Project" OR type = "Adr") AND (
  contains(title, "AI") OR
  contains(title, "Bedrock") OR
  contains(title, "Dispax")
)
SORT type DESC, title ASC
```

**Key Projects:**
- [[Project - Dispax AI]]

**Key Decisions:**
- [[ADR - Dispax AI - Bedrock]]
- [[ADR - Dispax AI - AI Services]]
- [[ADR - KAMA Pattern - Dispax AI (SUPERSEDED)]]

---

## Reference Documentation

### All Technical Pages
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Document",
  created AS "Created"
FROM ""
WHERE type = "Page" AND (
  contains(title, "Architecture") OR
  contains(title, "System") OR
  contains(title, "Technical") OR
  contains(title, "Platform")
)
SORT created DESC
LIMIT 30
```

### Technology Guides
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Guide",
  file.mtime AS "Updated"
FROM ""
WHERE type = "Page" AND (
  contains(title, "What is") OR
  contains(title, "How to") OR
  contains(title, "Guide")
)
SORT file.mtime DESC
LIMIT 20
```

---

## By Technology Domain

### Programming & Development
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource"
FROM ""
WHERE type = "Page" AND (
  contains(title, "Python") OR
  contains(title, "Java") OR
  contains(title, "Code")
)
SORT title ASC
```

### Security & Compliance
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  type AS "Type"
FROM ""
WHERE (type = "Page" OR type = "Project") AND (
  contains(title, "Security") OR
  contains(title, "Cyber") OR
  contains(title, "Compliance") OR
  contains(title, "PKI")
)
SORT type DESC, title ASC
```

**Key Resources:**
- [[Page - PKI (Public Key Infrastructure)]] - Certificate management and cryptography

**Key Projects:**
- [[Project - Cyber Uplift]]

**Key Contacts:**
- [[Aslam Patel]] - Production Owner Cyber Security, responsible for PKI environments

---

## Statistics

| Technology Area | Count |
|----------------|-------|
| **Total Tech Pages** | `$= dv.pages("").where(p => p.type == "Page").length` |
| **Architecture ADRs** | `$= dv.pages("").where(p => p.type == "Adr").length` |
| **Active Tech Projects** | `$= dv.pages("").where(p => p.type == "Project" && (p.status == "active" || p.status == null)).length` |
| **AWS Resources** | `$= dv.pages("").where(p => (p.type == "Page" || p.type == "Weblink") && p.file.name.includes("AWS")).length` |
| **SAP Resources** | `$= dv.pages("").where(p => (p.type == "Page" || p.type == "Weblink") && p.file.name.includes("SAP")).length` |
| **AMOS Resources** | `$= dv.pages("").where(p => p.type == "Page" && p.file.name.includes("AMOS")).length` |

---

## Related MOCs
- [[Dashboard - Dashboard]] - Main hub
- [[MOC - Projects MOC]] - All projects
- [[MOC - ADRs MOC]] - Architecture decisions
- [[MOC - Weblinks MOC]] - External resources
- [[MOC - AMOS Knowledge Base]] - AMOS platform details
- [[MOC - Axia Programme]] - EWS Futures programme

---

## Usage Notes

**For Claude Code:**
- Use this MOC to discover technical context across domains
- Cross-reference ADRs with their implementation projects
- Find platform-specific documentation (AWS, SAP, AMOS)
- Navigate aviation-specific systems (EFB, 777X, Aircraft)

**Categories:**
- **Cloud Platforms**: AWS and SAP ecosystem resources
- **Data & Integration**: ODIE, Datasphere, Kafka, messaging
- **Aviation Systems**: EFB, 777X, aircraft-specific technologies
- **MRO Systems**: AMOS, MRO Pro, maintenance platforms
- **AI/ML**: Bedrock, Dispax AI, generative AI projects

**Maintenance:**
- New Pages/Projects automatically appear in relevant queries
- Add technology-specific tags for better categorization
- Link new ADRs to related technology sections
- Update key resources list as documentation grows
