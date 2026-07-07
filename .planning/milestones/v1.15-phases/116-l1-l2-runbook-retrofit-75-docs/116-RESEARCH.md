# Phase 116: L1/L2 Runbook Retrofit (~75 docs) — Research

**Researched:** 2026-07-04
**Domain:** EEE documentation retrofit — Markdown structural reformat + C17 compliance
**Confidence:** HIGH (all claims verified against live codebase files)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01** One Phase 116, multiple batched plans (~6).
- **D-02** Tier-outer, platform-inner batching; batch on actual filename number-range + platform cluster (not assumed contiguous blocks).
- **D-03** Hybrid method: SCRIPT the mechanical transforms (doc_id join, block line, Version-History row, gate relocation, frontmatter keys); HAND-AUTHOR the ≥30-word Summary + safety banner + D-05 blockquote splits; C17-verify each file.
- **D-04** Per-tier banner default (`L1 Team Lead` / `L2 Desktop Lead`); tailor for state-changing runbooks.
- **D-05 (CRITICAL)** C17 #12 caps ALL top-level blockquotes ≤200 chars; 56/75 files affected; 183 over-limit total. Fix by word-preserving structural splits only. Never trim or reword.
- **D-06** Both `00-index.md` files are IN scope (RE-001 + RE-043).

### Claude's Discretion (resolve at plan time)

- Exact plan count and file-to-plan assignment (target ~6 plans, tier-outer platform-inner).
- Exact shape/name of the mechanical retrofit helper (node-builtins-only, scripts/pipeline/ idiom).
- Exact canned per-tier banner wording (L1 read-only-scope; L2 escalation/change-control).
- The exact `## Summary` prose per runbook (≥30 words, opens with banner sentence).

### Deferred Ideas (OUT OF SCOPE)

- Phase 117 (RETRO-02) — admin-setup guide retrofit.
- Phase 118 (RETRO-03) — reference-doc retrofit + table remediation.
- Phase 119 — frozen-surface re-baseline + 13th Path-A lineage bump + close.
- v1.16 — 45 orphan docs + structural classes.
- Content re-review — out of reformat-only envelope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RETRO-01 | All L1/L2 runbooks (~75) retrofitted to EEE; D3-A structure; scope/safety Summary; Status: Approved; C17 exits 0 on every file before phase close | Sections Q1–Q8 enumerate every assertion, transform step, and batch plan needed to satisfy SC1–SC5 |
</phase_requirements>

---

## Summary

Phase 116 is a pure structural reformat of 75 Markdown files — zero technical content changes. Every file must gain four frontmatter keys, a single-line EEE block, a `## Summary` section with ≥30-word prose, have its pre-H1 gate blockquote relocated to after `## Summary`, and receive a Version-History row. C17 (13 assertions, node-builtins-only) is the immutable merge gate and must exit 0 on every file before phase close.

The dominant workload is D-05: C17 assertion #12 caps **every top-level blockquote at ≤200 chars**, and 56 of 75 files (75%) carry at least one over-limit blockquote. The fix is always structural — split at sentence boundaries into blank-line-separated blockquote groups, or convert a non-gate callout to a bold-led paragraph. Trimming or rewording is forbidden by the reformat-only envelope. The second major workload is writing the ≥30-word `## Summary` prose for all 75 files (confirmed zero currently have a `## Summary`). The mechanical transforms (doc_id injection, block line, Version-History row, gate relocation, platform key) are fully scriptable.

**Primary recommendation:** Build a node-builtins retrofit script that handles all mechanical transforms per file (reading RE-index.md for doc_id, injecting frontmatter keys, writing the block line, inserting a `## Summary` placeholder, relocating the gate blockquote, and adding the Version-History row placeholder). The executor then hand-authors the Summary prose and hand-fixes D-05 blockquotes, verifying each file with `node scripts/validation/c17-eee-contract.mjs` before committing.

[VERIFIED: live codebase grep + c17-eee-contract.mjs code read]

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Frontmatter key injection | Script (retrofit helper) | Executor (verify output) | Uniform per-file; no judgment needed |
| EEE block line generation | Script (retrofit helper) | Executor (verify block exact match) | Deterministic: D1 label + doc_id + fixed strings |
| Gate blockquote relocation | Script (retrofit helper) | Executor (verify position) | Structural rule: first pre-H1 `>` block moves to after `## Summary` |
| `## Summary` prose authoring | Executor (hand-author) | — | C17 #5 requires ≥30 words of real prose; no script can produce 75 distinct non-hollow summaries |
| D-05 blockquote splits | Executor (hand-fix per file) | Script (measure only) | Word-preserving structural splits require sentence-boundary judgment |
| Banner accuracy (state-changing vs read-only) | Executor (per-runbook judgment) | — | ~10 files need tailored banners (list in Q7) |
| C17 gate | `node scripts/validation/c17-eee-contract.mjs` | Executor (read output, fix violations) | Immutable validator; run after each file |
| Registry lifecycle update | Executor (edit RE-index.md) | — | Pending → Approved as each file passes C17 |

---

## Q1: Exact C17 Assertion Inventory

**CLI invocation:**

```bash
# Normal mode — scans ALL docs/ .md files, enrolls those with doc_id frontmatter key
node scripts/validation/c17-eee-contract.mjs

# Verbose mode — shows all files including passing ones
node scripts/validation/c17-eee-contract.mjs --verbose

# Self-test mode — runs 4 sub-tests on fixtures
node scripts/validation/c17-eee-contract.mjs --self-test
```

**Exit codes:** `0` = all enrolled files pass (or no enrolled files); `1` = any violation.

**Enrollment rule (lines 519–533):** A file is enrolled iff its YAML frontmatter contains a `doc_id` key **AND** its path starts with `docs/`. Retrofitting one file at a time (adding `doc_id`) enrolls it immediately — batches are independently mergeable/gateable.

**No per-file invocation flag exists.** To check a single file after retrofit, run the full scanner and inspect per-file output for that path.

[VERIFIED: c17-eee-contract.mjs lines 519–534]

### Full Assertion Table

| # | What It Checks | Pass Condition | Fail Signal | Notes |
|---|---------------|---------------|-------------|-------|
| 1 | No Mermaid fences | No `` ```mermaid `` found outside code fences | "Mermaid code fence found" | Opening fence line IS checked; lines inside a fence are masked |
| 2 | Exactly one H1; H1 after block line | `h1Lines.length === 1` AND `h1Idx > blockLineIdx` | "Expected exactly 1 H1, found N" or "H1 at body-line N does not appear after block line" | H1 inside code fences excluded by `inCodeFence` mask |
| 3 | H1 text ≠ bare `RE-\d+` | H1 text does NOT match `/^RE-\d+$/` | "H1 text is a bare doc-ID pattern" | |
| 4 | `## Summary` is first H2; no H3 between block and Summary | First H2 = `## Summary`; no `### ` between block line and Summary | "## Summary is not the first H2; found X before it" or "H3 heading between block and ## Summary" | Only first H3 violation reported per file |
| 5 | `## Summary` ≥ 30 words | Word count of lines from Summary+1 to next `## ` (outside fences) ≥ 30 | "## Summary has N words, need ≥30" | Code-fenced lines excluded from word count |
| 6 | Block is single inline paragraph, not table | Block line does NOT start with `\|`; next non-blank is not `\|[-: \|]` | "Header block appears to be a table row" | |
| 7 | Platform + Doc Type first two block fields | `parsedFields[0].key.toLowerCase() === 'platform'` AND `[1].key.toLowerCase() === 'doc type'` | "Block fields must start with Platform · Doc Type; got X · Y" | Keys compared case-insensitively |
| 8 | Required frontmatter keys present non-empty | `doc_id`, `status`, `owner`, `doc_type`, `last_verified` all present | "Missing or empty required frontmatter keys: X, Y" | `platform` absence caught by #10; `review_by` not in #8 |
| 9 | Block field values match frontmatter | Block Platform = D1(platform), Block Doc Type = doc_type, Block Doc ID = doc_id, Block Status = status | "Block Platform X ≠ D1 label Y", etc. | **SKIPPED for TEMPLATE-SENTINEL** (last_verified: 1970-01-01) |
| 10 | `platform` resolves in D1 map | `platform` key present AND value in D1_MAP | "platform key is absent from frontmatter" or "platform: X is not in the D1 map" | **HARD FAILURE, no fallback.** Absent platform = same failure as unmapped. |
| 11 | Tables >25 rows have prose summary ≤5 lines after | Any table with >25 data rows has a non-blank, non-`\|`, non-`#`, non-`>`, non-fence line within 5 lines | "Table with N data rows at body line L has no prose summary within 5 lines" | Separator rows (`\|[-: \|]+\|`) excluded from count |
| 12 | Every top-level blockquote ≤200 chars | Every `^>` run's joined text ≤200 chars | "Blockquote exceeds 200 chars (N chars)" | **SKIPPED for TEMPLATE-SENTINEL.** Blank line separates runs. List-item-nested `N. >` lines invisible (start with digit, not `>`). |
| 13 | `status` ∈ {Draft, Approved, Superseded} | status value in `VALID_STATUSES` | "status: X not in {Draft, Approved, Superseded}" | Case-sensitive |

[VERIFIED: c17-eee-contract.mjs full read, lines 96–416]

### #12 Exact Logic (critical for D-05)

```
for each bodyLine not in code fence:
  if line matches /^>/:
    collect consecutive /^>/ lines as a group
    strip "> " prefix from each line
    join lines with " " (single space)
    if joined.length > 200 → VIOLATION
```

**Blank line** → ends the group; next `>` line starts a new group. Each group checked independently.

**`> ` strip rule:** strips one leading `> ` (with optional space). Multi-level `>> ` is stripped once, leaving `> text` — edge case to test if nested blockquotes appear.

---

## Q2: Mechanical Transform Recipe

### Complete Before → After

**BEFORE (current state, e.g., l1/01-device-not-registered.md):**

```markdown
---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Device Not Registered in Autopilot

[Intro paragraph — no ## Summary]

## Prerequisites
...
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Initial version | — |
```

**AFTER (target EEE shape, RE-002, Windows):**

```markdown
---
doc_id: RE-002
status: Approved
owner: L1 Team Lead
doc_type: Runbook
platform: Windows
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** RE-002 · **Status:** Approved

# Device Not Registered in Autopilot

## Summary

[≥30 words. Lead sentence = L1 read-only banner. Remaining sentences summarize scope.]

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## Prerequisites
...
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-04 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-03-20 | Initial version | — |
```

### Step-by-Step Transform Procedure

1. **Frontmatter: inject four new keys at top** (before `last_verified`; after any existing keys is also acceptable — C17 only checks presence, not order within frontmatter):
   - `doc_id: RE-NNN` — look up by file path in RE-index.md
   - `status: Approved`
   - `owner: L1 Team Lead` (or `L2 Desktop Lead` for l2-runbooks/)
   - `doc_type: Runbook`

2. **Frontmatter: inject `platform:` if absent** (Windows files only):
   - Files in `docs/l1-runbooks/01-09-*.md` and `docs/l2-runbooks/01-08-*.md` have no `platform:` key → inject `platform: Windows`
   - All other files already have `platform:` — carry verbatim (no normalization in frontmatter; D1 map is applied only to the block line output)

3. **Immediately after the closing `---`**, insert a blank line then the EEE block line:
   ```
   **Platform:** [D1_LABEL] · **Doc Type:** Runbook · **Doc ID:** RE-NNN · **Status:** Approved
   ```
   The `·` character is U+00B7 (middle-dot). Bold labels are `**Label:**` (cosmetic convention, not required by C17, but consistent with all templates).
   Field order is fixed: Platform · Doc Type · Doc ID · Status. `owner` is NEVER in the block.

4. **Block line is the first non-blank line of the body.** C17 assertion #2 requires H1 to appear AFTER the block line index. So the body structure must be:
   ```
   [blank line]
   **Platform:** ...   ← blockLineIdx (first non-blank)
   [blank line]
   # Title             ← H1 (must come after blockLineIdx)
   [blank line]
   ## Summary          ← first H2
   ```

5. **Relocate the pre-H1 gate blockquote**: The gate blockquote currently appears between frontmatter close and H1. After adding the EEE block line, relocate the gate blockquote to AFTER the `## Summary` section prose. Final order: block line → H1 → `## Summary` → [prose] → [gate blockquote] → remaining sections. The gate blockquote is identified by position (first blockquote in the document before H1), NOT by content or literal string.

6. **Insert `## Summary` as the first H2**: After H1 and before the gate blockquote. No H2 or H3 may appear between the EEE block line and `## Summary`. If a prior H2 existed (e.g., `## Context` in L2 files), leave it in place AFTER `## Summary` — do NOT rename or delete it.

7. **Write the Summary prose** (hand-authored, ≥30 words):
   - Lead sentence = tier banner (D-04)
   - Remaining sentences summarize the runbook's scope using existing document content (reformat-only — no new technical claims)

8. **Handle D-05 over-limit blockquotes** (hand-fixed):
   - Measure each `^>` group's joined length
   - If >200 chars: split at a sentence boundary by inserting a blank line between two `>` lines, creating two separate groups each ≤200 chars
   - Alternative: convert non-gate callouts (`> **Note:**`, `> **Warning:**`, after-path notes) to bold-led normal paragraphs
   - List-item-nested `N. >` lines are invisible to #12 — leave them as-is

9. **Add Version-History row**: In `## Version History`, prepend row:
   ```
   | 2026-07-04 | v1.15 EEE reformat — content not re-reviewed | — |
   ```
   The date is the retrofit commit date (fill at commit time). If no `## Version History` exists, create one (only `docs/l2-runbooks/01-log-collection.md` is missing it — verified by grep).

10. **Update RE-index.md** registry: change the file's Status column from `Pending` to `Approved`.

11. **Run C17 and verify exit 0**:
    ```bash
    node scripts/validation/c17-eee-contract.mjs
    ```
    Inspect output for the specific file path. Zero violations = commit-ready.

### Template vs. SC3 Ordering — Verified Consistent

The l1-template.md shows: frontmatter → EEE block → H1 → `## Summary` → gate blockquote. C17 assertion #2 (H1 after block) and #4 (Summary first H2) enforce the same ordering. **No discrepancy between template and validator.** [VERIFIED: l1-template.md:34–44 and c17-eee-contract.mjs:211–265]

---

## Q3: Platform Derivation Table

**Full verified platform mapping for all 75 files:**

| File Range | Files | Raw `platform:` | D1 Label | Needs Injection? |
|-----------|-------|----------------|----------|-----------------|
| L1 00-index.md | RE-001 | `all` | All Platforms | No |
| L1 01–09 | RE-002..RE-010 | *(absent)* | Windows | **YES — inject `platform: Windows`** |
| L1 10–15 | RE-011..RE-016 | `macOS` | macOS | No |
| L1 16–21 | RE-017..RE-022 | `iOS` | iOS | No |
| L1 22–29 | RE-023..RE-030 | `Android` | Android | No |
| L1 30–33 | RE-031..RE-034 | `Linux` | Linux | No |
| L1 34 | RE-035 | `ios+macos+shared-ipad` | iOS + macOS + Shared iPad | No |
| L1 35–37 | RE-036..RE-038 | `macOS` | macOS | No |
| L1 38–41 | RE-039..RE-042 | `windows+macos+ios+android+linux` | All Platforms | No |
| L2 00-index.md | RE-043 | `all` | All Platforms | No |
| L2 01–08 | RE-044..RE-051 | *(absent)* | Windows | **YES — inject `platform: Windows`** |
| L2 10–13 | RE-052..RE-055 | `macOS` | macOS | No |
| L2 14–17 | RE-056..RE-059 | `iOS` | iOS | No |
| L2 18–23 | RE-060..RE-065 | `Android` | Android | No |
| L2 24–25 | RE-066..RE-067 | `Linux` | Linux | No |
| L2 26 | RE-068 | `ios+macos+shared-ipad` | iOS + macOS + Shared iPad | No |
| L2 27–30 | RE-069..RE-072 | `macOS` | macOS | No |
| L2 31–33 | RE-073..RE-075 | `windows+macos+ios+android+linux` | All Platforms | No |

**Total files needing platform injection:** 17 (9 L1 Windows + 8 L2 Windows)

[VERIFIED: `grep -rn "^platform:" docs/l1-runbooks/ docs/l2-runbooks/` — all 75 files confirmed]

**Grep method for plan-time verification:**
```bash
# Files WITHOUT a platform key (need Windows injection)
grep -rL "^platform:" docs/l1-runbooks/ docs/l2-runbooks/

# All present platform values (to confirm no new variants)
grep -rh "^platform:" docs/l1-runbooks/ docs/l2-runbooks/ | sort -u
```

---

## Q4: D-05 Blockquote Workload

### Enumeration Method

Implement the exact #12 logic as a scan script or one-pass shell idiom to measure all over-limit blockquotes before and after reform:

**Shell one-liner to find over-200-char blockquote groups per file:**
```bash
node -e "
const fs = require('fs');
const path = require('path');
function walk(dir) {
  return fs.readdirSync(dir).flatMap(f => {
    const p = path.join(dir, f);
    return fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}
let count = 0;
for (const fp of walk('docs/l1-runbooks').concat(walk('docs/l2-runbooks'))) {
  const lines = fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n').split('\n');
  let inFence = false; let i = 0;
  while (i < lines.length) {
    if (/^\`{3,}|^~{3,}/.test(lines[i])) { inFence = !inFence; i++; continue; }
    if (!inFence && /^>/.test(lines[i])) {
      const group = [];
      while (i < lines.length && !inFence && /^>/.test(lines[i])) {
        group.push(lines[i].replace(/^> ?/, '')); i++;
      }
      const text = group.join(' ');
      if (text.length > 200) {
        console.log(fp + ':' + (i - group.length + 1) + ' (' + text.length + 'c): ' + text.slice(0, 60) + '...');
        count++;
      }
    } else { i++; }
  }
}
console.log('Total over-limit groups: ' + count);
"
```

This replicates the exact #12 logic. Run it before and after D-05 fixes to confirm workload and completion.

### Allowed Reformat Transforms

**Transform A: Sentence-boundary split** (preferred for gate blockquotes and multi-sentence callouts)

Before (one group, 272 chars — FAILS):
```markdown
> **When to use:** Take this snapshot on devices that are currently stuck on ESP, before any remediation or restart. For post-failure analysis on devices that have already rebooted, the `.cab` file from Section 1 contains registry state captured at diagnostic collection time.
```

After (two groups, each ≤200 chars — PASSES):
```markdown
> **When to use:** Take this snapshot on devices that are currently stuck on ESP, before any remediation or restart.

> For post-failure analysis on devices that have already rebooted, the `.cab` file from Section 1 contains registry state captured at diagnostic collection time.
```

The blank line between them creates two distinct groups. Each is checked independently by #12.

**Transform B: De-blockquote to bold-led paragraph** (for non-gate callouts — removes from #12's universe entirely)

Before (one group, 232 chars — FAILS):
```markdown
> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing commands (MDM ClearPasscode, MDM EraseDevice) appear ONLY in the per-cause `### Admin Action Required` sections — they are not L1 actions.
```

After (normal paragraph — invisible to #12 — PASSES):
```markdown
**L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing commands (MDM ClearPasscode, MDM EraseDevice) appear ONLY in the per-cause `### Admin Action Required` sections — they are not L1 actions.
```

**Never allowed:** shortening text, removing clauses, removing hyperlinks, rewording for brevity. Every word must be preserved.

**Escalation rule:** If a single atomic sentence exceeds 200 chars and cannot be split at a sentence boundary without a word change, escalate that specific blockquote to the content owner. Do not silently trim.

### Known Over-Limit Blockquotes in Sampled Files

From direct code reading:

| File | Blockquote | Approx. Chars | Recommended Fix |
|------|-----------|--------------|-----------------|
| l1/34 | Platform gate (line 9) | 399c | Transform A (split at sentence boundaries — 3 sentences → 3 groups) |
| l1/34 | L1 scope note (mid-doc) | ~230c | Transform B (de-blockquote to bold paragraph) |
| l1/37 | "After completing Path A" note | ~450c | Transform A (split after first sentence, then after second) |
| l1/37 | "After completing Path B" note | ~450c | Transform A |
| l1/37 | "After completing Path C" note | ~450c | Transform A |
| l2/01 | "When to use" note (Section 4) | ~272c | Transform A |
| *many* | Platform gate single-line (Linux gates ~389–401c) | 389–929c | Transform A |

[VERIFIED: direct file reads. CONTEXT.md D-05 states 183 over-limit groups across 56 files — this sample confirms the pattern.]

---

## Q5: Mechanical Helper Design

### Script Location and Shape

**Path:** `scripts/pipeline/retrofit-runbook.mjs` (mirrors `guard-docx.mjs` idiom — node-builtins-only, `node:fs`, `node:path`, `node:process`)

**Inputs:**
- A single file path or a list of file paths (argv or piped list)
- `docs/_registry/RE-index.md` (parsed to build `path → RE-NNN` map)
- Tier detection from file path (`l1-runbooks/` → `L1 Team Lead`, `l2-runbooks/` → `L2 Desktop Lead`)

**Algorithm per file:**

```
1. Read RE-index.md → build Map<relativePath, docId>
2. For each target file:
   a. Parse YAML frontmatter (match /^---\n([\s\S]*?)\n---/m)
   b. Look up doc_id = pathMap.get(relNormalize(filePath)) → error if not found
   c. Detect platform: present/absent in frontmatter
   d. If absent → platform = 'Windows' (inject); else carry existing value verbatim
   e. Compute D1 label = D1_MAP[platform] → error if unmapped
   f. Detect tier from path → owner string
   g. Build new frontmatter: prepend doc_id/status/owner/doc_type; inject platform if needed
   h. Detect pre-H1 gate blockquote: find first /^>/ run before first /^# [^#]/ line in body
   i. Strip gate blockquote from its pre-H1 position
   j. Build EEE block line string
   k. Write new body: block line → blank → H1 → blank → '## Summary' → blank → '[FILL-IN: ≥30 words, opens with banner]' → blank → [gate blockquote] → [remaining sections]
   l. Append Version-History row: '| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |'
      - If ## Version History exists: prepend row before first data row
      - If absent: create section at end of file with new row
   m. Write output (overwrite in-place or to a staging path)
3. Print per-file summary: doc_id injected, platform injected (Y/N), gate relocated, Summary placeholder inserted
```

**What the script CANNOT do (hand-authored):**
- Write the actual `## Summary` prose (leaves `[FILL-IN]` placeholder)
- Fix D-05 over-limit blockquotes (leaves them for hand-fix)
- Fill in the exact retrofit date in Version-History (uses `YYYY-MM-DD` placeholder; executor fills at commit time)

**Reusable pattern:** The D1_MAP constant is identical to c17-eee-contract.mjs lines 26–47. Import it from a shared lib or copy verbatim (the file is 587 lines total — a copy is acceptable for a one-shot script).

---

## Q6: Enrollment-Completeness Precheck

The Phase-115 D-02 two-part SC requires: (1) all files in the L1/L2 class carry the 4 EEE keys, THEN (2) C17 exits 0.

**Precheck command (must return zero lines to pass):**
```bash
# List any L1/L2 file missing any of the 4 mandatory EEE frontmatter keys
for f in docs/l1-runbooks/*.md docs/l2-runbooks/*.md; do
  grep -q "^doc_id:" "$f" && \
  grep -q "^status:" "$f" && \
  grep -q "^owner:" "$f" && \
  grep -q "^doc_type:" "$f" || echo "INCOMPLETE: $f"
done
```

Expected output after full batch: empty (no lines). Any line printed = enrollment gap = batch not yet complete.

**Then run C17:**
```bash
node scripts/validation/c17-eee-contract.mjs
```

Both must pass before phase-close SC5 is satisfied.

---

## Q7: Non-Read-Only Runbook Enumeration

The D-04 default L1 banner ("read-only diagnostic steps only — no registry edits, no PowerShell, no destructive actions") is **factually false** for state-changing runbooks. These need tailored banners.

**Grep-based identification:**
```bash
grep -li "ClearPasscode\|EraseDevice\|LAPS\|password reset\|password recovery\|Reset-\|Repair-\|Remove-\|registry" docs/l1-runbooks/ docs/l2-runbooks/ -r
```

**Confirmed state-changing runbooks** (from grep + direct reads):

| File | RE-ID | Nature of State Change |
|------|-------|----------------------|
| `l1/34-apple-business-shared-ipad-passcode-reset.md` | RE-035 | Apple Business passcode reset; MDM ClearPasscode/EraseDevice escalation pointers |
| `l1/36-macos-secure-enclave-key.md` | RE-037 | Secure Enclave key re-registration |
| `l1/37-macos-local-password-reset.md` | RE-038 | FileVault key escrow retrieval; LAPS admin password use; Apple ID reset — all destroy Secure Enclave binding |
| `l2/02-esp-deep-dive.md` | RE-045 | ESP remediation steps (registry edits, state reset) |
| `l2/03-tpm-attestation.md` | RE-046 | TPM remediation (Clear-Tpm, firmware reset) |
| `l2/04-hybrid-join.md` | RE-047 | Hybrid join registration remediation (dsregcmd) |
| `l2/26-apple-business-permission-denied.md` | RE-068 | MDM command escalation investigation |
| `l2/27-macos-sso-investigation.md` | RE-069 | Platform SSO re-registration commands |
| `l2/29-macos-graph-credential-investigation.md` | RE-071 | Graph Platform Credential remediation |

[VERIFIED: grep output on live codebase + direct file reads of sampled files]

Note: `l1/00-index.md` is an index doc — its banner should reflect its nature (navigation/index, not operational steps). L2 files are inherently investigative with state-changing remediation — the L2 default banner should already say "change-control and escalation guardrail in effect; all MDM commands require L2 approval."

---

## Q8: Batch Partition Proposal

Based on verified platform mapping (Q3) and the D-02 tier-outer, platform-inner rule.

### 6-Plan Option (aggressive batching)

| Plan | Files | RE-IDs | Platforms | Approx. D-05 Load |
|------|-------|--------|-----------|-------------------|
| P1: L1 Windows + L1 Index | 10 | RE-001..RE-010 | All Platforms (index), Windows (01–09) | Light (Version gates ~164c, likely under 200) |
| P2: L1 macOS cluster | 10 | RE-011..RE-016, RE-036..RE-038 | macOS | Medium (Platform gates; some long after-path notes) |
| P3: L1 iOS + L1 Android | 14 | RE-017..RE-030 | iOS, Android | Medium-heavy (Platform gates across 14 files) |
| P4: L1 Linux + L1 apple-biz + L1 802.1X | 9 | RE-031..RE-035, RE-039..RE-042 | Linux, iOS+macOS+Shared iPad, All Platforms | Heavy (RE-035 gate 399c; 802.1X Platform gates on All Platforms) |
| P5: L2 Index + L2 Windows + L2 macOS | 13 | RE-043..RE-055 | All Platforms (index), Windows (01–08), macOS (10–13) | Medium (some L2 Windows gates under 200c) |
| P6: L2 iOS + Android + Linux + apple-biz + macOS SSO + 802.1X | 19 | RE-056..RE-075 | iOS, Android, Linux, iOS+macOS+Shared iPad, macOS, All Platforms | Heavy (20 files, mixed platforms — largest plan) |

**Total: 75 files in 6 plans.** P4 and P6 are heaviest for D-05.

### 7-Plan Option (more balanced)

| Plan | Files | RE-IDs | Platforms |
|------|-------|--------|-----------|
| P1: L1 Windows + L1 Index | 10 | RE-001..RE-010 | All Platforms, Windows |
| P2: L1 macOS cluster | 10 | RE-011..RE-016, RE-036..RE-038 | macOS |
| P3: L1 iOS + L1 Android | 14 | RE-017..RE-030 | iOS, Android |
| P4: L1 Linux + L1 apple-biz + L1 802.1X | 9 | RE-031..RE-035, RE-039..RE-042 | Linux, iOS+macOS+Shared iPad, All Platforms |
| P5: L2 Index + L2 Windows | 9 | RE-043..RE-051 | All Platforms, Windows |
| P6: L2 macOS + L2 iOS + L2 Android + L2 apple-biz | 15 | RE-052..RE-068 | macOS, iOS, Android, iOS+macOS+Shared iPad |
| P7: L2 Linux + L2 macOS SSO + L2 802.1X | 9 | RE-066..RE-067, RE-069..RE-075 | Linux, macOS, All Platforms |

**Total: 75 files in 7 plans.** More balanced (9–15 files per plan); recommended if D-05 workload in P4 proves heavy.

**Recommendation:** Start with 7-plan structure. The 6-plan P6 (19 files, 6 platform variants) is too heterogeneous and too large for a single reviewable checkpoint.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| doc_id lookup per file | String search, hardcoded map | RE-index.md path column (parse the table) | Registry is the authoritative collision-free source; hand-transcribing 75 IDs risks transcription errors caught by #9 |
| D1 platform normalization | Custom mapping | D1_MAP constant in c17-eee-contract.mjs (lines 26–47) | Exact same 20-entry map; any divergence causes #9/#10 failures |
| Blockquote length measurement | Custom counter | Replicate exact #12 logic (join with space, strip `> `) | Naive line-length counts give wrong answers; the join-with-space step matters |
| C17 per-file validation | Custom lint | `node scripts/validation/c17-eee-contract.mjs` | The immutable gate; never substitute a custom check |

---

## Common Pitfalls

### Pitfall 1: Block Line Not First Non-Blank in Body
**What goes wrong:** Placing a comment, blank line, or the gate blockquote before the EEE block line causes C17 #2 to either fail (H1 before block line) or #4 to fail (## Summary not first H2).
**Why it happens:** The gate blockquote was pre-H1 before retrofit; it's easy to leave it there accidentally.
**How to avoid:** Body must start: EEE block line (first non-blank) → blank → H1 → blank → ## Summary → Summary prose → gate blockquote.
**Warning signs:** C17 #2 violation "H1 at body-line N does not appear after block line (M)".

### Pitfall 2: Forgetting the Blank Line Between Gate Groups
**What goes wrong:** D-05 split uses `>` then `>` with only a single blank line — but the blank line must be a TRULY empty line. An `> ` (blockquote with only a space) does NOT split the group.
**Why it happens:** Editor auto-continues blockquote prefix.
**How to avoid:** Split line must match `/^$/` — zero characters. Use a real empty line.
**Warning signs:** C17 #12 still fires after the "split".

### Pitfall 3: List-Nested Blockquotes Counted Incorrectly
**What goes wrong:** Assuming `9. > **Say to the user:**...` lines are over-200-char violations. They are NOT — the line starts with a digit, so `/^>/` never matches.
**Why it happens:** Visual inspection looks like blockquotes.
**How to avoid:** Only lines where the very first character is `>` are in C17's scope.
**Warning signs:** Spending time splitting list-nested blockquotes that don't need it.

### Pitfall 4: platform: absent triggers #10 and #9
**What goes wrong:** Retrofitting a Windows file without injecting `platform: Windows` causes both assertion #10 (absent = HARD FAILURE) and #9 (no platform label to match block).
**Why it happens:** 17 files have no platform key; easy to miss when scripting.
**How to avoid:** Script explicitly checks for platform key presence; if absent AND in l1/01-09 or l2/01-08, inject `platform: Windows`.
**Warning signs:** C17 #10 violation "platform key is absent from frontmatter".

### Pitfall 5: Wrong Block Field Value (exact match)
**What goes wrong:** C17 #9 requires the block Platform field to be the D1 label exactly (e.g., `iOS + macOS + Shared iPad`, not `ios+macos+shared-ipad` or `iOS/macOS/Shared iPad`).
**Why it happens:** Formatting the block line from memory rather than from the D1_MAP lookup.
**How to avoid:** Script derives block Platform from `D1_MAP[frontmatter_platform]` — never hand-transcribe.
**Warning signs:** C17 #9 violation "Block Platform X ≠ D1 label Y".

### Pitfall 6: Version-History Row Missing from l2/01
**What goes wrong:** `docs/l2-runbooks/01-log-collection.md` has no `## Version History` section (confirmed by grep). Attempt to "prepend a row" to a non-existent table fails.
**Why it happens:** This is the one L2 file without the section.
**How to avoid:** Script checks for existence of `## Version History`; if absent, creates the section.
**Warning signs:** No `## Version History` heading in the output.

### Pitfall 7: Template-Sentinel Confusion
**What goes wrong:** A real retrofitted runbook accidentally gets `last_verified: 1970-01-01` — causing C17 to skip #9 and #12 silently (false pass).
**Why it happens:** Copy-paste from a template.
**How to avoid:** Script asserts `last_verified` ≠ `1970-01-01` before writing; carry the original value verbatim.
**Warning signs:** C17 passes suspiciously quickly with no #12 violations on a known-long blockquote file.

---

## Code Examples

### EEE Block Line (exact format, from template)

```markdown
**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** RE-002 · **Status:** Approved
```

The `·` is U+00B7 (middle-dot). Must be copy-pasted or written as the Unicode character, not a hyphen or bullet.

[VERIFIED: l1-template.md:34, l2-template.md:35, EEE-SOP-standard.md:83, c17-eee-contract.mjs:191]

### Version-History Row (exact string)

```markdown
| 2026-07-04 | v1.15 EEE reformat — content not re-reviewed | — |
```

The `—` is an em-dash. Date = actual retrofit commit date. [VERIFIED: EEE-SOP-standard.md:164]

### D-05 Split Example (worked)

Platform gate for l1/34 (399 chars, 3 sentences):

Before:
```markdown
> **Platform gate:** This guide covers Apple Business Shared iPad passcode reset (iOS + iPadOS + Shared iPad). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).
```

After (split into 3 groups by blank lines):
```markdown
> **Platform gate:** This guide covers Apple Business Shared iPad passcode reset (iOS + iPadOS + Shared iPad).

> For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

> For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).
```

Group 1: ~83 chars. Group 2: ~130 chars. Group 3: ~109 chars. All ≤200. [ASSUMED — char counts approximate, verify with measurement script]

---

## Runtime State Inventory

Not applicable — this is a greenfield documentation-content phase with no runtime state. The only "state" is the registry (RE-index.md) lifecycle column, which is edited in-repo as part of the retrofit.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Validator | `c17-eee-contract.mjs` (node built-ins only) |
| Config file | None — single standalone script |
| Quick run command | `node scripts/validation/c17-eee-contract.mjs` |
| Full suite command | `node scripts/validation/c17-eee-contract.mjs --verbose` |
| Self-test | `node scripts/validation/c17-eee-contract.mjs --self-test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Status |
|--------|----------|-----------|-------------------|-------------|
| RETRO-01 SC1 | EEE block correct (doc_id, Platform, Doc Type, Status) | C17 #6, #7, #8, #9, #10 | `node scripts/validation/c17-eee-contract.mjs` | Exists |
| RETRO-01 SC2 | Summary ≥30 words with banner | C17 #4, #5 | `node scripts/validation/c17-eee-contract.mjs` | Exists |
| RETRO-01 SC3 | D3-A structure (block → H1 → Summary → gate) | C17 #2, #4 | `node scripts/validation/c17-eee-contract.mjs` | Exists |
| RETRO-01 SC4 | Version-History row present | Manual inspection | — | No C17 assertion for VH row — manual only |
| RETRO-01 SC5 | C17 exit 0 on every file | C17 (all assertions) | `node scripts/validation/c17-eee-contract.mjs` (exit code) | Exists |
| RETRO-01 enrollment | Every file carries 4 EEE keys before C17 run | Enrollment precheck | See Q6 grep command | Exists (grep) |

### Sampling Rate

- **Per file commit:** Run `node scripts/validation/c17-eee-contract.mjs` and confirm zero violations for that file.
- **Per batch plan complete:** Run with `--verbose` to confirm all enrolled files in the batch pass.
- **Phase gate (SC5):** All 75 files enrolled + C17 exit 0. Enrollment precheck (Q6) passes first.

### Wave 0 Gaps

None — C17 is live and passes its `--self-test`. No new test infrastructure needed. The retrofit script (Q5) is a plan deliverable, not a pre-phase gap.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | `c17-eee-contract.mjs`, retrofit helper | ✓ | (check with `node --version`) | — |
| `docs/_registry/RE-index.md` | doc_id join | ✓ | — (75 entries verified) | — |
| `scripts/validation/c17-eee-contract.mjs` | C17 gate | ✓ | Phase 115 output, 577 lines | — |

**No external npm packages.** Everything node-builtins-only.

---

## Security Domain

This phase touches only `.md` files and reads/writes the registry table. No authentication, cryptography, network access, or user input handling. ASVS categories do not apply.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | D-05 split char counts for specific blockquotes are approximate | Q4, Code Examples | Planner should run the measurement script to confirm exact counts before marking splits done |
| A2 | l1/01–09 and l2/01–08 are the COMPLETE set of keyless files | Q3 | Re-run grep at plan time to confirm no other files have been added without a platform key |

---

## Open Questions

1. **Version-History date in retrofit script**
   - What we know: the Date column of the Version-History row should be the retrofit commit date.
   - What's unclear: the script cannot know the commit date at file-write time (commits happen after edits).
   - Recommendation: script writes `YYYY-MM-DD` placeholder; executor fills in the actual date when committing. Alternatively, script uses `new Date().toISOString().slice(0, 10)` at run time — acceptable if all files in a batch are processed and committed on the same day.

2. **`00-index.md` Summary prose**
   - What we know: both index files are `doc_type: Runbook` (D-06); they're navigation/index docs, not procedural runbooks.
   - What's unclear: what "scope/safety banner" means for an index file vs. a procedural runbook.
   - Recommendation: index files' Summary should describe their navigational purpose ("Index of all L1/L2 runbooks...") with a note that they carry no procedural steps — no false "read-only diagnostic steps" banner needed.

---

## Sources

### Primary (HIGH confidence)

- `scripts/validation/c17-eee-contract.mjs` — all 13 assertions, enrollment logic, exact #12 algorithm (read line-by-line)
- `docs/_standards/EEE-SOP-standard.md` — D1 map (20 entries), block format, D2 rule, Version-History row exact string
- `docs/_templates/l1-template.md` / `l2-template.md` — target frontmatter key set, block line, D3-A body order, reviewer roles
- `docs/_registry/RE-index.md` — RE-001..RE-075 path/doc_id/doc_type mapping (75 rows confirmed)
- `grep -rn "^platform:" docs/l1-runbooks/ docs/l2-runbooks/` — verified platform values for all 75 files
- `grep -rL "^## Summary"` — confirmed zero files currently have `## Summary`
- `grep -rL "^## Version History"` — confirmed l2/01-log-collection.md is the sole file without Version History

### Secondary (MEDIUM confidence)

- `.planning/phases/116-l1-l2-runbook-retrofit-75-docs/116-CONTEXT.md` — locked decisions, Referee-verified measurements (56 files, 183 groups, specific char counts for known files)

---

## Metadata

**Confidence breakdown:**
- C17 assertion inventory: HIGH — read from source code line-by-line
- Transform recipe: HIGH — derived from templates + validator code
- Platform mapping: HIGH — verified by grep against all 75 files
- D-05 workload: MEDIUM-HIGH — general pattern HIGH; specific per-file counts ASSUMED (measure at plan time)
- Batch partition: MEDIUM — structural approach HIGH; exact file-to-batch boundary is Discretion item

**Research date:** 2026-07-04
**Valid until:** Phase 119 close (C17 is locked — this research stays current until then)
