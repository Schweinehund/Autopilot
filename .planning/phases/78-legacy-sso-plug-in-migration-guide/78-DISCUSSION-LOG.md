# Phase 78: Legacy SSO Plug-in & Migration Guide - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-21
**Phase:** 78-legacy-sso-plug-in-migration-guide
**Areas discussed:** Document structure, Decision-matrix shape, Rollback treatment, Nav-wiring + Kerberos note

**Method:** All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference for gray-area picks. Finder raised 52 objections (195 pts, 7 CRITICAL); Adversary disproved 18 (+62, zero wrong-disproves); Referee ruled all 18 contested flaws FALSE POSITIVE, confirmed every rejection of the losing options, and locked four winners. User accepted all four ("Lock all & chain to plan").

---

## A — Document structure & section ordering

| Option | Description | Selected |
|--------|-------------|----------|
| A1 | Pure A3 hybrid (corpus tail over custom body): disambiguation → matrix → migration → what-breaks → rollback → Kerberos → tail | ✓ |
| A2 | A3 hybrid but full rollback placed before/adjacent to the migration sequence | |
| A3 | Clone guide-07 `## Steps` task-flow skeleton | |
| A4 | Minimal — drop the corpus tail | |

**User's choice:** A1.
**Notes:** Referee — A1 is the direct analog of the Phase-76/77 referee-blessed A3 hybrid, the only option giving all four SC artifacts real homes. A3 rejected CRITICAL (no home for disambiguation table/matrix — same defect that sank A1 for guides 07/08). A4 rejected CRITICAL (breaks `06-config-failures.md:15` reverse-lookup-hub — the 77-A2 latent-orphan defect). Residual A1-f1 (rollback at body position 5) neutralized by the A1↔C1 interlock: C1 front-loads the pre-migration compliance-script prerequisite. Contested A1-f2/f3/f4 ruled FALSE POSITIVE.

---

## B — Decision-matrix shape (SSOMIG-01)

| Option | Description | Selected |
|--------|-------------|----------|
| B1 | Scenario-row matrix (fleet scenarios × keep/migrate/coexist) | |
| B2 | Capability-comparison matrix (capabilities × SSO app extension vs PSSO) | |
| B3 | Two-column prose "keep legacy when… / migrate when…" list | |
| B4 | B1 scoped to migrate/keep/coexist + explicit inline link-not-copy boundary to guide 08 | ✓ |

**User's choice:** B4.
**Notes:** Referee — B4 keeps SSOMIG-01's scenario-first "when-to-use-which" intent while linking (not copying) guide 08's auth-method selection table. B2 rejected CRITICAL (near-clone of guide 08 + Phase 79 capability matrix → violates link-not-copy). B3 rejected (loses the "matrix" SSOMIG-01 names; omits coexist). Residual B4-f2/f3 neutralized: columns strictly migrate/keep/coexist; "coexist" = cross-segment (not same-device Error 10002); version/Kerberos rows are routing facets that point-reference 07/08. Contested B1-f1/f2/f3, B4-f1, B4-f4 ruled FALSE POSITIVE.

---

## C — Rollback treatment (SSOMIG-03 / SC3)

| Option | Description | Selected |
|--------|-------------|----------|
| C1 | Dedicated `## Rollback` + hard-bordered 3-element callout + up-front pre-migration compliance-script prerequisite | ✓ |
| C2 | Rollback as end-of-doc subsection, plain callout, compliance-note inside rollback only | |
| C3 | Rollback folded inline into migration sequence as a terminal "if it fails" step | |
| C4 | Dedicated rollback + callout, compliance-swap as a numbered migration prerequisite step | |

**User's choice:** C1.
**Notes:** Referee — C1 is the only option surfacing the compliance-script swap where it bites: a stale `security find-certificate` Keychain check produces false negatives the moment migration starts (VR-3/MG-2), not only at rollback. C2 rejected CRITICAL (compliance note buried → fails SC3 pre-migration clause; plain callout under-weights a destructive action). C3 rejected CRITICAL (demotes a mandatory destructive procedure → fails MG-3 "mandatory, not deferrable"). C4 close but under-surfaces vs callout. Residual C1-f3 neutralized: state the swap command once canonically up front; the rollback section cross-references it (link-not-copy). Contested C1-f1/f2, C4-f1/f3 ruled FALSE POSITIVE.

---

## D — Nav-wiring + Kerberos coexistence note (SSOMIG-04 / SC4)

| Option | Description | Selected |
|--------|-------------|----------|
| D1 | Convert both code-spans atomically + reciprocal See Also + dedicated short `### Kerberos` coexistence subsection | ✓ |
| D2 | Convert only 08:327; leave 00-overview:49 as plain text (defer to Phase 81) | |
| D3 | Kerberos as a one-line `## See Also` entry / inline callout | |
| D4 | Convert both code-spans; Kerberos as a hard-bordered callout box | |

**User's choice:** D1.
**Notes:** Referee — D1 fully satisfies SC4 + the nav contract. Atomic conversion of `00-overview.md:49` and `08-auth-methods-deep-dive.md:327` uses the proven Phase-77 C13 mechanism (already executed against the same frozen v1.8 harness). D2 rejected (strands a nav edge; Phase 81 is append-only → wrong deferral target). D3 rejected (one-liner too thin for SC4's three assertions). D4 rejected (hard-bordered callout misuses the destructive-action convention for an out-of-scope note). Residual D1-f5 neutralized: scope the `### Kerberos` subsection to exactly the SC4 trio + PSSO-FUT-04 cross-ref; keep the 00-overview Mermaid node consistent. Glossary `#enterprise-sso-plug-in` anchor verified present (`_glossary-macos.md:17,128`). Contested D1-f1/f2/f3/f4, D3-f3, D4-f2 ruled FALSE POSITIVE.

---

## Claude's Discretion

- Exact prose wording of the guide, disambiguation table cells, decision-matrix rows, migration steps, rollback callout, and Kerberos note (within SC1–SC4 and the factual constraints).
- Internal heading names/anchors for guide 09 (new file → no anchor-stability constraint).
- Which "what-breaks" / rapidly-changing facts get `last_verified`/`review_by` annotations (DS-2 90-day cadence).
- Disambiguation as a table vs labeled definition list.

## Deferred Ideas

- Full Kerberos SSO extension deep-dive (PSSO-FUT-04) — Phase 78 ships only the coexistence note.
- Capability-matrix Authentication section + 5-platform comparison cells (SSOREF-02) — Phase 79.
- L1/L2 runbooks (#35, #36, L2 #27) — Phase 80.
- Nav-hub integration + `06-config-failures.md` hub rows — Phase 81 (append-only).
- v1.9 harness lineage bump — Phase 82.
- Per-user-MFA → CA-MFA prerequisite (DF-3) — guide-07/08 concern; mention in 09 only if it bears on the migration decision.
