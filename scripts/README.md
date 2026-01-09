# Scripts

This directory contains automation utilities for vault maintenance and quality assurance.

## Overview

Two types of automation are available:

### Node.js Automation (Recommended)
Modern TypeScript/JavaScript tools for validation, health checks, and knowledge graph export:
- **validate.js** - Frontmatter and link validation
- **health-check.js** - Vault health metrics and quality scores
- **generate-graph.js** - Knowledge graph export

**See [AUTOMATION.md](./AUTOMATION.md) for full Node.js documentation.**

### Python Scripts
Specialized utilities for batch operations and document processing:
- File renaming and organization
- Batch frontmatter updates
- PDF/PowerPoint conversion
- Notion integration
- Content extraction

## Requirements

**Python 3.8+** required.

**Install dependencies:**
```bash
pip3 install --user pyyaml python-frontmatter
```

**Optional dependencies** (for specific scripts):
```bash
# For PDF processing
pip3 install --user PyPDF2 pdf2image pillow

# For PowerPoint processing
pip3 install --user python-pptx pillow

# For Notion sync
pip3 install --user notion-client
```

## Available Scripts

### Note Management Scripts

#### `rename_daily_notes.py`
Rename daily notes from old format to new format.

**Use case:** Migrate from `Daily Note - YYYY-MM-DD.md` to `YYYY-MM-DD.md`

**Usage:**
```bash
# Dry run (preview changes)
python3 scripts/rename_daily_notes.py --dry-run

# Execute rename
python3 scripts/rename_daily_notes.py
```

**Features:**
- Updates internal wiki-links automatically
- Maintains frontmatter
- Creates backups (optional)

#### `standardize_meetings.py`
Standardize meeting note filenames.

**Use case:** Ensure all meetings follow `Meeting - YYYY-MM-DD Title.md` format

**Usage:**
```bash
# Dry run
python3 scripts/standardize_meetings.py --dry-run

# Execute
python3 scripts/standardize_meetings.py
```

#### `update_frontmatter.py`
Batch update frontmatter fields across notes.

**Use case:** Add new field, rename field, update values

**Usage:**
```bash
# Add 'reviewed' field to all ADRs
python3 scripts/update_frontmatter.py \
  --type Adr \
  --add-field reviewed=null

# Update status values
python3 scripts/update_frontmatter.py \
  --type Project \
  --replace status:inprogress=active
```

### Document Processing Scripts

#### `pdf_to_page.py`
Convert PDF documents to Page notes with extracted images.

**Use case:** Import PDF presentations, documentation

**Usage:**
```bash
python3 scripts/pdf_to_page.py \
  path/to/document.pdf \
  --output "Page - Document Name"
```

**Output:**
- Page note with frontmatter
- PNG image per PDF page in +Attachments/
- Embedded images in note
- Optional: Extracted text

**Requirements:** `PyPDF2`, `pdf2image`, `pillow`

#### `pptx_to_page.py`
Convert PowerPoint presentations to Page notes with slide images.

**Use case:** Import presentation decks

**Usage:**
```bash
python3 scripts/pptx_to_page.py \
  path/to/presentation.pptx \
  --output "Page - Presentation Name"
```

**Output:**
- Page note with frontmatter
- PNG image per slide in +Attachments/
- Embedded slide images
- Optional: Speaker notes

**Requirements:** `python-pptx`, `pillow`

#### `extract_text.py`
Extract text content from documents.

**Use case:** Get searchable text from PDFs, Word docs

**Usage:**
```bash
# Extract from PDF
python3 scripts/extract_text.py document.pdf

# Extract to file
python3 scripts/extract_text.py document.pdf --output output.txt
```

**Supported formats:** PDF, DOCX, TXT

### Integration Scripts

#### `notion_sync.py`
Sync meetings from Notion database.

**Use case:** Import existing meetings from Notion

**Setup:**
1. Create Notion integration: https://www.notion.so/my-integrations
2. Get integration token
3. Get database ID
4. Set environment variables:
   ```bash
   export NOTION_TOKEN="secret_xxx"
   export NOTION_DATABASE_ID="xxx"
   ```

**Usage:**
```bash
# Sync all meetings
python3 scripts/notion_sync.py

# Sync meetings after specific date
python3 scripts/notion_sync.py --since 2026-01-01
```

**Requirements:** `notion-client`

### Utility Scripts

#### `find_broken_links.py`
Find and report broken wiki-links.

**Use case:** Vault maintenance, quality assurance

**Usage:**
```bash
# Find all broken links
python3 scripts/find_broken_links.py

# Output to file
python3 scripts/find_broken_links.py --output broken_links.txt
```

**Output:** List of files with broken links and link targets

#### `find_orphans.py`
Find notes with no backlinks.

**Use case:** Identify isolated content

**Usage:**
```bash
# Find orphaned notes
python3 scripts/find_orphans.py

# Exclude certain types
python3 scripts/find_orphans.py --exclude MOC,DailyNote
```

**Alternative:** Use `/orphans` Claude skill for AI-assisted recommendations

#### `stats.py`
Generate vault statistics.

**Use case:** Understand vault growth, content distribution

**Usage:**
```bash
python3 scripts/stats.py
```

**Output:**
- Total notes by type
- Notes created per month
- Average note size
- Link statistics
- Tag usage

## Creating Your Own Scripts

### Script Template

```python
#!/usr/bin/env python3
"""
Script description here.
"""

import os
import argparse
import frontmatter
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description="Your script description")
    parser.add_argument('--dry-run', action='store_true',
                        help="Preview changes without executing")
    args = parser.parse_args()

    vault_path = Path.cwd()

    # Your logic here
    for note_path in vault_path.glob('**/*.md'):
        if '+Templates' in str(note_path) or '.obsidian' in str(note_path):
            continue

        # Process note
        with open(note_path, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)

        # Modify post...

        if args.dry_run:
            print(f"Would update: {note_path}")
        else:
            with open(note_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter.dumps(post))

    print("Done!")

if __name__ == '__main__':
    main()
```

### Best Practices

**Always:**
- Support `--dry-run` flag
- Handle encoding properly (`encoding='utf-8'`)
- Skip .obsidian and +Templates folders
- Preserve frontmatter formatting
- Test on backup vault first
- Print progress for long operations

**Security:**
- Never commit API tokens/secrets
- Use environment variables for sensitive data
- Validate file paths
- Check file permissions

## Common Tasks

### Batch Rename Files

```python
# Example: Add "Project - " prefix to all project notes
from pathlib import Path
import shutil

vault = Path.cwd()
for note in vault.glob('*.md'):
    with open(note) as f:
        if 'type: Project' in f.read():
            new_name = f"Project - {note.stem}.md"
            if not note.stem.startswith('Project - '):
                print(f"Rename: {note.name} -> {new_name}")
                # shutil.move(note, vault / new_name)  # Uncomment to execute
```

### Update Frontmatter Field

```python
import frontmatter
from pathlib import Path

vault = Path.cwd()
for note in vault.glob('**/*.md'):
    with open(note, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)

    if post.get('type') == 'Adr' and 'reviewed' not in post:
        post['reviewed'] = None

        with open(note, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
        print(f"Updated: {note.name}")
```

### Extract Specific Content

```python
import frontmatter
from pathlib import Path

vault = Path.cwd()
high_priority_tasks = []

for note in vault.glob('**/*.md'):
    with open(note, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)

    if post.get('type') == 'Task' and post.get('priority') == 'high':
        high_priority_tasks.append({
            'title': post.get('title'),
            'due': post.get('due'),
            'project': post.get('project')
        })

# Process high_priority_tasks...
```

## Troubleshooting

### Common Issues

**"ModuleNotFoundError: No module named 'frontmatter'"**
- Solution: `pip3 install --user python-frontmatter`

**"Permission denied"**
- Solution: Check file permissions, close Obsidian if file is locked

**"UnicodeDecodeError"**
- Solution: Ensure you're using `encoding='utf-8'` when opening files

**Script modifies files incorrectly**
- Solution: Always test with `--dry-run` first
- Backup your vault before running batch operations

### Getting Help

1. Check script's `--help` output
2. Review this README
3. Test on a backup vault first
4. Create GitHub issue if you find a bug

## Contributing Scripts

Have a useful script? Contribute it!

1. Follow the script template above
2. Add documentation in docstring
3. Support `--dry-run` flag
4. Add entry to this README
5. Test thoroughly
6. Submit PR (see CONTRIBUTING.md)

## Safety

**Before running any script:**
1. ✅ Backup your vault (Git commit or file backup)
2. ✅ Test with `--dry-run` first
3. ✅ Verify the script does what you expect
4. ✅ Close Obsidian (avoid file conflicts)

**Never:**
- Run untrusted scripts without reviewing code
- Skip backups before batch operations
- Run scripts without `--dry-run` first
- Commit API keys or tokens to version control

---

## Node.js Automation

For modern validation, health checks, and knowledge graph export, see:

**[AUTOMATION.md](./AUTOMATION.md)** - Complete Node.js automation documentation

Quick start:
```bash
npm install
npm run validate    # Validate frontmatter and links
npm run health      # Vault health metrics
npm run graph       # Export knowledge graph
```

---

**Scripts are powerful tools - use them wisely!**
