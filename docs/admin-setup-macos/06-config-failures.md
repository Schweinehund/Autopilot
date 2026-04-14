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

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Personal Apple ID used for token creation | Token cannot be renewed after employee departure; new devices stop syncing | [ABM Configuration](01-abm-configuration.md) | [TBD - Phase 24] |
| No enrollment profile assigned before power-on | Device runs standard macOS setup; does not appear in Intune Devices | [ABM Configuration](01-abm-configuration.md) | [TBD - Phase 24] |
| Wrong MDM server selected for device | Device enrolls to wrong Intune tenant/profile | [ABM Configuration](01-abm-configuration.md) | [TBD - Phase 24] |
| Expired ADE token not renewed | New ABM-assigned devices stop appearing in Intune; existing enrolled devices unaffected | [ABM Configuration](01-abm-configuration.md) | [TBD - Phase 24] |
| Device not released by previous organization | Device cannot be assigned to new MDM server | [ABM Configuration](01-abm-configuration.md) | [TBD - Phase 24] |

## Enrollment Profile Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| No user affinity on user-targeted deployment | Company Portal non-functional; user CA policies not applied | [Enrollment Profile](02-enrollment-profile.md) | [TBD - Phase 24] |
| Legacy authentication method | Setup Assistant auth failure when modern CA policies are enforced | [Enrollment Profile](02-enrollment-profile.md) | [TBD - Phase 24] |
| Await Configuration = No | User reaches desktop before policies apply; immediate non-compliance | [Enrollment Profile](02-enrollment-profile.md) | [TBD - Phase 24] |
| Locked enrollment = No on supervised device | User can remove management profile via System Settings | [Enrollment Profile](02-enrollment-profile.md) | [TBD - Phase 24] |
| Hiding Accessibility screen | VoiceOver blocked on supported devices | [Enrollment Profile](02-enrollment-profile.md) | [TBD - Phase 24] |
| Hiding Restore screen on macOS 15.4+ | Setting has no effect; user sees alert instead | [Enrollment Profile](02-enrollment-profile.md) | [TBD - Phase 24] |

## Configuration Profile Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| New profile via Endpoint protection template (deprecated) | Profile may not contain latest settings; stale template | [Configuration Profiles](03-configuration-profiles.md) | [TBD - Phase 24] |
| FileVault without recovery key escrow | Admin cannot retrieve recovery key for locked device | [Configuration Profiles](03-configuration-profiles.md) | [TBD - Phase 24] |
| Firewall blocks incoming without MDM exceptions | Device stops checking in; app deployment fails | [Configuration Profiles](03-configuration-profiles.md) | [TBD - Phase 24] |
| SSID case mismatch in Wi-Fi profile | Device cannot connect to network | [Configuration Profiles](03-configuration-profiles.md) | [TBD - Phase 24] |
| Gatekeeper not enforced via config profile | User overrides Gatekeeper; compliance policy detects but cannot prevent | [Configuration Profiles](03-configuration-profiles.md) | [TBD - Phase 24] |
| Certificate profile missing for enterprise Wi-Fi | 802.1X authentication fails on device | [Configuration Profiles](03-configuration-profiles.md) | [TBD - Phase 24] |

## App Deployment Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Non-app file in DMG Included apps list | Installation reported as failed | [App Deployment](04-app-deployment.md) | [TBD - Phase 24] |
| Managed PKG > 2 GB | Upload fails | [App Deployment](04-app-deployment.md) | [TBD - Phase 24] |
| PKG without payload (managed LOB) | Continuous reinstallation | [App Deployment](04-app-deployment.md) | [TBD - Phase 24] |
| VPP Available assigned to device group | App not visible in Company Portal | [App Deployment](04-app-deployment.md) | [TBD - Phase 24] |
| Uninstall on unmanaged PKG | Uninstall option not available (Known Issue) | [App Deployment](04-app-deployment.md) | [TBD - Phase 24] |
| VPP license revoked without Uninstall intent | App remains installed for 30-day grace period | [App Deployment](04-app-deployment.md) | [TBD - Phase 24] |
| Expired VPP token | VPP apps stop syncing; existing installs unaffected | [App Deployment](04-app-deployment.md) | [TBD - Phase 24] |

## Compliance Policy Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Compliance policy without enforcement config profile | Devices non-compliant but settings not enforced; users can change freely | [Compliance Policies](05-compliance-policy.md) | [TBD - Phase 24] |
| SIP required but disabled on device | Non-compliant with no MDM remediation; user must boot to Recovery Mode | [Compliance Policies](05-compliance-policy.md) | [TBD - Phase 24] |
| OS version requirement ahead of available update | Entire fleet non-compliant until Apple releases update | [Compliance Policies](05-compliance-policy.md) | [TBD - Phase 24] |
| Password change timing gap | Device appears compliant with old password until user changes it | [Compliance Policies](05-compliance-policy.md) | [TBD - Phase 24] |
| Gatekeeper compliance without config profile | Users can override Gatekeeper; compliance detects but cannot prevent | [Compliance Policies](05-compliance-policy.md) | [TBD - Phase 24] |

## See Also

- [macOS Admin Setup Overview](00-overview.md)
- macOS L1 Runbooks (TBD - Phase 24)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- consolidated config-failures from all 5 macOS admin setup guides | -- |
