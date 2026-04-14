---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers migration from Windows Autopilot (classic/APv1) to Autopilot Device Preparation (APv2). This is a coexistence model, not a one-shot cutover. For feature differences, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv1-to-APv2 Migration: Parallel Deployment Playbook

Both Autopilot frameworks can run in the same tenant simultaneously, targeting different device populations. This guide structures the migration as an ongoing coexistence state — APv1 and APv2 operate in parallel for weeks or months while devices are migrated by category. There is no hard cutover.

## Migration Prerequisites

### Source Environment

- Existing APv1 deployment with known profile assignments
- Inventory of which device groups use which APv1 profiles
- Documented list of features in use (pre-provisioning, self-deploying, hybrid join) for blocker assessment — see [APv1-to-APv2 Readiness Checklist](#apv1-to-apv2-readiness-checklist) below

### Target Environment

- Windows 11 22H2 or later on all target devices
- Enrollment Time Grouping security group created in Entra ID
- APv2 deployment policy created and tested with at least one pilot device

## APv1-to-APv2 Readiness Checklist

Each item below must be checked before moving a device category to APv2. An unchecked item is a **blocker** — that device category stays on APv1.

- [ ] All target devices running Windows 11 22H2 or later
- [ ] No requirement for hybrid Entra join on target devices (APv2 does not support hybrid join)
- [ ] No requirement for pre-provisioning / white glove on target devices (APv2 does not support pre-provisioning)
- [ ] No requirement for self-deploying mode for kiosks on target devices (APv2 does not support self-deploying)
- [ ] Maximum 25 apps during deployment is acceptable (APv2 limit vs APv1's 100 app limit)
- [ ] Hardware hash pre-staging NOT required for target devices (APv2 benefit — uses corporate identifiers instead)
- [ ] Enrollment Time Grouping security group created and configured in APv2 policy
- [ ] Existing APv1 hardware hash registration will be removed OR APv1 profile will be removed from the device group before APv2 policy is assigned

## Feature Gap Matrix

For the full feature comparison, see [APv1 vs APv2 Feature Comparison](../apv1-vs-apv2.md#feature-comparison). The table below adds a migration blocker assessment column.

| Feature | APv1 | APv2 | Migration Blocker? |
|---------|------|------|--------------------|
| Hybrid Entra join | Yes | No | **YES** — devices requiring hybrid join MUST stay on APv1 |
| Pre-provisioning (white glove) | Yes | No | **YES** — if technician pre-staging workflow is required |
| Self-deploying mode | Yes | No | **YES** — kiosk/shared devices using self-deploying must stay on APv1 |
| Windows 10 support | Yes | No | **YES** — Windows 10 devices must stay on APv1 |
| Max apps during deployment | 100 | 25 | **MAYBE** — only a blocker if more than 25 apps are Required during deployment |
| Hardware hash pre-staging | Required | Not required | **NO** — APv2 is easier here; no pre-registration needed |
| Near real-time monitoring | No | Yes | **NO** — APv2 is better |
| Enrollment Time Grouping | No | Yes | **NO** — APv2 benefit |
| Autopilot Reset support | Yes | No | **MAYBE** — only a blocker if Autopilot Reset is used for re-provisioning |

## Steps: Coexistence Migration Model

Migration proceeds by device category, not all-at-once. APv1 continues operating for devices that cannot migrate.

### Step 1: Identify device categories for migration

Categorize the existing fleet by APv2 compatibility using the Readiness Checklist above. Example categories:

| Category | APv2 Compatible? | Migration Wave |
|----------|-----------------|----------------|
| New purchases (Win11 22H2+, cloud-only) | Yes | Wave 1 — migrate first |
| Existing Win11 22H2+ cloud-only devices | Yes | Wave 2 |
| Hybrid Entra join devices | No | Stay APv1 indefinitely |
| Windows 10 devices | No | Stay APv1 or refresh hardware |
| Kiosk/shared devices (self-deploying) | No | Stay APv1 indefinitely |
| Devices requiring pre-provisioning | No | Stay APv1 until APv2 adds support |

> **What breaks if sequenced incorrectly:** Migrating hybrid-join devices to APv2 fails silently. The device enrolls but never completes the hybrid join. The admin discovers this weeks later when Conditional Access blocks access because the device is not hybrid joined. Always complete the blocker assessment before migrating any device category.

### Step 2: Create APv2 deployment policy for pilot group

1. Navigate to **Intune admin center** > Devices > Enrollment > Windows > Autopilot device preparation.
2. Select **Create**.
3. Configure the policy to target the Enrollment Time Grouping security group.
4. Add required apps (maximum 25 for ESP tracking), configure user affinity, and set device naming.
5. Save and assign to a pilot group of 5–10 devices.

### Step 3: Remove APv1 registration for pilot devices

When both an APv1 profile and an APv2 policy apply to a device, APv1 silently wins. You must remove the APv1 registration or profile assignment before APv2 can take effect.

> **What breaks if sequenced incorrectly:** Admin assigns APv2 policy but forgets to remove APv1 registration. The device uses APv1 silently. The admin believes APv2 is working, but it never activates. Discovery happens when APv2-specific features (near real-time monitoring, Enrollment Time Grouping) do not appear in reports.

Choose one of the following approaches:

**Option A — Remove APv1 hardware hash registration:**
1. Navigate to **Intune admin center** > Devices > Windows enrollment > Devices.
2. Search for the pilot device by serial number.
3. Select the device and choose **Delete**.

**Option B — Remove device from APv1 profile's target group:**
1. Navigate to **Intune admin center** > Devices > Enrollment > Windows > Deployment profiles.
2. Open the APv1 profile assigned to the pilot devices.
3. Under Assignments, remove the pilot device group.

> **Admin Note:** Option A permanently removes the hardware hash. If APv2 migration fails and the device needs to fall back to APv1, the hardware hash must be re-collected and re-imported. Option B is reversible — add the device group back to re-activate APv1 if migration fails.

### Step 4: Wipe and re-provision pilot devices with APv2

A factory reset is required. APv2 cannot activate on a device that was previously provisioned with APv1 without a full wipe.

1. Navigate to **Intune admin center** > Devices > All devices.
2. Select the pilot device.
3. Choose **Wipe** and confirm. Wait for wipe completion.
4. The device restarts to OOBE and the APv2 policy applies automatically.

### Step 5: Validate pilot results (30-day soak period)

Verify APv2 enrollment completed successfully:

- [ ] Pilot devices complete APv2 enrollment and reach the desktop
- [ ] Enrollment Time Grouping populates with pilot devices
- [ ] APv2 monitoring dashboard shows deployment status in near real-time
- [ ] Required apps install during enrollment
- [ ] Compliance policies evaluate within 30 minutes of enrollment
- [ ] Remaining APv1 devices are unaffected by the APv2 policy

### Step 6: Expand to next device category

Repeat Steps 3–5 for each subsequent device category. There is no required timeline — migrate each category when operationally ready. APv1 and APv2 continue operating in parallel until all eligible categories have migrated.

## Rollback/Recovery

APv1-to-APv2 rollback is fleet-level, not device-level.

**To stop the migration before a category is moved:**
- Stop removing APv1 hardware hash registrations. New devices continue on APv1 automatically if the APv1 profile targets their group.
- No action is needed for unmigrated categories — they continue using APv1.

**For devices already moved to APv2:**
- There is no per-device "switch back to APv1" button.
- Rollback requires: Wipe device → Re-collect hardware hash → Re-import hash to Intune → Re-assign APv1 profile → User re-provisions via APv1.
- If Option B (group removal) was used in Step 3, re-add the device group to the APv1 profile assignment before wiping — this avoids the need to re-collect the hash.

**Timeline guidance:** Keep APv1 infrastructure (profile assignments, hardware hash imports) active for at least 90 days after the last device category migrates. This preserves the rollback path for newly discovered edge cases.

## Verification

- [ ] Pilot devices complete APv2 enrollment successfully
- [ ] Enrollment Time Grouping populates with enrolled pilot devices
- [ ] APv2 monitoring dashboard shows deployment status
- [ ] Remaining APv1 devices are unaffected by APv2 policy
- [ ] No hybrid-join devices were included in the APv2 migration batch

## Configuration-Caused Failures

| Misconfiguration | Symptom | Resolution |
|------------------|---------|------------|
| APv1 profile still assigned when APv2 policy applied | Device silently uses APv1; APv2 monitoring never shows device | Remove APv1 registration or profile assignment (Step 3) |
| Hybrid-join device migrated to APv2 | Device enrolls but Conditional Access blocks access — hybrid join never completed | Stay APv1 for hybrid-join devices; wipe and re-register hash for rollback |
| Windows 10 device assigned to APv2 policy | Enrollment fails at OOBE; device does not recognize APv2 | APv2 requires Windows 11 22H2+; stay on APv1 or upgrade OS |
| More than 25 Required apps in APv2 deployment | ESP times out; apps beyond 25 not tracked by deployment policy | Reduce Required apps to 25 or fewer; move remaining apps to Available |
| Enrollment Time Grouping group not created | APv2 policy creation fails or devices do not complete enrollment | Create ETG security group in Entra ID before creating APv2 policy |

## See Also

- [APv1 vs APv2 Feature Comparison](../apv1-vs-apv2.md)
- [APv1 Deployment Profile Configuration](../admin-setup-apv1/02-deployment-profile.md)
- [Device Wipe and Retire Operations](../device-operations/02-retire-wipe.md)
