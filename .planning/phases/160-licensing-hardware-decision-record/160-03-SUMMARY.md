---
phase: 160-licensing-hardware-decision-record
plan: 03
subsystem: docs
tags: [licensing, avd-kiosk, licensing-matrix, claude-p-judge, mak, iot-enterprise, apex-gate]

# Dependency graph
requires:
  - phase: 160-02
    provides: the RE-237 STD-05 decision block, the fact-checked ruling sentences this plan's Notes-cell clause and blockquote reuse, and the 160-FACTCHECK.md verdict rows this plan cross-references rather than duplicates
provides:
  - "docs/reference/licensing-matrix.md's Windows Subscription Activation Notes cell carries the 2026-09-10 kiosk-class ruling and a corrected directional phrase"
  - "A new 186-character blockquote (element E9) as its own contiguous run, linking IoT Enterprise's OEM-at-manufacture licensing to the Volume-Licensing-upgrade-only fact"
  - "The matrix's first new Version History row since Phase 155, inserted newest-first by anchor match-and-prepend"
  - "160-EVIDENCE.md's closing matrix section: byte/run measurements against the 160-GATE-BASELINE.json pre-edit anchor, the explicit fact-check reuse statement, the Phase 167 needle-list confirmation, and the post-edit apex reading"
affects: [167]

# Actuals (#2632)
actuals:
  tokens: 8500
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hand-built meaning-preservation packet for a zero-modal cell, judged in a fresh claude -p process, continuing 160-02's process count rather than resetting it (D-32/D-33)"
    - "Explicit fact-check reuse statement naming reused 160-FACTCHECK.md verdict rows by round and entry number, instead of silently inheriting a prior plan's clearance (D-33 scope, D-36, T-160-15)"

key-files:
  modified:
    - docs/reference/licensing-matrix.md
    - .planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md

key-decisions:
  - "Judged the Notes-cell rewrite with a hand-built packet (not the automated judge-packets.py tool) because the cell carries zero modals before and after the edit; the fresh-process claude -p dispatch returned PRESERVED, continuing 160-02's process count to 6 total for the phase rather than resetting it."
  - "No new fact-check round was run for the ruling clause or the new blockquote: both reuse sentences 160-02's fact check already cleared (round 2 entries 3, 8, 10, 14, 15, 19, 21, 22 of 160-FACTCHECK.md), and the reuse is named explicitly by round and entry number in 160-EVIDENCE.md rather than left silent."
  - "The Version-History-heading duplication risk in 160-EVIDENCE.md (introduced while appending the Task 3 matrix section) was caught and fixed before commit: the acceptance criterion requiring exactly one '## Needle list handed to Phase 167 (HARN-04)' heading was verified failing, then corrected by removing the accidental second heading and keeping its trailing prose under the original heading."

patterns-established: []

requirements-completed: [LIC-02]

coverage:
  - id: D1
    description: "The Windows Subscription Activation Notes cell in docs/reference/licensing-matrix.md carries the 2026-09-10 kiosk-class ruling naming both arms, with a corrected directional phrase, judged PRESERVED for meaning by a fresh-process hand-built packet"
    requirement: LIC-02
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-155.mjs -- Result: 10 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-156.mjs -- Result: 10 PASS, 0 FAIL, 0 SKIPPED (administrator == 1 on the matrix)"
        status: pass
      - kind: other
        ref: "grep -c 'Ruled 2026-09-10' and grep -c 'see the following blockquote' docs/reference/licensing-matrix.md -- both 1; superseded phrase 'see the blockquote below' -- 0"
        status: pass
      - kind: other
        ref: "hand-built meaning-preservation packet, fresh claude -p process (process 6), verdict PRESERVED -- recorded in 160-EVIDENCE.md"
        status: pass
    human_judgment: false
  - id: D2
    description: "A new 186-character blockquote (element E9, byte-exact) lands as its own contiguous run between the 'Not pilot-tested' and 'See RE-237' lines, and a newest-first Version History row is inserted by anchor match-and-prepend, with both frontmatter stamps re-stamped"
    requirement: LIC-02
    verification:
      - kind: other
        ref: "python one-liner blockquote-run counter -- 9 -> 10 runs, max 186, 0 over 200"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs -- 237 files checked, 0 violations, assertion 12 at 0"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs -- 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total"
        status: pass
      - kind: other
        ref: "python byte-invariant check -- 6,993 bytes, 0 bare-LF, final byte the pipe character (no trailing newline introduced)"
        status: pass
      - kind: other
        ref: "grep -A5 '^## Version History' -- new 2026-09-15 row first, 2026-09-03 Phase 155 row second, 2026-07-06 row third; frontmatter last_verified 2026-09-15 / review_by 2026-12-14"
        status: pass
    human_judgment: false
  - id: D3
    description: "160-EVIDENCE.md's closing matrix section records every post-edit figure beside its pre-edit 160-GATE-BASELINE.json counterpart, states the sweep3.py/check.py instrument limits as limits, names the explicit fact-check reuse, confirms the Phase 167 needle-list literals, and records a post-edit apex of 117/0 matching plan 01's pre-edit anchor"
    requirement: LIC-02
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-159.mjs -- Result: 117 PASS, 0 FAIL, 0 SKIPPED, measured wall-clock 119s, against plan 01's 116s pre-edit anchor"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs -- Summary: 32 passed, 0 failed, 0 skipped (run after every 160-EVIDENCE.md append)"
        status: pass
      - kind: other
        ref: "grep -c 'Needle list handed to Phase 167 (HARN-04)' 160-EVIDENCE.md -- 1 (duplicate heading introduced mid-edit, caught and removed before commit)"
        status: pass
      - kind: other
        ref: "test ! -e scripts/validation/check-phase-160.mjs -- succeeds"
        status: pass
    human_judgment: false

# Metrics
duration: 30min
completed: 2026-09-15
status: complete
---

# Phase 160 Plan 03: Licensing Matrix Ruling Landing Summary

**The kiosk-class MAK-vs-IoT-Enterprise ruling now reads from `docs/reference/licensing-matrix.md` itself — a corrected Notes cell, a byte-exact 186-character blockquote, and a newest-first Version History row — closing Phase 160 with the apex still at 117/0 against plan 01's pre-edit anchor.**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-09-15 (session start)
- **Completed:** 2026-09-15
- **Tasks:** 3/3 complete
- **Files modified:** 2 (`docs/reference/licensing-matrix.md`, `160-EVIDENCE.md`)

## Accomplishments

- Amended the Windows Subscription Activation row's Notes cell (element E8, byte-exact from
  `160-DRAFTS.md`): the directional phrase now points at "the following blockquote" instead of "the
  blockquote below," and a new sentence records the 2026-09-10 ruling naming MAK-activated Windows
  Enterprise on the current hardware as the standard and OEM-licensed IoT Enterprise hardware as the
  alternative for purpose-built procurement. Judged PRESERVED for meaning by a fresh-process hand-built
  packet (the cell carries zero modals, so the automated `judge-packets.py` tool would emit nothing for
  it).
- Inserted the OEM-versus-Volume-License blockquote (element E9, byte-exact, 186 characters) as its own
  contiguous run between the existing "Not pilot-tested" and "See RE-237" lines — the matrix goes from 9
  to 10 blockquote runs, nothing over 200 — and inserted the matrix's first Version History row since
  Phase 155, newest-first, by matching the existing 2026-09-03 row as the `Edit` anchor and prepending.
  Re-stamped `last_verified`/`review_by` to 2026-09-15/2026-12-14 (the 90-day EEE-SOP ceiling).
- Recorded every post-edit measurement in `160-EVIDENCE.md` beside its `160-GATE-BASELINE.json`
  pre-edit counterpart with commands and sources named, stated the `sweep3.py`/`check.py` instrument
  blind spots as limits rather than proofs, named which `160-FACTCHECK.md` verdict rows (round 2,
  entries 3, 8, 10, 14, 15, 19, 21, 22) the ruling clause and blockquote reuse, confirmed the Phase 167
  needle list's two matrix literals are present, and closed with a post-edit apex of 117 PASS / 0 FAIL
  at 119s wall-clock — matching plan 01's 116s pre-edit anchor exactly.

## Task Commits

Each task was committed atomically:

1. **Task 1: Amend the Windows Subscription Activation Notes cell and judge it for meaning preservation** - `fc7b65f8` (fix)
2. **Task 2: Insert the OEM-versus-Volume-License blockquote and the Version History row, then re-stamp** - `9241ba75` (docs)
3. **Task 3: Record the matrix measurements, the reuse statement, the needle confirmation and the post-edit apex** - `06d2088a` (docs)

**Plan metadata:** committed separately (see `git_commit_metadata` step below)

## Files Created/Modified

- `docs/reference/licensing-matrix.md` — Notes-cell ruling clause, new blockquote, new Version History row, re-stamped frontmatter
- `.planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md` — Task 1 judge-packet record, Task 3 matrix measurements/reuse statement/apex reading, and the needle-list literal confirmation

## Decisions Made

See `key-decisions` in frontmatter. In brief: the Notes-cell rewrite was judged with a hand-built packet
because it has zero modals; no new fact-check round ran because both new pieces of content reuse
160-02-cleared sentences, named explicitly by round/entry number; and a duplicate `## Needle list...`
heading introduced while appending Task 3's evidence was caught by the acceptance-criteria gate and
fixed before commit.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] A duplicate `## Needle list handed to Phase 167 (HARN-04)` heading was introduced while appending Task 3's evidence**
- **Found during:** Task 3, immediately after the `160-EVIDENCE.md` edit that appended the matrix
  measurements section
- **Issue:** The edit's `old_string` matched only the existing needle-list table's final row, and the
  `new_string` re-included the section heading text at its end (to anchor the trailing prose that
  followed the original heading). This produced two occurrences of `## Needle list handed to Phase 167
  (HARN-04)` in the file, violating this plan's own acceptance criterion ("`160-EVIDENCE.md` has exactly
  one `## Needle list handed to Phase 167 (HARN-04)` heading").
- **Fix:** Removed the accidental second heading, leaving its trailing paragraph as continued prose
  under the original (first) heading.
- **Files modified:** `.planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md`
- **Verification:** `grep -c 'Needle list handed to Phase 167 (HARN-04)' 160-EVIDENCE.md` re-run,
  confirmed 1; `node scripts/validation/check-phase-54.mjs` re-run green (32/0/0) after the fix.
- **Committed in:** `06d2088a` (fixed before this commit was made; no separate commit needed since the
  file had not yet been committed with the defect present)

---

**Total deviations:** 1 auto-fixed (1 Rule 1 — a self-introduced editing defect caught by this plan's own
acceptance-criteria gate before commit).
**Impact on plan:** No scope creep; no architectural change; the fix was caught and corrected within the
same task before any commit landed with the defect, so no corpus or evidence artifact ever carried the
duplicate heading.

## Issues Encountered

None beyond the deviation above.

## Authentication Gates

None encountered. The `claude -p` CLI was already authenticated (smoke-tested with a `PONG` reply)
before the Task 1 judge dispatch.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

Phase 160 is complete: LIC-01 (160-02) and LIC-02 (this plan) both land their content, and the phase's
closing apex reading (117 PASS / 0 FAIL / 0 SKIPPED at 119s) matches plan 01's pre-edit anchor exactly,
confirming the phase's three plans introduced zero structural drift. `scripts/validation/check-phase-160.mjs`
does not exist, as designed — Phase 167 (HARN-04) owns it and consumes the needle list this phase handed
off in `160-EVIDENCE.md`. No blockers for `/gsd-plan-phase 161` or the v1.23 milestone's next phase.

---
*Phase: 160-licensing-hardware-decision-record*
*Completed: 2026-09-15*

## Self-Check: PASSED

- `docs/reference/licensing-matrix.md` -- FOUND on disk; byte invariants confirmed (6,993 bytes, 0
  bare-LF, final byte the pipe character).
- `.planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md` -- FOUND on disk; exactly one
  `## Needle list handed to Phase 167 (HARN-04)` heading confirmed via `grep -c`.
- Commits `fc7b65f8`, `9241ba75`, `06d2088a` -- all FOUND in `git log --oneline --all`.
- All task-level `<acceptance_criteria>` re-verified above under Task Commits / coverage block -- all
  PASS.
- Plan-level `<verification>` re-run: `c17-eee-contract` 0 violations (assertion 12 at 0, 10 runs/186
  max); `check-nav-hub-links` 0/0/0; `check-phase-155`/`check-phase-156` 10/0 each; `check-phase-54`
  32/0/0; byte invariants confirmed; `check.py` 19 candidates (report-only); `sweep3.py` 0 TOTAL edits
  over `docs/reference`; apex `check-phase-159` 117/0 at 119s matching plan 01's 116s anchor.
- Prohibitions re-verified: no shell append/heredoc/redirect used (all edits via `Edit` tool); 0 bare-LF
  throughout; Feature-to-License Mapping table row count unchanged (11 rows including header/rule, same
  as pre-phase HEAD `f45ac9e2`); no pilot marker introduced; four pre-existing kiosk blockquote lines and
  both "What breaks if missing" lines present verbatim; every commit subject matches
  `^fix\(160-03\)|^docs\(160-03\)`; `scripts/validation/check-phase-160.mjs` does not exist.
