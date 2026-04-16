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
