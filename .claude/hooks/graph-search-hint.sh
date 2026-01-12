#!/bin/bash
# Hook: Suggest graph search before Grep
# Type: PreToolUse
# Matcher: Grep

# Read the tool input from stdin
INPUT=$(cat)

# Extract the search pattern from the Grep tool call
PATTERN=$(echo "$INPUT" | jq -r '.tool_input.pattern // empty')

# If pattern looks like a simple keyword search, suggest graph first
if [[ -n "$PATTERN" && ! "$PATTERN" =~ [\[\]\(\)\{\}\*\+\?\\] ]]; then
  # Simple pattern without regex - graph might be better
  cat << EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "message": "💡 Tip: For keyword searches, the graph index is faster. Try:\n   node scripts/graph-query.js --search \"$PATTERN\"\n   or /graph-query $PATTERN"
  }
}
EOF
else
  # Complex regex - let Grep proceed
  echo '{}'
fi
