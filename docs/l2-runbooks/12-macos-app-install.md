---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md).

# macOS App Install Failure Diagnosis

## Triage

**From L1 escalation?** L1 collected: device serial number, macOS version, app name, app type (DMG/PKG or VPP), Intune install status screenshot. Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Context

macOS app deployment in Intune uses two distinct channels. **Which channel is involved determines the entire diagnostic path:**

| Channel | App types | Delivery mechanism | Log source |
|---------|-----------|-------------------|------------|
| **IME channel** | DMG apps, PKG apps, shell scripts | Intune Management Extension daemon (`IntuneMdmDaemon`) | `IntuneMDMDaemon*.log` |
| **MDM channel** | VPP/Apps and Books | Apple MDM command pipeline (APNs) | Intune portal, VPP token status |

**IMPORTANT:** Do NOT cross-diagnose these channels. A DMG install failure has no relation to a VPP license issue, and vice versa. Identify the app type in Step 2 before proceeding.

Before starting: collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md).

---

## Investigation

### Step 1: Collect diagnostic package

Collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md). The IntuneMacODC zip includes `IntuneMDMDaemon*.log` needed for Steps 5–6.

### Step 2: Identify app type and deployment method

In Intune admin center:

1. Navigate to **Apps** > **macOS** > **[app name]** > **Properties**
2. Note the **App type**: DMG, PKG, or VPP (App Store app from Apps and Books)
3. Note the **Assignment type**: Required or Available
4. Note the **Target group**: device group or user group

This determines the diagnostic branch: **Steps 3–6 for DMG/PKG (IME channel)**, **Steps 7–8 for VPP (MDM channel)**.

### Step 3: Check Intune-side install status

In Intune admin center:

1. Navigate to **Apps** > **macOS** > **[app name]** > **Device install status**
2. Find the affected device and note the status:

| Status | Meaning | Next step |
|--------|---------|-----------|
| Installed | App present on device | Verify detection rule; may be a false failure |
| Failed | Install attempted and failed | Proceed to Step 5 (IME log) |
| Pending install | App queued, not yet attempted | Trigger Sync; check agent process (Step 4) |
| Not applicable | Assignment does not target this device | Check group membership |

### Step 4: Verify Intune agent is running (DMG/PKG apps)

```bash
pgrep -il "^IntuneMdm"
```

Expected output: both `IntuneMdmDaemon` and `IntuneMdmAgent` processes listed.

If `IntuneMdmDaemon` is absent, the Intune management extension is not active. The device cannot receive or process DMG/PKG install requests. This may indicate the device lost its MDM relationship or the Intune Management Extension was removed.

See [macOS Terminal Commands Reference — pgrep](../reference/macos-commands.md) for expected process names.

### Step 5: Check IntuneMDMDaemon log (DMG/PKG apps)

Log path: `/Library/Logs/Microsoft/Intune/IntuneMDMDaemon*.log` (see [macOS Log Paths Reference](../reference/macos-log-paths.md))

This log uses a pipe-delimited format: `timestamp | process | level | PID | task | detail`

Search for the app name or install-related keywords:

```bash
grep -i "install\|download\|failed\|error" /Library/Logs/Microsoft/Intune/IntuneMDMDaemon*.log | tail -50
```

Replace the grep pattern with the specific app name when investigating a single app:

```bash
grep -i "AppNameHere" /Library/Logs/Microsoft/Intune/IntuneMDMDaemon*.log | tail -30
```

**Common error patterns:**

| Log pattern | Meaning | Likely cause |
|-------------|---------|--------------|
| `Download failed` | Binary not retrieved | Network issue or CDN unreachable |
| `Detection script returned` | Detection rule evaluated | Mismatch between detection rule and actual install path |
| `Installation failed with exit code [N]` | Installer returned non-zero | Installer error; note exit code for lookup |
| `Disk space insufficient` | Not enough free space | Device needs free space freed before retry |
| `InstallApplication failed` | General install failure | Check exit code and detection rule |

Note any exit codes for investigation. The `IntuneMDMDaemon*.log` path is only valid on macOS 13 and 14; on macOS 15, this file may also be present — check [macOS Log Paths Reference](../reference/macos-log-paths.md) for version-specific availability.

### Step 6: Investigate specific DMG/PKG failure scenarios

Cross-reference against [App Deployment Failures](../admin-setup-macos/06-config-failures.md):

- **Non-.app file in DMG `Included apps` list:** Verify the DMG contains a `.app` bundle at the path specified in the Intune app definition. If the DMG was updated and the `.app` path changed, the detection will fail silently.
- **PKG > 2 GB:** Intune cannot upload PKG files larger than 2 GB. The admin must split the package or repackage before upload.
- **PKG without payload:** A PKG that installs no files to a detectable path creates a continuous reinstall loop — the detection rule always returns "not installed" immediately after each install.
- **Detection rule mismatch:** If the detection rule checks for a file path or bundle version that does not match the actual installed output, Intune marks the app as "not installed" after every successful install.

### Step 7: Check VPP token and license status (VPP apps)

In Intune admin center:

1. Navigate to **Tenant administration** > **Connectors and tokens** > **Apple VPP tokens**
2. Check token status: **Active**, **Expired**, or **Expiring**
3. Check license count for the specific app: **Total licenses** vs **assigned** vs **consumed**

If the token is **Expired**: VPP apps stop syncing and cannot be assigned or delivered. The admin must renew the token in Apple Business Manager (Settings > Apps and Books > [token]) and re-upload to Intune.

### Step 8: Check VPP assignment type (VPP apps)

A common VPP failure scenario:

- VPP app assigned as **Available** to a **device group** → app will NOT appear in Company Portal
- VPP Available assignment must target a **user group** for the app to appear in Company Portal

Verify the assignment in Intune admin center > Apps > macOS > [app] > Assignments. Change **Available** assignments from device groups to user groups.

---

## Resolution Scenarios

**Scenario 1: DMG/PKG download failure**

Verify network connectivity from the device to Microsoft CDN endpoints. Check [Network Endpoints Reference](../reference/endpoints.md) for required URLs. After verifying network, trigger Sync from Intune portal (Devices > macOS > [device] > Sync) to retry the download.

**Scenario 2: Detection rule mismatch**

Update the detection rule in Intune to match the actual install path or bundle identifier of the installed app. Navigate to Apps > macOS > [app] > Properties and update the Detection rules section.

**Scenario 3: VPP token expired**

Admin must renew the token in Apple Business Manager: **Settings** > **Apps and Books** > **[MDM server]** > download new token. Then upload the renewed token in Intune: **Tenant administration** > **Connectors and tokens** > **Apple VPP tokens** > **Edit** > upload new `.vpptoken` file.

**Scenario 4: VPP Available assigned to device group**

Change the VPP app assignment from Available to a device group to Available to a user group. Apps assigned as Available to device groups are not surfaced in Company Portal.

**Scenario 5: Insufficient disk space**

Free space on the device (minimum varies by app size). Trigger reinstall via Sync after space is available. If the device cannot be accessed, contact the user to free space and retry.

---

## Escalation Ceiling

Open a Microsoft support case if:

- `IntuneMDMDaemon.log` shows an internal error with no remediation path (not a detection rule or network issue)
- VPP license sync is stuck for more than 24 hours after token renewal
- App installs successfully (installation log shows success, detection passes) and then uninstalls automatically within minutes, in a continuous loop
- `pgrep -il "^IntuneMdm"` shows no processes despite confirmed MDM enrollment

**Data to include in support case:**
- IntuneMacODC zip from the affected device
- `IntuneMDMDaemon*.log` excerpt (last 500 lines minimum)
- Intune app Device install status screenshot
- App type, assignment type, and target group configuration
- macOS version (`sw_vers -productVersion`)

---

## Related Resources

- [macOS Log Collection Guide](10-macos-log-collection.md) — Prerequisite diagnostic package collection
- [macOS Terminal Commands Reference](../reference/macos-commands.md) — Full command reference
- [macOS Log Paths Reference](../reference/macos-log-paths.md) — Log file locations and format notes
- [App Deployment Failures](../admin-setup-macos/06-config-failures.md) — Admin-side failure reverse-lookup table
- [macOS App Deployment Guide](../admin-setup-macos/04-app-deployment.md) — DMG, PKG, and VPP configuration
- [macOS Profile Delivery Investigation](11-macos-profile-delivery.md) — For configuration profile issues

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-14 | Initial version — IME channel vs MDM channel distinction, IntuneMDMDaemon log analysis, VPP token investigation, 5 resolution scenarios |
