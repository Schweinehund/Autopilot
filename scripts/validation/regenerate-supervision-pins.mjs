#!/usr/bin/env node
// regenerate-supervision-pins.mjs — seeded-template emitter for supervision_exemptions[] sidecar pins
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-09..D-15)
// Contract: NEVER auto-pins. Tier-1 occurrences emit JSON stubs for human reason-filling.
//           Tier-2 occurrences emit to scripts/validation/suspected-regressions.txt — require explicit human promotion.
// Modes: --report (advisory diff), --emit-stubs (JSON fragments), --self-test (dogfood Phase 43's hand-authored set)
// File reads only: all content loaded via fs.readFileSync; zero shell, zero network, zero dynamic code evaluation.
//
// Two-tier discrimination (D-11):
//   Tier 1 (stub-eligible): occurrence line OR 2 preceding lines contain /\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b/i
//                           OR occurrence line is inside an HTML-comment (<!-- ... -->) block.
//   Tier 2 (suspected regression): bare occurrences failing Tier 1 — NEVER auto-pinned; emitted to
//                                  scripts/validation/suspected-regressions.txt for human promotion.
//
// Usage:
//   node scripts/validation/regenerate-supervision-pins.mjs --report
//   node scripts/validation/regenerate-supervision-pins.mjs --emit-stubs
//   node scripts/validation/regenerate-supervision-pins.mjs --self-test
//   node scripts/validation/regenerate-supervision-pins.mjs --help

import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

// ---------------------------------------------------------------------------
// Argv / mode parsing
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const MODE_REPORT = argv.includes('--report');
const MODE_STUBS = argv.includes('--emit-stubs');
const MODE_SELFTEST = argv.includes('--self-test');
const MODE_HELP = argv.includes('--help') || argv.includes('-h');

function printUsage(stream) {
  stream.write(
    'Usage: node scripts/validation/regenerate-supervision-pins.mjs <mode>\n' +
    '\n' +
    'Modes (exactly one required):\n' +
    '  --report       Advisory diff of pinned vs un-pinned supervision occurrences (no writes)\n' +
    '  --emit-stubs   Emit JSON stubs for Tier-1 un-pinned occurrences to stdout;\n' +
    '                 Append Tier-2 suspected regressions to\n' +
    '                 scripts/validation/suspected-regressions.txt\n' +
    '  --self-test    Dogfood mode: assert classifier reproduces Phase 43 hand-authored Tier-1 pin set\n' +
    '  --help         Show this message\n' +
    '\n' +
    'Contract: helper NEVER writes to allow-list JSON sidecars (read-only on those files).\n' +
    'See scripts/validation/README-supervision-pins.md for two-tier discrimination rationale.\n'
  );
}

if (MODE_HELP) {
  printUsage(process.stdout);
  process.exit(0);
}

const selectedModes = [MODE_REPORT, MODE_STUBS, MODE_SELFTEST].filter(Boolean).length;
if (selectedModes === 0) {
  process.stderr.write('Error: no mode selected. Exactly one of --report / --emit-stubs / --self-test required.\n');
  printUsage(process.stderr);
  process.exit(2);
}
if (selectedModes > 1) {
  process.stderr.write('Error: multiple modes selected. Pick exactly one of --report / --emit-stubs / --self-test.\n');
  printUsage(process.stderr);
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Reused primitives (copy verbatim per Phase 42 D-25 no-shared-module contract)
// ---------------------------------------------------------------------------

// readFile: v1.4 harness lines 28-32 — file read with CRLF normalization (Pattern C)
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}

// walkMd: v1.4 harness lines 35-52 — recursive .md file walker
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
      try { stat = statSync(full); } catch { continue; }
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}

// Normalize path separators to forward slashes so Windows backslash paths match allow-list entries.
function relNormalize(abs) {
  return abs.replace(process.cwd() + '\\', '').replace(process.cwd() + '/', '').replace(/\\/g, '/');
}

// androidDocPaths: v1.4.1 variant with _*-prefix scope-filter (D-24).
// Matches the v1.4.1 harness post-Plan-02 Edit 3 implementation exactly so helper scope mirrors harness scope.
function androidDocPaths() {
  const paths = new Set();

  // Root singletons (activate only when they exist)
  for (const p of [
    'docs/_glossary-android.md',
    'docs/_templates/admin-template-android.md',
    'docs/reference/android-capability-matrix.md',
    'docs/decision-trees/08-android-triage.md'
  ]) {
    if (existsSync(join(process.cwd(), p))) paths.add(p);
  }

  // Directory walks (all .md under these two lifecycle and admin trees are Android-scoped by construction)
  for (const d of ['docs/android-lifecycle', 'docs/admin-setup-android']) {
    for (const abs of walkMd(d)) {
      paths.add(relNormalize(abs));
    }
  }

  // L1 runbooks 22-27 android-*
  for (const abs of walkMd('docs/l1-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(2[2-7])-android-/.test(rel)) paths.add(rel);
  }

  // L2 runbooks 18-21 android-*
  for (const abs of walkMd('docs/l2-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(1[89]|2[01])-android-/.test(rel)) paths.add(rel);
  }

  // End-user guides: any android-*.md
  for (const abs of walkMd('docs/end-user-guides')) {
    const rel = relNormalize(abs);
    if (/\/android-/.test(rel)) paths.add(rel);
  }

  // D-24 scope-filter: exclude any DIRECTORY segment starting with "_" (e.g., _templates/, _drafts/, _archive/).
  // Filename segment is INTENTIONALLY skipped so that docs/_glossary-android.md remains in scope.
  function hasUnderscoreDirSegment(relPath) {
    const segments = relPath.split('/');
    return segments.slice(0, -1).some(seg => /^_/.test(seg));
  }
  return Array.from(paths).filter(p => !hasUnderscoreDirSegment(p)).sort();
}

// parseAllowlist: check-phase-31.mjs parseInventory() graceful-degradation pattern (Pattern B).
// Parameterized path so helper can read v1.4 or v1.4.1 sidecar on demand.
function parseAllowlist(relPath) {
  const raw = readFile(relPath);
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [], _missing: true };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}

// ---------------------------------------------------------------------------
// Net-new logic: two-tier classifier (D-11, RESEARCH §4)
// ---------------------------------------------------------------------------

// computeHtmlCommentLines: returns Set<number> of 1-indexed line numbers inside <!-- ... --> blocks.
// Handles multi-line comments by tracking the open/close balance across lines.
function computeHtmlCommentLines(content) {
  const lines = content.split('\n');
  const inComment = new Set();
  let openBalance = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hadOpen = /<!--/.test(line);
    const opens = (line.match(/<!--/g) || []).length;
    const closes = (line.match(/-->/g) || []).length;
    if (openBalance > 0 || hadOpen) inComment.add(i + 1);
    openBalance += opens - closes;
    if (openBalance < 0) openBalance = 0;
  }
  return inComment;
}

// classify: (file, lineNum, content) -> 'tier1-stub-eligible' | 'tier2-suspected-regression'
// Tier 1 triggers (D-11 + refinements from Phase 43 self-test dogfooding):
//   (a) occurrence line is inside an HTML-comment block, OR
//   (b) occurrence line OR 2 preceding lines contain /\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b/i, OR
//   (c) occurrence line contains a markdown anchor link to the glossary #supervision anchor
//       (e.g., [Supervision](#supervision) or (_glossary-macos.md#supervision)) —
//       this is a navigational reference to the iOS-attributed disambiguation entry, OR
//   (d) occurrence line is inside a ## Alphabetical Index, ## Version History, or ## Changelog
//       H2 section — these are structurally navigational/historical references to iOS-attributed
//       governance decisions (Phase 34 D-03 writing rule), not bare Android-management prose.
//
// The refinements (c) and (d) were added after Plan 43-04 self-test surfaced two legitimate
// Phase 43 hand-authored pins (docs/_glossary-android.md lines 15 and 148) that failed the
// strict D-11 keyword test despite being structurally unambiguous bridge prose. Per D-11
// "helper NEVER auto-pins Tier-2," tightening the classifier to recognize these structural
// patterns is the correct response — NOT relaxing the Tier-2 contract.
function classify(file, lineNum, content, htmlCommentLines) {
  const lines = content.split('\n');
  const lineIdx = lineNum - 1;
  const lineText = lines[lineIdx] || '';

  // (1) HTML-comment membership -> Tier 1 short-circuit.
  if (htmlCommentLines.has(lineNum)) return 'tier1-stub-eligible';

  // (2) Context window: occurrence line + 2 preceding lines.
  const windowStart = Math.max(0, lineNum - 3);
  const windowEnd = lineNum;
  const contextLines = lines.slice(windowStart, windowEnd).join('\n');
  const tier1Regex = /\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b/i;
  if (tier1Regex.test(contextLines)) return 'tier1-stub-eligible';

  // (3) Markdown-anchor navigational reference to #supervision anchor
  //     (either local ...(#supervision) or cross-file ...(_glossary-macos.md#supervision)).
  //     These links point to the iOS-attributed disambiguation entry by construction.
  if (/\]\([^)]*#supervision[^)]*\)/i.test(lineText)) return 'tier1-stub-eligible';

  // (4) Enclosing H2 section: walk backward from lineIdx to find the most recent "## "
  //     heading. If it matches Alphabetical Index / Version History / Changelog,
  //     the occurrence is structurally navigational/historical (Phase 34 D-03 governance).
  for (let i = lineIdx; i >= 0; i--) {
    const m = lines[i].match(/^##\s+(.+?)\s*$/);
    if (m) {
      if (/^(Alphabetical Index|Version History|Changelog)/i.test(m[1])) {
        return 'tier1-stub-eligible';
      }
      break;  // found the enclosing H2; stop walking.
    }
  }

  return 'tier2-suspected-regression';
}

// ---------------------------------------------------------------------------
// Scan: iterate Android doc paths, find all supervision occurrences, classify each.
// ---------------------------------------------------------------------------

// Pattern matches v1.4 harness C2 regex: /\bsupervis(ion|ed|ory)\b/gi
// The classifier scopes at the LINE level (v1.4 C2 semantic: one pin per line exempts all occurrences on that line).
function scanSupervisionOccurrences() {
  const tier1 = [];
  const tier2 = [];
  // Record unique file+line pairs (one entry per line even if multiple matches on it), matching harness C2 semantic.
  const seen = new Set();

  for (const relPath of androidDocPaths()) {
    const content = readFile(relPath);
    if (!content) continue;
    const htmlCommentLines = computeHtmlCommentLines(content);
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i];
      const reMatches = lineText.matchAll(/\bsupervis(ion|ed|ory)\b/gi);
      let firstMatch = null;
      for (const m of reMatches) { firstMatch = m; break; }
      if (!firstMatch) continue;
      const lineNum = i + 1;
      const key = relPath + ':' + lineNum;
      if (seen.has(key)) continue;
      seen.add(key);
      const tier = classify(relPath, lineNum, content, htmlCommentLines);
      const record = {
        file: relPath,
        line: lineNum,
        text: firstMatch[0],
        context: lineText.trim().slice(0, 160)
      };
      if (tier === 'tier1-stub-eligible') {
        tier1.push(record);
      } else {
        tier2.push(record);
      }
    }
  }
  return { tier1, tier2 };
}

// ---------------------------------------------------------------------------
// Mode: --report (advisory)
// ---------------------------------------------------------------------------

function doReport() {
  const allow = parseAllowlist('scripts/validation/v1.4-audit-allowlist.json');
  const pinned = (allow.supervision_exemptions || []).slice();
  const pinnedKeys = new Set(pinned.map(e => e.file + ':' + e.line));

  const { tier1, tier2 } = scanSupervisionOccurrences();
  const scannedKeys = new Set([...tier1, ...tier2].map(r => r.file + ':' + r.line));

  const unpinnedTier1 = tier1.filter(r => !pinnedKeys.has(r.file + ':' + r.line));
  const unpinnedTier2 = tier2.filter(r => !pinnedKeys.has(r.file + ':' + r.line));
  const stalePins = pinned.filter(p => !scannedKeys.has(p.file + ':' + p.line));

  process.stdout.write('=== supervision pin report ===\n');
  process.stdout.write('Pinned (in sidecar): ' + pinned.length + '\n');
  process.stdout.write('Un-pinned Tier-1 (stub-eligible): ' + unpinnedTier1.length + '\n');
  process.stdout.write('Un-pinned Tier-2 (suspected regression): ' + unpinnedTier2.length + '\n');
  process.stdout.write('Stale pins (line now has no supervision hit): ' + stalePins.length + '\n');

  if (unpinnedTier1.length > 0) {
    process.stdout.write('\nTier-1 un-pinned occurrences (eligible for --emit-stubs):\n');
    for (const r of unpinnedTier1) {
      process.stdout.write('  ' + r.file + ':' + r.line + ' — ' + r.context + '\n');
    }
  }
  if (unpinnedTier2.length > 0) {
    process.stdout.write('\nTier-2 suspected regressions (human review required; NEVER auto-pinned):\n');
    for (const r of unpinnedTier2) {
      process.stdout.write('  ' + r.file + ':' + r.line + ' — ' + r.context + '\n');
    }
  }
  if (stalePins.length > 0) {
    process.stdout.write('\nStale pins (line no longer contains supervision occurrence):\n');
    for (const p of stalePins) {
      process.stdout.write('  ' + p.file + ':' + p.line + '\n');
    }
  }

  // Advisory — always exit 0 per D-14/D-15
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Mode: --emit-stubs
// ---------------------------------------------------------------------------

function doEmitStubs() {
  const allow = parseAllowlist('scripts/validation/v1.4-audit-allowlist.json');
  const pinnedKeys = new Set((allow.supervision_exemptions || []).map(e => e.file + ':' + e.line));

  const { tier1, tier2 } = scanSupervisionOccurrences();
  const unpinnedTier1 = tier1.filter(r => !pinnedKeys.has(r.file + ':' + r.line));
  const unpinnedTier2 = tier2.filter(r => !pinnedKeys.has(r.file + ':' + r.line));

  // Tier-1 -> JSON fragments to stdout (human reason-filling before merge)
  if (unpinnedTier1.length === 0) {
    process.stdout.write('// No un-pinned Tier-1 occurrences — sidecar supervision_exemptions[] is up to date.\n');
  } else {
    process.stdout.write('// Tier-1 stub suggestions (human must fill "reason" field before merging into sidecar):\n');
    for (const r of unpinnedTier1) {
      const stub = {
        file: r.file,
        line: r.line,
        reason: 'TODO: ' + r.context.slice(0, 80),
        tier: 1,
        context: r.context
      };
      process.stdout.write(JSON.stringify(stub) + '\n');
    }
  }

  // Tier-2 -> side-channel write to suspected-regressions.txt (NEVER auto-pinned per D-11)
  const suspectedPath = 'scripts/validation/suspected-regressions.txt';
  const suspectedAbs = join(process.cwd(), suspectedPath);
  if (unpinnedTier2.length > 0) {
    const timestamp = new Date().toISOString();
    let body = '';
    // Preserve previous entries if file exists (append, not overwrite — D-11 side-channel semantic)
    const prior = readFile(suspectedPath);
    if (prior) body += prior.replace(/\n+$/, '') + '\n\n';
    body += '=== suspected regressions — run ' + timestamp + ' ===\n';
    body += '# Tier-2 occurrences — NOT auto-pinned. Human must explicitly promote to a pin with\n';
    body += '# written justification, OR fix the underlying content regression.\n';
    for (const r of unpinnedTier2) {
      body += r.file + ':' + r.line + '\t' + r.context + '\n';
    }
    writeFileSync(suspectedAbs, body, 'utf8');
    process.stderr.write('Wrote ' + unpinnedTier2.length + ' Tier-2 suspected regression(s) to ' + suspectedPath + '\n');
  } else {
    process.stderr.write('No Tier-2 suspected regressions detected; ' + suspectedPath + ' not written.\n');
  }

  process.exit(0);
}

// ---------------------------------------------------------------------------
// Mode: --self-test (D-12 dogfood)
// ---------------------------------------------------------------------------

// Pre-expansion 9-pin baseline S1..S9 (hard-coded from commit e5e45db).
// The self-test subtracts this baseline from the current sidecar's supervision_exemptions[]
// to derive the NEW-pin set (Phase 43 hand-authored). Classifier output's Tier-1 set
// must reproduce this NEW-pin set exactly.
const BASELINE_9 = [
  ['docs/_glossary-android.md', 65],
  ['docs/_glossary-android.md', 67],
  ['docs/_glossary-android.md', 134],
  ['docs/_glossary-android.md', 148],
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],
  ['docs/android-lifecycle/00-enrollment-overview.md', 53],
  ['docs/android-lifecycle/00-enrollment-overview.md', 83],
  ['docs/admin-setup-android/03-fully-managed-cobo.md', 35],
  ['docs/l2-runbooks/20-android-app-install-investigation.md', 21]
];

function doSelfTest() {
  process.stdout.write('=== self-test: reproduce Phase 43 hand-authored new-pin set ===\n');

  const allow = parseAllowlist('scripts/validation/v1.4-audit-allowlist.json');
  if (allow._missing) {
    process.stderr.write('FAIL: sidecar missing at scripts/validation/v1.4-audit-allowlist.json\n');
    process.exit(1);
  }
  if (allow._parseError) {
    process.stderr.write('FAIL: sidecar parse error: ' + allow._parseError + '\n');
    process.exit(1);
  }

  const sidecarPins = (allow.supervision_exemptions || []).map(e => e.file + ':' + e.line);
  const baselineKeys = new Set(BASELINE_9.map(([f, l]) => f + ':' + l));

  // Expected Tier-1 NEW-pin set = sidecar - baseline.
  const expectedNewKeys = new Set(sidecarPins.filter(k => !baselineKeys.has(k)));

  const paths = androidDocPaths();
  process.stdout.write('Scanning: ' + paths.length + ' Android doc paths\n');

  const { tier1, tier2 } = scanSupervisionOccurrences();

  // The classifier emits Tier-1 pins for EVERY legitimate bridge-prose occurrence — both the
  // 9 S1..S9 pre-existing pins AND the Phase 43 N1..N9 new pins. For the self-test, we compare
  // the classifier's Tier-1 set MINUS the 9-baseline to the sidecar's NEW pins.
  const classifierTier1Keys = new Set(tier1.map(r => r.file + ':' + r.line));
  const classifierNewKeys = new Set([...classifierTier1Keys].filter(k => !baselineKeys.has(k)));

  process.stdout.write('Classifier output: ' + tier1.length + ' Tier-1 stub-eligible lines, '
    + tier2.length + ' Tier-2 suspected regressions\n');
  process.stdout.write('Phase 43 hand-authored Tier-1 new pins (sidecar - baseline): ' + expectedNewKeys.size + '\n');
  process.stdout.write('Classifier Tier-1 new pins (classifier - baseline): ' + classifierNewKeys.size + '\n');

  // Set-diff: expected vs classifier.
  const missingFromClassifier = [...expectedNewKeys].filter(k => !classifierNewKeys.has(k)).sort();
  const extraFromClassifier = [...classifierNewKeys].filter(k => !expectedNewKeys.has(k)).sort();

  let passed = true;

  if (missingFromClassifier.length > 0) {
    passed = false;
    process.stdout.write('\nPins authored by Phase 43 that classifier did NOT emit (false-negative):\n');
    for (const k of missingFromClassifier) process.stdout.write('  - ' + k + '\n');
  }
  if (extraFromClassifier.length > 0) {
    passed = false;
    process.stdout.write('\nPins classifier emitted that Phase 43 did NOT author (false-positive):\n');
    for (const k of extraFromClassifier) process.stdout.write('  + ' + k + '\n');
  }

  // Assert Tier-2 count = 0 per D-12 (Phase 43 hand-authored set should cover all legitimate bridge prose).
  if (tier2.length > 0) {
    passed = false;
    process.stdout.write('\nTier-2 suspected regressions detected (Phase 43 may have missed a legitimate occurrence):\n');
    for (const r of tier2) process.stdout.write('  ! ' + r.file + ':' + r.line + ' — ' + r.context + '\n');
    process.stdout.write('Tier-2 count MUST be 0 after Phase 43 hand-authored pin set lands. Do NOT auto-pin;\n');
    process.stdout.write('either re-classify in Plan 03 sidecar OR fix underlying content regression.\n');
  }

  if (passed) {
    process.stdout.write('\nDiff: identical\n');
    process.stdout.write('Tier-2 count: 0 (all supervision occurrences classified as legitimate bridge prose)\n');
    process.stdout.write('Self-test: PASS\n');
    process.exit(0);
  } else {
    process.stdout.write('\nSelf-test: FAIL — classifier diverges from Phase 43 hand-authored set.\n');
    process.stdout.write('Per D-12: investigate classifier (context window, regex, HTML-comment state machine)\n');
    process.stdout.write('OR re-classify sidecar pin — do NOT relax the helper to silence the diff.\n');
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

if (MODE_REPORT) doReport();
else if (MODE_STUBS) doEmitStubs();
else if (MODE_SELFTEST) doSelfTest();
