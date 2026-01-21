#!/usr/bin/env python3
"""
Wiki-Link Checker Hook for Claude Code
Checks if wiki-links [[Note Name]] point to existing notes.

Hook Type: PostToolUse
Matcher: Edit|Write
Exit Codes:
  0 - Always (non-blocking, provides warnings via stdout)
"""

import json
import os
import re
import sys
from pathlib import Path

# Cache for vault notes (refreshed per invocation)
_vault_notes_cache = None


def get_vault_root(file_path: str) -> Path | None:
    """Find vault root by looking for .obsidian folder."""
    path = Path(file_path).resolve()

    # Walk up to find .obsidian
    for parent in [path] + list(path.parents):
        if (parent / ".obsidian").exists():
            return parent

    return None


def get_vault_notes(vault_root: Path) -> set[str]:
    """Get all note names (without .md extension) in the vault."""
    global _vault_notes_cache

    if _vault_notes_cache is not None:
        return _vault_notes_cache

    notes = set()

    # Directories to skip
    skip_dirs = {".obsidian", ".git", "node_modules", ".claude"}

    for root, dirs, files in os.walk(vault_root):
        # Skip hidden and special directories
        dirs[:] = [d for d in dirs if d not in skip_dirs and not d.startswith('.')]

        for file in files:
            if file.endswith(".md"):
                # Store note name without extension
                note_name = file[:-3]
                notes.add(note_name)

                # Also store with common variations
                # Handle aliases if we want to support them in future

    _vault_notes_cache = notes
    return notes


def extract_wiki_links(content: str) -> list[tuple[str, int]]:
    """
    Extract wiki-links from content.
    Returns list of (link_target, line_number) tuples.
    """
    links = []

    for line_num, line in enumerate(content.split('\n'), 1):
        # Match [[Link]] and [[Link|Alias]]
        # Exclude links in code blocks (simplified check)
        if line.strip().startswith('```'):
            continue

        for match in re.finditer(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', line):
            link_target = match.group(1).strip()
            links.append((link_target, line_num))

    return links


def extract_frontmatter_links(content: str) -> list[str]:
    """Extract wiki-links from frontmatter fields."""
    links = []

    if not content.startswith("---"):
        return links

    end_match = re.search(r'\n---\s*\n', content[3:])
    if not end_match:
        return links

    frontmatter = content[4:end_match.start() + 3]

    # Find all [[...]] patterns in frontmatter
    for match in re.finditer(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', frontmatter):
        links.append(match.group(1).strip())

    return links


def check_link_exists(link_target: str, vault_notes: set[str]) -> bool:
    """Check if a link target exists in the vault."""
    # Direct match
    if link_target in vault_notes:
        return True

    # Try with common prefixes removed/added
    prefixes = ["Project - ", "Page - ", "ADR - ", "Meeting - ", "Task - ",
                "Weblink - ", "Person - ", "Organisation - "]

    # If link has a prefix, try without
    for prefix in prefixes:
        if link_target.startswith(prefix):
            without_prefix = link_target[len(prefix):]
            if without_prefix in vault_notes:
                return True

    # If link doesn't have prefix, try with common ones
    for prefix in prefixes:
        with_prefix = prefix + link_target
        if with_prefix in vault_notes:
            return True

    # Handle heading links [[Note#Heading]]
    if '#' in link_target:
        note_part = link_target.split('#')[0]
        if note_part in vault_notes:
            return True

    # Handle block references [[Note^block-id]]
    if '^' in link_target:
        note_part = link_target.split('^')[0]
        if note_part in vault_notes:
            return True

    return False


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = input_data.get("tool_name", "")
    file_path = input_data.get("tool_input", {}).get("file_path", "")

    # Only check after Edit or Write on markdown files
    if tool_name not in ("Edit", "Write"):
        sys.exit(0)

    if not file_path or not file_path.endswith(".md"):
        sys.exit(0)

    # Skip template files
    skip_paths = ["+Templates/", ".obsidian/", "node_modules/"]
    if any(skip in file_path for skip in skip_paths):
        sys.exit(0)

    # Find vault root
    vault_root = get_vault_root(file_path)
    if not vault_root:
        sys.exit(0)

    # Get all notes in vault
    vault_notes = get_vault_notes(vault_root)

    # Read the file
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except (IOError, OSError):
        sys.exit(0)

    # Extract and check links
    body_links = extract_wiki_links(content)
    frontmatter_links = extract_frontmatter_links(content)

    broken_links = []
    warnings = []

    # Check body links
    for link_target, line_num in body_links:
        if not check_link_exists(link_target, vault_notes):
            broken_links.append(f"Line {line_num}: [[{link_target}]]")

    # Check frontmatter links
    for link_target in frontmatter_links:
        if not check_link_exists(link_target, vault_notes):
            warnings.append(f"Frontmatter: [[{link_target}]]")

    # Output
    if broken_links or warnings:
        print(f"🔗 Wiki-link check for {Path(file_path).name}:")

        if broken_links:
            print(f"   ⚠️  Broken links found ({len(broken_links)}):")
            for link in broken_links[:5]:  # Limit output
                print(f"      • {link}")
            if len(broken_links) > 5:
                print(f"      • ... and {len(broken_links) - 5} more")

        if warnings:
            print(f"   ⚠️  Broken frontmatter links:")
            for warning in warnings[:3]:
                print(f"      • {warning}")

        print("   💡 Create missing notes or check spelling")

    # Always exit 0 - validation is non-blocking
    sys.exit(0)


if __name__ == "__main__":
    main()
