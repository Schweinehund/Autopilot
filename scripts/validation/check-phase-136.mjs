#!/usr/bin/env node
// check-phase-136.mjs -- Phase 136 deliverables (Recipe #4 -- Android Dedicated, MHS Multi-App)
//
// v1.19 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-138.mjs).
// NEEDLES DERIVED INLINE from 136-02-SUMMARY.md Section 4 "Closure-Table Actuals" (the measured actuals
// against the finished file, all inside CONTEXT's ranges): H2 skeleton shape, Step/decision-block/
// admin-question/misconfiguration-callout counts, the anti-feature and decomposition table row counts,
// the Verification checklist line count, the failures-table row count, and the single column-0 json fence.
//
// Assertion classes:
//   V-136-RECIPE           docs/recipes/04-android-dedicated-mhs-multi-app.md exists at the measured line count
//   V-136-H2SKELETON        8 H2 headings in the fixed shipped order
//   V-136-STEPHEADINGS      6 ### Step headings
//   V-136-ADMINASK          5 "> **Ask the admin:**" lead-ins (1:1 with the 5 decision blocks per 136-02-SUMMARY.md)
//   V-136-BREAKSCALLOUT     6 "> **What breaks if misconfigured:**" callouts
//   V-136-ANTIFEATURE       anti-feature table carries 9 rows
//   V-136-DECOMPOSITION     JSON-field decomposition table carries 9 data rows (10 incl. header, per SUMMARY)
//   V-136-VERIFICATION      Verification checklist carries 7 "- [ ]" lines
//   V-136-FAILURESTABLE     Configuration-Caused Failures table carries 4 rows
//   V-136-JSONFENCE         exactly one column-0 ```json fence present
//   V-136-SELF              CHAIN_PHASES does NOT include 136 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-136.mjs [--verbose]
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

const RECIPE = 'docs/recipes/04-android-dedicated-mhs-multi-app.md';
const EXPECTED_LINE_COUNT = 301;
const EXPECTED_H2_ORDER = [
  '## Summary',
  '## Prerequisites',
  '## Unsupported and Anti-Feature Callouts',
  '## Steps',
  '## Verification',
  '## Rollback/Recovery',
  '## Configuration-Caused Failures',
  '## See Also',
];

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

function extractSection(content, heading) {
  const lines = content.split('\n');
  const startIdx = lines.findIndex((l) => l.trim() === heading);
  if (startIdx === -1) return null;
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (/^## /.test(lines[i])) { endIdx = i; break; }
  }
  return lines.slice(startIdx, endIdx);
}

const checks = [];

// === V-136-RECIPE: docs/recipes/04-android-dedicated-mhs-multi-app.md exists at the measured line count ===
checks.push({
  id: 'RECIPE',
  name: 'V-136-RECIPE: ' + RECIPE + ' exists at ' + EXPECTED_LINE_COUNT + ' lines',
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

// === V-136-H2SKELETON: 8 H2 headings in the fixed shipped order ===
checks.push({
  id: 'H2SKELETON',
  name: 'V-136-H2SKELETON: 8 H2 headings in fixed order in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const h2s = c.split('\n').filter((l) => /^## /.test(l));
    if (h2s.length !== EXPECTED_H2_ORDER.length) {
      return { pass: false, detail: 'H2SKELETON count drift: expected ' + EXPECTED_H2_ORDER.length + ', got ' + h2s.length };
    }
    for (let i = 0; i < EXPECTED_H2_ORDER.length; i++) {
      if (h2s[i] !== EXPECTED_H2_ORDER[i]) {
        return { pass: false, detail: 'H2SKELETON order drift at index ' + i + ': expected "' + EXPECTED_H2_ORDER[i] + '", got "' + h2s[i] + '"' };
      }
    }
    return { pass: true, detail: '8 H2 headings present in the fixed shipped order' };
  }
});

// === V-136-STEPHEADINGS: 6 ### Step headings ===
checks.push({
  id: 'STEPHEADINGS',
  name: 'V-136-STEPHEADINGS: 6 ### Step headings in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const steps = (c.match(/^### Step \d+:/gm) || []).length;
    if (steps !== 6) return { pass: false, detail: 'STEPHEADINGS count drift: expected 6, got ' + steps };
    return { pass: true, detail: '6 ### Step headings present' };
  }
});

// === V-136-ADMINASK: 5 "Ask the admin" lead-ins ===
checks.push({
  id: 'ADMINASK',
  name: 'V-136-ADMINASK: 5 "> **Ask the admin:**" lead-ins in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const asks = (c.match(/^> \*\*Ask the admin:\*\*/gm) || []).length;
    if (asks !== 5) return { pass: false, detail: 'ADMINASK count drift: expected 5, got ' + asks };
    return { pass: true, detail: '5 admin-question lead-ins present (1:1 with the 5 decision blocks)' };
  }
});

// === V-136-BREAKSCALLOUT: 6 "What breaks if misconfigured" callouts ===
checks.push({
  id: 'BREAKSCALLOUT',
  name: 'V-136-BREAKSCALLOUT: 6 "> **What breaks if misconfigured:**" callouts in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const callouts = (c.match(/^> \*\*What breaks if misconfigured:\*\*/gm) || []).length;
    if (callouts !== 6) return { pass: false, detail: 'BREAKSCALLOUT count drift: expected 6, got ' + callouts };
    return { pass: true, detail: '6 misconfiguration callouts present' };
  }
});

// === V-136-ANTIFEATURE: anti-feature table carries 9 rows ===
checks.push({
  id: 'ANTIFEATURE',
  name: 'V-136-ANTIFEATURE: anti-feature table carries 9 rows in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const rows = countTableDataRows(c, /^\| Feature \|/);
    if (rows !== 9) return { pass: false, detail: 'ANTIFEATURE row-count drift: expected 9, got ' + rows };
    return { pass: true, detail: 'anti-feature table carries 9 rows' };
  }
});

// === V-136-DECOMPOSITION: JSON-field decomposition table carries 9 data rows (10 incl. header) ===
checks.push({
  id: 'DECOMPOSITION',
  name: 'V-136-DECOMPOSITION: JSON-field decomposition table carries 9 data rows in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const rows = countTableDataRows(c, /^\| # \| Setting \/ JSON key \|/);
    if (rows !== 9) return { pass: false, detail: 'DECOMPOSITION row-count drift: expected 9 data rows (10 incl. header), got ' + rows };
    return { pass: true, detail: 'decomposition table carries 9 data rows (10 incl. header)' };
  }
});

// === V-136-VERIFICATION: Verification checklist carries 7 "- [ ]" lines ===
checks.push({
  id: 'VERIFICATION',
  name: 'V-136-VERIFICATION: Verification checklist carries 7 "- [ ]" lines in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const section = extractSection(c, '## Verification');
    if (section === null) return { pass: false, detail: 'VERIFICATION needle absent: "## Verification" heading missing' };
    const items = section.filter((l) => /^- \[ \] /.test(l)).length;
    if (items !== 7) return { pass: false, detail: 'VERIFICATION checklist-line-count drift: expected 7, got ' + items };
    return { pass: true, detail: 'Verification checklist carries 7 lines' };
  }
});

// === V-136-FAILURESTABLE: Configuration-Caused Failures table carries 4 rows ===
checks.push({
  id: 'FAILURESTABLE',
  name: 'V-136-FAILURESTABLE: Configuration-Caused Failures table carries 4 rows in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const rows = countTableDataRows(c, /^\| Misconfiguration \|/);
    if (rows !== 4) return { pass: false, detail: 'FAILURESTABLE row-count drift: expected 4, got ' + rows };
    return { pass: true, detail: 'Configuration-Caused Failures table carries 4 rows' };
  }
});

// === V-136-JSONFENCE: exactly one column-0 ```json fence present ===
checks.push({
  id: 'JSONFENCE',
  name: 'V-136-JSONFENCE: exactly one column-0 ```json fence present in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const opens = (c.match(/^```json$/gm) || []).length;
    if (opens !== 1) return { pass: false, detail: 'JSONFENCE regression: expected exactly 1 column-0 ```json fence, got ' + opens };
    return { pass: true, detail: 'exactly one column-0 ```json fence present' };
  }
});

// === V-136-SELF: dual-invariant guard (CHAIN_PHASES excludes 136; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-136-SELF: CHAIN_PHASES does NOT include 136; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(136)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 136 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (136 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-136 -- Phase 136 deliverables (Recipe #4 -- Android Dedicated, MHS Multi-App)\n');
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
