---
last_verified: 2026-04-21
review_by: 2026-06-20
audience: admin
platform: Android
applies_to: GMS-modes
---

# Bind Managed Google Play

> **Platform gate:** This guide covers Managed Google Play (MGP) tenant binding for Android
> Enterprise GMS modes: COBO (Fully Managed), BYOD Work Profile, Dedicated (COSU), and
> Zero-Touch Enrollment (ZTE). MGP binding is NOT required for AOSP.
> For iOS/iPadOS admin setup, see [iOS Admin Guides](../admin-setup-ios/00-overview.md).
> For macOS ADE, see [macOS Admin Setup](../admin-setup-macos/00-overview.md).
> For Android provisioning terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

Managed Google Play (MGP) binding is the hard prerequisite gate for every Android Enterprise GMS mode. A single binding per Intune tenant lets Intune approve apps, distribute configurations, and deliver LOB apps to enrolled devices. Without it, COBO, BYOD Work Profile, Dedicated, and the GMS path of ZTE cannot operate; only AOSP (non-GMS) devices are unaffected.

Binding is effectively one-way. Reversal is destructive — see [Disconnect Consequences](#disconnect-consequences) before binding.

## Prerequisites

- [ ] **Microsoft Intune Plan 1** (or higher) with Intune Administrator role (or a custom RBAC role granting enrollment-management permissions)
- [ ] **Microsoft Entra account** with corporate email and active mailbox (Entra preferred since August 2024 — see [Account Types](#account-types))
- [ ] **Two or more Entra account owners recommended** (Google requires a minimum of two; the linked account cannot be changed without disconnecting)
- [ ] **Browser security zones aligned** — `portal.azure.com`, `play.google.com`, and `enterprise.google.com` must share one zone (see [What Breaks](#what-breaks))

## Account Types

| Account type | Supported | Notes |
|---|---|---|
| Microsoft Entra account | YES — Preferred since August 2024 | Corporate email; active mailbox required for Google validation; manages the Google Admin account for the tenant |
| Consumer Gmail account | YES — Legacy supported | Pre-August-2024 bindings continue to work; new bindings should use Entra |
| Google Workspace / G-Suite | NO | Binding fails with opaque error; do not use |

**See also:** Binding migration for pre-August-2024 consumer Google/Gmail bindings — tracked for v1.4.1 and out of scope for v1.4.

## Steps

### Step 1: Navigate to Android enrollment prerequisites

#### In Intune admin center

1. Sign in to [Intune admin center](https://endpoint.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Android** tab > **Prerequisites** > **Managed Google Play**.

   > **What breaks if misconfigured:** Using `https://intune.microsoft.com` (older URL) can trigger a browser security-zone mismatch during the Google redirect, causing redirect loops or silent binding failure. Symptom appears in: admin browser (redirect loop) and Intune admin center (no binding recorded). See [What Breaks](#what-breaks) for recovery.

### Step 2: Accept data-sharing and launch Google

#### In Intune admin center

1. Review and accept the data-sharing terms. Microsoft sends user and device information to Google to enable Managed Google Play features.
2. Select **Launch Google to connect now**.

### Step 3: Confirm Entra account and grant Intune permission

#### In Managed Google Play

> **Account type check:** Google prefills your Microsoft Entra account. **As of August 2024, Entra is preferred.** Consumer Gmail remains supported for legacy tenants; Google Workspace accounts fail. See [Account Types](#account-types) above.

1. Confirm the prefilled Microsoft Entra account, or switch accounts.
2. Follow Google prompts to create the Google Admin account tied to your Entra account.
3. Select **Allow and create account** to grant Intune permission to manage your enterprise in Managed Google Play.

   > **What breaks if misconfigured:** Selecting a Google Workspace / G-Suite account causes binding to fail with an opaque error. Symptom appears in: Google error page during account selection. Recovery: use an Entra account (preferred) or consumer Gmail.

### Step 4: Verify auto-provisioned apps

#### In Managed Google Play

1. Sign in to [Managed Google Play](https://play.google.com/work) with the Entra account used to bind.
2. Confirm these four apps are auto-approved in your Managed Google Play store:
   - **Microsoft Intune** (`com.microsoft.intune`) — fully managed, dedicated, and COPE scenarios.
   - **Microsoft Authenticator** (`com.azure.authenticator`) — 2FA and Entra shared device mode.
   - **Intune Company Portal** (`com.microsoft.windowsintune.companyportal`) — work-profile and MAM.
   - **Managed Home Screen** (`com.microsoft.launcher.enterprise`) — multi-app kiosk on dedicated devices.

<a id="bind-mgp"></a>

<!-- ZT portal H4 intentionally deleted per Phase 34 subtractive-deletion pattern (D-17).
     MGP binding is not a Zero-Touch concern; ZT portal mechanics live in 02-zero-touch-portal.md. -->

## Verification

After binding completes:

- [ ] Four auto-provisioned apps visible in the Managed Google Play store (see Step 4).
- [ ] Binding status in Intune admin center > Devices > Enrollment > Android > Managed Google Play shows **Bound**.
- [ ] Assign one test app to a test user or group; confirm it appears in the target device's Managed Google Play store.

## What Breaks

| Failure mode | What happens | Downstream impact (modes broken) | Recovery |
|---|---|---|---|
| Binding disconnected | All app assignments lost; OEMConfig assignments lost; LOB app availability lost instantly | **CRITICAL**: COBO broken; BYOD WP broken; Dedicated broken; ZTE-GMS-path broken; AOSP unaffected | Re-bind; reassign every app and configuration manually. See [Disconnect Consequences](#disconnect-consequences) before attempting. |
| App assignment lost post-binding change | Apps disappear from managed device catalogs | Affects all modes that relied on the lost assignments | Re-approve apps in MGP; re-assign in Intune |
| Google Workspace / G-Suite account used | Binding fails with opaque error | None — no binding created | Use Entra account (preferred) or consumer Gmail |
| Consumer Gmail used (new binding post-August 2024) | Binding succeeds; Entra-preference path not taken | All GMS modes work but future migration required per v1.4.1 | See Also: "Binding migration for pre-August-2024 consumer Google/Gmail bindings — tracked for v1.4.1" (text-only stub, not hyperlink) |
| Wrong portal URL used (`intune.microsoft.com`) | Redirect may loop or fail silently; browser security zone mismatch (portal.azure.com / play.google.com / enterprise.google.com must share one zone) | None — no binding created | Use `endpoint.microsoft.com`; follow the MS Learn browser-zone tip |

## Disconnect Consequences

Disconnecting the binding disables Android Enterprise management for the entire tenant. **Required sequence before disconnecting:**

1. Retire all personally-owned Work Profile devices.
2. Retire all corporate-owned Work Profile devices.
3. Retire all fully managed devices.
4. Retire all dedicated devices.
5. Only then disconnect the binding.

After disconnect, app assignments, OEMConfig assignments, and LOB app availability are lost. Re-binding creates a new Google enterprise relationship — every app must be re-approved and every assignment recreated manually. Coordinate with app and device owners first.

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Managed Google Play binding (Entra-backed) | No expiry while Entra account remains active | New app approvals and app distribution stop; existing enrolled devices continue until token refresh fails | Re-bind via Intune admin center > Devices > Android > Managed Google Play — see this guide |
| Enrollment profile tokens (QR / DPC identifier / COBO token) | Configurable 1–65,535 days (GMS tokens can be set up to ~65 years) | New enrollments using the token fail; existing enrolled devices unaffected | Regenerate in Intune admin center > Devices > Android > Enrollment > [profile] |

## See Also

- [Zero-Touch Portal Configuration](02-zero-touch-portal.md)
- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md)
- [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)
- [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md#managed-google-play)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-21 | Initial version — MGP binding mechanics, account types, hybrid what-breaks table, disconnect consequences | -- |
