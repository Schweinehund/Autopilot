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

Dynamic device groups in Microsoft Entra ID automatically include devices that match a membership rule. For Windows Autopilot, dynamic groups determine which deployment profile a device receives. Correct group configuration — and understanding sync delays — is critical before any device reaches OOBE.

## Prerequisites

- **Global Administrator** or **Groups Administrator** role in Entra ID (required to create groups)
- **Azure AD Premium P1 or P2** license assigned to the tenant — dynamic group membership is a Premium feature and will not work without this license even if the group is created successfully
- At least one device registered in Windows Autopilot (to verify group membership after creation)
- Deployment profile created and ready to assign (see [Deployment Profile](02-deployment-profile.md))

## Steps

### Step 1: Create a dynamic device group

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > **New group**.
2. Set **Group type**: **Security**.
3. Set **Membership type**: **Dynamic Device**.
4. Select **Add dynamic query**.

   **ZTDId membership rule** — matches ALL Autopilot-registered devices in the tenant:
   ```
   (device.devicePhysicalIDs -any (_ -startsWith "[ZTDid]"))
   ```

   > **What breaks if misconfigured:** **Admin sees:** Group shows 0 members despite devices being registered in Autopilot. No validation error is shown — the rule is syntactically valid but matches nothing.
   > **End user sees:** Standard Windows OOBE instead of Autopilot-branded setup — device reached OOBE before receiving a profile.
   > **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

   Note: The attribute name `devicePhysicalIDs` uses capital I, D, S at the end. Both `devicePhysicalIDs` and `devicePhysicalIds` are accepted by the portal, but use the canonical form above to avoid confusion. The rule value `[ZTDid]` is case-sensitive — do not alter the capitalization.

5. Select **Save** to confirm the dynamic query, then complete group creation.

### Step 2: (Optional) Target a subset of devices by group tag

If you assign group tags during hardware hash import to differentiate device batches, use the following rule instead of the ZTDId rule:

```
(device.devicePhysicalIds -any (_ -eq "[OrderID]:YOUR_GROUP_TAG"))
```

Replace `YOUR_GROUP_TAG` with the exact tag value assigned during import (for example, `[OrderID]:Sales-EMEA`).

> **What breaks if misconfigured:** **Admin sees:** Group shows 0 members even though devices with that tag are registered.
> **End user sees:** Standard OOBE — no Autopilot profile received.
> **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

Tag values are **case-sensitive** and must match the value set at import time exactly. A tag of `Sales-EMEA` will not match `sales-emea` or `Sales-emea`.

### Step 3: Wait for dynamic group evaluation

Dynamic group membership is evaluated asynchronously after group creation. It is not immediate.

> **Sync delay expectations:**
> - Simple rules in small tenants: **5–15 minutes**
> - Complex rules or large tenants (10,000+ devices): **up to 24 hours** for initial evaluation
>
> **Do NOT power on devices until group membership is confirmed.** A device that reaches OOBE before the group evaluates will not receive an Autopilot profile. It will run standard Windows setup instead. The device can be re-registered and re-provisioned, but the deployment must be retried from scratch.

> **What breaks if misconfigured:** **Admin sees:** Device shows as registered in Intune Autopilot > Devices with Profile Status "Unassigned" or "Assigning" at the time the device boots.
> **End user sees:** Standard Windows OOBE — no Autopilot branding or enrollment.
> **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

### Step 4: Verify group membership and profile assignment status

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > select your group > **Members**.
2. Confirm that the target devices appear in the member list.
3. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Devices**.
4. Search for a target device by serial number. Confirm **Profile Status** shows **Assigning** or **Assigned**.

> **Profile conflict resolution:** When a device belongs to multiple groups and each group has a different deployment profile assigned, **the oldest-created profile wins** — not the most recently created, not the most specific, not the highest priority. This is unique to APv1 deployment profiles.
>
> Audit profile creation dates in Intune admin center > Deployment Profiles if a device receives an unexpected profile. Avoid creating a broad "All Autopilot Devices" profile if targeted profiles exist — the broad profile may win based on creation date.
>
> **Runbook:** [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)

## Verification

- [ ] Dynamic device group exists in Entra ID with correct membership type and rule
- [ ] Group member list shows expected devices (allow 5–15 minutes for evaluation)
- [ ] Profile Status for target devices in Intune shows **Assigning** or **Assigned**
- [ ] No broad "All Autopilot Devices" profile exists that might conflict with targeted profiles (check creation dates if multiple profiles are assigned to overlapping groups)

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Wrong membership rule attribute name or value | Group shows 0 members; device receives no profile | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Azure AD Premium P1/P2 license not assigned to tenant | Dynamic membership does not evaluate; group always shows 0 members; no error shown | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Group tag value case mismatch (e.g., `Sales-EMEA` vs `sales-emea`) | Group shows 0 members for tag-targeted group; device receives no profile or receives a different profile | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Device imaged before dynamic group evaluates | Standard Windows OOBE instead of Autopilot experience; no profile received during setup | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |
| Conflicting profiles — broad "All Autopilot Devices" profile wins on creation date | Device receives wrong deployment mode or incorrect settings; no error shown | [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md) |

## See Also

- [Deployment Profile](02-deployment-profile.md) — configure the profile assigned to this group
- [Profile Assignment lifecycle stage](../lifecycle/02-profile-assignment.md) — how profile assignment works end-to-end
- [Deployment Modes Overview](05-deployment-modes-overview.md) — select the right mode for your scenario
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework comparison and selection guide

---

*Next step: [Deployment Modes Overview](05-deployment-modes-overview.md)*
