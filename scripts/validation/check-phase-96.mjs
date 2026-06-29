#!/usr/bin/env node
// check-phase-96.mjs -- Phase 96 deliverables (Surgical Conflict Fixes -- ACC-01/02/04 + GLOS-01)
//
// v1.13 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-100.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): Phase 96 shipped before the needle-spec hand-off
// convention (which started at Phase 97). NO retroactive 96-NEEDLE-SPEC.md was authored.
//
// WHY content needles are load-bearing: guide 00, runbook 15, and the glossary all pre-existed
// Phase 96 as patches. A bare PRESENCE check is trivially green on old bytes -- the content needles
// are the durable recurring CI net for ACC-01/02/04 + GLOS-01.
//
// WHY line-326 ("never distributed via Apple VPP") is EXCLUDED as a needle: that phrase pre-dates
// Phase 96 entirely and exists in the pre-Phase-96 bytes. Needling it would false-green against any
// pre-96 snapshot. The Phase-96-specific landing strings are at lines ~309 (ACC-01 What-Happens)
// and ~319 (ACC-01 Behind-the-Scenes) only.
//
// Assertion classes:
//   V-96-PRESENCE-00      docs/macos-lifecycle/00-ade-lifecycle.md exists + non-empty
//   V-96-PRESENCE-15      docs/l1-runbooks/15-macos-company-portal-sign-in.md exists + non-empty
//   V-96-PRESENCE-GLOS    docs/_glossary-macos.md exists + non-empty
//   V-96-ACC01-N1         ACC-01 What-Happens landing string ~line 309 (not pre-existing line-326)
//   V-96-ACC01-N2         ACC-01 Behind-the-Scenes landing string ~line 319
//   V-96-ACC02            ACC-02 static-user-group correction ~line 250
//   V-96-ACC04            ACC-04 unique token at runbook 15:30 corrected remediation sentence
//   V-96-GLOS01-N1        GLOS-01 support.iru.io URL present in glossary
//   V-96-GLOS01-N2        GLOS-01 support.kandji.io URL present in glossary
//   V-96-GLOS01-N3        GLOS-01 docs.iru.com URL present in glossary
//   V-96-SLUG-GUARD       bare '### Kandji-Iru' heading intact (slug #kandji-iru double-hyphen landmine)
//   V-96-VPP-ROW-GONE     NEGATIVE: '| VPP |' is ABSENT from guide 00 (removed local VPP glossary row stays removed)
//   V-96-SELF             CHAIN_PHASES does NOT include 96 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A structural shell from check-phase-94.mjs; content needles derived from 96-CONTEXT.md
// + 100-RESEARCH.md §"check-phase-96.mjs -- Derived Inline per D-01".
//
// Usage: node scripts/validation/check-phase-96.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-100.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// Phase 96 deliverables (3 patched files; ACC-01/02/04 + GLOS-01 corrections)
const DELIVERABLE_00   = 'docs/macos-lifecycle/00-ade-lifecycle.md';
const DELIVERABLE_15   = 'docs/l1-runbooks/15-macos-company-portal-sign-in.md';
const DELIVERABLE_GLOS = 'docs/_glossary-macos.md';

const checks = [];

// === V-96-PRESENCE-*: phase deliverables exist + non-empty ===

checks.push({
  id: 'PRESENCE-00',
  name: 'V-96-PRESENCE-00: ' + DELIVERABLE_00 + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE_00);
    if (c === null) return { pass: false, detail: DELIVERABLE_00 + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE_00 + ' is empty' };
    return { pass: true, detail: DELIVERABLE_00 + ' present (' + c.length + ' bytes)' };
  }
});

checks.push({
  id: 'PRESENCE-15',
  name: 'V-96-PRESENCE-15: ' + DELIVERABLE_15 + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE_15);
    if (c === null) return { pass: false, detail: DELIVERABLE_15 + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE_15 + ' is empty' };
    return { pass: true, detail: DELIVERABLE_15 + ' present (' + c.length + ' bytes)' };
  }
});

checks.push({
  id: 'PRESENCE-GLOS',
  name: 'V-96-PRESENCE-GLOS: ' + DELIVERABLE_GLOS + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE_GLOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOS + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE_GLOS + ' is empty' };
    return { pass: true, detail: DELIVERABLE_GLOS + ' present (' + c.length + ' bytes)' };
  }
});

// === V-96-ACC01-N1: ACC-01 What-Happens landing string ~line 309 ===
// Phase-96-specific: "via the Intune Management Extension (IME), not VPP licensing"
// NOTE: the pre-existing line-326 phrase "never distributed via Apple VPP" is INTENTIONALLY
// excluded as a needle -- it pre-dates Phase 96 and would false-green on pre-96 bytes.
checks.push({
  id: 'ACC01-N1',
  name: 'V-96-ACC01-N1: guide 00 contains ACC-01 What-Happens landing string (line ~309)',
  run() {
    const c = readFile(DELIVERABLE_00);
    if (c === null) return { pass: false, detail: DELIVERABLE_00 + ' missing' };
    const needle = 'via the Intune Management Extension (IME), not VPP licensing';
    if (!c.includes(needle)) return { pass: false, detail: 'ACC01-N1 needle absent: ' + needle };
    return { pass: true, detail: 'ACC01-N1 needle present' };
  }
});

// === V-96-ACC01-N2: ACC-01 Behind-the-Scenes landing string ~line 319 ===
checks.push({
  id: 'ACC01-N2',
  name: 'V-96-ACC01-N2: guide 00 contains ACC-01 Behind-the-Scenes landing string (line ~319)',
  run() {
    const c = readFile(DELIVERABLE_00);
    if (c === null) return { pass: false, detail: DELIVERABLE_00 + ' missing' };
    const needle = 'line-of-business (LOB) app, or as an unmanaged macOS PKG app';
    if (!c.includes(needle)) return { pass: false, detail: 'ACC01-N2 needle absent: ' + needle };
    return { pass: true, detail: 'ACC01-N2 needle present' };
  }
});

// === V-96-ACC02: static-user-group correction at guide 00 ~line 250 ===
// Discriminating phrase (avoids pre-existing standalone "static" uses elsewhere in file)
checks.push({
  id: 'ACC02',
  name: 'V-96-ACC02: guide 00 contains ACC-02 static-user-group correction (~line 250)',
  run() {
    const c = readFile(DELIVERABLE_00);
    if (c === null) return { pass: false, detail: DELIVERABLE_00 + ' missing' };
    const needle = 'static user group and delivered before the device reaches the Entra credential screen';
    if (!c.includes(needle)) return { pass: false, detail: 'ACC02 needle absent: ' + needle };
    return { pass: true, detail: 'ACC02 needle present' };
  }
});

// === V-96-ACC04: unique ACC-04 token at runbook 15:30 corrected remediation sentence ===
// "Required assignment for this user's group" -- unique to the corrected sentence; not a generic
// "user group" substring that appears throughout the file.
checks.push({
  id: 'ACC04',
  name: "V-96-ACC04: runbook 15 contains ACC-04 unique corrected-remediation token (line ~30)",
  run() {
    const c = readFile(DELIVERABLE_15);
    if (c === null) return { pass: false, detail: DELIVERABLE_15 + ' missing' };
    const needle = "Required assignment for this user's group";
    if (!c.includes(needle)) return { pass: false, detail: 'ACC04 needle absent: ' + needle };
    return { pass: true, detail: 'ACC04 needle present' };
  }
});

// === V-96-GLOS01-N1/N2/N3: three-URL statement in glossary ~line 114 ===
checks.push({
  id: 'GLOS01-N1',
  name: 'V-96-GLOS01-N1: glossary contains GLOS-01 URL support.iru.io',
  run() {
    const c = readFile(DELIVERABLE_GLOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOS + ' missing' };
    if (!c.includes('support.iru.io')) return { pass: false, detail: 'GLOS01-N1 needle absent: support.iru.io' };
    return { pass: true, detail: 'GLOS01-N1 needle present' };
  }
});

checks.push({
  id: 'GLOS01-N2',
  name: 'V-96-GLOS01-N2: glossary contains GLOS-01 URL support.kandji.io',
  run() {
    const c = readFile(DELIVERABLE_GLOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOS + ' missing' };
    if (!c.includes('support.kandji.io')) return { pass: false, detail: 'GLOS01-N2 needle absent: support.kandji.io' };
    return { pass: true, detail: 'GLOS01-N2 needle present' };
  }
});

checks.push({
  id: 'GLOS01-N3',
  name: 'V-96-GLOS01-N3: glossary contains GLOS-01 URL docs.iru.com',
  run() {
    const c = readFile(DELIVERABLE_GLOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOS + ' missing' };
    if (!c.includes('docs.iru.com')) return { pass: false, detail: 'GLOS01-N3 needle absent: docs.iru.com' };
    return { pass: true, detail: 'GLOS01-N3 needle present' };
  }
});

// === V-96-SLUG-GUARD: bare '### Kandji-Iru' heading intact ===
// Guard: the bare slug '#kandji-iru' (single hyphen) must survive -- any rename to
// '### Kandji / Iru' would produce '#kandji--iru' (double-hyphen) and break ~15 inbound links.
// Do NOT needle the '#vpp' definition (untouched by Phase 96; ~15 inbound links).
checks.push({
  id: 'SLUG-GUARD',
  name: "V-96-SLUG-GUARD: glossary contains bare '### Kandji-Iru' heading (slug #kandji-iru guard)",
  run() {
    const c = readFile(DELIVERABLE_GLOS);
    if (c === null) return { pass: false, detail: DELIVERABLE_GLOS + ' missing' };
    if (!c.includes('### Kandji-Iru')) return { pass: false, detail: "SLUG-GUARD: '### Kandji-Iru' heading absent -- slug drift risk" };
    return { pass: true, detail: "'### Kandji-Iru' heading present (slug #kandji-iru intact)" };
  }
});

// === V-96-VPP-ROW-GONE: NEGATIVE assertion -- '| VPP |' must be ABSENT from guide 00 ===
// Phase 96 removed the orphaned local VPP "Glossary Terms Used" table row from guide 00 (version
// history confirms: "removed orphaned VPP glossary quick-ref row"). This negative assertion
// confirms the removed row stays removed.
checks.push({
  id: 'VPP-ROW-GONE',
  name: "V-96-VPP-ROW-GONE: guide 00 does NOT contain '| VPP |' (removed VPP row stays removed)",
  run() {
    const c = readFile(DELIVERABLE_00);
    if (c === null) return { pass: false, detail: DELIVERABLE_00 + ' missing (cannot evaluate negative assertion)' };
    if (c.includes('| VPP |')) return { pass: false, detail: "VPP-ROW-GONE FAIL: '| VPP |' still present in guide 00 -- removed row was re-added" };
    return { pass: true, detail: "'| VPP |' absent from guide 00 (removed VPP row stays removed)" };
  }
});

// === V-96-SELF: dual-invariant guard (CHAIN_PHASES excludes 96; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-96-SELF: CHAIN_PHASES does NOT include 96; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(96)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 96 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (96 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-96 -- Phase 96 deliverables (Surgical Conflict Fixes -- ACC-01/02/04 + GLOS-01)\n');
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
