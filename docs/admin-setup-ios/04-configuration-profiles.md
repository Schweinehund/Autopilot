---
last_verified: 2026-04-16
review_by: 2026-07-15
applies_to: ADE
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS ADE configuration via Apple Business Manager and Intune.
> For macOS ADE setup, see [macOS Configuration Profiles](../admin-setup-macos/03-configuration-profiles.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS Configuration Profiles

Configuration profiles are delivered to iOS/iPadOS devices via the MDM channel over APNs (Apple Push Notification service) — not via an agent. Configuration profiles **enforce** settings on devices; compliance policies **detect** non-compliance but do not enforce. iOS/iPadOS adds the supervision axis that macOS lacks: many device restriction settings apply only to supervised devices and are silently ignored on unsupervised devices. Settings that require supervised mode are explicitly marked with a 🔒 callout; on unsupervised devices they are ignored silently.

> **Settings Catalog recommended:** Create new iOS/iPadOS configuration profiles via the Settings Catalog in Intune (Devices > Manage devices > Configuration > Create > New policy > iOS/iPadOS > Settings catalog). Legacy Templates > Device restrictions remains available for settings not yet in Settings Catalog (notably Home Screen Layout) — use Templates only when a setting is unavailable in Settings Catalog.

## Prerequisites

- Intune Administrator role
- Devices enrolled via ADE (see [ADE Enrollment Profile](03-ade-enrollment-profile.md))
- Understanding that configuration profiles enforce settings; compliance policies detect non-compliance (see [Compliance Policies](06-compliance-policy.md))
- Understanding of supervised vs unsupervised management scope — see [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision)

## Profile Delivery Channel

Configuration profiles are delivered via the MDM channel over APNs (Apple Push Notification service). If a profile fails to deliver, troubleshoot APNs connectivity and the ADE/enrollment state — not an agent. iOS/iPadOS has no Intune Management Extension (IME) agent equivalent; all configuration profile delivery is MDM-channel only via APNs.

## Wi-Fi

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **iOS/iPadOS** > **Settings catalog** > **Networking** > **Wi-Fi**

Key settings:

- **SSID:** Network name — must match exactly (case-sensitive). A case mismatch silently prevents device discovery of the network.
- **Security type:** WPA2-Personal, WPA2-Enterprise, WPA3-Personal, or WPA3-Enterprise — must match the access point configuration exactly.
- **Authentication (EAP type for 802.1X):** EAP-TLS (certificate-based), PEAP, or TTLS. For enterprise WPA2/WPA3, reference an SCEP or PKCS certificate profile deployed to the same device groups.
- **Auto-join:** Enable for corporate-owned devices so the device connects automatically without user action.

> **What breaks if misconfigured:** SSID case mismatch — the device cannot find the network; the failure is silent and the user sees no matching network in Wi-Fi settings. Symptom appears in: device (no matching network in Wi-Fi list).

> **What breaks if misconfigured:** Missing SCEP/PKCS certificate profile for 802.1X enterprise authentication — the device cannot complete 802.1X authentication and silently fails to connect. Symptom appears in: device (Wi-Fi authentication error) and Intune admin center (profile shows "Error" status).

## VPN

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **iOS/iPadOS** > **Settings catalog** > **Networking** > **VPN**

Key settings:

- **Connection type:** IKEv2 (recommended for built-in iOS VPN), SSL-VPN, per-app VPN, or third-party (Cisco AnyConnect, Palo Alto GlobalProtect, etc.).
- **Server address:** FQDN or IP address of the VPN gateway — must be resolvable from the device network.
- **Authentication:** Certificate-based (reference a certificate profile), username and password, or machine certificate.
- **Per-app VPN:** Optionally scope the VPN tunnel to specific managed apps by bundle ID, limiting VPN traffic to only those apps.

> **What breaks if misconfigured:** Wrong VPN type or server address — the connection fails with a generic error and the user cannot establish a VPN tunnel. Symptom appears in: device (VPN shows "Not Connected" with generic error).

Per-app VPN requires the app to be deployed as a managed app (see [App Deployment](05-app-deployment.md)).

## Email

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **iOS/iPadOS** > **Settings catalog** > **Accounts** > **Exchange ActiveSync**

Note: iOS uses Exchange ActiveSync (EAS) for MDM-managed email accounts, not generic IMAP/POP. For Microsoft 365 tenants, this covers the native Mail app integration.

Key settings:

- **Exchange server host:** Exchange Online hostname (`outlook.office365.com`) or on-premises Exchange FQDN.
- **Authentication method:** Modern authentication (recommended — supports MFA and Conditional Access) or Basic authentication (legacy; avoid for Microsoft 365 tenants as Microsoft is disabling Basic auth).
- **S/MIME signing and encryption certificates:** Reference certificate profiles for email signing (S/MIME signing cert) and encryption (S/MIME encryption cert). Optional but required for regulated industries.
- **Allow Mail Drop:** Enable or disable iCloud Mail Drop for large file attachment sharing.
- **Block move messages to other accounts:** Prevent users from moving corporate email to personal or other non-managed mail accounts.

> **What breaks if misconfigured:** Basic authentication selected when the tenant enforces Modern authentication (OAuth) — the Mail app shows "Cannot Get Mail" and the user cannot access corporate email. Symptom appears in: device (Mail app authentication error, "Cannot Get Mail").

## Certificates

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **iOS/iPadOS** > **Templates** > **[SCEP certificate | PKCS certificate | Trusted certificate]**

Three certificate profile types are available for iOS/iPadOS:

- **Trusted certificate:** Deploys a root CA or intermediate CA certificate (.cer format) to the device trusted certificate store. This is the prerequisite for SCEP and PKCS profiles — deploy trusted root certificates before certificate-issuing profiles.
- **SCEP (Simple Certificate Enrollment Protocol):** Dynamic certificate issuance where the device generates a key pair and requests a certificate from your internal CA via NDES (Network Device Enrollment Service) + Intune Certificate Connector. Used for per-device, unique certificates (Wi-Fi, VPN authentication).
- **PKCS (imported certificate):** Deploys a PFX certificate bundle exported from your internal CA. Used for S/MIME email encryption certificates where the same certificate must be available on multiple devices for a user.

Certificate profiles are **NOT** supervised-only — they deploy to all enrolled iOS/iPadOS devices regardless of supervision state.

> **What breaks if misconfigured:** SCEP certificate profile deployed without the corresponding Trusted certificate (root CA) deployed first — the device certificate chain is incomplete and 802.1X Wi-Fi authentication fails. Symptom appears in: device (Wi-Fi authentication error) and Intune admin center (profile shows "Error" status for affected devices).

## Home Screen Layout

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **iOS/iPadOS** > **Templates** > **Device features** > **Home screen layout**

Note: Home Screen Layout is under **Templates**, not Settings Catalog. This is intentional — Home Screen Layout is a device features template that has not been migrated to Settings Catalog.

Key settings:

- **Dock apps:** Up to 6 apps pinned to the bottom Dock, persistent across all home screen pages.
- **Pages:** Define home screen pages with an icon grid; specify apps per page and position.
- **Folders:** Group multiple apps into a folder on a page (supervised only; requires iOS 9.3+).
- **App references by bundle ID:** Apps are referenced by their bundle ID (works for App Store apps, VPP-licensed apps, and LOB apps by their CFBundleIdentifier).

> 🔒 **Supervised only:** Home screen layout requires supervised mode. On unsupervised devices this profile type is unavailable and home screen organization remains fully user-controlled. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

> **What breaks if misconfigured:** A bundle ID referencing an app that is not installed on the device (uninstalled, not yet deployed, or a typo in the bundle ID) — blank icons appear on the device home screen or icon placements silently drop from the configured positions. Symptom appears in: device (blank or missing app icons on home screen).
