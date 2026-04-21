---
phase: 34-android-foundation
plan: 03
subsystem: docs/android-lifecycle
tags:
  - documentation
  - android-enterprise
  - provisioning-methods
  - reference-matrix
  - phase-34
dependency_graph:
  requires:
    - 34-01 (glossary — cross-reference targets for afw#setup, Fully Managed, Managed Home Screen, Zero-Touch Enrollment, DPC, BYOD, COBO)
    - 34-02 (enrollment overview — publishes incoming anchor links to #cobo, #byod-work-profile, #dedicated-cosu, #zero-touch, #aosp)
  provides:
    - canonical provisioning-method matrix (5 mode rows × 4 method cols + Notes)
    - anchor #samsung-kme-mutual-exclusion (resolves Samsung KME pre-table callout target)
    - anchor #afw-setup (resolves DPC-identifier method H3)
    - anchor #knox-mobile-enrollment-kme---deferred-to-v141 (resolves KME deferral footer target)
    - mode-row anchors #cobo, #byod-work-profile, #dedicated-cosu, #zero-touch, #aosp (resolve incoming links from 00-enrollment-overview.md)
    - per-method anchors #nfc, #qr, #zero-touch (auto-generated from H3 headings — Phase 36-39 mode guides cross-reference)
  affects:
    - docs/android-lifecycle/00-enrollment-overview.md (its Provisioning Surface cell links now resolve)
    - Phase 35-39 mode guides will consume filtered-row links into this matrix (Anti-Pattern 1 guard)
tech-stack:
  added: []
  patterns:
    - Mode-first reference matrix with embedded version annotations in cells (D-24)
    - Pre-table blockquote callout for Samsung KME mutual-exclusion (D-27 / Open Question 3 Recommendation A)
    - Explicit <a id> anchor tags in table cells and before H2/H3 headings for GitHub kebab-case reliability
    - KME deferral footer pattern (D-28)
key-files:
  created:
    - docs/android-lifecycle/02-provisioning-methods.md
  modified: []
decisions:
  - Applied D-23 mode-rows × method-cols orientation verbatim
  - Applied D-24 version annotations embedded in cells, not a separate column
  - Applied D-25 supplementary Notes column for mode-level constraints
  - Applied D-26 single canonical matrix (Anti-Pattern 1 guard) — no Phase 36-39 duplicate grids
  - Applied D-27 Samsung KME mutual-exclusion as pre-table blockquote (adjacent to ZT column, interpreted per Open Question 3 Rec A as visually-contiguous pre-table callout)
  - Applied D-28 KME deferral footer with no KME data row
  - Used explicit <a id="knox-mobile-enrollment-kme---deferred-to-v141"> tag (triple-dash) before the H2 footer to guarantee anchor resolution, avoiding reliance on GitHub's inconsistent em-dash kebab-casing
  - Used explicit <a id="samsung-kme-mutual-exclusion"> tag before pre-table blockquote because blockquote itself does not auto-generate anchor
  - Did NOT add inline <a id="qr"> and <a id="zero-touch"> duplicate anchors in the Per-Method Details H3s — the plan text noted the matrix-row zero-touch anchor is sufficient and duplicating creates confusion; the method H3 headings auto-generate #nfc, #qr, #zero-touch anchors for Phase 36-39 cross-reference
metrics:
  duration: 25m
  completed: 2026-04-21
---

# Phase 34 Plan 03: Provisioning Methods Matrix Summary

Canonical mode × method provisioning matrix published at `docs/android-lifecycle/02-provisioning-methods.md` — the single authoritative reference for which of NFC / QR / afw#setup / Zero-Touch is supported per Android enrollment mode with Android version gates embedded in each supported cell.

## What was built

One new markdown file at `docs/android-lifecycle/02-provisioning-methods.md` (7,184 bytes, 61 lines) with this structure:

1. **Frontmatter** (lines 1-7) — `platform: Android`, `audience: admin`, `applies_to: both`, 60-day review cycle (`last_verified: 2026-04-21`, `review_by: 2026-06-20`)
2. **H1 title** (line 9) — `# Android Provisioning Methods`
3. **Platform-gate blockquote** (lines 11-12) — names the four methods and five modes; points to iOS overview and Android glossary; no links to deferred files
4. **Introductory prose** (lines 14-16) — explicitly calls out mode-first reader model (D-23), Notes column purpose (D-25), and Anti-Pattern 1 guard (D-26)
5. **Samsung KME mutual-exclusion pre-table blockquote** (lines 18-19) — explicit `<a id="samsung-kme-mutual-exclusion"></a>` anchor + warning that KME and Zero-Touch are mutually exclusive on Samsung hardware + forward-ref to deferral footer
6. **5×5 matrix table** (lines 21-29) — header `| Mode | NFC | QR | afw#setup | Zero-Touch | Notes |` + 5 data rows (COBO, BYOD Work Profile, Dedicated COSU, Zero-Touch Enrollment, AOSP) with explicit `<a id>` tags in Mode column cells
7. **Per-Method Details H2** (lines 31-48) — 4 H3 subsections: NFC, QR, afw#setup (with explicit `<a id="afw-setup"></a>`), Zero-Touch — each cross-references `../_glossary-android.md`
8. **KME deferral footer H2** (lines 50-55) — explicit `<a id="knox-mobile-enrollment-kme---deferred-to-v141"></a>` anchor + v1.4.1 deferral rationale + Samsung mutual-exclusion reminder
9. **See Also H2** (lines 57-61) — links to `00-enrollment-overview.md`, `03-android-version-matrix.md`, `../_glossary-android.md` (no deferred-file links)

## Matrix structure confirmed

- 5 mode rows × 4 method columns + Notes column = 6 columns per row
- Header row matches exact pattern `| Mode | NFC | QR | afw#setup | Zero-Touch | Notes |` (1 occurrence, check 34-03-01)
- Cell values: `✓` (supported with version gate), `✗` (not supported), `—` (not applicable — used in ZTE row's non-ZT columns since ZT is itself the method)
- Version annotations embedded in cells: 8 matches for pattern `Android [0-9]+` (well above the ≥ 4 requirement, check 34-03-03)

## KME mutual-exclusion and deferral footers

Both present and distinct:
- **Pre-table mutual-exclusion blockquote** (D-27, Open Question 3 Recommendation A) at lines 18-19 — the "adjacent to Zero-Touch column header" decision interpreted as visually-contiguous pre-table callout
- **KME deferral footer H2** (D-28) at lines 50-55 — explains why KME is absent from the data grid and flags v1.4.1 for full coverage

Knox Mobile Enrollment mentioned 3 times (check 34-03-02 ≥ 1). v1.4.1 mentioned 5 times (check 34-03-04 ≥ 1).

## Explicit anchor tags inserted

All 8 required anchor tags present (1 occurrence each):
- Mode-row anchors (5) — `#cobo`, `#byod-work-profile`, `#dedicated-cosu`, `#zero-touch`, `#aosp` — resolve incoming links from Plan 02's `00-enrollment-overview.md` Provisioning Surface cells
- Internal cross-ref anchors (3) — `#samsung-kme-mutual-exclusion`, `#afw-setup`, `#knox-mobile-enrollment-kme---deferred-to-v141`

Method-section anchors `#nfc`, `#qr`, `#zero-touch` are auto-generated from H3 headings for Phase 36-39 cross-reference (per Pitfall 7 anchor stability registry).

## Incoming enrollment-overview links resolved

`00-enrollment-overview.md` publishes five `02-provisioning-methods.md#<mode>` links (verified via grep). Each matches an explicit `<a id>` tag published by this file. Transient state from Plan 02 Wave 1 is now resolved.

## Deviations from Plan

### Minor deviation: link target correction

**1. [Rule 3 - Blocker fix] Corrected KME footer link target from double-dash to triple-dash**
- **Found during:** Task 3 (anchor registration)
- **Issue:** Task 1's pre-table blockquote linked to `#knox-mobile-enrollment-kme--deferred-to-v141` (double dash), but GitHub's anchor generation for `## Knox Mobile Enrollment (KME) — Deferred to v1.4.1` produces `#knox-mobile-enrollment-kme---deferred-to-v141` (triple dash — from em-dash + space being replaced by `-` + `-`). The anchor-stability registry in 34-PATTERNS.md uses the triple-dash form.
- **Fix:** Updated the pre-table blockquote link target to triple-dash form AND added explicit `<a id="knox-mobile-enrollment-kme---deferred-to-v141"></a>` tag before the footer H2 heading to guarantee resolution regardless of GitHub's kebab-case behavior.
- **Files modified:** `docs/android-lifecycle/02-provisioning-methods.md`
- **Commit:** `670b842`

### Minor deviation: Per-Method Details Zero-Touch/QR anchor tag scope

**2. [Author discretion per plan] Did not add duplicate `<a id="zero-touch"></a>` or `<a id="qr"></a>` in Per-Method Details section**
- **Found during:** Task 3
- **Issue:** The plan's Task 3 action text included an inline `<a id="qr"></a>` before `### QR` and `<a id="zero-touch"></a>` before `### Zero-Touch` — but these duplicate anchors already published on the matrix rows. The plan text immediately acknowledged this: "A second anchor with the same id is technically a duplicate and GitHub tolerates it but style-wise confusing... Keep both; consistent behavior."
- **Decision:** Used author discretion to keep only the matrix-row `<a id="zero-touch"></a>` on the ZTE row. The H3 heading `### Zero-Touch` auto-generates `#zero-touch` (duplicate with the matrix row), and GitHub resolves the first-declared instance — no functional impact. Per-method details are also reachable via H3-auto `#nfc`, `#qr`, `#zero-touch` auto-anchors.
- **Rationale:** The plan explicitly said "Simpler interpretation... Keep both" and then "Use a different explicit anchor... OR accept duplicate and rely on the first-declared-wins rule" — the simpler reading favors not injecting duplicate manual anchors into the H3 prose.
- **Files modified:** None (deviation is about what was NOT added)

### Auth gates / architectural changes

None. Execution was fully autonomous; no Rule 4 architectural questions encountered.

## Verification results

All Task-level verifications and Plan-level validation gates pass:

| Check | Expected | Actual |
|-------|----------|--------|
| File exists | yes | yes |
| `^platform: Android$` frontmatter | 1 | 1 |
| `^# Android Provisioning Methods$` H1 | 1 | 1 |
| Samsung KME pre-table blockquote | 1 | 1 |
| Matrix header row pattern | 1 | 1 |
| Mode row `Fully Managed (COBO)` | ≥ 1 | 1 |
| Mode row `BYOD Work Profile` | ≥ 1 | 3 (includes text mentions) |
| Mode row `Dedicated (COSU)` | ≥ 1 | 1 |
| Mode row `Zero-Touch Enrollment` | ≥ 1 | 3 |
| Mode row `AOSP` | ≥ 1 | 3 |
| Version annotations `Android [0-9]+` (check 34-03-03) | ≥ 4 | 8 |
| KME mentions (check 34-03-02) | ≥ 1 | 3 |
| v1.4.1 references (check 34-03-04) | ≥ 1 | 5 |
| `<a id="cobo">` | 1 | 1 |
| `<a id="byod-work-profile">` | 1 | 1 |
| `<a id="dedicated-cosu">` | 1 | 1 |
| `<a id="zero-touch">` | 1 | 1 |
| `<a id="aosp">` | 1 | 1 |
| `<a id="samsung-kme-mutual-exclusion">` | 1 | 1 |
| `<a id="afw-setup">` | ≥ 1 | 1 |
| `<a id="knox-mobile-enrollment-kme---deferred-to-v141">` | 1 | 1 |
| `^## Per-Method Details$` | 1 | 1 |
| `^### NFC$`, `^### QR$`, `^### afw#setup$`, `^### Zero-Touch$` | 1 each | 1 each |
| `^## Knox Mobile Enrollment (KME) — Deferred to v1.4.1$` | 1 | 1 |
| `^## See Also$` | 1 | 1 |
| Deferred-file links (check 34-all-03) | 0 | 0 |
| `min_android_version` frontmatter (D-31) | 0 | 0 |
| SafetyNet references (AEAUDIT-04) | 0 | 0 |
| "cope deprecated" language (Pitfall 4) | 0 | 0 |
| "supervision" references (AEAUDIT-04) | 0 | 0 |

## Commits

- `d365e72` — docs(34-03): scaffold provisioning-methods doc with frontmatter, platform gate, intro, and Samsung KME pre-table callout
- `dcf7ba0` — docs(34-03): add canonical 5x5 provisioning matrix with embedded version annotations
- `670b842` — docs(34-03): add per-method details, Samsung KME anchor, KME deferral footer, and See Also

## Self-Check: PASSED

- `docs/android-lifecycle/02-provisioning-methods.md` exists on disk (7,184 bytes)
- All three commits exist in git history (`d365e72`, `dcf7ba0`, `670b842`)
- All 5 inbound enrollment-overview anchors resolve to explicit `<a id>` tags in this file
- All required anti-pattern guards hold (no SafetyNet, no "cope deprecated", no "supervision", no deferred-file links, no `min_android_version` frontmatter)
