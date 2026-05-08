# Phase 59: Hub Navigation Integration — Linux + Operations Sections - Context

**Gathered:** 2026-05-01
**Status:** Ready for planning
**Methodology:** 12-agent adversarial review (4 finder + 4 adversary + 4 referee, 3 parallel waves) on 4 gray areas covering 17 candidate options across 64 enumerated defects (Σ raw points: GA-1=135, GA-2=114, GA-3=114, GA-4=77). Adversary attempted 36 disproofs; Referee upheld 12 full disproofs, 11 partial (severity downgrades), rejected 13. **Three 2x penalties triggered**: one in GA-1 against 1B (fabricated "Linux is the ONLY platform with a dedicated end-user enrollment guide" — verified false: `docs/end-user-guides/android-work-profile-setup.md` exists yet was deliberately excluded from Phase 57 hub surfacing); one in GA-2 against the Adversary (incorrect PITFALL-7-disproof on 2B-4 + 2D-1/2D-2 position-defect rejections — both are mechanical defects locked by ROADMAP:373 + ROADMAP:379, not process artifacts); one in GA-3 against the Adversary (fabricated "validators use AST/markdown-link parsing" claim — verified false: every `scripts/validation/check-phase-NN.mjs` uses `fs.readFileSync` + regex only, no markdown AST anywhere). **Net surviving defect score after rulings: GA-1: 1A=1 (STRONG), 1B=26, 1C=42, 1D=59 → winner 1A**; **GA-2: 2A=13, 2B=50.5, 2C=0 (VERY HIGH), 2D=25 → winner 2C**; **GA-3: 3A=13.5, 3B=31, 3C=11, 3D=40, 3E=4.5 (HIGH) → winner 3E**; **GA-4: 4A=3 (HIGH; Referee FLIPPED Finder's 4C choice based on D-22..D-25 PITFALL-7 reframing — pointer-table-with-cross-link is endorsed shape, NOT violation), 4B=15, 4C=6, 4D=22 → winner 4A**.

<domain>
## Phase Boundary

Phase 59 delivers the **Hub Navigation Integration surgical retrofit** — a 6-file documentation patch that lands Linux into the `docs/index.md` hub at Phase 57 Android-equivalent structural depth, adds a **net-new Operations H2** to `docs/index.md` (no precedent — current hub uses platform-named H2s only) linking to all 4 ops sub-directories (`co-management/`, `patch-management/`, `app-lifecycle/`, `drift-migration/`), completes `docs/operations/00-index.md` (currently a 25-line stub with only Co-Management filled — 3 missing sections retrofitted same-commit per DPO-Phase56-01 hand-off chain), normalizes glossary cross-platform see-also reciprocity across all 4 existing platform glossaries (CLEAN-08, the v1.4 macOS↔Android pattern extended per-term across the 5-platform surface), and adds `## Linux Quick Reference` H2 sections to both `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` matching iOS/Android four-part substructure verbatim. **Phase 59 is the v1.5 navigation cleanup phase serialized after Phase 58 (DEFER-08 4-platform comparison) and Phase 57 (DEFER-07 Android nav unification), and BEFORE Phase 60 (audit harness finalization)**; both Phases 57 and 59 touch `docs/index.md`, so serialization is methodology-mandatory per ROADMAP line 379 + 484 shared-write hotspot ownership rule.

**Phase 59 is HUB-NAV + GLOSSARY-NORMALIZATION + QUICK-REF-LINUX ONLY.** No new runbook content, no new admin-setup content, no new operations content, no new lifecycle content. Existing Linux infrastructure (`docs/admin-setup-linux/00-05`, `docs/linux-lifecycle/00-01`, `docs/decision-trees/09-linux-triage.md`, `docs/l1-runbooks/30-33`, `docs/l2-runbooks/24-25`, `docs/end-user-guides/linux-intune-portal-enrollment.md`, `docs/_glossary-linux.md`, `docs/reference/linux-capability-matrix.md`) and existing Operations infrastructure (`docs/operations/{co-management,patch-management,app-lifecycle,drift-migration}/00-overview.md` + 4 platform-scoped files each, all Phase 53-56 deliverables) is **consumed by reference only**. Phase 59 ships hub navigation pointers TO this existing surface — never duplicates content from it.

**Six deliverables (1 active requirement: CLEAN-08; plus 5 SC-driven outputs):**

1. `docs/index.md` Linux H2 (SC#1 PRIMARY, GA-1 winner 1A) — net-new `## Linux Provisioning` H2 appended after Android H2 (currently lines 167-196), before Cross-Platform References (currently line 199). Three sub-tables matching Phase 57 Android H2 structural depth verbatim (per ROADMAP:381 mandate): L1=4 rows, L2=4 rows, Admin=3 rows. End-user enrollment guide (LIN-06) NOT surfaced at hub level (Phase 57 precedent: Android end-user guide deliberately excluded from hub). Append-only H2 contract per Phase 57 D-31.

2. `docs/index.md` Operations H2 (SC#1 PRIMARY, GA-2 winner 2C) — net-new `## Operations` H2 (verbatim SC#1 naming — NOT "Operational Depth" which is the milestone PILLAR-3 name) appended AFTER the Linux H2 from deliverable #1 and BEFORE Cross-Platform References. Four compact sub-H3 sections (one per ops sub-domain): `### Co-Management`, `### Patch & Update Management`, `### App Lifecycle Automation`, `### Compliance Drift Detection + Tenant Migration`. Each sub-H3 = 1-sentence framing + small 1-3 row routing table pointing to `operations/{sub-dir}/00-overview.md` plus major routing endpoints per platform.

3. `docs/operations/00-index.md` completion (SC#1 supportive, GA-2 D-GA2-05 same-commit) — fills out 3 currently-empty sub-domain sections (Patch & Update Management, App Lifecycle Automation, Compliance Drift Detection + Tenant Migration) using existing Co-Management section (lines 14-25) as structural template. Each new sub-section = H2 heading + 2-3 sentence framing (matching cross-platform routing tone of sub-dir 00-overview blockquote) + table with `Guide | Covers` columns + 1 row per file in the sub-dir (patch=5 rows, app=5 rows, drift=5 rows; 15 rows total added). Discharges DPO-Phase56-01 hand-off chain.

4. Glossary CLEAN-08 see-also normalization (SC#2 PRIMARY, GA-3 winner 3E) — append `> See also: [Term](other-glossary.md#anchor) (Other-Platform); [Term](third-glossary.md#anchor) (Third-Platform).` as the LAST line of existing per-term `> **Cross-platform note:**` (Android 23, Linux 10) and `> **Windows equivalent:**` (macOS 11) blockquotes for the LOCKED collision-term matrix. For Win glossary terms WITHOUT existing cross-platform blockquotes (currently 0 — Win uses heterogeneous shapes like `> **APv2 only.**`), Phase 59 ADDS new `> **Cross-platform note:**` blockquotes per the locked shape used by Android/Linux (pattern alignment normalization). 4 existing glossaries (NOT 5 files — `_glossary-macos.md` IS the iOS glossary per Phase 49 D-17 + REQUIREMENTS.md:144). Phase 49 LIN-02 commit-2 already shipped doc-level reciprocal banner-link in all 4 glossaries (lines `_glossary.md:11`, `_glossary-macos.md:10`, `_glossary-android.md:12`, `_glossary-linux.md:10`) — Phase 59 delta is ONLY the per-term see-also inline appends; banner work is DONE.

5. `docs/quick-ref-l1.md` + `docs/quick-ref-l2.md` Linux H2 sections (SC#4 PRIMARY, GA-4 winner 4A) — net-new `## Linux Quick Reference` H2 in BOTH files matching iOS/Android 4-sub-H3 four-part substructure verbatim (per Phase 57 D-13 + D-22 + SC#4 "matching the structural depth"). L1: Top Checks (4 items, NO Mode tags — Linux has no triage-mode axis) / Linux Escalation Triggers (4-5 items) / Linux Decision Tree (single link to 09-linux-triage.md) / Linux Runbooks (4-link list to L1 runbooks 30-33 with iOS-style ` -- ` disambiguation). L2: Linux Diagnostic Data Collection (3 methods table — journalctl / file-based / package-state per 24-linux-log-collection.md Decision Matrix) / Key Intune Portal Paths Linux L2 (3-5 rows) / Linux Compliance Category Reference (4-row pointer table mirroring Android Play Integrity Verdict Reference shape per Phase 57 D-22..D-25 ENDORSEMENT) / Linux Investigation Runbooks (2-link list to L2 runbooks 24, 25; thin but unavoidable per finite Linux L2 surface).

6. `scripts/validation/check-phase-59.mjs` (AUDIT-06 validator-as-deliverable) — file-reads-only / regex-based / no-shared-module per Phase 48 D-25 + Phase 49-58 D-NN lineage. Estimated **30-36 V-59-NN structural assertions** (larger scope than Phase 57's 26 because Phase 59 has 4 distinct GAs plus ops/00-index.md amendment + glossary reciprocity validator): file-existence × 6 hub-and-glossary files + Linux H2 sub-table row counts (4/4/3) + Operations H2 4 sub-H3 anchors + ops/00-index.md 4 H2 sections present + glossary see-also reciprocity bidirectional anchor-pair check across locked collision-term matrix + Linux quick-ref-l1/l2 4 sub-H3 anchors each + Linux Compliance Category Reference 4 category literals + 3-method log-collection literals + iOS/Android H2 anchor stability NEGATIVE regression-guard + TBD/TODO scan + Linux end-user-guide NOT surfaced at hub level (negative regression).

Phase 60 (Audit Harness v1.5 Finalization) registers `check-phase-59.mjs` in CI workflow + runs C13 broken-link automation against Phase 59's hub-nav cross-link surface. Phase 61 (Gap Closure + Terminal Re-Audit) runs the full v1.5-milestone-audit.mjs against the post-Phase-59 state and produces the v1.5-MILESTONE-AUDIT.md close artifact.

</domain>

<decisions>
## Implementation Decisions

### docs/index.md Linux H2 — pure Phase 57 Android mirror, NO end-user surfacing, NO operations cross-references inside Linux H2 (Gray Area 1 — winner: 1A STRONG, margin 25pts)

- **D-01:** **`docs/index.md` Linux H2 expands to three sub-tables matching Phase 57 Android H2 structural depth verbatim per ROADMAP.md:381.** Per Adversary-Referee adjudication (1A=1pt, 1B=26pts incl. 2x fabricated-evidence penalty for "Linux is the ONLY platform with a dedicated end-user enrollment guide" claim — verified false: `docs/end-user-guides/` contains BOTH `android-work-profile-setup.md` AND `linux-intune-portal-enrollment.md`; Phase 57 D-02..D-05 deliberately excluded the Android end-user file from hub surfacing; 1C=42pts incl. CRIT verbatim SC#1 violation per ROADMAP:373; 1D=59pts conflates Linux H2 with separate Operations H2 per ROADMAP:373 SC#1 enumeration). Reject 1B: F-1B-01 HIGH 10pts (Admin=4 breaks Phase 57 D-04 3-row parity); F-1B-02 MED 5pts (REQUIREMENTS:29 LIN-06 audience = end user, not admin); F-1B-03 MED+penalty 10pts (Phase 57 hub-discipline precedent verified). Reject 1C: F-1C-01..03 CRIT/HIGH 30pts (4 sub-tables ≠ ROADMAP:373 SC#1 verbatim "Service Desk L1 / Desktop Engineering L2 / Admin Setup sub-tables" enumeration; ≠ Phase 57 Android template; ≠ docs/index.md:131-164 iOS Phase 32 precedent per 57-CONTEXT.md:228). Reject 1D: F-1D-01 CRIT 10pts (operations-cross-references-inside-Linux-H2 violates ROADMAP:373 SC#1 separate-Operations-H2 enumeration); F-1D-04 HIGH 10pts (runbook-volume row-count rationale empirically invalid — Phase 57 D-02 ships L1=4 rows despite 8 Android L1 runbooks; sub-table row count is independent of underlying runbook count).

- **D-02:** **L1 sub-table: 4 rows** matching Phase 57 D-02 row-count and content-shape exactly:
  1. `[Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md)` — Start here · understand the Linux enrollment paths (Ubuntu 22.04 / 24.04 LTS, intune-portal package install, microsoft-identity-broker)
  2. `[Linux Triage Decision Tree](decision-trees/09-linux-triage.md)` — Identifies the Linux failure scenario from symptoms (enrollment failed / non-compliant / web-app-CA-blocking-Edge / agent service not running per LIN-07) and routes to the correct runbook
  3. `[Linux L1 Runbooks](l1-runbooks/00-index.md#linux-l1-runbooks)` — Scripted procedures for the 4 Linux failure scenarios (runbooks 30-33 per REQUIREMENTS:148-153)
  4. `[L1 Quick-Reference Card](quick-ref-l1.md#linux-quick-reference)` — One-page cheat sheet (forward-reference to Phase 59 SC#4 quick-ref-l1.md Linux H2 from D-23 below)

- **D-03:** **L2 sub-table: 4 rows** matching Phase 57 D-03 row count (NOT iOS-5; Linux has single lifecycle file like Android):
  1. `[Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md)` — Review the Linux enrollment pipeline before diagnosing
  2. `[Linux Log Collection Guide](l2-runbooks/24-linux-log-collection.md)` — Prerequisite for all Linux L2 investigations (3-method matrix: journalctl / file-based paths / package-state queries)
  3. `[Linux L2 Runbooks](l2-runbooks/00-index.md#linux-l2-runbooks)` — Investigation guides for log collection + agent investigation (runbooks 24-25; thin but reflects finite L2 surface)
  4. `[L2 Quick-Reference Card](quick-ref-l2.md#linux-quick-reference)` — One-page cheat sheet (forward-reference to Phase 59 SC#4 quick-ref-l2.md Linux H2 from D-24 below)

- **D-04:** **Admin Setup sub-table: 3 rows** matching Phase 57 D-04 single-overview-link discipline (per-file enumeration lives at admin-setup-linux/00-overview.md, NOT at hub level — symmetry with Phase 57 hub-nav-only contract):
  1. `[Linux Admin Setup Overview](admin-setup-linux/00-overview.md)` — Entry point for all Linux admin setup guides; per-file setup sequence (00-05) lives at this overview, not at hub level
  2. `[Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md)` — Review the enrollment pipeline before configuring Intune + intune-portal package (admin-context entry)
  3. `[Linux Capability Matrix](reference/linux-capability-matrix.md)` — Compare Linux feature parity vs Windows, macOS, iOS, Android — scannable 6-domain table (already incl. Conditional Access H2 per Phase 58 D-08 Windows column source)

- **D-05:** **Cross-Platform References sub-table update at docs/index.md:199-219** — append two entries paralleling Phase 57 D-05 pattern:
  - `[Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md)` — Ubuntu 22.04 / 24.04 LTS enrollment pipeline summary
  - `[Linux Capability Matrix](reference/linux-capability-matrix.md)` — Intune feature parity comparison across all 5 platforms
  Existing `_glossary-linux.md` reciprocal-glossary banner-link entry is ALREADY present from Phase 49 LIN-02 commit-2 (verified at `docs/_glossary-linux.md:10`) — Phase 59 does NOT re-add the banner.

- **D-06:** **End-user content (LIN-06 `linux-intune-portal-enrollment.md`) is NOT surfaced at hub level.** Phase 57 precedent verified: `docs/end-user-guides/android-work-profile-setup.md` exists yet was deliberately excluded from Phase 57 D-02..D-05 hub surfacing (admin-audience hub discipline). LIN-06 is already cross-linked from `admin-setup-linux/02-enrollment-profile.md` per REQUIREMENTS:148 — that admin-setup overview row in the Admin sub-table reaches it transitively. **Do NOT add a 4th Admin row for end-user-guides; Do NOT add a Cross-Platform References entry for LIN-06.**

### docs/index.md Operations H2 + ops/00-index.md amendment — verbatim "Operations" H2 + 4 compact sub-H3 + same-commit ops-index completion (Gray Area 2 — winner: 2C VERY HIGH, margin 13pts)

- **D-07:** **Net-new `## Operations` H2 inserted in `docs/index.md` AFTER the Linux H2 from D-01 and BEFORE Cross-Platform References (currently line 199).** Per Adversary-Referee adjudication (2A=13pts; 2B=50.5pts incl. naming + wide-table-N/A + PITFALL-7 violation; 2C=0pts STRONGEST; 2D=25pts incl. position ambiguity + DPO chain violation; Adversary 2x penalty applied for incorrect PITFALL-7-disproof on 2B-4 and incorrect process-defect rejection on 2D-1/2D-2). Reject 2A: 2A-1 CRIT 10pts (DEFER ops/00-index.md violates DPO-Phase56-01 hand-off chain — Phase 60 = harness finalization, Phase 61 = milestone close, NEITHER owns ops-index amendment, no phase exists to absorb deferral; verified at 56-VERIFICATION.md:192/229). Reject 2B: 2B-1 HIGH 10pts (naming violates SC#1 verbatim — "Operations H2 section" ≠ "Operational Depth" which is PROJECT.md:194 PILLAR-3 milestone-narrative term); 2B-3 HIGH 10pts (wide 5-platform-column table forces 4-of-5 N/A cells per Co-Management row — verified `co-management/00-overview.md:9-20` "macOS: No co-management equivalent" + iOS + Android callouts); 2B-4 HIGH 10pts (PITFALL-7 architectural intent applies to comparison-style cells regardless of doc location per Phase 58 D-17 referee verification — duplicates Phase 58 4-platform-capability-comparison.md role); 2B-6 MED 5pts (Phase 58 D-04 misapplied — D-04 is matrix doc retrofit, NOT hub edit). Reject 2D: 2D-1 HIGH 7pts (position "EARLIER" violates append-only H2-block contract per ROADMAP:379); 2D-3 CRIT 10pts (same DPO chain violation as 2A-1).

- **D-08:** **H2 name is exactly `## Operations`.** Verbatim match to ROADMAP.md:373 SC#1 ("Operations H2 section linking to docs/operations/ co-management, patch-management, app-lifecycle, drift-migration sub-directories"). DO NOT use "Operational Depth" — that token is the PROJECT.md:194 + REQUIREMENTS.md:38 + ROADMAP.md:11 PILLAR-3 milestone-narrative name and would violate SC#1 verbatim test (2B-1 rejection rationale).

- **D-09:** **4 sub-H3 compact substructure** (one per ops sub-domain, mirroring `operations/00-index.md` H2 layout):
  - `### Co-Management` (Windows-only — match `co-management/00-overview.md` Platform-Applicability scope)
  - `### Patch & Update Management` (4-platform: Windows + macOS + iOS + Android)
  - `### App Lifecycle Automation` (4-platform: Windows + macOS + iOS + Android)
  - `### Compliance Drift Detection + Tenant Migration` (4-platform: Windows + macOS + iOS + Android, with cross-platform tenant-migration runbook scope per Phase 56)
  Each sub-H3 contains: (a) 1-sentence framing summarizing the sub-domain, (b) markdown table with `Resource | Description` columns and 1-3 rows pointing to `operations/{sub-dir}/00-overview.md` plus any major routing endpoints (e.g., Windows Tenant Attach guide). Plan-author may compact-or-expand within bounded budget (3 rows max per sub-H3 to preserve hub-nav tier discipline).

- **D-10:** **`docs/operations/00-index.md` completion is MANDATORY same-commit per DPO-Phase56-01 hand-off chain.** Phase 59 fills out the 3 currently-empty sub-domain sections (Patch & Update Management, App Lifecycle Automation, Compliance Drift Detection + Tenant Migration) using existing Co-Management section (lines 14-25) as structural template:
  - Each new sub-section: H2 heading matching sub-dir name + 2-3 sentence framing matching cross-platform routing tone of sub-dir 00-overview blockquote + table with `Guide | Covers` columns + 1 row per file in the sub-dir
  - Patch sub-section: 5 rows (00-overview / 01-windows-wufb-rings / 02-macos-update-enforcement / 03-ios-update-lifecycle / 04-android-patch-delivery)
  - App sub-section: 5 rows (00-overview / 01-windows-win32-msix-scale / 02-macos-pkg-dmg-pipeline / 03-ios-vpp-licensing / 04-android-mgp-lifecycle)
  - Drift sub-section: 5 rows (00-overview / 01-windows-drift-detection / 02-macos-drift-detection / 03-ios-android-drift-detection / 04-tenant-migration-runbook)
  - 15 rows total added; structural mirror of Co-Management (4 rows already in place at lines 19-24)

- **D-11:** **Append-only H2-block contract.** New `## Linux Provisioning` H2 (D-01) and new `## Operations` H2 (D-07) appended to `docs/index.md` AFTER the existing Android H2 (currently lines 167-196), BEFORE the existing Cross-Platform References H2 (currently line 199). Linux H2 lands FIRST, then Operations H2. Existing Windows / macOS / iOS / Android H2s + sub-H3s + anchors UNCHANGED. Pre-edit anchor inventory MANDATORY per PITFALL-6 + Phase 57 D-32 inheritance — produce `59-ANCHOR-INVENTORY.md` capturing all `(index|common-issues|quick-ref-l1|quick-ref-l2|_glossary|_glossary-macos|_glossary-android|_glossary-linux|operations/00-index).md#` literals across `docs/` BEFORE any edit.

- **D-12:** **line-214 Cross-Platform References handling — no change required.** The existing entry `[Monitoring and Operations](reference/00-index.md#monitoring-and-operations)` at `docs/index.md:214` points to `reference/00-index.md`, NOT to `operations/`. No doc-tree overlap with the new `## Operations` H2 (which links to `operations/`). Phase 59 does NOT modify this line. Optional informational improvement: plan-author MAY add an additional Cross-Platform References row pointing to `operations/00-index.md` for symmetry — this is discretionary, not required.

- **D-13:** **No naming collision with line-85 `### Device Operations`.** GFM produces distinct anchors (`#operations` H2 vs `#device-operations` H3), distinct heading hierarchies (top-level H2 vs Windows-Autopilot-tier-2 H3), and non-overlapping topics (cross-platform operational depth vs Windows-only post-enrollment device actions like reset/retire/wipe). Adversary verified GFM anchor distinctness; no disambiguation banner planned.

### Glossary CLEAN-08 see-also normalization — top-N inline-in-blockquote, soft-contract extending existing pattern (Gray Area 3 — winner: 3E HIGH, margin 6.5pts)

- **D-14:** **CLEAN-08 see-also normalization adopts Option 3E (top-N collision terms; inline links INSIDE existing per-term blockquotes; soft-contract reciprocity).** Per Adversary-Referee adjudication (3A=13.5pts incl. 2x fab penalty against Adversary for "AST/markdown-link parsing" claim — verified false: every check-phase-NN.mjs uses `fs.readFileSync` + regex only; 3B=31pts CRIT prose-blockquote destruction; 3C=11pts SC#2-verbatim-violation + reader-workflow defect; 3D=40pts CRIT REQUIREMENTS:144 architectural reversal + 35-doc/81-anchor-ref blast radius + 7-of-11 Apple H3 dual-platform un-bisectable; 3E=4.5pts STRONGEST). Reject 3D: D-3D-1 CRIT 10pts (REQUIREMENTS:144 + Phase 49 D-17 explicit "iOS terminology lives inside `_glossary-macos.md`" architectural reversal); D-3D-2 CRIT 10pts (35 docs × 81 anchor refs blast radius — milestone-class refactor bigger than rest of Phase 59 combined); D-3D-3 HIGH 10pts (verified 7 of 11 Apple H3 entries inherently dual-platform: Account-Driven UE, ADE, Supervision, ABM, ABM Token, APNs, VPP). Reject 3B: D-3B-1 CRIT 10pts (destroys 23 Android + 11 macOS + 10 Linux prose blockquotes containing irreplaceable disambiguation prose — e.g., COBO line 90 "Mapping is partial — do not conflate", APNs line 70 "Critical cross-platform blast radius" callout); D-3B-2 HIGH 10pts (scope explosion 25-40 terms × 4 files = milestone-class taxonomy decision smuggled into Phase 59 cleanup). Reject 3C: D-3C-2 MED 5pts (single bottom-table is one entry, not "entries for cross-platform-equivalent terms" per SC#2 plural).

- **D-15:** **See-also line shape (LOCKED):** Append a single `>` line as the LAST line of existing per-term cross-platform blockquotes:
  ```
  > See also: [Term](other-glossary.md#anchor) (Other-Platform); [Term](third-glossary.md#anchor) (Third-Platform).
  ```
  Where the see-also line is the LAST `>`-prefixed line of the existing blockquote (preserves all prior prose). For terms WITHOUT an existing cross-platform blockquote, ADD a new `> **Cross-platform note:**` blockquote with 2 lines (note + see-also). Pattern alignment: all 4 glossaries normalize on `> **Cross-platform note:**` (currently used by Android 23 + Linux 10) for new see-also-bearing blockquotes; existing macOS `> **Windows equivalent:**` blockquotes (11 instances) are PRESERVED verbatim with see-also appended (do NOT rename to `> **Cross-platform note:**` — preserves Phase 23-24 mature prose).

- **D-16:** **Top-N collision-term selection criteria — locked at planning time.** Plan author writes the explicit collision matrix as an early CONTEXT-derived artifact before commit-1. Estimated ~10-18 collision terms across all 4 glossaries (sourced from): the 9 LIN-02 absent-concept terms identified in Phase 49 D-13 (Supervision, DPC, Work Profile, COBO/COPE/WPCO, MGP, ZTE, VPP, Hardware Hash, ABM); cross-platform encryption-compliance triple (BitLocker/FileVault/dm-crypt); cross-platform CA-channel (web-app-CA Linux ↔ MAM-WE iOS analog); enrollment-channel triple (Autopilot ↔ ADE ↔ ZTE); plus any additional terms surfaced during the v1.4 Cross-Platform Equivalences pattern (`linux-capability-matrix.md:71-93`).

- **D-17:** **Reciprocity contract is BIDIRECTIONAL and TRANSITIVELY COMPLETE.** If Term-X exists in glossaries A, B, and C, then A's entry must reference B and C; B must reference A and C; C must reference A and B. Validator (D-19) asserts this. No "primary/secondary" hierarchy. Bidirectional anchor-pair check covers full Cartesian product per locked collision-term matrix from D-16.

- **D-18:** **4-File vs 5-File framing — adopt 4-file equivalent.** Phase 59 operates on the 4 existing glossary files (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md`); SC#2 phrasing "all 5 platform glossaries (`_glossary-ios.md` or equivalent)" is satisfied by the EQUIVALENT branch — `_glossary-macos.md` IS the iOS glossary per Phase 49 D-17 + REQUIREMENTS.md:144 architectural decision. NO new `_glossary-ios.md` file (3D rejection). Plan author MAY update `_glossary-macos.md` H1 framing (currently "Apple Provisioning Glossary") to clarify "covers macOS + iOS terminology" — informational, not required.

- **D-19:** **Validator scope for see-also reciprocity (extends D-28 `check-phase-59.mjs`):** Three assertions per AUDIT-06:
  - **A1 — Reciprocity:** for each term in the locked collision matrix from D-16, every glossary listing the term MUST have a `> See also:` line within the same H3-bounded region pointing at the other glossaries that list the term (use line-position regex on the See also: line being preceded by another `>`-prefixed line within the H3 boundary)
  - **A2 — Anchor-correctness:** every see-also link target (`other-glossary.md#anchor`) MUST resolve to an existing H3 anchor in the target file (kebab-case slug)
  - **A3 — Blockquote integrity:** see-also line is APPENDED inside an existing `>` blockquote — no new top-level paragraphs created
  Lazy-add allowlist sidecar (`scripts/validation/v1.5-audit-allowlist.json` `c14_seealso_allowlist[]`) for any post-Phase-59 collision-matrix additions per Phase 49 D-23 precedent. **Phase 60 does NOT need to promote a separate see-also check** — Phase 59's own validator is the rescue path (AUDIT-06 each-phase-owns-its-own-validator architecture).

- **D-20:** **What's already-shipped from Phase 49 LIN-02 (DO NOT re-do):**
  - Top platform-coverage banner-link in all 4 glossaries (`_glossary.md:11`, `_glossary-macos.md:10`, `_glossary-android.md:12`, `_glossary-linux.md:10`) is COMPLETE 4-way reciprocal at the doc-level
  - Single-banner-line append pattern from Phase 42 AEAUDIT-03 is closed for the doc-level case
  - Phase 59's delta is ONLY the per-term see-also inline appends inside existing per-term blockquotes — banner work is DONE

### Linux quick-ref-l1.md + quick-ref-l2.md — pure Phase 57 mirror with NO Mode tags + Compliance Category Reference pointer table (Gray Area 4 — winner: 4A HIGH; Referee FLIPPED Finder's 4C choice based on D-22..D-25 PITFALL-7 reframing)

- **D-21:** **`docs/quick-ref-l1.md` Linux H2 ships with the four-part substructure (Top Checks / Linux Escalation Triggers / Linux Decision Tree / Linux Runbooks) and `docs/quick-ref-l2.md` Linux H2 ships with the four-part substructure (Linux Diagnostic Data Collection (3 methods) / Key Intune Portal Paths Linux L2 / Linux Compliance Category Reference / Linux Investigation Runbooks).** Per Adversary-Referee adjudication (4A=3pts WINNER; 4B=15pts incl. distro-tag-vacuous-axis defect; 4C=6pts SC#4 four-part-lock violation at L2; 4D=22pts L1 + L2 four-part-lock violations + LINCA disambiguation removal). **Referee FLIPPED Finder's 4C choice to 4A** based on Phase 57 D-22..D-25 PITFALL-7 reframing: a 3-row pointer table with name + 1-line meaning + cross-link to SSoT is the **canonically endorsed PITFALL-7-COMPLIANT pattern**, not a violation; Finder conflated "having a table" with "duplicating verdict meaning." Reject 4B: 4B-D1 MED 5pts (distro is L2 diagnostic axis not L1 Top-Checks-axis); 4B-D4 MED 5pts (no Apple precedent for OS-version tags — iOS quick-ref does not use `[iOS 17]`/`[iOS 18]` tags despite genuine version dimension). Reject 4C: 4C-D1 MED 5pts (3-sub-H3 L2 violates SC#4 verbatim "matching the structural depth of iOS/Android quick-ref sections" — both iOS L2 and Android L2 ship 4 sub-H3). Reject 4D: 4D-D1 HIGH 10pts (L1 four-part-lock violation by dropping Decision Tree); 4D-D2 MED 5pts (LINCA disambiguation diamond at `09-linux-triage.md:34` + pitfallCallout class line 50 routes the PITFALL-2 web-app-CA-only case — removing Decision Tree hides this).

- **D-22:** **L1 four-part substructure (LOCKED):** `## Linux Quick Reference` H2 in `docs/quick-ref-l1.md` ships with four sub-H3 slots:
  - `### Top Checks` — 4 checks (parity with macOS/iOS top-checks count, NOT Android's 5):
    1. Device in Intune? — Intune admin center > Devices > Linux — search by serial, check enrollment state
    2. Compliance state? — Devices > [device] > Device compliance — Compliant vs Non-compliant + non-compliant categories
    3. `intune-portal` package installed? — `dpkg -l intune-portal` returns `ii` status
    4. `intune-agent.timer` running? — `systemctl --user list-timers intune-agent.timer` shows recent activation
    NO `[Mode]` tags (Linux has no triage modes per `09-linux-triage.md:15` "no enrollment-mode pre-gate"; distro is L2 diagnostic axis, not L1 axis)
  - `### Linux Escalation Triggers` — 4-5 triggers covering enrollment / compliance / web-app CA / agent-service axes (each 1-line, NO Mode tags)
  - `### Linux Decision Tree` — single link to `decision-trees/09-linux-triage.md` (mirrors iOS pattern at `quick-ref-l1.md:138`)
  - `### Linux Runbooks` — 4-link list to L1 runbooks 30-33 with iOS-style ` -- ` disambiguation per row (mirrors quick-ref-l1.md:142-147 iOS pattern)

- **D-23:** **L2 four-part substructure (LOCKED):** `## Linux Quick Reference` H2 in `docs/quick-ref-l2.md` ships with four sub-H3 slots:
  - `### Linux Diagnostic Data Collection (3 methods)` — 3-row table (Method / Primary Tool / Who Triggers / Data Scope / L2 Access Path / Confidence) per `docs/l2-runbooks/24-linux-log-collection.md:30-36` Decision Matrix. 3 verbatim method names: `journalctl (systemd journal)`, `File-based paths`, `Package-state queries`. Pin in validator V-59-NN. NOTE: Linux's 3 methods are tool-tier separation NOT mode-fragmented like Android (which gates by BYOD pre/post-AMAPI vs COBO/Dedicated/ZTE) — single primary tool (journalctl) is the cleaner pattern.
  - `### Key Intune Portal Paths (Linux L2)` — 3-5 row table covering Devices > Linux | Devices > [device] > Device compliance | Devices > Device onboarding > Enrollment > Linux (limited surface) | Reports > Endpoint analytics (Linux subset). Plan-author selects 3-5 rows based on actual Intune admin center Linux surface depth.
  - `### Linux Compliance Category Reference` — **4-row pointer table** mirroring Android Play Integrity Verdict Reference shape per Phase 57 D-22..D-25 ENDORSEMENT (verified at `quick-ref-l2.md:261-271` — 3-row pointer table with cross-link is the ENDORSED PITFALL-7-COMPLIANT pattern, NOT a violation). Columns: Category | One-line role | Cross-link to SSoT. 4 rows (matching SSoT category count per REQUIREMENTS.md:27 LIN-04 + `admin-setup-linux/03-compliance-policy.md:9` frontmatter — both authoritatively state "4 supported settings-catalog categories"):
    1. `Allowed Distributions` | One-line role | `../admin-setup-linux/03-compliance-policy.md#step-2-allowed-distributions`
    2. `Custom Compliance` | One-line role | `../admin-setup-linux/03-compliance-policy.md#step-3-custom-compliance`
    3. `Device Encryption` | One-line role | `../admin-setup-linux/03-compliance-policy.md#step-4-device-encryption`
    4. `Password Policy` | One-line role | `../admin-setup-linux/03-compliance-policy.md#step-5-password-policy`
    (Plan-author verifies exact anchor slugs at plan-time — kebab-case GFM rules.)
  - `### Linux Investigation Runbooks` — 2-link list to L2 runbooks 24, 25 with iOS-style ` -- ` disambiguation per row. Structurally thin (2 vs Android 6 vs iOS 4 vs macOS 4) — accepted unavoidable per finite Linux L2 surface.

- **D-24:** **PITFALL-7 firewall scope for Linux SSoT files (LOCKED):**
  - Linux Compliance Category Reference table cells contain ONLY: category name + 1-line role + cross-link to SSoT anchor. NO category-configuration content. NO Bash discovery script syntax (lives at SSoT). NO compliance-evaluation-cadence content.
  - Pointer-table with cross-link IS the **endorsed** PITFALL-7-compliant shape per Phase 57 D-22..D-25 — NOT a PITFALL-7 violation.
  - Equivalent firewall applies to any L1/L2 cross-references into `admin-setup-linux/05-conditional-access.md` (web-app CA SSoT — pointer-only references; PITFALL-2 web-app-CA-only architecture content owned by SSoT).

- **D-25:** **Mode-tag-free contract.** Linux quick-ref does NOT use bracket-style `[Mode]` prefixes (in contrast to Android's `[BYOD]`/`[ZTE]`/`[AOSP]`/`[Knox]`/`[All GMS]` from Phase 57 D-14). Closest cross-platform precedent for non-mode platforms = no axis-prefix tags (verified iOS at `quick-ref-l1.md:117-148` — no `[iOS 17]`/`[supervised]`/`[BYOD]` tags despite genuine version + supervision + ADE-vs-MAM dimensions). 4B distro-tag substitution rejected per 4B-D1 (distro is L2 diagnostic field not L1 axis).

### Validator scope + commit atomicity + frontmatter contract

- **D-26:** **`check-phase-59.mjs` validator scope = LARGE-FULL** per Phase 48 D-25 + Phase 49-58 D-NN file-reads-only / no-shared-module / regex-based pattern lineage. Larger than Phase 57's 26 V-NN because Phase 59 has 4 distinct GAs plus ops/00-index.md amendment + glossary reciprocity validator. Estimated **30-36 V-59-NN structural assertions:**
  - **V-59-01..06 File existence:** 6 hub-and-glossary files (`docs/index.md`, `docs/operations/00-index.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, `docs/_glossary-android.md`, `docs/_glossary-linux.md`) — all exist before AND after Phase 59 (regression-prevention)
  - **V-59-07 docs/index.md Linux H2 expansion (D-01/D-02/D-03/D-04):** `## Linux Provisioning` H2 + 3 sub-H3 (`### Service Desk (L1)` + `### Desktop Engineering (L2)` + `### Admin Setup`) within H2 body scope; row counts L1=4 / L2=4 / Admin=3
  - **V-59-08 docs/index.md Cross-Platform References Linux entries (D-05):** lines 199-219 contain `Linux Provisioning Lifecycle` AND `Linux Capability Matrix` link entries
  - **V-59-09 NEGATIVE — Linux end-user-guide NOT surfaced (D-06):** `docs/index.md` does NOT contain link to `linux-intune-portal-enrollment.md` or any `end-user-guides/linux*` literal
  - **V-59-10 docs/index.md Operations H2 (D-07/D-08):** `## Operations` H2 present; appended after Linux H2 (which is appended after Android H2 — H2 ordering: ... Android → Linux → Operations → Cross-Platform References)
  - **V-59-11 docs/index.md Operations H2 4 sub-H3 anchors (D-09):** `### Co-Management` + `### Patch & Update Management` + `### App Lifecycle Automation` + `### Compliance Drift Detection + Tenant Migration` (or equivalent kebab-case slugs verified at plan-time)
  - **V-59-12 NEGATIVE — Operations naming (D-08):** `docs/index.md` does NOT contain `Operational Depth` as H2 or H3 token
  - **V-59-13 ops/00-index.md 4 H2 sections (D-10):** `docs/operations/00-index.md` contains 4 H2 headings (`## Co-Management` + `## Patch & Update Management` + `## App Lifecycle Automation` + `## Compliance Drift Detection + Tenant Migration` or equivalent); each H2 followed by table with Guide | Covers columns
  - **V-59-14 ops/00-index.md row counts:** Patch=5 rows, App=5 rows, Drift=5 rows under each new sub-section (Co-Management retains existing 4 rows)
  - **V-59-15..18 NEGATIVE — Operations sub-H3 cells contain hyperlinks (D-09 PITFALL-7 link-not-copy):** every cell in the 4 sub-tables under Operations H2 contains a markdown link
  - **V-59-19 NEGATIVE — Operations sub-table rows do NOT verbatim-paste sub-dir blockquote text:** soft regex sniff for the literal `"No co-management equivalent"` and `"cross-platform"` blockquote tokens within Operations H2 body (PITFALL-7 human-review prep)
  - **V-59-20..23 Glossary see-also reciprocity (D-19):** for each term in locked collision matrix from D-16, every glossary listing the term has a `> See also:` line within H3-bounded region; bidirectional anchor-pair check; A1 + A2 + A3 per D-19
  - **V-59-24 NEGATIVE — glossary blockquote integrity (D-19 A3):** see-also lines are appended inside existing `>` blockquotes (preceded by another `>`-prefixed line within H3 region)
  - **V-59-25 quick-ref-l1.md Linux H2 + 4 sub-H3 anchor pins (D-22):** `## Linux Quick Reference` H2 + `### Top Checks` + `### Linux Escalation Triggers` + `### Linux Decision Tree` + `### Linux Runbooks` all present within H2 scope; appended after Android Quick Reference H2 (Android H2 anchor stability)
  - **V-59-26 NEGATIVE — quick-ref-l1.md Linux H2 NO Mode tags (D-25):** Linux H2 body does NOT contain `[BYOD]`, `[ZTE]`, `[AOSP]`, `[Knox]`, `[All GMS]`, `[22.04]`, `[24.04]` literals
  - **V-59-27 quick-ref-l1.md Linux Decision Tree single link (D-22):** Linux Decision Tree H3 contains exactly one `decision-trees/09-linux-triage.md` link
  - **V-59-28 quick-ref-l2.md Linux H2 + 4 sub-H3 anchor pins (D-23):** `## Linux Quick Reference` H2 + `### Linux Diagnostic Data Collection (3 methods)` + `### Key Intune Portal Paths (Linux L2)` + `### Linux Compliance Category Reference` + `### Linux Investigation Runbooks` all present
  - **V-59-29 quick-ref-l2.md 3-method literal coverage (D-23):** 3-method H3 body contains `journalctl` AND `File-based` (or `dpkg`) AND `Package-state` (or equivalent) literals
  - **V-59-30 quick-ref-l2.md Linux Compliance Category Reference 4 category literals + 4 cross-links (D-23):** `Allowed Distributions` + `Custom Compliance` + `Device Encryption` + `Password Policy` literals AND 4 cross-link references to `admin-setup-linux/03-compliance-policy.md` anchors
  - **V-59-31 NEGATIVE — quick-ref-l2.md PITFALL-7 firewall (D-24):** Linux Compliance Category Reference H3 body does NOT contain Bash script syntax (no `if`/`then`/`fi`/`exit 0`/`#!/bin/bash` tokens), no `compliance-evaluation-cadence` literal, no per-OS-version distro-version-table content
  - **V-59-32 iOS/macOS/Windows/Android H2 anchor stability NEGATIVE regression-guard:** all existing H2 anchors in 4 hub files unchanged (Android `## Android Enterprise Provisioning`, iOS `## iOS/iPadOS Provisioning`, macOS `## macOS Provisioning`, Windows `## Windows Autopilot` — all pre-Phase-59 anchors byte-identical)
  - **V-59-33..36 TBD/TODO/PLACEHOLDER scan** (per V-53-25 + V-54-30 + V-55-30 + V-56-32 + V-57-26 + V-58-NN inheritance): none of the 6 hub-and-glossary-and-ops-index files contain literal `TBD`, `TODO`, `FIXME`, `XXX`, `PLACEHOLDER` outside Version History tables AFTER Phase 59 edits

- **D-27:** **`check-phase-59.mjs` implementation pattern matches `check-phase-58.mjs` / `check-phase-57.mjs` / `check-phase-56.mjs` / ... / `check-phase-49.mjs`** (Phase 48 D-25 lineage). File-reads-only / no-shared-module; markdown parsing is regex-based; no AST, no glob across multiple file types within one assertion. Adversary's "AST/markdown-link parsing" claim was REJECTED with 2x fab penalty during GA-3 adjudication — codebase practice is regex-only.

- **D-28:** **Commit atomicity = PROGRESSIVE-LANDING per Phase 57 DPO-Phase57-06 + Phase 58 D-16 inheritance.** Plan-series-level atomicity acceptable; per-plan commits OK. Suggested plan-level decomposition (8-10 plans):
  - **59-01:** Pre-edit anchor inventory artifact (`59-ANCHOR-INVENTORY.md` per D-11 + PITFALL-6 mandate)
  - **59-02:** `docs/index.md` Linux H2 expansion (D-01..D-06 — 3 sub-tables + Cross-Platform References Linux entries)
  - **59-03:** `docs/operations/00-index.md` completion (D-10 — Patch + App + Drift sections added)
  - **59-04:** `docs/index.md` Operations H2 (D-07..D-13 — 4 sub-H3 + sub-tables; depends on 59-03 ops-index completion)
  - **59-05:** Glossary CLEAN-08 per-term see-also normalization across 4 glossaries (D-14..D-20 — locked collision matrix appended inline)
  - **59-06:** `docs/quick-ref-l1.md` Linux H2 (D-21..D-22 — 4 sub-H3 + 4 Top Checks + escalation triggers + decision tree link + 4-row Runbooks list)
  - **59-07:** `docs/quick-ref-l2.md` Linux H2 (D-23..D-25 — 4 sub-H3 + 3-method log-collection table + Intune portal paths + 4-row Compliance Category Reference pointer table + 2-row Investigation Runbooks list)
  - **59-08:** `scripts/validation/check-phase-59.mjs` (D-26..D-27 V-59-01..36 structural assertions)
  - **59-09:** Pre-commit gate (D-29) + 60-day frontmatter refresh on touched hub files + VERIFICATION.md authored (separate commit per close pattern)

- **D-29:** **Pre-commit gate (3 validators + 4 file-level checks):**
  1. `node scripts/validation/check-phase-59.mjs` exits 0 (all 30-36 V-59-NN checks pass)
  2. `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0 (C1-C12 PASS; C13 informational PASS-or-noise within accepted tolerance per Phase 48 D-08)
  3. `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 (regression-prevention; Phase 59 hub files are not in supervision sidecar — verify at plan-time)
  4. `markdown-link-check` against the 6 hub-and-glossary-and-ops-index files (informational; not blocking per Phase 48 D-08; primary purpose is anchor-resolution verification for forward-references between hub files)
  5. **Mandatory pre-edit anchor inventory per PITFALL-6 + Phase 57 D-32 inheritance**: `grep -rn "(index|operations/00-index|quick-ref-l1|quick-ref-l2|_glossary|_glossary-macos|_glossary-android|_glossary-linux).md#" docs/` BEFORE any edit; capture as `59-ANCHOR-INVENTORY.md` artifact in phase directory; cross-check post-edit anchor stability. Append-only contract enforced by post-edit re-grep + diff against pre-edit baseline.
  6. Verify all 6 hub-and-glossary-and-ops-index files have updated `last_verified` frontmatter (60-day cycle per Phase 34 D-14 universal rule). Phase 59 atomic commit date determines new `last_verified` literal.
  7. Verify all 4 hub files (docs/index.md, quick-ref-l1.md, quick-ref-l2.md, operations/00-index.md) contain `Linux` literal in updated content (sanity post-edit).

- **D-30:** **Hardcoded H2/H3 anchor strings + literal-token regexes pinned in BOTH the validator (`check-phase-59.mjs`) and CONTEXT.md.** Brittleness trade-off accepted per Phase 49-58 D-NN precedent. Renaming any pinned H2/H3, sub-table column, ops sub-domain literal, Compliance Category literal, Linux SSoT cross-link path, or 3-method log-collection method literal requires same-commit validator update.

### Claude's Discretion

- Specific phrasing of the 1-sentence sub-H3 framings under Operations H2 (D-09) — keep tone matching existing `Device Operations` H3 at `docs/index.md:85-92`
- Specific row counts in Operations sub-tables (D-09) — bounded 1-3 rows per sub-H3 to preserve hub-nav tier discipline
- Selection of which 1-2 rows per Operations sub-H3 link to per-platform deep guides vs only sub-dir overview
- Order of plans within Phase 59 — D-28 8-9 plan decomposition is a recommendation; plan-author may interleave or fold parallel waves as long as 59-04 (Operations H2) follows 59-03 (ops-index completion) and 59-08 (validator) follows all content plans
- Specific phrasing of 1-line "role" descriptions in Linux Compliance Category Reference (D-23) — keep concise (single sentence per category)
- Selection of which Intune admin center portal paths to include in Key Intune Portal Paths (Linux L2) sub-H3 (D-23 second slot — 3-5 rows) — plan-author derives from Linux Intune admin center actual surface depth at plan-time
- Whether to update `_glossary-macos.md` H1 framing from "Apple Provisioning Glossary" to "Apple Provisioning Glossary (covers macOS + iOS terminology)" per D-18 informational improvement — discretionary, not required
- Whether to add an additional Cross-Platform References row pointing to `operations/00-index.md` per D-12 informational improvement — discretionary, not required

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 59 scope + traceability

- `.planning/ROADMAP.md` — search for `### Phase 59:` (Phase 59 entry: Goal, Depends, Success Criteria SC#1-4, Methodology notes lines 378-381 mandating "same sub-table structure as Android H2 from Phase 57" + "Pre-edit anchor inventory mandatory")
- `.planning/ROADMAP.md` lines 484, 493 — shared-write hotspot table (docs/index.md Linux H2 + Operations H2 → Phase 59; ops/00-index.md ownership chain)
- `.planning/REQUIREMENTS.md` — `CLEAN-08` (line 20: glossary cross-reference normalization across all 5 platform glossaries); line 29 (LIN-06 audience = end user); line 144 (architectural decision "iOS terminology lives inside `_glossary-macos.md`"); line 27 (LIN-04 "4 supported settings-catalog categories" — authoritative count for Linux Compliance Category Reference per D-23)
- `.planning/STATE.md` — current milestone v1.5 progress (97% complete; Phase 58 closed)
- `.planning/PROJECT.md` line 194 — PILLAR-3 milestone narrative name "Operational depth" (DO NOT use as H2 token per D-08)

### Existing hub + glossary files (Phase 59 edit targets)

- `docs/index.md` — full file (234 lines); H2 ordering (Windows lines 26 / macOS line 96 / iOS line 131 / Android line 167 / Cross-Platform References line 199); existing `### Device Operations` H3 at line 85 (Windows-Autopilot-only post-enrollment device actions — NO collision with new `## Operations` H2 per D-13 GFM-anchor-distinctness ruling); existing `Monitoring and Operations` Cross-Platform References row at line 214 (points to `reference/00-index.md`, NOT `operations/` — D-12 no-change-required)
- `docs/operations/00-index.md` — currently 25 lines (only Co-Management section filled); D-10 amendment target (Patch + App + Drift sections added same-commit)
- `docs/quick-ref-l1.md` — full file (192 lines); Phase 57 Android H2 lines 149-184 = template for D-22 Linux L1 H2; iOS H2 lines 117-148 = also-precedent (4-sub-H3 no-Mode-tag pattern for Linux per D-25)
- `docs/quick-ref-l2.md` — full file (292 lines); Phase 57 Android H2 lines 233-280 = template for D-23 Linux L2 H2; Android Play Integrity Verdict Reference lines 261-271 = ENDORSED PITFALL-7-COMPLIANT pointer-table pattern that Linux Compliance Category Reference D-23 mirrors
- `docs/_glossary.md` (Windows) — 38 H3 entries; 0 cross-platform `>` blockquotes today; D-15 ADD new `> **Cross-platform note:**` blockquotes for collision-matrix terms (pattern alignment normalization)
- `docs/_glossary-macos.md` (Apple — covers macOS + iOS) — 11 H3 entries; 11 `> **Windows equivalent:**` blockquotes; PRESERVED verbatim per D-15 (do NOT rename); see-also lines APPENDED inside existing blockquotes
- `docs/_glossary-android.md` — 24 H3 entries; 23 `> **Cross-platform note:**` blockquotes; D-15 see-also lines appended inside existing blockquotes
- `docs/_glossary-linux.md` — 30 H3 entries; 10 `> **Cross-platform note:**` blockquotes; 0 structured `**See also:**` entries today; D-15 see-also lines appended

### Existing operations + Linux content (Phase 59 link targets — NOT modified)

- `docs/operations/co-management/00-overview.md` — Phase 53 deliverable; "no equivalent" callouts for macOS/iOS/Android at lines 9-20 (Windows-only domain — informs D-09 Co-Management sub-H3 1-sentence framing)
- `docs/operations/{patch-management,app-lifecycle,drift-migration}/00-overview.md` — Phase 54/55/56 deliverables; each is a fully-built cross-platform comparison hub with `platform: cross-platform` frontmatter + Cross-Platform Comparison table; informs D-09 sub-H3 framings + D-10 ops-index sub-section framings
- `docs/operations/co-management/{01-windows-tenant-attach,02-windows-workload-sliders,03-cocmgmt-migration-paths}.md` — Co-Management sub-files (4 total)
- `docs/operations/patch-management/{01-windows-wufb-rings,02-macos-update-enforcement,03-ios-update-lifecycle,04-android-patch-delivery}.md` — Patch sub-files (5 total inc. 00-overview)
- `docs/operations/app-lifecycle/{01-windows-win32-msix-scale,02-macos-pkg-dmg-pipeline,03-ios-vpp-licensing,04-android-mgp-lifecycle}.md` — App-Lifecycle sub-files (5 total inc. 00-overview)
- `docs/operations/drift-migration/{01-windows-drift-detection,02-macos-drift-detection,03-ios-android-drift-detection,04-tenant-migration-runbook}.md` — Drift sub-files (5 total inc. 00-overview)
- `docs/admin-setup-linux/00-overview.md` — Phase 50 deliverable; D-04 Admin sub-table row 1 link target
- `docs/admin-setup-linux/01-intune-linux-agent.md` through `05-conditional-access.md` — Phase 50 deliverables; per-file enumeration lives at 00-overview, NOT at hub level (D-04 single-overview-link discipline)
- `docs/admin-setup-linux/03-compliance-policy.md` — SSoT for D-23 Linux Compliance Category Reference 4-row pointer table; Steps 2-5 = 4 categories (Allowed Distributions / Custom Compliance / Device Encryption / Password Policy) per REQUIREMENTS:27 LIN-04 + frontmatter line 9 authoritative count; PITFALL-7 firewall scope per D-24
- `docs/admin-setup-linux/05-conditional-access.md` — SSoT for web-app CA content (PITFALL-2 architecture); PITFALL-7 firewall per D-24 (pointer-only references from quick-ref)
- `docs/linux-lifecycle/00-enrollment-overview.md` — Phase 49 deliverable; D-02 / D-03 / D-04 sub-table link target
- `docs/linux-lifecycle/01-linux-prerequisites.md` — Phase 49 deliverable
- `docs/decision-trees/09-linux-triage.md` — Phase 51 deliverable; D-02 sub-table link target; line 34 LINCA disambiguation diamond + line 50 pitfallCallout class (PITFALL-2 web-app-CA-only routing — informs D-21 D-22 Decision Tree sub-H3 inclusion)
- `docs/l1-runbooks/30-linux-enrollment-failed.md` through `33-linux-agent-service-failure.md` — Phase 51 deliverables; D-22 Linux Runbooks sub-H3 4-link list targets
- `docs/l2-runbooks/24-linux-log-collection.md` — Phase 52 deliverable; D-23 Linux Diagnostic Data Collection (3 methods) source (Decision Matrix at lines 30-36; 3 methods: journalctl / file-based / package-state)
- `docs/l2-runbooks/25-linux-agent-investigation.md` — Phase 52 deliverable; D-23 Linux Investigation Runbooks sub-H3 link target
- `docs/end-user-guides/linux-intune-portal-enrollment.md` — Phase 50 LIN-06 deliverable; NOT surfaced at hub level per D-06 (Phase 57 precedent symmetry)
- `docs/end-user-guides/android-work-profile-setup.md` — Phase 40 deliverable; existence verified during GA-1 Finder; basis for 1B's "ONLY platform" rationale rejection (D-01 2x fab penalty)
- `docs/reference/linux-capability-matrix.md` — Phase 50 deliverable; D-04 Admin sub-table row 3 link target; D-05 Cross-Platform References entry; already includes Conditional Access H2 per Phase 58 D-08 Windows column source

### Pattern inheritance (precedent decisions to cite correctly)

- `.planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md` §D-01 through D-05 — Phase 57 Android H2 sub-table template (3 sub-tables L1=4 / L2=4 / Admin=3); D-01 mandate "pure iOS mirror per GA-1 winner 1A — no operations cross-references (Phase 59 owns operations-hub-nav per ROADMAP:354)" — directly informs D-01..D-06 Linux H2 mirror discipline
- `.planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md` §D-13 + D-22 — four-part lock for Android quick-ref (4 sub-H3 in L1, 4 sub-H3 in L2); D-22..D-25 ENDORSED pointer-table-with-cross-link pattern (Android Play Integrity Verdict Reference 3-row at quick-ref-l2.md:261-271 — basis for D-21..D-23 + Referee FLIP from 4C to 4A)
- `.planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md` §D-31 — single atomic commit per Phase 51-56 lineage (Phase 59 D-28 progressive-landing per Phase 58 D-16 inheritance)
- `.planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md` §D-32 — pre-edit anchor inventory artifact mandatory before docs/index.md edit (PITFALL-6); 59-ANCHOR-INVENTORY.md per D-11
- `.planning/phases/58-defer-08-4-platform-capability-comparison/58-CONTEXT.md` §D-15 — pre-edit anchor inventory artifact format inheritance
- `.planning/phases/58-defer-08-4-platform-capability-comparison/58-CONTEXT.md` §D-16 — atomic-commit interpretation = plan-series level (Phase 59 D-28 progressive-landing inheritance)
- `.planning/phases/58-defer-08-4-platform-capability-comparison/58-CONTEXT.md` §D-17 — C12 PITFALL-7 referee verification ("link-not-copy is human-review enforced for comparison-style cells regardless of doc location") — basis for D-13 / D-19 PITFALL-7 firewall framing AND for GA-2 2B-4 PITFALL-7 violation upholding
- `.planning/phases/56-drift-detection-tenant-migration/56-VERIFICATION.md` lines 192, 229 — DPO-Phase56-01 hand-off chain "Phase 59 owns hub integration" / "Phase 59 amends [ops/00-index.md]" — basis for D-10 ops-index amendment same-commit MANDATORY ruling + 2A-1/2D-3 CRIT defect upholding
- `.planning/phases/49-linux-foundation-taxonomy-glossary-version-matrix/49-CONTEXT.md` §D-13 + D-17 — 9 LIN-02 absent-concept terms (collision-matrix seed for D-16); REQUIREMENTS:144 architectural-decision lock ("iOS terminology lives inside `_glossary-macos.md`") referenced at D-18
- `.planning/phases/42-android-integration-cleanup-and-audit/42-04-PLAN.md` lines 30-43 — Phase 42 AEAUDIT-03 v1.4 macOS↔Android pattern verified as SINGLE banner-link from macOS to Android (basis for D-20 already-shipped framing)

### Pitfalls + methodology

- `.planning/REQUIREMENTS.md` §PITFALL-7 — link-not-copy whitelist-first pattern (hard architectural rule); applied to Linux Compliance Category Reference D-23 + Operations H2 D-09 sub-table cells per D-19/D-24
- `.planning/REQUIREMENTS.md` §PITFALL-6 — pre-edit anchor inventory grounding (D-11 / D-29)
- `.planning/REQUIREMENTS.md` §PITFALL-2 — web-app CA only on Linux (informs D-22 Linux Decision Tree sub-H3 inclusion + D-24 PITFALL-7 firewall scope for admin-setup-linux/05-conditional-access.md)
- `.planning/REQUIREMENTS.md` §AUDIT-06 — validator-as-deliverable mandate (D-26 / D-27 / D-29)

### Validator implementation

- `scripts/validation/check-phase-57.mjs` — Phase 57 validator template (line 109 hardcodes `["### Admin Setup", 3]` per-phase Android-scoped — basis for F-1B-04 false-positive ruling); 26 V-57-NN structural assertions
- `scripts/validation/check-phase-58.mjs` — Phase 58 validator template (24-28 V-58-NN; col-0 cell-shape exclusion fix per Phase 58 plan-58-05 deviation — informs D-26 cell-shape regex design)
- `scripts/validation/check-phase-49.mjs` — Phase 49 validator template (regex H3-extraction + line-immediately-following-pattern matching — referenced for D-19 see-also reciprocity validator design; verified codebase practice = `fs.readFileSync` + regex only, no markdown AST)
- `scripts/validation/v1.5-milestone-audit.mjs` — Phase 59 will be C13 broken-link target (Phase 60 promotion); current C12 in blocking mode per Phase 58 close
- `scripts/validation/regenerate-supervision-pins.mjs` — Phase 59 verify-no-impact (hub files not in supervision sidecar)
- `scripts/validation/v1.5-audit-allowlist.json` — Phase 59 may add `c14_seealso_allowlist[]` per D-19 lazy-add sidecar pattern (Phase 49 D-23 precedent)

### Downstream consumers (Phases 60-61)

- ROADMAP §`### Phase 60` — Audit Harness v1.5 Finalization; registers `check-phase-59.mjs` in CI; runs C13 broken-link automation against Phase 59's hub-nav cross-link surface; promotes C11 ops-domain anti-patterns to blocking
- ROADMAP §`### Phase 61` — Gap Closure + Terminal Re-Audit + Milestone Close; runs full `v1.5-milestone-audit.mjs` against post-Phase-59 state; produces `v1.5-MILESTONE-AUDIT.md` close artifact

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **Phase 57 Android H2 sub-table template** (`docs/index.md:167-196`) — directly applied to Linux H2 per D-01..D-04 and Operations H2 sub-H3 framings per D-09 (1-sentence framing + Resource | Description table pattern)
- **Phase 57 Android quick-ref-l1 H2 template** (`docs/quick-ref-l1.md:149-183`) — applied to Linux quick-ref-l1 H2 per D-22 four-part substructure (with Mode-tag-free contract per D-25)
- **Phase 57 Android quick-ref-l2 H2 template** (`docs/quick-ref-l2.md:233-280`) — applied to Linux quick-ref-l2 H2 per D-23 four-part substructure (with Compliance Category Reference replacing Play Integrity Verdict Reference per ENDORSED pointer-table pattern per D-22..D-25)
- **Android Play Integrity Verdict Reference** (`docs/quick-ref-l2.md:261-271`) — ENDORSED PITFALL-7-COMPLIANT 3-row pointer table shape; direct template for D-23 Linux Compliance Category Reference 4-row pointer table (Verdict|One-line meaning|Cross-link → Category|One-line role|Cross-link)
- **iOS quick-ref-l1.md** (`docs/quick-ref-l1.md:117-148`) — non-mode platform precedent (no `[Mode]` tags despite genuine version + supervision + ADE-vs-MAM dimensions); basis for D-25 Mode-tag-free contract
- **operations/00-index.md Co-Management section** (lines 14-25) — direct template for D-10 ops-index amendment (Patch + App + Drift sections added per identical structural pattern: H2 + 2-3 sentence framing + Guide | Covers table)
- **`linux-capability-matrix.md`** — 6-domain table including Conditional Access H2 per Phase 58 D-08 Windows column source; D-04 Admin sub-table row 3 link target + D-05 Cross-Platform References entry
- **Phase 49 LIN-02 banner-link 4-way reciprocity** (already shipped in HEAD: `_glossary.md:11`, `_glossary-macos.md:10`, `_glossary-android.md:12`, `_glossary-linux.md:10`) — Phase 59 does NOT re-do banner work per D-20; per-term see-also is the delta
- **`scripts/validation/check-phase-57.mjs` line 109** (`["### Admin Setup", 3]`) — per-phase validator pattern (each Phase 49-58 has own check-phase-NN.mjs with phase-scoped row-count assertions); D-26 inherits this pattern (no shared cross-phase row-count coupling)
- **Phase 58 cell-shape regex** (extractCanonicalDataCells() col-0 exclusion fix from Plan 58-05) — pattern for D-26 V-59-NN cell-content assertions

### Established Patterns

- **Append-only H2-block contract on shared write hotspots** (Phase 57 D-31 + Phase 58 D-15) — Linux H2 + Operations H2 appended after Android H2; pre-edit anchor inventory mandatory per PITFALL-6
- **Pre-edit anchor inventory artifact** (`{padded_phase}-ANCHOR-INVENTORY.md`) — Phase 57 D-32 + Phase 58 D-15 inheritance; D-11 + D-29 mandate `59-ANCHOR-INVENTORY.md`
- **Validator-as-deliverable in same plan-series** (Phase 50 50-05-PLAN.md, Phase 51-58 sibling pattern, AUDIT-06) — D-26 + D-28 inheritance
- **Atomic-commit interpretation = plan-series level** (Phase 57 DPO-Phase57-06, Phase 58 D-16) — D-28 progressive-landing acceptable
- **Hardcoded H2/H3 anchor pins in validator + CONTEXT.md** (Phase 49-58 D-NN precedent) — D-30 brittleness trade-off accepted
- **60-day `last_verified` cycle for hub files** (Phase 34 D-14 universal rule) — D-29 step 6
- **PITFALL-7 firewall pattern with single inline pointer to SSoT** (Phase 57 D-25 + Phase 58 D-17 referee verification) — D-24 Linux SSoT firewall scope
- **Per-phase validator architecture (`check-phase-NN.mjs`)** — each phase ships own validator; no shared cross-phase row-count coupling (Adversary's F-1B-04 disproof verified at check-phase-57.mjs:109)
- **GFM kebab-case anchor distinctness** (`## Operations` → `#operations`; `### Device Operations` → `#device-operations`) — D-13 no-collision ruling; basis for V-59-NN anchor pin design
- **Verdict word + markdown link cell shape** (Phase 58 D-01) — applied to Operations sub-H3 cells per D-09 + D-19 PITFALL-7 link-not-copy

### Integration Points

- **`docs/index.md`** — Phase 59 modifies (Linux H2 + Operations H2 appended; Cross-Platform References Linux entries added); does NOT modify line 85 Device Operations + line 214 Monitoring and Operations + Phase 57 Android H2 + Phase 32 iOS H2 + earlier macOS/Windows H2s
- **`docs/operations/00-index.md`** — Phase 59 modifies (3 missing sub-domain sections added: Patch + App + Drift mirroring existing Co-Management section structure)
- **`docs/quick-ref-l1.md`** — Phase 59 modifies (NEW Linux H2 appended after Android H2)
- **`docs/quick-ref-l2.md`** — Phase 59 modifies (NEW Linux H2 appended after Android H2)
- **`docs/_glossary.md`** — Phase 59 modifies (NEW `> **Cross-platform note:**` blockquotes added for collision-matrix terms; pattern alignment normalization)
- **`docs/_glossary-macos.md`** — Phase 59 modifies (see-also lines APPENDED inside existing 11 `> **Windows equivalent:**` blockquotes; existing prose PRESERVED verbatim)
- **`docs/_glossary-android.md`** — Phase 59 modifies (see-also lines APPENDED inside existing 23 `> **Cross-platform note:**` blockquotes)
- **`docs/_glossary-linux.md`** — Phase 59 modifies (see-also lines APPENDED inside existing 10 `> **Cross-platform note:**` blockquotes)
- **`scripts/validation/check-phase-59.mjs`** — NEW file per D-26
- **`scripts/validation/v1.5-milestone-audit.mjs`** — Phase 59 may have C13 broken-link informational impact (Phase 60 promotion target)
- **`scripts/validation/v1.5-audit-allowlist.json`** — Phase 59 may add `c14_seealso_allowlist[]` per D-19 lazy-add sidecar pattern
- **NO modifications to**: docs/operations/{co-management,patch-management,app-lifecycle,drift-migration}/* (link targets only); docs/admin-setup-linux/* (link targets only); docs/linux-lifecycle/* (link targets only); docs/decision-trees/09-linux-triage.md (link target only); docs/l1-runbooks/30-33 (link targets only); docs/l2-runbooks/24-25 (link targets only); docs/end-user-guides/* (NOT surfaced per D-06); docs/reference/linux-capability-matrix.md (link target only); docs/common-issues.md (Phase 57 closed; Phase 59 does NOT re-touch — Linux content NOT added to common-issues.md)

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review delegation:** Per user instruction, all 4 gray areas were adjudicated via 12-agent Finder → Adversary → Referee scored adversarial-review pattern (3 parallel waves of 4 agents each). Each decision (D-01 through D-30) is grounded in cited file evidence. Adversary's net score: ~+30 of +90 possible (12 substantive wins on PITFALL-7 reframing in GA-4 (4A-D1 flip), validator-architecture rebuttal in GA-1 (F-1B-04), category-mismatch rebuttals across multiple GAs). Three 2x penalty triggers: one against 1B "ONLY platform" claim (Finder-side fabrication caught — Android end-user guide exists), one against Adversary GA-2 PITFALL-7 + position-defect rejections (Adversary-side ruling-error), one against Adversary GA-3 AST-parsing claim (Adversary-side fabrication caught — codebase uses regex only). User explicitly delegated the decision-routing to the adversarial process — recommendations are locked and downstream agents (researcher, planner, executor) consume directly.
- **Recommended literal for Operations H2 sub-H3 framings (D-09):** plan-author may borrow tone from existing `### Device Operations` H3 at `docs/index.md:85-92`: "Post-enrollment device management: reset, retire, wipe, re-provisioning, and tenant migration." Equivalent Operations sub-H3 framings: "Co-Management" → "Windows ConfigMgr-to-Intune workload management — slider model, migration sequence, tenant attach disambiguation, and Windows Autopatch prerequisites."; "Patch & Update Management" → "Cross-platform OS update enforcement — Windows Update for Business rings, macOS managed update commands, iOS supervised vs unsupervised update lifecycle, and Android per-OEM patch delivery (Play Integrity tier impact)."; "App Lifecycle Automation" → "Cross-platform app deployment at scale — Win32/MSIX packaging + supersedence, macOS .pkg/.dmg pipelines, iOS VPP device-vs-user licensing, Android Managed Google Play app lifecycle."; "Compliance Drift Detection + Tenant Migration" → "Cross-platform configuration drift workflows + tenant-to-tenant migration runbooks (BitLocker re-key, ABM token re-issue, MGP re-binding)."
- **Recommended literal for see-also line shape (D-15):** validator regex pin — `^>\s+See also:\s+(\[[^\]]+\]\(_glossary[^)]+\)\s*\([^)]+\)(;\s*)?)+\.?\s*$` — strict line-anchored format inside `>` blockquote. Examples:
  - `> See also: [Supervision](_glossary-macos.md#supervision) (Apple).`
  - `> See also: [Work Profile](_glossary-android.md#work-profile) (Android); [WPCO](_glossary-android.md#wpco) (Android).`
  - `> See also: [BitLocker](_glossary.md#bitlocker) (Windows); [FileVault](_glossary-macos.md#filevault) (Apple); [dm-crypt](_glossary-linux.md#dm-crypt) (Linux).`
- **Recommended Operations sub-H3 ordering (D-09):** match existing `operations/00-index.md` ordering — Co-Management first (already shipped Phase 53), then Patch & Update Management (Phase 54), then App Lifecycle Automation (Phase 55), then Compliance Drift Detection + Tenant Migration (Phase 56). Preserves chronological build order + reader cognitive load (simplest Windows-only domain first; cross-platform domains follow).
- **Recommended D-23 Linux Compliance Category Reference cross-link anchor format:** `../admin-setup-linux/03-compliance-policy.md#step-NN-{kebab-case-category-name}` — verify exact slugs at plan-time per GFM kebab-case rules (e.g., `#step-2-allowed-distributions`, `#step-3-custom-compliance`, `#step-4-device-encryption`, `#step-5-password-policy`).

</specifics>

<deferred>
## Deferred Ideas

- **Dedicated `windows-capability-matrix.md`** — already deferred to v1.6+ per Phase 58 D-10. Phase 59 does not address.
- **Phase 60 promotion of see-also reciprocity check** — D-19 explicitly notes Phase 60 does NOT need to promote a separate see-also check (Phase 59's own validator is the rescue path per AUDIT-06 each-phase-owns-its-own-validator architecture).
- **`_glossary-ios.md` spinout** — REJECTED in Phase 59 GA-3 (3D=40pts loser); architectural reversal of REQUIREMENTS:144 Phase 23-24 decision; defer indefinitely (would require milestone-class refactor). v1.6+ candidate IF a future business need (e.g., distinct iOS-team-owned glossary) emerges.
- **Surfacing end-user enrollment guides at hub level** — Phase 57 precedent (Android end-user guide deliberately excluded) + D-06 Linux end-user guide exclusion. v1.6+ candidate IF an admin-vs-end-user dual-audience hub model is adopted.
- **`> Cross-platform note:` blockquote shape normalization for macOS** — D-15 explicitly preserves macOS `> **Windows equivalent:**` shape verbatim. Future v1.6+ cleanup MAY normalize all 4 glossaries to single blockquote shape (`> **Cross-platform note:**`), but Phase 59 does NOT touch existing macOS shapes (preserves Phase 23-24 mature prose).
- **Operations H2 platform-applicability blockquotes per sub-H3** — Phase 53/54/55/56 sub-dir 00-overview.md files use `> **Platform applicability:**` blockquotes (per Phase 56 D-14 inheritance). Phase 59's Operations H2 sub-H3s use 1-sentence framings instead (per D-09); plan-author MAY add platform-applicability blockquotes if depth needed, but bounded budget.
- **Common-issues.md Linux section** — Phase 57 added Android section to common-issues.md (CLEAN-02). Phase 59 does NOT add Linux section to common-issues.md (out-of-scope per ROADMAP Phase 59 SCs — only docs/index.md + glossaries + quick-ref-l1/l2 + operations/00-index.md are in scope). v1.6+ candidate.

### Reviewed Todos (not folded)

None — `gsd-sdk query todo.match-phase 59` returned 0 matches (verified during cross_reference_todos step). No pending todos in `.planning/todos/pending/` matched Phase 59.

</deferred>

---

*Phase: 59-hub-navigation-integration-linux-operations-sections*
*Context gathered: 2026-05-01*
