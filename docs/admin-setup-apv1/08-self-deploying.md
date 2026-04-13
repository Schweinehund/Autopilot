---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Self-Deploying Mode Configuration

Self-Deploying mode is a fully automated deployment requiring zero user interaction. The device authenticates using TPM 2.0 as the only credential — no user sign-in occurs during OOBE. Designed for shared devices, kiosks, and digital signage where no user affinity is needed or wanted.

> **No user affinity:** Self-deploying devices join Entra ID as device objects only. There is no primary user. Apps must be assigned to device groups, not user groups. User-targeted policies will not apply during deployment.

## Prerequisites

- **TPM 2.0** with attestation capability — TPM is the **only** authentication mechanism in self-deploying mode; there are no user credentials to fall back on if TPM attestation fails
- **Wired ethernet** — network connection must be available before any user interaction; Wi-Fi is NOT supported because the device cannot prompt for Wi-Fi credentials during automated deployment
- Deployment profile with **Deployment mode** set to **Self-Deploying** (see [Deployment Profile](02-deployment-profile.md))
- ESP policy configured — only the device phase runs; no user phase occurs
- **Hybrid Entra join: NOT supported** in self-deploying mode — no user affinity means no user-initiated AD computer object creation; devices join as Entra-only objects

## Steps

### Step 1: Verify deployment profile settings for Self-Deploying

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows enrollment** > **Windows Autopilot** > **Deployment Profiles**.
2. Select the profile assigned to your kiosk or shared device group.
3. Confirm **Deployment mode**: **Self-Deploying**.
4. Confirm **Join to Microsoft Entra ID as**: **Microsoft Entra joined** — Hybrid Microsoft Entra joined is not available and not supported for self-deploying.

   > **What breaks if misconfigured:** **Admin sees:** Profile configuration shows Hybrid selected with Self-Deploying — deployment fails because self-deploying has no user affinity to drive the connector-based AD join.
   > **End user / device:** OOBE fails; device cannot complete enrollment.
   > **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Verify hardware requirements

Before deploying to a location, confirm the physical requirements:

1. Verify **TPM 2.0** is present and enabled on the target device:
   - On the device, open an admin PowerShell session and run: `Get-Tpm`
   - Confirm `TpmPresent: True`, `TpmReady: True`, and TPM spec version indicates 2.0
2. Confirm **wired ethernet** (RJ-45) is available at each deployment location.

   > **What breaks if misconfigured — TPM:** **Admin sees:** Devices fail enrollment silently. Autopilot diagnostics show TPM attestation failure.
   > **End user / device sees:** OOBE fails at or before enrollment; no Autopilot profile applied.
   > **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

   > **What breaks if misconfigured — Ethernet:** **Admin sees:** Devices at locations with only Wi-Fi cannot complete self-deploying OOBE — device cannot reach the Autopilot service without a network connection and cannot prompt for Wi-Fi credentials.
   > **End user / device sees:** OOBE stalls at network connectivity check with no clear error.
   > **Runbook:** [Network Connectivity](../l1-runbooks/04-network-connectivity.md)

### Step 3: Device deployment flow

Self-deploying requires no user interaction. The following is the automated sequence an admin should be aware of:

1. Device powers on, connected to wired ethernet.
2. Device performs **TPM attestation** with the Autopilot service — confirms device identity without user credentials.
3. Device joins **Microsoft Entra ID as a device object** — no user association is created.
4. **Device phase of ESP** runs — device apps, policies, certificates, and configurations install.
5. **No user phase of ESP** — user-targeted apps and policies are skipped entirely.
6. Desktop is reached — device is ready for use. Any user signing in receives the standard Entra ID sign-in prompt.

> **No user affinity — design implications:**
> - Assign all required apps to **device groups**, not user groups — user-assigned apps will not install during deployment
> - Use **device-based licensing** for Microsoft 365 Apps for enterprise on shared devices
> - User-targeted Conditional Access policies will not apply during the deployment phase; they apply after a user signs in

### Step 4: Post-deployment management

Self-deploying devices require device-centric management:

- **App deployment:** assign apps as required to the device group containing these devices
- **Microsoft 365 Apps:** use device-based licensing (not user-based) for shared device scenarios
- **Updates:** configure Windows Update for Business rings targeting the device group
- **User access:** control via Conditional Access policies that evaluate after sign-in
- **Device identity:** manage via Entra ID device compliance policies; use device tags for grouping

## Verification

- [ ] Device powers on and completes OOBE without any user interaction
- [ ] Device appears in **Intune admin center** > **Devices** > **All devices** as enrolled with **no primary user** assigned
- [ ] Device is **Microsoft Entra joined** (not hybrid) — confirm in Entra ID > Devices
- [ ] Device-assigned apps are installed and visible on the device
- [ ] ESP completed successfully (device phase only)

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| No TPM 2.0 or TPM 1.2 only | Self-deploying cannot authenticate; OOBE fails at TPM attestation | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Wi-Fi only at deployment location (no wired ethernet) | Device cannot reach Autopilot service; OOBE stalls at network connectivity | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
| Hybrid Entra join selected in deployment profile | Deployment fails — hybrid join requires user affinity which self-deploying does not provide | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Required apps assigned to user groups instead of device groups | Apps do not install during deployment; device phase ESP skips user-assigned apps | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| User-affinity expected on shared device (user apps, user policies) | User-targeted policies and apps do not apply during deployment; only available after first user sign-in | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2: TPM Attestation — deeper investigation</summary>

For in-depth troubleshooting of TPM attestation failures in self-deploying mode, including fTPM EK certificate endpoint reachability, TPM firmware version checks, and BIOS TPM configuration, see the L2 runbook:

[L2: TPM Attestation](../l2-runbooks/03-tpm-attestation.md)

</details>

## See Also

- [OOBE lifecycle stage](../lifecycle/03-oobe.md) — end-to-end OOBE and ESP flow
- [Deployment Modes Overview](05-deployment-modes-overview.md) — compare all three modes
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework comparison and selection guide

---

*Next step: [Intune Connector for Active Directory](09-intune-connector-ad.md)*
