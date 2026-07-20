#!/usr/bin/env node
// check-phase-129.mjs -- Phase 129 deliverables (Device Recipe Doc-Class Foundation)
//
// v1.18 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-134.mjs).
// NEEDLES DERIVED INLINE from 129-VERIFICATION.md (Required Artifacts / Observable Truths): the
// STD-05 Admin Decision-Point Block Format section + D-02 edge-case ruling landed in
// EEE-SOP-standard.md (CLASS-01), and the canonical recipe-template.md with its TEMPLATE-SENTINEL
// harness-skip marker (CLASS-02).
//
// Assertion classes:
//   V-129-STD05        docs/_standards/EEE-SOP-standard.md contains the STD-05 section + D-02 ruling
//   V-129-TEMPLATE      docs/_templates/recipe-template.md exists + non-empty + TEMPLATE-SENTINEL present
//   V-129-SELF          CHAIN_PHASES does NOT include 129 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-129.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-134.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_STANDARD = 'docs/_standards/EEE-SOP-standard.md';
const DELIVERABLE_TEMPLATE = 'docs/_templates/recipe-template.md';

const checks = [];

// === V-129-STD05: STD-05 section + D-02 ruling landed in EEE-SOP-standard.md (CLASS-01) ===
checks.push({
  id: 'STD05',
  name: 'V-129-STD05: STD-05 Admin Decision-Point Block Format + D-02 ruling present in ' + DELIVERABLE_STANDARD,
  run() {
    const c = readFile(DELIVERABLE_STANDARD);
    if (c === null) return { pass: false, detail: DELIVERABLE_STANDARD + ' missing' };
    if (!c.includes('Admin Decision-Point Block Format (STD-05)')) {
      return { pass: false, detail: 'STD05 needle absent: "Admin Decision-Point Block Format (STD-05)"' };
    }
    if (!/docs\/recipes\/\*.*Guide|Guide.*v1\.18 STD-05/.test(c)) {
      return { pass: false, detail: 'D-02 ruling needle absent: docs/recipes/* -> Guide' };
    }
    return { pass: true, detail: 'STD-05 section + D-02 ruling (docs/recipes/* -> Guide) present (CLASS-01)' };
  }
});

// === V-129-TEMPLATE: recipe-template.md exists + TEMPLATE-SENTINEL present (CLASS-02) ===
checks.push({
  id: 'TEMPLATE',
  name: 'V-129-TEMPLATE: ' + DELIVERABLE_TEMPLATE + ' exists, non-empty, TEMPLATE-SENTINEL present',
  run() {
    const c = readFile(DELIVERABLE_TEMPLATE);
    if (c === null) return { pass: false, detail: DELIVERABLE_TEMPLATE + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE_TEMPLATE + ' is empty' };
    if (!c.includes('TEMPLATE-SENTINEL')) {
      return { pass: false, detail: 'TEMPLATE needle absent: TEMPLATE-SENTINEL' };
    }
    return { pass: true, detail: 'recipe-template.md present (' + c.length + ' bytes) with TEMPLATE-SENTINEL (CLASS-02)' };
  }
});

// === V-129-SELF: dual-invariant guard (CHAIN_PHASES excludes 129; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-129-SELF: CHAIN_PHASES does NOT include 129; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(129)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 129 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (129 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-126.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-129 -- Phase 129 deliverables (Device Recipe Doc-Class Foundation)\n');
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
