---
type: MOC
title: Weblinks MOC
created: 2026-01-07
modified: 2026-01-07
tags: [MOC, navigation, weblinks]
---

# Weblinks MOC

> Central navigation hub for all 157 external web resources including Confluence pages, Jira projects, technical documentation, and learning resources.

## Quick Navigation
- [Internal Resources](#internal-resources)
- [Technical Documentation](#technical-documentation)
- [Project Resources](#project-resources)
- [Learning & Training](#learning--training)
- [Tools & Platforms](#tools--platforms)
- [Recently Added](#recently-added)
- [All Weblinks](#all-weblinks)

---

## Internal Resources

### Confluence Pages
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Page",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND contains(domain, "atlassian.net") AND contains(url, "wiki")
SORT title ASC
LIMIT 30
```

### Jira Projects & Boards
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Project",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND contains(domain, "atlassian.net") AND (contains(url, "jira") OR contains(url, "browse"))
SORT title ASC
LIMIT 30
```

### ServiceNow & Internal Tools
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND (contains(title, "ServiceNow") OR contains(title, "SharePoint"))
SORT title ASC
```

---

## Technical Documentation

### AWS Documentation
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "AWS Resource",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND (contains(domain, "aws.amazon.com") OR contains(title, "AWS"))
SORT title ASC
```

### SAP Resources
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "SAP Resource",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND contains(title, "SAP")
SORT title ASC
```

### API & Integration Documentation
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND (contains(title, "API") OR contains(title, "Integration"))
SORT title ASC
```

---

## Project Resources

*Customise these sections for your specific projects.*

### Project Alpha
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  url AS "Link"
FROM ""
WHERE type = "Weblink" AND archived != true AND contains(title, "Project Alpha")
SORT title ASC
```

### Project Beta
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  url AS "Link"
FROM ""
WHERE type = "Weblink" AND archived != true AND contains(title, "Project Beta")
SORT title ASC
```

---

## Learning & Training

### Courses & Tutorials
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Course",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND (contains(title, "Course") OR contains(title, "Tutorial") OR contains(title, "Learning") OR contains(title, "Training"))
SORT title ASC
```

### AI & Technology Learning
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND (contains(title, "AI") OR contains(title, "GPT") OR contains(title, "Claude"))
SORT title ASC
```

---

## Tools & Platforms

### Architecture & Design Tools
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Tool",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true AND (contains(title, "Archi") OR contains(title, "Lucid") OR contains(title, "Design"))
SORT title ASC
```

### Development & Collaboration
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Tool",
  domain AS "Domain"
FROM ""
WHERE type = "Weblink" AND archived != true AND (contains(title, "GitHub") OR contains(title, "Gitlab") OR contains(domain, "github.com"))
SORT title ASC
```

---

## Recently Added

### Last 20 Weblinks
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  domain AS "Domain",
  file.ctime AS "Added"
FROM ""
WHERE type = "Weblink" AND archived != true
SORT file.ctime DESC
LIMIT 20
```

---

## All Weblinks

### By Domain
```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Resource",
  domain AS "Domain",
  description AS "Description"
FROM ""
WHERE type = "Weblink" AND archived != true
SORT domain ASC, title ASC
```

### Statistics
| Metric | Count |
|--------|-------|
| **Total Weblinks** | `$= dv.pages("").where(p => p.type == "Weblink" && p.archived != true).length` |
| **Confluence Pages** | `$= dv.pages("").where(p => p.type == "Weblink" && p.archived != true && p.url && p.url.includes("wiki")).length` |
| **Jira Links** | `$= dv.pages("").where(p => p.type == "Weblink" && p.archived != true && p.url && (p.url.includes("jira") || p.url.includes("browse"))).length` |
| **AWS Resources** | `$= dv.pages("").where(p => p.type == "Weblink" && p.archived != true && p.url && p.url.includes("aws.amazon.com")).length` |
| **Added This Month** | `$= dv.pages("").where(p => p.type == "Weblink" && p.archived != true && p.file.ctime >= dv.date("2026-01-01")).length` |
| **Archived** | `$= dv.pages("").where(p => p.type == "Weblink" && p.archived == true).length` |

---

## Related MOCs
- [[Dashboard - Main Dashboard]] - Main hub
- [[MOC - Projects MOC]] - All projects
- [[MOC - Technology & Architecture MOC]] - Technical resources (to be created)
- [[MOC - ADRs MOC]] - Architecture decisions

---

## Notes

**Usage Tips:**
- Use domain-based queries to find resources by source
- Check "Recently Added" for newest discoveries
- Confluence and Jira links provide direct access to work items
- Technical documentation links are categorized by technology (AWS, SAP, APIs)

**Maintenance:**
- New weblinks are automatically included in queries
- Consider adding descriptive tags to weblinks for better categorization
- Review "Recently Added" monthly to ensure proper categorization
