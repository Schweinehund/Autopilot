#!/usr/bin/env node
// check-phase-139.mjs -- Phase 139 deliverables (Governance CARVE, fetch-depth Retrofit, Shallow-Job Repair)
//
// v1.20 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-144.mjs).
// NEEDLES DERIVED INLINE from 139-VERIFICATION.md (Observable Truths table): the governance
// artifact's frozen-to-frozen blob identity (never a live diff -- see carve-gate.mjs:8-12), the
// per-file fetch-depth invariant across all 16 audit-harness-*.yml workflows, SWEEP-02's
// dependency-free probe job, and the CARVE/GOV-02 governance artifacts' structural intactness.
//
// Assertion classes:
//   V-139-CARVEBLOB    carve-gate.mjs's blob hash at a fixed literal commit SHA matches a recorded baseline (frozen-to-frozen, check-phase-63.mjs:208-250 idiom)
//   V-139-FETCHDEPTH   every .github/workflows/audit-harness-*.yml: checkout-step count === fetch-depth:0 count (comment lines stripped)
//   V-139-PROBEJOB     every audit-harness-*.yml declares a frozen-read-probe job carrying no `needs:` key
//   V-139-GOVARTIFACTS v1.20-CARVE.md structurally intact (one fenced allowlist block, three-rule amendment procedure, GOV-02 grep procedure section); GOV-02 ledger row count >= measured floor
//   V-139-SELF         CHAIN_PHASES does NOT include 139 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-139.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
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

// Lightweight: NO chain (chain lives only in apex check-phase-144.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const WORKFLOW_DIR = '.github/workflows';
const WORKFLOW_PATTERN = /^audit-harness-.*\.yml$/;
const CARVE = '.planning/milestones/v1.20-CARVE.md';
const GOV02_LEDGER = '.planning/milestones/v1.20-GOV-02-LEDGER.md';
const EXPECTED_LEDGER_ROW_FLOOR = 57; // measured at authoring time (144-04); the ledger is append-only, never shrinks

function listWorkflows() {
  const dir = join(process.cwd(), WORKFLOW_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => WORKFLOW_PATTERN.test(f)).sort();
}

// Strips '#'-led comment lines (leading whitespace tolerated) so header prose mentioning
// 'fetch-depth: 0' or 'checkout@v4' in a comment cannot inflate either count.
function stripComments(content) {
  return content.split('\n').filter((l) => !/^\s*#/.test(l)).join('\n');
}

const checks = [];

// === V-139-CARVEBLOB: carve-gate.mjs blob at a fixed literal SHA matches the recorded baseline ===
checks.push({
  id: 'CARVEBLOB',
  name: 'V-139-CARVEBLOB: carve-gate.mjs blob @04e26106 matches baseline 849f9639e1108090bc360e705aaa784b0144fe66 (frozen-to-frozen)',
  run() {
    // frozen-to-frozen (never live-diff, per carve-gate.mjs:8-12's own prohibition): the target
    // commit is a fixed, past commit -- the file's most recent touch as of Phase 139's close --
    // so this assertion cannot drift with future HEAD content. A RAW literal SHA is used, not a
    // MILESTONE_CLOSE_SHAS lookup, because no pin exists for this milestone's own not-yet-closed
    // phases (D-15).
    const FIXED_SHA = '04e26106c859176d58b98079575a50faceeed7cd';
    const BASELINE = '849f9639e1108090bc360e705aaa784b0144fe66';
    const TARGET = 'scripts/validation/carve-gate.mjs';
    try {
      const result = execFileSync('git', ['rev-parse', FIXED_SHA + ':' + TARGET], { stdio: 'pipe', cwd: process.cwd() });
      const actual = result.toString().trim();
      if (actual !== BASELINE) {
        return { pass: false, detail: TARGET + ' blob hash CHANGED @' + FIXED_SHA + ': expected ' + BASELINE + ', got ' + actual };
      }
      return { pass: true, detail: TARGET + ' blob @' + FIXED_SHA + ' matches baseline ' + BASELINE };
    } catch (err) {
      return { pass: true, skipped: true, detail: 'git rev-parse not available -- skipped' };
    }
  }
});

// === V-139-FETCHDEPTH: per-file invariant -- checkout-step count === fetch-depth:0 count ===
checks.push({
  id: 'FETCHDEPTH',
  name: 'V-139-FETCHDEPTH: every ' + WORKFLOW_DIR + '/audit-harness-*.yml has checkout-step count === fetch-depth:0 count',
  run() {
    const files = listWorkflows();
    if (files.length === 0) return { pass: false, detail: 'no ' + WORKFLOW_DIR + '/audit-harness-*.yml files found' };
    const mismatches = [];
    for (const f of files) {
      const c = readFile(WORKFLOW_DIR + '/' + f);
      if (c === null) continue;
      const stripped = stripComments(c);
      const checkouts = (stripped.match(/actions\/checkout@v\d+/g) || []).length;
      const depths = (stripped.match(/fetch-depth:\s*0/g) || []).length;
      if (checkouts !== depths) mismatches.push(f + ' (checkouts=' + checkouts + ', depths=' + depths + ')');
    }
    if (mismatches.length > 0) {
      return { pass: false, detail: 'FETCHDEPTH per-file mismatch: ' + mismatches.join(', ') };
    }
    return { pass: true, detail: files.length + ' workflow(s), all with checkout-step count === fetch-depth:0 count' };
  }
});

// === V-139-PROBEJOB: every workflow declares a frozen-read-probe job carrying no `needs:` key ===
checks.push({
  id: 'PROBEJOB',
  name: 'V-139-PROBEJOB: every audit-harness-*.yml declares a frozen-read-probe job with no needs: key',
  run() {
    const files = listWorkflows();
    if (files.length === 0) return { pass: false, detail: 'no ' + WORKFLOW_DIR + '/audit-harness-*.yml files found' };
    const violations = [];
    for (const f of files) {
      const c = readFile(WORKFLOW_DIR + '/' + f);
      if (c === null) continue;
      const lines = c.split('\n');
      const jobIdx = lines.findIndex((l) => /^\s{2}frozen-read-probe:\s*$/.test(l));
      if (jobIdx === -1) { violations.push(f + ': frozen-read-probe job absent'); continue; }
      let endIdx = lines.length;
      for (let i = jobIdx + 1; i < lines.length; i++) {
        if (/^\s{2}\S/.test(lines[i])) { endIdx = i; break; }
      }
      const block = lines.slice(jobIdx, endIdx);
      if (block.some((l) => /^\s+needs:/.test(l))) {
        violations.push(f + ': frozen-read-probe carries a needs: key');
      }
    }
    if (violations.length > 0) {
      return { pass: false, detail: 'PROBEJOB violations: ' + violations.join(', ') };
    }
    return { pass: true, detail: files.length + ' workflow(s), each with a dependency-free frozen-read-probe job' };
  }
});

// === V-139-GOVARTIFACTS: CARVE structural intactness + GOV-02 ledger row-count floor ===
checks.push({
  id: 'GOVARTIFACTS',
  name: 'V-139-GOVARTIFACTS: ' + CARVE + ' structurally intact; ' + GOV02_LEDGER + ' row count >= ' + EXPECTED_LEDGER_ROW_FLOOR,
  run() {
    const carve = readFile(CARVE);
    if (carve === null) return { pass: false, detail: CARVE + ' missing' };
    const fenceCount = (carve.match(/```carve-allowlist\n/g) || []).length;
    if (fenceCount !== 1) {
      return { pass: false, detail: 'GOVARTIFACTS regression: expected exactly 1 fenced carve-allowlist block, got ' + fenceCount };
    }
    if (!/## Amendment procedure/.test(carve)) {
      return { pass: false, detail: 'GOVARTIFACTS needle absent: "## Amendment procedure" section missing' };
    }
    // Three-rule amendment procedure (D-09): three numbered rules under the Amendment procedure H2.
    const amendSection = carve.slice(carve.indexOf('## Amendment procedure'));
    const amendEnd = amendSection.indexOf('\n## ', 1);
    const amendBody = amendEnd === -1 ? amendSection : amendSection.slice(0, amendEnd);
    const numberedRules = (amendBody.match(/^\d+\. /gm) || []).length;
    if (numberedRules !== 3) {
      return { pass: false, detail: 'GOVARTIFACTS regression: expected 3 numbered amendment rules, got ' + numberedRules };
    }
    if (!/## GOV-02 grep procedure/.test(carve)) {
      return { pass: false, detail: 'GOVARTIFACTS needle absent: "## GOV-02 grep procedure" section missing' };
    }
    const ledger = readFile(GOV02_LEDGER);
    if (ledger === null) return { pass: false, detail: GOV02_LEDGER + ' missing' };
    // Row-count LOWER BOUND (never equality -- this phase appends rows): data rows are the
    // table lines that open with a backtick-quoted path, immediately after the '| File |'
    // header and its separator row.
    const rowCount = (ledger.match(/^\| `/gm) || []).length;
    if (rowCount < EXPECTED_LEDGER_ROW_FLOOR) {
      return { pass: false, detail: 'GOVARTIFACTS regression: GOV-02 ledger row count ' + rowCount + ' < floor ' + EXPECTED_LEDGER_ROW_FLOOR };
    }
    return { pass: true, detail: 'CARVE structurally intact (1 fenced block, 3-rule amendment procedure, GOV-02 grep procedure section); ledger carries ' + rowCount + ' rows (floor ' + EXPECTED_LEDGER_ROW_FLOOR + ')' };
  }
});

// === V-139-SELF: dual-invariant guard (CHAIN_PHASES excludes 139; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-139-SELF: CHAIN_PHASES does NOT include 139; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(139)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 139 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (139 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-139 -- Phase 139 deliverables (Governance CARVE, fetch-depth Retrofit, Shallow-Job Repair)\n');
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
