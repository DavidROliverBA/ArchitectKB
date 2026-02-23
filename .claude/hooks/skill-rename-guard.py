#!/usr/bin/env python3
"""PreToolUse hook: blocks Bash commands that rename SKILL.md to lowercase skill.md.

Anthropic standard requires uppercase SKILL.md for skill discovery.
Intercepts: git mv, mv, rename operations targeting SKILL.md -> skill.md
"""
import json
import re
import sys

try:
    raw_input = sys.stdin.read()
    if not raw_input or not raw_input.strip():
        sys.exit(0)
    data = json.loads(raw_input)
except (json.JSONDecodeError, ValueError, EOFError):
    sys.exit(0)

command = data.get("tool_input", {}).get("command", "").strip()
if not command:
    sys.exit(0)

# Only match actual file rename commands, not commit messages or other text
dangerous_patterns = [
    r'(?:git\s+mv|^mv)\s+\S*SKILL\.md\s+\S*skill\.md',
    r'(?:git\s+mv|^mv)\s+.*"/SKILL\.md"\s+.*"/skill\.md"',
    r'\brename\s+.*SKILL\.md.*skill\.md',
]

for pattern in dangerous_patterns:
    if re.search(pattern, command):
        # Allow the reverse direction (skill.md -> SKILL.md) which is the fix
        if re.search(r'(?:git\s+mv|mv)\s+\S*skill\.md\s+\S*SKILL\.md', command):
            sys.exit(0)

        print(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason":
                    "BLOCKED: Renaming SKILL.md to lowercase skill.md violates "
                    "Anthropic convention. SKILL.md must remain uppercase for "
                    "Claude Code skill discovery."
            }
        }))
        sys.exit(0)

# Not a dangerous rename - allow
sys.exit(0)
