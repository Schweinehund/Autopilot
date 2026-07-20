#!/usr/bin/env node
// check-phase-131.mjs -- Phase 131 deliverables (Recipe #2 -- Shared iPad Full Provisioning)
//
// v1.18 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-134.mjs).
// NEEDLES DERIVED INLINE from 131-VERIFICATION.md (Required Artifacts / Observable Truths): the
// docs/recipes/02-shared-ipad-full-provisioning.md recipe (IPAD-01), the all-unsupported anti-feature
// table (IPAD-02), the guest/temporary-session decision block embedded in Step 5 (IPAD-02), and the
// per-role layered-configuration worked example spanning Steps 6-7 (IPAD-03).
//
// Assertion classes:
//   V-131-RECIPE        docs/recipes/02-shared-ipad-full-provisioning.md exists + non-empty (IPAD-01)
//   V-131-UNSUPPORTED    Unsupported and Anti-Feature Callouts section present (IPAD-02)
//   V-131-GUESTDECISION  Step 5 guest (temporary) session decision block present (IPAD-02)
//   V-131-LAYERED        Step 6 device-group baseline + Step 7 per-role user-group overlay present (IPAD-03)
//   V-131-SELF           CHAIN_PHASES does NOT include 131 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-131.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-134.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_RECIPE = 'docs/recipes/02-shared-ipad-full-provisioning.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-131-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('RECIPE', DELIVERABLE_RECIPE, 'IPAD-01 linear happy-path spine');

// === V-131-UNSUPPORTED: Unsupported and Anti-Feature Callouts section present (IPAD-02) ===
checks.push({
  id: 'UNSUPPORTED',
  name: 'V-131-UNSUPPORTED: Unsupported and Anti-Feature Callouts section present in ' + DELIVERABLE_RECIPE,
  run() {
    const c = readFile(DELIVERABLE_RECIPE);
    if (c === null) return { pass: false, detail: DELIVERABLE_RECIPE + ' missing' };
    if (!c.includes('## Unsupported and Anti-Feature Callouts')) {
      return { pass: false, detail: 'UNSUPPORTED needle absent: "## Unsupported and Anti-Feature Callouts"' };
    }
    return { pass: true, detail: 'Unsupported and Anti-Feature Callouts section present (IPAD-02)' };
  }
});

// === V-131-GUESTDECISION: Step 5 guest (temporary) session decision block present (IPAD-02) ===
checks.push({
  id: 'GUESTDECISION',
  name: 'V-131-GUESTDECISION: guest (temporary) session decision block present in ' + DELIVERABLE_RECIPE,
  run() {
    const c = readFile(DELIVERABLE_RECIPE);
    if (c === null) return { pass: false, detail: DELIVERABLE_RECIPE + ' missing' };
    if (!/decide on guest \(temporary\) sessions/.test(c)) {
      return { pass: false, detail: 'GUESTDECISION needle absent: "decide on guest (temporary) sessions"' };
    }
    if (!c.includes('Ask the admin')) {
      return { pass: false, detail: 'GUESTDECISION needle absent: "Ask the admin" decision-point lead-in' };
    }
    return { pass: true, detail: 'Step 5 guest (temporary) session admin decision-point block present (IPAD-02)' };
  }
});

// === V-131-LAYERED: Step 6 device-group baseline + Step 7 per-role user-group overlay (IPAD-03) ===
checks.push({
  id: 'LAYERED',
  name: 'V-131-LAYERED: layered-configuration worked example (Step 6 baseline + Step 7 overlay) present in ' + DELIVERABLE_RECIPE,
  run() {
    const c = readFile(DELIVERABLE_RECIPE);
    if (c === null) return { pass: false, detail: DELIVERABLE_RECIPE + ' missing' };
    if (!c.includes('Step 6: Apply the device-group baseline')) {
      return { pass: false, detail: 'LAYERED needle absent: "Step 6: Apply the device-group baseline"' };
    }
    if (!c.includes('Step 7: Apply the per-role user-group overlay')) {
      return { pass: false, detail: 'LAYERED needle absent: "Step 7: Apply the per-role user-group overlay"' };
    }
    return { pass: true, detail: 'Step 6 (device-group baseline) + Step 7 (per-role user-group overlay) present (IPAD-03)' };
  }
});

// === V-131-SELF: dual-invariant guard (CHAIN_PHASES excludes 131; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-131-SELF: CHAIN_PHASES does NOT include 131; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(131)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 131 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (131 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-126.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-131 -- Phase 131 deliverables (Recipe #2 -- Shared iPad Full Provisioning)\n');
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
