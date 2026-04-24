---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L2
platform: Android
---

> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).

# Android App Install Investigation

## Context

This runbook covers L2 investigation for Android managed app delivery failures across all GMS enrollment modes (BYOD Work Profile, Fully Managed COBO, Dedicated COSU, Zero-Touch Enrollment). It addresses three delivery channels surfaced in Intune:

- **Managed Google Play (MGP) apps** — the primary delivery channel for all GMS Android Enterprise modes; apps are approved in the MGP iFrame and assigned via Intune.
- **LOB (APK) apps** — line-of-business APK files uploaded directly to Intune; distributed via the same MDM channel as MGP apps.
- **MAM intersection** — cases where an app protection policy is layered on top of a successfully installed MGP or LOB app.

Unlike iOS (where supervision state and licensing model are the primary failure axes), Android app install failures turn on **MGP approval state**, **assignment group scope**, **MGP tenant binding**, and the **silent-install boundary** between device-owner mode (COBO / Dedicated — always silent) and work-profile mode (BYOD — user-licensed via MGP, silent for Required assignments post-AMAPI).

Before starting: collect a diagnostic package per [Android Log Collection Guide](18-android-log-collection.md).

**From L1 escalation?** L1 runbook 26 (Android MGP App Not Installed) has escalated. L1 collected: serial number, user UPN, mode, app name, and device install status visible in Company Portal / Microsoft Intune app. Skip to Three-Class Disambiguation below and the matching failure class.

Starting fresh? Begin at Investigation — Data Collection.

> **MAM-WE scope:** MAM-WE app protection policy failures (selective wipe not applying, PIN loop, conditional launch blocks) are out of Phase 41 scope — see [Android MAM-WE Investigation Advisory](00-index.md#android-mam-we-investigation-advisory) for deferred ADDTS-ANDROID-01 milestone routing.

---

## Three-Class Disambiguation

This runbook tags every failure pattern with one of three classes:

- **⚙️ Config Error** — app not approved in MGP iFrame; wrong assignment group scope; no MGP tenant binding; Custom mode hiding app; policy scope drift. Fix in Intune admin center / Managed Google Play iFrame.
- **⏱️ Timing Issue** — ~24-hour Managed Google Play sync delay; first-assignment propagation; user-to-MGP-account binding delay; MDM check-in cadence. No admin change required — wait for next sync or trigger a Company Portal / Microsoft Intune app Sync.
- **🐛 Genuine Defect** — app consistently fails across multiple devices; MGP portal binding error; specific error code in device install status payload. All ⚙️ conditions verified; all ⏱️ windows elapsed; still failing. Escalate to Microsoft Support with the data-collection checklist below.

When investigating, rule out ⚙️ Config first, then ⏱️ Timing, then declare 🐛 Defect.

---

## Investigation — Data Collection

### Step 1: App assignment state

Intune admin center > **Apps** > **Android** > **[app]** > **Properties** > **Assignments** tab.

Verify:
- Assignment type: Required / Available / Uninstall
- Target group: device group vs user group — note which group and whether the affected user/device is a member
- Filters applied — check if an assignment filter excludes this device

Also confirm the app type displayed in Properties (Managed Google Play app vs Android line-of-business app).

### Step 2: Managed Google Play approval and iFrame state

In Intune admin center, confirm the app's MGP approval state:

1. **Apps** > **Android** > **[app]** > **Properties** — look for approval state (Approved / Unapproved) in the app information panel.
2. Verify the MGP tenant binding is active: **Tenant administration** > **Connectors and tokens** > **Managed Google Play** — confirm status is **Connected** and the binding is not expired.

A disconnected or expired MGP binding blocks ALL MGP app delivery for the tenant regardless of individual app assignments.

### Step 3: User-to-MGP-account binding state

For BYOD Work Profile enrollments (user-based licensing context):

Intune admin center > **Users** > **[user]** > **Devices** — confirm the device is enrolled and showing the correct enrollment mode. Review whether the user account has a current MGP account binding. A recently re-provisioned or re-enrolled user may still be in the MGP account binding propagation window (1-4 hours typical).

For device-owner modes (COBO / Dedicated / ZTE), user-to-MGP binding is not applicable — proceed to Step 4.

### Step 4: Device install status

Intune admin center > **Devices** > **[device]** > **Managed Apps** OR navigate to **Apps** > **Android** > **[app]** > **Device install status** report and filter by device.

Document:
- Install status: Installed / Not installed / Failed / Pending / Not applicable [MEDIUM, last_verified 2026-04-23]
- Error code if present (Failed status may surface a numeric error code in the status payload)
- Last check-in timestamp

### Step 5: Device-side log review

Per runbook 18 method-selection matrix:

- **BYOD pre-AMAPI:** Company Portal logs (runbook 18 Section 1) — look for app install request/response events
- **BYOD post-AMAPI / COBO / Dedicated / ZTE:** Microsoft Intune app logs (runbook 18 Section 2) — look for MDM app delivery events
- **All modes (last resort):** `adb logcat` (runbook 18 Section 3) — `adb shell pm list packages | grep <mgp-package-name>` to verify whether the package is present on-device despite Intune showing Not installed

---

## Common Failures by Class

### ⚙️ Config Errors

| Failure | Indicator | Resolution |
|---------|-----------|------------|
| App not approved in MGP iFrame | Intune admin center shows app exists but Approval state = Unapproved | Approve in MGP iFrame: Intune admin center > Apps > Android > Managed Google Play > open iFrame > approve |
| Wrong assignment group scope | App Properties shows assignment to group that does not include the affected user or device | Add correct group to Required / Available assignment; verify group membership for affected device |
| No MGP tenant binding or binding expired | Tenant administration > Connectors and tokens > Managed Google Play shows "Not connected" or expired binding date | Re-bind per [Managed Google Play admin guide](../admin-setup-android/01-managed-google-play.md) |
| Custom mode hiding app from launcher | Dedicated (COSU) device has Managed Home Screen (MHS) config that excludes the app from the allowed-app list | Update MHS allowed-apps config in Intune to include the app; reassign MHS profile |
| Assignment filter excludes device | Device install status shows Not applicable; assignment filter rule does not match device properties | Review filter rule against device properties; adjust filter or remove filter from this assignment |
| LOB APK version mismatch | Intune shows newer APK version than device; device rejected update due to package signature mismatch | Verify APK is signed with the same key as prior version; re-upload correct APK |

### ⏱️ Timing Issues

| Failure | Indicator | Resolution |
|---------|-----------|------------|
| MGP sync delay after first assignment | App correctly assigned in Intune; not yet visible or installable on device; app is newly assigned | Wait up to 24 hours for MGP catalog sync; or trigger Microsoft Intune app / Company Portal Sync from device |
| First-assignment propagation window | App assigned minutes ago; device install status = Pending with no error | Wait 15-60 minutes; re-check device install status |
| User-MGP account re-provisioning delay | User recently re-enrolled or re-activated Intune; MGP account binding in progress | Wait 1-4 hours; verify user MGP account binding state after window elapses |
| MDM check-in cadence | Device has not checked in since assignment was made; install status Pending | Trigger remote Sync from Intune admin center (Devices > [device] > Sync) or instruct user to open Microsoft Intune app / Company Portal and tap Sync |

### 🐛 Genuine Defects

Declare Genuine Defect only when ALL ⚙️ Config conditions above have been verified AND all ⏱️ Timing windows have elapsed AND the install still fails with no actionable error. Misclassifying a Config or Timing issue as a Defect wastes Microsoft Support engineering time.

| Indicator | Action |
|-----------|--------|
| App consistently fails across multiple devices using the same MGP entry | Escalate to Microsoft Support with MGP app ID + logs from at least two failing devices |
| Specific error code surfaced in device install status payload — not in Phase 38 / runbook 26 known-error catalog | Escalate with logcat trace from runbook 18 Section 3 + device install status screenshot showing error code |
| MGP portal binding shows error state after confirmed ⚙️ fixes were applied | Escalate with MGP binding state screenshot + Tenant administration > Connectors and tokens history |
| LOB APK install stalled on all devices despite valid APK and correct assignment | Escalate with APK upload timestamp, device install status screenshots, and Microsoft Intune app log incident IDs per runbook 18 Section 2 |

---

## LOB (APK) App Distribution

LOB (line-of-business) APK distribution via Intune follows the same three-class pattern as MGP apps, with the MGP iFrame approval step replaced by direct APK upload. Specific considerations:

- **APK upload path:** Intune admin center > Apps > Android > Add > Line-of-business app > upload `.apk` file.
- **Package signature requirement:** Every update to an LOB APK must be signed with the same certificate as the original upload. A signature mismatch causes a silent install failure — devices will reject the update.
- **Assignment type:** Required assignment installs silently on device-owner-mode devices (COBO / Dedicated / ZTE). BYOD Work Profile Required assignment installs silently post-AMAPI; user-prompted on pre-AMAPI legacy tenants.
- **APK size limit:** Intune enforces an APK upload size limit. Very large APKs may fail to upload or time out during device download. Reduce APK size or split the app into base + split APKs if needed.

There is no MGP iFrame to approve for LOB APKs — the ⚙️ Config check for LOB is: app uploaded, correct version, valid signature, assignment to correct group.

---

## MAM Intersection

App protection policies (APP) applied to Managed Google Play or LOB apps add a second evaluation layer on top of successful app delivery. The app install itself may succeed while a protection policy blocks access to the app.

Common intersection failures (these are NOT app install failures — the app IS installed):

- **APP targeting scope excludes the user** — app installs correctly and appears on device, but launches blocked by a conditional launch rule checking APP assignment. Verify the user is in the APP target group in Intune admin center > Apps > App protection policies > [policy] > Assignments.
- **Conditional launch rule mismatched** — app installs and launches, then exits. Check conditional launch settings (minimum OS version, minimum app version, jailbreak/root check, required PIN) against device state.
- **Work profile container integrity** — on BYOD Work Profile, MAM policies apply within the work profile; a policy requiring device PIN on the personal side may conflict if device is not enrolled for device compliance.

> **Note:** True MAM-WE (MAM without enrollment) app protection failures — selective wipe, PIN loop, protection not applying at all — are out of Phase 41 scope. See [Android MAM-WE Investigation Advisory](00-index.md#android-mam-we-investigation-advisory).

---

## Microsoft Support Escalation Checklist

Open a Microsoft Support case with the following data-collection package. Collecting every item before filing substantially reduces case triage time.

- Device serial number + Android OS version + OEM model + enrollment mode (BYOD Work Profile / Fully managed COBO / Dedicated COSU / ZTE)
- MGP app ID (from Intune admin center app Properties URL) + Android package name (e.g., `com.microsoft.teams`) — OR LOB APK name + version code
- Device install status screenshot: Intune admin center > Devices > [device] > Managed Apps — showing the Failed/Pending/Not installed state with timestamp and any error code
- MGP approval state screenshot: Intune admin center > Apps > Android > [app] — showing Approval state and MGP binding status
- User-MGP account binding state: Intune admin center > Users > [user] > Devices — enrollment state and mode
- Company Portal log incident ID OR Microsoft Intune app log incident ID (per runbook 18 Section 1 or Section 2) — the incident ID is the Microsoft-side case reference for log retrieval
- adb logcat excerpt showing app install-related events (per runbook 18 Section 3.1) if USB debugging is available
- Package presence verification: `adb shell pm list packages | grep <mgp-package>` output (per runbook 18 Section 3.3) showing whether the package is present on-device
- Timeline: when the assignment was made, when the device last checked in, and when the failure was first observed

---

## Related Resources

- [Android Log Collection Guide (runbook 18)](18-android-log-collection.md) — prerequisite; collect diagnostic package before starting investigation
- [Android Enrollment Investigation (runbook 19)](19-android-enrollment-investigation.md) — for enrollment-side failures that may be the root cause of app delivery failures
- [Android Compliance Investigation (runbook 21)](21-android-compliance-investigation.md) — for compliance-blocked access issues distinct from app install failures
- [L1 Runbook 26: Android MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md) — L1 handoff source for this runbook
- [Managed Google Play admin guide](../admin-setup-android/01-managed-google-play.md) — MGP binding and iFrame approval reference
- [L2 Runbook Index](00-index.md#android-l2-runbooks) — all Android L2 runbooks and L1 escalation mapping

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Initial version — Android L2 app install investigation runbook (Three-class disambiguation ⚙️/⏱️/🐛 across MGP / LOB / MAM intersection; MAM-WE exclusion cross-link to Android advisory; Microsoft Support escalation checklist) | -- |
