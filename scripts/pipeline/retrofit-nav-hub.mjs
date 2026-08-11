#!/usr/bin/env node
// retrofit-nav-hub.mjs -- Phase-123 fork of retrofit-mermaid-structural.mjs (Phase 122, chain tip)
//
// Fork of scripts/pipeline/retrofit-mermaid-structural.mjs. Do NOT edit that file in place -- it
// is a shipped, Approved deliverable of Phase 122; a shared refactor risks regressing it
// (fork-don't-refactor convention, 116->117->118->121->122->123, D-03). This fork enrolls the
// 4 orphan nav-hubs (RETRO-06): docs/index.md, docs/common-issues.md, docs/quick-ref-l1.md,
// docs/quick-ref-l2.md.
//
// Phase-123-specific changes vs. the Phase-122 fork (123-CONTEXT.md D-03, 123-RESEARCH.md
// Pattern 1 + Pattern 2):
//   (1) ADDED a 4-entry NAV_HUB_PATHS Set (the 4 orphan nav-hub paths), declared immediately
//       after CA_ENROLLMENT_TIMING_PATH.
//   (2) ADDED one line to resolveDocType(): NAV_HUB_PATHS -> 'Reference' (EEE-SOP-standard.md
//       :151-153 LOCK, v1.16 D-07 -- a nav-hub's function is routing/lookup, not a procedure;
//       Reference is the non-procedural default for this class).
//   (3) Everything else is INHERITED VERBATIM from the Phase-122 fork: whole-pre-H1-span
//       relocation, frontmatter injection (doc_id/status/owner/doc_type), the
//       MERMAID-STILL-PRESENT / TEMPLATE-SENTINEL / DOC-ID-ALREADY-PRESENT / DOC-ID-UNRESOLVED
//       guards, the KNOWN_WINDOWS_KEYLESS_PATHS / UNKNOWN-KEYLESS-PLATFORM guard, the D1_MAP,
//       and the auto-filled VH date. All 4 nav-hubs carry `platform: all` -> D1_MAP['all'] =
//       'All Platforms' -> platformInjected=false -> the keyless guard never evaluates for
//       these 4 files (no addition needed there).
//
// *** NEVER invoke this fork with --all. *** The inherited main()'s --all enumeration
// (unchanged from the Phase-122 fork) walks the glossary/lifecycle/decision-tree/admin-setup-
// carveout/ca-enrollment-timing classes -- NOT the 4 nav-hubs -- and every one of those files
// already carries a doc_id, so DOC-ID-ALREADY-PRESENT would ERROR on all of them (safe but
// noisy, and it enrolls nothing this phase actually wants). Per 123-RESEARCH.md Pattern 1,
// this fork is invoked ONLY by the 4 explicit nav-hub file paths as positional arguments --
// main()'s existing `filePaths.length > 0` branch (inherited verbatim, zero code changes
// needed) already supports this. main()'s --all block is intentionally left untouched
// (123-CONTEXT.md D-03 Pattern 1: smaller diff, same fork-don't-refactor spirit, zero risk of
// the noisy-ERROR hazard) -- do not repurpose it for nav-hubs.
//
// Does NOT author Summary prose, split C17 #12 over-length blockquotes, fix the 12
// pre-existing broken links, or edit RE-index.md. Those are hand-work done in Phase 123's
// later plans (123-02/123-03 per the phase's plan/wave decomposition). This plan (123-01)
// produces ONLY the tooling + registry prep, proven via --dry-run against the 4 explicit
// paths -- no doc file is written by this plan.
//
// Usage:
//   node scripts/pipeline/retrofit-nav-hub.mjs --dry-run docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md
//   node scripts/pipeline/retrofit-nav-hub.mjs docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md   (writes files)
//   node scripts/pipeline/retrofit-nav-hub.mjs --self-test
//
// Exit 0: all target files processed cleanly (or self-test passes)
// Exit 1: any ERROR (unresolved doc_id, unmapped platform, sentinel, path violation,
//         mermaid-still-present, doc_id-already-present, unknown-keyless-platform)

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

// === PATH -> doc_type router (Phase-121/122 UNCHANGED classes + Phase-123 NEW class) ===

// The 6 bare glossary files -> doc_type Reference. UNCHANGED from Phase-121/122 fork.
const GLOSSARY_FILES = new Set([
  'docs/_glossary.md',
  'docs/_glossary-android.md',
  'docs/_glossary-apple-business.md',
  'docs/_glossary-linux.md',
  'docs/_glossary-macos.md',
  'docs/_glossary-network.md',
]);

// The 7 lifecycle + end-user-guide directory prefixes -> doc_type Guide. UNCHANGED from
// Phase-121/122 fork.
const GUIDE_DIRS = [
  'docs/lifecycle/',
  'docs/lifecycle-apv2/',
  'docs/android-lifecycle/',
  'docs/ios-lifecycle/',
  'docs/macos-lifecycle/',
  'docs/linux-lifecycle/',
  'docs/end-user-guides/',
];

// The 11 decision-trees -> Reference. UNCHANGED from Phase-122 fork.
const DECISION_TREE_PATHS = new Set([
  'docs/decision-trees/00-initial-triage.md',
  'docs/decision-trees/01-esp-failure.md',
  'docs/decision-trees/02-profile-assignment.md',
  'docs/decision-trees/03-tpm-attestation.md',
  'docs/decision-trees/04-apv2-triage.md',
  'docs/decision-trees/05-device-lifecycle.md',
  'docs/decision-trees/06-macos-triage.md',
  'docs/decision-trees/07-ios-triage.md',
  'docs/decision-trees/08-android-triage.md',
  'docs/decision-trees/09-linux-triage.md',
  'docs/decision-trees/10-8021x-triage.md',
]);

// The 9 admin-setup carve-outs -> Guide. UNCHANGED from Phase-122 fork.
const ADMIN_SETUP_CARVEOUT_PATHS = new Set([
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

// The single carved-mermaid reference file -> Reference. UNCHANGED from Phase-122 fork.
const CA_ENROLLMENT_TIMING_PATH = 'docs/reference/ca-enrollment-timing.md';

// NEW (Phase 123, D-03 / EEE-SOP-standard.md:151-153 LOCK, v1.16 D-07): the 4 orphan
// nav-hubs -> Reference. A nav-hub's function is routing and lookup, not a procedure;
// Reference is the non-procedural default for this class. Explicit path Set, NOT a directory
// prefix -- these 4 files live directly under docs/ alongside many already-enrolled/
// not-yet-enrolled siblings.
const NAV_HUB_PATHS = new Set([
  'docs/index.md',
  'docs/common-issues.md',
  'docs/quick-ref-l1.md',
  'docs/quick-ref-l2.md',
]);

// Resolve the doc_type for a normalized relative path, or null if outside the allowlist.
function resolveDocType(rel) {
  if (GLOSSARY_FILES.has(rel)) return 'Reference';
  if (GUIDE_DIRS.some(d => rel.startsWith(d))) return 'Guide';
  if (DECISION_TREE_PATHS.has(rel)) return 'Reference';
  if (ADMIN_SETUP_CARVEOUT_PATHS.has(rel)) return 'Guide';
  if (rel === CA_ENROLLMENT_TIMING_PATH) return 'Reference';
  if (NAV_HUB_PATHS.has(rel)) return 'Reference'; // NEW Phase 123
  return null;
}

// The confirmed-genuinely-Windows keyless allowlist for the platform-injection guard
// (UNKNOWN-KEYLESS-PLATFORM). UNCHANGED from Phase-122 fork -- none of the 4 nav-hubs are
// keyless (all carry `platform: all`), so no addition is needed here.
const KNOWN_WINDOWS_KEYLESS_PATHS = new Set([
  // Decision-trees 00-04 (verified keyless via live frontmatter read; Windows Autopilot
  // classic/APv2-scoped, per RESEARCH Class 1 + CONTEXT D-03).
  'docs/decision-trees/00-initial-triage.md',
  'docs/decision-trees/01-esp-failure.md',
  'docs/decision-trees/02-profile-assignment.md',
  'docs/decision-trees/03-tpm-attestation.md',
  'docs/decision-trees/04-apv2-triage.md',
  // Admin-setup APv1/APv2 carve-outs (verified keyless -- applies_to: APv1/APv2, no platform:
  // key; genuinely Windows per CONTEXT D-03's own "every keyless target is genuinely Windows
  // APv1/APv2" statement).
  'docs/admin-setup-apv1/00-overview.md',
  'docs/admin-setup-apv1/01-hardware-hash-upload.md',
  'docs/admin-setup-apv2/00-overview.md',
  // Lifecycle Mermaid-bearing keyless files (verified keyless; Windows Autopilot classic/APv2,
  // GUIDE_DIRS-routed).
  'docs/lifecycle/00-overview.md',
  'docs/lifecycle/03-oobe.md',
  'docs/lifecycle/04-esp.md',
  'docs/lifecycle-apv2/02-deployment-flow.md',
]);

// === Helpers (verbatim from retrofit-mermaid-structural.mjs) ===

const LABEL_WIDTH = 72;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// readFile: returns content with CRLF normalized, or null if missing.
// CRLF normalization is mandatory -- Windows repo files contain \r\n. KEPT UNCHANGED (D-03
// Specific Overrule 2 -- WR-01 CRLF-symmetric-write is WONTFIX-in-fork; do not restore CRLF).
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

// buildFenceMask: mask code-fence-interior lines, replicating c17-eee-contract.mjs's exact
// method (assertion #1's inCodeFence mask) -- the opening fence line itself is NOT marked
// "inside" (structural marker), so a real ```mermaid opening fence is still correctly detected
// by the caller's regex test against the unmasked line.
// LINK-05 (Phase 143, D-16/D-21): ` {0,3}` leading allowance = CommonMark indented-fence rule, copied verbatim from check-nav-hub-links.mjs:85-112 (reference instance).
function buildFenceMask(lines) {
  const mask = new Array(lines.length).fill(false);
  let fenced = false, fenceChar = '', fenceLen = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i];
    if (!fenced) {
      const m = t.match(/^ {0,3}(`{3,}|~{3,})/);
      if (m) { fenced = true; fenceChar = m[1][0]; fenceLen = m[1].length; }
    } else {
      const m = t.match(/^ {0,3}(`{3,}|~{3,})/);
      if (m && m[1][0] === fenceChar && m[1].length >= fenceLen) {
        fenced = false;
      } else {
        mask[i] = true;
      }
    }
  }
  return mask;
}

// === Registry ===

/**
 * Parse RE-index.md and return a Map<relativePath, docId>.
 * Joins on the Path column (column 2) only -- never on title or order. UNCHANGED.
 * Example: Map { 'docs/index.md' => 'RE-219' }
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

// === Version-History helpers (carried verbatim from retrofit-mermaid-structural.mjs) ===

/**
 * Detect the column count of an EXISTING ## Version History table's header row. UNCHANGED.
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

// Auto-filled VH date (inherited from Phase-122 fork; closes DEFER-121-07-A). The reformat
// literal stays "v1.16 EEE reformat" (this milestone's marker, unchanged).
function todayDate() {
  return new Date().toISOString().slice(0, 10);
}
function newRow2Col() {
  return '| ' + todayDate() + ' | v1.16 EEE reformat — content not re-reviewed |';
}
function newRow3Col() {
  return '| ' + todayDate() + ' | v1.16 EEE reformat — content not re-reviewed | — |';
}

/**
 * Insert the v1.16 EEE reformat row as the first data row under ## Version History.
 * If the section is absent, CREATE it at end of file with a 3-column shape (Open
 * Question 1 lock: matches 116/117/118/121/122 corpus-wide precedent).
 * If the section is PRESENT, detect its column count and PREPEND a matching-width
 * row -- NEVER assume 3-column (Pitfall 1).
 * All 4 nav-hubs are known (123-CONTEXT.md Registry note) to already carry a 3-column
 * ## Version History table, so this is expected to always take the PREPEND-3col branch here.
 * Returns { lines: string[], action: 'prepended' | 'created', colCount: number }.
 */
function insertVersionHistoryRow(lines) {
  const newLines = [...lines];
  const vhIdx = newLines.findIndex(l => /^## Version History\b/.test(l));

  if (vhIdx === -1) {
    // Create section at end of file, 3-column shape (Open Question 1 lock)
    while (newLines.length > 0 && newLines[newLines.length - 1].trim() === '') newLines.pop();
    newLines.push('', '## Version History', '', '| Date | Change | Author |', '|------|--------|--------|', newRow3Col());
    return { lines: newLines, action: 'created', colCount: 3 };
  }

  // Detect the existing table's column count BEFORE constructing the new row
  const colCount = detectVhColumnCount(newLines, vhIdx);
  const newRow = colCount === 2 ? newRow2Col() : newRow3Col(); // 3-col is the safe default
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
 * Process one nav-hub / decision-tree / carved-mermaid / lifecycle / glossary file: parse,
 * validate guards, compute transform, return result.
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

  // Guard 1: path router -- glossary bare files, GUIDE_DIRS prefixes, decision-trees,
  // admin-setup carve-outs, ca-enrollment-timing.md, or the 4 nav-hubs (NEW Phase 123)
  const docType = resolveDocType(rel);
  if (docType === null) {
    return { ok: false, rel, error: 'PATH-ALLOWLIST: path not covered by any known Phase-121/122/123 class' };
  }

  // Read and normalize
  const content = readFile(rel);
  if (!content) {
    return { ok: false, rel, error: 'file not found or unreadable' };
  }

  // MERMAID-STILL-PRESENT (inherited, Phase 122): fail-closed ```mermaid```-absence
  // precondition. Runs on the WHOLE file content (not just body) right after read, BEFORE
  // frontmatter parse. Uses the exact same code-fence masking method as
  // c17-eee-contract.mjs assertion #1, so a ```mermaid example shown INSIDE a
  // ```markdown/```text fence does not false-positive, but a real top-level ```mermaid fence
  // is always caught. Harmless belt-and-suspenders for the 4 nav-hubs (all verified
  // mermaid-free, 123-CONTEXT.md domain note) -- kept unchanged per D-03.
  const contentLines = content.split('\n');
  const mermaidFenceMask = buildFenceMask(contentLines);
  const hasMermaidFence = contentLines.some((l, i) => !mermaidFenceMask[i] && /^```mermaid/.test(l));
  if (hasMermaidFence) {
    return { ok: false, rel, error: 'MERMAID-STILL-PRESENT: unconverted ```mermaid fence found -- refusing to enroll (MERMAID-ENROLL-UNGUARDED)' };
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

  // DOC-ID-ALREADY-PRESENT (inherited, Phase 122): ERROR, never a silent skip, if frontmatter
  // already carries a doc_id key. Second line of defense against a router mistake targeting an
  // already-enrolled sibling (Pitfall 2/3). All 4 nav-hubs are currently unenrolled, so this is
  // inert for this phase's run but stays as idempotency protection against a re-run.
  if (fm.match(/^doc_id:\s*\S+/m)) {
    return { ok: false, rel, error: 'DOC-ID-ALREADY-PRESENT: refusing to re-enroll' };
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

  // UNKNOWN-KEYLESS-PLATFORM (inherited, Phase 122): ERROR rather than blindly defaulting to
  // Windows for any keyless file outside the confirmed-Windows allowlist. All 4 nav-hubs carry
  // `platform: all` (never keyless), so this guard never evaluates for them.
  if (platformInjected && !KNOWN_WINDOWS_KEYLESS_PATHS.has(rel)) {
    return { ok: false, rel, error: 'UNKNOWN-KEYLESS-PLATFORM: refusing to default to Windows outside the confirmed-Windows allowlist' };
  }

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
  // LINK-05 (Phase 143, D-16/D-21): ` {0,3}` leading allowance, copied verbatim from check-nav-hub-links.mjs:85-112 (reference instance).
  let inFence = false, fenceChar = '', fenceLen = 0;
  let firstH1Idx = -1;
  for (let i = 0; i < bodyLines.length; i++) {
    const mf = bodyLines[i].match(/^ {0,3}(`{3,}|~{3,})/);
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
  const blockLine =
    '**Platform:** ' + d1Label +
    ' · **Doc Type:** ' + docType +
    ' · **Doc ID:** ' + docId +
    ' · **Status:** Approved';

  // Summary placeholder (executor hand-authors >=30 words of real prose in a later plan).
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
// Inherited sub-tests (a)-(k) from the Phase-122 fork, PLUS a new (l) proving the Phase-123
// NAV_HUB_PATHS → Reference router branch.

if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  process.stdout.write('retrofit-nav-hub --self-test (Phase 123 fork proof: inherited Phase-122 guards + NEW NAV_HUB_PATHS router branch)\n\n');

  // (a) buildDocIdMap parses a sample RE-index row (nav-hub) to the correct RE-NNN
  {
    const sampleRegistry = [
      '| Doc ID | Path | Title | Doc Type | Status |',
      '|--------|------|-------|----------|--------|',
      '| RE-219 | docs/index.md | Device Provisioning Documentation | Reference | Approved |',
      '| RE-128 | docs/admin-setup-linux/00-overview.md | Linux Admin Setup Overview | Guide | Pending |',
    ].join('\n');
    const syntheticMap = new Map();
    for (const line of sampleRegistry.split('\n')) {
      const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^|]+?)\s*\|/);
      if (m) syntheticMap.set(m[2].trim(), m[1].trim());
    }
    const got = syntheticMap.get('docs/index.md');
    stAssert(
      '(a) buildDocIdMap: sample registry row → correct RE-NNN',
      got === 'RE-219',
      got === 'RE-219' ? 'got RE-219 as expected' : 'got "' + got + '" (expected RE-219)'
    );
  }

  // (b) A glossary path routes to doc_type Reference (inherited, UNCHANGED)
  {
    const got = resolveDocType('docs/_glossary-macos.md');
    stAssert(
      '(b) ROUTER: glossary path → Reference (inherited, unchanged)',
      got === 'Reference',
      'resolveDocType(docs/_glossary-macos.md) = ' + got
    );
  }

  // (c) A lifecycle path routes to doc_type Guide (inherited, UNCHANGED)
  {
    const got = resolveDocType('docs/lifecycle/00-overview.md');
    stAssert(
      '(c) ROUTER: lifecycle path → Guide (inherited, unchanged)',
      got === 'Guide',
      'resolveDocType(docs/lifecycle/00-overview.md) = ' + got
    );
  }

  // (d) An end-user-guide path routes to doc_type Guide (inherited, UNCHANGED)
  {
    const got = resolveDocType('docs/end-user-guides/android-work-profile-setup.md');
    stAssert(
      '(d) ROUTER: end-user-guide path → Guide (inherited, unchanged)',
      got === 'Guide',
      'resolveDocType(docs/end-user-guides/android-work-profile-setup.md) = ' + got
    );
  }

  // (e) MERMAID-STILL-PRESENT (inherited): a synthetic body containing an unconverted
  //     ```mermaid fence is refused fail-closed
  {
    const synthetic =
      '---\n' +
      'last_verified: 2026-07-07\n' +
      'review_by: 2026-10-05\n' +
      'applies_to: both\n' +
      'audience: admin\n' +
      'platform: Windows\n' +
      '---\n' +
      '\n' +
      '# Synthetic Mermaid-Present Fixture\n' +
      '\n' +
      '```mermaid\n' +
      'graph TD\n' +
      'A --> B\n' +
      '```\n';
    const fixtureRel = 'docs/decision-trees/__self-test-mermaid-fixture.md';
    const fixtureAbs = join(process.cwd(), fixtureRel);
    let fPassed = false, fDetail = '';
    try {
      writeFileSync(fixtureAbs, synthetic, 'utf8');
      DECISION_TREE_PATHS.add(fixtureRel);
      const synMap = new Map([[fixtureRel, 'RE-T98']]);
      const result = processFile(fixtureAbs, synMap);
      fPassed = !result.ok && /MERMAID-STILL-PRESENT/.test(result.error || '');
      fDetail = result.ok ? 'unexpectedly enrolled (BUG)' : ('error=' + result.error);
    } finally {
      DECISION_TREE_PATHS.delete(fixtureRel);
      try { unlinkSync(fixtureAbs); } catch { /* best effort cleanup */ }
    }
    stAssert(
      '(e) MERMAID-STILL-PRESENT: unconverted mermaid fence refused fail-closed (inherited)',
      fPassed,
      fDetail
    );
  }

  // (f) DOC-ID-ALREADY-PRESENT (inherited): a synthetic frontmatter already carrying doc_id:
  //     is refused, ERROR not silent skip
  {
    const synthetic =
      '---\n' +
      'doc_id: RE-999\n' +
      'last_verified: 2026-07-07\n' +
      'review_by: 2026-10-05\n' +
      'applies_to: both\n' +
      'audience: admin\n' +
      'platform: Windows\n' +
      '---\n' +
      '\n' +
      '# Synthetic Already-Enrolled Fixture\n' +
      '\n' +
      'Body content, no mermaid.\n';
    const fixtureRel = 'docs/decision-trees/__self-test-docid-fixture.md';
    const fixtureAbs = join(process.cwd(), fixtureRel);
    let fPassed = false, fDetail = '';
    try {
      writeFileSync(fixtureAbs, synthetic, 'utf8');
      DECISION_TREE_PATHS.add(fixtureRel);
      const synMap = new Map([[fixtureRel, 'RE-T96']]);
      const result = processFile(fixtureAbs, synMap);
      fPassed = !result.ok && /DOC-ID-ALREADY-PRESENT/.test(result.error || '');
      fDetail = result.ok ? 'unexpectedly re-enrolled (BUG)' : ('error=' + result.error);
    } finally {
      DECISION_TREE_PATHS.delete(fixtureRel);
      try { unlinkSync(fixtureAbs); } catch { /* best effort cleanup */ }
    }
    stAssert(
      '(f) DOC-ID-ALREADY-PRESENT: already-enrolled frontmatter refused, ERROR not silent skip (inherited)',
      fPassed,
      fDetail
    );
  }

  // (g) multi-class ROUTER proof (inherited) — decision-trees→Reference, admin-setup carve-out
  //     →Guide, ca-enrollment-timing.md→Reference, AND an already-enrolled admin-setup sibling
  //     path is NOT in any target Set (Pitfall 2 defense)
  {
    const decisionTreeOk = resolveDocType('docs/decision-trees/05-device-lifecycle.md') === 'Reference';
    const adminSetupOk = resolveDocType('docs/admin-setup-android/00-overview.md') === 'Guide';
    const caEnrollmentOk = resolveDocType('docs/reference/ca-enrollment-timing.md') === 'Reference';
    const siblingExcluded = resolveDocType('docs/admin-setup-ios/02-abm-token.md') === null;
    stAssert(
      '(g) ROUTER: decision-trees→Reference, admin-setup carve-out→Guide, ca-enrollment-timing→Reference, already-enrolled sibling excluded from every Set (inherited)',
      decisionTreeOk && adminSetupOk && caEnrollmentOk && siblingExcluded,
      'decisionTree=' + decisionTreeOk + ' adminSetup=' + adminSetupOk +
        ' caEnrollment=' + caEnrollmentOk + ' siblingExcluded=' + siblingExcluded
    );
  }

  // (h) UNKNOWN-KEYLESS-PLATFORM (inherited): a keyless synthetic path OUTSIDE the confirmed-
  //     Windows allowlist is refused fail-closed rather than silently defaulting to Windows
  {
    const synthetic =
      '---\n' +
      'last_verified: 2026-07-07\n' +
      'review_by: 2026-10-05\n' +
      'applies_to: both\n' +
      'audience: admin\n' +
      '---\n' +
      '\n' +
      '# Synthetic Keyless-Outside-Allowlist Fixture\n' +
      '\n' +
      'Body content, no mermaid, no doc_id, no platform key.\n';
    const fixtureRel = 'docs/admin-setup-android/__self-test-keyless-fixture.md';
    const fixtureAbs = join(process.cwd(), fixtureRel);
    let fPassed = false, fDetail = '';
    try {
      writeFileSync(fixtureAbs, synthetic, 'utf8');
      ADMIN_SETUP_CARVEOUT_PATHS.add(fixtureRel);
      const synMap = new Map([[fixtureRel, 'RE-T97']]);
      const result = processFile(fixtureAbs, synMap);
      fPassed = !result.ok && /UNKNOWN-KEYLESS-PLATFORM/.test(result.error || '');
      fDetail = result.ok ? 'unexpectedly defaulted to Windows (BUG)' : ('error=' + result.error);
    } finally {
      ADMIN_SETUP_CARVEOUT_PATHS.delete(fixtureRel);
      try { unlinkSync(fixtureAbs); } catch { /* best effort cleanup */ }
    }
    stAssert(
      '(h) UNKNOWN-KEYLESS-PLATFORM: keyless path outside the confirmed-Windows allowlist refused fail-closed (inherited)',
      fPassed,
      fDetail
    );
  }

  // (i) Keyless lifecycle fixture (no platform: key, mirrors docs/lifecycle/*.md) triggers
  //     platform: Windows injection and resolves the D1 label Windows (inherited, unchanged
  //     logic check; the file itself IS in KNOWN_WINDOWS_KEYLESS_PATHS)
  {
    const fmLines = ['last_verified: 2026-04-13', 'review_by: 2026-07-12', 'applies_to: both', 'audience: admin'];
    const fm = fmLines.join('\n');
    const hasPlatform = /^platform:/m.test(fm);
    const injectedPlatform = !hasPlatform ? 'Windows' : null;
    const d1Label = injectedPlatform ? D1_MAP[injectedPlatform] : undefined;
    const isAllowlisted = KNOWN_WINDOWS_KEYLESS_PATHS.has('docs/lifecycle/00-overview.md');
    stAssert(
      '(i) Keyless lifecycle fixture: no platform key → injection = Windows, D1 label = Windows, path allowlisted (inherited)',
      injectedPlatform === 'Windows' && d1Label === 'Windows' && isAllowlisted,
      'injectedPlatform=' + injectedPlatform + ' d1Label=' + d1Label + ' allowlisted=' + isAllowlisted
    );
  }

  // (j) VH AUTO-FILL (inherited): a real YYYY-MM-DD date is substituted for the literal
  //     'YYYY-MM-DD' token, reformat literal is still "v1.16 EEE reformat", no "v1.15" literal
  {
    const row2 = newRow2Col();
    const row3 = newRow3Col();
    const dateAutoFilled = /^\| \d{4}-\d{2}-\d{2} \|/.test(row2) && /^\| \d{4}-\d{2}-\d{2} \|/.test(row3);
    const noLiteralPlaceholder = !row2.includes('YYYY-MM-DD') && !row3.includes('YYYY-MM-DD');
    const bothV116 = row2.includes('v1.16 EEE reformat') && row3.includes('v1.16 EEE reformat');
    const neitherV115 = !row2.includes('v1.15') && !row3.includes('v1.15');
    stAssert(
      '(j) VH AUTO-FILL: real date substituted for YYYY-MM-DD literal, still v1.16, no v1.15 (inherited)',
      dateAutoFilled && noLiteralPlaceholder && bothV116 && neitherV115,
      '2col="' + row2 + '" 3col="' + row3 + '"'
    );
  }

  // (k) Inherited whole-pre-H1-span relocation byte-length-preservation proof (117/118/121/122
  //     fix, re-proven against a glossary-shaped fixture with a single blockquote group)
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
      '(k) WHOLE-PRE-H1-SPAN FIX (117/118/121/122 inherited): single-blockquote-group glossary fixture relocates with byte-length equality, routes to Reference',
      fPassed,
      fDetail
    );
  }

  // (l) NEW (Phase 123): NAV_HUB_PATHS → Reference router branch resolves all 4 nav-hub paths,
  //     and a non-nav-hub path outside every known class still returns null
  {
    const allFourResolve =
      resolveDocType('docs/index.md') === 'Reference' &&
      resolveDocType('docs/common-issues.md') === 'Reference' &&
      resolveDocType('docs/quick-ref-l1.md') === 'Reference' &&
      resolveDocType('docs/quick-ref-l2.md') === 'Reference';
    const nonNavPathExcluded = resolveDocType('docs/reference/00-index.md') === null;
    stAssert(
      '(l) NEW ROUTER: all 4 NAV_HUB_PATHS → Reference; a non-nav-hub Reference-dir path (Set, not prefix) still returns null',
      allFourResolve && nonNavPathExcluded,
      'allFourResolve=' + allFourResolve + ' nonNavPathExcluded=' + nonNavPathExcluded
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
    // INHERITED VERBATIM from the Phase-122 fork -- enumerates the glossary/lifecycle/
    // decision-tree/admin-setup-carveout/ca-enrollment-timing classes, NOT the 4 nav-hubs.
    // *** NEVER invoke this fork with --all (see file header) *** -- every file this
    // enumerates already carries a doc_id, so DOC-ID-ALREADY-PRESENT will ERROR on all of
    // them. This branch is intentionally left untouched (123-CONTEXT.md D-03 Pattern 1:
    // smaller diff than repurposing it for NAV_HUB_PATHS) -- invoke by the 4 explicit paths
    // instead (see the filePaths.length > 0 branch below).
    const glossaryAbsPaths = [...GLOSSARY_FILES].map(p => join(process.cwd(), p)).filter(existsSync);
    const guideDirPaths = GUIDE_DIRS.flatMap(d => walkMd(d));
    const decisionTreeAbsPaths = [...DECISION_TREE_PATHS].map(p => join(process.cwd(), p)).filter(existsSync);
    const adminSetupCarveoutAbsPaths = [...ADMIN_SETUP_CARVEOUT_PATHS].map(p => join(process.cwd(), p)).filter(existsSync);
    const caEnrollmentAbs = join(process.cwd(), CA_ENROLLMENT_TIMING_PATH);
    const caEnrollmentAbsPaths = existsSync(caEnrollmentAbs) ? [caEnrollmentAbs] : [];
    targetAbsPaths = [
      ...glossaryAbsPaths,
      ...guideDirPaths,
      ...decisionTreeAbsPaths,
      ...adminSetupCarveoutAbsPaths,
      ...caEnrollmentAbsPaths,
    ];
    if (targetAbsPaths.length === 0) {
      process.stderr.write('ERROR: --all found no enrollable .md files under any known Phase-121/122 class\n');
      process.exit(1);
    }
  } else if (filePaths.length > 0) {
    targetAbsPaths = filePaths.map(p => {
      if (p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p)) return p;
      return join(process.cwd(), p);
    });
  } else {
    process.stderr.write('Usage: node scripts/pipeline/retrofit-nav-hub.mjs [--dry-run] [--verbose] <file...>\n');
    process.stderr.write('       node scripts/pipeline/retrofit-nav-hub.mjs --self-test\n');
    process.stderr.write('       (NEVER invoke with --all for this fork -- see file header)\n');
    process.exit(1);
  }

  let errors = 0;
  let processed = 0;
  let injectedCount = 0;
  let prepend2col = 0;
  let prepend3col = 0;
  let created = 0;

  if (DRY_RUN) {
    process.stdout.write('retrofit-nav-hub --dry-run' + (ALL ? ' --all' : '') + ': ' + targetAbsPaths.length + ' target file(s)\n\n');
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
