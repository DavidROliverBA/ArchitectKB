#!/usr/bin/env python3
"""
Add aliases to Person notes so both "Name" and "Person - Name" links resolve.

Usage:
    python add-person-aliases.py [--dry-run]
"""
import os
import re
import sys
from pathlib import Path

VAULT_PATH = Path(__file__).parent.parent.parent
PEOPLE_PATH = VAULT_PATH / "People"

def get_first_name(full_name: str) -> str:
    """Extract first name from full name."""
    parts = full_name.split()
    return parts[0] if parts else full_name

def add_aliases_to_file(filepath: Path, dry_run: bool = False) -> bool:
    """Add aliases to a Person note if not already present."""
    content = filepath.read_text(encoding='utf-8')

    # Check if already has aliases
    if re.search(r'^aliases:', content, re.MULTILINE):
        return False

    # Extract name from filename
    name = filepath.stem  # e.g., "Naushin Galmani"
    first_name = get_first_name(name)

    # Build aliases
    aliases = [f"Person - {name}"]
    if first_name != name:
        aliases.append(first_name)

    aliases_str = f"aliases: [{', '.join(aliases)}]"

    # Find insertion point after title line
    # Pattern: after "title: Name" line
    title_pattern = r'(title:\s*[^\n]+\n)'
    match = re.search(title_pattern, content)

    if match:
        insert_pos = match.end()
        new_content = content[:insert_pos] + aliases_str + '\n' + content[insert_pos:]

        if dry_run:
            print(f"  Would add to {filepath.name}: {aliases_str}")
        else:
            filepath.write_text(new_content, encoding='utf-8')
            print(f"  Added to {filepath.name}: {aliases_str}")
        return True
    else:
        print(f"  Warning: Could not find title in {filepath.name}")
        return False

def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args

    print("=" * 60)
    print("Add Aliases to Person Notes")
    print("=" * 60)
    print(f"\nPeople folder: {PEOPLE_PATH}")
    print(f"Dry run: {dry_run}\n")

    if not PEOPLE_PATH.exists():
        print(f"Error: People folder not found at {PEOPLE_PATH}")
        return 1

    # Find all Person notes
    person_files = list(PEOPLE_PATH.glob("*.md"))
    print(f"Found {len(person_files)} Person notes\n")

    updated = 0
    skipped = 0

    for filepath in sorted(person_files):
        if add_aliases_to_file(filepath, dry_run):
            updated += 1
        else:
            skipped += 1

    print(f"\n{'Would update' if dry_run else 'Updated'}: {updated}")
    print(f"Skipped (already has aliases): {skipped}")

    if dry_run and updated > 0:
        print(f"\nRun without --dry-run to apply changes.")

    return 0

if __name__ == "__main__":
    sys.exit(main())
