#!/usr/bin/env node
// check-phase-141.mjs -- Phase 141 deliverables (Standalone-RED Validator Set -- Chain Members Green)
//
// v1.20 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-144.mjs).
// NEEDLES DERIVED INLINE from 141-VERIFICATION.md (Observable Truths table): the pin helper's own
// self-test (RED-02's own deliverable, spawned per the check-phase-119.mjs idiom but WITHOUT a
// nested-invocation guard -- a leaf has none), SWEEP-09's thirteen landed reader/call-site
// conversions in check-phase-61/68/70.mjs (measured, pinned as exact per-file equalities), and
// RED-01's static outcome (the frozen-corpus reader present in v1.5/v1.6, the rebased baseline
// identifier named in the pin helper).
//
// CRITICAL DURABILITY TRAP (144-PATTERNS.md, 144-RESEARCH.md Pitfall 2): this leaf must NEVER
// reference the ten-chicken-and-egg-guard chain member Plan 03 of this same phase converts, in
// any form -- any count or presence assertion about that file would self-detonate the apex the
// moment this phase's own sibling plan lands. Phase 141's OWN durable deliverables (the three
// files below, the pin helper, the V15/V16 harnesses) are used instead.
//
// Assertion classes:
//   V-141-PINSELFTEST   regenerate-supervision-pins.mjs --self-test exits 0 (subprocess spawn, check-phase-119.mjs idiom, no NESTED guard)
//   V-141-SWEEP09-61    check-phase-61.mjs's readAtV15CloseFor61( delegation call-site count stays at the measured value (exact equality)
//   V-141-SWEEP09-68    check-phase-68.mjs's chicken-and-egg occurrence count stays at the measured value (exact equality)
//   V-141-SWEEP09-70    check-phase-70.mjs's chicken-and-egg occurrence count stays at the measured value (exact equality)
//   V-141-RED01         v1.5/v1.6 harnesses carry the frozen-corpus reader; pin helper names the rebased BASELINE_9 identifier
//   V-141-SELF          CHAIN_PHASES does NOT include 141 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-141.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { execFailDetail } from './_lib/exec-fail-detail.mjs';

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

const PIN_HELPER = 'scripts/validation/regenerate-supervision-pins.mjs';
const CHECK_61 = 'scripts/validation/check-phase-61.mjs';
const CHECK_68 = 'scripts/validation/check-phase-68.mjs';
const CHECK_70 = 'scripts/validation/check-phase-70.mjs';
const V15_HARNESS = 'scripts/validation/v1.5-milestone-audit.mjs';
const V16_HARNESS = 'scripts/validation/v1.6-milestone-audit.mjs';

// Measured at authoring time (144-04) -- durable pins, since Phase 144 never edits these three
// files (its own files_modified list is _lib/frozen-at-close.mjs, the v1.19 harness, the
// ten-guard chain member named above, regenerate-supervision-pins.mjs, workflows, and planning
// docs -- none of 61/68/70).
const SWEEP09_61_DELEGATE_COUNT = 9;   // readAtV15CloseFor61( occurrences (1 function def + 8 call-sites)
const SWEEP09_68_SITE_COUNT = 2;       // chicken-and-egg occurrences
const SWEEP09_70_SITE_COUNT = 11;      // chicken-and-egg occurrences

const checks = [];

// === V-141-PINSELFTEST: pin helper's own --self-test subprocess spawn (check-phase-119.mjs idiom) ===
checks.push({
  id: 'PINSELFTEST',
  name: 'V-141-PINSELFTEST: ' + PIN_HELPER + ' --self-test exits 0',
  run() {
    if (!existsSync(join(process.cwd(), PIN_HELPER))) {
      return { pass: true, skipped: true, detail: PIN_HELPER + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [PIN_HELPER, '--self-test'], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: PIN_HELPER + ' --self-test exits 0 (RED-02 deliverable)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: true, prefix: 'pin helper self-test FAIL: ' }) };
    }
  }
});

// === V-141-SWEEP09-61/-68/-70: SWEEP-09's thirteen landed sites, pinned as per-file exact equalities ===
checks.push({
  id: 'SWEEP09-61',
  name: 'V-141-SWEEP09-61: ' + CHECK_61 + ' readAtV15CloseFor61( occurrence count === ' + SWEEP09_61_DELEGATE_COUNT,
  run() {
    const c = readFile(CHECK_61);
    if (c === null) return { pass: false, detail: CHECK_61 + ' missing' };
    const count = (c.match(/readAtV15CloseFor61\(/g) || []).length;
    if (count !== SWEEP09_61_DELEGATE_COUNT) {
      return { pass: false, detail: 'SWEEP09-61 drift: expected ' + SWEEP09_61_DELEGATE_COUNT + ' readAtV15CloseFor61( occurrences (1 def + 8 call-sites), got ' + count };
    }
    return { pass: true, detail: count + ' readAtV15CloseFor61( occurrences (1 def + 8 call-sites, SWEEP-09 delegate-not-swallow site)' };
  }
});

checks.push({
  id: 'SWEEP09-68',
  name: 'V-141-SWEEP09-68: ' + CHECK_68 + ' chicken-and-egg occurrence count === ' + SWEEP09_68_SITE_COUNT,
  run() {
    const c = readFile(CHECK_68);
    if (c === null) return { pass: false, detail: CHECK_68 + ' missing' };
    const count = (c.match(/chicken-and-egg/g) || []).length;
    if (count !== SWEEP09_68_SITE_COUNT) {
      return { pass: false, detail: 'SWEEP09-68 drift: expected ' + SWEEP09_68_SITE_COUNT + ' chicken-and-egg occurrences, got ' + count };
    }
    return { pass: true, detail: count + ' chicken-and-egg occurrences (SWEEP-09 fail-loud conversion)' };
  }
});

checks.push({
  id: 'SWEEP09-70',
  name: 'V-141-SWEEP09-70: ' + CHECK_70 + ' chicken-and-egg occurrence count === ' + SWEEP09_70_SITE_COUNT,
  run() {
    const c = readFile(CHECK_70);
    if (c === null) return { pass: false, detail: CHECK_70 + ' missing' };
    const count = (c.match(/chicken-and-egg/g) || []).length;
    if (count !== SWEEP09_70_SITE_COUNT) {
      return { pass: false, detail: 'SWEEP09-70 drift: expected ' + SWEEP09_70_SITE_COUNT + ' chicken-and-egg occurrences, got ' + count };
    }
    return { pass: true, detail: count + ' chicken-and-egg occurrences (SWEEP-09 fail-loud conversion)' };
  }
});

// === V-141-RED01: v1.5/v1.6 carry the frozen-corpus reader; pin helper names the rebased baseline ===
checks.push({
  id: 'RED01',
  name: 'V-141-RED01: v1.5/v1.6 harnesses carry createFrozenCorpusReader; pin helper names BASELINE_9',
  run() {
    const missing = [];
    for (const p of [V15_HARNESS, V16_HARNESS]) {
      const c = readFile(p);
      if (c === null) { missing.push(p + ' (missing)'); continue; }
      if (!c.includes('createFrozenCorpusReader')) missing.push(p + ' (reader absent)');
    }
    if (missing.length > 0) {
      return { pass: false, detail: 'RED01 regression: ' + missing.join(', ') };
    }
    const helper = readFile(PIN_HELPER);
    if (helper === null) return { pass: false, detail: PIN_HELPER + ' missing' };
    if (!helper.includes('BASELINE_9')) {
      return { pass: false, detail: 'RED01 needle absent: pin helper does not name BASELINE_9 (Phase 141 rebase)' };
    }
    return { pass: true, detail: 'v1.5/v1.6 harnesses carry the frozen-corpus reader; pin helper names BASELINE_9' };
  }
});

// === V-141-SELF: dual-invariant guard (CHAIN_PHASES excludes 141; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-141-SELF: CHAIN_PHASES does NOT include 141; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(141)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 141 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (141 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-141 -- Phase 141 deliverables (Standalone-RED Validator Set -- Chain Members Green)\n');
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
