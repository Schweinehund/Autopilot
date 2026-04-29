---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: macOS
---

> **Platform applicability:** This guide is macOS-specific (LOB PKG / unmanaged PKG / DMG / VPP /
> Mac App Store via ABM; community-pattern adjacency callout for Installomator and Intuneomator
> as non-Microsoft-supported tooling). For the cross-platform overview, see
> [App Lifecycle Overview](00-overview.md).
> **Windows:** See [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md).
> **iOS/iPadOS:** See [iOS VPP Licensing](03-ios-vpp-licensing.md).
> **Android:** See [Android MGP Lifecycle](04-android-mgp-lifecycle.md).

# macOS PKG / DMG Pipeline: Microsoft-Supported App Delivery + Community Adjacency

This guide is the macOS-specific app delivery reference covering all Microsoft-supported app
types for Intune-managed Macs: LOB PKG (managed; Apple Developer ID Installer-signed),
unmanaged PKG (via the Intune management agent), DMG (via the Intune management agent), VPP /
Microsoft 365 native (volume-purchased managed apps), and Mac App Store apps via ABM
(Apple Business Manager).

A separate community-pattern adjacency callout describes Installomator and Intuneomator as
**community-OSS automation tooling** that admins commonly run alongside Intune. These tools are
**NOT Microsoft-supported** and are documented here only as adjacent context — not as a
supported delivery path.

For the cross-platform overview, see [App Lifecycle Overview](00-overview.md).

## LOB PKG (Managed)

LOB PKG is the Microsoft-supported delivery method for **Apple Developer ID Installer**-signed
PKG files distributed as managed apps via Intune. Per Microsoft Learn, the .pkg file must:

- Be signed using an **Apple Developer ID Installer** certificate, obtained from an Apple
  Developer account.
- Be a component package or a package containing multiple packages.
- Not contain a bundle, disk image, or .app file.
- Contain a payload.

**Assignment limitation:** When using the LOB PKG (managed) deployment method, the only
assignment intent available is **Required**. Available-for-enrolled-devices and Uninstall
intents are NOT available at the deployment-method level — only on a per-app-instance basis.

**Uninstall behavior:** The Uninstall intent is only displayed for LOB apps created with
**Install as managed** set to **Yes** (macOS 11+). When that flag is enabled and the package
installs to `/Applications/`, Intune can issue a managed uninstall command. Without it,
LOB PKG apps cannot be removed by Intune.

**Plan-author note:** Code-signing the .pkg file with the Apple Developer ID Installer cert is
the prerequisite that distinguishes LOB PKG from unmanaged PKG. If the source publisher does not
provide a signed PKG, the unmanaged PKG path applies. If the source delivers a `.dmg` containing
a `.app` bundle (rather than a `.pkg`), the DMG path applies.

For the full v1.2 admin-setup walkthrough including Included-apps detection list and
Configuration-Caused-Failures runbook table, see
[macOS App Deployment](../../admin-setup-macos/04-app-deployment.md).

## Unmanaged PKG (via Intune Agent)

Unmanaged PKG delivery covers the Microsoft-supported workflow for PKG files that the LOB PKG
workflow cannot install or that are not signed by an Apple Developer ID Installer certificate.
The Intune management agent for macOS is the delivery mechanism. Per Microsoft Learn:

- Pre-install and post-install scripts are available for unmanaged PKG apps installed via the
  Intune agent (agent 2309.007+).
- The Intune management agent must be installed on the device (typically delivered via the
  enrollment workflow; agent version 2308.006+ required for unmanaged PKG).
- Assignment intent: **Required** or **Available** (Uninstall is NOT available — Known Issue).
- Supported scenarios beyond managed LOB: non-flat packages, component packages, unsigned
  packages, packages without payload, packages installing outside `/Applications/`, and
  custom packages with scripts.

Use unmanaged PKG when the source publisher does not provide a Developer ID Installer-signed
PKG, or when the LOB PKG workflow rejects the package due to bundle / disk-image / `.app`
inclusion. Note that the loss of Uninstall intent is the trade-off compared to managed LOB
PKG — if uninstall lifecycle is required, prefer managed LOB or DMG.

## DMG (via Intune Agent)

DMG delivery covers Microsoft-supported deployment of macOS disk-image apps via the Intune
management agent. The agent mounts the DMG and copies the .app bundle inside to the
Applications folder, supporting apps packaged as disk images containing one or more .app files.

Per Microsoft Learn:

- The Intune management agent for macOS must be installed on the device (agent 2304.039+).
- Intune instructs the agent to mount the DMG and copy the `.app` to `/Applications/`.
- Assignment intent: **Required**, **Available**, or **Uninstall** are supported (DMG retains
  full intent coverage; the PKG variants lose either Available or Uninstall depending on
  managed-vs-unmanaged selection).
- Detection rules: Bundle ID + version of the first `.app` in the Included-apps list.
- Maximum upload size: 8 GB.

DMG is the preferred path when the source publisher distributes the app as a `.dmg` containing
a `.app` bundle (common for Mac developer tooling and many commercial macOS apps). The DMG vs
unmanaged PKG choice usually follows the source publisher's distribution format. When in doubt,
DMG offers the broadest assignment-intent coverage (Required + Available + Uninstall) of the
three Intune-agent-delivered macOS app types.

**Limitation to be aware of:** DMG apps are NOT automatically removed from the device on
device retirement — they must be explicitly uninstalled via an Uninstall assignment first.

## VPP (Microsoft 365 Native + Volume Purchased)

**VPP** (Volume Purchase Program) covers volume-purchased apps delivered via the Apple Business
Manager (**ABM**) location-token integration with Intune. For macOS, VPP includes:

- **Microsoft 365 native VPP / managed apps** — Microsoft 365 macOS apps (such as Word, Excel,
  PowerPoint, Outlook, Teams) available via Intune as managed apps, syncing per the ABM token
  sync schedule. These deliver as native VPP-managed apps without requiring repackaging.
- **Volume-purchased commercial apps** — Apps purchased through ABM are synced to Intune via
  the VPP location token, allowing assignment to users (User-Licensed) or devices
  (Device-Licensed).

**Default license type:** Per Microsoft Learn, when you create a new VPP assignment, the
default license type is now **device** (applies to both iOS and macOS contexts; existing
assignments remain unchanged).

**License migration:** Per Microsoft Learn, apps can migrate silently from user to device
licenses only when using **Required** assignment type. Apps cannot migrate from device to user
licenses for any assignment type.

**macOS-specific reclamation grace period:** macOS apps with a revoked VPP license remain
usable on the device for a **30-day grace period** before Apple removes them (per Apple
policy). This grace-period behavior is unique to macOS — iOS does not have an equivalent
post-revoke usability window.

For the broader iOS/iPadOS VPP device-vs-user licensing comparison, full reclamation
workflow (3-step admin process: remove assignment → change to Uninstall → Revoke license),
and Microsoft Entra auto-reclaim behavior, see [iOS VPP Licensing](03-ios-vpp-licensing.md).
Although that file is iOS-focused, the licensing-model decision support documented there
applies cross-platform; macOS-specific deviations (the 30-day grace period above) are called
out here.

## Mac App Store (via ABM)

Mac App Store apps are delivered to Intune-managed Macs via **Apple Business Manager** (ABM —
the cloud portal Apple provides for enterprise Apple device and content management). ABM
allows admins to obtain app licenses and synchronize them to Intune via a VPP token, allowing
silent installation of App Store apps on Macs without requiring users to sign in with an
Apple ID (when using device-based licensing).

**Workflow:**

1. Purchase the Mac App Store app via Apple Business Manager (Apps and Books area).
2. Sync the ABM / VPP location token to Intune (sync runs at scheduled intervals; manual sync
   available via Tenant administration > Connectors and tokens > Apple VPP tokens).
3. Assign the app to users or devices in Intune; choose Required (device or user groups) or
   Available for enrolled devices (user groups only).
4. App installs silently on supervised Macs without Apple ID prompts (when device-licensed).

**ABM token expiry:** The ABM / VPP location token has a 1-year (365-day) expiry; renew via the
ABM portal before expiry to avoid sync failures. Existing installs remain functional after
token expiry, but no new assignments or license-management actions are possible until the
token is renewed and re-uploaded to Intune.

**Token-sharing constraint:** A single VPP location token cannot be shared between Intune
tenants. Up to 3,000 VPP tokens are supported per Intune tenant.

## Community Pattern: Installomator / Intuneomator

> 📋 Community pattern — MEDIUM confidence
>
> **Installomator** is a community-OSS, MIT-licensed Bash command-line tool for macOS app
> install/update automation. **Intuneomator** is a Swift-based wrapper that bridges
> Installomator's 900+ application labels into Intune deployment workflows. Both projects are
> community-maintained on GitHub and are **NOT Microsoft-supported**.
>
> Many macOS administrators run these tools alongside Intune to automate app patching for the
> long tail of commercial macOS apps that lack VPP / ABM presence and that the source publisher
> does not redistribute as Apple Developer ID Installer-signed PKGs. The community-pattern
> attribution here acknowledges their wide deployment but **does not endorse them as a
> supported delivery path**. Admins choosing this path should treat the tools as community OSS
> — version-pin the tool releases, audit the application labels for trust, and assume
> Microsoft Support will not assist with troubleshooting Installomator-driven app failures.
>
> - **Installomator** (GitHub: Installomator/Installomator; project page: installomator.com) —
>   Bash command-line tool; runs locally as part of an admin's automation script or via
>   Munki / Jamf / launchd / shell-out from Intune custom scripts.
> - **Intuneomator** (GitHub: gilburns/Intuneomator) — Swift-based wrapper; bridges
>   Installomator labels into Intune `.intunemac`-equivalent packaging workflows for
>   admin-defined custom apps.

This callout is a **community-pattern adjacency** acknowledgment only. The Microsoft-supported
delivery paths for macOS apps are LOB PKG, unmanaged PKG, DMG, VPP, and Mac App Store via ABM
(documented in the H2 sections above). Admins should default to the Microsoft-supported paths
when feasible and treat Installomator / Intuneomator as supplementary automation tooling for
the subset of macOS apps that cannot be packaged for the supported paths. The
non-Microsoft-supported attribution is load-bearing — Microsoft Support will not troubleshoot
issues stemming from Installomator-driven installs, and any Intune-side reporting on those
installs reflects only what the wrapper script chose to report (not Apple's authoritative
install state).

## Related Resources

- [App Lifecycle Overview](00-overview.md) — Cross-platform app lifecycle hub
- [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md) — Windows sibling
- [iOS VPP Licensing](03-ios-vpp-licensing.md) — iOS sibling (VPP device-vs-user reclamation)
- [Android MGP Lifecycle](04-android-mgp-lifecycle.md) — Android sibling
- [macOS App Deployment](../../admin-setup-macos/04-app-deployment.md) — v1.2 macOS app deployment admin guide
- [macOS Update Enforcement](../patch-management/02-macos-update-enforcement.md) — Phase 54 macOS sibling

## External References

- [Add macOS LOB apps (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos)
- [Add unmanaged PKG apps (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg)
- [Apple VPP via Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios)
- [Installomator (GitHub)](https://github.com/Installomator/Installomator) — Community OSS; not Microsoft-supported
- [Intuneomator (GitHub)](https://github.com/gilburns/Intuneomator) — Community OSS; not Microsoft-supported
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 55 does NOT amend the operations index per ROADMAP line 457
