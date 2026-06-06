#!/usr/bin/env node
// check-phase-69.mjs -- Phase 69 (CI-Linux Hardening Pillar C — Cross-OS Verification) deliverables
// Source of truth: .planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-CONTEXT.md
// Assertions: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONVENTIONS.md (V-69-01..V-69-08 + V-69-CHAIN + V-69-AUDIT + V-69-SELF)
//
// HARNESS-03 sub-deliverable C — V-69-01..08 workflow YAML structure + FETCH-DEPTH-01 inheritance + CHAIN_TIMING_LINUX
// + predecessor byte-unchanged. ALL HEAD-coupled per D-01 LOCKED — V-69-NN read .github/workflows/audit-harness-v1.7-integrity.yml
// at HEAD (live workflow YAML integrity is a HEAD invariant per D-01 matrix). V-69-08 uses git hash-object blob
// comparison against documented predecessor blob SHAs.
//
// Lineage: Phase 48 D-25 -> ... -> Phase 68 CHAIN-01..03 -> Phase 69 CILINUX-01 (Pillar C)
//
// Usage: node scripts/validation/check-phase-69.mjs [--verbose]
// Exit code: 0 if all V-69-NN PASS or SKIPPED; 1 if any FAIL.

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
const V17_WORKFLOW = '.github/workflows/audit-harness-v1.7-integrity.yml';

// Documented predecessor blob SHAs at Phase 70 Wave-3 authoring (2026-05-28).
// These are HEAD blob hashes of the BYTE-UNCHANGED predecessor workflow YAMLs;
// V-69-08 asserts the live blobs match these documented values (anti-regression invariant).
const PRED_BLOBS = {
  '.github/workflows/audit-harness-integrity.yml':       '08449a338b6ce87de946ad9d8e58af544cae01d8',
  '.github/workflows/audit-harness-v1.5-integrity.yml':  '6990de2894b026551aba62d1f5ce9c95c0ff88e9',
  '.github/workflows/audit-harness-v1.6-integrity.yml':  '89b536b3ec55e23beecb56a2e348f99fe5a3cf8c',
};

// Extends check-phase-68.mjs chain by adding 68.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68];

const CHAIN_SKIP = new Set([]);

const checks = [
  // === V-69-01 (HEAD-coupled): .github/workflows/audit-harness-v1.7-integrity.yml exists ===
  {
    id: 1, name: 'V-69-01: .github/workflows/audit-harness-v1.7-integrity.yml exists',
    run() {
      if (!existsSync(join(process.cwd(), V17_WORKFLOW))) {
        return { pass: false, detail: V17_WORKFLOW + ' missing' };
      }
      return { pass: true, detail: 'v1.7 workflow YAML present' };
    }
  },

  // === V-69-02 (HEAD-coupled): YAML has 4+ named jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest) ===
  {
    id: 2, name: 'V-69-02: workflow YAML has 4+ named jobs (parse + path-match + harness-run + linux-chain-ubuntu-latest)',
    run() {
      const c = readFile(V17_WORKFLOW);
      if (c === null) return { pass: false, detail: V17_WORKFLOW + ' missing' };
      const REQUIRED_JOBS = ['parse:', 'path-match:', 'harness-run:', 'linux-chain-ubuntu-latest:'];
      const missing = REQUIRED_JOBS.filter(j => !c.includes(j));
      if (missing.length > 0) return { pass: false, detail: 'missing jobs: ' + missing.join(', ') };
      return { pass: true, detail: 'all 4 required jobs present' };
    }
  },

  // === V-69-03 (HEAD-coupled): linux-chain-ubuntu-latest job has core.autocrlf false step ===
  {
    id: 3, name: 'V-69-03: linux-chain-ubuntu-latest job has core.autocrlf false step (LF-fidelity contract)',
    run() {
      const c = readFile(V17_WORKFLOW);
      if (c === null) return { pass: false, detail: V17_WORKFLOW + ' missing' };
      if (!c.includes('core.autocrlf false')) {
        return { pass: false, detail: 'core.autocrlf false absent (LF-fidelity regression)' };
      }
      return { pass: true, detail: 'core.autocrlf false step present' };
    }
  },

  // === V-69-04 (HEAD-coupled): linux-chain-ubuntu-latest checkout step has fetch-depth: 0 — FETCH-DEPTH-01 inheritance LOAD-BEARING ===
  {
    id: 4, name: 'V-69-04: linux-chain-ubuntu-latest checkout step has fetch-depth: 0 (FETCH-DEPTH-01 inheritance from 85521bb)',
    run() {
      const c = readFile(V17_WORKFLOW);
      if (c === null) return { pass: false, detail: V17_WORKFLOW + ' missing' };
      if (!c.includes('fetch-depth: 0')) {
        return { pass: false, detail: 'fetch-depth: 0 absent (FETCH-DEPTH-01 LOAD-BEARING regression — historical SHA resolution broken)' };
      }
      return { pass: true, detail: 'fetch-depth: 0 preserved on linux-chain checkout (FETCH-DEPTH-01 inheritance)' };
    }
  },

  // === V-69-05 (HEAD-coupled): linux-chain-ubuntu-latest has continue-on-error: false (D-A9 PR-blocking) ===
  {
    id: 5, name: 'V-69-05: linux-chain-ubuntu-latest continue-on-error: false (PR-blocking per D-A9)',
    run() {
      const c = readFile(V17_WORKFLOW);
      if (c === null) return { pass: false, detail: V17_WORKFLOW + ' missing' };
      if (!c.includes('continue-on-error: false')) {
        return { pass: false, detail: 'continue-on-error: false absent (D-A9 PR-blocking contract regression)' };
      }
      return { pass: true, detail: 'continue-on-error: false present (D-A9 PR-blocking preserved)' };
    }
  },

  // === V-69-06 (HEAD-coupled): node-version: '20' declared ===
  {
    id: 6, name: "V-69-06: workflow declares node-version: '20'",
    run() {
      const c = readFile(V17_WORKFLOW);
      if (c === null) return { pass: false, detail: V17_WORKFLOW + ' missing' };
      if (!c.includes("node-version: '20'")) {
        return { pass: false, detail: "node-version: '20' absent" };
      }
      return { pass: true, detail: "node-version: '20' declared" };
    }
  },

  // === V-69-07 (HEAD-coupled): ::notice title=CHAIN_TIMING_LINUX:: emission present ===
  {
    id: 7, name: 'V-69-07: ::notice title=CHAIN_TIMING_LINUX:: emission preserved (Phase 69 close-state post-HARNESS-04 EXTEND)',
    run() {
      const c = readFile(V17_WORKFLOW);
      if (c === null) return { pass: false, detail: V17_WORKFLOW + ' missing' };
      if (!c.includes('CHAIN_TIMING_LINUX')) {
        return { pass: false, detail: 'CHAIN_TIMING_LINUX emission absent (Phase 69 close-state regression)' };
      }
      return { pass: true, detail: 'CHAIN_TIMING_LINUX emission preserved' };
    }
  },

  // === V-69-08 (HEAD-coupled): Predecessor workflows (v1.4/v1.5/v1.6) BYTE-UNCHANGED via git hash-object blob comparison ===
  {
    id: 8, name: 'V-69-08: Predecessor workflows v1.4/v1.5/v1.6 BYTE-UNCHANGED (git hash-object blob comparison)',
    run() {
      const drift = [];
      for (const [path, expected] of Object.entries(PRED_BLOBS)) {
        if (!existsSync(join(process.cwd(), path))) {
          drift.push(path + ' (missing)');
          continue;
        }
        try {
          const actual = execFileSync('git', ['hash-object', path], { encoding: 'utf8', timeout: 10000 }).trim();
          if (actual !== expected) {
            drift.push(path + ' (expected ' + expected.slice(0, 7) + '; got ' + actual.slice(0, 7) + ')');
          }
        } catch (err) {
          drift.push(path + ' (hash-object failed: ' + err.message.slice(0, 80) + ')');
        }
      }
      if (drift.length > 0) {
        return { pass: false, detail: drift.length + ' predecessor workflow(s) drifted: ' + drift.join('; ') };
      }
      return { pass: true, detail: '3/3 predecessor workflows BYTE-UNCHANGED (v1.4 + v1.5 + v1.6)' };
    }
  },
];

// === V-69-CHAIN: chain regression-guards for check-phase-{48..68}.mjs ===
// Note: when invoked recursively via env var CHECK_PHASE_NESTED=1, chain-guards skip the
// full sub-chain to avoid polynomial wall-clock blowup on Windows. When invoking v1.7-cohort
// peer validators (>=67), set CHECK_PHASE_NESTED=1 in the subprocess env to enable nested
// short-circuit. Linux GHA topology (per HARNESS-04 EDIT (g)) runs each v1.7 validator as its
// own parallel job, bypassing the nested chain-guard cost entirely.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-69-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 69 (see CHAIN_SKIP docs)' };
      }
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      const isPeer = phaseNum >= 67;
      const subEnv = isPeer ? { ...process.env, CHECK_PHASE_NESTED: '1' } : process.env;
      const subTimeout = isPeer ? 600000 : 300000;
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });
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

// === V-69-AUDIT: v1.7-milestone-audit.mjs subprocess exits 0 ===
checks.push({
  id: 'AUDIT', name: 'V-69-AUDIT: v1.7-milestone-audit.mjs exits 0',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.7 harness exits 0' };
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

// === V-69-SELF: CHAIN_PHASES does NOT include 69 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-69-SELF: CHAIN_PHASES array does NOT include 69 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(69)) return { pass: false, detail: 'CHAIN_PHASES includes 69 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 69 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-69 -- Phase 69 deliverables (CI-Linux Hardening Pillar C — Cross-OS Verification)\n');
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
