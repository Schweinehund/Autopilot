---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: admin
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [APv1 Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2 Setup Step 4: Corporate Identifiers

Corporate identifiers identify devices as corporate-owned during enrollment. This step is **conditional** -- corporate identifiers are only required if your organization has enrollment restrictions that block personal device enrollments. If no enrollment restrictions exist, or if restrictions allow personal device enrollment, this step can be skipped.

## When Corporate Identifiers Are Required

Corporate identifiers are needed when **both** of the following are true:

1. Your organization has enrollment restrictions configured to block personal Windows device enrollment.
2. Devices will enroll via APv2 (Device Preparation).

Corporate identifiers are **not** needed when:

- No enrollment restrictions exist in your tenant.
- Enrollment restrictions allow personal device enrollment.
- All devices are pre-registered with hardware identifiers through another method.

**Why this matters:** When a device enrolls via APv2, Intune evaluates it against enrollment restrictions before starting the Device Preparation experience. Without a matching corporate identifier, the device is treated as a personal device at enrollment time. If a personal enrollment restriction blocks it, the Device Preparation experience never launches -- the user reaches the desktop without expected apps or policies, and no APv2-specific error is shown.

See [Enrollment Restriction Interaction with APv2](#enrollment-restriction-interaction-with-apv2) for the full conflict precedence explanation.

## Prerequisites

- Steps 1-3 complete: [Prerequisites and RBAC](01-prerequisites-rbac.md), [ETG Device Group](02-etg-device-group.md), [Device Preparation Policy](03-device-preparation-policy.md)
- Device manufacturer name, model name, and serial number for each target device
- Minimum Windows version on target devices: Windows 11 22H2 with KB5035942 (OS Build 22621.3374) or later

## Steps

### Step 1: Prepare the CSV file

1. Create a CSV file with the following format. **Do not include a header row:**
   ```
   manufacturer,model,serial_number
   ```
   Example:
   ```
   Microsoft,Surface Pro 9,01234567890123
   Dell,Latitude 5540,ABC1234567
   HP,EliteBook 840 G10,5CG2345678
   ```

2. **Windows-supported identifier type:** Manufacturer, model, and serial number (combined). The following identifier types are **NOT supported** for Windows:
   - Serial number only -- supported for Android and iOS only, not Windows.
   - IMEI -- not supported for Windows devices.

3. **File size limits:**
   - Maximum 5,000 rows or 5 MB per CSV file, whichever limit is reached first.
   - Maximum 10 CSV files for Windows identifiers per upload session.
   - For larger device volumes, use PowerShell or the Microsoft Graph API.

   > **What breaks if misconfigured:** **Admin sees:** Upload fails or the identifier does not match the enrolling device, and Intune reports the device as unrecognized.
   > **End user sees:** If enrollment restrictions block personal devices: deployment never launches. The user completes standard OOBE without any Device Preparation experience.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 2: Upload corporate identifiers

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** > **Corporate device identifiers** tab.
2. Select **Add** > **Upload CSV file**.
3. For **Identifier type**, select **Manufacturer, model, and serial number (Windows only)**.
4. Browse to the CSV file prepared in Step 1 and upload it.
5. Review the import results for any errors or duplicate entries. Correct any errors in the CSV file and re-upload if needed.

   > **What breaks if misconfigured:** **Admin sees:** Import errors in the upload results, or identifiers uploaded with the wrong type selection (for example, "Serial number" selected instead of "Manufacturer, model, and serial number").
   > **End user sees:** Device is not recognized as corporate-owned at enrollment time. If enrollment restrictions block personal devices, deployment never launches.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

### Step 3: Verify uploaded identifiers

1. In the **Corporate device identifiers** list, confirm that the uploaded identifiers appear.
2. Verify the **Identifier type** column shows "Manufacturer, model, and serial number" for all Windows entries.
3. Spot-check several entries against the source data (device labels, purchase records, or BIOS) to confirm accuracy.

   > **What breaks if misconfigured:** **Admin sees:** Identifier is listed but does not match the enrolling device's actual hardware values (for example, manufacturer name casing or model string format differs from what Windows reports during enrollment).
   > **End user sees:** Device treated as personal at enrollment time despite the identifier being uploaded.
   > **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

## Enrollment Restriction Interaction with APv2

This section explains how enrollment restrictions interact with APv2 (Device Preparation) deployments. The scope is limited to APv2-relevant interactions.

### Key principle

Enrollment restrictions are evaluated **BEFORE** the Device Preparation policy. A device blocked by an enrollment restriction will never reach the Device Preparation experience. The user sees a generic enrollment error, not an APv2-specific error.

### APv2 enrollment ownership behavior

| Enrollment Scenario | Without Corporate Identifiers | With Corporate Identifiers |
|---------------------|-------------------------------|---------------------------|
| APv2 Device Preparation enrollment | Treated as **personal** device at enrollment time. **Blocked** by a personal enrollment restriction. | Treated as **corporate-owned** at enrollment time. Allowed past a personal enrollment restriction. |

### Conflict precedence rules

1. **Enrollment restrictions are evaluated first.** Before the Device Preparation policy is matched, Intune checks whether the enrolling device is allowed to enroll based on the applicable enrollment restriction.
2. **A blocked enrollment means no Device Preparation experience.** If the device is blocked by an enrollment restriction, the Device Preparation progress screen never appears. The user completes standard OOBE and reaches the desktop without managed deployment.
3. **Corporate identifiers determine ownership at enrollment time only.** After enrollment completes, the device's ownership state follows standard Intune rules. Corporate identifiers do not permanently override the device record.
4. **Multiple restrictions use priority order.** If multiple enrollment restrictions target the same user, the highest priority restriction (lowest priority number, excluding the Default restriction) applies. The Default restriction applies to any user not targeted by a higher-priority restriction.

### Diagnosis path

If a device's APv2 deployment does not launch and an enrollment restriction is suspected as the cause, follow [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md). Step 13 of that runbook checks corporate identifiers as a specific root cause.

> **What breaks if misconfigured:** **Admin sees:** Device enrolls into Intune but the Device Preparation experience does not launch. The deployment report shows no entry for the device.
> **End user sees:** OOBE completes without the APv2 setup experience. The device reaches the desktop without expected apps or policies applied.
> **Runbook:** [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

## Verification

- [ ] Corporate identifiers appear in **Intune admin center** > **Devices** > **Enrollment** > **Corporate device identifiers**
- [ ] The **Identifier type** column shows "Manufacturer, model, and serial number" for all Windows entries
- [ ] If enrollment restrictions block personal devices: target device manufacturer, model, and serial numbers match the uploaded identifiers exactly
- [ ] The Enrollment restrictions list shows the expected restriction priority order for the affected users

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Corporate identifiers not uploaded when enrollment restriction blocks personal devices | Deployment never launches; device reaches desktop without apps or policies | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Wrong identifier type selected (serial number only instead of manufacturer, model, and serial number) | Identifier does not match the enrolling device at enrollment time | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| CSV data mismatch (manufacturer, model, or serial number does not match device hardware values) | Device not recognized as corporate-owned; treated as personal at enrollment | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |
| Enrollment restriction priority order incorrect (wrong restriction applies to the user) | Unexpected enrollment block or allow behavior; wrong restriction evaluated | [Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md) |

## See Also

- [APv2 Prerequisites Checklist](../lifecycle-apv2/01-prerequisites.md)
- [APv2 Overview](../lifecycle-apv2/00-overview.md)
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [Microsoft Learn: Add Corporate Identifiers](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/corporate-identifiers-add)

---
*Setup complete. Return to [APv2 Admin Setup Overview](00-overview.md) for the full guide index.*
