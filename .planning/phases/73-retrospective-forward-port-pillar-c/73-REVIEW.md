---
phase: 73-retrospective-forward-port-pillar-c
reviewed: 2026-06-08T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - scripts/validation/_lib/frozen-at-close.mjs
  - scripts/validation/check-phase-60.mjs
  - scripts/validation/check-phase-61.mjs
  - scripts/validation/check-phase-62.mjs
  - scripts/validation/check-phase-63.mjs
  - scripts/validation/check-phase-64.mjs
  - scripts/validation/check-phase-65.mjs
  - scripts/validation/check-phase-67.mjs
  - scripts/validation/check-phase-70.mjs
  - scripts/validation/check-phase-73.mjs
findings:
  critical: 0
  warning: 4
  info: 6
  total: 10
status: issues_found
---

# Phase 73: Code Review Report

**Reviewed:** 2026-06-08T00:00:00Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Phase 73 ships the retrospective forward-port of HEAD-coupled assertions in `check-phase-{48..66}.mjs` to v1.5/v1.6/v1.7-frozen-aware via the new SHA-pinned helper module `scripts/validation/_lib/frozen-at-close.mjs`, plus the chain-apex validator `check-phase-73.mjs` and 8 CHAIN+AUDIT wrapper stdout+stderr capture fold-ins across `check-phase-{60..65}.mjs`. Additional out-of-inventory work: V-67-05/06 assertion-pattern correction in `check-phase-67.mjs`, and V-70-24 Rule 1 close-gate fix in `check-phase-70.mjs` (added `readProjectAtV17CloseGate()` helper + `V17_CLOSEGATE: '4df3a16'` entry in the lib).

Overall the work is structurally clean — the helper module is well-bounded (whitelist-keyed `MILESTONE_CLOSE_SHAS`, hardened `execFileSync` with explicit stdio + 10s timeout + CRLF normalization), and the chain-apex validator correctly excludes self from `CHAIN_PHASES` per the V-NN-SELF auditor-independence invariant. The CHAIN_WRAPPER_ANCHOR / AUDIT_WRAPPER_ANCHOR regex topology is anchored to the empirically-correct 400-char gap per the Phase 72 finding.

No security vulnerabilities found. No data-loss risks. Four warnings concern correctness of newly-authored assertions in `check-phase-73.mjs` (CONVERT-67-06 dead-conjunct, CONVERT-67-05 line-bounded regex, error-swallowing in v1.7 corpus readers, slice-then-trim ordering), and six info items concern code-quality and consistency follow-ups already tracked under D-02 LOCKED carve-out / HELPER-SPAWN-STDERR-01.

## Warnings

### WR-01: V-73-CONVERT-67-06 dead-conjunct regex literal in `includes()`

**File:** `scripts/validation/check-phase-73.mjs:287`
**Issue:** The guard `if (!content.includes('2026-05-26.*SWEEP-02') && !content.includes('SWEEP-02'))` treats `'2026-05-26.*SWEEP-02'` as a literal substring to `String.prototype.includes()`. The `.*` is regex metacharacter syntax, not a literal sequence that would appear in any source file. The first conjunct therefore evaluates to `true` unconditionally (the literal string is never present), and the assertion collapses to `!content.includes('SWEEP-02')`. Because `SWEEP-02` appears repeatedly in `check-phase-67.mjs` (V-67-03/04/05/06 names, comments, callouts), the assertion passes vacuously regardless of whether the actual converted regex assertion `/2026-05-26.*SWEEP-02/` ever shipped. This defeats the intent of the conversion-verification check.
**Fix:**
```javascript
// Assert the regex literal source text directly:
if (!/\/2026-05-26\.\*SWEEP-02\//.test(content) && !/2026-05-26.*SWEEP-02/.test(content)) {
  return { pass: false, detail: 'V-67-06: SWEEP-02 date-row regex pattern not found' };
}
// Or assert both required tokens together:
if (!content.includes('2026-05-26') || !content.includes('SWEEP-02')) {
  return { pass: false, detail: 'V-67-06: SWEEP-02 date-row assertion pattern incomplete (need both 2026-05-26 and SWEEP-02)' };
}
```

### WR-02: V-67-06 regex `/2026-05-26.*SWEEP-02/` is line-bounded by default

**File:** `scripts/validation/check-phase-67.mjs:212`
**Issue:** The pattern `/2026-05-26.*SWEEP-02/.test(c)` uses `.` which by default does NOT match newlines. The assertion is described as targeting a tail-table row `| 2026-05-26 | SWEEP-02 ... |` (per comment lines 197-200) where date and tag are on the same line — so the current corpus shape works. However, if the frozen-corpus row ever gets split across lines (e.g., a footnote-style multi-line entry), the assertion silently fails. Same concern in `check-phase-73.mjs:265` where `V-67-05.*v1\.7-frozen` is line-bounded — if the check name ever wraps in the source, the test fails opaquely.
**Fix:**
```javascript
// Make multi-line tolerant with [\s\S]:
if (/2026-05-26[\s\S]{0,200}SWEEP-02/.test(c) || /## Version History/.test(c)) {
  withVH++;
}
// Or assert each token independently and combine:
if ((c.includes('2026-05-26') && c.includes('SWEEP-02')) || c.includes('## Version History')) {
  withVH++;
}
```

### WR-03: v1.7-frozen-aware readers swallow ALL errors as "placeholder unresolved"

**File:** `scripts/validation/check-phase-67.mjs:41-43`, `scripts/validation/check-phase-70.mjs:43-45, 52-54, 60-62, 68-70, 77-79, 86-88, 95-97, 107-110`, `scripts/validation/_lib/frozen-at-close.mjs:39-47`
**Issue:** All `readXAtV17Close` helpers and the centralized `readAtClose()` use a bare `try/catch` that returns `null` on any error. Pre-substitution this masked the chicken-and-egg "git unknown object name aa6de68" error as a graceful SKIP. POST-substitution (Plan 70-05 Commit A already landed; aa6de68 is a real SHA), legitimate failure modes — git binary missing, repository corruption, file deleted at the frozen SHA, timeout, ENOMEM — all silently fall through to "PASS-via-skip" with a misleading "placeholder unresolved" detail string. This makes the validator chain blind to git-environment regressions. The centralized helper at `frozen-at-close.mjs:39-47` does NOT have this defect (it lets exceptions propagate to caller), but the inline duplicates in check-phase-67/70 do.
**Fix:** Discriminate "object not found" (the intentional chicken-and-egg case) from other failures, and surface real errors:
```javascript
function readCorpusFileAtV17Close(relPath) {
  try {
    return execFileSync('git', ['show', 'aa6de68:' + relPath], {
      encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe']
    }).replace(/\r\n/g, '\n');
  } catch (err) {
    const msg = (err.stderr ? err.stderr.toString() : '') + (err.message || '');
    if (/unknown revision|bad revision|does not exist|invalid object/.test(msg)) {
      return null; // legitimate chicken-and-egg
    }
    throw err; // surface ENOENT (no git), ETIMEDOUT, etc.
  }
}
```
Even better: migrate these inline helpers to the centralized `frozen-at-close.mjs` (tracked as FROZEN-AWARE-ADOPTION-SWEEP-01 per D-02 carve-out) — but apply the discrimination there too.

### WR-04: CHAIN/AUDIT wrapper failure detail loses signal via slice-then-trim ordering

**File:** `scripts/validation/check-phase-73.mjs:372, 395`, `scripts/validation/check-phase-60.mjs:235, 254`, `scripts/validation/check-phase-61.mjs:370, 389`, `scripts/validation/check-phase-62.mjs:321, 340`, `scripts/validation/check-phase-63.mjs:326, 345`, `scripts/validation/check-phase-64.mjs:311, 330`, `scripts/validation/check-phase-65.mjs:299, 319`
**Issue:** `(stdout + stderr).slice(0, 500).trim()` slices first, then trims. If the first 500 chars happen to be leading whitespace, banner separator lines, or a verbose log preamble (which they often are in chained subprocess output), the trim removes the surrounding whitespace but the actual FAIL diagnostic is already truncated out of the window. Better to extract the diagnostically-relevant signal first. Additionally, putting `stdout + stderr` without a separator can run lines together when stdout has no trailing newline.
**Fix:**
```javascript
// Capture the last 500 chars (where the FAIL message lives), and inject a delimiter:
const tail = (stdout + '\n--STDERR--\n' + stderr).trim();
return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + tail.slice(-500) };
```
Or grep for FAIL/Result lines:
```javascript
const combined = (stdout + '\n' + stderr).trim();
const failLines = combined.split('\n').filter(l => /FAIL|Error|Result:/.test(l)).join(' | ');
return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (failLines || combined.slice(-300)).trim() };
```

## Info

### IN-01: Inline v1.5-frozen-aware helpers in check-phase-61.mjs lack `stdio: ['ignore', 'pipe', 'pipe']` hardening

**File:** `scripts/validation/check-phase-61.mjs:39-45, 58-64`
**Issue:** `readRequirementsAtV15Close()` and `readRoadmapAtV15Close()` both call `execFileSync` WITHOUT the `stdio: ['ignore', 'pipe', 'pipe']` hardening that the new centralized helper at `_lib/frozen-at-close.mjs:42-46` uses. On Windows / CI, this can leak inner git stderr ("fatal: ...") to the parent's stderr during transient failure paths and pollute downstream log capture.
**Fix:** Tracked as FROZEN-AWARE-ADOPTION-SWEEP-01 per D-02 LOCKED Option C carve-out (refactor deferred to v1.9+). Acceptable for v1.8.

### IN-02: Six near-identical inline `readXAtV17Close` helpers in check-phase-70.mjs duplicate the centralized lib

**File:** `scripts/validation/check-phase-70.mjs:40-112`
**Issue:** Seven helpers (`readCorpusFileAtV17Close`, `readMilestoneAuditAtV17Close`, `readDeferredCleanupAtV17Close`, `readRequirementsAtV17Close`, `readRoadmapAtV17Close`, `readStateAtV17Close`, `readProjectAtV17Close`, `readProjectAtV17CloseGate`) each implement the same 7-line `try { execFileSync('git', ['show', SHA + ':' + path], ...) } catch { return null }` pattern. Could be one-liners over `readAtV17Close` / `readAtV17CloseGate` from the centralized lib.
**Fix:** Tracked as FROZEN-AWARE-ADOPTION-SWEEP-01 per D-02 LOCKED Option C carve-out. Acceptable for v1.8.

### IN-03: PIN_HELPER `--self-test` catch blocks capture stderr only

**File:** `scripts/validation/check-phase-60.mjs:188-193`, `scripts/validation/check-phase-61.mjs:402-407`
**Issue:** The `regenerate-supervision-pins.mjs --self-test` wrapper catches `err.stderr.slice(0, 200)` without checking `err.stdout`. If the helper writes diagnostics to stdout (common for Node CLI tools), the FAIL detail is lost.
**Fix:** Tracked as class-type HELPER-SPAWN-STDERR-01 per D-01 LOCKED, deferred to v1.9+. Acceptable for v1.8.

### IN-04: Duplicated CHAIN_SKIP historical-narrative comment block across 4 files

**File:** `scripts/validation/check-phase-62.mjs:48-67`, `scripts/validation/check-phase-63.mjs:55-74`, `scripts/validation/check-phase-64.mjs:54-73`, `scripts/validation/check-phase-65.mjs:49-68`
**Issue:** A ~20-line narrative block (Phase 68 CHAIN-01..03 resolution, sha 7b635ca empty-Set close, etc.) is copy-pasted byte-identically across four validators. Updating the narrative requires touching all four. Per project's validator-as-deliverable single-file invariant this duplication is intentional, but the cost rises with each new validator. Mark as INFO; no action required for Phase 73 close.
**Fix:** Long-term — extract historical narrative to `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (already referenced) and replace the in-file block with a one-line pointer comment.

### IN-05: `_lib/frozen-at-close.mjs` `MILESTONE_CLOSE_SHAS` key validation lacks `hasOwnProperty` guard

**File:** `scripts/validation/_lib/frozen-at-close.mjs:40-41`
**Issue:** `MILESTONE_CLOSE_SHAS[milestoneTag]` is checked with `if (!sha) throw`, but a tag like `'__proto__'`, `'constructor'`, or `'hasOwnProperty'` would resolve to a truthy prototype-chain value and pass the `!sha` guard, then concatenate junk into the git argv. Not a security risk (execFileSync uses array args, no shell), but yields a confusing "fatal: ambiguous argument" error rather than the intended "No frozen SHA for milestone X".
**Fix:**
```javascript
export function readAtClose(milestoneTag, relPath) {
  if (!Object.prototype.hasOwnProperty.call(MILESTONE_CLOSE_SHAS, milestoneTag)) {
    throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  }
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  return execFileSync('git', ['show', sha + ':' + relPath], { ... });
}
```

### IN-06: CHAIN_WRAPPER_ANCHOR regex anchors are topology-fragile (drift risk over time)

**File:** `scripts/validation/check-phase-73.mjs:65, 69`
**Issue:** The 400-char `[\s\S]{0,400}?` gap was empirically determined from check-phase-71's 258-char wrapper plus headroom. As subsequent chain validators add lines between `execFileSync('node', ...)` and `catch (err) {` (e.g., when peers grow more pre-execution setup), the anchor can silently fail to match — yielding false-negative "0 stderr-only wrappers" PASS for a regressed wrapper. The inner `{0,600}?` body window has similar risk if the wrapper body grows.
**Fix:** Either (a) raise the budget to 800/1000 with documented rationale, or (b) replace the catch-body capture with a more robust delimited extraction (e.g., balance-aware brace counting via a multi-step parse), or (c) add a positive-control assertion: after parsing wrappers, assert the COUNT matches `FIXED_FILES_RETRO_02.length * 2` (one CHAIN + one AUDIT per file where applicable) so anchor mis-matches surface as count mismatches rather than silent zero-stderr-only PASS.

---

_Reviewed: 2026-06-08T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
