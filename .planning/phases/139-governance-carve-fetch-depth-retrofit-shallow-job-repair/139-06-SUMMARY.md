---
phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
plan: 06
subsystem: infra
tags: [ci-governance, gh-cli, workflow-dispatch, frozen-read-probe, gov-02, d-41-atom-5, owner-gate]

requires:
  - phase: 139-05
    provides: "97 checkouts converted to fetch-depth: 0 across 16 workflows, D-17 paths fix, one dependency-free frozen-read-probe job per workflow (16 total)"
provides:
  - "Job-level JSON evidence (gh run view --json jobs) that a frozen git show succeeds in CI on a previously-shallow checkout, in all 16 audit-harness-*.yml workflows"
  - "SWEEP-01 SC#2 closed; re-scoped SWEEP-02 (D-24 proxy) closed for this milestone's Phase 139 scope"
  - "origin/phase-139-atom-5: a pushed, owner-approved-to-keep short-lived branch retained until the Phase 144 close audit"
  - "GOV-02 ledger dispatch-evidence row + a recorded job-name filter trap for the Phase 144 close audit"
affects: ["144-milestone-close (branch retention, job-name filter trap, D-23 residual)"]

actuals:
  tokens: 2500
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Job-level CI evidence over run-level colour: gh run view <id> --json jobs, filtered to the specific job's own conclusion — a run-level green/red is compatible with unrelated advisory or fan-out jobs and proves nothing on its own"
    - "Owner-gated CI dispatch from a short-lived feature branch, never master: gh workflow run <file> --ref <branch> selects branch content for workflow_dispatch-only workflows"

key-files:
  created: []
  modified:
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "Branch phase-139-atom-5 pushed from local HEAD (c2450efa, carrying all five landed atoms) while staying checked out on master throughout — never switched branches locally, only pushed the ref."
  - "Owner pre-authorized Task 1 in advance (push + dispatch all 16); Task 2's blocking checkpoint was still honored as a real gate — the executor halted, returned full job-level evidence, and did not self-approve. The orchestrator independently re-verified origin/master, the branch head, and all 16 probe conclusions before approving."
  - "Branch disposition (owner pre-answered, confirmed at approval): KEEP origin/phase-139-atom-5 until the Phase 144 close audit. Not deleted."
  - "Recorded, not fixed: the plan's own acceptance-criteria command (`select(.name | test(\"frozen-read-probe\"))`) returns EMPTY against the real GitHub Actions API, because `.jobs[].name` holds the job's display name (`Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free)`), not its YAML job key (`frozen-read-probe`). All evidence in this plan was gathered with the correct display-string match (`test(\"Frozen-read probe\")`, case-sensitive on the actual field) and independently re-verified by the orchestrator. No workflow YAML was touched and nothing was re-dispatched — the owner approved plain closure of the evidence, not a fix to the plan's verify-command wording. Flagged as a known trap for Phase 144's close audit in both this SUMMARY and the GOV-02 ledger row, so a future empty result from the plan's literal command is read correctly as a filter-field mismatch, not as \"no probe job ran\"."

requirements-completed: [SWEEP-01, SWEEP-02]

coverage:
  - id: D1
    description: "16/16 frozen-read-probe jobs report success at the job level (never run-level colour) across all 16 audit-harness-*.yml workflows, dispatched against the owner-approved short-lived branch phase-139-atom-5"
    requirement: "SWEEP-01"
    verification:
      - kind: integration
        ref: "gh run view <id> --json jobs, filtered to the Frozen-read probe job's own .conclusion, for all 16 dispatched runs (run ids 31067842115, 31067843271, 31067844439, 31067845609, 31067846721, 31067847908, 31067849260, 31067850470, 31067851616, 31067852848, 31067854002, 31067855170, 31067856627, 31067857747, 31067858996, 31067860323) — 16/16 success, 0 failure, 0 skipped. Orchestrator independently re-queried and corroborated 16 success / 0 not-success before approving Task 2."
        status: pass
    human_judgment: false
  - id: D2
    description: "Three previously-all-shallow workflows (audit-harness-integrity.yml, -v1.5-, -v1.6-) each show the frozen git show succeeding, readAtV15Close returning 22198 bytes, and lsTreeAtV15Close enumerating exactly 34 entries in their probe job logs"
    requirement: "SWEEP-01"
    verification:
      - kind: integration
        ref: "gh api repos/.../actions/jobs/{92509278905,92509319448,92509323440}/logs — all three show 'readAtV15Close OK: 22198 bytes' and 'lsTreeAtV15Close OK: 34 entries'"
        status: pass
    human_judgment: false
  - id: D3
    description: "SWEEP-02 residual honestly recorded: this dispatch delivers the D-24 ratified PROXY evidence, not the literal SWEEP-02 criterion — the 11 already-frozen-aware validators remain behind the needs: harness-run fan-out (D-23) until Phase 141's RED-01 greens the harnesses"
    requirement: "SWEEP-02"
    verification:
      - kind: other
        ref: "GOV-02 ledger dispatch row explicitly states the D-23 residual and D-24 proxy scope; 10 of 16 runs show check-phase-* jobs as skipped (expected needs: harness-run fan-out, not a probe failure), matching the pre-existing Phase 140-143 harness debt"
        status: pass
    human_judgment: false
  - id: D4
    description: "master untouched; only the short-lived feature branch was pushed"
    verification:
      - kind: integration
        ref: "git rev-parse origin/master captured before push (347c20a8e22c0f66222de71677b3ca3fc2074fd7) and reconfirmed identical after all 16 dispatches and both ledger commits; local checkout stayed on master throughout (never checked out phase-139-atom-5). Orchestrator independently re-verified origin/master and origin/phase-139-atom-5 (c2450efa) before approving."
        status: pass
    human_judgment: false

duration: 25min
completed: 2026-08-05
status: complete
---

# Phase 139 Plan 06: Owner-gated CI dispatch — job-level frozen-read-probe evidence Summary

**Pushed short-lived branch `phase-139-atom-5`, dispatched all 16 `audit-harness-*.yml` workflows, and collected job-level JSON proving all 16 `frozen-read-probe` jobs succeed (never run-level colour) — closing SWEEP-01 SC#2 and the D-24-rescoped SWEEP-02, with master untouched and the branch kept per owner instruction until Phase 144's close audit.**

## Performance

- **Duration:** ~25 min (includes ~2 min of CI queue/run wait, polled at 30s intervals)
- **Started:** 2026-08-05T22:00:00-05:00 (approx.)
- **Completed:** 2026-08-05T22:40:07-05:00
- **Tasks:** 2 (Task 1 auto; Task 2 owner-gated checkpoint, approved)
- **Files modified:** 1 (`.planning/milestones/v1.20-GOV-02-LEDGER.md`, 2 commits)

## Accomplishments

- Pushed `origin/phase-139-atom-5` from local HEAD `c2450efa` (all five landed atoms) while the local checkout stayed on `master` throughout — no branch switch, only a ref push.
- Dispatched all 16 `audit-harness-*.yml` workflows via `gh workflow run <file> --ref phase-139-atom-5`; all 16 runs reached `status: completed` within ~2 minutes.
- Collected job-level JSON evidence exclusively — `gh run view <id> --json jobs`, filtered to the `frozen-read-probe` job's own `.conclusion`. **No run-level colour was used as evidence at any point**: 10 of 16 runs show a run-level `failure` (the `harness-run` job itself still failing on pre-existing Phase 140-143 debt, e.g. v1.5's C5+C10 90d>60 failures), yet every one of those 10 runs' `frozen-read-probe` job independently reports `success` — direct proof the probe job's dependency-free design (no `needs:` key) works exactly as designed. Final tally: **16/16 `frozen-read-probe` jobs `success`, 0 failure, 0 skipped**.
- Pulled raw probe-job logs for the three previously-all-shallow workflows (`audit-harness-integrity.yml`, `-v1.5-`, `-v1.6-`): each shows the frozen `git show ba2cbc0:docs/_glossary-linux.md` succeeding, `readAtV15Close OK: 22198 bytes`, and `lsTreeAtV15Close OK: 34 entries` — the exact expected enumeration count.
- Recorded the D-23 residual explicitly rather than papering over it: in the 10 run-level-failure runs, every `check-phase-*` job reports `skipped` — the expected `needs: harness-run` fan-out, not a probe defect. This dispatch does **not** prove the 11 already-frozen-aware validators complete their frozen reads in CI; the `frozen-read-probe` job is the D-24 ratified **proxy** for that question, not the literal SWEEP-02 criterion. The literal criterion remains blocked on Phase 141's RED-01 greening the v1.5/v1.6 harnesses.
- Sourced the "previously threw" half of the evidence from Plan 03's local `file://` depth-1 shallow-clone negative harness (7/7 PASS, `unreachable-sha` surfaced) per D-26 — no second CI dispatch and no second owner authorization were used.
- **STOPPED at Task 2's blocking checkpoint and did not self-approve**, per the plan's `gate="blocking"` and the objective's explicit instruction. Returned the full 16-row job-level evidence table, the three-workflow probe-log spot-check, the D-23 residual, and confirmation that `origin/master` was unchanged. The orchestrator independently re-verified `origin/master` (unchanged), `origin/phase-139-atom-5` head (`c2450efa`), and all 16 `frozen-read-probe` conclusions before the owner approved.
- **Recorded, did not fix, a plan-verify-command trap**: the plan's own acceptance-criteria `jq` filter, `select(.name | test("frozen-read-probe"))`, matches against `.jobs[].name`, which is the job's `name:` display string (`Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free)`), not its YAML job key (`frozen-read-probe`). Run against the real API, that literal filter returns an empty set even though all 16 probe jobs succeeded. The evidence in this plan was gathered with the correct display-string match and cross-checked by the orchestrator; no workflow YAML was edited and nothing was re-dispatched. The mismatch is documented here and in the GOV-02 ledger so Phase 144's close audit does not misread a future empty result from the plan's literal command as "no probe job ran." The `key_links` pattern `frozen-read-probe` in the plan's frontmatter is unaffected — it correctly matches the job KEY in the workflow YAML source text, a distinct field from `.jobs[].name` in the run-time API response.

## Task Commits

1. **Task 1: Push branch, dispatch 16 workflows, collect job-level JSON** - `dd23660f` (docs — GOV-02 ledger dispatch-evidence row)
2. **Task 2 follow-up: record job-name filter trap for Phase 144** - `3b03b4b1` (docs — GOV-02 ledger addendum)

**Plan metadata:** (this commit, docs: complete plan)

_Note: this plan produces no code symbol — see "Artifacts this phase produces" in `139-01-PLAN.md`. Both commits touch only the GOV-02 ledger; the branch push and 16 dispatches are CI-side actions with no local diff to commit._

## Files Created/Modified

- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - Dispatch-evidence row (branch name, 16 run-id/probe-conclusion pairs, D-26 local-clone contrast, D-23 residual note, owner-approved branch-disposition decision) plus a follow-up addendum recording the job-name filter trap for Phase 144

## Decisions Made

- Branch `phase-139-atom-5` pushed from local HEAD while remaining checked out on `master` — avoids any risk of accidentally committing further work onto the feature branch.
- Owner pre-authorized Task 1 in advance; Task 2's blocking checkpoint was still honored as a genuine gate (halted, returned full evidence, did not self-approve) — the orchestrator's independent re-verification (origin/master unchanged, branch head confirmed, all 16 probe conclusions re-queried) is recorded as corroborated evidence, not merely claimed.
- Branch disposition: KEEP `origin/phase-139-atom-5` until the Phase 144 close audit, per the owner's pre-answered and now-confirmed instruction. Not deleted.
- The plan's own acceptance-criteria `jq` filter has a job-name field mismatch (display name vs. job key). Recorded as a known trap rather than fixed, per explicit instruction: the owner approved plain closure of the evidence, not a change to any workflow YAML or a re-dispatch.

## Deviations from Plan

### Auto-fixed Issues

None — no code, config, or workflow changes were made. The single documentation-only correction (the job-name filter trap) was explicitly instructed to be *recorded*, not auto-fixed, and involved no re-run of any acceptance-criteria command against production content — it is not a Rule 1-3 deviation.

**Total deviations:** 0 auto-fixed.
**Impact on plan:** None — plan executed exactly as written, plus the explicitly-requested recorded finding.

## Issues Encountered

- The plan's literal acceptance-criteria `jq` filter (`test("frozen-read-probe")` against `.jobs[].name`) does not match the real API's display-name field and would return an empty result if run verbatim. Worked around by filtering on the actual display string (`test("Frozen-read probe")`) and documenting the field distinction. See "Known Trap" above and the GOV-02 ledger addendum.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 139 (all 6 plans, D-41 atoms 1-5 plus this owner-gated dispatch) is complete. `origin/master` remains untouched at `347c20a8e22c0f66222de71677b3ca3fc2074fd7`; local `master` carries the full phase history, unpushed, pending the milestone's normal push-at-close cadence.
- `origin/phase-139-atom-5` stays live (owner-approved retention) until Phase 144's close audit, at which point its disposition should be re-confirmed.
- The D-23 residual (11 already-frozen-aware SWEEP-02 validators behind `needs: harness-run`) is explicitly NOT resolved by this phase and depends on Phase 141's RED-01 greening the v1.5/v1.6 harnesses.
- The job-name filter trap (display name vs. YAML job key) is flagged for whoever runs Phase 144's close audit — do not re-derive "no probe evidence" from an empty result of the plan's literal `jq` command.
- No blockers.

---
*Phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair*
*Completed: 2026-08-05*

## Self-Check: PASSED

`.planning/milestones/v1.20-GOV-02-LEDGER.md` verified present on disk with both new rows. Commit hashes `dd23660f` and `3b03b4b1` verified in `git log --oneline --all`. All 16 run ids and 3 job ids cited above were read directly from live `gh` API calls during this plan's execution, not fabricated.
</content>
