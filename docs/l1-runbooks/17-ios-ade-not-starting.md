---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: ADE
audience: L1
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS ADE Enrollment Not Starting

Use this runbook when a supervised ADE corporate-owned iOS/iPadOS device (from an Apple Business Manager enrollment) does not reach Intune after factory reset, stalls in Setup Assistant before completing enrollment, or the user never sees the Microsoft sign-in screen during Setup Assistant. For Company Portal or web-based (BYOD) enrollment failures, see [runbook 18](18-ios-enrollment-restriction-blocking.md) or [runbook 19](19-ios-license-invalid.md).

## Symptom

Three failure signatures are documented for ADE enrollment not starting. Identify which signature most closely matches the observed failure before proceeding to triage steps.

- **(a) Device never appears in Intune after factory reset.**
  Setup Assistant may start on the device, but no MDM profile arrives and the device serial number does not appear in Intune. The user may see iOS Setup Assistant running but the device never presents the Remote Management / MDM enrollment screen. Typically caused by ABM token expiry or a missing enrollment profile assignment. Check the Enrollment program tokens pane first.

- **(b) Device appears in Intune but Setup Assistant stays stuck past the welcome or sign-in screens.**
  The device serial is visible in Intune but the device does not advance to "Your iPhone is set up by [organization]" and remains on an intermediate screen. Typically caused by enrollment profile misconfiguration: Await-final-configuration set to Yes when a required device-configuration policy cannot be delivered, pending configuration-profile delivery errors, or incorrect user affinity.

- **(c) User reaches the Apple sign-in screen successfully, but the expected Microsoft sign-in screen never appears.**
  The user authenticates with Apple ID but the Intune / Entra ID sign-in step does not follow. Typically caused by the enrollment profile authentication method set to "Setup Assistant (legacy)", which is incompatible with modern Conditional Access and blocks MFA-required policies. Microsoft Learn documents this as a common ADE-stuck-at-sign-in cause.

Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR2 "ADE Setup Assistant stuck or no MDM profile" branch.

## L1 Triage Steps

1. > **Say to the user:** "We're checking your device enrollment. Please keep the device powered on and connected to Wi-Fi. I'll update you in a few minutes."

2. Navigate to **Devices > All devices > iOS/iPadOS** (P-04). In the search bar, enter the device serial number. Record: device present (Y/N); if present, its enrollment type and last check-in timestamp.

   > Portal navigation may vary by Intune admin center version. See [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md#portal-navigation-note) for details.

3. Navigate to **Devices > Device onboarding > Enrollment > Apple** (tab) **> Enrollment program tokens** (P-02). For the active iOS token, record: **Status** (Active / Expired / Expiring soon), the token Apple ID, and the list of profiles assigned to the token.

4. If token **Status** is "Expired" or "Expiring soon": proceed directly to [Admin Action Required](#admin-action-required) — token renewal required. Do not perform the manual sync (step 7) until the token is renewed; a sync on an expired token will not surface devices.

5. On the token, confirm an enrollment profile is assigned as Default (or is targeted to this device's assignment group). Record the profile name.

6. If no enrollment profile is assigned: proceed to [Admin Action Required](#admin-action-required) — profile assignment required.

7. If token Status is Active and an enrollment profile is assigned but the device does **not** appear in Intune (Signature a): perform the **manual ADE token sync** — the single L1 write-action exception documented for this runbook. Navigate to **Devices > Device onboarding > Enrollment > Apple** (tab) **> Enrollment program tokens > [token] > Sync** (P-03). Wait 5 minutes. Re-search by serial in Devices > All devices > iOS/iPadOS.

   > **Note:** This sync is a READ retry — it re-triggers ABM-to-Intune device syncing using the existing,
   > unchanged token configuration rather than creating or modifying any configuration.
   > This is a safe read-retry matched to macOS runbook 10 step 10 precedent.

8. If the manual sync does not surface the device after 5 minutes: navigate to Apple Business Manager (`business.apple.com` > Devices). Search by device serial number. If the device is not found in ABM: the device is not enrolled in the ABM program (procurement issue) — proceed to [Escalation Criteria](#escalation-criteria) with "not found in ABM" noted.

9. If the device is found in ABM: check the **MDM Server** field in the ABM device record.
   If the MDM Server field is blank or shows a different organization MDM server: proceed to [Escalation Criteria](#escalation-criteria) with the inter-org-release data documented.

10. For Signature (b) or Signature (c): the portal checks in steps 3–6 typically reveal a misconfiguration in the enrollment profile (authentication method, Await-final-configuration, or user affinity). Proceed to [Admin Action Required](#admin-action-required) with the specific signature identified and the enrollment profile name recorded.

## Admin Action Required

L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to (select based on L1 triage finding):**

*Signature (a) — ABM token expired:*
- Renew the ABM/ADE token per [ABM/ADE Token Guide § Renewal](../admin-setup-ios/02-abm-token.md#renewal). Token renewal requires the Managed Apple ID associated with the original token creation. A personal Apple ID cannot be substituted; token renewal with a different Apple ID creates a new token and requires enrollment profile reassignment.

*Signature (a) — no enrollment profile assigned:*
- Create or assign an enrollment profile to the token per [ADE Enrollment Profile Guide](../admin-setup-ios/03-ade-enrollment-profile.md). Assign as Default for the token or scope it to the device's assignment group. Profile assignment is over-the-air and does not require the device to be present or powered on.

*Signature (b) — Await-final-configuration stuck or pending configuration-profile delivery errors:*
- Review the Await-final-configuration setting and any pending configuration-profile delivery errors on the enrollment profile per [ADE Enrollment Profile Guide](../admin-setup-ios/03-ade-enrollment-profile.md). Await-final-configuration holds the device in Setup Assistant until all device-configuration policies are delivered; if a required policy fails delivery (missing assignment, scope issue, or policy error), the device remains at this screen indefinitely. Check Intune > Devices > [device] > Device configuration for delivery errors.
- A factory reset of the device may be required if the configuration-delivery deadlock cannot be resolved from the portal.

*Signature (c) — legacy authentication method blocking modern CA:*
- Change the enrollment profile's Authentication method to **Setup Assistant with modern authentication** (not "Setup Assistant (legacy)") per [ADE Enrollment Profile Guide § Authentication Methods](../admin-setup-ios/03-ade-enrollment-profile.md#authentication-methods). The legacy method is incompatible with modern Conditional Access policies and MFA — Microsoft Learn documents this as the primary cause of ADE enrollment stuck at the Microsoft sign-in step.
- Note: The device must be factory-reset and re-enrolled after the profile authentication method is changed — the method is applied only at first enrollment.

**Verify:**
- Signature (a) token renewal: token Status returns to Active in the Enrollment program tokens pane (P-02) and newly-reset devices appear in Devices > All devices > iOS/iPadOS within 15 minutes of a manual sync.
- Signature (a) profile assignment: the profile appears under the token in P-02; device arrives in Intune within 15 minutes of sync.
- Signature (b): device advances past the Remote Management / Setup Assistant stuck screen and reaches "Your iPhone is set up by [organization]".
- Signature (c): user retries enrollment after the profile authentication method is updated; the Microsoft sign-in screen appears after the Apple sign-in screen.

**If the admin confirms none of the above applies:**
- Proceed to [Escalation Criteria](#escalation-criteria).

> **Note for L1:** If the admin is unavailable, document the triage findings (token status, profile assignment, signature matched) in the ticket and set status to Pending Admin Action.

## Escalation Criteria

Escalate to L2 (or to the Intune admin directly if not already notified) if:

- ABM/ADE token expired AND the admin does not have access to the Managed Apple ID used for original token creation
- Device appears in ABM but is assigned to a different MDM server (inter-organization device release required)
- All portal checks pass and manual sync was performed but the device still does not appear after 30 minutes
- Admin already performed renewal and sync but the device still does not appear
- Signature (c) persists after the authentication method is confirmed as modern authentication (deeper Conditional Access or MFA configuration investigation required)

> **Tip:** Collect all data listed below before contacting L2 or the admin. Providing complete data reduces round-trips and speeds resolution.

L1 collects this data before the handoff to ensure escalation is actioned without follow-up requests.

**Before escalating, collect:**

- Device serial number
- Device make and model (iPhone or iPad variant, e.g., iPhone 15 Pro, iPad 10th generation)
- ABM device record screenshot (or note "not found in ABM")
- Enrollment token Status screenshot from the Enrollment program tokens pane (P-02)
- Enrollment profile name and key settings screenshot (User affinity, Authentication method, Await final configuration)
- Manual sync attempt timestamp and outcome
- Which signature (a/b/c) most closely matches the observed failure

See [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for advanced ADE investigation.
For admin configuration references:
- [ABM/ADE Token Guide](../admin-setup-ios/02-abm-token.md)
- [ADE Enrollment Profile Guide](../admin-setup-ios/03-ade-enrollment-profile.md)
- [iOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md) — 7-stage enrollment pipeline
- [ADE token sync mechanics](../admin-setup-ios/02-abm-token.md#token-sync-mechanics) -- manual sync rate limits and delta sync interval
- [iOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md) -- enrollment path taxonomy (ADE, Device Enrollment, User Enrollment, MAM)
- [iOS/iPadOS Admin Setup Overview](../admin-setup-ios/00-overview.md) -- portal navigation and admin prerequisites

---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Resolved Phase 31 L2 cross-references | -- |
| 2026-04-17 | Initial version | -- |
