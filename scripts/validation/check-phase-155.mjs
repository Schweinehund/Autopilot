#!/usr/bin/env node
// check-phase-155.mjs -- Phase 155 deliverables (Recipe #6 -- Walk-Up AVD Kiosk Formalization, RE-237)
//
// v1.22 CONTENT leaf, templated on check-phase-135.mjs (the recipe-content-leaf family). LIGHTWEIGHT
// base -- NO chain (the v1.22 apex owns the chain; this leaf is a standalone chain member). This leaf
// SPAWNS NOTHING (D-31, D-39) -- every assertion below is a static file read.
//
// ATTRIBUTION (D-31, D-34, D-65, 159-05-EVIDENCE.md Task 1): every needle was re-measured directly
// against the live corpus rather than carried from 159-CONTEXT.md. The two asset script pairs were
// re-hashed at execution time by direct byte comparison and match the recorded values exactly
// (d7287e76, d79c9780). This leaf pins the two V-135-RECIPE retirement content needles as source
// substrings inside check-phase-135.mjs because that retirement (RE-222/RE-224 unsupported-callout
// language) is one of Phase 155's own four scripts/ deliverables, not a documentation change --
// check-phase-135.mjs itself is verified separately to exit 0 with 0 FAIL by this plan's own
// <verification> block, never by a spawn from this leaf.
//
// Assertion classes:
//   V-155-PROVENANCE   '## Asset Provenance' occurs exactly once in the recipe
//   V-155-CONTENT      the seven content substrings (shell-launcher policy path, three auto-logoff
//                       settings, licensing error phrase, its numeric error code, deployment script
//                       name) are all present in the recipe
//   V-155-REGISTRY      exactly one row in RE-index.md matching '| RE-237 |', containing the recipe
//                       path and 'Approved'
//   V-155-HUBWIRING      four named hub files each contain the recipe's filename
//   V-155-LICENSING      the licensing matrix contains its subscription-activation phrase
//   V-155-NOTICE         the asset NOTICE file is present
//   V-155-ASSETPAIR-OEMBLOAT    Remove-KioskOemBloat.ps1 byte-identical between its packaged and
//                                remediation locations, both containing SupportsShouldProcess
//   V-155-ASSETPAIR-RUNTASKS    Remove-KioskRunTasks.ps1 byte-identical between its packaged and
//                                remediation locations, both containing SupportsShouldProcess
//   V-155-RETIREMENT     check-phase-135.mjs contains the two V-135-RECIPE retirement content
//                         needles as source substrings
//   V-155-SELF            CHAIN_PHASES does NOT include 155 AND CHAIN_SKIP is empty Set
//
// Usage: node scripts/validation/check-phase-155.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in the v1.22 apex).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const RECIPE = 'docs/recipes/06-walk-up-avd-kiosk-autologon.md';
const RE_INDEX = 'docs/_registry/RE-index.md';
const HUB_FILES = [
  'docs/index.md',
  'docs/recipes/01-shared-windows-avd-client.md',
  'docs/recipes/03-windows-11-multi-app-kiosk.md',
  'docs/reference/licensing-matrix.md',
];
const LICENSING_MATRIX = 'docs/reference/licensing-matrix.md';
const RECIPE_FILENAME = '06-walk-up-avd-kiosk-autologon.md';
const NOTICE = 'assets/recipes/06-walk-up-avd-kiosk/NOTICE';
const CHECK_135 = 'scripts/validation/check-phase-135.mjs';

const checks = [];

// === V-155-PROVENANCE: '## Asset Provenance' occurs exactly once ===
checks.push({
  id: 'PROVENANCE',
  name: "V-155-PROVENANCE: '## Asset Provenance' occurs exactly once in " + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const count = c.split('## Asset Provenance').length - 1;
    if (count !== 1) {
      return { pass: false, detail: 'PROVENANCE drift: expected exactly 1 occurrence, got ' + count };
    }
    return { pass: true, detail: "'## Asset Provenance' occurs exactly once" };
  }
});

// === V-155-CONTENT: the seven content substrings ===
const CONTENT_SUBSTRINGS = [
  './Device/Vendor/MSFT/AssignedAccess/ShellLauncher',
  'AutoLogoffEnable',
  'AutoLogoffTimeInterval',
  'AutoLogoffOnSuccessfulConnect',
  'Class is not licensed for use',
  '-2016281112',
  'Deploy-WindowsApp.ps1',
];
checks.push({
  id: 'CONTENT',
  name: 'V-155-CONTENT: all seven content substrings present in ' + RECIPE,
  run() {
    const c = readFile(RECIPE);
    if (c === null) return { pass: false, detail: RECIPE + ' missing' };
    const missing = CONTENT_SUBSTRINGS.filter((s) => !c.includes(s));
    if (missing.length > 0) {
      return { pass: false, detail: 'CONTENT needle(s) absent: ' + missing.map((s) => "'" + s + "'").join(', ') };
    }
    return { pass: true, detail: 'all seven content substrings present verbatim' };
  }
});

// === V-155-REGISTRY: exactly one row matching '| RE-237 |', containing path and 'Approved' ===
checks.push({
  id: 'REGISTRY',
  name: "V-155-REGISTRY: exactly one row in " + RE_INDEX + " matches '| RE-237 |', containing the recipe path and 'Approved'",
  run() {
    const c = readFile(RE_INDEX);
    if (c === null) return { pass: false, detail: RE_INDEX + ' missing' };
    const matches = c.split('\n').filter((l) => l.includes('| RE-237 |'));
    if (matches.length !== 1) {
      return { pass: false, detail: 'REGISTRY drift: expected exactly 1 row matching \'| RE-237 |\', got ' + matches.length };
    }
    const row = matches[0];
    if (!row.includes(RECIPE_FILENAME)) {
      return { pass: false, detail: 'REGISTRY needle absent: RE-237 row does not contain the recipe path' };
    }
    if (!row.includes('Approved')) {
      return { pass: false, detail: 'REGISTRY needle absent: RE-237 row does not contain \'Approved\'' };
    }
    return { pass: true, detail: 'exactly one RE-237 row, containing the recipe path and Approved status' };
  }
});

// === V-155-HUBWIRING: four named hub files each contain the recipe's filename ===
checks.push({
  id: 'HUBWIRING',
  name: 'V-155-HUBWIRING: ' + HUB_FILES.length + ' named hub files each contain ' + RECIPE_FILENAME,
  run() {
    const missing = [];
    for (const f of HUB_FILES) {
      const c = readFile(f);
      if (c === null) { missing.push(f + ' (missing)'); continue; }
      if (!c.includes(RECIPE_FILENAME)) missing.push(f + ' (filename absent)');
    }
    if (missing.length > 0) {
      return { pass: false, detail: 'HUBWIRING regression: ' + missing.join(', ') };
    }
    return { pass: true, detail: 'all ' + HUB_FILES.length + ' hub files contain ' + RECIPE_FILENAME };
  }
});

// === V-155-LICENSING: the licensing matrix contains its subscription-activation phrase ===
const LICENSING_PHRASE = 'no Windows Subscription Activation';
checks.push({
  id: 'LICENSING',
  name: 'V-155-LICENSING: ' + LICENSING_MATRIX + " contains '" + LICENSING_PHRASE + "'",
  run() {
    const c = readFile(LICENSING_MATRIX);
    if (c === null) return { pass: false, detail: LICENSING_MATRIX + ' missing' };
    if (!c.includes(LICENSING_PHRASE)) {
      return { pass: false, detail: 'LICENSING needle absent: phrase not found in ' + LICENSING_MATRIX };
    }
    return { pass: true, detail: LICENSING_MATRIX + ' contains the subscription-activation phrase' };
  }
});

// === V-155-NOTICE: the asset NOTICE file is present ===
checks.push({
  id: 'NOTICE',
  name: 'V-155-NOTICE: ' + NOTICE + ' is present',
  run() {
    if (!existsSync(join(process.cwd(), NOTICE))) {
      return { pass: false, detail: NOTICE + ' missing' };
    }
    return { pass: true, detail: NOTICE + ' present' };
  }
});

// === V-155-ASSETPAIR-*: byte-identical script pairs, each containing SupportsShouldProcess ===
const ASSET_PAIRS = [
  ['OEMBLOAT', 'Remove-KioskOemBloat.ps1',
    'assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskOemBloat.ps1',
    'assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Remove-KioskOemBloat.ps1'],
  ['RUNTASKS', 'Remove-KioskRunTasks.ps1',
    'assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskRunTasks.ps1',
    'assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1'],
];
for (const [id, name, a, b] of ASSET_PAIRS) {
  checks.push({
    id: 'ASSETPAIR-' + id,
    name: 'V-155-ASSETPAIR-' + id + ': ' + name + ' byte-identical between packaged and remediation locations, both contain SupportsShouldProcess',
    run() {
      const rawA = existsSync(join(process.cwd(), a)) ? readFileSync(join(process.cwd(), a)) : null;
      const rawB = existsSync(join(process.cwd(), b)) ? readFileSync(join(process.cwd(), b)) : null;
      if (rawA === null) return { pass: false, detail: a + ' missing' };
      if (rawB === null) return { pass: false, detail: b + ' missing' };
      if (!rawA.equals(rawB)) {
        return { pass: false, detail: 'ASSETPAIR-' + id + ' drift: ' + a + ' and ' + b + ' are no longer byte-identical' };
      }
      const text = rawA.toString('utf8');
      if (!text.includes('SupportsShouldProcess')) {
        return { pass: false, detail: 'ASSETPAIR-' + id + ' regression: SupportsShouldProcess attribute absent' };
      }
      return { pass: true, detail: name + ' byte-identical (' + rawA.length + ' bytes) between both locations, SupportsShouldProcess present' };
    }
  });
}

// === V-155-RETIREMENT: check-phase-135.mjs contains the two retirement content needles ===
const RETIREMENT_NEEDLES = [
  '## Unsupported and Anti-Feature Callouts',
  './Vendor/MSFT/AssignedAccess/Configuration',
];
checks.push({
  id: 'RETIREMENT',
  name: 'V-155-RETIREMENT: ' + CHECK_135 + ' contains the two V-135-RECIPE retirement content needles as source substrings',
  run() {
    const c = readFile(CHECK_135);
    if (c === null) return { pass: false, detail: CHECK_135 + ' missing' };
    const missing = RETIREMENT_NEEDLES.filter((s) => !c.includes(s));
    if (missing.length > 0) {
      return { pass: false, detail: 'RETIREMENT needle(s) absent from ' + CHECK_135 + ': ' + missing.map((s) => "'" + s + "'").join(', ') };
    }
    return { pass: true, detail: CHECK_135 + ' contains both retirement content needles as source substrings' };
  }
});

// === V-155-SELF: dual-invariant guard (CHAIN_PHASES excludes 155; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-155-SELF: CHAIN_PHASES does NOT include 155; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(155)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 155 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (155 absent, standalone chain member); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-135.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-155 -- Phase 155 deliverables (Recipe #6 -- Walk-Up AVD Kiosk Formalization, RE-237)\n');
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
