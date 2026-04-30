# Phase 57: DEFER-07 Android Nav Unification - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning
**Methodology:** Adversarial review (Finder / Adversary / Referee scored pattern, parallel-4-agent mode) on 4 gray areas covering 16 candidate sub-options across 113 enumerated defects (Σ 154 raw points: GA-1=127, GA-2=105, GA-3=69, GA-4=81). Adversary attempted 41 disproofs across all 4 gray areas; Referee upheld 12 full disproofs, 21 partial (severity downgrades), rejected 8. **Three 2x penalties triggered**: two in GA-1 against Option 1C (fabricated "iOS-mode-symmetry" defense for admin-setup-android per-mode enumeration; fabricated "Phase 57 scope already includes admin-setup content" claim), one in GA-4 against Options 4B/4D (fabricated 4th `MEETS_VIRTUAL_INTEGRITY` verdict not present in Phase 54 SSoT at `04-android-patch-delivery.md:55-59`). Net surviving defect score after rulings: **GA-1: 1A=9, 1B=17, 1C=51, 1D=28 → winner 1A (STRONG)**; **GA-2: 2A=5, 2B=27, 2C=5 (tiebreaker WIN), 2D=39 → winner 2C (STRONG; tiebreaker = iOS Phase 32 precedent + author-acknowledged Android symptom overlap in runbooks 24/27/28/29)**; **GA-3: 3A=9, 3B=29, 3C=5, 3D=12 → winner 3C (STRONG)**; **GA-4: 4A=5, 4B=31, 4C=1, 4D=24 → winner 4C (STRONG)**.

<domain>
## Phase Boundary

Phase 57 delivers the **DEFER-07 Android Nav Unification surgical hub retrofit** — a 4-file documentation patch that closes the v1.4 hub-index gap (AENAVUNIFY-04 / DEFER-07) so that Android L1, L2, and Admin resources are navigable from `docs/index.md` at the same structural depth as Windows, macOS, and iOS. **Phase 57 is the v1.5 navigation cleanup phase serialized after Phase 48 (anchor inventory) and Phase 56 (Wave B ops content), and BEFORE Phase 59 (Linux + Operations hub integration)**; both phases touch `docs/index.md`, so serialization is methodology-mandatory per ROADMAP line 333-334 shared-write hotspot ownership rule.

**Phase 57 is HUB-NAV ONLY.** No new runbook content, no new admin-setup content, no new operations content. Existing Android infrastructure (8 L1 runbooks at `docs/l1-runbooks/22-29`, 6 L2 runbooks at `docs/l2-runbooks/18-23`, 14 admin-setup files at `docs/admin-setup-android/00-13`, decision tree `decision-trees/08-android-triage.md`, 4-file lifecycle set at `docs/android-lifecycle/00-03`, glossary `_glossary-android.md`, capability matrix `reference/android-capability-matrix.md`) is **consumed by reference only**. Phase 57 ships hub navigation pointers TO this existing surface — never duplicates content from it.

**Five deliverables (4 active requirements: CLEAN-01..04, plus 1 orthogonal patch + validator):**

1. `docs/index.md` (CLEAN-01 PRIMARY) — Android Enterprise H2 expansion from current line-167-170 stub to three sub-tables (Service Desk L1 / Desktop Engineering L2 / Admin Setup) matching iOS Phase 32 structural depth (lines 131-164 precedent). **Append-only H2 contract**: Android H2 stays in current ordering position (after iOS, before Cross-Platform References); only the body content under the existing `## Android Enterprise Provisioning` H2 (line 167) expands. Existing iOS/macOS/Windows H2s, sub-H3s, and anchors UNCHANGED. Pure iOS mirror per GA-1 winner 1A — no operations cross-references (Phase 59 owns operations-hub-nav per ROADMAP:354), no admin-setup-android per-mode enumeration (out-of-scope per hub-nav-only guardrail), no novel "Operations" fourth sub-section (zero-precedent in Windows/macOS/iOS H2s).

2. `docs/common-issues.md` (CLEAN-02 PRIMARY) — Android Enterprise Failure Scenarios H2 with 8 H3 sub-sections matching CLEAN-02 verbatim 8 categories (1:1 anchor traceability), section-top decision-tree banner, 2 reciprocal-disambiguation callouts, 1 cross-platform iOS banner. Per GA-2 winner 2C. **Append-only H2 contract**: new `## Android Enterprise Failure Scenarios` H2 appended after iOS Failure Scenarios H2 (after line 265 MAM-WE advisory, before `## Version History`). The `## Choose Your Platform` quick-link list at lines 14-18 receives one in-place edit (additive: Android entry appended to existing TOC list).

3. `docs/quick-ref-l1.md` (CLEAN-03 PRIMARY) — Android L1 Quick Reference H2 with the locked four-part substructure (Top Checks / Android Escalation Triggers / Android Decision Tree / Android Runbooks) and inline `[Mode]` prefix tags on every Top Check / Escalation Trigger / Runbook row. Per GA-3 winner 3C. **Mode-tag vocabulary** locked verbatim from `docs/l1-runbooks/00-index.md:70-76` Mode column: `[BYOD]`, `[ZTE]`, `[AOSP]`, `[Knox]`, `[All GMS]`. **Append-only H2 contract**: new `## Android Enterprise Quick Reference` H2 appended after iOS Quick Reference H2 (after line 148, before `## Version History`).

4. `docs/quick-ref-l2.md` (CLEAN-04 PRIMARY) — Android L2 Quick Reference H2 with four-part substructure (Android Diagnostic Data Collection 3-method table / Key Intune Portal Paths Android L2 table / Play Integrity Verdict Reference compact 3-row pointer table cross-linking Phase 54 SSoT / Android Investigation Runbooks 6-link list with iOS-style `--` disambiguation per row). Per GA-4 winner 4C. **PITFALL-7 firewall**: NO Play Integrity verdict-meaning content duplicated from Phase 54 `04-android-patch-delivery.md:50-74` SSoT; NO HARD-DEADLINE three-layer transplant from Phase 54 D-13 (single inline `> ⚠️` pointer to SSoT deadline H2 is sufficient). **Append-only H2 contract**: new `## Android Enterprise Quick Reference` H2 appended after iOS Quick Reference H2 (after line 232, before `## Version History`).

5. **Knox L1 index orthogonal patch** (CLEAN-02-supportive): `docs/l1-runbooks/00-index.md:70-76` Android L1 Runbooks table currently lists only runbooks 22-27 + 29 — runbook 28 (`28-android-knox-enrollment-failed.md`) exists on disk but is MISSING from the index table. CLEAN-02 enumerates "Knox enrollment failed" as one of the 8 v1.4.1 scenario categories Phase 57 must surface in `common-issues.md`; for cross-doc consistency, Phase 57 also patches the L1 index table to add the Knox row (Mode column = `Knox only` or `Knox / Samsung COBO+ZTE` — verify mode-tag at plan-time vs runbook 28 frontmatter). Same atomic commit per D-22 inheritance.

6. `scripts/validation/check-phase-57.mjs` (AUDIT-06 validator-as-deliverable) — file-reads-only / regex-based / no-shared-module per Phase 48 D-25 + Phase 49-56 D-NN lineage. Estimated **20-26 V-57-NN structural assertions** (smaller scope than Phase 56's 32 because Phase 57 is hub-nav retrofit, not content authoring): file-existence × 4 hub files + Android H2 anchor pin × 4 + 8 H3 anchor pins in common-issues.md + 4 sub-H3 anchor pins in quick-ref-l1 + 4 sub-H3 anchor pins in quick-ref-l2 + Mode-tag literal coverage in quick-ref-l1 + 3 Play Integrity verdict tokens in quick-ref-l2 + Phase 54 SSoT cross-link literal in quick-ref-l2 + iOS Phase 32 H2 anchor preservation NEGATIVE assertion (anchor stability) + Knox L1 index row presence + TBD/TODO scan + cross-platform iOS reciprocal banner literal in common-issues.md.

Phase 58 (DEFER-08 4-Platform Capability Comparison) consumes the L1/L2 quick-ref Android H2 anchors per Phase 56 D-NN inheritance for cross-platform Compliance/Configuration domain rows; Phase 59 (Hub Navigation Integration) consumes Phase 57 docs/index.md Android sub-table shape as the structural template for Linux H2 + Operations H2 expansion — Phase 59's Linux H2 sub-table structure must mirror Phase 57's Android H2 per ROADMAP line 364 verbatim ("Linux H2 section must have same sub-table structure as Android H2 from Phase 57"). Phase 60 (Audit Harness v1.5 Finalization) registers `check-phase-57.mjs` in CI workflow + runs C13 broken-link automation against Phase 57's hub-nav cross-link surface.

</domain>

<spec_lock>
## SPEC.md Lock

No SPEC.md exists for Phase 57 (no `/gsd-spec-phase` invoked). Requirements are locked by REQUIREMENTS.md CLEAN-01..04 (lines 13-16) + ROADMAP.md Phase 57 4 SCs (lines 320-335). Implementation decisions below.

</spec_lock>

<decisions>
## Implementation Decisions

### docs/index.md Android H2 — pure iOS mirror, no operations or per-mode admin enumeration (Gray Area 1 — winner: 1A STRONG)

- **D-01:** **`docs/index.md` Android Enterprise H2 expands to three sub-tables matching iOS Phase 32 structural depth verbatim.** Per Adversary-Referee adjudication (**1A=9pts**, 1B=17pts, 1C=51pts (incl. 2× 2x-penalty triggers), 1D=28pts; tiebreaker not invoked — clear lead). Reject 1B: F-1B-01 HIGH (precedent-zero "Start with Triage Tree" call-out paragraph above L1 sub-table; iOS/macOS/Windows triage trees appear as sub-table rows, not pre-table prose); F-1B-02 MED ("add lifecycle link to H2 intro" is no-op — already present at current stub line 169). Reject 1C: F-1C-01 CRIT (15pts; hub-nav-only scope guardrail violation — enumerating 7-9 admin-setup-android per-mode files at hub level breaks symmetry with all 3 reference platform sections); F-1C-02 CRIT (15pts; "matching structural depth" SC#1 phrasing — Android mode-mode-mode enumeration is structurally DEEPER than iOS path enumeration). Reject 1D: F-1D-01 CRIT (15pts; **Phase 59 ownership violation** per ROADMAP:354 + 333-334 — operations/ hub navigation explicitly assigned to Phase 59); F-1D-02 HIGH (8pts; co-management has zero Android files — verified: only 01-windows-tenant-attach.md, 02-windows-workload-sliders.md, 03-cocmgmt-migration-paths.md exist in `operations/co-management/`).

- **D-02:** **L1 sub-table: 4 rows** matching iOS row count exactly:
  1. `[Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md)` — Start here · understand the Android enrollment paths (BYOD / COBO / Dedicated / ZTE / AOSP) and DPC modes
  2. `[Android Triage Decision Tree](decision-trees/08-android-triage.md)` — Identifies the Android failure scenario from symptoms and routes to the correct runbook (mode-first per Phase 40 D-01)
  3. `[Android L1 Runbooks](l1-runbooks/00-index.md#android-l1-runbooks)` — Scripted procedures for the 8 Android Enterprise enrollment + compliance failure scenarios (runbooks 22-29)
  4. `[L1 Quick-Reference Card](quick-ref-l1.md#android-enterprise-quick-reference)` — One-page cheat sheet: top checks with mode tags, escalation triggers, decision tree, and runbook list

- **D-03:** **L2 sub-table: 4 rows** (NOTE: deviates from iOS-5-rows because Android has only one lifecycle file `00-enrollment-overview.md`; iOS has both Enrollment Path Overview AND ADE Lifecycle as separate rows). Recommend 4 rows over 5; do NOT pad with redundant lifecycle entries.
  1. `[Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md)` — Review the Android enrollment paths before diagnosing
  2. `[Android Log Collection Guide](l2-runbooks/18-android-log-collection.md)` — Prerequisite for all Android L2 investigations (3-method: Company Portal / Microsoft Intune App / adb logcat)
  3. `[Android L2 Runbooks](l2-runbooks/00-index.md#android-l2-runbooks)` — Investigation guides for enrollment, app install, compliance, Knox, and AOSP failures (runbooks 18-23)
  4. `[L2 Quick-Reference Card](quick-ref-l2.md#android-enterprise-quick-reference)` — One-page cheat sheet: 3-method log collection, Intune portal paths, Play Integrity verdict reference, investigation runbook list

- **D-04:** **Admin Setup sub-table: 3 rows** matching macOS line 121-127 single-overview-link discipline + iOS line 156-163 pattern hybrid:
  1. `[Android Admin Setup Overview](admin-setup-android/00-overview.md)` — Entry point for all Android admin setup guides; tri-portal Mermaid diagram + per-mode setup-sequence enumeration lives at this overview, not at hub level
  2. `[Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md)` — Review the enrollment pipeline before configuring Intune + MGP (admin-context entry)
  3. `[Android Capability Matrix](reference/android-capability-matrix.md)` — Compare Android feature parity vs Windows, macOS, iOS — scannable 5-domain table (note: Phase 58 will retire the deferred-4-platform footer stub in this file; Phase 57 only links, does NOT modify android-capability-matrix.md)

- **D-05:** **Cross-Platform References update at lines 173-191:** add `[Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md)` and `[Android Capability Matrix](reference/android-capability-matrix.md)` entries paralleling the iOS lines 190-191 pattern. Mirror the iOS discipline of including the lifecycle overview as a Cross-Platform References entry alongside the platform-section L1/L2/Admin entries — preserves cross-section navigation symmetry. Existing `_glossary-android.md` entry at line 179 remains; not modified.

### docs/common-issues.md — 8 H3s + section-top decision-tree banner + 2 reciprocal callouts (Gray Area 2 — winner: 2C STRONG)

- **D-06:** **`docs/common-issues.md` Android Enterprise Failure Scenarios H2 ships with 8 H3 sub-sections (1:1 mapping to L1 runbooks 22-29) + section-top decision-tree banner + 2 reciprocal-disambiguation callouts + 1 cross-platform iOS reciprocal banner.** Per Adversary-Referee adjudication (**2A=5pts, 2C=5pts** tied on raw score; **2C wins on tiebreaker** = iOS Phase 32 precedent operative + author-acknowledged Android symptom overlap in runbooks 24/27/28/29; 2B=27pts, 2D=39pts). Reject 2B: F-2B-01 CRIT (15pts; drops 1:1 H3-anchor traceability to CLEAN-02's 8 LOCKED categories — Phase 56 methodology validator pins hardcoded anchors, cannot pin 8 anchors to 5-6 H3s); F-2B-02 HIGH (8pts; SC#2 "same format as Windows/macOS routing blocks" — Windows + macOS use 1:1 H3, clustering breaks literal precedent). Reject 2D: F-2D-01 CRIT (15pts; pivots document axis from symptom→mode, contradicting "symptom-based index routing" framing literally stated at lines 28, 162, 219 across all three precedent sections); F-2D-02 CRIT (15pts; destroys CLEAN-02 1:1 anchor traceability); F-2D-03 HIGH (8pts; forces double-listing of cross-mode scenarios — runbook 25 compliance-blocked appears in BYOD + COBO + COSU + ZTE H3s; content duplication anti-pattern).

- **D-07:** **8 H3 anchor literals (LOCKED — pinned in validator V-57-NN regex):** `### Android: Enrollment Blocked` → 22; `### Android: Work Profile Not Created` → 23; `### Android: Device Not Enrolled` → 24; `### Android: Compliance Blocked` → 25; `### Android: MGP App Not Installed` → 26; `### Android: ZTE Enrollment Failed` → 27; `### Android: Knox Enrollment Failed` → 28; `### Android: AOSP Enrollment Failed` → 29. **Title-Case + `Android:` prefix** mirrors iOS section H3 naming pattern (`### iOS: Device Not Appearing in Intune` at line 221 etc.) — preserves namespacing across 4 platform sections, prevents anchor collisions, satisfies "same format as Windows/macOS routing blocks" SC#2 verbatim.

- **D-08:** **Section-top decision-tree banner** (immediately under H2 + intro paragraph, before first H3):
  ```
  > **Not sure which Android scenario?** Start with the [Android Triage Decision Tree](decision-trees/08-android-triage.md) — it disambiguates by enrollment mode (BYOD / COBO / Dedicated / ZTE / Knox / AOSP) and symptom in 2-3 steps.
  ```
  Mirrors macOS line 162 "Start with the [macOS ADE Triage Decision Tree]" and iOS line 219 "Start with the [iOS Triage Decision Tree]" — "same format" SC#2 compliance.

- **D-09:** **2 reciprocal-disambiguation callouts** (LIMITED to highest-overlap H3s; mirrors iOS line 239 syntax):
  - In `### Android: Device Not Enrolled` (runbook 24): `**L1:** [Device Not Enrolled](l1-runbooks/24-android-device-not-enrolled.md) | [Enrollment Blocked](l1-runbooks/22-android-enrollment-blocked.md) | [ZTE Enrollment Failed](l1-runbooks/27-android-zte-enrollment-failed.md) (reciprocal disambiguation — see all if no enrollment-restriction error visible)`
  - In `### Android: ZTE Enrollment Failed` (runbook 27): `**L1:** [ZTE Enrollment Failed](l1-runbooks/27-android-zte-enrollment-failed.md) | [Knox Enrollment Failed](l1-runbooks/28-android-knox-enrollment-failed.md) (reciprocal disambiguation — Samsung KME provisioning often co-exists with ZTE; check both portals)`
  Do NOT add more reciprocal callouts — runbooks 24/27/28/29 already cross-disambiguate in their own headers; over-banner is anti-pattern per Phase 56 PITFALL-10 callout adjacency discipline.

- **D-10:** **1 cross-platform iOS reciprocal banner** at top of `### Android: Compliance Blocked` only:
  ```
  > **iOS:** For iOS compliance and CA timing issues, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).
  > **macOS:** For macOS compliance issues, see [macOS: Compliance / Access Blocked](#compliance-access-blocked) (where applicable).
  ```
  Compliance Blocked has cross-platform symptom overlap (Conditional Access timing, jailbreak/Play-Integrity verdict equivalence). Do NOT add cross-platform banners on every H3 — minimal pattern mirrors Windows line 147-148 / macOS line 196 discipline; reduces noise.

- **D-11:** **`## Choose Your Platform` quick-link list at lines 14-18** receives ONE in-place edit: append `[Android Enterprise Failure Scenarios](#android-enterprise-failure-scenarios) -- Android enrollment and management failures via Intune` as fourth bullet. **In-place edit is methodology-permitted** (additive within existing TOC list, not modification of an existing item). Append-only H2-block contract scope is H2 ordering and existing-H3-anchor stability — TOC list bullet append is structurally additive.

- **D-12:** **Platform coverage blockquote at line 9** receives ONE in-place edit: replace `Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, and iOS/iPadOS provisioning issues` with `Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, and Android Enterprise provisioning issues`. Mirrors iOS Phase 32 blockquote-update precedent.

### docs/quick-ref-l1.md — inline `[Mode]` prefix tags + 4-part substructure (Gray Area 3 — winner: 3C STRONG)

- **D-13:** **`docs/quick-ref-l1.md` Android Enterprise Quick Reference H2 ships with the four-part CLEAN-03 substructure (Top Checks / Android Escalation Triggers / Android Decision Tree / Android Runbooks) and inline `[Mode]` prefix tags on EVERY Top Check, Escalation Trigger, and Runbook row.** Per Adversary-Referee adjudication (**3C=5pts**, 3A=9pts, 3B=29pts, 3D=12pts). Reject 3A: F-3A-01 HIGH (8pts→4pts after partial defense; Mode column makes mode a *qualifier* not the *primary axis* — table is read symptom-first/mode-second, inverting triage tree's mode-first discipline at `decision-trees/08-android-triage.md:15`); F-3A-02 HIGH (4pts; iOS/macOS quick-ref tables don't have Mode column — adding one creates Mode-column shape inconsistent with sibling Apple sections). Reject 3B: F-3B-01 CRIT (15pts; replaces CLEAN-03's literal four-part list with 6 mode-H3s — REQ-shape divergence; SC#3 verbatim phrasing requires four enumerated parts); F-3B-02 HIGH (8pts; triage tree at `08-android-triage.md:31-38` has 5 root mode branches, not 6 — Knox routes into Samsung-COBO/ZTE pathways and 28-android-knox*.md `applies_to: KME` is a sub-mode, not a peer mode; 3B's 6-H3 structure invents a 6th mode the triage tree explicitly does not branch on at root); F-3B-03 HIGH (8pts; maintenance burden — 6 mini-Top-Checks blocks with high duplication of cross-mode checks like "Device in Intune Devices?" applies to all 5+ modes). Reject 3D: F-3D-01 HIGH (8pts; mode-overview lead-in table is *novel artifact* with no precedent in iOS/macOS/Windows quick-ref blocks at `quick-ref-l1.md:14-148` — cross-platform structural-mirror argument cuts against it); F-3D-02 MED (4pts; double-mode-surfacing redundancy).

- **D-14:** **Mode tag vocabulary (LOCKED verbatim from `docs/l1-runbooks/00-index.md:70-76` Mode column for cross-doc consistency):** `[BYOD]`, `[ZTE]`, `[AOSP]`, `[Knox]`, `[All GMS]`. Knox is added to vocabulary because Phase 57 SC#3 references runbook 28 (CLEAN-02 names "Knox enrollment failed" as one of the 8 v1.4.1 scenarios). Vocabulary uses bracket-style single-token; do NOT use parentheses or other delimiters.

- **D-15:** **Row format: `[Mode]` prefix BEFORE symptom (mode tag is literally first token on each row).** Example Top Checks: `1. **[All GMS]** Device visible in Intune? — Intune admin center > Devices > Android — search by serial number, check enrollment state` / `2. **[BYOD]** Work profile / briefcase badge present on device? — User-side check; if briefcase missing on a BYOD-mode device, work profile creation failed (route to runbook 23)` / `3. **[ZTE/Knox]** Serial in Zero-Touch portal or Knox Mobile Enrollment portal? — Admin-only check; L1 escalates to admin if portal access required` / `4. **[All GMS]** Compliance state in Intune device blade? — Devices > [device] > Device compliance — Compliant vs Non-compliant + non-compliant settings` / `5. **[AOSP]** OEM identifier captured? — RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest — different enrollment paths per OEM (route to runbook 29)`. Prefix style is mandatory; suffix or bracket-column style is forbidden because it would not put mode "literally first" per token order — failing the triage-tree-mirror tiebreaker discipline.

- **D-16:** **4-part substructure (sub-H3s):** `### Top Checks` / `### Android Escalation Triggers` / `### Android Decision Tree` / `### Android Runbooks`. **Mirrors iOS quick-ref-l1.md:117-148 substructure exactly** — sub-H3 naming pattern (`### iOS Escalation Triggers` / `### iOS Decision Tree` / `### iOS Runbooks` becomes `### Android Escalation Triggers` / `### Android Decision Tree` / `### Android Runbooks`). The first sub-H3 is `### Top Checks` not `### Android Top Checks` because iOS Phase 32 uses `### Top Checks` not `### iOS Top Checks` (verified at line 121).

- **D-17:** **Runbooks list = 8 rows** (runbooks 22-29 inclusive — full v1.4.1 scope per CLEAN-02). Bullet list with `[Mode]` prefix matching the L1-index Mode column verbatim per row + one-line annotation suffix matching iOS precedent at quick-ref-l1.md:142-147. Runbook 28 (Knox) is included in this list — see D-21 orthogonal patch for upstream L1 index reconciliation.

- **D-18:** **Top Checks count: 4-5 entries** to match iOS Top Checks shape at quick-ref-l1.md:121-126 (4 items). Plan-author chooses 4 vs 5 based on whether AOSP OEM-identifier check is consolidated with ZTE/Knox portal check (4 items) or kept separate (5 items). Recommend 5 items because AOSP-mode L1 procedures are genuinely distinct (5 OEMs).

- **D-19:** **Android Escalation Triggers: 4-5 bullets**, each with `[Mode]` prefix. Example: `[ZTE] Device serial in Zero-Touch portal but not in Intune after 24 hours --> Escalate L2 (collect: serial, ZTE assignment screenshot, Knox-check-if-applicable)`.

- **D-20:** **Android Decision Tree: single link to `decision-trees/08-android-triage.md`**, identical shape to iOS at quick-ref-l1.md:138 — no mode subdivision (linked tree itself is the mode-axis surface).

### Knox L1 index orthogonal patch (CLEAN-02-supportive, GA-3 surfacing finding)

- **D-21:** **`docs/l1-runbooks/00-index.md:70-76` Android L1 Runbooks table receives ONE additive row** for runbook 28 (`28-android-knox-enrollment-failed.md`). The runbook file exists on disk but is missing from the index table — verified during GA-3 review (table currently lists 22-27 + 29). CLEAN-02 enumerates "Knox enrollment failed" as in-scope; for cross-doc consistency between common-issues.md (D-07 lists 8 H3s incl Knox), quick-ref-l1.md (D-17 lists 8 runbooks incl Knox), and the L1 index, the index table must include the Knox row. **Mode column literal**: verify at plan-time against runbook 28 frontmatter `applies_to:` value (likely `KME` or similar Samsung-specific literal); recommend Mode-column value `Knox only` matching D-14 tag vocabulary. Same atomic commit per D-31. Append-only contract: row added at end of existing table or in numerical-order position (28 between 27 and 29).

### docs/quick-ref-l2.md — compact verdict pointer + iOS-style 6-runbook disambiguation (Gray Area 4 — winner: 4C STRONG)

- **D-22:** **`docs/quick-ref-l2.md` Android Enterprise Quick Reference H2 ships with the four-part CLEAN-04 substructure (3-method log collection table / Key Intune Portal Paths Android L2 / Play Integrity Verdict Reference compact pointer table / Android Investigation Runbooks 6-link list with iOS-style `--` disambiguation per row).** Per Adversary-Referee adjudication (**4C=1pt**, 4A=5pts, 4B=31pts, 4D=24pts). Reject 4A: F-4A-01 MED (4pts; 6-runbook bulk-list without mode tags loses Knox-only / AOSP-only / GMS-modes routing signal); F-4A-02 MED (4pts; diverges from iOS quick-ref-l2.md:226-231 disambiguation precedent). Reject 4B: F-4B-01 CRIT (15pts; **direct PITFALL-7 violation** — Phase 54 `04-android-patch-delivery.md:50-74` owns Play Integrity verdict-meaning + Intune-mapping; duplicating with full escalation-routing column in quick-ref-l2.md fragments SSoT, breaching Phase 56 D-08 contract by inheritance); F-4B-02 CRIT (15pts; Phase 54 D-13 HARD-DEADLINE three-layer pattern is bound to `04-android-patch-delivery.md` — transplanting "escalation routing" for MEETS_STRONG_INTEGRITY without all three layers creates inconsistent-shape drift); F-4B-03 HIGH (8pts; staleness multiplexing — every Phase 54 deadline edit requires synchronized edit in quick-ref-l2.md, exactly the failure mode PITFALL-7 prevents); F-4B-04 MED (4pts; **fabricated 4th verdict `MEETS_VIRTUAL_INTEGRITY`** — verified NOT in SSoT at `04-android-patch-delivery.md:55-59`; only 3 verdicts present). Reject 4D: F-4D-01 CRIT (15pts; same PITFALL-7 violation); F-4D-02 HIGH (8pts; same staleness multiplexing); F-4D-03 MED (4pts; bulk-list compounds — full verdict surface AND no mode tags = worst-of-both).

- **D-23:** **Play Integrity Verdict Reference table content: 3 rows EXACTLY** (mirror SSoT at `04-android-patch-delivery.md:57-59`): `MEETS_BASIC_INTEGRITY` / `MEETS_DEVICE_INTEGRITY` / `MEETS_STRONG_INTEGRITY`. **Do NOT introduce `MEETS_VIRTUAL_INTEGRITY`** unless verified in SSoT at plan-time — fictional content in option spec was caught by Adversary-Referee 2x penalty. **Columns**: Verdict / One-line Meaning / Cross-link to Phase 54 SSoT. Cross-link target: `../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation` (verified anchor present at SSoT). Add a single trailing pointer line after the table: `Full cascade timeline (May 2025 / Sept 30 2025 / Oct 31 2026 fleet deadline) and remediation playbook: see [Android Patch Delivery — Deadlines](../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates).`

- **D-24:** **NO inline escalation routing in the verdict table** — escalation lives at Phase 54 SSoT `04-android-patch-delivery.md:92-132` Enforcement Cascade Migration section. Quick-ref carries verdict-name + 1-line meaning + cross-link only.

- **D-25:** **HARD-DEADLINE token discipline**: do NOT replicate Phase 54 D-13 three-layer pattern (table-cell + adjacent blockquote + per-occurrence inline reminder) in quick-ref-l2.md. **Single inline `> ⚠️` reminder** pointing to the SSoT deadline H2 is sufficient (parallels iOS quick-ref handling of supervised-device + 2025-recommendation context). Phase 54 D-13 is per-source-file discipline; quick-ref-l2.md is downstream pointer surface.

- **D-26:** **6-runbook list with iOS-style `--` disambiguation annotations per row** (mirrors quick-ref-l2.md:226-231 iOS pattern verbatim):
  - `[Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) -- prerequisite for all Android L2 investigations (3-method: Company Portal / Microsoft Intune App / adb logcat with AMAPI April 2025 mode-switching)`
  - `[Android Enrollment Investigation](l2-runbooks/19-android-enrollment-investigation.md) -- GMS modes (BYOD / COBO / Dedicated / ZTE); Pattern A-E failure analysis; AOSP excluded -- see #23`
  - `[Android App Install Investigation](l2-runbooks/20-android-app-install-investigation.md) -- MGP / LOB three-class disambiguation across all GMS modes`
  - `[Android Compliance Investigation](l2-runbooks/21-android-compliance-investigation.md) -- Cause A (Play Integrity) / B (OS version) / C (CA timing) / D (passcode / encryption); cross-link to Phase 54 Play Integrity SSoT`
  - `[Android Knox Investigation](l2-runbooks/22-android-knox-investigation.md) -- mode-specific (Samsung KME provisioning into COBO / Dedicated / WPCO via Knox portal); reciprocal with #19 when Knox-provisioned device fails GMS-side enrollment`
  - `[Android AOSP Investigation](l2-runbooks/23-android-aosp-investigation.md) -- mode-specific (5 OEMs: RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest); GMS-bearing devices route to #19 instead`

- **D-27:** **3-method log collection table content** mirrors `docs/l2-runbooks/18-android-log-collection.md` Decision Matrix (Method / Primary Tool by mode / Who Triggers / Data Scope / L2 Access Path / Confidence). Plan-author may compress columns to fit quick-ref width budget but MUST preserve the AMAPI April 2025 mode-switching nuance (BYOD pre-AMAPI = Company Portal primary; BYOD post-AMAPI + COBO/Dedicated/ZTE = Microsoft Intune App primary; adb logcat = last-resort tier). 3 verbatim method names: `Company Portal Logs`, `Microsoft Intune App Logs`, `adb logcat`. Pin in validator V-57-NN.

- **D-28:** **Key Intune Portal Paths Android L2 table (3-5 rows)** content scope: Devices > Android (all enrollment modes overview) | Devices > Device onboarding > Enrollment > Android (tabs: Personally-owned WP / Corporate-owned fully-managed / Corporate-owned dedicated / Corporate-owned WP / AOSP corporate-owned) | Apps > Android | Devices > [device] > Device compliance | Reports > Endpoint analytics (Android subset). Recommend 4-5 rows; pin H3 anchor in validator V-57-NN. **No Knox or Zero-Touch portal paths** in this table — those are external-portal admin paths, not Intune admin center paths (the L1 escalation triggers cover those).

### Validator scope + commit atomicity + frontmatter contract

- **D-29:** **`check-phase-57.mjs` validator scope = MEDIUM-FULL** per Phase 48 D-25 + Phase 49-56 D-NN file-reads-only / no-shared-module / regex-based pattern lineage. Smaller than Phase 56's 32 V-56-NN because Phase 57 is hub-nav retrofit (4 file edits, not 5 new content files). Estimated **20-26 V-57-NN structural assertions:**
  - **V-57-01..04 File existence:** 4 hub files (`docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`) + L1 index file (`docs/l1-runbooks/00-index.md`) — all exist before AND after Phase 57 (regression-prevention)
  - **V-57-05 docs/index.md Android H2 expansion:** `## Android Enterprise Provisioning` H2 contains three sub-H3 sub-tables (`### Service Desk (L1)` + `### Desktop Engineering (L2)` + `### Admin Setup`) within the H2 body scope (use H2-to-next-H2 region scan)
  - **V-57-06 docs/index.md Android sub-table row counts:** L1 sub-table contains 4 table rows (excluding header); L2 sub-table contains 4 rows; Admin sub-table contains 3 rows
  - **V-57-07 docs/index.md Cross-Platform References Android entries:** lines 173+ contain `Android Provisioning Lifecycle` AND `Android Capability Matrix` link entries
  - **V-57-08 common-issues.md Android H2 anchor pin:** `## Android Enterprise Failure Scenarios` H2 present; appended after iOS H2 (anchor stability — iOS H2 `## iOS/iPadOS Failure Scenarios` UNCHANGED)
  - **V-57-09 common-issues.md 8 H3 anchor pins:** all 8 H3 literals present per D-07 list (`### Android: Enrollment Blocked` ... `### Android: AOSP Enrollment Failed`)
  - **V-57-10 common-issues.md section-top decision-tree banner:** `decision-trees/08-android-triage.md` link present within first 200 chars of Android H2 body (immediate-banner placement)
  - **V-57-11 common-issues.md reciprocal disambiguation callouts:** `### Android: Device Not Enrolled` H3 contains `reciprocal disambiguation` literal + L1 cross-links to runbooks 22, 24, 27; `### Android: ZTE Enrollment Failed` H3 contains `reciprocal disambiguation` literal + L1 cross-link to runbook 28 (Samsung KME)
  - **V-57-12 common-issues.md cross-platform iOS reciprocal banner:** `### Android: Compliance Blocked` H3 contains link to `#ios-compliance--access-blocked`
  - **V-57-13 common-issues.md Choose Your Platform TOC update:** lines 14-18 list contains `[Android Enterprise Failure Scenarios]` bullet
  - **V-57-14 quick-ref-l1.md Android H2 + 4 sub-H3 anchor pins:** `## Android Enterprise Quick Reference` H2 + `### Top Checks` (or `### Android Top Checks`) + `### Android Escalation Triggers` + `### Android Decision Tree` + `### Android Runbooks` all present within H2 scope; appended after iOS Quick Reference H2 (iOS H2 anchor stability)
  - **V-57-15 quick-ref-l1.md Mode tag literal coverage:** Top Checks section contains all 5 Mode tag literals (`[BYOD]`, `[ZTE]`, `[AOSP]`, `[Knox]`, `[All GMS]`) at least once each within `### Top Checks` body; OR all 5 present within Runbooks list scope
  - **V-57-16 quick-ref-l1.md 8-row Runbooks list:** Android Runbooks H3 contains 8 link literals to L1 runbooks 22-29 (filename or anchor literal scan)
  - **V-57-17 quick-ref-l1.md Decision Tree single link:** Android Decision Tree H3 contains exactly one `decision-trees/08-android-triage.md` link
  - **V-57-18 quick-ref-l2.md Android H2 + 4 sub-H3 anchor pins:** `## Android Enterprise Quick Reference` H2 + `### Android Diagnostic Data Collection` (or similar 3-method H3) + `### Key Intune Portal Paths (Android L2)` + `### Play Integrity Verdict Reference` + `### Android Investigation Runbooks` all present; appended after iOS Quick Reference H2 (iOS H2 anchor stability)
  - **V-57-19 quick-ref-l2.md 3-method literal coverage:** 3-method H3 body contains `Company Portal Logs` AND `Microsoft Intune App Logs` AND `adb logcat` literals
  - **V-57-20 quick-ref-l2.md Play Integrity 3 verdict tokens:** `MEETS_BASIC_INTEGRITY` AND `MEETS_DEVICE_INTEGRITY` AND `MEETS_STRONG_INTEGRITY` all present in Play Integrity Verdict Reference H3 body
  - **V-57-21 quick-ref-l2.md PITFALL-7 firewall (NEGATIVE):** Play Integrity Verdict Reference H3 body does NOT contain `MEETS_VIRTUAL_INTEGRITY` (fictional verdict regression-guard); does NOT contain `Oct 31 2026` or `September 30 2025` or `May 2025` literal deadlines (deadline content owned by Phase 54 SSoT — only pointer-link to `#deadlines-cutover-dates` allowed)
  - **V-57-22 quick-ref-l2.md Phase 54 SSoT cross-link literal:** Play Integrity Verdict Reference H3 contains literal `04-android-patch-delivery.md#play-integrity-attestation`
  - **V-57-23 quick-ref-l2.md 6-runbook disambiguation literals:** Android Investigation Runbooks H3 contains 6 link literals to L2 runbooks 18-23 + at least 4 ` -- ` disambiguation-prose-separator tokens (mirrors iOS line 226-231 pattern)
  - **V-57-24 L1 index Knox row presence (D-21):** `docs/l1-runbooks/00-index.md` Android L1 Runbooks table contains a row referencing `28-android-knox-enrollment-failed.md`
  - **V-57-25 iOS H2 anchor stability NEGATIVE regression-guard:** all existing iOS H2 anchors in 4 hub files unchanged. Specifically: `## iOS/iPadOS Provisioning` (docs/index.md), `## iOS/iPadOS Failure Scenarios` (common-issues.md), `## iOS/iPadOS Quick Reference` (quick-ref-l1.md AND quick-ref-l2.md). Use exact-string match against pre-Phase-57 baseline (the validator can hard-code these literals; they are stable Phase 32 deliverables).
  - **V-57-26 TBD/TODO/PLACEHOLDER scan** (per V-53-25 + V-54-30 + V-55-30 + V-56-32 inheritance): none of the 4 hub files contain literal `TBD`, `TODO`, `FIXME`, `XXX`, `PLACEHOLDER` outside Version History tables AFTER Phase 57 edits

- **D-30:** **`check-phase-57.mjs` implementation pattern matches `check-phase-56.mjs` / `check-phase-55.mjs` / `check-phase-54.mjs` / `check-phase-53.mjs` / `check-phase-52.mjs` / `check-phase-51.mjs` / `check-phase-50.mjs` / `check-phase-49.mjs`** (Phase 48 D-25 + lineage). File-reads-only / no-shared-module; markdown parsing is regex-based; no AST, no glob across multiple file types within one assertion.

- **D-31:** **Commit atomicity = SINGLE atomic commit** per Phase 51 D-22 + Phase 52 D-13 + Phase 53 D-14 + Phase 54 D-21 + Phase 55 D-21 + Phase 56 D-22 + CDI-Phase57-01 inheritance + ROADMAP line 271 v1.4.1 atomicity lesson. Single atomic commit covers: (a) `docs/index.md` edits (D-01..05), (b) `docs/common-issues.md` edits (D-06..12), (c) `docs/quick-ref-l1.md` edits (D-13..20), (d) `docs/quick-ref-l2.md` edits (D-22..28), (e) `docs/l1-runbooks/00-index.md` Knox row (D-21), (f) `scripts/validation/check-phase-57.mjs` validator (D-29). VERIFICATION.md ships separate commit per Phase 49-56 close pattern.

- **D-32:** **Pre-commit gate (3 validators + 4 file-level frontmatter checks):**
  1. `node scripts/validation/check-phase-57.mjs` exits 0 (all 20-26 V-57-NN checks pass)
  2. `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0 (C1-C12 PASS; C13 informational PASS-or-noise within accepted tolerance per Phase 48 D-08)
  3. `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 (regression-prevention; should be unaffected since Phase 57 hub files are not in supervision sidecar — verify at plan-time)
  4. `markdown-link-check` against the 4 hub files + `docs/l1-runbooks/00-index.md` (informational; not blocking per Phase 48 D-08; primary purpose is anchor-resolution verification for forward-references between hub files in same atomic commit)
  5. **Mandatory pre-edit anchor inventory per PITFALL-6**: `grep -rn "index.md#" docs/` AND `grep -rn "common-issues.md#" docs/` AND `grep -rn "quick-ref-l1.md#" docs/` AND `grep -rn "quick-ref-l2.md#" docs/` BEFORE any edit; capture as `57-ANCHOR-INVENTORY.md` artifact in phase directory; cross-check post-edit anchor stability. Append-only contract enforced by post-edit re-grep + diff against pre-edit baseline.
  6. Verify all 4 hub files + L1 index file have updated `last_verified` frontmatter (60-day cycle per Phase 34 D-14 universal rule). Phase 57 atomic commit date determines new `last_verified` literal.
  7. Verify all 4 hub files contain `Android` literal in updated content (sanity post-edit).

- **D-33:** **Hardcoded H2/H3 anchor strings + literal-token regexes pinned in BOTH the validator (`check-phase-57.mjs`) and CONTEXT.md.** Brittleness trade-off accepted per Phase 49-56 D-NN precedent. Renaming any pinned H2/H3, sub-table column, Mode-tag literal, Play Integrity verdict literal, Phase 54 SSoT cross-link path, or 6-runbook disambiguation prose-separator pattern requires same-commit validator update.

### Plan-level ordering

- **D-34:** **Phase 57 plan order (single-commit atomicity per D-31):**
  1. **Pre-edit anchor inventory** (PITFALL-6 MANDATORY): produce `57-ANCHOR-INVENTORY.md` with grep output for `index.md#`, `common-issues.md#`, `quick-ref-l1.md#`, `quick-ref-l2.md#` patterns across all of `docs/`. Capture pre-edit anchor map as baseline.
  2. **Authoring wave (parallel-safe across files; sequential within hot-spot):** All hub edits and validator can be authored concurrently in worktrees because each plan touches a disjoint file set. Suggested plan-level decomposition (6 plans):
     - **57-01:** `docs/index.md` Android Enterprise H2 expansion (D-01..05; 3 sub-tables + Cross-Platform References update + platform coverage blockquote)
     - **57-02:** `docs/common-issues.md` Android Enterprise Failure Scenarios H2 (D-06..12; 8 H3s + section banner + 2 reciprocal callouts + 1 cross-platform iOS banner + Choose Your Platform TOC + platform coverage blockquote)
     - **57-03:** `docs/quick-ref-l1.md` Android Enterprise Quick Reference H2 (D-13..20; 4 sub-H3s + 5 Top Checks + escalation triggers + decision tree link + 8-row Runbooks list with `[Mode]` prefix tags)
     - **57-04:** `docs/quick-ref-l2.md` Android Enterprise Quick Reference H2 (D-22..28; 4 sub-H3s + 3-method log collection table + Intune portal paths + Play Integrity 3-row pointer table + Phase 54 cross-link + 6-runbook list with iOS-style disambiguation)
     - **57-05:** `docs/l1-runbooks/00-index.md` Knox row patch (D-21; single additive table row for runbook 28)
     - **57-06:** `scripts/validation/check-phase-57.mjs` (D-29 V-57-01..26 structural assertions; D-30 file-reads-only pattern)
     - **57-07:** Pre-commit gate (per D-32) + single atomic commit per D-31 + VERIFICATION.md authored (separate commit per close pattern)
  3. **Pre-commit gate** per D-32 (1-7 above).
  4. **Single atomic commit** per D-31. Commit message (suggested):
     ```
     docs(57): DEFER-07 Android nav unification + check-phase-57 validator

     - docs/index.md Android Enterprise H2 expansion: 3 sub-tables (L1/L2/Admin)
       matching iOS Phase 32 structural depth (CLEAN-01)
     - docs/common-issues.md Android Failure Scenarios: 8 H3s (1:1 to runbooks 22-29)
       + section-top triage tree banner + 2 reciprocal disambiguation callouts
       + 1 cross-platform iOS reciprocal banner on Compliance Blocked (CLEAN-02)
     - docs/quick-ref-l1.md Android Quick Reference: 4-part substructure
       + inline [Mode] prefix tags per row (mode-first per v1.4 triage tree) (CLEAN-03)
     - docs/quick-ref-l2.md Android Quick Reference: 4-part substructure
       + 3-method log collection (Company Portal / Intune App / adb logcat with AMAPI)
       + Play Integrity 3-row compact verdict pointer (link-not-copy to Phase 54 SSoT
         per PITFALL-7 + Phase 56 D-08 inheritance)
       + 6-runbook list with iOS-style disambiguation per row (CLEAN-04)
     - docs/l1-runbooks/00-index.md Knox row added (runbook 28; Mode = Knox only)
     - check-phase-57.mjs validator with 20-26 V-57-NN structural assertions
     ```

### Claude's Discretion

- Top Checks count (4 vs 5 entries per D-18) — recommend 5 because AOSP-mode L1 procedures are genuinely distinct from GMS modes
- Whether to consolidate ZTE/Knox portal check into one Top-Checks row or split (per D-18) — plan-author judgment based on prose flow
- Mode-tag value for runbook 28 in L1 index Knox row patch (D-21) — verify at plan-time against runbook 28 frontmatter `applies_to:` literal; recommend `Knox only`
- Whether 3-method log collection table compresses Confidence column (per D-27) — plan-author judgment based on quick-ref width budget
- Exact Key Intune Portal Paths Android L2 table row count (3 vs 5; per D-28) — plan-author judgment based on Phase 56 portal-path-precision discipline
- Whether to add a TimeEntry mode-tag row in V-57-15 validator regex assertion (Mode tag literal coverage scan strictness — present-anywhere vs present-in-Top-Checks-only)
- Optional research-flag at plan-time: verify 4th Play Integrity verdict `MEETS_VIRTUAL_INTEGRITY` is NOT in Phase 54 SSoT (D-23 NEGATIVE assertion); if Google has added it post-Phase-54-close, escalate as Phase 54 SSoT update needed BEFORE Phase 57 ship
- Optional research-flag at plan-time: verify Knox L1 runbook 28 mode-tag (D-21) — `applies_to: KME` vs `applies_to: Knox` vs `Samsung COBO+ZTE` — pick verbatim from runbook frontmatter

</decisions>

<specifics>
## Specific Ideas

- iOS Phase 32 H2 + sub-H3 + reciprocal-disambiguation patterns are the operative precedent — every Phase 57 H2 should have a "what would iOS do?" mirror check before authoring (D-01 / D-06 / D-13 / D-22)
- The L1 index Mode column at `docs/l1-runbooks/00-index.md:70-76` is the LOCKED Mode-tag vocabulary source (D-14) — quick-ref-l1.md `[Mode]` tags must be verbatim-consistent with this column
- Phase 54 `04-android-patch-delivery.md` is the Play Integrity SSoT — D-08 inheritance from Phase 56 must NOT be re-decided in Phase 57 (D-23..25)
- Single atomic commit ships ALL 6 deliverables together (4 hub edits + 1 L1-index patch + validator) — forward-references between hub files (e.g., `quick-ref-l1.md#android-enterprise-quick-reference` from `docs/index.md` L1 sub-table) resolve atomically; partial commits would break anchor-resolution for hours/days
- Pre-edit anchor inventory artifact (`57-ANCHOR-INVENTORY.md`) is auditable phase output, not in-memory check (D-32 step 5) — captures pre-edit anchor map for VERIFICATION.md cross-check
- Phase 59 Linux H2 sub-table structure WILL mirror Phase 57 Android H2 sub-table structure per ROADMAP:364 — Phase 57 sets the structural template Phase 59 inherits; quality of Phase 57 sub-table shape directly affects Phase 59 ergonomics

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 57 scope + traceability
- `.planning/ROADMAP.md` lines 320-335 — Phase 57 goal + 4 SCs + Confidence note + methodology notes (LOCKED phase boundary; serialized after Phase 48, BEFORE Phase 59; shared write hotspot ownership)
- `.planning/REQUIREMENTS.md` lines 13-16 — CLEAN-01..04 verbatim requirements
- `.planning/REQUIREMENTS.md` lines 135-138 — REQ→Phase traceability rows (CLEAN-NN file mapping)

### iOS Phase 32 precedent (operative inheritance source)
- `docs/index.md` lines 131-164 — iOS Provisioning H2 with 3 sub-tables (L1=4 rows, L2=5 rows, Admin=7 rows) — Phase 57 D-01..05 mirror source
- `docs/common-issues.md` lines 212-265 — iOS/iPadOS Failure Scenarios H2 with 6 H3s + reciprocal disambiguation (line 239) + MAM-WE advisory (lines 263-265) — Phase 57 D-06..12 mirror source
- `docs/quick-ref-l1.md` lines 117-148 — iOS/iPadOS Quick Reference H2 with 4-part substructure (Top Checks 4 / Escalation Triggers 5 / Decision Tree 1 / Runbooks 6) — Phase 57 D-13..20 mirror source
- `docs/quick-ref-l2.md` lines 182-232 — iOS/iPadOS Quick Reference H2 with 4-part substructure (3-method diagnostic / Intune portal paths / Sysdiagnose Trigger / 6 Investigation Runbooks with `--` disambiguation lines 226-231) — Phase 57 D-22..28 mirror source

### Existing Android infrastructure (consumed by reference; ZERO modification per hub-nav-only contract — except L1 index Knox row per D-21)
- `docs/l1-runbooks/00-index.md` lines 64-80 — Android L1 Runbooks table; D-21 patches in Knox row 28
- `docs/l2-runbooks/00-index.md` (Android L2 section) — referenced from docs/index.md L2 sub-table; not modified
- `docs/l1-runbooks/22-29-android-*.md` — 8 Android L1 runbooks; runbook 28 (Knox) frontmatter must be read at plan-time for Mode-tag verification (D-21 + D-14)
- `docs/l2-runbooks/18-23-android-*.md` — 6 Android L2 runbooks; runbook 22 (Knox) and 23 (AOSP) frontmatter `applies_to:` confirms mode-scope for D-26 disambiguation prose
- `docs/admin-setup-android/00-overview.md` — referenced from docs/index.md Admin sub-table single-overview-link; not modified
- `docs/decision-trees/08-android-triage.md` — referenced from L1 sub-tables + section-top banner; mode-first ordering at line 15 is locked discipline (Phase 40 D-01); not modified
- `docs/android-lifecycle/00-enrollment-overview.md` — referenced from L1/L2/Admin sub-tables + Cross-Platform References; not modified
- `docs/_glossary-android.md` — already cross-referenced at docs/index.md:179; not modified
- `docs/reference/android-capability-matrix.md` — referenced from Admin sub-table + Cross-Platform References; not modified by Phase 57 (Phase 58 will retire deferred-4-platform footer stub)

### Phase 54 SSoT for Play Integrity (link-not-copy contract per PITFALL-7 + Phase 56 D-08 inheritance)
- `docs/operations/patch-management/04-android-patch-delivery.md:50-74` — Play Integrity verdict-meaning + Intune compliance-blade mapping (3-row table: BASIC / DEVICE / STRONG)
- `docs/operations/patch-management/04-android-patch-delivery.md:76-90` — HARD-DEADLINE three-layer (Phase 54 D-13)
- `docs/operations/patch-management/04-android-patch-delivery.md:92-132` — Enforcement Cascade Migration / deadlines (May 2025 / Sept 30 2025 / Oct 31 2026)
- Anchors: `#play-integrity-attestation` (verdict cross-link target); `#deadlines-cutover-dates` (deadline pointer target)

### Wave B sibling precedent (atomic commit + validator + hardcoded-anchor lineage)
- `.planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md` — Phase 56 D-08 (Play Integrity link-not-copy); D-18..21 (validator scope, file-reads-only, hardcoded H2/anchor pin); D-22 (single atomic commit); D-09 (cross-link contract preserves SSoT)
- `.planning/phases/55-app-lifecycle-automation/55-CONTEXT.md` — Phase 55 D-17 + D-18 (validator full scope, regex-based, no-shared-module)
- `.planning/phases/54-patch-update-management/54-CONTEXT.md` — Phase 54 D-13 (HARD-DEADLINE three-layer pattern; bound to source file, NOT replicated downstream); D-19 (single-string platform frontmatter); D-20 (hardcoded H2/anchor pinning rule)
- `.planning/phases/32-*/32-CONTEXT.md` — Phase 32 iOS deliverables (if exists; Phase 32 is the iOS Phase 57-mirror precedent and most-relevant predecessor for hub retrofit)
- `scripts/validation/check-phase-56.mjs` — Phase 56 validator template; `check-phase-57.mjs` mirrors its file-reads-only / no-shared-module / regex-based structure (D-30)

### Methodology + pitfalls
- `.planning/research/SUMMARY.md` (if exists for v1.5) — research lock for Phase 57 hub-retrofit shape
- `.planning/research/PITFALLS.md` PITFALL-6 (pre-edit anchor inventory MANDATORY before docs/index.md edit; Phase 57 D-32 step 5); PITFALL-7 (whitelist-first / link-not-copy across SSoT boundaries; Phase 57 D-23..25 firewall); PITFALL-10 (callout adjacency discipline; Phase 57 D-09 limits reciprocal callouts to 2); PITFALL-13 (deprecated-token C11 regex; Phase 57 hub edits avoid this); PITFALL-14 (markdown-link-check redirect chains)

### Cross-platform consumer phases (downstream)
- Phase 58 (DEFER-08 4-platform capability comparison) — consumes Phase 57 quick-ref-l1.md / quick-ref-l2.md Android H2 anchors for cross-platform Compliance/Configuration domain rows (link-not-copy per PITFALL-7)
- Phase 59 (Hub Navigation Integration — Linux + Operations) — consumes Phase 57 docs/index.md Android H2 sub-table structure as STRUCTURAL TEMPLATE for Linux H2 (per ROADMAP:364 verbatim "Linux H2 section must have same sub-table structure as Android H2 from Phase 57"); also adds Operations H2 to docs/index.md (Phase 59-owned, NOT Phase 57)
- Phase 60 (Audit Harness v1.5 Finalization) — registers `check-phase-57.mjs` in CI workflow + runs C13 broken-link automation against Phase 57 hub-nav cross-link surface
- Phase 61 (Gap Closure + Terminal Re-Audit + Milestone Close) — final harness exit-0 verification includes Phase 57 anchor stability

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **iOS Phase 32 sub-table architecture** at `docs/index.md:131-164` — direct mirror source for Android H2 expansion; iOS L1=4 rows / L2=5 rows / Admin=7 rows; Phase 57 mirrors at L1=4 / L2=4 / Admin=3 (Android has fewer admin-setup sibling files than iOS so Admin row count drops; this is structurally fine because depth-matching means *sub-table count*, not *row count*)
- **iOS Phase 32 6-H3 + reciprocal disambiguation pattern** at `docs/common-issues.md:212-265` — direct mirror source for Android Failure Scenarios H2 (D-06..09); reciprocal callout syntax verbatim at line 239
- **iOS Phase 32 4-part quick-ref substructure** at `docs/quick-ref-l1.md:117-148` and `docs/quick-ref-l2.md:182-232` — direct mirror source for L1/L2 quick-ref Android H2s
- **L1 index Mode column vocabulary** at `docs/l1-runbooks/00-index.md:70-76` — locked Mode-tag literal source for D-14 (`[BYOD]` / `[ZTE]` / `[AOSP]` / `[All GMS]`; `[Knox]` added at D-21)
- **Phase 56 validator template** at `scripts/validation/check-phase-56.mjs` — `check-phase-57.mjs` mirrors structure exactly (D-30); file-reads-only / no-shared-module / regex-based
- **Phase 54 Play Integrity SSoT** at `docs/operations/patch-management/04-android-patch-delivery.md:50-74` + `:76-90` + `:92-132` — verdict content + Intune mapping + HARD-DEADLINE three-layer + Enforcement Cascade timeline; Phase 57 cross-links via `#play-integrity-attestation` and `#deadlines-cutover-dates` anchors only (link-not-copy per PITFALL-7)
- **Existing Android decision tree** at `docs/decision-trees/08-android-triage.md` — mode-first ordering at line 15 is the LOCKED v1.4 discipline (Phase 40 D-01); section-top banner in Phase 57 D-08 cross-references this tree
- **Existing 8 Android L1 runbooks** at `docs/l1-runbooks/22-29-android-*.md` — referenced from Phase 57 quick-ref-l1.md Runbooks list (D-17) and common-issues.md H3 L1 links (D-07); not modified
- **Existing 6 Android L2 runbooks** at `docs/l2-runbooks/18-23-android-*.md` — referenced from Phase 57 docs/index.md L2 sub-table (D-03) and quick-ref-l2.md Investigation Runbooks list (D-26); not modified
- **Existing Android admin-setup hub** at `docs/admin-setup-android/00-overview.md` — referenced from Phase 57 docs/index.md Admin sub-table single-overview-link (D-04); not modified
- **Existing Android lifecycle docs** at `docs/android-lifecycle/00-03-*.md` — `00-enrollment-overview.md` referenced from Phase 57 docs/index.md L1/L2/Admin sub-tables + Cross-Platform References (D-02..05); not modified
- **Existing 18-android-log-collection.md 3-method Decision Matrix** at `docs/l2-runbooks/18-android-log-collection.md` — content source for Phase 57 quick-ref-l2.md 3-method log collection table (D-27); 3 method names verbatim: `Company Portal Logs` / `Microsoft Intune App Logs` / `adb logcat`

### Established Patterns
- **Validator-as-deliverable** — every Phase 48+ phase ships `check-phase-NN.mjs` alongside content per AUDIT-06 (Phase 48 D-25 + Phase 49-56 lineage)
- **Single atomic commit per documentation phase** — Phase 51-56 all shipped as single atomic commits; v1.4.1 atomicity lesson per ROADMAP line 271; Phase 57 D-31 inheritance
- **Hardcoded H2/anchor strings + literal-token regexes pinned** — Phase 49-56 D-NN brittleness-tradeoff precedent; Phase 57 D-33 inheritance
- **Append-only H2-block contract** — Phase 51-56 hot-spot writes contract; Phase 57 D-01/D-06/D-13/D-22 + V-57-25 NEGATIVE regression-guard for iOS H2 anchor stability
- **Pre-edit anchor inventory MANDATORY** — PITFALL-6 + Phase 56 D-09 inheritance; Phase 57 D-32 step 5 captures `57-ANCHOR-INVENTORY.md` artifact
- **Link-not-copy SSoT firewall** — PITFALL-7 + Phase 56 D-08 inheritance for Play Integrity; Phase 57 D-23..25 + V-57-21 NEGATIVE regression-guard
- **iOS H3 namespacing pattern** — `### iOS: <Name>` (common-issues.md) + `### iOS <Component>` (quick-ref); Phase 57 D-07 (`### Android: <Name>`) and D-16 (`### Android <Component>`) inheritance
- **Reciprocal disambiguation callout syntax** — `[Link A] | [Link B] (reciprocal disambiguation — see both if cause unclear)` at common-issues.md:239; Phase 57 D-09 inheritance with Android-specific reciprocal pairs (24/22/27 + 27/28)
- **Cross-platform reciprocal banner syntax** — `> **iOS:** For iOS [topic], see [iOS: Name](#anchor).` at common-issues.md:34/52/68/148/164/180/196; Phase 57 D-10 inheritance limited to Compliance Blocked H3 only

### Integration Points
- `docs/index.md` — Phase 57 expands Android H2 (CLEAN-01); Phase 59 (later) appends Linux H2 + Operations H2 — append-only contract preserves Phase 57 work
- `docs/common-issues.md` — Phase 57 appends Android Failure Scenarios H2 (CLEAN-02) + minor Choose-Your-Platform TOC + platform-coverage-blockquote in-place edits
- `docs/quick-ref-l1.md` — Phase 57 appends Android Quick Reference H2 (CLEAN-03)
- `docs/quick-ref-l2.md` — Phase 57 appends Android Quick Reference H2 (CLEAN-04) + cross-link to Phase 54 `04-android-patch-delivery.md#play-integrity-attestation`
- `docs/l1-runbooks/00-index.md` — Phase 57 D-21 patches Knox row 28 (single additive table row)
- `scripts/validation/check-phase-57.mjs` — Phase 57 ships validator; Phase 60 registers in CI workflow per AUDIT-06
- `docs/_templates/` — verify Android quick-ref blocks comply with template if templates exist (research-flag at plan-time)

</code_context>

<deferred>
## Deferred Ideas

- **Operations cross-references in docs/index.md Android H2 (Option 1D)** — explicitly DEFERRED to Phase 59 per ROADMAP:354 + 333-334 shared-write hotspot rule. Phase 57 must NOT pre-empt Phase 59 operations-hub-nav ownership. Phase 59 will append `## Operations` H2 to docs/index.md with cross-platform operations sub-tables; that H2 MAY include Android-specific cross-references but Phase 57 does not.
- **Per-mode admin-setup-android enumeration in docs/index.md (Option 1C)** — DEFERRED indefinitely; admin-setup-android/00-overview.md handles tri-portal Mermaid + per-mode setup-sequence enumeration at the overview level. Hub stays mode-abstract per iOS precedent.
- **Mode-grouped quick-ref-l1.md sub-H3 sections (Option 3B)** — DEFERRED; CLEAN-03 four-part substructure is locked. If future v1.6+ work creates significant per-mode L1 procedure divergence (e.g., Knox-specific Top Checks growing beyond 1-2 items), revisit a per-mode sub-quick-ref split as a NEW phase.
- **MEETS_VIRTUAL_INTEGRITY 4th Play Integrity verdict** — fictional in option 4B/4D specs; verified NOT in Phase 54 SSoT at plan-time. If Google introduces this verdict in 2026+, the SSoT update happens at Phase 54 source (or future phase that owns the SSoT), then Phase 57 quick-ref pointer updates as a follow-on. Phase 57 ships 3 verdicts only.
- **Full Play Integrity verdict + escalation routing in quick-ref-l2.md (Options 4B/4D)** — DEFERRED indefinitely; PITFALL-7 firewall + Phase 56 D-08 inheritance lock this content at Phase 54 SSoT. Quick-ref carries pointer-only.
- **HARD-DEADLINE three-layer pattern in quick-ref-l2.md** — DEFERRED indefinitely; Phase 54 D-13 three-layer is bound to source file. Quick-ref ships single inline `> ⚠️` pointer only (D-25).
- **Mandatory cross-platform reciprocal banners on every Android H3 in common-issues.md** — DEFERRED; Phase 57 D-10 limits to Compliance Blocked only (one banner) to reduce noise. If admin user-research surfaces specific cross-platform misroutes, add per-H3 banners in a future phase.
- **Knox runbook 28 admin Setup Sequence content** — out-of-Phase-57 scope; admin-setup-android/07-knox-mobile-enrollment.md owns this surface. Phase 57 only adds the Knox row to L1 index (D-21), not Knox admin content.
- **AOSP per-OEM L1 runbook split (RealWear / Zebra / Pico / HTC / Meta Quest)** — out-of-Phase-57 scope; runbook 29 covers all 5 OEMs in single file per v1.4.1 design. Future v1.6+ may revisit if per-OEM content diverges substantially.
- **Per-OEM admin-setup files 09-13 hub linking** — out-of-Phase-57 scope; admin-setup-android/00-overview.md provides the per-OEM navigation. Hub stays at single-overview-link depth per D-04.

</deferred>

---

*Phase: 57-defer-07-android-nav-unification*
*Context gathered: 2026-04-30*
*Methodology: 4-gray-area Wave-of-3 adversarial review (Finder→Adversary→Referee parallel-4-agent mode); 113 raw defects → 20 confirmed-real points across 4 winners; Adversary net -41pts (3× fabricated-disproof 2x penalties triggered: 2 in GA-1 against 1C, 1 in GA-4 against 4B/4D fictional verdict)*
