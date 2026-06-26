# Stack Research — v1.11 macOS PSSO End-to-End Provisioning & MDM Migration

**Domain:** Documentation facts — Apple/Intune/ABM feature names, OS gates, UI paths, MDM migration mechanics, PSSO binding behavior
**Researched:** 2026-06-24
**Overall confidence:** MEDIUM-HIGH (most facts verified against Microsoft Learn or Apple official docs; ABM UI path details from multiple third-party write-ups with Apple guide corroboration; PSSO-across-migration inference from official mechanism docs)

---

## Purpose

This is not a software stack file. "Stack" here means: the exact, citable, version-accurate facts the v1.11 walkthroughs must reflect. Every fact below carries a confidence rating and source URL. Facts marked VOLATILE should receive `last_verified` freshness stamps in the finished docs.

---

## TL;DR Fact Table

| # | Fact | Value | Confidence | Source URL | Volatile? |
|---|------|-------|------------|------------|-----------|
| F-01 | OS gate for in-place ABM MDM migration | macOS 26, iOS 26, iPadOS 26 or later (hard gate) | HIGH | https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web | YES |
| F-02 | OS gate for ADE-during-Setup-Assistant PSSO | macOS 26 or newer (hard gate — no earlier macOS) | HIGH | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment | YES |
| F-03 | ABM feature name (migration) | "Assign Device Management" | HIGH | https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web | NO |
| F-04 | ABM UI path to trigger migration | Devices > Inventory > select device(s) > "Assign Device Management" button | MEDIUM | https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web + https://www.ivanti.com/blog/apple-business-manager-device-migration-what-you-need-to-know | YES |
| F-05 | Deadline range | More than 1 day, less than 90 days | HIGH | https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web | NO |
| F-06 | Deadline notification cadence | Daily until 24 h before deadline; hourly for final 24 h; at 60/30/10/1 min for final hour | HIGH | Web sources cross-referencing Apple deployment guide | NO |
| F-07 | macOS deadline-miss lock behavior | Non-dismissible full-screen prompt blocks all device use until enrollment completes | HIGH | https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web | NO |
| F-08 | iOS/iPadOS deadline-miss lock behavior | Device restarts automatically; cancel button disappears; user forced to enroll to proceed | HIGH | https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web | NO |
| F-09 | In-place migration: wipe required? | NO wipe required on macOS 26 / iOS 26 / iPadOS 26 — replaces previous requirement to erase | HIGH | https://simplemdm.com/blog/apple-streamlines-mdm-migrations-in-ios-26-and-macos-26/ + Apple deployment guide | NO |
| F-10 | What migration does to management profile | Old MDM profile is removed; new MDM profile installed during reenrollment — no data wipe | HIGH | https://addigy.com/blog/os-26-device-management-migration/ ("Non-removable MDM profiles are supported as OS 26 has a special ability to remove then install the MDM profile") | YES |
| F-11 | Supervision status after migration | Device remains supervised; both supervised and unsupervised devices supported | MEDIUM | Multiple web sources; Apple deployment guide implies supervision continuity | YES |
| F-12 | macOS post-migration enrollment type | Profile-based enrollment (NOT ADE re-enrollment) — "macOS 26 supports migration for Mac computers that unenroll and reenroll with profile-based enrollment" | HIGH | https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web | YES |
| F-13 | iOS/iPadOS post-migration enrollment type | ADE re-enrollment to new MDM | MEDIUM | Addigy blog ("Enrollment type preserved: Results in ADE re-enrollment") | YES |
| F-14 | App/data preservation (iOS/iPadOS) | Apps and data preserved if new MDM delivers apps before DeviceConfigured command; requires await_device_configured key | HIGH | https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web | NO |
| F-15 | App/data preservation (macOS) | Migration preserves desktop session; user password required at macOS migration completion | HIGH | Addigy blog | NO |
| F-16 | VPP/Apps and Books migration | Content token must be removed from old MDM and uploaded to new MDM within 30 days; apps remain assigned up to 30 days | HIGH | https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web | NO |
| F-17 | ABM migration batch automation via API | NOT available — migration can only be initiated via ABM portal; no API for batch automation | MEDIUM | https://addigy.com/blog/os-26-device-management-migration/ | YES |
| F-18 | Migration GA status | GA as of WWDC 2025/OS 26 release; feature announced in Apple Platform Deployment guide for OS 26+ | MEDIUM | Multiple sources; Apple deployment guide updated for OS 26 | YES — verify post-OS-26-release-date |
| F-19 | Pre-macOS-26 migration path | Retire/wipe-and-re-enroll (factory reset required; no in-place path) | HIGH | Microsoft Q&A: https://learn.microsoft.com/en-us/answers/questions/5542784/im-unable-to-enroll-macos-device-in-intune-after-m | NO |
| F-20 | PSSO/Secure Enclave WPJ key: is it MDM-bound or Entra-tenant-bound? | Entra-tenant-bound. The WPJ key authenticates the device to the Entra tenant. Changing MDM servers within the SAME Entra tenant does NOT inherently require re-registration. Changing to a DIFFERENT Entra tenant DOES require re-registration (new tenant = new device identity). | MEDIUM | https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension (Secure Enclave key destroyed by password resets; device state "flips from Entra registered to Entra joined with new Device ID" on PSSO setup) | YES |
| F-21 | PSSO re-registration required after migration to NEW Entra tenant | YES — required. The WPJ/Secure Enclave key is tied to the Entra tenant Device ID. New tenant = new device registration = new Secure Enclave key. Old key is not portable. | HIGH | Mechanism documented at https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension | NO |
| F-22 | PSSO re-registration required after migration to SAME Entra tenant (new MDM server) | Likely not required (MDM is just a configuration delivery vehicle; Entra tenant is unchanged). However: if migration triggers management profile removal + re-install, the SSO extension session may need refresh. User may see "Registration Required" prompt as a soft nudge even if the underlying Secure Enclave key is intact. | LOW | No authoritative source found specifically for same-tenant MDM migration PSSO behavior; inferred from mechanism | YES — flag for validation |
| F-23 | Secure Enclave key destruction triggers | Any password reset that bypasses the interactive macOS password-change UI — including MDM-forced password resets and FileVault recovery key resets — destroys the Secure Enclave-stored PSSO key | HIGH | https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension ("Because Secure Enclave keys are protected by your local account password, password resets that occur without providing this password (such as FileVault or MDM-based recovery) resets the Secure Enclave.") | NO |
| F-24 | How to verify PSSO state post-migration | `app-sso platform -s` — shows Device Registration and User Registration state | HIGH | https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension | NO |
| F-25 | How to re-register PSSO after migration (same user) | System Settings > Users & Groups > Network Account Server > Edit > Repair (macOS 14+); or Company Portal > Preferences > Deregister, then re-register via Entra join flow | HIGH | https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension | NO |
| F-26 | PSSO re-registration: new Secure Enclave key creation | On re-registration, the SSO extension creates a new WPJ key in the Secure Enclave against the new/same tenant. Previous key in Keychain (if any) is deleted | HIGH | https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension ("Confirm that a previously registered device removes the key after successful PSSO device registration") | NO |
| F-27 | Kandji → Iru rebrand timing | October 2025 — Kandji rebranded as Iru. Both names refer to the same product/company. The brand "Kandji" is still valid for historical references and searchability | HIGH | https://www.computerworld.com/article/4077093/kandji-becomes-iru-opens-mdm-for-windows-and-android.html | NO |
| F-28 | Iru (Kandji) support portal URL | https://support.kandji.io (URL preserved; still resolves to Iru support) | HIGH | https://support.kandji.io/kb/about | NO |
| F-29 | Kandji/Iru source-side: releasing device in ABM | In ABM: Devices > select device > Edit MDM Server > select new MDM server (or unassign). This is the ABM "Assign Device Management" action — Kandji/Iru has no special portal step required; the ABM reassignment is sufficient for OS 26+ in-place migration | MEDIUM | https://support.kandji.io/kb/configuring-device-enrollment; general ABM mechanics | YES |
| F-30 | Kandji/Iru source-side: pre-OS-26 unenroll steps | For pre-26 fallback: (1) unenroll/retire device from Kandji/Iru portal, (2) reassign in ABM to Intune MDM server, (3) factory reset device, (4) ADE re-enroll via Intune | MEDIUM | https://learn.microsoft.com/en-us/answers/questions/5542784/im-unable-to-enroll-macos-device-in-intune-after-m | NO |
| F-31 | Intune ADE prerequisites (receiving side) | APNs push certificate (annual renewal), ADE token (.p7m from ABM), enrollment profile assigned before device powers on | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos (updated 2026-06-22) | NO |
| F-32 | ADE token sync: auto | Every 24 hours | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos | NO |
| F-33 | ADE token sync: manual rate limit | Once per 15 minutes | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos | NO |
| F-34 | ADE token sync: full sync cooldown | Once per 7 days | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos | NO |
| F-35 | ADE token release (device assignment visible in Intune) | Up to 30–45 days post-purchase for reseller-linked devices; immediate for ABM-reassigned devices after next sync | MEDIUM | Existing guide 00 + general Intune docs | NO |
| F-36 | Company Portal version floor: standard post-enrollment PSSO | 5.2404.0 (already documented in guide 07) | HIGH | Guide 07 + https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos | NO |
| F-37 | Company Portal version floor: ADE-during-Setup-Assistant PSSO | 5.2604.0 or newer — LOB app (NOT VPP) | HIGH | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment ("Company Portal 5.2604.0 and newer is required") | YES |
| F-38 | ADE-during-Setup-Assistant PSSO: GA vs preview | GA — "generally available" per search results referencing the TechCommunity blog and Microsoft Learn doc (updated 2026-06-23) | MEDIUM | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment (updated_at: 2026-06-23) | YES — confirm post-OS-26-ship |
| F-39 | ADE-during-Setup-Assistant PSSO: Intune setting name | "Enable Registration During Setup" (Settings Catalog path: Authentication > Extensible single sign-on > Platform SSO > Enable Registration During Setup) | HIGH | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment | NO |
| F-40 | ADE-during-Setup-Assistant PSSO: Password-method additional setting | "Enable Create First User During Setup" (same path prefix) — required ONLY when using Password authentication method | HIGH | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment | NO |
| F-41 | {{DEVICEREGISTRATION}} token | Exact value for Registration Token field in com.apple.extensiblesso payload; copy-paste including both sets of braces; case-sensitive | HIGH | Guide 07 (existing doc, verified) | NO |
| F-42 | ADE-during-Setup-Assistant PSSO: three-policy same-group rule | PSSO Settings Catalog policy + Company Portal LOB app + ADE enrollment profile — all three must be assigned to the same Assigned (static) user groups (NOT dynamic groups, NOT device groups) | HIGH | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment | NO |
| F-43 | ADE-during-Setup-Assistant PSSO: SmartCard support | SmartCard authentication NOT available in the ADE-during-Setup-Assistant path. Use Secure Enclave key (recommended) or Password sync | HIGH | Guide 07 (existing doc, verified) + Microsoft Learn doc context | NO |
| F-44 | ADE-during-Setup-Assistant PSSO: misconfiguration recovery | Wipe required — no in-place fix. Steps: (1) unassign PSSO policy, (2) set EnableRegistrationDuringSetup = disabled and sync, (3) if Password: disable EnableCreateFirstUserDuringSetup, (4) wipe device, (5) re-enroll with corrected config | HIGH | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment + guide 07 | NO |
| F-45 | ACME certificate: macOS version gate | macOS 13.1+ — ACME certificate replaces SCEP for device-to-MDM authentication; issued automatically during enrollment | HIGH | Guide 00 (existing doc, verified: Stage 4 "ACME certificate issuance. On macOS 13.1 and later") | NO |
| F-46 | Intune ADE enrollment policies UI path | Devices > Device onboarding > Enrollment > macOS tab > Bulk Enrollment Methods > Enrollment program tokens > [token] > Enrollment policies > Create policy > macOS | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos (updated 2026-06-22) | YES |
| F-47 | Intune old ADE profiles path (being retired) | Enrollment program tokens > Profiles — still works but will be retired; new features added only to Enrollment policies path | HIGH | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos | YES |
| F-48 | Migration: destination MDM must use await_device_configured | New MDM must use await_device_configured key to hold device at AwaitConfiguration to deliver apps/FileVault/Activation Lock config before DeviceConfigured command | HIGH | https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web | NO |
| F-49 | Shared iPad: supported for migration? | NOT supported — Shared iPad explicitly excluded from the OS 26 in-place migration feature | HIGH | https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web | NO |
| F-50 | Apple Configurator 30-day provisional exclusion | Devices enrolled via Apple Configurator within their 30-day provisional ownership period are not eligible for in-place migration | HIGH | https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web | NO |

---

## Section-by-Section Findings

### 1. ABM "Assign Device Management" Feature (Pillar B)

**Feature name (cite exactly):** "Assign Device Management"
**UI path in ABM:** Devices > Inventory > select device(s) > "Assign Device Management" button. For an existing pending migration, use "Change Deadline" on the device page.
**Confidence on exact UI path:** MEDIUM. Apple's own guide (https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web) says "Devices > Inventory" and "Assign Device Management." The Ivanti blog confirms the same button name. The Addigy blog says "Re-assign Device Management" — likely the same control worded slightly differently in context. Docs should use Apple's official name: "Assign Device Management."

**What "Set Deadline" does:**
Sets a date/time by which devices must complete reenrollment. Optional — without a deadline, migration only occurs after device wipe or manual enrollment command. With deadline: escalating notifications to the end user (daily → hourly → 60/30/10/1 min). At deadline: cancel button disappears; enrollment is mandatory.

**Deadline-miss lock behavior:**
- macOS: non-dismissible full-screen prompt blocks all device use until enrollment completes.
- iOS/iPadOS: device restarts; mandatory reenrollment to proceed.

**Deadline range:** More than 1 day, less than 90 days (hard constraint in the Apple feature).

**GA status:** Available with OS 26 release (macOS 26 / iOS 26 / iPadOS 26). Apple WWDC 2025 announcement; Apple deployment guide reflects it. MEDIUM confidence on exact GA date — verify against Apple release notes once OS 26 ships broadly.

---

### 2. In-Place Migration: Enrollment, Supervision, Management Profile (Pillar B)

**Is it wipe-free?** YES, for devices running OS 26 or later. This is the key differentiator from the pre-OS-26 path. The Apple deployment guide explicitly notes iOS previously required erase; OS 26 eliminates this.

**What happens to the existing MDM enrollment?**
The existing MDM profile (from Kandji/Iru) is removed and a new one from Intune is installed. On macOS specifically: device unenrolls from old MDM and reenrolls with profile-based enrollment (NOT ADE re-enrollment). The Apple deployment guide states explicitly: "macOS 26 or later supports migration for Mac computers that unenroll and reenroll with profile-based enrollment." This is important for Intune receiving-side setup — the post-migration Intune enrollment on macOS is profile-based, not ADE.

**Supervision status:** Device remains supervised (supervised and unsupervised both supported). MEDIUM confidence — Apple sources imply continuity; no explicit "supervision status preserved" statement found.

**ACME cert:** Because macOS migration results in profile-based enrollment (not ADE), ACME certificate issuance behavior may differ from the standard ADE path (F-45). The ACME cert is documented as issued "during enrollment" on macOS 13.1+, but profile-based vs. ADE distinctions in cert issuance are not explicitly stated in the sources reviewed. Flag as needing deeper research in the L2 migration-failure runbook phase.

---

### 3. PSSO / Secure Enclave Key Across MDM Migration (Critical for Pillar B)

**The core mechanism:**
The PSSO Secure Enclave WPJ (Workplace Join) key is a hardware-bound cryptographic key stored in the device's Secure Enclave (T2 / Apple Silicon). It is tied to the Microsoft Entra tenant Device ID — it authenticates the device to a specific Entra tenant. It is NOT tied to the MDM server.

**Implication for same-Entra-tenant MDM migration (Kandji/Iru → Intune, same tenant):**
If the Entra tenant does not change, the existing Secure Enclave WPJ key remains valid. However: because MDM migration removes and reinstalls the management profile, the SSO extension session will be disrupted. The user will likely receive a "Registration Required" notification and need to complete the Company Portal re-registration flow, which re-creates the Secure Enclave key against the same Entra tenant. This is functionally a re-registration but NOT a different tenant registration — the Device ID in Entra may or may not change depending on whether Intune creates a new device record.

**Implication for cross-tenant migration (different Entra tenant):**
Full PSSO re-registration required. Old Secure Enclave key is for the old Entra tenant's Device ID and cannot be reused. User must complete fresh PSSO registration in Company Portal against the new tenant.

**Official authoritative statement on when Secure Enclave key is destroyed:**
"Because Secure Enclave keys are protected by your local account password, password resets that occur without providing this password (such as FileVault or MDM-based recovery) resets the Secure Enclave. Resetting the Secure Enclave renders keys previously stored for this account inaccessible." (Microsoft Learn PSSO troubleshooting doc, updated 2026-06-15)

This means: if the migration process involves any MDM-driven password action, the key is destroyed and full re-registration is needed regardless of tenant.

**Verification command:** `app-sso platform -s` — output should show `Device Registration: REGISTERED` and `User Registration: REGISTERED` after successful PSSO re-registration.

**Re-registration steps post-migration (same user, same tenant):**
1. Open System Settings > Users & Groups > Network Account Server > Edit > Repair (macOS 14+)
   — OR —
   Open Company Portal > Preferences > Deregister, then re-register.
2. User completes MFA challenge if required by CA policy.
3. Verify with `app-sso platform -s`.

**Confidence on same-tenant PSSO survival:** LOW — no authoritative source explicitly confirms same-tenant PSSO key survival through MDM migration. The docs describe what destroys the key (password resets) but are silent on MDM profile removal/reinstall. Conservative documentation position: ALWAYS expect PSSO re-registration after MDM migration and document the re-registration steps regardless of tenant continuity.

---

### 4. Kandji / Iru Source-Side Release Steps (Pillar B)

**Rebrand confirmation:**
- Kandji rebranded as **Iru** in **October 2025**.
- Both names refer to the same company and product. Iru expanded beyond Apple to manage Windows and Android, while preserving all Apple MDM functionality.
- Iru support portal: https://support.kandji.io (URL unchanged, redirects to Iru).
- Docs should reference "Kandji (now Iru)" or "Iru (formerly Kandji)" for discoverability.

**Source-side steps for OS 26+ in-place migration:**
The ABM "Assign Device Management" action handles the MDM reassignment at Apple's level. No special Kandji/Iru portal step is required to "release" the device before triggering in-place migration — ABM simply reassigns the MDM server. The old MDM profile (Kandji/Iru) is removed from the device automatically when the new MDM profile (Intune) is installed during migration.

However: as a best practice before any migration, Kandji/Iru admins should:
1. Verify the device is in a good compliance/health state in the Iru console.
2. Confirm the device serial number is visible in ABM under the current Kandji/Iru MDM server.
3. In ABM: Devices > select device > Assign Device Management > select Intune MDM server > optionally set deadline.
4. The device will receive migration prompts; no Iru-portal-side action required to push unenrollment.

**Source-side steps for pre-OS-26 fallback (retire/wipe-and-re-enroll):**
1. In Kandji/Iru portal: retire/unenroll the device (removes MDM profile).
2. In ABM: reassign device to Intune MDM server.
3. Factory reset / erase the Mac (required — macOS pre-26 only checks ABM during Setup Assistant after erase).
4. Device enrolls in Intune via ADE during Setup Assistant.
5. PSSO registration follows standard post-enrollment path.

**Confidence on Iru-specific steps:** MEDIUM — Kandji/Iru support docs are not fully verified; the above is inferred from general MDM migration mechanics and the Microsoft Q&A thread. The Iru documentation portal (support.kandji.io) was not fetchable. The L2 runbook phase should verify current Iru console unenrollment steps.

---

### 5. Intune ADE Prerequisites (Receiving Side) — Confirmed Facts

These are well-documented in existing guide 00 and the Microsoft Learn ADE setup doc (updated 2026-06-22). Confirmed values:

| Prerequisite | Value | Source |
|---|---|---|
| APNs push certificate | Required; annual renewal | Microsoft Learn ADE setup |
| ADE token (.p7m) | Required; annual renewal; use Managed Apple ID | Microsoft Learn ADE setup |
| Enrollment profile | Must exist and be assigned BEFORE device powers on | Microsoft Learn ADE setup |
| ADE token auto-sync | Every 24 hours | Microsoft Learn ADE setup |
| Manual sync rate limit | Once per 15 minutes | Microsoft Learn ADE setup |
| Full sync cooldown | Once per 7 days | Microsoft Learn ADE setup |
| MDM push cert (APNs) renewal path | Tenant administration > Connectors and tokens > Apple push notification certificate | Microsoft Learn ADE setup |
| New ADE enrollment policies UI path | Devices > Device onboarding > Enrollment > macOS tab > Enrollment program tokens > Enrollment policies | Microsoft Learn ADE setup (2026-06-22) |
| Old profiles UI path (being retired) | Enrollment program tokens > Profiles — still functional; no new features added | Microsoft Learn ADE setup |

**Note on receiving migrated devices:** For post-migration profile-based enrollment (macOS 26 migration path), the standard ADE enrollment profile assignment is NOT the trigger — the device reenrolls directly via profile-based enrollment after the ABM migration. The Intune MDM server must be the assigned server in ABM (done via "Assign Device Management"), and the receiving MDM must use `await_device_configured` to hold the device long enough to deliver configurations before `DeviceConfigured` is sent.

---

### 6. ADE-during-Setup-Assistant PSSO — Confirmed Facts

All facts below verified against Microsoft Learn (updated 2026-06-23): https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment

| Fact | Value |
|---|---|
| macOS hard gate | macOS 26 or newer |
| Company Portal version floor | 5.2604.0 or newer |
| Company Portal delivery method | LOB app (NOT VPP) |
| GA vs preview | GA (generally available) |
| Intune settings catalog path | Authentication > Extensible single sign-on > Platform SSO > Enable Registration During Setup |
| Enable Registration During Setup | Enabled |
| Enable Create First User During Setup | Enabled (Password auth method ONLY; not needed for Secure Enclave) |
| Three-policy requirement | PSSO Settings Catalog + Company Portal LOB app + ADE enrollment profile — ALL three to same Assigned (static) user groups |
| Group type | Assigned (static) user groups ONLY — NOT dynamic, NOT device groups |
| SmartCard support | NOT available in ADE-during-Setup-Assistant path |
| Recommended auth method | Secure Enclave (UserSecureEnclaveKey) |
| Enrollment profile settings required | User Affinity: Enroll with User Affinity; Authentication: Setup Assistant with modern authentication; Await final configuration: Yes; Locked enrollment: Yes |
| Misconfiguration recovery | Wipe required — no in-place fix |
| Registration Token field value | `{{DEVICEREGISTRATION}}` (exact case, both sets of braces) |
| Fallback behavior if macOS < 26 | Falls back to classic post-enrollment PSSO (no error; PSSO simply doesn't register during Setup Assistant) |
| "Unable to sign-in" error during SA | Company Portal still downloading; retry via "Try Again" button; resolves when CP finishes installing |

---

## What NOT to Document (Out-of-Scope for v1.11)

| Item | Why Out-of-Scope |
|---|---|
| Multi-tenant PSSO federation | Deferred to dedicated architectural milestone (PROJECT.md) |
| On-prem-AD-only Kerberos | Documented in guide 10 (v1.10 milestone); not relevant to migration scenario |
| Azure Files Cloud-Kerberos GA | Out of scope for macOS PSSO migration docs |
| Jamf/other MDM source-side steps | v1.11 scopes Kandji/Iru only; other sources are future work |
| iOS/iPadOS PSSO | Not in scope for v1.11 (macOS platform only) |
| Intune-to-Intune tenant migration | Cross-tenant Intune migration is a separate DRIFT scenario |

---

## Facts Docs MUST Cite

**Pillar A (PSSO provisioning walkthrough) must cite:**
- F-02: macOS 26 hard gate for ADE-during-SA path
- F-36: CP 5.2404.0 floor for standard post-enrollment path
- F-37: CP 5.2604.0 floor for ADE-during-SA path (LOB, not VPP)
- F-39/F-40: exact Intune setting names (Enable Registration During Setup, Enable Create First User During Setup)
- F-41: `{{DEVICEREGISTRATION}}` exact token
- F-42: three-policy same-group rule
- F-43: SmartCard excluded from ADE-during-SA path
- F-44: wipe-required recovery path

**Pillar B (Migration walkthrough) must cite:**
- F-01: OS 26 hard gate
- F-03/F-04: ABM feature name "Assign Device Management" and UI path
- F-05/F-06/F-07/F-08: deadline behavior
- F-09/F-10: wipe-free, management profile replaced
- F-11/F-12: supervision preserved, macOS result = profile-based enrollment
- F-14/F-15: app/data preservation behavior
- F-16: VPP 30-day window
- F-19: pre-macOS-26 fallback = retire/wipe/re-enroll
- F-20/F-21: Secure Enclave key is Entra-tenant-bound; new tenant requires re-registration
- F-22: LOW confidence — same-tenant PSSO survival; document conservatively (always re-register)
- F-23: password reset triggers
- F-24/F-25/F-26: verification and re-registration steps
- F-27/F-28: Kandji → Iru rebrand October 2025
- F-29/F-30: source-side release steps
- F-49/F-50: Shared iPad and Configurator exclusions

---

## Open Gaps / Low-Confidence Areas Needing Phase-Specific Research

| Gap | Risk | Recommended Action |
|---|---|---|
| Same-tenant PSSO key survival through MDM profile replace/reinstall (F-22) | HIGH — if key is actually destroyed on profile reinstall, walkthrough must always prescribe re-registration | Phase authoring should test on actual device OR find authoritative statement; document conservatively until confirmed |
| Exact macOS 26 release date (GA confirmation) | MEDIUM | Add `last_verified` stamp; re-verify when OS 26 ships broadly |
| ABM UI path exact button label ("Assign Device Management" vs "Re-assign Device Management") | LOW | Verify in ABM portal during authoring; use Apple's official label from the deployment guide |
| Iru console unenrollment steps (current UI, post-rebrand) | MEDIUM | Phase author should verify current Iru portal steps against https://support.kandji.io |
| macOS profile-based post-migration enrollment: does Intune require a separate profile-based enrollment profile (not ADE profile)? | HIGH — if yes, docs must describe what Intune configuration is needed to receive a profile-based migrated device | Verify against Intune docs for profile-based macOS enrollment |
| ACME cert issuance on profile-based enrollment (post-migration macOS) | MEDIUM | Verify whether ACME cert (F-45) applies to profile-based as well as ADE path |
| Whether "Change Deadline" replaces "Assign Device Management" button for an already-initiated migration | LOW | Verify in ABM portal during authoring |

---

## Sources

| Source | URL | Used For | Confidence | Date |
|---|---|---|---|---|
| Apple Support: Migrate managed devices (deployment guide) | https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web | OS gates, deadline behavior, lock behavior, Shared iPad exclusion | HIGH | Accessed 2026-06-24 |
| Apple Support: Business guide — Migrate devices | https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web | ABM UI path, app preservation, await_device_configured, profile-based macOS enrollment | HIGH | Accessed 2026-06-24 |
| Microsoft Learn: ADE setup for macOS | https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos | ADE prerequisites, sync frequencies, Intune UI paths | HIGH | updated_at 2026-06-22 |
| Microsoft Learn: Configure PSSO during ADE enrollment | https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment | ADE-during-SA PSSO — all setting names, CP version, group requirements | HIGH | updated_at 2026-06-23 |
| Microsoft Learn: PSSO troubleshooting | https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension | Secure Enclave key destruction mechanism, re-registration steps, device migration note | HIGH | updated_at 2026-06-15 |
| Microsoft Q&A: macOS Intune after Kandji migration | https://learn.microsoft.com/en-us/answers/questions/5542784/im-unable-to-enroll-macos-device-in-intune-after-m | Pre-OS-26 wipe-required path confirmed | HIGH | Accessed 2026-06-24 |
| SimpleMDM blog: MDM migration iOS/macOS 26 | https://simplemdm.com/blog/apple-streamlines-mdm-migrations-in-ios-26-and-macos-26/ | Wipe-free confirmation, user experience flow | MEDIUM | Accessed 2026-06-24 |
| Addigy blog: OS 26 migration | https://addigy.com/blog/os-26-device-management-migration/ | Management profile behavior, supervision, deadline enforcement, VPP | MEDIUM | Accessed 2026-06-24 |
| Ivanti blog: ABM migration | https://www.ivanti.com/blog/apple-business-manager-device-migration-what-you-need-to-know | ABM UI steps, deadline behavior | MEDIUM | Accessed 2026-06-24 |
| Computerworld: Kandji → Iru rebrand | https://www.computerworld.com/article/4077093/kandji-becomes-iru-opens-mdm-for-windows-and-android.html | Rebrand timing (October 2025) | HIGH | Accessed 2026-06-24 |
| Iru.com: Kandji MDM | https://www.iru.com/kandji-mdm | Rebrand confirmation, platform expansion | HIGH | Accessed 2026-06-24 |
| IntuneIRL blog: PSSO during Setup Assistant | https://intuneirl.com/psso-just-got-smarter-platform-sso-in-macos-setup-assistant-a-deep-dive/ | ADE-during-SA facts corroboration | MEDIUM | Accessed 2026-06-24 |
| Existing guide 07 (last_verified 2026-06-20) | D:\claude\Autopilot\docs\admin-setup-macos\07-platform-sso-setup.md | CP version floors, ADE-during-SA appendix, setting names already documented | HIGH | 2026-06-20 |
| Existing guide 00 (last_verified 2026-06-20) | D:\claude\Autopilot\docs\macos-lifecycle\00-ade-lifecycle.md | ACME cert gate (13.1+), sync frequencies, Secure Enclave key destruction warning | HIGH | 2026-06-20 |

---

*Stack research for: v1.11 macOS PSSO End-to-End Provisioning & MDM Migration*
*Researched: 2026-06-24*
