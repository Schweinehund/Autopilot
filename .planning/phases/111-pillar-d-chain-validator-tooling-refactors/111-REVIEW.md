---
phase: 111-pillar-d-chain-validator-tooling-refactors
reviewed: 2026-07-01T00:00:00Z
depth: deep
files_reviewed: 23
files_reviewed_list:
  - scripts/validation/_lib/exec-fail-detail.mjs
  - scripts/validation/check-phase-48.mjs
  - scripts/validation/check-phase-60.mjs
  - scripts/validation/check-phase-61.mjs
  - scripts/validation/check-phase-62.mjs
  - scripts/validation/check-phase-63.mjs
  - scripts/validation/check-phase-64.mjs
  - scripts/validation/check-phase-65.mjs
  - scripts/validation/check-phase-66.mjs
  - scripts/validation/check-phase-67.mjs
  - scripts/validation/check-phase-68.mjs
  - scripts/validation/check-phase-69.mjs
  - scripts/validation/check-phase-70.mjs
  - scripts/validation/check-phase-71.mjs
  - scripts/validation/check-phase-72.mjs
  - scripts/validation/check-phase-73.mjs
  - scripts/validation/check-phase-74.mjs
  - scripts/validation/check-phase-82.mjs
  - scripts/validation/check-phase-88.mjs
  - scripts/validation/check-phase-93.mjs
  - scripts/validation/check-phase-95.mjs
  - scripts/validation/check-phase-100.mjs
  - scripts/validation/_lib/frozen-at-close.mjs
findings:
  critical: 0
  warning: 3
  info: 1
  total: 4
status: issues_found
---

# Phase 111: Code Review Report

**Reviewed:** 2026-07-01
**Depth:** deep
**Files Reviewed:** 23
**Status:** issues_found (0 critical, 3 warnings, 1 info)

## Summary

Phase 111 refactors three things across 21 chain-validator files: (TOOL-01) a new
`execFailDetail` helper centralises the `(stdout+stderr).slice(0,N)[.trim()]` pattern;
(TOOL-02) inline v1.7-frozen readers in check-phase-{67,68,70} are replaced with
delegating wrappers over `readAtV17Close`/`readAtV17CloseGate`; (TOOL-03) three
`--self-test FAIL` sites in check-phase-{48,60,61} that previously captured only
`stderr` now also capture `stdout`.

The large mechanical substitution (CHAIN_PHASES loop + harness) is byte-identical
to the originals across all 21 files. TOOL-02 delegation correctly preserves both
the null-on-failure contract and the stdio-suppressed git show behaviour (via
`readAtClose` in frozen-at-close.mjs). Landmine C (check-phase-61 omitting stdio)
is preserved. V-68-10 tolerant-OR logic is correct. No blockers found.

Three warnings are raised: two are robustness gaps in the new helper itself (no
runtime guard for null/undefined inputs, no validation that `n` is provided); one
is a documented-but-real behaviour divergence at the three TOOL-03 sites where the
same `n=200` budget now covers `stdout+stderr` rather than `stderr` alone.

---

## Warnings

### WR-01: `execFailDetail` silently corrupts output on null/undefined stream inputs

**File:** `scripts/validation/_lib/exec-fail-detail.mjs:32`

**Issue:** The function body is `const combined = stdout + stderr`. If either
argument is `null` or `undefined`, JavaScript string coercion produces `"nullsome
text"` or `"some textnull"` in the combined string. Every current call site guards
with a ternary (`err.stdout ? err.stdout.toString() : ''`), so this is not
exploitable today. But the function has no internal guard and the `selfTest()` has
no coverage for this case, so a future caller that passes an unguarded `err.stdout`
directly (before the ternary pattern is copy-pasted correctly) will emit corrupted
diagnostic strings with no error.

**Fix:** Add a one-line normalisation at the top of the function body:

```js
export function execFailDetail(stdout, stderr, { n, trim = false, prefix = '' }) {
  const combined = (stdout == null ? '' : String(stdout))
                 + (stderr == null ? '' : String(stderr));
  const sliced = combined.slice(0, n);
  return prefix + (trim ? sliced.trim() : sliced);
}
```

---

### WR-02: Missing `n` silently returns the entire combined string

**File:** `scripts/validation/_lib/exec-fail-detail.mjs:31-34`

**Issue:** The JSDoc marks `opts.n` as REQUIRED with no default, but there is no
runtime enforcement. `combined.slice(0, undefined)` returns the complete string in
JavaScript. A call site that accidentally omits `n` (or passes `null` for `n`)
silently returns an unbounded diagnostic string, potentially logging megabytes to
the terminal and defeating the truncation contract the helper exists to enforce.
No `selfTest` case covers this.

**Fix:**

```js
export function execFailDetail(stdout, stderr, { n, trim = false, prefix = '' }) {
  if (n === undefined || n === null) throw new TypeError('execFailDetail: n is required');
  // ... rest unchanged
}
```

Alternatively, add a selfTest assertion that omitting `n` throws, so the
`--self-test` exit-0 check would catch regressions.

---

### WR-03: TOOL-03 `--self-test FAIL` sites share `n=200` budget across stdout+stderr, not stderr alone

**Files:**
- `scripts/validation/check-phase-48.mjs:78`
- `scripts/validation/check-phase-60.mjs:194`
- `scripts/validation/check-phase-61.mjs:384`

**Issue:** The original code at all three sites was:

```js
return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
```

The refactored code is:

```js
return { pass: false, detail: execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' }) };
```

`execFailDetail` computes `(stdout + stderr).slice(0, 200)`. When a self-test
binary writes output to stdout before failing (which is common — progress lines,
version banners, etc.), that stdout content occupies part of the 200-char window
and reduces the amount of stderr content visible in the failure detail. In the
extreme case (stdout >= 200 chars), no stderr text appears at all. This contradicts
the D-02 "byte-preserving" spec at these sites.

This is intentional per the TOOL-03 design (capturing more diagnostic context is
the goal), but the shared-budget truncation can make failures _harder_ to diagnose
than the original stderr-only approach, not easier.

**Fix options (choose one):**

Option A — keep stdout in the message but give it a separate, additive budget:

```js
const stdoutPart = stdout.slice(0, 100);
const stderrPart = stderr.slice(0, 200);
return { pass: false, detail: '--self-test FAIL: '
  + (stdoutPart ? '[stdout] ' + stdoutPart + ' ' : '')
  + '[stderr] ' + stderrPart };
```

Option B — increase `n` to `400` to preserve the original 200-char stderr window
even when stdout is non-empty:

```js
execFailDetail(stdout, stderr, { n: 400, trim: false, prefix: '--self-test FAIL: ' })
```

Option C — accept the current behaviour as-is but update the JSDoc/comment to
acknowledge the tradeoff explicitly, and remove the D-02 "byte-preserving" claim
for these three sites.

---

## Info

### IN-01: `selfTest()` missing edge-case coverage

**File:** `scripts/validation/_lib/exec-fail-detail.mjs:37-51`

**Issue:** The `selfTest()` function covers the happy-path variants (A-basic,
A-trim, C-basic, C-no-trim, slice-n) but has no assertions for:
- null or undefined `stdout`/`stderr` (the WR-01 scenario)
- missing `n` (the WR-02 scenario)
- empty string inputs (both arguments `''`)
- `prefix = ''` (default) combined with trim

Because the `--self-test` gate is an active check in several chain validators, this
is the natural place to add regression coverage for the above edge cases.

**Fix:** Extend `selfTest()` with:

```js
// Edge: empty inputs
assert(execFailDetail('', '', { n: 50, trim: false, prefix: 'P: ' }), 'P: ', 'empty-both');
// Edge: trim on already-trimmed string (no-op)
assert(execFailDetail('abc', '', { n: 10, trim: true, prefix: '' }), 'abc', 'trim-noop');
```

Add a guard-throw test if WR-02 is fixed.

---

## Verified clean (no findings)

The following properties were checked and found correct:

- **Byte-identity for all CHAIN_PHASES sites (n=500, trim=true):** Every
  `(stdout + stderr).slice(0, 500).trim()` substitution correctly maps to
  `execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: '...' })`. Verified
  across check-phase-{60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,82,88,93,95,100}.

- **Byte-identity for harness sites (n=300, trim=false or n=500, trim=true):**
  check-phase-60 harness correctly uses n=500,trim=true; all other harness sites
  correctly use n=300,trim=false. Both match their respective originals.

- **TOOL-02 catch→null contract:** All delegating wrappers use `catch (e) { return null; }`.
  `readAtV17Close` (via `readAtClose`) throws an `Error` on git failure; the catch
  handles all thrown values including non-Error throws. Null-on-failure contract
  preserved identically to the original inline try/catch.

- **TOOL-02 stdio suppression preserved:** The original v1.7-frozen inline readers
  in check-phase-{67,68,70} passed `stdio: ['ignore', 'pipe', 'pipe']` to suppress
  git's "fatal: invalid object name" stderr when the placeholder SHA is still
  unsubstituted. `readAtClose` in frozen-at-close.mjs (line 60-61) also passes
  `stdio: ['ignore', 'pipe', 'pipe']`. Behaviour is identical.

- **Landmine C correct:** `readAtV15CloseFor61` in check-phase-61.mjs omits the
  `stdio` option (line 37), exactly matching the original `readRequirementsAtV15Close`
  and `readRoadmapAtV15Close` inline implementations. Stderr leaks to parent on
  missing SHA, as intended.

- **V-68-10 tolerant-OR logic correct:** The new check passes if
  `c.includes('readAtV15CloseFor61')` is true OR both legacy helpers are present.
  Since the legacy helpers are removed and `readAtV15CloseFor61` is added,
  `hasUnified = true` → check passes without false-positive regression.

- **`readAtV15Close` import in check-phase-61 is not unused:** The import at line 20
  is consumed at lines 267, 278, 293, 309 for MILESTONES.md checks — a pre-existing
  usage not touched by phase 111.

- **TOOL-03 `const stdout` additions:** In check-phase-{48,60,61}, the new
  `const stdout = err.stdout ? err.stdout.toString() : '';` line correctly guards
  against undefined/null Buffer before passing to `execFailDetail`. No crash risk.

---

_Reviewed: 2026-07-01_
_Reviewer: Claude (adversarial code review)_
_Depth: deep_
