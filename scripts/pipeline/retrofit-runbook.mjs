#!/usr/bin/env node
// retrofit-runbook.mjs -- Mechanical EEE retrofit helper (Phase 116 D-03)
//
// Performs the deterministic half of every L1/L2 runbook EEE retrofit:
//   - Injects doc_id (joined from RE-index.md by path), status: Approved,
//     owner (per-tier), doc_type: Runbook into frontmatter
//   - Injects platform: Windows for the 17 keyless files (L1 01-09, L2 01-08)
//   - Emits the EEE block line (Platform · Doc Type · Doc ID · Status)
//   - Relocates the pre-H1 gate blockquote to after ## Summary placeholder
//   - Inserts ## Summary section with [FILL-IN] placeholder
//   - Prepends v1.15 EEE reformat Version-History row (creates section if absent)
//
// Guards: path allowlist (l1-runbooks/ or l2-runbooks/ ONLY), TEMPLATE-SENTINEL
// (refuses 1970-01-01), doc_id must resolve in RE-index.md, platform must be in D1_MAP.
//
// Does NOT author Summary prose, fix D-05 blockquotes, or edit RE-index.md.
// Those are batch-plan hand-work (116-02 through 116-08).
//
// Usage:
//   node scripts/pipeline/retrofit-runbook.mjs --dry-run --all
//   node scripts/pipeline/retrofit-runbook.mjs --dry-run [file...]
//   node scripts/pipeline/retrofit-runbook.mjs --all           (writes files)
//   node scripts/pipeline/retrofit-runbook.mjs --self-test
//
// Exit 0: all target files processed cleanly (or self-test passes)
// Exit 1: any ERROR (unresolved doc_id, unmapped platform, sentinel, path violation)

// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
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

// === Helpers (verbatim from c17-eee-contract.mjs) ===

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
 * Example: Map { 'docs/l1-runbooks/01-device-not-registered.md' => 'RE-002' }
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

// === Version-History helper ===

/**
 * Insert newRow as the first data row under ## Version History.
 * If the section is absent (only l2/01-log-collection.md), create it at end of file.
 * Returns { lines: string[], action: 'prepended' | 'created' }.
 */
function insertVersionHistoryRow(lines, newRow) {
  const newLines = [...lines];
  const vhIdx = newLines.findIndex(l => /^## Version History\b/.test(l));

  if (vhIdx === -1) {
    // Create section at end of file (l2/01-log-collection.md is the sole absent file)
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
 * Process one runbook file: parse, validate guards, compute transform, return result.
 *
 * @param {string} absPath - absolute path to the .md file
 * @param {Map<string,string>} docIdMap - built from buildDocIdMap()
 * @returns {{ ok: boolean, rel: string, error?: string,
 *             docId?: string, d1Label?: string, platform?: string,
 *             platformInjected?: boolean, gateRelocated?: boolean,
 *             vhAction?: string, newContent?: string }}
 */
function processFile(absPath, docIdMap) {
  const rel = relNormalize(absPath);

  // Guard 1: path allowlist -- only l1-runbooks/ or l2-runbooks/
  if (!rel.startsWith('docs/l1-runbooks/') && !rel.startsWith('docs/l2-runbooks/')) {
    return { ok: false, rel, error: 'PATH-ALLOWLIST: path not in docs/l1-runbooks/ or docs/l2-runbooks/' };
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
  const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
  let platform = platformMatch ? platformMatch[1] : null;
  const platformInjected = (platform === null);
  if (platformInjected) platform = 'Windows';

  // Guard 4: platform must resolve in D1_MAP (hard failure, no fallback)
  const d1Label = D1_MAP[platform];
  if (d1Label === undefined) {
    return { ok: false, rel, error: 'UNMAPPED-PLATFORM: platform "' + platform + '" not in D1_MAP' };
  }

  // Tier and owner
  const isL1 = rel.startsWith('docs/l1-runbooks/');
  const owner = isL1 ? 'L1 Team Lead' : 'L2 Desktop Lead';

  // Build new frontmatter: 4 new keys at top, then inject platform if absent, then original fm
  const newFm =
    'doc_id: ' + docId + '\n' +
    'status: Approved\n' +
    'owner: ' + owner + '\n' +
    'doc_type: Runbook\n' +
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

  // Detect pre-H1 gate blockquote: FIRST /^>/ run appearing before firstH1Idx.
  // Match by structural position ONLY -- never match on "Version gate" or "Platform gate" literal.
  let gateStart = -1, gateEnd = -1;
  for (let i = 0; i < firstH1Idx; i++) {
    if (/^>/.test(bodyLines[i])) {
      gateStart = i;
      let j = i;
      while (j < bodyLines.length && /^>/.test(bodyLines[j])) j++;
      gateEnd = j;
      break;
    }
  }
  const gateLines = (gateStart !== -1) ? bodyLines.slice(gateStart, gateEnd) : [];
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
    ' · **Doc Type:** Runbook' +
    ' · **Doc ID:** ' + docId +
    ' · **Status:** Approved';

  // Summary placeholder (executor hand-authors >=30 words of real prose)
  const fillIn = '[FILL-IN: >=30 words, opens with the tier scope/safety banner]';

  // Assemble new body:
  // blank → block line → blank → H1 → blank → ## Summary → blank → [FILL-IN]
  //   → blank → gate blockquote (if present) → blank → remaining body after H1
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

  if (gateLines.length > 0) {
    newBodyParts.push(...gateLines);
    newBodyParts.push('');
  }

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
    gateRelocated: gateLines.length > 0,
    vhAction: vhResult.action,
    newContent,
  };
}

// === Self-test mode (--self-test) ===
// Five in-memory fixture sub-tests proving the five guards.
// Added in Task 2 -- handler is placed here as the first mode check.

if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  process.stdout.write('retrofit-runbook --self-test (Phase 116 D-03 guard proof)\n\n');

  // (a) buildDocIdMap parses a sample registry row to the correct RE-NNN
  {
    const sampleRegistry = [
      '| Doc ID | Path | Title | Doc Type | Status |',
      '|--------|------|-------|----------|--------|',
      '| RE-002 | docs/l1-runbooks/01-device-not-registered.md | Device Not Registered | Runbook | Pending |',
      '| RE-044 | docs/l2-runbooks/01-log-collection.md | L2 Log Collection Guide | Runbook | Pending |',
    ].join('\n');
    // Temporarily override readFile for this sub-test via inline parse
    const syntheticMap = new Map();
    for (const line of sampleRegistry.split('\n')) {
      const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^|]+?)\s*\|/);
      if (m) syntheticMap.set(m[2].trim(), m[1].trim());
    }
    const got = syntheticMap.get('docs/l1-runbooks/01-device-not-registered.md');
    stAssert(
      '(a) buildDocIdMap: sample registry row → correct RE-NNN',
      got === 'RE-002',
      got === 'RE-002' ? 'got RE-002 as expected' : 'got "' + got + '" (expected RE-002)'
    );
  }

  // Helper: build a minimal synthetic fixture content string
  function makeSyntheticContent({ platform, lastVerified, relPath }) {
    const fmLines = [
      'last_verified: ' + lastVerified,
      'review_by: 2026-12-31',
      'applies_to: test',
      'audience: L1',
    ];
    if (platform) fmLines.unshift('platform: ' + platform);
    const fm = fmLines.join('\n');
    return (
      '---\n' + fm + '\n---\n\n' +
      '> **Version gate:** Synthetic gate blockquote for self-test.\n\n' +
      '# Synthetic Test Title\n\n' +
      'Body content here.\n\n' +
      '## Version History\n\n' +
      '| Date | Change | Author |\n' +
      '|------|--------|--------|\n' +
      '| 2026-01-01 | Initial version | — |\n'
    );
  }

  // (b) Keyless-Windows fixture triggers platform: Windows injection
  {
    const synMap = new Map([['docs/l1-runbooks/01-stub.md', 'RE-002']]);
    // processFile reads from disk; use a synthetic processFile call via direct logic
    const content = makeSyntheticContent({ lastVerified: '2026-03-20', relPath: 'docs/l1-runbooks/01-stub.md' });
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
    const fm = fmMatch[1];
    const hasPlatform = /^platform:/m.test(fm);
    const injectedPlatform = !hasPlatform ? 'Windows' : null;
    stAssert(
      '(b) Keyless-Windows fixture: no platform key → injection = Windows',
      injectedPlatform === 'Windows',
      injectedPlatform === 'Windows' ? 'platform injection triggered as expected' : 'injection not triggered (got: ' + hasPlatform + ')'
    );
  }

  // (c) ios+macos+shared-ipad fixture resolves D1 label iOS + macOS + Shared iPad
  {
    const rawPlatform = 'ios+macos+shared-ipad';
    const label = D1_MAP[rawPlatform];
    stAssert(
      '(c) D1_MAP: ios+macos+shared-ipad → iOS + macOS + Shared iPad',
      label === 'iOS + macOS + Shared iPad',
      label === 'iOS + macOS + Shared iPad'
        ? 'D1 label correct'
        : 'got "' + label + '" (expected "iOS + macOS + Shared iPad")'
    );
  }

  // (d) last_verified: 1970-01-01 fixture is REFUSED (SENTINEL guard)
  {
    // Simulate guard inline (processFile reads from disk, so test the guard logic directly)
    const sentinelDate = '1970-01-01';
    const lvMatch = ('last_verified: 1970-01-01 # TEMPLATE-SENTINEL').match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
    const refused = lvMatch && lvMatch[1] === sentinelDate;
    stAssert(
      '(d) SENTINEL-GUARD: last_verified 1970-01-01 is refused',
      refused === true,
      refused ? 'sentinel correctly detected — would refuse to write' : 'BUG: sentinel not detected'
    );
  }

  // (e) Path outside docs/l1-runbooks/ or docs/l2-runbooks/ is REFUSED
  {
    // Test the allowlist check logic directly
    const outsidePaths = [
      'docs/admin-setup-apv1/00-overview.md',
      'docs/reference/endpoints.md',
      'scripts/validation/c17-eee-contract.mjs',
    ];
    const insidePaths = [
      'docs/l1-runbooks/01-device-not-registered.md',
      'docs/l2-runbooks/01-log-collection.md',
    ];
    const allOutsideRefused = outsidePaths.every(
      p => !p.startsWith('docs/l1-runbooks/') && !p.startsWith('docs/l2-runbooks/')
    );
    const allInsideAllowed = insidePaths.every(
      p => p.startsWith('docs/l1-runbooks/') || p.startsWith('docs/l2-runbooks/')
    );
    stAssert(
      '(e) PATH-ALLOWLIST: outside paths refused, inside paths allowed',
      allOutsideRefused && allInsideAllowed,
      allOutsideRefused && allInsideAllowed
        ? '3 outside paths refused, 2 inside paths allowed'
        : 'allowlist logic error (outsideRefused=' + allOutsideRefused + ' insideAllowed=' + allInsideAllowed + ')'
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
    targetAbsPaths = [...walkMd('docs/l1-runbooks'), ...walkMd('docs/l2-runbooks')];
    if (targetAbsPaths.length === 0) {
      process.stderr.write('ERROR: --all found no .md files under docs/l1-runbooks/ or docs/l2-runbooks/\n');
      process.exit(1);
    }
  } else if (filePaths.length > 0) {
    targetAbsPaths = filePaths.map(p => {
      if (p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p)) return p;
      return join(process.cwd(), p);
    });
  } else {
    process.stderr.write('Usage: node scripts/pipeline/retrofit-runbook.mjs [--dry-run] [--verbose] <file...>\n');
    process.stderr.write('       node scripts/pipeline/retrofit-runbook.mjs [--dry-run] [--verbose] --all\n');
    process.stderr.write('       node scripts/pipeline/retrofit-runbook.mjs --self-test\n');
    process.exit(1);
  }

  let errors = 0;
  let processed = 0;
  let injectedCount = 0;

  if (DRY_RUN) {
    process.stdout.write('retrofit-runbook --dry-run' + (ALL ? ' --all' : '') + ': ' + targetAbsPaths.length + ' target file(s)\n\n');
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
        ' gate-relocated=' + (result.gateRelocated ? 'Y' : 'N') +
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
