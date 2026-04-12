---
status: issues_found
phase: 12
depth: standard
files_reviewed: 2
findings:
  critical: 1
  warning: 1
  info: 1
  total: 3
---

# Phase 12 Code Review

Reviewing `docs/error-codes/06-apv2-device-preparation.md` and `docs/error-codes/00-index.md` as produced by Phase 12 execution (commits 6290a8b and f04282b).

---

## Critical

### C-01: Broken deep link anchor — Win32/Store/EAC scenario (confidence: 95)

**File:** `docs/error-codes/00-index.md`, line 81
**Cross-reference target:** `docs/error-codes/06-apv2-device-preparation.md`, line 126

The index deep-links to:

    06-apv2-device-preparation.md#win32-store-or-eac-app-install-failed

The actual heading in the catalog file is:

    ### Win32, Store, or Enterprise App Catalog app install failed

Standard Markdown anchor generation from this heading produces `#win32-store-or-enterprise-app-catalog-app-install-failed`. The abbreviation "EAC" does not appear in the heading text, so the anchor `#win32-store-or-eac-app-install-failed` does not resolve. The link silently fails to navigate — users clicking this entry in the index land at the top of the catalog page rather than the intended scenario.

**Fix (option A):** Rename the heading in `docs/error-codes/06-apv2-device-preparation.md` from `### Win32, Store, or Enterprise App Catalog app install failed` to `### Win32, Store, or EAC app install failed`. This matches the anchor already written in the index and is consistent with the "EAC" abbreviation used in the scenario body text.

**Fix (option B):** Update the anchor in `docs/error-codes/00-index.md` from `#win32-store-or-eac-app-install-failed` to `#win32-store-or-enterprise-app-catalog-app-install-failed`. This keeps the heading unabbreviated but requires a longer anchor.

Option A is recommended: shorter heading, shorter anchor, consistent with the abbreviation already used in the body text.

---

## Warning

### W-01: Phase step number inconsistency for "Deployment experience never launched" (confidence: 85)

**File 1:** `docs/error-codes/00-index.md`, line 74 — Phase column reads `Steps 1-2`
**File 2:** `docs/error-codes/06-apv2-device-preparation.md` — this scenario is placed under `## Enrollment Failures (Steps 2-3)`

The index and the catalog section header give different step ranges for the same scenario. A technician consulting both files sees contradictory step numbers. The section header `Steps 2-3` is consistent with `docs/lifecycle-apv2/02-deployment-flow.md`, which places Entra join and Intune enrollment at Steps 2-3. The index value `Steps 1-2` appears incorrect.

**Fix:** Update the Phase cell for this row in `docs/error-codes/00-index.md` from `Steps 1-2` to `Steps 2-3`.

---

## Info

### I-01: Runbook forward references target non-existent phases (confidence: 100)

All 10 Runbook fields in `docs/error-codes/06-apv2-device-preparation.md` reference L1 runbooks (Phase 13) or L2 runbooks (Phase 14) that do not yet exist in the file system. This is intentional per design decision D-08 (plain-text forward references, not markdown links) and the project roadmap. No broken links result because the references are plain text. Recorded for completeness; no action required until Phase 13/14 delivery.

---

## Summary

Catalog content is accurate and well-structured. All 10 scenarios follow the Symptom / Probable Cause / Quick Check / Runbook format. No hex codes appear. The APv1 precedence silent-failure callout is correct. Quick Check paths use read-only portal navigation only — no destructive steps are documented without runbook deferral.

Two corrections are required before the index is navigable as intended: the broken anchor (C-01) and the step number discrepancy (W-01). Both are single-line fixes.
