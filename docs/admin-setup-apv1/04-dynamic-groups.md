---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Dynamic Device Groups for Autopilot

Dynamic device groups in Entra ID automatically collect Autopilot-registered devices based on membership rules. These groups are used to target deployment profiles, ESP policies, and app assignments. Without a correctly configured group, no profile can be assigned to devices.

## Prerequisites

- Global Administrator or Groups Administrator role in Entra ID
- **Azure AD Premium P1 or P2 license** -- required for dynamic group membership. Without it, dynamic membership rules silently do not evaluate.
- At least one device registered in Windows Autopilot (see [Hardware Hash Upload](01-hardware-hash-upload.md))

## Steps

### Step 1: Create Dynamic Device Group

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > **New group**.
2. Configure:
   - Group type: **Security**
   - Membership type: **Dynamic Device**
3. Select **Add dynamic query**.

**ZTDId membership rule** (matches ALL Autopilot devices in the tenant):

```
(device.devicePhysicalIDs -any (_ -startsWith "[ZTDid]"))
```

> **What breaks if misconfigured:** Using the wrong attribute name or syntax results in an empty group. Admin sees 0 members. End user sees standard Windows OOBE instead of Autopilot. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

### Step 2: Group Tag Targeting (Optional)

To target a subset of Autopilot devices by group tag:

```
(device.devicePhysicalIds -any (_ -eq "[OrderID]:YOUR_GROUP_TAG"))
```

Replace `YOUR_GROUP_TAG` with the actual tag value assigned during hardware hash import.

> **What breaks if misconfigured:** Group tag matching is **case-sensitive** and must match exactly. A mismatched tag means the device is not in the group, so no profile is assigned. Admin sees device registered but group has 0 members for that tag. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

### Step 3: Wait for Group Evaluation

> [!IMPORTANT]
> **Sync Delay Expectations**
>
> - Simple rules in small tenants: **5-15 minutes**
> - Complex rules or large tenants (10,000+ devices): **up to 24 hours** for initial evaluation
> - **Do NOT power on devices for imaging until group membership is confirmed.** A device reaching OOBE before the group evaluates means no Autopilot profile -- standard Windows setup runs instead.

> **What breaks if misconfigured:** Admin sees device registered in Autopilot but the dynamic group shows 0 members. End user powers on and sees standard Windows OOBE instead of the Autopilot experience. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

### Step 4: Verify Group Membership

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > [group name] > **Members**.
2. Confirm target devices appear as members.
3. Cross-check in **Intune admin center** > **Devices** > **Windows** > **Windows Autopilot** > **Devices** -- Profile Status should show "Assigning" or "Assigned" for devices in the group.

> **What breaks if misconfigured:** Multiple profiles targeting the same device via different groups: the **oldest created profile wins** (not most specific, not highest priority). Audit profile creation dates when troubleshooting unexpected assignments. Avoid a broad "All Autopilot Devices" profile if targeted profiles also exist. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

## Verification

- [ ] Dynamic device group exists with correct membership rule
- [ ] Group shows expected devices as members (may take 5-15 minutes)
- [ ] Profile Status on target devices shows "Assigning" or "Assigned"
- [ ] No conflicting broad profiles exist (check Deployment Profiles list for "All Devices" assignments)

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Wrong ZTDId membership rule syntax | Group has 0 members; no profile assigned | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Azure AD Premium license missing | Dynamic membership silently does not evaluate | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Device imaged before group evaluates | Standard OOBE runs instead of Autopilot | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Group tag case mismatch | Device not in targeted group; no profile assigned | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Broad "All Devices" profile conflicts with targeted profile | Oldest profile wins; unexpected settings applied | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |

## See Also

- [Profile Assignment Lifecycle Stage](../lifecycle/02-profile-assignment.md)
- [Deployment Profile Configuration](02-deployment-profile.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [Deployment Modes Overview](05-deployment-modes-overview.md)*
