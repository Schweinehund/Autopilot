---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Enrollment Profile Configuration

This guide covers creating and configuring a macOS [ADE](../_glossary-macos.md#ade) enrollment profile in Intune, including user affinity, authentication method, [Await Configuration](../_glossary-macos.md#await-configuration), locked enrollment, and [Setup Assistant](../_glossary-macos.md#setup-assistant) screen customization.

## Prerequisites

- ADE token configured and active (see [ABM Configuration](01-abm-configuration.md))
- Intune Administrator role
- At least one device synced from ABM

## Steps

### Step 1: Create Enrollment Profile

#### In Intune admin center

1. Navigate to **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens**.
2. Select the ADE token.
3. Select **Profiles** > **Create profile** > **macOS**.
4. Enter a profile name and description.

### Step 2: Configure User Affinity and Authentication

Configure the following enrollment settings:

| Setting | Options | Default | Notes |
|---------|---------|---------|-------|
| User Affinity | Enroll with User Affinity / Enroll without User Affinity | -- | Determines whether device is associated with a specific user |
| Authentication method (with affinity) | Setup Assistant with modern authentication (recommended) / Setup Assistant (legacy) | Modern auth | Legacy requires AD FS WS-Trust 1.3 |
| Await final configuration | Yes / No | Yes (new profiles since late 2024) | Locks device until policies apply |
| Locked enrollment | Yes / No | -- | Prevents user from removing management profile |
| Local account creation (LAPS) | Configure / Not configured | Not configured | Creates local admin account during setup |

> **What breaks if misconfigured:** Without user affinity, Company Portal will not work and user-based Conditional Access policies do not apply. Symptom appears in: Intune admin center (device shows no primary user) and Company Portal (app not functional).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Legacy authentication method requires AD FS WS-Trust 1.3 and is incompatible with modern Conditional Access policies. Symptom appears in: Setup Assistant (authentication failure screen).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Await final configuration set to No allows users to reach the desktop before policies and profiles apply, causing immediate compliance failures. Symptom appears in: device (user reaches desktop without management) and Intune admin center (non-compliant status).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Locked enrollment set to Yes prevents the user from removing the management profile via System Settings > Profiles. This setting cannot be changed after enrollment without a factory wipe. If set to No, the user can remove the MDM profile and become unmanaged. Symptom appears in: device (Profiles section in System Settings).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Misconfigured LAPS username template causes account creation failure during Setup Assistant. Link to official LAPS documentation for full configuration. Symptom appears in: Setup Assistant (error during account creation).
> See: [Troubleshooting Runbook](TBD - Phase 24)

### Step 3: Configure Setup Assistant Screens

These screens appear during the first-run experience and can be shown or hidden per organizational preference. Configure which screens users see during macOS setup.

| Screen | Min macOS Version | Recommended | Notes |
|--------|-------------------|-------------|-------|
| Location Services | 10.11 | Organization preference | |
| Restore | 10.9-15.3 | Show | macOS 15.4+: cannot be hidden; user gets an alert instead of restoration screen |
| Apple ID | 10.9 | Show | User needs for iCloud |
| Terms and conditions | 10.9 | Show | |
| Touch ID and Face ID | 10.12.4 | Show | |
| Apple Pay | 10.12.4 | Hide (configure later) | |
| Siri | 10.12 | Hide | |
| Diagnostics Data | 10.9 | Organization preference | |
| Display Tone | 10.13.6 | Show | |
| FileVault | 10.10 | Show (prompts encryption) | |
| iCloud Diagnostics | 10.12.4 | Hide | |
| Registration | 10.9 | Show | |
| iCloud Storage | 10.13.4 | Hide | |
| Appearance | 10.14 | Show | |
| Screen Time | 10.15 | Hide | |
| Privacy | 10.13.4 | Show | |
| Accessibility | 11 | Show | Hiding blocks VoiceOver on supported devices |
| Auto unlock with Apple Watch | 12.0 | Hide | |
| Terms of Address | 13.0 | Hide | |
| Wallpaper | 14.1 | Show | |
| Lockdown mode | 14.0 | Hide | |
| Intelligence | 15.0 | Organization preference | Apple Intelligence settings |
| App Store | 11.1 | Organization preference | |
| Software update | 15.4 | Show | |
| Additional privacy settings | 26.0 | Organization preference | |
| OS Showcase | 26.1 | Organization preference | |
| Update completed | 26.1 | Show | |
| Get started | 15.0 | Show | |

> **What breaks if misconfigured:** The Restore screen on macOS 15.4+ cannot be hidden -- hiding it has no effect and users receive an alert instead. The Accessibility screen hiding blocks VoiceOver on supported devices, which may create accessibility compliance issues. Symptom appears in: device (unexpected screens during Setup Assistant or blocked assistive technology).
> See: [Troubleshooting Runbook](TBD - Phase 24)

### Step 4: Assign Profile to Devices

#### In Intune admin center

1. After saving the profile, navigate to the ADE token.
2. Select **Devices** > select devices > **Assign profile**.
3. Choose the profile created above.
4. Alternatively, set this profile as the **Default profile** on the token (recommended -- all synced devices automatically receive it).

## Verification

- [ ] Enrollment profile appears under token's Profiles tab in Intune admin center
- [ ] User Affinity setting matches organizational requirement
- [ ] Await final configuration is set to Yes (recommended)
- [ ] Authentication method is "Setup Assistant with modern authentication"
- [ ] At least one device shows the profile assignment in Devices > [serial] > Profile column
- [ ] Locked enrollment set per organizational policy

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| No user affinity on user-targeted deployment | Intune | Company Portal non-functional; user CA policies not applied | [TBD - Phase 24] |
| Legacy authentication method | Intune | Setup Assistant auth failure when modern CA policies are enforced | [TBD - Phase 24] |
| Await Configuration = No | Intune | User reaches desktop before policies apply; immediate non-compliance | [TBD - Phase 24] |
| Locked enrollment = No on supervised device | Intune | User can remove management profile via System Settings | [TBD - Phase 24] |
| Hiding Accessibility screen | Intune | VoiceOver blocked on supported devices | [TBD - Phase 24] |
| Hiding Restore screen on macOS 15.4+ | Intune | Setting has no effect; user sees alert instead | [TBD - Phase 24] |

## See Also

- [ABM Configuration](01-abm-configuration.md)
- [Configuration Profiles](03-configuration-profiles.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [macOS Provisioning Glossary](../_glossary-macos.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- enrollment profile with Setup Assistant screens, enrollment settings, what-breaks callouts | -- |
