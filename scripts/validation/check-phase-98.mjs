#!/usr/bin/env node
// check-phase-98.mjs -- Phase 98 deliverables (Guide 07 Comprehensive Pass -- DEP-03 + ACC-03 + TS-01/02/03)
//
// v1.13 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-100.mjs).
// Hard-assert all checks (no allowlist / no sidecar). CRLF-normalized reads.
//
// Tokens from: .planning/phases/98-guide-07-comprehensive-pass/98-NEEDLE-SPEC.md
// [VERIFIED: all tokens confirmed present 2026-06-29]
//
// CRITICAL N4 NOTE (Pitfall 4): 'com.microsoft.CompanyPortalMac' is a strict substring of
// 'com.microsoft.CompanyPortalMac.ssoextension'. A naïve includes() would false-match on .ssoextension
// lines, masking a missing bundle-ID-only occurrence. N4 uses the negative-lookahead regex
// /com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/ to avoid false positives.
//
// Assertion classes:
//   V-98-PRESENCE         docs/admin-setup-macos/07-platform-sso-setup.md exists + non-empty
//   V-98-CONTENT-N1       'com.microsoft.CompanyPortalMac.ssoextension' (full extension ID)
//   V-98-CONTENT-N2       'Enable Registration During Setup'
//   V-98-CONTENT-N3       '5.2604.0' (Company Portal version floor)
//   V-98-CONTENT-N4       'com.microsoft.CompanyPortalMac' bundle ID only (negative-lookahead anchored)
//   V-98-CONTENT-N5       'Non Platform SSO Accounts'
//   V-98-CONTENT-N6       'AccountShortName'
//   V-98-CONTENT-N7       'Configuration-Caused Failures'
//   V-98-CONTENT-N8       'ADE Path Prerequisites'
//   V-98-CONTENT-N9       'Registration Approach: Decision and Alternatives'
//   V-98-CONTENT-N10      'End-User Sign-In Experience (Secure Enclave)'
//   V-98-CONTENT-N11      'Setup-Assistant SSO-Extension Diagnostic Tree'
//   V-98-CONTENT-N12      'Extension Identifier typo'
//   V-98-SELF             CHAIN_PHASES does NOT include 98 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A structural shell from check-phase-94.mjs; 14-check needle spec from 98-NEEDLE-SPEC.md.
//
// Usage: node scripts/validation/check-phase-98.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-100.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// Phase 98 deliverable (Guide 07 comprehensive pass)
const DELIVERABLE_07 = 'docs/admin-setup-macos/07-platform-sso-setup.md';

const checks = [];

// === V-98-PRESENCE: phase headline deliverable exists + non-empty ===
checks.push({
  id: 'PRESENCE',
  name: 'V-98-PRESENCE: ' + DELIVERABLE_07 + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE_07);
    if (c === null) return { pass: false, detail: DELIVERABLE_07 + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE_07 + ' is empty' };
    return { pass: true, detail: DELIVERABLE_07 + ' present (' + c.length + ' bytes)' };
  }
});

// === V-98-CONTENT-N1: full extension identifier (ssoextension) ===
checks.push({
  id: 'CONTENT-N1',
  name: 'V-98-CONTENT-N1: guide 07 contains com.microsoft.CompanyPortalMac.ssoextension',
  run() {
    const c = readFile(DELIVERABLE_07);
    if (c === null) return { pass: false, detail: DELIVERABLE_07 + ' missing' };
    if (!c.includes('com.microsoft.CompanyPortalMac.ssoextension')) return { pass: false, detail: 'N1 needle absent: com.microsoft.CompanyPortalMac.ssoextension' };
    return { pass: true, detail: 'N1 needle present' };
  }
});

// === V-98-CONTENT-N2: Enable Registration During Setup ===
checks.push({
  id: 'CONTENT-N2',
  name: 'V-98-CONTENT-N2: guide 07 contains Enable Registration During Setup',
  run() {
    const c = readFile(DELIVERABLE_07);
    if (c === null) return { pass: false, detail: DELIVERABLE_07 + ' missing' };
    if (!c.includes('Enable Registration During Setup')) return { pass: false, detail: 'N2 needle absent: Enable Registration During Setup' };
    return { pass: true, detail: 'N2 needle present' };
  }
});

// === V-98-CONTENT-N3: Company Portal version floor 5.2604.0 ===
checks.push({
  id: 'CONTENT-N3',
  name: 'V-98-CONTENT-N3: guide 07 contains Company Portal version floor 5.2604.0',
  run() {
    const c = readFile(DELIVERABLE_07);
    if (c === null) return { pass: false, detail: DELIVERABLE_07 + ' missing' };
    if (!c.includes('5.2604.0')) return { pass: false, detail: 'N3 needle absent: 5.2604.0' };
    return { pass: true, detail: 'N3 needle present' };
  }
});

// === V-98-CONTENT-N4: bundle ID only (negative-lookahead to avoid .ssoextension false-match) ===
// CRITICAL: uses /com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/ (negative lookahead).
// A naïve includes('com.microsoft.CompanyPortalMac') would match on the .ssoextension lines,
// masking a missing bare bundle-ID occurrence. See 98-NEEDLE-SPEC.md §Needle Precision Notes.
checks.push({
  id: 'CONTENT-N4',
  name: 'V-98-CONTENT-N4: guide 07 contains com.microsoft.CompanyPortalMac (bundle ID only, negative-lookahead anchored)',
  run() {
    const c = readFile(DELIVERABLE_07);
    if (c === null) return { pass: false, detail: DELIVERABLE_07 + ' missing' };
    if (!/com\.microsoft\.CompanyPortalMac(?!\.ssoextension)/.test(c)) return { pass: false, detail: 'N4 needle absent: com.microsoft.CompanyPortalMac (bundle ID only, not .ssoextension)' };
    return { pass: true, detail: 'N4 needle present (bundle-ID-only occurrence confirmed via negative-lookahead)' };
  }
});

// === V-98-CONTENT-N5..N12: remaining content needles (simple includes) ===
const SIMPLE_NEEDLES = [
  { id: 'N5',  needle: 'Non Platform SSO Accounts' },
  { id: 'N6',  needle: 'AccountShortName' },
  { id: 'N7',  needle: 'Configuration-Caused Failures' },
  { id: 'N8',  needle: 'ADE Path Prerequisites' },
  { id: 'N9',  needle: 'Registration Approach: Decision and Alternatives' },
  { id: 'N10', needle: 'End-User Sign-In Experience (Secure Enclave)' },
  { id: 'N11', needle: 'Setup-Assistant SSO-Extension Diagnostic Tree' },
  { id: 'N12', needle: 'Extension Identifier typo' },
];

// Generated check IDs (for static auditability / greppability):
//   CONTENT-N5 CONTENT-N6 CONTENT-N7 CONTENT-N8 CONTENT-N9 CONTENT-N10 CONTENT-N11 CONTENT-N12
for (const e of SIMPLE_NEEDLES) {
  checks.push({
    id: `CONTENT-${e.id}`,
    name: `V-98-CONTENT-${e.id}: guide 07 contains needle "${e.needle}"`,
    run() {
      const c = readFile(DELIVERABLE_07);
      if (c === null) return { pass: false, detail: DELIVERABLE_07 + ' missing' };
      if (!c.includes(e.needle)) return { pass: false, detail: `${e.id} needle absent: ${e.needle}` };
      return { pass: true, detail: `${e.id} needle present (${e.needle})` };
    }
  });
}

// === V-98-SELF: dual-invariant guard (CHAIN_PHASES excludes 98; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-98-SELF: CHAIN_PHASES does NOT include 98; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(98)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 98 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (98 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-98 -- Phase 98 deliverables (Guide 07 Comprehensive Pass -- DEP-03 + ACC-03 + TS-01/02/03)\n');
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
