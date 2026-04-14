---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
platform: Windows
---

# Device Operations

Post-enrollment device management operations for Windows Autopilot-managed devices. For the initial deployment pipeline (hardware hash through ESP to desktop), see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md).

## Operations

1. [Autopilot Reset](01-autopilot-reset.md) — Return a device to a business-ready state without re-imaging. Removes personal files and re-applies org configuration. APv1 only.

2. [Retire, Wipe, and Removal Actions](02-retire-wipe.md) — Choose the right action based on what you want to preserve. Covers all five Intune device actions: Autopilot Reset, Retire, Wipe, Fresh Start, and Delete.

3. [Re-Provisioning](03-re-provisioning.md) — Transfer device ownership to a new user, re-enroll after a reset, or refresh a device for continued corporate use. Includes prerequisite checklist and scenario walkthroughs.

4. [Tenant Migration](04-tenant-migration.md) — Move devices between Microsoft 365 tenants. Online and offline migration methods with batch size limits and critical sequencing warnings.

## Not Sure Which Action to Use?

[Device Lifecycle Decision Tree](../decision-trees/05-device-lifecycle.md) — Routes you to the correct action based on what you want to preserve. Three decision steps or fewer.

---

## See Also

- [Autopilot Lifecycle Overview](../lifecycle/00-overview.md) — The 5-stage deployment pipeline (hardware hash through post-enrollment verification)
- [Stage 5: Post-Enrollment Verification](../lifecycle/05-post-enrollment.md) — What comes before device operations begin

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Initial version |
