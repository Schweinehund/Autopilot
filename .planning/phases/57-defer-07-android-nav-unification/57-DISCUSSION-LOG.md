# Phase 57: DEFER-07 Android Nav Unification — Discussion Log

**Date:** 2026-04-30
**Mode:** `--chain` (interactive discuss → auto plan + execute)
**Methodology:** Adversarial review (Finder / Adversary / Referee scored pattern) per user request — `/adversarial-review` invoked per gray area
**Phase boundary:** Locked by ROADMAP.md lines 320-335 (CLEAN-01..04 + 4 SCs); SPEC.md not invoked

---

## Pre-Decided (Carried Forward — Not Re-Asked)

These were locked by ROADMAP methodology + REQUIREMENTS verbatim + Phase 51-56 lineage; surfaced to user as "carrying forward" but not opened for discussion:

- Append-only H2-block contract; no existing H2 modified or reordered (ROADMAP:332)
- MANDATORY pre-edit `grep -rn "index.md#" docs/` anchor inventory per PITFALL-6 (ROADMAP:331)
- Single atomic commit (Phase 51-56 lineage; v1.4.1 atomicity lesson per ROADMAP:271)
- `check-phase-57.mjs` validator-as-deliverable (AUDIT-06; Phase 48-56 D-25 lineage; file-reads-only / regex-based / no-shared-module)
- 60-day `last_verified` rule on all 4 touched files (Phase 34 D-14)
- 8 Android scenario categories (CLEAN-02 verbatim — REQUIREMENTS:14)
- 3-method log collection + Play Integrity verdict reference + investigation runbook list (CLEAN-04 verbatim — REQUIREMENTS:16)
- "Mode-first per v1.4 triage tree" (CLEAN-03 — REQUIREMENTS:15; structural interpretation was GA-3)
- Three sub-tables in docs/index.md (SC#1 — ROADMAP:325)
- Hardcoded H2/anchor strings + literal-token regexes pinned in CONTEXT + validator (Phase 49-56 D-NN)
- iOS Phase 32 sub-table architecture is the closest precedent for docs/index.md Android H2 (operative inheritance)
- Phase 59 owns operations-hub-nav (ROADMAP:354 + 333-334 serialized hotspot ownership)

## Discussion Selection

**Question 1:** Phase 57 surgically retrofits 4 hub files. Which gray areas do you want to discuss?
**Type:** AskUserQuestion (multiSelect)
**Options presented:**
- ☐ Index sub-table depth (GA-1 — docs/index.md Android H2 structure)
- ☐ Common-issues shape (GA-2 — H3 architecture: 1:1 vs cluster vs hybrid vs mode-grouped)
- ☐ L1 quick-ref mode axis (GA-3 — "mode-first per v1.4 triage tree" interpretation)
- ☐ L2 verdict + invest (GA-4 — Play Integrity verdict depth + Knox/AOSP investigation routing)

**User selection:** ALL FOUR (multiSelect)
**User notes:** "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"

## Methodology Adopted (per user request)

For each of the 4 gray areas, dispatch a parallel adversarial review (Finder / Adversary / Referee scored pattern):
- **FINDER**: Identify defects per option; score CRIT=15 / HIGH=8 / MED=4 / LOW=1
- **ADVERSARY**: Try to disprove each defect; +N pts back to defended option per successful disproof
- **2x PENALTY**: Fabricated disproofs caught by Referee → 2x penalty (the Adversary loses 2x the disputed points)
- **REFEREE**: Independently verifies each disproof (UPHOLD / PARTIAL / REJECT); computes net surviving defect score per option
- **WINNER**: Lowest defect score wins; tiebreaker priorities documented per gray area

Mirrors Phase 56 methodology line in 56-CONTEXT.md. 4 parallel general-purpose agents dispatched in single message; each returned structured output with per-option scoring + winner + reasoning + key surviving defects + recommendation strength + implementation refinements.

---

## GA-1: docs/index.md Android H2 sub-table architecture

**Options presented to adversarial review:**
- **1A**: Pure iOS Mirror — three sub-tables (L1/L2/Admin), no enrollment-mode surfacing, lifecycle overview link
- **1B**: iOS mirror + Triage Tree top-of-section call-out + lifecycle overview at H2 intro
- **1C**: Augmented Admin sub-table (per-mode admin-setup-android enumeration: 7-9 entries vs single overview link)
- **1D**: Three sub-tables + fourth "Operations" cross-reference subsection linking Phases 53-56 ops content

**Adversarial review scoring:**

| Option | Raw Finder | Adversary defended | Referee net | Notes |
|--------|------------|--------------------|-----------  |-------|
| 1A     | 17         | -8                 | **9**       | Tightest iOS mirror; mode-abstraction via lifecycle link |
| 1B     | 25         | -8                 | 17          | Adds duplicative call-out + intro-link no-op |
| 1C     | 47         | -3 (incl. 2× 2x penalties for fabricated iOS-symmetry defense + fabricated "Phase 57 includes admin-setup content" claim) | 51 | Hub-nav-only scope violation; structural-depth-EXCEEDS not MATCHES |
| 1D     | 38         | -10                | 28          | Phase 59 ownership violation (operations hub nav serialized); co-management has zero Android files |

**Winner:** **Option 1A — STRONG** (gap 1A=9 vs 1B=17 is ~2x; 1C/1D fail on hard guardrails)

**Decision recorded:** D-01..05 (CONTEXT.md Implementation Decisions §1)

**Adversary notes — 2x penalties triggered against 1C:**
1. Adversary claimed "iOS Admin sub-table also enumerates per-path admin-setup-ios files" — Referee verified iOS Admin table lines 156-163 DOES enumerate sibling files BUT all are sibling-file level (admin-setup-ios/01..09), NOT a sub-overview-with-children pattern; defense was partial only.
2. Adversary claimed "Phase 57 scope already includes admin-setup content" — Referee verified Phase 57 ROADMAP:320-335 mandates HUB-NAV ONLY; defense REJECTED at 2x penalty.

**Implementation refinements locked:**
- L1 sub-table: 4 rows (Lifecycle / Triage Tree / Runbooks-anchor / Quick-Ref-anchor)
- L2 sub-table: 4 rows (Lifecycle / Log Collection / Runbooks-anchor / Quick-Ref-anchor)
- Admin sub-table: 3 rows (Admin Setup Overview / Lifecycle / Capability Matrix)
- Cross-Platform References update: add Android Lifecycle + Android Capability Matrix entries
- Platform coverage blockquote: append `, and Android Enterprise provisioning issues`
- MANDATORY pre-edit anchor inventory grep `index.md#` BEFORE the atomic commit (PITFALL-6)

---

## GA-2: docs/common-issues.md Android symptom routing — H3 shape

**Options presented to adversarial review:**
- **2A**: 1:1 H3 mapping (8 H3s, one per L1 runbook)
- **2B**: Symptom-cluster H3s with disambiguation (5-6 H3s, multi-L1 routing per cluster, mirrors iOS reciprocal pattern)
- **2C**: Hybrid (8 H3s + section-top decision-tree banner + light reciprocal callouts)
- **2D**: Mode-grouped H3s (5 mode H3s containing scenario sub-bullets)

**Adversarial review scoring:**

| Option | Raw Finder | Adversary defended | Referee net | Notes |
|--------|------------|--------------------|-----------  |-------|
| 2A     | 13         | -8                 | **5**       | 8 H3s, 1:1, optional cross-platform banners |
| 2B     | 31         | -4                 | 27          | Drops 1:1 anchor traceability to CLEAN-02's 8 LOCKED categories |
| 2C     | 14         | -9                 | **5**       | 8 H3s + section-top decision-tree banner + 2 reciprocal callouts |
| 2D     | 47         | -8                 | 39          | Pivots document axis from symptom→mode (contradicts "symptom-based index routing" framing across all 3 precedent sections) |

**Winner:** **Option 2C — STRONG** (2A/2C tied at net 5; 2C wins on tiebreaker = iOS Phase 32 precedent operative + author-acknowledged Android symptom overlap in runbooks 24/27/28/29)

**Tiebreaker reasoning:** iOS section (lines 212-265) is the most-recent same-author Phase-32 peer pattern. iOS uses reciprocal-disambiguation callouts (line 239) and a section-top "MAM-WE Advisory" pattern (line 263) — 2C mirrors this; 2A omits both. Android symptom overlap is real and author-acknowledged (runbook 24 cross-refs 22, 23, 27 in its first paragraphs; runbook 28 cross-refs 27 + 22-26; runbook 29 cross-refs 28, 27, 22-26).

**Decision recorded:** D-06..12

**Implementation refinements locked:**
- 8 H3 anchor literals (LOCKED): `### Android: Enrollment Blocked` / `### Android: Work Profile Not Created` / `### Android: Device Not Enrolled` / `### Android: Compliance Blocked` / `### Android: MGP App Not Installed` / `### Android: ZTE Enrollment Failed` / `### Android: Knox Enrollment Failed` / `### Android: AOSP Enrollment Failed`
- Section-top decision-tree banner: `> **Not sure which Android scenario?** Start with the [Android Triage Decision Tree](decision-trees/08-android-triage.md) — it disambiguates by enrollment mode (BYOD / COBO / Dedicated / ZTE / Knox / AOSP) and symptom in 2-3 steps.`
- 2 reciprocal callouts (limit): inside Device Not Enrolled H3 (24/22/27) and ZTE H3 (27/28)
- 1 cross-platform iOS banner (limit): inside Compliance Blocked H3 only (`> **iOS:** For iOS compliance and CA timing issues, see ...`)
- Choose-Your-Platform TOC update at lines 14-18: append Android entry
- Platform coverage blockquote at line 9: append Android Enterprise

---

## GA-3: docs/quick-ref-l1.md Android — "mode-first per v1.4 triage tree" structural interpretation

**Options presented to adversarial review:**
- **3A**: Mode column added to existing tables (mirrors L1-runbooks index 70-76 pattern)
- **3B**: Mode-grouped sub-H3 sections (6 mode H3s — BYOD / COBO / Dedicated / ZTE / Knox / AOSP)
- **3C**: Symptom-first rows with inline `[Mode]` prefix tags (no separate column)
- **3D**: Hybrid 3A + lead-in mode-overview table

**Adversarial review scoring:**

| Option | Raw Finder | Adversary defended | Referee net | Notes |
|--------|------------|--------------------|-----------  |-------|
| 3A     | 13         | -4                 | 9           | Mode column makes mode a *qualifier* not the *primary axis*; iOS/macOS quick-ref tables don't have Mode column |
| 3B     | 31         | -2                 | 29          | Replaces CLEAN-03 four-part list with 6 mode-H3s — REQ-shape divergence; triage tree has 5 root branches (not 6 — Knox is sub-mode of ZTE/COBO) |
| 3C     | 8          | -3                 | **5**       | Symptom-first w/ inline `[Mode]` prefix; mode tag literally first token per row |
| 3D     | 17         | -5                 | 12          | Mode-overview lead-in table is novel artifact (no precedent in iOS/macOS/Windows quick-ref blocks) |

**Winner:** **Option 3C — STRONG** (gap 3C=5 vs 3A=9; 3B fails on CRIT REQ-shape divergence)

**Decision recorded:** D-13..20

**Tiebreaker reasoning:** 3C is the only option that simultaneously (a) preserves CLEAN-03's four-part literal phrasing, (b) puts mode "literally first" per token order on every row (mirroring `08-android-triage.md:15` "asking mode before symptom" discipline), and (c) preserves iOS/macOS/Windows quick-ref structural mirror at quick-ref-l1.md:14-148.

**Critical orthogonal finding flagged during review:** Knox runbook 28 file exists on disk but is MISSING from `docs/l1-runbooks/00-index.md:70-76` Android L1 table. CLEAN-02 requires Knox in scope. Recorded as D-21 (orthogonal patch in same atomic commit).

**Implementation refinements locked:**
- Mode tag vocabulary (LOCKED verbatim from L1 index 70-76): `[BYOD]` / `[ZTE]` / `[AOSP]` / `[Knox]` / `[All GMS]`
- Row format: prefix style (mode tag BEFORE symptom check)
- 4-part substructure: `### Top Checks` / `### Android Escalation Triggers` / `### Android Decision Tree` / `### Android Runbooks`
- Top Checks count: 5 entries (recommend over 4 because AOSP-mode procedures are genuinely distinct)
- Runbooks list: 8 rows (runbooks 22-29 inclusive)
- Decision Tree: single link to `decision-trees/08-android-triage.md`

---

## GA-4: docs/quick-ref-l2.md — Play Integrity verdict reference depth + Knox/AOSP investigation routing

**Options presented to adversarial review:**
- **4A**: Compact verdict lookup (4-row mini-table + Phase 54 SSoT cross-link) + bulk-list 6 runbooks
- **4B**: Full verdict reference (4 rows × meaning × cause × escalation × cross-link) + iOS-style disambiguation across 6 runbooks
- **4C**: Compact verdict lookup (per 4A) + iOS-style disambiguation routing (per 4B)
- **4D**: Full verdict table (per 4B) + bulk-list (per 4A)

**Adversarial review scoring:**

| Option | Raw Finder | Adversary defended | Referee net | Notes |
|--------|------------|--------------------|-----------  |-------|
| 4A     | 9          | -4                 | 5           | Compact verdict + bulk-list; loses iOS-precedent disambiguation; Knox/AOSP mode signal lost |
| 4B     | 38         | -7                 | 31          | Direct PITFALL-7 violation; HARD-DEADLINE three-layer transplant violates Phase 54 D-13; staleness multiplexing; **fabricated 4th `MEETS_VIRTUAL_INTEGRITY` verdict not in SSoT (-2x penalty triggered)** |
| 4C     | 4          | -3                 | **1**       | Compact verdict (link-not-copy) + iOS-style disambiguation routing on 6 runbooks |
| 4D     | 30         | -6                 | 24          | Worst-of-both: PITFALL-7 violation + iOS-precedent divergence + same fabricated 4th verdict |

**Winner:** **Option 4C — STRONG** (gap 4C=1 vs 4A=5; 4B/4D fail on CRIT PITFALL-7 + Phase 56 D-08 inheritance violation)

**Decision recorded:** D-22..28

**Critical orthogonal finding flagged during review:** Phase 54 SSoT at `04-android-patch-delivery.md:55-59` carries 3 Play Integrity verdicts (BASIC / DEVICE / STRONG), NOT 4. The `MEETS_VIRTUAL_INTEGRITY` verdict in option 4B/4D specs was fictional. Locked at D-23: ship 3 verdicts only. Plan-time research-flag added (Claude's Discretion §) to verify Google has not added 4th verdict post-Phase-54-close.

**Adversary notes — 2x penalty triggered against 4B/4D:**
- Adversary in defense of 4B claimed "MEETS_VIRTUAL_INTEGRITY is a real Google Play Integrity verdict that Phase 54 omitted" — Referee verified Phase 54 SSoT at `04-android-patch-delivery.md:55-59` lists exactly 3 verdicts (`MEETS_BASIC_INTEGRITY` / `MEETS_DEVICE_INTEGRITY` / `MEETS_STRONG_INTEGRITY`). Defense REJECTED at 2x penalty (fictional content in option spec).

**Implementation refinements locked:**
- Verdict reference: 3 rows EXACTLY (BASIC / DEVICE / STRONG)
- Cross-link target: `04-android-patch-delivery.md#play-integrity-attestation` (verified anchor)
- Trailing pointer line after table: link to `#deadlines-cutover-dates`
- NO inline escalation routing in verdict table (lives in Phase 54 SSoT)
- HARD-DEADLINE: single inline `> ⚠️` reminder pointer only (no three-layer transplant)
- 6-runbook list with iOS-style `--` disambiguation per row
- 3-method log collection: 3 verbatim method names from `18-android-log-collection.md` (Company Portal / Microsoft Intune App / adb logcat)

---

## Confirmation Question

**Question:** All 4 adversarial reviews delivered STRONG-confidence winners. Ready to lock these and write CONTEXT.md, or override any?

**User selection:** "Lock all 4 winners (Recommended)"

**Outcome:** All 4 winners locked. CONTEXT.md written with 34 D-NN decisions. DISCUSSION-LOG.md (this file) preserved for audit. Auto-advance to plan-phase per `--chain` mode.

---

## Deferred Ideas (Captured)

- Operations cross-references in docs/index.md Android H2 (Option 1D) → Phase 59 owns this surface
- Per-mode admin-setup-android enumeration in docs/index.md (Option 1C) → admin-setup-android/00-overview.md handles
- Mode-grouped quick-ref-l1.md sub-H3 sections (Option 3B) → CLEAN-03 four-part substructure is locked
- MEETS_VIRTUAL_INTEGRITY 4th Play Integrity verdict → fictional in option spec; Phase 54 SSoT update would be required first
- Full Play Integrity verdict + escalation routing in quick-ref-l2.md (4B/4D) → PITFALL-7 firewall locked
- HARD-DEADLINE three-layer pattern in quick-ref-l2.md → Phase 54 D-13 is bound to source file
- Mandatory cross-platform reciprocal banners on every Android H3 → over-banner is anti-pattern (PITFALL-10)
- Knox runbook 28 admin Setup Sequence content → out-of-Phase-57 scope
- AOSP per-OEM L1 runbook split → out-of-Phase-57 scope (runbook 29 covers all 5 OEMs)
- Per-OEM admin-setup files 09-13 hub linking → out-of-Phase-57 scope

---

## Claude's Discretion (Plan-Author Decisions)

- Top Checks count (4 vs 5; D-18) — recommend 5 for AOSP distinctness
- ZTE/Knox portal check consolidation in Top Checks (D-18) — plan-author judgment based on prose flow
- Mode-tag value for runbook 28 in L1 index Knox row (D-21) — verify at plan-time against runbook 28 frontmatter
- 3-method log collection table column compression (D-27) — plan-author judgment based on quick-ref width budget
- Key Intune Portal Paths Android L2 table row count (D-28) — 3 vs 5 rows
- V-57-15 validator Mode tag literal coverage scan strictness (present-anywhere vs present-in-Top-Checks-only)
- Plan-time research-flag: verify 4th Play Integrity verdict NOT in Phase 54 SSoT (D-23 NEGATIVE assertion regression)
- Plan-time research-flag: verify Knox L1 runbook 28 mode-tag literal (D-21)
