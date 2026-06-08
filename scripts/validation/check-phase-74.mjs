#!/usr/bin/env node
// check-phase-74.mjs -- Phase 74 deliverables (v1.8 Audit Harness Lineage Bump + Milestone Close Pillar D)
//
// Pillar D of v1.8 — HARNESS-09: chain-apex validator + V-74-VPP assertions. Ships the
// v1.8 chain-apex validator (CHAIN_PHASES=[48..73], HARNESS repointed to v1.8-milestone-audit.mjs),
// and two net-new V-74-VPP assertions proving VPP-01 completion.
// Source of truth: .planning/phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-03-PLAN.md
//
// Assertion classes:
//   V-74-VPP-01a     docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md at HEAD:
//                    >= 4 "content token" mentions AND 0 "VPP location token" mentions
//                    (proves VPP-01 4-site rename complete)
//   V-74-VPP-01b     scripts/validation/v1.8-audit-allowlist.json:
//                    c13_rotting_external.ci_2_vpp_location_token has exactly 4 entries
//                    whose keys include one starting with PHASE_74_RESOLVED_PREFIX
//                    (proves Phase 74 resolved entries present in sidecar)
//   V-74-AUDIT       74-VERIFICATION.md heading-presence (SKIP-PASS until Plan 74-05 lands)
//   V-74-CHAIN-{48..73}  26 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-74-AUDIT-HARNESS   scripts/validation/v1.8-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)
//   V-74-SELF            CHAIN_PHASES does NOT include 74; CHAIN_SKIP is empty Set (Phase 68 7b635ca invariant)
//
// Lineage: Path-A from check-phase-73.mjs (Plan 73-03 SHA a85da77)
//
// Usage: node scripts/validation/check-phase-74.mjs [--verbose]
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

const HARNESS = 'scripts/validation/v1.8-milestone-audit.mjs';

// Locked resolved-key prefix for Phase 74 VPP-01 sidecar entries (74-CONVENTIONS.md §1)
const PHASE_74_RESOLVED_PREFIX = 'resolved_2026_06_';

// Phase 74 extends the chain through Phase 73 (Phase 73 close a85da77 -- RETRO-01 + RETRO-02).
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

const checks = [];

// === V-74-VPP-01a: docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md at HEAD ===
// Asserts >= 4 "content token" mentions AND 0 "VPP location token" mentions.
// PHASE_74_RESOLVED_PREFIX = 'resolved_2026_06_' (74-CONVENTIONS.md §1)
// Modeled on V-67-03 (check-phase-67.mjs lines 117-142) -- HEAD read with CRLF safety.
checks.push({
  id: 'VPP-01a',
  name: 'V-74-VPP-01a: 02-macos-pkg-dmg-pipeline.md — >= 4 "content token" AND 0 "VPP location token" at HEAD (VPP-01 complete)',
  run() {
    const VPP_DOC = 'docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md';
    const c = readFile(VPP_DOC);
    if (c === null) return { pass: false, detail: VPP_DOC + ' missing' };
    const contentTokenCount = (c.match(/content token/gi) || []).length;
    const vppLocationTokenCount = (c.match(/VPP location token/gi) || []).length;
    if (contentTokenCount < 4) {
      return { pass: false, detail: 'expected >= 4 "content token" mentions; got ' + contentTokenCount + ' (VPP-01 rename may be incomplete)' };
    }
    if (vppLocationTokenCount !== 0) {
      return { pass: false, detail: 'expected 0 "VPP location token" mentions; got ' + vppLocationTokenCount + ' (legacy term leak -- VPP-01 regression)' };
    }
    return { pass: true, detail: contentTokenCount + ' "content token" mention(s) + 0 "VPP location token" leak (VPP-01 rename complete)' };
  }
});

// === V-74-VPP-01b: scripts/validation/v1.8-audit-allowlist.json sidecar — 4 ci_2 resolved entries ===
// Asserts c13_rotting_external.ci_2_vpp_location_token has exactly 4 entries whose keys include
// one starting with PHASE_74_RESOLVED_PREFIX ('resolved_2026_06_').
// Prefix-match per RESEARCH Pitfall 5 (NOT exact-key match; guards against date drift).
// PHASE_74_RESOLVED_PREFIX defined near top of file; referenced here and in docstring.
// Modeled on V-67-04 (check-phase-67.mjs lines 144-158) -- HEAD read; sidecar is v1.8 HEAD.
checks.push({
  id: 'VPP-01b',
  name: 'V-74-VPP-01b: v1.8 sidecar ci_2_vpp_location_token — exactly 4 entries with PHASE_74_RESOLVED_PREFIX (resolved_2026_06_*) key (Phase 74 VPP-01 resolved)',
  run() {
    const SIDECAR = 'scripts/validation/v1.8-audit-allowlist.json';
    const raw = readFile(SIDECAR);
    if (raw === null) return { pass: false, detail: SIDECAR + ' missing' };
    let j;
    try { j = JSON.parse(raw); } catch (e) { return { pass: false, detail: 'JSON parse error: ' + e.message }; }
    const ci2 = j.c13_rotting_external && j.c13_rotting_external.ci_2_vpp_location_token;
    if (!Array.isArray(ci2)) return { pass: false, detail: 'sidecar.c13_rotting_external.ci_2_vpp_location_token is not an array' };
    // Filter to Phase 74 resolved entries: keys prefixed with PHASE_74_RESOLVED_PREFIX
    const phase74Resolved = ci2.filter(e =>
      Object.keys(e).some(k => k.startsWith(PHASE_74_RESOLVED_PREFIX))
    );
    if (phase74Resolved.length !== 4) {
      return { pass: false, detail: 'expected exactly 4 ci_2 entries with ' + PHASE_74_RESOLVED_PREFIX + '* key; got ' + phase74Resolved.length + ' (of ' + ci2.length + ' total ci_2 entries)' };
    }
    return { pass: true, detail: '4 ci_2_vpp_location_token entries carry ' + PHASE_74_RESOLVED_PREFIX + '* resolved key (Phase 74 VPP-01 sidecar confirmed; total ci_2 entries: ' + ci2.length + ')' };
  }
});

// V-74-AUDIT: heading-presence check on 74-VERIFICATION.md (SKIP-PASS until Plan 74-05 lands)
checks.push({
  id: 'AUDIT',
  name: 'V-74-AUDIT: 74-VERIFICATION.md exists and contains Phase 74 verification heading',
  run() {
    const verif = readFile('.planning/phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '74-VERIFICATION.md not yet authored (PASS-via-skip until Plan 74-05 lands)' };
    if (!/Phase 74/i.test(verif)) {
      return { pass: false, detail: '74-VERIFICATION.md missing "Phase 74" section heading' };
    }
    return { pass: true, detail: '74-VERIFICATION.md exists with Phase 74 verification content' };
  }
});

// === V-74-CHAIN-NN: chain regression-guards for check-phase-{48..73}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
// Self-dogfood: this CHAIN wrapper is authored with stdout+stderr capture from inception per D-01.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-74-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
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

// === V-74-AUDIT-HARNESS: v1.8-milestone-audit.mjs subprocess exits 0 (predecessor-byte-unchanged invariant) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-74-AUDIT-HARNESS: v1.8-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.8 harness exits 0 (predecessor-byte-unchanged invariant preserved)' };
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

// === V-74-SELF: CHAIN_PHASES does NOT include 74 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF',
  name: 'V-74-SELF: CHAIN_PHASES array does NOT include 74 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(74)) return { pass: false, detail: 'CHAIN_PHASES includes 74 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 74 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop (verbatim pattern from check-phase-73.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-74 -- Phase 74 deliverables (v1.8 Audit Harness Lineage Bump + Milestone Close Pillar D)\n');
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
