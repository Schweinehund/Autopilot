#!/usr/bin/env node
// check-phase-109.mjs -- Phase 109 deliverables (802.1X Integration -- Capability Matrices + Navigation Hubs)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): NO retroactive 109-NEEDLE-SPEC.md was authored.
//
// WHY content needles are load-bearing: Phase 109 is pure navigation wiring into PRE-EXISTING files
// (capability matrices + nav hubs). A bare PRESENCE check on those files is trivially green on their
// pre-109 bytes. Per D-01 land-not-preexisting, we needle ONLY the strings that LANDED in Phase 109
// (6306da8 + nav commits): the Network-Auth (802.1X) matrix row + the 802.1X-Triage nav-hub entry.
//
// Assertion classes:
//   V-109-ROW-COMPARE   Network-Auth (802.1X) row landed in 4-platform-capability-comparison.md (DOT1X-11)
//   V-109-ROW-ANDROID   Network-Auth (802.1X) row landed in android-capability-matrix.md
//   V-109-NAVHUB        802.1X-Triage nav-hub entry landed in quick-ref-l1.md
//   V-109-SELF          CHAIN_PHASES does NOT include 109 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-109.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { readAtV116Close } from './_lib/frozen-at-close.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const MATRIX_COMPARE = 'docs/reference/4-platform-capability-comparison.md';
const MATRIX_ANDROID = 'docs/reference/android-capability-matrix.md';
const NAVHUB_L1 = 'docs/quick-ref-l1.md';

const checks = [];

// === V-109-ROW-COMPARE: Network-Auth row landed in the 5-platform comparison (land-not-preexisting) ===
checks.push({
  id: 'ROW-COMPARE',
  name: 'V-109-ROW-COMPARE: Network-Auth (802.1X) row landed in comparison matrix (DOT1X-11)',
  run() {
    const c = readFile(MATRIX_COMPARE);
    if (c === null) return { pass: false, detail: MATRIX_COMPARE + ' missing' };
    const needle = '| Network Authentication (802.1X) | Supported — [matrix](linux-capability-matrix.md#configuration)';
    if (!c.includes(needle)) return { pass: false, detail: 'ROW-COMPARE needle absent: ' + needle };
    return { pass: true, detail: 'Network-Auth row present in comparison matrix' };
  }
});

// === V-109-ROW-ANDROID: Network-Auth row landed in the android mode-columned matrix (6306da8) ===
checks.push({
  id: 'ROW-ANDROID',
  name: 'V-109-ROW-ANDROID: Network-Auth (802.1X) row landed in android-capability-matrix.md',
  run() {
    // Phase 128 D-128-C frozen-aware conversion: android-capability-matrix.md is HYG-02-touched;
    // read frozen (V116=3dd2512) instead of live HEAD. Expected needle UNCHANGED (no value-mask);
    // only the read SOURCE moved live -> frozen. Honest-accounting: .planning/phases/128-*/128-03-SUMMARY.md.
    let c;
    try { c = readAtV116Close(MATRIX_ANDROID); } catch { c = null; }
    if (c === null) return { pass: false, detail: MATRIX_ANDROID + ' missing (frozen V116 read failed)' };
    const needle = '| Network Authentication (802.1X) | Partial — [guide](../admin-setup-8021x/06-android.md)';
    if (!c.includes(needle)) return { pass: false, detail: 'ROW-ANDROID needle absent: ' + needle };
    return { pass: true, detail: 'Network-Auth row present in android matrix' };
  }
});

// === V-109-NAVHUB: 802.1X-Triage nav-hub entry landed in quick-ref-l1.md ===
checks.push({
  id: 'NAVHUB',
  name: 'V-109-NAVHUB: 802.1X-Triage nav-hub entry landed in quick-ref-l1.md',
  run() {
    const c = readFile(NAVHUB_L1);
    if (c === null) return { pass: false, detail: NAVHUB_L1 + ' missing' };
    const needle = '[802.1X Triage](decision-trees/10-8021x-triage.md) — 802.1X authentication failure symptom routing (cross-platform)';
    if (!c.includes(needle)) return { pass: false, detail: 'NAVHUB needle absent: ' + needle };
    return { pass: true, detail: '802.1X-Triage nav-hub entry present' };
  }
});

checks.push({
  id: 'SELF',
  name: 'V-109-SELF: CHAIN_PHASES does NOT include 109; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(109)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 109 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (109 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-109 -- Phase 109 deliverables (802.1X Integration -- Capability Matrices + Navigation Hubs)\n');
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
