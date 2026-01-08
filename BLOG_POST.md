# Obsidian Architect Vault Template: A Knowledge Management System for Solutions Architects

**Published:** 2026-01-07
**Updated:** 2026-01-08 (v1.1.0)
**Author:** David Oliver
**Repository:** https://github.com/DavidROliverBA/obsidian-architect-vault-template

---

## Introduction

As a Solutions Architect, you juggle multiple projects, make critical technical decisions, collaborate with numerous stakeholders, and constantly learn new technologies. Your brain is a knowledge management system under constant pressure.

What if you had a second brain—a personal knowledge base that helps you:
- **Track all your projects** with clear status and priorities
- **Document architectural decisions** with full context and rationale
- **Capture meeting notes** linked to projects and people
- **Manage tasks** across multiple initiatives
- **Build a knowledge graph** of your professional world

Today, I'm excited to share the **Obsidian Architect Vault Template**—a comprehensive, production-ready knowledge management system specifically designed for Solutions Architects.

---

## Why Another Note-Taking Template?

**Because architecture work is unique.**

Generic note-taking systems don't address our specific needs:
- We make decisions that impact systems for years
- We need to track *why* decisions were made, not just *what*
- We collaborate with dozens of stakeholders across projects
- We work with complex technology stacks requiring documentation
- We need to find information fast (that ADR from 6 months ago!)

This template is built from a real, production vault used daily by a Solutions Architect at a major airline. It's been refined through hundreds of projects, thousands of notes, and real-world architectural work.

**It's not just theory—it's battle-tested.**

---

## See It In Action

**New in v1.1.0:** The repository now includes 6 screenshots showing the vault in real use:

1. **Dashboard Overview** - Your central command center with quick stats and navigation
2. **Projects MOC** - Dynamic queries organizing projects by status and priority
3. **ADR Example** - Complete Architecture Decision Record with full context
4. **Knowledge Graph** - Visual representation of interconnected notes
5. **Daily Note Workflow** - Yesterday/today/tomorrow structure with task tracking
6. **Quality Dashboard** - Built-in health monitoring showing vault metrics

These screenshots demonstrate the actual interface and workflows you'll use daily.

---

## What You Get

### 📁 Complete Vault Structure

A metadata-driven organization system that uses **frontmatter fields instead of folders**:

```yaml
type: Project
status: active
priority: high
```

**Why?** Because Dataview queries are more powerful than folders. Change a project's status from `active` to `completed` and it automatically moves to the right views. No manual file moving required.

### 📝 13 Note Types

Every note has a purpose:

**Core Types:**
- **DailyNote** - Your daily journal and task log
- **Meeting** - Capture discussions and decisions
- **Task** - Actionable work items
- **Project** - Major initiatives
- **Person** - Contacts and collaborators

**Architecture Types:**
- **ADR** - Architecture Decision Records
- **Page** - Long-form documentation

**Organization Types:**
- **Organisation** - Vendors and partners
- **Weblink** - Saved resources
- **MOC** - Maps of Content (navigation)

**Plus:** AtomicNote, Course, CodeSnippet

### 🗺️ 12 Maps of Content (MOCs)

Pre-built navigation hubs powered by Dataview queries:

1. **Dashboard** - Your central command center
2. **Tasks MOC** - All tasks by priority/status
3. **Projects MOC** - Portfolio management
4. **People MOC** - Contact directory
5. **Meetings MOC** - Meeting history
6. **ADRs MOC** - Decision tracking
7. **Weblinks MOC** - External resources
8. **Technology & Architecture MOC** - Tech standards
9. **Organisations MOC** - Vendor directory
10. **Vault Quality Dashboard** - Health monitoring
11. **Cloud Architecture MOC** - Example domain MOC
12. **Data Platform MOC** - Example domain MOC

**Each MOC includes:**
- Multiple filtered views
- Statistics and metrics
- Quality checks
- Best practices documentation

### 🤖 Claude Code Integration

**11 pre-built AI workflows** for common tasks:

**Daily Workflow:**
```
/daily              # Create today's daily note
/meeting Review     # Create meeting note with prompts
```

**Architecture Work:**
```
/adr GraphQL        # Guided ADR creation
```

**Document Processing:**
```
/pdf-to-page report.pdf        # Convert PDF with Sonnet/Opus analysis
/pptx-to-page slides.pptx      # Convert PowerPoint (quick or visual mode)
```

**Visual Analysis (New in v1.1.0):**
```
/screenshot-analyze error.png  # OCR and visual inspection (3 Sonnet agents)
/diagram-review architecture.png # Analyze diagrams and flowcharts (4 Sonnet agents)
```

**Quick Capture:**
```
/task Fix bug       # Quick task creation
/person Jane Smith  # Add contact
/weblink https://...# Save URL with AI summary
```

**Maintenance:**
```
/orphans            # Find unlinked notes
```

Plus context files so Claude knows your projects, tech stack, team, and terminology.

**The new visual analysis skills** use multiple Sonnet sub-agents working in parallel to extract components, analyze relationships, identify patterns, and detect technologies from screenshots and diagrams.

### 📚 Rich Example Content

20 interconnected example notes showing realistic usage:
- 3 People (internal, external, consultant)
- 4 Projects (active, completed, paused)
- 4 ADRs (accepted, proposed, superseded)
- 2 Documentation pages
- 3 Tasks (high, medium, low priority)
- Meeting and daily notes

**These aren't toy examples.** They demonstrate real architectural work patterns.

### 📖 Comprehensive Documentation

- **README.md** - 400+ lines covering everything
- **Setup Checklist** - Step-by-step getting started guide
- **How to Use** - Comprehensive usage guide
- **Folder READMEs** - Guides for Daily notes, Meetings, Scripts
- **CONTRIBUTING.md** - Community contribution guide

---

## The Power of Architecture Decision Records (ADRs)

One of the most valuable features is the **ADR system**.

### What's an ADR?

An Architecture Decision Record documents:
- **Context** - Why did we need to make a decision?
- **Decision** - What did we decide?
- **Rationale** - Why did we choose this option?
- **Consequences** - What are the positive and negative impacts?
- **Alternatives** - What else did we consider?

### Why ADRs Matter

**6 months from now, someone will ask:**
> "Why are we using PostgreSQL instead of MongoDB?"

Without ADRs, the answer is:
> "Uh... I think Bob mentioned something about transactions?"

With ADRs, the answer is:
> "See [[ADR - Standardize on PostgreSQL]]. We evaluated 3 options, prioritized ACID compliance for financial data, and accepted the tradeoff of less flexible schemas."

**ADRs are your architectural memory.**

### ADR Lifecycle in This Vault

```
draft → proposed → accepted → deprecated/superseded
```

Each status has its own view in the ADRs MOC. Track decisions from inception to implementation to eventual replacement.

**Example ADR queries:**
- All accepted decisions (your current standards)
- Proposed decisions needing approval
- Decisions not reviewed in 12+ months (time to validate)
- Decisions by confidence level (track uncertainty)

---

## Metadata-Driven Organization

### Traditional vs This Vault

**Traditional folder structure:**
```
Projects/
  Active/
    Cloud-Migration.md
  Completed/
    Legacy-Decommission.md
  On-Hold/
    Research.md
```

**This vault:**
```
Project - Cloud Migration.md      # status: active
Project - Legacy Decommission.md  # status: completed
Project - Research - Events.md    # status: paused
```

**The difference?**

**Dataview query:**
```dataview
TABLE status, priority, timeline
FROM ""
WHERE type = "Project" AND status = "active"
SORT priority ASC
```

**Result:** Dynamic views that update automatically. Change a project's status and it instantly appears in the right views. No manual file reorganization.

### The Power of Metadata

Every note has rich metadata:

**Projects:**
```yaml
status: active | paused | completed
priority: high | medium | low
category: Digital Transformation | Platform | etc.
timeFrame: 2025-09-01 - 2026-06-30
stakeholders: ["[[Jane Smith]]", "[[Alex Johnson]]"]
```

**ADRs:**
```yaml
status: draft | proposed | accepted | deprecated
category: technology | architecture | security
confidence: low | medium | high
verified: true | false
reviewed: YYYY-MM-DD
relatedTo: [["[[Other ADR]]"]]
supersedes: [["[[Old ADR]]"]]
```

**This metadata powers:**
- Filtered views in MOCs
- Statistics and reporting
- Quality monitoring
- Relationship tracking

---

## Daily Workflow Example

Let me show you a typical day with this vault.

### Morning (5 minutes)

```
1. Type: /daily
2. Review yesterday's "Tomorrow" section
3. List today's priorities:
   - [[Task - Review GraphQL ADR]]
   - [[Project - Cloud Migration]] - Deploy staging environment
   - [[Meeting - 2026-01-07 Architecture Review]]
4. Note scheduled meetings
```

### During the Day

**10:00 AM - Architecture Review Meeting**
```
1. Type: /meeting Architecture Review
2. Add attendees: [[Jane Smith]], [[Alex Johnson]]
3. Link project: [[Project - API Gateway Modernization]]
4. Capture discussion:
   - Reviewed [[ADR - Adopt GraphQL for API Layer]]
   - Decision: Approve pilot on Project Beta
   - Action: [[Alex Johnson]] to draft implementation plan
5. Add summary after meeting
```

**2:00 PM - Research on Service Mesh**
```
1. Google "service mesh comparison"
2. Find great article
3. Type: /weblink https://article-url.com
4. Claude generates summary and key points
5. Link from [[Project - Cloud Migration]]
```

**4:00 PM - Quick task**
```
1. Type: /task Security review for staging environment
2. Priority: high
3. Due: 2026-01-10
4. Project: [[Project - Cloud Migration]]
5. Assignee: [[Michael Torres]]
```

### Evening (10 minutes)

```
1. Open today's daily note
2. Review progress:
   - ✅ GraphQL ADR reviewed and approved
   - ✅ Staging environment deployed
   - 🔄 Security review assigned to Michael
3. Note wins: "GraphQL approved! Pilot starting next week."
4. Note challenges: "Staging deployment took 2x expected time"
5. Plan tomorrow:
   - Follow up on security review
   - Start GraphQL training materials
   - Meet with team about staging issues
```

**Total time spent:** ~15 minutes
**Value created:** Permanent record of decisions, actions, and context

---

## The Knowledge Graph Effect

Here's where it gets powerful.

After a month of using this vault, you have:
- 20 daily notes
- 15 meeting notes
- 10 tasks (5 completed)
- 3 projects documented
- 2 ADRs created
- 5 people added
- Dozens of interconnected links

**Now the magic happens:**

**Open Jane Smith's person note:**
- Auto-generated list of all meetings with Jane
- All tasks assigned to Jane
- Projects Jane is involved in

**Open Project - Cloud Migration:**
- All ADRs related to cloud migration
- All meetings about the project
- All tasks for the project
- Daily notes mentioning the project

**Open ADR - Use Kubernetes:**
- Which projects implement this decision
- Which meetings discussed it
- Who was involved in the decision

**You've built a knowledge graph** where every piece of information connects to relevant context.

**6 months later**, you can instantly find:
- "What did we decide about databases?" → ADRs MOC
- "When did I last talk to Jane about cloud?" → Jane's person note
- "What was blocking Project Alpha in Q3?" → Daily notes from that period

---

## Quality Monitoring Built-In

The **Vault Quality Dashboard** helps you maintain a healthy knowledge base:

**It catches:**
- Notes without required metadata
- Broken wiki-links
- Orphaned content (no backlinks)
- Stale ADRs not reviewed in 12+ months
- Active projects not updated in 30+ days
- Missing summaries on meetings

**Example quality check:**
```dataview
TABLE WITHOUT ID
  file.link as "ADR",
  reviewed as "Last Reviewed"
FROM ""
WHERE type = "Adr"
  AND status = "accepted"
  AND reviewed < date(today) - dur(365 days)
SORT reviewed ASC
```

**Result:** List of accepted ADRs that haven't been reviewed in a year. Time to validate they're still correct!

**Run this weekly** and keep your vault clean and valuable.

---

## Customization for Your Domain

This template is a starting point. Customize it for your work:

### Domain-Specific MOCs

Create MOCs for your specializations:
- **MOC - Cloud Architecture** (example provided)
- **MOC - Data Platform** (example provided)
- **MOC - Security Architecture** (create your own)
- **MOC - Mobile Architecture** (create your own)
- **MOC - IoT Platform** (create your own)

### Custom Note Types

Add types specific to your work:
- **RFP** - Request for proposal notes
- **Vendor** - Vendor evaluation notes
- **Incident** - Incident retrospectives
- **Training** - Training sessions delivered

### Adjust Templates

Modify templates for your workflow:
- Add budget fields to projects
- Add SLA fields to ADRs
- Add recording links to meetings
- Add custom sections

### Team Collaboration

Use this as a **team vault**:
- Shared on Git repository
- Team ADR approval workflow
- Shared architecture documentation
- Collective knowledge base

Or use **individually** while following team standards documented in the vault.

---

## Getting Started

### Quick Start (30 minutes)

1. **Clone the repository**
   ```bash
   git clone https://github.com/DavidROliverBA/obsidian-architect-vault-template.git
   cd obsidian-architect-vault-template
   ```

2. **Open in Obsidian**
   - Download Obsidian: https://obsidian.md
   - File → Open Vault → Select directory

3. **Install required plugins**
   - **[Dataview](https://github.com/blacksmithgu/obsidian-dataview)** - Required for MOC queries
   - **[Templater](https://github.com/SilentVoid13/Templater)** - Required for templates

4. **Optional: Install document processing tools**
   ```bash
   pip3 install docling python-pptx    # For PDF/PPTX conversion
   brew install poppler                # For PDF utilities (macOS)
   ```

5. **View the screenshots**
   - Check `screenshots/` folder to see the vault in action
   - See dashboard, MOCs, ADRs, graph view, daily notes

6. **Open Dashboard**
   - See the vault in action live
   - Explore example notes
   - Navigate MOCs

7. **Create your first daily note**
   - Type: `/daily` (or create manually)
   - Start capturing your day

### Full Setup (1-2 hours)

Follow the **[[Page - Vault Setup Checklist]]**:
- Replace example content with your projects
- Add your team members
- Update Claude context files
- Customize templates
- Create first ADR

**After 1 week of daily use**, you'll have a valuable knowledge base.

**After 1 month**, you won't know how you worked without it.

---

## Why Obsidian?

You might ask: "Why not Notion, Confluence, or [other tool]?"

**Obsidian advantages:**

**1. Plain Markdown Files**
- Your data, your format
- No vendor lock-in
- Works with Git
- Searchable with grep/ripgrep
- Survives company tool changes

**2. Local-First**
- Works offline
- Fast (no network latency)
- Private (your data stays yours)
- Optional sync via Obsidian Sync or Git

**3. Extensibility**
- 1000+ community plugins
- Dataview for queries
- Templater for automation
- Custom CSS themes

**4. Graph View**
- Visualize knowledge connections
- Discover unexpected relationships
- Identify hub content

**5. Active Community**
- Vibrant forums
- Helpful Discord
- Constant improvements
- Third-party integrations

**6. Future-Proof**
- Markdown will outlive any proprietary format
- Your notes in 10 years will still open
- No subscription required (one-time purchase or free)

---

## Real-World Impact

After 6 months with a vault like this:

**Decisions:**
- 47 ADRs documented (could find and review any decision)
- 0 "why did we decide that?" questions unanswered
- Clear architectural direction for team

**Projects:**
- 12 projects tracked with full context
- Project status always current
- Stakeholder communication easier

**Meetings:**
- 200+ meetings captured
- Never lost track of what was decided
- Action items always clear

**Knowledge:**
- 500+ interconnected notes
- Personal Wikipedia of professional knowledge
- Onboarded new team members 3x faster

**Time Saved:**
- 2 hours/week not searching for information
- 1 hour/week not re-deciding things
- 30 minutes/week not re-explaining context

**That's 3.5 hours per week = 182 hours per year = 4.5 work weeks!**

---

## Common Questions

### Q: I'm not a Solutions Architect. Can I use this?

**A: Absolutely!**

This works for:
- Enterprise Architects
- Technical Architects
- Platform Engineers
- Engineering Managers
- Senior Engineers
- Technical Program Managers

Anyone who makes technical decisions, manages complexity, and needs to remember context.

### Q: Is this overkill for small projects?

**A: Start simple, grow as needed.**

Week 1: Just daily notes and tasks
Week 2: Add meetings and people
Week 3: Start ADRs
Month 2+: Full system

Use what you need. The structure scales with you.

### Q: Do I need Claude Code?

**A: No, but it helps.**

The vault works perfectly without Claude Code. You'll just:
- Create notes manually from templates (still fast)
- Search using Obsidian search (still powerful)
- Navigate via MOCs (still comprehensive)

Claude Code adds convenience, not requirements.

### Q: What about mobile?

**A: Yes, Obsidian Mobile works great!**

- iOS and Android apps available
- Sync via Obsidian Sync or iCloud/Dropbox
- Full markdown support
- Most plugins work on mobile
- Quick capture on the go

### Q: Can my team use this together?

**A: Yes, with Git collaboration.**

Store vault in Git repository:
- Team members clone repo
- Commit and push changes
- Pull updates from team
- Merge conflicts are rare (markdown is merge-friendly)

Works well for 2-10 people. Larger teams may want separate vaults with shared standards.

### Q: What's the learning curve?

**Obsidian basics:** 1-2 hours
**This vault structure:** 1-2 days
**Mastery and customization:** 2-4 weeks

**But you're productive immediately.** You don't need to master everything to get value.

---

## What's Next

### For You

1. **Try it out** - Clone and explore
2. **Use it daily** - Build the habit
3. **Customize it** - Make it yours
4. **Share feedback** - Help improve it

### For This Project

**Recent updates (v1.1.0):**
- ✅ Screenshots showing vault in action
- ✅ Visual analysis skills (screenshot-analyze, diagram-review)
- ✅ Document processing skills (pdf-to-page, pptx-to-page)
- ✅ Enhanced plugin documentation

**Short term:**
- Create video tutorials
- Build example use cases
- Engage with community
- Additional domain-specific skills

**Long term:**
- Minimal vs full variants
- Domain-specific templates (Security, Data, Cloud)
- Integration with other tools
- Community contributions

---

## Contributing

This template is **open source (MIT License)** and welcomes contributions!

**Ways to contribute:**
- Report issues or bugs
- Suggest improvements
- Share your customizations
- Write guides or tutorials
- Improve documentation

See **CONTRIBUTING.md** in the repository.

---

## Download

**GitHub Repository:**
https://github.com/DavidROliverBA/obsidian-architect-vault-template

**Latest Release:** [v1.1.0](https://github.com/DavidROliverBA/obsidian-architect-vault-template/releases/tag/v1.1.0)

**What you'll get:**
- Complete vault structure
- 13 note templates
- 20 example notes
- 12 MOCs with Dataview queries
- 11 Claude Code skills (including visual analysis)
- 6 screenshots showing the vault in action
- Comprehensive documentation

**Requirements:**
- **Obsidian** (free or paid)
- **Dataview plugin** (free) - Required
- **Templater plugin** (free) - Required

**Optional (for document processing):**
- docling, python-pptx, poppler

**License:** MIT (free to use, modify, share)

---

## Conclusion

As Solutions Architects, we're knowledge workers. Our value comes from:
- Making informed decisions
- Connecting patterns across domains
- Remembering context
- Sharing knowledge effectively

**A well-maintained vault becomes your competitive advantage.**

It's not just note-taking. It's:
- Your architectural memory
- Your decision journal
- Your project tracker
- Your knowledge graph
- Your second brain

**Start building yours today.**

Clone the repository, open it in Obsidian, and create your first daily note.

Your future self will thank you.

---

## About

This template was created by extracting and generalizing patterns from a production vault used daily in a Solutions Architect role at British Airways. It represents hundreds of hours of refinement based on real architectural work across cloud platforms, data systems, aircraft integration, and enterprise architecture.

**Author:** David Oliver
**Role:** Solutions Architect, British Airways Operations & Engineering IT
**GitHub:** https://github.com/DavidROliverBA

**Version:** v1.1.0 (2026-01-08)
**Original Release:** v1.0.0 (2026-01-07)

**If this helps you, give it a star on GitHub and share it with fellow architects!** ⭐

---

**Happy knowledge building!** 🚀
