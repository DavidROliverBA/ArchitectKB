#!/usr/bin/env python3
"""
Secret File Scanner Hook for Claude Code
Scans file content being written for potential secrets.

Hook Type: PreToolUse
Matcher: Edit|Write
Exit Codes:
  0 - Success (content is safe to write)
  1 - Error (non-blocking)
  2 - Block (secrets detected in content)
"""

import json
import re
import sys

# Secret patterns - same as secret-detection.py for consistency
SECRET_PATTERNS = [
    # Common API key formats
    (r"sk-[a-zA-Z0-9]{20,}", "OpenAI API key"),
    (r"sk-ant-[a-zA-Z0-9-]{20,}", "Anthropic API key"),
    (r"ghp_[a-zA-Z0-9]{36}", "GitHub personal access token"),
    (r"gho_[a-zA-Z0-9]{36}", "GitHub OAuth token"),
    (r"ghs_[a-zA-Z0-9]{36}", "GitHub server token"),
    (r"AKIA[0-9A-Z]{16}", "AWS access key ID"),

    # Notion tokens
    (r"ntn_[a-zA-Z0-9]{40,}", "Notion integration token"),
    (r"secret_[a-zA-Z0-9]{40,}", "Notion internal token"),

    # Atlassian tokens
    (r"ATATT[a-zA-Z0-9]{20,}", "Atlassian API token"),

    # Slack tokens
    (r"xox[baprs]-[0-9A-Za-z\-]{10,}", "Slack token"),

    # Google API keys
    (r"AIza[0-9A-Za-z\-_]{35}", "Google API key"),

    # Private keys (PEM format headers)
    (r"-----BEGIN\s+(RSA\s+)?PRIVATE\s+KEY-----", "private key (PEM)"),
    (r"-----BEGIN\s+OPENSSH\s+PRIVATE\s+KEY-----", "SSH private key"),
]

# Files to skip scanning (legitimate security tool files, documentation, etc.)
SKIP_PATTERNS = [
    r"\.pre-commit-config\.yaml$",
    r"secret-detection\.py$",
    r"secret-file-scanner\.py$",
    r"file-protection\.py$",
    r"\.secrets\.baseline$",
    r"CLAUDE\.md$",  # Documentation may reference patterns
    r"vault-conventions\.md$",
    r"\.claude/rules/.*\.md$",  # Rule documentation
    r"\.claude/skills/.*\.md$",  # Skill documentation
]


def should_skip_file(file_path: str) -> bool:
    """Check if file should be skipped from scanning."""
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, file_path):
            return True
    return False


def check_content_for_secrets(content: str) -> list[tuple[str, int]]:
    """Check content for potential secrets. Returns list of (type, count) tuples."""
    findings = []
    for pattern, secret_type in SECRET_PATTERNS:
        matches = re.findall(pattern, content)
        if matches:
            findings.append((secret_type, len(matches)))
    return findings


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        print("Failed to parse input JSON", file=sys.stderr)
        sys.exit(1)

    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})

    # Only check Edit and Write tools
    if tool_name not in ("Edit", "Write"):
        sys.exit(0)

    file_path = tool_input.get("file_path", "")

    # Skip certain files (documentation, security tools themselves)
    if should_skip_file(file_path):
        sys.exit(0)

    # Get the content being written
    content = ""
    if tool_name == "Write":
        content = tool_input.get("content", "")
    elif tool_name == "Edit":
        content = tool_input.get("new_string", "")

    if not content:
        sys.exit(0)

    findings = check_content_for_secrets(content)

    if findings:
        # Build warning message
        secret_types = [f"{stype} ({count}x)" for stype, count in findings]
        warning = f"Potential secrets detected in file content: {', '.join(secret_types)}"

        print(f"🔐 {warning}", file=sys.stderr)
        print(f"   File: {file_path}", file=sys.stderr)
        print("   Review content before proceeding.", file=sys.stderr)

        # Output blocking decision
        output = {
            "decision": "block",
            "reason": f"⚠️ {warning}\n\nFile: {file_path}\n\nPlease remove sensitive data before writing."
        }
        print(json.dumps(output))
        sys.exit(0)

    # No secrets found - allow the write
    sys.exit(0)


if __name__ == "__main__":
    main()
