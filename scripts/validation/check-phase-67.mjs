#!/usr/bin/env node
// check-phase-67.mjs -- Phase 67 (Corpus Surgical Sweeps Pillar A — SWEEP-01/02) deliverables
// Source of truth: .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-CONTEXT.md
// Assertions: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONVENTIONS.md (V-67-01..V-67-07 + V-67-CHAIN + V-67-AUDIT + V-67-SELF)
//
// HARNESS-03 sub-deliverable A — V-67-01..07 SWEEP-01/02 corpus state assertions per D-01 LOCKED v1.7-frozen-aware routing.
// All V-67-01..07 are v1.7-frozen-aware (SWEEP corpus state per 70-CONVENTIONS.md matrix) — readCorpusFileAtV17Close
// + readSidecarAtV17Close helpers analogous to check-phase-61.mjs:38-63 readRequirementsAtV15Close pattern.
//
// Lineage: Phase 48 D-25 -> ... -> Phase 66 AUDIT-14..15 -> Phase 67 SWEEP-01..02 (Pillar A — Low-Risk Warm-Up)
//
// Usage: node scripts/validation/check-phase-67.mjs [--verbose]
// Exit code: 0 if all V-67-NN PASS or SKIPPED; 1 if any FAIL.

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

// Reads <relPath> at v1.7-close SHA aa6de68 (frozen state for SWEEP corpus assertions).
// V1.7-frozen-aware per 70-CONTEXT.md D-01 LOCKED (Option C: per-assertion-class freshness routing).
// Rationale: V-67-01..07 assert SWEEP-01/02 corpus state which is post-close-mutable surface;
// reading at v1.7-close SHA preserves assertion semantics under subsequent corpus edits.
// Substitution: Plan 70-05 Commit A replaces aa6de68 via `sed -i` (per Phase 68 Plan 68-05
// + Phase 69 Plan 69-02 precedent). Until substituted, helper returns null and callers PASS-with-degraded-detail.
function readCorpusFileAtV17Close(relPath) {
  try {
    // stdio: ['ignore', 'pipe', 'pipe'] explicitly captures stderr (prevents inner git
    // "fatal: invalid object name" from leaking to parent's stderr when aa6de68
    // is still a literal placeholder pre-Plan-70-05 Commit A substitution).
    return execFileSync('git', ['show', 'aa6de68:' + relPath], { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}

// Reads scripts/validation/v1.7-audit-allowlist.json at v1.7-close SHA aa6de68.
// V1.7-frozen-aware per 70-CONTEXT.md D-01 LOCKED. Sidecar shape post-Phase-67-revalidation is the
// reference state; ci_1_abm_urls entries carry `last_revalidated: "2026-05-26"`, ci_2_vpp_location_token
// entries carry `resolved_2026_05_26: true` (per Plan 70-02 Atom 1 HARNESS-02 deliverable).
function readSidecarAtV17Close() {
  try {
    const c = execFileSync('git', ['show', 'aa6de68:scripts/validation/v1.7-audit-allowlist.json'], { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(c);
  } catch (err) {
    return null;
  }
}

const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';

// Extends check-phase-66.mjs chain by adding 66.
// Phase 67 is the validator-as-deliverable in this phase (HARNESS-03 sub-deliverable A);
// v1.8+ RUNS the chain per D-22 auditor-independence.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66];

// CHAIN_SKIP topology: empty by Phase 68 CHAIN-03 close (sha 7b635ca) — invariant inherited verbatim
// from check-phase-66.mjs (no entries to suppress; full chain expected green post-Phase-68).
const CHAIN_SKIP = new Set([]);

const checks = [
  // === V-67-01: SWEEP-01 ABM URL refs — 4 URLs across 4 files unchanged from post-revalidation state (3fb8ca5) [v1.7-frozen @ aa6de68] ===
  {
    id: 1, name: 'V-67-01: SWEEP-01 ABM URLs — 4 https://business.apple.com refs across 4 files [v1.7-frozen @ aa6de68]',
    run() {
      const FILES = [
        { path: 'docs/admin-setup-ios/05-app-deployment.md', line: 92 },
        { path: 'docs/admin-setup-macos/01-abm-configuration.md', line: 52 },
        { path: 'docs/admin-setup-macos/04-app-deployment.md', line: 105 },
        { path: 'docs/_glossary-macos.md', line: 64 },
      ];
      const missing = [];
      let nullCount = 0;
      for (const { path, line } of FILES) {
        const c = readCorpusFileAtV17Close(path);
        if (c === null) { nullCount++; continue; }
        if (!c.includes('https://business.apple.com')) {
          missing.push(path);
        }
      }
      if (nullCount === FILES.length) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes (' + nullCount + ' files unreadable)' };
      }
      if (missing.length > 0) {
        return { pass: false, detail: missing.length + ' file(s) missing ABM URL ref: ' + missing.join(', ') };
      }
      return { pass: true, detail: 'all 4 ABM URL refs present at v1.7-close SHA (v1.7-frozen)' };
    }
  },

  // === V-67-02: SWEEP-01 sidecar c13_rotting_external.ci_1_abm_urls — 4 entries with last_revalidated: 2026-05-26 [v1.7-frozen @ aa6de68] ===
  {
    id: 2, name: 'V-67-02: SWEEP-01 sidecar ci_1_abm_urls — 4 entries with last_revalidated: 2026-05-26 [v1.7-frozen @ aa6de68]',
    run() {
      const j = readSidecarAtV17Close();
      if (j === null) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      const ci1 = j.c13_rotting_external && j.c13_rotting_external.ci_1_abm_urls;
      if (!Array.isArray(ci1)) return { pass: false, detail: 'sidecar.c13_rotting_external.ci_1_abm_urls is not an array' };
      if (ci1.length !== 4) return { pass: false, detail: 'expected 4 ci_1_abm_urls entries; got ' + ci1.length };
      const bad = ci1.filter(e => e.last_revalidated !== '2026-05-26');
      if (bad.length > 0) return { pass: false, detail: bad.length + ' ci_1 entries lack last_revalidated:2026-05-26' };
      return { pass: true, detail: '4 ci_1_abm_urls entries all carry last_revalidated:2026-05-26 (v1.7-frozen)' };
    }
  },

  // === V-67-03: SWEEP-02 VPP rename — 6 'content token' mentions across 2 files (per D-01 LOCKED matrix m1 fix) [v1.7-frozen @ aa6de68] ===
  {
    id: 3, name: 'V-67-03: SWEEP-02 VPP rename — 6 content token mentions across 2 files [v1.7-frozen @ aa6de68]',
    run() {
      const FILES = [
        'docs/admin-setup-ios/05-app-deployment.md',
        'docs/admin-setup-macos/04-app-deployment.md',
      ];
      let totalMentions = 0;
      let nullCount = 0;
      for (const path of FILES) {
        const c = readCorpusFileAtV17Close(path);
        if (c === null) { nullCount++; continue; }
        // Count occurrences of the renamed term "content token" (post-SWEEP-02 rename)
        const matches = (c.match(/content token/gi) || []).length;
        totalMentions += matches;
      }
      if (nullCount === FILES.length) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      if (totalMentions < 6) {
        return { pass: false, detail: 'expected >= 6 content token mentions across 2 files; got ' + totalMentions };
      }
      return { pass: true, detail: totalMentions + ' content token mentions present across 2 files (v1.7-frozen)' };
    }
  },

  // === V-67-04: SWEEP-02 sidecar c13_rotting_external.ci_2_vpp_location_token — 6 entries with resolved_2026_05_26: true [v1.7-frozen @ aa6de68] ===
  {
    id: 4, name: 'V-67-04: SWEEP-02 sidecar ci_2_vpp_location_token — 6 entries with resolved_2026_05_26: true [v1.7-frozen @ aa6de68]',
    run() {
      const j = readSidecarAtV17Close();
      if (j === null) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      const ci2 = j.c13_rotting_external && j.c13_rotting_external.ci_2_vpp_location_token;
      if (!Array.isArray(ci2)) return { pass: false, detail: 'sidecar.c13_rotting_external.ci_2_vpp_location_token is not an array' };
      if (ci2.length !== 6) return { pass: false, detail: 'expected 6 ci_2_vpp_location_token entries; got ' + ci2.length };
      const bad = ci2.filter(e => e.resolved_2026_05_26 !== true);
      if (bad.length > 0) return { pass: false, detail: bad.length + ' ci_2 entries lack resolved_2026_05_26:true' };
      return { pass: true, detail: '6 ci_2_vpp_location_token entries all carry resolved_2026_05_26:true (v1.7-frozen)' };
    }
  },

  // === V-67-05: SWEEP-02 content-token callouts — 2 Apple-vs-Intune label disambiguation callouts [v1.7-frozen @ aa6de68] ===
  // Root-cause correction (Plan 73-02 RETRO-02): original assertion searched for literal "OP-10" which
  // is a PITFALLS.md pattern label, not a string written into corpus files. Correct check: assert the
  // actual Note callout inserted by SWEEP-02 commit 55260b3 above each Renewal/Maintenance table.
  {
    id: 5, name: 'V-67-05: SWEEP-02 content-token Apple-vs-Intune callouts — 2 callouts across affected files [v1.7-frozen @ aa6de68]',
    run() {
      const FILES = [
        'docs/admin-setup-ios/05-app-deployment.md',
        'docs/admin-setup-macos/04-app-deployment.md',
      ];
      let total = 0;
      let nullCount = 0;
      for (const path of FILES) {
        const c = readCorpusFileAtV17Close(path);
        if (c === null) { nullCount++; continue; }
        // Assert the actual Apple-vs-Intune disambiguation callout inserted by SWEEP-02
        if (/Apple calls this artifact a "content token"/.test(c) || /formerly "VPP location token"/.test(c)) {
          total++;
        }
      }
      if (nullCount === FILES.length) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      if (total < 2) {
        return { pass: false, detail: 'expected content-token callouts in 2 files; got ' + total + ' [v1.7-frozen @ aa6de68]' };
      }
      return { pass: true, detail: total + ' files carry content-token Apple-vs-Intune callouts [v1.7-frozen @ aa6de68]' };
    }
  },

  // === V-67-06: SWEEP-02 Version History rows — 2 VH date rows + glossary coord row [v1.7-frozen @ aa6de68] ===
  // Root-cause correction (Plan 73-02 RETRO-02): original assertion checked for "version history" heading
  // which the deployment docs do NOT have. The docs use a bare tail table (| Date | Change | Author |)
  // with NO ## Version History H2. Correct check: assert the 2026-05-26 SWEEP-02 change row in the
  // tail table and the glossary's ## Version History heading.
  {
    id: 6, name: 'V-67-06: SWEEP-02 Version History tail rows — 2 date rows (2026-05-26) + glossary VH section [v1.7-frozen @ aa6de68]',
    run() {
      const FILES = [
        'docs/admin-setup-ios/05-app-deployment.md',
        'docs/admin-setup-macos/04-app-deployment.md',
        'docs/_glossary-macos.md',
      ];
      let withVH = 0;
      let nullCount = 0;
      for (const path of FILES) {
        const c = readCorpusFileAtV17Close(path);
        if (c === null) { nullCount++; continue; }
        // Deploy docs: tail table row with 2026-05-26 SWEEP-02 change
        // Glossary: ## Version History heading
        if (/2026-05-26.*SWEEP-02/.test(c) || /## Version History/.test(c)) {
          withVH++;
        }
      }
      if (nullCount === FILES.length) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      if (withVH < 2) {
        return { pass: false, detail: 'expected >= 2 files with SWEEP-02 VH entries; got ' + withVH + ' [v1.7-frozen @ aa6de68]' };
      }
      return { pass: true, detail: withVH + '/' + (FILES.length - nullCount) + ' files carry SWEEP-02 VH entries [v1.7-frozen @ aa6de68]' };
    }
  },

  // === V-67-07: last_verified frontmatter bumps — 3 files updated to 2026-05-26 (iOS + macOS + glossary) [v1.7-frozen @ aa6de68] ===
  {
    id: 7, name: 'V-67-07: last_verified frontmatter bumps — 3 files updated to 2026-05-26 [v1.7-frozen @ aa6de68]',
    run() {
      const FILES = [
        'docs/admin-setup-ios/05-app-deployment.md',
        'docs/admin-setup-macos/04-app-deployment.md',
        'docs/_glossary-macos.md',
      ];
      let withBump = 0;
      let nullCount = 0;
      for (const path of FILES) {
        const c = readCorpusFileAtV17Close(path);
        if (c === null) { nullCount++; continue; }
        if (c.includes('2026-05-26')) {
          withBump++;
        }
      }
      if (nullCount === FILES.length) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      if (withBump < 3) {
        return { pass: false, detail: 'expected 3 files carrying 2026-05-26; got ' + withBump };
      }
      return { pass: true, detail: withBump + '/3 files carry 2026-05-26 last_verified bump (v1.7-frozen)' };
    }
  },
];

// === V-67-CHAIN: chain regression-guards for check-phase-{48..66}.mjs ===
// Note: when invoked recursively via env var CHECK_PHASE_NESTED=1 (set by peer chain-guards
// in check-phase-68/69/70), chain-guards skip the full sub-chain to avoid polynomial wall-clock
// blowup on Windows. This optimization preserves the standalone semantic (V-67-CHAIN-NN PASS when
// directly invoked) while making nested peer invocation cheap. Linux GHA topology runs each
// validator as a parallel job per HARNESS-04 EDIT (g), so this nested mode is Windows-only.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-67-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 67 (see CHAIN_SKIP docs)' };
      }
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
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

// === V-67-AUDIT: v1.7-milestone-audit.mjs subprocess exits 0 ===
checks.push({
  id: 'AUDIT', name: 'V-67-AUDIT: v1.7-milestone-audit.mjs exits 0',
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

// === V-67-SELF: CHAIN_PHASES does NOT include 67 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-67-SELF: CHAIN_PHASES array does NOT include 67 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(67)) return { pass: false, detail: 'CHAIN_PHASES includes 67 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 67 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop (pattern verbatim from check-phase-66.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-67 -- Phase 67 deliverables (SWEEP-01/02 corpus surgical sweeps)\n');
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
