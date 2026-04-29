---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific (Win32 supersedence + dependency
> graphs + ContentPrepTool packaging; MSIX routing-only). For the cross-platform overview, see
> [App Lifecycle Overview](00-overview.md).
> **macOS:** See [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md).
> **iOS/iPadOS:** See [iOS VPP Licensing](03-ios-vpp-licensing.md).
> **Android:** See [Android MGP Lifecycle](04-android-mgp-lifecycle.md).

# Windows Win32 / MSIX at Scale: Supersedence + Dependency + Packaging

This guide is the Windows-specific app lifecycle reference covering Win32 supersedence chains
(max 10 superseding apps per app; max 11 nodes per supersedence graph; auto-update limit;
Required-assignment exception), Win32 dependency graphs (max 100 dependencies per app; recursive
sub-dependency evaluation; circular-dependency detection), and Win32ContentPrepTool packaging
into the `.intunewin` format with 4 detection rule types (MSI / File / Registry / custom PowerShell).

MSIX is in scope as a routing-only sub-section under packaging — MSIX does NOT support
supersedence; use version replacement in the same app entry instead. For the cross-platform
overview, see [App Lifecycle Overview](00-overview.md). For detection-rule priority and the
broader Win32 packaging reference, see
[Win32 App Packaging Reference](../../reference/win32-app-packaging.md).

## Supersedence {#supersedence}

Win32 app supersedence chains let an admin replace an installed Win32 app with a different Win32
app while preserving install context. This section covers the supersedence behavior matrix, the
auto-update limits, and the **Required-assignment exception** (PITFALL-10) that makes
supersedence behave differently for required-assigned vs available-assigned apps.

**Limits and constraints (verified at Microsoft Learn April 2026):**

- A Win32 app can have a maximum of 10 superseding apps per app (auto-update limit).
- There can only be a maximum of 11 nodes in a single supersedence graph — the superseding app
  plus the superseded apps and any subsequent related apps.
- Superseding apps don't get automatic targeting. Each app must have explicit targeting to
  take effect.
- Supersedence applies only to Win32 apps. MSIX does NOT support supersedence (see
  [ContentPrepTool Packaging](#contentpreptool-packaging) for MSIX scope).

**Replace vs Update option semantics:**

- **Replace** mode — `Uninstall previous version` toggle is **enabled**. The superseded app is
  uninstalled before the superseding app installs.
- **Update** mode — `Uninstall previous version` toggle is **disabled**. Per Microsoft Learn:
  "App update means that admin chose not to uninstall the superseded app during the
  configuration stage."

### Supersedence behavior matrix

The matrix below encodes how the source assignment intent (Available vs Required) interacts
with the supersedence action (Uninstall vs Replace):

| Source assignment          | Uninstall (Update mode)                                        | Replace (Replace mode)                                    |
|----------------------------|----------------------------------------------------------------|-----------------------------------------------------------|
| Available (Company Portal) | Auto-update on next IME check-in (8-16 hours)                  | Uninstall superseded; install superseding (auto)          |
| Required (silent install)  | **Required-assignment exception applies** — no auto-update     | Manual re-targeting required (no automatic supersedence)  |

> ⚠️ **Required-assignment exception:** Supersedence auto-update only applies to apps assigned
> with **Available for enrolled devices** intent. Devices that received the superseded app
> through a **Required** assignment will NOT receive the superseding app via the supersedence
> chain. To replace a Required-assigned app, the admin must (a) re-target the new app as
> Required to the same group, OR (b) change the existing Required assignment to Uninstall, then
> re-create the assignment with the superseding app. The Required-assignment behavior is
> documented under "Auto-update limitations" in the
> [Microsoft Learn Win32 supersedence reference](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence).

The Required-assignment exception (PITFALL-10) is the most-common Win32 supersedence-failure
mode. The exception is documented in Microsoft Learn under "Auto-update limitations" rather than
the primary supersedence behavior section, which makes it easy to miss during initial design.
Plan supersedence chains for Available-assigned apps; for Required-assigned apps, use the manual
re-targeting workflow.

## Dependency Graphs {#dependency-graphs}

Win32 app dependencies let an admin declare that App B requires App A, so Intune Management
Extension (IME) installs App A before App B. Dependencies are processed before the main app,
regardless of assignment order in Intune. This section covers the max-100 dependency limit,
recursive sub-dependency evaluation, and the **combined supersedence+dependency subgraph**
illustration showing both relationship types in a single visual.

**Limits and constraints (verified at Microsoft Learn April 2026):**

- A Win32 app dependency graph can have a maximum of 100 dependencies per app, including
  dependencies of any included dependencies as well as the app itself. Cross-graph dependency
  apps count once even if they appear in multiple graphs (per Microsoft Learn illustrative
  example: graph A 23 + graph B 62 + graph C 20 with shared app X = 103 total, surpassing the
  100 limit).
- Dependencies can have recursive sub-dependencies; each sub-dependency is evaluated before the
  main dependency.
- **Circular dependency detection IS implemented by Intune at configuration time.** If you
  configure a circular relationship (App A → App B → App A), Intune surfaces an explicit error
  message at config time and blocks the assignment. The circular case is detected and reported
  in the Intune admin center UI; you cannot save a circular configuration. (Note: this corrects
  a prior project-doc claim. The reference doc at
  [Win32 App Packaging Reference](../../reference/win32-app-packaging.md) is updated in the
  same commit to reflect current behavior.)
- Win32-only constraint: A Win32 app dependency must also be a Win32 app. Cannot depend on
  single-MSI LOB apps or Microsoft Store apps.
- Auto-install opt-in/out per dependency: by default, the **Automatically install** option is
  set to **Yes** for each dependency.
- Dependency depth (chain length) is constrained to 10 levels per the existing reference doc;
  this is **orthogonal** to the 100-dependency count limit. Both facts coexist.

### Combined supersedence + dependency subgraph

The following ASCII art illustrates a combined supersedence + dependency relationship subgraph
with 10 nodes (5 supersedence chain + 5 dependency tree). This shows how an admin can reason
about both relationship types in a single design. Each node is an app:

```
                            App-Old-v1 (superseded)
                                    |
                                    | (supersedes)
                                    v
                              App-Old-v2
                                    |
                                    | (supersedes)
                                    v
                              App-Current ──────dependency──┐
                              /                              v
                             /                          Runtime-A (dependency)
                            / (supersedes)                   |
                           /                                 | (recursive dep)
                          v                                  v
                      App-Next-v1                       Runtime-A-Sub (sub-dependency)
                          |                                  |
                          | (supersedes)                     | (recursive dep)
                          v                                  v
                      App-Next-v2                       Runtime-Common (shared dep)

Subgraph nodes (10 total): App-Old-v1, App-Old-v2, App-Current, App-Next-v1, App-Next-v2,
       Runtime-A, Runtime-A-Sub, Runtime-Common, plus 2 visualization-only relationship anchors
       (the supersedes-edge stub from App-Current to App-Next-v1 and the dependency-edge stub
       from App-Current to Runtime-A) for a total of 10 distinct subgraph anchors.
Edges: 4 supersedence + 3 dependency = 7 relationships visualized
```

This combined subgraph illustrates that App-Current can simultaneously be the head of a
supersedence chain (replacing App-Old-v2 and App-Old-v1) and the head of a dependency tree
(requiring Runtime-A which has its own recursive sub-dependencies). When admins design Win32
app rollouts at scale, both subgraphs must be reasoned about together — the supersedence chain
determines what install replaces what; the dependency tree determines what installs first.

For detection rule priority and the broader Win32 dependency-chain behavior reference, see
[Win32 App Packaging Reference](../../reference/win32-app-packaging.md).

## ContentPrepTool Packaging {#contentpreptool-packaging}

Win32 app delivery via Intune requires the source application to be packaged into the
`.intunewin` format using **Win32ContentPrepTool**. This section covers the current GA version,
the `.intunewin` format conversion workflow, and the 4 detection rule types Intune supports for
Win32 apps. MSIX is included as a routing-only sub-section because MSIX does NOT support
supersedence (use version replacement instead).

**Win32ContentPrepTool current GA:**

The Win32ContentPrepTool current general-availability version is **v1.8.7** (released
August 13, 2021; verify the latest at the
[Win32 Content Prep Tool releases page](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases)
at deployment time). v1.8.7 is the supported series; v1.7 and earlier lacked Unicode filename
support and SHA256 FIPS-compliant hashing.

**.intunewin format:**

Run `IntuneWinAppUtil.exe -c <source folder> -s <setup file> -o <output folder>` to convert the
source folder into a `.intunewin` package. The `.intunewin` is an encrypted ZIP with embedded
detection metadata. The Win32 app size cap is 30 GB per app.

### Detection rule types

Intune supports exactly **4 detection rule types** for Win32 apps (per Microsoft Learn
`add-win32` Step 4 verbatim):

| Detection rule type            | Verification basis                                                                |
|--------------------------------|-----------------------------------------------------------------------------------|
| **MSI**                        | MSI product code; optional MSI product version check                              |
| **File**                       | File existence / date / version / size                                            |
| **Registry**                   | Registry value / string / integer / version                                       |
| **Custom (PowerShell script)** | App detected when script returns 0 exit code AND writes a string value to STDOUT  |

For the detection-rule priority order and conflict resolution between multiple rule types, see
[Win32 App Packaging Reference](../../reference/win32-app-packaging.md).

### MSIX scope (routing only)

MSIX is a separate Windows app packaging format. MSIX apps are deployed via Intune but follow a
different lifecycle model than Win32 apps:

- **MSIX does NOT support supersedence.** Use version replacement in the same app entry instead
  (per [Microsoft Learn supersedence prerequisites](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence):
  "App supersedence can only be applied to Win32 apps.").
- All MSIX packages must be signed (Developer ID certificate); unsigned MSIX will not install
  even via MDM enrollment.
- For MSIX-specific lifecycle guidance, see the
  [Microsoft Learn MSIX deployment documentation](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-windows-10-app-deploy).

The `## ContentPrepTool Packaging` H2 is the canonical location for the MSIX scope disclaimer
because the disclaimer references packaging-format constraints that admins reach by way of the
ContentPrepTool workflow.

## Related Resources

- [App Lifecycle Overview](00-overview.md) — Cross-platform app lifecycle hub
- [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md) — macOS sibling
- [iOS VPP Licensing](03-ios-vpp-licensing.md) — iOS sibling
- [Android MGP Lifecycle](04-android-mgp-lifecycle.md) — Android sibling
- [Win32 App Packaging Reference](../../reference/win32-app-packaging.md) — Detection-rule
  priority + dependency-chain depth + anti-pattern warnings
- [Patch & Update Management Overview](../patch-management/00-overview.md) — Sibling ops-domain
  overview (Phase 54)

## External References

- [Win32 supersedence (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence)
- [Add and assign Win32 apps (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add)
- [Win32 Content Prep Tool releases (GitHub)](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases)
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 55 does not amend the operations index
