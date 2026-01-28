# ArchitectKB

> **Your architecture knowledge, structured for AI collaboration.**

ArchitectKB is an Obsidian vault template designed for Solutions Architects who want to leverage AI assistants in their daily work. It provides a structured framework for architecture documentation, decision records, project tracking, and knowledge management—all optimised for AI-assisted workflows.

**v1.9.4** | 62 Skills | 26 Templates | 11 Hooks | 7 User Guides

---

## Why ArchitectKB?

**The Problem:** Architecture knowledge lives in scattered documents, wikis, emails, and heads. When you need to make decisions, find past rationale, or onboard new team members, the information is fragmented and hard to find.

**The Solution:** ArchitectKB gives you:

- **Structured templates** for ADRs, systems, integrations, and projects that AI can understand and help you create
- **Instant search** across your entire knowledge base with SQLite FTS5 (~1000x faster than grep)
- **62 AI-assisted skills** that automate common architecture tasks—from creating meeting notes to generating C4 diagrams
- **Quality tracking** to keep your documentation fresh and trustworthy
- **Zero lock-in**—it's all plain Markdown files

## Who is it for?

- **Solutions Architects** documenting enterprise systems and decisions
- **Technical Architects** tracking project decisions and dependencies
- **Enterprise Architects** building organisation-wide architecture knowledge graphs
- **Anyone** who wants structured, AI-friendly knowledge management

## AI Integration

ArchitectKB is built for **[Claude Code](https://claude.ai/code)**, Anthropic's CLI for AI-assisted development. The 62 skills, automation hooks, and search optimisations are designed around Claude Code's capabilities.

**But it's not exclusive.** The underlying structure—Markdown files with YAML frontmatter—works with any AI assistant that can read files. If you're using Cursor, Copilot, or other tools, the templates and organisation still provide value. **Contributions to support other AI assistants are welcome!**

---

## Quick Start

### Prerequisites

1. **[Obsidian](https://obsidian.md)** - Free knowledge base app
2. **[Claude Code](https://claude.ai/code)** - `brew install --cask claude-code` (macOS) or see [install docs](https://claude.ai/code)
3. **Node.js 18+** - For automation scripts: `brew install node`

### Installation

```bash
# Clone the template
git clone https://github.com/DavidROliverBA/ArchitectKB.git
cd ArchitectKB

# Install automation dependencies
npm install

# Open in Obsidian: File → Open folder as vault → select ArchitectKB
```

### First Steps

1. **Open the Dashboard** (`Dashboard - Main Dashboard.md`) to explore the structure
2. **Install Obsidian plugins**: Dataview, Templater, Terminal (see below)
3. **Start Claude Code**: Open terminal in Obsidian, run `claude`
4. **Try a skill**: Type `/daily` to create your first daily note

### Required Plugins

Install from Obsidian → Settings → Community Plugins:

| Plugin                                                            | Purpose                               |
| ----------------------------------------------------------------- | ------------------------------------- |
| **[Dataview](https://github.com/blacksmithgu/obsidian-dataview)** | Powers all MOC queries and dashboards |
| **[Templater](https://github.com/SilentVoid13/Templater)**        | Note templates with dynamic content   |
| **[Terminal](https://github.com/polyipseity/obsidian-terminal)**  | Run Claude Code inside Obsidian       |

---

## User Guides

| Guide                                             | Purpose                                               |
| ------------------------------------------------- | ----------------------------------------------------- |
| **[[Page - Claude Code Skills Quick Reference]]** | All 62 skills with examples and model recommendations |
| **[[Page - Daily Workflow Guide]]**               | Morning routine, meeting capture, weekly reviews      |
| **[[Page - Architecture Workflow Guide]]**        | Multi-skill workflows for systems, integrations, ADRs |
| **[[Page - Search and Discovery Guide]]**         | SQLite FTS5, graph queries, discovery patterns        |
| **[[Page - Diagram and Visualisation Guide]]**    | C4 diagrams, Canvas, Mermaid                          |
| **[[Page - Claude Code with AWS Bedrock Guide]]** | Enterprise deployment with AWS Bedrock                |
| **[[Page - Secrets and Security Setup Guide]]**   | Bitwarden CLI, pre-commit hooks, credentials          |

---

## Features

### AI-Assisted Skills (62 total)

Common tasks, automated:

```bash
/daily                    # Create today's daily note
/meeting Sprint Planning  # Capture meeting with attendees
/adr API Gateway Choice   # Create architecture decision record
/system Payment Service   # Document a system
/diagram c4-context App   # Generate C4 diagram
/q kafka integration      # Search vault instantly
```

**Full reference:** [[Page - Claude Code Skills Quick Reference]]

### Architecture Knowledge Graph

Document enterprise architecture with structured templates:

- **Systems** - Applications, platforms, databases with metrics and SLAs
- **Integrations** - System-to-system connections with data flows
- **ADRs** - Architecture decisions with relationships and approvals
- **Scenarios** - Future-state plans with cost/benefit analysis

**Getting started:** [[Page - Architecture Workflow Guide]]

### Instant Search

Two search indexes for different needs:

| Index       | Speed  | Use Case                                       |
| ----------- | ------ | ---------------------------------------------- |
| SQLite FTS5 | ~0.01s | Full-text search, filters, backlinks           |
| Graph Index | ~1s    | Orphan detection, quality checks, BM25 ranking |

**Query guide:** [[Page - Search and Discovery Guide]]

### Quality Monitoring

Track content health with built-in quality indicators:

- **Confidence** - How authoritative is this information?
- **Freshness** - When was it last reviewed?
- **Verification** - Has it been fact-checked?

Run `/vault-maintenance` quarterly to audit your vault.

### Security Framework

Credential protection built-in:

- **Bitwarden integration** - Retrieve secrets on-demand, never store in files
- **Pre-commit hooks** - Detect secrets before they're committed
- **Claude Code hooks** - Block access to sensitive file patterns

**Setup guide:** [[Page - Secrets and Security Setup Guide]]

---

## Structure

```
ArchitectKB/
├── +Daily/          # Daily notes by year
├── +Meetings/       # Meeting notes
├── +Incubator/      # Research ideas
├── +Templates/      # 26 note templates
├── +Archive/        # Soft-archived notes
├── .claude/         # Skills, hooks, rules
├── scripts/         # Node.js automation
└── [root]           # All content notes (ADRs, Projects, Systems, etc.)
```

Notes are organised by **type** (frontmatter field), not folders. This enables powerful Dataview queries across the vault.

---

## Screenshots

![Dashboard](screenshots/dashboard.png)
_Central hub with navigation, tasks, and statistics_

![Graph View](screenshots/graph-view.png)
_Knowledge graph showing note relationships_

---

## What's Included

| Component          | Count | Purpose                                     |
| ------------------ | ----- | ------------------------------------------- |
| Claude Code Skills | 62    | AI-assisted workflows for common tasks      |
| Note Templates     | 26    | Structured templates for all note types     |
| Automation Hooks   | 11    | Quality enforcement and workflow automation |
| User Guides        | 7     | Comprehensive documentation                 |
| Sample Notes       | 20+   | Architecture examples to learn from         |

---

## Contributing

Contributions welcome! Especially:

- **Other AI integrations** - Cursor, Copilot, or other assistant support
- **New skills** - Workflows for common architecture tasks
- **Templates** - Industry-specific or methodology-specific templates
- **Documentation** - Guides, examples, tutorials

See `CONTRIBUTING.md` for guidelines.

---

## License

MIT License - free to use, modify, and distribute.

---

**Ready to start?** Open `Dashboard - Main Dashboard.md` and explore!

**Questions?** [Open an issue](https://github.com/DavidROliverBA/ArchitectKB/issues)
