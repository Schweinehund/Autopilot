---
phase: 116-l1-l2-runbook-retrofit-75-docs
reviewed: 2026-07-04T00:00:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - scripts/pipeline/retrofit-runbook.mjs
findings:
  high: 1
  medium: 2
  low: 2
  total: 5
status: issues_found
---

# Phase 116: Code Review Report

**Reviewed:** 2026-07-04
**Depth:** standard
**Files Reviewed:** 1 (`scripts/pipeline/retrofit-runbook.mjs`)
**Status:** issues_found

## Summary

The sole new source artifact is `scripts/pipeline/retrofit-runbook.mjs` — the node-builtins-only
mechanical EEE retrofit helper (560 lines). The four guards (path allowlist, SENTINEL, DOC-ID-UNRESOLVED,
UNMAPPED-PLATFORM) are correctly structured and fail closed. The D1_MAP, registry join regex, and
platform injection are logically correct. The VH insertion logic is sound for the single-run case.

The confirmed known defect — silent drop of any second pre-H1 blockquote — is the most significant
finding. It caused real content loss during waves 5-8 that required manual per-file restoration. Two
medium-severity correctness issues (non-idempotency, CRLF downgrade on write) and two low-severity
code quality issues round out the report.

---

## High Issues

### H-01: Second (and all subsequent) pre-H1 blockquotes silently dropped

**File:** `scripts/pipeline/retrofit-runbook.mjs:279-291`

**Issue:**
The gate-blockquote detection loop `break`s immediately after the first contiguous `^>` run is found,
and only that run is captured in `gateLines`. Any lines at indices `gateEnd` through `firstH1Idx - 1`
(i.e., blank separators plus a second blockquote such as an L2 scope note) are stored nowhere and
never placed in the assembled output. They are permanently dropped on write.

Root cause trace:

```javascript
// lines 279-291
for (let i = 0; i < firstH1Idx; i++) {
  if (/^>/.test(bodyLines[i])) {
    gateStart = i;
    let j = i;
    while (j < bodyLines.length && /^>/.test(bodyLines[j])) j++;
    gateEnd = j;
    break;                    // <-- exits after FIRST blockquote run
  }
}
const gateLines = (gateStart !== -1) ? bodyLines.slice(gateStart, gateEnd) : [];
// lines between gateEnd and firstH1Idx are never captured
const h1Line = bodyLines[firstH1Idx];
const bodyAfterH1Lines = bodyLines.slice(firstH1Idx + 1);
```

The assembly (lines 311-331) only places `gateLines` plus `bodyAfterH1Lines`; the gap
`[gateEnd, firstH1Idx)` is absent from `newBodyParts`.

The `--dry-run` flag reports `gate-relocated=Y` for any file that had even one blockquote,
giving no warning that subsequent blockquotes were discarded. C17 does not check for missing
pre-H1 content, so the loss is invisible to the gate.

**Impact:** Silent data loss. Confirmed to have occurred during wave 5 (and additional waves),
requiring manual per-file restoration.

**Fix — capture all pre-H1 non-blank content, not just the first `^>` run:**

Replace the single-blockquote detection with a collector that captures everything from the
start of the body up to (but not including) the H1, skipping only leading blank lines:

```javascript
// Collect ALL pre-H1 content (blockquotes, blank lines between them, etc.)
// so that nothing is silently dropped.
let preH1End = firstH1Idx;
// Trim trailing blank lines before H1 (we emit our own blank above H1)
while (preH1End > 0 && bodyLines[preH1End - 1].trim() === '') preH1End--;
const preH1Lines = bodyLines.slice(0, preH1End);

// Skip leading blank lines from preH1Lines
let preH1Start = 0;
while (preH1Start < preH1Lines.length && preH1Lines[preH1Start].trim() === '') preH1Start++;
const contentBeforeH1 = preH1Lines.slice(preH1Start);

// gateRelocated is true iff there was any pre-H1 content
const gateRelocated = contentBeforeH1.length > 0;

// ... (remove old gateLines/gateStart/gateEnd variables) ...

// In assembly, replace the gateLines block with contentBeforeH1:
if (contentBeforeH1.length > 0) {
  newBodyParts.push(...contentBeforeH1);
  newBodyParts.push('');
}
```

This treats the entire pre-H1 region as an opaque block to be relocated, which is what the
spec intends ("relocates the pre-H1 gate blockquote") and matches what executors expected.

---

## Medium Issues

### M-01: Transform is not idempotent — re-run on a retrofitted file corrupts frontmatter and body

**File:** `scripts/pipeline/retrofit-runbook.mjs:245-251, 311-321, 141-179`

**Issue:**
Running the helper a second time on an already-retrofitted file produces three distinct
corruption types, with no guard to prevent it:

1. **Duplicate frontmatter keys** (lines 245-251): The helper blindly prepends
   `doc_id / status / owner / doc_type` to whatever `fm` it found. If those keys are
   already present (from the first run), the YAML block now contains them twice. YAML
   parsers typically use the last occurrence; this silently clobbers the original value
   with the regenerated one.

2. **Duplicate `## Summary` section** (lines 311-321): The assembly unconditionally emits
   `## Summary` followed by `[FILL-IN]`. After the first run, the original `## Summary`
   (with real hand-authored prose) is now inside `bodyAfterH1Lines` and will be appended
   after the new placeholder, producing two `## Summary` headings — the second one
   overwriting the hand-authored prose placement.

3. **Duplicate Version-History row** (lines 141-179): `insertVersionHistoryRow` prepends
   the `YYYY-MM-DD | v1.15 EEE reformat` row without checking whether it already exists,
   so a second run adds a second identical row.

This defect materialized during wave 5 crash recovery, where the helper was re-run on files
that had already been partially transformed.

**Fix:**
Add a "already-retrofitted" detection guard at the top of `processFile` (after reading the
frontmatter), checking for the presence of `doc_id:` in `fm`:

```javascript
// Guard 0: idempotency — refuse to re-process an already-retrofitted file
if (/^doc_id:\s*RE-/m.test(fm)) {
  return { ok: false, rel, error: 'ALREADY-RETROFITTED: doc_id key already present in frontmatter — skipping to prevent duplication' };
}
```

This guard should come before the platform/owner/VH logic, and before Guard 2 (SENTINEL),
so that a retrofitted file exits cleanly without any mutation. The runner should then report
the file as SKIPPED (not OK, not ERROR) to distinguish it from genuine failures.

---

### M-02: CRLF stripped on read is never restored on write — line-ending downgrade on Windows

**File:** `scripts/pipeline/retrofit-runbook.mjs:83, 540`

**Issue:**
`readFile` (line 83) normalizes all `\r\n` to `\n`. The comment calls this "mandatory" because
"Windows repo files contain `\r\n`." But `writeFileSync` (line 540) writes `utf8` with no
CRLF re-introduction:

```javascript
// line 83: strips CRLF → LF
return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');

// line 540: writes LF-only
writeFileSync(join(process.cwd(), result.rel), result.newContent, 'utf8');
```

Any file that was CRLF on disk becomes LF-only after the transform. If the repo's
`.gitattributes` enforces CRLF for `*.md`, git will re-add `\r` on checkout, but the
working-tree copy between transform and commit will be LF. If `.gitattributes` is absent or
set to `text=auto`, the file's line endings are permanently downgraded, causing spurious diffs
on Windows editors and confusing future diff-based pipeline tools (including C17, which itself
normalizes CRLF — so the transform creates a divergence in what C17 expects vs. what git
stores).

**Fix:**
Either (a) restore `\r\n` before writing (if the original content had CRLF), or (b) explicitly
document that the tool intentionally produces LF and verify `.gitattributes` enforces a consistent
policy. The minimal code fix for option (a):

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  const raw = readFileSync(abs, 'utf8');
  const hasCRLF = raw.includes('\r\n');
  return { content: raw.replace(/\r\n/g, '\n'), hasCRLF };
}
// ... then in processFile, propagate hasCRLF, and in main:
const out = hasCRLF ? result.newContent.replace(/\n/g, '\r\n') : result.newContent;
writeFileSync(join(process.cwd(), result.rel), out, 'utf8');
```

Option (b) is acceptable if a `.gitattributes` rule such as `docs/**/*.md text eol=lf` is
confirmed present — but that should be verified and documented in the helper's header comment.

---

## Low Issues

### L-01: `showDetail` is always `true` — `--verbose` flag has no effect on dry-run detail

**File:** `scripts/pipeline/retrofit-runbook.mjs:537`

**Issue:**
```javascript
const showDetail = VERBOSE || true; // always show in dry-run (useful for verification)
```
The expression `VERBOSE || true` is always `true`. The `VERBOSE` variable is evaluated but
its value is irrelevant. The `--verbose` flag therefore has no effect on the detail shown in
`--dry-run` mode. The comment indicates the author intended this ("always show"), but the
code structure (evaluating `VERBOSE`) implies a behavioral branch that does not exist.

**Fix:**
Remove the dead variable and make the intent explicit:

```javascript
// Dry-run always shows detail (verification aid)
process.stdout.write(padLabel(label) + 'PASS -- ' + detail + '\n');
```

Or, if suppressing detail on dry-run was ever intended when `--verbose` is absent:
```javascript
const showDetail = VERBOSE;  // remove '|| true' if silent dry-run is desired
```

---

### L-02: Frontmatter regex with `m` flag can match non-frontmatter `---` blocks

**File:** `scripts/pipeline/retrofit-runbook.mjs:209`

**Issue:**
```javascript
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
```

The `m` flag makes `^` match at the start of any line, not just position 0. This means the
regex will match the first `---\n...\n---` block anywhere in the file. The comment claims this
is intentional ("some files may have HTML-comment preamble"), but:

1. Standard YAML frontmatter requires `---` at byte offset 0. A file with preamble is not
   valid YAML frontmatter by spec; most static-site generators would reject it.
2. Markdown thematic breaks (`---`) appearing mid-document (e.g., section dividers or a
   `---` inside a code example outside a fence) combined with a later `---` could form a
   false frontmatter match. The non-greedy `[\s\S]*?` selects the shortest match, so a
   mid-body `---` followed closely by another `---` would be chosen over the real frontmatter
   if the real frontmatter is longer.
3. If a false match is selected, the "frontmatter" `fm` would be body content, the SENTINEL
   and platform guards would silently pass (no `last_verified:` → `lastVerified === null`,
   no `platform:` → inject Windows), and the output would be structurally corrupted.

In practice this is unlikely to trigger given the corpus shape, but the defensive comment
is not a substitute for a correct guard.

**Fix:**
Use `content.startsWith('---\n')` as a fast pre-check before the regex, which catches 100%
of real runbook files and immediately rejects anything with preamble (returning a clear error):

```javascript
if (!content.startsWith('---\n')) {
  return { ok: false, rel, error: 'no YAML frontmatter at start of file (preamble not supported)' };
}
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);  // no m flag needed
```

If preamble support is ever genuinely needed, add a dedicated pre-strip step with an
explicit preamble format, not a regex with relaxed anchors.

---

## Self-Test Coverage Gap (Informational)

The five `--self-test` sub-tests (a–e) all test guard logic in isolation using inline
re-implementations of the same logic — they do not call `processFile()` on synthetic
in-memory content. As a result, the self-test would pass even if `processFile` contained
a bug in the post-guard transform steps (e.g., the secondary-blockquote-drop bug passes
all five self-tests). This is not a bug in the guards themselves, but it means the self-test
provides weaker confidence than its 5/5 pass count implies. A future follow-up should add
a synthetic end-to-end sub-test that calls `processFile` with a two-blockquote fixture and
asserts both blockquotes appear in `result.newContent`.

---

_Reviewed: 2026-07-04_
_Reviewer: Claude (adversarial code review)_
_Depth: standard_
