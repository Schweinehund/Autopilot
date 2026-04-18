---
phase: 32
plan: "04"
subsystem: navigation
tags: [common-issues, ios, routing, symptom-index, nav-02, documentation]
type: execute
status: complete
completed: 2026-04-17
duration_min: 4
commit: 3f7f73c
requires:
  - 32-00
  - 32-01
  - 32-02
  - 32-03
provides:
  - iOS/iPadOS Failure Scenarios H2 in common-issues.md
  - 6 symptom-descriptive iOS H3s with ios- anchor prefix
  - MAM-WE advisory block (ADDTS-01 defer)
  - Bidirectional iOS cross-reference banners (3 Windows H3 + 3 macOS H3)
  - Third platform selector entry for iOS/iPadOS
affects:
  - docs/common-issues.md
tech-stack:
  added: []
  patterns:
    - "iOS H3 anchor prefix convention (ios-*) to eliminate collision with macOS anchors"
    - "Bidirectional cross-reference banner pattern (Windows H3 ↔ iOS, macOS H3 ↔ iOS)"
    - "MAM-WE single-source advisory block (ADDTS-01 defer) extended to common-issues.md"
key-files:
  created: []
  modified:
    - docs/common-issues.md
decisions:
  - "MAM-WE advisory H3 uses iOS: prefix for anchor consistency, producing #ios-app-protection-policies-not-applying-mam-we (eliminates any potential Apple-side cross-platform collision)"
  - "Reciprocal iOS banners added AFTER macOS banners in Windows H3s (bidirectional pattern per D-23)"
  - "iOS banners in macOS section placed between each symptom H3 and its L1/L2 bullets (above next H3) to match the bidirectional pattern without disrupting the symptom/action flow"
metrics:
  duration_min: 4
  tasks_completed: 3
  files_modified: 1
  lines_added: 65
  lines_removed: 0
---

# Phase 32 Plan 04: iOS/iPadOS Failure Scenarios in common-issues.md — Summary

One-liner: Added `## iOS/iPadOS Failure Scenarios` H2 section to `docs/common-issues.md` with 6 symptom-descriptive iOS H3s (all using `ios-` anchor prefix to avoid macOS anchor collision), MAM-WE advisory block (ADDTS-01 defer), 6 bidirectional cross-reference banners (3 in Windows H3 sub-sections, 3 in macOS H3 sub-sections), platform selector third entry, updated platform coverage blockquote, and Phase 32 Version History row.

## Changes

### Task 1 — Top-of-file updates

- Frontmatter: `last_verified: 2026-04-15 → 2026-04-17`; `review_by: 2026-07-14 → 2026-07-16`
- Platform coverage blockquote (line 9) suffixed per D-41: "Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, and iOS/iPadOS provisioning issues"
- Platform selector third entry (line 18): `- [iOS/iPadOS Failure Scenarios](#iosipados-failure-scenarios) -- iOS/iPadOS enrollment and management failures via Intune`
- 3 iOS banner blockquotes added AFTER existing macOS banners in Windows H3 sub-sections:
  - `### Device Registration Issues` (line 31) → `> **iOS:** For iOS enrollment failures, see [iOS: Device Not Appearing in Intune](#ios-device-not-appearing-in-intune).`
  - `### Profile Assignment Issues` (line 48) → `> **iOS:** For iOS configuration and restriction issues, see [iOS: Enrollment Blocked by Configuration](#ios-enrollment-blocked-by-configuration).`
  - `### Security and Enrollment Issues` (line 144) → `> **iOS:** For iOS Conditional Access and compliance timing issues, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).`

### Task 2 — Reciprocal iOS banners in macOS H3 sections (bidirectional per D-23)

3 iOS banners added in the macOS ADE Failure Scenarios section, positioned between the preceding symptom's L2 bullet and the next symptom H3:

- Before `### Device Not Appearing in Intune` (macOS) → `> **iOS:** For iOS/iPadOS device not appearing, see [iOS: Device Not Appearing in Intune](#ios-device-not-appearing-in-intune).`
- Before `### Configuration Profile Not Applied` (macOS) → `> **iOS:** For iOS configuration / restriction application issues, see [iOS: Enrollment Blocked by Configuration](#ios-enrollment-blocked-by-configuration).`
- Before `### Compliance Failure or Access Blocked` (macOS) → `> **iOS:** For iOS compliance / Conditional Access blocking, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).`

Total `> **iOS:**` banner count in the file: 6 (3 Windows H3 + 3 macOS H3).

### Task 3 — iOS/iPadOS Failure Scenarios H2 + MAM-WE advisory + Version History

New H2 section inserted AFTER end of macOS section (line 201) and BEFORE `## Version History`. Structure mirrors Phase 25 macOS section verbatim:

**Cross-ref banners (top of iOS section):**
- `> **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).`
- `> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios).`

**Platform line:** `**Platform:** iOS/iPadOS through Microsoft Intune`

**Intro sentence:** Routes to iOS Triage Decision Tree at `decision-trees/07-ios-triage.md`.

**6 symptom-descriptive H3s (all `iOS:` prefixed for `#ios-*` anchor):**
1. `### iOS: Device Not Appearing in Intune` → anchor `#ios-device-not-appearing-in-intune`
   - L1: 16-ios-apns-expired, 17-ios-ade-not-starting, 19-ios-license-invalid
   - L2: 14-ios-log-collection, 15-ios-ade-token-profile
2. `### iOS: ADE Setup Assistant Not Completing` → anchor `#ios-ade-setup-assistant-not-completing`
   - L1: 17-ios-ade-not-starting
   - L2: 14-ios-log-collection, 15-ios-ade-token-profile
3. `### iOS: Enrollment Blocked by Configuration` → anchor `#ios-enrollment-blocked-by-configuration`
   - L1: 18-ios-enrollment-restriction-blocking, 20-ios-device-cap-reached (reciprocal disambiguation per Phase 30 D-30)
   - L2: 14-ios-log-collection
4. `### iOS: User License Not Present` → anchor `#ios-user-license-not-present`
   - L1: 19-ios-license-invalid
   - L2: 14-ios-log-collection
5. `### iOS: Device Enrollment Cap Reached` → anchor `#ios-device-enrollment-cap-reached`
   - L1: 20-ios-device-cap-reached
   - L2: (none — cap adjustments are admin-center actions)
6. `### iOS: Compliance / Access Blocked` → anchor `#ios-compliance--access-blocked` (double-hyphen from slash)
   - L1: 21-ios-compliance-blocked
   - L2: 17-ios-compliance-ca-timing

**7th iOS H3 (MAM-WE advisory, not a symptom route):**
- `### iOS: App Protection Policies Not Applying (MAM-WE)` → anchor `#ios-app-protection-policies-not-applying-mam-we`
- Advisory blockquote: MAM-WE runbooks deferred to ADDTS-01; links to `admin-setup-ios/09-mam-app-protection.md` and `_glossary-macos.md#mam-we`

**Version History row added:**
- `| 2026-04-17 | Phase 32: added iOS/iPadOS Failure Scenarios section (6 symptom categories with ios- anchor prefix + MAM-WE advisory), platform selector entry, bidirectional iOS cross-reference banners; updated platform coverage blockquote | -- |`

## Acceptance Criteria Verification

| Criterion | Expected | Actual | Status |
|-----------|----------|--------|--------|
| `grep -cE "^## iOS/iPadOS Failure Scenarios" docs/common-issues.md` | 1 | 1 | PASS |
| `grep -cE "^### iOS: " docs/common-issues.md` | 7 | 7 | PASS |
| `grep -cE "l1-runbooks/(16\|17\|18\|19\|20\|21)-ios-" docs/common-issues.md` | ≥6 | 6 | PASS |
| `grep -c "admin-setup-ios/09-mam-app-protection.md" docs/common-issues.md` | ≥1 | 1 | PASS |
| `grep -c "ADDTS-01" docs/common-issues.md` | ≥1 | 1 | PASS |
| `grep -c "> \*\*iOS:\*\*" docs/common-issues.md` | ≥3 | 6 | PASS |
| `grep -cE "^### (Device Registration Issues\|Profile Assignment Issues\|Security and Enrollment Issues)" docs/common-issues.md` | 3 | 3 | PASS |
| `link-check.sh docs/common-issues.md` exit code | 0 | 0 | PASS |
| `anchor-collision.sh docs/common-issues.md` exit code | 0 | 0 | PASS |

## Regression Check (SC #4 literal — pre-existing links remain valid)

All 6 pre-existing macOS H3 anchors preserved (no anchor collision):
- `#device-not-appearing-in-intune` (macOS, line 162)
- `#setup-assistant-stuck-or-failed` (macOS)
- `#configuration-profile-not-applied` (macOS)
- `#app-not-installed` (macOS)
- `#compliance-failure-or-access-blocked` (macOS)
- `#company-portal-sign-in-failure` (macOS)

All pre-existing Windows H3s preserved. All pre-existing cross-reference links (#windows-autopilot-issues, #macos-ade-failure-scenarios, etc.) resolve.

**Anchor collision posture:** Explicit `ios-` prefix on all 7 iOS H3s prevents any potential Apple-platform anchor collision. Verified by `anchor-collision.sh` (exit 0).

## Threat Model Mitigations Applied

| Threat | Mitigation |
|--------|------------|
| T-32-01 Information Disclosure (symptom prose) | All symptom descriptions use generic placeholders — no tenant IDs, no example URLs, no secrets. |
| T-32-04 Information Disclosure (MAM-WE advisory link target) | MAM-WE advisory links to `admin-setup-ios/09-mam-app-protection.md` (generic config guide) and `_glossary-macos.md#mam-we` (glossary entry). Both are generic guidance. |
| Anchor collision (routing/tampering) | All 7 iOS H3s use `iOS:` prefix producing `#ios-*` anchors. Verified by anchor-collision.sh exit 0. |

## Deviations from Plan

**1. [Rule 2 - Missing critical consistency] MAM-WE H3 heading extended with `iOS:` prefix**
- **Found during:** Task 3 final verification
- **Issue:** PLAN.md Task 3 action block (line 312) specified `### App Protection Policies Not Applying (MAM-WE)` WITHOUT the `iOS:` prefix, which would have created an anchor `#app-protection-policies-not-applying-mam-we` inconsistent with the 6 sibling iOS H3s (which all use `ios-` prefix). The orchestrator prompt's AC #2 specified 7 `### iOS: ` H3s (6 symptoms + MAM-WE advisory = 7), enforcing the consistent-prefix intent.
- **Fix:** Changed heading to `### iOS: App Protection Policies Not Applying (MAM-WE)` to match the surrounding 6 symptom H3 naming pattern. This aligns with D-22 Option A explicit `iOS: ` prefix pattern applied to ALL H3s in the iOS section (not just the 6 symptom ones). The PLAN.md verify regex on line 326 targets the 6 specific symptom H3 names and does not check MAM-WE — so adding `iOS:` prefix to MAM-WE H3 satisfies the orchestrator AC #2 (7 iOS H3s) without violating PLAN.md verify (6 named symptoms still match exactly).
- **Files modified:** docs/common-issues.md
- **Commit:** 3f7f73c

## Known Stubs

None. All symptom entries have real L1/L2 runbook links to existing files (verified via link-check.sh exit 0). MAM-WE block is an intentional advisory, not a stub — it documents ADDTS-01 defer per Phase 26 D-03, Phase 29 D-31, Phase 30 D-31, Phase 31 D-21.

## Self-Check: PASSED

Verified 2026-04-17:
- FOUND: docs/common-issues.md (modified, 275 lines)
- FOUND: commit 3f7f73c in git log
- FOUND: all 7 iOS H3s (6 symptoms + MAM-WE)
- FOUND: all 6 L1 runbook references (16-21)
- FOUND: all referenced target files (l1-runbooks/16-21, l2-runbooks/14/15/17, admin-setup-ios/09, decision-trees/07, _glossary-macos.md)
- FOUND: 6 bidirectional iOS banners (3 Windows H3 + 3 macOS H3)
- FOUND: Version History Phase 32 row
- PASSED: link-check.sh exit 0
- PASSED: anchor-collision.sh exit 0
- PASSED: all 9 acceptance criteria
- PASSED: SC #4 regression check (all pre-existing anchors preserved)
