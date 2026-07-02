---
phase: 112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl
plan: 02
subsystem: testing
tags: [audit-harness, milestone-close, path-a-lineage, freshness-threshold, sidecar-repoint, node]

# Dependency graph
requires:
  - phase: 112-01
    provides: "D-00 NESTED-guard on check-phase-95/100 + pre-Phase-112 anchor 0a7699f; pre-Atom-1 HEAD 1a0ee15"
provides:
  - "v1.14-milestone-audit.mjs — 12th Path-A milestone-audit harness (lineage v1.4→v1.14; C1-C16 verbatim; C5/C10 freshness threshold 90d per D-01a)"
  - "v1.14-audit-allowlist.json — v1.14 sidecar (Path-A from v1.13; glossary-android + android-capability-matrix line-pins repointed +1 per D-04)"
  - "BASELINE_18 freshness audit-trail comment in regenerate-supervision-pins.mjs (anchored to pre-Atom-1 HEAD 1a0ee15; BASELINE_9 array byte-unchanged)"
  - "HARN-01 Atom 1 landed as ONE indivisible 3-file commit (SC#1)"
affects: [112-03-atom2-validators-apex-ci, 112-05-close-gate-byte-unchanged]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Path-A born-stale avoidance: a naive sidecar copy false-fails C2/C7/C9 on live corpus — the +1 repoint of Phase-101/109-shifted pins is mandatory (D-04)"
    - "D-01a threshold-loosen: v1.14 is the first milestone to RELAX a corpus invariant (60d→90d freshness); the NEW harness must bump its own C5/C10 or it fails its own corpus"

key-files:
  created:
    - scripts/validation/v1.14-milestone-audit.mjs
    - scripts/validation/v1.14-audit-allowlist.json
    - .planning/phases/112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl/112-02-SUMMARY.md
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs

key-decisions:
  - "C5/C10 freshness threshold bumped 60d→90d in the NEW v1.14 harness (D-01a MANDATORY) — inheriting verbatim would fail v1.14's own 90d corpus on C5/C10"
  - "Sidecar repoint applied programmatically as +1 to every line-bearing entry whose file is docs/_glossary-android.md OR docs/reference/android-capability-matrix.md (24 entries: 17 glossary + 7 capability-matrix); count-based ci_3 entries untouched"
  - "BASELINE_18 anchored to the pre-Atom-1 HEAD 1a0ee15 (KNOWN-PAST anchor, resolves the chicken-and-egg), NOT a future close SHA — mirrors BASELINE_17→ea24467"
  - "V113 pin deliberately NOT added here — it rides Atom 2 (Plan 112-03), mirroring the Phase-100 V112-rides-Atom-2 divergence; _lib/frozen-at-close.mjs untouched"

requirements-completed: [HARN-01]

# Metrics
duration: ~10min
completed: 2026-07-02
---

# Phase 112 Plan 02: HARN-01 Atom 1 — v1.14 Harness-Core Path-A + C5/C10 90d Summary

**The 12th Path-A milestone-audit (lineage v1.4→v1.14) shipped as ONE indivisible 3-file commit: a Path-A copy of v1.13-milestone-audit.mjs with the two MANDATORY C5/C10 freshness bumps (60d→90d, D-01a), a repointed v1.14 sidecar (+1 on all glossary-android + capability-matrix line-pins, D-04), and a BASELINE_18 audit-trail comment anchored to the pre-Atom-1 HEAD. The new harness runs GREEN on its own live 90-day corpus (self-test 9/9, default 15/0/0).**

## Performance

- **Duration:** ~10 min
- **Completed:** 2026-07-02
- **Tasks:** 2
- **Files touched:** 3 (2 created + 1 modified)

## Atom-1 Anchors (downstream consumers)

- **Atom-1 COMMIT SHA:** `8fb74a5` (`feat(112-02): v1.14 harness-core Path-A + C5/C10 90d — HARN-01 (atomic SC#1 Atom 1)`)
- **Pre-Atom-1 anchor SHA (BASELINE_18):** `1a0ee15` (the HEAD immediately before Atom 1 — the "Atom 1 constants lock" anchor)
- **Pre-Phase-112 byte-unchanged base:** `0a7699f` (from 112-01; frozen-surface diff base)

## Accomplishments

- **File 1 — `v1.14-milestone-audit.mjs`:** Path-A copy of `v1.13-milestone-audit.mjs`. Relabeled v1.13→v1.14 in the header/lineage comment, sidecar-reference comment, Usage line, and the FUNCTIONAL `readFile('scripts/validation/v1.14-audit-allowlist.json')` line (the CI path-match needle). Applied the two MANDATORY D-01a threshold bumps: C5 (`if (diffDays > 90)`) and C10 (`if (diffDays > 90)`), with violation-reason strings `(>90)` and the C5/C10 block cadence comments updated to reference the v1.14 90-day cadence (discuss-flag #7 / 101-CONTEXT 90-day lock). Both `1970-01-01` template sentinels preserved unchanged. Checks array stays C1-C16 (no new check); self-test block stays 9/9.
- **File 2 — `v1.14-audit-allowlist.json`:** Path-A copy of `v1.13-audit-allowlist.json` with header fields updated (`generated`→2026-07-02, `phase`→112 slug matching v1.13's slug field-type, `schema_version` carried verbatim "1.1") and the D-04 pin repoints applied programmatically: +1 to every line-bearing entry for `docs/_glossary-android.md` (17 entries) and `docs/reference/android-capability-matrix.md` (7 entries). index.md/quick-ref-l1.md/common-issues.md carry ZERO pins → no repoint; count-based ci_3 entries untouched.
- **File 3 — `regenerate-supervision-pins.mjs`:** 7-line BASELINE_18 audit-trail comment inserted after the BASELINE_17 block (line 466) and before `const BASELINE_9 = [`, closing the BASELINE_17 v1.13 carry-over. Anchored to the real pre-Atom-1 HEAD `1a0ee15` (no literal placeholder). The BASELINE_9 line-coord array is byte-unchanged (comment-additions only).
- **Atom 1 committed as exactly 3 files in ONE commit.** V113 deliberately absent (rides Atom 2); predecessor frozen surfaces untouched.

## Task Commits

1. **Task 1 + Task 2: v1.14 harness-core Path-A + C5/C10 90d + BASELINE_18** — `8fb74a5` (feat)
   - The plan splits authoring (Task 1) from the BASELINE_18 insert + atomic commit (Task 2), yielding one indivisible 3-file commit per the plan's Atom-1 contract.

## Files Created/Modified

- `scripts/validation/v1.14-milestone-audit.mjs` (created) — 12th Path-A harness; C1-C16 verbatim except C5/C10 90d.
- `scripts/validation/v1.14-audit-allowlist.json` (created) — v1.14 sidecar with +1 line-pin repoints.
- `scripts/validation/regenerate-supervision-pins.mjs` (modified) — BASELINE_18 comment (+7 lines); BASELINE_9 unchanged.

## Verification Results

| Check | Result |
|-------|--------|
| `node v1.14-milestone-audit.mjs --self-test` | 9 passed, 0 failed (exit 0) |
| `node v1.14-milestone-audit.mjs` (default) | **15 passed, 0 failed, 0 skipped** (exit 0) — C2/C7/C9 line-pins + C5/C10 freshness all PASS on live 90d corpus |
| `grep -c "diffDays > 90"` (harness) | 2 (C5 + C10) |
| `grep -c "diffDays > 60"` (harness) | 0 |
| `grep -c "1970-01-01"` (harness) | 2 (both sentinels preserved) |
| `grep -v '^//' \| grep -c "v1.14-audit-allowlist.json"` | 1 (functional readFile present) |
| `grep -c "v1.13-audit-allowlist"` (harness) | 0 (no stale sidecar reference) |
| JSON validity + repointed pins (187, 202, 204, 55, 99 present) | valid; 24 entries repointed |
| `grep -c "BASELINE_18"` (regenerate) | 3 (block present) |
| `grep -c "ATOM_1_SHA"` (regenerate) | 0 (real anchor, no placeholder) |
| Atom-1 commit file count | 3 (`atom1files=3`) |
| Frozen-surface touched in commit | 0 (`frozentouched=0`) |
| Byte-unchanged v1.4-v1.13 mjs/sidecar/workflow + frozen-at-close since 0a7699f | EMPTY diff (invariant holds) |

## Decisions Made

- **D-01a honored (non-optional):** C5 and C10 freshness thresholds bumped to 90d in the NEW harness. Editing the new file is free (in-scope) because it is a NEW file, not a frozen predecessor. Without the bump the current-milestone AUDIT-HARNESS (check-phase-112) would be RED against its own corpus.
- **D-04 honored:** repoint applied to the two Phase-101/109-shifted files only; the shift is uniform +1 (Phase 101 banner at glossary line 14 above all pins; Phase 109 Network-Auth row before capability-matrix line 54, all pins ≥54). Programmatic +1 over every line-bearing entry for the two files (24 entries) guarantees no born-stale pin.
- **BASELINE_18 anchor = pre-Atom-1 HEAD `1a0ee15`:** the KNOWN-PAST anchor resolves the chicken-and-egg (cannot anchor to the not-yet-created Atom-1 SHA), mirroring how BASELINE_17 anchored to the pre-Atom-1 HEAD `ea24467`.
- **V113 deliberately not added:** `_lib/frozen-at-close.mjs` is untouched here; the V113='ba24f1a' pin rides Atom 2 (Plan 112-03), mirroring the Phase-100 V112-rides-Atom-2 divergence.

## Deviations from Plan

None to the plan's implementation — plan executed exactly as written. Two mechanical notes:
- The sidecar D-04 repoint was applied programmatically (a single node pass incrementing `line` for every entry whose `file` is one of the two shifted docs) rather than as ~24 hand-edits. Result is identical to the per-pin table in 112-RESEARCH §"TARGET 4" / 112-PATTERNS (verified: 187, 202, 18/51/71/81/83/84/183/197/200, 123/125/125/127/199, 204 for glossary; 55, 89/91/92/94/98/99 for capability-matrix).
- Beyond the two MANDATORY `diffDays > 90` code changes, the descriptive 60d→90d cadence comments (top-of-file C5/C10 summaries, the C5/C10 block header comments, and the C10 check display-name label) were updated for honesty so no stale "60d" cadence claim remains in the v1.14 harness.

## Issues Encountered

- **Pre-existing (not a regression):** `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 1. Confirmed the committed HEAD version (before my comment) ALSO exits 1 — this is the BASELINE_9-vs-evolved-live-corpus classifier drift (Phase 101 +1 shift), the exact condition the BASELINE_18 audit-trail comment records. My change is comment-only; the BASELINE_9 array is byte-unchanged. Out of scope per the scope boundary and not part of Task 2's acceptance criteria; no fix applied.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Atom 1 (SC#1) is complete and GREEN on its own corpus. Atom 2 (Plan 112-03) can now author check-phase-101..112.mjs (apex HARNESS repointed to v1.14-milestone-audit.mjs), append the V113 pin to `_lib/frozen-at-close.mjs`, and add the 11th CI workflow.
- No push in this plan — the push happens in Plan 112-03 (per sequential-execution directive).

## Self-Check: PASSED

- FOUND: scripts/validation/v1.14-milestone-audit.mjs
- FOUND: scripts/validation/v1.14-audit-allowlist.json
- FOUND: scripts/validation/regenerate-supervision-pins.mjs (BASELINE_18 present)
- FOUND commit: 8fb74a5

---
*Phase: 112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl*
*Completed: 2026-07-02*
