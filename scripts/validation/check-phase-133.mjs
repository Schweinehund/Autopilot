#!/usr/bin/env node
// check-phase-133.mjs -- Phase 133 deliverables (Chain-Validator Tooling Debt Closure)
//
// v1.18 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-134.mjs).
// NEEDLES DERIVED INLINE from 133-VERIFICATION.md (Required Artifacts / Observable Truths): the
// TOOL-04 re-pin landing on all 14 v1.4-v1.16 sidecar JSONs as valid JSON, and the TOOL-06 stderr
// slice-budget bump at check-phase-60/61.mjs to n:1000 -- while check-phase-48.mjs correctly stays
// pinned at n:200 (frozen V-111-TOOL03 call-site contract; must NOT be touched by this validator's
// pass criteria). TOOL-05 (re-scoped to verify-and-attest, CARVE-2) authors no durable code artifact
// this validator can needle-check -- see 133-ONE-N-ATTESTATION.md for that record.
//
// Assertion classes:
//   V-133-REPIN14        14 v1.4..v1.16 audit-allowlist.json sidecars present and valid JSON (TOOL-04)
//   V-133-STDERRBUDGET    check-phase-60/61.mjs at n:1000; check-phase-48.mjs correctly held at n:200 (TOOL-06)
//   V-133-SELF            CHAIN_PHASES does NOT include 133 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-133.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-134.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

// TOOL-04's 14 re-pinned sidecars (v1.4 through v1.16 -- v1.17/v1.18 are NOT part of this re-pin).
const SIDECARS_14 = [
  'v1.4', 'v1.4.1', 'v1.5', 'v1.6', 'v1.7', 'v1.8', 'v1.9', 'v1.10',
  'v1.11', 'v1.12', 'v1.13', 'v1.14', 'v1.15', 'v1.16',
].map((v) => 'scripts/validation/' + v + '-audit-allowlist.json');

const checks = [];

// === V-133-REPIN14: all 14 v1.4..v1.16 sidecars present and valid JSON (TOOL-04) ===
checks.push({
  id: 'REPIN14',
  name: 'V-133-REPIN14: all 14 v1.4..v1.16 audit-allowlist.json sidecars present and valid JSON',
  run() {
    const missing = [];
    const invalid = [];
    for (const path of SIDECARS_14) {
      const c = readFile(path);
      if (c === null) { missing.push(path); continue; }
      try { JSON.parse(c); } catch { invalid.push(path); }
    }
    if (missing.length > 0) return { pass: false, detail: 'REPIN14 missing sidecars: ' + missing.join(', ') };
    if (invalid.length > 0) return { pass: false, detail: 'REPIN14 invalid JSON: ' + invalid.join(', ') };
    return { pass: true, detail: 'All 14 v1.4..v1.16 sidecars present and valid JSON (TOOL-04 re-pin)' };
  }
});

// === V-133-STDERRBUDGET: check-phase-60/61.mjs at n:1000; check-phase-48.mjs held at n:200 (TOOL-06) ===
checks.push({
  id: 'STDERRBUDGET',
  name: 'V-133-STDERRBUDGET: check-phase-60/61.mjs at n:1000; check-phase-48.mjs correctly held at n:200',
  run() {
    const c60 = readFile('scripts/validation/check-phase-60.mjs');
    const c61 = readFile('scripts/validation/check-phase-61.mjs');
    const c48 = readFile('scripts/validation/check-phase-48.mjs');
    if (c60 === null) return { pass: false, detail: 'check-phase-60.mjs missing' };
    if (c61 === null) return { pass: false, detail: 'check-phase-61.mjs missing' };
    if (c48 === null) return { pass: false, detail: 'check-phase-48.mjs missing' };
    if (!/n:\s*1000/.test(c60)) return { pass: false, detail: 'STDERRBUDGET needle absent: check-phase-60.mjs n: 1000' };
    if (!/n:\s*1000/.test(c61)) return { pass: false, detail: 'STDERRBUDGET needle absent: check-phase-61.mjs n: 1000' };
    if (!/n:\s*200/.test(c48)) return { pass: false, detail: 'STDERRBUDGET regression: check-phase-48.mjs n: 200 frozen contract disturbed' };
    return { pass: true, detail: 'check-phase-60/61.mjs at n:1000 (TOOL-06); check-phase-48.mjs correctly held at n:200 (V-111-TOOL03 frozen contract)' };
  }
});

// === V-133-SELF: dual-invariant guard (CHAIN_PHASES excludes 133; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-133-SELF: CHAIN_PHASES does NOT include 133; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(133)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 133 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (133 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-126.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-133 -- Phase 133 deliverables (Chain-Validator Tooling Debt Closure)\n');
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
