---
phase: 140-frozen-aware-harness-conversion
plan: 02
subsystem: infra
tags: [gsd-planning, ci-validation, git, frozen-reads, batched-io, tracer]

# Dependency graph
requires:
  - phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
    provides: v1.20-CARVE.md allowlist + carve-gate.mjs + GOV-02 ledger schema + lsTreeAtClose() enumeration API
  - phase: 140-frozen-aware-harness-conversion
    provides: "Plan 01's D-30 amendment-first scope narrowing (v1.4-v1.18) and GOV-02 pre-edit regression baseline"
provides:
  - "readManyAtClose(tag, relPaths) and createFrozenCorpusReader(tag, opts) — batched git cat-file --batch reader with Buffer-offset parsing, the shared library layer all 15 remaining harness conversions (Plans 03/04) will reuse unchanged"
  - "V14 = 0b3be9ab pinned in MILESTONE_CLOSE_SHAS with full rationale, plus readAtV14Close convenience export"
  - "--self-test assertion 3 retargeted from V14 to VUNPINNED, preserving Phase 139's 6/6 PASS evidence by substitution"
  - "v1.4-milestone-audit.mjs fully converted (all four read chokepoints) and reporting 5 passed, 0 failed, 0 skipped — the phase's proof-of-architecture tracer"
  - "v1.4's TEMPLATE-SENTINEL C5 assertion resolved via the v1.4.1 sentinel-parse backport (SWEEP-07)"
affects: [140-03-conversion-v1.4.1-v1.5-v1.6-v1.10, 140-04-conversion-v1.11-v1.18, 140-05-sweep06-measurement-and-close]

# Actuals (#2632)
actuals:
  tokens: 8333
  tasks: 4
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Batched frozen-corpus reader (readManyAtClose + createFrozenCorpusReader): one lsTreeAtClose enumeration + one cat-file --batch fetch, memoized in a closure, per harness process"
    - "Buffer-offset (never string-offset) parsing of git cat-file --batch output — the frame's byte size field desynchronizes from JS string .length on multibyte content"
    - "Per-harness four-chokepoint conversion recipe: readFile/walkMd/existsSync-guard/parseAllowlist all route through the same FROZEN reader instance"
    - "Sidecar fail-loud-on-absence, degrade-on-malformed: two different failure modes intentionally kept distinct"

key-files:
  created: []
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs
    - scripts/validation/v1.4-milestone-audit.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "Task 1's V14 pin confirmation was owner-resolved before this plan's execution began (orchestrator-provided ruling): proceed with 0b3be9ab, single entry, V14_ARCHIVE explicitly deferred per D-21. Not re-presented, not re-litigated."
  - "V14 rationale comment supersedes (does not silently delete) the prior RETRO-01 omission note — both rejected candidate SHAs (b5cf529, 671f72a) are recorded as tested-and-rejected, not erased from the decision history"
  - "Self-test assertion 3 probe tag is VUNPINNED — deliberately outside the project's V+digits naming convention so it can never collide with a future real milestone tag (V119, V120, ...)"
  - "SWEEP-07's remedy landed as the minimal 3-line form (2 relaxed regexes + 1 sentinel-skip continue), not the full v1.4.1 underscore-directory scope-filter port — verified via a diff-size gate (4 changed lines, within the plan's 5-line tolerance)"
  - "Marked SWEEP-07 and SWEEP-08 complete in REQUIREMENTS.md (both are single-clause, fully satisfied by this plan's work). Left SWEEP-05 Pending — it spans all of v1.4-v1.18 (16 harnesses) and only 1 is converted so far; marking it complete now would repeat the exact premature-Validated drift Plan 01's D-14c amendment exists to prevent."
  - "Recorded a measured correction to RESEARCH.md D-18's stated coverage claim: v1.4's frozen scope at the V14 pin is 26 files vs 33 live files (not '33=33 identical'). The 7-file gap is entirely docs/admin-setup-android/{07..13}-*.md OEM-specific docs created after the Phase-43 pin point. This does not affect the pin's correctness (D-19's rationale is sidecar-alignment, not corpus completeness) but is a real, previously-uncaptured coverage narrowing this conversion introduces for v1.4 — recorded in the GOV-02 ledger rather than silently left uncorrected."

requirements-completed: [SWEEP-07, SWEEP-08]

coverage:
  - id: D1
    description: "readManyAtClose/createFrozenCorpusReader added to _lib/frozen-at-close.mjs, following the module's existing pin-gate/argv-array/cause-prepended-and-rethrown error contract; byte-identical to readAtClose on a multibyte-dense file"
    verification:
      - kind: other
        ref: "node --input-type=module -e batch-vs-single byte-equality probe on docs/_glossary-android.md -> 'byte-identical, 29438 chars', exit 0; empty-input probe -> Map size 0, exit 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "V14 = 0b3be9ab pinned in MILESTONE_CLOSE_SHAS with rationale recording rejected candidates, absent MILESTONE-CLOSE discriminator, and audit-close scope bar; readAtV14Close export added"
    verification:
      - kind: other
        ref: "grep -c \"V14: '0b3be9ab'\" _lib/frozen-at-close.mjs -> 1; grep -c 'readAtV14Close' -> 1"
        status: pass
    human_judgment: false
  - id: D3
    description: "--self-test assertion 3 retargeted to VUNPINNED; self-test remains 6/6 PASS, exit 0 after the V14 pin lands"
    verification:
      - kind: other
        ref: "node _lib/frozen-at-close.mjs --self-test -> 6/6 PASS, exit 0, run four times across this plan's tasks; grep -c 'VUNPINNED' self-test output -> 1"
        status: pass
    human_judgment: false
  - id: D4
    description: "v1.4-milestone-audit.mjs fully converted (readFile/walkMd/existsSync guard/parseAllowlist) reading frozen at V14; sidecar absence fails loud"
    verification:
      - kind: other
        ref: "node v1.4-milestone-audit.mjs (post-Task-2, pre-Task-3) -> 4 passed, 1 failed, 0 skipped, exit 1, sole failure C5/TEMPLATE-SENTINEL"
        status: pass
    human_judgment: false
  - id: D5
    description: "SWEEP-07 TEMPLATE-SENTINEL remedy backported into v1.4's C5 check; v1.4 reports 5 passed, 0 failed, 0 skipped, exit 0, C5 shows PASS not SKIPPED"
    verification:
      - kind: other
        ref: "node v1.4-milestone-audit.mjs -> 5 passed, 0 failed, 0 skipped, exit 0; --verbose shows C5 PASS; diff-size gate = 4 (<=5 tolerance); v1.4.1-milestone-audit.mjs unchanged (6 passed, 2 failed, exit 1)"
        status: pass
    human_judgment: false
  - id: D6
    description: "Apex, six nested pin-holding validators (48/58/66/70/73/120), and carve-gate.mjs all unchanged after the conversion; two GOV-02 ledger rows appended"
    verification:
      - kind: other
        ref: "check-phase-138.mjs 93/0/0; carve-gate.mjs 24/24/0; nested 48/58/66/70/73/120 byte-identical to Plan-01 baseline; git diff --numstat ledger -> 2 insertions, 0 deletions"
        status: pass
    human_judgment: false

duration: 97min
completed: 2026-08-06
status: complete
---

# Phase 140 Plan 02: Frozen Corpus Reader + V14 Pin + v1.4 Tracer Conversion Summary

**Built the batched `git cat-file --batch` frozen-corpus reader library layer, pinned `V14 = 0b3be9ab` with full rationale, converted v1.4's harness end-to-end (the phase's proof-of-architecture tracer), and backported the TEMPLATE-SENTINEL remedy — v1.4 now reports `5 passed, 0 failed, 0 skipped` reading its corpus frozen instead of live HEAD.**

## Performance

- **Duration:** ~97 min
- **Started:** 2026-08-06T21:55:53Z (immediately following Plan 01's correction commit)
- **Completed:** 2026-08-06T23:32:41Z
- **Tasks:** 4 (Task 1 owner-resolved before dispatch; Tasks 2-4 executed)
- **Files modified:** 3

## Accomplishments
- Added `readManyAtClose(tag, relPaths)` (Buffer-offset-parsed batched `git cat-file --batch` reader, D-04) and `createFrozenCorpusReader(tag, opts)` (per-harness enumeration + batch fetch, memoized in a closure) to `_lib/frozen-at-close.mjs` — the shared library layer every remaining harness conversion (Plans 03-04) will consume unchanged
- Pinned `V14 = 0b3be9ab` with a rationale comment recording the SHA choice, the two rejected roadmap candidates, the absent `MILESTONE CLOSE` subject-line discriminator, and the audit-close scope bar (`.planning/*` reads barred at this pin, per D-21); added `readAtV14Close` convenience export
- Retargeted `--self-test` assertion 3 from `V14` to `VUNPINNED` in the same commit as the pin (D-22) — self-test stayed `6/6 PASS` across four separate runs this plan, Phase 139's evidence preserved by substitution
- Converted all four of `v1.4-milestone-audit.mjs`'s read chokepoints (`readFile`, `walkMd`, the `existsSync` scope guard, `parseAllowlist`) to read frozen at `V14`; sidecar absence now fails loud (D-07) instead of silently degrading to empty allow-lists
- Backported the exact 3-line v1.4.1 sentinel-parse remedy (SWEEP-07) into v1.4's C5 check, applied after the conversion — measured the full `3 failed -> 2 failed -> 1 failed -> 0 failed` arithmetic across the pre-plan baseline, Task 2, and Task 3
- Ran the full post-edit blast-radius gate (apex, six nested pin-holding validators, carve-gate, self-test, both harnesses) and appended two GOV-02 ledger rows, including an honest correction to RESEARCH.md D-18's coverage claim

## Task Commits

1. **Task 1: Confirm the one-way V14 pin** - owner-resolved before dispatch (see `<task_1_checkpoint_already_resolved>`); no commit, no re-presentation
2. **Task 2: End-to-end frozen read for v1.4 — one harness, every layer** - `b49b5847` (feat)
3. **Task 3: Backport the v1.4.1 sentinel parse into v1.4's C5 check** - `876d62e6` (fix)
4. **Task 4: Post-edit blast-radius gate and GOV-02 ledger rows** - `61731b0a` (docs)

## Files Created/Modified
- `scripts/validation/_lib/frozen-at-close.mjs` - Added `readManyAtClose`/`createFrozenCorpusReader` exports; pinned `V14`; added `readAtV14Close`; retargeted self-test assertion 3 to `VUNPINNED`
- `scripts/validation/v1.4-milestone-audit.mjs` - Converted all four read chokepoints to frozen reads at `V14`; backported the SWEEP-07 sentinel-parse remedy into the C5 check
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - Appended two rows: the library-layer edit and the harness conversion edit, both with pre/post regression figures

## Decisions Made
- Task 1's owner ruling (proceed with `0b3be9ab`, single entry, `V14_ARCHIVE` deferred) was treated as already-resolved input, not re-litigated — matches the plan's explicit "confirmation gate, not a re-decision" framing.
- The V14 pin's rationale comment supersedes the prior omission note without deleting it from the file's history — both rejected candidates (`b5cf529`, `671f72a`) are named as tested-and-rejected.
- `VUNPINNED` chosen as the self-test's new probe tag — the only structurally-safe choice against every future real milestone tag this project will mint (RESEARCH.md Finding 6).
- SWEEP-07's remedy landed in the minimal 3-line form (matching v1.4.1's original at `:265-268`), not the larger underscore-directory scope-filter port — verified by a diff-size gate rather than eyeballed.
- Marked `SWEEP-07` and `SWEEP-08` complete in `REQUIREMENTS.md` (both single-clause, fully satisfied). Left `SWEEP-05` Pending — it spans v1.4 through v1.18 and only 1 of 16 harnesses is converted so far.
- Recorded (not "fixed" — nothing to fix) a measured correction to RESEARCH.md D-18: v1.4's frozen scope at `V14` is 26 files vs 33 live (7 `docs/admin-setup-android/{07..13}` OEM docs post-date the Phase-43 pin). Does not affect the pin's correctness; is a genuine coverage-narrowing fact this conversion introduces, now on record in the GOV-02 ledger for whoever next reasons about v1.4's audit scope.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] `V14: '0b3be9ab'` alignment-padded form failed its own acceptance-criterion grep**
- **Found during:** Task 2, post-edit verification
- **Issue:** The file's existing convention aligns short keys with double-space padding (`V15:  'ba2cbc0'`), so the first draft wrote `V14:  '0b3be9ab'` (two spaces). The plan's own acceptance criterion, `grep -c "V14: '0b3be9ab'"` (single space), returned 0 against that form.
- **Fix:** Changed to single-space form (`V14: '0b3be9ab'`), matching the literal string the acceptance criterion and (by extension) any future validator pinning this exact substring will search for.
- **Files modified:** `scripts/validation/_lib/frozen-at-close.mjs`
- **Verification:** `grep -c "V14: '0b3be9ab'"` returns 1
- **Committed in:** `b49b5847` (Task 2 commit)

**2. [Rule 1 - Bug] SWEEP-07 sentinel-skip comment bloated the diff past its own size gate**
- **Found during:** Task 3, post-edit verification
- **Issue:** The first draft used a 4-line wrapped comment explaining the sentinel skip's provenance. The plan's acceptance criterion caps the diff at 5 `+`-lines (three changed lines plus the diff header) to prove the minimal-form remedy was used, not the larger scope-filter port. The 4-line comment pushed the count past that.
- **Fix:** Compressed to a single-line trailing comment (`// SWEEP-07/D-24 TEMPLATE-SENTINEL — skip`), matching v1.4.1's own brevity at its analogous line.
- **Files modified:** `scripts/validation/v1.4-milestone-audit.mjs`
- **Verification:** `git diff HEAD~1 -- v1.4-milestone-audit.mjs | grep -c '^+'` returns 4 (within the "5 or less" tolerance)
- **Committed in:** `876d62e6` (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — self-corrections against the plan's own literal acceptance criteria, caught before commit)
**Impact on plan:** None on scope or correctness. Both were verification-loop catches, not architectural changes.

## Issues Encountered
- `node scripts/validation/check-phase-138.mjs` and the `_lib/frozen-at-close.mjs --self-test` shallow-clone assertion routinely exceeded the Bash tool's 120s foreground timeout under this session's load and were moved to background execution; all runs eventually completed with real (not assumed) exit codes and output, matching Plan 01's own noted pattern for this machine.
- Direct measurement (not assumed from RESEARCH.md) surfaced a genuine v1.4 frozen-vs-live scope divergence (26 vs 33 files) that RESEARCH.md's D-18 had stated as identical — see Decisions Made and the GOV-02 ledger row for the full finding. Recorded, not treated as a blocker: it does not change the pin's correctness rationale (sidecar-alignment, not corpus completeness) and the harness's per-file check logic is unaffected.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- Plans 03/04 (v1.4.1/v1.5-v1.10 and v1.11-v1.18 conversions) are unblocked: `readManyAtClose`/`createFrozenCorpusReader` are proven byte-identical against the existing single-file reader and are ready for reuse unchanged across all 15 remaining harnesses.
- The four-chokepoint conversion recipe (readFile/walkMd/existsSync-guard/parseAllowlist) is proven end-to-end on a real harness, not just drafted in RESEARCH.md — the tracer's entire purpose.
- Plan 05 (SWEEP-06 measurement + phase close) should account for the v1.4 frozen-vs-live scope divergence recorded here when it writes SWEEP-05's final coverage-drop bounds per harness (D-18's per-harness table needs v1.4's own row corrected from "0 dropped" to "7 dropped").
- No blockers. `carve-gate.mjs` remains green (0 off-list) after all three commits.

---
*Phase: 140-frozen-aware-harness-conversion*
*Completed: 2026-08-06*

## Self-Check: PASSED

- FOUND: `.planning/phases/140-frozen-aware-harness-conversion/140-02-SUMMARY.md`
- FOUND: commit `b49b5847` (Task 2 tracer conversion)
- FOUND: commit `876d62e6` (Task 3 SWEEP-07 backport)
- FOUND: commit `61731b0a` (Task 4 GOV-02 ledger rows)
