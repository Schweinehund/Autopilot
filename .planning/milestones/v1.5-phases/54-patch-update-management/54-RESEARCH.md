# Phase 54: Patch & Update Management - Research

**Researched:** 2026-04-28
**Domain:** Multi-platform Intune update enforcement (Windows WUfB/Autopatch/Hotpatch + macOS DDM + iOS DDM + Android Play Integrity / Zebra LifeGuard / Samsung KSP) + cross-platform documentation methodology
**Confidence:** HIGH (Microsoft Learn primary sources verified 2026-04-28; community sources cross-referenced; Phase 53 inheritance pattern verified against shipped files)

---

## Summary

Phase 54 ships a 5-file `docs/operations/patch-management/` suite plus a surgical retrofit at `docs/admin-setup-ios/07-device-enrollment.md:35`, a forward-link insertion at `docs/admin-setup-ios/04-configuration-profiles.md:128`, three-way REQ/ROADMAP errata (`05-compliance-policy.md` literal off-by-one purge), and `scripts/validation/check-phase-54.mjs` (28-32 V-54-NN checks). All in **a single atomic commit** per ROADMAP line 271 PATCH-06 same-commit-atomic mandate inherited from v1.4.1 RETROSPECTIVE line 166 lesson.

The phase has FIVE independent technical-content threads that the planner must research-back-into-each-deliverable: (1) Windows WUfB/Autopatch ring disambiguation + Hotpatch May 2026 default + driver/firmware policy separation; (2) macOS DDM "Software Update Enforce Latest" Intune Settings Catalog migration with Apple OS 26 hard-deadline removal of legacy MDM commands; (3) iOS DDM August 2025 unsupervised retraction + same-commit retrofit cell edit; (4) Android MEETS_STRONG_INTEGRITY cascade timeline (May 2025 / Sept 30 2025 / Oct 31 2026 fleet deadline) + Zebra LifeGuard OTA GA Jan 2026 + Samsung KSP analog framing; (5) cross-platform 00-overview shape (1D Hybrid winner: comparison table + PITFALL-9 ring-disambiguation H2 + deferral-vs-enforcement terminology + routing). Each thread maps to a specific PATCH-NN requirement and a specific file.

**Primary recommendation:** Plan 9 sub-plans (54-01 through 54-09) matching CONTEXT D-22 decomposition, single atomic commit per D-21, validator scope 28-32 assertions per D-17. Treat the v1.3 retrofit cell at `07-device-enrollment.md:35` as load-bearing — V-54-19 NEGATIVE+POSITIVE pair will block any commit where new iOS guide ships without retrofit (or vice versa). All five new content files require `> **Platform applicability:**` blockquote at TOP per Phase 53 D-08 token inheritance — bare `> **Platform:**` is FORBIDDEN.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Gray Area 1 — 00-overview.md scope shape (winner: 1D Hybrid):**
- **D-01:** `00-overview.md` follows 1D Hybrid: cross-platform comparison table (4 platforms × 5+ concept rows) + PITFALL-9 ring-disambiguation H2 (`WUfB deployment ring` vs `Autopatch ring` mutual-exclusion + driver/firmware separation note) + deferral-vs-enforcement terminology section + routing cross-links to 01-04. Size budget **200-350 lines hard cap**. NEGATIVE regression-guard: 00-overview MUST NOT contain Hotpatch/VBS/opt-out content (PATCH-02 territory), driver/firmware ring content (PATCH-03 territory), Zebra LifeGuard content (PATCH-08 territory), or supervised-only retraction content (PATCH-05 territory). REQ traceability firewall enforced by V-54-29.
- **D-02:** `operations/00-index.md` 2-column "Guide | Covers" routing table coexists with 1D's N-column concept × platform comparison matrix without collision (Phase 53 precedent endorsed).
- **D-03:** PITFALL-13 token-density not 1D-specific — V-54-NN scans for TBD/TODO/FIXME/XXX/PLACEHOLDER, NOT "deprecated"/"removed"/"EOL".

**Gray Area 2 — Cross-platform routing pattern (winner: 2B-prime):**
- **D-04:** **Each of the 5 patch-management files carries an inline `> **Platform applicability:**` blockquote at the TOP of the file (line 9, after frontmatter)** per Phase 53 D-08 token inheritance. Pointer-only routing (link-not-copy contract — full comparison content lives in 00-overview per D-01). Mirrors `01-windows-tenant-attach.md:9-20` Phase 53 implementation shape.
  - **Critical token discipline:** Use established `> **Platform applicability:**` token verbatim. Bare `> **Platform:**` is **FORBIDDEN** (zero corpus precedent; 28+ instances of `> **Platform <qualifier>:**` exist; ZERO bare `> **Platform:**`). Lexicon-family preservation enforced by V-54-27 NEGATIVE regression-guard.
- **D-05:** Cross-platform routing surface centralization at `00-overview.md`. The full 4-platform comparison table + concept terminology + PITFALL-9 ring-disambiguation H2 + deferral-vs-enforcement section live in 00-overview only; per-platform files carry only pointer-shape inline blockquote. Avoids 2A's PITFALL-9 collision in `01-windows-wufb-rings.md` opening (Windows file's opening reserved for PITFALL-9 mutual-exclusion narrative).

**Gray Area 3 — PATCH-06 v1.3 iOS retrofit target (winner: 3B-with-addendum; OFF-BALLOT REFEREE OVERRIDE):**
- **D-06:** **PATCH-06 RETROFIT TARGET = `docs/admin-setup-ios/07-device-enrollment.md:35`** (NOT `05-compliance-policy.md` per REQ literal — file-system verification proved that file does not exist; `05-app-deployment.md` is the actual file at slot 05; `06-compliance-policy.md` contains ZERO supervised-only-DDM claim; `04-configuration-profiles.md:128` already substantively correct).
- **D-07:** Surgical edit at `07-device-enrollment.md:35` cell — replace `| OS update enforcement (forced install deadlines via DDM or device restrictions) | **No** | Supervised-only in iOS 17+ enforcement policies. |` with retraction cell containing DDM-on-unsupervised-iOS-17+ correction + cross-link to `03-ios-update-lifecycle.md`. Suggested wording (CD-09 plan-author discretion): `| OS update enforcement (forced install deadlines via DDM) | **Yes (DDM, iOS 17+)** / **No (legacy MDM device restrictions)** | DDM-based "iOS/iPadOS update policies" works on unsupervised iOS 17+ devices (basic keys: TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms). Legacy device-restrictions "Defer software updates" remains supervised-only and is being deprecated. See [iOS Update Lifecycle](../../operations/patch-management/03-ios-update-lifecycle.md). |`
- **D-08:** PITFALL-13 forward-link insertion at `04-configuration-profiles.md:128` — **NOT a content retraction** (line 128 already correct: "works on both supervised and unsupervised devices (iOS 17.0+)"). Append sentence: "For full iOS update enforcement guidance including DDM key reference, supervision matrix, and rollout patterns, see [iOS Update Lifecycle](../../operations/patch-management/03-ios-update-lifecycle.md)."
- **D-09:** Same-commit REQUIREMENTS.md + ROADMAP.md errata correcting all three off-by-one literals from `05-compliance-policy.md` → `07-device-enrollment.md`. Locations: `.planning/REQUIREMENTS.md:55` (PATCH-06 verbatim text + verb anchor "v1.3 supervised-only-DDM cell at line 35"), `.planning/REQUIREMENTS.md:166` (traceability table), `.planning/ROADMAP.md:267` (SC#3 verbatim conjunct b).
- **D-10:** Same-commit-atomic landing per ROADMAP line 271 + RETROSPECTIVE line 166 v1.4.1 atomicity lesson. Single commit covers: 5 new content files + retrofit cell + forward-link + REQ + ROADMAP errata + validator.
- **D-11:** SC#3 conjunction analysis — two conjuncts (a) new `03-ios-update-lifecycle.md` states retraction; (b) v1.3 callout retrofitted same-commit. 3B-with-addendum satisfies BOTH.

**Gray Area 4 — Deadline/deprecation callout shape per platform file (winner: 4A+4C-hybrid 4E):**
- **D-12:** Per-platform "Deadlines & Cutover Dates" H2 differentiated by content density:
  - **`01-windows-wufb-rings.md`: NO separate Deadlines H2** (Hotpatch H2 absorbs May 2026 + April 2026 dates by REQ design — F-4A-03 redundancy avoidance).
  - **`02-macos-update-enforcement.md`: YES dedicated `## Deadlines & Cutover Dates` H2.** Apple OS 26 removal warrants three-layer (D-13).
  - **`03-ios-update-lifecycle.md`: NO H2.** Single Aug 2025 retraction date is single-callout overhead — `> ⚠️` blockquote inline at the supervised-only retraction site only.
  - **`04-android-patch-delivery.md`: YES dedicated `## Deadlines & Cutover Dates` H2.** MEETS_STRONG_INTEGRITY cascade warrants three-layer (D-13). LifeGuard Jan 2026 GA + Samsung KSP referenced as table rows in same Deadlines H2 (soft cutover; no three-layer).
- **D-13:** **HARD-DEADLINE three-layer callout pattern** (Phase 53 D-05 + Phase 52 D-01 inheritance). Applied to TWO items only: (a) macOS Apple OS 26 removal of legacy MDM commands; (b) Android MEETS_STRONG_INTEGRITY Oct 31 2026 fleet deadline.
  - **Layer 1 (table-cell):** Risk/Status column entry = `**[HARD-DEADLINE]** — see callout`
  - **Layer 2 (adjacent `> ⚠️` blockquote):** placed immediately below relevant table; mandated literal text shapes (CD-06/CD-07 for exact phrasing within mandated tokens):
    - macOS: `> ⚠️ **Hard deadline (Apple OS 26):** forceDelayedSoftwareUpdates, com.apple.SoftwareUpdate payload, and ScheduleOSUpdate MDM command are deprecated AND removed with Apple OS 26. DDM "Software Update Enforce Latest" in Intune Settings Catalog is the only forward-compatible enforcement path. Migration MUST land before Apple OS 26 release.`
    - Android: `> ⚠️ **Hard deadline (Oct 31 2026):** MEETS_STRONG_INTEGRITY enforcement: Google enforced May 2025; Intune enforced September 30 2025; fleet compliance deadline October 31 2026. Android 13+ devices must have a security patch ≤12 months old. Devices not meeting this threshold will fail Intune compliance after Oct 31 2026.`
  - **Layer 3 (per-occurrence inline):** every later text reference carries `[HARD-DEADLINE — see Deadlines H2]` reminder. Validator V-54-NN-E requires ≥2 such inline reminders per file.
- **D-14:** Soft cutover items (Hotpatch May 2026 default, April 2026 Intune opt-out toggle, LifeGuard Jan 2026 GA, iOS Aug 2025 retraction): **single-callout, NOT three-layer**.
- **D-15:** Frontmatter `valid_as_of` pin: SKIP. Reuse existing `last_verified` per Phase 49/50/51/52/53 D-04/D-12 60-day cycle.
- **D-16:** PITFALL-13 same-commit allowlist seeding: DEFERRED, NOT same-commit (Phase 53 D-06 + Phase 48 D-15 YAGNI inheritance). Validator scope restricted to `docs/operations/patch-management/` file-path-prefix; no false-positive surface at Phase 54 ship.

**Validator + commit atomicity:**
- **D-17:** `check-phase-54.mjs` = FULL scope per Phase 53 D-10 floor; estimated 28-32 V-54-NN structural assertions (V-54-01 through V-54-32; full enumeration in CONTEXT lines 100-126).
- **D-18:** Implementation pattern matches `check-phase-53.mjs` / earlier validators. File-reads-only / no-shared-module; regex-based parsing.
- **D-19:** All 5 patch-management content files use single-string `platform:` frontmatter. 01 = `Windows`, 02 = `macOS`, 03 = `iOS`, 04 = `Android`. **CD-01:** 00-overview is sub-decision — `platform: cross-platform` (recommended single new token) OR `platform: Windows,macOS,iOS,Android` (comma-string per ROADMAP line 269 SC#5 "correct multi-platform frontmatter").
- **D-20:** Hardcoded H2/anchor strings + literal-token regexes pinned in BOTH validator AND CONTEXT. Renaming any pinned H2/date/legacy-command token requires same-commit validator update.
- **D-21:** **Commit atomicity = SINGLE atomic commit.** Single commit covers: 5 new content files + 1 retrofit cell edit + 1 forward-link addition + REQ + ROADMAP errata + 1 validator. Pre-commit hook enforces.
- **D-22:** Phase 54 plan order = 9 sub-plans (54-01 through 54-09) per CONTEXT lines 135-144.

### Claude's Discretion

- **CD-01:** `00-overview.md` `platform:` value — `cross-platform` (recommended) OR `Windows,macOS,iOS,Android`. Validator V-54-07 + V-54-31 accept either.
- **CD-02:** Exact wording of 4 per-platform sub-bullets inside `> **Platform applicability:**` blockquote on each per-platform file (form mandated; verb choice + brevity is plan-author).
- **CD-03:** Exact column count of cross-platform comparison table in `00-overview.md` (4-platform × 5-row minimum mandated; may add 6th/7th row for Hard deadline / Validator anchor).
- **CD-04:** Whether `00-overview.md` includes a Mermaid diagram (Phase 53 author discretion CD-04 inheritance).
- **CD-05:** PITFALL-9 ring-disambiguation H2 placement order in `00-overview.md` — first H2 vs deeper H2.
- **CD-06:** Exact wording of macOS Apple OS 26 Layer 2 blockquote (form + 3 legacy-command tokens + DDM-forward-path mandate; specific phrasing within Apple OS 26 narrative is plan-author).
- **CD-07:** Exact wording of Android MEETS_STRONG_INTEGRITY Layer 2 blockquote (form + 3 cascade dates + Android 13+ patch-age requirement).
- **CD-08:** Whether macOS Deadlines H2 includes separate row for "iOS unsupervised DDM retraction (Aug 2025)" cross-platform pointer.
- **CD-09:** Exact text of cell at `07-device-enrollment.md:35` post-edit (D-07 specifies retraction content + cross-link contract).
- **CD-10:** Whether `03-ios-update-lifecycle.md` `> ⚠️` inline blockquote uses literal `> ⚠️ **August 2025 retraction:**` framing OR `> ⚠️ **Update enforcement scope (iOS 17+):**` framing.
- **CD-11:** Whether `00-overview.md` carries `audience: admin` (default) OR `audience: admin,L2`.

### Deferred Ideas (OUT OF SCOPE)

- Linux update enforcement (no Linux update enforcement REQ; Linux Intune client patch surface is OS-vendor-controlled per Phase 49 PITFALL-7 whitelist).
- Samsung E-FOTA firmware management (orthogonal to Intune enrollment; v1.4 exclusion preserved per REQUIREMENTS line 113).
- TestFlight / ad-hoc / enterprise in-house iOS distribution non-VPP (REQUIREMENTS line 114 v1.4 exclusion).
- Windows 365 / AVD / Cloud PC patching (REQUIREMENTS line 97 BYOPC-01 deferred to v1.6+).
- ChromeOS patching (v1.0–v1.5 exclusion preserved).
- PITFALL-13 same-commit allowlist seeding (deferred to first false-positive surface per CDI-Phase54-03; Phase 60 promotion gate).
- C10 harness scope expansion to ops files (Phase 60 audit harness finalization handles, NOT Phase 54).
- `docs/index.md` Operations H2 entry (Phase 59 owns navigation-files-last per ROADMAP line 457).
- `operations/00-index.md` Patch Management H2 amendment (Phase 53 owns the file; Phase 54 cross-references only per DPO-Phase53-01 + V-54-28 NEGATIVE regression-guard).

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PATCH-01 | Admin can configure WUfB rings (deferral periods, deadline enforcement, restart behavior, user experience) and identify when Autopatch should manage rings instead, per Phase 54 ring topology guide | §"Architecture Patterns: WUfB vs Autopatch Mutual Exclusion" + §"Code Examples: WUfB Update Ring Settings" |
| PATCH-02 | Admin can read dedicated Windows Hotpatch H2 inside WUfB rings guide covering Win11 Enterprise 24H2+ default-from-May-2026, VBS prerequisites, opt-out toggle (April 2026), reboot-reduction impact on compliance reporting | §"Standard Stack: Windows Hotpatch (Confirmed May 2026 Default)" + §"Common Pitfalls: Pitfall A — Hotpatch Eligibility Misread" |
| PATCH-03 | Admin can configure driver/firmware updates via WUfB (separately from quality/feature) and recognize dual-scan source conflict pitfall when SCCM co-management still controls WU workload | §"Architecture Patterns: Three-Policy Update Surface" + §"Common Pitfalls: Pitfall B — Dual Scan Source Conflict" |
| PATCH-04 | Admin can configure macOS update enforcement using DDM "Software Update Enforce Latest" in Intune Settings Catalog and understand legacy MDM commands deprecated AND removed with Apple OS 26 — DDM is only forward-compatible path | §"Standard Stack: macOS DDM (Confirmed Settings Catalog Path)" + §"State of the Art: macOS Update Enforcement Lifecycle" |
| PATCH-05 | Admin can configure iOS/iPadOS update enforcement using DDM and understand that as of August 2025 basic DDM update keys (TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms) work on UNSUPERVISED devices running iOS 17+ — supervised-only constraint retracted | §"Standard Stack: iOS DDM Update Keys (Verified Microsoft Learn 2026-04-28)" + §"State of the Art: iOS Unsupervised DDM Retraction" |
| PATCH-06 | v1.3 iOS compliance content supervised-only-DDM callout surgically retrofitted in Phase 54 same-commit-atomic per v1.4.1 lesson (no separate retrofit phase) | §"Runtime State Inventory" Stored Data row + §"Locked Decisions D-06/D-07" file-system verification |
| PATCH-07 | Admin can configure Android patch delivery via Google Play and understand Play Integrity MEETS_STRONG_INTEGRITY change (May 2025 Google / Sept 30 2025 Intune / October 31 2026 fleet deadline) requiring Android 13+ devices to have security patch ≤12 months old | §"Standard Stack: Android Play Integrity Strong Integrity Verdict" + §"Common Pitfalls: Pitfall C — Strong Integrity Verdict Misinterpretation" |
| PATCH-08 | Admin can configure Zebra LifeGuard OTA firmware management via Intune (GA January 2026) for Zebra fleets, separate from Play-delivery updates, and reference Samsung KSP (Knox Service Plugin) as the analogous Samsung-side mechanism | §"Standard Stack: Zebra LifeGuard OTA (Confirmed Intune Admin Center Path)" + §"Standard Stack: Samsung KSP (OEMConfig)" |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- Three-tier project (PowerShell/Python/TypeScript) — but Phase 54 is documentation-only per Pillar 3 ops-depth scope; no code changes
- All remediation actions require explicit user confirmation (PowerShell `[CmdletBinding(SupportsShouldProcess)]`) — N/A for Phase 54
- Validation: per-phase `check-phase-NN.mjs` validator-as-deliverable (AUDIT-06; v1.3+ discipline preserved into v1.5)
- Verification-during-execution: VERIFICATION.md before downstream consumption (v1.2 retro lesson; carried forward)
- TBD scanning: `grep -r "TBD\|TODO\|PLACEHOLDER" docs/` in post-execution checklist (V-54-30 enforces on Phase 54 files)
- Append-only H2-block contract on shared files (PITFALL-16; applies to `00-index.md` cross-references)
- 60-day `last_verified` rule (Phase 34 D-14) — applies to all 5 patch-management content files

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| 5-file patch-management content suite | Documentation (markdown content authoring) | — | Phase 54 is ops-domain documentation under `docs/operations/` |
| Cross-platform inline blockquote routing surface | Documentation (markdown convention) | Validator (V-54-26 enforcement) | Phase 53 D-08 token inheritance; pointer-not-content contract |
| HARD-DEADLINE three-layer callout pattern | Documentation (markdown convention) | Validator (V-54-14/15/16/22/23/24) | Phase 53 D-05 + Phase 52 D-01 layered-defense methodology family |
| `07-device-enrollment.md:35` retrofit cell | Documentation (single-cell markdown edit) | Validator (V-54-19 NEGATIVE+POSITIVE pair) | Atomic-with-content per ROADMAP:271 mandate |
| `04-configuration-profiles.md:128` forward-link | Documentation (single-line markdown append) | Validator (V-54-20 byte-identical preservation) | PITFALL-13 reader-friction reduction; NOT content retraction |
| REQ + ROADMAP errata literal-purge | Documentation (3-line .md edits in `.planning/`) | Validator (V-54-21 NEGATIVE-purge regression-guard) | Off-by-one fix; planning-corpus integrity |
| `check-phase-54.mjs` validator | Tooling (Node.js script) | CI workflow (Phase 60 registration) | AUDIT-06 validator-as-deliverable lineage |
| Single atomic commit | Git workflow (pre-commit gate enforcement) | Pre-commit hook + V-54-19 atomicity-by-validator | ROADMAP:271 + v1.4.1 RETROSPECTIVE:166 lesson |

---

## Standard Stack

> **Confidence: HIGH** for all entries below. Each version + date verified against Microsoft Learn (primary) + community sources (cross-reference) on 2026-04-28.

### Core (Per-Platform Update Mechanisms)

| Mechanism | Platform | Status (2026-04-28) | Purpose | Why Standard | Source |
|-----------|----------|---------------------|---------|--------------|--------|
| Windows Update for Business (WUfB) deployment ring | Windows | GA, in-use | Per-policy ring assignment with deferral, deadline, restart-grace controls | Microsoft cloud-managed update path; admin-controlled cadence | [VERIFIED: learn.microsoft.com/intune/device-updates/windows/manage-update-rings] |
| Windows Autopatch (managed rings: Test / First / Fast / Broad) | Windows | GA; **Hotpatch becomes default May 11 2026** | Microsoft-managed ring-based patching service; admin assigns devices to one of 4 rings; Microsoft controls cadence | Reduces admin burden; mutually exclusive with custom WUfB rings | [VERIFIED: learn.microsoft.com/windows/deployment/windows-autopatch + 4sysops.com Mar 2026] |
| Windows Hotpatch | Windows 11 Enterprise 24H2+ | **Default-on May 11 2026; opt-out via Tenant settings April 1 2026** | Reboot-free quality update mechanism (8 of 12 monthly LCUs ship as hotpatch; remaining 4 = standard reboot-required baseline) | Reduces reboot-driven downtime; default behavior shift requires admin awareness | [VERIFIED: learn.microsoft.com/intune/device-updates/windows/hotpatch + bleepingcomputer.com] |
| Windows driver/firmware update policy (separate from quality/feature) | Windows | GA | Distinct policy surface for vendor-supplied drivers and OEM firmware via WUfB | Drivers/firmware are NOT covered by quality/feature policies; require dedicated configuration | [VERIFIED: techcommunity.microsoft.com Windows ITPro Blog "Manage Windows driver and firmware updates with Microsoft Intune" + anoopcnair.com] |
| macOS DDM Software Update (Settings Catalog) | macOS 14+ | GA Service Release 2503 | Apple Declarative Device Management for macOS update enforcement; replaces deprecated MDM commands | Only forward-compatible enforcement path post-Apple OS 26; admin-friendly Intune Settings Catalog UX | [VERIFIED: learn.microsoft.com/intune/intune-service/protect/managed-software-updates-ios-macos + intuneirl.com] |
| iOS/iPadOS DDM Software Update (Settings Catalog) | iOS 17+ | GA on **unsupervised devices since August 2025** | Apple DDM for iOS update enforcement; basic keys (TargetOSVersion, TargetBuildVersion, TargetLocalDateTime, OfferPrograms) work on UNSUPERVISED iOS 17+ | Supervised-only constraint formally retracted; iOS 17+ baseline | [VERIFIED: learn.microsoft.com/intune/device-updates/apple/deprecated-mdm-policies-ios + software-updates-guide-ios-ipados] |
| Android Play Integrity API — strong integrity verdict (`MEETS_STRONG_INTEGRITY`) | Android 13+ | **Google enforced May 2025; Intune enforcement Sept 30 2025; fleet deadline Oct 31 2026** | Google attestation API verdict = "device passes hardware-backed integrity AND has security patch ≤12 months old" | Standard Android compliance signal; Intune compliance policy "Check strong integrity" maps directly | [VERIFIED: techcommunity.microsoft.com Intune Customer Success blog "Support tip: Changes to Google Play strong integrity for Android 13 or above" + learn.microsoft.com/intune/device-security/compliance/ref-android-enterprise-settings] |
| Zebra LifeGuard OTA (LG OTA) — Intune integration | Android (Zebra fleet) | **GA January 2026** | Zebra-vendor firmware OTA service integrated into Intune admin center; fire-and-forget deployments (NOT persistent compliance policies) | Zebra-specific firmware path; no MGP/Play equivalent for OEM firmware | [VERIFIED: learn.microsoft.com/intune/device-updates/android/zebra-lifeguard-ota-integration + learn.microsoft.com/intune/device-updates/android/fota-updates] |
| Samsung Knox Service Plugin (KSP) | Android (Samsung Knox-enabled) | GA, mature | Samsung's OEMConfig app for KPE-enabled device configuration including E-FOTA, Knox-specific features | Analogous OEM mechanism to Zebra LifeGuard OTA but DIFFERENT shape: KSP is OEMConfig-app-driven (deployed via Managed Google Play), while LifeGuard OTA is Intune-admin-center-native firmware deployment | [VERIFIED: docs.samsungknox.com/admin/uem/intune-configure-ksp-oemconfig + petervanderwoude.nl/post/android-enterprise-and-microsoft-intune-and-the-additional-configuration-layer] |

### Supporting (Configuration Surfaces & Helper Concepts)

| Surface | Purpose | When to Use | Source |
|---------|---------|-------------|--------|
| `VirtualizationBasedTechnology` CSP | Enable VBS prerequisite for Windows Hotpatch | Required for any Hotpatch-eligible device | [CITED: learn.microsoft.com/windows/client-management/mdm] [VERIFIED: bleepingcomputer.com Hotpatch coverage + 4sysops.com] |
| Intune admin center > Tenant administration > Windows Autopatch > Tenant management > Tenant settings > "Apply updates without restarting the device" toggle | **Available April 1 2026**; Allow / Block switch for Hotpatch default | Toggle to opt out before May 11 2026 default rollout if VBS not yet deployed fleet-wide | [VERIFIED: 4sysops.com "Microsoft Intune March 2026: Hotpatch by default" + bleepingcomputer.com] |
| Intune admin center > Devices > macOS > Configuration > New Policy > Settings Catalog > Declarative Device Management > "Software Update Enforce Latest" | macOS DDM update enforcement entry point | Replace `forceDelayedSoftwareUpdates` payload + `ScheduleOSUpdate` MDM command before Apple OS 26 release | [VERIFIED: ssmacadmin.com/posts/2026-03-31-ddm-intune-and-you + learn.microsoft.com/intune/intune-service/protect/managed-software-updates-ios-macos] |
| Intune admin center > Devices > Apple updates > iOS/iPadOS update policies | iOS DDM update enforcement (also via Settings Catalog DDM payloads) | Configure update enforcement on supervised AND unsupervised iOS 17+ devices | [VERIFIED: learn.microsoft.com/intune/device-updates/apple/software-updates-guide-ios-ipados] [CITED: docs/admin-setup-ios/04-configuration-profiles.md:128 already references this path] |
| Intune admin center > Tenant administration > Connectors and tokens > Firmware over-the-air update > Zebra | Zebra LifeGuard OTA tenant connector setup (one-time) | Per-tenant onboarding for LifeGuard OTA integration | [VERIFIED: learn.microsoft.com/intune/device-updates/android/zebra-lifeguard-ota-integration] |
| Intune admin center > Devices > By platform > Android > Manage updates > Android FOTA deployments | Zebra LifeGuard OTA deployment management surface | Create/monitor Zebra firmware deployments after tenant connector configured | [VERIFIED: learn.microsoft.com/intune/device-updates/android/fota-updates] |
| Intune compliance policy "Check strong integrity" setting | Enforces `MEETS_STRONG_INTEGRITY` verdict requirement | Enable to mark non-compliant any Android 13+ device that lacks ≤12-month security patch OR hardware-backed attestation | [VERIFIED: learn.microsoft.com/intune/device-security/compliance/ref-android-enterprise-settings] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Windows Autopatch | Custom WUfB ring policies | Admin-controlled cadence + restart timing; trades reduced burden for full configurability; **mutually exclusive with Autopatch on same device** |
| macOS DDM "Software Update Enforce Latest" | Legacy `forceDelayedSoftwareUpdates` MDM restriction | DEPRECATED; **REMOVED with Apple OS 26**; no forward-compatible alternative — DDM is the only path |
| iOS DDM Settings Catalog payload | Legacy `com.apple.SoftwareUpdate` payload + `ScheduleOSUpdate` MDM command | DEPRECATED; **REMOVED with Apple OS 26**; DDM is the only forward path. iOS 17+ retraction means DDM works on UNSUPERVISED too |
| Zebra LifeGuard OTA via Intune | Direct Zebra console (Zebra TechDocs FOTA Manager) | Standalone Zebra console works but breaks Intune compliance/reporting unification; LifeGuard via Intune is the recommended integrated path |
| Samsung KSP (OEMConfig) | Samsung E-FOTA standalone | E-FOTA is **OUT OF SCOPE for v1.5** per REQUIREMENTS line 113 (orthogonal to Intune enrollment; v1.4 exclusion preserved); KSP via OEMConfig is the in-Intune mechanism |
| Android `MEETS_STRONG_INTEGRITY` enforcement | Older `MEETS_DEVICE_INTEGRITY` (basic verdict) | Strong-integrity is the future-proof requirement; Google enforces, Intune enforces, fleet deadline Oct 31 2026 |

**Installation:** N/A — Phase 54 is documentation-only. The validator (`scripts/validation/check-phase-54.mjs`) has no dependencies (Node.js stdlib only per Phase 53 D-18 file-reads-only contract).

**Version verification:** Performed 2026-04-28. All Microsoft Learn URLs returned 200 + content; community blog dates current (March 2026 confirms Hotpatch + DDM coverage); ConfigMgr CB 2503 (April 2025) referenced from Phase 53 RESEARCH carry-forward.

---

## Architecture Patterns

### System Architecture Diagram

```
                         ADMIN (reads from search / hub / fleet view)
                                  |
                                  v
         +------------------------------------------------+
         |  docs/operations/00-index.md (Phase 53 owned)  |  <-- Phase 54 cross-references only
         |  + docs/operations/patch-management/          |      (V-54-28 NEGATIVE regression-guard)
         |    00-overview.md (Phase 54 entry point)      |
         +-------+----------------------------------------+
                 |
                 v
         +-------------------------+
         | 00-overview.md          |  <-- 1D Hybrid winner (D-01)
         | - Cross-platform table  |
         | - PITFALL-9 ring H2     |
         | - Deferral-vs-enforce   |
         | - Routing to 01-04      |
         | + > **Platform applic** |  (D-04 / V-54-26)
         +-+--+--+--+--------------+
           |  |  |  |
  +--------+  |  |  +-----------------+
  |           |  |                    |
  v           v  v                    v
+-------+  +-------+ +-------+   +----------+
|01-Win |  |02-mac | |03-iOS | |04-Android |
|       |  |       | |       | |           |
|PATCH- |  |PATCH- | |PATCH- | |PATCH-     |
|01/02/ |  |04     | |05     | |07/08      |
|03 fold|  |       | |       | |           |
|       |  |3-LAYER| |       | |3-LAYER    |
|Hotpat |  |HARD-  | |single | |HARD-DL    |
|H2,DRV |  |DL     | |inline | |MEETS_     |
|/FW H2 |  |Apple  | |Aug2025| |STRONG_    |
|       |  |OS 26  | |       | |INTEGRITY  |
|PIT9   |  |       | |       | |Oct31 2026 |
|qualif |  |+Lifeg | |+ Aug  | |+LifeGuard |
|ier    |  |uard   | |2025   | |Jan 2026 + |
|       |  |row?   | |       | |Samsung KSP|
+---+---+  +---+---+ +---+---+ +-----+-----+
    |          |        |             |
    |          |        |             |   atomic
    |          |    +---+---+         |   commit
    |          |    | retrofit         |   (D-21)
    |          |    | 07:35 cell    |  |
    |          |    | (PATCH-06)    |  |
    |          |    | + 04:128 fwd  |  |
    |          |    | -link addn    |  |
    |          |    +---------------+  |
    |          |                       |
    |          +----+-----+-----+------+
    |               |     |     |
    v               v     v     v
+----------------------------------+
| check-phase-54.mjs (28-32 V-NN)  |
| + REQ:55/166 errata              |
| + ROADMAP:267 errata             |
+----------------------------------+
                |
                v
        Phase 60 finalization:
        - Register in CI workflow
        - C13 broken-link sweep
        - C10/C11 expansion to ops (deferred)
                |
                v
        Phase 58 DEFER-08 consumes Phase 54 anchors
        (Software Updates row, link-not-copy)
                |
                v
        Phase 59 appends Operations H2 to docs/index.md
        (navigation-files-last; Phase 54 NOT touch index)
```

**Data flow notes:**
- Each per-platform file (01/02/03/04) loads with ITS frontmatter (`platform: <single>`) + cross-platform inline blockquote routing back to 00-overview + sub-bullets to siblings
- 00-overview is the cross-platform comparison surface; per-platform files are deep-dives
- HARD-DEADLINE three-layer pattern (D-13) only on macOS Apple OS 26 + Android MEETS_STRONG_INTEGRITY
- Soft cutovers (Hotpatch May 2026 + LifeGuard Jan 2026 + iOS Aug 2025) get single-callout
- Single atomic commit (D-21) couples all 9 sub-plan outputs

### Recommended Project Structure

```
docs/operations/patch-management/         <-- NEW DIRECTORY (Phase 54 creates)
├── 00-overview.md                         <-- 1D Hybrid scope; CD-01 platform: cross-platform | Windows,macOS,iOS,Android
├── 01-windows-wufb-rings.md               <-- PATCH-01/02/03 fold; platform: Windows
├── 02-macos-update-enforcement.md         <-- PATCH-04; platform: macOS; Deadlines H2 + 3-layer
├── 03-ios-update-lifecycle.md             <-- PATCH-05; platform: iOS; single inline ⚠️ blockquote
└── 04-android-patch-delivery.md           <-- PATCH-07/08 fold; platform: Android; Deadlines H2 + 3-layer + LifeGuard + KSP

docs/admin-setup-ios/                     <-- EXISTING (Phase 54 surgical edits only)
├── 04-configuration-profiles.md           <-- :128 forward-link append (D-08; PITFALL-13 navigation gap)
└── 07-device-enrollment.md                <-- :35 retrofit cell edit (D-07; PATCH-06 atomic)

.planning/                                 <-- EXISTING (Phase 54 errata edits only)
├── REQUIREMENTS.md                        <-- :55 + :166 literal-purge `05-compliance-policy.md` → `07-device-enrollment.md`
└── ROADMAP.md                             <-- :267 SC#3 conjunct b literal-purge

docs/operations/                          <-- EXISTING (Phase 53 created; Phase 54 NOT amend)
└── 00-index.md                            <-- V-54-28 NEGATIVE regression-guard: NO `## Patch Management` H2 (Phase 59 owns)

scripts/validation/
└── check-phase-54.mjs                     <-- NEW; 28-32 V-54-NN per D-17
```

### Pattern 1: Cross-Platform Inline `> **Platform applicability:**` Blockquote (Phase 53 D-08 Token Inheritance)

**What:** Every per-platform file in a multi-platform ops domain carries a TOP-of-file blockquote (after frontmatter, line 9) with the literal token `> **Platform applicability:**` followed by ≤4 sub-bullets pointing to the cross-platform 00-overview hub + sibling files.

**When to use:** Any new file inside `docs/operations/patch-management/` (or any future `docs/operations/<domain>/` ops directory).

**Forbidden:** Bare `> **Platform:**` token (no qualifier word). Zero corpus precedent; 28+ instances of `> **Platform <qualifier>:**` family. V-54-27 NEGATIVE regression-guard purges any bare-noun forks.

**Example (verified verbatim from `docs/operations/co-management/00-overview.md:9-20`):**
```markdown
> **Platform applicability:** This guide is Windows-specific (ConfigMgr + Intune co-management).
> **macOS:** No co-management equivalent — Microsoft Intune does not federate with Jamf at the
> workload-slider level. Migration path: Jamf → Intune via ABM MDM transfer (release device
> assignment in Jamf-bound MDM server in ABM, then re-assign to Intune-bound MDM server; in-use
> devices require user-initiated re-enrollment). See [macOS Enrollment Profile](../../admin-setup-macos/02-enrollment-profile.md).
> **iOS/iPadOS:** No co-management equivalent — Apple MDM is single-server-per-device. Migration
> path: MAM → MDM transition (MAM-WE app protection policies coexist with new MDM enrollment).
> See [iOS/iPadOS Admin Setup](../../admin-setup-ios/00-overview.md) and
> [iOS MAM App Protection](../../admin-setup-ios/09-mam-app-protection.md).
> **Android:** No co-management equivalent. Migration paths: legacy Device Administrator →
> Android Enterprise (DA deprecated August 2022; wipe + re-enrollment required); MAM → MDM for
> BYOD. See [Android Admin Setup](../../admin-setup-android/00-overview.md).
```

**Phase 54 adaptation:** Pointer-only — Phase 54 02-macos-update-enforcement.md blockquote is shorter (the substantive cross-platform content lives in 00-overview per D-05). Sub-bullets point to `../00-overview.md#cross-platform-comparison` + 3 sibling files.

### Pattern 2: HARD-DEADLINE Three-Layer Callout (Phase 53 D-05 + Phase 52 D-01 Inheritance)

**What:** For a hard deadline with calendar enforcement (admin will be locked-out / non-compliant past date), use 3 layers in the same file:

1. **Layer 1 (table-cell):** Risk/Status column = `**[HARD-DEADLINE]** — see callout`
2. **Layer 2 (`> ⚠️` blockquote immediately below table):** Full deadline narrative with all dates + cascade context
3. **Layer 3 (per-occurrence inline):** ≥2 inline `[HARD-DEADLINE — see Deadlines H2]` reminders adjacent to mentions of the deadline-bearing token

**When to use:** ONLY for hard-deadline items with absolute calendar locks. Phase 54 applies to TWO:
- macOS Apple OS 26 removal of `forceDelayedSoftwareUpdates` + `com.apple.SoftwareUpdate` payload + `ScheduleOSUpdate` MDM command (Apple OS 26 release ~Fall 2026)
- Android MEETS_STRONG_INTEGRITY fleet compliance deadline October 31 2026

**Soft cutovers DO NOT get three-layer:** Hotpatch May 2026 default, April 2026 Intune opt-out toggle, LifeGuard Jan 2026 GA, iOS Aug 2025 unsupervised retraction — these get single-callout per D-14.

**Example (Phase 53 D-05 HIGH-RISK three-layer; Phase 54 inheritance shape):**
```markdown
| Workload | Slider state | Risk | Action before moving |
|----------|--------------|------|----------------------|
| Endpoint Protection | ConfigMgr | **[HIGH-RISK]** — see callout | Verify Intune Defender policy |

> ⚠️ **HIGH-RISK — Endpoint Protection workload**
> Do not move this slider until Intune Defender for Endpoint policy is published, targeted, and confirmed reporting healthy.

[...later in file...]

The Endpoint Protection workload [HIGH-RISK — see callout above] requires...
```

**Phase 54 adaptation per CD-06/CD-07:** Mandated literal text shapes for blockquote (D-13); plan-author discretion only on phrasing within mandated date/token preservation.

### Pattern 3: Same-Commit-Atomic Retrofit (v1.4.1 RETROSPECTIVE Lesson 166)

**What:** When a new artifact retracts a claim made in an existing artifact, both edits MUST land in the same git commit. Validator NEGATIVE+POSITIVE pair forces atomicity (NEGATIVE = old claim purged, POSITIVE = new claim present + cross-link present).

**When to use:** Any phase where a new doc retracts/corrects an existing doc.

**Phase 54 application:**
- New `03-ios-update-lifecycle.md` (POSITIVE: contains DDM-on-unsupervised retraction)
- Old `07-device-enrollment.md:35` cell (NEGATIVE: old "Supervised-only in iOS 17+ enforcement policies" purged + POSITIVE: new DDM-correction prose + cross-link to 03-ios)
- Validator V-54-19 enforces: cell does NOT contain old literal AND DOES contain regex `(?i)DDM.*unsupervised.*iOS\s*17` + cross-link

**Why atomic:** If split into two commits, commit-1 leaves the corpus internally contradictory ("new file says X; old file still says NOT X"). v1.4.1 RETROSPECTIVE line 166 documents 6× validation of this pattern.

### Pattern 4: REQ Traceability Firewall via NEGATIVE Regression-Guard

**What:** Validator asserts that 00-overview does NOT contain substantive content owned by per-platform files. REQ traceability table maps zero PATCH requirements to 00-overview, so any PATCH-NN content in 00-overview is a structural violation.

**When to use:** Any multi-file ops domain where 00-overview is a routing hub but not content-owner.

**Phase 54 application:** V-54-29 NEGATIVE regression-guard. 00-overview MUST NOT contain literal substantive coverage of: `Hotpatch`, `VBS`, `opt-out` (PATCH-02 territory), `MEETS_STRONG_INTEGRITY` full timeline (PATCH-07 territory), supervised-only retraction prose (PATCH-05 territory), or Zebra LifeGuard config (PATCH-08 territory) BEYOND mention in cross-platform comparison table cells. Comparison table cells may name the concepts; body prose must not duplicate them.

### Anti-Patterns to Avoid

- **Bare `> **Platform:**` token:** Forbidden lexicon-family fork. Use `> **Platform applicability:**` verbatim.
- **PATCH-NN content in 00-overview body prose:** REQ traceability firewall violation. Cross-platform comparison table cells may NAME concepts; body prose must not duplicate per-platform substantive content.
- **Bare "ring" without WUfB/Autopatch qualifier in 01-windows-wufb-rings.md body:** PITFALL-9 collision. Every "ring" must be preceded by `WUfB deployment` OR `Autopatch` qualifier within ~30-char window.
- **Three-layer treatment for soft cutovers:** Over-engineering; reserved for hard deadlines (Apple OS 26 + MEETS_STRONG_INTEGRITY only).
- **`docs/index.md` Operations H2 in Phase 54:** Out of scope; Phase 59 owns navigation-files-last.
- **`docs/operations/00-index.md` Patch Management H2 amendment:** Phase 53 owns the file; Phase 54 cross-references only (DPO-Phase53-01 + V-54-28 NEGATIVE regression-guard).
- **Frontmatter `valid_as_of` pin:** Untested-precedent risk; reuse `last_verified` per existing 60-day cycle (D-15).
- **Same-commit PITFALL-13 allowlist seeding:** Premature; Phase 60 finalization handles when first false-positive surfaces (CDI-Phase54-03; YAGNI).
- **Splitting retrofit + content commits:** Violates ROADMAP:271 + RETROSPECTIVE:166 atomicity contract; V-54-19 will fail in commit-1 regardless of split direction.
- **5-row comparison table without "Hard deadline" or platform-specific status anchors:** CD-03 says minimum 5 rows; recommended 6-7 to surface hard-deadline timing per platform (improves admin fleet-level decision-making).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-platform routing surface for ops domain | Custom routing convention per file | Phase 53 D-08 `> **Platform applicability:**` token verbatim | 28+ corpus instances; lexicon-family preservation; V-54-27 enforces |
| Hard-deadline callout shape | Custom warning convention | Phase 53 D-05 + Phase 52 D-01 three-layer pattern | Already methodology-family-validated; cross-domain transferability endorsed (DPO-Phase52-07) |
| Phase-validator | Custom test framework | `check-phase-NN.mjs` file-reads-only / no-shared-module / regex-based per Phase 48 D-25 lineage | Validator-as-deliverable AUDIT-06 contract; CI workflow registration in Phase 60 expects this shape |
| Multi-platform comparison content | Per-file substantive content duplicated | Single 00-overview comparison table + per-platform deep-dive files (link-not-copy) | PITFALL-7 link-not-copy contract; REQ traceability firewall (V-54-29 enforces) |
| Markdown link-checking | Custom link validator | `markdown-link-check` configured per Phase 48 D-08 (informational at Phase 54; blocking after Phase 60) | Standard tool with redirect-following + allowlist support; Phase 48 D-15 lazy-add discipline |
| iOS DDM update key naming convention | Custom key documentation | Apple DDM standard keys verbatim: `TargetOSVersion`, `TargetBuildVersion`, `TargetLocalDateTime`, `OfferPrograms` | These are Apple-defined keys; mismatch confuses admins reading Apple docs alongside Phase 54 content |
| Windows Hotpatch eligibility check | Custom logic flow | Document Microsoft's published prereqs verbatim: VBS enabled + Win11 Enterprise 24H2+ + Microsoft Intune Plan 1 license | Microsoft-maintained eligibility list; admin-facing; misstating prereqs causes fleet-wide opt-in failures |
| Strong-integrity verdict definition | Custom interpretation | Google + Microsoft Learn definition verbatim: "device passes hardware-backed integrity AND has security patch ≤12 months old (Android 13+)" | Google maintains the verdict definition; misstating creates false-positive non-compliance reports |

**Key insight:** Phase 54 is documentation-only. The "don't hand-roll" surface is methodology family preservation (Phase 53 patterns) + tool-chain (validator pattern + markdown-link-check) + vendor-defined naming (DDM keys + Hotpatch prereqs + strong-integrity verdict). The temptation to "improve on" Phase 53's `> **Platform applicability:**` token by shortening to bare `> **Platform:**` was already attempted in adversarial review (F-2C-01 disprove rejected by Referee on lexicon-family-fork grounds).

---

## Runtime State Inventory

> Phase 54 is a documentation phase with retrofit components. The runtime "state" is git-corpus state, not databases or external services. The retrofit cell + REQ/ROADMAP errata + same-commit atomicity ARE the load-bearing runtime concern.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| **Stored data** | None — Phase 54 has no database, ChromaDB, Mem0, n8n SQLite, Redis, or other datastore touchpoints. The `07-device-enrollment.md:35` retrofit is a markdown table-cell edit (text replacement in git-tracked file), not a database mutation. | None — verified by file-system grep. |
| **Live service config** | None — Phase 54 produces markdown documentation, not running service configuration. No Datadog dashboards, Tailscale ACL tags, Cloudflare Tunnels, or n8n workflows reference Phase 54 strings. | None — verified by absence of any "patch-management" or "PATCH-NN" string references in `.git/`-external services. |
| **OS-registered state** | None — no Windows Task Scheduler tasks, pm2 processes, launchd plists, or systemd units register the strings being modified. | None — verified by file-system scope (only `docs/` + `.planning/` + `scripts/validation/` touched). |
| **Secrets and env vars** | None — no SOPS keys, .env file references, or CI/CD env var injections reference Phase 54 strings. The `check-phase-54.mjs` validator reads file content via Node.js `fs.readFileSync` (no env / no secrets). | None — verified by validator-pattern inheritance from `check-phase-53.mjs` (file-reads-only). |
| **Build artifacts / installed packages** | None — no compiled outputs, no `pip install -e`, no `npm install -g`, no Docker tags. Phase 54 is pure markdown + a Node.js-stdlib script. | None — verified by absence of any package.json / setup.py / Dockerfile changes in Phase 54 scope. |
| **Git-corpus state (LOAD-BEARING for Phase 54)** | (a) `docs/admin-setup-ios/07-device-enrollment.md:35` cell verbatim: `\| OS update enforcement (forced install deadlines via DDM or device restrictions) \| **No** \| Supervised-only in iOS 17+ enforcement policies. \|` — VERIFIED by Read tool 2026-04-28; (b) `.planning/REQUIREMENTS.md:55` literal `05-compliance-policy.md` (PATCH-06 row); (c) `.planning/REQUIREMENTS.md:166` literal `05-compliance-policy.md` (traceability table); (d) `.planning/ROADMAP.md:267` literal `05-compliance-policy.md` (SC#3 conjunct b); (e) `docs/operations/00-index.md` does NOT contain `## Patch Management` H2 — VERIFIED by Read tool 2026-04-28; (f) `docs/admin-setup-ios/04-configuration-profiles.md:128` already substantively correct — VERIFIED by Read tool 2026-04-28. | **Action required (atomic; D-21):** (1) Edit cell at `07-device-enrollment.md:35` per CD-09 wording; (2) Purge `05-compliance-policy.md` literal at REQ:55, REQ:166, ROADMAP:267 (replace with `07-device-enrollment.md`); (3) Append forward-link sentence at `04-configuration-profiles.md:128` per D-08; (4) Author 5 new content files; (5) Author validator with V-54-19 NEGATIVE+POSITIVE pair + V-54-21 NEGATIVE-purge regression-guard + V-54-28 NEGATIVE NOT-amended regression-guard. |

**The canonical question (rename/refactor framing per research-prompt rubric):** *After every file in the repo is updated, what runtime systems still have the old string cached, stored, or registered?*

**Answer:** No runtime systems beyond git-corpus. The retrofit at `07:35` and the `05-compliance-policy.md` literal-purge are pure git-tracked-file edits; no database/cache/service holds these strings outside the git working tree. The only "runtime concern" is COMMIT atomicity — splitting the retrofit + content into multiple commits creates a corpus-internal contradiction window (commit-1 has new file with retraction; old file still asserts the negation), which is exactly what V-54-19 NEGATIVE+POSITIVE pair forces atomicity to prevent.

---

## Common Pitfalls

### Pitfall A: Hotpatch Eligibility Misread

**What goes wrong:** Admin reads "Windows Hotpatch becomes default May 2026" and assumes ALL Windows devices automatically receive hotpatch. In practice, hotpatch requires Win11 Enterprise 24H2+ AND VBS enabled AND April 2026 cumulative update installed (baseline month). Devices missing any prereq stay on standard reboot-required cumulative update path; admin observes "fleet didn't actually adopt hotpatch in May 2026" and incorrectly attributes to Microsoft service issue.

**Why it happens:** "Default by May 2026" is the headline; eligibility prereqs are footnoted in Microsoft Learn. VBS specifically is non-trivial — it requires CPU virtualization, Hyper-V optional component, Secure Boot, TPM 2.0, and `VirtualizationBasedTechnology` CSP enablement. Many production Win11 devices have VBS disabled by IT policy.

**How to avoid:** PATCH-02 H2 in `01-windows-wufb-rings.md` MUST list ALL eligibility prereqs as a checklist, not as prose. Include the explicit Tenant settings opt-out toggle path (`Tenant administration > Windows Autopatch > Tenant management > Tenant settings > "Apply updates without restarting the device"`) — admins who can't deploy VBS fleet-wide before May 2026 NEED the opt-out path.

**Warning signs:**
- Hotpatch H2 says "default May 2026" without listing prereqs
- VBS not mentioned alongside Hotpatch
- April 2026 baseline-month requirement omitted
- Opt-out toggle location not specified

**Confidence:** HIGH. Verified via [VERIFIED: bleepingcomputer.com/news/microsoft/microsoft-to-enable-hotpatch-security-updates-by-default-in-may + 4sysops.com Mar 2026 + learn.microsoft.com/intune/device-updates/windows/hotpatch].

### Pitfall B: Dual Scan Source Conflict (PATCH-03 + Co-Management Boundary)

**What goes wrong:** Admin in a co-managed environment (SCCM + Intune workload sliders) configures Intune driver/firmware update policy expecting drivers to flow from Intune. But if SCCM still controls the WU workload (slider = ConfigMgr), the device runs in "dual scan" mode — scans both WSUS (on-prem ConfigMgr) AND Windows Update service. The partial-scan behavior causes drivers/firmware that should come from Intune to instead come from WSUS (or vice versa, depending on policy authority order). Admin sees inconsistent driver coverage and can't trace cause to dual scan.

**Why it happens:** Dual scan is a Windows Update client behavior triggered by mixed-source policies; it's "by design" but non-obvious. ConfigMgr in CB 2503+ has fixes for the partial-scan issue (per the techcommunity Microsoft article), but admins on older ConfigMgr branches still see this.

**How to avoid:** PATCH-03 H2 in `01-windows-wufb-rings.md` MUST: (a) document driver/firmware update policy as separate from quality/feature update rings; (b) include a "co-management interaction" sub-section explicitly calling out the dual-scan trap; (c) reference Phase 53 `02-windows-workload-sliders.md` for Windows Update workload slider state — the dual-scan trap only triggers when WU workload is on ConfigMgr; (d) Microsoft's recommendation: use GPO or Intune Settings catalog to set ScanSource policies (overrides ConfigMgr client values).

**Warning signs:**
- PATCH-03 H2 documents driver/firmware policy without mentioning dual scan
- No cross-reference to Phase 53 workload slider states
- Admin unable to determine "which policy source wins" in mixed mode

**Confidence:** HIGH. Verified via [VERIFIED: patchmypc.com/blog/sccm-co-management-dual-scan + learn.microsoft.com/intune/configmgr/hotfix/2509/36495448 + manishbangia.com/dual-scan-impact-on-wufb-policies].

### Pitfall C: Strong Integrity Verdict Misinterpretation

**What goes wrong:** Admin enables Intune compliance "Check strong integrity" setting expecting it to mark older Android devices non-compliant for missing modern security. The setting actually maps to Google's `MEETS_STRONG_INTEGRITY` Play Integrity verdict, which has THREE component requirements: (1) hardware-backed attestation (TEE/StrongBox); (2) Android 13+; (3) security patch ≤12 months old. Admin discovers Android 12 fleet devices are flagged non-compliant — but they would never pass strong-integrity regardless of patch level (Android 13+ baseline). Conversely, Android 13 devices on a 14-month-old patch are also non-compliant despite "having a recent OS." Admin can't easily distinguish the failure mode.

**Why it happens:** "Strong integrity" is a single verdict string but encodes 3 orthogonal checks. Google enforces fleet-wide May 2025; Intune enforces Sept 30 2025; the Oct 31 2026 deadline gives admins a 13-month grace for fleet rollover from older devices. OEM patch-rollout variance (Samsung typically <30 days, generic AOSP devices sometimes 6+ months) makes the 12-month security-patch window operationally tight on certain OEM SKUs.

**How to avoid:** PATCH-07 H2 in `04-android-patch-delivery.md` MUST: (a) decompose `MEETS_STRONG_INTEGRITY` into its 3 component checks; (b) include the cascade timeline (May 2025 / Sept 30 2025 / Oct 31 2026) as a HARD-DEADLINE three-layer per D-13; (c) document Android 13+ baseline explicitly; (d) include OEM patch-rollout variance as a planning consideration (Samsung Knox patch cadence ≠ Pixel cadence ≠ AOSP-vendor cadence).

**Warning signs:**
- `MEETS_STRONG_INTEGRITY` defined as single requirement, not 3 components
- Cascade dates omitted or presented out of order
- Android 13+ baseline not surfaced
- No OEM patch-rollout variance discussion

**Confidence:** HIGH. Verified via [VERIFIED: techcommunity.microsoft.com Intune Customer Success blog "Support tip: Changes to Google Play strong integrity for Android 13 or above" + learn.microsoft.com/intune/device-security/compliance/ref-android-enterprise-settings].

### Pitfall D: Apple OS 26 Removal Date Ambiguity

**What goes wrong:** Admin reads "legacy MDM update commands deprecated AND removed with Apple OS 26" and plans migration assuming Apple OS 26 ships in a specific month. In practice, Apple OS 26 = macOS 26 + iOS 26 + iPadOS 26 + watchOS 26 + tvOS 26 (unified version numbering announced WWDC 2025); release window is "Fall 2026" (typically September-November). The legacy commands continue to FUNCTION on pre-OS-26 devices indefinitely — they just won't function on OS-26+. Admin who reads "removed with OS 26" and disables legacy MDM in April 2026 loses update enforcement on existing fleet for 4-6 months until DDM rollout completes.

**Why it happens:** "Removed with Apple OS 26" is technically accurate but operationally ambiguous. Apple's deprecation lifecycle: WWDC 2025 announcement → spring 2026 betas → Fall 2026 GA. Admin lifecycle: assume linear, plan accordingly.

**How to avoid:** PATCH-04 macOS Deadlines H2 + Layer 2 blockquote MUST: (a) state "removed with Apple OS 26 release" not "removed with Apple OS 26"; (b) clarify that pre-OS-26 devices retain legacy MDM functionality; (c) frame DDM migration as "land BEFORE Apple OS 26 release (~Fall 2026)" not "land before Apple OS 26 announcement"; (d) explicitly state that maintaining BOTH legacy MDM + new DDM during transition is acceptable and recommended (devices respond to both; DDM takes precedence on iOS 17+ / macOS 14+).

**Warning signs:**
- "Removed with Apple OS 26" without "release" qualifier
- Migration framed as "remove legacy NOW" instead of "deploy DDM now; legacy continues to function pre-OS-26"
- No transition-period guidance (parallel legacy + DDM)

**Confidence:** HIGH. Verified via [VERIFIED: simplemdm.com/blog/wwdc-2025 + intuneirl.com macOS-iOS-26-for-enterprise + techcommunity.microsoft.com Intune blog "Move to declarative device management for Apple software updates"].

### Pitfall E: Zebra LifeGuard vs Samsung KSP Confusion (Same Surface, Different Mechanism)

**What goes wrong:** Admin reads "Zebra LifeGuard OTA via Intune (GA Jan 2026); Samsung KSP is the analog OEM mechanism" and assumes both work via the same admin center surface. They don't:
- **Zebra LifeGuard OTA**: Intune-native firmware deployment via `Tenant administration > Connectors and tokens > Firmware over-the-air update > Zebra` (one-time setup) + `Devices > By platform > Android > Manage updates > Android FOTA deployments` (per-deployment management). Fire-and-forget deployments, NOT compliance policies.
- **Samsung KSP**: OEMConfig app deployed via Managed Google Play (MGP). Configures Knox-specific features INCLUDING firmware management via E-FOTA backend. NO Intune-native firmware-deployment surface; firmware is configured as KSP managed configuration alongside other Knox features.

Admin tries to find "Samsung firmware deployment" in `Tenant administration > Connectors and tokens` and can't, then incorrectly concludes Samsung firmware management isn't supported.

**Why it happens:** "Analog OEM mechanism" framing in the requirement (PATCH-08) is true at the conceptual level but obscures the mechanism difference. KSP is OEMConfig-via-MGP; LifeGuard is Intune-native-firmware-tunnel.

**How to avoid:** PATCH-08 sub-section in `04-android-patch-delivery.md` MUST: (a) document Zebra LifeGuard with explicit admin center paths (both connector setup + deployment management); (b) document Samsung KSP as OEMConfig-via-MGP with explicit reference to `04-android-mgp-lifecycle.md` (Phase 55) for OEMConfig pipeline; (c) explicitly state the mechanism-shape difference; (d) cross-reference Knox Mobile Enrollment (Phase 44 v1.4.1) for prereq context — KSP requires Knox Platform for Enterprise (KPE) license; (e) Samsung E-FOTA standalone is OUT OF SCOPE per REQUIREMENTS:113 — clarify KSP is the IN-SCOPE Samsung mechanism.

**Warning signs:**
- Zebra LifeGuard and Samsung KSP described together without mechanism-shape difference
- KSP path documented as "Tenant administration > Connectors..." (incorrect; KSP is via MGP)
- E-FOTA standalone referenced as in-scope (it's not; v1.4 exclusion preserved)

**Confidence:** HIGH. Verified via [VERIFIED: learn.microsoft.com/intune/device-updates/android/zebra-lifeguard-ota-integration + docs.samsungknox.com/admin/uem/intune-configure-ksp-oemconfig + petervanderwoude.nl Android Enterprise + Intune additional configuration layer + .planning/REQUIREMENTS.md:113 explicit exclusion].

### Pitfall F: 00-Overview Scope Creep (REQ Traceability Firewall Violation)

**What goes wrong:** Plan author for 54-01 (00-overview) reads CONTEXT D-01 1D Hybrid scope and includes "brief mention" of Hotpatch, MEETS_STRONG_INTEGRITY, and DDM Settings Catalog path in 00-overview body prose alongside the cross-platform comparison table. This duplicates content owned by 01/02/03/04 per-platform files. V-54-29 NEGATIVE regression-guard fails on first commit; plan author has to refactor to remove substantive content from 00-overview.

**Why it happens:** "Cross-platform comparison" feels like it SHOULD include enough detail to be useful standalone. But the 1D Hybrid winner explicitly mandates link-not-copy: 00-overview is the ROUTING + TERMINOLOGY hub, not the content repository.

**How to avoid:** Plan-time enforcement: (a) author 00-overview LAST after 01-04 are drafted, so duplicate content is visible; (b) treat 00-overview comparison-table cells as 1-2-sentence descriptors WITH cross-link, not paragraphs; (c) PITFALL-9 ring-disambiguation H2 IS allowed substantive content (it's cross-platform terminology, not Windows-specific configuration); (d) deferral-vs-enforcement terminology section is allowed (it's cross-platform vocabulary).

**Warning signs:**
- 00-overview > 350 lines (CONTEXT D-01 hard cap)
- 00-overview comparison-table cell contains > 2 sentences of substantive content
- 00-overview body prose contains literal `Hotpatch` / `VBS` / `opt-out` / `MEETS_STRONG_INTEGRITY` outside cross-platform-comparison-table cells
- V-54-29 fails on commit

**Confidence:** HIGH. CONTEXT D-01 + V-54-29 enforce mechanically.

### Pitfall G: Silent Atomicity Split (D-21 Violation)

**What goes wrong:** Plan author drafts 54-01..05 in one branch, drafts retrofit 54-06/07 + errata 54-08 in another branch, commits separately, validator passes on second commit (because final state is correct). But commit-1 left the corpus internally contradictory for the duration; if anything went wrong (build failure, reviewer feedback), the partial state would be live in main.

**Why it happens:** "Atomic commit" feels like a workflow nicety, not a load-bearing constraint. ROADMAP:271 says "MUST be same-commit-atomic" but plan authors may treat as recommendation.

**How to avoid:** Pre-commit hook MUST stage all 9 deliverables together. V-54-19 NEGATIVE+POSITIVE pair forces atomicity by VALIDATOR — if commit-1 contains new iOS guide WITHOUT retrofit, V-54-19's NEGATIVE half (cell does NOT contain old "Supervised-only" literal) fails because cell still has old content. If commit-1 contains retrofit WITHOUT new iOS guide, V-54-19's POSITIVE half (cell DOES contain cross-link to `03-ios-update-lifecycle.md`) fails because target file doesn't exist for cross-link to be valid. Either way, validator blocks.

**Warning signs:**
- Plan author's local git log shows multiple commits before final push
- Pre-commit hook bypassed with `--no-verify`
- Commit message describes "first I'll add the new files, then I'll retrofit..."

**Confidence:** HIGH. CDI-Phase54-05 + V-54-19 enforce mechanically.

---

## Code Examples

> Phase 54 is documentation-only. "Code" examples below are markdown snippets + validator regex patterns + admin center navigation strings.

### Example 1: Cross-Platform Inline Blockquote — Per-Platform File Top (D-04)

**Source:** Adapted from `docs/operations/co-management/00-overview.md:9-20` Phase 53 verified pattern.

**For `02-macos-update-enforcement.md` (line 9, after frontmatter):**
```markdown
> **Platform applicability:** This guide is macOS-specific (Apple DDM Software Update enforcement via Intune Settings Catalog).
> For cross-platform patch-delivery comparison + ring/deferral/enforcement terminology, see [Patch Management Overview](00-overview.md).
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md) for WUfB deployment ring + Autopatch + Hotpatch.
> **iOS/iPadOS:** See [iOS Update Lifecycle](03-ios-update-lifecycle.md) for DDM update enforcement (iOS 17+ unsupervised support).
> **Android:** See [Android Patch Delivery](04-android-patch-delivery.md) for MEETS_STRONG_INTEGRITY + Zebra LifeGuard OTA + Samsung KSP.
```

### Example 2: HARD-DEADLINE Three-Layer Pattern — macOS Apple OS 26 (D-13)

**For `02-macos-update-enforcement.md` Deadlines H2:**

```markdown
## Deadlines & Cutover Dates

| Mechanism | Status | Action by | Risk |
|-----------|--------|-----------|------|
| `forceDelayedSoftwareUpdates` MDM restriction | Deprecated; removed with Apple OS 26 release | Apple OS 26 release (~Fall 2026) | **[HARD-DEADLINE]** — see callout |
| `com.apple.SoftwareUpdate` configuration payload | Deprecated; removed with Apple OS 26 release | Apple OS 26 release (~Fall 2026) | **[HARD-DEADLINE]** — see callout |
| `ScheduleOSUpdate` MDM command | Deprecated; removed with Apple OS 26 release | Apple OS 26 release (~Fall 2026) | **[HARD-DEADLINE]** — see callout |
| DDM "Software Update Enforce Latest" (Settings Catalog) | GA — only forward-compatible path | NOW | Standard config |

> ⚠️ **Hard deadline (Apple OS 26):** forceDelayedSoftwareUpdates, com.apple.SoftwareUpdate payload, and ScheduleOSUpdate MDM command are deprecated AND removed with Apple OS 26. DDM "Software Update Enforce Latest" in Intune Settings Catalog is the only forward-compatible enforcement path. Migration MUST land before Apple OS 26 release.

[...later in file body, e.g., Configuration steps section...]

If your fleet currently relies on `forceDelayedSoftwareUpdates` [HARD-DEADLINE — see Deadlines H2], the migration sequence is:

1. ...
2. Replace `com.apple.SoftwareUpdate` payload [HARD-DEADLINE — see Deadlines H2] with DDM "Software Update Enforce Latest"
3. ...
```

### Example 3: HARD-DEADLINE Three-Layer Pattern — Android MEETS_STRONG_INTEGRITY (D-13)

**For `04-android-patch-delivery.md` Deadlines H2:**

```markdown
## Deadlines & Cutover Dates

| Mechanism | Status | Action by | Risk |
|-----------|--------|-----------|------|
| Play Integrity `MEETS_STRONG_INTEGRITY` verdict (Android 13+ + hardware-backed + ≤12-month patch) | Google enforced May 2025; Intune enforced Sept 30 2025; fleet deadline Oct 31 2026 | **Oct 31 2026** | **[HARD-DEADLINE]** — see callout |
| Zebra LifeGuard OTA via Intune | GA January 2026 | Adopt for Zebra fleets | Soft cutover |
| Samsung KSP (OEMConfig) | GA, mature | Adopt for Samsung Knox fleets via MGP | Soft cutover |

> ⚠️ **Hard deadline (Oct 31 2026):** MEETS_STRONG_INTEGRITY enforcement: Google enforced May 2025; Intune enforced September 30 2025; fleet compliance deadline October 31 2026. Android 13+ devices must have a security patch ≤12 months old. Devices not meeting this threshold will fail Intune compliance after Oct 31 2026.

[...later in file body...]

Devices flagged with MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2] failure will report non-compliant in Intune dashboards.

The MEETS_STRONG_INTEGRITY [HARD-DEADLINE — see Deadlines H2] verdict requires three concurrent conditions:
1. Hardware-backed attestation (TEE/StrongBox)
2. Android 13 or higher
3. Security patch ≤12 months old
```

### Example 4: Validator Pattern — V-54-19 NEGATIVE+POSITIVE Pair (D-18)

**Source:** Adapted from `scripts/validation/check-phase-53.mjs` Phase 53 verified pattern.

```javascript
// V-54-19: PATCH-06 retrofit cell-text NEGATIVE + POSITIVE pair (D-07 + SC#3 conjunct b)
{
  id: 19, name: "V-54-19: 07-device-enrollment.md:35 retrofit cell — old literal purged + DDM-correction + cross-link",
  run() {
    const c = readFile("docs/admin-setup-ios/07-device-enrollment.md");
    if (c === null) return { pass: false, detail: "File missing: docs/admin-setup-ios/07-device-enrollment.md" };

    // NEGATIVE half: old literal purged
    if (/Supervised-only in iOS 17\+ enforcement policies/.test(c)) {
      return { pass: false, detail: "NEGATIVE half failed: old 'Supervised-only in iOS 17+ enforcement policies' literal still present" };
    }

    // POSITIVE half (a): DDM-correction prose
    if (!/DDM[^\n]{0,80}unsupervised[^\n]{0,80}iOS\s*17/i.test(c)) {
      return { pass: false, detail: "POSITIVE half (a) failed: DDM-on-unsupervised-iOS-17 correction prose not found" };
    }

    // POSITIVE half (b): cross-link to 03-ios-update-lifecycle.md
    if (!/operations\/patch-management\/03-ios-update-lifecycle\.md/.test(c)) {
      return { pass: false, detail: "POSITIVE half (b) failed: cross-link to 03-ios-update-lifecycle.md not found" };
    }

    return { pass: true, detail: "Old literal purged + DDM correction + cross-link all present" };
  }
}
```

### Example 5: Validator Pattern — V-54-21 NEGATIVE Literal-Purge (D-09)

```javascript
// V-54-21: REQ + ROADMAP errata literal-purge NEGATIVE regression-guard
{
  id: 21, name: "V-54-21: REQUIREMENTS.md + ROADMAP.md contain ZERO occurrences of 05-compliance-policy.md literal",
  run() {
    const failures = [];
    for (const f of [".planning/REQUIREMENTS.md", ".planning/ROADMAP.md"]) {
      const c = readFile(f);
      if (c === null) { failures.push(f + ": file missing"); continue; }
      const matches = c.match(/05-compliance-policy\.md/g);
      if (matches && matches.length > 0) {
        failures.push(f + ": " + matches.length + " occurrences of '05-compliance-policy.md' literal still present (off-by-one not purged)");
      }
    }
    if (failures.length === 0) return { pass: true, detail: "Both files purged" };
    return { pass: false, detail: failures.join(" | ") };
  }
}
```

### Example 6: Validator Pattern — V-54-26 Cross-Platform Blockquote Presence (D-04)

```javascript
// V-54-26: each of 5 patch-management files contains > **Platform applicability:** blockquote within first 50 lines
{
  id: 26, name: "V-54-26: cross-platform inline blockquote at TOP of each patch-management file",
  run() {
    const PM_FILES = [
      "docs/operations/patch-management/00-overview.md",
      "docs/operations/patch-management/01-windows-wufb-rings.md",
      "docs/operations/patch-management/02-macos-update-enforcement.md",
      "docs/operations/patch-management/03-ios-update-lifecycle.md",
      "docs/operations/patch-management/04-android-patch-delivery.md"
    ];
    const failures = [];
    for (const f of PM_FILES) {
      const c = readFile(f);
      if (c === null) { failures.push(f + ": file missing"); continue; }
      const lines = c.split('\n').slice(0, 50);
      const found = lines.some(l => /^>\s+\*\*Platform applicability:\*\*/.test(l));
      if (!found) failures.push(f + ": no '> **Platform applicability:**' blockquote in first 50 lines");
    }
    if (failures.length === 0) return { pass: true, detail: PM_FILES.length + " files valid" };
    return { pass: false, detail: failures.join(" | ") };
  }
}
```

### Example 7: Validator Pattern — V-54-27 Bare-`> **Platform:**` NEGATIVE Regression-Guard (D-04)

```javascript
// V-54-27: zero corpus files contain bare > **Platform:** (with NO qualifier) — lexicon-family preservation
{
  id: 27, name: "V-54-27: NEGATIVE — bare '> **Platform:**' (no qualifier) does not appear anywhere in docs/ + .planning/",
  run() {
    const SCAN_ROOTS = ["docs", ".planning"];
    const failures = [];
    function walk(dir) {
      // ... walk markdown files (file-reads-only per D-18) ...
    }
    for (const root of SCAN_ROOTS) {
      for (const file of walk(root)) {
        const c = readFile(file);
        if (c && /^>\s+\*\*Platform:\*\*\s*$/m.test(c)) {
          failures.push(file + ": bare '> **Platform:**' found (forbidden lexicon-family fork)");
        }
      }
    }
    if (failures.length === 0) return { pass: true, detail: "No bare-noun token violations" };
    return { pass: false, detail: failures.join(" | ") };
  }
}
```

### Example 8: WUfB Update Ring Settings Reference (PATCH-01)

**For `01-windows-wufb-rings.md` body content (admin-facing reference):**

```markdown
## WUfB Deployment Ring Settings

In Intune admin center: **Devices > Manage devices > Windows Updates > Update rings for Windows 10 and later > Create profile**

| Setting | Description | Recommended starting value |
|---------|-------------|----------------------------|
| Quality update deferral period (days) | Delay quality updates by N days from Microsoft release | Pilot: 0; Broad: 7-14 |
| Feature update deferral period (days) | Delay feature updates by N days from Microsoft release | Pilot: 0; Broad: 30-60 |
| Deadline for quality updates (days) | Force install N days after delivery | Pilot: 2; Broad: 7 |
| Deadline for feature updates (days) | Force install N days after delivery | Pilot: 2; Broad: 7 |
| Grace period (days) | User can defer restart for N days after deadline | 2 |
| Auto restart deadline (hours) | Force restart N hours after deadline within grace | 2 |

Source: [Microsoft Learn — Manage Windows Update Ring Policies](https://learn.microsoft.com/intune/device-updates/windows/manage-update-rings) (verified 2026-04-28).
```

---

## State of the Art

| Old Approach | Current Approach (2026-04-28) | When Changed | Impact |
|--------------|-------------------------------|--------------|--------|
| macOS legacy MDM update commands (`forceDelayedSoftwareUpdates` restriction, `com.apple.SoftwareUpdate` payload, `ScheduleOSUpdate` MDM command) | macOS DDM "Software Update Enforce Latest" in Intune Settings Catalog | DDM GA Service Release 2503 (early 2025); legacy commands deprecated WWDC June 2025; **REMOVED with Apple OS 26 release ~Fall 2026** | Mandatory migration before Apple OS 26 release; no forward-compatible alternative |
| iOS supervised-only DDM update enforcement | iOS DDM update enforcement on UNSUPERVISED iOS 17+ devices | August 2025 retraction | Removes ADE/supervised-mode prerequisite for update enforcement; expands DDM eligibility to all iOS 17+ enrolled devices |
| Windows reboot-required cumulative quality updates (LCU) | Windows Hotpatch (8 of 12 monthly LCUs reboot-free; remaining 4 = standard reboot baseline) | Hotpatch GA 2024; **default-on May 11 2026** | Reboot-driven downtime reduced; admin opt-out toggle available April 1 2026 |
| Windows custom WUfB ring management at admin discretion | Windows Autopatch managed rings (Test/First/Fast/Broad) for hands-off cadence | Autopatch GA 2022; matured 2024-2026 | Mutual-exclusive with custom WUfB rings; Autopatch trades configurability for reduced burden |
| Android Play Integrity basic verdict (`MEETS_DEVICE_INTEGRITY`) | Android Play Integrity strong verdict (`MEETS_STRONG_INTEGRITY`) requiring Android 13+ + hardware-backed attestation + ≤12-month patch | Google enforcement May 2025; **Intune enforcement Sept 30 2025; fleet deadline Oct 31 2026** | Future-proofs compliance signal; demands Android 13+ baseline + recent patches |
| Zebra firmware via direct Zebra console only | Zebra LifeGuard OTA integrated into Intune admin center | **GA January 2026** | Unified Intune compliance/reporting for Zebra fleets; tenant connector + FOTA deployment surfaces |
| Samsung Knox firmware via E-FOTA standalone | Samsung KSP (Knox Service Plugin) OEMConfig via Managed Google Play (E-FOTA standalone OUT OF SCOPE per v1.4 exclusion preserved) | KSP mature; v1.5 documents in-Intune mechanism only | KSP is the in-Intune Samsung mechanism; E-FOTA standalone remains orthogonal |

**Deprecated/outdated:**
- macOS `forceDelayedSoftwareUpdates` MDM restriction → REMOVED with Apple OS 26 (use DDM)
- macOS `com.apple.SoftwareUpdate` configuration payload → REMOVED with Apple OS 26 (use DDM)
- macOS / iOS `ScheduleOSUpdate` MDM command → REMOVED with Apple OS 26 (use DDM)
- iOS supervised-only DDM constraint → RETRACTED August 2025 (DDM on unsupervised iOS 17+)
- ConfigMgr Resource Access workload → DEPRECATED since CB 2203, slider mandated to Intune in CB 2403 (carryover from Phase 53 context; relevant to Phase 54 dual-scan pitfall)
- Android Play Integrity `MEETS_DEVICE_INTEGRITY` as compliance baseline → SUPERSEDED by `MEETS_STRONG_INTEGRITY` for Android 13+

---

## Assumptions Log

> All major Phase 54 claims were verified via Microsoft Learn primary + community blog cross-reference. The remaining `[ASSUMED]` claims below are operational projections that the planner / discuss-phase may wish to confirm with the user.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Apple OS 26 release date is "Fall 2026" (typically September-November based on historical Apple release cadence) | Pitfall D + State of the Art | LOW — actual release date doesn't change Phase 54 deliverables; only affects how plan-time framing reads. Worst case: doc says "before Apple OS 26 release ~Fall 2026" and Apple ships earlier/later — content is still valid. |
| A2 | Plan author for 54-01 will write 00-overview LAST (after 01-04 are drafted) to surface duplicate content | Pitfall F | LOW-MEDIUM — if 00-overview is written first, V-54-29 NEGATIVE regression-guard catches in pre-commit. Iteration cost only. |
| A3 | Pre-commit hook enforces atomic-commit discipline (D-21 single commit) | Pattern 3 + Pitfall G | LOW — even without pre-commit hook, V-54-19 NEGATIVE+POSITIVE pair forces atomicity by validator (commit-1 fails if either half missing). User's git workflow may use --no-verify; if so, V-54-19 catches at next validator run. |
| A4 | The phrase `[HARD-DEADLINE — see Deadlines H2]` is the canonical Layer 3 inline reminder pattern (extrapolated from Phase 53 D-05 EP HIGH-RISK three-layer pattern) | Pattern 2 + Example 2/3 | LOW — exact bracket-text wording is plan-author discretion within "≥2 inline reminders adjacent to deadline-bearing tokens" V-54-NN-E assertion. Validator regex flexibility accommodates variant phrasings. |
| A5 | `regenerate-supervision-pins.mjs --self-test` will continue to pass through Phase 54 (no Phase 54 file in supervision sidecar) | Validation Architecture | LOW — Phase 54 files are new content under `docs/operations/patch-management/`; supervision sidecar tracks pre-existing pinned files only. Verified by Phase 53 close (sidecar untouched). |
| A6 | Sample WUfB update ring deferral / deadline values in Example 8 are admin-facing recommendations, not authoritative defaults | Code Examples Example 8 | LOW — documented as "Recommended starting value"; exact numerical values are admin-tunable per fleet. Microsoft Learn doesn't ship "official defaults" — admin chooses. |
| A7 | The `> **Platform:**` bare-noun NEGATIVE regression-guard (V-54-27) scans entire `docs/` + `.planning/` tree for false-positives in existing files | Validator Pattern Example 7 | LOW-MEDIUM — current grep (verified 2026-04-28) returned ZERO bare-`> **Platform:**` occurrences across both trees. If a future phase legitimately introduces a bare-noun token (no current intent), V-54-27 needs allowlist seeding per CDI-Phase54-03 lazy-add. |
| A8 | "Audit Hotpatch tenant settings opt-out toggle is at `Tenant administration > Windows Autopatch > Tenant management > Tenant settings > 'Apply updates without restarting the device'"`" exact admin center path | Standard Stack Supporting + Pitfall A | LOW-MEDIUM — verified via 4sysops + bleepingcomputer March 2026 coverage. Microsoft may relabel between research date and Phase 54 ship; PATCH-02 H2 in `01-windows-wufb-rings.md` should include `last_verified` date stamp. |

**If any of A1-A8 is wrong:** Recovery is markdown-edit only; no validator schema change required.

---

## Open Questions (RESOLVED)

1. **CD-01 frontmatter `platform:` for `00-overview.md`** — `cross-platform` (single new token) vs `Windows,macOS,iOS,Android` (comma-string)?
   - What we know: V-54-07 + V-54-31 accept either; SC#5 ROADMAP:269 verbatim says "correct multi-platform frontmatter"
   - What's unclear: Whether new `cross-platform` token is forward-compatible with Phase 60 audit harness expansion
   - Recommendation: Plan author chooses `platform: cross-platform` (cleaner; Phase 60 plan author handles allowlist seeding when C-check expansion happens; CDI-Phase54-04 inheritance from CDI-Phase53-06)

2. **CD-03 cross-platform comparison table row count** — 5-row minimum vs 6-7 rows?
   - What we know: D-01 mandates "4-platform × 5+ concept rows minimum"
   - What's unclear: Whether adding "Hard deadline" row (6th) or "Validator anchor" row (7th) improves admin fleet-level decision-making vs adds noise
   - Recommendation: 6 rows (cadence + deferral + enforcement + hotpatch/EOL + hard-deadline timeline + cross-link to deep-dive). The "Validator anchor" row (Anchor IDs for Phase 58 link-not-copy consumption) is internal-tooling, not admin-facing — keep as code comment in 00-overview.md, not table row.

3. **CD-08 cross-platform pointer rows in macOS + Android Deadlines H2s** — include or omit?
   - What we know: Each platform's Deadlines H2 covers its own deadlines; cross-platform comparison lives in 00-overview
   - What's unclear: Whether duplicating "iOS unsupervised DDM retraction (Aug 2025) — see iOS guide" inside macOS Deadlines H2 helps or just duplicates
   - Recommendation: OMIT cross-platform pointer rows from per-platform Deadlines H2s. Per-platform Deadlines H2 covers its OWN deadlines only; cross-platform navigation lives in 00-overview hub + per-file `> **Platform applicability:**` blockquote (D-04). Avoids drift surface.

4. **Hotpatch H2 placement in `01-windows-wufb-rings.md`** — first H2 vs deeper?
   - What we know: PATCH-02 mandates Hotpatch H2 inside the file; D-12 says NO separate Deadlines H2 (Hotpatch H2 absorbs)
   - What's unclear: Whether Hotpatch H2 should be 2nd H2 (after PITFALL-9 ring-disambiguation H2) or later
   - Recommendation: Sequence: (1) WUfB Deployment Rings configuration H2; (2) Autopatch Rings vs WUfB H2 (PITFALL-9 mutual-exclusion); (3) Hotpatch H2; (4) Driver/firmware update policy H2 (PATCH-03). Logical admin reading order: rings first → service-managed-vs-self alternative → reboot-reduction option → adjacent driver/firmware policy.

5. **Whether to include a Mermaid diagram in `00-overview.md`** (CD-04)
   - What we know: Phase 53 author discretion CD-04 inheritance; validator does NOT assert Mermaid presence
   - What's unclear: Whether visual ring/cadence comparison helps cross-platform admin
   - Recommendation: Include a 4-platform "update enforcement primitive" Mermaid swim-lane diagram — admin can see "Windows = ring/deferral/Autopatch", "macOS = DDM Settings Catalog payload", "iOS = DDM update keys", "Android = Play Integrity verdict + LifeGuard OTA" at-a-glance. Avoids text-table-fatigue on the comparison surface.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (validator runtime) | `check-phase-54.mjs` | ✓ (verified by Phase 48 + Phase 53 close) | v18+ stdlib (`fs`, `path`, `process`) | None needed |
| `node scripts/validation/v1.5-milestone-audit.mjs --verbose` | Pre-commit gate | ✓ (Phase 48 ships harness; Phase 49-53 verified working) | v1.5 harness | None needed |
| `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | Pre-commit gate (regression prevention) | ✓ (refreshed in Phase 48 BASELINE_9) | Phase 48 baseline | None needed |
| `markdown-link-check` CLI + `.mlc-config.json` | Informational broken-link sweep against new patch-management cross-links | ✓ (Phase 48 D-08 + .mlc-config.json shipped Phase 48-07-PLAN) | npm package | Skip — informational at Phase 54 ship; blocking after Phase 60 second-pass triage |
| `git` with pre-commit hook | Atomic-commit enforcement (D-21) | ✓ (verified by Phase 53 close 2026-04-28) | Standard | Pre-commit hook bypass via --no-verify is non-blocking; V-54-19 catches at next validator run |
| Microsoft Learn URLs (external) | Source-of-truth validation for content claims | ✓ (verified 2026-04-28) | Current | Multiple cross-source community blog references provide redundancy |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — Phase 54 requires no new tooling beyond what Phase 48-53 shipped.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Per-phase static validation harness — Node.js stdlib only (no Mocha/Jest/etc.) per Phase 48 D-25 file-reads-only contract |
| Config file | None (validator is self-contained) |
| Quick run command | `node scripts/validation/check-phase-54.mjs` |
| Full suite command | `node scripts/validation/check-phase-54.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PATCH-01 | WUfB ring topology + Autopatch disambiguation + PITFALL-9 mutual-exclusion | unit | `node scripts/validation/check-phase-54.mjs` (V-54-09 PITFALL-9 H2 + V-54-11 strict ring qualifier) | ❌ Wave 0 — `01-windows-wufb-rings.md` does not exist; created in 54-02 sub-plan |
| PATCH-02 | Hotpatch H2 with default May 2026 + VBS + opt-out toggle + reboot-reduction impact | unit | `node scripts/validation/check-phase-54.mjs` (V-54-12 Hotpatch H2 + 4 sub-topic tokens) | ❌ Wave 0 — content not yet authored |
| PATCH-03 | Driver/firmware update policy H2 + dual-scan source conflict pitfall | unit | `node scripts/validation/check-phase-54.mjs` (V-54-13 driver/firmware H2 + dual-scan token) | ❌ Wave 0 — content not yet authored |
| PATCH-04 | macOS DDM "Software Update Enforce Latest" Settings Catalog + legacy MDM removed Apple OS 26 | unit | `node scripts/validation/check-phase-54.mjs` (V-54-14/15/16/17) | ❌ Wave 0 — `02-macos-update-enforcement.md` does not exist |
| PATCH-05 | iOS DDM update keys (4 keys) on unsupervised iOS 17+ effective Aug 2025 | unit | `node scripts/validation/check-phase-54.mjs` (V-54-18 literal coverage) | ❌ Wave 0 — `03-ios-update-lifecycle.md` does not exist |
| PATCH-06 | v1.3 iOS retrofit cell at `07-device-enrollment.md:35` same-commit-atomic | unit | `node scripts/validation/check-phase-54.mjs` (V-54-19 NEGATIVE+POSITIVE pair) | ⚠️ Cell exists at line 35 with old literal verbatim (verified 2026-04-28); edit lands in 54-06 |
| PATCH-07 | MEETS_STRONG_INTEGRITY cascade timeline (May 2025 / Sept 30 2025 / Oct 31 2026) + Android 13+ + ≤12-month patch | unit | `node scripts/validation/check-phase-54.mjs` (V-54-22/23/24 three-layer + cascade dates) | ❌ Wave 0 — `04-android-patch-delivery.md` does not exist |
| PATCH-08 | Zebra LifeGuard OTA via Intune (GA Jan 2026) + Samsung KSP analog | unit | `node scripts/validation/check-phase-54.mjs` (V-54-25 LifeGuard literal + KSP literal + analog framing) | ❌ Wave 0 — content not yet authored |

### Sampling Rate

- **Per task commit:** `node scripts/validation/check-phase-54.mjs` (28-32 V-54-NN; ~2-5 seconds)
- **Per wave merge:** `node scripts/validation/check-phase-54.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose` (full suite green required)
- **Phase gate:** Full suite green + `regenerate-supervision-pins.mjs --self-test` exits 0 + markdown-link-check informational pass before atomic commit

### Wave 0 Gaps

- [ ] `docs/operations/patch-management/00-overview.md` — covers PATCH-01..08 cross-platform comparison routing surface (does not exist; created in 54-01)
- [ ] `docs/operations/patch-management/01-windows-wufb-rings.md` — covers PATCH-01/02/03 (does not exist; created in 54-02)
- [ ] `docs/operations/patch-management/02-macos-update-enforcement.md` — covers PATCH-04 (does not exist; created in 54-03)
- [ ] `docs/operations/patch-management/03-ios-update-lifecycle.md` — covers PATCH-05 (does not exist; created in 54-04)
- [ ] `docs/operations/patch-management/04-android-patch-delivery.md` — covers PATCH-07/08 (does not exist; created in 54-05)
- [ ] `docs/admin-setup-ios/07-device-enrollment.md:35` retrofit — cell exists; edit lands in 54-06
- [ ] `docs/admin-setup-ios/04-configuration-profiles.md:128` forward-link addition — line exists; sentence appended in 54-07
- [ ] `.planning/REQUIREMENTS.md:55 + :166` errata — purge `05-compliance-policy.md` literal in 54-08
- [ ] `.planning/ROADMAP.md:267` errata — purge `05-compliance-policy.md` literal in 54-08
- [ ] `scripts/validation/check-phase-54.mjs` — does not exist; created in 54-09 with 28-32 V-54-NN per CONTEXT D-17 enumeration

**No framework install required:** Validator is Node.js-stdlib-only; harness is the existing `v1.5-milestone-audit.mjs` from Phase 48; markdown-link-check is the existing tool from Phase 48-07-PLAN .mlc-config.json shipping.

---

## Sources

### Primary (HIGH confidence)

**Phase 54 technical content (VERIFIED 2026-04-28 via Microsoft Learn + Apple Support + Google Play Integrity primary docs):**

- [Microsoft Learn — Use Microsoft Intune to manage software updates for supervised iOS/iPadOS devices (deprecated-mdm-policies-ios)](https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios) — iOS DDM unsupervised retraction Aug 2025
- [Microsoft Learn — Admin checklist for iOS/iPadOS software updates (software-updates-guide-ios-ipados)](https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-guide-ios-ipados) — iOS DDM update keys reference
- [Microsoft Learn — Configure Update Policies for Apple Devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/) — DDM Apple framework root
- [Microsoft Learn — Use the settings catalog to configure DDM software updates (managed-software-updates-ios-macos)](https://learn.microsoft.com/en-us/intune/intune-service/protect/managed-software-updates-ios-macos) — Settings Catalog DDM path
- [Microsoft Learn — Use Microsoft Intune policies to manage macOS software updates (software-updates-macos)](https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-macos) — macOS DDM enforcement
- [Microsoft Learn — Admin guide and checklist for macOS software updates (software-updates-guide-macos)](https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-guide-macos) — macOS Settings Catalog
- [Microsoft Learn — Use Hotpatch With Windows Quality Updates (intune)](https://learn.microsoft.com/en-us/intune/device-updates/windows/hotpatch) — Hotpatch Intune path
- [Microsoft Learn — Hotpatch updates (Windows Autopatch)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) — Hotpatch via Autopatch
- [Microsoft Learn — Manage Windows Update Ring Policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings) — WUfB ring config
- [Microsoft Learn — Android Enterprise compliance settings (ref-android-enterprise-settings)](https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-android-enterprise-settings) — `Check strong integrity` setting
- [Microsoft Learn — Zebra LifeGuard Over-the-Air Integration (zebra-lifeguard-ota-integration)](https://learn.microsoft.com/en-us/intune/device-updates/android/zebra-lifeguard-ota-integration) — Zebra connector + deployment path
- [Microsoft Learn — Android FOTA Updates (fota-updates)](https://learn.microsoft.com/en-us/intune/device-updates/android/fota-updates) — FOTA management path
- [Microsoft Learn — Software update management client fix for Microsoft Configuration Manager (Hotfix 2509/36495448)](https://learn.microsoft.com/en-us/intune/configmgr/hotfix/2509/36495448) — Dual-scan source conflict fix
- [Microsoft Tech Community — Support tip: Changes to Google Play strong integrity for Android 13 or above](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130) — May 2025 / Sept 30 2025 / Oct 31 2026 cascade
- [Microsoft Tech Community — Support tip: Move to declarative device management for Apple software updates](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-move-to-declarative-device-management-for-apple-software-updates/4432177) — Apple OS 26 deprecation timeline
- [Microsoft Tech Community — Manage Windows driver and firmware updates with Microsoft Intune](https://techcommunity.microsoft.com/blog/windows-itpro-blog/manage-windows-driver-and-firmware-updates-with-microsoft-intune/3851402) — PATCH-03 driver/firmware separate policy
- [Microsoft Tech Community — Introducing Microsoft Intune integration with Zebra's Lifeguard Over-the-Air service](https://techcommunity.microsoft.com/blog/intunecustomersuccess/introducing-microsoft-intune-integration-with-zebra%E2%80%99s-lifeguard-over-the-air-ser/3830516) — LifeGuard integration announcement
- [Apple Support — Install and enforce software updates for Apple devices](https://support.apple.com/guide/deployment/install-and-enforce-software-updates-depd30715cbb/web) — Apple-side DDM/MDM lifecycle
- [Samsung Knox Documentation — Microsoft Intune: Create OEMConfig profile (KSP)](https://docs.samsungknox.com/admin/uem/intune-configure-ksp-oemconfig-1.htm/) — KSP via OEMConfig
- [Samsung Knox Documentation — Knox Service Plugin (managed configurations)](https://docs.samsungknox.com/dev/managed-configurations/knox-service-plugin/) — KSP technical reference
- [Zebra TechDocs — Device Update](https://techdocs.zebra.com/lifeguard/update/) — LifeGuard standalone reference

**Phase 54 methodology / corpus:**

- `.planning/phases/54-patch-update-management/54-CONTEXT.md` (USER DECISIONS via /gsd-discuss-phase adversarial review; D-01 through D-22 + CD-01 through CD-11 + CDI-Phase54-01..08 + DPO-Phase54-01..06)
- `.planning/phases/53-co-management-operational-docs/53-CONTEXT.md` (Phase 53 inheritance — D-05 three-layer EP HIGH-RISK + D-08 cross-platform inline blockquote + D-14 single atomic commit + DPO-Phase53-01 ops/00-index.md cross-reference contract)
- `.planning/REQUIREMENTS.md` (PATCH-01..08 lines 50-57; traceability lines 161-168)
- `.planning/ROADMAP.md` (Phase 54 lines 260-272; Hotspot Ownership lines 441-462)
- `.planning/research/SUMMARY.md` (Phase 54 research summary lines 187-193; research flags 248-249)
- `.planning/research/PITFALLS.md` (Pitfall 9 ring-naming, Pitfall 13 ops-domain false-positives)
- `docs/admin-setup-ios/07-device-enrollment.md:35` (verified retrofit target via Read tool 2026-04-28)
- `docs/admin-setup-ios/06-compliance-policy.md` (verified ZERO supervised-only-DDM claim via Read tool 2026-04-28; D-06 file-system override anchor)
- `docs/admin-setup-ios/04-configuration-profiles.md:128` (verified line 128 already substantively correct: "works on both supervised and unsupervised devices (iOS 17.0+)" via Read tool 2026-04-28)
- `docs/operations/co-management/00-overview.md:9-20` (Phase 53 D-08 verified `> **Platform applicability:**` token shape via Read tool 2026-04-28)
- `docs/operations/00-index.md` (Phase 53 hotspot-owned; Phase 54 cross-references only via Read tool 2026-04-28)
- `scripts/validation/check-phase-53.mjs` (V-53-NN regex pattern reference for V-54-NN authoring via Read tool 2026-04-28)
- `scripts/validation/v1.5-milestone-audit.mjs:130-178` (C10 hardcoded `linuxDocPaths()` scope verified does NOT include `docs/operations/patch-management/` — CDI-Phase54-04 inheritance anchor)

### Secondary (MEDIUM confidence — community blogs cross-referenced with Microsoft Learn)

- [4sysops — Windows Autopatch enables hotpatch updates by default in May 2026](https://4sysops.com/archives/windows-autopatch-enables-hotpatch-updates-by-default-in-may-2026/) — Hotpatch May 2026 + VBS prereq + April 1 2026 toggle availability
- [4sysops — Microsoft Intune March 2026: Hotpatch by default, macOS Recovery Lock, Apple DDM](https://4sysops.com/archives/microsoft-intune-march-2026-hotpatch-by-default-macos-recovery-lock-apple-ddm/) — March 2026 release-note coverage
- [BleepingComputer — Microsoft to enable Windows hotpatch security updates by default](https://www.bleepingcomputer.com/news/microsoft/microsoft-to-enable-hotpatch-security-updates-by-default-in-may/) — Hotpatch default May 2026 confirmation
- [SS Mac Admin — DDM, Intune and You (March 2026)](https://www.ssmacadmin.com/posts/2026-03-31-ddm-intune-and-you/) — DDM Settings Catalog admin center path
- [Intune in Real Life — macOS & iOS 26 for Enterprise: DDM, Deployment, and the Intel Mac Sunset](https://intuneirl.com/macos-ios-26-for-enterprise-ddm-deployment-and-the-intel-mac-sunset/) — Apple OS 26 enterprise impact
- [Recast Software — How to Deploy Software Updates to macOS Devices with DDM using Microsoft Intune](https://www.recastsoftware.com/resources/declarative-device-management-with-intune/) — DDM macOS deployment walkthrough
- [Mobile Jon — Windows Autopatch Revisited Part 2 (Jan 2026)](https://mobile-jon.com/2026/01/25/windows-autopatch-revisited-part-2/) — Autopatch ring topology + WUfB mutual-exclusion
- [Patch My PC — SCCM Co-Management: Dual Scan Source Demystified](https://patchmypc.com/blog/sccm-co-management-dual-scan/) — Dual-scan source conflict mechanics
- [Manish Bangia — What is Dual Scan and impact on WUfB policies](https://www.manishbangia.com/dual-scan-impact-on-wufb-policies/) — Dual-scan deep dive
- [Anoop C Nair — Intune Driver Firmware Update Policies | Review Approve Schedule Suspend Options HTMD Blog](https://www.anoopcnair.com/intune-driver-firmware-update-policies-review-approve-schedule-suspend-options/) — Driver/firmware UI walkthrough
- [Peter Van Der Woude — Android Enterprise and Microsoft Intune: And the additional configuration layer](https://petervanderwoude.nl/post/android-enterprise-and-microsoft-intune-and-the-additional-configuration-layer/) — OEMConfig + KSP framing
- [SimpleMDM — WWDC 2025 recap: OS26, Liquid Glass, and DDM](https://simplemdm.com/blog/wwdc-2025/) — Apple WWDC 2025 confirmation of OS 26 unified versioning + DDM mandate
- [42Gears — WWDC 2025 Recap: Apple Device Management and Apple OS Highlights](https://www.42gears.com/blog/wwdc-2025-recap-apple-mdm-and-os-updates/) — Cross-vendor WWDC 2025 confirmation
- [CIAOPS — Analysis of Intune Android Compliance Policy Settings for Strong Security (Aug 2025)](https://blog.ciaops.com/2025/08/01/analysis-of-intune-android-compliance-policy-settings-for-strong-security/) — Strong-integrity admin walkthrough

### Tertiary (LOW confidence — single source; flagged for plan-time validation if used)

- [Wintips.org — How to Create a DDM Update Policy for iOS Devices in Intune](https://www.wintips.org/how-to-create-a-ddm-update-policy-for-ios-devices-in-intune/) — iOS DDM admin walkthrough (single source; cross-validate against Microsoft Learn before quoting in plan)
- [Wolkenman.nl — Apple update policy with Declarative Device Management (July 2025)](https://wolkenman.wordpress.com/2025/07/14/apple-update-policy-with-declarative-device-management/) — Pre-Aug-2025 community coverage of unsupervised retraction (date-sensitive — verify against current Microsoft Learn)
- [XploreTheCloud.nl — Force macOS latest updates with DDM & Intune](https://www.xplorethecloud.nl/l/force-macos-build-updates-with-ddm-intune/) — macOS DDM walkthrough (single source)
- [TimmyIT.com — Intune and Knox E-fota — Automatic E-fota app installation and enrollment (2022)](https://timmyit.com/2022/01/31/intune-and-knox-e-fota-automatic-e-fota-app-installation-and-enrollment/) — Samsung Knox E-FOTA reference (NOTE: E-FOTA is OUT OF SCOPE per REQUIREMENTS:113 — used here only to confirm KSP vs E-FOTA mechanism difference)

### Off-ballot anchors (referenced in CONTEXT but not as content sources)

- `.planning/phases/52-linux-l2-investigation-runbooks-24-25/52-CONTEXT.md` (Phase 52 D-01 three-layer freshness-caveat methodology family ancestor)
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep/48-CONTEXT.md` (Phase 48 D-08 informational-first sweep + D-15 YAGNI lazy-add + D-25 file-reads-only validator pattern)
- `.planning/RETROSPECTIVE.md:166` (v1.4.1 atomic same-commit forward-promise closure lesson; ROADMAP:271 anchor)

---

## Metadata

**Confidence breakdown:**

- **Standard stack (per-platform update mechanisms):** HIGH — every entry verified against Microsoft Learn primary 2026-04-28 with community blog cross-reference; dates and version numbers (Service Release 2503, May 11 2026, April 1 2026, August 2025, May 2025, Sept 30 2025, Oct 31 2026, January 2026) confirmed in multiple independent sources
- **Architecture patterns (Phase 53 inheritance):** HIGH — `> **Platform applicability:**` token verified verbatim against `docs/operations/co-management/00-overview.md:9-20`; three-layer pattern verified against Phase 53 D-05 EP HIGH-RISK precedent; same-commit-atomic pattern verified against ROADMAP:271 + RETROSPECTIVE:166
- **Pitfalls:** HIGH for A (Hotpatch eligibility) + B (dual-scan) + C (strong-integrity decomposition) + D (Apple OS 26 release timing) + E (Zebra LifeGuard vs Samsung KSP mechanism difference) + F (00-overview scope creep) + G (atomicity split). Each pitfall cross-referenced with at least one Microsoft Learn primary or Microsoft Tech Community source.
- **Validation architecture:** HIGH — V-54-NN enumeration mirrors Phase 53 V-53-NN floor (26 checks) + adds Phase-54-specific NEGATIVE+POSITIVE pair for retrofit atomicity (V-54-19) + literal-purge regression-guards for errata (V-54-21) + lexicon-family preservation (V-54-27) + REQ-traceability firewall (V-54-29). Implementation pattern (file-reads-only, regex-based) verified verbatim against `check-phase-53.mjs:1-100`.
- **Runtime State Inventory:** HIGH — file-system grep + Read tool verification of every claim (07-device-enrollment.md:35 verbatim cell, 04-configuration-profiles.md:128 verbatim line, REQ:55 + REQ:166 + ROADMAP:267 literal off-by-one, operations/00-index.md absence of Patch Management H2). All "None — verified by X" rows verified explicitly per research-prompt rubric.

**Research date:** 2026-04-28

**Valid until:** 2026-05-28 (30 days for stable Microsoft Learn primary content; community blog dates checked for currency). Apple OS 26 release date may shift; Hotpatch May 2026 default may receive late-stage Microsoft policy adjustments. Plan author should re-verify Standard Stack version dates if more than 30 days have elapsed before commit.
