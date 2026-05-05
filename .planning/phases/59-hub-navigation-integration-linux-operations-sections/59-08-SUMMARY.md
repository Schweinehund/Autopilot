---
phase: 59
plan: 59-08
subsystem: validation
tags: [validator, phase-59, clean-08, linux-hub, operations-hub, glossary-reciprocity]
dependency_graph:
  requires: [59-02, 59-03, 59-04, 59-05, 59-06, 59-07]
  provides: [VALIDATOR_GREEN-59, check-phase-59.mjs]
  affects: [59-09]
tech_stack:
  added: []
  patterns: [file-reads-only validator, regex-based assertion, gfmSlug cmark-gfm corrected, sliceH3Region novel helper, RECIPROCITY_PAIRS bidirectional check]
key_files:
  created:
    - scripts/validation/check-phase-59.mjs
  modified: []
decisions:
  - "gfmSlug fix: GitHub cmark-gfm replaces each space 1:1 with hyphen (not \\s+), so space-flanked stripped chars (e.g. ' / ') produce double hyphens; corrected from Phase 57/58 algorithm which collapsed consecutive hyphens"
  - "40 RECIPROCITY_PAIRS hardcoded from 59-05-COLLISION-MATRIX.md per D-30 pin discipline"
  - "TBD/TODO scan split across 4 assertions (V-59-33..36) grouping 2 files each to match 36-assertion target count"
metrics:
  duration: "~15 minutes"
  completed: "2026-05-05"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 1
---

# Phase 59 Plan 08: check-phase-59.mjs Validator-as-Deliverable Summary

**One-liner:** Node.js ESM validator with 36 V-59-NN structural assertions covering Phase 59's 4 gray areas (Linux hub nav, Operations hub nav, CLEAN-08 glossary reciprocity, Linux quick-ref L1/L2), implementing novel `sliceH3Region` + 40-pair bidirectional see-also reciprocity checks and a corrected GitHub cmark-gfm slug algorithm.

## Tasks Completed

| Task | Description | Commit | Status |
|------|-------------|--------|--------|
| Task 1 | Author `scripts/validation/check-phase-59.mjs` with 36 V-59-NN assertions | 5593aae | DONE |
| Task 2 | Self-test: `node scripts/validation/check-phase-59.mjs --verbose` exits 0, 36/36 PASS | 5593aae | DONE |

## Validator Self-Test Result

```
Summary: 36 passed, 0 failed, 0 skipped
```

Exit code: 0. All 36 V-59-NN assertions PASS.

## Assertion Coverage

| Cluster | Assertions | Type |
|---------|-----------|------|
| File existence | V-59-01..06 (6) | POSITIVE |
| Linux H2 in docs/index.md | V-59-07..09 (3) | POSITIVE + NEGATIVE |
| Operations H2 + ops/00-index.md | V-59-10..19 (10) | POSITIVE + NEGATIVE |
| Glossary CLEAN-08 reciprocity | V-59-20..24 (5) | POSITIVE + NEGATIVE |
| quick-ref-l1.md Linux H2 | V-59-25..27 (3) | POSITIVE + NEGATIVE |
| quick-ref-l2.md Linux H2 | V-59-28..31 (4) | POSITIVE + NEGATIVE |
| Regression guards + TBD scan | V-59-32..36 (5) | NEGATIVE |
| **Total** | **36** | |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] gfmSlug double-hyphen preservation fix**
- **Found during:** Task 2 self-test (V-59-21 failed on first run)
- **Issue:** `gfmSlug()` used `\s+` → `-` which collapses two consecutive spaces to a single hyphen. GitHub's actual cmark-gfm algorithm replaces each space character 1:1, so `COBO / COPE / WPCO` → after stripping `/` → `cobo  cope  wpco` (double spaces) → `cobo--cope--wpco` (double hyphens). The Phase 57/58 validators used the same `\s+` pattern but didn't have any headings with slash-flanked-by-spaces to expose the bug.
- **Fix:** Changed `replace(/\s+/g, '-')` to `replace(/ /g, '-')` and removed the `replace(/-{2,}/g, '-')` collapse step. All 30 collision-matrix heading slugs verified correct after fix.
- **Files modified:** `scripts/validation/check-phase-59.mjs`
- **Commit:** 5593aae (included in same commit)

## Novel Patterns Introduced

- **`sliceH3Region(content, h3Literal)`** — slices from H3 literal to next `###` or `##` boundary or EOF; used for per-term glossary region extraction in V-59-20..24 (RESEARCH Pattern 8)
- **`RECIPROCITY_PAIRS` array** — 40 hardcoded bidirectional pairs from 59-05-COLLISION-MATRIX.md; V-59-20 checks A1 (see-also line present), V-59-21 checks A2 (target anchor slug exists), V-59-22 checks bidirectionality (each source region contains `basename(tgt) + anchor`), V-59-24 checks A3 (see-also line preceded by `>` line)
- **Corrected `gfmSlug`** — space-flanked stripped chars produce double hyphens per GitHub cmark-gfm; this correction is a forward-applicable fix for all future validators with slashed H3 headings

## Known Stubs

None.

## Threat Flags

None — validator is a read-only static analysis script; no network access, no user input, no attack surface.

## Self-Check

```bash
[ -f "scripts/validation/check-phase-59.mjs" ] && echo "FOUND" || echo "MISSING"
# FOUND

git log --oneline --all | grep -q "5593aae" && echo "FOUND: 5593aae" || echo "MISSING"
# FOUND: 5593aae
```

## Self-Check: PASSED

- `scripts/validation/check-phase-59.mjs` exists at expected path
- Commit `5593aae` exists in git log
- `node scripts/validation/check-phase-59.mjs --verbose` exits 0 with 36/36 V-59-NN PASS
