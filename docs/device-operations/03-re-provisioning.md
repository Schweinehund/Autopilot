---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
platform: Windows
---

> **Version gate:** This guide covers device re-provisioning for both APv1 (Windows Autopilot) and APv2 (Device Preparation). Framework-specific requirements are noted inline. For framework identification, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Device Re-Provisioning: Ownership Transfer and Re-Enrollment

Re-provisioning covers the process of reassigning a device from one user to another, refreshing a device for continued corporate use, or re-enrolling a device that has been wiped or retired. The steps vary based on whether the device stays in the same org, whether the hardware has changed, and whether you are using APv1 or APv2.

## Prerequisites Checklist

Before beginning re-provisioning, verify all items below. Missing any of these is the most common cause of re-provisioning failure.

- [ ] Old user's Entra account is no longer the primary user on the device (Intune admin center > Devices > All devices > device > Properties > Primary user)
- [ ] Device removed from old user's group membership, if the user's group was used for Autopilot profile targeting (Entra ID > Groups > group > Members)
- [ ] Autopilot profile assigned to the correct group for the new user's context (Intune admin center > Devices > Enrollment > Windows Autopilot > Autopilot deployment profiles)
- [ ] Device limit per user not exceeded for the new user (Entra ID > Devices > Device settings — check "Maximum number of devices per user")
- [ ] For APv1: hardware hash is still current — no hardware changes since last import (motherboard replacement invalidates the hash)
- [ ] For APv2: device meets Windows 11 22H2+ requirement; APv2 policy assigned to the correct security group
- [ ] If device was Retired (not Wiped): org data removal confirmed before handing to new user

> **L1 Action:** Before re-provisioning, confirm the new user's department and location — this determines which Autopilot profile and app assignments apply. Escalate to L2 if the device is hybrid Entra joined.

---

## Re-Provisioning Scenarios

### Scenario A: Same-Org Ownership Transfer (Same Tenant)

Use this when a device assigned to a departing employee is being reassigned to a new employee in the same organization.

**Recommended path (APv1 devices):**

1. **Retire** the device (removes org data, preserves device record). See [Retire, Wipe, and Removal Actions](02-retire-wipe.md).

   If a clean slate is required (no user data carryover), use **Autopilot Reset** instead of Retire — this re-applies org configuration while keeping MDM enrollment intact. See [Autopilot Reset](01-autopilot-reset.md).

2. In Intune admin center, navigate to **Devices** > **All devices** > select device > **Properties**.
   - Clear the **Primary user** field — click the X next to the current user.

3. Verify the device is in the correct Entra group for the new user's Autopilot profile assignment. Add to the new group if needed.

4. Assign the device to the new user:
   - Intune admin center > Devices > All devices > device > Properties > **Primary user** > Select new user.

5. Instruct the new user to sign in. Their profile is created on first sign-in. Apps and policies assigned to the user re-apply automatically.

**Recommended path (APv2 devices):**

1. **Wipe** the device (factory reset — APv2 does not support Autopilot Reset).

2. Verify the APv2 policy is assigned to the security group that includes the new user or device.

3. The device re-enrolls automatically on next boot if the wipe was performed with "keep enrollment state" selected.

4. New user signs in. APv2 applies assigned apps and configuration after sign-in.

---

### Scenario B: Device Refresh (Same User, New Hardware or Clean OS)

Use this when replacing hardware or reinstalling a clean OS for the same user, without changing ownership.

1. If retiring the old hardware:
   - **Delete** the old device record in Intune (removes MDM record).
   - **Delete** the Autopilot registration (Devices > Enrollment > Windows Autopilot devices > find by serial > Delete).

2. For APv1: import the hardware hash of the new device. See [APv1 hardware hash upload guide](../admin-setup-apv1/01-hardware-hash-upload.md).

   For APv2: no hardware hash import required — enroll the device directly.

3. Assign the Autopilot profile (APv1) or APv2 policy to the group containing the new device.

4. User signs in at OOBE (APv1) or post-OOBE (APv2). Their assigned apps and policies apply automatically.

---

### Scenario C: Device Return for Re-Imaging or Decommission

Use this when a device is being returned and will not be reassigned (end-of-life, damaged, or going back to OEM).

1. **Wipe** the device (factory reset).
2. **Delete** the Intune device record.
3. **Delete** the Autopilot registration (to prevent phantom records and billing confusion).
4. Physically label and quarantine the device per your organization's asset disposal process.

---

## Re-Enrollment After Reset

After a Wipe (without enrollment state retention), the device must go through full enrollment again:

1. Device boots to OOBE.
2. User or technician completes OOBE sign-in (APv1: sign in with corporate Entra account to trigger Autopilot profile download; APv2: sign in, profile applies automatically).
3. ESP runs (APv1 only). Apps and policies install per the assigned profile.
4. User arrives at desktop — enrollment is complete.

If OOBE does not trigger Autopilot:
- Verify the hardware hash is imported (APv1) or the APv2 policy is assigned to a group containing the device or user.
- Verify the device is not blocked by a Conditional Access policy requiring compliance before enrollment. See [Conditional Access Enrollment Timing](../reference/conditional-access-enrollment.md) (WSEC-01).

---

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Old user still in primary user field | New user receives wrong app assignments (user-targeted apps based on old user) | Clear primary user field in Intune device properties before new user signs in |
| Device in wrong Entra group | Correct Autopilot profile not assigned; device gets wrong configuration | Add device to correct group; allow up to 15 minutes for profile re-assignment |
| Hardware hash stale after motherboard replacement (APv1) | OOBE does not show Autopilot experience; device treats as new unregistered device | Re-collect and re-import hardware hash for the new motherboard |
| Device limit per user exceeded | New user cannot enroll the device | Increase device limit in Entra ID or remove stale device records for the new user |
| APv2 policy not assigned to group | APv2 OOBE completes without policy applying | Verify policy assignment in Intune admin center > Devices > Enrollment > Device preparation policies |

---

## See Also

- [Autopilot Reset](01-autopilot-reset.md) — Re-provision without full wipe (APv1 only)
- [Retire, Wipe, and Removal Actions](02-retire-wipe.md) — Wipe and retire procedures
- [Dynamic Group Configuration](../admin-setup-apv1/04-dynamic-groups.md) — Ensure devices land in the right group for profile assignment

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Initial version |
