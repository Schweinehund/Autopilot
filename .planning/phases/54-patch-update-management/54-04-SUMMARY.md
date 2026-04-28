---
phase: 54
plan: 04
subsystem: docs/operations/patch-management
tags: [ios, ddm, update-lifecycle, supervised-only-retraction, august-2025, patch-05]
requires:
  - .planning/phases/54-patch-update-management/54-CONTEXT.md
  - .planning/phases/54-patch-update-management/54-RESEARCH.md
  - .planning/phases/54-patch-update-management/54-PATTERNS.md
  - .planning/phases/54-patch-update-management/54-VALIDATION.md
provides:
  - "iOS DDM update enforcement guide (PATCH-05): TargetOSVersion / TargetBuildVersion / TargetLocalDateTime / OfferPrograms keys; supervised-only-DDM constraint retracted Aug 2025; DDM works on unsupervised iOS 17+ devices"
  - "Cross-link target for PATCH-06 retrofit at docs/admin-setup-ios/07-device-enrollment.md:35 (POSITIVE half of V-54-19 NEGATIVE+POSITIVE pair)"
  - "Cross-link target for PITFALL-13 forward-link append at docs/admin-setup-ios/04-configuration-profiles.md:128"
affects:
  - docs/operations/patch-management/03-ios-update-lifecycle.md
tech-stack:
  added: []
  patterns:
    - "Cross-platform inline `> **Platform applicability:**` blockquote at TOP (D-04 + 2B-prime; pointer-only routing)"
    - "Single-inline `> ⚠️` blockquote at the supervised-only-DDM-retraction site (D-12 NO Deadlines H2; D-14 single-callout for soft cutover)"
    - "DDM update keys table enumeration (4 keys: TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms)"
    - "Supervision Matrix table (pre-Aug-2025 vs post-Aug-2025; ADE/Apple Business Manager / Apple School Manager / Device Enrollment / User Enrollment / Account-driven Device Enrollment)"
    - "60-day frontmatter cycle (last_verified 2026-04-28 → review_by 2026-06-27)"
key-files:
  created:
    - docs/operations/patch-management/03-ios-update-lifecycle.md
  modified: []
decisions:
  - "CD-10: callout framing uses `> ⚠️ **August 2025 retraction:**` (V-54-18 token-coverage satisfied within callout via TargetOSVersion + TargetBuildVersion + TargetLocalDateTime + OfferPrograms enumeration in same blockquote)"
  - "Supervision Matrix H2 included alongside the inline retraction callout to give admins the pre-/post-Aug-2025 cell distinction (per D-13 enrollment-type × supervision-state matrix)"
  - "Rollout Patterns H2 included to give admins actionable +14d/+30d/+7d ring-deadline guidance (admin-actionable iOS update rollout pattern; complements DDM Update Keys reference)"
metrics:
  duration_seconds: 89
  duration_human: "~1.5 min authoring + verification"
  completed: 2026-04-28
  files_created: 1
  files_modified: 0
  line_count: 127
---

# Phase 54 Plan 04: iOS Update Lifecycle Guide Summary

Authored `docs/operations/patch-management/03-ios-update-lifecycle.md` — the iOS-specific patch management guide covering PATCH-05 (DDM update keys + August 2025 supervised-only-DDM retraction for iOS 17+ unsupervised devices) — using D-04 cross-platform inline blockquote + D-12/D-14 single-inline `> ⚠️` callout (NO Deadlines H2) + D-19 `platform: iOS` frontmatter pattern, satisfying V-54-04/07/18/26/27/30 mechanical assertions.

## What Was Built

A 127-line iOS/iPadOS DDM update enforcement reference at `docs/operations/patch-management/03-ios-update-lifecycle.md`, structured as the iOS-specific entry in the Phase 54 5-file patch-management suite. The file establishes DDM (Declarative Device Management) as the canonical iOS 17+ update enforcement primitive, enumerates the four DDM update keys (`TargetOSVersion`, `TargetBuildVersion`, `TargetLocalDateTime`, `OfferPrograms`), and explicitly retracts the prior supervised-only-DDM constraint that previously gated DDM update enforcement to ADE-supervised iOS devices only.

The retraction landed via a single inline `> ⚠️ **August 2025 retraction:**` blockquote at the retraction site — per CONTEXT D-12 (NO Deadlines H2 for iOS) and D-14 (soft cutovers get single-callout treatment, not the three-layer HARD-DEADLINE pattern reserved for macOS Apple OS 26 + Android MEETS_STRONG_INTEGRITY).

## Sections Authored

| Section | H-level | Purpose |
|---------|---------|---------|
| Frontmatter | (yaml) | `platform: iOS`, `audience: admin`, 60-day cycle (2026-04-28 → 2026-06-27), `applies_to: all` (V-54-07) |
| Platform applicability blockquote | (blockquote at TOP) | Pointer-only routing to 00-overview + 3 sibling per-platform files (V-54-26, D-04 + 2B-prime) |
| H1 + intro paragraph | H1 | DDM-as-canonical iOS 17+ enforcement framing + August 2025 retraction preview |
| iOS Update Enforcement Model | H2 | Declarative / per-device-assertion / OS-managed-notification model + Intune configuration path + iOS 17.0 eligibility floor |
| DDM Update Keys | H2 (#ddm-update-keys) | 4-key reference table (TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms) — V-54-18 token coverage anchor |
| Supervised-Only Retraction (Effective August 2025) | H2 | Inline `> ⚠️` blockquote with full V-54-18 token coverage (unsupervised + iOS 17 + August 2025 + all 4 DDM keys) + BYOD-fleet implications + cross-link back-pointer to v1.3 retrofit at `07-device-enrollment.md:35` |
| Supervision Matrix: DDM Update Enforcement | H2 | 5-row × 4-column table: ADE / Apple School Manager / Device Enrollment / User Enrollment / Account-driven DE × Supervision × Pre-Aug-2025 × Post-Aug-2025 |
| Rollout Patterns | H2 | 3-stage admin-actionable rollout (Pilot +14d / Broad +30d / Critical +7d) with pre-/post-Aug-2025 supervision-state contrast |
| Related Resources | H2 | Cross-links to 00-overview + 3 sibling per-platform files |
| External References | H2 | 4 external links: MS Learn iOS software updates guide + iOS device restrictions + Apple Developer DDM software-update enforcement docs + Apple Platform Deployment software-update guide |

## V-54-NN Assertions Satisfied

| V-54-NN | Assertion | Result | Evidence |
|---------|-----------|--------|----------|
| V-54-04 | File exists at `docs/operations/patch-management/03-ios-update-lifecycle.md` | PASS | 127 lines, byte-stable |
| V-54-07 | Frontmatter contains `platform: iOS` + `audience: admin` + 60-day `last_verified`/`review_by` cycle | PASS | `platform: iOS` (1); `audience: admin` (1); `last_verified: 2026-04-28` + `review_by: 2026-06-27` (60 days exactly) |
| V-54-18 | Literal coverage: `unsupervised` AND `iOS 17` AND (`August 2025` OR `Aug 2025`) AND ≥2 of 4 DDM update keys | PASS | `unsupervised`: 6; `iOS 17`: 6; `August 2025\|Aug 2025`: 5; `TargetOSVersion`: 5, `TargetBuildVersion`: 2, `TargetLocalDateTime`: 7, `OfferPrograms`: 2 — ALL 4 DDM keys present (exceeds ≥2 floor) |
| V-54-26 | `> **Platform applicability:**` blockquote within first 50 lines (post-frontmatter) | PASS | 1 occurrence at line 9 (immediately post-frontmatter) |
| V-54-27 | NEGATIVE: NO bare `> **Platform:**` token (lexicon-family preservation) | PASS | 0 occurrences (file uses `> **Platform applicability:**` exclusively) |
| V-54-30 | NEGATIVE: NO TBD/TODO/FIXME/XXX/PLACEHOLDER tokens | PASS | 0 occurrences via `\b(TBD\|TODO\|FIXME\|XXX\|PLACEHOLDER)\b` regex |

## PATCH-05 Traceability

PATCH-05 (REQUIREMENTS line 165 → REQ traceability table line 165) maps verbatim to this file. PATCH-05 scope: "DDM update keys (TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms) work on UNSUPERVISED iOS 17+ devices effective August 2025; supervised-only constraint retracted explicitly."

**Coverage proof:** All 4 DDM update keys enumerated (DDM Update Keys H2 table). Unsupervised + iOS 17 + August 2025 retraction stated explicitly in dedicated H2 + inline `> ⚠️` callout. Supervision Matrix H2 distinguishes pre-/post-Aug-2025 cells across 5 enrollment types.

## SC#3 First Conjunct Satisfaction

ROADMAP §Phase 54 SC#3 verbatim: "Admin reading new `docs/operations/patch-management/03-ios-update-lifecycle.md` sees the supervised-only DDM constraint is retracted for iOS 17+ effective Aug 2025 (DDM works on unsupervised devices) AND `docs/admin-setup-ios/07-device-enrollment.md:35` v1.3 supervised-only-DDM cell is surgically retrofitted same-commit-atomic with this new content."

- **First conjunct (this file):** Fully satisfied. Section "Supervised-Only Retraction (Effective August 2025)" + inline `> ⚠️` callout state the retraction explicitly with all V-54-18 tokens present.
- **Second conjunct (54-06):** Owned by sibling plan 54-06 (PATCH-06 surgical retrofit at `07-device-enrollment.md:35`). The atomic commit owned by 54-09 enforces same-commit landing per CONTEXT D-21 + CDI-Phase54-05.

## Atomic Commit Dependency Note

**This plan does NOT commit.** Per CONTEXT D-21 + CDI-Phase54-05 + ROADMAP line 271 v1.4.1 atomicity lesson, the entire Phase 54 deliverable bundle ships in a single atomic commit owned by 54-09:

1. 5 new patch-management content files (54-01 through 54-05)
2. PATCH-06 surgical retrofit at `docs/admin-setup-ios/07-device-enrollment.md:35` (54-06)
3. PITFALL-13 forward-link append at `docs/admin-setup-ios/04-configuration-profiles.md:128` (54-07)
4. REQ + ROADMAP errata (54-08): `05-compliance-policy.md` literal → `07-device-enrollment.md` at REQUIREMENTS:55, REQUIREMENTS:166, ROADMAP:267
5. `scripts/validation/check-phase-54.mjs` validator (54-09)

**Same-commit-atomic with 54-06 (V-54-19 retrofit pair coupling):** The validator's V-54-19 NEGATIVE+POSITIVE assertion pair MECHANICALLY enforces single-commit landing — POSITIVE half asserts cross-link target file `03-ios-update-lifecycle.md` exists (this file); NEGATIVE half asserts `Supervised-only in iOS 17+ enforcement policies` cell text is absent at `07-device-enrollment.md:35`. Splitting fails V-54-19 in commit-1 regardless of order.

This file's existence is the POSITIVE half of V-54-19. The 54-06 cell-edit is the NEGATIVE half. Both must land in the same commit.

## Deviations from Plan

None — plan executed exactly as written. The plan provided all section content verbatim including the Aug 2025 retraction blockquote text and the Supervision Matrix table; only the externally-noted plan-author-discretion choices (CD-10 callout framing — used "August 2025 retraction" form per 54-PATTERNS.md lines 293-297 recommendation) were resolved.

## Self-Check: PASSED

**Created files:**
- `docs/operations/patch-management/03-ios-update-lifecycle.md` — FOUND (127 lines)

**Cross-link integrity (paths resolve from `docs/operations/patch-management/`):**
- `00-overview.md` (sibling) — 3 occurrences in body; resolves to `docs/operations/patch-management/00-overview.md` (will exist post-54-01)
- `01-windows-wufb-rings.md` (sibling) — 2 occurrences; resolves to `docs/operations/patch-management/01-windows-wufb-rings.md` (54-02)
- `02-macos-update-enforcement.md` (sibling) — 3 occurrences; resolves to `docs/operations/patch-management/02-macos-update-enforcement.md` (54-03)
- `04-android-patch-delivery.md` (sibling) — 2 occurrences; resolves to `docs/operations/patch-management/04-android-patch-delivery.md` (54-05)

**Reverse-link target (PATCH-06 retrofit at `07-device-enrollment.md:35`):** This file's path `docs/operations/patch-management/03-ios-update-lifecycle.md` is the cross-link target for the retrofit. Relative path from `docs/admin-setup-ios/07-device-enrollment.md` is `../../operations/patch-management/03-ios-update-lifecycle.md` — 2-level up navigation resolves correctly.

**No commit made:** Confirmed — `git status` will show `docs/operations/patch-management/03-ios-update-lifecycle.md` as untracked + `.planning/phases/54-patch-update-management/54-04-SUMMARY.md` as untracked, both staged-but-not-committed per atomicity contract.

## Known Stubs

None. The file is fully populated; all sections contain substantive content.
