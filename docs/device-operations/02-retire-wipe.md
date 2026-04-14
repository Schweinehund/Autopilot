---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
platform: Windows
---

> **Version gate:** This guide covers all five device remove/reset actions available in Microsoft Intune. Actions marked "APv1 only" are not available for APv2 (Device Preparation) devices. For framework identification, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Device Retirement, Wipe, and Removal Actions

Intune provides five actions for removing, resetting, or decommissioning a device. The correct choice depends on what you want to preserve. For a guided walkthrough, use the [Device Lifecycle Decision Tree](../decision-trees/05-device-lifecycle.md).

## What Do You Want to Preserve?

Not sure which action to use? See [Device Lifecycle Decision Tree](../decision-trees/05-device-lifecycle.md) for a decision tree routing you to the correct action in 3 steps or fewer.

## Action Comparison

| Action | What It Does | What Is Preserved | Enrollment State After | When to Use |
|--------|-------------|-------------------|----------------------|-------------|
| Autopilot Reset | Removes personal files, user apps, and personal settings. Re-applies org configuration. | Wi-Fi credentials, SCEP certs, Entra device membership, MDM enrollment | Stays enrolled | Ownership transfer within same tenant (APv1 only) |
| Retire | Removes org data, apps, and policies pushed by Intune. Leaves personal data intact. | Personal files, user documents, user-installed personal apps | Unenrolled from Intune | BYOD offboarding, employee departure where personal data must be preserved |
| Wipe | Factory reset. Removes everything. Optional: retain enrollment state and/or Wi-Fi config. | Nothing by default (optionally: Wi-Fi state) | Unenrolled (unless retention option selected) | Lost/stolen device, full decommission, hybrid devices requiring reset |
| Fresh Start | Removes OEM bloatware and user-installed apps. Reinstalls a clean version of Windows. | User documents (Home folder) by default | Stays Entra joined; re-enrolls in MDM | Cleaning up a corporate device without losing user files |
| Delete (Deregister) | Removes the Intune device record only. Physical device is unchanged. | Nothing — physical device state unchanged | Unenrolled from Intune; Autopilot record removed | Stale record cleanup, pre-tenant-migration, removing duplicate records |

---

## Step-by-Step: Retire

Use Retire for BYOD offboarding or employee departure where the device contains personal files the user should keep.

1. In the **Intune admin center** (endpoint.microsoft.com), navigate to **Devices** > **All devices**.
2. Select the target device.
3. Select **Retire**.
4. Confirm when prompted.

The device receives the retire command at the next Intune check-in. Org data (email, corporate apps, MDM policies) is removed. Personal data and user-installed personal apps are preserved.

> **L1 Action:** For BYOD offboarding, use Retire (preserves personal data). NEVER use Wipe on a personal device — this erases everything including personal photos and documents. Confirm the device type (corporate vs. personal) before selecting an action.

> **L2 Note:** If Retire fails to remove org data, check that the device has an active network connection and has checked in recently. Stale devices (no check-in for 30+ days) may need manual org data removal. Check Intune device sync status: Devices > All devices > device > Device action status.

---

## Step-by-Step: Wipe

Use Wipe for lost/stolen devices, full decommission, or hybrid Entra joined devices that cannot use Autopilot Reset.

1. In the **Intune admin center**, navigate to **Devices** > **All devices**.
2. Select the target device.
3. Select **Wipe**.
4. Configure wipe options:
   - **Wipe device, but keep enrollment state and associated user account** — device reboots to OOBE and re-enrolls automatically. Use for corporate-owned devices being re-provisioned.
   - **Wipe device and continue to wipe even if device loses power** — persisted wipe. Use for lost/stolen devices where you need to ensure data destruction completes even if device is powered off and on again.
5. Confirm when prompted.

> **What breaks if misconfigured:** Selecting "keep enrollment state" on a device that should be fully decommissioned leaves the device able to re-enroll automatically. If re-provisioning for a new user, this is correct behavior. If decommissioning permanently, do NOT select this option.

---

## Step-by-Step: Fresh Start

Use Fresh Start to reinstall a clean Windows OS on a corporate device while keeping the user's personal documents.

1. In the **Intune admin center**, navigate to **Devices** > **All devices**.
2. Select the target device.
3. Select **Fresh Start**.
4. Configure option:
   - **Keep user data on this device** — preserves files in the user's Home folder. Enable this to avoid data loss.
5. Confirm when prompted.

Fresh Start removes OEM-installed apps, manufacturer bloatware, and user-installed apps. Windows is reinstalled from a clean image. The device stays Entra joined and re-enrolls in MDM automatically.

> **L2 Note:** Fresh Start requires WinRE to be enabled. If the device shows "Action not supported," verify WinRE status using `reagentc.exe /info` on the device.

---

## Step-by-Step: Delete (Deregister)

Use Delete to remove a stale Intune/Autopilot record without affecting the physical device. Required before tenant migration.

1. In the **Intune admin center**, navigate to **Devices** > **All devices**.
2. Select the target device.
3. Select **Delete**.
4. Confirm when prompted.

> **What breaks if misconfigured:** Deleting a device record removes its Autopilot registration. If the device is still active and in use, it will fail to re-provision via Autopilot on next reset — the hardware hash must be re-imported. Only delete records for devices that are decommissioned, returned, or being migrated.

To remove the Autopilot registration specifically (separate from the Intune device record):

1. Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**.
2. Search for the device by serial number.
3. Select the device and choose **Delete**.

Both the Intune device record and the Autopilot registration record should be removed before tenant migration. See [Tenant Migration](04-tenant-migration.md).

---

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Wipe with "keep enrollment" on decommissioned device | Device re-enrolls automatically after wipe | Delete the device record after wipe; re-wipe without the retention option |
| Retire on corporate-owned device instead of Wipe | Org data removed but device remains usable without Intune enrollment | Use Wipe for full factory reset of corporate devices |
| Delete without removing Autopilot registration | Intune record gone but Autopilot registration remains; re-import fails with "already registered" | Remove Autopilot registration separately in Devices > Enrollment > Windows Autopilot devices |
| Retire on device with no recent check-in | Retire command queues but never executes | Ensure device comes online; if device is unrecoverable, Delete the record manually |

---

## See Also

- [Autopilot Reset](01-autopilot-reset.md) — Re-provision a device within the same tenant without full wipe (APv1 only)
- [Device Re-Provisioning](03-re-provisioning.md) — Ownership transfer and re-enrollment guide
- [Tenant Migration](04-tenant-migration.md) — Moving devices between Microsoft tenants
- [Device Lifecycle Decision Tree](../decision-trees/05-device-lifecycle.md) — Guided action selection

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Initial version |
