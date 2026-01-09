# Obsidian Architect Vault Template

> A comprehensive, metadata-driven Obsidian vault template for Solutions Architects to manage projects, decisions, meetings, and technical knowledge.

## 🎯 What is This?

This is a **production-ready Obsidian vault template** designed specifically for Solutions Architects, Technical Architects, and Enterprise Architects. It provides a complete organizational framework for:

- **Architecture Decision Records (ADRs)** - Document and track technical decisions
- **Project Management** - Track active projects, tasks, and deliverables
- **Meeting Notes** - Capture and link meetings to projects and people
- **Knowledge Management** - Build a personal knowledge base with cross-linked notes
- **Team Directory** - Track stakeholders, colleagues, and external contacts
- **Quality Monitoring** - Built-in dashboard to maintain vault health

### ✨ Key Features

- **Metadata-Driven Organization** - Notes organized by `type` field, not folders
- **Powerful Navigation** - 12 Maps of Content (MOCs) powered by Dataview queries
- **Claude Code Integration** - 14 AI-assisted workflows + Node.js automation
- **Quality Indicators** - Track confidence, freshness, and verification status
- **Relationship Tracking** - Link ADRs, projects, and decisions
- **Example Content** - Rich examples showing best practices
- **Zero Lock-In** - Plain markdown files, works with any text editor

---

## 📸 Screenshots

> **Note:** Screenshots are currently placeholders. See `screenshots/README.md` for capture guidelines. Contributions welcome!

### Dashboard - Your Central Hub

![Dashboard Overview](screenshots/dashboard.png)

*The Dashboard provides quick navigation to all MOCs, active tasks, current projects, and recent meetings with real-time statistics.*

### Projects MOC - Dynamic Dataview Queries

![Projects MOC](screenshots/projects-moc.png)

*Projects automatically organize by status (Active, Paused, Completed) with priority filtering and timeline tracking.*

### Architecture Decision Record (ADR) Example

![ADR Example](screenshots/adr-example.png)

*Complete ADR showing context, decision, rationale, consequences, and alternatives with relationship tracking.*

### Knowledge Graph View

![Graph View](screenshots/graph-view.png)

*Visual representation of interconnected notes - people, projects, meetings, and decisions forming a knowledge graph.*

### Daily Note Workflow

![Daily Note](screenshots/daily-note.png)

*Daily notes capture tasks, reflections, and links to ongoing work with yesterday/today/tomorrow structure.*

### Vault Quality Dashboard

![Quality Dashboard](screenshots/quality-dashboard.png)

*Built-in quality monitoring tracks orphaned notes, stale content, missing metadata, and ADR health.*

---

## 🚀 Quick Start

### Prerequisites

1. **Obsidian** - Download from [obsidian.md](https://obsidian.md)

2. **Required Obsidian Plugins** (install from Community Plugins):
   - **[Dataview](https://github.com/blacksmithgu/obsidian-dataview)** - Power queries and navigation for MOCs
   - **[Templater](https://github.com/SilentVoid13/Templater)** - Note templates with automation and dynamic content

3. **Optional Python Tools** (for document processing skills):
   - **docling** - PDF/PPTX processing: `pip3 install docling`
   - **python-pptx** - PowerPoint extraction: `pip3 install python-pptx`
   - **poppler** - PDF utilities: `brew install poppler` (macOS) or `apt-get install poppler-utils` (Linux)

### Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/DavidROliverBA/obsidian-architect-vault-template.git
   cd obsidian-architect-vault-template
   ```

2. **Open in Obsidian**:
   - Launch Obsidian
   - Click "Open folder as vault"
   - Select the `obsidian-architect-vault-template` directory

3. **Install Required Plugins**:
   - Go to Settings → Community Plugins → Browse
   - Install "Dataview" and "Templater"
   - Enable both plugins in Settings → Community Plugins

4. **Review the Dashboard**:
   - Open `Dashboard - Dashboard.md`
   - Explore the Maps of Content (MOCs)
   - Review example notes

5. **Customize** (see [Customization Guide](#-customization-guide) below)

---

## 📁 Structure Overview

### Directory Organization

```
obsidian-architect-vault-template/
├── +Attachments/           # All binary files (images, PDFs, docs)
├── +Daily/                 # Daily journal entries (organized by year)
│   ├── 2026/
│   └── README.md
├── +Meetings/              # All meeting notes
│   └── README.md
├── +Templates/             # Note templates for each type
├── +Inbox/                 # Temporary landing zone for new notes
├── .claude/                # Claude Code integration
│   ├── skills/             # 14 AI-assisted workflows
│   ├── context/            # Domain-specific context (customize)
│   └── vault-conventions.md
├── .obsidian/              # Obsidian configuration
├── scripts/                # Node.js automation + Python utilities
│   ├── validate.js         # Frontmatter & link validation
│   ├── health-check.js     # Vault health metrics
│   ├── generate-graph.js   # Knowledge graph export
│   ├── AUTOMATION.md       # Complete automation docs
│   └── *.py                # Python scripts
├── package.json            # Node.js automation scripts
├── [Root Directory]        # All content notes (metadata-driven)
│   ├── Person notes (e.g., "Jane Smith.md")
│   ├── Project notes (e.g., "Project - Cloud Migration.md")
│   ├── ADRs (e.g., "ADR - Use Kubernetes.md")
│   ├── Tasks (e.g., "Task - Review ADR.md")
│   ├── Pages (e.g., "Page - Architecture Principles.md")
│   └── MOCs (e.g., "MOC - Projects MOC.md")
└── README.md               # This file
```

### Note Types (13 Total)

| Type | Prefix | Example | Purpose |
|------|--------|---------|---------|
| **Person** | None | `Jane Smith.md` | Contact information |
| **Project** | `Project -` | `Project - Cloud Migration.md` | Project tracking |
| **Meeting** | `Meeting -` | `Meeting - 2026-01-07 Kickoff.md` | Meeting minutes |
| **Task** | `Task -` | `Task - Review ADR.md` | Task management |
| **ADR** | `ADR -` | `ADR - Use Kubernetes.md` | Architecture decisions |
| **Page** | `Page -` | `Page - Tech Stack.md` | Long-form documentation |
| **Weblink** | `Weblink -` | `Weblink - Martin Fowler.md` | Saved web resources |
| **Organisation** | `Organisation -` | `Organisation - Your Company.md` | Companies/vendors |
| **MOC** | `MOC -` | `MOC - Projects MOC.md` | Navigation hubs |
| **DailyNote** | None | `2026-01-07.md` | Daily journal |
| **AtomicNote** | `Atomic Note -` | `Atomic Note - SOLID.md` | Single-concept notes |
| **Course** | `Course -` | `Course - Cloud Architecture.md` | Learning tracking |
| **Zettel** | `Zettel -` | `Zettel - Research.md` | Personal notes |

---

## 🧭 Navigation System

### Dashboard (Central Hub)

Start here: `Dashboard - Dashboard.md`

The Dashboard provides:
- **Quick Navigation** - Links to all MOCs
- **Open Tasks** - Filtered by priority (high/medium/low)
- **Active Projects** - Current work with status
- **Recent Meetings** - Last 10 meetings
- **Statistics** - Note counts by type
- **Quick Capture** - Create new notes

### Maps of Content (MOCs)

**Core Navigation** (6 MOCs):
1. **Tasks MOC** - All tasks by priority/status
2. **Projects MOC** - Projects by status
3. **People MOC** - Contact directory
4. **Meetings MOC** - Meeting history
5. **ADRs MOC** - Architecture decisions
6. **Weblinks MOC** - External resources

**Content & Organization** (3 MOCs):
7. **Technology & Architecture MOC** - Tech platforms
8. **Organisations MOC** - Vendors/partners
9. **Vault Quality Dashboard** - Health monitoring

**Domain-Specific** (2 example MOCs):
10. **Cloud Architecture MOC** - Example specialization
11. **Data Platform MOC** - Example domain knowledge

---

## ⚙️ Customization Guide

### 1. Replace Example Content

**People** (3 examples to replace):
- `Jane Smith.md` → Your manager
- `Alex Johnson.md` → Colleague
- `Dr. Sarah Chen.md` → External contact

**Projects** (4 examples to replace):
- `Project - Cloud Migration.md`
- `Project - API Gateway Modernization.md`
- `Project - Legacy System Decommission.md`
- `Project - Research - Event-Driven Architecture.md`

**Tip**: Keep the structure, replace names and content.

### 2. Update Context Files

Customize `.claude/context/` for Claude Code:

- `projects-template.md` → Add your real projects
- `technology-template.md` → Document your tech stack
- `people-template.md` → Add key stakeholders
- `acronyms-template.md` → Your organization's acronyms
- `architecture-template.md` → Your architecture patterns
- `organisations-template.md` → Your vendors/partners

### 3. Adapt ADR Approval Workflow

Edit `+Templates/ADR.md`:

```yaml
approvers:
  - Your Architecture Lead
  - Your Tech Lead
  - Your Security Lead
```

Replace with your organization's approval structure.

### 4. Configure External Integrations (Optional)

**JIRA Integration**:
- ADR template has `externalRef` field
- Link to JIRA tickets: `externalRef: PROJ-123`

**Notion Sync**:
- See `/sync-notion` skill in `.claude/skills/sync-notion.md`
- Configure Notion API credentials

---

## 📝 Best Practices

### Daily Note Workflow

1. **Create daily note**: Use `/daily` skill or Templater
2. **Capture**:
   - Tasks for today
   - Notes from meetings
   - Reflections and learnings
3. **Link**: Connect to projects, people, meetings
4. **Review**: End-of-day reflection

See `+Daily/README.md` for detailed guide.

### Meeting Capture Process

1. **Before meeting**: Create note with `/meeting` skill
2. **During meeting**:
   - Capture key points
   - Note action items
   - Link attendees: `[[Person Name]]`
3. **After meeting**:
   - Link to related project: `project: "[[Project - Name]]"`
   - Extract tasks to Task notes
   - Add to Meeting MOC (automatic via Dataview)

See `+Meetings/README.md` for detailed guide.

### ADR Creation Workflow

1. **Identify decision**: Technical choice requiring documentation
2. **Create ADR**: Use `/adr` skill
3. **Fill sections**:
   - **Context**: Problem statement
   - **Decision**: What was decided
   - **Rationale**: Why this decision
   - **Consequences**: Positive/negative impacts
   - **Alternatives**: Options considered
4. **Link relationships**: `relatedTo`, `supersedes`, `dependsOn`
5. **Get approval**: Update `approvers` and `status`
6. **Publish**: Set `status: accepted`

### Project Tracking

1. **Create project**: Use template from `+Templates/Project.md`
2. **Set metadata**:
   - `status: active | paused | completed`
   - `priority: high | medium | low`
   - `category: <program-name>` (optional)
3. **Link related items**:
   - Tasks: `project: "[[Project - Name]]"`
   - Meetings: `project: "[[Project - Name]]"`
   - ADRs: `project: "[[Project - Name]]"`
4. **Track in MOC**: Projects MOC auto-updates via Dataview

---

## 🤖 Claude Code Skills

This vault includes 14 AI-assisted workflows accessible via Claude Code:

### Daily Workflow
- `/daily` - Create today's daily note
- `/meeting <title>` - Create meeting note with prompts
- `/weekly-summary` - Generate comprehensive weekly summary (5 parallel sub-agents)

### Architecture Work
- `/adr <title>` - Create new Architecture Decision Record

### Document Processing
- `/pdf-to-page <path>` - Convert PDF to Page note with docling (Sonnet or Opus analysis)
- `/pptx-to-page <path>` - Convert PowerPoint to Page note (quick or visual mode)

### Visual Analysis
- `/screenshot-analyze <path>` - Analyze screenshots with OCR and visual inspection (3 Sonnet sub-agents)
- `/diagram-review <path>` - Analyze architecture diagrams and technical drawings (4 Sonnet sub-agents)

### Quick Capture
- `/task <title>` - Quick-create task with priority
- `/person <name>` - Create person note (clean links without prefix)
- `/weblink <url>` - Save URL with AI summary

### Vault Maintenance
- `/orphans` - Find notes with no backlinks
- `/broken-links` - Comprehensive broken link detection (3 parallel Sonnet sub-agents)
- `/quality-report` - Content quality analysis with scores (5 parallel Sonnet sub-agents)

**See** `.claude/skills/` directory for all skill definitions.

---

## 📊 Quality Monitoring

### Obsidian Dataview Dashboard

Use `MOC - Vault Quality Dashboard.md` to monitor vault health:

- **Stale Content** - Notes not reviewed in >12 months
- **Low Confidence** - Notes needing verification
- **Orphaned Notes** - No backlinks (isolated)
- **Missing Metadata** - Incomplete frontmatter
- **ADR Health** - Missing status/relationships
- **Statistics** - Note distribution by type

### Node.js Automation

Professional-grade validation, health checks, and knowledge graph export:

```bash
# Install dependencies (one-time)
npm install

# Validate frontmatter and links
npm run validate

# Vault health metrics and quality score
npm run health

# Export knowledge graph (JSON)
npm run graph

# Run all checks
npm run test
```

**Key Scripts:**
- **validate.js** - Validates frontmatter schema, required fields, date formats, enumerated values, and wiki-links
- **health-check.js** - Analyzes note counts, orphaned notes, stale content, link statistics, and calculates overall health score (0-100)
- **generate-graph.js** - Exports complete knowledge graph with nodes (notes) and edges (links) for visualization

**Output Formats:**
- Console (colorized, human-readable)
- JSON (programmatic access)
- Markdown (reports and documentation)

**Integration Examples:**
- Pre-commit hooks (validate before commit)
- CI/CD pipelines (GitHub Actions)
- Weekly health reports (cron jobs)

**See** `scripts/AUTOMATION.md` for complete documentation.

**Recommended Review Cadence**:
- **Weekly**: Check open tasks, active projects, run `npm run health`
- **Monthly**: Review stale content (5-10 notes), fix broken links
- **Quarterly**: Comprehensive quality audit, run `npm run test`

---

## 🛠️ Advanced Features

### Quality Indicators

Add to critical notes (ADRs, Pages, Projects):

```yaml
# Quality Indicators
confidence: high | medium | low     # How authoritative
freshness: current | recent | stale # How up-to-date
source: primary | secondary | synthesis | external
verified: true | false              # Fact-checked
reviewed: 2026-01-07               # Last review date
```

**Benefits**:
- AI can prioritize high-confidence content
- Identify content needing updates
- Track information provenance

### Relationship Metadata

Link related notes (especially ADRs):

```yaml
# Relationships
relatedTo: ["[[ADR - Related Decision]]"]
supersedes: ["[[ADR - Old Approach]]"]     # Replaces
dependsOn: ["[[ADR - Foundation]]"]        # Requires
```

**Benefits**:
- Navigate decision evolution
- Understand dependencies
- Build knowledge graph

### Hierarchical Tags

Use domain-specific tagging:

```yaml
tags: [ADR, activity/architecture, technology/kubernetes, project/cloud-migration, domain/infrastructure]
```

**Categories**:
- `activity/` - architecture, implementation, evaluation
- `technology/` - kubernetes, aws, postgresql, etc.
- `project/` - cloud-migration, api-modernization, etc.
- `domain/` - infrastructure, data, security, etc.

---

## 🐛 Troubleshooting

### Dataview Queries Not Working

**Problem**: MOCs show `Dataview: Query not found` or empty results

**Solution**:
1. Verify Dataview plugin is installed and enabled
2. Check Settings → Dataview → Enable JavaScript Queries
3. Reload Obsidian (Ctrl/Cmd + R)

### Templates Not Creating Files

**Problem**: Templates don't auto-fill or rename

**Solution**:
1. Verify Templater plugin is installed and enabled
2. Check Settings → Templater → Template folder location = `+Templates`
3. Check Settings → Templater → Enable "Trigger Templater on new file creation"

### Broken Links After Customization

**Problem**: Links show as broken after replacing example content

**Solution**:
1. Use `/rename` skill to batch rename with link updates
2. Or: Manually update links using Obsidian's backlink pane
3. Run `/broken-links` skill to find remaining issues

### Claude Skills Not Working

**Problem**: `/skill` commands not recognized

**Solution**:
1. Ensure you're using Claude Code CLI (not web interface)
2. Check `.claude/skills/` directory exists
3. Verify skill file format (see vault-conventions.md)
4. Check Claude Code settings: `claude settings show`

---

## 📚 Additional Resources

### Example Notes

Review these examples for best practices:
- `ADR - Use Kubernetes for Container Orchestration.md` - Complete ADR example
- `Project - Cloud Migration.md` - Active project example
- `Page - Architecture Principles.md` - Documentation example
- `+Daily/2026/2026-01-07.md` - Daily note example
- `+Meetings/Meeting - 2026-01-07 Project Kickoff.md` - Meeting example

### Documentation Files

- `Page - How to Use This Vault.md` - Internal usage guide
- `Page - Vault Setup Checklist.md` - Onboarding checklist
- `+Daily/README.md` - Daily note practice guide
- `+Meetings/README.md` - Meeting capture guide
- `.claude/vault-conventions.md` - Metadata formatting rules

### External Resources

- [Obsidian Documentation](https://help.obsidian.md/)
- [Dataview Plugin Guide](https://blacksmithgu.github.io/obsidian-dataview/)
- [Templater Plugin Guide](https://silentvoid13.github.io/Templater/)
- [Claude Code Documentation](https://claude.com/code)

---

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for:
- How to suggest improvements
- How to report bugs
- Code of conduct
- Development workflow

---

## 📄 License

MIT License - see `LICENSE` file for details.

Free to use, modify, and distribute. No attribution required (but appreciated!).

---

## 🙏 Acknowledgments

This template is based on real-world Solutions Architecture practice at enterprise organizations. Special thanks to the Obsidian community for plugins and inspiration.

**Built with**:
- [Obsidian](https://obsidian.md) - The knowledge base tool
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview) - Query engine
- [Templater](https://github.com/SilentVoid13/Templater) - Template automation
- [Claude Code](https://claude.com/code) - AI-assisted workflows

---

## 🗺️ Roadmap

**v1.0.0** (Released 2026-01-07):
- ✅ Initial release with metadata-driven framework
- ✅ 11 Claude Code skills
- ✅ Quality indicator system
- ✅ 12 Maps of Content with Dataview queries

**v1.1.0** (Released 2026-01-08):
- ✅ Visual analysis skills (screenshot-analyze, diagram-review)
- ✅ Document processing skills (pdf-to-page, pptx-to-page)
- ✅ Parallel agent architecture with `context: fork` frontmatter
- ✅ Screenshots and visual documentation

**v1.2.0** (Released 2026-01-09):
- ✅ Node.js automation infrastructure (validate.js, health-check.js, generate-graph.js)
- ✅ 3 new vault maintenance skills (broken-links, weekly-summary, quality-report)
- ✅ Comprehensive testing and quality baseline metrics established
- ✅ 8 reusable analysis scripts generated (Python + Node.js)
- ✅ Performance benchmarks: 50-200 notes/second

**v1.3** (Planned):
- Video walkthrough and tutorials
- More domain-specific MOC examples
- Mobile optimization and mobile-first workflows
- Integration templates (Jira, ADO, GitHub Issues)
- Community skill contributions

**v2.0** (Future):
- Obsidian Publish demo site
- Historical quality trend tracking
- Alternative theme support
- Web dashboard for quality metrics
- Docker-based setup for automation

---

## ❓ FAQ

**Q: Can I use this for personal knowledge management?**
A: Yes! While designed for architects, it works for any knowledge-intensive role.

**Q: Do I need Claude Code?**
A: No. The vault works without it. Claude Code adds AI-assisted workflows (optional).

**Q: Can I use this with Notion/Roam/Logseq?**
A: Partially. It's optimized for Obsidian, but markdown is portable.

**Q: How do I update to new template versions?**
A: Pull changes from git, merge carefully (your content stays in separate notes).

**Q: Is this production-ready?**
A: Yes. This structure has been used in enterprise environments.

---

**Getting Started**: Open `Dashboard - Dashboard.md` and start exploring!

**Questions?**: Open an issue on GitHub or check the FAQ above.

**Enjoy building your knowledge base! 🚀**
