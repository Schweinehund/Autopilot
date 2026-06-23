# Phase 86: Chain Health Pass - Research

**Researched:** 2026-06-23
**Domain:** Validator chain frozen-aware / archive-aware conversion (tooling phase)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01** Convert V-58-10 (check-phase-58.mjs) and V-59-24 (check-phase-59.mjs) to frozen-aware reads at v1.5-close SHA `ba2cbc0` (V15) via `readAtV15Close` from `_lib/frozen-at-close.mjs`. Tag each check name `[v1.5-frozen @ ba2cbc0]`.

**D-02** Make V-73-INVENTORY (check-phase-73.mjs:76) archive-aware via `resolveArchivedPhasePath(phaseSuffix, ['v1.8-phases'])`. Do not restore or duplicate the file. The archived copy at `.planning/milestones/v1.8-phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` has exactly 19 rows (verified).

**D-03 (literal 0 SKIPPED)** Convert all V-N-AUDIT skip-PASS reads of archived `*-VERIFICATION.md` to archive-aware. CONTEXT.md named three: V-72-AUDIT-VERIFY (check-phase-72), V-73-AUDIT (check-phase-73), V-82-AUDIT (check-phase-82). **Research found a fourth: V-74-AUDIT (check-phase-74)** — see Critical Finding below. Cascade validators 60-66 get ZERO edits. `CHAIN_SKIP` stays `new Set([])`. Keep NESTED guard.

**D-04 (cascade)** check-phase-{60,61,62,63,64,65,66} get ZERO edits; auto-clear once 58/59 exit 0.

**D-05** Linux cross-OS proof via `workflow_dispatch` on existing `.github/workflows/audit-harness-v1.9-integrity.yml` (`linux-chain-ubuntu-latest` job). Do NOT author a throwaway workflow.

**Permitted files to edit:** check-phase-{58,59,72,73,74,82}.mjs only (chain validators are NOT in the predecessor-byte-unchanged HARD gate per v1.9-MILESTONE-AUDIT.md:267).

### Claude's Discretion

- Per-plan commit granularity (atomic vs progressive) within no-`CHAIN_SKIP` / no-predecessor-edit constraints.
- Exact `readAtV15Close` call-site refactor shape inside 58/59 (inline import vs helper), matching closest existing precedent.

### Deferred Ideas (OUT OF SCOPE)

- v1.10 harness lineage bump (Atom 1 + Atom 2), V19 close-gate SHA pin, check-phase-83..88 validators, audit-harness-v1.10-integrity.yml (Phase 88).
- `FROZEN-AWARE-ADOPTION-SWEEP-01` (refactor remaining inline frozen readers in check-phase-{61,67,68,70}).

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CHAIN-01 | The 10 pre-existing legacy chain FAILs resolved — HEAD-coupled assertions converted to frozen-aware reads via `_lib/frozen-at-close.mjs`, missing 73-RETRO-INVENTORY.md restored/regenerated, no CHAIN_SKIP masking | D-01 frozen-aware conversion + D-02 archive-aware inventory + D-04 cascade auto-clear |
| CHAIN-02 | Full validator chain exits 0 FAIL / 0 SKIPPED on both Windows local and Linux GHA before v1.10 harness lineage bump | D-03 archive-aware VERIFICATION reads + D-05 GHA dispatch |

</phase_requirements>

---

## Summary

Phase 86 is a pure tooling pass. All design decisions were locked via adversarial-review before research began. The research task is not to re-decide but to (1) enumerate the exact edits with source-verified call shapes, (2) close the one open verification item — the definitive list of SKIPPED assertions across the chain — and (3) confirm frozen-SHA and cross-OS invariants.

**Critical Finding (D-03 scope expansion):** The CONTEXT.md D-03 scope listed three V-N-AUDIT archived-VERIFICATION reads to convert (check-phase-72, check-phase-73, check-phase-82). Research discovered a **fourth**: `V-74-AUDIT` in check-phase-74.mjs:110 reads `.planning/phases/74-.../74-VERIFICATION.md` which is archived in `v1.8-phases` (confirmed by `resolveArchivedPhasePath` resolution and live-path absence). This makes the edit scope five files, not four: check-phase-{58,59,72,73,74,82}.mjs.

**Cascade auto-clear confirmed:** check-phase-{60,61,62,63,64,65,66} carry 0 of their own SKIPPED assertions and will auto-clear once 58/59 exit 0. No edits needed.

**Apex verified state:** `check-phase-82.mjs` standalone currently = 26 PASS / 10 FAIL / 1 SKIPPED. The 10 FAILs are all cascade chain-guards for 58/59 and their cascade descendants. The 1 SKIPPED is V-82-AUDIT (82-VERIFICATION.md archived). After all five file edits, the apex target is 37 PASS / 0 FAIL / 0 SKIPPED.

**Primary recommendation:** Edit exactly five validator files — check-phase-58 (D-01), check-phase-59 (D-01), check-phase-72 (D-03), check-phase-73 (D-02 + D-03), check-phase-74 (D-03), check-phase-82 (D-03) — no other files. Then dispatch the v1.9 GHA workflow for Linux proof.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Frozen-aware file read | `_lib/frozen-at-close.mjs` helper | check-phase-58/59 call-site | Centralized; no per-file SHA embed |
| Archive-aware path resolution | `_lib/archive-path.mjs` helper | check-phase-72/73/74/82 call-site | Live-first-then-archived resolver; caller owns FAIL |
| Apex SKIP/FAIL tally | check-phase-82.mjs own assertions | Spawned children contribute exit code only | Child internal SKIPPEDs do not propagate to apex counter |
| Linux cross-OS proof | audit-harness-v1.9-integrity.yml GHA | `linux-chain-ubuntu-latest` job | fetch-depth:0 + autocrlf:false + continue-on-error:false already set |

---

## Standard Stack

No new packages. All helpers are in-repo at `scripts/validation/_lib/`.

### In-Repo Helpers (to consume)

| Asset | Path | Purpose | Call Pattern |
|-------|------|---------|--------------|
| `readAtV15Close` | `_lib/frozen-at-close.mjs` | Read file at frozen SHA `ba2cbc0` | `readAtV15Close(relPath)` → string |
| `MILESTONE_CLOSE_SHAS.V15` | `_lib/frozen-at-close.mjs` | `'ba2cbc0'` literal | Already exported; no new entry needed |
| `resolveArchivedPhasePath` | `_lib/archive-path.mjs` | Live-first-then-archived path resolution | `resolveArchivedPhasePath(phaseSuffix, milestoneRoots)` → string or null |

Both helpers are verified present and their exact signatures are confirmed.

### Package Legitimacy Audit

No external packages are installed in this phase. Section omitted.

---

## Architecture Patterns

### System Architecture Diagram

```
check-phase-82 (apex, standalone run)
  ├─ V-82-AUDIT: readFile(live-path-82-VERIF)
  │    ├─ [BEFORE] live path missing → SKIPPED
  │    └─ [AFTER] resolveArchivedPhasePath('82-.../82-VERIFICATION.md', ['v1.9-phases']) → PASS
  │
  ├─ V-82-CHAIN-58: spawn check-phase-58 → exit code
  │    ├─ [BEFORE] exits 1 (V-58-10 FAIL: 92 days, expected 45) → CHAIN FAIL
  │    └─ [AFTER] exits 0 (readAtV15Close returns ba2cbc0 content: 45 days) → CHAIN PASS
  │
  ├─ V-82-CHAIN-59: spawn check-phase-59 → exit code
  │    ├─ [BEFORE] exits 1 (V-59-24 FAIL: single-line See also in live glossaries) → CHAIN FAIL
  │    └─ [AFTER] exits 0 (readAtV15Close reads ba2cbc0 glossaries: 2-line blockquotes) → CHAIN PASS
  │
  ├─ V-82-CHAIN-{60..66}: spawn each → exit code
  │    ├─ [BEFORE] exits 1 (cascade FAIL: spawns 58/59 which fail)
  │    └─ [AFTER] exits 0 (cascade PASS: 58/59 now pass; ZERO edits to 60-66)
  │
  ├─ V-82-CHAIN-72: spawn check-phase-72 → exit code
  │    ├─ [BEFORE] exits 0 (internal SKIPPED+FAILs but exits 0 due to 0 FAILs)
  │    │  Wait — check-phase-72 currently exits 0 (9 FAIL, 1 SKIP → exits 0??)
  │    │  No: exit code = failed > 0 ? 1 : 0; 9 FAILs → exits 1 → CHAIN FAIL at apex
  │    └─ [AFTER] exits 0 after 58/59 cascade fix + V-72-AUDIT-VERIFY archive-aware → PASS
  │
  ├─ V-82-CHAIN-73: spawn check-phase-73 → exit code
  │    ├─ [BEFORE] exits 1 (INVENTORY FAIL + cascade FAILs) → CHAIN FAIL
  │    └─ [AFTER] exits 0 (INVENTORY + AUDIT both archive-aware) → CHAIN PASS
  │
  ├─ V-82-CHAIN-74: spawn check-phase-74 → exit code
  │    ├─ [BEFORE] exits 1 (cascade FAILs from 58/59/73) → CHAIN FAIL
  │    └─ [AFTER] exits 0 (cascade fixes + V-74-AUDIT archive-aware) → CHAIN PASS
  │
  └─ V-82-AUDIT-HARNESS: spawn v1.9-milestone-audit.mjs → exit code (unchanged, passes now)
```

**Note on child SKIPPED propagation:** When check-phase-82 spawns child validators, it only checks their exit code (0 = PASS for chain-guard, non-0 = FAIL). A child that exits 0 but has internal SKIPPEDs does NOT increment the apex SKIPPED counter. Therefore the apex SKIPPED count is determined solely by check-phase-82's own assertions returning `{ skipped: true }`.

### Recommended Project Structure

No structural changes. All edits are surgical within `scripts/validation/check-phase-{58,59,72,73,74,82}.mjs`.

---

## Definitive SKIPPED Set at Apex (VERIFIED by running check-phase-82 NESTED mode + standalone)

### Apex check-phase-82 standalone current state
```
Result: 26 PASS, 10 FAIL, 1 SKIPPED
```
The 1 SKIPPED is **V-82-AUDIT** (reads `.planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-VERIFICATION.md` which is missing from the live tree — archived in `.planning/milestones/v1.9-phases/82-.../82-VERIFICATION.md`).

### After Phase 86 edits, target apex state
```
Result: 37 PASS, 0 FAIL, 0 SKIPPED
```
(37 = current 26 pass + 10 currently-failing chain-guards turning PASS + V-82-AUDIT turning PASS)

### All assertions that fire `{ skipped: true }` at the apex level (Phase 86 must clear ALL of them)

| Assertion | File | Current Live Path Read | Archives At | Fix |
|-----------|------|----------------------|-------------|-----|
| `V-82-AUDIT` | check-phase-82.mjs:52 | `.planning/phases/82-.../82-VERIFICATION.md` | `v1.9-phases` | `resolveArchivedPhasePath('82-.../82-VERIFICATION.md', ['v1.9-phases'])` |

That is the ONLY assertion that generates a SKIPPED in the apex's own tally. The child validators' internal SKIPPEDs do not propagate.

### NESTED guard structural SKIPPEDs (NOT counted by apex in standalone mode)

When check-phase-82 runs with `CHECK_PHASE_NESTED=1`, all 34 V-82-CHAIN-NN assertions return `{ skipped: true }`. These are never present in a standalone apex run — they only fire when check-phase-82 itself is a child in another chain. These SKIPPEDs are internal to the recursion guard and must remain (per D-04 "Keep NESTED guard").

### Child-internal SKIPPEDs that are cleared by Phase 86 edits

These fire inside child subprocess invocations (not at apex level). They cause the child to exit 0 (which is fine — exit code 0 means PASS for the apex chain-guard). However, once converted to archive-aware, they transition from SKIPPED to PASS inside the child — confirming semantic correctness even though they do not affect the apex counter.

| Assertion | File | Currently | After Edit |
|-----------|------|-----------|------------|
| `V-72-AUDIT-VERIFY` | check-phase-72.mjs:112 | SKIPPED (live path missing) | PASS (archive-aware, v1.8-phases) |
| `V-73-AUDIT` | check-phase-73.mjs:169 | SKIPPED (live path missing) | PASS (archive-aware, v1.8-phases) |
| `V-74-AUDIT` | check-phase-74.mjs:110 | SKIPPED (live path missing) | PASS (archive-aware, v1.8-phases) |

### D-03 SCOPE EXPANSION: V-74-AUDIT is missing from CONTEXT.md

**CONTEXT.md D-03 listed:** V-72-AUDIT-VERIFY (check-phase-72), V-73-AUDIT (check-phase-73), V-82-AUDIT (check-phase-82).

**Research confirms a 4th:** `V-74-AUDIT` at check-phase-74.mjs:110 reads:
```
.planning/phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-VERIFICATION.md
```
This path is absent from the live tree (confirmed). The file exists at:
```
.planning/milestones/v1.8-phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-VERIFICATION.md
```
`resolveArchivedPhasePath('74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-VERIFICATION.md', ['v1.8-phases'])` returns the correct path (verified). The fix is identical in shape to V-72-AUDIT-VERIFY and V-73-AUDIT.

**Impact on the "0 SKIPPED" goal:** V-74-AUDIT fires a SKIPPED inside check-phase-74's own run. check-phase-74 currently exits 1 (cascade FAILs from 58/59). After 58/59 are fixed, check-phase-74 exits 0 — but V-74-AUDIT will remain SKIPPED internally. This does NOT prevent the apex from exiting 0 (child exits 0 regardless of internal SKIPPEDs). However, the literal "0 SKIPPED" target in SC#3 is the apex tally — and the apex tally only counts its own assertions. The apex's own V-82-AUDIT is the only live SKIPPED at the apex level.

**Conclusion:** Whether or not V-74-AUDIT is converted, the apex SKIPPED count is 1 (V-82-AUDIT) before Phase 86 edits and 0 after V-82-AUDIT is archive-aware. Converting V-74-AUDIT is good semantic hygiene (removes a known-misleading SKIPPED from check-phase-74's standalone output) but is NOT required by SC#3 interpreted as "apex tally." The planner should include V-74-AUDIT conversion for completeness, noting it is a bonus cleanup, not strictly required for SC#3.

---

## Exact Edit Shapes (VERIFIED against source)

### D-01: check-phase-58.mjs — V-58-10 frozen-aware conversion

**Current state (lines 11-22, 196-214):** `check-phase-58.mjs` imports only `{ readFileSync, existsSync }` from `node:fs`. V-58-10 uses a local `readFile()` that reads from live HEAD. The frontmatter check computes `days = Math.round((rb - lv) / ...)` and compares to 45. Live doc now has 92-day cycle — FAILS.

**Verified at `ba2cbc0`:** `last_verified: 2026-05-01`, `review_by: 2026-06-15` → exactly 45 days. [VERIFIED: `git show ba2cbc0:docs/reference/4-platform-capability-comparison.md | head`]

**Edit shape (mirror of check-phase-61.mjs:20 + lines 288-295):**

```javascript
// ADD import at top (after existing node: imports):
import { readAtV15Close } from './_lib/frozen-at-close.mjs';

// IN V-58-10 check run() — replace the readFile(COMPARISON_DOC) call:
// BEFORE:
//   const c = readFile(COMPARISON_DOC);
//   if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
// AFTER:
const c = readAtV15Close(COMPARISON_DOC);
// (no null check needed — readAtV15Close throws on git error; let it propagate)

// ALSO update the check name to add frozen suffix:
// BEFORE: name: "V-58-10: comparison doc frontmatter has last_verified + review_by (45-day cycle per D-19) + audience: admin + platform: all",
// AFTER:  name: "V-58-10: comparison doc frontmatter has last_verified + review_by (45-day cycle per D-19) + audience: admin + platform: all [v1.5-frozen @ ba2cbc0]",
```

**Only V-58-10 needs this change.** V-58-01 through V-58-09 and V-58-11 through V-58-26 read live files legitimately and must keep `readFile()`. [VERIFIED: checked all 26 assertions in source]

### D-01: check-phase-59.mjs — V-59-24 frozen-aware conversion

**Current state:** `check-phase-59.mjs` imports only `{ readFileSync, existsSync }`. V-59-24 reads all 4 live glossary files and checks that each `> See also:` line is preceded by a `>` line. Live glossaries (`_glossary.md` lines 115/162, `_glossary-macos.md` lines 134/140/146) now have single-line `> See also:` entries — FAILS.

**Verified at `ba2cbc0`:** All 4 glossaries pass V-59-24 (0 failures). [VERIFIED: extracted all 4 glossaries at `ba2cbc0` and ran the assertion logic manually]

**Edit shape:**

```javascript
// ADD import at top:
import { readAtV15Close } from './_lib/frozen-at-close.mjs';

// IN V-59-24 run() — replace each readFile(f) call with readAtV15Close(f):
// The current code iterates ALL_GLOSSARIES with: const c = readFile(f);
// Change to: const c = readAtV15Close(f);
// (no null-check needed on frozen read)

// UPDATE check name:
// BEFORE: name: 'V-59-24: A3 blockquote integrity -- every "> See also:" line is preceded by another ">" line within its H3 region',
// AFTER:  name: 'V-59-24: A3 blockquote integrity -- every "> See also:" line is preceded by another ">" line within its H3 region [v1.5-frozen @ ba2cbc0]',
```

**Only V-59-24 needs this change.** Checks V-59-20 through V-59-23 (A1, A2, bidirectional pairs) also read glossary files but assert on current-state structure (glossary headings, anchor slugs), not on blockquote formatting. These must stay live. [VERIFIED: reviewed assertions in source]

### D-02 + D-03: check-phase-73.mjs — V-73-INVENTORY + V-73-AUDIT

**Check-phase-73 currently imports** `{ readFileSync, existsSync }` and `{ join }` from node builtins. `{ execFileSync }` for chain guards. No archive-path import.

**V-73-INVENTORY (line 72-83):** Hardcoded path `.planning/phases/73-.../73-RETRO-INVENTORY.md` — FAILS (file missing from live tree).

**V-73-AUDIT (line 164-176):** Hardcoded path `.planning/phases/73-.../73-VERIFICATION.md` — SKIPPED (file missing from live tree; `if (!verif) return { pass: true, skipped: true, ...}`).

**Edit shape:**

```javascript
// ADD import at top (after existing imports):
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';

// V-73-INVENTORY run() — replace hardcoded path:
// BEFORE:
//   const c = readFile('.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md');
//   if (c === null) return { pass: false, detail: '73-RETRO-INVENTORY.md missing' };
// AFTER:
const inventoryPath = resolveArchivedPhasePath(
  '73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md',
  ['v1.8-phases']
);
const c = inventoryPath ? readFile(inventoryPath) : null;
if (c === null) return { pass: false, detail: '73-RETRO-INVENTORY.md missing (not in live tree or v1.8-phases archive)' };
// Rest of assertion unchanged (rowCount >= 19 check)

// V-73-AUDIT run() — replace hardcoded path:
// BEFORE:
//   const verif = readFile('.planning/phases/73-retrospective-forward-port-pillar-c/73-VERIFICATION.md');
//   if (!verif) return { pass: true, skipped: true, detail: '73-VERIFICATION.md not yet authored...' };
// AFTER:
const verifPath = resolveArchivedPhasePath(
  '73-retrospective-forward-port-pillar-c/73-VERIFICATION.md',
  ['v1.8-phases']
);
const verif = verifPath ? readFile(verifPath) : null;
if (!verif) return { pass: false, detail: '73-VERIFICATION.md not found in live tree or v1.8-phases archive' };
// (change from SKIP-PASS to FAIL if not found — it MUST be in the archive now)
// Rest of assertion unchanged
```

**Verified:** `resolveArchivedPhasePath('73-.../73-RETRO-INVENTORY.md', ['v1.8-phases'])` → `.planning/milestones/v1.8-phases/73-.../73-RETRO-INVENTORY.md` (19 rows confirmed). `resolveArchivedPhasePath('73-.../73-VERIFICATION.md', ['v1.8-phases'])` → `.planning/milestones/v1.8-phases/73-.../73-VERIFICATION.md` (file exists). [VERIFIED by running `resolveArchivedPhasePath` with node]

### D-03: check-phase-72.mjs — V-72-AUDIT-VERIFY

**V-72-AUDIT-VERIFY (line 112):** Hardcoded path `.planning/phases/72-.../72-VERIFICATION.md` — SKIPPED.

**Edit shape (mirror of check-phase-73 V-73-AUDIT pattern):**

```javascript
// ADD import at top:
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';

// V-72-AUDIT-VERIFY run() — replace hardcoded path:
// BEFORE:
//   const verif = readFile('.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md');
//   if (!verif) return { pass: true, skipped: true, detail: '72-VERIFICATION.md not yet authored...' };
// AFTER:
const verifPath = resolveArchivedPhasePath(
  '72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md',
  ['v1.8-phases']
);
const verif = verifPath ? readFile(verifPath) : null;
if (!verif) return { pass: false, detail: '72-VERIFICATION.md not found in live tree or v1.8-phases archive' };
// Rest unchanged: check for 'Per-Validator Audit Inventory' heading
```

**Verified:** `resolveArchivedPhasePath('72-.../72-VERIFICATION.md', ['v1.8-phases'])` → `.planning/milestones/v1.8-phases/72-.../72-VERIFICATION.md`. [VERIFIED]

### D-03: check-phase-82.mjs — V-82-AUDIT

**V-82-AUDIT (line 52):** Hardcoded path `.planning/phases/82-.../82-VERIFICATION.md` — SKIPPED. This is the ONLY assertion contributing to the apex SKIPPED counter in standalone mode.

**Edit shape:**

```javascript
// ADD import at top:
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';

// V-82-AUDIT run() — replace hardcoded path:
// BEFORE:
//   const verif = readFile('.planning/phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-VERIFICATION.md');
//   if (!verif) return { pass: true, skipped: true, detail: '82-VERIFICATION.md not yet authored (PASS-via-skip until Plan 82-04 lands)' };
// AFTER:
const verifPath = resolveArchivedPhasePath(
  '82-harness-lineage-bump-terminal-re-audit-milestone-close/82-VERIFICATION.md',
  ['v1.9-phases']
);
const verif = verifPath ? readFile(verifPath) : null;
if (!verif) return { pass: false, detail: '82-VERIFICATION.md not found in live tree or v1.9-phases archive' };
// Rest unchanged: check for /Phase 82/i
```

**Verified:** `resolveArchivedPhasePath('82-.../82-VERIFICATION.md', ['v1.9-phases'])` → `.planning/milestones/v1.9-phases/82-.../82-VERIFICATION.md` (file exists). [VERIFIED]

**milestoneRoots is `['v1.9-phases']` (not v1.8-phases).** Phase 82 closed in v1.9, not v1.8.

### D-03 BONUS: check-phase-74.mjs — V-74-AUDIT (not in CONTEXT.md D-03 scope, but recommended)

**V-74-AUDIT (line 110):** Hardcoded path `.planning/phases/74-.../74-VERIFICATION.md` — SKIPPED.

**Edit shape (identical pattern, milestoneRoots = ['v1.8-phases']):**

```javascript
// ADD import at top:
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';

// V-74-AUDIT run() — replace hardcoded path:
const verifPath = resolveArchivedPhasePath(
  '74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-VERIFICATION.md',
  ['v1.8-phases']
);
const verif = verifPath ? readFile(verifPath) : null;
if (!verif) return { pass: false, detail: '74-VERIFICATION.md not found in live tree or v1.8-phases archive' };
// Rest unchanged: check for /Phase 74/i
```

**Verified:** `resolveArchivedPhasePath('74-.../74-VERIFICATION.md', ['v1.8-phases'])` → `.planning/milestones/v1.8-phases/74-.../74-VERIFICATION.md`. [VERIFIED]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Read file at frozen SHA | Custom `git show` invocation | `readAtV15Close` from `_lib/frozen-at-close.mjs` | CRLF normalization, timeout, stdio config all handled |
| Resolve archived phase path | Manual path construction | `resolveArchivedPhasePath` from `_lib/archive-path.mjs` | Live-first-then-archived with multi-root support, input validation |
| Cross-OS proof | Throwaway workflow | `workflow_dispatch` on existing `audit-harness-v1.9-integrity.yml` | `linux-chain-ubuntu-latest` job already has fetch-depth:0, autocrlf:false, continue-on-error:false |

**Key insight:** Both `_lib` helpers already handle the exact edge cases that would bite a custom implementation (CRLF, null input, missing file semantics). Only add a `resolveArchivedPhasePath` import to the three/four files that need it; both `readAtV15Close` and `resolveArchivedPhasePath` handle the heavy lifting.

---

## Cascade Zero-Edit Confirmation

**check-phase-{60,61,62,63,64,65,66} require ZERO edits.** Confirmed by:

1. Source scan: none of these files contain `VERIFICATION.md` reads (only check-phase-60 has a `48-VERIFICATION-broken-links.md` reference, which is a different file at a resolved archive path).
2. Current behavior: each of these files exits 1 solely because their chain-guard subprocesses spawn 58/59 which FAIL. Fix 58/59 → cascade auto-clears.
3. check-phase-68 (also in chain) confirmed: runs currently with 0 SKIPPED (chicken-and-egg skips were resolved in v1.7). [VERIFIED: `check-phase-68.mjs` → `Result: 24 PASS, 9 FAIL, 0 SKIPPED` with the 9 FAILs being cascade from 58/59]

**The planner must not touch check-phase-{60..66}.** Any edit to those files risks breaking their byte-integrity relative to v1.9 close-gate expectations.

---

## Common Pitfalls

### Pitfall 1: Wrong milestoneRoots for check-phase-82
**What goes wrong:** Using `['v1.8-phases']` for the V-82-AUDIT read in check-phase-82.mjs.
**Why it happens:** Phases 72/73/74 are all in `v1.8-phases`; 82 is in `v1.9-phases`.
**How to avoid:** milestoneRoots mapping is: 72 → v1.8-phases, 73 → v1.8-phases, 74 → v1.8-phases, 82 → v1.9-phases. Verify with `ls .planning/milestones/v1.9-phases/` before editing.
**Warning signs:** `resolveArchivedPhasePath(..., ['v1.8-phases'])` returns null for the 82 path.

### Pitfall 2: Importing readAtV15Close into files that don't need it
**What goes wrong:** Adding `import { readAtV15Close }` to check-phase-72/73/74/82.mjs (archive-aware files).
**Why it happens:** Conflating the two conversion patterns (D-01 = frozen SHA, D-02/D-03 = archive path).
**How to avoid:** Only 58/59 get `readAtV15Close`. Only 72/73/74/82 get `resolveArchivedPhasePath`.

### Pitfall 3: Null check semantics after archive path resolution
**What goes wrong:** `resolveArchivedPhasePath(...)` returns null (archive entry missing); calling `readFile(null)` throws.
**Why it happens:** Forgetting the null guard between `resolveArchivedPhasePath` and `readFile`.
**How to avoid:** Pattern is always:
```javascript
const path = resolveArchivedPhasePath(suffix, roots);
const content = path ? readFile(path) : null;
if (!content) return { pass: false, detail: '...' };
```

### Pitfall 4: Keeping the SKIP-PASS semantics after archive conversion
**What goes wrong:** After archive conversion, the `if (!verif) return { pass: true, skipped: true, ... }` logic is kept instead of being replaced with a FAIL.
**Why it happens:** Copy-paste from the original SKIP-PASS pattern.
**How to avoid:** Once archive-aware, a missing VERIFICATION.md means the archive is broken — should return `{ pass: false, detail: '... not found in live tree or archive' }`. The SKIP-PASS sentinel was "not yet authored"; after archival it's "authored and archived at known path."

### Pitfall 5: Editing cascade files 60-66
**What goes wrong:** "Fixing" cascade validators instead of letting them auto-clear.
**Why it happens:** Misreading CONTEXT.md, thinking all 10 listed FAILs need direct edits.
**How to avoid:** Only 58, 59, 72, 73, 74, 82 get edits. CHAIN_SKIP stays empty. The moment 58/59 exit 0, all 7 cascade validators auto-clear.

### Pitfall 6: V-59-20/21/22 getting frozen along with V-59-24
**What goes wrong:** Converting all glossary-reading V-59-XX checks to frozen-aware.
**Why it happens:** V-59-20 through V-59-23 also read glossary files.
**How to avoid:** Only V-59-24 (blockquote integrity, A3 check) needs freezing. V-59-20 (A1, see-also line presence), V-59-21 (A2, anchor resolution), V-59-22 (bidirectional links) all assert on current-state structure that must remain live. Only the blockquote 2-line shape check (V-59-24) is the one that fails on live content.

### Pitfall 7: Running apex without all edits committed
**What goes wrong:** Running check-phase-82 to verify before all 5 (or 6) target files are edited — partial state makes SKIPPED/FAIL count meaningless.
**Why it happens:** Testing each file edit in isolation.
**How to avoid:** Either test each target file standalone first (e.g., `node check-phase-58.mjs`) or commit all edits together before running the apex.

---

## Cross-OS Determinism

**readAtV15Close:** Uses `git show ba2cbc0:<path>` via `execFileSync`. Path separator in `<path>` is forward-slash (always, regardless of OS — git accepts this). CRLF normalization (`.replace(/\r\n/g, '\n')`) is already applied in `readAtClose`. [VERIFIED: `frozen-at-close.mjs:49`]

**resolveArchivedPhasePath:** Uses `join()` from `node:path` for filesystem existence check (OS-correct separators), but the returned path string is always a forward-slash relative path (`'.planning/milestones/...'`). [VERIFIED: `archive-path.mjs:23-28`]

**GHA workflow fetch-depth:** `audit-harness-v1.9-integrity.yml` line 84: `fetch-depth: 0`. This means `git show ba2cbc0:` will resolve on the Linux runner. [VERIFIED: reading the workflow file]

**GHA workflow autocrlf:** Line 82: `git config --global core.autocrlf false` set before checkout. Combined with the CRLF normalization in `readAtClose`, the frozen reads are cross-OS safe.

---

## Sequencing: Wave/Plan Structure

### Recommended 2-Plan Structure (matches CONTEXT.md §Specific Ideas)

**Plan 86-01 — All validator edits (one atomic commit recommended)**

Edits to check-phase-{58,59,72,73,74,82}.mjs. The six files are independent (no ordering dependency between them). Commit atomically as one: "fix(86): convert HEAD-coupled assertions to frozen/archive-aware reads".

Then verify locally:
```bash
# Quick smoke: each target file passes standalone
node scripts/validation/check-phase-58.mjs    # expect 26/0/0
node scripts/validation/check-phase-59.mjs    # expect 36/0/0
node scripts/validation/check-phase-72.mjs    # check 0 SKIPPED
node scripts/validation/check-phase-73.mjs    # check 0 FAIL/0 SKIPPED
node scripts/validation/check-phase-74.mjs    # check 0 FAIL/0 SKIPPED
node scripts/validation/check-phase-82.mjs    # expect 37/0/0 (after all edits)
```

**Plan 86-02 — Verify apex + dispatch GHA**

1. Run apex in full mode: `node scripts/validation/check-phase-82.mjs --verbose` (approx 7-10 min on Windows — spawns 34 subprocess chains)
2. Verify: `Result: 37 PASS, 0 FAIL, 0 SKIPPED`
3. Dispatch `audit-harness-v1.9-integrity.yml` via GitHub UI or `gh workflow run audit-harness-v1.9-integrity.yml`
4. Wait for `linux-chain-ubuntu-latest` job to green
5. Confirm cross-OS EXACT MATCH: both show `37 PASS, 0 FAIL, 0 SKIPPED`

**Why atomic commit for Plan 86-01:** The 6 files are mutually independent but the apex only reaches the target state when ALL are in place. Running apex mid-edit with partial changes would show misleading intermediate tallies. Single commit avoids confusion.

**Cascade 60-66 do NOT appear in either plan.** No tasks, no verification steps for those files.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All validators | Yes | v24.17.0 | — |
| git | `readAtV15Close` (`git show ba2cbc0:`) | Yes | (installed) | — |
| GitHub Actions | D-05 Linux proof | Yes (repo has workflow) | — | — |
| `gh` CLI | Triggering workflow dispatch | Available if installed | — | GitHub web UI |

**Missing dependencies with no fallback:** None.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Self-contained MJS validators (no test framework) |
| Config file | None |
| Quick run command | `node scripts/validation/check-phase-58.mjs` (individual) |
| Full suite command | `node scripts/validation/check-phase-82.mjs --verbose` (apex, ~7-10 min) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| CHAIN-01 | check-phase-{58,59,73} exit 0 (no CHAIN_SKIP) | unit/integration | `node scripts/validation/check-phase-58.mjs && node scripts/validation/check-phase-59.mjs && node scripts/validation/check-phase-73.mjs` | Yes |
| CHAIN-01 | Cascade 60-66 auto-clear | integration | `node scripts/validation/check-phase-82.mjs --verbose` | Yes |
| CHAIN-02 | Apex 0 FAIL / 0 SKIPPED Windows | integration | `node scripts/validation/check-phase-82.mjs` | Yes |
| CHAIN-02 | Apex 0 FAIL / 0 SKIPPED Linux GHA | smoke/CI | `gh workflow run audit-harness-v1.9-integrity.yml` (check `linux-chain-ubuntu-latest`) | Yes |

### Sampling Rate

- Per edit (after each target file): `node scripts/validation/check-phase-{N}.mjs` — verifies the specific file
- After all edits committed: `node scripts/validation/check-phase-82.mjs --verbose`
- Phase gate: Full apex green (`37 PASS, 0 FAIL, 0 SKIPPED`) before Plan 86-02 GHA dispatch

### Wave 0 Gaps

None — no new test files needed. All verification uses existing validator infrastructure.

---

## Security Domain

This phase makes no changes to authentication, authorization, data handling, or network-accessible endpoints. All changes are to local `scripts/validation/*.mjs` tooling files. ASVS categories V2-V6 do not apply.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | check-phase-74 V-74-AUDIT is in D-03 scope (CONTEXT.md omission, not a deliberate exclusion) | D-03 scope expansion | If V-74-AUDIT is intentionally out-of-scope, the planner should skip the check-phase-74 edit. Low risk: the edit is safe regardless. |
| A2 | The `gh workflow run` command can dispatch `audit-harness-v1.9-integrity.yml` at HEAD after Plan 86-01 edits are committed | Plan 86-02 | If path-filter gating fails (no changed files matching), use GitHub web UI. The v1.9 workflow has `workflow_dispatch` with no input requirements. |

---

## Open Questions

1. **V-74-AUDIT scope confirmation**
   - What we know: V-74-AUDIT fires a SKIPPED inside check-phase-74, which is spawned as a child of check-phase-82 (phaseNum 74 is in CHAIN_PHASES=[48..81]). The apex tally is NOT affected (child exits 0). The CONTEXT.md D-03 lists 72, 73, 82 but not 74.
   - What's unclear: Was 74 deliberately excluded (it doesn't affect apex count) or was it an oversight?
   - Recommendation: Include the V-74-AUDIT archive-aware conversion in Plan 86-01 as a bonus cleanup. If D-03 interpretation is strict "apex only," it's still correct behavior. If D-03 means "clean up all VERIFICATION.md SKIPPEDs anywhere in the chain," it's required. Either way, the edit is safe.

---

## Sources

### Primary (HIGH confidence)
- `scripts/validation/check-phase-58.mjs` — V-58-10 assertion source verified (line 197-214)
- `scripts/validation/check-phase-59.mjs` — V-59-24 assertion source verified (line 643-663)
- `scripts/validation/check-phase-72.mjs` — V-72-AUDIT-VERIFY assertion source verified (line 106-119)
- `scripts/validation/check-phase-73.mjs` — V-73-INVENTORY (line 71-83) + V-73-AUDIT (line 164-176) source verified
- `scripts/validation/check-phase-74.mjs` — V-74-AUDIT assertion source verified (line 105-117) — **NEWLY FOUND**
- `scripts/validation/check-phase-82.mjs` — V-82-AUDIT source verified (line 47-59); CHAIN_PHASES=[48..81] confirmed
- `scripts/validation/_lib/frozen-at-close.mjs` — `readAtV15Close`, `MILESTONE_CLOSE_SHAS.V15='ba2cbc0'` verified present
- `scripts/validation/_lib/archive-path.mjs` — `resolveArchivedPhasePath(phaseSuffix, milestoneRoots=['v1.5-phases'])` signature verified
- `.github/workflows/audit-harness-v1.9-integrity.yml` — fetch-depth:0 (line 84), autocrlf:false (line 82), continue-on-error:false (line 79) verified
- `git show ba2cbc0:docs/reference/4-platform-capability-comparison.md` — frontmatter: `last_verified: 2026-05-01`, `review_by: 2026-06-15` (45 days) VERIFIED
- V-59-24 at ba2cbc0 — all 4 glossaries PASS (0 blockquote integrity failures) VERIFIED
- `resolveArchivedPhasePath` node run — all four archive paths resolve correctly VERIFIED
- check-phase-58 live run — `1 failed` (V-58-10: 92 days, expected 45) VERIFIED
- check-phase-59 live run — `1 failed` (V-59-24: 5 blockquote violations) VERIFIED
- check-phase-82 standalone — `26 PASS, 10 FAIL, 1 SKIPPED` VERIFIED
- check-phase-72 standalone — `25 PASS, 9 FAIL, 1 SKIPPED` (V-72-AUDIT-VERIFY = SKIPPED) VERIFIED
- check-phase-73 standalone — `29 PASS, 10 FAIL, 1 SKIPPED` (V-73-AUDIT = SKIPPED) VERIFIED
- check-phase-74 standalone — `20 PASS, 10 FAIL, 1 SKIPPED` (V-74-AUDIT = SKIPPED) VERIFIED
- check-phase-68 standalone — `24 PASS, 9 FAIL, 0 SKIPPED` (no live SKIPPEDs) VERIFIED
- v1.9-MILESTONE-AUDIT.md:267 — chain validators NOT in predecessor-byte-unchanged gate VERIFIED

### Secondary (MEDIUM confidence)
- None needed — all claims verified directly from source.

---

## Metadata

**Confidence breakdown:**
- Edit shapes: HIGH — derived from verified source + confirmed precedent (check-phase-61, check-phase-62)
- SKIPPED set completeness: HIGH — exhaustive grep of all `skipped: true` across check-phase-*.mjs + manual run confirmation
- Cross-OS determinism: HIGH — confirmed fetch-depth:0, autocrlf:false in workflow; CRLF normalization in readAtClose
- D-03 scope (V-74-AUDIT): MEDIUM — found by research, not in CONTEXT.md; planner should confirm intent

**Research date:** 2026-06-23
**Valid until:** Indefinite (tooling-only; stable until new check-phase files are added)
