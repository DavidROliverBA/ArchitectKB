---
type: Page
title: Vault Setup Checklist
created: 2026-01-07
modified: 2026-01-07
tags: [guide, setup, onboarding]
---

# ✅ Vault Setup Checklist

> **Follow this checklist to set up and customize your architect vault**

Last Updated: 2026-01-07

---

## Phase 1: Initial Setup (30 minutes)

### Download and Install

- [ ] **Download/clone this vault template**

  ```bash
  git clone https://github.com/yourorg/obsidian-architect-vault-template.git
  cd obsidian-architect-vault-template
  ```

- [ ] **Install Obsidian** (if not already installed)
  - Download from: https://obsidian.md
  - Install and launch

- [ ] **Open vault in Obsidian**
  - File → Open Vault
  - Select the template directory
  - Click "Open"

### Install Required Plugins

- [ ] **Enable Community Plugins**
  - Settings → Community Plugins
  - Turn off "Restricted Mode" (if prompted)
  - Click "Browse" to search plugins

- [ ] **Install Dataview**
  - Search: "Dataview"
  - Click "Install"
  - Click "Enable"
  - **CRITICAL**: Required for all MOCs to work!

- [ ] **Install Templater**
  - Search: "Templater"
  - Click "Install"
  - Click "Enable"
  - Configure: Settings → Templater
    - Template folder location: `+Templates`
    - Enable "Trigger Templater on new file creation"

### Optional but Recommended Plugins

- [ ] **Calendar** - Visual daily note creation
  - Settings: Daily notes folder = `+Daily/[current-year]`

- [ ] **Tag Wrangler** - Manage hierarchical tags

- [ ] **Recent Files** - Quick access to recent notes

- [ ] **Excalidraw** - Draw diagrams in notes (if you make diagrams)

- [ ] **Kanban** - Kanban boards from markdown (optional)

### Configure Obsidian Settings

- [ ] **Files & Links**
  - New link format: Shortest path possible
  - Use [[Wiki Links]]: ON
  - Automatically update internal links: ON

- [ ] **Daily Notes** (if using Calendar plugin)
  - Date format: `YYYY-MM-DD`
  - New file location: `+Daily/[current-year]`
  - Template file location: `+Templates/Daily.md`

- [ ] **Appearance** (personal preference)
  - Choose theme
  - Adjust font size
  - Enable/disable features

### Verify Setup

- [ ] **Open Dashboard**
  - Navigate to `Dashboard - Dashboard.md`
  - Verify Dataview queries load (may show empty tables - that's OK)

- [ ] **Open a MOC**
  - Try `MOC - Tasks MOC.md`
  - Verify Dataview tables appear (will be empty)

- [ ] **Test template**
  - Create new note from `+Templates/Task.md`
  - Verify Templater prompts appear
  - Delete test note after verification

---

## Phase 2: Personalization (1 hour)

### Update README

- [ ] **Edit README.md**
  - Replace "Obsidian Architect Vault Template" with your vault name
  - Update "Your Name/Organization" placeholders
  - Add your email/contact if sharing with team
  - Update customization sections

### Replace Example Content

**People:**

- [ ] **Delete example people** (or keep as examples)
  - `Jane Smith.md`
  - `Alex Johnson.md`
  - `Dr. Sarah Chen.md`

- [ ] **Add your real people**
  - Use `/person` skill or template
  - Add: Manager, teammates, key stakeholders
  - Minimum: 3-5 people to start

**Projects:**

- [ ] **Delete or archive example projects**
  - Move to an `_Examples/` folder if you want to keep them

- [ ] **Add your real projects**
  - Use `+Templates/Project.md`
  - Add: 2-3 current active projects
  - Include: Status, priority, timeline, stakeholders

**Organisations:**

- [ ] **Delete example organizations**
  - `Organisation - Your Company.md`
  - `Organisation - CloudVendor Inc.md`

- [ ] **Add your real organizations**
  - Your company/division
  - Key vendors (cloud provider, SaaS tools)
  - Consulting partners

**ADRs:**

- [ ] **Keep example ADRs** (as reference) OR delete them
  - They show good ADR practices
  - Delete if they're confusing for your context

- [ ] **Create your first real ADR** (optional now, important later)
  - Use `/adr` skill
  - Document a recent or upcoming decision

### Update Claude Context Files

**Critical for Claude Code integration:**

- [ ] **`.claude/context/projects-template.md`**
  - Replace example projects with your actual projects
  - Add project details: timeline, stakeholders, goals
  - Remove template suffix from filename: `projects.md`

- [ ] **`.claude/context/technology-template.md`**
  - Document your tech stack (cloud, databases, languages, tools)
  - List approved vs pilot vs deprecated technologies
  - Link to relevant ADRs
  - Remove template suffix: `technology.md`

- [ ] **`.claude/context/people-template.md`**
  - Add your team structure
  - List key stakeholders and leadership
  - Document approval workflows
  - Remove template suffix: `people.md`

- [ ] **`.claude/context/acronyms-template.md`**
  - Add your organization/domain-specific acronyms
  - Include project code names
  - Document any jargon
  - Remove template suffix: `acronyms.md`

- [ ] **`.claude/context/architecture-template.md`**
  - Document your architecture principles
  - List approved patterns
  - Define governance processes
  - Remove template suffix: `architecture.md`

- [ ] **`.claude/context/organisations-template.md`**
  - List key vendors and partners
  - Add contract information
  - Document procurement processes
  - Remove template suffix: `organisations.md`

**Important:** Rename files by removing `-template` suffix so Claude Code finds them!

### Customize Templates

- [ ] **Review all templates** in `+Templates/`
  - Adjust frontmatter fields to your needs
  - Add/remove sections
  - Update inline instructions

- [ ] **ADR template**
  - Update `approvers` list to your actual approvers
  - Adjust approval workflow documentation
  - Modify sections if needed

- [ ] **Meeting template**
  - Add standard sections for your meeting types
  - Customize for recurring meetings

- [ ] **Project template**
  - Add custom fields (budget, team size, etc.)
  - Adjust sections to your project management approach

---

## Phase 3: First Week Usage (Daily)

### Day 1: Get Comfortable

- [ ] **Create your first daily note**
  - Use `/daily` skill
  - Capture: Tasks for today, notes, reflections
  - Link to any projects or people

- [ ] **Explore MOCs**
  - Open each MOC
  - Understand the views
  - Bookmark favorites

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
  - See what's working
  - Identify cleanup needed
  - Fix any broken links or missing metadata

- [ ] **Adjust your workflow**
  - What's working well?
  - What feels clunky?
  - Customize templates/workflows

---

## Phase 4: Advanced Setup (Month 1)

### Architecture Documentation

- [ ] **Document your architecture**
  - Create `Page - Architecture Principles.md` (example provided)
  - Create `Page - Tech Stack Overview.md` (example provided)
  - Add pages for key architectural concepts

- [ ] **Create ADRs for major decisions**
  - Document recent major technology choices
  - Standardize on ADR format
  - Link ADRs to projects

- [ ] **Build MOC for your domains**
  - Customize `MOC - Cloud Architecture` for your cloud setup
  - Customize `MOC - Data Platform` if you have data projects
  - Create new domain MOCs for your specializations

### Team Collaboration (if applicable)

- [ ] **Share vault setup with team**
  - Git repository for team vault
  - Document team conventions
  - Train team on vault usage

- [ ] **Define team processes**
  - ADR approval workflow
  - Meeting note standards
  - Task assignment conventions
  - Project update frequency

- [ ] **Create team-specific content**
  - Team roster (Person notes)
  - Team projects
  - Team ADRs and standards

### Automation and Scripts

- [ ] **Review available scripts** (`scripts/README.md`)
  - Identify useful automation
  - Install Python dependencies if needed

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
  - Set up automated backups

---

## Phase 5: Ongoing Maintenance

### Weekly Tasks (15 min)

- [ ] **Review open tasks**
  - Update priorities
  - Close completed tasks
  - Create new tasks as needed

- [ ] **Update project statuses**
  - Review all active projects
  - Update progress notes
  - Adjust timelines if needed

- [ ] **Check Vault Quality Dashboard**
  - Fix broken links
  - Add missing metadata
  - Archive old completed items

### Monthly Tasks (30 min)

- [ ] **Review ADRs**
  - Check if decisions are still valid
  - Update `reviewed` dates
  - Deprecate if needed

- [ ] **Update people and organizations**
  - Add new team members
  - Update roles/titles
  - Add new vendors

- [ ] **Clean up attachments**
  - Remove unused files
  - Optimize large images
  - Organize by project if needed

- [ ] **Update Claude context files**
  - Refresh project list
  - Update tech stack
  - Add new acronyms

### Quarterly Tasks (1 hour)

- [ ] **Strategic review**
  - Analyze vault usage patterns
  - Identify what's working vs not
  - Adjust structure if needed

- [ ] **Archive old content**
  - Move completed projects to archive
  - Clean up old daily notes (>1 year)
  - Remove obsolete documentation

- [ ] **Review and refine**
  - Update templates based on usage
  - Improve MOC queries
  - Simplify workflows

---

## Troubleshooting

### Dataview Queries Not Working

**Problem:** MOCs show "No results" or error messages

**Solution:**

1. Verify Dataview plugin is installed and enabled
2. Check if example notes exist (they should show in queries)
3. Verify frontmatter has `type` field
4. Check for YAML syntax errors in frontmatter

### Templates Not Working

**Problem:** Templates don't prompt for input

**Solution:**

1. Verify Templater plugin is installed and enabled
2. Check Templater settings:
   - Template folder: `+Templates`
   - "Trigger on new file creation" enabled
3. Try manually: Right-click note → Templater → Replace templates

### Broken Links

**Problem:** Links show as plain text or with `[[]]` visible

**Solution:**

1. Verify wiki-link syntax: `[[Note Name]]` not `[Note Name](path)`
2. Check file exists with exact name
3. Use Obsidian's link autocomplete (type `[[` and select)

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
- [ ] **Personalized context** files (removed `-template` suffix)
- [ ] **Daily note habit** established
- [ ] **No critical quality issues** (per Quality Dashboard)

---

## Next Steps

**You're ready!** Now:

1. **Use it daily** - Build the habit
2. **Link aggressively** - Connect everything
3. **Review weekly** - Keep it clean
4. **Iterate** - Customize as you learn

**Resources:**

- [Page - How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md) - Comprehensive guide
- [Dashboard - Main Dashboard](Dashboard%20-%20Main%20Dashboard.md) - Your daily starting point
- [MOC - Vault Quality Dashboard](MOC%20-%20Vault%20Quality%20Dashboard.md) - Maintenance help

**Get help:**

- GitHub Issues - Report problems or request features
- Obsidian Forums - General Obsidian questions
- Claude Code - Ask questions about your vault

---

**Happy note-taking! You're now equipped with a powerful knowledge management system.** 🚀
