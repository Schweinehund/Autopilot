# Phase 111: Pillar D — Chain-Validator Tooling Refactors - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-01
**Phase:** 111-pillar-d-chain-validator-tooling-refactors
**Areas discussed:** Plan granularity, Slice-length (N) handling, Byte-equivalence verification, Helper API contract

**Method:** User requested a scored adversarial review (`/adversarial-review`) across every
option in all four areas. Ran Finder → Adversary → Referee (Opus), each grounded in the real
validator files. Finder raised flaws across all 12 options; Adversary refuted 0/12 after
verifying against code; Referee ruled one winner per decision.

---

## Plan granularity

| Option | Description | Selected |
|--------|-------------|----------|
| 1a. Three separate plans | One atomic commit per refactor; clean rollback isolation | |
| 1b. One combined plan | All three refactors in one plan, atomic commits inside | ✓ |
| 1c. Two plans | TOOL-01+03 together (co-touch 60/61), TOOL-02 separate | |

**User's choice:** 1b (adversarial-review recommendation, locked).
**Notes:** Adversary confirmed 1c's rationale is self-inconsistent — check-phase-68 is
co-touched by both proposed plans. File-overlap graph is fully connected on check-phase-61;
sequential main-tree execution means splitting yields no parallelism, only handoff cost.

---

## Slice-length (N) handling

| Option | Description | Selected |
|--------|-------------|----------|
| 2a. Parameterize N, preserve per-site | Each call passes its current N (500/300); byte-identical | ✓ |
| 2b. Normalize to single N (500) | One constant; changes the N=300 harness sites' output | |
| 2c. Parameterize with default 500 | 300-sites override; default masks omissions | |

**User's choice:** 2a (locked).
**Notes:** Referee ruled the invariant is *string-equivalence* (runner prints `detail`
verbatim), so 2b is a confirmed violation and 2c is a silent footgun.

---

## Byte-equivalence verification

| Option | Description | Selected |
|--------|-------------|----------|
| 3a. Full-chain output diff (forced failure) | Capture verdicts+detail before/after, force failure path | ✓ |
| 3b. Per-site --self-test discriminator | Rely on existing self-tests + chain exit 0 | |
| 3c. Review-only | Trust mechanical-refactor review | |

**User's choice:** 3a with mandatory forced-failure rendering (locked).
**Notes:** A green→green chain never renders detail strings (`!pass||skipped||VERBOSE`), so
verification must force failures + an unreadable-SHA case (Landmine B). 3b is circular
(self-test sites are the TOOL-03 targets); 3c misses the verdict-flipping landmines.

---

## Helper API contract

| Option | Description | Selected |
|--------|-------------|----------|
| 4a. Raw strings + {n, trim, prefix} | `execFailDetail(stdout, stderr, opts)`, all 3 axes parameterized | ✓ |
| 4b. Slice-only helper | Returns sliced body only; callers keep prefix/trim | |
| 4c. Error-object oriented | `execFailDetail(err, {n})`, reads err.stdout/stderr | |

**User's choice:** 4a (locked).
**Notes:** Prefix, N, and trim all vary, so only a 3-axis helper reproduces every variant
byte-for-byte. Separate raw args serve both spawn-result and catch-block (TOOL-03) sites.
4b leaves trim/prefix duplicated; 4c couples to the execFileSync throw shape that most
TOOL-01 sites don't have.

## Claude's Discretion

- Helper file layout, JSDoc, and per-site edit sequencing within the combined plan.

## Deferred Ideas

- CI lint/guard fencing against future re-introduced inline slice duplicates (new capability,
  out of scope for these three refactors).
- Five landmine-derived cross-cutting execution constraints captured as LOCKED in CONTEXT.md
  (Landmines A/B/C, verdict-vs-string separation, per-site-not-per-file, forced-failure
  verification, sequential main-tree execution).
