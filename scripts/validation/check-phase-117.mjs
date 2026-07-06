#!/usr/bin/env node
// check-phase-117.mjs -- Phase 117 deliverables (Admin-Setup Guide Retrofit -- all platforms)
//
// v1.15 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-119.mjs).
// NEEDLES DERIVED INLINE from 117-VERIFICATION.md (Required Artifacts / Observable Truths): the admin-setup
// registry-flip-to-Approved event on representative guides + the one-time EEE-reformat Version-History row
// (RETRO-02 SC1/SC3/SC4). SC-ENROLL / SC-REFORMAT needle convention per 118-PATTERNS.md.
//
// WHY content needles are load-bearing: a bare PRESENCE check on the admin-setup dirs is trivially green
// once the files exist. The content needles pin RETRO-02 landed strings -- the RE-108/RE-117 enrollment +
// Status: Approved flip on the ABM guides (both were 2-blockquote Pitfall-1 relocation cases) and the
// "v1.15 EEE reformat -- content not re-reviewed" row -- so a regression that reverts the retrofit is caught.
//
// Assertion classes:
//   V-117-PRESENCE-IOS      docs/admin-setup-ios/02-abm-token.md exists + non-empty (RETRO-02)
//   V-117-PRESENCE-MACOS    docs/admin-setup-macos/01-abm-configuration.md exists + non-empty (RETRO-02)
//   V-117-ENROLL-IOS       RE-108 enrollment (doc_id) + Status: Approved flip landed in iOS ABM guide
//   V-117-ENROLL-MACOS     RE-117 enrollment (doc_id) + Status: Approved flip landed in macOS ABM guide
//   V-117-REFORMAT         one-time EEE-reformat Version-History row landed in iOS ABM guide (META-04)
//   V-117-SELF             CHAIN_PHASES does NOT include 117 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-117.mjs [--verbose]
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

const DELIVERABLE_IOS   = 'docs/admin-setup-ios/02-abm-token.md';
const DELIVERABLE_MACOS = 'docs/admin-setup-macos/01-abm-configuration.md';

const REFORMAT_ROW = 'v1.15 EEE reformat — content not re-reviewed';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-117-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-IOS', DELIVERABLE_IOS, 'RETRO-02');
presence('PRESENCE-MACOS', DELIVERABLE_MACOS, 'RETRO-02');

// === V-117-ENROLL-IOS: RE-108 enrollment (doc_id) + Status: Approved flip landed in iOS ABM guide ===
checks.push({
  id: 'ENROLL-IOS',
  name: 'V-117-ENROLL-IOS: RE-108 enrollment + Status: Approved present in ' + DELIVERABLE_IOS,
  run() {
    const c = readFile(DELIVERABLE_IOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_IOS + ' missing' };
    if (!c.includes('doc_id: RE-108')) return { pass: false, detail: 'ENROLL-IOS needle absent: doc_id: RE-108' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'ENROLL-IOS needle absent: status: Approved' };
    return { pass: true, detail: 'RE-108 enrolled + Status: Approved (registry-flip-to-Approved event)' };
  }
});

// === V-117-ENROLL-MACOS: RE-117 enrollment (doc_id) + Status: Approved flip landed in macOS ABM guide ===
checks.push({
  id: 'ENROLL-MACOS',
  name: 'V-117-ENROLL-MACOS: RE-117 enrollment + Status: Approved present in ' + DELIVERABLE_MACOS,
  run() {
    const c = readFile(DELIVERABLE_MACOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_MACOS + ' missing' };
    if (!c.includes('doc_id: RE-117')) return { pass: false, detail: 'ENROLL-MACOS needle absent: doc_id: RE-117' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'ENROLL-MACOS needle absent: status: Approved' };
    return { pass: true, detail: 'RE-117 enrolled + Status: Approved (registry-flip-to-Approved event)' };
  }
});

// === V-117-REFORMAT: one-time EEE-reformat Version-History row landed in iOS ABM guide (META-04) ===
checks.push({
  id: 'REFORMAT',
  name: 'V-117-REFORMAT: EEE-reformat Version-History row present in ' + DELIVERABLE_IOS,
  run() {
    const c = readFile(DELIVERABLE_IOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_IOS + ' missing' };
    if (!c.includes(REFORMAT_ROW)) return { pass: false, detail: 'REFORMAT needle absent: ' + REFORMAT_ROW };
    return { pass: true, detail: 'one-time "v1.15 EEE reformat" Version-History row present' };
  }
});

// === V-117-SELF: dual-invariant guard (CHAIN_PHASES excludes 117; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-117-SELF: CHAIN_PHASES does NOT include 117; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(117)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 117 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (117 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-101.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-117 -- Phase 117 deliverables (Admin-Setup Guide Retrofit -- all platforms)\n');
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
