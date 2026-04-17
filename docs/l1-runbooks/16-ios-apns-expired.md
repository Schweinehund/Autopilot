---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS APNs Certificate Expired

Use this runbook when multiple iOS/iPadOS devices — or any Apple device including Macs — stop checking in to Intune, or when new iOS enrollments fail with errors pointing at certificate or enrollment-policy validity.

## Symptom

This failure affects ALL enrolled iOS, iPadOS, AND macOS devices in the tenant simultaneously. APNs is shared infrastructure — one expired certificate stops MDM communication to every Apple device.

**User-visible errors during any iOS enrollment attempt** — the following three error strings all indicate an APNs certificate problem. An individual device may show any one of them; they are not predictable per-device:

- `APNSCertificateNotValid` — body: "There's a problem with the certificate that lets the mobile device communicate with your company's network."
- `NoEnrollmentPolicy` — body: "No enrollment policy found."
- `AccountNotOnboarded` — body: "There's a problem with the certificate that lets the mobile device communicate with your company's network."

**Portal-visible:** Previously enrolled iOS/iPadOS devices at `Devices > All devices > iOS/iPadOS` show "Last check-in" drift into hours or days. New enrollment attempts fail immediately.

Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR1 "Fleetwide outage (all Apple devices affected)" branch.

## L1 Triage Steps

1. > **Say to the user:** "We're investigating a fleet-wide issue that may be affecting all company iPhones, iPads, and Macs. Your admin is being notified. We'll update you as soon as we have a fix timeline."

2. Navigate to **Devices** > **Device onboarding** > **Enrollment** > **Apple** (tab) > **Apple MDM Push Certificate**.

   > Portal navigation may vary by Intune admin center version. See [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md#portal-navigation-note) for details.

   Record the following from this pane:
   - **Status** (e.g., Active, Expired, Not configured)
   - **Days until expiration** (a negative number means already expired)
   - **Apple ID** (the Apple ID the certificate was created under — critical for admin renewal)
   - **Expiration date** (absolute date)

   Take a screenshot of the pane.

3. If "Days until expiration" is negative or the status reads "Expired" or similar: confirm the certificate is expired. The screenshot from step 2 is your primary evidence artifact.

4. Verify cross-platform blast radius: navigate to **Devices** > **All devices** > **macOS**. Note the "Last check-in" drift on macOS devices to document the full impact for the admin.

5. Proceed to Admin Action Required — no further L1 checks are required. Certificate renewal is admin-scope.

## Admin Action Required

L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to:**

- Renew the APNs certificate via the Apple Push Certificates Portal following the RENEWAL (not CREATE-NEW) flow documented at [APNs Certificate Guide § Renewal](../admin-setup-ios/01-apns-certificate.md#renewal).
- Use the ORIGINAL Apple ID shown on the Apple MDM Push Certificate pane — renewing with a different Apple ID fails and is a common mistake.
- Be aware of the renewal window: 30 days post-expiration. After that window closes, full re-enrollment of all Apple devices is required.

**Verify:**

- On the Apple MDM Push Certificate pane (P-01): Status returns to "Active" (or equivalent "certificate configured" state).
- Days until expiration returns to approximately 365.
- Within 30 minutes of renewal, Last-check-in timestamps in Devices > All devices begin to refresh for enrolled iOS/iPadOS and macOS devices.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

## Escalation Criteria

Escalate to L2 (or to the Intune admin directly if not already done) if:

- Admin does not have access to the Apple ID used to create the original certificate (e.g., employee departure — this is why a company email address Apple ID is recommended in the APNs guide)
- Admin performs renewal but devices do not resume check-in after 30 minutes
- Certificate grace period (30 days post-expiration) has passed — full Apple-device re-enrollment is required
- Certificate status shows an unexpected value other than "Active" / "Not set up" / "expired X days ago"

**Before escalating, collect:**

- Screenshot of the Apple MDM Push Certificate pane with Status and Days until expiration visible
- Apple ID used on the certificate (from the pane — critical for renewal access)
- Approximate Expiration date from the pane
- Count of affected iOS/iPadOS devices (from Devices > All devices > iOS/iPadOS view)
- Count of affected macOS devices (from Devices > All devices > macOS view)
- Whether any device has successfully checked in in the last 24 hours
- User-visible error string the user reported (`APNSCertificateNotValid` / `NoEnrollmentPolicy` / `AccountNotOnboarded` / other)

See [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for advanced investigation of the APNs path through token diagnostics, with log artifacts per [iOS Log Collection Guide](../l2-runbooks/14-ios-log-collection.md). For APNs config reference, see [APNs Certificate Guide](../admin-setup-ios/01-apns-certificate.md).

**Related Resources (cross-platform note):** As of Phase 30 execution, macOS has no equivalent L1 APNs-expired runbook. Cross-platform APNs failures identified from the macOS side should escalate to L2 via the standard [macOS ADE Triage](../decision-trees/06-macos-triage.md). A macOS L1 APNs runbook is planned for v1.4.

---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Resolved Phase 31 L2 cross-references | -- |
| 2026-04-17 | Initial version | -- |
