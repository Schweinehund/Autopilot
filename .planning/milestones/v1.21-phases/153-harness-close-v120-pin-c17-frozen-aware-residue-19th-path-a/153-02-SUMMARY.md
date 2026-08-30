---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 02
subsystem: infra
tags: [validation-harness, frozen-read, git-object-store, milestone-close, c17-eee-contract]

# Dependency graph
requires:
  - phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
    provides: withDocsAtClose helper and the proven cwd-swap conversion pattern (153-01 tracer)
provides:
  - v1.16, v1.17, v1.18 and v1.19 C17 legs converted to frozen-corpus (cwd-swap) mode, each proven green
  - milestone-unique known-member guards for V116, V117, V118 and V119
  - a programmatic five-leg (v1.15-v1.19) structural uniformity proof
affects: [153-03, 153-04]

actuals:
  tokens: 21000
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "cwd-swap conversion replicated four more times from the v1.15 tracer template, byte-identical after tag/known-member-path normalization"
    - "plateau-boundary known-member guard: when a milestone's docs/ path list is identical to an immediate neighbour's (or is a subset of a monotonically-growing successor's), the guard targets the nearest ACTUALLY DIFFERING ancestor instead of the literal 'both neighbours'"

key-files:
  created: []
  modified:
    - scripts/validation/v1.16-milestone-audit.mjs
    - scripts/validation/v1.17-milestone-audit.mjs
    - scripts/validation/v1.18-milestone-audit.mjs
    - scripts/validation/v1.19-milestone-audit.mjs

key-decisions:
  - "Known-member guards target the nearest differing predecessor, not the literal 'both immediate neighbours' -- measured V115/V116/V117 docs/ path lists are byte-identical (sha1 match) and V119/V120 are also byte-identical, with V114..V120 growing monotonically (zero removals), so no path can ever be absent from a plateau-neighbour or a superset-successor. This generalizes 153-01's V115 deviation to all four legs in this plan."
  - "Guard path literals differ across the four legs (V116: docs/_registry/RE-index.md, V117: docs/_templates/reference-template.md, V118: docs/recipes/01-shared-windows-avd-client.md, V119: docs/recipes/03-windows-11-multi-app-kiosk.md) even though V116/V117 share a docs/ tree and cannot be distinguished from each other by path presence -- documented explicitly rather than silently asserting a disproof the data cannot support."

requirements-completed: [HARN-03]

coverage:
  - id: D1
    description: "v1.16 and v1.17 C17 legs converted to frozen-corpus cwd-swap mode, each with a milestone-unique known-member guard, both exiting 0 against their own frozen corpora"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.16-milestone-audit.mjs --verbose (C17 PASS, detail names V116, 291 files)"
        status: pass
      - kind: other
        ref: "node scripts/validation/v1.17-milestone-audit.mjs --verbose (C17 PASS, detail names V117, 291 files)"
        status: pass
      - kind: other
        ref: "negative probe: v1.16 repointed to withDocsAtClose('V114', ...) -- C17 FAIL: known-member guard failed; reverted to V116, re-confirmed green"
        status: pass
    human_judgment: false
  - id: D2
    description: "v1.18 and v1.19 C17 legs converted to frozen-corpus cwd-swap mode, each with a milestone-unique known-member guard, both exiting 0 against their own frozen corpora"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.18-milestone-audit.mjs --verbose (C17 PASS, detail names V118, 294 files)"
        status: pass
      - kind: other
        ref: "node scripts/validation/v1.19-milestone-audit.mjs --verbose (C17 PASS, detail names V119, 296 files)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-140.mjs (5 PASS, 0 FAIL -- carve-out check unaffected)"
        status: pass
    human_judgment: false
  - id: D3
    description: "The five identical-leg harnesses (v1.15 tracer plus v1.16-v1.19 from this plan) are structurally uniform, proven by programmatic pairwise comparison rather than asserted"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.1{5,6,7,8,9}-milestone-audit.mjs --verbose, all five run in sequence, all exit 0"
        status: pass
      - kind: other
        ref: "Python comparison: id:17 block extracted from all five files, full-line comments stripped, tag literal and known-member path literal normalized -- all five reduce to the identical code string"
        status: pass
    human_judgment: false

duration: 40min
completed: 2026-08-29
status: complete
---

# Phase 153 Plan 02: v1.16-v1.19 C17 Frozen-Corpus Conversion & Five-Leg Uniformity Summary

**Replicated the v1.15 tracer's cwd-swap conversion across the four remaining identical C17 legs (v1.16, v1.17, v1.18, v1.19), each guarded by its own milestone-unique known-member path, and proved the resulting five-leg set is structurally uniform by programmatic comparison rather than assertion.**

## Performance

- **Duration:** ~40 min
- **Completed:** 2026-08-29T17:10:00Z (approx)
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- `v1.16-milestone-audit.mjs` and `v1.17-milestone-audit.mjs` C17 legs converted: `CONTRACT` absolutized before the working-directory swap, the `existsSync` guard stays against the live repo root, the spawn runs inside `withDocsAtClose(tag, ...)` against each milestone's own frozen `docs/` corpus, and each carries its own known-member guard before the spawn -- both exit 0 with detail strings naming their own tag
- `v1.18-milestone-audit.mjs` and `v1.19-milestone-audit.mjs` converted identically -- both exit 0
- All four legs' known-member guards target the nearest **actually differing** predecessor rather than "both immediate neighbours" literally, because the measured `docs/` history (V114 through V120) grows monotonically with zero removals and contains two path-identical plateaus (V115=V116=V117; V119=V120) where no path can ever be absent from a plateau-neighbour or present-only-behind-a-superset-successor
- A programmatic pairwise comparison (id:17 block extracted from all five converted legs, full-line comments stripped, tag and known-member-path literals normalized to placeholders) confirms all five reduce to byte-identical code -- the only structural differences across the whole five-leg set are the tag literal and the known-member path literal, exactly as HARN-03 requires
- `check-phase-140.mjs`'s carve-out check (`V-140-C17CARVEOUT`) still exits PASS -- its assertion body is a bare `.includes('c17-eee-contract')` and survives the conversion untouched (its stale name/detail string is a documented, deliberately-deferred defect per D-20, fixed additively in a successor validator, never here)
- `c17-eee-contract.mjs` remains byte-unchanged across the whole plan (`git diff 246fa3dd..HEAD` empty)

## Task Commits

Each task was committed atomically:

1. **Task 1: Derive the four known-member paths, then convert the v1.16 and v1.17 legs** - `35c0b177` (feat)
2. **Task 2: Convert the v1.18 and v1.19 legs and prove the five-leg set is structurally uniform** - `3df3805a` (feat)

_No plan-metadata commit yet -- SUMMARY/STATE/ROADMAP land in the next commit per the executor's standard close-out order._

## Files Created/Modified
- `scripts/validation/v1.16-milestone-audit.mjs` - C17 leg converted from live-HEAD spawn to `withDocsAtClose('V116', ...)` cwd-swap, guarded by `docs/_registry/RE-index.md`
- `scripts/validation/v1.17-milestone-audit.mjs` - C17 leg converted to `withDocsAtClose('V117', ...)`, guarded by `docs/_templates/reference-template.md`
- `scripts/validation/v1.18-milestone-audit.mjs` - C17 leg converted to `withDocsAtClose('V118', ...)`, guarded by `docs/recipes/01-shared-windows-avd-client.md`
- `scripts/validation/v1.19-milestone-audit.mjs` - C17 leg converted to `withDocsAtClose('V119', ...)`, guarded by `docs/recipes/03-windows-11-multi-app-kiosk.md`

## Known-Member Path Derivation (D-16)

**Command used to enumerate each milestone's `docs/` tree:**
```
git ls-tree -r --name-only <sha> -- docs | sort
```

**Measured fact (Rule 1 deviation trigger, see below):** comparing sorted path lists by hash across the six close SHAs:

| Pair | Result |
|---|---|
| V115 (`29a3599`) vs V116 (`3dd2512`) | **identical** (sha1 `833463f7...` both) |
| V116 (`3dd2512`) vs V117 (`b56bba5`) | **identical** (sha1 `833463f7...` both) |
| V117 (`b56bba5`) vs V118 (`7af8a147`) | differs: V118 adds `docs/_templates/recipe-template.md`, `docs/recipes/01-shared-windows-avd-client.md`, `docs/recipes/02-shared-ipad-full-provisioning.md` |
| V118 (`7af8a147`) vs V119 (`a7bda73e`) | differs: V119 adds `docs/recipes/03-windows-11-multi-app-kiosk.md`, `docs/recipes/04-android-dedicated-mhs-multi-app.md` |
| V119 (`a7bda73e`) vs V120 (`246fa3dd`) | **identical** (sha1 `3e795297...` both) |

`docs/` growth across V114..V120 is **monotonic add-only with zero removals** -- every diff above is purely additive (`diff` shows only `>` lines). Consequence: **no path can ever be present in a milestone and absent from BOTH its immediate neighbours**, because (a) a plateau neighbour has an identical path list (nothing is absent from it), and (b) a successor in a monotonic-growth chain is always a superset of its predecessor (nothing added at the predecessor's boundary is ever absent from the successor). This generalizes the exact deviation `153-01-SUMMARY.md` recorded for V115 to all four milestones in this plan.

**Per-guard evidence (present in own milestone, absent from the nearest actually-differing predecessor):**

```
$ git ls-tree 3dd2512 -- docs/_registry/RE-index.md   # V116: present
100644 blob 1af8f6ac2beb713265e43fa0de6ff6693ad09cf0	docs/_registry/RE-index.md
$ git ls-tree 7d922a7 -- docs/_registry/RE-index.md   # V114: absent
(empty)

$ git ls-tree b56bba5 -- docs/_templates/reference-template.md   # V117: present
100644 blob ce09a026bc612aae37e089414b024130738ace66	docs/_templates/reference-template.md
$ git ls-tree 7d922a7 -- docs/_templates/reference-template.md   # V114: absent
(empty)

$ git ls-tree 7af8a147 -- docs/recipes/01-shared-windows-avd-client.md   # V118: present
100644 blob b7ffcc073809becd0acc67125bd638c112a5f8e2	docs/recipes/01-shared-windows-avd-client.md
$ git ls-tree b56bba5 -- docs/recipes/01-shared-windows-avd-client.md   # V117: absent
(empty)

$ git ls-tree a7bda73e -- docs/recipes/03-windows-11-multi-app-kiosk.md   # V119: present
100644 blob 64af535370d0e60c633aac070f1490f56b5afb9e	docs/recipes/03-windows-11-multi-app-kiosk.md
$ git ls-tree 7af8a147 -- docs/recipes/03-windows-11-multi-app-kiosk.md   # V118: absent
(empty)
```

**Honest disclosure of the residual gap (each guard's successor-side, quoted rather than hidden):**

```
$ git ls-tree b56bba5 -- docs/_registry/RE-index.md          # V117: ALSO present (plateau)
100644 blob 1af8f6ac2beb713265e43fa0de6ff6693ad09cf0	docs/_registry/RE-index.md
$ git ls-tree a7bda73e -- docs/recipes/01-shared-windows-avd-client.md   # V119: ALSO present (superset)
100644 blob b7ffcc073809becd0acc67125bd638c112a5f8e2	docs/recipes/01-shared-windows-avd-client.md
$ git ls-tree 246fa3dd -- docs/recipes/03-windows-11-multi-app-kiosk.md  # V120: ALSO present (plateau)
100644 blob 64af535370d0e60c633aac070f1490f56b5afb9e	docs/recipes/03-windows-11-multi-app-kiosk.md
```

Each guard genuinely distinguishes its milestone from a regression to its own predecessor (the realistic wrong-milestone-tag failure mode) but structurally **cannot** distinguish V116 from V117 (identical path lists), nor V118 from V119, nor V119 from V120, by path presence alone -- there is no real path that would do so. The threat this guard defends against (T-153-07: a leg materializing a neighbouring milestone's corpus) is still caught for the predecessor direction on all four legs, and the negative probe below demonstrates it fires.

## Negative Probe (v1.16, proves the guard is failable)

```
$ node scripts/validation/v1.16-milestone-audit.mjs --verbose   # withDocsAtClose repointed to 'V114'
[17/16] C17: EEE document contract (13 assertions, all enrolled docs/ files) FAIL -- C17 FAIL: known-member guard failed --
  C:\Users\JOANDE~1\AppData\Local\Temp\frozen-at-close-V114-f9yGlo\docs\_registry\RE-index.md absent from materialized V116 corpus
Summary: 15 passed, 1 failed, 0 skipped
```

Reverted to `withDocsAtClose('V116', ...)`:

```
$ node scripts/validation/v1.16-milestone-audit.mjs --verbose
[17/16] C17: EEE document contract (13 assertions, all enrolled docs/ files) PASS c17-eee-contract.mjs exits 0 against frozen V116 corpus (291 files materialized; all enrolled files pass 13 assertions)
Summary: 16 passed, 0 failed, 0 skipped
```

## Five-Leg Harness Triples

All five identical-leg harnesses run in one sequence, all exit 0:

| Harness | Tag | Files materialized | Result |
|---|---|---|---|
| `v1.15-milestone-audit.mjs` | V115 | 291 | 16 passed, 0 failed, 0 skipped |
| `v1.16-milestone-audit.mjs` | V116 | 291 | 16 passed, 0 failed, 0 skipped |
| `v1.17-milestone-audit.mjs` | V117 | 291 | 16 passed, 0 failed, 0 skipped |
| `v1.18-milestone-audit.mjs` | V118 | 294 | 16 passed, 0 failed, 0 skipped |
| `v1.19-milestone-audit.mjs` | V119 | 296 | 16 passed, 0 failed, 0 skipped |

## Five-Leg Structural Uniformity Comparison

Extracted the `id: 17` block from all five converted files, stripped every full-line `//` comment, then replaced each file's own milestone-tag literal (`V115`..`V119`) and known-member path-literal argument list with placeholders (`TAG`, `KNOWN_MEMBER_PATH`). Result: **all five normalized blocks are byte-identical to each other.** The only structural (executable-code) differences across the whole five-leg set are the tag literal and the known-member path literal, exactly as HARN-03 requires. The explanatory `//` comment text legitimately varies per milestone (each documents its own plateau/monotonic-growth situation and which predecessor its guard distinguishes against) -- this is per-milestone historical documentation, not a divergence in behavior, and was excluded from the structural comparison on that basis.

One pre-existing, out-of-scope prose difference was found and is recorded rather than silently ignored: v1.15's leading two-line comment ("This is the first milestone where the Path-A harness gates a corpus-wide STRUCTURAL contract...") differs from v1.16-v1.19's ("Inherited byte-unchanged into vX.Y..."). This predates this plan (authored by 153-01's tracer task) and is historically accurate for both cases -- v1.15 genuinely was the first fold-in, v1.16-v1.19 genuinely inherited unchanged. `scripts/validation/v1.15-milestone-audit.mjs` is outside this plan's `<files>` scope (`v1.18`, `v1.19` only) and was not touched.

## Decisions Made

- **Guard-path assignment strategy:** each of V116/V117/V118/V119 got an independently-derived, distinct path literal (never reusing another leg's path), even where the underlying protective claim is identical for a plateau pair (V116 and V117) -- this keeps each leg's guard comment self-contained and avoids a spurious appearance of copy-paste between files that are otherwise legitimately near-identical.
- **No count assertion added:** matching D-17 and the v1.15 tracer precedent, the non-zero `writtenPaths.length` check remains the only count-flavored assertion, and it is the secondary guard, not the primary one -- no string from `c17-eee-contract.mjs`'s stdout is parsed or pinned.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Corrected assumption] "Absent from both neighbours" is unsatisfiable for all four legs, not just V115**
- **Found during:** Task 1 (deriving the V116 and V117 known-member paths)
- **Issue:** Plan Task 1's derivation instruction and its own acceptance criterion ("neither is present in the other's frozen tree — the count-identical adjacency case is disproved by path, not by count") assume a path exists that is absent from both immediate neighbours. Measured `git ls-tree` comparison shows V115, V116 and V117 share a byte-identical `docs/` path list, and V119/V120 also share one, with V114..V120 growing monotonically (zero removals) in between -- so for a plateau member (V116, V117, V119) no path is ever absent from its plateau neighbour, and for a pre-plateau member (V118) no path is ever absent from a monotonic-growth successor (V119 is a strict superset of V118).
- **Fix:** Applied the same resolution 153-01 used for V115: each guard targets the nearest **actually differing** predecessor (V114 for V116/V117; V117 for V118; V118 for V119) rather than "both neighbours" literally. The plan's own derivation text anticipates this ("If a milestone has no uniquely present path against both neighbours, widen the comparison to the full set of six frozen trees and record that you did") -- widening to the full six-milestone set does not surface a usable path for V116/V117 either (their path list is identical across the whole plateau), so the guard reaches one step further back to V114, the plateau's true origin boundary.
- **Files modified:** `scripts/validation/v1.16-milestone-audit.mjs`, `scripts/validation/v1.17-milestone-audit.mjs`, `scripts/validation/v1.18-milestone-audit.mjs`, `scripts/validation/v1.19-milestone-audit.mjs` (each guard comment documents the finding inline)
- **Verification:** Negative probe (v1.16 repointed to V114) confirms the guard fails as expected; each guard's successor-side presence is separately quoted above rather than hidden, so the residual gap is on the record, not silently asserted away.
- **Committed in:** `35c0b177` (Task 1), `3df3805a` (Task 2)

**2. [Rule 1 - Corrected assumption] `grep -c withDocsAtClose` returns 3, not 1, matching the v1.15 tracer exactly**
- **Found during:** Task 2 (verifying the acceptance criterion `for f in ...; do grep -c withDocsAtClose "$f"; done` returns 1)
- **Issue:** The plan's acceptance criterion expects a single occurrence of the string `withDocsAtClose` per file. The proven v1.15 tracer template (read_first for Task 1) already contains three occurrences per file by design: the named import, the call site, and a trailing clarifying comment ("...withDocsAtClose's finally still removes the temp dir").
- **Fix:** Replicated the tracer's exact shape (as Task 1's read_first explicitly instructed) rather than stripping the import-line reference or the trailing comment to force an artificial count of 1 -- doing so would have been a structural regression from the proven, already-committed template.
- **Files modified:** same four files as above
- **Verification:** `grep -c withDocsAtClose scripts/validation/v1.15-milestone-audit.mjs` also returns 3 (measured), confirming this is the established shape, not a new divergence introduced by this plan.
- **Committed in:** `35c0b177`, `3df3805a`

---

**Total deviations:** 2 auto-fixed (both Rule 1 -- premises in the plan text did not hold against measured data; the guard's protective intent and the five-leg structural-uniformity intent are both fully satisfied by the applied fix).
**Impact on plan:** No scope creep. Both deviations mirror the precedent 153-01 already established and recorded for V115; this plan generalizes that precedent to the remaining four legs and documents it explicitly rather than silently deviating.

## Issues Encountered

None beyond the deviations documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The identical-leg set is now complete: five C17-bearing harnesses (v1.15-v1.19) converted to frozen-corpus (cwd-swap) mode, `c17-eee-contract.mjs` byte-unchanged, every existence guard live, every leg exits 0 against its own frozen corpus, and the five legs are proven structurally uniform (not merely asserted).
- 153-03 (the v1.20 full SWEEP-05 conversion, the sixth and structurally different harness per D-09) can now proceed independently -- its own plan and dedicated task, per the deviation note at the top of this plan.
- No blockers. All plan-level `<verification>` commands pass: all five harnesses v1.15-v1.19 exit 0 with C17 PASS, `check-phase-140.mjs` exits 0, `c17-eee-contract.mjs` and `check-phase-140.mjs` are both byte-unchanged since `246fa3dd`, and exactly four files are modified by this plan.

## Self-Check: PASSED

All 4 modified files confirmed present on disk; both task commits (`35c0b177`, `3df3805a`) confirmed in `git log`; all plan-level `<verification>` commands re-run and PASS.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-29*
