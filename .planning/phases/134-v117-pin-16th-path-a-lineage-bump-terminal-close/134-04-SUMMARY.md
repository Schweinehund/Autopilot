---
phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
plan: 04
subsystem: infra
tags: [validator-chain, pre-push-audit, byte-unchanged-gate, cross-os-reaudit]

# Dependency graph
requires:
  - phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
    plan: 01
    provides: V117 back-anchor pin + WAVE0_ANCHOR SHA (18fd8b63)
  - phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
    plan: 02
    provides: 16th Path-A harness (v1.18-milestone-audit.mjs) + v1.18-audit-allowlist.json + BASELINE_22
  - phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
    plan: 03
    provides: check-phase-129..134.mjs (apex proven green standalone) + audit-harness-v1.18-integrity.yml
provides:
  - "Full predecessor chain [48..133] non-nested 0-FAIL evidence (88 PASS / 0 FAIL / 1 SKIPPED)"
  - "Predecessor byte-unchanged HARD gate clean verdict (zero unsanctioned drift since WAVE0_ANCHOR; TOOL-04/TOOL-06 sanctioned exceptions confirmed pre-dating the anchor)"
  - "Axis 1 (Windows fresh-clone, advisory) result: 88/0/1, exact match with local run, no deep-nest stall this cycle"
  - "Axis 3 (same-host, restricted-scope) result: leaf validators 3/5/5/5/3 all-PASS + CHECK_PHASE_NESTED=1 shallow apex 1 PASS/0 FAIL/88 SKIPPED, honestly dispositioned as non-independent"
affects: [134-05]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Pre-push full-chain sweep BEFORE close-gate authoring (LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01)", "Byte-unchanged gate scoped to the phase's own WAVE0_ANCHOR window, not the full predecessor history — sanctioned Phase-133 exceptions verified as ancestors of the anchor rather than re-diffed"]

key-files:
  created: []
  modified: []

key-decisions:
  - "Byte-unchanged HARD gate computed as git diff WAVE0_ANCHOR(18fd8b63)..HEAD: zero predecessor-surface files appear in the diff at all (only Phase 134's own new/appended files) — confirmed via git merge-base --is-ancestor that all three Phase-133 sanctioned commits (aaf0d2ff, 74939dfb, ba6d53f4) predate the anchor, so the gate is clean by construction, not by exclusion-list filtering"
  - "Axis 3 dispatched as a second fresh git clone on the SAME Windows host (no subagent-dispatch tool or second host available in this execution environment) — honestly dispositioned as corroborating-only per the GA-1 mandatory guardrail, restricted to the 5 leaf validators (full) + a CHECK_PHASE_NESTED=1-gated shallow apex run, never claimed as a fully independent third axis; Axis 2 (GHA, Plan 134-05) remains sole-authoritative per D-03"
  - "Axis 1 completed the full non-nested [48..133] apex recursion without hitting WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 this cycle (unlike the research's flagged risk at depth 86) — recorded honestly as a completed PASS, not assumed or forced"

patterns-established: []

requirements-completed: [HARN-13]

# Metrics
duration: 12min
completed: 2026-07-20
---

# Phase 134 Plan 04: Pre-Push Re-Audit — Full Chain + Byte-Unchanged Gate + Axis 1/3 Summary

**Full predecessor chain [48..133] proven 0-FAIL standalone (88 PASS/0 FAIL/1 SKIPPED); predecessor byte-unchanged HARD gate clean (zero unsanctioned drift, both Phase-133 exceptions independently confirmed pre-dating WAVE0_ANCHOR); Axis 1 Windows fresh-clone completed exact-match (no deep-nest stall); Axis 3 honestly dispositioned as same-host corroborating-only.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-07-20T05:33:00Z
- **Completed:** 2026-07-20T05:45:00Z
- **Tasks:** 2 completed
- **Files modified:** 0 (evidence-only plan, no source edits — SUMMARY.md is the sole artifact)

## Accomplishments

- Ran `node scripts/validation/check-phase-134.mjs --verbose` standalone (CHECK_PHASE_NESTED unset, full non-nested recursion of the [48..133] chain): **88 PASS, 0 FAIL, 1 SKIPPED** (89 total checks: AUDIT (legitimate pre-close-gate skip) + 86 CHAIN entries + AUDIT-HARNESS + SELF). Every one of the 86 nested predecessor validators (48 through 133) exited 0.
- Computed the predecessor byte-unchanged HARD gate as `git diff 18fd8b63..HEAD` (WAVE0_ANCHOR from 134-01-SUMMARY.md): the diff contains **only** Phase 134's own new/appended files (`check-phase-129..134.mjs`, `v1.18-milestone-audit.mjs`, `v1.18-audit-allowlist.json`, the 15th CI workflow, the append-only edits to `_lib/frozen-at-close.mjs` and `regenerate-supervision-pins.mjs`, plus this phase's own `.planning/` docs). **Zero** predecessor `check-phase-48..128.mjs`, `v1.4..v1.17-audit-allowlist.json`, or `v1.4..v1.17-milestone-audit.mjs` files appear in the diff at all.
- Independently confirmed via `git merge-base --is-ancestor` that all three sanctioned Phase-133 commits — `aaf0d2ff` (TOOL-04, 14-sidecar re-pin), `74939dfb` (TOOL-06, check-phase-60/61.mjs stderr-budget bump), and `ba6d53f4` (check-phase-48.mjs revert-to-n:200) — are ancestors of WAVE0_ANCHOR, i.e. already baked into the anchor commit before Phase 134 began. This explains why they don't appear in the Phase-134-scoped diff and confirms the gate is clean by construction (Phase 134 introduced zero additional predecessor drift on top of the already-landed, already-sanctioned Phase-133 exceptions).
- Directly verified `check-phase-48.mjs` shows **0 lines** of diff between WAVE0_ANCHOR and HEAD (`git diff ... -- scripts/validation/check-phase-48.mjs | wc -l` → 0) — net-zero confirmed, not merely inferred from absence in the file list.
- **Axis 1 (Windows fresh clone, ADVISORY per GA-1 D-01):** `git clone --no-hardlinks` into a scratch dir; ran `v1.18-milestone-audit.mjs --verbose` (16 passed/0 failed/0 skipped), all 5 leaf validators (129-133, each exact-match with the local run), and the full non-nested `check-phase-134.mjs --verbose` apex — completed in full at **88 PASS, 0 FAIL, 1 SKIPPED**, byte-for-byte identical to the local/standalone run above. `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` did **not** manifest this cycle at depth 86 (contrary to the research's flagged risk) — recorded honestly as a completed exact-match PASS, not assumed to have stalled and not forced to stall.
- **Axis 3 (independent/zero-context, GA-1 mandatory guardrail):** no subagent-dispatch tool (e.g. Task/Agent) and no second host/runner are available in this execution environment, so a genuinely independent axis could not be constructed. Ran a second, separate fresh clone on the **same Windows host**, restricted per the research's fallback recommendation to the 5 leaf validators (full, all PASS, exact match) plus a `CHECK_PHASE_NESTED=1`-gated shallow apex run (1 PASS / 0 FAIL / 88 SKIPPED — the intended single-apex O(n) shape, all CHAIN/AUDIT-HARNESS checks legitimately SKIPPED per the NESTED guard). **Honestly dispositioned as same-host, corroborating-only, NOT a fully independent third axis** — per the CONTEXT guardrail "a same-host win32 subagent inherits the timeout and is not an independent axis," this disposition applies structurally (same host) even though no timeout actually occurred this cycle. Axis 2 (Linux GHA, Plan 134-05) remains the sole cross-OS-authoritative axis per D-03.

## Task Commits

Each task was committed atomically:

1. **Task 1: Full predecessor-chain 0-FAIL sweep + predecessor byte-unchanged HARD gate** - no file edits (evidence recorded in SUMMARY per plan spec) — no commit
2. **Task 2: Axis 1 + Axis 3 local re-audit** - no file edits (evidence recorded in SUMMARY per plan spec) — no commit

**Plan metadata:** (this commit, pending)

## Files Created/Modified

None — this plan is evidence-only per its own spec (`files_modified: []` in frontmatter); the sole artifact is this SUMMARY.md.

## Full-Chain Sweep Result (HARN-13 acceptance criterion)

```
node scripts/validation/check-phase-134.mjs --verbose   (CHECK_PHASE_NESTED unset, standalone, non-nested)
Result: 88 PASS, 0 FAIL, 1 SKIPPED
```
The single SKIP is the legitimate pre-close-gate `V-134-AUDIT` skip (134-VERIFICATION.md is authored at Plan 134-05's close-gate, not yet). All 86 CHAIN entries (48 through 133 inclusive) and the AUDIT-HARNESS check PASS.

## Predecessor Byte-Unchanged HARD Gate — Verdict: PASS

**Base:** `WAVE0_ANCHOR = 18fd8b63bfc68957ced2750b3241ad9760609a94` (captured in 134-01-SUMMARY.md, before any Phase-134 edit landed).

**`git diff --name-only 18fd8b63..HEAD`** (17 files, all Phase 134's own):
```
.github/workflows/audit-harness-v1.18-integrity.yml
.planning/REQUIREMENTS.md
.planning/ROADMAP.md
.planning/STATE.md
.planning/phases/134-.../134-01-SUMMARY.md
.planning/phases/134-.../134-02-SUMMARY.md
.planning/phases/134-.../134-03-SUMMARY.md
scripts/validation/_lib/frozen-at-close.mjs          <- append-only (V117 entry + export)
scripts/validation/check-phase-129.mjs               <- NEW
scripts/validation/check-phase-130.mjs               <- NEW
scripts/validation/check-phase-131.mjs               <- NEW
scripts/validation/check-phase-132.mjs               <- NEW
scripts/validation/check-phase-133.mjs               <- NEW
scripts/validation/check-phase-134.mjs               <- NEW
scripts/validation/regenerate-supervision-pins.mjs   <- append-only (BASELINE_22 comment)
scripts/validation/v1.18-audit-allowlist.json        <- NEW
scripts/validation/v1.18-milestone-audit.mjs         <- NEW
```

**Enumerated sanctioned exceptions (both confirmed as ancestors of WAVE0_ANCHOR, hence invisible to the Phase-134-scoped diff above — evidentiary record of their historical landing):**

| Exception | Commit | Files | Ancestor of WAVE0_ANCHOR? |
|---|---|---|---|
| TOOL-04 re-pin | `aaf0d2ff` | 14 `v1.4-v1.16-audit-allowlist.json` sidecars | YES (`git merge-base --is-ancestor` confirmed) |
| TOOL-06 stderr-budget bump | `74939dfb` | `check-phase-60.mjs`, `check-phase-61.mjs` | YES (confirmed) |
| check-phase-48 revert (net-zero) | `ba6d53f4` | `check-phase-48.mjs` | YES (confirmed) — and `git diff WAVE0_ANCHOR..HEAD -- scripts/validation/check-phase-48.mjs` returns 0 lines, directly proving net-zero |

**No predecessor `check-phase-48..128.mjs`, `v1.4..v1.17-audit-allowlist.json`, or `v1.4..v1.17-milestone-audit.mjs` file appears anywhere in the WAVE0_ANCHOR..HEAD diff.** The gate passes with zero unexplained drift.

## Axis 1 / Axis 3 Dispositions (HARN-13 acceptance criterion)

| Axis | Host | Scope | Result | Disposition |
|---|---|---|---|---|
| Axis 1 | Windows, fresh `git clone --no-hardlinks` | Full harness + 5 leaves + full non-nested apex [48..133] | **88 PASS, 0 FAIL, 1 SKIPPED** — exact match with local/standalone run | ADVISORY per GA-1 D-01; completed without hitting WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 this cycle (depth 86) — recorded honestly, not assumed |
| Axis 3 | Windows, same host as Axis 1 (second fresh clone) | 5 leaves (full) + `CHECK_PHASE_NESTED=1` shallow apex | Leaves: 3/5/5/5/3 all-PASS, exact match. Shallow apex: 1 PASS/0 FAIL/88 SKIPPED (intended single-apex O(n) shape) | Honestly dispositioned as **corroborating-only, NOT independent** (same host, no subagent-dispatch tool or second runner available in this execution environment) — per GA-1's mandatory guardrail this structural non-independence is stated regardless of whether a stall occurred |
| Axis 2 | Linux GHA | Full harness + full apex, via `audit-harness-v1.18-integrity.yml` | Deferred to Plan 134-05 (close-PR push) | **Sole cross-OS-authoritative axis per D-03** |

No axis omission is undocumented; the Axis-3-independence limitation is stated explicitly rather than silently claiming a false 3-axis exact-match.

## Decisions Made

- Computed the byte-unchanged gate against the plan's specified `WAVE0_ANCHOR` (Phase-134-start), which happens to post-date all three Phase-133 sanctioned exception commits — rather than re-diffing against an earlier pre-Phase-133 base. This is the correct interpretation of the plan's `<read_first>` instruction (which points at `134-01-SUMMARY.md`'s recorded anchor) and yields the same evidentiary conclusion (no unsanctioned drift) via ancestor-confirmation instead of exclusion-listing.
- Ran Axis 3 on the same host (no alternative host/runner or subagent-dispatch tool exists in this execution environment) and disposed of it honestly as corroborating-only, per the CONTEXT/research guardrail against claiming a false independent third axis.

## Deviations from Plan

None - plan executed exactly as written. Both tasks are evidence-gathering with `files_modified: []`; no code was touched.

## Issues Encountered

None. Axis 1 did not encounter the WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 stall the research flagged as a risk at depth 86 — this is recorded as a genuine completed result, not treated as suspicious or overridden.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Pre-push evidence base is complete: full chain 0-FAIL, byte-unchanged gate clean (both sanctioned exceptions enumerated and independently ancestor-confirmed), Axis 1 exact-match PASS, Axis 3 honestly dispositioned as corroborating-only. Plan 134-05 (the close-gate) can proceed to push the close-PR, fire Axis 2 (Linux GHA, sole cross-OS-authoritative per D-03), machine-verify any Class-B cascade disposition via `gh run view --json jobs` (GA-4, sequence-coupled to confirming apex=134 ran+passed on Axis 2 first), and author the single close-gate commit. No blockers.

---
*Phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-20*
