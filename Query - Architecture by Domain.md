---
type: Query
title: "Architecture by Domain"
description: "Architecture notes organized by business domain (data, integration, security, etc.)"
queryType: table
created: 2026-01-14
modified: 2026-01-14
tags: [Query, architecture, domains]
---

# Query: Architecture by Domain

This query organizes architecture documents by business domain for domain-driven exploration.

## Dataview Query

```dataview
TABLE title, status, description
FROM ""
WHERE type = "Architecture"
SORT title ASC
```

## Sample Results

| Architecture | Status | Description |
|---|---|---|
| Sample Data Integration Platform HLD | active | Enterprise-wide data integration supporting real-time analytics and batch reporting |

## Use Cases

- **Architecture Reviews** - Find architecture documents by domain
- **Design Decisions** - Understand rationale for architecture choices
- **Compliance** - Review security and governance architecture
- **Onboarding** - New team members learn system architecture

---

**Tip**: Read the HLD to understand the full enterprise architecture vision!
