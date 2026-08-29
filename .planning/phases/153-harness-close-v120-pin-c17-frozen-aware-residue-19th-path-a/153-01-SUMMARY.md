---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 01
subsystem: infra
tags: [validation-harness, frozen-read, git-object-store, milestone-close, c17-eee-contract, tracer]

# Dependency graph
requires:
  - phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
    provides: the V119 pin and the V18..V119 single-entry export pattern this plan extends
provides:
  - MILESTONE_CLOSE_SHAS.V120 pin, inserted strictly before V14 (never appended)
  - readAtV120Close / lsTreeAtV120Close thin-wrapper exports
  - materializeDocsAtClose / withDocsAtClose materialize helper with retry-safe cleanup
  - the v1.15 harness's C17 leg converted to frozen-corpus (cwd-swap) mode, proven green
  - a corrected PROJECT.md Pillar G instruction (insert-before, not append)
affects: [153-02, 153-03, 153-04]

actuals:
  tokens: 41000
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "cwd-swap conversion: materialize a frozen tree to a temp dir, spawn the unchanged validator with cwd pointed at it"
    - "callback-owned temp-directory lifecycle (create + cleanup in one function, never a path-returning helper)"
    - "milestone-unique known-member path as an anti-vacuous-green guard, proven failable by a deliberate negative probe"

key-files:
  created: []
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs
    - .planning/PROJECT.md
    - scripts/validation/v1.15-milestone-audit.mjs

key-decisions:
  - "V120 pin inserted strictly before V14 inside MILESTONE_CLOSE_SHAS, never appended -- V-140-V14PIN regex-asserts V14 stays the object's last key"
  - "No path exists that is present in V115's docs/ tree and absent from BOTH immediate neighbours (V116's docs/ path set is identical to V115's -- 0 added, 0 removed); the known-member guard for the v1.15 tracer instead targets predecessor V114, the neighbour a milestone-tag regression would realistically produce"
  - "Append-only ruling on frozen-at-close.mjs (Phase 144 D-31) amended once, in writing, in the module header, scoped to this phase's two mid-file edits (the V120 insert-before, and the withDocsAtClose write-verb addition)"

requirements-completed: [HARN-01, HARN-02, HARN-03]

coverage:
  - id: D1
    description: "V120 close-SHA pin inserted before V14, both convenience exports resolve, and the pin is proven by a real frozen read"
    requirement: "HARN-01"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-140.mjs (V14PIN line)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-120.mjs (HYG01 line)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-73.mjs"
        status: pass
      - kind: other
        ref: "node -e object-order + frozen-read assertion (readAtV120Close/lsTreeAtV120Close non-empty)"
        status: pass
    human_judgment: false
  - id: D2
    description: "withDocsAtClose materializes only docs/** into a temp directory and cleans up with retry-safe removal"
    requirement: "HARN-02"
    verification:
      - kind: other
        ref: "node -e withDocsAtClose('V120', ...) materialized 296 files, exit 0"
        status: pass
      - kind: other
        ref: "post-run existence check: temp dir absent after callback returns"
        status: pass
    human_judgment: false
  - id: D3
    description: "v1.15 harness's C17 leg converted to frozen-corpus (cwd-swap) mode, exits 0, known-member guard proven failable by negative probe"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.15-milestone-audit.mjs --verbose (C17 line, 16/16 passed)"
        status: pass
      - kind: other
        ref: "negative probe: wrapper pointed at V114, C17 line FAILs (15 passed, 1 failed), then reverted and re-confirmed green"
        status: pass
      - kind: other
        ref: "git diff --numstat 246fa3dd..HEAD -- scripts/validation/c17-eee-contract.mjs (empty -- byte-unchanged)"
        status: pass
    human_judgment: false

duration: 35min
completed: 2026-08-29
status: complete
---

# Phase 153 Plan 01: V120 Pin, withDocsAtClose Helper & v1.15 C17 Tracer Summary

**Pinned the V120 back-anchor before V14, built a retry-safe temp-directory materialize helper on top of the existing frozen readers, and proved the whole working-directory-swap mechanism end to end by converting v1.15's C17 leg to run its byte-unchanged contract validator against its own frozen corpus.**

## Performance

- **Duration:** ~35 min
- **Completed:** 2026-08-29T16:01:24Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- `MILESTONE_CLOSE_SHAS.V120 = '246fa3dd'` inserted strictly before `V14` inside `frozen-at-close.mjs`'s object literal, with `readAtV120Close`/`lsTreeAtV120Close` appended to the existing V18..V119 export blocks, proven by a real frozen read (37078 bytes, 296 tree entries at the v1.20 close)
- Subject-line pair discriminator regression-checked against V117/V118/V119 (all count=1, matching existing pins) before trusting the V120 result (also count=1, no false positive)
- `materializeDocsAtClose`/`withDocsAtClose` exported: enumerate the frozen `docs/**` tree, batch-read it, write it to a temp directory, hand the directory to a callback, and remove it in a `finally` with retry-safe `rmSync` options -- the module's first write verbs, recorded in its header
- v1.15 harness's C17 leg rewritten to absolutize the contract path before the spawn, materialize `V115`'s frozen corpus into a temp directory, assert a milestone-unique known-member path before spawning, and run the byte-unchanged `c17-eee-contract.mjs` with `cwd` pointed at that temp directory -- exits 0 against its own frozen corpus
- `PROJECT.md` Pillar G's falsified "Append" instruction corrected to insert-before-V14, in the same commit as the pin
- Phase 144's D-31 APPEND-ONLY ruling amended once, in writing, in the module header, naming both of this phase's mid-file edits

## Task Commits

Each task was committed atomically:

1. **Task 1: The V120 pin — recover, regression-check, insert before V14, export, correct the project document, prove by a real frozen read** - `927483f8` (feat)
2. **Task 2: withDocsAtClose — the materialize helper, retry-safe cleanup, and the module's first write verbs** - `8b4c9245` (feat)
3. **Task 3: TRACER — convert the v1.15 C17 leg end to end and prove it green against its own frozen corpus** - `53d55232` (feat)

_No plan-metadata commit yet — SUMMARY/STATE/ROADMAP land in the next commit per the executor's standard close-out order._

## Files Created/Modified
- `scripts/validation/_lib/frozen-at-close.mjs` - V120 pin (inserted before V14), `readAtV120Close`/`lsTreeAtV120Close` exports, `materializeDocsAtClose`/`withDocsAtClose`, D-06 append-only amendment note, D-19/D-21 header notes
- `.planning/PROJECT.md` - Pillar G's "Append" instruction corrected to insert-before-V14
- `scripts/validation/v1.15-milestone-audit.mjs` - C17 leg converted from live-HEAD spawn to `withDocsAtClose('V115', ...)` cwd-swap, with an absolutized contract path and a known-member guard

## Discriminator Recovery Evidence (D-05, regression check)

All four rows recovered via `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /vX.Y/ && $2 ~ /MILESTONE CLOSE/'`, each returning exactly one row:

| Milestone | SHA (full) | Subject | Matches existing pin? |
|---|---|---|---|
| v1.17 | `b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428` | `docs(128-07): v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE CLOSE` | Yes — `V117: 'b56bba5'` |
| v1.18 | `7af8a14766d346a348f7adf05d260676dbe4c1b2` | `docs(134-05): v1.18 MILESTONE CLOSE — single close-gate commit, 20/20 requirements Validated` | Yes — `V118: '7af8a147'` |
| v1.19 | `a7bda73e23efc5e3f9607c3fef37abf8ec4030aa` | `docs(138-06): v1.19 MILESTONE CLOSE — single close-gate commit, 17/17 requirements Validated` | Yes — `V119: 'a7bda73e'` |
| v1.20 | `246fa3ddc88a73792744285468a0265dfbab68e8` | `docs(144-12): v1.20 MILESTONE CLOSE — single close-gate commit, 28/28 requirements Validated` | New pin — `V120: '246fa3dd'` |

**Correction of record:** no v1.20 false positive occurred with the naive dual-token `--grep --all-match` form (unlike the genuine V118/V119 traps recorded in the file's own history) — this recovery still used the ratified subject-line discriminator, and none is claimed to have been needed as a workaround here specifically because it wasn't tested against the naive form; the discriminator was used uniformly per D-05's instruction, not because a naive-form failure was observed for v1.20.

## Known-Member Path Derivation (D-16, v1.15 tracer)

Diffed V115's frozen `docs/` tree against its immediate neighbours (V114, V116):

- `docs/_registry/RE-index.md`, `docs/_standards/EEE-SOP-standard.md`, `docs/_templates/reference-template.md` were **added in V115** relative to V114 (3 files; V114 count 288, V115 count 291).
- **V116's `docs/` path set is byte-identical to V115's** — 0 files added, 0 removed (both count 291). `[MEASURED 2026-08-29]`

**Consequence:** no path exists that is present in V115 and absent from **both** immediate neighbours simultaneously, because V116 carries every V115 path forward unchanged. The plan's literal "absent from both" instruction cannot be satisfied by any real path in this milestone's history. The guard instead targets the neighbour that matters for the threat it defends against (T-153-05: a harness reading the wrong milestone's frozen tree, most plausibly an adjacent one) — `docs/_standards/EEE-SOP-standard.md`, present in V115, absent from V114, present in V116. This distinguishes V115 from a regression to its predecessor, which is the realistic failure mode; it cannot distinguish V115 from V116 by path presence alone since their `docs/` trees enumerate identically. Recorded here rather than silently substituted.

## Negative Probe (D-16, proves the guard is failable)

Temporarily repointed the wrapper `withDocsAtClose('V115', ...)` to `withDocsAtClose('V114', ...)`:

```
[17/16] C17: EEE document contract (13 assertions, all enrolled docs/ files) FAIL -- C17 FAIL: known-member guard failed --
  C:\Users\JOANDE~1\AppData\Local\Temp\frozen-at-close-V114-rCX65T\docs\_standards\EEE-SOP-standard.md absent from materialized V115 corpus
Summary: 15 passed, 1 failed, 0 skipped
```

Reverted the file to `withDocsAtClose('V115', ...)` and re-ran:

```
[17/16] C17: EEE document contract (13 assertions, all enrolled docs/ files) PASS c17-eee-contract.mjs exits 0 against frozen V115 corpus
  (291 files materialized; all enrolled files pass 13 assertions)
Summary: 16 passed, 0 failed, 0 skipped
```

## Harness Triple

`node scripts/validation/v1.15-milestone-audit.mjs --verbose`: **16 passed, 0 failed, 0 skipped**, exit 0. C17 line detail names the frozen milestone tag (`V115`) and the materialized file count (291), distinguishing this evidence from a live-HEAD run.

## Append-Only Amendment (D-06, named on the record)

Phase 144's D-31 ratified `_lib/frozen-at-close.mjs` APPEND-ONLY with one carved exception, already spent by Phase 144 itself. Phase 153 takes two mid-file edits instead of pure appends, both named in a header block added by Task 1 and never taken silently:

1. The V120 pin, inserted strictly before the existing `V14` entry (an append here would fail `V-140-V14PIN`).
2. The `withDocsAtClose`/`materializeDocsAtClose` helper pair (Task 2), which extends the import block's write verbs rather than appending net-new lines only.

The header states explicitly that this amendment is scoped to Phase 153 and does not reopen APPEND-ONLY for any future phase.

## Decisions Made

- **V120 pin position:** inserted strictly before `V14`, never appended — verified by `check-phase-140.mjs`'s `V14PIN` regex assertion staying green both before and after the edit.
- **Known-member guard target:** V114 (predecessor), not "both neighbours," because V116's `docs/` path set is measurably identical to V115's — documented above rather than silently deviating from the plan's literal wording.
- **No count parsed from child stdout:** the C17 leg's success/failure is still determined purely by `execFileSync`'s exit code, matching the original pattern exactly — D-17's "pin the exact wording if you parse a count" was avoided entirely by not parsing one.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 — Corrected assumption] Known-member guard could not satisfy "absent from both neighbours" literally**
- **Found during:** Task 3 (deriving the known-member path)
- **Issue:** The plan's action text instructs deriving a path "present in v1.15's and absent from both" immediate neighbours. Diffing V114/V115/V116 showed V116's `docs/` tree is path-identical to V115's (0 added, 0 removed), so no such path exists for this milestone.
- **Fix:** Used a path present in V115, absent from V114 (the predecessor) — the neighbour a milestone-tag regression would realistically produce — and documented the measured finding rather than silently substituting.
- **Files modified:** `scripts/validation/v1.15-milestone-audit.mjs` (guard comment documents the finding inline)
- **Verification:** Negative probe against V114 confirms the guard fails as expected; the plan's underlying intent (a guard proven failable, not decorative) is fully satisfied.
- **Committed in:** `53d55232` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 corrected assumption, Rule 1 — a premise in the plan text did not hold against measured data; the guard's protective intent is unaffected).
**Impact on plan:** No scope creep. The known-member guard still exists, still runs before the spawn, and is still proven failable by a real negative probe — it targets the historically accurate neighbour instead of a pair of neighbours that do not differ in this specific case.

## Issues Encountered

None beyond the deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The pin, the `withDocsAtClose` helper, and the proven cwd-swap conversion pattern are all ready for 153-02 (the remaining four identical C17-leg conversions: v1.16, v1.17, v1.18, v1.19) to replicate directly.
- 153-03 (the v1.20 full SWEEP-05 conversion) can now import `readAtV120Close`/`lsTreeAtV120Close` from `frozen-at-close.mjs` for its C1-C16 checks.
- No blockers. All plan-level `<verification>` commands pass: `check-phase-140.mjs` (V14PIN + C17CARVEOUT both PASS), `check-phase-120.mjs`, `check-phase-73.mjs`, `v1.15-milestone-audit.mjs --verbose` (16/16), a real `readAtV120Close`/`lsTreeAtV120Close` frozen read, `c17-eee-contract.mjs` byte-unchanged against both the working tree and the v1.20 close SHA, and exactly three files modified across the whole plan.

## Self-Check: PASSED

All 3 modified files confirmed present on disk; all 3 task commits (`927483f8`, `8b4c9245`, `53d55232`) confirmed in `git log`; all plan-level `<verification>` commands re-run and PASS.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-29*
