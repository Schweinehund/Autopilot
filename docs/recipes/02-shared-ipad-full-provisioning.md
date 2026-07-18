---
doc_id: RE-223
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: ios+shared-ipad
last_verified: 2026-07-17
review_by: 2026-10-15
applies_to: Shared iPad full provisioning (federated Managed Apple Account, device-licensed VPP, per-role layered config)
audience: admin
---

**Platform:** iOS + Shared iPad · **Doc Type:** Guide · **Doc ID:** RE-223 · **Status:** Draft

# Shared iPad Full Provisioning: Federated Sign-In to Verified End State

## Summary

Following this recipe yields a verified, fully-provisioned Shared iPad reached end-to-end from
zero through Intune — a supervised iPadOS device enrolled through Automated Device Enrollment,
signed in with a federated Managed Apple Account, and running device-licensed Required apps. It
requires the Intune Administrator role plus the Entra ID Groups permissions to create the
enrollment policy, configuration profiles, and app assignments this recipe walks through.

> **Scope:** This recipe covers named-user Shared iPad provisioning only.

> It excludes the guest-only "Require Shared iPad temporary session only" mode — a candidate future variant, not implemented here.

> It also excludes compliance policy, Conditional Access, app protection, and email profiles — all unsupported and documented below, never configured.

## Prerequisites

- **Eligibility floor:** iPadOS 13.4 or later with at least 32 GB of storage. (First-party text
  also says "iPadOS 13.3 and later" in the wipe-trigger context specifically — treat 13.4+ as the
  floor to plan for, and 13.3 as the narrower boundary for which devices trigger a wipe if
  targeted, covered at the enrollment-policy step below.)
- **RBAC:** Intune Administrator role (or an equivalent custom role covering enrollment policy,
  configuration profiles, and app assignment).
- **ADE / ABM:** a completed Automated Device Enrollment token synced with Apple Business Manager,
  and Supervised, corporate-owned devices.
- **Federated identity already configured** so users have Managed Apple Accounts before their
  first sign-in — see [Managed Apple Account Provisioning](../cross-platform/apple-business/08-managed-apple-account-provisioning.md)
  for the manual/SCIM/OIDC+JIT setup; this recipe does not re-author that decision matrix.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Compliance policies | Not supported with Shared iPad (Known Limitations) | N/A — no alternative; document as a gap |
| App-based Conditional Access | Not supported with Shared iPad | N/A |
| Device-based Conditional Access | Not supported with Shared iPad | N/A |
| App protection policies | Not supported with Shared iPad | N/A |
| Email profiles | An error occurs when you assign an email profile to a Shared iPad device | N/A |
| Company Portal (app + website) | Not supported with Shared iPad | N/A |
| "Available" app intent / user-licensed VPP | App Store installs are disabled by default on Shared iPad, and user licensing requires a personal Apple Account App Store sign-in the device does not support | Assign apps as Required, device-licensed, to device groups — see the VPP step below |

The Shared iPad passcode is a fixed limitation, not a table row:

> Shared iPad passcodes must have eight alphanumeric characters — not a numeric-only PIN.

> This is unchangeable in Apple Business Manager; the passcode complexity and length settings in Intune device-configuration profiles do not apply to Shared iPad.

> An MDM administrator can set only the grace period — the number of minutes a user has to unlock the iPad without entering a passcode.

## Steps

### Step 1: Configure the ADE enrollment policy

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** > **Apple enrollment** > the
   ADE token > **Enrollment policies** > **Create policy** > **iOS/iPadOS**.

   > Navigation may vary by tenant rollout — the newer **Enrollment policies** experience is
   > replacing the older **Profiles** path; the settings below apply the same way under either.

2. Configure the Shared-iPad-specific toggles:

   | Setting | Value |
   |---------|-------|
   | Enable Shared iPad | Yes |
   | User affinity | Enroll without user affinity |
   | Supervised | Yes |
   | Shared iPad | Yes |

   Do not set **Await final configuration** — it is unavailable in this combination (no user
   affinity + Shared iPad = Yes); see [ADE Enrollment Profile](../admin-setup-ios/03-ade-enrollment-profile.md#await-final-configuration)
   for the general field.

   > **What breaks if misconfigured:** Sending a Shared-iPad-enabled policy to an unsupported device — an iPhone, or an iPad on iPadOS 13.3 or earlier — triggers a wipe.

   > Separately, changing an already-assigned enrollment policy requires a factory reset on the device before the change takes effect.

   > These are two distinct facts, not one "any change wipes" rule: the wipe is tied to targeting an unsupported device; the factory reset is tied to changing an existing policy.

   > **Entra shared device mode is not the Shared iPad feature.** [ADE Enrollment Profile](../admin-setup-ios/03-ade-enrollment-profile.md#step-2-configure-enrollment-settings) lists "Microsoft Entra shared mode" as a separate User Affinity enum value for general ADE fields — that row does not describe this Shared-iPad toggle.

3. Set the enrollment-policy sizing fields on the same policy:

   > **Ask the admin:** How many distinct users do you expect to sign in on this Shared iPad?

   Enter a whole number up to 24 on a 32-GB or 64-GB device. A low number can delay a new user's
   data appearing after their first sign-in; a high number risks running out of on-device storage.
   This is a real, settable enrollment-policy field, not prose-only planning guidance.

   > **Ask the admin:** How many seconds after screen lock should this Shared iPad require a password to unlock?

   | Option | When to choose | Recorded as |
   |--------|-----------------|-------------|
   | Immediate | Highest security; users unlock every time | `0` |
   | 1 minute | Balance of convenience and security | `60` |
   | 5 minutes | Frequent hand-offs between short sessions | `300` |
   | 15 minutes | Longer single-user sessions | `900` |
   | 1 hour | Low-security, trusted environment | `3600` |
   | 4 hours | Rarely-locked kiosk-style use | `14400` |

   Values are in seconds. Available for Shared iPad on iPadOS 13.0 and later.

   > **Ask the admin:** After how many seconds of inactivity should a signed-in user's session log out?

   Enter a whole number of seconds, minimum 30; leave 0 or blank for the session to never log out
   automatically. Available on iPadOS 14.5 and later.

   QuotaSize and OnlineAuthenticationGracePeriod are Apple-MDM `SharedDeviceConfiguration` keys
   that Intune reads back but does not expose as settable GUI fields on this policy — treat them
   as advanced, plan-time-verify pointers only, never as a "Recorded as" value. QuotaSize and
   Maximum cached users (ResidentUsers) are alternates for the same mechanism, present either/or.
   The online-authentication grace period (days) is a distinct grace period from the screen-lock
   timeout above (seconds) and from the passcode-unlock grace period noted earlier (minutes).

### Step 2: Sign in with a federated Managed Apple Account

End users sign in with their federated Managed Apple Account; the Managed Apple ID is created
just-in-time at first sign-in. See [Managed Apple Account Provisioning](../cross-platform/apple-business/08-managed-apple-account-provisioning.md)
for the federation setup and provisioning-method decision matrix — this recipe does not
re-author that matrix.

### Step 3: Deploy device-licensed VPP apps

1. Purchase app licenses in Apple Business Manager with **Assign to: Devices** (device licensing).
2. In **Intune admin center** > **Apps** > **iOS/iPadOS**, select the app > **Properties** >
   **Assignments** > **Add group**.
3. Assign **Required** to the device group.

   > **What breaks if misconfigured:** Assigning "Available" intent, assigning a user-licensed app, or targeting a user group instead of the device group leaves the app absent.

   > App Store installs are disabled on Shared iPad, and those app types are Not applicable to Shared iPad assignment — see the anti-feature table above.

   Device-licensed, Required, assigned to the device group is the only working combination for
   Shared iPad.

See [App Deployment](../admin-setup-ios/05-app-deployment.md#vpp-device-licensed) for exhaustive
VPP mechanics, and its [device-centric view](../admin-setup-ios/05-app-deployment.md#2-device-centric-view)
for install-status verification — Shared iPad has no Company Portal, so use the device-centric
path, not the app-centric/Company Portal view.
