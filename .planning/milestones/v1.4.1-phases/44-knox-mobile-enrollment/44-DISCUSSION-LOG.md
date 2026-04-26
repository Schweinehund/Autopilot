# Phase 44: Knox Mobile Enrollment — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `44-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 44-knox-mobile-enrollment
**Areas discussed:** 5-SKU table structure, B2B 1-2 day approval gate UX, DPC-extras-JSON cross-paste anti-pattern, Glossary granularity
**Method:** 3-agent adversarial review (Finder / Adversary / Referee) per user instruction

---

## Pre-Discussion: Locked Decisions Carried Forward

Not discussed — already locked by ROADMAP / prior phases:

- 5-SKU disambiguation must be H2, not footnote (ROADMAP §44 SC#1)
- Framing: "free baseline; Knox Suite gates advanced; Intune supplies KPE Premium transparently"
- 60-day freshness cycle (Phase 34 D-14)
- D-10 sectioned actor-boundary + D-12 three-part escalation (Phase 40/41)
- Play Integrity 3-tier verdicts only; zero SafetyNet tokens
- Reciprocal pins from Phase 35 ZT + Phase 36 COBO (AEKNOX-07)
- Mermaid 6-branch update + glossary entries Knox/KME/KPE/AMAPI (AEKNOX-05/06)
- Android-scoped only (Phase 43 D-25)
- KME is Samsung-only (no cross-platform analog)
- Knox does NOT support BYOD Work Profile

---

## Gray Area 1: 5-SKU Table Structure

| Option | Description | Selected |
|---|---|---|
| 1A | 6 rows, one per SKU (KME / KPE Standard / KPE Premium / Knox Manage / Knox Suite / Knox Configure) — flat | |
| 1B | 5 rows, KPE collapsed with Standard\|Premium columns (matches REQUIREMENTS line 21 wording) | ✓ |
| 1C | 6 rows grouped under 2 H3 sub-sections ("Required for KME" / "Independent of KME") under one H2 | |

**Adversarial review verdict:** **1B**. REQUIREMENTS line 21 literally enumerates "5-SKU disambiguation table (KME / KPE / Knox Suite / Knox Manage / Knox Configure)" — only 1B matches that count. Standard|Premium columns inside the KPE row carry the locked "free baseline / paid upgrade" hierarchy without splitting KPE into two flat siblings (1A's failure mode). 1C is non-canonical for the doc set (admitted con) and risks a strict-validator interpretation of SC#1's "table" (singular) wording.

**Notable Finder→Adversary flips:**
- Finder: "1B violates 5-SKU naming because ROADMAP SC#1 enumerates 6" → **Adversary disprove** (REQUIREMENTS line 21 explicitly says 5-SKU; the two specs are in tension and 1B respects REQUIREMENTS literal wording)
- Finder: "1B's free-baseline / per-device-upgrade cells invert hierarchy" → **Adversary disprove** (those cells render the locked framing precisely; SKU names stay in column headers)
- Finder: "5-column tables don't fit doc-set's 4-column convention" → **Adversary disprove** (no 4-column convention exists in the doc set; ZT uses 3-column tables)

**User confirmation:** Locked all four (selected "Lock all four (recommended)" in confirmation question).

---

## Gray Area 2: B2B 1-2 Day Approval Gate UX

| Option | Description | Selected |
|---|---|---|
| 2A | Step 0 prereq callout at top of Setup Steps (above Step 1) — promoted to H2 to match `02-zero-touch-portal.md:33` pattern | ✓ |
| 2B | Banner under H1 + repeated inline callout at first portal-action step | |
| 2C | First-class `## Prerequisites` H2 with checklist (matches existing doc pattern) | |

**Adversarial review verdict:** **2A**. Top-of-procedure Step 0 H2 gives the 1-2-day timing gate maximum visual weight as the procedure's first action. 2C's flat Prerequisites checklist demonstrably under-emphasizes timing risk (admitted in 2C cons — "1-2 day gate may get equal visual weight to 'have an Intune tenant'"). 2B doubles maintenance burden (banner + inline) for one timing fact.

**Notable Finder→Adversary flips:**
- Finder: "2A breaks sibling pattern (ZT uses Step 0 H2 not blockquote)" → **Adversary partial disprove** (true — but the proposal allows promoting 2A's blockquote to H2 to match ZT pattern; D-02 in CONTEXT.md adopts that promotion)
- Finder: "2B banner-under-H1 breaks doc-set rhythm" → **Adversary disprove** (ZT lines 11-16 already ship 3 blockquote callouts under H1)
- Finder: "2C flat checklist breaks confidence-tagging convention" → **Adversary disprove** (COBO Prerequisites bullets at lines 42-47 are plain checkboxes; no convention)

**User confirmation:** Locked all four.

---

## Gray Area 3: DPC-Extras-JSON Cross-Paste Anti-Pattern Callout

| Option | Description | Selected |
|---|---|---|
| 3A | Identical anti-paste blockquote at JSON-paste step in BOTH KME and ZT docs | ✓ |
| 3B | Direction-specific framing per doc ("if you came from a ZT setup..." in KME doc, vice versa) | |
| 3C | Dedicated "Common Pitfalls" H3 under Setup Steps with cross-paste as item #1 | |

**Adversarial review verdict:** **3A**. Identical block at point-of-action gives bidirectional silent-failure protection. 3B's "if you came here from..." conditional weakens protection for first-time configurers (the always-on case). 3C's pitfalls section is detached from action point — fatal for silent-failure, since the reader who skips to JSON paste loses the warning at the exact moment it would prevent the failure (admitted in 3C cons).

**Notable Finder→Adversary flips:**
- Finder: "3A's ⚠️ emoji violates CLAUDE.md no-emoji" → **Adversary disprove** (locked Phase 40/41 D-10/D-12 patterns use emoji; sibling ZT line 16 already ships ⚠️)
- Finder: "3C breaks COBO 'What Breaks Summary' pattern" → **Adversary disprove** (COBO has no such summary section — Finder fabricated the artifact)
- Finder: "3B is scope creep on AEKNOX-07" → **Adversary disprove** (DPC-extras anti-paste IS a JSON-layer mutex — same conceptual scope as device-level mutex retrofit)

**Drift mitigation in 3A:** wrap with HTML comment marker `<!-- AEKNOX-03-shared-anti-paste-block -->` for grep discoverability.

**User confirmation:** Locked all four.

---

## Gray Area 4: Glossary Granularity

| Option | Description | Selected |
|---|---|---|
| 4A | One umbrella "Knox" entry listing all SKUs as sub-bullets | |
| 4B | Separate entries for Knox + KME + KPE + AMAPI + WPCO (5 entries, KPE single-row) | ✓ (with WPCO dropped — already exists at glossary line 75) |
| 4C | Maximally granular — separate entries for each SKU + AMAPI + WPCO (8+ entries) | |

**Adversarial review verdict:** **4B with WPCO dropped**. Five separate entries match AEKNOX-06 literal enumeration ("Knox / KME / KPE glossary entries (+ AMAPI if missing)") and preserve `#kme` / `#kpe` deep-link anchors used by `reference/android-capability-matrix.md` per AEKNOX-04. 4A collapses to one umbrella (violates AEKNOX-06 + breaks anchors). 4C over-delivers into SKU-catalog territory beyond AEKNOX-06 scope.

**Critical adjustment to 4B:** Drop the WPCO entry — `_glossary-android.md` line 75 already has WPCO. 4B's WPCO redefinition would create a duplicate/competing definition (Finder's only confirmed MEDIUM weakness on 4B that the Adversary did not contest).

**Notable Finder→Adversary flips:**
- Finder: "4B's KME mutex with ZT mismatches COBO callout scope" → **Adversary disprove** (locked context says KME is Samsung-only; mutex is canonical)
- Finder: "4B's KPE entry skips Knox Suite/Manage/Configure — asymmetric" → **Adversary disprove** (AEKNOX-06 explicitly excludes those from glossary; umbrella entry redirects to admin doc which has the 5-SKU H2 table)
- Finder: "4C's 8+ entries disproportionate vs macOS" → **Adversary partial disprove** (Android glossary already has 20 entries; severity should be LOW not CRITICAL — referee accepted demotion)

**User confirmation:** Locked all four.

---

## Claude's Discretion (deferred to planner)

- Anchor names for the new admin doc (researcher/planner picks final slugs per sibling-doc conventions)
- Knox glossary entry length (target 1-2 sentences per peer pattern; planner adjusts based on prose density)
- Mermaid branch label for the new Knox branch in `00-overview.md` — recommendation "Knox (KME)" but planner picks
- L1/L2 runbook prominent failure modes (researcher picks based on Microsoft Learn + Samsung KB sources)

---

## Deferred Ideas (captured during analysis, not in scope)

- Audit harness C8 informational check for `AEKNOX-03-shared-anti-paste-block` drift detection — v1.5 backlog or Phase 47
- Knox Manage / Knox Suite / Knox Configure first-class admin guides — future milestone
- Samsung tablet / wearable / Galaxy XR KME variants — Phase 45 (per-OEM AOSP) + v1.5+ backlogs
- DPC-extras-JSON validator at lint time — v1.5 tooling backlog
- Cross-platform Knox analog explainer — out of locked Samsung-only scope

---

## Method Notes

This discussion used the `/adversarial-review` skill at user instruction. Three agents (Sonnet/general-purpose) ran sequentially:

1. **Finder** (~80k tokens, 8 tool uses): identified ~50 weaknesses across 12 candidate options (3 per gray area × 4 gray areas), categorized LOW/MEDIUM/CRITICAL. Total claimed score: 252.
2. **Adversary** (~68k tokens, 5 tool uses): disputed 24 weaknesses with file-cited evidence; earned 109 points from disprovals.
3. **Referee** (~67k tokens, 7 tool uses): ruled on disputes, picked winners per gray area + 2-3 sentences of reasoning. Output the final 4-row decision table.

The pattern resolved real ambiguities (e.g., the REQUIREMENTS-vs-ROADMAP 5-vs-6-SKU tension), caught Finder over-flags (fabricated COBO sibling artifacts that don't exist), and produced winner picks grounded in file evidence rather than agent confidence.

Total Phase 44 discussion duration: ~5 minutes wall-clock; 3 sequential agents @ Sonnet.
