#!/usr/bin/env node
// check-phase-120.mjs -- Phase 120 deliverables (EEE Standard Extension -- Mermaid/C17 Policy + Hygiene Fix)
//
// v1.16 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-125.mjs).
// NEEDLES DERIVED INLINE from 120-VERIFICATION.md (Required Artifacts / Observable Truths): the
// Mermaid-in-Enrolled-Classes Policy (STD-04) section header, the Non-MECE precedence rule (D-08)
// subsection, the C17 comment-only pointer marker, and the HYG-01 frozen-at-close.mjs hygiene fix
// (REMAIN INLINE claim removed, Phase 111 attribution present).
//
// Validator-atom deferral note: this file was DELIBERATELY not authored in Phase 120 itself
// (project_v113_validator_atom_deferral.md convention) -- it is authored here, in Phase 125, as
// one of the six new validators this atom ships (5 leaves 120-124 + apex 125).
//
// Assertion classes:
//   V-120-PRESENCE-STANDARD  docs/_standards/EEE-SOP-standard.md exists + non-empty (STD-04)
//   V-120-MERMAID-POLICY     "## Mermaid-in-Enrolled-Classes Policy (STD-04)" header landed
//   V-120-NONMECE            "#### Non-MECE precedence rule (D-08)" subsection landed
//   V-120-C17-COMMENT        c17-eee-contract.mjs comment-only pointer marker landed (assertion #1 unchanged)
//   V-120-HYG01              frozen-at-close.mjs "REMAIN INLINE" ABSENT + "Phase 111" PRESENT (HYG-01)
//   V-120-SELF               CHAIN_PHASES does NOT include 120 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-120.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Lightweight: NO chain (chain lives only in apex check-phase-125.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_STANDARD    = 'docs/_standards/EEE-SOP-standard.md';
const DELIVERABLE_C17         = 'scripts/validation/c17-eee-contract.mjs';
const DELIVERABLE_FROZENCLOSE = 'scripts/validation/_lib/frozen-at-close.mjs';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-120-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-STANDARD', DELIVERABLE_STANDARD, 'STD-04');

// === V-120-MERMAID-POLICY: Mermaid-in-Enrolled-Classes Policy (STD-04) header landed ===
checks.push({
  id: 'MERMAID-POLICY',
  name: 'V-120-MERMAID-POLICY: Mermaid-in-Enrolled-Classes Policy (STD-04) header present in ' + DELIVERABLE_STANDARD,
  run() {
    const c = readFile(DELIVERABLE_STANDARD);
    if (c === null) return { pass: false, detail: DELIVERABLE_STANDARD + ' missing' };
    const needle = '## Mermaid-in-Enrolled-Classes Policy (STD-04)';
    if (!c.includes(needle)) return { pass: false, detail: 'MERMAID-POLICY needle absent: ' + needle };
    return { pass: true, detail: 'Mermaid-in-Enrolled-Classes Policy (STD-04) header present' };
  }
});

// === V-120-NONMECE: Non-MECE precedence rule (D-08) subsection landed ===
checks.push({
  id: 'NONMECE',
  name: 'V-120-NONMECE: Non-MECE precedence rule (D-08) subsection present in ' + DELIVERABLE_STANDARD,
  run() {
    const c = readFile(DELIVERABLE_STANDARD);
    if (c === null) return { pass: false, detail: DELIVERABLE_STANDARD + ' missing' };
    const needle = '#### Non-MECE precedence rule (D-08)';
    if (!c.includes(needle)) return { pass: false, detail: 'NONMECE needle absent: ' + needle };
    return { pass: true, detail: 'Non-MECE precedence rule (D-08) subsection present' };
  }
});

// === V-120-C17-COMMENT: c17-eee-contract.mjs comment-only pointer marker landed (assertion #1 unchanged) ===
checks.push({
  id: 'C17-COMMENT',
  name: 'V-120-C17-COMMENT: comment-only pointer marker present in ' + DELIVERABLE_C17,
  run() {
    const c = readFile(DELIVERABLE_C17);
    if (c === null) return { pass: false, detail: DELIVERABLE_C17 + ' missing' };
    const needle = '[v1.16 Phase-120 addition, comment-only]';
    if (!c.includes(needle)) return { pass: false, detail: 'C17-COMMENT needle absent: ' + needle };
    return { pass: true, detail: 'comment-only pointer marker present (assertion #1 byte-unchanged)' };
  }
});

// === V-120-HYG01: frozen-at-close.mjs "REMAIN INLINE" ABSENT + "Phase 111" PRESENT (HYG-01) ===
checks.push({
  id: 'HYG01',
  name: 'V-120-HYG01: "REMAIN INLINE" absent + "Phase 111" present in ' + DELIVERABLE_FROZENCLOSE,
  run() {
    const c = readFile(DELIVERABLE_FROZENCLOSE);
    if (c === null) return { pass: false, detail: DELIVERABLE_FROZENCLOSE + ' missing' };
    if (c.includes('REMAIN INLINE')) return { pass: false, detail: 'HYG01 stale claim present: REMAIN INLINE' };
    if (!c.includes('Phase 111')) return { pass: false, detail: 'HYG01 needle absent: Phase 111' };
    return { pass: true, detail: 'stale "REMAIN INLINE" claim removed; "Phase 111" attribution present (HYG-01)' };
  }
});

// === V-120-SELF: dual-invariant guard (CHAIN_PHASES excludes 120; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-120-SELF: CHAIN_PHASES does NOT include 120; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(120)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 120 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (120 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-118.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-120 -- Phase 120 deliverables (EEE Standard Extension -- Mermaid/C17 Policy + Hygiene Fix)\n');
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
