---
type: Page
title: MOC - Organisations MOC
description: Central navigation for all organisations - internal teams, vendors, partners, and consultancies
created: 2026-01-07
modified: 2026-01-07
tags: [MOC, organisations, vendors, partners]

# Quality Indicators
confidence: high
freshness: current
source: primary
verified: true
reviewed: 2026-01-07
summary: Comprehensive directory of organisations involved in BA projects including internal teams, aviation vendors, enterprise software providers, and consultancies
keywords: [organisations, vendors, partners, consultancies, MOC, directory]
---

# MOC - Organisations MOC

**Purpose:** Central directory of all organisations involved in British Airways projects, including internal teams, external vendors, partners, and consultancies.

**Total Organisations:** `= length(filter(dv.pages(""), (p) => p.type == "Organisation"))`

---

## Quick Navigation

- [Internal (BA/IAG)](#internal-baiag)
- [Aviation Systems Vendors](#aviation-systems-vendors)
- [Enterprise Software Vendors](#enterprise-software-vendors)
- [Aviation/Engineering Software](#aviationengineering-software)
- [Integration & Middleware](#integration--middleware)
- [Systems Integrators & Consultancies](#systems-integrators--consultancies)
- [Other Vendors & Partners](#other-vendors--partners)
- [All Organisations (Complete List)](#all-organisations-complete-list)

---

## Internal (BA/IAG)

### British Airways
**[[Organisation - BA]]**
- **Role:** Airline operator and primary organisation
- **Key Projects:** All internal projects, digital transformation, engineering modernisation
- **People:** All BA employees in vault

### IAG (International Airlines Group)
**[[Organisation - IAG]]**
- **Role:** Parent company of British Airways
- **Key Projects:** Group-wide initiatives, shared services
- **Relationship:** BA is part of IAG portfolio

---

## Aviation Systems Vendors

### Boeing
**[[Organisation - Boeing]]**
- **Role:** Aircraft manufacturer and systems provider
- **Key Projects:** [[Project - 777-X EIS Programme]]
- **Systems:** Fleetlink, LSAP Librarian, EFB, Gatelink, Configuration Management
- **Contact:** Ryan Sands, Kenneth Krzyzewski, Kody Linscott, Mason Winchell
- **Related ADRs:** [[ADR - Fleetlink Migration]]
- **Context:** [[Page - Context - Aviation Systems & Aircraft Integration]]

### Collins Aerospace
**[[Organisation - Collins Aerospace]]**
- **Role:** Aviation systems and electronics provider
- **Key Projects:** [[Project - 777-X EIS Programme]] (EFB components)
- **Systems:** Electronic Flight Bag (EFB), avionics
- **Related Meetings:** [[Meeting - 2025-04-08 EFB Proxy - Traffic Discussion with Collins]]

---

## Enterprise Software Vendors

### SAP
**[[Organisation - SAP]]**
- **Role:** Enterprise resource planning (ERP) and business technology platform
- **Key Projects:** [[Project - Caerus]], [[Project - Axia (was EWS Futures)]]
- **Systems:** S/4HANA, BTP, Datasphere, Integration Suite, Build Process Automation
- **Contacts:** [[Deepthi Damodaran]], [[Blake Goddard]]
- **Architects:** [[Navjot Sharma]], [[Neyez Akbar Khan]]
- **Related ADRs:** [[ADR - SAP Data Product]], [[ADR - SAP to AWS Connectivity]]
- **Context:** [[Page - Context - SAP Ecosystem at BA]]

### Microsoft
**[[Organisation - Microsoft]]**
- **Role:** Enterprise software and cloud services provider
- **Systems:** Microsoft 365, Power Platform, Entra ID (Azure AD), Power Apps
- **Key Projects:** Power Apps initiatives, Entra ID integration
- **Related ADRs:** [[ADR - ADR for Power Apps Integration]]
- **Related Meetings:** [[Meeting - 2025-04-11 Meeting with Microsoft - Power Platform & Copilot Studio]]

---

## Aviation/Engineering Software

### Logic Software
**[[Organisation - Logic Software]]**
- **Role:** Aviation ticketing and workflow software provider
- **Key Projects:** [[Project - Sparks - Logic Software - Ticketing System]]
- **Systems:** Sparks (ticketing system for engineering and maintenance)
- **Related Meetings:**
  - [[Meeting - 2025-04-03 Logic Software]]
  - [[Meeting - 2025-08-11 British Airways and Logic Software Technical Discussion]]

---

## Integration & Middleware

### Axway
**[[Organisation - Axway]]**
- **Role:** Integration middleware and API management provider
- **Systems:** Integration platform, API Gateway, SFTP solutions
- **Status:** Historical integration platform, being replaced/supplemented by cloud-native alternatives
- **Related Meetings:**
  - [[Meeting - 2024-11-25 Axway Cloud Delivery Model Meeting]]
  - [[Meeting - 2024-11-27 Axway Technical Presentation]]

---

## Systems Integrators & Consultancies

### TCS (Tata Consultancy Services)
**[[Organisation - TCS]]**
- **Role:** Global IT services and systems integrator
- **Projects:** Various BA digital transformation and implementation projects

### ANDigital
**[[Organisation - ANDigital]]**
- **Role:** Digital consultancy and systems integrator
- **Projects:** Digital transformation, agile delivery

### Oliver Wyman
**[[Organisation - Oliver Wyman]]**
- **Role:** Management consultancy
- **Projects:** Strategy and advisory services
- **Related Meetings:** [[Meeting - 2025-06-09 Intro to OW]]

### Hayes
**[[Organisation - Hayes]]**
- **Role:** Recruitment and staffing services
- **Projects:** Technical resource augmentation

---

## Other Vendors & Partners

### Teamviewer
**[[Organisation - Teamviewer]]**
- **Role:** Remote support and collaboration software
- **Systems:** Remote desktop, support tools

### Leightons
**[[Organisation - Leightons]]**
- **Role:** Healthcare services (opticians)
- **Services:** Employee vision care and support

---

## All Organisations (Complete List)

### Alphabetical Directory

```dataview
TABLE
  file.link as "Organisation",
  role as "Role",
  tags as "Tags"
FROM ""
WHERE type = "Organisation"
SORT file.name ASC
```

---

## Organisations by Project

### Active Project Relationships

```dataview
TABLE
  file.link as "Organisation",
  length(file.inlinks) as "References",
  choice(length(file.inlinks) > 10, "🔥 High Activity",
         length(file.inlinks) > 5, "📈 Active",
         "📊 Standard") as "Activity Level"
FROM ""
WHERE type = "Organisation"
SORT length(file.inlinks) DESC
```

---

## Quick Stats

### Organisation Types

```dataview
TABLE WITHOUT ID
  "**Category**" as Category,
  length(rows) as "Count"
FROM ""
WHERE type = "Organisation"
GROUP BY choice(
  contains(file.name, "BA") OR contains(file.name, "IAG"), "Internal",
  contains(file.name, "Boeing") OR contains(file.name, "Collins"), "Aviation Systems",
  contains(file.name, "SAP") OR contains(file.name, "Microsoft"), "Enterprise Software",
  contains(file.name, "Logic Software"), "Aviation/Engineering Software",
  contains(file.name, "Axway"), "Integration & Middleware",
  contains(file.name, "TCS") OR contains(file.name, "ANDigital") OR contains(file.name, "Oliver Wyman") OR contains(file.name, "Hayes"), "Consultancies",
  "Other"
) as Category
SORT Category ASC
```

---

## Related Project Mappings

### Key Projects by Organisation

**Boeing:**
- [[Project - 777-X EIS Programme]]
- [[ADR - Fleetlink Migration]]

**SAP:**
- [[Project - Caerus]]
- [[Project - Axia (was EWS Futures)]]
- [[ADR - SAP Data Product]]
- [[ADR - SAP to AWS Connectivity]]

**Logic Software:**
- [[Project - Sparks - Logic Software - Ticketing System]]

**Microsoft:**
- Power Apps initiatives
- [[ADR - ADR for Power Apps Integration]]

---

## Finding Organisations

### By People

To find which organisation a person works for:

```dataview
TABLE
  file.link as "Person",
  organisation as "Organisation",
  role as "Role"
FROM ""
WHERE type = "Person"
  AND organisation != null
SORT organisation ASC, file.name ASC
LIMIT 30
```

---

### By Meetings

Organisations mentioned in recent meetings:

```dataview
TABLE
  file.link as "Meeting",
  date as "Date",
  project as "Project"
FROM ""
WHERE type = "Meeting"
  AND date != null
  AND (contains(string(file.outlinks), "Organisation"))
SORT date DESC
LIMIT 20
```

---

## Contact Management

### Organisations with Primary Contacts

**Boeing:**
- Ryan Sands (ryan.j.sands2@boeing.com)
- Kenneth Krzyzewski (kenneth.c.krzyzewski@boeing.com)
- Kody Linscott (kody.c.linscott@boeing.com)
- Mason Winchell (mason.l.winchell@boeing.com)

**SAP:**
- [[Deepthi Damodaran]]
- [[Blake Goddard]]
- [[Navjot Sharma]] (BA SAP Architect)
- [[Neyez Akbar Khan]] (BA SAP Architect)

**Note:** For complete contact details, see individual People notes linked from each organisation.

---

## Vendor Categories

### Strategic Partners
Organisations with ongoing strategic relationships and multiple active projects:
- [[Organisation - Boeing]]
- [[Organisation - SAP]]
- [[Organisation - Microsoft]]

### Project-Specific Vendors
Organisations engaged for specific projects or capabilities:
- [[Organisation - Collins Aerospace]]
- [[Organisation - Logic Software]]

### Systems Integrators
Organisations providing implementation and consulting services:
- [[Organisation - TCS]]
- [[Organisation - ANDigital]]
- [[Organisation - Oliver Wyman]]

### Legacy/Transitioning
Organisations whose role is changing or being phased out:
- [[Organisation - Axway]] (transitioning from on-premises to cloud alternatives)

---

## Maintenance Notes

### Adding New Organisations

When creating a new Organisation note:
1. Use template: `+Templates/Organisation`
2. Include: name, role, key contacts, related projects
3. Add to this MOC in appropriate category
4. Link from related Project and Person notes

### Updating Organisation Notes

Monthly review:
- Update contact information
- Add new project relationships
- Update role and status
- Review meeting attendance and activity

---

## Related MOCs

- [[Dashboard - Dashboard]] - Main navigation hub
- [[MOC - People MOC]] - People directory
- [[MOC - Projects MOC]] - Project tracking
- [[MOC - Technology & Architecture MOC]] - Technology landscape
- [[MOC - Weblinks MOC]] - External resources

---

**MOC Version:** 1.0
**Total Organisations:** `= length(filter(dv.pages(""), (p) => p.type == "Organisation"))`
**Last Updated:** 2026-01-07
**Maintained By:** Solutions Architecture Team
