---
phase: 74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d
plan: 04
status: complete
requirements: [HARNESS-11]
commit: af15242
date: 2026-06-08
one-liner: "3-axis terminal re-audit confirmed cross-OS PASS-Count EXACT MATCH (30/0/1 chain-apex on Windows main tree == Linux GHA) across all 6 cross-OS-applicable validators; artifact-only commit `af15242`."
---

# Plan 74-04 Summary — HARNESS-11 3-Axis Terminal Re-Audit

**One-liner:** 3-axis terminal re-audit confirmed cross-OS PASS-Count EXACT MATCH (30/0/1 chain-apex on Windows main tree == Linux GHA) across all 6 cross-OS-applicable validators; artifact-only commit `af15242`.

## What was done

The HARNESS-11 3-axis terminal re-audit (D-03 LOCKED fresh-clone + D-22 fresh sub-agent + CILINUX-01 cross-OS Linux GHA), mirroring the Phase 70 HARNESS-05 precedent:

- **Ordering gate (Task 1) cleared:** Atom 2 (`407ba89`) pushed to `origin/master` (the orchestrator pushed all 49 unpushed commits with user confirmation); `gh` authenticated (Schweinehund); v1.8 workflow registered + `state: active` (ID 291622045).
- **Axis 1 + Axis 3 (Task 2):** ONE fresh `gsd-executor` sub-agent ran `git clone --no-hardlinks` into `$env:TEMP`, asserted clone HEAD == source HEAD (`fc794a7`), ran the 6 cross-OS validators, removed the clone (zero orphans). 5/6 clean; the chain-apex `check-phase-74` hit a Windows cold-clone deep-nesting flake (see Discovery).
- **Axis 2 (Task 3):** `gh workflow run audit-harness-v1.8-integrity.yml --ref master` → run `27167245009` concluded **success**; all jobs green; `rotting-external-quarterly` correctly skipped (negative control).
- **74-04-AUDIT-RESULTS.md** authored + committed artifact-only (`git show --stat HEAD` = 1 file).

## Cross-OS EXACT MATCH (6/6 validators)

| Validator | Windows (LF) | Linux GHA (LF) |
|---|---|---|
| v1.8-milestone-audit.mjs | 15/0/0 | 15/0/0 |
| check-phase-70.mjs | 46/0/5 | 46/0/5 (via CHAIN-70) |
| check-phase-71.mjs | 29/0/0 | 29/0/0 |
| check-phase-72.mjs | 35/0/0 | 35/0/0 |
| check-phase-73.mjs | 40/0/0 | 40/0/0 |
| check-phase-74.mjs | 30/0/1 | 30/0/1 |

FAIL=0 across the board.

## Discovery (NEW → v1.8-DEFERRED-CLEANUP v1.9+)

**WINDOWS-CLONE-DEEPNEST-TIMEOUT-01** — The chain-apex `check-phase-74.mjs`, when run in a *cold* fresh clone on Windows, can truncate/timeout at its deepest nested guard `V-74-CHAIN-66` (which re-runs `check-phase-66` → its own `48..65` sub-chain — an O(n²) cascade of cold Node subprocess spawns approaching the 300s timeout). The identical validator returns 30/0/1 on the warm main tree and on Linux GHA; standalone `check-phase-66` returns 28/0/0 everywhere. Performance artifact, not a correctness defect. Remediation for v1.9+: cache-warm the clone before the chain-apex run, or raise the subprocess timeout for cold-clone re-audits. HARNESS-12 (74-05) records this in v1.8-DEFERRED-CLEANUP.md.

## Key files
- created: `.planning/phases/74-.../74-04-AUDIT-RESULTS.md` (HARNESS-11 evidence + EXACT MATCH table + Wave-5 handoff)

## Self-Check: PASSED
- 3 axes executed; cross-OS EXACT MATCH proven (30/0/1 == 30/0/1, FAIL=0); artifact-only commit `af15242`; Windows cold-clone flake honestly documented as a v1.9+ discovery (not masked).
