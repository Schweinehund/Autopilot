# Phase 144 Plan 07 — Apex Guard-Proof and Run Evidence

Source: `scripts/validation/check-phase-144.mjs`, authored this plan. All mutation tests below were
run against copies made in the session scratchpad (never inside `scripts/`), per Task 2's
instruction — an untracked in-scope path under `scripts/` is a hard carve-gate failure.

## Task 2: Four module-load guards, proven fail-first

Each of the four guards was proven by copying the unmutated apex (plus its two `_lib/` dependencies,
so the relative imports resolve) to the session scratchpad, mutating exactly ONE invariant per copy,
and loading the mutated copy with `node -e "import('file://<scratchpad-path>/<mutant>.mjs')"`. All
four throw at module load, before any check runs.

### Guard 1 — dedup (`new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length`)

**Mutation:** `CHAIN_PHASES[50] = CHAIN_PHASES[0];` immediately after the `Array.from` generation —
forces a duplicate interior entry while leaving `length` (96) and termini (48/143) untouched, so this
mutation isolates the dedup guard specifically.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_PHASES contains duplicate entries (unique count 95 !== 96)
```

### Guard 2 — length (`CHAIN_PHASES.length !== 96`)

**Mutation:** `CHAIN_END` changed from `143` to `142`, so `Array.from` generates 95 entries instead
of 96. All entries remain unique (dedup guard passes), isolating the length guard.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_PHASES length 95 !== 96 (integers 48..143 inclusive)
```

### Guard 3 — termini (`CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[last] !== 143`)

**Mutation:** `CHAIN_START` changed from `48` to `49` and `CHAIN_END` from `143` to `144` — length
stays exactly 96 (144 - 49 + 1 = 96, so the length guard passes), but the span is shifted, isolating
the termini guard.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_PHASES must span 48..143 (got 49..144)
```

### Guard 4 — CHAIN_EXTRA disjointness (the guard the predecessor `check-phase-138.mjs` structurally
cannot have, D-09)

**Mutation:** `CHAIN_EXTRA` changed from `[30, 31]` to `[48, 31]` — `48` is a member of the
(unmutated) `CHAIN_PHASES` span, so the sidecar overlaps the chain it must stay disjoint from.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_EXTRA overlaps CHAIN_PHASES -- must stay disjoint
```

This is the guard the plan calls out as mattering most: it is the only one of the four that can catch
a sidecar member being silently absorbed into (or overlapping) the span, and `check-phase-138.mjs`
declares its own `CHAIN_EXTRA` at `:165`, after all three of its guards — structurally uncoverable by
them. `check-phase-144.mjs` closes that gap.

### Post-mutation sanity

- The unmutated apex still loads and runs cleanly (see Task 3 below — both full runs exit 0).
- `git status --porcelain --untracked-files=all -- scripts` printed nothing before or after the
  guard-proof session — all four mutants and their `_lib/` copies lived only in the session
  scratchpad (`.../scratchpad/144-guard-proofs/`), never under `scripts/`.
