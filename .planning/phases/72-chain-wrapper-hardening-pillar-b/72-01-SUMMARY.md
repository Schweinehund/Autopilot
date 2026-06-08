---
phase: 72-chain-wrapper-hardening-pillar-b
plan: "01"
subsystem: chain-validator
tags: [chain-validator, subprocess-wrapper, stdout-capture, atomic-commit, regression-witness, wrapper-01]
dependency_graph:
  requires: [71-01-PLAN.md (e4887b2 Phase 71 close-gate)]
  provides: [WRAPPER-01 fix (6 CHAIN catch blocks + check-phase-72.mjs regression-witness)]
  affects: [scripts/validation/check-phase-{66..72}.mjs, Phase 73 RETRO-01 inventory feed]
tech_stack:
  added: []
  patterns: [CHAIN-wrapper stdout+stderr uniform capture, Path-A validator authoring, atomic-within-plan commit]
key_files:
  created: [scripts/validation/check-phase-72.mjs]
  modified:
    - scripts/validation/check-phase-66.mjs
    - scripts/validation/check-phase-67.mjs
    - scripts/validation/check-phase-68.mjs
    - scripts/validation/check-phase-69.mjs
    - scripts/validation/check-phase-70.mjs
    - scripts/validation/check-phase-71.mjs
decisions:
  - "D-01 LOCKED Option C: Fix 6 CHAIN wrappers in check-phase-{66..71}.mjs (Phase 72 ownership boundary)"
  - "D-02 LOCKED Option B: SC#3 via 'no false positives introduced' second-clause + pre/post delta-diff witness"
  - "D-03 LOCKED Option B: 2-plan atomic split; Plan 72-01 = 7 files ONE SHA per SC#4"
  - "D-04 LOCKED Option A+delta: Source-text regex over FIXED_FILES=[66..72] + V-72-WRAPPER-NEG negative invariant"
  - "Slice budget: 500 chars (RESEARCH.md Section 9 empirical correction over D-01 initial 300 estimate)"
  - "CHAIN_WRAPPER_ANCHOR gap: {0,400} (RESEARCH.md Section 3 empirical correction — 258-char gap in check-phase-71)"
metrics:
  duration: "~15 minutes"
  completed: "2026-06-06"
  tasks: 5
  files: 7
one-liner: "Uniform stdout+stderr capture fix at 6 CHAIN-wrapper sites in check-phase-{66..71}.mjs + new check-phase-72.mjs regression-witness validator (self-dogfood, FIXED_FILES=[66..72]), landing as atomic SHA `d374095` per SC#4 byte-exact contract."
---

# Phase 72 Plan 01: WRAPPER-01 Chain-Apex stdout+stderr Capture Summary

**One-liner:** Uniform stdout+stderr capture fix at 6 CHAIN-wrapper sites in check-phase-{66..71}.mjs + new check-phase-72.mjs regression-witness validator (self-dogfood, FIXED_FILES=[66..72]), landing as atomic SHA `d374095` per SC#4 byte-exact contract.

## Executive Summary

Plan 72-01 closes the WRAPPER-01 literal contract (REQUIREMENTS.md:21) by replacing the stderr-only CHAIN-regression-guard catch blocks in `check-phase-{66,67,68,69,70,71}.mjs` with the uniform stdout+stderr capture pattern already present in each file's AUDIT-wrapper (intra-file inconsistency as unambiguous fix-direction anchor). A new chain-apex validator `scripts/validation/check-phase-72.mjs` (Path-A from check-phase-71.mjs) was authored with the corrected pattern from inception (self-dogfood per D-01 FIXED_FILES=[66..72]). All 7 files land in ONE atomic SHA `d374095` per SC#4 byte-exact contract. The fix unmasks the stdout diagnostic detail for the 8 pre-existing V-72-CHAIN-{61..67,70} FAILs (previously empty after `FAIL: `), providing Phase 73 RETRO-01 with the empirical V-61-17 + V-67-05/06 class-signature inventory it needs.

## Tasks Completed

- **Task 0 (Pre-fix baseline witness):** Ran `node scripts/validation/check-phase-71.mjs` BEFORE any source modification; captured `.claude/tmp/72-chain-pre.txt` with `Result: 21 PASS, 8 FAIL, 0 SKIPPED`. Confirmed empty FAIL detail lines (stderr-only masking surface demonstrated).
- **Task 1 (6-file CHAIN wrapper fix):** Applied uniform 2-line mechanical delta to check-phase-{66,67,68,69,70,71}.mjs: added `const stdout = err.stdout ? err.stdout.toString() : '';` after the existing `const stderr = ...` line; changed return to `(stdout + stderr).slice(0, 500).trim()`. AUDIT-wrapper catch blocks (already correct) and try-block option preludes untouched.
- **Task 2 (check-phase-72.mjs authoring):** Created new file (228 lines / 11799 bytes) as Path-A from check-phase-71.mjs. Includes 35 checks: V-72-WRAPPER-01..07 + V-72-WRAPPER-NEG + V-72-AUDIT-VERIFY + V-72-CHAIN-{48..71} + V-72-AUDIT + V-72-SELF. All 12 source-text acceptance criteria verified (CHAIN_WRAPPER_ANCHOR gap=400, FIXED_FILES=[66..72], CHAIN_PHASES=[48..71], CHAIN_SKIP=new Set([]), distinct AUDIT-VERIFY vs AUDIT IDs, self-dogfood 500-char slice). PLACEHOLDER_TOKENS/buildGarbageRegex removed (no Phase 71-style MILESTONES check needed).
- **Task 3 (Pre-commit dry-run + predecessor-byte-unchanged):** `node scripts/validation/check-phase-72.mjs` produced `Result: 26 PASS, 8 FAIL, 1 SKIPPED` (exit 1). `git diff 05668db HEAD -- <frozen surfaces>` returned EMPTY. `node scripts/validation/v1.7-milestone-audit.mjs` exited 0 with 15/15 PASS. `git status --porcelain scripts/validation/` showed exactly 7 entries (6 ` M` + 1 `??`). No commit performed.
- **Task 4 (Post-fix witness + atomic commit):** Captured `.claude/tmp/72-chain-post.txt` (26/8/1 matching pre-commit) showing stdout-diagnostic content in FAIL details. Staged 7 files explicitly. Committed with exact SC#4 message. Verified 7-file atomic SHA.

## Plan Atomic SHA

**SHA (full):** `d3740955c14b9eb163204fa69f9cd42e7db289a8`
**SHA (short):** `d374095`
**Commit message:** `fix(72-01): WRAPPER-01 chain-apex stdout+stderr capture + check-phase-72.mjs regression-witness (atomic SC#4)`

```
git show --name-only --format= d374095:
scripts/validation/check-phase-66.mjs
scripts/validation/check-phase-67.mjs
scripts/validation/check-phase-68.mjs
scripts/validation/check-phase-69.mjs
scripts/validation/check-phase-70.mjs
scripts/validation/check-phase-71.mjs
scripts/validation/check-phase-72.mjs
```

7 files changed, 240 insertions(+), 6 deletions(-), 1 file created.

## 7-File Inventory

| File | Change type | Delta |
|------|-------------|-------|
| scripts/validation/check-phase-66.mjs | Modified | +2 lines / -1 line (add stdout capture; change return slice) |
| scripts/validation/check-phase-67.mjs | Modified | +2 lines / -1 line |
| scripts/validation/check-phase-68.mjs | Modified | +2 lines / -1 line |
| scripts/validation/check-phase-69.mjs | Modified | +2 lines / -1 line |
| scripts/validation/check-phase-70.mjs | Modified | +2 lines / -1 line |
| scripts/validation/check-phase-71.mjs | Modified | +2 lines / -1 line |
| scripts/validation/check-phase-72.mjs | Created (new) | +228 lines / 11799 bytes |

Each of the 6 modified files has exactly the same 2-line mechanical delta in the CHAIN-wrapper catch block:
- ADDED: `const stdout = err.stdout ? err.stdout.toString() : '';`
- CHANGED: `stderr.slice(0, 200)` → `(stdout + stderr).slice(0, 500).trim()`

## Pre/Post Witness Comparison

| Metric | Pre-fix (`.claude/tmp/72-chain-pre.txt`) | Post-fix (`.claude/tmp/72-chain-post.txt`) |
|--------|------------------------------------------|---------------------------------------------|
| Validator | check-phase-71.mjs (29 checks) | check-phase-72.mjs (35 checks) |
| PASS | 21 | 26 |
| FAIL | 8 | 8 |
| SKIPPED | 0 | 1 (V-72-AUDIT-VERIFY SKIP-PASS) |
| V-CHAIN-61 detail pre-fix | `check-phase-61 FAIL: ` (empty — stderr masked stdout) | `check-phase-61 FAIL: check-phase-61 -- Phase 61 deliverables\n\n[1/34] V-61-01:...` (first 500 chars) |
| V-CHAIN-67 detail pre-fix | `check-phase-67 FAIL: ` (empty) | `check-phase-67 FAIL: check-phase-67 -- Phase 67 deliverables (SWEEP-01/02...)\n\n[1/28]...` |

**SC#3 note:** The PASS/FAIL/SKIPPED count delta between pre-fix (21/8/0) and post-fix (26/8/1) reflects the switch from check-phase-71 (29 checks) to check-phase-72 (35 checks). Per RESEARCH.md Pitfall 2, the SC#3 delta-diff for Plan 72-02 close-gate will use check-phase-72.mjs for both pre-fix and post-fix runs (same binary both times). The D-02 second-clause discriminator "no false positives introduced" is confirmed: post-fix FAIL count (8) = pre-fix FAIL count (8) — identical residual set, only detail strings improved.

## Transient States Landed at This SHA (commit-with-known-FAIL)

Precedent: Plan 70-05 Commit A `14683de` + Plan 71-01 Rule 4 Option A (chicken-and-egg accepted-residual).

Post-commit validator signature: **26 PASS, 8 FAIL, 1 SKIPPED** (exit 1).

### (a) Pre-existing chain degradation (NOT caused by Phase 72)

| Validator | Status | Reason | Resolution |
|-----------|--------|--------|------------|
| V-72-CHAIN-61 | FAIL | V-61-17 HEAD-coupled assertion (MILESTONES.md top-H2 stale — asserts v1.5 but HEAD is v1.7) | Phase 73 RETRO-02 frozen-aware conversion |
| V-72-CHAIN-62 | FAIL | Cascade from V-61-17 via V-62-CHAIN-61 | Phase 73 RETRO-02 |
| V-72-CHAIN-63 | FAIL | Cascade from V-61-17 via V-63-CHAIN-61 | Phase 73 RETRO-02 |
| V-72-CHAIN-64 | FAIL | Cascade from V-61-17 via V-64-CHAIN-61 | Phase 73 RETRO-02 |
| V-72-CHAIN-65 | FAIL | Cascade from V-61-17 via V-65-CHAIN-61 | Phase 73 RETRO-02 |
| V-72-CHAIN-66 | FAIL | Cascade from V-61-17 via V-66-CHAIN-61 | Phase 73 RETRO-02 |
| V-72-CHAIN-67 | FAIL | V-67-05 + V-67-06 HEAD-coupled assertions (OP-10 callouts + Version History rows at v1.7-frozen SHA aa6de68; content drift since v1.7 close) | Phase 73 RETRO-02 |
| V-72-CHAIN-70 | FAIL | Cascade from V-70-CHAIN-{61..67} | Phase 73 RETRO-02 |

**Scope class:** CHAIN-DEGRADED-AT-HEAD-01 (v1.8-DEFERRED-CLEANUP.md lines 56-99). Phase 72 Plan 72-01 is the **5th entry** in the chicken-and-egg accepted-residual lineage:
1. Plan 68-05 `3814bee` — SHA placeholder fill
2. Plan 69-02 — SHA placeholder
3. Plan 70-05 Commit A `14683de` — 77 SHA placeholder substitutions
4. Plan 71-01 `e4887b2` — 10 FAIL (2 owned + 8 pre-existing)
5. **Plan 72-01 `d374095`** — 8 pre-existing V-72-CHAIN-{61..67,70} FAILs (WRAPPER-01 fix is NEUTRAL w.r.t. this degradation)

### (b) V-72-AUDIT-VERIFY SKIP-PASS (deferred to Plan 72-02)

| Validator | Status | Reason | Resolution |
|-----------|--------|--------|------------|
| V-72-AUDIT-VERIFY | SKIPPED | 72-VERIFICATION.md not yet authored — expected; PASS-via-skip until Plan 72-02 close-gate lands | Plan 72-02 Wave 3 authors 72-VERIFICATION.md with "Per-Validator Audit Inventory" heading, flipping SKIP-PASS → PASS |

This is the design-intent of D-04 delta: the heading-presence check is intentionally a SKIP-PASS at Plan 72-01 commit time, transitioning to a real PASS once Plan 72-02 closes.

## Predecessor-Byte-Unchanged Verification

**Command run (Task 3):**
```
git diff 05668db HEAD -- .github/workflows/audit-harness-v1.7-integrity.yml scripts/validation/v1.7-milestone-audit.mjs scripts/validation/v1.7-audit-allowlist.json scripts/validation/v1.6-milestone-audit.mjs scripts/validation/v1.6-audit-allowlist.json scripts/validation/v1.5-milestone-audit.mjs scripts/validation/v1.5-audit-allowlist.json scripts/validation/v1.4.1-milestone-audit.mjs scripts/validation/v1.4-milestone-audit.mjs
```

**Result:** EMPTY output (zero diff). Predecessor surfaces unchanged since Phase 71 close-gate SHA `05668db`.

**v1.7 harness verification:**
```
node scripts/validation/v1.7-milestone-audit.mjs
Summary: 15 passed, 0 failed, 0 skipped
```

Exit 0. Predecessor-byte-unchanged invariant preserved per REQUIREMENTS.md:69.

## Phase 73 Entry-State Readiness Signal

Post-fix, the stdout-diagnostic signature is now visible at chain-apex output. The V-72-CHAIN-61 FAIL detail line now reads:

```
check-phase-61 FAIL: check-phase-61 -- Phase 61 deliverables

[1/34] V-61-01: REQUIREMENTS.md active-section has zero unchecked [ ] reqs... PASS
[2/34] V-61-02: ... PASS
[3/34] V-61-03: ... PASS
[4/34] V-61-04: ...
```

(First 500 chars; V-61-17 FAIL text appears at byte offset ~2252 — still not captured in 500-char window, but the diagnostic preview confirms the assertion chain is running. Phase 73 RETRO-01 should invoke `node scripts/validation/check-phase-61.mjs` standalone for the full V-61-17 root-cause text.)

The V-72-CHAIN-67 FAIL detail now carries:
```
check-phase-67 FAIL: check-phase-67 -- Phase 67 deliverables (SWEEP-01/02 corpus surgical sweeps)

[1/28] V-67-01: SWEEP-01 ABM URLs -- 4 https://business.apple.com refs... PASS
...
[4/28] V-67-04: SWEEP-02 sidecar ci_2_vpp_location_token -- 6 entries...
```

(V-67-05/06 at ~750-900 chars are now reachable via standalone run; the 500-char preview gives context for Phase 73 RETRO-01 classification.)

## Lineage

**5th entry** in chicken-and-egg accepted-residual lineage:
Plan 68-05 (`3814bee`) → Plan 69-02 → Plan 70-05 Commit A (`14683de`) → Plan 71-01 (`e4887b2`) → **Plan 72-01 (`d374095`)**

## Hand-off to Plan 72-02

Plan 72-02 inherits:
- Atomic SHA `d374095` — to be recorded byte-exact in 72-VERIFICATION.md Section D (SC#4 compliance) and REQUIREMENTS.md WRAPPER-01 closing SHA field
- `.claude/tmp/72-chain-pre.txt` — pre-fix baseline (check-phase-71.mjs output; 21/8/0)
- `.claude/tmp/72-chain-post.txt` — post-fix witness (check-phase-72.mjs output; 26/8/1)
- Delta-diff assertion: run `node scripts/validation/check-phase-72.mjs` AGAIN at Plan 72-02 Wave 1 to capture fresh post-commit output; compare with a pre-fix run to confirm SC#3 second-clause "no false positives introduced"
- 72-VERIFICATION.md to author (Sections A-H) — especially Section E "Per-Validator Audit Inventory" (17-site table with FIXED/DEFERRED_PHASE_73/DEFERRED_DOCUMENTED dispositions)
- V-72-AUDIT-VERIFY transitions SKIP-PASS → PASS once 72-VERIFICATION.md lands

## Deviations from Plan

None — plan executed exactly as written. The RESEARCH.md empirical corrections (gap=400, slice=500) were pre-specified in the PLAN.md interfaces block and applied as designed. The check-phase-71.mjs CHAIN wrapper fix used the same 2-line delta as the other 5 files (its 4-option env block was untouched; only the catch body modified). The check-phase-72.mjs CHAIN loop used the `isPeer`/`subEnv`/`subTimeout` pattern from check-phase-68/69/70 per PATTERNS.md Risk flag (not the simpler hardcoded env from check-phase-71.mjs). PLACEHOLDER_TOKENS/buildGarbageRegex removed as specified (no MILESTONES check in Phase 72).

## Self-Check: PASSED

- [x] `scripts/validation/check-phase-72.mjs` exists — CONFIRMED
- [x] `scripts/validation/check-phase-66.mjs` modified — CONFIRMED
- [x] `scripts/validation/check-phase-67.mjs` modified — CONFIRMED
- [x] `scripts/validation/check-phase-68.mjs` modified — CONFIRMED
- [x] `scripts/validation/check-phase-69.mjs` modified — CONFIRMED
- [x] `scripts/validation/check-phase-70.mjs` modified — CONFIRMED
- [x] `scripts/validation/check-phase-71.mjs` modified — CONFIRMED
- [x] Atomic SHA `d374095` exists — CONFIRMED (`git log --oneline` shows it)
- [x] Pre-fix witness `.claude/tmp/72-chain-pre.txt` exists with 21/8/0 — CONFIRMED
- [x] Post-fix witness `.claude/tmp/72-chain-post.txt` exists with 26/8/1 — CONFIRMED
- [x] Predecessor-byte-unchanged git diff EMPTY — CONFIRMED
- [x] v1.7 harness 15/15 PASS — CONFIRMED
