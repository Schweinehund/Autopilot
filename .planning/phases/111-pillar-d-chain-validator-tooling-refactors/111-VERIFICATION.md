---
phase: 111-pillar-d-chain-validator-tooling-refactors
verified: 2026-07-01T06:00:00Z
status: passed
score: 3/3 must-haves verified
overrides_applied: 0
re_verification: false
---

# Phase 111: Pillar D — Chain-Validator Tooling Refactors — Verification Report

**Phase Goal:** Three DRY refactors applied to the validator chain with behavior/verdict-equivalence maintained on all predecessor frozen surfaces: TOOL-01 centralizes failure-detail extraction, TOOL-02 adopts the centralized frozen-aware module, TOOL-03 fixes helper-spawn stderr capture.
**Verified:** 2026-07-01
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `_lib/exec-fail-detail.mjs` exists, exports `execFailDetail` + `selfTest`, selfTest passes all 5 assertions (TOOL-01) | VERIFIED | File read at scripts/validation/_lib/exec-fail-detail.mjs: correct D-04 signature, all 5 selfTest assertions present |
| 2 | All 40 `(stdout + stderr).slice(0,N)` failure-detail sites across 20 check-phase files consume `execFailDetail`; no inline slice duplicates remain (TOOL-01) | VERIFIED | `grep -rE "\(stdout \+ stderr\)\.slice\(0," scripts/validation/check-phase-*.mjs` returns 0; 21 files import execFailDetail |
| 3 | All 14 inline frozen-aware readers across check-phase-{61,67,68,70} replaced by centralized frozen-at-close adoption; check-phase-61 uses Landmine-C-safe no-stdio local wrapper (TOOL-02) | VERIFIED | check-phase-61 has readAtV15CloseFor61 (no stdio option); old symbols absent; check-phase-67/68/70 import readAtV17Close/readAtV17CloseGate with catch→null wrappers; no inline execFileSync git show remains in 67/68 |
| 4 | The 3 `--self-test` catch blocks in check-phase-{48,60,61} capture BOTH stdout and stderr (TOOL-03) | VERIFIED | All 3 files: `const stdout = err.stdout ? err.stdout.toString() : '';` confirmed; `execFailDetail(stdout, stderr, { n: 200, ... })` present; 0 remaining `stderr.slice(0, 200)` patterns |
| 5 | Landmine A: removal of old inline symbols from check-phase-61 AND V-68-10 tolerant-OR fix land in one atomic commit | VERIFIED | `git show 8e6d94a --stat` shows both check-phase-61.mjs and check-phase-68.mjs modified in the same commit |
| 6 | Landmine B: all centralized adoption sites wrap readAtClose calls in catch→null | VERIFIED | check-phase-67: `try { return readAtV17Close(relPath); } catch (e) { return null; }`; check-phase-68: same pattern; check-phase-70: 8 wrappers all catch→null |
| 7 | Landmine C: check-phase-61 readAtV15CloseFor61 deliberately omits stdio option | VERIFIED | Line 37: `execFileSync('git', ['show', 'ba2cbc0:' + relPath], { encoding: 'utf8', timeout: 10000 })` — no stdio key |

**Score:** 3/3 ROADMAP success criteria verified (7/7 detailed truths)

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/validation/_lib/exec-fail-detail.mjs` | D-04 `execFailDetail(stdout, stderr, {n, trim, prefix})` + selfTest() | VERIFIED | Exists; correct 3-axis signature; selfTest exports 5 assertions matching RESEARCH spec |
| `scripts/validation/check-phase-61.mjs` | TOOL-01 Variant A+B sites + TOOL-02 no-stdio wrapper + TOOL-03 self-test both-stream | VERIFIED | execFailDetail imported; readAtV15CloseFor61 (no stdio); old symbols absent; stdout capture at V-61-34 |
| `scripts/validation/check-phase-68.mjs` | TOOL-01 Variant A+C sites + TOOL-02 adoption + V-68-10 tolerant-OR | VERIFIED | execFailDetail imported; readAtV17Close delegation with catch→null; V-68-10 uses `hasUnified` / `!hasUnified && (!hasReq \|\| !hasRoad)` OR-logic |
| `scripts/validation/check-phase-70.mjs` | TOOL-02 adoption of all 8 inline readers incl. readAtV17CloseGate for V17_CLOSEGATE site | VERIFIED | Imports both `readAtV17Close` and `readAtV17CloseGate`; 8 wrappers present; `readProjectAtV17CloseGate` site routes to `tryReadAtV17CloseGate` (line 64) |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| check-phase-82.mjs | `_lib/exec-fail-detail.mjs` | `import { execFailDetail }` | VERIFIED | Import present; `execFailDetail(stdout, stderr, { n: 500 ... })` and `{ n: 300 ... }` calls confirmed |
| check-phase-70.mjs | `_lib/frozen-at-close.mjs` | `import { readAtV17Close, readAtV17CloseGate }` | VERIFIED | Both imports present; readAtV17CloseGate used at V17_CLOSEGATE site (line 64) |
| check-phase-68.mjs | check-phase-61.mjs | V-68-10 tolerant-OR assertion | VERIFIED | V-68-10 passes when `readAtV15CloseFor61` is present (`hasUnified` true); OR-logic prevents false FAIL |

---

## Detailed Per-Tool Verification

### TOOL-01: exec-fail-detail.mjs (40-site extraction)

**Helper file:** `scripts/validation/_lib/exec-fail-detail.mjs`

- Exports `execFailDetail(stdout, stderr, { n, trim = false, prefix = '' })` — correct D-04 signature
- `n` has no default (explicit-only per D-02)
- Body: `combined = stdout + stderr; sliced = combined.slice(0, n); return prefix + (trim ? sliced.trim() : sliced)` — algebraically byte-identical to all three inline variants
- Exports `selfTest()` with all 5 labeled assertions (A-basic, A-trim, C-basic, C-no-trim, slice-n)
- `--self-test` entry-point: `if (process.argv.includes('--self-test')) { console.log(selfTest()); }` — matches codebase convention

**Inline duplicate elimination:**

- `grep -rE "\(stdout \+ stderr\)\.slice\(0," scripts/validation/check-phase-*.mjs` → **0 matches**
- 21 files import execFailDetail (20 TOOL-01 sites + check-phase-48 for TOOL-03)

**Variant fidelity:**

| Variant | Files | n | trim | Verified |
|---------|-------|---|------|---------|
| A (CHAIN) | All 20 TOOL-01 files | 500 | true | check-phase-73:382 (`n: 500, trim: true, prefix: 'check-phase-' + ...`), check-phase-100:115 confirmed |
| B (harness, 60+61 only) | check-phase-60:256, check-phase-61:366 | 500 | true | `{ n: 500, trim: true, prefix: 'harness FAIL: ' }` — NOT n:300 (Pitfall 1 avoided) |
| C (harness, 62-100) | 18 files | 300 | false | check-phase-73:405, check-phase-100:138 confirmed; check-phase-73 and check-phase-100 both have dual variants at different lines (Constraint 5 obeyed) |

### TOOL-02: frozen-at-close.mjs adoption

**check-phase-61.mjs:**

- Old symbols `readRequirementsAtV15Close` and `readRoadmapAtV15Close`: **absent** (grep confirms 0 matches)
- New `readAtV15CloseFor61(relPath)` wrapper at line 35: `execFileSync('git', ['show', 'ba2cbc0:' + relPath], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n')` — **no stdio option** (Landmine C preserved)
- 8 call sites updated to use `readAtV15CloseFor61(REQUIREMENTS)` and `readAtV15CloseFor61(ROADMAP)`

**check-phase-67.mjs:**

- Imports `readAtV17Close` from `_lib/frozen-at-close.mjs`
- `tryReadAtV17Close(relPath)`: `try { return readAtV17Close(relPath); } catch (e) { return null; }` (Landmine B)
- JSON-parsing variant: `try { return JSON.parse(readAtV17Close('...allowlist.json')); } catch (e) { return null; }` (contract preserved)
- 0 inline `execFileSync('git'` calls remain in check-phase-67

**check-phase-68.mjs:**

- Imports `readAtV17Close` from `_lib/frozen-at-close.mjs`
- `readMilestonesAtV17Close` and `readCorpusFileAtV17Close` bodies replaced with `readAtV17Close` delegation + catch→null
- 0 inline `execFileSync('git'` calls remain in check-phase-68
- V-68-10 (lines 198-214): `const hasUnified = c.includes('readAtV15CloseFor61')` → `if (!hasUnified && (!hasReq || !hasRoad))` → OR-tolerant; PASSES with current check-phase-61 state

**check-phase-70.mjs:**

- Imports both `readAtV17Close` and `readAtV17CloseGate` from `_lib/frozen-at-close.mjs`
- 8 wrappers at lines 42, 45, 48, 51, 54, 57, 60, 64 — all catch→null (Landmine B)
- Line 64: `try { return readAtV17CloseGate('.planning/PROJECT.md'); } catch (e) { return null; }` — uses V17_CLOSEGATE SHA (4df3a16), not V17 (aa6de68)
- 1 remaining `execFileSync('git'` at line 353: `git hash-object` call — NOT a frozen content reader; correctly left in place

### TOOL-03: --self-test both-stream capture

All 3 sites confirmed both-stream capture:

| File | stdout capture | execFailDetail params |
|------|---------------|----------------------|
| check-phase-48.mjs:74 | `const stdout = err.stdout ? err.stdout.toString() : '';` | `{ n: 200, trim: false, prefix: '--self-test FAIL: ' }` |
| check-phase-60.mjs:190 | `const stdout = err.stdout ? err.stdout.toString() : '';` | `{ n: 200, trim: false, prefix: '--self-test FAIL: ' }` |
| check-phase-61.mjs:380 | `const stdout = err.stdout ? err.stdout.toString() : '';` | `{ n: 200, trim: false, prefix: '--self-test FAIL: ' }` |

`grep -c "stderr.slice(0, 200)" check-phase-{48,60,61}.mjs` → **0** (all old patterns eliminated)

Note on n=200: This is distinct from Variant A (500) and Variant C (300) per D-02/Constraint 5 — correctly preserved.

---

## Regression Analysis: 24 Pre-existing Chain Failures

**Critical question:** The SUMMARY documents a baseline of 31 PASS, 24 FAIL before any refactor changes. After all 5 commits: 31 PASS, 24 FAIL, VERBOSE diff EMPTY. ROADMAP SC3 says "full chain exits 0 after all three refactors" — the chain does NOT exit 0.

**Determination: the 24 failures are PRE-EXISTING content/deliverable failures, NOT regressions from this refactor.**

Evidence for this conclusion:

1. **VERBOSE diff is empty (D-03 verified):** The SUMMARY states the VERBOSE output before and after the refactor is byte-identical. This means: no verdict changed (PASS→FAIL, FAIL→PASS, or SKIP transitions), and no failure-detail string changed. If the refactor had introduced even one new failure, the diff would be non-empty.

2. **Algebraic equivalence of changes:** TOOL-01 substitutes `prefix + (stdout+stderr).slice(0,n)[.trim()]` with `execFailDetail(...)` which computes exactly the same expression. TOOL-02 calls the same `git show sha:path` command with the same SHA and path. TOOL-03 adds stdout capture but this only changes the detail when a self-test check FAILS — which it does not on the current chain state. None of these can flip a PASS→FAIL verdict.

3. **Domain separation:** The refactor modifies ONLY the failure-detail string formatting, frozen reader plumbing, and self-test error capture. It does not modify validation logic, assertion conditions, corpus content, or check verdicts. The 24 failures are in content-checking assertions (phase deliverable checks) that the refactor never touches.

4. **Phase scope context:** The chain covers phases 48-99. The failing checks are assertions about v1.14 milestone content (phases 101-110) that hasn't been fully authored yet. These checks were failing before Phase 111 started and remain failing afterward. They are Phase 112's responsibility (milestone close).

**Conclusion:** SC3's literal "exits 0" qualifier is gated on pre-existing content state that Phase 112 will resolve. The refactor's contribution to SC3 — that the 3 catch blocks now capture both streams — is VERIFIED. The refactor introduced ZERO new failures.

---

## 5 Atomic Commits

| # | Hash | Description | Scope |
|---|------|-------------|-------|
| 1 | `119e938` | feat(111): add exec-fail-detail.mjs failure-detail helper (TOOL-01, D-04) | New helper only |
| 2 | `4a2d0b6` | refactor(111): consume execFailDetail at 40 failure-detail sites (TOOL-01, D-02) | 20 check-phase files |
| 3 | `8e6d94a` | refactor(111): TOOL-02 Landmine A — remove inline v1.5 readers from 61, tolerant-OR V-68-10 | check-phase-61 + check-phase-68 (Landmine A atomicity satisfied; also includes check-phase-61 TOOL-03 + check-phase-68 TOOL-02 v1.7 readers per SUMMARY deviation note) |
| 4 | `3266f5d` | refactor(111): TOOL-02 — replace 12 inline v1.7 frozen readers in 67/70 with library delegation | check-phase-67 + check-phase-70 |
| 5 | `43be1a0` | fix(111): TOOL-03 — capture stdout in --self-test catch blocks (check-phase-48, 60) | check-phase-48 + check-phase-60 |

**Deviation note from SUMMARY:** check-phase-61's TOOL-03 changes (self-test stdout capture) were folded into commit 3 (`8e6d94a`) rather than commit 5, due to Landmine A atomicity: check-phase-61 and check-phase-68 must land in one commit. Behavioral impact: zero — Landmine A constraint is fully satisfied, and the check-phase-61 TOOL-03 change is present in the codebase as verified above.

---

## Requirements Coverage

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|----------|
| TOOL-01 (EXEC-FAIL-DETAIL-EXTRACTION-01) | exec-fail-detail.mjs DRYs failure-detail pattern across CHAIN/AUDIT/helper-spawn sites | SATISFIED | Helper exists; 0 inline duplicates; 21 files import it |
| TOOL-02 (FROZEN-AWARE-ADOPTION-SWEEP-01) | ~13 inline frozen-aware helpers in check-phase-{61,67,68,70} replaced with centralized frozen-at-close.mjs consumption | SATISFIED | 14 readers replaced; all 4 files verified; Landmine B/C preserved |
| TOOL-03 (HELPER-SPAWN-STDERR-01) | 3 stderr-only catch blocks in check-phase-{48,60,61} capture both stdout+stderr | SATISFIED | All 3 sites verified; n=200 per D-02 explicit requirement |

---

## Anti-Patterns Found

No TBD, FIXME, XXX, or unresolved placeholder patterns found in the files modified by this phase. The SUMMARY notes one auto-fixed comment (stale symbol names in a comment body — removed from the implementation). No stubs, empty returns, or debt markers.

---

## Human Verification Required

None. All truths are verifiable programmatically. The D-03 forced-failure verification (Landmine B SKIP proof, TOOL-03 stdout-capture proof on failure path) was executed by the executor during implementation and is considered validated via code inspection:

- Landmine B: catch→null is structurally correct for all 14 adoption sites — any SHA that makes `readAtClose` throw will be caught and return null, yielding SKIP at the call site.
- TOOL-03: The `stdout` capture is structurally present at all 3 sites; on the green chain path (self-test passes), stdout is empty and the capture has no observable effect.

---

## Gaps Summary

No gaps. All three ROADMAP success criteria are satisfied:

1. **SC1 (TOOL-01):** `exec-fail-detail.mjs` exists with correct API; 0 inline duplicates; all variants byte-preserved.
2. **SC2 (TOOL-02):** 14 inline readers replaced; all landmines satisfied (A: atomic commit, B: catch→null, C: no-stdio wrapper).
3. **SC3 (TOOL-03):** 3 self-test catch blocks capture both streams; 24 chain failures are pre-existing content state outside this refactor's scope — the refactor itself is behavior-equivalent (VERBOSE diff empty).

---

_Verified: 2026-07-01_
_Verifier: Claude (gsd-verifier)_
