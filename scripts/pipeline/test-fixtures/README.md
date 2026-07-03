# Phase 113 Representative Set — Conversion Pipeline Validation

This directory contains working COPIES of real corpus docs (with minimal stub EEE headers
added for grounding validation) plus two synthetic fixtures. The canonical `docs/` originals
are **not modified** in Phase 113 (D-01; canonical retrofit is Phases 116-118).

---

## 5-Doc Representative Set

The representative set is selected to span multiple platform variants, include a capability-matrix
table with >25 rows (P-02), and include a Status:Draft document for the grounding open question.

| # | Filename | Platform Value | Doc Class | Unique Coverage |
|---|----------|---------------|-----------|-----------------|
| 1 | `01-device-not-registered.md` | `Windows` | Runbook (L1) | Basic conversion; Windows single-platform label |
| 2 | `27-macos-sso-investigation.md` | `macOS` | Runbook (L2) | macOS CamelCase platform label |
| 3 | `android-capability-matrix.md` | `Android` | Reference | P-02 chunk-fragmentation: >25-row capability matrix |
| 4 | `38-8021x-certificate-failure.md` | `windows+macos+ios+android+linux` | Runbook (L1) | Multi-platform compound label normalization |
| 5 | `draft-test-doc.md` | `macOS` (synthetic) | Runbook | Status:Draft retrieval open question |

**Additional fixture:** `clean-test-doc.md` (synthetic, `Windows`, Runbook, Approved) — minimal
baseline doc with three heading levels; used for clean-conversion proof independent of real-corpus content.

### Stub EEE Header Format

Each fixture carries exactly one single-line stub EEE header immediately after its `# Title`,
of the form:

```
**Doc ID:** RE-TNN . **Platform:** <value> . **Doc Type:** <type> . **Status:** <status>
```

This stub is TEMPORARY — it exists only in the `scripts/pipeline/test-fixtures/` copies to
exercise the body-text grounding check (SC4). The canonical retrofit happens in Phases 116-118.

---

## Deployment Note

- `Status: Draft` documents (`draft-test-doc.md`) MUST NOT be uploaded to the indexed
  production SharePoint library. Use the test library only. See `scripts/pipeline/README.md`
  §SC3 for the Draft exclusion policy.
- Converted `.docx` files live in `.pipeline-output/` (gitignored) and are not committed.
- The source fixture `.md` files in this directory ARE committed.

---

## Conversion and Guard Results

### Conversion + Guard Run (2026-07-03)

Canonical invocation:

```
scripts/pipeline/convert.ps1 -InputMd <fixture.md> -OutputDocx .pipeline-output/test-fixtures/<fixture.docx>
node scripts/pipeline/guard-docx.mjs .pipeline-output/test-fixtures/<fixture.docx>
```

Pandoc version: 3.7.0.2 (pinned — version guard PASS on all docs).

Note: convert.ps1 version regex updated (`^pandoc(?:\.exe)?\s+` instead of `^pandoc\s+`) to handle
this Windows installation's binary banner `pandoc.exe 3.7.0.2` vs. the expected `pandoc 3.7.0.2`.
Both forms are correct pandoc output; the original regex was too strict for Windows exe-name banners
(Rule 1 auto-fix committed in Plan 113-03 Task 2).

| # | Filename | Convert OK | Guard Exit | Heading StyleIds Found | YAML-LEAK | Notes |
|---|----------|-----------|------------|----------------------|-----------|-------|
| 0 | `clean-test-doc.md` | YES | 0 (PASS) | [Heading1,Heading2,Heading3] | PASS | Synthetic clean baseline |
| 1 | `01-device-not-registered.md` | YES | 0 (PASS) | [Heading1,Heading2] | PASS | Windows runbook; 2-level headings |
| 2 | `27-macos-sso-investigation.md` | YES | 0 (PASS) | [Heading1,Heading2,Heading3] | PASS | macOS L2 runbook; 3-level headings |
| 3 | `android-capability-matrix.md` | YES | 0 (PASS) | [Heading1,Heading2] | PASS | Android capability matrix; >25-row tables |
| 4 | `38-8021x-certificate-failure.md` | YES | 0 (PASS) | [Heading1,Heading2,Heading3] | PASS | Compound platform label; 3-level headings |
| 5 | `draft-test-doc.md` | YES | 0 (PASS) | [Heading1,Heading2,Heading3] | PASS | Synthetic Status:Draft |

**All 6 fixtures: convert OK, guard exit 0. Pipeline is corpus-safe for this representative set.**

### SC4 Body-Text Stub Confirmation

Verified via `extractBodyText()` (ooxml.mjs) on converted .docx files. Checks that `---` YAML delimiter
did NOT leak and that stub text (`Platform:`, `Doc Type:`, `Doc ID:`) IS present as indexable body text.

| Fixture | Stub Text Present in .docx Body | Platform field | Doc Type field | Notes |
|---------|--------------------------------|----------------|----------------|-------|
| `clean-test-doc.md` | YES (RE-T00 confirmed) | Windows | Runbook | First 300 chars include full stub line |
| `01-device-not-registered.md` | YES (RE-T01 confirmed) | Windows | Runbook | Stub appears after title heading in body |
| `draft-test-doc.md` | YES (RE-T05 confirmed) | macOS | Runbook | Status: Draft confirmed in body text |

**SC4 precondition met:** stub EEE header indexes as body text, not Word document properties.
