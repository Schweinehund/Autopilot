# Phase 20: Cross-Platform Foundation - Research

**Researched:** 2026-04-13
**Domain:** Documentation infrastructure — cross-platform terminology, templates, navigation, and taxonomy for Windows Autopilot + macOS ADE
**Confidence:** HIGH

## Summary

Phase 20 is a documentation infrastructure phase that creates the shared foundation (glossary, comparison page, template, navigation restructure, frontmatter taxonomy) on which all subsequent macOS content (Phases 22-25) and new Windows content (Phase 21) will build. No code changes are involved — all deliverables are Markdown files following patterns already established in v1.0 and v1.1.

The existing codebase has 70 Markdown files in `docs/` with a well-established pattern: YAML frontmatter (`last_verified`, `review_by`, `applies_to`, `audience`), version gate callouts, cross-reference linking via `_glossary.md#anchor`, and three templates (L1, L2, admin). Every pattern needed for Phase 20 has a direct precedent in the existing repo. The primary research task was verifying macOS ADE terminology accuracy against current Microsoft Learn and Apple documentation.

**Primary recommendation:** Follow existing file patterns exactly. The comparison page mirrors `apv1-vs-apv2.md`, the macOS glossary mirrors `_glossary.md`, the macOS admin template adapts from `admin-template.md`, index.md gets in-place restructuring with new platform headings, and the `platform:` frontmatter field is added to templates and new files only (no retroactive edits).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Use a single feature table format, matching the existing `docs/apv1-vs-apv2.md` pattern. Concept rows map Windows Autopilot terms to macOS ADE equivalents without implying false equivalence — "N/A" or descriptive text where concepts are platform-exclusive.
- **D-02:** Add a short "Diagnostic Tools" subsection below the main comparison table for tool/command comparisons that don't fit table cells (e.g., `mdmdiagnosticstool.exe` vs `sudo profiles show`). This avoids bloating the table while covering the XPLAT-01 requirement for diagnostic tool mapping.
- **D-03:** Scope the comparison to terminology, enrollment mechanisms, provisioning stages, and diagnostic tools. Do NOT duplicate the feature parity matrix (MADM-06, Phase 23) which covers Intune capability gaps.
- **D-04:** Create a separate `docs/_glossary-macos.md` file for macOS-specific terms (ADE, ABM, Setup Assistant, Await Configuration, VPP, ABM token). Do NOT intersperse macOS terms into the existing `docs/_glossary.md`.
- **D-05:** Each glossary file cross-links to the other using standard Markdown links (same mechanism as the existing 98 cross-file glossary references). Add a header banner in each file directing users to the other platform's glossary.
- **D-06:** The macOS glossary follows the same structural pattern as the Windows glossary: frontmatter, alphabetical index, semantic categories, and bidirectional cross-reference callouts (e.g., `> **Windows equivalent:** [ESP](_glossary.md#esp)`).
- **D-07:** Keep everything in a single `docs/index.md` file. Add `## Windows Autopilot` and `## macOS Provisioning` platform headings. Existing role-based tables (L1-APv1, L1-APv2, L2-APv1, L2-APv2, Admin) move under the Windows heading without changing their heading text (preserves all existing anchor slugs).
- **D-08:** Add a "Choose Your Platform" anchor-link section at the very top of the page, above the platform headings. This satisfies the NAVX-01 "platform selector above role-based routing" requirement.
- **D-09:** Change the H1 title from "Windows Autopilot Documentation" to a platform-neutral title (e.g., "Device Provisioning Documentation" or "Autopilot & macOS ADE Documentation").
- **D-10:** macOS sections under `## macOS Provisioning` will have 3 role-based sub-sections (L1, L2, Admin) with no framework split (macOS has only ADE, no APv1/APv2 equivalent). This structural asymmetry between platforms is intentional and reflects the domain.
- **D-11:** Create a new `docs/_templates/admin-template-macos.md` as a separate file — moderate divergence from the Windows template. Do NOT use a shared base + extensions pattern (Markdown has no inheritance enforcement).
- **D-12:** Steps section uses portal-scoped sub-sections: `#### In Apple Business Manager` and `#### In Intune admin center` within each step, reflecting the genuine dual-portal workflow macOS admins perform.
- **D-13:** "What breaks if misconfigured" callouts include cross-portal symptom visibility — specify which portal the misconfiguration occurs in AND where the symptom manifests (may be different portals).
- **D-14:** Configuration-Caused Failures table adds a "Portal" column: `Misconfiguration | Portal | Symptom | Runbook`.
- **D-15:** Comment block updated for macOS: "Include full navigation paths for both ABM and Intune admin center portals" and "Reviewer: macOS Platform Lead" (or equivalent role).
- **D-16:** Version gate pattern reused for platform disambiguation: "This guide covers macOS ADE via ABM. For Windows Autopilot, see [link]."
- **D-17:** Runbook links use placeholder format (`[TBD - Phase 24]`) since macOS troubleshooting runbooks (MTRO-01 through MTRO-04) are created in Phase 24.
- **D-18:** Renewal/Maintenance section scope: include only when the guide's subject has a renewable component (ADE token, APNs certificate). Otherwise omit the section. Authors decide per-guide, not per-template.
- **D-19:** Add `platform:` field to frontmatter supporting values: `Windows`, `macOS`, `all`. Existing docs default to `Windows` without retroactive edits (per STATE.md decision). New cross-platform docs (glossary, comparison page, index) use `platform: all`.
- **D-20:** The `applies_to:` field retains its existing meaning (APv1/APv2/both) for Windows framework disambiguation. The new `platform:` field is a separate, orthogonal dimension.

### Claude's Discretion
- Exact wording for the H1 title change in index.md
- Semantic category names for the macOS glossary (can mirror Windows categories where they apply, or create macOS-specific ones)
- Ordering of rows in the platform comparison table
- Whether to include a brief introductory paragraph in the comparison page before the table

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| XPLAT-01 | Platform-comparison page mapping Windows Autopilot concepts to macOS ADE equivalents (terminology, enrollment mechanisms, diagnostic tools) | Verified terminology mapping via Microsoft Learn ADE docs and Apple Business Manager docs. Comparison table format proven in `apv1-vs-apv2.md`. Diagnostic tool pairs confirmed: `mdmdiagnosticstool.exe` vs `sudo profiles show` / IntuneMacODC. |
| XPLAT-02 | Glossary expanded with macOS-specific terms (ADE, ABM, Setup Assistant, Await Configuration, VPP, ABM token) with bidirectional cross-references | All 6 macOS terms verified against current Microsoft Learn and Apple documentation. Cross-reference pattern proven in existing glossary (98 references across 33 docs). |
| XPLAT-03 | macOS admin guide template with dual-portal references (ABM + Intune admin center) and Setup Assistant replacing ESP | macOS ADE admin workflow verified: genuinely dual-portal (ABM for token/device assignment, Intune admin center for enrollment profiles/policies). Setup Assistant screens documented in Microsoft Learn. |
| XPLAT-04 | Frontmatter taxonomy extended with `platform:` field (Windows/macOS/all) without breaking existing docs | Existing frontmatter uses `applies_to` for framework (APv1/APv2/both). New `platform:` field is orthogonal. No retroactive edits needed per STATE.md decision. |
| NAVX-01 | Platform-first index.md restructure with platform selector above role-based routing | Existing `index.md` structure understood (88 lines, 6 sections). Restructure adds platform headings above existing sections. Anchor slugs preserved by not changing existing heading text. |
</phase_requirements>

## Standard Stack

This phase produces only Markdown documentation files. No libraries, packages, or build tools are involved.

### Core
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown | CommonMark | All documentation files | Established format for all 70 existing docs |
| YAML frontmatter | N/A | Document metadata (last_verified, review_by, applies_to, audience, platform) | Standard pattern in all existing docs |

### Supporting
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Git | Current | Version control for doc changes | Every file creation/modification |

### Alternatives Considered
None. This is a documentation phase with no technology decisions to make.

## Architecture Patterns

### Existing File Structure (Phase 20 additions marked with +)
```
docs/
+-- windows-vs-macos.md           # XPLAT-01: Platform comparison page
+-- _glossary-macos.md            # XPLAT-02: macOS glossary (parallel to _glossary.md)
+-- _templates/
|   +-- admin-template-macos.md   # XPLAT-03: macOS admin template
|-- _templates/
|   |-- admin-template.md         # Existing (Windows) — no changes
|   |-- l1-template.md            # Existing — no changes
|   |-- l2-template.md            # Existing — no changes
|-- _glossary.md                  # Existing — add banner linking to macOS glossary
|-- index.md                      # Existing — restructure with platform headings
|-- apv1-vs-apv2.md               # Existing — pattern to replicate for comparison
|-- [65 other existing files]     # No changes
```

### Pattern 1: Platform Comparison Table (XPLAT-01)
**What:** A single Markdown table mapping concepts between Windows Autopilot and macOS ADE, followed by a "Diagnostic Tools" subsection for tool/command comparisons.
**When to use:** Any time two platforms need concept-level comparison.
**Example:**
```markdown
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This page maps Windows Autopilot concepts to macOS ADE equivalents.
> It covers terminology and enrollment mechanisms, not Intune feature parity (see [Feature Parity Matrix](TBD - Phase 23)).

# Windows Autopilot vs macOS ADE: Concept Comparison

[Introductory paragraph explaining purpose]

## Concept Comparison

| Concept | Windows Autopilot | macOS ADE | Notes |
|---------|-------------------|-----------|-------|
| Device registration portal | Intune admin center (hardware hash upload) | Apple Business Manager (device assignment) | Windows uses hardware hash; macOS uses serial number via ABM |
| Enrollment mechanism | Autopilot deployment profile | ADE enrollment profile | Both configured in Intune admin center |
| First-run experience | OOBE (Out-of-Box Experience) | Setup Assistant | Conceptually equivalent — both run on first power-on |
| Progress/blocking screen | ESP (Enrollment Status Page) | Await Configuration | ESP blocks desktop; Await Configuration holds at end of Setup Assistant |
| ...more rows... | | | |

## Diagnostic Tools

| Task | Windows | macOS |
|------|---------|-------|
| Collect diagnostic logs | `mdmdiagnosticstool.exe -out <path>` | `sudo ./IntuneMacODC.sh` (IntuneMacODC tool) |
| View installed profiles | N/A (registry inspection) | `sudo profiles show` or System Settings > Profiles |
| Check enrollment status | `dsregcmd /status` | `profiles status -type enrollment` |
| View MDM agent logs | Event Viewer > DeviceManagement-Enterprise-Diagnostics | `tail -f /Library/Logs/Microsoft/Intune/*IntuneMDMDaemon*.log` |
```
Source: Pattern derived from existing `apv1-vs-apv2.md` (lines 16-37); macOS commands verified via Microsoft Learn and community sources.

### Pattern 2: Parallel Glossary with Cross-References (XPLAT-02)
**What:** A separate `_glossary-macos.md` file mirroring the structure of `_glossary.md` with macOS-specific terms and bidirectional cross-references.
**When to use:** When adding platform-specific terminology that should not pollute the existing glossary.
**Example:**
```markdown
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This glossary covers macOS-specific provisioning and management terminology.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).

# macOS Provisioning Glossary

## Alphabetical Index

[ADE](#ade) | [ABM](#abm) | [Await Configuration](#await-configuration) | ...

---

## Enrollment

### ADE

Automated Device Enrollment — Apple's mechanism for zero-touch enrollment of organization-owned macOS (and iOS/iPadOS) devices through Apple Business Manager. Devices are assigned to an MDM server in ABM and automatically enroll during Setup Assistant.

> **Windows equivalent:** [Windows Autopilot](_glossary.md#apv1) (APv1 hardware hash registration) or [Enrollment Time Grouping](_glossary.md#enrollment-time-grouping-etg) (APv2).

### Await Configuration

A setting in the macOS ADE enrollment profile that locks the device at the end of Setup Assistant until Intune confirms critical configuration policies are installed. The user sees an "Awaiting final configuration" screen.

> **Windows equivalent:** [ESP](_glossary.md#esp) (Enrollment Status Page) — both block the user from accessing the desktop until policies/apps are applied, but ESP has explicit device-phase and user-phase stages while Await Configuration is a single hold point.
```
Source: Structure mirrors `_glossary.md` (32 terms, 5 categories, alphabetical index). Cross-reference callout pattern derived from existing `> **APv2 note:**` pattern.

### Pattern 3: macOS Admin Template (XPLAT-03)
**What:** A template file with dual-portal step sections, cross-portal "what breaks" callouts, and a Portal column in the Configuration-Caused Failures table.
**When to use:** Every macOS admin setup guide written in Phases 23+.
**Example (key structural difference from Windows template):**
```markdown
### Step 1: [Configuration action]

#### In Apple Business Manager

1. Sign in to [Apple Business Manager](https://business.apple.com).
2. Navigate to **Devices** > [path].
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: Intune admin center > Devices > macOS enrollment status shows "Not enrolled".]
   > See: [Troubleshooting Runbook Title](TBD - Phase 24)

#### In Intune admin center

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** > **Apple** > [path].
2. [Action].

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| ADE token expired | ABM | Devices stop syncing to Intune; new devices not visible in enrollment | [TBD - Phase 24] |
| Enrollment profile not assigned | Intune | Device completes Setup Assistant but never enrolls in MDM | [TBD - Phase 24] |
```
Source: Adapted from existing `admin-template.md` (69 lines). Dual-portal structure based on verified macOS ADE workflow from Microsoft Learn.

### Pattern 4: Platform-First Navigation (NAVX-01)
**What:** Restructured `index.md` with a "Choose Your Platform" section at top, then `## Windows Autopilot` and `## macOS Provisioning` as platform headings. Existing Windows sections move under the Windows heading without changing heading text.
**When to use:** The single navigation hub file.
**Critical constraint:** Existing heading text (e.g., "## Service Desk (L1) -- APv1") must NOT change — this preserves anchor slugs used in cross-references.
**Example restructure:**
```markdown
# Device Provisioning Documentation

> **Platform coverage:** [description]

## Choose Your Platform

- [Windows Autopilot](#windows-autopilot) — Windows device provisioning via Autopilot (classic/APv1) and Device Preparation (APv2)
- [macOS Provisioning](#macos-provisioning) — macOS device provisioning via Automated Device Enrollment (ADE) through Apple Business Manager

---

## Windows Autopilot

[Existing intro paragraph, adapted]

### Service Desk (L1) -- APv1
[Existing table, unchanged]

### Service Desk (L1) -- APv2
[Existing table, unchanged]

...all existing sections moved here with NO heading text changes...

### Shared References
[Existing table with added macOS glossary link]

---

## macOS Provisioning

[New intro paragraph]

### Service Desk (L1)
| Resource | When to Use |
|----------|-------------|
| [placeholder links] | [TBD - Phase 24] |

### Desktop Engineering (L2)
| Resource | When to Use |
|----------|-------------|
| [placeholder links] | [TBD - Phase 24] |

### Admin Setup
| Resource | When to Use |
|----------|-------------|
| [placeholder links] | [TBD - Phase 23] |

## Cross-Platform References
| Resource | Description |
|----------|-------------|
| [Windows Autopilot Glossary](_glossary.md) | Windows Autopilot terminology |
| [macOS Provisioning Glossary](_glossary-macos.md) | macOS ADE terminology |
| [Windows vs macOS Concept Comparison](windows-vs-macos.md) | Platform terminology mapping |
| [Error Code Index](error-codes/00-index.md) | Windows error code lookup |
```
Source: Derived from existing `index.md` (88 lines). Section reorganization preserves all existing anchor slugs.

### Pattern 5: Platform Frontmatter Field (XPLAT-04)
**What:** A new `platform:` YAML frontmatter field with values `Windows`, `macOS`, or `all`.
**When to use:** All new documents. Existing documents implicitly default to `Windows` without edits.
**Example:**
```yaml
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---
```
**Orthogonality with `applies_to`:** The `applies_to` field retains its Windows-specific meaning (APv1/APv2/both). For macOS docs, `applies_to` can be omitted or set to a macOS-relevant value if needed in future phases. The `platform` field is the cross-platform dimension.

### Anti-Patterns to Avoid
- **Merging glossaries:** Do NOT add macOS terms to `_glossary.md`. This would create a single file mixing two platforms' terminology with confusing cross-references. Separate files with bidirectional links are cleaner.
- **Changing existing heading text in index.md:** Do NOT rename headings like "## Service Desk (L1) -- APv1" to include platform qualifiers. This would break anchor slugs used in cross-references across 33+ docs.
- **Retroactive frontmatter edits:** Do NOT add `platform: Windows` to existing docs. The decision is to default existing docs to Windows implicitly. Mass edits risk introducing accidental changes and create noisy git diffs.
- **Shared template base pattern:** Do NOT create a shared base template that Windows and macOS templates "extend." Markdown has no inheritance mechanism — any shared pattern would require manual enforcement and create synchronization burden.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-reference link format | Custom link syntax or tooling | Standard Markdown links: `[term](file.md#anchor)` | 98 existing cross-references use this pattern. Consistency is critical. |
| Template structure | Novel template layout | Copy and adapt `admin-template.md` | The 69-line admin template is battle-tested across 10+ guides. Adapt, don't reinvent. |
| Navigation structure | Tab-based or JavaScript navigation | Anchor links within a single Markdown file | The index.md single-file pattern works without any build tooling (MkDocs deferred to future milestone TOOL-03). |
| Frontmatter schema enforcement | Custom validation scripts | Convention-based (documented in templates) | No build pipeline exists yet. Templates serve as the schema definition. |

**Key insight:** This phase creates no net-new patterns. Every deliverable adapts an existing proven pattern from v1.0/v1.1. The risk is not in inventing the wrong thing — it is in deviating from established conventions.

## macOS ADE Terminology Reference

Verified terminology for use in the comparison page and glossary. All terms confirmed against current Microsoft Learn documentation (updated April 2026) and Apple Business Manager documentation.

### Core macOS Terms (for XPLAT-02 glossary)

| Term | Definition | Windows Equivalent | Confidence |
|------|------------|-------------------|------------|
| **ADE (Automated Device Enrollment)** | Apple's zero-touch enrollment mechanism for organization-owned devices. Formerly DEP (Device Enrollment Program). Devices assigned to MDM server in ABM enroll automatically during Setup Assistant. | Windows Autopilot (APv1 hardware hash registration + profile assignment) | HIGH |
| **ABM (Apple Business Manager)** | Apple's web portal for managing device enrollment, app distribution (Apps and Books), and Apple IDs for organizations. The single portal for all Apple device management administration. | Intune admin center (for Autopilot device management) — but ABM is Apple-side while Intune is Microsoft-side | HIGH |
| **Setup Assistant** | macOS first-run configuration experience presented after power-on or wipe. Screens are customizable (show/hide) via the ADE enrollment profile in Intune. Comparable to OOBE but with Apple-specific screens (Apple ID, FileVault, Siri, etc.). | OOBE (Out-of-Box Experience) | HIGH |
| **Await Configuration** | Officially "Await final configuration." A setting in the macOS ADE enrollment profile that pauses Setup Assistant just before the home screen loads, holding the device in a locked state while Intune delivers critical configuration profiles and policies. Default for new enrollment profiles since late 2024. | ESP (Enrollment Status Page) — both block desktop access until critical policies are applied | HIGH |
| **VPP (Volume Purchase Program)** | Legacy name for Apple's bulk app licensing mechanism. Now known as "Apps and Books" within Apple Business Manager. Licenses are purchased in ABM and synced to Intune via a location token. | Microsoft Store for Business (deprecated) / Intune app deployment | HIGH |
| **ABM Token** | The server token (.p7m file) downloaded from Apple Business Manager that enables communication between Intune and ABM for device sync and enrollment profile deployment. Must be renewed annually. Also called "enrollment program token" or "ADE token" in Intune documentation. | N/A (Windows Autopilot uses Graph API / direct Intune integration, no separate token file) | HIGH |

### Additional Terms for Comparison Page (XPLAT-01)

| Concept Area | Windows Term | macOS Term | Notes |
|-------------|-------------|------------|-------|
| Device registration portal | Intune admin center (Autopilot devices) | Apple Business Manager | Windows: hardware hash upload. macOS: serial number via purchase or Apple Configurator |
| Enrollment profile | Autopilot deployment profile | ADE enrollment profile | Both configured in Intune. Windows profiles also include OOBE settings; macOS profiles include Setup Assistant screen config |
| First-run experience | OOBE | Setup Assistant | Conceptually equivalent. macOS has Apple-specific screens (Apple ID, FileVault, Siri). Windows has Autopilot-specific branding. |
| Progress/blocking screen | ESP (Enrollment Status Page) | Await Configuration (Await final configuration) | ESP has device-phase and user-phase. Await Configuration is a single hold at end of Setup Assistant. |
| Provisioning stages | OOBE > ESP device phase > ESP user phase > Desktop | Setup Assistant > Await Configuration > Company Portal login > Desktop | macOS has no formal device/user phase split in the blocking screen |
| Hardware identity | Hardware hash (4KB device fingerprint) | Serial number (in ABM) | Different identity mechanisms. macOS serial numbers are in ABM; Windows hashes are uploaded to Intune. |
| Enrollment lock | N/A (ESP blocks by design) | Locked enrollment (prevents management profile removal) | macOS locked enrollment is a supervision-level setting |
| Profile delivery mechanism | Windows MDM channel | Apple MDM (APNs) | Windows uses WinHTTP; macOS uses Apple Push Notification service |
| User authentication | Entra credentials at OOBE | Setup Assistant with modern authentication (Entra) or Setup Assistant (legacy) | macOS has two auth methods; modern authentication is recommended |
| App distribution | Win32 apps, MSI, MSIX, Store apps | DMG, PKG, VPP/Apps and Books | Completely different packaging formats |
| Diagnostic log collection | `mdmdiagnosticstool.exe -out <path>` | IntuneMacODC tool (`sudo ./IntuneMacODC.sh`) | Both produce zip archives of diagnostic data |
| View profiles/enrollment state | Registry + `dsregcmd /status` | `sudo profiles show` / System Settings > Profiles | Different OS-level inspection methods |
| MDM agent logs | Event Viewer: DeviceManagement-Enterprise-Diagnostics-Provider | `/Library/Logs/Microsoft/Intune/` directory | Different log locations and formats |
| Device compliance | Windows security baselines + compliance policies | Compliance policies only (no macOS security baselines in Intune) | Key gap: macOS has no Intune security baselines |
| Disk encryption | BitLocker | FileVault | Both manageable via Intune compliance/configuration policies |
| Firewall | Windows Defender Firewall | macOS Application Firewall | Different configuration surface areas |
| Platform-exclusive concepts | Hardware hash, ESP device/user phase, Pre-provisioning (white glove), Self-deploying mode, Hybrid Entra join, ODJ | ABM token renewal, Setup Assistant screen customization, Apple ID integration, FileVault escrow, APNs certificate | Concepts with no direct equivalent on the other platform |

Source: Microsoft Learn macOS ADE enrollment guide (updated 2026-04-09), Apple Business Manager documentation, and existing Windows Autopilot glossary in `_glossary.md`.

## Common Pitfalls

### Pitfall 1: Breaking Existing Anchor Slugs in index.md
**What goes wrong:** Renaming or reformatting existing heading text in index.md causes broken cross-references in other documents.
**Why it happens:** Adding platform qualifiers (e.g., changing "## Admin Setup" to "## Windows Admin Setup") changes the generated anchor slug from `#admin-setup` to `#windows-admin-setup`.
**How to avoid:** Move existing sections under new parent headings (`## Windows Autopilot`) without changing the section's own heading text. The existing sections become H3 headings (### instead of ##) which does change anchors — but per the CONTEXT.md decision D-07, existing heading text is preserved. Verify that the heading level change does not break any existing cross-references by checking all links to `index.md#` in the codebase.
**Warning signs:** After editing index.md, grep for `index.md#` across all docs to verify no broken links.

### Pitfall 2: Incorrect Cross-Reference Paths in macOS Glossary
**What goes wrong:** Links from `_glossary-macos.md` to `_glossary.md` use wrong relative paths.
**Why it happens:** Both files are in the `docs/` root, so relative links are just `_glossary.md#anchor` (no directory prefix). But if someone assumes a subdirectory structure, links break.
**How to avoid:** Both glossary files sit in `docs/` root. Cross-references use `_glossary.md#anchor` and `_glossary-macos.md#anchor` — no `../` prefix needed.
**Warning signs:** Any link with `../` between the two glossary files is wrong.

### Pitfall 3: Conflating "Await Configuration" with ESP
**What goes wrong:** Documentation implies Await Configuration has device-phase and user-phase stages like ESP.
**Why it happens:** Both block the user from accessing the desktop, so writers assume they work the same way.
**How to avoid:** The comparison page and glossary must explicitly note: ESP has two phases (device and user); Await Configuration is a single hold point at the end of Setup Assistant. They are conceptually similar (both enforce policy delivery before desktop access) but structurally different.
**Warning signs:** Any documentation describing "device phase" or "user phase" in a macOS context.

### Pitfall 4: Using "DEP" Instead of "ADE"
**What goes wrong:** Documentation uses the deprecated term "Device Enrollment Program (DEP)" which Apple retired in favor of "Automated Device Enrollment (ADE)."
**Why it happens:** Many older blog posts and even some Microsoft docs still reference DEP.
**How to avoid:** Always use "Automated Device Enrollment (ADE)" as the primary term. The glossary entry for ADE should note "formerly DEP" for historical context but the acronym DEP should not appear in guides or the comparison page as a current term.
**Warning signs:** Any occurrence of "DEP" used as the primary term rather than a historical note.

### Pitfall 5: Forgetting the ABM Token Renewal Lifecycle
**What goes wrong:** The comparison page or glossary fails to mention that ABM tokens expire annually and require renewal — a concept with no Windows Autopilot equivalent.
**Why it happens:** Windows Autopilot has no equivalent renewal ceremony, so it is easy to omit from the comparison.
**How to avoid:** The comparison page should list "ABM token renewal" as a macOS-exclusive concept in the platform-exclusive row. The glossary entry for "ABM Token" should note the annual renewal requirement.
**Warning signs:** ABM token glossary entry without mentioning renewal.

### Pitfall 6: Heading Level Mismatch After index.md Restructure
**What goes wrong:** The current index.md uses H2 (`##`) for sections like "Service Desk (L1) -- APv1". After restructuring, these move under `## Windows Autopilot` and should become H3 (`###`). But the decision says "without changing their heading text" — this means the text stays the same but the heading level changes.
**Why it happens:** Ambiguity between "heading text" (the words) and "heading markup" (the `##` vs `###`).
**How to avoid:** Clarify that D-07 means the visible text of headings is preserved (so anchor slugs are preserved), but the heading level naturally changes from H2 to H3 because they are now nested under platform H2 headings. Verify that Markdown anchor generation is based on heading text, not heading level — which it is in standard Markdown renderers.
**Warning signs:** Check that `#service-desk-l1----apv1` still resolves correctly after the heading level change.

## Code Examples

### Example 1: Complete Frontmatter for New Cross-Platform Document
```yaml
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---
```

### Example 2: Complete Frontmatter for New macOS-Only Document
```yaml
---
last_verified: 2026-04-13
review_by: 2026-07-12
audience: admin
platform: macOS
---
```
Note: `applies_to` is omitted because it is a Windows-specific field (APv1/APv2/both). macOS documents do not need this field since there is only one macOS enrollment framework (ADE).

### Example 3: Glossary Cross-Reference Callout Pattern
```markdown
### Await Configuration

A setting in the macOS ADE enrollment profile that pauses Setup Assistant at the end...

> **Windows equivalent:** [ESP](_glossary.md#esp) (Enrollment Status Page) — both block desktop access until critical policies/apps are applied. Key difference: ESP has explicit device-phase and user-phase stages; Await Configuration is a single hold point at the end of Setup Assistant.
```

### Example 4: Banner Linking Between Glossaries
In `_glossary.md` (existing, add after line 9):
```markdown
> For macOS provisioning terminology, see the [macOS Provisioning Glossary](_glossary-macos.md).
```

In `_glossary-macos.md` (new):
```markdown
> **Platform coverage:** This glossary covers macOS-specific provisioning and management terminology.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).
```

### Example 5: macOS Admin Template — Dual-Portal Step Structure
```markdown
### Step 1: Create ADE token

#### In Apple Business Manager

1. Sign in to [Apple Business Manager](https://business.apple.com) with your organization Apple ID.
2. Navigate to your account profile > **Preferences**.
3. Go to your MDM server assignments.
4. Select the option to add an MDM server.
5. Name the MDM server and upload the Intune public key certificate.
6. Download the server token (.p7m file).

   > **What breaks if misconfigured:** Using a personal Apple ID instead of the organizational Apple ID means token renewal cannot be performed by other admins if the original creator leaves the organization. Symptom: token renewal fails in Intune admin center with "invalid credentials" — visible in Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens.
   > See: [ADE Token Troubleshooting](TBD - Phase 24)

#### In Intune admin center

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** > **Apple** tab.
2. Under **Bulk Enrollment Methods**, select **Enrollment program tokens**.
3. Select **Add**.
4. Upload the server token (.p7m file) downloaded from Apple Business Manager.

   > **What breaks if misconfigured:** Uploading an expired or wrong token causes device sync failures. Symptom: "Sync failed" status on the token in Intune admin center, and new ABM-assigned devices do not appear in Intune.
   > See: [ADE Token Troubleshooting](TBD - Phase 24)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| DEP (Device Enrollment Program) | ADE (Automated Device Enrollment) | ~2019 (Apple rebrand) | All documentation must use "ADE" as primary term, "DEP" only as historical note |
| VPP (Volume Purchase Program) portal | Apps and Books in ABM | ~2019 (ABM consolidation) | "VPP" is still used colloquially; glossary should note "now Apps and Books in ABM" |
| Setup Assistant (legacy) auth only | Setup Assistant with modern authentication (recommended) | 2022+ | Modern auth is now Microsoft's recommendation; legacy still available but not recommended |
| Company Portal required for Entra registration | Just in Time (JIT) registration available | 2024+ | Company Portal still recommended but no longer strictly required for ADE with modern auth |
| ADE enrollment profiles in old Intune UX | New ADE enrollment policies experience | Expected Q2 CY2026 | New infrastructure for ADE profiles; existing profiles migrate. May affect portal navigation paths in guides. |

**Deprecated/outdated:**
- **DEP:** Fully replaced by ADE. Do not use as a current term.
- **VPP portal:** Replaced by Apps and Books in ABM. The term "VPP" persists in Intune documentation (e.g., "VPP token") but the standalone VPP portal no longer exists.
- **Setup Assistant (legacy) for new deployments:** Microsoft explicitly recommends against legacy Setup Assistant for new deployments. Use Setup Assistant with modern authentication.

## Open Questions

1. **macOS Provisioning Glossary — Semantic Categories**
   - What we know: The Windows glossary has 5 categories (Enrollment, Hardware, Network, Security, Deployment Modes). macOS terms don't map 1:1 to these categories.
   - What's unclear: Whether to use the same category names where possible (e.g., "Enrollment" covers ADE, Setup Assistant, Await Configuration) or create macOS-specific categories.
   - Recommendation: Mirror Windows categories where they apply (Enrollment, Security). Create macOS-specific categories only when needed (e.g., "Apple Business Manager" as a category for ABM, ABM token, Apps and Books/VPP). This is within Claude's discretion per CONTEXT.md.

2. **Heading Level Change Impact on Existing Links**
   - What we know: Moving existing index.md sections from H2 to H3 preserves heading text but changes the heading level. Standard Markdown anchor generation is text-based (not level-based), so `#service-desk-l1----apv1` should still work.
   - What's unclear: Whether any tools or renderers in use generate anchors differently.
   - Recommendation: After editing index.md, verify all existing links to `index.md#` across the codebase still resolve. This should be a verification step in the plan.

3. **H1 Title Wording for index.md**
   - What we know: D-09 says change from "Windows Autopilot Documentation" to a platform-neutral title. Two examples given: "Device Provisioning Documentation" or "Autopilot & macOS ADE Documentation."
   - What's unclear: Which title is preferred.
   - Recommendation: Use "Device Provisioning Documentation" — it is the most neutral and does not privilege either platform's brand name. "Autopilot & macOS ADE" still leads with the Windows brand. This is within Claude's discretion per CONTEXT.md.

4. **New ADE Enrollment Policies Experience (Q2 CY2026)**
   - What we know: Microsoft is migrating ADE enrollment profiles to new infrastructure (announced on Microsoft Tech Community blog). Expected Q2 CY2026.
   - What's unclear: Whether portal navigation paths in the macOS admin template will change.
   - Recommendation: Use current portal navigation paths. Add a note in the template comment block that paths should be verified against the Intune admin center at time of writing. This is a concern for Phase 23 (macOS admin setup guides) more than Phase 20 (template creation).

## Sources

### Primary (HIGH confidence)
- [Microsoft Learn: Set up automated device enrollment (ADE) for macOS](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-macos) — Full ADE enrollment flow, Setup Assistant screens, Await Configuration details, token management (updated 2026-04-09)
- [Microsoft Learn: macOS device enrollment guide](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-macos) — All macOS enrollment methods, ADE admin and user tasks (updated 2026-04-09)
- Existing codebase: `docs/_glossary.md`, `docs/apv1-vs-apv2.md`, `docs/_templates/admin-template.md`, `docs/index.md` — All patterns to replicate

### Secondary (MEDIUM confidence)
- [Microsoft Tech Community: New ADE enrollment policies experience](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-iosipados-and-macos-ade-enrollment-policies-experience/4393531) — Upcoming infrastructure change for ADE profiles
- [Microsoft Tech Community: Troubleshooting Intune management agent on macOS](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-troubleshooting-microsoft-intune-management-agent-on-macos/4431810) — macOS diagnostic commands and log paths
- [GitHub: IntuneMacODC](https://github.com/markstan/IntuneMacODC) — macOS diagnostic collection tool

### Tertiary (LOW confidence)
- Community blog posts on VPP/Apps and Books terminology evolution — used for historical context only, not for primary term definitions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — This is a Markdown-only documentation phase with no technology decisions
- Architecture: HIGH — Every pattern has a direct precedent in the existing v1.0/v1.1 codebase
- Terminology: HIGH — All macOS terms verified against Microsoft Learn (updated April 2026)
- Pitfalls: HIGH — Identified from analysis of existing codebase cross-reference patterns and domain knowledge

**Research date:** 2026-04-13
**Valid until:** 2026-05-13 (30 days — stable documentation patterns; watch for ADE enrollment policy UX migration in Q2 CY2026)
