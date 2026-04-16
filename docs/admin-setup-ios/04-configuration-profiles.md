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

## Device Restrictions

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **iOS/iPadOS** > **Settings catalog** > **Restrictions**

Device restrictions expose the largest set of supervised-only settings in iOS/iPadOS management. Settings in this profile type fall into two groups: those available on all enrolled devices (unsupervised and supervised) and those available only on supervised devices. Each category below lists the supervised-only settings present in that category, followed by a 🔒 callout; categories marked entirely supervised-only (Autonomous Single App Mode, Kiosk, Keyboard, Password) apply to no unsupervised devices.

### Software Update Note

The legacy "Defer software updates" setting in device restrictions remains supervised-only but is being deprecated by Apple. For software update enforcement, use the dedicated DDM-based path at **Devices** > **Apple updates** > **iOS/iPadOS update policies**, which works on both supervised and unsupervised devices (iOS 17.0+). Software update policies are not covered in this guide.

### General

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block modification of account settings | 🔒 | Prevents users from modifying email, contacts, and calendar accounts |
| Block Screen Time | 🔒 | Prevents users from configuring Screen Time settings |
| Block users from erasing all content and settings on device | 🔒 | Prevents factory reset from the device Settings |
| Block modification of device name | 🔒 | Prevents users from renaming the device |
| Block configuration profile changes | 🔒 | Prevents users from installing additional profiles via Settings |
| Allow activation Lock | 🔒 | Enables supervised Activation Lock with bypass code escrow to Intune |
| Block removing apps | 🔒 | Prevents users from uninstalling apps from the home screen |
| Block app clips (iOS 14.0+) | 🔒 | Prevents App Clips from running on the device |
| Force automatic date and time | 🔒 | Locks date/time to automatic network time; prevents manual changes |
| Block VPN creation | 🔒 | Prevents users from creating VPN configurations in Settings |
| Defer software updates (legacy MDM path — deprecating) | 🔒 | Delays OS update visibility; being replaced by DDM-based update policies |
| Block screenshots and screen recording | — | Prevents user screenshots and screen recording |
| Require iTunes Store password for all purchases | — | Prompts for App Store password on every purchase |
| Block in-app purchases | — | Disables in-app purchase dialogs |

> 🔒 **Supervised only:** General block settings (Block modification of account settings, Block Screen Time, Block users from erasing content and settings, Block modification of device name, Block configuration profile changes, Allow activation Lock, Block removing apps, Block app clips, Force automatic date and time, Block VPN creation, Defer software updates) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### App Store, Doc Viewing, and Gaming

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block App Store (iOS/iPadOS 13.0+) | 🔒 | Removes the App Store icon and prevents app installs from the store |
| Block installing apps using App Store | 🔒 | Prevents App Store app downloads (finer-grained than Block App Store) |
| Block automatic app downloads | 🔒 | Prevents automatic downloading of apps purchased on other devices |
| Block Game Center | 🔒 | Disables Game Center app and social gaming features |
| Block multiplayer gaming in Game Center (iOS/iPadOS 13.0+) | 🔒 | Prevents multiplayer matches; Game Center app remains available |
| Block adding Game Center friends (iOS/iPadOS 13.0+) | 🔒 | Prevents adding friends in Game Center |
| Block in-app purchases | — | Disables in-app purchase UI for all apps |
| Require iTunes Store password for all purchases | — | Prompts for authentication on every App Store purchase |

> 🔒 **Supervised only:** App Store and Game Center restrictions (Block App Store, Block installing apps, Block automatic app downloads, Block Game Center, Block multiplayer gaming, Block adding Game Center friends) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Built-in Apps

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block Camera (iOS/iPadOS 13.0+) | 🔒 | Removes Camera app and disables camera in all apps |
| Block FaceTime (iOS/iPadOS 13.0+) | 🔒 | Removes FaceTime app |
| Block Safari (iOS/iPadOS 13.0+) | 🔒 | Removes Safari from the device |
| Block Safari Autofill (iOS/iPadOS 13.0+) | 🔒 | Prevents Safari from saving and filling usernames/passwords |
| Block Apple News | 🔒 | Removes Apple News app |
| Block Apple Books | 🔒 | Removes Books app |
| Block iMessage | 🔒 | Disables iMessage (SMS/MMS still work) |
| Block user-generated content in Siri | 🔒 | Prevents Siri from querying user content (photos, contacts, etc.) |
| Require Siri profanity filter (iOS 11.0+) | 🔒 | Enables profanity filter for Siri responses |
| Block Find My iPhone (iOS/iPadOS 13.0+) | 🔒 | Removes Find My device tracking capability |
| Block Siri | — | Disables Siri entirely (not supervised-only) |
| Block screenshots and screen recording | — | Prevents screenshots and video capture |

> 🔒 **Supervised only:** Built-in app blocks (Block Camera, Block FaceTime, Block Safari, Block Safari Autofill, Block Apple News, Block Apple Books, Block iMessage, Block user-generated content in Siri, Require Siri profanity filter, Block Find My iPhone) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Cloud and Storage

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block iCloud backup (iOS/iPadOS 13.0+) | 🔒 | Prevents device backup to iCloud |
| Block iCloud document and data sync (iOS/iPadOS 13.0+) | 🔒 | Prevents iCloud Drive sync for documents and data |
| Block iCloud Keychain sync (iOS/iPadOS 13.0+) | 🔒 | Prevents syncing saved passwords via iCloud Keychain |
| Block iCloud Private Relay (iOS/iPadOS 15+) | 🔒 | Prevents use of iCloud Private Relay on the device |
| Block managed apps from storing data in iCloud | — | Prevents MDM-managed app data from syncing to iCloud |
| Force encrypted backup | — | Requires iTunes/Finder backup encryption |

> 🔒 **Supervised only:** iCloud storage controls (Block iCloud backup, Block iCloud document and data sync, Block iCloud Keychain sync, Block iCloud Private Relay) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Connected Devices

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block AirDrop | 🔒 | Disables AirDrop for sending and receiving files |
| Block pairing with Apple Watch | 🔒 | Prevents Watch pairing with the managed iPhone |
| Block modifying Bluetooth settings | 🔒 | Prevents users from toggling Bluetooth or pairing new devices |
| Block pairing with non-Configurator hosts | 🔒 | Prevents USB pairing with computers not trusted via Apple Configurator |
| Block AirPrint | 🔒 | Prevents printing via AirPrint |
| Disable near-field communication (NFC) (iOS 14.2+) | 🔒 | Disables NFC hardware |
| Block access to USB drive in Files app (iOS/iPadOS 13.0+) | 🔒 | Prevents Files app from browsing USB storage connected via adapter |
| Allow USB accessories while device is locked (iOS 11.4.1+) | 🔒 | Controls USB Restricted Mode; when blocked, USB accessories cannot communicate after 1 hour of lock |

> 🔒 **Supervised only:** Connected device controls (Block AirDrop, Block pairing with Apple Watch, Block modifying Bluetooth settings, Block pairing with non-Configurator hosts, Block AirPrint, Disable NFC, Block access to USB drive in Files app, Allow USB accessories while locked) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Keyboard and Dictionary

This entire category is supervised-only. All keyboard and dictionary settings require supervised mode.

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block word definition lookup | 🔒 | Disables tap-to-define dictionary popover |
| Block predictive keyboards | 🔒 | Disables QuickType predictive text suggestions |
| Block auto-correction | 🔒 | Disables automatic text correction |
| Block spell-check | 🔒 | Disables red underlines on misspelled words |
| Block keyboard shortcuts | 🔒 | Disables custom text replacement shortcuts |
| Block dictation | 🔒 | Disables voice-to-text keyboard input |
| Block QuickPath (iOS/iPadOS 13.0+) | 🔒 | Disables swipe-to-type keyboard input |

> 🔒 **Supervised only:** All keyboard and dictionary settings (Block word definition lookup, Block predictive keyboards, Block auto-correction, Block spell-check, Block keyboard shortcuts, Block dictation, Block QuickPath) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Autonomous Single App Mode (ASAM)

This entire category is supervised-only. ASAM locks the device to a single app that cannot be exited by the user.

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| App name | 🔒 | Display name of the app to run in Autonomous Single App Mode |
| App Bundle ID | 🔒 | Bundle identifier of the app locked in ASAM; only this app can run |

> 🔒 **Supervised only:** Autonomous Single App Mode (ASAM) configuration (App name, App Bundle ID) requires supervised mode. On unsupervised devices ASAM is unavailable and cannot be configured. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Kiosk / App Lock

This entire category is supervised-only. Kiosk mode locks the device to a single app with granular control over hardware buttons and accessibility features.

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| App to run in kiosk mode | 🔒 | The single app the device is locked to |
| Assistive Touch | 🔒 | Enable/disable on-screen touch button in kiosk |
| VoiceOver | 🔒 | Enable/disable screen reader in kiosk |
| Zoom | 🔒 | Enable/disable screen zoom in kiosk |
| Auto lock | 🔒 | Enable/disable automatic screen lock in kiosk |
| Ringer switch | 🔒 | Enable/disable mute switch in kiosk |
| Screen rotation | 🔒 | Enable/disable screen auto-rotation in kiosk |
| Touch | 🔒 | Enable/disable touch screen in kiosk |
| Volume buttons | 🔒 | Enable/disable physical volume buttons in kiosk |
| (plus ~10 additional accessibility controls) | 🔒 | Invert colors, mono audio, voice control, screen sleep button, etc. |

> 🔒 **Supervised only:** All Kiosk / App Lock settings (app selection, all ~20 accessibility and button-lock controls) require supervised mode. On unsupervised devices kiosk mode is unavailable. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Password

This entire category is supervised-only. These settings restrict how users modify or share passcodes and biometrics.

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block passcode modification | 🔒 | Prevents users from changing their device passcode |
| Block modification of Touch ID fingerprints and Face ID faces (iOS 11.0+) | 🔒 | Prevents adding or removing biometric authentication |
| Block password AutoFill | 🔒 | Prevents iCloud Keychain from auto-filling saved passwords |
| Block password proximity requests | 🔒 | Prevents device from suggesting passwords from nearby Apple devices |
| Block password sharing | 🔒 | Prevents sharing saved passwords via AirDrop or Messages |
| Require Touch ID or Face ID authentication for AutoFill (iOS 11.0+) | 🔒 | Forces biometric authentication before AutoFill provides passwords |

> 🔒 **Supervised only:** All Password settings (Block passcode modification, Block modification of Touch ID/Face ID, Block password AutoFill, Block password proximity requests, Block password sharing, Require biometric for AutoFill) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Safari Domains

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Safari password domains (iOS 9.3+) | 🔒 | Defines domains where Safari will offer to save passwords |
| Allowed Safari web domains | — | Restricts Safari browsing to specified domains only |
| Managed Safari web domains | — | Marks specified domains as corporate — documents opened from these domains become managed |

> 🔒 **Supervised only:** Safari password domains configuration requires supervised mode. On unsupervised devices this setting is ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Show or Hide Apps

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Show or hide apps allowlist/blocklist | 🔒 | The entire Show or hide apps capability — showing or hiding specific apps by bundle ID — is supervised-only |

> 🔒 **Supervised only:** The entire Show or hide apps allowlist/blocklist capability requires supervised mode. On unsupervised devices app visibility cannot be controlled via this setting. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Screen Time and Additional Restrictions

| Setting | Supervised-only? | What it does |
|---------|:----------------:|---|
| Block Screen Time modification | 🔒 | Prevents users from modifying Screen Time settings or passcode |
| Block user erase of content and settings | 🔒 | Prevents factory reset from Settings (same as General block above — confirmed supervised-only) |
| Block removing apps | 🔒 | Prevents users from deleting apps (same as General block above — both locations apply) |
| Block app clips (iOS 14.0+) | 🔒 | Prevents App Clips from launching |

> 🔒 **Supervised only:** Screen Time modification controls and supplementary app restrictions (Block Screen Time modification, Block user erase of content and settings, Block removing apps, Block app clips) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

### Key Supervised-Only Settings — Full Detail

The nine settings below are the most commonly misconfigured supervised-only settings and the ones most likely to generate L1/L2 tickets. Each receives a detailed treatment below.

#### Block App Store

Block App Store removes the App Store icon from the device and prevents users from installing apps directly. This setting is used in VPP-only fleets, regulated-industry deployments (healthcare, finance, classified), and any environment where app installation must be admin-controlled.

Common use case: Deploy all apps via Intune VPP device-licensed or LOB assignment so users cannot install unauthorized apps.

> **What breaks if misconfigured:** Blocking App Store on a fleet that uses VPP user-licensed apps prevents users from accepting the Apple Business Manager invitation, which breaks the entire VPP user-licensing flow. Users never receive VPP-licensed apps. Symptom appears in: device (App Store icon missing, users cannot install assigned apps) and Intune admin center (VPP user licenses stuck in "Invitation sent" state).

#### Block removing apps

Block removing apps prevents users from long-pressing an app icon and deleting it. This setting protects required managed apps from user uninstallation.

> **What breaks if misconfigured:** When set to Block, admins can no longer uninstall apps from devices remotely via Intune — the block applies to all removal attempts including MDM-initiated uninstall commands. Removing a deployed app while this restriction is active requires first removing the restriction, waiting for policy propagation, then reissuing the uninstall command. Symptom appears in: Intune admin center (app uninstall assignment stuck in "Pending" indefinitely with no device-side action).

#### Allow activation Lock

Allow Activation Lock enables supervised Activation Lock with bypass code escrow to Intune. When enabled, if a user enables Find My iPhone, the bypass code is automatically escrowed to Intune admin center for admin recovery without requiring the user's Apple ID.

> **What breaks if misconfigured:** Enabling Activation Lock without configuring bypass code escrow (or losing the escrowed code) means a device whose user forgets their iCloud password is effectively bricked — the device cannot be activated for reuse without a working Apple ID. No MDM remediation is possible. Symptom appears in: device (activation lock screen at boot; user cannot proceed without Apple ID).

#### Block configuration profile changes

Block configuration profile changes prevents users from navigating to Settings > General > VPN & Device Management and removing profiles installed by Intune.

> **What breaks if misconfigured:** On a device without locked enrollment (see [ADE Enrollment Profile](03-ade-enrollment-profile.md)), this block alone is insufficient — users can still remove the management profile itself via Settings > General > VPN & Device Management regardless of this setting. Block configuration profile changes prevents adding unauthorized profiles, not removing the MDM management profile. Pair with locked enrollment for full protection. Symptom appears in: Intune admin center (device unenrolled by user action when locked enrollment is not configured).

#### Block modification of account settings

Block modification of account settings prevents users from adding, removing, or modifying accounts (email, contacts, calendars, iCloud) in Settings > Mail/Contacts/Calendar and Settings > Passwords & Accounts.

> **What breaks if misconfigured:** If a user needs to re-authenticate their Entra ID account (due to token expiry, password change, or MFA reset) and this block is active, they cannot complete re-authentication — they cannot modify their account to accept a new credential state. Resolution requires device wipe and re-enrollment. Symptom appears in: device (user cannot sign in or complete account re-auth prompt) and Intune admin center (device stale, user unable to self-remediate).

#### Block iCloud backup

Block iCloud backup prevents device backup to iCloud, used as a data exfiltration control in regulated environments.

> **What breaks if misconfigured:** Fleet-wide blocking of iCloud backup without an alternative corporate backup strategy means users lose all device-local data on device loss, replacement, or hardware failure — no iCloud snapshot is available to restore from. The impact is highest for user-assigned devices carrying locally-stored personal work product (photos, notes, files) not synced elsewhere. Symptom appears in: device (restore flow shows no backup on new device) and help desk (tickets for lost data post-device-replacement).

#### Block AirDrop

Block AirDrop prevents the device from sending or receiving files via AirDrop, used as a data exfiltration control.

> **What breaks if misconfigured:** Fleet-wide AirDrop block without an alternative corporate file-transfer mechanism frustrates legitimate use cases (transferring photos and documents between a user's own managed devices). AirDrop is commonly used for photo transfers in mobile workflows. Symptom appears in: help desk (surge in tickets requesting file-transfer alternatives or workarounds for photo sharing).

#### Block Camera and Block FaceTime

Block Camera removes the Camera app and disables camera access in all apps. Block FaceTime removes the FaceTime app. These settings are paired and commonly deployed together in regulated environments (hospitals, classified facilities, high-security areas).

> **What breaks if misconfigured:** Overly broad camera block applied fleet-wide to a general knowledge-worker fleet prevents users from participating in video meetings (Microsoft Teams, Zoom). Intended for scoped deployments where camera is genuinely prohibited — applying to standard office or remote workers breaks video calls entirely. Symptom appears in: device (camera unavailable in Teams/Zoom with a "Camera not available" error) and help desk (volume of video meeting complaints).

#### Block pairing with non-Configurator hosts

Block pairing with non-Configurator hosts prevents the device from establishing USB trust relationships with any computer not configured via Apple Configurator 2 as a trusted host. This prevents USB-based unmanagement attacks.

> **What breaks if misconfigured:** Leaving this setting Off on supervised corporate devices allows any computer to pair with the device via USB trust (after user clicks "Trust" in the USB connection dialog). A malicious computer or a rogue user with a personal Mac can pair the device and use Apple Configurator to perform actions including un-supervising the device via USB. Recommended On for all corporate ADE devices. Symptom appears in: security audit finding — no user-facing symptom until compromise occurs.
