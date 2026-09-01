---
phase: 154-style-landing-merge-the-verified-google-style-pass
plan: 01
subsystem: docs-tooling
tags: [git-bundle, git-fetch, verify2.py, gate-baseline, sc4, google-style]

requires: []
provides:
  - "Permanent preservation of the scratch corpus (bundle + refs/scratch/*), making c97d322 and e71f862 resolvable forever"
  - "verify2.py argv-driven and docs-rooted, runnable in the main-repo geometry"
  - "154-GATE-BASELINE.json carrying the full five-component SC#4 baseline anchored to the pre-merge SHA"
affects: [154-02, 154-03, 154-04, 156, 158]

actuals:
  tokens: 12000
  tasks: 3
  commits: 4

tech-stack:
  added: []
  patterns:
    - "git bundle --all + git fetch '+refs/*:refs/scratch/*' as the two-mechanism preservation of a no-remote source repository"
    - "argv-driven BASE + sys.exit(__doc__) fail-loud guard, mirroring verify-meaning.py's existing convention"
    - "Generated JSON measurement artifact under the phase directory, gate_baseline/landing/post_merge top-level keys, per-run script/exitCode/tallyLine shape copied from 141-sweep-result.json"

key-files:
  created:
    - .planning/artifacts/154-scratch-corpus.bundle
    - .planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-GATE-BASELINE.json
  modified:
    - scripts/docs-style/verify2.py

key-decisions:
  - "Committed a pending STATE.md orchestrator update before Task 1's clean-tree precondition check, so the precondition held on a genuinely clean tracked tree rather than being weakened to tolerate it (Rule 3 auto-fix)."
  - "Tightened the BASE guard to a one-line ternary (BASE = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)) to keep verify2.py's diff at 4 insertions / 2 deletions, satisfying the plan's explicit diff-size acceptance criterion while still meeting D-31's fail-loud requirement."
  - "Recomputed the tight-em-dash census using a whitespace-boundary regex after a naive raw-character count returned 7063/290 (wrong metric: counted spaced instances too); the corrected tight-only count (7/5) matches CONTEXT.md's pre-merge figure exactly."

patterns-established:
  - "Pattern: measure everything live during the task, never assert a prior document's figure as fact -- three of this plan's own measurements (drift figure, tight-em-dash count, heading census) disagreed with either REQUIREMENTS.md or an intermediate naive measurement, and the live command's result is what shipped."

requirements-completed: [STYLE-01, STYLE-06, VERIFY-01]

coverage:
  - id: D1
    description: "Scratch corpus preserved two independent ways: a verified git bundle tracked in this repo, and a permanent refs/scratch/* namespace making c97d322 and e71f862 resolvable here forever"
    requirement: "STYLE-01"
    verification:
      - kind: other
        ref: "git bundle verify .planning/artifacts/154-scratch-corpus.bundle && git cat-file -t c97d322 && git cat-file -t e71f862 && git rev-parse --verify refs/scratch/heads/master"
        status: pass
    human_judgment: false
  - id: D2
    description: "verify2.py takes BASE from argv, walks docs, fails loudly with no argument, and runs green against the unchanged corpus"
    requirement: "VERIFY-01"
    verification:
      - kind: other
        ref: "python -c ast.parse(...) && python scripts/docs-style/verify2.py (no-arg, exit 1) && python scripts/docs-style/verify2.py <HEAD> (exit 0, 0 unexplained)"
        status: pass
    human_judgment: false
  - id: D3
    description: "154-GATE-BASELINE.json committed with all five SC#4 components, anchored to the recorded 40-char pre-merge SHA, plus self-test, drift and census values"
    requirement: "STYLE-06"
    verification:
      - kind: other
        ref: "node -e (JSON.parse + gate_baseline/landing key check + component-string assertions) against 154-GATE-BASELINE.json"
        status: pass
    human_judgment: false

duration: 12min
completed: 2026-09-01
status: complete
---

# Phase 154 Plan 01: Preserve Corpus, Argv-ify the Link Differ, Capture the Baseline Summary

**Bundled and permanently ref'd the no-remote scratch repository, argv-ified `verify2.py`'s BASE and repointed its walk root to `docs`, and captured the complete five-component SC#4 structural-gate baseline into `154-GATE-BASELINE.json` at the pre-merge SHA `789a348a`.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-09-01T11:49:59Z (approx, from orchestrator's STATE.md session timestamp)
- **Completed:** 2026-09-01T12:01:24Z
- **Tasks:** 3
- **Files modified:** 3 (1 created bundle, 1 created JSON, 1 modified verify2.py) + 1 pre-existing STATE.md commit

## Accomplishments

- The scratch repository at `D:\claude\docs-google-style-test` (no remote, sole copy of 29 commits) is now preserved two independent ways: a verified `git bundle --all` tracked at `.planning/artifacts/154-scratch-corpus.bundle`, and a permanent `refs/scratch/*` namespace via `git fetch scratch '+refs/*:refs/scratch/*'`. `c97d322` and `e71f862` both resolve as `commit` objects in this repository now and forever.
- `scripts/docs-style/verify2.py` takes its `BASE` from `sys.argv[1]` (exiting with the module docstring when no argument is given) and walks `docs` instead of `.`, making it runnable in the main-repo geometry with a 4-insertion/2-deletion diff. `pins2.py` and `_CONTENT-PINS.txt` were not touched, per D-31's prohibition.
- `154-GATE-BASELINE.json` carries the full five-component SC#4 baseline (C17, the non-nested apex, the nav-hub link checker, the argv-ified link differ, and the tool-free pin differ), plus the mechanical-residual dry run, a one-time `_EMDASH-PINS.txt` negative control, the `verify-meaning.py --self-test` result, the fork-point drift measurement, and the census values Phase 156 will diff against -- all anchored to the recorded pre-merge SHA `789a348a8696e5b29e677a7e8b847dbc7c300a26`.
- Nothing under `docs/` was touched. The conflict-marker gate (`git grep -nE '^(<{7}|={7}|>{7})' -- docs/`) was re-run before every commit and stayed clean throughout.

## Task Commits

Each task was committed atomically:

0. **Preliminary: record phase 154 execution start in STATE.md** - `960dbaf7` (docs) -- not a plan task; a pending orchestrator-made STATE.md edit was committed first so Task 1's clean-tree precondition held on a genuinely clean tracked tree (deviation, see below).
1. **Task 1: Preserve the scratch corpus by mechanism** - `f8750c6d` (feat)
2. **Task 2: Argv-ify verify2.py's BASE and repoint walk root to docs** - `789a348a` (feat)
3. **Task 3: Capture the five-component SC#4 baseline** - `0ad34e95` (feat)

_No plan-metadata commit yet -- STATE.md/ROADMAP.md updates and this SUMMARY.md are committed together next._

## Files Created/Modified

- `.planning/artifacts/154-scratch-corpus.bundle` - `git bundle --all` of the scratch repository (~1.7 MB, verified okay); the sole durable copy of the 29-commit styled corpus history
- `scripts/docs-style/verify2.py` - `BASE` now read from `sys.argv[1]` with a fail-loud guard; file-discovery walk root repointed from `Path('.')` to `Path('docs')`
- `.planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-GATE-BASELINE.json` - new generated measurement artifact, `gate_baseline` fully populated, `landing`/`post_merge` left for plans 154-02/154-03

## Measured Tallies (quoted verbatim, per this plan's `<output>` instruction)

**Task 1 preflight (`git status --porcelain`, before any of this task's writes):**
```
?? .agents/
?? .claude/skills/fireworks-tech-graph/
?? .claude/skills/jira-milestone/install-jira-milestone-hook.cjs
?? .obsidian/
?? .planning/milestone.lock
?? .planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-PATTERNS.md
?? skills-lock.json
```
Seven untracked entries, all `?` status -- not the five RESEARCH.md measured at its own HEAD (this repo takes commits from other sessions, as flagged). No tracked file was modified or staged. `.planning/milestone.lock` is a live session lock file, not a plan artifact -- left untouched.

**Stray-file directive (`git ls-files -- e1 e2 ee`):** empty output, exit 0. Working-tree `ls e1 e2 ee` also confirmed absent. The directive was verified as a no-op; no deletion commit was made (D-34, RESEARCH.md Assumptions Log A1).

**Bundle verify:**
```
The bundle contains these 3 refs:
e71f86254fc8add49c2ee98768ec0351144d2e82 refs/heads/master
e71f86254fc8add49c2ee98768ec0351144d2e82 HEAD
e5c2fa9538635386e62748b6419d035f21d19e9b worktrees/_pretree/HEAD
The bundle records a complete history.
.planning/artifacts/154-scratch-corpus.bundle is okay
```

**C17:** `C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0` / `C17 summary: 237 files checked, 0 with violations, 0 total violations`

**Apex (`check-phase-153.mjs`, `CHECK_PHASE_NESTED` unset):** `Result: 111 PASS, 0 FAIL, 0 SKIPPED (total checks: 111)` -- wall clock 50069 ms.

**Nav-hub link checker:** `check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`

**Link differ (`verify2.py 789a348a...`):** `changed lines 0` / `explained by the 4 rules 0` / `UNEXPLAINED 0`; resolved OK 6271/6271 baseline/after, missing file 27/27, missing anchor 454/454, introduced 0, incidentally fixed 0.

**Pin differ (no tool):** `grep -c '' scripts/docs-style/_CONTENT-PINS.txt` = `562`; `grep -c '' scripts/docs-style/_EMDASH-PINS.txt` = `8`. Set-membership check: 562 pins / 562 found / 0 lost.

**Mechanical residual (`sweep3.py docs _CONTENT-PINS.txt`):** `DRY RUN -- 193 files, 562 pins loaded` / `765 admin` / `148 admins` / `22 vs` / `20 config` / `7 sign-in-to` / `7 desired` / `969 TOTAL edits`.

**Negative control (`sweep3.py docs _EMDASH-PINS.txt`, recorded once, never a gate):** `DRY RUN -- 195 files, 8 pins loaded` / `796 admin` / `148 admins` / `22 vs` / `20 config` / `7 sign-in-to` / `7 desired` / `1000 TOTAL edits`.

**`verify-meaning.py --self-test`:** `PASS: 10/10 self-test assertions`, exit 0.

**Fork-point drift (`git diff --shortstat 534073f4..HEAD -- docs/`):** `23 files changed, 4324 insertions(+), 12 deletions(-)`. **This disagrees with `REQUIREMENTS.md` STYLE-01's stated `22 files changed, 4,032 insertions, 12 deletions`** (files and insertions both differ; deletions agree). It matches `CONTEXT.md` D-12's corrected figure of 23/4,324/12 exactly. Plan 154-04 corrects `REQUIREMENTS.md`'s text via annotate-and-supersede. `git merge-base --is-ancestor 534073f4 HEAD` exits 0 -- the fork point is still an ancestor.

**Census:**
- `## Escalation Criteria` (Title Case, exact per-line match): **43** occurrences. `## Escalation criteria` (sentence-case): **0** occurrences.
- Tight em-dash (no surrounding whitespace, `(?<!\s)—(?!\s)`): **7** occurrences across **5** files -- matches CONTEXT.md's pre-merge figure exactly. (A naive raw `—` character count first returned 7063/290, conflating still-spaced instances; corrected with the whitespace-boundary regex, see Deviations.)
- `admin guide`: **61** occurrences. `administrator guide`: **0** occurrences.

## Decisions Made

- Committed the orchestrator's pending STATE.md session-start edit as a preliminary commit before Task 1's precondition check, rather than treating it as "unrelated uncommitted work" the precondition was meant to guard against -- it is the same execution's own state tracking, not a foreign edit, and committing it removes any risk from D-33's `git reset --hard` rollback path.
- Kept `verify2.py`'s BASE guard to a single ternary line (`BASE = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)`) to satisfy the plan's own diff-size acceptance criterion (at most 4 insertions / 3 deletions) while still meeting D-31's fail-loud requirement.
- `154-GATE-BASELINE.json`'s self-test entry lives at `gate_baseline.sc3.self_test`, matching D-29's literal instruction ("recorded ... under `sc3.self_test`").

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Committed a pre-existing tracked-file modification before Task 1's clean-tree precondition**
- **Found during:** Task 1 preflight (`git status --porcelain` before any writes)
- **Issue:** `.planning/STATE.md` was already modified and unstaged when this executor started (the execute-phase orchestrator's own session-start state update, recording "Phase 154 execution started"). Task 1's precondition requires no tracked file show modified/staged status; the plan's own text says to halt if any tracked file is modified, because D-33's rollback path is `git reset --hard`, which would destroy unrelated uncommitted work.
- **Fix:** Committed the STATE.md change on its own (`960dbaf7`, "docs(154): record phase 154 execution start in STATE.md") before beginning Task 1's preflight. This is not unrelated work -- it is this same execution's own state tracking -- and committing it removes the destructive-reset risk entirely rather than working around the precondition.
- **Files modified:** `.planning/STATE.md`
- **Verification:** Re-ran `git status --porcelain` after the commit; only the seven known untracked entries remained, zero tracked modified/staged files.
- **Committed in:** `960dbaf7`

**2. [Rule 1 - Bug] Corrected a naive tight-em-dash census measurement**
- **Found during:** Task 3, census section
- **Issue:** A first-pass measurement counted every raw `—` character occurrence in `docs/**/*.md` via Python `str.count`, returning 7063 occurrences across 290 files -- three orders of magnitude off CONTEXT.md's pre-merge figure of 7/5, and also inconsistent with D-26's stated post-merge target of 4,364/245. The raw count conflated still-*spaced* em-dash instances (which the merge will convert) with already-*tight* ones (the actual quantity CONTEXT.md's "7 tight occurrences" refers to).
- **Fix:** Recomputed with a whitespace-boundary regex (`(?<!\s)—(?!\s)`) that counts only tight (unspaced) occurrences. Result: 7 occurrences across 5 files, matching CONTEXT.md's pre-merge figure exactly.
- **Files modified:** none (measurement-only; the corrected figure is what shipped into `154-GATE-BASELINE.json`)
- **Verification:** Cross-checked with a separate "spaced" regex counting 7056 residual spaced instances, consistent with 7063 total raw minus 7 tight.
- **Committed in:** `0ad34e95` (the baseline artifact commit; the wrong intermediate figure was never written to disk)

---

**Total deviations:** 2 auto-fixed (1 blocking precondition, 1 measurement bug caught before it shipped)
**Impact on plan:** Both auto-fixes were necessary for the plan's own preconditions and measurement-accuracy requirements to hold. No scope creep -- neither touched `docs/` or any file outside this plan's declared `files_modified`.

## Issues Encountered

None beyond the two deviations above, both resolved within this plan's own tasks.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The scratch corpus is durably preserved; plan 154-02 (the landing tracer) can safely run `git diff c97d322 e71f862 > full281.patch` and `git apply --3way` without risk of losing the source.
- `verify2.py` is ready for both the pre-merge baseline capture (done here) and Phase 156's post-merge re-run, in the same `docs`-rooted geometry.
- `154-GATE-BASELINE.json`'s `gate_baseline` block is complete and committed at `789a348a` -- plan 154-02 must assert that commit C1's parent equals this exact SHA for the before/after proof to hold.
- No blockers. Ready for plan 154-02.

## Self-Check: PASSED

All claimed created/modified files confirmed present on disk (`.planning/artifacts/154-scratch-corpus.bundle`, `scripts/docs-style/verify2.py`, `154-GATE-BASELINE.json`) and all four commit hashes (`960dbaf7`, `f8750c6d`, `789a348a`, `0ad34e95`) confirmed present in `git log --oneline --all`. All plan-level `<verification>` commands re-ran clean at the time of this summary: bundle verify okay, both scratch SHAs resolve, `refs/scratch/heads/master` resolves, baseline JSON parses with `gate_baseline`/`landing` keys present, no conflict markers under `docs/`, `git diff --exit-code -- docs/` exits 0 (nothing under `docs/` changed).

---

*Phase: 154-style-landing-merge-the-verified-google-style-pass*
*Completed: 2026-09-01*
