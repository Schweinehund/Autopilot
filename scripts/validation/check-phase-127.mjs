#!/usr/bin/env node
// check-phase-127.mjs -- Phase 127 deliverables (Automated Milestone-Completion Trigger)
//
// v1.17 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-128.mjs).
// NEEDLES DERIVED INLINE from 127-VERIFICATION.md (Required Artifacts / Observable Truths): the
// publish-bundle-gate.cjs Stop-hook (mirrors the Jira milestone-hook pattern under .claude/hooks/),
// its pure computeDecision() decision function, and the build-publish-bundle.mjs --version=/deriveZipName()
// parameterization (D-05) the hook's nudge text depends on.
//
// Assertion classes:
//   V-127-PRESENCE-HOOK      .claude/hooks/publish-bundle-gate.cjs exists + non-empty (Stop-hook)
//   V-127-COMPUTEDECISION    computeDecision landed in publish-bundle-gate.cjs (pure decision function)
//   V-127-DERIVEZIPNAME      deriveZipName landed in scripts/pipeline/build-publish-bundle.mjs (D-05)
//   V-127-VERSIONFLAG        --version= flag parsing landed in build-publish-bundle.mjs
//   V-127-SELF               CHAIN_PHASES does NOT include 127 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-127.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-128.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_HOOK   = '.claude/hooks/publish-bundle-gate.cjs';
const DELIVERABLE_BUNDLE = 'scripts/pipeline/build-publish-bundle.mjs';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-127-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-HOOK', DELIVERABLE_HOOK, 'Stop-hook, mirrors Jira milestone-hook pattern');

// === V-127-COMPUTEDECISION: computeDecision landed in publish-bundle-gate.cjs ===
checks.push({
  id: 'COMPUTEDECISION',
  name: 'V-127-COMPUTEDECISION: computeDecision present in ' + DELIVERABLE_HOOK,
  run() {
    const c = readFile(DELIVERABLE_HOOK);
    if (c === null) return { pass: false, detail: DELIVERABLE_HOOK + ' missing' };
    if (!c.includes('computeDecision')) return { pass: false, detail: 'COMPUTEDECISION needle absent: computeDecision' };
    return { pass: true, detail: 'computeDecision pure decision function present' };
  }
});

// === V-127-DERIVEZIPNAME: deriveZipName landed in build-publish-bundle.mjs (D-05) ===
checks.push({
  id: 'DERIVEZIPNAME',
  name: 'V-127-DERIVEZIPNAME: deriveZipName present in ' + DELIVERABLE_BUNDLE,
  run() {
    const c = readFile(DELIVERABLE_BUNDLE);
    if (c === null) return { pass: false, detail: DELIVERABLE_BUNDLE + ' missing' };
    if (!c.includes('deriveZipName')) return { pass: false, detail: 'DERIVEZIPNAME needle absent: deriveZipName' };
    return { pass: true, detail: 'deriveZipName() ZIP_NAME derivation present (D-05)' };
  }
});

// === V-127-VERSIONFLAG: --version= flag parsing landed in build-publish-bundle.mjs ===
checks.push({
  id: 'VERSIONFLAG',
  name: 'V-127-VERSIONFLAG: --version= flag parsing present in ' + DELIVERABLE_BUNDLE,
  run() {
    const c = readFile(DELIVERABLE_BUNDLE);
    if (c === null) return { pass: false, detail: DELIVERABLE_BUNDLE + ' missing' };
    if (!c.includes('--version=')) return { pass: false, detail: 'VERSIONFLAG needle absent: --version=' };
    return { pass: true, detail: '--version= flag parsing present (pipeline parameterization, HOOK-01)' };
  }
});

// === V-127-SELF: dual-invariant guard (CHAIN_PHASES excludes 127; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-127-SELF: CHAIN_PHASES does NOT include 127; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(127)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 127 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (127 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-123.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-127 -- Phase 127 deliverables (Automated Milestone-Completion Trigger)\n');
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
