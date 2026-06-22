---
phase: 82-harness-lineage-bump-terminal-re-audit-milestone-close
plan: 82-01
subsystem: validation-tooling
tags: [harness-lineage, path-a, sso-crosslink, frozen-at-close, milestone-close, atom-1]
requires:
  - "scripts/validation/v1.8-milestone-audit.mjs (Path-A source, 15/15 green at HEAD)"
  - "scripts/validation/v1.8-audit-allowlist.json (Path-A source)"
  - "scripts/validation/_lib/frozen-at-close.mjs (V18 registry target)"
  - "scripts/validation/regenerate-supervision-pins.mjs (BASELINE_13 target)"
provides:
  - "scripts/validation/v1.9-milestone-audit.mjs (7th milestone-audit; 15/15, self-test 9/9)"
  - "scripts/validation/v1.9-audit-allowlist.json (v1.9 sidecar; c13 carried forward, 15 entries)"
  - "_lib/frozen-at-close.mjs readAtV18Close + MILESTONE_CLOSE_SHAS.V18='2bd79d8'"
  - "regenerate-supervision-pins.mjs BASELINE_13 audit-trail comment (anchor 3007960)"
  - ".planning/.../82-CONVENTIONS.md (phase-wide locked constants for 82-02/03/04)"
affects:
  - "Plan 82-02 (reads 82-CONVENTIONS for CHAIN constants, 8 SSO-E needles, coexistence count)"
  - "Plan 82-03 (reads 10-validator cross-OS set + ordering gate)"
  - "Plan 82-04 (reads pre-Phase-82 anchor 3007960 + close-gate constants)"
tech-stack:
  added: []
  patterns:
    - "Path-A verbatim-copy-with-relabel (4 load-bearing lines only)"
    - "Single frozen-close SHA entry per single-commit milestone (D-04)"
    - "Comment-only BASELINE refresh anchored to known-PAST SHA"
key-files:
  created:
    - "scripts/validation/v1.9-milestone-audit.mjs"
    - "scripts/validation/v1.9-audit-allowlist.json"
    - ".planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-CONVENTIONS.md"
  modified:
    - "scripts/validation/_lib/frozen-at-close.mjs"
    - "scripts/validation/regenerate-supervision-pins.mjs"
decisions:
  - "D-01 honored: NO C17 — checks array stays 15 (ids 1-7,9-16); 8 SSO-E edges routed to check-phase-81 (Plan 82-02), not the harness"
  - "DIVERGENCE-1 honored: lines 5/90 NOT bumped (never bumped in any prior hop); only lines 2/4/35/79 changed"
  - "DIVERGENCE-3 honored: c13 'reset' = label/timestamp refresh + carry-forward; c13_rotting_external verbatim (ci_1=4, ci_2=10); c13_broken_link_allowlist stays 15"
  - "D-04 honored: single V18 entry (2bd79d8), NO V18_CLOSEGATE (v1.8 closed in one commit)"
  - "DIVERGENCE-4 honored: BASELINE_13 anchored to REAL past SHA 3007960, not the {atom_1_sha} placeholder precedent"
  - "ROADMAP SC#1 honored: Atom 1 landed as ONE indivisible commit (4 files); 82-CONVENTIONS is a separate earlier commit"
metrics:
  duration: "~5min"
  completed: "2026-06-22"
  tasks: 3
  files: 5
  commits: 2
---

# Phase 82 Plan 82-01: Conventions + Atom 1 (v1.9 Harness-Core Path-A) Summary

Authored the phase-wide `82-CONVENTIONS.md` constants doc (Wave 1, own commit) and shipped Atom 1
(SSOHARN-01) as one indivisible commit: the v1.9 milestone-audit harness Path-A copy (4-line relabel,
15/15 PASS, self-test 9/9, C1-C16 verbatim, NO C17) + its sidecar allowlist (c13 carried forward,
15 broken-link entries) + the single V18=`2bd79d8` frozen-close entry with `readAtV18Close` + the
BASELINE_13 freshness comment anchored to real past SHA `3007960`.

## What Was Built

**Wave 1 — `82-CONVENTIONS.md` (commit `8c53b3c`):** 276-line freshness/SHA matrix mirroring
`74-CONVENTIONS.md`. Locks: the 10-validator cross-OS set (+ named exclusions), V18=`2bd79d8` single
entry, BASELINE_13 anchor `3007960`, the 8 SSO-E needles (E1-E8 verbatim from §Q3), the 4-line
milestone-audit edit set with the explicit do-NOT-bump-5/90 note, the pre-Phase-82 anchor `3007960`,
and the D-02 5-commit/4-plan layout + HARD ordering gate. Omits the Phase-74 §2/§7 VPP-01 sections
(no v1.9 corpus rename). Committed ALONE.

**Wave 2 — Atom 1 (commit `e760176`, 4 files, indivisible):**
- `v1.9-milestone-audit.mjs` — verbatim Path-A copy of v1.8; exactly 4 lines changed (2, 4, 35, 79);
  979→979 line count; self-test block byte-identical → 9/9. Lines 5/90 left unbumped (DIVERGENCE-1).
- `v1.9-audit-allowlist.json` — `generated`→`2026-06-22T00:00:00Z`, `phase`→long-slug,
  `next_review`→`2026-10-01` (cosmetic). `c13_rotting_external` carried forward verbatim;
  `c13_broken_link_allowlist`=15; `c16_missing_endpoint_exemptions`=[].
- `_lib/frozen-at-close.mjs` — single `V18: '2bd79d8'` entry after `V17_CLOSEGATE` + convenience
  export `readAtV18Close`. No `V18_CLOSEGATE` (D-04). `readAtV18Close('…/v1.8-milestone-audit.mjs')`
  returns non-null (48399 chars via `git show 2bd79d8:…`).
- `regenerate-supervision-pins.mjs` — BASELINE_13 audit-trail comment appended after BASELINE_12;
  comment-only; `const BASELINE_9` array byte-unchanged.

## Verification Results

| Check | Result |
|-------|--------|
| Wave-0 green-corpus pre-flight (`v1.8-milestone-audit.mjs --verbose` at HEAD) | 15 passed, 0 failed, 0 skipped (exit 0) |
| `v1.9-milestone-audit.mjs --verbose` | 15 passed, 0 failed, 0 skipped (exit 0) |
| `v1.9-milestone-audit.mjs --self-test` | 9 passed, 0 failed |
| `git diff --no-index v1.8 vs v1.9 milestone-audit` | exactly 4 changed lines (2, 4, 35, 79); 979→979 |
| sidecar: phase, c13 count 15, c16 empty, c13_rotting_external carried | OK |
| frozen-at-close import: `readAtV18Close` function, `V18==='2bd79d8'`, no `V18_CLOSEGATE`, non-null read | V18 OK |
| BASELINE_13 present; BASELINE_9 array byte-unchanged | 3 BASELINE_13 mentions; array diff empty |
| `git show --stat HEAD` | exactly 4 Atom-1 files, no others; no deletions |

## Deviations from Plan

None — plan executed exactly as written. All 6 RESEARCH divergences were pre-resolved in the task
actions and applied as specified (DIVERGENCE-1: lines 5/90 left unbumped; DIVERGENCE-3: c13
carry-forward not wipe; DIVERGENCE-4: real SHA `3007960` for BASELINE_13). No auto-fixes (Rules 1-3)
were needed; no architectural decisions (Rule 4); no authentication gates.

## Known Stubs

None. All four Atom-1 files are functional: the harness runs green, the sidecar is loaded by the
harness, `readAtV18Close` performs a real `git show`, and the BASELINE_13 comment is an audit-trail
record (intentionally comment-only per the established BASELINE pattern).

## Notes for Downstream Plans

- Plan 82-02 (Atom 2) must read `82-CONVENTIONS.md` §6 (10-validator set), §7 (8 SSO-E needles for
  `check-phase-81.mjs` V-81-CROSSLINK), §8 (CHAIN constants [48..81], drop V-74-VPP-01a/b), §9
  (6th-coexistence YAML, no separate negative-control job).
- The V18 pin now exists BEFORE any validator is authored (AP-5 prevention satisfied structurally).
- Plan 82-03 ordering gate: Atom 2 must be pushed to `origin/master` before Axis-2 dispatch.

## Self-Check: PASSED

- FOUND: `scripts/validation/v1.9-milestone-audit.mjs`
- FOUND: `scripts/validation/v1.9-audit-allowlist.json`
- FOUND: `.planning/phases/82-…/82-CONVENTIONS.md`
- FOUND: `.planning/phases/82-…/82-01-SUMMARY.md`
- FOUND commit `8c53b3c` (Wave-1 conventions)
- FOUND commit `e760176` (Atom 1, 4 files)
