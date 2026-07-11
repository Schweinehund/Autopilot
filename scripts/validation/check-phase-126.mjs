#!/usr/bin/env node
// check-phase-126.mjs -- Phase 126 deliverables (Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes)
//
// v1.17 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-128.mjs).
// NEEDLES DERIVED INLINE from 126-VERIFICATION.md (Required Artifacts / Observable Truths): the
// build-publish-bundle.mjs batch orchestrator (PUB-01..04), the build-filename-map.mjs parseRegistry
// export it imports, the regenerated filename-map.md, the CR-01 duplicate-Doc-ID fail-closed fix
// (checkDocIdUniqueness), and the guard-docx.mjs fail-closed wiring (guardOne).
//
// Assertion classes:
//   V-126-PRESENCE-BUNDLE     scripts/pipeline/build-publish-bundle.mjs exists + non-empty (PUB-01..04)
//   V-126-PRESENCE-FILENAMEMAP-LIB  scripts/pipeline/build-filename-map.mjs exists + non-empty (PARSEREGISTRY export)
//   V-126-PRESENCE-FILENAMEMAP  scripts/pipeline/filename-map.md exists + non-empty (PUB-03 regenerated map)
//   V-126-PARSEREGISTRY        parseRegistry export landed in build-filename-map.mjs (registry-driven selection)
//   V-126-GUARDONE             guardOne fail-closed wiring landed in build-publish-bundle.mjs (PUB-02)
//   V-126-DOCIDUNIQ            checkDocIdUniqueness landed in build-publish-bundle.mjs (CR-01 review-blocker fix)
//   V-126-SELF                 CHAIN_PHASES does NOT include 126 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-126.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-128.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_BUNDLE          = 'scripts/pipeline/build-publish-bundle.mjs';
const DELIVERABLE_FILENAMEMAP_LIB = 'scripts/pipeline/build-filename-map.mjs';
const DELIVERABLE_FILENAMEMAP     = 'scripts/pipeline/filename-map.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-126-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-BUNDLE', DELIVERABLE_BUNDLE, 'PUB-01..04 batch orchestrator');
presence('PRESENCE-FILENAMEMAP-LIB', DELIVERABLE_FILENAMEMAP_LIB, 'parseRegistry export');
presence('PRESENCE-FILENAMEMAP', DELIVERABLE_FILENAMEMAP, 'PUB-03 regenerated map');

// === V-126-PARSEREGISTRY: parseRegistry export landed in build-filename-map.mjs ===
checks.push({
  id: 'PARSEREGISTRY',
  name: 'V-126-PARSEREGISTRY: parseRegistry export present in ' + DELIVERABLE_FILENAMEMAP_LIB,
  run() {
    const c = readFile(DELIVERABLE_FILENAMEMAP_LIB);
    if (c === null) return { pass: false, detail: DELIVERABLE_FILENAMEMAP_LIB + ' missing' };
    if (!c.includes('parseRegistry')) return { pass: false, detail: 'PARSEREGISTRY needle absent: parseRegistry' };
    return { pass: true, detail: 'parseRegistry export present (registry-driven selection, PUB-01)' };
  }
});

// === V-126-GUARDONE: guardOne fail-closed wiring landed in build-publish-bundle.mjs (PUB-02) ===
checks.push({
  id: 'GUARDONE',
  name: 'V-126-GUARDONE: guardOne present in ' + DELIVERABLE_BUNDLE,
  run() {
    const c = readFile(DELIVERABLE_BUNDLE);
    if (c === null) return { pass: false, detail: DELIVERABLE_BUNDLE + ' missing' };
    if (!c.includes('guardOne')) return { pass: false, detail: 'GUARDONE needle absent: guardOne' };
    return { pass: true, detail: 'guardOne fail-closed guard-docx.mjs wiring present (PUB-02)' };
  }
});

// === V-126-DOCIDUNIQ: checkDocIdUniqueness landed in build-publish-bundle.mjs (CR-01 fix) ===
checks.push({
  id: 'DOCIDUNIQ',
  name: 'V-126-DOCIDUNIQ: checkDocIdUniqueness present in ' + DELIVERABLE_BUNDLE,
  run() {
    const c = readFile(DELIVERABLE_BUNDLE);
    if (c === null) return { pass: false, detail: DELIVERABLE_BUNDLE + ' missing' };
    if (!c.includes('checkDocIdUniqueness')) return { pass: false, detail: 'DOCIDUNIQ needle absent: checkDocIdUniqueness' };
    return { pass: true, detail: 'checkDocIdUniqueness CR-01 review-blocker fix present' };
  }
});

// === V-126-SELF: dual-invariant guard (CHAIN_PHASES excludes 126; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-126-SELF: CHAIN_PHASES does NOT include 126; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(126)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 126 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (126 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-123.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-126 -- Phase 126 deliverables (Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes)\n');
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
