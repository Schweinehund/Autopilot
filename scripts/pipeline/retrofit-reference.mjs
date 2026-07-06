#!/usr/bin/env node
// retrofit-reference.mjs -- Mechanical EEE retrofit helper (Phase 118 D-118-4, forked from retrofit-guide.mjs)
//
// Fork of scripts/pipeline/retrofit-guide.mjs (Phase 117). Do NOT refactor the 117 script
// in place -- it is a shipped, Approved deliverable; a shared refactor risks regressing it.
// This fork targets the docs/reference/ + docs/error-codes/ + 2 bare comparison-doc corpus
// with doc_type: Reference + a uniform owner, and adds Version-History column-shape detection
// (the load-bearing NEW mechanical fix this phase requires -- see detectVhColumnCount below).
//
// Performs the deterministic half of every reference doc EEE retrofit:
//   - Injects doc_id (joined from RE-index.md by path), status: Approved,
//     owner: Intune Admin Lead (uniform, D-04 carried), doc_type: Reference into frontmatter
//   - Injects platform: Windows for the 10 enrolled keyless files (7 error-codes +
//     reference/powershell-ref.md + reference/registry-paths.md + apv1-vs-apv2.md)
//   - Emits the EEE block line (Platform · Doc Type · Doc ID · Status)
//   - Relocates the ENTIRE pre-H1 span (gate blockquote + any 2nd blockquote + HTML
//     comments, in original order) to after ## Summary placeholder -- carries the 117 fix
//     verbatim (this corpus is structurally simpler: at most 1 blockquote group, 0 HTML
//     comments per file, confirmed by RESEARCH.md Pattern 1 -- but the general
//     non-conditional implementation is kept unchanged)
//   - Inserts ## Summary section with [FILL-IN] placeholder (reference-template Summary lead --
//     there is only ONE reference template, no per-platform branching this phase)
//   - Version History: DETECTS an existing section's column count (2-col vs 3-col) and
//     PREPENDS a matching-width row for the 13 files that already have one; CREATES a new
//     3-column section for the 21 files that don't (Open Question 1 lock -- matches 116/117
//     corpus-wide precedent)
//
// Guards: path allowlist (docs/reference/, docs/error-codes/ dirs PLUS the 2 bare single
// files docs/apv1-vs-apv2.md and docs/windows-vs-macos.md), hard-exclusion of the 1
// mermaid-deferred file (fails CLOSED -- ERROR, never a silent skip -- if invoked against it
// by explicit path, per D-05), TEMPLATE-SENTINEL (refuses 1970-01-01), doc_id must resolve
// in RE-index.md, platform must be in D1_MAP.
//
// Does NOT author Summary prose, author per-table D-118-1 prose, fix C17 #12 blockquotes,
// or edit RE-index.md. Those are batch-plan hand-work (118-02 through 118-05).
//
// Usage:
//   node scripts/pipeline/retrofit-reference.mjs --dry-run --all
//   node scripts/pipeline/retrofit-reference.mjs --dry-run [file...]
//   node scripts/pipeline/retrofit-reference.mjs --all           (writes files)
//   node scripts/pipeline/retrofit-reference.mjs --self-test
//
// Exit 0: all target files processed cleanly (or self-test passes)
// Exit 1: any ERROR (unresolved doc_id, unmapped platform, sentinel, path violation,
//         mermaid-deferred explicit invocation)

// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync, readdirSync, lstatSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE  = argv.includes('--verbose');
const DRY_RUN  = argv.includes('--dry-run');
const ALL      = argv.includes('--all');
const SELF_TEST = argv.includes('--self-test');

// Positional args (file paths, not flags)
const filePaths = argv.filter(a => !a.startsWith('--'));

// === D1 map: copy verbatim from c17-eee-contract.mjs lines 26-47 ===
// NEVER diverge -- any difference causes C17 #9/#10 failures (PATTERNS.md D1_MAP rule)
const D1_MAP = {
  'Windows':                      'Windows',
  'windows':                      'Windows',
  'macOS':                        'macOS',
  'macos':                        'macOS',
  'iOS':                          'iOS',
  'ios':                          'iOS',
  'Android':                      'Android',
  'android':                      'Android',
  'Linux':                        'Linux',
  'linux':                        'Linux',
  'all':                          'All Platforms',
  'windows+macos+ios+android+linux': 'All Platforms',
  'cross-platform':               'Cross-Platform',
  'apple-tv':                     'Apple TV',
  'iOS,Android':                  'iOS + Android',
  'ios+macos':                    'iOS + macOS',
  'ios+ipados+macos':             'iOS / iPadOS / macOS',
  'ios+ipados+macos+tvos':        'iOS / iPadOS / macOS / tvOS',
  'ios+macos+shared-ipad':        'iOS + macOS + Shared iPad',
  'ios+shared-ipad':              'iOS + Shared iPad',
};

// Registry path (relative to cwd)
const REGISTRY_PATH = 'docs/_registry/RE-index.md';

// === Fork-specific: path allowlist (2 dirs + 2 single files) + D-05 mermaid hard-exclusion ===

const REFERENCE_DIRS = [
  'docs/reference/',
  'docs/error-codes/',
];

// The 2 bare single files enrolled this phase (not under either allowlisted dir) -- 117's
// allowlist was directory-only; a direct copy would silently reject these two.
const REFERENCE_SINGLE_FILES = new Set([
  'docs/apv1-vs-apv2.md',
  'docs/windows-vs-macos.md',
]);

// D-05: the 1 mermaid-deferred reference file -- hard-excluded, deferred to v1.16. Never
// enumerated under --all; fails CLOSED (ERROR) if invoked against it by explicit path.
const MERMAID_DEFERRED_PATHS = new Set([
  'docs/reference/ca-enrollment-timing.md',
]);

// === Helpers (verbatim from retrofit-guide.mjs) ===

const LABEL_WIDTH = 72;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// readFile: returns content with CRLF normalized, or null if missing.
// CRLF normalization is mandatory -- Windows repo files contain \r\n.
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// walkMd: recursive .md file walker using lstatSync (avoids symlink cycles)
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
      if (stat.isSymbolicLink()) continue; // do not follow; avoids infinite recursion
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}

// relNormalize: strip CWD prefix and normalize backslashes to forward-slashes.
function relNormalize(abs) {
  return abs
    .replace(process.cwd() + '\\', '')
    .replace(process.cwd() + '/', '')
    .replace(/\\/g, '/');
}

// === Registry ===

/**
 * Parse RE-index.md and return a Map<relativePath, docId>.
 * Joins on the Path column (column 2) only -- never on title or order.
 * Example: Map { 'docs/reference/android-capability-matrix.md' => 'RE-144' }
 */
function buildDocIdMap(registryPath) {
  const content = readFile(registryPath);
  if (!content) return new Map();
  const map = new Map();
  for (const line of content.split('\n')) {
    // Match data rows: | RE-NNN | docs/path/to/file.md | ...
    const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^|]+?)\s*\|/);
    if (m) map.set(m[2].trim(), m[1].trim());
  }
  return map;
}

// === Version-History helpers ===

/**
 * Detect the column count of an EXISTING ## Version History table's header row.
 * Scans forward from vhIdx (the heading line index) for the first data/header row
 * that isn't a separator row, and counts pipe-delimited cells. Returns null if no
 * table row is found within the scan window (treated as CREATE by the caller).
 *
 * NEVER assume 3-column -- 8/13 pre-existing tables in this corpus are 2-column
 * (RESEARCH.md Pattern 2 / Pitfall 1). This is the load-bearing NEW fix this phase requires.
 */
function detectVhColumnCount(lines, vhIdx) {
  for (let i = vhIdx + 1; i < Math.min(vhIdx + 5, lines.length); i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && !/^\|[-: |]+\|$/.test(line)) {
      // header row: count pipe-delimited cells (exclude the leading/trailing empty split)
      return line.split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).length;
    }
  }
  return null; // section truly absent (or malformed) -- CREATE branch
}

const NEW_ROW_2COL = '| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed |';
const NEW_ROW_3COL = '| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |';

/**
 * Insert the v1.15 EEE reformat row as the first data row under ## Version History.
 * If the section is absent (21/34 files), CREATE it at end of file with a 3-column
 * shape (Open Question 1 lock: matches 116/117 corpus-wide precedent).
 * If the section is PRESENT (13/34 files), detect its column count and PREPEND a
 * matching-width row -- NEVER assume 3-column (Pitfall 1).
 * Returns { lines: string[], action: 'prepended' | 'created', colCount: number }.
 */
function insertVersionHistoryRow(lines) {
  const newLines = [...lines];
  const vhIdx = newLines.findIndex(l => /^## Version History\b/.test(l));

  if (vhIdx === -1) {
    // Create section at end of file, 3-column shape (Open Question 1 lock)
    while (newLines.length > 0 && newLines[newLines.length - 1].trim() === '') newLines.pop();
    newLines.push('', '## Version History', '', '| Date | Change | Author |', '|------|--------|--------|', NEW_ROW_3COL);
    return { lines: newLines, action: 'created', colCount: 3 };
  }

  // Detect the existing table's column count BEFORE constructing the new row
  const colCount = detectVhColumnCount(newLines, vhIdx);
  const newRow = colCount === 2 ? NEW_ROW_2COL : NEW_ROW_3COL; // 3-col is the safe default
                                                                // if detection is inconclusive

  // Find the separator row (|---|...) and insert after it
  let insertIdx = -1;
  for (let i = vhIdx + 1; i < newLines.length; i++) {
    if (/^\|[-: |]+\|/.test(newLines[i])) {
      insertIdx = i + 1;
      break;
    }
    // Stop scanning if we leave the table
    if (newLines[i].trim() !== '' && !newLines[i].startsWith('|')) break;
  }

  if (insertIdx !== -1) {
    newLines.splice(insertIdx, 0, newRow);
    return { lines: newLines, action: 'prepended', colCount: colCount ?? 3 };
  }

  // Fallback: insert after the first table row (header) we find
  for (let i = vhIdx + 1; i < newLines.length; i++) {
    if (newLines[i].startsWith('|')) {
      newLines.splice(i + 1, 0, newRow);
      return { lines: newLines, action: 'prepended', colCount: colCount ?? 3 };
    }
  }

  // Last resort: append at end
  newLines.push(newRow);
  return { lines: newLines, action: 'prepended', colCount: colCount ?? 3 };
}

// === Core transform ===

/**
 * Process one reference doc file: parse, validate guards, compute transform, return result.
 *
 * @param {string} absPath - absolute path to the .md file
 * @param {Map<string,string>} docIdMap - built from buildDocIdMap()
 * @returns {{ ok: boolean, rel: string, error?: string,
 *             docId?: string, d1Label?: string, platform?: string,
 *             platformInjected?: boolean, preH1SpanLineCount?: number,
 *             preH1SpanOriginalBytes?: number, preH1SpanRelocatedBytes?: number,
 *             vhAction?: string, vhColCount?: number, newContent?: string }}
 */
function processFile(absPath, docIdMap) {
  const rel = relNormalize(absPath);

  // Guard 1: path allowlist -- the 2 docs/reference|error-codes/ dirs OR the 2 bare files
  const inAllowlist = REFERENCE_DIRS.some(d => rel.startsWith(d)) || REFERENCE_SINGLE_FILES.has(rel);
  if (!inAllowlist) {
    return { ok: false, rel, error: 'PATH-ALLOWLIST: path not in docs/reference/, docs/error-codes/, or the 2 enrolled comparison docs' };
  }

  // Guard 1b (D-05): hard-exclude the 1 mermaid-deferred file -- fail CLOSED, never a
  // silent skip, so the script itself enforces D-05 even against an explicit invocation.
  if (MERMAID_DEFERRED_PATHS.has(rel)) {
    return { ok: false, rel, error: 'MERMAID-DEFERRED: ca-enrollment-timing.md is the D-05 carve-out -- deferred to v1.16, refusing to process' };
  }

  // Read and normalize
  const content = readFile(rel);
  if (!content) {
    return { ok: false, rel, error: 'file not found or unreadable' };
  }

  // Parse frontmatter using multiline regex (m flag: ^ matches at ANY line boundary)
  // NEVER use content.startsWith('---') -- some files may have HTML-comment preamble
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
  if (!fmMatch) {
    return { ok: false, rel, error: 'no YAML frontmatter found' };
  }
  const fm = fmMatch[1];

  // Guard 2: TEMPLATE-SENTINEL -- refuse 1970-01-01 (prevents C17 #9/#12 false-pass)
  const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
  const lastVerified = lvMatch ? lvMatch[1] : null;
  if (lastVerified === '1970-01-01') {
    return { ok: false, rel, error: 'SENTINEL-GUARD: last_verified is 1970-01-01 (TEMPLATE-SENTINEL) — refusing to process' };
  }

  // Guard 3: doc_id must resolve in registry (join on path)
  const docId = docIdMap.get(rel);
  if (!docId) {
    return { ok: false, rel, error: 'DOC-ID-UNRESOLVED: path not found in RE-index.md: ' + rel };
  }

  // Platform: detect presence in frontmatter; inject Windows if absent
  // (the 10 enrolled keyless files -- 7 error-codes + powershell-ref.md + registry-paths.md +
  // apv1-vs-apv2.md; the /^platform:\s*.../m presence-only test never matches applies_to)
  const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
  let platform = platformMatch ? platformMatch[1] : null;
  const platformInjected = (platform === null);
  if (platformInjected) platform = 'Windows';

  // Guard 4: platform must resolve in D1_MAP (hard failure, no fallback)
  const d1Label = D1_MAP[platform];
  if (d1Label === undefined) {
    return { ok: false, rel, error: 'UNMAPPED-PLATFORM: platform "' + platform + '" not in D1_MAP' };
  }

  // Owner: uniform constant (D-04 carried) -- frontmatter-only, never rendered in the block
  const owner = 'Intune Admin Lead';

  // Build new frontmatter: 4 new keys at top, then inject platform if absent, then original fm
  const newFm =
    'doc_id: ' + docId + '\n' +
    'status: Approved\n' +
    'owner: ' + owner + '\n' +
    'doc_type: Reference\n' +
    (platformInjected ? 'platform: Windows\n' : '') +
    fm;

  // Body extraction: +1 skips the \n after the closing ---
  const bodyStart = fmMatch.index + fmMatch[0].length + 1;
  const bodyContent = content.slice(bodyStart);
  const bodyLines = bodyContent.split('\n');

  // Find first H1 (not inside a code fence)
  let inFence = false, fenceChar = '', fenceLen = 0;
  let firstH1Idx = -1;
  for (let i = 0; i < bodyLines.length; i++) {
    const mf = bodyLines[i].match(/^(`{3,}|~{3,})/);
    if (!inFence && mf) {
      inFence = true; fenceChar = mf[1][0]; fenceLen = mf[1].length;
    } else if (inFence && mf && mf[1][0] === fenceChar && mf[1].length >= fenceLen) {
      inFence = false;
    } else if (!inFence && /^# [^#]/.test(bodyLines[i])) {
      firstH1Idx = i;
      break;
    }
  }
  if (firstH1Idx === -1) {
    return { ok: false, rel, error: 'no H1 heading found in body' };
  }

  // === WHOLE-PRE-H1-SPAN RELOCATION (117 fix, carried verbatim) ===
  // Capture the ENTIRE span between the frontmatter close and the first H1 -- blockquote
  // runs, HTML comments, blank lines, regardless of shape -- and trim ONLY genuinely
  // leading/trailing blank lines, preserving internal ordering and blank-line structure
  // exactly as authored. Match by structural position ONLY -- never on a literal
  // "Version gate"/"Platform gate"/"Framework coverage" string.
  const preH1Raw = bodyLines.slice(0, firstH1Idx);
  let spanStart = 0;
  while (spanStart < preH1Raw.length && preH1Raw[spanStart].trim() === '') spanStart++;
  let spanEnd = preH1Raw.length - 1;
  while (spanEnd >= spanStart && preH1Raw[spanEnd].trim() === '') spanEnd--;
  const preH1Span = (spanStart <= spanEnd) ? preH1Raw.slice(spanStart, spanEnd + 1) : [];
  const preH1SpanOriginalBytes = Buffer.byteLength(preH1Span.join('\n'), 'utf8');

  const h1Line = bodyLines[firstH1Idx];
  const bodyAfterH1Lines = bodyLines.slice(firstH1Idx + 1);

  // Version-History: detect existing section + column shape, PREPEND matching-width row,
  // or CREATE a new 3-column section (see insertVersionHistoryRow / detectVhColumnCount)
  const vhResult = insertVersionHistoryRow(bodyAfterH1Lines);
  const processedBodyAfterH1 = vhResult.lines;

  // EEE block line: Platform · Doc Type · Doc ID · Status (U+00B7 middle-dot separator)
  // Field order is fixed; owner NEVER appears in the block (Phase-114 D-01)
  const blockLine =
    '**Platform:** ' + d1Label +
    ' · **Doc Type:** Reference' +
    ' · **Doc ID:** ' + docId +
    ' · **Status:** Approved';

  // Summary placeholder (executor hand-authors >=30 words of real prose, reference-template
  // Summary lead -- there is only ONE reference template, no per-platform branching)
  const fillIn = '[FILL-IN: >=30 words, reference-template Summary lead]';

  // Assemble new body:
  // blank → block line → blank → H1 → blank → ## Summary → blank → [FILL-IN]
  //   → blank → relocated whole pre-H1 span (if present) → blank → remaining body after H1
  const newBodyParts = [
    '',
    blockLine,
    '',
    h1Line,
    '',
    '## Summary',
    '',
    fillIn,
    '',
  ];

  let relocatedSpanStartIdx = -1;
  if (preH1Span.length > 0) {
    relocatedSpanStartIdx = newBodyParts.length;
    newBodyParts.push(...preH1Span);
    newBodyParts.push('');
  }

  // Independent re-derivation from the actual assembled output (not the reused array
  // reference) -- catches any bug in the join/emission logic itself, not just in the
  // capture logic. This is the per-file byte-length-preservation proof.
  const preH1SpanRelocatedBytes = (relocatedSpanStartIdx !== -1)
    ? Buffer.byteLength(newBodyParts.slice(relocatedSpanStartIdx, relocatedSpanStartIdx + preH1Span.length).join('\n'), 'utf8')
    : 0;

  // Append body-after-H1, trimming leading blank lines (we already emitted a blank above)
  let bStart = 0;
  while (bStart < processedBodyAfterH1.length && processedBodyAfterH1[bStart].trim() === '') bStart++;
  newBodyParts.push(...processedBodyAfterH1.slice(bStart));

  const newContent = '---\n' + newFm + '\n---\n' + newBodyParts.join('\n');

  return {
    ok: true,
    rel,
    docId,
    d1Label,
    platform,
    platformInjected,
    preH1SpanLineCount: preH1Span.length,
    preH1SpanOriginalBytes,
    preH1SpanRelocatedBytes,
    vhAction: vhResult.action,
    vhColCount: vhResult.colCount,
    newContent,
  };
}

// === Self-test mode (--self-test) ===
// Seven in-memory fixture sub-tests: the 6 inherited guard proofs (adapted to the reference
// corpus + Reference doc_type + 2-dir/2-file allowlist) plus a 7th NEW sub-test proving the
// VH column-shape detection fix (this phase's signature defect regression).

if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  process.stdout.write('retrofit-reference --self-test (Phase 118 D-118-4 guard + VH-column-detection proof)\n\n');

  // (a) buildDocIdMap parses a sample RE-index reference row to the correct RE-NNN
  {
    const sampleRegistry = [
      '| Doc ID | Path | Title | Doc Type | Status |',
      '|--------|------|-------|----------|--------|',
      '| RE-144 | docs/reference/android-capability-matrix.md | Intune: Android Capability Matrix — Modes by Feature | Reference | Pending |',
      '| RE-168 | docs/error-codes/00-index.md | Error Code Index | Reference | Pending |',
    ].join('\n');
    const syntheticMap = new Map();
    for (const line of sampleRegistry.split('\n')) {
      const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^|]+?)\s*\|/);
      if (m) syntheticMap.set(m[2].trim(), m[1].trim());
    }
    const got = syntheticMap.get('docs/reference/android-capability-matrix.md');
    stAssert(
      '(a) buildDocIdMap: sample registry row → correct RE-NNN',
      got === 'RE-144',
      got === 'RE-144' ? 'got RE-144 as expected' : 'got "' + got + '" (expected RE-144)'
    );
  }

  // (b) Keyless error-codes fixture (applies_to: both, no platform: key) triggers
  //     platform: Windows injection and resolves the D1 label Windows
  {
    const fmLines = ['last_verified: 2026-04-13', 'review_by: 2026-07-12', 'applies_to: both', 'audience: both'];
    const fm = fmLines.join('\n');
    const hasPlatform = /^platform:/m.test(fm);
    const injectedPlatform = !hasPlatform ? 'Windows' : null;
    const d1Label = injectedPlatform ? D1_MAP[injectedPlatform] : undefined;
    stAssert(
      '(b) Keyless error-codes fixture (applies_to: both): no platform key → injection = Windows, D1 label = Windows',
      injectedPlatform === 'Windows' && d1Label === 'Windows',
      'injectedPlatform=' + injectedPlatform + ' d1Label=' + d1Label
    );
  }

  // (c) android-capability fixture resolves D1 label Android
  {
    const rawPlatform = 'Android';
    const label = D1_MAP[rawPlatform];
    stAssert(
      '(c) D1_MAP: Android → Android',
      label === 'Android',
      label === 'Android' ? 'D1 label correct' : 'got "' + label + '" (expected "Android")'
    );
  }

  // (d) last_verified: 1970-01-01 fixture is REFUSED (SENTINEL guard)
  {
    const sentinelDate = '1970-01-01';
    const lvMatch = ('last_verified: 1970-01-01 # TEMPLATE-SENTINEL').match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
    const refused = lvMatch && lvMatch[1] === sentinelDate;
    stAssert(
      '(d) SENTINEL-GUARD: last_verified 1970-01-01 is refused',
      refused === true,
      refused ? 'sentinel correctly detected — would refuse to write' : 'BUG: sentinel not detected'
    );
  }

  // (e) Path outside the allowlist AND the mermaid-deferred path are both REFUSED, while the
  //     2 bare single files ARE accepted (the new allowlist-union proof)
  {
    const outsidePaths = [
      'docs/l1-runbooks/01-device-not-registered.md',
      'docs/admin-setup-ios/02-abm-token.md',
      'scripts/validation/c17-eee-contract.mjs',
    ];
    const insideDirPaths = [
      'docs/reference/android-capability-matrix.md',
      'docs/error-codes/00-index.md',
    ];
    const insideSingleFiles = [
      'docs/apv1-vs-apv2.md',
      'docs/windows-vs-macos.md',
    ];
    const mermaidPath = 'docs/reference/ca-enrollment-timing.md';

    const isAllowed = (p) => REFERENCE_DIRS.some(d => p.startsWith(d)) || REFERENCE_SINGLE_FILES.has(p);

    const allOutsideRefused = outsidePaths.every(p => !isAllowed(p));
    const allInsideDirsAllowed = insideDirPaths.every(p => isAllowed(p) && !MERMAID_DEFERRED_PATHS.has(p));
    const allSingleFilesAllowed = insideSingleFiles.every(p => isAllowed(p) && !MERMAID_DEFERRED_PATHS.has(p));
    const mermaidRefused = MERMAID_DEFERRED_PATHS.has(mermaidPath);

    stAssert(
      '(e) PATH-ALLOWLIST UNION + D-05: outside paths refused, mermaid-deferred path refused, both dirs AND both bare single files allowed',
      allOutsideRefused && allInsideDirsAllowed && allSingleFilesAllowed && mermaidRefused,
      'outsideRefused=' + allOutsideRefused + ' dirsAllowed=' + allInsideDirsAllowed +
        ' singleFilesAllowed=' + allSingleFilesAllowed + ' mermaidRefused=' + mermaidRefused
    );
  }

  // (f) Inherited whole-pre-H1-span relocation byte-length-preservation proof (117 fix,
  //     re-proven against a reference-corpus fixture with a single blockquote group)
  {
    const synthetic =
      '---\n' +
      'last_verified: 2026-04-14\n' +
      'review_by: 2026-07-13\n' +
      'applies_to: both\n' +
      'audience: admin\n' +
      'platform: iOS\n' +
      '---\n' +
      '\n' +
      '> **Platform gate:** This reference covers iOS/iPadOS capability rows only.\n' +
      '> For other platforms, see the 5-platform capability comparison.\n' +
      '\n' +
      '# Synthetic Span-Fix Test Title\n' +
      '\n' +
      'Body content here.\n';

    const fixtureRel = 'docs/reference/__self-test-span-fixture.md';
    const fixtureAbs = join(process.cwd(), fixtureRel);
    let fPassed = false;
    let fDetail = '';
    try {
      writeFileSync(fixtureAbs, synthetic, 'utf8');
      const synMap = new Map([[fixtureRel, 'RE-T99']]);
      const result = processFile(fixtureAbs, synMap);
      if (!result.ok) {
        fDetail = 'processFile returned ERROR: ' + result.error;
      } else {
        const bytesMatch = result.preH1SpanOriginalBytes === result.preH1SpanRelocatedBytes;
        const expectedLineCount = 2; // 2 blockquote lines, no blank/HTML-comment in this fixture
        const lineCountOk = result.preH1SpanLineCount === expectedLineCount;
        const hasBlockquote = result.newContent.includes('Platform gate');
        fPassed = bytesMatch && lineCountOk && hasBlockquote;
        fDetail = 'origBytes=' + result.preH1SpanOriginalBytes + ' relocBytes=' + result.preH1SpanRelocatedBytes +
          ' lineCount=' + result.preH1SpanLineCount + ' (expected ' + expectedLineCount + ')' +
          ' blockquotePresent=' + hasBlockquote;
      }
    } finally {
      try { unlinkSync(fixtureAbs); } catch { /* best effort cleanup */ }
    }

    stAssert(
      '(f) WHOLE-PRE-H1-SPAN FIX (117 inherited): single-blockquote-group fixture relocates with byte-length equality',
      fPassed,
      fDetail
    );
  }

  // (g) NEW: VH-column-detection regression -- a 2-column existing table yields a 2-cell
  //     row; a companion 3-column fixture yields a 3-cell row (this phase's signature
  //     defect class -- Pitfall 1)
  {
    const twoColBody = [
      'Some body content.',
      '',
      '## Version History',
      '',
      '| Date | Change |',
      '|------|--------|',
      '| 2026-04-13 | Updated frontmatter and version gate |',
      '| 2026-03-14 | Initial creation |',
    ];
    const threeColBody = [
      'Some body content.',
      '',
      '## Version History',
      '',
      '| Date | Change | Author |',
      '|------|--------|--------|',
      '| 2026-04-30 | Phase 58 D-14 change | -- |',
    ];

    const twoColResult = insertVersionHistoryRow(twoColBody);
    const threeColResult = insertVersionHistoryRow(threeColBody);

    const twoColVhIdx = twoColResult.lines.findIndex(l => /^## Version History\b/.test(l));
    const twoColNewRow = twoColResult.lines[twoColVhIdx + 4]; // heading, blank, header, sep, NEW ROW
    const twoColCellCount = twoColNewRow.split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).length;

    const threeColVhIdx = threeColResult.lines.findIndex(l => /^## Version History\b/.test(l));
    const threeColNewRow = threeColResult.lines[threeColVhIdx + 4];
    const threeColCellCount = threeColNewRow.split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).length;

    const pass = twoColResult.action === 'prepended' && twoColResult.colCount === 2 && twoColCellCount === 2 &&
      threeColResult.action === 'prepended' && threeColResult.colCount === 3 && threeColCellCount === 3;

    stAssert(
      '(g) VH-COLUMN-DETECTION (NEW this phase): 2-col existing table → 2-cell row; 3-col existing table → 3-cell row',
      pass,
      'twoCol: action=' + twoColResult.action + ' colCount=' + twoColResult.colCount + ' cellsInNewRow=' + twoColCellCount +
        ' | threeCol: action=' + threeColResult.action + ' colCount=' + threeColResult.colCount + ' cellsInNewRow=' + threeColCellCount
    );
  }

  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// === Main runner ===

function main() {
  const docIdMap = buildDocIdMap(REGISTRY_PATH);

  if (docIdMap.size === 0) {
    process.stderr.write('ERROR: RE-index.md not found or contains no RE-NNN rows at: ' + REGISTRY_PATH + '\n');
    process.exit(1);
  }

  let targetAbsPaths = [];

  if (ALL) {
    const allDirPaths = REFERENCE_DIRS.flatMap(d => walkMd(d));
    const singleFileAbsPaths = [...REFERENCE_SINGLE_FILES].map(p => join(process.cwd(), p)).filter(existsSync);
    const merged = [...allDirPaths, ...singleFileAbsPaths];
    // Exclude the mermaid-deferred file from --all enumeration entirely (D-05) -- it must
    // never be enumerated, not merely "expected to fail".
    targetAbsPaths = merged.filter(abs => !MERMAID_DEFERRED_PATHS.has(relNormalize(abs)));
    if (targetAbsPaths.length === 0) {
      process.stderr.write('ERROR: --all found no enrollable .md files under docs/reference/, docs/error-codes/, or the 2 enrolled comparison docs\n');
      process.exit(1);
    }
  } else if (filePaths.length > 0) {
    targetAbsPaths = filePaths.map(p => {
      if (p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p)) return p;
      return join(process.cwd(), p);
    });
  } else {
    process.stderr.write('Usage: node scripts/pipeline/retrofit-reference.mjs [--dry-run] [--verbose] <file...>\n');
    process.stderr.write('       node scripts/pipeline/retrofit-reference.mjs [--dry-run] [--verbose] --all\n');
    process.stderr.write('       node scripts/pipeline/retrofit-reference.mjs --self-test\n');
    process.exit(1);
  }

  let errors = 0;
  let processed = 0;
  let injectedCount = 0;
  let prepend2col = 0;
  let prepend3col = 0;
  let created = 0;

  if (DRY_RUN) {
    process.stdout.write('retrofit-reference --dry-run' + (ALL ? ' --all' : '') + ': ' + targetAbsPaths.length + ' target file(s)\n\n');
  }

  for (const absPath of targetAbsPaths) {
    const result = processFile(absPath, docIdMap);
    const label = result.rel || relNormalize(absPath);

    if (!result.ok) {
      errors++;
      process.stdout.write(padLabel(label) + 'ERROR -- ' + result.error + '\n');
    } else {
      processed++;
      if (result.platformInjected) injectedCount++;

      let vhBranch;
      if (result.vhAction === 'created') {
        vhBranch = 'CREATE';
        created++;
      } else if (result.vhColCount === 2) {
        vhBranch = 'PREPEND-2col';
        prepend2col++;
      } else {
        vhBranch = 'PREPEND-3col';
        prepend3col++;
      }

      const detail =
        'doc_id=' + result.docId +
        ' platform-injected=' + (result.platformInjected ? 'Y' : 'N') +
        ' d1=' + result.d1Label +
        ' vhBranch=' + vhBranch +
        ' preH1SpanLines=' + result.preH1SpanLineCount +
        ' spanBytes(orig=' + result.preH1SpanOriginalBytes + ',reloc=' + result.preH1SpanRelocatedBytes + ')';

      if (DRY_RUN) {
        const showDetail = VERBOSE || true; // always show in dry-run (useful for verification)
        process.stdout.write(padLabel(label) + 'PASS' + (showDetail ? ' -- ' + detail : '') + '\n');
      } else {
        writeFileSync(join(process.cwd(), result.rel), result.newContent, 'utf8');
        process.stdout.write(padLabel(label) + 'WRITTEN -- ' + detail + '\n');
        if (VERBOSE) {
          process.stdout.write('  new frontmatter keys: doc_id status owner doc_type' +
            (result.platformInjected ? ' platform(injected)' : '') + '\n');
        }
      }
    }
  }

  process.stdout.write(
    '\n' +
    (DRY_RUN ? 'Dry-run' : 'Write') +
    ' complete: ' + processed + ' OK, ' + errors + ' ERROR(S), ' +
    injectedCount + ' platform-injected, ' +
    'VH branches: PREPEND-2col=' + prepend2col + ' PREPEND-3col=' + prepend3col + ' CREATE=' + created + '\n'
  );

  process.exit(errors > 0 ? 1 : 0);
}

main();
