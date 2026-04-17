---
phase: 31-ios-l2-investigation
plan: 01
subsystem: validation
tags: [validation-harness, ios, l2, phase-31, wave-0, fixtures, template-edit]

requires:
  - phase: 30-ios-l1-triage-runbooks
    provides: Phase 30 validation harness scaffold (scripts/validation/check-phase-30.mjs) inherited verbatim for structure + CRLF-normalization pattern + summary-line format
provides:
  - Phase 31 static validation harness (scripts/validation/check-phase-31.mjs) implementing V-31-01..V-31-30
  - D-22 placeholder inventory fixture (13-entry JSON snapshot) for Wave 5 retrofit contract
  - D-23 expected-prose fixture (expected-d23.txt) for Wave 5 diff check against compliance policy line 182
  - D-27 L2 template platform enum extension (iOS added)
  - Emoji-policy decision locked (text markers [CONFIG]/[TIMING]/[DEFECT]) for Wave 2 Plan 04 executor
  - Canonical harness path decision locked (scripts/validation/check-phase-31.mjs, overriding CONTEXT.md D-26)
affects: [plan-02, plan-03, plan-04, plan-05, plan-06, plan-07, waves-1-5]

tech-stack:
  added: []
  patterns:
    - "Wave 0 ground-truth pattern: fixture files + harness created before content so all subsequent waves commit against a runnable check-phase-NN.mjs"
    - "Fixture _note field for locking cross-plan decisions (emoji policy, canonical path)"
    - "Hardcoded detail-string correction: detail must reflect actual pass/fail state (not success-path prose when pass=false)"

key-files:
  created:
    - ".planning/phases/31-ios-l2-investigation/placeholder-inventory.json - 13 D-22 line anchors + locked decisions in _note"
    - ".planning/phases/31-ios-l2-investigation/expected-d23.txt - single-line verbatim D-23 rewrite prose"
    - "scripts/validation/check-phase-31.mjs - 30-check validation harness implementing V-31-01..V-31-30"
  modified:
    - "docs/_templates/l2-template.md - platform enum + comment updated to include iOS"
    - ".planning/phases/31-ios-l2-investigation/31-VALIDATION.md - 3 harness-path references updated to canonical location; wave_0_complete flipped true"

key-decisions:
  - "Runbook 16 uses TEXT markers [CONFIG] / [TIMING] / [DEFECT] (NOT emoji) — emoji audit returned 0 matches across docs/l1-runbooks and docs/l2-runbooks"
  - "Canonical harness path is scripts/validation/check-phase-31.mjs (Phase 30 precedent) — overrides CONTEXT.md D-26 which claimed .planning/phases/.../check-phase-31.mjs"
  - "L2 template platform enum line 19 changed from 'Windows | macOS | all' to 'Windows | macOS | iOS | all'"
  - "L2 template comment line 11 updated for consistency with enum change (per PATTERNS.md line 89 recommendation)"
  - "V-31-18 and V-31-20 detail strings corrected to emit accurate failure reasons when pass=false (Rule 1 - minor UX bug auto-fixed)"

patterns-established:
  - "Wave 0 ground-truth pattern: fixtures + harness precede all content-writing waves; every wave 1-5 commit runs check-phase-31.mjs --quick"
  - "_note field on fixture JSON for locking cross-plan decisions — later wave executors read the fixture and honor the decision without re-deciding"
  - "Conditional detail strings in harness checks: `detail: ok ? 'success msg' : 'failure msg'` instead of hardcoded detail unrelated to pass state"

requirements-completed: [L2TS-01, L2TS-02]

duration: 20min
completed: 2026-04-17
---

# Phase 31 Plan 01: iOS L2 Investigation — Wave 0 Harness & Fixtures Summary

**Wave 0 harness, fixtures, and L2 template enum extension delivered — every Wave 1-5 commit can now run `node scripts/validation/check-phase-31.mjs --quick` against a 30-check harness that returns a stable summary line in under 200ms, with V-31-25 (template enum) already green and V-31-01..V-31-29 red with file-missing / retrofit-pending detail as expected.**

## Performance

- **Duration:** 20 min
- **Started:** 2026-04-17T20:22Z (estimated from worktree base checkout)
- **Completed:** 2026-04-17T20:42:50Z
- **Tasks:** 2/2 complete
- **Files created:** 3 (placeholder-inventory.json, expected-d23.txt, check-phase-31.mjs)
- **Files modified:** 2 (l2-template.md, 31-VALIDATION.md)

## Accomplishments

- **Runnable Wave 0 gate delivered.** `node scripts/validation/check-phase-31.mjs --quick` completes in 0.18s and emits a stable summary line `Summary: 1 passed, 28 failed, 0 skipped`. Every Wave 1-5 commit can attach the harness output without additional setup.
- **V-31-25 (L2 template enum) turns green on this plan.** Other 28 checks fail with precise file-missing / retrofit-pending detail, giving downstream waves a running green-count target instead of a binary pass/fail.
- **D-22 placeholder inventory captured.** All 13 line anchors (6 L1 runbooks + 5 triage-tree lines + 1 lifecycle line + 1 compliance-policy prose rewrite) are snapshotted in placeholder-inventory.json with primary + secondary targets per D-22 mapping. Wave 5 executor re-verifies line numbers via pre-flight drift check before editing.
- **D-23 expected-prose fixture locked.** expected-d23.txt contains the verbatim single-line rewrite for compliance-policy line 182. V-31-23 consumes this fixture for the prose-diff check so Wave 5 has a mechanical equality check (not a judgment call).
- **Emoji-policy decision locked in fixture _note.** Runbook 16 MUST use text markers `[CONFIG]` / `[TIMING]` / `[DEFECT]` — emoji audit (`grep -rE "(⚙️|⏱️|🐛)" docs/l1-runbooks/ docs/l2-runbooks/`) returned 0 matches. Plan 04 executor reads _note before writing runbook 16.
- **Canonical harness path decision locked.** scripts/validation/check-phase-31.mjs (Phase 30 precedent) overrides the CONTEXT.md D-26 claim that the harness lives in .planning/phases/.../check-phase-31.mjs. 31-VALIDATION.md updated in 3 places to reference the canonical path.

## Task Commits

Each task was committed atomically:

1. **Task 1: Snapshot D-22 placeholder inventory + write expected-d23.txt fixture + emoji audit** — `b926825` (test)
2. **Task 2: Write check-phase-31.mjs validation harness + update L2 template enum** — `c2cab15` (feat)

The first commit uses `test(31-01)` because the fixtures it creates are the test-data inputs that Task 2's GREEN harness implementation reads (TDD RED-style gate for a documentation/fixture plan). Task 2 is `feat(31-01)` because it adds the executable harness + the L2 template edit.

## Files Created/Modified

### Created
- `.planning/phases/31-ios-l2-investigation/placeholder-inventory.json` — 13-entry JSON snapshot of D-22 line anchors (file, line, primary target, secondary targets, commit group, type). `_note` field locks emoji policy + canonical harness path decisions so Wave 2-5 executors do not re-decide.
- `.planning/phases/31-ios-l2-investigation/expected-d23.txt` — single line of verbatim D-23 rewrite prose (388 chars + newline). V-31-23 compares line 182 of 06-compliance-policy.md against this for exact equality.
- `scripts/validation/check-phase-31.mjs` — Node ESM module, shebang `#!/usr/bin/env node`, 30 checks implementing V-31-01..V-31-30 from 31-VALIDATION.md. Inherits the Phase 30 scaffold pattern (argv parsing, CRLF-normalized file read, check-object shape, padLabel summary output). Skips type:"external" checks under `--quick` flag.

### Modified
- `docs/_templates/l2-template.md` — line 11 comment ("Set platform to Windows, macOS, or all" → "Set platform to Windows, macOS, iOS, or all") and line 19 enum ("Windows | macOS | all" → "Windows | macOS | iOS | all") per D-27. Matches Phase 30 D-24 edit pattern on the L1 template.
- `.planning/phases/31-ios-l2-investigation/31-VALIDATION.md` — 3 occurrences of the old harness path (.planning/phases/31-ios-l2-investigation/check-phase-31.mjs) on lines 22, 23, and 80 replaced with the canonical scripts/validation/check-phase-31.mjs. Frontmatter `wave_0_complete` flipped from false to true.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] V-31-18 and V-31-20 harness detail strings were non-conditional**
- **Found during:** Task 2 first harness run
- **Issue:** Original plan-specified code wrote `return { pass: /.../.test(c), detail: "iOS L2 section present" };` — the detail string "iOS L2 section present" was hardcoded regardless of the pass boolean, so on FAIL the harness printed "FAIL -> iOS L2 section present" (self-contradictory). Same bug in V-31-20 ("ADDTS-01 referenced").
- **Fix:** Changed to conditional: `const ok = /.../.test(c); return { pass: ok, detail: ok ? 'iOS L2 section present' : '## iOS L2 Runbooks heading not found' };`
- **Files modified:** scripts/validation/check-phase-31.mjs (V-31-18 and V-31-20 check bodies)
- **Commit:** c2cab15 (same commit as harness creation; the fix was applied before the commit)

No deviations of type Rule 2 / Rule 3 / Rule 4 occurred.

## Verification

Overall plan verification (from PLAN.md `<verification>` block):

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| `node scripts/validation/check-phase-31.mjs --quick` runs and exits with summary line | exit code 1, `Summary: N passed, M failed, K skipped` | exit 1, `Summary: 1 passed, 28 failed, 0 skipped` | PASS |
| V-31-25 (template enum) passes | PASS line | `V-31-25: L2 template platform enum includes iOS ......... PASS` | PASS |
| 13 placeholder entries in placeholder-inventory.json | 13 | 13 | PASS |
| _note contains emoji + canonical harness path decisions | `[CONFIG]` + `scripts/validation/check-phase-31.mjs` | both present | PASS |
| expected-d23.txt single line of D-23 rewrite | 1 line | 1 line, 388+1 chars | PASS |
| 31-VALIDATION.md references canonical harness path | ≥3 | 3 | PASS |
| 31-VALIDATION.md contains no old path references | 0 | 0 | PASS |
| Harness --quick runtime under 5s | <5000ms | 180ms | PASS |

## Known Stubs

None. Wave 0 deliverables are fixtures + validation harness — no UI rendering, no hardcoded empty data flowing to user-visible surfaces. The harness intentionally returns `{ pass: false, detail: "X does not exist yet (Wave 1)" }` for checks whose target files have not yet been created, but this is the expected Wave 0 state documented in PLAN.md Test A (`exits with a non-zero code because runbooks 14-17 don't exist yet`). Waves 1-5 will flip these FAILs to PASS as runbooks land.

## Self-Check: PASSED

Verified by post-write file + commit existence audit:

- `[ -f ".planning/phases/31-ios-l2-investigation/placeholder-inventory.json" ]` → FOUND
- `[ -f ".planning/phases/31-ios-l2-investigation/expected-d23.txt" ]` → FOUND
- `[ -f "scripts/validation/check-phase-31.mjs" ]` → FOUND
- `git log --oneline --all | grep -q "b926825"` → FOUND (test(31-01) commit)
- `git log --oneline --all | grep -q "c2cab15"` → FOUND (feat(31-01) commit)
- `grep -q "wave_0_complete: true" .planning/phases/31-ios-l2-investigation/31-VALIDATION.md` → FOUND
- `grep -q "^platform: Windows | macOS | iOS | all$" docs/_templates/l2-template.md` (with CRLF-normalized read) → FOUND
