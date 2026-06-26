# Phase 90: MDM Migration Walkthrough + L2 Runbook #30 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-24
**Phase:** 90-mdm-migration-walkthrough-l2-runbook-30
**Areas discussed:** B1/B2 path layout, 01↔02 handoff boundary, L2 #30 structure, Kandji/Iru source-side
**Resolution method:** `/adversarial-review` (Finder/Adversary/Referee, three Opus agents) per user's explicit instruction — "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."

---

## Area 1 — B1/B2 path layout

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Mirror Phase 89 exactly — single shared spine + delimited B2 divergence callout | |
| 1B | Shared pre-flight (stages 1–2), then hard-fork into two distinct tracks; B2 ends by link-not-copy handoff to guide 01 | ✓ |
| 1C | Two fully parallel self-contained walkthroughs, no shared pre-flight | |

**Winner:** 1B
**Adversarial verdict:** 1A carries a CRITICAL — the 89 single-spine model assumes deep shared stages (A1/A2 shared 6 of 8); B1/B2 share only 2 of 9, so a single spine misrepresents control flow and forces conditional prose across 7 stages. 1C carries two MEDIUMs (duplicates shared pre-flight → drift). 1B had two LOW flaws, both disproved by the Adversary (the single-spine "deviation" is self-contradictory with the 1A-CRITICAL; the Stage Summary Table Path column is already a locked sibling pattern). Zero surviving flaws.

---

## Area 2 — 01↔02 PSSO re-registration handoff boundary (MIG-04)

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | 02 documents only migration-delta re-registration + final app-sso gate; UX delegated link-not-copy to 01 | ✓ |
| 2B | 02 fully inlines the registration stage (duplicates 01) | |
| 2C | Hybrid — 02 inlines "why mandatory" + gate, delegates step-by-step UX to 01 | |

**Winner:** 2A
**Adversarial verdict:** 2B carries two CRITICALs — duplicating guide 01's registration UX violates link-not-copy and forks the `app-sso platform -s` gate into drift-prone copies; it also weakens the MIG-04-mandated junction anchor to a "See Also". 2C is 2A with slightly more explicit wording (no structural benefit; its LOW survives as a wash). 2A's only LOW (less explicit than 2C) was disproved — 2A's own text already places the rationale and gate in 02. 2A is the minimal-duplication reading of MIG-04.

---

## Area 3 — L2 #30 runbook structure (RUN-01)

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Mirror L2 #27 — Context preamble + three parallel Track A/B/C, no top router; PSSO track link-not-copy to #27 | ✓ |
| 3B | Top-level symptom-router decision table first, then three tracks | |
| 3C | Three tracks, PSSO-re-reg-stuck track inlines #27 registration steps | |

**Winner:** 3A
**Adversarial verdict:** 3C carries a CRITICAL — inlining #27's registration-investigation steps duplicates the authoritative sibling L2 runbook (link-not-copy) and risks contradicting #27's caution against over-interpreting `app-sso platform -s` JSON. 3B's standalone router table adds a structure #27 lacks, and its justifying LOW was disproved (#27 already routes inside its Context preamble). 3A mirrors the established sibling shape, keeping the L2 corpus consistent.

---

## Area 4 — Kandji/Iru source-side steps: depth + placement (MIG-03)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Vendor-neutral conceptual steps in the walkthrough + "verify current Iru labels" freshness note; #30 cross-links | ✓ |
| 4B | Detailed Kandji + Iru click-paths in the walkthrough | |
| 4C | Source-side steps live in L2 #30 runbook; walkthrough summarizes + links | |

**Winner:** 4A
**Adversarial verdict:** 4B carries two MEDIUMs — exact Iru click-paths (MEDIUM confidence, portal unfetchable) baked into freshness-stamped content go stale before the 90-day review. 4C carries two MEDIUMs — housing normal-path procedure in the L2 failure runbook overloads RUN-01's three-failure-track charter and only relocates (not mitigates) the Iru drift. 4A calibrates depth to the MEDIUM confidence, surfaces both Kandji/Iru names, and stamps the rebrand-freshness note.

---

## Claude's Discretion

- Exact stage wording/phrasing, callout admonition style, table column choices within the structural decisions.
- Recommended deadline-window guidance (pilot one device first; set deadline only after Intune profile confirmed ready) — present the 1–90 day range with a recommendation.
- Sibling consistency: match guide 00/01 frontmatter, See Also, Glossary Quick Reference, Version History footer shapes.

## Deferred Ideas

None — discussion stayed within phase scope. (Glossary/capability-matrix = Phase 91; navigation-hub wiring = Phase 92; harness lineage bump + close = Phase 93.)
