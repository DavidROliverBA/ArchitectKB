#!/usr/bin/env python3
"""
File Protection Hook for Claude Code
Blocks edits to sensitive files.

Hook Type: PreToolUse
Matcher: Edit|Write
Exit Codes:
  0 - Success (file is safe to edit)
  1 - Error (non-blocking)
  2 - Block (protected file)
"""

import json
import sys

# Files and paths to protect
PROTECTED_PATHS = [
    # Environment files
    ".env",
    ".env.local",
    ".env.production",
    ".env.development",

    # Lock files
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "Gemfile.lock",
    "poetry.lock",
    "Cargo.lock",

    # Version control
    ".git/",

    # Credentials directories
    ".aws/",
    ".ssh/",
    ".gnupg/",

    # Common secret files
    "credentials",
    "credentials.json",
    "secrets.json",
    "secrets.yaml",
    "secrets.yml",
    ".secrets",

    # Private keys and certificates
    "*.pem",
    "*.key",
    "*.p12",
    "*.pfx",
    "id_rsa",
    "id_ed25519",
    "id_ecdsa",

    # Token files
    ".npmrc",
    ".pypirc",
    ".netrc",

    # Claude settings (prevent accidental self-modification)
    "settings.local.json",
]


def is_protected(file_path: str) -> tuple[bool, str]:
    """Check if file path matches any protected pattern."""
    from pathlib import Path
    
    # Normalize path for consistent matching
    path_parts = Path(file_path).parts
    filename = Path(file_path).name
    
    for protected in PROTECTED_PATHS:
        if protected.startswith("*"):
            # Wildcard suffix match (e.g., *.pem)
            if file_path.endswith(protected[1:]):
                return True, f"Protected file type: {protected}"
        elif protected.endswith("/"):
            # Directory match - check if directory appears as a path segment
            dir_name = protected[:-1]
            if dir_name in path_parts:
                return True, f"Protected directory: {protected}"
        else:
            # Exact filename match (not substring)
            if filename == protected or file_path.endswith("/" + protected):
                return True, f"Protected file: {protected}"

    return False, ""


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        print("Failed to parse input JSON", file=sys.stderr)
        sys.exit(1)

    tool_name = input_data.get("tool_name", "")
    file_path = input_data.get("tool_input", {}).get("file_path", "")

    # Only check Edit and Write tools
    if tool_name not in ("Edit", "Write"):
        sys.exit(0)

    if not file_path:
        sys.exit(0)

    is_blocked, reason = is_protected(file_path)

    if is_blocked:
        print(f"🛡️ {reason}", file=sys.stderr)
        print(f"   File: {file_path}", file=sys.stderr)
        print("   Use --force or edit manually if you really need to modify this file.", file=sys.stderr)
        sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()
