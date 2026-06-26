# Phase 89: PSSO Provisioning Walkthrough - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-24
**Phase:** 89-psso-provisioning-walkthrough
**Areas discussed:** Per-stage anatomy, Two-path layout, Verification gates, Orientation/scope
**Resolution method:** `/adversarial-review` (three Opus agents — Finder/Adversary/Referee). User delegated all four gray-area picks to adversarial review for scored recommendations. 45 flaws raised → 6 disproved → 39 confirmed real. User accepted all four winners ("Lock all four & chain").

---

## D1 — Per-stage anatomy

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Reuse guide-00's exact 4-block anatomy (Admin Sees / What Happens / Behind the Scenes / Watch Out For) | |
| 1B | PROV-01's lighter triad (Admin Sees / User Sees / How to Verify) | |
| 1C | Hybrid: guide-00 4-block + added "What the User Sees" + "How to Verify" at user-facing stages | ✓ |

**User's choice:** 1C (via adversarial review)
**Notes:** 1A carried two CRITICALs (omits PROV-01 triad; no home for PROV-03 gates) → disqualified. 1B viable but drops the "What Happens" procedural spine and the L2 "Behind the Scenes" layer needed for `audience: all`. 1C is the only option satisfying PROV-01's triad AND guide-00 consistency at once; "superset not literal triad" objection ruled a false positive. Caveat: define one explicit rule for which stages get the extra blocks (tie to D3 stage set).

---

## D2 — Two-path layout

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Single shared stage spine + delimited macOS-26 divergence callout at Company Portal (and downstream) | ✓ |
| 2B | Two fully separate sequential walkthroughs (A1 complete, then A2 complete) | |
| 2C | Interleaved per-stage Standard/26+ columns | |

**User's choice:** 2A (via adversarial review)
**Notes:** 2B (critical: mass-duplicates ~7 of 8 shared stages, worst for OS-26 drift, strains "single consolidated") and 2C (critical: empty "same as Standard" cells at every non-diverging stage; defeats opening selector) both disqualified. 2A's flaws addressable within its own definition. Caveat: divergence callout must be multi-stage (CP 5.2604.0 LOB, three-policy rule, EnableRegistrationDuringSetup, SmartCard exclusion, wipe-only recovery, A2 registers in Setup Assistant with no desktop notification).

---

## D3 — Verification gate strategy

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Intermediate partial-state gates (Device REGISTERED / User NOT yet) at each applicable stage + final full gate | |
| 3B | Single end-state verification gate only | |
| 3C | Gates only where registration state changes (= applicable registration stages) + per-path final confirmation gate | ✓ |

**User's choice:** 3C (via adversarial review)
**Notes:** 3B disqualified (critical: violates PROV-03 "at each applicable stage"). 3A invents unsourced partial-state CLI output (SUMMARY documents only the full REGISTERED/REGISTERED end-state) and breaks for A2's single-shot registration. 3C maps exactly onto PROV-03 wording; both objections against it were false positives. Caveat: never fabricate partial `app-sso platform -s` output; label gates Device-vs-User; final gate present for both paths.

---

## D4 — Orientation / opening structure

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Full guide-00-style opening (How to Use + Prerequisites + Stage Summary Table) THEN selector | |
| 4B | Lean opening (path-divergence selector + scope callout only) | |
| 4C | Middle: selector FIRST + compact Prerequisites + Stage Summary Table + one-liner how-to-use | ✓ |

**User's choice:** 4C (via adversarial review)
**Notes:** 4A disqualified (critical: places content before the selector → violates PROV-03's "opens with a path-divergence selector"). 4B drops the Stage Summary Table and leaves A2's hard-gate preconditions homeless. 4C opens with the selector yet keeps both the Summary Table and a Prereqs home. Caveat: selector is first content after frontmatter; compact Prereqs must enumerate every A2 hard-gate precondition and link (not copy) guide-00 ADE prereqs; Stage Summary Table needs a Path column or A1/A2-split rows.

---

## Claude's Discretion
- Exact stage wording, callout admonition style, table column choices — within the locked structural decisions.
- Sibling-consistency details: frontmatter shape, See Also structure, Glossary Quick Reference / Version History footers matching guide 00.

## Deferred Ideas
None — discussion stayed within phase scope. Migration, glossary/matrix, navigation hubs, and harness lineage are already scoped to Phases 90–93.
