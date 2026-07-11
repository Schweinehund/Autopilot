#!/usr/bin/env node
// check-phase-121.mjs -- Phase 121 deliverables (Structural Retrofit -- Glossaries, Lifecycle & End-User Guides)
//
// v1.16 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-125.mjs).
// NEEDLES DERIVED INLINE from 121-VERIFICATION.md (Required Artifacts / Observable Truths): the 6
// docs/_glossary*.md files carrying doc_type: Reference (RETRO-04), the RE-175/176 end-user-guide
// registry-Approved flips (RETRO-09), and the one-time v1.16 EEE-reformat Version-History row.
//
// Assertion classes:
//   V-121-PRESENCE-GLOSSARY  docs/_glossary.md exists + non-empty (RETRO-04)
//   V-121-GLOSSARY-DOCTYPE   doc_type: Reference + status: Approved landed in docs/_glossary.md
//   V-121-ENDUSERGUIDE-175   RE-175 enrollment (doc_id) + Status: Approved landed in android-work-profile-setup.md
//   V-121-ENDUSERGUIDE-176   RE-176 enrollment (doc_id) landed in linux-intune-portal-enrollment.md
//   V-121-VHROW              one-time "v1.16 EEE reformat" Version-History row landed in docs/_glossary-android.md
//   V-121-SELF               CHAIN_PHASES does NOT include 121 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-121.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-125.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_GLOSSARY   = 'docs/_glossary.md';
const DELIVERABLE_GLOSSARY_ANDROID = 'docs/_glossary-android.md';
const DELIVERABLE_EUG_175    = 'docs/end-user-guides/android-work-profile-setup.md';
const DELIVERABLE_EUG_176    = 'docs/end-user-guides/linux-intune-portal-enrollment.md';

const VHROW = 'v1.16 EEE reformat';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-121-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-GLOSSARY', DELIVERABLE_GLOSSARY, 'RETRO-04');

// === V-121-GLOSSARY-DOCTYPE: doc_type: Reference + status: Approved landed in docs/_glossary.md ===
checks.push({
  id: 'GLOSSARY-DOCTYPE',
  name: 'V-121-GLOSSARY-DOCTYPE: doc_type: Reference + status: Approved present in ' + DELIVERABLE_GLOSSARY,
  run() {
    const c = readFile(DELIVERABLE_GLOSSARY);
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOSSARY + ' missing' };
    if (!c.includes('doc_type: Reference')) return { pass: false, detail: 'GLOSSARY-DOCTYPE needle absent: doc_type: Reference' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'GLOSSARY-DOCTYPE needle absent: status: Approved' };
    return { pass: true, detail: 'doc_type: Reference + status: Approved present (RETRO-04)' };
  }
});

// === V-121-ENDUSERGUIDE-175: RE-175 enrollment (doc_id) + Status: Approved landed ===
checks.push({
  id: 'ENDUSERGUIDE-175',
  name: 'V-121-ENDUSERGUIDE-175: RE-175 enrollment + status: Approved present in ' + DELIVERABLE_EUG_175,
  run() {
    const c = readFile(DELIVERABLE_EUG_175);
    if (c === null) return { pass: false, detail: DELIVERABLE_EUG_175 + ' missing' };
    if (!c.includes('doc_id: RE-175')) return { pass: false, detail: 'ENDUSERGUIDE-175 needle absent: doc_id: RE-175' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'ENDUSERGUIDE-175 needle absent: status: Approved' };
    return { pass: true, detail: 'RE-175 enrolled + status: Approved (RETRO-09)' };
  }
});

// === V-121-ENDUSERGUIDE-176: RE-176 enrollment (doc_id) landed ===
checks.push({
  id: 'ENDUSERGUIDE-176',
  name: 'V-121-ENDUSERGUIDE-176: RE-176 enrollment present in ' + DELIVERABLE_EUG_176,
  run() {
    const c = readFile(DELIVERABLE_EUG_176);
    if (c === null) return { pass: false, detail: DELIVERABLE_EUG_176 + ' missing' };
    if (!c.includes('doc_id: RE-176')) return { pass: false, detail: 'ENDUSERGUIDE-176 needle absent: doc_id: RE-176' };
    return { pass: true, detail: 'RE-176 enrolled (RETRO-09)' };
  }
});

// === V-121-VHROW: one-time "v1.16 EEE reformat" Version-History row landed ===
checks.push({
  id: 'VHROW',
  name: 'V-121-VHROW: "' + VHROW + '" Version-History row present in ' + DELIVERABLE_GLOSSARY_ANDROID,
  run() {
    // Phase 128 D-128-C frozen-aware conversion: docs/_glossary-android.md is HYG-02-touched;
    // read frozen (V116=3dd2512) instead of live HEAD. Expected needle UNCHANGED (no value-mask);
    // only the read SOURCE moved live -> frozen. Honest-accounting: .planning/phases/128-*/128-03-SUMMARY.md.
    let c;
    try { c = readAtV116Close(DELIVERABLE_GLOSSARY_ANDROID); } catch { c = null; }
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOSSARY_ANDROID + ' missing (frozen V116 read failed)' };
    if (!c.includes(VHROW)) return { pass: false, detail: 'VHROW needle absent: ' + VHROW };
    return { pass: true, detail: 'one-time "' + VHROW + '" Version-History row present' };
  }
});

// === V-121-SELF: dual-invariant guard (CHAIN_PHASES excludes 121; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-121-SELF: CHAIN_PHASES does NOT include 121; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(121)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 121 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (121 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-118.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-121 -- Phase 121 deliverables (Structural Retrofit -- Glossaries, Lifecycle & End-User Guides)\n');
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
