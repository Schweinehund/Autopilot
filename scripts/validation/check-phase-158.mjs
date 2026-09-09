#!/usr/bin/env node
// check-phase-158.mjs -- Phase 158 deliverables (Final Corpus Verification & Publish Bundle)
//
// v1.22 CONTENT leaf, templated on check-phase-157.mjs / check-phase-154.mjs (the content-leaf
// family) and check-phase-143.mjs (the argument-array spawn idiom, the ENOENT/127/"not found"
// skip classifier, and the hard non-skipping presence check paired with it). LIGHTWEIGHT base --
// NO chain (the v1.22 apex owns the chain; this leaf is a standalone chain member).
//
// SPAWN CEILING (D-39): this is the THIRD and LAST of the three spawns permitted across all five
// leaves (154's verify-meaning.py --self-test, 157's prose-style gate full run + self-test, and
// this leaf's audit-claimed-fixes.mjs --self-test). Total spawns across the five leaves: 3.
//
// ATTRIBUTION (D-37, 159-EVIDENCE.md §16): every needle below was re-measured at execution time
// against the live corpus and against 158's own window (937d0a1f..HEAD). All five candidates
// transition from 0 to their pinned value strictly inside that window.
//
// OPEN REVIEW FINDINGS CARRIED, NOT FIXED (D-43): 158-REVIEW.md records three findings on
// audit-claimed-fixes.mjs -- CR-01 (a vacuity-guard false FAIL for a row whose sole assertion is
// an explicitly-zero-expected op), WR-01 (unguarded top-level CLI dispatch on import), and WR-02
// (--drift mode has zero self-test coverage). All three carry to v1.22-DEFERRED-CLEANUP.md Part A
// and are NOT fixed here. CR-01 does not affect either property this leaf pins: presence, and the
// existing --self-test's four cases (a/b/c/d), none of which constructs a row whose sole assertion
// is one of the three zero-on-success ops CR-01 names -- the self-test's own four assertions pass
// today regardless of CR-01, and this leaf's V-158-AUDITCF-SELF check spawns exactly that
// unmodified self-test.
//
// NOT PINNABLE (D-37): no em-dash count (a large population of spaced em dashes remains inside
// protected spans, so no count is stable); the bare "via apt" phrase (its one remaining occurrence
// at docs/reference/linux-capability-matrix.md:112 sits inside a citation-blocked technical-
// accuracy table cell); any archive, manifest, runner or pin total (all are build-run artifacts,
// not corpus state).
//
// Assertion classes:
//   V-158-PERFILE-1..2    'using apt and unattended-upgrades' occurs exactly once each in
//                         docs/index.md and docs/operations/00-index.md
//   V-158-GLOSSARYANCHOR  '#reboot-handling' occurs in docs/_glossary-linux.md
//   V-158-STDSUBSTRING-1  the corpus-scope sentence is present in the standard document
//   V-158-STDSUBSTRING-2  the falsified-claim correction sentence is present in the standard
//                         document (D-05's point-in-time identity claim, corrected)
//   V-158-AUDITCF-TOOL    scripts/docs-style/audit-claimed-fixes.mjs exists (hard check, never
//                         skipped) -- the third and last of the three permitted spawns is paired
//                         with this fail-loud presence assertion
//   V-158-AUDITCF-SELF    audit-claimed-fixes.mjs --self-test is spawned (argument-array form)
//                         and exits 0
//   V-158-DISPOSITIONS-1  scripts/docs-style/_DISPOSITIONS-158.tsv present with >= 1 data row
//   V-158-DISPOSITIONS-2  scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv present with >= 1 data row
//   V-158-JUDGEVERDICTS   scripts/docs-style/_JUDGE-VERDICTS-158.json present (presence only)
//   V-158-FIXAUDIT        scripts/docs-style/158-FIX-AUDIT.json present (presence only -- this
//                         file carries branch-only SHAs whose CONTENT must never become a needle)
//   V-158-SELF            CHAIN_PHASES does NOT include 158 AND CHAIN_SKIP is empty Set
//
// Usage: node scripts/validation/check-phase-158.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import cp from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Established skip classifier (quoted in shape from check-phase-143.mjs:95-97, reused verbatim by
// check-phase-157.mjs): a missing RUNTIME is a legitimate SKIP. A missing TOOL FILE is never
// laundered through this classifier -- it is caught, hard, by the separate V-158-AUDITCF-TOOL
// presence check below, which never skips.
function isMissingRuntime(err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  return err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
}

function exactCount(id, path, needle, expected) {
  return {
    id,
    name: 'V-158-' + id + ': ' + path + ' contains "' + needle + '" exactly ' + expected + ' time(s)',
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      const count = c.split(needle).length - 1;
      if (count !== expected) {
        return { pass: false, detail: id + ' drift: expected ' + expected + ', got ' + count + ' in ' + path };
      }
      return { pass: true, detail: path + ' contains "' + needle + '" exactly ' + count + ' time(s)' };
    }
  };
}

const checks = [];

// === V-158-PERFILE-1..2: platform update-delivery phrase, one occurrence in each of two files ===
// Both moved from 0 to 1 strictly inside Phase 158's window (937d0a1f..HEAD) -- see 159-EVIDENCE.md.
checks.push(exactCount('PERFILE-1', 'docs/index.md', 'using apt and unattended-upgrades', 1));
checks.push(exactCount('PERFILE-2', 'docs/operations/00-index.md', 'using apt and unattended-upgrades', 1));

// === V-158-GLOSSARYANCHOR: platform glossary contains the reboot-handling anchor substring ===
const GLOSSARY_LINUX = 'docs/_glossary-linux.md';
const REBOOT_ANCHOR = '#reboot-handling';
checks.push({
  id: 'GLOSSARYANCHOR',
  name: 'V-158-GLOSSARYANCHOR: ' + GLOSSARY_LINUX + " contains '" + REBOOT_ANCHOR + "'",
  run() {
    const c = readFile(GLOSSARY_LINUX);
    if (c === null) return { pass: false, detail: GLOSSARY_LINUX + ' missing' };
    if (!c.includes(REBOOT_ANCHOR)) {
      return { pass: false, detail: 'GLOSSARYANCHOR needle absent: ' + REBOOT_ANCHOR + ' not found in ' + GLOSSARY_LINUX };
    }
    return { pass: true, detail: GLOSSARY_LINUX + " contains '" + REBOOT_ANCHOR + "'" };
  }
});

// === V-158-STDSUBSTRING-1/2: two standard-document content substrings ===
const STANDARD_DOC = 'docs/_standards/EEE-SOP-standard.md';
checks.push({
  id: 'STDSUBSTRING-1',
  name: 'V-158-STDSUBSTRING-1: ' + STANDARD_DOC + ' contains the corpus-scope sentence',
  run() {
    const c = readFile(STANDARD_DOC);
    if (c === null) return { pass: false, detail: STANDARD_DOC + ' missing' };
    const needle = 'governs the whole tracked documentation corpus the mechanical gate scans';
    if (!c.includes(needle)) {
      return { pass: false, detail: 'STDSUBSTRING-1 needle absent: corpus-scope sentence not found in ' + STANDARD_DOC };
    }
    return { pass: true, detail: STANDARD_DOC + ' contains the corpus-scope sentence' };
  }
});
checks.push({
  id: 'STDSUBSTRING-2',
  name: 'V-158-STDSUBSTRING-2: ' + STANDARD_DOC + " records the correction of D-05's falsified point-in-time identity claim",
  run() {
    const c = readFile(STANDARD_DOC);
    if (c === null) return { pass: false, detail: STANDARD_DOC + ' missing' };
    const needle = "corrected D-05's falsified point-in-time identity claim";
    if (!c.includes(needle)) {
      return { pass: false, detail: 'STDSUBSTRING-2 needle absent: correction sentence not found in ' + STANDARD_DOC };
    }
    return { pass: true, detail: STANDARD_DOC + " records the correction of D-05's falsified point-in-time identity claim" };
  }
});

// === V-158-AUDITCF-TOOL: the claimed-fix auditor exists (hard check, never skipped) ===
const AUDIT_CF = 'scripts/docs-style/audit-claimed-fixes.mjs';
checks.push({
  id: 'AUDITCF-TOOL',
  name: 'V-158-AUDITCF-TOOL: ' + AUDIT_CF + ' exists and is non-empty (hard check)',
  run() {
    const c = readFile(AUDIT_CF);
    if (c === null) return { pass: false, detail: AUDIT_CF + ' missing -- tool absent' };
    if (c.trim().length === 0) return { pass: false, detail: AUDIT_CF + ' is empty' };
    return { pass: true, detail: AUDIT_CF + ' present (' + c.length + ' bytes)' };
  }
});

// === V-158-AUDITCF-SELF: --self-test spawned (argument-array form), exits 0 ===
// Third and last of the three permitted spawns across all five leaves (D-39). Paired with
// V-158-AUDITCF-TOOL above: this check never gracefully skips on tool absence -- that case is
// already reported as a hard FAIL by the presence check. CR-01 (158-REVIEW.md) does not affect
// this check: none of the self-test's four existing cases constructs a row whose sole assertion is
// one of the three zero-on-success ops CR-01 names, so the self-test's own four assertions are
// unaffected by that open finding.
checks.push({
  id: 'AUDITCF-SELF',
  name: 'V-158-AUDITCF-SELF: node ' + AUDIT_CF + ' --self-test exits 0',
  run() {
    if (!existsSync(join(process.cwd(), AUDIT_CF))) {
      return { pass: true, skipped: true, detail: AUDIT_CF + ' not present (graceful skip; V-158-AUDITCF-TOOL reports this as a hard FAIL separately)' };
    }
    try {
      const stdout = cp.execFileSync('node', [AUDIT_CF, '--self-test'], { stdio: 'pipe', timeout: 600000, cwd: process.cwd() }).toString();
      if (!/\d+ passed, 0 failed/.test(stdout)) {
        return { pass: false, detail: 'AUDITCF-SELF regression: passed-count summary not found in --self-test output' };
      }
      return { pass: true, detail: '--self-test exits 0, passed-count summary present' };
    } catch (err) {
      if (isMissingRuntime(err)) return { pass: true, skipped: true, detail: 'node runtime not found -- skipped (distinguished from tool absence, which V-158-AUDITCF-TOOL asserts separately)' };
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      return { pass: false, detail: 'AUDITCF-SELF FAIL: ' + (stderr || stdout).slice(0, 500) };
    }
  }
});

// === V-158-DISPOSITIONS-1/2: two disposition tables present with >= 1 data row each ===
function dispositionsPresence(id, path) {
  return {
    id,
    name: 'V-158-' + id + ': ' + path + ' present with >= 1 data row',
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
checks.push(dispositionsPresence('DISPOSITIONS-1', 'scripts/docs-style/_DISPOSITIONS-158.tsv'));
checks.push(dispositionsPresence('DISPOSITIONS-2', 'scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv'));

// === V-158-JUDGEVERDICTS / V-158-FIXAUDIT: presence only ===
// 158-FIX-AUDIT.json carries branch-only SHAs (commit identifiers from the working branch, not
// yet on any shared history) -- its CONTENT must never become a needle; only its presence is
// asserted here.
function presenceOnly(id, path, note) {
  return {
    id,
    name: 'V-158-' + id + ': ' + path + ' present' + (note ? ' (' + note + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  };
}
checks.push(presenceOnly('JUDGEVERDICTS', 'scripts/docs-style/_JUDGE-VERDICTS-158.json'));
checks.push(presenceOnly('FIXAUDIT', 'scripts/docs-style/158-FIX-AUDIT.json', 'presence only -- carries branch-only SHAs, never a needle'));

// === V-158-SELF: dual-invariant guard (CHAIN_PHASES excludes 158; CHAIN_SKIP empty) ===
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
checks.push({
  id: 'SELF',
  name: 'V-158-SELF: CHAIN_PHASES does NOT include 158; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(158)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 158 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (158 absent, standalone chain member); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-157.mjs / check-phase-154.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-158 -- Phase 158 deliverables (Final Corpus Verification & Publish Bundle)\n');
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
