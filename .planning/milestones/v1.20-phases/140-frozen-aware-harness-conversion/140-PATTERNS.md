# Phase 140: Frozen-Aware Harness Conversion - Pattern Map

**Mapped:** 2026-08-06
**Files analyzed:** 17 modified files (`_lib/frozen-at-close.mjs` + 16 `vX.Y-milestone-audit.mjs` harnesses); 0 new files
**Analogs found:** 17 / 17 (this phase edits existing files in-place; every "analog" is the file's own current body, verified directly this session)

**Scoping note:** RESEARCH.md already contains a fully-verified per-family conversion recipe with
exact line numbers and ready-to-paste code (Findings 1 and 2). This document does not repeat that
recipe; it anchors it to concrete, directly-read excerpts of the code being replaced, so the
planner can write an edit-diff (before/after) rather than a from-scratch spec.

## File Classification

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/_lib/frozen-at-close.mjs` | utility (frozen-git-read library) | file-I/O (batched) | itself — `readAtClose`/`lsTreeAtClose` (existing exports in same file) | exact — new exports extend an established signature/error-contract in the same module |
| `scripts/validation/v1.4-milestone-audit.mjs` (Family A, 1 of 2) | test/validator (harness) | file-I/O → CRUD-style corpus scan | `scripts/validation/check-phase-67.mjs:31-39` (frozen-sidecar read precedent, D-10/D-12) | role-match — same milestone-harness role, but 67 is a chain validator consuming the lib, not itself converted |
| `scripts/validation/v1.4.1-milestone-audit.mjs` (Family A, 2 of 2) | test/validator (harness) | file-I/O | v1.4 (same family, sibling file) | exact — v1.4.1 already carries the SWEEP-07 sentinel backport verbatim at `:265-268`, making it the analog FOR v1.4's SWEEP-07 edit specifically |
| `scripts/validation/v1.5-milestone-audit.mjs` (Family B) | test/validator (harness) | file-I/O | Family A (v1.4), same shape +1 guard | exact — chokepoint shapes identical, guard count differs (2 vs 1) |
| `scripts/validation/v1.6..v1.14-milestone-audit.mjs` (Family C, 9 files) | test/validator (harness) | file-I/O | Family B (v1.5), same shape +2 guards | exact — RESEARCH.md Finding 2 verified all 9 files directly, zero exceptions |
| `scripts/validation/v1.15..v1.18-milestone-audit.mjs` (Family D, 4 files) | test/validator (harness) | file-I/O + one live-HEAD subprocess-spawn guard (C17, NOT converted) | Family C (v1.6-v1.14), same shape +1 guard (the excepted 5th) | role-match — identical first 4 chokepoints, deliberately diverges on the 5th |

## Pattern Assignments

### `scripts/validation/_lib/frozen-at-close.mjs` (utility, file-I/O)

**Analog:** itself — `readAtClose` and `lsTreeAtClose`, the two existing exports the new
`readManyAtClose`/`createFrozenCorpusReader` pair must match in shape.

**Existing single-file reader — the signature and error-enrichment contract to match** (`:149-167`):
```js
export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  try {
    return execFileSync('git', ['show', sha + ':' + relPath], {
      encoding: 'utf8',
      timeout: 10000,
      stdio: ['ignore', 'pipe', 'pipe'],
    }).replace(/\r\n/g, '\n');
  } catch (err) {
    // D-27/D-28: enrichment, not a swallow -- the cause is prepended to the FRONT of the
    // message (check-phase-60.mjs:247 truncates detail strings at 500 chars, so an appended
    // cause would be silently cut off) and the error always rethrows.
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
}
```
**Convention to copy:** pin-gate first (`if (!sha) throw`), `execFileSync` with an argv array (never
a shell string), `frozenCause(err)` attached as `err.frozenCause` AND prepended to `err.message`
(never appended — truncation at check-phase-60.mjs:247 cuts appended text), unconditional rethrow.

**Convenience-export convention to copy** (`:170-185`):
```js
export const readAtV141Close      = (p) => readAtClose('V141',         p);
export const readAtV15Close       = (p) => readAtClose('V15',          p);
...
export const readAtV118Close      = (p) => readAtClose('V118',         p);
```
One arrow-function export per pinned tag, aligned padding. `V14` needs the same treatment once
pinned (D-19) — `readAtV14Close = (p) => readAtClose('V14', p)`.

**Multi-path enumeration — the "throw on any failure, `[]` only for valid-but-empty" contract to
match** (`:210-227`, `lsTreeAtClose`):
```js
export function lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {}) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  let stdout;
  try {
    stdout = execFileSync('git', ['ls-tree', '-r', '-z', '--name-only', sha, '--', dirPrefix], {
      encoding: 'utf8',
      timeout: 10000,
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: process.cwd(),
      maxBuffer: SUBPROCESS_MAX_BUFFER,
    });
  } catch (err) {
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
  // ... -z NUL-termination handling, .filter(Boolean) ...
}
```
The new `readManyAtClose`/`createFrozenCorpusReader` (already drafted in RESEARCH.md Finding 1)
follow this exact shape: pin-gate → try/execFileSync-with-argv-array/catch-enrich-rethrow. The
`--self-test` assertion-3 retarget (D-22) must edit the sibling comment block at `:135-137` (the
"V14 omitted" note) in the same edit, since it documents the very gap this phase closes.

---

### `scripts/validation/check-phase-67.mjs` (the D-10 frozen-sidecar precedent — read-only reference, NOT itself edited this phase)

**Analog role:** supporting precedent for D-10 (sidecar reads frozen) and a **contrast** case for
D-07 (fail-loud vs swallow).

**The existing frozen-sidecar read** (`:36-39`):
```js
// TOOL-02: body delegated to readAtV17Close + JSON.parse; catch→null per Landmine B.
function readSidecarAtV17Close() {
  try { return JSON.parse(readAtV17Close('scripts/validation/v1.7-audit-allowlist.json')); } catch (e) { return null; }
}
```
**Critical divergence the planner must not copy verbatim:** this precedent's `catch (e) { return
null; }` is exactly the swallow-to-degrade pattern D-07 rules OUT for the harness sidecar reads.
`check-phase-67.mjs` is a chain validator (informational, tolerant of a missing sidecar); the
16 harnesses being converted are milestone-audit gates where a silently-empty allowlist manufactures
a false PASS/FAIL. Use this file only to confirm the delegation SHAPE (thin wrapper around
`readAtV17Close` + `JSON.parse`), not its error handling. The harness's own `parseAllowlist()` (see
below) already separates "absent" (must throw per D-07) from "malformed JSON" (keeps degrading,
per D-07's own Pitfall-4 carve-out) — do not collapse that distinction to match this precedent.

---

### `scripts/validation/v1.4-milestone-audit.mjs` (Family A representative — read chokepoints being replaced)

**Analog:** itself (pre-edit body), verified directly this session at the exact coordinates D-02/
RESEARCH.md Finding 2 predict.

**Imports + readFile (`:18-33`) — the body the new `createFrozenCorpusReader`-backed `readFile`
(RESEARCH.md Finding 2, item 2) replaces:**
```js
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
...
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```

**walkMd (`:36-53`) — the recursive walker the new `FROZEN.paths.filter(...)` form replaces:**
```js
// walkMd: recursive .md file walker (verbatim from scripts/validation/check-phase-30.mjs lines 21-38)
function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  const results = [];
  function walk(current) {
    let entries;
    try { entries = readdirSync(current); } catch { return; }
    for (const entry of entries) {
      const full = join(current, entry);
      let stat;
      try { stat = statSync(full); } catch { continue; }
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}
```

**parseAllowlist (`:55-65`) — the degrade-on-absence body D-07 replaces with fail-loud-on-absence:**
```js
// parseAllowlist: load and parse the committed JSON sidecar (D-26 contract).
// Follows check-phase-31.mjs parseInventory() degradation pattern — degrade to empty arrays on parse failure.
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.4-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
```
**Preserve on conversion:** the inner `try { JSON.parse } catch { degrade }` stays exactly as-is
(malformed-but-present sidecar keeps degrading per Pitfall 4); only the `if (!raw) return {...}`
line becomes `if (raw === undefined || raw === null) throw new Error(...)`.

**v1.4.1's already-present SWEEP-07 backport** — the literal 3-line pattern to port into v1.4's C5
check verbatim, cited by CONTEXT.md D-24/D-27 and RESEARCH.md Finding 2's "Family A note":
regex relaxation to `/^…\s*(#.*)?$/m` on `last_verified`/`review_by`, plus
`if (lvMatch[1] === '1970-01-01') continue;` — present at `v1.4.1-milestone-audit.mjs:265-268`
(not independently re-read this pass; RESEARCH.md confirms it by direct read this session, cite
that line range in the plan rather than re-reading a range already in context there).

---

## Shared Patterns

### Frozen-read error contract (applies to every one of the 16 harness conversions + the loader)
**Source:** `scripts/validation/_lib/frozen-at-close.mjs:149-167` (`readAtClose`) and `:210-227`
(`lsTreeAtClose`)
**Apply to:** `readManyAtClose`, `createFrozenCorpusReader`, and every harness's converted
`readFile`/`walkMd`/guard/`parseAllowlist`.
- Pin-gate (`if (!sha) throw`) before any subprocess spawn.
- `execFileSync('git', [argv...])` — argument array, never shell-string interpolation.
- On failure: `frozenCause(err)` → `err.frozenCause` set AND prepended to `err.message` (front,
  not appended — check-phase-60.mjs:247 truncates at 500 chars).
- Distinguish "absent-at-reachable-SHA" (`null`/empty return, D-06) from "unreachable-SHA" (throw,
  D-05) — enumeration (`lsTreeAtClose`) is what discriminates; a batch/show call downstream of a
  successful enumeration never needs to re-derive `unreachable-sha`.

### Sidecar fail-loud vs corpus-tolerant (D-07)
**Source:** `v1.4-milestone-audit.mjs:57-65` (current) contrasted with `check-phase-67.mjs:36-39`
(precedent NOT to copy for this axis)
**Apply to:** every harness's `parseAllowlist()`.
- Absence (`undefined`/`null` from the frozen reader) → throw, always, all 16 harnesses.
- Malformed-but-present JSON → keep the existing `try/catch` degrade-to-empty-arrays behavior
  unchanged (Pitfall 4).

### walkMd re-absolutization (applies to Families A-D uniformly)
**Source:** RESEARCH.md Finding 1 ("walkMd re-absolutization") + `_lib/frozen-at-close.mjs:193-196`
(`lsTreeAtClose`'s own doc-comment warning: "NOT a drop-in replacement for walkMd")
**Apply to:** every harness's converted `walkMd`.
- `lsTreeAtClose`/`FROZEN.paths` return repo-relative paths; every existing call site expects the
  cwd-prefixed absolute-looking string `walkMd` has always returned (because every call site
  immediately runs `relNormalize(abs)`, which strips `process.cwd()` back off).
- Converted `walkMd` must re-wrap with `join(process.cwd(), relPath)` — a pure string op, safe even
  though the frozen path may not exist on disk.

## No Analog Found

None. All 17 files this phase modifies already exist with the exact chokepoint shapes RESEARCH.md
Finding 2 documents (verified directly this session for `_lib/frozen-at-close.mjs`, `check-phase-67.mjs`,
and `v1.4-milestone-audit.mjs`; RESEARCH.md's own direct-read census covers the remaining 14
harnesses at the coordinates in its Finding 2 table). The planner should treat RESEARCH.md's
Finding 2 per-harness recipe as authoritative for line numbers in v1.5 through v1.18 rather than
re-deriving them.

## Metadata

**Analog search scope:** `scripts/validation/_lib/frozen-at-close.mjs`, `scripts/validation/check-phase-67.mjs`,
`scripts/validation/v1.4-milestone-audit.mjs` (all read directly this pass); `v1.4.1`, `v1.5`,
`v1.6`, `v1.15` bodies taken from RESEARCH.md's own this-session direct reads (Finding 2 table +
Sources list) to avoid re-reading ranges already loaded into that document's context.
**Files scanned:** 3 read directly in this pass; 14 more corroborated via RESEARCH.md's cited
direct reads (no re-read performed).
**Pattern extraction date:** 2026-08-06
