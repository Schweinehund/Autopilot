#!/usr/bin/env node
// check-phase-116.mjs -- Phase 116 deliverables (L1/L2 Runbook Retrofit -- ~75 docs)
//
// v1.15 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-119.mjs).
// NEEDLES DERIVED INLINE from 116-VERIFICATION.md (Required Artifacts / Observable Truths): the L1/L2
// registry-flip-to-Approved event on a representative runbook + the one-time EEE-reformat Version-History
// row (RETRO-01 SC1/SC4/SC5). SC-ENROLL / SC-REFORMAT needle convention per 118-PATTERNS.md.
//
// WHY content needles are load-bearing: a bare PRESENCE check on the runbook dirs is trivially green once
// the files exist. The content needles pin RETRO-01 landed strings -- the RE-001 enrollment + Status:
// Approved flip and the "v1.15 EEE reformat -- content not re-reviewed" row -- so a regression that reverts
// the retrofit (dropping the EEE block/row) is caught.
//
// Assertion classes:
//   V-116-PRESENCE-L1       docs/l1-runbooks/00-index.md exists + non-empty (RETRO-01)
//   V-116-PRESENCE-L2       docs/l2-runbooks/00-index.md exists + non-empty (RETRO-01)
//   V-116-ENROLL           RE-001 enrollment (doc_id) + Status: Approved flip landed in L1 index
//   V-116-REFORMAT         one-time EEE-reformat Version-History row landed in L1 index (META-04)
//   V-116-SELF             CHAIN_PHASES does NOT include 116 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-116.mjs [--verbose]
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

const DELIVERABLE_L1 = 'docs/l1-runbooks/00-index.md';
const DELIVERABLE_L2 = 'docs/l2-runbooks/00-index.md';

const REFORMAT_ROW = 'v1.15 EEE reformat — content not re-reviewed';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-116-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-L1', DELIVERABLE_L1, 'RETRO-01');
presence('PRESENCE-L2', DELIVERABLE_L2, 'RETRO-01');

// === V-116-ENROLL: RE-001 enrollment (doc_id) + Status: Approved flip landed in L1 index ===
checks.push({
  id: 'ENROLL',
  name: 'V-116-ENROLL: RE-001 enrollment + Status: Approved present in ' + DELIVERABLE_L1,
  run() {
    const c = readFile(DELIVERABLE_L1);
    if (c === null) return { pass: false, detail: DELIVERABLE_L1 + ' missing' };
    if (!c.includes('doc_id: RE-001')) return { pass: false, detail: 'ENROLL needle absent: doc_id: RE-001' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'ENROLL needle absent: status: Approved' };
    return { pass: true, detail: 'RE-001 enrolled + Status: Approved (registry-flip-to-Approved event)' };
  }
});

// === V-116-REFORMAT: one-time EEE-reformat Version-History row landed in L1 index (META-04) ===
checks.push({
  id: 'REFORMAT',
  name: 'V-116-REFORMAT: EEE-reformat Version-History row present in ' + DELIVERABLE_L1,
  run() {
    const c = readFile(DELIVERABLE_L1);
    if (c === null) return { pass: false, detail: DELIVERABLE_L1 + ' missing' };
    if (!c.includes(REFORMAT_ROW)) return { pass: false, detail: 'REFORMAT needle absent: ' + REFORMAT_ROW };
    return { pass: true, detail: 'one-time "v1.15 EEE reformat" Version-History row present' };
  }
});

// === V-116-SELF: dual-invariant guard (CHAIN_PHASES excludes 116; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-116-SELF: CHAIN_PHASES does NOT include 116; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(116)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 116 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (116 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-101.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-116 -- Phase 116 deliverables (L1/L2 Runbook Retrofit -- ~75 docs)\n');
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
