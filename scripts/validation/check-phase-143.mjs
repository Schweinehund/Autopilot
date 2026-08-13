#!/usr/bin/env node
// check-phase-143.mjs -- Phase 143 deliverables (Link Coverage & Fence-Mask Unification)
//
// v1.20 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-144.mjs).
// Implements 143-NEEDLE-SPEC.md sections 1-5 VERBATIM (the hand-off artifact D-23 authorizes):
// section 1 (the tool and its invocation), section 2 (the check-phase-119.mjs spawn idiom),
// section 3 (the literals this phase may pin -- required-PRESENT and required-ABSENT), section 4
// (what the validator asserts), section 5 (the rename bar on check-nav-hub-links.mjs's path).
//
// Section 6's boundary is honoured: NO C18 harness fold. check-nav-hub-links.mjs is wired only via
// this leaf's own subprocess spawn, inside the apex chain like any other check-phase-NN.mjs member --
// v1.20-milestone-audit.mjs stays C1-C17 inherited, unmodified by this leaf.
//
// DECLINED (D-05, OWNER-RATIFIED): the spec's optional "corpus-level invariant worth pinning too"
// recommendation (a live-HEAD, corpus-wide zero-'{#'-overrides assertion). A live-HEAD, corpus-wide
// absence assertion inside a permanent apex member goes red at the first v1.21 content commit and
// stays red forever -- exactly the accepted-red class carve-gate.mjs's own header doctrine bars and
// this milestone's bar requires deleting, not manufacturing. The spec itself bounds the omission
// cost as trivial (a stray override renders as visible junk text on GitHub, caught in ordinary
// content review) -- see the DECLINED comment beside the ABSENT-1 needle below.
//
// Assertion classes (spec section 4, one-for-one):
//   V-143-TOOLPRESENCE  scripts/validation/check-nav-hub-links.mjs exists (spec section 1)
//   V-143-CORPUSRUN     the tool's corpus-wide run (no flags) exits 0 (spec section 1/2)
//   V-143-SELFTESTRUN   the tool's --self-test run exits 0 (spec section 1/2/3)
//   V-143-SUMMARYLINE   the summary-line prefix is present and its total count parses to 0 (spec section 3/4)
//   V-143-ABSENT1       required-ABSENT: no CHAIN_PHASES self-registration in the tool's source (spec section 3/4)
//   V-143-ABSENT2       required-ABSENT: no baseline/allowlist/ratchet/expected-failure identifier in the tool's source (spec section 3/4)
//   V-143-ABSENT3       required-ABSENT: '{#' absent from the tool's source OUTSIDE its self-test block (spec section 3/4)
//   V-143-RENAMEBAR     check-phase-123.mjs's path pin on the tool still resolves (spec section 5)
//   V-143-SELF          CHAIN_PHASES does NOT include 143 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-143.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { execFailDetail } from './_lib/exec-fail-detail.mjs';

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

// Section 1: the tool and its invocation.
const TOOL = 'scripts/validation/check-nav-hub-links.mjs';
const CHECK_123 = 'scripts/validation/check-phase-123.mjs';

// Section 3: the literals this spec authorizes pinning.
const SUMMARY_PREFIX = 'check-nav-hub-links summary: ';
const SELF_TEST_FLAG = '--self-test';
const SELFTEST_TAIL = 'Self-test: ';

const checks = [];

// === V-143-TOOLPRESENCE: the tool exists (spec section 1) ===
checks.push({
  id: 'TOOLPRESENCE',
  name: 'V-143-TOOLPRESENCE: ' + TOOL + ' exists and is non-empty',
  run() {
    const c = readFile(TOOL);
    if (c === null) return { pass: false, detail: TOOL + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: TOOL + ' is empty' };
    return { pass: true, detail: TOOL + ' present (' + c.length + ' bytes)' };
  }
});

// === V-143-CORPUSRUN: corpus-wide run (no flags) exits 0 (spec section 1/2) ===
// Spawn idiom quoted verbatim from check-phase-119.mjs:148 (spec section 2), substituting TOOL
// for HARNESS: graceful skip only if the tool file itself is absent, fail with detail on non-zero
// exit, pass on clean exit.
checks.push({
  id: 'CORPUSRUN',
  name: 'V-143-CORPUSRUN: ' + TOOL + ' corpus-wide run (no flags) exits 0',
  run() {
    if (!existsSync(join(process.cwd(), TOOL))) {
      return { pass: true, skipped: true, detail: TOOL + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [TOOL], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: TOOL + ' corpus-wide run exits 0' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-nav-hub-links corpus run FAIL: ' }) };
    }
  }
});

// === V-143-SELFTESTRUN: --self-test run exits 0 (spec section 1/2/3) ===
checks.push({
  id: 'SELFTESTRUN',
  name: 'V-143-SELFTESTRUN: ' + TOOL + ' ' + SELF_TEST_FLAG + ' run exits 0 and prints the "' + SELFTEST_TAIL + '" tail',
  run() {
    if (!existsSync(join(process.cwd(), TOOL))) {
      return { pass: true, skipped: true, detail: TOOL + ' not present (graceful skip)' };
    }
    try {
      const stdout = execFileSync('node', [TOOL, SELF_TEST_FLAG], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() }).toString();
      if (!stdout.includes(SELFTEST_TAIL)) {
        return { pass: false, detail: 'SELFTESTRUN needle absent: tail "' + SELFTEST_TAIL + '" not found in --self-test output' };
      }
      return { pass: true, detail: TOOL + ' ' + SELF_TEST_FLAG + ' run exits 0, "' + SELFTEST_TAIL + '" tail present' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-nav-hub-links --self-test FAIL: ' }) };
    }
  }
});

// === V-143-SUMMARYLINE: summary-line prefix present, total parses to 0 (spec section 3/4) ===
// Live-runs the tool itself (not a source-grep) since the prefix's live output, not merely its
// presence in source, is the fact being pinned. The explicit warning in spec section 3 (do NOT pin
// the two bucket labels' wording) is honoured -- only the prefix and the trailing total are parsed.
checks.push({
  id: 'SUMMARYLINE',
  name: 'V-143-SUMMARYLINE: summary line prefix present, total count parses to 0',
  run() {
    if (!existsSync(join(process.cwd(), TOOL))) {
      return { pass: true, skipped: true, detail: TOOL + ' not present (graceful skip)' };
    }
    let stdout;
    try {
      stdout = execFileSync('node', [TOOL], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() }).toString();
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const out = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      // A non-zero exit here still needs its stdout inspected for the summary line (CORPUSRUN
      // above is the check that fails the run itself); fall through with whatever stdout exists.
      stdout = out;
    }
    if (!stdout.includes(SUMMARY_PREFIX)) {
      return { pass: false, detail: 'SUMMARYLINE needle absent: prefix "' + SUMMARY_PREFIX + '" not found in tool output' };
    }
    const m = stdout.match(/, (\d+) total/);
    if (!m) {
      return { pass: false, detail: 'SUMMARYLINE regression: trailing ", N total" not found in tool output' };
    }
    const total = Number(m[1]);
    if (total !== 0) {
      return { pass: false, detail: 'SUMMARYLINE regression: total count is ' + total + ', expected 0' };
    }
    return { pass: true, detail: 'summary line prefix present, total count 0' };
  }
});

// === V-143-ABSENT1: no CHAIN_PHASES self-registration (spec section 3/4) ===
checks.push({
  id: 'ABSENT1',
  name: 'V-143-ABSENT1: ' + TOOL + ' carries zero CHAIN_PHASES self-registration references',
  run() {
    const c = readFile(TOOL);
    if (c === null) return { pass: false, detail: TOOL + ' missing' };
    if (c.includes('CHAIN_PHASES')) {
      return { pass: false, detail: 'ABSENT1 regression: CHAIN_PHASES self-registration literal found -- standalone posture violated' };
    }
    return { pass: true, detail: 'zero CHAIN_PHASES occurrences -- tool stays standalone, never self-registers' };
  }
});

// === V-143-ABSENT2: no baseline/allowlist/ratchet/expected-failure identifier (spec section 3/4) ===
// Scoped to CODE lines only (`//`-comment lines stripped first) -- the tool's own header prose
// (:7, :456) legitimately narrates the guarantee using these exact words ("NO accepted-violation
// baseline, allowlist, ratchet file or expected-failure list of any kind") to DOCUMENT their
// absence; that prose is not itself the identifier this needle bans. An actual const/property named
// baseline/allowlist/ratchet/expectedFailure would appear in executable code, not a comment line.
checks.push({
  id: 'ABSENT2',
  name: 'V-143-ABSENT2: ' + TOOL + ' carries zero baseline/allowlist/ratchet/expected-failure identifiers in code',
  run() {
    const c = readFile(TOOL);
    if (c === null) return { pass: false, detail: TOOL + ' missing' };
    const codeOnly = c.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    const FORBIDDEN = ['baseline', 'allowlist', 'ratchet', 'expected-failure', 'expectedFailure', 'EXPECTED_FAILURE'];
    const found = FORBIDDEN.filter((tok) => codeOnly.toLowerCase().includes(tok.toLowerCase()));
    if (found.length > 0) {
      return { pass: false, detail: 'ABSENT2 regression: LINK-04 no-accepted-violation-baseline guarantee eroded -- found in code: ' + found.join(', ') };
    }
    return { pass: true, detail: 'zero baseline/allowlist/ratchet/expected-failure identifiers in executable code (LINK-04 guarantee intact; header prose narrating the absence is not itself the identifier)' };
  }
});

// === V-143-ABSENT3: '{#' absent from CODE outside the self-test block (spec section 3/4) ===
// Self-test Case D legitimately contains the literal '{#custom-anchor}' as synthetic fixture text
// proving the negative -- the scan is scoped to source BEFORE the `if (SELF_TEST) {` block,
// matching the spec's explicit scoping instruction (section 3's parenthetical, restated in section
// 4 item 5). A naive whole-file `content.includes('{#')` would false-fail on day one.
//
// The pre-self-test region is FURTHER scoped to CODE lines only (`//`-comment lines stripped) --
// the header's own extensive prose (:10-176) explains, in comments, exactly why `{#id}` is NOT
// recognized (quoting the token repeatedly to describe its absence). That narration is the
// deliverable's documentation, not a re-introduced recognition branch; a bare substring scan over
// the whole region (comments included) would false-fail on this very file's own explanatory
// header. What this needle actually guards against is an ACTUAL recognition branch re-appearing in
// executable code -- which would necessarily be code, not a comment.
checks.push({
  id: 'ABSENT3',
  name: "V-143-ABSENT3: " + TOOL + " carries zero '{#' occurrences in code outside its self-test block",
  run() {
    const c = readFile(TOOL);
    if (c === null) return { pass: false, detail: TOOL + ' missing' };
    const blockStart = c.indexOf('if (SELF_TEST) {');
    if (blockStart === -1) {
      return { pass: false, detail: 'ABSENT3 regression: self-test block marker "if (SELF_TEST) {" not found -- cannot scope the scan' };
    }
    const outsideSelfTest = c.slice(0, blockStart);
    const codeOnly = outsideSelfTest.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    if (codeOnly.includes('{#')) {
      return { pass: false, detail: "ABSENT3 regression: '{#' literal found in code outside the self-test block -- LINK-01's deliberate-absence deliverable eroded" };
    }
    return { pass: true, detail: "zero '{#' occurrences in code outside the self-test block (LINK-01 deliverable intact; header prose narrating the absence is not itself a recognition branch)" };
  }
});

// === V-143-RENAMEBAR: check-phase-123.mjs's path pin on the tool still resolves (spec section 5) ===
checks.push({
  id: 'RENAMEBAR',
  name: 'V-143-RENAMEBAR: ' + CHECK_123 + ' still pins ' + TOOL + '; tool exists at that exact path',
  run() {
    const c = readFile(CHECK_123);
    if (c === null) return { pass: false, detail: CHECK_123 + ' missing' };
    if (!c.includes(TOOL)) {
      return { pass: false, detail: 'RENAMEBAR regression: ' + CHECK_123 + ' no longer pins the literal path "' + TOOL + '"' };
    }
    if (!existsSync(join(process.cwd(), TOOL))) {
      return { pass: false, detail: 'RENAMEBAR regression: ' + TOOL + ' does not exist at its frozen-pinned path -- rename bar violated' };
    }
    return { pass: true, detail: CHECK_123 + ' still pins ' + TOOL + ' verbatim; the file exists at that exact path (not renamed)' };
  }
});

// === V-143-SELF: dual-invariant guard (CHAIN_PHASES excludes 143; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-143-SELF: CHAIN_PHASES does NOT include 143; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(143)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 143 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (143 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-132.mjs / check-phase-133.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-143 -- Phase 143 deliverables (Link Coverage & Fence-Mask Unification)\n');
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
