# Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-10
**Phase:** 142-archival-path-fix-chain-adoption-cold-clone-threshold
**Areas discussed:** Superseded-assertion instrument · RED-06 chain adoption · V-31-23 line-index drift · NEST-01 threshold

---

## Method

Owner instruction: *"Use /grill-me to thoroughly raise additional questions in each of the areas
and use /adversarial review to evaluate each of the questions in each of those areas to recommend
the best one and provide your reasoning."*

1. Codebase interrogation (`/grill-me`) produced a 21-question draft with a recommendation each,
   written to `142-GRILL-DRAFT.md`.
2. `/adversarial-review` ran **5 parallel Finders** (MECE by area + cross-cutting) → **Adversary**
   → **Referee**.
3. Raw: **83 findings / 518 Finder points**. Adversary: 76 confirmed, 7 disproved. Referee:
   **77 REAL / 6 FALSE POSITIVE**, overruling the Adversary once (F-46, a CRLF measurement) and
   changing severity on two.
4. Four residual owner-level forks were put to the owner via AskUserQuestion; all four recommended
   options were selected.

---

## Area 1 — Superseded-assertion instrument (Q1.1–Q1.5)

| Option | Description | Selected |
|--------|-------------|----------|
| Separate v1.3 frozen pin (`V13` + `readAtV13Close`) | Verified mechanically feasible (all three assertions pass at tag `v1.3`; `MILESTONE_CLOSE_SHAS` is unordered so no HARN-17 collision) | |
| Re-assert the ratified successor shape at HEAD | Keeps a live HEAD-coupled assertion | ✓ |
| Delete the assertions | Loses coverage outright | |

**Outcome:** option (b) STANDS — but its **justification was reversed**. The draft's "the doc-edit
branch is barred three times over" argument was withdrawn: two of the three bars were broken by
execution with C17 exiting 0 (assertion #1 is fence-maskable by design; `check-phase-30.mjs:191`
is a raw substring while C17 #10 reads only frontmatter). The honest argument is vacuity alone.

**Reversed sub-recommendations:**
- **Q1.2** — the proposed `LOCKED — N` + `IOS\d+` token assertion **passes with the entire decision
  table deleted**, and misquoted `EEE-SOP-standard.md:436`'s mandated `LOCKED — N leaves`. Replaced
  with a Routing-Verification **table** assertion.
- **Q1.3** — leg (b) ("`platform:` resolves in C17's D1 map") **dropped**: C17 runs assertion #10 on
  all 234 enrolled files unconditionally, so it can never fail while C17 is green.
- **Q1.5** — instrument kept, **facts corrected**: V-30-10 broke at `600eabd6` (Phase 40-01, v1.4),
  not Phase 114 D-07. The draft would have enshrined a 74-phase misattribution.

---

## Area 2 — RED-06 chain adoption (Q2.1–Q2.6)

| Option | Description | Selected |
|--------|-------------|----------|
| `CHAIN_EXTRA = [30, 31]` outside the span invariants | Preserves the arithmetic doctrine for `[48..137]` | ✓ |
| Extend the arithmetic span down to 30 | 32–47 do not exist; only the `length!==90` guard throws, and a rebased-constants variant yields 16 deterministic FAILs | |
| Adopt into a non-apex chain member | Inert — every `CHAIN_PHASES` check short-circuits under the NESTED flag the apex always sets | |
| CI jobs of their own | **Dropped** — unauthorized by RED-06, Category-1 frozen surface, reds on day one | |

**Notes:** A Finder challenged "non-apex adoption is inert" with a live probe; the Adversary and
Referee both ruled it a **strawman** (the probe injected a plain check, not a `CHAIN_PHASES` entry,
and only the latter satisfies RED-06). The original claim stands.

**Reversed sub-recommendations:**
- **Q2.4** — the `CHECK_PHASE_NESTED=1` skip was **reversed**; see owner question 2 below.
- **Q2.5** — "amend SC#3's +0.35 s / ~17 s" was **reversed**: the figure is correct, reproduced four
  times, and `141-EVIDENCE.md:276-281` already grandfathers it. The draft's contradicting ledger was
  a clone-tree artifact.

---

## Area 3 — V-31-23 and the line-index class (Q3.1–Q3.5)

| Option | Description | Selected |
|--------|-------------|----------|
| Content anchor, "occurs exactly once" | Uniqueness clause re-breaks on the next EEE retrofit of an enrolled file | |
| Content anchor on **presence** + resolver for the fixture | Drift-immune without the fragile half | ✓ |
| Rebase the index 182 → 259 | Re-arms the same landmine | |
| Frozen-read the target at a v1.3 pin | Needs the V13 pin, goes vacuous | |

**Notes:** The draft's "strictly stronger than the index form" claim was **partially wrong** — the
anchor is index-drift-immune but *not* retrofit-immune, and it loses section placement (the prose
moved from `### Step 3: Configure Actions for Noncompliance` to `### iOS-Specific Timing
Considerations`). Whether the new location still satisfies D-23 is an open question routed to the plan.

---

## Area 4 — NEST-01 threshold, subject and enforcement status (Q4.1–Q4.6)

| Option | Description | Selected |
|--------|-------------|----------|
| Absolute wall-clock seconds | Bakes in this machine's hardware (Phase 141 D-19 objection) | |
| Ratio to same-session warm apex | The only falsifiable form — but the multiplier had to be re-derived | ✓ (at ≥8×) |
| Fraction of the CI job cap | **Dropped** — binds a Windows measurement to a Linux cap on a runner class that does not exist | |

**Reversed sub-recommendations:**
- **Q4.2** — the "honest limitation" about cold clones was **deleted**: the contradiction was
  manufactured by comparing two different sessions. That session's own warm apex was 14 s (19/14 =
  1.36×, consistent with cold).
- **Q4.3** — 4× **reversed to ≥8×**: refuted by the project's own cold-vs-warm data (6.8× and 5.74×),
  and the 4× had been derived from a warm-vs-warm spread.
- **Q4.4** — "raise the per-subprocess timeout" **reversed**: it inverts its cited source
  (`138-04-PLAN.md:157` says budgets must *not* be edited) and moves zero wall-clock cost, so it
  cannot satisfy a cost threshold.
- **Q4.6** — `check-phase-64` re-measurement **dropped**: already answered at 91 710 ms (30.6 % of
  cap) in `141-EVIDENCE.md:288`. The real crossing member is `check-phase-66` at 386 235 ms.

---

## Owner questions (2026-08-10)

### 1. Routing the seven uncovered defects

| Option | Selected |
|--------|----------|
| SC amendment for V-30-02, deferral rows for the rest | ✓ |
| Deferral rows for all seven | |
| Fix all seven in-phase | |

**Rationale given:** a milestone dedicated to deleting vacuous passes cannot knowingly ship one in
its own edit target. `V-30-02` has never inspected a Mermaid block since Phase 30 (`\s`/`\S` collapse
to `[sS]` in a double-quoted string) and RED-04 is already satisfied *vacuously*, so an amendment —
not a bug fix — is the correct instrument.

### 2. The ubuntu FAIL-not-SKIP class

| Option | Selected |
|--------|----------|
| Repair the `isMissing` classifier, then adopt | ✓ |
| Also drop the contradictory `--yes` flag | |
| Adopt anyway and accept the CI red | |

**Rationale given:** the one-line root-cause fix at the shared predicate, on two files already on the
CARVE allowlist, and the only option that makes RED-04/05 true on the runner class D-03 makes
sole-authoritative.

### 3. Scope of the `[48..138]` → `[48..143]` correction

| Option | Selected |
|--------|----------|
| Correct all three ratified sites now | ✓ |
| Amend only NEST-01; flag the rest into Phase 144 | |
| Leave the text; record in CONTEXT only | |

**Rationale given:** a wrong `CHAIN_END` yields a five-phase-short chain that still passes its own
self-guards — a silent close-blocker — and Phase 142 is the last cheap place to catch it.

### 4. V-31-29's instrument

| Option | Selected |
|--------|----------|
| Same as Area 1: fix the metric + re-derive the band | ✓ |
| Widen the upper bound only | |
| Drop the check | |

**Rationale given:** it is a third superseded assertion of the same Phase-116-07 EEE-retrofit class,
the spec mandates `wc -l` while the code uses `split('\n')`, and the targets are bands whose ±15 %
arithmetic reconciles exactly — so the correction is verifiable rather than a nudge.

---

## Claude's Discretion

- Plan/atom decomposition, subject to the fixed commit sequence (SC amendment → CARVE amendment →
  edits), adoption-last, and ledger-row-before-edit.
- Exact wording of the successor assertions and the new classifier arm, subject to V-68-04/V-68-08
  substring presence surviving.
- The re-derived band arithmetic, subject to the ±15 %-per-endpoint rule reconciling.
- Whether the eight pass-worded `detail` strings are fixed opportunistically or recorded wholesale.
- Evidence-artifact format for the NEST-01 measurement and the per-child marginal-cost table.

## Deferred Ideas

Twelve items, each routed to a named destination file per the owner's ratification — see
`142-CONTEXT.md` `<deferred>`. Headlines: `check-phase-31 --quick` losing a check from its own
totals; eight checks printing pass-worded details on FAIL; `V-31-22`'s missing zero-file guard;
`carve-gate.mjs`'s module-scope `main()`; the 13-workflow `pull_request.paths` cascade;
`check-phase-66` as the real 300 000 ms crossing member; and the still-unowned non-nested
standalone-chain cost.
