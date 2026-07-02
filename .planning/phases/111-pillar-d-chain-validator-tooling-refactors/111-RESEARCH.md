# Phase 111: Pillar D — Chain-Validator Tooling Refactors - Research

**Researched:** 2026-07-01
**Domain:** Node.js ESM validation tooling — `scripts/validation/*.mjs` refactors
**Confidence:** HIGH (all findings from direct codebase inspection)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 (WINNER 1b):** Execute all three refactors as one combined plan with atomic commits inside — NOT three separate plans. File-overlap graph is fully connected (TOOL-01/02/03 all edit check-phase-61; TOOL-01+TOOL-02 both edit check-phase-68).

**D-02 (WINNER 2a):** The centralized helper parameterizes N and preserves each site's value (N=500 for CHAIN/trimmed-harness sites; N=300 for no-trim harness sites). Every call site passes n, trim, and prefix explicitly.

**D-03 (WINNER 3a):** Verify via full-chain output diff with FORCED failure/VERBOSE rendering — capture verdicts + detail bytes before refactor, refactor, re-run, assert identical. Verification MUST exercise the failure path AND include an unreadable-SHA case to confirm SKIP is preserved (Landmine B).

**D-04 (WINNER 4a):** `execFailDetail(stdout, stderr, { n, trim, prefix })` — takes separate raw stdout/stderr args and parameterizes all three varying axes. Every call site passes n, trim, and prefix explicitly.

### Cross-Cutting Execution Constraints (LOCKED)

1. **Landmine A — atomicity:** Removing `readRequirementsAtV15Close`/`readRoadmapAtV15Close` from check-phase-61 AND making check-phase-68's V-68-10 assertion tolerant MUST land in ONE commit.
2. **Landmine B — preserve SKIP:** `readAtClose` throws; inline readers catch→return null→caller SKIPs. Adoption MUST wrap to catch→return null.
3. **Landmine C — preserve stderr behavior:** `readAtClose` uses `stdio:['ignore','pipe','pipe']`; check-phase-61's inline readers omit it. Adoption in 61 must preserve 61's failure-path stderr behavior.
4. **Verdict vs string separation:** Do NOT fold the `isMissing` SKIP-vs-FAIL branch into the detail-string helper.
5. **Per-site, not per-file:** N/trim/prefix selection is per-call-site (check-phase-73 and check-phase-100 each contain BOTH a variant-A and variant-C site).
6. **Forced-failure verification is mandatory:** green-chain equality is not evidence.
7. **Sequential main-tree execution:** no parallel plans; order edits so each atomic commit leaves the full chain exiting 0.

### Claude's Discretion

- Exact helper file layout, JSDoc, and per-site edit sequencing within the combined plan.

### Deferred Ideas (OUT OF SCOPE)

- Lint/guard that fails CI if a future inline `(stdout+stderr).slice(...)` duplicate reappears.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TOOL-01 | `scripts/validation/_lib/exec-fail-detail.mjs` helper DRYs `(stdout + stderr).slice(0, N).trim()` across all CHAIN/AUDIT/helper-spawn wrapper sites | Site inventory below: 40 individual line changes across 20 files; 3 variants documented with exact per-site parameters |
| TOOL-02 | ~13 inline frozen-aware helpers across check-phase-{61,67,68,70}.mjs replaced with calls to centralized `_lib/frozen-at-close.mjs` | Exact function signatures and line numbers documented; Landmine A/B/C constraints documented |
| TOOL-03 | 3 helper-spawn stderr-only catch blocks in check-phase-{48,60,61}.mjs capture both stdout+stderr with `--self-test` discriminator | Exact line numbers and current code documented; fix pattern specified |
</phase_requirements>

---

## Summary

Phase 111 is a pure DRY refactoring of the chain-validator tooling — no new validation coverage, no corpus changes, no new checks. Three separate code-smell patterns are each extracted or fixed under a behavior/verdict-equivalence invariant: the full chain must exit 0 after every atomic commit.

The research confirms 40 total call sites for TOOL-01 across 20 files (not 18-21 as estimated in ROADMAP/CONTEXT — the count was per-file; each file has two sites). TOOL-02 has 14 inline reader definitions across 4 files (CONTEXT estimate of ~13 is close; the discrepancy is likely the JSON-parsing variant in check-phase-67). TOOL-03 has exactly 3 sites confirmed by grep. Five code-verified landmines from the adversarial review are documented with exact line numbers and mitigation code.

The primary complexity is the atomicity constraint (Landmine A): removing inline reader symbols from check-phase-61 and making check-phase-68's V-68-10 assertion tolerant must be a single commit, because V-68-10 uses AND logic that will immediately flip FAIL if either symbol disappears. The tolerant-OR pattern from check-phase-73.mjs:204 is the reference implementation.

**Primary recommendation:** Execute as one combined plan with five atomic commits: (1) create exec-fail-detail.mjs + self-test, (2) apply TOOL-01 to all 40 sites, (3) Landmine A commit (remove inline readers from 61 + make V-68-10 tolerant simultaneously), (4) complete TOOL-02 for check-phase-{67,68,70}, (5) apply TOOL-03 to the three sites.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Failure-detail string extraction | `_lib/exec-fail-detail.mjs` (new shared helper) | All CHAIN/AUDIT/helper-spawn wrappers (consumers) | Centralizes duplicated pattern; consumers import and call |
| Frozen-aware file reading | `_lib/frozen-at-close.mjs` (existing centralized module) | check-phase-{61,67,68,70}.mjs (consumers, replacing inline) | Module already exists and exports correct API; inline readers are legacy |
| Helper-spawn error capture | Each check-phase-{48,60,61}.mjs catch block | `--self-test` logic in regenerate-supervision-pins.mjs | Fix is in the caller's catch block, not in the helper |
| Chain verification | check-phase-100.mjs (current apex, [48..99]) | Individual check-phase-{48..99}.mjs | Apex invokes full chain; NESTED env var short-circuits recursion |

---

## TOOL-01 Site Inventory (Complete)

### Three Confirmed Variants

**Variant A — CHAIN wrapper (N=500, trim=yes, prefix=`check-phase-N FAIL: `)**
Every CHAIN regression-guard catch block: `'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim()`

**Variant B — AUDIT/harness wrapper in 60+61 ONLY (N=500, trim=yes, prefix=`harness FAIL: `)**
`'harness FAIL: ' + (stdout + stderr).slice(0, 500).trim()` — ONLY in check-phase-60 and check-phase-61.

**Variant C — AUDIT/harness wrapper in 62-100 (N=300, trim=NO, prefix=`harness FAIL: `)**
`'harness FAIL: ' + (stdout + stderr).slice(0, 300)` — NO `.trim()`.

**Important:** Prefix does NOT determine N or trim. check-phase-73 and check-phase-100 each contain BOTH a variant-A (N=500) and variant-C (N=300) site.

### Exact Site Enumeration — 40 Lines Across 20 Files

[VERIFIED: direct grep `(stdout + stderr)\.slice\(0,` in scripts/validation/*.mjs]

| File | Line | Variant | N | trim | prefix |
|------|------|---------|---|------|--------|
| check-phase-60.mjs | :235 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-60.mjs | :254 | B | 500 | yes | `harness FAIL: ` |
| check-phase-61.mjs | :370 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-61.mjs | :389 | B | 500 | yes | `harness FAIL: ` |
| check-phase-62.mjs | :321 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-62.mjs | :340 | C | 300 | NO | `harness FAIL: ` |
| check-phase-63.mjs | :326 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-63.mjs | :345 | C | 300 | NO | `harness FAIL: ` |
| check-phase-64.mjs | :311 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-64.mjs | :330 | C | 300 | NO | `harness FAIL: ` |
| check-phase-65.mjs | :299 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-65.mjs | :319 | C | 300 | NO | `harness FAIL: ` |
| check-phase-66.mjs | :318 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-66.mjs | :338 | C | 300 | NO | `harness FAIL: ` |
| check-phase-67.mjs | :287 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-67.mjs | :309 | C | 300 | NO | `harness FAIL: ` |
| check-phase-68.mjs | :283 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-68.mjs | :305 | C | 300 | NO | `harness FAIL: ` |
| check-phase-69.mjs | :199 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-69.mjs | :221 | C | 300 | NO | `harness FAIL: ` |
| check-phase-70.mjs | :613 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-70.mjs | :637 | C | 300 | NO | `harness FAIL: ` |
| check-phase-71.mjs | :218 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-71.mjs | :241 | C | 300 | NO | `harness FAIL: ` |
| check-phase-72.mjs | :162 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-72.mjs | :185 | C | 300 | NO | `harness FAIL: ` |
| check-phase-73.mjs | :381 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-73.mjs | :404 | C | 300 | NO | `harness FAIL: ` |
| check-phase-74.mjs | :160 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-74.mjs | :183 | C | 300 | NO | `harness FAIL: ` |
| check-phase-82.mjs | :102 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-82.mjs | :125 | C | 300 | NO | `harness FAIL: ` |
| check-phase-88.mjs | :102 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-88.mjs | :125 | C | 300 | NO | `harness FAIL: ` |
| check-phase-93.mjs | :102 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-93.mjs | :125 | C | 300 | NO | `harness FAIL: ` |
| check-phase-95.mjs | :102 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-95.mjs | :125 | C | 300 | NO | `harness FAIL: ` |
| check-phase-100.mjs | :114 | A | 500 | yes | `check-phase-N FAIL: ` |
| check-phase-100.mjs | :137 | C | 300 | NO | `harness FAIL: ` |

**Count:** 20 Variant A, 2 Variant B, 18 Variant C = **40 total lines**

**NOTE:** ROADMAP/CONTEXT estimated "~18-21 sites" — that was a per-file count. There are 20 files, 40 individual `slice(0,N)` occurrences. Each file receives two edits (one CHAIN wrapper, one AUDIT/harness wrapper).

---

## TOOL-02 Inline Reader Inventory (Complete)

### frozen-at-close.mjs API (the target module)

[VERIFIED: direct read of `scripts/validation/_lib/frozen-at-close.mjs`]

```javascript
// THROWS on failure — callers MUST wrap catch→return null for SKIP preservation (Landmine B)
export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8',
    timeout: 10000,
    stdio: ['ignore', 'pipe', 'pipe'],  // CAPTURES stderr (Landmine C)
  }).replace(/\r\n/g, '\n');
}

// Convenience wrappers (throw-through — still need catch→null at adoption sites)
export const readAtV15Close       = (p) => readAtClose('V15',          p);
export const readAtV17Close       = (p) => readAtClose('V17',          p);
export const readAtV17CloseGate   = (p) => readAtClose('V17_CLOSEGATE', p);
// ... readAtV141Close, readAtV16Close, readAtV18Close..readAtV112Close also exported
```

**MILESTONE_CLOSE_SHAS contains:** V141, V15, V16, V17, V17_CLOSEGATE, V18, V19, V110, V111, V112.

**Return contract:** Returns LF-normalized string content. Throws (does not return null) on any failure. This is the critical difference from all inline readers (which catch→return null).

### Inline Readers — Exact Signatures and Behavior

[VERIFIED: direct read of check-phase-{61,67,68,70}.mjs]

#### check-phase-61.mjs — 2 inline readers

check-phase-61 ALREADY imports `readAtV15Close` from `_lib/frozen-at-close.mjs` at line 20 (used for V-61-17..20). The TOOL-02 inline readers are used for V-61-01..08.

**`readRequirementsAtV15Close()` — lines :39-45**
```javascript
function readRequirementsAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'],
      { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
    // NO stdio option — stderr LEAKS to parent process (Landmine C)
  } catch (err) {
    return null;  // catch→null = SKIP (Landmine B)
  }
}
```

**`readRoadmapAtV15Close()` — lines :58-64**
```javascript
function readRoadmapAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/ROADMAP.md'],
      { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
    // NO stdio option — stderr LEAKS to parent process (Landmine C)
  } catch (err) {
    return null;  // catch→null = SKIP (Landmine B)
  }
}
```

**Landmine C detail for check-phase-61:** These two functions deliberately omit `stdio` (so `git show` with an invalid SHA writes "fatal: invalid object name" to the parent process's stderr, which the suite treats as a meaningful signal). The centralized `readAtClose` uses `stdio:['ignore','pipe','pipe']` which suppresses that stderr leak. Adoption in 61 must use a local wrapper that preserves the no-stdio behavior, NOT a raw `readAtClose` call.

**Adoption pattern for check-phase-61:**
```javascript
// Local wrapper preserving 61's no-stdio behavior (Landmine C)
function readAtV15CloseFor61(relPath) {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:' + relPath],
      { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
// Then call sites become:
// readRequirementsAtV15Close() → readAtV15CloseFor61('.planning/REQUIREMENTS.md')
// readRoadmapAtV15Close()      → readAtV15CloseFor61('.planning/ROADMAP.md')
```

Alternatively: remove the two named functions, retain two local `try { execFileSync(...) } catch { return null }` helpers with the path inlined — either approach works as long as the symbol names `readRequirementsAtV15Close` and `readRoadmapAtV15Close` are GONE (triggering V-68-10 which then needs to be fixed simultaneously per Landmine A).

#### check-phase-67.mjs — 2 inline readers (+ 1 JSON-parsing variant)

**`readCorpusFileAtV17Close(relPath)` — lines :35-44**
```javascript
function readCorpusFileAtV17Close(relPath) {
  try {
    return execFileSync('git', ['show', 'aa6de68:' + relPath],
      { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] })
      .replace(/\r\n/g, '\n');
    // HAS explicit stdio — stderr captured (matching readAtClose behavior)
  } catch (err) {
    return null;  // catch→null = SKIP
  }
}
```
**Replacement:** wrap `readAtV17Close(relPath)` with catch→null.

**`readSidecarAtV17Close()` — lines :50-57**
```javascript
function readSidecarAtV17Close() {
  try {
    const c = execFileSync('git', ['show', 'aa6de68:scripts/validation/v1.7-audit-allowlist.json'],
      { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(c);  // Returns parsed JSON object, NOT a string
  } catch (err) {
    return null;
  }
}
```
**Replacement:** wrap `readAtV17Close('scripts/validation/v1.7-audit-allowlist.json')` with catch→null, then JSON.parse the result if non-null.

#### check-phase-68.mjs — 2 inline readers

**`readMilestonesAtV17Close()` — lines :33-41**
```javascript
function readMilestonesAtV17Close() {
  try {
    return execFileSync('git', ['show', 'aa6de68:.planning/MILESTONES.md'],
      { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] })
      .replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```
**Replacement:** wrap `readAtV17Close('.planning/MILESTONES.md')` with catch→null.

**`readCorpusFileAtV17Close(relPath)` — lines :45-51**
```javascript
function readCorpusFileAtV17Close(relPath) {
  try {
    return execFileSync('git', ['show', 'aa6de68:' + relPath],
      { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] })
      .replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```
**Replacement:** wrap `readAtV17Close(relPath)` with catch→null.

#### check-phase-70.mjs — 8 inline readers

[VERIFIED: direct read of check-phase-70.mjs lines 40-112]

All 8 use `stdio: ['ignore', 'pipe', 'pipe']` and catch→return null.

| Function | Lines | SHA Used | Replacement |
|----------|-------|----------|-------------|
| `readCorpusFileAtV17Close(relPath)` | :40-46 | aa6de68 | `readAtV17Close(relPath)` + catch→null |
| `readMilestoneAuditAtV17Close()` | :49-55 | aa6de68 | `readAtV17Close('.planning/milestones/v1.7-MILESTONE-AUDIT.md')` + catch→null |
| `readDeferredCleanupAtV17Close()` | :58-63 | aa6de68 | `readAtV17Close('.planning/milestones/v1.7-DEFERRED-CLEANUP.md')` + catch→null |
| `readRequirementsAtV17Close()` | :67-73 | aa6de68 | `readAtV17Close('.planning/REQUIREMENTS.md')` + catch→null |
| `readRoadmapAtV17Close()` | :76-82 | aa6de68 | `readAtV17Close('.planning/ROADMAP.md')` + catch→null |
| `readStateAtV17Close()` | :86-91 | aa6de68 | `readAtV17Close('.planning/STATE.md')` + catch→null |
| `readProjectAtV17Close()` | :95-100 | aa6de68 | `readAtV17Close('.planning/PROJECT.md')` + catch→null |
| `readProjectAtV17CloseGate()` | :106-112 | **4df3a16** | `readAtV17CloseGate('.planning/PROJECT.md')` + catch→null |

**Note:** `readProjectAtV17CloseGate` uses the V17_CLOSEGATE SHA (4df3a16), NOT V17 (aa6de68). The convenience export `readAtV17CloseGate` in frozen-at-close.mjs handles this correctly.

**Total TOOL-02 inline readers:** 14 across 4 files. CONTEXT estimate of ~13 is one off — the discrepancy is likely the JSON-parsing `readSidecarAtV17Close` in check-phase-67, which could reasonably be excluded from a "string reader" count.

### TOOL-02 Adoption Pattern (for all sites except 61's Landmine C sites)

```javascript
// Standard adoption pattern — replaces inline reader
// Import at top of file (if not already imported):
import { readAtV17Close } from './_lib/frozen-at-close.mjs';

// Inline reader removal + call-site replacement:
// OLD: const content = readCorpusFileAtV17Close(relPath);
// NEW: 
function tryReadAtV17Close(relPath) {
  try { return readAtV17Close(relPath); } catch { return null; }
}
// Or inline the try/catch at each call site — either is acceptable per Claude's Discretion
```

---

## Landmine A — Exact Lines and Tolerant Fix

[VERIFIED: direct read of check-phase-68.mjs and check-phase-73.mjs]

### check-phase-68.mjs V-68-10 (lines 210-223) — CURRENT CODE

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

**Why this breaks:** `c.includes('readRequirementsAtV15Close')` returns false as soon as TOOL-02 removes the inline function definition from check-phase-61. V-68-10 flips FAIL. Because check-phase-68 runs check-phase-61 as part of its CHAIN, V-68-10 fails → check-phase-68 exits 1 → all downstream validators that chain-guard check-phase-68 also fail.

### check-phase-73.mjs reference pattern (lines 203-210) — TOLERANT OR MATCHER

```javascript
// CONVERT-61-17 check (tolerant OR: pass if either old OR new style is present)
if (!content.includes('readAtV15Close') && !content.includes('frozen-at-close')) {
  return { pass: false, detail: 'V-61-17 conversion: readAtV15Close import not found' };
}
```

### Required fix for check-phase-68.mjs V-68-10

Replace lines 215-222 (the AND-logic block) with OR-tolerant logic:

```javascript
// OLD (AND logic — breaks when inline symbols removed):
const hasReq = c.includes('readRequirementsAtV15Close');
const hasRoad = c.includes('readRoadmapAtV15Close');
if (!hasReq || !hasRoad) {
  return { pass: false, detail: 'readRequirementsAtV15Close=' + hasReq + '; readRoadmapAtV15Close=' + hasRoad };
}
return { pass: true, detail: 'both v1.5-frozen-aware helpers present in check-phase-61.mjs' };

// NEW (OR-tolerant — passes with both old inline symbols AND new centralized import):
const hasOldStyle = c.includes('readRequirementsAtV15Close') && c.includes('readRoadmapAtV15Close');
const hasNewStyle = c.includes('readAtV15Close') || c.includes('frozen-at-close');
if (!hasOldStyle && !hasNewStyle) {
  return { pass: false, detail: 'check-phase-61.mjs lacks v1.5-frozen-aware reader: neither inline symbols nor frozen-at-close import found' };
}
const mode = hasNewStyle ? 'centralized (frozen-at-close)' : 'inline (readRequirementsAtV15Close + readRoadmapAtV15Close)';
return { pass: true, detail: 'v1.5-frozen-aware reader present in check-phase-61.mjs [' + mode + ']' };
```

**Atomicity constraint:** This V-68-10 fix MUST be in the SAME commit that removes `readRequirementsAtV15Close` and `readRoadmapAtV15Close` from check-phase-61.mjs (Landmine A). No intermediate state where 61 has lost the symbols but 68 still uses AND logic.

---

## TOOL-03 — Exact Sites and Fix

[VERIFIED: direct grep `stderr\.slice\(0,\s*200\)` in scripts/validation/*.mjs]

### Site 1: check-phase-48.mjs lines :63-78

```javascript
// CURRENT (stderr-only):
try {
  execFileSync('node', ['scripts/validation/regenerate-supervision-pins.mjs', '--self-test'],
    { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
  return { pass: true };
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
}
```

### Site 2: check-phase-60.mjs lines :183-195

```javascript
// CURRENT (stderr-only):
try {
  execFileSync('node', [PIN_HELPER, '--self-test'],
    { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
  return { pass: true, detail: '--self-test exits 0' };
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
}
```

### Site 3: check-phase-61.mjs lines :397-409

```javascript
// CURRENT (stderr-only):
try {
  execFileSync('node', [PIN_HELPER, '--self-test'], { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
  return { pass: true, detail: '--self-test exits 0' };
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
}
```

### TOOL-03 Fix Pattern (applied to all 3 sites)

```javascript
// AFTER — captures both stdout + stderr:
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';  // ADD THIS
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: '--self-test FAIL: ' + (stdout + stderr).slice(0, 200) };  // CHANGE THIS
}
```

Note: these sites use `n=200` which is distinct from Variant A (500) and Variant C (300). If TOOL-01 is applied, these become `execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })`.

**`--self-test` discriminator:** The phrase `'--self-test FAIL: '` is the discriminator the CONTEXT refers to. The isMissing check (ENOENT / status 127 / 'not found' / 'Could not resolve') already uses stderr. Adding stdout capture to isMissing is safe since those signals only appear in stderr.

---

## exec-fail-detail.mjs API (D-04 Locked Design)

### Proposed Implementation

```javascript
// scripts/validation/_lib/exec-fail-detail.mjs
//
// Centralizes the (stdout + stderr).slice(0, N)[.trim()] failure-detail pattern
// across CHAIN/AUDIT/helper-spawn wrapper sites (TOOL-01: EXEC-FAIL-DETAIL-EXTRACTION-01).
//
// Usage:
//   import { execFailDetail } from './_lib/exec-fail-detail.mjs';
//   return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-N FAIL: ' }) };
//
// Per D-04: takes separate raw stdout/stderr (not an error object) so it works for both:
//   - Non-throwing spawn-result sites (result.stdout / result.stderr)
//   - catch-block TOOL-03 sites (err.stdout / err.stderr, now capturing both streams)
//
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
```

### Variant-to-Call Mapping

| Variant | `n` | `trim` | `prefix` | Example call |
|---------|-----|--------|----------|--------------|
| A (CHAIN) | 500 | true | `'check-phase-' + phaseNum + ' FAIL: '` | `execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' })` |
| B (harness in 60,61) | 500 | true | `'harness FAIL: '` | `execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'harness FAIL: ' })` |
| C (harness in 62-100) | 300 | false | `'harness FAIL: '` | `execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' })` |
| TOOL-03 (`--self-test`) | 200 | false | `'--self-test FAIL: '` | `execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })` |

### Helper Self-Test (mandatory per D-04)

The helper file should include a self-test block invoked by `--self-test` or exposed as `execSelfTest()`:

```javascript
// Minimal inline self-test (can be invoked separately or via if (import.meta.url ...))
export function selfTest() {
  const assert = (actual, expected, label) => {
    if (actual !== expected) throw new Error(`selfTest FAIL [${label}]: expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
  };
  // Variant A: n=500, trim=true
  assert(execFailDetail('abc', 'def', { n: 500, trim: true, prefix: 'X FAIL: ' }), 'X FAIL: abcdef', 'A-basic');
  assert(execFailDetail('  ab', '  cd  ', { n: 500, trim: true, prefix: 'P: ' }), 'P: ab  cd', 'A-trim');
  // Variant C: n=300, trim=false
  assert(execFailDetail('abc', 'def', { n: 300, trim: false, prefix: 'harness FAIL: ' }), 'harness FAIL: abcdef', 'C-basic');
  assert(execFailDetail('  ab', '  cd  ', { n: 300, trim: false, prefix: 'H: ' }), 'H:   ab  cd  ', 'C-no-trim');
  // Slice at n
  assert(execFailDetail('12345', '67890', { n: 7, trim: false, prefix: '' }), '1234567', 'slice-n');
  return 'execFailDetail selfTest: all assertions passed';
}
```

---

## Verification: How to Run Full Chain and Force Failure Path

[VERIFIED: check-phase-100.mjs runner loop lines 161-185, NESTED env var, CHECK_PHASE_NESTED]

### Runner Detail Rendering Logic (check-phase-100.mjs:174)

```javascript
const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
```

Detail strings render when: (1) VERBOSE flag present, (2) check failed, or (3) check skipped. On a green chain (`node scripts/validation/check-phase-100.mjs`), zero detail strings render for PASS results. This is why D-03 mandates VERBOSE or forced-failure for byte-equivalence verification.

### Full Chain Verification Command

```bash
# Run from repo root (D:\claude\Autopilot)
node scripts/validation/check-phase-100.mjs [--verbose]
```

`check-phase-100.mjs` is the current chain apex: CHAIN_PHASES=[48..99] (52 entries). This validator runs all existing validators including check-phase-{61,67,68,70} which are TOOL-02 targets, and check-phase-{48,60,61} which are TOOL-03 targets.

### NESTED Env Var

```bash
CHECK_PHASE_NESTED=1  # Set on subprocess invocations to short-circuit recursive chain expansion
```

When `CHECK_PHASE_NESTED=1`, all chain-guard checks return `{ pass: true, skipped: true, detail: 'nested invocation...' }`. This prevents O(n^2) recursion on Windows. Set this when running specific validators directly during development:

```bash
# Run a single validator without triggering its full sub-chain:
CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-68.mjs --verbose
```

### D-03 Verification Protocol

```bash
# Step 1: Capture before-refactor baseline with VERBOSE (shows all detail strings)
node scripts/validation/check-phase-100.mjs --verbose > /tmp/before-111.txt 2>&1

# Step 2: Apply refactor commits

# Step 3: Capture after-refactor output
node scripts/validation/check-phase-100.mjs --verbose > /tmp/after-111.txt 2>&1

# Step 4: Assert identical
diff /tmp/before-111.txt /tmp/after-111.txt
# Expected: no output (empty diff)

# Step 5: Force failure to test detail strings on failure path
# Option A — inject bad SHA temporarily in frozen-at-close.mjs, run, restore
# Option B — run a specific failing case: corrupt a temp file and run a specific check
# Option C — run a single validator with an injected failure condition

# Step 6: Test SKIP preservation (Landmine B) — confirm null-return on bad SHA
# Temporarily change one MILESTONE_CLOSE_SHAS entry to a nonexistent SHA,
# run the affected validator, verify SKIPPED (not FAILED) is returned for that check.
```

---

## Architecture Patterns

### Existing Pattern: CHAIN Wrapper (Variant A)

This is the canonical template found in every check-phase-62+ CHAIN section:

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

The isMissing branch is the SKIP-vs-FAIL verdict logic — this MUST NOT be folded into exec-fail-detail (per CONTEXT constraint 4).

### Existing Pattern: AUDIT Wrapper (Variant C)

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

Identical structure to Variant A but N=300 and no .trim() at the end.

### After TOOL-01 (Variant A becomes)

```javascript
  return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' }) };
```

### After TOOL-01 (Variant C becomes)

```javascript
  return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
```

---

## Common Pitfalls

### Pitfall 1: Forgetting Variant B is N=500+trim (not N=300 like other harness sites)

**What goes wrong:** Treating all `harness FAIL:` sites as Variant C (N=300, no-trim) and changing check-phase-60.mjs:254 and check-phase-61.mjs:389 incorrectly.
**Why it happens:** The pattern name `harness FAIL:` appears in both Variant B and Variant C. Variant B is ONLY in files 60 and 61.
**How to avoid:** Use the exact site inventory table above. Variant B: only :254 in 60 and :389 in 61.

### Pitfall 2: "One N per file" assumption

**What goes wrong:** Applying N=500 to both sites in check-phase-73 or check-phase-100 (which have Variant A at N=500 AND Variant C at N=300).
**Why it happens:** Most files have two sites of different variants, so there is no single N per file.
**How to avoid:** Per D-02 and CONTEXT constraint 5: N is per-call-site, not per-file.

### Pitfall 3: Folding isMissing into exec-fail-detail

**What goes wrong:** Passing the isMissing branch logic into the helper, changing the SKIP-vs-FAIL verdict.
**Why it happens:** It looks like a natural DRY extension.
**How to avoid:** exec-fail-detail is a DETAIL-STRING helper only. The verdict (PASS/FAIL/SKIP) remains in the call site.

### Pitfall 4: Removing inline reader symbols from check-phase-61 without simultaneously fixing V-68-10

**What goes wrong:** check-phase-68 V-68-10 asserts `c.includes('readRequirementsAtV15Close')` — this flips FAIL immediately. Because check-phase-68 is in CHAIN_PHASES of check-phase-70, 73, 100, the entire chain fails.
**Why it happens:** V-68-10 was authored to assert the inline symbols exist (as a regression guard).
**How to avoid:** Landmine A — the two changes MUST land in one atomic commit. See the V-68-10 fix above.

### Pitfall 5: Wrapping readAtClose with catch→null then calling it directly without the wrapper in check-phase-61

**What goes wrong:** Using `readAtV15Close(path)` raw (without catch) in check-phase-61 throws when git show fails — instead of returning null (SKIP), the check throws an unhandled exception, rendering as a FAIL with a generic "Unexpected error" detail.
**Why it happens:** The `readAtClose` API throws by design; the catch→null is the caller's responsibility.
**How to avoid:** Always wrap `readAtClose` calls (or convenience wrappers) in try/catch→return null at adoption sites.

### Pitfall 6: Adopting readAtClose in check-phase-61 changes stderr behavior (Landmine C)

**What goes wrong:** The check-phase-61 inline readers have no explicit stdio option, meaning git error output reaches the parent process's stderr. `readAtClose` uses `stdio:['ignore','pipe','pipe']`, suppressing that stderr. This is a behavior change the suite tests for.
**Why it happens:** The CONTEXT says "the suite treats the stderr leak as significant." The test suite's behavior changes, potentially breaking something in the verification harness.
**How to avoid:** For check-phase-61 specifically, maintain the no-stdio git show call in the wrapper, even after adopting the centralized pattern conceptually.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frozen git-ref file reading | Inline `execFileSync('git', ['show', sha + ':' + path])` | `readAtClose` / convenience exports from `_lib/frozen-at-close.mjs` | Already handles CRLF normalization, timeout, stdio; 10+ SHAs already mapped |
| Detail string construction | Custom concatenation per site | `execFailDetail` from the new `_lib/exec-fail-detail.mjs` | Centralizes the 3-axis variation (N, trim, prefix) |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (node) | All validators | Assumed (graceful-skip if absent) | Unknown | Validators SKIP (not FAIL) if node absent |
| git | frozen-at-close.mjs readAtClose | Assumed (git repo present) | Unknown | Validators SKIP via catch→null |
| `_lib/frozen-at-close.mjs` | TOOL-02 adoption | ✓ | Current (with V141..V112 SHAs) | N/A — file already exists |
| `_lib/archive-path.mjs` | check-phase-{48,60,73,100} | ✓ | Current | N/A — file already exists |

Step 2.6: No new external CLI tools required. All tooling is Node.js ESM modules invoked directly.

---

## Security Domain

This phase is a pure internal code refactoring with no external inputs, no user-supplied data, no network calls, and no new trust boundaries. The validators run in a local developer/CI environment reading repo-internal files.

ASVS categories: V5 Input Validation — not applicable (no external inputs). V6 Cryptography — not applicable. All other categories — not applicable.

The only security-adjacent concern is the `--self-test` discriminator: the fix adds stdout capture to the catch block, which could theoretically expose more subprocess output. This is within the existing validator trust model (the subprocess is `regenerate-supervision-pins.mjs`, a repo-internal script).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | check-phase-{69,71,72,74,75-81,83-87,89-92,94,96-99} follow the same Variant A + Variant C pattern as check-phase-82/88/93/95/100 | Site inventory (not exhaustively verified for every file in 69-99 range beyond those listed) | Additional sites not in the inventory — but the grep was comprehensive |
| A2 | `readProjectAtV17CloseGate` in check-phase-70 maps to `readAtV17CloseGate` in frozen-at-close.mjs | TOOL-02 table | Wrong mapping would break V-70-24 behavior |
| A3 | The TOOL-03 `--self-test` discriminator never writes anything to stdout in the success path | TOOL-03 fix rationale | Capturing stdout on success changes no behavior (stdout is empty) |

All A1 claims are based on direct grep output which covered all files in the directory — no unverified assumptions.

---

## Open Questions (RESOLVED)

1. **check-phase-61 Landmine C — exact preservation approach**
   - What we know: check-phase-61's inline readers omit stdio; `readAtClose` uses explicit stdio. These are behaviorally different.
   - What's unclear: Does the plan use (a) a local wrapper that preserves the no-stdio call, or (b) inline the try/catch+no-stdio pattern at each of the 2 call sites? Both preserve the behavior.
   - RESOLVED: Plan uses approach (a) — a local `readAtV15CloseFor61(relPath)` wrapper that preserves the no-stdio git call (per PATTERNS.md; Task 3). Satisfies Landmine A + Landmine C simultaneously without leaking stderr behavior change.

2. **TOOL-02 inline reader count discrepancy (14 found vs ~13 estimated)**
   - What we know: 14 function definitions found across 4 files.
   - What's unclear: Which one the CONTEXT was treating differently.
   - RESOLVED: Implement all 14 replacements (must_haves truth 3). The ~13 CONTEXT estimate omitted check-phase-67's JSON-parsing `readSidecarAtV17Close`; it does not gate execution.

3. **exec-fail-detail.mjs self-test invocation mechanism**
   - What we know: D-04 says "a helper self-test asserts each variant's exact bytes."
   - What's unclear: Whether the self-test is invoked via `--self-test` CLI flag (matching the existing `regenerate-supervision-pins.mjs` pattern) or via `if (import.meta.url === new URL(import.meta.url).href)` or exported as `selfTest()`.
   - RESOLVED: Export `selfTest()` AND guard direct invocation via `argv.includes('--self-test')` (Task 1), matching the existing `regenerate-supervision-pins.mjs` self-test convention.

---

## Sources

### Primary (HIGH confidence — direct codebase inspection)
- `scripts/validation/_lib/frozen-at-close.mjs` — full read: API, SHAs, exports
- `scripts/validation/check-phase-{48,60,61,67,68,70,73,82,100}.mjs` — full read: exact line numbers, code patterns
- grep `(stdout + stderr)\.slice\(0,` — 40 exact hits across 20 files
- grep `stderr\.slice\(0,\s*200\)` — 3 exact TOOL-03 sites
- `.planning/phases/111-pillar-d-chain-validator-tooling-refactors/111-CONTEXT.md` — locked decisions, landmines
- `.planning/config.json` — `nyquist_validation: false`, `use_worktrees: false`

### Secondary (HIGH confidence — project planning docs)
- `.planning/REQUIREMENTS.md` — TOOL-01/02/03 requirements
- `.planning/ROADMAP.md` — Phase 111 success criteria

---

## Metadata

**Confidence breakdown:**
- Site inventory (TOOL-01): HIGH — direct grep, 40 exact hits
- Inline reader signatures (TOOL-02): HIGH — direct read of all 4 files
- Landmine A fix code: HIGH — exact lines quoted from check-phase-68.mjs
- TOOL-03 fix pattern: HIGH — exact lines quoted from all 3 files
- exec-fail-detail.mjs API: HIGH — derived directly from D-04 locked decision
- Runner/verification commands: HIGH — direct read of check-phase-100.mjs runner loop

**Research date:** 2026-07-01
**Valid until:** This research is code-state-pinned — valid until any of the listed files are modified. No time-based expiry.
