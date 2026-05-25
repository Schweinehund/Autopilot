# Phase 65 Pre-Edit Anchor Inventory

**Captured:** 2026-05-22 (Wave 1 — BEFORE any Wave 2-4 edits)
**Purpose:** PITFALL-6 / SC#5 anti-regression baseline. Wave 3 + Wave 4 tasks verify against this inventory. Any H2/H3 anchor slug present in this document that is ABSENT post-edit constitutes a PITFALL-6 violation and a Wave 3 / Wave 4 rollback condition.

**Files covered:** 6 (the one sanctioned exception + 5 hub files)

---

## File 1: `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md`

**Total line count:** 201
**Role:** Canonical admin-context runbook; Wave 4 atomic-trio back-link append target (D-04a)
**Insertion point:** After line 194 (inside `## Cross-References` tail), before blank line + `## Version History`

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| 31 | H1 | `Shared iPad Passcode Reset (3-Path Decision Matrix)` | `shared-ipad-passcode-reset-3-path-decision-matrix` | H1 title — not C16 load-bearing |
| 40 | H2 | `Required Role & Permission` | `required-role--permission` | V-64-08 asserts this present |
| 66 | H3 | `Path A — Apple Business UI Reset (L1-delegated, preferred)` | `path-a--apple-business-ui-reset-l1-delegated-preferred` | Part of Path A < B < C ordering (V-64-03) |
| 96 | H3 | `Path B — MDM ClearPasscode (L2-only)` | `path-b--mdm-clearpasscode-l2-only` | Part of Path A < B < C ordering (V-64-03) |
| 129 | H3 | `Path C — MDM EraseDevice (L2-with-approval, last resort)` | `path-c--mdm-erasedevice-l2-with-approval-last-resort` | Part of Path A < B < C ordering (V-64-03) |
| 168 | H2 | `Verification` | `verification` | V-64-09 asserts this present |
| 170 | H3 | `After Path A (Apple Business UI Reset)` | `after-path-a-apple-business-ui-reset` | sub-section of Verification |
| 178 | H3 | `After Path C (EraseDevice)` | `after-path-c-erasedevice` | sub-section of Verification |
| 187 | H2 | `Cross-References` | `cross-references` | **D-04a append target** — Wave 4 appends new bullet INSIDE this H2 at line 194; slug MUST remain `#cross-references` post-edit |
| 196 | H2 | `Version History` | `version-history` | append point boundary sentinel |

### Load-Bearing Anchor Flags

- `#cross-references` (line 187): D-04a append target. Wave 4 appends at `:194` (inside this H2's body). The slug MUST remain `#cross-references` — the append does NOT rename the heading.
- `#verification` (line 168): V-64-09 assertion target.
- `#required-role--permission` (line 40): V-64-08 assertion target.

### ABAUDIT Line-Pair Status

- **ABAUDIT-06** at line 13 — exempts line 14 (Apple-Business-vs-Intune disambiguation for C15 regex 4). Wave 4 append at `:194` does NOT shift these line numbers (append is after line 194 in the Cross-References tail). Per 65-RESEARCH.md:705, the relative position of ABAUDIT-06 and ABAUDIT-07 is unaffected.
- **ABAUDIT-07** at line 116 — exempts line 117 (MDM ClearPasscode Intune RBAC disambiguation for C15 regex 1). Also unaffected by the Wave 4 append.

### Post-Edit Expected State (after Wave 4)

- All slugs in the table above MUST still be present.
- `#cross-references` body gains a 4th bullet: `34-apple-business` substring.
- `## Version History` gains a new row for Phase 65.

---

## File 2: `docs/common-issues.md`

**Total line count:** 347
**Role:** Hub file; Wave 3 append target (ABNAV-03)
**Insertion point:** After Android Enterprise Failure Scenarios section (lines 268-336), before `## Version History` (line 337)

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| 13 | H1 | `Common Provisioning Issues` | `common-provisioning-issues` | H1 |
| 14 | H2 | `Choose Your Platform` | `choose-your-platform` | TOC section |
| 23 | H2 | `Windows Autopilot Issues` | `windows-autopilot-issues` | Platform H2 |
| 33 | H3 | `Device Registration Issues` | `device-registration-issues` | |
| 43 | H3 | `Enrollment Status Page (ESP) Failures` | `enrollment-status-page-esp-failures` | |
| 50 | H3 | `Profile Assignment Issues` | `profile-assignment-issues` | |
| 60 | H3 | `TPM Attestation Failures` | `tpm-attestation-failures` | |
| 67 | H3 | `Network Connectivity Issues` | `network-connectivity-issues` | |
| 76 | H3 | `Policy Conflicts` | `policy-conflicts` | |
| 83 | H3 | `Hybrid Join Failures` | `hybrid-join-failures` | |
| 90 | H3 | `Device Renamed but Old Name Persists` | `device-renamed-but-old-name-persists` | |
| 98 | H3 | `APv2 Failure Scenarios` | `apv2-failure-scenarios` | |
| 103 | H4 | `Deployment Experience Never Launched` | `deployment-experience-never-launched` | H4 (not monitored) |
| 110 | H4 | `Apps or Scripts Not Installed` | `apps-or-scripts-not-installed` | H4 |
| 116 | H4 | `ESP Appeared Instead of Device Preparation` | `esp-appeared-instead-of-device-preparation` | H4 |
| 123 | H4 | `Deployment Timed Out` | `deployment-timed-out` | H4 |
| 130 | H3 | `Device Reset and Lifecycle Issues` | `device-reset-and-lifecycle-issues` | |
| 138 | H3 | `Migration Issues` | `migration-issues` | |
| 146 | H3 | `Security and Enrollment Issues` | `security-and-enrollment-issues` | |
| 157 | H2 | `macOS ADE Failure Scenarios` | `macos-ade-failure-scenarios` | Platform H2 |
| 167 | H3 | `Device Not Appearing in Intune` | `device-not-appearing-in-intune` | |
| 174 | H3 | `Setup Assistant Stuck or Failed` | `setup-assistant-stuck-or-failed` | |
| 183 | H3 | `Configuration Profile Not Applied` | `configuration-profile-not-applied` | |
| 190 | H3 | `App Not Installed` | `app-not-installed` | |
| 199 | H3 | `Compliance Failure or Access Blocked` | `compliance-failure-or-access-blocked` | |
| 206 | H3 | `Company Portal Sign-In Failure` | `company-portal-sign-in-failure` | |
| 213 | H2 | `iOS/iPadOS Failure Scenarios` | `iosipados-failure-scenarios` | Platform H2 |
| 222 | H3 | `iOS: Device Not Appearing in Intune` | `ios-device-not-appearing-in-intune` | |
| 229 | H3 | `iOS: ADE Setup Assistant Not Completing` | `ios-ade-setup-assistant-not-completing` | |
| 236 | H3 | `iOS: Enrollment Blocked by Configuration` | `ios-enrollment-blocked-by-configuration` | |
| 243 | H3 | `iOS: User License Not Present` | `ios-user-license-not-present` | |
| 250 | H3 | `iOS: Device Enrollment Cap Reached` | `ios-device-enrollment-cap-reached` | |
| 257 | H3 | `iOS: Compliance / Access Blocked` | `ios-compliance--access-blocked` | |
| 264 | H3 | `iOS: App Protection Policies Not Applying (MAM-WE)` | `ios-app-protection-policies-not-applying-mam-we` | |
| 268 | H2 | `Android Enterprise Failure Scenarios` | `android-enterprise-failure-scenarios` | Platform H2 |
| 278 | H3 | `Android: Enrollment Blocked` | `android-enrollment-blocked` | |
| 285 | H3 | `Android: Work Profile Not Created` | `android-work-profile-not-created` | |
| 292 | H3 | `Android: Device Not Enrolled` | `android-device-not-enrolled` | |
| 299 | H3 | `Android: Compliance Blocked` | `android-compliance-blocked` | |
| 309 | H3 | `Android: MGP App Not Installed` | `android-mgp-app-not-installed` | |
| 316 | H3 | `Android: ZTE Enrollment Failed` | `android-zte-enrollment-failed` | |
| 323 | H3 | `Android: Knox Enrollment Failed` | `android-knox-enrollment-failed` | |
| 330 | H3 | `Android: AOSP Enrollment Failed` | `android-aosp-enrollment-failed` | |
| 337 | H2 | `Version History` | `version-history` | boundary sentinel |

### Load-Bearing Anchor Flags

- All H2 slugs above MUST remain present post-Wave 3 edit.
- The `## Choose Your Platform` TOC (`#choose-your-platform`, line 14) links to all platform H2s internally — those links depend on the slug stability of the H2s above.
- **Post-edit addition:** `## Apple Business Governance Failure Scenarios` H2 (slug `#apple-business-governance-failure-scenarios`) — does NOT exist pre-edit; created by Wave 3. V-65-07 asserts this substring is present.
- **Post-edit addition:** `#apple-business-quick-reference` substring — must appear as a cross-link within the new section (C16 `common_issues → quick_ref_l1` edge). NOT present pre-edit; expected post-Wave 3.

---

## File 3: `docs/quick-ref-l1.md`

**Total line count:** 226
**Role:** Hub file; Wave 3 append target (ABNAV-04)
**Insertion point:** After `## Linux Quick Reference` section (lines 186-215), before `## Version History` (line 216)

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| 13 | H1 | `L1 Quick-Reference Card` | `l1-quick-reference-card` | H1 |
| 14 | H2 | `Top 5 Checks` | `top-5-checks` | APv1 section |
| 24 | H2 | `Escalation Triggers` | `escalation-triggers` | APv1 section |
| 35 | H2 | `Decision Trees` | `decision-trees` | APv1 section |
| 42 | H2 | `Runbooks` | `runbooks` | APv1 section |
| 53 | H2 | `APv2 Quick Reference` | `apv2-quick-reference` | Framework H2 |
| 57 | H3 | `Top 3 Checks` | `top-3-checks` | APv2 sub |
| 63 | H3 | `APv2 Escalation Triggers` | `apv2-escalation-triggers` | APv2 sub |
| 71 | H3 | `APv2 Decision Tree` | `apv2-decision-tree` | APv2 sub |
| 74 | H3 | `APv2 Runbooks` | `apv2-runbooks` | APv2 sub |
| 83 | H2 | `macOS ADE Quick Reference` | `macos-ade-quick-reference` | Platform H2 |
| 87 | H3 | `Top Checks` | `top-checks` | macOS sub |
| 94 | H3 | `macOS Escalation Triggers` | `macos-escalation-triggers` | macOS sub |
| 102 | H3 | `macOS Decision Tree` | `macos-decision-tree` | macOS sub |
| 105 | H3 | `macOS Runbooks` | `macos-runbooks` | macOS sub |
| 117 | H2 | `iOS/iPadOS Quick Reference` | `iosipados-quick-reference` | Platform H2 |
| 129 | H3 | `iOS Escalation Triggers` | `ios-escalation-triggers` | iOS sub |
| 136 | H3 | `iOS Decision Tree` | `ios-decision-tree` | iOS sub |
| 139 | H3 | `iOS Runbooks` | `ios-runbooks` | iOS sub |
| 149 | H2 | `Android Enterprise Quick Reference` | `android-enterprise-quick-reference` | Platform H2 |
| 154 | H3 | `Top Checks` | `top-checks` | Android sub (duplicate slug — context-dependent) |
| 161 | H3 | `Android Escalation Triggers` | `android-escalation-triggers` | Android sub |
| 169 | H3 | `Android Decision Tree` | `android-decision-tree` | Android sub |
| 172 | H3 | `Android Runbooks` | `android-runbooks` | Android sub |
| 186 | H2 | `Linux Quick Reference` | `linux-quick-reference` | Platform H2 |
| 190 | H3 | `Top Checks` | `top-checks` | Linux sub (duplicate slug) |
| 197 | H3 | `Linux Escalation Triggers` | `linux-escalation-triggers` | Linux sub |
| 205 | H3 | `Linux Decision Tree` | `linux-decision-tree` | Linux sub |
| 208 | H3 | `Linux Runbooks` | `linux-runbooks` | Linux sub |
| 216 | H2 | `Version History` | `version-history` | boundary sentinel |

### Load-Bearing Anchor Flags

- All H2 slugs above MUST remain present post-Wave 3 edit.
- **Post-edit addition (LOAD-BEARING for C16):** `## Apple Business Quick Reference` H2 (slug `#apple-business-quick-reference`) — does NOT exist pre-edit; MUST be created by Wave 3 with EXACTLY this title. The slug `#apple-business-quick-reference` is the cross-link target that `docs/common-issues.md` uses (C16 `common_issues → quick_ref_l1` edge substring check: `#apple-business-quick-reference`). If the H2 title is reworded even slightly, the slug changes and the C16 edge breaks silently.
- **Post-edit addition (C16):** Substring `34-apple-business` MUST appear in the new section (C16 `quick_ref_l1 → l1_34` edge). NOT present pre-edit.
- `docs/index.md` at `:144` cross-links to `quick-ref-l1.md#iosipados-quick-reference` — this slug must remain stable.

---

## File 4: `docs/quick-ref-l2.md`

**Total line count:** 341
**Role:** Hub file; Wave 3 append target (ABNAV-05)
**Insertion point:** After `## Linux Quick Reference` section (lines 284-328), before `## Version History` (line 329)

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| 13 | H1 | `L2 Quick-Reference Card` | `l2-quick-reference-card` | H1 |
| 14 | H2 | `Log Collection` | `log-collection` | APv1 section |
| 27 | H2 | `PowerShell Diagnostic Commands` | `powershell-diagnostic-commands` | APv1 section |
| 37 | H2 | `Event Viewer Log Paths` | `event-viewer-log-paths` | APv1 section |
| 47 | H2 | `Registry Paths` | `registry-paths` | APv1 section |
| 56 | H2 | `Key Event IDs` | `key-event-ids` | APv1 section |
| 65 | H2 | `Investigation Runbooks` | `investigation-runbooks` | APv1 section |
| 78 | H2 | `APv2 Quick Reference` | `apv2-quick-reference` | Framework H2 |
| 84 | H3 | `APv2 Log Collection` | `apv2-log-collection` | APv2 sub |
| 101 | H3 | `APv2 Event Viewer Log Path` | `apv2-event-viewer-log-path` | APv2 sub |
| 108 | H3 | `APv2 Key Event ID Ranges` | `apv2-key-event-id-ranges` | APv2 sub |
| 123 | H3 | `APv2 Investigation Runbooks` | `apv2-investigation-runbooks` | APv2 sub |
| 132 | H2 | `macOS ADE Quick Reference` | `macos-ade-quick-reference` | Platform H2 |
| 138 | H3 | `macOS Log Collection` | `macos-log-collection` | macOS sub |
| 147 | H3 | `Key Terminal Commands` | `key-terminal-commands` | macOS sub |
| 160 | H3 | `Critical Log Paths` | `critical-log-paths` | macOS sub |
| 173 | H3 | `macOS Investigation Runbooks` | `macos-investigation-runbooks` | macOS sub |
| 182 | H2 | `iOS/iPadOS Quick Reference` | `iosipados-quick-reference` | Platform H2 |
| 188 | H3 | `iOS Diagnostic Data Collection (3 methods)` | `ios-diagnostic-data-collection-3-methods` | iOS sub |
| 198 | H3 | `Key Intune Portal Paths (iOS L2)` | `key-intune-portal-paths-ios-l2` | iOS sub |
| 211 | H3 | `Sysdiagnose Trigger Reference (iOS/iPadOS)` | `sysdiagnose-trigger-reference-iosipados` | iOS sub |
| 225 | H3 | `iOS Investigation Runbooks` | `ios-investigation-runbooks` | iOS sub |
| 233 | H2 | `Android Enterprise Quick Reference` | `android-enterprise-quick-reference` | Platform H2 |
| 239 | H3 | `Android Diagnostic Data Collection (3 methods)` | `android-diagnostic-data-collection-3-methods` | Android sub |
| 249 | H3 | `Key Intune Portal Paths (Android L2)` | `key-intune-portal-paths-android-l2` | Android sub |
| 261 | H3 | `Play Integrity Verdict Reference` | `play-integrity-verdict-reference` | Android sub |
| 273 | H3 | `Android Investigation Runbooks` | `android-investigation-runbooks` | Android sub |
| 284 | H2 | `Linux Quick Reference` | `linux-quick-reference` | Platform H2 |
| 290 | H3 | `Linux Diagnostic Data Collection (3 methods)` | `linux-diagnostic-data-collection-3-methods` | Linux sub |
| 299 | H3 | `Key Intune Portal Paths (Linux L2)` | `key-intune-portal-paths-linux-l2` | Linux sub |
| 311 | H3 | `Linux Compliance Category Reference` | `linux-compliance-category-reference` | Linux sub |
| 323 | H3 | `Linux Investigation Runbooks` | `linux-investigation-runbooks` | Linux sub |
| 329 | H2 | `Version History` | `version-history` | boundary sentinel |

### Load-Bearing Anchor Flags

- All H2 slugs above MUST remain present post-Wave 3 edit.
- **Post-edit addition:** `## Apple Business Quick Reference` H2 (slug `#apple-business-quick-reference`) — does NOT exist pre-edit; created by Wave 3. NOT C16 load-bearing for this file (C16 only checks `common_issues → quick_ref_l1` and `quick_ref_l1 → l1_34`). Title matches quick-ref-l1 for consistency.
- `docs/index.md` at `:154` cross-links to `quick-ref-l2.md#iosipados-quick-reference` — this slug must remain stable.

---

## File 5: `docs/operations/00-index.md`

**Total line count:** 67
**Role:** Hub file; Wave 3 append target (ABNAV-06)
**Insertion point:** After `## Compliance Drift Detection + Tenant Migration` section (lines 51-61), before `## Version History` (line 63)

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| 9 | H1 | `Operations` | `operations` | H1 |
| 14 | H2 | `Co-Management` | `co-management` | Domain H2 |
| 27 | H2 | `Patch & Update Management` | `patch--update-management` | Domain H2 |
| 38 | H2 | `App Lifecycle Automation` | `app-lifecycle-automation` | Domain H2 |
| 50 | H2 | `Compliance Drift Detection + Tenant Migration` | `compliance-drift-detection--tenant-migration` | Domain H2 — last content H2 pre-edit |
| 63 | H2 | `Version History` | `version-history` | boundary sentinel |

### Load-Bearing Anchor Flags

- All 4 domain H2 slugs above MUST remain present post-Wave 3 edit.
- **Post-edit addition:** `## Apple Business Governance` H2 (slug `#apple-business-governance`) — does NOT exist pre-edit; created by Wave 3.
- `docs/index.md` at `:235` cross-links to `operations/00-index.md` — the overall file slug is not H2-dependent.

---

## File 6: `docs/index.md`

**Total line count:** 319
**Role:** Hub file; Wave 3 surgical edits (ABNAV-07 — 3 distinct locations)
**Insertion points:**
- Line 9: banner appendix (surgical text append, no heading shift)
- After line 267 (sub-H3 insertion under `## Operations`), before `---` separator at line 277
- Cross-Platform References table: append before `## Version History` at line 303

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| 14 | H1 | `Device Provisioning Documentation` | `device-provisioning-documentation` | H1 |
| 17 | H2 | `Choose Your Platform` | `choose-your-platform` | TOC H2 |
| 28 | H2 | `Windows Autopilot` | `windows-autopilot` | Platform H2 |
| 30 | H3 | `Service Desk (L1) -- APv1` | `service-desk-l1----apv1` | sub-H3 |
| 43 | H3 | `Service Desk (L1) -- APv2` | `service-desk-l1----apv2` | sub-H3 |
| 56 | H3 | `Desktop Engineering (L2) -- APv1` | `desktop-engineering-l2----apv1` | sub-H3 |
| 69 | H3 | `Desktop Engineering (L2) -- APv2` | `desktop-engineering-l2----apv2` | sub-H3 |
| 80 | H3 | `Admin Setup` | `admin-setup` | sub-H3 |
| 87 | H3 | `Device Operations` | `device-operations` | sub-H3 |
| 98 | H2 | `macOS Provisioning` | `macos-provisioning` | Platform H2 |
| 102 | H3 | `Service Desk (L1)` | `service-desk-l1` | sub-H3 |
| 111 | H3 | `Desktop Engineering (L2)` | `desktop-engineering-l2` | sub-H3 |
| 123 | H3 | `Admin Setup` | `admin-setup` | sub-H3 (duplicate slug) |
| 133 | H2 | `iOS/iPadOS Provisioning` | `iosipados-provisioning` | Platform H2 |
| 137 | H3 | `Service Desk (L1)` | `service-desk-l1` | sub-H3 (duplicate slug) |
| 146 | H3 | `Desktop Engineering (L2)` | `desktop-engineering-l2` | sub-H3 (duplicate slug) |
| 156 | H3 | `Admin Setup` | `admin-setup` | sub-H3 (duplicate slug) |
| 169 | H2 | `Android Enterprise Provisioning` | `android-enterprise-provisioning` | Platform H2 |
| 173 | H3 | `Service Desk (L1)` | `service-desk-l1` | sub-H3 (duplicate slug) |
| 182 | H3 | `Desktop Engineering (L2)` | `desktop-engineering-l2` | sub-H3 (duplicate slug) |
| 192 | H3 | `Admin Setup` | `admin-setup` | sub-H3 (duplicate slug) |
| 201 | H2 | `Linux Provisioning` | `linux-provisioning` | Platform H2 |
| 205 | H3 | `Service Desk (L1)` | `service-desk-l1` | sub-H3 (duplicate slug) |
| 214 | H3 | `Desktop Engineering (L2)` | `desktop-engineering-l2` | sub-H3 (duplicate slug) |
| 224 | H3 | `Admin Setup` | `admin-setup` | sub-H3 (duplicate slug) |
| 233 | H2 | `Operations` | `operations` | Platform H2 — **MUST-REMAIN-STABLE** |
| 237 | H3 | `Co-Management` | `co-management` | sub-H3 |
| 246 | H3 | `Patch & Update Management` | `patch--update-management` | sub-H3 |
| 257 | H3 | `App Lifecycle Automation` | `app-lifecycle-automation` | sub-H3 |
| 267 | H3 | `Compliance Drift Detection + Tenant Migration` | `compliance-drift-detection--tenant-migration` | sub-H3 — LAST EXISTING sub-H3 under Operations; insertion point AFTER this block |
| 279 | H2 | `Cross-Platform References` | `cross-platform-references` | **MUST-REMAIN-STABLE** |
| 303 | H2 | `Version History` | `version-history` | boundary sentinel |

### MUST-Remain-Stable Anchor Set

The `## Choose Your Platform` TOC (lines 18-24) contains these internal links. All of the following anchor slugs MUST remain stable across Wave 3 surgical edits:

| Slug | Line (pre-edit) | TOC Link Text | Stability Required |
|------|-----------------|---------------|--------------------|
| `#windows-autopilot` | 28 | `Windows Autopilot` | STABLE |
| `#macos-provisioning` | 98 | `macOS Provisioning` | STABLE |
| `#iosipados-provisioning` | 133 | `iOS/iPadOS Provisioning` | STABLE |
| `#android-enterprise-provisioning` | 169 | `Android Enterprise Provisioning` | STABLE |
| `#linux-provisioning` | 201 | `Linux Provisioning` | STABLE |
| `#operations` | 233 | `Operations` | **MUST-REMAIN-STABLE** — cross-linked from `operations/00-index.md` and `docs/index.md` TOC |
| `#cross-platform-references` | 279 | `Cross-Platform References` | **MUST-REMAIN-STABLE** — cross-linked from `docs/index.md` TOC |

**PITFALL-6 note for `docs/index.md`:** The Wave 3 surgical `### Apple Business Governance` sub-H3 insertion after line 267 will shift ABSOLUTE LINE NUMBERS for `## Cross-Platform References` and `## Version History`. This is ACCEPTABLE per PITFALL-6 definition (monitors H2/H3 ANCHOR SLUGS, not line numbers). The slug `#cross-platform-references` and `#operations` remain stable because the H2 headings themselves are not renamed.

### Load-Bearing Anchor Flags

- `#operations` (line 233): MUST remain stable. Wave 3 inserts a new `### Apple Business Governance` sub-H3 under this H2 — the H2 itself is unchanged.
- `#cross-platform-references` (line 279): MUST remain stable. Wave 3 appends new table rows inside this section — the H2 heading itself is unchanged.
- **Post-edit addition:** `### Apple Business Governance` sub-H3 (slug `#apple-business-governance`) — does NOT exist pre-edit; created by Wave 3.
- Line numbers for `## Cross-Platform References` (279) and `## Version History` (303) will shift by the number of lines inserted in the sub-H3 block (approximately +8 lines). Absolute line numbers are NOT monitored by PITFALL-6.

---

## Post-Edit Verification Protocol (Plan 65-05 Close-Gate)

After Wave 3 + Wave 4 land, re-grep each file for the captured H2/H3 anchor slug set. Any anchor slug in the pre-edit set that is MISSING post-edit constitutes a PITFALL-6 violation and a Wave 3 / Wave 4 rollback condition.

The `check-phase-65.mjs` validator does NOT enforce this mechanically — it performs targeted substring checks (V-65-07 through V-65-12) rather than a full anchor-slug diff. This artifact is the human-readable contract and a hand-grep gate for Plan 65-05 close-gate.

**Grep commands for post-edit verification (from repo root):**

For each file, use: search for `^## ` and `^### ` patterns to extract all H2/H3 headings and compare against this inventory.

Any H2 or H3 slug that was present pre-edit (table above) and is ABSENT post-edit is a regression. New slugs (the Apple Business additions) are expected and are NOT regressions.
