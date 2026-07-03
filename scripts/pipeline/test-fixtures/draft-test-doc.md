---
title: Draft Test Document — macOS Synthetic
last_verified: 2026-07-03
platform: macOS
status: draft
---

# Draft Test Document — macOS Synthetic

**Doc ID:** RE-T05 . **Platform:** macOS . **Doc Type:** Runbook . **Status:** Draft

This is a synthetic test fixture for Phase 113 Plan 04 grounding validation. It exercises
the Status:Draft retrieval open question (RESEARCH §Representative-Set Selection candidate 5):
does a document with `status: draft` in frontmatter appear in Copilot Studio retrieval
results, and if so, how is the Draft label presented?

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

## Expected Behavior (Plan 04 Owner Verification)

After uploading this document to the test SharePoint library and querying via Copilot Studio:

1. Confirm whether the document appears in retrieval results at all.
2. If it appears, confirm whether the `Status: Draft` label is visible in the citation.
3. Record the result in the Plan 04 checkpoint: Draft-retrieval open question resolved.
