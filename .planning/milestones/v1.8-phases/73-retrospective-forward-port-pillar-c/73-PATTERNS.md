# Phase 73: Retrospective Forward-Port (Pillar C) - Pattern Map

**Mapped:** 2026-06-08
**Files analyzed:** 14 (3 NEW + 8 MODIFIED wrapper sites + 2 NEW markdown deliverables + 1 MODIFIED chain-apex)
**Analogs found:** 14 / 14

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/_lib/frozen-at-close.mjs` | utility | request-response (git subprocess) | `scripts/validation/_lib/archive-path.mjs` | role-match + `check-phase-67.mjs:35-55` for signature |
| `scripts/validation/check-phase-73.mjs` | validator (chain-apex) | request-response (subprocess chain) | `scripts/validation/check-phase-72.mjs` | exact (Path-A) |
| `scripts/validation/check-phase-60.mjs` (lines 230, 248) | validator | request-response | `scripts/validation/check-phase-66.mjs:313` (Phase 72 fixed) | exact (wrapper fix pattern) |
| `scripts/validation/check-phase-61.mjs` (lines 368, 386) | validator | request-response | `scripts/validation/check-phase-66.mjs:313` + `check-phase-67.mjs:273` | exact (wrapper fix pattern) |
| `scripts/validation/check-phase-62.mjs` (line 316) | validator | request-response | `scripts/validation/check-phase-66.mjs:313` | exact (wrapper fix pattern) |
| `scripts/validation/check-phase-63.mjs` (line 321) | validator | request-response | `scripts/validation/check-phase-66.mjs:313` | exact (wrapper fix pattern) |
| `scripts/validation/check-phase-64.mjs` (line 306) | validator | request-response | `scripts/validation/check-phase-66.mjs:313` | exact (wrapper fix pattern) |
| `scripts/validation/check-phase-65.mjs` (line 294) | validator | request-response | `scripts/validation/check-phase-66.mjs:313` | exact (wrapper fix pattern) |
| `check-phase-61.mjs` V-61-17..20 conversion (RETRO-02) | validator | request-response (git frozen-read) | `check-phase-61.mjs:38-62` (v1.5 inline helpers, consumption pattern) | exact (frozen-read + suffix convention) |
| `check-phase-67.mjs` V-67-05/06 conversion (RETRO-02) | validator | request-response (git frozen-read) | `check-phase-67.mjs:35-55` (v1.7 inline helpers) | exact (same file; wrong-SHA fix) |
| `check-phase-{53,54,56,...}.mjs` (RETRO-02 candidates) | validator | request-response (git frozen-read) | `check-phase-61.mjs:78-166` (consumption call-site pattern) | role-match |
| `.planning/phases/73-.../73-RETRO-INVENTORY.md` | artifact (markdown table) | batch (RETRO-01 scan output) | `.planning/phases/72-.../72-VERIFICATION.md` Section E (lines 221-253) | exact (same table structure scaled from 17 to 19 rows) |
| `.planning/phases/73-.../73-VERIFICATION.md` | artifact (close-gate) | batch (evidence + traceability) | `.planning/phases/72-.../72-VERIFICATION.md` | exact (Sections A-H shape) |
| `check-phase-73.mjs` V-73-CONVERT-NN grow (Plan 73-02) | validator | request-response | `check-phase-72.mjs:62-103` (V-72-WRAPPER-01..07 parameterized assertion pattern) | role-match |

---

## Pattern Assignments

### `scripts/validation/_lib/frozen-at-close.mjs` (NEW — utility, git subprocess)

**Primary analog:** `scripts/validation/_lib/archive-path.mjs` (module shape + ESM export pattern)
**Signature analog:** `scripts/validation/check-phase-67.mjs` lines 35-43 (v1.7-family hardened `execFileSync` call)
**Secondary analog:** `scripts/validation/check-phase-70.mjs` lines 40-82 (4-helper expansion pattern showing full convenience-export set)

**Module shape pattern** (`_lib/archive-path.mjs` lines 1-30 — 30-LOC ESM module with named exports, no default export, docstring at top):
```javascript
// scripts/validation/_lib/archive-path.mjs
// [docstring explaining purpose, lineage, and caller semantics]
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases']) {
  // ...
  return null;
}
```

**v1.7-family hardened signature** (`check-phase-67.mjs` lines 35-43 — the pattern `_lib/frozen-at-close.mjs` adopts verbatim):
```javascript
function readCorpusFileAtV17Close(relPath) {
  try {
    return execFileSync('git', ['show', 'aa6de68:' + relPath], {
      encoding: 'utf8',
      timeout: 10000,
      stdio: ['ignore', 'pipe', 'pipe'],
    }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```

**Multi-helper convenience-export expansion** (`check-phase-70.mjs` lines 40-82 — shows the full 4-helper pattern; `frozen-at-close.mjs` adopts same export shape):
```javascript
function readCorpusFileAtV17Close(relPath) { ... }        // generic reader
function readMilestoneAuditAtV17Close() { ... }           // path-specific convenience
function readDeferredCleanupAtV17Close() { ... }          // path-specific convenience
function readRequirementsAtV17Close() { ... }             // path-specific convenience
function readRoadmapAtV17Close() { ... }                  // path-specific convenience
```

**Full drop-in module content** (CONTEXT.md lines 134-186 — fully specified; copy verbatim):
```javascript
// scripts/validation/_lib/frozen-at-close.mjs
// [HYBRID STATUS docstring per D-02 spec]
import { execFileSync } from 'node:child_process';

export const MILESTONE_CLOSE_SHAS = {
  V141: '5c976ec',  // Phase 47 close 2026-04-25
  V15:  'ba2cbc0',  // Phase 61 close — canonical
  V16:  '9d8877c',  // Phase 66 close 2026-05-25 (v1.6 has NO git tag)
  V17:  'aa6de68',  // Phase 70 Plan 70-02 Atom 1 — canonical
};

export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8',
    timeout: 10000,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\r\n/g, '\n');
}

export const readAtV141Close = (p) => readAtClose('V141', p);
export const readAtV15Close  = (p) => readAtClose('V15',  p);
export const readAtV16Close  = (p) => readAtClose('V16',  p);
export const readAtV17Close  = (p) => readAtClose('V17',  p);
```

**Key constraint:** Do NOT add `stdio: ['ignore', 'pipe', 'pipe']` to the existing v1.5-family inline helpers in `check-phase-61.mjs:38-62` — those are byte-unchanged per D-02. Only the NEW module uses the hardened signature.

---

### `scripts/validation/check-phase-73.mjs` (NEW — validator, chain-apex)

**Analog:** `scripts/validation/check-phase-72.mjs` (Path-A source, read in full above)

**Imports pattern** (`check-phase-72.mjs` lines 33-36 — copy verbatim):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

**readFile helper + VERBOSE flag** (`check-phase-72.mjs` lines 38-45 — copy verbatim):
```javascript
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**CHAIN_PHASES + CHAIN_SKIP topology** (`check-phase-72.mjs` lines 49-53 — adapt by extending CHAIN_PHASES to include 72):
```javascript
// check-phase-73.mjs extends chain through Phase 72
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72];
const CHAIN_SKIP = new Set([]);  // Phase 68 7b635ca invariant — MUST remain empty
```

**Phase-73-specific constants** (RESEARCH.md Pattern 3 lines 291-300):
```javascript
const FIXED_FILES_RETRO_02 = [60, 61, 62, 63, 64, 65]; // D-01 LOCKED: 6 CHAIN wrapper fold-in sites
const AUDIT_FIXED_FILES = [60, 61];                     // D-01 LOCKED: 2 AUDIT wrapper fold-in sites

// Empirically-correct 400-char gap (72-VERIFICATION.md Section F finding; check-phase-71 had 258-char gap)
const CHAIN_WRAPPER_ANCHOR = /execFileSync\('node',[\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;

// AUDIT wrapper anchor: anchored to [auditPath] to distinguish from CHAIN wrapper (Pitfall 2 guard)
const AUDIT_WRAPPER_ANCHOR = /execFileSync\('node',\s*\[auditPath\][\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;
```

**V-73-INVENTORY assertion** (RESEARCH.md Pattern 3 lines 303-317 — heading-presence + row count):
```javascript
{
  id: 'INVENTORY',
  name: 'V-73-INVENTORY: 73-RETRO-INVENTORY.md exists and contains per-validator class-signature table',
  run() {
    const c = readFile('.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md');
    if (c === null) return { pass: false, detail: '73-RETRO-INVENTORY.md missing' };
    if (!c.includes('check-phase-')) return { pass: false, detail: 'no per-validator table rows found' };
    const rowCount = (c.match(/\| check-phase-/g) || []).length;
    if (rowCount < 19) return { pass: false, detail: `only ${rowCount}/19 validator rows found` };
    return { pass: true, detail: `${rowCount} validator rows present in 73-RETRO-INVENTORY.md` };
  }
}
```
Analog: `check-phase-72.mjs` lines 107-119 (V-72-AUDIT-VERIFY heading-presence pattern — SKIP-PASS until artifact exists).

**V-72-AUDIT-VERIFY analog** for V-73-AUDIT (`check-phase-72.mjs` lines 108-119):
```javascript
checks.push({
  id: 'AUDIT-VERIFY',
  name: 'V-72-AUDIT-VERIFY: 72-VERIFICATION.md exists and contains Per-Validator Audit Inventory heading',
  run() {
    const verif = readFile('.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '72-VERIFICATION.md not yet authored (PASS-via-skip until Plan 72-02 lands)' };
    if (!/Per-Validator Audit Inventory/i.test(verif)) {
      return { pass: false, detail: '72-VERIFICATION.md missing "Per-Validator Audit Inventory" section heading' };
    }
    return { pass: true, detail: '72-VERIFICATION.md exists with Per-Validator Audit Inventory section' };
  }
});
```
V-73-AUDIT mirrors this: SKIP-PASS until 73-VERIFICATION.md exists, then heading-presence check.

**V-72-WRAPPER-NEG analog** for V-73-WRAPPER-NEG and V-73-AUDIT-WRAPPER-NEG (`check-phase-72.mjs` lines 81-104):
```javascript
checks.push({
  id: 'WRAPPER-NEG',
  name: 'V-72-WRAPPER-NEG: zero stderr-only CHAIN wrappers remain across FIXED_FILES',
  run() {
    const stderrOnly = [];
    FIXED_FILES.forEach((phaseNum) => {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return;
      const matches = [...content.matchAll(CHAIN_WRAPPER_ANCHOR)];
      matches.forEach((m, idx) => {
        const hasStderr = /err\.stderr/.test(m[1]);
        const hasStdout = /err\.stdout/.test(m[1]);
        if (hasStderr && !hasStdout) {
          stderrOnly.push({ file: `check-phase-${phaseNum}.mjs`, occurrence: idx + 1 });
        }
      });
    });
    if (stderrOnly.length > 0) {
      return { pass: false, detail: `${stderrOnly.length} stderr-only CHAIN wrapper(s) remain: ${JSON.stringify(stderrOnly)}` };
    }
    return { pass: true, detail: `0 stderr-only CHAIN wrappers across ${FIXED_FILES.length} FIXED_FILES (whole-file class signature satisfied)` };
  }
});
```
V-73-WRAPPER-NEG uses `FIXED_FILES_RETRO_02` + `CHAIN_WRAPPER_ANCHOR`. V-73-AUDIT-WRAPPER-NEG replaces those with `AUDIT_FIXED_FILES` + `AUDIT_WRAPPER_ANCHOR`.

**CHAIN regression-guard wrapper** (`check-phase-72.mjs` lines 126-161 — copy verbatim, adapting `phaseNum >= 67` isPeer threshold):
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-73-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      const isPeer = phaseNum >= 67;
      const subTimeout = isPeer ? 600000 : 300000;
      const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };
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
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
      }
    }
  });
}
```
**Critical:** The catch block MUST include both `err.stdout` AND `err.stderr` (this is the Phase 72 fix; check-phase-73.mjs self-dogfoods the corrected pattern from inception).

**V-72-AUDIT analog** for V-73-AUDIT-HARNESS (`check-phase-72.mjs` lines 163-183):
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-72-AUDIT: v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.7 harness exits 0 (predecessor-byte-unchanged invariant preserved)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
  }
});
```

**V-72-SELF analog** for V-73-SELF (`check-phase-72.mjs` lines 185-198):
```javascript
checks.push({
  id: 'SELF',
  name: 'V-73-SELF: CHAIN_PHASES does NOT include 73; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(73)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 73 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (73 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

**Runner loop** (`check-phase-72.mjs` lines 201-228 — copy verbatim, changing `check-phase-72` banner to `check-phase-73`):
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-73 -- Phase 73 deliverables (Retrospective Forward-Port Pillar C)\n');
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  // ... PASS / FAIL / SKIPPED branches verbatim from check-phase-72.mjs lines 214-224
}
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```

**V-73-LIB-EXISTS assertion** (RESEARCH.md Pattern 3 lines 320-342 — source-text presence check):
```javascript
{
  id: 'LIB-EXISTS',
  name: 'V-73-LIB-EXISTS: _lib/frozen-at-close.mjs exists and exports MILESTONE_CLOSE_SHAS + readAtV{141,15,16,17}Close',
  run() {
    const c = readFile('scripts/validation/_lib/frozen-at-close.mjs');
    if (c === null) return { pass: false, detail: '_lib/frozen-at-close.mjs missing' };
    const issues = [];
    if (!c.includes('MILESTONE_CLOSE_SHAS')) issues.push('MILESTONE_CLOSE_SHAS not found');
    if (!c.includes("V141:")) issues.push("V141 key missing");
    if (!c.includes("V15:"))  issues.push("V15 key missing");
    if (!c.includes("V16:"))  issues.push("V16 key missing");
    if (!c.includes("V17:"))  issues.push("V17 key missing");
    if (!c.includes('readAtV141Close')) issues.push('readAtV141Close not exported');
    if (!c.includes('readAtV15Close'))  issues.push('readAtV15Close not exported');
    if (!c.includes('readAtV16Close'))  issues.push('readAtV16Close not exported');
    if (!c.includes('readAtV17Close'))  issues.push('readAtV17Close not exported');
    if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
    return { pass: true, detail: 'MILESTONE_CLOSE_SHAS + 4 convenience exports present' };
  }
}
```

**V-73-CONVERT-NN stub in Plan 73-01** (CONTEXT.md lines 302-303 — ships as empty placeholder, grows in Plan 73-02):
```javascript
// V-73-CONVERT-* assertions grow in Plan 73-02 as each HEAD-coupled assertion is converted.
// Each entry asserts: (1) the file imports readAtV{15,16,17}Close from _lib/frozen-at-close.mjs,
//                    (2) the validator name contains the [v1.X-frozen @ <SHA>] suffix.
// [ stub — will be replaced with per-assertion entries in Plan 73-02 atomic commit ]
```

---

### `check-phase-{60,61,62,63,64,65}.mjs` — CHAIN wrapper fix (Plan 73-01 Wave 2)

**Analog:** `scripts/validation/check-phase-66.mjs` (Phase 72 Plan 72-01 `d374095` fix, now fixed), specifically the BEFORE→AFTER pattern documented in `72-VERIFICATION.md` Section B.

**Exact edit target (current BEFORE state, verified at HEAD):**

`check-phase-60.mjs` line 230 (CHAIN), verified at lines 226-234:
```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

`check-phase-62.mjs` line 316 (CHAIN), verified at lines 315-321 — identical pattern:
```javascript
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

`check-phase-60.mjs` line 248 (AUDIT — V-60-23), verified at lines 247-253:
```javascript
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + stderr.slice(0, 200) };
    }
```

`check-phase-61.mjs` line 368 (CHAIN), verified at lines 367-372 — same pattern as above.
`check-phase-61.mjs` line 386 (AUDIT — V-61-33), verified at lines 385-390 — same AUDIT pattern.

**Uniform AFTER state** (CONTEXT.md lines 107-116 + RESEARCH.md Pattern 4 lines 439-447):

For all 6 CHAIN wrapper sites (`check-phase-{60,61,62,63,64,65}.mjs`):
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

For both AUDIT wrapper sites (`check-phase-{60,61}.mjs`):
```javascript
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
    }
```

**Two additions per catch block:** (1) add `const stdout = err.stdout ? err.stdout.toString() : '';` after the `stderr` line; (2) replace `stderr.slice(0, 200)` with `(stdout + stderr).slice(0, 500).trim()`.

**Do NOT touch:** `check-phase-48.mjs:72`, `check-phase-60.mjs:188`, `check-phase-61.mjs:403` — these are helper-spawn sites, deferred to v1.9+ per D-01 carve-out.

---

### RETRO-02 per-assertion conversion pattern (Plan 73-02)

**Analog:** `check-phase-61.mjs` lines 38-166 (inline frozen-aware helper definition + consumption call-sites)

**Import pattern to add at top of each converted file:**
```javascript
import { readAtV15Close } from './_lib/frozen-at-close.mjs';   // for v1.5-close-state assertions
import { readAtV16Close } from './_lib/frozen-at-close.mjs';   // for v1.6-close-state assertions
import { readAtV17Close } from './_lib/frozen-at-close.mjs';   // for v1.7-close-state assertions
```
Or combined: `import { readAtV15Close, readAtV16Close, readAtV17Close } from './_lib/frozen-at-close.mjs';`

**Consumption pattern** (`check-phase-61.mjs` lines 83-93 — v1.5-frozen REQUIREMENTS assertion call-site):
```javascript
run() {
  const c = readRequirementsAtV15Close();         // BEFORE: inline helper call
  // AFTER: const c = readAtV15Close('.planning/REQUIREMENTS.md');
  if (c === null) return { pass: false, detail: 'could not read REQUIREMENTS.md at v1.5-close ba2cbc0' };
  // ... assertion logic ...
  return { pass: true, detail: '... (v1.5-frozen @ ba2cbc0)' };
}
```

**V-61-17 specific conversion** (RESEARCH.md Pattern 2 lines 256-273):
```javascript
// BEFORE (HEAD-coupled — check-phase-61.mjs around line 289):
const c = readFile(MILESTONES_DOC);
if (c === null) return { pass: false, detail: 'MILESTONES.md missing' };
const h2s = c.match(/^## .+$/gm);
if (!h2s[0].includes('v1.5')) return { pass: false, detail: 'top H2 is not v1.5: ' + h2s[0] };
return { pass: true, detail: 'top H2: ' + h2s[0] };

// AFTER (frozen-aware, V15 target):
const c = readAtV15Close('.planning/MILESTONES.md');
const h2s = c.match(/^## .+$/gm);
if (!h2s || h2s.length === 0) return { pass: false, detail: 'no ## H2 entries [v1.5-frozen @ ba2cbc0]' };
if (!h2s[0].includes('v1.5')) return { pass: false, detail: 'top H2 is not v1.5: ' + h2s[0] + ' [v1.5-frozen @ ba2cbc0]' };
return { pass: true, detail: 'top H2: ' + h2s[0] + ' [v1.5-frozen @ ba2cbc0]' };
```

**Check-name suffix convention** (`check-phase-61.mjs` line 83 precedent — mandatory per D-03):
```javascript
// BEFORE: id: 1, name: "V-61-01: REQUIREMENTS.md active-section has zero unchecked [ ] reqs ..."
// AFTER:  id: 1, name: "V-61-01: REQUIREMENTS.md active-section has zero unchecked [ ] reqs ... [v1.5-frozen @ ba2cbc0]"
//
// Pattern from check-phase-67.mjs line 73:  name: 'V-67-01: ... [v1.7-frozen @ aa6de68]'
// Pattern from check-phase-61.mjs line 83:  name: "V-61-01: ... [v1.5-frozen @ ba2cbc0]"
```

**V-67-05/06 COMPLEX_CONVERSION note** (RESEARCH.md V-67-05/06 section lines 579-586):
- These already use `readCorpusFileAtV17Close()` with SHA `aa6de68` but assert content authored at `4df3a16`
- Plan 73-02 executor must run `git show aa6de68:docs/...` vs `git show 4df3a16:docs/...` to determine correct SHA
- May need a `V17_CLOSEGATE: '4df3a16'` entry in `MILESTONE_CLOSE_SHAS` if content only resolves at the true close-gate SHA
- Flag as COMPLEX_CONVERSION in RETRO-INVENTORY.md before modifying

**V-73-CONVERT-NN assertion shape** (RESEARCH.md Pattern 3 lines 408-423 — one per converted assertion, grown in Plan 73-02):
```javascript
{
  id: 'CONVERT-61-17',
  name: 'V-73-CONVERT-61-17: check-phase-61.mjs V-61-17 imports readAtV15Close and has v1.5-frozen suffix',
  run() {
    const content = readFile('scripts/validation/check-phase-61.mjs');
    if (!content) return { pass: false, detail: 'check-phase-61.mjs not found' };
    if (!content.includes('readAtV15Close') && !content.includes('frozen-at-close')) {
      return { pass: false, detail: 'V-61-17 conversion: readAtV15Close import not found' };
    }
    if (!content.includes('[v1.5-frozen @ ba2cbc0]') || !content.match(/V-61-17.*v1\.5-frozen/)) {
      return { pass: false, detail: 'V-61-17: [v1.5-frozen @ ba2cbc0] suffix missing from check name' };
    }
    return { pass: true, detail: 'V-61-17 frozen-aware conversion confirmed (readAtV15Close + suffix)' };
  }
}
```

---

### `.planning/phases/73-.../73-RETRO-INVENTORY.md` (NEW — Plan 73-01 markdown artifact)

**Analog:** `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md` Section E (lines 221-253)

**Table shape** (72-VERIFICATION.md Section E, lines 227-246 — scale from 17-18 rows to 19 rows for check-phase-{48..66}.mjs):
```markdown
## Section E — Per-Validator Audit Inventory

| Validator | Line | Wrapper class | Pre-fix capture | Post-fix disposition |
|-----------|------|---------------|-----------------|----------------------|
| check-phase-66.mjs | 313 | CHAIN | stderr-only | **FIXED in Plan 72-01** |
...
```

**73-RETRO-INVENTORY.md adapted table schema** (CONTEXT.md lines 40-41 + D-03 A-md spec):
```markdown
# Phase 73 — RETRO-01 Class-Signature Inventory

**Captured:** [date]
**Scope:** check-phase-{48..66}.mjs (19 validators)
**Purpose:** Plan 73-02 source-of-truth for RETRO-02 HEAD-coupled assertion conversion

| Validator | HEAD-coupled assertion IDs | Citation evidence (docstring/name) | Conversion target SHA | Disposition |
|-----------|---------------------------|------------------------------------|-----------------------|-------------|
| check-phase-48.mjs | — | — | — | NO_HEAD_COUPLING |
| check-phase-61.mjs | V-61-17..20 | `readFile(MILESTONES_DOC)` + "v1.5" in names | V15 = ba2cbc0 | CONVERT_PLAN_73_02 |
| check-phase-67.mjs | V-67-05/06 | wrong frozen-SHA (see COMPLEX_CONVERSION) | TBD (aa6de68 vs 4df3a16) | CONVERT_PLAN_73_02 (COMPLEX) |
...
```

**Disposition values** (RESEARCH.md Step 2 lines 545-550):
- `CONVERT_PLAN_73_02` — has HEAD-coupled assertion citing milestone-close state
- `ALREADY_FROZEN_AWARE` — already uses frozen-aware helpers (byte-unchanged)
- `NO_HEAD_COUPLING` — has readFile calls but no milestone-close-state semantic coupling
- `SCOPE_GAP_DEFERRED_V19` — has HEAD-coupling but trips anti-ballooning guardrail (>12 candidates)

**V-73-INVENTORY assertion target:** The table MUST contain `| check-phase-` strings (19+ rows) and the heading `RETRO-01 Class-Signature Inventory` (or equivalent checked by the row-count regex in V-73-INVENTORY).

---

### `.planning/phases/73-.../73-VERIFICATION.md` (NEW — Plan 73-03 close-gate)

**Analog:** `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md` (full file structure)

**Frontmatter pattern** (72-VERIFICATION.md lines 1-36 — YAML frontmatter + status fields):
```yaml
---
phase: 73-retrospective-forward-port-pillar-c
verified: [date]
status: passed
score: 4/4 SC satisfied
v73_final_state: "[narrative]"
overrides_applied: 0
...
---
```

**Section structure** (72-VERIFICATION.md overall shape — adapt section letters/titles):
```markdown
## Section A — Phase 73 Goal Achievement
## Section B — Commands Run + chain delta-diff witness (73-chain-pre.txt vs 73-chain-post.txt)
## Section C — SC#1-4 Satisfaction
## Section D — Atomic Commit SHAs (Plan 73-01 + 73-02 byte-exact)
## Section E — Per-Validator Conversion Record (~7-12 entries)
## Section F — Discoveries (SCOPE-GAP-RETRO-02-OVERFLOW-01 if triggered)
## Section G — Phase 74 Entry-State Readiness Signal
## Section H — Sign-off
```

**Section E conversion-record table** (CONTEXT.md lines 254-255 — per-validator conversion evidence):
```markdown
| Validator | Converted assertion IDs | Frozen SHA tag | Plan 73-02 commit |
|-----------|------------------------|----------------|-------------------|
| check-phase-61.mjs | V-61-17..20 | ba2cbc0 (V15) | [SHA] |
| check-phase-67.mjs | V-67-05/06 | [determined empirically] | [SHA] |
```

**Pre/post delta-diff witness format** (RESEARCH.md Pattern 5 lines 478-484):
```markdown
| Metric | Pre-RETRO-02 (73-chain-pre.txt) | Post-RETRO-02 (73-chain-post.txt) |
|--------|---------------------------------|-----------------------------------|
| FAIL count | 8 (V-72-CHAIN-{61..67,70}) | 0 |
| V-72-CHAIN-61 detail | `check-phase-61 FAIL: ...` | PASS |
| V-72-CHAIN-67 detail | `check-phase-67 FAIL: ...` | PASS |
```

**V-73-AUDIT assertion target:** 73-VERIFICATION.md heading presence (no specific heading required beyond the file existing — V-73-AUDIT is a SKIP-PASS until the file lands, per V-72-AUDIT-VERIFY precedent).

---

## Shared Patterns

### CRLF Normalization (all MJS validators)
**Source:** `check-phase-48.mjs:25` + `check-phase-60.mjs:24` (readFile helper — lineage anchor)
**Apply to:** All new/modified validators
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```
The `readAtClose()` function in `_lib/frozen-at-close.mjs` also uses `.replace(/\r\n/g, '\n')` for the same normalization — single centralization point for NEW helpers.

### Uniform Stdout+Stderr Capture (CHAIN + AUDIT wrappers)
**Source:** `check-phase-72.mjs` lines 151-158 (self-dogfood, Phase 72 Plan 72-01 `d374095`)
**Apply to:** All 8 wrapper fix sites + check-phase-73.mjs CHAIN wrapper (from inception)
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

### v1.7-Family Hardened `execFileSync` Signature (frozen reads)
**Source:** `check-phase-67.mjs` lines 35-43 + `check-phase-70.mjs` lines 40-46
**Apply to:** `_lib/frozen-at-close.mjs` `readAtClose()` only — NOT to existing inline helpers in check-phase-{61,67,68,70}.mjs (byte-unchanged per D-02)
```javascript
execFileSync('git', ['show', sha + ':' + relPath], {
  encoding: 'utf8',
  timeout: 10000,
  stdio: ['ignore', 'pipe', 'pipe'],
}).replace(/\r\n/g, '\n')
```

### CHAIN_SKIP Empty-Set Invariant
**Source:** `check-phase-68.mjs` (Phase 68 `7b635ca` permanent clearing), enforced in every subsequent validator
**Apply to:** `check-phase-73.mjs`
```javascript
const CHAIN_SKIP = new Set([]);  // Phase 68 7b635ca invariant — must remain empty
```
V-73-SELF asserts `CHAIN_SKIP.size === 0`.

### Heading-Presence + Skip-Pass Until Artifact Exists
**Source:** `check-phase-72.mjs` lines 108-119 (V-72-AUDIT-VERIFY pattern)
**Apply to:** V-73-AUDIT (checks 73-VERIFICATION.md) and V-73-INVENTORY (checks 73-RETRO-INVENTORY.md)
- File missing → `{ pass: true, skipped: true, detail: '... not yet authored (PASS-via-skip until Plan 73-0N lands)' }`
- File exists but heading missing → `{ pass: false, detail: '... missing heading' }`
- File exists with heading → `{ pass: true, detail: '... heading present' }`

### Check-Name Frozen-SHA Suffix Convention
**Source:** `check-phase-61.mjs` line 83 (`[v1.5-frozen @ ba2cbc0]`) + `check-phase-67.mjs` line 73 (`[v1.7-frozen @ aa6de68]`)
**Apply to:** All RETRO-02 converted assertions in Plan 73-02
```
"V-NN-NN: [original check name] [v1.X-frozen @ <SHA>]"
```
where `<SHA>` is the appropriate MILESTONE_CLOSE_SHAS value.

### Atomic-Within-Plan Commit Scope (SC#4)
**Source:** Phase 67 Plan 67-02 `55260b3` (5 files) → Phase 72 Plan 72-01 `d374095` (7 files)
**Apply to:** Plans 73-01 (~9 files) and 73-02 (~8-13 files)
- Plan 73-01 ONE SHA: 6 wrapper-modified files + `_lib/frozen-at-close.mjs` (NEW) + `check-phase-73.mjs` (NEW) + `73-RETRO-INVENTORY.md` (NEW) = 9 files
- Plan 73-02 ONE SHA: 1-7 RETRO-02-converted validators + `check-phase-73.mjs` (grow V-73-CONVERT-NN)
- Plan 73-03: traceability + VERIFICATION.md only (not atomic — per-plan pattern)

---

## No Analog Found

All Phase 73 files have clear analogs. The only novel element is the COMPLEX_CONVERSION subclass for V-67-05/06 (wrong-SHA issue rather than HEAD-coupled readFile — no direct analog, but the conversion mechanics are identical to standard RETRO-02 once the correct SHA is determined empirically).

| File / situation | Role | Reason |
|-----------------|------|--------|
| V-67-05/06 SHA-determination step | executor task | No precedent for wrong-SHA-vs-true-close-gate disambiguation; executor runs `git show` comparison at both SHAs during Plan 73-02 Wave 1 to determine correct conversion target |

---

## Metadata

**Analog search scope:**
- `scripts/validation/check-phase-{60,61,62,63,64,65,67,70,72}.mjs` (direct read)
- `scripts/validation/_lib/archive-path.mjs` (direct read)
- `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md` (direct read — Section E)

**Files scanned:** 11 analog files read (check-phase-72.mjs full, check-phase-67.mjs partial, check-phase-61.mjs partial, check-phase-70.mjs partial, check-phase-60.mjs partial, check-phase-62.mjs partial, _lib/archive-path.mjs full, 72-VERIFICATION.md partial)

**Pattern extraction date:** 2026-06-08

**Key invariants for executor:**
1. `CHAIN_SKIP = new Set([])` — never add entries (Phase 68 `7b635ca` permanent)
2. Wrapper fix is 2-line delta per catch block: add stdout capture + replace `stderr.slice(0,200)` with `(stdout + stderr).slice(0,500).trim()`
3. Helper-spawn sites (`check-phase-48.mjs:72`, `check-phase-60.mjs:188`, `check-phase-61.mjs:403`) are explicitly NOT touched in Phase 73
4. Existing inline helpers in `check-phase-{61,67,68,70}.mjs` are byte-unchanged — do not refactor to `_lib` consumption
5. `CHAIN_PHASES` in check-phase-73.mjs = `[48..72]` (25 entries) — does NOT include 73 (V-73-SELF guard)
6. `73-RETRO-INVENTORY.md` must precede `73-02` conversion atomic (SC#1 literal — inventory is a committed artifact)
7. AUDIT_WRAPPER_ANCHOR must anchor to `[auditPath]` variable to avoid aliasing with CHAIN wrappers (Pitfall 2)
8. CHAIN_WRAPPER_ANCHOR gap must be `{0,400}` (empirically corrected in Phase 72 from 200; 258-char gap confirmed for check-phase-71)
