---
last_verified: 2026-06-27
review_by: 2026-09-27
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Configuration Profiles

> **Settings Catalog required:** All new macOS configuration profiles should be created via the Settings Catalog in Intune (Devices > Manage devices > Configuration > Create > New policy > Settings catalog). The older Endpoint protection template is deprecated for new policies -- do not create new profiles via Templates > Endpoint protection.

## Prerequisites

- Intune Administrator role
- Devices enrolled via ADE (see [ABM Configuration](01-abm-configuration.md) and [Enrollment Profile](02-enrollment-profile.md))
- Understanding of the difference between configuration profiles (enforce settings) and compliance policies (detect non-compliance) -- see [Compliance Policies](05-compliance-policy.md)

## Profile Delivery Channel

Configuration profiles are delivered via the **MDM channel (APNs)**, NOT the Intune Management Extension agent. If a profile fails to deliver, troubleshoot APNs connectivity, not the IME agent. See [Network Endpoints](../reference/endpoints.md#macos-ade-endpoints) for APNs endpoint list.

## Wi-Fi

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **Wi-Fi**

Key settings:

- **SSID:** Must match exactly (case-sensitive).

> **What breaks if misconfigured:** If SSID does not match the network name exactly (including case), the device cannot find or connect to the network. Symptom appears in: device (Wi-Fi settings show no matching network).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

- **Security type:** Must match the network's actual security type (WPA2, WPA3, etc.).

> **What breaks if misconfigured:** If the security type does not match, the connection fails silently. Symptom appears in: device (Wi-Fi connection fails repeatedly).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

- **Certificate (for enterprise WPA2/WPA3):** Must reference a valid SCEP/PKCS certificate profile deployed to the device.

> **What breaks if misconfigured:** Without a valid certificate profile, 802.1X authentication fails. Symptom appears in: device (Wi-Fi authentication error) and Intune admin center (profile shows "Error" status).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

## VPN

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **VPN**

Key settings:

- **VPN type:** IKEv2, SSL, or third-party (Cisco, Palo Alto, etc.)
- **Server address:** FQDN or IP of VPN server
- **Authentication method:** Certificate, username/password, or machine certificate

> **What breaks if misconfigured:** Wrong VPN type or server address causes connection failure with no clear error message. Symptom appears in: device (VPN shows "Not Connected" with generic error).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

## Email

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Accounts** > **Email**

Key settings:

- **Email server:** Exchange or IMAP/POP server address
- **Authentication method:** Username/password, certificate, or OAuth
- **S/MIME:** Optional encryption and signing certificates

> **What breaks if misconfigured:** Incorrect email server or authentication method causes email sync failure. Symptom appears in: device (Mail app shows "Cannot Get Mail" error).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

## Restrictions

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Restrictions**

Key settings to configure per organizational policy:

- **App Store access:** Allow or block App Store
- **AirDrop:** Allow or block file sharing
- **Handoff:** Allow or block continuity between Apple devices
- **Screen capture:** Allow or block screenshots
- **Password modification:** Allow or block password changes
- **Content caching:** Allow or block local content caching

> **What breaks if misconfigured:** Overly restrictive settings may block legitimate business workflows. Insufficient restrictions may allow data exfiltration via AirDrop or Screen capture. Symptom appears in: device (feature unavailable) or Intune admin center (compliance policy detects unrestricted setting).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

## Local Password Policy (Passcode)

#### In Intune admin center

Navigation: **Settings catalog > Passcode** (or **Device restrictions > Password**). This policy governs the **local macOS account password** — the credential used at the login / lock screen. It is distinct from the Entra password and from the managed LAPS admin password.

> **Applies to the local account, not Entra.** With the **Secure Enclave** PSSO method the local password is independent of Entra (see [Platform SSO → End-User Sign-In Experience](07-platform-sso-setup.md#end-user-sign-in-experience-secure-enclave)). With the **Password** PSSO method the local password is synced from Entra — in that case manage expiration in **Entra**, not here, to avoid conflicts.

Key settings:

| Setting | What it does | Recommendation |
|---------|--------------|----------------|
| Minimum password length | Minimum characters | Set a solid floor (e.g. 12+); encourage passphrases |
| Block simple passwords | Prevents `1234`, `0000`, etc. | **Yes** |
| Prevent reuse of previous passwords (1–24) | Blocks recent reuse | e.g. 5 |
| Maximum allowed sign-in attempts (2–11) | Locks the device after N wrong tries | e.g. 5 (avoid very low values — normal typos lock users out) |
| **Password expiration (days)** (1–65535) | Forces the user to change the password after N days | **Leave Not configured** (best practice) — see below |

**Best practice — do not force periodic expiration.** NIST and Microsoft recommend against periodic password rotation; it produces weaker, predictable passwords for no security benefit. Enforce strength (length, block-simple, prevent-reuse) once and leave **Password expiration = Not configured**. Put security on MFA + Conditional Access + Entra Password Protection (and, here, Secure Enclave's phishing-resistance). *(Sources: [Microsoft password-policy recommendations](https://learn.microsoft.com/microsoft-365/admin/misc/password-policy-recommendations); [Entra Zero Trust — protect identities](https://learn.microsoft.com/entra/fundamentals/zero-trust-protect-identities).)*

**If a compliance regime requires expiration:** set **Password expiration (days) = 90** (or your mandated interval). The user is prompted to create a new password when it expires. *(Microsoft: "enter 90 to expire the password after 90 days… users are prompted to create a new password" — [Apple device restriction settings](https://learn.microsoft.com/intune/device-configuration/templates/ref-device-restrictions-apple#password).)* This is **user-driven expiration**, not silent rotation like the LAPS admin account.

> **What breaks if misconfigured:** Forcing periodic expiration on a Secure Enclave fleet adds password friction (undermining the Touch ID / passwordless UX) and tends to weaken passwords. Setting maximum sign-in attempts too low (2–3) locks users out on ordinary typos. Symptom appears in: device (frequent change prompts / lockouts).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

## FileVault (Disk Encryption)

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Full Disk Encryption**

The **Full Disk Encryption** category contains three sub-payloads: **FileVault** (the encryption settings), **FileVault Options** (enforcement / hardening toggles), and **FileVault Recovery Key Escrow** (the key-retrieval description). Configure settings from each as needed.

> **Prerequisite:** As of macOS 10.15, FileVault configuration requires **User Approved MDM enrollment**. ADE/supervised enrollment is automatically user-approved, so this is satisfied for ADE devices.

**FileVault sub-payload:**

| Setting | Values | When / why |
|---------|--------|------------|
| Enable | Off / **On** | Turns on FileVault (XTS-AES 128) on macOS 10.13+. Required to encrypt. |
| Defer | Not configured / **Enabled** | **Effectively required.** Defers turning FileVault on until the current user next signs out/in, so macOS can capture the credential and generate the personal recovery key. Without `Defer = Enabled`, the profile commonly fails to apply. |
| Show Recovery Key | **true** (shown) / false (hidden) | Whether the personal recovery key is displayed to the user during encryption. Set to **false (hide)** when you rely on Intune escrow + Company Portal retrieval and don't want users recording the key. (Intune's legacy "Hide recovery key = Yes" maps to Show Recovery Key = false.) |
| Defer Don't Ask At User Logout | Not configured / Enabled | Suppresses the "enable FileVault?" prompt at **sign-out**; the user is prompted at next **sign-in** instead. Use to control prompt timing and reduce sign-out friction. |
| Defer Force At User Login Max Bypass Attempts | `-1` / `0` / `N` | How many times the user may skip enabling FileVault at login before it is forced. **`-1`** = never force (always allow deferral); **`0`** = force at the first login (strictest); **`N`** = allow N bypasses, then force. Use to tune enforcement strictness. |
| Recovery Key Rotation In Months | Not configured / **1–12** | Periodically rotates the **personal recovery key** every 1–12 months and re-escrows the new key to Intune. (This is periodic — *not* "after each use.") Use for higher-security postures; users retrieve the rotated key from Company Portal. |

**FileVault Options sub-payload** (enforcement / hardening — Apple `FDEFileVaultOptions`):

| Setting | Apple key | When / why |
|---------|-----------|------------|
| Dont Allow FDE Disable | `dontAllowFDEDisable` | **Recommended = True for corporate devices.** Prevents the user from turning FileVault **off** in System Settings, so encryption can't be silently disabled after enrollment. Pairs with the compliance "require encryption" check. |
| Dont Allow FDE Enable | `dontAllowFDEEnable` | Prevents the user from **manually enabling** FileVault. Rarely used — only when enablement must be exclusively MDM-driven. Usually leave unset. |
| Destroy FV Key On Standby | `DestroyFVKeyOnStandby` | **High-security only.** Destroys the in-memory FileVault key when the Mac enters standby, forcing a full password re-auth on wake (no cached unlock). Hardens against cold-boot / DMA attacks but affects wake/resume and Power Nap UX. Use only for high-sensitivity fleets. |

**FileVault Recovery Key Escrow sub-payload:**

| Setting | Values | When / why |
|---------|--------|------------|
| Location | Free-text string | A description shown to users explaining **where/how to retrieve** their personal recovery key (e.g. "Sign in to the Company Portal website > Devices > Get recovery key"). Configure this whenever you enable FileVault so users have self-service guidance, especially when rotation is on. |

**How escrow actually works (accuracy notes):**

- The personal recovery key is **escrowed to Intune automatically** when an Intune policy encrypts the device (or when a user uploads the key for a device they encrypted manually). There is no separate "escrow = on/off" toggle — escrow is a property of Intune-driven encryption.
- Admins can **view and rotate** recovery keys for devices marked **Corporate only** — **not** for **Personal/BYOD** devices (user privacy). Requires an Intune RBAC role with **Remote tasks > Rotate FileVault key**.
- Retrieval locations: **Company Portal website** (primary/most reliable) and the iOS/Android/Intune apps → device → **Get recovery key**.
- The other Recovery Key Escrow fields (`DeviceKey` / `EncryptCertPayloadUUID`) are for **institutional** recovery-key escrow via certificate (FileVault master keychain / third-party escrow) and are **not used** with Intune's built-in personal-key escrow.

**Recommended baseline (standard corporate ADE fleet):**

- **FileVault:** Enable = On; Defer = Enabled; Recovery Key Rotation In Months = 6–12 (optional); Show Recovery Key = false (hide, since the key is escrowed).
- **FileVault Options:** Dont Allow FDE Disable = True (prevent users disabling encryption). Leave Dont Allow FDE Enable and Destroy FV Key On Standby unset unless you have a specific high-security requirement.
- **FileVault Recovery Key Escrow:** Location = a clear, plain-language retrieval message.
- Pair with the **compliance** "Require encryption of data storage" check (see [Compliance Policies](05-compliance-policy.md)).

> **Assignment target — devices, not users (for corporate Macs).** Unlike the [Platform SSO policy](07-platform-sso-setup.md), which **must** target user groups, FileVault is a **device-level** encryption setting. Assign the Settings Catalog FileVault policy to **device groups** (or All Devices) for company-owned Macs; use **user groups** only for BYOD scenarios. Setup Assistant enforcement specifically targets **devices** via a filter on the `EnrollmentProfileName` attribute. Note: admin recovery-key visibility depends on device **ownership type** (Corporate vs Personal), *not* on whether you assigned to a user or device group.

**Setup Assistant enforcement (macOS 14+, optional):** To force FileVault enablement *during device setup* (instead of at the first user sign-out), configure the additional Setup-Assistant FileVault settings and meet the prerequisites: macOS 14+, ABM/ASM enrollment, **Await final configuration = Yes** in the [enrollment profile](02-enrollment-profile.md), and target via a device filter on the `EnrollmentProfileName` attribute. **Pre-macOS 14.4 caveat:** the account created interactively during Setup Assistant must have the **Administrator** role — relevant if you set the primary account to **Standard** (see [Enrollment Profile → Account Settings](02-enrollment-profile.md#account-settings-local-admin-and-local-user-accounts)). macOS 14.4+ removes this restriction.

**Verifying the recovery key is escrowed to Intune:**

*Admin (Intune):*
1. **Encryption report** — **Devices** > **Monitor** > **Device Encryption status**; confirm the device shows **Encrypted** and a recovery key is available.
2. **Per-device** — **Devices** > **All devices** > [device] > **Monitor** > **Recovery keys** > **Show Recovery Key** (Corporate devices only; generates a Microsoft Entra audit-log entry). A displayed key confirms escrow succeeded. Requires an RBAC role with **Remote tasks > Rotate FileVault key = Yes** (built-in: Help Desk Operator or Endpoint Security Administrator).

*End user (self-service):* Company Portal website (`portal.manage.microsoft.com`) > **Devices** > the Mac > **Get recovery key** (primary/most reliable; also the iOS/Android/Intune apps).

*On the device (Terminal):*
- `fdesetup status` — FileVault On/Off + encryption progress.
- `sudo fdesetup haspersonalrecoverykey` — returns `true` when a personal recovery key exists (the key that gets escrowed).
- `sudo fdesetup list` — lists FileVault-enabled users.

*If escrow hasn't happened:* escrow runs in two stages (key-escrow preparation → encryption). Check device network connectivity and the encryption report's escrow status. Error `-2016341107` / `0x87d1138d` means the user hasn't accepted the FileVault enablement prompt — educate the user, or use Setup Assistant enforcement to avoid the prompt.

> **What breaks if misconfigured:** Enabling FileVault **without `Defer = Enabled`** often causes the profile to fail to apply (encryption never starts). Enabling FileVault **without configuring the Recovery Key Escrow Location** (or on a device Intune didn't encrypt) means that if the user forgets their password the disk may be unrecoverable. Symptom appears in: Intune admin center (no recovery key available / profile error) and on device (FileVault recovery screen shows no institutional key).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

> **Don't confuse this with the PSSO FileVault Policy.** This Full Disk Encryption payload controls **disk-encryption enforcement**. The separate **Platform SSO > FileVault Policy** setting (`AttemptAuthentication`, etc.) in [Platform SSO Setup](07-platform-sso-setup.md) controls whether PSSO **verifies the Entra password at the FileVault unlock screen** (macOS 15+, Password method) — a different surface entirely.

**Critical:** FileVault has TWO surfaces -- a configuration profile (enforce via Settings Catalog) AND a compliance policy (verify enabled in [Compliance Policies](05-compliance-policy.md)). Always deploy both together.

## Firewall

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **Firewall** + **Security** > **Security preferences**

Key settings:

- **Application firewall:** Enable/Disable
- **Block all incoming connections:** Yes/No
- **Stealth mode:** Enable/Disable

> **What breaks if misconfigured:** Enabling "Block all incoming connections" without exceptions for management traffic (APNs, IME) can break MDM communication and app deployment. Symptom appears in: Intune admin center (device stops checking in) and on device (apps fail to install).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

**Critical:** Like FileVault, firewall has configuration profile (enforce) AND compliance policy (detect). Deploy both. See [Compliance Policies](05-compliance-policy.md).

## Gatekeeper

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **System Policy** > **System Policy Control** (Allow Identified Developer: True, Enable Assessment: True) + **System Policy Managed** (Disable Override: True)

> **What breaks if misconfigured:** If Gatekeeper is not enforced via configuration profile, users can change the setting to allow apps from "Anywhere." Compliance policy detects the change but does not prevent it. Symptom appears in: Intune admin center (non-compliant for Gatekeeper) and device (Gatekeeper set to permissive mode).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

## Privacy Preferences (PPPC)

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Privacy** > **Privacy Preferences Policy Control**

Per-app privacy permissions for Full Disk Access, Screen Recording, Camera, Microphone, etc. Required for MDM agents and security tools that need elevated permissions on macOS.

Common use cases:
- **Full Disk Access** for endpoint security agents (CrowdStrike, Microsoft Defender)
- **Screen Recording** for remote support tools
- **Accessibility** for automation and assistive tools

> **What breaks if misconfigured:** Without PPPC profiles, security tools prompt the user for permissions on first run. If the user denies, the tool cannot function until the admin deploys a PPPC profile and the user re-approves. Symptom appears in: device (security agent reports reduced functionality) and security dashboard (gaps in endpoint coverage).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

## Extensible SSO

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Authentication** > **Extensible Single Sign On (SSO)**

Enterprise SSO plug-in or Platform SSO (macOS 13+, macOS 14 recommended) for single sign-on across apps and web. Two configuration approaches:

- **SSO app extension (Redirect type):** For Microsoft Enterprise SSO plug-in -- enables SSO across Safari and apps using Microsoft identity
- **Platform SSO (macOS 13+; macOS 14 recommended; Smart Card requires macOS 14+):** Registers the Mac with Entra ID and provides device-wide SSO. Three mutually exclusive authentication methods configured in Settings Catalog: Secure Enclave key/Platform Credential (recommended — local password unchanged), Password sync (Entra ID password replaces local password), and Smart Card (macOS 14+ only)

Continue with Platform SSO setup in [07-platform-sso-setup.md](07-platform-sso-setup.md).

## Verification

- [ ] Each configuration profile shows "Succeeded" status in Intune admin center > Devices > Configuration > [profile] > Device status
- [ ] Profile delivery confirmed on target devices (System Settings > Profiles on macOS)
- [ ] FileVault policy assigned to **device groups** (company-owned) or **user groups** (BYOD only) — not the PSSO "user groups only" rule
- [ ] FileVault `Defer = Enabled` set (required for the profile to apply)
- [ ] FileVault Options `Dont Allow FDE Disable = True` set (prevents users disabling encryption) — corporate fleets
- [ ] Recovery-key escrow confirmed via **Devices > Monitor > Device Encryption status** (and on-device `sudo fdesetup haspersonalrecoverykey` returns `true`)
- [ ] FileVault personal recovery key visible in Intune admin center for encrypted **Corporate** devices (Personal/BYOD keys are not admin-visible by design)
- [ ] Firewall and Gatekeeper settings enforced (verify via `defaults read` commands in [macOS Commands Reference](../reference/macos-commands.md))

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| New profile via Endpoint protection template (deprecated) | Intune | Profile may not contain latest settings; stale template | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| FileVault enabled without `Defer = Enabled` | Intune / device | Profile fails to apply; encryption never starts | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| FileVault without recovery key escrow Location (or device not Intune-encrypted) | Intune | Admin cannot retrieve recovery key for locked device | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| Expecting admin recovery-key access on a Personal/BYOD device | Intune | Key not visible to admin (Corporate-only by design — not a failure) | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| Firewall blocks incoming without MDM exceptions | Intune | Device stops checking in; app deployment fails | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| SSID case mismatch in Wi-Fi profile | Intune | Device cannot connect to network | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| Gatekeeper not enforced via config profile | Intune | User overrides Gatekeeper; compliance policy detects but cannot prevent | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |
| Certificate profile missing for enterprise Wi-Fi | Intune | 802.1X authentication fails on device | [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md) |

## See Also

- [Compliance Policies](05-compliance-policy.md)
- [App Deployment](04-app-deployment.md)
- [ABM Configuration](01-abm-configuration.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [macOS Terminal Commands Reference](../reference/macos-commands.md)
- [Network Endpoints Reference](../reference/endpoints.md#macos-ade-endpoints)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-28 | Formalized FileVault (Full Disk Encryption) and Local Password Policy (Passcode) sections under DEP-02; bounded spot-verify of 4 factual claims confirmed correct against Microsoft Learn (2026-06-28) | -- |
| 2026-06-27 | Rewrote FileVault (Full Disk Encryption) section against the Settings Catalog: corrected rotation ("after each use" → 1–12 months), added the required `Defer` setting + Show Recovery Key / Defer Don't Ask / Max Bypass Attempts / Escrow Location, escrow accuracy (Corporate-only admin visibility), Setup Assistant enforcement (macOS 14+) + pre-14.4 admin caveat, and PSSO-FileVault-Policy distinction; verified against Microsoft Learn | -- |
| 2026-06-27 | Added third sub-payload **FileVault Options** (`dontAllowFDEDisable` / `dontAllowFDEEnable` / `DestroyFVKeyOnStandby`) with what/why, recommended corporate baseline, institutional-escrow (`DeviceKey`) note, and a **Verifying recovery-key escrow** procedure (encryption report + per-device Recovery keys + on-device `fdesetup` commands); verified against Microsoft Learn | -- |
| 2026-06-27 | Documented FileVault **assignment target** (device groups for corporate / user groups for BYOD; contrasted with PSSO's user-groups-only rule; ownership-type vs assignment distinction); verified against Microsoft Learn | -- |
| 2026-06-27 | Added "Local Password Policy (Passcode)" section: local-account password settings (length / block-simple / reuse / sign-in attempts / expiration), best-practice non-expiring guidance with NIST/Microsoft sources, compliance expiration alternative (90-day), and the local-vs-Entra-vs-LAPS credential distinction; verified against Microsoft Learn | -- |
| 2026-06-20 | Phase 76 (PSSO-01 / D-06): converted `07-platform-sso-setup.md` code-span to live markdown link | -- |
| 2026-06-20 | Phase 75 (PSSO-04 / DS-5): corrected Extensible SSO section — fixed macOS version floor (13+, 14 recommended, Smart Card 14+), separated the three auth methods, removed blanket password-binding claim; replaced external fallback with deferred in-suite pointer to `07-platform-sso-setup.md` (link converted in Phase 76) | -- |
| 2026-04-14 | Resolved Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- 9 profile types with Settings Catalog paths, what-breaks callouts, delivery channel note | -- |
