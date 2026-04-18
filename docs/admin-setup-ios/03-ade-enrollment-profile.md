---
last_verified: 2026-04-18
review_by: 2026-07-17
applies_to: ADE
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS ADE enrollment profile configuration in Intune.
> For macOS enrollment profile setup, see [macOS Enrollment Profile](../admin-setup-macos/02-enrollment-profile.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS ADE Enrollment Profile Configuration

The enrollment profile configures how iOS/iPadOS devices enroll through Automated Device Enrollment (ADE): their supervision state, authentication method, Setup Assistant experience, and whether users can remove management. This is the final step in the ADE prerequisite chain — APNs certificate, then ABM/ADE token, then enrollment profile. The profile must be assigned to devices **before first power-on**; a device that starts Setup Assistant without an assigned profile enrolls through standard (non-managed) iOS Setup Assistant and must be factory-reset to enroll into MDM.

## Prerequisites

- ADE token configured and active with at least one iOS/iPadOS device synced (see [ABM/ADE Token Guide](02-abm-token.md))
- APNs certificate configured and active (see [APNs Certificate Guide](01-apns-certificate.md))
- Intune Administrator role

## Key Concepts Before You Begin

### Supervised Mode

On iOS/iPadOS 13.0 and later, devices enrolled through ADE are **automatically supervised** regardless of the enrollment profile supervised mode setting. However, you should explicitly set supervised mode to **Yes** in the enrollment profile to:

- Declare supervised intent in the profile configuration
- Ensure consistent behavior across all iOS versions in your fleet
- Enable supervised-only settings in the enrollment profile (such as locked enrollment)

Supervision cannot be added after enrollment without a full device erase. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision) for what supervision enables and the consequences of enrolling without it.

### Authentication Methods

| Method | iOS Version | Recommendation | Notes |
|--------|-------------|----------------|-------|
| Setup Assistant with modern authentication | iOS 13.0+ | **Recommended** | Supports MFA, Conditional Access, and JIT registration (can eliminate Company Portal dependency for Entra registration) |
| Company Portal | iOS 13.0+ | Being phased out | Requires Entra registration via Company Portal app; being removed from new enrollment policies UI experience |
| Setup Assistant (legacy) | Pre-iOS 13.0 | **Not recommended** | Does not support modern Conditional Access; use only for legacy iOS device fleets that cannot upgrade |

For all new deployments, use **Setup Assistant with modern authentication**.

> **What breaks if misconfigured:** The legacy authentication method is incompatible with modern Conditional Access policies. Devices cannot authenticate during Setup Assistant if MFA or CA policies are enforced. Symptom appears in: device Setup Assistant (authentication failure screen at the sign-in step).

## Steps

### Step 1: Create the enrollment profile

Navigate to the ADE token in the Intune admin center and create a new iOS/iPadOS enrollment profile. Enter a descriptive profile name and optional description.

> **Note:** The Intune admin center is updating enrollment profile navigation. The profile creation location may appear under **Profiles** or **Enrollment policies** depending on your tenant's rollout status. The settings and their effects are the same regardless of navigation path.

### Step 2: Configure enrollment settings

Configure the following settings for a supervised corporate ADE deployment:

| Setting | Options | Corporate ADE Recommendation | Notes |
|---------|---------|------------------------------|-------|
| User Affinity | Enroll with User Affinity / Enroll without User Affinity / Microsoft Entra shared mode | Enroll with User Affinity | Without user affinity = kiosk or shared devices; shared mode = Shared iPad (iPadOS only) |
| Authentication method | Setup Assistant with modern authentication / Company Portal / Setup Assistant (legacy) | Setup Assistant with modern authentication | See [Authentication Methods](#authentication-methods) above |
| Supervised | Yes / No | **Yes** | iOS 13+ ADE auto-supervises, but set explicitly to declare intent |
| Locked enrollment | Yes / No | **Yes** | Prevents users from removing the management profile |
| Await final configuration | Yes / No | **Yes** | Holds device at Setup Assistant until device configuration policies apply |
| Device name template | Custom pattern (e.g., {{DEVICETYPE}}-{{SERIAL}}) | Organization preference | Applied at enrollment time |

#### Supervised mode

Setting supervised mode to Yes ensures the enrollment profile explicitly declares supervised intent. Although iOS/iPadOS 13.0 and later devices enrolled via ADE are automatically supervised, explicitly setting this to Yes in the profile ensures consistent behavior and enables supervised-only settings such as locked enrollment.

> 🔒 **Supervised only:** Supervised mode enables the full range of MDM capabilities including OS update enforcement, silent app installation, and supervised-only configuration profiles. Devices enrolled without supervision receive standard MDM management only and cannot be upgraded to supervised without a full device erase. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

> **What breaks if misconfigured:** Setting supervised to No on a corporate ADE deployment means locked enrollment cannot be enforced, supervised-only configuration profiles will not apply, and OS updates cannot be silently enforced. Changing to supervised later requires wiping every affected device. Symptom appears in: Intune admin center (supervised-only policies show "Not applicable" on affected devices).

#### Locked enrollment

Locked enrollment prevents users from removing the management profile via **Settings > General > VPN & Device Management**. Without locked enrollment, a user can fully unenroll a corporate device without admin action, removing MDM management entirely.

> 🔒 **Supervised only:** Locked enrollment requires supervised mode. On unsupervised devices, this setting has no effect and users can remove the management profile from Settings > General > VPN & Device Management. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

> **What breaks if misconfigured:** Locked enrollment set to No allows users to navigate to Settings > General > VPN & Device Management and remove the management profile, fully unenrolling the device. This cannot be undone remotely — the device must be factory reset and re-enrolled. Symptom appears in: Intune admin center (device shows as retired/removed).

**30-day removal window for non-ABM-purchased devices:** For devices not originally purchased through ABM (added via Apple Configurator), users can see the remove management button for the first 30 days after activation even with locked enrollment set to Yes. After 30 days, the button is hidden.

#### User affinity

User affinity determines whether the device is associated with a specific user. For user-assigned corporate devices, select **Enroll with User Affinity**. For kiosk or shared devices with no dedicated user, select **Enroll without User Affinity**.

> **What breaks if misconfigured:** Without user affinity, the device has no primary user — Company Portal will not function, user-targeted Conditional Access policies will not apply, and per-user app assignments will not deliver. Symptom appears in: Intune admin center (device shows no primary user) and Company Portal app (not functional).

#### Await final configuration

Await final configuration holds the device at Setup Assistant until device configuration policies are installed before allowing the user to reach the home screen. Only device configuration policies install during this hold — apps are **not** included. There is no enforced time limit; devices are typically released within approximately 15 minutes. This setting requires iOS/iPadOS 13.0+ with modern authentication, userless, or shared mode enrollments. Not available when Shared iPad = Yes combined with Enroll without User Affinity.

> **What breaks if misconfigured:** Await final configuration set to No allows users to reach the home screen before device configuration policies (Wi-Fi, VPN, restrictions, certificates) apply. Devices may be non-compliant immediately after enrollment. Symptom appears in: device (user reaches home screen without management configuration in place) and Intune admin center (non-compliant status at enrollment).

### Step 3: Configure Setup Assistant panes

The enrollment profile controls which screens users see during iOS/iPadOS Setup Assistant. Hidden screens skip that step during initial device setup. Configuration here is cosmetic — hiding a screen does not affect security policy enforcement. For example, hiding the Passcode screen does not prevent passcode enforcement; compliance policies enforce passcode requirements after enrollment.

| Screen | Min iOS/iPadOS Version | Recommended | Notes |
|--------|------------------------|-------------|-------|
| Passcode | 7.0+ | Show | |
| Location Services | 7.0+ | Organization preference | |
| Restore | 7.0+ | Show | |
| Apple ID | 7.0+ | Show | User needs for iCloud |
| Terms and conditions | 7.0+ | Show | |
| Touch ID and Face ID | 8.1+ | Show | |
| Apple Pay | 7.0+ | Hide (configure later) | |
| Siri | 7.0+ | Hide | |
| Diagnostics Data | 7.0+ | Organization preference | |
| Screen Time | 12.0+ | Hide | |
| SIM Setup | 12.0+ | Organization preference | Carrier activation |
| iMessage and FaceTime | 9.0+ | Hide | |
| Appearance | 13.0+ | Show | Light/Dark mode selection |
| Privacy | 11.3+ | Show | |
| Onboarding | 11.0+ | Hide | |
| Watch Migration | 11.0+ | Hide | |
| Emergency SOS | 16.0+ | Organization preference | |
| Action button | 17.0+ | Organization preference | iPhone 15 Pro and later |
| Apple Intelligence | 18.0+ | Organization preference | |
| Camera button | 18.0+ | Organization preference | iPhone 16 and later |
| Web content filtering | 18.2+ | Organization preference | |
| Safety and handling | 18.4+ | Organization preference | |
| Get Started | 15.0+ | Show | |
| App Store | 14.3+ | Organization preference | |
| Software Update | 12.0+ | Show | |
| Terms of Address | 16.0+ | Hide | |
| Android Migration | 9.0+ | Hide | Not applicable to corporate ADE deployments |
| Multitasking | 26.0+ | Organization preference | iPadOS only |
| OS Showcase | 26.0+ | Organization preference | |

**Deprecated panes (do not include in new profiles):** Zoom (deprecated iOS/iPadOS 17), Display Tone (deprecated iOS/iPadOS 15), Device to Device Migration (deprecated for iOS/iPadOS 13+).

> **What breaks if misconfigured:** Setup Assistant pane configuration is cosmetic — hiding or showing panes does not affect device functionality or security policies. Compliance policy enforcement happens after enrollment, not during Setup Assistant.

### Step 4: Assign profile to devices

After saving the enrollment profile, assign it to devices synced through the ADE token. You can assign a profile per-device or set the profile as the **Default profile** for the token (recommended — all synced devices automatically receive it). Profile assignment is over-the-air and does not require the device to be present or powered on.

> **What breaks if misconfigured:** If no enrollment profile is assigned before the device is powered on, the device boots through standard (non-managed) iOS Setup Assistant. The device will not enroll in MDM. The fix requires a factory reset. Symptom appears in: the device (standard iOS setup with no enrollment prompt) and Intune admin center (device does not appear in the managed device list).

## Verification

- [ ] Enrollment profile appears under the ADE token in Intune admin center
- [ ] Supervised mode is set to Yes
- [ ] Locked enrollment is set to Yes (for corporate-owned devices)
- [ ] Authentication method is "Setup Assistant with modern authentication"
- [ ] Await final configuration is set to Yes
- [ ] User Affinity matches organizational requirement (with affinity for user-assigned, without for kiosk/shared)
- [ ] At least one device shows the profile assignment
- [ ] Setup Assistant pane configuration matches organizational preference
- [ ] Deprecated panes (Zoom, Display Tone, Device to Device Migration) are not configured in the profile

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Supervised mode set to No | Intune | Supervised-only policies show "Not applicable"; locked enrollment ineffective | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| Locked enrollment set to No | Intune | Users can remove management profile via Settings > General > VPN & Device Management | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| No user affinity on user-targeted deployment | Intune | Company Portal non-functional; user CA policies not applied; no primary user shown | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| Legacy authentication method | Intune | Setup Assistant auth failure when modern CA policies are enforced | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| Await final configuration set to No | Intune | User reaches home screen before device configuration policies apply; immediate non-compliance | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| No profile assigned before device power-on | Intune | Device boots standard iOS setup; does not enroll in MDM; requires factory reset | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |

## See Also

- [ABM/ADE Token Configuration](02-abm-token.md)
- [APNs Certificate](01-apns-certificate.md)
- [iOS/iPadOS Admin Setup Overview](00-overview.md)
- [iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)
- [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md)
- [macOS Enrollment Profile](../admin-setup-macos/02-enrollment-profile.md)
- [Apple Provisioning Glossary](../_glossary-macos.md)

---
*Previous: [ABM/ADE Token](02-abm-token.md) | [Back to Overview](00-overview.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |
| 2026-04-16 | Initial version -- ADE enrollment profile with supervised-only callouts, authentication methods, Setup Assistant panes, and locked enrollment | -- |
