---
phase: 115-c17-harness-check-validator-atom
reviewed: 2026-07-04T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - scripts/validation/c17-eee-contract.mjs
  - scripts/validation/c17-fixtures/c17-fixture-passing.md
  - scripts/validation/c17-fixtures/c17-fixture-failing.md
findings:
  critical: 2
  warning: 4
  info: 0
  total: 6
status: issues_found
---

# Phase 115: Code Review Report

**Reviewed:** 2026-07-04T00:00:00Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

`c17-eee-contract.mjs` is a 577-line standalone Node.js validator implementing 13 EEE-contract assertions across enrolled Markdown files. The architecture is sound — CRLF normalization, multiline-flag frontmatter extraction, and the `inCodeFence` mask are all present and well-reasoned. However, the `inCodeFence` mask is applied only to assertions #2, #3, #4, and #5, and is silently dropped for #1, #11, and #12. This is the central defect class: the same infrastructure needed to prevent false positives in the heading/summary checks is never connected to the table-row cap, blockquote-length, and no-Mermaid checks. Two of those omissions are blockers because they produce incorrect exit-1 results against valid documents. Four additional warnings cover a word-count inflation path, a symlink-loop crash, a misleading diagnostic string, and a raw-content mermaid scan.

The two fixture files are self-consistent with their stated intent; no defects found in the fixtures themselves.

---

## Critical Issues

### CR-01: Assertion #11 (table-row cap) does not exclude code-fenced lines — false positive exit-1

**File:** `scripts/validation/c17-eee-contract.mjs:338-369`
**Issue:** The table-scanning loop iterates `bodyLines` without ever consulting `inCodeFence[i]`. Any code block whose lines begin with `|` — SQL result sets, ASCII art, shell output showing a pipe character at the start — is treated as a Markdown table. If the block has more than 25 such lines, the validator emits a violation and exits 1 against a document that is fully compliant. The `inCodeFence` mask was built explicitly to prevent this class of false positive (see assertion #2 rationale), but is never wired into the `#11` loop.

**Fix:**
```js
// Line 338 — add inCodeFence guard at the outer iteration step
while (i < bodyLines.length) {
  if (!inCodeFence[i] && bodyLines[i].trim().startsWith('|')) {
    const tableStart = i;
    let dataRows = 0;
    while (i < bodyLines.length && !inCodeFence[i] && bodyLines[i].trim().startsWith('|')) {
      if (!isSeparator(bodyLines[i].trim())) dataRows++;
      i++;
    }
    // ... rest of the prose-summary scan unchanged
  } else {
    i++;
  }
}
```

---

### CR-02: Assertion #12 (gate blockquote length) does not exclude code-fenced lines — false positive exit-1

**File:** `scripts/validation/c17-eee-contract.mjs:379-396`
**Issue:** The blockquote loop checks `if (/^>/.test(bodyLines[i]))` without checking `inCodeFence[i]`. Shell command examples, diff output, and Markdown-example code blocks all routinely contain lines beginning with `>`. When the combined length of those fenced lines exceeds 200 characters the validator fires violation #12 and exits 1 on a valid document. Identical omission pattern to CR-01 — the mask is built but not connected.

**Fix:**
```js
// Line 380 — add inCodeFence guard on the outer if
if (!inCodeFence[i] && /^>/.test(bodyLines[i])) {
  const bqLines = [];
  while (i < bodyLines.length && !inCodeFence[i] && /^>/.test(bodyLines[i])) {
    bqLines.push(bodyLines[i].replace(/^>\s?/, ''));
    i++;
  }
  const bqText = bqLines.join(' ');
  if (bqText.length > 200) {
    violations.push({ assertion: 12, detail: `Blockquote exceeds 200 chars (${bqText.length} chars)` });
  }
} else {
  i++;
}
```

---

## Warnings

### WR-01: Assertion #1 (no-Mermaid) checks raw `content`, not fence-masked body

**File:** `scripts/validation/c17-eee-contract.mjs:201`
**Issue:** `/^```mermaid/m.test(content)` runs against the entire raw file string. If a document shows a mermaid fence as a Markdown example inside a ` ```markdown ` or ` ```text ` code block, the line ` ```mermaid` appears literally at the start of a line in `content` and triggers assertion #1. Every other heading/structure check uses `bodyLines` filtered through `inCodeFence`; assertion #1 is the sole exception without documentation of the asymmetry.

**Fix:**
```js
// Replace the raw-content test with a bodyLines scan that respects the fence mask
const hasMermaid = bodyLines.some((l, i) => !inCodeFence[i] && /^```mermaid/.test(l));
if (hasMermaid) {
  violations.push({ assertion: 1, detail: 'Mermaid code fence found (```mermaid)' });
}
```
Note: the opening fence line itself is not in `inCodeFence` (by design), so a real ` ```mermaid` fence that opens (not inside another fence) would remain correctly detected.

---

### WR-02: Assertion #5 word count includes code-fenced content — can mask under-worded summaries

**File:** `scripts/validation/c17-eee-contract.mjs:249-254`
**Issue:** The `sumBodyLines` collection loop pushes every line between `## Summary` and the next non-fenced `## `, including lines inside code fences. Code tokens (identifiers, punctuation, command arguments) then contribute to `wordCount`. A summary with 28 prose words and a 10-line code block can report `wordCount` well above 30 while containing insufficient prose — exactly the condition assertion #5 is intended to catch. Inversely, a summary that is genuinely over 30 prose words but followed by a large code block could have the fence lines counted twice if the "break on next ## " condition triggers inside a fenced section (it won't, but the design is fragile).

**Fix:**
```js
// Filter fenced lines out of sumBodyLines
for (let i = summaryIdx + 1; i < bodyLines.length; i++) {
  if (!inCodeFence[i] && /^## /.test(bodyLines[i])) break;
  if (!inCodeFence[i]) sumBodyLines.push(bodyLines[i]);  // skip fenced lines
}
```

---

### WR-03: `walkMd` follows symlinks without loop protection — process crash on symlink cycle

**File:** `scripts/validation/c17-eee-contract.mjs:72-85`
**Issue:** `statSync` follows symlinks by default (POSIX `stat`, not `lstat`). A symlink under `docs/` that points to an ancestor directory creates a cycle: `walk()` descends into the symlink target, encounters the symlink again, recurses, and eventually exhausts the JavaScript call stack with `RangeError: Maximum call stack size exceeded`. The process exits 1 with a stack-overflow traceback — indistinguishable from a genuine assertion failure in CI logs. The fix is to use `lstatSync` and skip symlinked directories, or to track visited inode/device pairs.

**Fix (minimal — skip symlink directories):**
```js
try { stat = statSync(full, { /* no option needed — swap to lstatSync */ }); }
// change to:
try { stat = lstatSync(full); } catch { continue; }
if (stat.isSymbolicLink()) continue;   // do not follow; avoids infinite recursion
if (stat.isDirectory()) { walk(full); }
else if (entry.endsWith('.md')) { results.push(full); }
```
Also add `lstatSync` to the import on line 16.

---

### WR-04: Assertion #10 error message reports `platform: ""` when the key is entirely absent

**File:** `scripts/validation/c17-eee-contract.mjs:328`
**Issue:** When the `platform` key is missing from frontmatter entirely, `platformMatch` is null and `platformRaw` is `undefined`. The detail string uses `platformRaw ?? ''`, producing `platform: "" is not in the D1 map`. This misleads the author into thinking they set `platform:` to an empty string rather than omitted the key. The `platform` key is also not included in the assertion #8 required-keys list, meaning the only error the author sees is this misleading #10 message.

**Fix:**
```js
const detail = platformRaw === undefined
  ? 'platform key is absent from frontmatter — required for D1 resolution'
  : `platform: "${platformRaw}" is not in the D1 map — unmapped value is a hard failure`;
violations.push({ assertion: 10, detail });
```

---

_Reviewed: 2026-07-04T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
