#!/usr/bin/env node
// check-phase-132.mjs -- Phase 132 deliverables (Integration & Navigation-Last Close)
//
// v1.18 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-134.mjs).
// NEEDLES DERIVED INLINE from 132-VERIFICATION.md (Required Artifacts / Observable Truths): both
// recipes' RE-index rows at Status: Approved (CLASS-03), the regenerated filename-map.md entries
// (CLASS-03), the docs/index.md "Device Configuration Recipes" nav section (CLASS-04), and
// confirmation that the L1/L2 troubleshooting hubs remain NOT wired to the new recipes (CLASS-04).
//
// Assertion classes:
//   V-132-REGISTRY       RE-index.md carries RE-222 + RE-223 rows at Status: Approved (CLASS-03)
//   V-132-FILENAMEMAP     filename-map.md lists RE-222 + RE-223 (CLASS-03, regenerated map)
//   V-132-INDEXNAV        docs/index.md carries the "Device Configuration Recipes" section (CLASS-04)
//   V-132-HUBSNOTWIRED    common-issues.md / quick-ref-l1.md / quick-ref-l2.md do NOT reference recipes
//   V-132-SELF            CHAIN_PHASES does NOT include 132 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-132.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-134.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_REINDEX      = 'docs/_registry/RE-index.md';
const DELIVERABLE_FILENAMEMAP  = 'scripts/pipeline/filename-map.md';
const DELIVERABLE_INDEX        = 'docs/index.md';
const HUB_FILES = ['docs/common-issues.md', 'docs/quick-ref-l1.md', 'docs/quick-ref-l2.md'];

const checks = [];

// === V-132-REGISTRY: RE-index.md carries RE-222 + RE-223 rows at Status: Approved (CLASS-03) ===
checks.push({
  id: 'REGISTRY',
  name: 'V-132-REGISTRY: RE-222 + RE-223 rows at Status Approved present in ' + DELIVERABLE_REINDEX,
  run() {
    const c = readFile(DELIVERABLE_REINDEX);
    if (c === null) return { pass: false, detail: DELIVERABLE_REINDEX + ' missing' };
    if (!/RE-222[^\n]*Approved/.test(c)) {
      return { pass: false, detail: 'REGISTRY needle absent: RE-222 row at Status: Approved' };
    }
    if (!/RE-223[^\n]*Approved/.test(c)) {
      return { pass: false, detail: 'REGISTRY needle absent: RE-223 row at Status: Approved' };
    }
    return { pass: true, detail: 'RE-222 + RE-223 both present at Status: Approved (CLASS-03)' };
  }
});

// === V-132-FILENAMEMAP: filename-map.md lists RE-222 + RE-223 (CLASS-03, regenerated map) ===
checks.push({
  id: 'FILENAMEMAP',
  name: 'V-132-FILENAMEMAP: RE-222 + RE-223 present in ' + DELIVERABLE_FILENAMEMAP,
  run() {
    const c = readFile(DELIVERABLE_FILENAMEMAP);
    if (c === null) return { pass: false, detail: DELIVERABLE_FILENAMEMAP + ' missing' };
    if (!c.includes('RE-222')) return { pass: false, detail: 'FILENAMEMAP needle absent: RE-222' };
    if (!c.includes('RE-223')) return { pass: false, detail: 'FILENAMEMAP needle absent: RE-223' };
    return { pass: true, detail: 'RE-222 + RE-223 both present in regenerated filename-map.md (CLASS-03)' };
  }
});

// === V-132-INDEXNAV: docs/index.md carries the "Device Configuration Recipes" section (CLASS-04) ===
checks.push({
  id: 'INDEXNAV',
  name: 'V-132-INDEXNAV: "Device Configuration Recipes" section present in ' + DELIVERABLE_INDEX,
  run() {
    const c = readFile(DELIVERABLE_INDEX);
    if (c === null) return { pass: false, detail: DELIVERABLE_INDEX + ' missing' };
    if (!c.includes('## Device Configuration Recipes')) {
      return { pass: false, detail: 'INDEXNAV needle absent: "## Device Configuration Recipes"' };
    }
    return { pass: true, detail: 'Device Configuration Recipes nav section present (CLASS-04, navigation-last)' };
  }
});

// === V-132-HUBSNOTWIRED: L1/L2 troubleshooting hubs do NOT reference the new recipes ===
checks.push({
  id: 'HUBSNOTWIRED',
  name: 'V-132-HUBSNOTWIRED: ' + HUB_FILES.join(', ') + ' do NOT reference docs/recipes',
  run() {
    const hits = [];
    for (const hub of HUB_FILES) {
      const c = readFile(hub);
      if (c === null) continue; // graceful skip: hub file absent is out of this check's scope
      if (/docs\/recipes|01-shared-windows-avd|02-shared-ipad/.test(c)) hits.push(hub);
    }
    if (hits.length > 0) {
      return { pass: false, detail: 'HUBSNOTWIRED regression: recipes referenced in ' + hits.join(', ') + ' (recipes are provisioning Guides, not troubleshooting docs)' };
    }
    return { pass: true, detail: 'common-issues.md / quick-ref-l1.md / quick-ref-l2.md confirmed NOT wired to recipes' };
  }
});

// === V-132-SELF: dual-invariant guard (CHAIN_PHASES excludes 132; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-132-SELF: CHAIN_PHASES does NOT include 132; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(132)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 132 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (132 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-126.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-132 -- Phase 132 deliverables (Integration & Navigation-Last Close)\n');
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
