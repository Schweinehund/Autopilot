---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Managed Google Play App Not Installed

L1 runbook for Android devices where an expected Managed Google Play (MGP) app was not delivered to the device. Applies to all GMS Android modes (BYOD, COBO, Dedicated, ZTE); AOSP devices do NOT use MGP and are out of scope for this runbook.

> **L1 scope note:** L1 can VIEW app install status in the Intune admin center (`Apps > All Apps > [app] > Device install status`). L1 does NOT have access to the Managed Google Play console (`play.google.com/work`) — app approval, permission updates, and licensing are admin-only actions in that separate Google-managed portal.

## Symptom

One or more of the following:

- User reports a work app (assigned as Required) is missing from the device's work profile launcher (BYOD) or primary surface (COBO / Dedicated).
- User reports an app shows up in the Managed Google Play store on-device but "won't download" or "won't install."
- App appears in the Managed Google Play store on-device but the install never completes.

Intune admin center `Apps > All Apps > [app] > Device install status` shows one of the following for this device: **Not Installed**, **Failed**, or **Install Pending** for an extended period. [VERIFIED: learn.microsoft.com/en-us/mem/intune/apps/monitor-app-installation-status, last_verified 2026-04-23]

Common ticket phrasings: "the app IT assigned never appeared," "missing app in my work profile," "app shows but won't download," "app keeps saying pending."

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR26 branch.

> **Disambiguation:** If no work apps at all arrived (BYOD) and the device has no work-profile badge on any app, see [Runbook 23: Android Work Profile Not Created](23-android-work-profile-not-created.md) — that is a work-profile-container failure, not an app-delivery failure. This runbook (26) applies when the work profile exists (or the device surface is provisioned on COBO / Dedicated) but a specific assigned app is not installing.

## L1 Triage Steps

L1 Triage Steps are read-only Intune admin center checks. L1 does NOT modify app assignments, sync settings, or access the MGP console.

1. > **Say to the user:** "Let me check the status of that app for your device. If something is holding up the install, I'll coordinate with an administrator to resolve it."

2. Open Intune admin center at `https://intune.microsoft.com`. Sign in with your Help Desk Operator or Read Only Operator role.

3. Navigate to **Apps > All Apps**. Search for the missing app by name. <!-- verify UI at execute time -->

4. If the app is NOT present in the `All Apps` list at all: this indicates an MGP sync or approval issue — skip to [Admin Action Required](#admin-action-required) and note "app not found in All Apps" in the escalation packet.

5. If the app is present: click into the app. Navigate to **Device install status** (under Monitor in the left pane). Filter for the user's device by serial number or UPN. <!-- verify UI at execute time -->

6. Note the exact status label for the device:

   - **Installed** — app is installed on the device. Verify the user is looking in the correct place (work profile launcher for BYOD; primary surface for COBO/Dedicated).
   - **Not Installed** — app was assigned but not yet delivered. Expected during the pending window; check how long the assignment has been in place (see step 7).
   - **Failed** — install attempt failed. Admin investigation required — route to Admin Action Required.
   - **Install Pending** — app is actively being installed. Wait a few minutes and refresh; if status stays "Install Pending" beyond 30 minutes on an online device, route to Admin Action Required.
   - **Not Applicable** — the app assignment does not target this device or user. Admin must review assignment scope.

   [VERIFIED: learn.microsoft.com/en-us/mem/intune/apps/monitor-app-installation-status, last_verified 2026-04-23]

7. Navigate to **Apps > [app] > Properties > Assignments**. Confirm a **Required** assignment exists targeting a group that includes the user. Apps deployed as **Available** (not Required) do NOT appear automatically on-device and do NOT report Device install status in the same way. <!-- verify UI at execute time -->

8. Note how long ago the app assignment was made (approximate, from assignment metadata if visible). **Not Installed** for < 15 minutes on a connected device may still be in the delivery window; for > 2 hours on an actively syncing device, escalate.

9. Document the full observed state for the escalation packet:
   - App name and Intune app ID (visible in **Apps > [app] > Properties > Overview**)
   - Exact Device install status label (verbatim from step 6)
   - Whether a Required assignment targets a group containing the user (from step 7)
   - How long the assignment has been in place (approximate)
   - Device serial number, make, model, Android version
   - User UPN

## Admin Action Required

L1 documents and hands this packet to the Intune administrator. L1 does not execute any of the following actions.

**Ask the admin to:**

- If the app is missing from `Apps > All Apps`: navigate to **Apps > Managed Google Play** and trigger a sync (**Sync** button). Verify the app appears in `All Apps` after the sync completes (~5-10 minutes). [MEDIUM: learn.microsoft.com/en-us/mem/intune/apps/apps-add-android-for-work, last_verified 2026-04-23] <!-- verify UI at execute time -->
- If Device install status = **Failed** for the user's device: open the Managed Google Play console at `play.google.com/work` (admin-only — L1 does not have access to this portal). Under the app's management page, check the **Updates** or **Permissions** tab for pending permission approvals; approve any new permissions if shown. <!-- verify UI at execute time -->
- Verify Managed Google Play binding is healthy: navigate to **Tenant admin > Connectors and tokens > Managed Google Play** in the Intune admin center. If the connector shows an error, an expired state, or the Entra account binding is broken, re-bind following the [Managed Google Play Admin Guide](../admin-setup-android/01-managed-google-play.md).
- Verify the app's Required assignment correctly targets a group that includes the user: **Apps > [app] > Properties > Assignments > Edit**. If the user is not in a targeted group, add them or add the group.
- For paid apps (if applicable): verify license assignment in the Managed Google Play console — the app must be licensed to the tenant. Unlicensed paid apps will fail to install even if correctly assigned in Intune. <!-- verify UI at execute time -->
- If Device install status = **Not Applicable**: verify the assignment filter or group scope. The device or user may be excluded by a filter expression or may not be in any targeted group.

**Verify:**

- After admin action: Device install status transitions to **Install Pending** then **Installed** within approximately 15–30 minutes on a connected, actively syncing device. The user reports the app appears in the work profile launcher (BYOD) or primary surface (COBO / Dedicated).

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

## Escalation Criteria

Escalate to L2 (or to the Intune admin directly if not already done). See [Android App Install Investigation](../l2-runbooks/20-android-app-install-investigation.md) and [Android Log Collection Guide](../l2-runbooks/18-android-log-collection.md).

Escalate to L2 if:

- App shows **Failed** for multiple devices in the tenant (potential tenant-wide MGP issue, binding health problem, or app-specific regression)
- MGP connector shows an error in **Tenant admin > Connectors and tokens > Managed Google Play** and the admin cannot re-bind successfully
- App is present in `All Apps` and the Required assignment is correctly scoped, but the device shows **Not Installed** for more than 2 hours with device actively syncing (recent last-check-in)
- App requires new permissions that the admin has approved in the MGP console but Intune still shows **Failed** on the next sync cycle
- Device shows **Not Applicable** for an app that should apply based on group membership (scope filter issue requiring L2 investigation of filter expressions or group nesting)
- App is free in MGP but license or entitlement errors appear in the MGP console or Intune error details

**Before escalating, collect:**

- Device serial number
- Device make, model, and Android version
- User UPN
- App name and Intune app ID (from **Apps > [app] > Properties > Overview**)
- Exact Device install status label (verbatim)
- Screenshot of `Apps > [app] > Device install status` filtered to this device
- Screenshot of `Apps > [app] > Properties > Assignments` showing the assignment type and target groups
- Screenshot of `Tenant admin > Connectors and tokens > Managed Google Play` showing binding state
- Whether the app is Free or Paid in the Managed Google Play store (licensing path differs)
- Approximate time since the app was first assigned to the user's group
- Whether the issue affects one device, one user, or multiple devices

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Resolved Phase 41 L2 cross-references | -- |
| 2026-04-23 | Initial version | -- |
