#!/usr/bin/env node
// check-nav-hub-links.mjs -- corpus-wide relative-link and anchor checker for docs/, excluding
// docs/_templates/ (Phase 123 RETRO-06 origin, D-01 locked spec; widened to full corpus coverage
// by Phase 143 LINK-02/LINK-04, D-11/D-12). Standalone validator -- no chained per-phase
// registration array (mirrors the Phase-115 c17-eee-contract.mjs standalone precedent). Models
// GitHub's own anchor-slug semantics (see computeAnchorSetFromContent below). Exits 0 iff zero
// failures, with NO accepted-violation baseline, allowlist, ratchet file or expected-failure list
// of any kind (LINK-04) -- every failure reported is either fixed or the checker's model is wrong.
//
// The absence of `{#id}` (Pandoc/kramdown heading-attribute) recognition is DELIBERATE and
// PERMANENT: GitHub does not implement that syntax, so a `{#id}` token renders as literal heading
// text and is correctly modelled by the ordinary heading-slug pipeline, not a special-cased
// override. This holds regardless of how many (if any) `{#id}` tokens the corpus currently
// contains -- do not re-add a recognition branch under a different name if a future corpus count
// reaches zero; that would silently re-admit the 65-link false-negative class this model closes
// (143-CONTEXT.md D-01/D-02, RESEARCH.md Pitfall 1).
//
// Usage:  node scripts/validation/check-nav-hub-links.mjs [--verbose] [--self-test]
// Exit 0: zero failures across the corpus-wide scan (normal mode), or all self-test assertions
//         pass (--self-test mode)
// Exit 1: at least one broken link/anchor found, or a self-test assertion failed

// Node built-ins ONLY -- zero external npm packages (matches scripts/validation/ convention)
import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');

// D-01 locked roster: the 4 orphan nav-hubs. Their outbound links are covered by the corpus-wide
// scan (checkInboundLinks) like every other file; this roster's live role is now solely the
// hub-existence assertion in checkOutboundLinks below (D-13 -- preserved consciously, not dead
// code).
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

// stripHeadingText: strip inline emphasis markers (backticks/**) before slugifying, mirroring
// c17-eee-contract.mjs:191's `.replace(/\*\*/g, '')` precedent -- GitHub slugifies RENDERED
// text, not raw markdown source. A trailing {#id} token is deliberately NOT stripped here:
// GitHub does not implement Pandoc/kramdown heading-attribute syntax, so `{#id}` renders as
// literal heading text and flows into githubSlug() exactly like any other characters (its
// `{`, `#`, `}` punctuation is stripped there by the existing [^a-z0-9 _-] filter).
function stripHeadingText(raw) {
  return raw
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .trim();
}

// computeAnchorSetFromContent: pure function over a content string (fence-masked internally).
// GitHub anchor model: union of (a) every explicit <a id="..."></a> value, added VERBATIM, and
// (b) every heading's GitHub-slug with Map<slugBase,count> encounter-order dedup (2nd
// occurrence -> -1, 3rd -> -2, ...). A trailing `{#id}` token on a heading is deliberately NOT
// special-cased: GitHub does not support Pandoc/kramdown heading-attribute syntax, so the token
// renders as literal heading text and simply flows through the same slug pipeline as any other
// heading text -- exactly as GitHub itself renders it (see
// docs/l1-runbooks/30-linux-enrollment-failed.md:53,63 and 143-RESEARCH.md's worked example).
// Do not re-add a `{#id}`-recognition branch under a different name (143-CONTEXT.md D-01/D-02,
// RESEARCH.md Pitfall 1) -- the GitHub model is the ABSENCE of special-casing, not a rewrite of it.
//
// NOTE ON <a id> PREFIXING: GitHub rewrites every authored `id` to `user-content-<id>` at
// render time, while heading permalink `href`s stay UNPREFIXED -- GitHub's client-side JS
// reconciles the two. This checker deliberately models the un-prefixed authored id (comparing
// the authored link fragment against the authored `id`/heading slug, both unprefixed) and MUST
// NOT be "corrected" to expect the `user-content-` prefix (143-RESEARCH.md Open Question 3,
// verified against GitHub's own rendering API).
function computeAnchorSetFromContent(content) {
  const set = new Set();
  const lines = content.split('\n');
  const fenceMask = buildFenceMask(lines);

  // (a) <a id="..."></a> anchors -- whole content, fence-masked, verbatim. A per-line global
  // loop (not a single-match call) is required: docs/admin-setup-android/05-dedicated-devices.md:242
  // carries two adjacent tags on one line, and a single-match implementation would silently drop
  // the second.
  for (let i = 0; i < lines.length; i++) {
    if (fenceMask[i]) continue;
    for (const m of lines[i].matchAll(/<a\s+id\s*=\s*"([a-zA-Z0-9_-]+)"\s*>\s*<\/a>/g)) {
      set.add(m[1]);
    }
  }

  // (b) headings -> slugify with per-file encounter-order dedup. Every heading ALWAYS produces
  // an auto-slug and ALWAYS consumes a dedup count -- there is no suppression branch (GitHub
  // never suppresses a heading's auto-slug, regardless of a trailing {#id}-shaped token).
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

// ── Task 2: outbound + inbound scan, path resolution, file:line failure report ──────────────

function toAbs(relPath) {
  return join(process.cwd(), relPath);
}

// extractLinks: scan non-fenced lines for [text](target), 1-based line numbers. Inline
// single-backtick code spans are masked (replaced with an equal-length run of spaces) before
// the link regex runs, so a link-shaped construct inside a code span -- e.g. a PowerShell
// `[xml](Get-Content ...)` cast -- is never misread as a markdown link. Masking preserves line
// length so column arithmetic elsewhere stays exact. LINK-02:
// docs/recipes/03-windows-11-multi-app-kiosk.md:173 is the real corpus instance this leg exists
// to fix. A single-backtick-run regex is sufficient -- RESEARCH.md Q2 measured zero
// multi-backtick spans anywhere in docs/, so a CommonMark-conformant tokenizer would be unused
// complexity.
function extractLinks(lines, fenceMask) {
  const links = [];
  const linkRe = /\[([^\]]*)\]\(([^)]+)\)/g;
  const codeSpanRe = /`[^`\n]*`/g;
  for (let i = 0; i < lines.length; i++) {
    if (fenceMask[i]) continue;
    const maskedLine = lines[i].replace(codeSpanRe, (span) => ' '.repeat(span.length));
    linkRe.lastIndex = 0;
    let m;
    while ((m = linkRe.exec(maskedLine)) !== null) {
      links.push({ text: m[1], target: m[2], line: i + 1 });
    }
  }
  return links;
}

// resolveLinkTarget: path resolution is ALWAYS relative to the LINKING file's own directory
// (path.dirname(linkingFileAbs)) -- never process.cwd(). This is the exact bug class the 11
// pre-existing `../`-over-escape links in quick-ref-l2.md exhibit; the checker itself must
// not repeat the mistake it exists to detect. Returns null for http(s)/mailto (out of scope).
// Never throws on a pathological `../../../../etc/passwd`-style target -- path.resolve() is
// pure string math, and the caller's existsSync() simply reports "not found."
function resolveLinkTarget(linkingAbsPath, target) {
  if (/^(https?:|mailto:)/.test(target)) return null;
  const hashIdx = target.indexOf('#');
  const filePart = hashIdx === -1 ? target : target.slice(0, hashIdx);
  const fragPart = hashIdx === -1 ? '' : target.slice(hashIdx + 1);
  const linkingDir = dirname(linkingAbsPath);
  const resolvedAbs = filePart === '' ? linkingAbsPath : resolve(linkingDir, filePart);
  const resolvedRel = relNormalize(resolvedAbs);
  return { resolvedAbs, resolvedRel, fragPart };
}

// checkOutboundLinks: hub-existence assertion ONLY (D-13). This is the sole check anywhere that
// the four ratified nav-hubs exist -- checkInboundLinks's own `content === null` branch below
// merely `continue`s on a missing file, so this hard-fail is not redundant with it. The per-link
// scanning role this function used to carry is retired: with checkInboundLinks now scanning every
// file (including the 4 hubs) as a source, keeping a second per-link loop here would
// double-report every hub-link failure.
function checkOutboundLinks() {
  const failures = [];
  for (const hubRel of HUB_PATHS) {
    const content = readFile(hubRel);
    if (content === null) {
      failures.push({ file: hubRel, line: 0, text: '', target: '', reason: 'hub file not found' });
    }
  }
  return failures;
}

// checkInboundLinks: the corpus-wide relative-link and anchor scan (LINK-02). Every .md file
// under docs/, excluding docs/_templates/, is scanned as both a source and a target -- there is
// no hub-only filter here (D-12 removed both the source-side skip and the target-side filter that
// used to restrict this scan to the 4 nav-hubs).
function checkInboundLinks() {
  const failures = [];
  const allMd = walkMd('docs');
  for (const abs of allMd) {
    const relPath = relNormalize(abs);
    // LINK-02: docs/_templates/ holds placeholder scaffolding (26 template link targets that
    // are never meant to resolve), excluded from the corpus-wide scan entirely.
    if (relPath.startsWith('docs/_templates/')) continue;
    const content = readFile(relPath);
    if (content === null) continue;
    const lines = content.split('\n');
    const fenceMask = buildFenceMask(lines);
    const links = extractLinks(lines, fenceMask);
    for (const { text, target, line } of links) {
      const resolved = resolveLinkTarget(abs, target);
      if (resolved === null) continue;
      const { resolvedAbs, resolvedRel, fragPart } = resolved;
      if (!existsSync(resolvedAbs)) {
        failures.push({ file: relPath, line, text, target, reason: `target file not found: ${resolvedRel}` });
        continue;
      }
      if (fragPart) {
        const anchors = resolvableAnchorSet(resolvedRel);
        if (!anchors.has(fragPart)) {
          failures.push({ file: relPath, line, text, target, reason: `anchor not found: #${fragPart}` });
        }
      }
    }
  }
  return failures;
}

function printFailures(failures) {
  for (const f of failures) {
    process.stdout.write(`${f.file}:${f.line} -> [${f.text}](${f.target})  -- ${f.reason}\n`);
  }
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

  // D: GitHub model -- {#id} is NOT special-cased. It renders as literal heading text and
  // participates in the normal slug pipeline; the bare override string is never registered on
  // its own, and the heading's auto-slug is never suppressed.
  const overrideContent = '### Foo Bar {#custom-anchor}\n\nsome prose';
  const overrideSet = computeAnchorSetFromContent(overrideContent);
  stAssert(
    'GitHub model: {#id} renders as literal text -- has "foo-bar-custom-anchor", NOT bare "custom-anchor"',
    overrideSet.has('foo-bar-custom-anchor') && !overrideSet.has('custom-anchor'),
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

  // G: path traversal never throws -- a pathological ../../../../etc/passwd-style target
  // resolves to a not-found FAIL via existsSync, not an unhandled exception.
  let traversalThrew = false;
  let traversalResolved = null;
  try {
    traversalResolved = resolveLinkTarget(toAbs('docs/quick-ref-l2.md'), '../../../../../../etc/passwd');
  } catch {
    traversalThrew = true;
  }
  const traversalNotFound = !traversalThrew && traversalResolved !== null && !existsSync(traversalResolved.resolvedAbs);
  stAssert(
    'path traversal: ../../../../../../etc/passwd resolves to not-found, no throw',
    traversalNotFound,
    traversalThrew ? 'threw an exception' : `resolved: ${traversalResolved?.resolvedRel}`
  );

  // H: <a id> recognition -- a table-row-embedded anchor tag registers its id verbatim.
  const tableAnchorContent = [
    '| Code | Detail |',
    '|------|--------|',
    '| <a id="0x80180014"></a>`0x80180014` | detail |',
  ].join('\n');
  const tableAnchorSet = computeAnchorSetFromContent(tableAnchorContent);
  stAssert(
    '<a id> table-row recognition: has "0x80180014"',
    tableAnchorSet.has('0x80180014'),
    `set: [${[...tableAnchorSet].join(', ')}]`
  );

  // I: <a id> global recognition -- two adjacent tags on one line both register, not just the
  // first (docs/admin-setup-android/05-dedicated-devices.md:242 is the real corpus instance).
  const doubleTagContent = '<a id="exit-kiosk-pin-synchronization"></a><a id="exit-kiosk-pin"></a>';
  const doubleTagSet = computeAnchorSetFromContent(doubleTagContent);
  stAssert(
    '<a id> double-tag line: both ids present (global loop, not a single match)',
    doubleTagSet.has('exit-kiosk-pin-synchronization') && doubleTagSet.has('exit-kiosk-pin'),
    `set: [${[...doubleTagSet].join(', ')}]`
  );

  // J: inline-code-span masking -- a link-shaped construct inside a single-backtick span is
  // never extracted, but an ordinary link on the same line still is. This is the
  // docs/recipes/03-windows-11-multi-app-kiosk.md:173 failure mode D-14 names as the
  // load-bearing evidence for this leg.
  const inlineMaskLine = '`$x = [xml](Get-Content .\\kiosk.xml -Raw)` and [real link](target.md)';
  const inlineMaskLines = [inlineMaskLine];
  const inlineMaskFenceMask = buildFenceMask(inlineMaskLines);
  const inlineMaskLinks = extractLinks(inlineMaskLines, inlineMaskFenceMask);
  stAssert(
    'inline-code-span masking: backtick-spanned [xml](...) not extracted, real link still is',
    inlineMaskLinks.length === 1 && inlineMaskLinks[0].target === 'target.md',
    `links: [${inlineMaskLinks.map(l => l.target).join(', ')}]`
  );

  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// ── Main runner (normal mode) ─────────────────────────────────────────────────────────────────
// Two checks: hub-presence (do the 4 ratified nav-hubs exist, D-13) and the corpus-wide link/
// anchor scan (274 files, every relative link, LINK-02). Exit 0 iff zero failures across both --
// no accepted-violation baseline, allowlist, ratchet file or expected-failure list of any kind
// (LINK-04).

const hubPresenceFailures = checkOutboundLinks();
const corpusLinkFailures = checkInboundLinks();
const allFailures = [...hubPresenceFailures, ...corpusLinkFailures];

if (VERBOSE || allFailures.length > 0) {
  if (hubPresenceFailures.length > 0) {
    process.stdout.write('\nHub-presence failures (the 4 ratified nav-hubs, D-13):\n');
    printFailures(hubPresenceFailures);
  }
  if (corpusLinkFailures.length > 0) {
    process.stdout.write('\nCorpus-link failures (every relative link under docs/):\n');
    printFailures(corpusLinkFailures);
  }
  if (allFailures.length === 0) {
    process.stdout.write('\ncheck-nav-hub-links: 0 failures (hub-presence + corpus-link clean)\n');
  }
}

process.stdout.write(
  `\ncheck-nav-hub-links summary: ${hubPresenceFailures.length} hub-presence failure(s), ` +
  `${corpusLinkFailures.length} corpus-link failure(s), ${allFailures.length} total\n`
);

process.exit(allFailures.length > 0 ? 1 : 0);
