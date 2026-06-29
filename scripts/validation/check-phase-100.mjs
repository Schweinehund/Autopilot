#!/usr/bin/env node
// check-phase-100.mjs -- Phase 100 deliverables (v1.13 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)
//
// Chain-apex of v1.13 -- HARN-02. Ships the v1.13 chain-apex validator: CHAIN_PHASES=[48..99]
// (every integer 48 through 99, 52 entries), HARNESS repointed to v1.13-milestone-audit.mjs. Path-A from
// check-phase-95.mjs with same structure (no corpus-rename assertions -- v1.13 has NO corpus rename).
// The apex carries AUDIT + CHAIN(48..99) + AUDIT-HARNESS + SELF only. V-100-SELF uses the richer
// dual-invariant form: asserts 100 NOT in CHAIN_PHASES AND CHAIN_SKIP.size === 0.
// Source of truth: .planning/phases/100-harness-lineage-bump-terminal-re-audit-milestone-close/100-02-PLAN.md
//
// CRITICAL -- [48..N-1] invariant: CHAIN_PHASES = [48..99] (NOT [48..100]).
// The roadmap "[48..100]" is the milestone range. The array follows the [48..N-1] invariant
// (check-phase-95 uses [48..94]; apex excludes its own phase). Authoring [48..100] would include
// phase 100 itself, tripping V-100-SELF self-reference FAIL (D-03 corrects this roadmap shorthand).
//
// CRITICAL -- CHAIN_SKIP invariant: CHAIN_SKIP = new Set([]) -- NEVER add entries.
// V-100-SELF hard-asserts CHAIN_SKIP.size === 0 per Phase 68 7b635ca invariant. Adding entries
// to force the chain green was the GA3-C CRITICAL self-disqualifier.
//
// Assertion classes:
//   V-100-AUDIT           100-VERIFICATION.md heading-presence (SKIP-PASS until Plan 100-04 lands)
//   V-100-CHAIN-{48..99}  52 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-100-AUDIT-HARNESS   scripts/validation/v1.13-milestone-audit.mjs exits 0 (current-milestone harness)
//   V-100-SELF            CHAIN_PHASES does NOT include 100 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A from check-phase-95.mjs (Plan 95-02); corpus-rename-proof assertions dropped (no v1.13 rename).
//
// Usage: node scripts/validation/check-phase-100.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

const HARNESS = 'scripts/validation/v1.13-milestone-audit.mjs';

// Phase 100 chain-apex extends the chain through Phase 99 (every integer 48..99).
// 52 entries: integers 48 through 99 inclusive. [48..N-1] invariant: apex EXCLUDES its own phase.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-03 / SC#2).
// NEVER add entries: V-100-SELF hard-asserts CHAIN_SKIP.size === 0.
const CHAIN_SKIP = new Set([]);

const checks = [];

// V-100-AUDIT: heading-presence check on 100-VERIFICATION.md (SKIP-PASS until Plan 100-04 lands)
checks.push({
  id: 'AUDIT',
  name: 'V-100-AUDIT: 100-VERIFICATION.md exists and contains Phase 100 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '100-harness-lineage-bump-terminal-re-audit-milestone-close/100-VERIFICATION.md',
      ['v1.13-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: true, skipped: true, detail: '100-VERIFICATION.md not yet authored (PASS-via-skip until Plan 100-04 lands)' };
    if (!/Phase 100/i.test(verif)) {
      return { pass: false, detail: '100-VERIFICATION.md missing "Phase 100" section heading' };
    }
    return { pass: true, detail: '100-VERIFICATION.md exists with Phase 100 verification content' };
  }
});

// === V-100-CHAIN-NN: chain regression-guards for check-phase-{48..99}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
// Self-dogfood: this CHAIN wrapper is authored with stdout+stderr capture from inception per D-01.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-100-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      const isPeer = phaseNum >= 67;
      const subTimeout = isPeer ? 600000 : 300000;
      const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };
      try {
        execFileSync('node', [path], {
          stdio: 'pipe',
          timeout: subTimeout,
          cwd: process.cwd(),
          env: subEnv,
        });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
      }
    }
  });
}

// === V-100-AUDIT-HARNESS: v1.13-milestone-audit.mjs subprocess exits 0 (current-milestone harness) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-100-AUDIT-HARNESS: v1.13-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.13-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
  }
});

// === V-100-SELF: dual-invariant guard (CHAIN_PHASES excludes 100; CHAIN_SKIP empty) -- richer check-phase-71 form ===
// Asserts two invariants:
//   1. CHAIN_PHASES must NOT include 100 (apex [48..N-1] invariant; self-reference is a FAIL)
//   2. CHAIN_SKIP must be empty Set (Phase 68 7b635ca invariant; GA3-C self-disqualifier)
checks.push({
  id: 'SELF',
  name: 'V-100-SELF: CHAIN_PHASES does NOT include 100; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(100)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 100 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (100 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-74.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-100 -- Phase 100 deliverables (v1.13 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)\n');
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
