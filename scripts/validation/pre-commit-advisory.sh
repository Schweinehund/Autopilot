#!/usr/bin/env bash
# v1.5 pre-commit advisory: supervision pin drift detector
# Advisory only -- exits 0 always; never blocks commit.
# Phase 48 D-20/D-21: intermediate step between CI-advisory-only (v1.4.1) and CI-hard-block (v1.6+ candidate).

PINNED_FILE_PATTERN="docs/_glossary-android.md|docs/reference/android-capability-matrix.md|docs/admin-setup-android/|docs/_glossary-linux.md|docs/admin-setup-linux/"

# Check if any staged files match the pinned-file glob
STAGED=$(git diff --cached --name-only 2>/dev/null | grep -E "$PINNED_FILE_PATTERN" || true)

if [ -z "$STAGED" ]; then
  exit 0
fi

echo "[pin-drift advisory] Staged files matching pinned-file scope detected:" >&2
echo "$STAGED" >&2
echo "[pin-drift advisory] Running regenerate-supervision-pins.mjs --report..." >&2

if command -v node >/dev/null 2>&1; then
  node scripts/validation/regenerate-supervision-pins.mjs --report 2>&1 | grep -E "(Stale pins|Un-pinned|BASELINE)" >&2 || true
else
  echo "[pin-drift advisory] node not found in PATH; skipping pin report" >&2
fi

echo "[pin-drift advisory] Advisory only -- commit not blocked." >&2
exit 0
