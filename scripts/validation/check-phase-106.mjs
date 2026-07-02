#!/usr/bin/env node
// check-phase-106.mjs -- Phase 106 deliverables (Linux 802.1X Admin Setup: script-based EAP-TLS via nmcli)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): NO retroactive 106-NEEDLE-SPEC.md was authored.
//
// WHY content needles are load-bearing: PRESENCE of the Linux guide is trivially green on a stub.
// The content needles pin the DOT1X-08 landed heading + the Linux-specific no-native-profile /
// nmcli-workaround warning (the crux of the Linux gap), catching a boilerplate-regression.
//
// Assertion classes:
//   V-106-PRESENCE      docs/admin-setup-8021x/07-linux.md exists + non-empty (DOT1X-08)
//   V-106-HEADING       Linux 802.1X landed heading present (EAP-TLS via nmcli)
//   V-106-NMCLI         Linux-specific no-native-profile / nmcli-workaround warning
//   V-106-SELF          CHAIN_PHASES does NOT include 106 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-106.mjs [--verbose]
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

const DELIVERABLE = 'docs/admin-setup-8021x/07-linux.md';

const checks = [];

checks.push({
  id: 'PRESENCE',
  name: 'V-106-PRESENCE: ' + DELIVERABLE + ' exists and is non-empty (DOT1X-08)',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE + ' is empty' };
    return { pass: true, detail: DELIVERABLE + ' present (' + c.length + ' bytes)' };
  }
});

checks.push({
  id: 'HEADING',
  name: 'V-106-HEADING: Linux 802.1X landed heading present (EAP-TLS via nmcli)',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    const needle = '# Linux 802.1X Admin Setup: EAP-TLS via nmcli';
    if (!c.includes(needle)) return { pass: false, detail: 'HEADING needle absent: ' + needle };
    return { pass: true, detail: 'Linux 802.1X (nmcli) heading present' };
  }
});

checks.push({
  id: 'NMCLI',
  name: 'V-106-NMCLI: Linux-specific no-native-profile / nmcli-workaround warning',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    const needle = 'Intune provides no native 802.1X profiles for Linux; this guide documents an OS-level nmcli workaround';
    if (!c.includes(needle)) return { pass: false, detail: 'NMCLI needle absent: ' + needle };
    return { pass: true, detail: 'Linux no-native-profile / nmcli-workaround warning present' };
  }
});

checks.push({
  id: 'SELF',
  name: 'V-106-SELF: CHAIN_PHASES does NOT include 106; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(106)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 106 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (106 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-106 -- Phase 106 deliverables (Linux 802.1X Admin Setup: script-based EAP-TLS via nmcli)\n');
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
