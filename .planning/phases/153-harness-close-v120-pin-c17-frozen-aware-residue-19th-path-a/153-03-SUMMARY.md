---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 03
subsystem: infra
tags: [validation-harness, frozen-read, git-object-store, milestone-close, c17-eee-contract, scope-amendment]

# Dependency graph
requires:
  - phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
    provides: withDocsAtClose helper, the proven cwd-swap conversion pattern, and the five-leg v1.15-v1.19 conversion (153-01 tracer + 153-02)
provides:
  - the owner-ruled six-not-five scope amendment (D-08), recorded as an inline [SUCCESS-CRITERION AMENDMENT, D-08] marker across all seven stale surfaces (REQUIREMENTS.md, ROADMAP.md SC#2, PROJECT.md x4 sites, v1.20-MILESTONE-AUDIT.md, v1.20-DEFERRED-CLEANUP.md heading+body, 144-CONTEXT.md)
  - v1.20-milestone-audit.mjs's full C1-C16 corpus + sidecar conversion to frozen reads at V120 (the sixth and structurally different harness, D-09)
  - v1.20's C17 leg converted to the same cwd-swap mechanism as its five siblings, with its own V120 known-member guard
  - the pre-conversion commit and blob hash of v1.20-milestone-audit.mjs, recorded for the next plan's Path-A copy source (D-45)
  - all six C17-bearing harnesses (v1.15-v1.20) proven green in one sequence
affects: [153-04]

actuals:
  tokens: 11735
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "full-corpus conversion via createFrozenCorpusReader (tag-parameterized, not the per-milestone readAtVxxClose/lsTreeAtVxxClose convenience wrappers) for a harness whose C1-C16 checks dynamically walk docs/ subtrees (androidDocPaths/linuxDocPaths/appleBusinessDocPaths + walkMd) -- the established v1.19-milestone-audit.mjs precedent from Phase 144, not the check-phase-67/68/70.mjs single-fixed-path shape"
    - "inline [SUCCESS-CRITERION AMENDMENT, D-NN] marker on a stale requirement/criterion/prose surface, adding text and preserving every already-measured literal rather than rewriting it"

key-files:
  created: []
  modified:
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/PROJECT.md
    - .planning/milestones/v1.20-MILESTONE-AUDIT.md
    - .planning/milestones/v1.20-DEFERRED-CLEANUP.md
    - .planning/milestones/v1.20-phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-CONTEXT.md
    - scripts/validation/v1.20-milestone-audit.mjs

key-decisions:
  - "The literal readAtV120Close/lsTreeAtV120Close convenience-wrapper names are NOT used for the C1-C16 corpus conversion, contrary to the plan's read_first pointer to check-phase-67/68/70.mjs's shape -- the actual established precedent for THIS exact file shape (androidDocPaths/linuxDocPaths/appleBusinessDocPaths dynamic subtree walking + walkMd + readFile) is v1.19-milestone-audit.mjs's own Phase-144 conversion, which uses the tag-parameterized createFrozenCorpusReader('V119', ...) instead. v1.20 mirrors that real precedent byte-for-byte in helper shape (substituting V120/v1.20-audit-allowlist.json), not the plan's more abstract description."
  - "The V120 known-member guard cannot distinguish V120 from V119 by path presence -- git ls-tree comparison confirms their docs/ trees are BYTE-IDENTICAL (296 entries, zero diff) -- so it targets V118 (the nearest actually-differing predecessor) with docs/recipes/03-windows-11-multi-app-kiosk.md, the same path v1.19's own C17 leg (converted in 153-02) already uses for the identical reason."
  - "Task 2's scope amendment preserves every already-measured literal (the five-corpora verification counts, the per-milestone enrolled-file counts) rather than rewriting them -- new sentences are appended stating the widened scope and the 8-vs-7 contract-reference delta, never deleting the prior record."

requirements-completed: [HARN-03]

coverage:
  - id: D1
    description: "Owner-ruled six-not-five scope amendment recorded as an inline [SUCCESS-CRITERION AMENDMENT, D-08] marker across all seven stale surfaces named in CONTEXT.md D-08, with every already-measured literal preserved"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "grep -rln 'SUCCESS-CRITERION AMENDMENT, D-08' .planning/ (6 files hit: REQUIREMENTS.md, ROADMAP.md, PROJECT.md, v1.20-MILESTONE-AUDIT.md, v1.20-DEFERRED-CLEANUP.md, 144-CONTEXT.md)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs (32 passed, 0 failed, 0 skipped both before and after -- no regression)"
        status: pass
      - kind: other
        ref: "git diff .planning/REQUIREMENTS.md -- HARN-03 checkbox stays [ ] unchecked (no status-row flip)"
        status: pass
    human_judgment: false
  - id: D2
    description: "v1.20-milestone-audit.mjs's C1-C16 corpus and sidecar reads converted from live-HEAD to frozen V120 reads via createFrozenCorpusReader, mirroring the v1.19 Phase-144 precedent"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.20-milestone-audit.mjs --verbose (16 passed, 0 failed, 0 skipped, identical to the pre-conversion triple)"
        status: pass
      - kind: other
        ref: "grep -c frozen-at-close scripts/validation/v1.20-milestone-audit.mjs (3, was 0 at phase base)"
        status: pass
    human_judgment: false
  - id: D3
    description: "v1.20's C17 leg converted to the same cwd-swap mechanism as v1.15-v1.19, guarded by a milestone-unique known-member path; all six C17-bearing harnesses run green in one sequence"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.20-milestone-audit.mjs --verbose (C17 line PASS, detail names frozen V120 corpus, 296 files materialized)"
        status: pass
      - kind: other
        ref: "all six v1.1{5,6,7,8,9}/v1.20-milestone-audit.mjs run in sequence, all exit 0, all 16 passed/0 failed/0 skipped"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-140.mjs (5 passed, 0 failed, 0 skipped -- V-140-C17CARVEOUT still PASS)"
        status: pass
      - kind: other
        ref: "git diff 246fa3dd..HEAD -- scripts/validation/c17-eee-contract.mjs and check-phase-140.mjs (both empty -- byte-unchanged)"
        status: pass
    human_judgment: false

duration: 55min
completed: 2026-08-29
status: complete
---

# Phase 153 Plan 03: V120 Six-Harness Scope Amendment & Full Sixth-Harness Conversion Summary

**Landed the owner-ruled six-not-five HARN-03 scope amendment across all seven stale surfaces, then converted v1.20-milestone-audit.mjs's entire corpus (not just its C17 leg) to frozen V120 reads, proving all six C17-bearing harnesses (v1.15 through v1.20) green in one sequence.**

## Performance

- **Duration:** ~55 min
- **Completed:** 2026-08-29
- **Tasks:** 3 (Task 1 was a checkpoint resolved by the user before this continuation started)
- **Files modified:** 7

## Accomplishments
- `[SUCCESS-CRITERION AMENDMENT, D-08]` landed on all seven surfaces the phase context enumerated: `REQUIREMENTS.md` HARN-03, `ROADMAP.md` Phase 153 Success Criterion 2 (the criterion the verifier scores), `PROJECT.md` at four sites (the status paragraph, Pillar H, and two milestone-history footer paragraphs), `v1.20-MILESTONE-AUDIT.md`'s Part A residue sentence, `v1.20-DEFERRED-CLEANUP.md`'s deferred-item heading and both in-body occurrences, and the predecessor Phase 144's own `144-CONTEXT.md` D-02 record — every already-measured literal (the five-corpora counts, the per-milestone enrolled-file counts) preserved intact, new sentences added rather than rewritten
- Grepped `scripts/validation/` for the deferred-cleanup heading string before editing it (D-79): only a non-assertion comment reference exists in `_lib/frozen-at-close.mjs`, so no frozen validator pins the heading verbatim — safe to edit
- `v1.20-milestone-audit.mjs`'s C1-C16 checks (`androidDocPaths`/`linuxDocPaths`/`appleBusinessDocPaths` + `walkMd` + `readFile` + the sidecar allowlist parser) repointed from live `fs.readFileSync`/`readdirSync` to `createFrozenCorpusReader('V120', { extraPaths: [SIDECAR_PATH] })`, mirroring the already-shipped `v1.19-milestone-audit.mjs` conversion from Phase 144 byte-for-byte in helper shape
- The pre-conversion commit (`834418a2b4f7807a0bb839a63995312bd126e669`) and blob hash (`9b0e77240a3bf96fc94547273914e52f9c12fa76`) of `v1.20-milestone-audit.mjs` recorded **before** any edit landed, per D-45 — this is the correct Path-A copy source for `v1.21-milestone-audit.mjs`
- `v1.20`'s C17 leg converted to the `withDocsAtClose('V120', ...)` cwd-swap: `CONTRACT` absolutized before the swap, the `existsSync` guard stays live against the repo root, a V120-unique known-member guard runs before the spawn, and a non-zero materialized-count assertion runs as the secondary guard
- All six C17-bearing harnesses (v1.15-v1.20) run in one sequence, all exit 0 at 16 passed / 0 failed / 0 skipped, all with C17 PASS against their own frozen corpora
- `c17-eee-contract.mjs` and `check-phase-140.mjs` both remain byte-unchanged since `246fa3dd`; `check-phase-140.mjs`'s `V-140-C17CARVEOUT` check still PASSes (its assertion body — a bare `.includes('c17-eee-contract')` — survives all six conversions; its name and detail string go false-but-permanently-green per D-20, corrected additively in a successor validator authored in the apex plan, never by editing this frozen file)

## Task Commits

Each task was committed atomically:

1. **Task 1: The six-not-five scope amendment checkpoint** — resolved by the user (`amend-all-seven`) before this continuation agent started; no commit of its own.
2. **Task 2: The six-not-five scope amendment across all seven stale surfaces** - `834418a2` (feat)
3. **Task 3: Capture the pre-conversion form, then convert every C1-C16 corpus read to the frozen readers** - `63933928` (feat)
4. **Task 4: Convert the sixth C17 leg and prove the six-harness set green** - `de304cc7` (feat)

_No plan-metadata commit yet — SUMMARY/STATE/ROADMAP land in the next commit per the executor's standard close-out order._

## Files Created/Modified
- `.planning/REQUIREMENTS.md` - HARN-03 widened to six harnesses, `[SUCCESS-CRITERION AMENDMENT, D-08]` marker added, existing five-corpora measured literal preserved
- `.planning/ROADMAP.md` - Phase 153 Success Criterion 2 (the criterion the verifier scores) widened to six harnesses, names v1.20 as the sixth
- `.planning/PROJECT.md` - four sites amended: the milestone status paragraph, Pillar H's own text (two "five" occurrences), and both the Active-milestone and the long footer paragraph
- `.planning/milestones/v1.20-MILESTONE-AUDIT.md` - Part A residue sentence gets a trailing correction note (the original "5 of the 5" text is historically accurate for v1.20's own close and is preserved, not rewritten)
- `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` - the `C17-FROZEN-AWARE-RESIDUE-V15-V19` heading widened to "All Six ... (V15-V20)" with the amendment marker, plus both in-body occurrences of the count amended
- `.planning/milestones/v1.20-phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-CONTEXT.md` - D-02's residue statement gets a trailing correction note, original literal preserved
- `scripts/validation/v1.20-milestone-audit.mjs` - full SWEEP-05 conversion: C1-C16 corpus/sidecar reads frozen at V120 (Task 3), C17 leg converted to the cwd-swap mechanism with a V120 known-member guard (Task 4)

## Decisions Made

- **`createFrozenCorpusReader` over the `readAtV120Close`/`lsTreeAtV120Close` convenience wrappers** — see Deviations below; this is the load-bearing structural choice for Task 3.
- **Known-member guard targets V118, not V119** — the docs/ trees of V119 and V120 are byte-identical (296 entries, zero diff via `git ls-tree`), so no path can distinguish V120 from its immediate predecessor by presence. The guard reaches one step further back to `docs/recipes/03-windows-11-multi-app-kiosk.md`, added at the V118→V119 boundary, matching the identical resolution v1.19's own leg already uses (converted in 153-02) for the same reason.
- **Historical predecessor documents amended by trailing correction note, not in-place rewrite** — `v1.20-MILESTONE-AUDIT.md`'s Part A sentence and `144-CONTEXT.md`'s D-02 both preserve their original "5 of the 5" literal (historically accurate for their own close/authoring time) and append a `[SUCCESS-CRITERION AMENDMENT, D-08]` note stating the v1.21 widening — mirroring the precedent already visible elsewhere in `PROJECT.md` (`**[SUCCESS-CRITERION AMENDMENT, D-25]**` correcting a stale footer figure without rewriting it).
- **The `v1.20-DEFERRED-CLEANUP.md` heading is amended in place** (not by trailing note) because, unlike the other two historical documents, this file's deferred-item entry is the ACTIVE backlog descriptor being resolved by this very phase — its heading stating "Five" while the phase converts six would be a live contradiction, not a historical record.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Corrected assumption] `readAtV120Close`/`lsTreeAtV120Close` convenience-wrapper names do not appear in the converted file — the established precedent uses the tag-parameterized API instead**
- **Found during:** Task 3 (converting the C1-C16 corpus reads)
- **Issue:** The plan's read_first and PATTERNS.md both point to `check-phase-67/68/70.mjs`'s shape — which calls `readAtV17Close`/`readCorpusFileAtV17Close` for a small set of FIXED individual file paths — as the "same call shape this file's C1-C16 checks must adopt." An acceptance criterion literally greps for `readAtV120Close\|lsTreeAtV120Close` and expects a count greater than 1. But `v1.20-milestone-audit.mjs`'s C1-C16 checks dynamically walk entire `docs/` subtrees via `androidDocPaths()`/`linuxDocPaths()`/`appleBusinessDocPaths()` + `walkMd()` — a structurally different read pattern than a handful of fixed paths. The actual, already-shipped precedent for THIS exact file shape is `v1.19-milestone-audit.mjs`'s own Phase-144 conversion, which uses `createFrozenCorpusReader('V119', { extraPaths: [SIDECAR_PATH] })` — a helper that internally calls the tag-parameterized `lsTreeAtClose`/`readManyAtClose`, never the per-milestone convenience wrapper function names.
- **Fix:** Mirrored `v1.19-milestone-audit.mjs`'s real converted shape byte-for-byte in helper structure (substituting `V120`/`v1.20-audit-allowlist.json`), using `createFrozenCorpusReader` rather than forcing the literal wrapper names into the file. Re-implementing `androidDocPaths()`/`linuxDocPaths()`/`appleBusinessDocPaths()`/`walkMd()` against raw per-call `lsTreeAtClose`/`readAtClose` invocations would have duplicated logic `createFrozenCorpusReader` already centralizes, and would diverge from the one real analog this repo has for this exact problem shape.
- **Files modified:** `scripts/validation/v1.20-milestone-audit.mjs`
- **Verification:** `grep -c "frozen-at-close" scripts/validation/v1.20-milestone-audit.mjs` = 3 (>= 1, satisfied); `grep -c "createFrozenCorpusReader\|lsTreeAtClose\|readManyAtClose"` = 2; the harness triple is unchanged before/after (16 passed, 0 failed, 0 skipped both times) — the substituted mechanism is functionally equivalent and structurally proven, just under different literal names than the plan's acceptance criterion anticipated.
- **Committed in:** `63933928` (Task 3 commit)

**2. [Rule 1 - Corrected assumption] The V120 known-member guard cannot distinguish V120 from V119 — the plan's "present in V120, absent from V119" instruction is unsatisfiable**
- **Found during:** Task 4 (deriving the V120 known-member path)
- **Issue:** Task 4's acceptance criteria require the guard path proven "present in the V120 tree and absent from the V119 tree by quoted `git ls-tree` results." Measured comparison (`diff <(git ls-tree -r --name-only a7bda73e -- docs | sort) <(git ls-tree -r --name-only 246fa3dd -- docs | sort)`) shows V119's and V120's `docs/` trees are byte-identical — 296 entries each, zero diff. No path exists that is present in V120 and absent from V119.
- **Fix:** Applied the identical resolution 153-02 already established for the V116/V117/V119/V120 plateau cases, and which v1.19's own leg comment (converted in 153-02) already documents for this exact V119=V120 pair: the guard reaches one step further back to `docs/recipes/03-windows-11-multi-app-kiosk.md`, present in V120 (via the V119=V120 plateau) and absent from V118 (the nearest actually-differing predecessor).
- **Files modified:** `scripts/validation/v1.20-milestone-audit.mjs` (guard comment documents the finding inline, quoting the `git ls-tree` evidence)
- **Verification:** `git ls-tree 7af8a147 -- docs/recipes/03-windows-11-multi-app-kiosk.md` returns empty (absent from V118); `git ls-tree 246fa3dd -- docs/recipes/03-windows-11-multi-app-kiosk.md` returns the blob (present in V120); the harness's C17 line PASSes with this guard in place.
- **Committed in:** `de304cc7` (Task 4 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — premises in the plan text did not hold against measured data; the protective intent of each acceptance criterion — a real frozen-read mechanism, and a guard proven to catch a wrong-milestone materialization — is fully satisfied by the applied fix, just via different literal names/paths than the plan text anticipated).
**Impact on plan:** No scope creep. Both deviations mirror precedents already established in this same phase (153-01, 153-02) and in the real codebase (`v1.19-milestone-audit.mjs`'s own Phase-144 conversion). The V120→V118 known-member resolution is not a new pattern — it is the same one v1.19's leg (converted in 153-02) already uses for the identical measured reason.

## Issues Encountered

None beyond the deviations documented above.

## Ordinal Distinction on the Record (D-10)

Converting v1.20's harness (this plan) is the **eighteenth** application of the frozen-aware pattern — 17 of 18 harnesses already imported `_lib/frozen-at-close.mjs` before this plan (per `144-CONTEXT.md:57` and `v1.20-MILESTONE-AUDIT.md:42`), and v1.20 is the last. **Nineteenth** is a different sequence entirely: the Path-A *lineage* ordinal for `v1.21-milestone-audit.mjs` (`ROADMAP.md` SC#3), authored in the next plan (153-04). Both ordinals are real; the eighteenth counts frozen-aware conversions, the nineteenth counts Path-A harness lineage bumps.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All six C17-bearing harnesses (v1.15-v1.20) are frozen-aware end to end — both corpus and C17 leg — and the owner-ruled scope amendment is on the record across every stale surface.
- 153-04 can now fork `v1.21-milestone-audit.mjs` from the recorded pre-conversion source: `git show 834418a2b4f7807a0bb839a63995312bd126e669:scripts/validation/v1.20-milestone-audit.mjs` — the UNCONVERTED form, per D-45. Copying the post-Task-3/4 form on disk today would make the new v1.21 harness audit v1.20's frozen corpus instead of its own live one.
- No blockers. All plan-level `<verification>` commands pass: all six harnesses exit 0 with C17 PASS; `check-phase-54.mjs` exits 0 with no regression (32/32 both before and after); `check-phase-140.mjs` exits 0 (5/5); both `c17-eee-contract.mjs` and `check-phase-140.mjs` are byte-unchanged since `246fa3dd`; the pre-conversion commit and blob hash are recorded above.

## Self-Check: PASSED

All 7 modified files confirmed present on disk; all 3 task commits (`834418a2`, `63933928`, `de304cc7`) confirmed in `git log`; all plan-level `<verification>` commands re-run and PASS.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-29*
