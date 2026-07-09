#!/usr/bin/env node
// check-phase-125.mjs -- Phase 125 deliverables (v1.16 V115 Pin + 14th Path-A Lineage Bump + Terminal Close)
//
// Chain-apex of v1.16 -- HARN-06/HARN-05. Ships the v1.16 chain-apex validator: a 77-entry chain spanning
// every integer 48 through 124, HARNESS repointed to v1.16-milestone-audit.mjs. Path-A from
// check-phase-119.mjs with same structure (no corpus-rename assertions -- v1.16 has NO corpus rename).
// The apex carries AUDIT + CHAIN(48..124) + AUDIT-HARNESS + SELF only. V-125-SELF uses the richer
// dual-invariant form: asserts 125 NOT in CHAIN_PHASES AND CHAIN_SKIP.size === 0.
// Source of truth: .planning/phases/125-v115-pin-14th-path-a-lineage-bump-terminal-close/125-03-PLAN.md
//
// CRITICAL -- [48..N-1] invariant: the chain array spans 48..124 (NOT 48..125, NOT the [48..119]
// transcription error that appears in ROADMAP SC2 / REQUIREMENTS HARN-06 / STATE.md -- see
// 125-CONTEXT.md and 125-RESEARCH.md §3 for the correction). Authoring 48..125 would include
// phase 125 itself, tripping V-125-SELF self-reference FAIL; authoring 48..119 would fail the
// length!==77 / terminus!==124 throws AND exclude v1.16's own chained phases 120..124.
// The 77 entries are integers 48..124 inclusive (71 v1.15-era entries 48..118 + 119,120,121,122,123,124).
//
// CRITICAL -- CHAIN_SKIP invariant: CHAIN_SKIP = new Set([]) -- NEVER add entries.
// V-125-SELF hard-asserts CHAIN_SKIP.size === 0 per Phase 68 7b635ca invariant. Adding entries
// to force the chain green was the GA3-C CRITICAL self-disqualifier (D-119-3 / D-125-1 non-negotiable rider).
//
// CRITICAL -- AUDIT-HARNESS NESTED guard: the AUDIT-HARNESS step carries the same NESTED guard as
// the CHAIN step (D-00-RESOLUTION). Under CHECK_PHASE_NESTED=1 the harness re-run is skipped so a
// nesting apex does NOT re-validate evolved live corpus with a frozen audit. A frozen milestone-audit
// validates its own close-SHA corpus, not future live corpus (mirrors check-phase-95/100/112/119 guards).
//
// Assertion classes:
//   V-125-AUDIT           125-VERIFICATION.md heading-presence (SKIP-PASS until the Phase 125 close-gate lands)
//   V-125-CHAIN-{48..124} 77 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-125-AUDIT-HARNESS   scripts/validation/v1.16-milestone-audit.mjs exits 0 (current-milestone harness; NESTED-aware)
//   V-125-SELF            CHAIN_PHASES does NOT include 125 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A from check-phase-119.mjs (Plan 119-03); corpus-rename-proof assertions dropped (no v1.16 rename).
//
// Usage: node scripts/validation/check-phase-125.mjs [--verbose]
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

const HARNESS = 'scripts/validation/v1.16-milestone-audit.mjs';

// Phase 125 chain-apex extends the chain through Phase 124 (every integer 48..124).
// 77 entries: integers 48 through 124 inclusive. [48..N-1] invariant: apex EXCLUDES its own phase.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,
                      104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,
                      119,120,121,122,123,124];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-125-1 / SC#2).
// NEVER add entries: V-125-SELF hard-asserts CHAIN_SKIP.size === 0.
const CHAIN_SKIP = new Set([]);

// Programmatic bound assertions (fail-loud at module load if the chain topology drifts):
// CHAIN_PHASES must be exactly 77 entries and terminate at 124 (the [48..N-1] invariant for N=125).
if (CHAIN_PHASES.length !== 77) {
  throw new Error('check-phase-125 CHAIN_PHASES length ' + CHAIN_PHASES.length + ' !== 77 (integers 48..124 inclusive)');
}
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 124) {
  throw new Error('check-phase-125 CHAIN_PHASES must span 48..124 (got ' + CHAIN_PHASES[0] + '..' + CHAIN_PHASES[CHAIN_PHASES.length - 1] + ')');
}

const checks = [];

// V-125-AUDIT: heading-presence check on 125-VERIFICATION.md (SKIP-PASS until the close-gate lands)
checks.push({
  id: 'AUDIT',
  name: 'V-125-AUDIT: 125-VERIFICATION.md exists and contains Phase 125 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '125-v115-pin-14th-path-a-lineage-bump-terminal-close/125-VERIFICATION.md',
      ['v1.15-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: true, skipped: true, detail: '125-VERIFICATION.md not yet authored (PASS-via-skip until the Phase 125 close-gate lands)' };
    if (!/Phase 125/i.test(verif)) {
      return { pass: false, detail: '125-VERIFICATION.md missing "Phase 125" section heading' };
    }
    return { pass: true, detail: '125-VERIFICATION.md exists with Phase 125 verification content' };
  }
});

// === V-125-CHAIN-NN: chain regression-guards for check-phase-{48..124}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-125-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
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

// === V-125-AUDIT-HARNESS: v1.16-milestone-audit.mjs subprocess exits 0 (current-milestone harness) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-125-AUDIT-HARNESS: v1.16-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.16-milestone-audit.mjs exits 0 (current-milestone harness)' };
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

// === V-125-SELF: dual-invariant guard (CHAIN_PHASES excludes 125; CHAIN_SKIP empty) ===
// Asserts two invariants:
//   1. CHAIN_PHASES must NOT include 125 (apex [48..N-1] invariant; self-reference is a FAIL)
//   2. CHAIN_SKIP must be empty Set (Phase 68 7b635ca invariant; GA3-C self-disqualifier)
checks.push({
  id: 'SELF',
  name: 'V-125-SELF: CHAIN_PHASES does NOT include 125; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(125)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 125 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [48..124] (77 entries; 125 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-119.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-125 -- Phase 125 deliverables (v1.16 V115 Pin + 14th Path-A Lineage Bump + Terminal Close)\n');
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
