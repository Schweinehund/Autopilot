---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Enrollment Status Page (ESP) Policy

The ESP controls what happens between Entra join and desktop access -- which apps must install before the user can proceed, how long to wait before timing out, and whether Windows quality updates are applied during provisioning. Getting ESP settings wrong is the most common cause of "stuck at provisioning" support tickets.

## Prerequisites

- Intune Administrator role
- Deployment profile already created and assigned (see [Deployment Profile](02-deployment-profile.md))
- App assignments planned -- the blocking app list should be finalized before configuring ESP
- Maximum 51 ESP profiles per tenant (1 default + 50 custom)

## Steps

### Step 1: Create ESP Profile

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** (Device onboarding) > **Windows** (tab) > **Windows Autopilot** > **Enrollment Status Page** > **Create**.
2. Enter a descriptive name (e.g., "APv1-ESP-Standard").

### Step 2: Configure ESP Settings

Configure each setting below. Every setting includes a what-breaks callout documenting downstream consequences.

1. **Show app and profile configuration progress**: Yes or No.

   > **What breaks if misconfigured:** No = ESP does not appear during setup at all. The user goes straight to the desktop before apps finish installing. Required apps install in the background after the user is already working. See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

2. **Show error when installation exceeds N minutes**: Default 60 minutes.

   > **What breaks if misconfigured:** Too low = ESP times out before large apps install and shows an error. Too high = user waits excessively on a failed deployment. Recommended: 60 minutes for standard deployments. **For hybrid join: add 40 minutes buffer** -- the Intune Connector creates an AD computer object before ESP proceeds, so a 60-minute timeout means approximately 100 minutes of actual wait time. See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

3. **Show custom message on timeout/error**: Yes or No.

   > **What breaks if misconfigured:** No = generic "Setup could not be completed" message with no guidance. Set to Yes and provide a message with IT contact information.

4. **Turn on log collection and diagnostics page**: Yes or No. Recommended: Yes.

   > **What breaks if misconfigured:** No = no collect-logs button is shown and the Autopilot diagnostics page (Windows 11) is unavailable. Disabling this makes L2 troubleshooting significantly harder. See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

5. **Only show page to devices provisioned by OOBE**: Yes or No.

   > **What breaks if misconfigured:** No = ESP is shown to every new user signing into the device, not just the first user during Autopilot provisioning. Causes confusion on shared devices where subsequent users see a provisioning screen.

6. **Install Windows quality updates (might restart)**: Yes or No.

   > [!IMPORTANT]
   > **Critical Default Change**
   >
   > - **New** ESP profiles default to **Yes** (installs monthly security updates during OOBE)
   > - **Existing** ESP profiles default to **No**
   > - This adds **20-40 minutes** to provisioning and may cause restarts
   > - Windows 11 only (not supported on Windows 10)
   > - NOT supported in pre-provisioning Technician Flow (only applies during User Flow)
   > - **Dependency:** "Block device use until all apps/profiles installed" must be **Yes** for this setting to take effect. If Block = No, the device may exit ESP before updates apply.

   > **What breaks if misconfigured:** Admin sees provisioning take 20-40 minutes longer than expected. End user sees unexpected restart during setup. If Block = No and quality updates = Yes, updates may not apply at all. See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

7. **Block device use until all apps/profiles installed**: Yes or No.

   > **What breaks if misconfigured:** No = users can exit ESP early, potentially reaching the desktop before required apps are installed. Yes = users cannot proceed until all tracked apps install successfully (or the timeout is reached). See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

8. **Allow users to reset device if error occurs**: Yes or No (only visible when Block = Yes).

   > **What breaks if misconfigured:** No = user must contact IT on ESP failure -- no self-service option. Yes = user can reset the device but loses all provisioning progress and must start over.

9. **Allow users to use device if error occurs**: Yes or No.

   > **What breaks if misconfigured:** Yes adds a bypass button on the error screen -- user reaches the desktop with an incomplete setup. Required apps may not be installed. See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

10. **Block device use until these required apps installed**: All or Selected.

    > **What breaks if misconfigured:** All = every assigned app blocks desktop access. Selected = up to 100 apps in the blocking list. Choose Selected for large app catalogs to avoid excessive wait times. See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

11. **Only fail selected blocking apps in technician phase**: Yes or No (pre-provisioning only).

    > **What breaks if misconfigured:** Yes = non-blocking app failures are ignored during technician flow (reseal succeeds even if non-critical apps fail). No = any app failure causes the entire technician flow to fail.

### Step 3: Configure App Tracking

The ESP tracks specific app types during provisioning. Only tracked app types block desktop access.

| App Type | Tracked (blocks desktop) | Notes |
|----------|------------------------|-------|
| Win32 (required) | Yes | Preferred app type for ESP |
| LOB/MSI (required) | Yes | Do NOT mix with Win32 -- see warning below |
| Microsoft Store (required) | Yes | |
| PowerShell scripts (device) | Yes | |
| Certificates (device) | Yes | |
| Available assignment apps | No | Never blocks ESP |

> [!WARNING]
> **Do NOT assign both LOB (MSI) and Win32 apps as required in the same ESP deployment.** The TrustedInstaller service cannot handle both installers simultaneously -- ESP hangs at app installation with sidecar logs showing "Another installation is in progress." Convert all apps to Win32 format, or use APv2 which supports mixed app types. See: [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

> [!WARNING]
> **Microsoft 365 Apps:** If deploying Microsoft 365 Apps alongside Win32 apps, deploy M365 Apps as **Win32 type**, not MSI type. M365 Apps as MSI + Win32 apps simultaneously causes the same TrustedInstaller hang.

### Step 4: Assign ESP Profile

Assign to the same device group as the deployment profile. ESP profile priority: if multiple ESP profiles apply, Intune uses the **most specific assignment** (unlike deployment profiles which use oldest-wins).

## Verification

- [ ] ESP profile appears in the Enrollment Status Page list
- [ ] Profile assigned to the correct device group
- [ ] Blocking app list matches intended apps (no LOB + Win32 mixing)
- [ ] Timeout value accounts for hybrid join buffer if applicable (60-min minimum; 100-min for hybrid)
- [ ] Windows quality update setting matches your provisioning time budget
- [ ] "Block device use" = Yes if using Windows quality updates

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| "Show app and profile configuration progress" = No | ESP not shown; apps install after user reaches desktop | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Timeout too low for app payload | ESP times out before apps install | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Hybrid join timeout not accounting for +40 min | ESP times out during AD object creation | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| LOB (MSI) + Win32 apps both required | ESP hangs at app installation; TrustedInstaller conflict | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| M365 Apps as MSI + Win32 apps simultaneously | ESP hang; M365 Apps must be Win32 type | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Install Windows quality updates" = Yes unexpectedly | Provisioning takes 20-40 min longer; unexpected restarts | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Block device use" = No with quality updates enabled | Device exits ESP before updates apply | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |

<details>
<summary>L2 Deep Dive: ESP Registry Structure</summary>

For detailed ESP registry inspection and device vs user phase troubleshooting, see [L2: ESP Deep-Dive](../l2-runbooks/02-esp-deep-dive.md).

</details>

## See Also

- [ESP Lifecycle Stage](../lifecycle/04-esp.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Dynamic Device Groups](04-dynamic-groups.md)*
