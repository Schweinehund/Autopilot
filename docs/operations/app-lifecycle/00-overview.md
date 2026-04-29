---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: cross-platform
---

> **Platform applicability:** This guide is the cross-platform app lifecycle automation overview
> hub for Windows, macOS, iOS/iPadOS, and Android — covering app-lifecycle terminology
> (lifecycle states / assignment intents / packaging-vs-distribution-vs-lifecycle), the
> cross-platform comparison, and per-platform routing.
> **Windows:** See [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md) for supersedence +
> dependency graphs + ContentPrepTool packaging.
> **macOS:** See [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md) for LOB PKG / unmanaged
> PKG / DMG / VPP / Mac App Store delivery (Microsoft-supported; community-pattern callout
> adjacent).
> **iOS/iPadOS:** See [iOS VPP Licensing](03-ios-vpp-licensing.md) for device-vs-user license
> distinction plus license-return behavior.
> **Android:** See [Android MGP Lifecycle](04-android-mgp-lifecycle.md) for Managed Google Play
> private-app publishing plus the Zebra side-load exception covered separately.

# App Lifecycle Automation Overview: Cross-Platform Hub

This guide is the cross-platform overview for app lifecycle automation across Windows, macOS,
iOS/iPadOS, and Android. It covers app-lifecycle terminology (lifecycle states, assignment
intents, packaging-vs-distribution-vs-lifecycle layered concepts), the cross-platform comparison
table, and routing to per-platform guides.

For Windows Win32 supersedence and dependency-graph topics plus ContentPrepTool packaging, see
[Win32 / MSIX at Scale](01-windows-win32-msix-scale.md). For macOS PKG and DMG delivery, see
[macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md). For iOS device-vs-user licensing, see
[iOS VPP Licensing](03-ios-vpp-licensing.md). For Android Managed Google Play and the Zebra
side-load exception, see [Android MGP Lifecycle](04-android-mgp-lifecycle.md).

This overview is intentionally a concept hub — it does not contain platform-specific configuration
steps, screenshots, or detailed runbooks. Each per-platform guide owns its own configuration
surface, prerequisites, and admin-tone narrative. Read this hub first to choose the correct
per-platform guide; then follow the per-platform guide's runbook for day-2 operations.

## Cross-Platform Comparison

The following table compares the app lifecycle model across all four platforms. Use this as a
planning reference; per-platform details live in the four sibling guides. Substantive treatment
of each row's mechanisms (configuration steps, prerequisites, decision-support callouts) belongs
exclusively in the per-platform guides linked below — this overview keeps the comparison
high-level so admins can route to the correct guide quickly.

The columns are ordered Windows, macOS, iOS/iPadOS, Android to match the navigation order used
by the four sibling per-platform files (file numbers 01 through 04). Rows are concept-keyed, so
a single row can be read horizontally to compare how each platform implements the same concept.

| Concept              | Windows                                  | macOS                                       | iOS/iPadOS                                          | Android                                              |
|----------------------|------------------------------------------|---------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Packaging format     | Win32 (.intunewin) and MSIX              | PKG (signed) and DMG                        | IPA (App Store / VPP)                               | APK / AAB (Google Play / private track)              |
| Deployment model     | LOB and Win32 via Intune Mgmt Extension  | LOB PKG (managed) and unmanaged via agent   | App Store / Volume Purchase Program                 | Managed Google Play (sole tenant channel)            |
| Supersedence support | Yes (Win32 only — chains, replace/update) | No native supersedence                     | No supersedence (license-based replacement)         | No supersedence (Google Play handles version replacement) |
| Dependency support   | Yes (Win32 — graph with cap)             | No native dependency graph                  | No (resolved by App Store)                          | No (resolved by Google Play)                         |
| Licensing model      | None (LOB) or per-device by assignment   | VPP (device or user) and Mac App Store / ABM | VPP (device or user; manual license-return workflow) | Managed Google Play binding (per-tenant)             |
| OEM exception        | (none)                                   | (none)                                      | (none)                                              | Zebra side-load APK channel (separate from MGP)      |

Read the table horizontally to compare how each platform implements a given concept; read it
vertically to assemble the per-platform picture. The "OEM exception" row flags the only platform
in scope with a non-store side-load channel — Android — and routes admins to the per-platform
guide for the full treatment.

## App-lifecycle terminology

App lifecycle terminology spans three orthogonal axes that apply across all four platforms.
Conflating these axes is a common source of mis-configuration. This section disambiguates the
three axes and their cross-platform mappings:

- **Lifecycle states** — The temporal model of an app on a managed device: `install` (initial
  delivery to the device), `update` (a newer version replaces the installed version), `supersede`
  (a different app replaces the installed app entirely; Win32 native, simulated by direct
  replacement on other platforms), and `retire` (admin removes the app from the device). All
  four platforms expose `install` and `update`; only Win32 exposes `supersede` as a native
  graph; on macOS, iOS, and Android the same outcome is reached via direct replacement or
  unassignment.
- **Assignment intents** — The admin-driven targeting model: `required` (silent install),
  `available` (catalog or Company Portal entry; user-initiated install), and `uninstall`
  (admin-driven removal). Windows and Android support all three intents; macOS LOB delivery
  via Intune supports a narrower intent set; iOS VPP supports all three with licensing-model
  nuance covered in the per-platform guide.
- **Packaging vs distribution vs lifecycle** — Three distinct concerns that must be reasoned
  about separately. Packaging is the binary format the admin uploads (the Win32 wrapper, the
  signed PKG, the IPA, or the APK / AAB). Distribution is the channel that delivers the binary
  to devices (Intune Management Extension for Win32; Intune agent for macOS PKG and DMG; App
  Store via VPP for iOS; Managed Google Play for Android). Lifecycle is the runtime model on
  the device (states + intents above). A single binary can have multiple distribution paths;
  a single distribution path can deliver multiple binary formats; lifecycle outcomes depend
  on the combination, not on any single axis.

The three axes — lifecycle states, assignment intents, and packaging-vs-distribution-vs-lifecycle
layering — are the cross-platform vocabulary used throughout the four per-platform guides. When
a per-platform guide says "the app is in `available` intent at the `update` lifecycle state via
the platform's distribution channel," the meaning is uniform across all four platforms even
though the underlying mechanisms differ.

For Windows-specific lifecycle (supersedence chains, dependency graphs, ContentPrepTool
packaging), see [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md). For macOS-specific
lifecycle (LOB PKG / unmanaged PKG / DMG / VPP / Mac App Store and the community-pattern
callout), see [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md). For iOS-specific
lifecycle (VPP device-vs-user licensing and the manual license-return workflow), see
[iOS VPP Licensing](03-ios-vpp-licensing.md). For Android-specific lifecycle (Managed Google
Play private-app publishing plus the Zebra side-load exception), see
[Android MGP Lifecycle](04-android-mgp-lifecycle.md).

## Routing to Per-Platform Guides

Choose the per-platform guide based on the platform you are configuring:

- **Windows** — Win32 supersedence chains, dependency graphs (max 100 dependencies; circular
  detection), Win32 packaging, and the MSIX scope: see
  [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md).
- **macOS** — LOB PKG / unmanaged PKG / DMG / VPP / Mac App Store delivery; community-pattern
  adjacency callout for the public macOS deployment-automation projects: see
  [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md).
- **iOS/iPadOS** — VPP device-licensing vs user-licensing comparison plus the manual license
  return workflow: see [iOS VPP Licensing](03-ios-vpp-licensing.md).
- **Android** — Managed Google Play private-app publishing (direct binary upload, web-app, plus
  the Android Management framing) plus the Zebra side-load exception (separate channel): see
  [Android MGP Lifecycle](04-android-mgp-lifecycle.md).

Each per-platform guide contains the configuration steps, prerequisites, decision-support
callouts, and Related Resources / External References footer for that platform. The four
guides cross-reference each other and route back to this overview via their own Platform
applicability blockquotes.

## Cross-Platform Planning Considerations

When planning app lifecycle automation across a heterogeneous fleet, several considerations
cut across all four platforms and benefit from being addressed once at the program level
rather than re-discovered in each per-platform rollout:

- **Catalog hygiene** — Each platform exposes its own app catalog (Company Portal on Windows,
  Self Service on macOS, App Store / VPP on iOS, Managed Google Play on Android). A unified
  catalog posture must accept that the four catalogs have different metadata models, different
  approval workflows, and different end-user surfaces; attempting to force visual parity across
  the four typically creates more support load than it saves.
- **Intent model harmonization** — The `required`, `available`, and `uninstall` intent triad
  is the cross-platform vocabulary, but the per-platform support matrix differs (see the
  comparison table above). When designing a fleet-wide intent policy, confirm intent support
  per platform before committing to a uniform rollout — some intents are not available on
  every platform's delivery method, and the per-platform guides flag the specific exceptions.
- **Lifecycle reporting parity** — Reporting on app lifecycle posture across platforms requires
  accepting that the data models are not parity-aligned. Windows exposes Win32 install / update
  / supersede / retire state; macOS exposes managed-app install state; iOS exposes VPP license
  + install state; Android exposes Managed Google Play install state. A single dashboard that
  compares the four typically chooses a lowest-common-denominator metric (typically "is the
  app at the target version on the target device?") or accepts per-platform tabs.
- **Licensing posture** — Three of the four platforms (macOS, iOS, Android) have a licensing
  model that ties an app instance to a device or user record; Windows LOB does not. Fleet
  licensing posture must be planned per platform — an iOS VPP token rotation, a macOS Apple
  Business Manager renewal, and an Android Managed Google Play binding renewal are independent
  events on independent cadences.
- **Channel selection** — Each platform has at least one Microsoft-supported delivery channel
  and may have community-pattern alternatives. The cross-platform default is to prefer the
  Microsoft-supported channel for compliance and supportability; community patterns are noted
  in the per-platform guides with confidence-level callouts so admins can make an informed
  decision when the Microsoft-supported channel does not cover a use case.
- **Naming and metadata discipline** — App display names, publisher fields, and category
  tagging are admin-controlled metadata that flows into the user-facing catalog. A consistent
  naming scheme across the four platforms reduces user confusion when the same logical app
  appears in multiple catalogs (one per platform). Per-platform guides note where metadata
  fields differ; the cross-platform recommendation is to choose one canonical display name
  per logical app and reuse it on every platform's upload form.
- **Versioning and rollback posture** — Each platform's distribution channel handles version
  rollback differently. Plan a per-platform rollback approach in advance: the per-platform
  guides cover what is reversible, what requires a manual workaround, and what is one-way.
  Treat any deployment as a forward-only action by default; rollback should be the exception.

These considerations are program-level concerns; the per-platform guides handle the
platform-specific mechanics. If the program-level decisions in this section are not yet made
for your tenant, make them before deep-diving into any one per-platform guide — the
per-platform configuration choices flow downstream from the program-level posture.

## When to Use This Overview

Use this overview document when:

- **Choosing the right per-platform guide** — Read the Routing section and the Cross-Platform
  Comparison table together to identify which of the four sibling guides matches your task.
- **Disambiguating cross-platform vocabulary** — When a colleague or runbook uses a lifecycle
  term (`install`, `update`, `supersede`, `retire`) or an intent term (`required`, `available`,
  `uninstall`) and you need to confirm what it means on each platform, the App-lifecycle
  terminology section is the canonical reference.
- **Planning a fleet-wide rollout** — The Cross-Platform Planning Considerations section
  highlights the program-level decisions that should be made once at the top of a rollout
  before each per-platform guide is consumed in detail.

Do not use this overview as a configuration reference — it deliberately omits per-platform
configuration steps, screenshots, and prerequisites. Every per-platform guide owns the
configuration surface for its platform; this hub owns only the cross-platform vocabulary and
routing surface.

## Related Resources

- [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md) — Win32 supersedence + dependency
  graphs + ContentPrepTool packaging
- [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md) — Microsoft-supported macOS app
  delivery + community-pattern adjacency callout
- [iOS VPP Licensing](03-ios-vpp-licensing.md) — Device-vs-user licensing + manual license
  return workflow
- [Android MGP Lifecycle](04-android-mgp-lifecycle.md) — Managed Google Play + Zebra side-load
  exception
- [Patch & Update Management Overview](../patch-management/00-overview.md) — Sibling ops-domain
  overview (Phase 54)
- [Co-Management Overview](../co-management/00-overview.md) — Sibling ops-domain overview
  (Phase 53)

## External References

- [Win32 app management (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add)
- [Add macOS LOB apps (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos)
- [Apple VPP via Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios)
- [Add Managed Google Play apps (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-android-for-work)
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 55 does not amend the operations index per the ROADMAP entry
