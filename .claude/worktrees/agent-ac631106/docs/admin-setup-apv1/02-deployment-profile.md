---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Deployment Profile Configuration

The Autopilot deployment profile controls the OOBE experience for enrolled devices — which screens are shown, which mode is used, what the device name looks like, and whether pre-provisioning is allowed. Every configurable setting has a "what breaks" consequence if misconfigured.

## Prerequisites

- Intune Administrator role
- At least one device registered in Windows Autopilot (see [Hardware Hash Upload](01-hardware-hash-upload.md))
- For hybrid Entra join: Intune Connector for AD configured before profile assignment (see [Intune Connector for AD](09-intune-connector-ad.md))
- Company branding configured in Entra ID if you intend to hide the change account option during OOBE

## Steps

### Step 1: Create deployment profile

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows enrollment** > **Windows Autopilot** > **Deployment Profiles**.
2. Select **Create Profile** > **Windows PC**.
3. Enter a profile **Name** and optional **Description**. Use a name that identifies the deployment mode and audience (for example: `APv1-UserDriven-Standard`).
4. Select **Next** to proceed to the OOBE Settings tab.

### Step 2: Configure OOBE settings

Configure every setting below. Each setting has a "what breaks" callout documenting the downstream consequences of misconfiguration.

---

**1. Deployment mode**

Options: `User-Driven` | `Self-Deploying`

Select the mode that matches your deployment scenario. Self-Deploying greys out most user-facing settings (privacy, user account type, language) because no user interaction occurs.

> **What breaks if misconfigured:** **Admin sees:** Profile appears to save normally with unexpected greyed-out settings. **End user sees:** OOBE failure on first boot — Self-Deploying mode cannot complete without TPM 2.0 and wired ethernet; User-Driven mode fails if configured for Self-Deploying without a user. **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

---

**2. Join to Microsoft Entra ID as**

Options: `Microsoft Entra joined` | `Hybrid Microsoft Entra joined`

Determines whether the device joins Entra ID directly (cloud-only) or joins both on-premises Active Directory and Entra ID (hybrid). Hybrid join requires the Intune Connector for AD to be installed, configured, and running before provisioning begins.

> **What breaks if misconfigured:** **Admin sees:** No immediate error in Intune portal. **End user sees:** OOBE appears to complete but device fails to join the domain. Event logs show ODJ connector unreachable. **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

---

**3. Microsoft Software License Terms (EULA)**

Options: `Show` | `Hide`

Controls whether the Windows EULA screen is displayed during OOBE.

> **What breaks if misconfigured:** **Admin sees:** No functional error. **End user sees:** An additional EULA acceptance screen during OOBE if set to Show — this adds a manual user step but causes no enrollment failure.

---

**4. Privacy settings**

Options: `Show` | `Hide`

Controls whether the Windows Privacy settings screen (diagnostic data, location, etc.) is displayed during OOBE.

> **What breaks if misconfigured:** **Admin sees:** No immediate error. **End user sees:** If set to Hide, location services are disabled by default — applications that rely on location (maps, asset tracking, conditional access location policies) will fail silently until the user manually re-enables location in Settings. **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

---

**5. Hide change account options**

Options: `Show` | `Hide`

Controls whether the "Sign in with a different account" link is visible on the OOBE sign-in screen.

> **What breaks if misconfigured:** **Admin sees:** Setting saves but has no visible effect in OOBE. **End user sees:** The change account link remains visible regardless of this setting if company branding is not configured in Entra ID. Company branding must be configured for this setting to take effect. **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

---

**6. User account type**

Options: `Administrator` | `Standard User`

Sets the local account type for the user who completes the OOBE sign-in.

> **What breaks if misconfigured:** **Admin sees:** No error in Intune portal. **End user sees:** If set to Administrator, the joining user receives local administrator rights on the device — this may violate your organization's security policy and least-privilege requirements. Remediation requires device re-enrollment or group policy override.

---

**7. Allow pre-provisioned deployment**

Options: `Yes` | `No`

Controls whether the device can enter the pre-provisioning (technician) flow using the Win+F12 shortcut at the OOBE splash screen.

> **What breaks if misconfigured:** **Admin sees:** No error in Intune portal when set to No. **End user sees (if technician presses Win+F12):** Pre-provisioning flow starts but fails immediately with error `0x80180005` — this error means the profile explicitly disallows pre-provisioning. The device must be re-imaged or reset. For pre-provisioning to work, this setting must be `Yes`. **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

---

**8. Language (Region)**

Options: Selection from language list | *(leave blank for user selection)*

If selected, the OOBE language screen is skipped and the specified language is applied automatically.

> **What breaks if misconfigured:** **Admin sees:** No error. **End user sees:** If not configured, users must manually select their language and region during OOBE — this adds friction but causes no enrollment failure. Select the correct language to streamline deployment.

---

**9. Automatically configure keyboard**

Options: `Yes` | `No`

Requires Language to be configured. Automatically applies the default keyboard layout for the selected language without prompting the user.

> **What breaks if misconfigured:** **Admin sees:** No error. **End user sees:** If set to Yes but the device is on Wi-Fi (no wired ethernet), keyboard configuration fails silently — the user may be presented with a keyboard selection screen despite the setting being enabled. Automatic keyboard configuration requires a wired ethernet connection at OOBE start. **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

---

**10. Apply device name template**

Options: `Yes` | `No`

When Yes, allows specifying a device naming pattern using macros. Only supported for Microsoft Entra joined devices (not hybrid Entra joined).

Supported macros:
- `%SERIAL%` — device serial number
- `%RAND:x%` — x random characters (x = number of characters)

> **What breaks if misconfigured:** **Admin sees:** Profile saves normally. **End user sees (name exceeds 15 characters):** Enrollment fails during the device naming stage — the 15-character Windows computer name limit applies. Names exceeding 15 characters cause enrollment failure with an error during OOBE. **Admin sees (hybrid join):** Setting is saved but has no effect — device names are controlled by the Intune Connector for AD on hybrid joined devices. **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

---

**11. Convert all targeted devices to Autopilot**

Options: `Yes` | `No`

When Yes, automatically registers any corporate-owned device that receives this profile with Windows Autopilot, even if the device was not manually registered.

> **What breaks if misconfigured:** **Admin sees:** Unexpected devices appear in the Autopilot Devices list with a 48-hour processing delay. **End user sees:** No impact on existing devices, but any reimaged or replaced device may auto-register and receive this profile unexpectedly. Use with caution if the profile is broadly assigned.

---

### Step 3: Assign profile to device group

1. On the **Assignments** tab, assign the profile to the dynamic Autopilot device group (see [Dynamic Device Groups](04-dynamic-groups.md) for group creation).
2. Avoid assigning to the built-in **All Devices** group. Assignment exclusions are not supported on the All Devices group, which can cause assignment conflicts.

> **What breaks if misconfigured (All Devices assignment):** **Admin sees:** Profile Status shows "Assigned" on devices that should not receive this profile. **End user sees:** Unexpected OOBE configuration during provisioning. Remove the All Devices assignment and use a targeted dynamic group. **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

**Profile conflict resolution:** When multiple profiles are assigned to overlapping device groups, the **oldest created profile wins** — not the most specific match, not the highest priority. If a device is receiving an unexpected profile, audit the creation dates of all profiles assigned to its groups.

> **What breaks if misconfigured (multiple profiles):** **Admin sees:** Devices receive an unexpected profile and deployment mode. **End user sees:** Wrong OOBE experience (for example, self-deploying mode on a user-driven device). Check profile creation dates to identify the winning profile. **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

### Step 4: Verify profile assignment

1. In the **Autopilot Devices** list, locate a target device.
2. Check **Profile Status**: the progression is `Unassigned` → `Assigning` → `Assigned`. Allow up to 15 minutes for assignment to complete after group membership resolves.
3. Verify the **Date assigned** field is populated before imaging or shipping the device. A device with no Date assigned has not received the profile and will show standard OOBE.

## Verification

- [ ] Profile appears in **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows enrollment** > **Windows Autopilot** > **Deployment Profiles**
- [ ] Profile is assigned to the correct device group (not All Devices)
- [ ] At least one target device shows **Profile Status = Assigned**
- [ ] **Date assigned** field is populated on all target devices before provisioning

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Wrong deployment mode selected | OOBE failure on first boot; Self-Deploying fails without TPM 2.0 and wired ethernet | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Hybrid Entra join selected without Intune Connector installed | Device fails domain join silently during OOBE | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Allow pre-provisioned deployment set to No; technician presses Win+F12 | Pre-provisioning fails immediately with error `0x80180005` | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Device name template exceeds 15 characters | Enrollment fails during device naming stage | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Profile assigned to All Devices group | Devices that should not receive this profile get the profile; conflicts with targeted assignments | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Multiple profiles on same group; oldest created profile wins unexpectedly | Device receives wrong profile and deployment mode | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Hide change account options enabled without company branding configured | Setting has no effect; change account link remains visible | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Privacy settings hidden; end user device relies on location services | Location services disabled by default; location-dependent apps fail silently | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

## See Also

- [Profile Assignment Stage (Lifecycle)](../lifecycle/02-profile-assignment.md)
- [Dynamic Device Groups](04-dynamic-groups.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Enrollment Status Page Policy](03-esp-policy.md)*
