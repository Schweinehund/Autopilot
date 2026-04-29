# Phase 56: Drift Detection + Tenant Migration — Discussion Log

**Date:** 2026-04-29
**Methodology:** Adversarial review (Wave-of-3: Finder / Adversary / Referee) on 4 gray areas, user request: "for each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."

---

## Gray Areas Discussed

### GA-1 — File shape (3 vs 5 files in `docs/operations/drift-migration/`)

**Options presented:**
- 1A: 3 files (strict REQ map): `00-overview` + `01-windows-drift-detection` + `04-tenant-migration-runbook`
- 1B: 5 files (Phase 54/55 parity): `00-overview` + `01-windows` + `02-macos-drift-detection` + `03-ios-android-drift-detection` + `04-tenant-migration-runbook`
- 1C: 4 files: `00-overview` + `01-windows` + `02-multi-platform-compliance-drift` + `04-tenant-migration-runbook`
- 1D: 3 files renumbered: `00-overview` + `01-windows-drift-detection` + `02-tenant-migration-runbook`

**Adversarial review verdict:**
- Finder: 30 / 35 / 33 / 35 raw defect pts
- Adversary: net 36.5 pts (full disproves on F-1A-02 SUMMARY line 203 reading + F-1B-02 Bash/PowerShell + F-1D-02 slot-04 symmetry)
- Referee: REJECTED Adversary's F-1A-02 disproof (1A is 3 files per option spec, NOT 5 — Adversary misread); UPHELD F-1D-02 partial (slot-04 symmetry argument valid). Final per-option net pts: 1A=14, **1B=12**, 1C=19, 1D=12

**Winner: 1B-modified — 5-file SUMMARY-aligned shape.** Locked as **D-01** in CONTEXT.md.

**Plan-author discretion:** slot-02 (`02-macos-drift-detection.md`) and slot-03 (`03-ios-android-drift-detection.md`) MAY be routing-only stubs paralleling Phase 55 4C-prime hybrid pattern if substantive content thin (no native Intune Remediations equivalent on macOS — Bash phrasing in DRIFT-01 refers to Linux Custom Compliance, not macOS).

**Why 1B beat 1A (the apparent default):** SUMMARY.md line 203 verbatim mandates "5 files (00-overview through 04-tenant-migration-runbook)." 1A's 3-file shape contradicts SUMMARY directly. The Adversary attempted to disprove F-1A-02 by claiming "5 files matches SUMMARY" — but conflated 1A (3 files) with the 5-file mandate. Referee rejected at 2x penalty.

---

### GA-2 — Tenant migration runbook architecture (single vs split)

**Options presented:**
- 2A: Single `04-tenant-migration-runbook.md` with 4 platform H2 sections + encryption-drift folded inside (REQ-aligned baseline)
- 2B: Per-platform tenant migration files (no single runbook): `04-windows` + `05-macos-ios` + `06-android` + `07-cross-platform-encryption-drift`
- 2C: Single runbook + dedicated encryption-drift sub-file
- 2D: Single runbook with `<details>` HTML collapsibles per platform

**Adversarial review verdict:**
- Finder: 23 / 44 / 31 / 30 raw defect pts
- Adversary: net 51 pts attempted (full disproves on F-2B-01/02/03 fold-mandate triple + F-2D-01 zero-precedent claim)
- Referee: REJECTED ALL THREE F-2B disproves at 2x penalty (-54 pts effective) — 2B by definition extracts files; ROADMAP SC#5 + REQUIREMENTS.md lines 180-183 mandate FOLD INSIDE 04-tenant-migration-runbook.md verbatim. UPHELD F-2D-01 disproof — `<details>` HTML used in 8 v1.2 files (admin-setup-apv1/ + lifecycle-apv2/), zero-precedent claim is false. Final per-option net pts: **2A=4**, 2B=55, 2C=8, 2D=7

**Winner: 2A — single-runbook with all 4 platform H2 sections + DRIFT-07 cross-platform encryption drift folded inside.** Locked as **D-04** in CONTEXT.md.

**Why 2A beat 2D (closest competitor):** F-2D-04 (PR-diff reviewability inversion with `<details>` blocks) + F-2D-05 (SharePoint/Confluence export risk per PITFALL-14) confirmed at MED tier each. Single H2 sectioning is the established Phase 53/54/55 pattern; `<details>` adds renderer-dependency without matching reviewability or export gain.

**Critical SC#5 fold mandate:** ROADMAP line 315 verbatim: *"The tenant-migration runbook contains a cross-platform encryption-drift section ... folded into the runbook, not a separate artifact (DRIFT-07 fold)."* Only 2A satisfies this literal mandate.

---

### GA-3 — Existing v1.2 doc relationship

**Options presented:**
- 3A: Cross-reference only — no edits to v1.2 docs
- 3B: Cross-reference + surgical retrofit — add forward-link callouts in v1.2 docs
- 3C: Supersede v1.2 docs — mark deprecated with redirect headers
- 3D: Merge v1.2 content into Phase 56 files — delete v1.2 docs

**Adversarial review verdict:**
- Finder: 18 / 23 / 34 / 39 raw defect pts
- Adversary: net 15.5 pts (full disprove on F-3A-04 freshness — `last_verified: 2026-04-13` is 16 days old per today's date, well within 60-day cycle)
- Referee: UPHELD F-3A-04 freshness disproof. Note: Referee labeled "winner = 3B" but described 3A semantics ("ZERO modification to v1.2 docs in Phase 56 commit"); semantic-correction applied — winner is **3A**. Final per-option net pts: **3A=7**, 3B=4 (post-correction also unfavorable due to F-3B cross-directory validator anti-pattern), 3C=14, 3D=12

**Winner: 3A — cross-reference only, ZERO modification to existing v1.2 docs.** Locked as **D-09** + **D-10** in CONTEXT.md.

**Why 3A beat 3B (closest competitor):** F-3B-04 MED (cross-directory validator scope expansion is anti-pattern per CDI-Phase54-03 inheritance) + F-3B-01 atomic-commit risk amplification + scope-creep concern (DRIFT-NN does not mandate retrofit). 3A keeps Phase 56 commit clean and v1.2 phase-lineage hotspot ownership intact.

**Why 3C/3D rejected:** F-3C-01 CRIT (PITFALL-13 "deprecated" token triggers C11 ops-domain anti-pattern regex per AUDIT-03; sidecar allowlist seeding not budgeted). F-3D-01/02 CRIT (deletion breaks docs/index.md + sibling refs; pre-existing `drift-detection.md` is REGISTRATION drift NOT configuration drift — different scope axis; Phase 56 is NOT a superset).

**Scope-distinction discipline:** Cross-link prose MUST clarify scope difference: registration drift (v1.2) vs configuration drift (Phase 56). Example: *"For Autopilot **registration** drift (profile assignment states), see [Registration Drift Detection](../../reference/drift-detection.md). This guide covers **configuration** drift via Intune Remediations."*

---

### GA-4 — BitLocker re-key options + MEDIUM-confidence framing

**Options presented:**
- 4A: 3 options enumerated neutrally + frontmatter MEDIUM only (no inline blockquote)
- 4B: 3 options + recommend PowerShell escrow + frontmatter + inline blockquote at top
- 4C: 3 options + data-risk callouts + per-third-party-tool inline `> 📋` callouts
- 4D: 2 options (PowerShell + decrypt) + advisory mention of third-party tools without endorsement

**Adversarial review verdict:**
- Finder: 18 / 23 / 21 / 28 raw defect pts
- Adversary: net 22 pts (full disproves on F-4D-02 D-16 category-error + partial on F-4A-01 frontmatter framing fabrication)
- Referee: UPHELD F-4A-01 partial-downgrade (D-16 is inline-blockquote-only, NOT inline+frontmatter; Finder's framing was partially fabricated). Final per-option net pts: **4A=4**, 4B=8, 4C=14, 4D=11

**Winner: 4A-extended (hybrid).** Locked as **D-11** + **D-16** in CONTEXT.md.

The pure 4A spec ("frontmatter MEDIUM only, no inline blockquotes") was REFINED post-Referee to a hybrid:
- Keep 4A's neutral 3-option enumeration (per REQ DRIFT-04 literal)
- Keep frontmatter `confidence: MEDIUM` (per ROADMAP line 317 SUMMARY mandate)
- ADD inline `> ⚠️ MEDIUM confidence` blockquote at TOP of file (Phase 55 D-16 inline-blockquote-precedent + Phase 52 D-01 freshness-caveat dual-surface pattern)

This produces a dual-surface MEDIUM-confidence contract: frontmatter + inline blockquote. Different from Phase 55 D-16 which is inline-only — the dual-surface choice is justified by ROADMAP's explicit "surface in runbook frontmatter" phrasing combined with Phase 52 D-01's dual-surface precedent for similar caveat semantics.

**Why 4B/4C/4D rejected:**
- F-4B-01 HIGH (recommendation-bias — REQ DRIFT-04 is neutral on preference; 4B's "recommend PowerShell escrow" injects Microsoft preference not in REQ)
- F-4C-01 MED (per-third-party-tool callout pattern requires enumerating beyond Quest, scope-creep)
- F-4D-01 CRIT (REQ scope-undershoot — DRIFT-04 line 75 enumerates 3 approaches; 4D documents only 2 + advisory mention)

**Token discipline:** Phase 56 uses `> ⚠️ MEDIUM confidence` (warning shape) — DIFFERENT from Phase 55 D-16's `> 📋 Community pattern — MEDIUM confidence` (community-pattern shape). Per D-16 NEGATIVE regression-guard, V-55-17 NEGATIVE regression-guard ("zero bare `> 📋` without `Community pattern` qualifier") is preserved — Phase 56's `> ⚠️` token is in a different lexicon family.

---

## Adversarial Review Summary

| Gray Area | Finder pts (raw) | Adversary disproves | Referee rejects (-2x penalty) | Final winner |
|---|---|---|---|---|
| GA-1 | 133 (across 4 options) | F-1A-02 (7), F-1B-02 (7), F-1D-02 (7) — full + 4 partials | F-1A-02 rejected (-14) | **1B-modified** (12pts) |
| GA-2 | 128 | F-2B-01 (10), F-2B-02 (10), F-2B-03 (7), F-2D-01 (7) — full + 6 partials | F-2B-01/02/03 ALL rejected (-54) | **2A** (4pts) |
| GA-3 | 114 | F-3A-04 (1) full + 4 partials | (none — 1 partial mislabel-corrected) | **3A** (7pts; corrected) |
| GA-4 | 90 | F-4D-02 (7) full + 6 partials | (none rejected) | **4A-extended** (4pts) |

**Adversary net: -45 pts** (3× wrong disproves on F-2B fold-mandate cluster fatal at -54pt 2x penalty, partially offset by upheld disproves and partial-severity adjustments).

---

## Decisions Carried Forward to CONTEXT.md

22 D-NN decisions locked across:
- **D-01..03** GA-1 winner + DRIFT-03 firewall + frontmatter contract
- **D-04..08** GA-2 winner + DRIFT-04/05/06/07 fold + literal-token coverage
- **D-09..10** GA-3 winner + v1.2 anti-deletion contract
- **D-11..13** GA-4 winner + 3-option enumeration + Quest-once mention
- **D-14..15** Cross-platform inline blockquote inheritance
- **D-16..17** MEDIUM-confidence dual-surface contract
- **D-18..21** Validator scope (28-32 V-56-NN assertions) + commit atomicity
- **D-22..23** Plan-level ordering + 7-plan decomposition

---

## Deferred Ideas (Captured for Later)

- Microsoft Graph `exportJobs` deep-dive (plan-time L2-facing depth decision)
- Quest On Demand Migration tutorial (third-party scope-creep)
- macOS-specific drift detection alternatives (DEPP / Munki / Jamf — out of v1.5)
- Linux drift detection (out of v1.5 scope)
- v1.2 doc deprecation lifecycle (Phase 60/61 milestone-close)
- Retroactive `last_verified` normalization for v1.0–v1.4.1 (Phase 48/60 sweep ownership)
- Cross-tenant device-license re-assignment (out of scope per REQUIREMENTS.md line 115)

---

*Phase: 56-drift-detection-tenant-migration*
*Discussion log: 2026-04-29*
*Methodology: Wave-of-3 adversarial review per user request — 16 candidate options scored across 4 gray areas; 84 raw defects, 14 confirmed-real winning-option points*
