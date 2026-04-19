---
last_verified: 2026-04-18
review_by: 2026-07-17
applies_to: ADE
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS ADE token configuration via Apple Business Manager and Intune.
> For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# ABM/ADE Token Configuration for iOS/iPadOS

The ADE token links Apple Business Manager to Microsoft Intune, enabling device syncing and enrollment profile assignment for iOS/iPadOS devices. The steps are structurally identical to the macOS ABM token configuration — this guide cross-references the macOS guide for shared portal steps and documents only iOS-specific differences inline. Apple School Manager (ASM) is functionally identical to ABM for MDM purposes; follow the same steps if your organization uses ASM.

## Prerequisites

- APNs certificate configured and active (see [APNs Certificate Guide](01-apns-certificate.md))
- Intune Administrator role in Microsoft Intune admin center
- Device Manager or Administrator role in Apple Business Manager
- Managed Apple ID (NOT personal Apple ID)
- Microsoft Intune Plan 1 (or higher) subscription
- Apple Business Manager account with verified organization

> **What breaks if misconfigured:** Using a personal Apple ID means the ADE token cannot be renewed if that employee leaves. New device syncing stops when the token expires (365 days). Existing enrolled devices are unaffected. Symptom appears in: ABM (cannot log in to renew token) and Intune admin center (new devices stop appearing after token expiry).

## How iOS ADE Token Setup Differs from macOS

The four-step ADE token creation process is the same for iOS/iPadOS and macOS. This guide cross-references the [macOS ABM Configuration Guide](../admin-setup-macos/01-abm-configuration.md) for shared portal steps and documents only iOS-specific differences.

| Aspect | macOS | iOS/iPadOS |
|--------|-------|------------|
| Device type filter in ABM | Mac | iPhone, iPad |
| Platform selection in Intune | macOS | iOS/iPadOS |
| Delta sync interval | Every 24 hours | Every 12 hours |
| Device lookup | Serial number only | Serial number or IMEI |

## Steps

### Step 1: Download the Intune public key certificate

The Intune public key certificate is used to establish trust between Intune and Apple Business Manager. Follow [ABM Configuration: Step 1 — Download Intune Public Key](../admin-setup-macos/01-abm-configuration.md#step-1-download-intune-public-key) in the macOS ABM guide.

**iOS-specific difference:** None. The public key download process is identical for iOS/iPadOS and macOS.

### Step 2: Create MDM server and download server token in ABM

The MDM server in ABM represents your Intune tenant. Creating the server and downloading the token establishes the enrollment program link. Follow [ABM Configuration: Step 2 — Create MDM Server and Download Server Token](../admin-setup-macos/01-abm-configuration.md#step-2-create-mdm-server-and-download-server-token) in the macOS ABM guide.

**iOS-specific difference:** If your organization uses separate MDM servers for macOS and iOS/iPadOS, use a descriptive name that identifies the platform (e.g., "Intune Production — iOS/iPadOS").

### Step 3: Upload server token to Intune

Upload the .p7m server token downloaded from ABM to Intune. Follow [ABM Configuration: Step 3 — Upload Server Token to Intune](../admin-setup-macos/01-abm-configuration.md#step-3-upload-server-token-to-intune) in the macOS ABM guide.

**iOS-specific difference:** When creating the token in Intune, select **iOS/iPadOS** as the platform. This determines which device types sync through this token.

### Step 4: Assign devices to MDM server in ABM

Assign iOS/iPadOS devices to the MDM server so they are synced to Intune. Follow [ABM Configuration: Step 4 — Assign Devices to MDM Server](../admin-setup-macos/01-abm-configuration.md#step-4-assign-devices-to-mdm-server) in the macOS ABM guide.

**iOS-specific difference:** When filtering devices in ABM, filter by device type **iPhone** or **iPad** to locate iOS/iPadOS devices. iOS devices can also be looked up by IMEI in addition to serial number.

> **What breaks if misconfigured:** Device must be assigned to the MDM server BEFORE first power-on. If powered on without assignment, the device proceeds through non-managed Setup Assistant and requires a factory reset to fix. Symptom appears in: the device (standard iOS setup, no MDM enrollment).

## Token Sync Mechanics

| Sync Type | Interval | Notes |
|-----------|----------|-------|
| Automatic (delta) | Every 12 hours | Picks up newly assigned devices; faster than macOS (24h) |
| Manual (on-demand) | Rate-limited to once per 15 minutes | Triggered from Intune admin center |
| Full sync | Every 7 days | Re-fetches entire device list from ABM |

## Token Limits

| Limit | Value |
|-------|-------|
| Maximum enrollment profiles per token | 1,000 |
| Maximum ADE devices per profile | 200,000 |
| Maximum ADE tokens per Intune tenant | 3,000 |

## Verification

- [ ] ADE token shows "Active" status in Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens
- [ ] Token expiration date is visible (should be ~365 days from creation)
- [ ] Apple ID matches the Managed Apple ID used in ABM
- [ ] Platform shows iOS/iPadOS (not macOS)
- [ ] At least one iOS/iPadOS device appears after sync (if devices were assigned in ABM)

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Personal Apple ID used for token creation | ABM | Token cannot be renewed after employee departure; new devices stop syncing | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| Device not assigned before first power-on | ABM | Device runs standard iOS setup; does not enroll in MDM | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| Wrong MDM server selected for device | ABM | Device enrolls to wrong Intune tenant or profile | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| Expired token not renewed | Intune | New ABM-assigned devices stop appearing in Intune; existing enrolled devices unaffected | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |
| Wrong platform selected (macOS instead of iOS) | Intune | iOS/iPadOS devices do not sync through this token | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) |

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| ADE token (.p7m) | Annual (365 days) | New devices assigned in ABM stop appearing in Intune; existing enrolled devices unaffected | Download new token from ABM > upload to Intune at Devices > Enrollment > Apple > Enrollment program tokens |
| ABM Terms of Service | On Apple update (ad-hoc) | Apple suspends all syncing until new T&C accepted | Accept in ABM portal; no Intune action needed |

## See Also

- [APNs Certificate](01-apns-certificate.md)
- [ADE Enrollment Profile](03-ade-enrollment-profile.md)
- [macOS ABM Configuration](../admin-setup-macos/01-abm-configuration.md)
- [iOS/iPadOS Admin Setup Overview](00-overview.md)
- [iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)
- [Apple Provisioning Glossary](../_glossary-macos.md)

---
*Next step: [ADE Enrollment Profile](03-ade-enrollment-profile.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |
| 2026-04-16 | Initial version -- ABM/ADE token guide with macOS cross-references and iOS-specific differences | -- |
