#!/usr/bin/env node
// check-nav-hub-links.mjs -- net-new file+anchor link-integrity checker for the 4 orphan
// nav-hubs (Phase 123 RETRO-06, D-01 locked spec). Standalone validator -- no chained
// per-phase registration array (mirrors the Phase-115 c17-eee-contract.mjs standalone
// precedent). This script builds + self-tests the tool only: it does NOT fix any link
// and does NOT mutate the 4 hub docs. Phase 123-04 runs this against the final corpus
// after the 12 pre-existing broken links are fixed.
//
// Usage:  node scripts/validation/check-nav-hub-links.mjs [--verbose] [--self-test]
// Exit 0: zero broken links across both outbound + inbound scans (normal mode), or all
//         self-test assertions pass (--self-test mode)
// Exit 1: at least one broken link/anchor found, or a self-test assertion failed
//
// Task 1 (this commit): GitHub-exact slugify + resolvable-anchor-set builder + --self-test.
// Task 2 (next commit): outbound/inbound scan wiring, path resolution, CLI report + exit code.

// Node built-ins ONLY -- zero external npm packages (matches scripts/validation/ convention)
import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');

// D-01 locked roster: the 4 orphan nav-hubs (outbound source set; inbound target set)
const HUB_PATHS = [
  'docs/index.md',
  'docs/common-issues.md',
  'docs/quick-ref-l1.md',
  'docs/quick-ref-l2.md',
];

// ── Helpers copied verbatim from scripts/validation/c17-eee-contract.mjs ────────────────────

const LABEL_WIDTH = 60;
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

// walkMd: recursive .md file walker (c17-eee-contract.mjs:68-86, verbatim)
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
      if (stat.isSymbolicLink()) continue; // do not follow; avoids infinite recursion on symlink cycles
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}

// relNormalize: strip CWD prefix and normalize backslashes to forward-slashes.
// NOTE: case-sensitive / Linux-CI posture (D-01) -- this checker does not lowercase or
// otherwise normalize case; on Windows, existsSync() is incidentally case-insensitive,
// but the resolved-path comparisons below are exact-string, matching Linux CI behavior.
function relNormalize(abs) {
  return abs
    .replace(process.cwd() + '\\', '')
    .replace(process.cwd() + '/', '')
    .replace(/\\/g, '/');
}

// buildFenceMask: mask code-fence-interior lines (retrofit-mermaid-structural.mjs:262-280,
// verbatim) -- excludes fenced ```markdown/```text example headings and links from both
// the anchor-set builder and the link scanner.
function buildFenceMask(lines) {
  const mask = new Array(lines.length).fill(false);
  let fenced = false, fenceChar = '', fenceLen = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i];
    if (!fenced) {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m) { fenced = true; fenceChar = m[1][0]; fenceLen = m[1].length; }
    } else {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m && m[1][0] === fenceChar && m[1].length >= fenceLen) {
        fenced = false;
      } else {
        mask[i] = true;
      }
    }
  }
  return mask;
}

// ── Task 1: GitHub-exact slugify + resolvable-anchor-set builder ────────────────────────────

// githubSlug: lowercase; strip every char NOT in [a-z0-9 _-] IN PLACE (deletion, never a
// space-substitution -- this is what produces the double-hyphen artifact when the stripped
// punctuation was itself surrounded by spaces on both sides); replace each remaining space
// with a single hyphen; never collapse consecutive hyphens.
function githubSlug(text) {
  let s = text.toLowerCase();
  s = s.replace(/[^a-z0-9 _-]/g, '');
  s = s.replace(/ /g, '-');
  return s;
}

// stripHeadingText: strip a trailing {#id} override token, then inline emphasis markers
// (backticks/**), mirroring c17-eee-contract.mjs:191's `.replace(/\*\*/g, '')` precedent --
// GitHub slugifies RENDERED text, not raw markdown source.
function stripHeadingText(raw) {
  return raw
    .replace(/\s*\{#[a-zA-Z0-9_-]+\}\s*$/, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .trim();
}

// computeAnchorSetFromContent: pure function over a content string (fence-masked internally).
// Union of (a) every explicit {#id} override, added VERBATIM, and (b) every heading's
// GitHub-slug with Map<slugBase,count> encounter-order dedup (2nd occurrence -> -1, 3rd -> -2, ...).
function computeAnchorSetFromContent(content) {
  const set = new Set();
  const lines = content.split('\n');
  const fenceMask = buildFenceMask(lines);

  // (a) {#id} overrides -- whole content, fence-masked, verbatim
  for (let i = 0; i < lines.length; i++) {
    if (fenceMask[i]) continue;
    for (const m of lines[i].matchAll(/\{#([a-zA-Z0-9_-]+)\}/g)) {
      set.add(m[1]);
    }
  }

  // (b) headings -> slugify with per-file encounter-order dedup
  const seen = new Map(); // slugBase -> occurrence count so far
  for (let i = 0; i < lines.length; i++) {
    if (fenceMask[i]) continue;
    const m = lines[i].match(/^#{1,6}\s+(.*)$/);
    if (!m) continue;
    const headingText = stripHeadingText(m[1]);
    const base = githubSlug(headingText);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const slug = count === 0 ? base : `${base}-${count}`;
    set.add(slug);
  }

  return set;
}

const anchorSetCache = new Map(); // relPath -> Set<string>

// resolvableAnchorSet: cached per-file wrapper over computeAnchorSetFromContent.
function resolvableAnchorSet(relPath) {
  if (anchorSetCache.has(relPath)) return anchorSetCache.get(relPath);
  const content = readFile(relPath);
  const set = content === null ? new Set() : computeAnchorSetFromContent(content);
  anchorSetCache.set(relPath, set);
  return set;
}

// ── Self-test mode (c17-eee-contract.mjs --self-test analog) ────────────────────────────────
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  // A: double-hyphen case -- space-surrounded punctuation removal leaves two adjacent spaces
  const slugA = githubSlug('iOS: Compliance / Access Blocked');
  stAssert(
    'slugify double-hyphen: "iOS: Compliance / Access Blocked" -> "ios-compliance--access-blocked"',
    slugA === 'ios-compliance--access-blocked',
    `got "${slugA}"`
  );

  // B: single-hyphen case -- no spaces around the stripped punctuation, no gap produced
  const slugB = githubSlug('iOS/iPadOS Quick Reference');
  stAssert(
    'slugify no-collapse: "iOS/iPadOS Quick Reference" -> "iosipados-quick-reference"',
    slugB === 'iosipados-quick-reference',
    `got "${slugB}"`
  );

  // C: 4x-duplicate heading dedup -- Map<slugBase,count> encounter-order, not a plain Set
  const dupContent = [
    '### 802.1X Network Authentication Failure',
    'para 1',
    '### 802.1X Network Authentication Failure',
    'para 2',
    '### 802.1X Network Authentication Failure',
    'para 3',
    '### 802.1X Network Authentication Failure',
  ].join('\n');
  const dupSet = computeAnchorSetFromContent(dupContent);
  const expectedDup = [
    '8021x-network-authentication-failure',
    '8021x-network-authentication-failure-1',
    '8021x-network-authentication-failure-2',
    '8021x-network-authentication-failure-3',
  ];
  const dupOk = expectedDup.every(s => dupSet.has(s));
  stAssert(
    '4x-duplicate heading dedup: -1/-2/-3 suffixes in encounter order',
    dupOk,
    dupOk ? 'all 4 variants present' : `set: [${[...dupSet].join(', ')}]`
  );

  // D: {#id} override resolves VERBATIM -- the override wins over the heading-text slug
  const overrideContent = '### Foo Bar {#custom-anchor}\n\nsome prose';
  const overrideSet = computeAnchorSetFromContent(overrideContent);
  stAssert(
    '{#id} override resolves verbatim: "### Foo Bar {#custom-anchor}" -> has "custom-anchor"',
    overrideSet.has('custom-anchor'),
    `set: [${[...overrideSet].join(', ')}]`
  );

  // E: emphasis strip -- heading text is rendered (backtick/** stripped) before slugifying
  const emphasisContent = '### `code` Term';
  const emphasisSet = computeAnchorSetFromContent(emphasisContent);
  stAssert(
    'emphasis strip: "### `code` Term" -> has "code-term" (not "code-term" with backticks)',
    emphasisSet.has('code-term'),
    `set: [${[...emphasisSet].join(', ')}]`
  );

  // F: fence mask -- a heading shown INSIDE a code fence does NOT enter the anchor set
  const fencedContent = [
    '```markdown',
    '## Heading Inside A Fence',
    '```',
    '',
    '## Real Heading Outside',
  ].join('\n');
  const fencedSet = computeAnchorSetFromContent(fencedContent);
  stAssert(
    'fence mask: fenced "## Heading Inside A Fence" excluded; real heading included',
    !fencedSet.has('heading-inside-a-fence') && fencedSet.has('real-heading-outside'),
    `set: [${[...fencedSet].join(', ')}]`
  );

  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// ── Task 2 (next commit) wires the outbound/inbound scan + CLI report here ──────────────────
process.stdout.write('check-nav-hub-links: resolver-only build (Task 1) -- run with --self-test\n');
process.exit(0);
