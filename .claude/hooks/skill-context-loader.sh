#!/bin/bash
# Skill Context Loader Hook
# Detects skill commands and outputs relevant context files
# Used by UserPromptSubmit hook to inject context before skill execution
#
# Hook Type: UserPromptSubmit
# Input: JSON via stdin with "prompt" field
# Output: JSON with additionalContext field (or empty for no context)

set -e

CONTEXT_DIR=".claude/context"
CONTEXTS_TO_LOAD=()

# Read JSON input from stdin
INPUT=$(cat)

# Extract the prompt from JSON input
PROMPT=$(echo "$INPUT" | jq -r '.userPrompt // empty')

# Exit early if no prompt
if [[ -z "$PROMPT" ]]; then
    exit 0
fi

# Function to queue a context file for loading
queue_context() {
    local file="$CONTEXT_DIR/$1"
    if [[ -f "$file" ]]; then
        CONTEXTS_TO_LOAD+=("$file")
    fi
}

# Detect skill patterns and queue appropriate context
# Using lowercase comparison for case-insensitivity
PROMPT_LOWER=$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]')

# People-related skills
if [[ "$PROMPT_LOWER" =~ /person|/meeting ]]; then
    queue_context "people.md"
fi

# Project-related skills
if [[ "$PROMPT_LOWER" =~ /project-status|/timeline|/task|/sync-notion ]]; then
    queue_context "projects.md"
fi

# Architecture and decisions
if [[ "$PROMPT_LOWER" =~ /adr|/find-decisions|/incubator ]]; then
    queue_context "architecture.md"
fi

# Technology-related skills
if [[ "$PROMPT_LOWER" =~ /weblink|/youtube ]]; then
    queue_context "technology.md"
fi

# Related/search - load multiple contexts for comprehensive search
if [[ "$PROMPT_LOWER" =~ /related ]]; then
    queue_context "projects.md"
    queue_context "people.md"
    queue_context "technology.md"
fi

# Summarize - may need project context
if [[ "$PROMPT_LOWER" =~ /summarize ]]; then
    queue_context "projects.md"
fi

# Organisation-related queries
# CUSTOMIZE: Add your vendor/partner names here for auto-loading organisations.md
# if [[ "$PROMPT" =~ VendorA|VendorB|PartnerCorp ]]; then
#     queue_context "organisations.md"
# fi

# Acronym detection - common terms in your domain
# CUSTOMIZE: Add your organization's acronyms here for auto-loading acronyms.md
# if [[ "$PROMPT" =~ ERP|CRM|MDM|ETL|API ]]; then
#     queue_context "acronyms.md"
# fi

# If no contexts to load, exit silently
if [[ ${#CONTEXTS_TO_LOAD[@]} -eq 0 ]]; then
    exit 0
fi

# Remove duplicates from the array
UNIQUE_CONTEXTS=($(printf '%s\n' "${CONTEXTS_TO_LOAD[@]}" | sort -u))

# Build the context content
CONTEXT_CONTENT=""
for file in "${UNIQUE_CONTEXTS[@]}"; do
    if [[ -f "$file" ]]; then
        CONTEXT_CONTENT+="
<!-- Auto-loaded context: $(basename "$file") -->
$(cat "$file")
<!-- End: $(basename "$file") -->
"
    fi
done

# If we have context to add, output it as JSON
if [[ -n "$CONTEXT_CONTENT" ]]; then
    # Escape the content for JSON (handle newlines, quotes, backslashes)
    ESCAPED_CONTENT=$(echo "$CONTEXT_CONTENT" | jq -Rs .)

    cat << EOF
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": $ESCAPED_CONTENT
  }
}
EOF
fi

exit 0
