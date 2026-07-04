---
phase: 115-c17-harness-check-validator-atom
fixed_at: 2026-07-04T00:00:00Z
review_path: .planning/phases/115-c17-harness-check-validator-atom/115-REVIEW.md
iteration: 1
findings_in_scope: 6
fixed: 6
skipped: 0
status: all_fixed
---

# Phase 115: Code Review Fix Report

**Fixed at:** 2026-07-04T00:00:00Z
**Source review:** `.planning/phases/115-c17-harness-check-validator-atom/115-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 6
- Fixed: 6
- Skipped: 0

## Fixed Issues

### CR-01: Assertion #11 (table-row cap) does not exclude code-fenced lines

**Files modified:** `scripts/validation/c17-eee-contract.mjs`
**Commit:** c4f8f5f
**Applied fix:** Added `!inCodeFence[i]` guard to both the outer `if (trimmed.startsWith('|'))` check and the inner `while` continuation condition. Code blocks whose lines begin with `|` (SQL result sets, ASCII art, shell pipe output) are now correctly excluded from the table-row counter.

---

### CR-02: Assertion #12 (gate blockquote length) does not exclude code-fenced lines

**Files modified:** `scripts/validation/c17-eee-contract.mjs`
**Commit:** e30493b
**Applied fix:** Added `!inCodeFence[i]` guard to both the outer `if (/^>/.test(...))` check and the inner `while` continuation condition. Lines beginning with `>` inside code fences (shell examples, diff output, Markdown examples) no longer contribute to the blockquote-length measurement.

---

### WR-01: Assertion #1 (no-Mermaid) checks raw `content` instead of fence-masked body

**Files modified:** `scripts/validation/c17-eee-contract.mjs`
**Commit:** bf2be44
**Applied fix:** Replaced `/^```mermaid/m.test(content)` with `bodyLines.some((l, i) => !inCodeFence[i] && /^```mermaid/.test(l))`. Opening fence lines are not marked `inCodeFence` by design, so a real `` ```mermaid `` fence is still correctly detected; a `` ```mermaid `` example shown inside a fenced code block is now correctly ignored.

---

### WR-02: Assertion #5 word count includes code-fenced content

**Files modified:** `scripts/validation/c17-eee-contract.mjs`
**Commit:** 1202a8c
**Applied fix:** Added `if (!inCodeFence[i]) sumBodyLines.push(bodyLines[i])` guard inside the `sumBodyLines` collection loop. Code tokens inside fenced blocks no longer inflate the prose word count for the ## Summary section.

---

### WR-03: `walkMd` follows symlinks without loop protection

**Files modified:** `scripts/validation/c17-eee-contract.mjs`
**Commit:** 4f547f7
**Applied fix:** Changed `statSync` to `lstatSync` in the `walkMd` inner loop (and updated the `node:fs` import accordingly). Added `if (stat.isSymbolicLink()) continue;` immediately after the stat call to skip symlinked entries entirely, preventing infinite recursion on symlink cycles.

---

### WR-04: Assertion #10 reports `platform: ""` when key is entirely absent

**Files modified:** `scripts/validation/c17-eee-contract.mjs`
**Commit:** e1b2bdf
**Applied fix:** Split the single `if (!platformRaw || !(platformRaw in D1_MAP))` branch into two branches. When `platformRaw === undefined` (key absent from frontmatter) the message is `"platform key is absent from frontmatter — required for D1 resolution"`. When the key is present but unmapped the message remains `"platform: \"X\" is not in the D1 map — unmapped value is a hard failure"`.

---

## Verification Results

All three required checks ran green after applying fixes:

1. `node scripts/validation/c17-eee-contract.mjs`
   - Output: `C17 summary: 8 files checked, 0 with violations, 0 total violations`
   - Exit code: **0**

2. `node scripts/validation/c17-eee-contract.mjs --self-test`
   - Output: `Self-test: 4 passed, 0 failed`
   - Exit code: **0**
   - Sub-test A (passing fixture → 0 violations): PASS
   - Sub-test B (failing fixture → ≥1 violation): PASS — 2 violations (#5, #13)
   - Sub-test C (D1 map unmapped platform fires #10): PASS
   - Sub-test D (TEMPLATE-SENTINEL skips assertion #9): PASS

3. `grep -E "^import" scripts/validation/c17-eee-contract.mjs`
   - Result: only `node:fs`, `node:path`, `node:process` imports; no `_lib` or npm packages

---

_Fixed: 2026-07-04T00:00:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
