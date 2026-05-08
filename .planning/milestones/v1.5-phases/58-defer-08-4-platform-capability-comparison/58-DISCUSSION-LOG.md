# Phase 58: DEFER-08 4-Platform Capability Comparison - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-30
**Phase:** 58-defer-08-4-platform-capability-comparison
**Areas discussed:** Cell content shape + link granularity, Multi-mode platform handling, Windows column source (HIGH RISK), Per-platform matrix cross-ref pattern + Android footer stub
**Method:** User selected all 4 gray areas and instructed: "for each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning". Decisions adjudicated via scored Finder → Adversary → Referee pattern (Opus agents, fresh context per role, total ~308K tokens across all agent calls).

---

## Cell content shape + link granularity (Gray Area 1)

### Cell content shape options

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — Pure link only | `[See: Enrollment](android-capability-matrix.md#enrollment)` | |
| 1B — Verdict + link | `Supported — [details](android-capability-matrix.md#enrollment)` | ✓ |
| 1C — Verdict + 1-line caveat + link | `Partial — Web-app CA only — [matrix](linux-capability-matrix.md#conditional-access)` | |
| 1D — Compact symbol + link | `✅ — [matrix](path)` / `❌ — [matrix](path)` / `⚠️ Mode-dependent — [matrix](path)` | |

**Finder score:** 1A=5, **1B=9 (winner)**, 1C=6, 1D=4
**Adversary disprove:** 1C severity downgraded CRITICAL → MEDIUM (validator regex doesn't enforce prose-length); winner unchanged
**Referee ruling:** PARTIAL on Adversary's severity claim. C12 mechanically only enforces hyperlink presence (regex `/\[.+\]\(.+\)/`); SC#2 "no raw copied content" is human-review enforced. Severity correction confirmed but does NOT change winner — 1B is strictly safer than 1C under both mechanical and prose-review scrutiny.

### Link granularity options

| Option | Description | Selected |
|--------|-------------|----------|
| G1 — File root only | `(android-capability-matrix.md)` | |
| G2 — H2 section anchor | `(android-capability-matrix.md#enrollment)` | ✓ |
| G3 — Row-level anchor | `(android-capability-matrix.md#provisioning-methods)` (PITFALL-15 fragile) | |
| G4 — Mixed (H2 default + row-anchor for hot cells) | | |

**Finder score:** G1=3, **G2=9 (winner)**, G3=2, G4=5
**Adversary disprove:** Tier-1 CA mitigation (link CA cells to `#compliance`) is misleading-by-construction — same defect that disqualified 2B; tier-2 (retrofit `## Conditional Access` H2 into 3 matrices) is correct.
**Referee ruling:** ADVERSARY CORRECT (REAL ISSUE). macOS Compliance H2 (lines 56-66) covers SIP/FileVault/hardware attestation/custom compliance — NO CA-grant content. iOS Compliance H2 mentions "CA grace period applies" inline but no CA-grant rows. Linking CA-row cells to `#compliance` for these platforms creates a category-mismatch and misleading anchor target. SC#1 demands "no column empty or unacknowledged" — tier-1 is acknowledged-but-factually-wrong. **Mandatory tier-2 CA retrofit locked.**

**User's choice:** All 4 gray areas selected for adversarial review. Adversarial outcome accepted as locked decision.
**Notes:** Adversarial review caught a substantive Finder weakness (tier-1 mitigation creates a misleading-link defect that violates the same SC discipline used to demolish option 2B in Gray Area 2). Tier-2 retrofit is materially additive scope (~45-90 lines across 3 sibling matrices) but architecturally honest.

---

## Multi-mode platform handling (Gray Area 2)

| Option | Description | Selected |
|--------|-------------|----------|
| 2A — "Mode-dependent — see matrix" + link | Phase 56 D-14 cross-platform routing pattern inheritance (tiered: unanimous when modes agree) | ✓ |
| 2B — Best-mode verdict | "Supported (COBO)" — admin misjudges fleet | |
| 2C — Most-restricted-mode verdict | "Limited — Work Profile only" — admin overinvests | |
| 2D — Stacked sub-rows in cell | "COBO: yes / BYOD: no" — markdown table cells strip multi-line | |
| 2E — Always link out without summary | Same defects as 1A | |

**Finder score:** **2A=9 (winner)**, 2B=2, 2C=3, 2D=1, 2E=6
**Adversary disprove:** Finder cited Phase 56 **D-08** as cross-platform routing pattern; D-08 is actually "DRIFT-07 fold H2 4-platform encryption coverage". The blockquote/cross-platform routing pattern is **D-14**, not D-08. Substance survives but citation is wrong.
**Referee ruling:** ADVERSARY CORRECT (REAL ISSUE — citation error). Verified at `.planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md:57` (D-08 = encryption coverage) and `:78` (D-14 = blockquote pattern). **Winner stays 2A; citation locked as Phase 56 D-14 in CONTEXT.md (D-07).**

**User's choice:** Adversarial outcome accepted; 2A locked with corrected D-14 citation.

---

## Windows column source — HIGH RISK (Gray Area 3)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — Link to `linux-capability-matrix.md` Windows column | Practical; one-link-per-row consistency; couples to Linux's lens | ✓ (primary) |
| 4B — Link to per-feature `admin-setup-apv1/apv2/` docs | HOW-TO procedure docs, not capability statements (wrong artifact) | |
| 4C — Link to scattered `docs/reference/` docs (`apv1-vs-apv2.md`, `ca-enrollment-timing.md`, etc.) | Variety = inconsistency; some docs are orthogonal | |
| 4D — Hybrid (4A for narrowness rows + 4C for feature rows) | Subjective axis; bikeshed-prone | |
| 4E — Create `windows-capability-matrix.md` first | Scope creep; ROADMAP amendment required | |
| 4F (Adversary alternative) — 4A + footnote-link to `apv1-vs-apv2.md` for APv1/APv2-divergent rows | Inconsistency cost outweighs richness gain (Referee ruled) | ✓ (discretion ≤3 rows) |

**Finder score:** **4A=8 (winner, post-mitigation)**, 4B=3, 4C=4, 4D=5, 4E=6
**Adversary disprove:**
- 4C MEDIUM "C12 wouldn't catch links to `docs/windows-vs-macos.md`" — DISPROVED (validator regex doesn't restrict link targets; verified at `scripts/validation/v1.5-milestone-audit.mjs:526-538`).
- Stronger alternative 4F (linux-matrix Win column for narrowness rows + `apv1-vs-apv2.md` for APv1/APv2-divergent rows) was un-enumerated by Finder.
**Referee ruling:** PARTIAL — Adversary correct on 4C validator-scope misread (+7); FALSE POSITIVE on 4F dominance claim. 4F's inconsistency cost (heterogeneous Windows-cell targets across rows) outweighs APv1/APv2 richness gain. Most rows don't need APv1/APv2 differentiation. **Winner stays 4A as primary; plan-author discretion to footnote-link `apv1-vs-apv2.md` for ≤3 rows where APv1/APv2 divergence dominates (likely: hybrid Entra Join, pre-provisioning, Win10 support cutoff). Comparison doc intro acknowledges Windows-source asymmetry per D-10.**

**User's choice:** Adversarial outcome accepted; 4A primary + bounded 4F discretion locked.

---

## Per-platform matrix cross-ref pattern + Android footer treatment (Gray Area 4)

### Cross-ref pattern

| Option | Description | Selected |
|--------|-------------|----------|
| 5A — Single sentence at end of intro paragraph | Lowest visibility | |
| 5B — Standardized banner blockquote at top | `> **Cross-platform comparison:** For the 5-platform side-by-side, see [4-Platform Capability Comparison](4-platform-capability-comparison.md).` | |
| 5C — Sentence inserted into existing intro paragraph | Most literal SC#3 reading | ✓ |
| 5D — New H2 "Cross-Platform Comparison" | Restructuring violates SC#3 | |

**Finder score:** 5A=6, **5B=9 (winner)**, 5C=3, 5D=2
**Adversary disprove:** 5B fails on TWO grounds —
1. Wrong precedent citation (D-08 vs D-14, same as GA-2 citation error).
2. Pattern domain mismatch — `> **Platform applicability:**` blockquote token appears 18 times in `docs/operations/`, ZERO times in `docs/reference/`. Applying to capability matrices is **precedent extension**, not inheritance.
3. SC#3 reads "intro **updated**" — most literally satisfied by paragraph edit (5A or 5C), not by adding NEW structural element above intro.
4. By Finder's own 5D-rejection logic ("don't add structural elements"), 5B's blockquote-above-intro is also a structural addition.
**Referee ruling:** ADVERSARY CORRECT on all three counts (REAL ISSUE). Grep verified: `> **Platform applicability:**` exists in 18 ops-domain files, 0 reference-domain files. SC#3 verbatim text is "intro updated to cross-reference" — most-literally a paragraph edit. **5B rejected; 5C wins** (sentence inserted into existing intro paragraph).

### Android footer stub treatment

| Option | Description | Selected |
|--------|-------------|----------|
| F1 — Remove footer entirely + intro forward-link | Anchor breakage risk for inbound bookmarks | |
| F2 — Replace footer body with forward-link H2 | Backward-compat preserved via anchor | |
| F3 — Both: remove footer body + intro forward-link + preserve compat shim anchor | Best defense + best signal placement | ✓ |

**Finder score:** F1=6, F2=8, **F3=9 (winner)**
**Adversary:** CONFIRMED — anchor preservation is correct discipline (Phase 57 D-32 inheritance + Phase 45 AEAOSPFULL-09 precedent).
**Referee ruling:** F3 confirmed. SC#3 verbatim ("removed and replaced with a forward-link") most-literally satisfied: body removed, replaced with forward-link in intro, anchor `<a id="deferred-4-platform-unified-capability-comparison">` preserved as compat shim per Phase 45 precedent.

**User's choice:** Adversarial outcome accepted; 5C + F3 locked.

---

## Claude's Discretion

- Specific phrasing of the 5C intro cross-reference sentence — recommended literal provided in CONTEXT.md (D-12); minor per-matrix variation acceptable.
- Order of plans within Phase 58 — plan-author may interleave (CA H2 retrofit / comparison doc cells / sibling intro updates / validator) or fold parallel waves; commit atomicity at plan-series level (D-16) accommodates either.
- Specific row/feature granularity within each H2 of the comparison doc — plan-author derives from the 5 source matrices; when in doubt, mirror per-feature row taxonomy used in `linux-capability-matrix.md`.
- Which 1-3 rows (if any) carry the optional D-09 footnote-prose link to `apv1-vs-apv2.md` — recommended candidates: hybrid Entra Join, pre-provisioning, Win10 support cutoff. Plan-author selects based on ground-truth APv1/APv2 divergence in source matrices.

## Deferred Ideas

- **Dedicated `windows-capability-matrix.md`** — deferred to v1.6+. Phase 58 intro acknowledges deferral path; future creation enables single sed-pass retargeting.
- **Cross-Platform Equivalences supplemental H2 in 4-platform comparison doc** — plan-author discretion (not locked); ROADMAP SC#1 locks only 6 domain H2s.
- **Verdict vocabulary expansion to 6+ states** — defer to v1.6+ retro if 5-state vocabulary proves insufficient in operations.
- **`apv1-vs-apv2.md` promotion to `docs/reference/`** — currently at `docs/`; promotion would unify Windows-internal feature-comparison location with other capability matrices. Candidate for v1.6+ cleanup phase.

## Adversarial Review Audit

**Process:** Finder → Adversary → Referee scored adversarial pattern (Opus agents, fresh context per role).
**Disputes adjudicated:** 6 (one per gray area + sub-options where applicable).
**Finder recommendations modified by ruling:**
1. **GA-1 mitigation tier upgraded** (tier-1 → tier-2 mandatory CA H2 retrofit in 3 matrices)
2. **GA-2 citation corrected** (D-08 → D-14)
3. **GA-4 cross-ref pattern reversed** (5B → 5C)
**Finder recommendations preserved intact:**
1. GA-1 cell shape (1B + G2)
2. GA-2 substance (2A "Mode-dependent + link")
3. GA-3 winner (4A linux-matrix Win column, primary)
4. GA-4 footer treatment (F3 anchor-preserved + body-replaced)
**Adversary's net score:** ~+35-40 of theoretical +90 max (4 substantive wins + 1 partial; 1 overreach loss on 4F dominance claim).
**Cross-area consistency:** verified — all 4 final decisions cohere (verdict vocabulary unified across GA-1 + GA-2; H2-anchor granularity unified across GA-1 + GA-3; SC#3 literal compliance unified across GA-4).
