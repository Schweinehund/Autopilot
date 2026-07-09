#!/usr/bin/env node
// check-phase-124.mjs -- Phase 124 deliverables (Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding)
//
// v1.16 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-125.mjs).
// NEEDLES DERIVED INLINE from 124-VERIFICATION.md (Required Artifacts / Observable Truths): the
// convert.ps1 nav-footer PIPE-03 preprocessing fix, the extractCustomProperties() OQ4 custom-property
// promotion path (lib/ooxml.mjs), the descriptive-filename map (PIPE-04, filename-map.md), and the
// PIPE-05-FINDINGS.md owner-confirmed Draft-label grounding outcome.
//
// Assertion classes:
//   V-124-NAVFOOTER-FIX     "nav-footer" PIPE-03 preprocessing marker landed in convert.ps1
//   V-124-CUSTOMPROPS       extractCustomProperties() export landed in lib/ooxml.mjs (OQ4)
//   V-124-PRESENCE-FILENAMEMAP  scripts/pipeline/filename-map.md exists + non-empty (PIPE-04)
//   V-124-PIPE05-OUTCOME    PIPE-05-FINDINGS.md exists + contains owner-confirmed OUTCOME: PASS
//   V-124-SELF              CHAIN_PHASES does NOT include 124 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-124.mjs [--verbose]
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

const DELIVERABLE_CONVERT     = 'scripts/pipeline/convert.ps1';
const DELIVERABLE_OOXML       = 'scripts/pipeline/lib/ooxml.mjs';
const DELIVERABLE_FILENAMEMAP = 'scripts/pipeline/filename-map.md';
const DELIVERABLE_PIPE05      = '.planning/phases/124-pipeline-fix-descriptive-filename-pass-draft-label-grounding/PIPE-05-FINDINGS.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-124-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

// === V-124-NAVFOOTER-FIX: "nav-footer" PIPE-03 preprocessing marker landed in convert.ps1 ===
checks.push({
  id: 'NAVFOOTER-FIX',
  name: 'V-124-NAVFOOTER-FIX: nav-footer PIPE-03 preprocessing marker present in ' + DELIVERABLE_CONVERT,
  run() {
    const c = readFile(DELIVERABLE_CONVERT);
    if (c === null) return { pass: false, detail: DELIVERABLE_CONVERT + ' missing' };
    if (!c.includes('nav-footer')) return { pass: false, detail: 'NAVFOOTER-FIX needle absent: nav-footer' };
    return { pass: true, detail: 'nav-footer PIPE-03 preprocessing fix present' };
  }
});

// === V-124-CUSTOMPROPS: extractCustomProperties() export landed in lib/ooxml.mjs (OQ4) ===
checks.push({
  id: 'CUSTOMPROPS',
  name: 'V-124-CUSTOMPROPS: extractCustomProperties export present in ' + DELIVERABLE_OOXML,
  run() {
    const c = readFile(DELIVERABLE_OOXML);
    if (c === null) return { pass: false, detail: DELIVERABLE_OOXML + ' missing' };
    if (!c.includes('extractCustomProperties')) return { pass: false, detail: 'CUSTOMPROPS needle absent: extractCustomProperties' };
    return { pass: true, detail: 'extractCustomProperties() export present (OQ4 custom-property promotion path)' };
  }
});

presence('PRESENCE-FILENAMEMAP', DELIVERABLE_FILENAMEMAP, 'PIPE-04');

// === V-124-PIPE05-OUTCOME: PIPE-05-FINDINGS.md owner-confirmed OUTCOME: PASS ===
checks.push({
  id: 'PIPE05-OUTCOME',
  name: 'V-124-PIPE05-OUTCOME: owner-confirmed OUTCOME: PASS present in ' + DELIVERABLE_PIPE05,
  run() {
    const c = readFile(DELIVERABLE_PIPE05);
    if (c === null) return { pass: false, detail: DELIVERABLE_PIPE05 + ' missing' };
    if (!c.includes('OUTCOME: PASS')) return { pass: false, detail: 'PIPE05-OUTCOME needle absent: OUTCOME: PASS' };
    return { pass: true, detail: 'owner-confirmed Draft-label grounding OUTCOME: PASS present (PIPE-05)' };
  }
});

// === V-124-SELF: dual-invariant guard (CHAIN_PHASES excludes 124; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-124-SELF: CHAIN_PHASES does NOT include 124; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(124)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 124 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (124 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-118.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-124 -- Phase 124 deliverables (Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding)\n');
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
