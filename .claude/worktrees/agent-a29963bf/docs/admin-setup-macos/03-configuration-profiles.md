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

Configuration profiles are delivered via the **MDM channel (APNs)**, NOT the Intune Management Extension (IME) agent. If a profile fails to deliver, troubleshoot APNs connectivity, not the IME agent. See [Network Endpoints](../reference/endpoints.md#macos-ade-endpoints) for the APNs endpoint list.

> **Key distinction:** Apps deployed as DMG or unmanaged PKG use the IME agent. Configuration profiles and managed PKG apps use the MDM channel (APNs). Troubleshooting the wrong channel is the most common misdiagnosis for profile delivery failures.

---

## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **Wi-Fi**

Key settings:

| Setting | Purpose | Values |
|---------|---------|--------|
| SSID | Network name to auto-join | Text (case-sensitive) |
| Hidden Network | Connect to non-broadcast SSIDs | True / False |
| Security Type | Encryption protocol | WPA2 Enterprise, WPA3, etc. |
| Certificate | 802.1X authentication credential | SCEP or PKCS certificate profile reference |
| Proxy Setup | Network proxy configuration | None / Manual / Automatic |

> **What breaks if misconfigured:** SSID must match the network name exactly -- it is case-sensitive. If the SSID has a case mismatch (e.g., "CorpWifi" vs "corpwifi"), the device cannot find the network. Symptom appears in: device Wi-Fi settings (network not visible or connection fails silently) and Intune admin center (profile shows "Succeeded" even though the network is unreachable -- the profile delivered correctly, the SSID is simply wrong).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** If the security type is set to WPA2 Enterprise but the network uses WPA3, the connection fails silently. The device shows the SSID but cannot authenticate. Symptom appears in: device Wi-Fi settings (authentication error or repeated password prompts).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** For enterprise WPA2/WPA3 with certificate-based authentication, the Wi-Fi profile must reference a valid SCEP or PKCS certificate profile. If the certificate profile is missing, misconfigured, or has not yet delivered to the device, 802.1X authentication fails. Symptom appears in: device (connection error) and Intune admin center (compliance failure if network connectivity is required for compliance check-in).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

## VPN

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **VPN**

Key settings:

| Setting | Purpose | Values |
|---------|---------|--------|
| VPN Type | Protocol and provider | IKEv2, SSL (Custom), Cisco AnyConnect, Palo Alto, etc. |
| Server Address | VPN gateway hostname or IP | FQDN or IP address |
| Authentication Method | How the client authenticates | Certificate, Username/Password, Shared Secret |
| On-Demand Rules | Auto-connect triggers | Domain-based, SSID-based, or Always-on |

> **What breaks if misconfigured:** If the VPN type does not match the actual VPN server configuration (e.g., profile says IKEv2 but server is SSL), the connection fails immediately. Symptom appears in: device (VPN connection error in System Settings > Network) and Intune admin center (profile shows "Succeeded" because the profile delivered -- it is the VPN server handshake that fails).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** If the VPN server address is incorrect or the server's certificate does not match the expected identity, the connection fails or shows a certificate warning. Symptom appears in: device (connection timeout or certificate error dialog).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

## Email

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Accounts** > **Email**

Key settings:

| Setting | Purpose | Values |
|---------|---------|--------|
| Email Server | Exchange or IMAP/POP server | FQDN (e.g., outlook.office365.com) |
| Authentication Method | How the mail client authenticates | Modern authentication (OAuth), Certificate, Username/Password |
| S/MIME | Email signing and encryption | Enable / Disable (requires certificate profile) |
| Email Protocol | Server protocol | Exchange ActiveSync, IMAP, POP |

> **What breaks if misconfigured:** If the email server address is wrong or the authentication method does not match the server configuration, email sync fails. Symptom appears in: device Mail app (unable to connect error, repeated sign-in prompts) and Intune admin center (profile "Succeeded" but user reports no email).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

## Restrictions

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Restrictions**

Common restriction settings:

| Setting | Purpose | Default |
|---------|---------|---------|
| Allow App Store | User access to Mac App Store | Allowed |
| Allow AirDrop | File sharing via AirDrop | Allowed |
| Allow Handoff | Continuity between Apple devices | Allowed |
| Allow Screen Capture | Screenshots and screen recording | Allowed |
| Allow Password Modification | User changes login password | Allowed |
| Allow Content Caching | macOS content caching service | Allowed |
| Allow Cloud Photo Library | iCloud Photos sync | Allowed |
| Allow Erase All Content and Settings | User-initiated device wipe | Allowed |

> **What breaks if misconfigured:** Disabling "Allow Screen Capture" blocks all screenshots AND screen sharing applications (Zoom screen share, Teams screen share, remote desktop tools). Symptom appears in: device (screen share option greyed out in apps; users cannot take screenshots) and Intune admin center (no error -- this is by design, but users report it as broken).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Disabling "Allow Password Modification" prevents the user from changing their login password. If combined with a compliance policy requiring password rotation, the user becomes permanently non-compliant. Symptom appears in: device (password change option unavailable in System Settings) and Intune admin center (non-compliant for password expiration).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

## FileVault (Disk Encryption)

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Full Disk Encryption**

Key settings:

| Setting | Purpose | Values |
|---------|---------|--------|
| Enable FileVault | Enforce disk encryption | Enable / Disable |
| Recovery Key Escrow to Intune | Admin can retrieve recovery key | Location description text |
| Recovery Key Rotation | Rotate key after each use | Enabled with configurable interval |
| Defer FileVault | Delay encryption prompt | Enabled (number of times user can defer) |

> **What breaks if misconfigured:** If FileVault enforcement is configured without recovery key escrow, and the user forgets their password, the disk is unrecoverable. Symptom appears in: Intune admin center (no recovery key available when admin searches at Devices > [device] > Recovery keys) and on device (FileVault recovery screen shows no institutional recovery key).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** If defer is set too high, users may defer indefinitely and the device remains unencrypted for weeks. Compliance policy marks the device non-compliant, but the user sees no enforcement until defers are exhausted.
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **Critical note:** FileVault has TWO management surfaces -- a configuration profile (enforce encryption via Settings Catalog) AND a compliance policy (verify encryption is enabled in [Compliance Policies](05-compliance-policy.md)). Always deploy both together. The configuration profile enforces; the compliance policy detects non-compliance and triggers actions (email notification, Conditional Access block, device lock).

---

## Firewall

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **Firewall** + **Security** > **Security Preferences**

Key settings:

| Setting | Purpose | Values |
|---------|---------|--------|
| Application Firewall | Enable macOS application firewall | Enable / Disable |
| Block All Incoming Connections | Block all non-essential incoming connections | Yes / No |
| Stealth Mode | Device does not respond to probe requests | Enable / Disable |

> **What breaks if misconfigured:** Enabling "Block All Incoming Connections" without exceptions for management traffic (APNs, Intune Management Extension) can break MDM communication and app deployment. The device stops checking in, profiles stop delivering, and apps fail to install. Symptom appears in: Intune admin center (device shows "Last check-in" timestamp drifting into the past, new profiles stuck in "Pending") and on device (apps fail to install, policies stop updating).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **What breaks if misconfigured:** Enabling stealth mode without the application firewall has no effect -- stealth mode requires the firewall to be enabled. If only stealth mode is configured, the compliance policy for firewall may still show non-compliant.
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **Critical note:** Like FileVault, the firewall has both a configuration profile (enforce settings) AND a compliance policy (detect current state). Deploy both. See [Compliance Policies > Firewall](05-compliance-policy.md).

---

## Gatekeeper

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **System Policy** > **System Policy Control** (Allow Identified Developer: True, Enable Assessment: True) + **System Policy Managed** (Disable Override: True)

> **What breaks if misconfigured:** If Gatekeeper is not enforced via a configuration profile, users can change the setting to allow apps from "Anywhere" (or a less restrictive option). The compliance policy detects the change but cannot prevent it. The device becomes non-compliant only after the user has already changed the setting. Symptom appears in: Intune admin center (non-compliant for Gatekeeper) and device (Conditional Access blocks access if CA policy is active).
> See: [Troubleshooting Runbook](TBD - Phase 24)

> **Pairing required:** Deploy BOTH a Gatekeeper configuration profile (to lock the setting) and a Gatekeeper compliance policy (to detect if it is somehow changed). Without the configuration profile, the compliance policy is a detection-only backstop.

---

## Privacy Preferences (PPPC)

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Privacy** > **Privacy Preferences Policy Control**

Privacy Preferences Policy Control (PPPC) profiles grant per-app permissions for sensitive system resources: Full Disk Access, Screen Recording, Accessibility, Camera, Microphone, and others. These are required for:

- MDM agents and management tools that need Full Disk Access
- Security tools (antivirus, endpoint detection) that need system-level access
- Remote support tools that need Screen Recording and Accessibility

> **What breaks if misconfigured:** Without a PPPC profile granting the correct permissions, security tools silently fail to scan protected directories, and management agents cannot access files needed for compliance checks. Symptom appears in: security tool dashboard (incomplete scan coverage, missing file data) and Intune admin center (compliance checks may fail if the agent cannot read the data it needs).
> See: [Troubleshooting Runbook](TBD - Phase 24)

---

## Extensible SSO

### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Authentication** > **Extensible Single Sign On (SSO)**

Enterprise SSO plug-in or Platform SSO (macOS 14+) enables single sign-on across native apps and Safari using the organization's identity provider. For Microsoft Entra ID environments, the Microsoft Enterprise SSO plug-in provides SSO for all apps that use Apple's enterprise SSO framework.

> **Note:** Platform SSO (macOS 14 Sonoma and later) extends SSO to the macOS login window, enabling password sync between the local account and Entra ID. Full configuration details are beyond the scope of this guide -- see [Microsoft Platform SSO documentation](https://learn.microsoft.com/en-us/entra/identity/devices/macos-psso) for setup steps.

---

## Verification

- [ ] Each configuration profile shows "Succeeded" status in Intune admin center > Devices > Configuration > [profile] > Device status
- [ ] Profile delivery confirmed on target devices (System Settings > Profiles on macOS)
- [ ] FileVault escrow key visible in Intune admin center for encrypted devices (Devices > [device] > Recovery keys)
- [ ] Firewall and Gatekeeper settings enforced on device (verify via `defaults read` commands in [macOS Commands Reference](../reference/macos-commands.md))
- [ ] Wi-Fi and VPN profiles result in successful network connections on target devices
- [ ] PPPC permissions visible in System Settings > Privacy & Security on target devices

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| New profile via Endpoint protection template (deprecated) | Intune | Profile may not contain latest settings; stale template | [TBD - Phase 24] |
| FileVault without recovery key escrow | Intune | Admin cannot retrieve recovery key for locked device | [TBD - Phase 24] |
| Firewall blocks incoming without MDM exceptions | Intune | Device stops checking in; app deployment fails | [TBD - Phase 24] |
| SSID case mismatch in Wi-Fi profile | Intune | Device cannot connect to network despite profile success | [TBD - Phase 24] |
| Gatekeeper not enforced via config profile | Intune | User overrides Gatekeeper; compliance detects but cannot prevent | [TBD - Phase 24] |
| Certificate profile missing for enterprise Wi-Fi | Intune | 802.1X authentication fails on device | [TBD - Phase 24] |
| Screen capture restriction blocks screen sharing | Intune | Zoom/Teams screen share and remote desktop tools fail | [TBD - Phase 24] |
| Password modification restriction + password rotation compliance | Intune | User permanently non-compliant; cannot change password | [TBD - Phase 24] |
| PPPC profile missing for security tools | Intune | Security agent silently fails to scan protected directories | [TBD - Phase 24] |

## See Also

- [Compliance Policies](05-compliance-policy.md) -- detection counterpart to configuration profile enforcement
- [App Deployment](04-app-deployment.md)
- [ABM Configuration](01-abm-configuration.md)
- [Enrollment Profile](02-enrollment-profile.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [macOS Terminal Commands Reference](../reference/macos-commands.md)
- [Network Endpoints Reference](../reference/endpoints.md#macos-ade-endpoints)
- [macOS Provisioning Glossary](../_glossary-macos.md)
