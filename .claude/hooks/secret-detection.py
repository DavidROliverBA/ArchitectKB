#!/usr/bin/env python3
"""
Secret Detection Hook for Claude Code
Detects potential secrets in user prompts and blocks them from being sent.

Hook Type: UserPromptSubmit
Exit Codes:
  0 - Success (prompt is safe or decision output provided)
  1 - Error (non-blocking)
  2 - Block (blocking error)
"""

import json
import re
import sys

# Patterns that indicate potential secrets
SECRET_PATTERNS = [
    # Explicit key-value patterns
    (r"(?i)\b(password|passwd|pwd)\s*[:=]\s*\S+", "password"),
    (r"(?i)\b(secret|api_?secret)\s*[:=]\s*\S+", "secret"),
    (r"(?i)\b(api_?key|apikey)\s*[:=]\s*\S+", "API key"),
    (r"(?i)\b(token|auth_?token|access_?token)\s*[:=]\s*\S+", "token"),
    (r"(?i)\b(private_?key)\s*[:=]\s*\S+", "private key"),

    # Common API key formats
    (r"sk-[a-zA-Z0-9]{20,}", "OpenAI API key"),
    (r"sk-ant-[a-zA-Z0-9-]{20,}", "Anthropic API key"),
    (r"ghp_[a-zA-Z0-9]{36}", "GitHub personal access token"),
    (r"gho_[a-zA-Z0-9]{36}", "GitHub OAuth token"),
    (r"ghs_[a-zA-Z0-9]{36}", "GitHub server token"),
    (r"AKIA[0-9A-Z]{16}", "AWS access key ID"),
    (r"(?i)aws_secret_access_key\s*[:=]\s*\S+", "AWS secret key"),

    # Bearer tokens
    (r"(?i)bearer\s+[a-zA-Z0-9\-_\.]{20,}", "Bearer token"),

    # Connection strings
    (r"(?i)(mongodb|postgres|mysql|redis)://[^\s]+:[^\s]+@", "database connection string"),
]


def check_for_secrets(prompt: str) -> list[tuple[str, str]]:
    """Check prompt for potential secrets. Returns list of (match, type) tuples."""
    findings = []
    for pattern, secret_type in SECRET_PATTERNS:
        matches = re.findall(pattern, prompt)
        if matches:
            # Don't include the actual secret in findings
            findings.append((secret_type, len(matches)))
    return findings


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        print("Failed to parse input JSON", file=sys.stderr)
        sys.exit(1)

    prompt = input_data.get("userPrompt", "")

    if not prompt:
        sys.exit(0)

    findings = check_for_secrets(prompt)

    if findings:
        # Build warning message
        secret_types = [f"{stype} ({count}x)" for stype, count in findings]
        warning = f"Potential secrets detected: {', '.join(secret_types)}"

        # Output blocking decision
        output = {
            "decision": "block",
            "reason": f"⚠️ {warning}\n\nPlease remove sensitive information before sending."
        }
        print(json.dumps(output))
        sys.exit(0)

    # No secrets found - allow the prompt
    sys.exit(0)


if __name__ == "__main__":
    main()
