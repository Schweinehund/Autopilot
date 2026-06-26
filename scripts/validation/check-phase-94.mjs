#!/usr/bin/env node
// check-phase-94.mjs -- Phase 94 deliverables (Post-Migration Verification Content Closure — MIGV-01/02/03)
//
// v1.12 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-95.mjs)
// PLUS the V-94-CONTENT-* 5-needle hard-asserts (Phase 95 D-02). Phase 94 only PATCHED
// docs/macos-lifecycle/02-mdm-migration-psso.md (pre-existing v1.11 file); bare PRESENCE is trivially
// green on old bytes. The 5 content needles are the durable recurring CI net for MIGV-01/02/03.
// Hard-assert all 5 (no allowlist / no sidecar -- mirrors C16's empty c16_missing_endpoint_exemptions: []).
//
// Assertion classes:
//   V-94-PRESENCE           docs/macos-lifecycle/02-mdm-migration-psso.md exists + non-empty
//   V-94-CONTENT-URLS-IRU   support.iru.io present in target file
//   V-94-CONTENT-URLS-KANDJI support.kandji.io present in target file
//   V-94-CONTENT-DOCS-IRU   docs.iru.com present in target file
//   V-94-CONTENT-MIGV03     Supervision status (MEDIUM confidence) present in target file
//   V-94-CONTENT-MIGV01     learn.microsoft.com present in target file
//   V-94-SELF               CHAIN_PHASES does NOT include 94 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A structural shell from check-phase-84.mjs + {id,file,needle} FORM from check-phase-92.mjs.
//
// Usage: node scripts/validation/check-phase-94.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-95.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// Phase 94 headline deliverable (Post-Migration Verification -- patched guide).
const DELIVERABLE = 'docs/macos-lifecycle/02-mdm-migration-psso.md';

// === The 5 MIGV content-needle assertions (D-02; verbatim from 95-RESEARCH.md + 94-VERIFICATION.md grep-counts) ===
// Each (id, file, needle) triple: assert forward-slash needle is present in the source file.
// CRLF-normalized read (readFile already does .replace(/\r\n/g,'\n')) makes substring needles Windows-safe.
// Hard-assert -- NO allowlist (mirrors C16 empty c16_missing_endpoint_exemptions: []).
const CONTENT_NEEDLES = [
  { id: 'URLS-IRU',    file: DELIVERABLE, needle: 'support.iru.io' },
  { id: 'URLS-KANDJI', file: DELIVERABLE, needle: 'support.kandji.io' },
  { id: 'DOCS-IRU',    file: DELIVERABLE, needle: 'docs.iru.com' },
  { id: 'MIGV03',      file: DELIVERABLE, needle: 'Supervision status (MEDIUM confidence)' },
  { id: 'MIGV01',      file: DELIVERABLE, needle: 'learn.microsoft.com' },
];

const checks = [];

// === V-94-PRESENCE: phase headline deliverable exists + non-empty ===
checks.push({
  id: 'PRESENCE',
  name: 'V-94-PRESENCE: ' + DELIVERABLE + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE + ' is empty' };
    return { pass: true, detail: DELIVERABLE + ' present (' + c.length + ' bytes)' };
  }
});

// === V-94-CONTENT-*: 5 MIGV needle assertions (D-02; no allowlist) ===
// Generated check IDs (for static auditability / greppability of all 5 needle IDs):
//   CONTENT-URLS-IRU CONTENT-URLS-KANDJI CONTENT-DOCS-IRU CONTENT-MIGV03 CONTENT-MIGV01
for (const e of CONTENT_NEEDLES) {
  checks.push({
    id: `CONTENT-${e.id}`,
    name: `V-94-CONTENT-${e.id}: ${e.file} contains needle "${e.needle}"`,
    run() {
      const c = readFile(e.file);              // readFile CRLF-normalizes (.replace(/\r\n/g,'\n'))
      if (c === null) return { pass: false, detail: e.file + ' missing' };
      if (!c.includes(e.needle)) return { pass: false, detail: `${e.id} needle absent: ${e.needle}` };
      return { pass: true, detail: `${e.id} needle present (${e.needle})` };
    }
  });
}

// === V-94-SELF: dual-invariant guard (CHAIN_PHASES excludes 94; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-94-SELF: CHAIN_PHASES does NOT include 94; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(94)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 94 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (94 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-94 -- Phase 94 deliverables (Post-Migration Verification Content Closure -- MIGV-01/02/03)\n');
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
