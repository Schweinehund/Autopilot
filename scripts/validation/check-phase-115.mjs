#!/usr/bin/env node
// check-phase-115.mjs -- Phase 115 deliverables (C17 Harness Check -- Validator Atom)
//
// v1.15 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-119.mjs).
// NEEDLES DERIVED INLINE from 115-VERIFICATION.md (Required Artifacts / Observable Truths): the C17
// self-test mode, the machine-readable assertion-violation-counts summary line, and the two fixtures.
//
// CRITICAL -- STANDALONE-NOT-CHAIN (115-VERIFICATION.md Deferred Items): 115-VERIFICATION.md explicitly
// assigns "C17 registered in the harness chain alongside C1-C16" to Phase 119 (the Atom-1 C17 fold). This
// leaf therefore asserts the STANDALONE c17-eee-contract.mjs presence + self-test contract ONLY, and
// asserts c17-eee-contract.mjs carries NO CHAIN_PHASES (it is a standalone validator, not chain-registered
// itself -- the fold lives in v1.15-milestone-audit.mjs, not in this contract file). It does NOT assert
// chain registration.
//
// Assertion classes:
//   V-115-PRESENCE-C17      scripts/validation/c17-eee-contract.mjs exists + non-empty (HARN-01)
//   V-115-PRESENCE-FIXPASS  scripts/validation/c17-fixtures/c17-fixture-passing.md exists + non-empty
//   V-115-PRESENCE-FIXFAIL  scripts/validation/c17-fixtures/c17-fixture-failing.md exists + non-empty
//   V-115-SELFTEST-MODE     --self-test dual-invariant mode landed in c17-eee-contract.mjs
//   V-115-COUNTS-SUMMARY    machine-readable assertion-violation-counts summary line landed
//   V-115-STANDALONE        c17-eee-contract.mjs carries NO CHAIN_PHASES (standalone, not chain-registered)
//   V-115-SELF              CHAIN_PHASES does NOT include 115 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-115.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-119.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_C17     = 'scripts/validation/c17-eee-contract.mjs';
const DELIVERABLE_FIXPASS = 'scripts/validation/c17-fixtures/c17-fixture-passing.md';
const DELIVERABLE_FIXFAIL = 'scripts/validation/c17-fixtures/c17-fixture-failing.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-115-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-C17', DELIVERABLE_C17, 'HARN-01');
presence('PRESENCE-FIXPASS', DELIVERABLE_FIXPASS, null);
presence('PRESENCE-FIXFAIL', DELIVERABLE_FIXFAIL, null);

// === V-115-SELFTEST-MODE: --self-test dual-invariant mode landed in c17-eee-contract.mjs ===
checks.push({
  id: 'SELFTEST-MODE',
  name: 'V-115-SELFTEST-MODE: --self-test mode present in ' + DELIVERABLE_C17,
  run() {
    const c = readFile(DELIVERABLE_C17);
    if (c === null) return { pass: false, detail: DELIVERABLE_C17 + ' missing' };
    const needle = '--self-test';
    if (!c.includes(needle)) return { pass: false, detail: 'SELFTEST-MODE needle absent: ' + needle };
    return { pass: true, detail: 'C17 --self-test mode present' };
  }
});

// === V-115-COUNTS-SUMMARY: machine-readable assertion-violation-counts summary line landed ===
checks.push({
  id: 'COUNTS-SUMMARY',
  name: 'V-115-COUNTS-SUMMARY: assertion-violation-counts summary line present in ' + DELIVERABLE_C17,
  run() {
    const c = readFile(DELIVERABLE_C17);
    if (c === null) return { pass: false, detail: DELIVERABLE_C17 + ' missing' };
    const needle = 'C17 assertion-violation-counts:';
    if (!c.includes(needle)) return { pass: false, detail: 'COUNTS-SUMMARY needle absent: ' + needle };
    return { pass: true, detail: 'machine-readable assertion-violation-counts summary present' };
  }
});

// === V-115-STANDALONE: c17-eee-contract.mjs carries NO CHAIN_PHASES (standalone, not chain-registered) ===
// 115-VERIFICATION.md Deferred Items assigns chain registration to Phase 119. The contract file itself is
// standalone -- the audit-fold lives in v1.15-milestone-audit.mjs (Atom 1), NOT here.
checks.push({
  id: 'STANDALONE',
  name: 'V-115-STANDALONE: c17-eee-contract.mjs is standalone (no CHAIN_PHASES; chain registration is Phase 119)',
  run() {
    const c = readFile(DELIVERABLE_C17);
    if (c === null) return { pass: false, detail: DELIVERABLE_C17 + ' missing' };
    if (c.includes('CHAIN_PHASES')) {
      return { pass: false, detail: 'c17-eee-contract.mjs contains CHAIN_PHASES -- must remain standalone (fold is v1.15-milestone-audit.mjs job)' };
    }
    return { pass: true, detail: 'c17-eee-contract.mjs is standalone (no CHAIN_PHASES; not chain-registered itself)' };
  }
});

// === V-115-SELF: dual-invariant guard (CHAIN_PHASES excludes 115; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-115-SELF: CHAIN_PHASES does NOT include 115; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(115)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 115 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (115 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-101.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-115 -- Phase 115 deliverables (C17 Harness Check -- Validator Atom)\n');
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
