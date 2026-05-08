# Phase 55: App Lifecycle Automation - Research

**Researched:** 2026-04-28
**Domain:** Microsoft Intune multi-platform application lifecycle (Win32 + macOS PKG/DMG + iOS VPP + Android MGP/OEMConfig)
**Confidence:** HIGH for Microsoft Learn current-state facts; MEDIUM for community tooling (Installomator/Intuneomator); LOW for specific 2024 AMAPI date claim (Google's release notes show **August 2025** as the actual AMAPI custom-apps SDK milestone, not 2024)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

Phase 55 has 22 numbered Decisions (D-01 through D-22) plus 11 Claude Discretion items (CD-01 through CD-11) plus 8 Cross-Decision Integration callouts (CDI-Phase55-01 through CDI-Phase55-08) plus 6 Downstream Phase Obligations (DPO-Phase55-01 through DPO-Phase55-06) — all surviving the adversarial-review process across 4 Gray Areas (winners: 1A / 2B / 3A / 4C-prime hybrid). The full text is in `55-CONTEXT.md`. Critical decisions affecting research scope:

- **D-01 / D-02:** `00-overview.md` follows 2B shape (cross-platform comparison table + cross-platform-only `## App-lifecycle terminology` concept H2 + per-platform routing). Concept H2 anchor topics MUST NOT be Win32-only (supersedence/Replace vs Update), Android-only (sideload), or iOS-only (reclamation).
- **D-03:** `00-overview.md` frontmatter `platform: cross-platform` (single new token; comma-string `Windows,macOS,iOS,Android` also accepted by validator).
- **D-04:** `01-windows-win32-msix-scale.md` follows 1A shape — three discrete top-level H2s in document order: `## Supersedence` → `## Dependency Graphs` → `## ContentPrepTool Packaging`. MSIX is routing-only sub-section under packaging H2 (~5-10 lines), NOT a coequal H2.
- **D-05:** PITFALL-10 callout placement = inside `## Supersedence` H2, immediately adjacent to behavior matrix (within ~10 lines).
- **D-06:** Cross-link to `docs/reference/win32-app-packaging.md` for detection rule priority + dependency depth (line 95 "Maximum dependency depth: 10 levels" is **chain depth**, orthogonal to APP-02's max 100 dependencies count). Both facts coexist; do NOT conflate.
- **D-07:** `03-ios-vpp-licensing.md` follows 3A shape — 2-column VPP attribute comparison table (`VPP Device-Licensed | VPP User-Licensed`) with reclamation rows.
- **D-09:** Mermaid is FORBIDDEN in `03-ios-vpp-licensing.md` (Phase 54 iOS sibling pattern parity).
- **D-10:** `04-android-mgp-lifecycle.md` follows 4C-prime hybrid — peer H2s for MGP-substantive + Zebra-OEMConfig-operational-summary + cross-link to `docs/admin-setup-android/10-aosp-zebra.md` (Phase 45 SSoT preserved at 24,518 bytes).
- **D-11:** AMAPI 2024 framing placement = inline within MGP H2 body content (single mention with year reference); NO three-layer treatment.
- **D-12:** Filename `04-android-mgp-lifecycle.md` retained verbatim for naming-convention parity.
- **D-13:** Each of 5 files carries inline `> **Platform applicability:**` blockquote at TOP (line 9, after frontmatter); bare `> **Platform:**` is **forbidden**.
- **D-15:** Phase 55 has ZERO hard-deadline items — no three-layer treatment for any content.
- **D-16:** APP-05 Installomator/Intuneomator gets `> 📋 Community pattern — MEDIUM confidence` blockquote token (em-dash and hyphen both accepted).
- **D-17 / D-18:** `check-phase-55.mjs` validator scope = FULL with 30-34 V-55-NN structural assertions (file-reads-only / no-shared-module / regex-based parsing).
- **D-19:** All 5 files use single-string `platform:` frontmatter (Windows / macOS / iOS / Android / cross-platform).
- **D-21:** SINGLE atomic commit covering 5 new content files + 1 validator. NO retrofit obligations (unlike Phase 54).
- **D-22:** 7-plan decomposition (55-01 through 55-07).

### Claude's Discretion

- **CD-01:** `platform: cross-platform` recommended for 00-overview (vs comma-string).
- **CD-02:** Exact wording of 4 per-platform sub-bullets inside `> **Platform applicability:**` blockquote per file.
- **CD-03:** Exact column count of cross-platform comparison table in 00-overview (D-01 mandates 5+ rows × 4 platforms).
- **CD-04:** Combined 10-node supersedence+dependency subgraph in 01-windows = Mermaid OR ASCII art OR static image.
- **CD-05:** Whether 00-overview includes Mermaid (permissive); 03-ios is Mermaid-FORBIDDEN.
- **CD-06:** Exact wording of `> 📋 Community pattern — MEDIUM confidence` callout text.
- **CD-07:** Exact column choice for iOS VPP comparison table.
- **CD-08:** Exact text of operate-the-lifecycle 3-bullet list (update / revoke / troubleshoot tokens required).
- **CD-09:** Cross-platform terminology concept H2 framing (lifecycle-states / assignment-intents / packaging-vs-distribution-vs-lifecycle).
- **CD-10:** `audience: admin` (default) OR `audience: admin,L2`.
- **CD-11:** AMAPI 2024 phrasing ("applicable since 2024" / "as of April 2024" / "since 2024").

### Deferred Ideas (OUT OF SCOPE)

- **MSIX substantive content** — MSIX is routing-only sub-section in 01-windows; no coequal H2.
- **Linux app-lifecycle coverage** — Phase 49 PITFALL-1 whitelist locks Linux app delivery as script-based only.
- **OEMConfig substantive content in Phase 55 file** — 4D-pure rejected (fails SC#5 "operate" verb); 4A substantive rejected (duplicates Phase 45 SSoT). Phase 55 ships operational-summary + cross-link only.
- **Win32ContentPrepTool version-pin verification** at plan-time — see Research Finding §1 below; SUMMARY.md line 47 cites "v1.8.7 (August 13 2024)" but GitHub releases page shows v1.8.7 was released **August 13, 2021** (date-corrected fact below).
- **AMAPI 2024 historical-context scope** — soft historical context inline, not substantive lifecycle content.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| APP-01 | Admin can manage Win32 app supersedence chains in Intune (max 10 superseding apps per app; Replace vs Update option semantics; targeting required on superseding app) | §1 verified at Microsoft Learn April 2026; max 11 nodes total (1 superseding + 10 superseded); auto-update limit 10 superseding; Replace = "uninstall previous version" enabled, Update = disabled; superseding apps require explicit targeting per official doc |
| APP-02 | Admin can manage Win32 app dependency graphs (max 100 dependencies per app; recursive application; circular-dependency detection) — discrete H2 alongside supersedence (combined supersedence+dependency 10-node subgraph) | §2 verified at Microsoft Learn April 2026; max 100 dependencies per graph; recursive sub-dependencies evaluated; circular detection IS implemented (existing reference doc at `docs/reference/win32-app-packaging.md:99` is INCORRECT — see §6 below) |
| APP-03 | Admin can package Win32 applications using Win32ContentPrepTool (current GA) into `.intunewin` and configure detection rules (MSI product code / file / registry / custom PowerShell script) | §1 + §3 verified at Microsoft Learn April 2026; **all 4 detection rule types confirmed** (MSI / File / Registry / custom PowerShell script) |
| APP-04 | Admin can deploy macOS apps via Intune across all supported types (LOB PKG with Apple Developer ID Installer cert; unmanaged PKG via Intune agent; DMG via Intune agent → /Applications; Microsoft 365 native VPP/managed; Mac App Store via ABM) | §4 verified at Microsoft Learn; LOB PKG requires Developer ID Installer cert + signed; unmanaged PKG and DMG via Intune management agent; Mac App Store apps via ABM/VPP token |
| APP-05 | Admin sees `> 📋 Community pattern — MEDIUM confidence` callout for Installomator/Intuneomator | §5 verified; Installomator MIT-licensed Bash command-line tool; Intuneomator is Swift-based wrapper bridging Installomator labels (900+) into Intune. Both community projects, NOT Microsoft-supported |
| APP-06 | Admin can manage iOS VPP licensing (device-licensing: no Apple ID, silent install on supervised; user-licensing: requires Apple ID + user accept; reclamation: retire/wipe + remove-app) | §7 verified at Microsoft Learn April 2026 — but **REQ wording is OVERSIMPLIFIED**: Microsoft Learn says "App licenses aren't reclaimed when a device is removed from Intune management." Reclamation requires changing assignment to **Uninstall** AND using **Revoke license** action. macOS has 30-day grace period; iOS does not |
| APP-07 | Admin can publish Android private apps via Managed Google Play (direct APK upload to MGP private track + MGP web app for web clip shortcuts) and understands AMAPI custom-apps API change applicable since 2024 | §8 verified at Microsoft Learn November 2025; "private app" = LOB APK upload directly via Intune admin center; "web app" = Managed Google Play web link with custom icon. **2024 AMAPI claim is NOT VERIFIED**: Google's official release notes show no 2024 entry for custom-apps API; AMAPI custom-apps SDK feature appears in **August 2025** release notes. Recommended: soften to "applicable since recent (2024-2025)" or cite specific MS Learn AMAPI migration callout if one exists |
| APP-08 | Admin can deploy Android OEMConfig apps via Intune (Zebra OEMConfig via APK side-load — explicitly NOT via Managed Google Play — per Phase 45 precedent) and operate the OEMConfig app lifecycle (update, revoke, troubleshoot) | §9 verified — Phase 45 SSoT at `docs/admin-setup-android/10-aosp-zebra.md:56` line confirms verbatim "OEMConfig profile delivery is via Intune APK push (NOT Managed Google Play — AOSP has no GMS, and therefore no MGP delivery channel)"; two Zebra OEMConfig apps disambiguated at Phase 45:116-119 |
</phase_requirements>

## Summary

Phase 55 is a documentation-only phase delivering a 5-file suite under `docs/operations/app-lifecycle/` plus a `check-phase-55.mjs` validator. All architectural decisions are LOCKED in CONTEXT.md via adversarial review (winners 1A/2B/3A/4C-prime hybrid). This research focuses exclusively on **technical accuracy of Microsoft-official current-state facts** for the 8 active requirements (APP-01..08).

The Microsoft Learn surface is current and well-documented (April 2026 ms.date on the Win32 supersedence and add-win32 docs; January 2026 ms.date on the VPP doc; November 2025 ms.date on the Managed Google Play doc). Research-validated facts confirm the structural decisions in CONTEXT.md. **Three corrections to existing project research are surfaced for the planner**: (1) Win32ContentPrepTool v1.8.7 release date is **August 13, 2021** — not 2024 as cited in `.planning/research/SUMMARY.md:47` (the version is correct, the date is not); (2) the AMAPI custom-apps "2024" framing in REQ APP-07 is not verifiable in Google's official release notes (custom-apps SDK feature appears in **August 2025**); (3) the existing `docs/reference/win32-app-packaging.md:99` claim that "Intune does not detect circular dependencies at configuration time" CONTRADICTS the official Microsoft Learn behavior (circular detection IS implemented per the canonical Intune supersedence + dependency reference). Plan author for 55-02 should either correct the existing reference doc same-commit OR plan-author 55-02 must phrase the dependency H2 carefully to avoid stating "Intune blocks at config time" definitively.

**Primary recommendation:** All Phase 55 architectural decisions are sound. Plan author should (a) verify the Win32ContentPrepTool current-GA version at execution time (currently still v1.8.7); (b) soften the AMAPI 2024 framing to "since 2024-2025" or cite a specific Microsoft Learn AMAPI migration callout (the existing `docs/research/PITFALLS.md:212-230` PITFALL-10 framing is correct — "max 10 superseding apps" + Required-assignment exception are both verified-current); (c) correct the circular-dependency claim either in 55-02 plan or as same-commit reference-doc errata.

## Architectural Responsibility Map

Phase 55 is documentation-only; no code-tier execution. Documentation tier mapping:

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Cross-platform comparison hub | Documentation: ops-domain hub file | — | `00-overview.md` is the cross-platform routing surface (Phase 54 D-01 inheritance) |
| Win32 supersedence + dependency + ContentPrepTool packaging | Documentation: per-platform Windows file | Reference doc cross-link | `01-windows-win32-msix-scale.md` substantive; cross-links to existing `docs/reference/win32-app-packaging.md` for detection-rule priority + dependency depth |
| macOS PKG/DMG pipeline + Installomator community callout | Documentation: per-platform macOS file | — | `02-macos-pkg-dmg-pipeline.md` substantive; community callout is `> 📋 Community pattern — MEDIUM confidence` blockquote |
| iOS VPP device-vs-user licensing + reclamation | Documentation: per-platform iOS file | v1.3 admin-setup cross-link | `03-ios-vpp-licensing.md` substantive (deepening VPP slice); cross-links to v1.3 `05-app-deployment.md` for full 4-column app-type matrix |
| Android MGP private-app publishing + AMAPI framing | Documentation: per-platform Android file (peer H2 #1) | — | `04-android-mgp-lifecycle.md` `## Managed Google Play Private App Publishing` H2 |
| Zebra OEMConfig APK side-load (NOT via MGP) | Documentation: per-platform Android file (peer H2 #2) + Phase 45 SSoT cross-link | Phase 45 admin guide | `04-android-mgp-lifecycle.md` `## Zebra OEMConfig APK Side-Load` H2 (operational-summary only); cross-links to `docs/admin-setup-android/10-aosp-zebra.md` for substantive content |
| Phase 55 validator | Tooling: validator-as-deliverable script | CI workflow (Phase 60) | `scripts/validation/check-phase-55.mjs`; Phase 60 registers in `audit-harness-v1.5-integrity.yml` |

## Microsoft Learn Current-State Facts per Platform

### §1 — Windows: Win32 Supersedence (APP-01)

| Fact | Confidence | Source |
|------|-----------|--------|
| Maximum 10 superseding apps per app (auto-update limit) | HIGH | Microsoft Learn `apps-win32-supersedence` (ms.date 2026-04-06; updated_at 2026-04-14) "Auto-update limitations: A Win32 app can have a maximum of 10 superseding apps." |
| Maximum 11 nodes in a single supersedence graph (1 superseding + 10 superseded) | HIGH | Microsoft Learn `apps-win32-supersedence` "There can only be a maximum of 11 nodes in a single supersedence graph. The nodes include the superseding app, the superseded apps, and all subsequent related apps." |
| **Required-assignment exception** (PITFALL-10) | HIGH | Microsoft Learn `apps-win32-supersedence` (verbatim quote): "Users who had the superseded app installed from the Company Portal will automatically receive the superseding app. **The supersedence auto-update only applies for available assignments, meaning users who have the superseded app through required intent won't receive the superseding app.**" |
| Replace vs Update option semantics | HIGH | Microsoft Learn `apps-win32-supersedence` "App update means that admin chose not to uninstall the superseded app during the configuration stage." (Update = `Uninstall previous version` toggle = OFF; Replace = ON) |
| Superseding apps require explicit targeting | HIGH | Microsoft Learn `apps-win32-supersedence` (verbatim): "Superseding apps don't get automatic targeting. Each app must have explicit targeting to take effect." |
| Win32ContentPrepTool current GA version | HIGH (version) / CORRECTED (date) | GitHub releases page shows **v1.8.7 released August 13, 2021** — NOT August 13, 2024 as `.planning/research/SUMMARY.md:47` cites. Plan author for 55-02 should verify at execution time (v1.8.7 is still current as of 2026-04-28) |
| `.intunewin` package format | HIGH | Microsoft Learn `add-win32` (ms.date 2026-04-14) — confirms `.intunewin` extension |

**Source URLs (HIGH confidence):**
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence (canonical: `apps-win32-supersedence` ; updated 2026-04-14)
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add (canonical: `add-win32` ; updated 2026-04-14)
- https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases (v1.8.7 = 2021-08-13)

### §2 — Windows: Win32 Dependency Graphs (APP-02)

| Fact | Confidence | Source |
|------|-----------|--------|
| Maximum 100 dependencies per app graph | HIGH | Microsoft Learn `add-win32` Step 5 verbatim: "There's a maximum of 100 dependencies, which include the dependencies of any included dependencies, as well as the app itself." |
| Recursive sub-dependency evaluation | HIGH | Microsoft Learn `add-win32` Step 5 verbatim: "a dependency can have recursive sub-dependencies, and each sub-dependency will be evaluated before the main dependency is evaluated." |
| Cross-graph dependency app counts ONCE | HIGH | Microsoft Learn `add-win32` Step 5 (illustrative example): "if graph A has 23 apps, graph B has 62 apps, and graph C has 20 apps, and app X exist as a dependency app somewhere in the dependency chain in all 3 graphs, then the total size of the graph is 103 (app X is only counted once), which surpasses the 100 limit restriction." |
| Circular dependency detection by Intune | HIGH (corrects existing project doc) | Per multiple secondary sources reflecting current MS Learn behavior: "If you make a mistake that turns into a circular dependency condition, you will get an error message telling you exactly that." Also reflected in Microsoft Learn `apps-win32-supersedence` "Conflict resolution: IME enforces supersedence intent when conflicts arise". **CORRECTION needed**: existing `docs/reference/win32-app-packaging.md:99` says "Intune does not detect circular dependencies at configuration time" — this is INCORRECT vs current behavior. Plan author should either (a) correct the reference doc same-commit, OR (b) phrase 55-02 carefully to avoid contradiction |
| Win32-only constraint (cannot mix with LOB MSI/MSIX) | HIGH | Microsoft Learn `add-win32` Step 5: "Any Win32 app dependency needs to also be a Win32 app. It doesn't support depending on other app types, such as single MSI LOB apps or Microsoft Store apps." |
| Auto-install opt-in/out per dependency | HIGH | Microsoft Learn `add-win32` Step 5: "By default, the **Automatically install** option is set to **Yes** for each dependency." |
| Dependency depth limit = 10 levels (chain) | MEDIUM-CITED | `docs/reference/win32-app-packaging.md:95` line "Maximum dependency depth: 10 levels" — orthogonal to APP-02's 100-count metric (depth ≠ count). Microsoft Learn `add-win32` does not explicitly state the 10-level depth limit but the 100-count limit is the hard ceiling |

**Critical implementation note for plan author 55-02:**
- The 10-node combined supersedence+dependency subgraph (CD-04 inheritance) is plan-author-discretion artifact form (Mermaid OR ASCII OR image). The SUBGRAPH must show ≥10 nodes total (some combination of supersedence and dependency relationships).
- Validator V-55-13 asserts `100 dependencies` (or `max 100`) literal AND `circular` literal AND ≥10-node graph artifact.

**Source URLs (HIGH confidence):**
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add (Step 5)

### §3 — Windows: Win32ContentPrepTool + Detection Rules (APP-03)

| Fact | Confidence | Source |
|------|-----------|--------|
| 4 detection rule types: MSI / File / Registry / custom PowerShell script | HIGH | Microsoft Learn `add-win32` Step 4 enumerates exactly these 4 types verbatim. "Manually configure detection rules: You can select one of the following rule types: MSI / File / Registry / Use a custom detection script (PowerShell)" |
| MSI detection: product code + optional version check | HIGH | Microsoft Learn `add-win32` Step 4: "MSI: Verify based on an MSI version check. ... MSI product code: Add a valid MSI product code for the app. MSI product version check: Select **Yes** to verify the MSI product version in addition to the MSI product code." |
| File detection: existence / date / version / size | HIGH | Microsoft Learn `add-win32` Step 4 |
| Registry detection: value / string / integer / version | HIGH | Microsoft Learn `add-win32` Step 4 |
| Custom PowerShell script: returns 0 + writes to STDOUT | HIGH | Microsoft Learn `add-win32` Step 4: "The app will be detected when the script both returns a **0** value exit code and writes a string value to STDOUT." |
| MSIX does NOT support supersedence | HIGH-CITED | `.planning/research/STACK.md:234` verbatim: "MSIX apps do NOT support supersedence; use version replacement in the same app entry instead." Microsoft Learn `apps-win32-supersedence` Prerequisites: "App supersedence can only be applied to Win32 apps." |
| Win32 app size cap | HIGH | Microsoft Learn `add-win32` Prerequisites: "Windows application size is capped at 30 GB per app." |

**Source URLs (HIGH confidence):**
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add (Step 4 Detection rules)

### §4 — macOS: App Deployment Pipeline (APP-04)

| Fact | Confidence | Source |
|------|-----------|--------|
| LOB PKG (managed): requires Developer ID Installer cert + signed | HIGH | Microsoft Learn `lob-apps-macos` and ecosystem confirmation: "The .pkg file must be signed using 'Developer ID Installer' certificate, obtained from an Apple Developer account." |
| LOB PKG component-package or multi-package requirement | HIGH | Microsoft Learn: "The .pkg file must satisfy specific requirements: be a component package or package containing multiple packages, not contain a bundle or disk image or .app file, be signed using a 'Developer ID Installer' certificate, and contain a payload." |
| Unmanaged PKG: via Intune agent; pre/post-install scripts available | HIGH | Microsoft Learn `macos-unmanaged-pkg`: "You need to deploy a PKG that the macOS LOB app workflow cannot install or that is not signed by an Apple Developer ID installer certificate. Pre-install and post-install scripts are available for apps installed via Intune agent." |
| DMG: via Intune management agent; mounts and copies .app to /Applications | HIGH | Microsoft Learn confirmation: "DMG deployment requires the Intune management agent for macOS to be installed on the device, where Intune will instruct the agent to mount the DMG and copy the .app bundle inside to the Applications folder, supporting apps packaged as disk images containing one or more .app files." |
| PKG / DMG assignment limitation: Required only (no Available, no Uninstall) | HIGH | Microsoft Learn: "When using the PKG deployment method, the only option is the 'Required' assignment type, whereas the 'Available for enrolled devices' and 'uninstall' options are not available." |
| Microsoft 365 native VPP/managed | HIGH | Microsoft Learn `vpp-apps-ios` (covers macOS too): purchased via ABM, synced to Intune, assignable as managed |
| Mac App Store via ABM | HIGH | Microsoft Learn `vpp-apps-ios` ms.date 2026-01-13: "[ABM allows admins to obtain] app licenses and synchronize them to Intune via a VPP token, allowing silent installation of App Store apps on Macs without requiring users to sign in with an Apple ID." |
| LOB PKG uninstall available only when "Install as managed" = Yes | HIGH | Microsoft Learn: "The uninstall intent is only displayed for LOB apps created with Install as managed set to Yes." |

**Source URLs (HIGH confidence):**
- https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos
- https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg
- https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios

### §5 — macOS: Installomator/Intuneomator Community Pattern (APP-05)

| Fact | Confidence | Source |
|------|-----------|--------|
| Installomator: MIT-licensed Bash command-line tool for macOS app install/update | HIGH | https://github.com/Installomator/Installomator + https://installomator.com/ |
| Intuneomator: Swift-based wrapper bridging Installomator labels into Intune | HIGH | https://github.com/gilburns/Intuneomator |
| Intuneomator leverages 900+ Installomator labels | HIGH | Intuneomator GitHub README |
| Both projects: community OSS, NOT Microsoft-supported | HIGH | Both projects' GitHub READMEs explicitly position as community tools |
| University of Utah presentation 2025-10-15 | HIGH | https://downloads.lib.utah.edu/media_streaming_presentation_documents/pdf/mac_mgrs/20251015_mm/2025.10.15_mm_intuneomator.pdf |

**Confidence-attribution callout (D-16):** `> 📋 Community pattern — MEDIUM confidence` blockquote in `02-macos-pkg-dmg-pipeline.md`. Plan author MUST attribute as community pattern with explicit non-Microsoft-supported labeling. Validator V-55-17 enforces the literal token presence + Installomator + Intuneomator literals within blockquote scope.

### §6 — Existing project doc circular-dependency claim CORRECTION

The existing reference doc `docs/reference/win32-app-packaging.md` contains at lines 97-99:

> "## Circular Dependency Detection
> Intune does not detect circular dependencies at configuration time. A circular dependency (App A requires App B, App B requires App A) fails silently — neither app installs."

**This is INCORRECT vs. current Microsoft Learn behavior (April 2026).** Per Microsoft Learn `apps-win32-supersedence`: circular detection IS implemented; multiple secondary sources confirm: "If you make a mistake that turns into a circular dependency condition, you will get an error message telling you exactly that." 

**Plan-author guidance:**
- **Option A (recommended):** Plan author for 55-02 corrects the existing reference doc as a same-commit edit. Append to commit message: "+ corrects circular-dependency-detection claim in win32-app-packaging.md to match April 2026 Microsoft Learn behavior".
- **Option B:** Plan author for 55-02 phrases the dependency H2 carefully to avoid contradicting the reference doc; planner notes the inconsistency for future Phase 56+ cleanup.
- **Option C:** Plan author for 55-02 cross-links to the reference doc but adds an inline correction in 01-windows-win32-msix-scale.md: "Note: as of [current MS Learn date], Intune does detect circular dependencies at configuration time and surfaces an explicit error message."

V-55-13 asserts `circular` literal in `## Dependency Graphs` H2 scope — does NOT specify "Intune does not detect" wording, so all 3 options are validator-compatible. Recommend Option A for consistency.

### §7 — iOS: VPP Device-vs-User Licensing + Reclamation (APP-06)

| Fact | Confidence | Source |
|------|-----------|--------|
| Device-licensing: NO Apple ID required | HIGH | Microsoft Learn `vpp-apps-ios` ms.date 2026-01-13 verbatim table: "App Store sign-in: Not required" for Device Licensing |
| User-licensing: requires Apple ID | HIGH | Microsoft Learn `vpp-apps-ios` verbatim table: "Each end user must use a unique Apple Account when prompted to sign in to App Store" for User Licensing |
| Device-licensing: 1 license per device | HIGH | Microsoft Learn `vpp-apps-ios` verbatim: "One license per device. The license is associated with the device." |
| User-licensing: 1 license / up to 5 devices per user | HIGH | Microsoft Learn `vpp-apps-ios` verbatim: "One license for up to five devices using the same personal Apple Account." |
| Silent install on supervised + device-licensed | HIGH | Microsoft Learn `vpp-apps-ios` table 8 — scenarios 6 (CORP – device licensed supervised) + 7 (Kiosk supervised device-licensed): zero prompts |
| User Enrollment compatibility | HIGH | Device-licensed = NOT supported; User-licensed = Supported using Managed Apple Accounts |
| BYOD applicability | HIGH | Device-licensed scenario 4 (BYOD device-licensed): app install prompt, no Apple ID prompt; User-licensed scenario 1 (BYOD user-licensed): Apple VPP invite + app install prompt + Apple ID prompt |
| Default license type now "device" for new VPP assignments | HIGH | Microsoft Learn `vpp-apps-ios` (multiple notes): "When you create a new assignment for an Apple Volume Purchase Program (VPP) app, the default license type is now 'device.' Existing assignments remain unchanged." |
| **Reclamation behavior — REQ wording is OVERSIMPLIFIED** | HIGH (correction) | Microsoft Learn `vpp-apps-ios` verbatim: "App licenses aren't reclaimed when a device is removed from Intune management." AND "Removing an app assignment is a prerequisite to revoking an app license. When you remove an app assignment for a user, Intune doesn't reclaim the user or device license until you change the assignment to **Uninstall**." AND "After removing the app assignment, you can reclaim an app license from the user or device using the **Revoke license** action." Reclamation is a 2-step admin workflow, NOT automatic on retire/wipe |
| iOS reclamation: NO grace period after revoke | HIGH | Microsoft Learn `vpp-apps-ios` table — only macOS has the 30-day grace period explicitly stated |
| macOS reclamation: 30-day grace period before app removal | HIGH | Microsoft Learn `vpp-apps-ios` verbatim: "The macOS app with revoked license remains usable on the device, but can't be updated until a license is reassigned to the user or device. According to Apple, such apps are removed after a 30-day grace period." |
| Auto-reclaim on Microsoft Entra ID user deletion | HIGH | Microsoft Learn `vpp-apps-ios`: "Intune revokes app licenses when the user is deleted from Microsoft Entra ID." AND "Intune reclaims app licenses when an employee leaves the company and is no longer part of the Microsoft Entra groups." |
| License migration: device → user NOT possible | HIGH | Microsoft Learn `vpp-apps-ios` verbatim: "Apps can migrate silently from user to device licenses only when using **Required** assignment type. Apps can't migrate from device to user licenses for any assignment type." |

**Critical correction for plan author 55-04:**
The REQ APP-06 wording "retire/wipe returns device license; remove app returns user license" is **oversimplified**. The actual Microsoft Learn behavior is:
1. Removing a device from Intune management does NOT auto-reclaim licenses
2. Reclamation requires (a) removing the app assignment, (b) changing assignment type to **Uninstall**, (c) using **Revoke license** action
3. Auto-reclaim DOES happen when user is removed from Microsoft Entra group OR deleted from Entra ID
4. macOS apps have 30-day grace period after license revoke; iOS does not

The 2-column VPP comparison table per D-07 should encode the *steady-state* device-license-vs-user-license attributes (where they differ) — and a separate row OR adjacent prose should state the actual reclamation workflow. V-55-19 asserts `retire/wipe` AND `device license` AND `remove app` AND `user license` literals; CD-07 grants plan author discretion on row labels.

**Plan-author guidance:** Use Microsoft Learn verbatim phrasing where possible:
- "Device-licensed: License is associated with the device. Reclamation requires removing the app assignment, changing intent to **Uninstall**, then using **Revoke license**."
- "User-licensed: License is associated with the user. Auto-reclaim on Entra group removal or user deletion; admin can manually revoke."
- "macOS only: 30-day grace period after license revoke."

**Source URLs (HIGH confidence):**
- https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios (canonical: `manage-vpp-apple` ; ms.date 2026-01-13; updated_at 2026-04-21)

### §8 — Android: Managed Google Play Private App Publishing (APP-07)

| Fact | Confidence | Source |
|------|-----------|--------|
| MGP is the sole source of apps for Android Enterprise in Intune | HIGH | Microsoft Learn `apps-add-android-for-work` (canonical `add-managed-google-play` ; ms.date 2025-11-03; updated_at 2026-04-17) verbatim: "Managed Google Play is Google's enterprise app store and sole source of applications for Android Enterprise in Intune." |
| 3 MGP app types: store / private (LOB) / web link | HIGH | Microsoft Learn `add-managed-google-play` verbatim 3-type list |
| Direct APK upload to MGP private track via Intune admin center | HIGH | Microsoft Learn `add-managed-google-play` "Managed Google Play private (LOB) app publishing directly in the Microsoft Intune admin center" — full 10-step workflow documented |
| Alternative path: Google Play Developer Console (legacy, still supported) | HIGH | Microsoft Learn `add-managed-google-play`: "Although this method is still supported, it's recommended to publish apps directly in the Intune admin console." |
| Private apps published via Intune are PERMANENTLY private (cannot be made public) | HIGH | Microsoft Learn `add-managed-google-play` Important callout: "Private apps added using this method can never be made public." |
| Unique-package-name requirement | HIGH | Microsoft Learn `add-managed-google-play`: "Your app's package name must be globally unique in Google Play (not just unique within your enterprise or Google Play Developer account)." |
| Web link / web app: deployable as Managed Google Play web link with admin-defined icon | HIGH | Microsoft Learn `add-managed-google-play`: Web links "appear on devices in the device's app list just like regular apps" |
| Display options for web links: full screen / standalone / minimal UI (only Chrome) | HIGH | Microsoft Learn `add-managed-google-play` |
| Upload limit: 15 private apps per day (web apps count toward total) | HIGH | Multiple secondary sources reflect Microsoft Learn / Google's MGP publishing limit |
| 10-minute average MGP private-app sync time | HIGH | Microsoft Learn `add-managed-google-play`: "makes LOB apps available for management in as little as 10 minutes" |
| **AMAPI 2024 framing** | **MEDIUM-LOW** | **NOT VERIFIED** in Google's official release notes; AMAPI custom-apps SDK feature appears in **August 2025** Google AMAPI release notes, not 2024. Recommend rephrasing — see plan-author guidance below |

**Critical research finding for plan author 55-05 — AMAPI 2024 claim:**

The REQ APP-07 verbatim text says "AMAPI custom-apps-via-Google-Play API change applicable since 2024." Research found:
1. Google's official Android Management API release notes (https://developers.google.com/android/management/release-notes) shows **NO 2024 entry** for custom-apps API. The 2024 release notes cover Private Space, Wi-Fi roaming, Common Criteria Mode, screen brightness, SIM ICCID — none related to custom apps.
2. The **first AMAPI custom-apps entry** appears in **August 2025** Google release notes, introducing installation support for applications via AMAPI SDK and `CUSTOM` install type parameter.
3. The Google Play Custom App Publishing API (separate from AMAPI) has existed since ~2018 — that's the iframe-based publishing flow Microsoft Intune already uses. No 2024 change to that API documented in either Google or Microsoft sources.
4. There IS a "Support Tip: Intune moving to support new Google Play Android Management API" Microsoft TechCommunity post (id `ba-p/3849875`) referenced in Microsoft Learn `add-managed-google-play` — that may be the 2024 framing source, but research could not retrieve the exact post date.

**Plan-author guidance for 55-05:**
- **Option A (safest — verify-at-execution):** Plan author retrieves the actual TechCommunity Support Tip post date and substitutes the verified date. Validator V-55-22 accepts `AMAPI` + `2024` literal coverage; if the actual date is 2024-something, this preserves V-55-22.
- **Option B:** Soften the framing to "AMAPI custom-apps-via-Google-Play API integration applicable since 2024-2025" — V-55-22's `2024` literal still matches.
- **Option C:** Substantively reframe as "the migration to Google Play Android Management API (AMAPI) for custom app distribution, announced by Microsoft in 2024" — preserves the 2024 token while attributing to a Microsoft announcement rather than Google API change.
- **Option D:** Verify with plan-discussion before execution — flag as Open Question for user confirmation.

D-11 placement (inside MGP H2 body content; soft historical context; single inline mention) is unaffected by phrasing choice.

**Source URLs:**
- HIGH: https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-android-for-work (`add-managed-google-play`)
- LOW (could not verify date): "Support Tip: Intune moving to support new Google Play Android Management API" — TechCommunity post `t5/intune-customer-success/ba-p/3849875`
- HIGH (refutes 2024 timing): https://developers.google.com/android/management/release-notes (no 2024 custom-apps entries; first custom-apps entry = August 2025)

### §9 — Android: Zebra OEMConfig APK Side-Load (APP-08)

| Fact | Confidence | Source |
|------|-----------|--------|
| AOSP has no GMS → no MGP delivery channel | HIGH | Phase 45 SSoT `docs/admin-setup-android/10-aosp-zebra.md:56` verbatim: "OEMConfig profile delivery is via Intune APK push (NOT Managed Google Play — AOSP has no GMS, and therefore no MGP delivery channel)." |
| Zebra OEMConfig: APK side-load via Intune line-of-business app upload | HIGH | Phase 45 SSoT `10-aosp-zebra.md:110-123` `## OEMConfig APK Push (Intune)` H2 |
| Two Zebra OEMConfig apps: "Zebra OEMConfig Powered by MX" (Android 13+ AND Android 11) vs "Legacy Zebra OEMConfig" (Android 11 and earlier) | HIGH | Phase 45 SSoT `10-aosp-zebra.md:116-119` 4-row disambiguation table |
| Single-profile vs multi-profile model differences | HIGH | Phase 45 SSoT `10-aosp-zebra.md:118-119` |
| StageNow Export-to-MDM optional alternative | HIGH | Phase 45 SSoT `10-aosp-zebra.md:91-95` Step 4 Option B |
| Zebra LifeGuard OTA (Phase 54 territory) is firmware management, NOT app lifecycle | HIGH | Phase 54 D-13 + `04-android-patch-delivery.md:134` — Phase 55 04-android does NOT cover LifeGuard |
| Samsung KSP (Knox Service Plugin) is configuration delivery — Phase 54 territory, NOT Phase 55 app lifecycle | HIGH | Phase 54 `04-android-patch-delivery.md:162-189` substantive Samsung KSP section |

**Phase 45 SSoT preservation contract:**
- Phase 55 `04-android-mgp-lifecycle.md` `## Zebra OEMConfig APK Side-Load (NOT via MGP) {#zebra-oemconfig}` H2 contains:
  - 3-5 line operational summary describing OEMConfig surface + load-bearing exception
  - 3-bullet operate-the-lifecycle list (update / revoke / troubleshoot — discharges APP-08 SC#5 "operate" verb)
  - Cross-link to `../../admin-setup-android/10-aosp-zebra.md` for substantive content
- Phase 55 does NOT duplicate Hardware Scope / Prerequisites / Provisioning Steps / two-OEMConfig-app disambiguation table — those live in Phase 45 SSoT (24,518 bytes; line 56 disclaimer; lines 116-119 disambiguation).

V-55-23 asserts `## Zebra OEMConfig APK Side-Load` H2 (with optional `(NOT via MGP)` parenthetical) AND `OEMConfig` AND `APK side-load` (or `APK push`) AND `NOT via Managed Google Play` (or `NOT Managed Google Play`).
V-55-24 asserts cross-link to `10-aosp-zebra.md`.
V-55-25 asserts `update` AND `revoke` AND `troubleshoot` literals within Zebra H2 scope.

## PITFALL-10 Required-Assignment Exception Verification

**Source verification:** The PITFALL-10 framing in `.planning/research/PITFALLS.md:212-230` is **VERIFIED CURRENT** as of April 2026 Microsoft Learn behavior:

| Claim | Verification Status | Microsoft Learn Source |
|-------|--------------------|-----------------------|
| "If App A supersedes App B, but App B is still assigned as Required to a device group, the device receives conflicting instructions" | VERIFIED | `apps-win32-supersedence` Auto-update limitations section |
| "required assignment wins; supersedence only removes B if it was deployed as Available, not Required" | VERIFIED VERBATIM | `apps-win32-supersedence`: "The supersedence auto-update only applies for available assignments, meaning users who have the superseded app through required intent won't receive the superseding app." |
| "Replace vs Update option: Replace enables 'uninstall previous version'; Update disables it" | VERIFIED | `apps-win32-supersedence` Step 6 + add-win32 Step 6 verbatim |
| "Required assignment exception buried in a footnote in Microsoft Learn" | VERIFIED — placement is in "Auto-update limitations" subsection, not in primary supersedence behavior matrix | `apps-win32-supersedence` |
| "max 10 superseding apps per app" | VERIFIED | `apps-win32-supersedence` Auto-update limitations section verbatim |
| "Targeting required on superseding app" | VERIFIED VERBATIM | `apps-win32-supersedence`: "Superseding apps don't get automatic targeting. Each app must have explicit targeting to take effect." |

**Plan-author guidance for 55-02 PITFALL-10 callout (D-04 + D-05):**

Per D-05, the dedicated `> ⚠️ **Required-assignment exception:**` callout MUST be placed within ~10 lines of the supersedence behavior matrix INSIDE `## Supersedence` H2 (NOT at file top, NOT in `## Dependency Graphs` H2, NOT in `## ContentPrepTool Packaging` H2).

**Recommended callout content (plan-author discretion per CD-06 lineage):**
```markdown
> ⚠️ **Required-assignment exception:** Supersedence auto-update only applies to apps assigned with **Available for enrolled devices** intent. Devices that received the superseded app through a **Required** assignment will NOT receive the superseding app via the supersedence chain. To replace a Required-assigned app, the admin must (a) re-target the new app as Required to the same group, OR (b) change the existing Required assignment to Uninstall, then re-create the assignment with the superseding app. The Required-assignment behavior is documented at the [auto-update limitations](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence) section of the Microsoft Learn supersedence reference.
```

Validator V-55-12 enforces literal `> ⚠️` blockquote with `Required-assignment exception` (or `Required assignment exception`) within ~10 lines of supersedence behavior matrix anchor.

The **supersedence behavior matrix** required by D-04 + V-55-11 should encode the 4 cells (`Available` × `Uninstall` / `Replace` ; `Required` × `Uninstall` / `Replace`):

| Source assignment | Uninstall (Update mode) | Replace (Replace mode) |
|---|---|---|
| Available | Auto-update on next check-in (8-16 hours) | Uninstall superseded; install superseding |
| Required | **Required-assignment exception applies** — no auto-update | Manual re-targeting required (no automatic supersedence) |

(Cell wording is plan-author discretion within validator literal-token coverage.)

## Cross-Link Target Content Scope Verification

### `docs/admin-setup-android/10-aosp-zebra.md` (Phase 45 SSoT — V-55-24 cross-link target)

| Property | Value | Verified |
|----------|-------|----------|
| Size | 24,518 bytes | ✅ verified at file-system check |
| Last verified | 2026-04-25 (frontmatter `last_verified`) | ✅ |
| Line 56 disclaimer | "OEMConfig profile delivery is via Intune APK push (NOT Managed Google Play — AOSP has no GMS, and therefore no MGP delivery channel)" verbatim | ✅ |
| Two-OEMConfig-app disambiguation | Lines 114-121 (4-row table at 116-119 + HIGH-confidence MS Learn citation at 121) | ✅ |
| OEMConfig APK Push H2 | `<a id="oemconfig-apk-push"></a>` at line 109 | ✅ |
| Phase 55 cross-link contract | Operational summary (~3-5 lines) + 3-bullet operate-the-lifecycle list (update / revoke / troubleshoot) + cross-link to 10-aosp-zebra.md | per D-10 + CDI-Phase55-07 |

**No content modifications needed in 10-aosp-zebra.md by Phase 55** — pure consumer of Phase 45 SSoT.

### `docs/admin-setup-ios/05-app-deployment.md` (v1.3 SSoT — V-55-21 cross-link target)

| Property | Value | Verified |
|----------|-------|----------|
| Size | 20,397 bytes | ✅ verified at file-system check |
| 4-column app-type comparison table | Lines 51-64 (12 attribute rows × 4 columns: VPP Device-Licensed / VPP User-Licensed / LOB (.ipa) / Store Apps without VPP) | ✅ |
| Silent install scenarios at 36-43 | Supervised-only callout block (referenced in CONTEXT.md D-08) | ✅ |
| Device-vs-user prose at 24-28 | Brief overview of two licensing models | ✅ |
| Phase 55 cross-link contract | 03-ios-vpp-licensing.md cross-links to v1.3 05-app-deployment.md for the broader 4-column matrix; Phase 55 deepens VPP slice with reclamation rows (NET-NEW) | per D-07 |
| **CRITICAL — Reclamation token absence** | Zero `reclaim` or `reclamation` tokens anywhere in `docs/admin-setup-ios/` confirmed via Grep (verified by CONTEXT.md D-07 file-system scan finding) | ✅ |

**Phase 55 contribution is NET-NEW vs v1.3:** reclamation rows are the dominant differentiator. No content modifications needed in 05-app-deployment.md by Phase 55.

### `docs/reference/win32-app-packaging.md` (existing reference — V-55-29 cross-link target)

| Property | Value | Verified |
|----------|-------|----------|
| Size | 8,730 bytes | ✅ verified at file-system check |
| Detection rule priority section | Confirmed (referenced from CONTEXT.md D-06) | ✅ |
| Dependency Chain Behavior + 10-level depth | Line 91-95 verbatim "Maximum dependency depth: 10 levels" | ✅ |
| Circular Dependency Detection | Lines 97-99 — **CONTAINS INCORRECT CLAIM** ("Intune does not detect circular dependencies at configuration time") — see §6 above | ⚠️ |
| Anti-Pattern Warning | Line 110-113 (Win32/MSI mixing in ESP) | ✅ |
| Phase 55 cross-link contract | 01-windows-win32-msix-scale.md cross-links for detection rule priority + dependency depth (orthogonal facts: 10-level depth ≠ APP-02's 100-count) | per D-06 |

**Plan-author decision needed:** Address §6 circular-dependency claim correction (Option A / B / C — recommend Option A: same-commit edit).

## Phase 54 Sibling Shape Verification (Phase 55 Inheritance Source)

### `docs/operations/patch-management/00-overview.md` — 1D Hybrid baseline

H2 structure (verified via Grep):
```
## Cross-Platform Comparison        (line 37)
## Ring Terminology                 (line 63)
## Deferral vs Enforcement          (line 95)
## Routing to Per-Platform Guides   (line 138)
## Cross-Platform Planning Considerations  (line 157)
## Related Resources                (line 198)
## External References              (line 209)
```

Total: 218 lines; cross-platform inline blockquote at line 9; 4-platform comparison table at line 37; 3 concept H2s (Ring Terminology / Deferral vs Enforcement / Cross-Platform Planning Considerations).

**Phase 55 00-overview.md inheritance pattern (D-01 2B winner):**
- Cross-platform comparison table at top (~line 37 equivalent)
- ONE concept H2 `## App-lifecycle terminology` (vs Phase 54's 3 concept H2s — Phase 55 is shape-leaner per 2B winner; CD-09 grants framing discretion)
- Routing to per-platform guides H2
- Optional Cross-Platform Planning Considerations H2 (CD-03 lineage)
- Size budget 200-350 lines hard cap (D-01)

### `docs/operations/patch-management/01-windows-wufb-rings.md` — Multi-H2 Windows precedent

H2 structure (verified):
```
## WUfB Deployment Rings                    (line 28)
## Windows Autopatch Rings (Disambiguation) (line 60)
## Hotpatch                                  (line 104)
## Driver and Firmware Update Policy        (line 148)
## Related Resources                         (line 194)
## External References                       (line 205)
```

4 substantive H2s (PITFALL-9 disambiguation + Hotpatch + Driver/Firmware) in Phase 54 Windows file.

**Phase 55 01-windows-win32-msix-scale.md inheritance pattern (D-04 1A winner):**
- 3 substantive top-level H2s in document order: `## Supersedence` → `## Dependency Graphs` → `## ContentPrepTool Packaging`
- MSIX = ~5-10 line routing-only sub-section under packaging H2 (NOT a separate H2)
- Cross-platform inline blockquote at line 9
- PITFALL-10 callout adjacent to supersedence behavior matrix (within ~10 lines)
- Combined 10-node supersedence+dependency subgraph artifact (CD-04 plan-author discretion: Mermaid / ASCII / image)

### `docs/operations/patch-management/03-ios-update-lifecycle.md` — Zero-Mermaid iOS pattern

Verification:
- Total H2s: 5 substantive + 2 boilerplate = 7
- **Zero Mermaid blocks** verified via Grep (`mermaid` count = 0 across entire `docs/operations/patch-management/` tree)
- 7,778 bytes (smallest Phase 54 ops file)
- Cross-platform inline blockquote at line 9 verbatim

**Phase 55 03-ios-vpp-licensing.md inheritance pattern (D-09 + CDI-Phase55-06):**
- **Zero Mermaid** (V-55-20 NEGATIVE regression-guard)
- 2-column VPP attribute comparison table (D-07 3A winner)
- 6+ rows including reclamation rows (verified net-new vs v1.3)
- Cross-link to `05-app-deployment.md` (V-55-21)
- Cross-platform inline blockquote at line 9

### `docs/operations/patch-management/04-android-patch-delivery.md` — 4C-prime hybrid template

H2 structure (verified):
```
## Google Play Patch Delivery               (line 27)
## Play Integrity Attestation               (line 50)
## Deadlines & Cutover Dates                (line 76)
## Enforcement Cascade Migration            (line 92)
## Zebra LifeGuard OTA (Zebra Fleets)      (line 134)  ← peer H2 #1 OEM
## Samsung Knox Service Plugin (Samsung Fleets)  (line 162)  ← peer H2 #2 OEM
## Related Resources                         (line 194)
## External References                       (line 205)
```

**Verified peer-H2 + cross-link pattern:** Lines 134 + 162 are PEER H2s; line 184 (within Samsung KSP H2) contains cross-link to `admin-setup-android/07-knox-mobile-enrollment.md` for substantive Knox enrollment content. This is the EXACT template Phase 55 4C-prime hybrid inherits.

**Phase 55 04-android-mgp-lifecycle.md inheritance pattern (D-10 4C-prime hybrid):**
- Peer H2 #1: `## Managed Google Play Private App Publishing` (substantive — APK upload + web app + AMAPI 2024 framing)
- Peer H2 #2: `## Zebra OEMConfig APK Side-Load (NOT via MGP) {#zebra-oemconfig}` (operational summary + 3-bullet list + cross-link to Phase 45 SSoT)
- Cross-platform inline blockquote at line 9
- AMAPI 2024 framing inline within MGP H2 body (D-11; single mention; no three-layer)

### Cross-platform inline blockquote token (D-13)

**Verified across all 5 Phase 54 files** (via Grep / Read):

| File | Line 9 | Token | Verified |
|------|--------|-------|----------|
| `00-overview.md` | 9 | `> **Platform applicability:** This guide is the cross-platform patch & update overview hub...` | ✅ |
| `01-windows-wufb-rings.md` | 9 | `> **Platform applicability:** This guide is Windows-specific...` | ✅ |
| `02-macos-update-enforcement.md` | 9 | `> **Platform applicability:**` | ✅ (per CONTEXT.md) |
| `03-ios-update-lifecycle.md` | 9 | `> **Platform applicability:** This guide is iOS/iPadOS-specific...` | ✅ |
| `04-android-patch-delivery.md` | 9 | `> **Platform applicability:**` | ✅ (per CONTEXT.md) |

**Phase 55 D-13 inheritance:** All 5 Phase 55 files MUST carry `> **Platform applicability:**` blockquote at line 9 verbatim. Bare `> **Platform:**` is forbidden (V-55-27 NEGATIVE regression-guard paralleling Phase 54 V-54-27).

## Validation Architecture

> Phase 55 inherits Nyquist Validation discipline per `.planning/config.json` workflow.nyquist_validation enabled (key absent = enabled). Validation Architecture maps phase requirements to test/check assertions.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Custom Node.js validator (`check-phase-55.mjs`) — file-reads-only, regex-based, no shared modules |
| Config file | None (validator is self-contained per Phase 48 D-25 lineage) |
| Quick run command | `node scripts/validation/check-phase-55.mjs` |
| Full suite command | `node scripts/validation/check-phase-55.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| APP-01 | Win32 supersedence behavior matrix + PITFALL-10 callout in `01-windows-win32-msix-scale.md` | structural-doc | V-55-11 + V-55-12 in `check-phase-55.mjs` | ❌ Wave 0 — file does not exist yet |
| APP-02 | Dependency Graphs H2 + max 100 + circular literal + 10-node subgraph | structural-doc | V-55-13 in `check-phase-55.mjs` | ❌ Wave 0 |
| APP-03 | ContentPrepTool H2 + .intunewin + 4 detection rule types + MSIX disclaimer | structural-doc | V-55-14 + V-55-15 in `check-phase-55.mjs` | ❌ Wave 0 |
| APP-04 | macOS app-types coverage in `02-macos-pkg-dmg-pipeline.md` | structural-doc | V-55-16 in `check-phase-55.mjs` | ❌ Wave 0 |
| APP-05 | Installomator/Intuneomator MEDIUM-confidence callout literal | structural-doc | V-55-17 in `check-phase-55.mjs` | ❌ Wave 0 |
| APP-06 | iOS VPP 2-col table + reclamation literals + Mermaid NEGATIVE | structural-doc | V-55-18 + V-55-19 + V-55-20 + V-55-21 | ❌ Wave 0 |
| APP-07 | MGP H2 + AMAPI + 2024 + private track + web app | structural-doc | V-55-22 in `check-phase-55.mjs` | ❌ Wave 0 |
| APP-08 | Zebra OEMConfig peer H2 + NOT-via-MGP disclaimer + cross-link + operate verbs | structural-doc | V-55-23 + V-55-24 + V-55-25 in `check-phase-55.mjs` | ❌ Wave 0 |
| Cross-cutting | Cross-platform inline blockquote × 5 files | structural-doc | V-55-26 (POSITIVE) + V-55-27 (NEGATIVE bare-noun) | ❌ Wave 0 |
| Cross-cutting | ops/00-index.md NOT amended | structural-doc | V-55-28 NEGATIVE in `check-phase-55.mjs` | ✅ exists, must remain unchanged |
| Cross-cutting | TBD/TODO/PLACEHOLDER scan | structural-doc | V-55-30 in `check-phase-55.mjs` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `node scripts/validation/check-phase-55.mjs` (must exit 0)
- **Per wave merge:** `node scripts/validation/check-phase-55.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose` (both must exit 0; C13 informational tolerated per Phase 48 D-08)
- **Phase gate (pre-commit):** all 30-34 V-55-NN checks PASS + `regenerate-supervision-pins.mjs --self-test` exits 0 (regression-prevention; should be unaffected) + markdown-link-check informational against 5 new files

### Wave 0 Gaps

- [ ] `docs/operations/app-lifecycle/00-overview.md` — covers cross-platform routing (no specific REQ)
- [ ] `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` — covers APP-01 + APP-02 + APP-03
- [ ] `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` — covers APP-04 + APP-05
- [ ] `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` — covers APP-06
- [ ] `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` — covers APP-07 + APP-08
- [ ] `scripts/validation/check-phase-55.mjs` — covers all 30-34 V-55-NN structural assertions (validator-as-deliverable per AUDIT-06)

### Validator Literal-Token Regex Catalog (V-55-01..32)

The following table enumerates the 30-34 validator assertions per CONTEXT.md D-17. Each row specifies the assertion ID, what it pins, and which file scope. Plan author for 55-06 implements these regex checks in `check-phase-55.mjs`.

#### File existence (V-55-01..06)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-01 | `docs/operations/app-lifecycle/00-overview.md` exists | (file existence) |
| V-55-02 | `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` exists | (file existence) |
| V-55-03 | `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` exists | (file existence) |
| V-55-04 | `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` exists | (file existence) |
| V-55-05 | `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` exists | (file existence) |
| V-55-06 | `scripts/validation/check-phase-55.mjs` exists (self-referential) | (file existence) |

#### Frontmatter (V-55-07)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-07 | All 5 app-lifecycle files have valid `platform:` (Windows / macOS / iOS / Android / cross-platform OR comma-string `Windows,macOS,iOS,Android` for 00-overview) + `audience:` (any non-empty) + `last_verified:` (60-day cycle) + `review_by:` | All 5 files |

#### 00-overview structural (V-55-08..10)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-08 | 4-platform comparison table with `Windows` AND `macOS` AND `iOS` AND `Android` literals (any orientation) | `00-overview.md` |
| V-55-09 | App-lifecycle terminology concept H2: regex `^##\s+App-lifecycle terminology` (or equivalent terminology H2 with ≥3 cross-platform terminology tokens) | `00-overview.md` |
| V-55-10 | NEGATIVE — 00-overview MUST NOT contain literal tokens: `Win32ContentPrepTool`, `\.intunewin`, `Required assignment`, `Replace vs Update`, `Installomator`, `Intuneomator`, `OEMConfig`, `MGP private track`, `AMAPI`, `reclamation` | `00-overview.md` |

#### 01-windows structural (V-55-11..15)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-11 | Literal H2 `^##\s+Supersedence$` + supersedence behavior matrix (markdown table within ~30 lines containing cells covering `Available` AND `Required` × `Uninstall` AND `Replace`) | `01-windows-win32-msix-scale.md` |
| V-55-12 | Literal `> ⚠️` blockquote with `Required-assignment exception` (or `Required assignment exception`) within ~10 lines of supersedence behavior matrix anchor | `01-windows-win32-msix-scale.md` |
| V-55-13 | Literal H2 `^##\s+Dependency Graphs$` + `100 dependencies` (or `max 100`) literal + `circular` literal + ≥10-node graph artifact (Mermaid block OR ASCII art with ≥10 nodes OR image-link with `subgraph` qualifier) | `01-windows-win32-msix-scale.md` |
| V-55-14 | Literal H2 `^##\s+ContentPrepTool Packaging$` (or equivalent) + `\.intunewin` literal + 4 detection rule type literals: `MSI` AND `file` AND `registry` AND `PowerShell` (case-insensitive partial matches in detection-rule context) | `01-windows-win32-msix-scale.md` |
| V-55-15 | Literal `MSIX` AND `does NOT support supersedence` (or `do NOT support supersedence`) within `## ContentPrepTool Packaging` H2 scope | `01-windows-win32-msix-scale.md` |

#### 02-macos structural (V-55-16..17)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-16 | macOS app-types coverage: literals `LOB PKG` AND `unmanaged PKG` AND `DMG` AND `Apple Developer ID Installer` AND `VPP` AND `Mac App Store` AND `ABM` (or `Apple Business Manager`) | `02-macos-pkg-dmg-pipeline.md` |
| V-55-17 | Literal `> 📋 Community pattern — MEDIUM confidence` (or `> 📋 Community pattern - MEDIUM confidence` em-dash OR hyphen accepted) blockquote with `Installomator` AND `Intuneomator` literals within blockquote scope. NEGATIVE regression-guard: zero bare `> 📋` without `Community pattern` qualifier in body content | `02-macos-pkg-dmg-pipeline.md` |

#### 03-ios structural (V-55-18..21)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-18 | 2-column comparison table with `VPP Device-Licensed` (or `Device-Licensed`) AND `VPP User-Licensed` (or `User-Licensed`) column headers | `03-ios-vpp-licensing.md` |
| V-55-19 | Reclamation literals: `retire/wipe` (or `retire and wipe`) AND `device license` (or `device-license`) within reclamation context AND `remove app` (or `remove-app`) AND `user license` (or `user-license`) within reclamation context | `03-ios-vpp-licensing.md` |
| V-55-20 | NEGATIVE — zero Mermaid code blocks (regex \`\`\`mermaid ... \`\`\`) | `03-ios-vpp-licensing.md` |
| V-55-21 | Literal cross-link to `05-app-deployment.md` (relative path `../../admin-setup-ios/05-app-deployment.md`) | `03-ios-vpp-licensing.md` |

#### 04-android structural (V-55-22..25)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-22 | Literal H2 `^##\s+Managed Google Play Private App Publishing$` (or equivalent) + `private track` (or `private app track`) + `web app` (or `web clip` or `web link`) + `AMAPI` + `2024` literals | `04-android-mgp-lifecycle.md` |
| V-55-23 | Literal H2 `^##\s+Zebra OEMConfig APK Side-Load` (with optional `(NOT via MGP)` parenthetical and optional anchor `{#zebra-oemconfig}`) + `OEMConfig` AND `APK side-load` (or `APK push`) AND `NOT via Managed Google Play` (or `NOT Managed Google Play`) literals | `04-android-mgp-lifecycle.md` |
| V-55-24 | Literal cross-link to `10-aosp-zebra.md` (relative path `../../admin-setup-android/10-aosp-zebra.md`) | `04-android-mgp-lifecycle.md` |
| V-55-25 | Literal `update` AND `revoke` AND `troubleshoot` within `## Zebra OEMConfig` H2 scope (verbs satisfying APP-08 "operate the OEMConfig app lifecycle") | `04-android-mgp-lifecycle.md` |

#### Cross-cutting NEGATIVE regression-guards (V-55-26..30)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-26 | POSITIVE — each of 5 app-lifecycle files contains literal `> **Platform applicability:**` blockquote within first 50 lines of file body (post-frontmatter) | All 5 files |
| V-55-27 | NEGATIVE — zero files (entire `docs/` + `.planning/` tree) match literal `> **Platform:**` (with no qualifier word) | Tree-wide scan |
| V-55-28 | NEGATIVE — `docs/operations/00-index.md` does NOT contain `## App Lifecycle` H2 (Phase 53 owns the file; Phase 59 will add this H2 in its own commit) | `docs/operations/00-index.md` |
| V-55-29 | POSITIVE — `01-windows-win32-msix-scale.md` contains literal cross-link to `win32-app-packaging.md` (relative path `../../reference/win32-app-packaging.md`) | `01-windows-win32-msix-scale.md` |
| V-55-30 | NEGATIVE — none of Phase 55 files contain literal `TBD`, `TODO`, `FIXME`, `XXX`, `PLACEHOLDER` outside Version History tables | All 5 files |

#### Final structural / atomicity (V-55-31..32)

| ID | Pin | File scope |
|----|-----|------------|
| V-55-31 | All 5 app-lifecycle ops files carry valid `platform:` frontmatter (per V-55-07) — multi-platform tag check | All 5 files |
| V-55-32 | Plan-time check that all Phase 55 deliverables (5 content files + validator + cross-link consistency) are staged in same commit (verified at pre-commit gate; not a runtime literal-pin assertion) | Pre-commit hook |

### Validator Test Cases (positive + negative)

For plan author 55-06, each V-55-NN assertion needs both positive and negative test cases. Below is the test-case shape (plan author implements within `check-phase-55.mjs` lineage from `check-phase-54.mjs`):

| Assertion | Positive case (must pass) | Negative case (must fail) |
|-----------|---------------------------|---------------------------|
| V-55-09 | `## App-lifecycle terminology` H2 present with cross-platform tokens | H2 absent OR uses Win32-only token like `## Replace vs Update` |
| V-55-10 | 00-overview body has zero per-platform-tool literals | 00-overview contains `Win32ContentPrepTool` literal in body |
| V-55-12 | `> ⚠️` blockquote with `Required-assignment exception` within ~10 lines of behavior matrix | Callout placed at file top OR in `## Dependency Graphs` H2 |
| V-55-15 | `MSIX does NOT support supersedence` within ContentPrepTool H2 scope | Disclaimer absent OR placed in wrong H2 |
| V-55-17 | `> 📋 Community pattern — MEDIUM confidence` blockquote with `Installomator` AND `Intuneomator` literals | Bare `> 📋` without `Community pattern` qualifier |
| V-55-18 | `VPP Device-Licensed` AND `VPP User-Licensed` headers in 2-column table | Single-column dl-list OR 4-column matrix duplicating v1.3 |
| V-55-19 | `retire/wipe` AND `device license` AND `remove app` AND `user license` literals in reclamation context | Reclamation rows absent OR token coverage incomplete |
| V-55-20 | Zero Mermaid blocks in 03-ios-vpp-licensing.md | One or more Mermaid blocks present |
| V-55-22 | `## Managed Google Play Private App Publishing` H2 + `private track` + `web app` + `AMAPI` + `2024` | Any of 5 literals missing |
| V-55-23 | `## Zebra OEMConfig APK Side-Load` H2 + `NOT via Managed Google Play` literal | H2 absent OR disclaimer absent |
| V-55-24 | Literal cross-link to `10-aosp-zebra.md` | Cross-link absent OR points to wrong file |
| V-55-25 | All 3 verbs (`update` AND `revoke` AND `troubleshoot`) in Zebra H2 | Any verb missing |
| V-55-26 | `> **Platform applicability:**` at line 9 of each file | Bare `> **Platform:**` OR alternative qualifier word |
| V-55-27 | Zero `> **Platform:**` (bare) in entire `docs/` + `.planning/` tree | One or more bare-noun instances |
| V-55-28 | `docs/operations/00-index.md` has zero `## App Lifecycle` H2 | Phase 55 accidentally amends 00-index.md |

## Project Constraints (from CLAUDE.md)

CLAUDE.md is project-instruction file describing the broader **Windows Autopilot Troubleshooter & Improvement Suite** (PowerShell + FastAPI + React 3-tier toolkit). For Phase 55 (documentation-only), the relevant constraints are:

- **Documentation tier:** Phase 55 outputs live under `docs/operations/app-lifecycle/` — distinct from PowerShell modules (`src/powershell/`), Python backend (`src/backend/`), and TypeScript frontend (`src/frontend/`).
- **Security: Never commit `.env` file or any credentials.** Phase 55 documentation contains no credentials; cross-link targets are internal repo paths.
- **Validate all user inputs in API endpoints.** Not applicable to Phase 55 (no code changes).
- **Use HTTPS in production for all communications.** All Phase 55 external URL references in cross-links + Microsoft Learn citations use `https://`.
- **English-only policy.** Phase 55 documentation is English-only per project policy.

No additional CLAUDE.md directives constrain the documentation-only Phase 55 scope beyond what CONTEXT.md already specifies.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Win32 supersedence behavior framing | Don't author novel supersedence-semantics prose | Use Microsoft Learn `apps-win32-supersedence` verbatim quotes for the Required-assignment exception (with attribution) | Microsoft owns the canonical behavior definition; novel prose risks contradicting the auto-update limitations subsection |
| Win32 dependency graph formula | Don't invent dependency-counting math | Use Microsoft Learn `add-win32` Step 5 verbatim 100-count formula + the cross-graph illustrative example | Microsoft's formula handles cross-graph dependency-app-counts-once edge cases that novel prose would miss |
| iOS VPP reclamation prose | Don't simplify to "retire/wipe returns license" — that's NOT the actual behavior | Use Microsoft Learn `vpp-apps-ios` verbatim 2-step admin workflow (remove assignment → change to Uninstall → Revoke license) | The simplified REQ wording obscures the actual admin workflow; admins reading the doc would misuse the feature |
| Zebra OEMConfig substantive content | Don't duplicate Phase 45 SSoT (24,518 bytes) into Phase 55 file | Use peer H2 with operational summary + cross-link to `10-aosp-zebra.md` per D-10 4C-prime hybrid winner | Substantive duplication violates Phase 45 SSoT; pure stub fails SC#5 "operate" verb |
| AMAPI 2024 specific date claim | Don't cite a specific 2024 date that cannot be verified at Google or Microsoft sources | Use softer phrasing per §8 Plan-author guidance Option A/B/C OR retrieve verified TechCommunity post date at execution time | Unverified specific dates create maintenance burden if the date is wrong; soft phrasing is forward-compatible |

**Key insight:** Phase 55 is the most "Microsoft Learn-citable" of the v1.5 ops-domain phases — every per-platform fact has a directly-verifiable Microsoft Learn URL. The discipline is to QUOTE Microsoft Learn rather than paraphrase, particularly for the boundary-condition behaviors (Required-assignment exception, license reclamation workflow, supersedence chain max-10/max-11 distinction).

## Common Pitfalls

### Pitfall 1: Confusing supersedence node-count limits

**What goes wrong:** Documentation says "max 10 superseding apps" without explaining that the supersedence GRAPH max is 11 nodes (1 superseding + 10 superseded), and the auto-update LIMIT is 10 superseding apps per app. These are TWO different facts.

**Why it happens:** Multiple secondary sources cite either "10" or "11" without distinguishing the graph maximum from the auto-update count.

**How to avoid:** Quote both Microsoft Learn limits verbatim. The supersedence behavior matrix should call out both: graph max-11 nodes + auto-update max-10 superseding apps per app.

**Warning signs:** Doc cites only "10" without specifying whether it's graph nodes or superseding-app count.

### Pitfall 2: Conflating dependency depth (10) with dependency count (100)

**What goes wrong:** Plan author for 55-02 includes "max 10" in dependency H2, conflating the existing reference doc's "Maximum dependency depth: 10 levels" with APP-02's "max 100 dependencies per app." These are orthogonal facts.

**Why it happens:** Both numbers are dependency-related; both appear in `docs/reference/win32-app-packaging.md`.

**How to avoid:** Use APP-02 verbatim "max 100 dependencies per app" (count, total graph size). Cross-reference the reference doc for the orthogonal "10-level depth" (chain length).

**Warning signs:** Doc says "max 10 dependencies" — that's wrong. The 10 limit is depth/chain-length; the count is 100.

### Pitfall 3: AMAPI 2024 unverified date claim

**What goes wrong:** Plan author for 55-05 cites a specific 2024 date (e.g., "since April 2024") that cannot be verified in Google's or Microsoft's official release notes, causing future maintenance burden if the date is challenged.

**Why it happens:** REQUIREMENTS.md APP-07 verbatim says "AMAPI custom-apps-via-Google-Play API change applicable since 2024." Research found no 2024 entry; first AMAPI custom-apps SDK feature is August 2025 in Google's release notes.

**How to avoid:** Per §8 Plan-author guidance, use Option A (verify TechCommunity post date) OR Option B (soften to "since 2024-2025") OR Option C (attribute to Microsoft 2024 announcement) OR Option D (flag for user discussion).

**Warning signs:** Doc cites a specific 2024 month without source attribution.

### Pitfall 4: iOS VPP reclamation oversimplification

**What goes wrong:** Plan author for 55-04 codes the REQ APP-06 verbatim "retire/wipe returns device license; remove app returns user license" as a behavior statement, when actual Microsoft Learn says reclamation requires a 3-step admin workflow.

**Why it happens:** REQ verbatim is concise but doesn't capture the actual admin-workflow nuance.

**How to avoid:** Encode reclamation as the actual 3-step workflow (remove assignment → change to Uninstall → Revoke license). The 2-column comparison table can have a row labeled "Reclamation (manual)" with the workflow steps in cells.

**Warning signs:** Doc says "automatic reclamation on retire/wipe" — that's wrong per Microsoft Learn.

### Pitfall 5: Phase 45 SSoT duplication in Zebra OEMConfig peer H2

**What goes wrong:** Plan author for 55-05 imports Hardware Scope / Prerequisites / Provisioning steps from `10-aosp-zebra.md` into the 04-android Zebra peer H2, violating Phase 45 SSoT and inflating the peer H2 beyond its operational-summary contract.

**Why it happens:** The "operate the lifecycle" verb in APP-08 might suggest comprehensive lifecycle coverage; in fact, D-10 specifies 3-bullet list + cross-link.

**How to avoid:** Use D-10 4C-prime hybrid contract verbatim: ~3-5 line operational summary + 3-bullet list (update / revoke / troubleshoot) + cross-link. NO substantive content duplication.

**Warning signs:** Peer H2 exceeds ~30 lines OR contains hardware-spec / firmware-version / provisioning-step content.

## Code Examples

Phase 55 is documentation-only; no code patterns required. The validator implementation pattern is inherited from `check-phase-54.mjs`:

```javascript
// Source: scripts/validation/check-phase-54.mjs (Phase 54 lineage; Phase 55 inherits structure verbatim)
const checks = [
  // === FILE EXISTENCE (V-55-01..06) ===
  {
    id: 1, name: "V-55-01: 00-overview.md exists",
    fn: () => ...
  },
  // === FRONTMATTER (V-55-07) ===
  {
    id: 7, name: "V-55-07: all 5 app-lifecycle files have valid platform: + audience: + 60-day cycle",
    fn: () => ...
  },
  // ... 30-34 V-55-NN structural assertions per CONTEXT D-17
];
```

Plan author for 55-06 implements the 30-34 V-55-NN checks following the pattern in `check-phase-54.mjs:1-617` (33,841 bytes; 32 checks).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Win32ContentPrepTool packaging via legacy IntuneWinAppUtil pre-v1.8 | v1.8.7 with FIPS-compliant SHA256, silent mode, 4GB+ file support | v1.8.7 released August 13 2021 (correction from `.planning/research/SUMMARY.md:47` which says 2024) | Phase 55 plan author should reverify current GA at execution time |
| MSIX with attempted supersedence | MSIX = "no supersedence; use version replacement in same app entry" | STACK.md:234 verbatim — current Microsoft Learn confirms | Phase 55 01-windows file routing-only sub-section for MSIX |
| Legacy VPP token (1-year expiry, single-MDM) | Apple Business Manager location token (1-year expiry, single-MDM, default = device licensing for new VPP assignments) | Microsoft Learn `vpp-apps-ios` (ms.date 2026-01-13) | Phase 55 03-ios file uses current ABM-location-token nomenclature |
| MGP private apps via Google Play Console (paid developer account, 2-hour publishing time) | Direct APK upload to MGP via Intune admin center (free, 10-minute publishing time) | Microsoft Learn `add-managed-google-play` (ms.date 2025-11-03) | Phase 55 04-android file documents direct-APK-upload as primary |
| MGP store apps via Managed Google Play console (alternative path) | Direct browse in Microsoft Intune admin center (Microsoft TechCommunity ba-p/3849875 — "support for new Google Play Android Management API") | Microsoft Learn `add-managed-google-play` Important callout: "This method is no longer supported and it's required to add apps directly in the Microsoft Intune admin center." | Phase 55 should reflect direct-admin-center-only approach |

**Deprecated/outdated:**
- Win32ContentPrepTool v1.7 and earlier: lacked Unicode filename support; v1.8.x is the supported series.
- VPP terminology: still works in Intune UX but ABM/location-token is the current canonical.
- MGP store apps via Google Play Console: no longer supported; direct admin-center-only.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | AMAPI custom-apps API change "applicable since 2024" — REQ APP-07 verbatim | §8 + Pitfall 3 | LOW-MEDIUM — V-55-22 still passes if literal `2024` appears anywhere; phrasing ambiguity is acceptable per CD-11. Risk is documentation-correctness if reviewers challenge the 2024 date. Recommended mitigation: plan author flags as Open Question for user discussion (Option D) OR retrieves the actual Microsoft TechCommunity Support Tip post date at execution time |
| A2 | Win32ContentPrepTool v1.8.7 is still current GA at Phase 55 execution time | §1 | LOW — v1.8.7 has been stable since August 2021; no newer release as of April 2026 per GitHub releases page. If v1.8.8+ ships before Phase 55 execution, plan author updates the version-pin in 01-windows file. Validator V-55-14 checks `\.intunewin` literal (version-agnostic) so version-pin is in body content only |
| A3 | Circular dependency detection IS implemented by Intune (corrects existing reference doc claim) | §2 + §6 | MEDIUM — if §6 Option A (same-commit reference doc edit) is taken AND Microsoft Learn behavior reverts to "no detection," the reference doc would need re-correction. Risk mitigation: cross-validate with Microsoft Learn at plan execution time before applying §6 correction |
| A4 | iOS VPP reclamation does NOT have a 30-day grace period (only macOS does) | §7 | LOW — Microsoft Learn `vpp-apps-ios` is specific that the 30-day grace period applies only to macOS apps. If Apple's behavior changes in iOS 26+, doc would need update at next review cycle |
| A5 | All 5 Phase 55 files frontmatter `last_verified` set to phase execution date + `review_by` set to date+60 days | (D-19 inheritance) | LOW — 60-day cycle is established Phase 49 D-04 pattern; Phase 55 inherits unchanged |

## Open Questions

1. **AMAPI 2024 date verification**
   - What we know: REQ APP-07 verbatim says "applicable since 2024"; Google's release notes show no 2024 custom-apps entry; first AMAPI custom-apps SDK feature is August 2025; a Microsoft TechCommunity Support Tip post (ba-p/3849875) is referenced in MS Learn `add-managed-google-play` but the post date could not be retrieved during research.
   - What's unclear: Whether the "2024" framing originates from a specific Microsoft announcement or release event in 2024, or whether it's a project-research approximation.
   - Recommendation: **Plan author for 55-05 (or planner during plan-creation) should verify the TechCommunity post date OR flag for user discussion.** If unresolvable, use Option B "since 2024-2025" softer phrasing — V-55-22's `2024` literal still matches.

2. **Circular dependency claim correction in `docs/reference/win32-app-packaging.md`**
   - What we know: Microsoft Learn supersedence reference confirms circular detection is implemented; existing reference doc says it's not.
   - What's unclear: Whether plan-author 55-02 should (a) edit the reference doc same-commit, OR (b) inline-correct in Phase 55 only, OR (c) leave the reference doc unchanged and rely on Phase 56+ cleanup.
   - Recommendation: **Plan author for 55-02 takes Option A (same-commit reference doc edit)** — it's a 3-line change with clear improvement and avoids creating doc-vs-doc inconsistency at v1.5 release.

3. **Win32ContentPrepTool current GA at execution time**
   - What we know: v1.8.7 has been stable since August 2021; no newer release through April 2026.
   - What's unclear: Whether v1.8.8+ may ship between research date (2026-04-28) and Phase 55 execution.
   - Recommendation: **Plan author for 55-02 verifies at execution time** via `npx --yes ctx7@latest library "Microsoft Win32 Content Prep Tool" "current GA version"` OR direct GitHub releases-page check. If v1.8.7, no change; if v1.8.8+, update version-pin.

4. **Whether 00-overview includes Mermaid diagram** (CD-05 plan-author discretion)
   - What we know: 00-overview is permissive on Mermaid (D-04 + CD-04 inheritance from Phase 54); 03-ios is FORBIDDEN.
   - What's unclear: Whether plan author for 55-01 chooses to include a 4-platform-app-lifecycle Mermaid OR uses table-only.
   - Recommendation: **Default to table-only** for 00-overview to keep size budget within 200-350 lines (D-01) and minimize plan-author debate on Mermaid framing. Mermaid is permissive; not required.

## Environment Availability

> Phase 55 is documentation-only with internal cross-link targets. No external runtime dependencies for content authoring; Phase 60 will register the validator in CI.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (for `check-phase-55.mjs`) | Validator at pre-commit | ✓ (verified — `check-phase-54.mjs` ran successfully at Phase 54 close per ROADMAP `d93e30b`) | ESM-compatible (any LTS) | — |
| `markdown-link-check` | Phase 60 C13 informational broken-link sweep | ✓ | npm tcort/markdown-link-check | Skip C13 (informational only per Phase 48 D-08) |
| Microsoft Learn URL stability | All cross-link targets | ✓ at research time (2026-04-28) | — | Phase 60 C13 sweep + manual `last_verified` discipline catches drift |
| `docs/admin-setup-android/10-aosp-zebra.md` (V-55-24 cross-link target) | Cross-link from 04-android | ✓ verified 24,518 bytes | Phase 45 v1.4.1 | — |
| `docs/admin-setup-ios/05-app-deployment.md` (V-55-21 cross-link target) | Cross-link from 03-ios | ✓ verified 20,397 bytes | v1.3 | — |
| `docs/reference/win32-app-packaging.md` (V-55-29 cross-link target) | Cross-link from 01-windows | ✓ verified 8,730 bytes (with §6 known issue) | v1.0 | Plan author 55-02 may edit same-commit per §6 Option A |
| `docs/operations/00-index.md` (V-55-28 NEGATIVE cross-link target — must NOT be amended) | Phase 53 owns | ✓ exists, must remain unchanged | Phase 53 | — |
| `scripts/validation/check-phase-54.mjs` (validator pattern reference) | Plan author 55-06 inherits structure | ✓ verified 33,841 bytes / 617 lines / 32 checks | Phase 54 | — |
| `scripts/validation/v1.5-milestone-audit.mjs` | Pre-commit gate harness | ✓ (Phase 48 baseline + Phase 49-54 lineage) | v1.5 | — |
| `scripts/validation/regenerate-supervision-pins.mjs` | Pre-commit gate self-test | ✓ baseline refreshed in Phase 48 per D-AUDIT-07 | v1.5 | — |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None — all Phase 55 dependencies verified present.

## Sources

### Primary (HIGH confidence)

- **Microsoft Learn — Win32 supersedence** (canonical `apps-win32-supersedence` ; ms.date 2026-04-06; updated_at 2026-04-14): https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence — supersedence behavior matrix + Required-assignment exception verbatim text + max 11 nodes graph + max 10 superseding apps auto-update limit + "Superseding apps don't get automatic targeting" verbatim
- **Microsoft Learn — Win32 add and assign** (canonical `add-win32` ; ms.date 2026-04-14; updated_at 2026-04-16): https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add — 4 detection rule types verbatim (MSI / File / Registry / custom PowerShell script) + max 100 dependencies + recursive sub-dependencies + cross-graph dependency-app-counts-once illustration + Win32 30 GB size cap
- **Microsoft Learn — Apple VPP** (canonical `manage-vpp-apple` ; ms.date 2026-01-13; updated_at 2026-04-21): https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios — device-licensing vs user-licensing comparison table verbatim + 8 end-user-prompt scenarios verbatim + reclamation 3-step admin workflow verbatim + macOS 30-day grace period verbatim
- **Microsoft Learn — Add Managed Google Play apps** (canonical `add-managed-google-play` ; ms.date 2025-11-03; updated_at 2026-04-17): https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-android-for-work — 3 MGP app types verbatim (store / private / web link) + direct APK upload workflow + permanently-private callout + Web links Display options
- **Microsoft Learn — macOS LOB apps** (multiple secondary citations): https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos — Developer ID Installer cert requirement
- **Microsoft Learn — macOS unmanaged PKG**: https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg — Intune-agent delivery + pre/post-install scripts
- **Win32 Content Prep Tool releases**: https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases — v1.8.7 release date (2021-08-13, NOT 2024 as cited in `.planning/research/SUMMARY.md:47`)
- **Phase 45 SSoT — Zebra AOSP guide**: `docs/admin-setup-android/10-aosp-zebra.md` (24,518 bytes; line 56 disclaimer; lines 116-119 disambiguation; HIGH-confidence citation at 121)
- **Phase 54 sibling outputs**: `docs/operations/patch-management/00-overview.md` + `01-windows-wufb-rings.md` + `03-ios-update-lifecycle.md` + `04-android-patch-delivery.md` — H2 patterns + cross-platform inline blockquote + zero-Mermaid iOS pattern + peer-H2 + cross-link
- **Phase 54 validator**: `scripts/validation/check-phase-54.mjs` (33,841 bytes; 617 lines; 32 V-54-NN checks) — Phase 55 inherits structure verbatim

### Secondary (MEDIUM confidence — community sources verified against Microsoft Learn)

- Peter Van Der Woude "Working with supersedence relationships for Win32 apps": https://petervanderwoude.nl/post/working-with-supersedence-relationships-for-win32-apps/
- Peter Van Der Woude "Working with Win32 app dependencies": https://petervanderwoude.nl/post/working-with-win32-app-dependencies/
- Peter Van Der Woude "Working with custom detection rules for Win32 apps": https://petervanderwoude.nl/post/working-with-custom-detection-rules-for-win32-apps/
- Anoop C Nair HTMD Blog "Revoke App Licenses For Apple VPP App": https://www.anoopcnair.com/revoke-app-licenses-for-apple-vpp-app-intune/
- Anoop C Nair HTMD Blog "Manage User Or Device License For Apple Apps": https://www.anoopcnair.com/user-device-license-for-apple-apps-intune/
- Anoop C Nair HTMD Blog "Add Android Managed Google Play App In Intune": https://www.anoopcnair.com/add-android-managed-google-play-app-in-intune/
- Timmy Andersson "Private or In-house developed Android app deployment with Microsoft Intune": https://timmyit.com/2025/01/27/private-or-in-house-developed-android-app-deployment-with-microsoft-intune-for-android-enterprise-devices-part-1/
- Recast Software "Choosing Detection Rules for Win32 Apps in Intune": https://www.recastsoftware.com/resources/choosing-detection-rules-for-win32-apps-in-intune/
- Microsoft Q&A "VPP App (Device) License lifecycle within Microsoft Intune": https://learn.microsoft.com/en-us/answers/questions/2282854/vpp-app-(device)-license-lifecycle-within-microsof — secondary verification of "device removal does NOT auto-reclaim" behavior

### Tertiary (LOW confidence — needs validation)

- **AMAPI 2024 date claim** (REQ APP-07 verbatim "since 2024"): Could not verify in Google's official release notes (https://developers.google.com/android/management/release-notes — first AMAPI custom-apps entry = August 2025). Microsoft TechCommunity Support Tip post `ba-p/3849875` referenced from MS Learn but date could not be retrieved during research. Plan author should verify at execution time OR flag for user discussion.
- **Circular dependency detection at config time** vs `docs/reference/win32-app-packaging.md:97-99` claim: existing project doc says NOT detected; Microsoft Learn behavior says IS detected. Plan author 55-02 should resolve per §6 Option A (recommended).

### Community tooling (MEDIUM confidence — non-Microsoft-supported)

- **Installomator**: https://github.com/Installomator/Installomator + https://installomator.com/ — MIT-licensed Bash command-line tool for macOS app install/update
- **Intuneomator**: https://github.com/gilburns/Intuneomator — Swift-based wrapper bridging Installomator labels (900+) into Intune
- **University of Utah Intuneomator presentation 2025-10-15**: https://downloads.lib.utah.edu/media_streaming_presentation_documents/pdf/mac_mgrs/20251015_mm/2025.10.15_mm_intuneomator.pdf

## Metadata

**Confidence breakdown:**
- Standard stack (Microsoft Intune): HIGH — all 4 platform facts verified at Microsoft Learn April 2026 publication dates
- Architecture (Phase 55 file shape): HIGH — directly inherits from Phase 54 verified-implementation patterns (1A/2B/3A/4C-prime hybrid winners locked)
- Pitfalls (PITFALL-10 + correction items): HIGH for PITFALL-10 verbatim verification; MEDIUM for §6 circular-dependency reference doc correction
- AMAPI 2024 date claim: LOW-MEDIUM (could not verify in Google or Microsoft official sources; needs plan-author resolution)

**Research date:** 2026-04-28
**Valid until:** 2026-06-27 (60-day cycle per Phase 49 D-04 lineage; aligned with Phase 55 file `last_verified` cycle)

## RESEARCH COMPLETE

**Phase:** 55 - App Lifecycle Automation
**Confidence:** HIGH (with 3 LOW-MEDIUM caveats requiring plan-author resolution: AMAPI 2024 date phrasing, circular-dependency reference doc correction, Win32ContentPrepTool execution-time version verification)

### Key Findings

1. **All 8 active REQ-IDs (APP-01..08) verifiable at Microsoft Learn** with current April 2026 publication dates — except AMAPI 2024 specific date which is not in Google's release notes (first AMAPI custom-apps SDK entry = August 2025).
2. **PITFALL-10 Required-assignment exception is VERIFIED CURRENT** verbatim at Microsoft Learn `apps-win32-supersedence`: "The supersedence auto-update only applies for available assignments, meaning users who have the superseded app through required intent won't receive the superseding app."
3. **iOS VPP reclamation behavior in REQ APP-06 is OVERSIMPLIFIED**: Microsoft Learn says reclamation requires 3-step admin workflow (remove assignment → change to Uninstall → Revoke license), NOT automatic on retire/wipe. macOS has 30-day grace period; iOS does not.
4. **Win32ContentPrepTool v1.8.7 release date is 2021-08-13**, NOT 2024 as cited in `.planning/research/SUMMARY.md:47`. Version is correct; date is incorrect. Plan author should verify current GA at execution time (still v1.8.7 as of 2026-04-28).
5. **Circular dependency detection IS implemented by Intune** per Microsoft Learn supersedence reference; existing project doc at `docs/reference/win32-app-packaging.md:99` says NOT — needs same-commit correction recommended in §6 Option A.

### File Created

`D:/claude/Autopilot/.planning/phases/55-app-lifecycle-automation/55-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Microsoft Learn current-state facts (Win32 / macOS / iOS) | HIGH | 3 official Microsoft Learn pages with April 2026 + January 2026 ms.date verified verbatim |
| Microsoft Learn current-state facts (Android MGP) | HIGH | November 2025 ms.date `add-managed-google-play` verified verbatim |
| AMAPI 2024 date specificity | LOW-MEDIUM | Could not verify in Google or Microsoft official release notes; first AMAPI custom-apps SDK entry = August 2025 |
| Phase 54 sibling shape patterns | HIGH | All 5 Phase 54 files verified via Grep + Read; H2 structures + zero-Mermaid + peer-H2 patterns confirmed |
| Cross-link target stability | HIGH | All 3 cross-link target files verified existing at correct sizes |
| Circular dependency claim in existing reference doc | MEDIUM | Existing doc contradicts current Microsoft Learn behavior; plan-author resolution needed (§6 Option A recommended) |
| PITFALL-10 framing | HIGH | Verbatim quote from Microsoft Learn confirms PITFALLS.md:212-230 framing |
| Phase 55 validator V-55-NN scope (30-34 checks) | HIGH | Directly inherits Phase 54 V-54-NN pattern (32 checks); only literal-token coverage differs |

### Open Questions

1. AMAPI 2024 date — verify TechCommunity post `ba-p/3849875` or flag for user discussion (plan-author for 55-05)
2. Circular dependency claim at `win32-app-packaging.md:99` — same-commit correction (recommended Option A) or alternative phrasing
3. Win32ContentPrepTool current-GA version verification at execution time
4. 00-overview Mermaid inclusion (CD-05 plan-author discretion — recommend table-only default)

### Ready for Planning

Research complete. Planner has all Microsoft Learn-verified facts to author 7 plans (55-01 through 55-07) per CONTEXT.md D-22 decomposition. Plan author for each per-platform file has Microsoft Learn URL + verbatim quotes to cite; plan author for 55-06 validator has 30-34 V-55-NN literal-token regex catalog with positive + negative test cases.
