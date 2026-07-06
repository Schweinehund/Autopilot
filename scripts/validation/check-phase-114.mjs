#!/usr/bin/env node
// check-phase-114.mjs -- Phase 114 deliverables (EEE Standard, Templates, Doc ID Registry + Metadata Rules)
//
// v1.15 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-119.mjs).
// NEEDLES DERIVED INLINE from 114-VERIFICATION.md (Required Artifacts / Observable Truths): the landed
// EEE-block line, the D1 no-fallback rule, and the registry RE-001 row.
//
// WHY content needles are load-bearing: a bare PRESENCE check on the standard/registry files is trivially
// green once the files exist. The content needles pin STD-01/META-02/META-03/STD-03 landed strings -- the
// single-line EEE block, the "unmapped platform: is a HARD FAILURE" no-fallback rule, and the first
// contiguous registry row -- so a regression that guts the specification is caught.
//
// Assertion classes:
//   V-114-PRESENCE-STD      docs/_standards/EEE-SOP-standard.md exists + non-empty (STD-01)
//   V-114-PRESENCE-REGISTRY docs/_registry/RE-index.md exists + non-empty (STD-03)
//   V-114-PRESENCE-REFTPL   docs/_templates/reference-template.md exists + non-empty (STD-02)
//   V-114-STD-BLOCK         single-line EEE block (STD-001) landed in EEE-SOP-standard.md
//   V-114-D1-NOFALLBACK     D1 unmapped=HARD FAILURE no-fallback rule landed in EEE-SOP-standard.md (META-03)
//   V-114-REGISTRY-ROW      RE-001 contiguous-registry row landed in RE-index.md (STD-03)
//   V-114-SELF              CHAIN_PHASES does NOT include 114 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-114.mjs [--verbose]
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

const DELIVERABLE_STD      = 'docs/_standards/EEE-SOP-standard.md';
const DELIVERABLE_REGISTRY = 'docs/_registry/RE-index.md';
const DELIVERABLE_REFTPL   = 'docs/_templates/reference-template.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-114-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-STD', DELIVERABLE_STD, 'STD-01');
presence('PRESENCE-REGISTRY', DELIVERABLE_REGISTRY, 'STD-03');
presence('PRESENCE-REFTPL', DELIVERABLE_REFTPL, 'STD-02');

// === V-114-STD-BLOCK: single-line EEE block (STD-001) landed in EEE-SOP-standard.md ===
checks.push({
  id: 'STD-BLOCK',
  name: 'V-114-STD-BLOCK: single-line EEE block present in ' + DELIVERABLE_STD,
  run() {
    const c = readFile(DELIVERABLE_STD);
    if (c === null) return { pass: false, detail: DELIVERABLE_STD + ' missing' };
    const needle = '**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** STD-001 · **Status:** Approved';
    if (!c.includes(needle)) return { pass: false, detail: 'STD-BLOCK needle absent: ' + needle };
    return { pass: true, detail: 'single-line EEE block present' };
  }
});

// === V-114-D1-NOFALLBACK: D1 no-fallback rule landed in EEE-SOP-standard.md (META-03) ===
checks.push({
  id: 'D1-NOFALLBACK',
  name: 'V-114-D1-NOFALLBACK: D1 unmapped=HARD FAILURE no-fallback rule present in ' + DELIVERABLE_STD,
  run() {
    const c = readFile(DELIVERABLE_STD);
    if (c === null) return { pass: false, detail: DELIVERABLE_STD + ' missing' };
    const needle = 'An unmapped `platform:` value is a HARD FAILURE. There is NO silent fallback.';
    if (!c.includes(needle)) return { pass: false, detail: 'D1-NOFALLBACK needle absent: ' + needle };
    return { pass: true, detail: 'D1 no-fallback (unmapped = HARD FAILURE) rule present' };
  }
});

// === V-114-REGISTRY-ROW: RE-001 contiguous-registry row landed in RE-index.md (STD-03) ===
checks.push({
  id: 'REGISTRY-ROW',
  name: 'V-114-REGISTRY-ROW: RE-001 registry row present in ' + DELIVERABLE_REGISTRY,
  run() {
    const c = readFile(DELIVERABLE_REGISTRY);
    if (c === null) return { pass: false, detail: DELIVERABLE_REGISTRY + ' missing' };
    const needle = '| RE-001 | docs/l1-runbooks/00-index.md |';
    if (!c.includes(needle)) return { pass: false, detail: 'REGISTRY-ROW needle absent: ' + needle };
    return { pass: true, detail: 'RE-001 registry row present (contiguous Doc-ID assignment)' };
  }
});

// === V-114-SELF: dual-invariant guard (CHAIN_PHASES excludes 114; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-114-SELF: CHAIN_PHASES does NOT include 114; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(114)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 114 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (114 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-101.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-114 -- Phase 114 deliverables (EEE Standard, Templates, Doc ID Registry + Metadata Rules)\n');
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
