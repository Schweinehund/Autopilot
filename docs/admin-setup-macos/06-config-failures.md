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

# macOS Configuration-Caused Failures Reference

This is the consolidated reverse-lookup table for all macOS admin setup configuration mistakes. Each entry links to both the guide file where the setting is configured and the troubleshooting runbook for the failure it causes. Use this page when you see a deployment or management failure and suspect a configuration mistake.

## How to Use This Table

1. Find the symptom you are seeing in the **Symptom** column
2. Read the **Misconfiguration** column to identify the likely cause
3. Follow the **Guide** link to fix the configuration
4. Follow the **Runbook** link for immediate troubleshooting steps

## ABM Configuration Failures

| Misconfiguration | Portal | Symptom | Guide | Runbook |
|------------------|--------|---------|-------|---------|
| Personal Apple ID used for token creation | ABM | Token cannot be renewed after employee departure; new devices stop syncing | [ABM Configuration](01-abm-configuration.md) | [Device Not Appearing](../l1-runbooks/10-macos-device-not-appearing.md) |
| No enrollment profile assigned before power-on | Intune | Device runs standard macOS setup; does not appear in Intune Devices | [ABM Configuration](01-abm-configuration.md) | [Device Not Appearing](../l1-runbooks/10-macos-device-not-appearing.md) |
| Wrong MDM server selected for device | ABM | Device enrolls to wrong Intune tenant/profile | [ABM Configuration](01-abm-configuration.md) | [Device Not Appearing](../l1-runbooks/10-macos-device-not-appearing.md) |
| Expired ADE token not renewed | Intune | New ABM-assigned devices stop appearing in Intune; existing enrolled devices unaffected | [ABM Configuration](01-abm-configuration.md) | [Device Not Appearing](../l1-runbooks/10-macos-device-not-appearing.md) |
| Device not released by previous organization | ABM | Device cannot be assigned to new MDM server | [ABM Configuration](01-abm-configuration.md) | [Device Not Appearing](../l1-runbooks/10-macos-device-not-appearing.md) |

## Enrollment Profile Failures

| Misconfiguration | Portal | Symptom | Guide | Runbook |
|------------------|--------|---------|-------|---------|
| No user affinity on user-targeted deployment | Intune | Company Portal non-functional; user CA policies not applied | [Enrollment Profile](02-enrollment-profile.md) | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Legacy authentication method | Intune | Setup Assistant auth failure when modern CA policies are enforced | [Enrollment Profile](02-enrollment-profile.md) | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Await Configuration = No | Intune | User reaches desktop before policies apply; immediate non-compliance | [Enrollment Profile](02-enrollment-profile.md) | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Locked enrollment = No on supervised device | Intune | User can remove management profile via System Settings | [Enrollment Profile](02-enrollment-profile.md) | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Hiding Accessibility screen | Intune | VoiceOver blocked on supported devices | [Enrollment Profile](02-enrollment-profile.md) | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |
| Hiding Restore screen on macOS 15.4+ | Intune | Setting has no effect; user sees alert instead | [Enrollment Profile](02-enrollment-profile.md) | [Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) |

## Configuration Profile Failures

| Misconfiguration | Portal | Symptom | Guide | Runbook |
|------------------|--------|---------|-------|---------|
| New profile via Endpoint protection template (deprecated) | Intune | Profile may not contain latest settings; stale template | [Configuration Profiles](03-configuration-profiles.md) | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| FileVault without recovery key escrow | Intune | Admin cannot retrieve recovery key for locked device | [Configuration Profiles](03-configuration-profiles.md) | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| Firewall blocks incoming without MDM exceptions | Intune | Device stops checking in; app deployment fails | [Configuration Profiles](03-configuration-profiles.md) | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| SSID case mismatch in Wi-Fi profile | Intune | Device cannot connect to network | [Configuration Profiles](03-configuration-profiles.md) | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| Gatekeeper not enforced via config profile | Intune | User overrides Gatekeeper; compliance policy detects but cannot prevent | [Configuration Profiles](03-configuration-profiles.md) | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| Certificate profile missing for enterprise Wi-Fi | Intune | 802.1X authentication fails on device | [Configuration Profiles](03-configuration-profiles.md) | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |

## App Deployment Failures

| Misconfiguration | Portal | Symptom | Guide | Runbook |
|------------------|--------|---------|-------|---------|
| Non-app file in DMG Included apps list | Intune | Installation reported as failed | [App Deployment](04-app-deployment.md) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| Managed PKG > 2 GB | Intune | Upload fails | [App Deployment](04-app-deployment.md) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| PKG without payload (managed LOB) | Intune | Continuous reinstallation | [App Deployment](04-app-deployment.md) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| VPP Available assigned to device group | Intune | App not visible in Company Portal | [App Deployment](04-app-deployment.md) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| Uninstall on unmanaged PKG | Intune | Uninstall option not available (Known Issue) | [App Deployment](04-app-deployment.md) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| VPP license revoked without Uninstall intent | ABM | App remains installed for 30-day grace period | [App Deployment](04-app-deployment.md) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |
| Expired VPP token | Intune | VPP apps stop syncing; existing installs unaffected | [App Deployment](04-app-deployment.md) | [App Not Installed](../l1-runbooks/13-macos-app-not-installed.md) |

## Compliance Policy Failures

| Misconfiguration | Portal | Symptom | Guide | Runbook |
|------------------|--------|---------|-------|---------|
| Compliance policy without enforcement config profile | Intune | Devices non-compliant but settings not enforced; users can change freely | [Compliance Policies](05-compliance-policy.md) | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| SIP required but disabled on device | Intune | Non-compliant with no MDM remediation; user must boot to Recovery Mode | [Compliance Policies](05-compliance-policy.md) | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| OS version requirement ahead of available update | Intune | Entire fleet non-compliant until Apple releases update | [Compliance Policies](05-compliance-policy.md) | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| Password change timing gap | Intune | Device appears compliant with old password until user changes it | [Compliance Policies](05-compliance-policy.md) | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |
| Gatekeeper compliance without config profile | Intune | Users can override Gatekeeper; compliance detects but cannot prevent | [Compliance Policies](05-compliance-policy.md) | [Compliance / Access Blocked](../l1-runbooks/14-macos-compliance-access-blocked.md) |

## See Also

- [macOS Admin Setup Overview](00-overview.md)
- [macOS L1 Runbooks](../l1-runbooks/00-index.md#macos-ade-runbooks)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Resolved all Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- consolidated config-failures from all 5 macOS admin setup guides | -- |
