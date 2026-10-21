---
last_verified: 2026-10-21
review_by: 2026-12-20
applies_to: all
audience: admin
platform: iOS
---

> **Platform applicability:** This guide is iOS/iPadOS-specific (DDM update policies for
> supervised and unsupervised iOS 17+ devices). For the cross-platform overview, see
> [Patch Management Overview](00-overview.md).
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md).
> **macOS:** See [macOS DDM Update Enforcement](02-macos-update-enforcement.md).
> **Android:** See [Android Patch Delivery](04-android-patch-delivery.md).

# iOS Update Lifecycle: DDM-Based Enforcement

This guide is the iOS/iPadOS-specific patch and update lifecycle reference. It covers the
**Declarative Device Management (DDM)** update keys, how to create the Intune settings catalog
policy that delivers them, and which enrollment types can receive them. DDM update enforcement
works on both supervised and **unsupervised** iOS 17+ devices; it doesn't work on User Enrollment
devices.

For the cross-platform comparison, see [Patch Management Overview](00-overview.md). For macOS
DDM (the related Apple platform), see [macOS DDM Update Enforcement](02-macos-update-enforcement.md).

## iOS Update Enforcement Model

iOS update enforcement uses **DDM (Declarative Device Management)** as the canonical mechanism for
iOS 17 and later. The DDM update model differs from legacy MDM update commands:

- **Declarative:** The MDM server (Intune) declares the target version and enforcement deadline;
  the OS itself enforces installation. The server doesn't push an explicit install command to
  each device.
- **Per-device declaration:** Each enrolled device receives a DDM software update declaration
  that describes the required iOS version and deadline.
- **OS-managed user notification:** The OS shows update notifications to the user as the deadline
  approaches, and the user can't defer past the deadline. A separate Software Update Settings
  policy can limit these to the notification one hour before the deadline and the restart
  countdown.

Configuration path: **Devices** > **Manage devices** > **Configuration** > **Create** > **New
policy**, with platform **iOS/iPadOS** and profile type **Settings catalog**. The profile uses
the DDM update keys enumerated in [DDM Update Keys](#ddm-update-keys); for the full procedure,
see [Create the DDM Update Policy](#create-ddm-update-policy).

**Eligibility:** iOS 17.0 and later. Earlier iOS versions can't receive DDM update enforcement.
They rely on the legacy, supervised-only MDM mechanisms: the device restriction "Defer software
updates" (`forceDelayedSoftwareUpdates`) and the `ScheduleOSUpdate` command. Apple deprecated
both in iOS 26.0 and removed them in iOS 27.0, and Microsoft states that Intune will end support
for MDM-based Apple software update policies.

**Source:** [Apple device-management schema: Schedule OS Update command](https://github.com/apple/device-management/blob/release/mdm/commands/system.update.schedule.yaml) and [Apple device-management schema: Restrictions payload](https://github.com/apple/device-management/blob/release/mdm/profiles/com.apple.applicationaccess.yaml) (Release-v27.0, updated 2026-09-17)—the supervised-only requirement, the iOS 26.0 deprecation, and the iOS 27.0 removal. [Use Microsoft Intune to manage software updates for supervised iOS/iPadOS devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios) (updated 2025-10-15)—Intune's end of support for MDM-based policies.

<a id="ddm-update-keys"></a>
## DDM Update Keys

Apple's software update enforcement declaration,
`com.apple.configuration.softwareupdate.enforcement.specific`, has four keys. Intune shows them
in the **Software Update** settings catalog configuration under the display names in the
following table:

| Settings Catalog Display Name | Declarative Key | Type | Description |
|---|---|---|---|
| Target OS Version | `TargetOSVersion` | string | Required. The iOS version that the device must reach by `TargetLocalDateTime`, for example `18.2`. |
| Target Build Version | `TargetBuildVersion` | string | Optional. A specific build, for example `22C152`, which can include a supplemental version identifier. Apple recommends it for testing during seeding (beta) periods. |
| Target Date Time | `TargetLocalDateTime` | string (local date and time) | Required. The hard deadline for the device to be on `TargetOSVersion`. Format: `YYYY-MM-DDTHH:MM:SS` in device-local time, with no time zone offset. |
| Details URL | `DetailsURL` | string | Optional. A web page with your organization's details about the enforced update. |

**Minimum required keys:** `TargetOSVersion` + `TargetLocalDateTime`.

Intune's **Software Update Enforce Latest** configuration has two more settings, **Delay in
Days** and **Install Time**. Neither has a matching key in Apple's enforcement declaration, and
Apple's schema defines no separate enforce-latest declaration.

If `TargetOSVersion` and `TargetBuildVersion` don't match an available update, the device keeps
the declaration active but can't update. If a matching update becomes available later, the
device processes it.

**`OfferPrograms` isn't an enforcement key.** It's a subkey of the `Beta` dictionary in a separate
declaration, `com.apple.configuration.softwareupdate.settings`, and it governs beta-program
enrollment, not update enforcement. Intune shows that declaration as its own **Software Update
Settings** configuration in the same **Declarative Device Management** category. Earlier
versions of this guide listed `OfferPrograms` as a fourth enforcement key.

**Source:** [Apple device-management schema: softwareupdate.enforcement.specific](https://github.com/apple/device-management/blob/release/declarative/declarations/configurations/softwareupdate.enforcement.specific.yaml) and [softwareupdate.settings](https://github.com/apple/device-management/blob/release/declarative/declarations/configurations/softwareupdate.settings.yaml) (Release-v27.0, updated 2026-09-17)—the four enforcement keys, their presence and formats, the unmatched-update behavior, and the `Beta` dictionary.

**Source:** [Configure update policies for Apple devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/) (updated 2026-02-24)—the Settings Catalog display names and the Enforce Latest settings. [Intune: ref-apple-settings](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings) (updated 2024-11-13)—Software Update and Software Update Settings as separate configurations in the Declarative Device Management category.

<a id="create-ddm-update-policy"></a>
## Create the DDM Update Policy

You create a DDM update policy as a settings catalog profile. The settings catalog offers two
update categories under **Declarative Device Management**. Choose the one that matches how much
control you need over the OS version:

- **Software Update Enforce Latest:** devices install the most recent OS version that Apple
  releases, after a delay that you set. Use this category when you want fast patching with
  little ongoing administrator work.
- **Software Update:** devices install the OS version that you specify, by a deadline that you
  set. Use this category when you need control over the version, for example for app
  compatibility testing or a ring-based rollout. These are the keys in
  [DDM Update Keys](#ddm-update-keys).

Before you start, confirm the following:

- Devices run iOS 17.0 or iPadOS 17.0 or later.
- Devices enrolled through Device Enrollment or Automated Device Enrollment. These are the
  enrollment methods that Microsoft lists as supported for this policy.
- Your account has at least the **Policy and Profile Manager** built-in Intune role.

To create the policy, do the following:

1. Sign in to the [Microsoft Intune admin center](https://go.microsoft.com/fwlink/?linkid=2109431).
2. Select **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy**.
3. For **Platform**, select **iOS/iPadOS**.
4. For **Profile type**, select **Settings catalog**, and then select **Create**.
5. On the **Basics** page, enter a **Name** that identifies the platform, the update target, and
   the ring, for example `iOS: DDM update - pilot ring`. Optionally, enter a **Description**.
6. Select **Next**.
7. On the **Configuration settings** page, select **Add settings**.
8. In the settings picker, select the **Declarative Device Management** category, and then select
   **Software Update Enforce Latest** or **Software Update**.
9. Add the settings that your category needs, and then close the settings picker. For the
   settings and their values, see
   [Software Update Enforce Latest Settings](#software-update-enforce-latest-settings) or
   [Software Update Settings for a Targeted Version](#software-update-targeted-settings).
10. Enter a value for each setting, and then select **Next**.
11. Optional: On the **Scope tags** page, add scope tags, and then select **Next**.
12. On the **Assignments** page, select the group of users or devices that receives the policy,
    and then select **Next**.
13. On the **Review + create** page, review the settings, and then select **Create**.

Devices apply the policy the next time they check in with Intune.

To stage a rollout, create one **Software Update** policy for each ring and assign each policy to
that ring's group. Set each policy's **Target Date Time** by using the offsets in
[Rollout Patterns](#rollout-patterns).

<a id="software-update-enforce-latest-settings"></a>
### Software Update Enforce Latest Settings

| Setting | Value |
|---|---|
| **Delay in Days** | The number of days before the update deadline takes effect. The delay counts from either the date that Apple posts the update or the date that you configure the policy. The delay sets only the enforcement deadline; it doesn't change when the device offers the update to users. |
| **Install Time** | The local device time when the device enforces the update, in 24-hour format with a leading zero, for example `02:00`. Midnight is `00:00` and 11:59 PM is `23:59`. |

<a id="software-update-targeted-settings"></a>
### Software Update Settings for a Targeted Version

| Setting | Value |
|---|---|
| **Target OS Version** | Required. The OS version that devices update to, for example `26.0`. You can include a supplemental version identifier, for example `26.0.1`. |
| **Target Date Time** | Required. The date and time when the device forces the installation, in the device's local time zone. For example, a policy set to 2:00 PM installs at 2:00 PM local time on each device. |
| **Target Build Version** | Optional. The build that devices update to, for example `25A354` or `25A354a`. If this value doesn't match **Target OS Version**, **Target OS Version** takes precedence. |
| **Details URL** | Optional. The URL of a web page, typically hosted by your organization, that gives users help with the update. |

If the user hasn't installed the update by **Target Date Time**, the device shows a one-minute
countdown, and then installs the update and restarts. If the device is off at the deadline, it
gets a one-hour grace period after it powers on, and then installs the update and restarts.

While an update enforcement policy applies to the device, the device ignores its software update
settings, including automatic update actions. The update can install before the deadline if the
device is idle.

<a id="confirm-ddm-update-policy"></a>
### Confirm That Devices Update

A policy status of **Success** means only that the policy installed on the device, not that the
device updated. To confirm the update itself, use the Apple software update reports:

- **Summary:** select **Reports** > **Device management** > **Apple updates** > **Summary**.
- **Fleet report:** select **Reports** > **Device management** > **Apple updates** >
  **Reports** > **Apple software update report**, and then select **Generate**.
- **Failures:** select **Devices** > **Monitor** > **Apple software update failures**.
- **Single device:** select **Devices** > **iOS/iPadOS**, select the device, and then select
  **Monitor** > **iOS software updates**.

After a device updates to a later OS version than a **Software Update** policy targets, that
policy reports an error, because the device treats the policy as a downgrade. Remove that
earlier-version policy from those devices.

**Source:** [Configure update policies for Apple devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/) (updated 2026-02-24)—both setting categories, setting values, deadline behavior, supported enrollment methods, and the Success-status caveat.

**Source:** [Create a policy using settings catalog in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/) (updated 2026-09-17)—the admin center path, the minimum role, and the profile creation steps.

**Source:** [View software update reports for Apple devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/monitor-reports) (updated 2025-10-14)—the report paths.

## Supervision and Enrollment Type

DDM update enforcement doesn't require supervision. On iOS, Apple's enforcement declaration
allows supervised devices and unsupervised Device Enrollment devices, and it has allowed
unsupervised Device Enrollment since Apple introduced the declaration in iOS 17.0. The
declaration has never allowed User Enrollment, so BYOD devices enrolled through User Enrollment
can't receive DDM update enforcement.

The supervised-only requirement belongs to the legacy mechanisms: the `ScheduleOSUpdate` command
and the `forceDelayedSoftwareUpdates` restriction both require supervision, and Apple removed both
in iOS 27.0.

**Correction to earlier versions of this guide:** Earlier versions said that a supervised-only
DDM constraint was retracted in August 2025 and that User Enrollment (BYOD) devices became
eligible at that point. Apple's schema history supports neither claim. Every release of the
declaration since iOS 17.0 allows unsupervised Device Enrollment, nothing changed in 2025, and no
release allows User Enrollment.

Cross-references from iOS admin-setup content forward here as the canonical iOS update
enforcement reference.

**Source:** [Apple device-management schema: softwareupdate.enforcement.specific](https://github.com/apple/device-management/blob/release/declarative/declarations/configurations/softwareupdate.enforcement.specific.yaml), commit history from Release_iOS-17-0_macOS-14-0 (2023-09-14) through Release-v27.0 (2026-09-17)—the allowed enrollment types for iOS in every release.

## Supervision Matrix: DDM Update Enforcement

| Enrollment Type | Supervision | Apple Declaration Allows | Microsoft Lists as Supported |
|-----------------|-------------|--------------------------|------------------------------|
| ADE / Apple Business Manager | Supervised | ✅ Yes | ✅ Yes (Automated Device Enrollment) |
| ADE / Apple School Manager | Supervised | ✅ Yes | ✅ Yes (Automated Device Enrollment) |
| Device Enrollment (corporate, non-supervised) | Unsupervised | ✅ Yes | ✅ Yes (Device Enrollment) |
| Account-driven Device Enrollment | Unsupervised | ✅ Yes (device enrollment type) | Not listed separately |
| User Enrollment (BYOD) | Unsupervised | ❌ No | ❌ Not listed |

**Forward-compatibility note:** Apple has moved update enforcement to DDM. Standardize long-term
update enforcement on DDM regardless of supervision state. The
legacy `ScheduleOSUpdate` command and `forceDelayedSoftwareUpdates` restriction no longer work on
devices that run iOS 27.0 or later.

## Rollout Patterns

Administrators typically deploy iOS DDM update policies through Intune in three rollout stages:

1. **Pilot ring (devices in a pilot Microsoft Entra group):** TargetLocalDateTime = +14 days from
   policy assignment. Validate the update success rate before promotion.
2. **Broad ring (production fleet):** TargetLocalDateTime = +30 days from major iOS release.
   Standard cadence for non-security-critical updates.
3. **Critical ring (security-driven):** TargetLocalDateTime = +7 days. Used when Apple ships an
   urgent security update.

Each ring can include supervised devices and unsupervised Device Enrollment devices, but not
User Enrollment devices. The DDM declaration itself doesn't distinguish supervision state.

## Related Resources

- [Patch Management Overview](00-overview.md)—Cross-platform comparison + Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md)—Windows forward path
- [macOS DDM Update Enforcement](02-macos-update-enforcement.md)—Related Apple-platform DDM guide
- [Android Patch Delivery](04-android-patch-delivery.md)—Android attestation gate

## External References

- [Configure Update Policies for Apple Devices (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/apple/)
- [Manage Software Updates for Supervised iOS/iPadOS Devices, Legacy MDM Policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios)
- [Software Update Enforcement Specific (Apple Developer)](https://developer.apple.com/documentation/devicemanagement/softwareupdateenforcementspecific)
- [About Software Updates (Apple Platform Deployment)](https://support.apple.com/guide/deployment/about-software-updates-depc4c80847a/web)
