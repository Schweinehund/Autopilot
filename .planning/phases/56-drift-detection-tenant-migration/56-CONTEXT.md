# Phase 56: Drift Detection + Tenant Migration - Context

**Gathered:** 2026-04-29
**Status:** Ready for planning
**Methodology:** Adversarial review (Finder / Adversary / Referee scored pattern, single-Finder mode) on 4 gray areas covering 16 candidate sub-options across 84 enumerated defects (465 raw points: distributed 133 / 128 / 114 / 90 across GA-1/2/3/4). Adversary attempted 11 full disproves + 18 partial-severity-downgrade disproves, claiming +125 points. Referee upheld 2 full disproves (F-2D-01 `<details>` HTML precedent verified across 8 v1.2 files; F-3A-04 v1.2 doc freshness `last_verified: 2026-04-13` is 16 days old vs 60-day cycle), upheld 1 full disprove with category-correction (F-4D-02 4D's frontmatter-only is genuinely a different pattern category, not "anti-aligned" with Phase 55 D-16 which is inline-only), upheld ~14 partial-severity downgrades, and **rejected 4 full disproves at 2x penalty** (F-1A-02 SUMMARY.md line 203 explicitly says "5 files (00-overview through 04-tenant-migration-runbook)" so 1A's 3-file shape contradicts SUMMARY directly; F-2B-01/02/03 2B option spec literally splits per-platform tenant migration files, eliminating the runbook entirely — fatal -54pt 2x-penalty cluster). Net surviving defect score after rulings: **GA-1: 1A=14, 1B=12, 1C=19, 1D=12 → winner 1B-modified (12pts; tiebreaker = SUMMARY line 203 5-file mandate)**; **GA-2: 2A=4, 2B=55, 2C=8, 2D=7 → winner 2A (4pts; SC#5 fold mandate compliance)**; **GA-3: 3A=7, 3B=4 (Referee mislabeled — semantics described match 3A "additive-only no v1.2 edits"; corrected to 3A; net 7pts)**; **GA-4: 4A=4, 4B=8, 4C=14, 4D=11 → winner 4A-extended (4pts; hybrid 3-option enumeration + inline blockquote + frontmatter dual-surface)**. Adversary net final: -45pts (the F-2B disproof cluster was fatal — 3× wrong disproves on REQ-map violations cost -54pts at 2x).

<domain>
## Phase Boundary

Phase 56 delivers Multi-Platform Drift Detection + Tenant-to-Tenant Migration documentation as a 5-file suite under `docs/operations/drift-migration/` plus a `check-phase-56.mjs` validator. **Phase 56 is the Wave B sibling of Phases 54 + 55** (concurrent execution; disjoint file sets within `operations/`); Phase 53 (Co-Management) is the methodology source for cross-platform inline-blockquote shape (D-08 inheritance), single-atomic-commit Goldilocks-rule (D-14 inheritance), and the operations/00-index.md cross-reference contract (DPO-Phase53-01 inheritance). Phase 54 (Patch & Update Management) and Phase 55 (App Lifecycle Automation) are the most-recent precedents for ops-domain phase shape: 1D Hybrid 00-overview + per-platform files + same-commit atomic landing + FULL-scope validator-as-deliverable. **Linux is OUT of scope** for Phase 56 (no DRIFT-LIN REQ — same as Phase 55); Phase 56 covers 4 platforms only (Windows + macOS + iOS + Android).

**Five deliverables (7 active requirements: DRIFT-01..07):**

1. `docs/operations/drift-migration/00-overview.md` (DRIFT-03 PRIMARY) — cross-platform compliance drift signals: Windows policy conflict + app install regression / macOS profile revocation / iOS jailbreak detection + OS downgrade / Android Play Integrity verdict change. Shape: cross-platform comparison table with 4 platform columns + `## Drift terminology` concept H2 + per-platform routing cross-links to 01-04. Size budget 200-350 lines (Phase 54 D-01 + Phase 55 D-01 1D Hybrid inheritance). NO DRIFT-01/02/04/05/06/07 substantive content duplicated (REQ traceability firewall enforced by V-56-11 NEGATIVE assertions paralleling Phase 54 V-54-29 + Phase 55 V-55-10). Cross-platform inline `> **Platform applicability:**` blockquote at TOP per Phase 54 D-04 + Phase 55 D-13 token inheritance. Frontmatter `platform: cross-platform` per Phase 54 D-19 + Phase 55 D-03 inheritance.

2. `docs/operations/drift-migration/01-windows-drift-detection.md` (DRIFT-01 + DRIFT-02 fold) — PRIMARY: DRIFT-01 Windows Intune Remediations (Proactive Remediations) detect+remediate Bash/PowerShell script pairs with portal path `Devices > Manage devices > Scripts and remediations > Remediation scripts`; per-device status report interpretation (`No issues detected` / `Issues fixed` / `Error`). FOLD: DRIFT-02 canonical script-authoring pattern AS `## Canonical script-authoring pattern` H2 with detection-returns-`exit 1` + remediation-returns-`exit 0` semantics + Log Analytics surface reference for full output. Cross-platform inline `> **Platform applicability:**` blockquote at TOP. `platform: Windows` frontmatter.

3. `docs/operations/drift-migration/02-macos-drift-detection.md` (no specific REQ — slot reserved per SUMMARY.md line 203 "5 files" mandate; macOS shell-script monitoring adjacent surface) — content scope: macOS profile-revocation detection patterns + DDM compliance signals + Intune Settings Catalog drift signals; cross-link to v1.2 macOS L2 investigation guides; cross-platform inline blockquote per D-13 + frontmatter `platform: macOS`. **Plan-author discretion**: if substantive content thin, this file may be a routing-only stub pointing to v1.2 macOS L1/L2 runbooks + 00-overview cross-platform signals, paralleling Phase 55 4C-prime hybrid where `04-android-mgp-lifecycle.md` Zebra section is operational-summary-plus-cross-link.

4. `docs/operations/drift-migration/03-ios-android-drift-detection.md` (no specific REQ — slot reserved per SUMMARY.md "5 files" mandate; iOS jailbreak / OS downgrade + Android Play Integrity verdict-change adjacent surface) — content scope: iOS jailbreak detection signals via compliance policy + OS-downgrade detection; Android Play Integrity verdict-change MEETS_STRONG_INTEGRITY drift signals (cross-link to Phase 54 `04-android-patch-delivery.md`); cross-platform inline blockquote + frontmatter `platform: iOS,Android` (multi-platform string). **Plan-author discretion**: same routing-stub-vs-substantive choice as slot-02; if thin, route to v1.2 iOS L1/L2 + Phase 54 Play Integrity content.

5. `docs/operations/drift-migration/04-tenant-migration-runbook.md` (DRIFT-04 + DRIFT-05 + DRIFT-06 + DRIFT-07 ALL FOLDED INSIDE) — PRIMARY: DRIFT-04 Windows tenant migration with 3 BitLocker re-key options enumerated (source-tenant escrow → target Entra via PowerShell scheduled-task / decrypt → re-encrypt with data-risk window callout / third-party tool e.g. Quest On Demand Migration), Autopilot deregistration in source + re-registration in target, post-migration BitLocker recovery key escrow validation. FOLD: DRIFT-05 macOS/iOS section AS `## macOS / iOS tenant migration` H2 with ABM token re-issue (release from Tenant A ABM → re-assign in Tenant B; in-use devices require wipe + re-enrollment) + ADE Await-Configuration behavior. FOLD: DRIFT-06 Android section AS `## Android tenant migration` H2 with MGP re-binding sequence (disconnect from source MGP → bind new MGP account to target Intune tenant → re-approve all apps → re-provision: factory reset + re-enrollment for corporate-owned, work profile re-creation for BYOD, ZT portal re-upload with target credentials). FOLD: DRIFT-07 cross-platform encryption-drift section AS `## Cross-platform encryption drift` H2 covering BitLocker (Windows; key escrow targeting risk) + FileVault (macOS; escrow not updated post-re-enrollment) + iOS device-level encryption (no MDM management beyond compliance check) + Android (LUKS not available; AOSP dm-crypt variance). **MEDIUM confidence dual-surface**: frontmatter `confidence: MEDIUM` + inline `> ⚠️ MEDIUM confidence — tenant migration is not a formally supported Intune scenario` blockquote at TOP (after `> **Platform applicability:**` blockquote). Cross-platform inline `> **Platform applicability:**` blockquote at TOP. `platform: cross-platform` frontmatter.

6. `scripts/validation/check-phase-56.mjs` — AUDIT-06 validator-as-deliverable per Phase 48 D-25 file-reads-only contract + Phase 49 D-26 + Phase 50 D-25 + Phase 51 D-20 + Phase 52 D-11 + Phase 53 D-10 + Phase 54 D-17 + Phase 55 D-17 regex-based pattern lineage. Full validator scope per Phase 54/55 D-17 precedent; estimated **28-32 V-56-NN structural assertions** (file existence × 5 + frontmatter local contract × 5 + per-platform literal-token coverage + DRIFT-01 portal path + DRIFT-02 canonical script-authoring H2 + exit codes + Log Analytics + DRIFT-03 cross-platform signal coverage + DRIFT-04 BitLocker 3-option enumeration + DRIFT-05 ABM token re-issue + Await-Configuration + DRIFT-06 MGP re-binding sequence + per-ownership-mode re-provisioning + DRIFT-07 fold H2 + 4-platform encryption coverage + MEDIUM-confidence frontmatter + inline blockquote + cross-link to v1.2 drift-detection.md + tenant-migration.md + cross-platform inline blockquote × 5 files + bare-`> **Platform:**` NEGATIVE regression-guard + ops/00-index.md NOT-amended NEGATIVE regression-guard + v1.2 anti-deletion regression-guard + TBD/TODO scan).

Phase 57 (DEFER-07 Android Nav Unification) consumes `operations/00-index.md` per ROADMAP line 457 (cross-reference-only); Phase 59 (Hub Navigation Integration) consumes Phase 56 anchors for `docs/index.md` Operations H2 expansion. Phase 56 MUST cross-reference `operations/00-index.md` from its own files, MUST NOT amend it (DPO-Phase53-01 + DPO-Phase54-02 + DPO-Phase55-01 hotspot ownership rule). Phase 60 (Audit Harness v1.5 Finalization) registers `check-phase-56.mjs` in CI workflow + runs C13 broken-link automation against Phase 56 cross-link surface. Phase 58 (DEFER-08 4-platform capability comparison) WILL consume Phase 56 anchors for cross-platform Compliance and Configuration domain rows (link-not-copy per PITFALL-7).

</domain>

<spec_lock>
## SPEC.md Lock

No SPEC.md exists for Phase 56 (no `/gsd-spec-phase` invoked). Requirements are locked by REQUIREMENTS.md DRIFT-01..07 + ROADMAP.md Phase 56 5 SCs (lines 310-315). Implementation decisions below.

</spec_lock>

<decisions>
## Implementation Decisions

### File shape — 5-file SUMMARY-aligned suite (Gray Area 1 — winner: 1B-modified)

- **D-01:** **`docs/operations/drift-migration/` ships as 5 files** matching SUMMARY.md line 203 verbatim ("operations/drift-migration/00-overview.md through 04-tenant-migration-runbook.md (5 files)") and Phase 54/55 sibling parity. Per Adversary-Referee adjudication (1A=14pts, **1B=12pts**, 1C=19pts, 1D=12pts; tiebreaker between 1B and 1D resolved via SUMMARY line 203 5-file literal mandate). Reject 1A: F-1A-02 [REJECT-ADVERSARY confirmed; SUMMARY line 203 explicitly mandates 5 files; 3-file shape contradicts SUMMARY directly]. Reject 1C: F-1C-01 CRIT (DRIFT-03 → 00-overview locked traceability per REQUIREMENTS line 179; 1C duplicates DRIFT-03 surface into a separate `02-multi-platform-compliance-drift.md`). Reject 1D: F-1D-01 CRIT (REQUIREMENTS lines 180-183 use literal filename `04-tenant-migration-runbook.md` for DRIFT-04..07 mapping; 1D's renumber to `02-tenant-migration-runbook.md` is a literal mismatch).
  - **5 final files:** `00-overview.md` + `01-windows-drift-detection.md` + `02-macos-drift-detection.md` + `03-ios-android-drift-detection.md` + `04-tenant-migration-runbook.md`. Slot-04 retained verbatim per REQ literal.
  - **Slot-02/03 plan-author discretion:** if macOS shell-script monitoring or iOS jailbreak / Android Play Integrity drift content is thin (no native Intune Remediations equivalent on macOS — Intune Remediations is Windows-only despite "Bash/PowerShell" REQ phrasing), slot-02/03 may be routing-only stubs paralleling Phase 55 4C-prime hybrid pattern (operational-summary + cross-link to v1.2 platform L1/L2 + Phase 54 Play Integrity SSoT). Stub vs substantive is a CD-XX plan-author decision; both shapes satisfy V-56-NN file-existence assertions if frontmatter and TOP blockquote present.
- **D-02:** **DRIFT-03 cross-platform signal coverage authored at `00-overview.md` only** per REQUIREMENTS line 179 lock. Validator V-56-15 asserts 00-overview contains all 6 signal tokens: `policy conflict` (Windows) + `app install regression` (Windows) + `profile revocation` (macOS) + `jailbreak detection` (iOS) + `OS downgrade` (iOS) + `Play Integrity verdict` (Android). Slot-02/03 files MUST NOT duplicate these signal-substance literals (anti-duplication firewall paralleling V-55-10 / V-54-29).
- **D-03:** **Frontmatter `platform: cross-platform`** for 00-overview per Phase 54 D-19 + Phase 55 D-03 inheritance. Slot-01 = `Windows`, slot-02 = `macOS`, slot-03 = `iOS,Android` (multi-platform comma-string accepted per V-54-31 inheritance), slot-04 = `cross-platform`. Validator V-56-07 accepts either single-token or comma-string per Phase 54/55 precedent.

### Tenant migration runbook architecture — single file, all 4 platforms folded inside (Gray Area 2 — winner: 2A)

- **D-04:** **`docs/operations/drift-migration/04-tenant-migration-runbook.md` is a SINGLE file with 4 platform H2 sections + cross-platform encryption-drift fold ALL INSIDE.** Per Adversary-Referee adjudication (**2A=4pts**, 2B=55pts, 2C=8pts, 2D=7pts). Reject 2B: F-2B-01/02/03 ALL CRIT [REJECT-ADVERSARY at 2x penalty for fabricated disproof; 2B option spec literally splits per-platform tenant migration files into 04-windows/05-macos-ios/06-android/07-cross-platform-encryption — directly violating REQUIREMENTS lines 180-183 "INSIDE 04-tenant-migration-runbook.md" mandate AND ROADMAP SC#5 "folded into the runbook, not a separate artifact (DRIFT-07 fold)" verbatim mandate]. Reject 2C: F-2C-01/02 CRIT (extracts DRIFT-07 to `05-cross-platform-encryption-drift.md`; same SC#5 fold violation as 2B but smaller scope). Reject 2D: F-2D-04/05 MED (`<details>` HTML collapsibles introduce reviewability inversion in PR diffs + SharePoint export risk per PITFALL-14; F-2D-01 zero-precedent claim REJECTED-by-Referee — `<details>` is used in 8 v1.2 files in admin-setup-apv1/ and lifecycle-apv2/ — but reviewability + export concerns stand at MED tier).
  - **4 platform H2 sections in document order:** `## Windows tenant migration` (DRIFT-04) → `## macOS / iOS tenant migration` (DRIFT-05) → `## Android tenant migration` (DRIFT-06) → `## Cross-platform encryption drift` (DRIFT-07 fold).
  - **Size budget:** 600-1000 lines hard cap (no formal cap — Phase 55 `01-windows-win32-msix-scale.md` shipped at similar envelope; reviewability mitigated by clear H2 sectioning).
  - **DRIFT-07 fold H2 literal-pin:** `## Cross-platform encryption drift` is the locked literal. Validator V-56-22 enforces. NEGATIVE regression-guard: NO sibling file `05-cross-platform-encryption-drift.md` exists (V-56-29 paralleling Phase 55 V-55-28 + DPO contract).
- **D-05:** **DRIFT-04 BitLocker 3-option enumeration** verbatim per REQUIREMENTS line 75: (a) source-tenant escrow → target Entra via PowerShell scheduled-task pattern; (b) decrypt → re-encrypt with data-risk window callout; (c) third-party tool e.g. Quest On Demand Migration. Validator V-56-16 asserts all 3 option literal-tokens present: `source-tenant escrow` AND `decrypt` AND `re-encrypt` AND (`Quest On Demand Migration` OR `third-party tool`). Order = neutral enumeration; NO Microsoft-recommended approach (per REQ neutrality on preference); option (b) carries explicit `> ⚠️ Data-risk window` callout per ROADMAP SC#3 line 313 verbatim.
- **D-06:** **DRIFT-05 macOS/iOS ABM token re-issue literals** per REQUIREMENTS line 76: cannot transfer MDM server assignment Tenant A → Tenant B; release from ABM in Tenant A then re-assign in Tenant B; in-use devices require wipe + re-enrollment; ADE Await-Configuration behavior callout. Validator V-56-18/19 asserts: `ABM token` AND `release` AND `re-assign` AND `Await-Configuration` AND `wipe` AND `re-enrollment`.
- **D-07:** **DRIFT-06 Android MGP re-binding sequence literals** per REQUIREMENTS line 77: disconnect from source MGP → bind new MGP account to target Intune tenant → re-approve all apps → re-provision (factory reset + re-enrollment for corporate-owned, work profile re-creation for BYOD, ZT portal re-upload with target credentials). Validator V-56-20/21 asserts: `disconnect` AND `bind new` AND `re-approve` AND `re-provision` AND `factory reset` AND `work profile re-creation`.
- **D-08:** **DRIFT-07 fold H2 4-platform encryption coverage** per REQUIREMENTS line 78: BitLocker (Windows) + FileVault (macOS) + iOS device-level encryption + Android dm-crypt variance. Validator V-56-23 asserts within DRIFT-07 H2 scope: `BitLocker` AND `FileVault` AND (`iOS device-level` OR `iOS encryption`) AND `dm-crypt`.

### Existing v1.2 doc relationship — additive cross-reference only (Gray Area 3 — winner: 3A)

- **D-09:** **Phase 56 new ops files cross-reference existing v1.2 docs without modifying them.** Per Adversary-Referee adjudication (**3A=7pts** [the Referee labeled this "3B" but described 3A semantics: "ZERO modification to v1.2 docs in Phase 56 commit"; semantic correction applied — winner is 3A], 3B-original=4pts but adjusts upward when validator + commit-atomicity costs counted, 3C=14pts, 3D=12pts). Reject 3B-original (with retrofit to v1.2 docs): F-3B-04 MED (cross-directory validator scope expansion is anti-pattern per CDI-Phase54-03 inheritance). Reject 3C: F-3C-01 CRIT (PITFALL-13 false-positive risk — adding "deprecated" token to v1.2 docs triggers C11 ops-domain anti-pattern regex per AUDIT-03; sidecar allowlist seeding not budgeted). Reject 3D: F-3D-01/02 CRIT (deletion breaks docs/index.md + sibling refs; `docs/reference/drift-detection.md` is REGISTRATION drift NOT configuration drift — different scope axis; Phase 56 is NOT a superset).
  - **Cross-link contract:** `01-windows-drift-detection.md` contains relative-path link to `../../reference/drift-detection.md` (registration drift; v1.2 SSoT preserved). `04-tenant-migration-runbook.md` contains relative-path link to `../../device-operations/04-tenant-migration.md` (Windows hardware-hash deregistration steps; v1.2 SSoT preserved). Validator V-56-25/26 enforces presence.
  - **Anti-deletion regression-guard:** V-56-31 asserts `docs/reference/drift-detection.md` AND `docs/device-operations/04-tenant-migration.md` exist (present at file-system level); ZERO modification expected via D-09 additive-only contract.
  - **Scope distinction documented:** `01-windows-drift-detection.md` and `04-tenant-migration-runbook.md` MUST clarify scope vs v1.2 docs in cross-link prose (e.g., "For Autopilot **registration** drift (profile assignment states), see [Registration Drift Detection](../../reference/drift-detection.md). This guide covers **configuration** drift via Intune Remediations.").
- **D-10:** **`docs/reference/drift-detection.md` and `docs/device-operations/04-tenant-migration.md` ownership unchanged.** Phase 56 does NOT claim hotspot ownership of either v1.2 doc; v1.2 phase lineage retains ownership. No `last_verified` bump, no deprecation header, no content move. Future v1.6+ work may revisit; out of v1.5 scope.

### BitLocker 3-option enumeration + MEDIUM-confidence dual-surface framing (Gray Area 4 — winner: 4A-extended)

- **D-11:** **3 BitLocker re-key options enumerated neutrally + inline `> ⚠️ MEDIUM confidence` blockquote at TOP + frontmatter `confidence: MEDIUM`.** Per Adversary-Referee adjudication (**4A=4pts**, 4B=8pts, 4C=14pts, 4D=11pts). 4A as originally specified ("frontmatter MEDIUM only, no inline blockquotes") is REFINED to a hybrid: keep 4A's neutral 3-option enumeration + frontmatter MEDIUM, ADD inline blockquote AT TOP of file (Phase 55 D-16 inline-blockquote-precedent + Phase 52 D-01 freshness-caveat dual-surface pattern + ROADMAP line 317 SUMMARY mandate "surface in runbook frontmatter"). Reject 4B: F-4B-01 HIGH (recommendation-bias — REQ DRIFT-04 is neutral on preference; 4B's "recommend PowerShell escrow" injects Microsoft preference not in REQ). Reject 4C: F-4C-01 MED (per-third-party-tool callout pattern requires enumerating beyond Quest, scope-creep). Reject 4D: F-4D-01 CRIT (REQ scope-undershoot — DRIFT-04 line 75 enumerates 3 approaches; 4D documents only 2 + advisory mention).
  - **Inline blockquote token:** `> ⚠️ MEDIUM confidence — tenant migration is not a formally supported Intune scenario. Microsoft does not provide automated tooling for tenant-to-tenant device migration. Test the process in a non-production environment before executing at scale.` Placed at TOP of `04-tenant-migration-runbook.md` after `> **Platform applicability:**` blockquote (line ~12).
  - **Frontmatter:** `confidence: MEDIUM` field added to `04-tenant-migration-runbook.md` only (other 4 files do not carry this field; tenant migration is the only MEDIUM-confidence surface in Phase 56).
  - **NEGATIVE regression-guard:** Phase 56 does NOT use `> 📋 Community pattern — MEDIUM confidence` token (Phase 55 D-16 V-55-17 is APP-05 community-pattern-adjacency-specific); Phase 56 uses `> ⚠️ MEDIUM confidence` token (warning shape, not community-pattern shape).
- **D-12:** **Option (b) decrypt → re-encrypt approach carries dedicated `> ⚠️ Data-risk window` callout** per ROADMAP SC#3 line 313 verbatim mandate ("decrypt → re-encrypt with data-risk window"). Validator V-56-NN asserts callout literal-pin within ~10 lines of option (b) enumeration anchor. Paralleling Phase 55 D-05 PITFALL-10 callout adjacency discipline.
- **D-13:** **Quest On Demand Migration mentioned ONCE** per REQ DRIFT-04 line 75 example phrasing. NO inline `> 📋` per-third-party-tool callout (rejected 4C scope-creep). Plain prose enumeration: "third-party tool (e.g., Quest On Demand Migration)". Validator V-56-NN literal-token scan for `Quest On Demand Migration` exact match.

### Cross-platform routing pattern across per-platform files (inheritance from Phase 54 D-04 + Phase 55 D-13)

- **D-14:** **Each of 5 drift-migration files carries an inline `> **Platform applicability:**` blockquote at line ~9 (after frontmatter)** per Phase 54 D-04 + Phase 55 D-13 inheritance. Content per file: brief one-line platform identifier + back-link to `00-overview.md` for full cross-platform comparison + ≤3 sub-bullets pointing to the other sibling per-platform files. The blockquote is pointer-only (link-not-copy contract — full comparison content lives in 00-overview per D-02). Verified Phase 54/55 implementation at `docs/operations/patch-management/00-overview.md:9` + `01-windows-wufb-rings.md:9` + `02-macos-update-enforcement.md:9` + `03-ios-update-lifecycle.md:9` + `04-android-patch-delivery.md:9` (all 5 files use established `> **Platform applicability:**` token verbatim) AND `docs/operations/app-lifecycle/00-overview.md:9` + 01..04 (all 5 files).
  - **Critical token discipline:** Use established `> **Platform applicability:**` token verbatim. Bare `> **Platform:**` is **forbidden** (zero corpus precedent; Phase 54 D-04 + Phase 55 D-13 lexicon-family preservation rule inherited). Lexicon-family preservation enforced by V-56-28 NEGATIVE regression-guard (paralleling V-54-27 + V-55-27).
- **D-15:** **Cross-platform routing surface centralization at `00-overview.md`** per D-01 + D-02 + D-14 coupling. The full 4-platform comparison table + cross-platform terminology concept H2 (`## Drift terminology`) + per-platform routing live in 00-overview only; per-platform files carry only pointer-shape inline blockquote. NOT a new decision; direct Phase 54 D-05 + Phase 55 D-14 inheritance.

### MEDIUM-confidence dual-surface framing for tenant migration

- **D-16:** **MEDIUM-confidence dual-surface contract** per ROADMAP line 317 + SUMMARY line 204 + Phase 52 D-01 freshness-caveat dual-surface precedent. `04-tenant-migration-runbook.md` carries:
  - Frontmatter `confidence: MEDIUM` field (single new frontmatter token; forward-compatible with future Phase 60+ C-check expansion if AUDIT-03 / C11 ops-domain anti-pattern regex extends to confidence-attribution-token enforcement)
  - Inline `> ⚠️ MEDIUM confidence — tenant migration is not a formally supported Intune scenario` blockquote at TOP (after `> **Platform applicability:**` blockquote)
  - **Validator V-56-08 + V-56-24** assert both frontmatter literal AND inline blockquote literal-pin
  - Other 4 Phase 56 files (00-overview / 01-windows-drift-detection / 02-macos / 03-ios-android) do NOT carry `confidence: MEDIUM` (drift-detection is HIGH confidence per SUMMARY line 278)
- **D-17:** **NO three-layer pattern** for tenant migration MEDIUM-confidence — Phase 54 D-13 three-layer (table-cell + adjacent blockquote + per-occurrence inline reminder) was for HARD-DEADLINE items (Apple OS 26 + Android MEETS_STRONG_INTEGRITY). MEDIUM-confidence is a different signal class; dual-surface (frontmatter + inline-at-TOP) is sufficient. Phase 55 inheritance (D-15: zero-hard-deadline) extends.

### Validator scope + commit atomicity + frontmatter platform contract

- **D-18:** **`check-phase-56.mjs` validator scope = FULL** per Phase 54 D-17 + Phase 55 D-17 + Phase 53 D-10 22-26 V-NN floor precedent. File-reads-only / no-shared-module per Phase 48 D-25; regex-based parsing per Phase 49 D-26 + Phase 51 D-20 + Phase 52 D-11 + Phase 53 D-11 + Phase 54 D-18 + Phase 55 D-18. Estimated **28-32 V-56-NN structural assertions:**
  - **V-56-01..06 File existence:** 5 drift-migration content files + validator self-reference + cross-reference targets (`docs/reference/drift-detection.md` + `docs/device-operations/04-tenant-migration.md`)
  - **V-56-07 Frontmatter local contract:** 5 files carry single-string `platform:` (or comma-string for slot-03) + `audience: admin` + 60-day `last_verified` + `review_by`
  - **V-56-08 MEDIUM-confidence frontmatter on tenant-migration runbook:** `04-tenant-migration-runbook.md` carries `confidence: MEDIUM` field
  - **V-56-09 Cross-platform comparison table at 00-overview:** `00-overview.md` contains a 4-platform-column drift-signals table (Windows | macOS | iOS | Android)
  - **V-56-10 Drift terminology concept H2:** `00-overview.md` contains `## Drift terminology` (or equivalent regex-pinned pattern with at least 3 cross-platform terminology tokens within ~30-line window)
  - **V-56-11 Anti-scope-creep regression-guard at 00-overview** (per D-02 firewall): `00-overview.md` does NOT contain literal tokens `supersedence`, `Win32ContentPrepTool`, `BitLocker re-key`, `ABM token`, `MGP re-binding`, `exit 1`, `exit 0`, `Log Analytics`, `Quest On Demand Migration`. Anti-duplication firewall paralleling V-54-29 + V-55-10.
  - **V-56-12 DRIFT-01 portal path literal:** `01-windows-drift-detection.md` contains `Devices > Manage devices > Scripts and remediations > Remediation scripts`
  - **V-56-13 DRIFT-01 status report literals:** `No issues detected` AND `Issues fixed` AND `Error` in 01-windows file
  - **V-56-14 DRIFT-02 canonical script-authoring H2 + exit codes + Log Analytics:** `01-windows-drift-detection.md` contains literal H2 `## Canonical script-authoring pattern` AND `exit 1` AND `exit 0` AND `Log Analytics`
  - **V-56-15 DRIFT-03 cross-platform signal coverage at 00-overview:** all 6 signal tokens (`policy conflict`, `app install regression`, `profile revocation`, `jailbreak detection`, `OS downgrade`, `Play Integrity verdict`) within 00-overview body
  - **V-56-16 DRIFT-04 BitLocker 3 options enumerated:** `04-tenant-migration-runbook.md` contains `source-tenant escrow` + `decrypt` + `re-encrypt` + (`Quest On Demand Migration` OR `third-party tool`)
  - **V-56-17 DRIFT-04 Autopilot deregistration + post-migration escrow validation:** 04-runbook contains `deregistration` AND `re-registration` AND `escrow validation` (or `escrow verification`)
  - **V-56-18 DRIFT-05 ABM token re-issue + Await-Configuration:** 04-runbook contains `ABM token` AND `release` AND `re-assign` AND `Await-Configuration`
  - **V-56-19 DRIFT-05 wipe + re-enrollment for in-use devices:** 04-runbook contains `wipe` AND `re-enrollment` within macOS/iOS H2 scope
  - **V-56-20 DRIFT-06 MGP re-binding sequence:** 04-runbook contains `disconnect` AND `bind new` AND `re-approve` AND `re-provision`
  - **V-56-21 DRIFT-06 per-ownership-mode re-provisioning:** `factory reset` (corporate) AND `work profile re-creation` (BYOD) AND `ZT portal re-upload` within Android H2 scope
  - **V-56-22 DRIFT-07 fold H2 literal pin:** 04-runbook contains literal H2 `## Cross-platform encryption drift`
  - **V-56-23 DRIFT-07 4-platform encryption coverage:** `BitLocker` AND `FileVault` AND (`iOS device-level` OR `iOS encryption`) AND `dm-crypt` within DRIFT-07 H2 scope
  - **V-56-24 MEDIUM-confidence inline blockquote:** 04-runbook contains `> ⚠️ MEDIUM confidence` blockquote within first 50 lines
  - **V-56-25 Cross-link to existing v1.2 drift-detection.md:** `01-windows-drift-detection.md` contains relative-path link `../../reference/drift-detection.md`
  - **V-56-26 Cross-link to existing v1.2 tenant-migration.md:** `04-tenant-migration-runbook.md` contains relative-path link `../../device-operations/04-tenant-migration.md`
  - **V-56-27 Cross-platform inline blockquote at TOP** (per D-14 + Phase 54 D-04 + Phase 55 D-13 inheritance): each of 5 drift-migration files contains literal `> **Platform applicability:**` blockquote within first 50 lines of file body (post-frontmatter). Paralleling V-54-26 + V-55-26.
  - **V-56-28 Bare `> **Platform:**` NEGATIVE regression-guard** (per D-14): zero files (across the entire `docs/` + `.planning/` tree) match literal `> **Platform:**` (with no qualifier word). Paralleling V-54-27 + V-55-27.
  - **V-56-29 ops/00-index.md NOT amended NEGATIVE regression-guard** (per DPO-Phase53-01 + DPO-Phase54-02 + DPO-Phase55-01): `docs/operations/00-index.md` does NOT contain `## Drift Detection` H2 or `## Tenant Migration` H2. Phase 59 will add this in its own commit per ROADMAP line 463.
  - **V-56-30 NO sibling cross-platform-encryption-drift file** (per D-04 fold mandate): NO file `docs/operations/drift-migration/05-cross-platform-encryption-drift.md` exists. Paralleling V-55-28-style fold-discipline regression-guard.
  - **V-56-31 v1.2 anti-deletion regression-guard** (per D-09 + D-10): `docs/reference/drift-detection.md` AND `docs/device-operations/04-tenant-migration.md` exist at file-system level
  - **V-56-32 TBD/TODO/PLACEHOLDER scan** (per V-53-25 + V-54-30 + V-55-30 inheritance): none of Phase 56 files contain literal `TBD`, `TODO`, `FIXME`, `XXX`, `PLACEHOLDER` outside Version History tables
- **D-19:** **`check-phase-56.mjs` implementation pattern matches `check-phase-55.mjs` / `check-phase-54.mjs` / `check-phase-53.mjs` / `check-phase-52.mjs` / `check-phase-51.mjs` / `check-phase-50.mjs` / `check-phase-49.mjs`** (Phase 48 D-25 + lineage). File-reads-only / no-shared-module; markdown parsing is regex-based.
- **D-20:** **All 5 drift-migration content files use single-string or comma-string `platform:` frontmatter** (per Phase 54 D-19 + Phase 55 D-19 inheritance lineage). 00-overview = `cross-platform`, 01 = `Windows`, 02 = `macOS`, 03 = `iOS,Android` (multi-platform comma-string), 04 = `cross-platform`. NOTE on C10: harness C10 check has hardcoded scope `linuxDocPaths()` per `scripts/validation/v1.5-milestone-audit.mjs` lines 141-178; operations/drift-migration/ files are NOT in C10 scope, so frontmatter is enforced ONLY by the local V-56-07 validator assertion, not by C10 (CDI-Phase56-04 inheritance from CDI-Phase55-04 from CDI-Phase54-04).
- **D-21:** **Hardcoded H2/anchor strings + literal-token regexes pinned in BOTH the validator (`check-phase-56.mjs`) and CONTEXT.md.** Brittleness trade-off accepted per Phase 49 D-25 + Phase 50 D-25 + Phase 51 D-21 + Phase 52 D-12 + Phase 53 D-13 + Phase 54 D-20 + Phase 55 D-20 precedent. Renaming any pinned H2, comparison-table column, BitLocker option literal, ABM token literal, MGP re-binding literal, encryption-drift token, or MEDIUM-confidence callout token requires same-commit validator update.
- **D-22:** **Commit atomicity = SINGLE atomic commit** per Phase 51 D-22 + Phase 52 D-13 + Phase 53 D-14 + Phase 54 D-21 + Phase 55 D-21 + CDI-Phase56-05 inheritance + ROADMAP line 271 v1.4.1 atomicity lesson. Phase 56 has NO retrofit obligations (unlike Phase 54's PATCH-06 same-commit-atomic at admin-setup-ios/07-device-enrollment.md), so single-commit landing is mechanical: 5 new content files + validator + VERIFICATION (separate commit per Phase 49/50/51/52/53/54/55 close pattern). Single atomic commit covers: 5 new content files (drift-migration/00-overview + 01-windows-drift-detection + 02-macos-drift-detection + 03-ios-android-drift-detection + 04-tenant-migration-runbook) + 1 validator (check-phase-56.mjs).

### Plan-level ordering and atomicity

- **D-23:** **Phase 56 plan order (single-commit atomicity per D-22):**
  1. **Authoring wave (parallel-safe across files; sequential within hot-spot):** All content + validator can be authored concurrently in worktrees. Phase 56 has `Depends on: Phase 53` per ROADMAP line 308 (operations/00-index.md must exist for cross-reference). Phase 53 closed on 2026-04-28. Suggested plan-level decomposition (7 plans — same plan count as Phase 55):
     - **56-01:** `docs/operations/drift-migration/00-overview.md` (D-01 1B-modified winner; cross-platform comparison table with 6+ rows + `## Drift terminology` concept H2 + routing cross-links to 01-04 + cross-platform inline blockquote per D-14 + frontmatter `platform: cross-platform` per D-03)
     - **56-02:** `docs/operations/drift-migration/01-windows-drift-detection.md` (DRIFT-01 + DRIFT-02 fold; `## Canonical script-authoring pattern` H2 + portal path + status reports + exit codes + Log Analytics per D-10/V-56-12-14; cross-link to v1.2 `drift-detection.md` per D-09; cross-platform inline blockquote per D-14 + frontmatter `platform: Windows`)
     - **56-03:** `docs/operations/drift-migration/02-macos-drift-detection.md` (no specific REQ; slot reserved per SUMMARY 5-file mandate; plan-author discretion stub-vs-substantive; cross-platform inline blockquote + frontmatter `platform: macOS`)
     - **56-04:** `docs/operations/drift-migration/03-ios-android-drift-detection.md` (no specific REQ; slot reserved per SUMMARY 5-file mandate; plan-author discretion stub-vs-substantive; cross-platform inline blockquote + frontmatter `platform: iOS,Android` comma-string)
     - **56-05:** `docs/operations/drift-migration/04-tenant-migration-runbook.md` (DRIFT-04 + DRIFT-05 + DRIFT-06 + DRIFT-07 ALL FOLDED; D-04 2A winner; 4 platform H2s in document order; D-11 dual-surface MEDIUM-confidence; D-12 data-risk callout for option (b); D-13 Quest mention once; cross-link to v1.2 `device-operations/04-tenant-migration.md` per D-09; cross-platform inline blockquote + frontmatter `platform: cross-platform` + `confidence: MEDIUM`)
     - **56-06:** `scripts/validation/check-phase-56.mjs` (D-18 V-56-01..32 structural assertions; D-19 file-reads-only pattern; estimated 28-32 checks)
     - **56-07:** pre-commit gate (3 validators) + single atomic commit per D-22 + VERIFICATION.md authored (separate commit per close pattern)
  2. **Pre-commit gate:**
     - `node scripts/validation/check-phase-56.mjs` exits 0 (all 28-32 V-56-NN checks pass)
     - `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0 (C1-C12 PASS; C13 informational PASS-or-noise within accepted tolerance per Phase 48 D-08; C11 informational — verify no false positives at Phase 56 ship per CDI-Phase56-03)
     - `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 (regression-prevention; should be unaffected since Phase 56 files are not in supervision sidecar)
     - `markdown-link-check` against the 5 new content files + cross-link targets (informational; not blocking per Phase 48 D-08)
     - Verify all 5 new files contain `last_verified` + `review_by` frontmatter on 60-day cycle
     - Verify all 5 new files contain `> **Platform applicability:**` blockquote at TOP (per D-14 + V-56-27)
     - Verify `04-tenant-migration-runbook.md` contains `confidence: MEDIUM` frontmatter (per D-16 + V-56-08) AND `> ⚠️ MEDIUM confidence` inline blockquote (per D-16 + V-56-24)
  3. **Single atomic commit:** All 5 new drift-migration files + validator per D-22 + commit message (suggested):
     ```
     docs(56): drift-migration 5-file suite + check-phase-56 validator

     - 5 new ops files: operations/drift-migration/00-overview through 04-tenant-migration-runbook
     - DRIFT-01/02 Windows Intune Remediations + canonical script-authoring pattern
       (portal path + exit-code semantics + Log Analytics surface)
     - DRIFT-03 cross-platform compliance drift signals (Windows / macOS / iOS / Android)
     - DRIFT-04 Windows tenant migration with 3 BitLocker re-key options enumerated neutrally
       (PowerShell scheduled-task escrow + decrypt/re-encrypt with data-risk callout + third-party tool)
     - DRIFT-05 macOS/iOS ABM token re-issue + ADE Await-Configuration behavior
     - DRIFT-06 Android MGP re-binding sequence + per-ownership-mode re-provisioning
     - DRIFT-07 cross-platform encryption drift folded into tenant-migration runbook
       (BitLocker + FileVault + iOS device-level + Android dm-crypt variance per SC#5 fold mandate)
     - MEDIUM-confidence dual-surface framing (frontmatter + inline blockquote at TOP)
     - check-phase-56.mjs validator with 28-32 V-56-NN structural assertions
     ```

### Claude's Discretion

- Slot-02 / slot-03 stub-vs-substantive shape (per D-01 plan-author discretion); routing-only stub paralleling Phase 55 4C-prime hybrid is acceptable if substantive content thin
- Exact column choice for cross-platform drift-signal comparison table at 00-overview (4 vs 6 vs 8 rows)
- BitLocker re-key option ordering (a/b/c — REQ-neutral, plan-author choice for prose flow)
- Whether `## macOS / iOS tenant migration` is one combined H2 (D-04 default) or two separate `## macOS tenant migration` + `## iOS tenant migration` H2s — plan-author discretion if file-size reduction warrants split (V-56-NN regex must accommodate either)
- Microsoft Graph `exportJobs` pattern + key report names (per SUMMARY line 53) — plan-author may include in `01-windows-drift-detection.md` or 00-overview as L2-facing depth callout; plan-time research needed

</decisions>

<specifics>
## Specific Ideas

- DRIFT-04 Windows BitLocker re-key options framing should mirror the pre-existing v1.2 `device-operations/04-tenant-migration.md` "Critical warnings" blockquote shape but for BitLocker context specifically — preserve cross-link discoverability between the two runbooks
- DRIFT-02 Canonical script-authoring pattern should reuse the v1.2 `device-operations/` doc structure for "Prerequisites" / "Procedure" sections where applicable for consistency
- "I want admins to discover whether tenant migration is even feasible BEFORE diving into per-platform sections" — overview routing in `04-tenant-migration-runbook.md` TOC anchor should be high-visibility
- Cross-platform encryption drift section should NOT recommend any specific encryption-key-recovery tool; pure educational/comparison content per SUMMARY MEDIUM-confidence framing
- Quest On Demand Migration is the canonical third-party tool example per REQ DRIFT-04; do NOT enumerate alternative third-party tools (scope-creep risk per F-4C-01)

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 56 scope + traceability
- `.planning/ROADMAP.md` lines 306-318 — Phase 56 goal + 5 SCs + Confidence note + Parallelism note (LOCKED phase boundary)
- `.planning/REQUIREMENTS.md` lines 70-78 — DRIFT-01..07 verbatim requirements
- `.planning/REQUIREMENTS.md` lines 175-185 — REQ→Phase traceability rows (DRIFT-NN file mapping)

### Wave B sibling precedent (inheritance source)
- `.planning/phases/55-app-lifecycle-automation/55-CONTEXT.md` — Phase 55 D-NN decisions (5-file shape, atomic commit, validator-as-deliverable, MEDIUM-confidence inline blockquote pattern, `> **Platform applicability:**` token discipline)
- `.planning/phases/54-patch-update-management/54-CONTEXT.md` — Phase 54 D-NN decisions (1D Hybrid 00-overview, three-layer hard-deadline pattern (NOT used in Phase 56), single-string platform frontmatter)
- `.planning/phases/53-co-management-operational-docs/53-CONTEXT.md` — Phase 53 D-08 cross-platform inline-blockquote shape origin + DPO-Phase53-01 operations/00-index.md hotspot ownership rule
- `docs/operations/patch-management/00-overview.md` and 01-04 — Phase 54 5-file shape + cross-platform inline blockquote pattern (verified file-system precedent)
- `docs/operations/app-lifecycle/00-overview.md` and 01-04 — Phase 55 5-file shape (Phase 56 most-direct precedent)
- `docs/operations/00-index.md` — Phase 53-owned hotspot Phase 56 must NOT amend (DPO-Phase53-01 + DPO-Phase54-02 + DPO-Phase55-01 + DPO-Phase56 inheritance)

### Pre-existing v1.2 docs (cross-link targets; ZERO modification per D-09)
- `docs/reference/drift-detection.md` — pre-existing v1.2 doc covering Autopilot **registration** drift (profile assignment states); SCOPE-DISTINCT from Phase 56 **configuration** drift; cross-linked from `01-windows-drift-detection.md`
- `docs/device-operations/04-tenant-migration.md` — pre-existing v1.2 doc covering Windows tenant migration with hardware-hash deregistration; SCOPE-OVERLAPPING with new `04-tenant-migration-runbook.md` but Windows-only; cross-linked from new runbook

### Research + pitfalls
- `.planning/research/SUMMARY.md` lines 52-56 (Graph API drift detection + Tenant migration confidence) and lines 201-204 (Phase 56 deliverables — "5 files" mandate that locked GA-1 winner)
- `.planning/research/PITFALLS.md` PITFALL-7 (whitelist-first), PITFALL-10 (callout discipline), PITFALL-12 (sidecar pin coordinate drift), PITFALL-13 (deprecated-token C11 regex amplification), PITFALL-14 (markdown-link-check redirect chains), PITFALL-15 (GFM anchor case sensitivity)

### Cross-platform consumer phases (downstream)
- `docs/operations/00-index.md` — Phase 59 (Hub Navigation Integration) will add Phase 56 H2 entry; Phase 56 must NOT pre-edit
- `docs/index.md` — Phase 57 (DEFER-07) + Phase 59 will add hub links to Phase 56 content; Phase 56 must NOT pre-edit
- `docs/reference/4-platform-capability-comparison.md` (future) — Phase 58 (DEFER-08) will consume Phase 56 anchors for cross-platform Compliance and Configuration domain rows (link-not-copy per PITFALL-7)

### Apple-specific tenant migration references (research flags for plan-time)
- Microsoft Learn ABM-MDM-server-transfer documentation (verify current 2026 UI path at plan-time)
- Apple Business Manager 2026 UI for "release devices from MDM server" workflow
- Microsoft Graph `exportJobs` pattern documentation for `DeviceNonCompliance` / `NonCompliantDevicesAndSettings` / `ConfigurationPolicyAggregate` report names

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase 55 + Phase 54 5-file shape pattern:** `00-overview.md` + `01-windows-*.md` + `02-macos-*.md` + `03-ios-*.md` + `04-android-*.md` (or variants); validated cross-platform inline blockquote pattern at line ~9 of each file; `> **Platform applicability:**` token verbatim
- **Phase 55 D-16 inline-blockquote MEDIUM-confidence pattern:** `> 📋 Community pattern — MEDIUM confidence` — Phase 56 uses DIFFERENT token (`> ⚠️ MEDIUM confidence`) per D-11 (warning shape vs community-pattern shape) but same dual-surface-frontmatter+inline architecture (D-16)
- **Phase 54/55 validator template:** `scripts/validation/check-phase-NN.mjs` file-reads-only / regex-based / no-shared-module pattern; `check-phase-56.mjs` should mirror `check-phase-55.mjs` structure exactly (D-19)
- **Phase 53 owned `docs/operations/00-index.md`** — Phase 56 cross-references but does not amend (DPO contract)
- **Phase 53 v1.2 `docs/reference/drift-detection.md` (registration drift)** — cross-link target for `01-windows-drift-detection.md`; preserves SSoT for Autopilot registration drift
- **Phase 21/22 v1.2 `docs/device-operations/04-tenant-migration.md` (Windows tenant migration)** — cross-link target for `04-tenant-migration-runbook.md`; preserves SSoT for Windows hardware-hash deregistration

### Established Patterns
- **Validator-as-deliverable** — every Phase 48+ phase ships `check-phase-NN.mjs` alongside content per AUDIT-06
- **Single atomic commit per ops-domain phase** — Phase 51-55 all shipped as single atomic commits; v1.4.1 atomicity lesson per ROADMAP line 271
- **Cross-platform inline blockquote at line ~9** — Phase 53/54/55 all 15 files (3 phases × 5 files each) use `> **Platform applicability:**` token
- **REQ traceability firewall at 00-overview** — Phase 54 V-54-29 + Phase 55 V-55-10 NEGATIVE assertions list literal forbidden tokens (per-platform-substance content forbidden in cross-platform overview); Phase 56 V-56-11 inherits
- **MEDIUM-confidence dual-surface framing** — Phase 52 D-01 freshness-caveat dual-surface (frontmatter + inline blockquote) precedent; Phase 56 D-11 + D-16 extends to tenant-migration confidence
- **`<details>` HTML disclosure** — used in 8 v1.2 files (admin-setup-apv1/, lifecycle-apv2/) per Adversary file-system verification; available pattern but Phase 56 does NOT use it (D-04 single-runbook with H2 sections preferred over collapsibles for PR-diff reviewability per F-2D-04 confirmed defect)

### Integration Points
- `docs/operations/drift-migration/` — fresh directory created in Phase 56 (no shared-write hotspot with Phases 54/55 Wave B siblings)
- `scripts/validation/check-phase-56.mjs` — registered in CI workflow `.github/workflows/audit-harness-v1.5-integrity.yml` by Phase 60 per AUDIT-06
- `docs/operations/00-index.md` — Phase 56 links FROM (`docs/operations/drift-migration/*.md` reference operations/00-index.md as the operations hub) but does NOT amend; Phase 59 will add `## Drift Detection + Tenant Migration` H2 to 00-index.md in its own commit
- `docs/reference/drift-detection.md` — cross-link FROM `01-windows-drift-detection.md` (registration vs configuration scope distinction prose)
- `docs/device-operations/04-tenant-migration.md` — cross-link FROM `04-tenant-migration-runbook.md` (Windows hardware-hash deregistration SSoT preserved)

</code_context>

<deferred>
## Deferred Ideas

- **Microsoft Graph exportJobs deep-dive** — Graph API export-jobs pattern + report names referenced in SUMMARY line 53; plan-author may include surface-level mention in `01-windows-drift-detection.md` or 00-overview, but full Graph SDK / Power BI integration deep-dive is out of scope (plan-time L2-facing depth decision)
- **Quest On Demand Migration tutorial** — Quest tool mentioned ONCE per D-13; full tutorial / step-by-step is third-party scope-creep, out of scope
- **macOS-specific drift detection alternatives to Intune Remediations** — DEPP / Munki / Jamf-style drift tooling not in v1.5 scope; macOS slot-02 stays in stub-or-thin shape per D-01 plan-author discretion
- **Linux drift detection** — out of v1.5 scope per Phase 56 Linux exclusion; Linux compliance covered by Phase 50 + Phase 52 admin/L2 guides
- **Pre-existing v1.2 doc deprecation lifecycle** — moved to Phase 60/61 milestone-close audit per F-3C-02 (not Phase 56 scope)
- **`last_verified` retroactive freshness normalization for v1.0–v1.4.1 docs** — Phase 48 broken-link first-pass + Phase 60-61 second-pass surface stale docs; Phase 56 inherits Phase 48 D-25 retroactive-normalization-out-of-scope-here lock
- **iOS jailbreak detection signal authoring deeper than overview-cell prose** — out of Phase 56 scope; v1.3 iOS L1/L2 runbooks + Phase 54 Play Integrity own this surface
- **Tenant-to-tenant device-license re-assignment mechanics** — explicitly out-of-scope per REQUIREMENTS.md line 115 (procurement/licensing operation, not Intune provisioning)
- **Quest On Demand Migration alternative third-party tools** — scope-creep per F-4C-01; only Quest mentioned per REQ phrasing

</deferred>

---

*Phase: 56-drift-detection-tenant-migration*
*Context gathered: 2026-04-29*
*Methodology: 4-gray-area Wave-of-3 adversarial review (Finder→Adversary→Referee); 84 raw defects → 14 confirmed-real points across 4 winners; Adversary net -45pts (3× wrong disproves on F-2B-01/02/03 cluster fatal at -54pt 2x penalty)*
