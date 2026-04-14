---
last_verified: 2026-04-14
review_by: 2026-07-13
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
> See: [Troubleshooting Runbook](TBD - Phase 24)

- **Security type:** Must match the network's actual security type (WPA2, WPA3, etc.).

> **What breaks if misconfigured:** If the security type does not match, the connection fails silently. Symptom appears in: device (Wi-Fi connection fails repeatedly).
> See: [Troubleshooting Runbook](TBD - Phase 24)

- **Certificate (for enterprise WPA2/WPA3):** Must reference a valid SCEP/PKCS certificate profile deployed to the device.

> **What breaks if misconfigured:** Without a valid certificate profile, 802.1X authentication fails. Symptom appears in: device (Wi-Fi authentication error) and Intune admin center (profile shows "Error" status).
> See: [Troubleshooting Runbook](TBD - Phase 24)

## VPN

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **VPN**

Key settings:

- **VPN type:** IKEv2, SSL, or third-party (Cisco, Palo Alto, etc.)
- **Server address:** FQDN or IP of VPN server
- **Authentication method:** Certificate, username/password, or machine certificate

> **What breaks if misconfigured:** Wrong VPN type or server address causes connection failure with no clear error message. Symptom appears in: device (VPN shows "Not Connected" with generic error).
> See: [Troubleshooting Runbook](TBD - Phase 24)

## Email

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Accounts** > **Email**

Key settings:

- **Email server:** Exchange or IMAP/POP server address
- **Authentication method:** Username/password, certificate, or OAuth
- **S/MIME:** Optional encryption and signing certificates

> **What breaks if misconfigured:** Incorrect email server or authentication method causes email sync failure. Symptom appears in: device (Mail app shows "Cannot Get Mail" error).
> See: [Troubleshooting Runbook](TBD - Phase 24)

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
> See: [Troubleshooting Runbook](TBD - Phase 24)

## FileVault (Disk Encryption)

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Full Disk Encryption**

Key settings:

- **Enable FileVault:** Enforces encryption on next logout.
- **Recovery key escrow to Intune:** Allows admin recovery key retrieval from Intune admin center.
- **Recovery key rotation:** Configurable rotation after each use.

> **What breaks if misconfigured:** If FileVault enforcement is configured without recovery key escrow, and the user forgets their password, the disk is unrecoverable. Symptom appears in: Intune admin center (no recovery key available when admin searches) and on device (FileVault recovery screen shows no institutional key).
> See: [Troubleshooting Runbook](TBD - Phase 24)

**Critical:** FileVault has TWO surfaces -- a configuration profile (enforce via Settings Catalog) AND a compliance policy (verify enabled in [Compliance Policies](05-compliance-policy.md)). Always deploy both together.

## Firewall

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **Firewall** + **Security** > **Security preferences**

Key settings:

- **Application firewall:** Enable/Disable
- **Block all incoming connections:** Yes/No
- **Stealth mode:** Enable/Disable

> **What breaks if misconfigured:** Enabling "Block all incoming connections" without exceptions for management traffic (APNs, IME) can break MDM communication and app deployment. Symptom appears in: Intune admin center (device stops checking in) and on device (apps fail to install).
> See: [Troubleshooting Runbook](TBD - Phase 24)

**Critical:** Like FileVault, firewall has configuration profile (enforce) AND compliance policy (detect). Deploy both. See [Compliance Policies](05-compliance-policy.md).

## Gatekeeper

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **System Policy** > **System Policy Control** (Allow Identified Developer: True, Enable Assessment: True) + **System Policy Managed** (Disable Override: True)

> **What breaks if misconfigured:** If Gatekeeper is not enforced via configuration profile, users can change the setting to allow apps from "Anywhere." Compliance policy detects the change but does not prevent it. Symptom appears in: Intune admin center (non-compliant for Gatekeeper) and device (Gatekeeper set to permissive mode).
> See: [Troubleshooting Runbook](TBD - Phase 24)

## Privacy Preferences (PPPC)

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Privacy** > **Privacy Preferences Policy Control**

Per-app privacy permissions for Full Disk Access, Screen Recording, Camera, Microphone, etc. Required for MDM agents and security tools that need elevated permissions on macOS.

Common use cases:
- **Full Disk Access** for endpoint security agents (CrowdStrike, Microsoft Defender)
- **Screen Recording** for remote support tools
- **Accessibility** for automation and assistive tools

> **What breaks if misconfigured:** Without PPPC profiles, security tools prompt the user for permissions on first run. If the user denies, the tool cannot function until the admin deploys a PPPC profile and the user re-approves. Symptom appears in: device (security agent reports reduced functionality) and security dashboard (gaps in endpoint coverage).
> See: [Troubleshooting Runbook](TBD - Phase 24)

## Extensible SSO

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Authentication** > **Extensible Single Sign On (SSO)**

Enterprise SSO plug-in or Platform SSO (macOS 14+) for single sign-on across apps and web. Two configuration approaches:

- **SSO app extension (Redirect type):** For Microsoft Enterprise SSO plug-in -- enables SSO across Safari and apps using Microsoft identity
- **Platform SSO (macOS 14+):** Binds the macOS login password to Entra ID credentials; enables passwordless login via Touch ID or smart card

See official Microsoft documentation for full Platform SSO configuration, as setup requires specific Entra ID and device registration steps.

## Verification

- [ ] Each configuration profile shows "Succeeded" status in Intune admin center > Devices > Configuration > [profile] > Device status
- [ ] Profile delivery confirmed on target devices (System Settings > Profiles on macOS)
- [ ] FileVault escrow key visible in Intune admin center for encrypted devices
- [ ] Firewall and Gatekeeper settings enforced (verify via `defaults read` commands in [macOS Commands Reference](../reference/macos-commands.md))

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| New profile via Endpoint protection template (deprecated) | Intune | Profile may not contain latest settings; stale template | [TBD - Phase 24] |
| FileVault without recovery key escrow | Intune | Admin cannot retrieve recovery key for locked device | [TBD - Phase 24] |
| Firewall blocks incoming without MDM exceptions | Intune | Device stops checking in; app deployment fails | [TBD - Phase 24] |
| SSID case mismatch in Wi-Fi profile | Intune | Device cannot connect to network | [TBD - Phase 24] |
| Gatekeeper not enforced via config profile | Intune | User overrides Gatekeeper; compliance policy detects but cannot prevent | [TBD - Phase 24] |
| Certificate profile missing for enterprise Wi-Fi | Intune | 802.1X authentication fails on device | [TBD - Phase 24] |

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
| 2026-04-14 | Initial version -- 9 profile types with Settings Catalog paths, what-breaks callouts, delivery channel note | -- |
