#!/usr/bin/env node
// check-phase-118.mjs -- Phase 118 deliverables (Reference Doc Retrofit + Table Remediation -- ~26 docs)
//
// v1.15 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-119.mjs).
// NEEDLES DERIVED INLINE from 118-VERIFICATION.md (Required Artifacts / Observable Truths): the reference
// registry-flip-to-Approved event, the keyless->Windows platform injection on the error-codes class, the
// one-time EEE-reformat Version-History row, and the per-table prose remediation (RETRO-03 SC1/SC2/SC3/SC4).
// SC-ENROLL / SC-REFORMAT needle convention per 118-PATTERNS.md.
//
// WHY content needles are load-bearing: a bare PRESENCE check on the reference dirs is trivially green once
// the files exist. The content needles pin RETRO-03 landed strings -- the RE-144 enrollment + Status:
// Approved flip on the highest-drift capability matrix (RE-144, the RETRO-03 pin-shift epicentre), the
// error-codes platform: Windows injection, the reformat row, and the D-118-1 per-table "Table summary:"
// prose (the P-02 chunk-boundary protection) -- so a regression that reverts the retrofit is caught.
//
// Assertion classes:
//   V-118-PRESENCE-MATRIX   docs/reference/android-capability-matrix.md exists + non-empty (RETRO-03)
//   V-118-PRESENCE-ERRCODES docs/error-codes/00-index.md exists + non-empty (RETRO-03)
//   V-118-ENROLL           RE-144 enrollment (doc_id) + Status: Approved flip landed in capability matrix
//   V-118-PLATFORM-INJECT  keyless->Windows platform injection landed in error-codes index
//   V-118-REFORMAT         one-time EEE-reformat Version-History row landed in capability matrix (META-04)
//   V-118-TABLE-REMEDIATION per-table prose "Table summary:" landed in capability matrix (SC2 / P-02)
//   V-118-SELF             CHAIN_PHASES does NOT include 118 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-118.mjs [--verbose]
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

const DELIVERABLE_MATRIX   = 'docs/reference/android-capability-matrix.md';
const DELIVERABLE_ERRCODES = 'docs/error-codes/00-index.md';

const REFORMAT_ROW = 'v1.15 EEE reformat — content not re-reviewed';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-118-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-MATRIX', DELIVERABLE_MATRIX, 'RETRO-03');
presence('PRESENCE-ERRCODES', DELIVERABLE_ERRCODES, 'RETRO-03');

// === V-118-ENROLL: RE-144 enrollment (doc_id) + Status: Approved flip landed in capability matrix ===
checks.push({
  id: 'ENROLL',
  name: 'V-118-ENROLL: RE-144 enrollment + Status: Approved present in ' + DELIVERABLE_MATRIX,
  run() {
    const c = readFile(DELIVERABLE_MATRIX);
    if (c === null) return { pass: false, detail: DELIVERABLE_MATRIX + ' missing' };
    if (!c.includes('doc_id: RE-144')) return { pass: false, detail: 'ENROLL needle absent: doc_id: RE-144' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'ENROLL needle absent: status: Approved' };
    return { pass: true, detail: 'RE-144 enrolled + Status: Approved (registry-flip-to-Approved event)' };
  }
});

// === V-118-PLATFORM-INJECT: keyless->Windows platform injection landed in error-codes index ===
checks.push({
  id: 'PLATFORM-INJECT',
  name: 'V-118-PLATFORM-INJECT: keyless->Windows platform injection present in ' + DELIVERABLE_ERRCODES,
  run() {
    const c = readFile(DELIVERABLE_ERRCODES);
    if (c === null) return { pass: false, detail: DELIVERABLE_ERRCODES + ' missing' };
    if (!c.includes('platform: Windows')) return { pass: false, detail: 'PLATFORM-INJECT needle absent: platform: Windows' };
    return { pass: true, detail: 'keyless->Windows platform injection landed (D1-resolvable)' };
  }
});

// === V-118-REFORMAT: one-time EEE-reformat Version-History row landed in capability matrix (META-04) ===
checks.push({
  id: 'REFORMAT',
  name: 'V-118-REFORMAT: EEE-reformat Version-History row present in ' + DELIVERABLE_MATRIX,
  run() {
    const c = readFile(DELIVERABLE_MATRIX);
    if (c === null) return { pass: false, detail: DELIVERABLE_MATRIX + ' missing' };
    if (!c.includes(REFORMAT_ROW)) return { pass: false, detail: 'REFORMAT needle absent: ' + REFORMAT_ROW };
    return { pass: true, detail: 'one-time "v1.15 EEE reformat" Version-History row present' };
  }
});

// === V-118-TABLE-REMEDIATION: per-table prose "Table summary:" landed in capability matrix (SC2 / P-02) ===
checks.push({
  id: 'TABLE-REMEDIATION',
  name: 'V-118-TABLE-REMEDIATION: per-table prose summary present in ' + DELIVERABLE_MATRIX,
  run() {
    const c = readFile(DELIVERABLE_MATRIX);
    if (c === null) return { pass: false, detail: DELIVERABLE_MATRIX + ' missing' };
    const needle = 'Table summary:';
    if (!c.includes(needle)) return { pass: false, detail: 'TABLE-REMEDIATION needle absent: ' + needle };
    return { pass: true, detail: 'per-table prose summary present (D-118-1 P-02 chunk-boundary protection)' };
  }
});

// === V-118-SELF: dual-invariant guard (CHAIN_PHASES excludes 118; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-118-SELF: CHAIN_PHASES does NOT include 118; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(118)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 118 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (118 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-101.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-118 -- Phase 118 deliverables (Reference Doc Retrofit + Table Remediation -- ~26 docs)\n');
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
