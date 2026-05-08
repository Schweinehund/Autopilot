# Phase 52: Linux L2 Investigation Runbooks 24–25 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-27
**Phase:** 52-linux-l2-investigation-runbooks-24-25
**Areas discussed:** Runbook 24 log-collection structure, Runbook 25 multi-trap structure, LOW-MEDIUM confidence caveat surface depth, L2 actor-boundary framing + L1→L2 cross-link surface (coupled)
**Methodology:** Adversarial review (Finder / Adversary / Referee scored pattern; user requested via /adversarial-review command on each candidate option in each gray area)

---

## Pre-Discussion: Boundary + Carry-Forwards Stated

User invoked `/gsd-discuss-phase 52 --chain` with no prior CONTEXT.md and no plans yet. Init returned `phase_found: true`, `phase_dir: null` (created later at `.planning/phases/52-linux-l2-investigation-runbooks-24-25/`). DISCUSS_MODE = `discuss` (default). Phase 51 closed PASSED 2026-04-27 per 51-VERIFICATION.md (25/25 V-51-NN, 5/5 SCs, 5/5 LIN reqs).

Locked carry-forwards stated to user before gray-area selection (NOT in scope for adversarial review):
- Frontmatter contract (audience: L2 + platform: Linux + 60-day cycle per P48 C10)
- DPO-01 (Phase 51): L2 cross-links L1 cause anchors as locked surfaces
- DPO-02 (Phase 51): Read-vs-write apt distinction propagates to L2
- PITFALL-7 whitelist-first cascade (Phase 49)
- Append-only contract for `00-index.md` (P42 D-03)
- Validator scope: full V-52-NN + single atomic commit (P51 4C precedent + DPO-07)
- Mermaid `classDef` styling: `fill:#28a745` resolved-green / `fill:#dc3545` escalateL2-red

---

## Question 1 (initial gray-area selection)

**Question:** "Phase 52 has 4 gray areas worth weighing in on. Which should we discuss?"
**Format:** AskUserQuestion (multiSelect: true)

| Option | Description | Selected |
|--------|-------------|----------|
| Runbook 24 log-collection structure | (a) Confidence-tiered table mirroring Android L2 18 [recommended]; (b) iOS-style friction-ordered single flow; (c) Windows-style sequential single-method narrative; (d) Symptom-routed sub-table | ✓ |
| Runbook 25 multi-trap structure | (a) Anchor-indexed H2-per-trap mirroring P51 D-09 + L1 Runbook 25 precedent [recommended]; (b) Flat investigation sequence; (c) Pattern A/B/C per-mode; (d) Symptom-driven sub-runbook split | ✓ |
| LOW-MEDIUM confidence caveat surface depth | (a) Top-level Confidence Posture H2 + per-row Confidence column [recommended]; (b) Inline blockquote at each path reference only; (c) Per-row table column only; (d) Frontmatter-level confidence flag only | ✓ |
| L2 actor-boundary framing + L1→L2 cross-link surface (coupled) | (i) Actor: plain command tables [recommended] vs hybrid vs new L2 framing vs L1-style; (ii) Cross-link: top-of-runbook table [recommended] vs inline-only vs both | ✓ |

**User's choice:** All 4 selected.
**Notes:** User added directive: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning." User's max-effort preference (per saved memory: "User wants maximum thoroughness on all project work") aligned with adversarial-review depth used in Phase 51.

---

## Adversarial Review — Finder Phase

**Scoring:** +1 LOW / +5 MED / +10 HIGH / +10 CRIT per defect.

**Coverage:** 4 gray areas × 19 candidate options + 1 coupling column = 86 enumerated defects across 19 columns.

**Total Finder raw score:** 275 points (7 CRIT + 6 HIGH + 18 MED + ~55 LOW).

**CRITICAL clusters identified by Finder:**
- GA-1 Option 1D (DPO-01 contract violation + 50+ V-52-NN check explosion)
- GA-2 Option 2C (PITFALL-1 mode-axis token regression vs V-51-07 + SC#2 mismatch)
- GA-2 Option 2D (LIN-12 file-name lock at REQUIREMENTS.md:154 + validator scope bloat)
- GA-3 Option 3D (SC#1 verbatim wording violation + invisible caveat)

**HIGH clusters:**
- 2C-3 (validator-impossible regex)
- 2D-2/2D-3 (REQUIREMENTS.md traceability lock + V-52-NN ~2x complexity)
- 3D-2 (PITFALL-7 frontmatter reader-invisible)
- 3D-3 (path-specificity loss)
- 4i-D-1 (audience contract violation — `> **Say to the user:**` is L1-specific per V-51-24)

**Strongest options (lowest defect scores) — likely-survivors after Adversary challenge:**
- GA-1 Option 1A (6 defects, 0 CRIT)
- GA-2 Option 2A (4 LOW only)
- GA-3 Option 3A (5 LOW only) and 3B (3 LOW only)
- GA-4-i Option 4i-A (3 LOW)
- GA-4-ii Option 4ii-A or 4ii-B (3 LOW each)

---

## Adversarial Review — Adversary Phase

**Scoring:** +score for correct disprove; -2x score for wrong disprove.

**Strategy:** Aggressive on apparent-winner defects (1A) where collapse defends recommended winner; conservative on CRIT/HIGH defects (zero-cost-to-confirm).

**Disproves attempted:** 7 (3 MED + 4 LOW; best case +19, worst case -38).

| Defect ID | Severity | Verdict | Reasoning |
|-----------|----------|---------|-----------|
| 1A-1 | MED (+5) | DISPROVED | Matrix shape is populated, not empty. PITFALL-7 targets feature-stub debt, not narrow-but-honest matrices. `[LOW-MEDIUM]` confidence on file paths SURFACES narrowness — opposite of PITFALL-7 violation. |
| 1A-2 | MED (+5) | DISPROVED | SC#1 mandates the caveat literal, not exclusivity. Matrix-cell shape can carry confidence token AND blockquote. Phase 51 layered defense (V-51-09/V-51-18 + V-51-19) is the precedent for multi-anchor caveats. |
| 2A-2 | LOW (+1) | DISPROVED | SC#2 trap families ARE causes — kernel HWE/GA, snap-vs-deb, service-state each map to observable error states with discrete fixes (PITFALL-3, PITFALL-4). 25-android-compliance-blocked.md:35 "Causes are independently diagnosable" framing transfers. |
| 2A-3 | LOW (+1) | DISPROVED | DPO-04 inheritance is GLOSSARY-anchor consumption (V-51-23), not cause-shape pattern. Runbook 33 single-cause is L1-specific (single failure mode). Multi-cause shape transfers from L1-25, not from L1-33. |
| 3A-1 | LOW (+1) | DISPROVED | Phase 51 layered defense (V-51-09 tree-level + V-51-18/V-51-19 runbook-level) IS the precedent. Anti-Pattern 1 targets cause-topology cross-tier duplication, not within-doc layered confidence. |
| 3A-3 | LOW (+1) | DISPROVED | Validator string-pinning prevents drift between layers (V-51-19 negative-regression-guard pins literal phrases). Drift surface mitigated, not amplified. |
| GA-4-COUP-2 | MED (+5) | DISPROVED | Phase 52 audience is L2; SSH/journalctl/Intune Remediations are L2-direct equivalents. L1→L2 hand-off handled by DPO-01 cross-link, not actor framing. Coupling defect assumes L1 framing. |

---

## Adversarial Review — Referee Phase

**Scoring:** +1 correct / -1 incorrect per ruling.

**Rulings:** 6 ADOPTED / 1 REJECTED (GA-4-COUP-2 retained as REAL ISSUE).

| Disprove ID | Severity | Verdict | Reasoning |
|-------------|----------|---------|-----------|
| 1A-1 | MED | **ADOPTED** | PITFALLS.md:11-31 (PITFALL-7) targets DEFER-08 cell-copy duplication, not narrow but populated matrices. PITFALL-1 "Looks Done But Isn't" checklist (line 394) explicitly mandates "explicit 'Not supported' cells, not blank cells." Matrix shape with `[LOW-MEDIUM]` confidence on file paths surfaces narrowness honestly — opposite of PITFALL-7 violation. |
| 1A-2 | MED | **ADOPTED** | ROADMAP:222 SC#1 mandates "carries a `> LOW-MEDIUM confidence` freshness caveat" — requires the caveat literal but does NOT specify matrix-cell EXCLUSIVE OR blockquote. Phase 51 V-51-09/18/19 layered defense precedent (51-CONTEXT D-04) explicitly endorses multi-anchor confidence pinning. |
| 2A-2 | LOW | **ADOPTED** | ROADMAP:223 SC#2 enumerates traps as observable error states with discrete fixes. 25-android-compliance-blocked.md:35 precedent ("Causes are independently diagnosable") covers exactly this shape. Finder framing of "trap families ≠ causes" was a category error. |
| 2A-3 | LOW | **ADOPTED** | Phase 51 DPO-04 (51-CONTEXT:142) is "Phase 58 4-platform comparison Linux row inherits CA-row wording" — purely glossary-anchor / wording inheritance, NOT cause-shape pattern transfer. Multi-cause shape inheritance for Phase 52 transfers from L1-25, NOT from Runbook 33. Finder conflated DPO-04 (CA row wording) with DPO-02 (anchor consumption). |
| 3A-1 | LOW | **ADOPTED** | 51-CONTEXT:34 D-04 explicitly states layered defenses are not duplication. V-51-09 + V-51-18 + V-51-19 = three-layer enforcement. Anti-Pattern 1 scopes to cross-tier cause-topology duplication, not within-doc layered confidence framing. |
| 3A-3 | LOW | **ADOPTED** | check-phase-51.mjs V-51-19 literally pins `"Require device to be marked as compliant"` — preventing drift. 51-CONTEXT:88 D-21 confirms hardcoded H2/anchor strings pinned in BOTH validator and CONTEXT.md. Pinning IS the anti-drift surface. |
| GA-4-COUP-2 | MED | **REJECTED (Finder defect REAL — coupling defect retained)** | GREP-EVIDENCE: `> **Say to the user:**` appears 0 times across all 23 existing L2 runbooks. Pattern is exclusively L1 (Phase 30 D-10, Runbook 22:31, V-51-24 anchored to `audience: L1`). Phase 52 V-51-24-equivalent regex on L2 runbooks 24/25 would be a net-new audience-contract import. The L2 audience writes for the L2 engineer themselves running commands — not narrating to a user. DPO-01 cross-link consumes anchors, not framing patterns. The coupling defect is real: GA-4-i actor-framing winner MUST be L2-direct AND GA-4-ii L1-cross-link surface MUST be reference-only — together, not separately. |

**Net surviving defect score:** 261 points (275 − 14 from 6 ADOPTED disproves) across 80 confirmed defects.

---

## Per-GA Final Winners

### GA-1: Runbook 24 (log collection) structure

**Winner: Option 1A** — matrix-cell + adjacent blockquote layered freshness caveat (Decision-Matrix-with-method-sections shape mirroring 18-android-log-collection.md / 14-ios-log-collection.md).

**Net surviving:** 0–1 (lowest score; only minor LOW residue after Adversary disproves of 1A-1 + 1A-2).

**Reasoning:**
- Structurally faithful to ROADMAP:222 SC#1 literal "carries a `> LOW-MEDIUM confidence` freshness caveat" (blockquote token).
- Inherits Phase 51 V-51-09/18/19 layered-defense precedent (51-CONTEXT D-04).
- Validator V-52-NN feasibility: HIGH (regex pins `> LOW-MEDIUM confidence` near `/var/log/microsoft/intune/`).
- Future-phase cost: minimal (Phase 56 DRIFT-07 inherits without retrofit; Phase 58 4-platform Linux row inherits CA-row wording per Phase 51 DPO-04).
- Inheritance fidelity: PITFALL-1 whitelist-first preserved (matrix only enumerates what IS supported); PITFALL-7 link-not-copy preserved (matrix CELLS link to authoritative `linux-capability-matrix.md`).

**Rejected alternatives:**
- 1B (iOS friction-ordered): 1B-1 CRIT — friction-tier inheritance breakage on zero-friction Linux surfaces (all journalctl/file paths are simultaneously available with no cost).
- 1C (Windows narrative): 1C-1/1C-2 MED — narrative validator-fragility for LIN-12 verbatim-token validation.
- 1D (symptom-routed sub-table): 1D-1 + 1D-2 CRIT — Anti-Pattern 1 cause-topology cross-tier duplication + V-52-NN check explosion (12 anchors → 50+ checks).

### GA-2: Runbook 25 (agent investigation) multi-trap structure

**Winner: Option 2A** — anchor-indexed H2-per-trap shape (3 SC#2-mandated trap families + 1 inherited Phase 50 LIN-05 Identity Broker trap = 4 total).

**Net surviving:** 2 (LOW residue only).

**Reasoning:**
- Direct Phase 51 GA-2A inheritance per 51-CONTEXT D-09 citing 25-android-compliance-blocked.md:35 "independently diagnosable" framing.
- Phase 52 DPO-01 cross-link contract from 51-CONTEXT DPO-01 mandates L1 cause anchors as locked surfaces; same anchor-indexed shape applied to L2 traps gives a symmetric locked-anchor surface for Phase 56/58/59 consumption.

**Rejected alternatives:**
- 2B (flat numbered sequence): 2B-1 MED — SC#2 trap-family detection difficulty in flat sequence; same SC#2 violation as Phase 51 GA-2B rejection.
- 2C (Pattern A/B/C per-mode): 2C-1 + 2C-2 CRIT — PITFALL-1 V-51-07 mode-axis token regression-guard (Pattern A/B/C imports forbidden BYOD/COBO/COPE/COSU/ZTE tokens) + SC#2 orthogonality.
- 2D (sub-runbook split into 25a/25b/25c): 2D-1 CRIT — REQUIREMENTS.md:154 LIN-12 1:1 file-name lock (2 files exactly, not 4).

### GA-3: LOW-MEDIUM confidence caveat surface depth

**Winner: Layered three-surface caveat** — Layer 1 (Decision Matrix table cell with `[LOW-MEDIUM, last_verified YYYY-MM-DD]` confidence token) + Layer 2 (adjacent `> **Source confidence:**` blockquote with literal `LOW-MEDIUM confidence` token) + Layer 3 (per-line per-command-snippet confidence-token at file-path references).

**Net surviving:** 0 (all 5 LOW defects of 3A; 3 LOW of 3B; 2 MED + 2 LOW of 3C; 2 HIGH + 1 CRIT + 1 MED + 1 LOW of 3D rejected).

**Reasoning:**
- Phase 51 V-51-09/18/19 three-layer PITFALL-2 enforcement precedent transfers verbatim.
- Validator V-52-06 + V-52-07 + V-52-08 pin all three layers; drift between layers caught by string-pinning (3A-3 ADOPTED reasoning).

**Rejected alternatives:**
- 3B (inline blockquote only): 3 LOW — single layer of defense; future-phase contract weakness when content phases reproduce file paths in their own layers.
- 3C (per-row column only): 3C-1 MED — SC#1 verbatim wording gap (Android-shape token-in-cell ≠ blockquote literal); 3C-2 MED — column-scoped regex fragility.
- 3D (frontmatter-only): 3D-1 CRIT — SC#1 verbatim wording violation (frontmatter ≠ blockquote); 3D-2/3D-3 HIGH — PITFALL-7 reader-invisible + path-specificity loss.

### GA-4-i: L2 actor framing

**Winner: Option 4i-A** — L2-direct framing; numbered-list commands without `> **Say to the user:**` blockquote.

**Net surviving:** 0.

**Reasoning:**
- **GREP-EVIDENCE: `> **Say to the user:**` appears 0 times across all 23 existing L2 runbooks** (`docs/l2-runbooks/01..23-*.md`).
- Audience contract preserved (V-51-24 anchored to `audience: L1`; net-zero L1-pattern import).
- Mirrors 02-esp-deep-dive.md / 19-android-enrollment-investigation.md L2 narrative pattern (numbered investigation steps + Resolution sections).

**Rejected alternatives:**
- 4i-B (hybrid): 3 LOW — validator complexity (regex impossible to distinguish L2-direct vs user-coordinated steps); author judgment surface fuzzy.
- 4i-C (new `> **L2 commands:**` framing): 4i-C-1 MED — net-new pattern with no precedent; Phase 52 becomes precedent-setter; future-phase obligation cost.
- 4i-D (L1-style `> **Say to the user:**` everywhere): 4i-D-1 HIGH — audience contract violation (V-51-24 anchored to L1); applying to L2 implies L2 never operates directly on the device.

### GA-4-ii: L1→L2 cross-link surface

**Winner: Option 4ii-A** — reference-only L1 deep-link consumption (per-Trap "Escalated from L1?" reference blocks consuming Phase 51 cause anchors as immutable surfaces).

**Net surviving:** 0.

**Reasoning:**
- Phase 51 DPO-01 contract (51-CONTEXT DPO-01:139) explicitly mandates Phase 52 treats L1 cause anchors as locked surfaces; reference-only consumption preserves Anti-Pattern 1 (no cause-topology cross-tier duplication).
- 19-android-enrollment-investigation.md "From L1 escalation?" block (line 19-25) is the canonical precedent.

**Rejected alternatives:**
- 4ii-B (inline-only): 3 LOW — no top-of-runbook landing pad for L1-escalated tickets; loses Phase 51 V-51-22 analog cross-link discoverability surface.
- 4ii-C (both top + inline): 4 LOW — Anti-Pattern 1 within-doc duplication risk + 2x maintenance cost on every L1 anchor rename + reader navigation noise.

### GA-4 Coupling

**GA-4-COUP-2 [MED, 5pts] retained:** Adversary's claim that Phase 52 L2-audience scoping eliminates coupling was REJECTED on grep-evidence (0 occurrences of L1-pattern across existing L2 corpus). Coupling defect retained: actor-framing winner (4i-A) MUST pair with cross-link surface winner (4ii-A) — together, not separately. CDI-Phase52-05 codifies the coupling.

---

## Claude's Discretion (CD-NN)

Per Phase 52 CONTEXT.md `<decisions>` section, the following are areas where the user said "you decide" or where adversarial review surfaced multiple equally-valid sub-choices:

- CD-01: Exact wording of Layer 2 `> **Source confidence:**` blockquote
- CD-02: Exact ordering of Trap A/B/C/D in Runbook 25
- CD-03: Section depth in Runbook 24 (Decision Matrix row count, etc.)
- CD-04: Whether Runbook 25 includes top-of-runbook "From L1 escalation?" block OR places references at per-Trap level
- CD-05: Per-Trap body length in Runbook 25 (proportionate to L2-actionable surface depth)
- CD-06: Mermaid usage in Runbook 24/25 (optional, no SC# mandates it)
- CD-07: Whether Runbook 25 Trap D cross-links Phase 50 LIN-05 admin-side OR via glossary anchor
- CD-08: Whether optional L2 callouts use one consistent label or mixed labels

---

## Deferred Ideas

Per Phase 52 CONTEXT.md `<deferred>` section, the following ideas were noted for future phases:

- PITFALL-5 collision-audit graduation/generalization to v1.5 harness (Phase 60 candidate)
- PITFALL-13 false-positive allowlist for V-52-21 negative-assertion edge case (lazy-add per YAGNI)
- C13 broken-link graduation against Phase 52 cross-links (Phase 60)
- Hub navigation extensions (Phase 59 CLEAN-08)
- DEFER-08 4-platform comparison Linux row L2 cells (Phase 58)
- DRIFT-07 Linux drift section (Phase 56)
- v1.5.1 LIN-DEFER-01 Linux Bash custom-compliance deep-dive guide
- L2 actor-framing pattern documentation in CLAUDE.md or contributing guide (long-term)
- PITFALL-3 negative regression-guard re-evaluation at Phase 60 (V-52-09 promotion to v1.5 harness-wide)

---

*End of discussion log. Decisions and reasoning are codified in `52-CONTEXT.md`. This file is for software audit / compliance reference only.*
