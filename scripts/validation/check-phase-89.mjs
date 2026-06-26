#!/usr/bin/env node
// check-phase-89.mjs -- Phase 89 deliverables (PSSO provisioning walkthrough)
//
// v1.11 per-phase validator. Phase 89 shipped its content/corpus already covered by the
// v1.11 milestone-audit C-checks; this validator is LIGHTWEIGHT per Phase 93 D-01
// (re-applies Phase 82 D-01): a richer dual-invariant SELF guard + one phase-presence assertion.
// NO chain (the chain lives ONLY in the apex check-phase-93.mjs). Deterministic PASS counts
// are load-bearing for the Plan 93-03 cross-OS EXACT MATCH diff.
//
// Assertion classes:
//   V-89-PRESENCE   phase headline deliverable exists + non-empty
//   V-89-SELF       CHAIN_PHASES does NOT include 89 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A structural shell from check-phase-87.mjs (lightweight; no chain).
//
// Usage: node scripts/validation/check-phase-89.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-93.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// Phase 89 headline deliverable (PSSO provisioning walkthrough).
const DELIVERABLE = 'docs/macos-lifecycle/01-psso-provisioning-walkthrough.md';

const checks = [];

// === V-89-PRESENCE: phase headline deliverable exists + non-empty ===
checks.push({
  id: 'PRESENCE',
  name: 'V-89-PRESENCE: ' + DELIVERABLE + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE + ' is empty' };
    return { pass: true, detail: DELIVERABLE + ' present (' + c.length + ' bytes)' };
  }
});

// === V-89-SELF: dual-invariant guard (CHAIN_PHASES excludes 89; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-89-SELF: CHAIN_PHASES does NOT include 89; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(89)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 89 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (89 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-89 -- Phase 89 deliverables (PSSO provisioning walkthrough)\n');
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
