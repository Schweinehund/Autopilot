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
