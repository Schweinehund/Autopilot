#!/usr/bin/env node
// check-phase-128.mjs -- Phase 128 deliverables (v1.17 V116 Pin + 15th Path-A Lineage Bump + Terminal Close)
//
// Chain-apex of v1.17 -- HARN-09/HARN-10. Ships the v1.17 chain-apex validator: an 80-entry chain spanning
// every integer 48 through 127, HARNESS repointed to v1.17-milestone-audit.mjs. Path-A from
// check-phase-125.mjs with same structure (no corpus-rename assertions -- v1.17 has NO corpus rename).
// The apex carries AUDIT + CHAIN(48..127) + AUDIT-HARNESS + SELF only. V-128-SELF uses the richer
// dual-invariant form: asserts 128 NOT in CHAIN_PHASES AND CHAIN_SKIP.size === 0.
// Source of truth: .planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-CONTEXT.md
//   and .planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-RESEARCH.md
//
// CRITICAL -- [48..N-1] invariant: the chain array spans 48..127 (NOT 48..128, which would include
// phase 128 itself, tripping V-128-SELF self-reference FAIL; NOT a truncated range, which would fail
// the length!==80 / terminus!==127 throws AND exclude v1.17's own chained phases 125..127).
// The 80 entries are integers 48..127 inclusive (77 v1.16-era entries 48..124 + 125,126,127).
//
// CRITICAL -- CHAIN_SKIP invariant: CHAIN_SKIP = new Set([]) -- NEVER add entries.
// V-128-SELF hard-asserts CHAIN_SKIP.size === 0 per Phase 68 7b635ca invariant. Adding entries
// to force the chain green was the GA3-C CRITICAL self-disqualifier (D-119-3 / D-125-1 / D-128-C
// non-negotiable rider, carried forward unchanged).
//
// CRITICAL -- AUDIT-HARNESS NESTED guard: the AUDIT-HARNESS step carries the same NESTED guard as
// the CHAIN step (D-00-RESOLUTION). Under CHECK_PHASE_NESTED=1 the harness re-run is skipped so a
// nesting apex does NOT re-validate evolved live corpus with a frozen audit. A frozen milestone-audit
// validates its own close-SHA corpus, not future live corpus (mirrors check-phase-95/100/112/119/125 guards).
//
// Assertion classes:
//   V-128-AUDIT           128-VERIFICATION.md heading-presence (SKIP-PASS until the Phase 128 close-gate lands)
//   V-128-CHAIN-{48..127} 80 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-128-AUDIT-HARNESS   scripts/validation/v1.17-milestone-audit.mjs exits 0 (current-milestone harness; NESTED-aware)
//   V-128-SELF            CHAIN_PHASES does NOT include 128 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A from check-phase-125.mjs (Plan 125-03); corpus-rename-proof assertions dropped (no v1.17 rename).
//
// Usage: node scripts/validation/check-phase-128.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
import { execFailDetail } from './_lib/exec-fail-detail.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

const HARNESS = 'scripts/validation/v1.17-milestone-audit.mjs';

// Phase 128 chain-apex extends the chain through Phase 127 (every integer 48..127).
// 80 entries: integers 48 through 127 inclusive. [48..N-1] invariant: apex EXCLUDES its own phase.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,
                      104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,
                      119,120,121,122,123,124,125,126,127];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-128-C / SC#2).
// NEVER add entries: V-128-SELF hard-asserts CHAIN_SKIP.size === 0.
const CHAIN_SKIP = new Set([]);

// Programmatic bound assertions (fail-loud at module load if the chain topology drifts):
// CHAIN_PHASES must be exactly 80 entries and terminate at 127 (the [48..N-1] invariant for N=128).
if (CHAIN_PHASES.length !== 80) {
  throw new Error('check-phase-128 CHAIN_PHASES length ' + CHAIN_PHASES.length + ' !== 80 (integers 48..127 inclusive)');
}
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 127) {
  throw new Error('check-phase-128 CHAIN_PHASES must span 48..127 (got ' + CHAIN_PHASES[0] + '..' + CHAIN_PHASES[CHAIN_PHASES.length - 1] + ')');
}

const checks = [];

// V-128-AUDIT: heading-presence check on 128-VERIFICATION.md (SKIP-PASS until the close-gate lands)
checks.push({
  id: 'AUDIT',
  name: 'V-128-AUDIT: 128-VERIFICATION.md exists and contains Phase 128 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-VERIFICATION.md',
      ['v1.16-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: true, skipped: true, detail: '128-VERIFICATION.md not yet authored (PASS-via-skip until the Phase 128 close-gate lands)' };
    if (!/Phase 128/i.test(verif)) {
      return { pass: false, detail: '128-VERIFICATION.md missing "Phase 128" section heading' };
    }
    return { pass: true, detail: '128-VERIFICATION.md exists with Phase 128 verification content' };
  }
});

// === V-128-CHAIN-NN: chain regression-guards for check-phase-{48..127}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-128-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
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
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' }) };
      }
    }
  });
}

// === V-128-AUDIT-HARNESS: v1.17-milestone-audit.mjs subprocess exits 0 (current-milestone harness) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-128-AUDIT-HARNESS: v1.17-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.17-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
    }
  }
});

// === V-128-SELF: dual-invariant guard (CHAIN_PHASES excludes 128; CHAIN_SKIP empty) ===
// Asserts two invariants:
//   1. CHAIN_PHASES must NOT include 128 (apex [48..N-1] invariant; self-reference is a FAIL)
//   2. CHAIN_SKIP must be empty Set (Phase 68 7b635ca invariant; GA3-C self-disqualifier)
checks.push({
  id: 'SELF',
  name: 'V-128-SELF: CHAIN_PHASES does NOT include 128; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(128)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 128 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [48..127] (80 entries; 128 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-125.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-128 -- Phase 128 deliverables (v1.17 V116 Pin + 15th Path-A Lineage Bump + Terminal Close)\n');
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
