#!/usr/bin/env python3
"""
Tag Refactoring Script

Refactors tags across the Obsidian vault to follow the official taxonomy.
See .claude/rules/tag-taxonomy.md for the complete taxonomy reference.

Usage:
    python3 scripts/refactor_tags.py --dry-run   # Preview changes
    python3 scripts/refactor_tags.py              # Apply changes

Safety:
    - Always run with --dry-run first
    - Commit to git before running
    - Creates backup in .backups/ directory
"""

import os
import re
import yaml
import argparse
from pathlib import Path
from datetime import datetime
from collections import defaultdict
import shutil

# Import comprehensive migration mappings
from tag_migrations import (
    FLAT_TO_HIERARCHICAL,
    HIERARCHY_MIGRATIONS,
    CONTEXT_DEPENDENT,
    NEW_APPROVED_HIERARCHIES
)

# Vault root directory
VAULT_ROOT = Path(__file__).parent.parent

# Directories to skip
SKIP_DIRS = {
    '.git', '.obsidian', 'node_modules', '.backups',
    'Attachments', 'Attachments', '.claude'
}

# File patterns to process
FILE_PATTERN = '*.md'


class TagRefactorer:
    """Refactors tags according to official taxonomy."""

    def __init__(self, dry_run=True):
        self.dry_run = dry_run
        self.stats = defaultdict(int)
        self.changes = []

        # Use imported comprehensive migration mappings
        self.flat_to_hierarchical = FLAT_TO_HIERARCHICAL
        self.hierarchy_migrations = HIERARCHY_MIGRATIONS
        self.context_dependent = CONTEXT_DEPENDENT

    def refactor_tag(self, tag, note_type=None, content_lower=''):
        """Refactor a single tag according to taxonomy rules."""

        # Skip empty tags
        if not tag or not tag.strip():
            self.stats['empty_tags'] += 1
            return None

        # Remove inline # prefix (from frontmatter)
        if tag.startswith('#'):
            tag = tag[1:]
            self.stats['inline_prefix_removed'] += 1

        # Skip template variables
        if '{{' in tag or '}}' in tag:
            self.stats['template_variables'] += 1
            return None

        # Skip file paths (contamination from grep)
        if tag.startswith('./') or ':tags:' in tag:
            self.stats['file_paths'] += 1
            return None

        # Already hierarchical - check for migrations and normalize case
        if '/' in tag:
            parts = tag.split('/')
            prefix = parts[0] + '/'

            # Check if hierarchy prefix needs migration
            if prefix in self.hierarchy_migrations:
                new_prefix = self.hierarchy_migrations[prefix]
                # Rebuild tag with new prefix
                new_parts = [new_prefix.rstrip('/')] + parts[1:]
                tag = '/'.join(new_parts)
                self.stats['hierarchy_migrated'] += 1
                parts = tag.split('/')

            # Normalize to lowercase
            parts_lower = [p.lower() for p in parts]
            normalized = '/'.join(parts_lower)

            if normalized != tag:
                self.stats['case_normalized'] += 1

            return normalized

        # Normalize case for flat tags
        tag_lower = tag.lower()

        # Direct mapping
        if tag_lower in self.flat_to_hierarchical:
            new_tag = self.flat_to_hierarchical[tag_lower]
            if new_tag != tag_lower:
                self.stats['flat_to_hierarchical'] += 1
            return new_tag

        # Context-dependent (default to first option)
        if tag_lower in self.context_dependent:
            options = self.context_dependent[tag_lower]

            # Try to infer from context
            if tag_lower == 'architecture':
                if note_type == 'Adr' or 'decision' in content_lower:
                    new_tag = options[0]  # activity/architecture
                else:
                    new_tag = options[0]  # default to activity
            elif tag_lower == 'integration':
                if 'integration pattern' in content_lower or note_type == 'Adr':
                    new_tag = options[0]  # activity/integration
                else:
                    new_tag = options[1]  # domain/integration
            elif tag_lower == 'documentation':
                new_tag = options[0]  # activity/documentation
            else:
                new_tag = options[0]  # default to first

            self.stats['context_dependent'] += 1
            return new_tag

        # Uppercase flat tags - try to find lowercase equivalent
        if tag != tag_lower:
            # Check if lowercase version has mapping
            if tag_lower in self.flat_to_hierarchical:
                new_tag = self.flat_to_hierarchical[tag_lower]
                self.stats['uppercase_mapped'] += 1
                return new_tag

            # No mapping - just lowercase it (will be caught as orphan)
            self.stats['case_normalized'] += 1
            return tag_lower

        # Orphan flat tag - log it but keep for now
        self.stats['orphan_flat_tags'] += 1
        return tag_lower

    def process_file(self, file_path):
        """Process a single markdown file."""

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract frontmatter
            match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
            if not match:
                self.stats['no_frontmatter'] += 1
                return None

            frontmatter_text = match.group(1)
            body = match.group(2)

            # Parse frontmatter YAML
            try:
                frontmatter = yaml.safe_load(frontmatter_text)
            except yaml.YAMLError as e:
                self.stats['yaml_errors'] += 1
                return None

            # Skip if no tags field
            if not frontmatter or 'tags' not in frontmatter:
                self.stats['no_tags_field'] += 1
                return None

            tags = frontmatter.get('tags', [])

            # Skip if empty
            if not tags or tags == []:
                self.stats['empty_tags_array'] += 1
                return None

            # Get note type and content for context
            note_type = frontmatter.get('type')
            content_lower = (frontmatter_text + body).lower()

            # Refactor tags
            original_tags = tags.copy()
            refactored_tags = []

            for tag in tags:
                new_tag = self.refactor_tag(tag, note_type, content_lower)
                if new_tag:  # Skip None (template vars, empty tags)
                    refactored_tags.append(new_tag)

            # Remove duplicates while preserving order
            seen = set()
            unique_tags = []
            for tag in refactored_tags:
                if tag not in seen:
                    seen.add(tag)
                    unique_tags.append(tag)

            # Check if changes were made
            if unique_tags != original_tags:
                self.stats['files_changed'] += 1

                change = {
                    'file': str(file_path.relative_to(VAULT_ROOT)),
                    'original': original_tags,
                    'refactored': unique_tags,
                }
                self.changes.append(change)

                # Update frontmatter if not dry run
                if not self.dry_run:
                    frontmatter['tags'] = unique_tags

                    # Rebuild YAML (preserve order and formatting)
                    new_frontmatter = yaml.dump(
                        frontmatter,
                        default_flow_style=False,
                        sort_keys=False,
                        allow_unicode=True
                    )

                    new_content = f"---\n{new_frontmatter}---\n{body}"

                    # Write back to file
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)

                return change
            else:
                self.stats['no_changes'] += 1
                return None

        except Exception as e:
            self.stats['errors'] += 1
            print(f"Error processing {file_path}: {e}")
            return None

    def process_vault(self):
        """Process all markdown files in vault."""

        print(f"\n{'DRY RUN - ' if self.dry_run else ''}Refactoring vault tags...")
        print(f"Vault: {VAULT_ROOT}\n")

        # Find all markdown files
        markdown_files = []
        for root, dirs, files in os.walk(VAULT_ROOT):
            # Skip excluded directories
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]

            for file in files:
                if file.endswith('.md'):
                    markdown_files.append(Path(root) / file)

        print(f"Found {len(markdown_files)} markdown files\n")

        # Process files
        for i, file_path in enumerate(markdown_files, 1):
            if i % 100 == 0:
                print(f"Processing {i}/{len(markdown_files)}...")

            self.process_file(file_path)

        # Print results
        self.print_summary()

    def print_summary(self):
        """Print refactoring summary."""

        print("\n" + "="*70)
        print(f"{'DRY RUN - ' if self.dry_run else ''}Tag Refactoring Summary")
        print("="*70 + "\n")

        print("Statistics:")
        print(f"  Files processed: {sum(self.stats.values())}")
        print(f"  Files changed: {self.stats['files_changed']}")
        print(f"  No changes needed: {self.stats['no_changes']}")
        print(f"  No frontmatter: {self.stats['no_frontmatter']}")
        print(f"  No tags field: {self.stats['no_tags_field']}")
        print(f"  Empty tags array: {self.stats['empty_tags_array']}")
        print(f"  YAML errors: {self.stats['yaml_errors']}")
        print(f"  Processing errors: {self.stats['errors']}")

        print("\nTag Changes:")
        print(f"  Flat → Hierarchical: {self.stats['flat_to_hierarchical']}")
        print(f"  Case normalized: {self.stats['case_normalized']}")
        print(f"  Inline # removed: {self.stats['inline_prefix_removed']}")
        print(f"  Uppercase mapped: {self.stats['uppercase_mapped']}")
        print(f"  Context-dependent: {self.stats['context_dependent']}")
        print(f"  Template variables removed: {self.stats['template_variables']}")
        print(f"  File paths removed: {self.stats['file_paths']}")
        print(f"  Empty tags removed: {self.stats['empty_tags']}")
        print(f"  Orphan flat tags: {self.stats['orphan_flat_tags']}")

        if self.changes:
            print(f"\n{len(self.changes)} files with changes:")
            print("\nFirst 20 changes:\n")
            for change in self.changes[:20]:
                print(f"  {change['file']}")
                print(f"    Before: {change['original']}")
                print(f"    After:  {change['refactored']}")
                print()

        if self.dry_run:
            print("\n" + "="*70)
            print("DRY RUN COMPLETE - No files were modified")
            print("Run without --dry-run to apply changes")
            print("="*70)
        else:
            print("\n" + "="*70)
            print("REFACTORING COMPLETE")
            print(f"Modified {self.stats['files_changed']} files")
            print("="*70)


def main():
    parser = argparse.ArgumentParser(
        description='Refactor tags across Obsidian vault to follow official taxonomy'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview changes without modifying files'
    )
    parser.add_argument(
        '--backup',
        action='store_true',
        help='Create backup before refactoring'
    )

    args = parser.parse_args()

    # Create backup if requested
    if args.backup and not args.dry_run:
        backup_dir = VAULT_ROOT / '.backups' / f"tags_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        backup_dir.mkdir(parents=True, exist_ok=True)
        print(f"Creating backup in {backup_dir}...")

        for file in VAULT_ROOT.glob('**/*.md'):
            if not any(skip in file.parts for skip in SKIP_DIRS):
                rel_path = file.relative_to(VAULT_ROOT)
                dest = backup_dir / rel_path
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(file, dest)

        print("Backup complete\n")

    # Run refactoring
    refactorer = TagRefactorer(dry_run=args.dry_run)
    refactorer.process_vault()


if __name__ == '__main__':
    main()
