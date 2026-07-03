---
phase: 105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap
plan: "01"
subsystem: documentation
tags: [android-enterprise, 802.1x, wi-fi, wired-gap, intune, eap-tls, peap, eap-ttls, upn-in-san, mac-randomization]
dependency_graph:
  requires:
    - docs/admin-setup-8021x/01-eap-method-overview.md
    - docs/admin-setup-8021x/02-cert-delivery-foundation.md
    - docs/admin-setup-8021x/05-ios.md (structural analog)
  provides:
    - docs/admin-setup-8021x/06-android.md
  affects:
    - docs/admin-setup-8021x/00-overview.md (item 6 entry added in plan 105-02)
tech_stack:
  added: []
  patterns:
    - A3 Hybrid gap-degraded structure (Common Mechanics → Wi-Fi → Wired gap stub)
    - link-not-copy to 01-/02-/_glossary-network.md
    - single-callout-plus-cross-ref (UPN-in-SAN WARNING homed once; cross-ref'd from mode matrix)
    - co-equal-EAP matrix (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS, no recommended default)
    - compact mode-applicability matrix (COBO/COPE/COSU/BYOD-WP enrollment-mode delta)
    - 90-day freshness stamps (front-matter + inline on version-gated content)
key_files:
  created:
    - docs/admin-setup-8021x/06-android.md
  modified: []
decisions:
  - "D-01/D-02/D-03/D-04: Wired = top-level H2 gap stub, plain prose bold lead, one paragraph, four facts (no native profile / no OMA-URI / consult network team / Wi-Fi IS supported)"
  - "D-05: Single Wi-Fi path + compact mode-applicability matrix (not per-mode subsections); field-name delta Radius server name vs Certificate server names"
  - "D-06: AOSP = one-line out-of-scope plain prose stub (not a section, not a callout)"
  - "D-07: cert-access B-08 = structural/inline bold-lead plain prose (not a callout)"
  - "D-08/D-09/D-10: UPN-in-SAN = WARNING tier, homed once in Wi-Fi/BYOD-WP context, BYOD-scoped only; mode matrix cross-refs to it"
  - "D-11/D-12/D-14: combined version-gate WARNING (Android 11+/14+) with embedded mini-matrix; DNS-suffix mitigation inside 14+ row; freshness stamp"
  - "D-13: MAC randomization = plain-prose note using Use device MAC (not iOS Disable MAC label); Android 13+; freshness stamp"
metrics:
  duration: "~10 minutes"
  completed: "2026-06-30"
  tasks_completed: 2
  files_created: 1
  files_modified: 0
---

# Phase 105 Plan 01: Android Enterprise 802.1X Admin Setup Guide Summary

## One-Liner

Android Enterprise Wi-Fi 802.1X guide (EAP-TLS/PEAP-MSCHAPv2/EAP-TTLS across COBO/COPE/COSU/BYOD-WP) with UPN-in-SAN BYOD deployment-failure WARNING, combined Android 11+/14+ RADIUS version-gate WARNING, MAC randomization note, and wired gap stub -- satisfying DOT1X-07.

## What Was Built

Created `docs/admin-setup-8021x/06-android.md` (128 lines), the Android Enterprise per-platform 802.1X admin-setup guide. The guide clones the Phase-104 iOS A3 scaffold (`05-ios.md`) and applies Android-specific deltas, gap-degrading the Wired section to a plain-prose stub.

**Structure (gap-degraded A3 Hybrid):**
- YAML front-matter with `platform: android`, 90-day freshness stamps
- Prerequisites banner + H1 (Wi-Fi primary, no "and Wired") + one-line Scope banner
- Common Profile Mechanics: three-profile sequence (Trusted Cert + SCEP/PKCS + Wi-Fi), no-auth-mode-selector note, Server Validation (link-not-copy), Anonymous Outer Identity (link to `_glossary-network.md#inner-outer-identity`)
- Wi-Fi section: nav path (`Android Enterprise > Templates > Wi-Fi`), co-equal-EAP preamble, enrollment-mode matrix (4 rows; corporate-owned = Radius server name; BYOD-WP = Certificate server names), AOSP one-line stub, per-EAP Wi-Fi config matrix (6 rows x 3 columns with Android-specific inner methods), UPN-in-SAN WARNING, B-08 cert-access inline, combined version-gate WARNING, MAC randomization note
- Wired: plain-prose gap stub (bold lead, one paragraph, four D-04 facts)
- See Also + Change History

**Key Android deltas applied correctly:**
- EAP-TTLS inner: PAP / MS-CHAP / MS-CHAPv2 (no plain CHAP -- Android-only constraint verified live)
- PEAP inner: None or MS-CHAPv2 (explicit selector on Android, unlike iOS/macOS)
- EAP-TLS client auth: SCEP, PKCS, or Derived credential
- MAC control: "Use device MAC" (not iOS's "Disable MAC address randomization: Yes")
- UPN-in-SAN WARNING: BYOD personally-owned work profile only (absent from corporate-owned tabs per live MS Learn verification)

## Tasks Completed

| Task | Commit | Description |
|------|--------|-------------|
| Task 1: Scaffold + Common Profile Mechanics + Wi-Fi backbone | `82c1509` | Front-matter, Prerequisites, H1, Scope banner, Common Profile Mechanics (three-profile sequence, no-auth-mode-selector, Server Validation, Anonymous Outer Identity), Wi-Fi section (nav path, mode matrix, AOSP stub, per-EAP matrix) |
| Task 2: WARNINGs + B-08 + MAC note + Wired stub + closeout | `c605b1e` | B-06 UPN-in-SAN WARNING (BYOD-scoped), B-08 cert-access inline, combined Android 11+/14+ version-gate WARNING, MAC randomization plain-prose note, Wired gap stub, See Also, Change History |

## Verification Results

All plan-level and task-level automated checks passed:

**Task 1 verify:** PASS
- platform: android, review_by: 2026-09-28, correct H1, all required sections, all link targets present (canonical-scope-callout, #peap-mschapv2, #server-name-validation, #inner-outer-identity, Radius server name, Certificate server names), AOSP present, Unencrypted password (PAP) in matrix, no forbidden tokens

**Task 2 verify:** PASS
- Wired gap stub with all four D-04 facts, Use device MAC + Use device default, Grant silently for specific apps, Android 11+/14+ version gates, 256 characters, DNS suffix, Subject Alternative Name, deployment fails, exactly 2 WARNING blockquotes, no NOTE/DANGER callouts, no iOS MAC label

**BYOD-scoping awk check:** PASS
- The UPN-in-SAN WARNING block (containing "Subject Alternative Name" and "deployment fails") does NOT contain "Fully Managed", "COBO", "COPE", or "COSU" -- D-10 mechanically verified

## Deviations from Plan

None -- plan executed exactly as written. All 14 locked decisions (D-01 through D-14) are in place. No bugs encountered, no architectural changes required, no missing dependencies.

## Known Stubs

None. The AOSP one-line stub and Wired gap stub are intentional per the locked decisions (D-06 and D-01/D-02/D-03/D-04); they are content decisions, not placeholder omissions.

## Threat Flags

No new threat surface introduced. This is a pure-documentation file (static Markdown, no executable surface, no network endpoints, no input parsing). The STRIDE threats T-105-01 through T-105-06 are all mitigated by content-integrity obligations encoded in the guide's acceptance criteria and verified by the automated checks above.

## Self-Check: PASSED

- `docs/admin-setup-8021x/06-android.md` exists: CONFIRMED (128 lines)
- Task 1 commit `82c1509`: CONFIRMED
- Task 2 commit `c605b1e`: CONFIRMED
- All automated verify commands: PASS
- No forbidden tokens (Disable MAC address randomization / M-series / deployment channel / dot3svc / KB5014754 / mermaid / DANGER / > **NOTE): CONFIRMED absent
- Exactly 2 `> **WARNING` blockquote callouts: CONFIRMED
- UPN-in-SAN WARNING BYOD-scoped (awk check): PASS
