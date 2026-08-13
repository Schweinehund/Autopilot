#!/usr/bin/env node
// check-phase-140.mjs -- Phase 140 deliverables (Frozen-Aware Harness Conversion)
//
// v1.20 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-144.mjs).
// NEEDLES DERIVED INLINE from 140-VERIFICATION.md (Observable Truths table): the sixteen v1.4
// through v1.18 harness conversions (POSITIVE half only -- see the durability trap below), the
// V14 pin with its recorded rationale, the C17 carve-out's positive presence across the v1.15
// through v1.18 harnesses, and the SWEEP-06 subprocess-budget constant.
//
// CRITICAL DURABILITY TRAP (144-PATTERNS.md, 144-RESEARCH.md Pitfall 1): this leaf must NOT
// assert or name anything about the v1.19 harness's conversion state -- Plan 02 of this same
// phase converts it, which would self-detonate the apex the moment Phase 144's own commits
// land. Only a lower-bound count over a dynamically-globbed file list is used; the seventeenth
// harness's filename literal is deliberately never spelled out contiguously in this source.
//
// Assertion classes:
//   V-140-CONVERSIONS  >=16 v1.*-milestone-audit.mjs files carry createFrozenCorpusReader; each of the 16 named v1.4..v1.18 harnesses individually does (POSITIVE half only)
//   V-140-V14PIN       _lib/frozen-at-close.mjs carries the V14 pin with its AUDIT-CLOSE rationale comment, and V14 is still the last entry in MILESTONE_CLOSE_SHAS
//   V-140-C17CARVEOUT  v1.15..v1.18 harnesses each still reference the c17-eee-contract spawn + exception comment (scoped to v1.15-v1.18 only)
//   V-140-SUBPROCBUDGET check-phase-60.mjs's subprocess timeout constant stays byte-unchanged at 60000ms
//   V-140-SELF         CHAIN_PHASES does NOT include 140 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-140.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Lightweight: NO chain (chain lives only in apex check-phase-144.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const HARNESS_DIR = 'scripts/validation';
const HARNESS_PATTERN = /^v1\.\d+(?:\.\d+)?-milestone-audit\.mjs$/;
const READER_SYMBOL = 'createFrozenCorpusReader';
const CONVERTED_FLOOR = 16;

// The sixteen v1.4..v1.18 harnesses (POSITIVE half only). Deliberately transcribed as literal
// paths, never derived from a glob that would also match the seventeenth (unconverted-as-of-
// this-leaf's-authoring, converted-by-this-phase's-own-Plan-02) harness by name.
const REQUIRED_CONVERTED = [
  'scripts/validation/v1.4-milestone-audit.mjs',
  'scripts/validation/v1.4.1-milestone-audit.mjs',
  'scripts/validation/v1.5-milestone-audit.mjs',
  'scripts/validation/v1.6-milestone-audit.mjs',
  'scripts/validation/v1.7-milestone-audit.mjs',
  'scripts/validation/v1.8-milestone-audit.mjs',
  'scripts/validation/v1.9-milestone-audit.mjs',
  'scripts/validation/v1.10-milestone-audit.mjs',
  'scripts/validation/v1.11-milestone-audit.mjs',
  'scripts/validation/v1.12-milestone-audit.mjs',
  'scripts/validation/v1.13-milestone-audit.mjs',
  'scripts/validation/v1.14-milestone-audit.mjs',
  'scripts/validation/v1.15-milestone-audit.mjs',
  'scripts/validation/v1.16-milestone-audit.mjs',
  'scripts/validation/v1.17-milestone-audit.mjs',
  'scripts/validation/v1.18-milestone-audit.mjs',
];

// The four C17-bearing harnesses (v1.15..v1.18 only -- v1.19's carve-out is Plan 02's own
// requirement amendment, out of this leaf's scope per the same durability trap above).
const C17_HARNESSES = [
  'scripts/validation/v1.15-milestone-audit.mjs',
  'scripts/validation/v1.16-milestone-audit.mjs',
  'scripts/validation/v1.17-milestone-audit.mjs',
  'scripts/validation/v1.18-milestone-audit.mjs',
];

const FROZEN_LIB = 'scripts/validation/_lib/frozen-at-close.mjs';
const HARNESS_60 = 'scripts/validation/check-phase-60.mjs';

function listHarnesses() {
  const dir = join(process.cwd(), HARNESS_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => HARNESS_PATTERN.test(f));
}

const checks = [];

// === V-140-CONVERSIONS: >=16 harnesses carry the reader; each of the 16 named ones individually does ===
checks.push({
  id: 'CONVERSIONS',
  name: 'V-140-CONVERSIONS: >=' + CONVERTED_FLOOR + ' harnesses carry ' + READER_SYMBOL + '; all 16 named v1.4..v1.18 harnesses individually do',
  run() {
    const files = listHarnesses();
    if (files.length === 0) return { pass: false, detail: 'no ' + HARNESS_DIR + '/v1.*-milestone-audit.mjs files found' };
    let convertedCount = 0;
    for (const f of files) {
      const c = readFile(HARNESS_DIR + '/' + f);
      if (c !== null && c.includes(READER_SYMBOL)) convertedCount++;
    }
    if (convertedCount < CONVERTED_FLOOR) {
      return { pass: false, detail: 'CONVERSIONS floor regression: expected >=' + CONVERTED_FLOOR + ' converted harnesses, got ' + convertedCount };
    }
    const missing = [];
    for (const p of REQUIRED_CONVERTED) {
      const c = readFile(p);
      if (c === null) { missing.push(p + ' (missing)'); continue; }
      if (!c.includes(READER_SYMBOL)) missing.push(p + ' (not converted)');
    }
    if (missing.length > 0) {
      return { pass: false, detail: 'CONVERSIONS individual regression: ' + missing.join(', ') };
    }
    return { pass: true, detail: convertedCount + '/' + files.length + ' harnesses carry ' + READER_SYMBOL + ' (floor ' + CONVERTED_FLOOR + '); all 16 named v1.4..v1.18 harnesses individually confirmed' };
  }
});

// === V-140-V14PIN: V14 pin + rationale + last-entry position in MILESTONE_CLOSE_SHAS ===
checks.push({
  id: 'V14PIN',
  name: 'V-140-V14PIN: ' + FROZEN_LIB + ' carries the V14 pin with rationale, still the last entry in MILESTONE_CLOSE_SHAS',
  run() {
    const c = readFile(FROZEN_LIB);
    if (c === null) return { pass: false, detail: FROZEN_LIB + ' missing' };
    const PIN = "V14: '0b3be9ab'";
    if (!c.includes(PIN)) {
      return { pass: false, detail: 'V14PIN needle absent: literal pin "' + PIN + '" not found' };
    }
    if (!c.includes('AUDIT-CLOSE PIN')) {
      return { pass: false, detail: 'V14PIN rationale absent: "AUDIT-CLOSE PIN" comment text not found' };
    }
    const objMatch = c.match(/export const MILESTONE_CLOSE_SHAS = \{([\s\S]*?)\n\};/);
    if (!objMatch) {
      return { pass: false, detail: 'V14PIN needle absent: MILESTONE_CLOSE_SHAS object literal not found' };
    }
    const body = objMatch[1];
    const pinIdx = body.indexOf(PIN);
    if (pinIdx === -1) {
      return { pass: false, detail: 'V14PIN regression: pin not found inside the MILESTONE_CLOSE_SHAS object body' };
    }
    const after = body.slice(pinIdx + PIN.length);
    if (/\n\s*V\w+:\s*'/.test(after)) {
      return { pass: false, detail: 'V14PIN regression: another V-tag key appears after V14 -- V14 is no longer the last entry (AUDIT-CLOSE pin invariant violated)' };
    }
    return { pass: true, detail: 'V14 pinned with AUDIT-CLOSE rationale, confirmed last entry in MILESTONE_CLOSE_SHAS' };
  }
});

// === V-140-C17CARVEOUT: v1.15..v1.18 each still reference the c17-eee-contract spawn/exception ===
checks.push({
  id: 'C17CARVEOUT',
  name: 'V-140-C17CARVEOUT: v1.15..v1.18 harnesses each reference c17-eee-contract (positive presence, scoped to v1.15-v1.18 only)',
  run() {
    const missing = [];
    for (const p of C17_HARNESSES) {
      const c = readFile(p);
      if (c === null) { missing.push(p + ' (missing)'); continue; }
      if (!c.includes('c17-eee-contract')) missing.push(p + ' (c17-eee-contract reference absent)');
    }
    if (missing.length > 0) {
      return { pass: false, detail: 'C17CARVEOUT regression: ' + missing.join(', ') };
    }
    return { pass: true, detail: '4/4 v1.15..v1.18 harnesses reference c17-eee-contract' };
  }
});

// === V-140-SUBPROCBUDGET: check-phase-60.mjs's subprocess timeout constant stays byte-unchanged ===
checks.push({
  id: 'SUBPROCBUDGET',
  name: 'V-140-SUBPROCBUDGET: ' + HARNESS_60 + ' subprocess timeout constant stays 60000ms (2 occurrences)',
  run() {
    const c = readFile(HARNESS_60);
    if (c === null) return { pass: false, detail: HARNESS_60 + ' missing' };
    const occurrences = (c.match(/timeout: 60000/g) || []).length;
    if (occurrences !== 2) {
      return { pass: false, detail: 'SUBPROCBUDGET drift: expected 2 occurrences of "timeout: 60000", got ' + occurrences };
    }
    return { pass: true, detail: HARNESS_60 + ' carries 2 occurrences of "timeout: 60000" (SWEEP-06 budget met, not raised)' };
  }
});

// === V-140-SELF: dual-invariant guard (CHAIN_PHASES excludes 140; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-140-SELF: CHAIN_PHASES does NOT include 140; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(140)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 140 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (140 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-140 -- Phase 140 deliverables (Frozen-Aware Harness Conversion)\n');
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
