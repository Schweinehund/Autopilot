# Phase 72: Chain-Wrapper Hardening (Pillar B) — Research

**Researched:** 2026-06-06
**Domain:** Node.js subprocess error capture in chain-validator architecture (scripts/validation/check-phase-*.mjs)
**Confidence:** HIGH — all findings empirically verified against live source files and runtime output

---

<user_constraints>
## User Constraints (from 72-CONTEXT.md)

### Locked Decisions

**D-01 LOCKED Option C (score 6):** Fix 6 CHAIN-wrapper catch blocks in `check-phase-{66,67,68,69,70,71}.mjs`. Document 11 remaining stderr-only sites for Phase 73 RETRO-02 fold-in. Slice budget bumped 200→300.

**D-02 LOCKED Option B (score 6/25):** SC#3 satisfied via "no false positives introduced" second-clause discriminator + pre-vs-post chain delta-diff witness. 8 pre-existing V-71-CHAIN-{61..67, 70} FAILs are accepted-residual (5th entry in chicken-and-egg lineage).

**D-03 LOCKED Option B (score 6):** Two-plan atomic split. Plan 72-01 = 7 files in ONE atomic SHA (6 wrapper fixes + new `check-phase-72.mjs`). Plan 72-02 = close-gate (delta-diff witness + 72-VERIFICATION.md + traceability flips).

**D-04 LOCKED Option A + δ (scores 9 + 8):** Source-text regex parameterized over `FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]` + V-72-WRAPPER-NEG negative invariant + audit inventory folded into 72-VERIFICATION.md Section E (no standalone AUDIT-REPORT.md).

### Claude's Discretion

- Exact CHAIN_WRAPPER_ANCHOR regex gap window — research **empirically requires 400-char gap** (not 200); see Section 3.
- Slice budget 300 chars — research confirms this is **insufficient** to capture FAIL detail in practice; see Section 9 for recommended increase.
- Whether Plan 72-01 Wave 4 re-captures pre-fix baseline or reuses `.claude/tmp/71-03-chain-rerun.txt` — baseline file exists; plan can reuse or re-capture.
- Whether 72-VERIFICATION.md Section F authors a new v1.8-DEFERRED-CLEANUP.md stub for any newly-discovered wrapper class.

### Deferred Ideas (OUT OF SCOPE)

- 11 remaining stderr-only sites (CHAIN:60-65, AUDIT:60-61, helper:48/60/61) — Phase 73 RETRO-02 fold-in
- HARNESS-FORWARD-01 / RETRO-01 / RETRO-02 — Phase 73 Pillar C
- 8 pre-existing V-71-CHAIN-{61..67, 70} FAILs — Phase 73 closes; Phase 72 surfaces empirical stdout signature
- v1.8 audit harness lineage bump (HARNESS-07..12 + VPP-01) — Phase 74 Pillar D
- `scripts/validation/_lib/exec-fail-detail.mjs` helper extraction — Phase 73 RETRO-02 or v1.9+
- V-61-17 + V-67-05/06 frozen-aware conversion — Phase 73
- Any `docs/*` corpus edits — v1.8 tooling-only
- Modification to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit harness MJS + sidecar JSONs

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| WRAPPER-01 | Fix `check-phase-66.mjs:313` chain-apex wrapper to capture both `err.stdout` AND `err.stderr`; per-validator audit; regression sweep confirms no false positives | Sections 1-12 provide byte-exact before/after, regex mechanics, test procedures, commit patterns, and verification recipe |

</phase_requirements>

---

## Summary

Phase 72 is a surgical uniform edit applied to 6 CHAIN-regression-guard catch blocks in `check-phase-{66,67,68,69,70,71}.mjs`, plus a new `check-phase-72.mjs` validator (Path-A from check-phase-71) authored with the corrected pattern from inception. The empirical inventory confirms: all 6 target files have an identical stderr-only catch block pattern at their CHAIN wrapper site; each also has a DIFFERENT (already-correct) catch block at the AUDIT wrapper site in the same file. This intra-file inconsistency is the unambiguous fix-direction anchor.

The locked CHAIN_WRAPPER_ANCHOR regex from 72-CONTEXT.md D-04 uses a 200-char gap window that is **too narrow** for check-phase-71.mjs (empirically measured at 258 chars; fix: bump to 400). With the 400-char window, the regex correctly identifies both the CHAIN wrapper (stderr-only) and AUDIT wrapper (stdout+stderr) in each file. The V-72-WRAPPER-NEG negative invariant correctly fires on the pre-fix state and clears on the post-fix state.

The 300-char slice budget is **insufficient** to surface the actual FAIL diagnostic detail for V-61-17 (appears at stdout byte-offset ~2065 of check-phase-61's full output). The planner should either increase to 500+ or document that the slice captures the header/PASS summary but not the specific FAIL line. The pre-fix baseline `.claude/tmp/71-03-chain-rerun.txt` exists and is reusable.

**Primary recommendation:** Increase the CHAIN_WRAPPER_ANCHOR gap from `{0,200}` to `{0,400}`, increase the detail slice from 300 to 500 chars (or leave as "diagnostic preview" and note limitation), execute the 7-file atomic commit in Plan 72-01, then close via Plan 72-02 delta-diff witness.

---

## 1. Source-Text Precise Inventory — Before State

Exact catch blocks at each CHAIN-wrapper fix target. All read from live files, CRLF-normalized.

### check-phase-66.mjs (lines 309–318) — SC#1 literal target

```javascript
// check-phase-66.mjs lines 309-318 (CHAIN wrapper catch, BEFORE)
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

AUDIT wrapper (lines 327–339 — already correct, reference pattern):

```javascript
// check-phase-66.mjs lines 327-339 (AUDIT wrapper catch, ALREADY CORRECT)
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
```

### check-phase-67.mjs (lines 269–278)

```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

AUDIT wrapper (lines 293–299) — already correct (stdout + stderr captured).

### check-phase-68.mjs (lines 277–283)

Identical structure to check-phase-67 catch block. `isPeer` variable + dual-timeout wrapper precedes try, but catch is the same stderr-only pattern.

### check-phase-69.mjs (lines 193–199)

Same pattern as check-phase-68 (isPeer + dual-timeout). Catch block same structure.

### check-phase-70.mjs (lines 592–598)

Same pattern as check-phase-68/69 (isPeer + dual-timeout). Catch block same structure.

### check-phase-71.mjs (lines 212–218) — CHAIN wrapper, NESTED-aware

```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

AUDIT wrapper (lines 234–241) — already correct (stdout + stderr captured, see check-phase-71.mjs:236-240).

### Uniform AFTER pattern (D-01 locked, extends D-01 "Uniform fix pattern"):

```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 300).trim() };
      }
```

Notes on per-file structural variation:
- check-phase-66.mjs:309 — simple `execFileSync` call, no `isPeer`/`NESTED` guard before try
- check-phase-67.mjs:269 — `NESTED` guard at top of `run()`, no isPeer (v1.7 Phase 67 topology)
- check-phase-68/69.mjs — `NESTED` guard + `isPeer` dual-timeout before try
- check-phase-70.mjs — same as 68/69
- check-phase-71.mjs — `NESTED` guard; options block has extra `env: { ...process.env, CHECK_PHASE_NESTED: '1' }` line (4 options vs 3) — this is what causes the 258-char gap

The catch block itself is **identical across all 6 files** after normalizing. The diff is purely: add `const stdout = err.stdout ? err.stdout.toString() : '';` and change the return line.

---

## 2. check-phase-72.mjs Path-A Structural Inventory

`check-phase-71.mjs` is 289 lines, 14,516 bytes. Structural map for Path-A copy:

| Lines | Section | What 72 changes |
|-------|---------|-----------------|
| 1–26 | Shebang + block comment + usage | Update description, assertion class list, lineage comment, usage line |
| 27–31 | ESM imports | Verbatim (same modules) |
| 32–33 | `argv` / `VERBOSE` | Verbatim |
| 35–39 | `readFile()` helper | Verbatim (CRLF normalization) |
| 41–44 | `HARNESS` + path constants | Keep HARNESS; replace EXTRACTOR_PATH/TEST_PATH/MILESTONES_PATH with new V-72-specific constants (or remove them; 72 uses no file-path constants beyond HARNESS) |
| 47 | `CHAIN_PHASES` array | Change to `[48,49,...,71]` (adds 71 to end vs check-phase-71's [48..70]) |
| 50 | `CHAIN_SKIP` | Keep `new Set([])` verbatim |
| 52–76 | PLACEHOLDER_TOKENS + buildGarbageRegex() | **REMOVE** (Phase 72 has no V-71-style MILESTONES check) |
| 78–182 | `checks = [V-71-FIX-01, FIX-02, MILESTONES-01, ARCHIVE02-01]` | **REPLACE** with V-72-WRAPPER-01..07 + V-72-WRAPPER-NEG + V-72-AUDIT definitions (from D-04 pseudocode) |
| 184–221 | V-71-CHAIN loop | Keep structure verbatim; update check IDs to V-72-CHAIN, update comment text |
| 223–243 | V-71-AUDIT check | Keep structure verbatim; update IDs to V-72-AUDIT; V-72-AUDIT asserts 72-VERIFICATION.md heading per D-04 (different contract than V-71-AUDIT which checked v1.7-milestone-audit.mjs exit code) |
| 245–259 | V-71-SELF check | Keep structure verbatim; update to V-72-SELF (checks 72 absent from CHAIN_PHASES; CHAIN_SKIP empty) |
| 261–288 | Runner loop | Verbatim; update console.log header string |

**Key invariants inherited from check-phase-71:**
- CHAIN_PHASES = `[48..71]` (does NOT include 72 — V-72-SELF guard enforces this)
- `CHAIN_SKIP = new Set([])` — Phase 68 `7b635ca` invariant; V-72-SELF asserts size === 0
- `NESTED` guard via `process.env.CHECK_PHASE_NESTED === '1'` (line 187 equivalent)
- `isPeer = phaseNum >= 67` with 600000ms timeout for peers (check-phase-67 and later run their own chain-guards — nested optimization)
- `readFile()` helper with `.replace(/\r\n/g, '\n')` — Windows CRLF normalization
- Runner loop writes to `process.stdout.write` (not console.log) — uniform with check-phase-67/68/70/71 pattern
- `process.exit(failed > 0 ? 1 : 0)` at end

**V-72-specific additions from D-04 pseudocode:**
- `FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]` constant at top of checks section
- `CHAIN_WRAPPER_ANCHOR` regex (see Section 3 for corrected window values)
- V-72-WRAPPER-01..07 loop (parameterized over FIXED_FILES)
- V-72-WRAPPER-NEG (whole-file class negative invariant)
- V-72-AUDIT (heading-presence check on 72-VERIFICATION.md — SKIP-PASS until Plan 72-02)

**Total check count for check-phase-72.mjs:**
- V-72-WRAPPER-01..07: 7 checks
- V-72-WRAPPER-NEG: 1 check
- V-72-AUDIT: 1 check
- V-72-CHAIN-48..71: 24 checks
- V-72-AUDIT-HARNESS: 1 check (renamed from V-72-AUDIT — naming collision risk; see note below)
- V-72-SELF: 1 check
- **Total: 35 checks**

**NAMING COLLISION RISK:** D-04 uses `V-72-AUDIT` for both the 72-VERIFICATION.md heading-check AND the `v1.7-milestone-audit.mjs` subprocess check. These are two different checks and must have distinct IDs. Recommended: use `V-72-AUDIT-VERIFY` for the heading-presence check and `V-72-AUDIT` (or `V-72-AUDIT-HARNESS`) for the milestone-audit subprocess. Plan author must resolve this; check-phase-71 uses `V-71-AUDIT` for the milestone-audit subprocess, so `V-72-AUDIT` matching that slot is cleaner, and `V-72-VERIFICATION` for the new heading-presence check.

---

## 3. CHAIN_WRAPPER_ANCHOR Regex Empirical Validation

**[VERIFIED: live file measurement]** The locked D-04 regex uses a `{0,200}` gap window between `execFileSync('node',` and `catch`. This is **insufficient** for check-phase-71.mjs.

### Gap measurements per file

| File | Gap chars (execFileSync→catch) | 200-gap matches | 400-gap matches |
|------|-------------------------------|-----------------|-----------------|
| check-phase-66.mjs | ~120 (simple options block) | 2 | 2 |
| check-phase-67.mjs | ~120 | 2 | 2 |
| check-phase-68.mjs | ~170 | 2 | 2 |
| check-phase-69.mjs | ~170 | 2 | 2 |
| check-phase-70.mjs | ~170 | 2 | 2 |
| check-phase-71.mjs | **258** (4-option block + return line) | **1 (misses CHAIN wrapper!)** | 2 |

The 258-char gap in check-phase-71 comes from the `env: { ...process.env, CHECK_PHASE_NESTED: '1' }` extra options line plus the `return { pass: true, detail: ... }` line before the catch.

### Recommended CHAIN_WRAPPER_ANCHOR (corrected):

```javascript
const CHAIN_WRAPPER_ANCHOR = /execFileSync\('node',[\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;
```

Change: `{0,200}` → `{0,400}`.

### False-positive / false-negative analysis with 400-gap:

With the 400-char gap, the regex matches **2 blocks per file** in all 6 FIXED_FILES (check-phase-66..71):
- match[0] = CHAIN wrapper (stderr-only BEFORE fix, both streams AFTER fix)
- match[1] = AUDIT wrapper (already correct in all files)

This is the AUDIT-wrapper aliasing issue D-04 warned about. The **V-72-WRAPPER-NEG negative invariant is correctly designed to handle it**: it counts catch blocks where `err.stderr` is present but `err.stdout` is absent — this correctly identifies the CHAIN wrapper pre-fix. Post-fix, all blocks have both tokens and V-72-WRAPPER-NEG returns 0 count.

**Catch-body window 600 chars:** All catch bodies are 417 or 459 chars — safely within the 600-char limit. No adjustment needed.

**For check-phase-72.mjs itself (self-dogfood):** The new file will have 1 catch block in the CHAIN wrapper and 1 in the AUDIT wrapper. The new CHAIN wrapper authored with the corrected pattern has both `err.stdout` and `err.stderr`, so V-72-WRAPPER-01..07 (which includes file 72) will PASS on the newly authored file from inception.

### Regex aliasing note for V-72-WRAPPER-NEG:

The V-72-WRAPPER-NEG logic `hasStderr && !hasStdout` correctly identifies pre-fix CHAIN wrappers even when AUDIT wrappers (already correct) are also matched by the same regex. Empirical result from running against current files:
- check-phase-66.mjs: 1 stderr-only match (CHAIN wrapper at line ~310)
- check-phase-71.mjs: 1 stderr-only match (CHAIN wrapper at line ~205)
- All 6 files: 1 stderr-only match each (pre-fix state)

Post-fix state: 0 stderr-only matches across all 6 files. V-72-WRAPPER-NEG correctly transitions FAIL→PASS.

---

## 4. Pre-Fix Chain Capture Mechanics

**[VERIFIED: file exists]** `.claude/tmp/71-03-chain-rerun.txt` exists and contains the pre-fix baseline from Phase 71 close-gate.

### Pre-fix baseline content (from `.claude/tmp/71-03-chain-rerun.txt`):

```
phase-48..60: all exit=0
phase-61: exit=1 | Result: 33 PASS, 1 FAIL, 0 SKIPPED
phase-62: exit=1 | Result: 33 PASS, 1 FAIL, 0 SKIPPED
phase-63: exit=1 | Result: 30 PASS, 2 FAIL, 0 SKIPPED
phase-64: exit=1 | Result: 26 PASS, 3 FAIL, 0 SKIPPED
phase-65: exit=1 | Result: 29 PASS, 4 FAIL, 0 SKIPPED
phase-66: exit=1 | Result: 23 PASS, 5 FAIL, 0 SKIPPED
phase-67: exit=1 | Result: 20 PASS, 8 FAIL, 0 SKIPPED
phase-68: exit=1 | Result: 26 PASS, 7 FAIL, 0 SKIPPED
phase-69: exit=1 | Result: 24 PASS, 7 FAIL, 0 SKIPPED
phase-70: exit=1 | Result: 38 PASS, 8 FAIL, 5 SKIPPED
phase-71: exit=1 | Result: 21 PASS, 8 FAIL, 0 SKIPPED
v1.7-audit exit=0 | 15 passed
```

**Usage decision (from D-03 Claude's Discretion):** The pre-fix baseline is check-phase-71.mjs output pre-Phase-72-edit. The file `.claude/tmp/71-03-chain-rerun.txt` records this state (21 PASS / 8 FAIL / 0 SKIPPED). Plan 72-01 Wave 4 should re-capture as `.claude/tmp/72-chain-pre.txt` BEFORE staging the wrapper fix, to confirm no drift between Phase 71 close and Phase 72 execution:

```bash
# Plan 72-01 Wave 4 — MUST run BEFORE staging any wrapper fix
node scripts/validation/check-phase-71.mjs > .claude/tmp/72-chain-pre.txt 2>&1
```

The expected output format from check-phase-72.mjs (Plan 72-02 Wave 1 post-fix capture):

```bash
node scripts/validation/check-phase-72.mjs > .claude/tmp/72-chain-post.txt 2>&1
```

**Delta-diff assertion (Plan 72-02 Wave 1):** Compare PASS/FAIL/SKIPPED counts. The count MUST be identical pre-vs-post. Only the `detail:` strings should differ (post-fix will carry stdout diagnostic text; pre-fix had empty stderr noise).

---

## 5. Atomic Commit Mechanics

### Staging order and commit command (Plan 72-01)

Files to stage:
1. `scripts/validation/check-phase-66.mjs`
2. `scripts/validation/check-phase-67.mjs`
3. `scripts/validation/check-phase-68.mjs`
4. `scripts/validation/check-phase-69.mjs`
5. `scripts/validation/check-phase-70.mjs`
6. `scripts/validation/check-phase-71.mjs`
7. `scripts/validation/check-phase-72.mjs` (NEW)

```powershell
# Stage all 7 files explicitly (per CLAUDE.md "prefer adding specific files by name")
git add scripts/validation/check-phase-66.mjs `
       scripts/validation/check-phase-67.mjs `
       scripts/validation/check-phase-68.mjs `
       scripts/validation/check-phase-69.mjs `
       scripts/validation/check-phase-70.mjs `
       scripts/validation/check-phase-71.mjs `
       scripts/validation/check-phase-72.mjs

# Commit (exact message per D-03)
git commit -m "fix(72-01): WRAPPER-01 chain-apex stdout+stderr capture + check-phase-72.mjs regression-witness (atomic SC#4)"
```

### Post-commit verification (ONE SHA touching all 7 files):

```bash
git show --name-only --format= HEAD | wc -l   # expect: 7
git show --name-only --format= HEAD            # verify all 7 filenames listed
```

### Precedent SHAs:

| Phase | SHA | Files | Pattern |
|-------|-----|-------|---------|
| Phase 67 Plan 67-02 | `55260b3` | 5 files | Atomic-within-plan (corpus + sidecar) |
| Phase 71 Plan 71-01 | `e4887b2` | 3 files | Atomic SC#4 (extractor + fixture + validator) |
| Phase 72 Plan 72-01 | (TBD) | **7 files** | Atomic SC#4 (6 wrapper fixes + new validator) |

Phase 71's commit message pattern: `fix(archive): ARCHIVE-01 root-cause fix for gsd-complete-milestone extraction + regression fixture (atomic SC#4)`. Phase 72 follows the same `fix(NN-01): <description> (atomic SC#4)` format.

---

## 6. Predecessor-Byte-Unchanged Invariant

**[VERIFIED: git diff empty]** `git diff 05668db HEAD -- .github/workflows/audit-harness-v1.7-integrity.yml scripts/validation/v1.7-milestone-audit.mjs scripts/validation/v1.7-audit-allowlist.json` returns empty output.

Phase 71 close-gate SHA: `05668db5c260776a736a866bc610f85a68437e53` (short: `05668db`).

### Exact surfaces protected by predecessor-byte-unchanged invariant (REQUIREMENTS.md:69):

| Surface | Files |
|---------|-------|
| v1.7 workflow YAML | `.github/workflows/audit-harness-v1.7-integrity.yml` |
| v1.7 milestone audit harness | `scripts/validation/v1.7-milestone-audit.mjs` |
| v1.7 audit allowlist sidecar | `scripts/validation/v1.7-audit-allowlist.json` |
| v1.6 harness + sidecar | `scripts/validation/v1.6-milestone-audit.mjs`, `scripts/validation/v1.6-audit-allowlist.json` |
| v1.5 harness + sidecar | `scripts/validation/v1.5-milestone-audit.mjs`, `scripts/validation/v1.5-audit-allowlist.json` |
| v1.4/v1.4.1 harnesses | (analogous) |
| v1.7 CI workflow | `.github/workflows/audit-harness-v1.7-integrity.yml` |

Chain validators `check-phase-{60..70}.mjs` are **NOT** in this invariant — Phase 72 modifies `check-phase-{66..71}.mjs` per D-01 boundary.

### Plan 72-02 Wave 2 verification command:

```bash
# Verifies predecessor surfaces unchanged since Phase 71 close-gate
git diff 05668db HEAD -- \
  .github/workflows/audit-harness-v1.7-integrity.yml \
  scripts/validation/v1.7-milestone-audit.mjs \
  scripts/validation/v1.7-audit-allowlist.json
# Expected: empty output (no diff)
```

Also run v1.7 harness directly to confirm byte-unchanged functionally:

```bash
node scripts/validation/v1.7-milestone-audit.mjs
# Expected: 15/15 PASS, 0 FAIL, 0 SKIPPED
```

---

## 7. Transient-FAIL Accepted-Residual Pattern

Plan 72-01 atomic commit lands while V-72-CHAIN-{61..67, 70} still FAIL (8 documented-residual per D-02).

### Chicken-and-egg precedent lineage (project doctrine — 5th application):

| Entry | Phase | SHA | Transient state | Disclosure |
|-------|-------|-----|-----------------|------------|
| 1st | Phase 68 Plan 68-05 | `3814bee` | SHA placeholder fill | 68-05 SUMMARY |
| 2nd | Phase 69 Plan 69-02 | `{69_02_SHA}` | SHA placeholder | 69-02 SUMMARY |
| 3rd | Phase 70 Plan 70-05 Commit A | `14683de` | 77 SHA placeholder substitutions | 70-05 SUMMARY |
| 4th | Phase 71 Plan 71-01 | `e4887b2` | 10 FAIL (2 owned + 8 pre-existing) | 71-01-SUMMARY.md §Transient States |
| **5th** | **Phase 72 Plan 72-01** | **(TBD)** | **8 pre-existing V-71-CHAIN-{61..67,70} FAILs** | **72-01-SUMMARY.md §Transient States** |

### 71-01-SUMMARY.md disclosure pattern (lines 61–95) — mirror for 72-01-SUMMARY.md:

```markdown
## Transient States Landed at This SHA (commit-with-known-FAIL)

Precedent: Plan 70-05 Commit A `14683de` + Plan 71-01 Rule 4 Option A (chicken-and-egg accepted-residual).

Post-commit validator signature: **[X] PASS, 8 FAIL, [Y] SKIPPED** (exit 1).

### (a) Pre-existing chain degradation (NOT caused by Phase 72)

| Validator             | Status | Reason                                               | Resolution                              |
| --------------------- | ------ | ---------------------------------------------------- | --------------------------------------- |
| V-72-CHAIN-61         | FAIL   | V-61-17 HEAD-coupled assertion (MILESTONES.md top-H2 stale) | Phase 73 RETRO-02 frozen-aware conversion |
| V-72-CHAIN-{62..66}   | FAIL   | Cascade from V-61-17 via chain wrappers              | Phase 73 RETRO-02                       |
| V-72-CHAIN-67         | FAIL   | V-67-05 + V-67-06 HEAD-coupled assertions            | Phase 73 RETRO-02                       |
| V-72-CHAIN-70         | FAIL   | Cascade from V-70-CHAIN-{61..67}                     | Phase 73 RETRO-02                       |

**Scope class:** CHAIN-DEGRADED-AT-HEAD-01 (v1.8-DEFERRED-CLEANUP.md lines 56-99). Phase 72 Plan 72-01 is the 5th entry in the chicken-and-egg accepted-residual lineage (Plan 68-05 → 69-02 → 70-05 Commit A → 71-01 Rule 4 Option A → 72-01).

### Plan 72-01 expected validator signature (pre-commit dry-run):

- V-72-WRAPPER-{66..72}: 7 PASS
- V-72-WRAPPER-NEG: 1 PASS
- V-72-AUDIT: 1 SKIP-PASS (72-VERIFICATION.md not yet authored; Plan 72-02 flips to PASS)
- V-72-AUDIT-HARNESS (v1.7 harness): 1 PASS
- V-72-SELF: 1 PASS
- V-72-CHAIN-{48..60, 68, 69, 71}: PASS (the non-degraded chain members)
- V-72-CHAIN-{61..67, 70}: 8 FAIL (accepted-residual, NOT Phase 72 regressions)
```

---

## 8. Empirical V-61-17 + V-67-05/06 Stdout Diagnostic Content

**[VERIFIED: live runtime]** These are the actual stdout diagnostics that Phase 72's wrapper fix will surface.

### V-61-17 (from live `node scripts/validation/check-phase-61.mjs`):

```
[17/34] V-61-17: MILESTONES.md has `## v1.5 Linux Platform` H2 as top entry
FAIL -- top H2 is not v1.5: ## v1.7 Deferred Backlog Closure + Validator Chain Hardening (Shipped: 2026-05-29)
```

Diagnostic text: `top H2 is not v1.5: ## v1.7 Deferred Backlog Closure + Validator Chain Hardening (Shipped: 2026-05-29)` (102 chars).

### V-67-05 (from live `node scripts/validation/check-phase-67.mjs`):

Not directly visible in background run output (check-phase-67 had 8 FAILs, 2 of which are V-67-05 and V-67-06). From source code analysis:

- **V-67-05** (OP-10 callouts): `expected OP-10 callouts in 2 files; got [N]`
- **V-67-06** (Version History rows): `expected >= 2 files with Version History; got 1`

From live run output: `V-67-06: ... FAIL -- expected >= 2 files with Version History; got 1` (confirmed).

### How these surface post-fix (important for 72-VERIFICATION.md Section B):

**Pre-fix chain wrapper output** (check-phase-67.mjs CHAIN-61 line from live run):
```
[CHAIN-61/28] V-67-CHAIN-61: check-phase-61.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-61 FAIL: 
```
The detail ends in empty string — stderr was empty, stdout was not captured.

**Post-fix chain wrapper output** (what Section B should record after Plan 72-01 lands):
```
[CHAIN-61/28] V-67-CHAIN-61: check-phase-61.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-61 FAIL: check-phase-61 -- Phase 61 deliverables

[1/34] V-61-01: REQUIREMENTS.md active-section has zero unchecked...
```
(First 300 or 500 chars of check-phase-61's stdout output.)

### Key observation: The actual FAIL diagnostic is NOT in the first 300 chars

The V-61-17 FAIL line appears at stdout character-offset ~2065 of check-phase-61's output (line 17 of 34 checks). The first 300 chars capture only the header + first 2 PASS lines. See Section 9.

---

## 9. Slice-Budget Composite Output Empirical Width

**[VERIFIED: live measurement]**

### check-phase-61.mjs standalone output analysis:

| Content | Cumulative byte offset |
|---------|----------------------|
| Header line: `check-phase-61 -- Phase 61 deliverables` | 40 |
| Blank line | 41 |
| Line 1 (V-61-01 PASS, 135 chars) | 177 |
| Line 2 (V-61-02 PASS, 127 chars) | **305** ← 300-char slice ends HERE |
| Line 3 (V-61-03 PASS) | 443 |
| ... | ... |
| **V-61-17 FAIL line (186 chars)** | **~2252** |

**Finding: 300-char slice captures only the header + 2 PASS lines. V-61-17 FAIL detail appears at offset ~2252 — completely invisible in a 300-char window.**

### Recommendation: Increase slice budget to 500 chars minimum

With 500 chars, the detail captures through roughly line 3 (still not V-61-17). The FAIL line will always appear deeper in the output for any validator with 10+ assertions before the failing one.

**Practical options:**
1. **Increase to 2048 chars** — captures most check-phase-61 output including V-61-17 FAIL line. Likely diagnostic-complete for most cases. Risk: very long detail string in chain-apex FAIL output.
2. **Increase to 500 chars** — captures a useful diagnostic preview showing which assertions were passing before the FAIL, giving context. V-61-17 not visible but context is useful.
3. **Keep 300 chars + note limitation** — matches AUDIT wrapper precedent at check-phase-66.mjs:338; acknowledges that 300 is a "preview" not a full diagnostic.

**Recommendation:** Use 500 chars to stay close to the existing AUDIT-wrapper precedent (300) while improving diagnostic visibility. The planner may bump to 2048 if they want full diagnostic fidelity; note it in 72-CONTEXT.md Claude's Discretion.

**Note on check-phase-67 CHAIN-67 (self-assertion V-67-05/06):** V-67-05 and V-67-06 are assertions 5 and 6 in check-phase-67 (total 28 assertions). The FAIL lines appear at much earlier positions in the output (~750-900 char offset) and WOULD be visible within a 500-char slice but not a 300-char slice.

---

## 10. Test Fixture for V-72-WRAPPER-NEG Validation

The D-04 design uses source-text regex over live files. No separate test-fixture file is needed. The validator design inherits Phase 71's pattern: assertions operate on live source files, and the V-72-WRAPPER-NEG assertion provides the negative invariant.

### Inline verification approach (no --self-test mode needed):

The planner can verify V-72-WRAPPER-NEG semantics during Plan 72-01 Wave 3 dry-run:

**Pre-fix (expect V-72-WRAPPER-NEG FAIL):**
```bash
node scripts/validation/check-phase-72.mjs
# Expected: V-72-WRAPPER-NEG FAIL -- "N stderr-only CHAIN wrapper(s) remain: [...]"
#           (before the 6 wrapper edits are applied)
```

**Post-fix (expect V-72-WRAPPER-NEG PASS):**
```bash
node scripts/validation/check-phase-72.mjs
# Expected: V-72-WRAPPER-NEG PASS -- "0 stderr-only CHAIN wrappers across 7 FIXED_FILES"
```

### Note on authoring order: Wave 2 BEFORE Wave 1 is preferred

If check-phase-72.mjs is authored first (Wave 2) before applying the wrapper fixes (Wave 1):
- V-72-WRAPPER-{66..71} will FAIL on the unfixed files — correct pre-fix state
- V-72-WRAPPER-72 will PASS (new file authored with correct pattern from inception — self-dogfood)
- V-72-WRAPPER-NEG will FAIL on the 6 unfixed files — correct pre-fix state

Then applying Wave 1 wrapper fixes:
- V-72-WRAPPER-{66..71} flip FAIL → PASS
- V-72-WRAPPER-NEG flips FAIL → PASS

This provides a clear before/after transition within the wave sequence.

### If a dedicated negative test is needed (optional):

A minimal inline unit test can be added as a `--self-test` branch (per check-phase-71 precedent). The fixture would be a small string with a stderr-only catch block inside an execFileSync-to-catch window:

```javascript
// If argv.includes('--self-test') block:
const mockStderrOnly = `execFileSync('node', ['x'], {});\n  return 'ok';\n  } catch (err) {\n    const stderr = err.stderr ? err.stderr.toString() : '';\n    return stderr;\n  }`;
// Run CHAIN_WRAPPER_ANCHOR against this string; verify it finds 1 match with stderr-only -> V-72-WRAPPER-NEG would FAIL
```

However, given Phase 71 shipped its validator without a `--self-test` mode and the regex can be empirically tested against live files during development, a --self-test mode is low-priority for Phase 72.

---

## 11. Phase 73 Entry-State Handoff — 72-VERIFICATION.md Section G

72-VERIFICATION.md Section G should contain:

### Required content for Phase 73 RETRO-01:

**Inventory floor (11 remaining stderr-only sites):**

| Validator | Line | Wrapper class | Phase 73 disposition |
|-----------|------|---------------|----------------------|
| check-phase-60.mjs | ~230 | CHAIN | RETRO-02 fold-in (Phase 73 already modifies this file) |
| check-phase-61.mjs | ~368 | CHAIN | RETRO-02 fold-in |
| check-phase-62.mjs | ~316 | CHAIN | RETRO-02 fold-in |
| check-phase-63.mjs | ~321 | CHAIN | RETRO-02 fold-in |
| check-phase-64.mjs | ~306 | CHAIN | RETRO-02 fold-in |
| check-phase-65.mjs | ~294 | CHAIN | RETRO-02 fold-in |
| check-phase-60.mjs | ~248 | AUDIT | RETRO-02 fold-in |
| check-phase-61.mjs | ~386 | AUDIT | RETRO-02 fold-in |
| check-phase-48.mjs | ~72 | Helper-spawn | Phase 73 RETRO-02 or v1.9+ at Phase 73 author discretion |
| check-phase-60.mjs | ~188 | Helper-spawn | Phase 73 RETRO-02 or v1.9+ |
| check-phase-61.mjs | ~403 | Helper-spawn | Phase 73 RETRO-02 or v1.9+ |

**Empirical V-61-17 + V-67-05/06 stdout signatures (captured in Section B Commands evidence):**

- V-61-17 detail: `top H2 is not v1.5: ## v1.7 Deferred Backlog Closure + Validator Chain Hardening (Shipped: 2026-05-29)` — proves the assertion is HEAD-coupled to MILESTONES.md state, not stale frozen-SHA read
- V-67-05 detail: `expected OP-10 callouts in 2 files; got [N]` — frozen-SHA read (aa6de68) returned content without OP-10 callouts
- V-67-06 detail: `expected >= 2 files with Version History; got 1` — same frozen-SHA miss

**Flag for Phase 73:** Post-fix chain output will show these diagnostic strings in the V-NN-CHAIN-61 + V-NN-CHAIN-67 FAIL detail lines. Phase 73 RETRO-01 should start from this empirical output as the class-signature inventory.

**New wrapper class discovery (Phase 72 audit sweep):** Section F of 72-VERIFICATION.md should note whether any wrapper class beyond the 17-site inventory documented in D-01 was found during the audit sweep. Per D-01 Option C, Phase 72 only audited check-phase-{66..71}.mjs — Phase 73 RETRO-02 scan of check-phase-{48..65} may surface additional classes.

---

## 12. Self-Dogfood Mechanics for check-phase-72.mjs CHAIN Wrapper

The new check-phase-72.mjs must have its CHAIN wrapper authored with stdout+stderr capture from inception (D-01 self-dogfood). Exact 10-line block to author at the CHAIN wrapper catch site:

```javascript
      try {
        execFileSync('node', [path], {
          stdio: 'pipe',
          timeout: subTimeout,
          cwd: process.cwd(),
          env: subEnv,
        });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 300).trim() };
      }
```

This matches the AFTER pattern from Section 1, includes the `isPeer` variable (parallel to check-phase-68/69/70/71 architecture), and matches the `CHECK_PHASE_NESTED: '1'` env propagation.

The AUDIT wrapper in check-phase-72.mjs (for v1.7-milestone-audit.mjs subprocess) should match check-phase-71.mjs:234-241 verbatim (already correct pattern):

```javascript
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
```

---

## Risks and Mitigations

| Risk | Probability | Mitigation |
|------|-------------|------------|
| 200-char gap regex misses check-phase-71 CHAIN wrapper | **CONFIRMED — WILL HAPPEN** | Use 400-char gap; empirically verified |
| V-72-WRAPPER-NEG false-positive on AUDIT wrapper (already correct) | Low — design handles it | AUDIT wrapper has both tokens; NEG only fires on `hasStderr && !hasStdout` |
| 300-char slice fails to surface V-61-17 FAIL text | **CONFIRMED — WILL HAPPEN** | Increase slice budget per Section 9; document limitation |
| New check-phase-72.mjs self-dogfood CHAIN wrapper has wrong pattern | Low if plan specifies exact block | Section 12 provides exact code to author |
| Atomic commit touches wrong files | Low | Section 5 provides exact 7-file list + git add command |
| V-72-AUDIT check ID clashes with V-72-AUDIT-HARNESS | Medium — D-04 has ambiguity | Resolve naming: use `AUDIT-VERIFY` for heading-check; `AUDIT` for milestone-audit subprocess (per check-phase-71 pattern) |
| Delta-diff count mismatch pre/post (different check counts) | Low | check-phase-71 (pre) has 29 checks; check-phase-72 (post) has 35 checks — the comparison is check-phase-71 pre/post delta, NOT 71 vs 72 counts. Use same validator pre and post |
| Pre-fix baseline stale (drift between Phase 71 close and Phase 72 execution) | Low | Re-capture as `.claude/tmp/72-chain-pre.txt` per Section 4 |

**Critical delta-diff note:** The D-02 SC#3 delta-diff compares check-phase-71.mjs (or check-phase-72.mjs) output BEFORE and AFTER the wrapper fix, using the SAME validator binary both times. It is NOT a comparison between check-phase-71 and check-phase-72 output counts (those have different numbers of checks). Recommended: use check-phase-72.mjs for both pre-fix (run after Wave 2 authors it, before Wave 1 applies fixes) and post-fix (run after Wave 1 applies fixes). Or use check-phase-71.mjs for the pre-fix baseline.

---

## Recommended Plan Topology

### Plan 72-01 Wave Sequence

```
Wave 0 (optional): Pre-capture baseline
  node scripts/validation/check-phase-71.mjs > .claude/tmp/72-chain-pre.txt 2>&1
  (Confirms 21 PASS / 8 FAIL / 0 SKIPPED matches .claude/tmp/71-03-chain-rerun.txt)

Wave 1: Author check-phase-72.mjs (NEW file)
  - Path-A from check-phase-71.mjs per Section 2 structural map
  - CHAIN_PHASES = [48..71]; CHAIN_SKIP = new Set([])
  - FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]
  - CHAIN_WRAPPER_ANCHOR with 400-char gap (Section 3 corrected regex)
  - V-72-WRAPPER-01..07 + V-72-WRAPPER-NEG + V-72-AUDIT-VERIFY + V-72-AUDIT + V-72-CHAIN + V-72-SELF
  - CHAIN wrapper authored with stdout+stderr pattern from inception (Section 12)

Wave 2: Apply uniform CHAIN-wrapper fix to 6 files
  - check-phase-66.mjs:312-317 (lines 309-318 catch block — add stdout line, update return)
  - check-phase-67.mjs:272-277 (same change)
  - check-phase-68.mjs:277-282 (same change)
  - check-phase-69.mjs:193-198 (same change)
  - check-phase-70.mjs:592-597 (same change)
  - check-phase-71.mjs:212-217 (same change)

Wave 3: Pre-commit dry-run
  node scripts/validation/check-phase-72.mjs
  Expected: V-72-WRAPPER-{66..72} PASS; V-72-WRAPPER-NEG PASS; V-72-AUDIT-VERIFY SKIP-PASS;
            V-72-AUDIT PASS; V-72-SELF PASS; V-72-CHAIN-{48..60,68,69,71} PASS;
            V-72-CHAIN-{61..67,70} FAIL (8 accepted-residual per D-02)
  git diff HEAD -- .github/workflows/ scripts/validation/v1.7-milestone-audit.mjs  # must be empty

Wave 4: Post-fix capture
  node scripts/validation/check-phase-72.mjs > .claude/tmp/72-chain-post.txt 2>&1

ATOMIC COMMIT (7 files in ONE SHA):
  git add scripts/validation/check-phase-{66,67,68,69,70,71,72}.mjs
  git commit -m "fix(72-01): WRAPPER-01 chain-apex stdout+stderr capture + check-phase-72.mjs regression-witness (atomic SC#4)"
  git show --name-only --format= HEAD  # verify: 7 files
```

### Plan 72-02 Wave Sequence

```
Wave 1: Chain re-run + delta-diff witness
  node scripts/validation/check-phase-72.mjs > .claude/tmp/72-chain-post.txt 2>&1
  Compare .claude/tmp/72-chain-pre.txt vs .claude/tmp/72-chain-post.txt:
    - PASS/FAIL/SKIPPED counts IDENTICAL (SC#3 second-clause discriminator)
    - V-72-CHAIN-{61..67,70} still FAIL (count preserved; detail strings now carry stdout diagnostic)
    - V-72-CHAIN-{48..60,68,69,71} + V-72-WRAPPER-* all PASS

Wave 2: Predecessor-byte-unchanged verification
  node scripts/validation/v1.7-milestone-audit.mjs  # expect 15/15 PASS
  git diff 05668db HEAD -- .github/workflows/audit-harness-v1.7-integrity.yml \
    scripts/validation/v1.7-milestone-audit.mjs scripts/validation/v1.7-audit-allowlist.json
  # expect empty

Wave 3: Author .planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md
  Sections:
    A: Phase 72 goal achievement narrative (WRAPPER-01 closed; diagnostic surface fixed)
    B: Commands evidence (pre/post chain output; V-61-17 stdout text empirically captured)
    C: SC#1-4 satisfaction (SC#3 uses D-02 Option B template from 72-CONTEXT.md:119-127)
    D: Plan 72-01 atomic SHA byte-exact record (SC#4)
    E: Per-validator audit inventory table (17 sites; Section 11 table above)
    F: Discoveries (any new wrapper class beyond 17-site inventory)
    G: Phase 73 entry-state readiness signal (Section 11 above)
    H: Sign-off

Wave 4: Update v1.8-DEFERRED-CLEANUP.md CHAIN-DEGRADED-AT-HEAD-01 entry
  Append: "Post-WRAPPER-01-fix empirical stdout-diagnostic signature now visible at
  chain-apex output per Phase 72 Plan 72-02 close-gate witness .claude/tmp/72-chain-post.txt"
  Status transition: STUB → PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED

Wave 5: Traceability flips
  REQUIREMENTS.md: WRAPPER-01 Pending → Complete + closing SHAs (Plan 72-01 + Plan 72-02)
  STATE.md: frontmatter progress + Performance Metrics + Pending Todos
  ROADMAP.md: Phase 72 row Complete

COMMIT:
  git commit -m "docs(72-02): Phase 72 close-gate — chain delta-diff witness + 72-VERIFICATION.md + traceability flips"
```

---

## Architecture Patterns

### System Architecture Diagram

```
check-phase-72.mjs (chain-apex)
  |
  |--[V-72-WRAPPER-01..07]--> read source text of check-phase-{66..72}.mjs
  |                           regex scan CHAIN_WRAPPER_ANCHOR (400-char gap)
  |                           assert: each match has err.stderr AND err.stdout
  |
  |--[V-72-WRAPPER-NEG]-----> same regex scan across FIXED_FILES
  |                           count: hasStderr && !hasStdout
  |                           assert: count == 0 (whole-file class signature)
  |
  |--[V-72-AUDIT-VERIFY]----> read 72-VERIFICATION.md
  |                           assert: "Per-Validator Audit Inventory" heading present
  |                           (SKIP-PASS until Plan 72-02 lands)
  |
  |--[V-72-CHAIN-{48..71}]--> subprocess: node check-phase-{N}.mjs
  |                           via execFileSync + CHECK_PHASE_NESTED=1 env
  |                           catch(err): stdout + stderr captured (self-dogfood)
  |
  |--[V-72-AUDIT]-----------> subprocess: node v1.7-milestone-audit.mjs
  |                           assert: exits 0 (predecessor-byte-unchanged)
  |
  +--[V-72-SELF]-------------> CHAIN_PHASES does NOT include 72
                               CHAIN_SKIP.size === 0
```

### Established Pattern: CHAIN ≡ AUDIT capture shape (post-Phase-72)

All `execFileSync` catch blocks in `check-phase-{66..72}.mjs` will share the same pattern:

```javascript
const stderr = err.stderr ? err.stderr.toString() : '';
const stdout = err.stdout ? err.stdout.toString() : '';
const isMissing = err.code === 'ENOENT' || err.status === 127
  || stderr.includes('not found') || stderr.includes('Could not resolve');
if (isMissing) return { pass: true, skipped: true, detail: '...' };
return { pass: false, detail: '... FAIL: ' + (stdout + stderr).slice(0, 300).trim() };
```

---

## Standard Stack

No new packages. Phase 72 modifies existing `.mjs` scripts using only Node.js built-ins already in use:

| Module | Source | Purpose |
|--------|--------|---------|
| `node:fs` (`readFileSync`, `existsSync`) | Node.js built-in | Read validator source for regex assertions |
| `node:path` (`join`) | Node.js built-in | Resolve file paths |
| `node:child_process` (`execFileSync`) | Node.js built-in | Subprocess chain and harness invocation |
| `node:process` | Node.js built-in | argv, env, stdout.write, exit |

---

## Package Legitimacy Audit

Not applicable — no new packages installed. Phase 72 is pure source-code modification and file authoring using existing Node.js built-ins.

---

## Common Pitfalls

### Pitfall 1: 200-char gap misses check-phase-71 CHAIN wrapper
**What goes wrong:** CHAIN_WRAPPER_ANCHOR with `{0,200}` gap fails to match check-phase-71's CHAIN catch block (empirically 258-char gap due to extra `env:` option + return line). V-72-WRAPPER-71 reports "no CHAIN wrapper catch block found" — false failure.
**Root cause:** check-phase-71 passes CHECK_PHASE_NESTED=1 via env, adding a 4th options line vs the 3-option blocks in check-phase-66/67.
**How to avoid:** Use `{0,400}` gap.

### Pitfall 2: Delta-diff compares wrong validators
**What goes wrong:** Planner compares check-phase-71.mjs output (29 checks) vs check-phase-72.mjs output (35 checks) and sees count mismatch — concludes delta-diff fails.
**Root cause:** Different validators have different total check counts.
**How to avoid:** For SC#3 delta-diff, compare check-phase-72.mjs output BEFORE wrapper fixes vs AFTER wrapper fixes (same validator both times). Counts should be identical. Alternatively extract only the PASS/FAIL/SKIPPED summary line from each run.

### Pitfall 3: Slice budget 300 fails to surface V-61-17 diagnostic
**What goes wrong:** Post-fix chain output shows `check-phase-61 FAIL: check-phase-61 -- Phase 61 deliverables\n\n[1/34] V-61-01...` but V-61-17 text never appears in the 300-char window.
**Root cause:** V-61-17 is assertion 17 of 34; its FAIL line appears at byte offset ~2252.
**How to avoid:** Use 500+ chars for the slice budget. Document the limitation.

### Pitfall 4: V-72-AUDIT check ID naming collision
**What goes wrong:** Two checks both named "V-72-AUDIT" — one for the 72-VERIFICATION.md heading check, one for v1.7-milestone-audit subprocess. Runner loop uses ID for display.
**Root cause:** D-04 pseudocode uses "V-72-AUDIT" for both roles.
**How to avoid:** Use `AUDIT-VERIFY` (id: 'AUDIT-VERIFY') for the heading-presence check; keep `AUDIT` (id: 'AUDIT') for the milestone-audit subprocess consistent with check-phase-71 pattern.

### Pitfall 5: Forgetting to include file 72 in FIXED_FILES for self-dogfood
**What goes wrong:** FIXED_FILES = [66..71] — V-72-WRAPPER-NEG does not check check-phase-72.mjs itself. Self-dogfood invariant not enforced.
**Root cause:** Forgetting to add 72 to the array.
**How to avoid:** FIXED_FILES = [66, 67, 68, 69, 70, 71, **72**]. V-72-WRAPPER-07 specifically asserts check-phase-72.mjs.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js built-in (no test framework — inline assertions per project pattern) |
| Config file | None |
| Quick run command | `node scripts/validation/check-phase-72.mjs` |
| Full suite command | `node scripts/validation/check-phase-72.mjs && node scripts/validation/v1.7-milestone-audit.mjs` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| WRAPPER-01 (SC#1) | check-phase-66.mjs:313 captures both streams | Static source-text scan | `node scripts/validation/check-phase-72.mjs` (V-72-WRAPPER-66) | ❌ Wave 1 |
| WRAPPER-01 (SC#2) | Per-validator audit of 17 sites with disposition | Audit inventory in 72-VERIFICATION.md | `node scripts/validation/check-phase-72.mjs` (V-72-AUDIT-VERIFY) | ❌ Wave 1 |
| WRAPPER-01 (SC#3) | No false positives from stdout capture | Delta-diff count-identical | Manual: diff `.claude/tmp/72-chain-pre.txt` vs post | ❌ Wave 0/4 |
| WRAPPER-01 (SC#4) | Atomic closing SHA | Commit structure | `git show --name-only --format= HEAD \| wc -l` == 7 | — |

### Sampling Rate

- Per Wave (Plan 72-01): `node scripts/validation/check-phase-72.mjs`
- Phase gate: V-72-WRAPPER-{66..72} PASS + V-72-WRAPPER-NEG PASS + V-72-AUDIT PASS before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-72.mjs` — covers WRAPPER-01 (Wave 1 of Plan 72-01)
- [ ] `.claude/tmp/72-chain-pre.txt` — pre-fix baseline witness (Wave 0 of Plan 72-01)
- [ ] `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md` — close-gate artifact (Wave 3 of Plan 72-02)

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validator execution | Yes | (project standard) | — |
| git | Predecessor-byte-unchanged check | Yes | (project standard) | — |
| `.claude/tmp/71-03-chain-rerun.txt` | Pre-fix baseline | **Yes** (verified) | 2026-06-04 capture | Re-run: `node check-phase-71.mjs > 72-chain-pre.txt 2>&1` |
| `scripts/validation/check-phase-71.mjs` | Fix target + Path-A source | Yes | `e4887b2` | — |
| `scripts/validation/v1.7-milestone-audit.mjs` | V-72-AUDIT check | Yes | v1.7 | — |

---

## Security Domain

Not applicable — Phase 72 modifies internal Node.js validation scripts only. No network endpoints, auth surfaces, user inputs, or trust-boundary changes. No ASVS categories apply.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | check-phase-{68,69,70} CHAIN wrapper catch blocks are identical in structure to check-phase-67 (except for the isPeer/dual-timeout prelude) | 1 | Wrong before-text for plan; minor — executor will read actual lines |
| A2 | Phase 71 close-gate SHA is `05668db` (used for predecessor-byte-unchanged git diff command) | 6 | Wrong SHA in verification command; recoverable: `git log --grep="71-03.*close-gate"` |
| A3 | V-67-05 failure detail text is `expected OP-10 callouts in 2 files; got [N]` | 8 | Minor — exact text differs; doesn't affect fix |

**All other claims in this research were verified empirically against live files or runtime output.**

---

## Open Questions (RESOLVED)

1. **Slice budget final value** — **RESOLVED: 500 chars**
   - What we knew: 300-char slice misses V-61-17 at offset ~2252; 500 chars also misses it; full diagnostic at ~2252+ chars would require ~2048-char window
   - **Resolution:** Plans 72-01 + 72-02 use 500 chars throughout — captures V-67-05/06 immediately; documents V-61-17 as deeper-in-stdout per 72-VERIFICATION.md Section B Commands evidence. The slice is a preview, not a full diagnostic; Phase 73 RETRO-01 inventory will reference standalone `node check-phase-NN.mjs` runs for full content per established pattern.
   - **Authority:** Locked in CONTEXT.md "Claude's Discretion" slice-budget bullet + PATTERNS.md shared pattern + applied to all 6 wrapper fixes + the new check-phase-72.mjs CHAIN wrapper.

2. **V-72-AUDIT ID naming (AUDIT-VERIFY vs AUDIT for heading-presence check)** — **RESOLVED: `AUDIT-VERIFY` + `AUDIT` as distinct IDs**
   - What we knew: D-04 pseudocode used ambiguous naming; two checks need distinct IDs
   - **Resolution:** `id: 'AUDIT-VERIFY'` for the 72-VERIFICATION.md heading-presence check; `id: 'AUDIT'` for the v1.7-milestone-audit.mjs subprocess (mirrors check-phase-71.mjs V-71-AUDIT slot precedent). Distinct IDs enforced in both plan task acceptance_criteria + check-phase-72.mjs `must_haves`.
   - **Authority:** Locked in plans 72-01 Task 2 interfaces block + 72-02 close-gate; mirrors RESEARCH.md Section 5 recommendation.

---

## Sources

### Primary (HIGH confidence — all empirically verified)
- Live source: `scripts/validation/check-phase-{66,67,68,69,70,71}.mjs` — exact before-state at lines documented above
- Live runtime: `node scripts/validation/check-phase-61.mjs` — V-61-17 FAIL text + stdout byte-offset
- Live runtime: `node scripts/validation/check-phase-67.mjs` — V-67-05/06 FAIL text + empty-stderr behavior
- Live regex test: Node.js inline script — CHAIN_WRAPPER_ANCHOR gap measurements (200 vs 400)
- Live file: `.claude/tmp/71-03-chain-rerun.txt` — pre-fix baseline (21 PASS / 8 FAIL / 0 SKIPPED)
- Live git: `git show --name-only --format= e4887b2` — confirms 3-file atomic commit
- Live git: `git diff 05668db HEAD -- [frozen surfaces]` — confirms empty predecessor diff

### Secondary (MEDIUM confidence — from planning docs, consistent with primary evidence)
- `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-CONTEXT.md` — all four D-01..D-04 decisions
- `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-01-SUMMARY.md` — transient-state disclosure pattern
- `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-VERIFICATION.md` Section F — Phase 72 entry readiness
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md:160-192` — CHAIN-WRAPPER-01 recommended fix snippet
- `.planning/milestones/v1.8-DEFERRED-CLEANUP.md:56-99` — CHAIN-DEGRADED-AT-HEAD-01 8-FAIL inventory

---

## Metadata

**Confidence breakdown:**
- Source-text inventory: HIGH — read from live files with line numbers
- Regex empirical validation: HIGH — executed live Node.js test against all 6 files
- Slice budget analysis: HIGH — measured live stdout byte offsets
- Phase 73 handoff: HIGH — derived from 72-CONTEXT.md locked decisions + live validator output
- Atomic commit pattern: HIGH — precedent SHAs verified via git show

**Research date:** 2026-06-06
**Valid until:** 2026-07-06 (30-day window; stable tooling domain)
