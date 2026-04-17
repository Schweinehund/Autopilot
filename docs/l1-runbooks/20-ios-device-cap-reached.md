---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
<!-- applies_to: all — device-cap exhaustion applies to any non-DEM-account enrollment (ADE, Company Portal, User Enrollment all count toward per-user cap) per D-25 Claude's discretion / research A3 recommendation -->

> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS Device Cap Reached

Use this runbook when an iOS/iPadOS user reports `DeviceCapReached` or the misleading `"Company Portal Temporarily Unavailable"` error during enrollment, AND the user already has other enrolled devices. This runbook covers **per-user device limit exhaustion**. For **tenant-level configuration blocks** (platform / ownership / enrollment-type blocking — "Invalid Profile" error), use [runbook 18](18-ios-enrollment-restriction-blocking.md) instead.

Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR5 "'Device limit reached' or 'Too many devices'" branch. The triage tree also routes "Company Portal Temporarily Unavailable" here first per Microsoft Learn documented dual-meaning.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with read permissions to **Enrollment restrictions**, **Devices**, and **Users**.
- User UPN — ask the user or retrieve from the help desk ticket.
- Device serial number — ask the user to go to **Settings** > **General** > **About** > **Serial Number**.
- Knowledge of approximately how many devices the user has enrolled (ask the user upfront — this sets expectations for the triage steps below).
- Confirm the enrollment attempt was recent (within the last 24 hours) to rule out stale error caching in Company Portal.

## Symptom

- **Primary user-visible error:** `DeviceCapReached` with message: `"Too many mobile devices are enrolled already."` — verbatim from Microsoft Learn troubleshoot-ios-enrollment-errors.
- **Alternate misleading error (Microsoft Learn documented):** `"Company Portal Temporarily Unavailable"` — Microsoft Learn explicitly documents this message can also mean device cap exhaustion, not an actual Company Portal outage. Treat this alternate error as a device-cap candidate first before assuming Company Portal is actually down.
- **Intune portal surface:** User's enrolled device count in **Users** > **All users** > **[user]** > **Devices** (P-07) equals or exceeds the limit set in **Devices** > **Device onboarding** > **Enrollment** > **Device limit restriction** (P-06). Default limit is 5; configurable 1–15 per group.
- **Intune enrollment count surface:** The user's enrolled device count is visible to L1 at P-07 (**Users** > **All users** > **[user]** > **Devices**) — this is the definitive source for confirming cap exhaustion before building the escalation packet.
- **Disambiguation from runbook 18:** If the user saw `"Invalid Profile"` or `"Can't be managed"` (no mention of device count or limit) — use [runbook 18](18-ios-enrollment-restriction-blocking.md) instead.

## L1 Triage Steps

1. > **Say to the user:** "We're checking your device registration — your admin is being notified. Please keep your device powered on and connected to Wi-Fi."

2. Navigate to **Devices** > **Device onboarding** > **Enrollment** > **Device limit restriction** (primary path P-06; fallback: **Devices** > **Enrollment restrictions** > **Device limit restrictions** — both paths reach the same blade). Record the device limit applicable to this user (default 5; check if a per-group limit overrides the default).

   > Portal navigation may vary by Intune admin center version. See [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md) for details.

3. Navigate to **Users** > **All users** > **[user]** > **Devices** (P-07). Count enrolled devices for this user. For each device, record: device name, platform, enrollment date, last-contact date, ownership type.

4. Identify stale or abandoned device records — devices with **Last contacted** date older than 90 days are candidates for retirement.

5. Compare the count from step 3 to the limit from step 2. Confirm count ≥ limit (this is the expected failure mode).

## Admin Action Required

L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to (choose one):**
1. **Remove stale device records** for the user — retire devices in **Devices** > **All devices** > **[device]** > **Retire** that have Last contacted older than 90 days and are confirmed no longer in use. Microsoft Learn recommends this as the primary fix to avoid cap issues **[CITED: learn.microsoft.com/troubleshoot/mem/intune/device-enrollment/troubleshoot-device-enrollment-in-intune § "To avoid hitting device caps"]**.
2. **Increase the device limit** for the user's group via **Devices** > **Device onboarding** > **Enrollment** > **Device limit restriction** (P-06). Acceptable when the user legitimately needs more devices (for example, a tester with multiple test devices). Maximum limit is 15 per user.

**Verify:**
- User retries enrollment. Device enrolls and appears in **Devices** > **All devices** > **iOS/iPadOS** (P-04) under the user's Devices view. Count at P-07 is now below the limit.

**Optional L1 write-action (per D-08 extension):** After stale-device retire is complete, L1 may perform a manual ADE token sync via **Devices** > **Device onboarding** > **Enrollment** > **Apple** (tab) > **Enrollment program tokens** > **[token]** > **Sync** (P-03) to accelerate cap-clear propagation. This is identical in scope to [runbook 17's manual sync](17-ios-ade-not-starting.md) — a read-retry of an existing configuration, not a write to enrollment state.

**If the admin confirms the user legitimately needs more than 15 devices:**
- Proceed to [Escalation Criteria](#escalation-criteria) — the device-limit maximum is 15 per user. Users who need more than 15 devices require a Device Enrollment Manager (DEM) account (DEM users bypass the cap but cannot use Conditional Access).

## Escalation Criteria

Escalate to Intune Admin / L2 if:

- User needs more than 15 devices enrolled — this is the hard platform cap; a Device Enrollment Manager (DEM) account is required.
- Admin removes stale devices and adjusts the limit, but enrollment still fails — the device cap was not the actual cause; consider [runbook 18](18-ios-enrollment-restriction-blocking.md) for config-block scenarios.
- User cannot identify which of their enrolled devices are stale or no longer in use.
- L1 cannot access the enrollment restrictions or Users > Devices blade (insufficient portal permissions).

**Before escalating, collect:**

- User UPN
- Current enrolled device count (P-07 screenshot)
- Current device limit (P-06 screenshot)
- List of stale devices considered for retirement (device name, last-contact date, ownership)
- User-visible error string (`DeviceCapReached` vs "Company Portal Temporarily Unavailable" — record which one)
- Device serial number (Settings > General > About > Serial Number)
- Description of steps already attempted

See [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) — the token/enrollment-profile diagnostic surfaces device cap state. For device retire action documentation, see [Microsoft Learn — Retire devices](https://learn.microsoft.com/intune/remote-actions/devices-wipe).

---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

## Related Resources

- [Runbook 18: Enrollment Restriction Blocking](18-ios-enrollment-restriction-blocking.md) — For enrollment failures that are NOT device-limit-related (platform, ownership, or enrollment-type blocking with "Invalid Profile" errors). This runbook (20) covers QUOTA EXHAUSTION; runbook 18 covers CONFIG BLOCKS.
- [iOS Admin Setup Overview § Intune Enrollment Restrictions](../admin-setup-ios/00-overview.md#intune-enrollment-restrictions) — Enrollment restriction and device-limit configuration reference.
- [ABM/ADE Token Guide](../admin-setup-ios/02-abm-token.md) — Where device cap intersects with ADE device assignment.
- [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) — iOS/iPadOS failure routing.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Resolved Phase 31 L2 cross-references | -- |
| 2026-04-17 | Initial version | -- |
