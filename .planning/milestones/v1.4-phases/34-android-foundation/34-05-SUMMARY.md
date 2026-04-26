---
phase: 34-android-foundation
plan: 05
subsystem: documentation / admin-template
tags:
  - android
  - admin-template
  - tri-portal
  - AEBASE-05
requires:
  - .planning/phases/34-android-foundation/34-CONTEXT.md (D-16 through D-22)
  - .planning/phases/34-android-foundation/34-PATTERNS.md (admin-template-android authoring guidance)
  - docs/_templates/admin-template-macos.md (dual-portal precedent)
  - docs/_templates/admin-template-ios.md (dual-portal precedent, subtractive-deletion pattern)
provides:
  - docs/_templates/admin-template-android.md (tri-portal Android Enterprise admin guide template)
affects:
  - Phase 35-39 admin guides (Managed Google Play, Zero-Touch portal, Fully Managed COBO, BYOD Work Profile, Dedicated devices) — all will copy this template as their starting point
tech-stack:
  added: []
  patterns:
    - tri-portal-H4-sub-section-instantiation (new; extends dual-portal pattern from iOS/macOS)
    - subtractive-deletion-HTML-comment-for-conditional-subsection (adopted from iOS/macOS template precedent)
    - mandatory-by-default-Renewal-Maintenance (Android-specific divergence from optional-Renewal in iOS/macOS)
key-files:
  created:
    - docs/_templates/admin-template-android.md (8,756 bytes, 128 lines)
  modified: []
decisions:
  - D-16 applied: 3 H4 portal sub-sections in locked order — `#### In Intune admin center`, `#### In Managed Google Play`, `#### In Zero-Touch portal`
  - D-17 applied: subtractive-deletion HTML comment before `#### In Zero-Touch portal` contains the verbatim locked text "Delete this entire subsection for BYOD Work Profile and AOSP admin guides"
  - D-18 applied: `#### In Managed Google Play` subsection is NOT wrapped in a subtractive-deletion HTML comment (MGP mandatory for all GMS-based modes)
  - D-19 applied: three `> **What breaks if misconfigured:**` callouts seeded (one per portal sub-section) with cross-portal symptom language; total of 6 occurrences in the template (3 in the pattern HTML comment block, 3 in the Steps sub-sections)
  - D-20 applied: `## Renewal / Maintenance` is mandatory-by-default and has NO preceding `<!-- Include this section ONLY if ... -->` subtractive-deletion comment (Android diverges from iOS/macOS here)
  - D-21 applied: frontmatter has literal `platform: Android` and `audience: admin`; `last_verified` and `review_by` are YYYY-MM-DD placeholders; HTML comment header states 60-day review cycle (not 90)
  - D-22 applied: file lives at `docs/_templates/admin-template-android.md`, not numbered inside the admin-setup-android/ sequence
metrics:
  duration: ~15 minutes
  tasks_completed: 4
  files_created: 1
  commits: 4
  completed: 2026-04-21
---

# Phase 34 Plan 05: Admin Template (Android) Summary

**One-liner:** Created `docs/_templates/admin-template-android.md` — a tri-portal Android Enterprise admin guide template with three H4 portal sub-sections (Intune admin center, Managed Google Play, Zero-Touch portal), subtractive-deletion ZT wrapper, mandatory-by-default Renewal/Maintenance section, and 60-day review cycle — ready for Phase 35-39 authors to copy as the starting point for 5+ downstream admin guides.

## What Was Built

One new markdown file: `docs/_templates/admin-template-android.md` (8,756 bytes, 128 lines).

Structure from top to bottom:
1. Author-instruction HTML comment (60-day review cycle, tri-portal rules, MGP mandatory, Renewal mandatory, Android Platform Lead reviewer)
2. Frontmatter with literal `platform: Android`, `audience: admin`, placeholder `last_verified: YYYY-MM-DD`, placeholder `review_by: YYYY-MM-DD`
3. H1 title placeholder
4. Platform-gate blockquote referencing Intune admin center, Managed Google Play, Zero-Touch portal, and linking to `../_glossary-android.md`
5. "What breaks if misconfigured" callout-pattern instruction HTML comment with tri-portal cross-portal symptom directive
6. `## Prerequisites` (4 bullet placeholders: admin role, license/subscription, prior config, portal access)
7. `## Steps` with `### Step 1` containing three H4 portal sub-sections in locked order:
   - `#### In Intune admin center` (not wrapped)
   - `#### In Managed Google Play` (not wrapped per D-18)
   - Verbatim D-17 subtractive-deletion HTML comment
   - `#### In Zero-Touch portal`
   - Step 2 placeholder stub indicating the pattern repeats
8. `## Verification` with 3 checklist items (one per portal), conditional-OMIT note on ZT item
9. `## Configuration-Caused Failures` table with canonical 4-column header (Misconfiguration | Portal | Symptom | Runbook) and 3 seed rows (2 abstract placeholders + 1 concrete cross-portal MGP→Intune example)
10. `## Renewal / Maintenance` — MANDATORY, NOT wrapped in subtractive-deletion comment (D-20 divergence from iOS/macOS). Seeded with 3 rows: MGP binding (Entra-backed), enrollment profile tokens (QR/DPC/COBO), ZT reseller contract
11. `## See Also` linking to the other 4 Phase 34 deliverables (enrollment-overview, provisioning-methods, version-matrix, _glossary-android) — no links to deferred v1.5 files

## Validation Sweep (all checks pass)

Per-task grep checks from 34-05-PLAN.md `<verification>` block and 34-VALIDATION.md:

| Check | Result | Details |
|-------|--------|---------|
| 34-05-01: `#### In Intune admin center` count ≥ 1 | PASS | 1 |
| 34-05-01: `#### In Managed Google Play` count ≥ 1 | PASS | 1 |
| 34-05-01: `#### In Zero-Touch portal` count ≥ 1 | PASS | 1 |
| 34-05-02: Subtractive-deletion HTML comment verbatim (contains "Delete this entire subsection for BYOD Work Profile and AOSP") | PASS | 1 match; verified immediately above the `#### In Zero-Touch portal` heading (grep -B 5 finds it with one blank line separator, canonical pattern from admin-template-macos lines 76-77) |
| 34-05-03: "What breaks if misconfigured" count ≥ 2 | PASS | 6 (3 in Steps sub-sections, 3 in the pattern-explanation HTML comment) |
| 34-05-04: `^## Renewal` count = 1 | PASS | 1 |
| 34-all-02: `^platform: Android$` = 1 | PASS | 1 |
| 34-all-03: Deferred-file links count = 0 | PASS | 0 (after the Task 4 deviation fix — see below) |
| Negative: `supervised-only` / 🔒 count = 0 | PASS | 0 (AEAUDIT-04 clean — Android has no supervision concept) |
| Negative: HTML comment immediately preceding `#### In Managed Google Play` (D-18 guard) | PASS | 0 |
| Negative: "Include this section ONLY if" within 2 lines above `## Renewal` (D-20 guard) | PASS | 0 |
| Negative: `windows-vs-macos.md` references (v1.5 scope guard) | PASS | 0 |

## Locked-Decision Confirmations

- **D-16:** Three H4 portal sub-sections present in the locked order (Intune admin center → Managed Google Play → Zero-Touch portal)
- **D-17:** HTML comment immediately above `#### In Zero-Touch portal` matches the locked 4-line text verbatim — no paraphrasing
- **D-18 MGP-mandatory confirmed:** `grep -B 1 "^#### In Managed Google Play$"` returns a blank-line separator (not an HTML comment); grep -B 5 likewise contains no `<!--` starter. MGP is not wrapped as subtractive — it is a mandatory subsection for all GMS-based modes
- **D-19 Cross-portal callouts seeded:** Three Steps-body callouts demonstrate the pattern; the Managed Google Play callout explicitly calls out the common cross-portal pattern ("Symptom appears in: [often Intune admin center, even though the misconfiguration was made here]")
- **D-20 Renewal mandatory-by-default:** `## Renewal / Maintenance` is preceded only by the Configuration-Caused Failures table's last row and a blank line; no subtractive-deletion HTML comment wraps it. The author-instruction header explicitly prohibits deletion
- **D-21 Frontmatter:** Literal `platform: Android`, literal `audience: admin`, placeholder `last_verified: YYYY-MM-DD`, placeholder `review_by: YYYY-MM-DD`; 60-day review cycle (not 90) noted in author-instruction HTML comment
- **D-22 Placement:** File lives at `docs/_templates/admin-template-android.md` (not numbered in the admin-setup-android/ sequence)

## Renewal Seed Rows (Mandatory-by-Default)

Per RESEARCH.md Open Question 4 Recommendation, the Renewal table is pre-seeded with 3 concrete example rows:
1. **Managed Google Play binding (Entra-backed)** — no expiry if Entra account remains active; re-bind via Intune admin center
2. **Enrollment profile tokens (QR / DPC identifier / COBO token)** — configurable 1-65535 days; regenerate in Intune
3. **Zero-Touch reseller contract** — reseller-specific, typically annual; contact reseller for renewal

Downstream mode-specific admin guides customize per-mode (e.g., a BYOD Work Profile guide can remove the ZT reseller row since BYOD doesn't use ZT).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Verification failure] Author-instruction HTML comment tripping Check 34-all-03 (deferred-file-link guard)**

- **Found during:** Task 4 verification sweep
- **Issue:** The author-instruction HTML comment block (line 22 of the draft) originally listed the deferred-file prohibition by literal filename: "Do NOT link to docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md, or docs/index.md ..." — the grep guard `grep -cE "common-issues\.md|quick-ref-l1\.md|quick-ref-l2\.md"` then counted this prohibition text as a match, returning 1 instead of the required 0. The check was designed to catch accidental links, but pattern-matched the prohibition directive too.
- **Fix:** Restructured the prohibition prose to reference the files by role ("the common-issues symptom router, the L1 and L2 quick-reference cards, or the top-level docs index") rather than by literal `.md` filename. Preserves the instructional intent for doc authors, satisfies the mechanical grep guard.
- **Files modified:** `docs/_templates/admin-template-android.md` (author-instruction HTML comment, ~3 lines)
- **Commit:** `d9ca006` (included in Task 4 commit)

### Intentional Divergences from iOS/macOS Templates (per locked decisions — not deviations)

- **Three H4 portal sub-sections** (vs two in iOS/macOS) per D-16
- **MGP sub-section NOT wrapped in subtractive-deletion comment** (vs both portals in iOS/macOS being mandatory) per D-18
- **Renewal section mandatory-by-default, NOT wrapped in subtractive-deletion comment** (vs optional in iOS/macOS) per D-20
- **60-day review cycle** (vs 90-day for iOS/macOS) per D-14 family
- **No `../windows-vs-macos.md` link in See Also** (v1.5 scope per AECOMPARE-01)
- **No supervised-only / 🔒 glyphs** (AEAUDIT-04 — Android has no "supervision" management concept)

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | `a5f09ce` | Scaffold with HTML header, frontmatter, platform gate, callout-pattern comment |
| 2 | `19ba756` | Prerequisites + Steps with 3 H4 portal sub-sections (ZT wrapped per D-17, MGP not wrapped per D-18) |
| 3 | `1ad27c6` | Verification checklist (3 items) + Configuration-Caused Failures table (3 rows incl. cross-portal example) |
| 4 | `d9ca006` | Renewal/Maintenance (mandatory, not wrapped per D-20) + See Also + Task 4 deviation fix |

## Files

**Created:**
- `docs/_templates/admin-template-android.md` (8,756 bytes, 128 lines)

**Modified:**
- (none)

## Downstream Impact

This template becomes the contract for Phase 35-39 admin setup guides. Authors of:
- Phase 35 MGP binding + ZT portal guides — keep all three H4 sub-sections
- Phase 36 Fully Managed COBO admin guide — keep all three H4 sub-sections
- Phase 37 BYOD Work Profile admin guide — delete the `#### In Zero-Touch portal` subsection per the locked HTML comment; MGP subsection stays
- Phase 38 Dedicated devices admin guide — keep all three H4 sub-sections (dedicated devices use ZT)
- Phase 39 AOSP stub admin guide — additionally deletes `#### In Managed Google Play` (outside this template's scope; Phase 39 writes that using a different pattern per research)

Every downstream guide inherits the 60-day review cycle, mandatory Renewal/Maintenance discipline, and cross-portal "What breaks if misconfigured" callout format.

## Self-Check: PASSED

- FOUND: `docs/_templates/admin-template-android.md` (8,756 bytes)
- FOUND commit `a5f09ce`: scaffold
- FOUND commit `19ba756`: Prerequisites + Steps
- FOUND commit `1ad27c6`: Verification + Configuration-Caused Failures
- FOUND commit `d9ca006`: Renewal/Maintenance + See Also
- All 4 plan-level verify grep blocks return success
- All 34-VALIDATION.md check IDs applicable to this plan (34-05-01 through 34-05-04, 34-all-02, 34-all-03) return the expected values
- Zero deviations beyond the one documented auto-fix (Rule 1 — grep-guard collision on prohibition prose)

## Threat Flags

(None — no new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. Template is a markdown skeleton for doc authors; T-34-09 through T-34-12 from the plan's threat register are addressed by the grep checks above.)
