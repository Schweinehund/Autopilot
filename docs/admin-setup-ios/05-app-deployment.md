---
last_verified: 2026-04-16
review_by: 2026-07-15
applies_to: ADE
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS ADE configuration via Apple Business Manager and Intune.
> For macOS app deployment, see [macOS App Deployment](../admin-setup-macos/04-app-deployment.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS App Deployment

Intune supports four distinct iOS/iPadOS app deployment types: VPP device-licensed, VPP user-licensed, LOB (.ipa), and Store apps without VPP. The VPP device-licensed vs user-licensed distinction is the single most common source of admin confusion — these two license types differ fundamentally in how they relate to Apple Accounts, supervision requirements, and silent install capability. Managed apps (deployed through Intune) can be verified through the Intune admin center using three distinct views. Unmanaged apps (user-installed from the App Store without Intune intermediation) have no install status tracking in Intune.

## Key Concepts Before You Begin

### Managed vs Unmanaged Apps

A managed app is any app deployed through Intune — VPP (device or user-licensed), LOB, or Store apps deployed as Required or Available through Intune. An unmanaged app is an app installed directly by the user from the App Store without Intune intermediation; Intune has no install-status record for unmanaged apps and cannot remove them via selective wipe. A VPP Available assignment transitions from "Available" tracking to "Managed" only after the user initiates the install from Company Portal — before that, the app is tracked as Available but is not yet managed.

### VPP Device-Licensed vs User-Licensed

Device-licensed VPP assigns one license per device (tied to serial number) and requires no Apple Account on the device; user-licensed VPP assigns one license per user (usable on up to 5 devices per personal Apple Account) and requires the user to sign in with an Apple Account to accept the VPP invitation.

Device licensing is strongly recommended for corporate-owned devices because it eliminates the Apple Account dependency. User licensing is required for User Enrollment (BYOD) and for apps that include Books content.

> **What breaks if misconfigured:** Deploying a VPP app as user-licensed to a device that has "Block App Store" in its device restrictions breaks the VPP invitation flow — the user cannot accept the invitation because the invitation requires App Store access. Symptom appears in: device (VPP invitation prompt appears but user cannot proceed) and Intune admin center (user license shows "Invitation sent" indefinitely).

### Silent Install Boundary

Whether iOS prompts the user during app installation depends on four axes: supervision state (supervised or unsupervised), licensing type (device or user), enrollment type (ADE, Device Enrollment, User Enrollment, BYOD), and Apple Account presence. The authoritative Microsoft-documented behavior is summarized below.

| # | Scenario | Apple Account prompt | Install prompt |
|---|----------|:---------------------:|:----------------:|
| 1 | BYOD — user licensed (not User Enrollment) | Yes | Yes |
| 2 | Corp — user licensed (not supervised) | Yes | Yes |
| 3 | Corp — user licensed (**supervised**) | Yes (for VPP invite) | **No** |
| 4 | BYOD — device licensed | **No** | Yes |
| 5 | Corp — device licensed (not supervised) | **No** | Yes |
| 6 | Corp — device licensed (**supervised**) | **No** | **No** (fully silent) |

> 🔒 **Supervised only:** Fully silent app installation (no user prompt of any kind) requires supervised mode AND device licensing. On unsupervised devices, device-licensed apps still install without an Apple Account prompt, but the user sees a one-time install confirmation. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

## App Type Comparison Table

The table below summarizes the four deployment types against the attributes that most commonly affect deployment decisions. Use this as the starting point when choosing a deployment method for a specific app.

| Attribute | VPP Device-Licensed | VPP User-Licensed | LOB (.ipa) | Store Apps (without VPP) |
|-----------|---------------------|-------------------|------------|--------------------------|
| Apple Account required | No | Yes (personal Apple Account or Managed Apple Account for User Enrollment) | No | Yes (user installs manually) |
| Silent install (supervised) | **Yes** | No (Apple Account prompt) | Yes (signed + provisioning profile) | No |
| Silent install (unsupervised) | Partial (single install prompt) | No | Yes (signed + provisioning profile) | No |
| User Enrollment compatibility | No | Yes (Managed Apple Account only) | Limited | Yes |
| ADE compatibility | Yes | Yes | Yes | Yes |
| Device Enrollment compatibility | Yes | Yes (personal Apple Account) | Yes | Yes |
| Assignment types | Required, Available for enrolled, Uninstall | Required, Available for enrolled, Uninstall | Required, Available for enrolled, Available w/o enrollment, Uninstall | Required, Available for enrolled, Uninstall |
| Available deployment intent for device groups | No (user groups only) | No (user groups only) | Yes for Required; No for Available | No (user groups only) |
| License model | One license per device | One license / up to 5 devices per user | N/A (owned app) | N/A (user's own licensing) |
| Size limit | N/A (App Store) | N/A (App Store) | **2 GB per app** | N/A (App Store) |
| Update mechanism | Token-level auto-update; Intune sync | Token-level auto-update; Intune sync | CFBundleVersion increment + re-upload | App Store |
| Book support | No | Yes | No | No |

## Prerequisites

### VPP Prerequisites

- Apple Business Manager account with at least one active Content Manager role
- VPP (Apps and Books) location token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)
- App licenses purchased in ABM (Apps and Books page) — select Device or User licensing at purchase time (Device = recommended default)
- Annual token renewal configured (see Renewal / Maintenance below)

### LOB (.ipa) Prerequisites

- Apple Developer Enterprise Program membership
- `.ipa` file signed with the organizational Distribution certificate
- `.mobileprovision` provisioning profile uploaded via **Apps** > **iOS/iPadOS** > **iOS app provisioning profiles** (separate object from the app itself)
- Unique `CFBundleVersion` and `CFBundleShortVersionString` in `Info.plist` for each uploaded version
- `.ipa` file size ≤ 2 GB (hard limit)

### Store App Prerequisites

- Apple Account signed in on the device (free or paid App Store apps without VPP install under the user's own licensing)
- Device must have App Store access (not blocked by a "Block App Store" device restriction)

## VPP Device-Licensed

#### In Apple Business Manager

1. Sign in to [Apple Business Manager](https://business.apple.com).
2. Navigate to **Apps and Books**. Search for the app. Purchase licenses with **Assign to: Devices** (device licensing). Confirm location.

#### In Intune admin center

1. Verify the VPP token is synced: **Tenant administration** > **Connectors and tokens** > **Apple VPP tokens**.
2. The purchased app appears automatically under **Apps** > **iOS/iPadOS**.
3. Select the app > **Properties** > **Assignments** > **Add group**. Use **Required** to device groups or user groups.
4. Under **App information**, confirm **License type: Device**.

> 🔒 **Supervised only:** Silent install of VPP device-licensed apps — the user sees no prompt of any kind on install — requires supervised mode. On unsupervised devices, device-licensed apps install without an Apple Account prompt but the user sees a one-time install confirmation. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

> **What breaks if misconfigured:** Assigning VPP device-licensed apps as Available (rather than Required) to device groups does not work — Available for device groups applies only to Required intent. Use Required for device groups; Available requires user groups. Symptom appears in: Intune admin center (assignment succeeds) but device (Company Portal does not list the app).

## VPP User-Licensed

#### In Apple Business Manager

1. Navigate to **Apps and Books**. Purchase licenses with **Assign to: Users**.

#### In Intune admin center

1. The app appears under **Apps** > **iOS/iPadOS** after VPP sync.
2. Select the app > **Properties** > **App information** > confirm **License type: User**.
3. Assign to user groups (Required or Available for enrolled — device group assignment is not available for user-licensed VPP).

First-time users receive a VPP invitation requiring App Store sign-in with a personal Apple Account (or Managed Apple Account for User Enrollment). Only after acceptance does the app install.

> 🔒 **Supervised only:** Silent install is NOT available for VPP user-licensed apps regardless of supervision state — the user always sees an Apple Account prompt for the VPP invitation. For silent install, switch to VPP device licensing, which is the fully silent option on supervised devices. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

> **What breaks if misconfigured:** Assigning VPP user-licensed apps on devices that have "Block App Store" in device restrictions breaks the VPP invitation flow — the user cannot accept the invitation (invitation requires App Store access). Symptom appears in: device (invitation shows but user cannot proceed) and Intune admin center (user license stuck in "Invitation sent" state).

## LOB (.ipa)

#### In Intune admin center

1. Navigate to **Apps** > **iOS/iPadOS** > **Add** > **Line-of-business app**.
2. Select the signed `.ipa` file (≤ 2 GB).
3. Configure app information (name, description, publisher, category, minimum OS version).
4. Upload the `.mobileprovision` provisioning profile separately via **Apps** > **iOS app provisioning profiles** (Distribution certificate expires after 3 years; provisioning profile expires after 1 year).
5. Assign: Required, Available for enrolled devices, Available with or without enrollment (unique to LOB), or Uninstall.

LOB apps can install silently on both supervised and unsupervised devices because Apple trusts the enterprise signature — no Apple Account required. No 🔒 callout applies to LOB silent install because it is signature-gated, not supervision-gated.

> **What breaks if misconfigured:** Distribution certificate or provisioning profile expiring (Distribution = 3 years; provisioning profile = 1 year) causes all existing LOB installs to fail to launch with no install of new versions. Symptom appears in: device (app crashes on launch with "Unable to Verify App") and Intune admin center (push notification at 30-day expiry warning; stale apps silent-fail thereafter).

> **What breaks if misconfigured:** Uploading an `.ipa` file > 2 GB causes Intune to reject the upload. Resolution: reduce app size or split into modules. Symptom appears in: Intune admin center (upload error).

## Store Apps (without VPP)

#### In Intune admin center

1. Navigate to **Apps** > **iOS/iPadOS** > **Add** > **iOS store app**.
2. Search the App Store for the app (by name or App Store URL) — select the bundle ID to add it.
3. Assign: Required (forces Company Portal download), Available for enrolled devices, or Uninstall.

Store apps without VPP require the user to have an Apple Account signed in on the device. Intune cannot assign licenses for these apps — it only tells the device "install this bundle ID from the App Store." Paid apps require the user to already own the app via their personal Apple Account; for paid corporate apps, use VPP instead.

> **What breaks if misconfigured:** Deploying a paid Store app without VPP to corporate devices requires each user to have purchased the app personally — creates licensing and audit problems. Use VPP for all paid corporate apps. Symptom appears in: device (App Store shows "Buy" prompt rather than silent install).

## Verification

The Intune admin center exposes managed app installation status in three locations. Use the appropriate one depending on the scope of your check:

### 1. App-centric view (primary)

Navigate to **Apps** > **All apps** > [select app] > **Monitor** > **Device install status** or **User install status**. Shows per-device / per-user:

- Install Status (Installed, Install Pending, Failed, Not Applicable, Uninstalled)
- Timestamp of last status update
- Error code and detail (for Failed entries)

### 2. Device-centric view

Navigate to **Devices** > **All devices** > [select device] > **Managed Apps**. Shows end-to-end app lifecycle for the individual device: targeted, delivered, install status, last check-in.

### 3. Troubleshooting view

Navigate to **Troubleshoot + support** > **Troubleshoot** > enter user > **Managed Apps** pane. User-centric per-app history across all of the user's devices — use when a single user reports an install problem across multiple devices.

**Managed vs unmanaged distinction:** Managed apps = apps deployed via Intune (VPP, LOB, Store-as-Required/Available). Unmanaged apps = apps installed directly by the user from App Store with no Intune assignment record. Unmanaged apps do not appear in any of the three views above.

**Verification checklist:**

- [ ] VPP token shows Active status under Tenant administration > Connectors and tokens > Apple VPP tokens
- [ ] VPP app license count in Intune matches purchased quantity in ABM
- [ ] LOB provisioning profile shows > 30 days until expiry under Apps > iOS app provisioning profiles
- [ ] Test-assigned app shows "Installed" status for at least one target device in the App-centric view
- [ ] For VPP user-licensed apps, at least one user has accepted the VPP invitation (user license status transitions from "Invitation sent" to "Assigned")

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| VPP user-licensed app assigned to device with "Block App Store" restriction | Intune | Invitation cannot be accepted; user license stuck in "Invitation sent" | iOS L1 runbooks (Phase 30) |
| VPP Available intent assigned to device groups | Intune | App does not appear in Company Portal; assignment silently fails | iOS L1 runbooks (Phase 30) |
| VPP device-licensed app assigned to unsupervised device, admin expected silent install | Intune | User sees one-time install prompt instead of silent install | iOS L1 runbooks (Phase 30) |
| VPP user-licensed app assigned to unsupervised device, admin expected silent install | Intune | User sees Apple Account prompt AND install prompt (silent install NOT available for user licensing) | iOS L1 runbooks (Phase 30) |
| LOB .ipa > 2 GB | Intune | Upload fails with size-limit error | iOS L1 runbooks (Phase 30) |
| LOB Distribution certificate expired (3-year lifecycle) | Intune | All existing LOB apps fail to launch with "Unable to Verify App" | iOS L1 runbooks (Phase 30) |
| LOB provisioning profile expired (1-year lifecycle) | Intune | Existing LOB app installs stop launching; new installs fail to complete | iOS L1 runbooks (Phase 30) |
| Store app deployed without VPP on corporate devices expecting silent install | Intune | User sees Apple Account / Get prompt; paid apps block with "Buy" prompt | iOS L1 runbooks (Phase 30) |
| VPP token not renewed before annual expiry | Intune | VPP apps stop syncing from ABM; existing installs unaffected | iOS L1 runbooks (Phase 30) |
| LOB app CFBundleVersion not incremented on re-upload | Intune | Devices do not detect a new version; existing installed version remains | iOS L1 runbooks (Phase 30) |

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| VPP (Apps and Books) location token | Annual (365 days) | VPP apps stop syncing from ABM; existing installs unaffected but no new assignments, revocations, or license management until renewed | 1. In ABM: **Preferences** > **Payments and Billing** > **Apps and Books** > **Content Tokens** > **Download**. 2. In Intune: **Tenant administration** > **Connectors and tokens** > **Apple VPP tokens** > [token] > **Edit** > **Upload new token** |
| LOB provisioning profile (.mobileprovision) | Annual (1 year from generation) | Existing LOB app installs fail to launch; new installs fail to complete | 1. Generate new `.mobileprovision` via Apple Developer Enterprise portal. 2. In Intune: **Apps** > **iOS app provisioning profiles** > [profile] > **Properties** > **Upload new provisioning profile**. Intune sends 30-day advance expiry notification. |
| LOB Distribution certificate | 3 years (from Apple Developer Enterprise) | All LOB apps signed with the expired certificate fail to launch with "Unable to Verify App" | Generate new Distribution certificate in Apple Developer Enterprise portal; re-sign and re-upload each LOB `.ipa` with the new certificate. |
| APNs certificate | 365 days | iOS MDM communication stops fleet-wide (see [APNs Certificate](01-apns-certificate.md)) | See [APNs Certificate](01-apns-certificate.md) for renewal steps |

## See Also

- [Configuration Profiles](04-configuration-profiles.md) — Wi-Fi/VPN/Certificates delivery (prerequisite for enterprise app infrastructure)
- [Compliance Policies](06-compliance-policy.md)
- [ADE Enrollment Profile](03-ade-enrollment-profile.md) — supervised mode requirement for silent install
- [ABM/ADE Token](02-abm-token.md) — VPP token is administered in the same ABM account
- [APNs Certificate](01-apns-certificate.md)
- [iOS/iPadOS Admin Setup Overview](00-overview.md)
- [iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)
- [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md) — supervision concept anchor
- [macOS App Deployment](../admin-setup-macos/04-app-deployment.md) — parallel macOS guide
- [Apple Provisioning Glossary](../_glossary-macos.md)

---
*Previous: [Configuration Profiles](04-configuration-profiles.md) | Next: [Compliance Policies](06-compliance-policy.md) | [Back to Overview](00-overview.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-16 | Initial version — iOS/iPadOS app deployment guide with Key Concepts section (managed vs unmanaged, VPP device vs user licensing, silent install boundary table), 4-column deployment type comparison, per-type sections with supervised-only silent install callouts, managed app status verification in three admin-center locations, configuration-caused failures, and VPP/LOB renewal cadences | -- |
