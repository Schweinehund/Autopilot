# Phase 111: Pillar D — Chain-Validator Tooling Refactors - Pattern Map

**Mapped:** 2026-07-01
**Files analyzed:** 21 (1 new + 20 modified)
**Analogs found:** 21 / 21

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/_lib/exec-fail-detail.mjs` | utility | transform | `scripts/validation/_lib/frozen-at-close.mjs` | role-match (same _lib module style) |
| `scripts/validation/_lib/exec-fail-detail.mjs` | utility | transform | `scripts/validation/_lib/archive-path.mjs` | role-match (simpler _lib; no state) |
| `check-phase-{62..66,69,71..74,82,88,93,95,100}.mjs` (TOOL-01 only — 2 sites each) | validator | request-response | `scripts/validation/check-phase-82.mjs` | exact |
| `check-phase-60.mjs` (TOOL-01 × 2 + TOOL-03 × 1) | validator | request-response | `scripts/validation/check-phase-82.mjs` | exact |
| `check-phase-61.mjs` (TOOL-01 × 2 + TOOL-03 × 1 + TOOL-02 × 2) | validator | request-response | `scripts/validation/check-phase-82.mjs` | exact |
| `check-phase-48.mjs` (TOOL-03 × 1) | validator | request-response | `scripts/validation/check-phase-48.mjs` (self, surgery only) | self |
| `check-phase-67.mjs` (TOOL-01 × 2 + TOOL-02 × 3) | validator | request-response | `scripts/validation/check-phase-82.mjs` | exact |
| `check-phase-68.mjs` (TOOL-01 × 2 + TOOL-02 × 2 + V-68-10 fix) | validator | request-response | `scripts/validation/check-phase-82.mjs` + `check-phase-73.mjs:204` | exact |
| `check-phase-70.mjs` (TOOL-01 × 2 + TOOL-02 × 8) | validator | request-response | `scripts/validation/check-phase-82.mjs` | exact |

---

## Pattern Assignments

### `scripts/validation/_lib/exec-fail-detail.mjs` (utility, transform)

**Primary analog:** `scripts/validation/_lib/frozen-at-close.mjs`
**Secondary analog:** `scripts/validation/_lib/archive-path.mjs`

**File header pattern** (`frozen-at-close.mjs` lines 1-14):
```javascript
// scripts/validation/_lib/frozen-at-close.mjs
//
// Centralized frozen-aware readers for chain validators (Phase 73 onward).
//
// HYBRID STATUS:
//   - NEW helpers (Phase 73 onward) consume readers from this module.
//   - EXISTING inline helpers in check-phase-{61, 67, 68, 70}.mjs REMAIN INLINE.
//     Refactor deferred to v1.9+ as FROZEN-AWARE-ADOPTION-SWEEP-01 per
//     `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes).
//
// Lineage: parallel to inline readRequirementsAtV15Close() introduced
// Plan 68-03 Task 1 commit d7d7d5f + readCorpusFileAtV17Close() introduced
// Plan 70-02 Atom 1 commit 26a1ae9; centralized per D-02 LOCKED Option C.
```

**Import block pattern** (`frozen-at-close.mjs` line 15):
```javascript
import { execFileSync } from 'node:child_process';
```

**JSDoc + export pattern** (`frozen-at-close.mjs` lines 46-63):
```javascript
/**
 * Read a file at a frozen milestone-close SHA via `git show <SHA>:<path>`.
 * Hardened signature (v1.7-family pattern): explicit stdio, CRLF normalization.
 *
 * @param {keyof MILESTONE_CLOSE_SHAS} milestoneTag — e.g., 'V15', 'V16', 'V17', 'V141'
 * @param {string} relPath — repo-relative path (e.g., '.planning/REQUIREMENTS.md')
 * @returns {string} file contents at frozen SHA, LF line endings
 * @throws if milestoneTag missing or git show fails
 */
export function readAtClose(milestoneTag, relPath) { ... }
```

**No-state single-export pattern** (`archive-path.mjs` lines 19-30):
```javascript
export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases']) {
  if (typeof phaseSuffix !== 'string' || phaseSuffix.trim() === '') return null;
  ...
  return null;
}
```

**Self-test invocation pattern** (`regenerate-supervision-pins.mjs` lines 32, 479):
```javascript
// The codebase uses argv.includes('--self-test') mode flag — NOT import.meta.url guard
const MODE_SELFTEST = argv.includes('--self-test');
// ...
function doSelfTest() {
  process.stdout.write('=== self-test: ...\n');
  // ... assertions that call process.exit(1) on failure
}
```

**What exec-fail-detail.mjs must match (from RESEARCH.md — locked D-04 design):**
```javascript
// scripts/validation/_lib/exec-fail-detail.mjs
//
// Centralizes the (stdout + stderr).slice(0, N)[.trim()] failure-detail pattern
// across CHAIN/AUDIT/helper-spawn wrapper sites (TOOL-01: EXEC-FAIL-DETAIL-EXTRACTION-01).
//
// Per D-04: takes separate raw stdout/stderr args (not an error object).
// Per D-02: every call site passes n, trim, and prefix EXPLICITLY.
// Defaults are a documented safety net, not a shortcut.

/**
 * Build a failure-detail string from subprocess stdout + stderr.
 *
 * @param {string} stdout  - raw stdout string (use `err.stdout ? err.stdout.toString() : ''`)
 * @param {string} stderr  - raw stderr string (use `err.stderr ? err.stderr.toString() : ''`)
 * @param {object} opts
 * @param {number} opts.n  - slice length (REQUIRED — no default; per D-02 explicit-only)
 * @param {boolean} [opts.trim=false] - whether to trim whitespace after slicing
 * @param {string} [opts.prefix=''] - prefix string prepended to the slice
 * @returns {string}
 */
export function execFailDetail(stdout, stderr, { n, trim = false, prefix = '' }) {
  const combined = stdout + stderr;
  const sliced = combined.slice(0, n);
  return prefix + (trim ? sliced.trim() : sliced);
}

export function selfTest() {
  const assert = (actual, expected, label) => {
    if (actual !== expected) throw new Error(
      `selfTest FAIL [${label}]: expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`
    );
  };
  assert(execFailDetail('abc', 'def', { n: 500, trim: true, prefix: 'X FAIL: ' }), 'X FAIL: abcdef', 'A-basic');
  assert(execFailDetail('  ab', '  cd  ', { n: 500, trim: true, prefix: 'P: ' }), 'P: ab  cd', 'A-trim');
  assert(execFailDetail('abc', 'def', { n: 300, trim: false, prefix: 'harness FAIL: ' }), 'harness FAIL: abcdef', 'C-basic');
  assert(execFailDetail('  ab', '  cd  ', { n: 300, trim: false, prefix: 'H: ' }), 'H:   ab  cd  ', 'C-no-trim');
  assert(execFailDetail('12345', '67890', { n: 7, trim: false, prefix: '' }), '1234567', 'slice-n');
  return 'execFailDetail selfTest: all assertions passed';
}
```

---

### TOOL-01: check-phase-*.mjs — CHAIN wrapper sites (Variant A, all 20 files)

**Analog:** `scripts/validation/check-phase-82.mjs` lines 88-105

**Current pattern (lines 96-103 of check-phase-82.mjs — identical across all 20 files):**
```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
      }
```

**After TOOL-01 import added and Variant A replaced:**
```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' }) };
      }
```

**Import to add at top of each file** (add after existing `_lib` imports or replace `import { resolveArchivedPhasePath }` line pattern):
```javascript
import { execFailDetail } from './_lib/exec-fail-detail.mjs';
```

---

### TOOL-01: check-phase-*.mjs — AUDIT/harness wrapper sites (Variant C, files 62–100 except 60+61)

**Analog:** `scripts/validation/check-phase-82.mjs` lines 108-128

**Current pattern (lines 119-127 of check-phase-82.mjs):**
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

**After TOOL-01 (Variant C replaced):**
```javascript
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
```

---

### TOOL-01: check-phase-60.mjs + check-phase-61.mjs — Variant B sites only

**Analog:** check-phase-60.mjs:254, check-phase-61.mjs:389 (self-analog)

These two files have `harness FAIL:` with N=500 + trim=true (not N=300). Site inventory from RESEARCH.md:
- `check-phase-60.mjs:254` — Variant B
- `check-phase-61.mjs:389` — Variant B

**Current pattern:**
```javascript
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
```

**After TOOL-01 (Variant B replaced):**
```javascript
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'harness FAIL: ' }) };
```

**CAUTION:** Do NOT apply Variant C (N=300, trim=false) to these two sites. They are Variant B: N=500, trim=true.

---

### TOOL-03: check-phase-{48,60,61}.mjs — stderr-only catch blocks

**Analog:** `scripts/validation/check-phase-48.mjs` lines 66-78 (current code, pre-fix)

**Current pattern (check-phase-48.mjs lines 66-78):**
```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
      }
```

**After TOOL-03 fix (add stdout capture + combine streams; then TOOL-01 if also applying exec-fail-detail):**
```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';   // ADDED
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' }) };
        //                                                             ^^ n=200 (distinct from Variant A/C)
      }
```

**Sites:**
- `check-phase-48.mjs` lines 63-78 (id=4 check block)
- `check-phase-60.mjs` lines 183-195
- `check-phase-61.mjs` lines 397-409

---

### TOOL-02: check-phase-61.mjs — inline reader removal (Landmine C applies)

**Analog:** `scripts/validation/_lib/frozen-at-close.mjs` (the centralized module being adopted)

**Current inline reader at check-phase-61.mjs lines 39-45 (no stdio — Landmine C):**
```javascript
function readRequirementsAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'],
      { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
    // NO stdio option — stderr LEAKS to parent process (preserved behavior)
  } catch (err) {
    return null;
  }
}
```

**Current inline reader at check-phase-61.mjs lines 58-64 (same pattern):**
```javascript
function readRoadmapAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/ROADMAP.md'],
      { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```

**Replacement (Landmine C-safe — preserve no-stdio behavior, eliminate named symbols):**
```javascript
// Replace the two named function definitions with a single generic local wrapper
// that preserves the no-stdio git call (matching 61's original stderr-leak semantics):
function readAtV15CloseFor61(relPath) {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:' + relPath],
      { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
    // Deliberately no stdio: option — preserves check-phase-61's stderr-leak behavior (Landmine C)
  } catch (err) {
    return null;
  }
}
// Then replace call sites:
//   readRequirementsAtV15Close() → readAtV15CloseFor61('.planning/REQUIREMENTS.md')
//   readRoadmapAtV15Close()      → readAtV15CloseFor61('.planning/ROADMAP.md')
```

**CRITICAL:** The symbol names `readRequirementsAtV15Close` and `readRoadmapAtV15Close` must NOT appear anywhere in check-phase-61.mjs after this change. V-68-10 will detect them. The Landmine A atomicity constraint requires the V-68-10 fix (see below) in the same commit.

**check-phase-61.mjs already imports from frozen-at-close.mjs** (line 20):
```javascript
import { readAtV15Close } from './_lib/frozen-at-close.mjs';
```
This existing import satisfies V-68-10's tolerant-OR check after the fix. No additional import needed for TOOL-02 in check-phase-61.

---

### TOOL-02: check-phase-67.mjs — inline reader removal (std stdio — no Landmine C)

**Analog:** `scripts/validation/_lib/frozen-at-close.mjs` (the module being adopted)

**Current inline readers at check-phase-67.mjs:**

`readCorpusFileAtV17Close(relPath)` lines 35-44 — has explicit `stdio: ['ignore','pipe','pipe']` — safe to replace:
```javascript
function readCorpusFileAtV17Close(relPath) {
  try {
    return execFileSync('git', ['show', 'aa6de68:' + relPath],
      { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] })
      .replace(/\r\n/g, '\n');
  } catch (err) { return null; }
}
```

`readSidecarAtV17Close()` lines 50-57 — JSON-parsing variant:
```javascript
function readSidecarAtV17Close() {
  try {
    const c = execFileSync('git', ['show', 'aa6de68:scripts/validation/v1.7-audit-allowlist.json'],
      { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(c);   // Returns parsed object, not string
  } catch (err) { return null; }
}
```

**Replacement imports to add:**
```javascript
import { readAtV17Close } from './_lib/frozen-at-close.mjs';
```

**Replacement wrappers:**
```javascript
// Standard catch→null wrapper (Landmine B pattern — readAtClose throws, callers must wrap)
function tryReadAtV17Close(relPath) {
  try { return readAtV17Close(relPath); } catch { return null; }
}
// For JSON variant:
function trySidecarAtV17Close() {
  try { const c = readAtV17Close('scripts/validation/v1.7-audit-allowlist.json'); return JSON.parse(c); }
  catch { return null; }
}
```

---

### TOOL-02: check-phase-68.mjs — inline reader removal + V-68-10 Landmine A fix

**Analog:** `scripts/validation/check-phase-73.mjs` lines 203-210 (tolerant OR matcher pattern)

**Current V-68-10 check (check-phase-68.mjs lines 210-223 — AND logic that breaks):**
```javascript
{
  id: 10, name: 'V-68-10: check-phase-61.mjs has readRequirementsAtV15Close + readRoadmapAtV15Close helpers',
  run() {
    const c = readFile('scripts/validation/check-phase-61.mjs');
    if (c === null) return { pass: false, detail: 'check-phase-61.mjs missing' };
    const hasReq = c.includes('readRequirementsAtV15Close');
    const hasRoad = c.includes('readRoadmapAtV15Close');
    if (!hasReq || !hasRoad) {
      return { pass: false, detail: 'readRequirementsAtV15Close=' + hasReq + '; readRoadmapAtV15Close=' + hasRoad };
    }
    return { pass: true, detail: 'both v1.5-frozen-aware helpers present in check-phase-61.mjs' };
  }
},
```

**Reference tolerant pattern from check-phase-73.mjs lines 203-210:**
```javascript
// CONVERT-61-17 check (tolerant OR: pass if either old OR new style is present)
if (!content.includes('readAtV15Close') && !content.includes('frozen-at-close')) {
  return { pass: false, detail: 'V-61-17 conversion: readAtV15Close import not found' };
}
```

**Required V-68-10 replacement (OR-tolerant — copy this exactly):**
```javascript
    const hasOldStyle = c.includes('readRequirementsAtV15Close') && c.includes('readRoadmapAtV15Close');
    const hasNewStyle = c.includes('readAtV15Close') || c.includes('frozen-at-close');
    if (!hasOldStyle && !hasNewStyle) {
      return { pass: false, detail: 'check-phase-61.mjs lacks v1.5-frozen-aware reader: neither inline symbols nor frozen-at-close import found' };
    }
    const mode = hasNewStyle ? 'centralized (frozen-at-close)' : 'inline (readRequirementsAtV15Close + readRoadmapAtV15Close)';
    return { pass: true, detail: 'v1.5-frozen-aware reader present in check-phase-61.mjs [' + mode + ']' };
```

**Inline readers to remove from check-phase-68.mjs:**
- `readMilestonesAtV17Close()` lines 33-41
- `readCorpusFileAtV17Close(relPath)` lines 45-51

**Replacement:** same `tryReadAtV17Close(relPath)` wrapper pattern as check-phase-67.

**ATOMICITY (Landmine A):** The V-68-10 fix AND the removal of `readRequirementsAtV15Close`/`readRoadmapAtV15Close` symbols from check-phase-61.mjs MUST be in the same git commit. No intermediate state is safe.

---

### TOOL-02: check-phase-70.mjs — 8 inline reader removals

**Analog:** `scripts/validation/_lib/frozen-at-close.mjs` convenience exports (lines 66-75)

**Inline readers to remove (check-phase-70.mjs lines 40-112):**

All 8 use `stdio: ['ignore','pipe','pipe']` and catch→return null. Replacements:

| Removed function | Replacement call | Import needed |
|-----------------|-----------------|---------------|
| `readCorpusFileAtV17Close(relPath)` :40-46 | `tryReadAtV17Close(relPath)` | `readAtV17Close` |
| `readMilestoneAuditAtV17Close()` :49-55 | `tryReadAtV17Close('.planning/milestones/v1.7-MILESTONE-AUDIT.md')` | same |
| `readDeferredCleanupAtV17Close()` :58-63 | `tryReadAtV17Close('.planning/milestones/v1.7-DEFERRED-CLEANUP.md')` | same |
| `readRequirementsAtV17Close()` :67-73 | `tryReadAtV17Close('.planning/REQUIREMENTS.md')` | same |
| `readRoadmapAtV17Close()` :76-82 | `tryReadAtV17Close('.planning/ROADMAP.md')` | same |
| `readStateAtV17Close()` :86-91 | `tryReadAtV17Close('.planning/STATE.md')` | same |
| `readProjectAtV17Close()` :95-100 | `tryReadAtV17Close('.planning/PROJECT.md')` | same |
| `readProjectAtV17CloseGate()` :106-112 | `tryReadAtV17CloseGate('.planning/PROJECT.md')` | `readAtV17CloseGate` |

**Import to add:**
```javascript
import { readAtV17Close, readAtV17CloseGate } from './_lib/frozen-at-close.mjs';
```

**Wrapper pattern:**
```javascript
function tryReadAtV17Close(relPath) {
  try { return readAtV17Close(relPath); } catch { return null; }
}
function tryReadAtV17CloseGate(relPath) {
  try { return readAtV17CloseGate(relPath); } catch { return null; }
}
```

**CAUTION for `readProjectAtV17CloseGate`:** Uses V17_CLOSEGATE SHA (4df3a16), not V17 (aa6de68). The `readAtV17CloseGate` convenience export in frozen-at-close.mjs handles this correctly. Do not use `readAtV17Close` for this function.

---

## Shared Patterns

### Runner Loop (all check-phase-*.mjs — do not modify)
**Source:** `scripts/validation/check-phase-82.mjs` lines 146-173
```javascript
// === Runner loop (verbatim pattern from check-phase-74.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
// ...
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  // ...
}
process.exit(failed > 0 ? 1 : 0);
```
The `showDetail` line explains why D-03 requires VERBOSE or forced-failure for verification: `detail` only renders on non-PASS or VERBOSE.

### isMissing SKIP-vs-FAIL Branch (all CHAIN/AUDIT/TOOL-03 catch blocks — keep as-is)
**Source:** `scripts/validation/check-phase-82.mjs` lines 99-101
```javascript
const isMissing = err.code === 'ENOENT' || err.status === 127
  || stderr.includes('not found') || stderr.includes('Could not resolve');
if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
```
This verdict logic is NOT folded into `exec-fail-detail`. Per CONTEXT constraint 4, the SKIP-vs-FAIL verdict remains at each call site.

### Catch→null SKIP Wrapper Pattern (all TOOL-02 adoption sites — Landmine B)
```javascript
// Standard Landmine B mitigation — readAtClose throws on failure;
// adoption sites MUST wrap with catch→null to preserve SKIP semantics
function tryReadAtV17Close(relPath) {
  try { return readAtV17Close(relPath); } catch { return null; }
}
```

### _lib Import Convention (all check-phase-*.mjs files)
**Source:** `scripts/validation/check-phase-61.mjs` line 20, `check-phase-82.mjs` line 27
```javascript
import { readAtV15Close } from './_lib/frozen-at-close.mjs';
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
```
New import for exec-fail-detail follows same relative `./_lib/` path convention.

### Variant-to-Parameter Reference Table (D-02 locked — per-call-site, not per-file)

| Variant | Sites | `n` | `trim` | `prefix` |
|---------|-------|-----|--------|----------|
| A (CHAIN) | All 20 files, one site each | 500 | true | `'check-phase-' + phaseNum + ' FAIL: '` |
| B (harness in 60+61 only) | check-phase-60.mjs:254, check-phase-61.mjs:389 | 500 | true | `'harness FAIL: '` |
| C (harness in 62–100) | All 20 files except 60+61, one site each | 300 | false | `'harness FAIL: '` |
| TOOL-03 (--self-test) | check-phase-{48,60,61}.mjs, one site each | 200 | false | `'--self-test FAIL: '` |

**Pitfall:** check-phase-73 and check-phase-100 each contain BOTH Variant A (N=500) and Variant C (N=300). N is per-call-site.

---

## No Analog Found

None — all files have close analogs in the existing codebase.

---

## Metadata

**Analog search scope:** `scripts/validation/`, `scripts/validation/_lib/`
**Files scanned:** `frozen-at-close.mjs`, `archive-path.mjs`, `check-phase-82.mjs` (complete), `check-phase-60.mjs` (header + TOOL-03 site), `check-phase-61.mjs` (header), `check-phase-48.mjs` (TOOL-03 site), `regenerate-supervision-pins.mjs` (self-test pattern)
**Pattern extraction date:** 2026-07-01
