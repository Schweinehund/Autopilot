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

This is the consolidated reverse-lookup table for all Windows Autopilot (classic) configuration mistakes. Each entry links to both the guide file where the setting is configured and the troubleshooting runbook for the failure it causes. Use this page when you see a deployment failure and suspect a configuration mistake — find the symptom, then follow the guide link to fix the configuration and the runbook link for immediate triage steps.

## How to Use This Table

1. Find the symptom you are seeing in the **Symptom** column
2. Read the **Misconfiguration** column to identify the likely cause
3. Follow the **Guide** link to fix the configuration
4. Follow the **Runbook** link for immediate troubleshooting steps

---

## Hardware Hash Upload Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| CSV encoded as UTF-8 or Unicode (not ANSI) | Import completes silently but devices don't appear; or "incorrect header" error despite correct headers | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| CSV opened or edited with Excel | Column format corrupted; import fails with parsing error | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| Hash captured before hardware or BIOS change | Stale hash; device not recognized at OOBE; "no Autopilot profile found" | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| Device hash already in another tenant | ZtdDeviceAssignedToAnotherTenant error during import | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| TLS 1.2 not set before Install-Script | NuGet "no match found" error; Get-WindowsAutopilotInfo install fails | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |
| More than 500 devices in one CSV | Import fails or partially processes | [Hardware Hash Upload](01-hardware-hash-upload.md) | [Device Not Registered](../l1-runbooks/01-device-not-registered.md) |

---

## Deployment Profile Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Wrong deployment mode selected | OOBE flow does not match expectations; user sees technician screens or no credentials prompt | [Deployment Profile](02-deployment-profile.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Hybrid join selected without Intune Connector installed | Join fails silently during OOBE; device completes with Entra join only | [Deployment Profile](02-deployment-profile.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| "Allow pre-provisioned deployment" = No | Win+F12 still invokes provisioning screen but deployment fails with error 0x80180005 | [Deployment Profile](02-deployment-profile.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Device name template > 15 characters | Enrollment fails with device naming error | [Deployment Profile](02-deployment-profile.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| "All Devices" profile + targeted profiles | Oldest created profile wins; unexpected settings applied to targeted devices | [Deployment Profile](02-deployment-profile.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Profile not yet assigned when device boots | Profile Status shows "Assigning"; standard OOBE runs instead of Autopilot | [Deployment Profile](02-deployment-profile.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |

---

## ESP Policy Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| ESP timeout too low (especially for hybrid join) | ESP times out; hybrid join adds ~40 min to configured timeout; set at least 100 min for hybrid | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| LOB (MSI) and Win32 apps both required | ESP hangs indefinitely at app installation; TrustedInstaller deadlock | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Microsoft 365 Apps (MSI type) + Win32 apps simultaneously | ESP hang; M365 Apps must be deployed as Win32 type, not MSI | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Install Windows quality updates" = Yes (new profile default) | Provisioning takes 20-40 min longer than expected; unexpected restarts during OOBE | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Block device use" = No with quality updates enabled | Device exits ESP before quality updates and Update Rings apply | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "Show app and profile configuration progress" = No | ESP does not appear; apps install after user reaches desktop with no progress screen | [ESP Policy](03-esp-policy.md) | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |

---

## Dynamic Group Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Wrong ZTDId membership rule syntax | Group has 0 members; no profile assigned to Autopilot devices | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Azure AD Premium license missing | Dynamic membership silently does not work; group always empty | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Device booted before group evaluation completes | Standard OOBE runs instead of Autopilot; profile not received in time | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Group tag case mismatch | Device not in targeted group; wrong profile applied or no profile applied | [Dynamic Groups](04-dynamic-groups.md) | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |

---

## Deployment Mode Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Pre-provisioning without TPM 2.0 | Attestation fails during technician flow; provisioning error screen | [Pre-Provisioning](07-pre-provisioning.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Pre-provisioning on Wi-Fi (not wired ethernet) | Provisioning fails at network stage; technician flow cannot proceed | [Pre-Provisioning](07-pre-provisioning.md) | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
| Self-deploying with hybrid join selected in profile | Deployment fails; self-deploying does not support hybrid join (no user affinity) | [Self-Deploying](08-self-deploying.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Self-deploying without TPM 2.0 | No authentication mechanism available; enrollment fails immediately | [Self-Deploying](08-self-deploying.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Self-deploying without wired ethernet | Deployment fails at network stage; Wi-Fi not available before user input | [Self-Deploying](08-self-deploying.md) | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
| User-targeted apps assigned to self-deploying device | Apps not installed during deployment; no user affinity means user-targeted apps are ignored | [Self-Deploying](08-self-deploying.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

---

## Intune Connector Failures

| Misconfiguration | Symptom | Guide | Runbook |
|------------------|---------|-------|---------|
| Connector version < 6.2501.2000.5 | Hybrid join silently fails; enrollment requests not processed; connector status shows Active | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Old connector not uninstalled before upgrade | Undefined behavior; enrollment requests may fail or route incorrectly | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| OU not configured in ODJConnectorEnrollmentWizard.exe.config | Computer objects land in default Computers container instead of intended OU | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Connector installed on wrong domain server | Requests for other domains not processed; cross-domain hybrid join fails | [Intune Connector](09-intune-connector-ad.md) | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

---

<details>
<summary>L2 Deep Dive References</summary>

For Desktop Engineering investigation beyond L1 triage:

- [L2: ESP Deep-Dive](../l2-runbooks/02-esp-deep-dive.md) — ESP registry structure, device vs. user phase troubleshooting, timeout analysis
- [L2: TPM Attestation](../l2-runbooks/03-tpm-attestation.md) — TPM hardware investigation for pre-provisioning and self-deploying failures
- [L2: Hybrid Join](../l2-runbooks/04-hybrid-join.md) — ODJ connector internals, offline domain join blob analysis, 0x80070774 error
- [L2: Policy Conflicts](../l2-runbooks/05-policy-conflicts.md) — AppLocker, DeviceLock, and GPO conflict analysis

</details>

## See Also

- [APv1 Admin Setup Overview](00-overview.md)
- [L1 Runbook Index](../l1-runbooks/00-index.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Return to: [APv1 Admin Setup Overview](00-overview.md)*
