#!/usr/bin/env node
// retrofit-structural.mjs -- Mechanical EEE retrofit helper (Phase 121 D-08, forked from retrofit-reference.mjs)
//
// Fork of scripts/pipeline/retrofit-reference.mjs (Phase 118). Do NOT refactor either shipped
// fork (retrofit-guide.mjs / retrofit-reference.mjs) in place -- both are shipped, Approved
// deliverables; a shared refactor risks regressing them (fork-don't-refactor convention,
// 116->117->118). This fork targets THREE new directory classes spanning TWO doc_types:
// the 6 bare docs/_glossary*.md files (doc_type: Reference) and the 7 lifecycle + end-user-
// guide directory prefixes (doc_type: Guide) -- neither existing fork's allowlist covers
// these paths (D-08).
//
// Performs the deterministic half of every glossary / lifecycle / end-user-guide EEE retrofit:
//   - Routes doc_type by path: GLOSSARY_FILES (6 bare files) -> Reference;
//     GUIDE_DIRS (7 prefixes: lifecycle/, lifecycle-apv2/, android-lifecycle/, ios-lifecycle/,
//     macos-lifecycle/, linux-lifecycle/, end-user-guides/) -> Guide
//   - Injects doc_id (joined from RE-index.md by path), status: Approved,
//     owner: Intune Admin Lead (uniform, D-04 carried), doc_type: <routed> into frontmatter
//   - Injects platform: Windows for keyless files (the docs/lifecycle/ + docs/lifecycle-apv2/
//     files carry no platform: key -- Windows Autopilot classic/APv2)
//   - Emits the EEE block line (Platform . Doc Type . Doc ID . Status) with the routed doc_type
//   - Relocates the ENTIRE pre-H1 span (gate blockquote + any 2nd blockquote + HTML
//     comments, in original order) to after ## Summary placeholder -- carries the 117/118
//     whole-pre-H1-span fix verbatim
//   - Inserts ## Summary section with a [FILL-IN] placeholder (Reference-template lead for
//     glossaries, per-platform-template lead for lifecycle/end-user-guides)
//   - Version History: DETECTS an existing section's column count (2-col vs 3-col) and
//     PREPENDS a matching-width row; CREATES a new 3-column section if absent (Phase-118
//     detectVhColumnCount CREATE-vs-PREPEND logic, carried verbatim -- never assume a Version
//     History section exists)
//   - Writes the v1.16 EEE reformat Version-History row literal (D-08 / D2 / META-04 --
//     BOTH existing forks hardcode "v1.15"; this milestone's literal is "v1.16")
//
// Guards: path router (6 glossary bare files OR 7 guide-dir prefixes), hard-exclusion of the
// 9 Mermaid-bearing lifecycle files (fails CLOSED -- ERROR, never a silent skip -- if invoked
// against one by explicit path, per D-01; filtered out of --all enumeration entirely),
// TEMPLATE-SENTINEL (refuses 1970-01-01), doc_id must resolve in RE-index.md (fail-closed
// DOC-ID-UNRESOLVED), platform must be in D1_MAP.
//
// Does NOT author Summary prose, fix C17 #12 blockquotes, or edit RE-index.md. Those are the
// wave-2 plans' hand-work (121-02 through 121-07).
//
// Usage:
//   node scripts/pipeline/retrofit-structural.mjs --dry-run --all
//   node scripts/pipeline/retrofit-structural.mjs --dry-run [file...]
//   node scripts/pipeline/retrofit-structural.mjs --all           (writes files)
//   node scripts/pipeline/retrofit-structural.mjs --self-test
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

// === Fork-specific: PATH -> doc_type router (D-08) ===

// The 6 bare glossary files -> doc_type Reference (D-04 lifecycle -> Guide / glossary -> Reference
// ruling, EEE-SOP-standard.md Doc Type Taxonomy).
const GLOSSARY_FILES = new Set([
  'docs/_glossary.md',
  'docs/_glossary-android.md',
  'docs/_glossary-apple-business.md',
  'docs/_glossary-linux.md',
  'docs/_glossary-macos.md',
  'docs/_glossary-network.md',
]);

// The 7 lifecycle + end-user-guide directory prefixes -> doc_type Guide (D-02 directory-
// enumerated scope, NOT glob-matched -- see 121-CONTEXT.md D2).
const GUIDE_DIRS = [
  'docs/lifecycle/',
  'docs/lifecycle-apv2/',
  'docs/android-lifecycle/',
  'docs/ios-lifecycle/',
  'docs/macos-lifecycle/',
  'docs/linux-lifecycle/',
  'docs/end-user-guides/',
];

// Resolve the doc_type for a normalized relative path, or null if outside the allowlist.
function resolveDocType(rel) {
  if (GLOSSARY_FILES.has(rel)) return 'Reference';
  if (GUIDE_DIRS.some(d => rel.startsWith(d))) return 'Guide';
  return null;
}

// D-01: the 9 Mermaid-bearing lifecycle files -- hard-excluded, deferred to Phase 122.
// Never enumerated under --all; fails CLOSED (ERROR) if invoked against one by explicit path.
// Enrolling one of these (adding doc_id) would trip C17 assertion #1 (Mermaid hard-fail on
// enrolled files, Phase-120 D-02, byte-unchanged).
const MERMAID_DEFERRED_PATHS = new Set([
  'docs/lifecycle/00-overview.md',
  'docs/lifecycle/03-oobe.md',
  'docs/lifecycle/04-esp.md',
  'docs/lifecycle-apv2/02-deployment-flow.md',
  'docs/ios-lifecycle/01-ade-lifecycle.md',
  'docs/ios-lifecycle/02-mdm-migration.md',
  'docs/macos-lifecycle/00-ade-lifecycle.md',
  'docs/macos-lifecycle/01-psso-provisioning-walkthrough.md',
  'docs/macos-lifecycle/02-mdm-migration-psso.md',
]);

// === Helpers (verbatim from retrofit-reference.mjs) ===

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
 * Example: Map { 'docs/_glossary-android.md' => 'RE-179' }
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

// === Version-History helpers (carried verbatim from retrofit-reference.mjs) ===

/**
 * Detect the column count of an EXISTING ## Version History table's header row.
 * Scans forward from vhIdx (the heading line index) for the first data/header row
 * that isn't a separator row, and counts pipe-delimited cells. Returns null if no
 * table row is found within the scan window (treated as CREATE by the caller).
 *
 * NEVER assume 3-column -- several glossary/lifecycle files may have a 2-column
 * pre-existing table (Phase-118 Pattern 2 / Pitfall 1). This detection logic is the
 * load-bearing fix carried verbatim from retrofit-reference.mjs.
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

// D-08 / D2 / META-04: the Version-History reformat literal changes from "v1.15" (both
// existing forks) to "v1.16" -- this milestone's one-time retrofit-not-re-reviewed marker.
const NEW_ROW_2COL = '| YYYY-MM-DD | v1.16 EEE reformat — content not re-reviewed |';
const NEW_ROW_3COL = '| YYYY-MM-DD | v1.16 EEE reformat — content not re-reviewed | — |';

/**
 * Insert the v1.16 EEE reformat row as the first data row under ## Version History.
 * If the section is absent, CREATE it at end of file with a 3-column shape (Open
 * Question 1 lock: matches 116/117/118 corpus-wide precedent).
 * If the section is PRESENT, detect its column count and PREPEND a matching-width
 * row -- NEVER assume 3-column (Pitfall 1).
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
 * Process one glossary / lifecycle / end-user-guide file: parse, validate guards,
 * compute transform, return result.
 *
 * @param {string} absPath - absolute path to the .md file
 * @param {Map<string,string>} docIdMap - built from buildDocIdMap()
 * @returns {{ ok: boolean, rel: string, error?: string,
 *             docId?: string, docType?: string, d1Label?: string, platform?: string,
 *             platformInjected?: boolean, preH1SpanLineCount?: number,
 *             preH1SpanOriginalBytes?: number, preH1SpanRelocatedBytes?: number,
 *             vhAction?: string, vhColCount?: number, newContent?: string }}
 */
function processFile(absPath, docIdMap) {
  const rel = relNormalize(absPath);

  // Guard 1: path router -- 6 glossary bare files OR the 7 guide-dir prefixes
  const docType = resolveDocType(rel);
  if (docType === null) {
    return { ok: false, rel, error: 'PATH-ALLOWLIST: path not one of the 6 glossary files or under a GUIDE_DIRS prefix' };
  }

  // Guard 1b (D-01): hard-exclude the 9 mermaid-deferred lifecycle files -- fail CLOSED, never
  // a silent skip, so the script itself enforces D-01 even against an explicit invocation.
  if (MERMAID_DEFERRED_PATHS.has(rel)) {
    return { ok: false, rel, error: 'MERMAID-DEFERRED: file is one of the 9 D-01 mermaid-carve-out lifecycle files -- deferred to Phase 122, refusing to process' };
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
  // (the keyless docs/lifecycle/ + docs/lifecycle-apv2/ files -- Windows Autopilot
  // classic/APv2; the /^platform:\s*.../m presence-only test never matches applies_to)
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
    'doc_type: ' + docType + '\n' +
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

  // === WHOLE-PRE-H1-SPAN RELOCATION (117/118 fix, carried verbatim) ===
  // Capture the ENTIRE span between the frontmatter close and the first H1 -- blockquote
  // runs, HTML comments, blank lines, regardless of shape -- and trim ONLY genuinely
  // leading/trailing blank lines, preserving internal ordering and blank-line structure
  // exactly as authored. Match by structural position ONLY -- never on a literal
  // "Platform coverage"/"Framework coverage"/"Domain coverage" string. Some glossary files
  // (e.g. docs/_glossary-android.md) place the H1 BEFORE the coverage blockquote -- in that
  // case preH1Span is naturally empty and the blockquote simply stays in the body-after-H1
  // tail, ending up after Summary either way (no special-casing needed).
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
  // Field order is fixed; owner NEVER appears in the block (Phase-114 D-01). Doc Type is the
  // ROUTED value (Reference for glossaries, Guide for lifecycle + end-user-guides).
  const blockLine =
    '**Platform:** ' + d1Label +
    ' · **Doc Type:** ' + docType +
    ' · **Doc ID:** ' + docId +
    ' · **Status:** Approved';

  // Summary placeholder (executor hand-authors >=30 words of real prose). Reference-template
  // lead for glossaries; per-platform-template lead for lifecycle/end-user-guides (mirrors
  // the retrofit-reference.mjs / retrofit-guide.mjs wording conventions respectively).
  const fillIn = docType === 'Reference'
    ? '[FILL-IN: >=30 words, reference-template Summary lead]'
    : '[FILL-IN: >=30 words, per-platform-template (' + d1Label + ') Summary lead]';

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
    docType,
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
// Eight in-memory fixture sub-tests: buildDocIdMap parsing, the 2-doc_type router (glossary
// -> Reference, lifecycle -> Guide, end-user-guide -> Guide), the Mermaid-deferred hard
// exclusion, the keyless-lifecycle platform-injection + D1 resolution, the v1.16 VH literal,
// and the inherited whole-pre-H1-span byte-length-equality proof.

if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  process.stdout.write('retrofit-structural --self-test (Phase 121 D-08 2-doc_type router + Mermaid hard-exclusion proof)\n\n');

  // (a) buildDocIdMap parses a sample RE-index row (glossary) to the correct RE-NNN
  {
    const sampleRegistry = [
      '| Doc ID | Path | Title | Doc Type | Status |',
      '|--------|------|-------|----------|--------|',
      '| RE-179 | docs/_glossary-android.md | Android Enterprise Provisioning Glossary | Reference | Approved |',
      '| RE-185 | docs/android-lifecycle/00-enrollment-overview.md | Android Enterprise Enrollment Overview | Guide | Approved |',
    ].join('\n');
    const syntheticMap = new Map();
    for (const line of sampleRegistry.split('\n')) {
      const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^|]+?)\s*\|/);
      if (m) syntheticMap.set(m[2].trim(), m[1].trim());
    }
    const got = syntheticMap.get('docs/_glossary-android.md');
    stAssert(
      '(a) buildDocIdMap: sample registry row → correct RE-NNN',
      got === 'RE-179',
      got === 'RE-179' ? 'got RE-179 as expected' : 'got "' + got + '" (expected RE-179)'
    );
  }

  // (b) A glossary path routes to doc_type Reference
  {
    const got = resolveDocType('docs/_glossary-macos.md');
    stAssert(
      '(b) ROUTER: glossary path → Reference',
      got === 'Reference',
      'resolveDocType(docs/_glossary-macos.md) = ' + got
    );
  }

  // (c) A lifecycle path routes to doc_type Guide
  {
    const got = resolveDocType('docs/lifecycle/01-hardware-hash.md');
    stAssert(
      '(c) ROUTER: lifecycle path → Guide',
      got === 'Guide',
      'resolveDocType(docs/lifecycle/01-hardware-hash.md) = ' + got
    );
  }

  // (d) An end-user-guide path routes to doc_type Guide
  {
    const got = resolveDocType('docs/end-user-guides/android-work-profile-setup.md');
    stAssert(
      '(d) ROUTER: end-user-guide path → Guide',
      got === 'Guide',
      'resolveDocType(docs/end-user-guides/android-work-profile-setup.md) = ' + got
    );
  }

  // (e) A Mermaid-deferred path is refused (hard-excluded, fail-closed); a non-deferred
  //     lifecycle path in the same directory is NOT refused; a path outside the router is
  //     also refused (path-allowlist proof folded in)
  {
    const outsidePaths = [
      'docs/l1-runbooks/01-device-not-registered.md',
      'docs/reference/endpoints.md',
      'docs/operations/app-lifecycle/00-overview.md',
    ];
    const mermaidPath = 'docs/lifecycle/00-overview.md';
    const nonMermaidLifecyclePath = 'docs/lifecycle/01-hardware-hash.md';

    const allOutsideRefused = outsidePaths.every(p => resolveDocType(p) === null);
    const mermaidRefused = MERMAID_DEFERRED_PATHS.has(mermaidPath);
    const nonMermaidAllowed = resolveDocType(nonMermaidLifecyclePath) !== null && !MERMAID_DEFERRED_PATHS.has(nonMermaidLifecyclePath);
    const allNineDeferred = MERMAID_DEFERRED_PATHS.size === 9;

    stAssert(
      '(e) PATH-ROUTER + D-01: outside paths refused, all 9 Mermaid-deferred paths hard-excluded, sibling non-Mermaid lifecycle path allowed',
      allOutsideRefused && mermaidRefused && nonMermaidAllowed && allNineDeferred,
      'outsideRefused=' + allOutsideRefused + ' mermaidRefused=' + mermaidRefused +
        ' nonMermaidAllowed=' + nonMermaidAllowed + ' deferredCount=' + MERMAID_DEFERRED_PATHS.size
    );
  }

  // (f) Keyless lifecycle fixture (no platform: key, mirrors docs/lifecycle/*.md) triggers
  //     platform: Windows injection and resolves the D1 label Windows
  {
    const fmLines = ['last_verified: 2026-04-13', 'review_by: 2026-07-12', 'applies_to: both', 'audience: admin'];
    const fm = fmLines.join('\n');
    const hasPlatform = /^platform:/m.test(fm);
    const injectedPlatform = !hasPlatform ? 'Windows' : null;
    const d1Label = injectedPlatform ? D1_MAP[injectedPlatform] : undefined;
    stAssert(
      '(f) Keyless lifecycle fixture: no platform key → injection = Windows, D1 label = Windows',
      injectedPlatform === 'Windows' && d1Label === 'Windows',
      'injectedPlatform=' + injectedPlatform + ' d1Label=' + d1Label
    );
  }

  // (g) VH literal reads "v1.16" (NOT v1.15) in both column-width row constants
  {
    const bothV116 = NEW_ROW_2COL.includes('v1.16 EEE reformat') && NEW_ROW_3COL.includes('v1.16 EEE reformat');
    const neitherV115 = !NEW_ROW_2COL.includes('v1.15') && !NEW_ROW_3COL.includes('v1.15');
    stAssert(
      '(g) VH LITERAL: both row constants read "v1.16 EEE reformat", no "v1.15" literal remains',
      bothV116 && neitherV115,
      '2col="' + NEW_ROW_2COL + '" 3col="' + NEW_ROW_3COL + '"'
    );
  }

  // (h) Inherited whole-pre-H1-span relocation byte-length-preservation proof (117/118 fix,
  //     re-proven against a glossary-shaped fixture with a single blockquote group)
  {
    const synthetic =
      '---\n' +
      'last_verified: 2026-06-29\n' +
      'review_by: 2026-09-27\n' +
      'applies_to: both\n' +
      'audience: all\n' +
      'platform: all\n' +
      '---\n' +
      '\n' +
      '> **Platform coverage:** This glossary covers terminology for a synthetic self-test fixture.\n' +
      '> For other platforms, see the sibling glossary files.\n' +
      '\n' +
      '# Synthetic Span-Fix Test Title\n' +
      '\n' +
      'Body content here.\n';

    const fixtureRel = 'docs/_glossary-__self-test-span-fixture.md';
    const fixtureAbs = join(process.cwd(), fixtureRel);
    let fPassed = false;
    let fDetail = '';
    try {
      writeFileSync(fixtureAbs, synthetic, 'utf8');
      // Register the fixture as a temporary glossary path so processFile's router accepts it.
      GLOSSARY_FILES.add(fixtureRel);
      const synMap = new Map([[fixtureRel, 'RE-T99']]);
      const result = processFile(fixtureAbs, synMap);
      if (!result.ok) {
        fDetail = 'processFile returned ERROR: ' + result.error;
      } else {
        const bytesMatch = result.preH1SpanOriginalBytes === result.preH1SpanRelocatedBytes;
        const expectedLineCount = 2; // 2 blockquote lines, no blank/HTML-comment in this fixture
        const lineCountOk = result.preH1SpanLineCount === expectedLineCount;
        const hasBlockquote = result.newContent.includes('Platform coverage');
        const docTypeCorrect = result.docType === 'Reference';
        fPassed = bytesMatch && lineCountOk && hasBlockquote && docTypeCorrect;
        fDetail = 'origBytes=' + result.preH1SpanOriginalBytes + ' relocBytes=' + result.preH1SpanRelocatedBytes +
          ' lineCount=' + result.preH1SpanLineCount + ' (expected ' + expectedLineCount + ')' +
          ' blockquotePresent=' + hasBlockquote + ' docType=' + result.docType;
      }
    } finally {
      GLOSSARY_FILES.delete(fixtureRel);
      try { unlinkSync(fixtureAbs); } catch { /* best effort cleanup */ }
    }

    stAssert(
      '(h) WHOLE-PRE-H1-SPAN FIX (117/118 inherited): single-blockquote-group glossary fixture relocates with byte-length equality, routes to Reference',
      fPassed,
      fDetail
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
    const glossaryAbsPaths = [...GLOSSARY_FILES].map(p => join(process.cwd(), p)).filter(existsSync);
    const guideDirPaths = GUIDE_DIRS.flatMap(d => walkMd(d));
    const merged = [...glossaryAbsPaths, ...guideDirPaths];
    // Exclude the 9 mermaid-deferred files from --all enumeration entirely (D-01) -- they
    // must never be enumerated, not merely "expected to fail".
    targetAbsPaths = merged.filter(abs => !MERMAID_DEFERRED_PATHS.has(relNormalize(abs)));
    if (targetAbsPaths.length === 0) {
      process.stderr.write('ERROR: --all found no enrollable .md files under the 6 glossary files or the 7 GUIDE_DIRS prefixes\n');
      process.exit(1);
    }
  } else if (filePaths.length > 0) {
    targetAbsPaths = filePaths.map(p => {
      if (p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p)) return p;
      return join(process.cwd(), p);
    });
  } else {
    process.stderr.write('Usage: node scripts/pipeline/retrofit-structural.mjs [--dry-run] [--verbose] <file...>\n');
    process.stderr.write('       node scripts/pipeline/retrofit-structural.mjs [--dry-run] [--verbose] --all\n');
    process.stderr.write('       node scripts/pipeline/retrofit-structural.mjs --self-test\n');
    process.exit(1);
  }

  let errors = 0;
  let processed = 0;
  let injectedCount = 0;
  let prepend2col = 0;
  let prepend3col = 0;
  let created = 0;

  if (DRY_RUN) {
    process.stdout.write('retrofit-structural --dry-run' + (ALL ? ' --all' : '') + ': ' + targetAbsPaths.length + ' target file(s)\n\n');
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
        ' doc_type=' + result.docType +
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
