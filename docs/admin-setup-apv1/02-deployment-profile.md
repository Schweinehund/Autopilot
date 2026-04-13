---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Deployment Profile Configuration

The Autopilot deployment profile controls how the device behaves during OOBE -- which screens the user sees, what join type is used, and whether pre-provisioning is allowed. Every OOBE setting has downstream consequences documented below.

## Prerequisites

- Intune Administrator role
- At least one device registered in Windows Autopilot (see [Hardware Hash Upload](01-hardware-hash-upload.md))
- For hybrid Entra join: Intune Connector for Active Directory configured (see [Intune Connector](09-intune-connector-ad.md))
- Company branding configured in Entra ID (required if hiding change account options)

## Steps

### Step 1: Create Deployment Profile

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > **Create Profile** > **Windows PC**.
2. Enter a descriptive name (e.g., "APv1-UserDriven-EntraJoin").
3. Set **Convert all targeted devices to Autopilot** to the desired value (see setting 11 below).

### Step 2: Configure OOBE Settings

Configure each setting below. Every setting includes a what-breaks callout documenting what happens if misconfigured.

1. **Deployment mode**: User-Driven or Self-Deploying.

   > **What breaks if misconfigured:** Selecting Self-Deploying greys out most other OOBE settings and removes user affinity. Selecting the wrong mode causes the OOBE flow to not match expectations. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

2. **Join to Microsoft Entra ID as**: Microsoft Entra joined or Hybrid Microsoft Entra joined.

   > **What breaks if misconfigured:** Selecting Hybrid without the Intune Connector for Active Directory installed and active causes the join to fail silently during OOBE. The device hangs or errors with no clear message. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

3. **Microsoft Software License Terms**: Show or Hide.

   > **What breaks if misconfigured:** Show adds a user-facing license acceptance screen. No functional impact but adds an extra step to the user experience.

4. **Privacy settings**: Show or Hide.

   > **What breaks if misconfigured:** Hiding disables location services by default. Apps relying on location services will fail until the user manually enables them in Settings.

5. **Hide change account options**: Show or Hide.

   > **What breaks if misconfigured:** Requires company branding configured in Entra ID. Without branding configured, this setting is silently ignored and the change account option remains visible. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

6. **User account type**: Administrator or Standard User.

   > **What breaks if misconfigured:** Administrator grants local admin rights to the joining user. This may violate your organization's security policy. Standard User is recommended unless local admin is explicitly required.

7. **Allow pre-provisioned deployment**: Yes or No.

   > **What breaks if misconfigured:** Setting to No still allows the technician to press Win+F12 at OOBE, but the deployment fails with error **0x80180005**. Must be Yes for pre-provisioning flow to work. See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

8. **Language (Region)**: Selection from list or Operating system default.

   > **What breaks if misconfigured:** If not configured, the user must select language and region during OOBE. Adds friction but does not cause a failure.

9. **Automatically configure keyboard**: Yes or No.

   > **What breaks if misconfigured:** Requires ethernet connection (Wi-Fi is not supported at this early OOBE stage). If set to Yes without ethernet, keyboard configuration fails silently and the user must configure manually.

10. **Apply device name template**: Yes or No. Supports `%SERIAL%` and `%RAND:x%` macros.

    > **What breaks if misconfigured:** Names must be 15 characters or fewer (NetBIOS limit). Names exceeding 15 characters cause enrollment failure. Only works with Entra join (not hybrid). See: [OOBE Failure](../l1-runbooks/05-oobe-failure.md)

11. **Convert all targeted devices to Autopilot**: Yes or No.

    > **What breaks if misconfigured:** Yes auto-registers all non-Autopilot corporate devices with a 48-hour processing delay. This can cause unexpected device registrations if the profile is assigned to a broad group.

### Step 3: Assign Profile to Device Group

Assign the profile to the dynamic device group created in [Dynamic Groups](04-dynamic-groups.md). Avoid assigning to "All Devices" -- exclusions are not supported and causes assignment conflicts when multiple profiles target the same device.

> **Profile conflict resolution:** When multiple profiles target the same device, the **oldest created profile wins** (not most specific, not highest priority). Audit profile creation dates when troubleshooting unexpected profile assignment. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

### Step 4: Verify Profile Assignment

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Devices**.
2. Check **Profile Status** progression: Unassigned > Assigning > Assigned.
3. Verify the **Date assigned** field is populated before imaging the device.

## Verification

- [ ] Profile appears in Deployment Profiles list with correct settings
- [ ] Profile assigned to the correct device group (not "All Devices")
- [ ] At least one device shows Profile Status = "Assigned"
- [ ] Date assigned field is populated on target devices
- [ ] If hybrid join: Intune Connector shows Active status

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Wrong deployment mode selected | OOBE flow doesn't match expectations | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Hybrid join without Intune Connector | Join fails silently during OOBE | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| "Allow pre-provisioned deployment" = No | Win+F12 triggers error 0x80180005 | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| Device name template > 15 characters | Enrollment fails with naming error | [OOBE Failure](../l1-runbooks/05-oobe-failure.md) |
| "All Devices" profile + targeted profiles | Oldest profile wins; unexpected settings applied | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Convert all devices = Yes on broad group | Unexpected device registrations after 48-hour delay | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |

## See Also

- [Profile Assignment Lifecycle Stage](../lifecycle/02-profile-assignment.md)
- [Dynamic Device Groups](04-dynamic-groups.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Enrollment Status Page Policy](03-esp-policy.md)*
