#!/usr/bin/env node
// build-publish-bundle.mjs -- Phase-126 PUB-01..04 batch orchestrator (126-CONTEXT.md D-01..D-12)
//
// Pure orchestration glue over three already-green single-doc tools:
//   build-filename-map.mjs (registry parse + filename regen), convert.ps1 (MD->.docx),
//   guard-docx.mjs (post-conversion guard). No new conversion or guard logic here.
//
// Converts EVERY docs/_registry/RE-index.md Status:Approved doc (221 today) to .docx,
// names each output from scripts/pipeline/filename-map.md, runs guard-docx.mjs on every
// converted .docx, and -- on a 100% clean pass -- writes a CSV manifest + static README
// + a single versioned dist/docs-library-v1.17.zip. Any conversion/guard/parity/naming/
// divergence failure -> collect ALL failures, print the full list, exit 1, NO zip (D-07).
//
// Zero-dependency Node code (built-ins only), following the scripts/pipeline/*.mjs family
// conventions (padLabel/stAssert self-test harness, argv flags, fail-closed exit contract).
//
// Usage:
//   node scripts/pipeline/build-publish-bundle.mjs              (runs the full batch)
//   node scripts/pipeline/build-publish-bundle.mjs --self-test  (runs the self-test harness)
//
// Exit 0: batch complete, zip written (or self-test all-pass)
// Exit 1: any conversion/guard/parity/naming/divergence failure -- no zip written

// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
// Reuse, don't re-derive (RESEARCH.md Pattern 1) -- Task 1 added these exports.
import { parseRegistry, readFile } from './build-filename-map.mjs';

const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');

const REGISTRY_REL_PATH = 'docs/_registry/RE-index.md';
const FILENAME_MAP_REL_PATH = 'scripts/pipeline/filename-map.md';
const STAGING_DIR_REL = '.pipeline-output/publish-staging';
const DIST_DIR_REL = 'dist';
const ZIP_NAME = 'docs-library-v1.17.zip';

// === Padded-label console output (matches guard-docx.mjs / build-filename-map.mjs) ===
const LABEL_WIDTH = 72;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// ─── RED: stub functions -- not yet implemented (TDD RED phase) ──────────────
// Each throws NOT_IMPLEMENTED so the self-test harness below reports FAIL, not a
// silent false-green. Implemented in the following GREEN commit.

export function parseFilenameMap(_mdContent) {
  throw new Error('NOT_IMPLEMENTED: parseFilenameMap');
}

export function readFrontmatterField(_mdContent, _key) {
  throw new Error('NOT_IMPLEMENTED: readFrontmatterField');
}

export function checkFilenameMapCoverage(_approvedRows, _filenameMap) {
  throw new Error('NOT_IMPLEMENTED: checkFilenameMapCoverage');
}

export function checkParity(_approvedIds, _stagedIds) {
  throw new Error('NOT_IMPLEMENTED: checkParity');
}

export function checkDivergence(_approvedRows, _sourceStatusLookup) {
  throw new Error('NOT_IMPLEMENTED: checkDivergence');
}

export function writeManifestCsv(_rows, _outPath) {
  throw new Error('NOT_IMPLEMENTED: writeManifestCsv');
}

export function validateSourcePathUnderDocs(_p) {
  throw new Error('NOT_IMPLEMENTED: validateSourcePathUnderDocs');
}

export function validateOutputFilename(_name) {
  throw new Error('NOT_IMPLEMENTED: validateOutputFilename');
}

// ─── Self-test mode (--self-test) ─────────────────────────────────────────────
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  function stTry(label, fn) {
    try {
      fn();
    } catch (err) {
      stAssert(label, false, err.message);
    }
  }

  process.stdout.write('build-publish-bundle --self-test (Phase 126 PUB-01..04 orchestrator proof)\n\n');

  // (a) Approved selection yields exactly 221 rows (reuses the imported, self-test-proven parser)
  stTry('(a) Approved selection yields exactly 221 rows', () => {
    const content = readFile(REGISTRY_REL_PATH);
    const rows = content ? parseRegistry(content).filter(r => r.status === 'Approved') : [];
    stAssert('(a) Approved selection yields exactly 221 rows', rows.length === 221, 'rows.length=' + rows.length);
  });

  // (b) CSV manifest join shape is correct (header + 1 row, exact match, D-03 columns only)
  stTry('(b) CSV manifest join shape correct', () => {
    const rows = [{ docId: 'RE-001', outputFilename: 'foo.docx', status: 'Approved', lastVerified: '2026-01-01' }];
    const tmpDir = join(process.cwd(), '.pipeline-output');
    if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });
    const tmpPath = join(tmpDir, 'st-manifest-test.csv');
    writeManifestCsv(rows, tmpPath);
    const written = readFileSync(tmpPath, 'utf8');
    const expected = 'RE-ID,Output Filename,Status,Last Verified\nRE-001,foo.docx,Approved,2026-01-01\n';
    stAssert('(b) CSV manifest join shape correct', written === expected, 'got: ' + JSON.stringify(written));
    rmSync(tmpPath, { force: true });
  });

  // (c) filename-map join fails closed on a synthetic Approved RE-ID missing from filename-map.md
  stTry('(c) filename-map join fails closed on synthetic missing RE-ID', () => {
    const syntheticMap = [
      '| Doc ID | Path | Output Filename |',
      '|--------|------|------------------|',
      '| RE-901 | docs/x.md | x.docx |',
    ].join('\n');
    const parsed = parseFilenameMap(syntheticMap);
    const approvedSynthetic = [{ docId: 'RE-901', path: 'docs/x.md' }, { docId: 'RE-902', path: 'docs/y.md' }];
    const coverage = checkFilenameMapCoverage(approvedSynthetic, parsed);
    stAssert(
      '(c) filename-map join fails closed on synthetic missing RE-ID',
      coverage.missing.length === 1 && coverage.missing[0].docId === 'RE-902',
      'missing=' + coverage.missing.map(m => m.docId).join(',')
    );
  });

  // (d1) registry-parity logic fails closed on a synthetic missing + orphan mismatch (PUB-04)
  stTry('(d1) parity logic fails closed on synthetic missing+orphan', () => {
    const approvedIds = new Set(['RE-A', 'RE-B', 'RE-C']);
    const stagedIds = new Set(['RE-A', 'RE-B', 'RE-D']); // RE-C missing, RE-D orphan
    const result = checkParity(approvedIds, stagedIds);
    stAssert(
      '(d1) parity logic fails closed on synthetic missing+orphan',
      result.missing.length === 1 && result.missing[0] === 'RE-C' &&
      result.orphans.length === 1 && result.orphans[0] === 'RE-D',
      'missing=' + result.missing.join(',') + ' orphans=' + result.orphans.join(',')
    );
  });

  // (d2) D-12 divergence guard fails closed on a synthetic frontmatter status:Draft Approved row
  stTry('(d2) D-12 divergence guard fails closed on synthetic frontmatter status:Draft', () => {
    const approvedSynthetic = [{ docId: 'RE-Z', path: 'docs/z.md' }];
    const syntheticLookup = (_docId) => 'Draft';
    const result = checkDivergence(approvedSynthetic, syntheticLookup);
    stAssert(
      '(d2) D-12 divergence guard fails closed on synthetic frontmatter status:Draft',
      result.divergent.length === 1 && result.divergent[0].docId === 'RE-Z',
      'divergent=' + result.divergent.map(d => d.docId).join(',')
    );
  });

  process.stdout.write('\n' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// ─── Main (non-self-test): not yet implemented (GREEN phase) ────────────────
process.stderr.write('NOT_IMPLEMENTED: full batch run (GREEN phase pending)\n');
process.exit(1);
