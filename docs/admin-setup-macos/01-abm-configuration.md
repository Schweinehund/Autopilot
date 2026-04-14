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

# ABM Configuration for Automated Device Enrollment

This guide walks through creating an [ADE](../_glossary-macos.md#ade) token to link [Apple Business Manager](../_glossary-macos.md#abm) with Microsoft Intune, assigning devices to the MDM server, and configuring token renewal. This is the first step in macOS Automated Device Enrollment and must be completed before creating an enrollment profile.

## Prerequisites

- Intune Administrator role in Microsoft Intune admin center
- Device Manager or Administrator role in Apple Business Manager
- Microsoft Intune Plan 1 (or higher) subscription
- Apple Business Manager account with verified organization
- Managed Apple ID (NOT personal Apple ID)

> **What breaks if misconfigured:** Using a personal Apple ID means the [ABM token](../_glossary-macos.md#abm-token) cannot be renewed if that employee leaves the organization. All new device syncing stops when the token expires. Symptom appears in: ABM (cannot log in to renew token) and Intune admin center (new devices stop syncing after token expires).
> See: [Troubleshooting Runbook](TBD - Phase 24)

## Steps

### Step 1: Download Intune Public Key

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens** > **Add**.
3. Grant permission for Microsoft to send user and device information to Apple.
4. Select **Download your public key** to save the .pem certificate file locally.

> **What breaks if misconfigured:** If this step is skipped or an expired public key is used, the server token downloaded from ABM will fail validation when uploaded back to Intune. Symptom appears in: Intune admin center (token upload error).
> See: [Troubleshooting Runbook](TBD - Phase 24)

### Step 2: Create MDM Server and Download Server Token

#### In Apple Business Manager

1. Sign in to [Apple Business Manager](https://business.apple.com) with a **Managed Apple ID**.
2. Navigate to account profile > **Preferences** > **MDM Server Assignments**.
3. Select **Add MDM Server**. Enter a descriptive name (e.g., "Intune Production" -- name is for identification only).
4. Upload the Intune public key (.pem) downloaded in Step 1.
5. Select **Save**, then **Download Server Token** to save the .p7m file.

> **What breaks if misconfigured:** If a personal Apple ID is used instead of a Managed Apple ID, the ADE token becomes unrenewable when that employee leaves. Symptom appears in: ABM (cannot log in to renew token) and Intune admin center (new devices stop syncing after token expires).
> See: [Troubleshooting Runbook](TBD - Phase 24)

### Step 3: Upload Server Token to Intune

#### In Intune admin center

1. Return to the enrollment program token page from Step 1.
2. Enter the Apple ID used in ABM (record this -- required for annual renewal).
3. Upload the server token (.p7m) file downloaded from ABM.
4. Select **Create**.

> **What breaks if misconfigured:** If the wrong .p7m file is uploaded (e.g., from a different ABM MDM server), devices assigned to the intended MDM server will not appear in Intune. Symptom appears in: Intune admin center (devices list empty after sync).
> See: [Troubleshooting Runbook](TBD - Phase 24)

### Step 4: Assign Devices to MDM Server

#### In Apple Business Manager

1. Navigate to **Devices**.
2. Select devices by serial number, order number, or CSV upload.
3. Under **Edit MDM Server**, select the MDM server created in Step 2.
4. Confirm assignment.

> **What breaks if misconfigured:** Device must be assigned BEFORE first power-on. If powered on without assignment, device proceeds through non-managed [Setup Assistant](../_glossary-macos.md#setup-assistant) and requires factory wipe to fix. Symptom appears in: the device itself (standard macOS setup, no MDM enrollment).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Wrong MDM server selected in multi-server organizations (test vs production). Verify assignment at **Devices** > **[serial]** > **Edit MDM Server**. Symptom appears in: Intune admin center (device enrolled to wrong tenant or incorrect enrollment profile applied) or device (unexpected branding or configuration at first boot).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Device enrolled in another MDM -- previous organization must release device in ABM before reassignment. Symptom appears in: ABM (device cannot be assigned to new MDM server).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Non-ABM-linked resellers -- devices do not appear in ABM. Contact reseller or use Apple Configurator (physical access required). Symptom appears in: ABM (device not listed).
> See: [Troubleshooting Runbook](TBD - Phase 24)

### Step 5: Set Default Enrollment Profile

#### In Intune admin center

1. Navigate to **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens**.
2. Select the token created in Step 3.
3. Under **Default profile**, assign the enrollment profile (configured in [Enrollment Profile Guide](02-enrollment-profile.md)).
4. All devices synced via this token automatically receive the default profile.

> **What breaks if misconfigured:** If no enrollment profile is assigned before device first power-on, device boots through standard (non-managed) Setup Assistant. Requires wipe to fix. Symptom appears in: device itself (standard macOS setup) and Intune admin center (device does not appear in Devices > macOS).
> See: [Troubleshooting Runbook](TBD - Phase 24)

## Token Sync Mechanics

| Sync Type | Interval | Notes |
|-----------|----------|-------|
| Automatic (incremental) | Every 24 hours | Picks up newly assigned devices |
| Manual (on-demand) | Rate-limited to once per 15 minutes | Triggered from Intune admin center |
| Full sync | Every 7 days | Re-fetches entire device list from ABM |

Up to 3,000 ADE tokens supported per Intune tenant; each token corresponds to one MDM server in ABM.

## Verification

- [ ] ADE token shows "Active" status in Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens
- [ ] Token expiration date is visible (should be ~365 days from creation)
- [ ] Assigned Apple ID matches the Managed Apple ID used in ABM
- [ ] At least one device appears after sync (if devices were assigned in ABM)
- [ ] Default enrollment profile is assigned to the token

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Personal Apple ID used for token creation | ABM | Token cannot be renewed after employee departure; new devices stop syncing | [TBD - Phase 24] |
| No enrollment profile assigned before power-on | Intune | Device runs standard macOS setup; does not appear in Intune Devices | [TBD - Phase 24] |
| Wrong MDM server selected for device | ABM | Device enrolls to wrong Intune tenant/profile | [TBD - Phase 24] |
| Expired ADE token not renewed | Intune | New ABM-assigned devices stop appearing in Intune; existing enrolled devices unaffected | [TBD - Phase 24] |
| Device not released by previous organization | ABM | Device cannot be assigned to new MDM server | [TBD - Phase 24] |

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| ADE token (.p7m) | Annual (365 days) | New devices assigned in ABM stop appearing in Intune; existing enrolled devices unaffected | Download new token from ABM > upload to Intune at Devices > Enrollment > Apple > Enrollment program tokens |
| APNs certificate | Annual (365 days) | ALL MDM communication to ALL enrolled macOS and iOS devices stops immediately | Renew at Tenant administration > Connectors and tokens > Apple push notification certificate |
| ABM Terms of Service | On Apple update (ad-hoc) | Apple suspends all syncing until new T&C accepted | Accept in ABM portal; no Intune action needed |

## See Also

- [Enrollment Profile Configuration](02-enrollment-profile.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [macOS Provisioning Glossary](../_glossary-macos.md)
- [Windows vs macOS Concept Comparison](../windows-vs-macos.md)
- [Network Endpoints Reference](../reference/endpoints.md#macos-ade-endpoints)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- ABM configuration with ADE token creation, device assignment, renewal lifecycle | -- |
