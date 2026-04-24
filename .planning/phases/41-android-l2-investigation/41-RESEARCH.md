# Phase 41: Android L2 Investigation - Research

**Researched:** 2026-04-23
**Domain:** Android Enterprise L2 investigation runbooks — log collection, enrollment diagnosis, app install diagnosis, compliance/CA timing
**Confidence:** HIGH (structural/anchor/line verification) / MEDIUM (adb commands, MGP state labels) / LOW (CA timing SLA)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Mode-first tiering for runbook 18 — single `## Method Selection by Enrollment Mode` block; method-to-data-type matrix carries `Primary Tool (by mode)` column not a single `Tier` column. BYOD pre/post-AMAPI disambiguation note included. COBO/Dedicated/ZTE: Microsoft Intune app primary.

**D-02:** Tool-landscape preamble — "no single Intune admin center per-device Download Diagnostics bundle for Android" framing, immediately after Context H2.

**D-03:** Method-to-data-type decision matrix with columns: `Method | Primary Tool (by mode) | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Confidence | Typical Latency`.

**D-04:** USB-debugging disabled-by-policy callout INCLUDED in Section 3 adb logcat opening.

**D-05:** Section order for runbook 18: Context → Tool Landscape → Decision Matrix → Method Selection by Mode → Section 1 CP logs → Section 2 Intune app logs → Section 3 adb logcat → Common Artifacts.

**D-07 through D-12:** Runbook 19 multi-mode 5-pattern structure (Pattern A BYOD / B COBO / C ZTE / D Dedicated / E tenant-config-universal) using Phase 31 D-07 B5 hybrid (Data Collection Steps 1-4 + Known Patterns + Resolution). Escalation packet: token sync status, profile assignment state, enrollment profile GUID. Graph API READ-ONLY preamble in Context.

**D-13 through D-15:** Runbook 20 direct Phase 31 D-11/D-12 mirror — three-class ⚙️/⏱️/🐛 disambiguation; MAM-WE exclusion cross-link.

**D-16 through D-21:** Runbook 21 Phase 31 D-14 hybrid axis mirror — config/timing/defect top + Per-Cause A/B/C/D deep-dive 1:1 to L1 runbook 25. Cause A SafetyNet callout variant (c): glossary-link-only, ZERO literal "SafetyNet" in runbook body. Play Integrity 3-tier ladder: "Basic integrity / Basic + Device integrity / Strong integrity (hardware-backed)". Cause C and A get Pareto-expanded content (~50%). "Not evaluated" terminal state gets explicit sub-section.

**D-22 through D-25:** Per-assertion confidence markers with section-level default for adb section. Command set: `adb logcat` (HIGH) + `adb shell dumpsys device_policy` (MEDIUM) + `adb shell pm list packages` (HIGH). Excluded: bugreport, am broadcast, pm grant-permissions, getprop wildcards.

**D-26:** Android L2 section in 00-index.md injected after iOS L2 section (after line 131 MAM-WE advisory block). MAM-WE advisory in index only.

**D-27:** L2 template platform enum extension one-line: `platform: Windows | macOS | iOS | all` → `platform: Windows | macOS | iOS | Android | all`.

**D-28:** 4-platform platform-gate banner: Windows / macOS ADE / iOS / Android.

**D-29:** Frontmatter schema: `last_verified: 2026-04-23`, `review_by: last_verified + 90d` (= 2026-07-22), all runbooks `applies_to: all`, `platform: Android`, `audience: L2`.

**D-30:** 10 L1→L2 placeholder retrofits — exact mapping table (see below).

**D-31:** Multi-commit grouping by source directory (3 commits for 10 files).

**D-32:** `last_verified` bump + Version History row on retrofit files. 60-day `review_by` on L1/admin retrofit files; 90-day on new L2 runbooks.

**D-34:** ZERO mods to `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/_glossary*.md`, admin-setup-ios/macos/apv2, end-user-guides, decision-trees, existing L2 runbooks 01-17. Only SINGLE LINE modification per L1 runbook and admin file for D-30 retrofits.

### Claude's Discretion

- Exact section numbering and subsection ordering within D-05 section order
- Exact Pattern A-E ordering in runbook 19 Analysis section
- Exact wording of runbook 19 Pattern sub-sections within D-07 scope and D-12 class-marker format
- Exact Cause C / Cause A Pareto-expanded content within D-20 budget
- Exact "MAM-WE Investigation Advisory" wording in 00-index.md Android section
- Exact wording of runbook 19 Graph API READ-ONLY preamble
- Per-runbook length (target: 18 → ~180-220 lines; 19 → ~260-320 lines; 20 → ~190-220 lines; 21 → ~230-260 lines)
- File-by-file judgment on admin-setup-android retrofit target specificity
- Exact filter-tag examples in `adb logcat` command set
- Whether `adb shell dumpsys device_policy` gets sub-section or inline code block

### Deferred Ideas (OUT OF SCOPE)

- Android capability matrix — Phase 42 AEAUDIT-01
- `docs/index.md` Android stub — Phase 42 AEAUDIT-02
- `_glossary-macos.md` see-also cross-reference — Phase 42 AEAUDIT-03
- Milestone mechanical audit — Phase 42 AEAUDIT-04
- Cross-platform nav integration (common-issues, quick-refs, full index) — post-v1.4 unification
- MAM-WE L2 runbooks — ADDTS-ANDROID-01 future milestone
- AOSP L2 investigation — v1.4.1
- Knox Mobile Enrollment L2 — AEKNOX future requirement
- Graph API write operations / DPC extras JSON mutation
- `adb bugreport`, `adb shell am broadcast`, `adb shell pm grant-permissions`, `adb shell getprop ro.build.*` wildcards
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEL2-01 | L2 can collect Android diagnostic logs using Company Portal logs, Microsoft Intune app logs, and adb logcat — confidence labels on any non-MS-Learn-sourced commands | Log collection methods verified against MS Learn; adb command confidence classified HIGH/MEDIUM; preamble claim verified |
| AEL2-02 | L2 can investigate Android work profile enrollment failure with structured diagnostic steps | Pattern A-E structure confirmed viable; Phase 39/37 anchor cross-references verified; escalation packet fields documented |
| AEL2-03 | L2 can investigate Android app install failure covering MGP app states, license assignment, MAM intersection | MGP app state terminology clarified; MS Learn troubleshooting guide confirmed; MAM-WE exclusion pattern established |
| AEL2-04 | L2 can investigate Android compliance and CA timing using Play Integrity verdicts (not SafetyNet) | Play Integrity verdict names VERIFIED against MS Learn; SafetyNet avoidance pattern confirmed from L1 runbook 25 |
| AEL2-05 | L2 index has Android section appended; existing sections untouched | 00-index.md line 131 injection point verified; current line count confirmed 152 |
</phase_requirements>

---

## Summary

Phase 41 delivers four Android L2 investigation runbooks (18-21) plus index append and 10 placeholder retrofits. The research confirms all structural precedents from Phase 31 iOS L2 apply directly, the critical anchor cross-references from Phase 37 (BYOD) and Phase 39 (ZTE) are verified-intact, all 10 D-30 retrofit line numbers match exactly, and the single highest-risk technical decision — the Intune admin center "Download Diagnostics" unavailability for Android MDM per-device — is confirmed by the official Collect Diagnostics MS Learn doc.

The most significant research finding is a **precision correction on the D-02 preamble claim**: the "no per-device Download Diagnostics for Android" statement is accurately scoped to MDM/enrollment-level diagnostics. The Intune admin center DOES support app protection (MAM) diagnostics for Android via `Troubleshooting + support > Troubleshoot > [user] > App Protection`, but this is MAM-scope only (Outlook, Teams, OneDrive, Edge) — NOT an MDM enrollment bundle. Runbook 18 Section 1 should clarify this distinction rather than stating a flat "no diagnostics" claim.

The adb command confidence labels (HIGH for `logcat`/`pm list packages`, MEDIUM for `dumpsys device_policy`) are the primary MEDIUM-confidence items in this phase. The CA timing first-evaluation window SLA of "approximately 15-30 minutes" is present in L1 runbook 25 Cause C verified text but is itself only MEDIUM-confidence against MS Learn (no explicit SLA documented; the number appears in community-sourced language in the existing L1 runbook).

**Primary recommendation:** Follow CONTEXT.md decisions exactly; use this research to populate factual claims with correct source tags and to confirm the 4 runbooks can be written with the verified material below.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Runbook 18 log collection — Company Portal logs | Device-side user action + Backend (Microsoft Support retrieval) | — | User initiates upload; L2 retrieves via MS Support ticket |
| Runbook 18 log collection — Microsoft Intune app logs | Device-side user action + MAM backend (admin-center retrievable) | — | Post-AMAPI BYOD primary; COBO/Dedicated/ZTE also Microsoft Intune app |
| Runbook 18 log collection — adb logcat | L2 workstation (USB-connected) | Device-side (USB debug must be enabled) | Physical access tier; BYOD only practical; device-owner-mode policy may block |
| Runbook 19 enrollment investigation | API / Backend (Intune admin center + Graph API read) | Device-side (via runbook 18 collection) | Enrollment state lives in Intune portal; Graph API supplements for GUID extraction |
| Runbook 20 app install investigation | API / Backend (Intune admin center + MGP portal) | Device-side (pm list packages via adb) | App assignment and license state in portal; device install status also visible in admin center |
| Runbook 21 compliance investigation | API / Backend (Intune compliance pane) | Device-side (Play Integrity verdict, OS version) | Compliance evaluation is Intune-side; Play Integrity verdict is device-attested |
| 00-index.md section append | Documentation (append-only) | — | Shared navigation file; append-only per D-26 and PITFALL 11 |
| D-30 placeholder retrofits | Documentation (single-line per file) | — | Forward-promise resolution per Phase 40 D-25 contract |

---

## Standard Stack

### Core (documentation phase — no npm/pip installation required)

| Artifact | Version/State | Purpose | Why Standard |
|----------|---------------|---------|--------------|
| `docs/l2-runbooks/18-android-log-collection.md` | NEW | Android L2 log collection | AEL2-01 |
| `docs/l2-runbooks/19-android-enrollment-investigation.md` | NEW | Android enrollment failure investigation | AEL2-02 |
| `docs/l2-runbooks/20-android-app-install-investigation.md` | NEW | Android MGP/LOB app install failure | AEL2-03 |
| `docs/l2-runbooks/21-android-compliance-investigation.md` | NEW | Android compliance/CA timing investigation | AEL2-04 |
| `docs/l2-runbooks/00-index.md` | APPEND (line 131+) | L2 index — Android section injection | AEL2-05 |
| `docs/_templates/l2-template.md` | ONE-LINE EDIT | Platform enum extension | D-27 |
| 6 × `docs/l1-runbooks/22-27-*.md` | SINGLE-LINE EDIT each | D-30 placeholder resolution | Phase 40 D-25 contract |
| `docs/android-lifecycle/03-android-version-matrix.md` | SINGLE-LINE EDIT | D-30 line 89 | Phase 40 forward-promise |
| 3 × `docs/admin-setup-android/03,04,05-*.md` | SINGLE-LINE EDIT each | D-30 placeholder resolution | Phase 40 forward-promise |

### Primary Structural Templates (read before writing)

| Template File | Runbook It Templates | Key Structural Elements |
|--------------|---------------------|------------------------|
| `docs/l2-runbooks/14-ios-log-collection.md` (185 lines, verified) | Runbook 18 | Context → Tool Landscape preamble → Decision Matrix → Tier sections → Common Artifacts Cross-Reference |
| `docs/l2-runbooks/15-ios-ade-token-profile.md` | Runbook 19 | Hybrid: Data Collection Steps 1-4 + Pattern A-D + Resolution |
| `docs/l2-runbooks/16-ios-app-install.md` | Runbook 20 | Three-Class Disambiguation block → Step 1 failure classification → per-scenario ⚙️/⏱️/🐛 markers |
| `docs/l2-runbooks/17-ios-compliance-ca-timing.md` | Runbook 21 | Investigation by Axis (Config/Timing/Defect) + Per-Cause Deep-Dive A/B/C |

---

## Architecture Patterns

### System Architecture Diagram

```
L1 Escalation (runbooks 22-27)
         │
         ▼
L2 receives escalation packet
(serial, UPN, mode, symptom, Cause A/B/C/D if classified)
         │
         ▼
┌────────────────────────────────────────────────────┐
│  Runbook 18: Android Log Collection Guide          │
│  ┌─────────────┐ ┌──────────────┐ ┌────────────┐  │
│  │ CP logs     │ │ Intune app   │ │ adb logcat │  │
│  │ (BYOD pre-  │ │ logs (BYOD   │ │ (all modes │  │
│  │ AMAPI OR    │ │ post-AMAPI / │ │ with USB   │  │
│  │ any mode)   │ │ COBO/Ded/ZTE)│ │ debug on)  │  │
│  └──────┬──────┘ └──────┬───────┘ └─────┬──────┘  │
│         │               │               │          │
│         └───────────────┴───────────────┘          │
│                    diagnostic bundle                │
└────────────────────────┬───────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  Investigation Routing │
            └─────┬──────┬──────┬───┘
                  │      │      │
           Enrollment  App    Compliance
                  │  Install     │
                  ▼      ▼      ▼
              RB 19   RB 20   RB 21
              (A-E)  (⚙️⏱️🐛) (Axis+
                              Cause A-D)
                  │      │      │
                  └──────┴──────┘
                         │
                         ▼
              Microsoft Support escalation packet
              (token sync, profile GUID, verdict data)
```

### Recommended File Structure for Phase 41

```
docs/l2-runbooks/
├── 00-index.md              # APPEND Android L2 section after line 131
├── 18-android-log-collection.md    # NEW
├── 19-android-enrollment-investigation.md  # NEW
├── 20-android-app-install-investigation.md # NEW
└── 21-android-compliance-investigation.md  # NEW
docs/_templates/
└── l2-template.md           # ONE-LINE EDIT: add Android to platform enum
docs/l1-runbooks/
├── 22-android-enrollment-blocked.md    # SINGLE LINE at line 73
├── 23-android-work-profile-not-created.md  # SINGLE LINE at line 96
├── 24-android-device-not-enrolled.md   # SINGLE LINE at line 80
├── 25-android-compliance-blocked.md    # SINGLE LINE at line 240
├── 26-android-mgp-app-not-installed.md # SINGLE LINE at line 92
└── 27-android-zte-enrollment-failed.md # SINGLE LINE at line 210
docs/android-lifecycle/
└── 03-android-version-matrix.md  # SINGLE LINE at line 89
docs/admin-setup-android/
├── 03-fully-managed-cobo.md   # SINGLE LINE at line 22
├── 04-byod-work-profile.md    # SINGLE LINE at line 19
└── 05-dedicated-devices.md    # SINGLE LINE at line 20
```

---

## Per-Runbook Requirements

### Runbook 18: `18-android-log-collection.md`

**Target length:** ~180-220 lines (iOS parallel 14 = 185 lines; Android adds mode-selection block and USB-debug callout)

**Frontmatter:**
```yaml
last_verified: 2026-04-23
review_by: 2026-07-22
applies_to: all
audience: L2
platform: Android
```

**Section structure (D-05 locked):**
1. Frontmatter
2. Platform-gate banner (D-28 4-platform)
3. `# Android Log Collection Guide` H1
4. `## Context` — L1 handoff block + scope framing
5. `## Tool Landscape` — D-02 preamble (exact wording per CONTEXT.md D-02)
6. `## Decision Matrix` — D-03 7-column table (Method / Primary Tool by mode / Who Triggers / Data Scope / L2 Access Path / Physical Requirements / Confidence / Typical Latency)
7. `## Method Selection by Enrollment Mode` — D-01 mode-first block
8. `## Section 1: Company Portal Logs`
9. `## Section 2: Microsoft Intune App Logs` — AMAPI April 2025 BYOD-primary note
10. `## Section 3: adb logcat` — D-04 USB-debug callout + D-22 section-level confidence block + D-24 commands
11. `## Common Artifacts Cross-Reference`
12. `## Related Resources`
13. `## Version History`

**Verified D-02 preamble claim:**
The official MS Learn "Collect Diagnostics" page confirms: for Android, the `Collect diagnostics` remote action supports only **app protection (MAM) scope** — not an MDM enrollment bundle. Supported Android apps: Outlook, Teams, OneDrive, Edge. This is NOT a per-device MDM enrollment diagnostic bundle equivalent to Windows `mdmdiagnosticstool.exe`. [VERIFIED: learn.microsoft.com/en-us/intune/device-management/actions/collect-diagnostics, 2026-04-21]

The preamble must be precise: "no Intune admin center per-device MDM enrollment diagnostic bundle for Android" — the MAM app-protection diagnostics path exists but is scoped to app protection logs, not MDM/enrollment data. Runbook 18 Section 1 may reference the MAM diagnostics path with this scope qualification.

**Verified log collection methods:**

*Company Portal logs (Android):*
- Navigation: Menu → Help → Send Logs → SEND LOGS, THEN EMAIL
- Alternative: when error appears, tap HELP or SEND INFO
- Save-to-file path: Settings → SAVE LOGS (requires file viewing app in work profile)
- Data scope: Company Portal app + Microsoft Authenticator logs combined bundle
- L2 access: incident ID → Microsoft Intune Support ticket (1-3 business days roundtrip)
- [VERIFIED: learn.microsoft.com/en-us/intune/user-help/diagnostics/collect-logs-android, updated 2026-04-08]

*Microsoft Intune app logs (Android):*
- Navigation: Menu → Help → Get Support → UPLOAD LOGS → EMAIL
- Alternative: when error appears, tap HELP or SEND INFO
- Data scope: Microsoft Intune app management logs
- L2 access: incident ID → same MS Intune Support ticket path
- [VERIFIED: learn.microsoft.com/en-us/intune/user-help/diagnostics/collect-logs-android, updated 2026-04-08]

*MAM app protection diagnostics (admin-center side — NOT an MDM bundle):*
- Navigation: Troubleshooting + support → Troubleshoot → [user] → Summary → App Protection → Checked-in → [...] → Collect diagnostics
- Download: Troubleshooting + support → Troubleshoot → [user] → Summary → Diagnostics → download
- Supported apps (Android): Outlook, Teams, OneDrive, Microsoft Edge
- Constraint: uploads >50 diagnostics or >4 MB not directly downloadable; require MS Intune Support
- Latency: ~30 minutes from trigger
- Role required: Help Desk Operator or School Administrator or custom role with Remote tasks/Collect diagnostics
- [VERIFIED: learn.microsoft.com/en-us/intune/device-management/actions/collect-diagnostics, 2026-04-21]

*adb logcat (Section 3):*
- Section-level default confidence: MEDIUM (Android Developer docs; not MS Learn comprehensive)
- Per-command confidence (D-22):
  - `adb logcat` — [HIGH, last_verified 2026-04-23] (universal Android Developer primary)
  - `adb shell dumpsys device_policy` — [MEDIUM, last_verified 2026-04-23] (output format shifts across Android 12/13/14/15; Android Developer docs only; Intune DPC-specific output not officially documented by Microsoft)
  - `adb shell pm list packages` — [HIGH, last_verified 2026-04-23] (universal Android Developer primary)

**adb logcat filter tags (MEDIUM confidence — community-sourced):**
The D-24 filter tag examples are sourced from Android Developer documentation and community Intune troubleshooting. Microsoft Learn does NOT comprehensively document adb filter tags for Intune-managed Android. Useful tags include:
- `DevicePolicyManager` — Android framework DPC interactions (Android Developer primary)
- `WorkProfileManager` — Work profile container management events [MEDIUM: community]
- `IntuneManagedAgent` or `MicrosoftIntune` — Intune agent log events [MEDIUM: community]
- Filter syntax: `adb logcat -s DevicePolicyManager:V WorkProfileManager:V`
All filter-tag examples in runbook 18 Section 3 MUST carry [MEDIUM, last_verified 2026-04-23] per-tag markers.

**USB debugging note (D-04 verified context):**
Android Enterprise device owner mode (COBO/Dedicated/ZTE) disables USB debugging via compliance policy. The Intune compliance settings page confirms: for personally owned work profile devices, there is a "Block USB debugging on device" compliance option — for fully managed/dedicated/corporate-owned work profile devices, USB debugging is "already disabled" by default. [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work, 2025-09-04]

### Runbook 19: `19-android-enrollment-investigation.md`

**Target length:** ~260-320 lines (iOS parallel 15 = ~220-280 lines; Android has 5 patterns vs iOS 4; mode-agnostic data collection steps add content)

**Frontmatter:** Same schema as runbook 18; `applies_to: all` (all enrollment modes).

**Verified Phase 37 BYOD anchor cross-references (D-07 Pattern A + Pattern E):**

| Anchor ID | Actual Line | Content at that line |
|-----------|------------|----------------------|
| `#enrollment-restrictions` | **84** | `<a id="enrollment-restrictions"></a>` — verified present [VERIFIED: codebase grep] |
| `#work-profile-policy` | **103** | `<a id="work-profile-policy"></a>` — verified present [VERIFIED: codebase grep] |
| `#privacy-boundary` | **148** | `<a id="privacy-boundary"></a>` — verified present [VERIFIED: codebase grep] |

**Verified Phase 39 ZTE anchor cross-references (D-07 Pattern C — LOCKED per Phase 39 D-17):**

| Anchor ID | Verified Present in `02-zero-touch-portal.md` |
|-----------|-----------------------------------------------|
| `#reseller-upload-handoff` | Line 133 `<a id="reseller-upload-handoff"></a>` — VERIFIED [VERIFIED: codebase grep] |
| `#device-claim-workflow` | Line 144 `<a id="device-claim-workflow"></a>` — VERIFIED [VERIFIED: codebase grep] |
| `#profile-assignment` | Line 157 `<a id="profile-assignment"></a>` — VERIFIED [VERIFIED: codebase grep] |
| `#kme-zt-device-claim` | Line 178 `<a id="kme-zt-device-claim"></a>` — VERIFIED [VERIFIED: codebase grep] |
| `#configuration-must-be-assigned` | Line 189 `<a id="configuration-must-be-assigned"></a>` — VERIFIED [VERIFIED: codebase grep] |

All 8 Phase 37/39 cross-reference anchors confirmed stable. No anchor drift detected.

**Verified Phase 40 L1 runbook 25 Cause anchor names (D-17 handoff block targets):**

| Anchor ID | Actual Heading in `25-android-compliance-blocked.md` |
|-----------|------------------------------------------------------|
| `#cause-a-play-integrity-verdict-failure` | `## Cause A: Play Integrity Verdict Failure {#cause-a-play-integrity-verdict-failure}` — VERIFIED line 48 [VERIFIED: codebase grep] |
| `#cause-b-os-version-policy-mismatch` | `## Cause B: OS Version Policy Mismatch {#cause-b-os-version-policy-mismatch}` — VERIFIED line 95 [VERIFIED: codebase grep] |
| `#cause-c-ca-timing-gap` | `## Cause C: CA Timing Gap (First Compliance Evaluation Pending) {#cause-c-ca-timing-gap}` — VERIFIED line 137 [VERIFIED: codebase grep] |
| `#cause-d-passcode-encryption-policy-mismatch` | `## Cause D: Passcode / Encryption / Work Profile Security Policy Mismatch {#cause-d-passcode-encryption-policy-mismatch}` — VERIFIED line 183 [VERIFIED: codebase grep] |

These anchor IDs MUST be reused verbatim in runbook 21's Per-Cause Deep-Dive headings (per D-17 "identical names to L1 Cause A/B/C/D section anchors").

**Runbook 19 L1 handoff routing (D-11 exact wording locked in CONTEXT.md):**
- L1 22 → Pattern E (Enrollment Restriction)
- L1 23 → Pattern A (Work Profile Not Created)
- L1 24 → start at Data Collection Step 1-4; then Pattern B / D as identified
- L1 27 → Pattern C (ZTE Device Claim Failure)
- No L1 escalation: begin at Data Collection Step 1

### Runbook 20: `20-android-app-install-investigation.md`

**Target length:** ~190-220 lines (iOS parallel 16 = 194 lines; Android MGP licensing slightly different from VPP but comparable depth)

**Frontmatter:** Same schema; `applies_to: all`.

**Managed Google Play app state labels:**

The MS Learn troubleshooting guide and admin center navigation do not use a tidy "license assigned / not licensed / pending approval / approval required" enum in a single UI location. The actual state vocabulary in the Intune admin center for MGP apps is:

- **Install status per device** (visible at Apps → [app] → Device install status): `Installed`, `Not installed`, `Failed`, `Pending`, `Not applicable`
- **App approval state** (Managed Google Play iFrame / portal state): `Approved` / `Unapproved` — apps must be approved before they can be assigned
- **Assignment type**: Required / Available / Uninstall
- **License model**: For paid apps: license assigned to user (user-based) or device (device-based); for free apps: no license management required
- MGP App in "Custom mode" (not visible in Play Store for users) vs "Basic mode" (auto-visible)

[MEDIUM: learn.microsoft.com/en-us/troubleshoot/mem/intune/app-management/troubleshoot-google-apps, 2026-04-17; learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play]

The exact L1 language from runbook 26 uses "license assigned / not licensed / pending approval / approval required" as symptom descriptions — these are L2's diagnostic vocabulary, not exact Intune UI labels. Runbook 20 should document the actual portal state labels (Installed/Not installed/Failed/Pending) alongside the approval and assignment states. Mark with [MEDIUM, last_verified 2026-04-23] on any specific portal-label claim.

**Three-class disambiguation (D-14 locked):**
- ⚙️ Config error: app not approved in MGP iFrame; app assignment scoped to wrong group; no MGP binding; Custom mode hiding app
- ⏱️ Timing issue: ~24-hour MGP sync delay; first-assignment propagation; user-MGP account binding delay after enrollment
- 🐛 Genuine defect: app consistently fails across multiple devices; MGP portal reports binding error; specific error code in device install status

**MAM-WE exclusion cross-link (D-15):** `> MAM-WE app protection policy failures: see [MAM-WE Advisory](00-index.md#android-mam-we-investigation-advisory)`

The anchor `#android-mam-we-investigation-advisory` is created BY Phase 41 in the new `## Android L2 Runbooks` section of `00-index.md`. Verify the anchor name matches exactly when writing the index section.

### Runbook 21: `21-android-compliance-investigation.md`

**Target length:** ~230-260 lines (iOS parallel 17 = ~230 lines; Android has 4 causes vs iOS 3; slightly more content due to Play Integrity 3-tier ladder detail)

**Frontmatter:** Same schema; `applies_to: all`.

**Verified Play Integrity verdict names in Intune compliance UI:**

From MS Learn compliance settings reference (verified 2025-09-04, last updated 2026-04-16):

- **"Check basic integrity"** — Basic integrity tier (most permissive; software-evaluated)
- **"Check basic integrity & device integrity"** — Basic + Device integrity tier (hardware-backed signals required)
- **"Check strong integrity"** (separate setting: "Check strong integrity using hardware-backed security features") — Strong integrity tier (hardware-backed + security patch < 12 months for Android 13+)

[VERIFIED: learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work, 2025-09-04]

The D-19 3-tier ladder "Basic integrity / Basic + Device integrity / Strong integrity (hardware-backed)" matches the current Intune UI terminology. Use exactly these labels in runbook 21 Cause A.

**Important September 30, 2025 strong integrity enforcement note:**
Google changed strong integrity requirements for Android 13+: requires hardware-backed security AND security patch from the last 12 months. Intune enforces from September 30, 2025. Some previously-compliant devices may now fail "Check strong integrity using hardware-backed security features" if their security patch is more than 12 months old. This is already documented in L1 runbook 25 Cause A and must be carried forward into runbook 21 Cause A L2-depth content. [VERIFIED: L1 runbook 25 shipped content, line 66-67; CITED: techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130]

**SafetyNet avoidance (D-18 locked):**
The exact wording from L1 runbook 25 Cause A (verified in shipped file at line 50):
> `"Android uses for compliance attestation (the legacy API was deprecated by Google in January 2025; Play Integrity is the current replacement)"`

Runbook 21 Cause A must follow this pattern — ZERO literal "SafetyNet" token in runbook body. Glossary cross-link only: `> See [Play Integrity](../_glossary-android.md#play-integrity) for...`

**Android compliance state strings in Intune UI:**
From L1 runbook 25 Cause C (verified in shipped file):
- `"Not evaluated"` — post-enrollment state before first compliance check (most common; < 30 min)
- `"In grace period"` — device is non-compliant but within a configured grace period
- `"Not compliant"` — failing compliance; failing settings listed in P-09 pane
- `"Compliant"` — passing

[VERIFIED: L1 runbook 25 Cause C shipped text, line 138-146; CITED: learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work]

**CA timing first-evaluation window SLA:**
L1 runbook 25 Cause C uses "within approximately 15-30 minutes" as the first-evaluation window. The MS Learn compliance overview does not state an explicit SLA for Android first evaluation. The 15-30 minute figure appears in community-supported guidance and is consistent with Intune compliance evaluation cycle documentation but is not a guaranteed SLA. [MEDIUM, last_verified 2026-04-23]

Runbook 21 Cause C should reference "typically 15-30 minutes" with a [MEDIUM] label and the escalation trigger "state remains 'Not evaluated' more than 30 minutes after enrollment completion" (consistent with L1 runbook 25 Cause C escalation-within-cause threshold).

**"Not evaluated" terminal state (D-21 — Android analog of iOS D-16):**
iOS D-16 covers APNs-blocked terminal state. Android equivalent causes for a stuck "Not evaluated" state:
- Play services network gap (no GMS connectivity; device cannot reach Google Play services for attestation)
- MDM check-in failure (device-to-Intune connectivity blocked; no agent check-in)
- Compliance policy assignment missing (no policy assigned + P-08 default posture = Not compliant → device shows Not compliant with EMPTY failing settings list, not "Not evaluated")
- GMS service disruption at Google (transient; rare)

The Microsoft Support escalation criteria for stuck "Not evaluated" should collect: device UPN, enrollment timestamp, P-09 compliance state screenshots, P-08 default posture toggle value, Play services version, network connectivity evidence. [MEDIUM: derived from iOS D-16 analog + Android compliance architecture knowledge, last_verified 2026-04-23]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Play Integrity tier disambiguation | Custom description of SafetyNet → Play Integrity mapping | Phase 34 `_glossary-android.md#play-integrity` cross-link | Glossary is canonical; cross-link satisfies D-18/D-19 without creating audit-grep risk |
| Provisioning method × mode matrix | Inline matrix in runbook 19 | Cross-link to `02-provisioning-methods.md` | Phase 34 D-26 Anti-Pattern 1; canonical matrix must not be duplicated |
| Android version × mode compatibility | Inline version table in runbook 21 Cause B | Cross-link to `03-android-version-matrix.md` | Phase 34 D-26 Anti-Pattern 1 |
| adb bugreport collection steps | Full bugreport procedure | Excluded from D-24 command set scope | Heavy artifact, PII-laden, MS Support coordination outside L2-standalone scope |
| CA timing exact SLA | Authoritative claim "SLA = 30 minutes" | "Typically 15-30 minutes [MEDIUM]" with escalation trigger at 30 min | No MS Learn explicit SLA; MEDIUM-label required |
| MGP app state label enum | Custom "license assigned / not licensed" table | Actual Intune portal labels (Installed/Failed/Pending) + approval state | MS Learn uses different labels than L1 runbook 26 symptom descriptions |

---

## Cross-Reference Anchor Verification Results

### Phase 37 BYOD Anchors (Runbook 19 Pattern A + E targets)

All three anchors verified present in `docs/admin-setup-android/04-byod-work-profile.md`:

| Anchor | Expected Line | Actual State |
|--------|--------------|--------------|
| `#enrollment-restrictions` | 84 | CONFIRMED — `<a id="enrollment-restrictions"></a>` at line 84 |
| `#work-profile-policy` | 103 | CONFIRMED — `<a id="work-profile-policy"></a>` at line 103 |
| `#privacy-boundary` | 148 | CONFIRMED — `<a id="privacy-boundary"></a>` at line 148 |

### Phase 39 ZTE Anchors (Runbook 19 Pattern C targets — LOCKED)

All five anchors verified present in `docs/admin-setup-android/02-zero-touch-portal.md`:

| Anchor | Actual Line | State |
|--------|------------|-------|
| `#reseller-upload-handoff` | 133 | CONFIRMED |
| `#device-claim-workflow` | 144 | CONFIRMED |
| `#profile-assignment` | 157 | CONFIRMED |
| `#kme-zt-device-claim` | 178 | CONFIRMED |
| `#configuration-must-be-assigned` | 189 | CONFIRMED |

### Phase 40 L1 Runbook 25 Cause Anchors (Runbook 21 D-17 handoff block targets)

All four anchors verified in `docs/l1-runbooks/25-android-compliance-blocked.md`:

| Anchor | Actual Line | Full Heading |
|--------|------------|--------------|
| `#cause-a-play-integrity-verdict-failure` | 48 | `## Cause A: Play Integrity Verdict Failure {#cause-a-play-integrity-verdict-failure}` |
| `#cause-b-os-version-policy-mismatch` | 95 | `## Cause B: OS Version Policy Mismatch {#cause-b-os-version-policy-mismatch}` |
| `#cause-c-ca-timing-gap` | 137 | `## Cause C: CA Timing Gap (First Compliance Evaluation Pending) {#cause-c-ca-timing-gap}` |
| `#cause-d-passcode-encryption-policy-mismatch` | 183 | `## Cause D: Passcode / Encryption / Work Profile Security Policy Mismatch {#cause-d-passcode-encryption-policy-mismatch}` |

These exact anchor IDs must be used in runbook 21 Per-Cause Deep-Dive heading attribute syntax `{#cause-a-...}` so that L1 runbook 25 D-17 handoff block links resolve.

---

## D-30 Retrofit Target Line Verification

All 10 placeholder lines verified at exact D-30 line numbers with no drift from Phase 40 ship:

| Source File | D-30 Line | Verified Content at That Line | Phase 41 Target |
|-------------|-----------|-------------------------------|-----------------|
| `l1-runbooks/22-android-enrollment-blocked.md` | 73 | "Android L2 investigation runbooks (Phase 41)..." | `19-android-enrollment-investigation.md#pattern-e-tenant-config-universal` + see-also `18-android-log-collection.md` |
| `l1-runbooks/23-android-work-profile-not-created.md` | 96 | "Android L2 investigation runbooks (Phase 41)..." | `19-android-enrollment-investigation.md#pattern-a-work-profile-not-created-byod` + see-also `18-android-log-collection.md` |
| `l1-runbooks/24-android-device-not-enrolled.md` | 80 | "Android L2 investigation runbooks (Phase 41)..." | `19-android-enrollment-investigation.md` (start at Data Collection Step 1-4) + see-also `18-android-log-collection.md` |
| `l1-runbooks/25-android-compliance-blocked.md` | 240 | "Android L2 investigation runbooks (Phase 41)..." | `21-android-compliance-investigation.md` (L1 Cause A→RB21 Cause A, Cause B→B, Cause C→C, Cause D→D per D-16 1:1) |
| `l1-runbooks/26-android-mgp-app-not-installed.md` | 92 | "Android L2 investigation runbooks (Phase 41)..." | `20-android-app-install-investigation.md` + see-also `18-android-log-collection.md` |
| `l1-runbooks/27-android-zte-enrollment-failed.md` | 210 | "Android L2 investigation runbooks (Phase 41)..." | `19-android-enrollment-investigation.md#pattern-c-zte-device-claim-failure` + see-also `18-android-log-collection.md` |
| `android-lifecycle/03-android-version-matrix.md` | 89 | "Compliance content ships with Phase 38...and Phase 41 (L2 investigation)..." | `21-android-compliance-investigation.md#cause-a-play-integrity-verdict-failure` |
| `admin-setup-android/03-fully-managed-cobo.md` | 22 | "L2 Desktop Engineering uses the Android L2 investigation runbooks (Phase 41 — not yet shipped)." | `00-index.md#android-l2-runbooks` |
| `admin-setup-android/04-byod-work-profile.md` | 19 | "L2 Desktop Engineering uses the Android L2 investigation runbooks (Phase 41 — not yet shipped)." | `00-index.md#android-l2-runbooks` |
| `admin-setup-android/05-dedicated-devices.md` | 20 | "L2 Desktop Engineering uses the Android L2 investigation runbooks (Phase 41 — not yet shipped)." | `00-index.md#android-l2-runbooks` |

**Zero line drift confirmed.** All 10 lines are exact matches to D-30 declared positions.

**Retrofit constraint note:** For `03-fully-managed-cobo.md` line 20 also contains a "Phase 41" reference ("COBO L2 investigation (Phase 41)" in the **Not covered** list at line 20). D-30 designates line 22 as the retrofit target (the "How to use" line). The line 20 reference in the **Not covered** list is a single-string reference that D-30 does NOT target — only line 22 gets the link replacement. Planner should enumerate this explicitly to avoid executor confusion.

---

## 00-index.md Injection Point

**Current state:** 152 lines total. iOS L2 section ends at line 131 (`### MAM-WE Investigation Advisory` block closing). Line 143 starts `---` separator.

**Injection location:** After line 131 (after the iOS MAM-WE Advisory blockquote), before the `## Related Resources` section. The iOS MAM-WE Advisory is the last sub-section of the `## iOS L2 Runbooks` section. Android L2 section inserts after it.

**Verify at execute time:** Run `wc -l docs/l2-runbooks/00-index.md` to confirm line count before injection. The file has Version History at the bottom — Android section injects before `## Related Resources`.

**Android L2 Escalation Mapping table (6 rows):**

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| L1 22: Android Enrollment Blocked | `19-android-enrollment-investigation.md` Pattern E + see-also `18-android-log-collection.md` |
| L1 23: Android Work Profile Not Created | `19-android-enrollment-investigation.md` Pattern A + see-also `18-android-log-collection.md` |
| L1 24: Android Device Not Enrolled | `19-android-enrollment-investigation.md` (Data Collection Step 1-4 first) + see-also `18-android-log-collection.md` |
| L1 25: Android Compliance Blocked | `21-android-compliance-investigation.md` (Cause A→A, B→B, C→C, D→D) |
| L1 26: Android MGP App Not Installed | `20-android-app-install-investigation.md` + see-also `18-android-log-collection.md` |
| L1 27: Android ZTE Enrollment Failed | `19-android-enrollment-investigation.md` Pattern C + see-also `18-android-log-collection.md` |

**MAM-WE Advisory anchor:** `{#android-mam-we-investigation-advisory}` — this anchor is the target of the runbook 20 D-15 cross-link (`00-index.md#android-mam-we-investigation-advisory`). Create this anchor when writing the index section. Confirm anchor naming convention matches the iOS precedent `{#mam-we-investigation-advisory}` adapted for Android.

---

## iOS L2 Structural Template Details

### Section Pattern (from `17-ios-compliance-ca-timing.md`)

```
Frontmatter → Platform-gate banner → H1 Title
## Triage (L1 handoff block)
## Context (scope framing + structure choice explanation + before-starting log collection prereq)
## Investigation by Axis
  ### Configuration Errors [CONFIG]
  ### Timing Issues [TIMING]
  ### Genuine Defects [DEFECT]
## Per-Cause Deep-Dive
  ### Cause A: [name]
  ### Cause B: [name]
  ### Cause C: [name]
## Resolution (per-cause + escalation)
## Related Resources
## Version History
```

Android runbook 21 follows this exactly with 4 causes (A/B/C/D) instead of 3.

### Platform-Gate Banner (D-28 Android 4-platform version)

```markdown
> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
```

### L2 Template Extension (D-27)

**Current state** (verified from `docs/_templates/l2-template.md` line 19):
```
platform: Windows | macOS | iOS | all
```

**Target state (one-line change):**
```
platform: Windows | macOS | iOS | Android | all
```

---

## Common Pitfalls

### Pitfall 1: SafetyNet Token in Runbook Body

**What goes wrong:** Any literal occurrence of "SafetyNet" in runbooks 18-21 body text causes AEAUDIT-04 grep failure in Phase 42.
**Why it happens:** Natural inclination to provide historical context ("SafetyNet was replaced by...").
**How to avoid:** Use D-18 exact pattern — glossary cross-link only, deprecation context via "the legacy API was deprecated by Google in January 2025" without naming SafetyNet. Zero literal "SafetyNet" token.
**Warning signs:** Any sentence starting with "SafetyNet" or containing "SafetyNet attestation".

### Pitfall 2: Line Number Drift Before Execute

**What goes wrong:** D-30 line numbers are verified correct at research time (2026-04-23) but executor runs weeks later after other edits.
**Why it happens:** Line drift between research/plan time and execute time.
**How to avoid:** PLAN.md MUST instruct executor to re-verify each line number immediately before making the edit. Use `grep -n "Phase 41" <file>` to find current line before substituting.
**Warning signs:** Executor finds "Phase 41" text at a different line than declared.

### Pitfall 3: Play Integrity Label Mismatch

**What goes wrong:** Using "Strong integrity (hardware-backed)" as a single label when Intune uses TWO separate settings: "Check basic integrity & device integrity" (the primary setting) and "Check strong integrity using hardware-backed security features" (a separate toggle).
**Why it happens:** D-19 describes "Basic integrity / Basic + Device integrity / Strong integrity (hardware-backed)" as the 3-tier ladder; this maps to the 2-setting system in the UI differently.
**How to avoid:** Runbook 21 Cause A must explain both UI settings and how they combine to produce the three-tier ladder. The compliance policy has "Play Integrity Verdict" dropdown (Not configured / Check basic integrity / Check basic integrity & device integrity) PLUS a separate "Check strong integrity using hardware-backed security features" toggle.
**Warning signs:** Describing "Strong integrity" as a value in the "Play Integrity Verdict" dropdown — it is actually a separate setting.

### Pitfall 4: MAM Advisory Anchor Mismatch

**What goes wrong:** Runbook 20 D-15 cross-link references `00-index.md#android-mam-we-investigation-advisory` but the index section heading uses a different anchor.
**Why it happens:** The anchor is created during Phase 41 index authoring; no pre-existing anchor to verify.
**How to avoid:** When writing the index `## Android L2 Runbooks` section, explicitly add `{#android-mam-we-investigation-advisory}` to the MAM-WE Advisory sub-heading. Confirm the exact anchor string matches what runbook 20 cross-links.
**Warning signs:** Runbook 20 links to `#android-mam-we-investigation-advisory` but the index heading is just `### Android MAM-WE Investigation Advisory` without the explicit ID attribute.

### Pitfall 5: Modifying More Than Single Line Per Retrofit File

**What goes wrong:** Executor sees other "Phase 41" references in a file and "helpfully" resolves them all.
**Why it happens:** `03-fully-managed-cobo.md` has "COBO L2 investigation (Phase 41)" at line 20 (Not covered list) AND "Phase 41 — not yet shipped" at line 22 (How to use). D-30 targets ONLY line 22. The line 20 "Phase 41" reference in the Not covered list is NOT a D-30 target.
**How to avoid:** D-34 explicitly scopes admin file modifications to "single-line modification each (D-30 placeholder resolution only; no structural changes beyond last_verified bump + Version History row per D-32)". Execute the exact line replacement and nothing else in the Not covered list.
**Warning signs:** Diff shows >1 line modified in admin-setup-android files beyond the last_verified bump and Version History row.

### Pitfall 6: D-02 Preamble Over-Claiming "No Diagnostics"

**What goes wrong:** The preamble states "no Intune admin center Download Diagnostics bundle for Android" which is technically imprecise — there IS a diagnostics path for Android via MAM app protection.
**Why it happens:** The iOS parallel (14-ios-log-collection.md) says "no iOS equivalent to mdmdiagnosticstool.exe" which is about MDM enrollment bundle; Android preamble must similarly scope to MDM enrollment.
**How to avoid:** Use exact language from CONTEXT.md D-02: "no single Intune admin center per-device Download Diagnostics bundle for Android" — the key qualifiers are "single" (fragmented), "per-device" (MDM-enrollment-scoped), "bundle" (comprehensive archive). A brief parenthetical may note that MAM app protection diagnostics exist for specific M365 apps but are scoped to app protection, not MDM enrollment.
**Warning signs:** Preamble claims Android has NO diagnostics whatsoever in Intune — that would be factually incorrect given the MAM app protection path.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Mechanical grep + link-check (no test runner; documentation phase) |
| Config file | None — verification is PLAN.md enumeration + post-execution grep commands |
| Quick run command | `grep -r "SafetyNet\|safetynet" docs/l2-runbooks/18-21-*.md` (must return 0 matches) |
| Full suite command | See Phase 42 AEAUDIT-04 mechanical audit (post-Phase-41 scope) |

### Phase Requirements → Verification Map

| Req ID | Behavior | Verification Type | Command/Method |
|--------|----------|-------------------|----------------|
| AEL2-01 | 3-method log collection with confidence labels | Grep + review | `grep -n "\[HIGH\|MEDIUM\|LOW" docs/l2-runbooks/18-android-log-collection.md` — must have per-command markers in Section 3 |
| AEL2-01 | adb commands labeled, NOT SafetyNet-related | Grep | `grep -i "safetynet" docs/l2-runbooks/18-android-log-collection.md` — must return 0 |
| AEL2-02 | 5 patterns present in runbook 19 | Review | Headers for Pattern A/B/C/D/E must exist in runbook 19 Analysis section |
| AEL2-02 | Escalation packet fields present | Review | Token sync status + profile assignment state + enrollment profile GUID in each Pattern resolution |
| AEL2-02 | Phase 37/39 anchor cross-links resolve | Link check | All 8 cross-reference anchors confirmed present (verified in research) |
| AEL2-03 | Three-class disambiguation present in runbook 20 | Review | ⚙️/⏱️/🐛 markers per failure pattern |
| AEL2-03 | MAM-WE exclusion cross-link present | Grep | `grep "MAM-WE Advisory" docs/l2-runbooks/20-android-app-install-investigation.md` |
| AEL2-04 | Zero SafetyNet literal in runbook 21 | Grep | `grep -i "safetynet" docs/l2-runbooks/21-android-compliance-investigation.md` — must return 0 |
| AEL2-04 | Play Integrity 3-tier labels correct | Review | "Basic integrity", "Check basic integrity & device integrity", "Check strong integrity using hardware-backed security features" labels match MS Learn verified terms |
| AEL2-05 | Android L2 section present in 00-index.md | Grep | `grep "## Android L2 Runbooks" docs/l2-runbooks/00-index.md` |
| AEL2-05 | Existing sections unmodified | Diff | `git diff HEAD docs/l2-runbooks/00-index.md` — changes only AFTER line 131 area (new content appended) |
| D-27 | Template platform enum updated | Grep | `grep "Android" docs/_templates/l2-template.md` — must show `Android` in the platform enum |
| D-30 | All 10 placeholders replaced | Grep | `grep -n "Phase 41" docs/l1-runbooks/22-*.md docs/l1-runbooks/23-*.md ...` — must return 0 in all 10 files |
| D-32 | last_verified bumped on retrofit files | Grep | `grep "last_verified" docs/l1-runbooks/22-*.md` etc. — must show 2026-04-23 (or Phase 41 ship date) |
| D-34 | Shared-file guard — zero modifications | Diff | `git diff HEAD docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/_glossary*.md` — must be EMPTY |

### Sampling Rate

- **Per task commit:** `grep -i "safetynet" <new-runbook>` (zero tolerance)
- **Per wave merge:** Full D-30 placeholder grep across all 10 files
- **Phase gate:** All AEL2-* requirements verified before `/gsd-verify-work`

### Wave 0 Gaps

None — no test framework installation required. Verification is grep-based.

---

## Plan Decomposition Hint

The planner should target **10-12 plans** in **3 waves**:

**Wave 0 (setup — no new runbooks yet):**
- Plan 41-01: L2 template platform enum extension (1-line edit) + 00-index.md Android L2 section append. Can be done first as the index anchor (`#android-mam-we-investigation-advisory`) is needed by runbook 20 D-15 cross-link.

**Wave 1 (new runbooks):**
- Plan 41-02: `18-android-log-collection.md` — ~180-220 lines
- Plan 41-03: `19-android-enrollment-investigation.md` — ~260-320 lines (largest; 5-pattern hybrid structure)
- Plan 41-04: `20-android-app-install-investigation.md` — ~190-220 lines
- Plan 41-05: `21-android-compliance-investigation.md` — ~230-260 lines

All 4 runbooks are sequentially authored but each depends on runbook 18 existing (the "Before starting: collect per runbook 18" cross-reference). Runbook 18 should ship first, then 19/20/21 can parallel-path if capacity allows.

**Wave 2 (placeholder retrofits — depends on Wave 1 runbooks existing so that anchor names can be confirmed):**
- Plan 41-06: Retrofit 6 Android L1 runbooks (22-27) — atomic commit, 6 files, 1 line each + last_verified bump + Version History row per D-31/D-32
- Plan 41-07: Retrofit `android-lifecycle/03-android-version-matrix.md` — 1 line at line 89 + frontmatter bump per D-31/D-32
- Plan 41-08: Retrofit 3 admin-setup-android files (03/04/05) — 3 files, 1 line each + frontmatter bump + Version History row per D-31/D-32

**Total:** 8 plans minimum. If 41-03 (runbook 19) is split into Data Collection Steps sub-plan and Pattern A-E sub-plan due to complexity (>300 lines risk), 10 plans. If 41-05 (runbook 21) is also split due to Pareto-expanded Cause A + Cause C depth, 12 plans.

**Wave dependency chain:**
```
41-01 (template + index) → 41-02 (RB 18) → 41-03/04/05 (RB 19/20/21) → 41-06/07/08 (retrofits)
```

Note: The anchor `#android-mam-we-investigation-advisory` in `00-index.md` created by plan 41-01 is referenced by runbook 20 (plan 41-04). Plan 41-01 must ship before 41-04 is verified.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 41 is documentation-only. No external tools, databases, or services beyond the git repository and a markdown editor are required. Verification is grep-based.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | CA timing first-evaluation window is "approximately 15-30 minutes" | Runbook 21 Cause C | If Microsoft reduces or extends evaluation cadence, the stated window becomes inaccurate; MEDIUM label on all timing claims mitigates |
| A2 | MGP app state labels in Intune ("Installed", "Not installed", "Failed", "Pending") match current portal UI | Runbook 20 | Intune UI can reorganize state labels; MEDIUM label + verify-at-execute-time note recommended |
| A3 | adb logcat filter tags for Intune (DevicePolicyManager, WorkProfileManager, IntuneManagedAgent) are relevant for enrollment diagnosis | Runbook 18 Section 3 | Tag names could differ across Android versions or Intune agent versions; all per-tag examples carry MEDIUM label per D-24 |
| A4 | `adb shell dumpsys device_policy` output format is stable enough to document for diagnostic use across Android 12-15 | Runbook 18 Section 3 | Google has changed DPC output format across versions; MEDIUM label and "validate against current Android Developer documentation" caveat per D-25 mitigate |
| A5 | The `#android-mam-we-investigation-advisory` anchor (created by Phase 41) will be the correct target for runbook 20 D-15 cross-link | Runbook 20 + 00-index.md | If the index section uses a different heading text, the auto-generated anchor may differ; mitigated by explicit `{#anchor-id}` attribute in the heading |

---

## Open Questions

1. **Company Portal vs Microsoft Intune app for post-AMAPI BYOD**
   - What we know: MS Learn confirms both apps support log upload. The AMAPI migration (April 2025) made Microsoft Intune app the primary management app for BYOD work profile.
   - What's unclear: Whether Company Portal is still installed on post-AMAPI BYOD devices as a secondary app, or whether it is absent.
   - Recommendation: Runbook 18 Section 1 should document both apps with an AMAPI-era note: "On post-April-2025 BYOD devices, the Microsoft Intune app is the primary management app. Company Portal may also be installed as a secondary app for log upload. Check which management app the device uses before instructing the user."

2. **Graph API endpoint for Android enrollment profile GUID (D-09 escalation packet)**
   - What we know: Phase 31 D-08/D-09 uses `GET /deviceManagement/depOnboardingSettings` for iOS ADE. Android analog is `GET /deviceManagement/androidManagedStoreAccountEnterpriseSettings` per CONTEXT.md D-09.
   - What's unclear: Whether this endpoint returns the enrollment profile GUID for COBO/BYOD/Dedicated, or whether a different endpoint is needed for each enrollment mode.
   - Recommendation: Runbook 19 D-09 escalation packet should note portal-first GUID extraction (Intune admin center URL contains the GUID directly) as the primary path. The Graph API endpoint reference carries [MEDIUM] confidence and is a supplement — label accordingly.

3. **Microsoft Intune app "Send logs" navigation exact path for COBO/Dedicated mode**
   - What we know: MS Learn documents "Menu → Help → Get Support → UPLOAD LOGS" for the Microsoft Intune app. This is verified for BYOD.
   - What's unclear: Whether the same navigation exists on COBO/Dedicated devices where the Microsoft Intune app is a device-owner-mode agent app rather than a user-facing app.
   - Recommendation: Runbook 18 Section 2 should carry [MEDIUM, last_verified 2026-04-23] on the COBO/Dedicated/ZTE navigation path and include a `<!-- verify UI at execute time -->` comment per Phase 39 D-17 pattern.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SafetyNet Attestation API for Android compliance | Play Integrity API | Google deprecated January 2025; Intune enforced simultaneously | Zero "SafetyNet" references in any Android doc; runbook 21 uses Play Integrity terminology exclusively |
| Device Administrator (DA) enrollment | Android Enterprise (Work Profile / Fully Managed / Dedicated / ZTE) | Deprecated Android 10+; Google removed for new enrollments | No DA runbooks; all Phase 41 content assumes Android Enterprise |
| Custom OMA-URI profiles for BYOD | AMAPI-based configuration (Android Management API) | April 2025 | BYOD primary management app changed to Microsoft Intune app; Wi-Fi cert-auth required; no OMA-URI |
| Company Portal as BYOD primary management app | Microsoft Intune app as BYOD primary management app (post-AMAPI) | April 2025 | Runbook 18 BYOD log collection must account for both apps; AMAPI disambiguation note required |
| SafetyNet strong integrity (software-evaluated) | Play Integrity strong integrity requiring hardware-backed security + security patch <12 months on Android 13+ | May 2025 (enforced September 30, 2025) | Runbook 21 Cause A must document patch-age requirement for strong integrity; some previously-compliant devices now fail |

---

## Sources

### Primary (HIGH confidence)
- `learn.microsoft.com/en-us/intune/user-help/diagnostics/collect-logs-android` — Company Portal + Microsoft Intune app Android log upload navigation (updated 2026-04-08) [VERIFIED]
- `learn.microsoft.com/en-us/intune/device-management/actions/collect-diagnostics` — Collect Diagnostics remote action: Android = MAM app-protection scope only; NOT per-device MDM enrollment bundle (updated 2026-04-21) [VERIFIED]
- `learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work` — Play Integrity verdict UI labels; compliance state strings; USB debugging disabled by default in device-owner mode (updated 2025-09-04) [VERIFIED]
- Codebase grep — all 8 Phase 37/39 cross-reference anchors; all 4 Phase 40 L1 runbook 25 Cause anchors; all 10 D-30 retrofit line numbers [VERIFIED]
- `docs/l1-runbooks/25-android-compliance-blocked.md` — shipped Phase 40 content confirming: "Not evaluated" / "In grace period" / "Not compliant" state strings; 15-30 min CA timing window; SafetyNet avoidance wording pattern; Play Integrity 3-tier ladder language [VERIFIED: codebase]
- `docs/l2-runbooks/00-index.md` — current line count 152; iOS MAM-WE Advisory ends at line 131; injection point confirmed [VERIFIED: codebase]
- `docs/_templates/l2-template.md` — current platform enum: `Windows | macOS | iOS | all` at line 19 [VERIFIED: codebase]
- Phase 31 CONTEXT.md — iOS L2 structural precedents D-01 through D-35 [VERIFIED: codebase]
- Phase 41 CONTEXT.md — all decisions D-01 through D-34 [VERIFIED: codebase]

### Secondary (MEDIUM confidence)
- `learn.microsoft.com/en-us/troubleshoot/mem/intune/app-management/troubleshoot-google-apps` — MGP app state troubleshooting; "Installed/Not installed/Failed/Pending" device install status labels (updated 2026-04-17) [CITED]
- `techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130` — September 30, 2025 strong integrity enforcement date for Android 13+ [CITED]
- `developer.android.com/google/play/integrity/verdicts` — Play Integrity verdict levels and semantics [CITED]
- `developer.android.com/tools/dumpsys` — `adb shell dumpsys` tool documentation [CITED]

### Tertiary (LOW confidence)
- Community sources for adb logcat filter tags (DevicePolicyManager, WorkProfileManager, IntuneManagedAgent) — not verified against Microsoft Learn; per-tag examples in runbook 18 carry [MEDIUM, last_verified 2026-04-23] markers per D-22/D-23
- CA timing first-evaluation window "15-30 minutes" SLA — sourced from L1 runbook 25 shipped content (itself MEDIUM-sourced at Phase 40); no explicit MS Learn SLA found

---

## Metadata

**Confidence breakdown:**
- Anchor verification (Phase 37/39/40): HIGH — direct codebase grep
- D-30 line number verification: HIGH — direct codebase content check
- Play Integrity verdict labels: HIGH — verified MS Learn 2025-09-04
- Log collection navigation: HIGH — verified MS Learn 2026-04-08
- D-02 preamble claim (no per-device MDM bundle): HIGH — verified MS Learn 2026-04-21
- adb filter-tag labels: MEDIUM — Android Developer docs; not MS Learn-primary
- `dumpsys device_policy` output format: MEDIUM — Android Developer docs; output shifts across OS versions
- MGP app state UI labels: MEDIUM — MS Learn troubleshooting guide; portal UI can change
- CA timing SLA: MEDIUM — in-codebase L1 runbook; no explicit MS Learn SLA
- "Not evaluated" terminal state Android causes: MEDIUM — derived from iOS analog + Android compliance architecture

**Research date:** 2026-04-23
**Valid until:** 2026-07-22 (90-day cadence; adb commands and portal UI paths are highest drift risk)
