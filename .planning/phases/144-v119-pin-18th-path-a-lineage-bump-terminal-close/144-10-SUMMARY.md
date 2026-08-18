---
phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
plan: 10
subsystem: infra
tags: [ci-evidence, cross-os-exact-match, job-level-json, harn-19, remediation-round]

# Dependency graph
requires:
  - phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
    provides: "Plan 09's owner-executed push + 17-workflow dispatch (two rounds) at the shared close SHA — this plan's evidence-gathering surface"
provides:
  - "Axis-2 job-level evidence: 17 runs, 211 jobs, 196 success / 15 classified skips / 0 failures, read-back-verified at one shared SHA"
  - "The one D-22 remediation round recorded in full: root cause, fix commit, before/after job set"
  - "Axis-1 fresh full-depth clone + Axis-3 same-host proxy reproduction, both at the shared SHA, byte-identical to Axis-2's raw logs"
  - "Cross-OS exact-match table covering the harness, five leaves, and apex, with the one legitimate non-identical cell (self-test, Windows-only) named rather than smoothed"
  - "A blocking human checkpoint (Task 3) gating the close-gate on the complete three-axis evidence set"
affects: [144-11, 144-12]

status: complete

# Actuals (#2632)
actuals:
  tokens: 4800
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Job-level JSON matched on the display-name field, never the YAML job key (D-21), independently re-fetched via gh run view/gh api rather than transcribed from the owner's briefing"
    - "Live-derived skip-guard grep (D-21b) rather than a carried expected-skip count"
    - "Second independent git clone as the disclosed same-host Axis-3 proxy when no agent-dispatch primitive is available in the executor's toolset, following the exact honesty precedent set at v1.19 Plan 138-04"

key-files:
  created: []
  modified:
    - .planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md

key-decisions:
  - "Recorded the D-22 remediation round in full rather than silently starting from the already-green second dispatch: first dispatch (32aaae63) had 16/17 green with v1.20 failing on 3 jobs, all one root cause (check-nav-hub-links.mjs self-test case G measuring a host property instead of the resolver's own behavior); fix commit 2858c0b5 retargeted the fixture leaf to a name absent on every platform; second dispatch (2858c0b5, the shared SHA) reached 17/17 green. This is the ONE round D-22 authorizes, and it succeeded."
  - "Corrected the pre-task briefing's '16 pin-helper-advisory jobs' figure to a measured 17 (one per workflow, including base) rather than carrying the unverified number forward — per this project's own D-36 measure-don't-carry discipline."
  - "Axis-3 could not be obtained as a genuinely context-independent dispatched agent, because this session's toolset exposes no subagent/Task-dispatch primitive. Rather than silently substituting a weaker proxy and calling it Axis-3 unqualified, disclosed the limitation explicitly (a second, fully independent git clone + node process, sharing no state with Axis-1) and routed the question of whether this satisfies HARN-19's Axis-3 bar to the Task 3 human checkpoint, following the exact same honesty pattern the v1.19 predecessor used at Plan 138-04 for an identical toolset gap."
  - "Marked the harness's --self-test leg as a legitimate non-identical cell in the cross-OS exact-match table (Windows-only; no --self-test job exists in the v1.20 CI workflow) rather than omitting it or forcing a false all-identical claim — per the plan's own instruction that a legitimately-differing triple gets its cause recorded in the same row, not smoothed over."
  - "Used core.longpaths=true on both fresh clones (a Windows MAX_PATH necessity for this repo's deep .planning/milestones/ paths) — disclosed as a Windows-clone mechanic, not a scope change; a depth-1/shallow clone was explicitly avoided per the plan's instruction that a shallow clone fatals readAtClose()."

requirements-completed: []

coverage:
  - id: T1
    description: "Exactly 17 runs selected by manual-dispatch event AND recorded head SHA; all 17 headSha values read back and equal to the shared SHA."
    requirement: "HARN-19"
    verification:
      - kind: other
        ref: "gh run view <id> --json name,event,headSha,conclusion for all 17 IDs -> 17/17 workflow_dispatch, headSha == 2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c, run-level conclusion success"
        status: pass
    human_judgment: false
  - id: T2
    description: "Job-level evidence table: one row per workflow, one row per job with that job's own conclusion; zero failed jobs excluding the non-evidence advisory job."
    requirement: "HARN-19"
    verification:
      - kind: other
        ref: "gh run view <id> --json jobs for all 17 runs -> 211 jobs total: 196 success (179 evidence-bearing + 17 non-evidence advisory), 15 classified skips, 0 failures"
        status: pass
    human_judgment: false
  - id: T3
    description: "Skip ledger complete: observed count equals live-derived expected count; zero dependency-cascade skips."
    requirement: "HARN-19"
    verification:
      - kind: other
        ref: "grep -rn \"github.event_name == 'schedule'\" .github/workflows/*.yml -> 15 matches; observed 15 Quarterly c13_rotting_external skips; 0 needs:harness-run cascade skips (0 failures anywhere means harness-run never failed)"
        status: pass
    human_judgment: false
  - id: T4
    description: "Exactly one remediation round recorded, with its new SHA and the forced Axis-1/Axis-3 re-run cost stated."
    requirement: "HARN-19"
    verification:
      - kind: other
        ref: "First dispatch 32aaae63 (16/17, v1.20 failed 3 jobs, root cause check-nav-hub-links.mjs case G); fix 2858c0b5; second dispatch 2858c0b5 (17/17 green) -- one round, spent, succeeded"
        status: pass
    human_judgment: false
  - id: T5
    description: "Axis-1 fresh full-depth clone and Axis-3 reproduction both check out the shared SHA and reproduce PASS/FAIL/SKIP triples for the harness, five leaves, and apex."
    requirement: "HARN-19"
    verification:
      - kind: automated
        ref: "Axis-1: harness 16/0/0 + self-test 9/9, leaves 5/0/0 5/0/0 6/0/0 6/0/0 9/0/0, apex 100/0/1 (101 total), exit 0 each. Axis-3: byte-identical. Both clones full-depth (is-shallow-repository=false), checked out SHA confirmed via git rev-parse HEAD in each clone."
        status: pass
    human_judgment: false
  - id: T6
    description: "Cross-OS exact-match table complete, one row per validator class, one column per axis, every non-identical cell carries a recorded cause."
    requirement: "HARN-19"
    verification:
      - kind: other
        ref: "8-row table in 144-EVIDENCE.md; row 8 (apex) EXACT MATCH across all measurements incl. both the standalone apex job and the linux-chain-ubuntu-latest DUAL-APEX job (raw logs, both 100 PASS/0 FAIL/1 SKIPPED); row 2 (self-test) named as a legitimate Windows-only leg, not smoothed"
        status: pass
    human_judgment: false
  - id: T7
    description: "Working tree unchanged by the fresh clones; apex re-confirmed green in the main tree after cleanup."
    requirement: "HARN-19"
    verification:
      - kind: automated
        ref: "git status --porcelain --untracked-files=no -> 0 lines before and after both clone operations; node scripts/validation/check-phase-144.mjs in the main tree post-cleanup -> 100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101), exit 0"
        status: pass
    human_judgment: false

## Deviations from Plan

### Auto-fixed Issues

None — no bugs found or fixed by this plan; this is a read-only evidence-gathering and verification pass. No source, script, or workflow file was edited by this plan (the one code fix, `2858c0b5`, was the owner-executed remediation round that landed before this plan began — this plan records it, does not author it).

### Recorded (not fixed) deviations

**1. [Not a Rule 1-4 deviation — a measured correction to the prompt's own briefing figure] pin-helper-advisory job count corrected 16 -> 17.**
- **Found during:** Task 1, the skip/advisory classification pass
- **Issue:** The plan's `<already_done_by_the_owner>` context stated "16 pin-helper-advisory jobs were excluded as NON-EVIDENCE." Direct measurement (`grep -c -i "advisory"` against each of the 17 runs' fetched job lists) found 17 — one in every workflow, including the base workflow.
- **Fix:** Recorded the measured figure (17) in `144-EVIDENCE.md`, with the correction stated explicitly rather than silently substituted, per this project's own D-36 measure-don't-carry discipline (the same discipline that governed 144-08's "13-of-16 not 10-of-16" correction).
- **Files modified:** `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md` (evidence only, no code)
- **Commit:** `9f37e14a`

**2. [Toolset limitation, disclosed per the plan's own gray-area routing] Axis-3 could not be obtained as a genuinely context-independent dispatched agent.**
- **Found during:** Task 2
- **Issue:** This executor's toolset (Read/Write/Edit/Bash/Grep/Glob/Skill) exposes no subagent/Task-dispatch primitive. v1.19's Axis-3 (Plan 138-05) used a dispatched agent explicitly barred from reading `.planning/` documents — that mechanism is unavailable this session.
- **Handling:** Followed the exact precedent set at v1.19 Plan 138-04 for the identical gap: substituted a second, fully independent `git clone` + separate `node` process invocations as the strongest available proxy, explicitly disclosed as NOT a claim of LLM-context independence, and routed the open question ("does this satisfy HARN-19's Axis-3 bar, or is a dispatched-agent run required before close?") to the Task 3 human checkpoint rather than silently asserting the axis was satisfied.
- **Files modified:** none (disclosure only, in the evidence doc)
- **Commit:** `8dd3fc58`

## Auth Gates

None encountered.

## Known Stubs

None — this plan performs read-only evidence gathering (CI API reads, two fresh git clones, local validator runs) and appends only to `144-EVIDENCE.md`.

## Threat Flags

None — no new network endpoints, auth paths, file-access patterns, or schema changes were introduced. This plan's own threat register (T-144-38 through T-144-42) is addressed by the evidence structure recorded above (job-level provenance quoted from fetched JSON/raw logs, head-SHA read-back on all 17 runs plus both fresh clones, classified skip ledger, single bounded remediation round), not by any new code surface.

## Checkpoint Reached (Task 3 — NOT resolved by the executor)

Task 3 is a `checkpoint:human-verify` with `gate="blocking"`. Per the plan's own instructions and
this phase's absolute prohibitions, the executor halted at this checkpoint without self-approving.
See the top-level response for the full `## CHECKPOINT REACHED` block with the evidence the human
needs, including the one open question this plan could not resolve itself (whether the disclosed
same-host Axis-3 proxy satisfies HARN-19's Axis-3 bar).

## Self-Check: PASSED

- `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md` — FOUND (Task 1 + Task 2 sections both present, 248 total insertions across two commits)
- Commit `9f37e14a` — FOUND (`git log --oneline --all | grep 9f37e14a` matches)
- Commit `8dd3fc58` — FOUND (`git log --oneline --all | grep 8dd3fc58` matches)
- `git rev-parse HEAD` at self-check time: `8dd3fc58598367dc66c404d2095344caa430f385` — matches the second commit
- `node scripts/validation/check-phase-144.mjs` in the main working tree post-cleanup: `100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)`, exit 0 — FOUND (re-run, not inferred)
- Fresh-clone scratchpad directories (`144-10-axis1-clone`, `144-10-axis3-clone`) removed after use — FOUND (`rm -rf` confirmed, main working tree never touched by either clone)
