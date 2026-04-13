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

Pre-provisioning is a two-phase deployment mode, historically known as "white glove." In phase one, a technician in a staging facility completes the device setup — Entra join, device ESP (apps and policies) — and reseals the device for shipping. In phase two, the end user powers on the device, authenticates, and completes only the user phase of ESP. The result is a fully configured device arriving at the user's desk with minimal setup time.

> **Note:** User-Driven mode must work correctly in your tenant before enabling pre-provisioning. Pre-provisioning builds on the user-driven infrastructure — if user-driven is broken, pre-provisioning will be too.

## Prerequisites

- **Physical device required** — pre-provisioning is not supported on virtual machines
- **TPM 2.0** with attestation capability — required for the pre-provisioning technician flow to complete Entra join; fTPM devices must be able to reach manufacturer EK certificate endpoints
- **Wired ethernet** — Wi-Fi is NOT supported during the pre-provisioning technician flow; an RJ-45 connection is mandatory at the staging location
- Deployment profile with **Allow pre-provisioned deployment** set to **Yes** (see [Deployment Profile](02-deployment-profile.md))
- User-Driven mode working successfully in the tenant (see [User-Driven Mode](06-user-driven.md))
- ESP policy configured with timeout of at least **90 minutes** for the technician flow — large app sets need additional time; adjust based on your environment
- **For Hybrid Entra join:** Intune Connector for Active Directory installed, active, and version ≥ 6.2501.2000.5 (see [Intune Connector](09-intune-connector-ad.md))

## Steps

### Step 1: Verify deployment profile settings for pre-provisioning

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows enrollment** > **Windows Autopilot** > **Deployment Profiles**.
2. Select the profile assigned to devices being pre-provisioned.
3. Confirm **Deployment mode**: **User-Driven**.
4. Confirm **Allow pre-provisioned deployment**: **Yes**.

   > **What breaks if misconfigured:** **Admin sees:** Win+F12 still invokes the pre-provisioning screen, but provisioning fails immediately with error **0x80180005**. No meaningful error detail is shown on-screen.
   > **End user / technician sees:** Red error screen reading "Something went wrong" with error 0x80180005 during the technician provisioning phase.
   > **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

### Step 2: Technician flow — staging facility

The technician performs these steps at the staging facility **before the device ships to the end user**:

1. Connect the device to **wired ethernet** — a physical RJ-45 connection is mandatory. Wi-Fi will not work during the technician flow.

   > **What breaks if misconfigured:** **Admin sees:** No remote visibility during technician flow; devices arrive at users without completing provisioning.
   > **Technician sees:** Provisioning fails at network connectivity or TPM attestation stage with no clear error message.
   > **Runbook:** [Network Connectivity](../l1-runbooks/04-network-connectivity.md)

2. Power on the device.
3. At the **first OOBE screen** (typically the region selection screen), press **Win+F12**.
   - Alternative: press the **Windows logo button 5 times within 10 seconds** if keyboard is unavailable or if the BIOS intercepts F12.
   - Pre-provisioning screen appears: "**Windows Autopilot provisioning**"

   > **What breaks if misconfigured:** **Technician sees:** Win+F12 does not invoke the pre-provisioning screen — BIOS or keyboard intercepted F12. Try the 5x Windows button alternative. If profile has "Allow pre-provisioned deployment" = No, the screen appears but provisioning fails with 0x80180005.

4. Select **Provision device** (or provisioning starts automatically, depending on profile settings).
5. Device completes the **technician phase**:
   - Entra ID join (or Hybrid Entra join if configured)
   - Device phase of ESP: device apps, policies, and certificates install
6. Wait for the provisioning result screen:
   - **Green screen** ("Device provisioned successfully"): continue to step 7
   - **Red screen** with error code: provisioning failed; note error code and see [OOBE Failure](../l1-runbooks/05-oobe-failure.md)
7. Select **Reseal** — the device shuts down ready for shipping to the end user.

### Step 3: User flow — after reseal

The end user receives the device and:

1. Powers on the device — boots directly to a simplified sign-in screen; region and keyboard were already configured by the technician.
2. Enters their organizational credentials (email and password, plus MFA if required).
3. **User phase of ESP** runs — user-specific apps and policies apply (faster than a full deployment because device phase already completed).
4. Desktop is reached — device is ready for use.

> **Note:** Quality updates (if enabled in the ESP policy) apply during the User Flow, not the Technician Flow. If "Install Windows quality updates" is enabled in your ESP policy, the user phase will take longer — plan for this in end-user communications.

### Step 4: Hybrid Entra join considerations

Hybrid Entra join in pre-provisioning follows the same Intune Connector requirement as User-Driven mode:

- Intune Connector must be installed, active, and version ≥ 6.2501.2000.5 (see [Intune Connector](09-intune-connector-ad.md))
- OU for computer object creation must be configured in the connector
- Technician flow ESP timeout must be set to at least **100 minutes** — the connector adds ~40 minutes for AD computer object creation

> **What breaks if misconfigured:** **Admin sees:** Technician flow completes but device is not joined to AD; hybrid resources unavailable after reseal.
> **End user sees:** After completing user sign-in, group policy and on-premises resources are unavailable.
> **Runbook:** [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

## Verification

- [ ] Win+F12 at the first OOBE screen invokes the pre-provisioning screen ("Windows Autopilot provisioning")
- [ ] Technician flow completes with green success screen ("Device provisioned successfully")
- [ ] Device reseals and shuts down cleanly
- [ ] End user can power on and sees simplified sign-in (not full OOBE)
- [ ] End user completes user phase ESP without timeout
- [ ] Device appears in Intune with correct user affinity after user sign-in
- [ ] For hybrid join: device appears in Active Directory in the correct OU

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| "Allow pre-provisioned deployment" set to No | Technician flow invoked by Win+F12 but fails immediately with error 0x80180005 | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Wi-Fi used instead of wired ethernet during technician flow | Provisioning fails at network connectivity or TPM attestation; no clear error | [Network Connectivity](../l1-runbooks/04-network-connectivity.md) |
| TPM 2.0 not available (device has TPM 1.2 or no TPM) | Technician flow fails at Entra join — TPM attestation cannot complete | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Virtual machine used for pre-provisioning | Provisioning fails — VMs are explicitly not supported for pre-provisioning | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Intune Connector version < 6.2501.2000.5 for hybrid join | Connector shows Active but no ODJ blob delivered; device not domain-joined after technician flow | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| ESP timeout insufficient for large app sets or hybrid join | Technician flow times out before apps install or before AD object is created | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |

<details>
<summary>L2: TPM Attestation — deeper investigation</summary>

For in-depth troubleshooting of TPM attestation failures during pre-provisioning, including fTPM EK certificate endpoint reachability, TPM firmware version checks, and BIOS configuration, see the L2 runbook:

[L2: TPM Attestation](../l2-runbooks/03-tpm-attestation.md)

</details>

## See Also

- [OOBE lifecycle stage](../lifecycle/03-oobe.md) — end-to-end OOBE and ESP flow
- [Deployment Modes Overview](05-deployment-modes-overview.md) — compare all three modes
- [Intune Connector for Active Directory](09-intune-connector-ad.md) — required for hybrid Entra join
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework comparison and selection guide

---

*Next step: [Self-Deploying Mode](08-self-deploying.md)*
