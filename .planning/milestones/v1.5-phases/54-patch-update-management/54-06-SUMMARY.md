---
phase: 54
plan: 06
subsystem: docs/admin-setup-ios
tags: [patch-management, ios, ddm, surgical-retrofit, atomic-commit, PATCH-06]
requirements_addressed: [PATCH-06]
dependency_graph:
  requires:
    - "54-04 (creates docs/operations/patch-management/03-ios-update-lifecycle.md — cross-link target)"
  provides:
    - "PATCH-06 surgical retrofit landed: 07-device-enrollment.md:35 cell now retracts the v1.3 supervised-only-DDM constraint per Aug 2025 iOS 17+ unsupervised DDM availability"
    - "Forward cross-link from admin-setup-ios capability table → operations/patch-management/03-ios-update-lifecycle.md (canonical iOS update enforcement guide)"
  affects:
    - "docs/admin-setup-ios/07-device-enrollment.md (line 35 only; all other content byte-identical preserved)"
tech_stack:
  added: []
  patterns:
    - "Phase 47 v1.4.1 surgical-retrofit-with-cross-link family (single-cell semantic correction + same-commit cross-link to canonical guide)"
    - "V-54-19 NEGATIVE+POSITIVE coupling — mechanically enforces atomic commit with 54-04"
key_files:
  created: []
  modified:
    - "docs/admin-setup-ios/07-device-enrollment.md (line 35 surgical cell-edit)"
decisions:
  - "Adopted PATTERNS.md verbatim post-edit cell text (CD-09 plan-author wording discretion exercised by reusing the patterns-paste-ready string verbatim — minimizes drift risk against V-54-19 POSITIVE regex)"
  - "Preserved frontmatter (no last_verified refresh) per CONTEXT D-21 + acceptance_criteria — surgical retraction is not a substantive content rewrite"
  - "DID NOT COMMIT — atomic commit owned by 54-09 per CONTEXT D-21 + CDI-Phase54-05; staging only"
metrics:
  duration: "~5 minutes"
  completed: "2026-04-28"
---

# Phase 54 Plan 06: PATCH-06 Surgical Retrofit at 07-device-enrollment.md:35 Summary

PATCH-06 surgical cell-edit at `docs/admin-setup-ios/07-device-enrollment.md:35` retracts the v1.3 "supervised-only-DDM" claim and adds a forward cross-link to `03-ios-update-lifecycle.md` (created by 54-04 in Wave 1) — single-line transform with all other content byte-identical preserved; staged for 54-09 atomic commit.

## File Path + Line Edited

- **File:** `docs/admin-setup-ios/07-device-enrollment.md`
- **Line edited:** Line 35 only (single cell in the unsupervised-capability comparison table)
- **Edit scope:** Surgical single-cell content replacement; all other lines (frontmatter, header, lines 36-39 other supervised-only cells, table footer, body, version history) are byte-identical to pre-edit state

## Pre-Edit Cell (Line 35 Verbatim)

```markdown
| OS update enforcement (forced install deadlines via DDM or device restrictions) | **No** | Supervised-only in iOS 17+ enforcement policies. |
```

## Post-Edit Cell (Line 35 Verbatim)

```markdown
| OS update enforcement (forced install deadlines via DDM) | **Yes (DDM, iOS 17+)** / **No (legacy MDM device restrictions)** | DDM-based "iOS/iPadOS update policies" works on unsupervised iOS 17+ devices (basic keys: TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms). Legacy device-restrictions "Defer software updates" remains supervised-only and is being deprecated. See [iOS Update Lifecycle](../../operations/patch-management/03-ios-update-lifecycle.md). |
```

## V-54-19 Assertion Pair Satisfaction

| Half | Assertion | Verification | Status |
|------|-----------|--------------|--------|
| NEGATIVE | File does NOT contain literal `Supervised-only in iOS 17+ enforcement policies` | `grep -c` returns 0 | PASS |
| POSITIVE 1 | Regex `(?i)DDM.*unsupervised.*iOS\s*17` matches in body | grep -iE matches at line 35 | PASS |
| POSITIVE 2 | Literal cross-link `../../operations/patch-management/03-ios-update-lifecycle.md` present | `grep -c` returns 1 | PASS |

## Byte-Identical Preservation Verification

| Line | Content Anchor | Status |
|------|----------------|--------|
| 1-7  | Frontmatter (last_verified: 2026-04-18, review_by: 2026-07-17, platform: iOS) | UNCHANGED — no last_verified refresh per acceptance_criteria |
| 36   | `Supervised-only restrictions (block App Store, disable iCloud Backup, ...)` | UNCHANGED — different capability set; not retracted |
| 37   | `Activation Lock bypass | **No** | Requires supervised mode.` | UNCHANGED |
| 38   | `Lost Mode | **No** | Supervised-only MDM command.` | UNCHANGED — Lost Mode is genuinely supervised-only |
| 39   | `Single App Mode / kiosk configurations | **No** | Supervised-only; ...` | UNCHANGED — kiosk is genuinely supervised-only |
| 40   | `Await final configuration ...` | UNCHANGED |

## PATCH-06 Traceability + SC#3 Second Conjunct Satisfaction

- **PATCH-06** (REQUIREMENTS.md line 166: "v1.3 iOS supervised-only-DDM callout retrofitted in Phase 54 same-commit-atomic"): **Fully covered** — this is the surgical retrofit target file per CONTEXT D-06 off-ballot referee override (file-system verified: REQ literal `05-compliance-policy.md` is off-by-one wrong; 07-CONTEXT-MD references the correct file `07-device-enrollment.md:35` which 54-08 errata bundle will repair across REQ/ROADMAP literal sites)
- **ROADMAP §Phase 54 SC#3 second conjunct** (v1.3 supervised-only-DDM callout surgically retrofitted same-commit per v1.4.1 atomicity lesson): **Fully covered** — single-cell surgical retrofit at line 35; cross-link to `03-ios-update-lifecycle.md` will resolve in atomic commit when 54-04's file lands together

## Atomic Commit Dependency (CRITICAL — 54-09 owns)

This retrofit MUST land in the same atomic commit as 54-04's `docs/operations/patch-management/03-ios-update-lifecycle.md` creation. The V-54-19 NEGATIVE+POSITIVE coupling mechanically enforces this:

- If commit-1 contains the retrofit but NOT 54-04's file → V-54-19 POSITIVE half (cross-link target file `03-ios-update-lifecycle.md` does not exist) FAILS
- If commit-1 contains 54-04's file but NOT the retrofit → V-54-19 NEGATIVE half (pre-edit `Supervised-only in iOS 17+ enforcement policies` text still present) FAILS

Both halves pass only when both files ship in a single atomic commit per CONTEXT D-21 + CDI-Phase54-05.

## Deviations from Plan

None — plan executed exactly as written. Pre-edit text matched the plan-asserted verbatim string at line 35; post-edit cell uses the PATTERNS.md / plan-suggested wording verbatim (CD-09 wording discretion bounded by retraction-content + cross-link contract).

## Commit Status

**NOT COMMITTED.** Per CONTEXT D-21 + CDI-Phase54-05, atomic commit is owned by 54-09 author. This plan stages files only:

- `docs/admin-setup-ios/07-device-enrollment.md` (modified)
- `.planning/phases/54-patch-update-management/54-06-SUMMARY.md` (created)

54-09 author will assemble the single atomic commit containing all Phase 54 deliverables (5 new patch-management files, this retrofit, 04-configuration-profiles.md forward-link append, REQ/ROADMAP errata bundle, validator).

## Self-Check: PASSED

- File `docs/admin-setup-ios/07-device-enrollment.md` exists and contains the retrofitted line 35 (verified via Read tool)
- V-54-19 NEGATIVE: `grep -c "Supervised-only in iOS 17+ enforcement policies"` returns 0 (verified)
- V-54-19 POSITIVE 1: `grep -iE "DDM.*unsupervised.*iOS *17"` matches at line 35 (verified)
- V-54-19 POSITIVE 2: `grep -c "\.\./\.\./operations/patch-management/03-ios-update-lifecycle\.md"` returns 1 (verified)
- Byte-identical preservation: lines 36, 38, 39 supervised-only cells UNCHANGED (verified via grep)
- Frontmatter preserved: line 2 `last_verified: 2026-04-18` UNCHANGED (verified via Read)
- No commit created (per atomicity contract; 54-09 owns)
