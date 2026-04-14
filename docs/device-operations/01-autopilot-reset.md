---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: both
platform: Windows
---

> **Version gate:** This guide covers Windows Autopilot Reset (APv1 only). Autopilot Reset is NOT available for APv2 (Device Preparation). For APv2, use Wipe or Retire. See [APv1 vs APv2](../apv1-vs-apv2.md).

# Autopilot Reset

Autopilot Reset returns a device to a business-ready state without requiring a full re-image. It removes personal files, user-installed apps, and personal settings, then re-applies the organization's Autopilot configuration. The device remains enrolled in Intune and Entra ID. Use it for ownership transfers within the same tenant.

## Prerequisites

### Local Autopilot Reset

- WinRE (Windows Recovery Environment) enabled on the device
- `DisableAutomaticReDeploymentCredentials` policy set to **0** (Allow) in Intune or Group Policy — required to show the local admin trigger on the lock screen
- Local administrator account available on the device

### Remote Autopilot Reset

- Device is Microsoft Entra joined (not hybrid joined — see below)
- Device is MDM-managed (enrolled in Intune)
- Intune Service Administrator role (or higher) assigned to the initiating admin account

> **What breaks if misconfigured:** If WinRE is disabled, the local reset trigger appears on the lock screen but the reset fails silently after the CTRL+WIN+R key combination. The device reboots normally with no changes applied. Verify WinRE status before instructing a user to attempt local reset.

---

## Local Autopilot Reset

### Steps

1. Ensure the device is **plugged into power** and connected to a network.

2. At the Windows lock screen, press **CTRL + WIN + R**.

   A confirmation screen appears with the organization logo (if configured) and the message "Reset this device to its business-ready state."

3. Sign in with a **local administrator account** when prompted.

   > **L1 Action:** If the user does not know the local admin credentials, do NOT proceed. Escalate to L2. Local admin credentials are required — a domain or Entra account does NOT satisfy this prompt.

4. Confirm the reset. The device reboots and begins the reset process.

5. After reset completes, the device returns to the **lock screen** (not OOBE). Autopilot setup does NOT re-run.

6. The next user signs in with their Entra account. User profile is created fresh on sign-in.

### Verification

- [ ] Device returned to lock screen (not OOBE)
- [ ] Personal files and user-installed apps removed
- [ ] Wi-Fi credentials preserved (user does not need to re-enter)
- [ ] Device still appears enrolled in Intune (Intune admin center > Devices > All devices)
- [ ] Primary user in Intune still shows the previous user — local reset does NOT update primary user automatically

---

## Remote Autopilot Reset

### Steps

1. In the **Intune admin center** (endpoint.microsoft.com), navigate to **Devices** > **All devices**.

2. Select the target device by name or serial number.

3. In the device detail pane, select **...** (More) > **Autopilot Reset**.

4. Confirm the action when prompted.

   > **L1 Action:** Confirm with the user that the device is plugged in and connected to the network before initiating remote reset. Remote reset fires at the next Intune check-in — instruct the user to leave the device powered on. Check-in typically occurs within 15 minutes if the device is online.

5. The device resets at the next Intune check-in. The process takes 20–40 minutes after check-in.

6. After reset, the device returns to the lock screen. Autopilot setup does NOT re-run.

### Verification

- [ ] Device reset status shows as succeeded in Intune device action history (Devices > All devices > device > Device action status)
- [ ] Device still appears enrolled in Intune after reset
- [ ] Primary user and Entra device owner are cleared — next sign-in sets the new primary user
- [ ] Wi-Fi credentials preserved

---

## Data Preservation Behavior

| Item | Local Reset | Remote Reset |
|------|-------------|-------------|
| Wi-Fi credentials | Preserved | Preserved |
| Provisioning packages | Preserved | Preserved |
| Entra device membership (device object) | Preserved | Preserved |
| MDM enrollment | Preserved | Preserved |
| SCEP certificates | Preserved | Preserved |
| Personal files and documents | **REMOVED** | **REMOVED** |
| User-installed apps | **REMOVED** | **REMOVED** |
| Personal settings (themes, browser, etc.) | **REMOVED** | **REMOVED** |
| User profile | **REMOVED** | **REMOVED** |
| Primary user in Intune | Unchanged | **CLEARED** |
| Entra device owner | Unchanged | **CLEARED** |

---

## Unsupported Scenarios

> **Autopilot Reset is NOT supported for Microsoft Entra hybrid joined devices or Surface Hub devices.** A full Wipe is required for hybrid devices. If you attempt Autopilot Reset on a hybrid joined device, the action will be available in the portal but will fail on the device.

Autopilot Reset is also not available for:
- Devices enrolled via APv2 (Device Preparation)
- Devices managed only via co-management (no direct Intune MDM enrollment)

For any of the above, use Wipe. See [Retire, Wipe, and Removal Actions](02-retire-wipe.md).

---

## Timing Summary

| Reset Type | When It Executes | Time to Complete |
|------------|-----------------|-----------------|
| Local reset | Immediately on CTRL+WIN+R confirmation | 20–40 minutes |
| Remote reset | At next Intune check-in (up to 15 min if device online) | 20–40 minutes after check-in |

Remote reset does **not** happen immediately. The device must check in with Intune to receive the reset command.

---

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| WinRE disabled | CTRL+WIN+R trigger appears but reset fails; device reboots normally | Check `reagentc.exe /info`; enable with `reagentc.exe /enable` |
| `DisableAutomaticReDeploymentCredentials` not set to Allow | CTRL+WIN+R key combination does nothing at lock screen | Set policy in Intune or GPO; verify with `reagentc.exe /info` |
| Hybrid Entra joined device | Remote reset action fires but fails silently | Use Wipe instead; see [Retire, Wipe, and Removal Actions](02-retire-wipe.md) |
| Device offline at time of remote reset | Reset never executes | Ensure device remains powered on and network-connected |

> **L2 Note:** If reset fails, check WinRE status with `reagentc.exe /info`. If WinRE is disabled, enable with `reagentc.exe /enable` and retry. If WinRE reports enabled but reset still fails, check Intune device action logs for the failure reason code.

---

## See Also

- [Retire, Wipe, and Removal Actions](02-retire-wipe.md) — All five device removal/reset actions with comparison table
- [Device Lifecycle Decision Tree](../decision-trees/05-device-lifecycle.md) — Choose the correct action based on what you want to preserve
- [Stage 4: ESP](../lifecycle/04-esp.md) — If re-provisioning fails at ESP after reset
- [APv1 vs APv2](../apv1-vs-apv2.md) — Framework comparison; Autopilot Reset is APv1-only

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Initial version |
