---
type: Page
title: MOC - Vault Quality Dashboard
description: Dashboard for monitoring vault health, content quality, and identifying notes needing attention
created: 2026-01-07
modified: 2026-01-07
tags: [MOC, vault-maintenance, quality, dashboard]

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-07
summary: Comprehensive dashboard for monitoring vault quality metrics including stale content, orphaned notes, missing metadata, and ADR health
keywords: [dashboard, quality, maintenance, health, metrics, MOC]
---

# MOC - Vault Quality Dashboard

**Purpose:** Monitor vault health, track content quality, and identify notes requiring attention or updates.

**Last Updated:** 2026-01-07 | **Review Frequency:** Monthly

---

## Quick Statistics

```dataview
TABLE WITHOUT ID
  "📊 **Metric**" as Metric,
  "**Count**" as Count
FROM ""
WHERE type != null
FLATTEN choice(
  type = "Task", "Tasks",
  type = "Project", "Projects",
  type = "Meeting", "Meetings",
  type = "Person", "People",
  type = "Adr", "ADRs",
  type = "Page", "Pages",
  type = "Weblink", "Weblinks",
  type = "AtomicNote", "Atomic Notes",
  type = "Organisation", "Organisations",
  "Other"
) as NoteType
GROUP BY NoteType
SORT NoteType ASC
```

### Overall Health Score

**Quality Indicators Coverage:**
- Notes with quality metadata: `= length(filter(dv.pages(""), (p) => p.confidence != null))` / `= length(dv.pages(""))` (`= round((length(filter(dv.pages(""), (p) => p.confidence != null)) / length(dv.pages(""))) * 100, 1)`%)

**ADR Health:**
- ADRs with status: `= length(filter(dv.pages(""), (p) => p.type == "Adr" AND p.status != null))` / `= length(filter(dv.pages(""), (p) => p.type == "Adr"))`
- ADRs with relationships: `= length(filter(dv.pages(""), (p) => p.type == "Adr" AND (p.relatedTo != null OR p.supersedes != null OR p.dependsOn != null)))` / `= length(filter(dv.pages(""), (p) => p.type == "Adr")))`

---

## 🚨 Critical Issues

### 1. Stale Content (>12 Months Since Review)

**Notes not reviewed in over 12 months:**

```dataview
TABLE
  type as "Type",
  reviewed as "Last Review",
  confidence as "Confidence",
  summary as "Summary"
FROM ""
WHERE type != null
  AND reviewed != null
  AND date(reviewed) < date(now) - dur(365 days)
SORT reviewed ASC
LIMIT 20
```

**Notes never reviewed:**

```dataview
TABLE
  type as "Type",
  created as "Created",
  confidence as "Confidence"
FROM ""
WHERE type != null
  AND (reviewed = null OR reviewed = "")
  AND confidence != null
SORT created ASC
LIMIT 20
```

---

### 2. Low Confidence Notes Requiring Verification

**Notes marked as low confidence:**

```dataview
TABLE
  type as "Type",
  freshness as "Freshness",
  source as "Source",
  verified as "Verified",
  summary as "Summary"
FROM ""
WHERE confidence = "low"
SORT file.name ASC
```

---

### 3. Unverified Critical Content

**High-confidence notes not verified:**

```dataview
TABLE
  type as "Type",
  confidence as "Confidence",
  source as "Source",
  reviewed as "Reviewed",
  summary as "Summary"
FROM ""
WHERE confidence = "high"
  AND verified = false
SORT file.name ASC
```

---

### 4. ADRs Missing Critical Metadata

**ADRs without status:**

```dataview
TABLE
  file.name as "ADR",
  created as "Created",
  url as "External Link"
FROM ""
WHERE type = "Adr"
  AND (status = null OR status = "")
SORT file.name ASC
```

**ADRs without relationships:**

```dataview
TABLE
  file.name as "ADR",
  status as "Status",
  summary as "Summary"
FROM ""
WHERE type = "Adr"
  AND (relatedTo = null OR relatedTo = [])
  AND (supersedes = null OR supersedes = [])
  AND (dependsOn = null OR dependsOn = [])
SORT file.name ASC
```

---

### 5. Projects Missing Critical Fields

**Projects without status:**

```dataview
TABLE
  file.name as "Project",
  created as "Created",
  timeFrame as "Time Frame"
FROM ""
WHERE type = "Project"
  AND (status = null OR status = "")
SORT file.name ASC
```

**Active projects without collaborators:**

```dataview
TABLE
  file.name as "Project",
  status as "Status",
  timeFrame as "Time Frame"
FROM ""
WHERE type = "Project"
  AND status = "active"
  AND (collaborators = null OR collaborators = "")
SORT file.name ASC
```

---

## 📉 Quality Indicators by Type

### Pages with Quality Metadata

```dataview
TABLE
  confidence as "Confidence",
  freshness as "Freshness",
  source as "Source",
  verified as "✓",
  reviewed as "Last Review"
FROM ""
WHERE type = "Page"
  AND confidence != null
SORT confidence DESC, freshness DESC
```

---

### ADRs - Quality Overview

```dataview
TABLE
  status as "Status",
  confidence as "Confidence",
  freshness as "Freshness",
  verified as "✓",
  summary as "Summary"
FROM ""
WHERE type = "Adr"
SORT status ASC, file.name ASC
```

---

## 🏷️ Tag Coverage

### Notes with Empty Tag Fields

```dataview
TABLE
  type as "Type",
  created as "Created"
FROM ""
WHERE type != null
  AND (tags = null OR tags = [] OR tags = "")
SORT type ASC, created DESC
LIMIT 30
```

---

### Notes with Legacy Flat Tags (No Hierarchical Tags)

**Notes missing hierarchical tags (#domain/, #technology/, #project/, #activity/):**

```dataview
TABLE
  type as "Type",
  tags as "Current Tags"
FROM ""
WHERE type != null
  AND tags != null
  AND !contains(string(tags), "#domain/")
  AND !contains(string(tags), "#technology/")
  AND !contains(string(tags), "#project/")
  AND !contains(string(tags), "#activity/")
  AND (type = "Adr" OR type = "Page" OR type = "Project")
SORT type ASC, file.name ASC
LIMIT 30
```

---

## 🔗 Orphaned Notes (No Backlinks)

**Notes with zero backlinks (potential orphans):**

```dataview
TABLE
  type as "Type",
  created as "Created",
  summary as "Summary"
FROM ""
WHERE type != null
  AND length(file.inlinks) = 0
  AND type != "Weblink"
  AND type != "DailyNote"
SORT created DESC
LIMIT 30
```

**Note:** This query shows notes with no incoming links. Some may be intentionally standalone (e.g., MOCs, dashboards).

---

## 📅 Freshness Analysis

### Recently Updated Notes

```dataview
TABLE
  type as "Type",
  modified as "Modified",
  freshness as "Freshness",
  summary as "Summary"
FROM ""
WHERE type != null
  AND modified != null
SORT modified DESC
LIMIT 20
```

---

### Stale Content by Type

```dataview
TABLE
  type as "Type",
  "Count" as Notes
FROM ""
WHERE type != null
  AND reviewed != null
  AND date(reviewed) < date(now) - dur(365 days)
GROUP BY type
SORT type ASC
```

---

## 🎯 Recommended Actions

### High Priority

1. **Review stale ADRs** - Update decisions that haven't been reviewed in >12 months
2. **Verify high-confidence content** - Ensure critical notes are marked as verified
3. **Add missing ADR relationships** - Map decision dependencies and superseding decisions
4. **Update project status** - Ensure active projects have current status and collaborators

### Medium Priority

5. **Add hierarchical tags** - Convert flat tags to hierarchical structure for better discovery
6. **Review low-confidence notes** - Verify or update notes marked with low confidence
7. **Link orphaned notes** - Connect isolated notes to relevant projects or MOCs
8. **Add quality metadata** - Populate confidence/freshness/source fields for critical pages

### Low Priority

9. **Clean up empty tags** - Add meaningful tags to untagged notes
10. **Archive completed projects** - Mark old projects as completed and move to archive
11. **Update meeting summaries** - Add one-line summaries to recent meetings
12. **Polish MOCs** - Ensure consistent structure across all Maps of Content

---

## 📊 Quality Metrics Over Time

### Content Creation Rate (Last 90 Days)

```dataview
TABLE
  dateformat(created, "yyyy-MM") as "Month",
  length(rows) as "Notes Created"
FROM ""
WHERE type != null
  AND created != null
  AND date(created) > date(now) - dur(90 days)
GROUP BY dateformat(created, "yyyy-MM")
SORT dateformat(created, "yyyy-MM") DESC
```

---

### Review Activity (Last 90 Days)

```dataview
TABLE
  dateformat(reviewed, "yyyy-MM") as "Month",
  length(rows) as "Notes Reviewed"
FROM ""
WHERE type != null
  AND reviewed != null
  AND date(reviewed) > date(now) - dur(90 days)
GROUP BY dateformat(reviewed, "yyyy-MM")
SORT dateformat(reviewed, "yyyy-MM") DESC
```

---

## 🔄 Maintenance Checklist

### Monthly (30 min)
- [ ] Review Quality Dashboard
- [ ] Update 3-5 stale notes
- [ ] Verify recent ADRs have status and relationships
- [ ] Check for new orphaned notes
- [ ] Add missing tags to recent notes

### Quarterly (90 min)
- [ ] Comprehensive stale content review
- [ ] Verify all high-confidence notes
- [ ] Update all ADR statuses
- [ ] Review and archive completed projects
- [ ] MOC structure and navigation review
- [ ] Tag taxonomy refinement

### Annual (3 hours)
- [ ] Full vault health audit
- [ ] Archive old projects and meetings
- [ ] Deprecate superseded ADRs
- [ ] Reorganise if patterns have changed
- [ ] Template updates and improvements
- [ ] Quality indicator schema review

---

## Related MOCs

- [[Dashboard - Main Dashboard]] - Main navigation hub
- [[MOC - ADRs MOC]] - Architecture Decision Records
- [[MOC - Projects MOC]] - Project tracking
- [[MOC - Tasks MOC]] - Task management
- [[Page - Vault Maintenance Guide]] - Detailed maintenance procedures

---

**Dashboard Version:** 1.0
**Created:** 2026-01-07
**Purpose:** AI-assisted vault quality monitoring and maintenance tracking
