# Phase 125: V115 Pin + 14th Path-A Lineage Bump + Terminal Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-09
**Phase:** 125-v115-pin-14th-path-a-lineage-bump-terminal-close
**Areas discussed:** C (predecessor-validator remediation), A (PIPE-02 confirmation), D (close skeleton / V115-pin placement), B (cross-OS Axis-2)

**Adjudication:** User selected all four areas and delegated the pick for each to a three-agent
`/adversarial-review` (Finder → Adversary → Referee, all Opus), with a recommendation + reasoning per area.
The review re-verified every deciding fact against the live repo and converged on all four picks at High
confidence, correcting three v1.16-specific grounding gaps + one SC transcription error.

---

## Area C — Predecessor-validator remediation strategy

| Option | Description | Selected |
|--------|-------------|----------|
| C1 (refined) | Emergent remediation slot (fires only if GHA apex RED), admitting THREE shapes (readAtV115Close conversion / ABAUDIT FP-exemption / NESTED guard) + mandatory flag-#6 plan-time scoping run | ✓ |
| C2 | Pre-identify & plan all conversions upfront in a planned atom (no slot) | |
| C3 | Hybrid — pre-convert the ~16 known live-HEAD readers + retain a slot | |

**User's choice:** C1 refined (via adversarial review).
**Notes:** The Adversary overturned the naive framing — the DOMINANT v1.15 RED was the ABAUDIT/C15 exemption
shape (commit `ad583fd`, run `28823233887`) caused by an EEE `#12` blockquote split, NOT a reader conversion.
That shape is un-pre-convertible and recurs in v1.16 via the Phase-121/122/123 `#12` splits (0 exemptions in
structural docs today). So the emergent slot is risk-correct; C2/C3's pre-conversion targets the wrong surface.
flag-#6 (REQUIREMENTS L56) is for SCOPING at plan time, not pre-commitment (broad sweep = deferred SWEEP-01).

## Area A — PIPE-02 grounding-confirmation scope

| Option | Description | Selected |
|--------|-------------|----------|
| A1 (riders retargeted) | Fresh full owner-run pass on the NEW structural corpus, real Approved docs, blocking close-gate; riders retargeted to v1.16 deltas | ✓ |
| A2 | Lighter re-confirmation leaning on Phase 124's PIPE-04/05 probes | |
| A3 | Non-blocking / attestation-deferred | |

**User's choice:** A1 with retargeted riders (via adversarial review).
**Notes:** A2's premise is factually hollow — PIPE-05 was a single synthetic Draft fixture (RE-T05), PIPE-04
was filename normalization; neither grounds the structural corpus. A3 breaks the single-close-gate atom (119
precedent). The Adversary corrected the rider set: drop the v1.15 wide-matrix / Linux-admin probes (untouched
surfaces); target decision-tree text-equiv tables, glossary anchor-slugs, nav-hub link tables, descriptive filenames.

## Area D — Close skeleton + V115-pin / conversion atom placement

| Option | Description | Selected |
|--------|-------------|----------|
| D1 | V115 pin rides Atom 2 (with validators + CI); 3-atom skeleton FLOOR + Wave-0 anchor + emergent slot | ✓ |
| D2 | V115 pin rides Atom 1 (harness infrastructure) | |
| D3 | Standalone 4th commit for the V115 pin | |

**User's choice:** D1 (via adversarial review).
**Notes:** V113 rode Atom 2 (v1.14), V114 rode Atom 2 (v1.15, commit `5ec0f87`). The pin-consuming
`readAtV115Close` conversions live in Atom 2 / the slot, so the pin belongs with them. No Atom-1 necessity, no
ordering circularity (pin back-anchors to PAST SHA `29a3599`). "3 commits" is a FLOOR (v1.14 was ~7).

## Area B — Cross-OS Axis-2 authoritative surface

| Option | Description | Selected |
|--------|-------------|----------|
| B1 (cascade-scoped) | Push → new v1.16 CI workflow → GHA runs BOTH chain validators, authoritative; "green" spans the whole predecessor-workflow cascade | ✓ |
| B2 | Local WSL2/Docker Linux | |
| B3 | Sub-agent runs chain, GHA skipped | |

**User's choice:** B1 with widened scope (via adversarial review).
**Notes:** The Adversary surfaced the predecessor-workflow cascade — all 11 versioned integrity workflows filter
`check-phase-*.mjs`, so the close PR fires the whole cascade against retrofitted HEAD at once. "Authoritative
green" = whole cascade, not one workflow. B2/B3 rejected for the 119 reasons (non-SC surface / Windows deep-nest).

## Claude's Discretion
- Exact plan count / plan-to-commit mapping within the D1 skeleton.
- Exact representative `.docx` set composition + `PIPE-02-CLOSE-RUNBOOK.md` query list.
- Optional local corroborating Linux (WSL/Docker) chain pass before the authoritative GHA push.

## Deferred Ideas
- V116 pin (freezing v1.16 corpus) → v1.17.
- `FROZEN-AWARE-ADOPTION-SWEEP-01` (proactive whole-repo frozen-aware conversion) → v1.17+.
- O(n²) Windows-runner rewrite (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 fix) — out of scope.
- Programmatic Copilot Studio access — out of scope; PIPE-02 stays owner-run.

## Load-bearing grounding correction (flagged for planner)
- ROADMAP SC2 / REQUIREMENTS HARN-06 literally say `CHAIN_PHASES=[48..119]` — a transcription error. Verified
  `check-phase-119.mjs` uses `[48..118]` = `[48..(closephase−1)]` with a hard throw. Correct v1.16 apex value =
  `[48..124]` (77 entries). Planner must author `[48..124]` and reconcile the SC text.
