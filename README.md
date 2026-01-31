# ArchitectKB

> **Your architecture knowledge, structured for AI collaboration.**

ArchitectKB is an Obsidian vault template designed for Solutions Architects who want to leverage AI assistants in their daily work. It provides a structured framework for architecture documentation, decision records, project tracking, and knowledge management—all optimised for AI-assisted workflows.

**v2.0.0** | Seven-Pillar Ontology | 62 Skills | 32 Templates | 11 Hooks | 7 User Guides

---

## What's New in v2.0.0

**Seven-Pillar Ontology** - A complete reorganisation of how knowledge is structured:

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

---

## Why ArchitectKB?

**The Problem:** Architecture knowledge lives in scattered documents, wikis, emails, and heads. When you need to make decisions, find past rationale, or onboard new team members, the information is fragmented and hard to find.

**The Solution:** ArchitectKB gives you:

- **Seven-pillar ontology** for organising knowledge that scales with your needs
- **Structured templates** for ADRs, systems, integrations, and projects that AI can understand
- **Instant search** across your entire knowledge base with SQLite FTS5 (~1000x faster than grep)
- **62 AI-assisted skills** that automate common architecture tasks
- **Quality tracking** to keep your documentation fresh and trustworthy
- **Zero lock-in**—it's all plain Markdown files

## Who is it for?

- **Solutions Architects** documenting enterprise systems and decisions
- **Technical Architects** tracking project decisions and dependencies
- **Enterprise Architects** building organisation-wide architecture knowledge graphs
- **Anyone** who wants structured, AI-friendly knowledge management

## AI Integration

ArchitectKB is built for **[Claude Code](https://claude.ai/code)**, Anthropic's CLI for AI-assisted development. The 62 skills, automation hooks, and search optimisations are designed around Claude Code's capabilities.

**But it's not exclusive.** The underlying structure—Markdown files with YAML frontmatter—works with any AI assistant that can read files. **Contributions to support other AI assistants are welcome!**

---

## Quick Start

### Prerequisites

1. **[Obsidian](https://obsidian.md)** - Free knowledge base app
2. **[Claude Code](https://claude.ai/code)** - `brew install --cask claude-code` (macOS)
3. **Node.js 18+** - For automation scripts: `brew install node`

### Installation

```bash
# Clone the template
git clone https://github.com/DavidROliverBA/ArchitectKB.git
cd ArchitectKB

# Install automation dependencies
npm install

# Build search index
npm run vault:index

# Open in Obsidian: File → Open folder as vault → select ArchitectKB
```

### First Steps

1. **Open the Dashboard** (`_Dashboard.md`) to explore the structure
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

## The Seven Pillars

### Entities (Things that exist)

Things with independent existence. Located in the **root directory** with type prefixes.

| Type         | Pattern                  | Example                        |
| ------------ | ------------------------ | ------------------------------ |
| Person       | `Person - Name.md`       | `Person - Jane Smith.md`       |
| System       | `System - Name.md`       | `System - AMOS.md`             |
| Organisation | `Organisation - Name.md` | `Organisation - Acme Corp.md`  |
| DataAsset    | `DataAsset - Name.md`    | `DataAsset - Customer Data.md` |
| Location     | `Location - Name.md`     | `Location - Heathrow T5.md`    |

### Nodes (Units of knowledge)

Knowledge that persists beyond events. Located in the **root directory** with type prefixes.

| Type       | Pattern                 | Purpose                              |
| ---------- | ----------------------- | ------------------------------------ |
| Concept    | `Concept - Title.md`    | What is X? Definitions, explanations |
| Pattern    | `Pattern - Title.md`    | How to do X. Approaches, methods     |
| Capability | `Capability - Title.md` | What we can do. Skills, abilities    |
| Theme      | `Theme - Title.md`      | Cross-cutting concerns               |
| Weblink    | `Weblink - Title.md`    | External resources and references    |

### Events (Things that happen)

Temporal occurrences. Located in **dedicated folders**.

| Type           | Location         | Example                                   |
| -------------- | ---------------- | ----------------------------------------- |
| Meeting        | `Meetings/YYYY/` | `Meeting - 2026-01-31 Sprint Planning.md` |
| Project        | `Projects/`      | `Project - Cloud Migration.md`            |
| Task           | `Tasks/`         | `Task - Review API design.md`             |
| ADR            | `ADRs/`          | `ADR - Use PostgreSQL.md`                 |
| Daily          | `Daily/YYYY/`    | `Daily - 2026-01-31.md`                   |
| Incubator      | `Incubator/`     | `Incubator - AI Code Review.md`           |
| Email          | `Emails/`        | `Email - Jane - API proposal.md`          |
| Trip           | `Trips/`         | `Trip - London.md`                        |
| FormSubmission | `Forms/`         | `FormSubmission - DPIA for Project X.md`  |

### Views (Aggregated data)

Reports and dashboards. Located in the **root directory** with type prefixes.

| Type      | Pattern                 | Purpose                    |
| --------- | ----------------------- | -------------------------- |
| Dashboard | `_Dashboard - Scope.md` | Dynamic overview with data |
| Query     | `Query - Name.md`       | Saved Dataview queries     |
| ArchModel | `ArchModel - Name.md`   | Architecture diagram views |

### Navigation (Finding aids)

Maps of Content for discovery. Located in the **root directory** with `_` prefix to sort first.

| Type | Pattern           | Example              |
| ---- | ----------------- | -------------------- |
| MOC  | `_MOC - Scope.md` | `_MOC - Projects.md` |

### Governance (Rules & standards)

Policies and guardrails. Located in `Sync/` (synced from external sources).

| Type      | Location           | Purpose                 |
| --------- | ------------------ | ----------------------- |
| Policy    | `Sync/Policies/`   | Organisational policies |
| Guardrail | `Sync/Guardrails/` | Technical guardrails    |
| Org-ADR   | `Sync/Org-ADRs/`   | Organisation-wide ADRs  |

### Artifacts (External resources)

Reference materials collected. Located in `Attachments/`.

---

## Directory Structure

```
ArchitectKB/
├── Meetings/                    # Events
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
├── Projects/                    # Events
├── Tasks/                       # Events
├── ADRs/                        # Events
├── Emails/                      # Events
├── Trips/                       # Events
├── Daily/                       # Events
│   └── YYYY/
├── Incubator/                   # Events
├── Forms/                       # Events
│
├── Attachments/                 # Artifacts
├── Archive/                     # Archived content
│   ├── Entities/
│   ├── Nodes/
│   └── Events/
├── Templates/                   # Note templates
├── Sync/                        # Governance
│   ├── Policies/
│   ├── Guardrails/
│   └── Org-ADRs/
│
├── .claude/                     # Claude Code configuration
├── .graph/                      # Graph indexes
├── .obsidian/                   # Obsidian configuration
│
├── Person - *.md                # Entities (root)
├── System - *.md                # Entities (root)
├── Organisation - *.md          # Entities (root)
├── DataAsset - *.md             # Entities (root)
├── Location - *.md              # Entities (root)
│
├── Concept - *.md               # Nodes (root)
├── Pattern - *.md               # Nodes (root)
├── Capability - *.md            # Nodes (root)
├── Theme - *.md                 # Nodes (root)
├── Weblink - *.md               # Nodes (root)
│
├── Query - *.md                 # Views (root)
├── ArchModel - *.md             # Views (root)
│
├── _MOC - *.md                  # Navigation (root, sorted first)
└── _Dashboard*.md               # Navigation (root, sorted first)
```

---

## User Guides

| Guide                                                                                      | Purpose                                               |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| **[Skills Quick Reference](Page%20-%20Claude%20Code%20Skills%20Quick%20Reference.md)**     | All 62 skills with examples and model recommendations |
| **[How to Use This Vault](Page%20-%20How%20to%20Use%20This%20Vault.md)**                   | Complete vault usage guide                            |
| **[Vault Setup Checklist](Page%20-%20Vault%20Setup%20Checklist.md)**                       | Step-by-step setup                                    |
| **[Daily Workflow Guide](Page%20-%20Daily%20Workflow%20Guide.md)**                         | Morning routine, meeting capture, weekly reviews      |
| **[Architecture Workflow Guide](Page%20-%20Architecture%20Workflow%20Guide.md)**           | Multi-skill workflows for systems, integrations, ADRs |
| **[Search and Discovery Guide](Page%20-%20Search%20and%20Discovery%20Guide.md)**           | SQLite FTS5, graph queries, discovery patterns        |
| **[Diagram and Visualisation Guide](Page%20-%20Diagram%20and%20Visualisation%20Guide.md)** | C4 diagrams, Canvas, Mermaid                          |

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

**Full reference:** [Skills Quick Reference](Page%20-%20Claude%20Code%20Skills%20Quick%20Reference.md)

### Instant Search

Two search indexes for different needs:

| Index       | Speed  | Use Case                                       |
| ----------- | ------ | ---------------------------------------------- |
| SQLite FTS5 | ~0.01s | Full-text search, filters, backlinks           |
| Graph Index | ~1s    | Orphan detection, quality checks, BM25 ranking |

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

---

## What's Included

| Component          | Count | Purpose                                     |
| ------------------ | ----- | ------------------------------------------- |
| Claude Code Skills | 62    | AI-assisted workflows for common tasks      |
| Note Templates     | 32    | Structured templates for all note types     |
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

**Ready to start?** Open `_Dashboard.md` and explore!

**Questions?** [Open an issue](https://github.com/DavidROliverBA/ArchitectKB/issues)
