#!/bin/bash
# Desktop notification hook for Claude Code
# Usage: notify.sh "message"

MESSAGE="${1:-Claude Code notification}"

osascript -e "display notification \"$MESSAGE\" with title \"Claude Code\""
