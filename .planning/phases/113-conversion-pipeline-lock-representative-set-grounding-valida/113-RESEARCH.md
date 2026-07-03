# Phase 113: Conversion Pipeline Lock + Representative-Set Grounding Validation — Research

**Researched:** 2026-07-03
**Domain:** Pandoc MD→.docx pipeline, Node.js OOXML introspection, Copilot Studio grounding validation
**Confidence:** HIGH (pandoc invocation + styleIds + YAML handling); MEDIUM (custom-property promotion behavior, chunk details); LOW (exact Copilot Studio citation-title precedence)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 (PIPE-02 run model):** Agent automates the convert + guard legs only. Live Copilot Studio queries are OWNER-RUN at a documented checkpoint; the agent authors the step-by-step procedure + results-recording template. The agent has no live Copilot Studio / SharePoint access (REQUIREMENTS L77).

**D-02 (Deployment target):** SharePoint document library + .docx — OWNER-CONFIRMED 2026-07-03. Pandoc pipeline is mandatory. Dataverse .md upload is rejected (it would leave raw YAML `---` unguarded across all 150 docs, re-introducing P-08).

**D-03 (reference.docx origin):** Script-generated from the pinned pandoc default (`pandoc --print-default-data-file reference.docx`). No Word GUI. Commit the generated binary. Correctness is proven by the D-04 guard asserting Heading styleIds on converted output.

**D-04 (Post-conversion guard depth + wiring):** Guard performs BOTH (a) no `---` YAML in first ~500 chars of .docx body text AND (b) Heading 1/2/3 styleIds present. Standalone script (`scripts/pipeline/guard-docx.mjs`), NOT wired into `scripts/validation/` chain during Phase 113.

**D-05 (Shared OOXML helper):** C3 and D2 use the same code path — open .docx zip → read `word/document.xml` → body-text leak check + pStyle styleId check. Build once, use in both reference.docx verification (generation-time sanity) and the guard. No external `unzip` binary (absent on Windows).

**D-06 (Single owner touchpoint):** Deployment mode now confirmed (B3). Only remaining owner touchpoint is the A1 live-grounding checkpoint.

**D-07 (Phase-119 fold-in):** The D-04 standalone guard is the seed for `check-phase-113.mjs`, authored at Phase 119 (HARN-03 Atom 2). Keep it standalone now; hand off a needle-spec only.

### Claude's Discretion
- **Pandoc version pin:** Pick and document a specific version. Pandoc is NOT on PATH.
- **Representative-set selection (3–5 docs):** Must span multiple `platform:` variants; include ≥1 capability-matrix table (P-02); include ≥1 `Status: Draft` doc. Research identifies candidates below.
- **Empirical findings artifact:** Record resolved open questions in this phase directory for Phase-114 handoff; exact filename Claude's discretion.

### Deferred Ideas (OUT OF SCOPE)
- v1.16 file-rename pass (if citation title is filename-driven)
- SharePoint content-approval setup (if Status: Draft must gate retrieval)
- Azure AI Search structured index upgrade
- EEE standard authoring (Phase 114), C17 validator (Phase 115), corpus retrofit (Phases 116-118)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PIPE-01 | Pandoc version pinned + `--reference-doc` Word template + documented invocation + post-conversion guard that fails on YAML leak in first ~500 chars of .docx body | §Pandoc Install, §Reference.docx, §Guard Script Contract |
| PIPE-02 | Grounding-validation procedure on representative 3–5-doc set (convert → upload → live Copilot Studio queries); resolves empirical open questions (citation-title source; Status:Draft gate vs label; chunk boundaries) before full retrofit | §Representative Set, §Owner-Run PIPE-02 Procedure |
</phase_requirements>

---

## Summary

Phase 113 is a pipeline-lock-and-prove phase: it defines, verifies, and empirically grounds the MD→.docx conversion pipeline on a small representative set before any corpus file is touched. Three things must be true before Phase 113 closes: (1) a specific pandoc version is pinned, a reference.docx is generated and committed, and the canonical invocation is documented; (2) a Node-side OOXML guard script passes a clean fixture and FAILS a deliberately-leaked fixture; and (3) an owner-run grounding session against the test SharePoint library records answers to the four empirical open questions that gate Phase 114 standard authoring.

The dominant implementation risk in this phase is the "raw-byte scan false-green trap" (flagged in the adversarial review, captured in D-04): a naive check for `---` in the first 500 raw bytes of a `.docx` file will **always pass** even on a leaked document, because `.docx` content is DEFLATE-compressed inside the ZIP container. The guard must extract `word/document.xml`, decompress it, strip XML tags, and THEN scan the text. This is the single most load-bearing implementation constraint in the phase.

The second key insight is that pandoc's `--standalone` mode (auto-applied for docx output) causes YAML frontmatter to become Word document properties, not body text — but ONLY for standard keys (`title`, `author`, `date`). Non-standard keys (`doc_id`, `status`, `doc_type`, `owner`) become Word custom properties. The guard's YAML-leak check catches any broken pipeline configuration that emits raw `---` block text into the doc body, regardless of which frontmatter keys are present.

**Primary recommendation:** Install pandoc 3.7.0.2 (pinned MSI); generate `reference.docx` via `pandoc --print-default-data-file`; use the zero-dependency Node.js ZIP parser for the OOXML guard; build a 5-doc representative set spanning Windows / macOS / Android / compound multi-platform / Status:Draft synthetic; author the owner-run PIPE-02 runbook as a step-by-step Markdown doc with a FINDINGS recording template.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| MD→.docx conversion | `scripts/pipeline/` (build script) | — | Pandoc is a build-time transform, not a runtime service |
| Reference.docx template | `scripts/pipeline/reference.docx` (committed binary) | — | Committed asset; version-locked with pandoc pin |
| Post-conversion OOXML guard | `scripts/pipeline/guard-docx.mjs` (Node ESM script) | Phase-119 fold → `scripts/validation/check-phase-113.mjs` | Standalone now; seeds the chain validator at Phase 119 |
| Shared OOXML introspection helper | `scripts/pipeline/lib/ooxml.mjs` (imported by guard + generation-time sanity) | — | D-05: built once, used in both the generate step and the guard |
| Pipeline policy documentation | `scripts/pipeline/README.md` | — | Operator-facing; NOT in the grounded SharePoint library |
| Grounding-validation runbook (owner-run) | `.planning/phases/113-.../PIPE-02-RUNBOOK.md` | — | Planning artifact, not a corpus doc |
| Empirical findings record | `.planning/phases/113-.../PIPE-02-FINDINGS.md` | — | Phase-114 handoff artifact |
| Deployment policy (SC3) | `scripts/pipeline/README.md` | — | Documents "only .docx in indexed library; Draft excluded from production path" |

---

## Standard Stack

### Core

| Component | Version | Purpose | Why Standard |
|-----------|---------|---------|--------------|
| Pandoc | 3.7.0.2 (PINNED) | MD→.docx conversion with `--reference-doc` | Only reliable headless tool that promotes YAML to Word properties and preserves Heading styles [CITED: pandoc.org/MANUAL.html] |
| Node.js (built-in: `node:fs`, `node:zlib`, `node:path`) | v24.17.0 (current on machine) | OOXML guard — ZIP parsing + DEFLATE decompression | Zero external dependency; matches existing `scripts/validation/` no-dep convention [VERIFIED: Bash] |

### Supporting

| Component | Version | Purpose | When to Use |
|-----------|---------|---------|-------------|
| pandoc `--print-default-data-file reference.docx` | (same as pandoc pin) | Emit the pinned pandoc default reference.docx | One-time generation at pipeline setup |
| `git` binary (already present) | existing | Track reference.docx as a committed binary | Committed once; never regenerated unless pandoc version is bumped |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Built-in Node.js ZIP parsing | `adm-zip` (npm, [OK] slopcheck, 13 years old) | adm-zip is simpler to write but adds an npm dependency; since the guard is seeded for Phase-119 fold into `scripts/validation/` (zero-dep convention), starting with built-ins avoids a migration step at Phase 119 |
| Built-in Node.js ZIP parsing | `fflate` (npm, [OK] slopcheck, 2020+) | fflate is modern/fast but same migration concern |
| Standalone guard script | Wired into validation chain now (D3, REJECTED) | Injecting pandoc/.docx byte-variance into the EXACT-MATCH text-lint chain risks HARN-04 close-gate; validator-atom deferral discipline requires Phase-119 authoring |

**Installation (pandoc):**
```powershell
# Download pinned MSI (one-time; admin PowerShell)
$version = "3.7.0.2"
$url = "https://github.com/jgm/pandoc/releases/download/$version/pandoc-$version-windows-x86_64.msi"
$dest = "$env:TEMP\pandoc-$version-windows-x86_64.msi"
Invoke-WebRequest -Uri $url -OutFile $dest
Start-Process msiexec.exe -Wait -ArgumentList "/i `"$dest`" /quiet"
# Verify
pandoc --version
```

---

## Package Legitimacy Audit

> This phase installs NO npm packages at the root level. The guard script uses Node built-ins only. The pandoc binary is obtained from the official GitHub release (jgm/pandoc, John MacFarlane), not from npm.

| Package | Registry | Age | Status | slopcheck | Disposition |
|---------|----------|-----|--------|-----------|-------------|
| pandoc 3.7.0.2 (MSI, not npm) | github.com/jgm/pandoc | 11+ years | Active | N/A (binary release, not npm) | Approved — official release from primary author |

**Packages removed due to slopcheck [SLOP] verdict:** none  
**Packages flagged as suspicious [SUS]:** none  
**npm packages introduced:** none (guard uses `node:zlib` + `node:fs` built-ins only)

---

## Architecture Patterns

### System Architecture Diagram

```
[.md source file]
       |
       | pandoc 3.7.0.2 (pinned)
       | --reference-doc=scripts/pipeline/reference.docx
       v
[output.docx]  ------>  guard-docx.mjs
                             |
                    [open ZIP → word/document.xml]
                             |
                    [inflate DEFLATE stream]
                             |
                    [extract <w:body> text]
                             |
               .--------------.
               |              |
       [YAML leak check]  [pStyle check]
       first ~500 chars    Heading1/2/3
       "---" absent?       present?
               |              |
               '------+-------'
                       |
                  EXIT 0 / 1
                       |
               (if 0) [upload .docx to test SharePoint library]
                       |
               [Copilot Studio queries — OWNER RUN]
                       |
               [PIPE-02-FINDINGS.md recorded]
```

### Recommended Project Structure (new files this phase)

```
scripts/pipeline/
├── README.md              # Pipeline policy doc (SC3: deployment policy)
├── reference.docx         # Generated from pinned pandoc default; committed binary
├── lib/
│   └── ooxml.mjs          # Shared OOXML helper (D-05): unzip .docx → read word/document.xml
├── guard-docx.mjs         # Post-conversion guard (PIPE-01 SC2): YAML-leak + pStyle checks
├── convert.ps1            # Wrapper script for canonical pandoc invocation
└── test-fixtures/
    ├── clean-test-doc.md  # Representative test fixture (should PASS guard)
    └── draft-test-doc.md  # Status: Draft synthetic doc (Draft-retrieval open question)

.planning/phases/113-.../
└── PIPE-02-RUNBOOK.md     # Owner-run grounding-validation procedure (agent-authored)
└── PIPE-02-FINDINGS.md    # Owner fills in during checkpoint (agent provides template)
```

### Pattern 1: Canonical Pandoc Invocation (PIPE-01)

**What:** Convert a single .md file to .docx with the pinned reference template.
**When to use:** Converting any Phase-1 doc for SharePoint upload.

```powershell
# Source: pandoc.org/MANUAL.html#option--reference-doc
pandoc docs/l1-runbooks/01-device-not-registered.md `
  -o output/01-device-not-registered.docx `
  --reference-doc=scripts/pipeline/reference.docx
```

Key facts about this invocation [CITED: pandoc.org/MANUAL.html]:
- `--standalone` is auto-applied for docx output — no explicit flag needed.
- `--from markdown` is auto-detected from the `.md` extension — no explicit flag needed.
- The `yaml_metadata_block` extension is on by default in pandoc Markdown — YAML is processed as metadata, not body content.
- YAML standard keys (`title`, `author`, `date`) → Word built-in document properties.
- YAML non-standard keys (`doc_id`, `status`, `owner`, `doc_type`) → Word **custom** document properties. [MEDIUM confidence — version-specific; tracked Pandoc issue #3034; empirical verification needed with pinned 3.7.0.2 per SUMMARY.md L220 — add to owner-run test sequence]
- The `---` YAML delimiters do NOT appear in the .docx body when standalone mode is active. [CITED: pandoc.org/MANUAL.html#metadata-blocks]

### Pattern 2: Generate reference.docx from Pinned Default (D-03)

**What:** Extract the built-in pandoc default reference.docx and commit it.

```powershell
# Source: pandoc.org/MANUAL.html#option--reference-doc
pandoc -o scripts/pipeline/reference.docx --print-default-data-file reference.docx
```

The generated reference.docx contains Heading styles with these exact OOXML styleIds [VERIFIED: github.com/jgm/pandoc/blob/main/data/docx/word/styles.xml]:
- `w:styleId="Heading1"` (`w:name w:val="heading 1"`)
- `w:styleId="Heading2"` (`w:name w:val="heading 2"`)
- `w:styleId="Heading3"` (`w:name w:val="heading 3"`)

These styleIds are locale-independent (display names change per locale; styleIds do not). With pandoc pinned, these are deterministic.

**Committing the binary:** Add to `.gitattributes`:
```
scripts/pipeline/reference.docx binary
```
Then `git add scripts/pipeline/reference.docx`. The binary is ~30–50 KB; acceptable to commit.

**Generation-time sanity check:** After generating, the OOXML helper should verify that `Heading1`, `Heading2`, `Heading3` are present in `word/styles.xml` within the generated file. If the check fails, the generation is broken.

### Pattern 3: Zero-Dependency Node.js OOXML Introspection Helper

**What:** Open a .docx (ZIP), extract `word/document.xml`, decompress, provide body text and XML for checking.
**CRITICAL:** Raw .docx bytes are DEFLATE-compressed. You CANNOT scan raw bytes for `---` — it will always miss. You MUST decompress first.

```javascript
// Source: PKZIP specification (ZIP local file header format); Node.js docs for zlib
// scripts/pipeline/lib/ooxml.mjs
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

/**
 * Extract a named entry from a .docx ZIP archive.
 * Uses ZIP local file header sequential walk — no external binary, no npm packages.
 *
 * @param {string} docxPath - absolute or repo-relative path to .docx file
 * @param {string} entryName - e.g. 'word/document.xml' or 'word/styles.xml'
 * @returns {string} decompressed UTF-8 content of the entry
 * @throws if entry not found or decompression fails
 */
export function extractEntry(docxPath, entryName) {
  const buf = readFileSync(docxPath);
  let offset = 0;

  while (offset + 30 <= buf.length) {
    // PKZIP local file header signature: PK\x03\x04
    if (buf[offset] !== 0x50 || buf[offset+1] !== 0x4B ||
        buf[offset+2] !== 0x03 || buf[offset+3] !== 0x04) {
      break; // not a local file header — end of entries (or data descriptor / CD)
    }
    const compressionMethod = buf.readUInt16LE(offset + 8);
    const compressedSize   = buf.readUInt32LE(offset + 18);
    const fileNameLength   = buf.readUInt16LE(offset + 26);
    const extraFieldLength = buf.readUInt16LE(offset + 28);
    const fileName = buf.subarray(offset + 30, offset + 30 + fileNameLength).toString('utf8');
    const dataStart = offset + 30 + fileNameLength + extraFieldLength;

    if (fileName === entryName) {
      const compressed = buf.subarray(dataStart, dataStart + compressedSize);
      if (compressionMethod === 0) {
        // Method 0: Stored (no compression)
        return compressed.toString('utf8');
      }
      if (compressionMethod === 8) {
        // Method 8: DEFLATE — inflateRawSync strips the ZLIB wrapper
        return inflateRawSync(compressed).toString('utf8');
      }
      throw new Error(`Unsupported compression method ${compressionMethod} for ${entryName}`);
    }

    offset = dataStart + compressedSize;
  }
  throw new Error(`Entry '${entryName}' not found in ${docxPath}`);
}

/**
 * Extract visible body text from word/document.xml.
 * Returns text of <w:body> with XML tags stripped.
 */
export function extractBodyText(docxPath) {
  const xml = extractEntry(docxPath, 'word/document.xml');
  // Isolate the body (excludes headers, footers, doc properties)
  const bodyMatch = xml.match(/<w:body>([\s\S]*?)<\/w:body>/);
  if (!bodyMatch) throw new Error('No <w:body> found in word/document.xml');
  // Strip XML tags; collapse whitespace
  return bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Check whether Heading 1/2/3 styleIds appear in the document body.
 * Returns array of found styleIds (subset of ['Heading1','Heading2','Heading3']).
 */
export function findHeadingStyleIds(docxPath) {
  const xml = extractEntry(docxPath, 'word/document.xml');
  const found = [];
  for (const id of ['Heading1', 'Heading2', 'Heading3']) {
    if (xml.includes(`w:val="${id}"`)) found.push(id);
  }
  return found;
}
```

**The critical trap (from D-04 adversarial review):** If you call `buf.toString('utf8')` on the raw .docx buffer and search for `---`, you will ALWAYS miss a YAML leak because the bytes are DEFLATE-compressed. The guard MUST call `extractBodyText()` first.

### Pattern 4: Guard Script Contract (SC2)

```javascript
// scripts/pipeline/guard-docx.mjs
// Usage:  node scripts/pipeline/guard-docx.mjs <path/to/output.docx>
//         node scripts/pipeline/guard-docx.mjs --self-test
// Exit 0: both checks pass (clean conversion)
// Exit 1: any check fails (YAML leak or heading-style loss)
//
// D-07: This script is the Phase-119 seed for check-phase-113.mjs (HARN-03 Atom 2).
// Keep it standalone now; the chain-fold is Phase 119's job.
```

**Checks performed:**
1. **YAML-leak check:** `bodyText.slice(0, 500)` must NOT contain `---` as a standalone line or prefix. If found → print `FAIL: YAML delimiter "---" found in first ~500 chars of .docx body text` and exit 1.
2. **Heading-style check:** `findHeadingStyleIds()` must return at least `['Heading1']` (if the source .md has `# headings`). If empty → print `FAIL: No Heading styleIds found in .docx — headings converted as Normal paragraphs` and exit 1.

**Self-test mode (`--self-test`):**
- Creates a temp directory
- Writes a **clean** test .md (valid frontmatter, headings), converts to .docx with pandoc, asserts guard passes (exit 0) — any failure here means pandoc is broken
- Writes a **leaked** test .md (deliberately places `---` text as first body paragraph — simulating a broken pipeline), converts to .docx, asserts guard fails (exit 1) — if the guard passes here, the guard itself is broken
- Cleans up temp files
- Exit 0 only if BOTH sub-tests pass

**Important self-test design note:** The "leaked" fixture should NOT put `---` in the YAML frontmatter; it should put the literal string `---` as the first body paragraph of the .md file, simulating a broken conversion that left the YAML block exposed. Alternatively: write a .md with NO frontmatter markers but with `---\ndoc_id: RE-T99\n---` as the first three lines of body content.

**Mirror of existing conventions:**
- File starts with `#!/usr/bin/env node`; imports from `node:*` only (or internal `./lib/ooxml.mjs`)
- CRLF→LF normalization (apply to any text read)
- Print to `process.stdout` (not `console.log`) — consistent with check-phase-*.mjs
- Exit codes: 0 (all pass), 1 (any fail)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| MD→.docx conversion | Custom HTML-to-OOXML converter | pandoc | OOXML is 4,000-page spec; pandoc handles YAML promotion, Heading styles, and all OOXML details correctly |
| ZIP file parsing | Manual byte-scanning for `---` in raw .docx | `extractBodyText()` via `node:zlib.inflateRawSync` | Raw bytes are DEFLATE-compressed; plain byte scan always returns false-green on leaked docs |
| Heading style verification | Checking output .md for `#` characters | `findHeadingStyleIds()` scanning `word/document.xml` | Presence of `#` in source does not guarantee Heading styles in output without `--reference-doc` |
| SharePoint upload | Custom Graph API upload script | Manual owner step (A1) | Agent has no SharePoint/Graph credentials; REQUIREMENTS L77 explicitly excludes this |

**Key insight:** The YAML-leak and heading-loss checks require inspecting the .docx file structure directly — the only source of truth is what pandoc actually produced, not what the source .md contained.

---

## Representative-Set Selection

### Candidate Files (5 docs)

| # | File | Platform Value | Why Included | Unique Test Coverage |
|---|------|---------------|-------------|---------------------|
| 1 | `docs/l1-runbooks/01-device-not-registered.md` | `Windows` | L1 runbook; short; good baseline | Basic conversion; Windows single-platform label |
| 2 | `docs/l2-runbooks/27-macos-sso-investigation.md` | `macOS` | L2 runbook; SSO depth | macOS CamelCase platform label |
| 3 | `docs/reference/android-capability-matrix.md` | `Android` | 156-line file; multi-section table | P-02 chunk-fragmentation: >25-row capability matrix |
| 4 | `docs/l1-runbooks/38-8021x-certificate-failure.md` | `windows+macos+ios+android+linux` | L1 runbook; compound platform value | Multi-platform compound label normalization |
| 5 | `scripts/pipeline/test-fixtures/draft-test-doc.md` | `macOS` (synthetic) | Synthetic doc; `status: Draft` | Status: Draft retrieval open question (SUMMARY L221) |

**Platform coverage from this set:** `Windows`, `macOS`, `Android`, `windows+macos+ios+android+linux` (compound), plus synthetic. Spans 4 of the 20 distinct platform values in the corpus, including the compound multi-platform variant that will be the hardest normalization case.

### Platform Values Present in Corpus (for D1 map scope — Phase 114)

The following 20 distinct `platform:` values were found by grepping `docs/**/*.md` [VERIFIED: grep]:

**Single-platform (capitalized):** `Windows`, `macOS`, `iOS`, `Android`, `Linux`
**Single-platform (lowercase — admin-setup-8021x only):** `windows`, `macos`, `ios`, `android`, `linux`
**Compound (+ separator):** `ios+macos`, `ios+macos+shared-ipad`, `ios+ipados+macos`, `ios+ipados+macos+tvos`, `ios+ipados+macos+tvos`, `ios+shared-ipad`, `windows+macos+ios+android+linux`
**Comma separator (one file):** `iOS,Android` (operations/drift-migration/03-ios-android-drift-detection.md)
**Special device:** `apple-tv`
**Meta-values:** `all`, `cross-platform`

D1 normalization map must cover all 20. The `iOS,Android` comma-separator variant is a specific edge case to document in Phase 114.

### Stub EEE Header Block for Test Set

Phase 114 authors the EEE standard; Phase 113 needs only a MINIMAL stub header block in the test docs to exercise the body-text grounding check (SC4). The plan must add a one-line stub to each candidate:

```markdown
**Doc ID:** RE-T01 . **Platform:** Windows . **Doc Type:** Runbook . **Status:** Approved
```

This stub is TEMPORARY — it lives only in the `scripts/pipeline/test-fixtures/` copies, NOT in the canonical `docs/` files (which are not modified in Phase 113). The canonical retrofit is Phase 116-118.

For doc #5 (draft test), the stub is:
```markdown
**Doc ID:** RE-T05 . **Platform:** macOS . **Doc Type:** Runbook . **Status:** Draft
```
And `status: draft` in frontmatter.

---

## Common Pitfalls

### Pitfall 1: Raw-Byte YAML-Leak Scan (THE CRITICAL TRAP)

**What goes wrong:** Guard scans raw .docx bytes for `---` and finds nothing, declaring clean. The file actually has a YAML leak but it's compressed.
**Why it happens:** `.docx` is a ZIP archive; all file entries are DEFLATE-compressed. The string `---` compressed with DEFLATE produces completely different bytes.
**How to avoid:** The guard MUST call `extractEntry(docxPath, 'word/document.xml')` → `inflateRawSync()` → strip XML → THEN scan for `---`. Never scan raw file bytes.
**Warning signs:** The self-test's "leaked" fixture passes the guard (exit 0 when it should be exit 1).

[CITED: 113-CONTEXT.md D-04; PKZIP specification; Node.js zlib docs]

### Pitfall 2: Heading Styles Lost Without `--reference-doc`

**What goes wrong:** Pandoc converts `# Heading` to a bold Normal paragraph instead of Word Heading 1. Indexer sees a flat wall of text.
**Why it happens:** Without a reference.docx that defines Word Heading styles, pandoc uses built-in defaults which may not produce proper heading paragraph styles.
**How to avoid:** Always include `--reference-doc=scripts/pipeline/reference.docx` in the canonical invocation. Guard's pStyle check confirms the styles survived.
**Warning signs:** `findHeadingStyleIds(output.docx)` returns an empty array.

[CITED: SUMMARY.md P-09; pandoc.org/MANUAL.html#option--reference-doc]

### Pitfall 3: Mistaking `--standalone` as Optional for docx

**What goes wrong:** Operator adds `--no-standalone` flag thinking it's safe to skip; YAML block leaks as body text.
**Why it happens:** `--standalone` is what causes pandoc to process YAML as metadata; without it the metadata block may pass through as raw text.
**How to avoid:** Never use `--no-standalone` for docx output. The canonical invocation does not include any standalone override.
**Warning signs:** Guard detects `---` in the first 500 chars of body text.

[CITED: pandoc.org/MANUAL.html — "set automatically for docx"]

### Pitfall 4: reference.docx Regenerated with a Different Pandoc Version

**What goes wrong:** Someone runs `pandoc --print-default-data-file reference.docx` with a newer pandoc version, overwrites the committed template, and the styleIds change.
**Why it happens:** Pandoc's default reference.docx evolves across versions; internal styleIds are stable within a version but may differ across major versions.
**How to avoid:** Reference.docx is committed as a binary alongside the PIPELINE-VERSION.md that records the pandoc pin. Only regenerate when intentionally bumping the pandoc version.
**Warning signs:** `findHeadingStyleIds(reference.docx)` stops returning `Heading1`/`Heading2`/`Heading3` (would indicate a renamed style).

### Pitfall 5: ZIP Data Descriptor Records (local-header size = 0)

**What goes wrong:** Sequential local-header walk stops at an entry where `compressedSize = 0` in the local header (data descriptor record, bit 3 of general purpose flag set).
**Why it happens:** Some ZIP writers defer writing compressed/uncompressed sizes until AFTER the compressed data (using a data descriptor record `PK\x07\x08`). The local header then has zeros for sizes.
**How to avoid:** Pandoc-generated .docx files do not use data descriptor records (bit 3 is 0). For extra safety, add a size sanity check: if `compressedSize === 0` and `compressionMethod === 8`, skip the entry with a warning rather than crashing.
**Warning signs:** `extractEntry` throws "Entry not found" on a file you expect to exist.

---

## Code Examples

### Canonical Conversion Command

```powershell
# Source: pandoc.org/MANUAL.html#option--reference-doc [CITED]
# Run from repo root; output goes to a working dir (not committed in Phase 113)
pandoc docs/l1-runbooks/01-device-not-registered.md `
  -o .pipeline-output/01-device-not-registered.docx `
  --reference-doc=scripts/pipeline/reference.docx
```

### Generate reference.docx from Pinned Pandoc Default

```powershell
# Source: pandoc.org/MANUAL.html#option--reference-doc [CITED]
# Run ONCE after installing the pinned pandoc version
pandoc -o scripts/pipeline/reference.docx --print-default-data-file reference.docx
```

### Guard Script Invocation Pattern

```bash
# Run guard on a specific .docx
node scripts/pipeline/guard-docx.mjs .pipeline-output/01-device-not-registered.docx

# Run guard self-test (SC2 — "fails on leaked fixture, passes on clean")
node scripts/pipeline/guard-docx.mjs --self-test
```

### Pandoc Version Check (embed in pipeline scripts)

```powershell
# Verify pinned version is active
$ver = (pandoc --version | Select-String '^pandoc (\S+)').Matches[0].Groups[1].Value
if ($ver -ne '3.7.0.2') { Write-Error "Expected pandoc 3.7.0.2, got $ver"; exit 1 }
```

---

## Owner-Run PIPE-02 Procedure

The agent authors `PIPE-02-RUNBOOK.md` in the phase directory as a step-by-step owner-facing procedure. The planner must include a task to author this document. The runbook must contain:

### Required Sections in PIPE-02-RUNBOOK.md

**1. Pre-requisites**
- URL of the test SharePoint document library (owner fills in)
- Copilot Studio agent name/URL connected to that library (owner fills in)
- The 5 .docx files converted and guard-passed (agent confirms before handoff)

**2. Upload Procedure**
- Copy all 5 .docx files to the test SharePoint library via SharePoint UI
- Verify files appear in the library (check for indexing errors)
- Wait 15–30 minutes for Copilot Studio connector to sync

**3. Query Sequence (run in Copilot Studio chat)**

| Query # | Exact Query Text | Records |
|---------|-----------------|---------|
| Q1 | `Tell me about Windows Autopilot device registration troubleshooting` | Citation title format (filename vs H1?); retrieval confirmed? |
| Q2 | `What does document RE-T01 cover?` | Doc-ID retrieval by body-text stub ID; does Copilot find RE-T01? |
| Q3 | `Show me information about 802.1X certificate failures on Windows and macOS` | Multi-platform body-text retrieval; compound platform label indexed |
| Q4 | `What are the Android Enterprise enrollment modes and their capabilities?` | Table chunk retrieval (P-02): does the response include capability table rows? Does it include the table header context? |
| Q5 | `Tell me about the draft SSO guide` | Draft retrieval open question: is the Status: Draft doc retrieved? If yes, is draft status visible in the response? |
| Q6 (optional) | `What are the BYOD Work Profile provisioning methods for Android?` | Ask narrow question about content near a chunk boundary to probe chunk behavior |

**4. Recording Template (fills PIPE-02-FINDINGS.md)**

Owner pastes observations into `PIPE-02-FINDINGS.md` using this structure:

```markdown
# PIPE-02 Empirical Findings

**Date of test:** YYYY-MM-DD
**Tester:** [name]
**Test SharePoint library URL:** [URL]
**Copilot Studio agent:** [name/URL]

## Open Questions Resolved

### OQ1: Citation Title Source (SUMMARY L216-217)
**Q1 citation title displayed:** [paste exact citation panel text]
**Observation:** [ ] Filename | [ ] SharePoint Title column | [ ] Word title property | [ ] H1 content
**v1.16 file-rename candidate:** [ ] Yes — filenames are poor citation labels | [ ] No — current filenames are acceptable

### OQ2: Status:Draft Retrieval Gate vs Label (SUMMARY L221)
**Q5 result:** [ ] Draft doc NOT retrieved (= retrieval gate) | [ ] Draft doc retrieved, draft label visible | [ ] Draft doc retrieved, no draft label visible
**Owner decision for Phase 114:** [ ] Status:Draft = LABEL only (no SharePoint content-approval needed) | [ ] Status:Draft MUST gate retrieval (enable SharePoint content-approval)

### OQ3: Chunk Boundary Behavior (SUMMARY L222)
**Q4 result:** [describe what content was retrieved from the capability matrix — header row + data rows together? data rows without column labels?]
**Q6 result (optional):** [describe chunk boundary evidence from narrow query]
**Observation:** [ ] Table header + data rows retrieved together | [ ] Data rows retrieved without column labels (P-02 chunk split confirmed)

### OQ4: Custom YAML Key Promotion (SUMMARY L220)
**Verification:** Open .docx file in Word → File > Properties > Custom. Are these keys visible?
- doc_id → Custom property: [ ] Yes: [value] | [ ] No
- status → Custom property: [ ] Yes: [value] | [ ] No
- owner → Custom property: [ ] Yes: [value] | [ ] No
- doc_type → Custom property: [ ] Yes: [value] | [ ] No
**Pandoc version tested:** 3.7.0.2

## Additional Observations
[Free text]
```

**5. Phase Completion Condition**
The owner pastes findings back into the project thread. Phase 113 closes when PIPE-02-FINDINGS.md is committed with all four open questions answered.

---

## Deployment Policy Documentation (SC3)

`scripts/pipeline/README.md` must document:

1. **Only .docx files in the indexed SharePoint library.** `.md` files are not indexed by the SharePoint knowledge-source connector (SUMMARY.md L31 — "explicitly unsupported"). `.md` source files live in `docs/`; compiled `.docx` files are what gets uploaded.

2. **Status: Draft docs are excluded from the production library path.** Documents with `status: draft` in their frontmatter must not be uploaded to the indexed library until promoted to `Approved`. The `Status: Draft` body-text label is invisible to Copilot Studio citation UI — the agent retrieves and cites Draft docs as if they were authoritative (SUMMARY.md §Critical Pitfalls P-06).

3. **Pandoc version pin:** `3.7.0.2` — documented in README.md alongside the download URL and the install command. Any version bump requires regenerating `reference.docx` and re-running the guard self-test.

4. **Canonical invocation:** `pandoc <input.md> -o <output.docx> --reference-doc=scripts/pipeline/reference.docx` — no other flags.

5. **Doc ID Registry exclusion:** `docs/_registry/RE-index.md` must NOT be in the indexed library (if included, doc-specific queries return the registry row instead of document content — SUMMARY.md §Architecture).

---

## Runtime State Inventory

> Included because Phase 113 introduces new scripted pipeline infrastructure and a committed binary. No existing corpus renames.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | No Mem0/ChromaDB/database usage in this phase | None |
| Live service config | SharePoint test library — created by owner, URL recorded in PIPE-02-RUNBOOK.md | Owner action (not code) |
| OS-registered state | pandoc MSI installs to `C:\Program Files\Pandoc\` + adds to system PATH | One-time install (plan Wave 0 task) |
| Secrets/env vars | No new secrets; pandoc is public binary; no SharePoint credentials in code | None — owner credentials used only in the browser/app |
| Build artifacts | `scripts/pipeline/reference.docx` (committed binary); `.pipeline-output/` (working dir, gitignored) | Add `.pipeline-output/` to `.gitignore` |

---

## State of the Art

| Old Approach | Current Approach | Notes | Impact |
|--------------|------------------|-------|--------|
| Upload .md directly to SharePoint | Convert to .docx first via pandoc | SharePoint connector does not index .md [CITED: SUMMARY.md L31] | Pipeline is mandatory |
| Manual YAML-in-body check | Guard reads `word/document.xml` after decompress | Raw byte scan is always false-green on compressed .docx | Guard decompression is mandatory |
| Hand-authored reference.docx (C1, rejected) | Script-generated from pandoc default | Headless env; no Word GUI; C1 rejected for this reason [CITED: 113-CONTEXT.md D-03] | Reproducible; committed |
| Wire guard into validation chain now (D3, rejected) | Standalone guard → Phase-119 fold-in | Avoids cross-OS byte-variance in EXACT-MATCH text-lint chain; validator-atom deferral pattern [CITED: 113-CONTEXT.md D-04] | Guard is Phase-119 seed |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | guard script, OOXML helper | ✓ | v24.17.0 | — |
| pandoc | Canonical conversion | ✗ (not on PATH) | — | Install pandoc 3.7.0.2 MSI (Wave 0 task; no fallback acceptable) |
| git | Binary .docx commit, chain validators | ✓ | (existing) | — |
| PowerShell | Install script, convert wrapper | ✓ | (existing) | — |
| Internet access | pandoc MSI download | ✓ (assumed) | — | Download on a machine with access, transfer manually |

**Missing dependencies with no fallback:**
- **pandoc 3.7.0.2** — must be installed in Wave 0 before any conversion task. The pipeline cannot proceed without it.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Pandoc auto-applies `--standalone` for docx output and processes YAML as document metadata, not body text | §Standard Stack / §Pattern 1 | If wrong: YAML appears as body text in output; guard would catch this at self-test |
| A2 | Non-standard YAML keys (`doc_id`, `status`) become Word custom properties in pandoc 3.7.0.2 | §Pattern 1 | If wrong (keys dropped or promoted differently): body text rendering of RE-NNN would require a different approach; empirical OQ4 resolves this |
| A3 | pandoc 3.7.0.2 MSI installs cleanly on Windows 10 Pro (19045) and adds pandoc to PATH automatically | §Standard Stack | If wrong: manual PATH setup needed |
| A4 | The test SharePoint library accepts .docx upload and syncs to Copilot Studio within 15-30 min | §PIPE-02 Procedure | If wrong: longer wait or manual reindex trigger needed |
| A5 | The sequential ZIP local-header walk correctly finds `word/document.xml` in pandoc-generated .docx files (no data descriptor records) | §Pattern 3 | If wrong: `extractEntry` fails for some files; add Central Directory fallback |
| A6 | Copilot Studio citations include clickable links to the SharePoint file | §Owner-Run PIPE-02 | SUMMARY.md §Features HIGH confidence; empirical verification confirms |

---

## Open Questions (Resolved at Execution — Plan 04 deliverables, not planning gaps)

> These are empirical questions that require the live Copilot Studio / Word inspection performed
> in the Plan 04 owner checkpoint. They are intentionally unanswerable pre-execution and are the
> phase's deliverable (recorded in PIPE-02-FINDINGS.md → Phase 114). They do NOT block planning.

1. **Custom YAML key promotion behavior in pandoc 3.7.0.2**
   - What we know: Standard keys (title, author, date) → Word built-in properties. Non-standard key behavior is version-specific; tracked in Pandoc issue #3034 (SUMMARY.md L220).
   - What's unclear: Do `doc_id`, `status`, `owner`, `doc_type` appear as Word custom properties in 3.7.0.2?
   - Recommendation: Empirically verify by opening a converted .docx in Word → File > Properties > Custom (OQ4 in PIPE-02 FINDINGS template). This is a Phase 113 execution task; result feeds into Phase 114 standard authoring.

2. **Citation title source (SUMMARY.md L216-217)**
   - What we know: MEDIUM confidence that citation titles are driven by the SharePoint page/filename, not H1 content.
   - What's unclear: Exact precedence: SharePoint Title column vs. filename vs. Word title property vs. H1.
   - Recommendation: Q1 in the owner-run query sequence deliberately uses a query whose answer is clearly in doc #1; record what the citation panel shows. Result flags whether a v1.16 file-rename pass is needed.

3. **Status: Draft retrieval gate vs. label (SUMMARY.md L221)**
   - What we know: EEE `status: draft` body text does NOT prevent indexing. SharePoint content-approval can gate crawling.
   - What's unclear: Does the Copilot Studio semantic index exclude SharePoint content-approval pending/draft items?
   - Recommendation: Q5 in the query sequence: upload draft-test-doc.docx and query for it. Owner records whether it is retrieved and whether draft status is visible. Owner decision gates Phase 114 EEE standard authoring (does the policy section need content-approval instructions?).

4. **Exact chunk boundary behavior for .docx in this deployment (SUMMARY.md L222)**
   - What we know: ~2,000 chars per chunk, 500-char overlap — default, but deployment-specific.
   - What's unclear: Whether the android-capability-matrix table header (Enrollment section) and first data rows appear in the same chunk.
   - Recommendation: Q4 + Q6 in the query sequence probes chunk boundaries empirically.

---

## Sources

### Primary (HIGH confidence)
- [Pandoc User's Guide — `--reference-doc`](https://pandoc.org/MANUAL.html#option--reference-doc) — invocation, reference.docx generation, standalone auto-applied for docx
- [Pandoc User's Guide — Metadata Blocks](https://pandoc.org/MANUAL.html#metadata-blocks) — YAML processed as metadata (not body text) in standalone mode
- [pandoc/data/docx/word/styles.xml](https://github.com/jgm/pandoc/blob/main/data/docx/word/styles.xml) — confirmed `w:styleId="Heading1"`, `Heading2`, `Heading3` in default reference.docx
- [pandoc 3.7.0.2 release assets (GitHub API)](https://github.com/jgm/pandoc/releases/tag/3.7.0.2) — Windows MSI URL confirmed
- [pandoc 3.10 latest release (GitHub API)](https://github.com/jgm/pandoc/releases/tag/3.10) — latest version confirmed
- `.planning/research/SUMMARY.md` — all platform architecture claims (P-07, P-08, P-09, citation behavior, chunk size) — authoritative; do NOT re-research
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/113-CONTEXT.md` — locked decisions D-01 through D-07
- Node.js v24 docs: `node:zlib.inflateRawSync`, `node:fs.readFileSync`, `Buffer.readUInt16LE`, `Buffer.readUInt32LE`
- PKZIP Application Note (format spec): local file header structure, compression method 8 = DEFLATE, `inflateRawSync` for raw deflate stream

### Secondary (MEDIUM confidence)
- [pandoc Installing (pandoc.org)](https://pandoc.org/installing.html) — Windows MSI auto-updates PATH; winget/choco alternatives
- [Pandoc issue #3034 (2016)](https://github.com/jgm/pandoc/issues/3034) — custom YAML key promotion behavior; version-specific

### Tertiary (LOW confidence)
- SUMMARY.md L222 — exact chunk boundaries for this deployment: empirical verification required at Phase 113 execution

---

## Metadata

**Confidence breakdown:**
- Pandoc install + invocation: HIGH — official docs + GitHub API verified
- reference.docx styleIds: HIGH — pandoc source code confirmed
- YAML frontmatter handling: HIGH — pandoc manual + standalone behavior documented
- Custom property promotion (non-standard keys): MEDIUM — version-specific; empirical OQ4
- OOXML guard (zero-dep Node.js): HIGH for approach; MEDIUM for edge cases (data descriptor records)
- Representative set selection: HIGH (files verified to exist in corpus)
- Platform value inventory: HIGH (grep confirmed 20 distinct values)
- Owner-run PIPE-02 outcomes: LOW (empirical by definition)

**Research date:** 2026-07-03
**Valid until:** 2026-08-03 (pandoc 3.7.0.2 release is stable; platform assumptions stable)
