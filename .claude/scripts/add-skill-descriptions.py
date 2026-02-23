#!/usr/bin/env python3
"""
add-skill-descriptions.py - Add description field to skill frontmatter

This script reads each skill file and adds a description field based on
the first paragraph after the title heading. This enables progressive
disclosure where descriptions are loaded first for skill discovery.

Usage:
    python3 scripts/add-skill-descriptions.py --dry-run  # Preview changes
    python3 scripts/add-skill-descriptions.py            # Apply changes
"""

import os
import re
import argparse
from pathlib import Path

VAULT_ROOT = Path(__file__).parent.parent
SKILLS_DIR = VAULT_ROOT / '.claude' / 'skills'

# Manual description overrides for complex skills
MANUAL_DESCRIPTIONS = {
    'daily': 'Create today\'s daily journal note with tasks and focus areas',
    'meeting': 'Create meeting notes with attendees, agenda, and project links',
    'task': 'Quick-create task with project, priority, and due date',
    'person': 'Create person/contact note from template',
    'weblink': 'Save URL with analysis, summary, and metadata extraction',
    'youtube': 'Save YouTube video as Weblink with transcript analysis',
    'adr': 'Create Architecture Decision Record following BA ADR process',
    'project-status': 'Generate comprehensive project status report using sub-agents',
    'quality-report': 'Generate vault quality metrics and health report',
    'vault-maintenance': 'Run quarterly vault health check and cleanup',
    'archive': 'Soft-archive notes with metadata preservation',
    'orphans': 'Find notes with no backlinks (orphaned content)',
    'broken-links': 'Find and report broken wiki-links in vault',
    'check-weblinks': 'Test all weblink URLs for dead or redirected links',
    'rename': 'Batch rename files with automatic link updates',
    'wipe': 'Generate context handoff and clear session for fresh start',
    'incubator': 'Manage idea incubator with lifecycle tracking',
    'related': 'Find all notes mentioning a topic or concept',
    'summarize': 'Summarize a note or set of notes',
    'timeline': 'Generate chronological project history',
    'find-decisions': 'Find all architectural decisions about a topic',
    'exec-summary': 'Generate non-technical executive summary',
    'sync-notion': 'Sync meetings from Notion database',
    'sync-notion-pages': 'Bidirectional sync between Obsidian and Notion pages',
    'sync-governance': 'Sync policies and guardrails from Confluence',
    'pdf-to-page': 'Convert PDF to Page note with extracted PNG images',
    'pptx-to-page': 'Convert PowerPoint to Page note with slide images',
    'screenshot-analyze': 'Comprehensive screenshot analysis with OCR',
    'diagram-review': 'Analyse architecture diagrams and flowcharts',
    'document-extract': 'Extract text from scanned documents or photos',
    'attachment-audit': 'Audit all vault attachments with analysis',
    'form': 'Quick-create compliance form submission (DPIA, CyberRisk, etc)',
    'form-status': 'Show form submission tracking and status',
    'dpia-status': 'DPIA compliance status across all projects',
    'adr-report': 'Generate ADR activity report for period',
    'project-snapshot': 'Quick status snapshot of all active projects',
    'weekly-summary': 'Generate weekly summary from notes and meetings',
    'canvas': 'Create or edit Obsidian Canvas visualisations',
    'c4-diagram': 'Generate Mermaid C4 diagrams from System note data',
    'diagram': 'Generate Python-based architecture diagrams',
    'graph-query': 'Query the pre-computed knowledge graph index',
    'search': 'Search vault content using Dataview queries',
    'article': 'Quick-create article note (blog, video, podcast)',
    'email': 'Process email into structured note or draft email',
    'trip': 'Create or update personal trip planning note',
    'system': 'Create System documentation note',
    'dataasset': 'Create data asset documentation note',
    'datasource': 'Create data source documentation',
    'scenario': 'Create scenario documentation note',
    'scenario-compare': 'Create side-by-side scenario comparison canvas',
    'cost-optimization': 'Analyse cost optimization opportunities',
    'impact-analysis': 'Visualise system change impact',
    'integration': 'Analyse integration patterns',
    'dependency-graph': 'Visualise system dependencies',
    'architecture': 'Architecture guidance and pattern help',
    'architecture-report': 'Generate architecture assessment report',
    'tag-management': 'Manage and migrate vault tags',
    'system-roadmap': 'Create system lifecycle roadmap visualisation',
    'system-sync': 'Sync system data from external sources',
    'book-search': 'Search indexed book and PDF content by topic',
    'rss-subscriptions': 'Manage YouTube channel subscriptions',
    'todos': 'Guidelines for Claude Code todo list usage',
    'skill-creator': 'Create new skills with guided prompts',
    'schedule': 'Schedule vault maintenance tasks using launchd',
}


def extract_description_from_content(content: str, skill_name: str) -> str:
    """Extract description from first paragraph after title."""
    # Check manual overrides first
    if skill_name in MANUAL_DESCRIPTIONS:
        return MANUAL_DESCRIPTIONS[skill_name]

    # Find the first paragraph after the title
    lines = content.split('\n')
    in_frontmatter = False
    past_title = False
    description_lines = []

    for line in lines:
        if line.strip() == '---':
            in_frontmatter = not in_frontmatter
            continue

        if in_frontmatter:
            continue

        # Skip title line
        if line.startswith('# /') or line.startswith('# '):
            past_title = True
            continue

        if past_title:
            # Skip empty lines before description
            if not line.strip() and not description_lines:
                continue

            # Stop at next heading or empty line after content
            if line.startswith('#') or line.startswith('```'):
                break
            if not line.strip() and description_lines:
                break

            description_lines.append(line.strip())

    description = ' '.join(description_lines)

    # Clean up and truncate
    description = re.sub(r'\s+', ' ', description).strip()
    if len(description) > 80:
        description = description[:77] + '...'

    return description or f'Execute the /{skill_name} skill'


def has_description(content: str) -> bool:
    """Check if frontmatter already has description field."""
    match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if match:
        frontmatter = match.group(1)
        return 'description:' in frontmatter
    return False


def add_description_to_frontmatter(content: str, description: str) -> str:
    """Add description field to frontmatter."""
    # Find frontmatter
    match = re.search(r'^(---\n)(.*?)(\n---)', content, re.DOTALL)
    if not match:
        return content

    start, frontmatter, end = match.groups()

    # Add description after the last existing field
    lines = frontmatter.strip().split('\n')
    lines.append(f'description: {description}')

    new_frontmatter = '\n'.join(lines)
    return content.replace(match.group(0), f'{start}{new_frontmatter}{end}')


def process_skill(filepath: Path, dry_run: bool) -> tuple[bool, str]:
    """Process a single skill file."""
    skill_name = filepath.stem

    with open(filepath, 'r') as f:
        content = f.read()

    # Skip if already has description
    if has_description(content):
        return False, 'already has description'

    # Extract description
    description = extract_description_from_content(content, skill_name)

    if not description:
        return False, 'no description found'

    # Add description to frontmatter
    new_content = add_description_to_frontmatter(content, description)

    if dry_run:
        return True, f'would add: "{description}"'

    # Write updated content
    with open(filepath, 'w') as f:
        f.write(new_content)

    return True, f'added: "{description}"'


def main():
    parser = argparse.ArgumentParser(description='Add description field to skill frontmatter')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes without applying')
    args = parser.parse_args()

    print('add-skill-descriptions.py - Add description to skill frontmatter\n')

    if args.dry_run:
        print('DRY RUN MODE - No files will be modified\n')

    # Find all skill files
    skill_files = sorted(SKILLS_DIR.glob('*.md'))
    print(f'Found {len(skill_files)} skill files\n')

    updated = 0
    skipped = 0
    errors = 0

    for filepath in skill_files:
        try:
            changed, message = process_skill(filepath, args.dry_run)
            if changed:
                print(f'  [+] {filepath.stem}: {message}')
                updated += 1
            else:
                print(f'  [-] {filepath.stem}: {message}')
                skipped += 1
        except Exception as e:
            print(f'  [!] {filepath.stem}: ERROR - {e}')
            errors += 1

    print(f'\n--- Summary ---')
    print(f'  Updated: {updated}')
    print(f'  Skipped: {skipped}')
    print(f'  Errors: {errors}')

    if args.dry_run and updated > 0:
        print(f'\nRun without --dry-run to apply changes')


if __name__ == '__main__':
    main()
