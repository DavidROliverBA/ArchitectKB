---
type: Page
pillar: node
title: How to Use This Vault
created: 2026-01-07
modified: 2026-01-31
tags: [activity/documentation, audience/architect]
nodeRelationships: []
entityRelationships: []
---

# How to Use This Vault

> **Welcome to ArchitectKB! This guide introduces the seven-pillar ontology and helps you get started.**

Last Updated: 2026-01-31 | Version 2.0.0

---

## Quick Start

### Your First 15 Minutes

1. **Open [[_Dashboard]]** - Your central navigation hub
2. **Review example notes** - See how different note types work
3. **Create your first daily note** - Type `/daily` and start capturing
4. **Explore MOCs** - Maps of Content organise everything
5. **Customise context** - Update `.claude/context/` files with your info

### Your First Day

1. **Complete [[Page - Vault Setup Checklist]]** - Systematic setup
2. **Create Person notes** - Add your team members
3. **Create Project notes** - Document your active projects
4. **Try Claude skills** - Use `/meeting`, `/task`, `/adr`
5. **Customise templates** - Adapt to your workflow

---

## The Seven-Pillar Ontology

ArchitectKB v2.0 organises knowledge into **seven pillars**:

| Pillar         | Nature             | Location          | Purpose                         |
| -------------- | ------------------ | ----------------- | ------------------------------- |
| **Entities**   | Things that exist  | Root              | Actors and objects in the world |
| **Nodes**      | Units of knowledge | Root              | Understanding that persists     |
| **Events**     | Things that happen | Folders           | Temporal occurrences            |
| **Views**      | Aggregated data    | Root              | Reports and dashboards          |
| **Artifacts**  | External resources | `Attachments/`    | Reference materials collected   |
| **Governance** | Rules & standards  | `Sync/`           | Policies and guardrails         |
| **Navigation** | Finding aids       | Root (`_` prefix) | Help locate content             |

**Core Principle:** _Events happen TO entities and ABOUT nodes. Views aggregate data. Governance constrains decisions. Artifacts provide reference._

### Why Seven Pillars?

- **Projects end, but knowledge persists** - Separate temporal events from lasting knowledge
- **Clear locations** - Know exactly where to find and create content
- **AI-friendly** - Structured for Claude Code to understand relationships
- **Scalable** - Works for personal notes and enterprise knowledge bases

---

## Pillar 1: Entities (Things that exist)

Things with independent existence. Located in the **root directory** with type prefixes.

### Entity Types

| Type         | Pattern                  | Example                        |
| ------------ | ------------------------ | ------------------------------ |
| Person       | `Person - Name.md`       | `Person - Jane Smith.md`       |
| System       | `System - Name.md`       | `System - AMOS.md`             |
| Organisation | `Organisation - Name.md` | `Organisation - Acme Corp.md`  |
| DataAsset    | `DataAsset - Name.md`    | `DataAsset - Customer Data.md` |
| Location     | `Location - Name.md`     | `Location - Heathrow T5.md`    |

### Creating Entities

```bash
/person Jane Smith     # Create a person
/system Payment API    # Document a system
```

Or use templates from `Templates/`.

---

## Pillar 2: Nodes (Units of knowledge)

Knowledge that persists beyond events. Located in the **root directory** with type prefixes.

### Node Types

| Type       | Pattern                 | Purpose                              |
| ---------- | ----------------------- | ------------------------------------ |
| Concept    | `Concept - Title.md`    | What is X? Definitions, explanations |
| Pattern    | `Pattern - Title.md`    | How to do X. Approaches, methods     |
| Capability | `Capability - Title.md` | What we can do. Skills, abilities    |
| Theme      | `Theme - Title.md`      | Cross-cutting concerns               |
| Weblink    | `Weblink - Title.md`    | External resources and references    |

### When to Create Nodes

- **Concept** - Defining terminology, explaining ideas
- **Pattern** - Documenting reusable approaches
- **Capability** - Tracking what your team/org can do
- **Theme** - Cross-cutting concerns like "Data Quality" or "Security"
- **Weblink** - Saving useful external resources

```bash
/weblink https://...   # Save URL with AI summary
```

---

## Pillar 3: Events (Things that happen)

Temporal occurrences. Located in **dedicated folders**.

### Event Types

| Type           | Location         | Example                                   |
| -------------- | ---------------- | ----------------------------------------- |
| Meeting        | `Meetings/YYYY/` | `Meeting - 2026-01-31 Sprint Planning.md` |
| Project        | `Projects/`      | `Project - Cloud Migration.md`            |
| Task           | `Tasks/`         | `Task - Review API design.md`             |
| ADR            | `ADRs/`          | `ADR - Use PostgreSQL.md`                 |
| Daily          | `Daily/YYYY/`    | `Daily - 2026-01-31.md`                   |
| Incubator      | `Incubator/`     | `Incubator - AI Code Review.md`           |
| Workstream     | `Projects/`      | `Workstream - Data Migration.md`          |
| Forum          | `Projects/`      | `Forum - Architecture Review Board.md`    |
| Email          | `Emails/`        | `Email - Jane - API proposal.md`          |
| Trip           | `Trips/`         | `Trip - London.md`                        |
| FormSubmission | `Forms/`         | `FormSubmission - DPIA for Project X.md`  |

### Creating Events

```bash
/daily                    # Today's daily note
/meeting Sprint Planning  # Meeting with prompts
/task Review API design   # Quick task
/adr Use PostgreSQL       # Architecture decision
/incubator AI Review      # Research idea
```

---

## Pillar 4: Views (Aggregated data)

Reports and dashboards. Located in the **root directory**.

### View Types

| Type      | Pattern                 | Purpose                    |
| --------- | ----------------------- | -------------------------- |
| Dashboard | `_Dashboard - Scope.md` | Dynamic overview with data |
| Query     | `Query - Name.md`       | Saved Dataview queries     |
| ArchModel | `ArchModel - Name.md`   | Architecture diagram views |

Views use Dataview queries to aggregate and display information from other notes.

---

## Pillar 5: Artifacts (External resources)

Reference materials collected. Located in `Attachments/`.

- PDFs, images, documents
- Imported content
- Screenshots and diagrams

---

## Pillar 6: Governance (Rules & standards)

Policies and guardrails. Located in `Sync/`.

| Type      | Location           | Purpose                 |
| --------- | ------------------ | ----------------------- |
| Policy    | `Sync/Policies/`   | Organisational policies |
| Guardrail | `Sync/Guardrails/` | Technical guardrails    |
| Org-ADR   | `Sync/Org-ADRs/`   | Organisation-wide ADRs  |

These are typically synced from external sources (Confluence, SharePoint).

---

## Pillar 7: Navigation (Finding aids)

Maps of Content for discovery. Located in the **root directory** with `_` prefix.

### Key MOCs

| MOC                                | Purpose                |
| ---------------------------------- | ---------------------- |
| [[_MOC - Projects]]                | Project portfolio      |
| [[_MOC - Tasks]]                   | All tasks by priority  |
| [[_MOC - People]]                  | Contact directory      |
| [[_MOC - Meetings]]                | Meeting history        |
| [[_MOC - ADRs]]                    | Architecture decisions |
| [[_MOC - Incubator]]               | Research ideas         |
| [[_MOC - Weblinks]]                | External resources     |
| [[_MOC - Vault Quality Dashboard]] | Health monitoring      |

The `_` prefix ensures MOCs sort to the top of the file list.

---

## The `pillar` and `type` Fields

Every note has **two key fields** in its frontmatter:

```yaml
type: Project # What kind of note this is
pillar: event # Which pillar it belongs to
```

### Pillar Values

| Pillar       | Note Types                                                      |
| ------------ | --------------------------------------------------------------- |
| `entity`     | Person, System, Organisation, DataAsset, Location               |
| `node`       | Concept, Pattern, Capability, Theme, Weblink, Article           |
| `event`      | Meeting, Project, Task, ADR, Daily, Incubator, Workstream, etc. |
| `view`       | Dashboard, Query, ArchModel                                     |
| `governance` | Policy, Guardrail                                               |
| `navigation` | MOC                                                             |

---

## Relationship Fields

All content notes include relationship fields:

```yaml
nodeRelationships: [] # Links to knowledge (Concepts, Patterns)
entityRelationships: [] # Links to things (People, Systems)
```

### Example

```yaml
nodeRelationships:
  - "[[Concept - Event-Driven Architecture]]"
  - "[[Pattern - CQRS]]"
entityRelationships:
  - "[[Person - Jane Smith]]"
  - "[[System - Kafka]]"
```

These relationships help Claude Code understand context and find related content.

---

## Daily Workflows

### Morning Routine (5 min)

```
1. /daily                           # Create today's note
2. Review yesterday's "Tomorrow"    # What did I plan?
3. List today's priorities          # What's important?
4. Note scheduled meetings          # What's on calendar?
```

### During the Day

- **Capture in daily note** - Quick thoughts, links, progress
- **Create proper notes** - Tasks, meetings, decisions get their own notes
- **Link everything** - Connect daily note to projects, people, tasks

### Evening Routine (10 min)

```
1. Review progress                  # What did I accomplish?
2. Complete task checkboxes         # What's done?
3. Note wins and challenges         # Reflect
4. Plan tomorrow                    # Set priorities
```

### Weekly Review (30 min)

```
1. /weekly-summary                  # Generate summary from daily notes
2. Review all open tasks            # Reprioritise
3. Update project statuses          # Are projects progressing?
4. Archive completed items          # Clean up vault
5. Plan next week                   # Set weekly goals
```

---

## Navigation Mastery

### The Dashboard

**[[_Dashboard]]** is your home base:

- Quick stats (open tasks, active projects)
- Recent activity
- Links to all MOCs
- Quick capture links

**Pin it** for fast access!

### Search Strategies

**Graph-first search** (fastest):

```bash
/q kafka                    # Full-text search
/q type:ADR status:proposed # Filter by metadata
/q backlinks:"Project - X"  # Find references
```

**Find by pillar:**

- `pillar: entity` - All entities
- `pillar: node` - All knowledge nodes
- `pillar: event` - All events

---

## Claude Code Integration

### Using Skills

**Invoke via slash commands:**

```
/daily              # Create today's note
/meeting Review     # Create meeting note
/task Fix bug       # Quick task
/adr GraphQL        # New ADR
/person Jane Smith  # New contact
/weblink https://...# Save URL
```

**Or just ask naturally:**

```
"Create a meeting note for architecture review"
"Find all decisions about Kubernetes"
"Generate a weekly summary"
```

### Customising Context

**Update these files** with your information:

```
.claude/context/
├── projects.md       # Your active projects
├── technology.md     # Your tech stack
├── people.md         # Your team & stakeholders
├── acronyms.md       # Your domain terminology
├── architecture.md   # Your architecture principles
└── organisations.md  # Your vendors/partners
```

---

## Quality and Maintenance

### Weekly Maintenance (15 min)

Use [[_MOC - Vault Quality Dashboard]]:

1. **Fix critical issues** - Broken links, missing types
2. **Update metadata** - Add summaries, set priorities
3. **Clean up** - Archive completed tasks

### Monthly Maintenance (30 min)

1. **Review ADRs** - Check if decisions are still valid
2. **Update people** - New team members, role changes
3. **Archive projects** - Move completed projects
4. **Update context** - Keep `.claude/context/` current

---

## Tips for Success

### Start Simple

Don't create everything at once:

1. Week 1: Daily notes + meetings
2. Week 2: Add tasks and people
3. Week 3: Start ADRs for decisions
4. Week 4: Create project notes
5. Month 2+: Refine and customise

### Be Consistent

**Daily habits:**

- Morning: Create daily note, plan day
- During: Capture in real-time
- Evening: Review, reflect, plan tomorrow

### Link Everything

**The power is in connections:**

- Daily notes → projects, tasks, people
- Meetings → projects, attendees, decisions
- ADRs → projects, related ADRs, systems

**More links = more valuable over time!**

---

## Getting Help

### Resources

- **[[Page - Vault Setup Checklist]]** - Step-by-step setup
- **[[_Dashboard]]** - Your daily starting point
- **[[_MOC - Vault Quality Dashboard]]** - Maintenance help
- **Individual README files** in folders

### Common Questions

**Q: Where do I put X?**
A: Check the pillar - Entities and Nodes go in root, Events go in their folders.

**Q: How do I organise projects/tasks?**
A: Use frontmatter fields (`status`, `priority`) + Dataview queries in MOCs.

**Q: What if I don't use Claude Code?**
A: The vault works fine! Create notes manually from templates.

---

## Next Steps

**If you're new:**

1. Complete [[Page - Vault Setup Checklist]]
2. Create your first daily note
3. Add 2-3 people you work with
4. Document 1-2 active projects
5. Use it daily for a week

**If you're experienced:**

1. Customise MOCs for your domains
2. Update Claude context files
3. Create team-specific content
4. Contribute improvements back!

---

**Welcome to ArchitectKB. Happy note-taking!**
