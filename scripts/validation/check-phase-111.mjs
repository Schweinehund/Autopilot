#!/usr/bin/env node
// check-phase-111.mjs -- Phase 111 deliverables (Pillar D -- Chain-Validator Tooling Refactors)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): NO retroactive 111-NEEDLE-SPEC.md was authored.
//
// WHY these needles assert CONSUMPTION, not import (CRITICAL, D-01 false-green caution):
//   Phase 111 (TOOL-01/02/03) was a DRY refactor. An `import { execFailDetail }` needle is a
//   FALSE-GREEN -- a file that imports but never calls the helper would pass. We therefore needle
//   CALL-SITE fragments (the actual invocation with its argument shape), not imports:
//   - TOOL-01: the Variant-A execFailDetail(...) call in the CHAIN wrapper of check-phase-100.mjs.
//   - TOOL-02: a readAtV17Close(...) delegation call-site in check-phase-68.mjs (centralized
//     _lib/frozen-at-close.mjs reader consumed, replacing the former inline reader).
//   - TOOL-03: the --self-test catch-block execFailDetail(...) call in check-phase-48.mjs that now
//     captures BOTH stdout and stderr (the stderr-only bug Phase 111 fixed).
//   Self-referential-caution (LOW): a future v1.15 tooling refactor renaming these helpers must
//   preserve these tokens or trip this validator (tokens kept minimal/stable).
//
// Assertion classes:
//   V-111-TOOL01        execFailDetail Variant-A call-site consumed in check-phase-100.mjs (TOOL-01)
//   V-111-TOOL02        readAtV17Close delegation call-site in check-phase-68.mjs (TOOL-02)
//   V-111-TOOL03        --self-test execFailDetail stdout+stderr capture in check-phase-48.mjs (TOOL-03)
//   V-111-SELF          CHAIN_PHASES does NOT include 111 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-111.mjs [--verbose]
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

const CP100 = 'scripts/validation/check-phase-100.mjs';
const CP68 = 'scripts/validation/check-phase-68.mjs';
const CP48 = 'scripts/validation/check-phase-48.mjs';

const checks = [];

// === V-111-TOOL01: execFailDetail Variant-A CALL SITE (consumption, not import) ===
checks.push({
  id: 'TOOL01',
  name: 'V-111-TOOL01: execFailDetail Variant-A call-site consumed in check-phase-100.mjs',
  run() {
    const c = readFile(CP100);
    if (c === null) return { pass: false, detail: CP100 + ' missing' };
    const needle = 'execFailDetail(stdout, stderr, { n: 500, trim: true, prefix:';
    if (!c.includes(needle)) return { pass: false, detail: 'TOOL01 call-site absent (import-only is false-green): ' + needle };
    return { pass: true, detail: 'execFailDetail Variant-A call-site consumed' };
  }
});

// === V-111-TOOL02: readAtV17Close delegation call-site (centralized frozen-at-close reader) ===
checks.push({
  id: 'TOOL02',
  name: 'V-111-TOOL02: readAtV17Close delegation call-site in check-phase-68.mjs',
  run() {
    const c = readFile(CP68);
    if (c === null) return { pass: false, detail: CP68 + ' missing' };
    const needle = "return readAtV17Close('.planning/MILESTONES.md')";
    if (!c.includes(needle)) return { pass: false, detail: 'TOOL02 call-site absent (import-only is false-green): ' + needle };
    return { pass: true, detail: 'readAtV17Close delegation call-site consumed' };
  }
});

// === V-111-TOOL03: --self-test execFailDetail stdout+stderr capture (stderr-only bug fixed) ===
checks.push({
  id: 'TOOL03',
  name: 'V-111-TOOL03: --self-test execFailDetail stdout+stderr capture in check-phase-48.mjs',
  run() {
    const c = readFile(CP48);
    if (c === null) return { pass: false, detail: CP48 + ' missing' };
    const needle = "execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })";
    if (!c.includes(needle)) return { pass: false, detail: 'TOOL03 call-site absent (stdout+stderr capture not consumed): ' + needle };
    return { pass: true, detail: '--self-test execFailDetail stdout+stderr capture consumed' };
  }
});

checks.push({
  id: 'SELF',
  name: 'V-111-SELF: CHAIN_PHASES does NOT include 111; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(111)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 111 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (111 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-111 -- Phase 111 deliverables (Pillar D -- Chain-Validator Tooling Refactors)\n');
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
