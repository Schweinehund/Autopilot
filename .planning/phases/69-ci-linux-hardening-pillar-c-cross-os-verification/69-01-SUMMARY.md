---
phase: 69
plan: 01
subsystem: ci-workflow
tags: [ci, github-actions, linux, cross-os, lf-fidelity, cilinux-01, phase-69, skeleton, transitional]
dependency_graph:
  requires:
    - .github/workflows/audit-harness-v1.6-integrity.yml (Path-A source; lines 5, 31-48, 50-63, 65-74, 86-90)
    - scripts/validation/check-phase-66.mjs (chain apex post-Phase-68 CHAIN-03)
    - scripts/validation/v1.6-milestone-audit.mjs (transitional harness-run target)
    - scripts/validation/v1.6-audit-allowlist.json (transitional parse target)
  provides:
    - .github/workflows/audit-harness-v1.7-integrity.yml (4-job skeleton; Phase 70 HARNESS-04 extends)
    - CHAIN_TIMING_LINUX `::notice` instrumentation surface (TIMEOUT-01 forward-coordination data point)
    - LF-fidelity contract (pre-checkout autocrlf-false step)
    - Skip-if-missing stubs for phases 67-70 (Phase 70 HARNESS-03 lands the validators; HARNESS-04 trims stubs)
  affects:
    - Phase 70 HARNESS-04 (extends this file; do NOT recreate)
    - Phase 69 Plan 69-02 (workflow_dispatch baseline + synthetic CRLF-injection PR + 69-VERIFICATION.md)
tech-stack:
  added:
    - GitHub Actions ubuntu-latest runner (Phase 69 is first cross-OS job in this project)
    - core.autocrlf=false pre-checkout pattern (per actions/checkout discussion #976)
    - GHA `::notice title=...::` annotation emission for forward-coordination telemetry
  patterns:
    - Path-A copy from predecessor workflow (3 jobs verbatim from v1.6 lines 31-74)
    - Skip-if-missing for-loop stub (compressed from per-validator-stanza canonical idiom; preserves Phase 42 D-31 attribution literal)
    - Chain-apex single-job topology (replaces v1.5/v1.6 19-job parallel topology; post-Phase-68 CHAIN-03)
key-files:
  created:
    - .github/workflows/audit-harness-v1.7-integrity.yml
  modified: []
decisions:
  - D-01 Option B LOCKED honored: NEW file created; predecessors byte-unchanged
  - D-02 Option B LOCKED honored: skip-if-missing for-loop for phases 67-70 with canonical Phase 42 D-31 attribution
  - D-03 Option C LOCKED honored: exactly 4 jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest); no 19-job topology
  - D-04 sub-decision (a) LOCKED honored: docs/decision-trees/09-linux-triage.md added as SC#5-evidence-only path-filter entry
metrics:
  duration_minutes: ~10
  completed_date: 2026-05-26
  files_created: 1
  files_modified: 0
  lines_added: 92
  lines_deleted: 0
  commits: 1
plan_01_commit_sha: dd1ff08a842e7ad8bb6c0d6dca021c1ea8a98d5a
plan_01_commit_short_sha: dd1ff08
pre_69_sha: 93c17c8fd9455792930010111ebef9bc93676784
predecessor_hashes_pre:
  v1_4: 08449a338b6ce87de946ad9d8e58af544cae01d8
  v1_5: 6990de2894b026551aba62d1f5ce9c95c0ff88e9
  v1_6: 89b536b3ec55e23beecb56a2e348f99fe5a3cf8c
predecessor_hashes_post:
  v1_4: 08449a338b6ce87de946ad9d8e58af544cae01d8
  v1_5: 6990de2894b026551aba62d1f5ce9c95c0ff88e9
  v1_6: 89b536b3ec55e23beecb56a2e348f99fe5a3cf8c
---

# Phase 69 Plan 01: CI-Linux Hardening (CILINUX-01) Skeleton Authoring Summary

**One-liner:** Authored `.github/workflows/audit-harness-v1.7-integrity.yml` 4-job skeleton (parse + path-match + harness-run + linux-chain-ubuntu-latest with `core.autocrlf=false` pre-checkout LF-fidelity contract + `::notice CHAIN_TIMING_LINUX` instrumentation + skip-if-missing stubs for phases 67-70) per D-01/D-02/D-03 LOCKED + D-04 sub-decision (a); predecessor workflow files byte-unchanged.

---

## What Was Built

### New File: `.github/workflows/audit-harness-v1.7-integrity.yml`

A 92-line GitHub Actions workflow YAML containing the Phase-69-scoped skeleton for v1.7 CI-Linux hardening:

| Element | Content | Source |
|---------|---------|--------|
| Header comment block (3 lines) | Skeleton scope + Phase 70 HARNESS-04 extension contract + D-04(a) path-filter narrative | NEW (synthesized) |
| `name:` | `Audit Harness v1.7 Integrity` | v1.6 line 5 with version digit bump |
| `on.pull_request.paths:` | 4 entries — `scripts/validation/check-phase-*.mjs` + workflow self-ref + `.planning/REQUIREMENTS.md` + `docs/decision-trees/09-linux-triage.md` | D-01 LOCKED + D-04(a) sub-decision |
| `on.workflow_dispatch:` | empty value (matches v1.6 line 28 idiom) | v1.6 verbatim |
| `on.schedule:` | **OMITTED** (deferred to Phase 70 HARNESS-04(b)) | D-01 LOCKED |
| `parse:` job | Validates `v1.6-audit-allowlist.json` shape via inline `node -e` | Path-A copy from v1.6 lines 31-48 verbatim (transitional sidecar reference) |
| `path-match:` job | `needs: parse`; greps `v1.6-milestone-audit.mjs` for sidecar reference | Path-A copy from v1.6 lines 50-63 verbatim |
| `harness-run:` job | `needs: path-match`; runs `node scripts/validation/v1.6-milestone-audit.mjs --verbose` | Path-A copy from v1.6 lines 65-74 verbatim |
| `linux-chain-ubuntu-latest:` job | `needs: harness-run` + `timeout-minutes: 30` + `continue-on-error: false` (explicit D-A9) + 5 steps (autocrlf -> checkout -> setup-node -> chain-apex wall-clock -> skip-if-missing for-loop) | SYNTHESIZED per CONTEXT D-03 + RESEARCH §Pattern 1 + Code Examples §1, §3, §5 |

### `linux-chain-ubuntu-latest` Step Sequence (mandatory ordering per Pitfall 1 + Pitfall 3)

1. `git config --global core.autocrlf false` (BEFORE checkout; LF-fidelity contract per actions/checkout discussion #976)
2. `actions/checkout@v4`
3. `actions/setup-node@v4` with `node-version: '20'`
4. Wall-clock-wrapped chain-apex run:
   ```
   START=$(date +%s)
   node scripts/validation/check-phase-66.mjs --verbose
   END=$(date +%s)
   echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)"
   ```
5. Skip-if-missing for-loop for phases 67-70 (canonical Phase 42 D-31 attribution preserved verbatim):
   ```
   for i in 67 68 69 70; do
     if [ -f scripts/validation/check-phase-$i.mjs ]; then
       node scripts/validation/check-phase-$i.mjs
     else
       echo "check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
     fi
   done
   ```

---

## Verification Results

### Task 1 — Baseline Capture

| Item | Value |
|------|-------|
| PRE_69_SHA | `93c17c8fd9455792930010111ebef9bc93676784` |
| v1.4 predecessor hash (pre) | `08449a338b6ce87de946ad9d8e58af544cae01d8` |
| v1.5 predecessor hash (pre) | `6990de2894b026551aba62d1f5ce9c95c0ff88e9` |
| v1.6 predecessor hash (pre) | `89b536b3ec55e23beecb56a2e348f99fe5a3cf8c` |
| v1.7 file absent pre-commit | confirmed (`test ! -f` exited 0) |
| v1.6 source clean | confirmed (`git diff HEAD` empty) |
| v1.6 line ranges verified | line 5 = `name:`; lines 31-48 = `parse:`; lines 50-63 = `path-match:`; lines 65-74 = `harness-run:`; lines 86-90 = skip-if-missing canonical idiom (all match `<interfaces>` block) |

### Task 2 — Workflow YAML Assertion Matrix

**File integrity:**

| Assertion | Result |
|-----------|--------|
| File exists | PASS |
| YAML parse via `python -m yaml safe_load` | PASS (top-level keys: name + on + jobs; jobs: [parse, path-match, harness-run, linux-chain-ubuntu-latest]) |
| Line count >= 70 | PASS (92 lines) |
| Exactly 4 job declarations (`grep -c "^  [a-z][a-z-]*:$"`) | PASS (4 = parse + path-match + harness-run + linux-chain-ubuntu-latest) |
| Line endings pure LF (zero CR bytes) | PASS (`python` byte-scan: 0 CR, 0 CRLF, 92 LF; staged blob: 0 CR, 0 CRLF, 92 LF) |

**12 Positive grep assertions:**

| # | Pattern | Task ID | Result |
|---|---------|---------|--------|
| 1 | `name: Audit Harness v1.7 Integrity` | 69-NN-02 | PASS |
| 2 | `node scripts/validation/check-phase-66.mjs --verbose` | 69-NN-04 | PASS |
| 3 | `CHAIN_TIMING_LINUX` | 69-NN-05 | PASS |
| 4 | `timeout-minutes: 30` | 69-NN-06 | PASS |
| 5 | `for i in 67 68 69 70` | 69-NN-07 | PASS |
| 6 | `git config --global core.autocrlf false` | 69-NN-03 (positive half) | PASS |
| 7 | `continue-on-error: false` | (D-A9 explicit) | PASS |
| 8 | `docs/decision-trees/09-linux-triage.md` | (D-04(a) path-filter) | PASS |
| 9 | `node scripts/validation/v1.6-milestone-audit.mjs --verbose` | (harness-run transitional) | PASS |
| 10 | `v1.6-audit-allowlist.json` | (parse transitional sidecar ref) | PASS |
| 11 | Canonical attribution literal `check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)` | (D-02 LOCKED) | PASS |
| 12 | Step ordering: autocrlf at line 9 BEFORE actions/checkout@v4 at line 10 in linux-chain-ubuntu-latest job | 69-NN-03 (ordering half) | PASS |

**4 Negative grep assertions:**

| # | Pattern (must NOT match) | Task ID | Result |
|---|--------------------------|---------|--------|
| 1 | `^\s*schedule:` (no crons) | 69-NN-08 | PASS |
| 2 | `pin-helper-advisory` substring (rephrased header comment to "supervision-pin drift advisory job" to satisfy literal grep) | 69-NN-09 | PASS |
| 3 | `\$\{\{\s*github\.event\.` (no workflow-injection surface) | 69-NN-01 (T-69-WORKFLOW-INJECTION mitigation) | PASS |
| 4 | `@(main|latest)` (no floating-version action refs) | T-69-ACTION-TYPOSQUAT mitigation | PASS |

### Task 3 — Commit + Predecessor Invariant

| Item | Value |
|------|-------|
| {69_01_SHA} | `dd1ff08a842e7ad8bb6c0d6dca021c1ea8a98d5a` |
| {69_01_SHA} short | `dd1ff08` |
| Files in commit | 1 (`.github/workflows/audit-harness-v1.7-integrity.yml`) |
| Insertions | 92 |
| Deletions | 0 |
| Commit subject regex `^feat\(phase-69\): add audit-harness-v\.7-integrity\.yml skeleton` | PASS |
| `git diff PRE_69_SHA HEAD -- <3 predecessor paths>` empty | PASS (task 69-NN-10; T-69-PREDECESSOR-DRIFT mitigated) |
| v1.4 hash post-commit identical to pre | PASS (08449a3...01d8) |
| v1.5 hash post-commit identical to pre | PASS (6990de2...88e9) |
| v1.6 hash post-commit identical to pre | PASS (89b536b...cf8c) |
| Pushed to origin | NO (intentional — push deferred to Plan 69-02 Wave 1 per Task 3 step 9) |

---

## Deviations from Plan

### Rule 2 (Auto-add missing critical functionality) — Header comment rephrasing

**Found during:** Task 2 final negative grep verification.

**Issue:** The original header comment (line 2) contained the literal substring `"pin-helper-advisory"` for documentation continuity ("Phase 70 HARNESS-04 extends this file (adds crons + pin-helper-advisory + ...)") — this is informative for future readers. However, Plan 69-01 Task 2 acceptance criterion specifies `! grep -q "pin-helper-advisory" .github/workflows/audit-harness-v1.7-integrity.yml` as a literal substring negative assertion (task 69-NN-09).

**Fix:** Rephrased the header comment to `"adds both crons + supervision-pin drift advisory job + repoints sidecar references v1.6 -> v1.7"`. Semantic intent preserved (forward reader still understands what Phase 70 adds); literal substring `pin-helper-advisory` no longer appears anywhere in the file. The actual JOB DEFINITION is what 69-NN-09 was protecting against; the rephrasing is the strictest possible reading of the literal-substring contract.

**Files modified:** `.github/workflows/audit-harness-v1.7-integrity.yml` (line 2 only; via Edit tool; LF integrity re-verified post-edit: 0 CR bytes; 92 LF; same line count)

**Commit:** Bundled into `dd1ff08` (fix applied before staging).

### No other deviations

Plan executed exactly as written for all locked decisions (D-01 / D-02 / D-03 / D-04(a)), all 8 must-have truths, all 12 positive grep assertions, all 4 negative grep assertions, mandatory step ordering, and the predecessor byte-unchanged invariant. Single commit + no push, as specified.

---

## CRLF-Fidelity Engineering Notes

Three layers of LF integrity were verified:

1. **Source bytes on disk (Windows working tree):** Wrote file via Write tool which produced pure LF (Python byte-scan confirmed 0 CR, 0 CRLF, 92 LF — Write tool defaulted to LF for `.yml` extension). Edit tool also preserved LF.
2. **Staged blob in git object store:** `git cat-file blob :.github/workflows/audit-harness-v1.7-integrity.yml | python ...` confirmed 0 CR, 0 CRLF, 92 LF — this is what GitHub stores and what ubuntu-latest runners read.
3. **Local working tree post-checkout:** Git warned `"LF will be replaced by CRLF the next time Git touches it"` — this is normal `.gitattributes` / `core.autocrlf=true` Windows-side behavior and does NOT affect what GHA Linux runners see (they read from the LF-pure object store). The runtime contract (`git config --global core.autocrlf false` step BEFORE `actions/checkout@v4` in the linux-chain job itself) further insulates the LF-fidelity contract from any `.gitattributes` regression.

Together these three layers redundantly enforce the LF-fidelity contract that is the WHOLE POINT of Phase 69 (Pillar C cross-OS verification).

---

## SC Satisfaction (Phase 69 ROADMAP)

| SC | Description | Status | Evidence |
|----|-------------|--------|----------|
| SC#1 | New ubuntu-latest runner job runs full chain on Linux LF | PASS (workflow-definition-level) | `linux-chain-ubuntu-latest` job declared with `runs-on: ubuntu-latest` + autocrlf-false-before-checkout + `node scripts/validation/check-phase-66.mjs --verbose` (recursive chain-apex per Phase 68 CHAIN-03) |
| SC#2 | PR-blocking via `continue-on-error: false` | PASS | Explicit `continue-on-error: false` declaration on `linux-chain-ubuntu-latest` job (line 73; D-A9 inheritance documented for forward-coordination clarity) |
| SC#3 | Chain exits 0 with 0 SKIPPED on ubuntu-latest | Deferred to Plan 69-02 | Requires runtime evidence from GHA workflow_dispatch execution (B.1 baseline) |
| SC#4 | Predecessor byte-unchanged | PASS | `git diff PRE_69_SHA HEAD -- <3 predecessor paths>` empty; all 3 hash-object SHAs identical pre vs post; T-69-PREDECESSOR-DRIFT HIGH-severity threat mitigated |
| SC#5 | Cross-OS reproducibility on representative PR | Deferred to Plan 69-02 | Requires synthetic CRLF-injection PR + workflow_dispatch baseline runtime evidence |

SC#1, SC#2, and SC#4 satisfied by Plan 69-01 (this plan). SC#3 and SC#5 are Plan 69-02 deliverables (runtime evidence from GHA execution).

---

## Forward Handoff to Plan 69-02

- **PRE_69_SHA recorded** = `93c17c8fd9455792930010111ebef9bc93676784` (baseline for SC#5 cross-OS comparison; Plan 69-02 captures Linux PASS counts at this SHA + dd1ff08)
- **{69_01_SHA}** = `dd1ff08a842e7ad8bb6c0d6dca021c1ea8a98d5a` — record for 69-VERIFICATION.md §D Atomic Commit SHA Record + traceability flips for CILINUX-01
- **Workflow file landed on master HEAD** = ready for `workflow_dispatch` baseline trigger (Plan 69-02 Wave 1 will push to origin/master before triggering)
- **Not yet pushed to origin** — Plan 69-02 Wave 1 owns the push so the workflow file lands on origin/master atomically with the close-gate evidence capture trigger
- **Path-filter includes `docs/decision-trees/09-linux-triage.md`** per D-04 sub-decision (a) — Plan 69-02 synthetic-PR negative case can target this file with `unix2dos` injection; Phase 70 HARNESS-04(a) inherits removal contract
- **Skip-if-missing for-loop uses canonical Phase 42 D-31 attribution literal** — Phase 70 HARNESS-04 inherits trim contract (drops for-loop once check-phase-67..70.mjs land via HARNESS-03)

---

## Known Stubs

None. The workflow file is intentionally a SKELETON per D-01 LOCKED — the 3 transitional sidecar references (`v1.6-audit-allowlist.json` / `v1.6-milestone-audit.mjs`) and 4 skip-if-missing stubs (phases 67-70) are NOT stubs in the prohibited sense (they are functionally correct and will exit 0 today); they are scheduled-for-extension surfaces with explicit Phase 70 HARNESS-04 forward-coordination contracts documented in 69-CONTEXT.md D-01 §Concrete file boundary table.

## Threat Flags

None. The workflow file does NOT introduce new security-relevant surface beyond what the planner's `<threat_model>` enumerated. All 4 STRIDE register threats (T-69-WORKFLOW-INJECTION, T-69-ACTION-TYPOSQUAT, T-69-PREDECESSOR-DRIFT, T-69-IDE-AUTO-SAVE) have their `mitigate` dispositions satisfied:
- T-69-WORKFLOW-INJECTION: `! grep -E '\$\{\{\s*github\.event\.'` returns 0 lines (negative grep #3 PASS)
- T-69-ACTION-TYPOSQUAT: `! grep -E '@(main|latest)'` returns 0 lines (negative grep #4 PASS); both `actions/checkout@v4` and `actions/setup-node@v4` use semver tags on first-party `actions/*` namespace
- T-69-PREDECESSOR-DRIFT: `git diff PRE_69_SHA HEAD -- <3 predecessor paths>` empty (Task 3 step 7 PASS); explicit hash-object cross-check (3/3 identical) per Task 3 step 3
- T-69-IDE-AUTO-SAVE: `git diff --name-only` pre-stage showed only the new file in working tree (no predecessor touched); `git diff --cached --name-only` confirmed exactly 1 file staged

---

## Self-Check: PASSED

**Files created:**

- `.github/workflows/audit-harness-v1.7-integrity.yml` — FOUND (92 lines, pure LF, YAML parses)

**Commits:**

- `dd1ff08a842e7ad8bb6c0d6dca021c1ea8a98d5a` — FOUND in `git log --all`

All claims in this summary verified before proceeding to state updates.
