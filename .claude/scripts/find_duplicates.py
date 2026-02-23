#!/usr/bin/env python3
"""Find duplicate meeting files in the vault."""
from pathlib import Path
from collections import defaultdict
import os
import re

# Detect vault root from script location or environment variable
script_dir = Path(__file__).parent
vault = Path(os.environ.get('VAULT_DIR', script_dir.parent.parent))
meetings = list(vault.glob('Meeting - *.md'))
print(f'Total meeting files: {len(meetings)}')

# Group by normalized name (remove timestamps, lowercase)
normalized = defaultdict(list)
for m in meetings:
    name = m.stem.replace('Meeting - ', '')
    # Remove ISO timestamps like 2025 08 20T11 08 00.000+01 00
    name = re.sub(r'\d{4}[ _-]\d{2}[ _-]\d{2}T\d{2}[ _:]\d{2}[ _:]\d{2}[\.\d]*[\+\-]\d{2}[ _:]\d{2}', '', name)
    # Remove date patterns like 2025-01-08 or @12 August 2025
    name = re.sub(r'\d{4}-\d{2}-\d{2}', '', name)
    name = re.sub(r'@\d+ \w+ \d{4} \d+[: ]\d+ \(\w+\)', '', name)
    # Normalize spaces and case
    name = re.sub(r'\s+', ' ', name).strip().lower()
    normalized[name].append(m.name)

# Find potential duplicates (same normalized name)
dupes = {k: v for k, v in normalized.items() if len(v) > 1}
if dupes:
    print(f'\nPotential duplicates (same topic, different dates): {len(dupes)} groups')
    for name, files in sorted(dupes.items()):
        print(f'\n  "{name}":')
        for f in sorted(files):
            print(f'    - {f}')
else:
    print('\nNo duplicate meeting topics found')

# Also check for notion-import tag vs non-tagged (potential true duplicates)
print('\n--- Checking for notion-import vs existing duplicates ---')
notion_imported = set()
existing = set()

for m in meetings:
    content = m.read_text()
    name_base = m.stem.replace('Meeting - ', '').lower()
    # Remove timestamps for comparison
    name_base = re.sub(r'\d{4}[ _-]\d{2}[ _-]\d{2}.*', '', name_base).strip()

    if 'notion-import' in content:
        notion_imported.add((name_base, m.name))
    else:
        existing.add((name_base, m.name))

# Find overlaps
notion_names = {n[0] for n in notion_imported}
existing_names = {n[0] for n in existing}
overlaps = notion_names & existing_names

if overlaps:
    print(f'\nFound {len(overlaps)} potential duplicates between Notion imports and existing files:')
    for name in sorted(overlaps)[:20]:
        print(f'\n  Topic: "{name}"')
        for n, f in sorted(notion_imported):
            if n == name:
                print(f'    [NOTION] {f}')
        for n, f in sorted(existing):
            if n == name:
                print(f'    [EXISTING] {f}')
else:
    print('\nNo duplicates between Notion imports and existing files')
