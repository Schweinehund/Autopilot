#!/usr/bin/env node
// check-phase-101.mjs -- Phase 101 deliverables (802.1X Foundation -- Network Glossary + EAP Methods + Cert Delivery)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): Phase 101 shipped without a needle-spec hand-off.
// NO retroactive 101-NEEDLE-SPEC.md was authored.
//
// WHY content needles are load-bearing: a bare PRESENCE check on the new foundation files is
// trivially green once the files exist. The content needles pin DOT1X-01/02/03 landed strings --
// the 802.1X see-also banner appended to docs/_glossary-android.md (landed at line 14 by eae49f7),
// the co-equal EAP-method framing, and the cert-delivery-foundation heading -- so a regression
// that guts the foundation content (leaving stub files) is caught.
//
// Assertion classes:
//   V-101-PRESENCE-NET     docs/_glossary-network.md exists + non-empty (DOT1X-01)
//   V-101-PRESENCE-00      docs/admin-setup-8021x/00-overview.md exists + non-empty
//   V-101-PRESENCE-EAP     docs/admin-setup-8021x/01-eap-method-overview.md exists + non-empty (DOT1X-02)
//   V-101-PRESENCE-CERT    docs/admin-setup-8021x/02-cert-delivery-foundation.md exists + non-empty (DOT1X-03)
//   V-101-BANNER           802.1X see-also banner landed in docs/_glossary-android.md (land-not-preexisting)
//   V-101-EAP-COEQUAL      co-equal EAP-TLS/PEAP-MSCHAPv2/EAP-TTLS framing in EAP overview
//   V-101-CERT-HEADING     cert-delivery-foundation landed heading
//   V-101-SELF             CHAIN_PHASES does NOT include 101 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-101.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { readAtV116Close } from './_lib/frozen-at-close.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Lightweight: NO chain (chain lives only in apex check-phase-112.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_NET  = 'docs/_glossary-network.md';
const DELIVERABLE_00   = 'docs/admin-setup-8021x/00-overview.md';
const DELIVERABLE_EAP  = 'docs/admin-setup-8021x/01-eap-method-overview.md';
const DELIVERABLE_CERT = 'docs/admin-setup-8021x/02-cert-delivery-foundation.md';
const GLOSSARY_ANDROID = 'docs/_glossary-android.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-101-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-NET', DELIVERABLE_NET, 'DOT1X-01');
presence('PRESENCE-00', DELIVERABLE_00, null);
presence('PRESENCE-EAP', DELIVERABLE_EAP, 'DOT1X-02');
presence('PRESENCE-CERT', DELIVERABLE_CERT, 'DOT1X-03');

// === V-101-BANNER: 802.1X see-also banner landed in _glossary-android.md (line 14, eae49f7) ===
// Land-not-preexisting: this banner did NOT exist before Phase 101; it is the DOT1X-01 discoverability wire.
checks.push({
  id: 'BANNER',
  name: 'V-101-BANNER: 802.1X see-also banner present in ' + GLOSSARY_ANDROID,
  run() {
    // Phase 128 D-128-C frozen-aware conversion: docs/_glossary-android.md is HYG-02-touched;
    // read frozen (V116=3dd2512) instead of live HEAD. Expected needle UNCHANGED (no value-mask);
    // only the read SOURCE moved live -> frozen. Honest-accounting: .planning/phases/128-*/128-03-SUMMARY.md.
    let c;
    try { c = readAtV116Close(GLOSSARY_ANDROID); } catch { c = null; }
    if (c === null) return { pass: false, detail: GLOSSARY_ANDROID + ' missing (frozen V116 read failed)' };
    const needle = '> **802.1X / Network authentication:** For 802.1X protocol terminology';
    if (!c.includes(needle)) return { pass: false, detail: 'BANNER needle absent: ' + needle };
    return { pass: true, detail: '802.1X see-also banner present' };
  }
});

// === V-101-EAP-COEQUAL: co-equal EAP-method framing in EAP overview ===
checks.push({
  id: 'EAP-COEQUAL',
  name: 'V-101-EAP-COEQUAL: co-equal EAP-TLS/PEAP-MSCHAPv2/EAP-TTLS framing in EAP overview',
  run() {
    const c = readFile(DELIVERABLE_EAP);
    if (c === null) return { pass: false, detail: DELIVERABLE_EAP + ' missing' };
    const needle = 'EAP-TLS, PEAP-MSCHAPv2, and EAP-TTLS -- as co-equal paths';
    if (!c.includes(needle)) return { pass: false, detail: 'EAP-COEQUAL needle absent: ' + needle };
    return { pass: true, detail: 'co-equal EAP-method framing present' };
  }
});

// === V-101-CERT-HEADING: cert-delivery-foundation landed heading ===
checks.push({
  id: 'CERT-HEADING',
  name: 'V-101-CERT-HEADING: cert-delivery-foundation landed heading present',
  run() {
    const c = readFile(DELIVERABLE_CERT);
    if (c === null) return { pass: false, detail: DELIVERABLE_CERT + ' missing' };
    const needle = '# 802.1X Certificate Delivery Foundation';
    if (!c.includes(needle)) return { pass: false, detail: 'CERT-HEADING needle absent: ' + needle };
    return { pass: true, detail: 'cert-delivery-foundation heading present' };
  }
});

// === V-101-SELF: dual-invariant guard (CHAIN_PHASES excludes 101; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-101-SELF: CHAIN_PHASES does NOT include 101; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(101)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 101 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (101 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-96.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-101 -- Phase 101 deliverables (802.1X Foundation -- Network Glossary + EAP Methods + Cert Delivery)\n');
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
