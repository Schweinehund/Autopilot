# Phase 133: Chain-Validator Tooling Debt Closure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-19
**Phase:** 133-chain-validator-tooling-debt-closure
**Areas discussed:** GA-1 frozen approach (TOOL-04), GA-2 DEFER-119-A coupling, GA-3 TOOL-05 cache mechanism, GA-4 D-00a exception scoping
**Method:** All four resolved via a single 3-agent `/adversarial-review` (Finder → Adversary → Referee, Opus, all target files verified). User requested adversarial-review per area; then locked all four recommendations.

---

## GA-1 (DOMINANT) — TOOL-04 frozen-surface approach

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Targeted re-pin | Coordinate-only edit of frozen `-audit-allowlist.json` `{file,line}` pins to current positions | ✓ |
| (b) Frozen-aware `readAtClose` reads | Convert 13 `v1.N-milestone-audit.mjs` + pin helper to read content at each milestone's close SHA | |
| (c) Re-disposition | Accept the 11 REDs as ACCEPTED-STANDALONE-CI-RED | |
| (—) Workflow-layer close-SHA checkout | Edit integrity `.yml` jobs to check out the close SHA | |

**User's choice:** (a) targeted re-pin.
**Notes:** Adversarial review disproved the Finder's top risks against (a): value-masking (a5) is coordinate maintenance not masking; staleness (a3) is neutralized because no content phase remains before the v1.18 close. (b) rejected: broadest frozen-CODE blast radius + breaks the pin helper's declared no-shell contract, for zero pre-close benefit — even though `_lib/frozen-at-close.mjs` infra already exists. (c) rejected: real coordinate defects, not Class-B cascade REDs; predecessor workflows are `continue-on-error:false` so "accept RED" blocks the merge anyway. Workflow-layer checkout rejected: makes the harness validate the frozen tree against itself (tautologically green = CI masking). Root cause (workflows run frozen harness vs live HEAD) survives re-pin → logged as CARVE-1.

---

## GA-2 — DEFER-119-A coupling

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Auto-resolve | Falls out of the TOOL-04 pick; stays ACCEPTED-ADVISORY under re-pin | ✓ |
| (b) Separate disposition | Give DEFER-119-A its own explicit disposition | |

**User's choice:** (a) auto-resolve.
**Notes:** Requirement text literally says it "falls out of the TOOL-04 approach decision." Its `pin-helper-advisory` job is `continue-on-error:true` + `--self-test` wrapped `|| echo` → structurally non-blocking. Separate disposition = YAGNI. Plan must state the outcome in writing so Phase 134 doesn't re-litigate.

---

## GA-3 — TOOL-05 cache mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| (a) In-process memo | Memoize `check-phase-{N}` results within the apex process | (shape correct, but no-op) |
| (b) Shared on-disk cache | Persist subprocess results across the chain run | |
| REFRAME → verify-and-attest | Attest existing `CHECK_PHASE_NESTED` O(n) property + Windows cold-clone check; author NO cache | ✓ |

**User's choice:** REFRAME to verify-and-attest (locked, with TOOL-05 re-scope logged as CARVE-2).
**Notes:** In-process memo is a no-op — `check-phase-128` already spawns each phaseNum once with `CHECK_PHASE_NESTED=1` (within-apex is already O(n)). On-disk cache rejected: false-pass masking + breaks HARN-13 cross-OS EXACT-MATCH. No legal non-frozen apex exists to edit in Phase 133 (next apex `check-phase-129` = Phase 134/HARN-12). Windows cold-clone verification stays in Phase 133 per SC#2 (non-authoritative; Linux GHA authoritative per D-03).

---

## GA-4 — D-00a exception scoping / atomicity

| Option | Description | Selected |
|--------|-------------|----------|
| (a) One atomic attested commit | Re-pin lands as a single bounded D-00a-exception commit, separate from TOOL-05/06 | ✓ |
| (b) Interleaved | Fold the frozen edit in with TOOL-05/06 commits | |

**User's choice:** (a) one atomic attested commit.
**Notes:** Makes HARN-12's "byte-unchanged except scoped remediation" a single reviewable diff and preserves clean rollback. Commit carries an explicit `D-00a-EXCEPTION: TOOL-04 re-pin, coordinate-only` attestation and contains only re-pin coords.

## Claude's Discretion

- Exact per-sidecar coordinate values (derived mechanically from `regenerate-supervision-pins.mjs --report`, human-verified).
- Final stderr slice-budget value at the 3 `check-phase-{48,60,61}` sites (TOOL-06 nit).

## Deferred Ideas

- `readAtClose` adoption across the 13 milestone-audit harnesses + pin helper — permanent root-cause fix for `FROZEN-AWARE-ADOPTION-SWEEP-01`; future dedicated tooling milestone (CARVE-1).
- Workflow-layer close-SHA checkout / retiring redundant standalone integrity jobs — same future sweep, not this close.
