# Phase 86: Chain Health Pass - Pattern Map

**Mapped:** 2026-06-23
**Files analyzed:** 6 modified files (no new files)
**Analogs found:** 6 / 6

---

## File Classification

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------|------|-----------|----------------|---------------|
| `scripts/validation/check-phase-58.mjs` | validator | request-response (git-frozen read) | `scripts/validation/check-phase-61.mjs` lines 20, 288-295 | exact |
| `scripts/validation/check-phase-59.mjs` | validator | request-response (git-frozen read) | `scripts/validation/check-phase-61.mjs` lines 20, 288-295 | exact |
| `scripts/validation/check-phase-72.mjs` | validator | request-response (archive path read) | `scripts/validation/check-phase-62.mjs` line 22 + `scripts/validation/check-phase-73.mjs` lines 164-176 | exact |
| `scripts/validation/check-phase-73.mjs` | validator | request-response (archive path read) | `scripts/validation/check-phase-62.mjs` line 42 + own lines 164-176 (self-analog) | exact |
| `scripts/validation/check-phase-74.mjs` | validator | request-response (archive path read) | `scripts/validation/check-phase-73.mjs` lines 164-176 | exact |
| `scripts/validation/check-phase-82.mjs` | validator (chain apex) | request-response (archive path read) | `scripts/validation/check-phase-73.mjs` lines 164-176 | exact |

---

## Pattern Assignments

### `check-phase-58.mjs` — V-58-10 frozen-aware conversion (D-01)

**Analog:** `scripts/validation/check-phase-61.mjs` line 20 (import) + lines 288-295 (readAtV15Close call + name suffix)

**Current imports block** (check-phase-58.mjs lines 11-13):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

**Imports pattern to mirror** (check-phase-61.mjs line 20):
```javascript
import { readAtV15Close } from './_lib/frozen-at-close.mjs';
```
Add this line after the existing `node:process` import. No other imports change.

**Current V-58-10 call-site** (check-phase-58.mjs lines 197-200):
```javascript
{
  id: 10, name: "V-58-10: comparison doc frontmatter has last_verified + review_by (45-day cycle per D-19) + audience: admin + platform: all",
  run() {
    const c = readFile(COMPARISON_DOC);
    if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
```

**Frozen-aware pattern to substitute** (mirror of check-phase-61.mjs lines 288-295):
```javascript
{
  id: 10, name: "V-58-10: comparison doc frontmatter has last_verified + review_by (45-day cycle per D-19) + audience: admin + platform: all [v1.5-frozen @ ba2cbc0]",
  run() {
    const c = readAtV15Close(COMPARISON_DOC);
    // no null-check: readAtV15Close throws on git error; let it propagate
```

**Key substitution values:**
- SHA tag: `ba2cbc0` (V15, already in `_lib/frozen-at-close.mjs:19`)
- Name suffix: `[v1.5-frozen @ ba2cbc0]`
- Only V-58-10 gets this change. V-58-01..09 and V-58-11..26 keep `readFile()`.

---

### `check-phase-59.mjs` — V-59-24 frozen-aware conversion (D-01)

**Analog:** `scripts/validation/check-phase-61.mjs` line 20 (import) + lines 288-295 (readAtV15Close call + name suffix)

**Current imports block** (check-phase-59.mjs lines 11-13):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import process from 'node:process';
```

**Import to add** (mirror of check-phase-61.mjs line 20):
```javascript
import { readAtV15Close } from './_lib/frozen-at-close.mjs';
```

**Current V-59-24 call-site** (check-phase-59.mjs lines 644-650):
```javascript
{
  id: 24, name: 'V-59-24: A3 blockquote integrity -- every "> See also:" line is preceded by another ">" line within its H3 region',
  run() {
    const failures = [];
    for (const f of ALL_GLOSSARIES) {
      const c = readFile(f);
      if (c === null) continue;
```

**Frozen-aware pattern to substitute:**
```javascript
{
  id: 24, name: 'V-59-24: A3 blockquote integrity -- every "> See also:" line is preceded by another ">" line within its H3 region [v1.5-frozen @ ba2cbc0]',
  run() {
    const failures = [];
    for (const f of ALL_GLOSSARIES) {
      const c = readAtV15Close(f);
      // no null-check: readAtV15Close throws on git error; let it propagate
```

**Key substitution values:**
- SHA tag: `ba2cbc0` (V15)
- Name suffix: `[v1.5-frozen @ ba2cbc0]`
- Only V-59-24 gets this change. V-59-20/21/22/23 keep `readFile()` (they assert current-state structure).

---

### `check-phase-72.mjs` — V-72-AUDIT-VERIFY archive-aware conversion (D-03)

**Analog:** `scripts/validation/check-phase-62.mjs` line 22 (import) + `scripts/validation/check-phase-73.mjs` lines 164-176 (SKIP-PASS → archive-aware FAIL pattern)

**Current imports block** (check-phase-72.mjs lines 33-36):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

**Import to add** (check-phase-62.mjs line 22):
```javascript
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
```

**Current V-72-AUDIT-VERIFY call-site** (check-phase-72.mjs lines 108-119):
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

**Archive-aware pattern to substitute** (null-guard pattern from RESEARCH.md §Common Pitfalls 3 + 4):
```javascript
checks.push({
  id: 'AUDIT-VERIFY',
  name: 'V-72-AUDIT-VERIFY: 72-VERIFICATION.md exists and contains Per-Validator Audit Inventory heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md',
      ['v1.8-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: false, detail: '72-VERIFICATION.md not found in live tree or v1.8-phases archive' };
    if (!/Per-Validator Audit Inventory/i.test(verif)) {
      return { pass: false, detail: '72-VERIFICATION.md missing "Per-Validator Audit Inventory" section heading' };
    }
    return { pass: true, detail: '72-VERIFICATION.md exists with Per-Validator Audit Inventory section' };
  }
});
```

**Key substitution values:**
- `milestoneRoots`: `['v1.8-phases']` (phase 72 closed in v1.8)
- SKIP-PASS sentinel line is REPLACED with `{ pass: false, detail: '...' }` — not kept.

---

### `check-phase-73.mjs` — V-73-INVENTORY + V-73-AUDIT archive-aware conversion (D-02 + D-03)

**Analog:** `scripts/validation/check-phase-62.mjs` line 42 (resolveArchivedPhasePath at module-level with explicit milestoneRoots) + `scripts/validation/check-phase-63.mjs` line 49 (same pattern)

**Current imports block** (check-phase-73.mjs lines 36-39):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

**Import to add** (check-phase-62.mjs line 22 / check-phase-63.mjs line 25):
```javascript
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
```

**Current V-73-INVENTORY call-site** (check-phase-73.mjs lines 72-83):
```javascript
checks.push({
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
});
```

**Archive-aware pattern for V-73-INVENTORY** (resolveArchivedPhasePath call shape from check-phase-62.mjs line 42):
```javascript
checks.push({
  id: 'INVENTORY',
  name: 'V-73-INVENTORY: 73-RETRO-INVENTORY.md exists and contains per-validator class-signature table',
  run() {
    const inventoryPath = resolveArchivedPhasePath(
      '73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md',
      ['v1.8-phases']
    );
    const c = inventoryPath ? readFile(inventoryPath) : null;
    if (c === null) return { pass: false, detail: '73-RETRO-INVENTORY.md missing (not in live tree or v1.8-phases archive)' };
    if (!c.includes('check-phase-')) return { pass: false, detail: 'no per-validator table rows found' };
    const rowCount = (c.match(/\| check-phase-/g) || []).length;
    if (rowCount < 19) return { pass: false, detail: `only ${rowCount}/19 validator rows found` };
    return { pass: true, detail: `${rowCount} validator rows present in 73-RETRO-INVENTORY.md` };
  }
});
```

**Current V-73-AUDIT call-site** (check-phase-73.mjs lines 164-176):
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-73-AUDIT: 73-VERIFICATION.md exists and contains Phase 73 verification heading',
  run() {
    const verif = readFile('.planning/phases/73-retrospective-forward-port-pillar-c/73-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '73-VERIFICATION.md not yet authored (PASS-via-skip until Plan 73-03 lands)' };
    if (!/Phase 73/i.test(verif)) {
      return { pass: false, detail: '73-VERIFICATION.md missing "Phase 73" section heading' };
    }
    return { pass: true, detail: '73-VERIFICATION.md exists with Phase 73 verification content' };
  }
});
```

**Archive-aware pattern for V-73-AUDIT:**
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-73-AUDIT: 73-VERIFICATION.md exists and contains Phase 73 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '73-retrospective-forward-port-pillar-c/73-VERIFICATION.md',
      ['v1.8-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: false, detail: '73-VERIFICATION.md not found in live tree or v1.8-phases archive' };
    if (!/Phase 73/i.test(verif)) {
      return { pass: false, detail: '73-VERIFICATION.md missing "Phase 73" section heading' };
    }
    return { pass: true, detail: '73-VERIFICATION.md exists with Phase 73 verification content' };
  }
});
```

**Key substitution values (both assertions):**
- `milestoneRoots`: `['v1.8-phases']` (phase 73 closed in v1.8)
- SKIP-PASS sentinel replaced with `{ pass: false, detail: '...' }` in V-73-AUDIT.

---

### `check-phase-74.mjs` — V-74-AUDIT archive-aware conversion (D-03 bonus)

**Analog:** `scripts/validation/check-phase-73.mjs` lines 164-176 (identical structural shape; same milestoneRoots)

**Current imports block** (check-phase-74.mjs lines 27-30):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

**Import to add:**
```javascript
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
```

**Current V-74-AUDIT call-site** (check-phase-74.mjs lines 105-117):
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-74-AUDIT: 74-VERIFICATION.md exists and contains Phase 74 verification heading',
  run() {
    const verif = readFile('.planning/phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '74-VERIFICATION.md not yet authored (PASS-via-skip until Plan 74-05 lands)' };
    if (!/Phase 74/i.test(verif)) {
      return { pass: false, detail: '74-VERIFICATION.md missing "Phase 74" section heading' };
    }
    return { pass: true, detail: '74-VERIFICATION.md exists with Phase 74 verification content' };
  }
});
```

**Archive-aware pattern to substitute:**
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-74-AUDIT: 74-VERIFICATION.md exists and contains Phase 74 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-VERIFICATION.md',
      ['v1.8-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: false, detail: '74-VERIFICATION.md not found in live tree or v1.8-phases archive' };
    if (!/Phase 74/i.test(verif)) {
      return { pass: false, detail: '74-VERIFICATION.md missing "Phase 74" section heading' };
    }
    return { pass: true, detail: '74-VERIFICATION.md exists with Phase 74 verification content' };
  }
});
```

**Key substitution values:**
- `milestoneRoots`: `['v1.8-phases']` (phase 74 closed in v1.8, NOT v1.9)
- SKIP-PASS sentinel replaced with `{ pass: false, detail: '...' }`.
- NOTE: This is a bonus cleanup (semantic hygiene). V-74-AUDIT fires inside check-phase-74's own run, not at the apex tally. The apex SKIPPED count is unaffected either way, but converting removes a misleading SKIPPED from check-phase-74's standalone output.

---

### `check-phase-82.mjs` — V-82-AUDIT archive-aware conversion (D-03)

**Analog:** `scripts/validation/check-phase-73.mjs` lines 164-176 (same structural shape; different milestoneRoots)

**Current imports block** (check-phase-82.mjs lines 23-26):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

**Import to add:**
```javascript
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
```

**Current V-82-AUDIT call-site** (check-phase-82.mjs lines 47-59):
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-82-AUDIT: 82-VERIFICATION.md exists and contains Phase 82 verification heading',
  run() {
    const verif = readFile('.planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '82-VERIFICATION.md not yet authored (PASS-via-skip until Plan 82-04 lands)' };
    if (!/Phase 82/i.test(verif)) {
      return { pass: false, detail: '82-VERIFICATION.md missing "Phase 82" section heading' };
    }
    return { pass: true, detail: '82-VERIFICATION.md exists with Phase 82 verification content' };
  }
});
```

**Archive-aware pattern to substitute:**
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-82-AUDIT: 82-VERIFICATION.md exists and contains Phase 82 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '82-harness-lineage-bump-terminal-re-audit-milestone-close/82-VERIFICATION.md',
      ['v1.9-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: false, detail: '82-VERIFICATION.md not found in live tree or v1.9-phases archive' };
    if (!/Phase 82/i.test(verif)) {
      return { pass: false, detail: '82-VERIFICATION.md missing "Phase 82" section heading' };
    }
    return { pass: true, detail: '82-VERIFICATION.md exists with Phase 82 verification content' };
  }
});
```

**Key substitution values:**
- `milestoneRoots`: `['v1.9-phases']` — CRITICAL: phase 82 closed in v1.9, NOT v1.8. Using v1.8-phases will return null.
- SKIP-PASS sentinel replaced with `{ pass: false, detail: '...' }`.
- This is the ONLY assertion that currently appears in the apex standalone SKIPPED tally (1 SKIPPED before fix → 0 after).

---

## Shared Patterns

### Frozen-aware read (D-01)
**Source:** `scripts/validation/_lib/frozen-at-close.mjs` lines 53-54 + `scripts/validation/check-phase-61.mjs` line 20
**Apply to:** check-phase-58.mjs (V-58-10 only) and check-phase-59.mjs (V-59-24 only)

```javascript
// _lib/frozen-at-close.mjs exports (lines 53-54):
export const readAtV15Close = (p) => readAtClose('V15', p);
// V15 SHA = 'ba2cbc0' (frozen-at-close.mjs line 19)

// Call pattern (check-phase-61.mjs line 290):
const c = readAtV15Close('.planning/MILESTONES.md');
// No null check. readAtV15Close throws on git error — let propagate.
```

### Archive-aware path resolution (D-02, D-03)
**Source:** `scripts/validation/_lib/archive-path.mjs` lines 19-30 + `scripts/validation/check-phase-62.mjs` line 42
**Apply to:** check-phase-72.mjs, check-phase-73.mjs (both assertions), check-phase-74.mjs, check-phase-82.mjs

```javascript
// _lib/archive-path.mjs signature (line 19):
export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases'])

// Canonical call pattern with null guard (Pitfalls 3 + 4):
const verifPath = resolveArchivedPhasePath('NN-phase-dir/NN-VERIFICATION.md', ['vX.Y-phases']);
const verif = verifPath ? readFile(verifPath) : null;
if (!verif) return { pass: false, detail: '...' };  // FAIL, not SKIP-PASS

// NEVER: if (!verif) return { pass: true, skipped: true, ... }  -- SKIP-PASS is the OLD form to REPLACE
```

### Name suffix pattern (D-01 only)
**Source:** `scripts/validation/check-phase-61.mjs` line 288
**Apply to:** check-phase-58.mjs V-58-10 name, check-phase-59.mjs V-59-24 name

```javascript
// Pattern (check-phase-61.mjs line 288):
name: "V-61-17: MILESTONES.md has `## v1.5 Linux Platform` H2 as top entry [v1.5-frozen @ ba2cbc0]",
// Suffix to append: " [v1.5-frozen @ ba2cbc0]"
```

---

## milestoneRoots Reference Table

| Target File | Assertion | milestoneRoots | Rationale |
|-------------|-----------|----------------|-----------|
| check-phase-72.mjs | V-72-AUDIT-VERIFY | `['v1.8-phases']` | Phase 72 closed in v1.8 |
| check-phase-73.mjs | V-73-INVENTORY | `['v1.8-phases']` | Phase 73 closed in v1.8 |
| check-phase-73.mjs | V-73-AUDIT | `['v1.8-phases']` | Phase 73 closed in v1.8 |
| check-phase-74.mjs | V-74-AUDIT | `['v1.8-phases']` | Phase 74 closed in v1.8 |
| check-phase-82.mjs | V-82-AUDIT | `['v1.9-phases']` | Phase 82 closed in v1.9 — DIFFERENT from 72/73/74 |

---

## Zero-Edit Confirmation

Cascade validators check-phase-{60,61,62,63,64,65,66} get ZERO edits. They auto-clear once check-phase-58 and check-phase-59 exit 0. Their chain-guard subprocesses spawn 58/59; fixing 58/59 propagates automatically. Do not touch these files.

`CHAIN_SKIP` stays `new Set([])` in all files. No entries added.

The NESTED recursion guard (`CHECK_PHASE_NESTED=1`) remains unchanged in all files. Its structural SKIPPEDs are internal to child subprocess invocations and are not counted by the apex standalone tally.

---

## No Analog Found

None — all six target files have close analogs in the codebase.

---

## Anti-Patterns (extracted from RESEARCH.md §Common Pitfalls)

| Pitfall | Wrong | Right |
|---------|-------|-------|
| Wrong milestoneRoots for 82 | `['v1.8-phases']` | `['v1.9-phases']` |
| Importing readAtV15Close into archive files | Adding to 72/73/74/82 | Only 58/59 get readAtV15Close |
| Missing null guard | `readFile(resolveArchivedPhasePath(...))` | `const p = resolveArchivedPhasePath(...); const c = p ? readFile(p) : null;` |
| Keeping SKIP-PASS after archive conversion | `return { pass: true, skipped: true, ... }` | `return { pass: false, detail: '... not found in live tree or archive' }` |
| Freezing V-59-20/21/22/23 | Converting all glossary reads | Only V-59-24 blockquote-integrity check |

---

## Metadata

**Analog search scope:** `scripts/validation/check-phase-{61,62,63,67}.mjs`, `scripts/validation/_lib/frozen-at-close.mjs`, `scripts/validation/_lib/archive-path.mjs`
**Files scanned:** 8
**Pattern extraction date:** 2026-06-23
