#!/usr/bin/env node
// check-phase-81.mjs -- Phase 81 deliverables (Nav Hub Integration -- SSO cross-link closure)
//
// v1.9 per-phase validator. LIGHTWEIGHT base (NO chain -- the chain lives ONLY in apex
// check-phase-82.mjs) PLUS the V-81-CROSSLINK 8-edge hard-asserts (the Phase 82 D-01 exception).
// The 8 SSO-E1..E8 cross-link edges wired/verified in Phase 81 (81-CROSSLINK-CLOSURE.md) become
// BLOCKING assertions here -- NOT a global C17 in v1.9-milestone-audit.mjs (D-01). Hard-assert all 8
// (no allowlist / no sidecar -- mirrors C16's empty c16_missing_endpoint_exemptions: []). The frozen
// v1.8 harness is blind to internal links; this validator is the durable local net for those edges.
//
// Assertion classes:
//   V-81-CROSSLINK-E1..E8  each SSO-E edge needle present in its source file (CRLF-normalized read;
//                          forward-slash needle -- Windows-safe; FAIL if file missing or needle absent)
//   V-81-SELF              CHAIN_PHASES does NOT include 81 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// SSO-E needles confirmed against .planning/phases/81-nav-hub-integration/81-CROSSLINK-CLOSURE.md.
//
// Lineage: Path-A structural shell from check-phase-71.mjs (lightweight; no chain) + V-67-03/04 read shape.
//
// Usage: node scripts/validation/check-phase-81.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-82.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// === The 8 SSO-E cross-link edges (D-01; verbatim from 81-CROSSLINK-CLOSURE.md) ===
// Each (id, file, needle) triple: assert the forward-slash needle is present in the source file.
// CRLF-normalized read (readFile already does .replace(/\r\n/g,'\n')) makes forward-slash needles
// Windows-safe. Hard-assert -- NO allowlist (mirrors C16 empty c16_missing_endpoint_exemptions: []).
const SSO_EDGES = [
  { id: 'E1', file: 'docs/admin-setup-macos/07-platform-sso-setup.md',     needle: '../_glossary-macos.md#platform-sso' },
  { id: 'E2', file: 'docs/_glossary-macos.md',                              needle: 'admin-setup-macos/07-platform-sso-setup.md' },
  { id: 'E3', file: 'docs/admin-setup-macos/07-platform-sso-setup.md',     needle: '../reference/macos-capability-matrix.md#authentication' },
  { id: 'E4', file: 'docs/reference/macos-capability-matrix.md',           needle: '../admin-setup-macos/07-platform-sso-setup.md' },
  { id: 'E5', file: 'docs/l1-runbooks/35-macos-sso-sign-in-failure.md',    needle: '../l2-runbooks/27-macos-sso-investigation.md' },
  { id: 'E6', file: 'docs/l2-runbooks/27-macos-sso-investigation.md',      needle: '../l1-runbooks/35-macos-sso-sign-in-failure.md' },
  { id: 'E7', file: 'docs/admin-setup-macos/03-configuration-profiles.md', needle: '07-platform-sso-setup.md' },
  { id: 'E8', file: 'docs/macos-lifecycle/00-ade-lifecycle.md',            needle: '../admin-setup-macos/07-platform-sso-setup.md' },
];

const checks = [];

// === V-81-CROSSLINK-E1..E8: 8 SSO-E edges hard-asserted (D-01; no allowlist) ===
// Generated check IDs (for static auditability / greppability of all 8 edge IDs):
//   CROSSLINK-E1 CROSSLINK-E2 CROSSLINK-E3 CROSSLINK-E4
//   CROSSLINK-E5 CROSSLINK-E6 CROSSLINK-E7 CROSSLINK-E8
for (const e of SSO_EDGES) {
  checks.push({
    id: `CROSSLINK-${e.id}`,
    name: `V-81-CROSSLINK-${e.id}: ${e.file} contains SSO edge needle ${e.needle}`,
    run() {
      const c = readFile(e.file);              // readFile CRLF-normalizes (.replace(/\r\n/g,'\n'))
      if (c === null) return { pass: false, detail: e.file + ' missing' };
      if (!c.includes(e.needle)) return { pass: false, detail: `${e.id} needle absent: ${e.needle}` };
      return { pass: true, detail: `${e.id} edge present (${e.needle})` };
    }
  });
}

// === V-81-SELF: dual-invariant guard (CHAIN_PHASES excludes 81; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-81-SELF: CHAIN_PHASES does NOT include 81; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(81)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 81 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (81 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-81 -- Phase 81 deliverables (Nav Hub Integration -- SSO cross-link closure)\n');
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
