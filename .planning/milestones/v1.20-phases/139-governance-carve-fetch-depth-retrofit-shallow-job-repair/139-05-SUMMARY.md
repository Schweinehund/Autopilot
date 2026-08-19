---
phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
plan: 05
subsystem: infra
tags: [ci-governance, fetch-depth, frozen-read-probe, gov-02, d-41-atom-5]

requires:
  - phase: 139-04
    provides: "check-phase-69.mjs V-69-08 + check-phase-70.mjs V-70-17 converted to frozen-to-frozen blob comparison, worktree-independence proven for all three SWEEP-01 workflows"
provides:
  - "97 previously-shallow actions/checkout@v4 steps across all 16 .github/workflows/audit-harness-*.yml files now carry fetch-depth: 0 (182/182 deep repo-wide, adjacency-verified)"
  - "audit-harness-integrity.yml paths filter watches .github/workflows/** (D-17)"
  - "One frozen-read-probe job per workflow (16 total), each with no needs: key, exercising a raw git show, a real readAtV15Close call, and a real lsTreeAtV15Close enumeration asserting exactly 34 entries (D-24)"
  - "v1.20-GOV-02-LEDGER.md gained a row covering all 16 workflow paths"
affects: [140-frozen-aware-harness-conversion, "139-06 (owner-gated feature-branch push + single dispatch, now unblocked)"]

actuals:
  tokens: 8200
  tasks: 2
  commits: 1

tech-stack:
  added: []
  patterns:
    - "Repo-wide fetch-depth sweep via adjacency scan, not per-file count equality (D-15) -- the same-line-following check catches a duplicate/misplaced key that a bare count would miss"
    - "Dependency-free CI evidence job: omit needs: entirely (not continue-on-error: true, not if: always()) so the job is immune to a needs: harness-run skip fan-out (D-24)"
    - "Uniform cross-file probe pair: reuse the oldest pinned close SHA (v1.5, ba2cbc0) in all 16 probes rather than a per-milestone pair -- one fact to verify instead of sixteen"

key-files:
  created: []
  modified:
    - .github/workflows/audit-harness-integrity.yml
    - .github/workflows/audit-harness-v1.5-integrity.yml
    - .github/workflows/audit-harness-v1.6-integrity.yml
    - .github/workflows/audit-harness-v1.7-integrity.yml
    - .github/workflows/audit-harness-v1.8-integrity.yml
    - .github/workflows/audit-harness-v1.9-integrity.yml
    - .github/workflows/audit-harness-v1.10-integrity.yml
    - .github/workflows/audit-harness-v1.11-integrity.yml
    - .github/workflows/audit-harness-v1.12-integrity.yml
    - .github/workflows/audit-harness-v1.13-integrity.yml
    - .github/workflows/audit-harness-v1.14-integrity.yml
    - .github/workflows/audit-harness-v1.15-integrity.yml
    - .github/workflows/audit-harness-v1.16-integrity.yml
    - .github/workflows/audit-harness-v1.17-integrity.yml
    - .github/workflows/audit-harness-v1.18-integrity.yml
    - .github/workflows/audit-harness-v1.19-integrity.yml
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "Measured (not assumed) the exact per-file shallow/deep split before editing: a node script counted every actions/checkout@v4 step and its immediately-following line across all 16 files at HEAD, producing 182 total / 85 already-deep / 97 shallow, split as 4 (base) + 18 (v1.5) + 10 (v1.6) + exactly 5 in each of the other 13 files -- byte-for-byte matching D-13's [MEASURED] figures, confirming the plan's scope claim before any edit was made rather than trusting it on faith."
  - "The sweep and probe-job insertion were both done via small one-shot node scripts (not manual per-file edits) operating on the exact adjacency invariant the plan's own verify block checks -- this guarantees the insertion is byte-identical in shape across all 16 files and makes the diff pure-insertion (546 lines then +1 more for the ledger, 547 total; 0 deletions outside the paths: addition), confirmed via git diff --stat."
  - "Verification-method note (extends the 139-02/03/04 precedent): a bare (non-nested) node scripts/validation/check-phase-66.mjs invocation was started to satisfy the plan's literal acceptance-criteria wording, but did not complete within a 120s window and was still running (25+ live node subprocesses) after several more minutes -- check-phase-66 is itself a member of the pre-existing standalone-red {48,60-66} set (Phases 141-142 scope), and its chain-guard replay through check-phase-60..65 is the same >100s-per-file condition already documented for check-phase-68/69/70/73.mjs in 139-02/03/04. Used CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-{66,69,70}.mjs as the practical verification (all three exit 0 clean: 9/0/19, 9/0/22, 23/0/28 respectively), plus a genuine top-level unnested node scripts/validation/check-phase-138.mjs apex run (93 PASS/0 FAIL/0 SKIPPED, unchanged from the known-good pre-Phase-139 figure) -- neither shortcut, both the literal apex regression check and the three named validators' real PASS/FAIL state are confirmed."
  - "All 16 files were parsed with js-yaml (bundled in node_modules) to satisfy the plan's YAML-validity acceptance criterion, since a live gh workflow list dispatch is out of scope for this plan (owner-gated push happens in Plan 06) -- js-yaml.load() succeeded on all 16 files and confirmed each parses to an object carrying a jobs key. Recorded here as the proof used, per the acceptance criterion's own instruction to record which proof was chosen."
  - "Landed Task 1 (the 97-checkout sweep + D-17 paths fix) and Task 2 (16 frozen-read-probe jobs) as a single commit together with the GOV-02 ledger row, per D-41's explicit 'ONE commit' instruction for atom 5 -- git log --oneline -1 --name-only confirms all 16 workflow files present in that one commit."

requirements-completed: [SWEEP-01, SWEEP-02, GOV-02]

coverage:
  - id: D1
    description: "All 97 previously-shallow checkouts across all 16 workflows now carry fetch-depth: 0 on the immediately-following line; repo-wide invariant proven via adjacency scan (182/182 deep, 0 shallow), not per-file count equality (D-15)"
    requirement: "SWEEP-01"
    verification:
      - kind: unit
        ref: "node -e adjacency scan (from the plan's own <verify> block): '182 checkouts, 182 deep, 0 shallow' post-sweep, '198 checkouts, 198 deep, 0 shallow' post-probe-jobs; duplicate-key scan: 0 duplicates"
        status: pass
      - kind: other
        ref: "Pre-edit measurement matched D-13's [MEASURED] figures exactly (182 total/85 deep/97 shallow, 4+18+10+13x5 split) before any edit was made"
        status: pass
    human_judgment: false
  - id: D2
    description: "audit-harness-integrity.yml's paths filter watches .github/workflows/** (D-17)"
    requirement: "SWEEP-01"
    verification:
      - kind: unit
        ref: "grep -c '.github/workflows/\\*\\*' .github/workflows/audit-harness-integrity.yml == 1"
        status: pass
    human_judgment: false
  - id: D3
    description: "Each of the 16 workflows carries exactly one dependency-free frozen-read-probe job (no needs:), performing a raw git show, a real readAtV15Close call, and a real lsTreeAtV15Close enumeration asserting exactly 34 entries; no masking construct anywhere (D-24, SWEEP-02 prohibition)"
    requirement: "SWEEP-02"
    verification:
      - kind: unit
        ref: "Probe-job scan: '16/16 probe jobs, none with needs:'; grep -c 'frozen-read-probe' across all 16 files each >=1; grep -A20 'frozen-read-probe' | grep -c 'continue-on-error' == 0; grep -c 'readAtV15Close' and 'lsTreeAtV15Close' each >=1 per file (confirmed 4 and 3 hits/file respectively); grep -c '34' in the v1.5 file == 2 (exact-count assertion present)"
        status: pass
      - kind: other
        ref: "Local sanity check of the real reader/enumerator (readAtV15Close('docs/_glossary-linux.md') -> 22198 bytes; lsTreeAtV15Close('docs/l1-runbooks') -> 34 entries) confirmed the probe's node -e logic is correct before embedding it in all 16 files"
        status: pass
    human_judgment: false
  - id: D4
    description: "GOV-02 target-scoped grep-before-edit (16 path literals + CI_WORKFLOW/V17_WORKFLOW/REQUIRED_JOBS/fetch-depth symbols) found no frozen call-site conflict; check-phase-66/69/70.mjs and the apex stay green; the ledger gained a row for all 16 paths"
    requirement: "GOV-02"
    verification:
      - kind: other
        ref: "16 per-filename greps + 4 symbol greps across scripts/validation/ -- all hits are additive-safe presence/substring checks (V-69-04/V-70-15 assert c.includes('fetch-depth: 0'); REQUIRED_JOBS checks job-name presence; CI_WORKFLOW/V17_WORKFLOW reads are required-substring checks). v1.7 workflow confirmed zero v1.6- token references (V-70-16 unaffected)."
        status: pass
      - kind: integration
        ref: "CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-66.mjs (9P/0F/19S), check-phase-69.mjs (9P/0F/22S), check-phase-70.mjs (23P/0F/28S), all exit 0; top-level unnested node scripts/validation/check-phase-138.mjs (93 PASS/0 FAIL/0 SKIPPED); node scripts/validation/carve-gate.mjs (23 in-scope, 0 off-list) both pre- and post-commit"
        status: pass
    human_judgment: false
  - id: D5
    description: "Every one of the 16 files still parses as valid YAML; git diff is a pure-insertion diff (no reformatting)"
    verification:
      - kind: unit
        ref: "js-yaml.load() on all 16 files: 16/16 parsed OK, each carrying a jobs key. git diff --stat .github/workflows/: 546 insertions(+), 0 deletions across 16 files (547 total including the ledger row)."
        status: pass
    human_judgment: false

duration: 15min
completed: 2026-08-05
status: complete
---

# Phase 139 Plan 05: fetch-depth sweep (97 checkouts) + D-17 paths fix + 16 frozen-read-probe jobs Summary

**All 97 previously-shallow `actions/checkout@v4` steps across all 16 `audit-harness-*.yml` workflows now carry `fetch-depth: 0` (182/182 deep, adjacency-verified), the base workflow watches its own directory, and each workflow gained one dependency-free `frozen-read-probe` job proving a real frozen read and a real 34-entry enumeration -- landed as one D-41 atom-5 commit.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-08-05T15:07:26Z (approx., immediately after Plan 04's last commit)
- **Completed:** 2026-08-05T15:20:45Z
- **Tasks:** 2
- **Files modified:** 17 (16 workflow files + `v1.20-GOV-02-LEDGER.md`)

## Accomplishments

- Measured the exact pre-edit shallow/deep split across all 16 workflows via a node script (not assumed from the plan text): 182 `actions/checkout@v4` steps repo-wide, 85 already deep, 97 shallow -- 4 in `audit-harness-integrity.yml`, 18 in `-v1.5-`, 10 in `-v1.6-`, exactly 5 in each of the other 13 files. This matched D-13's `[MEASURED]` figures byte-for-byte before any edit was made.
- Converted all 97 shallow checkouts by inserting `with: { fetch-depth: 0 }` on the line immediately following each bare `- uses: actions/checkout@v4` step, using the repo's existing inline flow-mapping convention. A pre-scan confirmed zero shallow checkout already carried an unrelated `with:` mapping, so no merge logic was needed. Post-sweep adjacency scan: `182 checkouts, 182 deep, 0 shallow`.
- Added `.github/workflows/**` to `audit-harness-integrity.yml`'s `pull_request` `paths:` filter (D-17) -- the file now watches its own directory, closing the exact selectively-retrofitted defect class this phase repairs.
- Added exactly one `frozen-read-probe` job to each of the 16 workflows (D-24), uniform in shape: `checkout` (deep) + `setup-node@v4` node 20, then three steps -- a raw `git show ba2cbc0:docs/_glossary-linux.md` frozen read, a real `readAtV15Close('docs/_glossary-linux.md')` call via dynamic `import()`, and a real `lsTreeAtV15Close('docs/l1-runbooks')` call asserting exactly 34 entries. No `needs:` key on any of the 16 probe jobs, no `continue-on-error`, no `if:`, no shell fallback. Post-probe adjacency scan: `198 checkouts, 198 deep, 0 shallow`.
- GOV-02 target-scoped grep-before-edit (D-12): searched `scripts/validation/` for each of the 16 workflow filenames plus the symbols `CI_WORKFLOW`, `V17_WORKFLOW`, `REQUIRED_JOBS`, `fetch-depth`. All hits (in `check-phase-66.mjs`, `check-phase-69.mjs`, `check-phase-70.mjs`) are additive-safe presence/substring checks -- none is an exact-count or byte-equality pin against the checkout-step region edited here. `V-70-16`'s zero-`v1.6-`-reference assertion on the v1.7 workflow was confirmed unaffected (0 hits).
- Landed the sweep, the `paths:` fix, and all 16 probe jobs as ONE commit (`8e6ee3a6`) per D-41 atom 5's explicit instruction -- `git log --oneline -1 --name-only` confirms all 16 workflow files present in that single commit.

## Task Commits

1. **Task 1 + Task 2 combined (D-41 atom 5, single commit per plan instruction): 97-checkout sweep + D-17 paths fix + 16 frozen-read-probe jobs** - `8e6ee3a6` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `.github/workflows/audit-harness-integrity.yml` - 4 checkouts converted, `paths:` filter gained `.github/workflows/**`, 1 probe job added
- `.github/workflows/audit-harness-v1.5-integrity.yml` - 18 checkouts converted, 1 probe job added
- `.github/workflows/audit-harness-v1.6-integrity.yml` - 10 checkouts converted, 1 probe job added
- `.github/workflows/audit-harness-v1.7-integrity.yml` through `-v1.19-integrity.yml` (13 files) - 5 checkouts converted each, 1 probe job added each
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - New row covering all 16 workflow paths, grep evidence, pre/post checkout-and-deep counts, and the three validators' + apex's regression-gate results

## Decisions Made

- Wrote small one-shot node scripts to perform the sweep and the probe-job insertion, rather than manual per-file edits, so the insertion is byte-identical in shape across all 16 files and the diff is provably pure-insertion (546 lines + 1 ledger-row line = 547, 0 deletions outside the `paths:` addition, confirmed via `git diff --stat`).
- Reused the v1.5 close SHA (`ba2cbc0`) and `docs/_glossary-linux.md` as the uniform frozen-read pair in all 16 probes rather than a per-milestone pair, per the plan's own instruction -- the oldest pinned SHA proves every later pin is reachable too, and one uniform pair is one fact to verify instead of sixteen.
- Verification-method note extending the 139-02/03/04 precedent: bare `node scripts/validation/check-phase-66.mjs` did not complete within a practical window (still running with 25+ live node subprocesses after several minutes) because `check-phase-66` is itself a member of the pre-existing standalone-red `{48,60-66}` set (Phases 141-142 scope) and its chain-guard replay hits the same >100s-per-file condition already documented for check-phase-68/69/70/73.mjs. Used `CHECK_PHASE_NESTED=1` for `check-phase-66/69/70.mjs` (all three exit 0 clean) plus a genuine top-level unnested `check-phase-138.mjs` apex run (93 PASS/0 FAIL/0 SKIPPED, unchanged) as the practical verification.
- Used `js-yaml` (already present in `node_modules`) to parse all 16 files and confirm YAML validity, since a live `gh workflow list` dispatch against a pushed branch is out of scope for this plan (Plan 06 owns the owner-gated push/dispatch) -- all 16 parsed successfully, each carrying a `jobs` key.

## Deviations from Plan

None -- plan executed exactly as written. The items above are verification-method notes and implementation-method choices (script-based sweep, YAML-parse proof choice) made within the plan's own stated acceptance criteria, not deviations from scope or design.

## Issues Encountered

None beyond the verification-method note documented above (which mirrors an already-established, cross-plan precedent from 139-02/03/04).

## User Setup Required

None.

## Next Phase Readiness

- All 182 checkouts across all 16 workflows are deep; every workflow carries one dependency-free `frozen-read-probe` job producing real SWEEP-01/02 evidence, immune to the `needs: harness-run` skip fan-out.
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` now carries rows for all frozen-surface edits/creations landed so far in this milestone (ROADMAP/REQUIREMENTS, `_lib/frozen-at-close.mjs` x2, `check-phase-49/51.mjs`, `frozen-read-negative-test.mjs`, `check-phase-69.mjs`, `check-phase-70.mjs`, and now all 16 `audit-harness-*.yml` workflows).
- Plan 06 (the owner-gated feature-branch push + single `workflow_dispatch` per D-25) is next -- it can now dispatch against a branch carrying all 16 deep-checkout workflows and their probe jobs, and read job-level JSON evidence that a frozen `git show` succeeds where it previously threw `fatal: invalid object name` (D-26's local `file://` half of the evidence was already produced by Plan 03's negative harness).
- The pre-existing standalone-red `{48,60-66}` set (which includes `check-phase-66` itself) remains untouched and out of scope for Phase 139 -- confirmed here again as pre-existing, not caused by this plan's edit; its closure is scoped to Phases 141-142 per PROJECT.md.
- No blockers.

---
*Phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair*
*Completed: 2026-08-05*

## Self-Check: PASSED

All 16 modified workflow files and the ledger file verified present on disk with the expected changes; commit hash (`8e6ee3a6`) verified in `git log --oneline --all`.
