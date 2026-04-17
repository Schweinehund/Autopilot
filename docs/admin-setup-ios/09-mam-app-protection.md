---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: mam-we
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS Microsoft Intune app protection policies (MAM Without Enrollment — MAM-WE). MAM-WE protects work data inside SDK-integrated apps without enrolling the device in Intune MDM.
> For iOS/iPadOS enrollment (MDM) setup, see [iOS/iPadOS Admin Setup Overview](00-overview.md) — optional context, not required to follow this guide.
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS MAM-WE App Protection Policies

Microsoft Intune app protection policies protect work data within SDK-integrated apps without enrolling the device in Intune MDM. This is called MAM Without Enrollment (MAM-WE). On iOS, MAM-WE applies to apps like Outlook, Teams, and Microsoft Edge that integrate the Intune App SDK. The device is not enrolled; no MDM profile is installed; IT has no device-level management capability. Policy controls apply only within managed apps and govern how work data can move into, out of, and within those apps.

Although this guide lives alongside MDM enrollment guides, MAM-WE is an app-layer protection model that does not require — and is not paired with — device enrollment. Everything you need to configure MAM-WE is in this guide; you do not need to read any MDM enrollment guide first.

## Key Concepts Before You Begin

### What MAM-WE Is — and What It Is Not

MAM-WE is an **app-layer data protection model**. Microsoft Intune publishes app protection policies that the Intune App SDK, embedded inside participating apps (Outlook, Teams, Edge, Microsoft 365 apps, third-party SDK-integrated apps), enforces locally on the device. The policies govern:

- **Data ingress** — How work data enters a managed app (for example, "paste work content into this managed app but not into a personal app").
- **Data egress** — How work data leaves a managed app (for example, "do not allow Save As to personal locations").
- **Access controls** — Whether the app requires a work-account PIN before opening.
- **Device conditions** — Policy responses to jailbreak detection, OS-version gates, or other device-state signals reported by the SDK.

MAM-WE is NOT:

- A device enrollment mechanism (the device is never enrolled in Intune MDM).
- An MDM profile installation (no profile is delivered to the device).
- A full-device configuration model (only managed apps are governed; personal apps are untouched).
- A guarantee against all data loss (a determined user who owns a jailbroken device can extract data; MAM-WE is a reasonable-compensating-control, not a high-assurance model).

### MAM-WE Requires the Intune App SDK

Only apps that have integrated the Intune App SDK can be governed by MAM-WE policies. For Microsoft-published apps (Outlook, Teams, Edge, Microsoft 365 suite, Authenticator, OneDrive, etc.), SDK integration is built in — the apps are MAM-capable out of the box. For third-party apps, the developer must integrate the SDK and publish a MAM-capable build. Apps without SDK integration cannot be governed by app protection policies regardless of which policies target the user.

### The Three-Level Data Protection Framework

Microsoft groups app protection policy settings into three preset levels that correspond to increasingly restrictive data-protection postures:

- **Level 1 — Enterprise Basic Data Protection** — Minimum recommended settings; typical for casual enterprise use with no regulatory requirement.
- **Level 2 — Enterprise Enhanced Data Protection** — Recommended default for BYOD and typical enterprise users; blocks data leakage to personal apps while remaining usable.
- **Level 3 — Enterprise High Data Protection** — Strictest settings; typical for regulated industries (finance, healthcare) where misconfiguration carries compliance consequences.

This guide covers all three levels. Level 1 is summarized; Levels 2 and 3 get detailed treatment with What Breaks If Misconfigured callouts because their misconfiguration has the greatest operational consequence.

### Enrolled vs Unenrolled Targeting

MAM-WE policies can target iOS devices in two modes, set per policy:

- **Unenrolled (MAM-WE)** — Device is not enrolled in Intune MDM. Policy applies based on the Entra work account signed into the managed app. This is the mode implied by "MAM-WE" and is the primary focus of this guide.
- **Enrolled (MAM-over-MDM)** — Device is also enrolled in Intune MDM. Policy applies to managed apps on the enrolled device.

Both modes use the same policy definition and the same SDK enforcement. They differ in how the device and user are identified and what additional management surface exists on the device. Most organizations target one mode per user segment; some target both for mixed fleets transitioning between models.

## Prerequisites

- **Microsoft Intune Plan 1** (or higher) subscription with app protection policy licensing.
- **Microsoft Entra ID** — Users must have Entra work accounts with Intune license assigned.
- **MAM-capable apps** available to end users — Microsoft Authenticator, Outlook, Teams, Edge, or third-party SDK-integrated apps distributed via the App Store or VPP. Users must sign into these apps with their work account for policy to apply.
- **Intune Administrator role** — Or a custom RBAC role with app-protection-policy management permissions.
- **iOS 15 or later recommended** (verify current minimum against Microsoft Learn `app-protection-policies` at time of writing — some settings require newer iOS versions).

MAM-WE does **not** require an APNs certificate, ABM token, or MDM enrollment profile. The device is never enrolled in Intune MDM.

## Three-Level Data Protection Framework (Summary)

The table below summarizes the three preset levels against the attributes that most commonly affect policy-choice decisions. Use this as the starting point when choosing a level for a user segment; detailed Level 2 and Level 3 policy-setting inventories follow later in this guide. For the full Level 1 setting inventory, see Microsoft Learn [App protection data protection framework](https://learn.microsoft.com/mem/intune/apps/app-protection-framework).

| Attribute | Level 1 — Basic | Level 2 — Enhanced | Level 3 — High |
|-----------|-----------------|---------------------|-----------------|
| **Typical use case** | Casual enterprise use; no regulatory requirement | BYOD default; typical enterprise | Regulated industries; high-sensitivity data |
| **Work-account PIN required** | Yes (simple PIN, 4 digits) | Yes (stronger PIN, numeric complexity) | Yes (biometric + passcode, timed re-authentication) |
| **Data egress to personal apps** | Restricted (prompt on copy/paste) | Blocked (policy-managed apps only) | Blocked (managed apps only) + managed keyboard |
| **Data ingress from personal apps** | Allowed | Restricted | Blocked |
| **Save As to personal locations** | Allowed | Blocked | Blocked |
| **Jailbreak detection response** | Warn | Block + wipe managed data | Block + wipe managed data |
| **Minimum iOS version gate** | None | Yes (configurable) | Yes (stricter) |
| **Additional iOS-specific controls** | None | Clipboard restrictions | Clipboard + keyboard + screen capture restrictions |

For complete iOS setting inventories at each level, see the sections below. Level 1 is documented in full on Microsoft Learn (linked above); this guide covers Level 2 and Level 3 in detail because their misconfiguration has the greatest operational consequence.

## Targeting: Enrolled vs Unenrolled Devices

Every app protection policy in Intune has a **Target to** setting that determines which device mode receives the policy. Choose the mode that matches your user segment's management posture.

### Comparison

| Attribute | Unenrolled (MAM-WE) | Enrolled (MAM-over-MDM) |
|-----------|---------------------|--------------------------|
| Device state | Not enrolled in Intune MDM | Enrolled in Intune MDM (Device Enrollment, User Enrollment, or ADE) |
| User identifier | Entra work account signed into managed app | Entra work account + MDM enrollment identifier |
| Assignment UX | Assigned to user groups; applies when user signs into managed app | Assigned to user or device groups; applies at app launch on enrolled device |
| Typical scenario | BYOD without device enrollment; contractor/contingent workforce | Corporate fleet where both device-level and app-level control are desired |

### Decision Guidance

- **Use unenrolled (MAM-WE) targeting** when users own the device and the organization prefers not to enroll the device — common for BYOD scenarios, contractor access, and privacy-sensitive use cases.
- **Use enrolled (MAM-over-MDM) targeting** when users enroll via corporate ADE, Device Enrollment, or User Enrollment, AND the organization wants to enforce app-layer controls in addition to device-layer controls.
- **Target both modes** with separate policies (same settings, two `Target to` values) when the user segment has mixed device-state — some users enroll their devices, others use MAM-WE only.

Do not target both modes with a single policy using overlapping device groups — conflicting policies resolve via Intune's policy-conflict rules and may apply unexpectedly. Create two separate policy objects with distinct Target-to modes instead.
