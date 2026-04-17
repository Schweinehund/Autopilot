# Phase 29: iOS Admin Setup — BYOD & MAM - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `29-CONTEXT.md` — this log preserves the alternatives considered and the adversarial-review reasoning.

**Date:** 2026-04-16
**Phase:** 29 — ios-admin-setup-byod-mam
**Discussion mode:** interactive with adversarial-review applied per user request
**Areas discussed:** Callout patterns for unsupervised/BYOD; Overview + file organization; Device Enrollment guide scope (ABYOD-01); MAM-WE standalone structure (ABYOD-03). Account-driven User Enrollment decisions emerged within the Callout patterns and Device Enrollment discussions.

---

## Adversarial Review Protocol

At the user's direction, each gray-area sub-choice was evaluated via the adversarial-review pattern:

1. **Finder** — cataloged flaws per candidate option (152 flaws: 21 CRITICAL, 86 MEDIUM, 45 LOW)
2. **Adversary** — challenged each flaw (disproved 17 cleanly; 21 ruled partial; balance confirmed)
3. **Referee** — adjudicated and issued final winner per sub-choice with cross-coherence and residual-risk analysis

The recommendation per sub-choice below reflects the Referee's verdict mapped back to the original option list, with synthesis notes where the Referee departed from the candidate set.

---

## Area 1: Callout Patterns for Unsupervised/BYOD

### Sub-choice 1a — Privacy callout format & placement (ABYOD-02)

| Option | Description | Selected |
|---|---|---|
| 1a-A | New 🛡️ blockquote parallel to supervised-only, inline per-capability | |
| 1a-B | Same 🔒 emoji with "IT cannot..." wording | |
| 1a-C | Dedicated top-of-doc "What IT Cannot See or Do" section, bullet list, no inline | |
| 1a-D | HYBRID top-of-doc summary + inline callouts | ✓ (synthesized) |

**Referee verdict:** 1a-D hybrid, with the inline format constrained to plain blockquote (no new glyph). This synthesis emerged because all four original options had either a glyph-lexicon violation (1a-A, 1a-B) or a deep-link-bypass risk (1a-C). 1a-D structurally wins but requires the inline format to be plain text per D-02.

**Key disproofs:** 1a-A F2 (density is intended per SC #2), 1a-C F3 (ABYOD-02 scoping is correct by REQUIREMENTS), 1a-D F1 (Phase 28 D-12/D-13 actually validates hybrid patterns — Finder had precedent backwards).
**Key confirmations:** Phase 27 D-03 locks 🔒 pattern; 1a-A and 1a-B both violate the lexicon lock.

### Sub-choice 1b — Inverse/unsupervised capability signal

| Option | Description | Selected |
|---|---|---|
| 1b-A | Inverse 🔓 callouts inline in every guide | |
| 1b-B | Silent — cross-check enrollment overview table, with contrastive prose inline where needed | ✓ |
| 1b-C | Capability Boundaries summary table near top of each BYOD guide | |
| 1b-D | Reuse 🔒 inverse-flipped ("Not available on unsupervised devices") | |

**Referee verdict:** 1b-B. Enrollment overview's comparison table already enumerates per-path scope (Adversary win on F2). Contrastive inline prose (not a new callout class) suffices where a reader might expect an ADE-only feature.

**Key disproof:** 1b-B F2 (overview table does enumerate scope).
**Key confirmations:** 1b-A and 1b-D both extend/overload the 🔒 lexicon (Phase 27 D-03 violation).

---

## Area 2: Overview + File Organization

### Sub-choice 2a — Overview page restructure

| Option | Description | Selected |
|---|---|---|
| 2a-A | Rewrite 00-overview.md to cover ALL iOS admin paths | ✓ |
| 2a-B | Keep ADE-centric overview; add separate 07-byod-overview.md | |
| 2a-C | Split into admin-setup-ios/ + admin-setup-ios-byod/ directories | |
| 2a-D | Keep 00-overview.md as-is; append BYOD section | |

**Referee verdict:** 2a-A. `applies_to: ADE` is updatable (Adversary win on F1); D-12 of Phase 27 does not forbid restructure. 2a-C was the strong close-second but creates Phase 30 linking churn. 2a-D fails — title mislabels BYOD content, Mermaid falsely chains BYOD into ADE sequence.

**Key disproofs:** 2a-A F1 (frontmatter updatable), 2a-C F1/F2/F4 (sibling directory technically feasible but creates churn).
**Key confirmations:** 2a-D F1/F2 (title + Mermaid mislabeling is fatal).

### Sub-choice 2b — MAM-WE file location

| Option | Description | Selected |
|---|---|---|
| 2b-A | Keep MAM-WE in `docs/admin-setup-ios/` with standalone framing | ✓ |
| 2b-B | New `docs/mam-we-ios/` directory | |
| 2b-C | New `docs/mam/` cross-platform-ready directory | |
| 2b-D | New `docs/admin-setup-mam/` | |

**Referee verdict:** 2b-A. SC #3 standalone-ness is enforced via content rules (no required MDM cross-reads), NOT filesystem isolation. Separate directories (2b-B/C/D) create Phase 30 runbook link churn and set fragmented naming precedents. "MAM-WE" is Microsoft's canonical term (Adversary win on 2b-B F2).

**Key disproof:** 2b-B F2 (canonical term, not jargon).
**Key confirmations:** 2b-C Android out-of-scope anticipation; 2b-D capability/platform axis conflation.

### Sub-choice 2c — File numbering scheme

| Option | Description | Selected |
|---|---|---|
| 2c-A | Sequential 07/08/09 in existing dir | ✓ (with slot-10 renumber note for deferred config-failures) |
| 2c-B | New sub-dir with own 01/02/03 restart | |
| 2c-C | Named files without numbers | |
| 2c-D | Decimal grouping: 07/08 + 01 in new MAM dir | |

**Referee verdict:** 2c-A with explicit renumber note. Sequential continuation from Phase 28's 04/05/06 is the only convention-consistent choice. Phase 28 D-21's soft reservation of slot 07 for config-failures must be renumbered to slot 10 in PLAN.md.

**Key disproof (refined by Referee):** 2c-A F3 / 2c-D F2 partially held (D-21 tentatively expected slot 07) — addressed by explicit renumbering to slot 10.
**Key confirmations:** Numbering convention across 118 docs; 2c-C would break it.

---

## Area 3: Device Enrollment Guide Scope (ABYOD-01) — decisions also covering broader ABYOD-01/02/03 scope boundaries

### Sub-choice 3a — End-user click-path depth (ABYOD-01)

| Option | Description | Selected |
|---|---|---|
| 3a-A | Admin-focused; end-user summarized in one compact section | |
| 3a-B | Full step-by-step for both flows (no screenshots) | |
| 3a-C | Admin prereqs + concise walkthroughs + Phase 30 runbook pointers | ✓ |
| 3a-D | Company Portal detailed; web-based as deltas | |

**Referee verdict:** 3a-C. REQUIREMENTS out-of-scope table explicitly excludes click-path documentation (kills 3a-B). Adversary correctly disproved Finder's assumption that SC #1 requires step-by-step. Phase 28 D-22 established the Phase 30 placeholder pattern — forward-references to Phase 30 runbooks are accepted practice.

**Key disproof:** 3a-C F1 (forward-ref to Phase 30 is an established pattern, not a dead link).

### Sub-choice 3b — "Capabilities without supervision" documentation (SC #1)

| Option | Description | Selected |
|---|---|---|
| 3b-A | Explicit table at top of ABYOD-01 | ✓ |
| 3b-B | Inline callouts per feature | |
| 3b-C | Dedicated final section before See Also | |
| 3b-D | Short intro + ✓/✗ bullet list | |

**Referee verdict:** 3b-A. Top-of-guide table serves deep-link readers (Adversary win on F2). Capability-level granularity is distinct from the enrollment overview's per-path scope — manageable drift.

**Key disproof:** 3b-A F2 (top-of-guide placement reaches deep-link readers).

### Sub-choice 3c — Enrollment restrictions coverage

| Option | Description | Selected |
|---|---|---|
| 3c-A | Document inline in ABYOD-01 only | |
| 3c-B | Shared section in 00-overview.md (restructured per 2a-A) | ✓ |
| 3c-C | Separate reference doc `docs/reference/ios-enrollment-restrictions.md` | |
| 3c-D | Brief in BOTH ABYOD-01 and ABYOD-02 with cross-links | |
| 3c-E | Defer to Phase 30 runbooks entirely | |

**Referee verdict:** 3c-B. Enrollment restrictions are shared between ABYOD-01 and ABYOD-02; the overview is being restructured anyway (2a-A) so hosting the shared section there has no extra cost. 3c-D creates drift; 3c-C pre-empts Phase 32 reference-doc decisions; 3c-E architectural misassignment of preventive config to reactive runbooks.

**Key confirmation:** 3c-E F1 critical (config topic ≠ runbook topic).

### Sub-choice 3d — Profile-based UE deprecation handling

| Option | Description | Selected |
|---|---|---|
| 3d-A | Brief callout in ABYOD-01 with pointer to ABYOD-02 | |
| 3d-B | Dedicated section in ABYOD-02 only | ✓ |
| 3d-C | Mention in both guides with cross-link | |
| 3d-D | Single paragraph in 00-overview, all guides cross-ref | |

**Referee verdict:** 3d-B. Profile-based UE is a User Enrollment topic — placing it in ABYOD-01 would be topic-bleed. Tiered depth (1-line in lifecycle overview + dedicated section in ABYOD-02) is appropriate tier-split per Adversary's correct challenge.

**Key disproof:** 3d-B F1 (partial — different tiers CAN have different depths).

---

## Area 4: MAM-WE Standalone Structure (ABYOD-03)

### Sub-choice 4a — Three-level data protection framework depth

| Option | Description | Selected |
|---|---|---|
| 4a-A | Full per-level setting lists with What-breaks callouts at each level | |
| 4a-B | Summary table + Microsoft Learn deep link | |
| 4a-C | Summary table + detailed Level 2 only | ✓ (expanded to Level 2 AND Level 3) |
| 4a-D | Full L1/L2 + brief L3 | |

**Referee verdict:** Modified 4a-C — summary table + detailed sections for BOTH Level 2 (typical default) AND Level 3 (regulated industries). Level 1 gets summary table only + Microsoft Learn link. This correction addresses the Finder's valid concern that L3 is where misconfiguration consequences are highest.

**Key confirmation:** 4a-C F1 confirmed (arbitrary prioritization) — remedied by including Level 3.

### Sub-choice 4b — Enrolled-vs-unenrolled targeting coverage

| Option | Description | Selected |
|---|---|---|
| 4b-A | Full both-modes coverage with decision guidance | ✓ |
| 4b-B | Focus on unenrolled; mention enrolled briefly | |
| 4b-C | Decision flowchart/table + per-mode sections | |
| 4b-D | Single "Targeting" section with compact table | |

**Referee verdict:** 4b-A. SC #3 literal text requires "targeting enrolled vs unenrolled devices" — both modes. Adversary correctly disproved 4b-A F1.

**Key disproof:** 4b-A F1 (SC #3 requires both modes by text).

### Sub-choice 4c — iOS-specific boundary

| Option | Description | Selected |
|---|---|---|
| 4c-A | Strictly iOS — no Android references | ✓ |
| 4c-B | iOS-first + "Android parallels" in See Also | |
| 4c-C | iOS primary + per-section "iOS-specific" callouts | |
| 4c-D | Cross-platform with iOS emphasis | |

**Referee verdict:** 4c-A. REQUIREMENTS ABYOD-03 explicitly says "iOS-specific behaviors"; Android MAM is out-of-scope (deferred to PLAT-01/ADDTS-01). Adversary correctly disproved both F1 and F2 flags on 4c-A.

**Key disproofs:** 4c-A F1/F2 (strict iOS matches REQUIREMENTS; future Android doc will have its own scaffolding).
**Key confirmation:** 4c-D F1 CRITICAL (violates Android out-of-scope rule).

### Sub-choice 4d — Selective wipe coverage

| Option | Description | Selected |
|---|---|---|
| 4d-A | Full dedicated section (trigger, scope, verification, single MDM contrast sentence) | ✓ |
| 4d-B | Brief subsection within policy assignment | |
| 4d-C | "Wipe & Deprovisioning" section at end of guide | |
| 4d-D | Inline mention + dedicated callout/box on wipe scope | |

**Referee verdict:** 4d-A, modified: MDM contrast is a single sentence only (not a subsection or comparison table). SC #3 standalone-ness requires avoiding MDM context drag, but a single contrast sentence disambiguates MAM selective wipe from MDM device wipe — exactly the minimum needed for SC #4 "from the guide alone."

**Key disproof:** 4d-A F1 (contrast sentence ≠ MDM context drag).
**Key confirmation:** 4d-B F1 CRITICAL (buried subsection fails SC #4).

---

## Cross-Coherence Couplings (from Referee)

1. **1a + 4d:** Privacy callouts (ABYOD-02) and selective-wipe contrast sentence (ABYOD-03) both use plain blockquote format; no new emoji/glyph parallel to 🔒.
2. **2a + 2c + 3b + 3c:** Overview restructure (2a-A) hosts capability-scope intro, enrollment restrictions (3c-B), and BYOD path selector. Mermaid grows to cover BYOD; prereqs split ADE-path vs BYOD-path.
3. **3c boundary + 1a scope:** Privacy-limits-language stays in ABYOD-02 only; ABYOD-01 uses capability-scope table + contrastive prose.
4. **2a + 2b:** Overview restructure + keeping MAM-WE in `admin-setup-ios/` — standalone-ness enforced by content rules, not directory split.
5. **4b + 4d:** Dual-mode targeting (enrolled/unenrolled) must introduce enrolled-mode concept in ABYOD-03 without requiring ADE/Device Enrollment guide reading.

## Residual Risks (watch-items for planner)

- Privacy callout convention must be added to `admin-template-ios.md` per D-05, else drift in future BYOD docs.
- Slot 07 reservation conflict — PLAN.md must explicitly renumber Phase 28 D-21's deferred config-failures to slot 10.
- MAM-WE guide scope creep to Android is tempting (Microsoft's own MAM-WE docs are cross-platform); reviewer must enforce iOS-only boundary.
- ABYOD-01 dual coverage (Company Portal + web-based) must not become bimodal-confusing — structure with decision point first, parallel per-flow sections.
- Overview Mermaid restructure is a high-visibility change — careful review needed before/after.

## Claude's Discretion Areas (consolidated)

- Exact title for restructured overview
- Mermaid visual approach (extended single diagram vs matrix + mini-diagrams)
- Word counts per guide (target 300-500 lines; MAM-WE may run longer)
- Which specific capabilities populate the ABYOD-01 capability table
- Exact wording of privacy-limit callouts
- Whether to include a "Choosing Your iOS Admin Path" subsection
- Configuration-Caused Failures table contents per guide

## Deferred Ideas (captured for future phases)

- Config-failures consolidation (slot 10) — Phase 30 or Phase 32
- Android MAM-WE coverage — future milestone PLAT-01
- Shared iPad deep-dive — future SIPAD-01
- iOS MAM-specific L1/L2 runbooks — future ADDTS-01
- Apple Configurator 2 guide — explicitly out of scope
- Retrofit of Phase 27/28 See Also sections — Phase 32 scope
- Glossary additions — Phase 32 NAV-01
- `ios-capability-matrix.md` — Phase 32 NAV-03
