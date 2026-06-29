#!/usr/bin/env node
// check-phase-97.mjs -- Phase 97 deliverables (Enrollment Profile + FileVault Depth Formalization -- DEP-01/02)
//
// v1.13 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-100.mjs).
// Hard-assert all checks (no allowlist / no sidecar). CRLF-normalized reads.
//
// Tokens from: .planning/phases/97-enrollment-filevault-depth-formalization/97-NEEDLE-SPEC.md
// [VERIFIED: all tokens confirmed present 2026-06-28]
//
// Assertion classes:
//   V-97-PRESENCE-02        docs/admin-setup-macos/02-enrollment-profile.md exists + non-empty
//   V-97-PRESENCE-03        docs/admin-setup-macos/03-configuration-profiles.md exists + non-empty
//   V-97-CONTENT-DEP01-N1   'Non Platform SSO Accounts' in guide 02
//   V-97-CONTENT-DEP01-N2   'Restrict editing' in guide 02
//   V-97-CONTENT-DEP01-N3   'Prefill account info' in guide 02
//   V-97-CONTENT-DEP01-N4   '{{partialUPN}}' in guide 02
//   V-97-CONTENT-DEP01-N5   '{{username}}' in guide 02
//   V-97-CONTENT-DEP02-N1   'FileVault Options' in guide 03
//   V-97-CONTENT-DEP02-N2   'Recovery Key Escrow' in guide 03
//   V-97-CONTENT-DEP02-N3   '| Defer |' (pipe-anchored) in guide 03
//   V-97-CONTENT-DEP02-N4   'dontAllowFDEDisable' in guide 03
//   V-97-CONTENT-DEP02-N5   'DestroyFVKeyOnStandby' in guide 03
//   V-97-CONTENT-DEP02-N6   'Recovery Key Rotation In Months' in guide 03
//   V-97-CONTENT-DEP02-N7   'Local Password Policy' in guide 03
//   V-97-CONTENT-DEP02-N8   '-2016341107' in guide 03
//   V-97-SELF               CHAIN_PHASES does NOT include 97 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A structural shell from check-phase-94.mjs; 16-check needle spec from 97-NEEDLE-SPEC.md.
//
// Usage: node scripts/validation/check-phase-97.mjs [--verbose]
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

// Phase 97 deliverables (DEP-01: guide 02; DEP-02: guide 03)
const DELIVERABLE_02 = 'docs/admin-setup-macos/02-enrollment-profile.md';
const DELIVERABLE_03 = 'docs/admin-setup-macos/03-configuration-profiles.md';

// === Guide 02 content needles (DEP-01) + Guide 03 content needles (DEP-02) ===
// CRLF-normalized in readFile; all hard-assert (no allowlist).
// DEP02-N3: '| Defer |' (pipe-anchored) targets the specific settings-table row; bare 'Defer' is ubiquitous.
// DEP02-N8: '-2016341107' leading-dash is standard ASCII hyphen-minus; JS includes() handles without special treatment.
const CONTENT_NEEDLES = [
  { id: 'DEP01-N1', file: DELIVERABLE_02, needle: 'Non Platform SSO Accounts' },
  { id: 'DEP01-N2', file: DELIVERABLE_02, needle: 'Restrict editing' },
  { id: 'DEP01-N3', file: DELIVERABLE_02, needle: 'Prefill account info' },
  { id: 'DEP01-N4', file: DELIVERABLE_02, needle: '{{partialUPN}}' },
  { id: 'DEP01-N5', file: DELIVERABLE_02, needle: '{{username}}' },
  { id: 'DEP02-N1', file: DELIVERABLE_03, needle: 'FileVault Options' },
  { id: 'DEP02-N2', file: DELIVERABLE_03, needle: 'Recovery Key Escrow' },
  { id: 'DEP02-N3', file: DELIVERABLE_03, needle: '| Defer |' },
  { id: 'DEP02-N4', file: DELIVERABLE_03, needle: 'dontAllowFDEDisable' },
  { id: 'DEP02-N5', file: DELIVERABLE_03, needle: 'DestroyFVKeyOnStandby' },
  { id: 'DEP02-N6', file: DELIVERABLE_03, needle: 'Recovery Key Rotation In Months' },
  { id: 'DEP02-N7', file: DELIVERABLE_03, needle: 'Local Password Policy' },
  { id: 'DEP02-N8', file: DELIVERABLE_03, needle: '-2016341107' },
];

const checks = [];

// === V-97-PRESENCE-*: phase deliverables exist + non-empty ===
checks.push({
  id: 'PRESENCE-02',
  name: 'V-97-PRESENCE-02: ' + DELIVERABLE_02 + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE_02);
    if (c === null) return { pass: false, detail: DELIVERABLE_02 + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE_02 + ' is empty' };
    return { pass: true, detail: DELIVERABLE_02 + ' present (' + c.length + ' bytes)' };
  }
});

checks.push({
  id: 'PRESENCE-03',
  name: 'V-97-PRESENCE-03: ' + DELIVERABLE_03 + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE_03);
    if (c === null) return { pass: false, detail: DELIVERABLE_03 + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE_03 + ' is empty' };
    return { pass: true, detail: DELIVERABLE_03 + ' present (' + c.length + ' bytes)' };
  }
});

// === V-97-CONTENT-*: 13 DEP-01/DEP-02 needle assertions (no allowlist) ===
// Generated check IDs (for static auditability / greppability):
//   CONTENT-DEP01-N1 CONTENT-DEP01-N2 CONTENT-DEP01-N3 CONTENT-DEP01-N4 CONTENT-DEP01-N5
//   CONTENT-DEP02-N1 CONTENT-DEP02-N2 CONTENT-DEP02-N3 CONTENT-DEP02-N4 CONTENT-DEP02-N5
//   CONTENT-DEP02-N6 CONTENT-DEP02-N7 CONTENT-DEP02-N8
for (const e of CONTENT_NEEDLES) {
  checks.push({
    id: `CONTENT-${e.id}`,
    name: `V-97-CONTENT-${e.id}: ${e.file} contains needle "${e.needle}"`,
    run() {
      const c = readFile(e.file);
      if (c === null) return { pass: false, detail: e.file + ' missing' };
      if (!c.includes(e.needle)) return { pass: false, detail: `${e.id} needle absent: ${e.needle}` };
      return { pass: true, detail: `${e.id} needle present (${e.needle})` };
    }
  });
}

// === V-97-SELF: dual-invariant guard (CHAIN_PHASES excludes 97; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-97-SELF: CHAIN_PHASES does NOT include 97; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(97)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 97 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (97 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-97 -- Phase 97 deliverables (Enrollment Profile + FileVault Depth Formalization -- DEP-01/02)\n');
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
