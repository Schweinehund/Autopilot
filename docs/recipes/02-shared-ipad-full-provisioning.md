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

### Step 4: Review the device-vs-user applicability boundary

Before assigning the layered configuration below, confirm which of this recipe's setting types are
device-group-assignable versus user-group-assignable. This table is scoped only to the settings the
worked example in Steps 6–7 touches.

| Profile type | Setting | Device group assignment | User group assignment |
|---|---|---|---|
| Device features | Home screen layout | Device | User |
| Device restrictions | Block Shared iPad temporary sessions | Device | Not applicable |
| Device restrictions | All other device-restriction settings | Device | User |
| Networking | Wi-Fi, VPN, Certificate (all settings) | Device | Not applicable |
| Email | All settings | Device | User (⚠ unsupported here — see [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts) above) |

See [Configuration Profiles](../admin-setup-ios/04-configuration-profiles.md) for the full
device-vs-user applicability matrix across every iOS/iPadOS profile type — this table does not
reproduce it in full.

### Step 5: Configure device restrictions and decide on guest (temporary) sessions

1. Navigate to **Intune admin center** > **Devices** > **Manage devices** > **Configuration** >
   **Create** > **New policy** > **iOS/iPadOS** > device restrictions (Templates or the equivalent
   Settings Catalog profile).
2. Assign the profile to the device group — device restrictions are Device-assignable, per the
   table in [Step 4](#step-4-review-the-device-vs-user-applicability-boundary).

> **Ask the admin:** Should this Shared iPad allow guest (temporary) sessions without a Managed Apple Account?

Temporary sessions are allowed by default. To disable them, set **Block Shared iPad temporary
sessions** to **Yes** in this device restrictions profile. Leaving it **No** or **Not configured**
keeps guest sign-in available — the inverted-polarity default: the Block setting's off state is
what enables guests, not a positive "enable guest sessions" toggle.

Do not assert an exact Settings Catalog category or navigation breadcrumb for this setting beyond
"an iOS/iPadOS device restrictions profile" — spot-check the exact path in your own tenant before
configuring.

A separate, out-of-scope third mode exists: the ADE enrollment-profile setting **Require Shared
iPad temporary session only** (set at [Step 1](#step-1-configure-the-ade-enrollment-policy)) forces
every session on the device to be a guest session, with no Managed Apple Account sign-in ever
allowed. That mode lives on the enrollment profile, not this device-restrictions Block toggle, and
is not implemented by this named-user recipe.

Guest (temporary) sessions receive only the device-group baseline configured in
[Step 6](#step-6-apply-the-device-group-baseline) — the per-role user-group overlay in
[Step 7](#step-7-apply-the-per-role-user-group-overlay) never applies during a temporary session,
since there is no signed-in named user to match either user group's membership.

### Step 6: Apply the device-group baseline

1. **Wi-Fi:** Navigate to **Intune admin center** > **Devices** > **Manage devices** >
   **Configuration** > **Create** > **New policy** > **iOS/iPadOS** > **Wi-Fi**. Configure the
   common Wi-Fi network for this deployment and assign it to the device group.

   > **Wi-Fi, VPN, and Certificate profiles are Not applicable to user groups on Shared iPad.**

   > Device-group assignment here is a platform constraint, not a best-practice preference (see [Step 4](#step-4-review-the-device-vs-user-applicability-boundary)).

2. **Apps:** assign every device-licensed VPP/LOB app used by any role as **Required** to the
   device group, per [Step 3](#step-3-deploy-device-licensed-vpp-apps). Never assign an app
   per-role to a user group.

   > **What breaks if misconfigured:** Assigning an app to a user group instead of the device group leaves it absent for every role signed in on this Shared iPad.

   > Shared iPad apps are Required, device-licensed, and device-group-only — there is no per-role app-assignment path.

3. **Device restrictions:** the common restrictions profile and guest-session decision from
   [Step 5](#step-5-configure-device-restrictions-and-decide-on-guest-temporary-sessions) apply
   here as the baseline for every role.

### Step 7: Apply the per-role user-group overlay

Two Entra ID user groups differentiate the shared experience per signed-in role on this Shared
iPad — **Nurse** and **Clinician**. Each role signs in and receives its own Home Screen layout and
app visibility for the duration of that session; this is per-signed-in-**role**, not per-physical-
user persistence.

1. Navigate to **Intune admin center** > **Devices** > **Manage devices** > **Configuration** >
   **Create** > **New policy** > **iOS/iPadOS** > **Templates** > **Device features** > **Home
   Screen Layout**.
2. Create one layout profile per role and assign each to its own user group.
3. Within each layout, use the **Show or hide apps** allow-list to scope which of the device-group-
   Required apps (Step 6) appear on that role's Home Screen and Dock. This allow-list only controls
   visibility — the apps themselves stay Required and installed at the device group regardless of
   which role is signed in.

| Role | User group | Home Screen Dock | Show/hide allow-list |
|------|-----------|-------------------|----------------------|
| Nurse | Nurses-iPad | Med Administration, Nurse Call, Secure Messaging | Med Administration, Nurse Call, Secure Messaging, EHR Mobile |
| Clinician | Clinicians-iPad | EHR Mobile, e-Prescribing, Secure Messaging | EHR Mobile, e-Prescribing, Secure Messaging, Med Administration |

Home screen layout is user-applicable for this per-role differentiation, and it is also
device-applicable when assigned directly to a device group — it is not a user-only setting; this
worked example simply uses the user-group path so each role's layout can differ.

> **What breaks if misconfigured:** Assigning the same setting to both a device group and a user group does not resolve deterministically.

> A conflicting value "can't be pre-determined."

> When it happens, Intune applies "the first setting assigned."

> If one group type carries a setting and another group type also carries that same setting, the outcome is "chosen by the operating system."

> Assign Wi-Fi, VPN, Certificate, and apps to the device group only, and Home Screen Layout / show-hide-apps to the user group only, to avoid this outcome entirely.

## Verification

- [ ] Device completed ADE enrollment as Supervised, Shared iPad, with no user affinity — confirmed in Intune admin center device properties.
- [ ] All device-group-Required apps are present on the device BEFORE any user signs in — confirmed by starting a guest (temporary) session and observing the Home Screen.
- [ ] The common Wi-Fi network connects automatically at every sign-in, for every role.
- [ ] Signing in as the Nurse role shows the Nurse Dock (Med Administration, Nurse Call, Secure Messaging) and only the Nurse show/hide allow-list of apps.
- [ ] Signing in as the Clinician role shows the Clinician Dock (EHR Mobile, e-Prescribing, Secure Messaging) and only the Clinician show/hide allow-list of apps.
- [ ] Starting a guest (temporary) session shows only the device-group baseline layout and app set — no per-role overlay applies.

Verification is on-device (sign in as each role and observe the layout/app set directly) — user-assigned policy status does not surface in Intune reports for Shared iPad, so no Intune user-status-report check and no Company Portal check apply here (Shared iPad has no Company Portal).

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| VPP app assigned Available or user-licensed instead of Required + device-licensed | App is absent for every role at sign-in — App Store installs are disabled on Shared iPad | [Step 3](#step-3-deploy-device-licensed-vpp-apps) |
| An email profile assigned to the Shared iPad device or a user group | An assignment error occurs when the profile is applied | [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts) |
| Block Shared iPad temporary sessions left in the wrong polarity | Guest sign-in unexpectedly available (No/Not configured) or unexpectedly blocked (Yes) | [Step 5](#step-5-configure-device-restrictions-and-decide-on-guest-temporary-sessions) |
| The same setting assigned to both the device group and a user group | Outcome is chosen by the operating system, not deterministic — the wrong role may see the wrong layout or app set | [Step 7](#step-7-apply-the-per-role-user-group-overlay) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md) — the full spec this recipe's decision blocks instantiate
- [ADE Enrollment Profile](../admin-setup-ios/03-ade-enrollment-profile.md) — general ADE enrollment-policy field reference
- [Configuration Profiles](../admin-setup-ios/04-configuration-profiles.md) — full Wi-Fi / Home Screen Layout / device-restrictions applicability matrix
- [App Deployment](../admin-setup-ios/05-app-deployment.md) — exhaustive VPP mechanics and device-centric verification
- [Managed Apple Account Provisioning](../cross-platform/apple-business/08-managed-apple-account-provisioning.md) — federated Managed Apple Account setup and provisioning-method decision matrix
- [Shared iPad Lifecycle](../cross-platform/apple-business/09-shared-ipad-lifecycle.md) — ABM-side lifecycle and session mechanics
