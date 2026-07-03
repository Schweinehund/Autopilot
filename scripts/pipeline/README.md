# Conversion Pipeline — Operator Guide

This directory contains the canonical MD→.docx conversion pipeline for the Phase-1 EEE SOP
document retrofit. Operator-facing guide; lives in `scripts/pipeline/`, NOT in the indexed
SharePoint library.

---

## SC1 — Canonical Invocation (Single Source of Truth)

The canonical pandoc invocation is:

```powershell
pandoc <input.md> -o <output.docx> --reference-doc=scripts/pipeline/reference.docx
```

**No other flags.** In particular:

- `--standalone` is auto-applied for `.docx` output — moving YAML frontmatter into Word
  document properties (not body text). Do NOT add `--no-standalone` — that breaks YAML
  handling and causes leaks into the document body.
- `--from markdown` is auto-detected from the `.md` extension.

Use the wrapper script for convenience (it also runs the version guard):

```powershell
.\scripts\pipeline\convert.ps1 -InputMd docs\l1-runbooks\01-device-not-registered.md `
                                -OutputDocx .pipeline-output\01-device-not-registered.docx
```

After every conversion, run the post-conversion guard before uploading:

```bash
node scripts/pipeline/guard-docx.mjs .pipeline-output/01-device-not-registered.docx
```

Exit 0 = safe to upload. Exit 1 = YAML leak or heading-style loss — do not upload.

---

## SC3 — Deployment Policy

### 1. Only .docx Files Go in the Indexed SharePoint Library

`.md` source files are NOT a supported SharePoint knowledge-source type. The SharePoint
connector indexes `.docx` (Word) files only. `.md` source files live in `docs/`; compiled
`.docx` outputs are what gets uploaded to the SharePoint library for Copilot Studio grounding.

### 2. Status: Draft Docs Excluded from the Production Library Path

Documents with `status: draft` in their YAML frontmatter **must not be uploaded** to the
indexed production library until promoted to `status: approved` by the owner.

**Why this matters:** The `Status: Draft` body-text label rendered in the document is
invisible to the Copilot Studio citation UI. Copilot retrieves and cites Draft docs as if
they were authoritative — there is no automatic draft-exclusion. Keeping Draft docs out of
the production library path is the operator's responsibility.

**Promotion process:**
1. Owner reviews and approves the document.
2. Change `status: draft` to `status: approved` in the YAML frontmatter.
3. Re-run `convert.ps1` to regenerate the `.docx`.
4. Re-run the guard (`guard-docx.mjs`) on the new `.docx`.
5. Upload the approved `.docx` to the indexed library.

### 3. Doc ID Registry Not Indexed

`docs/_registry/RE-index.md` (and its compiled `.docx` equivalent, if any) must **not** be
placed in the indexed SharePoint library. If the registry is indexed, doc-specific queries
(e.g. "What does RE-047 cover?") return the registry row instead of the document content,
breaking Copilot's citation accuracy.

---

## Pandoc Version Pin — 3.7.0.2

**Pinned version:** `3.7.0.2`

This version is pinned because pandoc controls the `.docx` OOXML structure, heading styleIds,
and YAML-to-Word-property promotion behavior. An unpinned pandoc can silently drift styleIds
across the ~150-doc corpus on any version upgrade.

**Download:** <https://github.com/jgm/pandoc/releases/tag/3.7.0.2>

**Windows install (MSI):**
```
pandoc-3.7.0.2-windows-x86_64.msi
```
Install user-scope if system PATH is not available; the pipeline scripts fall back to
`$env:LOCALAPPDATA\Pandoc\pandoc.exe` automatically.

**Version bump rules:** If the pinned version must be changed:
1. Install the new version.
2. Regenerate `reference.docx`:
   ```powershell
   pandoc -o scripts/pipeline/reference.docx --print-default-data-file reference.docx
   ```
3. Re-run the guard self-test:
   ```bash
   node scripts/pipeline/guard-docx.mjs --self-test
   ```
4. Update the version string in `convert.ps1` (`$expectedVer`).
5. Commit `reference.docx` (binary) and `convert.ps1` in the same commit.
6. Re-run the guard on all previously converted `.docx` outputs.

---

## Directory Layout

```
scripts/pipeline/
├── convert.ps1           # Canonical invocation wrapper + version guard
├── guard-docx.mjs        # Post-conversion guard: YAML-leak + Heading-style checks
├── reference.docx        # Committed pandoc reference template (binary, 3.7.0.2)
├── README.md             # This file (operator guide; NOT in SharePoint library)
└── lib/
    └── ooxml.mjs         # Zero-dependency OOXML introspection helper (D-05)
```

Working output directory (gitignored): `.pipeline-output/`
