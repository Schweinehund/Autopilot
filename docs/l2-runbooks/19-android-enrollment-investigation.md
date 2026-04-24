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

## Analysis — Match Against Known Patterns

### Pattern A: Work Profile Not Created (BYOD) {#pattern-a-work-profile-not-created-byod}

**Typical class:** ⚙️ Config Error (enrollment restriction / work profile policy misalignment) — occasionally 🐛 Defect (AMAPI transition bug)

**Symptom:** The end user attempts BYOD enrollment via Company Portal or Microsoft Intune app; enrollment completes without an obvious error but no work profile badge (briefcase icon) appears on managed apps, OR the work profile creation step fails mid-flow with a message such as "Work profile setup could not be completed." The device may appear in Intune admin center but with compliance state `Not evaluated` and no work profile policy applied.

**Known Indicators:**

- Intune admin center > Devices > [device] > Configuration: no Work Profile device restriction policy shows as applied.
- Enrollment restriction blade: `Android Enterprise (work profile) — Personally owned` set to `Allow` but the scoped Entra group does not include the enrolling user.
- Work profile policy (device restrictions) exists but is assigned to a group that excludes the user.
- Company Portal shows "Work profile couldn't be set up" / Microsoft Intune app log contains `WorkProfileManager` provisioning failure.
- adb logcat: `WorkProfileManager createAndProvisionManagedProfile` call present but returns failure status.
- Post-AMAPI: Microsoft Intune app not approved in the MGP iFrame — BYOD enrollment stalls at app installation step.

**Resolution Steps:**

1. Verify the enrollment restriction allows `Android Enterprise (work profile) — Personally owned` for the user's Entra group. See [enrollment restrictions](../admin-setup-android/04-byod-work-profile.md#enrollment-restrictions) for restriction blade navigation.
2. Verify the work profile policy exists and is assigned to the correct Entra group. See [work profile policy](../admin-setup-android/04-byod-work-profile.md#work-profile-policy) for policy creation and assignment.
3. Confirm the privacy boundary is understood — Intune can only see work-profile-side data. See [privacy boundary](../admin-setup-android/04-byod-work-profile.md#privacy-boundary) for the admin/personal-side separation table.
4. For post-AMAPI tenants (April 2025 onward): verify Microsoft Intune app is approved in Managed Google Play and that the MGP binding is active (Intune admin center > Tenant administration > Connectors and tokens > Managed Google Play — status `Active`).
5. If enrollment restriction and policy assignment are correct and the issue persists: collect Microsoft Intune app logs (runbook 18 Section 2) and reproduce with verbose logging enabled. Check for `WorkProfileManager` and `IntuneManagedAgent` errors in the log output — AMAPI transition edge cases (e.g., pre-existing DA enrollment on the device preventing work-profile creation) appear here.
6. If a pre-existing Device Administrator enrollment is present on the device: the user must remove the DA enrollment manually (Settings > Accounts > Work account > Remove) before Company Portal / Microsoft Intune app can create the work profile.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** BYOD does not use an enrollment token. Capture the MGP binding status (Managed Google Play connector last-sync timestamp from Intune admin center > Tenant administration > Connectors and tokens > Managed Google Play).
- **Profile assignment state:** Intune admin center > Devices > Enrollment > Android tab > Device platform restriction — screenshot showing whether `Android Enterprise (work profile) — Personally owned` is `Allow` or `Block` for the user's group. Also capture the work profile policy assignment state (Devices > Configuration > [policy] > Device assignment status).
- **Enrollment profile GUID:** BYOD Work Profile does not use an enrollment profile GUID in the same sense as COBO/ZTE. Capture the enrollment restriction policy ID from the Intune admin center URL when viewing the restriction: `.../enrollmentRestrictions/{GUID}/overview`.

---

### Pattern B: COBO Enrollment Stuck {#pattern-b-cobo-enrollment-stuck}

**Typical class:** ⚙️ Config Error (enrollment profile / token) + ⏱️ Timing (post-scan propagation)

**Symptom:** A corporate-owned device is provisioned via QR code, NFC, or `afw#setup` for Fully Managed COBO enrollment. The device scans the QR code (or receives the NFC bump) but either stalls at the "Setting up your work device" screen for more than 15 minutes, or completes Setup Wizard but never appears in the Intune admin center (or appears with wrong enrollment type).

**Known Indicators:**

- QR code or NFC payload was generated from a token that has since been revoked or expired.
- Intune admin center > Android enrollment > Corporate-owned devices > Enrollment profiles: the target enrollment profile shows `Expired` or `Revoked` token.
- Device stalls at Google DPC (CloudDPC) loading screen — Play Services connectivity issue (device cannot reach `play.google.com` to download DPC).
- Device completes provisioning but shows as `Android (device administrator)` enrollment type instead of `Android Enterprise (Fully managed)` — afw#setup path fell back to DA mode on Android < 10.
- adb logcat: `DevicePolicyManager setDeviceOwner` succeeded but subsequent policy push fails — enrollment profile policy assignment group not covering the device.

**Resolution Steps:**

1. Verify the enrollment token used to generate the QR/NFC payload is still active. Navigate to Intune admin center > Devices > Android > Android enrollment > Corporate-owned devices > Enrollment profiles > [profile] > Enrollment tokens. If expired, generate a new token and re-generate the QR code. See [Android Enterprise Fully Managed COBO Admin Setup](../admin-setup-android/03-fully-managed-cobo.md#enrollment-profile) for enrollment profile token lifecycle.
2. Confirm GMS connectivity: the provisioning device must reach `play.google.com` and Android Enterprise endpoints to download the Intune DPC (CloudDPC). Test connectivity from the provisioning network before re-trying.
3. If stalled at "Setting up your work device" for more than 20 minutes with connectivity confirmed: factory-reset the device and re-attempt provisioning with a freshly generated QR code.
4. For timing issues (post-scan propagation): after a successful QR/NFC scan, allow 15-30 minutes for the device to appear in Intune admin center with the correct enrollment type. Do not factory-reset within this window.
5. If device appears in the admin center with wrong enrollment type (`Device administrator` instead of `Fully managed`): the device OS version may be below Android 10 (the Fully Managed COBO minimum). Check the device's Android OS version. If Android 9 or below, COBO enrollment is not supported — device requires upgrade or replacement.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Capture enrollment token state from Intune admin center > Devices > Android > Android enrollment > Corporate-owned devices > Enrollment profiles > [profile] > Enrollment tokens — specifically: token expiry date, last-used timestamp, and current status (Active / Expired / Revoked).
- **Profile assignment state:** Intune admin center > Devices > Enrollment > Android tab > Corporate-owned devices > Enrollment profiles > [profile] > Properties — screenshot of the profile assignment group. Confirm the Entra group includes the device (or device-enrolled user).
- **Enrollment profile GUID:** From the Intune admin center URL when viewing the profile: `.../enrollmentProfiles/{GUID}/overview`. Also capturable via Graph API READ-ONLY: `GET https://graph.microsoft.com/beta/deviceManagement/androidManagedStoreAccountEnterpriseSettings` or `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`.

---

### Pattern C: ZTE Device Claim Failure {#pattern-c-zte-device-claim-failure}

**Typical class:** ⚙️ Config Error (configuration not assigned; reseller upload gap) + 🐛 Defect (reseller handoff edge cases)

**Symptom:** A Samsung or Android Enterprise device purchased from an authorized ZTE reseller is powered on for first boot, but does not enter the Intune DPC enrollment flow — the device boots into the consumer Android Setup Wizard instead of the Intune/CloudDPC provisioning flow. Alternatively, the device enters the ZTE DPC flow but the enrollment fails with a "Configuration not found" or similar error.

**Known Indicators:**

- Device boots to consumer Setup Wizard (language/Wi-Fi/Google account setup) instead of the Intune CloudDPC provisioning flow — ZTE configuration was not assigned to this device in the Zero-Touch portal.
- ZTE portal (enterprise.google.com/android/zero-touch) shows the device as claimed but with no configuration assigned.
- ZTE portal shows the device as **not claimed** — reseller upload did not include this device's IMEI/serial, or dual-SIM device was registered under IMEI 2 instead of IMEI 1.
- Configuration exists in the ZTE portal but was not assigned to the device set before first boot.
- Samsung device with both ZTE and KME (Knox Mobile Enrollment) configured — device enrolled via KME, ignoring ZTE configuration (KME/ZT mutual exclusion behavior).
- adb logcat: no `CloudDPC` or `zero-touch` provisioning events on first boot — device never received the ZTE DPC intent.

**Resolution Steps:**

1. Confirm the device's IMEI/serial is present in the ZTE portal under **Devices**. If absent: the reseller did not upload it, or uploaded under the wrong identifier. Contact the reseller per the [reseller upload handoff](../admin-setup-android/02-zero-touch-portal.md#reseller-upload-handoff) workflow — confirm correct corporate Google account association and IMEI format.
2. If the device appears in the ZTE portal but has no configuration assigned: navigate to ZTE portal > **Devices** > select the device > **Assign configuration**. Verify a valid Intune-linked configuration exists. See [device claim workflow](../admin-setup-android/02-zero-touch-portal.md#device-claim-workflow) for the three decision points at device-claim time.
3. Verify the ZTE configuration is actually assigned to the device set — a configuration that exists but is not assigned to any device is inert. See [configuration must be assigned](../admin-setup-android/02-zero-touch-portal.md#configuration-must-be-assigned) for the explicit ZT portal assignment step.
4. For fleet-scale operations: confirm Method A vs Method B linking choice per [profile assignment at scale](../admin-setup-android/02-zero-touch-portal.md#profile-assignment). Method A (iframe) creates a Fully Managed default that overrides Method B ZT portal configurations — a non-COBO fleet erroneously linked via Method A will enroll devices as Fully Managed regardless of intended mode.
5. For Samsung devices: check whether the device is also registered in Knox Mobile Enrollment (KME). Per [KME / ZT device claim mutual exclusion](../admin-setup-android/02-zero-touch-portal.md#kme-zt-device-claim): a device registered in both KME and ZTE will silently enroll via KME, ignoring the ZTE configuration. Remove the KME configuration for the device before re-attempting ZTE enrollment, then factory-reset the device.
6. After correcting the ZTE portal configuration assignment, factory-reset the device and re-attempt first boot to trigger the ZTE provisioning flow.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** ZTE token state = ZT↔Intune linking account status. Navigate to Intune admin center > Devices > Android > Android enrollment > Zero-touch enrollment — screenshot showing the linked ZT account, last sync timestamp, and status (Active / Error).
- **Profile assignment state:** ZTE portal screenshot of the device's assigned configuration (or the absence of one). Also: Intune admin center > Devices > Enrollment > Android tab > Zero-touch enrollment — profile assignment diagnostic showing whether the Intune-linked ZT configuration is active.
- **Enrollment profile GUID:** From Intune admin center URL when viewing the ZTE-linked enrollment profile, or via Graph API READ-ONLY: `GET https://graph.microsoft.com/beta/deviceManagement/androidManagedStoreAccountEnterpriseSettings` — capture `id` field of the enrollment profile associated with the ZTE configuration.

---

### Pattern D: Dedicated QR Scan Failure {#pattern-d-dedicated-qr-scan-failure}

**Typical class:** ⚙️ Config Error (QR profile / COSU token) + ⏱️ Timing (QR token rotation window)

**Symptom:** A kiosk or single-purpose Dedicated (COSU) device scans the QR code but enrollment fails or the device enrolls in the wrong mode. Symptoms include: QR code scan succeeds but DPC setup fails partway through, the device boots into a generic Android setup instead of the kiosk/locked-app experience, or the device appears in Intune as Fully Managed instead of Dedicated.

**Known Indicators:**

- Enrollment profile in Intune is configured for "Dedicated" but the QR code was generated from a Fully Managed enrollment profile — device enrolls as Fully Managed.
- QR code was generated from a token that has since been rotated or expired. New QR code is required after each token rotation.
- adb logcat: `DevicePolicyManager setDeviceOwner` succeeds but no kiosk lockdown apps appear — kiosk app configuration (Managed Home Screen, or single-app lock) assignment group does not cover the enrolled device.
- Device boots with full Android launcher instead of kiosk/locked experience — Dedicated kiosk policy is not assigned to the device.
- On some OEM builds, the QR code scanner at out-of-box setup does not appear until the device connects to Wi-Fi and Play Services initializes.

**Resolution Steps:**

1. Verify the QR code was generated from the correct **Dedicated** enrollment profile (not a Fully Managed / COBO profile). Navigate to Intune admin center > Devices > Android > Android enrollment > Corporate-owned devices > Enrollment profiles > [profile] > Properties. Confirm the profile type shows `Dedicated device`. See [Dedicated Devices Admin Setup](../admin-setup-android/05-dedicated-devices.md#enrollment-profile).
2. Check the enrollment token expiry and last rotation date. If the token was rotated after the QR code was generated, re-generate the QR code from the new token. See [enrollment token lifecycle](../admin-setup-android/05-dedicated-devices.md#enrollment-token) for the QR code / token relationship.
3. Confirm that the kiosk policy (Managed Home Screen configuration or single-app kiosk configuration) is assigned to the Entra group that will include the newly enrolled Dedicated device. If the policy is not assigned, the device enrolls but displays the full Android launcher.
4. For OEM-specific QR scanner availability issues: ensure the device is connected to Wi-Fi and that Play Services has initialized before attempting the QR scan. If the QR scan option does not appear at Setup Wizard, try the `afw#setup` provisioning method as an alternative.
5. ⏱️ Timing: after a successful QR scan and CloudDPC enrollment, allow 15-30 minutes for policy to propagate and the kiosk app experience to take effect. A device that shows full launcher immediately after enrollment is likely in the first-sync propagation window — do not factory-reset within this window.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Enrollment token state for the Dedicated profile — navigate to Intune admin center > Devices > Android > Android enrollment > Corporate-owned devices > Enrollment profiles > [profile] > Enrollment tokens. Screenshot showing token expiry, last-rotated timestamp, and status (Active / Expired / Revoked).
- **Profile assignment state:** Intune admin center > Devices > Enrollment > Android tab > Dedicated enrollment profiles > [profile] assignment diagnostic. Confirm Entra group assignment and whether the device's enrolled identity falls in scope.
- **Enrollment profile GUID:** From Intune admin center URL when viewing the Dedicated enrollment profile: `.../enrollmentProfiles/{GUID}/overview`. Also via Graph API READ-ONLY: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`.

---

### Pattern E: Tenant-Config-Universal (Enrollment Restriction) {#pattern-e-tenant-config-universal}

**Typical class:** ⚙️ Config Error (enrollment restriction blade — platform/ownership gate blocks Android Enterprise or specific ownership type)

**Symptom:** Android enrollment fails regardless of mode. Multiple users on different devices — BYOD, COBO, or Dedicated — are all blocked at enrollment. Or a specific ownership type (personally owned OR corporate-owned) is systematically blocked while the other succeeds. The user-facing message is typically "Your organization does not allow enrollment of personally owned devices" or a generic enrollment-failure error.

**Known Indicators:**

- Multiple users / multiple devices failing enrollment simultaneously — single-device failures point to Pattern A/B/C/D; multi-device failure pointing to Pattern E (tenant-wide config).
- Enrollment restriction blade shows `Android Enterprise (work profile) — Personally owned`: `Block` for a BYOD deployment (common misconfiguration: admin blocked personally-owned by default).
- Enrollment restriction shows `Android Enterprise (fully managed) — Corporate-owned`: `Block` — blocks COBO/ZTE/Dedicated enrollment tenant-wide.
- Recently modified enrollment restriction (check restriction audit log: Intune admin center > Tenant administration > Audit logs, filter by "Enrollment restriction") correlating with the onset of failures.
- No per-user group assignment on the restriction override — the default restriction applies to all users and the intended per-group override was not created or scoped correctly.

**Resolution Steps:**

1. Navigate to Intune admin center > Devices > Enroll devices > Android tab > Device platform restriction. Identify the restriction that applies to the affected users' Entra group (or the default restriction if no group override exists).
2. Review which Android Enterprise ownership types and enrollment modes are set to `Allow` vs `Block`. For a BYOD deployment: `Android Enterprise (work profile) — Personally owned` must be `Allow`. For COBO/ZTE/Dedicated: `Android Enterprise (fully managed) — Corporate-owned` must be `Allow`.
3. If the restriction was recently modified: review the audit log (Intune admin center > Tenant administration > Audit logs, filter by "Enrollment restriction") for who made the change and when. Roll back the change or correct the setting.
4. For per-group restriction overrides: confirm the Entra group containing the affected users is assigned to the correct override restriction. A user in a group with an overly restrictive override AND outside the permissive-override group will fall back to the default restriction.
5. Cross-reference: [enrollment restrictions](../admin-setup-android/04-byod-work-profile.md#enrollment-restrictions) for BYOD restriction blade configuration, including the recommended block/allow combination for BYOD user groups.
6. After correcting the restriction, the affected users should re-attempt enrollment. No device factory-reset is required for restriction-only fixes — the restriction check occurs at the start of enrollment, before device-side provisioning begins.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Not applicable for Pattern E (enrollment restriction is tenant-config, no token involved). Capture the enrollment restriction configuration screenshot instead (Intune admin center > Devices > Enroll devices > Android tab > Device platform restriction — show the affected restriction rule with all platform/ownership type settings visible).
- **Profile assignment state:** Intune admin center > Devices > Enrollment > Android tab > Device platform restriction — screenshot of the restriction assignment (which Entra groups the restriction is scoped to). Confirm whether the default restriction or a group-scoped override applies to the affected users.
- **Enrollment profile GUID:** Capture the restriction policy ID from the Intune admin center URL when viewing the restriction: `.../enrollmentRestrictions/{GUID}/overview`. This is the enrollment restriction ID — not an enrollment profile GUID, but the equivalent unique identifier for Pattern E escalation.
