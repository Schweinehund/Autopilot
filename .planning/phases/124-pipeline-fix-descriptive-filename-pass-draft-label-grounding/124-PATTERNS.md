# Phase 124: Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe - Pattern Map

**Mapped:** 2026-07-08
**Files analyzed:** 10 (modify: 5, create: 5)
**Analogs found:** 10 / 10 (all files have a strong same-repo analog; this phase forks/extends existing conventions, it does not introduce a new architectural shape)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|----------------|
| `scripts/pipeline/convert.ps1` (modify, PIPE-03) | build-script / CLI wrapper | file-I/O + transform (preprocess-then-shell-out) | itself (current file, pre-line-74 insertion point) | exact (self-fork, additive block) |
| `scripts/pipeline/lib/ooxml.mjs` (modify, PIPE-03/D-04) | utility (zero-dep OOXML introspection) | file-I/O + transform | `extractEntry()` / `findHeadingStyleIds()` in the same file | exact (same file, same export-function convention) |
| `scripts/pipeline/guard-docx.mjs` (modify, PIPE-03/D-04) | validator / CLI check-runner | request-response-style CLI (exit-code contract) | `runYamlLeakCheck()` / `runHeadingStyleCheck()` + `checks` array in the same file | exact (same file, same check-object convention) |
| `scripts/pipeline/build-filename-map.mjs` (new, PIPE-04) | generator (Node CLI) | batch / transform (markdown-table in, committed-artifact out) | `scripts/pipeline/retrofit-nav-hub.mjs` (`buildDocIdMap()`, self-test, fail-closed exit, `--dry-run`/`--verbose` argv convention) | role-match (retrofit family is the established "read RE-index.md / registry-driven generator" pattern) |
| `scripts/pipeline/filename-map.md` (new committed artifact, PIPE-04) | config / data artifact | batch (generated, read by future batch driver) | `docs/_registry/RE-index.md` (table shape: `\| Doc ID \| Path \| ... \|`) | role-match (same pipe-table convention, same repo) |
| `scripts/pipeline/test-fixtures/draft-test-doc.md` (modify, PIPE-05) | test fixture | file-I/O (fixture consumed by convert.ps1 + guard-docx.mjs) | `docs/l1-runbooks/01-device-not-registered.md` (real shipped EEE format/position) + `scripts/pipeline/test-fixtures/README.md` (superseded stub convention, for contrast) | exact (target format is a direct quote of a real corpus file) |
| `scripts/pipeline/README.md` (modify, D-01/D-03 SC1 caveat) | doc / config | — | itself (SC1 section) | exact (self-fork, additive caveat) |
| `scripts/pipeline/test-fixtures/README.md` (modify, recommended) | doc | — | itself ("Stub EEE Header Format" section) | exact (self-fork, add one-line note) |
| `.planning/phases/124-.../PIPE-05-RUNBOOK.md` (new) | runbook doc | event-driven (owner-executed checkpoint procedure) | `.planning/milestones/v1.15-phases/113-.../PIPE-02-RUNBOOK.md` | exact (explicitly named precedent in CONTEXT.md D-15) |
| `.planning/phases/124-.../PIPE-05-FINDINGS.md` (new, blank template) | evidence doc | event-driven | `.planning/milestones/v1.15-phases/113-.../PIPE-02-FINDINGS.md` | exact (explicitly named precedent in CONTEXT.md D-15) |

Two additional text-only edits are in scope per CONTEXT.md but have no code "pattern" to map — noted for completeness, not analog-mapped: `.planning/REQUIREMENTS.md:35` (D-17 wording correction) and `.planning/ROADMAP.md` SC4 (D-18 reword). Treat these as plain prose edits in whatever plan owns them.

---

## Pattern Assignments

### `scripts/pipeline/convert.ps1` (build-script, file-I/O+transform) — PIPE-03

**Analog:** itself — `D:\claude\Autopilot\scripts\pipeline\convert.ps1` (83 lines, read in full)

**Current structure (lines 1-19, param block):**
```powershell
[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$InputMd,
    [Parameter(Mandatory)][string]$OutputDocx,
    [string]$ReferenceDoc = 'scripts/pipeline/reference.docx'
)
```
`$InputMd` and `$OutputDocx` are the two params the preprocessing block and the PIPE-04 output-name wiring both key off. **Do not change this signature** — D-10 locks `-OutputDocx` as the PIPE-04 hook and PIPE-03 stays a body-only insertion.

**Insertion anchor — the canonical invocation block (lines 69-79, SC1 "single source of truth"):**
```powershell
# ─── Canonical conversion (SC1) ───────────────────────────────────────────────
# This is the SINGLE SOURCE OF TRUTH for the invocation. No other flags.
# --standalone is auto-applied for docx output: YAML frontmatter goes into Word
# document properties, not body text. Do not add extra flags to this invocation.
Write-Host "Converting $InputMd -> $OutputDocx ..." -ForegroundColor Cyan
& $pandocBin $InputMd -o $OutputDocx "--reference-doc=$ReferenceDoc"

if ($LASTEXITCODE -ne 0) {
    Write-Error "pandoc conversion failed (exit $LASTEXITCODE)"
    exit 1
}
```
The PIPE-03 preprocessing block goes **immediately before this comment block** (i.e., before current line 69 / RESEARCH's "line 74" reference to the `& $pandocBin` call itself). Feed the temp file to `& $pandocBin` in place of `$InputMd` — this is the ONLY line that changes in the invocation (`$InputMd` → `$tempMd`); everything else in this block, including the flag set, is flag-identical per D-01.

**Existing error-handling idiom to mirror for the new D-03(b) fail-closed guard** (same file, lines 41-49, `Write-Error` + `exit 1` pattern):
```powershell
if ($ver -ne $expectedVer) {
    Write-Error "pandoc version mismatch: expected $expectedVer, got $ver. Install the pinned version from https://github.com/jgm/pandoc/releases/tag/3.7.0.2"
    exit 1
}
```
Use this exact `Write-Error` + `exit 1` shape (not `throw`, not `$ErrorActionPreference` tricks) for the D-03(b) unexpected-diff abort, consistent with the version-guard and input-validation blocks already in this file (lines 41-49, 53-60).

**Full preprocessing block to insert (verified this session against the live repo — see 124-RESEARCH.md Pattern 1, lines 262-321):** the RESEARCH.md code block is copy-paste-ready PowerShell; reuse it verbatim as the starting point rather than re-deriving the fence-tracking/anchor-match logic.

---

### `scripts/pipeline/lib/ooxml.mjs` (utility, file-I/O) — PIPE-03/D-04

**Analog:** same file, `extractEntry()` (lines 38-81) and `findHeadingStyleIds()` (lines 115-122)

**Existing export-function convention to mirror exactly:**
```javascript
/**
 * Check whether Heading 1/2/3 styleIds appear in the document body XML.
 * ...
 * @param {string} docxPath - absolute or repo-relative path to .docx file
 * @returns {string[]} subset of ['Heading1','Heading2','Heading3'] found in body XML
 */
export function findHeadingStyleIds(docxPath) {
  const xml = extractEntry(docxPath, 'word/document.xml').replace(/\r\n/g, '\n');
  const found = [];
  for (const id of ['Heading1', 'Heading2', 'Heading3']) {
    if (xml.includes(`w:val="${id}"`)) found.push(id);
  }
  return found;
}
```
New `extractCustomProperties(docxPath)` follows this identical shape: JSDoc block, `extractEntry(docxPath, '<entry>')` call, regex scan, array return. RESEARCH.md (Pattern 2, lines 339-357) already has the exact function body — reuse verbatim:
```javascript
export function extractCustomProperties(docxPath) {
  const xml = extractEntry(docxPath, 'docProps/custom.xml');
  const names = [];
  const re = /<property[^>]*\bname="([^"]+)"/g;
  let m;
  while ((m = re.exec(xml)) !== null) names.push(m[1]);
  return names;
}
```
**Imports:** file already imports only `node:fs` (`readFileSync`) and `node:zlib` (`inflateRawSync`) — lines 18-19. The new function needs no new import (it reuses `extractEntry`, already in-file).

**Confirmed 9-key set (safe to hard-code in the D-04 caller, per RESEARCH.md):** `applies_to, audience, doc_id, doc_type, last_verified, owner, platform, review_by, status`.

---

### `scripts/pipeline/guard-docx.mjs` (validator/CLI, request-response) — PIPE-03/D-04

**Analog:** same file — `runYamlLeakCheck()` (lines 43-58), `runHeadingStyleCheck()` (lines 66-79), `checks` array (lines 129-141)

**Imports pattern (lines 19-25):**
```javascript
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import process from 'node:process';
// Internal lib only (not npm)
import { extractBodyText, findHeadingStyleIds } from './lib/ooxml.mjs';
```
Add `extractCustomProperties` to this same internal-lib import line when wiring the new check.

**Core check-function pattern to copy (lines 66-79):**
```javascript
function runHeadingStyleCheck(path) {
  try {
    const found = findHeadingStyleIds(path);
    if (!found.includes('Heading1')) {
      return {
        pass: false,
        detail: 'Heading1 pStyle absent in .docx body (found: [' + found.join(',') + ']) -- headings likely flattened to Normal'
      };
    }
    return { pass: true, detail: 'heading pStyle IDs present: [' + found.join(',') + ']' };
  } catch (err) {
    return { pass: false, detail: 'findHeadingStyleIds error: ' + err.message };
  }
}
```
New `runCustomPropsCheck(path)` mirrors this: try/catch, `{ pass, detail }` return shape, checks the 9-key set against `extractCustomProperties()`'s output — fail if any expected key is absent (OQ4 non-regression) AND/or if unexpected leak keys appear in body (the D-04 "no-body-leak" half pairs with the existing `runYamlLeakCheck` rather than needing new logic).

**Checks-array registration pattern (lines 129-141) — append, do not restructure:**
```javascript
checks.push({
  id: 'YAML-LEAK',
  name: 'V-GUARD-YAML-LEAK: no "---" YAML delimiter in first ~500 chars of .docx body text',
  run() { return runYamlLeakCheck(docxPath); }
});

checks.push({
  id: 'HEADING-STYLE',
  name: 'V-GUARD-HEADING-STYLE: Heading1/Heading2/Heading3 pStyle IDs present in .docx body',
  run() { return runHeadingStyleCheck(docxPath); }
});
```
A new `checks.push({ id: 'CUSTOM-PROPS', name: '...', run() { return runCustomPropsCheck(docxPath); } })` slots in after these two — the runner loop (lines 292-314) and self-test harness (lines 158-282) require zero further changes since both iterate `checks` generically.

**Self-test convention (lines 158-282)** — `stAssert(label, pass, detail)` helper (lines 163-167) is the pattern to reuse if the plan adds a CUSTOM-PROPS sub-test to `--self-test`; it mirrors the same PASS/FAIL padded-label console format used everywhere else in this file and in the `retrofit-*.mjs` family.

**RESEARCH.md open question (OQ1, lines 602-612):** the recommendation is to make CUSTOM-PROPS a **permanent** guard check (not a one-off script) — this is the analog-consistent choice since it follows the existing two-check pattern exactly; a one-off script would be a new, unprecedented shape in this file.

---

### `scripts/pipeline/build-filename-map.mjs` (new generator, batch/transform) — PIPE-04

**Analog:** `scripts/pipeline/retrofit-nav-hub.mjs` (991 lines, read in full) — this is the established "reads a registry-shaped markdown table, applies deterministic per-row rules, writes/reports fail-closed" pattern in this exact directory.

**Imports pattern (lines 52-54):**
```javascript
// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync, readdirSync, lstatSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```
`build-filename-map.mjs` needs a strict subset: `readFileSync`/`writeFileSync` from `node:fs`, nothing from `node:path` unless the D-08 collision-resolution path-segment logic needs it (it likely will, for `Path` parent-directory segments).

**CLI argv convention (lines 56-63):**
```javascript
const argv = process.argv.slice(2);
const VERBOSE  = argv.includes('--verbose');
const DRY_RUN  = argv.includes('--dry-run');
const ALL      = argv.includes('--all');
const SELF_TEST = argv.includes('--self-test');
```
Reuse `--verbose`/`--self-test` flags at minimum; `--dry-run` is a natural fit too (preview the map without writing `filename-map.md`).

**THE load-bearing pattern — registry-table parser (lines 268-283, `buildDocIdMap`):**
```javascript
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
```
This is the **direct analog** for `build-filename-map.mjs`'s registry reader, but PIPE-04 needs **Title** (column 3) and **Path** (column 2) both, not just Path→DocId. RESEARCH.md's Pattern 3 (lines 373-390) already extends this exact idiom to 5 columns:
```javascript
const registryText = readFileSync('docs/_registry/RE-index.md', 'utf8');
const rows = registryText
  .split(/\r?\n/)
  .filter(l => /^\|\s*RE-\d+\s*\|/.test(l))   // excludes header/separator/prose rows
  .map(l => {
    const cols = l.split('|').map(s => s.trim());
    // cols[0] is '' (leading pipe); cols[1..5] are Doc ID/Path/Title/Doc Type/Status
    return { docId: cols[1], path: cols[2], title: cols[3], docType: cols[4], status: cols[5] };
  });
```
Use this `.split('|').map(s => s.trim())` variant (not the two-capture-group regex) since PIPE-04 needs all 5 columns, not just 2.

**`readFile()` helper to copy verbatim (lines 207-211) — CRLF normalization is mandatory on this Windows repo:**
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**Fail-closed exit convention (mirrors `main()`, lines 875-880 and 906-909, 916-920):**
```javascript
if (docIdMap.size === 0) {
  process.stderr.write('ERROR: RE-index.md not found or contains no RE-NNN rows at: ' + REGISTRY_PATH + '\n');
  process.exit(1);
}
```
Apply the identical `process.stderr.write(...); process.exit(1);` shape for D-08's `FILENAME-COLLISION-UNRESOLVED` fail-closed exit — do not `throw` (this family never throws uncaught; it always writes to stderr and calls `process.exit(1)`).

**Self-test harness convention (lines 578-871) — `stAssert` helper (lines 581-585) + one `{ ... }`-scoped block per sub-test, each proving one guard/router branch in isolation.** `build-filename-map.mjs`'s `--self-test` should prove at minimum: (a) the 5-column row parser against a synthetic registry snippet, (b) the D-05 slug algorithm's exact 5-step order against the `802.1X` edge case, (c) the D-08 collision-disambiguation path against a synthetic 2-row collision, (d) the fail-closed exit path when 0 rows parse.

**D-05 slug algorithm — exact, do-not-paraphrase order (RESEARCH.md lines 394-401, independently re-verified against all 221 live titles, 0 collisions):**
```javascript
function slug(title) {
  let s = title.toLowerCase();               // 1. lowercase
  s = s.replace(/[\/\s]+/g, '-');             // 2. "/" and whitespace runs -> single "-"
  s = s.replace(/[^a-z0-9-]/g, '');           // 3. delete everything else (incl. ".", ":", "—", "(", ")")
  s = s.replace(/-+/g, '-').replace(/^-|-$/g, ''); // 4. collapse/trim "-"
  return s;                                   // 5. caller appends ".docx"
}
```

**Padded-label console output convention (lines 198-202, reused corpus-wide including guard-docx.mjs):**
```javascript
const LABEL_WIDTH = 72;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
```

---

### `scripts/pipeline/filename-map.md` (new committed artifact) — PIPE-04

**Analog:** `docs/_registry/RE-index.md` (table header, lines 15-16, and warning-banner convention, lines 1-13)

**Table shape to mirror:**
```markdown
| Doc ID | Path | Title | Doc Type | Status |
|--------|------|-------|----------|--------|
| RE-001 | docs/l1-runbooks/00-index.md | L1 Runbooks | Runbook | Approved |
```
`filename-map.md` should use the equivalent `| Doc ID | Path | Output Filename |` 3-column shape (per D-09's own naming), same leading/trailing pipe convention, same header+separator row pair. Consider prefixing with a `RE-index.md`-style warning banner (lines 1-7) noting it is a **generated** file — do not hand-edit, re-run `build-filename-map.mjs` instead.

---

### `scripts/pipeline/test-fixtures/draft-test-doc.md` (fixture, file-I/O) — PIPE-05

**Analog:** `docs/l1-runbooks/01-device-not-registered.md` (real shipped format — read in full, 20 lines) + `scripts/pipeline/test-fixtures/README.md` (superseded stub convention, lines 25-35, for contrast only — do not copy this shape)

**Target shape (shipped EEE format, confirmed by direct read of a real corpus file):**
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

This runbook covers ...
```
Key structural facts to replicate exactly (per `docs/_standards/EEE-SOP-standard.md` §Format specification, lines 80-107, and this real-file confirmation):
1. Header block sits **immediately after frontmatter close, before the H1** — NOT after the H1 (the fixture's current, wrong position).
2. Field order is **Platform, Doc Type, Doc ID, Status** — exactly four fields, in that order.
3. Separator is `·` (U+00B7 middle-dot) — NOT `.` (the fixture's current separator).
4. `## Summary` must be the first H2 immediately after the H1 — nothing (no blockquote, no other heading) between the block and `## Summary`.

**Current (wrong) fixture content, for the diff (read in full, 44 lines):**
```markdown
---
title: Draft Test Document — macOS Synthetic
last_verified: 2026-07-03
platform: macOS
status: draft
---

# Draft Test Document — macOS Synthetic

**Doc ID:** RE-T05 . **Platform:** macOS . **Doc Type:** Runbook . **Status:** Draft
```
Per D-14/RESEARCH.md Assumption A4: only the visible-block reformat + position fix + `status: draft` are locked-mandatory; expanding frontmatter to the full 9-key set is optional executor discretion, not required by D-14's literal text — the planner should decide this explicitly (do not leave it ambiguous mid-execution).

**`test-fixtures/README.md` note to add (recommended, not mandatory):** its "Stub EEE Header Format" section (lines 25-35) describes the format `draft-test-doc.md` is migrating AWAY from; add a one-line note that this one fixture now follows the shipped format instead (the other 5 fixtures in the directory are untouched and legitimately keep the old stub shape).

---

### `.planning/phases/124-.../PIPE-05-RUNBOOK.md` (new) — PIPE-05

**Analog:** `.planning/milestones/v1.15-phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-RUNBOOK.md` (172 lines, read in full)

**Structural sections to reuse (shape transfers; content narrows per D-15):**
- `## Section 1: Prerequisites` — owner-fill-in table (library URL, agent name/URL) exactly as PIPE-02-RUNBOOK.md lines 29-35:
```markdown
| Item | Value |
|------|-------|
| Test SharePoint document library URL | _(owner fills in — e.g., `https://contoso.sharepoint.com/sites/TestSite/Documents/Shared%20Documents`)_ |
| Copilot Studio agent name | _(owner fills in — e.g., `IT-KnowledgeBase-Test`)_ |
| Copilot Studio agent URL / chat entry point | _(owner fills in)_ |
```
- `## Section 2: Upload Procedure` — same shape as PIPE-02-RUNBOOK.md lines 74-97, but **ONE file** (`draft-test-doc.docx`) not five, and explicit repeat of the SC3 "test library ONLY, never production" warning (PIPE-02-RUNBOOK.md line 68 pattern: `**Critical:** Do NOT upload ... to the indexed production library`).
- `## Section 3: Query Sequence` — PIPE-02-RUNBOOK.md's table format (lines 107-114) narrowed to D-15's exactly **two** fixed queries (render + queryable), not six.
- `## Section 4/5: Completion condition` — PIPE-02-RUNBOOK.md's binary/checkbox-based closing pattern (lines 148-171) — mirror the git-commit-and-confirm-in-thread closing instruction verbatim (lines 162-171), adjusted for the D-16 checkpoint-hold discipline (do not auto-flip SC4).

---

### `.planning/phases/124-.../PIPE-05-FINDINGS.md` (new, blank template) — PIPE-05

**Analog:** `.planning/milestones/v1.15-phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md` (213 lines, read in full)

**Structural sections to reuse as a BLANK template (agent authors headers + checkbox scaffolding; owner fills values):**
- `## Run Metadata` table (PIPE-02-FINDINGS.md lines 9-19) — Date/Tester/library URL/agent name/pandoc version/transcript-path rows.
- `## SC4 Confirmations` checkbox pair (lines 25-34) — narrow to D-15's single render-query + queryable-query rubric (PASS = literal "Draft" appears, attributable to the visible body-text block).
- The `- [x]` / `- [ ]` binary-choice checkbox convention used throughout (e.g. lines 54-58, 60-61) — this IS the "binary rubric" shape D-15 calls for; do not invent a different evidence format.
- **D-16 fallback path** (not present in the v1.15 template, must be NEW prose in the 124 FINDINGS blank): an explicit stub section for "tenant unavailable — prepared; live confirmation deferred to deployment" per D-16, since the v1.15 probe did not need this escape hatch but 124 explicitly requires it.
- **D-18 FAIL-escalation clause** (also new): the blank template should include a visible reminder that a recorded surfacing FAIL does NOT auto-close SC4 — it escalates as a defect requiring triage before Phase 124 close.

---

## Shared Patterns

### Fail-closed abort (Node CLI scripts)
**Source:** `scripts/pipeline/retrofit-nav-hub.mjs` lines 878-881, 906-909, 916-920 (and `guard-docx.mjs`'s overall `process.exit(failed > 0 ? 1 : 0)` at line 314)
**Apply to:** `build-filename-map.mjs` (D-08 collision fail-closed exit), the D-03(b) PowerShell diff guard in `convert.ps1` (same spirit, `Write-Error` + `exit 1`)
```javascript
process.stderr.write('ERROR: <what went wrong>: ' + detail + '\n');
process.exit(1);
```
Never `throw` uncaught in this family; always write to stderr and call `process.exit(1)` (or PowerShell's `Write-Error` + `exit 1` equivalent).

### Zero-dependency Node built-ins only
**Source:** every `.mjs` file in `scripts/pipeline/` (`lib/ooxml.mjs` lines 1, 11-13; `guard-docx.mjs` line 18; `retrofit-nav-hub.mjs` line 51)
**Apply to:** `build-filename-map.mjs` and any new `lib/ooxml.mjs` export
```javascript
// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync } from 'node:fs';
```
No npm install is in scope anywhere in this phase (confirmed by RESEARCH.md's Package Legitimacy Audit — N/A, zero new dependencies).

### Registry-table parsing (pipe-delimited, header/separator/prose-excluding regex)
**Source:** `scripts/pipeline/retrofit-nav-hub.mjs` lines 268-283 (`buildDocIdMap`); RESEARCH.md Pattern 3 (5-column extension)
**Apply to:** `build-filename-map.mjs`'s registry reader
```javascript
.filter(l => /^\|\s*RE-\d+\s*\|/.test(l))   // excludes header/separator/"## Review Notes" prose
```
This single-line filter is the load-bearing idiom that keeps the parser from mis-reading `RE-index.md`'s non-table prose sections (confirmed: 221 rows in, 221 rows out).

### Padded-label console output
**Source:** `scripts/pipeline/guard-docx.mjs` lines 145-149; `scripts/pipeline/retrofit-nav-hub.mjs` lines 198-202
**Apply to:** `build-filename-map.mjs`'s run summary and any new self-test output
```javascript
const LABEL_WIDTH = 60; // or 72, per file — pick whichever matches the longest expected label
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
```

### Self-test harness (`--self-test` flag + `stAssert` helper)
**Source:** `scripts/pipeline/guard-docx.mjs` lines 158-282; `scripts/pipeline/retrofit-nav-hub.mjs` lines 578-871
**Apply to:** `build-filename-map.mjs`
```javascript
function stAssert(label, pass, detail) {
  const tag = pass ? 'PASS' : 'FAIL';
  process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
  if (pass) stPassed++; else stFailed++;
}
// ... assertions ...
process.exit(stFailed > 0 ? 1 : 0);
```

### Fork-don't-refactor (do NOT apply here — noted as a negative pattern)
**Source:** `scripts/pipeline/retrofit-nav-hub.mjs` header comment (lines 2-8) — every `retrofit-*.mjs` is a fork of its predecessor, never an in-place edit of a shipped Approved deliverable.
**Does NOT apply to this phase's modify-targets** (`convert.ps1`, `guard-docx.mjs`, `lib/ooxml.mjs`) — CONTEXT.md/RESEARCH.md both treat these as live, additively-extensible pipeline surfaces (not frozen v1.15 content docs), and D-01/D-04 explicitly direct in-place additive edits to them. Do not fork `convert.ps1` into `convert-v2.ps1`; do not fork `guard-docx.mjs`. The fork-don't-refactor discipline is for `docs/` content classes and the `retrofit-*.mjs` transformer family only, not for the pipeline's own tooling.

### Owner-checkpoint hold (Jira/process discipline, not code)
**Source:** `.planning/milestones/v1.15-phases/113-.../PIPE-02-RUNBOOK.md` closing instructions (lines 148-171) + CLAUDE.md memory note `reference_jira_hook_vs_verification_race`
**Apply to:** 124-03 (PIPE-05 plan) — hold the active Jira Story In Progress across the checkpoint; do not let the Stop-hook flip it Done mid-probe; the agent halts after authoring RUNBOOK/FINDINGS-blank/fixture and never auto-flips the SC4 checkbox.

---

## No Analog Found

None. Every file in this phase's scope has a strong, explicit same-repo or same-milestone-family analog (see table above). The two prose-only edits (`REQUIREMENTS.md:35`, `ROADMAP.md` SC4) need no analog — they are direct text corrections per D-17/D-18 with the exact replacement wording already specified in CONTEXT.md.

## Metadata

**Analog search scope:** `scripts/pipeline/**` (all files), `docs/_registry/RE-index.md`, `docs/l1-runbooks/01-device-not-registered.md`, `docs/_standards/EEE-SOP-standard.md` (format spec section), `.planning/milestones/v1.15-phases/113-.../PIPE-02-{RUNBOOK,FINDINGS}.md`
**Files scanned:** `convert.ps1`, `guard-docx.mjs`, `lib/ooxml.mjs`, `README.md` (pipeline), `test-fixtures/README.md`, `test-fixtures/draft-test-doc.md`, `retrofit-nav-hub.mjs` (representative of the `retrofit-*.mjs` family — `retrofit-runbook.mjs`, `retrofit-guide.mjs`, `retrofit-reference.mjs`, `retrofit-structural.mjs`, `retrofit-mermaid-structural.mjs` exist but were not individually re-read; `retrofit-nav-hub.mjs`'s header comment confirms it is itself a fork of `retrofit-mermaid-structural.mjs`, so all six share the same conventions extracted above), `docs/_registry/RE-index.md` (header + 9 sample rows), v1.15 `PIPE-02-RUNBOOK.md` + `PIPE-02-FINDINGS.md` (both read in full)
**Pattern extraction date:** 2026-07-08
