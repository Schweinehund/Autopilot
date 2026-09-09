---
phase: 158-final-corpus-verification-publish-bundle
plan: 01
subsystem: docs-style-audit
tags: [git-history-audit, node-builtin-only, structural-gate, verify2, sweep3, discovery-audit, VERIFY-06]

# Dependency graph
requires:
  - phase: 156-style-extension-full-landing-verification
    provides: 156-GATE-BASELINE.json's after half (structural-gate values embedded for reference)
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    provides: 157-BASELINE.json (embedded for reference), the STD/HYG fix commits this phase audits
provides:
  - scripts/docs-style/audit-claimed-fixes.mjs (the row-schema git-history audit instrument, D-47)
  - scripts/docs-style/158-FIX-AUDIT.json + 158-FIX-AUDIT-RUN.txt (seeded 2-row tracer audit, committed run log)
  - 158-GATE-BASELINE.json's before half (fresh structural-gate measurement at 845218a4)
  - A triaged discovery-audit finding: three known-and-owned falsifications, zero unexpected ones
affects: [158-02, 158-03, 158-04, 158-05, 158-06, 158-07]

# Actuals (#2632)
actuals:
  tokens: 62000
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Argv-only git invocation (execFileSync, -- terminator, no shell string) for every git call in a new audit tool"
    - "git ls-tree existence guard before every occurrence count (git grep returns rc 1 identically for a bad pathspec and for zero matches)"
    - "git grep -o -F for directory-scoped occurrence counts (never -c, which sums matching lines and undercounts a line carrying the needle twice)"
    - "Whitespace-collapsed git show <rev>:<path> blob join for file/wrapped/secret rows (catches a needle broken across a line wrap, which a pickaxe cannot see)"
    - "Secret-row evidence via exactly-one-removed-content-line at the fix commit, never a literal occurrence count"
    - "os.tmpdir() git-repo self-test fixture (guard-docx.mjs's tmpdir shape extended to git init)"

key-files:
  created:
    - scripts/docs-style/audit-claimed-fixes.mjs
    - scripts/docs-style/158-FIX-AUDIT.json
    - scripts/docs-style/158-FIX-AUDIT-RUN.txt
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-GATE-BASELINE.json
  modified:
    - .planning/STATE.md

key-decisions:
  - "fix_sha for the flagship KEEP row is af678f0c (the commit that landed this file's current tracked state into this branch's history), not the RESUME-cited f30c37b/dc7e996 -- both scratch-corpus commits predate the merge and are not ancestors of HEAD, so they cannot serve as a row's fix_sha within the resolved range."
  - "LINE COUNT DIFFERS resolved as 14 at 845218a4, not CONTEXT.md's 21 -- this session's live run is verbatim and reproducible; 21 is not reproducible by any command recorded anywhere in this repository and is superseded per this milestone's own 'a written record is not evidence' principle."
  - "embedded_156 carries Phase 156's own AFTER half (not its before half); embedded_157 carries the whole 157-BASELINE.json. Neither is treated as Phase 158's own before -- that is measured fresh in this task (D-19)."
  - "Task 3's discovery audit ran two additional real claims (HYG-04 citation-date, HYG-05 group-limit misattribution) through the mechanized audit tool in a scratch, uncommitted location, beyond Task 1's two tracer rows -- broadening genuine mechanized coverage rather than relying only on grep."
  - "The negative-control recovery of the removed host label (077b29b7) checked BOTH of the commit's two candidate removed lines rather than picking one by a token-novelty tiebreak (the exact trap D-31 names) -- both are proven absent from every tracked Phase 158 artifact and both prove a working positive control, without ever printing either literal."

patterns-established:
  - "Pattern: an audit row's 'parent' always means that row's own fix_sha^, never the audit range's overall range.from -- each claim has its own commit context."
  - "Pattern: a scratch-copy-of-N-target-files reading for a rule-set sweep (apply-then-restore precedent) generalizes to a plain dry-run sum when no --apply is ever used."

requirements-completed: []

coverage:
  - id: D1
    description: "The claimed-fix audit instrument (audit-claimed-fixes.mjs) is built, self-tested against a temporary git repository with both LF and CRLF blobs, and drives two real claims (the flagship KEEP count and the wrapped-citation replace) end to end through the row schema to a committed run log."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "node scripts/docs-style/audit-claimed-fixes.mjs --self-test (4 passed, 0 failed)"
        status: pass
      - kind: other
        ref: "node scripts/docs-style/audit-claimed-fixes.mjs --rows scripts/docs-style/158-FIX-AUDIT.json --log scripts/docs-style/158-FIX-AUDIT-RUN.txt (2/2 rows PASS, exit 0)"
        status: pass
      - kind: other
        ref: "python negative-control perturbation: incrementing the flagship's expected count by 1 drives a non-zero exit"
        status: pass
    human_judgment: false
  - id: D2
    description: "158-GATE-BASELINE.json's before half is measured fresh at a named SHA (845218a4): c17, the apex, nav-hub, verify2 (BASE d0b611e8), the pin differ and check-prose-style all re-run live, with embedded_156/embedded_157 recorded for reference (not consumed as this phase's own before)."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "python assertion script over 158-GATE-BASELINE.json: all 16 phase_baseline keys present, apex fail=0, c17 violations=0, LCD count matches its file list, drift=[], after=null"
        status: pass
      - kind: other
        ref: "python assertion script: every before.* entry with a cmd key also carries an args list (no shell-string command recorded)"
        status: pass
      - kind: other
        ref: "node archive-path.mjs resolver check: live suffix resolves, bogus suffix resolves null"
        status: pass
    human_judgment: false
  - id: D3
    description: "The uncommitted discovery audit enumerates all seven claim surfaces D-03 names, classifies 'corrected to X' claims, and triages every falsification found: three known-and-owned (EEE-SOP-standard.md:662, REQUIREMENTS.md:80 HYG-06 count, docs/_glossary-linux.md:143 cross-reference), zero unexpected. No WINDOWS.md row added -- an empty result recorded explicitly."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "git log --oneline 4e781fc5^..HEAD --grep='^fix(' reproduces 22 fix commits, 6 touching no docs/ path"
        status: pass
      - kind: other
        ref: "scratch discovery audit run (2 additional real claims: HYG-04 citation date, HYG-05 group-limit) via audit-claimed-fixes.mjs, both PASS, uncommitted"
        status: pass
      - kind: manual_procedural
        ref: "python negative-control script recovering both 077b29b7 candidate removed lines into memory only: 0 hits across 71 tracked Phase 158 artifacts, positive control fires for both"
        status: pass
    human_judgment: false

duration: 37min
completed: 2026-09-08
status: complete
---

# Phase 158 Plan 1: Build the Claimed-Fix Audit Instrument & Measure the Before Half Summary

**Built a node-builtin-only git-history audit tool (row schema, eight assertion ops, mandatory ls-tree existence guard, whitespace-collapsed blob counting), drove two real claims through it to a committed run log, measured the structural gate's before half fresh at a named SHA, and ran an uncommitted discovery audit finding zero unexpected falsifications beyond the three already known and owned.**

## Performance

- **Duration:** 37 min
- **Started:** 2026-09-08T05:19:40Z
- **Completed:** 2026-09-08T05:56:01Z
- **Tasks:** 3 (3 committed as 2 commits; Task 3 produced no file changes)
- **Files modified:** 5 (4 created, 1 modified)

## Accomplishments

- `scripts/docs-style/audit-claimed-fixes.mjs`: a ~450-line, Node-builtin-only (no npm dependency) git-history audit runner. Row schema with eight assertion ops (`present_at_parent`, `absent_at_parent`, `present_at_head`, `absent_at_head`, `count_at_head_eq`, `count_decreased_vs_parent`, `count_increased`, `introduced_then_removed`); a mandatory `git ls-tree` existence guard before every count (a bad pathspec returns the identical `rc 1` a genuine zero-match case does); `git grep -o -F` for directory-scoped counts (never `-c`, which undercounts a line carrying the needle twice — confirmed live in this session: `-c` sums 39 for a needle `-o` counts 42); a whitespace-collapsed `git show <rev>:<path>` blob join for file/wrapped/secret rows (the only form that sees a needle a source wrapped across a CRLF line break); vacuity and direction rejection so a row can never silently report PASS on a mismeasurement; a `--drift` attribution mode written now and exercised by plan 158-06; and a `--self-test` that builds a throwaway git repository under the OS temp directory with both LF and CRLF blobs and proves all four D-48 cases (including a secret-row evidence check that never reads or prints its own literal).
- Drove the instrument end to end: the flagship KEEP claim (`Create a local admin account` occurs exactly twice in `docs/admin-setup-macos/02-enrollment-profile.md`, asserted as a count, not a presence check, because presence alone was green throughout the original 30th-defect falsification) and the wrapped-citation replace claim (`Sure Administrator`, joined-blob parent count 2 → head count 0 — the exact claim `git log -S"Sure Administrator"` reports as never having happened, because it only ever existed as two whitespace-joined blob reads). Both PASS; a deliberately-perturbed expected count drives a non-zero exit, proving the assertion is not vacuous.
- Measured `158-GATE-BASELINE.json`'s before half fresh at `845218a4`: C17 (237 files, 0 violations), the bare apex `check-phase-153.mjs` (111 PASS, 0 FAIL, 0 SKIPPED), `check-nav-hub-links.mjs` (0/0), `verify2.py` against BASE `d0b611e8` (Part B `introducedBySweep 1`, the already-attributed D-18 blind-spot item; LINE COUNT DIFFERS resolved as **14**, not CONTEXT.md's 21 — this run's file list is verbatim and reproducible, 21 is not), the live-corpus pin differ (685 pinned, 0 lost/added vs. Phase 156's after-half live-pin file), and `check-prose-style.py` (clean). Embedded Phase 156's own after half and the whole of `157-BASELINE.json` for reference, explicitly not consumed as this phase's own before (D-19). Recorded the deterministic slice (sweep3 mechanical residual = 1, the citation-blocked permanent site; the 36-rule-set reading scoped to Phase 156's 13 targets = 0; the same 36-set reading unscoped over all of `docs/` = 50, reproducing D-17's figure exactly) and `check.py`'s total (10,427).
- Ran the uncommitted discovery audit over all seven claim surfaces D-03 names (fix commits, checked requirement lines, SUMMARY/VERIFICATION/REVIEW lines, gate-baseline notes, WINDOWS.md rows, prior-phase hand-offs, RESUME.md ruling tables), confirmed three known falsifications are still live and already owned by later plans, ran two additional real claims (HYG-04's citation-date fix, HYG-05's group-limit misattribution fix) through the mechanized audit tool as a scratch, uncommitted run, and ran a negative control recovering the removed host label from `077b29b7` into memory only — zero leaks across every tracked Phase 158 artifact, with a working in-memory positive control proving the check is not vacuous. No unexpected falsification found; no `.planning/WINDOWS.md` row added.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the claimed-fix audit instrument and drive two real claims end to end through it** - `845218a4` (feat)
2. **Task 2: Measure the structural gate's before half fresh at a named SHA** - `a4cfa1f4` (docs)
3. **Task 3: Run the uncommitted discovery audit over the seven claim surfaces and triage its falsifications** - no commit (produced no repository file changes; discovery run and negative control both ran in scratch/uncommitted locations by design, per D-70)

**Pre-task commit:** `d0531dbf` (docs) — committed a pending orchestrator STATE.md phase-transition edit before Task 1's clean-tree precondition check (see Deviations).

_Note: this plan is `type="execute"`, not TDD -- no RED/GREEN/REFACTOR cycle applies._

## Files Created/Modified

- `scripts/docs-style/audit-claimed-fixes.mjs` - the git-history audit instrument (row schema, eight ops, self-test)
- `scripts/docs-style/158-FIX-AUDIT.json` - seeded range + two-row audit population, `row_set_hash` written by the tool
- `scripts/docs-style/158-FIX-AUDIT-RUN.txt` - captured run log, both rows PASS, tied to the JSON by its row-set hash
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-GATE-BASELINE.json` - `phase_baseline` with all 16 required keys, `before` measured fresh, `embedded_156`/`embedded_157` for reference, `drift`/`after`/`unattributed_rows`/`discharge`/`final_apex_recorded_in` initialised for later plans
- `.planning/STATE.md` - pending phase-transition edit committed ahead of Task 1 (pre-task, see Deviations)

## Decisions Made

See `key-decisions` in frontmatter. In brief: `fix_sha` for the flagship row is the merge-landing commit `af678f0c`, not the pre-merge scratch-corpus commits RESUME.md names (they are not ancestors of HEAD); LINE COUNT DIFFERS is asserted as 14 (this session's live, reproducible measurement), superseding both CONTEXT.md's 21 and any other written figure; the two predecessor embeds record Phase 156's AFTER half and Phase 157's whole baseline for reference only, never as this phase's own before.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Committed a pending orchestrator STATE.md transition edit before Task 1's clean-tree precondition**
- **Found during:** Pre-Task-1 precondition check
- **Issue:** `git status --porcelain --untracked-files=no` was not empty at spawn time -- the orchestrator's phase-transition edit to `.planning/STATE.md` (current-phase-name casing, `EXECUTING` status, plan counter) was staged but uncommitted, which would have blocked Task 1's `git status --porcelain --untracked-files=no` precondition.
- **Fix:** Committed the STATE.md edit as its own `docs(158): record phase transition to 158 execution` commit, restoring a clean tracked tree before Task 1 began. This exactly mirrors the established Phase 154 precedent for the same class of orchestrator hand-off edit (memory `feedback_effort_level.md`'s sibling note on Phase 154 Task 1).
- **Files modified:** `.planning/STATE.md`
- **Verification:** `git status --porcelain --untracked-files=no` empty immediately after
- **Committed in:** `d0531dbf`

---

**Total deviations:** 1 auto-fixed (1 blocking). **Impact:** Necessary to satisfy Task 1's stated precondition; no scope creep, no content change beyond the orchestrator's own pending edit.

## Issues Encountered

None. All three tasks' `<verify>` and `<acceptance_criteria>` blocks passed on first execution; no repair cycle was needed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The audit instrument (`audit-claimed-fixes.mjs`) is committed, self-tested, and proven non-vacuous by a deliberate perturbation -- ready for plan 158-06's binding audit at the final content SHA, which replaces `158-FIX-AUDIT.json`'s row set wholesale.
- `158-GATE-BASELINE.json`'s before half is the phase's one committed comparison point for SC#4; its `after`, `drift`, `unattributed_rows`, `discharge.sc3`, `discharge.sc4` and `final_apex_recorded_in` fields are initialised `null`/`[]`/empty for plans 158-02 through 158-07 to fill without re-deriving the before half.
- The discovery audit's three known falsifications (EEE-SOP-standard.md:662, REQUIREMENTS.md:80 HYG-06 count, docs/_glossary-linux.md:143 cross-reference) are confirmed still live at `845218a4` and already have named owners in this phase's remaining plans (the non-sweep remediation manifest and the REQUIREMENTS.md amendment task) -- no new remediation plan is needed.
- No blockers. No `.planning/WINDOWS.md` row was added this plan; the file remains at its pre-existing 15 rows.

---
*Phase: 158-final-corpus-verification-publish-bundle*
*Completed: 2026-09-08*

## Self-Check: PASSED

- All 4 created files confirmed present on disk (`[ -f ]`).
- All 3 commits (`d0531dbf`, `845218a4`, `a4cfa1f4`) confirmed present via `git log --oneline --all`.
- All task-level `<acceptance_criteria>` and `<verify>` commands re-confirmed passing above.
- Plan-level `<verification>` re-confirmed: self-test 4/4 passing, seeded audit 2/2 PASS with a working negative control, tool commit touches no `docs/` path, `158-GATE-BASELINE.json` carries all 16 keys with a green apex/C17 and LCD count matching its file list, every recorded invocation carries `cmd`+`args`, the resolver returns live/null correctly, and the discovery audit left no file under `docs/` or `scripts/` with both planning documents byte-unchanged.
