---
last_verified: 2026-04-18
review_by: 2026-07-17
applies_to: device-enrollment
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS Device Enrollment via Intune (no ABM required).
> For corporate ADE setup, see [iOS/iPadOS Admin Setup Overview](00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS Device Enrollment

Device Enrollment is Intune's non-ABM enrollment path for iOS/iPadOS devices. Users initiate enrollment themselves — either by downloading the Intune Company Portal app or by visiting a web-based enrollment URL — and the resulting enrolled device runs in unsupervised mode with the full Intune MDM management capability set minus supervised-only features. Device Enrollment covers both personal-owned BYOD devices and corporate-owned devices that did not come through Apple Business Manager.

## Capabilities Available Without Supervision

Use this table to answer "can I do X on a Device-Enrollment-enrolled iOS/iPadOS device?" in under 30 seconds. This guide's enrolled devices are unsupervised; capabilities marked **Yes** are available, **No** requires corporate ADE (see [ADE Enrollment Profile](03-ade-enrollment-profile.md)).

| Capability | Available on Device Enrollment (unsupervised)? | Notes |
|-----------|:---:|------|
| MDM configuration profiles (Wi-Fi, VPN, email, certificates, general device restrictions) | Yes | Settings not flagged supervised-only apply on Device-Enrollment-enrolled devices. See [Configuration Profiles](04-configuration-profiles.md). |
| Compliance evaluation (OS version, passcode, jailbreak, account protection) | Yes | All compliance policies evaluate on unsupervised enrollment. See [Compliance Policies](06-compliance-policy.md). |
| Conditional Access enforcement via Intune compliance state | Yes | CA treats Device Enrollment devices identically to ADE devices once a compliance record exists. |
| VPP user-licensed app deployment | Yes | User accepts the VPP invitation by signing in with a personal Apple Account; app installs after acceptance. |
| VPP device-licensed app deployment | Yes | No Apple Account prompt; the user sees a one-time install confirmation rather than a fully silent install. |
| LOB (.ipa) app deployment | Yes | Enterprise-signed apps deploy on supervised and unsupervised devices; the user sees a one-time install confirmation. |
| Store apps (without VPP) | Yes | Requires the user's personal Apple Account; paid apps require prior user-side purchase. |
| Remote device lock and passcode clear (MDM commands) | Yes | Standard unsupervised MDM commands. |
| Remote device wipe (full device, MDM RemoteWipe) | Yes (Corporate devices) / Retire only (Personal devices) | Personal-owned devices receive retire/selective-wipe scope; Corporate-owned devices can receive full-device wipe. See [Personal vs Corporate Ownership](#personal-vs-corporate-ownership). |
| Personal vs Corporate ownership flag | Yes | Default is Personal for Device Enrollment; reclassify via device identifier upload or Microsoft Graph. See [Personal vs Corporate Ownership](#personal-vs-corporate-ownership). |
| Silent app installation (no user consent) | **No** | ADE-only capability — see [ADE Enrollment Profile](03-ade-enrollment-profile.md). |
| OS update enforcement (forced install deadlines via DDM or device restrictions) | **No** | Supervised-only in iOS 17+ enforcement policies. |
| Supervised-only restrictions (block App Store, disable iCloud Backup, disable Find My, home-screen layout enforcement, etc.) | **No** | Category-level supervised-only settings do not apply. See [ADE Enrollment Profile](03-ade-enrollment-profile.md) for the supervised-only capability set. |
| Activation Lock bypass | **No** | Requires supervised mode. |
| Lost Mode | **No** | Supervised-only MDM command. |
| Single App Mode / kiosk configurations | **No** | Supervised-only; kiosk deployments require ADE with supervised enrollment. |
| Await final configuration (hold device at Setup Assistant until policies apply) | **No** | ADE-profile-specific; not applicable to user-initiated Device Enrollment flows. |

For the complete supervised/unsupervised capability comparison across all enrollment paths, see [iOS/iPadOS Enrollment Path Overview § Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

## Key Concepts Before You Begin

### Company Portal vs Web-Based Enrollment

iOS/iPadOS Device Enrollment has two user-initiated flows. Both produce the same unsupervised managed-device end-state and the same capability set. They differ in how the user starts enrollment and what the user experience looks like.

- **Company Portal enrollment** — User installs the Intune Company Portal app from the App Store, signs in with their work account, and follows the in-app prompts. Suitable for tenants that want a branded enrollment experience and plan to use Company Portal for ongoing app discovery.
- **Web-based enrollment** — User visits a tenant-specific enrollment URL in Safari, signs in, and downloads the management profile. Suitable for tenants that do not require the Company Portal app or prefer a lighter-weight end-user experience.

Choose one flow per enrollment campaign or let end users choose — both are supported simultaneously.

The two flows produce identical managed-device outcomes; pick a flow based on user experience preferences, not on which capabilities will be available afterward. Every capability in the [Capabilities Available Without Supervision](#capabilities-available-without-supervision) table above applies equally to both flows.

### When to Choose Device Enrollment

Device Enrollment is the right path when at least one of the following is true:

- The device is personally owned (BYOD) and the tenant accepts Personal ownership and the management capability set available without supervision.
- The device is corporate-owned but was not purchased through Apple Business Manager (for example, devices bought from a retailer or acquired through a merger) and cannot be reset and re-enrolled via ADE.
- The user needs Intune management now and ABM onboarding is not scheduled.

For privacy-preserving BYOD — where IT wants app-data protection without management-level device inventory — use [User Enrollment](08-user-enrollment.md) (account-driven) or [MAM App Protection](09-mam-app-protection.md) (no enrollment at all) instead.

For corporate devices that should arrive supervised with Setup-Assistant-time enrollment, use ADE (see [ADE Enrollment Profile](03-ade-enrollment-profile.md)). Device Enrollment does not support kiosk/shared-iPad deployments because those require supervision.

### Tenant-Level Enrollment Restrictions Apply

Intune enrollment restrictions (platform filtering, ownership flag, per-user device limits, and enrollment-type blocking) apply tenant-wide across Device Enrollment and all other enrollment paths. See [iOS/iPadOS Admin Setup Overview § Intune Enrollment Restrictions](00-overview.md#intune-enrollment-restrictions) for restriction configuration. Restrictions are NOT duplicated in this guide.

### Enrollment Lifecycle at a Glance

A Device Enrollment flow moves through four phases:

1. **Pre-enrollment** — Admin confirms tenant prerequisites (APNs certificate active, enrollment restrictions permit the target user group, Intune license assigned to the user).
2. **User-initiated enrollment** — User completes Flow 1 (Company Portal) or Flow 2 (web-based). Both flows end with the management profile installed on the device.
3. **Post-enrollment delivery** — Intune begins delivering assigned configuration profiles, apps, and compliance evaluation over APNs. Initial delivery typically completes within 30 minutes.
4. **Ongoing management** — The device checks in periodically (APNs-triggered) for policy updates, compliance re-evaluation, and remote action execution (for example, a wipe or retire triggered from Intune).

Device Enrollment devices do not re-enter Setup Assistant on a policy change or a profile reassignment; the management profile stays installed until explicitly removed (user-initiated for Personal devices without locked enrollment, or admin-initiated via Retire or Wipe).

## Prerequisites

Admin prerequisites for Device Enrollment:

- APNs certificate configured and active (see [APNs Certificate Guide](01-apns-certificate.md) — same APNs certificate serves ADE, Device Enrollment, and User Enrollment)
- Intune Administrator role, or a custom RBAC role with enrollment management permissions
- Microsoft Intune Plan 1 (or higher) subscription
- Tenant enrollment restrictions reviewed — see [iOS/iPadOS Admin Setup Overview § Intune Enrollment Restrictions](00-overview.md#intune-enrollment-restrictions)

End-user prerequisites:

- Work account (Microsoft Entra ID) with Intune license assigned
- iOS/iPadOS 14.0 or later (Intune minimum; verify current against Microsoft Learn `supported-devices-browsers-intune`)
- Network access to the Microsoft Intune enrollment endpoints (`enrollment.manage.microsoft.com`, `login.microsoftonline.com`, Apple Push Notification service hosts) on the device's current network
- Sufficient local storage on the device for the management profile and assigned apps

Flow-specific prereqs are listed within each per-flow section below.

Unlike ADE, Device Enrollment does not require:

- An Apple Business Manager (ABM) account or ADE token (both are ABM-specific)
- An enrollment profile object in Intune (Device Enrollment flows use tenant-wide restrictions only, not per-device profile assignment)
- Physical device-identifier pre-registration before the user enrolls (although identifier upload is later used to reclassify devices as Corporate — see [Personal vs Corporate Ownership](#personal-vs-corporate-ownership))

## Steps

Device Enrollment has two parallel flows. Complete the portal-side configuration for the flows you want to support, then direct end users to the appropriate flow.

### Flow 1: Company Portal Enrollment

**Flow-specific prerequisites:**

- Intune Company Portal app available on the App Store in the end user's region
- End user can install apps (tenant App Store restrictions, if any, permit Company Portal)

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Enrollment device platform restrictions** > **iOS/iPadOS restrictions**.
3. Confirm Personally-owned enrollment is allowed for the user groups you expect to enroll. If enrollment is blocked, end users see an "enrollment not allowed" error after signing in.

   > **What breaks if misconfigured:** A tenant-wide block on personally-owned enrollment prevents Company Portal completion for BYOD users even after Company Portal is installed. Symptom appears in: device (Company Portal shows "This device can't be managed" or "Your administrator hasn't made this option available") with no failure in the Intune admin center portal itself.

4. Navigate to **Apps** > **iOS/iPadOS** and confirm the Intune Company Portal app is assigned as a Required app to the enrollment user groups. Company Portal self-distributes via the App Store for unassigned users; explicit assignment ensures the app stays available and updates apply.

   > **What breaks if misconfigured:** If Company Portal is not assigned and the tenant relies on App Store auto-discovery only, users on devices with "Block App Store" restrictions (inherited from any other policy) cannot install Company Portal at all and cannot complete enrollment via this flow. Symptom appears in: device (user reports "I can't find Company Portal in the App Store") and Intune admin center (no new device enrollments from affected user groups).

**End-user flow (outcome-level summary):**

After the admin configuration above is in place, end users complete Company Portal enrollment by installing Company Portal from the App Store, signing in with their work account, and completing the in-app enrollment prompts. The flow installs the MDM profile on the device and ends with the device registered as managed in Intune. The expected outcome is a device visible in Intune admin center under **Devices** > **All devices** with the user's UPN, a Management Name, and the Personal ownership designation (unless the device is later reclassified as Corporate — see [Personal vs Corporate Ownership](#personal-vs-corporate-ownership) below).

During the flow, the user accepts the management profile installation prompt on the device, which is the point of user consent. After the profile is installed, compliance evaluation begins automatically and any assigned configuration profiles and apps start to deliver. First check-in typically completes within a few minutes; initial app delivery and compliance evaluation may continue for up to 30 minutes post-enrollment.

### Flow 2: Web-Based Enrollment

**Flow-specific prerequisites:**

- Safari browser on the enrolling device (web-based enrollment requires Safari; Chrome and other iOS browsers are not supported)
- End user can download and install configuration profiles (tenant Device Restrictions, if deployed, do not block profile installation)

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Enrollment device platform restrictions** > **iOS/iPadOS restrictions** and confirm Personally-owned enrollment is allowed for the user groups you expect to enroll (same check as Flow 1).

   > **What breaks if misconfigured:** A tenant-wide enrollment-restriction block affects both flows identically. Symptom appears in: device (enrollment URL sign-in succeeds but profile download never starts, or download starts and fails mid-flow with "enrollment not allowed").

3. Communicate the web-based enrollment URL to end users: `https://enrollment.manage.microsoft.com/enrollmentserver/discovery.svc` (default tenant URL; confirm current URL against Microsoft Learn `ios-device-enrollment` at time of writing).

   > **What breaks if misconfigured:** If users are directed to the enrollment URL from a non-Safari browser (Chrome, Edge, Firefox on iOS), the management-profile download will not trigger because only Safari on iOS can hand profile payloads off to the Settings app for installation. Symptom appears in: device (browser loads the URL and sign-in succeeds, but the download button does nothing, returns an error, or opens a blank page). Resolution: user opens the same URL in Safari.

**End-user flow (outcome-level summary):**

End users open the enrollment URL in Safari, sign in with their work account, and follow the on-screen prompts to download and install the management profile. The flow does not require Company Portal. The expected outcome is a device visible in Intune admin center under **Devices** > **All devices** with the same artifacts as Company Portal flow (user UPN, Management Name, Personal ownership by default). Web-based enrollment is functionally equivalent to Company Portal enrollment for management-capability purposes.

Once the profile is downloaded, the user navigates to **Settings** > **General** > **VPN & Device Management** to approve and install it. This is the user-consent step for web-based enrollment. After installation, the device completes enrollment automatically and begins compliance evaluation and profile/app delivery, identical to the Company Portal flow's post-enrollment behavior.

### Choosing Between Flows for Mixed Fleets

Tenants supporting both flows should document which flow is preferred for which user population rather than leaving the choice entirely to end users. Recommended patterns:

- **Company Portal preferred** — organizations that plan to use Company Portal for ongoing managed-app discovery, or that want a branded enrollment experience with consistent pre/post-enrollment messaging.
- **Web-based preferred** — organizations where the App Store is restricted by network or device policy, where users resist installing an additional app, or where enrollment throughput matters (web-based enrollment can complete faster than a fresh Company Portal install).
- **Either flow supported** — acceptable as long as help-desk runbooks cover both; support cost increases slightly because troubleshooting steps differ between flows.

### Post-Enrollment: What Happens Next

Once the management profile is installed (by either flow), several things happen automatically and do not require additional admin action per device:

- **Compliance evaluation begins.** Within the 0-30 minute window after enrollment, the device evaluates against every assigned compliance policy (see [Compliance Policy § Compliance Evaluation Timing](06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access) for timing mechanics).
- **Configuration profiles deliver.** Wi-Fi, VPN, email, certificate, and device-restriction profiles (see [Configuration Profiles](04-configuration-profiles.md)) arrive over APNs and install without further user consent.
- **Assigned apps deliver.** Required VPP device-licensed, VPP user-licensed, LOB, and Store apps begin to install per their respective mechanisms (see [App Deployment](05-app-deployment.md)).
- **Conditional Access enforces compliance state.** Any CA policy that requires "device marked compliant" starts admitting or blocking the device based on the compliance record from the step above.

The user can open the Company Portal app (if installed) to see the managed device and any Available-assignment apps. The Intune admin center device-overview pane shows Management state "Managed", a device check-in timestamp, and (once evaluation completes) a Compliance status.

## Personal vs Corporate Ownership

Intune assigns every iOS/iPadOS device an ownership designation of **Personal** or **Corporate** that affects wipe scope, compliance evaluation options, and the default personal-data-protection posture. Device Enrollment enrolls devices as Personal by default.

### Ownership Designation Effects

| Effect | Personal | Corporate |
|--------|----------|-----------|
| **Wipe scope** | Retire removes corporate data and policies only; device remains usable | Wipe resets device to factory state (MDM RemoteWipe) |
| **Activation Lock bypass after wipe** | Not available (user Apple Account controls Activation Lock) | Can be cleared with supervised mode (not available on Device Enrollment even for Corporate) |
| **Inventory scope** | Intune inventories only managed content (managed apps, profiles) on personal-ownership devices; Apple Platform Deployment Reference defines this managed-content boundary | Intune can inventory full device scope including installed apps, but only insofar as iOS APIs expose this data to MDM |
| **Compliance action enforcement** | Retire is the terminal noncompliance action | Retire or Wipe available as terminal noncompliance actions |
| **Default Intune designation on Device Enrollment** | Set automatically at enrollment; no admin intervention required | Requires administrator action (device identifier upload or Graph PATCH) after or before enrollment |
| **Admin reporting semantics** | Counted as personal/BYOD in Intune dashboards and Microsoft Graph `managedDeviceOwnerType=personal` | Counted as corporate in Intune dashboards and `managedDeviceOwnerType=company` |

### Reclassifying a Device as Corporate

A Device-Enrollment-enrolled device defaults to Personal. To reclassify as Corporate (for example, when an admin takes ownership of a BYOD device that will be repurposed as a shared corporate device), use one of:

- **Device identifier upload** — Upload a CSV of IMEI, serial number, or Apple Account identifiers to Intune via **Devices** > **Enrollment** > **Corporate device identifiers**. Devices matching the identifier are marked Corporate at next check-in.
- **Bulk-update via Microsoft Graph** — `PATCH` the device object's `managedDeviceOwnerType` field (advanced; verify current Graph schema against Microsoft Learn at time of writing).

Reclassification does NOT change the device's supervision state — the device remains unsupervised. To gain supervised capabilities, the device must be wiped and re-enrolled via ADE (see [ADE Enrollment Profile](03-ade-enrollment-profile.md)).

### Identifier Upload Workflow

Corporate device identifier upload is the most common mechanism for reclassifying Device-Enrollment devices as Corporate. The identifier options and their trade-offs:

- **IMEI** — Cellular devices only (iPads with LTE/5G, iPhones). IMEI is printed on the device and retrievable via **Settings** > **General** > **About**. IMEI-matching is stable across resets and reassignment.
- **Serial number** — Works for all iOS/iPadOS hardware. Serial numbers are retrievable from the device, from purchase records, or from an MDM device list. Preferred identifier for Wi-Fi-only iPads (which have no IMEI).
- **Apple Account identifier** — Less common for iOS; more often used for macOS. Ties the Corporate designation to an Apple Account rather than a specific device.

Identifier matching happens at the next device check-in after upload, which typically means within a few minutes (APNs push) to several hours (if the device is offline at upload time). Bulk identifier upload via CSV is the typical pattern for fleet reclassification events.

### Unenrollment and Wipe Behavior

How a Device-Enrollment device leaves management depends on ownership and who initiates removal:

- **User-initiated removal (Personal devices)** — On Device Enrollment (which is unsupervised), the user can remove the management profile via **Settings** > **General** > **VPN & Device Management** at any time. Removal deletes the MDM profile, all managed configuration profiles, and any VPP user-licensed apps; user data outside the managed scope is untouched.
- **Admin-initiated Retire** — Intune issues a Retire command over APNs. For Personal devices, Retire removes corporate data and policies only. For Corporate devices, Retire does the same — use Wipe instead for a factory reset.
- **Admin-initiated Wipe** — Available for Corporate devices only on Device Enrollment; triggers a factory reset via the iOS MDM RemoteWipe command. Not available for Personal devices (the Retire scope is the maximum).
- **Compliance-triggered Retire** — Compliance policies with a terminal Retire action automatically retire noncompliant devices after the configured grace period.

## Verification

- [ ] Device appears in Intune admin center under **Devices** > **All devices** with the expected user UPN and a Management Name following the tenant's naming convention
- [ ] Device ownership designation matches expectation (Personal by default; Corporate after identifier upload)
- [ ] Device shows Management state "Managed" and MDM "Intune" in the Intune admin center device overview pane
- [ ] Compliance state moves from "Not evaluated" to "Compliant" or "Not compliant" within the expected window (see [Compliance Policy § Compliance Evaluation Timing](06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access))
- [ ] Assigned configuration profiles arrive on the device (check **Settings** > **General** > **VPN & Device Management** on device to confirm the MDM profile is present)
- [ ] Assigned Required apps (managed apps) begin to appear on the device home screen or in the App Library
- [ ] Company Portal self-service actions (sync, rename, retire) succeed from the device (if Company Portal is installed)
- [ ] For Company Portal flow: Company Portal app shows the device as managed with corporate resources visible
- [ ] Intune device properties include a recent check-in timestamp (within the last 8 hours) confirming MDM push notifications are being delivered via APNs

### If Enrollment Does Not Complete

If a verification item fails, start the triage from the symptom first observed by the user or admin:

- **Device never reaches Intune admin center** — Likely a tenant-level block (APNs, enrollment restriction, license) or a network-access issue on the device. See the Configuration-Caused Failures table below.
- **Device appears but stays "Not evaluated"** — Compliance evaluation has not yet run; wait the expected window or force a sync from Company Portal.
- **Assigned profiles or apps do not arrive** — Check assignment scope (the user or device is actually targeted), then confirm check-in timestamp to ensure APNs is healthy end-to-end.

Full triage trees for each symptom live in the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) and are executed via the [iOS L1 Runbooks 16-21](../l1-runbooks/00-index.md#ios-l1-runbooks).

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Personally-owned enrollment blocked at tenant level when BYOD users attempt to enroll | Intune | Company Portal or web enrollment fails at the "this device can't be managed" step; no device appears in Intune | [Runbook 18: Enrollment Restriction Blocking](../l1-runbooks/18-ios-enrollment-restriction-blocking.md) |
| APNs certificate expired | Intune | All iOS enrollment attempts fail silently; no device arrives in Intune; MDM check-in on previously enrolled devices also fails | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |
| Per-user device limit reached | Intune | Enrollment fails with "device limit reached" user-visible message after sign-in | [Runbook 20: Device Cap Reached](../l1-runbooks/20-ios-device-cap-reached.md) |
| Intune license not assigned to enrolling user | Intune / Entra | Enrollment sign-in succeeds but MDM profile never downloads; Intune shows no device for the user | [Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md) |
| Web-based enrollment attempted from non-Safari browser | Device | Enrollment URL loads; sign-in succeeds; management-profile download button does nothing or errors | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook; user-education and browser-switch instruction, NOT an L1 triage scenario |
| Compliance policy requires passcode of length greater than device-native limit | Intune | Device enrolls but immediately shows non-compliant for passcode; user cannot comply | [Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, passcode native-limit conflict) |
| Company Portal app not assigned and user tenant restricts App Store access | Intune | User cannot install Company Portal; Flow 1 enrollment blocked for affected users | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for app-assignment-blocks-enrollment flow; admin action on Company Portal assignment scope + L2 investigation |
| User expected fully silent app install after enrollment (unsupervised Device Enrollment) | Intune | Even device-licensed VPP apps prompt for install confirmation once; this is expected, not a failure — see [Capabilities Available Without Supervision](#capabilities-available-without-supervision) | Not a failure — see the Capabilities section linked at left. If user persistently cannot accept, see [Runbook 21](../l1-runbooks/21-ios-compliance-blocked.md) Cause B as fallback investigation. |
| Device enrolled as Personal but admin expected Corporate (no identifier upload performed) | Intune | Compliance and wipe actions behave as Personal; admin cannot issue full-device wipe | [iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md) — No L1 runbook for ownership-misassignment; admin reviews corporate-identifier upload; L2 reconciliation if needed |
| User signs in with a personal (non-work) account during enrollment | Intune / Entra | Enrollment fails or completes against the wrong tenant; no managed device appears for the corporate tenant | [Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md) — user enrollment with non-work account manifests as "no Intune license for user" from tenant perspective; runbook 19 Stage-1 error flow applies |
| Conditional Access policy blocks enrollment endpoint during sign-in | Entra | User sees "Access denied" or "This operation is not allowed" before reaching the profile-download step | [Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md) — Signature (c) "Microsoft sign-in never appears / CA block" covers this directly; for NON-ADE paths (Device Enrollment) the symptom still matches R17 signature c best among available L1 runbooks |

## See Also

- [iOS/iPadOS Admin Setup Overview](00-overview.md) — Path router and shared Intune Enrollment Restrictions section
- [User Enrollment](08-user-enrollment.md) — Privacy-preserving account-driven enrollment alternative
- [MAM App Protection](09-mam-app-protection.md) — App-layer protection without device enrollment
- [ADE Enrollment Profile](03-ade-enrollment-profile.md) — Supervised corporate enrollment (prerequisite for supervised-only features)
- [Configuration Profiles](04-configuration-profiles.md) — Wi-Fi/VPN/Certificates/Device Restrictions delivery
- [App Deployment](05-app-deployment.md) — VPP / LOB / Store apps
- [Compliance Policies](06-compliance-policy.md) — OS version, passcode, jailbreak, CA timing
- [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md) — Conceptual path comparison
- [Apple Provisioning Glossary](../_glossary-macos.md)

---
*Previous: [Compliance Policies](06-compliance-policy.md) | Next: [User Enrollment](08-user-enrollment.md) | [Back to Overview](00-overview.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |
| 2026-04-17 | Initial version — iOS/iPadOS Device Enrollment admin guide covering Company Portal and web-based flows, capabilities available without supervision, and personal vs corporate ownership | -- |
