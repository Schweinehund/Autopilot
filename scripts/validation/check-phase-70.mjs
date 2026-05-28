#!/usr/bin/env node
// check-phase-70.mjs -- Phase 70 (v1.7 Audit Harness Lineage Bump + Milestone Close, Pillar D — Close-Gate) deliverables
// Source of truth: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONTEXT.md
// Assertions: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONVENTIONS.md (V-70-01..V-70-27 + V-70-CHAIN + V-70-AUDIT + V-70-SELF)
//
// Wave-1 SCAFFOLD form per Plan 70-01 — V-70-01..27 placeholder bodies.
// Wave 3 Plan 70-03 fills bodies per 70-CONVENTIONS.md freshness matrix.
//
// Per-assertion-class freshness routing per 70-CONTEXT.md D-01 LOCKED (Option C):
//   V-70-01..17 -> HEAD-coupled (live deliverables: HARNESS-01/02/03/04 surface)
//   V-70-18..27 -> v1.7-frozen-aware via {phase_70_close_SHA} placeholder (HARNESS-05/06 + traceability)
// Plan 70-05 Commit A substitutes {phase_70_close_SHA} via `sed -i` across this file + check-phase-67/68/69.mjs
// (4 validators total). See 70-CONVENTIONS.md §"Chicken-and-Egg SHA Placeholder Convention".
//
// Lineage: Phase 48 D-25 -> ... -> Phase 66 AUDIT-14..15 -> Phase 67 SWEEP-01..02 -> Phase 68 CHAIN-01..03 -> Phase 69 CILINUX-01 -> Phase 70 HARNESS-01..06
//
// Usage: node scripts/validation/check-phase-70.mjs [--verbose]
// Exit code: 0 if all V-70-NN PASS or SKIPPED; 1 if any FAIL.

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

const HARNESS         = 'scripts/validation/v1.7-milestone-audit.mjs';
const ALLOWLIST       = 'scripts/validation/v1.7-audit-allowlist.json';
const PIN_HELPER      = 'scripts/validation/regenerate-supervision-pins.mjs';
const CI_WORKFLOW     = '.github/workflows/audit-harness-v1.7-integrity.yml';
const MILESTONE_AUDIT = '.planning/milestones/v1.7-MILESTONE-AUDIT.md';
const DEFERRED_CLEAN  = '.planning/milestones/v1.7-DEFERRED-CLEANUP.md';

// Extends check-phase-69.mjs chain by adding 69.
// Phase 70 is the validator-as-deliverable in this phase (HARNESS-03 sub-deliverable D); v1.8+ RUNS the chain per D-22 auditor-independence.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69];

// CHAIN_SKIP topology: empty by Phase 68 CHAIN-03 close (sha 7b635ca) — invariant inherited verbatim from
// check-phase-66.mjs (no entries to suppress; full chain expected green post-Phase-68).
const CHAIN_SKIP = new Set([]);

const checks = [];

// =============================================================================
// V-70-01..V-70-27 — Wave-1 SCAFFOLD placeholder bodies
// =============================================================================
// All bodies return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- ...' }.
// Wave 3 Plan 70-03 fills implementation per 70-CONVENTIONS.md row V-70-NN freshness routing.
// Plan 70-03 Task 4 grep contract: 27 occurrences of literal 'Wave-1 placeholder' here pre-upgrade -> 0 post-upgrade.

// === V-70-01: HARNESS-01 v1.7-milestone-audit.mjs existence ===
checks.push({
  id: 1, name: 'V-70-01: HARNESS-01 scripts/validation/v1.7-milestone-audit.mjs exists',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-01' }; }
});

// === V-70-02: HARNESS-01 lineage docstring contains v1.4 -> ... -> v1.7 ===
checks.push({
  id: 2, name: 'V-70-02: HARNESS-01 lineage docstring contains v1.4 -> v1.4.1 -> v1.5 -> v1.6 -> v1.7',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-02' }; }
});

// === V-70-03: HARNESS-01 harness references v1.7-audit-allowlist.json (parseAllowlist path) ===
checks.push({
  id: 3, name: 'V-70-03: HARNESS-01 harness references v1.7-audit-allowlist.json (parseAllowlist path)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-03' }; }
});

// === V-70-04: HARNESS-02 v1.7-audit-allowlist.json exists + valid JSON ===
checks.push({
  id: 4, name: 'V-70-04: HARNESS-02 scripts/validation/v1.7-audit-allowlist.json exists + valid JSON',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-04' }; }
});

// === V-70-05: HARNESS-02 sidecar shape (c13_rotting_external + quarterly_audit.cadence + c16_missing_endpoint_exemptions:[]) ===
checks.push({
  id: 5, name: 'V-70-05: HARNESS-02 sidecar shape (c13_rotting_external object + quarterly_audit.cadence + c16_missing_endpoint_exemptions:[])',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-05' }; }
});

// === V-70-06: HARNESS-02 BASELINE_11 freshness comment in regenerate-supervision-pins.mjs (BASELINE_11 refreshed + Phase 70) ===
checks.push({
  id: 6, name: 'V-70-06: HARNESS-02 BASELINE_11 freshness comment in regenerate-supervision-pins.mjs (BASELINE_11 refreshed + Phase 70)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-06' }; }
});

// === V-70-07: HARNESS-03 4 validators exist (check-phase-67/68/69/70.mjs) ===
checks.push({
  id: 7, name: 'V-70-07: HARNESS-03 4 validators exist (check-phase-67/68/69/70.mjs)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-07' }; }
});

// === V-70-08: HARNESS-03 V-NN-SELF guard verified per validator (CHAIN_PHASES does not include own phase) ===
checks.push({
  id: 8, name: 'V-70-08: HARNESS-03 V-NN-SELF guard verified per validator (CHAIN_PHASES does not include own phase)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-08' }; }
});

// === V-70-09: HARNESS-04 workflow YAML path-filter contains scripts/validation/v1.7-* ===
checks.push({
  id: 9, name: 'V-70-09: HARNESS-04 workflow YAML path-filter contains scripts/validation/v1.7-*',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-09' }; }
});

// === V-70-10: HARNESS-04 workflow YAML path-filter does NOT contain docs/decision-trees/09-linux-triage.md (REMOVED per Phase-69 D-04 sub-decision (a)) ===
checks.push({
  id: 10, name: 'V-70-10: HARNESS-04 workflow YAML path-filter does NOT contain docs/decision-trees/09-linux-triage.md',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-10' }; }
});

// === V-70-11: HARNESS-04 workflow YAML has 2 crons (0 8 * * 1 + 0 8 1 1,4,7,10 *) ===
checks.push({
  id: 11, name: 'V-70-11: HARNESS-04 workflow YAML has 2 crons (weekly bitrot + quarterly rotting-external)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-11' }; }
});

// === V-70-12: HARNESS-04 workflow YAML has pin-helper-advisory job with continue-on-error:true ===
checks.push({
  id: 12, name: 'V-70-12: HARNESS-04 workflow YAML has pin-helper-advisory job with continue-on-error:true',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-12' }; }
});

// === V-70-13: HARNESS-04 workflow YAML has rotting-external-quarterly job ===
checks.push({
  id: 13, name: 'V-70-13: HARNESS-04 workflow YAML has rotting-external-quarterly job',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-13' }; }
});

// === V-70-14: HARNESS-04 workflow YAML chain-67..70 are ACTIVE node invocations (NOT skip-if-missing for-loop) ===
checks.push({
  id: 14, name: 'V-70-14: HARNESS-04 workflow YAML chain-67..70 are ACTIVE node invocations (NOT skip-if-missing for-loop)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-14' }; }
});

// === V-70-15: HARNESS-04 workflow YAML PRESERVES fetch-depth:0 on linux-chain-ubuntu-latest checkout (FETCH-DEPTH-01 inheritance) ===
checks.push({
  id: 15, name: 'V-70-15: HARNESS-04 workflow YAML PRESERVES fetch-depth:0 on linux-chain-ubuntu-latest checkout (FETCH-DEPTH-01 inheritance)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-15' }; }
});

// === V-70-16: HARNESS-04 workflow YAML parse/path-match/harness-run jobs reference v1.7 sidecar/harness (NOT v1.6) ===
checks.push({
  id: 16, name: 'V-70-16: HARNESS-04 workflow YAML parse/path-match/harness-run jobs reference v1.7 sidecar/harness (NOT v1.6)',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-16' }; }
});

// === V-70-17: HARNESS-04 Predecessor workflows (v1.4/v1.5/v1.6) BYTE-UNCHANGED via HEAD blob comparison ===
checks.push({
  id: 17, name: 'V-70-17: HARNESS-04 Predecessor workflows (v1.4/v1.5/v1.6) BYTE-UNCHANGED via HEAD blob comparison',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-17' }; }
});

// === V-70-18: HARNESS-05 70-04-AUDIT-RESULTS.md exists in phase dir [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 18, name: 'V-70-18: HARNESS-05 70-04-AUDIT-RESULTS.md exists in phase dir [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-18 (v1.7-frozen-aware via readCorpusFileAtV17Close)' }; }
});

// === V-70-19: HARNESS-05 audit-results document contains B.1 (local fresh-clone) + B.2 (Linux GHA cross-OS) sections [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 19, name: 'V-70-19: HARNESS-05 audit-results document contains B.1 (local fresh-clone) + B.2 (Linux GHA cross-OS) sections [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-19 (v1.7-frozen-aware)' }; }
});

// === V-70-20: HARNESS-06 v1.7-MILESTONE-AUDIT.md exists with YAML frontmatter (milestone:v1.7, status:passed, requirements:12/12, phases:4/4) [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 20, name: 'V-70-20: HARNESS-06 v1.7-MILESTONE-AUDIT.md exists with YAML frontmatter (milestone:v1.7, status:passed, requirements:12/12, phases:4/4) [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-20 (v1.7-frozen-aware via readMilestoneAuditAtV17Close)' }; }
});

// === V-70-21: HARNESS-06 milestone audit doc has performed_by + Auditor-Independence + Command Verification Table sections [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 21, name: 'V-70-21: HARNESS-06 milestone audit doc has performed_by + Auditor-Independence + Command Verification Table sections [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-21 (v1.7-frozen-aware)' }; }
});

// === V-70-22: HARNESS-06 milestone audit doc has NEW "Discoveries Surfaced During Execution" section (5 discoveries) [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 22, name: 'V-70-22: HARNESS-06 milestone audit doc has NEW Discoveries Surfaced During Execution section (5 discoveries) [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-22 (v1.7-frozen-aware)' }; }
});

// === V-70-23: HARNESS-06 v1.7-DEFERRED-CLEANUP.md finalized (carry-forward + v1.6 items + Phase 69 discoveries) [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 23, name: 'V-70-23: HARNESS-06 v1.7-DEFERRED-CLEANUP.md finalized (carry-forward + v1.6 items + Phase 69 discoveries) [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-23 (v1.7-frozen-aware via readDeferredCleanupAtV17Close)' }; }
});

// === V-70-24: Traceability closure: PROJECT.md Validated section has 12 v1.7 rows [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 24, name: 'V-70-24: Traceability closure PROJECT.md Validated section has 12 v1.7 rows [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-24 (v1.7-frozen-aware via readProjectAtV17Close)' }; }
});

// === V-70-25: Traceability closure: ROADMAP.md Progress table 4/4 v1.7 phases (67-70) Complete [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 25, name: 'V-70-25: Traceability closure ROADMAP.md Progress table 4/4 v1.7 phases (67-70) Complete [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-25 (v1.7-frozen-aware via readRoadmapAtV17Close)' }; }
});

// === V-70-26: Traceability closure: STATE.md frontmatter status:complete + completed_phases:4 / total_phases:4 for v1.7 [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 26, name: 'V-70-26: Traceability closure STATE.md frontmatter status:complete + completed_phases:4 / total_phases:4 for v1.7 [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-26 (v1.7-frozen-aware via readStateAtV17Close)' }; }
});

// === V-70-27: Traceability closure: REQUIREMENTS.md Traceability table 12 v1.7 rows all "Complete" [v1.7-frozen @ {phase_70_close_SHA}] ===
checks.push({
  id: 27, name: 'V-70-27: Traceability closure REQUIREMENTS.md Traceability table 12 v1.7 rows all Complete [v1.7-frozen @ {phase_70_close_SHA}]',
  run() { return { pass: true, skipped: true, detail: 'Wave-1 placeholder -- Wave 3 Plan 70-03 fills body per 70-CONVENTIONS.md row V-70-27 (v1.7-frozen-aware via readRequirementsAtV17Close)' }; }
});

// =============================================================================
// V-70-CHAIN: chain regression-guards for check-phase-{48..69}.mjs (lines 293-321 verbatim from check-phase-66.mjs)
// =============================================================================
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-70-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      // Skip phases with known pre-existing failures that are NOT Phase 70 regressions
      // (see CHAIN_SKIP documentation above for root causes and resolution path)
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 70 (see CHAIN_SKIP docs)' };
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
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
    }
  });
}

// =============================================================================
// V-70-AUDIT: v1.7-milestone-audit.mjs subprocess exits 0
// =============================================================================
// HARNESS-01 lands in Wave 2 (Plan 70-02); until then this assertion gracefully degrades via
// existsSync check (returns SKIPPED with explanatory detail). Once HARNESS-01 lands, this
// becomes a live blocking check.
checks.push({
  id: 'AUDIT', name: 'V-70-AUDIT: v1.7-milestone-audit.mjs exits 0',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not yet on disk (Wave 2 Plan 70-02 deliverable HARNESS-01) -- graceful skip' };
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

// =============================================================================
// V-70-SELF: CHAIN_PHASES does NOT include 70 (no self-reference; D-22 auditor-independence)
// =============================================================================
checks.push({
  id: 'SELF', name: 'V-70-SELF: CHAIN_PHASES array does NOT include 70 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(70)) return { pass: false, detail: 'CHAIN_PHASES includes 70 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 70 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// =============================================================================
// Runner loop (pattern verbatim from check-phase-66.mjs)
// =============================================================================
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-70 -- Phase 70 deliverables (Wave-1 scaffold)\n');
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
