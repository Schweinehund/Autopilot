#!/usr/bin/env node
// check-phase-122.mjs -- Phase 122 deliverables (Structural Retrofit -- Decision-Trees, Carved-Mermaid Files)
//
// v1.16 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-125.mjs).
// NEEDLES DERIVED INLINE from 122-VERIFICATION.md (Required Artifacts / Observable Truths): the
// docs/decision-trees/10-8021x-triage.md RE-217 enrollment (SC1 exemplar), the Mermaid-resolved
// (zero-fence) state of docs/decision-trees/00-initial-triage.md (SC1), the RE-116 admin-setup
// carved-mermaid enrollment (SC3), and the RE-190..206-range Mermaid-bearing lifecycle files
// (docs/lifecycle/00-overview.md) flipping to Approved with Mermaid resolved (SC5 / RETRO-07 close).
//
// Assertion classes:
//   V-122-PRESENCE-DECISIONTREE  docs/decision-trees/10-8021x-triage.md exists + non-empty (RETRO-05)
//   V-122-ENROLL-DECISIONTREE    RE-217 enrollment (doc_id) + Status: Approved landed (SC1)
//   V-122-NOMERMAID-DECISIONTREE docs/decision-trees/00-initial-triage.md has ZERO ```mermaid fences (SC1)
//   V-122-CARVEDMERMAID          RE-116 enrollment (doc_id) + Status: Approved landed in admin-setup-macos/00-overview.md (SC3 / RETRO-08)
//   V-122-LIFECYCLE-RESOLVED     docs/lifecycle/00-overview.md Status: Approved AND zero ```mermaid fences (SC5 / RETRO-07 close)
//   V-122-SELF                   CHAIN_PHASES does NOT include 122 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-122.mjs [--verbose]
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

const DELIVERABLE_TRIAGE_8021X = 'docs/decision-trees/10-8021x-triage.md';
const DELIVERABLE_TRIAGE_INITIAL = 'docs/decision-trees/00-initial-triage.md';
const DELIVERABLE_CARVED_MACOS = 'docs/admin-setup-macos/00-overview.md';
const DELIVERABLE_LIFECYCLE_OVERVIEW = 'docs/lifecycle/00-overview.md';

const MERMAID_FENCE = '```mermaid';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-122-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-DECISIONTREE', DELIVERABLE_TRIAGE_8021X, 'RETRO-05');

// === V-122-ENROLL-DECISIONTREE: RE-217 enrollment (doc_id) + Status: Approved landed ===
checks.push({
  id: 'ENROLL-DECISIONTREE',
  name: 'V-122-ENROLL-DECISIONTREE: RE-217 enrollment + status: Approved present in ' + DELIVERABLE_TRIAGE_8021X,
  run() {
    const c = readFile(DELIVERABLE_TRIAGE_8021X);
    if (c === null) return { pass: false, detail: DELIVERABLE_TRIAGE_8021X + ' missing' };
    if (!c.includes('doc_id: RE-217')) return { pass: false, detail: 'ENROLL-DECISIONTREE needle absent: doc_id: RE-217' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'ENROLL-DECISIONTREE needle absent: status: Approved' };
    return { pass: true, detail: 'RE-217 enrolled + status: Approved (SC1)' };
  }
});

// === V-122-NOMERMAID-DECISIONTREE: 00-initial-triage.md has ZERO ```mermaid fences ===
checks.push({
  id: 'NOMERMAID-DECISIONTREE',
  name: 'V-122-NOMERMAID-DECISIONTREE: zero ' + MERMAID_FENCE + ' fences in ' + DELIVERABLE_TRIAGE_INITIAL,
  run() {
    const c = readFile(DELIVERABLE_TRIAGE_INITIAL);
    if (c === null) return { pass: false, detail: DELIVERABLE_TRIAGE_INITIAL + ' missing' };
    if (c.includes(MERMAID_FENCE)) return { pass: false, detail: 'NOMERMAID-DECISIONTREE regression: ' + MERMAID_FENCE + ' fence present' };
    return { pass: true, detail: 'zero ' + MERMAID_FENCE + ' fences (Mermaid resolved per STD-04, SC1)' };
  }
});

// === V-122-CARVEDMERMAID: RE-116 enrollment + Status: Approved landed in admin-setup-macos/00-overview.md ===
checks.push({
  id: 'CARVEDMERMAID',
  name: 'V-122-CARVEDMERMAID: RE-116 enrollment + status: Approved present in ' + DELIVERABLE_CARVED_MACOS,
  run() {
    const c = readFile(DELIVERABLE_CARVED_MACOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_CARVED_MACOS + ' missing' };
    if (!c.includes('doc_id: RE-116')) return { pass: false, detail: 'CARVEDMERMAID needle absent: doc_id: RE-116' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'CARVEDMERMAID needle absent: status: Approved' };
    return { pass: true, detail: 'RE-116 enrolled + status: Approved (SC3 / RETRO-08 carved-mermaid)' };
  }
});

// === V-122-LIFECYCLE-RESOLVED: docs/lifecycle/00-overview.md Approved AND zero mermaid fences ===
checks.push({
  id: 'LIFECYCLE-RESOLVED',
  name: 'V-122-LIFECYCLE-RESOLVED: status: Approved + zero ' + MERMAID_FENCE + ' fences in ' + DELIVERABLE_LIFECYCLE_OVERVIEW,
  run() {
    const c = readFile(DELIVERABLE_LIFECYCLE_OVERVIEW);
    if (c === null) return { pass: false, detail: DELIVERABLE_LIFECYCLE_OVERVIEW + ' missing' };
    if (!c.includes('status: Approved')) return { pass: false, detail: 'LIFECYCLE-RESOLVED needle absent: status: Approved' };
    if (c.includes(MERMAID_FENCE)) return { pass: false, detail: 'LIFECYCLE-RESOLVED regression: ' + MERMAID_FENCE + ' fence present' };
    return { pass: true, detail: 'status: Approved + zero ' + MERMAID_FENCE + ' fences (SC5 / RETRO-07 close)' };
  }
});

// === V-122-SELF: dual-invariant guard (CHAIN_PHASES excludes 122; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-122-SELF: CHAIN_PHASES does NOT include 122; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(122)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 122 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (122 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-118.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-122 -- Phase 122 deliverables (Structural Retrofit -- Decision-Trees, Carved-Mermaid Files)\n');
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
