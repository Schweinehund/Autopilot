---
doc_id: RE-215
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: all
audience: L1
platform: Android
---

**Platform:** Android · **Doc Type:** Reference · **Doc ID:** RE-215 · **Status:** Approved

# Android Triage Decision Tree

## Summary

Reference decision table for Android enrollment and compliance triage across all Intune-managed Android modes (BYOD Work Profile, COBO, Dedicated/COSU, corporate Zero-Touch, and AOSP specialty hardware). Identifies the enrollment mode first, then routes by symptom to the matching L1 runbook or an L2 escalation, preserving both corpus-heaviest reconvergence merges from the original decision graph.

> **Platform gate:** This guide covers Android Enterprise troubleshooting via Intune. For Windows Autopilot, see [Initial Triage Decision Tree](00-initial-triage.md).

> For macOS ADE, see [macOS ADE Triage](06-macos-triage.md). For iOS/iPadOS, see [iOS Triage](07-ios-triage.md).

## How to Use This Tree

Start here when a user reports an issue with an Android device enrolled (or expected to enroll) in Intune. Identify the enrollment mode first, then follow the symptom branch to an L1 runbook or L2 escalation. All terminal nodes are within 2 decision steps of the root (well under the SC #1 5-node budget). Android failure root causes differ fundamentally by mode — asking mode before symptom eliminates false-negative triage (Phase 40 D-01).

No network reachability gate is included at the root (Phase 30 D-03): mode-specific runbooks handle connectivity prerequisites within their own L1 Triage Steps.

## Routing Verification

All terminal nodes are within 2 decision steps of the root node (AND1), well under the SC #1 5-node budget (Phase 40 D-05).

**LOCKED — 39 (nodes + labeled edges)** — 14 nodes + 25 labeled edges, independently re-derived from the pre-conversion decision graph. Both 4-way reconvergence merges (into ANDR25 and ANDE3) are preserved below as explicit per-mode rows — no row collapses more than one incoming edge.

| Path | Step 1 (mode) | Step 2 (symptom) | Destination |
|------|---------------|------------------|-------------|
| BYOD enrollment blocked | Personal phone, work profile (BYOD) | Enrollment-restriction error visible | Runbook 22 |
| BYOD work profile failed | Personal phone, work profile (BYOD) | Device enrolled but work profile missing | Runbook 23 |
| BYOD device not enrolled | Personal phone, work profile (BYOD) | Device never appeared in Intune | Runbook 24 |
| BYOD compliance blocked | Personal phone, work profile (BYOD) | Non-compliant / access-blocked | Runbook 25 |
| BYOD MGP app missing | Personal phone, work profile (BYOD) | Expected work app not installed | Runbook 26 |
| BYOD other / unclear | Personal phone, work profile (BYOD) | Symptom doesn't match a runbook | Escalate ANDE3 (unclear symptom) |
| COBO enrollment blocked | Corporate phone, fully managed (COBO) | Enrollment-restriction error visible | Runbook 22 |
| COBO device not enrolled | Corporate phone, fully managed (COBO) | Device never appeared in Intune | Runbook 24 |
| COBO compliance blocked | Corporate phone, fully managed (COBO) | Non-compliant / access-blocked | Runbook 25 |
| COBO MGP app missing | Corporate phone, fully managed (COBO) | Expected app not installed | Runbook 26 |
| COBO other / unclear | Corporate phone, fully managed (COBO) | Symptom doesn't match a runbook | Escalate ANDE3 (unclear symptom) |
| Dedicated enrollment blocked | Kiosk or single-purpose (Dedicated/COSU) | Enrollment-restriction error visible | Runbook 22 |
| Dedicated device not enrolled | Kiosk or single-purpose (Dedicated/COSU) | Device never appeared in Intune | Runbook 24 |
| Dedicated compliance blocked | Kiosk or single-purpose (Dedicated/COSU) | Non-compliant / access-blocked | Runbook 25 |
| Dedicated MGP app missing | Kiosk or single-purpose (Dedicated/COSU) | Expected app not installed | Runbook 26 |
| Dedicated other / unclear | Kiosk or single-purpose (Dedicated/COSU) | Symptom doesn't match a runbook | Escalate ANDE3 (unclear symptom) |
| ZTE enrollment failed | Corporate Zero-Touch enrolled (ZTE) | Enrollment never started or stalled | Runbook 27 |
| ZTE post-enrollment compliance | Corporate Zero-Touch enrolled (ZTE) | Non-compliant / access-blocked post-ZTE | Runbook 25 |
| ZTE other / unclear | Corporate Zero-Touch enrolled (ZTE) | Symptom doesn't match a runbook | Escalate ANDE3 (unclear symptom) |
| AOSP all paths | Specialty hardware (AOSP) | (any) | Runbook 29 |
| Unknown mode | Don't know / Can't tell | (any) | Escalate ANDE2 (mode identification) |

## How to Check

Use these questions to identify the device's enrollment mode before routing.

| Question | How to Check |
|----------|-------------|
| How does the device appear in the Intune admin center? | Open Intune admin center > **Devices > All devices** and filter by platform = Android. If device appears under "Corporate" ownership, likely COBO / Dedicated / ZTE; if "Personal," likely BYOD. |
| Is there a briefcase badge on work apps? | Ask the user: BYOD Work Profile devices show a briefcase badge on work apps (Outlook, Teams, etc.). If present, BYOD; if absent on a corporate device, COBO or Dedicated. |
| Was this device enrolled via a corporate IT process or did the user set it up themselves? | Corporate IT / reseller-provided, COBO / Dedicated / ZTE. User self-enrolled via Company Portal on a personal phone, BYOD. Specialty hardware (RealWear, Zebra, Pico, HTC VIVE Focus, Meta Quest), AOSP. |
| Which management app is installed? | Post-April 2025 AMAPI: Microsoft Intune app is primary for BYOD Work Profile; Company Portal still present. COBO / Dedicated use the Android Device Policy Controller (AFW). ZTE pushes the Android Device Policy Controller automatically at first boot. |

## Escalation Data

Collect this information before routing to L2.

| When You Escalate | Collect This |
|-------------------|-------------|
| Unknown mode (ANDE2) | Device serial, User UPN, lock-screen or Settings screenshot, last-known management app name (Company Portal vs Microsoft Intune app), ticket description. Route to L2 for mode identification. |
| Unclear symptom within a GMS mode (ANDE3) | Device serial, User UPN, Android version, enrollment mode (if known), symptom description, screenshot of current Intune device status pane. Route to L2. |

## Related Resources

- [Android L1 Runbooks Index](../l1-runbooks/00-index.md#android-l1-runbooks) — All 6 Android L1 runbooks (22-27)
- [Android Glossary](../_glossary-android.md) — Canonical Android Enterprise terminology
- [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md) — Mode-ownership axes explained
- [Android Admin Setup Overview](../admin-setup-android/00-overview.md) — Tri-portal admin surface
- [AOSP Stub](../admin-setup-android/06-aosp-stub.md) — AOSP scope context
- [L1 Runbook 29: AOSP Enrollment Failed](../l1-runbooks/29-android-aosp-enrollment-failed.md) — AOSP failure routing
- [Initial Triage Decision Tree](00-initial-triage.md) — Windows Autopilot entry point
- [macOS ADE Triage](06-macos-triage.md) — macOS ADE failure routing
- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |
| 2026-04-25 | Phase 45 AEAOSPFULL-09: Mermaid AOSP edge now routes to ANDR29 single click target (preserves Phase 40 D-05 LOCK + ROADMAP SC#4 verbatim "single click target"); legacy AOSP-out-of-scope escalation node retired across the diagram's color-class styling, Routing Verification table, and Escalation Data table per D-19 (in-runbook OEM-id step now lives inside Runbook 29 per D-20); Related Resources cross-link to Runbook 29 added. | -- |
| 2026-07-08 | Phase 122 plan 02: converted Mermaid decision graph to a C17-compliant text-equivalent decision table (LOCKED — 39, nodes + labeled edges); removed the Legend section and the mermaid fence; both 4-way reconvergence merges (into ANDR25 and ANDE3) preserved as explicit per-mode rows; split the >200-char Platform gate blockquote into two groups. | -- |
| 2026-04-23 | Initial version (Phase 40 — Android L1 triage tree) | -- |
