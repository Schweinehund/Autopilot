#!/usr/bin/env node
// check-phase-113.mjs -- Phase 113 deliverables (Conversion Pipeline Lock + Representative-Set Grounding Validation)
//
// v1.15 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-119.mjs).
// NEEDLES DERIVED INLINE from 113-VERIFICATION.md (Required Artifacts / Observable Truths): Phase 113
// shipped without a needle-spec hand-off, so the landed strings are sourced from the verification report.
//
// WHY content needles are load-bearing: a bare PRESENCE check on the pipeline scripts is trivially green
// once the files exist. The content needles pin PIPE-01 landed strings -- the pandoc 3.7.0.2 version pin in
// convert.ps1 and the SC3 deployment-policy heading in README.md -- so a regression that guts the pipeline
// lock (leaving stub files) is caught.
//
// Assertion classes:
//   V-113-PRESENCE-OOXML   scripts/pipeline/lib/ooxml.mjs exists + non-empty (PIPE-01)
//   V-113-PRESENCE-GUARD   scripts/pipeline/guard-docx.mjs exists + non-empty (PIPE-01)
//   V-113-PRESENCE-CONVERT scripts/pipeline/convert.ps1 exists + non-empty (PIPE-01)
//   V-113-PRESENCE-README  scripts/pipeline/README.md exists + non-empty (PIPE-01/SC3)
//   V-113-PANDOC-PIN       pandoc 3.7.0.2 version pin landed in convert.ps1
//   V-113-DEPLOY-POLICY    SC3 deployment-policy heading landed in README.md
//   V-113-SELF             CHAIN_PHASES does NOT include 113 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-113.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-119.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const DELIVERABLE_OOXML   = 'scripts/pipeline/lib/ooxml.mjs';
const DELIVERABLE_GUARD   = 'scripts/pipeline/guard-docx.mjs';
const DELIVERABLE_CONVERT = 'scripts/pipeline/convert.ps1';
const DELIVERABLE_README  = 'scripts/pipeline/README.md';

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-113-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}

presence('PRESENCE-OOXML', DELIVERABLE_OOXML, 'PIPE-01');
presence('PRESENCE-GUARD', DELIVERABLE_GUARD, 'PIPE-01');
presence('PRESENCE-CONVERT', DELIVERABLE_CONVERT, 'PIPE-01');
presence('PRESENCE-README', DELIVERABLE_README, 'PIPE-01');

// === V-113-PANDOC-PIN: pandoc 3.7.0.2 version pin landed in convert.ps1 ===
checks.push({
  id: 'PANDOC-PIN',
  name: 'V-113-PANDOC-PIN: pandoc 3.7.0.2 version pin present in ' + DELIVERABLE_CONVERT,
  run() {
    const c = readFile(DELIVERABLE_CONVERT);
    if (c === null) return { pass: false, detail: DELIVERABLE_CONVERT + ' missing' };
    const needle = "$expectedVer = '3.7.0.2'";
    if (!c.includes(needle)) return { pass: false, detail: 'PANDOC-PIN needle absent: ' + needle };
    return { pass: true, detail: 'pandoc 3.7.0.2 version pin present' };
  }
});

// === V-113-DEPLOY-POLICY: SC3 deployment-policy heading landed in README.md ===
checks.push({
  id: 'DEPLOY-POLICY',
  name: 'V-113-DEPLOY-POLICY: SC3 deployment-policy heading present in ' + DELIVERABLE_README,
  run() {
    const c = readFile(DELIVERABLE_README);
    if (c === null) return { pass: false, detail: DELIVERABLE_README + ' missing' };
    const needle = '## SC3 — Deployment Policy';
    if (!c.includes(needle)) return { pass: false, detail: 'DEPLOY-POLICY needle absent: ' + needle };
    return { pass: true, detail: 'SC3 deployment-policy heading present' };
  }
});

// === V-113-SELF: dual-invariant guard (CHAIN_PHASES excludes 113; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-113-SELF: CHAIN_PHASES does NOT include 113; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(113)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 113 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (113 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-101.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-113 -- Phase 113 deliverables (Conversion Pipeline Lock + Representative-Set Grounding Validation)\n');
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
