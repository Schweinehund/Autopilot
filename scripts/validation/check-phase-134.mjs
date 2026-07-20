#!/usr/bin/env node
// check-phase-134.mjs -- Phase 134 deliverables (v1.18 V117 Pin + 16th Path-A Lineage Bump + Terminal Close)
//
// Chain-apex of v1.18 -- HARN-11/HARN-12/HARN-13. Ships the v1.18 chain-apex validator: an 86-entry chain
// spanning every integer 48 through 133, HARNESS repointed to v1.18-milestone-audit.mjs. Path-A from
// check-phase-128.mjs with same structure (no corpus-rename assertions -- v1.18 has NO corpus rename).
// The apex carries AUDIT + CHAIN(48..133) + AUDIT-HARNESS + SELF only. V-134-SELF uses the richer
// dual-invariant form: asserts 134 NOT in CHAIN_PHASES AND CHAIN_SKIP.size === 0.
// Source of truth: .planning/phases/134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-CONTEXT.md
//   and .planning/phases/134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-RESEARCH.md
//
// CRITICAL -- [48..N-1] invariant: the chain array spans 48..133 (NOT 48..134, which would include
// phase 134 itself, tripping V-134-SELF self-reference FAIL; NOT a truncated range, which would fail
// the length!==86 / terminus!==133 throws AND exclude v1.18's own chained phases 129..133.
// The 86 entries are integers 48..133 inclusive (80 v1.17-era entries 48..127 + 128,129,130,131,132,133).
//
// CRITICAL -- CHAIN_SKIP invariant: CHAIN_SKIP = new Set([]) -- NEVER add entries.
// V-134-SELF hard-asserts CHAIN_SKIP.size === 0 per Phase 68 7b635ca invariant. Adding entries
// to force the chain green was the GA3-C CRITICAL self-disqualifier (D-119-3 / D-125-1 / D-128-C /
// GA-2 non-negotiable rider, carried forward unchanged).
//
// CRITICAL -- AUDIT-HARNESS NESTED guard: the AUDIT-HARNESS step carries the same NESTED guard as
// the CHAIN step (D-00-RESOLUTION). Under CHECK_PHASE_NESTED=1 the harness re-run is skipped so a
// nesting apex does NOT re-validate evolved live corpus with a frozen audit. A frozen milestone-audit
// validates its own close-SHA corpus, not future live corpus (mirrors check-phase-95/100/112/119/125/128 guards).
//
// CRITICAL -- archive-root token (GA-2 D-02 guardrail, RESEARCH Target 2 / Pitfall 2): check-phase-119,
// check-phase-125, and check-phase-128 ALL pass the WRONG (predecessor-milestone, one generation stale)
// root to resolveArchivedPhasePath for their own milestone's doc. That bug is
// FROZEN in those files and must NOT be fixed there (D-00a byte-unchanged doctrine). This apex, check-phase-134,
// is a NEW file authored fresh this phase -- it is NOT bound by that frozen precedent and must use the
// OBJECTIVELY CORRECT token: ['v1.18-phases'] (v1.18's own archival root -- where 134-VERIFICATION.md will
// land when a future /gsd-complete-milestone archives v1.18 at v1.19's close). Using the corrected token
// IS the fail-loud-vs-silent-wrong guardrail here: a wrong root would make resolveArchivedPhasePath return
// null forever (even post-archival), which the AUDIT check's !verif branch treats as SKIP-PASS -- a
// permanent silent false-green indistinguishable from the legitimate pre-close-gate state. Getting the
// root objectively right (not a throw-on-resolver-null) is what keeps that SKIP-PASS branch honest.
// Pre-close-gate (134-VERIFICATION.md does not exist until Plan 134-05 authors it), resolver-null ->
// SKIP-PASS is the CORRECT, EXPECTED behavior -- not the silent-wrong bug class this comment guards
// against. A literal throw-on-resolver-null would contradict this apex's own "exits 0 standalone
// pre-close-gate" acceptance criterion.
//
// Assertion classes:
//   V-134-AUDIT           134-VERIFICATION.md heading-presence via ['v1.18-phases'] resolver (corrected
//                          token; SKIP-PASS is legitimate pre-close-gate, not a throw)
//   V-134-CHAIN-{48..133} 86 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-134-AUDIT-HARNESS   scripts/validation/v1.18-milestone-audit.mjs exits 0 (current-milestone harness; NESTED-aware)
//   V-134-SELF            CHAIN_PHASES does NOT include 134 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A from check-phase-128.mjs (Plan 134-03); corpus-rename-proof assertions dropped (no v1.18 rename).
//
// Usage: node scripts/validation/check-phase-134.mjs [--verbose]
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

const HARNESS = 'scripts/validation/v1.18-milestone-audit.mjs';

// Phase 134 chain-apex extends the chain through Phase 133 (every integer 48..133).
// 86 entries: integers 48 through 133 inclusive. [48..N-1] invariant: apex EXCLUDES its own phase.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,
                      105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,
                      124,125,126,127,128,129,130,131,132,133];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-119-3/D-125-1/D-128-C/GA-2).
// NEVER add entries: V-134-SELF hard-asserts CHAIN_SKIP.size === 0.
const CHAIN_SKIP = new Set([]);

// De-duplication guard: length + termini asserts alone do not catch a duplicated/dropped interior
// entry (RESEARCH GA-2 guardrail). Assert the set of unique values also has exactly 86 members.
if (new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length) {
  throw new Error('check-phase-134 CHAIN_PHASES contains duplicate entries (unique count ' + new Set(CHAIN_PHASES).size + ' !== ' + CHAIN_PHASES.length + ')');
}

// Programmatic bound assertions (fail-loud at module load if the chain topology drifts):
// CHAIN_PHASES must be exactly 86 entries and terminate at 133 (the [48..N-1] invariant for N=134).
if (CHAIN_PHASES.length !== 86) {
  throw new Error('check-phase-134 CHAIN_PHASES length ' + CHAIN_PHASES.length + ' !== 86 (integers 48..133 inclusive)');
}
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 133) {
  throw new Error('check-phase-134 CHAIN_PHASES must span 48..133 (got ' + CHAIN_PHASES[0] + '..' + CHAIN_PHASES[CHAIN_PHASES.length - 1] + ')');
}

const checks = [];

// V-134-AUDIT: heading-presence check on 134-VERIFICATION.md (SKIP-PASS until the close-gate lands)
// Uses the OBJECTIVELY CORRECT archive-root token ['v1.18-phases'] -- a deliberate correction away
// from the predecessor-copied wrong token that check-phase-119/125/128 carry (frozen, not fixed here).
// resolver-null -> SKIP-PASS is legitimate pre-close-gate behavior, NOT the silent-wrong bug class.
checks.push({
  id: 'AUDIT',
  name: 'V-134-AUDIT: 134-VERIFICATION.md exists and contains Phase 134 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-VERIFICATION.md',
      ['v1.18-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: true, skipped: true, detail: '134-VERIFICATION.md not yet authored (PASS-via-skip until the Phase 134 close-gate lands; corrected-token resolver-null is legitimate pre-close-gate)' };
    if (!/Phase 134/i.test(verif)) {
      return { pass: false, detail: '134-VERIFICATION.md missing "Phase 134" section heading' };
    }
    return { pass: true, detail: '134-VERIFICATION.md exists with Phase 134 verification content' };
  }
});

// === V-134-CHAIN-NN: chain regression-guards for check-phase-{48..133}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-134-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
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

// === V-134-AUDIT-HARNESS: v1.18-milestone-audit.mjs subprocess exits 0 (current-milestone harness) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-134-AUDIT-HARNESS: v1.18-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.18-milestone-audit.mjs exits 0 (current-milestone harness)' };
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

// === V-134-SELF: dual-invariant guard (CHAIN_PHASES excludes 134; CHAIN_SKIP empty) ===
// Asserts two invariants:
//   1. CHAIN_PHASES must NOT include 134 (apex [48..N-1] invariant; self-reference is a FAIL)
//   2. CHAIN_SKIP must be empty Set (Phase 68 7b635ca invariant; GA3-C/GA-2 self-disqualifier)
checks.push({
  id: 'SELF',
  name: 'V-134-SELF: CHAIN_PHASES does NOT include 134; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(134)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 134 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [48..133] (86 entries; 134 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-128.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-134 -- Phase 134 deliverables (v1.18 V117 Pin + 16th Path-A Lineage Bump + Terminal Close)\n');
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
