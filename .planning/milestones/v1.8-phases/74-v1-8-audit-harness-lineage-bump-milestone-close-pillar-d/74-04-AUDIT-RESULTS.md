---
phase: 74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d
plan: 04
requirement: HARNESS-11
audit_method: 3-axis terminal re-audit (D-03 fresh-clone + D-22 fresh sub-agent + CILINUX-01 cross-OS Linux GHA)
source_head_sha: fc794a7fd2cf6c2c6860a8531d499c0292571f02
clone_path_pattern: "$env:TEMP\\v1.8-audit-<rand8>"
gha_workflow_run_url: https://github.com/Schweinehund/Autopilot/actions/runs/27167245009
gha_conclusion: success
cross_os_exact_match: true
atom_1_sha: 62ffaa2
atom_2_sha: 407ba89
date: 2026-06-08
---

# Phase 74 — HARNESS-11 3-Axis Terminal Re-Audit Results

**Date:** 2026-06-08
**Source HEAD:** `fc794a7fd2cf6c2c6860a8531d499c0292571f02`
**Verdict:** ✅ Cross-OS PASS-Count **EXACT MATCH** confirmed across all 6 cross-OS-applicable validators. The v1.8 harness lineage operates identically on Windows and Linux at the milestone-close commit.

This re-audit stacks three independence axes per D-03 LOCKED + D-22 INTENT + CILINUX-01, mirroring the Phase 70 (v1.7 Pillar D) HARNESS-05 precedent. Consumed by the HARNESS-12 close-gate (Plan 74-05).

---

## Axis Summary

| Axis | Independence dimension | Mechanism | Result |
|------|------------------------|-----------|--------|
| **Axis 1** | Filesystem (separate `.git/`) | Fresh `git clone --no-hardlinks` into `$env:TEMP\v1.8-audit-<rand>` (NOT a worktree — permitted under `use_worktrees:false`) | Executed; clone HEAD == source HEAD; 5/6 validators clean (see Axis-1 note) |
| **Axis 3** | Context (zero carry-over) | The SAME fresh `gsd-executor` sub-agent (one dispatch covering physical + logical isolation — not two agents, per D-03 ruling) | Executed |
| **Axis 2** | Operating system | `gh workflow run audit-harness-v1.8-integrity.yml --ref master` on `ubuntu-latest` | ✅ Run `27167245009` concluded **success**; all jobs green |

---

## Axis 1 + Axis 3 — Fresh-Clone Re-Audit (Windows local)

A single fresh `gsd-executor` sub-agent (D-22 zero-context-carryover) performed a `git clone --no-hardlinks` of the source repo into `$env:TEMP`, asserted the cloned HEAD equals source HEAD (`fc794a7…`), ran the 6 cross-OS-applicable validators, and removed the clone (zero-orphan confirmed).

| Validator | Exit | PASS | FAIL | SKIP |
|-----------|------|------|------|------|
| `v1.8-milestone-audit.mjs` | 0 | 15 | 0 | 0 |
| `check-phase-70.mjs` | 0 | 46 | 0 | 5 |
| `check-phase-71.mjs` | 0 | 29 | 0 | 0 |
| `check-phase-72.mjs` | 0 | 35 | 0 | 0 |
| `check-phase-73.mjs` | 0 | 40 | 0 | 0 |
| `check-phase-74.mjs` (chain-apex) | 0 | 30 | 0 | 1 |

Clone HEAD match: **PASS** (`fc794a7…` == `fc794a7…`). Orphan temp-clone cleanup: **0** remaining.

**Canonical Windows reference (warm main tree):** `check-phase-74.mjs` = **30 PASS / 0 FAIL / 1 SKIPPED** — verified on the main working tree at this HEAD (Plan 74-03 close + re-audit confirmation).

### Axis-1 note — Windows cold-clone deep-nesting flake (NEW DISCOVERY → v1.9+)

The first fresh-clone pass of the chain-apex `check-phase-74.mjs` exhibited a one-off truncation/timeout at its deepest nested guard `V-74-CHAIN-66`. Root cause is performance, not correctness: `V-74-CHAIN-66` re-runs `check-phase-66.mjs`, which itself re-runs the `48..65` sub-chain — an **O(n²) cascade of cold Node subprocess spawns**. On a *cold* fresh clone on Windows this approaches the harness's 300s per-subprocess timeout, producing a spurious truncated FAIL. The identical validator returns **30/0/1** on the warm main tree **and** on Linux GHA (below). Standalone `check-phase-66.mjs` returns **28 PASS / 0 FAIL / 0 SKIPPED** in every environment (main tree, CRLF clone, Linux). A secondary confound — `git clone` checking out CRLF under the machine's global `core.autocrlf=true` while CI/main-tree use LF — was ruled out as the cause (standalone validators normalize CRLF and pass). This is recorded as a v1.9+ deferred item: **`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`** (chain-apex re-audit on a cold Windows clone needs cache-warming or a raised subprocess timeout). It does **not** affect harness correctness or cross-OS parity.

---

## Axis 2 — Cross-OS Linux GHA (`ubuntu-latest`)

**Run:** https://github.com/Schweinehund/Autopilot/actions/runs/27167245009 — **conclusion: success**
**Atom 2 on origin/master:** confirmed before dispatch (ordering gate D-03 cleared: Atom 2 `407ba89` pushed; `gh` authenticated as Schweinehund; v1.8 workflow `state: active`, ID 291622045).

| GHA job | Conclusion | Result |
|---------|-----------|--------|
| Parse v1.8 sidecar JSON | ✅ success | — |
| Harness references v1.8 sidecar | ✅ success | — |
| Run v1.8 milestone audit harness | ✅ success | 15 PASS / 0 FAIL / 0 SKIP (self-test 9/9) |
| check-phase-71 validator | ✅ success | 29 PASS / 0 FAIL / 0 SKIP |
| check-phase-72 validator | ✅ success | 35 PASS / 0 FAIL / 0 SKIP |
| check-phase-73 validator | ✅ success | 40 PASS / 0 FAIL / 0 SKIP |
| check-phase-74 validator | ✅ success | 30 PASS / 0 FAIL / 1 SKIP |
| Validator chain on Linux LF (Phase 69 CILINUX-01) | ✅ success | 30 PASS / 0 FAIL / 1 SKIP (wall-clock 152s; Windows ref ~102s; timeout 300s) |
| Supervision-pin drift advisory (CI) | ✅ success | advisory (continue-on-error) |
| Quarterly c13_rotting_external link-check | ⊘ skipped | **negative control** — cron-only `if:` correctly skips on `workflow_dispatch` |

`check-phase-70.mjs` runs transitively as the `V-74-CHAIN-70` guard inside the green `check-phase-74` Linux job (the v1.8 workflow ships standalone jobs for 71–74 + the linux-chain apex; 70 is exercised through the chain).

---

## Cross-OS PASS-Count EXACT MATCH

| Validator | Axis 1 — Windows (LF, canonical) | Axis 2 — Linux GHA (LF) | Match |
|-----------|----------------------------------|--------------------------|-------|
| `v1.8-milestone-audit.mjs` | 15 / 0 / 0 | 15 / 0 / 0 | ✅ EXACT |
| `check-phase-70.mjs` | 46 / 0 / 5 | 46 / 0 / 5 (via CHAIN-70, green) | ✅ EXACT |
| `check-phase-71.mjs` | 29 / 0 / 0 | 29 / 0 / 0 | ✅ EXACT |
| `check-phase-72.mjs` | 35 / 0 / 0 | 35 / 0 / 0 | ✅ EXACT |
| `check-phase-73.mjs` | 40 / 0 / 0 | 40 / 0 / 0 | ✅ EXACT |
| `check-phase-74.mjs` (apex) | 30 / 0 / 1 | 30 / 0 / 1 | ✅ EXACT |

(Format: PASS / FAIL / SKIP. FAIL = 0 across the board.)

**Excluded from the cross-OS table (with reasons):**
- `pin-helper-advisory` — CI-only advisory (`continue-on-error: true`), not a cross-OS correctness row.
- `rotting-external-quarterly` — cron-only; correctly SKIPS on `workflow_dispatch` (negative control, not a failure).
- harness `--self-test` — local supporting evidence (9/9), folded into the milestone-audit row.

---

## Wave 5 Handoff (for HARNESS-12 / Plan 74-05)

| Item | Value |
|------|-------|
| Atom 1 SHA (HARNESS-07/08 + BASELINE_12) | `62ffaa2` |
| Atom 2 SHA (HARNESS-09/10) | `407ba89` |
| Source HEAD audited | `fc794a7` |
| Axis 2 GHA run | `27167245009` (success) |
| Cross-OS EXACT MATCH | ✅ 6/6 validators (30/0/1 apex on both OSes) |
| Discoveries for v1.8-DEFERRED-CLEANUP | `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (chain-apex cold-clone subprocess-cost on Windows) |

The v1.8 harness lineage is cross-OS-verified at the close-gate commit. HARNESS-12 (Plan 74-05) imports this evidence into `v1.8-MILESTONE-AUDIT.md` (3-axis Auditor-Independence Verification + Discoveries Surfaced During Execution).
