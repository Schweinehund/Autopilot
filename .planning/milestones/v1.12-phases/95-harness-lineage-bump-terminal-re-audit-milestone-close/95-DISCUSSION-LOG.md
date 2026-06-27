# Phase 95: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-26
**Phase:** 95-harness-lineage-bump-terminal-re-audit-milestone-close
**Areas discussed:** Apex chain range, check-phase-94 shape, 3-axis re-audit set, Plan layout & close-gate

**Method:** All 4 gray areas adjudicated via 4 parallel `gsd-advisor-researcher` agents in
adversarial-review mode (Finder FOR / Adversary AGAINST / Referee scores; lower = better), per user
memory `feedback_adversarial_review_preference` + explicit instruction. User selected all 4 areas, then
approved all 4 verdicts (including the apex-range roadmap-lock correction) via a single
"Approve all 4 + correct apex" selection.

---

## Apex chain range (→ D-01)

| Option | Description | Selected |
|--------|-------------|----------|
| A — `[48..94]` | Honor the established `[48..N-1]` precedent; fold content phase 94 into the apex recursion; correct the roadmap off-by-one | ✓ |
| B — `[48..93]` | Honor the roadmap/STATE lock literally; check-phase-94 validated only as a standalone re-audit row | |
| C — `[48..93]` + guard | Lock `[48..93]` + document why 94 excluded + mandatory standalone row | |

**Adversarial scores:** A=2 / C=6 / B=8 (lower = better)
**User's choice:** Option A — "Approve all 4 + correct apex"
**Notes:** Decisive wedge — every prior apex (82→[48..81], 88→[48..87], 93→[48..92]) includes its own
milestone's content phase. v1.11 included content-phase-92 *because* check-phase-92 carries blocking
needles the frozen milestone-audit harness is blind to; check-phase-94 is the exact twin (MIGV needles).
STATE.md:174 flagged `[48..93]` as unconfirmed ("confirm chain-apex count…"). Correction patches ROADMAP
SC#2 + STATE + REQUIREMENTS at close-gate.

---

## check-phase-94 shape (→ D-02)

| Option | Description | Selected |
|--------|-------------|----------|
| A — PRESENCE+SELF only | Lightweight Path-A from check-phase-84..87 | |
| B — PRESENCE+SELF + `V-94-CONTENT-*` needles | Add MIGV content-needle assertions (check-phase-81/92 form) | ✓ |
| C — Content-needles only | Drop PRESENCE as meaningless for a pre-existing file | |

**Adversarial scores:** B=3 / C=6 / A=8
**User's choice:** Option B
**Notes:** Phase 94 only PATCHED a file existing since v1.11, so bare PRESENCE is trivially green on old
bytes (zero regression value). 5 rot-stable needles: `support.iru.io`, `support.kandji.io`,
`docs.iru.com`, `Supervision status (MEDIUM confidence)`, `learn.microsoft.com`. Excludes brittle pins
(exact dates, MS-Learn sentences, HTTP strings).

---

## 3-axis re-audit set (→ D-03)

| Option | Description | Selected |
|--------|-------------|----------|
| A — Full set, corrected OS split | 2 leaf rows on both OSes + 2 chain rows (continuity-93 + apex-95) Linux-sole-authoritative | ✓ |
| B — v1.11-style | Label continuity-93 "fast non-apex," run on Windows too | |
| C — Minimal | milestone-audit + apex only; drop continuity + net-new 94 rows | |

**Adversarial scores:** A=2 / C=7 / B=9
**User's choice:** Option A
**Notes:** Code-verified that continuity `check-phase-93` is a 45-deep chain validator (CHAIN [48..92] +
CHECK_PHASE_NESTED), NOT "fast non-apex" — the v1.11 label was wrong. Both chain validators cascade on a
cold Windows clone (empirical 3+ min hang in 93-03-AUDIT-RESULTS) → both Linux-authoritative. check-phase-94
needs a standalone Linux row (never run on Linux; apex emits only `CHAIN-94 exits 0`).

---

## Plan layout & close-gate (→ D-04)

| Option | Description | Selected |
|--------|-------------|----------|
| A (×4 sub-decisions) | Keep ratified 4-plan/5-commit; ONE close-gate, NO Commit A, single V111; DROP resolved MIGV / CARRY open / ADD glossary CR-01; leave cruft untouched | ✓ |
| B (per sub-decision) | Compress plans / add Commit A or V111_CLOSEGATE / carry resolved items / clean cruft now | |

**Adversarial scores:** each sub-decision A=2 / B=8–9
**User's choice:** Option A across all 4 sub-decisions
**Notes:** V111 = `919b23b` verified (v1.11 close-gate, single-commit → single entry, rides Atom 2).
Atom 2 shrinks 7→4 files (only 2 net-new validators). DEFERRED-CLEANUP drops the 3 now-resolved MIGV
items (recorded Closed in MILESTONE-AUDIT, not silently deleted), carries open items
(WINDOWS-CLONE-DEEPNEST depth→[48..94], CI-3 rename, futures), adds GLOSSARY-IRU-URL-FRESHNESS-01 as a
corpus follow-up.

---

## Claude's Discretion

- 95-CONVENTIONS.md content (freshness/SHA matrix + locked strings).
- Exact `$rand` charset + temp-dir cleanup assertions in the Axis-1 recipe.
- Final V-94-CONTENT needle strings (confirm against 94-VERIFICATION.md grep-counts).
- BASELINE_16 anchor SHA (known-PAST).
- Re-confirm V111 = `919b23b` on authoring day.
- Exact roadmap/STATE/REQUIREMENTS patch text for the apex `[48..93]`→`[48..94]` correction.

## Deferred Ideas

- `GLOSSARY-IRU-URL-FRESHNESS-01` (NEW, corpus follow-up — glossary single-URL assertion vs 3-URL reality).
- `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` carried forward (depth → [48..94]).
- All carried v1.11 deferred items (MTPSSO/KRBFUT/MIGFUT futures, CI-3 rename, v1.8 Part C).
- Dropped (resolved by Phase 94): INTUNE-PROFILE-ENROLLMENT-01, IRU-CONSOLE-DELETE-01, SUPERVISION-STATUS-POST-MIGRATION-01.
