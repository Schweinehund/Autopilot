#!/usr/bin/env node
// check-phase-135.mjs -- Phase 135 deliverables (Recipe #3 -- Windows 11 Multi-App Kiosk)
//
// v1.19 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-138.mjs).
// NEEDLES DERIVED INLINE from 135-VERIFICATION.md (Observable Truths table): the recipe file's shape
// (H2 order, the ## Rollback/Recovery named divergence between Verification and Configuration-Caused
// Failures), the zero-edit tripwire on the shared Windows AVD-client recipe (mirrors check-phase-130's
// own Step 5a/5b literal-string pin), the bounded XML field set (one column-0 xml fence, 3-row
// namespace table), and the anti-feature table row count.
//
// CORRECTION OF RECORD (measured against the live corpus, not re-derived from 135-CONTEXT prose):
// 135-VERIFICATION.md's row 1 states the recipe file is "329 lines" and its row 3 states the
// anti-feature table carries "8 mandated rows plus 2 locked additions plus 2 bonus rows" (i.e. 12
// total, the arithmetic the prose itself performs). The live corpus measures 328 lines and 12
// anti-feature rows -- this validator asserts the measured actuals (328 / 12), not the prose's
// unreduced "8" fragment or a miscounted "329". See 138-03-SUMMARY.md Deviations.
//
// Assertion classes:
//   V-135-RECIPE          docs/recipes/03-windows-11-multi-app-kiosk.md exists at the measured line count
//   V-135-ROLLBACKORDER    ## Rollback/Recovery sits between ## Verification and ## Configuration-Caused Failures
//   V-135-RECIPE01ZEROEDIT docs/recipes/01-shared-windows-avd-client.md Step 5a/5b headings unchanged (zero-edit tripwire)
//   V-135-XMLFENCE         exactly one column-0 ```xml fence present
//   V-135-NAMESPACETABLE   3-row namespace/version-floor table (2017 root / 2021 v4: / 2022 v5:) present
//   V-135-ANTIFEATURE      anti-feature table carries the measured row count (12)
//   V-135-SELF             CHAIN_PHASES does NOT include 135 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-135.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Lightweight: NO chain (chain lives only in apex check-phase-138.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const RECIPE = 'docs/recipes/03-windows-11-multi-app-kiosk.md';
const RECIPE_01 = 'docs/recipes/01-shared-windows-avd-client.md';
const EXPECTED_LINE_COUNT = 328;
const EXPECTED_ANTIFEATURE_ROWS = 12;

// Table-data-row counter: given a header-line regex, counts '|'-prefixed lines after the header +
// separator rows, stopping at the first non-'|' line. Reused across the anti-feature and namespace checks.
function countTableDataRows(content, headerRegex) {
  const lines = content.split('\n');
  const idx = lines.findIndex((l) => headerRegex.test(l));
  if (idx === -1) return -1;
  let count = 0;
  for (let i = idx + 2; i < lines.length; i++) {
    if (/^\|/.test(lines[i])) count++;
    else break;
  }
  return count;
}

const checks = [];

// === V-135-RECIPE: docs/recipes/03-windows-11-multi-app-kiosk.md exists at the measured line count ===
checks.push({
  id: 'RECIPE',
  name: 'V-135-RECIPE: ' + RECIPE + ' exists at ' + EXPECTED_LINE_COUNT + ' lines',
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const lineCount = c.endsWith('\n') ? c.split('\n').length - 1 : c.split('\n').length;
    if (lineCount !== EXPECTED_LINE_COUNT) {
      return { pass: false, detail: RECIPE + ' line count drift: expected ' + EXPECTED_LINE_COUNT + ', got ' + lineCount };
    }
    return { pass: true, detail: RECIPE + ' present at ' + lineCount + ' lines' };
  }
});

// === V-135-ROLLBACKORDER: ## Rollback/Recovery sits between ## Verification and ## Configuration-Caused Failures ===
checks.push({
  id: 'ROLLBACKORDER',
  name: 'V-135-ROLLBACKORDER: ## Rollback/Recovery between ## Verification and ## Configuration-Caused Failures',
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const lines = c.split('\n');
    const idxVerif = lines.findIndex((l) => l.trim() === '## Verification');
    const idxRollback = lines.findIndex((l) => l.trim() === '## Rollback/Recovery');
    const idxFailures = lines.findIndex((l) => l.trim() === '## Configuration-Caused Failures');
    if (idxVerif === -1 || idxRollback === -1 || idxFailures === -1) {
      return { pass: false, detail: 'ROLLBACKORDER needle absent: one of the three H2 headings is missing' };
    }
    if (!(idxVerif < idxRollback && idxRollback < idxFailures)) {
      return { pass: false, detail: 'ROLLBACKORDER regression: expected order Verification(' + idxVerif + ') < Rollback/Recovery(' + idxRollback + ') < Configuration-Caused Failures(' + idxFailures + ')' };
    }
    return { pass: true, detail: '## Rollback/Recovery correctly ordered between Verification and Configuration-Caused Failures' };
  }
});

// === V-135-RECIPE01ZEROEDIT: docs/recipes/01-shared-windows-avd-client.md Step 5a/5b headings unchanged ===
checks.push({
  id: 'RECIPE01ZEROEDIT',
  name: 'V-135-RECIPE01ZEROEDIT: ' + RECIPE_01 + ' Step 5a/5b headings unchanged (zero-edit tripwire)',
  run() {
    const c = readFile(RECIPE_01);
    if (c === null) return { pass: false, detail: RECIPE_01 + ' missing' };
    if (!c.includes('### Step 5a: Kiosk configuration')) {
      return { pass: false, detail: 'RECIPE01ZEROEDIT regression: "### Step 5a: Kiosk configuration" heading missing or altered' };
    }
    if (!c.includes('### Step 5b: Shared PC configuration')) {
      return { pass: false, detail: 'RECIPE01ZEROEDIT regression: "### Step 5b: Shared PC configuration" heading missing or altered' };
    }
    return { pass: true, detail: RECIPE_01 + ' Step 5a/5b headings byte-present -- zero-edit invariant holds (mirrors check-phase-130 KIOSKFORK pin)' };
  }
});

// === V-135-XMLFENCE: exactly one column-0 ```xml fence present ===
checks.push({
  id: 'XMLFENCE',
  name: 'V-135-XMLFENCE: exactly one column-0 ```xml fence present in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const opens = (c.match(/^```xml$/gm) || []).length;
    if (opens !== 1) {
      return { pass: false, detail: 'XMLFENCE regression: expected exactly 1 column-0 ```xml fence, got ' + opens };
    }
    return { pass: true, detail: 'exactly one column-0 ```xml fence present' };
  }
});

// === V-135-NAMESPACETABLE: 3-row namespace/version-floor table present ===
checks.push({
  id: 'NAMESPACETABLE',
  name: 'V-135-NAMESPACETABLE: 3-row namespace/version-floor table present in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const rows = countTableDataRows(c, /^\| Namespace \(year\)/);
    if (rows !== 3) {
      return { pass: false, detail: 'NAMESPACETABLE row-count drift: expected 3, got ' + rows };
    }
    if (!/\| 2017 \(root\)/.test(c) || !/`v4:`/.test(c) || !/`v5:`/.test(c)) {
      return { pass: false, detail: 'NAMESPACETABLE needle absent: 2017 (root) / v4: / v5: rows' };
    }
    return { pass: true, detail: '3-row namespace table present (2017 root, 2021 v4:, 2022 v5:)' };
  }
});

// === V-135-ANTIFEATURE: anti-feature table carries the measured row count ===
checks.push({
  id: 'ANTIFEATURE',
  name: 'V-135-ANTIFEATURE: anti-feature table carries ' + EXPECTED_ANTIFEATURE_ROWS + ' rows in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const rows = countTableDataRows(c, /^\| Feature \|/);
    if (rows !== EXPECTED_ANTIFEATURE_ROWS) {
      return { pass: false, detail: 'ANTIFEATURE row-count drift: expected ' + EXPECTED_ANTIFEATURE_ROWS + ', got ' + rows };
    }
    return { pass: true, detail: 'anti-feature table carries ' + rows + ' rows' };
  }
});

// === V-135-SELF: dual-invariant guard (CHAIN_PHASES excludes 135; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-135-SELF: CHAIN_PHASES does NOT include 135; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(135)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 135 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (135 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-135 -- Phase 135 deliverables (Recipe #3 -- Windows 11 Multi-App Kiosk)\n');
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + 'SKIPPED' + (showDetail ? ' -- ' + result.detail : '') + '\n');
  } else if (result.pass) {
    passed++;
    process.stdout.write(padLabel(prefix) + 'PASS' + (showDetail ? ' -- ' + result.detail : '') + '\n');
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + 'FAIL -- ' + result.detail + '\n');
  }
}

process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
