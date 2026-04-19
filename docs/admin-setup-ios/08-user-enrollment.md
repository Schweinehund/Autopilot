---
last_verified: 2026-04-18
review_by: 2026-07-17
applies_to: user-enrollment
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS account-driven User Enrollment (privacy-preserving BYOD).
> For corporate ADE setup, see [iOS/iPadOS Admin Setup Overview](00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS Account-Driven User Enrollment

Account-driven User Enrollment is Apple's privacy-preserving iOS/iPadOS enrollment path for personally-owned devices. IT manages work apps and data within a managed APFS volume on the device; personal apps, personal data, and device-level attributes remain outside Intune's management scope. This guide covers admin prerequisites, enrollment configuration, and the explicit privacy limitations that differentiate User Enrollment from other enrollment paths. Both admins configuring the tenant and end users enrolling their devices benefit from reading the Privacy Boundaries summary below; per-capability privacy callouts appear at each capability's discussion point throughout the guide.

## Key Concepts Before You Begin

### Managed Apple ID vs Personal Apple ID

Account-driven User Enrollment uses a **Managed Apple ID** (sometimes branded "Managed Apple Account" in Apple's 2024+ documentation; Microsoft Intune documentation continues to use "Managed Apple ID") that is created and governed by the organization, not the end user. The Managed Apple ID is distinct from the user's personal Apple ID in four ways:

- **Created by** — Managed Apple IDs are created in Apple Business Manager (ABM) or federated from Microsoft Entra ID; personal Apple IDs are created by the end user at appleid.apple.com.
- **Scope** — The Managed Apple ID signs into the managed APFS volume on the device and receives enrollment work context; the personal Apple ID remains signed into the primary device context for personal apps and iCloud.
- **Data separation** — The two Apple IDs are isolated on the device; work data stays in the managed volume and does not sync to the personal iCloud.
- **Revocation** — Administrators can revoke a Managed Apple ID from ABM or Entra to terminate the user's access to the managed volume; the personal Apple ID is unaffected.

Confusing the two identities is the most common configuration error in account-driven User Enrollment. Users signing in with their personal Apple ID during enrollment will be rejected — Managed Apple ID is required.

### Privacy Boundaries on User Enrollment

Account-driven User Enrollment preserves end-user privacy by scoping Intune management to the managed APFS volume only. The following privacy boundaries apply to every device enrolled via account-driven User Enrollment, and each boundary is repeated as an inline callout at the relevant capability section below so deep-link readers (for example, from L1 runbooks that link directly to a specific section) are not dependent on reading this summary.

- **Hardware identifiers are not collected.** Intune does not collect UDID, serial number, or IMEI from User Enrollment devices.
- **No device-level wipe is available.** The only wipe scope on User Enrollment is selective wipe of the managed APFS volume. The personal side of the device is untouched by any Intune action.
- **Personal apps and data are not inventoried.** Intune sees only managed apps inside the managed volume. Personal apps installed by the end user — and data within them — are outside Intune's visibility.
- **No location tracking.** MDM location commands are not available on User Enrollment.
- **No full-device passcode enforcement.** Passcode compliance policies apply only to the managed content; Intune cannot enforce a passcode on the primary device context.
- **Per-app VPN only.** System-wide VPN is not available; only per-app VPN scoped to managed apps.
- **Managed APFS volume separation.** The device maintains a cryptographically separate APFS volume for work content; personal content is isolated and unreachable by Intune.

For the conceptual definition of User Enrollment and how Apple implements the managed APFS volume boundary, see [iOS/iPadOS Enrollment Path Overview § User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

## Prerequisites

Admin prerequisites for account-driven User Enrollment:

- **Managed Apple ID** for each enrolling user — Created in Apple Business Manager (ABM) or federated from Microsoft Entra ID. (Apple rebranded as "Managed Apple Account" in 2024; Microsoft Intune documentation continues to use "Managed Apple ID".) See [iOS/iPadOS Enrollment Path Overview § User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment) for conceptual context.
- **Service Discovery setup** — The organization hosts a `.well-known/com.apple.remotemanagement` JSON resource on a web server corresponding to the email domain of the Managed Apple ID. Verify current hosting requirements against Microsoft Learn `apple-account-driven-user-enrollment` at time of writing. Note: on iOS 18.2+ devices linked to ABM, Apple provides an alternate discovery path — service-discovery file hosting is no longer mandatory on these devices.
- **Microsoft Entra work account** — Each enrolling user has a Microsoft Entra work account with Intune license assigned; JIT (Just-In-Time) registration flows the work account through during enrollment.
- **Microsoft Authenticator** — Assigned as a required app to enrolling user groups; handles the work-account authentication during enrollment.
- **iOS/iPadOS 15.0 or later** — Account-driven User Enrollment is not available on iOS 14 or earlier. (Verify current version baseline against Microsoft Learn at time of writing.)
- **APNs certificate configured and active** — Same APNs certificate serves ADE, Device Enrollment, and User Enrollment. See [APNs Certificate Guide](01-apns-certificate.md).
- **Intune Administrator role** — Or a custom RBAC role with enrollment management permissions.
- **Tenant enrollment restrictions reviewed** — See [iOS/iPadOS Admin Setup Overview § Intune Enrollment Restrictions](00-overview.md#intune-enrollment-restrictions). Account-driven User Enrollment is subject to the tenant-level enrollment-type-blocking policy.

> **Research-flag note for admins deploying to devices running iOS 15.5 or iOS 15.7–16.3:** Microsoft Learn documents MFA limitations on User Enrollment on these iOS versions (iOS 15.5 cannot enroll with any MFA on the same device; iOS 15.7–16.3 cannot enroll with MFA via text, phone-call is required). These limitations are documented as current guidance despite iOS 18 shipping. Verify current status against Microsoft Learn `ios-user-enrollment-supported-actions` before assuming these apply to your fleet.

## Steps

Account-driven User Enrollment is primarily a user-initiated flow backed by organizational service-discovery configuration. Admin work falls into three configuration areas: service discovery hosting, Intune policy assignment, and enrollment-restriction review.

### Step 1: Configure Service Discovery

#### On the organization's web server

1. Host a JSON resource at `https://{email-domain}/.well-known/com.apple.remotemanagement` for each email domain used by enrolling users' Managed Apple IDs. The resource points Apple's enrollment flow at the tenant's Intune enrollment endpoint.
2. Confirm the resource is reachable over HTTPS from the public internet and returns a `application/json` content-type. The iOS enrollment client fetches this resource without authentication.

   > **What breaks if misconfigured:** If the service-discovery resource is missing, returns non-JSON content, or is blocked by a firewall, end-user enrollment fails at the "Sign in with Managed Apple ID" step with a generic "we couldn't sign you in" error. Symptom appears in: device (iOS shows the sign-in error inline in the Settings enrollment flow) with no failure visible in the Intune admin center portal.

On iOS 18.2+ devices federated with ABM, this step may be optional — Apple provides an alternate discovery path using ABM metadata. Verify current iOS version coverage against Microsoft Learn `apple-account-driven-user-enrollment` at time of writing.

### Step 2: Configure Intune Enrollment Restrictions

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Enrollment device platform restrictions** > **iOS/iPadOS restrictions**.
3. Confirm account-driven User Enrollment is allowed for the user groups you expect to enroll (the tenant-wide enrollment-type-blocking policy applies here; see [iOS/iPadOS Admin Setup Overview § Intune Enrollment Restrictions](00-overview.md#intune-enrollment-restrictions)).

   > **What breaks if misconfigured:** Blocking account-driven User Enrollment at the tenant level prevents enrollment completion even when service discovery is correctly configured. Symptom appears in: device (profile installation fails with "enrollment not allowed") with no failure in the Intune admin center portal itself.

### Step 3: Assign Microsoft Authenticator

#### In Intune admin center

1. Navigate to **Apps** > **iOS/iPadOS** and confirm Microsoft Authenticator is assigned as a Required app to the enrolling user groups.
2. Microsoft Authenticator handles the Entra work-account authentication during enrollment. End users must install and sign into Authenticator before enrolling.

## Managed Capabilities and Privacy Limits

After enrollment, Intune manages work apps and data inside the managed APFS volume. Each capability below lists what Intune can do and includes an explicit Privacy limit callout describing what Intune cannot do. Every callout links back to the User Enrollment section of the [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

### Hardware Identifiers and Inventory

Intune identifies User-Enrollment-enrolled devices by the Managed Apple ID and an Apple-provided enrollment identifier. Hardware identifiers like UDID, serial number, and IMEI are not returned by Apple's User Enrollment MDM channel.

> **Privacy limit:** Intune does not collect UDID, serial number, or IMEI from account-driven User Enrollment devices. Device identification is limited to the Managed Apple ID and Apple's enrollment identifier. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

### Wipe and Retire

The only wipe scope on User Enrollment is selective wipe of the managed APFS volume. Triggering a wipe from Intune removes the managed volume, corporate accounts, and managed apps; the personal side of the device is untouched.

> **Privacy limit:** System-wide device wipe is not available on account-driven User Enrollment. Only the managed APFS volume can be wiped — personal apps, personal data, and the personal iCloud are unaffected by any Intune wipe action. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

### App Inventory

Intune inventories managed apps deployed via VPP user-licensed assignment into the managed volume. Personal apps installed by the end user from the App Store to the primary device context are outside Intune's visibility.

> **Privacy limit:** Intune does not inventory personal apps or personal app data. Only managed apps inside the managed APFS volume and their work data are visible to Intune. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

### Location

MDM location commands are not part of Apple's User Enrollment MDM feature set. Intune cannot query the device location on a User-Enrollment-enrolled device.

> **Privacy limit:** Location tracking is not available on account-driven User Enrollment. Intune cannot query or report device location on these devices. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

### Passcode

Passcode policy on User Enrollment applies only to the managed content — for example, a passcode required to open a managed Outlook inbox. Full-device passcode enforcement is not available.

> **Privacy limit:** Intune cannot enforce a passcode on the primary device context of an account-driven User Enrollment device. Passcode compliance policies apply only to managed content; whether the device itself has a passcode is governed by the end user. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

### VPN

Per-app VPN scoped to managed apps is supported; configuration flows through a VPN configuration profile targeted at the managed volume. System-wide VPN — which would route all device traffic including personal apps — is not available.

> **Privacy limit:** System-wide VPN is not available on account-driven User Enrollment. Only per-app VPN scoped to managed apps is supported; personal app traffic does not route through the corporate VPN. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

### Managed Volume Separation

User Enrollment stores work content in a cryptographically separate APFS volume on the device. Work apps, work accounts, and work data live in this volume; personal content lives in the primary volume and is never accessible to Intune, managed apps, or the work account.

> **Privacy limit:** Account-driven User Enrollment creates a managed APFS volume that is cryptographically separate from the personal side of the device. Intune cannot reach personal content; managed apps cannot copy content into the personal side of the device except via iOS-mediated Managed Open In flows. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

## Profile-Based User Enrollment (Deprecated)

**For new enrollments, use account-driven User Enrollment** (documented above). Profile-based User Enrollment via Company Portal is deprecated and is no longer available for newly enrolled devices on iOS 18 and later. Existing enrolled devices continue to work; Microsoft Intune support remains available for them.

If your tenant has existing profile-based User Enrollment enrolled devices:

- Continue to manage them via their existing profile-based enrollment — no forced migration is required.
- Do not attempt to newly enroll devices via the profile-based path; the option has been removed from Company Portal and the Intune admin center for new devices.
- Plan migration to account-driven User Enrollment at the next device refresh cycle. Migration requires unenrolling from the profile-based path and re-enrolling via the account-driven path.

Verify the current deprecation status against Microsoft Learn `ios-user-enrollment-supported-actions` at time of writing — the option may be fully removed (not just deprecated) by the time this guide is read.

## Verification

- [ ] Service-discovery JSON resource is reachable at `https://{email-domain}/.well-known/com.apple.remotemanagement` and returns valid JSON (test with `curl` from outside the corporate network)
- [ ] Enrolling user has a Managed Apple ID (created in ABM or federated from Entra)
- [ ] Enrolling user has an Intune license assigned to their Entra work account
- [ ] Microsoft Authenticator is assigned as Required to the enrolling user group and installs on enrollment
- [ ] Test enrollment on a personal iOS 15+ device completes: user signs in with Managed Apple ID, downloads and accepts the User Enrollment profile, and the device appears in Intune admin center under **Devices** > **All devices** with ownership designation **Personal** and enrollment type **User Enrollment (account-driven)**
- [ ] Post-enrollment: the managed work account appears under **Settings** > **General** > **VPN & Device Management** as a managed User Enrollment profile, and work content is accessible via managed apps (Outlook, Teams, Edge)

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Service-discovery JSON resource missing or returns 404 | Org web server / DNS | Enrollment fails at Managed Apple ID sign-in with "we couldn't sign you in" | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for service-discovery JSON configuration; L2 org-web/DNS investigation required |
| Service-discovery JSON resource returns non-JSON content-type | Org web server | Enrollment fails silently; the iOS enrollment flow rejects the discovery response | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; L2 org-web content-type debugging |
| Account-driven User Enrollment blocked by tenant enrollment restrictions | Intune | Enrollment profile fails to install with "enrollment not allowed" | [Runbook 18: Enrollment Restriction Blocking](../l1-runbooks/18-ios-enrollment-restriction-blocking.md) |
| User signs in with personal Apple ID instead of Managed Apple ID | Device | iOS rejects the sign-in with "this Apple ID cannot be used here"; enrollment cannot proceed | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; user-education + Managed Apple ID provisioning is out-of-L1-scope admin action |
| Microsoft Authenticator not assigned or not installed | Intune | Work-account authentication fails during JIT registration; enrollment stalls at Entra sign-in step | [Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md) — User-enrollment-specific: manifests as "license/access" failure from user perspective; L1 checks Authenticator app assignment via Intune similar to license check; if Authenticator is present and Intune license present, fall to L2P31 per runbook 19 Escalation |
| Managed Apple ID not created or not federated from Entra | ABM / Entra | User cannot complete Managed Apple ID sign-in; iOS rejects the Managed Apple ID sign-in | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for Managed Apple ID provisioning (ABM + Entra federation); admin scope |
| Enrollment attempted on iOS 14 or earlier | Device | Account-driven User Enrollment is not available; the Sign In to Work or School Account flow is unavailable on this iOS version | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; user-education (upgrade device) + admin confirms minimum-OS gate |

## See Also

- [iOS/iPadOS Admin Setup Overview](00-overview.md) — Path router and shared Intune Enrollment Restrictions section
- [iOS/iPadOS Enrollment Path Overview § User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment) — Conceptual definition and managed APFS volume architecture
- [Device Enrollment](07-device-enrollment.md) — Non-privacy-preserving BYOD alternative
- [MAM App Protection](09-mam-app-protection.md) — App-layer protection without enrollment
- [APNs Certificate Guide](01-apns-certificate.md) — Shared APNs prerequisite
- [Apple Provisioning Glossary](../_glossary-macos.md)

---
*Previous: [Device Enrollment](07-device-enrollment.md) | Next: [MAM App Protection](09-mam-app-protection.md) | [Back to Overview](00-overview.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |
| 2026-04-17 | Initial version — iOS/iPadOS account-driven User Enrollment admin guide with hybrid privacy-callout pattern covering all 7 D-20 privacy boundaries | -- |
