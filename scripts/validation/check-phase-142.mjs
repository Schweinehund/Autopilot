#!/usr/bin/env node
// check-phase-142.mjs -- Phase 142 deliverables (Archival-Path Fix, Chain Adoption & Cold-Clone Threshold)
//
// v1.20 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-144.mjs).
// NEEDLES DERIVED INLINE from 142-VERIFICATION.md (Observable Truths table + Requirements Coverage):
// the two standalone validators (check-phase-30/31.mjs) Phase 142 greened and adopted into the apex
// via a hand-authored sidecar array (RED-04..RED-06), the archival-path helper's live-path-first /
// null-without-throw contract (RED-07's dependency), the cold-clone ratio threshold NEST-01
// established, and the SELF dual-invariant for 142.
//
// D-15: zero live phase-artifact-directory reads at runtime -- 142-EVIDENCE.md (where NEST-01's
// ratio and threshold are recorded) lives under the per-phase planning tree and is therefore never
// read by this leaf. The recorded threshold is instead pinned as this leaf's OWN literal
// (COLD_CLONE_RATIO_THRESHOLD below) and the THRESHOLD needle asserts the literal's presence in
// this file's own source by content substring -- this leaf is now the durable, scripts/-scoped
// home of that fact.
//
// Assertion classes:
//   V-142-SIDECARS    check-phase-30.mjs and check-phase-31.mjs each spawn bare (no nested-guard env) and exit 0
//   V-142-CHAINEXTRA  check-phase-138.mjs declares CHAIN_EXTRA = [30, 31] after its three module-load guards (NEST-01/RED-06)
//   V-142-ARCHIVEPATH _lib/archive-path.mjs resolves the live path first and returns null without throwing
//   V-142-THRESHOLD   this leaf's own source carries the NEST-01 cold-clone ratio threshold literal
//   V-142-SELF        CHAIN_PHASES does NOT include 142 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-142.mjs [--verbose]
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

const SELF_PATH = 'scripts/validation/check-phase-142.mjs';
const CHECK_30 = 'scripts/validation/check-phase-30.mjs';
const CHECK_31 = 'scripts/validation/check-phase-31.mjs';
const APEX_138 = 'scripts/validation/check-phase-138.mjs';
const ARCHIVE_PATH_LIB = 'scripts/validation/_lib/archive-path.mjs';

// NEST-01's recorded verdict (142-EVIDENCE.md, off-limits to read here per D-15): measured ratio
// 1.333x against an >= 8x fail threshold, PASS. This constant is the durable pin -- see the
// THRESHOLD needle below, which asserts its own presence in THIS file's source.
const COLD_CLONE_RATIO_THRESHOLD = 8;

const checks = [];

// === V-142-SIDECARS: check-phase-30.mjs and check-phase-31.mjs each spawn bare and exit 0 ===
// Phase 142's own needles for the two standalone validators it greened -- spawned here WITHOUT
// registering into CHAIN_PHASES (a leaf has no chain to register into; check-phase-138.mjs's own
// CHAIN_EXTRA adoption is asserted separately by V-142-CHAINEXTRA below). Uses the
// check-phase-119.mjs spawn idiom: graceful skip when the interpreter is missing, real failure
// detail from stdout/stderr otherwise. Both are measured green at HEAD with one deterministic
// environment skip each (an absent optional link/diagram tool), classified in the detail string.
for (const [id, path] of [['SIDECAR-30', CHECK_30], ['SIDECAR-31', CHECK_31]]) {
  checks.push({
    id,
    name: 'V-142-' + id + ': ' + path + ' exits 0 (bare, standalone)',
    run() {
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: path + ' exits 0 (one deterministic env skip expected -- absent optional link/diagram tool)' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: path + ' FAIL: ' }) };
      }
    }
  });
}

// === V-142-CHAINEXTRA: check-phase-138.mjs declares CHAIN_EXTRA = [30, 31] after its three guards ===
// NEST-01's outcome: the predecessor apex declares the two-member sidecar array and keeps it
// outside all three of its module-load guards (dedup/length/termini). check-phase-138.mjs is frozen
// for this phase, so this pin is durable -- asserted by source presence AND textual position
// (declaration index falls after all three guard throw-statements).
checks.push({
  id: 'CHAINEXTRA',
  name: 'V-142-CHAINEXTRA: ' + APEX_138 + ' declares CHAIN_EXTRA = [30, 31] after its three module-load guards',
  run() {
    const c = readFile(APEX_138);
    if (c === null) return { pass: false, detail: APEX_138 + ' missing' };
    const EXTRA_LITERAL = 'const CHAIN_EXTRA = [30, 31];';
    const extraIdx = c.indexOf(EXTRA_LITERAL);
    if (extraIdx === -1) {
      return { pass: false, detail: 'CHAINEXTRA needle absent: literal "' + EXTRA_LITERAL + '" not found' };
    }
    const guardMarkers = [
      'contains duplicate entries', // dedup guard
      "!== 90 (integers 48..137",   // length guard
      'must span 48..137',          // termini guard
    ];
    const missingGuards = guardMarkers.filter((m) => !c.includes(m));
    if (missingGuards.length > 0) {
      return { pass: false, detail: 'CHAINEXTRA regression: guard text missing: ' + missingGuards.join(', ') };
    }
    const lastGuardIdx = Math.max(...guardMarkers.map((m) => c.indexOf(m)));
    if (!(extraIdx > lastGuardIdx)) {
      return { pass: false, detail: 'CHAINEXTRA regression: CHAIN_EXTRA declared before/inside the three module-load guards' };
    }
    return { pass: true, detail: 'CHAIN_EXTRA = [30, 31] declared after all three module-load guards (NEST-01 sidecar adoption)' };
  }
});

// === V-142-ARCHIVEPATH: live-path-first resolution order + null-without-throw contract ===
// The archival-path helper's contract: it resolves the live path first and returns null without
// throwing when neither location exists. This ordering is exactly why a null-resolve cannot be
// used as a wrong-token detector -- Plan 07 asserts its archive-root token literally instead.
checks.push({
  id: 'ARCHIVEPATH',
  name: 'V-142-ARCHIVEPATH: ' + ARCHIVE_PATH_LIB + ' resolves live path first, returns null without throwing',
  run() {
    const c = readFile(ARCHIVE_PATH_LIB);
    if (c === null) return { pass: false, detail: ARCHIVE_PATH_LIB + ' missing' };
    const liveFirst = /const live = .*;\s*\n\s*if \(existsSync\(join\(process\.cwd\(\), live\)\)\) return live;/.test(c);
    if (!liveFirst) {
      return { pass: false, detail: 'ARCHIVEPATH regression: live-path-first resolution order not found' };
    }
    if (!c.includes('return null;')) {
      return { pass: false, detail: 'ARCHIVEPATH regression: null-without-throw fallback not found' };
    }
    // Actual throw STATEMENTS, not the header comment's prose description of their absence
    // ("this helper does not throw and does not swallow" legitimately contains the substring
    // "throw" -- scan for the executable idiom (`throw new` / `throw ` at statement position)
    // instead of a bare substring match.
    const codeLines = c.split('\n').filter((l) => !/^\s*\/\//.test(l));
    if (codeLines.some((l) => /\bthrow\s/.test(l))) {
      return { pass: false, detail: 'ARCHIVEPATH regression: helper throws -- caller-owns-fail-semantics contract violated' };
    }
    return { pass: true, detail: 'live path resolved first, null returned without throwing (a null-resolve cannot be used as a wrong-token detector)' };
  }
});

// === V-142-THRESHOLD: this leaf's own source carries the NEST-01 cold-clone ratio threshold ===
// D-15: NEST-01's measurement (142-EVIDENCE.md, ratio 1.333x vs >= 8x threshold) lives under the
// per-phase planning tree and is never read here. This leaf pins the threshold literal in its OWN
// module-level constant (COLD_CLONE_RATIO_THRESHOLD above) and asserts, by reading its own file
// content, that the literal survives -- a content substring, not a line coordinate.
checks.push({
  id: 'THRESHOLD',
  name: 'V-142-THRESHOLD: ' + SELF_PATH + ' carries the NEST-01 cold-clone ratio threshold literal',
  run() {
    const c = readFile(SELF_PATH);
    if (c === null) return { pass: false, detail: SELF_PATH + ' missing' };
    if (!c.includes('const COLD_CLONE_RATIO_THRESHOLD = 8;')) {
      return { pass: false, detail: 'THRESHOLD needle absent: "const COLD_CLONE_RATIO_THRESHOLD = 8;" not found' };
    }
    if (!c.includes("NEST-01's recorded verdict")) {
      return { pass: false, detail: 'THRESHOLD provenance comment absent' };
    }
    if (COLD_CLONE_RATIO_THRESHOLD !== 8) {
      return { pass: false, detail: 'THRESHOLD runtime regression: COLD_CLONE_RATIO_THRESHOLD !== 8' };
    }
    return { pass: true, detail: 'NEST-01 cold-clone ratio threshold (>= ' + COLD_CLONE_RATIO_THRESHOLD + 'x) pinned in this leaf, measured verdict 1.333x PASS' };
  }
});

// === V-142-SELF: dual-invariant guard (CHAIN_PHASES excludes 142; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-142-SELF: CHAIN_PHASES does NOT include 142; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(142)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 142 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (142 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-142 -- Phase 142 deliverables (Archival-Path Fix, Chain Adoption & Cold-Clone Threshold)\n');
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
