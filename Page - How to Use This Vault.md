---
type: Page
title: How to Use This Vault
created: 2026-01-07
modified: 2026-01-07
tags: [guide, onboarding, documentation]
---

# 🎯 How to Use This Vault

> **Welcome to your Obsidian Architect Vault! This guide will help you get started.**

Last Updated: 2026-01-07

---

## Quick Start

### Your First 15 Minutes

1. **Open [Dashboard - Main Dashboard](Dashboard%20-%20Main%20Dashboard.md)** - Your central navigation hub
2. **Review example notes** - See how different note types work
3. **Create your first daily note** - Type `/daily` and start capturing
4. **Explore MOCs** - Maps of Content organize everything
5. **Customize context** - Update `.claude/context/` files with your info

### Your First Day

1. **Complete [Page - Vault Setup Checklist](Page%20-%20Vault%20Setup%20Checklist.md)** - Systematic setup
2. **Create Person notes** - Add your team members
3. **Create Project notes** - Document your active projects
4. **Try Claude skills** - Use `/meeting`, `/task`, `/adr`
5. **Customize templates** - Adapt to your workflow

---

## Understanding the Vault Structure

### Metadata-Driven Organization

This vault uses **metadata (frontmatter) over folders** for organization:

**Traditional folder approach:**

```
Projects/
  Active/
    Cloud Migration.md
  Completed/
    Legacy Decommission.md
```

**This vault's approach:**

```
Project - Cloud Migration.md       (status: active)
Project - Legacy Decommission.md   (status: completed)
```

**Why?** Because:

- Dataview can filter/sort by any field
- No need to move files when status changes
- Multiple dimensions of organization (status, priority, category, etc.)
- Flat structure is easier to navigate and search

### The `type` Field

Every note has a `type` field that determines its purpose:

```yaml
type: Project    # A project you're working on
type: Task       # A to-do item or action
type: Meeting    # Meeting notes
type: Person     # Contact information
type: ADR        # Architecture Decision Record
type: Page       # Long-form documentation
# ... and 7 more types
```

**MOCs use Dataview to query by type:**

```dataview
TABLE status, priority
FROM ""
WHERE type = "Project" AND status = "active"
```

### Special Folders

Folders prefixed with `+` have special purposes:

| Folder          | Purpose                                   |
| --------------- | ----------------------------------------- |
| `+Daily/`       | Daily journal entries (organized by year) |
| `+Meetings/`    | All meeting notes                         |
| `+Attachments/` | Images, PDFs, documents                   |
| `+Templates/`   | Note templates                            |
| `+Inbox/`       | Quick capture landing zone                |

**Everything else** lives in the root directory!

---

## The 13 Note Types

### Core Types (Use Daily)

**1. DailyNote** (`+Daily/YYYY/YYYY-MM-DD.md`)

- Personal journal and daily log
- Task tracking, reflections, ideas
- Create with: `/daily`

**2. Meeting** (`+Meetings/Meeting - YYYY-MM-DD Title.md`)

- Capture discussions, decisions, action items
- Link attendees and projects
- Create with: `/meeting <title>`

**3. Task** (`Task - [Title].md`)

- Actionable work items
- Track priority, due date, assignee
- Create with: `/task <title>`

**4. Project** (`Project - [Name].md`)

- Major initiatives and workstreams
- Track status, stakeholders, timeline
- Create manually from template

**5. Person** (`[Full Name].md`)

- Contact info and collaboration notes
- NO "Person -" prefix for clean links
- Create with: `/person <name>`

### Architecture Types

**6. Adr** (`ADR - [Decision].md`)

- Architecture Decision Records
- Document context, decision, rationale, consequences
- Create with: `/adr <title>`

**7. Page** (`Page - [Title].md`)

- Long-form documentation and guides
- Reference material, how-tos, standards
- Create manually from template

### Organization Types

**8. Organisation** (`Organisation - [Name].md`)

- Vendors, partners, consultancies
- Track contracts, key contacts, projects
- Create manually from template

**9. Weblink** (`Weblink - [Title].md`)

- Saved URLs with summaries
- External resources and references
- Create with: `/weblink <url>`

**10. MOC** (`MOC - [Topic] MOC.md`)

- Maps of Content (navigation hubs)
- Dataview-powered filtered views
- 12 MOCs provided, customize as needed

### Advanced Types

**11. AtomicNote** (`[Topic].md`)

- Small, focused notes on single topics
- Building blocks for larger ideas
- Zettelkasten-style notes

**12. Course** (`Course - [Name].md`)

- Online courses, training, certifications
- Track progress and learnings

**13. CodeSnippet** (`Snippet - [Language] - [Description].md`)

- Reusable code examples
- Code recipes and patterns

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
2. Review all open tasks            # Reprioritize
3. Update project statuses          # Are projects progressing?
4. Archive completed items          # Clean up vault
5. Plan next week                   # Set weekly goals
```

---

## Creating Content

### Creating Notes

**Via Claude Skills** (Fastest):

- `/daily` - Today's daily note
- `/meeting <title>` - Meeting note with prompts
- `/task <title>` - Quick task creation
- `/adr <title>` - Guided ADR creation
- `/person <name>` - New contact
- `/weblink <url>` - Save URL with AI summary

**Via Templates** (More control):

1. Open `+Templates/` folder
2. Copy desired template
3. Paste in root directory (or appropriate folder)
4. Fill in frontmatter
5. Rename file following conventions

### Linking Notes

**Wiki-link syntax:**

```markdown
[[Note Title]] # Link to note
[[Note Title|Display Text]] # Link with custom text
[[Note Title#Section]] # Link to specific section
```

**Best practices:**

- Link liberally - more connections = more valuable
- Link people in meetings: `attendees: ["[[Jane Smith]]"]`
- Link projects in tasks: `project: "[[Project - Cloud Migration]]"`
- Link context in daily notes: `Worked on [[Project Name]] today`

### Using Tags

**In frontmatter (NO # prefix):**

```yaml
tags: [project, cloud, infrastructure]
tags: [adr, technology/database]  # Hierarchical tags
```

**In content:**

```markdown
This is a note about #cloud-architecture and #kubernetes
```

**Hierarchical tags:**

```
#domain/infrastructure
#technology/aws/eks
#activity/architecture-review
#project/cloud-migration
```

---

## Navigation Mastery

### The Dashboard

**[Dashboard - Main Dashboard](Dashboard%20-%20Main%20Dashboard.md)** is your home base:

- Quick stats (open tasks, active projects)
- Recent activity
- Links to all MOCs
- Quick capture links

**Pin it** for fast access!

### Maps of Content (MOCs)

**12 MOCs organize your vault:**

**Core Navigation:**

1. [MOC - Tasks MOC](MOC%20-%20Tasks%20MOC.md) - All tasks by priority/status
2. [MOC - Projects MOC](MOC%20-%20Projects%20MOC.md) - Project portfolio
3. [MOC - People MOC](MOC%20-%20People%20MOC.md) - Contact directory
4. [MOC - Meetings MOC](MOC%20-%20Meetings%20MOC.md) - Meeting history
5. [MOC - ADRs MOC](MOC%20-%20ADRs%20MOC.md) - Architecture decisions

**Content & Organization:** 6. [MOC - Weblinks MOC](MOC%20-%20Weblinks%20MOC.md) - External resources 7. [MOC - Technology & Architecture MOC](MOC%20-%20Technology%20&%20Architecture%20MOC.md) - Tech standards 8. [MOC - Organisations MOC](MOC%20-%20Organisations%20MOC.md) - Vendors/partners

**Vault Management:** 9. [MOC - Vault Quality Dashboard](MOC%20-%20Vault%20Quality%20Dashboard.md) - Health monitoring

**Domain Examples** (Customize for your needs): 10. [MOC - Cloud Architecture](MOC%20-%20Cloud%20Architecture.md) - Cloud infrastructure knowledge 11. [MOC - Data Platform](MOC%20-%20Data%20Platform.md) - Data engineering knowledge

### Search Strategies

**Find by type:**

- Search: `type: Project` - All projects
- Search: `type: Adr` - All ADRs

**Find by metadata:**

- Search: `status: active` - Active items
- Search: `priority: high` - High priority

**Find by links:**

- Search: `[[Jane Smith]]` - All mentions of Jane
- Search: `[[Project - Cloud Migration]]` - All references to project

**Find by content:**

- Just search keywords - Obsidian's full-text search is excellent

### Graph View

**Open graph**: Click graph icon or `Ctrl/Cmd + G`

**What it shows:**

- Visual representation of note connections
- Hub notes (heavily linked) appear large
- Clusters show related content
- Orphaned notes are isolated

**Use it to:**

- Discover unexpected connections
- Identify hub content
- Find orphaned notes
- Visualize knowledge domains

---

## Claude Code Integration

### What is Claude Code?

Claude Code is an AI coding assistant that integrates with this vault through:

- **Skills** - Workflows like `/daily`, `/meeting`, `/adr`
- **Context** - Domain knowledge in `.claude/context/`
- **Assistance** - Help with queries, summaries, searches

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

### Customizing Context

**Update these files** with your information:

```
.claude/context/
├── projects-template.md       # Your active projects
├── technology-template.md     # Your tech stack
├── people-template.md         # Your team & stakeholders
├── acronyms-template.md       # Your domain terminology
├── architecture-template.md   # Your architecture principles
└── organisations-template.md  # Your vendors/partners
```

**Why?** So Claude can:

- Answer questions about your specific projects
- Recommend approved technologies
- Know your team structure
- Understand your acronyms

### Getting Help from Claude

**Ask about:**

- "What projects am I working on?"
- "Who should approve this ADR?"
- "What's our standard database?"
- "Show me all high-priority tasks"
- "Generate a project status report"
- "Find all meetings with Jane Smith"

Claude has access to:

- Your entire vault
- Context files
- Vault conventions
- Note relationships

---

## Quality and Maintenance

### Weekly Maintenance (15 min)

**Use [MOC - Vault Quality Dashboard](MOC%20-%20Vault%20Quality%20Dashboard.md):**

1. **Fix critical issues**:
   - Broken links
   - Notes without type
   - Orphaned notes

2. **Update metadata**:
   - Add missing summaries to meetings
   - Set priority on tasks
   - Categorize ADRs

3. **Clean up**:
   - Archive completed tasks
   - Update stale projects
   - Remove duplicate notes

### Monthly Maintenance (30 min)

1. **Review ADRs** - Check if decisions are still valid
2. **Update people** - New team members, role changes
3. **Archive projects** - Move completed projects
4. **Check attachments** - Remove unused files
5. **Update context** - Keep `.claude/context/` current

### Quality Metrics

**Health indicators:**

- Notes with type: 100%
- Orphaned notes: <5%
- Broken links: 0
- ADRs with status: 100%
- Active projects updated <30 days: >90%

**Check via:** [MOC - Vault Quality Dashboard](MOC%20-%20Vault%20Quality%20Dashboard.md)

---

## Customization

### Adapting to Your Needs

**This vault is a starting point!** Customize it:

**1. Adjust note types**:

- Remove unused types
- Add custom types
- Modify templates

**2. Create domain MOCs**:

- [MOC - Cloud Architecture](MOC%20-%20Cloud%20Architecture.md) (example provided)
- [MOC - Data Platform](MOC%20-%20Data%20Platform.md) (example provided)
- Add your own (Security, Mobile, IoT, etc.)

**3. Modify workflows**:

- Adjust daily note structure
- Customize meeting templates
- Add sections to ADR template

**4. Add fields**:

- Extra frontmatter fields for your needs
- Custom tags
- Additional metadata

### Team Adaptation

**If using as a team:**

- Add team-specific People notes
- Document team projects
- Create team ADRs
- Shared terminology in acronyms
- Team architecture principles

**Keep individual:**

- Daily notes (personal reflection)
- Some tasks (personal to-dos)
- Learning notes
- Research notes

---

## Tips for Success

### Start Simple

Don't create everything at once:

1. Week 1: Daily notes + meetings
2. Week 2: Add tasks and people
3. Week 3: Start ADRs for decisions
4. Week 4: Create project notes
5. Month 2+: Refine and customize

### Be Consistent

**Daily habits:**

- Morning: Create daily note, plan day
- During: Capture in real-time
- Evening: Review, reflect, plan tomorrow

**Weekly habits:**

- Weekly review: Tasks, projects, priorities
- Update stale content
- Archive completed work

### Link Everything

**The power is in connections:**

- Daily notes → projects, tasks, people
- Meetings → projects, attendees, decisions
- Tasks → projects, assignees
- ADRs → projects, related ADRs

**More links = more valuable over time!**

### Trust the System

**Don't overthink:**

- Capture first, organize later
- Use +Inbox for quick capture
- Refine during weekly review
- System gets better with use

---

## Getting Help

### Resources

- **This guide** - You're reading it!
- **[Page - Vault Setup Checklist](Page%20-%20Vault%20Setup%20Checklist.md)** - Step-by-step setup
- **Individual README files**:
  - `+Daily/README.md` - Daily note guide
  - `+Meetings/README.md` - Meeting capture guide
  - `scripts/README.md` - Script documentation
- **Example notes** - Learn from examples in vault
- **MOC - Vault Quality Dashboard** - Maintenance help

### Common Questions

**Q: Where do I put X?**
A: Root directory for most notes. Special folders (+Daily, +Meetings, +Attachments) for those types only.

**Q: How do I organize projects/tasks?**
A: Use frontmatter fields (`status`, `priority`) + Dataview queries in MOCs. Don't create folder hierarchies.

**Q: Can I use folders?**
A: Yes, but you'll lose the power of metadata-driven queries. Special folders (+Daily, etc.) are the exception.

**Q: What if I don't use Claude Code?**
A: The vault works fine without it! You'll just create notes manually from templates instead of using skills.

**Q: How do I backup?**
A: Use Git (recommended), Obsidian Sync, or cloud folder sync (Dropbox/iCloud/OneDrive).

### Community

- **GitHub Repo** - Report issues, request features
- **Obsidian Forums** - General Obsidian questions
- **Obsidian Discord** - Real-time community help

---

## Next Steps

**If you're new:**

1. Complete [Page - Vault Setup Checklist](Page%20-%20Vault%20Setup%20Checklist.md)
2. Create your first daily note
3. Add 2-3 people you work with
4. Document 1-2 active projects
5. Use it daily for a week

**If you're experienced:**

1. Customize MOCs for your domains
2. Update Claude context files
3. Create team-specific content
4. Share with colleagues
5. Contribute improvements back!

---

**Welcome to your new knowledge management system. Happy note-taking!** 🚀
