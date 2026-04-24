---
last_verified: 2026-04-23
review_by: 2026-07-22
applies_to: all
audience: L2
platform: Android
---

> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).

# Android Enrollment Investigation

## Context

This runbook covers Android Enterprise enrollment-failure investigation across all GMS-based modes (BYOD Work Profile, Fully Managed COBO, Dedicated COSU, Zero-Touch Enrollment). AOSP enrollment is out of scope — v1.4.1 (AEAOSPFULL-03 deferred).

Before starting: collect a diagnostic package per the [Android Log Collection Guide](18-android-log-collection.md) using the method appropriate for the enrollment mode (Company Portal logs for BYOD pre-AMAPI; Microsoft Intune app logs for BYOD post-AMAPI / COBO / Dedicated / ZTE; adb logcat as last-resort tier where USB debugging is available).

**From L1 escalation?** L1 runbook 22 (enrollment blocked) / 23 (work profile not created) / 24 (device not enrolled) / 27 (ZTE enrollment failed) has escalated. L1 collected: serial number, user UPN, mode (Fully managed / Work profile / Dedicated / ZTE), and device-side symptoms. Skip to the Pattern section matching L1's observation:
- L1 22 → Pattern E (Enrollment Restriction)
- L1 23 → Pattern A (Work Profile Not Created)
- L1 24 → start at Data Collection Step 1-4 to narrow mode; then Pattern B / D as identified
- L1 27 → Pattern C (ZTE Device Claim Failure)
- No L1 escalation: begin at Data Collection Step 1

> **Graph API scope:** Where this runbook references the Microsoft Graph API, usage is strictly READ-ONLY (GET requests). No modifications. No token regeneration. No DPC extras JSON mutation. For deep Android Enterprise Graph operations, see ADDTS-ANDROID-02 (future milestone — Android Graph API deep-dive).

## Investigation — Data Collection (mode-agnostic)

### Step 1: Device registration state (Intune admin center > Devices > All devices)

**Breadcrumb:** Intune admin center > **Devices** > **All devices** > search by serial number or filter by user UPN.

**Observables to collect:**

- Is the device visible at all? A device that never appears was not registered — enrollment was interrupted before the device reached Intune.
- **Managed by** field: should show `Microsoft Intune` for a successfully enrolled Android Enterprise device.
- **Enrollment type** field: maps to the mode. Expected values: `Android Enterprise (Work profile, Personally owned)` for BYOD; `Android Enterprise (Fully managed)` for COBO; `Android Enterprise (Dedicated)` for COSU; `Android Enterprise (Fully managed)` for ZTE (ZTE enrolls as Fully Managed).
- **Compliance state**: `Compliant` / `Not compliant` / `In grace period` / `Not evaluated` — a `Not evaluated` compliance state on a device that just enrolled is normal within the first evaluation window (~15-30 minutes).
- **Last check-in** timestamp: a device checked in within the last 24 hours shows active MDM communication.

**What a missing device tells you:**

- Device not registered → enrollment was blocked before reaching Intune. Proceed to Step 2 (enrollment restriction) to determine if a platform or ownership gate prevented registration.
- Device registered but shows wrong enrollment type → provisioning method or mode mismatch; correlate with Data Collection Step 3 (token/profile sync state).
- Device registered but stuck at `Not enrolled` → DPC provisioning started but did not complete; collect per Step 4.

### Step 2: Enrollment restriction blade state (platform/ownership gate)

**Breadcrumb:** Intune admin center > **Devices** > **Enroll devices** > **Android tab** > **Device platform restriction** AND **Device limit restriction**.

**Platform restriction — key settings for Android Enterprise:**

- **Android Enterprise (work profile) — Personally owned**: controls BYOD enrollment. If set to `Block`, BYOD users receive an enrollment-failure error at work profile creation.
- **Android Enterprise (fully managed) — Corporate-owned**: controls COBO/ZTE/Dedicated enrollment. If set to `Block`, corporate-owned provisioning is prevented.
- **Android (device administrator)**: should be `Block` for new enrollments — Android Device Administrator is deprecated; GMS-mode devices should enroll via Android Enterprise.

**Scope impact:** Restrictions can be scoped per-user or per-group. A restriction that blocks `Block Android Enterprise (work profile)` at the default level but allows it at a group-scoped level may produce inconsistent behavior depending on whether the enrolling user is in the correct Entra group.

**Device limit restriction:** Check the device limit restriction for the enrolling user's group. If the user has already enrolled N devices matching the cap, additional enrollment attempts will be blocked at the Intune registration step.

Cross-reference: [enrollment restrictions](../admin-setup-android/04-byod-work-profile.md#enrollment-restrictions) (BYOD-specific restriction blade configuration, Phase 37).

**What a misconfigured restriction tells you:**

- BYOD enrollment blocked → Pattern E (Enrollment Restriction) — see Analysis.
- COBO / Dedicated / ZTE enrollment blocked → also Pattern E but in the corporate-owned ownership tier.
- Device-limit hit → Escalation-path: admin must remove a stale device registration or raise the device-limit cap.

### Step 3: Token / profile sync state (mode-specific)

Token and profile state checks are mode-specific. Use the mode identified in Step 1 to select the correct check:

**BYOD Work Profile:**
- Verify that a Work Profile Policy exists in Intune admin center > **Devices** > **Configuration** and is assigned to the enrolling user's Entra group.
- Check that the Managed Google Play (MGP) binding is active: Intune admin center > **Tenant administration** > **Connectors and tokens** > **Managed Google Play** — status should show `Active`.
- Post-AMAPI (April 2025 onward): verify the Microsoft Intune app is approved in the MGP store under **Apps** > **Android** > **Managed Google Play**.

**Fully Managed COBO / ZTE:**
- Navigate to Intune admin center > **Devices** > **Android** > **Android enrollment** > **Corporate-owned devices** > **Enrollment profiles** — locate the enrollment profile expected for this device.
- Check the enrollment token: **last sync** timestamp, **expiry date** (default no-expiry; may be set to 90-day max per org policy), and **token status** (Active / Expired).
- For ZTE: also check Intune admin center > **Devices** > **Android** > **Android enrollment** > **Zero-touch enrollment** — the linked ZT account should show `Active` with a recent sync timestamp. Method A vs Method B linking per Phase 35 D-21.

**Dedicated COSU:**
- Navigate to Intune admin center > **Devices** > **Android** > **Android enrollment** > **Corporate-owned devices** > **Enrollment profiles** — locate the Dedicated enrollment profile.
- Check enrollment token expiry and QR code generation timestamp. QR codes generated from an expired token will fail enrollment silently.
- Verify the token is not approaching the rotation window if the device is mid-enrollment.

**Observables:** token expiry date, last-sync date, profile assignment group scope, token status (Active / Expired / Revoked).

### Step 4: Device-side enrollment state (collect per runbook 18 based on mode)

Collect device-side state using [Android Log Collection Guide](18-android-log-collection.md) Section 1, 2, or 3 per the mode:

- **BYOD pre-AMAPI** → Company Portal logs (Section 1). Confirm the end user can reach the log collection step — if Company Portal itself fails to open, fall back to adb logcat (Section 3).
- **BYOD post-AMAPI / COBO / Dedicated / ZTE** → Microsoft Intune app logs (Section 2). Self-service retrieval preferred; ticket-based if not available.
- **All modes (last-resort)** → adb logcat (Section 3), subject to device-owner USB-debug constraint. Run:

```bash
adb logcat -s DevicePolicyManager:* WorkProfileManager:* IntuneManagedAgent:*
```

**Key signals to look for:**

- `DPC setup intent received` in logcat indicates the provisioning DPC was invoked successfully. If absent, the issue is pre-DPC (token/profile delivery, QR scan, network, enrollment restriction).
- Work profile creation events (`WorkProfileManager:* createAndProvisionManagedProfile`) indicate the OS-layer profile creation was attempted.
- Policy application errors (`DevicePolicyManager:* ERROR`) indicate DPC invoked but policy delivery failed — this is deeper than enrollment and may indicate a configuration push issue.
- Company Portal / Microsoft Intune app error dialogs surfaced during enrollment correlate with specific error codes in the logs.

After completing Steps 1-4, proceed to Analysis — Match Against Known Patterns below.
