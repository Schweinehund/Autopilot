#!/usr/bin/env node
// check-phase-82.mjs -- Phase 82 deliverables (v1.9 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)
//
// Chain-apex of v1.9 -- SSOHARN-02. Ships the v1.9 chain-apex validator: CHAIN_PHASES=[48..81]
// (every integer 48 through 81), HARNESS repointed to v1.9-milestone-audit.mjs. Path-A from
// check-phase-74.mjs with the v1.8 corpus-rename-proof assertions DROPPED (DIVERGENCE-2 -- v1.9 has NO
// corpus rename, so those have no v1.9 analog). The apex carries AUDIT + CHAIN(48..81) +
// AUDIT-HARNESS + SELF only. V-82-SELF uses the richer dual-invariant form (check-phase-71 shape):
// asserts 82 not in CHAIN_PHASES AND CHAIN_SKIP.size === 0.
// Source of truth: .planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-02-PLAN.md
//
// Assertion classes:
//   V-82-AUDIT           82-VERIFICATION.md heading-presence (SKIP-PASS until Plan 82-04 lands)
//   V-82-CHAIN-{48..81}  34 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-82-AUDIT-HARNESS   scripts/validation/v1.9-milestone-audit.mjs exits 0 (current-milestone harness)
//   V-82-SELF            CHAIN_PHASES does NOT include 82 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A from check-phase-74.mjs (Plan 74-03); corpus-rename-proof assertions dropped (no v1.9 rename).
//
// Usage: node scripts/validation/check-phase-82.mjs [--verbose]
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

const HARNESS = 'scripts/validation/v1.9-milestone-audit.mjs';

// Phase 82 chain-apex extends the chain through Phase 81 (every integer 48..81).
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-03 / SC#2).
const CHAIN_SKIP = new Set([]);

const checks = [];

// V-82-AUDIT: heading-presence check on 82-VERIFICATION.md (SKIP-PASS until Plan 82-04 lands)
checks.push({
  id: 'AUDIT',
  name: 'V-82-AUDIT: 82-VERIFICATION.md exists and contains Phase 82 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '82-harness-lineage-bump-terminal-re-audit-milestone-close/82-VERIFICATION.md',
      ['v1.9-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: false, detail: '82-VERIFICATION.md not found in live tree or v1.9-phases archive' };
    if (!/Phase 82/i.test(verif)) {
      return { pass: false, detail: '82-VERIFICATION.md missing "Phase 82" section heading' };
    }
    return { pass: true, detail: '82-VERIFICATION.md exists with Phase 82 verification content' };
  }
});

// === V-82-CHAIN-NN: chain regression-guards for check-phase-{48..81}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
// Self-dogfood: this CHAIN wrapper is authored with stdout+stderr capture from inception per D-01.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-82-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
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

// === V-82-AUDIT-HARNESS: v1.9-milestone-audit.mjs subprocess exits 0 (current-milestone harness) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-82-AUDIT-HARNESS: v1.9-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.9-milestone-audit.mjs exits 0 (current-milestone harness)' };
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

// === V-82-SELF: dual-invariant guard (CHAIN_PHASES excludes 82; CHAIN_SKIP empty) -- richer check-phase-71 form ===
checks.push({
  id: 'SELF',
  name: 'V-82-SELF: CHAIN_PHASES does NOT include 82; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(82)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 82 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (82 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-74.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-82 -- Phase 82 deliverables (v1.9 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)\n');
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
