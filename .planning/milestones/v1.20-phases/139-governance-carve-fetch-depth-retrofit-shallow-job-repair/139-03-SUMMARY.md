---
phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
plan: 03
subsystem: infra
tags: [frozen-read, fail-loud, git-plumbing, chain-validator-tooling, gov-02, shallow-clone]

requires:
  - phase: 139-02
    provides: "lsTreeAtClose + frozenCause six-pattern typed classifier + --self-test on _lib/frozen-at-close.mjs"
provides:
  - "check-phase-49.mjs (V-49-18/19/21) + check-phase-51.mjs (readTreeFrozen): four SWEEP-03 sites fail loud instead of swallowing to null/\"\""
  - "D-42 region-scoped V-68-01 gate proving check-phase-51.mjs's readFile() CRLF normalization survives, read at runtime from check-phase-68.mjs (not transcribed)"
  - "scripts/validation/frozen-read-negative-test.mjs: real file:// depth-1 shallow-clone negative harness, 7/7 assertions, proving all three D-31 causes plus validator-level fail-loud proof"
  - "v1.20-CARVE.md Category 9 amendment authorizing the new harness"
affects: [140-frozen-aware-harness-conversion, 141-standalone-red-validator-set]

actuals:
  tokens: 6800
  tasks: 2
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Fail-loud frozen read: delete the inline try/catch around readAt*Close so the throw propagates to the runner's existing outer catch (already formats one FAIL row) -- no per-site message formatting needed"
    - "Region-scoped regex gate: read a sibling validator's pinned regex literal at runtime (never transcribe -- escaping mismatches silently break a hand copy) and apply it to a function body extracted by boundary, not the whole file, when the same pattern also occurs elsewhere in that file"
    - "file:// is mandatory for any local shallow-clone test; a bare local path silently ignores --depth and produces a full (non-shallow) clone -- hard-guard .git/shallow before trusting anything else"
    - "Testing the frozen-read classifier against a REACHABLE ref inside a depth-1 clone: commit throwaway fixtures locally inside the clone so the clone's own original HEAD becomes an 'older, still-reachable' SHA relative to a new local commit -- this exercises absent-path's second sub-pattern without needing external history"

key-files:
  created:
    - scripts/validation/frozen-read-negative-test.mjs
  modified:
    - scripts/validation/check-phase-49.mjs
    - scripts/validation/check-phase-51.mjs
    - .planning/milestones/v1.20-CARVE.md
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "The new harness file is off-list under the current v1.20-CARVE allowlist (no category covers a generic new scripts/validation/*.mjs file) -- landed a D-09 amendment commit (Category 9, touching ONLY v1.20-CARVE.md) before the file-creation commit, per the amendment procedure."
  - "Reworded the plan's suggested 'Honest-accounting: 139-03-SUMMARY.md' comment text to 'Accounting record: 139-03-SUMMARY.md' in all four new comments -- the plan's own acceptance criteria require the file's 'Honest-accounting' grep count to stay UNCHANGED from its pre-edit value (2 in check-phase-49.mjs, 1 in check-phase-51.mjs), and the literal phrase would have inflated both counts."
  - "Verification-method clarification (mirrors the 139-02 note for check-phase-73.mjs): bare 'node scripts/validation/check-phase-68.mjs' has a PRE-EXISTING 24 PASS/9 FAIL result, unrelated to this plan's edit -- the 9 FAILs are its own CHAIN-48/CHAIN-60..66 regression-guards replaying the standalone-red validator set {48,60-66}, scoped to Phases 141-142. Confirmed identical before and after this plan's edit. Used 'CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-68.mjs' (12 PASS/0 FAIL/21 SKIPPED, matching the 139-02 baseline figure) to confirm V-68-01/V-68-10/V-68-11 specifically, per the plan's own acceptance-criteria intent."
  - "Case 3 of the D-31 negative harness (present-on-disk-absent-at-frozen-SHA) and the empty-file boundary both needed a REACHABLE ref inside the depth-1 clone that predates a newer commit -- since a depth-1 clone contains exactly one reachable commit at clone time, the harness commits two throwaway fixture files locally inside the clone, making the clone's original HEAD the 'older reachable SHA' relative to the new commit. This is self-contained and does not depend on any specific corpus file's history."

requirements-completed: [SWEEP-03, GOV-02]

coverage:
  - id: D1
    description: "Four SWEEP-03 sites (check-phase-49.mjs V-49-18/19/21, check-phase-51.mjs readTreeFrozen) fail loud -- inline try/catch deleted, throw propagates to the runner's outer catch; the two wrong-diagnosis 'file missing'/'does not exist' branches removed; five unrelated live-read guards and six unreachable-but-harmless V-51-06..11 null guards left untouched"
    requirement: "SWEEP-03"
    verification:
      - kind: integration
        ref: "node scripts/validation/check-phase-49.mjs (22 passed/0 failed/0 skipped, unchanged tally) and node scripts/validation/check-phase-51.mjs (25 passed/0 failed/0 skipped, unchanged tally)"
        status: pass
      - kind: unit
        ref: "grep -cE 'catch *\\{ *(content|androidContent) *= *(null|\"\") *\\}' check-phase-49.mjs == 0; grep -cE 'catch *\\{ *return null' check-phase-51.mjs == 0; grep -c 'File does not exist: ' check-phase-49.mjs == 5 (unchanged live-read guards)"
        status: pass
    human_judgment: false
  - id: D2
    description: "D-42 region-scoped V-68-01 gate: regex literal read at runtime from check-phase-68.mjs, applied only to check-phase-51.mjs's readFile() function body (1 hit) vs whole-file (2 hits, proving the region-scope is load-bearing since V-51-05 independently contains the same pattern)"
    requirement: "GOV-02"
    verification:
      - kind: unit
        ref: "node -e region-scoped extraction script: readFile() body hits=1, whole-file hits=2; CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-68.mjs (12 PASS/0 FAIL/21 SKIPPED) with V-68-01/V-68-10/V-68-11 all PASS"
        status: pass
    human_judgment: false
  - id: D3
    description: "scripts/validation/frozen-read-negative-test.mjs: real file:// depth-1 shallow clone, .git/shallow hard-guarded, proving all three D-31 causes (unreachable-sha, absent-path both sub-patterns) plus the non-throwing empty-file boundary plus lsTreeAtClose's throw-not-[] behaviour plus validator-level fail-loud proof for both edited files"
    requirement: "SWEEP-03"
    verification:
      - kind: integration
        ref: "node scripts/validation/frozen-read-negative-test.mjs (7/7 PASS, exit 0); no temp clone residue after run"
        status: pass
    human_judgment: false
  - id: D4
    description: "carve-gate.mjs and the apex stay green across every commit; GOV-02 ledger carries a row per edited/created frozen-surface path"
    verification:
      - kind: integration
        ref: "node scripts/validation/carve-gate.mjs exits 0 after every task commit (5 in-scope paths, all on-list); CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-138.mjs reports 2 PASS/0 FAIL/91 SKIPPED"
        status: pass
    human_judgment: false

duration: 25min
completed: 2026-08-05
status: complete
---

# Phase 139 Plan 03: Fail-loud frozen reads (SWEEP-03) + file:// negative harness Summary

**Four silent-swallow frozen-read sites in check-phase-49.mjs/check-phase-51.mjs now propagate their throw instead of masking the real git cause, proven end-to-end by a real `file://` depth-1 shallow-clone harness with 7/7 assertions and a D-42 region-scoped gate.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-08-05T14:30:00Z (approx.)
- **Completed:** 2026-08-05T14:35:32Z
- **Tasks:** 2
- **Files modified:** 5 (1 created, 4 modified)

## Accomplishments

- `check-phase-49.mjs`'s three sites (V-49-18's per-file loop, V-49-19's sibling-term scan, V-49-21's reciprocal-link check) and `check-phase-51.mjs`'s `readTreeFrozen` now let the `readAt*Close` throw propagate to the runner's existing outer catch, which already formats it as one honest FAIL row -- no per-site message formatting added. The two wrong-diagnosis detail strings ("file missing" for an unreachable SHA, "does not exist" for the same) are gone.
- A D-42 region-scoped gate confirms `check-phase-51.mjs`'s `readFile()` CRLF normalization survives the edit: the `V-68-01` regex was read at runtime directly from `check-phase-68.mjs`'s source text (never transcribed) and applied ONLY to `readFile()`'s function body (1 hit), proven meaningfully scoped by also showing 2 hits whole-file (the same pattern independently exists inside `V-51-05`).
- `scripts/validation/frozen-read-negative-test.mjs` created: a real `git clone --depth 1 file://<repo-root>` clone, hard-guarded on `.git/shallow` existing, proving all three D-31 causes (unreachable-sha; absent-path via both the "does not exist in" and "exists on disk, but not in" sub-patterns), the non-throwing empty-file boundary, `lsTreeAtClose`'s throw-never-`[]` behaviour, and -- the actual point of SWEEP-03 -- that `check-phase-49.mjs` and `check-phase-51.mjs` now exit non-zero inside the shallow clone with `unreachable-sha` visible in their output, where before this plan they silently reported the corpus documents as absent.
- GOV-02 discipline followed throughout: target-scoped grep-before-edit for both edited files (path literal + symbol + every detail string about to be removed) confirmed no frozen call-site conflict; the new harness file, being off-list under the current CARVE allowlist, got a dedicated D-09 amendment commit (Category 9) landed before its own creation commit.

## Task Commits

1. **Task 1: Grep-before-edit, region-scoped V-68-01 gate, and the four fail-loud sites** - `f06a41df` (fix)
2. **CARVE amendment (Category 9, D-09 procedure)** - `1bf0a65f` (docs)
3. **Task 2: file:// shallow-clone negative harness — three cases plus validator-level proof** - `202d11b3` (test)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `scripts/validation/check-phase-49.mjs` - Three fail-loud sites (V-49-18/19/21); two wrong-diagnosis branches deleted
- `scripts/validation/check-phase-51.mjs` - `readTreeFrozen` fail-loud; six downstream null guards deliberately left in place (unreachable, harmless)
- `scripts/validation/frozen-read-negative-test.mjs` - New standalone CLI harness (never a chain validator); real `file://` shallow clone, 7 numbered assertions
- `.planning/milestones/v1.20-CARVE.md` - Category 9 amendment authorizing the new harness path
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - Two new rows: Task 1's grep-before-edit + regression evidence, Task 2's harness creation + 7/7 assertion evidence

## Decisions Made

- D-09 amendment procedure applied for the first time this milestone against a genuinely new (not pre-listed) path: a standalone commit touching only `v1.20-CARVE.md`, adding Category 9, landed before the harness file's own creation commit.
- Reworded the plan's suggested "Honest-accounting: 139-03-SUMMARY.md" comment text to "Accounting record: 139-03-SUMMARY.md" throughout the four new inline comments in `check-phase-49.mjs`/`check-phase-51.mjs` — the plan's own acceptance criteria pin the file's `Honest-accounting` grep count to its pre-edit value (2 and 1 respectively), and the literal phrase would have inflated both counts. The citation to this SUMMARY is preserved; only the trigger phrase changed.
- Verification-method clarification (mirrors 139-02's note for `check-phase-73.mjs`): bare `check-phase-68.mjs` has a pre-existing 24 PASS/9 FAIL result caused by its own `CHAIN-48`/`CHAIN-60..66` regression-guards replaying the standalone-red validator set, scoped to Phases 141-142 — unrelated to and unchanged by this plan's edit. Used `CHECK_PHASE_NESTED=1` to isolate and confirm `V-68-01`/`V-68-10`/`V-68-11` specifically (12 PASS/0 FAIL/21 SKIPPED), matching the 139-02 baseline figure exactly.
- The negative harness's Case 3 (present-on-disk-absent-at-frozen-SHA) and the empty-file non-throwing boundary both needed a reachable ref that is "older" than another reachable ref inside the depth-1 clone. Since a depth-1 clone contains exactly one reachable commit at clone time, the harness commits two throwaway fixture files locally inside the clone (with local `git config user.email`/`user.name`), making the clone's original HEAD the "older reachable SHA" relative to the new local commit — self-contained, no dependency on any specific corpus file's real history.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed the literal `CHAIN_PHASES` string and non-literal `.git/shallow` path from the new harness's own header/guard**
- **Found during:** Task 2 (acceptance-criteria grep checks)
- **Issue:** The harness's header comment used the literal phrase "CHAIN_PHASES array" (tripping the plan's own `grep -c 'CHAIN_PHASES' == 0` acceptance criterion), and the `.git/shallow` hard guard was built via `join(cloneDir, '.git', 'shallow')` (three separate arguments), which does not contain the literal substring `.git/shallow` the acceptance criterion greps for.
- **Fix:** Reworded the header comment to "apex chain-member array" (no literal token); changed the guard to `join(cloneDir, '.git/shallow')` (single literal path segment).
- **Files modified:** `scripts/validation/frozen-read-negative-test.mjs`
- **Verification:** `grep -c 'CHAIN_PHASES'` returns 0; `grep -cE "'\.git/shallow'|\"\.git/shallow\""` returns 1.
- **Committed in:** `202d11b3` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 self-referential-literal bug, same class as the one found in 139-01)
**Impact on plan:** Required for the plan's own stated acceptance criteria to pass; no design change, no scope creep.

## Issues Encountered

None beyond the deviation and verification-method clarification documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All four SWEEP-03 fail-loud sites are live and proven end-to-end by a real shallow-clone harness; the two remaining validators touching Phase 139 (`check-phase-69.mjs`/`check-phase-70.mjs` `PRED_BLOBS` → frozen-to-frozen, D-19) are next per D-41 atom order (Wave 4).
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` now carries rows for all four frozen-surface edits/creations landed so far in this milestone (ROADMAP/REQUIREMENTS, `_lib/frozen-at-close.mjs` ×2, `check-phase-49/51.mjs`, `frozen-read-negative-test.mjs`).
- The remaining ~34 silent-swallow frozen-read sites are recorded as SWEEP-09 against Phase 141 (D-33) — out of scope here, not touched.
- No blockers.

---
*Phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair*
*Completed: 2026-08-05*

## Self-Check: PASSED

All created/modified files verified present on disk; all 3 task commit hashes (`f06a41df`, `1bf0a65f`, `202d11b3`) verified in `git log --oneline --all`.
