#!/usr/bin/env python3
"""
Tag Taxonomy Enforcer Hook for Claude Code
Ensures tags follow the hierarchical taxonomy defined in tag-taxonomy.md.

Hook Type: PostToolUse
Matcher: Edit|Write
Exit Codes:
  0 - Always (non-blocking, provides warnings via stdout)
"""

import json
import re
import sys
from pathlib import Path

# Valid hierarchical tag prefixes
VALID_HIERARCHIES = {
    "activity": [
        "architecture", "implementation", "research", "evaluation",
        "operations", "delivery", "governance", "documentation",
        "modernisation", "integration", "compliance", "planning"
    ],
    "domain": [
        "engineering", "data", "integration", "cloud", "security",
        "aviation", "operations", "hr", "finance", "supply-chain",
        "maintenance", "planning", "documentation", "tooling",
        "platform", "identity", "analytics", "compliance", "infrastructure"
    ],
    "project": [
        # CUSTOMIZE: Add your project names here
        # Example: "cloud-migration", "api-modernization", "data-platform"
        # Note: New projects can be added - this list is not exhaustive
    ],
    "technology": [
        # Platforms & Cloud
        "aws", "azure", "gcp", "sap", "btp", "salesforce",
        # Data & Integration
        "kafka", "snowflake", "databricks", "mq", "api", "kong", "apigee",
        # AI & ML
        "bedrock", "openai", "langchain", "ai", "ml",
        # Databases
        "oracle", "postgresql", "mysql", "redis", "dynamodb", "mongodb",
        # Infrastructure
        "kubernetes", "docker", "terraform", "lambda", "ecs",
        # Applications
        "erp", "crm", "mdm", "saas",
        # Languages/Frameworks
        "python", "javascript", "typescript", "java", "go", "rust", "dotnet"
    ],
    "type": [
        "adr", "system", "scenario", "integration", "data-source",
        "hld", "lld", "runbook", "policy", "guardrail", "diagram", "canvas"
    ],
    "criticality": ["critical", "high", "medium", "low"],
    "status": ["draft", "review", "approved", "deprecated", "archived", "synced"],
    "vendor": [
        # CUSTOMIZE: Add your vendor names here
        # Example: "aws", "microsoft", "oracle", "sap"
    ],
    "audience": [
        "executive", "architect", "developer", "operations",
        "security", "data", "product", "business"
    ],
}

# Approved special flat tags (no hierarchy required)
APPROVED_FLAT_TAGS = [
    "notion-import", "pdf-import", "moc", "daily", "video", "automation"
]

# Minimum recommended tags by note type
MINIMUM_TAGS = {
    "Adr": {"required": ["activity"], "recommended": ["technology", "domain"]},
    "Project": {"required": ["project"], "recommended": ["domain"]},
    "System": {"required": ["type"], "recommended": ["domain", "technology", "criticality"]},
    "Page": {"required": [], "recommended": ["activity", "domain"]},
    "Meeting": {"required": [], "recommended": ["project", "domain"]},
}


def extract_tags(content: str) -> list[str]:
    """Extract tags from frontmatter."""
    # Find frontmatter
    if not content.startswith("---"):
        return []

    end_match = re.search(r'\n---\s*\n', content[3:])
    if not end_match:
        return []

    frontmatter = content[4:end_match.start() + 3]

    # Find tags line(s)
    tags = []

    # Match inline array: tags: [tag1, tag2]
    inline_match = re.search(r'tags:\s*\[(.*?)\]', frontmatter, re.DOTALL)
    if inline_match:
        tags_str = inline_match.group(1)
        # Split by comma, clean up
        for tag in tags_str.split(','):
            tag = tag.strip().strip('"\'')
            if tag:
                tags.append(tag)
        return tags

    # Match multi-line array
    multiline_match = re.search(r'tags:\s*\n((?:\s+-\s+.*\n?)+)', frontmatter)
    if multiline_match:
        for line in multiline_match.group(1).split('\n'):
            if line.strip().startswith('-'):
                tag = line.strip()[1:].strip().strip('"\'')
                if tag:
                    tags.append(tag)

    return tags


def extract_note_type(content: str) -> str:
    """Extract note type from frontmatter."""
    match = re.search(r'type:\s*(\w+)', content)
    return match.group(1) if match else ""


def validate_tag(tag: str) -> tuple[bool, str]:
    """
    Validate a single tag.
    Returns (is_valid, warning_message).
    """
    # Check for # prefix (should not be in frontmatter)
    if tag.startswith('#'):
        return False, f"Tag should not have # prefix in frontmatter: {tag}"

    # Check for uppercase (should be lowercase)
    if tag != tag.lower():
        return False, f"Tag should be lowercase: {tag} → {tag.lower()}"

    # Check if it's an approved flat tag
    if tag in APPROVED_FLAT_TAGS:
        return True, ""

    # Check if it's hierarchical
    if '/' not in tag:
        return False, f"Tag should be hierarchical (use prefix/value): {tag}"

    # Parse hierarchy
    parts = tag.split('/')
    if len(parts) > 3:
        return False, f"Tag has too many levels (max 3): {tag}"

    prefix = parts[0]
    value = parts[1] if len(parts) > 1 else ""

    # Check if prefix is valid
    if prefix not in VALID_HIERARCHIES:
        valid_prefixes = ", ".join(sorted(VALID_HIERARCHIES.keys()))
        return False, f"Unknown tag prefix '{prefix}' in {tag}. Valid: {valid_prefixes}"

    # Check if value is in known list (warning only for unknown values)
    # Some hierarchies like project/ can have new values
    known_values = VALID_HIERARCHIES[prefix]
    if value and known_values and value not in known_values:
        # For project/, vendor/, and technology/, unknown values are just info
        if prefix in ["project", "vendor", "technology"]:
            return True, f"Note: '{value}' is not in known {prefix}/ values (may be new)"
        else:
            return False, f"Unknown value '{value}' for {prefix}/. Known: {', '.join(known_values[:5])}..."

    return True, ""


def check_tag_coverage(tags: list[str], note_type: str) -> list[str]:
    """Check if note has recommended tag coverage."""
    warnings = []

    if note_type not in MINIMUM_TAGS:
        return warnings

    requirements = MINIMUM_TAGS[note_type]
    present_prefixes = set()

    for tag in tags:
        if '/' in tag:
            present_prefixes.add(tag.split('/')[0])

    # Check required
    for prefix in requirements.get("required", []):
        if prefix not in present_prefixes:
            warnings.append(f"Missing recommended tag prefix for {note_type}: {prefix}/")

    # Check recommended (softer warning)
    missing_recommended = []
    for prefix in requirements.get("recommended", []):
        if prefix not in present_prefixes:
            missing_recommended.append(f"{prefix}/")

    if missing_recommended:
        warnings.append(f"Consider adding tags: {', '.join(missing_recommended)}")

    return warnings


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

    # Skip template files and special directories
    skip_paths = ["+Templates/", ".obsidian/", "node_modules/", ".claude/"]
    if any(skip in file_path for skip in skip_paths):
        sys.exit(0)

    # Read the file
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except (IOError, OSError):
        sys.exit(0)

    # Extract tags and note type
    tags = extract_tags(content)
    note_type = extract_note_type(content)

    if not tags:
        # No tags is not necessarily an error
        sys.exit(0)

    warnings = []
    infos = []

    # Validate each tag
    for tag in tags:
        is_valid, message = validate_tag(tag)
        if message:
            if message.startswith("Note:"):
                infos.append(message)
            else:
                warnings.append(message)

    # Check tag coverage
    coverage_warnings = check_tag_coverage(tags, note_type)
    warnings.extend(coverage_warnings)

    # Output
    if warnings or infos:
        print(f"🏷️  Tag validation for {Path(file_path).name}:")
        for warning in warnings:
            print(f"   ⚠️  {warning}")
        for info in infos:
            print(f"   ℹ️  {info}")

    # Always exit 0 - validation is non-blocking
    sys.exit(0)


if __name__ == "__main__":
    main()
