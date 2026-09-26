#!/usr/bin/env bash
# Stop hook: block the end of a turn while work is not recorded in docs/PROGRESS.md.
set -u

input=$(cat)
# Already blocked once this turn: let it stop instead of looping.
if printf '%s' "$input" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
  exit 0
fi

cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

log=docs/PROGRESS.md

# PROGRESS.md is being edited right now: fine.
if git status --porcelain -- "$log" | grep -q .; then
  exit 0
fi

others=$(git status --porcelain | grep -v " $log\$" || true)
last=$(git log -1 --format=%H -- "$log" 2>/dev/null || true)
if [ -n "$last" ]; then
  since=$(git rev-list --count "$last..HEAD")
else
  since=$(git rev-list --count HEAD 2>/dev/null || echo 0)
fi

if [ -n "$others" ] || [ "$since" -gt 0 ]; then
  echo "Work is not recorded: update docs/PROGRESS.md (state, phases, gaps, next steps, session log) before finishing." >&2
  exit 2
fi
exit 0
