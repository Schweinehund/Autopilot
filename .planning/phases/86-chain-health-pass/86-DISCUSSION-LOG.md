# Phase 86: Chain Health Pass - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-23
**Phase:** 86-chain-health-pass
**Areas discussed:** Root-cause fix strategy, 73-RETRO-INVENTORY restore, 0-SKIPPED + cascade, Linux GHA proof method
**Method:** All four gray areas adjudicated via `/adversarial-review` (Finder → Adversary → Referee, opus) per user request. Grounded by running the actual validators + git verification.

---

## D1 — Root-cause fix strategy (V-58-10 & V-59-24)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Frozen-aware | Read target at v1.5-close SHA `ba2cbc0` via `_lib/frozen-at-close.mjs`; tag `[v1.5-frozen @ ba2cbc0]` | ✓ (both assertions) |
| (b) Content-fix | Edit live docs (review_by→45-day; reformat glossary see-also to 2-line) | |
| (c) Update/retire assertion | Relax to current convention (90-day cadence / single-line see-also) | |

**Final ruling:** (a) frozen-aware for **both** V-58-10 and V-59-24.
**Adjudication trail:**
- **Finder:** (a) for both. Verified frozen state passes both (`ba2cbc0` doc = exactly 45 days; glossary 2-line at close). Live failures are intentional v1.10 additions.
- **Adversary:** PARTIAL OVERTURN — keep (a) for V-59-24, but (c) rule-fix for V-58-10: argued the 45-day "D-19" rule was superseded project-wide by a "DS-2 90-day cadence" (commit `624da88`, Phase 79; live doc = 92 days; siblings use tolerant `days>60`). Claimed freezing masks a dead rule + blinds chain to live freshness.
- **Referee:** Adversary's V-58-10 overturn **REVERSED**. Decisive: (1) ROADMAP SC#1 prescribes frozen-aware **by name** for all 10 validators; (2) the proposed `days>60` rule **still fails** the live 92-day doc; (3) V-58-10 is an as-shipped Phase-58 deliverable assertion, not the live-freshness sentinel; (4) frozen-aware is deterministic forever (fixed historical dates, no run-date math). V-59-24 (a) **UPHELD** — live single-line see-also is deliberate v1.9/v1.10 style, not a defect.

**Notes:** Confidence HIGH on both. Frozen SHA `ba2cbc0` (V15) already published in `_lib/frozen-at-close.mjs` — no new SHA entry needed.

---

## D2 — 73-RETRO-INVENTORY.md restoration

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Archive-aware | `resolveArchivedPhasePath(suffix, ['v1.8-phases'])` in check-phase-73 (no file dup) | ✓ |
| (b) Restore file | Copy file back to active `.planning/phases/` path | |
| (c) Regenerate | Author a fresh inventory | |

**Final ruling:** (a) archive-aware.
**Adjudication trail:** Finder (a); Adversary UPHELD (a); Referee UPHELD (a) HIGH. Verified: no live copy exists; archived file at `v1.8-phases/...` has exactly **19** `| check-phase-` rows (passes `>=19` gate); default `milestoneRoots=['v1.5-phases']` so explicit `['v1.8-phases']` is required (precedent: check-phase-62/63 pass `['v1.6-phases']`). (b) would duplicate correctly-archived content into the active tree (drift hazard).

---

## D3 — "0 SKIPPED" interpretation + cascade handling

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Literal zero | Remove skip-pass scaffolds + NESTED graceful-skips | partial ✓ (literal-zero intent) |
| (b) Non-masking skips OK | Keep environmental graceful-skips; EXACT MATCH is the real invariant | partial ✓ (NESTED guard + cascade) |

**Final ruling:** Literal 0 SKIPPED (a-intent) **+** keep NESTED recursion guard + cascade auto-clear (b-mechanics).
**Adjudication trail:**
- **Finder:** (b) — non-masking skips OK; 60-66 zero edits.
- **Adversary:** PARTIAL OVERTURN — cascade-auto-clear + NESTED guard UPHELD, but "0 SKIPPED" is **literal** per ROADMAP SC#3/#4; real skip-PASS entries exist (V-73-AUDIT shows "1 SKIPPED"; apex V-82-AUDIT reads archived 82-VERIFICATION.md → skip-PASS), so V-N-AUDIT reads must ALSO be archive-aware.
- **Referee:** Adversary overturn **STANDS** (HIGH; scope MEDIUM). Confirmed `V-72-AUDIT-VERIFY`, `V-73-AUDIT`, apex `V-82-AUDIT` read archived VERIFICATION.md → genuine SKIPPED; fixable via `resolveArchivedPhasePath`. Cascade (60-66 zero edits) + NESTED guard + empty `CHAIN_SKIP` UPHELD.

**Notes:** Scope expansion beyond the roadmap's "10 FAILs" framing. Open item: run full apex once to enumerate the exact final SKIPPED set (Referee MEDIUM-confidence on completeness).

---

## D4 — Linux GHA cross-OS proof

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Dispatch existing workflow | `workflow_dispatch` `audit-harness-v1.9-integrity.yml` (runs chain apex on ubuntu) | ✓ |
| (b) Throwaway workflow | Author a temp GHA workflow then delete | |
| (c) Defer to Phase 88 | Windows-local only here; cross-OS at 88 | |

**Final ruling:** (a) workflow_dispatch existing v1.9 workflow.
**Adjudication trail:** Finder (a); Adversary UPHELD (a); Referee UPHELD (a) HIGH. Verified: v1.9 workflow has `workflow_dispatch` + `linux-chain-ubuntu-latest` running apex `check-phase-82 --verbose` with `autocrlf false` + `fetch-depth 0` + `continue-on-error:false`; gating satisfiable at HEAD. (c) defer is roadmap-illegal — Goal requires Linux-green BEFORE v1.10 harness files (which Phase 88 authors).

---

## Claude's Discretion

- Per-plan commit granularity (atomic vs progressive) within the no-CHAIN_SKIP / no-predecessor-edit constraints.
- Exact `readAtV15Close` call-site refactor shape inside 58/59 (inline vs helper), matching closest precedent.

## Cross-cutting (confirmed during adjudication)

- Editing `check-phase-{58,59,72,73,82}.mjs` is PERMITTED — chain validators are NOT in the predecessor-byte-unchanged invariant (`v1.9-MILESTONE-AUDIT.md:267`).

## Deferred Ideas

- v1.10 harness lineage bump + V19 pin + check-phase-83..88 + CI workflow → Phase 88 (must NOT fold into Atom 2 — Anti-Pattern 5).
- `FROZEN-AWARE-ADOPTION-SWEEP-01` (refactor inline frozen readers in check-phase-{61,67,68,70}) → v1.9+ deferral, out of Phase 86 scope.
