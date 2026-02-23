#!/usr/bin/env python3
"""
Add model field to skills that don't have it.
"""

import os
import re
from pathlib import Path

# Model assignments based on skill complexity
# haiku: quick, simple tasks
# sonnet: balanced, document processing, analysis
# opus: deep architecture decisions (rare)

SKILL_MODELS = {
    # Haiku - quick/simple tasks
    "adr-report": "haiku",
    "broken-links": "haiku",
    "dpia-status": "haiku",
    "form-status": "haiku",
    "form": "haiku",
    "graph-query": "haiku",
    "orphans": "haiku",
    "project-snapshot": "haiku",
    "q": "haiku",
    "related": "haiku",
    "rename": "haiku",
    "rss-subscriptions": "haiku",
    "search": "haiku",
    "secrets": "haiku",
    "sync-notion": "haiku",
    "sync-notion-pages": "haiku",
    "todos": "haiku",
    "weblink": "haiku",
    "weekly-summary": "haiku",
    "wipe": "haiku",

    # Sonnet - balanced tasks
    "adr": "sonnet",  # Architecture decisions need good reasoning
    "architecture": "sonnet",
    "attachment-audit": "sonnet",
    "csv-to-page": "sonnet",
    "csv-to-sql": "sonnet",
    "dataasset": "sonnet",
    "datasource": "sonnet",
    "diagram-review": "sonnet",
    "document-extract": "sonnet",
    "exec-summary": "sonnet",
    "find-decisions": "sonnet",
    "integration": "sonnet",
    "pdf-to-page": "sonnet",
    "pptx-to-page": "sonnet",
    "project-status": "sonnet",
    "quality-report": "sonnet",
    "scenario": "sonnet",
    "score-rfi": "sonnet",
    "screenshot-analyze": "sonnet",
    "summarize": "sonnet",
    "system": "sonnet",
    "timeline": "sonnet",
    "youtube": "sonnet",
}


def add_model_to_skill(filepath: Path) -> bool:
    """Add model field to a skill file if missing."""
    skill_name = filepath.stem

    if skill_name not in SKILL_MODELS:
        print(f"Warning: No model defined for {skill_name}, defaulting to sonnet")
        model = "sonnet"
    else:
        model = SKILL_MODELS[skill_name]

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already has model field
    if re.search(r'^model:', content, re.MULTILINE):
        return False

    # Find the end of frontmatter (second ---)
    lines = content.split('\n')
    frontmatter_end = -1
    dash_count = 0

    for i, line in enumerate(lines):
        if line.strip() == '---':
            dash_count += 1
            if dash_count == 2:
                frontmatter_end = i
                break

    if frontmatter_end == -1:
        print(f"Warning: Could not find frontmatter in {filepath}")
        return False

    # Insert model field before the closing ---
    lines.insert(frontmatter_end, f"model: {model}")

    new_content = '\n'.join(lines)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Added model: {model} to {skill_name}")
    return True


def main():
    skills_dir = Path(__file__).parent.parent / "skills"

    updated = 0
    for skill_file in skills_dir.glob("*.md"):
        if add_model_to_skill(skill_file):
            updated += 1

    print(f"\nUpdated {updated} skill files")


if __name__ == "__main__":
    main()
