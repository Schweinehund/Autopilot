---
phase: 123-orphan-nav-hub-retrofit-navigation-last
reviewed: 2026-07-08T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - scripts/pipeline/retrofit-nav-hub.mjs
  - scripts/validation/check-nav-hub-links.mjs
findings:
  critical: 1
  warning: 4
  info: 2
  total: 7
status: issues_found
---

# Phase 123: Code Review Report

**Reviewed:** 2026-07-08T00:00:00Z
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Both files are well-commented, deliberately conservative build-time tooling with genuinely fail-closed guard chains. `retrofit-nav-hub.mjs`'s guard sequence (PATH-ALLOWLIST → MERMAID-STILL-PRESENT → TEMPLATE-SENTINEL → DOC-ID-ALREADY-PRESENT → DOC-ID-UNRESOLVED → UNKNOWN-KEYLESS-PLATFORM → UNMAPPED-PLATFORM) was traced end to end: every guard returns `{ ok: false, error }` and is counted as an `ERROR` in `main()` — no path silently skips a malformed doc, defaults a doc_id, or defaults a non-Windows keyless platform. No bug was found in this file that lets a malformed doc enroll silently.

`check-nav-hub-links.mjs`, however, has a real algorithmic defect in the CORRECTNESS-CRITICAL slug/anchor-resolution logic: when a heading carries an explicit `{#id}` override (a convention used 87 times across `docs/`, per `123-CONTEXT.md`), the anchor-set builder adds **both** the override id **and** a spurious auto-generated slug of the heading's visible text — even though, per the project's own stated convention, the override *replaces* (not supplements) the default id. This is not a theoretical concern: the tool's own `--self-test` output proves it (`### Foo Bar {#custom-anchor}` → `set: [custom-anchor, foo-bar]`, i.e. two anchors registered for one heading). This is exactly the false-negative failure mode the task brief warns about ("a subtle slug bug would let a real broken link pass green") — a link whose fragment coincidentally matches the phantom auto-slug of an overridden heading will be reported as valid by this checker even though it is broken on the rendered page. Live corpus scans (`node scripts/validation/check-nav-hub-links.mjs`) currently report 0 failures, so no *currently known* broken link is being masked by this specific bug today — but the mechanism is proven defective, the corpus has dozens of headings where the override id diverges sharply from the auto-slug of the full heading text (e.g. `### Pattern A: RealWear enrollment failure {#pattern-a-realwear}` → phantom slug `pattern-a-realwear-enrollment-failure` vs. real anchor `pattern-a-realwear`), and Phase 124's planned rename pass (noted in `123-CONTEXT.md`) increases the odds this masks a real regression later.

Several secondary correctness gaps in the slug/link-parsing logic were also found (ASCII-only character stripping vs. GitHub's Unicode-aware slugger; link-target regex that mishandles parens/titles in the destination; ATX-only heading detection). None of these are currently triggered by the actual corpus (verified by targeted greps), but they are genuine divergences from "GitHub-exact" behavior that the file's own header comment commits to.

## Critical Issues

### CR-01: `{#id}` heading override does not suppress the phantom auto-generated slug, defeating the override-precedence contract

**File:** `scripts/validation/check-nav-hub-links.mjs:145-157` (heading loop), root cause interacts with `scripts/validation/check-nav-hub-links.mjs:118-127` (`stripHeadingText`)

**Issue:** `computeAnchorSetFromContent` first collects every `{#id}` override verbatim (lines 137-143), then *unconditionally* also computes and adds a text-derived slug for **every** heading line, including ones that already carry an override (lines 145-157). `stripHeadingText` (line 123) strips the `{#id}` suffix before slugifying specifically so this second pass can run — but the result is that an overridden heading registers two anchors in the resolvable set, not one:

```
$ node scripts/validation/check-nav-hub-links.mjs --self-test
[ST] {#id} override resolves verbatim: ... PASS -- set: [custom-anchor, foo-bar]
```

`custom-anchor` is the real, intended anchor. `foo-bar` is a **phantom** anchor that does not exist on the rendered page (per the project's own convention — and per Kramdown/GFM anchor semantics generally — an explicit id *replaces* the auto-generated one, it does not coexist with it). Corpus evidence that this divergence is routinely large, not coincidental:

```
### Pattern A: RealWear enrollment failure {#pattern-a-realwear}
```
(`docs/l2-runbooks/23-android-aosp-investigation.md:134`) → real anchor `pattern-a-realwear`; this tool also (incorrectly) registers `pattern-a-realwear-enrollment-failure` as valid.

Because `check-nav-hub-links.mjs` exists specifically to gate SC2 ("no broken links"), a link whose fragment happens to match one of these phantom slugs will be reported as **passing** even though it is broken on the real page — the exact false-negative class the phase brief calls out as unacceptable. It also pollutes the `seen` encounter-order dedup Map (line 146/153-154): every overridden heading still consumes a slot in the `-1/-2/-3` counter for its phantom base slug, which can shift the computed suffix for a *later*, non-overridden heading that happens to share the same base text, producing an incorrect anchor for a real heading elsewhere in the same file.

No currently-passing outbound/inbound scan is known to be masked by this today (`node scripts/validation/check-nav-hub-links.mjs` → `0 outbound failure(s), 0 inbound failure(s)`), but the defect is live and reachable: `checkOutboundLinks` calls `resolvableAnchorSet()` on any file a hub links into, and several files with `{#id}` overrides (e.g. `docs/operations/patch-management/04-android-patch-delivery.md`) are already link targets from `quick-ref-l2.md`.

**Fix:** Skip the text-based slug entirely for headings that carry an override — the override should be the *only* anchor registered for that heading, and it should not consume a `seen` dedup slot for the auto-slug namespace:

```js
// (b) headings -> slugify with per-file encounter-order dedup
const seen = new Map(); // slugBase -> occurrence count so far
for (let i = 0; i < lines.length; i++) {
  if (fenceMask[i]) continue;
  const m = lines[i].match(/^#{1,6}\s+(.*)$/);
  if (!m) continue;
  // An explicit {#id} override REPLACES the default anchor -- it was already
  // added to `set` in part (a). Do not also register (or dedup-count) the
  // text-derived slug for this heading, or a phantom anchor is created.
  if (/\{#[a-zA-Z0-9_-]+\}\s*$/.test(m[1])) continue;
  const headingText = stripHeadingText(m[1]);
  const base = githubSlug(headingText);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  const slug = count === 0 ? base : `${base}-${count}`;
  set.add(slug);
}
```

## Warnings

### WR-01: `githubSlug` strips all non-ASCII characters, diverging from GitHub's actual Unicode-aware slugger

**File:** `scripts/validation/check-nav-hub-links.mjs:111-116`

**Issue:** `s.replace(/[^a-z0-9 _-]/g, '')` deletes every character outside plain ASCII `[a-z0-9 _-]`. Real GitHub heading-anchor generation (cmark-gfm / github-slugger) strips punctuation and emoji but **preserves** Unicode letters and digits (accented Latin, CJK, Cyrillic, etc.) — those are legitimate anchor characters on GitHub. Any heading containing a non-ASCII letter (e.g. a product name with an accent) will be slugged by this tool to a string that differs from the true GitHub anchor, which can produce either a false-positive "anchor not found" (for a genuinely valid link) or, worse, a coincidental false-negative match. Not currently triggered (the corpus is ASCII-only English text, confirmed via search), but it is a real gap relative to the stated "GitHub-exact slugify" goal and will bite the moment a non-ASCII heading is introduced.

**Fix:** Use a Unicode-aware strip that preserves letters/numbers of any script:
```js
function githubSlug(text) {
  let s = text.toLowerCase();
  s = s.replace(/[^\p{L}\p{N} _-]/gu, '');
  s = s.replace(/ /g, '-');
  return s;
}
```

### WR-02: Link-target regex mishandles parenthesized targets and title-attribute syntax

**File:** `scripts/validation/check-nav-hub-links.mjs:180-192` (`extractLinks`, `linkRe` at line 182)

**Issue:** `const linkRe = /\[([^\]]*)\]\(([^)]+)\)/g;` captures the target as "everything up to the first `)`". Two real CommonMark constructs break this:
1. A link destination containing a literal, unescaped `)` — confirmed present at `docs/operations/drift-migration/04-tenant-migration-runbook.md:421`: `[...](https://learn.microsoft.com/.../disconnect-managed-google-play-from-intune-(all-an))`. The regex truncates the captured target at the first `)`, mid-URL. This currently causes no failure only because the truncated string still starts with `https:` and is filtered out by `resolveLinkTarget`'s early return — but if a *local* doc-relative link target ever contained a literal paren, the truncated path would silently resolve against the wrong (or a nonexistent) file rather than the intended one.
2. `[text](url "title")` (CommonMark's optional title attribute) is not stripped — the captured target would be `url "title"`, which will never `existsSync()`, producing a false-positive "target file not found" for an otherwise-valid link. Not currently present in the corpus (confirmed via search), but is a latent trap for future edits.

**Fix:** Capture the destination up to first unescaped whitespace or `)`, and separately consume an optional trailing quoted title:
```js
const linkRe = /\[([^\]]*)\]\(\s*(<[^>]*>|[^\s)]+)(?:\s+"[^"]*")?\s*\)/g;
```
(strip surrounding `<...>` if present, since CommonMark also allows angle-bracket-wrapped destinations for targets containing spaces).

### WR-03: Heading detection is ATX-only; no handling of Setext headings or ATX closing-sequences

**File:** `scripts/validation/check-nav-hub-links.mjs:149` (`/^#{1,6}\s+(.*)$/`)

**Issue:** This regex only recognizes ATX-style (`#`...`######`) headings. Two divergences from CommonMark/GitHub's real heading parser:
- Setext-style headings (`Title\n===` / `Title\n---`) are invisible to this scanner and would never contribute an anchor to the resolvable set, causing a false-positive "anchor not found" for a legitimately valid same-file or cross-file link into such a heading.
- An ATX heading using the optional closing sequence (`## Title ##`) has that trailing `##` parsed out as pure syntax by CommonMark (not part of the heading text) before slugging; this tool does not strip it, and while `#` characters are themselves later stripped by `githubSlug`, a space preceding the closing `##` (`## Title ##` → text-after-strip `Title ` with a trailing space) produces a spurious trailing hyphen (`title-`) not present in the real GitHub anchor (`title`).

Neither pattern currently exists in the corpus (verified via grep for both), so this is latent rather than actively wrong today, but it is a real gap in "GitHub-exact" fidelity.

**Fix:** Either explicitly document the ATX-only assumption as an accepted corpus-wide convention (cheapest fix, if truly never used), or add closing-sequence stripping to `stripHeadingText`:
```js
.replace(/\s+#+\s*$/, '')   // strip an optional ATX closing sequence before slugifying
```

### WR-04: `--self-test` does not assert the phantom-slug is absent, letting CR-01 pass green

**File:** `scripts/validation/check-nav-hub-links.mjs:335-342` (self-test item D)

**Issue:** Test D already prints the full anchor set for the override fixture (`set: [custom-anchor, foo-bar]`) but only asserts `overrideSet.has('custom-anchor')` — it never asserts that the phantom `foo-bar` entry is *absent*. The evidence needed to catch CR-01 was already in the test's own diagnostic output; the missing negative assertion is why the self-test reports 12/12 (retrofit) and 7/7 (this file) green despite the defect.

**Fix:**
```js
stAssert(
  '{#id} override resolves verbatim AND suppresses the text-derived auto-slug',
  overrideSet.has('custom-anchor') && !overrideSet.has('foo-bar'),
  `set: [${[...overrideSet].join(', ')}]`
);
```

## Info

### IN-01: `writeFileSync` writes LF-only content, silently converting CRLF nav-hub files to LF on every write

**File:** `scripts/pipeline/retrofit-nav-hub.mjs:207-211` (`readFile` CRLF-normalizes on read), `scripts/pipeline/retrofit-nav-hub.mjs:969` (`writeFileSync(..., result.newContent, 'utf8')`)

**Issue:** `readFile()` normalizes `\r\n` → `\n` on read, and the entire transform pipeline (`newFm`, `newBodyParts.join('\n')`, etc.) uses bare `\n`. Since the repo's markdown files are Windows CRLF, a real (non-`--dry-run`) run of this script will rewrite every line ending in the 4 target files from CRLF to LF, not just the lines the tool intentionally changes — inflating the actual git diff for `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, and `docs/quick-ref-l2.md` far beyond the intended surgical edit and making the true content change harder to review. The file's own header comment documents this as an already-accepted, carried-forward WONTFIX from a prior phase's review (`D-03 Specific Overrule 2 — WR-01 CRLF-symmetric-write is WONTFIX-in-fork`), so this is flagged here only for completeness/visibility on the files actually under review, not as a new defect to block on.

**Fix (if ever revisited):** Detect the original line-ending style before normalizing, and re-apply it on write:
```js
const usesCRLF = /\r\n/.test(rawContent);
writeFileSync(abs, usesCRLF ? newContent.replace(/\n/g, '\r\n') : newContent, 'utf8');
```

### IN-02: Deliberate no-case-normalization posture means Windows dev runs can mask a link that would break on Linux CI

**File:** `scripts/validation/check-nav-hub-links.mjs:71-80` (`relNormalize` comment)

**Issue:** The header comment for `relNormalize` explicitly documents that this checker does not lowercase or otherwise case-normalize paths, "matching Linux CI behavior" — but `existsSync()` on Windows is incidentally case-insensitive. This means a developer running `check-nav-hub-links.mjs` locally on Windows (as this repo does) could see a clean run for a link whose case does not actually match the target file's real casing, and only discover the break when Linux CI (or a real GitHub file-path resolution, which is also case-sensitive) runs the same check. This is called out as an intentional design tradeoff in the code's own comment, not an oversight, so it is noted here for awareness only — worth confirming CI actually runs this script on a case-sensitive filesystem to close the loop the comment assumes.

**Fix:** No code change required if CI already enforces case-sensitivity; otherwise consider an explicit case-mismatch check (compare `readdirSync` case-preserved directory entries against the requested target casing) to catch this class in local Windows runs too.

---

_Reviewed: 2026-07-08T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
