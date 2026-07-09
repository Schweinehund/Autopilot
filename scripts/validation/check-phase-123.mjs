#!/usr/bin/env node
// check-phase-123.mjs -- Phase 123 deliverables (Orphan Nav-Hub Retrofit, Navigation-Last)
//
// v1.16 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-125.mjs).
// NEEDLES DERIVED INLINE from 123-VERIFICATION.md (Required Artifacts / Observable Truths): the
// RE-218/RE-219 nav-hub enrollments (docs/common-issues.md, docs/index.md), the new standalone
// check-nav-hub-links.mjs validator (RETRO-06), and the dead-anchor link fix
// (#compliance-failure-or-access-blocked) landed in docs/common-issues.md.
//
// Assertion classes:
//   V-123-PRESENCE-INDEX     docs/index.md exists + non-empty (RETRO-06)
//   V-123-ENROLL-219         RE-219 enrollment (doc_id) landed in docs/index.md
//   V-123-ENROLL-218         RE-218 enrollment (doc_id) landed in docs/common-issues.md
//   V-123-LINKCHECKER        scripts/validation/check-nav-hub-links.mjs exists (new standalone validator, D-01)
//   V-123-ANCHORFIX          #compliance-failure-or-access-blocked anchor fix landed in docs/common-issues.md
//   V-123-SELF               CHAIN_PHASES does NOT include 123 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-123.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-125.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_INDEX          = 'docs/index.md';
const DELIVERABLE_COMMON_ISSUES  = 'docs/common-issues.md';
const DELIVERABLE_LINKCHECKER    = 'scripts/validation/check-nav-hub-links.mjs';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-123-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-INDEX', DELIVERABLE_INDEX, 'RETRO-06');

// === V-123-ENROLL-219: RE-219 enrollment (doc_id) landed in docs/index.md ===
checks.push({
  id: 'ENROLL-219',
  name: 'V-123-ENROLL-219: RE-219 enrollment present in ' + DELIVERABLE_INDEX,
  run() {
    const c = readFile(DELIVERABLE_INDEX);
    if (c === null) return { pass: false, detail: DELIVERABLE_INDEX + ' missing' };
    if (!c.includes('doc_id: RE-219')) return { pass: false, detail: 'ENROLL-219 needle absent: doc_id: RE-219' };
    return { pass: true, detail: 'RE-219 enrolled (RETRO-06)' };
  }
});

// === V-123-ENROLL-218: RE-218 enrollment (doc_id) landed in docs/common-issues.md ===
checks.push({
  id: 'ENROLL-218',
  name: 'V-123-ENROLL-218: RE-218 enrollment present in ' + DELIVERABLE_COMMON_ISSUES,
  run() {
    const c = readFile(DELIVERABLE_COMMON_ISSUES);
    if (c === null) return { pass: false, detail: DELIVERABLE_COMMON_ISSUES + ' missing' };
    if (!c.includes('doc_id: RE-218')) return { pass: false, detail: 'ENROLL-218 needle absent: doc_id: RE-218' };
    return { pass: true, detail: 'RE-218 enrolled (RETRO-06)' };
  }
});

presence('LINKCHECKER', DELIVERABLE_LINKCHECKER, 'D-01 new standalone validator');

// === V-123-ANCHORFIX: dead-anchor link fix landed in docs/common-issues.md ===
checks.push({
  id: 'ANCHORFIX',
  name: 'V-123-ANCHORFIX: #compliance-failure-or-access-blocked anchor present in ' + DELIVERABLE_COMMON_ISSUES,
  run() {
    const c = readFile(DELIVERABLE_COMMON_ISSUES);
    if (c === null) return { pass: false, detail: DELIVERABLE_COMMON_ISSUES + ' missing' };
    const needle = '#compliance-failure-or-access-blocked';
    if (!c.includes(needle)) return { pass: false, detail: 'ANCHORFIX needle absent: ' + needle };
    return { pass: true, detail: 'dead-anchor link fix landed (SC2)' };
  }
});

// === V-123-SELF: dual-invariant guard (CHAIN_PHASES excludes 123; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-123-SELF: CHAIN_PHASES does NOT include 123; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(123)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 123 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (123 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-118.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-123 -- Phase 123 deliverables (Orphan Nav-Hub Retrofit, Navigation-Last)\n');
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
