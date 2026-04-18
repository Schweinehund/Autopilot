#!/usr/bin/env bash
# anchor-collision.sh — detects duplicate heading texts within a single .md file
#
# Usage: ./anchor-collision.sh [target] [--strict]
#   target: single .md file OR directory (default: docs)
#   --strict: also fail on H3 duplicates (default: H2-only is fail; H3 is warning)
#
# Rationale:
#   GitHub-style auto-generated anchors append -1, -2, etc. to duplicate heading slugs.
#   Cross-file anchor links become fragile if headings are later reordered.
#
#   Phase 32 Pitfall 1 (RESEARCH.md): common-issues.md has existing macOS H2/H3 sections
#   ("Device Not Appearing in Intune", "Configuration Profile Not Applied",
#   "Compliance Failure or Access Blocked"). iOS MUST prefix its parallel sections
#   with "iOS: " so that cross-file anchor links remain unambiguous.
#
#   H2 duplicates within a file are treated as collisions (strict failure) because
#   they almost always represent unintended structural ambiguity at the top navigation
#   level. H3 duplicates are reported as warnings (non-failing) because they are often
#   a legitimate pattern — parallel H2 sections each having their own Steps/Prerequisites/
#   Symptom H3 subsections is a well-established runbook structure. Use --strict to
#   elevate H3 duplicates to failures (useful for new-file scans before ship).
#
# Exit code:
#   0 — no H2 duplicates (H3 warnings allowed in default mode)
#   1 — at least one H2 collision (or any duplicate in --strict mode)
#
# Portability: POSIX bash; no external tools beyond grep/sed/sort/uniq/find.

set -euo pipefail

TARGET="${1:-docs}"
STRICT="${2:-}"
EXIT_CODE=0

check_file() {
  local md_file="$1"
  # H2 duplicates (failing in both modes)
  local h2_dupes h3_dupes
  h2_dupes=$(grep -E '^## ' "$md_file" 2>/dev/null | sed -E 's/^#+[[:space:]]+//' | sort | uniq -d || true)
  h3_dupes=$(grep -E '^### ' "$md_file" 2>/dev/null | sed -E 's/^#+[[:space:]]+//' | sort | uniq -d || true)

  if [ -n "$h2_dupes" ]; then
    echo "COLLISION in $md_file:"
    printf '%s\n' "$h2_dupes" | sed 's/^/  [H2] /'
    EXIT_CODE=1
  fi

  if [ -n "$h3_dupes" ]; then
    if [ "$STRICT" = "--strict" ]; then
      # In strict mode, H3 duplicates also fail. Emit COLLISION header if not already emitted.
      if [ -z "$h2_dupes" ]; then
        echo "COLLISION in $md_file:"
      fi
      printf '%s\n' "$h3_dupes" | sed 's/^/  [H3] /'
      EXIT_CODE=1
    else
      # Warning only — emit to stderr so stdout remains diff-friendly.
      echo "WARN: H3 duplicate(s) in $md_file:" >&2
      printf '%s\n' "$h3_dupes" | sed 's/^/  [H3] /' >&2
    fi
  fi
}

if [ -f "$TARGET" ]; then
  check_file "$TARGET"
elif [ -d "$TARGET" ]; then
  while IFS= read -r -d '' md_file; do
    check_file "$md_file"
  done < <(find "$TARGET" -type f -name '*.md' -not -path '*/_templates/*' -print0)
else
  echo "ERROR: target not found: $TARGET" >&2
  exit 2
fi

exit $EXIT_CODE
