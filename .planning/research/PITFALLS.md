# Pitfalls Research — v1.11 macOS PSSO End-to-End Provisioning & MDM Migration

**Domain:** Documentation suite — macOS PSSO end-to-end provisioning (ADE-during-Setup-Assistant path, macOS 26+) + Kandji/Iru → Intune MDM migration (ABM "Assign Device Management" + Deadline OS-26 in-place path + pre-26 retire/wipe-and-re-enroll fallback + post-migration PSSO re-registration); doc-integration conventions for v1.11
**Researched:** 2026-06-24
**Overall confidence:** HIGH for PSSO Secure Enclave key destruction/re-registration (Apple + Microsoft Learn authoritative; existing guide 07/00 confirm); HIGH for ACME only-on-re-enroll (Microsoft Learn explicit); HIGH for sync/release lag (Microsoft Learn explicit); HIGH for VPP single-MDM constraint (multi-source community + official); HIGH for doc-authoring pitfalls (v1.10 PITFALLS.md lineage + internal harness evidence); MEDIUM for deadline lock and admin-recovery details (Apple Support page + community, not fully confirmed in a single authoritative source); MEDIUM for in-place migration OS-level mechanism (unenroll+reenroll or profile-swap) and supervision post-migration (community majority says preserved; Apple Support page silent on supervision); LOW for pre-26 Kandji leftover-profile exact cleanup steps (single community Q&A + Iru blog; no Apple authoritative source)

---

## Confidence-Level Legend

| Level | Evidence | Use |
|-------|----------|-----|
| HIGH | Apple developer docs + Microsoft Learn official, corroborated | State as fact |
| MEDIUM | Single authoritative source OR strong community + one official anchor | State with attribution |
| LOW | Community-only or inference | Flag for live-tenant validation before publishing |

---

## AXIS 1 — Operational Pitfalls: PSSO Provisioning

### P-1: PSSO Secure Enclave Key Destroyed by MDM-Driven or FileVault-Recovery Password Resets

**Confidence:** HIGH — documented in existing guide `00-ade-lifecycle.md` Stage 7 "Watch Out For"; Apple Support Platform SSO doc states "password resets that bypass the interactive macOS password-change UI ... resets the Secure Enclave, and resetting the Secure Enclave renders keys previously stored for this account inaccessible" (source: Apple Support guide/deployment/platform-sso-for-macos-dep7bbb05313/web, 2025)

**What goes wrong:**
Any password reset that bypasses the interactive macOS password-change UI — including MDM-forced password resets (`forceChangeAtNextAuth` MDM command) and FileVault recovery-key-based password resets — destroys the Secure Enclave-stored PSSO key. The key cannot be recovered. The user receives a new "Registration Required" notification and must complete full PSSO re-registration (interactive MFA + Company Portal flow). If Conditional Access policies require device compliance that depends on PSSO being established, the user is locked out of CA-protected resources until re-registration completes.

**Why it happens:**
The Secure Enclave key is cryptographically bound to the user's local account password. A reset that bypasses the normal password change (which would re-derive the key) instead clears the Secure Enclave slot entirely. Helpdesk staff commonly issue MDM password resets without being warned about the PSSO re-registration consequence.

**How to avoid:**
- Document explicitly in the PSSO provisioning guide and L1/L2 runbooks that MDM-forced password resets and FileVault recovery key resets require a follow-up PSSO re-registration.
- Include a `[!WARNING]` callout in the admin-facing provisioning walkthrough at any step that mentions password reset.
- Recommend users use the normal macOS interactive password change (System Settings > Login Password) whenever possible.

**Warning signs:**
- User reports "Registration Required" notification after a recent password reset (not after a new enrollment)
- `app-sso platform -s` shows `User Registration: NOT REGISTERED` on a device that was previously registered
- Helpdesk opened a password reset MDM action ticket in the same window as the PSSO failure report

**Phase to address:** Pillar A provisioning guide (PSSO lifecycle / re-registration section); L2 migration-failure runbook (symptom list). Already in guide 00 Stage 7; the Pillar A guide must cross-link rather than re-document.

---

### P-2: PSSO Registration Never Completes on Userless / No-Affinity Devices

**Confidence:** HIGH — existing guide `00-ade-lifecycle.md` Stage 6 "Watch Out For" documents this explicitly: "For devices enrolled without user affinity, this registration never occurs and those devices cannot participate in user-based Conditional Access policies." Microsoft Entra PSSO overview confirms PSSO requires user association.

**What goes wrong:**
PSSO registration requires a user account to bind the Secure Enclave key to. Devices enrolled without user affinity (shared/kiosk mode) have no user principal to register against; the "Registration Required" notification never appears, and the PSSO extension silently skips registration. If a PSSO Settings Catalog policy is assigned to a device group that includes userless devices, the profile deploys successfully but PSSO never activates — no error is shown.

**Why it happens:**
The enrollment profile's "Enroll without User Affinity" setting removes the user-association step (Stage 6 Company Portal sign-in), but the PSSO extension is not gated — it deploys via the device group assignment. The silent non-activation is easily mistaken for a misconfiguration requiring troubleshooting.

**How to avoid:**
- Include an explicit "Scope" callout at the start of both Pillar A and Pillar B guides: "These walkthroughs apply to user-affinity enrollments only. Userless/shared-device enrollments cannot complete PSSO registration."
- Add a condition check to the Pillar B migration-failure L2 runbook: before troubleshooting PSSO re-registration, confirm device has user affinity.

**Warning signs:**
- `app-sso platform -s` always returns `User Registration: NOT REGISTERED` with no "Registration Required" notification ever appearing
- Intune device record shows no associated user (blank "Primary user" field)
- Policy assignment is to a device group that contains kiosk / shared-iPad-pattern devices

**Phase to address:** Pillar A provisioning guide (scope callout at top); Pillar B L2 migration-failure runbook (first triage step).

---

### P-3: SSO Extension Profile Timing — "Unable to Sign In" When Company Portal Not Yet Installed (ADE-During-Setup-Assistant Path)

**Confidence:** HIGH — documented in existing guide `00-ade-lifecycle.md` Stage 4 "Watch Out For": "If Company Portal has not finished installing when the user first attempts to sign in, the user sees 'Unable to sign in' with a registration error; tapping 'Try Again' allows Company Portal to finish and registration to complete." Also confirmed in guide `07-platform-sso-setup.md` ADE-path prerequisites section: Company Portal 5.2604.0+ must be deployed as LOB (not VPP), and all three policies (Settings Catalog PSSO, Company Portal LOB app, ADE enrollment profile) must be assigned to the same static user group.

**What goes wrong:**
On the ADE-during-Setup-Assistant path (macOS 26+), the PSSO extension attempts to register during Setup Assistant using the `EnableRegistrationDuringSetup` flag. If Company Portal has not finished downloading and installing when the Entra credential screen appears, the registration fails with "Unable to sign in." Users who do not know to tap "Try Again" abandon Setup Assistant and the device reaches the desktop without PSSO registered.

**Why it happens:**
The LOB app deployment for Company Portal 5.2604.0+ is not instantaneous. On slow networks or high-contention MDM states, Company Portal may still be downloading when the credential screen renders. The "Try Again" recovery is not self-evident to end users.

**How to avoid:**
- Pillar A provisioning guide must document the "Try Again" recovery step explicitly, ideally with a callout box.
- Prerequisites section must include the three-policy same-group rule (static user group, not dynamic) and the LOB (not VPP) Company Portal requirement.
- Recommend ensuring Company Portal 5.2604.0+ is pre-staged via Apple Configurator or a fast base image before large ADE deployments on the advanced path.
- For standard post-enrollment path: SSO extension timing constraint does not apply at Stage 4; do not conflate the two paths in the guide.

**Warning signs:**
- User reports "Unable to sign in" error appearing during Setup Assistant (ADE path)
- `app-sso platform -s` shows `User Registration: NOT REGISTERED` immediately after first device boot
- Company Portal in Intune shows "Pending Install" state at the time the enrollment completes

**Phase to address:** Pillar A provisioning guide (ADE-during-Setup-Assistant section); Prerequisites table must list the three-policy same-group rule and LOB app requirement.

---

### P-4: Mixed-Fleet OS Version Gating — In-Place Migration Silently Unavailable Below macOS 26

**Confidence:** HIGH — Apple Support migration guide confirms "iOS/iPadOS 26 or macOS 26 or later" is a hard requirement; Microsoft Learn ADE overview states "Devices managed by another MDM provider must unenroll before enrolling in Intune" (for pre-26 devices). Community sources confirm in-place migration is silently unavailable on older OS versions without error messaging distinguishing it from a normal profile-delivery delay.

**What goes wrong:**
When an admin uses ABM "Assign Device Management" + Deadline against a mixed fleet where some devices are running macOS 25 or earlier, the OS-26 in-place migration workflow silently does not activate on those devices. They receive the deadline notification, but the in-place migration mechanism is unavailable. The device hits the deadline, gets the full-screen non-dismissible lock prompt, and cannot complete the new enrollment because macOS < 26 still requires wipe-and-re-enroll for ABM MDM reassignment — the device is effectively stuck in a locked state requiring the pre-26 fallback (retire/wipe/re-enroll) to proceed.

**Why it happens:**
Admins planning the migration with macOS 26 documentation may not check each device's current OS version before setting the deadline. The migration UI in ABM does not reject devices running macOS < 26; it accepts the deadline assignment silently.

**How to avoid:**
- Pillar B migration guide must include a pre-migration checklist step: "Verify all target devices are running macOS 26+ before using the ABM in-place migration path. Run a device inventory report in Intune filtered by OS version."
- Include a callout: "Devices running macOS 25 or earlier cannot use the in-place migration path regardless of ABM deadline settings. Use the pre-26 fallback path (retire → wipe → re-enroll) for those devices."
- Never set a migration deadline in ABM until the OS version gate has been verified per-device.

**Warning signs:**
- Migration deadline passes and devices show the non-dismissible lock but cannot complete enrollment
- Intune device inventory shows OS version below macOS 26 on devices included in the migration scope
- ABM deadline batch was applied to "all devices" without OS-version filtering

**Phase to address:** Pillar B migration scenario guide (pre-migration checklist + version gate callout); L2 migration-failure runbook (deadline-lock symptom).

---

## AXIS 2 — Operational Pitfalls: MDM Migration

### P-5: PSSO Re-Registration Required After MDM Migration — Secure Enclave Key Is Tenant-Bound

**Confidence:** HIGH — Apple Support Platform SSO guide states "If you unenroll a Mac from the device management service, it also unregisters from the IdP" (authoritative: support.apple.com/guide/deployment/platform-sso-for-macos-dep7bbb05313/web); Microsoft Learn confirms the Secure Enclave key is provisioned by the IdP during user registration. The macOS 26 in-place migration involves unenrollment from the old MDM and re-enrollment in the new MDM (Apple Support migration guide: "device stores managed apps list, then disconnects from current service … reconnects to new service"); unenrollment triggers IdP unregistration.

**What goes wrong:**
When a Mac migrates from Kandji/Iru to Intune — whether via the OS-26 in-place path or the pre-26 wipe-and-re-enroll path — the old MDM enrollment is removed (unenrollment). Apple's Platform SSO framework unregisters the device from the previous IdP at the same time as MDM unenrollment. The Secure Enclave-stored WPJ (Workplace Join) key bound to the old MDM/tenant is destroyed and cannot be ported to the new MDM enrollment.

After migration, even if the new Intune MDM enrollment is complete and the PSSO Settings Catalog profile has been delivered, the user must complete PSSO re-registration against the Intune/Entra tenant. This requires an interactive flow (MFA prompt + Company Portal). If the admin does not communicate this requirement to users, they will hit "Registration Required" notifications they do not understand, and Conditional Access may block access to M365 resources in the window between migration completion and PSSO re-registration.

**Why it happens:**
The Secure Enclave key is tied to the Entra device registration record created during the original PSSO registration. The old Kandji/Iru MDM enrollment was associated with a different (or no) Entra tenant. Even if the same Entra tenant is used, the Entra device registration record must be refreshed under the new Intune MDM enrollment identity.

**How to avoid:**
- Pillar B migration guide must include an explicit post-migration step: "After Intune enrollment completes, users will see a new 'Registration Required' notification. They must complete PSSO re-registration (tap Registration Required → complete MFA). Do not skip this step."
- L2 migration-failure runbook must list "PSSO re-registration stuck or not triggered" as a named failure mode.
- Verify with `app-sso platform -s`: both `Device Registration: REGISTERED` and `User Registration: REGISTERED` must be confirmed after migration.

**Warning signs:**
- Post-migration devices show `User Registration: NOT REGISTERED` in `app-sso platform -s`
- Users report being prompted to re-register after what seemed like a successful migration
- CA-protected apps (Teams, Outlook, SharePoint) block access for users on newly migrated devices

**Phase to address:** Pillar B migration scenario guide (post-migration steps + PSSO re-registration callout); L2 migration-failure runbook (dedicated PSSO re-registration stuck section).

---

### P-6: Deadline Miss — Non-Dismissible Lock Screen on macOS, Admin Recovery Path

**Confidence:** MEDIUM — Apple Support migration guide confirms "nondismissible and full-screen prompt" on macOS at deadline enforcement; community sources (Addigy, SimpleMDM, web search) confirm device is locked until enrollment completes; admin recovery path via ABM "Release Device" (requires ABM account with Administrator or Device Enrollment Manager privileges) is consistent across community sources but not confirmed in a single authoritative Apple document. The specific ABM admin action needed ("Release Device" or "Change MDM Server back") is MEDIUM confidence.

**What goes wrong:**
If the migration deadline passes and the macOS device has not completed re-enrollment in Intune (network failure, user not present, enrollment profile misconfiguration, OS version gate not met, or Intune not ready to receive the device), the device displays a non-dismissible full-screen prompt and cannot be used for any work until enrollment succeeds. If enrollment cannot succeed (e.g., Intune has not yet received the device, or the ACME certificate flow fails), the device is effectively bricked in place.

Recovery requires admin intervention in ABM: the admin must either (a) fix the enrollment configuration and let the device complete enrollment at the locked screen, or (b) release the device from the deadline enforcement state in ABM, which allows normal use to resume but leaves the device unenrolled in Intune.

**Why it happens:**
Deadline enforcement is designed to be user-uncircumventable (a security feature). The enforcement triggers even when the enrollment target (Intune) is not ready — ABM does not confirm the destination MDM is ready to receive before enforcing the deadline.

**How to avoid:**
- Set deadlines with a buffer: confirm Intune enrollment profile is assigned and the device appears in Intune's device list BEFORE setting the deadline.
- Test the full migration flow on a pilot device before setting fleet-wide deadlines.
- Establish an admin runbook for deadline-lock recovery: ABM admin logs in → Devices → locate by serial → Release Device or reassign MDM server.
- L2 migration-failure runbook must document both the "deadline lock" symptom and the ABM admin release recovery step.

**Warning signs:**
- Device shows non-dismissible full-screen migration prompt and user cannot dismiss it
- User reports they cannot use the Mac after the migration window
- Intune device list does not show the device as enrolled after the deadline passed

**Phase to address:** Pillar B migration scenario guide (deadline-setting pre-checks + recovery callout); L2 migration-failure runbook (deadline-lock symptom + ABM recovery steps, with MEDIUM confidence flag).

---

### P-7: ACME Certificate Only Issued on Re-Enrollment — Migrated Devices Do Not Get ACME Automatically

**Confidence:** HIGH — Microsoft Learn ADE overview states explicitly: "Devices that are already enrolled don't receive an ACME certificate unless they re-enroll into Microsoft Intune. ACME is supported on macOS 13.1 or later." (source: learn.microsoft.com/intune/device-enrollment/apple/overview-automated-enrollment-macos, updated 2026-04-15)

**What goes wrong:**
On the OS-26 in-place migration path, the macOS 26 mechanism unenrolls the device from the old MDM and re-enrolls it in Intune — which IS a genuine re-enrollment from Intune's perspective, so Intune issues a new ACME certificate to the device during the new enrollment. However, if a pre-26 fallback path is used (retire/wipe/re-enroll via `sudo profiles renew -type enrollment`), and the re-enrollment is not a full wipe but a manual `profiles renew` on an already-running device, Intune may not treat it as a fresh enrollment and ACME may not be issued.

The practical impact: without ACME, the device uses the older SCEP-based identity certificate for MDM check-ins. This is functional but means the device does not benefit from ACME's stronger validation. Admins who assume all Intune-enrolled macOS 13.1+ devices have ACME may be surprised to find migrated devices without it.

Additionally: devices migrated from Kandji/Iru that previously had Kandji's own ACME certificate in the keychain will have that certificate removed on Kandji unenrollment; Intune issues its own ACME certificate on the new ADE enrollment.

**Why it happens:**
ACME is not retrofitted to existing enrollments — it only activates at enrollment time. The OS-26 in-place migration is a re-enrollment, so ACME is issued. Pre-26 manual `profiles renew` on an existing device may or may not trigger ACME depending on whether Intune classifies the re-enrollment as fresh.

**How to avoid:**
- Pillar B migration guide must note the ACME behavior difference between the OS-26 path (re-enrollment = new ACME issued) and the pre-26 path (behavior dependent on re-enrollment method).
- For the pre-26 fallback, recommend a full wipe-and-re-enroll to guarantee ACME issuance.
- Do not state "all macOS 13.1+ Intune devices have ACME" — qualify with "devices enrolled after macOS 13.1 via ADE."

**Warning signs:**
- `security find-certificate -a` shows SCEP-type identity certificate rather than ACME (acme.apple.com issuer) on a migrated device
- Device was migrated via pre-26 manual `profiles renew` and the enrollment is not treated as fresh

**Phase to address:** Pillar B migration scenario guide (ACME note in enrollment section); L2 migration-failure runbook (certificate diagnostic step).

---

### P-8: ABM/Intune Sync Restrictions Causing Migration Delays

**Confidence:** HIGH — Microsoft Learn `manage-devices-tokens-macos` (updated 2026-06-22) explicitly states: 24h auto-sync; 15-minute manual sync rate limit; 7-day full-sync cooldown; 30-45 day release lag for devices removed from ABM to disappear from Intune device list.

**What goes wrong:**
When the admin reassigns a device from Kandji's MDM server to Intune's MDM server in ABM, and the device needs to appear in Intune's device inventory before the migration deadline can be configured, there is up to a 24-hour wait for the automatic incremental sync. If the admin triggered a full sync within the last 7 days, the full sync button is grayed out. Newly purchased devices (e.g., replacement Macs for the migration batch) may take up to 30-45 days after ABM reseller assignment before they appear reliably.

Additionally, if a device is released from Kandji's ABM assignment but not yet deleted from Intune's device list, it appears as "removed" for up to 30-45 days — creating confusion about whether the migration was successful.

**Why it happens:**
Apple's service-side sync restrictions prevent excessive load. The Intune admin center does not prominently display the next-sync-time, so admins assume the change is instant.

**How to avoid:**
- Pillar B migration guide must include a "Sync Timing" callout before the migration deadline-setting step: "After reassigning devices in ABM, wait up to 24 hours for the device to appear in Intune's enrollment device list, or manually trigger a sync (subject to 15-minute and 7-day rate limits)."
- Pilot the migration flow with a single device first to understand the sync timing in the tenant before fleet-wide deployment.
- Document the 30-45-day lag for deleted device cleanup so it is not mistaken for an enrollment failure.

**Warning signs:**
- Device does not appear in Intune's enrollment device list immediately after ABM reassignment
- Admin triggers manual sync and reports the button is grayed out
- Old "removed" device records appear in Intune alongside the new migration records

**Phase to address:** Pillar B migration scenario guide (pre-migration prerequisites: sync timing callout).

---

### P-9: VPP / Apps and Books Content Token — Single-MDM Constraint During Migration Window

**Confidence:** HIGH — Multiple sources confirm a VPP (Apps and Books) location token can only be associated with one MDM server at a time. Uploading it to Intune while it is still in Kandji/Iru will either fail or cause license management conflicts. Confirmed by Esper technical analysis, ManageEngine migration guide, Jamf community thread, and general Apple ABM/ASM behavior.

**What goes wrong:**
During the migration from Kandji/Iru to Intune, the organization's Apps and Books location token(s) are still associated with Kandji/Iru's MDM server. If the admin attempts to upload the same token to Intune before removing it from Kandji/Iru, the upload fails or the existing token is "taken over" from Kandji/Iru without a clean revocation — leaving license assignment records in an inconsistent state between the two MDMs. VPP app installs, updates, and reassignments on migrated devices may fail silently or intermittently during the transition window.

**Why it happens:**
Admins focus on the device enrollment migration and overlook the VPP token handoff as a separate, sequential step. The Intune UI offers a "Take control of token from another MDM" option which appears convenient but bypasses the clean revocation step — leaving Kandji/Iru with stale license records.

**How to avoid:**
- Pillar B migration guide must include a dedicated step for VPP/Apps and Books token migration: (1) revoke all app license assignments in Kandji/Iru, (2) remove the token from Kandji/Iru, (3) then upload to Intune.
- Do not use the Intune "Take control of token" shortcut without first performing the Kandji/Iru-side revocation.
- If the organization has multiple ABM locations (multiple tokens), document each token's migration separately.

**Warning signs:**
- Intune shows "Assigned to external MDM" status on the token upload
- VPP app installs fail on migrated devices despite the token being in Intune
- Apps installed by Kandji/Iru persist on migrated devices as unmanaged apps (no management record in Intune)

**Phase to address:** Pillar B migration scenario guide (VPP token migration step, clearly sequenced before device migration deadline).

---

### P-10: Kandji/Iru Source-Side: Leftover Agent and Profiles After Release, Supervision Retention Ambiguity

**Confidence:** MEDIUM for leftover agent — Iru (Kandji) blog and Microsoft Q&A confirm: "the old MDM solution's macOS agent might still be installed on the Mac even after the old MDM profile is removed"; the Q&A for the pre-26 path confirms even after Kandji MDM profile removal, old MDM certificates can persist and block Intune enrollment. LOW for supervision status post-migration on OS-26 path — community sources suggest supervision is preserved (device was ABM/ADE-enrolled and supervision comes from Apple hardware link, not MDM profile), but Apple Support migration guide is silent on supervision status, making this LOW confidence.

**What goes wrong (leftover agent):**
After releasing a device from Kandji/Iru management, the Kandji agent binary (`/Library/Kandji/Kandji Agent.app`) and associated LaunchDaemons remain installed on the device. For the pre-26 path, these do not automatically uninstall. The Kandji MDM profile is removed, but the agent may continue running and interfering with the new Intune enrollment flow. In at least one confirmed case (Microsoft Q&A, 2025), a pre-26 Kandji-to-Intune migration without wipe failed specifically because old MDM certificate artifacts persisted in Device Management even after the Kandji profile was removed.

**What goes wrong (supervision ambiguity):**
The docs must not state that supervision is definitively preserved through the OS-26 migration without citing an authoritative source. Community sources suggest it is preserved because supervision is tied to the ABM hardware link (the device's serial number is registered in ABM), not to the MDM profile. But if the guide states this as fact and it turns out supervision is briefly or permanently removed on some devices, admins who rely on supervised-only MDM features (supervised restrictions, remote screen view, software update enforcement) will discover a regression post-migration.

**How to avoid (leftover agent):**
- Pillar B migration guide must include a Kandji/Iru source-side preparation step: "Before using the OS-26 in-place migration or the pre-26 wipe path, use Kandji/Iru to push an uninstall script for the Kandji agent, OR delete the device record from Kandji/Iru (which triggers agent self-removal if the agent is still running) before releasing the MDM profile."
- For the pre-26 wipe path: a full wipe clears all agent artifacts; no separate cleanup needed if doing a full erase.
- L2 migration-failure runbook: include "old Kandji agent still running" and "stale MDM certificate in Device Management" as diagnostic checkpoints.

**How to avoid (supervision):**
- Pillar B migration guide must NOT claim supervision is preserved without citing Apple's authoritative source.
- Flag this as needing verification at the content-authoring phase: run a test migration on a pilot device, capture `profiles status -type enrollment` and check `Supervised` field before and after OS-26 migration; document the verified result with a `last_verified` stamp.

**Warning signs (leftover agent):**
- Post-migration Intune enrollment fails with `notEnrolled` state despite device appearing in Intune device list
- Old Kandji LaunchDaemon logs appear in `/var/log/` after migration
- `profiles status -type enrollment` shows stale MDM certificate from Kandji in Device Management

**Warning signs (supervision):**
- Post-migration MDM features requiring supervised mode (specific restrictions, software update enforcement) silently stop working

**Phase to address:** Pillar B migration guide (Kandji/Iru source-side preparation step); L2 migration-failure runbook (leftover-agent diagnostic + supervision status verification). Flag supervision status as needing pilot-device verification at content-authoring phase.

---

### P-11: Pre-macOS-26 Wipe Fallback — ABM Checks MDM Assignment Only During Setup Assistant, Not After

**Confidence:** HIGH — Microsoft Q&A confirmed case from 2025: "macOS only queries ABM for MDM assignment during the initial Setup Assistant after a device wipe. Without wiping, the device never re-checks ABM for new MDM assignments." This is the root cause of all pre-26 migration failures that try to avoid a wipe.

**What goes wrong:**
For macOS < 26, after reassigning the device to Intune's MDM server in ABM, an admin may attempt to use `sudo profiles renew -type enrollment` on the running device to trigger re-enrollment in Intune without a full wipe. This works for devices that were enrolled via a MDM profile install (manually enrolled), but for ADE-enrolled devices (which Kandji/Iru fleet devices typically are), `profiles renew` re-requests the MDM profile from the current ABM-assigned server — it does NOT re-run Setup Assistant. The device successfully contacts Apple's ADE endpoint and downloads the new Intune enrollment profile, but the Company Portal SSO extension profile is not installed (because MDM enrollment is a prerequisite for that profile, creating a circular dependency). The enrollment stalls.

**Why it happens:**
The ABM ADE flow is designed to run once, at Setup Assistant. The `profiles renew` command is an in-place re-enrollment trigger, but it does not handle the full bootstrap including SSO extension profile pre-deployment. Admins discover this after attempting the no-wipe path on the first device and wasting time troubleshooting what appears to be a platform bug.

**How to avoid:**
- Pillar B migration guide must clearly distinguish the OS-26 in-place path (supported, no wipe) from the pre-26 path (requires full wipe).
- The pre-26 fallback section must state explicitly: "Retire the device in Intune, wipe the device (Erase Mac), and allow Setup Assistant to run — the device will contact ABM and receive the Intune enrollment profile. `sudo profiles renew` is NOT a supported alternative to wipe for ADE-enrolled devices."
- Do not suggest `sudo profiles renew` as a pre-26 migration path for Kandji/Iru ADE-enrolled devices.

**Warning signs:**
- `profiles renew` was used as the re-enrollment trigger on a Kandji ADE-enrolled device
- Enrollment log shows `resourceNotFound` or SSO extension errors post-renew
- Device OS version is macOS 25 or earlier

**Phase to address:** Pillar B migration scenario guide (pre-26 fallback section: explicit "wipe required" callout, no `profiles renew` shortcut for ADE devices); L2 migration-failure runbook (enrollment-failed diagnostic).

---

### P-12: One-Time Device Reset Required for First Migration on Devices Added to ABM Before macOS 26

**Confidence:** MEDIUM — Multiple community sources (Addigy, Apple Q&A) confirm: "If devices were initially added to ABM/ASM while running a lower OS version and were later upgraded to OS 26, a one-time device reset is required to re-register the devices in ABM/ASM so that OS 26-specific enrollment and migration changes are applied." Not yet confirmed in a single Apple authoritative document; Apple Support migration guide is silent on this requirement.

**What goes wrong:**
An organization upgrades its existing Kandji/Iru fleet from macOS 24/25 to macOS 26, then attempts the OS-26 in-place ABM migration immediately. The migration fails or behaves unexpectedly because the device was added to ABM while running a pre-26 OS and therefore lacks the OS-26-specific ABM registration that enables the in-place migration feature. A one-time device reset (wipe/re-enroll through Setup Assistant while running macOS 26) is required before subsequent migrations can proceed without a wipe.

This means the first migration from any pre-26-registered device is always a wipe, even on a macOS 26 device.

**Why it happens:**
The OS-26 in-place migration requires metadata in ABM that is only written when the device is enrolled/re-enrolled into ABM while actually running macOS 26. Devices that were enrolled into ABM on an older OS and later OS-upgraded do not have this metadata until they go through at least one Setup-Assistant-based enrollment on macOS 26.

**How to avoid:**
- Pillar B migration guide must include a pre-flight callout: "If your devices were added to ABM while running macOS 25 or earlier, the first migration TO Intune requires a wipe-and-re-enroll through Setup Assistant while running macOS 26, even though you are on macOS 26 now. After that first enrollment, future migrations will not require a wipe."
- Flag this as MEDIUM confidence; recommend a pilot device test to confirm before fleet-wide migration planning.

**Warning signs:**
- All devices in the migration batch were enrolled into ABM while running a pre-26 OS
- ABM "Assign Device Management" + deadline process fails to trigger enrollment on macOS 26 devices that were upgraded from macOS 25
- No device in the fleet was first enrolled into ABM while running macOS 26

**Phase to address:** Pillar B migration scenario guide (pre-migration checklist; confidence-flagged callout).

---

## AXIS 3 — Documentation-Authoring Pitfalls for v1.11

### DA-1: Shipping Speculative Preview Behavior as GA — PSSO EnableRegistrationDuringSetup

**Confidence:** HIGH that the feature is GA for Intune — Microsoft Community Hub blog post "New Platform SSO with registration during Automated Device Enrollment on macOS" and Microsoft Learn `macos-psso.md` (updated 2026-06-15) both document `EnableRegistrationDuringSetup` with step-by-step configuration instructions without a "preview" or "beta" label. Microsoft Learn explicitly links to `configure-platform-sso-during-enrollment` as the configuration doc. Company Portal 5.2604.0 is the required version.

**What goes wrong:**
A content author who checked the status of PSSO-during-Setup-Assistant in late 2025 found it NOT AVAILABLE for Intune + Entra ID (confirmed by community Q&A and IntuneIRL blog as of late 2025). If that author uses cached research, they will document the ADE-during-Setup-Assistant path as not yet supported, or add a "preview only" disclaimer to a feature that is now GA.

Conversely, if a different author assumes the feature is fully GA without checking the Company Portal version floor (5.2604.0 LOB, not VPP), they will ship incorrect prerequisites.

**How to avoid:**
- Content-authoring phase for Pillar A must verify the feature GA status against current Microsoft Learn docs (not research from late 2025 community posts) on the day authoring begins.
- Prerequisites section must cite Company Portal 5.2604.0 as the version floor, sourced from current Microsoft Learn, with a `last_verified` date stamp.
- Do NOT carry over research that marks this feature as "not available" — verify against current official docs.

**Warning signs:**
- Guide draft says "PSSO during Setup Assistant is not yet supported with Intune" or "preview only"
- Prerequisites list uses Company Portal 5.2404.0 (the standard post-enrollment floor) instead of 5.2604.0 for the ADE path
- Phase plan cites community blog from late 2025 without verifying against current Microsoft Learn

**Phase to address:** Pillar A provisioning guide authoring phase — verify GA status and Company Portal version floor against current Microsoft Learn before drafting.

---

### DA-2: Wrong OS Version Gate — Documenting OS-26 Migration as Available on macOS 25

**Confidence:** HIGH — "macOS 26 or later" is a hard gate confirmed in Apple Support migration guide, multiple vendor documentation, and web search results. No source suggests the feature was backported.

**What goes wrong:**
A doc author may assume "macOS Tahoe" and "macOS 26" refer to different things (they are the same release), or may write "macOS 14+" by accident when writing about "the modern PSSO path," confusing the ADE-during-Setup-Assistant gate (macOS 26) with the standard PSSO gate (macOS 13 minimum, macOS 14 recommended).

The OS-26 in-place migration path also requires iOS 26 for iOS devices — the guide must distinguish the macOS gate from the iOS gate separately; they are the same version number but different platforms.

**How to avoid:**
- Each per-section version gate in both Pillar A and Pillar B guides must cite the specific OS version exactly: macOS 26 (for ADE-during-Setup-Assistant and in-place migration), macOS 13+ (for standard post-enrollment PSSO), macOS 14+ (recommended for full PSSO feature set).
- Follow the project convention: per-section `last_verified` freshness stamps on OS-26-gated content with `review_by` set to 90 days out.
- Do not use "macOS 14+" as a shorthand when the specific path requires macOS 26.

**Warning signs:**
- Guide draft says "macOS 14+" for the ADE-during-Setup-Assistant path or the in-place migration path
- Version gate table does not distinguish ADE-path (26) from standard path (13/14)
- Author conflates "macOS Tahoe" (the codename) with the version number

**Phase to address:** Pillar A and Pillar B authoring phases — version gate table in prerequisites must be explicit and sourced per section.

---

### DA-3: Navigation-Last Invariant Violation

**Confidence:** HIGH — Navigation-last is an established invariant enforced across v1.0–v1.10; specifically documented in v1.10 PITFALLS.md DI-1; enforced in every milestone since v1.5. Nav-hub files: `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/06-macos-triage.md`, runbook index files.

**What goes wrong:**
A content-authoring phase for Pillar A or Pillar B also adds entries to `docs/index.md` or `common-issues.md` before the content files are finalized. If the new guide filename changes during authoring (e.g., planned as `migration-guide.md`, shipped as `11-kandji-intune-migration.md`), every nav-hub edit must be corrected. More critically, a forward link to a non-existent file causes a C13 broken-link FAIL at the next harness validation.

**How to avoid:**
- Roadmap must designate a dedicated Pillar C nav-hub integration phase that runs AFTER Pillar A and Pillar B content are stable.
- Each Pillar A and Pillar B content-authoring phase plan must include an explicit prohibition clause: "Nav-hub files (`docs/index.md`, `common-issues.md`, `quick-ref-l1/l2.md`, `docs/decision-trees/06-macos-triage.md`) are NOT edited in this phase — navigation-last invariant."

**Warning signs:**
- Phase plan for Pillar A or Pillar B scenario guide authoring includes a task to edit `docs/index.md`
- A single phase plan contains both "write migration guide" and "update common-issues.md" tasks

**Phase to address:** Roadmap-level design (Pillar C phase is designated as navigation-last); every Pillar A/B content phase plan includes the prohibition clause.

---

### DA-4: Link-Not-Copy Drift — Duplicating Guide 07/00/02 Content in the Scenario Guides

**Confidence:** HIGH — Link-not-copy is a v1.11 explicit project constraint per `PROJECT.md`: "Link-not-copy to existing guides `00-ade-lifecycle`/`02-enrollment-profile`/`07-platform-sso-setup`." Documented in v1.10 PITFALLS.md as DI-2 carrying forward from v1.9.

**What goes wrong:**
The Pillar A scenario guide threads through enrollment → delivery → Setup Assistant → PSSO registration. An author who needs to explain PSSO configuration settings will be tempted to copy the Settings Catalog table from guide 07 rather than cross-linking to it. Similarly, an author documenting ADE delivery will copy content from guide 00 rather than cross-linking. Over time, the copied content drifts from the source; updating guide 07 does not update the scenario guide copy; readers get contradictory information in two places.

**How to avoid:**
- Each Pillar A/B phase plan must include an explicit link-not-copy checklist: "Does this phase add any configuration tables, step lists, or reference content that already exists in guides 00, 02, or 07? If yes: cross-link; do not copy."
- For content that does NOT exist in prior guides (e.g., migration-specific PSSO re-registration steps), original content is appropriate.
- Per-section cross-links should use named anchors (`#stage-4-setup-assistant`) not just top-level guide links, for precision.

**Warning signs:**
- Phase plan diff shows the Settings Catalog `com.apple.extensiblesso` payload table or PSSO verification steps copied into the new scenario guide
- The new guide contains multi-paragraph explanations of ADE stages already covered in guide 00

**Phase to address:** Pillar A and Pillar B content authoring phases — link-not-copy checklist item in every phase plan.

---

### DA-5: Capability-Matrix V-63-08 Blob-Hash Desync on Migration-Coverage Row Addition

**Confidence:** HIGH — `check-phase-63.mjs` V-63-08 assertion has current baseline `73f16378197223378a8507a6751c763902de58db` (verified 2026-06-24 from `scripts/validation/check-phase-63.mjs:202-216`). Any edit to `docs/reference/macos-capability-matrix.md` will break V-63-08 unless the validator is updated in the same atomic commit. Carry-forward of v1.10 PITFALLS.md DI-2.

**What goes wrong:**
Pillar C glossary and capability-matrix updates for v1.11 (MDM Migration coverage row, Kandji/Iru → Intune row, ADE-during-Setup-Assistant row) will edit `docs/reference/macos-capability-matrix.md`. If the V-63-08 blob hash in `check-phase-63.mjs` is not updated in the same atomic commit, the validator chain goes RED immediately after the matrix edit and remains RED until the validator is updated.

Additionally, `check-phase-81.mjs` E3/E4 cross-link edges (guide 07 ↔ `macos-capability-matrix.md#authentication`) must not be broken by any new H2 anchors added to the matrix.

**How to avoid:**
- The capability-matrix phase plan must include a pre-edit anchor inventory step: `git hash-object docs/reference/macos-capability-matrix.md` → record baseline → edit matrix → update V-63-08 in `check-phase-63.mjs` → single atomic commit for both files.
- Verify that new H2 anchors in the matrix are either covered by existing `4-platform-capability-comparison.md` cells or new cells are added in the same commit.
- Do not add cross-links in the matrix to any new v1.11 guides until those guide files exist.

**Warning signs:**
- Phase plan edits `macos-capability-matrix.md` without a corresponding task to update `check-phase-63.mjs` V-63-08
- Matrix edit and validator update are in separate commits

**Phase to address:** Pillar C capability-matrix phase — pre-edit anchor inventory + atomic commit pattern.

---

### DA-6: Predecessor-Frozen Surface Must Not Change — Guides 00, 02, 07 Byte-Unchanged

**Confidence:** HIGH — Project convention carried across v1.0–v1.10: predecessor guides are considered frozen (byte-unchanged) once shipped. Pillar A and B are scenario guides built on top of guides 00/02/07 via link-not-copy. Any "helpful" edit to guide 07 during v1.11 to add migration-context notes would violate the frozen-surface principle if guide 07 is a v1.9 deliverable.

**What goes wrong:**
An author writing the Pillar A scenario guide notices that guide 07's ADE prerequisites section does not mention `EnableRegistrationDuringSetup` compatibility. They add an inline note to guide 07 to "help readers." The edit to guide 07 may break validators that pin guide 07's content (e.g., `check-phase-76.mjs` or equivalent) and violates the "predecessor frozen" convention.

**How to avoid:**
- v1.11 scenario guides must NOT edit guides 00, 02, or 07 for Pillar A/B content additions. New scenario-specific context belongs in the new scenario guide files.
- If an error or outdated fact is discovered in guides 00/02/07, it should be flagged as a correction task in a separate phase plan, not silently folded into a Pillar A/B content phase.
- The REQUIREMENTS doc for v1.11 should explicitly list guides 00, 02, 07 as out-of-scope for content modifications.

**Warning signs:**
- Phase plan diff shows edits to `docs/macos-lifecycle/00-ade-lifecycle.md`, `docs/admin-setup-macos/02-enrollment-profiles.md`, or `docs/admin-setup-macos/07-platform-sso-setup.md` mixed in with new scenario guide creation
- Inline notes in guide 07 starting with "For migration context, see also..."

**Phase to address:** All Pillar A/B content phases — REQUIREMENTS.md must explicitly scope guides 00/02/07 as frozen for v1.11.

---

### DA-7: Per-Section Freshness Stamps Omitted on High-Drift macOS 26 Content

**Confidence:** HIGH — Project convention per `PROJECT.md` v1.11 context: "macOS 26 / iOS 26 version-gating throughout — high-drift content needing per-section `last_verified` freshness stamps." The ADE-during-Setup-Assistant section in guide 07 already carries `last_verified: 2026-06-20` / `review_by: 2026-09-20` as a precedent (observed directly in guide 07).

**What goes wrong:**
v1.11 introduces two scenario guides with significant macOS 26-gated content (in-place migration, ADE-during-Setup-Assistant). If per-section `last_verified` / `review_by` frontmatter or callout stamps are omitted from the OS-26-gated sections, there is no signal to future maintainers that this content needs verification as macOS 26 matures (from beta/developer preview → release → GA). Content verified in June 2026 may be stale by September 2026 (next 90-day review cycle).

**How to avoid:**
- Every OS-26-gated section in Pillar A and Pillar B guides must carry a `last_verified` / `review_by` stamp (90-day cycle, matching the guide 07 ADE advanced section precedent).
- Phase plans must include "add freshness stamps to all macOS-26-gated sections" as an explicit deliverable item.
- Non-OS-26-gated sections (standard post-enrollment PSSO, pre-26 fallback path) do not require the 90-day cycle but should still carry the standard file-level `last_verified` frontmatter.

**Warning signs:**
- New guide files have frontmatter `last_verified` at the file level but omit per-section stamps on the ADE-during-Setup-Assistant or in-place migration sections
- Phase diff adds OS-26-gated content without any `last_verified` annotation

**Phase to address:** Pillar A and Pillar B content authoring phases — freshness stamp placement is a required deliverable, not optional polish.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy PSSO setup steps from guide 07 into the scenario guide | Scenario guide is self-contained, easier for first-time readers | Duplicated content drifts; guide 07 updates are not reflected in the scenario guide; violates link-not-copy convention | Never — cross-link from scenario guide to guide 07 for config steps |
| Document OS-26 in-place migration supervision as "preserved" without a pilot-device verification | Removes a documentation gap | If supervision is NOT preserved on some device models/firmware, admins relying on supervised-only features will have an undocumented regression | Never until verified on a test device; flag as MEDIUM confidence until then |
| Set a fleet-wide ABM migration deadline without a pilot device test | Faster migration timeline | Deadline lock on devices where enrollment fails (network, misconfiguration, old OS) bricks devices in production; recovery requires ABM admin access per device | Never — pilot first |
| Skip VPP token migration step and use Intune "Take control" | Faster | Stale license records in Kandji/Iru + Intune conflict; app updates fail silently on migrated devices | Never — always revoke Kandji/Iru assignments before uploading to Intune |
| Omit `last_verified` freshness stamps from macOS 26 sections | Less document maintenance overhead | Content becomes stale without a review trigger as macOS 26 matures; future maintainers do not know which sections need verification | Never for OS-26-gated content — follow guide 07 ADE section precedent |
| State "PSSO key survives migration" without authoritative citation | Reduces user anxiety about migration | If wrong, users AND helpdesk will be blindsided by registration prompts post-migration; the operational implication (CA lockout window) is significant | Never — Apple's authoritative statement is that unenrollment causes unregistration; document re-registration as required |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| ABM "Assign Device Management" + Deadline | Setting deadline before device appears in Intune device list | Sync first (wait up to 24h); confirm device shows in Intune enrollment list; then set deadline |
| PSSO re-registration after migration | Assuming PSSO survives the Kandji-to-Intune handoff | Explicitly document post-migration PSSO re-registration as a required step; include `app-sso platform -s` verification |
| VPP token handoff | Uploading token to Intune before revoking Kandji/Iru assignments | Sequence: revoke in Kandji/Iru → remove from Kandji/Iru → upload to Intune |
| ADE-during-Setup-Assistant Company Portal version | Using the standard post-enrollment Company Portal floor (5.2404.0) for the ADE path | ADE path requires Company Portal 5.2604.0 as LOB app, not VPP |
| Capability matrix + V-63-08 baseline | Editing `macos-capability-matrix.md` without updating `check-phase-63.mjs` V-63-08 baseline | `git hash-object` pre-edit + post-edit; update V-63-08 in the same atomic commit |
| Pre-26 Kandji ADE device re-enrollment | Using `sudo profiles renew` as no-wipe re-enrollment trigger | `profiles renew` does not re-run Setup Assistant; wipe required for pre-26 ADE-enrolled Kandji devices |

---

## "Looks Done But Isn't" Checklist

- [ ] **PSSO re-registration step:** Does the migration guide explicitly include post-migration PSSO re-registration as a required user action (not optional)?
- [ ] **Userless device scope gate:** Does both the provisioning guide and the migration guide include a callout that userless/no-affinity devices cannot complete PSSO registration?
- [ ] **ADE-during-Setup-Assistant Company Portal version:** Is Company Portal 5.2604.0 (LOB, not VPP) specified for the ADE path, sourced from current Microsoft Learn (not the 5.2404.0 standard floor)?
- [ ] **OS-26 gate explicit:** Do all OS-26-gated sections specify `macOS 26` exactly, not `macOS 14+` or "the modern path"?
- [ ] **Pre-26 fallback wipe requirement:** Does the pre-26 fallback section explicitly say "wipe required" and NOT suggest `sudo profiles renew` for ADE-enrolled Kandji devices?
- [ ] **One-time reset for pre-26-ABM-enrolled devices:** Does the migration guide include a MEDIUM-confidence callout about the one-time reset requirement for devices added to ABM while running macOS < 26?
- [ ] **VPP token sequencing:** Is VPP token migration documented as a distinct, sequenced step before device migration deadline, with revoke-in-Kandji BEFORE upload-to-Intune?
- [ ] **Sync timing callout:** Is the 24h ABM→Intune sync lag documented before the "set deadline" step?
- [ ] **Freshness stamps:** Do all macOS-26-gated sections have `last_verified` / `review_by` stamps following the guide 07 ADE section precedent?
- [ ] **Capability matrix atomic commit:** Is the V-63-08 blob hash update in `check-phase-63.mjs` in the same commit as the `macos-capability-matrix.md` edit?
- [ ] **Navigation-last invariant:** Do all Pillar A/B content phase plans include an explicit nav-hub prohibition clause?
- [ ] **No content copied from guides 00/02/07:** Does a diff check confirm no substantive content from predecessor guides is copied into the new scenario guides?

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| PSSO key destroyed by MDM password reset | LOW (user-disruptive but fast) | User completes "Registration Required" re-registration flow; verify `app-sso platform -s` shows REGISTERED |
| Deadline lock on device that cannot complete enrollment | MEDIUM | ABM admin: Devices → serial → Release Device (or reassign MDM server back); diagnose enrollment failure; re-set deadline after fix |
| VPP token in two MDMs creating license conflicts | HIGH | Revoke all app assignments in Intune + Kandji/Iru; remove from one MDM; wait for Apple server sync; re-add to intended MDM; re-assign licenses |
| Kandji agent residue blocking Intune enrollment (pre-26 path) | HIGH | Full wipe-and-re-enroll; there is no repair path that avoids a wipe for ADE-enrolled devices blocked by Kandji agent residue |
| Capability matrix V-63-08 FAIL due to non-atomic edit | LOW | Update `check-phase-63.mjs` V-63-08 baseline to new `git hash-object` value; commit alongside matrix file |
| Content copied from guide 07 causing drift | MEDIUM | Replace duplicated content with cross-links; update both files simultaneously; add version history row |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|-----------------|--------------|
| P-1: PSSO key destroyed by password reset | Pillar A guide authoring; L2 runbook | `[!WARNING]` callout on MDM password reset in guide; symptom in runbook |
| P-2: Userless device — PSSO never registers | Pillar A guide authoring; Pillar B guide authoring | "Scope: user-affinity only" callout at guide top |
| P-3: SSO extension timing "Unable to sign in" | Pillar A guide authoring (ADE path section) | "Try Again" recovery documented; three-policy same-group rule in prerequisites |
| P-4: Mixed-fleet macOS < 26 silently excluded from in-place migration | Pillar B migration guide authoring | Pre-migration checklist step: OS version inventory before deadline |
| P-5: PSSO re-registration required after MDM migration | Pillar B migration guide authoring; L2 runbook | Post-migration step documented; `app-sso platform -s` verification required |
| P-6: Deadline lock — non-dismissible screen, admin recovery | Pillar B migration guide authoring; L2 runbook | ABM recovery steps (MEDIUM confidence) in runbook; pilot-first recommendation in guide |
| P-7: ACME only on re-enrollment — migrated devices | Pillar B migration guide authoring | ACME behavior note in enrollment section; wipe recommended for pre-26 path |
| P-8: ABM/Intune sync lag delays migration | Pillar B migration guide authoring | "Sync Timing" callout before deadline-setting step |
| P-9: VPP single-MDM constraint | Pillar B migration guide authoring | VPP token migration step explicitly sequenced before device deadline |
| P-10: Kandji/Iru leftover agent + supervision ambiguity | Pillar B migration guide authoring; L2 runbook | Source-side cleanup step in guide; pilot-device verification for supervision |
| P-11: Pre-26 wipe required for ADE Kandji devices | Pillar B migration guide (pre-26 fallback section) | "Wipe required" stated explicitly; no `profiles renew` shortcut for ADE devices |
| P-12: One-time reset for pre-26-ABM-enrolled devices | Pillar B migration guide (pre-migration checklist) | MEDIUM confidence callout; pilot-device test before fleet migration |
| DA-1: PSSO EnableRegistrationDuringSetup preview vs GA | Pillar A authoring phase | GA status and Company Portal 5.2604.0 verified against current MS Learn on authoring day |
| DA-2: Wrong OS version gate | Pillar A and Pillar B authoring phases | Version gate table audited per section before commit |
| DA-3: Navigation-last violation | Roadmap design + every Pillar A/B phase plan | Nav-hub prohibition clause in every content-phase plan |
| DA-4: Link-not-copy drift | Pillar A and Pillar B authoring phases | Link-not-copy checklist item in phase plan; diff confirms no guide 07/00/02 content copied |
| DA-5: Capability matrix V-63-08 desync | Pillar C capability-matrix phase | Pre-edit `git hash-object` inventory; atomic commit for matrix + V-63-08 update |
| DA-6: Predecessor-frozen guides 00/02/07 edited | Pillar A and Pillar B authoring phases | REQUIREMENTS.md scopes guides 00/02/07 as frozen for v1.11; diff confirms no edits |
| DA-7: Freshness stamps omitted from macOS 26 sections | Pillar A and Pillar B authoring phases | Deliverable checklist item: `last_verified` / `review_by` on every OS-26-gated section |

---

## Sources

### HIGH confidence (official Apple and Microsoft documentation)

- [Apple Support — Migrate managed devices to another device management service](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web) — migration process steps, notification cadence, unenrollment+re-enrollment mechanism
- [Apple Support — Platform SSO for macOS](https://support.apple.com/guide/deployment/platform-sso-for-macos-dep7bbb05313/web) — "If you unenroll a Mac from the device management service, it also unregisters from the IdP" (PSSO re-registration after MDM migration); Secure Enclave key password-reset destruction
- [Microsoft Learn — macOS Platform SSO overview (Entra)](https://learn.microsoft.com/en-us/entra/identity/devices/macos-psso) — PSSO overview; EnableRegistrationDuringSetup GA status; UserSecureEnclaveKeyBiometricPolicy requiring re-registration on policy change; updated 2026-06-15
- [Microsoft Learn — Overview of Apple Automated Device Enrollment for macOS in Intune](https://learn.microsoft.com/intune/device-enrollment/apple/overview-automated-enrollment-macos) — "Devices managed by another MDM provider must unenroll before enrolling in Intune"; ACME only issued on re-enrollment; ACME on macOS 13.1+; updated 2026-04-15
- [Microsoft Learn — Manage macOS ADE devices and tokens in Intune](https://learn.microsoft.com/intune/device-enrollment/apple/manage-devices-tokens-macos) — 24h auto-sync; 15-min manual rate limit; 7-day full-sync cooldown; 30-45 day device-release lag; updated 2026-06-22
- [Microsoft Q&A — Unable to enroll macOS Device in Intune after migrating from Kandji (without wipe)](https://learn.microsoft.com/en-us/answers/questions/5542784/im-unable-to-enroll-macos-device-in-intune-after-m) — "macOS only queries ABM for MDM assignment during Setup Assistant after a wipe"; ABM re-enrollment circular dependency confirmed; 2025

### HIGH confidence (internal project lineage)

- `docs/macos-lifecycle/00-ade-lifecycle.md` Stage 7 "Watch Out For" — PSSO Secure Enclave key destruction by MDM password reset; Stage 6 "Watch Out For" — userless devices; Stage 4 "Watch Out For" — ADE-during-Setup-Assistant timing ("Unable to sign in" + "Try Again" recovery)
- `docs/admin-setup-macos/07-platform-sso-setup.md` Advanced section — ADE path prerequisites (Company Portal 5.2604.0 LOB, three-policy same-group rule, macOS 26 hard gate)
- `.planning/milestones/v1.10-research/PITFALLS.md` — DI-1 (navigation-last), DI-2 (capability-matrix V-63-08), DI-3 (chain-red masking); carried forward
- `scripts/validation/check-phase-63.mjs` lines 202-216 — V-63-08 current baseline `73f16378197223378a8507a6751c763902de58db`
- `PROJECT.md` v1.11 milestone section — "navigation-last", "link-not-copy", "per-section last_verified freshness stamps", "macOS 26 / iOS 26 version-gating throughout"

### MEDIUM confidence (community sources + limited authoritative anchor)

- [Addigy — macOS/iOS/iPadOS 26 Device Management Migration](https://addigy.com/blog/os-26-device-management-migration/) — deadline non-dismissible lock on macOS; "old profiles/configurations are removed"; VPP token migration requires remove-and-re-add
- [SimpleMDM — Apple streamlines MDM migrations in iOS 26 and macOS 26](https://simplemdm.com/blog/apple-streamlines-mdm-migrations-in-ios-26-and-macos-26/) — notification escalation cadence
- Community sources (multiple) — one-time device reset requirement for devices added to ABM on pre-26 OS; supervision status not definitively confirmed post-migration
- [IntuneIRL — macOS 26 migration](https://intuneirl.com/mac-admins-your-migration-glow-up-just-dropped/) — "old MDM profile removed after new one is in place" (profile-swap implication); requires pilot test

---
*Pitfalls research for: v1.11 macOS PSSO End-to-End Provisioning & MDM Migration*
*Researched: 2026-06-24*
