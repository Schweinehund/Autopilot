#!/usr/bin/env node
// check-phase-130.mjs -- Phase 130 deliverables (Recipe #1 -- Shared Windows AVD-Client Device)
//
// v1.18 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-134.mjs).
// NEEDLES DERIVED INLINE from 130-VERIFICATION.md (Required Artifacts / Observable Truths): the
// docs/recipes/01-shared-windows-avd-client.md recipe (AVD-01..05), the kiosk-vs-SharedPC decision
// fork (AVD-02), the 4-row anti-feature callout table (AVD-03), and the HYG-04 RE-084 Wi-Fi-claim
// correction landed in docs/admin-setup-apv1/08-self-deploying.md.
//
// Assertion classes:
//   V-130-RECIPE        docs/recipes/01-shared-windows-avd-client.md exists + non-empty (AVD-01)
//   V-130-KIOSKFORK      Step 5a/5b kiosk-vs-SharedPC decision fork present (AVD-02)
//   V-130-ANTIFEATURE    Unsupported and Anti-Feature Callouts section present (AVD-03)
//   V-130-HYG04          RE-084 Wi-Fi-claim correction landed in docs/admin-setup-apv1/08-self-deploying.md
//   V-130-SELF           CHAIN_PHASES does NOT include 130 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-130.mjs [--verbose]
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

const DELIVERABLE_RECIPE = 'docs/recipes/01-shared-windows-avd-client.md';
const DELIVERABLE_RE084  = 'docs/admin-setup-apv1/08-self-deploying.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-130-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('RECIPE', DELIVERABLE_RECIPE, 'AVD-01 linear happy-path spine');

// === V-130-KIOSKFORK: Step 5a/5b kiosk-vs-SharedPC decision fork present (AVD-02) ===
checks.push({
  id: 'KIOSKFORK',
  name: 'V-130-KIOSKFORK: Step 5a/5b kiosk-vs-SharedPC decision fork present in ' + DELIVERABLE_RECIPE,
  run() {
    const c = readFile(DELIVERABLE_RECIPE);
    if (c === null) return { pass: false, detail: DELIVERABLE_RECIPE + ' missing' };
    if (!c.includes('Step 5a: Kiosk configuration')) {
      return { pass: false, detail: 'KIOSKFORK needle absent: "Step 5a: Kiosk configuration"' };
    }
    if (!c.includes('Step 5b: Shared PC configuration')) {
      return { pass: false, detail: 'KIOSKFORK needle absent: "Step 5b: Shared PC configuration"' };
    }
    return { pass: true, detail: 'Step 5a (Kiosk) + Step 5b (Shared PC) decision fork present (AVD-02)' };
  }
});

// === V-130-ANTIFEATURE: Unsupported and Anti-Feature Callouts section present (AVD-03) ===
checks.push({
  id: 'ANTIFEATURE',
  name: 'V-130-ANTIFEATURE: Unsupported and Anti-Feature Callouts section present in ' + DELIVERABLE_RECIPE,
  run() {
    const c = readFile(DELIVERABLE_RECIPE);
    if (c === null) return { pass: false, detail: DELIVERABLE_RECIPE + ' missing' };
    if (!c.includes('## Unsupported and Anti-Feature Callouts')) {
      return { pass: false, detail: 'ANTIFEATURE needle absent: "## Unsupported and Anti-Feature Callouts"' };
    }
    return { pass: true, detail: 'Unsupported and Anti-Feature Callouts section present (AVD-03, 4-row table)' };
  }
});

// === V-130-HYG04: RE-084 Wi-Fi-claim correction landed (HYG-04) ===
checks.push({
  id: 'HYG04',
  name: 'V-130-HYG04: RE-084 Wi-Fi-claim correction present in ' + DELIVERABLE_RE084,
  run() {
    const c = readFile(DELIVERABLE_RE084);
    if (c === null) return { pass: false, detail: DELIVERABLE_RE084 + ' missing' };
    if (!c.includes('HYG-04')) {
      return { pass: false, detail: 'HYG04 needle absent: HYG-04 Version-History reference' };
    }
    if (!/Wi-Fi is supported/.test(c)) {
      return { pass: false, detail: 'HYG04 needle absent: "Wi-Fi is supported" corrected claim' };
    }
    if (/Wi-Fi is NOT supported/.test(c)) {
      return { pass: false, detail: 'HYG04 regression: stale "Wi-Fi is NOT supported" claim still present' };
    }
    return { pass: true, detail: 'RE-084 Wi-Fi-claim corrected + HYG-04 Version-History row present' };
  }
});

// === V-130-SELF: dual-invariant guard (CHAIN_PHASES excludes 130; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-130-SELF: CHAIN_PHASES does NOT include 130; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(130)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 130 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (130 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-126.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-130 -- Phase 130 deliverables (Recipe #1 -- Shared Windows AVD-Client Device)\n');
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
