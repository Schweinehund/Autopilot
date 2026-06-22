# Phase 79: Reference Integration — Capability Matrix & 5-Platform Comparison - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-21
**Phase:** 79-reference-integration-capability-matrix-5-platform-compariso
**Areas discussed:** Matrix table shape, Windows column treatment + placement, 5-platform comparison cell (C12), Anchor inventory artifact

**Method:** All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per the user's standing preference. Finder raised 54 flaws (280 pts, 14 CRITICAL); Adversary disproved 13 (+59, zero wrong-disproves); Referee confirmed all 13 disproves as FALSE POSITIVE, re-affirmed the load-bearing harness/convention traps, locked four winners, and issued three binding cross-cutting decisions (X1–X3). User accepted all ("Lock all & chain to plan").

---

## A — macOS-matrix Authentication table shape

| Option | Description | Selected |
|--------|-------------|----------|
| A1 | Row-per-dimension in the existing `Feature \| Windows \| macOS` shape (7 SC1 rows) | ✓ |
| A2 | Row-per-auth-method (SE key / Password sync / Smart card) with gates packed into cells | |
| A3 | Nested 4-col method×dimension sub-table | |
| A4 | Hybrid — method-selection sub-table + dimension rows | |

**User's choice:** A1.
**Notes:** Referee — A1 is a structural 1:1 with SC1's seven enumerated facts and matches the matrix's uniform row-per-feature convention. A2 rejected CRITICAL (collapses discrete dimensions; no home for the hybrid-join anti-feature). A3/A4 rejected CRITICAL (nested method×dimension table clones guide 08's four-dimension selection table → link-not-copy violation). Residual A1-f2 neutralized: version-floor cell reads "macOS 14.0 (recommended floor)"; hybrid-join is its own explicit "Not supported (anti-feature)" row. Matrix is NOT C12-bound (prose cells OK). Contested A1-f1/f3/f4 ruled FALSE POSITIVE.

---

## B — Windows column treatment + section placement

| Option | Description | Selected |
|--------|-------------|----------|
| B1 | Concise Windows-equivalent facts (WHfB / WAM / Entra Windows SSO) | |
| B2 | Scope-boundary marker — Windows SSO not covered this milestone; terse cells | ✓ |
| B3 | Single spanning intro note + per-row `—` | |
| P1 | Insert `## Authentication` before `## See Also` | ✓ (placement) |
| P2 | Append after Version-History | |

**User's choice:** B2 + P1.
**Notes:** Referee — B2 honors milestone scope (Windows SSO out of scope, REQUIREMENTS:89); B1 rejected CRITICAL (asserts unresearched out-of-scope Windows facts). Terse Windows cells mirror the existing Conditional Access Windows cells. P1 placement is anchor-safe (renames no slug); P2 rejected (content H2 below Version-History is structurally wrong). Residual neutralized: state the scope boundary once at section top; phrase as "not covered in this matrix" (avoid leaking "v1.9" vocab). Contested B1-f2/B2-f1/B3-f1/P1-f1 ruled FALSE POSITIVE.

---

## C — 5-platform comparison cell (C12 BLOCKING)

| Option | Description | Selected |
|--------|-------------|----------|
| C1 | New `## Single Sign-On` H2 section (7th section) with one feature row | ✓ |
| C2 | Add the SSO row inside the existing `## Conditional Access` section | |
| C3 | Full all-5-platform Authentication row, every cell hyperlinked | |
| C4 | Literal-minimal single macOS cell, non-macOS `—` | |

**User's choice:** C1.
**Notes:** Referee — C1 adds a 7th H2 (C12 allows additions; the 6 named H2s stay present), one new anchor `#single-sign-on`. C2 rejected (conflates SSO with CA; forces 5 link-bearing cells with no sibling anchors → C13 risk). C3 rejected CRITICAL (creating auth anchors in 4 sibling matrices = scope creep + unverified non-macOS verdicts). C4 rejected CRITICAL (underspecified — no containing section). Contested C1-f4/C3-f3/C4-f2/C4-f3 ruled FALSE POSITIVE; C1-f1/f2/f3 + C-f5 confirmed REAL and resolved via cross-cutting X2/X3.

---

## D — Pre-edit anchor inventory artifact

| Option | Description | Selected |
|--------|-------------|----------|
| D1 | Committed `79-ANCHOR-INVENTORY.md`, both files' H2 slugs + inbound links, superset post-check | ✓ |
| D2 | Inline checklist in the PLAN (no separate artifact) | |
| D3 | JSON inventory + new `check-phase-79.mjs` validator | |
| D4 | D1 + full cross-link graph of all 5-platform cell targets | |

**User's choice:** D1.
**Notes:** Referee — D1 satisfies SC2's "artifact is committed before any matrix edits". D2 rejected CRITICAL (not a committed artifact → fails SC2). D3 rejected CRITICAL (validator is Phase-82 harness scope + OLD-NUMBERING trap). D4 rejected (over-scoped). Neutralizing mechanism: deterministic `grep '^## ' → slug` over both files, committed in its own commit before the content commit, post-edit superset assertion (additions only). Contested D1-f3/D3-f3 ruled FALSE POSITIVE; D1-f1/f2/f4 confirmed (superset check covers slug drift; per-cell C12 rule and the forward-ref to `#authentication` need the post-edit re-check).

---

## Cross-Cutting Decisions (binding)

| ID | Decision |
|----|----------|
| X1 | Update the existing `## Configuration` "Platform SSO" row (matrix:38) → `Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication)` (ARCH:252/329 mandate; cell-text-only, anchor-safe; IN SCOPE) |
| X2 | Non-macOS comparison cells = bare uppercase `N/A` (the only C12-exempt + link-honest value; lowercase `n/a` unlinked would trip C12, lowercase linked needs non-existent sibling anchors) + a scope footnote |
| X3 | macOS cell = SC2 verbatim `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)` (passes C12's link regex); the cell is ADDED not updated — "current stub" is a misnomer, no stub exists, do not hunt for one |

## Claude's Discretion

- Exact prose wording of matrix cells, SSO-section intro/footnote, row labels (within SC1/SC2 + link-not-copy).
- Internal feature-row label of the `## Single Sign-On` section.
- Which facts carry `last_verified`/`review_by` (DS-2 cadence).

## Deferred Ideas

- Non-macOS authentication content (out of v1.9 scope, REQUIREMENTS:89).
- Nav-hub integration — Phase 81 (SSOREF-04).
- L1/L2 runbooks — Phase 80.
- v1.9 harness bump + any check-phase-79 validator — Phase 82.
- CA-needs-Entra-P1 nuance — canonical in guide 08; matrix links rather than restates.
