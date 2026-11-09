#!/bin/sh
# Spike probe: a plugin hook leaves a dated line in .spike/<name>.log in the project directory,
# so a thread can prove the hook ran. It never blocks and never fails the tool call.
name="${1:-unnamed}"
dir="${CLAUDE_PROJECT_DIR:-$PWD}/.spike"
mkdir -p "$dir" 2>/dev/null || exit 0
printf '%s %s pid=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$name" "$$" >> "$dir/$name.log" 2>/dev/null
exit 0
