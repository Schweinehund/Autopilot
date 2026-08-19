# Phase 141: Standalone-RED Validator Set — Chain Members Green - Pattern Map

**Mapped:** 2026-08-07
**Files analyzed:** 13 (5 `.mjs` validators/library, 3 workflow YAML, 5 governance/planning docs)
**Analogs found:** 13 / 13 — every file this phase touches has a direct, same-repo, same-phase-class precedent (mostly from Phase 139/140). No file falls into "no analog."

This phase is pure wiring of already-existing mechanisms into the last few call-sites that
bypass them (RESEARCH.md's "Don't Hand-Roll" table). Patterns below are drawn almost entirely
from Phase 139 (SWEEP-01/02/03) and Phase 140, which are the direct predecessors of this
phase's edit classes.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_9 array + audit comment) | utility/config (classifier fixture) | batch/transform | same file, its own 18 prior `BASELINE_N refreshed` comment blocks | exact (self-precedent) |
| `scripts/validation/check-phase-61.mjs` (`readAtV15CloseFor61` delegation) | validator | request-response (frozen git read) | `scripts/validation/check-phase-49.mjs:264` / `check-phase-51.mjs:31` (SWEEP-03 fail-loud conversion) | exact |
| `scripts/validation/check-phase-68.mjs` (2 chicken-and-egg sites → `pass:false`) | validator | request-response | `scripts/validation/check-phase-70.mjs` (identical wrapper/call-site shape, same phase's sibling edit) | exact |
| `scripts/validation/check-phase-70.mjs` (10 chicken-and-egg sites → `pass:false`) | validator | request-response | `scripts/validation/check-phase-68.mjs` (same shape, fewer sites) | exact |
| `scripts/validation/check-phase-66.mjs` (`:318` timeout raise) | validator | event-driven (subprocess spawn) | `scripts/validation/check-phase-67.mjs:261` (identical `execFileSync(... timeout: 300000 ...)` spawn shape) | exact |
| `scripts/validation/check-phase-67.mjs` (`:261` timeout raise) | validator | event-driven (subprocess spawn) | `scripts/validation/check-phase-66.mjs:318` (mirror edit, same phase) | exact |
| `.github/workflows/audit-harness-v1.5-integrity.yml` (`if: always()`) | config (CI workflow) | event-driven | none in-repo — new pattern, see "No Analog Found" below | none (documented) |
| `.github/workflows/audit-harness-v1.6-integrity.yml` (`if: always()`) | config (CI workflow) | event-driven | same as v1.5 | none (documented) |
| `.github/workflows/audit-harness-v1.7-integrity.yml` (`if: always()` + `timeout-minutes` raise) | config (CI workflow) | event-driven | same as v1.5/v1.6 for `if: always()`; itself for the existing `timeout-minutes: 30` job as the raise-value precedent | partial |
| `.planning/milestones/v1.20-CARVE.md` (D-09 amendment: add `check-phase-67.mjs`) | config (governance allowlist) | CRUD (append category/entry) | commit `1bf0a65f` "CARVE amendment — allowlist Category 9" (Phase 139-03) | exact |
| `.planning/milestones/v1.20-GOV-02-LEDGER.md` (row per edit) | config (evidence ledger) | CRUD (append row) | existing rows 1–8 in the same file (Phase 139 plans 01-04) | exact |
| `.planning/REQUIREMENTS.md` (SWEEP-09 annotation) | config (governance doc) | CRUD (append marker) | `REQUIREMENTS.md:16,17,18,20` — existing `[SUCCESS-CRITERION AMENDMENT, D-NN]` markers | exact |
| `.planning/ROADMAP.md`, `.planning/STATE.md` (D-28 amendments) | config (governance doc) | CRUD (in-place annotate) | same `[SUCCESS-CRITERION AMENDMENT]` convention; STATE.md's own existing count-table rows | exact |

## Pattern Assignments

### `scripts/validation/check-phase-61.mjs` — `readAtV15CloseFor61` (validator, request-response)

**Analog:** `scripts/validation/check-phase-49.mjs:255-267` and `check-phase-51.mjs:31` (Phase 139 SWEEP-03 fail-loud conversion — the literal precedent named in D-09).

**Current shape to replace** (`check-phase-61.mjs:39-45`, from RESEARCH.md):
```js
function readAtV15CloseFor61(relPath) {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:' + relPath], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}
```

**Analog pattern actually applied at `check-phase-49.mjs:263-266`** (verified this session):
```js
// SWEEP-03 (v1.20 Phase 139 Plan 03, D-27/D-30): fail loud -- the readAtV15Close throw
// now propagates to the runner's outer catch instead of being swallowed into a
// wrong-diagnosis "file missing" detail string. Accounting record: 139-03-SUMMARY.md.
const content = readAtV15Close(f);
```
Note the pattern: **delete the local wrapper entirely, call the already-imported library
function directly**, and leave a dated comment naming the sweep/plan. `check-phase-61.mjs`
already imports `readAtV15Close` (`:20`) and already calls it unwrapped at `:271,282,297,313`.

**Target shape** (per RESEARCH.md Pattern 3, D-09 — the function name must survive verbatim
because `check-phase-68.mjs:206` `V-68-10` does `c.includes('readAtV15CloseFor61')`):
```js
function readAtV15CloseFor61(relPath) {
  return readAtV15Close(relPath);
}
```
The 8 call-sites' existing `if (c === null) return {pass:false, ...}` guards (lines
67,80,89,103,116,126,139,148) become dead but harmless — the runner's outer try/catch
(`check-phase-61.mjs:413`, identical shape at `check-phase-49.mjs`) converts the now-thrown
error into a FAIL either way.

**Error handling pattern (the outer runner catch, present in every chain validator, e.g.
`check-phase-49.mjs`'s own top-level structure):**
```js
try {
  result = check.run();
} catch (e) {
  result = { pass: false, detail: 'Unexpected error: ' + e.message };
}
```

---

### `scripts/validation/check-phase-68.mjs` and `check-phase-70.mjs` — chicken-and-egg call-sites (validator, request-response)

**Analog:** each other (sibling files, identical shape) — `check-phase-70.mjs` has the larger
set (10 sites) and is the better template for `check-phase-68.mjs`'s 2.

**Current shape** (`check-phase-70.mjs:387-390`, verified in RESEARCH.md):
```js
const c = readCorpusFileAtV17Close(PATH);
if (c === null) {
  return { pass: true, skipped: true, detail: 'chicken-and-egg: aa6de68 placeholder unresolved; Plan 70-05 Commit A substitutes' };
}
```

**Target shape** (D-11/D-13 — change the call-site's `pass`/`skipped` fields only; do NOT
touch the wrapper function's own `try/catch`, which other call-sites still legitimately rely
on to receive `null`):
```js
const c = readCorpusFileAtV17Close(PATH);
if (c === null) {
  return { pass: false, detail: 'frozen read of ' + PATH + ' at v1.7-close failed (aa6de68 no longer chicken-and-egg — see frozenCause)' };
}
```
Exact site list: `check-phase-68.mjs:123,185` (2); `check-phase-70.mjs:389,403,420,435,450,
466,485,501,517,532` (10, of which `:485` guards the *different* SHA `4df3a16` via
`readProjectAtV17CloseGate()` — same field-flip, different detail string, per D-14).

**Anti-pattern (explicit — do not do this):** deleting the wrapper functions'
`try{}catch(e){return null}` themselves. Unlike `check-phase-61.mjs`'s single inline reader,
these wrappers are shared by many call-sites; only the specific `chicken-and-egg` branches
change.

---

### `scripts/validation/check-phase-66.mjs` (`:318`) and `check-phase-67.mjs` (`:261`) — timeout raise (validator, event-driven subprocess spawn)

**Analog:** each other — identical `execFileSync` spawn shape, same phase's paired edit.

**Current shape, both files (verified):**
```js
// check-phase-66.mjs:318 — CHAIN-* spawn (RAISE)
execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
// check-phase-66.mjs:341 — v1.6 harness AUDIT spawn (LEAVE — V-68-11 substring pin)
execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
// check-phase-67.mjs:261 — no env override, inherits parent CHECK_PHASE_NESTED state
execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
```

**Guard rail:** `check-phase-68.mjs:225` (V-68-11) does a bare substring check
`c.includes('timeout: 300000')` against `check-phase-66.mjs`'s content — satisfied by either
occurrence. Raise only `:318`, leave `:341` untouched, and V-68-11 stays green. Value to raise
to is Claude's Discretion (CONTEXT.md), but RESEARCH.md Pitfall 2 warns: `check-phase-68/69/
70.mjs`'s own `isPeer = phaseNum >= 67` short-circuit (`check-phase-68.mjs:260-264`) does
**not** shield phases 48-66 from the same exponential expansion inside their own CI job — so
raise all four CI job caps (D-18), not just 67's, and measure cold rather than assume.

---

### `.github/workflows/audit-harness-v1.5/v1.6/v1.7-integrity.yml` — `if: always()` (config, event-driven)

**No `if: always()` usage exists anywhere in this repo's workflows today** (grep returned zero
hits). This phase introduces the pattern net-new — RESEARCH.md's "Don't Hand-Roll" table
names it directly: use the standard GitHub Actions `if: always()` key, not a custom
`needs.harness-run.result` conditional string. Apply to every job carrying
`needs: harness-run` (RESEARCH.md verified: v1.5 = 14 `check-phase-NN` jobs + 1 advisory = 15;
v1.6 = 5 + 2 = 7; v1.7 = 4 + `linux-chain-ubuntu-latest` + 2 = 7; total 29, of which 23 are
`check-phase-NN`). Standard idiom:
```yaml
check-phase-67:
  needs: harness-run
  if: always()
  timeout-minutes: 15   # raise per D-18 — measure cold, don't assume 67's floor generalizes
  continue-on-error: false
```
`.github/workflows/audit-harness-*.yml` is CARVE Category 1, already on-list — no CARVE
amendment needed for this edit.

---

### `.planning/milestones/v1.20-CARVE.md` — D-09 amendment adding `check-phase-67.mjs`

**Analog:** commit `1bf0a65f` "docs(139-03): CARVE amendment — allowlist Category 9 for the
negative harness" — the only prior D-09 amendment commit in this repo's history.

**Commit shape (verified via `git show 1bf0a65f`):**
```
docs(139-03): CARVE amendment — allowlist Category 9 for the negative harness

D-09 amendment commit, landed before the edit it authorizes. Adds
scripts/validation/frozen-read-negative-test.mjs (SWEEP-03's file://
shallow-clone negative harness, D-31) to the v1.20-CARVE allowlist as
Category 9. Touches only this file, per the amendment procedure.

 .planning/milestones/v1.20-CARVE.md | 5 +++++
 1 file changed, 5 insertions(+)
```
```diff
+
+# Category 9 — the file:// shallow-clone negative harness proving fail-loud frozen
+# reads at the library and validator level (SWEEP-03, D-31). A standalone CLI script,
+# never a chain validator (not added to any CHAIN_PHASES array) — Plan 139-03 Task 2.
+scripts/validation/frozen-read-negative-test.mjs
```

**Target for Phase 141 (D-12):** either append `check-phase-67.mjs` to the existing
**Category 5** block (`v1.20-CARVE.md:178-193`, the 15-member chain-validator list that is
missing exactly this one file per D-12/RESEARCH.md) or add a new numbered category — Claude's
Discretion — but the commit must touch **only** `v1.20-CARVE.md`, land alone, and land
**before** the check-phase-67.mjs edit it authorizes (deferred to Phase 144 per D-12; only the
amendment lands in 141). Follow the amendment procedure verbatim
(`v1.20-CARVE.md:64-72`, three numbered rules: touches only this file / carries a one-line
rationale / lands before the edit).

---

### `.planning/milestones/v1.20-GOV-02-LEDGER.md` — one row per frozen-surface edit

**Analog:** existing rows 1–8 in the same file (Phase 139, plans 01-04) — the row schema is
self-documented at `:19-21`:
```markdown
| File | Grep command | Hit count | Regression gate run | Result | Plan |
```
**Discipline rules (verbatim, `:8-17`):** append-only; row-per-edit not row-per-path (two
edits to the same path across two plans may each get a row); absence is correct for a plan
touching no frozen-surface path, not a gap. Model the "Grep command" / "Hit count" / "Result"
cells on the row-6 style: target-scoped path-literal + symbol greps, explicit hit counts,
explicit before/after PASS tallies, and an explicit "no frozen call-site conflict found"
sentence when applicable. Every row in this ledger already follows the target-scoped grep
discipline from CARVE D-12 — do the same before each of this phase's frozen-surface edits.

---

### `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` — D-28 six amendments

**Analog:** `.planning/REQUIREMENTS.md:16,17,18,20,24` — the existing
`[SUCCESS-CRITERION AMENDMENT, D-NN]` / `[NEW REQUIREMENT, D-NN]` bracket-marker instrument,
already in live use four times this milestone (SWEEP-01/02/03/09). Verbatim example
(`REQUIREMENTS.md:18`):
```
- [x] **SWEEP-03**: **[SUCCESS-CRITERION AMENDMENT, D-30]** FOUR silent-swallow fallbacks, not three — `check-phase-49.mjs:264`, `check-phase-49.mjs:297`, `check-phase-49.mjs:334`, and `check-phase-51.mjs:31` — fail loud instead of returning `null` / `""`, proven by a negative test
```
And (`REQUIREMENTS.md:17`, the closest analog to D-24/SWEEP-02's re-scope pattern D-27 cites
as precedent):
```
- [x] **SWEEP-02**: **[SUCCESS-CRITERION AMENDMENT, D-24]** A dedicated `frozen-read-probe` job (no `needs:`), one per retrofitted workflow, executes a frozen `git show` read plus one real `readAtClose` call successfully in a dispatched CI run — replacing the original "..." wording, which is structurally unobtainable in Phase 139 (D-23): ...
```
**Apply this exact bracket convention** to all six D-28 statements: `ROADMAP.md` SC#2 (amend,
strike the withdrawn classifier-window mechanism), `ROADMAP.md` SC#4 (amend the ~19→corrected
census), `REQUIREMENTS.md` SWEEP-09 (amend the reader-site unit), `REQUIREMENTS.md` "Ordering,
corrected" paragraph (annotate only — do not overwrite, per the `:8` HEAD-stamp discipline),
`STATE.md`'s six stale locations (routine hygiene edits, no bracket marker needed — these are
plain count corrections, not amendments to a ratified success criterion), and `ROADMAP.md`
"Discuss-phase flags: None dominant" (correct to name the two live forks). D-27 names the
precedent explicitly: SWEEP-02's re-scope is "the closest analog in this milestone."

## Shared Patterns

### The append-only audit-trail comment (D-04/D-05)
**Source:** `scripts/validation/regenerate-supervision-pins.mjs:392-416` — 18 existing
`BASELINE_N refreshed <date> (Phase NN Plan NN)` comments, none ever edited in place.
**Apply to:** the `BASELINE_9` rebase only. Verified exact literal strings that must survive
untouched (four live pins depend on them):
```
BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08)      -- pinned by check-phase-60.mjs:177 (V-60-09)
BASELINE_10 refreshed ... / Phase 66                     -- pinned by check-phase-66.mjs:127,130 (V-66-03)
BASELINE_11 refreshed ... / Phase 70                     -- pinned by check-phase-70.mjs:179,182 (V-70-06)
```
Append a new dated line after the most recent (Phase 138) entry; edit only the `BASELINE_9`
array literal itself (`:533-543`). Never edit an existing comment line.

### Frozen reads route through `_lib/frozen-at-close.mjs`
**Source:** `scripts/validation/_lib/frozen-at-close.mjs` — `readAtClose`/`readAtV15Close` +
the six-pattern `frozenCause` taxonomy (`:43-44` per CONTEXT.md's line references; confirmed
present at `:69-76` this session: `V15: 'ba2cbc0'`, `V17: 'aa6de68'`, `V17_CLOSEGATE:
'4df3a16'`).
**Apply to:** `check-phase-61.mjs`'s `readAtV15CloseFor61` (delegate, D-09). `check-phase-68/
70.mjs`'s wrapper functions already delegate — only their call-sites' skip-to-fail mapping
changes (D-11).

### CI job gating despite an upstream job failing
**Source:** none in-repo (new pattern this phase introduces). Use the standard `if:
always()` YAML key, not a custom conditional — the simplest correct GitHub Actions idiom.

### CARVE amendment procedure
**Source:** `.planning/milestones/v1.20-CARVE.md:64-72` + commit `1bf0a65f`. Apply to: the
D-09 amendment adding `check-phase-67.mjs`. Must land alone, first, touching only
`v1.20-CARVE.md`.

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `.github/workflows/audit-harness-*.yml` `if: always()` clause | config | event-driven | Confirmed via grep: zero `if: always()` usages anywhere in this repo's workflows today. This phase introduces the pattern net-new, per RESEARCH.md's Don't-Hand-Roll guidance (use the plain YAML key, no custom conditional). |

## Metadata

**Analog search scope:** `scripts/validation/*.mjs`, `scripts/validation/_lib/*.mjs`,
`.github/workflows/*.yml`, `.planning/milestones/*.md`, `.planning/{REQUIREMENTS,ROADMAP,
STATE}.md`, plus targeted `git log`/`git show` on `.planning/milestones/v1.20-CARVE.md`.
**Files scanned:** ~15 direct reads/greps this session, layered on top of RESEARCH.md's
already-exhaustive verified citations (which this file reuses rather than re-reading).
**Pattern extraction date:** 2026-08-07
