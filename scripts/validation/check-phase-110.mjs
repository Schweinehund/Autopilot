#!/usr/bin/env node
// check-phase-110.mjs -- Phase 110 deliverables (Pillar B/C -- Corpus Fixes + MDM Migration Walkthroughs)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): NO retroactive 110-NEEDLE-SPEC.md was authored.
//
// WHY these needles are land-not-preexisting (CRITICAL, D-01):
//   FIX-01/02/03 corrected PRE-EXISTING files (docs/index.md, docs/quick-ref-l1.md, docs/common-issues.md).
//   A bare PRESENCE check on those files is trivially green on their PRE-Phase-110 bytes. We therefore
//   needle ONLY the POST-110 corrected phrases -- verified to NOT appear in any pre-Phase-110 snapshot.
//   - FIX-01 uses the FULL count phrase (per D-01: range-tolerant / full-phrase, NEVER a bare integer,
//     because the count depends on 802.1X runbook #38-41 ordering). A bare "9" would false-green.
//   MIGF-01 landed a NEW file (docs/ios-lifecycle/02-mdm-migration.md); MIGF-02 appended an addendum
//   H2 to the EXISTING docs/macos-lifecycle/02-mdm-migration-psso.md -- needle the landed addendum heading.
//
// Assertion classes:
//   V-110-FIX01         index.md POST-110 macOS-runbook count phrase (full phrase, not a bare integer)
//   V-110-FIX02-WR01    quick-ref-l1.md POST-110 WR-01 Secure-Enclave "use first" fragment
//   V-110-FIX03-IN01    common-issues.md POST-110 IN-01 mandatory-PSSO-re-registration phrase
//   V-110-MIGF01-PRES   docs/ios-lifecycle/02-mdm-migration.md exists + non-empty (MIGF-01, new file)
//   V-110-MIGF01-HEAD   MIGF-01 iOS in-place migration landed heading
//   V-110-MIGF02        MIGF-02 Jamf Pro + Mosyle source-release addendum heading (existing file)
//   V-110-SELF          CHAIN_PHASES does NOT include 110 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-110.mjs [--verbose]
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

const INDEX = 'docs/index.md';
const QREF_L1 = 'docs/quick-ref-l1.md';
const COMMON = 'docs/common-issues.md';
const MIGF01 = 'docs/ios-lifecycle/02-mdm-migration.md';
const MIGF02 = 'docs/macos-lifecycle/02-mdm-migration-psso.md';

const checks = [];

// === V-110-FIX01: POST-110 count phrase (FULL phrase per D-01, NOT a bare integer) ===
checks.push({
  id: 'FIX01',
  name: 'V-110-FIX01: index.md POST-110 macOS-runbook count phrase (full phrase)',
  run() {
    const c = readFile(INDEX);
    if (c === null) return { pass: false, detail: INDEX + ' missing' };
    const needle = '9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below';
    if (!c.includes(needle)) return { pass: false, detail: 'FIX01 needle absent: ' + needle };
    return { pass: true, detail: 'FIX-01 full count phrase present' };
  }
});

// === V-110-FIX02-WR01: POST-110 WR-01 Secure-Enclave "use first" fragment ===
checks.push({
  id: 'FIX02-WR01',
  name: 'V-110-FIX02-WR01: quick-ref-l1.md POST-110 WR-01 Secure-Enclave "use first" fragment',
  run() {
    const c = readFile(QREF_L1);
    if (c === null) return { pass: false, detail: QREF_L1 + ' missing' };
    const needle = 'Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) runbook** first';
    if (!c.includes(needle)) return { pass: false, detail: 'WR-01 needle absent: ' + needle };
    return { pass: true, detail: 'WR-01 "use first" fragment present' };
  }
});

// === V-110-FIX03-IN01: POST-110 IN-01 mandatory-PSSO-re-registration phrase ===
checks.push({
  id: 'FIX03-IN01',
  name: 'V-110-FIX03-IN01: common-issues.md POST-110 IN-01 mandatory-PSSO-re-registration phrase',
  run() {
    const c = readFile(COMMON);
    if (c === null) return { pass: false, detail: COMMON + ' missing' };
    const needle = 'mandatory PSSO re-registration after password recovery';
    if (!c.includes(needle)) return { pass: false, detail: 'IN-01 needle absent: ' + needle };
    return { pass: true, detail: 'IN-01 mandatory-PSSO-re-registration phrase present' };
  }
});

// === V-110-MIGF01-PRES: MIGF-01 new iOS migration walkthrough file ===
checks.push({
  id: 'MIGF01-PRES',
  name: 'V-110-MIGF01-PRES: ' + MIGF01 + ' exists and is non-empty (MIGF-01)',
  run() {
    const c = readFile(MIGF01);
    if (c === null) return { pass: false, detail: MIGF01 + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: MIGF01 + ' is empty' };
    return { pass: true, detail: MIGF01 + ' present (' + c.length + ' bytes)' };
  }
});

// === V-110-MIGF01-HEAD: MIGF-01 iOS in-place migration landed heading ===
checks.push({
  id: 'MIGF01-HEAD',
  name: 'V-110-MIGF01-HEAD: MIGF-01 iOS in-place migration landed heading',
  run() {
    const c = readFile(MIGF01);
    if (c === null) return { pass: false, detail: MIGF01 + ' missing' };
    const needle = '# iOS/iPadOS MDM Migration Walkthrough: In-Place Migration (iOS/iPadOS 26+)';
    if (!c.includes(needle)) return { pass: false, detail: 'MIGF01-HEAD needle absent: ' + needle };
    return { pass: true, detail: 'MIGF-01 in-place migration heading present' };
  }
});

// === V-110-MIGF02: MIGF-02 Jamf Pro + Mosyle addendum heading (appended to existing file) ===
checks.push({
  id: 'MIGF02',
  name: 'V-110-MIGF02: MIGF-02 Jamf Pro + Mosyle source-release addendum heading',
  run() {
    const c = readFile(MIGF02);
    if (c === null) return { pass: false, detail: MIGF02 + ' missing' };
    const needle = '## Appendix: Source-MDM Release Steps for Jamf Pro and Mosyle';
    if (!c.includes(needle)) return { pass: false, detail: 'MIGF02 needle absent: ' + needle };
    return { pass: true, detail: 'MIGF-02 Jamf Pro + Mosyle addendum heading present' };
  }
});

checks.push({
  id: 'SELF',
  name: 'V-110-SELF: CHAIN_PHASES does NOT include 110; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(110)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 110 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (110 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-110 -- Phase 110 deliverables (Pillar B/C -- Corpus Fixes + MDM Migration Walkthroughs)\n');
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
