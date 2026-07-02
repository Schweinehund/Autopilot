#!/usr/bin/env node
// check-phase-107.mjs -- Phase 107 deliverables (L1 Runbooks #38-41 -- 802.1X triage)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): NO retroactive 107-NEEDLE-SPEC.md was authored.
//
// WHY content needles are load-bearing: PRESENCE of the four L1 runbooks is trivially green on stubs.
// The content needle pins the DOT1X-09 landed cross-platform L1 scope note (read-only checks; state
// changes live in L2), which is discriminating to the 802.1X runbook set.
//
// Assertion classes:
//   V-107-PRESENCE-38   docs/l1-runbooks/38-8021x-certificate-failure.md exists + non-empty (DOT1X-09)
//   V-107-PRESENCE-39   docs/l1-runbooks/39-8021x-radius-reject.md exists + non-empty
//   V-107-PRESENCE-40   docs/l1-runbooks/40-8021x-server-trust-failure.md exists + non-empty
//   V-107-PRESENCE-41   docs/l1-runbooks/41-8021x-eap-negotiation-failure.md exists + non-empty
//   V-107-HEADING       802.1X Certificate Failure landed heading (runbook 38)
//   V-107-L1SCOPE       cross-platform L1-scope note (read-only checks; state changes in L2)
//   V-107-SELF          CHAIN_PHASES does NOT include 107 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-107.mjs [--verbose]
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

const RB_38 = 'docs/l1-runbooks/38-8021x-certificate-failure.md';
const RB_39 = 'docs/l1-runbooks/39-8021x-radius-reject.md';
const RB_40 = 'docs/l1-runbooks/40-8021x-server-trust-failure.md';
const RB_41 = 'docs/l1-runbooks/41-8021x-eap-negotiation-failure.md';

const checks = [];

function presence(id, path) {
  checks.push({
    id,
    name: 'V-107-' + id + ': ' + path + ' exists and is non-empty',
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-38', RB_38);
presence('PRESENCE-39', RB_39);
presence('PRESENCE-40', RB_40);
presence('PRESENCE-41', RB_41);

checks.push({
  id: 'HEADING',
  name: 'V-107-HEADING: 802.1X Certificate Failure landed heading (runbook 38)',
  run() {
    const c = readFile(RB_38);
    if (c === null) return { pass: false, detail: RB_38 + ' missing' };
    const needle = '# 802.1X Certificate Failure';
    if (!c.includes(needle)) return { pass: false, detail: 'HEADING needle absent: ' + needle };
    return { pass: true, detail: '802.1X Certificate Failure heading present' };
  }
});

checks.push({
  id: 'L1SCOPE',
  name: 'V-107-L1SCOPE: cross-platform L1-scope note (read-only checks; state changes in L2)',
  run() {
    const c = readFile(RB_38);
    if (c === null) return { pass: false, detail: RB_38 + ' missing' };
    const needle = 'L1 Triage Steps in this runbook are read-only checks';
    if (!c.includes(needle)) return { pass: false, detail: 'L1SCOPE needle absent: ' + needle };
    return { pass: true, detail: 'L1-scope read-only note present' };
  }
});

checks.push({
  id: 'SELF',
  name: 'V-107-SELF: CHAIN_PHASES does NOT include 107; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(107)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 107 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (107 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-107 -- Phase 107 deliverables (L1 Runbooks #38-41 -- 802.1X triage)\n');
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
