---
phase: 70
plan: 70-03
subsystem: validation-harness
tags: [harness-03, harness-04, atomic-commit, v1.7-frozen-aware, chain-validator, fetch-depth-01]
requires:
  - 70-02 (Atom 1 HARNESS-01 + HARNESS-02 + BASELINE_11)
provides:
  - HARNESS-03 (4 chain validators check-phase-67..70.mjs with per-assertion freshness routing)
  - HARNESS-04 (audit-harness-v1.7-integrity.yml EXTEND — 9 itemized edits a..i)
affects:
  - Plan 70-04 (Wave 4 terminal re-audit; 3-axis stacking now ready — chain-67..70 active)
  - Plan 70-05 (Wave 5 close-gate; {phase_70_close_SHA} placeholder substitution target)
tech-stack:
  added: []
  patterns:
    - "CHECK_PHASE_NESTED env var short-circuit (Windows-host nested chain polynomial cost mitigation)"
    - "v1.7-frozen-aware helper pattern (9 helpers across 4 validators per 70-CONVENTIONS.md)"
    - "Per-job fetch-depth:0 inheritance (extended from linux-chain to all check-phase-NN jobs)"
key-files:
  created:
    - scripts/validation/check-phase-67.mjs
    - scripts/validation/check-phase-68.mjs
    - scripts/validation/check-phase-69.mjs
  modified:
    - scripts/validation/check-phase-70.mjs (Wave-1 scaffold → V-70-01..27 full bodies)
    - .github/workflows/audit-harness-v1.7-integrity.yml (9 itemized EXTEND edits)
decisions:
  - "D-01 LOCKED inherited: per-assertion-class freshness routing — 9 v1.7-frozen-aware helpers + HEAD-coupled chain/audit/self guards (70-CONVENTIONS.md matrix executed verbatim)"
  - "D-02 LOCKED inherited: Atom 2 5-file CI-execution-graph indivisibility — ONE git SHA aa6de68; predecessor v1.4/v1.5/v1.6 workflow YAMLs BYTE-UNCHANGED"
  - "Deviation Rule 1 fix: V-68-04 corrected to 5 call-sites (matches actual CHAIN-02 deliverable; 70-CONVENTIONS.md row text included regenerate-supervision-pins.mjs but the helper is NOT imported there — only the 5 check-phase-{31,48,60,62,63}.mjs validators import it)"
  - "Deviation Rule 1 fix: V-70-12 anchored-regex to locate `  pin-helper-advisory:` JOB line (distinct from comment mention at file header)"
  - "Deviation Rule 3 fix: helpers add `stdio: ['ignore','pipe','pipe']` to silence inner git stderr leak when {phase_70_close_SHA} placeholder is unresolved (caused parent-process stderr noise + downstream chain-guard exit-code-non-zero misinterpretation)"
  - "Deviation Rule 3 fix: chain-guards for v1.7-cohort peer validators (>=67) set CHECK_PHASE_NESTED=1 env to short-circuit recursive chain expansion on Windows (polynomial wall-clock cost; Linux GHA topology uses parallel jobs so this is Windows-only mitigation)"
  - "V-70-15 EXTRA fetch-depth:0 inheritance: extended from linux-chain-ubuntu-latest checkout to each new check-phase-NN job (67/68/69/70) for FETCH-DEPTH-01 consistency"
metrics:
  duration: ~45 min
  tasks_completed: 6/6
  files_modified: 5
  completed: 2026-05-28
---

# Phase 70 Plan 70-03: ATOMIC v1.7 Validator + CI Surface (HARNESS-03 + HARNESS-04) Summary

**One-liner:** 5-file Atom 2 atomic commit lands HARNESS-03 chain validators (check-phase-67/68/69/70.mjs) with per-assertion freshness routing + HARNESS-04 workflow EXTEND (v1.7-scoped path-filter + 2 crons + parse/path-match/harness-run repoint + active chain-67..70 jobs + pin-helper-advisory + rotting-external-quarterly; PRESERVES fetch-depth:0 LOAD-BEARING + core.autocrlf + CHAIN_TIMING_LINUX) in ONE SHA aa6de68 per Phase 66-02 `3a9a671` + Phase 68 `7b635ca` dual precedent.

## Atom 2 Atomic Commit

- **SHA:** `aa6de68`
- **Files (exactly 5):**
  1. `scripts/validation/check-phase-67.mjs` NEW (HARNESS-03 sub-deliverable A)
  2. `scripts/validation/check-phase-68.mjs` NEW (HARNESS-03 sub-deliverable B)
  3. `scripts/validation/check-phase-69.mjs` NEW (HARNESS-03 sub-deliverable C)
  4. `scripts/validation/check-phase-70.mjs` MODIFIED (HARNESS-03 sub-deliverable D — Wave-1 scaffold replaced with V-70-01..27 full bodies)
  5. `.github/workflows/audit-harness-v1.7-integrity.yml` MODIFIED (HARNESS-04 EXTEND — 9 itemized edits)
- **Insertions:** 1503 lines; deletions: 99 lines.
- **Predecessor BYTE-UNCHANGED:** `git diff HEAD~1 HEAD -- .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml .github/workflows/audit-harness-v1.6-integrity.yml` → empty.

## Pre-commit Dry-run Evidence (Windows Host)

All 6 dry-run protocol steps GREEN before staging the atomic commit:

| Step | Command | Result |
|------|---------|--------|
| a | `node scripts/validation/v1.7-milestone-audit.mjs` | 15/15 PASS (Atom 1 still green) |
| b | `node scripts/validation/check-phase-67.mjs` | 21 PASS, 0 FAIL, 7 SKIPPED ✓ |
| c | `node scripts/validation/check-phase-68.mjs` | 31 PASS, 0 FAIL, 2 SKIPPED ✓ |
| d | `node scripts/validation/check-phase-69.mjs` | 31 PASS, 0 FAIL, 0 SKIPPED ✓ |
| e | `node scripts/validation/check-phase-70.mjs` | 41 PASS, 0 FAIL, 10 SKIPPED ✓ |
| f | `node scripts/validation/check-phase-66.mjs` (chain-apex) | 28 PASS, 0 FAIL, 0 SKIPPED ✓ |

**SKIPPED counts are chicken-and-egg `{phase_70_close_SHA}` placeholders** awaiting Plan 70-05 Commit A `sed -i` substitution:
- check-phase-67: 7 SKIPPED = V-67-01..07 (all SWEEP corpus state v1.7-frozen-aware)
- check-phase-68: 2 SKIPPED = V-68-05 (BASELINE banner) + V-68-09 (MILESTONES.md cdcce23 cleanup)
- check-phase-70: 10 SKIPPED = V-70-18..27 (HARNESS-05/06 + 4-doc traceability closure)

**Predecessor blob hashes verified BYTE-UNCHANGED** (V-69-08 + V-70-17 documented values):
- `08449a338b6ce87de946ad9d8e58af544cae01d8` (v1.4)
- `6990de2894b026551aba62d1f5ce9c95c0ff88e9` (v1.5)
- `89b536b3ec55e23beecb56a2e348f99fe5a3cf8c` (v1.6)

## Tasks Completed

### Task 1: `check-phase-67.mjs` NEW (Path-A from check-phase-66.mjs)
- `CHAIN_PHASES = [48..66]` (19 elements; V-67-SELF guard verified: 67 excluded)
- `CHAIN_SKIP = new Set([])` (Phase 68 CHAIN-03 invariant)
- 2 v1.7-frozen-aware helpers: `readCorpusFileAtV17Close(relPath)` + `readSidecarAtV17Close()`
- 7 V-67-NN bodies per 70-CONVENTIONS.md matrix (V-67-01..07 — all SWEEP corpus state, v1.7-frozen-aware)
- V-67-CHAIN regression-guards for check-phase-{48..66}.mjs
- V-67-AUDIT executes `node scripts/validation/v1.7-milestone-audit.mjs`
- Standalone exit 0 verified: 21 PASS / 0 FAIL / 7 SKIPPED

### Task 2: `check-phase-68.mjs` NEW (Path-A)
- `CHAIN_PHASES = [48..67]` (20 elements; V-68-SELF: 68 excluded)
- 2 v1.7-frozen-aware helpers: `readMilestonesAtV17Close()` + `readCorpusFileAtV17Close(relPath)` (for BASELINE banner)
- 11 V-68-NN bodies per matrix (MIXED routing):
  - HEAD-coupled: V-68-01..04, V-68-06..08, V-68-10..11 (CHAIN-01/02/03 + parseAllowlist + v1.5-frozen-aware helpers + subprocess timeout)
  - v1.7-frozen-aware: V-68-05 (BASELINE_9 banner shift), V-68-09 (MILESTONES.md cdcce23 cleanup)
- Standalone exit 0 verified: 31 PASS / 0 FAIL / 2 SKIPPED

### Task 3: `check-phase-69.mjs` NEW (Path-A)
- `CHAIN_PHASES = [48..68]` (21 elements; V-69-SELF: 69 excluded)
- 0 v1.7-frozen-aware helpers (all V-69-NN are HEAD-coupled per D-01 matrix)
- 8 V-69-NN bodies per matrix (all HEAD-coupled workflow YAML structural assertions):
  - V-69-01..02: workflow YAML existence + 4 named jobs
  - V-69-03: `core.autocrlf false` step
  - V-69-04: **`fetch-depth: 0` LOAD-BEARING preservation** (FETCH-DEPTH-01 inheritance)
  - V-69-05: `continue-on-error: false` (D-A9 PR-blocking)
  - V-69-06: `node-version: '20'`
  - V-69-07: `::notice title=CHAIN_TIMING_LINUX::` emission preserved
  - V-69-08: **predecessor v1.4/v1.5/v1.6 BYTE-UNCHANGED** via `git hash-object` blob comparison against documented PRED_BLOBS map
- Standalone exit 0 verified: 31 PASS / 0 FAIL / 0 SKIPPED

### Task 4: `check-phase-70.mjs` MODIFIED (Wave-1 scaffold → V-70-01..27 full bodies)
- Wave-1 placeholder count: pre = 29 (27 V-70-NN bodies + 2 in section comments); post = 0 ✓ (`grep -c "Wave-1 placeholder" check-phase-70.mjs == 0`)
- 7 v1.7-frozen-aware helpers added: `readCorpusFileAtV17Close`, `readMilestoneAuditAtV17Close`, `readDeferredCleanupAtV17Close`, `readRequirementsAtV17Close`, `readRoadmapAtV17Close`, `readStateAtV17Close`, `readProjectAtV17Close`
- 27 V-70-NN bodies (MIXED routing):
  - V-70-01..17: HEAD-coupled (live HARNESS-01/02/03/04 deliverable assertions)
  - V-70-18..27: v1.7-frozen-aware via `{phase_70_close_SHA}` placeholder (HARNESS-05/06 + traceability closure)
- Preserved from Wave-1: `CHAIN_PHASES = [48..69]`, `CHAIN_SKIP = new Set([])`, V-70-SELF + V-70-CHAIN + V-70-AUDIT
- Standalone exit 0 verified: 41 PASS / 0 FAIL / 10 SKIPPED

### Task 5: `.github/workflows/audit-harness-v1.7-integrity.yml` EXTEND (9 edits)
- **EDIT (a) APPLIED:** REMOVED `docs/decision-trees/09-linux-triage.md` from path-filter (Phase-69-evidence-only entry per D-04 sub-decision (a))
- **EDIT (b) APPLIED:** Path-filter v1.7-scoped — 6 entries: `scripts/validation/v1.7-*`, `scripts/validation/check-phase-*.mjs`, workflow self-reference, REQUIREMENTS.md, v1.7-MILESTONE-AUDIT.md, v1.7-DEFERRED-CLEANUP.md
- **EDIT (c) APPLIED:** Added `schedule:` block with 2 crons (`0 8 * * 1` weekly + `0 8 1 1,4,7,10 *` quarterly); removed stale `# NOTE: on.schedule: OMITTED` comment block
- **EDIT (d) APPLIED:** `parse` job repointed v1.6 → v1.7 (job name + step name + JSON.parse path + console.log)
- **EDIT (e) APPLIED:** `path-match` job repointed v1.6 → v1.7 (name + grep target + OK/FAIL messages)
- **EDIT (f) APPLIED:** `harness-run` job repointed v1.6 → v1.7 (name + node invocation)
- **EDIT (g) APPLIED:** check-phase-67..70 skip-if-missing for-loop REPLACED with 4 active separate jobs (Option (ii) per 70-RESEARCH.md Open Question 2; each job has timeout-minutes:15, continue-on-error:false, fetch-depth:0)
- **EDIT (h) APPLIED:** `pin-helper-advisory` job added (verbatim from v1.6 workflow lines 190-206; `continue-on-error: true`)
- **EDIT (i) APPLIED:** `rotting-external-quarterly` job added (Path-A from v1.6 lines 156-188; sidecar reference REPOINTED v1.6 → v1.7)
- **PRESERVED (LOAD-BEARING — DO NOT TOUCH):**
  - `linux-chain-ubuntu-latest` `core.autocrlf false` step ✓
  - `linux-chain-ubuntu-latest` checkout `fetch-depth: 0` ✓ (FETCH-DEPTH-01 inheritance)
  - `linux-chain-ubuntu-latest` `timeout-minutes: 30` ✓
  - `linux-chain-ubuntu-latest` `continue-on-error: false` ✓ (D-A9 PR-blocking)
  - chain-apex `::notice title=CHAIN_TIMING_LINUX::` emission ✓

Acceptance checks (all PASS):
- `grep -c "v1.6-" workflow.yml` == **0** ✓
- `grep "docs/decision-trees/09-linux-triage.md" workflow.yml` → **empty** ✓
- `grep "fetch-depth: 0" workflow.yml` → **5 occurrences** (1 linux-chain + 4 new chain-67..70 jobs) ✓
- `grep "core.autocrlf false" workflow.yml` → **2 occurrences** ✓
- `grep "CHAIN_TIMING_LINUX" workflow.yml` → **2 occurrences** ✓
- `grep "0 8 \* \* 1" workflow.yml` → **1 occurrence** (weekly cron) ✓
- `grep "0 8 1 1,4,7,10" workflow.yml` → **2 occurrences** (cron + sidecar event-filter) ✓
- `grep "pin-helper-advisory" workflow.yml` → **2 occurrences** ✓
- `grep "rotting-external-quarterly" workflow.yml` → **2 occurrences** ✓
- `grep -cE "node scripts/validation/check-phase-(67|68|69|70).mjs" workflow.yml` → **4 occurrences** ✓
- `grep -c "scripts/validation/v1.7-" workflow.yml` → **5 occurrences** ✓
- `grep -c "continue-on-error: false" workflow.yml` → **6 occurrences** (linux-chain + 4 new chain jobs + harness D-A9) ✓

### Task 6: ATOMIC commit
- Pre-commit dry-run: all 6 protocol steps GREEN (see table above).
- Staging: `git add` for exactly 5 files; `git diff --cached --name-only` shows 5 lines.
- Commit message references Atom 2 of D-02 + HARNESS-03 + HARNESS-04 + dual precedent (Phase 66-02 + Phase 68 `7b635ca`).
- Post-commit verification: `git log -1 HEAD --name-only` shows **EXACTLY 5 files**.
- Predecessor BYTE-UNCHANGED verified post-commit.
- Atomic SHA: **aa6de68**.

## Deviations from Plan

### Rule 1 — Bug fixes applied during execution

**1. [Rule 1 — Spec mismatch] V-68-04 call-site count corrected: 6 → 5**
- **Found during:** Task 2 dry-run of check-phase-68.mjs
- **Issue:** 70-CONVENTIONS.md row V-68-04 specifies "5 call-sites (check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs)" — implying 6 total. Reality: regenerate-supervision-pins.mjs does NOT import `archive-path`; only the 5 chain validators do.
- **Fix:** Removed `regenerate-supervision-pins.mjs` from the CALL_SITES array in V-68-04 assertion body.
- **Files modified:** scripts/validation/check-phase-68.mjs (V-68-04 body)
- **Commit:** aa6de68

**2. [Rule 1 — Logic bug] V-70-12 false-positive on file header comment**
- **Found during:** Task 6 dry-run of check-phase-70.mjs
- **Issue:** Original V-70-12 used `c.indexOf('pin-helper-advisory')` which matched the file header comment first (line 4) instead of the actual job definition at line 184. Resulted in V-70-12 FAIL because the 1200-char window from the comment didn't include `continue-on-error: true`.
- **Fix:** Replaced indexOf with anchored regex `/^\s{2}pin-helper-advisory:[\s\S]{0,1200}/m` matching the 2-space-indented YAML job declaration.
- **Files modified:** scripts/validation/check-phase-70.mjs (V-70-12 body)
- **Commit:** aa6de68

### Rule 3 — Blocker fixes applied during execution

**3. [Rule 3 — Stderr leak] v1.7-frozen-aware helpers leaked inner git stderr**
- **Found during:** Task 2 dry-run; check-phase-68's V-68-CHAIN-67 misinterpreted check-phase-67 as FAILing due to "fatal: invalid object name '{phase_70_close_SHA}'" stderr noise from inner git subprocess calls.
- **Issue:** Helpers `readCorpusFileAtV17Close()`, `readSidecarAtV17Close()`, etc. used `execFileSync('git', ['show', '{phase_70_close_SHA}:...'])` without explicit `stdio` option. Node's default behavior allowed inner git's stderr (printing "fatal: ...") to leak to parent's stderr, corrupting downstream chain-guard error inspection.
- **Fix:** Added `stdio: ['ignore', 'pipe', 'pipe']` to all 9 v1.7-frozen-aware helpers across check-phase-67/68/70.mjs (check-phase-69 has no helpers — all HEAD-coupled).
- **Files modified:** scripts/validation/check-phase-67.mjs, check-phase-68.mjs, check-phase-70.mjs
- **Commit:** aa6de68

**4. [Rule 3 — Polynomial recursion blocker] Chain-guards for v1.7-cohort peers timed out**
- **Found during:** Task 2/3/4 dry-run; check-phase-68/69/70 chain-guards invoke peer v1.7 validators (67/68/69) as subprocesses; each peer THEN runs its own full predecessor chain (48..NN-1), causing polynomial Windows-host wall-clock blowup. check-phase-70 standalone projected at >30 min, exceeding subprocess timeout.
- **Issue:** Architectural — recursive chain-validator topology has O(N²) cost on Windows due to per-subprocess spawn overhead (~3-10s per validator). Linux GHA topology avoids this via parallel job execution (per HARNESS-04 EDIT (g)).
- **Fix:** Added `CHECK_PHASE_NESTED=1` env var detection at the top of each v1.7 validator's chain-guard loop. When set, all chain-guards return SKIPPED with detail "nested invocation: skip recursive chain-guard expansion". The OUTER chain-guard (in check-phase-68/69/70) sets this env var when invoking peer validators (>=67). Result: each peer skips its own chain-guards when invoked nested, reducing wall-clock from ~30+ min to ~7-10 min per standalone validator.
- **Architectural rationale:** Linux GHA topology uses parallel jobs (1 per validator); the nested env var is a Windows-host pragmatic accommodation only. Each standalone validator still PASSES its V-NN-CHAIN-NN assertions when invoked directly (CHECK_PHASE_NESTED unset).
- **Files modified:** scripts/validation/check-phase-67.mjs (NESTED detection), check-phase-68.mjs (NESTED detection + env propagation for peers >=67), check-phase-69.mjs (same), check-phase-70.mjs (same)
- **Commit:** aa6de68

**5. [Rule 3 — Defense-in-depth] fetch-depth:0 extended to each new chain-67..70 job**
- **Found during:** Task 5 workflow YAML authoring
- **Issue:** Original plan EDIT (g) topology spec'd separate jobs for chain-67..70 but didn't explicitly mandate `fetch-depth: 0` on each. The chain validators use `git hash-object` for predecessor blob comparison (V-69-08 + V-70-17) and v1.7-frozen-aware helpers use `git show <SHA>:<path>` — both require full history fetch for reliable resolution on Linux GHA runners.
- **Fix:** Added `with: { fetch-depth: 0 }` to the checkout step of each of the 4 new jobs (check-phase-67, check-phase-68, check-phase-69, check-phase-70). Preserves FETCH-DEPTH-01 inheritance consistency across all chain-validator job topologies.
- **Files modified:** .github/workflows/audit-harness-v1.7-integrity.yml
- **Commit:** aa6de68

## Authentication Gates

None. This plan is entirely local validation tooling + CI workflow YAML; no Microsoft Graph or Azure AD credentials required.

## Known Stubs

None. All V-NN-NN assertion bodies are fully implemented. The 19 total SKIPPED checks across the 4 validators are chicken-and-egg `{phase_70_close_SHA}` placeholder skips, NOT stubs — they will become PASS after Plan 70-05 Commit A `sed -i` substitutes the actual close-gate SHA across all 9 helpers in 4 validators. This is the documented chicken-and-egg resolution pattern per 70-CONVENTIONS.md §"Chicken-and-Egg SHA Placeholder Convention" and 70-CONTEXT.md D-04 Option (b).

## Threat Flags

None new. Existing threat register (T-70-V14 atomic indivisibility, T-70-FETCH FETCH-DEPTH-01 preservation, T-70-SELF V-NN-SELF guard, T-70-CHAIN-DIV chain-topology divergence) all mitigated as documented.

## Forward-Pointers

- **Plan 70-04 (Wave 4 terminal re-audit):** Now ready to execute axis 2 (GHA workflow_dispatch on `audit-harness-v1.7-integrity.yml` at master HEAD post-aa6de68). chain-67..70 jobs are ACTIVE (not skip-if-missing); cross-OS Linux CILINUX-01 verification will exercise all 4 new validators in parallel.
- **Plan 70-05 (Wave 5 close-gate):** Commit A target `sed -i` substitution of `{phase_70_close_SHA}` literal placeholder across 4 validators + `{phase_70_atom_1_SHA}` in regenerate-supervision-pins.mjs (per 70-CONVENTIONS.md §"Chicken-and-Egg SHA Placeholder Convention"). Post-substitution, all 19 SKIPPED checks should flip to PASS, yielding 21+31+31+41 = **124 PASS / 0 FAIL / 0 SKIPPED** across the 4 v1.7 validators.

## Self-Check: PASSED

**Created files (all confirmed via `[ -f ... ] && echo FOUND`):**
- FOUND: scripts/validation/check-phase-67.mjs
- FOUND: scripts/validation/check-phase-68.mjs
- FOUND: scripts/validation/check-phase-69.mjs
- FOUND: scripts/validation/check-phase-70.mjs (modified Wave-1 → full)
- FOUND: .github/workflows/audit-harness-v1.7-integrity.yml (modified Phase-69-stub → Phase-70-EXTEND)

**Commit hash:**
- FOUND: aa6de68 (atomic 5-file commit)

**Acceptance criteria summary:**
- [x] All 5 files land in ONE atomic git SHA aa6de68 ✓
- [x] check-phase-67/68/69/70.mjs each exit 0 standalone ✓
- [x] V-NN-SELF guard verified per validator (CHAIN_PHASES excludes own phase) ✓
- [x] CHAIN_SKIP = new Set([]) across all 4 validators (Phase 68 invariant) ✓
- [x] Predecessor v1.4/v1.5/v1.6 workflow YAMLs BYTE-UNCHANGED ✓
- [x] FETCH-DEPTH-01 inheritance preserved (`grep "fetch-depth: 0"` returns 5 occurrences) ✓
- [x] 09-linux-triage.md REMOVED from path-filter ✓
- [x] Zero v1.6- references in v1.7 workflow YAML ✓
- [x] Active chain-67..70 node invocations replace skip-if-missing for-loop ✓
- [x] Wave-1 placeholder phrase count = 0 in check-phase-70.mjs ✓
- [x] 70-03-SUMMARY.md created ✓
