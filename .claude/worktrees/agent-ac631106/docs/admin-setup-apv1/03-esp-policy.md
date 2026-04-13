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

The Enrollment Status Page (ESP) policy controls what the device shows during provisioning — whether a progress screen appears, how long it waits for apps to install, and whether the user can reach the desktop before setup is complete. This guide covers every configurable setting with its "what breaks" consequence and includes critical warnings about app type mixing and the Windows quality update default change.

## Prerequisites

- Intune Administrator role
- Deployment profile already created and assigned (see [Deployment Profile](02-deployment-profile.md))
- Blocking app list finalized before configuring ESP — changing the app list after provisioning starts requires device reset
- Maximum 51 ESP profiles per tenant (1 default + 50 custom); plan accordingly for large multi-group deployments

## Steps

### Step 1: Create ESP profile

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** (Device onboarding) > **Windows** tab > **Windows Autopilot** > **Enrollment Status Page**.
2. Select **Create**.
3. Enter a profile **Name** and optional **Description**.
4. Select **Next** to proceed to Settings.

### Step 2: Configure ESP settings

Configure every setting below. Settings are listed in the order they appear in the Intune portal.

---

**1. Show app and profile configuration progress**

Options: `Yes` | `No`

Controls whether the ESP progress screen appears at all during OOBE.

> **What breaks if misconfigured:** **Admin sees:** No error in Intune portal. **End user sees:** If set to No, the user goes directly to the desktop before any apps or profiles have finished installing. Required apps may not be present at desktop, certificates missing, and policies not yet applied. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

---

**2. Show error when installation exceeds N minutes**

Default: `60`

The timeout in minutes before ESP displays an error. Standard recommendation is 60 minutes. Increase for large app catalogs.

> **What breaks if misconfigured (too low):** **Admin sees:** Support tickets for ESP timeout errors. **End user sees:** "Setup could not be completed" error before large apps finish installing; device may be stuck requiring IT intervention. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

> **What breaks if misconfigured (hybrid join — insufficient buffer):** **Admin sees:** ESP timeout errors on hybrid-joined devices even with apps installing successfully. **End user sees:** ESP fails before the Intune Connector creates the AD computer object. **Fix:** For hybrid Entra join, add 40 minutes to your standard timeout. A 60-minute timeout means approximately 100 minutes of actual wait time on hybrid-joined devices because the connector must create the AD object before ESP can proceed. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

---

**3. Show custom message on timeout/error**

Options: `Yes` | `No`

Controls whether a custom support message is shown when ESP times out or errors.

> **What breaks if misconfigured:** **Admin sees:** No impact. **End user sees:** If set to No, a generic "Setup could not be completed. Please try again or contact your support person for help with this error." message is displayed with no contact information. Set to Yes to provide a help desk phone number or ticket link.

---

**4. Turn on log collection and diagnostics page**

Options: `Yes` | `No`. Recommended: `Yes`.

Enables the **Collect Logs** button on the ESP error screen and the Autopilot diagnostics page (Windows 11 only).

> **What breaks if misconfigured:** **Admin sees:** No error. **End user sees:** If set to No, neither the Collect Logs button nor the Autopilot diagnostics page is available during a failure. L2 engineers must rely on remote collection after the fact. Setting to Yes significantly reduces troubleshooting time. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

---

**5. Only show page to devices provisioned by OOBE**

Options: `Yes` | `No`

Controls whether ESP is shown to every new user signing into the device, or only the first user during Autopilot OOBE.

> **What breaks if misconfigured:** **Admin sees:** Support tickets from users signing into shared devices who see an ESP screen unexpectedly. **End user sees:** If set to No, every new user sign-in on the device triggers an ESP screen, including on shared or kiosk devices. For shared devices, set this to Yes to limit ESP to the initial provisioning only.

---

**6. Install Windows quality updates (might restart)**

Options: `Yes` | `No`

> **CRITICAL — Default value changed for new profiles:**
>
> | Profile type | Default |
> |-------------|---------|
> | New ESP profiles (created after the platform change) | **Yes** (installs monthly security update during OOBE) |
> | Existing ESP profiles (created before the change) | **No** (no change to behavior) |
>
> **Key implications of setting this to Yes:**
> - Adds **20–40 minutes** to provisioning time and may cause a restart during OOBE
> - Supported on **Windows 11 only** — this setting has no effect on Windows 10 devices
> - **Not supported during pre-provisioning Technician Flow** — quality updates only install during the User Flow phase; technician phase is unaffected
> - Requires **Block device use until all apps/profiles installed** to be set to **Yes** — if Block = No, the device may exit ESP before the update ring and quality updates are applied

> **What breaks if misconfigured (unexpected Yes for existing admins):** **Admin sees:** Provisioning takes 20–40 minutes longer than expected; occasional restart events reported by users. **End user sees:** Unexpected restart during OOBE with no explanation. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

---

**7. Block device use until all apps/profiles installed**

Options: `Yes` | `No`

Controls whether the user can bypass the ESP screen and reach the desktop before all tracked apps finish installing.

> **What breaks if misconfigured:** **Admin sees:** No error; apps show as still deploying in Intune. **End user sees:** If set to No, users can click through the ESP screen and reach the desktop before required apps, certificates, or VPN profiles are installed. The device is in an incomplete configuration state. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

---

**8. Allow users to reset device if error occurs**

Options: `Yes` | `No` (only visible when Block device use = Yes)

Controls whether a **Reset device** button appears on the ESP error screen.

> **What breaks if misconfigured:** **Admin sees:** No error. **End user sees:** If set to No, users cannot self-service reset on ESP failure and must contact IT. If set to Yes, users can reset the device and start over — this clears all progress but avoids waiting for IT, which may be acceptable for remote deployments.

---

**9. Allow users to use device if error occurs**

Options: `Yes` | `No`

Controls whether a **Continue anyway** button appears on the ESP error screen, allowing users to bypass ESP and reach the desktop in an incomplete state.

> **What breaks if misconfigured:** **Admin sees:** No error. **End user sees:** If set to Yes, a bypass button appears on any ESP error screen. Users who click it reach the desktop before all required apps are installed. Use only for non-critical deployments where partial setup is acceptable.

---

**10. Block device use until these required apps installed**

Options: `All` | `Selected`

Controls which apps must finish installing before the user can access the desktop.

> **What breaks if misconfigured:** **Admin sees:** No portal error. **End user sees:** If set to All, every required app assignment blocks the desktop — for large app catalogs this can mean 2+ hour wait times. Use Selected to specify a maximum of 100 apps as critical blockers. Apps not on the selected list will still install but will not block desktop access. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

---

**11. Only fail selected blocking apps in technician phase**

Options: `Yes` | `No` (pre-provisioning deployments only)

Controls whether non-blocking app failures during the pre-provisioning Technician Flow cause the entire flow to fail.

> **What breaks if misconfigured:** **Admin sees:** Pre-provisioning technician flow fails on non-critical app failures. **End user sees:** Device must be reset and re-provisioned before shipping. Setting to Yes allows the technician flow to succeed (reseal) even if non-blocking apps fail — only apps in the blocking list must succeed during technician flow. **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

---

### Step 3: Configure app tracking

The ESP tracks apps for blocking purposes based on app type and assignment type. Not all app types are tracked.

#### App type tracking reference

| App Type | Tracked (blocks desktop) | Notes |
|----------|--------------------------|-------|
| Win32 (required assignment) | Yes | Preferred app type for ESP tracking |
| LOB / MSI (required assignment) | Yes | Do NOT mix with Win32 — see critical warning below |
| Microsoft Store app (required) | Yes | |
| PowerShell scripts (device-targeted) | Yes | |
| Certificates (device-targeted) | Yes | |
| Available assignment apps (any type) | No | Never blocks ESP regardless of type |

> **CRITICAL WARNING — Do not mix LOB (MSI) and Win32 apps in the same ESP deployment:**
>
> Assigning both LOB (MSI) format apps and Win32 format apps as required in the same deployment causes a **TrustedInstaller conflict**. When both types run simultaneously, the Windows Installer service (TrustedInstaller) cannot handle concurrent installations.
>
> **Admin sees:** ESP appears stuck at the app installation phase. **End user sees:** ESP progress bar frozen; sidecar logs show "Another installation is in progress" errors repeatedly.
>
> **Fix:** Convert all apps to Win32 `.intunewin` format for deployment, or migrate the deployment to APv2 which handles mixed app types without this conflict.
>
> **Runbook:** [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md)

> **Known issue — Microsoft 365 Apps (MSI type) + Win32 apps:**
>
> Deploying Microsoft 365 Apps in MSI format simultaneously with Win32 apps causes an ESP hang due to the TrustedInstaller conflict. Deploy Microsoft 365 Apps as a Win32 `.intunewin` package instead to avoid this issue.

### Step 4: Assign ESP profile

1. On the **Assignments** tab, assign the ESP profile to the same device group used for the deployment profile.
2. If multiple ESP profiles apply to the same device, Intune applies the **most specific** assignment (unlike deployment profiles, which use oldest-created-wins). Verify priority order when multiple profiles may overlap.

## Verification

- [ ] ESP profile appears in **Enrollment Status Page** list
- [ ] Profile is assigned to the correct device group
- [ ] Blocking app list contains only the apps that must complete before desktop access
- [ ] Timeout value accounts for hybrid join buffer if applicable (minimum 60 minutes for cloud join; 100 minutes recommended for hybrid join)
- [ ] Windows quality update setting matches your provisioning time budget (Yes adds 20–40 minutes)

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Show progress = No | User reaches desktop before apps install; required apps and policies missing | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Timeout too low for app catalog size | ESP times out before large apps install; device stuck needing IT reset | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Timeout not increased for hybrid join (need +40 minutes) | ESP fails before AD computer object is created | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| LOB (MSI) and Win32 apps both assigned as required | TrustedInstaller conflict; ESP stuck at app installation indefinitely | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Microsoft 365 Apps in MSI format + Win32 apps simultaneously | ESP hang during Microsoft 365 installation | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Install Windows quality updates = Yes; unexpected provisioning time | 20–40 minutes added to provisioning; unexpected restart during OOBE | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Block device use = No with quality update setting | Device exits ESP before update ring and quality updates are applied | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Block device use = No | Users reach desktop before required apps finish installing | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |

<details>
<summary>L2 Deep Dive: ESP Registry Structure</summary>

For detailed ESP registry inspection and device vs user phase troubleshooting (including the `FirstSync IsServerProvisioningDone` value that separates device phase from user phase), see [L2: ESP Deep-Dive](../l2-runbooks/02-esp-deep-dive.md).

</details>

## See Also

- [ESP Stage (Lifecycle)](../lifecycle/04-esp.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Dynamic Device Groups](04-dynamic-groups.md)*
