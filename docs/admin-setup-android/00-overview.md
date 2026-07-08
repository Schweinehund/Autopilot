---
doc_id: RE-092
status: Approved
owner: Intune Admin Lead
doc_type: Guide
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: all
audience: admin
platform: Android
---

**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-092 · **Status:** Approved

# Android Enterprise Admin Setup

## Summary

Routes Intune administrators to the correct Android Enterprise admin setup path across all five enrollment modes — COBO, BYOD Work Profile, Dedicated (COSU), Zero-Touch Enrollment (ZTE), AOSP, and Samsung Knox Mobile Enrollment (KME) — by mapping each mode to its required portal(s) (Intune admin center, Managed Google Play, Zero-Touch portal, or Samsung Knox Admin Portal) and destination admin guide.

> **Platform gate:** This guide covers Android Enterprise admin setup across all enrollment modes: COBO (Fully Managed), BYOD Work Profile, Dedicated (COSU), Zero-Touch Enrollment (ZTE), and AOSP.

> For iOS/iPadOS admin setup, see [iOS Admin Setup Guides](../admin-setup-ios/00-overview.md). For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).

> For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

This overview routes Intune administrators to the correct Android Enterprise admin setup path. Android Enterprise management depends on a tri-portal surface — the Intune admin center, Managed Google Play (MGP), and the Zero-Touch portal (ZT portal) — and which portals an admin must configure depends entirely on the chosen enrollment mode. Corporate-owned fully managed deployments (COBO), BYOD Work Profile, and Dedicated devices all converge through MGP binding; Zero-Touch Enrollment (ZTE) adds the ZT portal on top of MGP; AOSP uses neither portal. Choose a mode from the table below, then follow the guide for that mode.

For help choosing an enrollment mode, see the [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md) (five-mode comparison on ownership × management-scope axes) and the [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md) concept-only orientation. This page assumes the mode choice has been made.

## Setup Sequence
<a id="choose-your-mode"></a>

The table below shows every Android Enterprise admin setup path. Each mode routes to the portal(s) required for that mode, then terminates at the mode-specific admin guide (authored in Phase 36–39). Find the row that matches your chosen mode; each row names the downstream admin guide that covers enrollment profile creation, app and policy assignment, and compliance for that mode.

**LOCKED — 15 (nodes + labeled edges)** — 11 nodes + 4 labeled edges, independently re-derived from the pre-conversion flowchart (`git show 71be4ab`). The single decision point (`Choose your mode`) is represented below as one row per outcome — all 6 outcomes (COBO, BYOD Work Profile, Dedicated, Zero-Touch Enrollment, AOSP, Knox — KME) preserved.

| Mode | Required Portal(s) | Destination Guide |
|------|---------------------|--------------------|
| COBO (Fully Managed) | Managed Google Play | Phase 36 — COBO admin guide |
| BYOD Work Profile | Managed Google Play | Phase 37 — BYOD Work Profile guide |
| Dedicated (COSU) | Managed Google Play | Phase 38 — Dedicated devices guide |
| Zero-Touch Enrollment (ZTE) | Managed Google Play + Zero-Touch portal | Phase 39 — ZTE admin content |
| AOSP | None (no portal) | Phase 39 — AOSP stub |
| Knox Mobile Enrollment (KME, Samsung-only) | Samsung Knox Admin Portal | [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md) |

1. **[Managed Google Play Binding](01-managed-google-play.md)** — Bind the Intune tenant to Managed Google Play using an Entra account. Required for all GMS modes (COBO, BYOD WP, Dedicated, ZTE). Complete before any GMS enrollment profile.

2. **[Zero-Touch Portal Configuration](02-zero-touch-portal.md)** — Configure the Zero-Touch portal account and DPC extras JSON, and link ZT to Intune. Required for ZTE only. Reseller relationship (Step 0) must be in place before this guide.

3. **[Knox Mobile Enrollment](07-knox-mobile-enrollment.md)** — Configure Samsung Knox Admin Portal B2B account, create EMM profile pointing at Microsoft Intune, and assign profile to Samsung devices via reseller upload OR Knox Deployment App. Required for Samsung KME path only; mutually exclusive with Zero-Touch on the same Samsung device.

## Prerequisites

Each admin path has its own prerequisite set. Determine your path from the table above, then confirm the prerequisites for that path.

### GMS-Path Prerequisites

For COBO, BYOD Work Profile, and Dedicated enrollments:

- [ ] **Managed Google Play binding** — Complete [01-managed-google-play.md](01-managed-google-play.md) before any GMS enrollment profile.
- [ ] **Intune Administrator role** — Or custom RBAC role with enrollment management permissions.
- [ ] **Microsoft Intune Plan 1** (or higher) subscription.
- [ ] **Entra tenant active** — Required for Entra-preferred MGP binding (since August 2024).

### ZTE-Path Prerequisites

All GMS-path prerequisites PLUS:

- [ ] **Authorized Zero-Touch reseller relationship** — Devices must have been purchased from an authorized reseller. See [02-zero-touch-portal.md#step-0-reseller](02-zero-touch-portal.md#step-0-reseller).
- [ ] **Zero-Touch portal Google account** — Corporate email (NOT Gmail). Created at `accounts.google.com/signupwithoutgmail`.
- [ ] **ZT portal linked to Intune** — See [02-zero-touch-portal.md#link-zt-to-intune](02-zero-touch-portal.md#link-zt-to-intune).

### KME-Path Prerequisites

For Samsung Knox Mobile Enrollment (Samsung-only):

- [ ] **Samsung Knox B2B account** — Approval takes 1-2 business days. See [07-knox-mobile-enrollment.md#step-0-b2b-approval](07-knox-mobile-enrollment.md#step-0-b2b-approval).
- [ ] **Microsoft Intune Plan 1+** with Intune Administrator role.
- [ ] **Samsung devices** registered in Knox Admin Portal via reseller upload OR Knox Deployment App.
- [ ] **NOT also configured for Zero-Touch** on the same devices — KME and ZT are mutually exclusive on Samsung hardware.

### AOSP-Path Prerequisites

- [ ] **Intune Administrator role**
- [ ] **Microsoft Intune Plan 1** — Verify if Plan 2 / Intune Suite required per OEM; specialized AR/VR devices may require higher licensing. See [Phase 39 AOSP stub](06-aosp-stub.md) for OEM-specific licensing details.
- [ ] **Device is on AOSP-supported OEM list** — See [Phase 39 AOSP stub](06-aosp-stub.md) for the OEM compatibility list.

### Shared Prerequisites (All Paths)

- [ ] **Microsoft Intune Plan 1** (or higher) subscription.
- [ ] **Intune Administrator role** in Microsoft Intune admin center.
- [ ] **Active Entra tenant**.

## Portal Navigation Note

**Use `https://endpoint.microsoft.com` as the browser entry point for the Intune admin center.** The older `https://intune.microsoft.com` address remains active but may cause browser security zone mismatches during the Managed Google Play binding redirect flow (see [01-managed-google-play.md#what-breaks](01-managed-google-play.md#what-breaks) for the full what-breaks table covering this case).

Portal paths in these guides reflect the current documented experience. If menu locations differ:

- Look for equivalent options under **Devices** > **By platform** > **Android** > **Device onboarding** > **Enrollment**.
- Portal navigation may vary by Intune admin center version and tenant rollout timing.

## See Also

- [Managed Google Play Binding](01-managed-google-play.md)
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md)
- [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md)
- [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)
- [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-21 | Initial version — tri-portal setup sequence, 5-mode mermaid, per-path prerequisites, Portal Navigation Note | -- |
| 2026-04-25 | Phase 44: added 6th Mermaid branch (Knox - KME Samsung-only) terminating at 07-knox-mobile-enrollment.md; appended Setup Sequence item 3; inserted KME-Path Prerequisites H3 between ZTE-Path and AOSP-Path. | -- |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | Phase 122 plan 06: converted Mermaid flowchart to a Mode / Required Portal(s) / Destination Guide decision table (all 6 CHOOSE outcomes preserved); removed the mermaid fence; LOCKED — 15 (nodes + labeled edges, R1 convention); reworded 2 stale "diagram above/below" references to "table"; split the 1 pre-existing over-200-char Platform-gate blockquote into 3 word-preserving groups; enrolled as RE-092. | -- |
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed | — |