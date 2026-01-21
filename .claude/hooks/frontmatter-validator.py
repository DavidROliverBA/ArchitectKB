#!/usr/bin/env python3
"""
Frontmatter Validator Hook for Claude Code
Validates YAML frontmatter in Obsidian markdown files.

Hook Type: PostToolUse
Matcher: Edit|Write
Exit Codes:
  0 - Always (non-blocking, provides warnings via stdout)
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

# Required fields by note type
REQUIRED_FIELDS = {
    "Task": ["type", "title", "completed", "priority"],
    "Project": ["type", "title", "status", "priority"],
    "Meeting": ["type", "title", "date", "attendees"],
    "Person": ["type", "title", "role"],
    "Adr": ["type", "title", "status", "adrType", "relatedTo", "supersedes", "dependsOn"],
    "Page": ["type", "title"],
    "Weblink": ["type", "title", "url"],
    "DailyNote": ["type", "date"],
    "Incubator": ["type", "title", "status", "domain"],
    "IncubatorNote": ["type", "title", "parent-ideas"],
    "FormSubmission": ["type", "title", "formType", "status", "project"],
    "Okr": ["type", "title", "status", "period", "objective"],
    "System": ["type", "title", "systemId", "status", "criticality"],
    "Article": ["type", "title", "articleType", "status", "targetAudience"],
    "MOC": ["type", "title", "scope"],
    "Dashboard": ["type", "title"],
    "CodeSnippet": ["type", "title", "language", "purpose"],
    "Query": ["type", "title", "queryType"],
    "Course": ["type", "title", "status", "provider"],
    "Organisation": ["type", "title"],
    "AtomicNote": ["type", "title"],
    "Policy": ["type", "title", "source", "status"],
    "Guardrail": ["type", "title", "source", "scope", "status"],
}

# Valid enum values for fields
VALID_VALUES = {
    "status": {
        "Task": ["active", "completed", "paused"],
        "Project": ["active", "paused", "completed"],
        "Adr": ["draft", "proposed", "accepted", "deprecated", "superseded"],
        "Incubator": ["seed", "exploring", "validated", "accepted", "rejected"],
        "FormSubmission": ["draft", "submitted", "pending", "approved", "rejected", "expired"],
        "Okr": ["active", "completed", "abandoned"],
        "Course": ["not-started", "in-progress", "completed"],
        "Article": ["draft", "ready", "published", "archived"],
        "System": ["active", "planned", "deprecated", "retired"],
        "Policy": ["active", "draft", "deprecated"],
        "Guardrail": ["active", "draft", "deprecated"],
    },
    "priority": ["high", "medium", "low"],
    "adrType": ["Technology_ADR", "Architecture_ADR", "Integration_ADR", "Security_ADR", "Data_ADR", "AI_ADR"],
    "confidence": ["high", "medium", "low"],
    "freshness": ["current", "recent", "stale"],
    "source": ["primary", "secondary", "synthesis", "external", "local", "confluence"],
    "criticality": ["critical", "high", "medium", "low"],
    "articleType": ["article", "blog-post", "document", "guardrail", "video", "podcast", "linkedin-post"],
    "targetAudience": ["internal", "external", "both"],
    "formType": ["DPIA", "CyberRisk", "TPRM", "IAF", "ChangeRequest", "Other"],
    "queryType": ["table", "list", "task"],
    "authority": ["draft", "local", "team", "organizational"],
    "transformationType": ["modernisation", "migration", "greenfield", "integration", "decommission", "uplift"],
    "transformationScope": ["enterprise", "department", "team", "application"],
}

# Date fields that should be ISO format
DATE_FIELDS = ["created", "modified", "date", "reviewed", "doDate", "dueBy",
               "submittedDate", "responseDate", "expiryDate", "publishedDate",
               "completedDate", "effectiveDate", "reviewDate", "archivedDate"]


def extract_frontmatter(content: str) -> tuple[dict | None, list[str]]:
    """Extract YAML frontmatter from markdown content."""
    errors = []

    if not content.startswith("---"):
        return None, ["No frontmatter found (file should start with ---)"]

    # Find closing ---
    end_match = re.search(r'\n---\s*\n', content[3:])
    if not end_match:
        return None, ["Frontmatter not closed (missing closing ---)"]

    yaml_content = content[4:end_match.start() + 3]

    # Simple YAML parsing (handles most common cases)
    frontmatter = {}
    current_key = None
    current_value = []
    in_array = False

    for line in yaml_content.split('\n'):
        stripped = line.strip()

        # Skip empty lines and comments
        if not stripped or stripped.startswith('#'):
            continue

        # Check for key: value
        key_match = re.match(r'^([a-zA-Z_-]+):\s*(.*)', line)
        if key_match and not line.startswith(' ') and not line.startswith('\t'):
            # Save previous key if exists
            if current_key:
                if in_array:
                    frontmatter[current_key] = current_value
                else:
                    frontmatter[current_key] = current_value[0] if current_value else ""

            current_key = key_match.group(1)
            value = key_match.group(2).strip()

            # Check if array
            if value.startswith('['):
                in_array = True
                # Inline array
                if value.endswith(']'):
                    # Parse inline array
                    array_content = value[1:-1]
                    if array_content:
                        items = [item.strip().strip('"\'') for item in array_content.split(',')]
                        current_value = [i for i in items if i]
                    else:
                        current_value = []
                    frontmatter[current_key] = current_value
                    current_key = None
                    in_array = False
                else:
                    current_value = []
            else:
                in_array = False
                # Remove quotes
                value = value.strip('"\'')
                current_value = [value] if value else []
        elif in_array and stripped.startswith('-'):
            # Array item
            item = stripped[1:].strip().strip('"\'')
            current_value.append(item)
        elif current_key and (line.startswith(' ') or line.startswith('\t')):
            # Continuation of previous value
            if not in_array:
                current_value.append(stripped)

    # Save last key
    if current_key:
        if in_array:
            frontmatter[current_key] = current_value
        else:
            frontmatter[current_key] = current_value[0] if current_value else ""

    return frontmatter, errors


def validate_date(value: str, field_name: str) -> str | None:
    """Validate date format is YYYY-MM-DD."""
    if not value or value in ('null', 'None', ''):
        return None

    # Remove quotes
    value = str(value).strip('"\'')

    if value in ('null', 'None', ''):
        return None

    # Check ISO format
    try:
        datetime.strptime(value, '%Y-%m-%d')
        return None
    except ValueError:
        return f"Invalid date format for '{field_name}': '{value}' (expected YYYY-MM-DD)"


def validate_frontmatter(frontmatter: dict, file_path: str) -> list[str]:
    """Validate frontmatter fields and values."""
    warnings = []

    # Check type field exists
    note_type = frontmatter.get("type", "")
    if not note_type:
        warnings.append("Missing required field: type")
        return warnings

    # Check required fields for this type
    required = REQUIRED_FIELDS.get(note_type, ["type", "title"])
    for field in required:
        if field not in frontmatter:
            warnings.append(f"Missing required field for {note_type}: {field}")
        elif frontmatter[field] in (None, "", "null", []):
            # Some fields can be null/empty, but warn anyway
            if field not in ["relatedTo", "supersedes", "dependsOn", "contradicts",
                           "project", "attendees", "domain", "parent-ideas"]:
                warnings.append(f"Empty value for required field: {field}")

    # Validate enum values
    for field, valid_options in VALID_VALUES.items():
        if field in frontmatter and frontmatter[field]:
            value = frontmatter[field]
            if value in ('null', 'None', '', None):
                continue

            # Handle type-specific status values
            if isinstance(valid_options, dict):
                if note_type in valid_options:
                    options = valid_options[note_type]
                    if value not in options:
                        warnings.append(f"Invalid {field} value '{value}' for {note_type}. Valid: {', '.join(options)}")
            else:
                if value not in valid_options:
                    warnings.append(f"Invalid {field} value '{value}'. Valid: {', '.join(valid_options)}")

    # Validate date fields
    for field in DATE_FIELDS:
        if field in frontmatter:
            error = validate_date(frontmatter[field], field)
            if error:
                warnings.append(error)

    # Check for common mistakes
    tags = frontmatter.get("tags", [])
    if isinstance(tags, list):
        for tag in tags:
            if tag.startswith('#'):
                warnings.append(f"Tag should not have # prefix in frontmatter: {tag}")

    # Check title matches filename convention
    title = frontmatter.get("title", "")
    filename = Path(file_path).stem

    # Type-specific filename checks
    expected_prefixes = {
        "Project": "Project - ",
        "Task": "Task - ",
        "Adr": "ADR - ",
        "Page": "Page - ",
        "Weblink": "Weblink - ",
        "Incubator": "Incubator - ",
        "IncubatorNote": "Incubator Note - ",
        "FormSubmission": "Form Submission - ",
        "Okr": "OKR - ",
        "MOC": "MOC - ",
        "Dashboard": "Dashboard - ",
        "CodeSnippet": "CodeSnippet - ",
        "Article": "Article - ",
        "Organisation": "Organisation - ",
        "AtomicNote": "Atomic Note - ",
        "Query": "Query - ",
        "Course": "Course - ",
        "Policy": "Policy - ",
        "Guardrail": "Guardrail - ",
    }

    if note_type in expected_prefixes:
        prefix = expected_prefixes[note_type]
        if not filename.startswith(prefix.rstrip(" - ")):
            warnings.append(f"Filename should start with '{prefix}' for {note_type} notes")

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
    skip_paths = ["+Templates/", ".obsidian/", "node_modules/"]
    if any(skip in file_path for skip in skip_paths):
        sys.exit(0)

    # Read the file
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except (IOError, OSError):
        sys.exit(0)

    # Extract and validate frontmatter
    frontmatter, parse_errors = extract_frontmatter(content)

    all_warnings = parse_errors.copy()

    if frontmatter:
        all_warnings.extend(validate_frontmatter(frontmatter, file_path))

    # Output warnings
    if all_warnings:
        print(f"📋 Frontmatter validation for {Path(file_path).name}:")
        for warning in all_warnings:
            print(f"   ⚠️  {warning}")

    # Always exit 0 - validation is non-blocking (warnings only)
    sys.exit(0)


if __name__ == "__main__":
    main()
