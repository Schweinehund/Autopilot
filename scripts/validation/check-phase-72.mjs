#!/usr/bin/env node
// check-phase-72.mjs -- Phase 72 deliverables (Chain-Wrapper Hardening Pillar B)
//
// Pillar B of v1.8 — WRAPPER-01: Fix 6 CHAIN-regression-guard catch blocks in
// check-phase-{66,67,68,69,70,71}.mjs to capture both err.stdout AND err.stderr.
// Author new chain-apex validator (this file) with corrected pattern from inception (self-dogfood).
// Source of truth: .planning/phases/72-chain-wrapper-hardening-pillar-b/72-CONTEXT.md
//
// Assertion classes:
//   V-72-WRAPPER-01..07    Source-text regex scan of check-phase-{66..72}.mjs CHAIN wrapper catch blocks
//                          (parameterized over FIXED_FILES = [66,67,68,69,70,71,72])
//                          Asserts: each CHAIN wrapper catch block captures BOTH err.stderr AND err.stdout
//   V-72-WRAPPER-NEG       Negative invariant: zero stderr-only CHAIN wrappers remain across FIXED_FILES
//   V-72-AUDIT-VERIFY      72-VERIFICATION.md exists and contains "Per-Validator Audit Inventory" heading
//                          (SKIP-PASS until Plan 72-02 close-gate lands)
//   V-72-CHAIN-{48..71}    24 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware optimization)
//   V-72-AUDIT             scripts/validation/v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)
//   V-72-SELF              CHAIN_PHASES does NOT include 72; CHAIN_SKIP is empty Set (Phase 68 7b635ca invariant)
//
// Chicken-and-egg transient at Plan 72-01 commit: V-72-CHAIN-{61..67,70} expected FAIL (8 documented-residual)
//   because pre-existing HEAD-coupled assertions in check-phase-{61..67}.mjs are not yet frozen-aware.
//   These are CHAIN-DEGRADED-AT-HEAD-01 entries (v1.8-DEFERRED-CLEANUP.md lines 56-99); resolution
//   mechanism is Phase 73 Pillar C RETRO-01 + RETRO-02. Phase 72's wrapper fix is NEUTRAL w.r.t.
//   this pre-existing degradation (SC#3 second-clause "no false positives introduced" satisfied).
//   Per Plan 71-01 Rule 4 Option A documented-transient precedent (5th entry in chicken-and-egg lineage:
//   Plan 68-05 -> 69-02 -> 70-05 Commit A -> 71-01 -> 72-01).
//
// Lineage: Path-A from check-phase-71.mjs (Plan 71-01 SHA e4887b2)
//
// Usage: node scripts/validation/check-phase-72.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';

// Phase 72 extends the chain through Phase 71 (Phase 71 close e4887b2 -- wrapper fix + regression-witness).
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

const checks = [];

const FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]; // D-01 LOCKED Option C boundary + self-dogfood (Pitfall 5)

// RESEARCH.md Section 3: empirical 258-char gap on check-phase-71 -- use {0,400} NOT {0,200}
const CHAIN_WRAPPER_ANCHOR = /execFileSync\('node',[\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;

// V-72-WRAPPER-01..07 -- parameterized assertion over FIXED_FILES
FIXED_FILES.forEach((phaseNum) => {
  checks.push({
    id: `WRAPPER-${String(phaseNum).padStart(2, '0')}`,
    name: `V-72-WRAPPER-${phaseNum}: check-phase-${phaseNum}.mjs CHAIN wrapper captures both stderr AND stdout`,
    run() {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return { pass: false, detail: `check-phase-${phaseNum}.mjs not found` };
      const matches = [...content.matchAll(CHAIN_WRAPPER_ANCHOR)];
      if (matches.length === 0) return { pass: false, detail: `no CHAIN wrapper catch block found in check-phase-${phaseNum}.mjs (anchor regex miss)` };
      const violators = matches.filter((m) => !(/err\.stderr/.test(m[1]) && /err\.stdout/.test(m[1])));
      if (violators.length > 0) {
        return { pass: false, detail: `${violators.length} of ${matches.length} CHAIN wrapper(s) in check-phase-${phaseNum}.mjs missing err.stdout capture` };
      }
      return { pass: true, detail: `${matches.length} CHAIN wrapper(s) in check-phase-${phaseNum}.mjs capture both streams` };
    }
  });
});

// V-72-WRAPPER-NEG -- negative invariant: zero stderr-only CHAIN wrappers remain (whole-file class signature)
checks.push({
  id: 'WRAPPER-NEG',
  name: 'V-72-WRAPPER-NEG: zero stderr-only CHAIN wrappers remain across FIXED_FILES',
  run() {
    const stderrOnly = [];
    FIXED_FILES.forEach((phaseNum) => {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return;
      const matches = [...content.matchAll(CHAIN_WRAPPER_ANCHOR)];
      matches.forEach((m, idx) => {
        const hasStderr = /err\.stderr/.test(m[1]);
        const hasStdout = /err\.stdout/.test(m[1]);
        if (hasStderr && !hasStdout) {
          stderrOnly.push({ file: `check-phase-${phaseNum}.mjs`, occurrence: idx + 1 });
        }
      });
    });
    if (stderrOnly.length > 0) {
      return { pass: false, detail: `${stderrOnly.length} stderr-only CHAIN wrapper(s) remain: ${JSON.stringify(stderrOnly)}` };
    }
    return { pass: true, detail: `0 stderr-only CHAIN wrappers across ${FIXED_FILES.length} FIXED_FILES (whole-file class signature satisfied)` };
  }
});

// V-72-AUDIT-VERIFY -- heading-presence check on 72-VERIFICATION.md (D-04b delta; SKIP-PASS until Plan 72-02 lands)
// NOTE: id is 'AUDIT-VERIFY' (distinct from V-72-AUDIT below -- RESEARCH.md Section 2 + Pitfall 4 naming-collision finding)
checks.push({
  id: 'AUDIT-VERIFY',
  name: 'V-72-AUDIT-VERIFY: 72-VERIFICATION.md exists and contains Per-Validator Audit Inventory heading',
  run() {
    const verif = readFile('.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '72-VERIFICATION.md not yet authored (PASS-via-skip until Plan 72-02 lands)' };
    if (!/Per-Validator Audit Inventory/i.test(verif)) {
      return { pass: false, detail: '72-VERIFICATION.md missing "Per-Validator Audit Inventory" section heading' };
    }
    return { pass: true, detail: '72-VERIFICATION.md exists with Per-Validator Audit Inventory section' };
  }
});

// === V-72-CHAIN-NN: chain regression-guards for check-phase-{48..71}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
// Self-dogfood: this CHAIN wrapper is authored with stdout+stderr capture from inception per D-01 + RESEARCH.md Section 12.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-72-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
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

// === V-72-AUDIT: v1.7-milestone-audit.mjs subprocess exits 0 (predecessor-byte-unchanged invariant) ===
checks.push({
  id: 'AUDIT',
  name: 'V-72-AUDIT: v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.7 harness exits 0 (predecessor-byte-unchanged invariant preserved)' };
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

// === V-72-SELF: CHAIN_PHASES does NOT include 72 (no self-reference; auditor-independence) ===
checks.push({
  id: 'SELF',
  name: 'V-72-SELF: CHAIN_PHASES does NOT include 72; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(72)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 72 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (72 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-72 -- Phase 72 deliverables (Chain-Wrapper Hardening Pillar B)\n');
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
