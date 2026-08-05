# Phase 139: Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-04
**Phase:** 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
**Areas discussed:** fetch-depth blast radius, lsTreeAtClose() API shape, SWEEP-03 fail-loud semantics, CARVE artifact + gates

**Method (owner-directed):** all four areas selected, then `/grill-me` to interrogate the
codebase and raise the sub-questions, then `/adversarial-review` (3 parallel Finders →
Adversary → Referee) to score each option and recommend the best with reasoning.
72 issues found, 12 disproved, 61 confirmed (17 CRITICAL / 26 MEDIUM / 18 LOW).
The review reversed 10 of the 20 pre-review recommendations.

---

## Area selection

| Option | Description | Selected |
|--------|-------------|----------|
| fetch-depth blast radius | 3 named workflows vs 13 more shallow harness-run jobs; dispatched-CI proof vs local simulation | ✓ |
| lsTreeAtClose() API shape | Roadmap-flagged design fork: signature, return type, error semantics | ✓ |
| SWEEP-03 fail-loud semantics | Throw vs explicit FAIL; discriminating absent-path from shallow clone | ✓ |
| CARVE artifact + gates | Where the CARVE lives, narrative vs JSON, how the byte-unchanged gate works | ✓ |

**User's choice:** all four, plus an explicit process instruction.
**Notes:** *"Use /grill-me to thoroughly raise additional questions in each of the areas and use
/adversarial review to evaluate each of the questions in each of those areas to recommend the
best one and provide your reasoning."*

---

## fetch-depth blast radius

Five sub-questions were raised (A1 scope within the 3 files, A2 extension to the other 13,
A3 the frozen-validator blocker, A4 dispatched-CI proof, A5 evidence artifact).

### A2 — retrofit scope

| Option | Description | Selected |
|--------|-------------|----------|
| 97 — all 16 workflows | Every shallow checkout repo-wide; only option making the invariant checkable by one grep | ✓ |
| 45 — 3 files + 13 harness-run | Pre-review recommendation; pays the amendment price but leaves 52 shallow checkouts | |
| 32 — the 3 named files only | Literal to ROADMAP SC#2; leaves 13 harness-run jobs that Phase 140 would hard-crash | |

**User's choice:** 97 — all 16 workflows.
**Notes:** The Referee found the pre-review "scope clarification, not creep" framing was
fabricated — `REQUIREMENTS.md:16` and ROADMAP SC#2 enumerate identically (same 3 files, same
4/18/10 counts), so any extension is a success-criterion amendment. Given the amendment is
being bought either way, 45 was ruled the worst of both. Recorded as CONTEXT D-13/D-14.

### A3 — the V-69-08 / V-70-17 blocker (reversal)

| Option | Description | Selected |
|--------|-------------|----------|
| (c) Frozen-to-frozen pins | `git rev-parse <V17>:<path>` vs recorded baseline, per `check-phase-63.mjs:208-250` | ✓ |
| (a) Re-baseline PRED_BLOBS | Pre-review recommendation: update both maps in the same atomic commit | |
| (b) Relax to structural check | Deletes a real anti-regression invariant | |
| (d) Accepted-red disposition | Manufactures a new accepted-red in the milestone whose bar is deleting them | |

**User's choice:** ruled by the adversarial review, not put to the user — the pre-review
rejection of (c) was factually inverted.
**Notes:** The `[MEASURED]` claim that `git hash-object` was the only byte-unchanged-gate
precedent was wrong: the literal string is only in check-phase-69/70, but the *gate class* has
a third instance at `check-phase-63.mjs:208-250`, whose comment reads "frozen-to-frozen, always
equal". Option (c) had been rejected on the reasoning that the frozen blob is pre-edit content
and would fail permanently — exactly backwards, since both sides are immutable and the live file
never enters the comparison. The switch discharges four other confirmed findings (working-tree
atomicity, silent window-weakening, `core.autocrlf` dependence, forced second re-baseline).
Recorded as CONTEXT D-18..D-22.

### A4/A5 — CI evidence

| Option | Description | Selected |
|--------|-------------|----------|
| Feature-branch push + dispatch | `gh workflow run --ref <branch>`; no master contamination, repeatable | ✓ |
| Master push mid-milestone | Pre-review recommendation; no precedent, fires the full cascade while 140-143 debt is red | |
| PR trigger only | Merge ref is not the artifact HARN-19's convention audits | |
| Local simulation only | Proves the mechanism, not the CI wiring | |

**User's choice:** feature-branch push, ratified as owner gate G3.
**Notes:** The Finder's attack on the PR option (path filters exclude the workflows' own paths)
was disproved — `audit-harness-v1.6-integrity.yml:24` does list its own path. Feature branch was
adopted on its own merits: same CI wiring value, no PIPE-02 escalation, cheaply repeatable.

---

## lsTreeAtClose() API shape

Five sub-questions (B1 signature, B2 return type, B3 error semantics, B4 encoding, B5 self-test).

| Question | Pre-review rec | Final ruling | Changed |
|---|---|---|---|
| B1 signature | Tag + convenience exports | Unchanged | no |
| B2 return type | Flat unfiltered path array | Add an options bag `{ext}` | ✓ |
| B3 error semantics | Throw on git failure, `[]` only for empty prefix | Unchanged (one citation struck) | no |
| B4 encoding | `-r -z --name-only` | Same, plus mandatory `.filter(Boolean)` | ✓ |
| B5 self-test | Four assertions | Six assertions | ✓ |

**Notes:** B2's rationale was falsified — there are **zero** call-site `.md` filters; the only
filter is inside `walkMd` itself, so unfiltered would impose ~150 new filter edits on Phase 140,
plus stripping every `relNormalize(abs)` wrapper (`walkMd` returns absolute paths). B4 gained a
mandatory `.filter(Boolean)` because `ls-tree -z` NUL-terminates the final entry — 35 entries
where the truth is 34, landing directly on B5's exact-count assertion. B5 gained a shallow-clone
arm (the only environment where B3 matters) and a wall-clock measurement, because Area B was
otherwise locking a frozen-surface API with no performance lever while SWEEP-06 hinges on it —
`check-phase-60.mjs:261`'s 60 s timeout is a single unguarded outlier against every peer's 300 s.
Two Finder attacks on this area were disproved: the claimed V14 chicken-and-egg (it is
`REQUIREMENTS.md:19` SWEEP-08, fully disclosed) and the claimed self-test brittleness (an exact
count of 34 does fail on HEAD's 42). Recorded as CONTEXT D-34..D-40.

---

## SWEEP-03 fail-loud semantics

### C1 — what "fail loud" means (reversal)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Delete the try/catch | Let the throw propagate; smallest diff | ✓ |
| (b) Explicit FAIL with distinct message | Pre-review recommendation | |
| (c) Throw at module scope | Breaks the chain guard's ability to report which check failed | |

**User's choice:** ruled by the adversarial review.
**Notes:** The live runner in check-phase-49/51 already wraps `check.run()` in try/catch,
converts a throw to one FAIL row, and exits non-zero. Every consequence feared under (a) —
opaque exit, losing sibling assertions, 500-char truncation — is already handled, so (b)'s
cost/benefit was fabricated. One constraint carried forward: `check-phase-60.mjs:247` truncates
at n:500, so the typed cause must be emitted at the front of the message.

### C-scope — how many sites Phase 139 fixes

| Option | Description | Selected |
|--------|-------------|----------|
| 4 now + SWEEP-09 in Phase 141 | The 3 named plus `check-phase-49.mjs:334`; remaining ~34 become a new requirement | ✓ |
| Exactly the 3 named | Milestone would claim to delete a class it deletes 3/38 of | |
| All ~38 in Phase 139 | Large frozen-surface blast radius in the phase authoring the governance contract | |

**User's choice:** 4 now + SWEEP-09 in Phase 141.
**Notes:** The measured defect class is ~38 sites across 20 validators, not 3. Two corrections of
record on the pre-review framing: `check-phase-51.mjs:31` is *not* a silent-null (a real shallow
run produced 6 FAILs with a wrong diagnosis — the same defect as `:264`), and
`check-phase-49.mjs:297` does not pass vacuously (~25% coverage loss, latent). Also recorded:
`check-phase-61.mjs:39-45` cannot be fixed at the library root — inline reader, pinned by V-68-10.

### C3 — the negative test

**Correction of record:** the pre-review test form was itself a silent-green.
`git clone --depth 1 "D:/claude/Autopilot"` emits `warning: --depth is ignored in local clones`,
produces no `.git/shallow`, keeps all 2994 commits, and lets the frozen read succeed. The
`file:///D:/claude/Autopilot` form is mandatory and goes verbatim into the success criterion,
with a `.git/shallow` guard and three cases instead of two.

---

## CARVE artifact + gates

| Question | Pre-review rec | Final ruling | Changed |
|---|---|---|---|
| D1 location | Phase dir `139-CARVE-1.md` | `.planning/milestones/v1.20-CARVE.md` | ✓ |
| D2 form | Narrative + separate JSON | One artifact, fenced allowlist block | ✓ |
| D3 gate mechanism | `git diff --name-only <base>..HEAD` | `--name-status`, no `..HEAD`, + `status --porcelain`; never frozen into a validator | ✓ |
| D4 enforcement | Per-plan invocation + Phase 144 validator | Gate script + Stop-hook; drop the validator adoption | ✓ |
| D5 GOV-02 evidence | Single ledger in phase dir | Single ledger in `.planning/milestones/`; assert row-per-edit | ✓ |
| D6 allowlist coverage | Enumerate the workflows + 5 validators | Eight categories, span 139-144 | ✓ |

**Notes:** Area D took the heaviest revision. The allowlist as originally enumerated omitted two
of the three classes GOV-01 names verbatim — the nine Pillar-C files and the 16 frozen harnesses —
so Phases 140 and 143 would have been blocked by Phase 139's own gate, and Phase 139 would have
failed its own SC#1. Enumeration was replaced by categories because Phases 141-143's file sets are
only discoverable in those phases. The separate JSON was dropped as self-authorizing (it sits
inside the gate's own scope, bound to nothing). The phase-dir location was rejected because it
creates a `resolveArchivedPhasePath` call site replayed on every future apex. And the diff gate
was barred from becoming a `check-phase-139` assertion: a live-HEAD diff frozen into a permanent
apex member goes red at the first v1.21 content commit and stays red forever — manufacturing the
exact accepted-red class this milestone's bar requires deleting.

### Owner ratifications

| Item | Description | Ratified |
|--------|-------------|----------|
| G3 feature-branch push | Authorize a short-lived branch push + dispatch for CI evidence | ✓ |
| G4 GOV-01 span 139→144 | Extend the governance span; Phase 144 makes the largest frozen edits | ✓ |
| N4 name it `v1.20-CARVE` | Avoid collision with the live v1.18 `CARVE-1` token v1.20 discharges | ✓ |
| N5 D-04 stays in force | Record no "reversal"; `fetch-depth: 0` is orthogonal to close-SHA `ref:` | ✓ |

### SWEEP-02 re-scope

| Option | Description | Selected |
|--------|-------------|----------|
| Probe job substitute | `frozen-read-probe` with no `needs:`; re-word SWEEP-02 + ROADMAP SC#3 | ✓ |
| Defer proof to Phase 141 | Phase 139 ships the retrofit unproven in CI | |
| Delete the fan-out now | Converts ~21 masked-skipped jobs into ~21 red ones mid-milestone | |

**User's choice:** probe job substitute.
**Notes:** SWEEP-02's criterion is structurally unobtainable in Phase 139 — all 21 fanned-out
validator jobs are `needs: harness-run`, and both harnesses exit 1 at HEAD, so they report
`skipped` not `success`. The greening depends on Phase 141's RED-01. Without this re-scope,
Phase 139 could not be marked Validated.

---

## Claude's Discretion

- Exact wording of the CARVE narrative, ledger row schema, and gate CLI flags
- Whether `carve-gate.mjs` and the Stop-hook share a module or duplicate a small helper
- Naming of the `frozen-read-probe` job and its step layout
- How the `--self-test` prints its wall-clock measurement

## Deferred Ideas

- **SWEEP-09** — the remaining ~34 silent-swallow frozen-read sites (Phase 141)
- **`if: always()` on the fanned-out validator jobs** — deletes the skip-fan-out masking, but
  only after Phase 141 greens the harnesses (Phase 141)
- **V14 pin SHA choice** — `b5cf529` vs `671f72a`, already a named roadmap fork (Phase 140)
- **`walkMd` beyond the harnesses** — 30 definitions repo-wide; only harness copies are in scope
- **Moving `PRED_BLOBS` to a sidecar** — moot under the frozen-to-frozen ruling; revisit if
  Phase 144's 17th workflow creates a similar twin-map problem
