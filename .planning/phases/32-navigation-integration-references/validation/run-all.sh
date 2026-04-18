#!/usr/bin/env bash
# run-all.sh — orchestrates all Phase 32 validation scripts
#
# Usage: ./run-all.sh
#
# Runs sequentially:
#   1. link-check.sh   — markdown link + anchor validity on Phase 32 touched files
#                        (Phase 32 is additive; pre-existing broken links in Phase
#                        20-31 content are out of scope and reported by
#                        ./link-check.sh docs/ which is run informationally only.)
#   2. anchor-collision.sh docs/   — duplicate H2 heading detector (baseline: exit 0)
#   3. reachability-audit.sh       — BFS depth from docs/index.md, diffed vs fixture
#
# Exit code:
#   0 — all three checks pass (set -e halts on first failure)
#   non-zero — first failing script's exit code propagates
#
# Phase 32 touched files (extended by later plans in this phase):
#   - docs/decision-trees/00-initial-triage.md   (Plan 32-00 Task 2)
#   - docs/l1-runbooks/00-index.md               (Plan 32-00 Task 3)
#   - docs/decision-trees/07-ios-triage.md       (Plan 32-03 placeholder retrofit)
#   - docs/_glossary-macos.md                    (Plan 32-01 glossary additions)
#   - docs/reference/ios-capability-matrix.md    (Plan 32-02 new file)
#   - docs/reference/00-index.md                 (Plan 32-02 iOS References H2)
#   - docs/common-issues.md                      (Plan 32-04 iOS Failure Scenarios)
#   - docs/index.md                              (Plan 32-05 iOS Provisioning H2)
#   - docs/quick-ref-l1.md                       (Plan 32-06 iOS Quick Reference)
#   - docs/quick-ref-l2.md                       (Plan 32-07 iOS Quick Reference)

set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "$0")" && pwd)"

# Phase 32 touched files that MUST pass link-check (strict).
# As plans 32-01..32-07 ship, their files are added to this list.
PHASE32_FILES=(
  "docs/decision-trees/00-initial-triage.md"
  "docs/l1-runbooks/00-index.md"
)

echo "=== link-check (Phase 32 touched files — strict) ==="
LINK_EXIT=0
for f in "${PHASE32_FILES[@]}"; do
  if [ -f "$f" ]; then
    if ! "$HARNESS_DIR/link-check.sh" "$f"; then
      LINK_EXIT=1
    fi
  fi
done

echo "=== anchor-collision (docs/ — strict) ==="
"$HARNESS_DIR/anchor-collision.sh" "docs"

echo "=== reachability-audit (docs/index.md BFS vs fixture) ==="
# Diff current audit output against fixture. Strip '#'-prefixed comment lines
# from fixture before diffing (comments are human-readable metadata).
"$HARNESS_DIR/reachability-audit.sh" | diff - <(grep -vE '^#' "$HARNESS_DIR/expected-reachability.txt")

if [ "$LINK_EXIT" -ne 0 ]; then
  echo "=== link-check FAILED on Phase 32 touched files ==="
  exit 1
fi

echo "=== all checks passed ==="
