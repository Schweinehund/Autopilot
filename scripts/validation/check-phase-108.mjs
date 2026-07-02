#!/usr/bin/env node
// check-phase-108.mjs -- Phase 108 deliverables (L2 Runbooks #31-33 + Decision Tree #10 -- 802.1X)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): NO retroactive 108-NEEDLE-SPEC.md was authored.
//
// WHY content needles are load-bearing: PRESENCE of the three L2 runbooks + decision tree is
// trivially green on stubs. The content needles pin the DOT1X-10 landed decision-tree flat-shape
// contract and the L2 log-collection heading, both discriminating to the 802.1X L2 set.
//
// Assertion classes:
//   V-108-PRESENCE-31   docs/l2-runbooks/31-8021x-log-collection.md exists + non-empty (DOT1X-10)
//   V-108-PRESENCE-32   docs/l2-runbooks/32-8021x-cert-investigation.md exists + non-empty
//   V-108-PRESENCE-33   docs/l2-runbooks/33-8021x-radius-eap-investigation.md exists + non-empty
//   V-108-PRESENCE-DT   docs/decision-trees/10-8021x-triage.md exists + non-empty
//   V-108-TREE-HEADING  802.1X Triage Decision Tree landed heading
//   V-108-TREE-SHAPE    decision-tree flat symptom-primary shape contract (landed)
//   V-108-L2-HEADING    802.1X Log Collection L2 heading (runbook 31)
//   V-108-SELF          CHAIN_PHASES does NOT include 108 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-108.mjs [--verbose]
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

const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const RB_31 = 'docs/l2-runbooks/31-8021x-log-collection.md';
const RB_32 = 'docs/l2-runbooks/32-8021x-cert-investigation.md';
const RB_33 = 'docs/l2-runbooks/33-8021x-radius-eap-investigation.md';
const DT_10 = 'docs/decision-trees/10-8021x-triage.md';

const checks = [];

function presence(id, path) {
  checks.push({
    id,
    name: 'V-108-' + id + ': ' + path + ' exists and is non-empty',
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-31', RB_31);
presence('PRESENCE-32', RB_32);
presence('PRESENCE-33', RB_33);
presence('PRESENCE-DT', DT_10);

checks.push({
  id: 'TREE-HEADING',
  name: 'V-108-TREE-HEADING: 802.1X Triage Decision Tree landed heading',
  run() {
    const c = readFile(DT_10);
    if (c === null) return { pass: false, detail: DT_10 + ' missing' };
    const needle = '# 802.1X Triage Decision Tree';
    if (!c.includes(needle)) return { pass: false, detail: 'TREE-HEADING needle absent: ' + needle };
    return { pass: true, detail: '802.1X Triage Decision Tree heading present' };
  }
});

checks.push({
  id: 'TREE-SHAPE',
  name: 'V-108-TREE-SHAPE: decision-tree flat symptom-primary shape contract (landed)',
  run() {
    const c = readFile(DT_10);
    if (c === null) return { pass: false, detail: DT_10 + ' missing' };
    const needle = 'This tree uses a flat symptom-primary shape';
    if (!c.includes(needle)) return { pass: false, detail: 'TREE-SHAPE needle absent: ' + needle };
    return { pass: true, detail: 'flat symptom-primary shape contract present' };
  }
});

checks.push({
  id: 'L2-HEADING',
  name: 'V-108-L2-HEADING: 802.1X Log Collection L2 heading (runbook 31)',
  run() {
    const c = readFile(RB_31);
    if (c === null) return { pass: false, detail: RB_31 + ' missing' };
    const needle = '# 802.1X Log Collection';
    if (!c.includes(needle)) return { pass: false, detail: 'L2-HEADING needle absent: ' + needle };
    return { pass: true, detail: '802.1X Log Collection heading present' };
  }
});

checks.push({
  id: 'SELF',
  name: 'V-108-SELF: CHAIN_PHASES does NOT include 108; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(108)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 108 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (108 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-108 -- Phase 108 deliverables (L2 Runbooks #31-33 + Decision Tree #10 -- 802.1X)\n');
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
