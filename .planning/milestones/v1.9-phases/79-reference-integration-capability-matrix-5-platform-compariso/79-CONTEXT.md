# Phase 79: Reference Integration — Capability Matrix & 5-Platform Comparison - Context

**Gathered:** 2026-06-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Integrate the v1.9 macOS Platform SSO authentication facts (authored in guides 08/09, Phases 77–78) into the two cross-platform reference documents, using the established link-not-copy architecture and a mandatory pre-edit anchor inventory. Deliverables:

1. **`docs/reference/macos-capability-matrix.md`** — append a new `## Authentication` section (the three PSSO auth methods + hardware/version gates, Entra licensing, NUAL, passkey, hybrid-join anti-feature) AND surgically update the **existing** `## Configuration` "Platform SSO" row to reference the new `#authentication` anchor (SC1 + cross-cutting decision X1).
2. **`docs/reference/4-platform-capability-comparison.md`** — ADD a macOS Platform SSO cell via a new `## Single Sign-On` section, link-not-copy to the matrix `#authentication` anchor (SC2).
3. **`79-ANCHOR-INVENTORY.md`** — a committed pre-edit anchor inventory artifact (SC2 hard prerequisite), generated and committed BEFORE any content edit.

**Not in this phase:** L1/L2 runbooks (Phase 80); navigation-hub integration into index/common-issues/quick-ref/decision-tree (Phase 81, SSOREF-04); the v1.9 harness lineage bump + any `check-phase-79.mjs` validator (Phase 82). Non-macOS (Windows/iOS/Android/Linux) authentication content is OUT OF SCOPE this milestone (REQUIREMENTS line 89).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference. Finder raised 54 flaws (280 pts, 14 CRITICAL); Adversary disproved 13 (+59, zero wrong-disproves); Referee confirmed all 13 disproves as FALSE POSITIVE, re-affirmed the load-bearing harness/convention traps, locked four winners, and issued three binding cross-cutting decisions. The user accepted all ("Lock all & chain to plan").

### A — macOS-matrix Authentication table shape (WINNER: A1, row-per-dimension)
- **D-01: One row per SC1 dimension** in the existing `Feature | Windows | macOS` shape — a structural 1:1 with SC1's enumerated facts and consistent with every existing matrix section (Enrollment, Configuration, …). Rows (macOS cell = concise prose summary + link to guide 08/09, link-not-copy):
  1. **Auth methods** — Secure Enclave key (Microsoft-recommended) · Password sync · Smart card
  2. **Hardware gate** — Secure Enclave method requires T2 chip or Apple Silicon
  3. **macOS version floor** — "macOS 14.0 (recommended floor)" (reconcile with the existing `## Configuration` "macOS 14+" phrasing)
  4. **Entra ID licensing** — no P1/P2 required for PSSO itself (CA-integration P1 nuance lives in guide 08, link-not-copy — do NOT restate)
  5. **NUAL** — macOS 14+
  6. **Passkey / FIDO2** — Secure Enclave method only
  7. **Hybrid Entra join** — **Not supported (explicit anti-feature)** — its own row, never silently omitted (REQUIREMENTS:83 anti-feature discipline)
- **Rejected A2** (row-per-method — CRITICAL: collapses SC1's discrete dimensions; no home for the hybrid-join anti-feature → fails SC1 row coverage). **Rejected A3 / A4** (CRITICAL: a nested 4-col method×dimension sub-table clones guide 08's four-dimension selection table → link-not-copy violation + maintenance drift).
- **D-01a (matrix is NOT C12-bound):** the macOS matrix uses prose cells; C12's link-not-copy cell rule binds ONLY the comparison doc. Matrix cells may be prose summaries that link to guides 08/09.

### B — Windows column + section placement (WINNER: B2 scope-marker + P1 placement)
- **D-02: Windows cells = scope-boundary marker, not invented facts.** v1.9 is a single-feature macOS-authentication milestone; Windows SSO (Windows Hello for Business / Web Account Manager / Entra Windows SSO) is OUT OF SCOPE (REQUIREMENTS:89). Do NOT assert unresearched Windows-SSO facts. State the scope boundary ONCE at the section top (a short intro line); Windows cells are terse (mirroring the existing Conditional Access Windows cells, e.g. matrix:84 `n/a (Windows uses Intune client)`) so they read as deliberate scope, not omission. Avoid leaking internal milestone vocabulary ("v1.9") into the reader-facing cells — phrase as "not covered in this matrix" rather than "out of v1.9 scope".
- **D-02a (placement P1): insert `## Authentication` before `## See Also`** (after `## Conditional Access` / `## Key Gaps Summary`, before the navigational See-Also + Version-History tail). Anchor-safe — renames no existing slug. SC1's "appended below existing sections" is satisfied: Authentication sits below all six content/domain sections; See Also and Version-History are navigational tails, not content sections.
- **Rejected B1** (CRITICAL: asserts out-of-scope, unresearched Windows-SSO facts). **Rejected P2** (MEDIUM: a content H2 below the Version-History table is structurally wrong — every sibling matrix terminates at Version History).

### C — 5-platform comparison cell (WINNER: C1, new `## Single Sign-On` section)
- **D-03: Add a new `## Single Sign-On` H2 section** (a 7th section) with one feature row "OS-integrated SSO (Platform SSO)". C12 requires the SIX named H2s (`## Enrollment … ## Conditional Access`) remain present but ALLOWS additions — a 7th H2 is harness-safe. Adds one anchor `#single-sign-on`; touches none of the six.
- **Rejected C2** (MEDIUM×2: folding the row into `## Conditional Access` conflates SSO with CA and forces 5 link-bearing cells inside a canonical 6-col table → non-macOS cells would need links to non-existent sibling `#authentication` anchors → C13/MLC risk). **Rejected C3** (CRITICAL×2: creating `#authentication` anchors in all 5 sibling matrices = massive out-of-scope creep + unverified non-macOS auth verdicts). **Rejected C4** (CRITICAL: underspecified — no containing section → unbuildable).

### Claude's Discretion
- Exact prose wording of the matrix Authentication cells, the SSO-section intro/footnote, and the row labels — within SC1/SC2 and the factual constraints (guides 08/09 are canonical; link-not-copy).
- Internal heading text of the new `## Single Sign-On` section's feature-row label (e.g., "OS-integrated SSO (Platform SSO)").
- Whether the matrix Authentication facts carry `last_verified`/`review_by` (DS-2 90-day cadence) — apply to rapidly-changing facts (macOS-version gates, CP floors).

</decisions>

<cross_cutting_decisions>
## Binding Cross-Cutting Decisions (apply across all picks — MANDATORY)

**X1 — Update the existing `## Configuration` "Platform SSO" row — IN SCOPE.**
ARCH:252 + ARCH:329 mandate that the existing matrix row (`macos-capability-matrix.md:38`, currently `| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) |`) gain the `#authentication` reference so the comparison doc and readers reach the new section. **Mechanism:** edit the macOS cell to `Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication)`. This changes **cell text only** — NOT the `## Configuration` heading or its slug — so it is anchor-stable (the D1 superset check confirms `#configuration` is preserved). This is an EDIT to an existing row, explicitly sanctioned by ARCH; it does not violate the append-only-for-*headings* constraint. Without X1, the matrix ships a stale, link-less duplicate PSSO statement higher in the same file than the new Authentication section.

**X2 — Non-macOS comparison cells = bare uppercase `N/A`.**
This is the ONLY value that is BOTH C12-safe AND link-honest. `scripts/validation/v1.8-milestone-audit.mjs:643` exempts exactly `—` and uppercase `N/A` (case-sensitive). The comparison doc's lowercase-`n/a`-WITH-`[matrix](...)`-link convention CANNOT be honored here because no sibling matrix has a `#authentication` anchor (verified: ios/android/linux have none; no `windows-capability-matrix.md` exists) — a lowercase linked `n/a` would require fabricating out-of-scope anchors (= C3 creep + C13/MLC broken-link risk), and a lowercase UNLINKED `n/a` would FAIL C12 (not exempt). Therefore Windows/iOS/Android/Linux SSO cells = bare `N/A`. Add a one-line footnote under the SSO section noting non-macOS auth is not covered in this milestone, so `N/A` reads as deliberate.

**X3 — macOS cell = SC2 verbatim string; the cell is ADDED, not updated.**
Use the exact SC2 string: `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)`. The parenthetical `(macOS 14+)` deviates from the comparison doc's locked verdict grammar (verdict-word + `—` + link), but SC2 mandates this literal and it PASSES C12 (the cell contains a valid `[text](link)`; audit.mjs regex `/\[.+\]\(.+\)/`). SC2-verbatim compliance outranks the editorial verdict-grammar preference — do NOT "adapt" it. **The planner/executor must NOT hunt for a stub:** SC2's "updated from its current stub" is a MISNOMER — the comparison doc has NO SSO/Authentication row or section (verified). The cell/row/section must be **ADDED** (via the new `## Single Sign-On` section), not overwritten.

</cross_cutting_decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 79: Reference Integration" (~lines 484–494) — goal, depends-on (Phases 77 + 78; pre-edit anchor inventory hard prerequisite), SC1 (matrix Authentication rows) + SC2 (comparison cell + anchor inventory)
- `.planning/REQUIREMENTS.md` — SSOREF-02 (line 51); SSOREF-01/03 already Complete (Phase 75); SSOREF-04 = Phase 81 (line 53); the out-of-scope table (line 89 — "New platforms / non-macOS auth" out of v1.9 scope; line 83 hybrid-join anti-feature)

### Files to edit / create (verified current state)
- `docs/reference/macos-capability-matrix.md` — **EDIT**: append `## Authentication` (D-01, before `## See Also` per D-02a) + surgically update the `## Configuration` "Platform SSO" row at **line 38** (X1). 2-column `Feature | Windows | macOS`, prose cells, NOT C12-bound. Ends `## Key Gaps Summary` → `## See Also` → Version-History table (lines 88–111).
- `docs/reference/4-platform-capability-comparison.md` — **EDIT**: add `## Single Sign-On` section (D-03) with the macOS PSSO row (X3) + non-macOS `N/A` cells (X2). 6-column `Feature | Windows | macOS | iOS | Android | Linux`, **C12-BOUND**. Verdict vocabulary locked at ~line 15; existing `n/a` cells are always lowercase + `[matrix](...)`-linked (lines 24, 93). Sections end at `## Conditional Access` → `## See Also` → `## Version History`.
- `.planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md` — **CREATE** (D-04 / D1): pre-edit H2-slug inventory of both reference files, committed in its OWN commit before the content commit.

### Sibling reference docs (read-only — confirm no auth anchors)
- `docs/reference/{ios,android,linux}-capability-matrix.md` — VERIFIED: none has a `## Authentication` H2 / `#authentication` anchor → grounds X2 (non-macOS cells cannot link to a sibling auth anchor). No `windows-capability-matrix.md` exists (the comparison's Windows column sources from the linux matrix per its See-Also note).

### Audit harness (do not break — frozen v1.8 until Phase 82)
- `scripts/validation/v1.8-milestone-audit.mjs` —
  - **C12 (BLOCKING)** ~lines 610–655: in the comparison doc's canonical 6-col tables, every non-empty data cell (cols 1–5) must contain `[text](link)` EXCEPT cells equal to `—` or **`N/A`** (case-sensitive uppercase); the SIX named H2s (`## Enrollment … ## Conditional Access`) must all remain present; a 7th H2 is allowed. Grounds D-03 and X2.
  - **C13 (BLOCKING)** ~lines 660–679: checks the 15-entry broken-link allowlist SHAPE/category counts only (6 transient_external + 9 template_placeholder); it does NOT walk the comparison doc's links — so a VALID new internal link cannot trip it, and the macOS `#authentication` target will exist after the Area-A edit lands in the same commit set.

### Canonical fact sources (link-not-copy — summarize + link, do NOT duplicate)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — the canonical auth-method facts (three methods, four-dimension selection table [DO NOT clone], FileVault, NUAL, passkey, Touch ID, CA-needs-P1 nuance). The matrix Authentication cells link here.
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` — migration/rollback facts (Phase 78); link target where relevant.
- `.planning/phases/77-auth-methods-deep-dive/77-CONTEXT.md` (guide 08 D-04 four-dimension table = the link-not-copy source A3/A4 were rejected for cloning) and `.planning/phases/78-legacy-sso-plug-in-migration-guide/78-CONTEXT.md`.

### Research (⚠ OLD-NUMBERING TRAP — read substance, not headings)
- `.planning/research/ARCHITECTURE.md` — **ARCH:252 + ARCH:329** (the existing `## Configuration` PSSO row must gain the `#authentication` anchor — grounds X1); the capability-matrix link-not-copy architecture rationale. NOTE: ARCH labels this matrix work "Phase 78" and runbooks "Phase 79" (old numbering); ROADMAP is authoritative (matrix = Phase 79). Do NOT consult harness assertions by phase NUMBER.
- `.planning/research/SUMMARY.md` / `PITFALLS.md` — auth-method facts, hybrid-join NOT SUPPORTED, NUAL, passkey (SE-only), Entra licensing, macOS 13 vs 14 floor nuance, the DS-2 90-day cadence.

### Prior-phase decisions this phase depends on
- Phases 77 (guide 08) + 78 (guide 09) are verified Complete — their facts are the canonical sources this phase summarizes/links.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Existing matrix section pattern** (`## Enrollment` … row-per-feature `Feature | Windows | macOS` prose tables) — the template for D-01's Authentication rows.
- **Existing comparison cell pattern** (`Verdict — [matrix](<platform>-capability-matrix.md#<anchor>)`, lowercase `n/a` always linked) — the template the macOS SSO cell follows (X3), with non-macOS deliberately bare `N/A` (X2) because no sibling auth anchor exists.
- **Pre-edit anchor inventory pattern** (PITFALL-6 / prior milestones' anchor-stability discipline) — the basis for D-04's committed `79-ANCHOR-INVENTORY.md` + superset post-check.

### Established Patterns
- **link-not-copy** (capability matrices link to the per-platform matrix; the matrix Authentication cells link to guides 08/09) — do NOT duplicate guide-08's tables (A3/A4 rejection).
- **Anchor stability** — append new H2s and edit cell TEXT only; rename/remove no existing heading slug. X1's Configuration-row edit is cell-text-only (anchor-safe). D-04's superset check is the proof.
- **C12/C13 BLOCKING harness awareness** — only the comparison doc is C12-bound (per-cell hyperlink rule + 6 named H2s); the matrix is not. C13 checks allowlist shape only.

### Integration Points
- The matrix `#authentication` anchor (created in D-01) is the link target for both the comparison `## Single Sign-On` cell (X3) and the updated `## Configuration` row (X1) — all must land coherently (same commit set after the anchor-inventory commit).
- Phase 81 (SSOREF-04, nav hubs) will further wire this content; Phase 79 stops at the two reference docs.

</code_context>

<specifics>
## Specific Ideas

- **Matrix `## Authentication` rows (D-01):** 7 rows as listed; macOS cells summarize + link guide 08/09; Windows cells terse scope-markers (D-02); hybrid-join its own "Not supported (anti-feature)" row.
- **Section-top scope line (D-02):** one short line clarifying the section documents macOS Platform SSO; Windows comparison cells are intentionally terse ("not covered in this matrix").
- **Comparison `## Single Sign-On` row (D-03/X3):** Feature = "OS-integrated SSO (Platform SSO)"; macOS = `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)`; Windows/iOS/Android/Linux = `N/A`; one footnote noting non-macOS auth is not covered this milestone.
- **Configuration-row edit (X1):** macOS cell → `Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication)`.
- **Anchor inventory (D-04):** `grep '^## ' → slug` over both reference files → `79-ANCHOR-INVENTORY.md`; committed first; post-edit superset assertion (additions only: `#authentication` in the matrix, `#single-sign-on` in the comparison).

</specifics>

<deferred>
## Deferred Ideas

- **Non-macOS (Windows/iOS/Android/Linux) authentication content** — OUT OF SCOPE for v1.9 (REQUIREMENTS:89). The `N/A` cells and terse Windows column are the deliberate scope boundary; a future milestone could populate sibling-matrix Authentication sections.
- **Navigation-hub integration** (index / common-issues / quick-ref / decision-tree SSO leaf; runbook index rows) — Phase 81 (SSOREF-04).
- **L1/L2 runbooks** — Phase 80.
- **v1.9 harness lineage bump + any `check-phase-79.mjs` validator** — Phase 82 (D3 rejected as out-of-phase scope; also hits the OLD-NUMBERING trap).
- **CA-integration-requires-Entra-P1 nuance** — lives canonically in guide 08; the matrix Entra-licensing row links there rather than restating (link-not-copy).

### Reviewed Todos (not folded)
None — no pending todos matched this phase's scope.

</deferred>

---

*Phase: 79-reference-integration-capability-matrix-5-platform-compariso*
*Context gathered: 2026-06-21*
