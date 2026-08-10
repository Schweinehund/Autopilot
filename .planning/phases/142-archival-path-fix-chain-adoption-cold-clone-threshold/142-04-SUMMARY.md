---
phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold
plan: 04
subsystem: testing
tags: [ci-validator, node-esm, archived-path-resolution, anti-vacuity-liveness-probe, gov-02-ledger]

# Dependency graph
requires:
  - phase: 142-03
    provides: check-phase-30.mjs exits 0 standalone (RED-04), the isMissing classifier repair precedent, and the byte-identical line-anchored author-guidance regex reused here for V-31-25
provides:
  - check-phase-31.mjs exits 0 standalone (RED-05 satisfied)
  - V-31-23's own resolveArchivedPhasePath(..., ['v1.3-phases']) call site, separate from parseInventory()'s
  - V-31-29's metric fix (wc -l, not split('\n').length) plus runbook-14's re-derived band [162, 242]
  - Anti-vacuity liveness probe demonstrating V-31-29 is genuinely live (not exempted), reverted cleanly
  - GOV-02 ledger row for check-phase-31.mjs (grep-before-edit + regression baselines + post-edit confirmation)
affects: [142-05, 142-06]

# Actuals (#2632)
actuals:
  tokens: 7242
  tasks: 3
  commits: 4

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Presence-only content anchor (c.includes(expected.trim())) instead of a hardcoded zero-based line index, for prose that relocated during a documentation reorganization"
    - "Own resolveArchivedPhasePath call site distinct from a sibling function's call, when the two resolve different fixtures with different discriminator shapes"
    - "Documented-target-band re-derivation (shift by measured retrofit delta, then re-apply the spec's existing tolerance rule) instead of widening only the coded ceiling"
    - "Anti-vacuity liveness probe: mutate a bound to an impossible interval in the working tree, confirm a genuine FAIL naming the affected item, then git checkout -- <file> to revert cleanly"

key-files:
  created: []
  modified:
    - scripts/validation/check-phase-31.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "V-31-23's own resolver call site does not reuse parseInventory()'s -- that call resolves a different fixture, sits inside a different function, and returns a different discriminator shape (D-23)"
  - "V-31-23's content anchor asserts PRESENCE only, never uniqueness -- 06-compliance-policy.md is EEE-enrolled and a future retrofit could legitimately restate the bullet, so an exactly-once clause would add a failure mode without adding coverage (D-21)"
  - "V-31-29 required BOTH the metric fix (wc -l, not split('\\n').length) AND the band re-derivation (documented target shifted +31 by the measured v1.3->HEAD EEE-retrofit delta, then the same +/-15%-per-endpoint rule re-applied) -- neither alone sufficed, and RESEARCH.md's originally-recommended KNOWN_EXCEPTION/continue exemption mechanism was explicitly rejected by the orchestrator as a vacuous pass of exactly the class this phase exists to delete (D-24, corrected recommendation)"
  - "Runbooks 15/16/17's coded bounds are left byte-unchanged (annotated-not-changed) even though their documented targets are equally stale, because their bounds still hold -- only runbook 14's interval changed"
  - "The GOV-02 ledger row was written in two stages within this plan (pre-edit grep+baselines in Task 1, post-edit confirmation appended to the same row in Task 3), matching the precedent set by Plan 03's row for check-phase-30.mjs"
  - "The literal string KNOWN_EXCEPTION was removed from an explanatory comment (reworded to describe the rejected mechanism without naming it), to satisfy the plan's requirement that no such identifier appear anywhere in the file"

requirements-completed: [RED-05, RED-07]

coverage:
  - id: D1
    description: "check-phase-31.mjs exits 0 standalone (29 passed, 0 failed, 1 skipped) via three genuinely repaired assertions, not a corpus edit"
    requirement: "RED-05"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-31.mjs -- Summary: 29 passed, 0 failed, 1 skipped, exit 0"
        status: pass
      - kind: other
        ref: "grep -c resolveArchivedPhasePath scripts/validation/check-phase-31.mjs -- returns 3 (import, parseInventory() call, V-31-23's new call)"
        status: pass
      - kind: other
        ref: "grep -c 'lines\\[181\\]' and grep -c 'line 182' scripts/validation/check-phase-31.mjs -- both return 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "RED-07 regression guard (check-phase-68.mjs) and GOV-01 carve-gate stay green after the edit; zero docs/ changes"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-68.mjs -- Result: 33 PASS, 0 FAIL, 0 SKIPPED, exit 0"
        status: pass
      - kind: other
        ref: "node scripts/validation/carve-gate.mjs -- 46 in-scope, 46 on-list, 0 off-list, exit 0"
        status: pass
      - kind: other
        ref: "git status --porcelain docs/ -- empty"
        status: pass
    human_judgment: false
  - id: D3
    description: "V-31-29 is demonstrably live, not exempted -- mutate-and-revert liveness probe proves the bound is evaluated"
    verification:
      - kind: other
        ref: "runbook 14's bound temporarily mutated to [1,5] in the working tree; node scripts/validation/check-phase-31.mjs exited non-zero with 'V-31-29: ... FAIL -> 14: 215 lines (bound 1-5)'; reverted via git checkout -- scripts/validation/check-phase-31.mjs; git status --porcelain scripts/ docs/ empty afterward"
        status: pass
    human_judgment: false
  - id: D4
    description: "GOV-02 ledger row appended for check-phase-31.mjs with target-scoped + symbol-scoped grep, hit classification, and pre/post-edit regression baselines"
    verification:
      - kind: other
        ref: "tail -1 .planning/milestones/v1.20-GOV-02-LEDGER.md -- names check-phase-31.mjs, ends with | 04 |"
        status: pass
    human_judgment: false

duration: 26min
completed: 2026-08-10
status: complete
---

# Phase 142 Plan 04: RED-05 Validator Repair (check-phase-31.mjs) Summary

**Repaired three superseded/vacuous assertions in check-phase-31.mjs (a brittle archived-fixture line index, a frontmatter pipe-enum that never existed, and a stale wc -l band that was one metric-unit and 31 documented-target lines out of date) with genuinely-failable successors, proved the hardest of the three (V-31-29) live via a mutate-and-revert liveness probe, and fixed the npm isMissing classifier arm — zero corpus edits, check-phase-31.mjs now exits 0 standalone at 29/0/1.**

## Performance

- **Duration:** ~26 min
- **Started:** 2026-08-10T18:59:00Z
- **Completed:** 2026-08-10T19:25:00Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments

- GOV-02 target-scoped + symbol-scoped grep run and recorded BEFORE any source edit: 309 target-scoped hits (19 in `scripts/validation/`, 0 in `.github/`, 290 in `.planning/milestones/`), zero `String.includes()` path-string pins found anywhere. Identified `check-phase-68.mjs`'s two structurally-safe sibling-guard pins (`V-68-04`'s floor over `archive-path` at `:100`, `V-68-08`'s bare `_missing` marker at `:170-179`) and confirmed neither pins the literal path string.
- V-31-23 rewritten: gave the check its own `resolveArchivedPhasePath('31-ios-l2-investigation/expected-d23.txt', ['v1.3-phases'])` call site (not a reuse of `parseInventory()`'s), and replaced the brittle `lines[181]` index with a presence-only content anchor (`c.includes(expected.trim())`) — the target prose relocated during Phase 122's EEE reorganization but is byte-identical and unmoved in substance, so the anchor correctly matches it at its new location under "iOS-Specific Timing Considerations" rather than the old "Step 3: Configure Actions for Noncompliance" location.
- V-31-25 rewritten: replaced a frontmatter pipe-enum test for a shape that never lived in frontmatter with a line-anchored regex on the template's author-guidance comment, byte-identical to `check-phase-30.mjs`'s V-30-10 successor (`l1-template.md`), so the two validators stop diverging. Also fixed the hardcoded pass-worded `"enum present"` FAIL detail opportunistically (one of the eight routed-deferral strings this phase touches by rewriting the check that owns it).
- V-31-29 rewritten with two independent, both-required fixes: the metric switched from `split('\n').length` (= `wc -l` + 1) to the actual `wc -l` equivalent, and runbook 14's bound re-derived from its documented target `~160-180` shifted +31 (the measured v1.3->HEAD EEE-retrofit delta) to `~191-211`, then the same ±15%-per-endpoint rule applied → `[162, 242]`. Runbooks 15/16/17 left byte-unchanged (their bounds still hold). No `KNOWN_EXCEPTION` map, no `continue`, no per-runbook exemption — RESEARCH.md's originally-recommended exemption mechanism was explicitly rejected by the orchestrator as manufacturing exactly the vacuous-pass class this phase exists to delete.
- Anti-vacuity liveness probe: temporarily mutated runbook 14's bound to `[1, 5]` in the working tree, confirmed `check-phase-31.mjs` exits non-zero with `V-31-29: ... FAIL -> 14: 215 lines (bound 1-5)`, then reverted via `git checkout -- scripts/validation/check-phase-31.mjs`, confirming `git status --porcelain` empty afterward. This proves the bound is evaluated at run time, not silently skipped.
- `isMissing` classifier extended at V-31-30's call site with the npm `"no YES option"` text observed on `ubuntu-latest` (D-13), matching `check-phase-30.mjs`'s two arms.
- `check-phase-31.mjs` flips from 26 passed/3 failed/1 skipped (exit 1) to 29 passed/0 failed/1 skipped (exit 0).
- `check-phase-68.mjs` (RED-07 regression guard, 33 PASS/0 FAIL/0 SKIPPED), `carve-gate.mjs` (GOV-01 gate, 46/46/0), `check-phase-30.mjs` (Plan 03's fix stays green, 12/0/1), and `check-phase-138.mjs` (apex, 93/0/0, unchanged — chain adoption is Plan 05's scope) all confirmed green throughout.

## Task Commits

Each task was committed atomically:

1. **Task 1: GOV-02 grep, guard baseline, ledger row — before any edit** - `c6716403` (docs)
2. **Task 2: Rewrite V-31-23 (own resolver call site + presence anchor) and V-31-25 (line-anchored enum)** - `86507ed3` (fix)
3. **Task 3: V-31-29 metric and band, classifier arm, ledger row finalized** - `de6d8eb2` (fix)
4. **Follow-up: reword V-31-29 comment to remove literal `KNOWN_EXCEPTION` identifier** - `365bd385` (docs, no functional change)

_No plan-metadata commit yet — final metadata commit follows after STATE.md/ROADMAP.md updates._

## Files Created/Modified

- `scripts/validation/check-phase-31.mjs` — V-31-23 successor body + new `name` string + own resolver call site, V-31-25 successor body + new `name` string, V-31-29 metric fix + re-derived runbook-14 band, `isMissing` classifier arm at V-31-30
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — one appended row (Plan 04), written in two stages (pre-edit grep/baselines in Task 1, post-edit confirmation in Task 3), matching the Plan 03 precedent

## Decisions Made

- Kept the `_missing` discriminator on V-31-23's new resolver-null branch but did NOT justify it in the comment by naming the guard it happens to satisfy (V-68-08) — that guard is not at risk under any rewrite of this check, so citing it would be a non-reason (D-23). The only recorded reason is the true one: distinguishing a resolver miss from a resolved-but-unreadable fixture.
- Verified the D-24(b) band arithmetic myself (`0.85×191=162.35→162`, `1.15×211=242.65→242`) rather than transcribing RESEARCH.md's corrected block verbatim, per D-37's "verify refutations as hard as claims" discipline — the numbers matched.
- Ran the liveness probe with an impossible interval `[1, 5]` (rather than a merely-too-narrow band) to make the FAIL unambiguous and easy to distinguish from a coincidental near-miss.

## Deviations from Plan

**1. [Rule 2 — minor safety] Reworded a comment to remove the literal `KNOWN_EXCEPTION` identifier.**
- **Found during:** Task 3, self-review against the plan's success criteria.
- **Issue:** The comment explaining why the originally-proposed exemption mechanism was rejected named that mechanism's identifier (`KNOWN_EXCEPTION`) verbatim. The plan's success criteria requires "No `KNOWN_EXCEPTION` / per-runbook skip anywhere in the file" — distinct from the "no such mechanism implemented" requirement, which was already satisfied.
- **Fix:** Reworded the comment to describe the rejected mechanism without naming it (`"the originally-proposed hardcoded per-file skip mechanism was rejected as vacuous"`).
- **Files modified:** `scripts/validation/check-phase-31.mjs`
- **Commit:** `365bd385`

No other deviations — the rest of the plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- RED-05 is satisfied: `check-phase-31.mjs` exits 0 standalone with genuinely-failable assertions (not permanently-true-by-construction pins), and V-31-29 was proven live via a real mutate-and-revert probe rather than merely asserted live.
- RED-07 is satisfied: `check-phase-68.mjs`'s two guards (`V-68-04` floor, `V-68-08` marker) report an identical 33/0/0 tally before and after this plan's edits.
- Plan 05 (RED-06 chain adoption via `CHAIN_EXTRA = [30, 31]`) is now unblocked (D-12) — both `check-phase-30.mjs` and `check-phase-31.mjs` independently exit 0 standalone.
- No stubs, no skipped tests, no unrun `<verify>` steps to log to `.planning/WINDOWS.md`.

---
*Phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold*
*Completed: 2026-08-10*

## Self-Check: PASSED

All created/modified files confirmed present on disk; all four commits (`c6716403`, `86507ed3`, `de6d8eb2`, `365bd385`) confirmed present in git history.
