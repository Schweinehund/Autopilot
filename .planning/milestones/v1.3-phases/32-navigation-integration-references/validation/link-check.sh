#!/usr/bin/env bash
# link-check.sh — validates markdown [text](path.md) and [text](path.md#anchor) links
#
# Usage: ./link-check.sh [target]
#   target: single .md file OR directory (default: docs)
#
# Behavior:
#   - For each .md file under target (excluding _templates/**):
#     - Extract links of form [text](path.md) or [text](path.md#anchor)
#     - Resolve target path relative to containing file's directory
#     - If target file missing: emit "BROKEN: <file>:<line> -> <target> (file not found)"
#     - If anchor present: slugify H1/H2/H3 headings in target file (GitHub-style),
#       verify anchor exists. If missing: emit "BROKEN: ... (anchor not found)"
#
# Exit code:
#   0 — all links resolve
#   1 — one or more broken links (details emitted to stdout)
#
# Portability: POSIX bash, no realpath flags, no grep -P. Works on Git Bash (Windows).
# Performance: caches extracted anchors per file to avoid re-parsing targets.

set -euo pipefail

TARGET="${1:-docs}"
EXIT_CODE=0

# Cache of slugified anchors per file. Key = filepath, value = newline-separated slugs.
declare -A ANCHOR_CACHE

# Normalize path (strip leading ./, collapse ../ segments, strip trailing /)
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

# Extract H1/H2/H3 slugs from a file, one per line. Uses sed+awk for speed.
# GitHub-style slug: lowercase, strip punctuation (keep a-z 0-9 space hyphen),
# spaces -> hyphen, collapse runs of hyphens, trim leading/trailing hyphens.
extract_anchors_fast() {
  local file="$1"
  # Single awk invocation:
  #   1. Match lines starting with # (1-3 hashes) followed by space
  #   2. Strip leading # chars + whitespace
  #   3. Lowercase
  #   4. Remove chars other than a-z 0-9 space hyphen
  #   5. Replace spaces with hyphens
  #   6. Collapse multi-hyphen, trim leading/trailing
  awk '
    /^#{1,3} / {
      sub(/^#+[[:space:]]+/, "")
      s = tolower($0)
      gsub(/[^a-z0-9 -]/, "", s)
      gsub(/ /, "-", s)
      gsub(/-+/, "-", s)
      sub(/^-/, "", s)
      sub(/-$/, "", s)
      print s
    }
  ' "$file" 2>/dev/null
}

# Get anchors for a file with caching.
get_anchors() {
  local file="$1"
  if [ -z "${ANCHOR_CACHE[$file]:-}" ]; then
    ANCHOR_CACHE[$file]=$(extract_anchors_fast "$file")
  fi
  printf '%s' "${ANCHOR_CACHE[$file]}"
}

# Check all links in a single .md file.
check_file_links() {
  local md_file="$1"
  local md_dir
  md_dir=$(dirname "$md_file")

  # Extract (line_num, link_match) pairs via grep -nE -o.
  # Process each link with pure bash string operations (no subprocess per link).
  while IFS= read -r raw_line; do
    [ -z "$raw_line" ] && continue
    local line_num="${raw_line%%:*}"
    local match="${raw_line#*:}"

    # Extract the (path[#anchor]) part: everything between ( and ).
    local inner="${match#*\(}"
    inner="${inner%\)*}"

    local target_file="${inner%%#*}"
    local anchor=""
    if [ "$inner" != "$target_file" ]; then
      anchor="${inner#*#}"
    fi

    # Skip external / empty
    case "$target_file" in
      http://*|https://*|mailto:*|'') continue ;;
    esac

    # Resolve relative to md_dir
    local target_path
    if [ "${target_file#/}" != "$target_file" ]; then
      target_path="${target_file#/}"
    else
      target_path="$md_dir/$target_file"
    fi
    local rel_path
    rel_path=$(normalize_path "$target_path")

    if [ ! -f "$rel_path" ]; then
      echo "BROKEN: $md_file:$line_num -> $rel_path (file not found)"
      EXIT_CODE=1
      continue
    fi

    if [ -n "$anchor" ]; then
      local anchors
      anchors=$(get_anchors "$rel_path")
      # Use bash substring match for speed; fall back to grep if odd chars.
      if ! printf '%s\n' "$anchors" | grep -qxF "$anchor"; then
        echo "BROKEN: $md_file:$line_num -> $rel_path#$anchor (anchor not found)"
        EXIT_CODE=1
      fi
    fi
  done < <(grep -nE -o '\[[^]]+\]\([^)]+\.md(#[^)]+)?\)' "$md_file" 2>/dev/null || true)
}

# Iterate over target (file or directory).
if [ -f "$TARGET" ]; then
  check_file_links "$TARGET"
elif [ -d "$TARGET" ]; then
  while IFS= read -r -d '' md_file; do
    check_file_links "$md_file"
  done < <(find "$TARGET" -type f -name '*.md' -not -path '*/_templates/*' -print0)
else
  echo "ERROR: target not found: $TARGET" >&2
  exit 2
fi

exit $EXIT_CODE
