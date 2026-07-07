---
phase: 113-conversion-pipeline-lock-representative-set-grounding-valida
plan: "01"
subsystem: pipeline-tooling
tags: [pipeline, ooxml, pandoc, docx, zero-dependency]
dependency_graph:
  requires: []
  provides:
    - scripts/pipeline/lib/ooxml.mjs
    - scripts/pipeline/reference.docx
    - .gitattributes (binary marker)
    - .gitignore (.pipeline-output/)
  affects:
    - Phase 113 Plan 02 (guard-docx.mjs imports ooxml.mjs)
    - Phase 119 (check-phase-113.mjs seeds from guard-docx.mjs which imports ooxml.mjs)
tech_stack:
  added:
    - pandoc 3.7.0.2 (pinned binary, user-scope winget install)
  patterns:
    - ZIP local-header sequential walk via PK\x03\x04 signature
    - inflateRawSync DEFLATE decompression (node:zlib built-in)
    - CRLF→LF normalization on inflated XML before text matching
    - Pitfall-5 data-descriptor guard (compressedSize===0 + method 8 → break)
key_files:
  created:
    - scripts/pipeline/lib/ooxml.mjs
    - scripts/pipeline/reference.docx
    - .gitattributes
  modified:
    - .gitignore
decisions:
  - "pandoc 3.7.0.2 installed via winget user-scope (JohnMacFarlane.Pandoc --version 3.7.0.2); MSI install succeeded without elevation via winget's user-scope install path"
  - "findHeadingStyleIds reads word/document.xml (not styles.xml) as specified in blueprint; pandoc's default reference.docx document.xml contains sample heading paragraphs that carry w:val='HeadingN' pStyle references — confirmed working by sanity check"
metrics:
  duration: "~10 minutes"
  completed: "2026-07-03T18:48:38Z"
  tasks_completed: 2
  files_created: 4
---

# Phase 113 Plan 01: Foundation Assets — OOXML Helper + Reference Template Summary

Zero-dependency Node.js OOXML introspection helper and pinned pandoc 3.7.0.2 reference.docx template committed as the load-bearing substrate for the conversion pipeline guard (Plan 02) and grounding validation (Plans 03-04).

## What Was Built

**Task 1 — `scripts/pipeline/lib/ooxml.mjs` (D-05)**

Created the shared zero-dependency OOXML introspection helper with exactly three named exports:
- `extractEntry(docxPath, entryName)` — walks ZIP local file headers by `PK\x03\x04` signature, reads fileNameLength + extraFieldLength to locate dataStart, calls `inflateRawSync` on method-8 DEFLATE entries; method-0 Stored returned directly; throws on unsupported methods or entry-not-found
- `extractBodyText(docxPath)` — extracts `<w:body>` region from `word/document.xml`, strips XML tags, collapses whitespace, applies CRLF→LF normalization
- `findHeadingStyleIds(docxPath)` — scans `word/document.xml` for `w:val="Heading1/2/3"` references; returns the subset present

Critical constraints satisfied:
- Imports **only** `readFileSync` from `node:fs` and `inflateRawSync` from `node:zlib` — zero external npm packages (Phase-119 fold-in invariant preserved)
- Pitfall-5 data-descriptor guard: if `compressedSize === 0` with method 8, breaks the walk instead of calling `inflateRawSync` on an empty buffer (crash prevention)
- CRLF→LF normalization applied to all inflated XML before text matching

**Task 2 — pandoc 3.7.0.2 pin + reference.docx + git config (D-03)**

- Installed pandoc 3.7.0.2 via winget user-scope (`JohnMacFarlane.Pandoc --version 3.7.0.2`) — install succeeded without admin elevation
- Generated `scripts/pipeline/reference.docx` via `pandoc -o scripts/pipeline/reference.docx --print-default-data-file reference.docx`
- D-05 generation-time sanity check confirmed: `findHeadingStyleIds('scripts/pipeline/reference.docx')` returns `["Heading1","Heading2","Heading3"]` — proves the committed template carries locale-independent Word Heading styleIds
- Created `.gitattributes` with `scripts/pipeline/reference.docx binary` (opaque binary marker, no line-ending mangling)
- Appended `.pipeline-output/` to `.gitignore` (working conversion output directory, never committed)

## Verification Results

All 7 verification checks passed:
1. ooxml.mjs three-export probe → PASS
2. Zero external imports in ooxml.mjs → PASS
3. `inflateRawSync` token present → PASS
4. `pandoc --version` first line contains `3.7.0.2` → PASS
5. `findHeadingStyleIds('scripts/pipeline/reference.docx')` returns `["Heading1","Heading2","Heading3"]` → PASS
6. `.gitattributes` contains `scripts/pipeline/reference.docx binary` → PASS
7. `.gitignore` contains `.pipeline-output/` → PASS

## Commits

| Task | Commit | Files |
|------|--------|-------|
| Task 1: ooxml.mjs helper | `d1c33b0` | `scripts/pipeline/lib/ooxml.mjs` |
| Task 2: reference.docx + git config | `adf4898` | `scripts/pipeline/reference.docx`, `.gitattributes`, `.gitignore` |

## Deviations from Plan

### Auto-fixed / Adjusted

**1. [No Rule — Successful adaptation] pandoc install via winget instead of MSI msiexec**

- **Found during:** Task 2 setup
- **Situation:** The plan notes the MSI install (`Start-Process msiexec.exe -Wait -ArgumentList "/i $dest /quiet"`) may require elevation. However, winget's user-scope install path (`winget install JohnMacFarlane.Pandoc --version 3.7.0.2 --scope user`) succeeded without elevation — winget handled the download from the official GitHub release URL and the installation into `%LOCALAPPDATA%\Pandoc\`.
- **Outcome:** Same pinned version (3.7.0.2), same binary from the official `github.com/jgm/pandoc` release. No blocking checkpoint needed. T-113-SC threat mitigation (supply-chain provenance) satisfied — official release from primary author.
- **Deviation type:** Non-breaking implementation adaptation (goal fully achieved)

None — plan executed with all success criteria met.

## Decisions Made

1. **winget user-scope install path:** winget handles the official pandoc 3.7.0.2 MSI under `--scope user` without elevation. Install location: `%LOCALAPPDATA%\Pandoc\pandoc.exe`. PATH must include this for pandoc to be available in subsequent build commands.

2. **findHeadingStyleIds on document.xml:** The blueprint (RESEARCH.md §Pattern 3) specifies scanning `word/document.xml` for `w:val="HeadingN"` references. Pandoc's default reference.docx does contain sample styled paragraphs in document.xml with `<w:pStyle w:val="Heading1/2/3"/>` references — confirmed by sanity check exit 0.

## Known Stubs

None — both deliverables are fully wired (ooxml.mjs is a complete, tested helper; reference.docx is a committed binary proven to carry Heading1/2/3 styleIds).

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. The pandoc binary is obtained from the official `jgm/pandoc` GitHub release (verified: `github.com/jgm/pandoc/releases/download/3.7.0.2/`). Threat mitigations T-113-01 through T-113-SC from the plan's `<threat_model>` are all applied:
- T-113-01 (pandoc supply chain): version pinned to 3.7.0.2 + `pandoc --version` hard-asserted before use
- T-113-02 (inflate amplification): single named-entry extraction, Pitfall-5 guard applied
- T-113-03 (path traversal): `extractEntry` reads only caller-supplied path via `readFileSync`; no path derived from archive contents
- T-113-SC (toolchain provenance): official GitHub release from primary author (jgm)

## Self-Check

Checking created files exist:
- `scripts/pipeline/lib/ooxml.mjs` — FOUND (122 lines, created)
- `scripts/pipeline/reference.docx` — FOUND (committed binary, 11KB)
- `.gitattributes` — FOUND (1 line)
- `.gitignore` — FOUND (updated, contains `.pipeline-output/`)

Checking commits exist:
- `d1c33b0` — FOUND in git log (feat(113-01): build zero-dependency OOXML introspection helper)
- `adf4898` — FOUND in git log (feat(113-01): pin pandoc 3.7.0.2, generate + commit reference.docx)

## Self-Check: PASSED
