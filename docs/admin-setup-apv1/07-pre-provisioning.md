---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Pre-Provisioning Mode Configuration

Pre-provisioning is a two-phase deployment: a technician completes device setup in a staging facility, then reseals the device for the end user. Also known historically as "white glove." This mode has the strictest hardware requirements of all three modes.

## Prerequisites

- **Physical device required** -- VMs are not supported for pre-provisioning
- **TPM 2.0** with attestation capability -- fTPM devices must be able to reach the manufacturer's EK certificate endpoints
- **Wired ethernet** -- Wi-Fi is **NOT** supported during the pre-provisioning technician flow
- Deployment profile with "Allow pre-provisioned deployment" set to **Yes** (see [Deployment Profile](02-deployment-profile.md))
- User-driven mode working successfully in the tenant first -- pre-provisioning builds on user-driven
- ESP policy configured with adequate timeout (recommend **90+ minutes** for technician flow with large app sets)
- For hybrid Entra join: Intune Connector for Active Directory installed and active (see [Intune Connector](09-intune-connector-ad.md))

## Steps

### Step 1: Verify Deployment Profile Settings

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > [profile name].
2. Confirm "Allow pre-provisioned deployment" = **Yes**.

> **What breaks if misconfigured:** Setting to No still allows the technician to press Win+F12, but the deployment fails with error **0x80180005**. Admin sees error in Autopilot diagnostics. Technician sees a provisioning failure screen. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Technician Flow (Staging Facility)

The technician performs these steps in the staging facility:

1. Connect the device to **wired ethernet** (mandatory -- Wi-Fi will NOT work).
2. Power on the device.
3. At the first OOBE screen (region selection), press **Win+F12**.
   - Alternative: press the Windows button **5 times within 10 seconds**.
4. The pre-provisioning screen appears: "Windows Autopilot provisioning."
5. Select **Provision device** (or it starts automatically depending on the profile).
6. Device completes Entra join and device phase of ESP (apps, policies, certificates).
7. Screen shows a green **"Device provisioned successfully"** or a red error screen.
8. Technician selects **Reseal** -- the device shuts down and is ready for shipping to the end user.

> **What breaks if misconfigured:** Using Wi-Fi instead of ethernet causes provisioning to fail at TPM attestation or the network configuration stage. The device cannot complete the pre-provisioning flow over Wi-Fi. See: [Network Connectivity](../l1-runbooks/04-network-connectivity.md)

> **What breaks if misconfigured:** Win+F12 not responding -- check if the BIOS is intercepting F12 (common on Dell/HP for boot menu). Use the 5x Windows button alternative instead.

### Step 3: User Flow (After Reseal)

The end user receives the device and completes setup:

1. Device boots to user sign-in (region and keyboard already configured by the technician).
2. User enters their organizational credentials.
3. User phase of ESP runs (user-specific apps, policies).
4. Desktop reached -- device is fully enrolled and ready.

### Step 4: Hybrid Join Considerations

If using hybrid Entra join with pre-provisioning:

- Intune Connector for Active Directory required (see [Intune Connector](09-intune-connector-ad.md))
- OU configuration must be set in the connector for computer object placement
- ESP timeout must include the **+40 minute** connector processing buffer
- The connector creates the AD computer object during the technician flow

## Verification

- [ ] Win+F12 triggers the pre-provisioning screen (not standard OOBE)
- [ ] Technician flow completes with a green success screen
- [ ] Device reseals and shuts down cleanly
- [ ] End user receives device and completes user phase ESP successfully
- [ ] Device appears in Intune with correct user affinity after user sign-in
- [ ] For hybrid join: device appears in AD in the correct OU

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| "Allow pre-provisioned deployment" = No | Win+F12 triggers error 0x80180005 | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Wi-Fi used instead of wired ethernet | Provisioning fails at network or TPM stage | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
| TPM 2.0 not available or not functional | Attestation fails; provisioning error screen | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| VM used instead of physical device | Pre-provisioning not supported on VMs | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Intune Connector too old for hybrid join | Enrollment requests silently rejected | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| ESP timeout insufficient for technician flow | ESP times out before apps install | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2 Deep Dive: TPM Attestation</summary>

For TPM hardware investigation, fTPM vs dTPM troubleshooting, EK certificate chain validation, and attestation failure analysis, see [L2: TPM Attestation](../l2-runbooks/03-tpm-attestation.md).

</details>

## See Also

- [OOBE Lifecycle Stage](../lifecycle/03-oobe.md)
- [Deployment Modes Overview](05-deployment-modes-overview.md)
- [Intune Connector for Active Directory](09-intune-connector-ad.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Self-Deploying Mode](08-self-deploying.md)*
