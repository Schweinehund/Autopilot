#!/usr/bin/env bash
# reachability-audit.sh — BFS traversal from docs/index.md, reports file depth
#
# Usage: ./reachability-audit.sh
#
# Environment:
#   ROOT       — starting .md file (default: docs/index.md)
#   MAX_DEPTH  — maximum BFS depth to traverse (default: 2)
#
# Behavior:
#   - BFS from ROOT following [text](path.md) and [text](path.md#anchor) links.
#   - Records each visited file with its shortest-discovered depth + path.
#   - Only traverses into files with depth < MAX_DEPTH (files AT depth=MAX_DEPTH
#     are recorded but their outbound links are not followed).
#   - Excludes _templates/** and any .planning/ paths.
#
# Output format:
#   <file> | <depth> | <path-taken>
#   ...sorted by depth ascending (stable within same depth).
#
# Exit code:
#   0 — always (this script reports; the orchestrator diffs output vs fixture).
#
# Portability: POSIX bash 4+ (associative arrays required). Works on Git Bash (Windows).

set -euo pipefail

ROOT="${ROOT:-docs/index.md}"
MAX_DEPTH="${MAX_DEPTH:-2}"

declare -A VISITED
QUEUE=("$ROOT|0|START")

# Normalize path (strip ./, collapse ../, strip trailing /)
normalize_path() {
  local path="$1"
  local parts=()
  local IFS='/'
  # shellcheck disable=SC2206
  local segments=($path)
  local seg
  for seg in "${segments[@]}"; do
    if [ -z "$seg" ] || [ "$seg" = "." ]; then
      continue
    elif [ "$seg" = ".." ]; then
      if [ ${#parts[@]} -gt 0 ]; then
        unset 'parts[${#parts[@]}-1]'
        parts=("${parts[@]}")
      fi
    else
      parts+=("$seg")
    fi
  done
  local result=""
  for seg in "${parts[@]}"; do
    if [ -z "$result" ]; then
      result="$seg"
    else
      result="$result/$seg"
    fi
  done
  printf '%s' "$result"
}

# Determine if a resolved path should be skipped (excluded paths).
is_excluded() {
  local path="$1"
  case "$path" in
    *"/_templates/"*|".planning/"*|*"/.planning/"*) return 0 ;;
    *) return 1 ;;
  esac
}

# Extract outbound .md links from a file; emits normalized target paths (one per line).
extract_targets() {
  local md_file="$1"
  local md_dir
  md_dir=$(dirname "$md_file")
  grep -oE '\[[^]]+\]\([^)]+\.md(#[^)]+)?\)' "$md_file" 2>/dev/null | while IFS= read -r match; do
    local inner="${match#*\(}"
    inner="${inner%\)*}"
    local target_file="${inner%%#*}"
    # Skip external links
    case "$target_file" in
      http://*|https://*|mailto:*) continue ;;
    esac
    [ -z "$target_file" ] && continue
    # Resolve relative to md_dir
    local target_path
    if [ "${target_file#/}" != "$target_file" ]; then
      target_path="${target_file#/}"
    else
      target_path="$md_dir/$target_file"
    fi
    # Only emit paths for targets that actually exist — garbage link text
    # (e.g., markdown links with literal parentheses in the URL) should not
    # pollute the reachability graph. Link validity is link-check.sh's concern.
    local normalized
    normalized=$(normalize_path "$target_path")
    if [ -f "$normalized" ]; then
      printf '%s\n' "$normalized"
    fi
  done
}

# BFS loop
while [ ${#QUEUE[@]} -gt 0 ]; do
  entry="${QUEUE[0]}"
  QUEUE=("${QUEUE[@]:1}")

  file="${entry%%|*}"
  rest="${entry#*|}"
  depth="${rest%%|*}"
  path="${rest#*|}"

  # Skip if already visited (BFS guarantees shortest depth on first visit)
  if [ -n "${VISITED[$file]:-}" ]; then
    continue
  fi

  VISITED[$file]="$depth|$path"

  # If depth >= MAX_DEPTH, record but don't traverse
  if [ "$depth" -ge "$MAX_DEPTH" ]; then
    continue
  fi

  # If file doesn't exist, we can't traverse. Record and skip.
  if [ ! -f "$file" ]; then
    continue
  fi

  # Extract + enqueue outbound targets
  while IFS= read -r target; do
    [ -z "$target" ] && continue
    if is_excluded "$target"; then
      continue
    fi
    if [ -z "${VISITED[$target]:-}" ]; then
      new_depth=$((depth + 1))
      if [ "$path" = "START" ]; then
        new_path="$file -> $target"
      else
        new_path="$path -> $target"
      fi
      QUEUE+=("$target|$new_depth|$new_path")
    fi
  done < <(extract_targets "$file")
done

# Emit results sorted by depth ascending, then by file path.
for file in "${!VISITED[@]}"; do
  depth="${VISITED[$file]%%|*}"
  path="${VISITED[$file]#*|}"
  printf '%s | %s | %s\n' "$file" "$depth" "$path"
done | sort -t'|' -k2,2n -k1,1

exit 0
