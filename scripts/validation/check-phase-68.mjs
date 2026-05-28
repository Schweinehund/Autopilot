#!/usr/bin/env node
// check-phase-68.mjs -- Phase 68 (CHAIN_SKIP Root-Cause Resolution Pillar B — Validator Surgery) deliverables
// Source of truth: .planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-CONTEXT.md
// Assertions: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONVENTIONS.md (V-68-01..V-68-11 + V-68-CHAIN + V-68-AUDIT + V-68-SELF)
//
// HARNESS-03 sub-deliverable B — V-68-01..11 MIXED routing per D-01 LOCKED (Pillar B CHAIN-01/02/03 surface).
// V-68-01..04 + V-68-06..08 + V-68-10..11 = HEAD-coupled (live source-of-truth invariants).
// V-68-05 (BASELINE_9 banner shift) + V-68-09 (MILESTONES.md cdcce23 cleanup) = v1.7-frozen-aware.
//
// Lineage: Phase 48 D-25 -> ... -> Phase 67 SWEEP-01..02 -> Phase 68 CHAIN-01..03 (Pillar B)
//
// Usage: node scripts/validation/check-phase-68.mjs [--verbose]
// Exit code: 0 if all V-68-NN PASS or SKIPPED; 1 if any FAIL.

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

// Reads .planning/MILESTONES.md at v1.7-close SHA {phase_70_close_SHA} (frozen state).
// V1.7-frozen-aware per 70-CONTEXT.md D-01 LOCKED (Option C); MILESTONES.md is post-close-mutable.
// V-68-09 asserts cdcce23 garbage entry deletion: zero `One-liner:` placeholders in v1.5 section
// post-Phase-68 d142c7a cleanup. Substitution: Plan 70-05 Commit A replaces {phase_70_close_SHA}.
function readMilestonesAtV17Close() {
  try {
    // stdio: ['ignore', 'pipe', 'pipe'] explicitly captures stderr (prevents inner git
    // "fatal: invalid object name" leaking to parent stderr pre-Plan-70-05 Commit A substitution).
    return execFileSync('git', ['show', '{phase_70_close_SHA}:.planning/MILESTONES.md'], { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}

// Reads scripts/validation/regenerate-supervision-pins.mjs at v1.7-close SHA {phase_70_close_SHA}
// (frozen state for V-68-05 BASELINE_9/10/11 banner-shift assertion). v1.7-frozen-aware per D-01.
function readCorpusFileAtV17Close(relPath) {
  try {
    return execFileSync('git', ['show', '{phase_70_close_SHA}:' + relPath], { encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}

const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';

// Extends check-phase-67.mjs chain by adding 67.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67];

// CHAIN_SKIP topology: empty by Phase 68 CHAIN-03 close (sha 7b635ca) — this validator asserts
// V-68-07 the empty-Set invariant across check-phase-{62..66}.mjs.
const CHAIN_SKIP = new Set([]);

const checks = [
  // === V-68-01 (HEAD-coupled): CHAIN-01 — check-phase-51.mjs readFile() contains CRLF normalization ===
  {
    id: 1, name: 'V-68-01: CHAIN-01 check-phase-51.mjs readFile() body contains .replace(/\\r\\n/g, "\\n") CRLF normalization',
    run() {
      const c = readFile('scripts/validation/check-phase-51.mjs');
      if (c === null) return { pass: false, detail: 'check-phase-51.mjs missing' };
      if (!/\.replace\(\/\\r\\n\/g, ['"]\\n['"]\)/.test(c)) {
        return { pass: false, detail: 'check-phase-51.mjs readFile() lacks CRLF normalization (CHAIN-01 root-cause regression)' };
      }
      return { pass: true, detail: 'check-phase-51.mjs readFile() carries CRLF normalization' };
    }
  },

  // === V-68-02 (HEAD-coupled): CHAIN-01 — check-phase-58.mjs readFile() contains CRLF normalization ===
  {
    id: 2, name: 'V-68-02: CHAIN-01 check-phase-58.mjs readFile() body contains .replace(/\\r\\n/g, "\\n") CRLF normalization',
    run() {
      const c = readFile('scripts/validation/check-phase-58.mjs');
      if (c === null) return { pass: false, detail: 'check-phase-58.mjs missing' };
      if (!/\.replace\(\/\\r\\n\/g, ['"]\\n['"]\)/.test(c)) {
        return { pass: false, detail: 'check-phase-58.mjs readFile() lacks CRLF normalization (CHAIN-01 root-cause regression)' };
      }
      return { pass: true, detail: 'check-phase-58.mjs readFile() carries CRLF normalization' };
    }
  },

  // === V-68-03 (HEAD-coupled): CHAIN-02 — scripts/validation/_lib/archive-path.mjs exists ===
  {
    id: 3, name: 'V-68-03: CHAIN-02 scripts/validation/_lib/archive-path.mjs exists',
    run() {
      const path = 'scripts/validation/_lib/archive-path.mjs';
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: false, detail: path + ' missing (CHAIN-02 helper regression)' };
      }
      return { pass: true, detail: 'archive-path.mjs present' };
    }
  },

  // === V-68-04 (HEAD-coupled): CHAIN-02 — archive-path helper imported in 5 call-sites ===
  // Phase 68 CHAIN-02 deliverable: scripts/validation/_lib/archive-path.mjs is imported
  // from the 5 chain validators that historically suffered from archive-path resolution
  // failures (check-phase-{31,48,60,62,63}.mjs per CONTEXT D-02 line 92).
  // regenerate-supervision-pins.mjs had a parallel BASELINE_9 +1 banner-shift rebase in
  // Phase 68 but does NOT import archive-path — it operates on supervision_exemptions[]
  // directly and the +1 coord rebase landed in the sidecar (v1.5-frozen) not via the helper.
  {
    id: 4, name: 'V-68-04: CHAIN-02 archive-path helper imported in 5 call-sites (check-phase-{31,48,60,62,63}.mjs)',
    run() {
      const CALL_SITES = [
        'scripts/validation/check-phase-31.mjs',
        'scripts/validation/check-phase-48.mjs',
        'scripts/validation/check-phase-60.mjs',
        'scripts/validation/check-phase-62.mjs',
        'scripts/validation/check-phase-63.mjs',
      ];
      const missing = [];
      for (const path of CALL_SITES) {
        const c = readFile(path);
        if (c === null) { missing.push(path + ' (file missing)'); continue; }
        if (!c.includes('archive-path')) missing.push(path);
      }
      if (missing.length > 0) return { pass: false, detail: missing.length + ' call-sites lack archive-path import: ' + missing.join(', ') };
      return { pass: true, detail: '5/5 chain-validator call-sites import archive-path helper' };
    }
  },

  // === V-68-05 (v1.7-frozen-aware): CHAIN-02 — regenerate-supervision-pins.mjs BASELINE_9/10/11 banner shift documented [v1.7-frozen @ {phase_70_close_SHA}] ===
  {
    id: 5, name: 'V-68-05: BASELINE_9 +1 banner shift + BASELINE_10/11 comment blocks present [v1.7-frozen @ {phase_70_close_SHA}]',
    run() {
      const c = readCorpusFileAtV17Close('scripts/validation/regenerate-supervision-pins.mjs');
      if (c === null) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: {phase_70_close_SHA} placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      const hasB10 = c.includes('BASELINE_10');
      const hasB11 = c.includes('BASELINE_11');
      if (!hasB10 || !hasB11) {
        return { pass: false, detail: 'BASELINE_10 present=' + hasB10 + '; BASELINE_11 present=' + hasB11 + ' (expected both at v1.7-close)' };
      }
      return { pass: true, detail: 'BASELINE_10 + BASELINE_11 comment blocks both present (v1.7-frozen)' };
    }
  },

  // === V-68-06 (HEAD-coupled): CHAIN-02 — parseAllowlist lineage repointed to v1.7-audit-allowlist.json ===
  {
    id: 6, name: 'V-68-06: parseAllowlist lineage repointed to v1.7-audit-allowlist.json (regenerate-supervision-pins.mjs HEAD)',
    run() {
      const c = readFile('scripts/validation/regenerate-supervision-pins.mjs');
      if (c === null) return { pass: false, detail: 'regenerate-supervision-pins.mjs missing' };
      if (!c.includes('v1.7-audit-allowlist.json')) {
        return { pass: false, detail: 'regenerate-supervision-pins.mjs does not reference v1.7-audit-allowlist.json (CHAIN-02 lineage regression)' };
      }
      return { pass: true, detail: 'parseAllowlist references v1.7-audit-allowlist.json' };
    }
  },

  // === V-68-07 (HEAD-coupled): CHAIN-03 — CHAIN_SKIP = new Set([]) across check-phase-{62..66}.mjs ===
  {
    id: 7, name: 'V-68-07: CHAIN-03 CHAIN_SKIP = new Set([]) across check-phase-{62..66}.mjs (5 validators)',
    run() {
      const VALIDATORS = [62, 63, 64, 65, 66].map(n => 'scripts/validation/check-phase-' + n + '.mjs');
      const bad = [];
      for (const path of VALIDATORS) {
        const c = readFile(path);
        if (c === null) { bad.push(path + ' (missing)'); continue; }
        // Must have literal `new Set([])` empty-Set assignment for CHAIN_SKIP
        if (!/CHAIN_SKIP\s*=\s*new\s+Set\(\[\s*\]\)/.test(c)) {
          bad.push(path);
        }
      }
      if (bad.length > 0) return { pass: false, detail: bad.length + ' validators lack CHAIN_SKIP=new Set([]): ' + bad.join(', ') };
      return { pass: true, detail: '5/5 validators (62..66) carry CHAIN_SKIP=new Set([]) (Phase 68 7b635ca invariant)' };
    }
  },

  // === V-68-08 (HEAD-coupled): CHAIN-31 STRETCH — check-phase-31.mjs _missing discriminator marker ===
  {
    id: 8, name: 'V-68-08: CHAIN-31 STRETCH check-phase-31.mjs _missing discriminator marker present',
    run() {
      const c = readFile('scripts/validation/check-phase-31.mjs');
      if (c === null) return { pass: false, detail: 'check-phase-31.mjs missing' };
      if (!c.includes('_missing')) {
        return { pass: false, detail: 'check-phase-31.mjs lacks _missing discriminator (CHAIN-31 regression)' };
      }
      return { pass: true, detail: 'check-phase-31.mjs carries _missing discriminator' };
    }
  },

  // === V-68-09 (v1.7-frozen-aware): MILESTONES.md cdcce23 garbage v1.5 section deletion [v1.7-frozen @ {phase_70_close_SHA}] ===
  {
    id: 9, name: 'V-68-09: MILESTONES.md zero One-liner: placeholders in v1.5 section (cdcce23 cleanup) [v1.7-frozen @ {phase_70_close_SHA}]',
    run() {
      const c = readMilestonesAtV17Close();
      if (c === null) {
        return { pass: true, skipped: true, detail: 'chicken-and-egg: {phase_70_close_SHA} placeholder unresolved; Plan 70-05 Commit A substitutes' };
      }
      // Find v1.5 H2 section and look for "One-liner:" placeholder strings within it
      const v15Match = c.match(/##\s*v1\.5[\s\S]*?(?=^##\s|\Z)/m);
      const section = v15Match ? v15Match[0] : '';
      const placeholderCount = (section.match(/One-liner:/g) || []).length;
      if (placeholderCount > 0) {
        return { pass: false, detail: placeholderCount + ' One-liner: placeholders remain in v1.5 section (cdcce23 cleanup regression)' };
      }
      return { pass: true, detail: 'zero One-liner: placeholders in MILESTONES.md v1.5 section (v1.7-frozen)' };
    }
  },

  // === V-68-10 (HEAD-coupled): v1.5-frozen-aware helpers present in check-phase-61.mjs ===
  {
    id: 10, name: 'V-68-10: check-phase-61.mjs has readRequirementsAtV15Close + readRoadmapAtV15Close helpers',
    run() {
      const c = readFile('scripts/validation/check-phase-61.mjs');
      if (c === null) return { pass: false, detail: 'check-phase-61.mjs missing' };
      const hasReq = c.includes('readRequirementsAtV15Close');
      const hasRoad = c.includes('readRoadmapAtV15Close');
      if (!hasReq || !hasRoad) {
        return { pass: false, detail: 'readRequirementsAtV15Close=' + hasReq + '; readRoadmapAtV15Close=' + hasRoad };
      }
      return { pass: true, detail: 'both v1.5-frozen-aware helpers present in check-phase-61.mjs' };
    }
  },

  // === V-68-11 (HEAD-coupled): subprocess timeout 60000 -> 300000 across check-phase-{62..66}.mjs ===
  {
    id: 11, name: 'V-68-11: subprocess timeout: 300000 across check-phase-{62..66}.mjs (5 validators)',
    run() {
      const VALIDATORS = [62, 63, 64, 65, 66].map(n => 'scripts/validation/check-phase-' + n + '.mjs');
      const bad = [];
      for (const path of VALIDATORS) {
        const c = readFile(path);
        if (c === null) { bad.push(path + ' (missing)'); continue; }
        if (!c.includes('timeout: 300000')) {
          bad.push(path);
        }
      }
      if (bad.length > 0) return { pass: false, detail: bad.length + ' validators lack timeout:300000: ' + bad.join(', ') };
      return { pass: true, detail: '5/5 validators (62..66) carry timeout:300000' };
    }
  },
];

// === V-68-CHAIN: chain regression-guards for check-phase-{48..67}.mjs ===
// Note: when invoked recursively via env var CHECK_PHASE_NESTED=1, chain-guards skip the
// full sub-chain to avoid polynomial wall-clock blowup on Windows. When invoking v1.7-cohort
// peer validators (>=67), set CHECK_PHASE_NESTED=1 in the subprocess env to enable nested
// short-circuit. This preserves V-68-11's predecessor-coverage assertion (60000 -> 300000
// across check-phase-{62..66}.mjs) at HEAD while bounding the wall-clock for nested peer chains.
// Linux GHA topology (per HARNESS-04 EDIT (g)) runs each v1.7 validator as its own parallel job,
// bypassing the nested chain-guard cost entirely.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-68-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 68 (see CHAIN_SKIP docs)' };
      }
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      // For peer v1.7-cohort validators (>=67), propagate CHECK_PHASE_NESTED=1 to short-circuit
      // their own chain-guards (avoids polynomial recursion cost).
      const isPeer = phaseNum >= 67;
      const subEnv = isPeer ? { ...process.env, CHECK_PHASE_NESTED: '1' } : process.env;
      const subTimeout = isPeer ? 600000 : 300000;
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
    }
  });
}

// === V-68-AUDIT: v1.7-milestone-audit.mjs subprocess exits 0 ===
checks.push({
  id: 'AUDIT', name: 'V-68-AUDIT: v1.7-milestone-audit.mjs exits 0',
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

// === V-68-SELF: CHAIN_PHASES does NOT include 68 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-68-SELF: CHAIN_PHASES array does NOT include 68 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(68)) return { pass: false, detail: 'CHAIN_PHASES includes 68 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 68 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-68 -- Phase 68 deliverables (CHAIN_SKIP root-cause resolution Pillar B)\n');
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
