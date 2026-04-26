# Phase 34: Android Foundation - Pattern Map

**Mapped:** 2026-04-21
**Files analyzed:** 5 (all NEW — zero existing content)
**Analogs found:** 5 / 5 (direct structural precedents in v1.2 macOS + v1.3 iOS)

This phase is documentation-only. "Role" and "data flow" are mapped into documentation-suite equivalents:

- **Role** ≈ document type: `glossary` | `lifecycle-overview` | `reference-matrix` | `author-template`
- **Data flow** ≈ authoring pattern: `term-disambiguation` | `mode-comparison` | `mode×method-matrix` | `mode×version-matrix` | `tri-portal-instantiation`

## File Classification

| New File | Role (Doc Type) | Authoring Pattern | Closest Analog | Match Quality |
|----------|-----------------|-------------------|----------------|---------------|
| `docs/_glossary-android.md` | glossary | term-disambiguation w/ cross-platform callouts | `docs/_glossary-macos.md` | **exact** (D-08 locks "mirror exactly") |
| `docs/android-lifecycle/00-enrollment-overview.md` | lifecycle-overview | 5-col mode comparison + axes narrative + iOS-bridge subsection | `docs/ios-lifecycle/00-enrollment-overview.md` | **exact** (D-01 cites lines 31-36) |
| `docs/android-lifecycle/02-provisioning-methods.md` | reference-matrix | mode-rows × method-cols with embedded version cells | No exact analog — **novel artifact** | structural composite (table shape from `ios-capability-matrix.md`; mode-row data shape from `FEATURES.md` research matrix) |
| `docs/android-lifecycle/03-android-version-matrix.md` | reference-matrix | 3-col breakpoints matrix + narrative breakpoint details + non-version section | No exact analog — **novel artifact** | structural composite (table shape from `ios-capability-matrix.md`; narrative breakpoint pattern from research precedent) |
| `docs/_templates/admin-template-android.md` | author-template | tri-portal H4 sub-sections with subtractive-deletion ZT section | `docs/_templates/admin-template-ios.md` + `docs/_templates/admin-template-macos.md` | **composite** (dual-portal precedent extended to three portals) |

Analog files were read in full (not sampled) to verify line-range accuracy.

## Pattern Assignments

### `docs/_glossary-android.md` (glossary, term-disambiguation)

**Analog:** `docs/_glossary-macos.md` (structural mirror per D-08)

**Frontmatter pattern** (`_glossary-macos.md` lines 1-7) — ADAPT:
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: all
platform: all
---
```
**Adaptation for Android:** `platform: all` (not `Android`) because the glossary is cross-cutting and linked from Windows/iOS/macOS docs too. `review_by` is `last_verified + 60` (not 90) per D-14. First Android `last_verified` expected 2026-04-21 → `review_by` 2026-06-20.

**Platform-coverage blockquote** (`_glossary-macos.md` lines 9-10) — ADAPT:
```markdown
> **Platform coverage:** This glossary covers Apple-platform provisioning and management terminology for macOS and iOS/iPadOS.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).
```
**Adaptation:** Rewrite scope to "Android Enterprise provisioning" and point to both `_glossary.md` (Windows) and `_glossary-macos.md` (Apple).

**Alphabetical index pattern** (`_glossary-macos.md` lines 14-16) — COPY SHAPE:
```markdown
## Alphabetical Index

[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)

---
```
**Adaptation for Android:** 13 disambiguation terms (D-11) + 6 Android-native terms (D-12) = 19 links, pipe-delimited, alphabetical, followed by `---` separator.

**Category H2 pattern** (`_glossary-macos.md` lines 20, 54, 82, 99) — COPY SHAPE:
```markdown
## Enrollment
## Device Management
## App Distribution
## App Protection (MAM)
```
**Adaptation for Android per D-09:** Five category H2 headings: `## Enrollment`, `## Ownership & Management Scope`, `## Provisioning Methods`, `## Portals & Binding`, `## Compliance & Attestation`. Category names are author's discretion per Claude's Discretion block so long as 5 categories and 13+6 term coverage is preserved.

**Per-term pattern** (`_glossary-macos.md` lines 22-26 — Account-Driven User Enrollment entry is the canonical shape):
```markdown
### Account-Driven User Enrollment

Apple's privacy-preserving BYOD enrollment method for iOS/iPadOS (iOS 15+) and macOS (Sonoma+). The user starts enrollment from Settings > General > VPN & Device Management on their personal device by signing in with their Managed Apple ID; [...definition continues 2-4 sentences on own merits...].

> **Windows equivalent:** No direct equivalent. The closest parallel is [Intune MAM-WE](#mam-we) on Windows MAM-enrolled devices, but Account-Driven User Enrollment is a device-level BYOD enrollment path whereas Windows MAM-WE is app-layer only. [...]
```
**Adaptation for Android per D-10 (Anti-Pattern 4 guard):**
1. `### Term` heading (H3).
2. Definition on its own Android merits (2-4 sentences). First sentence MUST NOT contain "iOS," "macOS," "Windows," or "like supervision" — AEAUDIT-04 pre-check scans for these.
3. Callout blockquote AFTER definition, using `> **Cross-platform note:**` (NOT `> **Windows equivalent:**` — Android's scope is 3-platform cross-reference, not 1-platform).

**Special "Supervision" entry** per D-11 + Open Question 2 Recommendation — callout-only stub:
```markdown
### Supervision

> **Android note:** "Supervision" is an iOS/iPadOS management-state concept (see [macOS Glossary — Supervision](_glossary-macos.md#supervision)). Android does not use this term. The closest analog is [Fully Managed](#fully-managed), which is an ownership-mode designation, not a permanent device state. Do not conflate.
```
Still appears in alphabetical index so readers arriving from iOS mental-model find the disambiguation.

**Version History pattern** (`_glossary-macos.md` lines 109-116) — COPY SHAPE:
```markdown
---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Phase 32: added iOS/iPadOS terms (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection), updated VPP with iOS device-licensed vs user-licensed distinction, new ## App Protection (MAM) H2 | -- |
| 2026-04-13 | Initial version -- 6 macOS terms with Windows cross-references | -- |
```
**Adaptation for Android per D-13:** Record term-evolution entries for COPE→WPCO language drift, AMAPI April 2025 migration, SafetyNet→Play Integrity January 2025 deprecation — these are the initial-version history rows.

**Anti-pattern guards specific to this file:**
- **AEAUDIT-04** — Zero raw uses of "supervision" as an Android management term (allowed only in the `### Supervision` callout-only entry and in explicit iOS cross-reference prose). Grep check: `grep -i "supervis" docs/_glossary-android.md` — every match must be in the Supervision entry or a cross-platform callout.
- **Anti-Pattern 4** — Definition first, callout after. Grep check: `grep -B1 "^> \*\*Cross-platform note:" docs/_glossary-android.md` — every match must have non-empty prose immediately preceding.
- **No SafetyNet as current mechanism** — SafetyNet appears only in Version History / Play Integrity cross-reference contexts.
- **No "COPE deprecated"** — COPE entry uses "Google recommends WPCO" language per Pitfall 4.

---

### `docs/android-lifecycle/00-enrollment-overview.md` (lifecycle-overview, 5-col-comparison + narrative)

**Analog:** `docs/ios-lifecycle/00-enrollment-overview.md` (shape mirror per D-01, CITED lines 31-36)

**Frontmatter pattern** (`ios-lifecycle/00-enrollment-overview.md` lines 1-7) — ADAPT:
```yaml
---
last_verified: 2026-04-16
review_by: 2026-07-15
applies_to: all
audience: all
platform: iOS
---
```
**Adaptation:** `platform: Android`; `review_by` is `last_verified + 60` days per D-14 (NOT 90).

**Platform-gate blockquote** (`ios-lifecycle/00-enrollment-overview.md` line 9) — ADAPT:
```markdown
> **Version gate:** This guide covers iOS/iPadOS enrollment paths in Microsoft Intune. For macOS ADE, see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md). For Windows Autopilot, see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md). For terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
```
**Adaptation:** Point to `../_glossary-android.md` and cross-platform links. Do NOT link to `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, or `index.md` (Pitfall 8 — deferred files).

**"How to Use This Guide" audience-routing pattern** (`ios-lifecycle/00-enrollment-overview.md` lines 13-19) — COPY SHAPE:
```markdown
## How to Use This Guide

This guide describes all four iOS/iPadOS enrollment paths and establishes the supervision axis that governs what each path can manage.

- **L1 Service Desk:** Use the [Enrollment Path Comparison](#enrollment-path-comparison) table to identify the enrollment type, then read the per-path section for use case confirmation.
- **L2 Desktop Engineering:** Use the [Supervision](#supervision) section for the enrollment-time constraint and its consequences.
- **Intune Admins:** Use the per-path sections for selection guidance and links to admin setup guides.
```
**Adaptation for Android:** Replace "four enrollment paths" / "supervision axis" with "five enrollment modes" / "ownership × management-scope axes." The L1/L2/Admin three-bullet routing is the iOS Phase 26 D-03 precedent — replicate verbatim shape.

**5-column comparison table pattern** (`ios-lifecycle/00-enrollment-overview.md` lines 29-36) — COPY SHAPE:
```markdown
## Enrollment Path Comparison

| Enrollment Path | Ownership Model | Supervision State | Management Scope | Appropriate Use Case |
|-----------------|-----------------|-------------------|------------------|---------------------|
| Automated Device Enrollment (ADE) | Corporate-owned | Supervised | Full device (all MDM capabilities including supervised-only restrictions, remote wipe, OS update enforcement, silent app install) | Corporate fleet; zero-touch deployment via ABM; new or wiped devices only |
| Device Enrollment | Personal or corporate | Unsupervised | Device (MDM-managed policies, certificates, Wi-Fi, VPN, compliance -- no supervised-only capabilities) | BYOD or legacy corporate devices not eligible for ADE; no ABM required |
[... 2 more rows ...]
```
**Adaptation per D-01, D-04 (CRITICAL divergence):** Column **3 is "Management Scope" NOT "Supervision State"**. D-04 forbids "Supervised"/"Unsupervised" values. Android column set is: **Mode | Ownership Model | Management Scope | Provisioning Surface | Appropriate Use Case**. Management Scope values are Android-native: "Fully managed" / "Work profile" / "Dedicated (COSU)" / "AOSP (unmanaged)".

**Per-path narrative section pattern** (`ios-lifecycle/00-enrollment-overview.md` lines 38-48 — Supervision section is the canonical shape):
```markdown
## Supervision

**What supervision is:** [Supervision](../_glossary-macos.md#supervision) is a management state set at enrollment time. [...]

**When supervision is set:** [...]

**Changing supervision requires a full device erase:** [...]

To verify supervision state: **Settings > General > About** shows "This iPhone is supervised and managed by [organization name]" on supervised devices.
```
**Adaptation for Android per D-02, D-03:** Replace with TWO distinct H2 sections:
1. `## Two Axes of Android Enterprise` — narrative explaining ownership axis × management-scope axis (D-02). Placed IMMEDIATELY after comparison table. NOT a table column.
2. `## For Admins Familiar with iOS` — the supervision-analog bridge using exact D-03 framing: "Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for disambiguation."

**Per-mode H3 sections** (`ios-lifecycle/00-enrollment-overview.md` lines 52-78) — COPY SHAPE:
```markdown
## Enrollment Path Details

### Automated Device Enrollment (ADE)

[ADE](../_glossary-macos.md#ade) is the zero-touch corporate enrollment path for iOS/iPadOS. [...]

### Device Enrollment

Device Enrollment uses Company Portal or web-based enrollment to install an MDM profile. [...]
```
**Adaptation:** One H3 per mode — `### Fully Managed (COBO)`, `### BYOD Work Profile`, `### Dedicated (COSU)`, `### Zero-Touch Enrollment (ZTE)`, `### AOSP`. AOSP gets explicit "out-of-GMS" narrative callout per D-05 flagging structural difference (no MGP binding, no work profile, forward-ref to Phase 39 stub).

**See Also pattern** (`ios-lifecycle/00-enrollment-overview.md` lines 80-84) — COPY SHAPE:
```markdown
## See Also

- [iOS/iPadOS ADE Lifecycle](01-ade-lifecycle.md) -- for ADE end-to-end stages from ABM assignment through post-enrollment management
- [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md) -- for cross-platform comparison of the ADE pipeline
- [Apple Provisioning Glossary](../_glossary-macos.md) -- for terminology including [ADE](../_glossary-macos.md#ade), [ABM](../_glossary-macos.md#abm), and [VPP](../_glossary-macos.md#vpp)
```
**Adaptation:** Cross-refs to `02-provisioning-methods.md`, `03-android-version-matrix.md`, `_glossary-android.md`. No links to `common-issues.md` / `quick-ref-*.md` / `index.md` (deferred).

**Anti-pattern guards specific to this file:**
- **AEAUDIT-04** — "supervision"/"supervised" appears only inside `## For Admins Familiar with iOS` subsection. Grep check: `grep -i "supervis" docs/android-lifecycle/00-enrollment-overview.md` — every match must be in that section or in iOS cross-reference prose.
- **Anti-Pattern 1 (matrix duplication)** — "Provisioning Surface" column has only 1-2 representative methods per mode + link to `02-provisioning-methods.md`. Do NOT embed full NFC/QR/afw#setup/Zero-Touch grid.
- **Word-count gate** — 800-1200 words per D-07. Measured excluding frontmatter.
- **Canonical anchor stability** — H2/H3 headings must produce the anchors `#enrollment-mode-comparison` (or equivalent from the H2 title author chooses), `#two-axes-of-android-enterprise`, `#for-admins-familiar-with-ios`, `#fully-managed-cobo`, `#byod-work-profile`, `#dedicated-cosu`, `#zero-touch-enrollment-zte`, `#aosp`. Phase 35-42 cross-references depend on these (Pitfall 7).

---

### `docs/android-lifecycle/02-provisioning-methods.md` (reference-matrix, mode×method)

**Analog:** No exact in-docs analog. Closest structural analogs:
- **Table-shape reference matrix:** `docs/reference/ios-capability-matrix.md` lines 13-29 — multi-H2 table structure with frontmatter `platform: all, audience: admin`.
- **Mode-row data structure:** `.planning/research/FEATURES.md` lines 329-336 — research matrix whose orientation is FLIPPED for D-23 (research was method-rows; published is mode-rows).

**Frontmatter pattern** (`ios-capability-matrix.md` lines 1-7) — ADAPT:
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: admin
platform: all
---
```
**Adaptation:** `platform: Android`, `review_by: last_verified + 60` per D-33 equivalent.

**Introductory prose pattern** (`ios-capability-matrix.md` line 11) — COPY SHAPE:
```markdown
# Intune: iOS/iPadOS Capability Matrix — Windows, macOS, iOS

This matrix compares Intune management capabilities across three platforms. [...]
```
**Adaptation:** H1 title "Android Enterprise Provisioning Methods" + 1-2 paragraph preamble explaining the "mode-first reader model" (D-23) — reader locates mode first, scans row for supported methods.

**Pre-table callout pattern** (PATTERN adapted from platform-gate blockquote convention, per Open Question 3 Recommendation A):
```markdown
> **Samsung devices:** Knox Mobile Enrollment (KME) is mutually exclusive with
> Zero-Touch on the same Samsung device. Configure only one. KME is deferred to
> v1.4.1; see the KME note at the bottom of this page.
```
**Per D-27:** Blockquote immediately precedes the table — "adjacent to the Zero-Touch column header" (visually contiguous with table) without being in a cell.

**Mode-rows × method-cols matrix pattern** (composite — data from FEATURES.md lines 329-336 flipped per D-23, table-shape from `ios-capability-matrix.md`):
```markdown
| Mode | NFC | QR | afw#setup | Zero-Touch | Notes |
|------|-----|-----|-----------|------------|-------|
| Fully Managed (COBO) | ✓ (Android 8+) | ✓ (Android 9+ built-in; Android 7-8 needs external reader) | ✓ | ✓ | Dual-SIM devices: register IMEI 1 (see Phase 35) |
| BYOD Work Profile | ✗ | ✗ | ✗ | ✗ | Company Portal user-initiated only; no corporate provisioning methods apply |
| Dedicated (COSU) | ✓ (Android 8+) | ✓ (Android 9+ built-in) | ✓ | ✓ | MHS exit-PIN sync requirement — see Phase 38 |
| Zero-Touch Enrollment | — | — | — | ✓ (via portal) | ZT is itself a provisioning method; reseller requirement is Step 0 — see Phase 35 |
| AOSP | ✗ | ✓ (Android 10+, one device at a time) | ✗ | ✗ | OEM firmware-specific; see Phase 39 stub |
```
**Cell-value rules per D-24, D-25:**
- `✓` = supported (use actual U+2713 or similar glyph consistent with rest of project — no images).
- `✗` = not supported.
- `—` = not applicable (e.g., ZT row's non-ZT method columns).
- Version-gating embedded in the `✓` cell: `✓ (Android N+)` or `✓ (Android N+ built-in; older needs external reader)`.
- `Notes` column captures mode-level constraints that don't fit per-cell.

**KME deferral footer pattern** (composite — derived from D-28 "stub reference only" guidance):
```markdown
## Knox Mobile Enrollment (KME) — Deferred to v1.4.1

Knox Mobile Enrollment is Samsung's Zero-Touch-equivalent for Samsung hardware. KME row will be added in v1.4.1 per PROJECT.md Key Decisions. For v1.4, treat Samsung devices as Zero-Touch-eligible (see the Samsung mutual-exclusion callout above).
```

**Anti-pattern guards specific to this file:**
- **Anti-Pattern 1** — This is the SINGLE canonical method-matrix in v1.4. Phase 34 enrollment overview uses filtered-row link; Phases 36-39 mode guides use filtered-row links. No other file contains this grid.
- **Pitfall 5 (version drift)** — Cells that cite Android versions should cross-reference `03-android-version-matrix.md` for mode-level Intune minimum OS. The two matrices align on different axes (method×mode version vs mode-level Intune minimum) but must not contradict.
- **Pitfall 6 (premature content)** — No Knox row in the data grid (deferred). Footer note only.
- **No QR code images** — QR codes are sensitive artifacts; document generation process only per Anti-Patterns list.

---

### `docs/android-lifecycle/03-android-version-matrix.md` (reference-matrix, mode×version-breakpoints)

**Analog:** No exact in-docs analog. Closest structural analogs:
- **Frontmatter + table shape:** `docs/reference/ios-capability-matrix.md` lines 1-7, 13-29.
- **Breakpoint narrative pattern:** derived from `FEATURES.md` lines 350-358 research structure (per D-29).

**Frontmatter pattern** — COPY SHAPE FROM `ios-capability-matrix.md` lines 1-7:
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: admin
platform: all
---
```
**Adaptation:** `platform: Android`, `review_by = last_verified + 60` per D-33. **LOAD-BEARING:** Phase 42 milestone audit uses this file's `last_verified` as the audit anchor (D-33).

**Prohibition per D-31:** Do NOT add `min_android_version` as frontmatter on this (or any Android) doc. Version gating lives in the matrix body only. Grep check: `grep "min_android_version" docs/android-lifecycle/*.md` returns empty.

**3-column matrix pattern** (shape from `ios-capability-matrix.md` table; data from FEATURES.md lines 350-358):
```markdown
| Mode | Intune Minimum OS | Notable Version Breakpoints |
|------|-------------------|----------------------------|
| Fully Managed (COBO) | Android 10.0 | Android 11: enrollment time grouping; Android 15: FRP hardening |
| BYOD Work Profile | Android 5.0 (practical: Android 8) | Android 9: built-in QR reader; Android 12: IMEI/serial removed from corporate identifiers; Android 15: Private Space unsupported |
| Dedicated (COSU) | Android 8.0 | Android 9: built-in QR reader; Android 15: FRP hardening on re-provisioning |
| Zero-Touch Enrollment | Android 8.0 (Oreo) | Android 15: FRP hardening affects re-enrollment flows |
| AOSP | Varies by OEM firmware | Not an Android API level — OEM firmware-specific |
```

**Breakpoint narrative H3 section pattern** (from CONTEXT.md specifics section + D-30):
```markdown
## Version Breakpoint Details

### Android 11 — COPE NFC Provisioning Removed

**Affected modes:** COBO (no impact, QR/afw#setup/ZT still supported); COPE (NFC and afw#setup paths removed).
**What changed:** Google removed NFC and DPC identifier (afw#setup) as valid provisioning methods for work profile on corporate-owned (COPE/WPCO) on Android 11+.
**Admin action required:** For COBO, no action. For COPE, migrate to QR or Zero-Touch.
**References:** [Jason Bayton — Android 11 COPE changes](https://bayton.org/android/android-11-cope-changes/), [MS Learn ref-corporate-methods](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods).
```
Repeat for Android 12 (IMEI/serial removal) and Android 15 (FRP hardening).

**Non-version-breakpoints H2 section pattern** (per D-32):
```markdown
## Non-Version Breakpoints

### SafetyNet → Play Integrity (January 2025)

Google turned off SafetyNet Attestation API in January 2025. Play Integrity API is the successor. Intune compliance UI uses "Play Integrity verdict" terminology [...].

### AMAPI Migration for BYOD (April 2025)

Microsoft migrated Android personally-owned work profile management to AMAPI (Android Management API) in April 2025. [...]
```

**Anti-pattern guards specific to this file:**
- **AEAUDIT-04 (SafetyNet)** — `grep -i "safetynet" docs/android-lifecycle/03-android-version-matrix.md` returns at most 1 match, and that match is the "SafetyNet → Play Integrity" non-version-breakpoint section. No other SafetyNet references.
- **D-31 frontmatter prohibition** — no `min_android_version` key in YAML frontmatter.
- **Pitfall 5 (version drift)** — Minimum OS values must align with `02-provisioning-methods.md` per-cell version annotations on the same axis. When provisioning matrix says "NFC: Android 8+" on COBO row, this matrix's COBO "Intune Minimum OS" (Android 10.0) must not contradict — clarify that provisioning cells track *method×mode* version while this matrix tracks *mode-level Intune-enforced minimum*.
- **Canonical anchor stability** — H3 headings for breakpoints must produce anchors `#android-11-cope-nfc-provisioning-removed` (or stable equivalent), `#android-12-imei-serial-removed-from-corporate-identifiers`, `#android-15-factory-reset-protection-hardening`. Per Pitfall 7, if author wants shorter anchors (`#android-11-breakpoint`) use explicit `<a id="android-11-breakpoint"></a>` tags — be consistent.

---

### `docs/_templates/admin-template-android.md` (author-template, tri-portal-instantiation)

**Analog (primary):** `docs/_templates/admin-template-ios.md` (D-17 cites lines 98-99 for HTML-comment subtractive-deletion pattern)
**Analog (secondary):** `docs/_templates/admin-template-macos.md` (D-17 cites lines 76-77; simpler dual-portal shape for base structure)

**File-opening comment block** (`admin-template-macos.md` lines 1-17) — COPY SHAPE:
```markdown
<!-- MACOS ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any macOS admin configuration guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set platform to macOS (this template is macOS-specific)
     - Replace all [bracketed placeholders] with actual content
     - Every configurable setting MUST have a "What breaks if misconfigured" callout
       specifying which portal the misconfiguration occurs in AND where the symptom manifests
     - Use imperative voice for steps ("Navigate to...", "Select...", "Enter...")
     - Include full navigation paths for both ABM and Intune admin center portals
     - Steps that span both portals MUST use #### In Apple Business Manager and
       #### In Intune admin center sub-sections
     [...]
     - Include Renewal/Maintenance section ONLY when the guide's subject has a
       renewable component (e.g., ADE token, APNs certificate). Omit otherwise.
     Reviewer: macOS Platform Lead (role, not person name)
-->
```
**Adaptation for Android (critical divergences from macOS template):**
- Title: `ANDROID ENTERPRISE ADMIN SETUP GUIDE TEMPLATE`.
- `review_by = last_verified + 60 days` (NOT 90) per D-21.
- `platform: Android`.
- **Three portal sub-sections** (not two): `#### In Intune admin center`, `#### In Managed Google Play`, `#### In Zero-Touch portal`.
- **Renewal/Maintenance section MANDATORY by default** per D-20 (NOT optional like iOS/macOS). MGP binding + ZT reseller relationship always need maintenance.
- Reviewer line: `Android Platform Lead (role, not person name)`.

**Frontmatter block** (`admin-template-ios.md` lines 18-23) — COPY SHAPE:
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: iOS
---
```
**Adaptation per D-21:** `platform: Android` literal in template (not a placeholder).

**Platform-gate blockquote** (`admin-template-macos.md` lines 25-27) — ADAPT:
```markdown
> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```
**Adaptation:** Name the three Android portals; link to `../_glossary-android.md`; cross-refs to Windows/macOS/iOS glossaries as appropriate.

**Callout-pattern comment block** (iOS template has this for supervised-only + privacy-limit callouts; Android template needs its own parallel block — NO supervised-only glyph since supervision is not an Android term):
```markdown
<!-- "What breaks if misconfigured" CALLOUT PATTERN
     Use this exact format after every configurable setting. No variations.
     Place immediately AFTER the action step, BEFORE the next step.
     Tri-portal cross-portal symptom documentation is REQUIRED — a misconfiguration
     in Managed Google Play may surface as a symptom in Intune admin center.

     > **What breaks if misconfigured:** [Consequence]. Symptom appears in:
     > [portal where the admin or user notices the failure — often DIFFERENT from
     > the portal where the misconfiguration was set].
     > See: [Runbook Title](../l1-runbooks/[filename].md)
-->
```

**Prerequisites + Steps pattern** (`admin-template-macos.md` lines 31-62) — COPY SHAPE:
```markdown
## Prerequisites

- [Required admin role -- e.g., Intune Administrator, ABM Device Manager]
- [Required license or subscription -- e.g., Microsoft Intune Plan 1, Apple Business Manager account]
- [Prior configuration that must be completed first -- link to that guide]
- [Required portal access -- specify both ABM and Intune admin center if applicable]

## Steps

### Step 1: [Configuration action]

#### In Apple Business Manager

1. Sign in to [Apple Business Manager](https://business.apple.com).
2. Navigate to **[section]** > **[sub-section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {specify portal where symptom manifests, which may differ from the portal where the misconfiguration occurs}.]
   > See: [Troubleshooting Runbook Title](../l1-runbooks/[runbook-filename].md)

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Enrollment** > **Apple** > **[path]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {specify portal}.]
   > See: [Troubleshooting Runbook Title](../l1-runbooks/[runbook-filename].md)
```

**Adaptation to Android tri-portal per D-16, D-18 — THREE portal sub-sections:**
```markdown
### Step 1: [Configuration action]

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Android** > **Enrollment** > **[path]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence]. Symptom appears in: [portal].
   > See: [Runbook Title](../l1-runbooks/[filename].md)

#### In Managed Google Play

1. Sign in to [Managed Google Play](https://play.google.com/work).
2. Navigate to **[section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence]. Symptom appears in: [portal — often Intune admin center, even though misconfiguration was here].
   > See: [Runbook Title](../l1-runbooks/[filename].md)

<!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
     corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
     via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
     admin guides (neither uses the Zero-Touch portal). -->

#### In Zero-Touch portal

1. Sign in to [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers).
2. Navigate to **[section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence]. Symptom appears in: [portal].
   > See: [Runbook Title](../l1-runbooks/[filename].md)
```

**HTML-comment subtractive-deletion pattern** — EXACT COPY from `admin-template-macos.md` lines 76-77 + `admin-template-ios.md` lines 98-99:
```markdown
<!-- Include this section ONLY if the guide's subject has a renewable component
     (e.g., ADE token, APNs certificate). Delete this entire section if not applicable. -->
```
**Adaptation for Android ZT subsection per D-17 (exact wording locked):**
```markdown
<!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
     corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
     via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
     admin guides (neither uses the Zero-Touch portal). -->
```
**Critical difference from iOS/macOS templates:** MGP subsection is NOT wrapped in subtractive-deletion comment (per D-18 — mandatory for all GMS-based modes; only AOSP Phase 39 stub deletes it, and it does so outside the template path).

**Verification checklist pattern** (`admin-template-macos.md` lines 64-67) — COPY SHAPE:
```markdown
## Verification

- [ ] [How to confirm the configuration is correct in ABM -- specific ABM page to check, expected state]
- [ ] [How to confirm the configuration is correct in Intune -- specific Intune portal location, expected state]
```
**Adaptation:** Three checklist items, one per portal (Intune admin center / MGP / ZT portal — last conditionally included).

**Configuration-Caused Failures table pattern** (`admin-template-macos.md` lines 69-74) — COPY SHAPE:
```markdown
## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| [Setting X set to wrong value] | [ABM or Intune] | [What admin or user sees, and in which portal the symptom manifests] | [Runbook Title](../l1-runbooks/[runbook-filename].md) |
| [Setting Y missing] | [ABM or Intune] | [What happens] | [Runbook Title](../l1-runbooks/[runbook-filename].md) |
```
**Adaptation:** `Portal` column values: `Intune admin center | Managed Google Play | Zero-Touch portal`.

**Renewal/Maintenance section** (`admin-template-macos.md` lines 76-84) — ADAPT:
```markdown
<!-- Include this section ONLY if the guide's subject has a renewable component
     (e.g., ADE token, APNs certificate). Delete this entire section if not applicable. -->

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| [e.g., ADE token] | [e.g., 365 days] | [What stops working] | [Brief steps or link to renewal procedure] |
```
**Adaptation per D-20 + Open Question 4 Recommendation (CRITICAL divergence):**
- **REMOVE the subtractive-deletion HTML comment** — Renewal/Maintenance is MANDATORY by default for Android (unlike iOS where it's optional), because MGP binding and ZT reseller relationship always have renewal obligations.
- Seed the table with 2-3 example rows: MGP binding refresh, enrollment token rotation, ZT reseller contract. Downstream mode-specific guides customize per-mode applicability.

**See Also pattern** (`admin-template-macos.md` lines 86-90) — ADAPT:
```markdown
## See Also

- [Related macOS admin guide](link)
- [macOS ADE Lifecycle Overview](link)
- [Windows vs macOS Concept Comparison](../windows-vs-macos.md)
- [macOS Provisioning Glossary](../_glossary-macos.md)
```
**Adaptation:** Link targets `_glossary-android.md`, `00-enrollment-overview.md`, `02-provisioning-methods.md`, `03-android-version-matrix.md`. No link to `windows-vs-macos.md` (Android cross-platform comparison is v1.5 scope per AECOMPARE-01).

**Anti-pattern guards specific to this file:**
- **D-16** — Exactly three H4 portal sub-sections: `#### In Intune admin center`, `#### In Managed Google Play`, `#### In Zero-Touch portal`. Grep check: `grep -c "^#### In" docs/_templates/admin-template-android.md` ≥ 3.
- **D-17 verbatim comment** — Subtractive-deletion HTML comment for ZT uses the EXACT wording from CONTEXT.md D-17 (no paraphrasing). Grep check: `grep -B 1 "^#### In Zero-Touch portal" docs/_templates/admin-template-android.md` shows comment with "Delete this entire subsection for BYOD Work Profile and AOSP".
- **D-18** — MGP subsection is NOT wrapped in subtractive-deletion HTML comment. If author accidentally wraps it, grep check `grep -B 1 "^#### In Managed Google Play"` should NOT return a line starting with `<!--`.
- **D-19** — Every configurable setting has a `> **What breaks if misconfigured:**` callout. Grep check: `grep -c "What breaks if misconfigured" docs/_templates/admin-template-android.md` ≥ 2 (at least one per portal sub-section).
- **D-20** — Renewal/Maintenance section is present and NOT wrapped in subtractive HTML comment. Grep check: `grep -c "^## Renewal" docs/_templates/admin-template-android.md` = 1; confirm no `<!--` line immediately precedes.
- **No `supervised-only` or `🔒` glyphs** — these are iOS-specific (admin-template-ios.md lines 30-36). Android template must NOT copy the supervised-only callout pattern.
- **No Terminal/CLI steps** — matches admin-template-ios.md rule (line 13); Android has no required CLI admin step in this template.

---

## Shared Patterns

Cross-cutting patterns that apply to multiple Phase 34 deliverables. The planner should apply these across all relevant plans.

### Frontmatter with 60-day review cycle
**Source analog:** `docs/_templates/admin-template-ios.md` lines 18-23 (iOS uses 90-day; Android adapts to 60-day per D-14, D-21, D-33)
**Apply to:** All 5 Phase 34 files
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD  # = last_verified + 60 days, NOT 90
audience: [admin | all]
platform: [Android | all]
---
```
**Rules per D-14, D-21, D-33:**
- `review_by` is exactly 60 days after `last_verified` (not 90 like macOS/iOS).
- `platform: Android` for files specific to Android (template, enrollment overview, matrices); `platform: all` for glossary (cross-platform link target).
- `audience: admin` for template; `audience: all` for glossary, enrollment overview, matrices.
- **NEVER include `min_android_version` frontmatter key anywhere** (D-31).

**Load-bearing file:** `docs/android-lifecycle/03-android-version-matrix.md` — its `last_verified` is the Phase 42 milestone audit anchor (D-33).

### Cross-platform / platform-gate blockquote at top of page
**Source analog:** `docs/_glossary-macos.md` lines 9-10, `docs/ios-lifecycle/00-enrollment-overview.md` line 9, `docs/_templates/admin-template-macos.md` lines 25-27
**Apply to:** All 5 Phase 34 files (always the first content after frontmatter)
```markdown
> **Platform coverage:** [or **Platform gate:** or **Version gate:** — use the form that matches the analog for this file type.] [Scope description.] For [other platform] terminology, see [sibling link].
```

### Anchor stability registry (Pitfall 7 guard)
**Source:** Pitfall 7 in RESEARCH.md lines 479-486
**Apply to:** enrollment-overview, glossary, provisioning-methods, version-matrix
Phase 35-42 cross-references depend on these exact anchors. Authors must ensure H2/H3 heading text produces these anchors (or use explicit `<a id="...">` tags):

- **enrollment-overview:** `#two-axes-of-android-enterprise`, `#for-admins-familiar-with-ios`, `#fully-managed-cobo`, `#byod-work-profile`, `#dedicated-cosu`, `#zero-touch-enrollment-zte`, `#aosp`
- **glossary:** `#cobo`, `#cope`, `#wpco`, `#byod`, `#fully-managed`, `#work-profile`, `#dedicated`, `#supervision`, `#user-enrollment`, `#corporate-identifiers`, `#managed-google-play`, `#zero-touch-enrollment`, `#play-integrity`, `#afw-setup` (GitHub strips `#`), `#dpc`, `#amapi`, `#managed-home-screen`, `#entra-shared-device-mode`, `#emm`
- **provisioning-matrix:** `#nfc`, `#qr`, `#afw-setup`, `#zero-touch`, `#samsung-kme-mutual-exclusion`
- **version-matrix:** `#cobo`, `#byod`, `#dedicated`, `#zte`, `#aosp`, `#android-11-breakpoint`, `#android-12-breakpoint`, `#android-15-breakpoint`, `#non-version-breakpoints`

### Deferred-file link prohibition (Pitfall 8 guard)
**Source:** Pitfall 8 in RESEARCH.md lines 489-495
**Apply to:** All 5 Phase 34 files
**NEVER link from Phase 34 deliverables to:**
- `docs/common-issues.md` (Android integration post-v1.4)
- `docs/quick-ref-l1.md`
- `docs/quick-ref-l2.md`
- `docs/index.md` (Phase 42 stub handles the Android entry)

**Read-only cross-refs permitted (allowed):**
- `docs/_glossary.md` (Windows glossary — terminology cross-ref target)
- `docs/_glossary-macos.md` (Apple glossary — terminology cross-ref target; AEAUDIT-03 reciprocal-link work is Phase 42, not Phase 34)

Grep check per RESEARCH.md line 701:
```bash
grep -l -E "common-issues\.md|quick-ref-l1\.md|quick-ref-l2\.md" \
  docs/_glossary-android.md \
  docs/_templates/admin-template-android.md \
  docs/android-lifecycle/*.md
# Must return 0 files
```

### v1.0-v1.3 shared-file immutability (Pitfall 9 guard)
**Source:** RESEARCH.md line 702
**Apply to:** Entire Phase 34
Phase 34 creates only NEW files. It MUST NOT modify:
- `docs/_glossary-macos.md` (reciprocal-link stub is Phase 42 AEAUDIT-03 scope, not Phase 34)
- `docs/_glossary.md`
- `docs/common-issues.md`
- `docs/quick-ref-l1.md`
- `docs/quick-ref-l2.md`
- `docs/index.md`
- Any existing file under `docs/admin-setup-*/`, `docs/ios-lifecycle/`, `docs/macos-lifecycle/`, `docs/lifecycle/`, `docs/l1-runbooks/`, `docs/reference/`

Git check: `git diff --name-only master HEAD -- docs/_glossary-macos.md docs/_glossary.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/index.md` returns empty for Phase 34 commits.

### AEAUDIT-04 terminology hygiene (Pitfall 2 guard)
**Source:** RESEARCH.md lines 434-441
**Apply to:** Glossary + enrollment overview (primary), all other Phase 34 files (secondary)
**Rule:** "Supervision" / "supervised" appears ONLY in:
1. The `### Supervision` callout-only glossary entry (D-11)
2. The `## For Admins Familiar with iOS` enrollment-overview subsection (D-03)
3. Cross-reference links to `_glossary-macos.md#supervision`

Grep check: `grep -i "supervis" [file]` — every match must be in one of these three contexts. Any other occurrence is an AEAUDIT-04 violation.

### Anti-Pattern 4 glossary discipline (Pitfall 1 guard)
**Source:** RESEARCH.md lines 425-432
**Apply to:** Glossary only
**Rule:** Every glossary entry defines the Android term on its own merits FIRST (2-4 sentences, no "iOS"/"macOS"/"Windows"/"like supervision" in first sentence). Cross-platform callout blockquote comes AFTER the definition. Pattern format locked per D-10:
```markdown
### [Term]

[Android definition, 2-4 sentences, on own merits.]

> **Cross-platform note:** On [Windows/macOS/iOS], "[term]" refers to [different concept]. [Explanation or link]. Do not conflate.
```
Grep check: `grep -B1 "^> \*\*Cross-platform note:" docs/_glossary-android.md` — every match must have non-empty prose immediately preceding (not a heading line).

---

## No Analog Found

Two Phase 34 deliverables have no exact structural analog in v1.0-v1.3 docs. Their structure is a **novel artifact** composed from:
- Table-shape/frontmatter precedent from `docs/reference/ios-capability-matrix.md`
- Data-shape precedent from `.planning/research/FEATURES.md` research matrices (lines 329-336 for methods, 350-358 for versions)
- Design decisions D-23 through D-33 in CONTEXT.md which fully specify orientation, columns, and content gates

| File | Role | Authoring Pattern | Why No Analog |
|------|------|-------------------|---------------|
| `docs/android-lifecycle/02-provisioning-methods.md` | reference-matrix | mode×method with embedded version cells + Notes column + pre-table Samsung callout | No prior Android content; no iOS/macOS doc uses mode-row × provisioning-method-col orientation (iOS has single ADE path, so no matrix needed). Composite of `ios-capability-matrix.md` table shape + FEATURES.md data with orientation flipped per D-23. |
| `docs/android-lifecycle/03-android-version-matrix.md` | reference-matrix | 3-col breakpoints matrix + `## Version Breakpoint Details` narrative + `## Non-Version Breakpoints` supplementary | No prior platform has Android-scale version fragmentation concerns (iOS/macOS have tighter version-support matrices via Apple; Windows has WUfB version rings). Composite of `ios-capability-matrix.md` table shape + FEATURES.md data + D-30, D-32 narrative structure decisions. |

**Planner guidance for these two files:**
- Data authority is `.planning/research/FEATURES.md` lines 329-336 (methods) and 350-358 (versions), re-verified per RESEARCH.md Sources.
- Structural authority is CONTEXT.md D-23 through D-33 (matrix orientation, column set, cell rules, supplementary sections).
- Cross-reference authority is the anchor registry above (Shared Patterns → Anchor stability registry).

---

## Metadata

**Analog search scope:**
- `docs/_glossary-macos.md` (primary glossary analog — read in full)
- `docs/ios-lifecycle/00-enrollment-overview.md` (primary enrollment-overview analog — read in full)
- `docs/_templates/admin-template-ios.md` (primary template analog — read in full)
- `docs/_templates/admin-template-macos.md` (secondary template analog — read in full)
- `docs/reference/ios-capability-matrix.md` (matrix-shape analog — partial read, lines 1-80)
- Globs verified for matrices: `docs/**/*-matrix*.md`, `docs/ios-lifecycle/*.md`, `docs/macos-lifecycle/*.md`

**Files scanned:** 6 analogs read + ~12 globbed paths surveyed

**Pattern extraction date:** 2026-04-21

**Files created by this agent:** 1
- `.planning/phases/34-android-foundation/34-PATTERNS.md` (this file)

**Files modified by this agent:** 0 (read-only analog inspection; no source-code changes)
