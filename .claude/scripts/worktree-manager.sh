#!/bin/zsh
# Git worktree manager for parallel agent work
# Usage: worktree-manager.sh <command> [slug]
# Commands: create, list, merge, cleanup
# Called via: /worktree skill or directly

set -e

VAULT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
VAULT_NAME="$(basename "$VAULT_ROOT")"
WORKTREE_PARENT="$(dirname "$VAULT_ROOT")/${VAULT_NAME}-worktrees"
GIT="${GIT:-$(command -v git || echo "/usr/bin/git")}"
COMMAND="${1:-}"
SLUG="${2:-}"

# Validate slug format: lowercase alphanumeric + hyphens
validate_slug() {
    if [[ -z "$SLUG" ]]; then
        echo "ERROR: slug required (e.g. meeting-notes-batch)"
        exit 1
    fi
    if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]] && [[ ! "$SLUG" =~ ^[a-z0-9]$ ]]; then
        echo "ERROR: slug must be lowercase alphanumeric with hyphens (e.g. meeting-notes-batch)"
        exit 1
    fi
}

worktree_path() {
    echo "${WORKTREE_PARENT}/${SLUG}"
}

branch_name() {
    echo "worktree/${SLUG}"
}

cmd_create() {
    validate_slug
    local wt_path
    wt_path="$(worktree_path)"
    local branch
    branch="$(branch_name)"

    # Idempotent: skip if already exists
    if [[ -d "$wt_path" ]]; then
        echo "Worktree already exists: $wt_path"
        echo "Branch: $branch"
        exit 0
    fi

    # Create parent directory
    mkdir -p "$WORKTREE_PARENT"

    # Create branch and worktree from current main HEAD
    cd "$VAULT_ROOT"
    $GIT worktree add -b "$branch" "$wt_path" HEAD

    # Copy Claude config (agents need this), excluding runtime data
    rsync -a --exclude='browser-data' "${VAULT_ROOT}/.claude/" "${wt_path}/.claude/"
    [[ -f "${VAULT_ROOT}/.mcp.json" ]] && cp "${VAULT_ROOT}/.mcp.json" "${wt_path}/.mcp.json"

    echo ""
    echo "Worktree created:"
    echo "  Path:   $wt_path"
    echo "  Branch: $branch"
    echo ""
    echo "To use in a subagent, set working directory to:"
    echo "  $wt_path"
}

cmd_list() {
    cd "$VAULT_ROOT"
    echo "Active worktrees:"
    echo ""
    $GIT worktree list
    echo ""

    # Show worktree branches specifically
    local branches
    branches=$($GIT branch --list 'worktree/*' 2>/dev/null || true)
    if [[ -n "$branches" ]]; then
        echo "Worktree branches:"
        echo "$branches"
    else
        echo "No worktree branches found."
    fi
}

cmd_merge() {
    validate_slug
    local wt_path
    wt_path="$(worktree_path)"
    local branch
    branch="$(branch_name)"

    cd "$VAULT_ROOT"

    # Ensure we're on main
    local current
    current=$($GIT branch --show-current)
    if [[ "$current" != "main" ]]; then
        echo "Switching to main..."
        $GIT checkout main
    fi

    # Merge with --no-ff for clean history
    echo "Merging $branch into main..."
    $GIT merge --no-ff "$branch" -m "Merge $branch into main"

    # Clean up
    echo "Cleaning up worktree and branch..."
    $GIT worktree remove "$wt_path" 2>/dev/null || rm -rf "$wt_path"
    $GIT worktree prune
    $GIT branch -d "$branch"

    echo ""
    echo "Merged and cleaned up: $SLUG"
}

cmd_cleanup() {
    validate_slug
    local wt_path
    wt_path="$(worktree_path)"
    local branch
    branch="$(branch_name)"

    cd "$VAULT_ROOT"

    # Remove worktree
    if [[ -d "$wt_path" ]]; then
        $GIT worktree remove "$wt_path" --force 2>/dev/null || rm -rf "$wt_path"
        echo "Removed worktree: $wt_path"
    else
        echo "Worktree not found: $wt_path (already removed?)"
    fi

    $GIT worktree prune

    # Delete branch
    if $GIT show-ref --verify --quiet "refs/heads/$branch" 2>/dev/null; then
        $GIT branch -D "$branch"
        echo "Deleted branch: $branch"
    else
        echo "Branch not found: $branch (already deleted?)"
    fi

    echo ""
    echo "Cleaned up: $SLUG"
}

# Dispatch command
case "$COMMAND" in
    create)  cmd_create ;;
    list)    cmd_list ;;
    merge)   cmd_merge ;;
    cleanup) cmd_cleanup ;;
    *)
        echo "Usage: worktree-manager.sh <command> [slug]"
        echo ""
        echo "Commands:"
        echo "  create <slug>   Create a new worktree with branch worktree/<slug>"
        echo "  list            List all active worktrees"
        echo "  merge <slug>    Merge worktree branch into main and clean up"
        echo "  cleanup <slug>  Remove worktree without merging"
        exit 1
        ;;
esac
