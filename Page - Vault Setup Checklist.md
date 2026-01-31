---
type: Page
pillar: node
title: Vault Setup Checklist
created: 2026-01-07
modified: 2026-01-31
tags: [activity/documentation, audience/architect]
nodeRelationships: []
entityRelationships: []
---

# Vault Setup Checklist

> **Follow this checklist to set up and customise your ArchitectKB vault**

Last Updated: 2026-01-31 | Version 2.0.0

---

## Phase 1: Initial Setup (30 minutes)

### Download and Install

- [ ] **Download/clone this vault template**

  ```bash
  git clone https://github.com/DavidROliverBA/ArchitectKB.git
  cd ArchitectKB
  ```

- [ ] **Install dependencies**

  ```bash
  npm install
  npm run vault:index
  ```

- [ ] **Install Obsidian** (if not already installed)
  - Download from: https://obsidian.md
  - Install and launch

- [ ] **Open vault in Obsidian**
  - File → Open Vault
  - Select the ArchitectKB directory
  - Click "Open"

### Install Required Plugins

- [ ] **Enable Community Plugins**
  - Settings → Community Plugins
  - Turn off "Restricted Mode" (if prompted)
  - Click "Browse" to search plugins

- [ ] **Install Dataview**
  - Search: "Dataview"
  - Click "Install" → "Enable"
  - **CRITICAL**: Required for all MOCs to work!

- [ ] **Install Templater**
  - Search: "Templater"
  - Click "Install" → "Enable"
  - Configure: Settings → Templater
    - Template folder location: `Templates`
    - Enable "Trigger Templater on new file creation"

### Optional but Recommended Plugins

- [ ] **Calendar** - Visual daily note creation
  - Settings: Daily notes folder = `Daily/[current-year]`

- [ ] **Tag Wrangler** - Manage hierarchical tags

- [ ] **Recent Files** - Quick access to recent notes

- [ ] **Excalidraw** - Draw diagrams in notes

### Configure Obsidian Settings

- [ ] **Files & Links**
  - New link format: Shortest path possible
  - Use [[Wiki Links]]: ON
  - Automatically update internal links: ON

- [ ] **Daily Notes** (if using Calendar plugin)
  - Date format: `YYYY-MM-DD`
  - New file location: `Daily/[current-year]`
  - Template file location: `Templates/Daily.md`

### Verify Setup

- [ ] **Open Dashboard**
  - Navigate to `_Dashboard.md`
  - Verify Dataview queries load

- [ ] **Open a MOC**
  - Try `_MOC - Tasks.md`
  - Verify Dataview tables appear

- [ ] **Test template**
  - Create new note from `Templates/Task.md`
  - Verify Templater prompts appear
  - Delete test note after verification

---

## Phase 2: Understand the Structure (15 minutes)

### The Seven Pillars

Review the seven-pillar ontology:

| Pillar         | Location          | Content                                           |
| -------------- | ----------------- | ------------------------------------------------- |
| **Entities**   | Root              | Person, System, Organisation, DataAsset, Location |
| **Nodes**      | Root              | Concept, Pattern, Capability, Theme, Weblink      |
| **Events**     | Folders           | Meeting, Project, Task, ADR, Daily, etc.          |
| **Views**      | Root              | Dashboard, Query, ArchModel                       |
| **Artifacts**  | `Attachments/`    | PDFs, images, documents                           |
| **Governance** | `Sync/`           | Policy, Guardrail, Org-ADR                        |
| **Navigation** | Root (`_` prefix) | MOC                                               |

### Folder Structure

```
ArchitectKB/
├── Meetings/YYYY/       # Meeting notes by year
├── Projects/            # Project and workstream notes
├── Tasks/               # Task notes
├── ADRs/                # Architecture Decision Records
├── Daily/YYYY/          # Daily notes by year
├── Incubator/           # Research ideas
├── Emails/              # Email correspondence
├── Trips/               # Trip planning
├── Forms/               # Form submissions
├── Attachments/         # Media and documents
├── Archive/             # Archived content (by pillar)
├── Templates/           # Note templates
├── Sync/                # Governance (policies, guardrails)
├── [Entity notes]       # Person -, System -, etc.
├── [Node notes]         # Concept -, Pattern -, etc.
├── _MOC - *.md          # Navigation (sorted first)
└── _Dashboard*.md       # Dashboards (sorted first)
```

---

## Phase 3: Personalisation (1 hour)

### Replace Example Content

**People:**

- [ ] **Delete or keep example people**
  - `Person - Jane Smith.md`
  - `Person - Alex Johnson.md`
  - `Person - Dr Sarah Chen.md`

- [ ] **Add your real people**
  - Use `/person` skill or template
  - Add: Manager, teammates, key stakeholders
  - Minimum: 3-5 people to start

**Projects:**

- [ ] **Archive example projects** (in `Projects/`)

- [ ] **Add your real projects**
  - Use `Templates/Project.md`
  - Add: 2-3 current active projects

**Organisations:**

- [ ] **Replace example organisations**
  - `Organisation - CloudVendor Inc.md`

- [ ] **Add your real organisations**
  - Your company/division
  - Key vendors
  - Consulting partners

**ADRs:**

- [ ] **Keep example ADRs** (as reference) OR archive them

- [ ] **Create your first real ADR**
  - Use `/adr` skill
  - Document a recent decision

### Update Claude Context Files

**Critical for Claude Code integration:**

- [ ] **`.claude/context/projects.md`**
  - Replace example projects with your actual projects
  - Add project details: timeline, stakeholders, goals

- [ ] **`.claude/context/technology.md`**
  - Document your tech stack
  - List approved vs pilot vs deprecated technologies

- [ ] **`.claude/context/people.md`**
  - Add your team structure
  - List key stakeholders and leadership

- [ ] **`.claude/context/acronyms.md`**
  - Add your organisation/domain-specific acronyms
  - Include project code names

- [ ] **`.claude/context/architecture.md`**
  - Document your architecture principles
  - List approved patterns

- [ ] **`.claude/context/organisations.md`**
  - List key vendors and partners
  - Add contract information

### Customise Templates

- [ ] **Review all templates** in `Templates/`
  - Adjust frontmatter fields to your needs
  - Add/remove sections
  - Update inline instructions

- [ ] **ADR template**
  - Update `approvers` list to your actual approvers
  - Adjust approval workflow documentation

- [ ] **Meeting template**
  - Add standard sections for your meeting types

- [ ] **Project template**
  - Add custom fields (budget, team size, etc.)

---

## Phase 4: First Week Usage (Daily)

### Day 1: Get Comfortable

- [ ] **Create your first daily note**
  - Use `/daily` skill
  - Capture: Tasks for today, notes, reflections
  - Link to any projects or people

- [ ] **Explore MOCs**
  - Open each MOC (files starting with `_MOC`)
  - Understand the views
  - Bookmark favourites

- [ ] **Create 2-3 tasks**
  - Use `/task` skill
  - Set priorities and due dates
  - Link to projects if applicable

### Day 2-5: Build Habits

- [ ] **Daily note every morning**
  - Plan your day
  - Review yesterday's note

- [ ] **Capture meeting notes** (as they happen)
  - Use `/meeting` skill
  - Link attendees, projects
  - Note decisions and actions

- [ ] **Link everything**
  - Practice linking notes together
  - Connect daily notes to tasks/projects/people
  - Build your knowledge graph

### Day 6-7: Review and Refine

- [ ] **Weekly review**
  - Review all daily notes from the week
  - Update task statuses
  - Archive completed tasks
  - Plan next week

- [ ] **Check Vault Quality Dashboard**
  - Open `_MOC - Vault Quality Dashboard.md`
  - See what's working
  - Identify cleanup needed

- [ ] **Adjust your workflow**
  - What's working well?
  - What feels clunky?
  - Customise templates/workflows

---

## Phase 5: Advanced Setup (Month 1)

### Architecture Documentation

- [ ] **Document your architecture**
  - Create Concept notes for key ideas
  - Create Pattern notes for approaches
  - Add Pages for detailed documentation

- [ ] **Create ADRs for major decisions**
  - Document recent major technology choices
  - Standardise on ADR format
  - Link ADRs to projects and systems

- [ ] **Build MOC for your domains**
  - Customise existing MOCs
  - Create new domain MOCs for your specialisations

### Automation and Scripts

- [ ] **Review available scripts** (`scripts/README.md`)
  - Identify useful automation
  - Set up scheduled index rebuilds

- [ ] **Set up Git version control** (recommended)

  ```bash
  git init
  git add .
  git commit -m "Initial vault setup"
  git remote add origin <your-repo>
  git push -u origin main
  ```

- [ ] **Configure backup strategy**
  - Option 1: Git + GitHub (recommended)
  - Option 2: Obsidian Sync
  - Option 3: Cloud storage (Dropbox, iCloud, OneDrive)

---

## Phase 6: Ongoing Maintenance

### Weekly Tasks (15 min)

- [ ] **Review open tasks**
  - Update priorities
  - Close completed tasks
  - Create new tasks as needed

- [ ] **Update project statuses**
  - Review all active projects
  - Update progress notes

- [ ] **Check Vault Quality Dashboard**
  - Fix broken links
  - Add missing metadata
  - Archive old completed items

### Monthly Tasks (30 min)

- [ ] **Review ADRs**
  - Check if decisions are still valid
  - Update `reviewed` dates

- [ ] **Update people and organisations**
  - Add new team members
  - Update roles/titles

- [ ] **Update Claude context files**
  - Refresh project list
  - Update tech stack
  - Add new acronyms

### Quarterly Tasks (1 hour)

- [ ] **Run /vault-maintenance**
  - Comprehensive health check
  - Follow recommendations

- [ ] **Strategic review**
  - Analyse vault usage patterns
  - Adjust structure if needed

- [ ] **Archive old content**
  - Move completed projects to `Archive/Events/`
  - Clean up old daily notes

---

## Troubleshooting

### Dataview Queries Not Working

**Problem:** MOCs show "No results" or error messages

**Solution:**

1. Verify Dataview plugin is installed and enabled
2. Check if example notes exist
3. Verify frontmatter has `type` and `pillar` fields
4. Check for YAML syntax errors in frontmatter

### Templates Not Working

**Problem:** Templates don't prompt for input

**Solution:**

1. Verify Templater plugin is installed and enabled
2. Check Templater settings:
   - Template folder: `Templates`
   - "Trigger on new file creation" enabled
3. Try manually: Right-click note → Templater → Replace templates

### Claude Skills Not Working

**Problem:** `/daily` or `/meeting` commands don't work

**Solution:**

1. These are Claude Code skills, not built-in Obsidian commands
2. Use Claude Code (claude.ai/code) to invoke them
3. Or create notes manually using templates

---

## Success Metrics

After setup, you should have:

- [ ] **10-15 notes** created (daily notes, meetings, tasks, people)
- [ ] **5+ links** between notes (knowledge graph forming)
- [ ] **All MOCs** loading without errors
- [ ] **Personalised context** files updated
- [ ] **Daily note habit** established
- [ ] **No critical quality issues** (per Quality Dashboard)

---

## Next Steps

**You're ready!** Now:

1. **Use it daily** - Build the habit
2. **Link aggressively** - Connect everything
3. **Review weekly** - Keep it clean
4. **Iterate** - Customise as you learn

**Resources:**

- [[Page - How to Use This Vault]] - Comprehensive guide
- [[_Dashboard]] - Your daily starting point
- [[_MOC - Vault Quality Dashboard]] - Maintenance help

**Get help:**

- GitHub Issues - Report problems or request features
- Obsidian Forums - General Obsidian questions
- Claude Code - Ask questions about your vault

---

**Happy note-taking! You're now equipped with a powerful knowledge management system.**
