# Phase 38: Dedicated Devices Admin - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-22
**Phase:** 38-dedicated-devices-admin
**Areas discussed:** Persona + scenario overview shape; MHS exit-PIN sync callout treatment; Phase 36 enrollment-profile cross-reference depth; Android 15 FRP re-provisioning callout
**Method:** Adversarial review (finder/adversary/referee scored pattern) per user request — "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning"

---

## Pre-discussion: Locked Carry-Forward (NOT discussed)

The following were inherited as LOCKED from Phases 34/35/36/37 and not re-opened:

- Tri-portal admin template (Phase 34 D-16..D-22) — Dedicated retains all three H4 sub-sections
- Anti-Pattern 1 guard (Phase 34 D-26) — matrices live in Phase 34 canonical docs
- PITFALL 1/2/3/7/9/11 inheritance
- Phase 36 D-10 anchor stability contract — Phase 38 cross-references `#enrollment-profile`, `#enrollment-token`, `#provisioning-method-choice`, `#android-15-frp`, `#configure-efrp`
- Phase 36 D-05 FRP/EFRP scope split — Phase 38 carries parallel-but-distinct re-provisioning callout; Phase 38 does NOT pre-empt Phase 36 EFRP-config content
- Phase 35 D-23 anchor `#kme-zt-mutual-exclusion` for ZT Samsung note
- Phase 37 D-10/D-11 inline source-confidence markers + regex
- AEAUDIT-04 guards (no SafetyNet, no "supervision", `last_verified` mandatory, no Android links in deferred shared files)
- 60-day review cycle frontmatter
- Frontmatter: `platform: Android`, `audience: admin`, `applies_to: Dedicated`

---

## Gray Area 1: Persona + scenario overview shape (AEDED-01 SC1 + SC5 + PITFALL 7)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Top-of-doc audience banner (compact persona, ~80 words) + scenario comparison table only (~250 words) | |
| 1B | Persona callout in Key Concepts H2 + 4 H3 scenario subsections (per-scenario walkthrough, ~600 words total) | |
| 1C | Persona callout banner + scenario decision tree (numbered or mermaid) + scenario comparison table | |
| 1D | Persona callout in Key Concepts H2 (~150 words) + scenario comparison table + one-paragraph "How to choose" routing note (~400 words total scenarios) | ✓ |

**Adversarial review verdict:** 1D winner (0 CRIT / 3 MED / 1 LOW = weighted 7).
**Decisive flaws on losers:**
- 1A: F-1A-01 (MED, downgraded from CRIT by Referee) banner-only persona underweights LOB owner contribution; F-1A-04 no anchor stability gap; F-1A-06 below word floor.
- 1B: F-1B-01 (CRIT) per-scenario H3 walkthrough creates structural pressure for matrix duplication (Anti-Pattern 1 collision per Phase 34 D-26); F-1B-04 SC5 disambiguation undermined by duplicate multi-app/Entra-shared content.
- 1C: F-1C-01 (MED) decision-tree overlap acknowledged in candidate Cons actively harms SC5 disambiguation; F-1C-02 mermaid maintenance burden raised unconditionally.

**User's choice:** 1D — per Referee recommendation; user selected "Lock all and proceed".
**Notes:** D-01 implements 1D. Mandatory anchor `#audience-and-stakeholders` per D-08. SC5 disambiguation phrasing locked per D-13.

---

## Gray Area 2: MHS exit-PIN sync callout placement & emphasis (AEDED-02 SC2)

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Top-of-doc warning banner ONLY (~60 words, single point of truth) | |
| 2B | Inline callouts at BOTH settings (device restrictions + MHS app config) with reciprocal cross-link | |
| 2C | Dedicated H2 section `## Exit-kiosk PIN synchronization` (~200 words) + inline reminders at both settings | ✓ |
| 2D | Top-of-doc banner + dedicated H2 + inline reminders (triple-placement, max-emphasis) | |

**Adversarial review verdict:** 2C winner (0 CRIT / 2 MED / 1 LOW = weighted 5).
**Decisive flaws on losers:**
- 2A: F-2A-01 (CRIT) PITFALL 2 violation — what-breaks must be inline at point of admin decision, not banner-only; F-2A-02 (CRIT) single-banner skim-skip per Phase 35 D-13 F-039 precedent.
- 2B: F-2B-01 (CRIT) no canonical anchor for Phase 40/41 routing — Phase 36 D-10 anchor contract violation.
- 2D: F-2D-01 (CRIT) Phase 37 D-05 misappropriation — that pattern was for AMAPI's 4 distinct behavioral changes; MHS exit-PIN is one concrete pitfall; triple-placement over-engineered for single-claim content.

**User's choice:** 2C — per Referee recommendation; user selected "Lock all and proceed".
**Notes:** D-02 implements 2C. SC2 lock phrase "configured identically in both" appears in H2 + both inline reminders. Source-confidence marker canonical home at H2 per D-12. MHS scope explicit per D-14 (multi-app + digital signage; not single-app).

---

## Gray Area 3: Phase 36 enrollment-profile cross-reference depth (AEDED-01 SC1, ROADMAP "extends COBO")

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Brief cross-link only (~50 words) — restate nothing; Dedicated-specific deltas inline | |
| 3B | Full restatement (~600 words) — recreate enrollment profile creation steps with Dedicated-flavored callouts; no cross-link | |
| 3C | Hybrid orientation paragraph (~80 words) cross-linking Phase 36 + Dedicated-specific deltas inline (~250 words) — Phase 36 D-01 winner pattern reapplied | ✓ |
| 3D | Full enrollment profile section, no cross-link to Phase 36 (Phase 38 owns Dedicated end-to-end) | |

**Adversarial review verdict:** 3C winner (0 CRIT / 3 MED / 2 LOW = weighted 8).
**Decisive flaws on losers:**
- 3A: F-3A-01..03 ROADMAP "extends COBO" wording violation; admin journey discontinuity for LOB ops persona; 50-word delta orientation under-specifies 4 deltas.
- 3B: F-3B-01 (CRIT) Anti-Pattern 1 hard violation; F-3B-02 (CRIT) Phase 36 D-10 anchor contract abandonment; F-3B-03 (CRIT) doubles drift surface for portal-UI assertions.
- 3D: F-3D-01..03 (3 CRIT) Anti-Pattern 1 + explicit cross-link forbiddance + Phase 36 D-10 anchor contract abandonment + ROADMAP wording violation.

**User's choice:** 3C — per Referee recommendation; user selected "Lock all and proceed".
**Notes:** D-03 implements 3C. Direct reapplication of Phase 36 D-01 winner hybrid pattern. Token expiry default + QR rotation discipline added to deltas per D-09.

---

## Gray Area 4: Android 15 FRP re-provisioning callout (AEDED-03 SC3)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Brief Dedicated-FRP callout (~150 words) + cross-link to Phase 36 #android-15-frp + #configure-efrp | |
| 4B | Full Dedicated-owned FRP H2 section (~500 words) restating Android 15 FRP behavior + EFRP config + 3-pathway behavior | |
| 4C | Dedicated-owned H2 callout section (~300 words) covering ONLY the 3-pathway re-provisioning FRP behavior + cross-link to Phase 36 for EFRP config | ✓ |
| 4D | Inline FRP reminder per scenario H3 (one ~50-word callout in each of 4 scenarios) + no dedicated H2 | |

**Adversarial review verdict:** 4C winner (0 CRIT / 4 MED / 2 LOW = weighted 10). Note: 4A weighted 8 was lower than 4C, but 4C ranks higher on AEDED-03 SC3 verbatim depth + canonical anchor for Phase 40/41 routing (resolving 4A's F-4A-03 anchor gap and F-4A-01 nuance compression).
**Decisive flaws on losers:**
- 4A: F-4A-01 (MED) 3-pathway nuance squeezed too tight at 150 words; F-4A-03 (MED) no H2/anchor for Phase 40/41 routing.
- 4B: F-4B-01 (CRIT) Phase 36 D-05 "no pre-empting" hard violation; F-4B-02 (CRIT) Anti-Pattern 1 violation restating EFRP config.
- 4D: F-4D-01 (CRIT) Anti-Pattern 1 near-violation 4× duplicate; F-4D-02 (CRIT) no canonical anchor for Phase 40/41; F-4D-06 (MED) SC3 "a callout" singular-vs-plural framing risk.

**User's choice:** 4C — per Referee recommendation; user selected "Lock all and proceed".
**Notes:** D-04 implements 4C. Section title `## Android 15 FRP and re-provisioning` per AEDED-03 SC3 verbatim. Section-level "Applies to Android 15+" version-tag per F-4A-02 Referee adjudication (3 pathways are sub-claims of one Android 15 assertion). Source-confidence markers per D-12.

---

## Cross-cutting decisions (closing 13 confirmed F-XCUT gaps)

| F-XCUT | Gap | Closing decision |
|--------|-----|------------------|
| F-XCUT-01 | LOB Operations Owner persona definition undefined | D-05: business stakeholder, NOT Intune RBAC role |
| F-XCUT-02 | No doc-shape lock per Phase 37 D-12 precedent | D-06: 14-section H2 order locked |
| F-XCUT-03 | Length budget envelope undefined for Phase 38 | D-07: 3200-4200 words target |
| F-XCUT-04 | Anchor stability contract for Phase 40/41 undefined | D-08: 11 mandatory anchors |
| F-XCUT-05 | Token expiry research flag not in deltas | D-09: added to D-03 deltas |
| F-XCUT-08 | Platform note banner (ARCH Q6) missing | D-10: mandatory at top of doc |
| F-XCUT-09 | KME/ZT callout placement undefined | D-11: in ZT-provisioning callout per Phase 36 D-06 precedent |
| F-XCUT-10 | Source-confidence marker scope unclear for FRP claims | D-12: applies to MHS exit-PIN AND FRP 3-pathway |
| F-XCUT-13 | Entra shared device mode disambiguation mechanism | D-13: both table cell + routing prose |
| F-XCUT-14 | MHS scope (multi-app vs single-app) | D-14: multi-app + digital signage only; single-app excluded |
| F-XCUT-15 | Phase 39 ZT extension boundary | D-15: Phase 38 does NOT carry corporate-scale ZTE |
| F-XCUT-16 | Research-flag verification protocol | D-16: 6 plan-time verifications listed |
| F-XCUT-17 | Shared-file modification guard | D-17: Phase 36 D-14 / Phase 37 D-16 reapplied |

---

## Disproved flaws (Adversary correct, no decision impact)

The following 25 Finder flaws were disproved by the Adversary and confirmed FALSE POSITIVE by the Referee (with 3 borderline calls confirmed REAL but downgraded to LOW). They had no impact on winner selection:

- F-1A-01 (CRIT → MED downgrade): Banner+table satisfies PITFALL 7 form; underweighting concern remains MED real flaw.
- F-1A-03 (FP): SC1 doesn't impose actor-vs-audience distinction.
- F-1B-02 (FP): H3 scenarios don't structurally force 5×4 matrix duplication.
- F-1B-03, F-1C-03, F-2C-02, F-2D-03, F-3B-04, F-3C-03, F-4B-04 (all FP): Phase 38 has no locked length envelope yet (closed by D-07).
- F-1B-05 (FP): "Scenarios as concepts" is opinion, not constraint.
- F-1D-03 (FP): "How to choose" is part of scenario block, not persona block.
- F-2A-04 (MED → LOW), F-2C-04 (FP): AEAUDIT-04 doesn't audit marker placement; Phase 37 D-11 regex satisfied by ANY occurrence.
- F-2A-05 (FP): 60 words is sufficient for the literal example.
- F-2B-02 (FP): Regex compatibility doesn't break with multiple occurrences.
- F-2B-04 (FP): No "duplicate phrase = flag" rule in AEAUDIT-04.
- F-2D-05 (FP): Phase 42 author-spec mismatch detection is speculative.
- F-4A-02 (MED → LOW): Section-level Android 15 version-tag covers 3 sub-pathway claims.
- F-4A-04 (FP): 4A body explicitly addresses SC3 verbatim.
- F-4C-02 (FP): 4C section title + body explicitly cover SC3.
- F-4C-03 (FP): Phase 36 D-05 designs parallel-but-distinct callouts as the pattern.
- F-4D-06 (REAL — confirmed MED): "An Android 15 FRP callout" anticipates ONE callout for downstream cross-references.
- F-XCUT-06 (FP): PITFALL 7 doesn't mandate separate directory for LOB ops.
- F-XCUT-07 (FP): Phase 38 `applies_to: Dedicated` consistent with Phase 36/37 single-string convention.
- F-XCUT-11 (FP): No-SafetyNet guard is inherited LOCKED, not per-area.
- F-XCUT-12 (FP): Dedicated-vs-iOS-Shared-iPad disambiguation mechanism is glossary + Platform note banner (D-10), not persona callout.

---

## Claude's Discretion

Per CONTEXT.md "Claude's Discretion" section in the `<decisions>` block:

- Exact word counts within section ranges in D-07 (total target 3200-4200 words).
- Whether to include the optional `## For L1 helpdesk agents` H2 (D-06 step 14).
- Mermaid diagram inclusion for scenario decision flow (per Phase 36 D-11 precedent).
- D-10 Platform note banner icon convention (warning vs info).
- D-04 Android 15 FRP H2 ⚠️ blockquote position (top-of-section vs top-of-doc).
- Ordering of what-breaks callouts per section (severity-descending recommended).
- Exact phrasing of per-method constraint callouts in Provisioning method choice section.
- Portal shorthand reminder at top of doc (Phase 36 D-11 precedent — discretion).
- Sub-anchors for the 4 scenarios in D-01 table (e.g., `#scenario-single-app`).

---

## Deferred Ideas

Captured in CONTEXT.md `<deferred>` section. Highlights:

- KME full admin path → v1.4.1
- Corporate-scale ZTE → Phase 39
- Dedicated L1 runbook → explicitly OUT OF SCOPE per PITFALL 7 line 197
- Dedicated L2 investigation → Phase 41 log-collection
- OEMConfig integration → v1.4.1 or v1.5
- MHS app configuration policy template → v1.4.1
- Multi-app kiosk app ordering / icon layout → out of scope (UI-level customization)
- Lock Task Mode app development guidance → developer-tier, out of scope
- Dedicated FRP behavior matrix per OEM → v1.4.1
- Verbatim Intune error string catalog for Dedicated failures → v1.4.1
- Default token expiry research findings → research flag (D-16); v1.4.1 follow-up if behavioral risk
