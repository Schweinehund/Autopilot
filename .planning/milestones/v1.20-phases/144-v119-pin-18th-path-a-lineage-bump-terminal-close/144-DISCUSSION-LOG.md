# Phase 144: V119 Pin + 18th Path-A Lineage Bump + Terminal Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-12
**Phase:** 144-v119-pin-18th-path-a-lineage-bump-terminal-close
**Areas discussed:** A (what ships in the close), B (apex + leaf shape), C (Axis-2 dispatch + the red path), D (close-gate + disposition deletion)

**Method:** the owner selected all four areas and directed `/grill-me` to raise the question set and
`/adversarial-review` to evaluate each candidate ruling. 29 candidate rulings were drafted against
~40 live measurements, then reviewed by 4 parallel Finders → Adversary → Referee. 82 findings:
16 false positives, 48 real, 18 partially real. Three rulings REVERSED, fifteen AMENDED.

---

## Area selection

| Option | Description | Selected |
|--------|-------------|----------|
| A — What actually ships in the close | Four items routed into a phase whose charter says it never batches | ✓ |
| B — Shape of apex check-phase-144 | Span, CHAIN_EXTRA, hazard fixes, leaf template, archival drift | ✓ |
| C — Axis-2 dispatch + the red path | 96 unpushed commits, 17 dispatches, evidence standard, remediation budget | ✓ |
| D — Close-gate + deleting the dispositions | 28 flips, falsifiable discharge proofs, deferred-cleanup lists, ordering | ✓ |

**User's choice:** all four, plus an explicit instruction to run `/grill-me` and `/adversarial-review`
over each area rather than a conversational pass.

---

## Ratification round (post-review)

### Scope — which routed non-HARN items land inside the close cluster

| Option | Description | Selected |
|--------|-------------|----------|
| check-phase-67's 10 fail-loud sites | 7 chicken-and-egg + 3 partial-null; named by SWEEP-09's amended text, 141-03-SUMMARY, CARVE Category 5 | ✓ |
| Both stale ~102s workflow fixes | v1.7:96 + v1.8:95; zero incremental fan-out cost, already on-list, figure already measured | ✓ |
| frozen-at-close.mjs comment correction | The stale `:10-13` check-phase-61 description, routed here as a close-review-pass item | ✓ |
| check-phase-143.mjs needle-spec wiring | §1–§5 verbatim, declining the corpus-invariant recommendation | ✓ |

**User's choice:** all four folded in.
**Notes:** the alternative — deferring hygiene items to v1.21 — was rejected. The check-phase-67
sites carry a written CARVE authorization; the `~102s` fix turned out to cost nothing after the
review falsified both of the draft's stated cost legs.

### Terminal ordering — publish bundle relative to the close-gate

| Option | Description | Selected |
|--------|-------------|----------|
| Bundle BEFORE the gate | ROADMAP SC#4 fuses them with "and"; the bundle exits 1 on any of 225 pandoc conversions | ✓ |
| Bundle AFTER the gate (v1.19 precedent) | Matches the last several milestones; puts the last failure-capable step behind the one-way door | |

**User's choice:** bundle before the gate.
**Notes:** a deliberate departure from the v1.17/v1.18/v1.19 precedent, taken because the failure
mode (a pandoc/guard/parity failure landing after an irreversible 28-requirement flip) is
unrecoverable within the phase.

### origin/phase-139-atom-5 disposition

| Option | Description | Selected |
|--------|-------------|----------|
| Audit + report, owner decides at the push checkpoint | 139-06-SUMMARY says KEEP / "should be re-confirmed", not delete; remote deletion has no reflog | ✓ |
| Delete it at close (leave the 3 older ones) | Cleans one instance | |
| Delete all four remote atom branches | Closes the class; but HARNESS-PHASE bars batching and each is an unattended remote action | |
| Keep it — re-carry to v1.21 | Preserves the evidence anchor; defers cleanup | |

**User's choice:** audit and report; the call comes to the owner at the push checkpoint.
**Notes:** `c2450efa` (the branch tip) is the headSha of the 16 recorded 2026-08-06 CI runs on which
SWEEP-01/SWEEP-02's completion evidence rests — recorded so the decision is made with that coupling
visible.

### The red path — what happens if a job is red after one remediation round

| Option | Description | Selected |
|--------|-------------|----------|
| HARN-19 recorded UNMET; milestone does not ship this phase | Mirrors 138 D-07: never "satisfied by fallback" | ✓ |
| Two remediation rounds instead of one | More runway; each round forces Axis-1 and Axis-3 re-runs at a new SHA | |
| Owner adjudicates case-by-case at the checkpoint | No pre-committed rule; risks inventing an accepted-red disposition under time pressure | |

**User's choice:** pre-commit to the halt.
**Notes:** taken before the irreversible push, deliberately, because the milestone's own bar deletes
the two dispositions that have historically absorbed a red.

---

## Rulings REVERSED by the adversarial review

| Ruling | Draft | Final | Why |
|--------|-------|-------|-----|
| A-5 → D-06 | Carry the stale `~102s` figure; record a correction | FIX it, in both v1.7:96 and v1.8:95 | Both cost legs falsified: v1.7 already fires on the close PR via its own `paths:` filters, and the replacement figure was already measured at Phase 141 |
| B-6 → D-14 | Leaves follow the AUDIT + CHAIN + AUDIT-HARNESS + SELF template | Leaves are LIGHTWEIGHT: `CHAIN_PHASES = []`, no AUDIT, no AUDIT-HARNESS, no NESTED guard | That is the apex template; 135/136/137's header line 4 says "chain lives ONLY in apex" |
| A-4 sub-ruling → D-05 | ADOPT the needle-spec's corpus-level `{#` invariant | DECLINE it | A live-HEAD corpus assertion in a permanent apex member manufactures the accepted-red class the milestone bar deletes (`carve-gate.mjs:8-12`) |
| C-7 → D-23 | Delete the branch once reachability is confirmed | Audit, report, owner decides | The record says KEEP / re-confirm; it is a remote ref with no reflog |

## Findings that changed the phase's risk posture

- All 16 workflows ran **green** on the 2026-08-10 weekly cron at `origin/master` (198 jobs, 0
  failures), and three 16-wide dispatch fan-outs have already been executed. The draft's framing of a
  17-workflow dispatch as unprecedented, and of v1.5/v1.6/v1.7 as "the three reddest", were both
  wrong — the latter is not written anywhere in the repo.
- The archival-token guardrail carried forward from Phase 138 does not work: `archive-path.mjs:23-24`
  resolves the live path first, so the post-close-gate `V-144-AUDIT` check cannot detect a wrong
  token. Demonstrated by `check-phase-125.mjs:86`, permanently green on a wrong token.
- `DEFER-119-A`'s sole-owned defect is closed (`--self-test` exits 0), so it moves to
  DROPPED-and-Closed rather than being carried while the entry it owns is deleted.

## Claude's Discretion

- Internal structure of the five leaves and the apex within the recorded invariants.
- Needle sets for `check-phase-139..142.mjs`, derived at plan time from each phase's
  VERIFICATION/SUMMARY measured actuals.
- Sidecar header values, BASELINE_24 wording, plan decomposition, commit subjects, and section
  ordering within `v1.20-MILESTONE-AUDIT.md`.

## Deferred Ideas

- The three older remote atom branches (`origin/phase-119-atom-2`, `-125-atom-2`, `-128-atom-2`).
- The C17 frozen-aware conversion across all five C17-bearing harnesses.
- The 10 unowned tooling items in `v1.20-DEFERRED-CLEANUP.md`, incl. `FENCE-AXIS-02`.
- `V-132-HUBSNOTWIRED-REGEX-BROKEN` and `RECIPE-OUTBOUND-LINK-COVERAGE` — both stay OPEN.
- The stale working tree: 7 `worktree-agent-*` branches, 104 untracked entries.
- `REQUIREMENTS.md:114`'s stale six-workflow count; the `parseAllowlist` v1.7 lineage freeze.
