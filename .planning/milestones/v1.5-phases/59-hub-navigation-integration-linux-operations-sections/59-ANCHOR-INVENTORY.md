# Phase 59 Pre-Edit Anchor Inventory

**Captured:** 2026-05-01T00:00:00Z
**Pre-edit baseline HEAD:** f6f218c7342babf39c884eaba7d407346253760b
**Purpose:** PITFALL-6 + D-11 + D-29 step 5 baseline for append-only contract verification across 4 hub files (docs/index.md, docs/operations/00-index.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md) and 4 glossary files. Phase 57 D-32 step 5 + Phase 58 D-15 inheritance.
**Owner:** Plan 59-01 (per D-28 ordering — pre-edit MANDATORY before any docs/index.md / docs/operations/00-index.md / docs/quick-ref-l1.md / docs/quick-ref-l2.md / docs/_glossary*.md edit in plans 59-02 / 59-03 / 59-04 / 59-05 / 59-06 / 59-07).

This artifact captures the pre-edit anchor reference map for the 8 files Phase 59 modifies + inbound references to the hub-file anchors (PITFALL-15 GFM kebab-case discipline). After all Phase 59 plans land, a post-edit re-grep at Plan 59-09 should produce zero NEW broken-anchor references vs this baseline (existing references still resolve; the +5 new H2 anchors added by Plans 59-02/59-03/59-04/59-06/59-07 resolve by virtue of same-plan-series H2 creation).

## Pre-edit line counts (all 8 Phase 59 files)

| File | Pre-Phase-59 line count |
|------|------------------------|
| docs/index.md | 234 |
| docs/operations/00-index.md | 24 |
| docs/quick-ref-l1.md | 192 |
| docs/quick-ref-l2.md | 292 |
| docs/_glossary.md | 215 |
| docs/_glossary-macos.md | 117 |
| docs/_glossary-android.md | 192 |
| docs/_glossary-linux.md | 174 |

## Pre-edit H2 anchors in hub files (BASELINE)

### docs/index.md (5 H2s expected pre-Phase-59)

| Line | H2 / Anchor literal | GFM-derived slug |
|------|---------------------|------------------|
| 26 | `## Windows Autopilot` | `#windows-autopilot` |
| 96 | `## macOS Provisioning` | `#macos-provisioning` |
| 131 | `## iOS/iPadOS Provisioning` | `#iosipados-provisioning` |
| 167 | `## Android Enterprise Provisioning` | `#android-enterprise-provisioning` |
| 199 | `## Cross-Platform References` | `#cross-platform-references` |

(Plan-author confirms exact line numbers from grep output below.)

Existing H3 anchors of interest (D-13 collision check):

| Line | H3 / Anchor literal | GFM-derived slug |
|------|---------------------|------------------|
| 28 | `### Service Desk (L1) -- APv1` | `#service-desk-l1----apv1` |
| 41 | `### Service Desk (L1) -- APv2` | `#service-desk-l1----apv2` |
| 54 | `### Desktop Engineering (L2) -- APv1` | `#desktop-engineering-l2----apv1` |
| 67 | `### Desktop Engineering (L2) -- APv2` | `#desktop-engineering-l2----apv2` |
| 78 | `### Admin Setup` | `#admin-setup` |
| 85 | `### Device Operations` (Windows-only post-enrollment) | `#device-operations` |
| 100 | `### Service Desk (L1)` (macOS H2) | `#service-desk-l1` |
| 109 | `### Desktop Engineering (L2)` (macOS H2) | `#desktop-engineering-l2` |
| 121 | `### Admin Setup` (macOS H2) | `#admin-setup` |
| 135 | `### Service Desk (L1)` (iOS H2) | `#service-desk-l1` |
| 144 | `### Desktop Engineering (L2)` (iOS H2) | `#desktop-engineering-l2` |
| 154 | `### Admin Setup` (iOS H2) | `#admin-setup` |
| 171 | `### Service Desk (L1)` (Android H2) | `#service-desk-l1` |
| 180 | `### Desktop Engineering (L2)` (Android H2) | `#desktop-engineering-l2` |
| 189 | `### Admin Setup` (Android H2) | `#admin-setup` |

D-13 ruling: `## Operations` (new H2) → `#operations` is DISTINCT from `### Device Operations` → `#device-operations`. No anchor collision.

### docs/operations/00-index.md (1 H2 expected pre-Phase-59)

| Line | H2 / Anchor literal | GFM-derived slug |
|------|---------------------|------------------|
| 14 | `## Co-Management` | `#co-management` |

(File is currently a 24-line stub — D-10 mandates same-commit completion via Plan 59-03.)

### docs/quick-ref-l1.md (H2s pre-Phase-59)

**Note:** The pre-Phase-59 quick-ref H2 literal names differ from the plan-author CONTEXT estimate. Actual H2 names from live grep:

| Line | H2 / Anchor literal | GFM-derived slug |
|------|---------------------|------------------|
| 14 | `## Top 5 Checks` | `#top-5-checks` |
| 24 | `## Escalation Triggers` | `#escalation-triggers` |
| 35 | `## Decision Trees` | `#decision-trees` |
| 42 | `## Runbooks` | `#runbooks` |
| 53 | `## APv2 Quick Reference` | `#apv2-quick-reference` |
| 83 | `## macOS ADE Quick Reference` | `#macos-ade-quick-reference` |
| 117 | `## iOS/iPadOS Quick Reference` | `#iosipados-quick-reference` |
| 149 | `## Android Enterprise Quick Reference` | `#android-enterprise-quick-reference` |
| 184 | `## Version History` | `#version-history` |

Platform-named Quick Reference H2s for new `## Linux Quick Reference` append (after Android H2 at line 149, before Version History at line 184):
- APv2 Quick Reference → `#apv2-quick-reference` (line 53)
- macOS ADE Quick Reference → `#macos-ade-quick-reference` (line 83)
- iOS/iPadOS Quick Reference → `#iosipados-quick-reference` (line 117)
- Android Enterprise Quick Reference → `#android-enterprise-quick-reference` (line 149)

(Plan-author fills in line numbers from grep output. New `## Linux Quick Reference` H2 added by Plan 59-06 — appended after Android Enterprise Quick Reference H2.)

### docs/quick-ref-l2.md (H2s pre-Phase-59)

**Note:** The pre-Phase-59 quick-ref-l2 H2 literal names from live grep:

| Line | H2 / Anchor literal | GFM-derived slug |
|------|---------------------|------------------|
| 14 | `## Log Collection` | `#log-collection` |
| 27 | `## PowerShell Diagnostic Commands` | `#powershell-diagnostic-commands` |
| 38 | `## Event Viewer Log Paths` | `#event-viewer-log-paths` |
| 47 | `## Registry Paths` | `#registry-paths` |
| 56 | `## Key Event IDs` | `#key-event-ids` |
| 65 | `## Investigation Runbooks` | `#investigation-runbooks` |
| 78 | `## APv2 Quick Reference` | `#apv2-quick-reference` |
| 132 | `## macOS ADE Quick Reference` | `#macos-ade-quick-reference` |
| 182 | `## iOS/iPadOS Quick Reference` | `#iosipados-quick-reference` |
| 233 | `## Android Enterprise Quick Reference` | `#android-enterprise-quick-reference` |
| 282 | `## Version History` | `#version-history` |

Platform-named Quick Reference H2s for new `## Linux Quick Reference` append (after Android Enterprise Quick Reference at line 233, before Version History at line 282):
- APv2 Quick Reference → `#apv2-quick-reference` (line 78)
- macOS ADE Quick Reference → `#macos-ade-quick-reference` (line 132)
- iOS/iPadOS Quick Reference → `#iosipados-quick-reference` (line 182)
- Android Enterprise Quick Reference → `#android-enterprise-quick-reference` (line 233)

(Plan-author fills in line numbers from grep output. New `## Linux Quick Reference` H2 added by Plan 59-07 — appended after Android Enterprise Quick Reference H2.)

## Pre-edit raw H2 grep output

```
$ grep -nE "^## (Windows Autopilot|macOS Provisioning|iOS/iPadOS Provisioning|Android Enterprise Provisioning|Cross-Platform References)" docs/index.md
26:## Windows Autopilot
96:## macOS Provisioning
131:## iOS/iPadOS Provisioning
167:## Android Enterprise Provisioning
199:## Cross-Platform References
```

```
$ grep -nE "^### " docs/index.md
28:### Service Desk (L1) -- APv1
41:### Service Desk (L1) -- APv2
54:### Desktop Engineering (L2) -- APv1
67:### Desktop Engineering (L2) -- APv2
78:### Admin Setup
85:### Device Operations
100:### Service Desk (L1)
109:### Desktop Engineering (L2)
121:### Admin Setup
135:### Service Desk (L1)
144:### Desktop Engineering (L2)
154:### Admin Setup
171:### Service Desk (L1)
180:### Desktop Engineering (L2)
189:### Admin Setup
```

```
$ grep -nE "^## " docs/operations/00-index.md
14:## Co-Management
```

```
$ grep -nE "^## .* Quick Reference" docs/quick-ref-l1.md docs/quick-ref-l2.md
docs/quick-ref-l1.md:53:## APv2 Quick Reference
docs/quick-ref-l1.md:83:## macOS ADE Quick Reference
docs/quick-ref-l1.md:117:## iOS/iPadOS Quick Reference
docs/quick-ref-l1.md:149:## Android Enterprise Quick Reference
docs/quick-ref-l2.md:78:## APv2 Quick Reference
docs/quick-ref-l2.md:132:## macOS ADE Quick Reference
docs/quick-ref-l2.md:182:## iOS/iPadOS Quick Reference
docs/quick-ref-l2.md:233:## Android Enterprise Quick Reference
```

```
$ grep -nE "^## " docs/quick-ref-l1.md
14:## Top 5 Checks
24:## Escalation Triggers
35:## Decision Trees
42:## Runbooks
53:## APv2 Quick Reference
83:## macOS ADE Quick Reference
117:## iOS/iPadOS Quick Reference
149:## Android Enterprise Quick Reference
184:## Version History
```

```
$ grep -nE "^## " docs/quick-ref-l2.md
14:## Log Collection
27:## PowerShell Diagnostic Commands
38:## Event Viewer Log Paths
47:## Registry Paths
56:## Key Event IDs
65:## Investigation Runbooks
78:## APv2 Quick Reference
132:## macOS ADE Quick Reference
182:## iOS/iPadOS Quick Reference
233:## Android Enterprise Quick Reference
282:## Version History
```

## Pre-edit glossary blockquote shape counts (Plan 59-05 baseline)

```
$ grep -cE "^### " docs/_glossary.md docs/_glossary-macos.md docs/_glossary-android.md docs/_glossary-linux.md
docs/_glossary.md:38
docs/_glossary-macos.md:11
docs/_glossary-android.md:24
docs/_glossary-linux.md:30
```

```
$ grep -cE "^> \*\*Cross-platform note:|^> \*\*Windows equivalent:" docs/_glossary.md docs/_glossary-macos.md docs/_glossary-android.md docs/_glossary-linux.md
docs/_glossary.md:0
docs/_glossary-macos.md:11
docs/_glossary-android.md:23
docs/_glossary-linux.md:9
```

Expected at capture-time:
- `docs/_glossary.md`: 38 H3 entries; 0 cross-platform blockquotes (Plan 59-05 ADDS new `> **Cross-platform note:**` blockquotes for collision-matrix terms)
- `docs/_glossary-macos.md`: 11 H3 entries; 11 `> **Windows equivalent:**` blockquotes (Plan 59-05 APPENDS see-also lines inside; PRESERVES `> **Windows equivalent:**` label verbatim per D-15)
- `docs/_glossary-android.md`: 24 H3 entries; 23 `> **Cross-platform note:**` blockquotes (Plan 59-05 APPENDS see-also lines inside)
- `docs/_glossary-linux.md`: 30 H3 entries; 9 `> **Cross-platform note:**` blockquotes (Plan 59-05 APPENDS see-also lines inside)

**Verification note:** Live grep confirms exact match to CONTEXT expectations for `_glossary.md` (38 H3, 0 blockquotes), `_glossary-macos.md` (11 H3, 11 blockquotes), `_glossary-android.md` (24 H3, 23 blockquotes). `_glossary-linux.md` shows 30 H3 entries (matches CONTEXT) and 9 `> **Cross-platform note:**` blockquotes (CONTEXT estimated 10 — actual is 9; non-blocking, see-also appends proceed per D-15 shape contract).

## Inbound references to hub-file anchors (PRE-Phase-59 EXPECTED)

```
$ grep -rnE "(index|operations/00-index|quick-ref-l1|quick-ref-l2|_glossary|_glossary-macos|_glossary-android|_glossary-linux)\.md#" docs/ | head -60
docs/admin-setup-android/01-managed-google-play.md:130:- [Android Enterprise Provisioning Glossary](../_glossary-android.md#managed-google-play)
docs/admin-setup-android/02-zero-touch-portal.md:229:- [Android Enterprise Provisioning Glossary](../_glossary-android.md#zero-touch-enrollment)
docs/admin-setup-android/03-fully-managed-cobo.md:21:**Not covered:** MGP binding mechanics (see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp)); Zero-Touch portal mechanics (see [02-zero-touch-portal.md](02-zero-touch-portal.md)); corporate-scale ZTE including dual-SIM IMEI 1 (Phase 39); the canonical provisioning-method × mode matrix (see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md)); full COPE admin path (deferred v1.4.1); Knox Mobile Enrollment (deferred v1.4.1); COBO-applicable Android L1 Runbooks — see [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md); COBO L2 investigation (Phase 41).
docs/admin-setup-android/03-fully-managed-cobo.md:23:**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).
docs/admin-setup-android/03-fully-managed-cobo.md:30:On COBO (Fully Managed), the managed "work profile" is not a partition — it is the complete device scope. There is no personal app surface, no personal data, no user-controlled partition. Every app, setting, certificate, Wi-Fi profile, VPN, and restriction configured through Intune applies to the whole device. (Applies to Android 10.0+ per [03-android-version-matrix.md#cobo](../android-lifecycle/03-android-version-matrix.md#cobo).) See [Fully Managed](../_glossary-android.md#fully-managed) for the authoritative definition.
docs/admin-setup-android/03-fully-managed-cobo.md:36:> **Cross-platform note:** Android's Fully Managed is the closest analog to iOS Supervision on ADE-enrolled devices, but the mapping is partial — iOS supervision is a permanent per-device state that gates approximately 60 restriction settings on top of a normal MDM enrollment, whereas Android Fully Managed is an ownership-mode designation set at provisioning time. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for the full cross-platform framing.
docs/admin-setup-android/03-fully-managed-cobo.md:65:The full COPE admin path (separate from COBO) is documented in [08-cope-full-admin.md](08-cope-full-admin.md). For net-new corporate-with-work-profile deployments, provision WPCO per [_glossary-android.md#wpco](../_glossary-android.md#wpco); for existing COPE fleets, see [08-cope-full-admin.md](08-cope-full-admin.md) for full-admin coverage including profile creation, token lifecycle, and Android 8-15 version breakpoints.
docs/admin-setup-android/03-fully-managed-cobo.md:67:<!-- MEDIUM confidence: locked phrasing above paraphrases Google's technical direction (Android 11 removal of work-profile-on-fully-managed in favor of work-profile-on-company-owned) per _glossary-android.md and Bayton's Android 11 COPE changes article. No current Google AE Help source uses the verbatim phrase; none contradict. last_verified: 2026-04-21. See [_glossary-android.md#cope](../_glossary-android.md#cope), [_glossary-android.md#wpco](../_glossary-android.md#wpco). -->
docs/admin-setup-android/03-fully-managed-cobo.md:153:On the initial Google sign-in prompt during factory-reset setup, type `afw#setup` instead of a Gmail address. This triggers DPC download and provisions the device into COBO. `afw#setup` is still supported for COBO on Android 11+ (contrast: the COPE path was removed on Android 11+ — see [_glossary-android.md#afw-setup](../_glossary-android.md#afw-setup)). System apps are disabled by default on devices provisioned through `afw#setup` — the Intune device configuration profile must explicitly re-enable required system apps (Calendar, Contacts, Messaging, OEM utilities) through the system-app allow list.
docs/admin-setup-android/03-fully-managed-cobo.md:163:> ⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both. Configuring both on the same devices causes out-of-sync enrollment state on Samsung hardware. See [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) for full KME admin coverage; [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the mutual-exclusion record; and [_glossary-android.md#zero-touch-enrollment](../_glossary-android.md#zero-touch-enrollment) for the Zero-Touch definition and the iOS ADE cross-platform analog.
docs/admin-setup-android/03-fully-managed-cobo.md:241:- [Android Enterprise Provisioning Glossary — Fully Managed](../_glossary-android.md#fully-managed)
docs/admin-setup-android/03-fully-managed-cobo.md:242:- [Android Enterprise Provisioning Glossary — DPC](../_glossary-android.md#dpc)
docs/admin-setup-android/03-fully-managed-cobo.md:243:- [Android Enterprise Provisioning Glossary — Managed Google Play](../_glossary-android.md#managed-google-play)
docs/admin-setup-android/03-fully-managed-cobo.md:244:- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)
docs/admin-setup-android/04-byod-work-profile.md:20:**How to use:** Intune administrators read linearly. End users enrolling personal devices should read [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md). L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [23: Work Profile Not Created](../l1-runbooks/23-android-work-profile-not-created.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).
docs/admin-setup-android/04-byod-work-profile.md:27:On BYOD Work Profile (also known as 'personally-owned work profile' in Google terminology), the managed work profile is a separate partition on a personal device. Work apps, work data, work certificates, and work policies live inside this partition; personal apps, personal data, personal contacts, and personal browser history live outside it. The Android OS enforces the boundary between the two partitions at the kernel level. See [BYOD](../_glossary-android.md#byod) and [Work Profile](../_glossary-android.md#work-profile) for authoritative definitions.
docs/admin-setup-android/04-byod-work-profile.md:29:> **Cross-platform note:** BYOD Work Profile is the closest Android analog to iOS Account-Driven User Enrollment, but the mapping is partial — iOS User Enrollment uses a managed APFS volume and Managed Apple ID; Android uses a work-profile partition and the user's existing Google account. See [BYOD](../_glossary-android.md#byod) for the full framing.
docs/admin-setup-android/04-byod-work-profile.md:38:- **AMAPI** — Android Management API, Google's modern policy surface that Intune migrated BYOD onto in April 2025. See [AMAPI](../_glossary-android.md#amapi).
docs/admin-setup-android/04-byod-work-profile.md:46:In April 2025, Microsoft migrated BYOD Work Profile management from the legacy Device Policy Controller (DPC) surface to the Android Management API (AMAPI). This migration introduced four behavioral changes that every Intune administrator managing BYOD must understand. See [AMAPI](../_glossary-android.md#amapi) for the technical definition.
docs/admin-setup-android/04-byod-work-profile.md:168:Android 15 introduced [Private Space](../_glossary-android.md#private-space) as a personal-side feature on the work-profile partition; Intune cannot manage it. See [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint) for the cross-platform behavior.
docs/admin-setup-android/04-byod-work-profile.md:230:- [Android Enterprise Provisioning Glossary — BYOD](../_glossary-android.md#byod)
docs/admin-setup-android/04-byod-work-profile.md:231:- [Android Enterprise Provisioning Glossary — AMAPI](../_glossary-android.md#amapi)
docs/admin-setup-android/04-byod-work-profile.md:232:- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)
docs/admin-setup-android/05-dedicated-devices.md:20:**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md). Note: Runbook 23 (Work Profile Not Created) is BYOD-exclusive and does not apply to Dedicated devices. L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks). LOB Operations Owners read [Audience and stakeholders](#audience-and-stakeholders) for the persona-specific responsibilities.
docs/admin-setup-android/05-dedicated-devices.md:22:> **Platform note:** "Dedicated device" in Android Enterprise (COSU — Corporate-Owned, Single-Use) is single-purpose kiosk hardware with no per-user identity. This is structurally distinct from iOS Shared iPad (multi-user shared identity) and Windows Shared PC (multi-user fast-switch). For cross-platform comparison, see [Android dedicated device disambiguation](../_glossary-android.md#dedicated).
docs/admin-setup-android/05-dedicated-devices.md:42:- **[Dedicated](../_glossary-android.md#dedicated)** (also referred to as COSU — Corporate-Owned, Single-Use) — the Android Enterprise management mode for single-purpose kiosk devices with no per-user identity at the device level. This guide uses "Dedicated" after first use.
docs/admin-setup-android/05-dedicated-devices.md:43:- **[Managed Home Screen (MHS)](../_glossary-android.md#managed-home-screen)** — the Microsoft launcher app (`com.microsoft.launcher.enterprise`) that replaces the default Android launcher on multi-app kiosk and digital signage Dedicated devices, providing the curated app surface and the exit-kiosk PIN mechanism.
docs/admin-setup-android/05-dedicated-devices.md:44:- **[Entra Shared Device Mode](../_glossary-android.md#entra-shared-device-mode)** — a Dedicated sub-scenario in which multiple workers sign in and out with their own Entra credentials on a single device; requires the "Corporate-owned dedicated device with Microsoft Entra ID shared mode" token type.
docs/admin-setup-android/05-dedicated-devices.md:45:- **[Play Integrity](../_glossary-android.md#play-integrity)** — the current Google platform integrity attestation API (deprecated predecessor retired in 2024; this guide uses Play Integrity only).
docs/admin-setup-android/05-dedicated-devices.md:46:- **[DPC (Device Policy Controller)](../_glossary-android.md#dpc)** — the agent app (Microsoft Intune app) downloaded and executed during provisioning to apply MDM policy to the device.
docs/admin-setup-android/05-dedicated-devices.md:47:- **[afw#setup](../_glossary-android.md#afw-setup)** — the DPC identifier typed at the Google sign-in prompt during factory-reset setup to trigger DPC download and Dedicated provisioning.
docs/admin-setup-android/05-dedicated-devices.md:87:- [ ] **Entra licenses for users + MSAL-integrated apps** — only required for the Entra shared device mode scenario. Workers who sign in/out must have Entra licenses; the apps they use must be MSAL-integrated to participate in the shared sign-in/sign-out flow per [_glossary-android.md#entra-shared-device-mode](../_glossary-android.md#entra-shared-device-mode).
docs/admin-setup-android/05-dedicated-devices.md:172:On the initial Google sign-in prompt during factory-reset setup, type `afw#setup` instead of a Gmail address; this triggers DPC download and Dedicated provisioning. See [afw#setup](../_glossary-android.md#afw-setup) for historical context. System apps are disabled by default on `afw#setup`-provisioned devices — the Intune device configuration profile must explicitly re-enable required system apps via the system-app allow list.
docs/admin-setup-android/05-dedicated-devices.md:182:> ⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both. Configuring both on the same devices causes out-of-sync enrollment state on Samsung hardware. See [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md) for full KME coverage and [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the mutual-exclusion record and [_glossary-android.md#zero-touch-enrollment](../_glossary-android.md#zero-touch-enrollment) for the Zero-Touch definition and the iOS ADE cross-platform analog.
docs/admin-setup-android/05-dedicated-devices.md:278:- [Android Enterprise Provisioning Glossary — Dedicated](../_glossary-android.md#dedicated)
docs/admin-setup-android/05-dedicated-devices.md:279:- [Android Enterprise Provisioning Glossary — Managed Home Screen](../_glossary-android.md#managed-home-screen)
docs/admin-setup-android/05-dedicated-devices.md:280:- [Android Enterprise Provisioning Glossary — Entra Shared Device Mode](../_glossary-android.md#entra-shared-device-mode)
docs/admin-setup-android/05-dedicated-devices.md:281:- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)
docs/admin-setup-android/06-aosp-stub.md:85:- [Android Enterprise Provisioning Glossary — AOSP](../_glossary-android.md#aosp)
docs/admin-setup-android/07-knox-mobile-enrollment.md:222:- [Android Enterprise Provisioning Glossary](../_glossary-android.md#knox)
docs/admin-setup-android/08-cope-full-admin.md:22:**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).
docs/admin-setup-android/08-cope-full-admin.md:29:On COPE / WPCO (Corporate-owned devices with work profile), the device is corporate-owned end-to-end, but the OS exposes two partitions: a managed device-owner side (the "personal" partition where the user installs personal apps) and a managed work-profile container that holds corporate apps, data, and policies. This is the inverse of [COBO Fully Managed](../_glossary-android.md#fully-managed) — on COBO the entire device is the corporate scope and there is no personal app surface; on COPE the device is corporate-owned but a personal-side partition is exposed and the work-profile container is isolated from it. Admins manage the device-owner-side OS restrictions (kiosk-style policies, OS update timing, EFRP) AND the work-profile container (managed app distribution, managed configurations, certificates, Wi-Fi, VPN). Personal-side app installs by the user are out of MDM scope by design — that is the user-privacy contract that distinguishes COPE / WPCO from COBO. See [Work Profile](../_glossary-android.md#work-profile) and [WPCO](../_glossary-android.md#wpco) for the authoritative definitions; per the WPCO glossary entry, "WPCO, formerly COPE."
docs/admin-setup-android/08-cope-full-admin.md:37:COPE / WPCO has no first-class equivalent on Windows, macOS, or iOS — the "corporate device with user-separated personal partition" model is Android-specific. See [_glossary-android.md#wpco](../_glossary-android.md#wpco) for the cross-platform framing. The closest cross-platform analog for "corporate ownership with personal-side affordances" is iOS Account-Driven User Enrollment, but the structural mapping is partial (User Enrollment uses a managed APFS volume on a personally-owned device rather than a work-profile container on a corporate-owned device); do not conflate.
docs/admin-setup-android/08-cope-full-admin.md:39:> ⚠️ **Android 15 — Private Space (unmanaged):** Android 15+ devices include a user-controlled hidden profile partition that **Intune** cannot manage on COPE, COBO, BYOD, or any other Android Enterprise mode. See [_glossary-android.md#private-space](../_glossary-android.md#private-space) and [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint).
docs/admin-setup-android/08-cope-full-admin.md:66:**For existing COPE fleets:** current COPE deployments continue to operate on Android 8+ and remain functionally supported. Google's modern terminology for this same Android Enterprise mode is **WPCO** (Work Profile on Corporate-Owned devices); per [_glossary-android.md#wpco](../_glossary-android.md#wpco), "WPCO, formerly COPE" — the corpus-canonical equivalence is that WPCO and COPE describe the same deployment shape under different names. Google has not issued a formal deprecation notice for COPE; recommend WPCO as the *provisioning name* per current Google guidance for net-new deployments, and continue running existing COPE fleets without re-platform pressure.
docs/admin-setup-android/08-cope-full-admin.md:182:For corporate-owned work profile (COPE) devices, the `afw#setup` enrollment method is only supported on devices running Android 8-10. It is not available on Android 11. On the initial Google sign-in prompt during factory-reset setup, type `afw#setup` instead of a Gmail address; on Android 8-10 COPE devices this triggers DPC download and provisions the device into the COPE work-profile-on-corporate-owned mode. See [afw#setup glossary](../_glossary-android.md#afw-setup) for the broader term definition.
docs/admin-setup-android/08-cope-full-admin.md:200:> ⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both. Configuring both on the same Samsung devices causes out-of-sync enrollment state; KME takes precedence at the device firmware level. KME provisions Samsung corporate-owned-with-work-profile devices into the **WPCO** mode in the Knox EMM profile dropdown — WPCO is Google's modern terminology for the same deployment shape this guide calls COPE (corporate-owned device with a user-separated work profile). See [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) for full KME admin coverage; [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the mutual-exclusion record; [_glossary-android.md#wpco](../_glossary-android.md#wpco) for the WPCO↔COPE terminology equivalence; and [_glossary-android.md#zero-touch-enrollment](../_glossary-android.md#zero-touch-enrollment) for the Zero-Touch definition and the iOS ADE cross-platform analog.
docs/admin-setup-android/08-cope-full-admin.md:216:| **Samsung KME compatibility** | KME provisions COBO directly — see [KME](../_glossary-android.md#kme) and [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md) | KME provisions WPCO (the modern COPE shape) — see [KME](../_glossary-android.md#kme), [WPCO glossary](../_glossary-android.md#wpco), and [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md) |
docs/admin-setup-android/08-cope-full-admin.md:307:- [Android Enterprise Provisioning Glossary — COPE](../_glossary-android.md#cope)
docs/admin-setup-android/08-cope-full-admin.md:308:- [Android Enterprise Provisioning Glossary — WPCO](../_glossary-android.md#wpco)
docs/admin-setup-android/08-cope-full-admin.md:309:- [Android Enterprise Provisioning Glossary — Work Profile](../_glossary-android.md#work-profile)
docs/admin-setup-android/08-cope-full-admin.md:310:- [Android Enterprise Provisioning Glossary — KME](../_glossary-android.md#kme)
docs/admin-setup-android/08-cope-full-admin.md:311:- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)
docs/admin-setup-android/06-aosp-stub.md:85:- [Android Enterprise Provisioning Glossary — AOSP](../_glossary-android.md#aosp)
docs/admin-setup-android/07-knox-mobile-enrollment.md:222:- [Android Enterprise Provisioning Glossary](../_glossary-android.md#knox)
docs/admin-setup-ios/07-device-enrollment.md:243:Full triage trees for each symptom live in the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) and are executed via the [iOS L1 Runbooks 16-21](../l1-runbooks/00-index.md#ios-l1-runbooks).
docs/admin-setup-linux/01-intune-linux-agent.md:112:- [Linux Glossary — intune-portal package](../_glossary-linux.md#intune-portal-package)
docs/admin-setup-linux/01-intune-linux-agent.md:113:- [Linux Glossary — microsoft-identity-broker](../_glossary-linux.md#microsoft-identity-broker)
docs/admin-setup-linux/03-compliance-policy.md:85:For terminology, see [Linux Glossary — dm-crypt](../_glossary-linux.md#dm-crypt) and [Linux Glossary — LUKS](../_glossary-linux.md#luks).
docs/admin-setup-linux/03-compliance-policy.md:152:- [Linux Glossary — web-app CA](../_glossary-linux.md#web-app-ca)
docs/admin-setup-linux/05-conditional-access.md:99:- [Linux Glossary — web-app CA](../_glossary-linux.md#web-app-ca)
docs/admin-setup-macos/01-abm-configuration.md:15:This guide walks through creating an [ADE](../_glossary-macos.md#ade) token to link [Apple Business Manager](../_glossary-macos.md#abm) with Microsoft Intune, assigning devices to the MDM server, and configuring token renewal. This is the first step in macOS Automated Device Enrollment and must be completed before creating an enrollment profile.
```

(...truncated; full grep available via re-run)

## Post-edit anchor literals (POST-Phase-59 EXPECTED)

Plan 59-02 will append `## Linux Provisioning` H2 to docs/index.md (after Android H2 lines 167-196, before Cross-Platform References line 199). Plan 59-04 will append `## Operations` H2 (after Linux Provisioning H2, before Cross-Platform References). Plan 59-03 will add `## Patch & Update Management` + `## App Lifecycle Automation` + `## Compliance Drift Detection + Tenant Migration` H2s to docs/operations/00-index.md. Plan 59-06 will append `## Linux Quick Reference` H2 to docs/quick-ref-l1.md. Plan 59-07 will append `## Linux Quick Reference` H2 to docs/quick-ref-l2.md.

### Expected new H2 anchors

| File | New H2 / Anchor literal | GFM-derived slug | Owning Plan |
|------|-------------------------|------------------|-------------|
| docs/index.md | `## Linux Provisioning` | `#linux-provisioning` | 59-02 |
| docs/index.md | `## Operations` | `#operations` | 59-04 |
| docs/operations/00-index.md | `## Patch & Update Management` | `#patch--update-management` (verify GFM `&` collapse) | 59-03 |
| docs/operations/00-index.md | `## App Lifecycle Automation` | `#app-lifecycle-automation` | 59-03 |
| docs/operations/00-index.md | `## Compliance Drift Detection + Tenant Migration` | `#compliance-drift-detection--tenant-migration` (verify GFM `+` collapse) | 59-03 |
| docs/quick-ref-l1.md | `## Linux Quick Reference` | `#linux-quick-reference` | 59-06 |
| docs/quick-ref-l2.md | `## Linux Quick Reference` | `#linux-quick-reference` | 59-07 |

**GFM slug verification note:** Per RESEARCH §Pattern 6, `&` and `+` characters are STRIPPED in GFM slug computation. The double-hyphen produced by `&` between words collapses to single hyphen. Plan-author re-verifies these slugs at edit-time using the GFM algorithm (lowercase → strip non-word/non-space/non-hyphen → replace whitespace runs with single hyphen → collapse multiple hyphens → trim). For `Patch & Update Management`: `patch  update management` → `patch-update-management`. For `Compliance Drift Detection + Tenant Migration`: `compliance drift detection  tenant migration` → `compliance-drift-detection-tenant-migration`. Confirm against actual GitHub-rendered output post-edit.

### Expected new H3 anchors (under new H2s)

Under docs/index.md `## Linux Provisioning` H2 (Plan 59-02):
- `### Service Desk (L1)` → `#service-desk-l1`
- `### Desktop Engineering (L2)` → `#desktop-engineering-l2`
- `### Admin Setup` → `#admin-setup`

Under docs/index.md `## Operations` H2 (Plan 59-04):
- `### Co-Management` → `#co-management` (note: same slug as docs/operations/00-index.md `## Co-Management` H2; intra-file uniqueness only — distinct file = no conflict)
- `### Patch & Update Management` → `#patch--update-management`
- `### App Lifecycle Automation` → `#app-lifecycle-automation`
- `### Compliance Drift Detection + Tenant Migration` → `#compliance-drift-detection--tenant-migration`

Under docs/quick-ref-l1.md `## Linux Quick Reference` H2 (Plan 59-06):
- `### Top Checks` → `#top-checks`
- `### Linux Escalation Triggers` → `#linux-escalation-triggers`
- `### Linux Decision Tree` → `#linux-decision-tree`
- `### Linux Runbooks` → `#linux-runbooks`

Under docs/quick-ref-l2.md `## Linux Quick Reference` H2 (Plan 59-07):
- `### Linux Diagnostic Data Collection (3 methods)` → `#linux-diagnostic-data-collection-3-methods`
- `### Key Intune Portal Paths (Linux L2)` → `#key-intune-portal-paths-linux-l2`
- `### Linux Compliance Category Reference` → `#linux-compliance-category-reference`
- `### Linux Investigation Runbooks` → `#linux-investigation-runbooks`

## Post-edit verification command (re-run at Phase 59 close per Plan 59-09)

```
grep -nE "^## (Windows Autopilot|macOS Provisioning|iOS/iPadOS Provisioning|Android Enterprise Provisioning|Linux Provisioning|Operations|Cross-Platform References)" docs/index.md
grep -nE "^## " docs/operations/00-index.md
grep -nE "^## .* Quick Reference|^## Linux Quick Reference" docs/quick-ref-l1.md docs/quick-ref-l2.md
```

Expected POST-Phase-59 output:
- docs/index.md: 7 H2 lines (5 existing pre-Phase-59 + Linux Provisioning + Operations)
- docs/operations/00-index.md: 4 H2 lines (Co-Management existing + 3 new: Patch + App + Drift)
- docs/quick-ref-l1.md: 5 Quick Reference H2 lines (4 existing pre-Phase-59 + Linux)
- docs/quick-ref-l2.md: 5 Quick Reference H2 lines (4 existing pre-Phase-59 + Linux)

V-59-32 NEGATIVE regression-guard at Plan 59-09: ALL existing pre-Phase-59 H2 literals (Windows Autopilot / macOS Provisioning / iOS/iPadOS Provisioning / Android Enterprise Provisioning / Cross-Platform References in docs/index.md; Co-Management in docs/operations/00-index.md; the 4 platform Quick Reference H2s in each quick-ref file) MUST remain byte-identical post-Phase-59 (append-only contract per D-11).

## Summary Counts

| Pattern | Pre-Phase-59 Count | Post-Phase-59 Expected | Delta |
|---------|-------------------|------------------------|-------|
| docs/index.md `## ` H2s (excl. Version History) | 5 | 7 | +2 (Linux + Operations) |
| docs/operations/00-index.md `## ` H2s | 1 | 4 | +3 (Patch + App + Drift) |
| docs/quick-ref-l1.md `## .* Quick Reference` H2s | 4 | 5 | +1 (Linux) |
| docs/quick-ref-l2.md `## .* Quick Reference` H2s | 4 | 5 | +1 (Linux) |
| docs/_glossary.md H3 entries | 38 | 38 (unchanged) | 0 |
| docs/_glossary.md `> **Cross-platform note:**` blockquotes | 0 | ≥N (per locked collision matrix; estimated ~5-10 per Plan 59-05) | +N |
| docs/_glossary-macos.md H3 entries | 11 | 11 (unchanged) | 0 |
| docs/_glossary-macos.md `> **Windows equivalent:**` blockquotes | 11 | 11 (PRESERVED verbatim; see-also lines APPENDED inside) | 0 |
| docs/_glossary-android.md H3 entries | 24 | 24 (unchanged) | 0 |
| docs/_glossary-android.md `> **Cross-platform note:**` blockquotes | 23 | 23 (see-also lines APPENDED inside; new ones may be added per locked collision matrix) | 0 to +N |
| docs/_glossary-linux.md H3 entries | 30 | 30 (unchanged) | 0 |
| docs/_glossary-linux.md `> **Cross-platform note:**` blockquotes | 9 | 9 (see-also lines APPENDED inside; new ones may be added per locked collision matrix) | 0 to +N |
| `> See also:` lines across 4 glossaries | 0 | ≥N (one per matrix-listed term per glossary) | +N |

**This baseline is auditable and persists for `59-VERIFICATION.md` cross-check at Phase 59 close (Plan 59-09).**
