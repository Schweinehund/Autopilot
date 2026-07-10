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
// divergence failure -> collect ALL failures, print the full list, exit 1, NO zip (D-07,
// always-full rebuild D-05, sequential D-06).
//
// Zero-dependency Node code (built-ins only), following the scripts/pipeline/*.mjs family
// conventions (padLabel/stAssert self-test harness, argv flags, fail-closed exit contract).
//
// Usage:
//   node scripts/pipeline/build-publish-bundle.mjs              (runs the full batch)
//   node scripts/pipeline/build-publish-bundle.mjs --self-test  (runs the self-test harness)
//
// Exit 0: batch complete, zip written (or self-test all-pass)
// Exit 1: any conversion/guard/parity/naming/divergence failure, or a missing preflight
//         dependency -- no zip written

// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
// Reuse, don't re-derive (RESEARCH.md Pattern 1) -- Task 1 added these exports.
import { parseRegistry, readFile } from './build-filename-map.mjs';

const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

const REGISTRY_REL_PATH = 'docs/_registry/RE-index.md';
const FILENAME_MAP_REL_PATH = 'scripts/pipeline/filename-map.md';
const STAGING_DIR_REL = '.pipeline-output/publish-staging';
const DIST_DIR_REL = 'dist';
const ZIP_NAME = 'docs-library-v1.17.zip';
const OUTPUT_FILENAME_RE = /^[a-z0-9-]+\.docx$/;

// === Padded-label console output (matches guard-docx.mjs / build-filename-map.mjs) ===
const LABEL_WIDTH = 72;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// ─── Pure helper functions (all self-test-exercised, T-126-02-01/02/03) ──────

// parseFilenameMap: 3-column filename-map.md table parser -- DISTINCT from parseRegistry
// (which reads RE-index.md's 5-column table where cols[3]=Title/cols[5]=Status).
// filename-map.md's shape is `| Doc ID | Path | Output Filename |` -> cols[1]=Doc ID,
// cols[3]=Output Filename after split('|'). Header/separator rows do not match
// `^\|\s*RE-\d+\s*\|` and are excluded by construction (WARNING-1 fix).
export function parseFilenameMap(mdContent) {
  const map = new Map();
  const lines = mdContent.split(/\r?\n/).filter(l => /^\|\s*RE-\d+\s*\|/.test(l));
  for (const l of lines) {
    const cols = l.split('|').map(s => s.trim());
    map.set(cols[1], cols[3]);
  }
  return map;
}

// readFrontmatterField: lighter-weight than a full YAML parser, matches this repo's
// zero-dependency convention (126-PATTERNS.md Pattern 2). Used for the manifest's
// status/last_verified columns and the D-12 divergence guard.
export function readFrontmatterField(mdContent, key) {
  const fmMatch = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return null;
  const line = fmMatch[1].split(/\r?\n/).find(l => l.startsWith(key + ':'));
  return line ? line.slice(key.length + 1).trim() : null;
}

// checkFilenameMapCoverage (PUB-03): fail closed if any Approved row has no
// filename-map.md entry -- a real divergence, never silently tolerated.
export function checkFilenameMapCoverage(approvedRows, filenameMap) {
  const missing = approvedRows.filter(r => !filenameMap.has(r.docId));
  return { missing };
}

// checkDocIdUniqueness (CR-01, D-11/PUB-04): every downstream join in this file
// (filenameMap, approvedIds/stagedIds) is Map/Set-keyed on Doc ID, which silently
// collapses duplicate keys. A duplicate Doc ID among Approved rows must fail closed
// BEFORE any of that Map/Set-keyed work runs -- otherwise one source document's
// converted output silently overwrites another's while the Set-based PUB-04 parity
// check reports clean (a partial bundle masquerading as complete).
export function checkDocIdUniqueness(approvedRows) {
  const counts = new Map();
  for (const r of approvedRows) {
    counts.set(r.docId, (counts.get(r.docId) || 0) + 1);
  }
  const duplicateDocIds = [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([docId]) => docId);
  return { duplicateDocIds };
}

// checkParity (PUB-04): every Approved RE-ID staged exactly once, no missing, no orphan.
export function checkParity(approvedIds, stagedIds) {
  const missing = [...approvedIds].filter(id => !stagedIds.has(id));
  const orphans = [...stagedIds].filter(id => !approvedIds.has(id));
  return { missing, orphans };
}

// checkDivergence (D-12): registry Status (EEE lifecycle) is a DIFFERENT vocabulary
// than each source doc's frontmatter `status:` key. Fail closed if any registry-
// Approved row's frontmatter status is literally Draft. sourceStatusLookup(docId)
// returns the frontmatter status string for that row (injected for self-test).
export function checkDivergence(approvedRows, sourceStatusLookup) {
  const divergent = [];
  for (const row of approvedRows) {
    const fmStatus = sourceStatusLookup(row.docId);
    if (fmStatus === 'Draft') {
      divergent.push({ docId: row.docId, path: row.path, frontmatterStatus: fmStatus });
    }
  }
  return { divergent };
}

// csvField (WR-01): quote+escape a CSV field if it contains a comma, quote, or
// newline. docId/outputFilename are already regex-constrained upstream and can't
// contain these, but status/lastVerified come straight from each doc's frontmatter
// with no charset restriction -- an unescaped comma/quote/newline there would
// silently shift that row's columns.
function csvField(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

// writeManifestCsv (D-03): {RE-ID, Output Filename, Status, Last Verified} only --
// NO source path, NO sha256 (docx bytes/hash are provably non-deterministic).
export function writeManifestCsv(rows, outPath) {
  const header = 'RE-ID,Output Filename,Status,Last Verified';
  const lines = rows.map(r => [r.docId, r.outputFilename, r.status, r.lastVerified].map(csvField).join(','));
  writeFileSync(outPath, [header, ...lines].join('\n') + '\n', 'utf8');
}

// validateSourcePathUnderDocs (T-126-02-02): resolved source Path must stay under docs/,
// reject any ".." traversal segment.
export function validateSourcePathUnderDocs(p) {
  if (typeof p !== 'string' || !p.startsWith('docs/')) return false;
  if (p.split('/').includes('..')) return false;
  return true;
}

// validateOutputFilename (T-126-02-03): output filename must match the D-05 slug charset.
export function validateOutputFilename(name) {
  return typeof name === 'string' && OUTPUT_FILENAME_RE.test(name);
}

// writeReadme (D-04): static, deterministic upload-instructions Markdown -- NO new Date(),
// no per-run timestamps, so the bundle contents stay reproducible in structure if not bytes.
export function readmeContent() {
  return [
    '# Docs Library -- Upload Instructions',
    '',
    'This bundle contains the entire Approved documentation corpus, converted to `.docx`',
    'for upload to the SharePoint document library that grounds Copilot Studio.',
    '',
    '## Contents',
    '',
    '- `*.docx` -- one file per Approved document. The filename IS the citation title shown',
    '  in Copilot Studio search results. Do not rename these files after upload.',
    '- `manifest.csv` -- RE-ID, Output Filename, Status, Last Verified for every bundled',
    '  document (operator reference only).',
    '- `README.md` -- this file (operator reference only).',
    '',
    '## Upload Steps',
    '',
    '1. Open the target SharePoint document library.',
    '2. Upload every `.docx` file in this bundle (drag-and-drop, or "Upload > Files").',
    '   Do **NOT** upload `manifest.csv` or `README.md` -- the SharePoint connector indexes',
    '   `.docx` files only; these two files exist purely for operator reference and, if',
    '   indexed, could surface as spurious search/citation results.',
    '3. Wait for the Copilot Studio connector to finish indexing the uploaded files.',
    '4. Spot-check a citation in Copilot Studio to confirm new/updated documents surface',
    '   with the expected filename as the citation title.',
    '',
    '## Notes',
    '',
    '- This is a full-corpus replacement bundle, not an incremental delta -- every run',
    '  regenerates every `.docx` from the current Approved registry (always-full rebuild).',
    '- `.docx` file bytes are not byte-for-byte reproducible across runs (pandoc embeds a',
    '  build timestamp in document properties); this is expected and does not affect',
    '  document content.',
    '',
  ].join('\n');
}

// ─── Subprocess helpers (T-126-02-01: argv-array execFileSync only) ──────────

function resolvePandocBin() {
  try {
    execFileSync('pandoc', ['--version'], { stdio: 'pipe', timeout: 10000 });
    return 'pandoc';
  } catch (e) {
    if (e.code === 'ENOENT' || e.status === 127) {
      const localAppData = process.env.LOCALAPPDATA;
      if (localAppData) {
        const fallback = join(localAppData, 'Pandoc', 'pandoc.exe');
        if (existsSync(fallback)) return fallback;
      }
      return null;
    }
    return 'pandoc';
  }
}

function preflightCheck() {
  const missing = [];
  try {
    execFileSync('pwsh', ['-NoProfile', '-Command', '$PSVersionTable.PSVersion.Major'], { stdio: 'pipe', timeout: 10000 });
  } catch (_e) {
    missing.push('pwsh (PowerShell 7+)');
  }
  if (!resolvePandocBin()) {
    missing.push('pandoc (PATH or %LOCALAPPDATA%\\Pandoc\\pandoc.exe)');
  }
  if (missing.length > 0) {
    process.stderr.write('FATAL: missing required tool(s) before starting the batch: ' + missing.join(', ') + '\n');
    process.exit(1);
  }
}

function convertOne(inputMd, outputDocx) {
  try {
    execFileSync('pwsh', [
      '-NoProfile', '-File', 'scripts/pipeline/convert.ps1',
      '-InputMd', inputMd, '-OutputDocx', outputDocx
    ], { stdio: 'pipe', cwd: process.cwd(), timeout: 60000 });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      detail: ((err.stdout || '') + (err.stderr || '')).toString().slice(0, 500)
    };
  }
}

function guardOne(docxPath) {
  try {
    execFileSync('node', ['scripts/pipeline/guard-docx.mjs', docxPath],
      { stdio: 'pipe', cwd: process.cwd(), timeout: 30000 });
    return { ok: true };
  } catch (err) {
    // WR-03: mirror convertOne's capture. guard-docx.mjs currently writes all its
    // diagnostics to stdout, but if it (or an ./lib/ooxml.mjs import) ever throws
    // an uncaught exception, times out, or writes to stderr, stdout-only capture
    // would silently drop that detail from the GUARD-FAIL message.
    return { ok: false, detail: ((err.stdout || '') + (err.stderr || '')).toString() };
  }
}

// ─── Batch orchestrator (main, non-self-test) ─────────────────────────────────

function runBatch() {
  process.stdout.write('build-publish-bundle -- Phase 126 PUB-01..04 batch orchestrator\n\n');

  preflightCheck();

  // T-126-02-03: regenerate filename-map.md as a build step -- never trust a stale copy.
  process.stdout.write('Regenerating filename-map.md...\n');
  try {
    execFileSync('node', ['scripts/pipeline/build-filename-map.mjs'], { stdio: 'inherit', cwd: process.cwd(), timeout: 30000 });
  } catch (_err) {
    process.stderr.write('FATAL: filename-map.md regeneration failed -- aborting (no zip)\n');
    process.exit(1);
  }

  const registryContent = readFile(REGISTRY_REL_PATH);
  if (!registryContent) {
    process.stderr.write('FATAL: registry not found at ' + REGISTRY_REL_PATH + '\n');
    process.exit(1);
  }
  const allRows = parseRegistry(registryContent);
  const approvedRows = allRows.filter(r => r.status === 'Approved');
  const excludedRows = allRows.filter(r => r.status !== 'Approved');

  if (approvedRows.length === 0) {
    process.stderr.write('FATAL: 0 Approved rows parsed from ' + REGISTRY_REL_PATH + ' -- refusing to build an empty bundle\n');
    process.exit(1);
  }

  // CR-01 (D-11/PUB-04): assert Doc ID uniqueness among Approved rows BEFORE any
  // Map/Set-keyed work below -- fail closed instead of letting a partial bundle
  // masquerade as complete.
  const docIdUniqueness = checkDocIdUniqueness(approvedRows);
  if (docIdUniqueness.duplicateDocIds.length > 0) {
    process.stderr.write(
      'FATAL: duplicate Doc ID(s) among Approved rows: ' + docIdUniqueness.duplicateDocIds.join(', ') +
      ' -- refusing to build (ambiguous filename-map join, PUB-04 cannot prove parity)\n'
    );
    process.exit(1);
  }

  const filenameMapContent = readFile(FILENAME_MAP_REL_PATH);
  if (!filenameMapContent) {
    process.stderr.write('FATAL: ' + FILENAME_MAP_REL_PATH + ' not found\n');
    process.exit(1);
  }
  const filenameMap = parseFilenameMap(filenameMapContent);

  // PUB-03: fail closed if any Approved RE-ID has no filename-map.md row.
  const coverage = checkFilenameMapCoverage(approvedRows, filenameMap);
  if (coverage.missing.length > 0) {
    process.stderr.write('FATAL: ' + coverage.missing.length + ' Approved RE-ID(s) missing from ' +
      FILENAME_MAP_REL_PATH + ': ' + coverage.missing.map(r => r.docId).join(', ') + '\n');
    process.exit(1);
  }

  // T-126-02-02/03 + D-12: validate paths/filenames and the frontmatter-status divergence
  // guard, all up front (input-integrity validation, not per-doc conversion failure).
  const sourceStatusCache = new Map();
  function sourceStatusLookup(docId) {
    if (sourceStatusCache.has(docId)) return sourceStatusCache.get(docId);
    const row = approvedRows.find(r => r.docId === docId);
    const src = row ? readFile(row.path) : null;
    const status = src ? readFrontmatterField(src, 'status') : null;
    sourceStatusCache.set(docId, status);
    return status;
  }

  const integrityFailures = [];
  for (const row of approvedRows) {
    if (!validateSourcePathUnderDocs(row.path)) {
      integrityFailures.push(row.docId + ': source Path "' + row.path + '" is not under docs/ or contains ".." (T-126-02-02)');
    }
    const outName = filenameMap.get(row.docId);
    if (!validateOutputFilename(outName)) {
      integrityFailures.push(row.docId + ': output filename "' + outName + '" fails the slug charset ^[a-z0-9-]+\\.docx$ (T-126-02-03)');
    }
    if (readFile(row.path) === null) {
      integrityFailures.push(row.docId + ': source file not found at ' + row.path);
    }
  }
  const divergence = checkDivergence(approvedRows, sourceStatusLookup);
  for (const d of divergence.divergent) {
    integrityFailures.push(d.docId + ': registry Status:Approved but frontmatter status:Draft (D-12 divergence guard)');
  }
  if (integrityFailures.length > 0) {
    process.stderr.write('\n=== INTEGRITY FAILURES ===\n');
    for (const f of integrityFailures) process.stderr.write('  ' + f + '\n');
    process.stderr.write('\n' + integrityFailures.length + ' integrity failure(s) -- fail-closed: NO zip written.\n');
    process.exit(1);
  }

  // Fresh staging dir every run (D-05 always-full rebuild -- never trust a stale staging dir).
  const stagingDir = join(process.cwd(), STAGING_DIR_REL);
  if (existsSync(stagingDir)) rmSync(stagingDir, { recursive: true, force: true });
  mkdirSync(stagingDir, { recursive: true });

  // Convert pass (D-06 sequential, D-07 collect-all-failures)
  process.stdout.write('\nConverting ' + approvedRows.length + ' Approved doc(s)...\n');
  const conversionFailures = [];
  const convertedDocs = [];
  for (const row of approvedRows) {
    const outName = filenameMap.get(row.docId);
    const outPath = join(stagingDir, outName);
    const result = convertOne(row.path, outPath);
    if (result.ok) {
      convertedDocs.push({ docId: row.docId, outName, outPath, srcPath: row.path });
      process.stdout.write(padLabel(row.docId) + 'CONVERT-OK\n');
    } else {
      conversionFailures.push({ docId: row.docId, path: row.path, detail: result.detail });
      process.stdout.write(padLabel(row.docId) + 'CONVERT-FAIL -- ' + result.detail + '\n');
    }
  }

  // Guard pass (sequential, one path per call, D-07 collect-all-failures)
  process.stdout.write('\nGuarding ' + convertedDocs.length + ' converted .docx...\n');
  const guardFailures = [];
  for (const doc of convertedDocs) {
    const result = guardOne(doc.outPath);
    if (result.ok) {
      process.stdout.write(padLabel(doc.docId) + 'GUARD-OK\n');
    } else {
      guardFailures.push({ docId: doc.docId, path: doc.outPath, detail: result.detail });
      process.stdout.write(padLabel(doc.docId) + 'GUARD-FAIL -- ' + result.detail + '\n');
    }
  }

  const totalFailures = conversionFailures.length + guardFailures.length;
  if (totalFailures > 0) {
    process.stderr.write('\n=== FAILURES ===\n');
    for (const f of conversionFailures) process.stderr.write('[CONVERT-FAIL] ' + f.docId + ' (' + f.path + '): ' + f.detail + '\n');
    for (const f of guardFailures) process.stderr.write('[GUARD-FAIL] ' + f.docId + ' (' + f.path + '): ' + f.detail + '\n');
    process.stderr.write('\n' + totalFailures + ' failure(s) -- fail-closed: NO zip written.\n');
    process.exit(1);
  }

  const guardFailedIds = new Set(guardFailures.map(f => f.docId));
  const stagedDocs = convertedDocs.filter(d => !guardFailedIds.has(d.docId));

  // Parity (PUB-04)
  const approvedIds = new Set(approvedRows.map(r => r.docId));
  const stagedIds = new Set(stagedDocs.map(d => d.docId));
  const parity = checkParity(approvedIds, stagedIds);
  if (parity.missing.length > 0 || parity.orphans.length > 0) {
    process.stderr.write('\nPARITY FAIL: missing=[' + parity.missing.join(',') + '] orphans=[' + parity.orphans.join(',') + '] -- fail-closed: NO zip written.\n');
    process.exit(1);
  }

  // Naming parity (PUB-03): staged basename must equal the committed filename-map.md value;
  // the staged/zipped set must equal EXACTLY the Approved rows' committed Output Filenames.
  const namingMismatches = stagedDocs.filter(d => d.outName !== filenameMap.get(d.docId));
  if (namingMismatches.length > 0) {
    process.stderr.write('\nNAMING PARITY FAIL: ' + namingMismatches.map(d => d.docId).join(', ') + ' -- fail-closed: NO zip written.\n');
    process.exit(1);
  }

  process.stdout.write(
    '\nRegistry parity: ' + approvedRows.length + ' Approved rows, ' + stagedIds.size +
    ' staged, ' + excludedRows.length + ' excluded, ' + parity.missing.length + ' missing, ' +
    parity.orphans.length + ' orphan.\n'
  );

  // Manifest (D-03)
  const manifestRows = stagedDocs.map(doc => {
    const srcContent = readFile(doc.srcPath);
    return {
      docId: doc.docId,
      outputFilename: doc.outName,
      status: readFrontmatterField(srcContent, 'status') || '',
      lastVerified: readFrontmatterField(srcContent, 'last_verified') || '',
    };
  });
  writeManifestCsv(manifestRows, join(stagingDir, 'manifest.csv'));

  // README (D-04)
  writeFileSync(join(stagingDir, 'README.md'), readmeContent(), 'utf8');

  // Promote + zip (D-07 atomic promote: dist/ zip is only ever written after every pass
  // above has succeeded -- a failure at any earlier stage leaves any prior zip untouched).
  // WR-02: Compress-Archive writes directly to the final path with -Force, so a failure
  // partway through THIS step (disk full, process killed, AV lock) could leave the
  // previous valid zip truncated/corrupt instead of preserved. Compress to a temp path
  // in the same directory first, then rename into place only on success -- node:fs
  // rename is atomic on the same volume, so the final zip is only ever the old file or
  // the fully-written new one, never a partial write.
  const distDirAbs = join(process.cwd(), DIST_DIR_REL);
  if (!existsSync(distDirAbs)) mkdirSync(distDirAbs, { recursive: true });
  const zipDest = join(distDirAbs, ZIP_NAME);
  const zipTmp = zipDest + '.tmp';
  const psCmd = 'Compress-Archive -Path "' + stagingDir + '\\*" -DestinationPath "' + zipTmp + '" -Force';
  try {
    execFileSync('pwsh', ['-NoProfile', '-Command', psCmd], { stdio: 'pipe', cwd: process.cwd(), timeout: 120000 });
    renameSync(zipTmp, zipDest);
  } catch (err) {
    try { rmSync(zipTmp, { force: true }); } catch (_cleanupErr) { /* best-effort */ }
    process.stderr.write('FATAL: Compress-Archive failed: ' + ((err.stdout || '') + (err.stderr || '')).toString() + '\n');
    process.exit(1);
  }

  process.stdout.write('\nWrote ' + zipDest + '\n');
  process.stdout.write('Batch complete: ' + stagedIds.size + ' docx converted+guarded+staged, 0 errors.\n');
  process.exit(0);
}

// ─── Self-test mode (--self-test) ─────────────────────────────────────────────
if (isMainModule && SELF_TEST) {
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

  // (b2) WR-01: CSV manifest escapes a comma/quote in a frontmatter-sourced field
  stTry('(b2) WR-01 CSV manifest escapes comma/quote fields', () => {
    const rows = [{ docId: 'RE-002', outputFilename: 'bar.docx', status: 'Approved, pending review', lastVerified: '2026-01-01' }];
    const tmpDir = join(process.cwd(), '.pipeline-output');
    if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });
    const tmpPath = join(tmpDir, 'st-manifest-escape-test.csv');
    writeManifestCsv(rows, tmpPath);
    const written = readFileSync(tmpPath, 'utf8');
    const expected = 'RE-ID,Output Filename,Status,Last Verified\nRE-002,bar.docx,"Approved, pending review",2026-01-01\n';
    stAssert('(b2) WR-01 CSV manifest escapes comma/quote fields', written === expected, 'got: ' + JSON.stringify(written));
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

  // (c2) CR-01: Doc ID uniqueness check fails closed on a synthetic duplicate Doc ID
  stTry('(c2) CR-01 Doc ID uniqueness fails closed on synthetic duplicate', () => {
    const approvedSynthetic = [
      { docId: 'RE-901', path: 'docs/x.md' },
      { docId: 'RE-902', path: 'docs/y.md' },
      { docId: 'RE-901', path: 'docs/z.md' }, // duplicate Doc ID, distinct path
    ];
    const result = checkDocIdUniqueness(approvedSynthetic);
    stAssert(
      '(c2) CR-01 Doc ID uniqueness fails closed on synthetic duplicate',
      result.duplicateDocIds.length === 1 && result.duplicateDocIds[0] === 'RE-901',
      'duplicateDocIds=' + result.duplicateDocIds.join(',')
    );
  });

  // (c3) CR-01: Doc ID uniqueness check passes clean on all-unique Approved rows
  stTry('(c3) CR-01 Doc ID uniqueness passes clean on all-unique rows', () => {
    const approvedSynthetic = [
      { docId: 'RE-801', path: 'docs/a.md' },
      { docId: 'RE-802', path: 'docs/b.md' },
    ];
    const result = checkDocIdUniqueness(approvedSynthetic);
    stAssert(
      '(c3) CR-01 Doc ID uniqueness passes clean on all-unique rows',
      result.duplicateDocIds.length === 0,
      'duplicateDocIds=' + result.duplicateDocIds.join(',')
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

  // (e) T-126-02-02/03 defense-in-depth validators reject bad input, accept good input
  stTry('(e1) validateSourcePathUnderDocs rejects traversal / non-docs paths', () => {
    const ok = validateSourcePathUnderDocs('docs/foo/bar.md') === true &&
      validateSourcePathUnderDocs('docs/../secrets.md') === false &&
      validateSourcePathUnderDocs('../etc/passwd') === false &&
      validateSourcePathUnderDocs('scripts/pipeline/evil.md') === false;
    stAssert('(e1) validateSourcePathUnderDocs rejects traversal / non-docs paths', ok);
  });
  stTry('(e2) validateOutputFilename enforces the D-05 slug charset', () => {
    const ok = validateOutputFilename('device-not-registered.docx') === true &&
      validateOutputFilename('Bad Name.docx') === false &&
      validateOutputFilename('no-extension') === false &&
      validateOutputFilename('../escape.docx') === false;
    stAssert('(e2) validateOutputFilename enforces the D-05 slug charset', ok);
  });

  process.stdout.write('\n' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// ─── Main (non-self-test): run the full batch ─────────────────────────────────
if (isMainModule && !SELF_TEST) {
  // WR-04: every EXPECTED failure path already uses a structured FATAL:/=== FAILURES ===
  // message before process.exit(1). This try/catch is the backstop for an UNEXPECTED
  // exception (e.g. a permission-denied read, or a bug in a helper) so it goes through
  // the tool's own reporting format instead of a raw Node stack trace -- Node's default
  // behavior already exits non-zero on an uncaught throw, so the fail-closed *exit code*
  // contract already held; this fixes the *reporting* contract.
  try {
    runBatch();
  } catch (err) {
    process.stderr.write('FATAL: unexpected error: ' + (err.stack || err.message) + '\n');
    process.exit(1);
  }
}
