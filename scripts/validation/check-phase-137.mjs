#!/usr/bin/env node
// check-phase-137.mjs -- Phase 137 deliverables (Integration & Navigation-Last Close)
//
// v1.19 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-138.mjs).
// NEEDLE IS FULLY PRE-SPECIFIED -- copied from 137-02-SUMMARY.md's "Needle-spec handoff" section and
// STATE.md:349, not re-derived. Per-recipe, LINE-SCOPED co-presence check, NOT a whole-file c.includes():
// a whole-file `includes('Dedicated')` false-matches docs/index.md:36 (two lines above the quick-nav
// bullet), so every assertion here extracts the single matching line and tests THAT line in isolation.
//
// Assertion classes:
//   V-137-TABLEROW-03      a docs/index.md table-row line links recipes/03-windows-11-multi-app-kiosk.md
//   V-137-TABLEROW-04      a docs/index.md table-row line links recipes/04-android-dedicated-mhs-multi-app.md
//   V-137-BULLET            the single quick-nav bullet line contains both recipes' fixed prose fragments
//   V-137-HUBSNOTWIRED      common-issues.md / quick-ref-l1.md / quick-ref-l2.md do NOT reference recipes/03- or recipes/04-
//                            (corrected literals -- check-phase-132.mjs:97's own pattern does not cover
//                            recipes 03/04 and must not be edited, per 137-02-SUMMARY.md's Correction of record)
//   V-137-SELF              CHAIN_PHASES does NOT include 137 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-137.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-138.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const INDEX = 'docs/index.md';
const HUB_FILES = ['docs/common-issues.md', 'docs/quick-ref-l1.md', 'docs/quick-ref-l2.md'];

// Literals, as shipped by 137-02 (137-02-SUMMARY.md "Needle-spec handoff" / STATE.md:349) -- transcribed,
// never composed at execution time.
const TABLE_TARGET_03 = 'recipes/03-windows-11-multi-app-kiosk.md';
const TABLE_TARGET_04 = 'recipes/04-android-dedicated-mhs-multi-app.md';
const BULLET_FRAGMENT_03 = 'Windows 11 multi-app kiosk';
const BULLET_FRAGMENT_04 = 'Android Dedicated multi-app kiosk';
const HUB_LITERAL_03 = 'recipes/03-';
const HUB_LITERAL_04 = 'recipes/04-';
const BULLET_ANCHOR = /^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)/;

function tableRowCheck(id, target) {
  return {
    id,
    name: 'V-137-' + id + ': ' + INDEX + ' table row links ' + target,
    run() {
      const c = readFile(INDEX);
      if (c === null) return { pass: false, detail: INDEX + ' missing' };
      const lines = c.split('\n');
      const rowRegex = new RegExp('^\\| \\[.*\\]\\(' + target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)');
      const match = lines.find((l) => rowRegex.test(l));
      if (!match) {
        return { pass: false, detail: id + ' needle absent: no table-row line links ' + target };
      }
      return { pass: true, detail: 'table-row line links ' + target };
    }
  };
}

const checks = [];

// === V-137-TABLEROW-03 / V-137-TABLEROW-04: line-scoped table-row co-presence per recipe ===
checks.push(tableRowCheck('TABLEROW-03', TABLE_TARGET_03));
checks.push(tableRowCheck('TABLEROW-04', TABLE_TARGET_04));

// === V-137-BULLET: the single quick-nav bullet line, tested in isolation (LINE-SCOPED, never whole-file) ===
checks.push({
  id: 'BULLET',
  name: 'V-137-BULLET: single quick-nav bullet line contains both recipe fragments (line-scoped)',
  run() {
    const c = readFile(INDEX);
    if (c === null) return { pass: false, detail: INDEX + ' missing' };
    const lines = c.split('\n');
    const bulletLines = lines.filter((l) => BULLET_ANCHOR.test(l));
    if (bulletLines.length !== 1) {
      return { pass: false, detail: 'BULLET needle absent: expected exactly 1 quick-nav bullet line, found ' + bulletLines.length };
    }
    const bullet = bulletLines[0];
    // Deliberately test ONLY this one extracted line -- never c.includes() on the whole file, which
    // would false-match docs/index.md:36 (two lines above the bullet).
    if (!bullet.includes(BULLET_FRAGMENT_03)) {
      return { pass: false, detail: 'BULLET needle absent on the isolated bullet line: "' + BULLET_FRAGMENT_03 + '"' };
    }
    if (!bullet.includes(BULLET_FRAGMENT_04)) {
      return { pass: false, detail: 'BULLET needle absent on the isolated bullet line: "' + BULLET_FRAGMENT_04 + '"' };
    }
    return { pass: true, detail: 'isolated quick-nav bullet line contains both fragments' };
  }
});

// === V-137-HUBSNOTWIRED: hub files do NOT reference recipes/03- or recipes/04- (corrected literals) ===
checks.push({
  id: 'HUBSNOTWIRED',
  name: 'V-137-HUBSNOTWIRED: ' + HUB_FILES.join(', ') + ' do NOT reference ' + HUB_LITERAL_03 + ' or ' + HUB_LITERAL_04,
  run() {
    const hits = [];
    for (const hub of HUB_FILES) {
      const c = readFile(hub);
      if (c === null) continue; // graceful skip: hub file absent is out of this check's scope
      if (c.includes(HUB_LITERAL_03) || c.includes(HUB_LITERAL_04)) hits.push(hub);
    }
    if (hits.length > 0) {
      return { pass: false, detail: 'HUBSNOTWIRED regression: recipes 03/04 referenced in ' + hits.join(', ') };
    }
    return { pass: true, detail: 'common-issues.md / quick-ref-l1.md / quick-ref-l2.md confirmed NOT wired to recipes/03- or recipes/04-' };
  }
});

// === V-137-SELF: dual-invariant guard (CHAIN_PHASES excludes 137; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-137-SELF: CHAIN_PHASES does NOT include 137; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(137)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 137 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (137 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-137 -- Phase 137 deliverables (Integration & Navigation-Last Close)\n');
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
