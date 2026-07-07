# Phase 119: Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Terminal Re-audit Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-06
**Phase:** 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal
**Areas discussed:** PIPE-02 2nd grounding pass, Cross-OS Axis 2 mechanics, Re-baseline atomic-green, Close commit/plan structure

**Adjudication method:** User selected all four gray areas and requested `/adversarial-review` to recommend the
best option per area with reasoning. A three-agent adversarial review (Finder → Adversary → Referee, all Opus)
independently re-verified every deciding fact against the repo. Result: **unanimous convergence** — all four
winners CONFIRMED at High confidence; one grounding error in the discuss brief corrected (the
"SHA-includes-its-own-pin / self-reference" framing is architecturally false — pins back-anchor to PAST SHAs).
User locked all four as-is on 2026-07-06.

---

## Area A — PIPE-02 second grounding-confirmation pass (SC5)

| Option | Description | Selected |
|--------|-------------|----------|
| A1 | Representative set + owner-run + close-gate BLOCKS on owner PASS-attestation | ✓ |
| A2 | Full retrofitted corpus (~174 docs) + owner-run + blocks | |
| A3 | Representative set + owner-run but close-gate does NOT block (attestation-pending deferral) | |

**User's choice:** A1 (via adversarial review — Referee High confidence)
**Notes:** Agent has no live Copilot Studio access → owner-run (Phase-113 reality). SC5/HARN-04 require PIPE-02
folded into the single close-gate commit → the gate must BLOCK; A3's non-blocking deferral would force either a
dishonest `Validated` flip or break "all 16 in one commit". SC5 explicitly permits a representative set → A2's
full corpus is redundant owner burden. Riders locked: define PASS (grounded + clickable doc-level citation + no
hallucination, 5 platforms + Draft-label + capability-matrix chunk-survival); use REAL retrofitted `Approved`
docs (not Phase-113 synthetic `RE-T*` fixtures); probe a post-RETRO-03 wide matrix; include a Linux doc;
capture the transcript in-repo.

---

## Area B — Cross-OS Axis 2 mechanics (SC4)

| Option | Description | Selected |
|--------|-------------|----------|
| B1 | Push branch → new v1.15 CI workflow runs both chain validators on ubuntu-latest; GHA green is authoritative | ✓ |
| B2 | Local Linux container (WSL2/Docker) runs both chain validators; treat as authoritative | |
| B3 | Sub-agent runs the chain, GHA skipped | |

**User's choice:** B1 (via adversarial review — Referee High confidence)
**Notes:** SC4 names "Linux GHA authoritative" verbatim; matches v1.14 (Axis 2 = GHA run `28625158404`). B2 is
mechanically possible (WSL2 + Docker verified present on the box) but is NOT the GHA-authoritative surface and
reintroduces local variance. B3 hits the Windows deep-nest timeout and collapses Axis 2 into Axis 3. Rider:
repoint the workflow `paths:` filter `v1.14-*` → `v1.15-*`; the Atom-2 push is the Axis-2 trigger (D-03 ordering
gate) so the close-gate necessarily post-dates the push.

---

## Area C — Re-baseline atomic-green (SC3 — dominant risk)

| Option | Description | Selected |
|--------|-------------|----------|
| C1 | v1.14-exact: BASELINE_19 back-anchored + pre-authorized emergent remediation slot; honest record | ✓ |
| C2 | "Green-before-commit" — regenerate pins, run both validators on staged tree, finalize once green, no remediation commit | |
| C3 | Standalone re-baseline commit between Atom 2 and close-gate | |

**User's choice:** C1 (via adversarial review — Referee High confidence)
**Notes:** v1.14's first Axis-2 GHA apex ran RED (44/22/1) despite green leaf validators and needed 3
remediation commits → same failure mode highly probable after ~174-doc EEE retrofit → C1's pre-authorized
remediation slot is risk-correct. C2 is NOT "mechanically impossible" (WSL/Docker exist — Adversary's
correction), but a local green can't guarantee the authoritative GHA apex is green, and it would force
predecessor edits into Atom 2 (violates SC2). C3 solves a non-existent self-reference problem (grounding
correction — pins back-anchor). Riders: remediation edits ONLY predecessor `check-phase-NN` validators, no
value-masking, `CHAIN_SKIP` stays ∅, honest audit record; predecessor-byte-unchanged HARD gate at close.

---

## Area D — Close commit/plan structure (SC1/SC2/SC5)

| Option | Description | Selected |
|--------|-------------|----------|
| D1 | 3-commit skeleton (Atom1 → Atom2 → close-gate) + Wave-0 pre-anchor + emergent remediation slot | ✓ |
| D2 | 4 commits: Atom1, Atom2, standalone re-baseline commit, close-gate | |
| D3 | 2 commits: fold Atom1 into Atom2 + close-gate | |

**User's choice:** D1 (via adversarial review — Referee High confidence)
**Notes:** SC1/SC2 mandate Atom 1 and Atom 2 each as one indivisible commit; SC5 the single close-gate. D2's
standalone re-baseline commit falls with C3 (non-problem). D3 violates SC1/SC2. "3 commits" is a skeleton/floor,
not a ceiling — the honest v1.14 history was ~7 commits (Wave-0 + Atom1 + Atom2 + re-audit + 3×remediation +
close-gate). C↔D interaction: because C1 wins, D1 is the correct skeleton.

---

## Claude's Discretion

- Exact plan count / plan-to-commit mapping within the D1 skeleton.
- Exact composition of the representative `.docx` set (which `RE-NNN` Approved docs), subject to the D-119-1 riders.
- Exact `PIPE-02-CLOSE-RUNBOOK.md` query list (N queries), inheriting the Phase-113 runbook shape.
- Whether to run an optional local (WSL/Docker) corroborating Linux chain pass before the authoritative GHA push.

## Deferred Ideas

- V115 pin (freezing the v1.15 corpus) → v1.16 (pins back-anchor; successor pins predecessor).
- v1.16 structural classes: glossaries / Mermaid decision-trees / orphan nav-hubs / lifecycle + carved mermaid
  RE-147 + end-user Guides RE-175/176 + descriptive-filename rename pass (PIPE-02 OQ1).
- Programmatic Copilot Studio access — out of scope (REQUIREMENTS L77); PIPE-02 stays owner-run.
