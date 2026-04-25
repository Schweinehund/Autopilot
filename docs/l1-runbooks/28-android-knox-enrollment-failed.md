---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: KME
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Knox Mobile Enrollment Failed

L1 runbook for Knox Mobile Enrollment (KME) failures: Samsung device was expected to enroll automatically via KME but did not — device booted to consumer setup, looped back to first-time setup, or never arrived in Intune. Four L1-diagnosable causes plus Cause E (escalate-only).

**Applies to KME only (Samsung).** For non-Samsung corporate Zero-Touch enrollment failures see runbook [27 ZTE](27-android-zte-enrollment-failed.md). For non-corporate enrollment failures see ([22](22-android-enrollment-blocked.md) / [23](23-android-work-profile-not-created.md) / [24](24-android-device-not-enrolled.md) / [25](25-android-compliance-blocked.md) / [26](26-android-mgp-app-not-installed.md)).

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR28 branch.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) — L1 read-only
- Device serial number, IMEI, or manufacturer identifier
- Confirmation that device is Samsung manufacturer
- Portal shorthand used in this runbook:
   - **P-INTUNE** = Intune admin center Devices / Tenant admin blades
   - **P-KAP** = Knox Admin Portal (knox.samsung.com) — **admin-only**; Samsung-specific

> **L1 scope note:** Knox Admin Portal is admin-only. L1 observes Intune-side symptoms (device absence / enrollment state) and hands the packet to the admin for KAP portal actions. All Knox Admin Portal click paths in this runbook are within `## Admin Action Required` sections.

## How to Use This Runbook

Check the cause that matches your observation. Causes are independently diagnosable — you do not need to rule out prior causes. Cause ordering below reflects frequency (most common first):

- [Cause A: Samsung Knox B2B Account Approval Pending](#cause-a-b2b-account-pending) — Admin cannot sign in to Knox Admin Portal; B2B account submission still within or beyond 1-2 business day approval window
- [Cause B: Device Not in Knox Admin Portal](#cause-b-device-not-in-kap) — Reseller upload not done OR Knox Deployment App pathway not used; device serial absent from KAP Devices view
- [Cause C: KME Profile Not Assigned to Device Set](#cause-c-profile-unassigned) — Profile exists in KAP but device shows no profile assignment
- [Cause D: KME/ZT Mutual-Exclusion Conflict (Samsung)](#cause-d-kme-zt-mutex-collision) — Samsung device dual-configured in both Knox Mobile Enrollment and Zero-Touch; KME takes precedence at firmware level

If none of Causes A-D match and enrollment still fails, see [Escalation Criteria](#escalation-criteria) below for Cause E (DPC Custom JSON malformation / Knox tripped status / Knox license edge cases — admin-only investigation).

---

## Cause A: Samsung Knox B2B Account Approval Pending {#cause-a-b2b-account-pending}

**Entry condition:** Admin reports they cannot sign in to Knox Admin Portal at knox.samsung.com — sign-in returns "Account pending approval" OR admin has not yet submitted the B2B application.

### Symptom

- User (or IT purchaser) reports the corporate Samsung device went through "normal" Setup Wizard instead of automatic corporate enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- Admin reports Knox Admin Portal sign-in fails with "Account pending approval" OR admin has not yet submitted the B2B application.

### L1 Triage Steps

1. > **Say to the user:** "I'll verify whether your Samsung device was prepared correctly for automatic enrollment. If not, I'll coordinate with your IT administrator and Samsung Knox B2B support."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1, model (e.g., Galaxy S23), Android OS version if known.

### Admin Action Required

**Ask the admin to:**

- Open the [Samsung Knox Portal](https://www.samsungknox.com) and confirm B2B account application status.
- If application not yet submitted: submit per [admin doc Step 0](../admin-setup-android/07-knox-mobile-enrollment.md#step-0-b2b-approval). Approval takes 1-2 business days.
- If application submitted but >2 business days pending: contact Samsung Knox B2B support with the application ID; escalate via Samsung support ticket.

**Verify:**

- After approval: admin can sign in to [Knox Admin Portal](https://knox.samsung.com) without "Account pending approval" error.
- After admin completes Steps 1-N of the [KME admin guide](../admin-setup-android/07-knox-mobile-enrollment.md), user can factory-reset device and retry first-boot enrollment.

**If the admin confirms B2B account is approved AND devices still fall through:** Route to [Cause B](#cause-b-device-not-in-kap).

### Escalation (within Cause A)

- B2B account approval >5 business days pending despite Samsung support ticket
- Application rejected with no clear remediation path (corporate email mismatch, region restriction)

---

## Cause B: Device Not in Knox Admin Portal {#cause-b-device-not-in-kap}

**Entry condition:** Admin confirms the device serial is NOT visible in Knox Admin Portal Devices view. Device boots to consumer Setup Wizard on first power-on.

### Symptom

- User (or IT purchaser) reports the corporate Samsung device went through "normal" Setup Wizard instead of automatic corporate enrollment.
- Device does NOT appear in Intune after 15 minutes of first power-on with internet.
- Admin searches Knox Admin Portal Devices view by IMEI/serial — no match.
- Reseller has not uploaded the device to Knox Admin Portal, or the device was acquired outside the authorized-reseller channel.

### L1 Triage Steps

1. > **Say to the user:** "I'll confirm whether your Samsung device is registered for automatic corporate enrollment. If your reseller hasn't uploaded it, I'll coordinate with your IT administrator to either contact the reseller or use the Knox Deployment App pathway."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1, model, Android OS version if known, reseller name (if known to user/IT purchaser).

### Admin Action Required

**Ask the admin to:**

- Open [Knox Admin Portal](https://knox.samsung.com); go to **Devices** tab; search by IMEI/serial. If absent: contact authorized Samsung reseller for upload (per [admin doc Step 3 — Reseller bulk upload](../admin-setup-android/07-knox-mobile-enrollment.md#step-3-add-devices)) OR use [Knox Deployment App](../admin-setup-android/07-knox-mobile-enrollment.md#step-3-add-devices) for existing-stock retroactive enrollment via Bluetooth/NFC.

**Verify:**

- After reseller upload OR KDA enrollment: device appears in KAP Devices view within 24 hours.
- After device is listed in KAP AND profile is assigned (see Cause C), user can factory-reset device and retry first-boot enrollment.

**If device listed in KAP but enrollment still fails:** Route to [Cause C](#cause-c-profile-unassigned).

### Escalation (within Cause B)

- Reseller denies device upload AND Knox Deployment App pathway also fails OR is not feasible (e.g., no Bluetooth/NFC access)
- Device was purchased outside the authorized-reseller channel (no KME upload path)

---

## Cause C: KME Profile Not Assigned to Device Set {#cause-c-profile-unassigned}

**Entry condition:** Admin confirms device IS in Knox Admin Portal Devices view but Profile column is EMPTY.

### Symptom

- User (or IT purchaser) reports the corporate Samsung device went through "normal" Setup Wizard instead of automatic corporate enrollment.
- Device does NOT appear in Intune after 15 minutes of first power-on with internet.
- Admin reports Knox Admin Portal Devices view shows the device row with an empty Profile column.

### L1 Triage Steps

1. > **Say to the user:** "I'll coordinate with your IT administrator to verify a Knox Mobile Enrollment profile is assigned to your device. If not, the admin will assign one and we'll factory-reset your device to retry."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1, model, Android OS version if known.

### Admin Action Required

**Ask the admin to:**

- Open [Knox Admin Portal](https://knox.samsung.com); navigate to **Profiles**; verify a KME profile exists with EMM = Microsoft Intune. Assign profile to device set per [admin doc Step 4](../admin-setup-android/07-knox-mobile-enrollment.md#step-4-assign-profile). Profile MUST be assigned BEFORE first boot — assignment after first boot does not retro-trigger KME (device must be factory-reset).

**Verify:**

- After profile assignment: KAP Devices view shows the device row with the Profile column populated.
- After user factory-resets device: device initiates KME enrollment flow on next first-boot and arrives in Intune `Devices > All devices` (filter Android) within ~15 minutes.

**If profile assigned AND user factory-reset AND device still fails:** Route to [Cause D](#cause-d-kme-zt-mutex-collision).

### Escalation (within Cause C)

- Profile assigned in KAP AND device factory-reset AND enrollment still falls through
- Admin cannot create a KME profile because EMM = Microsoft Intune is not selectable (Knox Admin Portal license / EMM-link issue)

---

## Cause D: KME/ZT Mutual-Exclusion Conflict (Samsung) {#cause-d-kme-zt-mutex-collision}

**Entry condition:** Samsung device registered in BOTH Knox Mobile Enrollment AND Zero-Touch portal. KME takes precedence at the device firmware level when both are configured (this is Samsung firmware-level behavior; cannot be overridden via Intune or ZT portal).

### Symptom

- Device enrolls via KME when ZT was the desired path; OR device enrollment shows wrong mode in Intune; OR ZT portal claim shows but no first-boot activity.
- Admin reports the Samsung device is present in BOTH the Knox Admin Portal Devices view AND the Zero-Touch customer portal Devices tab.
- User (or IT purchaser) reports unexpected enrollment behavior: device enrolled via the wrong portal, or enrollment never initiated despite both portals showing the device.

### L1 Triage Steps

1. > **Say to the user:** "Your Samsung device is registered in both the Knox and Zero-Touch portals. I'll coordinate with your IT administrator to keep only one and we'll factory-reset your device to retry."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Document whether device is present and, if so, which enrollment type is recorded. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1, model, Android OS version if known, current enrollment type observed in Intune (if any).

### Admin Action Required

**Ask the admin to:**

- Choose ONE portal for the device set: remove from KME (per [admin doc KME/ZT Mutual Exclusion](../admin-setup-android/07-knox-mobile-enrollment.md#kme-zt-mutual-exclusion)) OR remove from ZT (per [02-zero-touch-portal.md#kme-zt-mutual-exclusion](../admin-setup-android/02-zero-touch-portal.md#kme-zt-mutual-exclusion)). After removal: factory-reset device and retry first-boot enrollment via the kept portal.

**Verify:**

- After removal from the non-desired portal: device appears in only ONE of (Knox Admin Portal Devices view) / (Zero-Touch portal Devices tab).
- After user factory-resets device: enrollment initiates via the kept portal and device arrives in Intune `Devices > All devices` (filter Android) within ~15 minutes.

**If device removed from non-desired portal AND factory-reset AND enrollment still doesn't initiate:** Escalate to L2 (likely Cause E — DPC Custom JSON malformation / Knox tripped status / Knox license edge case).

### Escalation (within Cause D)

- Device removed from one portal but enrollment still routes through the removed portal (likely KAP/ZT-portal sync delay; retry after 24h)
- Admin cannot determine which portal owns the device set (mixed reseller history)

---

## Escalation Criteria

(Overall — applies across all four L1-diagnosable causes plus Cause E admin-only path.)

Escalate to L2. See [Android Knox Investigation](../l2-runbooks/22-android-knox-investigation.md) for KME-specific Pattern A-E investigation and [Android Log Collection Guide](../l2-runbooks/18-android-log-collection.md).

Escalate to L2 if:

- Cause A: B2B account approval >5 business days pending; OR Samsung support ticket has no resolution path
- Cause B: Reseller denies device upload AND Knox Deployment App pathway also fails OR is not feasible
- Cause C: Admin assigned KME profile to device set in KAP AND user factory-reset device AND enrollment still falls through
- Cause D: Samsung device removed from one portal (KME or ZT) AND factory-reset; the kept-portal enrollment still doesn't initiate

**Cause E (DPC Custom JSON / Knox tripped / Knox license — admin-only, not an L1 diagnosis):**

If all Cause A-D checks pass but devices still fail at enrollment, escalate to Intune admin for investigation:

- DPC Custom JSON Data review (see [admin doc Step 5](../admin-setup-android/07-knox-mobile-enrollment.md#dpc-custom-json)) — silent failure if ZT JSON wrapper pasted into KME profile
- Knox eFuse tripped status — non-recoverable; device must use non-KME enrollment path
- Knox license edge cases — KPE Premium activation; Plan 1+ misalignment

L1 does NOT modify DPC Custom JSON, Knox eFuse status, or licensing. Hand to L2 + admin.

**Before escalating, collect:**

- Device serial number + IMEI 1 (or MEID for CDMA)
- Device manufacturer (must be Samsung), model, firmware / Android version
- Which Cause (A/B/C/D/E) closest matches observation
- For Cause A: Samsung Knox B2B account application date + status (admin-provided)
- For Cause B: screenshot of Knox Admin Portal Devices view (admin-provided) showing device absent OR present with empty Profile column
- For Cause C: screenshot of Knox Admin Portal Profile-to-Devices assignment view (admin-provided)
- For Cause D: confirmation of device presence/absence in BOTH Knox Admin Portal AND Zero-Touch portal (admin-provided)
- For Cause E: Knox eFuse status (admin-provided if KAP exposes it; otherwise Samsung support ticket reference); KME profile name; reseller name (if applicable)
- Number of devices affected (single device vs fleet — shape-of-problem signal)
- Timestamp of most recent failed enrollment attempt

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 44 scope) — 4 L1-diagnosable causes A-D (B2B account / device-not-in-KAP / KME profile unassigned / KME-ZT collision) + Cause E escalate-only (DPC JSON malformation / Knox tripped / Knox license edge cases). Closes Phase 40 ANDR28 placeholder. | -- |
