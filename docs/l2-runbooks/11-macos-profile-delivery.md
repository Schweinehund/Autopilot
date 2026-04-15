---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md).

# macOS Profile Delivery Investigation

## Triage

**From L1 escalation?** L1 collected: device serial number, macOS version, Intune device status screenshot, profile name that failed to apply. Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Context

Configuration profiles on macOS are delivered via the **Apple MDM channel** (APNs push followed by device check-in). This is fundamentally different from Windows, which uses CSP and SyncML. Do NOT apply Windows ESP or CSP diagnostic patterns to macOS profile delivery failures — those concepts do not exist on macOS.

When a profile fails to deliver, the investigation traces the Apple MDM command pipeline: APNs push → device check-in → profile payload validation → profile installation.

Before starting: collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md).

---

## Investigation

### Step 1: Collect diagnostic package

Collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md). The IntuneMacODC zip contains `profiles show` output and system log excerpts needed for Steps 3–5.

### Step 2: Verify MDM enrollment status

```bash
profiles status -type enrollment
```

Expected output:
```
Enrolled via DEP: Yes
MDM enrollment: Yes (User Approved)
MDM server: https://*.manage.microsoft.com/...
```

Check: `Enrolled via DEP: Yes` and `MDM enrollment: Yes`. If MDM enrollment shows `No` or is absent, the device has lost its management relationship — the MDM channel is broken and profiles cannot be delivered. Escalate immediately.

For full output interpretation, see [macOS Terminal Commands Reference](../reference/macos-commands.md).

### Step 3: List all installed profiles

```bash
sudo profiles show
```

Look for the expected profile by name. If the profile is absent, it was never delivered to this device or was removed after delivery. Compare the installed list against the Intune admin center assignment view for this device (Step 6).

For an alternative dump in plist format:

```bash
system_profiler SPConfigurationProfileDataType
```

Use `system_profiler` output when you need to inspect the full profile payload or when parsing across multiple devices.

### Step 4: Check profile delivery events in unified log

```bash
log show --predicate 'subsystem == "com.apple.ManagedClient"' --info --last 1h
```

Look for:
- `Profile install request received` — device received the MDM command
- `Profile installed successfully` — delivery completed
- Error messages indicating payload rejection or validation failure

Adjust `--last` window as needed based on when the failure occurred. For events older than a few hours, the IntuneMacODC zip contains a system log excerpt captured at collection time.

For ADE and Setup Assistant-specific delivery events:

```bash
log show --predicate 'subsystem contains "cloudconfigurationd"' --info --last 30m
```

See [macOS Terminal Commands Reference — log show](../reference/macos-commands.md) for filter syntax.

### Step 5: Check for profile conflicts

```bash
system_profiler SPConfigurationProfileDataType
```

Compare the installed profile list against the expected profiles shown in Intune admin center (Devices > macOS > [device] > Configuration profiles). Identify any profile with **Error** or **Conflict** status in the Intune view.

Multiple profiles setting the same key create a conflict — the last-applied profile wins, and Intune marks conflicting profiles with a Conflict status.

### Step 6: Verify Intune-side assignment and delivery status

In Intune admin center:

1. Navigate to **Devices** > **macOS** > **[device name]** > **Configuration profiles**
2. Check each expected profile's status:

| Status | Meaning | Next step |
|--------|---------|-----------|
| Succeeded | Profile delivered and applied | No action needed |
| Pending | Profile not yet delivered to device | Trigger Sync (Step 7) |
| Error | Delivery attempted but failed | Note error detail; see Resolution Scenarios |
| Conflict | Two profiles set the same key | Identify conflicting profiles; see Scenario 2 |
| Not applicable | Profile assigned to group device is not in | Check group membership |

### Step 7: Trigger device sync

If a profile shows **Pending** and the device has not checked in recently:

1. In Intune admin center: **Devices** > **macOS** > **[device name]** > **Sync**
2. Wait 15 minutes for the next check-in cycle
3. Refresh the Configuration profiles view to check for status change

### Step 8: Investigate specific failure scenarios

Cross-reference the Intune error detail against these known failure scenarios (see also [Configuration Profile Failures](../admin-setup-macos/06-config-failures.md)):

- **SSID case mismatch (Wi-Fi profiles):** Verify SSID in the profile matches the actual network name exactly, including case sensitivity
- **Firewall blocking MDM:** If a firewall profile is deployed, verify MDM server exceptions are included
- **FileVault without escrow:** If a FileVault profile is deployed, check that recovery key escrow is configured in Intune
- **Certificate profile missing:** 802.1X Wi-Fi authentication requires a certificate profile deployed before or alongside the Wi-Fi profile
- **Deprecated Endpoint protection template:** Check whether the profile uses Settings Catalog (required for new profiles) rather than the deprecated Template format

---

## Resolution Scenarios

**Scenario 1: Profile pending — device not checking in**

Trigger Sync from Intune portal, wait 15 minutes, recheck. If still Pending after two Sync attempts, verify the device has active network connectivity and that APNs endpoints are reachable (see [Network Endpoints Reference](../reference/endpoints.md)).

**Scenario 2: Profile conflict**

Identify the two profiles assigning conflicting settings. Either remove the duplicate assignment or consolidate conflicting settings into a single profile. Redeploy and verify status changes to Succeeded.

**Scenario 3: SSID case mismatch**

Correct the SSID case in the Intune Wi-Fi profile (must match the actual network broadcast SSID exactly), save and redeploy. Device will receive the corrected profile on next check-in.

**Scenario 4: Firewall blocking MDM check-ins**

Add MDM server exceptions to the firewall profile. The required APNs and Intune management endpoints are listed in [Network Endpoints Reference](../reference/endpoints.md#macos-ade-endpoints).

**Scenario 5: Certificate chain incomplete for 802.1X**

Deploy root CA and intermediate CA certificate profiles before — or in the same assignment as — the 802.1X Wi-Fi profile. Profile assignment order matters: the certificate must be present on the device before the Wi-Fi profile applies.

---

## Escalation Ceiling

Open a Microsoft support case if:

- Profile shows **Error** status with no actionable detail in the Intune error field
- MDM enrollment is lost with no user-initiated action and device cannot re-enroll
- Profile installs successfully but is removed automatically within minutes of delivery
- Unified log shows profile receipt but no installation event, with no validation error

**Data to include in support case:**
- IntuneMacODC zip from the affected device
- `sudo profiles show` output
- Unified log excerpt: `log show --predicate 'subsystem == "com.apple.ManagedClient"' --info --last 2h`
- Intune Configuration profiles view screenshot (device-level)
- macOS version (`sw_vers -productVersion`)

---

## Related Resources

- [macOS Log Collection Guide](10-macos-log-collection.md) — Prerequisite diagnostic package collection
- [macOS Terminal Commands Reference](../reference/macos-commands.md) — Full command reference
- [macOS Log Paths Reference](../reference/macos-log-paths.md) — Log file locations
- [Configuration Profile Failures](../admin-setup-macos/06-config-failures.md) — Admin-side failure reverse-lookup table
- [macOS App Install Failure Diagnosis](12-macos-app-install.md) — For app install issues (separate from profile delivery)
- [macOS Compliance Evaluation Investigation](13-macos-compliance.md) — For compliance-related issues

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-14 | Initial version — MDM enrollment verification, unified log query, profile conflict investigation, 5 resolution scenarios |
