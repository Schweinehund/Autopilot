---
doc_id: RE-T05
status: draft
owner: Phase 124 Test Fixture
doc_type: Runbook
platform: macOS
last_verified: 2026-07-03
review_by: 2026-10-01
applies_to: macOS
audience: L1
---

**Platform:** macOS · **Doc Type:** Runbook · **Doc ID:** RE-T05 · **Status:** Draft

# Draft Test Document — macOS Synthetic

## Summary

This is a synthetic test fixture for the PIPE-05 (Phase 124) Draft-label grounding probe. It
exercises the shipped EEE header-block format (per `docs/_standards/EEE-SOP-standard.md`
§Format specification) with both the frontmatter `status:` leg and the visible `**Status:**`
body-text leg mutated to `Draft`, confirming empirically whether the literal Draft label
renders and is queryable in Copilot Studio against the shipped block shape (D-14).

> **Important (deployment policy):** This document must NOT be uploaded to the indexed
> production SharePoint library. It is for the test library grounding validation only.
> See `scripts/pipeline/README.md` §SC3 for the Draft exclusion policy.

## Background

The EEE SOP standard assigns `Status: Draft` to documents under review. The grounding
validation needs to establish empirically whether SharePoint content-approval exclusion
is required, or whether the `Status: Draft` body-text label is sufficient to prevent
operators from acting on unreviewed content.

## Test Section

This section contains representative body content to confirm the document converts
and indexes correctly through the pipeline.

### Sub-section A

Content under heading 3 to confirm heading style preservation for a Draft-status document.

## Expected Behavior (PIPE-05 Owner Verification)

After uploading this document to the test SharePoint library and querying via Copilot Studio
per `PIPE-05-RUNBOOK.md`:

1. Confirm whether the document appears in retrieval results at all.
2. If it appears, confirm whether the `Status: Draft` label is visible in the citation/response.
3. Record the result in `PIPE-05-FINDINGS.md`: Draft-label render + queryability probe resolved.
