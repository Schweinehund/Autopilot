---
phase: 58
plan: 58-02
subsystem: docs/reference (capability matrices)
tags: [docs, capability-matrix, conditional-access, retrofit, append-only, gfm-anchor]
dependency_graph:
  requires:
    - 58-01 pre-edit anchor inventory (.planning/phases/58-defer-08-4-platform-capability-comparison/58-ANCHOR-INVENTORY.md) — D-15 / PITFALL-6 baseline gate
  provides:
    - macos-capability-matrix.md#conditional-access (new GFM anchor; Plan 58-03 cell-link target)
    - ios-capability-matrix.md#conditional-access (new GFM anchor; Plan 58-03 cell-link target)
    - android-capability-matrix.md#conditional-access (new GFM anchor; Plan 58-03 cell-link target)
    - V-58-11 / V-58-12 / V-58-13 anchor-pin assertion targets (Plan 58-05 validator)
  affects:
    - docs/reference/macos-capability-matrix.md (modified; +H2 between Software Updates and Key Gaps Summary)
    - docs/reference/ios-capability-matrix.md (modified; +H2 between Software Updates and Key Gaps Summary)
    - docs/reference/android-capability-matrix.md (modified; +H2 between Software Updates and Cross-Platform Equivalences)
tech-stack:
  added: []
  patterns:
    - append-only contract on existing H2 literals (5 H2 byte-identical pre/post per matrix)
    - GFM-deterministic anchor slug (#conditional-access — lowercase ASCII space-to-hyphen; PITFALL-15 sidestep)
    - anchor-preservation when surrounding content shifts (Phase 45 AEAOSPFULL-09 inheritance — both Android `<a id>` literals preserved verbatim)
    - per-platform verdict prose richer than 5-state vocabulary lock (D-02 vocabulary applies to comparison-doc cells, not source-matrix prose)
key-files:
  created: []
  modified:
    - docs/reference/macos-capability-matrix.md
    - docs/reference/ios-capability-matrix.md
    - docs/reference/android-capability-matrix.md
decisions:
  - D-04 mandatory tier-2 retrofit shipped: 3 sibling matrices now have Conditional Access H2 (Linux already had one pre-Phase-58)
  - macOS CA H2 = 3-column (Feature/Win/macOS); iOS CA H2 = 4-column (Feature/Win/macOS/iOS); Android CA H2 = 7-column (Feature + 5 GMS modes + AOSP) — column count mirrors host matrix
  - 5 CA features per matrix mirror Linux template (lines 59-66): Device-based CA / Web-app CA / Per-app CA (MAM or MAM-WE) / App-based CA Approved Client App / Risk-based CA
  - Insertion location: macOS + iOS = between Software Updates and Key Gaps Summary; Android = between Software Updates and Cross-Platform Equivalences (per PLAN insertion-zone spec)
  - Both Android `<a id="deferred-...">` compat shim anchors preserved verbatim (lines shifted to ~134/142 post-insertion; anchor strings byte-identical)
metrics:
  duration: ~2 min (sequential single-agent execution)
  completed: 2026-05-01T04:48:33Z
  tasks: 2
  commits: 2
  files_modified: 3
---

# Phase 58 Plan 58-02: Conditional Access H2 Retrofit Summary

CA H2 retrofitted into 3 sibling matrices (macOS / iOS / Android); 3 new `#conditional-access` anchors live; SC#1 "no column unacknowledged" anchor targets ready for Plan 58-03.

## Outcome

Plan 58-02 satisfies CONTEXT D-04 mandatory tier-2 retrofit. The 3 sibling capability matrices (macOS, iOS, Android) — which previously had only 5 H2s each (Enrollment / Configuration / App Deployment / Compliance / Software Updates) — now each contain a 6th `## Conditional Access` H2 mirroring the Linux matrix's existing CA H2 structure (lines 59-66). The Linux matrix was untouched in this plan (Plan 58-04 owns Linux line 70 + line 112 hedge-removal).

GFM-derived `#conditional-access` anchors are now resolvable in all 3 retrofitted matrices, providing the architectural prerequisite for Plan 58-03 (comparison-doc CA H2 row cells linking to `macos-capability-matrix.md#conditional-access` / `ios-capability-matrix.md#conditional-access` / `android-capability-matrix.md#conditional-access`).

## Pre-Flight Gate Verification

`58-ANCHOR-INVENTORY.md` exists at `.planning/phases/58-defer-08-4-platform-capability-comparison/58-ANCHOR-INVENTORY.md` (Plan 58-01 deliverable, committed at `16b98ad` on 2026-05-01). D-15 / PITFALL-6 baseline gate: SATISFIED before edits began. Pre-edit baseline HEAD recorded as `22161b9b` for VERIFICATION.md cross-check.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Insert `## Conditional Access` H2 into macOS + iOS matrices (Apple platforms) | `54a70b8` | docs/reference/macos-capability-matrix.md, docs/reference/ios-capability-matrix.md |
| 2 | Insert `## Conditional Access` H2 into Android matrix (multi-mode 7-column) | `6d3ce98` | docs/reference/android-capability-matrix.md |

## Retrofit Details

### macOS matrix (`docs/reference/macos-capability-matrix.md`)

- New H2 `## Conditional Access` inserted at line 78 (between former line 77 Software Updates body and former line 78 Key Gaps Summary, which now sits at line 88).
- Table: 3 columns (Feature / Windows / macOS).
- 5 CA feature rows: Device-based CA, Web-app CA via Edge, Per-app CA (MAM), App-based CA / Approved Client App, Risk-based CA.
- macOS-specific notes: "user affinity required" cross-reference to `#compliance`; Microsoft Edge / Safari with Single Sign-On Extension; MAM-WE noted as iOS-primary (macOS uses configuration profiles + DeviceID surface).

### iOS matrix (`docs/reference/ios-capability-matrix.md`)

- New H2 `## Conditional Access` inserted at line 80 (between former line 79 Software Updates body and former line 80 Key Gaps Summary, which now sits at line 90).
- Table: 4 columns (Feature / Windows / macOS / iOS).
- 5 CA feature rows: Device-based CA, Web-app CA via Edge / Safari, Per-app CA (MAM-WE), App-based CA / Approved Client App, Risk-based CA.
- iOS-specific notes: supervised attestation strengthens device-state signal; jailbreak detection on unsupervised; MAM-WE selective-wipe + per-app PIN works on devices NOT enrolled in Intune MDM; Microsoft Authenticator / Outlook / Edge family per-app token broker; Microsoft Defender for Endpoint device-risk signals.

### Android matrix (`docs/reference/android-capability-matrix.md`)

- New H2 `## Conditional Access` inserted at line 76 (between former line 75 Software Updates body and former line 76 Cross-Platform Equivalences, which now sits at line 86).
- Table: 7 columns (Feature / COBO / COPE / BYOD / Dedicated / ZTE / AOSP) — mirrors existing Android matrix multi-mode column structure.
- 5 CA feature rows: Device-based CA, Web-app CA via Edge / Chrome, Per-app CA (MAM), App-based CA / Approved Client App, Risk-based CA.
- Android-specific notes: Play Integrity attestation per-mode (full device-wide on COBO/Dedicated/ZTE; work-profile-scoped on COPE/BYOD); MAM-WE pattern available for non-enrolled BYOD; AOSP cells use existing matrix convention "AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md)" with the Device-based CA row carrying the additional architectural-constraint qualifier "(Play Integrity not available on non-GMS hardware)".

## Append-Only Contract Verification

| Matrix | 5 existing H2 literals byte-identical | Compat shim anchors preserved | Frontmatter unchanged | Intro paragraph unchanged |
|--------|---------------------------------------|-------------------------------|-----------------------|--------------------------|
| macOS | YES (Enrollment line 13, Configuration line 28, App Deployment line 42, Compliance line 56, Software Updates line 68 — all unchanged) | n/a (no `<a id>` anchors in macOS matrix) | YES | YES (Plan 58-04 owns intro 5C edit) |
| iOS | YES (Enrollment line 13, Configuration line 30, App Deployment line 44, Compliance line 57, Software Updates line 70 — all unchanged) | n/a (no `<a id>` anchors in iOS matrix) | YES | YES (Plan 58-04 owns intro 5C edit) |
| Android | YES (Enrollment line 14, Configuration line 31, App Deployment line 44, Compliance line 56, Software Updates line 67 — all unchanged) | YES (3 anchors verified: `<a id="knox-mobile-enrollment-row">`, `<a id="deferred-full-aosp-capability-mapping">`, `<a id="deferred-4-platform-unified-capability-comparison">` — all preserved verbatim, line numbers shifted by +10 from anchor-inventory baseline due to inserted CA H2) | YES | YES (Plan 58-04 owns intro 5C edit + footer F3) |

Linux matrix (`docs/reference/linux-capability-matrix.md`) was UNTOUCHED — `git diff HEAD~2 HEAD docs/reference/linux-capability-matrix.md` returns empty diff. The Linux matrix already had its `## Conditional Access` H2 at line 59 pre-Phase-58 (Linux is excluded from D-04 scope).

## Cross-Matrix H2 Grep Audit (Post-Edit)

```
docs/reference/macos-capability-matrix.md:13:## Enrollment
docs/reference/macos-capability-matrix.md:28:## Configuration
docs/reference/macos-capability-matrix.md:42:## App Deployment
docs/reference/macos-capability-matrix.md:56:## Compliance
docs/reference/macos-capability-matrix.md:68:## Software Updates
docs/reference/macos-capability-matrix.md:78:## Conditional Access     <-- NEW
docs/reference/macos-capability-matrix.md:88:## Key Gaps Summary
docs/reference/ios-capability-matrix.md:13:## Enrollment
docs/reference/ios-capability-matrix.md:30:## Configuration
docs/reference/ios-capability-matrix.md:44:## App Deployment
docs/reference/ios-capability-matrix.md:57:## Compliance
docs/reference/ios-capability-matrix.md:70:## Software Updates
docs/reference/ios-capability-matrix.md:80:## Conditional Access     <-- NEW
docs/reference/ios-capability-matrix.md:90:## Key Gaps Summary
docs/reference/android-capability-matrix.md:14:## Enrollment
docs/reference/android-capability-matrix.md:31:## Configuration
docs/reference/android-capability-matrix.md:44:## App Deployment
docs/reference/android-capability-matrix.md:56:## Compliance
docs/reference/android-capability-matrix.md:67:## Software Updates
docs/reference/android-capability-matrix.md:76:## Conditional Access     <-- NEW
docs/reference/android-capability-matrix.md:86:## Cross-Platform Equivalences
docs/reference/android-capability-matrix.md:104:## Key Gaps Summary
docs/reference/linux-capability-matrix.md:15:## Enrollment
docs/reference/linux-capability-matrix.md:24:## Configuration
docs/reference/linux-capability-matrix.md:33:## App Deployment
docs/reference/linux-capability-matrix.md:42:## Compliance
docs/reference/linux-capability-matrix.md:51:## Software Updates
docs/reference/linux-capability-matrix.md:59:## Conditional Access     (pre-existing, untouched)
docs/reference/linux-capability-matrix.md:68:## Cross-Platform Equivalences
docs/reference/linux-capability-matrix.md:87:## Key Gaps Summary
```

Counts:
- `## Conditional Access` H2: pre-Phase-58 = 1 (Linux only); post-Plan-58-02 = 4 (Linux + macOS + iOS + Android). Delta = +3 (matches D-15 expected post-retrofit count).
- All 25 H2 lines match the Phase-58 expected post-retrofit total per anchor-inventory §"Summary Counts".

## Android Compat Shim Anchor Verification

```
$ grep -c '<a id="deferred-full-aosp-capability-mapping">' docs/reference/android-capability-matrix.md
1
$ grep -c '<a id="deferred-4-platform-unified-capability-comparison">' docs/reference/android-capability-matrix.md
1
$ grep -c '<a id="knox-mobile-enrollment-row">' docs/reference/android-capability-matrix.md
1
```

All 3 Android `<a id>` literals byte-identical to pre-Phase-58 baseline. Phase 45 AEAOSPFULL-09 anchor (`#deferred-full-aosp-capability-mapping`) and D-14 footer-F3 anchor (`#deferred-4-platform-unified-capability-comparison`) both preserved as required by Plan 58-02 contract; Plan 58-04 will retarget the body prose under the D-14 anchor in a separate edit zone.

## Deviations from Plan

None - plan executed exactly as written.

The verbatim CA-table content in Plan 58-02 `<action>` blocks was inserted byte-for-byte into all 3 matrices. No Rule 1-3 auto-fixes were needed; all 14 macOS checks + 13 iOS checks + 19 Android checks passed on first edit pass.

## Notes for Downstream Plans

- **Plan 58-03 (comparison-doc author):** All 3 new `#conditional-access` anchors resolvable; comparison-doc CA H2 row macOS / iOS / Android cells may now link to `macos-capability-matrix.md#conditional-access` / `ios-capability-matrix.md#conditional-access` / `android-capability-matrix.md#conditional-access` without broken-link risk. Plan 58-03 may proceed with comparison-doc authoring.
- **Plan 58-04 (Linux hedge removal + sibling intros + Android footer F3):** This plan honored the append-only contract by NOT modifying any of Plan 58-04's edit zones (frontmatter, intro paragraphs at line 11/12, Android footer F3 at line ~134 post-edit / `<a id="deferred-4-platform-unified-capability-comparison">`). Plan 58-04 may proceed without conflict.
- **Plan 58-05 (validator):** V-58-11 / V-58-12 / V-58-13 anchor-pin assertions for `## Conditional Access` literal in macOS / iOS / Android matrices are now testable via the pattern `^## Conditional Access\s*$` (multiline regex; matches all 3 matrices once each).

## Self-Check: PASSED

- macOS matrix `## Conditional Access` H2 present at line 78: VERIFIED via `grep -c "^## Conditional Access" docs/reference/macos-capability-matrix.md` = 1
- iOS matrix `## Conditional Access` H2 present at line 80: VERIFIED via `grep -c "^## Conditional Access" docs/reference/ios-capability-matrix.md` = 1
- Android matrix `## Conditional Access` H2 present at line 76: VERIFIED via `grep -c "^## Conditional Access" docs/reference/android-capability-matrix.md` = 1
- Phase 45 anchor preserved: VERIFIED via `grep -c '<a id="deferred-full-aosp-capability-mapping">' docs/reference/android-capability-matrix.md` = 1
- D-14 anchor preserved: VERIFIED via `grep -c '<a id="deferred-4-platform-unified-capability-comparison">' docs/reference/android-capability-matrix.md` = 1
- Linux matrix UNTOUCHED: VERIFIED via empty diff stat for `docs/reference/linux-capability-matrix.md` across HEAD~2..HEAD
- Task 1 commit `54a70b8` exists in git log: VERIFIED
- Task 2 commit `6d3ce98` exists in git log: VERIFIED
- No deletions in either commit: VERIFIED via `git diff --diff-filter=D --name-only HEAD~1 HEAD` (empty for both)
- All 14 macOS automated checks pass; all 13 iOS automated checks pass; all 19 Android automated checks pass per Plan 58-02 verify blocks
