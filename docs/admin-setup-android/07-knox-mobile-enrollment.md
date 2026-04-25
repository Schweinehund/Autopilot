---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: KME
---

# Configure Knox Mobile Enrollment

> **Platform gate:** Samsung Knox Mobile Enrollment (KME) — Knox Admin Portal account setup, EMM profile, Custom JSON Data, and Knox→Intune handoff for Samsung Android Enterprise enrollment. Samsung-only.
> For iOS, see [iOS Admin Guides](../admin-setup-ios/00-overview.md); for macOS, [macOS Admin Setup](../admin-setup-macos/00-overview.md); for terminology, [Android glossary](../_glossary-android.md).

> ⚠️ **KME/ZT mutual exclusion (Samsung):** For Samsung fleets, choose either Knox Mobile Enrollment (KME) or Zero-Touch Enrollment — never both. Configuring both causes out-of-sync enrollment state; KME takes precedence at the device firmware level. See [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the within-ZT-doc record and [KME/ZT Mutual Exclusion](#kme-zt-mutual-exclusion) below for the within-this-doc record.

Phase 44 scope: Samsung Knox Admin Portal B2B account, EMM profile, Knox Custom JSON Data, and Knox→Intune handoff. KME provisions Samsung devices into existing Android Enterprise modes (COBO / Dedicated / WPCO); KME is NOT a separate enrollment mode.

<a id="prerequisites"></a>
## Prerequisites

- [ ] **MGP binding complete** — See [01-managed-google-play.md](01-managed-google-play.md); KME via Intune is a GMS path that requires Managed Google Play before Knox profile assignment.
- [ ] **Samsung Knox B2B account submitted** — Corporate-email-bound Samsung Knox B2B account; approval takes 1-2 business days. See [Step 0](#step-0-b2b-approval) below.
- [ ] **Samsung devices (Knox-eligible hardware)** — Knox Mobile Enrollment requires Samsung hardware; non-Samsung Android devices must enroll via Zero-Touch (see [02-zero-touch-portal.md](02-zero-touch-portal.md)) or QR / NFC / `afw#setup`.
- [ ] **Reseller channel OR Knox Deployment App pathway** — New procurement: Samsung devices uploaded by an authorized Samsung reseller. Existing stock: Knox Deployment App (KDA) on a separate Android device used to enroll Samsung devices via Bluetooth or NFC. See [Step 3](#step-3-add-devices) for both paths.
- [ ] **Microsoft Intune Plan 1+** with the Intune Administrator role and an exported Intune enrollment token for use in Knox Custom JSON Data (see [Step 5](#dpc-custom-json)).

<a id="step-0-b2b-approval"></a>
## Step 0 — Samsung Knox Portal B2B account approval (1-2 business days)

Submit your Samsung Knox B2B account application TODAY (Day 0). Samsung approval typically takes 1-2 business days, and Knox Admin Portal access is gated behind approval.

**Submit your B2B account:**

1. Navigate to the [Samsung Knox Portal](https://www.samsungknox.com/en/solutions/it-solutions/knox-mobile-enrollment) and select **Get started** → **Apply for a B2B account**. <!-- verify UI at execute time -->
2. Submit the corporate-email-bound application; expect 1-2 business days for approval.
3. While waiting, productively use the wait window:
   - Read the rest of this guide (Steps 1-N) to align on Knox profile, EMM choice, and DPC JSON.
   - Identify the Samsung devices in scope: serial numbers, IMEI 1, manufacturer (Samsung), model.
   - Coordinate with your authorized Samsung reseller (existing-stock route) OR plan Knox Deployment App (existing-stock retroactive route).
   - Export the Intune enrollment token for use in Step N (DPC Custom JSON Data).

> **What breaks if misconfigured:** Submitting B2B late delays the entire enrollment cycle by 1-2 business days at the moment devices are needed. Recovery: submit on Day 0; if Samsung approval is delayed beyond 2 business days, contact Samsung Knox B2B support with the application ID. Symptom appears in: Knox Admin Portal sign-in returns "Account pending approval".
