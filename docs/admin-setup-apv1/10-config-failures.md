---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv1 Configuration-Caused Failures Reference

This is the consolidated reverse-lookup table for all Windows Autopilot (classic) configuration mistakes. Each entry links to both the guide file where the setting is configured and the troubleshooting runbook for the failure it causes. Use this page when you see a deployment failure and suspect a configuration mistake.

## How to Use This Table

1. Find the symptom you are seeing in the **Symptom** column
2. Read the **Misconfiguration** column to identify the likely cause
3. Follow the **Guide** link to fix the configuration
4. Follow the **Runbook** link for immediate troubleshooting steps

## Hardware Hash Upload Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| CSV not ANSI-encoded (UTF-8 or Unicode used) | Import fails silently or "incorrect header" error | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| CSV edited in Excel before import | Column format corrupted; import fails or partial import | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| Hash captured before hardware/BIOS change | Stale hash; device not recognized at OOBE | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| Device hash registered in another tenant | ZtdDeviceAssignedToAnotherTenant error | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| TLS 1.2 not set before Install-Script | NuGet provider "no match found" error | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |

## Deployment Profile Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Wrong deployment mode selected | OOBE flow doesn't match expectations | [Deployment Profile](02-deployment-profile.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Hybrid join without Intune Connector | Join fails silently during OOBE | [Deployment Profile](02-deployment-profile.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| "Allow pre-provisioned deployment" = No | Win+F12 triggers error 0x80180005 | [Deployment Profile](02-deployment-profile.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Device name template > 15 characters | Enrollment fails with naming error | [Deployment Profile](02-deployment-profile.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| "All Devices" profile + targeted profiles | Oldest profile wins; unexpected settings applied | [Deployment Profile](02-deployment-profile.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |

## ESP Policy Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| ESP timeout too low (especially hybrid join) | ESP times out; hybrid join adds ~40 min to configured timeout | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| LOB (MSI) + Win32 apps both required | ESP hangs at app installation; TrustedInstaller conflict | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| M365 Apps (MSI) + Win32 apps simultaneously | ESP hang; M365 Apps must be Win32 type | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Install Windows quality updates" = Yes unexpectedly | Provisioning takes 20-40 min longer; unexpected restarts | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Block device use" = No with quality updates enabled | Device exits ESP before updates apply | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Show app and profile configuration progress" = No | ESP not shown; apps install after user reaches desktop | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |

## Dynamic Group Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Wrong ZTDId membership rule syntax | Group has 0 members; no profile assigned | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Azure AD Premium license missing | Dynamic membership silently doesn't work | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Device imaged before group evaluates | Standard OOBE runs instead of Autopilot | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Group tag case mismatch | Device not in targeted group; no profile | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |

## Deployment Mode Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Pre-provisioning without TPM 2.0 | Attestation fails; provisioning error screen | [Pre-Provisioning](07-pre-provisioning.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Pre-provisioning on Wi-Fi (not ethernet) | Provisioning fails at network stage | [Pre-Provisioning](07-pre-provisioning.md) | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
| Self-deploying with hybrid join selected | Deployment fails; hybrid not supported for self-deploying | [Self-Deploying](08-self-deploying.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Self-deploying without TPM 2.0 | No authentication mechanism; enrollment fails | [Self-Deploying](08-self-deploying.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| User-targeted apps on self-deploying device | Apps not installed during deployment (no user affinity) | [Self-Deploying](08-self-deploying.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

## Intune Connector Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Connector version < 6.2501.2000.5 | Hybrid join silently fails; no enrollment requests processed | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Old connector not uninstalled before upgrade | Undefined behavior; enrollment may fail | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| OU not configured in connector | Computer objects land in default Computers container | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Connector on wrong domain server | Requests for other domains not processed | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

## See Also

- [APv1 Admin Setup Overview](00-overview.md)
- [L1 Runbook Index](../l1-runbooks/00-index.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

<details>
<summary>L2 Deep Dive References</summary>

- [L2: ESP Deep-Dive](../l2-runbooks/02-esp-deep-dive.md) -- ESP registry structure and device vs user phase troubleshooting
- [L2: TPM Attestation](../l2-runbooks/03-tpm-attestation.md) -- TPM hardware investigation for pre-provisioning and self-deploying
- [L2: Hybrid Join](../l2-runbooks/04-hybrid-join.md) -- ODJ connector deep-dive and 0x80070774 analysis
- [L2: Policy Conflicts](../l2-runbooks/05-policy-conflicts.md) -- AppLocker, DeviceLock, and GPO conflict analysis

</details>

---
*Return to: [APv1 Admin Setup Overview](00-overview.md)*
