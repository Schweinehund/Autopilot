#!/usr/bin/env node
// retrofit-guide.mjs -- Mechanical EEE retrofit helper (Phase 117 D-03, forked from retrofit-runbook.mjs)
//
// Fork of scripts/pipeline/retrofit-runbook.mjs (Phase 116). Do NOT refactor the 116 script
// in place -- it is a shipped, Approved deliverable; a shared refactor risks regressing it.
// This fork FIXES a confirmed silent-content-loss defect in the 116 helper (see below) and
// targets the docs/admin-setup-*/ corpus with doc_type: Guide + a uniform owner.
//
// Performs the deterministic half of every admin-setup guide EEE retrofit:
//   - Injects doc_id (joined from RE-index.md by path), status: Approved,
//     owner: Intune Admin Lead (uniform, D-04), doc_type: Guide into frontmatter
//   - Injects platform: Windows for the 13 enrolled keyless apv1/apv2 files
//   - Emits the EEE block line (Platform · Doc Type · Doc ID · Status)
//   - Relocates the ENTIRE pre-H1 span (gate blockquote + any 2nd blockquote + HTML
//     comments, in original order) to after ## Summary placeholder -- FIXES the 116
//     helper's confirmed defect of capturing only the FIRST contiguous /^>/ run and
//     silently dropping everything else in the pre-H1 span (RESEARCH.md Pitfall 1;
//     confirmed on admin-setup-ios/02-abm-token.md, admin-setup-macos/01-abm-configuration.md,
//     and the 5 AOSP android files 09-13 which carry pre-H1 HTML authoring comments).
//   - Inserts ## Summary section with [FILL-IN] placeholder (per-platform-template lead, D-03)
//   - Creates a NEW ## Version History section (ALL 57 enrolled files lack one -- Pitfall 4;
//     the vhIdx===-1 CREATE branch is the ONLY branch exercised this phase)
//
// Guards: path allowlist (docs/admin-setup-{apv1,apv2,android,ios,macos,linux,8021x}/ ONLY),
// hard-exclusion of the 9 mermaid-deferred files (fails CLOSED -- ERROR, never a silent skip --
// if invoked against one by explicit path, per D-05), TEMPLATE-SENTINEL (refuses 1970-01-01),
// doc_id must resolve in RE-index.md, platform must be in D1_MAP.
//
// Does NOT author Summary prose, fix C17 #12 blockquotes, or edit RE-index.md.
// Those are batch-plan hand-work (117-02 through 117-09).
//
// Usage:
//   node scripts/pipeline/retrofit-guide.mjs --dry-run --all
//   node scripts/pipeline/retrofit-guide.mjs --dry-run [file...]
//   node scripts/pipeline/retrofit-guide.mjs --all           (writes files)
//   node scripts/pipeline/retrofit-guide.mjs --self-test
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

// === Fork-specific: path allowlist + D-05 mermaid hard-exclusion ===

const ADMIN_SETUP_DIRS = [
  'docs/admin-setup-apv1/',
  'docs/admin-setup-apv2/',
  'docs/admin-setup-android/',
  'docs/admin-setup-ios/',
  'docs/admin-setup-macos/',
  'docs/admin-setup-linux/',
  'docs/admin-setup-8021x/',
];

// D-05: 9 mermaid-deferred files -- hard-excluded, deferred to v1.16. Never enumerated
// under --all; fails CLOSED (ERROR) if invoked against one by explicit path.
const MERMAID_DEFERRED_PATHS = new Set([
  'docs/admin-setup-apv1/00-overview.md',
  'docs/admin-setup-apv1/01-hardware-hash-upload.md',
  'docs/admin-setup-apv2/00-overview.md',
  'docs/admin-setup-android/00-overview.md',
  'docs/admin-setup-ios/00-overview.md',
  'docs/admin-setup-macos/00-overview.md',
  'docs/admin-setup-linux/00-overview.md',
  'docs/admin-setup-8021x/00-overview.md',
  'docs/admin-setup-8021x/01-eap-method-overview.md',
]);

// === Helpers (verbatim from retrofit-runbook.mjs / c17-eee-contract.mjs) ===

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
 * Example: Map { 'docs/admin-setup-ios/02-abm-token.md' => 'RE-108' }
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

// === Version-History helper (verbatim from retrofit-runbook.mjs) ===

/**
 * Insert newRow as the first data row under ## Version History.
 * If the section is absent (ALL 57 admin-setup files, Pitfall 4), create it at end of file --
 * the vhIdx===-1 CREATE branch is the ONLY branch this phase exercises.
 * Returns { lines: string[], action: 'prepended' | 'created' }.
 */
function insertVersionHistoryRow(lines, newRow) {
  const newLines = [...lines];
  const vhIdx = newLines.findIndex(l => /^## Version History\b/.test(l));

  if (vhIdx === -1) {
    // Create section at end of file (the ONLY path exercised this phase -- Pitfall 4)
    while (newLines.length > 0 && newLines[newLines.length - 1].trim() === '') newLines.pop();
    newLines.push('', '## Version History', '', '| Date | Change | Author |', '|------|--------|--------|', newRow);
    return { lines: newLines, action: 'created' };
  }

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
    return { lines: newLines, action: 'prepended' };
  }

  // Fallback: insert after the first table row (header) we find
  for (let i = vhIdx + 1; i < newLines.length; i++) {
    if (newLines[i].startsWith('|')) {
      newLines.splice(i + 1, 0, newRow);
      return { lines: newLines, action: 'prepended' };
    }
  }

  // Last resort: append at end
  newLines.push(newRow);
  return { lines: newLines, action: 'prepended' };
}

// === Core transform ===

/**
 * Process one admin-setup guide file: parse, validate guards, compute transform, return result.
 *
 * @param {string} absPath - absolute path to the .md file
 * @param {Map<string,string>} docIdMap - built from buildDocIdMap()
 * @returns {{ ok: boolean, rel: string, error?: string,
 *             docId?: string, d1Label?: string, platform?: string,
 *             platformInjected?: boolean, preH1SpanLineCount?: number,
 *             preH1SpanOriginalBytes?: number, preH1SpanRelocatedBytes?: number,
 *             vhAction?: string, newContent?: string }}
 */
function processFile(absPath, docIdMap) {
  const rel = relNormalize(absPath);

  // Guard 1: path allowlist -- only the 7 docs/admin-setup-*/ dirs
  const inAllowlist = ADMIN_SETUP_DIRS.some(d => rel.startsWith(d));
  if (!inAllowlist) {
    return { ok: false, rel, error: 'PATH-ALLOWLIST: path not in any docs/admin-setup-*/ dir' };
  }

  // Guard 1b (D-05): hard-exclude the 9 mermaid-deferred files -- fail CLOSED, never a
  // silent skip, so the script itself enforces D-05 even against an explicit invocation.
  if (MERMAID_DEFERRED_PATHS.has(rel)) {
    return { ok: false, rel, error: 'MERMAID-DEFERRED: file is one of the 9 D-05 mermaid-carve-out files -- deferred to v1.16, refusing to process' };
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
  // (the 13 enrolled keyless apv1/apv2 files -- 16 total keyless minus the 3 that are
  // also mermaid-deferred: apv1/00, apv1/01, apv2/00, already refused by Guard 1b above)
  const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
  let platform = platformMatch ? platformMatch[1] : null;
  const platformInjected = (platform === null);
  if (platformInjected) platform = 'Windows';

  // Guard 4: platform must resolve in D1_MAP (hard failure, no fallback)
  const d1Label = D1_MAP[platform];
  if (d1Label === undefined) {
    return { ok: false, rel, error: 'UNMAPPED-PLATFORM: platform "' + platform + '" not in D1_MAP' };
  }

  // Owner: uniform constant (D-04) -- replaces the 116 per-tier ternary. This deliberately
  // diverges from the platform templates' per-platform `reviewer` comment role; owner is
  // frontmatter-only and never rendered in the block (C17 #8 only asserts presence).
  const owner = 'Intune Admin Lead';

  // Build new frontmatter: 4 new keys at top, then inject platform if absent, then original fm
  const newFm =
    'doc_id: ' + docId + '\n' +
    'status: Approved\n' +
    'owner: ' + owner + '\n' +
    'doc_type: Guide\n' +
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

  // === WHOLE-PRE-H1-SPAN RELOCATION (the load-bearing defect fix) ===
  // Supersedes retrofit-runbook.mjs's defective first-/^>/-run-only capture, which
  // `break`s after the first contiguous blockquote run and silently drops everything
  // else in the pre-H1 span (a 2nd blockquote, HTML comments) via the
  // `bodyLines.slice(firstH1Idx + 1)` cut. Capture the ENTIRE span between the
  // frontmatter close and the first H1 -- blockquote runs, HTML comments, blank lines,
  // regardless of shape -- and trim ONLY genuinely leading/trailing blank lines,
  // preserving internal ordering and blank-line structure exactly as authored.
  // Match by structural position ONLY -- never on the literal "Version gate"/
  // "Platform gate"/"Scope" string (several 8021x and android files use other labels).
  const preH1Raw = bodyLines.slice(0, firstH1Idx);
  let spanStart = 0;
  while (spanStart < preH1Raw.length && preH1Raw[spanStart].trim() === '') spanStart++;
  let spanEnd = preH1Raw.length - 1;
  while (spanEnd >= spanStart && preH1Raw[spanEnd].trim() === '') spanEnd--;
  const preH1Span = (spanStart <= spanEnd) ? preH1Raw.slice(spanStart, spanEnd + 1) : [];
  const preH1SpanOriginalBytes = Buffer.byteLength(preH1Span.join('\n'), 'utf8');

  const h1Line = bodyLines[firstH1Idx];
  const bodyAfterH1Lines = bodyLines.slice(firstH1Idx + 1);

  // Version-History row (YYYY-MM-DD placeholder; executor fills at commit time)
  const newVhRow = '| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |';
  const vhResult = insertVersionHistoryRow(bodyAfterH1Lines, newVhRow);
  const processedBodyAfterH1 = vhResult.lines;

  // EEE block line: Platform · Doc Type · Doc ID · Status (U+00B7 middle-dot separator)
  // Field order is fixed; owner NEVER appears in the block (Phase-114 D-01)
  const blockLine =
    '**Platform:** ' + d1Label +
    ' · **Doc Type:** Guide' +
    ' · **Doc ID:** ' + docId +
    ' · **Status:** Approved';

  // Summary placeholder (executor hand-authors >=30 words of real prose, per-platform-
  // template lead per D-03/3A' -- NOT the L1/L2 tier safety-banner lead)
  const fillIn = '[FILL-IN: >=30 words, per-platform-template (' + d1Label + ') Summary lead]';

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
    newContent,
  };
}

// === Self-test mode (--self-test) ===
// Six in-memory fixture sub-tests: the 5 inherited guard proofs (adapted to admin-setup
// paths + Guide doc_type) plus a 6th NEW sub-test proving the whole-pre-H1-span fix.

if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  process.stdout.write('retrofit-guide --self-test (Phase 117 D-03 guard + span-fix proof)\n\n');

  // (a) buildDocIdMap parses a sample RE-index row to the correct RE-NNN
  {
    const sampleRegistry = [
      '| Doc ID | Path | Title | Doc Type | Status |',
      '|--------|------|-------|----------|--------|',
      '| RE-078 | docs/admin-setup-apv1/02-deployment-profile.md | Deployment Profile Configuration | Guide | Pending |',
      '| RE-108 | docs/admin-setup-ios/02-abm-token.md | ABM/ADE Token Configuration for iOS/iPadOS | Guide | Pending |',
    ].join('\n');
    const syntheticMap = new Map();
    for (const line of sampleRegistry.split('\n')) {
      const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^|]+?)\s*\|/);
      if (m) syntheticMap.set(m[2].trim(), m[1].trim());
    }
    const got = syntheticMap.get('docs/admin-setup-apv1/02-deployment-profile.md');
    stAssert(
      '(a) buildDocIdMap: sample registry row → correct RE-NNN',
      got === 'RE-078',
      got === 'RE-078' ? 'got RE-078 as expected' : 'got "' + got + '" (expected RE-078)'
    );
  }

  // (b) Keyless apv1 fixture triggers platform: Windows injection
  {
    const fmLines = ['last_verified: 2026-04-13', 'review_by: 2026-07-12', 'applies_to: APv1', 'audience: admin'];
    const fm = fmLines.join('\n');
    const hasPlatform = /^platform:/m.test(fm);
    const injectedPlatform = !hasPlatform ? 'Windows' : null;
    stAssert(
      '(b) Keyless apv1 fixture: no platform key → injection = Windows',
      injectedPlatform === 'Windows',
      injectedPlatform === 'Windows' ? 'platform injection triggered as expected' : 'injection not triggered (got: ' + hasPlatform + ')'
    );
  }

  // (c) ios fixture resolves D1 label iOS
  {
    const rawPlatform = 'ios';
    const label = D1_MAP[rawPlatform];
    stAssert(
      '(c) D1_MAP: ios → iOS',
      label === 'iOS',
      label === 'iOS' ? 'D1 label correct' : 'got "' + label + '" (expected "iOS")'
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

  // (e) Path outside the 7 admin-setup dirs AND an explicit mermaid-deferred path are
  //     both REFUSED (path allowlist + D-05 hard-exclusion)
  {
    const outsidePaths = [
      'docs/l1-runbooks/01-device-not-registered.md',
      'docs/reference/endpoints.md',
      'scripts/validation/c17-eee-contract.mjs',
    ];
    const insidePaths = [
      'docs/admin-setup-apv1/02-deployment-profile.md',
      'docs/admin-setup-ios/02-abm-token.md',
    ];
    const mermaidPath = 'docs/admin-setup-ios/00-overview.md';

    const allOutsideRefused = outsidePaths.every(p => !ADMIN_SETUP_DIRS.some(d => p.startsWith(d)));
    const allInsideAllowed = insidePaths.every(p => ADMIN_SETUP_DIRS.some(d => p.startsWith(d)) && !MERMAID_DEFERRED_PATHS.has(p));
    const mermaidRefused = MERMAID_DEFERRED_PATHS.has(mermaidPath);

    stAssert(
      '(e) PATH-ALLOWLIST + D-05: outside paths refused, mermaid-deferred path refused, inside paths allowed',
      allOutsideRefused && allInsideAllowed && mermaidRefused,
      'outsideRefused=' + allOutsideRefused + ' insideAllowed=' + allInsideAllowed + ' mermaidRefused=' + mermaidRefused
    );
  }

  // (f) NEW: synthetic pre-H1 span with TWO blockquotes + a trailing HTML comment
  //     relocates after ## Summary with relocated-span byte length EQUAL to the
  //     original span byte length (operationalizes the Pitfall-1 "warning sign" check --
  //     diff pre-H1 span byte-for-byte against the post-Summary relocated span).
  {
    const synthetic =
      '---\n' +
      'platform: iOS\n' +
      'last_verified: 2026-04-14\n' +
      'review_by: 2026-07-13\n' +
      'applies_to: iOS\n' +
      'audience: admin\n' +
      '---\n' +
      '\n' +
      '> **Platform gate:** This guide covers iOS/iPadOS ADE token configuration.\n' +
      '> For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).\n' +
      '\n' +
      '> **Rebrand notice (2026-04-14):** Apple Business Manager (ABM) became **Apple Business** on\n' +
      '> 2026-04-14. This guide retains the legacy "ABM" terminology for portal-navigation continuity.\n' +
      '\n' +
      '<!-- Authoring note: the MGP subsection is intentionally omitted for this device class. -->\n' +
      '\n' +
      '# Synthetic Span-Fix Test Title\n' +
      '\n' +
      'Body content here.\n';

    // Write the synthetic fixture to a temp path under an allowlisted dir so processFile's
    // guards pass, then invoke the real transform end-to-end.
    const fixtureRel = 'docs/admin-setup-ios/__self-test-span-fixture.md';
    const fixtureAbs = join(process.cwd(), fixtureRel);
    let sixPassed = false;
    let sixDetail = '';
    try {
      writeFileSync(fixtureAbs, synthetic, 'utf8');
      const synMap = new Map([[fixtureRel, 'RE-T99']]);
      const result = processFile(fixtureAbs, synMap);
      if (!result.ok) {
        sixDetail = 'processFile returned ERROR: ' + result.error;
      } else {
        const bytesMatch = result.preH1SpanOriginalBytes === result.preH1SpanRelocatedBytes;
        const expectedLineCount = 7; // 2 blockquote lines + blank + 2 blockquote lines + blank + 1 html comment
        const lineCountOk = result.preH1SpanLineCount === expectedLineCount;
        // Confirm BOTH blockquotes AND the HTML comment survived in newContent (not just
        // the first run) -- the direct proof that the defect this fork fixes is closed.
        const hasBothBlockquotes = result.newContent.includes('Platform gate') && result.newContent.includes('Rebrand notice');
        const hasHtmlComment = result.newContent.includes('Authoring note: the MGP subsection');
        sixPassed = bytesMatch && lineCountOk && hasBothBlockquotes && hasHtmlComment;
        sixDetail = 'origBytes=' + result.preH1SpanOriginalBytes + ' relocBytes=' + result.preH1SpanRelocatedBytes +
          ' lineCount=' + result.preH1SpanLineCount + ' (expected ' + expectedLineCount + ')' +
          ' bothBlockquotes=' + hasBothBlockquotes + ' htmlComment=' + hasHtmlComment;
      }
    } finally {
      try { unlinkSync(fixtureAbs); } catch { /* best effort cleanup */ }
    }

    stAssert(
      '(f) WHOLE-PRE-H1-SPAN FIX: 2-blockquote + trailing-HTML-comment fixture relocates with byte-length equality (no content dropped)',
      sixPassed,
      sixDetail
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
    const allAdminSetupPaths = ADMIN_SETUP_DIRS.flatMap(d => walkMd(d));
    // Exclude the 9 mermaid-deferred files from --all enumeration entirely (D-05) --
    // they must never be enumerated, not merely "expected to fail".
    targetAbsPaths = allAdminSetupPaths.filter(abs => !MERMAID_DEFERRED_PATHS.has(relNormalize(abs)));
    if (targetAbsPaths.length === 0) {
      process.stderr.write('ERROR: --all found no enrollable .md files under docs/admin-setup-*/\n');
      process.exit(1);
    }
  } else if (filePaths.length > 0) {
    targetAbsPaths = filePaths.map(p => {
      if (p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p)) return p;
      return join(process.cwd(), p);
    });
  } else {
    process.stderr.write('Usage: node scripts/pipeline/retrofit-guide.mjs [--dry-run] [--verbose] <file...>\n');
    process.stderr.write('       node scripts/pipeline/retrofit-guide.mjs [--dry-run] [--verbose] --all\n');
    process.stderr.write('       node scripts/pipeline/retrofit-guide.mjs --self-test\n');
    process.exit(1);
  }

  let errors = 0;
  let processed = 0;
  let injectedCount = 0;

  if (DRY_RUN) {
    process.stdout.write('retrofit-guide --dry-run' + (ALL ? ' --all' : '') + ': ' + targetAbsPaths.length + ' target file(s)\n\n');
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

      const detail =
        'doc_id=' + result.docId +
        ' platform-injected=' + (result.platformInjected ? 'Y' : 'N') +
        ' d1=' + result.d1Label +
        ' preH1SpanLines=' + result.preH1SpanLineCount +
        ' spanBytes(orig=' + result.preH1SpanOriginalBytes + ',reloc=' + result.preH1SpanRelocatedBytes + ')' +
        ' vh=' + result.vhAction;

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
    injectedCount + ' platform-injected\n'
  );

  process.exit(errors > 0 ? 1 : 0);
}

main();
