#!/usr/bin/env node
// check-phase-156.mjs -- Phase 156 deliverables (Style Extension -- Full Landing Verification)
//
// v1.22 CONTENT leaf, templated on check-phase-145.mjs (corpus-wide-negative + floor pattern) and
// check-phase-135.mjs (per-file substring-count needle shape). LIGHTWEIGHT base -- NO chain (the
// v1.22 apex owns the chain; this leaf is a standalone chain member). This leaf SPAWNS NOTHING
// (D-31, D-39) -- every assertion below is a static file read.
//
// ATTRIBUTION (D-31, D-35, D-65, 159-05-EVIDENCE.md Task 1): the corpus-wide zero on the literal,
// case-sensitive substring 'sign into' was re-measured at every one of the five boundary SHAs
// (8de413aa, ce9b0b73, 2a46d32a, bb22f89a, 937d0a1f) plus HEAD. Its transition from 1 to 0 lands
// strictly inside Phase 156's own window (2a46d32a -> bb22f89a, at 03d43070) and stays 0 at every
// later boundary through HEAD -- the two-part attribution proof D-31 requires. Case-INsensitive
// matching was tried first and rejected: it reports 1 at HEAD (a different, still-live phrase), which
// would make the needle unattributable and unfailable-in-the-right-direction; the literal
// case-sensitive substring is the only matcher that satisfies both proof halves. The four per-file
// 'administrator' counts (literal, case-sensitive, substring) were re-measured directly and match the
// recorded values exactly (10, 2, 15, 10); the case-insensitive and word-bounded readings the other
// two matchers give are recorded in 159-05-SUMMARY.md so a future reader cannot silently swap matchers.
//
// LIVE-VALUE CORRECTION (D-65): 159-CONTEXT.md D-35 states all three batch-10 tables carry ">= 1 data
// row." Re-measurement at execution time found scripts/docs-style/_DISPOSITIONS-batch10.tsv carries
// header comments only and ZERO data rows -- this is the file's genuinely correct current state (the
// tracer commit reported 0 deterministic findings across batch-10; 156-04-SUMMARY.md records dispositions
// accruing only as future findings surface). Pinning ">= 1 data row" against a file that is correctly
// empty would make this leaf permanently red for a reason unrelated to any regression. This leaf
// therefore pins PRESENCE ONLY for _DISPOSITIONS-batch10.tsv and keeps the ">= 1 data row" needle for
// the two tables that do carry rows (subs-batch10.tsv, subs-emdash-batch10.tsv). The delta against
// D-35's assumption is recorded here and in 159-05-SUMMARY.md.
//
// Assertion classes:
//   V-156-SIGNINTO         corpus-wide NEGATIVE: 'sign into' == 0 across docs/ (literal, case-
//                          sensitive, substring), with the corpus-floor sentinel
//   V-156-ADMIN-1..4       per-file exact 'administrator' counts (literal, case-sensitive, substring)
//                          in the two firmware/BIOS guides, the enterprise update plan recipe and the
//                          walk-up kiosk recipe
//   V-156-JUDGEVERDICT     _JUDGE-VERDICTS-batch10.json present, at its normalized byte length,
//                          containing its sibling-identification phrase
//   V-156-SUBSBATCH10      subs-batch10.tsv present with >= 1 data row
//   V-156-SUBSEMDASHBATCH10 subs-emdash-batch10.tsv present with >= 1 data row
//   V-156-DISPOSITIONSBATCH10 _DISPOSITIONS-batch10.tsv present (data-row count NOT asserted -- see
//                          LIVE-VALUE CORRECTION above)
//   V-156-SELF             CHAIN_PHASES does NOT include 156 AND CHAIN_SKIP is empty Set
//
// Usage: node scripts/validation/check-phase-156.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Recursive docs/ walker (structural copy of check-phase-145.mjs:57-76 walkMd).
function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  const results = [];
  function walk(current) {
    let entries;
    try { entries = readdirSync(current); } catch { return; }
    for (const entry of entries) {
      const full = join(current, entry);
      let stat;
      try { stat = lstatSync(full); } catch { continue; }
      if (stat.isSymbolicLink()) continue;
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}

// Lightweight: NO chain (chain lives only in the v1.22 apex).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const checks = [];

// === V-156-SIGNINTO: corpus-wide NEGATIVE, literal case-sensitive substring, with the floor ===
checks.push({
  id: 'SIGNINTO',
  name: "V-156-SIGNINTO: 'sign into' == 0 corpus-wide across docs/ (literal, case-sensitive, substring; phase 156, only site was recipes/06)",
  run() {
    // Corpus-floor sentinel (D-31, literal form echoed from check-phase-145.mjs:145).
    const files = walkMd('docs');
    if (files.length < 250) {
      return { pass: false, detail: 'docs/ walk found only ' + files.length + ' files (expected >= 250) -- treating as a missing-corpus null sentinel, not a vacuous pass' };
    }
    const offenders = [];
    let count = 0;
    for (const f of files) {
      let c;
      try { c = readFileSync(f, 'utf8'); } catch { continue; }
      const n = c.split('sign into').length - 1;
      if (n > 0) { count += n; offenders.push(f); }
    }
    if (count !== 0) {
      return { pass: false, detail: "'sign into' regression: " + count + ' occurrence(s) across ' + offenders.length + ' file(s): ' + offenders.slice(0, 5).join(', ') };
    }
    return { pass: true, detail: "0 occurrences of 'sign into' across " + files.length + ' docs/ files (measured: git grep -Fc -- "sign into" <sha> -- docs; phase 156 drove this to 0 at 03d43070)' };
  }
});

// === V-156-ADMIN-1..4: per-file exact 'administrator' counts (literal, case-sensitive, substring) ===
const PERFILE_ADMIN = [
  ['docs/operations/firmware-bios/01-windows-dfci.md', 10],
  ['docs/operations/firmware-bios/02-dell-bios-configuration.md', 2],
  ['docs/recipes/05-enterprise-update-plan.md', 15],
  ['docs/recipes/06-walk-up-avd-kiosk-autologon.md', 10],
];
let n = 0;
for (const [path, expected] of PERFILE_ADMIN) {
  n++;
  checks.push({
    id: 'ADMIN-' + n,
    name: 'V-156-ADMIN-' + n + ': ' + path + " carries exactly " + expected + " occurrence(s) of 'administrator' (literal, case-sensitive, substring -- NOT case-insensitive, NOT word-bounded)",
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      const count = c.split('administrator').length - 1;
      if (count !== expected) {
        return { pass: false, detail: 'ADMIN-' + n + ' drift: expected ' + expected + ', got ' + count + ' in ' + path };
      }
      return { pass: true, detail: path + ' carries exactly ' + count + " occurrence(s) of 'administrator' (literal, case-sensitive, substring)" };
    }
  });
}

// === V-156-JUDGEVERDICT: presence, normalized byte length, sibling-identification phrase ===
const JUDGE_VERDICT = 'scripts/docs-style/_JUDGE-VERDICTS-batch10.json';
const EXPECTED_NORMALIZED_LENGTH = 3590;
const SIBLING_PHRASE = 'Phase 156 batch-10 sibling of _JUDGE-VERDICTS.json';
checks.push({
  id: 'JUDGEVERDICT',
  name: 'V-156-JUDGEVERDICT: ' + JUDGE_VERDICT + ' present, ' + EXPECTED_NORMALIZED_LENGTH + ' bytes after CRLF normalization, contains its sibling-identification phrase',
  run() {
    const c = readFile(JUDGE_VERDICT);
    if (c === null) return { pass: false, detail: JUDGE_VERDICT + ' missing' };
    const normalizedLength = Buffer.byteLength(c, 'utf8');
    if (normalizedLength !== EXPECTED_NORMALIZED_LENGTH) {
      return { pass: false, detail: 'JUDGEVERDICT drift: normalized length is ' + normalizedLength + ' bytes, expected ' + EXPECTED_NORMALIZED_LENGTH };
    }
    if (!c.includes(SIBLING_PHRASE)) {
      return { pass: false, detail: 'JUDGEVERDICT needle absent: sibling-identification phrase not found' };
    }
    const newlineCount = (c.match(/\n/g) || []).length;
    const hypotheticalCrlfLength = normalizedLength + newlineCount;
    return { pass: true, detail: JUDGE_VERDICT + ' present, normalized length ' + normalizedLength + ' bytes (a converted-line-ending checkout would read ' + hypotheticalCrlfLength + ' bytes), sibling-identification phrase present' };
  }
});

// === V-156-SUBSBATCH10 / V-156-SUBSEMDASHBATCH10: present with >= 1 data row ===
function tableWithDataRow(id, path) {
  return {
    id,
    name: 'V-156-' + id + ': ' + path + ' present with >= 1 data row',
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      const dataRows = c.split('\n').filter((l) => l.trim().length > 0 && !l.trim().startsWith('#')).length;
      if (dataRows < 1) {
        return { pass: false, detail: path + ' carries 0 data rows (expected >= 1)' };
      }
      return { pass: true, detail: path + ' present with ' + dataRows + ' data row(s)' };
    }
  };
}
checks.push(tableWithDataRow('SUBSBATCH10', 'scripts/docs-style/subs-batch10.tsv'));
checks.push(tableWithDataRow('SUBSEMDASHBATCH10', 'scripts/docs-style/subs-emdash-batch10.tsv'));

// === V-156-DISPOSITIONSBATCH10: present only (see LIVE-VALUE CORRECTION above) ===
const DISPOSITIONS_BATCH10 = 'scripts/docs-style/_DISPOSITIONS-batch10.tsv';
checks.push({
  id: 'DISPOSITIONSBATCH10',
  name: 'V-156-DISPOSITIONSBATCH10: ' + DISPOSITIONS_BATCH10 + ' present (data-row count not asserted -- correctly 0 rows at authoring time, see header note)',
  run() {
    const c = readFile(DISPOSITIONS_BATCH10);
    if (c === null) return { pass: false, detail: DISPOSITIONS_BATCH10 + ' missing' };
    return { pass: true, detail: DISPOSITIONS_BATCH10 + ' present (' + c.length + ' bytes; 0 data rows is its correct current state per 156-04-SUMMARY.md)' };
  }
});

// === V-156-SELF: dual-invariant guard (CHAIN_PHASES excludes 156; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-156-SELF: CHAIN_PHASES does NOT include 156; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(156)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 156 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (156 absent, standalone chain member); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-145.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-156 -- Phase 156 deliverables (Style Extension -- Full Landing Verification)\n');
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
