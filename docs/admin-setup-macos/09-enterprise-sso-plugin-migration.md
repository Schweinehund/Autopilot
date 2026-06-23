---
last_verified: 2026-06-22
review_by: 2026-09-22
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS Enterprise SSO plug-in migration to Platform SSO.
> For the Platform SSO setup walk-through, see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Enterprise SSO Plug-in & Migration Guide

This guide is for Intune administrators with existing deployments of the Microsoft Enterprise SSO plug-in (legacy SSO app extension) who need to decide whether, when, and how to migrate to Platform SSO. It provides the product-name disambiguation that prevents the most common misconfiguration, a decision matrix for the migrate/keep/coexist choice, a staged migration sequence that avoids Error 10002, the mandatory rollback procedure, and a bounded Kerberos SSO extension coexistence note.

---

## Product-Name Disambiguation

> **Terminology Trap -- "Configure the Enterprise SSO Plug-in" Is Ambiguous:**
>
> Writing "configure the Microsoft Enterprise SSO plug-in" does NOT specify which configuration surface to use. Admins who configure the legacy **Device Features** template (instead of the **Settings Catalog** Platform SSO policy) end up with a legacy SSO app extension profile -- and if a Platform SSO Settings Catalog policy is also assigned to the same device, both stop working (Error 10002). The confusion arises because the umbrella product name appears in both configuration paths.

The four terms have distinct meanings:

| Term | What It Is | Configuration Surface |
|------|-----------|----------------------|
| **Microsoft Enterprise SSO plug-in for Apple devices** | Umbrella product -- the Apple extensible SSO extension delivered by Company Portal on macOS and iOS/iPadOS. Parent container for both sub-features below. | N/A -- delivered automatically via Company Portal |
| **Platform SSO (PSSO)** | Modern sub-feature (macOS 13+; macOS 14+ recommended). Provides device-level Entra ID login binding, hardware-bound Primary Refresh Token (PRT), SSO app extension behavior, and Secure Enclave WPJ key. | Intune **Settings Catalog** only (`com.apple.extensiblesso` payload) |
| **SSO app extension** | Legacy sub-feature. Provides app and browser SSO via URL-matching redirect. Does NOT provide OS-level login binding, Entra device join, or a hardware-bound PRT. | Intune **Device Features** template (legacy path); also auto-included when Platform SSO is configured |
| **Kerberos SSO extension** | Separate Apple-NATIVE extension -- NOT a Microsoft extension. Handles on-premises AD / Kerberos authentication only. Uses a different payload type (Kerberos, not Redirect). | Separate MDM payload; coexists with PSSO (see [Kerberos SSO Extension (Coexistence)](#kerberos-sso-extension-coexistence)) |

**Key functional difference:** Configuring Platform SSO via the Settings Catalog automatically provides BOTH Platform SSO AND the SSO app extension in a single policy. Configuring the legacy Device Features template provides ONLY the SSO app extension -- no OS-level login binding, no Entra device join, no hardware-bound PRT. Admins who want the full Platform SSO feature set must use the Settings Catalog path.

---

## When-to-Use-Which Decision Matrix

The matrix below covers the **migrate / keep-legacy / coexist** decision axis only. For authentication method selection within Platform SSO (Secure Enclave key vs Password sync vs Smart Card), see [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md).

> **"Coexist" means cross-segment fleet coexistence -- NOT same-device:** A legacy SSO app extension profile and a Platform SSO Settings Catalog policy assigned to the **same device simultaneously** is FORBIDDEN and triggers Error 10002 (see [Staged Migration Sequence](#staged-migration-sequence)). "Coexist" in the matrix below means separate device groups -- legacy-OS devices on the legacy profile, modern-OS devices on the PSSO profile -- running side-by-side in the same tenant.

| Fleet Scenario | Recommended Path |
|----------------|-----------------|
| All devices on macOS 13+ | **Migrate** -- assign Platform SSO Settings Catalog policy to all devices. See [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) for method selection. |
| Mixed fleet: some devices on macOS 10.15--12 | **Coexist (cross-segment)** -- keep legacy Device Features SSO app extension profile for macOS 10.15--12 devices; assign Platform SSO Settings Catalog policy to macOS 13+ devices using separate groups. Do NOT overlap on the same device. |
| macOS 12 devices targeted with PSSO profile | **Keep legacy** -- PSSO profile installs on macOS 12 but registration **fails silently** (no error displayed). Retain the legacy Device Features profile for macOS 12 devices or upgrade to macOS 13+ first. |
| On-premises AD / Kerberos resources needed | **Migrate + Kerberos coexistence** -- Platform SSO for Entra cloud authentication; add a separate Kerberos SSO extension profile for on-prem Kerberos (see [Kerberos SSO Extension (Coexistence)](#kerberos-sso-extension-coexistence)). PSSO and the Kerberos SSO extension can run on the **same device** because they are different extension types with separate Extension Identifiers -- this is allowed, unlike a legacy SSO app extension + PSSO on one device (the FORBIDDEN row below). |
| Same device: both legacy Device Features profile AND PSSO Settings Catalog policy | **FORBIDDEN** -- Error 10002; both SSO profiles stop working. Never assign both to the same device simultaneously. |
| Hybrid Entra join (on-premises AD domain join) | **NOT SUPPORTED** -- Platform SSO requires Entra join (cloud-only). Hybrid Entra-joined devices are not supported by PSSO. |

---

## Before You Migrate -- Update Compliance Scripts First

> **Before You Migrate -- Update Compliance Scripts First:**
>
> From approximately August 2025, new Entra device registrations store the Workplace Join (WPJ) key in the **Secure Enclave** rather than the Login Keychain. The `security find-certificate` command returns **false negatives** for all PSSO-enrolled devices -- it cannot see Secure Enclave-stored keys.
>
> If your compliance scripts or IT tooling use `security find-certificate -a | grep Microsoft` (or similar) to check whether a device has a WPJ certificate, those checks will report "device not joined / not compliant" on any correctly PSSO-enrolled device. A false negative during a **successful** migration looks identical to a failed migration and may trigger an unnecessary -- and **destructive** -- rollback (see [Rollback](#rollback)).
>
> **Before starting migration**, replace compliance checks with:
> ```
> app-sso platform -s | grep "Device Registration"
> ```
> A healthy PSSO-enrolled device returns `Device Registration: REGISTERED`.
>
> _Section provenance -- `last_verified: 2026-06-21` / `review_by: 2026-09-21`. VR-3: WPJ storage migration date sourced from Jamf Community + Microsoft apple-sso-plugin doc (updated 2026-06-15); independently confirmed in `_glossary-macos.md#secure-enclave`. Re-verify at each 90-day review. Confidence: MEDIUM._

---

## Staged Migration Sequence

Follow this sequence to migrate from the legacy SSO app extension (Device Features template) to Platform SSO (Settings Catalog). The sequence prevents Error 10002 by ensuring PSSO is validated **before** the legacy profile is removed.

**Error 10002 -- What It Is and Why It Happens:**

`Error 10002: multiple SSOe payloads configured`. When both the new Platform SSO Settings Catalog policy AND the old Device Features SSO app extension profile are assigned to the **same device simultaneously**, the system detects two competing extension payloads. **Both profiles stop working.** PSSO registration is blocked. The error code appears in Intune device status for the PSSO profile.

**Never assign both to the same device simultaneously.**

**Migration steps:**

1. **Create a PILOT group** -- a separate Entra group containing a small set of test devices that are NOT currently in any group assigned the legacy Device Features SSO app extension profile. The pilot group must not overlap with any existing legacy-profile assignment.

2. **Assign the Platform SSO Settings Catalog policy to the PILOT group** -- deploy the PSSO Settings Catalog profile to the pilot group only. Verify via `app-sso platform -s` on representative pilot devices: confirm `Device Registration: REGISTERED` and `User Registration: REGISTERED`. Confirm Error 10001 and Error 10002 are absent in Intune device status.

3. **Validate app and browser SSO on pilot devices** -- confirm browser SSO works in Edge and Chrome, and that Entra-integrated apps authenticate without additional prompts.

4. **THEN unassign the legacy Device Features SSO app extension profile from the pilot group** -- only after PSSO is validated. Do NOT remove the legacy profile before PSSO registration is confirmed. Do NOT assign PSSO and keep the legacy profile simultaneously on the same device.

5. **Monitor for 48 hours** -- confirm no Error 10002, no compliance drift, no CA-blocked users, and no browser SSO regressions on pilot devices. _Note: The 48-hour window is a practitioner-recommended minimum, not an official Microsoft SLA._

6. **Expand to full fleet** -- for each additional device group, perform the swap as a single change: assign the PSSO Settings Catalog policy to the group and unassign the legacy Device Features profile from that same group in one change window, so the two never overlap on a device. (This is the atomic swap, not the validate-first pilot path in steps 1--5; the pilot group was already validated before its legacy profile was removed.) Process one group at a time. Do NOT allow both profiles to overlap on any device even briefly during policy sync -- any overlap triggers Error 10002.

7. **Do NOT delete the legacy Device Features profile** until confirmed unassigned from ALL devices in all groups. Deleting before full unassignment risks orphaned profile state.

---

## What Breaks During Migration

_Section provenance -- `last_verified: 2026-06-21` / `review_by: 2026-09-21`. The Chrome native-messaging host behavior and Company Portal version floors are version-drift candidates -- re-confirm at each 90-day review._

Four issues to anticipate and prepare for before expanding migration beyond the pilot group:

**1. Chrome loses SSO until the native-messaging host is present.**
After PSSO registration, Chrome may lose SSO if the `com.microsoft.browsercore.json` native-messaging host file is missing. This file is created by a correct Company Portal PKG installation; some automated installation methods omit it. Workaround: deploy a fresh Company Portal PKG install from the direct download URL, or use an MDM script to copy `com.microsoft.browsercore.json` to the Chrome NativeMessagingHosts directory.

**2. Edge requires the user to be signed in to their Edge profile.**
After PSSO registration, Edge browser SSO requires the user to be signed in to their Microsoft Edge profile. This is a behavioral change from the legacy SSO app extension, which provided browser SSO without requiring Edge profile sign-in. Brief helpdesk communication ahead of rollout reduces ticket volume.

**3. macOS 12 and earlier: PSSO registration fails silently.**
A PSSO Settings Catalog profile installs on macOS 12 and earlier, but PSSO registration fails with no error displayed. These devices must retain the legacy Device Features SSO app extension profile or be upgraded to macOS 13+ before migration. Scope the PSSO assignment to a dynamic device group filtered on macOS version >= 13.

**4. Transient profile-conflict window during policy sync triggers Error 10002.**
If both profiles coexist on a device -- even briefly during policy sync -- Error 10002 appears and SSO stops temporarily. Stage the swap carefully per the sequence above (step 6); assigning to separate per-group batches rather than all devices simultaneously reduces the blast radius and makes rollback tractable.

---

## Rollback

> **Destructive Action -- Rollback Removes the Secure Enclave WPJ Key:**
>
> - **WPJ key removal is destructive:** When the Platform SSO Settings Catalog policy is removed (rollback), the Secure Enclave WPJ key that was created during PSSO enrollment is removed with it. This cannot be undone without re-enrolling in Platform SSO. Do not roll back on a per-device impulse -- plan for the re-enrollment burden before initiating rollback.
>
> - **CA-blocked-until-re-registered impact window:** After rollback, affected users have **no Entra device registration**. PSSO deleted the old Login Keychain WPJ certificate during enrollment, and removing the PSSO policy removes the Secure Enclave WPJ key without reinstating the legacy Keychain certificate. Users cannot satisfy device-based Conditional Access policies until they manually open Company Portal and complete a fresh legacy WPJ registration. This is an **active service outage** for any user protected by device-based CA policies.
>
> - **Compliance-script swap:** See the [Before You Migrate -- Update Compliance Scripts First](#before-you-migrate----update-compliance-scripts-first) prerequisite callout above -- `security find-certificate` returns false negatives for Secure Enclave-stored keys; update compliance scripts to use `app-sso platform -s` **before rollback as well as before migration**, to avoid triggering rollback unnecessarily.

**Rollback procedure:**

1. Unassign the Platform SSO Settings Catalog policy from the affected device group.
2. Re-assign the legacy Device Features SSO app extension profile to the affected devices.
3. Instruct affected users to open Company Portal and complete WPJ re-registration before Conditional Access will pass.
4. Monitor compliance dashboards using `app-sso platform -s` (NOT `security find-certificate`) to confirm re-registration is complete.

---

### Kerberos SSO Extension (Coexistence)

The Kerberos SSO extension is a **distinct Apple-native extension** -- NOT a Microsoft extension. It handles Kerberos ticket-granting for on-premises Active Directory / Kerberos resources only; it is not used for Entra ID authentication. It uses the **Kerberos payload type**, not the Redirect payload type used by the Microsoft Enterprise SSO plug-in.

**Separate Extension Identifiers are required.** The Apple SSO extension framework supports multiple extensions per device when they have different Extension Identifiers. The Microsoft PSSO extension uses identifier `com.microsoft.CompanyPortalMac.ssoextension`. The Apple Kerberos SSO extension uses a different, Apple-controlled identifier. If an admin configures both extensions under the **same** Extension Identifier value, one overrides the other -- both stop functioning correctly.

**Coexists with Platform SSO.** On devices that need both Entra ID cloud authentication (Platform SSO) and on-premises AD / Kerberos resources (Kerberos SSO extension), both extensions can be deployed simultaneously as separate profile entries with their distinct identifiers. Platform SSO handles Entra cloud auth; the Kerberos SSO extension handles on-prem Kerberos SSO. They operate in parallel without conflict when identifiers are correctly separated.

For the full Kerberos SSO extension configuration guide (payload walkthrough, Extension Identifier values, PSSO TGT integration, and diagnostics), see [Kerberos SSO Extension](10-kerberos-sso-extension.md).

---

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Legacy SSO app extension profile still assigned alongside Platform SSO Settings Catalog policy | Intune | Error 10002; both SSO profiles stop working; PSSO registration suppressed -- see [Staged Migration Sequence](#staged-migration-sequence) | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| PSSO profile assigned to macOS 12 or earlier devices without legacy profile retained | Intune | PSSO registration silently fails; no error displayed; users have no SSO | -- |
| Chrome native-messaging host JSON missing after Company Portal installation | Device | Chrome loses SSO after PSSO migration; other browsers and apps unaffected | -- |
| PSSO rolled back without completing legacy WPJ re-registration | Intune / Device | Users CA-blocked; cannot satisfy device-based CA policies until Company Portal WPJ registration completed | -- |

---

## See Also

- [Platform SSO Setup](07-platform-sso-setup.md) -- Settings Catalog policy creation, prerequisites, and verification
- [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) -- Authentication method selection for Platform SSO (Secure Enclave key, Password sync, Smart Card)
- [Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)
- [Platform SSO](../_glossary-macos.md#platform-sso)
- [Secure Enclave](../_glossary-macos.md#secure-enclave)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Phase 78 (SSOMIG-01..04): initial Enterprise SSO plug-in migration guide | -- |
| 2026-06-22 | Phase 83 (KRB-04): replaced deferred-note sentence with forward link to guide 10 | -- |
