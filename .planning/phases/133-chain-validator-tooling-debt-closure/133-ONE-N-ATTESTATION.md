# TOOL-05: Single-Apex O(n) Attestation

**Phase:** 133-chain-validator-tooling-debt-closure
**Requirement:** TOOL-05 (`O(n^2)-CHAIN-RUNNER-REMEDIATION-01`), re-scoped per CARVE-2 (see below)
**Nature of this artifact:** Verification + attestation ONLY. **NO code is authored.** `scripts/validation/check-phase-128.mjs` is read-only for this phase — zero bytes changed, confirmed by `git diff --name-only -- scripts/validation/` being empty both before and after this artifact was written (per D-06/D-07).

## Claim

`check-phase-128.mjs`, under the pre-existing `CHECK_PHASE_NESTED=1` guard, already gives the chain-validator apex the required **single-apex O(n) subprocess property**. There is no residual within-apex O(n²) to fix — TOOL-05's original "cache" framing described a problem that does not exist in the shipped code. This section attests that claim with exact source-line citations.

## Source-cited evidence (`scripts/validation/check-phase-128.mjs`)

### 1. `CHAIN_PHASES` is a flat 80-integer array, each phase spawned once, enforced by throw-on-drift assertions

- **Lines 58-62** — `CHAIN_PHASES` is declared as a flat array literal of the 80 integers `48..127` inclusive. No integer repeats; no self-reference to 128.
- **Lines 70-72** — module-load throw: `if (CHAIN_PHASES.length !== 80) { throw new Error(...) }` — fails loud at import time if the array's length drifts from exactly 80.
- **Lines 73-75** — module-load throw: `if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 127) { throw new Error(...) }` — fails loud if the span drifts from `48..127`.

Together these two throw-on-drift assertions guarantee the chain is exactly one entry per predecessor phase, no duplicates, no gaps — the precondition for an O(n), not O(n²), spawn count.

### 2. Each `run()` short-circuits under NESTED; every spawned child receives `CHECK_PHASE_NESTED='1'`

- **Line 101** — `const NESTED = process.env.CHECK_PHASE_NESTED === '1';` — read once from the CURRENT process's env at module scope.
- **Lines 102-136** — the `for (const phaseNum of CHAIN_PHASES)` loop builds one check object per phase. Each check's `run()`:
  - **Lines 108-110** — `if (NESTED) { return { pass: true, skipped: true, detail: 'nested invocation ... skip recursive chain-guard expansion' }; }` — if the CURRENT process is itself a nested child, it returns immediately with **no subprocess spawn at all**. This is what prevents a child from re-expanding its own copy of the chain.
  - **Line 117** — `const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };` — when NOT nested (i.e., this is the invocation actually doing the spawning), the environment handed to the child is built by cloning the parent's env and forcing `CHECK_PHASE_NESTED` to `'1'`. **Every** child, regardless of the parent's own nested/non-nested status, is launched with NESTED set.
  - **Lines 118-124** — `execFileSync('node', [path], { ..., env: subEnv, ... })` — exactly one spawn per `phaseNum`, using `subEnv`.
- **Lines 146-148** — the `AUDIT-HARNESS` check carries the identical guard: `if (NESTED) { return { pass: true, skipped: true, detail: 'nested invocation ... skip AUDIT-HARNESS re-run against evolved corpus' }; }` — a nested invocation never re-runs the frozen `v1.17-milestone-audit.mjs` harness subprocess either.

Net mechanism: a **top-level, non-nested** invocation of `check-phase-128.mjs` spawns each of the 80 `CHAIN_PHASES` children exactly once (Lines 102-136) plus the one `AUDIT-HARNESS` subprocess (Lines 139-161) = **81 total subprocess spawns**. Every one of those 80 children is launched with `CHECK_PHASE_NESTED='1'` in its own environment (Line 117), so when each child's own `check-phase-{N}.mjs` module runs, its own `NESTED` const (its own copy of the Line 101 pattern) reads `'1'` and every one of *its* chain-guard checks short-circuits at the Lines 108-110 pattern — **no child re-spawns its own predecessor sub-chain.** Total subprocess count for one top-level descent is **O(depth) = 81**, not O(depth²) (an un-guarded design would have check-phase-127 spawn check-phase-48..126, each of which would spawn its own full sub-chain again, compounding).

### 3. 81-spawn conclusion, explicitly

- 80 spawns from the `CHAIN_PHASES` loop (Lines 102-136), one per phase in `[48..127]`.
- + 1 spawn from `AUDIT-HARNESS` (Lines 139-161), for `v1.17-milestone-audit.mjs` (Line 54: `const HARNESS = 'scripts/validation/v1.17-milestone-audit.mjs';`).
- = **81 total subprocess spawns** for a single top-level, non-nested run. This is the O(n) — linear in chain depth — signature.

### 4. `isPeer` clarification — timeout only, not a second spawn-count optimization axis

- **Line 115** — `const isPeer = phaseNum >= 67;`
- **Line 116** — `const subTimeout = isPeer ? 600000 : 300000;`

`isPeer` selects a 600s vs 300s `execFileSync` timeout for the child spawn. It has **no effect on spawn count** — every `phaseNum` in `CHAIN_PHASES` still gets exactly one spawn regardless of `isPeer`. This is called out explicitly so it is not mistaken for a second, independent O(n) mechanism; the single mechanism responsible for the O(n) property is the `CHECK_PHASE_NESTED` guard (points 1-3 above), not the peer/non-peer timeout split.

## DUAL-APEX boundary note — this phase does not disturb it

Per `133-RESEARCH.md`'s TOOL-05 section and the workflow comment convention it cites (e.g. `audit-harness-v1.16-integrity.yml`'s "DUAL-APEX (Pitfall 6, D-125-4)" note, same pattern for v1.17): every predecessor workflow's `linux-chain-ubuntu-latest` job **intentionally** runs the full apex recursion at the top level WITHOUT `CHECK_PHASE_NESTED=1`, and the standalone `check-phase-{N}` job ALSO runs the full apex recursion at the top level, independently. These are **two separate top-level, non-nested descents**, each performing its own full 81-spawn O(n) run. This is intentional and audited — it is NOT deduplicated, and `CHECK_PHASE_NESTED=1` must NOT be added to either top-level GHA invocation (doing so would suppress a top-level run's own chain-guard entirely, which is not the same thing as collapsing a *nested* child's redundant re-expansion).

The O(n) collapse attested in this document applies **within a single top-level descent's recursive expansion** only (i.e., it prevents each of the 80 children from re-spawning their own 79-or-fewer-entry sub-chains). It does **not**, and is not intended to, deduplicate the two independent top-level jobs (standalone workflow + `linux-chain-ubuntu-latest`) against each other. This phase's attestation leaves that DUAL-APEX topology completely unchanged — confirmed by the fact that no `.github/workflows/*.yml` file is touched by this plan (out of scope per `133-CONTEXT.md` canonical_refs: "Do not edit the checkout layer (D-04)").

## No code authored — explicit statement

This entire TOOL-05 deliverable is verification + attestation prose plus captured command output (see below). `scripts/validation/check-phase-128.mjs` was read via the `Read` tool only; it was never opened with `Edit` or `Write`. No in-process memo and no on-disk cache were authored anywhere in `scripts/validation/`, consistent with D-06 (ship as verification, not code) and D-07 (reject an on-disk result cache — false-pass-masking risk against HARN-13's cross-OS exact-match; reject an in-process memo too, since authoring even that no-op would require editing the frozen apex, a D-00a violation). `git diff --name-only -- scripts/validation/` is empty at the time this artifact was authored and remains empty after Task 2's cold-clone capture below.

---

## Windows cold-clone verification (Task 2)

See the "Cold-clone capture" section below, appended after Task 1's source attestation.
