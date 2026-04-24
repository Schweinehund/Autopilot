---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: ZTE
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Zero-Touch Enrollment Failed

L1 runbook for Zero-Touch Enrollment (ZTE) failures: device was expected to enroll automatically via Zero-Touch but did not — device booted to consumer setup, looped back to first-time setup, or never arrived in Intune. Four L1-diagnosable causes plus Cause E (escalate-only).

**Applies to ZTE only.** For non-ZTE enrollment failures see sibling Android L1 runbooks ([22](22-android-enrollment-blocked.md) / [23](23-android-work-profile-not-created.md) / [24](24-android-device-not-enrolled.md) / [25](25-android-compliance-blocked.md) / [26](26-android-mgp-app-not-installed.md)).

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR27 branch.

## Prerequisites

- Access to Intune admin center (`https://intune.microsoft.com`) — L1 read-only
- Device serial number, IMEI, or manufacturer identifier
- Portal shorthand used in this runbook:
   - **P-ZT** = Zero-Touch customer portal (`enterprise.google.com/android/zero-touch/customers`) — **admin-only**; L1 does NOT have access
   - **P-KAP** = Knox Admin Portal (`knox.samsung.com`) — **admin-only**; Samsung-specific (Cause D)
   - **P-INTUNE** = Intune admin center Devices / Tenant admin blades

> **L1 scope note:** ZT portal and Knox Admin Portal are admin-only portals. L1 observes Intune-side symptoms (device absence / enrollment state) and hands the packet to the admin for ZT / KAP portal actions. All ZT portal click paths in this runbook are within `## Admin Action Required` sections.

## How to Use This Runbook

Check the cause that matches your observation. Causes are independently diagnosable — you do not need to rule out prior causes. Cause ordering below reflects frequency (most common first) per research sources:

- [Cause A: Device Not Uploaded by Reseller](#cause-a-device-not-uploaded-by-reseller) — Device serial not visible in ZT portal device list; reseller handoff incomplete
- [Cause B: Configuration Not Assigned to Device Set](#cause-b-configuration-not-assigned) — Device visible in ZT portal but no configuration assigned; device falls through to consumer setup
- [Cause C: ZT ↔ Intune Linking Broken](#cause-c-zt-intune-linking-broken) — ZT portal and Intune are not linked, or token expired; re-linking required
- [Cause D: KME/ZT Mutual-Exclusion Conflict (Samsung)](#cause-d-kme-zt-mutual-exclusion-conflict) — Samsung device registered in both Knox Mobile Enrollment and Zero-Touch; KME takes precedence

If none of Causes A-D match and enrollment still fails, see [Escalation Criteria](#escalation-criteria) below for Cause E (DPC extras JSON — admin-only investigation).

---

## Cause A: Device Not Uploaded by Reseller {#cause-a-device-not-uploaded-by-reseller}

**Entry condition:** Admin confirms the device serial is NOT visible in the ZT customer portal (`Devices` tab). Device boots to consumer setup on first power-on.

### Symptom

- User (or IT purchaser) reports the corporate Android device went through "normal" setup instead of automatic corporate enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- Admin searches the ZT portal `Devices` tab by IMEI or serial — no match.

Context: see [Reseller-Upload Handoff Workflow](../admin-setup-android/02-zero-touch-portal.md#reseller-upload-handoff) in the ZT portal admin guide.

### L1 Triage Steps

1. > **Say to the user:** "I'll verify whether your device was prepared correctly for automatic enrollment. If not, I'll coordinate with your IT administrator and the device reseller."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI (or MEID for CDMA devices), make, model, manufacturer.

### Admin Action Required

**Ask the admin to:**

- Open the ZT customer portal at `enterprise.google.com/android/zero-touch/customers` (admin-only). Go to the `Devices` tab. <!-- verify UI at execute time -->
- Search for the device by IMEI, serial, or other identifier. The 2026 portal redesign accepts any identifier without type selection. [MEDIUM: support.google.com/work/android/answer/7514005, last_verified 2026-04-23]
- If device is absent: contact the authorized reseller who supplied the device. Reseller must upload the device identifier to the customer's ZT portal account. Without reseller upload, ZTE cannot enroll the device — this is a Google-canonical requirement.
- See [Reseller-Upload Handoff Workflow](../admin-setup-android/02-zero-touch-portal.md#reseller-upload-handoff) for the reseller handoff details and [Device Claim Workflow](../admin-setup-android/02-zero-touch-portal.md#device-claim-workflow) for what to do after devices appear.

**Verify:**

- After reseller upload: device appears in ZT portal Devices tab within 24 hours (reseller upload latency).
- After device is uploaded AND configuration is assigned (see Cause B), user can factory-reset and retry first-boot enrollment.

**If the admin confirms none of the above applies:**

- Device is listed in ZT portal but enrollment still fails — route to Cause B.

### Escalation (within Cause A)

- Reseller denies responsibility or cannot locate the device in their systems
- Device was purchased from a non-authorized reseller (no ZT upload path)

---

## Cause B: Configuration Not Assigned to Device Set {#cause-b-configuration-not-assigned}

**Entry condition:** Device IS visible in ZT portal Devices tab, but no configuration is assigned to the device. Device boots to consumer setup instead of enterprise enrollment (Phase 39 D-03 "configuration must be assigned" pitfall).

### Symptom

- ZT portal shows the device in the Devices tab, but the Configuration column is empty or shows "Not assigned".
- On first boot, device goes through normal (consumer) Android setup — no ZTE enrollment flow triggered.
- Admin-observable: see [Configuration Must Be Assigned](../admin-setup-android/02-zero-touch-portal.md#configuration-must-be-assigned) in ZT portal admin guide.

### L1 Triage Steps

1. Confirm (via admin check — L1 does not have ZT portal access) whether the device appears in ZT portal with an empty Configuration column.
2. In Intune admin center, verify device absence: `Devices > All devices` filtered platform = Android — device should NOT be present (if present, this is not Cause B).

### Admin Action Required

**Ask the admin to:**

- Open ZT portal. In the Devices tab, select the device (or batch-select devices). <!-- verify UI at execute time -->
- Assign a configuration per [Device Claim Workflow](../admin-setup-android/02-zero-touch-portal.md#device-claim-workflow) and [Profile Assignment](../admin-setup-android/02-zero-touch-portal.md#profile-assignment) in the ZT portal admin guide.
- Verify the configuration is the correct one (points to Intune via ZT↔Intune link — DPC extras JSON must match tenant setup).
- After configuration assignment, have the user factory-reset the device to retry ZTE enrollment on next first-boot.

**Verify:**

- After config assignment + factory reset + first boot: device initiates ZTE enrollment flow, arrives in Intune `Devices > All devices` (filter Android) within ~15 minutes.

**If the admin confirms none of the above applies:**

- Proceed to Cause C (ZT↔Intune linking).

### Escalation (within Cause B)

- Admin assigned configuration but device still falls through to consumer setup on factory reset

---

## Cause C: ZT ↔ Intune Linking Broken {#cause-c-zt-intune-linking-broken}

**Entry condition:** Devices are uploaded in ZT portal AND a configuration is assigned, but enrollment still fails. Admin suspects the ZT↔Intune linking token / connector is broken or expired.

### Symptom

- ZT portal shows devices with configurations assigned, but enrollment still doesn't initiate (or initiates then fails partway).
- Intune admin center Tenant admin > Connectors and tokens shows errors on the Android ZT / EMM token / Managed Google Play binding.

### L1 Triage Steps

1. In Intune admin center, navigate to `Tenant admin > Connectors and tokens`. <!-- verify UI at execute time --> Check the Managed Google Play binding state AND any ZT-specific connector status.
2. Document connector state (healthy / error / expired / needs re-binding).

### Admin Action Required

**Ask the admin to:**

- Review the ZT↔Intune linking status per Phase 35 Method A / Method B token setup.
- If linking is broken: re-authenticate the Entra account binding to Managed Google Play AND re-authorize the ZT-Intune connection per the admin guide.
- Confirm the DPC extras JSON in the ZT configuration correctly references the tenant identifier.

**Verify:**

- After re-linking: connector shows healthy state; next ZTE enrollment attempt succeeds.

**If the admin confirms none of the above applies:**

- Proceed to Cause D (Samsung KME conflict) if device is Samsung, OR to Escalation Criteria for Cause E (DPC extras JSON admin-only review).

### Escalation (within Cause C)

- Re-linking attempted but connector still shows error state
- Tenant has multiple ZT customer accounts; admin cannot determine which to link

---

## Cause D: KME/ZT Mutual-Exclusion Conflict (Samsung) {#cause-d-kme-zt-mutual-exclusion-conflict}

**Entry condition:** Samsung device only; device is registered in BOTH Knox Mobile Enrollment (KME) AND Zero-Touch. Per Google canonical rule, KME takes precedence when both are configured.

> **Cross-platform note:** Knox Mobile Enrollment (KME) takes precedence over Zero-Touch Enrollment when both are configured on the same Samsung device. This is a Samsung firmware-level behavior that cannot be overridden via Intune or ZT portal. [MEDIUM: support.google.com/work/android/answer/7514005, last_verified 2026-04-23]

### Symptom

- Samsung device boots into KME enrollment flow (or normal setup) instead of ZTE.
- Device appears in KME portal (Knox Admin Portal) — or did at one time.
- User reports "my new Samsung phone enrolled wrong" or "ZTE setup didn't start on my Samsung."

Context: see [KME/ZT Device Claim](../admin-setup-android/02-zero-touch-portal.md#kme-zt-device-claim) for the admin-side mutual-exclusion callout.

### L1 Triage Steps

1. Confirm device manufacturer = Samsung (Cause D applies to Samsung only).
2. Check Intune admin center `Devices > All devices` — Samsung devices enrolled via KME typically appear with "Android Enterprise fully managed" or similar enrollment type, NOT with ZTE-specific markers.
3. Collect device IMEI / serial for admin to check in Knox Admin Portal.

### Admin Action Required

**Ask the admin to:** Check the Knox Admin Portal at `knox.samsung.com` (admin-only) for the device's IMEI/serial. <!-- verify UI at execute time --> If the device is registered in KME:

1. **Option 1 (recommended if no Knox license):** Remove the device from the KME portal configuration, OR
2. **Option 2 (if retaining KME):** Remove the KME profile from the device in the Knox Admin Portal to allow ZTE to take precedence on the next factory reset.

After removal, have the user factory-reset the device; ZTE enrollment should initiate on next first-boot.

**Verify:**

- Device is removed from KME portal (confirmed by admin).
- Factory reset + first boot: device initiates ZTE enrollment flow and arrives in Intune.

**If the admin confirms none of the above applies:**

- Device is NOT in KME portal but still fails ZTE — return to Cause A/B/C diagnostic path, then Escalation (Cause E).

### Escalation (within Cause D)

- Samsung device shows KME enrollment attempts in Knox Admin Portal but admin cannot find a configuration to remove
- Org retains KME for other devices; cannot simply remove KME binding globally

---

## Escalation Criteria

(Overall — applies across all four L1-diagnosable causes plus Cause E admin-only path.)

Escalate to L2 (or to the Intune admin directly if not already done). See [Android Enrollment Investigation](../l2-runbooks/19-android-enrollment-investigation.md#pattern-c-zte-device-claim-failure) (Pattern C — ZTE Device Claim Failure) and [Android Log Collection Guide](../l2-runbooks/18-android-log-collection.md).

Escalate to L2 if:

- Cause A: reseller denies device upload AND purchase channel is unclear (vendor management issue)
- Cause B: admin assigned configuration AND user factory-reset device AND enrollment still falls through
- Cause C: re-linking attempted; connector still errors; Managed Google Play binding re-authorization fails
- Cause D: Samsung device removed from KME portal AND factory-reset; ZTE still doesn't initiate

**Cause E (DPC extras JSON — admin-only, not an L1 diagnosis):**

If all Cause A-D checks pass but devices still fail at enrollment, escalate to Intune admin for DPC-extras JSON review (see [DPC Extras JSON](../admin-setup-android/02-zero-touch-portal.md#dpc-extras-json)). L1 does NOT modify DPC extras JSON.

**Before escalating, collect:**

- Device serial number + IMEI (or MEID for CDMA)
- Device manufacturer, model, firmware / Android version
- Which Cause (A/B/C/D/E) closest matches observation
- For Cause A: reseller name, purchase date, purchase order / invoice reference
- For Cause B: screenshot of ZT portal Devices tab (admin-provided) showing device with empty Configuration column
- For Cause C: screenshot of Intune Tenant admin > Connectors and tokens showing Android ZT / MGP state
- For Cause D: confirmation of device presence/absence in Knox Admin Portal (admin-provided)
- Number of devices affected (single device vs fleet — shape-of-problem signal)
- Timestamp of most recent failed enrollment attempt

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Resolved Phase 41 L2 cross-references | -- |
| 2026-04-23 | Initial version (4 L1-diagnosable causes A-D + Cause E escalate-only) | -- |
