# Phase 115: C17 Harness Check (Validator Atom) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-04
**Phase:** 115-c17-harness-check-validator-atom
**Areas discussed:** Strictness/staging, File-scope selection, Diagnostics surface, Integration & invocation
**Adjudication method:** three-agent adversarial review (Finder → Adversary → Referee), per user request; each agent independently re-verified deciding facts against the repo.

---

## Strictness / staging (REQUIREMENTS Flag #2)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — Fully blocking, scope-limited | Blocks from Phase 115; target set is only enrolled/conformant files (templates + rep set); C17 immutable, content grows | ✓ |
| 1B — Informational-then-graduate | Warn-only from 115, graduate to blocking at Phase 119 (v1.5 C9/C11/C13 precedent) | |
| 1C — Blocking, per-phase scope edits | Hard scope list edited in 116/117/118 | |

**User's choice:** 1A (via "Lock all + proceed").
**Notes:** Referee upheld the Finder. 1B disqualified — ROADMAP requires a live blocking gate DURING 116–118 (`:111`, `:126`, `:134`); C9/C11/C13 graduated at their own close with nothing downstream depending on them, and a warn→block flip is a disallowed second edit. 1C disqualified — violates the "C17 never re-opened during content phases" atom constraint (`:119`).

---

## File-scope selection

| Option | Description | Selected |
|--------|-------------|----------|
| 2A — Opt-in by EEE-key presence | Gated iff frontmatter carries the new keys; scoped to `docs/` | ✓ |
| 2B — Named-class directory list (D-03) | Assert on every file in Phase-1 named classes | |
| 2C — Registry-driven (RE-index.md) | Assert on exactly the RE-index-enrolled files | |
| 2D — Hybrid (directory universe + key enrollment) | Finder's original pick | |

**User's choice:** 2A (via "Lock all + proceed").
**Notes:** Adversary OVERTURNED the Finder's 2D; Referee flipped to 2A. Decisive fact: `docs/_templates/` is NOT a D-03 named class, so 2D's directory universe excludes templates → SC3's hard `docs/_templates/*` clause becomes vacuous; 2A enrolls templates automatically (they carry all four keys). 2D's only edge (catch keyless new docs) needs per-file phase-state = 1C (DQ) or 2C registry coupling (DQ). 2B enrolls the ~150 un-retrofitted docs → breaks SC3 green-now. 2C: RE-index is 179 rows nearly all `Pending` today; couples C17 to a desyncing external table. 2A's blind spot (keyless new doc) is delegated to a per-phase enrollment-completeness SC in 116–118 (not C17's job; moot in v1.15's reshape-only window).

---

## Diagnostics surface

| Option | Description | Selected |
|--------|-------------|----------|
| 3A — Aggregate per-file/per-assertion | Collect all failures, exit once | |
| 3B — First-failure-exit | Fail fast, one violation per run | |
| 3C — Aggregate + machine summary + stdout AND stderr capture | 3A plus counts-by-assertion + CHAIN-WRAPPER-01 stderr guard | ✓ |

**User's choice:** 3C (via "Lock all + proceed").
**Notes:** Both agents concurred. 3B forces O(n) re-runs over ~150 files and diverges from the established aggregate-and-exit-once runner pattern. 3C's stderr-capture guard is the CHAIN-WRAPPER-01 lesson (dropped stderr masked a real chain failure ~2 weeks). Strict superset of 3A at negligible cost.

---

## Integration & invocation

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — Standalone script, node-builtins-only | `scripts/validation/c17-*.mjs`, no CHAIN_PHASES; Phase 119 folds into v1.15-milestone-audit | ✓ |
| 4B — Shared `_lib/c17-*.mjs` module | v1.15 audit imports it (single source of truth) | |
| 4C — Wire into check-phase-115.mjs now | | |

**User's choice:** 4A (via "Lock all + proceed").
**Notes:** guard-docx precedent verbatim (`:10-11`). 4B disqualified — milestone-audits import node built-ins ONLY (`v1.12/v1.14:38-40`); a `_lib` import breaks self-containment/freeze-reproducibility. 4C disqualified — `check-phase-115.mjs` doesn't exist and is a Phase-119 Atom-2 deliverable; check-phase-NN are continuity validators, not content-contract checks. Mitigation: author C17 node-builtins-only so the Phase-119 fold introduces no import.

---

## Grounding correction surfaced by the review (both agents confirmed)

SC3's "C17 exits 0 on the Phase-113 representative set" is unsatisfiable as written — that set is in `scripts/pipeline/test-fixtures/` (outside `docs/`), carries none of the four EEE keys, and uses a distinct block (`.` separator, Doc-ID-first). A literal scan would FAIL it (#7/#8/separator). Recorded as CONTEXT D-05: at plan time, redefine the rep-set clause as in-`docs/` conformant exemplars (templates) + a version-controlled C17 `--self-test` fixture set (one passing, one intentionally-failing); do NOT retrofit the pipeline fixtures.

## Claude's Discretion

- Exact standalone C17 filename + CLI flag surface (keep node-builtins-only).
- Markdown-parsing approach for the 13 assertions (must handle the template HTML-comment preamble, placeholders, `TEMPLATE-SENTINEL` date, cosmetic bold labels).
- `## Summary` word-count implementation (adopt ROADMAP SC2's ≥30 words).
- Layout of the machine-readable diagnostics summary.

## Deferred Ideas

- Phase 119: audit fold (v1.15-milestone-audit.mjs C1–C17), check-phase-113..119.mjs, BASELINE_19, V114 pin, 12th CI workflow, frozen-surface re-baseline.
- Post-v1.15: the 2A keyless-new-doc blind spot beyond the reshape-only window.
- v1.16: 45 orphan docs + structural classes under EEE + C17 (carried from Phase 114 D-04).
