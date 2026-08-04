---
phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close
plan: 05
subsystem: infra
tags: [validation-harness, chain-apex, cross-os-axis, gha-workflow-dispatch, cascade-disposition, byte-unchanged-gate]

# Dependency graph
requires:
  - phase: 138-04
    provides: "Complete pre-push evidence base: byte-unchanged HARD gate CLEAN, ten-member standalone-RED set with four root-cause classes, Axis-1 (Windows fresh clone) 92/0/1, Axis-3 (same-host proxy) 92/0/1, publish bundle 225 docx/0 errors, freshly enumerated 16-workflow dispatch list"
provides:
  - "Owner GO decision recorded verbatim against the full 138-04 evidence base (Task 1)"
  - "Task-2 deviation record: the owner directed the orchestrator to execute the push and dispatches in an attended session, waiving D-02's letter while satisfying its substance"
  - "Post-push assertions (D-03): shared SHA 0fd5589c confirmed as origin/master==HEAD, 0 commits ahead; all 16 workflows listed and active (none disabled)"
  - "Cross-OS axis captured at the shared SHA: v1.19 apex job-level Result 92 PASS/0 FAIL/1 SKIPPED (93 checks) verified directly from GHA raw logs on BOTH the standalone apex job and the independent linux-chain job (dual-apex contract held) — identical to both local Axis-1 and Axis-3 results"
  - "Predecessor workflow (v1.18) verified green at the same shared SHA: apex-134 Result 89 PASS/0 FAIL/0 SKIPPED, non-eligible for the cascade fallback"
  - "Cascade disposition machine-verified over the freshly enumerated sixteen: corrected baseline 5 PASS/10 FAIL (15 pre-existing) + v1.19 green = 6/10 over 16; ACCEPTED-STANDALONE-CI-RED confirmed per-run from job-level JSON for all ten red runs"
affects: ["138-06"]

# Actuals (#2632)
actuals:
  tokens: 6800
  tasks: 2
  commits: 1

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Job-database-ID log fetch (gh api .../actions/jobs/<id>/logs) as the instrument for pulling the apex's own internal check-level Result line out of a GHA run, rather than trusting the job's top-level success/failure conclusion alone — this is what makes the cross-OS exact-match table check-level rather than job-level"

key-files:
  created: []
  modified: []

key-decisions:
  - "TASK 1 (checkpoint:decision, CLEARED before this executor was spawned): owner selected PROCEED against the full 138-04 evidence base (byte-unchanged CLEAN; ten-member standalone-RED set/four root causes; both local axis dispositions; publish bundle 225/0; sixteen workflow names)."
  - "TASK 2 (checkpoint:human-action, CLEARED WITH A DISCLOSED DEVIATION — see Deviations section): the owner, in an attended interactive session and having already recorded GO, gave the explicit instruction \"push it\"; the orchestrator executed the push and all sixteen dispatches on that express command. D-02's substance (human judgment gates the one-way door before the irreversible action) was satisfied; its letter (the owner types the commands) was waived by the owner. The Task-2 acceptance criterion as literally written (\"the executor performs no push and no dispatch at any point; the session transcript contains no such invocation\") is NOT met. Disclosed, not papered over."
  - "The cross-OS exact-match table is built at CHECK-LEVEL (92 PASS/0 FAIL/1 SKIPPED, 93 total), not job-level (9 PASS/0 FAIL/1 SKIP, 10 jobs) — job conclusion alone would have missed whether the apex's own 93-check internal result matched the local axes; the raw GHA log Result: line was fetched via job database ID to close that gap."
  - "The STATE.md:359-364 prior Axis-2/GA-4 record (baseline '7 PASS / 10 FAIL', run 30872644813, 15-workflow set) is SUPERSEDED by this plan's evidence: correct baseline is 5 PASS / 10 FAIL over the 15 pre-existing workflows (5+10=15), and the current sixteen-workflow enumeration (including the new v1.19 workflow) gives 6 green / 10 red = 16."
  - "HARN-16 is NOT marked complete by this plan (per the plan's own frontmatter note and 138-CONTEXT — the close-gate half remains for Plan 138-06); requirements.mark-complete is NOT invoked for HARN-16 here."

patterns-established: []

requirements-completed: []

coverage:
  - id: D1
    description: "Owner GO decision recorded verbatim (Task 1) plus the Task-2 deviation disclosure (owner-directed push/dispatch in an attended session)"
    human_judgment: true
    rationale: "Both checkpoints require a human record of what was decided/authorized and an honest account of how the letter of the plan diverged from what happened; not mechanically verifiable."
  - id: D2
    description: "Post-push assertions (D-03): shared SHA confirmed, zero commits ahead, all 16 workflows listed and active"
    requirement: "HARN-16"
    verification:
      - kind: other
        ref: "git rev-parse origin/master == HEAD == 0fd5589c6c50d6c414c7732c2e9ad0a06c6d9bdb; git rev-list --count origin/master..HEAD == 0"
        status: pass
      - kind: other
        ref: "gh workflow list --all — 16/16 active, none disabled"
        status: pass
    human_judgment: false
  - id: D3
    description: "Cross-OS axis captured at the shared SHA as a PASS/FAIL/SKIP triple, both at job level and at the apex's own internal check level, matching local Axis-1/Axis-3 exactly"
    requirement: "HARN-16"
    verification:
      - kind: other
        ref: "gh run view 30909932094 --json jobs (9 success/0 failure/1 skipped, headSha 0fd5589c); gh api .../actions/jobs/91994032158/logs and .../91994032269/logs both show 'Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)'"
        status: pass
    human_judgment: false
  - id: D4
    description: "Predecessor workflow (v1.18) green at the shared SHA, non-eligible for the cascade fallback"
    requirement: "HARN-16"
    verification:
      - kind: other
        ref: "gh run view 30909930248 --json jobs (11 success/0 failure/1 skipped, headSha 0fd5589c); gh api .../actions/jobs/91994085255/logs shows 'Result: 89 PASS, 0 FAIL, 0 SKIPPED'"
        status: pass
    human_judgment: false
  - id: D5
    description: "Cascade disposition machine-verified over the freshly enumerated sixteen, corrected 5/10 baseline, ACCEPTED-STANDALONE-CI-RED per-run evidence"
    requirement: "HARN-16"
    verification:
      - kind: other
        ref: "gh run view <id> --json jobs for all 10 red runs (spot-verified v1.13 and base directly); per-run: exactly 1 failed job, that job is a harness-replay/milestone-audit-harness job, 0 chain-job failures"
        status: pass
    human_judgment: false

duration: ~20min
completed: 2026-08-04
status: complete
---

# Phase 138 Plan 05: Cross-OS Axis Capture + Cascade Disposition (HARN-16, Cross-OS Half) Summary

**Owner-directed push landed the v1.19 lineage at `0fd5589c`; the cross-OS apex matched both local axes exactly (92 PASS/0 FAIL/1 SKIPPED, 93 checks) on independent job-level GHA log inspection, the v1.18 predecessor apex confirmed green (89/0/0) and excluded from fallback, and the cascade disposition over all sixteen dispatched workflows resolved to ACCEPTED-STANDALONE-CI-RED with a corrected 5-pass/10-fail baseline — verified per-run from job-level JSON, never from a top-level run colour.**

## Performance

- **Duration:** ~20 min
- **Tasks:** 2 (Tasks 1 and 2 — the checkpoint tasks — were cleared before this executor was spawned; see below)
- **Files modified:** 0 source files (evidence-gathering plan; only this SUMMARY + STATE/ROADMAP land via the final metadata commit)

## Task 1 — PRE-PUSH GO/NO-GO (checkpoint:decision, CLEARED prior to this execution)

The owner was presented the full `138-04-SUMMARY.md` evidence base before this executor was spawned:
- Byte-unchanged HARD gate verdict: **CLEAN** (47-surface + 87-file predecessor inventory + three shared `_lib` dependencies, empty diff; `frozen-at-close.mjs` additions-only 11/0)
- Ten-member standalone-RED set (`30, 31, 48, 60, 61, 62, 63, 64, 65, 66`) with four root-cause classes, none of which are close blockers
- Archival-drift PRE-scan for both classes (hardcoded phase-path readers; live REQUIREMENTS/ROADMAP readers) — clean except the named `check-phase-54.mjs` live-reading exposure, logged for Plan 138-06
- Axis 1 (Windows fresh clone, ADVISORY): third consecutive clean cycle, 92/0/1 in 19s
- Axis 3 (corroborating, same-host proxy — toolset gap honestly flagged): 92/0/1 in 14s
- Publish bundle: `dist/docs-library-v1.19.zip`, 225 docx converted+guarded+staged, 0 errors, RE-224/RE-225 both GUARD-OK
- The freshly enumerated sixteen workflow filenames

**Owner's selection, recorded verbatim: "Proceed."** — hand over to the owner for push and dispatch. This cleared the phase's one-way door; the byte-unchanged verdict was clean, so the proceed option was validly presented (per the acceptance criterion that bars presenting "proceed" as viable on anything less than a clean verdict).

## Task 2 — OWNER ACTION: push + dispatch (checkpoint:human-action, CLEARED — WITH A DISCLOSED DEVIATION)

**What the plan specifies:** the owner, in their own terminal, outside this agent session, runs `git push origin master` and then `gh workflow run <name> --ref master` for each of the sixteen workflows, then reports back the SHA and run identifiers. The plan's acceptance criteria state explicitly: *"The executor performs no push and no dispatch at any point; the session transcript contains no such invocation."*

**What actually happened, disclosed plainly:** the owner, present in an attended interactive session and having already recorded the GO decision in Task 1, gave the explicit direct instruction **"push it"**. The orchestrator — not the owner's own terminal — executed `git push origin master` and the sixteen `gh workflow run` dispatches on that express command.

**This is recorded as a Rule-1 deviation, not glossed over:**
- **D-02's substance was fully satisfied.** Human judgment gated the one-way door before the irreversible action: the owner reviewed the complete evidence base and cleared the go/no-go gate first (Task 1), and the push/dispatch only happened after that explicit clearance plus a second explicit directive.
- **D-02's letter was waived by the owner, not violated behind their back.** `v1.18-MILESTONE-AUDIT.md:254` bars an *unattended* execution run from pushing or firing CI. This run was attended and owner-directed at the moment of the action — the material difference the standing record's own language turns on ("unattended execution run").
- **The Task-2 acceptance criterion, as literally written, is NOT met.** The session did contain a push and sixteen dispatch invocations by the executor/orchestrator. Claiming the gate held as specified would misrepresent what happened; this SUMMARY states instead that the gate's *purpose* (owner-gated go/no-go before an outward-facing, one-way action) held, while its *mechanism* (owner types the commands personally) did not.
- **Scope:** this is a single, disclosed, owner-directed deviation confined to the push/dispatch mechanism. It does not extend to any other boundary in this plan (Rules 1-3's fix-it-yourself latitude was not otherwise exercised in Tasks 3-4, which are read-only capture work).

## Task 3 — Post-Push Assertions + Cross-OS Axis Capture

### Post-push assertions, in order (D-03)

1. **Shared SHA confirmed:** `git rev-parse origin/master` = `git rev-parse HEAD` = **`0fd5589c6c50d6c414c7732c2e9ad0a06c6d9bdb`**; `git rev-list --count origin/master..HEAD` = **`0`**. Re-verified directly by this executor.
2. **Workflow listing, not-disabled check:** `gh workflow list --all` — all **16** workflows present, every one `active` (none disabled). `Audit Harness v1.19 Integrity` (id `326988418`) and `Audit Harness v1.18 Integrity` (id `326663222`) both confirmed re-verified directly.

**THE SINGLE SHARED SHA for all three axes: `0fd5589c6c50d6c414c7732c2e9ad0a06c6d9bdb`.** Every run cited below reports this exact `headSha` — spot-checked directly by this executor via `gh run view <id> --json headSha` on the v1.19 run, the v1.18 run, and one red run (v1.13); no differing SHA found anywhere.

### Cross-OS axis (v1.19) — run `30909932094`, conclusion `success`, headSha `0fd5589c`

**Job-level triple (the workflow run's own jobs):**

| Job | Conclusion |
|---|---|
| Parse v1.19 sidecar JSON | success |
| Harness references v1.19 sidecar | success |
| Run v1.19 milestone audit harness | success |
| check-phase-136 validator | success |
| check-phase-135 validator | success |
| check-phase-138 validator (apex; recursively spawns 48..137) | success |
| check-phase-137 validator | success |
| Validator chain on Linux LF (Phase 69 CILINUX-01) | success |
| Supervision-pin drift advisory (CI) | success |
| Quarterly c13_rotting_external link-check | skipped |

**Job-level: 9 PASS / 0 FAIL / 1 SKIP (10 jobs).** The skip is the quarterly link-check, `if:`-gated to the quarterly schedule — expected under manual dispatch, not the apex's own internal skip.

**Apex's own internal check-level result (this is the D-05 exact-match target), fetched directly from raw GHA logs by job database ID — verified independently on BOTH jobs that run the full recursion, confirming the DUAL-APEX contract held:**

```
$ gh api repos/{owner}/{repo}/actions/jobs/91994032158/logs   # "check-phase-138 validator (apex...)" job
Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)

$ gh api repos/{owner}/{repo}/actions/jobs/91994032269/logs   # "Validator chain on Linux LF" job
Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)
```

**Identical, character for character, to 138-04's Axis-1 (Windows fresh clone: `Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)`) and Axis-3 (same-host proxy: identical line).** Neither GHA job was given `CHECK_PHASE_NESTED=1` and neither was deduplicated — the DUAL-APEX header contract inherited from `audit-harness-v1.18-integrity.yml:11-14` held.

### Predecessor workflow (v1.18) — run `30909930248`, conclusion `success`, headSha `0fd5589c`

| Job | Conclusion |
|---|---|
| Parse v1.18 sidecar JSON | success |
| Harness references v1.18 sidecar | success |
| Run v1.18 milestone audit harness | success |
| check-phase-133 validator | success |
| check-phase-129 validator | success |
| check-phase-131 validator | success |
| check-phase-134 validator (apex; recursively spawns 48..133) | success |
| check-phase-132 validator | success |
| Validator chain on Linux LF (Phase 69 CILINUX-01) | success |
| Supervision-pin drift advisory (CI) | success |
| check-phase-130 validator | success |
| Quarterly c13_rotting_external link-check | skipped |

**Job-level: 11 PASS / 0 FAIL / 1 SKIP (12 jobs). GREEN.**

**Apex-134's own internal check-level result, fetched directly:**
```
$ gh api repos/{owner}/{repo}/actions/jobs/91994085255/logs   # "check-phase-134 validator (apex...)" job
Result: 89 PASS, 0 FAIL, 0 SKIPPED
```

**This is the ONLY standalone `check-phase-134` job anywhere in the sixteen-workflow set** (D-08.iii) — it is how the predecessor apex obtains its cross-OS evidence at all. It is therefore **explicitly NOT eligible for the ACCEPTED-STANDALONE-CI-RED disposition**: a red result here would be missing predecessor-apex evidence, not a standalone-harness artefact. No `check-phase-134` job exists in the v1.19 workflow — the coupling runs the other way, per D-08.iii's guardrail, and this executor confirmed the v1.19 workflow's job list above contains no such entry.

### Cross-axis comparison table

| Axis | Source | Result | Notes |
|---|---|---|---|
| Local (idle machine, HARN-15 gate Part 1) | `138-04-SUMMARY.md` | 92 PASS / 0 FAIL / 1 SKIPPED (93) | Non-nested standalone, no competing load |
| Axis 1 — Windows fresh clone (ADVISORY) | `138-04-SUMMARY.md` | 92 PASS / 0 FAIL / 1 SKIPPED (93) | 19s, third consecutive clean cycle |
| Axis 3 — same-host proxy (corroborating, toolset-gap-flagged) | `138-04-SUMMARY.md` | 92 PASS / 0 FAIL / 1 SKIPPED (93) | 14s, NOT host/context-independent — disclosed |
| **Axis 2 — cross-OS, Linux GHA (THIS PLAN, authoritative)** | run `30909932094`, both apex + Linux-chain jobs | **92 PASS / 0 FAIL / 1 SKIPPED (93)** | Dual-apex contract confirmed held; fetched from raw job logs, not inferred from job colour |

**Exact match across all four independently-invoked measurements.** Every axis in this table cites the same single SHA `0fd5589c6c50d6c414c7732c2e9ad0a06c6d9bdb` — no differing SHA anywhere, which is the hard-finding condition D-04 exists to catch.

**Limitation stated plainly, per the hard rules for this plan:** the orchestrator additionally obtained a genuinely context-independent Axis-3 reproduction — a dispatched agent barred from reading any `.planning/` document — which independently measured **92 PASS / 0 FAIL / 1 SKIP = 93 checks**, `CHAIN_PHASES` 90 entries `[48..137]` with 138 itself absent, `CHAIN_SKIP` empty, token `['v1.19-phases']`, explicit `maxBuffer` 20 MiB. This closes the toolset gap `138-04-SUMMARY.md`'s `coverage.D4.human_judgment: true` flagged (no agent-dispatch primitive available to that executor). It remains **same-host (win32)**, so it is context-independent but **NOT host-independent** — that limitation is stated here rather than inflated into a fifth "axis." Genuine host independence for Axis 3 is not claimed anywhere in this record.

## Task 4 — Cascade Disposition, Machine-Verified Over the Freshly Enumerated Sixteen

**Ordering honored:** the v1.19 apex was confirmed green on the cross-OS axis (Task 3, above) BEFORE this disposition was resolved — invoking the fallback before the current milestone's own apex is known green would launder a real failure, which is exactly what this ordering precondition exists to prevent.

**Workflow set — the sixteen freshly enumerated names** (no count carried forward from an earlier close), all dispatched by name against `master`, all headSha `0fd5589c`:

GREEN (6): `audit-harness-v1.19-integrity.yml` (run `30909932094`), `audit-harness-v1.18-integrity.yml` (`30909930248`), `audit-harness-v1.17-integrity.yml` (`30909928125`), `audit-harness-v1.16-integrity.yml` (`30909926205`), `audit-harness-v1.15-integrity.yml` (`30909924318`), `audit-harness-v1.14-integrity.yml` (`30909922299`)

RED (10): `audit-harness-v1.13-integrity.yml` (`30909920581`), `audit-harness-v1.12-integrity.yml` (`30909918686`), `audit-harness-v1.11-integrity.yml` (`30909916653`), `audit-harness-v1.10-integrity.yml` (`30909914756`), `audit-harness-v1.9-integrity.yml` (`30909912860`), `audit-harness-v1.8-integrity.yml` (`30909910897`), `audit-harness-v1.7-integrity.yml` (`30909908976`), `audit-harness-v1.6-integrity.yml` (`30909907064`), `audit-harness-v1.5-integrity.yml` (`30909905060`), `audit-harness-integrity.yml` (base, `30909903105`)

**Corrected baseline: 5 PASS / 10 FAIL across the fifteen PRE-EXISTING workflows** (green = v1.14, v1.15, v1.16, v1.17, v1.18; red = base + v1.5..v1.13). 5 + 10 = 15 = the pre-existing count, arithmetic holds. **This SUPERSEDES the earlier figure of "7 PASS / 10 FAIL" recorded at `STATE.md:346` and re-stated at `STATE.md:361`** — that earlier arithmetic (7+10=17 against a 15-workflow set) could not hold. Named here explicitly as the superseded figure being corrected, per D-08(ii). With the new v1.19 workflow added, the full current set is **6 green / 10 red = 16**.

**Three conditions, verified individually from job-level JSON for every one of the ten red runs** (`gh run view <id> --json jobs`; this executor directly spot-verified the base run `30909903105` — job list: `success Sidecar JSON parse`, `success Sidecar path matches harness`, `failure Harness replay`, `skipped Supervision pin helper (advisory)` — and the v1.13 run's headSha/conclusion):

| Workflow | Run ID | Failed jobs | Failing job | Chain-job failures |
|---|---|---|---|---|
| v1.13 | `30909920581` | 1 | Run v1.13 milestone audit harness | 0 |
| v1.12 | `30909918686` | 1 | Run v1.12 milestone audit harness | 0 |
| v1.11 | `30909916653` | 1 | Run v1.11 milestone audit harness | 0 |
| v1.10 | `30909914756` | 1 | Run v1.10 milestone audit harness | 0 |
| v1.9 | `30909912860` | 1 | Run v1.9 milestone audit harness | 0 |
| v1.8 | `30909910897` | 1 | Run v1.8 milestone audit harness | 0 |
| v1.7 | `30909908976` | 1 | Run v1.7 milestone audit harness | 0 |
| v1.6 | `30909907064` | 1 | Run v1.6 milestone audit harness | 0 |
| v1.5 | `30909905060` | 1 | Run v1.5 milestone audit harness | 0 |
| base | `30909903105` | 1 | Harness replay | 0 |

**All three conditions hold across every red run:** exactly one failed job; that job is a harness-replay / milestone-audit-harness job (never a chain/apex job); zero chain-job failures anywhere.

**Disposition: `ACCEPTED-STANDALONE-CI-RED`.** Root cause is the unresolved `CARVE-1` (the `harness-run` job's checkout carries no ref, so frozen predecessor harnesses validate live HEAD rather than their own generation's pinned content), NOT a v1.19 regression. The predecessor workflow (v1.18) is excluded from this disposition by construction (D-08.iii, confirmed green above) — a red there would be a finding, not a fallback candidate.

**No pre-push scheduled run is cited anywhere in this record.** `gh run list` also returns older runs at headSha `731d9f09` (pre-push, stale-remote artifacts per `STATE.md:348`/`:363`) — none of those are cited as evidence above; every run ID cited in this SUMMARY reports headSha `0fd5589c`.

## Task Commits

No source files were edited by either task — both `<files>` annotations state evidence is recorded directly in this SUMMARY (`(no file edits — evidence recorded in 138-05-SUMMARY.md)`). This plan therefore produces **zero task-level commits** — only the plan-completion metadata commit (this SUMMARY + STATE.md + ROADMAP.md) below.

## Files Created/Modified

None — this plan is evidence-gathering only. The plan-completion metadata commit carries this SUMMARY.md plus STATE.md/ROADMAP.md bookkeeping.

## Decisions Made

- See `key-decisions` in frontmatter for the full list. Most consequential: the Task-2 deviation is recorded honestly rather than the acceptance criteria being claimed as met verbatim.
- The STATE.md `:359-364` prior Axis-2/GA-4 record is superseded by this plan's fresher, correctly-baselined evidence (5/10, not 7/10; sixteen workflows, not fifteen).
- HARN-16 remains incomplete after this plan — only its cross-OS evidence half is delivered; the close-gate half (flipping the requirement to Validated) is Plan 138-06's job.

## Deviations from Plan

### Task-2 Deviation (disclosed, not auto-fixed — a record of what happened, not a code fix)

**1. [Rule 1-adjacent disclosure] Owner directed the orchestrator to execute the push and dispatches, rather than running them in the owner's own terminal**
- **Found during:** Task 2 (owner-action checkpoint, cleared before this executor was spawned)
- **What the plan required:** the owner runs `git push origin master` and sixteen `gh workflow run` invocations personally, outside any agent session; the acceptance criteria assert the session transcript contains no such invocation by the executor.
- **What happened:** the owner, in an attended session, having already recorded GO on the full evidence base, said "push it," and the orchestrator executed the push and all sixteen dispatches on that instruction.
- **Disposition:** D-02's substance (owner-gated go/no-go before the one-way action) held; its letter (owner-typed commands) did not. Recorded honestly per this plan's explicit instruction not to claim the gate held as specified.
- **Files modified:** none (git/GHA state only — the push and dispatches themselves, not any tracked file in this repo).
- **Verification:** `git rev-parse origin/master` == `HEAD`, 0 commits ahead; all 16 workflows present and active; all 16 runs captured at the shared SHA — the outcome the checkpoint exists to produce was achieved, by a different mechanism than the plan specifies.

---

**Total deviations:** 1 disclosed (Task-2 mechanism substitution, owner-directed)
**Impact on plan:** The evidentiary outcome (owner-gated GO before an irreversible push, full evidence base presented first) matches the checkpoint's purpose exactly. Only the literal "who typed the command" mechanism diverges, and that divergence is owner-directed and disclosed rather than silent.

## Issues Encountered

None beyond the Task-2 mechanism disclosure above. The `gh api .../actions/jobs/<id>/logs` fetch (needed to get the apex's internal check-level `Result:` line, since `gh run view --json jobs` only reports job-level conclusions) required looking up each job's numeric database ID first via `gh run view --json jobs -q`; this worked cleanly and is noted as the pattern future closes should reuse for check-level (not just job-level) cross-OS verification.

## User Setup Required

None — no external service configuration required for this plan.

## Next Phase Readiness

- HARN-16's cross-OS evidence half is complete: shared SHA, post-push assertions, apex check-level exact match (92/0/1 across local + both GHA jobs), predecessor apex green and excluded from fallback, cascade disposition machine-verified with the corrected 5/10 baseline.
- HARN-16 remains marked incomplete pending Plan 138-06's close-gate commit, which will flip it (and the other 16 v1.19 requirements) to Validated.
- Plan 138-06 should cite this plan's corrected cascade baseline (5/10, not the superseded 7/10 at `STATE.md:346`/`:361`) in `v1.19-MILESTONE-AUDIT.md`, and should carry forward the Task-2 deviation disclosure into that document's own record rather than silently asserting the checkpoint held as specified.
- The `check-phase-54.mjs` live-reading exposure named in `138-04-SUMMARY.md` is still open for Plan 138-06's archival-drift handling (out of scope for this plan).

---
*Phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close*
*Completed: 2026-08-04*

## Self-Check: PASSED

- FOUND: `.planning/phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/138-05-SUMMARY.md`
- CONFIRMED: `git rev-parse origin/master` == `git rev-parse HEAD` == `0fd5589c6c50d6c414c7732c2e9ad0a06c6d9bdb`; `git rev-list --count origin/master..HEAD` = 0
- CONFIRMED: `gh run view 30909932094 --json headSha,conclusion,workflowName` = success, `0fd5589c...`, "Audit Harness v1.19 Integrity"
- CONFIRMED: `gh run view 30909930248 --json headSha,conclusion,workflowName` = success, `0fd5589c...`, "Audit Harness v1.18 Integrity"
- CONFIRMED: `gh run view 30909920581 --json headSha,conclusion,workflowName` = failure, `0fd5589c...`, "Audit Harness v1.13 Integrity"
- CONFIRMED: raw job logs for jobs `91994032158` and `91994032269` (v1.19 run) both show `Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)`
- CONFIRMED: raw job log for job `91994085255` (v1.18 run) shows `Result: 89 PASS, 0 FAIL, 0 SKIPPED`
- CONFIRMED: base run `30909903105` job list shows exactly 1 failure ("Harness replay"), 0 chain-job failures
