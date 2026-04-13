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

Self-deploying mode is a fully automated deployment requiring zero user interaction. The device enrolls using TPM 2.0 as the only authentication mechanism -- no user credentials are entered. Designed for shared devices, kiosks, and digital signage where no user affinity is needed.

## Prerequisites

- **TPM 2.0** with attestation capability -- TPM is the ONLY authentication mechanism (no user credentials are used)
- **Wired ethernet** mandatory -- network connection is required before any user input; Wi-Fi is NOT supported
- **No user affinity** -- device joins as a device object only, with no primary user assignment
- Deployment profile with Deployment mode = **Self-Deploying** (see [Deployment Profile](02-deployment-profile.md))
- ESP policy configured -- only the device phase runs (there is no user phase of ESP)
- **Hybrid Entra join: NOT supported** in self-deploying mode -- no user affinity means no hybrid join

## Steps

### Step 1: Verify Deployment Profile Settings

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > [profile name].
2. Confirm:
   - Deployment mode: **Self-Deploying**
   - Join type: **Microsoft Entra joined** (hybrid is NOT available for self-deploying)

> **What breaks if misconfigured:** Selecting hybrid join type with self-deploying mode causes the deployment to fail. Self-deploying has no user affinity and cannot create an AD computer object in the traditional hybrid flow. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Verify Hardware Requirements

Before deploying, confirm the target device meets both requirements:

- **TPM 2.0** present and functional -- run `Get-Tpm` in an admin PowerShell prompt to verify TpmPresent and TpmReady are both True
- **Wired ethernet** connection available at the deployment location

> **What breaks if misconfigured:** No TPM or TPM 1.2 means self-deploying cannot authenticate. The deployment fails at the attestation stage with no recovery option other than switching to user-driven mode. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

> **What breaks if misconfigured:** Using Wi-Fi instead of wired ethernet means the device cannot reach the Autopilot service before OOBE. No network connectivity is available at the pre-authentication stage. See: [Network Connectivity](../l1-runbooks/04-network-connectivity.md)

### Step 3: Device Deployment Flow

What happens during a self-deploying deployment (no user interaction required):

1. Device powers on, connected to wired ethernet.
2. Device performs TPM attestation with the Autopilot service.
3. Device joins Entra ID as a device object (no user affinity).
4. Device phase of ESP runs (device apps, policies, certificates).
5. Desktop reached -- device is ready for use.
6. No user phase -- any user signing in gets the standard sign-in experience.

> [!IMPORTANT]
> **No User Affinity**
>
> Self-deploying devices have no primary user. Apps must be assigned to **device groups**, not user groups. User-targeted policies will not apply during deployment. Design app and policy assignments accordingly before deploying.

### Step 4: Post-Deployment Management

- **Device management:** Treat as a shared device in Intune
- **App deployment:** Use device-based licensing (e.g., Microsoft 365 Apps for enterprise device-based license)
- **User policies:** Apply via conditional access or Entra group-based assignment after first user sign-in
- **User-targeted apps:** Assign apps that should be available to all users of the device via device groups, not user groups

> **What breaks if misconfigured:** User-targeted apps assigned to self-deploying devices are not installed during deployment because there is no user context. Apps appear missing when the user signs in. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

## Verification

- [ ] Device completes OOBE without any user interaction
- [ ] Device appears in Intune as enrolled (no primary user assigned)
- [ ] Device is Entra joined (not hybrid)
- [ ] Device-assigned apps are installed
- [ ] Any user can sign in and use the device

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Hybrid join selected with self-deploying | Deployment fails; hybrid not supported | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| TPM 2.0 not available | Attestation fails; no authentication mechanism | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Wi-Fi used instead of wired ethernet | No network at pre-authentication stage | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
| User-targeted apps on self-deploying device | Apps not installed during deployment | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Device-based license not configured | M365 Apps fail to activate after deployment | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2 Deep Dive: TPM Attestation</summary>

For TPM hardware investigation, fTPM vs dTPM troubleshooting, EK certificate chain validation, and attestation failure analysis, see [L2: TPM Attestation](../l2-runbooks/03-tpm-attestation.md).

</details>

## See Also

- [OOBE Lifecycle Stage](../lifecycle/03-oobe.md)
- [Deployment Modes Overview](05-deployment-modes-overview.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Intune Connector for Active Directory](09-intune-connector-ad.md)*
