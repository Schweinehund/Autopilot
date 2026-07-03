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

_Filled in by Task 2 (Plan 113-03)._

### Conversion + Guard Run (2026-07-03)

Canonical invocation used:

```
scripts/pipeline/convert.ps1 -InputMd <fixture.md> -OutputDocx .pipeline-output/<fixture.docx>
node scripts/pipeline/guard-docx.mjs .pipeline-output/<fixture.docx>
```

| # | Filename | Convert OK | Guard Exit | Heading StyleIds Found | Notes |
|---|----------|-----------|------------|----------------------|-------|
| 0 | `clean-test-doc.md` | — | — | — | Pending Task 2 |
| 1 | `01-device-not-registered.md` | — | — | — | Pending Task 2 |
| 2 | `27-macos-sso-investigation.md` | — | — | — | Pending Task 2 |
| 3 | `android-capability-matrix.md` | — | — | — | Pending Task 2 |
| 4 | `38-8021x-certificate-failure.md` | — | — | — | Pending Task 2 |
| 5 | `draft-test-doc.md` | — | — | — | Pending Task 2 |

### SC4 Body-Text Stub Confirmation

| Fixture | Stub Text Present in .docx Body | Notes |
|---------|--------------------------------|-------|
| `clean-test-doc.md` | — | Pending Task 2 |
