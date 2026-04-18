# Phase 32: Navigation Integration & References - Pattern Map

**Mapped:** 2026-04-17
**Files analyzed:** 13 (7 modified docs + 1 new doc + 5 validation harness files)
**Analogs found:** 8/8 docs have strong in-repo analogs; 5/5 validation scripts have no in-repo analog (Wave 0 greenfield, but follow shell + grep/awk conventions from `scripts/`)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/reference/ios-capability-matrix.md` | reference (cross-platform comparison table) | content-fetch (read-only reference) | `docs/reference/macos-capability-matrix.md` | exact structural clone (+1 column + iOS rows + preamble) |
| `docs/_glossary-macos.md` (MODIFY) | shared Apple glossary | content-fetch (lookup) | `docs/_glossary-macos.md` itself (lines 20-64 H2/H3 pattern) | self-pattern — extend existing H2s + add new MAM H2 |
| `docs/common-issues.md` (MODIFY) | symptom-based router | content-fetch (navigation/routing) | `docs/common-issues.md` lines 152-201 (macOS ADE Failure Scenarios section) | exact structural clone — append parallel iOS H2 |
| `docs/index.md` (MODIFY) | docs hub | content-fetch (navigation) | `docs/index.md` lines 94-126 (macOS Provisioning section) | exact structural clone — append parallel iOS H2 with L1/L2/Admin tables |
| `docs/quick-ref-l1.md` (MODIFY) | L1 cheat sheet | content-fetch (quick recall) | `docs/quick-ref-l1.md` lines 83-113 (macOS ADE Quick Reference) | exact structural clone — append parallel iOS H2 |
| `docs/quick-ref-l2.md` (MODIFY) | L2 cheat sheet | content-fetch (quick recall) | `docs/quick-ref-l2.md` lines 132-178 (macOS ADE Quick Reference) | role-match (same H2 shape); iOS swaps Terminal block → 3-table no-CLI pattern |
| `docs/reference/00-index.md` (MODIFY) | reference-section router | content-fetch (navigation) | `docs/reference/00-index.md` lines 19-23 (macOS References H2) | exact structural clone — add parallel "iOS References" H2 |
| `docs/decision-trees/07-ios-triage.md` (MODIFY) | placeholder retrofit (single line) | static replacement | `docs/decision-trees/07-ios-triage.md:99` itself | self-edit — 1-line rewrite |
| `.planning/phases/32-.../validation/link-check.sh` | validation script | shell + grep/awk pipeline | None in-repo; RESEARCH.md §Validation Architecture stub | greenfield with spec |
| `.planning/phases/32-.../validation/anchor-collision.sh` | validation script | shell + grep/awk pipeline | None in-repo; RESEARCH.md stub | greenfield with spec |
| `.planning/phases/32-.../validation/reachability-audit.sh` | validation script | BFS graph traversal via shell | None in-repo; RESEARCH.md stub | greenfield with spec |
| `.planning/phases/32-.../validation/run-all.sh` | orchestrator script | shell sequencer | None in-repo; simple chain | greenfield |
| `.planning/phases/32-.../validation/expected-reachability.txt` | fixture (expected file list) | static newline-separated text | None in-repo | greenfield |

---

## Pattern Assignments

### 1. `docs/reference/ios-capability-matrix.md` (NEW reference doc, content-fetch, trilateral comparison matrix)

**Analog:** `docs/reference/macos-capability-matrix.md` (101 lines total)

**Frontmatter pattern** (lines 1-7):
```markdown
---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: both
audience: admin
platform: all
---
```

**H1 + intro narrative pattern** (lines 9-11):
```markdown
# Intune: macOS vs Windows Capability Matrix

This document compares Intune management capabilities between Windows and macOS across five operational domains. This is a feature parity analysis, not a terminology comparison -- for concept mapping between platforms, see [Windows vs macOS Concept Comparison](../windows-vs-macos.md). For macOS admin setup guides, see [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md).
```

**Bilateral table pattern** (lines 13-26, Enrollment domain — structural clone target):
```markdown
## Enrollment

| Feature | Windows | macOS |
|---------|---------|-------|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) |
| Hardware identity | 4KB hardware hash | Serial number |
| Enrollment types | User-driven, Pre-provisioning, Self-deploying, Hybrid Entra join | ADE with user affinity, ADE without user affinity |
| Pre-provisioning (White Glove) | Yes (APv1 only) | No |
| Self-deploying/kiosk enrollment | Yes (APv1) | Partially (ADE without user affinity) |
| Hybrid domain join | Yes (APv1 + Intune Connector) | No |
| Enrollment Status Page equivalent | ESP (device phase + user phase, itemized) | Await Configuration (single lock, generic progress) |
| ESP timeout configuration | Yes (admin-configurable) | No (no enforced timeout) |
| Dynamic enrollment groups | Yes (ZTDId attribute) | Yes (enrollmentProfileName attribute) |
| Re-enrollment fires blocking screen | Yes (every enrollment) | No (first enrollment only) |
```

**Key Gaps Summary pattern** (lines 78-88, 7 numbered gaps):
```markdown
## Key Gaps Summary

The most significant capability gaps for macOS compared to Windows are:

1. **No security baselines** -- admins must manually configure all security settings
2. **No app dependency or install order control** -- critical for complex deployments
3. **No app supersedence** -- cannot automatically replace old app versions
4. **No pre-provisioning (White Glove)** -- IT cannot pre-stage devices before user delivery
5. **Simpler but less granular Await Configuration** vs Windows ESP -- no per-app progress tracking
6. **Apps not removed on device retirement** -- explicit uninstall required before retiring
7. **No userless device compliance** -- compliance evaluation requires user affinity
```

**See Also footer + Version History pattern** (lines 90-101):
```markdown
## See Also

- [Windows vs macOS Concept Comparison](../windows-vs-macos.md) -- terminology mapping (not feature parity)
- [macOS Admin Setup Overview](../admin-setup-macos/00-overview.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md) -- Windows framework comparison

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- 5-domain capability matrix comparing Windows and macOS Intune management | -- |
```

**Key adaptations (per D-01 through D-10):**
- H1 text: "iOS/iPadOS: Intune Capability Matrix — Windows, macOS, iOS" (trilateral framing per D-02)
- Intro narrative: 2-4 sentence Apple-parity preamble per D-06. Insert link to sibling `macos-capability-matrix.md` and `windows-vs-macos.md`.
- **Every table adds a 3rd column** `| iOS |` — each domain table gets `| Feature | Windows | macOS | iOS |` header with iOS cell for every existing row PLUS iOS-specific rows per D-05.
- Enrollment domain adds rows: Supervision state, Supervised-only capability gates, Account-Driven User Enrollment, MAM-WE availability, ABM token shared with macOS (D-04, D-05).
- Configuration domain adds: DDM availability per platform (with iOS 17+ qualifier; works on supervised AND unsupervised per RESEARCH.md Pitfall 4), Home Screen Layout iOS-only, Wi-Fi supervised-only auto-join, iOS-only restrictions (AirDrop, Camera).
- App Deployment adds: VPP device-licensed vs user-licensed, LOB/IPA, silent install with `🔒 supervised ADE only` qualifier (D-05 + RESEARCH.md Pitfall 4).
- Compliance adds: Jailbreak detection iOS-only, OS version gate, passcode policy, default compliance posture.
- Software Updates adds minimum 3 iOS-bearing rows per RESEARCH.md Open Q3 (Managed SW Update via DDM iOS 17+ works supervised AND unsupervised; Deferral via Restrictions legacy; Deferral length per DDM).
- Inline `🔒 supervised-only` parenthetical in capability cells where gating depends on supervision state (D-04).
- Key Gaps Summary: 7-8 gaps per RESEARCH.md Open Q6 recommendation (No CLI diagnostic access; Supervision gates; No hybrid domain join; No registry/plist equivalent; No pre-provisioning; Jailbreak detection iOS-only; Single-channel MDM; Account-driven UE privacy limits).
- See Also footer updated: link to `macos-capability-matrix.md` (sibling bilateral view), `windows-vs-macos.md`, `admin-setup-ios/00-overview.md`, `ios-lifecycle/00-enrollment-overview.md`.
- Length target: 100-130 lines (D-10).

**Insertion point:** NEW FILE at `docs/reference/ios-capability-matrix.md`.

---

### 2. `docs/_glossary-macos.md` (MODIFY, shared Apple glossary, content-fetch lookup)

**Analog:** `docs/_glossary-macos.md` itself (self-pattern; extend existing H2s)

**Existing H2 structure** (verified via Read):
- Line 14-16: Alphabetical Index (6 terms currently)
- Line 20: `## Enrollment` H2 (ADE line 22, Await Configuration line 28, Setup Assistant line 34)
- Line 42: `## Device Management` H2 (ABM line 44, ABM Token line 50)
- Line 58: `## App Distribution` H2 (VPP line 60)
- Line 68: `## Version History` H2

**H3 term entry pattern** (lines 22-26, ADE — structural template for each new entry):
```markdown
### ADE

Automated Device Enrollment -- Apple's zero-touch enrollment mechanism for organization-owned macOS (and iOS/iPadOS) devices through Apple Business Manager. Devices assigned to an MDM server in ABM enroll automatically during Setup Assistant. Formerly known as DEP (Device Enrollment Program).

> **Windows equivalent:** [Windows Autopilot](_glossary.md#apv1) -- APv1 uses hardware hash registration and profile assignment; APv2 uses [Enrollment Time Grouping](_glossary.md#enrollment-time-grouping-etg). Both achieve zero-touch enrollment but use different identity mechanisms (serial number via ABM vs hardware hash upload to Intune).
```

**Windows-equivalent blockquote pattern** (verified at lines 26, 32, 38, 48, 54, 64 — MANDATORY for every new iOS term per D-15):
```markdown
> **Windows equivalent:** [description or "No direct equivalent..."]
```

**Alphabetical Index inline pattern** (line 16 — expand from 6 to 11 terms per D-14):
```markdown
[ABM](#abm) | [ABM Token](#abm-token) | [ADE](#ade) | [Await Configuration](#await-configuration) | [Setup Assistant](#setup-assistant) | [VPP](#vpp)
```

After D-14 expansion:
```markdown
[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)
```

**Platform coverage blockquote pattern** (lines 9-10 — update per D-41):
```markdown
> **Platform coverage:** This glossary covers macOS-specific provisioning and management terminology.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).
```

After D-41 update:
```markdown
> **Platform coverage:** This glossary covers Apple-platform provisioning and management terminology for macOS and iOS/iPadOS.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).
```

**Version History entry pattern** (lines 68-72):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-13 | Initial version -- 6 macOS terms with Windows cross-references | -- |
```

**Key adaptations (per D-11 through D-19):**
- **DO NOT rename** file (D-11 locked by Phase 26; 76 references across 29 files).
- **Frontmatter bump only** (D-17): `last_verified: <Phase 32 ship date>`, `review_by: +90d`. No field changes.
- **Platform coverage blockquote update** per D-41: suffix "and iOS/iPadOS" to coverage statement.
- **Alphabetical Index expansion** (D-14): from 6 → 11 entries; alphabetical order preserved.
- **Enrollment H2 additions** (D-13): insert `### Supervision` and `### Account-Driven User Enrollment` H3s — default alphabetical within section (A comes before S comes after existing entries; place A-D-UE before ADE line 22 if strict alpha, or append after Setup Assistant for logical grouping — planner's discretion per Claude's Discretion bullet).
- **Device Management H2 additions** (D-13): insert `### APNs` and `### Jailbreak Detection` H3s after ABM Token line 54.
- **App Distribution H2 update** (D-13): UPDATE VPP entry at lines 60-64 with iOS-specific sub-content: device-licensed vs user-licensed distinction; supervised-only silent install callout; cross-links to `admin-setup-ios/05-app-deployment.md` + `admin-setup-macos/04-app-deployment.md`. Preserve the existing `> **Windows equivalent:**` blockquote at line 64. Template in RESEARCH.md §Code Examples Example 2.
- **NEW H2 "App Protection (MAM)"** (D-13): inserted AFTER App Distribution H2, BEFORE Version History H2 (between line 64/66 and line 68). Contains single `### MAM-WE` H3 entry. Justification: Phase 26 D-03 separates MAM-WE from MDM paths — NOT under Enrollment H2.
- **Per-term Windows-equivalent blockquote** (D-15): every new entry ends with `> **Windows equivalent:** ...`. For iOS-only (MAM-WE, jailbreak detection): explicitly state "No direct equivalent" or closest parallel (e.g., "Intune App Protection Policies on Windows MAM-enrolled devices" for MAM-WE).
- **Per-term cross-platform scope flag in opening sentence** (D-16): "APNs — Apple's push notification service used by all Apple platforms (iOS, iPadOS, macOS, tvOS) for MDM command delivery..."
- **Do NOT touch existing ADE, Await Configuration, Setup Assistant, ABM, ABM Token entries** (D-18). Only VPP gets updated in App Distribution H2.
- **Version History entry** (D-40): append row `| 2026-04-XX | Phase 32: added iOS/iPadOS navigation integration -- supervision, MAM-WE, APNs, account-driven UE, jailbreak detection; updated VPP for iOS content; new App Protection (MAM) H2 | -- |`.

**Insertion points** (approximate — line numbers shift after edits):
- Line 6: frontmatter bump (`last_verified`, `review_by`)
- Line 9: platform coverage blockquote update (D-41 suffix)
- Line 16: Alphabetical Index expansion (D-14)
- Line 22 (or after line 38): insert `### Supervision` + `### Account-Driven User Enrollment` (Enrollment H2)
- Line 54 (after ABM Token): insert `### APNs` + `### Jailbreak Detection` (Device Management H2)
- Line 60-64: UPDATE VPP entry (D-13 rewrite; preserve existing Windows-equivalent blockquote)
- Line 66 (before Version History H2): NEW `## App Protection (MAM)` H2 + `### MAM-WE` H3
- Line 72 (Version History table): new row

---

### 3. `docs/common-issues.md` (MODIFY, symptom router, content-fetch/navigation)

**Analog:** `docs/common-issues.md` lines 152-201 (macOS ADE Failure Scenarios section)

**H2 platform-section pattern** (lines 152-158):
```markdown
## macOS ADE Failure Scenarios

> **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).

**Platform:** macOS ADE (Automated Device Enrollment)

Symptom-based index routing to the appropriate macOS L1 and L2 runbooks. Start with the [macOS ADE Triage Decision Tree](decision-trees/06-macos-triage.md) to identify the failure scenario.
```

**Symptom category H3 pattern** (lines 160-165, "Device Not Appearing in Intune" — template; note anchor collision risk):
```markdown
### Device Not Appearing in Intune

Mac serial number not found in Intune admin center after ADE enrollment attempt.

- **L1:** [Device Not Appearing](l1-runbooks/10-macos-device-not-appearing.md)
- **L2:** [macOS Log Collection](l2-runbooks/10-macos-log-collection.md) + case-by-case investigation
```

**Cross-reference banner pattern** (lines 23, 33, 49, 65, 144 — bidirectional one-line pattern per D-23):
```markdown
> **macOS:** For macOS device not appearing in Intune, see [macOS: Device Not Appearing](#device-not-appearing-in-intune).
```

**Platform selector pattern** (lines 14-17 — extend per D-24):
```markdown
## Choose Your Platform

- [Windows Autopilot Issues](#windows-autopilot-issues) -- Windows device provisioning failures (APv1 and APv2)
- [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios) -- macOS enrollment and management failures
```

After D-24 extension:
```markdown
- [iOS/iPadOS Failure Scenarios](#iosipados-failure-scenarios) -- iOS/iPadOS enrollment and management failures via Intune
```

**Version History pattern** (lines 202-209):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-15 | Added macOS ADE Failure Scenarios section, platform selector, cross-reference banners; updated title and frontmatter for cross-platform coverage | -- |
```

**Key adaptations (per D-20 through D-25):**
- **APPEND new H2 `## iOS/iPadOS Failure Scenarios` after line 201** (current end of macOS section), BEFORE `## Version History` (line 202).
- **Bidirectional banners at top of new iOS H2**: one `> **Windows:**` + one `> **macOS:**` (two banners since iOS is a third platform — matches macOS which has one `> **Windows:**` banner; iOS gets banners to both siblings).
- **Six symptom categories (D-22)** with **symptom-descriptive names, NOT cause-names**:
  1. "Device Not Appearing in Intune" → L1 runbooks 16/17/19 + L2 14/15
  2. "ADE Setup Assistant Not Completing" → L1 17 + L2 14/15
  3. "Enrollment Blocked by Configuration" → L1 18+20 (reciprocal disambiguation)
  4. "User License Not Present" → L1 19
  5. "Device Enrollment Cap Reached" → L1 20
  6. "Compliance / Access Blocked" → L1 21 + L2 17
- **Anchor-collision resolution (RESEARCH.md §Pitfall 1)**: use `### iOS: [symptom]` heading text to produce `#ios-[slug]` anchors, e.g., `### iOS: Device Not Appearing in Intune` → `#ios-device-not-appearing-in-intune`. Colliding names: `#device-not-appearing-in-intune` (line 160), `#configuration-profile-not-applied` (line 174), `#compliance-failure-or-access-blocked` (line 188). Uniform `iOS: ` prefix recommended per Research Open Question 1.
- **7th block: MAM-WE advisory** (D-21) — NOT a symptom route. Heading `### App Protection Policies Not Applying (MAM-WE)` with advisory blockquote:
  ```markdown
  > **Advisory:** MAM-WE-specific L1/L2 runbooks are deferred to **ADDTS-01** future milestone. For the configuration guide, see [MAM-WE App Protection Policies](admin-setup-ios/09-mam-app-protection.md).
  ```
- **Platform selector update** (D-24) — add third entry at line 17 for `#iosipados-failure-scenarios`.
- **Three cross-reference banners in existing Windows sections** (D-23):
  - Line 33 (Device Registration Issues): add `> **iOS:** For iOS enrollment failures, see [iOS: Device Not Appearing in Intune](#ios-device-not-appearing-in-intune).`
  - Line 49 (Profile Assignment Issues): add `> **iOS:** For iOS configuration/restriction issues, see [iOS: Enrollment Blocked by Configuration](#ios-enrollment-blocked-by-configuration).`
  - Line 144 (Security and Enrollment Issues): add `> **iOS:** For iOS CA/compliance timing, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).`
- **macOS section also gets reciprocal iOS banners added** (D-23 bidirectional) — at macOS symptom entries that have iOS equivalents (e.g., line 160 gets a `> **iOS:**` banner above it).
- **Platform coverage blockquote at line 9** (D-25 + D-41): update to "...Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, and iOS/iPadOS."
- **NO H1 rename** (D-25) — "Common Provisioning Issues" already cross-platform-neutral.
- **NO frontmatter structural change** (D-25) — `platform: all` already set. Bump `last_verified` + `review_by` only.
- **Version History entry** (D-40): append `| 2026-04-XX | Phase 32: added iOS/iPadOS Failure Scenarios section, platform selector entry, bidirectional iOS cross-reference banners; updated platform coverage blockquote | -- |`.

**Insertion points:**
- Line 2-3: frontmatter bump
- Line 9: platform coverage blockquote update
- Line 17: platform selector third entry
- Line 33, 49, 144: three banner inserts in Windows sections
- Near lines 160/174/188: reciprocal iOS banners above macOS symptom H3s
- Line 201-202: insert new `## iOS/iPadOS Failure Scenarios` H2 with 6 symptom H3s + MAM-WE advisory H3
- Line 209 (Version History): new row

---

### 4. `docs/index.md` (MODIFY, docs hub, content-fetch/navigation)

**Analog:** `docs/index.md` lines 94-126 (macOS Provisioning section)

**Platform H2 with L1/L2/Admin Setup subsections pattern** (lines 94-126):
```markdown
## macOS Provisioning

Troubleshooting, investigation, and setup guides for macOS Automated Device Enrollment (ADE) through Apple Business Manager. For terminology, see the [macOS Provisioning Glossary](_glossary-macos.md). For the complete enrollment pipeline, see the [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | Understand the 7-stage macOS enrollment pipeline from ABM registration through desktop |
| [macOS ADE Triage Decision Tree](decision-trees/06-macos-triage.md) | Start here -- identifies the macOS ADE failure scenario and routes to the correct runbook |
| [macOS L1 Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Scripted procedures for top macOS ADE enrollment failures (6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal) |
| [L1 Quick-Reference Card](quick-ref-l1.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS top checks, escalation triggers, and runbook links |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | End-to-end enrollment stages with behind-the-scenes technical detail |
| [macOS Terminal Commands Reference](reference/macos-commands.md) | Look up diagnostic commands (profiles, log show, system_profiler, IntuneMacODC) |
| [macOS Log Paths Reference](reference/macos-log-paths.md) | Find log file locations, unified log subsystems, and configuration profile paths |
| [Network Endpoints Reference](reference/endpoints.md#macos-ade-endpoints) | Required Apple and Microsoft URLs for ADE enrollment with test commands |
| [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) | Collect macOS diagnostic logs using IntuneMacODC and Terminal commands |
| [macOS L2 Runbooks](l2-runbooks/00-index.md#macos-ade-runbooks) | Investigation guides for profile delivery, app install, and compliance evaluation failures |
| [L2 Quick-Reference Card](quick-ref-l2.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS Terminal commands, log paths, and key diagnostic checks |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | Review the enrollment pipeline before configuring ABM and Intune |
| [Network Endpoints Reference](reference/endpoints.md#macos-ade-endpoints) | Verify firewall rules for all required ADE endpoints |
| [macOS Admin Setup Guides](admin-setup-macos/00-overview.md) | ABM configuration, enrollment profiles, configuration profiles, app deployment, compliance policies |
```

**Choose Your Platform pattern** (lines 16-20 — extend per D-26):
```markdown
## Choose Your Platform

- [Windows Autopilot](#windows-autopilot) -- Windows device provisioning via Autopilot (classic/APv1) and Device Preparation (APv2)
- [macOS Provisioning](#macos-provisioning) -- macOS device provisioning via Automated Device Enrollment (ADE) through Apple Business Manager
- [Cross-Platform References](#cross-platform-references) -- Glossaries, concept comparison, and shared resources
```

**Cross-Platform References table row pattern** (lines 131-144, line 144 for macos-capability-matrix):
```markdown
| [macOS Capability Matrix](reference/macos-capability-matrix.md) | Intune feature parity comparison between Windows and macOS across enrollment, configuration, apps, compliance, and updates |
```

**Platform coverage blockquote pattern** (lines 9-10):
```markdown
> **Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2) and macOS ADE provisioning.
> Not sure which framework applies? See [APv1 vs APv2](apv1-vs-apv2.md) for Windows or [Windows vs macOS](windows-vs-macos.md) for cross-platform.
```

**Key adaptations (per D-26 through D-28):**
- **APPEND new H2 `## iOS/iPadOS Provisioning` after line 127** (current end of macOS section via `---` horizontal rule), BEFORE `## Cross-Platform References` (line 129).
- **Preceded by `---` horizontal rule** (matching the `---` at line 92 between Windows and macOS sections and line 127 between macOS and Cross-Platform).
- **Intro narrative pattern**: mirror macOS line 96 — "Troubleshooting, investigation, and setup guides for iOS/iPadOS enrollment and management through Microsoft Intune. For terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For enrollment paths, see the [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md)."
  - **Start-here anchor is `ios-lifecycle/00-enrollment-overview.md`** per D-26, NOT `decision-trees/07-ios-triage.md` (triage tree is L1 step, overview is "what are the 4 paths" orientation).
- **Three subsections L1/L2/Admin Setup** (D-26), each with a table mirroring macOS structure:
  - **L1 table rows** (4 rows): iOS Enrollment Path Overview + iOS Triage Tree (`decision-trees/07-ios-triage.md`) + iOS L1 Runbooks (`l1-runbooks/00-index.md#ios-l1-runbooks` — note: baseline anchor may not exist yet per RESEARCH.md Pitfall 2) + L1 Quick-Ref iOS anchor (`quick-ref-l1.md#iosipados-quick-reference`).
  - **L2 table rows** (~5 rows): iOS Log Collection Guide (`l2-runbooks/14-ios-log-collection.md`) + iOS L2 Runbooks (`l2-runbooks/00-index.md#ios-l2-runbooks`) + L2 Quick-Ref iOS anchor (`quick-ref-l2.md#iosipados-quick-reference`) + Network Endpoints iOS sub-section reference (if exists post-Phase-30/31).
  - **Admin Setup table rows** (~6 rows): iOS Admin Setup Overview (`admin-setup-ios/00-overview.md`) + APNs/ABM Token/ADE Profile (link to `admin-setup-ios/01-apns-certificate.md`, etc.) + Config/Apps/Compliance guide links + BYOD/MAM guide links + iOS ADE Lifecycle (`ios-lifecycle/01-ade-lifecycle.md`) + **iOS Capability Matrix** (`reference/ios-capability-matrix.md`) — also added to Cross-Platform References per D-27 second entry.
- **Choose Your Platform entry added** (D-26) at line 19-20: `- [iOS/iPadOS Provisioning](#iosipados-provisioning) -- iOS/iPadOS device provisioning via Microsoft Intune (ADE, Device Enrollment, Account-Driven User Enrollment, MAM-WE)`.
- **Two new Cross-Platform References table entries** (D-27) at lines 131-144:
  - `| [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md) | 4-path comparison with supervision axis (ADE, Device Enrollment, User Enrollment, MAM-WE) |`
  - `| [iOS Capability Matrix](reference/ios-capability-matrix.md) | Intune feature parity comparison across Windows, macOS, and iOS (NAV-03) |`
- **Platform coverage blockquote at line 9** (D-28 + D-41): "...Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, **and iOS/iPadOS**".
- **H1 narrative at line 14** (D-28): minor trilateral framing edit — "Troubleshooting, investigation, and setup guides for Windows Autopilot, macOS ADE, and iOS/iPadOS deployments."
- **Frontmatter bump** (D-40): `last_verified` + `review_by` bumped.
- **Version History entry** (D-40): append `| 2026-04-XX | Phase 32: added iOS/iPadOS Provisioning section (L1/L2/Admin Setup), iOS Capability Matrix + iOS Enrollment Path Overview Cross-Platform References entries, platform selector entry | -- |`.

**Insertion points:**
- Line 2-3: frontmatter bump
- Line 9: platform coverage blockquote
- Line 14: H1 narrative (trilateral edit)
- Line 19-20: platform selector third entry
- Line 127-128: `---` then new `## iOS/iPadOS Provisioning` H2 with 3 sub-H3 tables
- Line 131-144: two new Cross-Platform References rows
- Line 149 (Version History table): new row

---

### 5. `docs/quick-ref-l1.md` (MODIFY, L1 cheat sheet, content-fetch/quick recall)

**Analog:** `docs/quick-ref-l1.md` lines 83-113 (macOS ADE Quick Reference section)

**Append-at-bottom platform H2 pattern** (lines 81-113):
```markdown
---

## macOS ADE Quick Reference

**Platform:** macOS ADE (Automated Device Enrollment)

### Top Checks

1. **Device in ABM?** -- Apple Business Manager > Devices -- search by serial number, verify MDM server assignment shows your Intune MDM server name
2. **Device in Intune?** -- Intune admin center > Devices > macOS -- search by serial number, check enrollment status
3. **Enrollment profile assigned?** -- Intune > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles -- verify profile is assigned to the device
4. **Compliance state?** -- Intune > Devices > macOS > [device] > Device compliance -- check for "Compliant" or review non-compliant settings

### macOS Escalation Triggers

- Serial in ABM but device not in Intune after 24 hours --> **Escalate L2** (collect: serial number, ABM MDM server assignment screenshot, Intune enrollment status)
- Setup Assistant stuck or authentication failure after one retry --> **Escalate L2** (collect: serial number, screenshot of error, macOS version)
- Configuration profile not applied after 4-hour sync wait and manual sync --> **Escalate L2** (collect: serial number, expected profile name, Intune device compliance screenshot)
- App showing "Failed" in Intune after reinstall attempt --> **Escalate L2** (collect: app name, app type, Intune app install status screenshot)
- Device non-compliant but user believes settings are correct --> **Escalate L2** (collect: non-compliant setting names, device serial)

### macOS Decision Tree

- [macOS ADE Triage](decision-trees/06-macos-triage.md) -- start here for macOS ADE failures

### macOS Runbooks

- [Device Not Appearing](l1-runbooks/10-macos-device-not-appearing.md)
- [Setup Assistant Failed](l1-runbooks/11-macos-setup-assistant-failed.md)
- [Profile Not Applied](l1-runbooks/12-macos-profile-not-applied.md)
- [App Not Installed](l1-runbooks/13-macos-app-not-installed.md)
- [Compliance / Access Blocked](l1-runbooks/14-macos-compliance-access-blocked.md)
- [Company Portal Sign-In](l1-runbooks/15-macos-company-portal-sign-in.md)
```

**Key adaptations (per D-29, D-30, D-33):**
- **APPEND new H2 `## iOS/iPadOS Quick Reference` after line 113** (current end of macOS section), BEFORE `## Version History` (line 115).
- **Preceded by `---` horizontal rule** (matching line 81 between APv2 and macOS sections).
- **Top Checks: exactly 4 items** (D-30 + referee F-D1-06: match macOS count precisely; RESEARCH.md Open Q3 confirms 4-not-5):
  1. Device in ABM (for ADE-path) OR User licensed (for BYOD-path) — branching statement acknowledging iOS dual-path nature
  2. Device in Intune (iOS/iPadOS)
  3. Enrollment profile assigned (ADE-path; Intune > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles)
  4. Compliance state
- **iOS Escalation Triggers: 4-5 bullets** (Claude's Discretion per Research A3; macOS has 5 triggers; match macOS style: symptom → **Escalate L2** (collect: ...) format).
- **iOS Decision Tree link**: single bullet to `decision-trees/07-ios-triage.md`.
- **iOS Runbooks list: 6 bullets** for L1 runbooks 16-21:
  - iOS APNs Certificate Expired (l1-runbooks/16-ios-apns-expired.md)
  - iOS ADE Not Starting (l1-runbooks/17-ios-ade-not-starting.md)
  - iOS Enrollment Restriction Blocking (l1-runbooks/18-ios-enrollment-restriction-blocking.md)
  - iOS License Invalid (l1-runbooks/19-ios-license-invalid.md)
  - iOS Device Cap Reached (l1-runbooks/20-ios-device-cap-reached.md)
  - iOS Compliance Blocked (l1-runbooks/21-ios-compliance-blocked.md)
- **Platform coverage blockquote at line 9** (D-33 + D-41): add "and iOS/iPadOS" suffix.
- **Frontmatter bump** (D-40): `last_verified` + `review_by`.
- **Version History entry** (D-40): append row.

**Insertion points:**
- Line 2-3: frontmatter bump
- Line 9: platform coverage blockquote
- Line 113-114: `---` then new `## iOS/iPadOS Quick Reference` H2 (~30 lines)
- Line 119 (Version History table): new row

---

### 6. `docs/quick-ref-l2.md` (MODIFY, L2 cheat sheet, content-fetch/quick recall)

**Analog:** `docs/quick-ref-l2.md` lines 132-178 (macOS ADE Quick Reference section)

**Append-at-bottom platform H2 pattern** (lines 130-178):
```markdown
---

## macOS ADE Quick Reference

**Platform:** macOS ADE (Automated Device Enrollment)

### macOS Log Collection

Download and run IntuneMacODC:

```bash
curl -L https://aka.ms/IntuneMacODC -o IntuneMacODC.sh
chmod u+x ./IntuneMacODC.sh
sudo ./IntuneMacODC.sh
```

### Key Terminal Commands

```bash
# Check MDM enrollment status
profiles status -type enrollment
# List installed configuration profiles
sudo profiles show
# ...
```

### Critical Log Paths

| Path | Purpose |
|------|---------|
| `/Library/Logs/Microsoft/Intune/IntuneMDMDaemon*.log` | Intune daemon -- PKG/DMG installs, scripts, policy |
| `~/Library/Logs/Microsoft/Intune/IntuneMDMAgent*.log` | Intune agent -- user-context scripts, user policy |
| `/Library/Logs/Microsoft/Intune/CompanyPortal*.log` | Company Portal enrollment, registration, compliance |

### macOS Investigation Runbooks

- [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) -- prerequisite for all macOS investigations
- [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)
- [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)
- [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)
```

**Callout blockquote pattern (at top of section — "Important" / "Note" style)** (line 82, APv2 section):
```markdown
> **Important:** APv2 does NOT use `mdmdiagnosticstool.exe` for log collection. Use the BootstrapperAgent event log and IME log folder below.
```

**Key adaptations (per D-29, D-31, D-32, D-33):**
- **APPEND new H2 `## iOS/iPadOS Quick Reference` after line 178** (current end of macOS section), BEFORE `## Version History` (line 180).
- **Preceded by `---` horizontal rule** (matching line 130).
- **Opens with "no CLI" callout blockquote** (D-31):
  ```markdown
  > **Important:** iOS has NO CLI diagnostic tool. No equivalent to `mdmdiagnosticstool.exe` (Windows) or `profiles` / `log show` (macOS). Diagnostic data is fragmented across three tiered methods — see below.
  ```
- **STRUCTURAL DIVERGENCE from macOS section**: iOS section has NO `bash` code block (no Terminal commands). Replaces macOS's Log Collection + Key Terminal Commands subsections with 3 tables:
  1. **iOS Diagnostic Data Collection** table (3 rows: MDM diagnostic report / Company Portal log upload / Mac+cable sysdiagnose) — columns: Method | Who Triggers | L2 Access Path | When to Use.
  2. **Key Intune Portal Paths (iOS L2)** table (4 rows: ABM tokens / APNs certificate / Enrollment restrictions / iOS apps) — columns: Path | Purpose.
  3. **Sysdiagnose Trigger Reference (iOS/iPadOS)** table (3 rows per D-31 + optional modern unified row per RESEARCH.md Open Q4) — columns: Device | Trigger Combination.
- **Research-flag footnotes** (D-32) inline after each table:
  - After Diagnostic Data Collection table: `*(Full method details: [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md). Verify portal paths per Phase 30 D-32 / Phase 31 D-31 at execution time.)*`
  - After Intune Portal Paths table: `*(Verify paths per Phase 30 D-32 research flag — Microsoft Learn 2026-04 confirms current; re-verify before content lock-in.)*`
  - After Sysdiagnose Trigger Reference table: `*(Full procedure: [iOS Log Collection §Section 3](l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose). Verify triggers per Phase 31 D-30 at execution time.)*`
- **iOS Investigation Runbooks list**: 4 bullets for L2 runbooks 14-17:
  - iOS Log Collection Guide (l2-runbooks/14-ios-log-collection.md) -- prerequisite
  - ADE Token & Profile Delivery Investigation (l2-runbooks/15-ios-ade-token-profile.md)
  - App Install Failure Diagnosis (l2-runbooks/16-ios-app-install.md)
  - Compliance & CA Timing Investigation (l2-runbooks/17-ios-compliance-ca-timing.md)
- **Per RESEARCH.md Pitfall 4**: In the Key Intune Portal Paths table, ensure DDM managed software update path is NOT marked as supervised-only (only app install is supervised-only on iOS).
- **Per RESEARCH.md Open Q4**: Sysdiagnose Trigger table should prepend a "Modern iOS 15+ unified combo" row (both volume + Side/Top, 250ms) above the 3 per-device-type rows; per-device rows kept with "Legacy / pre-iOS 15" caveat.
- **Platform coverage blockquote at line 9** (D-33 + D-41): add "and iOS/iPadOS" suffix.
- **Frontmatter bump** (D-40): `last_verified` + `review_by`.
- **Version History entry** (D-40): append row.

**Insertion points:**
- Line 2-3: frontmatter bump
- Line 9: platform coverage blockquote
- Line 178-179: `---` then new `## iOS/iPadOS Quick Reference` H2 (~45-55 lines)
- Line 184 (Version History table): new row

---

### 7. `docs/reference/00-index.md` (MODIFY, reference-section router, content-fetch/navigation)

**Analog:** `docs/reference/00-index.md` lines 19-23 (macOS References H2)

**H2 subsection pattern** (lines 19-23):
```markdown
## macOS References

- [macOS Terminal Commands](macos-commands.md) — Terminal diagnostic commands for Intune and ADE (profiles, log show, system_profiler, IntuneMacODC)
- [macOS Log Paths](macos-log-paths.md) — Log file locations, configuration profile paths, and unified log subsystems
- [macOS Capability Matrix](macos-capability-matrix.md) — Intune feature parity comparison between Windows and macOS (MADM-06)
```

**Version History pattern** (lines 55-58):
```markdown
## Version History

| Date | Change |
|------|--------|
| 2026-04-14 | Added macOS Capability Matrix to macOS References section |
| 2026-04-13 | Initial version — organizes all Phase 21 reference files by sub-domain |
```

**Key adaptations (per D-08):**
- **Insert new `## iOS References` H2** after macOS References H2 (after line 23), BEFORE `## Infrastructure Prerequisites` H2 (line 25).
- **Minimum 1 entry** (D-08): iOS Capability Matrix. Structure:
  ```markdown
  ## iOS References

  - [iOS Capability Matrix](ios-capability-matrix.md) — Intune feature parity comparison across Windows, macOS, and iOS (NAV-03)
  ```
- **Frontmatter bump** (D-40): `last_verified` + `review_by`.
- **Version History entry** (D-40): append row.

**Insertion points:**
- Line 2-3: frontmatter bump
- Line 23-24: insert new `## iOS References` H2 block
- Line 58 (Version History): new row

---

### 8. `docs/decision-trees/07-ios-triage.md` (MODIFY, placeholder retrofit, static replacement)

**Analog:** `docs/decision-trees/07-ios-triage.md:99` itself (single-line self-edit)

**Current line 99 pattern**:
```markdown
- [Apple Provisioning Glossary](../_glossary-macos.md) -- Shared Apple terminology (iOS glossary additions in Phase 32 NAV-01)
```

**Key adaptations (per D-35):**
- **Rewrite line 99** to concrete link with 5 iOS terms + 5 macOS terms inline:
  ```markdown
  - [Apple Provisioning Glossary](../_glossary-macos.md) -- Shared Apple terminology covering iOS/iPadOS ([supervision](../_glossary-macos.md#supervision), [MAM-WE](../_glossary-macos.md#mam-we), [APNs](../_glossary-macos.md#apns), [account-driven user enrollment](../_glossary-macos.md#account-driven-user-enrollment), [jailbreak detection](../_glossary-macos.md#jailbreak-detection)) and macOS ([ABM](../_glossary-macos.md#abm), [ADE](../_glossary-macos.md#ade), [VPP](../_glossary-macos.md#vpp), [Await Configuration](../_glossary-macos.md#await-configuration), [Setup Assistant](../_glossary-macos.md#setup-assistant))
  ```
- **Frontmatter bump** (D-40): `last_verified` + `review_by`.
- **Version History entry** (D-40): append row `| 2026-04-XX | Phase 32: resolved NAV-01 glossary placeholder at line 99 | -- |`.
- **Planner MUST re-run grep** (D-36) at plan time: `grep -rnE "Phase 32\|NAV-0[123]" docs/` — expected 1 match; retrofit any additional discoveries with identical resolution pattern.

**Insertion point:**
- Line 99: verbatim rewrite
- Frontmatter: `last_verified` + `review_by` bump
- Version History: new row at line 106 (table)

---

### 9-13. Validation Harness Scripts (NEW, Wave 0, shell + grep/awk/find)

**Analog:** No in-repo bash validation script matches exactly. RESEARCH.md §Validation Architecture Wave 0 Gaps provides authoritative stubs. The closest in-repo shell pattern is `scripts/Setup-Environment.ps1` (PowerShell) and `scripts/Install-Modules.ps1` — but those are PowerShell, not bash. For bash idioms, use standard `#!/usr/bin/env bash` + `set -euo pipefail` conventions.

#### 9. `validation/link-check.sh` (validation script, shell grep pipeline)

**Role:** Validates all `[text](path.md)` and `[text](path.md#anchor)` links in changed docs/ files resolve to existing files + existing anchors. Emits broken-link report with line numbers; exits 1 if any broken.

**Pattern source (spec):** RESEARCH.md lines 672-678 + §Validation Architecture.

**Structural template** (no existing in-repo bash script; follow POSIX bash conventions):
```bash
#!/usr/bin/env bash
set -euo pipefail

# Extract all markdown links from docs/; for each, verify target file exists
# and (if fragment) verify anchor exists in target file.
# Emits broken-link report with line numbers; exit 1 if any broken.

DOCS_ROOT="${DOCS_ROOT:-docs}"
EXIT_CODE=0

# Find all .md files (exclude _templates/)
while IFS= read -r -d '' md_file; do
  # Extract [text](link) patterns with line numbers
  grep -nE '\[[^]]+\]\(([^)]+\.md)(#[^)]+)?\)' "$md_file" | while IFS= read -r match; do
    line_num="${match%%:*}"
    link=$(echo "$match" | grep -oE '\(([^)]+\.md)(#[^)]+)?\)' | tr -d '()')
    target_file="${link%%#*}"
    anchor="${link#*#}"
    [ "$anchor" = "$link" ] && anchor=""
    # Resolve target relative to containing file
    target_dir=$(dirname "$md_file")
    target_path="$target_dir/$target_file"
    [ ! -f "$target_path" ] && echo "BROKEN: $md_file:$line_num -> $target_path (file not found)" && EXIT_CODE=1
    # Anchor check: slugify H2/H3 headings and compare
    # ... (slugify + match)
  done
done < <(find "$DOCS_ROOT" -name '*.md' -not -path '*/_templates/*' -print0)

exit $EXIT_CODE
```

**Key adaptations:**
- Anchor slugification MUST match GitHub-style (lowercase, spaces→hyphens, strip non-alphanumeric-except-hyphen) to detect the D-22 iOS anchor-collision pattern.
- Exclude `_templates/*.md` and `.planning/` per SC #4 scope.
- Report format: one broken-link per line, `FILE:LINE -> TARGET (reason)`.

#### 10. `validation/anchor-collision.sh` (validation script)

**Role:** Detects duplicate H2/H3 heading texts within single files that would produce ambiguous GitHub-auto-suffixed anchors.

**Pattern source (spec):** RESEARCH.md lines 681-685.

**Structural template:**
```bash
#!/usr/bin/env bash
set -euo pipefail

# For each docs/*.md, extract H2/H3 headings, count duplicates.
# Specifically flags common-issues.md for known macOS/iOS collision pattern.

DOCS_ROOT="${DOCS_ROOT:-docs}"
EXIT_CODE=0

while IFS= read -r -d '' md_file; do
  # Extract H2 and H3 heading text
  duplicates=$(grep -E '^#{2,3} ' "$md_file" | sed 's/^#\+ //' | sort | uniq -d)
  if [ -n "$duplicates" ]; then
    echo "COLLISION in $md_file:"
    echo "$duplicates" | sed 's/^/  /'
    EXIT_CODE=1
  fi
done < <(find "$DOCS_ROOT" -name '*.md' -not -path '*/_templates/*' -print0)

exit $EXIT_CODE
```

**Key adaptations:**
- Targets the RESEARCH.md Pitfall 1 concern: macOS section already has `### Device Not Appearing in Intune`, `### Configuration Profile Not Applied`, `### Compliance Failure or Access Blocked` in `common-issues.md`. iOS must use `### iOS: ...` prefixes to avoid collisions.
- Script should exit 0 after Phase 32 execution (iOS prefix disambiguates all collisions).

#### 11. `validation/reachability-audit.sh` (validation script, BFS graph traversal)

**Role:** Breadth-first traversal from `docs/index.md` following markdown links; emits per-file depth; validates D-34 ≤2-click reachability for all iOS files.

**Pattern source (spec):** RESEARCH.md lines 688-693.

**Structural template:**
```bash
#!/usr/bin/env bash
set -euo pipefail

# BFS from docs/index.md following markdown links.
# Emit "file | depth | path-taken" for every .md in docs/.
# Expected Phase 32 output: every iOS file has depth ≤2.

ROOT="${ROOT:-docs/index.md}"
declare -A VISITED
QUEUE=("$ROOT:0:START")
MAX_DEPTH="${MAX_DEPTH:-2}"

while [ ${#QUEUE[@]} -gt 0 ]; do
  entry="${QUEUE[0]}"
  QUEUE=("${QUEUE[@]:1}")
  file="${entry%%:*}"
  rest="${entry#*:}"
  depth="${rest%%:*}"
  path="${rest#*:}"
  [ -n "${VISITED[$file]:-}" ] && continue
  VISITED[$file]="$depth:$path"
  [ "$depth" -ge "$MAX_DEPTH" ] && continue
  # Extract links; enqueue unvisited targets at depth+1
  # ...
done

# Emit results sorted by depth
for file in "${!VISITED[@]}"; do
  echo "$file | ${VISITED[$file]}"
done | sort -t'|' -k2 -n
```

**Key adaptations:**
- Depth 0 = index.md itself; depth 1 = direct links from index.md; depth 2 = links from depth-1 pages.
- Output diff-able against `expected-reachability.txt` fixture.
- D-34 scope: ~25 iOS files + glossary additions + new matrix MUST appear at depth ≤2.
- Regression check: ALL pre-existing Phase 20-25 files MUST still appear at their original depth.

#### 12. `validation/run-all.sh` (orchestrator script)

**Role:** Chains the 3 validation scripts; single entry point for wave gate.

**Structural template:**
```bash
#!/usr/bin/env bash
set -euo pipefail

HARNESS_DIR="$(dirname "$0")"

echo "=== link-check ==="
"$HARNESS_DIR/link-check.sh"

echo "=== anchor-collision ==="
"$HARNESS_DIR/anchor-collision.sh"

echo "=== reachability-audit ==="
"$HARNESS_DIR/reachability-audit.sh" | diff - "$HARNESS_DIR/expected-reachability.txt"

echo "=== all checks passed ==="
```

**Key adaptations:**
- Exit 1 on any subscript failure (inherits `set -e`).
- Reachability audit diffed against fixture for exact-match validation.

#### 13. `validation/expected-reachability.txt` (fixture)

**Role:** Expected per-file depth-from-index fixture; diff target for `reachability-audit.sh`.

**Structural template:** Plain newline-separated list of `file | depth | path-taken` entries.
```
docs/index.md | 0 | START
docs/_glossary-macos.md | 1 | docs/index.md -> docs/_glossary-macos.md
docs/admin-setup-ios/00-overview.md | 1 | docs/index.md -> docs/admin-setup-ios/00-overview.md
docs/admin-setup-ios/01-apns-certificate.md | 2 | docs/index.md -> docs/admin-setup-ios/00-overview.md -> docs/admin-setup-ios/01-apns-certificate.md
docs/reference/ios-capability-matrix.md | 1 | docs/index.md -> docs/reference/ios-capability-matrix.md
...
```

**Key adaptations:**
- Enumerate all ~25 iOS files per D-34 scope:
  - `docs/ios-lifecycle/00-enrollment-overview.md` + `01-ade-lifecycle.md`
  - `docs/admin-setup-ios/00-overview.md` through `09-mam-app-protection.md`
  - `docs/l1-runbooks/16-ios-*.md` through `21-ios-*.md`
  - `docs/l2-runbooks/14-ios-*.md` through `17-ios-*.md`
  - `docs/decision-trees/07-ios-triage.md`
  - `docs/_glossary-macos.md`
  - `docs/reference/ios-capability-matrix.md` (new)
- PLUS regression sentinels: include ~10 pre-existing Phase 20-25 files at their original depths to verify no regression.

**Insertion point:** NEW file at `.planning/phases/32-navigation-integration-references/validation/expected-reachability.txt`.

---

## Shared Patterns

### Frontmatter Schema (applies to every touched doc + new doc)

**Source:** `docs/_glossary-macos.md:1-7` (and 116 other docs; Phase 20 D-07/D-08 lock)
**Apply to:** All 7 modified docs + 1 new doc
```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD (last_verified + 90d)
applies_to: both
audience: all | admin | L1 | L2
platform: all
---
```
**Per D-40:** Every touched doc gets `last_verified` + `review_by` bumped to Phase 32 ship date + 90d. No schema changes.

### Platform Coverage Blockquote Preamble (D-41)

**Source:** `docs/common-issues.md:9-10`, `docs/index.md:9-10`, `docs/quick-ref-l1.md:9-10`, `docs/quick-ref-l2.md:9-10`, `docs/_glossary-macos.md:9-10`
**Apply to:** All shared docs (common-issues, index, quick-ref-l1, quick-ref-l2, _glossary-macos)
**Canonical suffix pattern (D-41):** "...Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, **and iOS/iPadOS**"

Example current state (common-issues.md:9):
```markdown
> **Platform coverage:** This guide covers Windows Autopilot (classic/APv1 and Device Preparation/APv2) and macOS ADE provisioning issues.
```

Example after D-41 update:
```markdown
> **Platform coverage:** This guide covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, and iOS/iPadOS provisioning issues.
```

### Cross-Reference Banner (D-23, bidirectional one-line pattern)

**Source:** `docs/common-issues.md:23, 33, 49, 65, 144, 154` (macOS/Windows bidirectional pattern) + `docs/decision-trees/00-initial-triage.md:9` (original precedent per Phase 25 D-06)
**Apply to:** common-issues.md Windows sections (D-23) + common-issues.md macOS sections (reciprocal)
**Pattern:**
```markdown
> **[OtherPlatform]:** For [scenario] on [OtherPlatform], see [link text](path.md#anchor).
```

### Version History Table (D-40)

**Source:** Every doc file has one at bottom. Example `docs/common-issues.md:202-209`.
**Apply to:** All 7 modified docs + 1 new doc
**Per-touched-file template:**
```markdown
| 2026-04-XX | Phase 32: [concise per-file description] | -- |
```
Examples per file:
- glossary: `Phase 32: added iOS/iPadOS terms (supervision, MAM-WE, APNs, account-driven UE, jailbreak detection), updated VPP for iOS content, new App Protection (MAM) H2`
- common-issues: `Phase 32: added iOS/iPadOS Failure Scenarios section, platform selector entry, bidirectional iOS cross-reference banners`
- index: `Phase 32: added iOS/iPadOS Provisioning section (L1/L2/Admin Setup), iOS Capability Matrix + iOS Enrollment Path Overview Cross-Platform References entries`
- quick-ref-l1: `Phase 32: added iOS/iPadOS Quick Reference section with Top Checks, escalation triggers, decision tree link, and runbook links`
- quick-ref-l2: `Phase 32: added iOS/iPadOS Quick Reference section with 3-method diagnostic data collection table, Intune portal paths, sysdiagnose trigger reference`
- reference/00-index: `Phase 32: added iOS References section with iOS Capability Matrix`
- 07-ios-triage: `Phase 32: resolved NAV-01 glossary placeholder at line 99`
- NEW ios-capability-matrix.md: initial version entry `Phase 32: initial trilateral capability matrix — Windows, macOS, iOS across 5 domains`

### Windows-Equivalent Blockquote (D-15, glossary only)

**Source:** `docs/_glossary-macos.md:26, 32, 38, 48, 54, 64` (every existing H3 term ends with this blockquote)
**Apply to:** All 5 new iOS H3 term entries + updated VPP entry in _glossary-macos.md
**Pattern:**
```markdown
> **Windows equivalent:** [description OR "No direct equivalent..." OR "The closest parallel is ..."]
```
**Per D-15 special cases:**
- iOS-only terms (jailbreak detection): explicitly state "No direct equivalent."
- MAM-WE: "Intune App Protection Policies on Windows MAM-enrolled devices — functionally analogous but iOS VPN-free (no 'MAM-WE' branding on Windows)."
- Supervision: compare to macOS FileVault enforcement + Windows Autopilot pre-provisioning as the closest parallels.

### Research-Flag Footnote (D-32, quick-ref-l2 only)

**Source:** D-32 spec (new pattern; no in-repo precedent prior to Phase 32)
**Apply to:** quick-ref-l2.md iOS section Key Intune Portal Paths + Sysdiagnose Trigger tables
**Pattern:**
```markdown
*(Verify paths per Phase [30|31] D-[32|30|31] research flag — [verification note]; re-verify before content lock-in.)*
```

### iOS Anchor Prefix Convention (RESEARCH.md §Pitfall 1, Open Q1)

**Source:** RESEARCH.md Common Pitfalls Pitfall 1 + Open Question 1; symmetry with L1 runbook filename convention (`16-ios-*.md`)
**Apply to:** All iOS H3 headings in common-issues.md (D-22) + any iOS H3 headings elsewhere that would collide with macOS equivalents
**Pattern:**
```markdown
### iOS: [symptom description]
```
Produces anchor `#ios-[slug]`. Examples:
- `### iOS: Device Not Appearing in Intune` → `#ios-device-not-appearing-in-intune`
- `### iOS: Compliance / Access Blocked` → `#ios-compliance--access-blocked`
- `### iOS: Enrollment Blocked by Configuration` → `#ios-enrollment-blocked-by-configuration`

### Commit Grouping (D-37 single-file-commit + Specifics bullet commit plan)

**Source:** 32-CONTEXT.md `<specifics>` section commit grouping hint; D-37 single-file single-commit for placeholder retrofit
**Apply to:** All execution waves
**Suggested 7-commit plan:**
1. `docs(32): add iOS capability matrix` — creates ios-capability-matrix.md + updates reference/00-index.md + index.md Cross-Platform References
2. `docs(32): extend shared Apple glossary with iOS terms` — _glossary-macos.md only
3. `docs(32): inject iOS sections into common-issues.md` — common-issues.md only
4. `docs(32): inject iOS section into docs hub index` — index.md iOS Provisioning H2 (separate from matrix commit)
5. `docs(32): append iOS quick-reference sections to L1+L2 cards` — quick-ref-l1.md + quick-ref-l2.md
6. `docs(32): resolve Phase 32 glossary placeholder in iOS triage tree` — 07-ios-triage.md:99
7. `docs(32): reachability audit validation harness` — validation/ scripts + fixture

---

## No Analog Found

All in-scope docs have strong in-repo analogs. Validation harness scripts have NO in-repo bash script analog (Phase 32 introduces the Wave 0 validation pattern); use POSIX bash conventions + RESEARCH.md §Validation Architecture as the spec.

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `validation/link-check.sh` | validation | shell pipeline | No prior bash validation script; PowerShell is used in `scripts/` but not bash |
| `validation/anchor-collision.sh` | validation | shell pipeline | Same as above |
| `validation/reachability-audit.sh` | validation | BFS traversal | Same as above |
| `validation/run-all.sh` | orchestrator | shell chaining | Same as above |
| `validation/expected-reachability.txt` | fixture | plain text | No precedent fixture in `.planning/` tree |

**Guidance for planner:** Follow RESEARCH.md §Validation Architecture spec directly. Scripts MUST be portable POSIX bash (work on Git Bash on Windows per env). Use `#!/usr/bin/env bash` shebang + `set -euo pipefail`. Exclude `_templates/*.md` and `.planning/` from all scans.

---

## Metadata

**Analog search scope:** `docs/` (for all doc modifications), `.planning/phases/25-navigation-integration-polish/` (structural precedent), `.planning/phases/32-navigation-integration-references/` (validation harness spec)
**Files scanned:** 14 (all primary doc files read + RESEARCH.md + 2 Phase 25 PLANs + CONTEXT files)
**Pattern extraction date:** 2026-04-17
**Phase:** 32 — Navigation Integration & References
**Decision density:** 42 locked decisions (D-01 through D-42) across 4 Gray Areas
**Structural novelty:** LOW — 5 of 6 primary edits reuse Phase 25 patterns verbatim; only iOS capability matrix is substantive new content (structural clone of macos-capability-matrix.md + trilateral column addition + iOS-specific rows).
**Key execution risks mapped:** (a) anchor collision in common-issues.md → mitigated by `ios-` prefix; (b) Phase 30 Wave 3 dependency gap → planner must verify baseline at plan time; (c) portal-path staleness → mitigated by D-32 research-flag footnotes; (d) DDM/VPP supervision distinction → mitigated by D-05 per-row qualifiers.
