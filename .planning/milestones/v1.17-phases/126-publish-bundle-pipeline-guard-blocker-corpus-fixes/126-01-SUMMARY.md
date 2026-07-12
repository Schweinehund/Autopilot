---
phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes
plan: 01
subsystem: docs-pipeline
tags: [pandoc, docx, frontmatter, powershell, guard-docx, HYG-02, HYG-03]

# Dependency graph
requires:
  - phase: 125
    provides: v1.16 pipeline surface (convert.ps1 PIPE-03 nav-footer fix, guard-docx.mjs CUSTOM-PROPS check, DEFER-121-07-A date backfill in commit 9031056)
provides:
  - 5 Approved docs (RE-179, RE-095, RE-096, RE-144, RE-188) with the stale phase_46_wave2_retrofit frontmatter key removed — closes DEFER-125-06-A
  - convert.ps1 leak-free of orphaned 0-byte .tmp files per conversion call
  - Confirmed-clean HYG-03 verification (9 DEFER-121-07-A files carry no literal YYYY-MM-DD; 4 legit-content carve-outs untouched)
affects: [126-02, publish-bundle-pipeline, guard-docx]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Reformat-only frontmatter deletion: single-line removal, last_verified/review_by untouched, verified via git diff --numstat (0 insertions, 1 deletion) per file"
    - "GetTempFileName() side-effect cleanup: capture the raw .tmp handle, derive the working path from it, Remove-Item the raw handle immediately before use"

key-files:
  created: []
  modified:
    - docs/_glossary-android.md
    - docs/admin-setup-android/03-fully-managed-cobo.md
    - docs/admin-setup-android/04-byod-work-profile.md
    - docs/reference/android-capability-matrix.md
    - docs/android-lifecycle/03-android-version-matrix.md
    - scripts/pipeline/convert.ps1

key-decisions:
  - "HYG-02 scope expanded from the requirement text's single named file to all 5 files carrying the identical defect (RESEARCH Pitfall 1) — all 5 must be fixed or PUB-02's fail-closed batch gate never produces a zip"
  - "HYG-03 executed as verify-only per D-08/D-09: no corpus-wide YYYY-MM-DD gate was added (would have corrupted 4 legit-content files); scoped strictly to the 9 named DEFER-121-07-A files, confirmed a pure no-op (already fixed in commit 9031056)"

patterns-established:
  - "Single-hunk reformat-only edits are verified with git diff --numstat asserting exactly 0/1 (insertions/deletions) per file before committing"

requirements-completed: [HYG-02, HYG-03]

# Metrics
duration: 4min
completed: 2026-07-10
---

# Phase 126 Plan 01: Guard-Blocker Corpus Fixes Summary

**Removed the stale `phase_46_wave2_retrofit` frontmatter key from 5 Approved docs, fixed a `.tmp`-file leak in `convert.ps1`'s `GetTempFileName()` call, and verified the 9 DEFER-121-07-A files carry no literal `YYYY-MM-DD` placeholder — clearing both known pre-existing guard blockers ahead of Plan 02's fail-closed batch run.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-07-10T21:38:13Z
- **Completed:** 2026-07-10T21:42:08Z
- **Tasks:** 3 completed
- **Files modified:** 6 (5 content frontmatter edits + 1 pipeline script)

## Accomplishments
- HYG-02: deleted the byte-identical `phase_46_wave2_retrofit: 2026-04-25` line-11 frontmatter key from all 5 Approved docs that carried it (`_glossary-android.md`/RE-179, `03-fully-managed-cobo.md`/RE-095, `04-byod-work-profile.md`/RE-096, `android-capability-matrix.md`/RE-144, `03-android-version-matrix.md`/RE-188), closing `DEFER-125-06-A`
- convert.ps1: fixed the `GetTempFileName()` orphaned-`.tmp`-per-call leak with a minimal capture-and-immediately-remove pattern, leaving the PIPE-03 nav-footer preprocessing and fail-closed diff guard byte-unchanged below line 86
- HYG-03: verified all 9 DEFER-121-07-A files (2 glossaries + 7 lifecycle files) carry zero literal `YYYY-MM-DD` occurrences (pure no-op, already fixed in commit `9031056`); confirmed the 4 legit-content carve-out files (`l2-runbooks/01`, `l2-runbooks/06`, `admin-setup-android/03`, `admin-setup-android/08`) still contain their legitimate `YYYY-MM-DD` format-string occurrences, proving no corpus-wide gate was applied
- Live end-to-end proof: converted `docs/_glossary-android.md` to `.docx` post-fix and ran `guard-docx.mjs` — all 3 checks (YAML-LEAK, HEADING-STYLE, CUSTOM-PROPS) PASS, confirming the HYG-02 fix actually clears the guard blocker it targets

## Task Commits

Each task was committed atomically:

1. **Task 1: HYG-02 — remove stale phase_46_wave2_retrofit key from 5 Approved docs** - `7dda1f7` (fix)
2. **Task 2: convert.ps1 .tmp-leak fix** - `269f8f7` (fix)
3. **Task 3: HYG-03 — verify 9 DEFER-121-07-A files** - no commit (verify-only, zero files modified, pure no-op as expected)

**Plan metadata:** (pending — final docs commit)

## Files Created/Modified
- `docs/_glossary-android.md` - removed stale `phase_46_wave2_retrofit` key (line 11)
- `docs/admin-setup-android/03-fully-managed-cobo.md` - removed stale `phase_46_wave2_retrofit` key (line 11)
- `docs/admin-setup-android/04-byod-work-profile.md` - removed stale `phase_46_wave2_retrofit` key (line 11)
- `docs/reference/android-capability-matrix.md` - removed stale `phase_46_wave2_retrofit` key (line 11)
- `docs/android-lifecycle/03-android-version-matrix.md` - removed stale `phase_46_wave2_retrofit` key (line 11)
- `scripts/pipeline/convert.ps1` - captures and immediately removes the raw `GetTempFileName()` handle before deriving `$tempMd`, eliminating the orphaned `.tmp` leak

## Decisions Made
- HYG-02 scope was expanded per the plan's explicit instruction beyond the requirement text's single named file to all 5 files sharing the identical defect — verified via corpus-wide `grep -rn "phase_46_wave2_retrofit" docs/` returning zero matches after the fix
- HYG-03 remained strictly verify-only per D-08/D-09 — no backfill was needed (all 9 files already clean) and no corpus-wide date gate was introduced

## Deviations from Plan

None - plan executed exactly as written. All three tasks matched their documented action/acceptance-criteria/verify blocks precisely, and all automated verify commands from the plan passed on the first attempt.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- The corpus is now guard-clean-ready for Plan 02's full-batch fail-closed run: both known pre-existing guard blockers (stale frontmatter key, convert.ps1 temp leak) are resolved
- `last_verified` was confirmed unchanged in all 5 touched content files (each diff was exactly 1 deletion, 0 insertions) — no freshness-clock reset per D-10
- Live conversion + guard test on one of the 5 fixed docs confirms CUSTOM-PROPS now passes, validating the fix actually unblocks the batch gate Plan 02 depends on

---
*Phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes*
*Completed: 2026-07-10*

## Self-Check: PASSED

- FOUND: .planning/phases/126-publish-bundle-pipeline-guard-blocker-corpus-fixes/126-01-SUMMARY.md
- FOUND: docs/_glossary-android.md
- FOUND: scripts/pipeline/convert.ps1
- FOUND: commit 7dda1f7
- FOUND: commit 269f8f7
