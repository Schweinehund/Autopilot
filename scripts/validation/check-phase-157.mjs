#!/usr/bin/env node
// check-phase-157.mjs -- Phase 157 deliverables (Authoring Standard & Corpus Hygiene)
//
// v1.22 CONTENT leaf, templated on check-phase-145.mjs / check-phase-154.mjs (the content-leaf
// family) and check-phase-143.mjs (the argument-array spawn idiom, the ENOENT/127/"not found"
// skip classifier that distinguishes a missing RUNTIME from a missing TOOL FILE, and the hard
// non-skipping presence check paired with it). LIGHTWEIGHT base -- NO chain (the v1.22 apex owns
// the chain; this leaf is a standalone chain member).
//
// THE STRUCTURAL CHANGE THIS LEAF MAKES (D-38): this leaf is what converts
// scripts/validation/check-prose-style.py from an advisory tool into an ENFORCING one, by this
// repository's own definition (157 D-09: the nav-hub checker "was made enforcing by
// check-phase-123/-143", a chain leaf) -- a CI job alone is not enforcing here, because none of
// the existing workflows carries a `push` trigger or a `docs/**` path filter. Spawning the gate
// in full, requiring exit 0, is what makes any future corpus violation of the prose-style rules
// redden the apex.
//
// MEASURED COST (D-38, 159-EVIDENCE.md Task 1): the full run took ~79.3s wall time at authoring
// time (context's own recorded range was 63-76s; the live re-measurement runs slightly above that
// range -- D-65 measurement discipline: the live value wins and the delta is recorded in
// 159-EVIDENCE.md, not silently rounded down to match the carried figure). The self-test took
// ~0.37s. The accepted per-apex cost is therefore roughly +79s on every future apex run. This is a
// stated, accepted cost, not a discovered one.
//
// INDEX READS, NOT HISTORY READS (D-38): check-prose-style.py's own `git ls-files 'docs/*.md'`
// enumeration and its `git rev-parse` calls are reads of the current INDEX, not the commit
// HISTORY -- they read what is currently tracked, not what a prior commit looked like. That
// distinction is why this spawn is permitted inside a chain leaf at all: a leaf must never read
// git history (D-31), but reading the live index to enumerate tracked files is not history.
//
// ATTRIBUTION (D-36, 159-EVIDENCE.md Task 1): every needle below was re-measured at execution time
// against the live corpus and against 157's own changed-file diff (bb22f89a..937d0a1f). Two
// candidates named in earlier drafts -- docs/operations/07-windows-autopatch.md and
// docs/recipes/05-enterprise-update-plan.md -- are DROPPED: neither file is in 157's diff, so
// neither is 157's needle. See 159-EVIDENCE.md for the full drop record.
//
// NOT PINNABLE (D-36): the colon-prefix heading form ("### D-0N:") and the bare heading form
// ("### D-0N" without a colon) are NOT needles. The colon-prefix form spans three unrelated
// decision series in this same file (measured colon-prefix counts across the whole file: D-01=3,
// D-02=3, D-03=3, D-04=3, D-05=2 -- none of which is 1, and none of which isolates the
// prose-style series from the EEE-structural or C17 D-series that share the same "### D-0N:"
// shape). The bare form additionally collides with "### D-02 Edge-case rulings" at line 134 of
// this same file, an entirely unrelated heading. Only the five FULL heading texts
// ("### D-01: The non-gate rule" ... "### D-05: Tooling pairing and its risks") are pinnable, each
// confirmed at exactly one occurrence.
//
// Assertion classes:
//   V-157-TEMPLATE-1..8    each of the 8 docs/_templates/*.md files contains the authoring-standard
//                          sentence, asserted individually so one missing template is named, not
//                          absorbed into a count
//   V-157-STDHEADING       '## Prose Style Authoring Standard' occurs exactly once in the standard
//   V-157-DHEADING-1..5    each of the five full D-01..D-05 heading texts occurs exactly once
//   V-157-GLOSSARY-1..4    four H3 headings occur exactly once each in docs/_glossary.md
//   V-157-GLOSSARYLINUX    one H3 heading occurs exactly once in docs/_glossary-linux.md
//   V-157-ZERO-*           three corpus-wide zeros with the corpus-floor sentinel
//   V-157-PERFILE-1..8     eight per-file exact counts, confined to files inside 157's own diff
//   V-157-PROSESTYLE-TOOL  scripts/validation/check-prose-style.py exists (hard check, never skipped)
//   V-157-PROSESTYLE-RUN   the tool's full run (no flags) is spawned and exits 0 (the enforcing gate)
//   V-157-PROSESTYLE-SELF  the tool's --self-test is spawned and exits 0
//   V-157-SELF             CHAIN_PHASES does NOT include 157 AND CHAIN_SKIP is empty Set
//
// Usage: node scripts/validation/check-phase-157.mjs [--verbose]
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

// Established skip classifier (quoted in shape from check-phase-143.mjs:95-97): a missing RUNTIME
// (ENOENT, exit 127, or a shell "not found"/"Could not resolve" message) is a legitimate SKIP. A
// missing TOOL FILE is never laundered through this classifier -- it is caught, hard, by the
// separate V-157-PROSESTYLE-TOOL presence check below, which never skips.
function isMissingRuntime(err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  return err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
}

const checks = [];

// === V-157-TEMPLATE-1..8: authoring-standard sentence, each template asserted individually ===
const AUTHORING_SENTENCE = "Author this document's prose against the Prose Style Authoring Standard";
const TEMPLATES = [
  'docs/_templates/admin-template.md',
  'docs/_templates/admin-template-android.md',
  'docs/_templates/admin-template-ios.md',
  'docs/_templates/admin-template-macos.md',
  'docs/_templates/l1-template.md',
  'docs/_templates/l2-template.md',
  'docs/_templates/recipe-template.md',
  'docs/_templates/reference-template.md',
];

let tn = 0;
for (const path of TEMPLATES) {
  tn++;
  checks.push({
    id: 'TEMPLATE-' + tn,
    name: 'V-157-TEMPLATE-' + tn + ': ' + path + " contains the authoring-standard sentence",
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (!c.includes(AUTHORING_SENTENCE)) {
        return { pass: false, detail: 'TEMPLATE-' + tn + ' regression: authoring-standard sentence not found in ' + path };
      }
      return { pass: true, detail: path + ' contains the authoring-standard sentence' };
    }
  });
}

// === V-157-STDHEADING: section heading exactly once ===
const STANDARD_DOC = 'docs/_standards/EEE-SOP-standard.md';
const STD_HEADING = '## Prose Style Authoring Standard';

function exactCount(id, path, needle, expected, label) {
  return {
    id,
    name: 'V-157-' + id + ': ' + path + ' contains "' + needle + '" exactly ' + expected + ' time(s)' + (label ? ' (' + label + ')' : ''),
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

checks.push(exactCount('STDHEADING', STANDARD_DOC, STD_HEADING, 1));

// === V-157-DHEADING-1..5: five full decision-heading texts, exactly once each ===
// Only the FULL heading text is pinned (D-36). Neither the colon-prefix form ("### D-0N:") nor the
// bare form ("### D-0N") is used -- both collide with unrelated D-series in this same file; see the
// header comment and 159-EVIDENCE.md for the measured collision counts.
const DHEADINGS = [
  '### D-01: The non-gate rule',
  '### D-02: The mandate-promotion hazard',
  '### D-03: The passive-to-active hazard',
  '### D-04: Corpus scope',
  '### D-05: Tooling pairing and its risks',
];
let dn = 0;
for (const heading of DHEADINGS) {
  dn++;
  checks.push(exactCount('DHEADING-' + dn, STANDARD_DOC, heading, 1, 'full heading text only'));
}

// === V-157-GLOSSARY-1..4: four glossary H3 headings, exactly once each ===
const GLOSSARY_MAIN = 'docs/_glossary.md';
const GLOSSARY_HEADINGS = [
  '### Hotpatching',
  '### Autopatch group',
  '### Microsoft 365 Apps update channels',
  '### Enterprise App Catalog',
];
let gn = 0;
for (const heading of GLOSSARY_HEADINGS) {
  gn++;
  checks.push(exactCount('GLOSSARY-' + gn, GLOSSARY_MAIN, heading, 1));
}

// === V-157-GLOSSARYLINUX: one heading in the Linux glossary, exactly once ===
checks.push(exactCount('GLOSSARYLINUX', 'docs/_glossary-linux.md', '### unattended-upgrades', 1));

// === V-157-ZERO-*: three corpus-wide zeros, each with the corpus-floor sentinel ===
// Corpus-floor sentinel (echoed literally from check-phase-145.mjs:145): below this, docs/ itself
// is missing or truncated -- a hard FAIL treated as a missing-corpus null sentinel, never a
// vacuous pass. The literal comparison (not a named constant) is itself an acceptance-tested
// source substring -- see this plan's <verify> block.
function corpusWideZeroSubstring(id, token, detailNote) {
  return {
    id,
    name: "V-157-" + id + ": '" + token + "' == 0 corpus-wide across docs/ (" + detailNote + ')',
    run() {
      const files = walkMd('docs');
      if (files.length < 250) {
        return { pass: false, detail: 'docs/ walk found only ' + files.length + ' files (expected >= 250) -- treating as a missing-corpus null sentinel, not a vacuous pass' };
      }
      let count = 0;
      const offenders = [];
      for (const f of files) {
        let c;
        try { c = readFileSync(f, 'utf8'); } catch { continue; }
        const n = c.split(token).length - 1;
        if (n > 0) { count += n; offenders.push(f); }
      }
      if (count !== 0) {
        return { pass: false, detail: "'" + token + "' regression: " + count + ' occurrence(s) across ' + offenders.length + ' file(s): ' + offenders.slice(0, 5).join(', ') };
      }
      return { pass: true, detail: "0 occurrences of '" + token + "' across " + files.length + ' docs/ files (measured: node scripts/validation/check-phase-157.mjs; phase 157 window bb22f89a..937d0a1f)' };
    }
  };
}

checks.push(corpusWideZeroSubstring('ZERO-300GROUPS', '300 groups', 'phase 157, group-count phrase, member 1 of 3'));
checks.push(corpusWideZeroSubstring('ZERO-4PLATFORMHUB', '4-platform comparison hub for update enforcement', 'phase 157, platform-comparison hub phrase, member 2 of 3; the correction landed at 18f378aa'));

// The third corpus-wide zero is a line-level predicate (a specific date appearing on a line that
// does NOT also carry the review_by key), not a plain substring count, so it gets its own check
// rather than reusing corpusWideZeroSubstring.
checks.push({
  id: 'ZERO-DATENOREVIEW',
  name: "V-157-ZERO-DATENOREVIEW: lines containing '2026-06-19' without 'review_by' == 0 corpus-wide (phase 157, stale-date-without-review-key phrase, member 3 of 3)",
  run() {
    const files = walkMd('docs');
    if (files.length < 250) {
      return { pass: false, detail: 'docs/ walk found only ' + files.length + ' files (expected >= 250) -- treating as a missing-corpus null sentinel, not a vacuous pass' };
    }
    let count = 0;
    const offenders = [];
    for (const f of files) {
      let c;
      try { c = readFileSync(f, 'utf8'); } catch { continue; }
      for (const line of c.split('\n')) {
        if (line.includes('2026-06-19') && !line.includes('review_by')) { count++; offenders.push(f); break; }
      }
    }
    if (count !== 0) {
      return { pass: false, detail: "regression: " + count + " line(s) carry '2026-06-19' without 'review_by' across " + offenders.length + ' file(s): ' + offenders.slice(0, 5).join(', ') };
    }
    return { pass: true, detail: "0 lines carry '2026-06-19' without 'review_by' across " + files.length + ' docs/ files (measured: grep -rn "2026-06-19" docs/ | grep -v "review_by" | wc -l)' };
  }
});

// === V-157-PERFILE-1..8: eight per-file exact counts, confined to files inside 157's own diff ===
// Confinement proof (D-36, 159-EVIDENCE.md Task 1): every file below is confirmed present in
// `git diff --name-only bb22f89a 937d0a1f -- docs/` (157's own changed-file list). Two candidates
// named in earlier drafts -- docs/operations/07-windows-autopatch.md and
// docs/recipes/05-enterprise-update-plan.md -- are DROPPED because neither appears in that diff;
// see 159-EVIDENCE.md for the drop record. Matcher: literal, case-sensitive, substring throughout.
const PERFILE = [
  ['docs/_glossary.md', '15 deployment rings', 1],
  ['docs/_glossary.md', '300 Autopatch groups', 1],
  ['docs/operations/patch-management/00-overview.md', '15 deployment rings', 1],
  ['docs/operations/patch-management/00-overview.md', '300 Autopatch groups', 1],
  ['docs/operations/patch-management/00-overview.md', 'updated 2025-06-17', 1],
  ['docs/operations/patch-management/00-overview.md', '[Linux Update Delivery](05-linux-update-delivery.md)', 4],
  ['docs/operations/patch-management/01-windows-wufb-rings.md', 'updated 2025-06-17', 2],
  ['docs/operations/00-index.md', '5-platform comparison hub for update enforcement', 1],
];

let pn = 0;
for (const [path, needle, expected] of PERFILE) {
  pn++;
  checks.push({
    id: 'PERFILE-' + pn,
    name: 'V-157-PERFILE-' + pn + ': ' + path + ' carries exactly ' + expected + " occurrence(s) of '" + needle + "' (literal, case-sensitive, substring)",
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      const count = c.split(needle).length - 1;
      if (count !== expected) {
        return { pass: false, detail: 'PERFILE-' + pn + ' drift: expected ' + expected + ', got ' + count + ' in ' + path };
      }
      return { pass: true, detail: path + ' carries exactly ' + count + " occurrence(s) of '" + needle + "'" };
    }
  });
}

// === V-157-PROSESTYLE-TOOL: the gate tool exists (hard check, never skipped) ===
const PROSE_STYLE_TOOL = 'scripts/validation/check-prose-style.py';
checks.push({
  id: 'PROSESTYLE-TOOL',
  name: 'V-157-PROSESTYLE-TOOL: ' + PROSE_STYLE_TOOL + ' exists and is non-empty (hard check)',
  run() {
    const c = readFile(PROSE_STYLE_TOOL);
    if (c === null) return { pass: false, detail: PROSE_STYLE_TOOL + ' missing -- tool absent' };
    if (c.trim().length === 0) return { pass: false, detail: PROSE_STYLE_TOOL + ' is empty' };
    return { pass: true, detail: PROSE_STYLE_TOOL + ' present (' + c.length + ' bytes)' };
  }
});

// === V-157-PROSESTYLE-RUN: the enforcing gate -- full run, argument-array form, exit 0 required ===
// Child cap set explicitly to 600 seconds (600000 ms) so the full run -- measured at ~79.3s wall
// time -- is never killed by a shorter default. Uses the established ENOENT/127/"not found"
// classifier: a missing python3 RUNTIME is a legitimate SKIP; a missing TOOL FILE is caught, hard,
// by V-157-PROSESTYLE-TOOL above (this check also skips gracefully on tool absence, since that
// case is already reported as a FAIL by the presence check -- the overall run still fails).
checks.push({
  id: 'PROSESTYLE-RUN',
  name: 'V-157-PROSESTYLE-RUN: python3 ' + PROSE_STYLE_TOOL + ' (full run, no flags) exits 0 -- the enforcing gate',
  run() {
    if (!existsSync(join(process.cwd(), PROSE_STYLE_TOOL))) {
      return { pass: true, skipped: true, detail: PROSE_STYLE_TOOL + ' not present (graceful skip; V-157-PROSESTYLE-TOOL reports this as a hard FAIL separately)' };
    }
    try {
      execFileSync('python3', [PROSE_STYLE_TOOL], { stdio: 'pipe', timeout: 600000, cwd: process.cwd() });
      return { pass: true, detail: PROSE_STYLE_TOOL + ' full run exits 0 (measured wall time ~79.3s at authoring time; accepted per-apex cost)' };
    } catch (err) {
      if (isMissingRuntime(err)) return { pass: true, skipped: true, detail: 'python3 runtime not found -- skipped (distinguished from tool absence, which V-157-PROSESTYLE-TOOL asserts separately)' };
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      return { pass: false, detail: 'PROSESTYLE-RUN FAIL: corpus violates the prose-style gate: ' + (stderr || stdout).slice(0, 500) };
    }
  }
});

// === V-157-PROSESTYLE-SELF: --self-test, argument-array form, exit 0, "passed" summary present ===
checks.push({
  id: 'PROSESTYLE-SELF',
  name: 'V-157-PROSESTYLE-SELF: python3 ' + PROSE_STYLE_TOOL + ' --self-test exits 0, prints a passed-count summary',
  run() {
    if (!existsSync(join(process.cwd(), PROSE_STYLE_TOOL))) {
      return { pass: true, skipped: true, detail: PROSE_STYLE_TOOL + ' not present (graceful skip; V-157-PROSESTYLE-TOOL reports this as a hard FAIL separately)' };
    }
    try {
      const stdout = execFileSync('python3', [PROSE_STYLE_TOOL, '--self-test'], { stdio: 'pipe', timeout: 600000, cwd: process.cwd() }).toString();
      if (!/\d+ passed, 0 failed/.test(stdout)) {
        return { pass: false, detail: 'PROSESTYLE-SELF regression: passed-count summary not found in --self-test output' };
      }
      return { pass: true, detail: '--self-test exits 0, passed-count summary present (measured ~0.37s at authoring time)' };
    } catch (err) {
      if (isMissingRuntime(err)) return { pass: true, skipped: true, detail: 'python3 runtime not found -- skipped (distinguished from tool absence, which V-157-PROSESTYLE-TOOL asserts separately)' };
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      return { pass: false, detail: 'PROSESTYLE-SELF FAIL: ' + (stderr || stdout).slice(0, 500) };
    }
  }
});

// === V-157-SELF: dual-invariant guard (CHAIN_PHASES excludes 157; CHAIN_SKIP empty) ===
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
checks.push({
  id: 'SELF',
  name: 'V-157-SELF: CHAIN_PHASES does NOT include 157; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(157)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 157 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (157 absent, standalone chain member); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-145.mjs / check-phase-154.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-157 -- Phase 157 deliverables (Authoring Standard & Corpus Hygiene)\n');
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
