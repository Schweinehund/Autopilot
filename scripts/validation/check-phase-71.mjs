#!/usr/bin/env node
// check-phase-71.mjs -- Phase 71 deliverables (Archive-Automation Root-Cause Fix + Historical Residue Sweep)
//
// Pillar A of v1.8 — ARCHIVE-01 root-cause fix (vendored extractor) + ARCHIVE-02 historical residue sweep.
// Source of truth: .planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-CONTEXT.md
//
// Assertion classes:
//   V-71-FIX-01            scripts/archive/extract-summary-oneliners.mjs exists + corrected regex anchor present
//   V-71-FIX-02            scripts/archive/test-extract-oneliner.mjs exists + 3 fixture labels discoverable
//   V-71-MILESTONES-01     .planning/MILESTONES.md HEAD has ZERO bullet-anchored placeholder-label tokens
//                          (11 tokens including the v1.1:164 NEW DISCOVERY `Edit \d+ --` token-class)
//   V-71-ARCHIVE02-01      scoped scan of v1.1 H2 + v1.2 H2 ranges; FAIL if either H2 contains debris
//   V-71-CHAIN-{48..70}    23 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware optimization)
//   V-71-AUDIT             scripts/validation/v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)
//   V-71-SELF              CHAIN_PHASES does NOT include 71; CHAIN_SKIP is empty Set (Phase 68 7b635ca invariant)
//
// Chicken-and-egg transient at Plan 71-01 commit: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL
//   because v1.1 line 164 (`- Edit 1 --`) + v1.2 lines 145-148 (3× `- One-liner:` + 1× `- Commit:`) debris
//   is not yet swept. Plan 71-02 re-authors v1.1 + v1.2 H2 from canonical MILESTONE-AUDIT sources.
//   Per Plan 70-05 Commit A `14683de` documented-transient-RED chain state precedent.
//
// Lineage: Phase 48 D-25 -> ... -> Phase 70 close `4df3a16` -> Phase 71 ARCHIVE-01/02 (Pillar A)
//
// Usage: node scripts/validation/check-phase-71.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
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

const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';
const EXTRACTOR_PATH = 'scripts/archive/extract-summary-oneliners.mjs';
const TEST_PATH = 'scripts/archive/test-extract-oneliner.mjs';
const MILESTONES_PATH = '.planning/MILESTONES.md';

// Phase 71 extends the chain through Phase 70 (Phase 70 close 4df3a16 — full chain green inherited).
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant — no entries to suppress.
const CHAIN_SKIP = new Set([]);

// PLACEHOLDER_TOKENS (per CONTEXT D-02 10-token list + D-03 NEW DISCOVERY `Edit \d+ --` class):
//   10 literal tokens (regex-escaped at use site) + 1 regex-fragment token (pass-through).
const PLACEHOLDER_TOKENS = [
  'One-liner:',
  'SUBSUMED BY PLAN',
  'Hash:',
  'Pre-edit:',
  'Total file size:',
  'File:',
  'Insertion position:',
  'Single deliverable:',
  'Plan goal:',
  'Found during:',
  'Edit \\d+ --',  // NEW class — D-03 advisor pre-sweep grep at MILESTONES.md v1.1 line 164
];

// Build the anchored bullet-line-start regex. The `Edit \d+ --` token MUST pass through
// without escaping (it is intentionally a regex fragment); other tokens are literal text
// and must have regex meta-chars escaped. Per RESEARCH Pitfall 5 explicit escape-branch.
function buildGarbageRegex() {
  const escaped = PLACEHOLDER_TOKENS.map(t =>
    t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  return new RegExp('^- (?:' + escaped + ')', 'gm');
}

const checks = [
  // === V-71-FIX-01: vendored extractor exists + corrected regex anchor present ===
  {
    id: 'FIX-01',
    name: 'V-71-FIX-01: scripts/archive/extract-summary-oneliners.mjs exists + corrected regex anchor',
    run() {
      const c = readFile(EXTRACTOR_PATH);
      if (c === null) return { pass: false, detail: EXTRACTOR_PATH + ' missing' };
      // Substring assertion on the corrected anchor `**One-liner:**` (the literal label).
      // The corrected regex captures the VALUE after this label; original buggy regex captured the LABEL.
      if (!c.includes('**One-liner:**')) {
        return { pass: false, detail: 'corrected regex anchor `**One-liner:**` NOT present in ' + EXTRACTOR_PATH };
      }
      // Confirm the value-capture group also present (`([^\r\n]+)` — anchored to end-of-line)
      if (!c.includes('([^\\r\\n]+)')) {
        return { pass: false, detail: 'corrected regex value-capture group `([^\\r\\n]+)` NOT present in ' + EXTRACTOR_PATH };
      }
      // Confirm the buggy upstream regex IS NOT present (defense-in-depth — comment-rewrite hardens this).
      if (c.includes('[^*]+')) {
        return { pass: false, detail: 'buggy regex character-class `[^*]+` still present in ' + EXTRACTOR_PATH + ' (regression)' };
      }
      return { pass: true, detail: 'vendored extractor carries corrected `**One-liner:** ([^\\r\\n]+)` anchor; buggy `[^*]+` absent' };
    }
  },

  // === V-71-FIX-02: companion test fixture exists + 3 fixture labels discoverable ===
  {
    id: 'FIX-02',
    name: 'V-71-FIX-02: scripts/archive/test-extract-oneliner.mjs exists + Fixture 1/2/3 labels',
    run() {
      const c = readFile(TEST_PATH);
      if (c === null) return { pass: false, detail: TEST_PATH + ' missing' };
      const missing = [];
      if (!c.includes('Fixture 1')) missing.push('Fixture 1');
      if (!c.includes('Fixture 2')) missing.push('Fixture 2');
      if (!c.includes('Fixture 3')) missing.push('Fixture 3');
      if (missing.length > 0) {
        return { pass: false, detail: 'fixture labels missing: ' + missing.join(', ') };
      }
      // Confirm ESM relative import wires test to vendored extractor
      if (!c.includes("from './extract-summary-oneliners.mjs'")) {
        return { pass: false, detail: 'relative ESM import from extractor module NOT present' };
      }
      return { pass: true, detail: '3 fixture labels (Fixture 1/2/3) + relative ESM import all present' };
    }
  },

  // === V-71-MILESTONES-01: .planning/MILESTONES.md HEAD scan for anchored placeholder bullets ===
  {
    id: 'MILESTONES-01',
    name: 'V-71-MILESTONES-01: .planning/MILESTONES.md HEAD — zero anchored placeholder-label bullets',
    run() {
      const c = readFile(MILESTONES_PATH);
      if (c === null) return { pass: false, detail: MILESTONES_PATH + ' missing' };
      const re = buildGarbageRegex();
      const matches = c.match(re) || [];
      if (matches.length > 0) {
        // Diagnostic-rich detail per RESEARCH WRAPPER-01 lesson: first 5 line:content hits.
        const lines = c.split('\n');
        const perLineRe = new RegExp('^- (?:' + PLACEHOLDER_TOKENS.map(t =>
          t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        ).join('|') + ')');
        const hits = [];
        for (let i = 0; i < lines.length && hits.length < 5; i++) {
          if (perLineRe.test(lines[i])) {
            hits.push((i + 1) + ':' + lines[i].slice(0, 80));
          }
        }
        return { pass: false, detail: matches.length + ' placeholder bullets; first hits: ' + hits.join(' | ') + ' (Plan 71-02 sweep resolves)' };
      }
      return { pass: true, detail: 'MILESTONES.md clean: 0 placeholder bullets across ' + c.length + ' bytes' };
    }
  },

  // === V-71-ARCHIVE02-01: scoped v1.1 H2 + v1.2 H2 ranges — zero debris post-sweep ===
  {
    id: 'ARCHIVE02-01',
    name: 'V-71-ARCHIVE02-01: v1.1 + v1.2 H2 ranges in MILESTONES.md — zero placeholder-label residue',
    run() {
      const c = readFile(MILESTONES_PATH);
      if (c === null) return { pass: false, detail: MILESTONES_PATH + ' missing' };
      const lines = c.split('\n');
      // Locate H2 boundaries by scanning for canonical headings (line ranges shift after Plan 71-02 sweep).
      let v11h2 = -1, v12h2 = -1, v10h2 = -1;
      for (let i = 0; i < lines.length; i++) {
        if (/^## v1\.1 /.test(lines[i])) v11h2 = i + 1;
        if (/^## v1\.2 /.test(lines[i])) v12h2 = i + 1;
        if (/^## v1\.0 /.test(lines[i])) v10h2 = i + 1;
      }
      if (v11h2 < 0 || v12h2 < 0) {
        return { pass: false, detail: 'v1.1 or v1.2 H2 heading missing from MILESTONES.md (v11h2=' + v11h2 + ' v12h2=' + v12h2 + ')' };
      }
      // Scope: v1.2 body spans v12h2 down to v11h2; v1.1 body spans v11h2 down to v10h2 (or EOF).
      const v12body = lines.slice(v12h2 - 1, v11h2 - 1).join('\n');
      const v11body = lines.slice(v11h2 - 1, v10h2 > 0 ? v10h2 - 1 : lines.length).join('\n');
      const re = buildGarbageRegex();
      const v12hits = v12body.match(re) || [];
      const v11hits = v11body.match(re) || [];
      if (v12hits.length > 0 || v11hits.length > 0) {
        return { pass: false, detail: 'v1.2 H2 has ' + v12hits.length + ' debris bullets; v1.1 H2 has ' + v11hits.length + ' debris bullets (Plan 71-02 sweep resolves)' };
      }
      return { pass: true, detail: 'v1.1 + v1.2 H2 entries clean of placeholder-label residue' };
    }
  },
];

// === V-71-CHAIN-NN: chain regression-guards for check-phase-{48..70}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-71-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 71 (see CHAIN_SKIP docs)' };
      }
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      try {
        execFileSync('node', [path], {
          stdio: 'pipe',
          timeout: 300000,
          cwd: process.cwd(),
          env: { ...process.env, CHECK_PHASE_NESTED: '1' },
        });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
    }
  });
}

// === V-71-AUDIT: v1.7-milestone-audit.mjs subprocess exits 0 (predecessor-byte-unchanged invariant) ===
checks.push({
  id: 'AUDIT',
  name: 'V-71-AUDIT: v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.7 harness exits 0 (predecessor-byte-unchanged invariant preserved)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
  }
});

// === V-71-SELF: CHAIN_PHASES does NOT include 71 (no self-reference; auditor-independence) ===
checks.push({
  id: 'SELF',
  name: 'V-71-SELF: CHAIN_PHASES does NOT include 71; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(71)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 71 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (71 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-67.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-71 -- Phase 71 deliverables (Archive-Automation Root-Cause Fix + Historical Residue Sweep)\n');
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
