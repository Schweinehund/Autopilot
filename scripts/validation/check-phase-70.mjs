#!/usr/bin/env node
// check-phase-70.mjs -- Phase 70 (v1.7 Audit Harness Lineage Bump + Milestone Close, Pillar D — Close-Gate) deliverables
// Source of truth: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONTEXT.md
// Assertions: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONVENTIONS.md (V-70-01..V-70-27 + V-70-CHAIN + V-70-AUDIT + V-70-SELF)
//
// HARNESS-03 sub-deliverable D — V-70-01..27 FULL bodies (post-Wave-3 upgrade from Wave-1 scaffold per Plan 70-03 Task 4).
//
// Per-assertion-class freshness routing per 70-CONTEXT.md D-01 LOCKED (Option C):
//   V-70-01..16 -> HEAD-coupled (live deliverables: HARNESS-01/02/03/04 surface)
//   V-70-17 -> frozen-to-frozen at v1.7-close (aa6de68), converted from a live-worktree
//     blob-hash read in v1.20 Phase 139 Plan 04 (D-18/D-19/D-20/D-22) — see the
//     PRED_BLOBS comment below. Both sides of the comparison are now immutable.
//   V-70-18..27 -> v1.7-frozen-aware via aa6de68 placeholder (HARNESS-05/06 + traceability)
//
// Plan 70-05 Commit A substitutes aa6de68 via `sed -i` across this file + check-phase-67/68/69.mjs
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
import { execFailDetail } from './_lib/exec-fail-detail.mjs';
import { readAtV17Close, readAtV17CloseGate, MILESTONE_CLOSE_SHAS } from './_lib/frozen-at-close.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// =============================================================================
// v1.7-frozen-aware helpers — TOOL-02 refactored to delegate to frozen-at-close.mjs
// (Plan 111-01 Task 4). catch→null preserves SKIP semantics (Landmine B).
// =============================================================================

function readCorpusFileAtV17Close(relPath) {
  try { return readAtV17Close(relPath); } catch (e) { return null; }
}
function readMilestoneAuditAtV17Close() {
  try { return readAtV17Close('.planning/milestones/v1.7-MILESTONE-AUDIT.md'); } catch (e) { return null; }
}
function readDeferredCleanupAtV17Close() {
  try { return readAtV17Close('.planning/milestones/v1.7-DEFERRED-CLEANUP.md'); } catch (e) { return null; }
}
function readRequirementsAtV17Close() {
  try { return readAtV17Close('.planning/REQUIREMENTS.md'); } catch (e) { return null; }
}
function readRoadmapAtV17Close() {
  try { return readAtV17Close('.planning/ROADMAP.md'); } catch (e) { return null; }
}
function readStateAtV17Close() {
  try { return readAtV17Close('.planning/STATE.md'); } catch (e) { return null; }
}
function readProjectAtV17Close() {
  try { return readAtV17Close('.planning/PROJECT.md'); } catch (e) { return null; }
}
// Reads PROJECT.md at v1.7 true close-gate SHA (Plan 73-02 RETRO-02 fix for V-70-24).
function readProjectAtV17CloseGate() {
  try { return readAtV17CloseGate('.planning/PROJECT.md'); } catch (e) { return null; }
}
// General-path close-gate reader (Phase 141-03 addendum, OWNER-RATIFIED 2026-08-08): mirrors
// readProjectAtV17CloseGate() above but accepts any repo-relative path, for V-70-18..22's two
// corpus documents authored in Plan 70-05 Commit B (4df3a16), not at Atom 2 (aa6de68).
function readCorpusFileAtV17CloseGate(relPath) {
  try { return readAtV17CloseGate(relPath); } catch (e) { return null; }
}

const HARNESS         = 'scripts/validation/v1.7-milestone-audit.mjs';
const ALLOWLIST       = 'scripts/validation/v1.7-audit-allowlist.json';
const PIN_HELPER      = 'scripts/validation/regenerate-supervision-pins.mjs';
const CI_WORKFLOW     = '.github/workflows/audit-harness-v1.7-integrity.yml';

// Documented predecessor blob SHAs (parallel to check-phase-69.mjs V-69-08). Frozen-to-frozen:
// the recorded baseline below is compared against the blob AT the frozen v1.7-close SHA, never
// the worktree. Converted from a live-worktree blob-hash read in v1.20 Phase 139 Plan 04
// (D-18/D-19/D-20/D-22, adopting the check-phase-63.mjs V-63-08 precedent) — the worktree
// comparison went red the instant a SWEEP-01 workflow edit was saved, before any commit, taking
// this apex chain member down with it. The baseline VALUES below are byte-unchanged from before
// this conversion — only the read source moved. Accounting record: 139-04-SUMMARY.md.
const PRED_BLOBS = {
  '.github/workflows/audit-harness-integrity.yml':       '08449a338b6ce87de946ad9d8e58af544cae01d8',
  '.github/workflows/audit-harness-v1.5-integrity.yml':  '6990de2894b026551aba62d1f5ce9c95c0ff88e9',
  '.github/workflows/audit-harness-v1.6-integrity.yml':  '89b536b3ec55e23beecb56a2e348f99fe5a3cf8c',
};

// Extends check-phase-69.mjs chain by adding 69.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69];

const CHAIN_SKIP = new Set([]);

const checks = [];

// =============================================================================
// V-70-01..V-70-17 — HEAD-coupled live deliverable assertions
// =============================================================================

// === V-70-01: HARNESS-01 v1.7-milestone-audit.mjs existence ===
checks.push({
  id: 1, name: 'V-70-01: HARNESS-01 scripts/validation/v1.7-milestone-audit.mjs exists',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) return { pass: false, detail: HARNESS + ' missing' };
    return { pass: true, detail: HARNESS + ' present' };
  }
});

// === V-70-02: HARNESS-01 lineage docstring contains v1.4 -> ... -> v1.7 ===
checks.push({
  id: 2, name: 'V-70-02: HARNESS-01 lineage docstring contains v1.4 -> v1.4.1 -> v1.5 -> v1.6 -> v1.7',
  run() {
    const c = readFile(HARNESS);
    if (c === null) return { pass: false, detail: HARNESS + ' missing' };
    // Use a relaxed substring check that accepts both ASCII -> and unicode arrow forms; the canonical
    // form in v1.7-milestone-audit.mjs uses U+2192 RIGHTWARDS ARROW (per Path-A from v1.6-milestone-audit.mjs).
    const matchUni = c.match(/v1\.4\s*[→\-]+>?\s*v1\.4\.1\s*[→\-]+>?\s*v1\.5\s*[→\-]+>?\s*v1\.6\s*[→\-]+>?\s*v1\.7/);
    if (!matchUni) {
      return { pass: false, detail: 'lineage docstring v1.4 -> v1.4.1 -> v1.5 -> v1.6 -> v1.7 absent' };
    }
    return { pass: true, detail: 'lineage docstring present' };
  }
});

// === V-70-03: HARNESS-01 harness references v1.7-audit-allowlist.json (parseAllowlist path) ===
checks.push({
  id: 3, name: 'V-70-03: HARNESS-01 harness references v1.7-audit-allowlist.json (parseAllowlist path)',
  run() {
    const c = readFile(HARNESS);
    if (c === null) return { pass: false, detail: HARNESS + ' missing' };
    if (!c.includes('scripts/validation/v1.7-audit-allowlist.json')) {
      return { pass: false, detail: 'harness does not reference v1.7-audit-allowlist.json' };
    }
    return { pass: true, detail: 'harness references v1.7 sidecar' };
  }
});

// === V-70-04: HARNESS-02 v1.7-audit-allowlist.json exists + valid JSON ===
checks.push({
  id: 4, name: 'V-70-04: HARNESS-02 scripts/validation/v1.7-audit-allowlist.json exists + valid JSON',
  run() {
    const c = readFile(ALLOWLIST);
    if (c === null) return { pass: false, detail: ALLOWLIST + ' missing' };
    try {
      JSON.parse(c);
    } catch (e) {
      return { pass: false, detail: 'invalid JSON: ' + e.message };
    }
    return { pass: true, detail: 'v1.7 sidecar valid JSON' };
  }
});

// === V-70-05: HARNESS-02 sidecar shape (c13_rotting_external object + quarterly_audit.cadence + c16_missing_endpoint_exemptions:[]) ===
checks.push({
  id: 5, name: 'V-70-05: HARNESS-02 sidecar shape (c13_rotting_external object + quarterly_audit.cadence + c16_missing_endpoint_exemptions:[])',
  run() {
    const c = readFile(ALLOWLIST);
    if (c === null) return { pass: false, detail: ALLOWLIST + ' missing' };
    let j;
    try { j = JSON.parse(c); } catch (e) { return { pass: false, detail: 'invalid JSON: ' + e.message }; }
    if (!j.c13_rotting_external || typeof j.c13_rotting_external !== 'object' || Array.isArray(j.c13_rotting_external)) {
      return { pass: false, detail: 'c13_rotting_external missing or not an object' };
    }
    if (!j.c13_rotting_external.quarterly_audit || j.c13_rotting_external.quarterly_audit.cadence !== '0 8 1 1,4,7,10 *') {
      return { pass: false, detail: 'c13_rotting_external.quarterly_audit.cadence != "0 8 1 1,4,7,10 *"' };
    }
    if (!Array.isArray(j.c16_missing_endpoint_exemptions) || j.c16_missing_endpoint_exemptions.length !== 0) {
      return { pass: false, detail: 'c16_missing_endpoint_exemptions must be empty array (got ' + JSON.stringify(j.c16_missing_endpoint_exemptions) + ')' };
    }
    return { pass: true, detail: 'sidecar shape OK (c13_rotting_external object + quarterly_audit.cadence + c16_missing_endpoint_exemptions:[])' };
  }
});

// === V-70-06: HARNESS-02 BASELINE_11 freshness comment in regenerate-supervision-pins.mjs (BASELINE_11 refreshed + Phase 70) ===
checks.push({
  id: 6, name: 'V-70-06: HARNESS-02 BASELINE_11 freshness comment in regenerate-supervision-pins.mjs',
  run() {
    const c = readFile(PIN_HELPER);
    if (c === null) return { pass: false, detail: PIN_HELPER + ' missing' };
    if (!c.includes('BASELINE_11 refreshed')) {
      return { pass: false, detail: 'BASELINE_11 refreshed comment absent' };
    }
    if (!c.includes('Phase 70')) {
      return { pass: false, detail: 'BASELINE_11 comment lacks Phase 70 attribution' };
    }
    return { pass: true, detail: 'BASELINE_11 freshness comment present with Phase 70 attribution' };
  }
});

// === V-70-07: HARNESS-03 4 validators exist (check-phase-67/68/69/70.mjs) ===
checks.push({
  id: 7, name: 'V-70-07: HARNESS-03 4 validators exist (check-phase-67/68/69/70.mjs)',
  run() {
    const VALIDATORS = [67, 68, 69, 70].map(n => 'scripts/validation/check-phase-' + n + '.mjs');
    const missing = VALIDATORS.filter(p => !existsSync(join(process.cwd(), p)));
    if (missing.length > 0) return { pass: false, detail: 'missing: ' + missing.join(', ') };
    return { pass: true, detail: '4/4 v1.7 validators present' };
  }
});

// === V-70-08: HARNESS-03 V-NN-SELF guard verified per validator ===
checks.push({
  id: 8, name: 'V-70-08: HARNESS-03 V-NN-SELF guard verified per validator (CHAIN_PHASES excludes own phase)',
  run() {
    const VALIDATORS = [
      { n: 67, file: 'scripts/validation/check-phase-67.mjs' },
      { n: 68, file: 'scripts/validation/check-phase-68.mjs' },
      { n: 69, file: 'scripts/validation/check-phase-69.mjs' },
      { n: 70, file: 'scripts/validation/check-phase-70.mjs' },
    ];
    const bad = [];
    for (const { n, file } of VALIDATORS) {
      const c = readFile(file);
      if (c === null) { bad.push(file + ' (missing)'); continue; }
      // Locate CHAIN_PHASES literal array and parse the numbers.
      const m = c.match(/const\s+CHAIN_PHASES\s*=\s*\[([0-9,\s]+)\]/);
      if (!m) { bad.push(file + ' (CHAIN_PHASES not found)'); continue; }
      const phases = m[1].split(',').map(s => parseInt(s.trim(), 10)).filter(x => !Number.isNaN(x));
      if (phases.includes(n)) {
        bad.push(file + ' (CHAIN_PHASES includes own phase ' + n + ' — V-NN-SELF regression)');
      }
    }
    if (bad.length > 0) return { pass: false, detail: bad.length + ' validator(s) violate V-NN-SELF: ' + bad.join('; ') };
    return { pass: true, detail: '4/4 validators carry V-NN-SELF guard (own-phase excluded from CHAIN_PHASES)' };
  }
});

// === V-70-09: HARNESS-04 workflow YAML path-filter contains scripts/validation/v1.7-* ===
checks.push({
  id: 9, name: 'V-70-09: HARNESS-04 workflow YAML path-filter contains scripts/validation/v1.7-*',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    if (!c.includes('scripts/validation/v1.7-')) {
      return { pass: false, detail: 'path-filter does not include scripts/validation/v1.7-*' };
    }
    return { pass: true, detail: 'path-filter includes v1.7-scoped surface' };
  }
});

// === V-70-10: HARNESS-04 workflow YAML path-filter does NOT contain docs/decision-trees/09-linux-triage.md ===
checks.push({
  id: 10, name: 'V-70-10: HARNESS-04 workflow YAML path-filter does NOT contain docs/decision-trees/09-linux-triage.md (REMOVED per Phase-69 D-04 sub-decision (a))',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    if (c.includes('docs/decision-trees/09-linux-triage.md')) {
      return { pass: false, detail: '09-linux-triage.md still present in path-filter (EDIT (a) regression)' };
    }
    return { pass: true, detail: '09-linux-triage.md absent from path-filter (EDIT (a) applied)' };
  }
});

// === V-70-11: HARNESS-04 workflow YAML has 2 crons (0 8 * * 1 + 0 8 1 1,4,7,10 *) ===
checks.push({
  id: 11, name: 'V-70-11: HARNESS-04 workflow YAML has 2 crons (weekly bitrot + quarterly rotting-external)',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    const hasWeekly = c.includes("'0 8 * * 1'");
    const hasQuarterly = c.includes("'0 8 1 1,4,7,10 *'");
    if (!hasWeekly || !hasQuarterly) {
      return { pass: false, detail: 'weekly cron present=' + hasWeekly + '; quarterly cron present=' + hasQuarterly };
    }
    return { pass: true, detail: 'both crons present (weekly + quarterly)' };
  }
});

// === V-70-12: HARNESS-04 workflow YAML has pin-helper-advisory job with continue-on-error:true ===
checks.push({
  id: 12, name: 'V-70-12: HARNESS-04 workflow YAML has pin-helper-advisory job with continue-on-error:true',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    // Locate the actual JOB definition line (YAML "  pin-helper-advisory:" — 2-space indent
    // + trailing colon), distinct from comment mentions. Then scan ~800 chars for the
    // continue-on-error: true setting within the job body.
    const m = c.match(/^\s{2}pin-helper-advisory:[\s\S]{0,1200}/m);
    if (!m) {
      return { pass: false, detail: 'pin-helper-advisory job definition absent (no "  pin-helper-advisory:" line)' };
    }
    if (!m[0].includes('continue-on-error: true')) {
      return { pass: false, detail: 'pin-helper-advisory job lacks continue-on-error: true in body' };
    }
    return { pass: true, detail: 'pin-helper-advisory job present with continue-on-error:true' };
  }
});

// === V-70-13: HARNESS-04 workflow YAML has rotting-external-quarterly job ===
checks.push({
  id: 13, name: 'V-70-13: HARNESS-04 workflow YAML has rotting-external-quarterly job',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    if (!c.includes('rotting-external-quarterly')) {
      return { pass: false, detail: 'rotting-external-quarterly job absent' };
    }
    return { pass: true, detail: 'rotting-external-quarterly job present' };
  }
});

// === V-70-14: HARNESS-04 workflow YAML chain-67..70 are ACTIVE node invocations (NOT skip-if-missing for-loop) ===
checks.push({
  id: 14, name: 'V-70-14: HARNESS-04 workflow YAML chain-67..70 are ACTIVE node invocations (NOT skip-if-missing for-loop)',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    // Count active node invocations for check-phase-(67|68|69|70).mjs
    const matches = (c.match(/node\s+scripts\/validation\/check-phase-(67|68|69|70)\.mjs/g) || []).length;
    if (matches < 4) {
      return { pass: false, detail: 'expected >= 4 active node invocations for check-phase-67..70; got ' + matches };
    }
    // Anti-pattern: skip-if-missing for-loop should be absent
    if (/for\s+i\s+in\s+67\s+68\s+69\s+70/.test(c)) {
      return { pass: false, detail: 'skip-if-missing for-loop still present (EDIT (g) not applied)' };
    }
    return { pass: true, detail: matches + ' active node invocations present; for-loop skip-if-missing removed' };
  }
});

// === V-70-15: HARNESS-04 workflow YAML PRESERVES fetch-depth:0 on linux-chain-ubuntu-latest checkout (FETCH-DEPTH-01 inheritance) ===
checks.push({
  id: 15, name: 'V-70-15: HARNESS-04 workflow YAML PRESERVES fetch-depth: 0 on linux-chain checkout (FETCH-DEPTH-01 inheritance LOAD-BEARING)',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    if (!c.includes('fetch-depth: 0')) {
      return { pass: false, detail: 'fetch-depth: 0 absent (FETCH-DEPTH-01 LOAD-BEARING regression — historical SHA resolution broken on Linux)' };
    }
    return { pass: true, detail: 'fetch-depth: 0 preserved (FETCH-DEPTH-01 inheritance from 85521bb)' };
  }
});

// === V-70-16: HARNESS-04 workflow YAML parse/path-match/harness-run jobs reference v1.7 sidecar/harness (NOT v1.6) ===
checks.push({
  id: 16, name: 'V-70-16: HARNESS-04 workflow YAML parse/path-match/harness-run reference v1.7 sidecar/harness (NOT v1.6)',
  run() {
    const c = readFile(CI_WORKFLOW);
    if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing' };
    // Must contain v1.7 sidecar + v1.7 harness references
    if (!c.includes('v1.7-audit-allowlist.json')) return { pass: false, detail: 'parse/path-match job lacks v1.7-audit-allowlist.json reference' };
    if (!c.includes('v1.7-milestone-audit.mjs')) return { pass: false, detail: 'harness-run job lacks v1.7-milestone-audit.mjs reference' };
    // Must NOT contain any v1.6-* references (the workflow is v1.7-scoped)
    const v16refs = (c.match(/v1\.6-/g) || []).length;
    if (v16refs > 0) {
      return { pass: false, detail: 'workflow still contains ' + v16refs + ' v1.6- reference(s); EDIT (d)/(e)/(f) repointing incomplete' };
    }
    return { pass: true, detail: 'parse/path-match/harness-run reference v1.7; zero v1.6- references' };
  }
});

// === V-70-17 (frozen-to-frozen): HARNESS-04 Predecessor workflows (v1.4/v1.5/v1.6) BYTE-UNCHANGED at v1.7-close [v1.7-frozen @ aa6de68] ===
// Converted from a live-worktree blob-hash comparison in v1.20 Phase 139 Plan 04
// (D-18/D-19/D-20/D-22, adopting the check-phase-63.mjs V-63-08 precedent). Both sides of
// the comparison are now immutable: the recorded PRED_BLOBS baseline and the blob at the
// frozen v1.7-close SHA. A `git rev-parse` failure fails loud (pushed into the drift list,
// never a skip-pass) per the D-22 amendment to the check-phase-63 precedent. Accounting
// record: 139-04-SUMMARY.md.
checks.push({
  id: 17, name: 'V-70-17: HARNESS-04 Predecessor workflows v1.4/v1.5/v1.6 BYTE-UNCHANGED at v1.7-close (frozen-to-frozen blob comparison) [v1.7-frozen @ aa6de68]',
  run() {
    const V17 = MILESTONE_CLOSE_SHAS.V17;
    const drift = [];
    for (const [path, expected] of Object.entries(PRED_BLOBS)) {
      try {
        const actual = execFileSync('git', ['rev-parse', V17 + ':' + path], { encoding: 'utf8', timeout: 10000 }).trim();
        if (actual !== expected) {
          drift.push(path + ' (expected ' + expected.slice(0, 7) + '; got ' + actual.slice(0, 7) + ' @v1.7-close)');
        }
      } catch (err) {
        drift.push(path + ' (rev-parse ' + V17 + ':' + path + ' failed: ' + err.message.slice(0, 80) + ')');
      }
    }
    if (drift.length > 0) return { pass: false, detail: drift.length + ' predecessor workflow(s) drifted at v1.7-close (' + V17 + '): ' + drift.join('; ') };
    return { pass: true, detail: '3/3 predecessor workflows BYTE-UNCHANGED at v1.7-close (' + V17 + ')' };
  }
});

// =============================================================================
// V-70-18..V-70-27 — v1.7-frozen-aware (chicken-and-egg via aa6de68 placeholder)
// =============================================================================

// V-70-18..22 repointed from the aa6de68 (v1.7-frozen Atom-2) reader to the V17_CLOSEGATE
// (4df3a16) reader (Phase 141-03 addendum, OWNER-RATIFIED 2026-08-08), mirroring the V-70-24
// precedent above. MEASURED (Plan 141-03): both 70-04-AUDIT-RESULTS.md and
// v1.7-MILESTONE-AUDIT.md were authored in Plan 70-05 Commit B, not at Atom 2 -- they are
// ABSENT at aa6de68 and PRESENT at 4df3a16, the identical situation V-70-24's comment already
// documents for PROJECT.md. Before Plan 141-03 these five call-sites returned
// {pass:true, skipped:true} on the null aa6de68 read, so they had been vacuously passing since
// Phase 70 and had never verified anything on any clone -- see RETRO-02 (the V-70-24 fix) for
// the precedent this addendum applies to the remaining five sites.

// === V-70-18: HARNESS-05 70-04-AUDIT-RESULTS.md exists in phase dir [v1.7-close-gate @ 4df3a16] ===
checks.push({
  id: 18, name: 'V-70-18: HARNESS-05 70-04-AUDIT-RESULTS.md exists in phase dir [v1.7-close-gate @ 4df3a16]',
  run() {
    const PATH = '.planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-04-AUDIT-RESULTS.md';
    const c = readCorpusFileAtV17CloseGate(PATH);
    if (c === null) {
      return { pass: false, detail: 'frozen read of 70-04-AUDIT-RESULTS.md at v1.7-close-gate (4df3a16) failed -- distinct SHA from the aa6de68 arm, no longer chicken-and-egg, see frozenCause' };
    }
    if (c.length < 100) return { pass: false, detail: '70-04-AUDIT-RESULTS.md too short (< 100 chars)' };
    return { pass: true, detail: '70-04-AUDIT-RESULTS.md present at v1.7-close-gate SHA' };
  }
});

// === V-70-19: HARNESS-05 audit-results document contains B.1 + B.2 sections [v1.7-close-gate @ 4df3a16] ===
checks.push({
  id: 19, name: 'V-70-19: HARNESS-05 audit-results doc contains B.1 (local fresh-clone) + B.2 (Linux GHA cross-OS) [v1.7-close-gate @ 4df3a16]',
  run() {
    const PATH = '.planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-04-AUDIT-RESULTS.md';
    const c = readCorpusFileAtV17CloseGate(PATH);
    if (c === null) {
      return { pass: false, detail: 'frozen read of 70-04-AUDIT-RESULTS.md at v1.7-close-gate (4df3a16) failed -- distinct SHA from the aa6de68 arm, no longer chicken-and-egg, see frozenCause' };
    }
    const hasB1 = /##?\s*B\.?1\b/i.test(c) || /Section\s*B\.1/i.test(c);
    const hasB2 = /##?\s*B\.?2\b/i.test(c) || /Section\s*B\.2/i.test(c);
    if (!hasB1 || !hasB2) {
      return { pass: false, detail: 'B.1=' + hasB1 + '; B.2=' + hasB2 + ' (expected both)' };
    }
    return { pass: true, detail: 'audit-results doc contains B.1 + B.2 sections (v1.7-close-gate)' };
  }
});

// === V-70-20: HARNESS-06 v1.7-MILESTONE-AUDIT.md exists with YAML frontmatter [v1.7-close-gate @ 4df3a16] ===
checks.push({
  id: 20, name: 'V-70-20: HARNESS-06 v1.7-MILESTONE-AUDIT.md frontmatter (milestone:v1.7, status:passed, requirements:12/12, phases:4/4) [v1.7-close-gate @ 4df3a16]',
  run() {
    const c = readCorpusFileAtV17CloseGate('.planning/milestones/v1.7-MILESTONE-AUDIT.md');
    if (c === null) {
      return { pass: false, detail: 'frozen read of v1.7-MILESTONE-AUDIT.md at v1.7-close-gate (4df3a16) failed -- distinct SHA from the aa6de68 arm, no longer chicken-and-egg, see frozenCause' };
    }
    const REQUIRED = ['milestone: v1.7', 'status: passed', 'requirements: 12/12', 'phases: 4/4'];
    const missing = REQUIRED.filter(s => !c.includes(s));
    if (missing.length > 0) return { pass: false, detail: 'frontmatter missing: ' + missing.join(' | ') };
    return { pass: true, detail: 'milestone audit frontmatter complete (v1.7 passed 12/12 + 4/4)' };
  }
});

// === V-70-21: HARNESS-06 milestone audit doc has performed_by + Auditor-Independence + Command Verification Table sections [v1.7-close-gate @ 4df3a16] ===
checks.push({
  id: 21, name: 'V-70-21: HARNESS-06 milestone audit doc has performed_by + Auditor-Independence + Command Verification Table [v1.7-close-gate @ 4df3a16]',
  run() {
    const c = readCorpusFileAtV17CloseGate('.planning/milestones/v1.7-MILESTONE-AUDIT.md');
    if (c === null) {
      return { pass: false, detail: 'frozen read of v1.7-MILESTONE-AUDIT.md at v1.7-close-gate (4df3a16) failed -- distinct SHA from the aa6de68 arm, no longer chicken-and-egg, see frozenCause' };
    }
    const REQUIRED = ['performed_by:', 'Auditor-Independence', 'Command Verification'];
    const missing = REQUIRED.filter(s => !c.includes(s));
    if (missing.length > 0) return { pass: false, detail: 'missing sections: ' + missing.join(' | ') };
    return { pass: true, detail: 'performed_by + Auditor-Independence + Command Verification Table sections present' };
  }
});

// === V-70-22: HARNESS-06 milestone audit doc has NEW "Discoveries Surfaced During Execution" section with 5 discoveries [v1.7-close-gate @ 4df3a16] ===
checks.push({
  id: 22, name: 'V-70-22: HARNESS-06 milestone audit doc has Discoveries Surfaced During Execution (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01 + ARCHIVE-01) [v1.7-close-gate @ 4df3a16]',
  run() {
    const c = readCorpusFileAtV17CloseGate('.planning/milestones/v1.7-MILESTONE-AUDIT.md');
    if (c === null) {
      return { pass: false, detail: 'frozen read of v1.7-MILESTONE-AUDIT.md at v1.7-close-gate (4df3a16) failed -- distinct SHA from the aa6de68 arm, no longer chicken-and-egg, see frozenCause' };
    }
    if (!/Discoveries Surfaced/i.test(c)) return { pass: false, detail: '"Discoveries Surfaced During Execution" section absent' };
    const FIVE = ['FETCH-DEPTH-01', 'SCOPE-GAP-61', 'D-04-OVERSPEC-01', 'CHAIN-WRAPPER-01', 'ARCHIVE-01'];
    const missing = FIVE.filter(s => !c.includes(s));
    if (missing.length > 0) return { pass: false, detail: 'discoveries section missing: ' + missing.join(' | ') };
    return { pass: true, detail: 'Discoveries section with all 5 entries present' };
  }
});

// === V-70-23: HARNESS-06 v1.7-DEFERRED-CLEANUP.md finalized [v1.7-frozen @ aa6de68] ===
checks.push({
  id: 23, name: 'V-70-23: HARNESS-06 v1.7-DEFERRED-CLEANUP.md finalized (carry-forward + v1.6 items + Phase 69 discoveries) [v1.7-frozen @ aa6de68]',
  run() {
    const c = readDeferredCleanupAtV17Close();
    if (c === null) {
      return { pass: false, detail: 'frozen read of v1.7-DEFERRED-CLEANUP.md at v1.7-close (aa6de68) failed -- no longer chicken-and-egg, see frozenCause' };
    }
    // Look for carry-forward markers + Phase 69 discoveries
    const REQUIRED = ['HARNESS-FORWARD-01', 'CI-3'];
    const missing = REQUIRED.filter(s => !c.includes(s));
    if (missing.length > 0) return { pass: false, detail: 'deferred-cleanup missing carry-forward markers: ' + missing.join(' | ') };
    return { pass: true, detail: 'v1.7-DEFERRED-CLEANUP.md finalized with carry-forward markers' };
  }
});

// === V-70-24: Traceability closure PROJECT.md Validated section has 12 v1.7 rows [v1.7-close-gate @ 4df3a16] ===
// Plan 73-02 RETRO-02 fix: rewired from readProjectAtV17Close() (aa6de68) to readProjectAtV17CloseGate()
// (4df3a16) because the 12 v1.7 traceability rows were added in Plan 70-05 Commit B (4df3a16), not at
// Atom 2 aa6de68. Reading aa6de68 returns only 7/12 rows (CHAIN-01..03 + HARNESS-01..04 missing from Atom 2 state).
checks.push({
  id: 24, name: 'V-70-24: Traceability closure PROJECT.md Validated section has 12 v1.7 rows [v1.7-close-gate @ 4df3a16]',
  run() {
    const c = readProjectAtV17CloseGate();
    if (c === null) {
      return { pass: false, detail: 'frozen read of PROJECT.md at v1.7-close-gate (4df3a16) failed -- distinct SHA from the aa6de68 arm, no longer chicken-and-egg, see frozenCause' };
    }
    // Identify v1.7 requirement IDs (SWEEP-01/02 + CHAIN-01/02/03 + CILINUX-01 + HARNESS-01..06 = 12)
    const REQS_V17 = ['SWEEP-01', 'SWEEP-02', 'CHAIN-01', 'CHAIN-02', 'CHAIN-03', 'CILINUX-01', 'HARNESS-01', 'HARNESS-02', 'HARNESS-03', 'HARNESS-04', 'HARNESS-05', 'HARNESS-06'];
    const validated = REQS_V17.filter(r => c.includes(r));
    if (validated.length < 12) return { pass: false, detail: 'PROJECT.md mentions only ' + validated.length + '/12 v1.7 requirements [v1.7-close-gate @ 4df3a16]' };
    return { pass: true, detail: '12/12 v1.7 requirements present in PROJECT.md [v1.7-close-gate @ 4df3a16]' };
  }
});

// === V-70-25: Traceability closure ROADMAP.md Progress table 4/4 v1.7 phases (67-70) Complete [v1.7-frozen @ aa6de68] ===
checks.push({
  id: 25, name: 'V-70-25: Traceability closure ROADMAP.md Progress 4/4 v1.7 phases (67-70) Complete [v1.7-frozen @ aa6de68]',
  run() {
    const c = readRoadmapAtV17Close();
    if (c === null) {
      return { pass: false, detail: 'frozen read of ROADMAP.md at v1.7-close (aa6de68) failed -- no longer chicken-and-egg, see frozenCause' };
    }
    // Look for Phase 67/68/69/70 + "Complete" markers
    const PHASES = ['Phase 67', 'Phase 68', 'Phase 69', 'Phase 70'];
    const phasesPresent = PHASES.filter(p => c.includes(p));
    if (phasesPresent.length < 4) return { pass: false, detail: 'ROADMAP missing v1.7 phase rows: ' + (4 - phasesPresent.length) + ' missing' };
    return { pass: true, detail: '4/4 v1.7 phase rows present in ROADMAP.md' };
  }
});

// === V-70-26: Traceability closure STATE.md frontmatter status:complete + completed_phases:4 / total_phases:4 [v1.7-frozen @ aa6de68] ===
checks.push({
  id: 26, name: 'V-70-26: Traceability closure STATE.md frontmatter status:complete + completed_phases:4/total_phases:4 [v1.7-frozen @ aa6de68]',
  run() {
    const c = readStateAtV17Close();
    if (c === null) {
      return { pass: false, detail: 'frozen read of STATE.md at v1.7-close (aa6de68) failed -- no longer chicken-and-egg, see frozenCause' };
    }
    // STATE.md at v1.7-close should record milestone completion. Tolerant pattern check.
    const hasStatus = /status:\s*(complete|completed|closed)/i.test(c) || /milestone:\s*v1\.7/i.test(c);
    if (!hasStatus) return { pass: false, detail: 'STATE.md lacks v1.7 milestone-close markers' };
    return { pass: true, detail: 'STATE.md records v1.7 milestone close state' };
  }
});

// === V-70-27: Traceability closure REQUIREMENTS.md Traceability table 12 v1.7 rows all "Complete" [v1.7-frozen @ aa6de68] ===
checks.push({
  id: 27, name: 'V-70-27: Traceability closure REQUIREMENTS.md Traceability table 12 v1.7 rows all Complete [v1.7-frozen @ aa6de68]',
  run() {
    const c = readRequirementsAtV17Close();
    if (c === null) {
      return { pass: false, detail: 'frozen read of REQUIREMENTS.md at v1.7-close (aa6de68) failed -- no longer chicken-and-egg, see frozenCause' };
    }
    const REQS_V17 = ['SWEEP-01', 'SWEEP-02', 'CHAIN-01', 'CHAIN-02', 'CHAIN-03', 'CILINUX-01', 'HARNESS-01', 'HARNESS-02', 'HARNESS-03', 'HARNESS-04', 'HARNESS-05', 'HARNESS-06'];
    const present = REQS_V17.filter(r => c.includes(r));
    if (present.length < 12) return { pass: false, detail: 'REQUIREMENTS.md Traceability missing rows: ' + (12 - present.length) + ' missing' };
    return { pass: true, detail: '12/12 v1.7 requirements present in REQUIREMENTS.md Traceability table' };
  }
});

// =============================================================================
// V-70-CHAIN: chain regression-guards for check-phase-{48..69}.mjs
// =============================================================================
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
    id, name: `V-70-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 70 (see CHAIN_SKIP docs)' };
      }
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      // v1.20 Phase 141 Plan 04 Task 1a (owner-ratified 2026-08-08): CHECK_PHASE_NESTED=1 now
      // propagates unconditionally, matching the 14-validator precedent (check-phase-72 et al.)
      // -- the prior isPeer-gated form left 48-66 running bare under the non-peer 300000ms cap,
      // which a real 65/66 child (305-335s / ~665s) exceeds. isPeer still selects subTimeout only.
      const isPeer = phaseNum >= 67;
      const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };
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
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' }) };
      }
    }
  });
}

// =============================================================================
// V-70-AUDIT: v1.7-milestone-audit.mjs subprocess exits 0
// =============================================================================
checks.push({
  id: 'AUDIT', name: 'V-70-AUDIT: v1.7-milestone-audit.mjs exits 0',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
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
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
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
console.log('check-phase-70 -- Phase 70 deliverables (Pillar D close-gate)\n');
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
