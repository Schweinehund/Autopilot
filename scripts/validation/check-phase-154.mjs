#!/usr/bin/env node
// check-phase-154.mjs -- Phase 154 deliverables (Google-Style Corpus Landing & Authoring-Standard Adoption)
//
// v1.22 CONTENT leaf, templated on check-phase-145.mjs (the content-leaf family) and
// check-phase-143.mjs (the argument-array spawn idiom paired with a fail-loud presence assertion).
// LIGHTWEIGHT base -- NO chain (the v1.22 apex owns the chain; this leaf is a standalone chain member).
//
// ATTRIBUTION (D-31, D-32, D-33, D-65, 159-05-EVIDENCE.md Task 1): every needle below was re-measured
// at execution time against the live corpus and against the five boundary SHAs
// (8de413aa..ce9b0b73..2a46d32a..bb22f89a..937d0a1f..HEAD), re-read fresh rather than carried from
// 159-CONTEXT.md. The two corpus-wide zeros ("i.e." and "cf.") were confirmed to transition from 1 to
// 0 strictly inside Phase 154's own commit window (8de413aa -> ce9b0b73, landing at af678f0c) and to
// stay at 0 at every later boundary through HEAD -- the two-part attribution proof D-31 requires. The
// six per-file "e.g." counts were re-measured directly against the live files and match the recorded
// values exactly (2, 1, 1, 1, 1, 1). Full series and commands are in 159-05-EVIDENCE.md Task 1.
//
// ALLOWED NEEDLE FORMS ONLY (D-31): corpus-wide zero with the corpus-floor sentinel; per-file exact
// counts scoped to this phase's own edited files with a literal/case-sensitive/substring matcher;
// presence, byte-length, or content-substring on scripts/ artifacts. No needle here reads .planning/,
// embeds a commit SHA, or pins a line number.
//
// SPAWN CEILING (D-39): exactly one spawn in this leaf -- verify-meaning.py's own --self-test, in
// argument-array form (execFileSync), paired with a fail-loud presence assertion (V-154-VERIFYMEANING)
// so a missing tool file and a missing python3 runtime produce two distinguishable FAIL messages,
// never a silent skip.
//
// Assertion classes:
//   V-154-IE             corpus-wide NEGATIVE: 'i.e.' == 0 across docs/, with the corpus-floor sentinel
//   V-154-CF             corpus-wide NEGATIVE: 'cf.' == 0 across docs/, with the corpus-floor sentinel
//   V-154-PERFILE-1..6   per-file exact 'e.g.' counts (literal, case-sensitive, substring) in the six
//                        non-template files the landing reduced
//   V-154-VERIFYMEANING  scripts/docs-style/verify-meaning.py exists (hard check, never skipped)
//   V-154-SELFTEST       verify-meaning.py --self-test spawned (argument-array form) and exits 0
//                        printing its ten-of-ten summary; distinguishes a missing runtime from a
//                        missing tool (the latter is caught by V-154-VERIFYMEANING above)
//   V-154-DISPOSITIONS   scripts/docs-style/_DISPOSITIONS-docs.tsv present with >= 1 data row
//   V-154-SUBSBATCH9     scripts/docs-style/subs-admin-batch9.tsv contains its negative-lookbehind
//                        guard '(?<!Sure )' as a content substring
//   V-154-SELF           CHAIN_PHASES does NOT include 154 AND CHAIN_SKIP is empty Set
//
// Usage: node scripts/validation/check-phase-154.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
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

function corpusWideZero(id, token, phaseNote) {
  return {
    id,
    name: "V-154-" + id + ": '" + token + "' == 0 corpus-wide across docs/ (" + phaseNote + ")",
    run() {
      // Corpus-floor sentinel (D-31, literal form echoed from check-phase-145.mjs:145): below this,
      // docs/ itself is missing or truncated -- a hard FAIL treated as a missing-corpus null
      // sentinel, never a vacuous pass. The literal comparison (not a named constant) is itself an
      // acceptance-tested source substring -- see this plan's <verify> block.
      const files = walkMd('docs');
      if (files.length < 250) {
        return { pass: false, detail: 'docs/ walk found only ' + files.length + ' files (expected >= 250) -- treating as a missing-corpus null sentinel, not a vacuous pass' };
      }
      let count = 0;
      const offenders = [];
      for (const f of files) {
        let c;
        try { c = readFileSync(f, 'utf8'); } catch { continue; }
        const n = (c.split(token).length - 1);
        if (n > 0) { count += n; offenders.push(f); }
      }
      if (count !== 0) {
        return { pass: false, detail: "'" + token + "' regression: " + count + ' occurrence(s) across ' + offenders.length + ' file(s): ' + offenders.slice(0, 5).join(', ') };
      }
      return { pass: true, detail: "0 occurrences of '" + token + "' across " + files.length + ' docs/ files (measured: git grep -c "' + token.replace(/\./g, '\\.') + '" <sha> -- docs; phase 154 drove this to 0 at af678f0c)' };
    }
  };
}

const checks = [];

checks.push(corpusWideZero('IE', 'i.e.', 'phase 154, latin-abbrev rule, member 1 of 2'));
checks.push(corpusWideZero('CF', 'cf.', 'phase 154, latin-abbrev rule, member 2 of 2'));

// === V-154-PERFILE-1..6: per-file exact 'e.g.' counts (literal, case-sensitive, substring) ===
// The six non-template files phase 154 reduced but did not zero out corpus-wide (154-02, af678f0c).
const PERFILE_EG = [
  ['docs/admin-setup-android/09-aosp-realwear.md', 2],
  ['docs/admin-setup-android/10-aosp-zebra.md', 1],
  ['docs/admin-setup-android/11-aosp-pico.md', 1],
  ['docs/admin-setup-android/12-aosp-htc-vive-focus.md', 1],
  ['docs/admin-setup-android/13-aosp-meta-quest.md', 1],
  ['docs/reference/android-capability-matrix.md', 1],
];

let n = 0;
for (const [path, expected] of PERFILE_EG) {
  n++;
  checks.push({
    id: 'PERFILE-' + n,
    name: 'V-154-PERFILE-' + n + ": " + path + " carries exactly " + expected + " occurrence(s) of 'e.g.' (literal, case-sensitive, substring)",
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      const count = c.split('e.g.').length - 1;
      if (count !== expected) {
        return { pass: false, detail: 'PERFILE-' + n + ' drift: expected ' + expected + ", got " + count + ' in ' + path };
      }
      return { pass: true, detail: path + ' carries exactly ' + count + " occurrence(s) of 'e.g.' (measured: grep -Fo \"e.g.\" " + path + ' | wc -l)' };
    }
  });
}

// === V-154-VERIFYMEANING: the meaning-verification tool exists (hard check, never skipped) ===
const VERIFY_MEANING = 'scripts/docs-style/verify-meaning.py';
checks.push({
  id: 'VERIFYMEANING',
  name: 'V-154-VERIFYMEANING: ' + VERIFY_MEANING + ' exists and is non-empty (hard check)',
  run() {
    const c = readFile(VERIFY_MEANING);
    if (c === null) return { pass: false, detail: VERIFY_MEANING + ' missing -- tool absent' };
    if (c.trim().length === 0) return { pass: false, detail: VERIFY_MEANING + ' is empty' };
    return { pass: true, detail: VERIFY_MEANING + ' present (' + c.length + ' bytes)' };
  }
});

// === V-154-SELFTEST: --self-test spawned (argument-array form), exits 0, prints ten-of-ten ===
// Paired with V-154-VERIFYMEANING above: this check never gracefully skips on ENOENT. A missing
// python3 runtime and a missing tool file produce two distinguishable FAIL messages -- absence of the
// tool is already caught above, so this check's own FAIL always means "runtime not found" or
// "self-test did not pass," never a laundered skip.
checks.push({
  id: 'SELFTEST',
  name: 'V-154-SELFTEST: python3 ' + VERIFY_MEANING + " --self-test exits 0 printing its ten-of-ten summary",
  run() {
    let stdout;
    try {
      stdout = execFileSync('python3', [VERIFY_MEANING, '--self-test'], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() }).toString();
    } catch (err) {
      const isMissingRuntime = err.code === 'ENOENT';
      if (isMissingRuntime) {
        return { pass: false, detail: 'python3 runtime not found -- distinguished from tool absence, which V-154-VERIFYMEANING asserts separately' };
      }
      const stderr = err.stderr ? err.stderr.toString() : '';
      const out = err.stdout ? err.stdout.toString() : '';
      return { pass: false, detail: 'self-test exited non-zero: ' + (stderr || out).slice(0, 500) };
    }
    if (!/10\/10/.test(stdout)) {
      return { pass: false, detail: 'SELFTEST regression: ten-of-ten summary not found in self-test output' };
    }
    return { pass: true, detail: 'self-test exits 0, ten-of-ten summary present (measured: python3 ' + VERIFY_MEANING + ' --self-test)' };
  }
});

// === V-154-DISPOSITIONS: dispositions table present with >= 1 data row ===
const DISPOSITIONS_DOCS = 'scripts/docs-style/_DISPOSITIONS-docs.tsv';
checks.push({
  id: 'DISPOSITIONS',
  name: 'V-154-DISPOSITIONS: ' + DISPOSITIONS_DOCS + ' present with >= 1 data row',
  run() {
    const c = readFile(DISPOSITIONS_DOCS);
    if (c === null) return { pass: false, detail: DISPOSITIONS_DOCS + ' missing' };
    const dataRows = c.split('\n').filter((l) => l.trim().length > 0 && !l.trim().startsWith('#')).length;
    if (dataRows < 1) {
      return { pass: false, detail: DISPOSITIONS_DOCS + ' carries 0 data rows (expected >= 1)' };
    }
    return { pass: true, detail: DISPOSITIONS_DOCS + ' present with ' + dataRows + ' data row(s)' };
  }
});

// === V-154-SUBSBATCH9: negative-lookbehind guard present as a content substring ===
const SUBS_BATCH9 = 'scripts/docs-style/subs-admin-batch9.tsv';
const LOOKBEHIND_GUARD = '(?<!Sure )';
checks.push({
  id: 'SUBSBATCH9',
  name: 'V-154-SUBSBATCH9: ' + SUBS_BATCH9 + " contains its negative-lookbehind guard '" + LOOKBEHIND_GUARD + "'",
  run() {
    const c = readFile(SUBS_BATCH9);
    if (c === null) return { pass: false, detail: SUBS_BATCH9 + ' missing' };
    if (!c.includes(LOOKBEHIND_GUARD)) {
      return { pass: false, detail: 'SUBSBATCH9 needle absent: negative-lookbehind guard not found in ' + SUBS_BATCH9 };
    }
    return { pass: true, detail: SUBS_BATCH9 + ' contains its negative-lookbehind guard' };
  }
});

// === V-154-SELF: dual-invariant guard (CHAIN_PHASES excludes 154; CHAIN_SKIP empty) ===
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
checks.push({
  id: 'SELF',
  name: 'V-154-SELF: CHAIN_PHASES does NOT include 154; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(154)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 154 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (154 absent, standalone chain member); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-145.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-154 -- Phase 154 deliverables (Google-Style Corpus Landing & Authoring-Standard Adoption)\n');
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
