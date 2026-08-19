# Phase 144: V119 Pin + 18th Path-A Lineage Bump + Terminal Close - Pattern Map

**Mapped:** 2026-08-12
**Files analyzed:** 13 (5 new leaves + apex + 2 new harness-pair files + 1 workflow + 5 modified files)
**Analogs found:** 13 / 13 (all files have a strong, code-verified analog — this phase is a pure
Path-A generational bump; CONTEXT.md and RESEARCH.md already contain live-verified excerpts for
every analog, reused verbatim below with source line numbers)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/check-phase-139.mjs` | validator (leaf) | request-response (CLI, frozen-blob read) | `check-phase-135.mjs` (shape) + `check-phase-63.mjs:208-250` (blob-compare idiom) | exact |
| `scripts/validation/check-phase-140.mjs` | validator (leaf) | request-response (CLI, static grep needle) | `check-phase-135.mjs` / `-136.mjs` | exact |
| `scripts/validation/check-phase-141.mjs` | validator (leaf) | request-response (CLI, subprocess-spawn needle) | `check-phase-119.mjs:140-159` (spawn idiom) + `check-phase-135.mjs` (leaf shape) | exact |
| `scripts/validation/check-phase-142.mjs` | validator (leaf) | request-response (CLI, bare-spawn needle) | `check-phase-119.mjs:140-159` + `check-phase-138.mjs`'s `V-138-CHAIN-30/-31` spawn shape | exact |
| `scripts/validation/check-phase-143.mjs` | validator (leaf) | request-response (CLI, spec-driven) | `check-phase-119.mjs:140-159` (spawn) — content fully specified by `143-NEEDLE-SPEC.md` | exact |
| `scripts/validation/check-phase-144.mjs` | validator (apex) | event-driven (recursive subprocess chain) | `check-phase-138.mjs` (mechanism only — every count/span re-derived per D-12) | exact (mechanism), re-derive all literals |
| `scripts/validation/v1.20-milestone-audit.mjs` | service (corpus audit CLI) | batch / CRUD-ish (frozen-corpus C1-C17) | `v1.18-milestone-audit.mjs` (already-converted exemplar) for the frozen-aware shape; `v1.19-milestone-audit.mjs` (current, unconverted) is the Path-A copy source | exact |
| `scripts/validation/v1.20-audit-allowlist.json` | config (sidecar) | file-I/O | `v1.19-audit-allowlist.json` | exact |
| `.github/workflows/audit-harness-v1.20-integrity.yml` | CI workflow | event-driven | `audit-harness-v1.19-integrity.yml` | exact |
| `scripts/validation/_lib/frozen-at-close.mjs` (modify — append) | utility/config | file-I/O (git frozen reads) | itself, V118 entry as the template for the V119 entry | exact |
| `scripts/validation/v1.19-milestone-audit.mjs` (modify — convert) | service (corpus audit CLI) | batch | `v1.18-milestone-audit.mjs` (already-converted, literal template) | exact |
| `scripts/validation/check-phase-67.mjs` (modify — 10 fail-loud sites) | validator (chain member) | request-response | Phase 141's fail-loud landings in `check-phase-61/68/70.mjs` (idiom); target literals pinned by `check-phase-73.mjs:266-302` | exact (idiom), site list is phase-specific |
| `scripts/validation/regenerate-supervision-pins.mjs` (modify — append BASELINE_24) | utility | batch | itself, BASELINE_23's comment block | exact |
| `.github/workflows/audit-harness-v1.7-integrity.yml` / `-v1.8-integrity.yml` (modify — 1-line fix each) | CI workflow | event-driven | itself (single-line string correction) | exact |
| `.planning/milestones/v1.20-CARVE.md` (modify — allowlist amendment) | config (governance doc) | CRUD | Phase 141/142/143 amendment commits (D-09 amendment procedure) | exact |
| `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` (modify — absorb-and-append) | doc | CRUD | `v1.19-DEFERRED-CLEANUP.md` shape (30 `## ` entries, Part A/B/C) | exact |

## Pattern Assignments

### `scripts/validation/check-phase-139.mjs` .. `-143.mjs` (validator, leaf)

**Analog:** `scripts/validation/check-phase-135.mjs` / `-136.mjs` / `-137.mjs`

**Core LIGHTWEIGHT-leaf pattern** (verified live, `check-phase-135.mjs:44` etc.):
```js
// Lightweight: NO chain (chain lives only in apex check-phase-138.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
// ... needle checks (readFile/existsSync only; execFileSync only for spawn-based needles) ...
checks.push({
  id: 'SELF',
  name: 'V-135-SELF: CHAIN_PHASES does NOT include 135; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(135)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 135 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      return { pass: false, detail: 'CHAIN_SKIP non-empty -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [] (135 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```
Rename `135`→`139`/`140`/`141`/`142`/`143`. The runner-loop tail (`LABEL_WIDTH`, `padLabel`, summary
line) is byte-identical boilerplate across all three existing leaves — copy verbatim, do not redesign.
Header line 4 must read *"LIGHTWEIGHT base (NO chain — chain lives ONLY in apex)"* (restated at
`check-phase-132.mjs:4`).

**check-phase-139's frozen-to-frozen blob-compare needle** — analog `check-phase-63.mjs:208-250`:
```js
// Source: scripts/validation/check-phase-63.mjs:208-230
run() {
  const BASELINE = '732588a57fd762c294400a4f6fd9a065c974216c';
  const FROZEN_SHA = MILESTONE_CLOSE_SHAS.V113;
  try {
    const result = execFileSync('git', ['rev-parse', FROZEN_SHA + ':' + MACOS_MATRIX], { stdio: 'pipe', cwd: process.cwd() });
    const actual = result.toString().trim();
    if (actual !== BASELINE) {
      return { pass: false, detail: 'blob hash CHANGED @v1.13-close: expected ' + BASELINE + ', got ' + actual };
    }
    return { pass: true, detail: 'blob @v1.13-close matches baseline ' + BASELINE };
  } catch (err) {
    return { pass: true, skipped: true, detail: 'git rev-parse not available -- skipped' };
  }
}
```
Ready-to-use, live-measured target for `check-phase-139.mjs` (no `MILESTONE_CLOSE_SHAS` entry
needed — a raw literal SHA, same shape as the `V14` "AUDIT-CLOSE" pin per
`_lib/frozen-at-close.mjs:135-158`):
```
$ git log -1 --format=%H -- scripts/validation/carve-gate.mjs
04e26106c859176d58b98079575a50faceeed7cd
$ git rev-parse 04e26106:scripts/validation/carve-gate.mjs
849f9639e1108090bc360e705aaa784b0144fe66
$ git rev-parse HEAD:scripts/validation/carve-gate.mjs
849f9639e1108090bc360e705aaa784b0144fe66   # identical -- zero drift since Phase 139 closed
```

**check-phase-141/-142/-143's subprocess-spawn needle** — analog `check-phase-119.mjs:140-159`:
```js
run() {
  if (!existsSync(join(process.cwd(), HARNESS))) {
    return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
  }
  if (NESTED) {
    return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
  }
  try {
    execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
    return { pass: true, detail: HARNESS + ' exits 0 (current-milestone harness)' };
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : '';
    const stdout = err.stdout ? err.stdout.toString() : '';
    const isMissing = err.code === 'ENOENT' || err.status === 127
      || stderr.includes('not found') || stderr.includes('Could not resolve');
    if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
    return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
  }
}
```
- `check-phase-143.mjs`: `TOOL = 'scripts/validation/check-nav-hub-links.mjs'` (per `143-NEEDLE-SPEC.md`).
- `check-phase-141.mjs`: `TOOL = 'scripts/validation/regenerate-supervision-pins.mjs'` + `--self-test` argv (durably true past this phase's end — see Pitfall below).
- `check-phase-142.mjs`: bare exit-0 spawns of `check-phase-30.mjs` / `check-phase-31.mjs`, mirroring the apex's own `V-138-CHAIN-30`/`-31`, but as this leaf's OWN needle (`CHAIN_PHASES` stays `[]`).

**CRITICAL needle-durability traps (self-invalidating needles — do not copy these facts in):**
- `check-phase-140.mjs` must NOT assert "v1.19-milestone-audit.mjs is unconverted" — this phase's own
  earlier plan (HARN-17) converts it, which would self-detonate the apex the moment Phase 144's own
  commits land. Assert only the POSITIVE stable half: "all 16 of v1.4–v1.18's harnesses carry
  `createFrozenCorpusReader`" (`grep -l createFrozenCorpusReader scripts/validation/v1.*-milestone-audit.mjs | wc -l` = 16, stable — v1.19 becomes a 17th, never un-converts the 16).
- `check-phase-141.mjs` must NOT pin `check-phase-67.mjs`'s current chicken-and-egg count (7) —
  this phase's own D-03 edit converts those exact sites. Use the `regenerate-supervision-pins.mjs
  --self-test` spawn or the Phase 141 `BASELINE_9` literal coordinates instead (Phase 141's own
  deliverable, not something Phase 144 subsequently edits).
- No `.planning/phases/**` reads in any of the five leaves (D-15) — no `MILESTONE_CLOSE_SHAS` entry
  exists for v1.20's own not-yet-closed phases. Target `scripts/`, `.github/`, or
  `.planning/milestones/v1.20-*` paths only.

---

### `scripts/validation/check-phase-144.mjs` (validator, apex)

**Analog:** `scripts/validation/check-phase-138.mjs` — mechanism only, every count/span re-derived (D-12).

**Span constants** (source `check-phase-138.mjs:104-125`, re-derive all numbers):
```js
const CHAIN_START = 48;
const CHAIN_END = 143;     // was 137 in 138
const CHAIN_PHASES = Array.from({ length: CHAIN_END - CHAIN_START + 1 }, (_, i) => CHAIN_START + i);
// dedup guard, length!==96 guard (was !==90), termini guard (48/143, was 48/137) -- all three
// preserved as MECHANISM only.
const CHAIN_EXTRA = [30, 31];   // carried forward verbatim (D-09) -- literal, not arithmetic
// NEW guard 144 must add that 138 lacks (D-09):
if (!CHAIN_EXTRA.every((n) => !CHAIN_PHASES.includes(n))) {
  throw new Error('check-phase-144 CHAIN_EXTRA overlaps CHAIN_PHASES -- must stay disjoint');
}
```
Keep as mechanism: `maxBuffer: 20 * 1024 * 1024`; `isMissing = err.code === 'ENOENT' || err.status === 127`;
absent child ⇒ FAIL; `isPeer` at `phaseNum >= 67`; 600s peer / 300s per-subprocess / 300s AUDIT-HARNESS
timeouts; the AUDIT-HARNESS `existsSync`→FAIL branch BEFORE the NESTED guard (D-10 ordering); HAZARD
FIX 3 (absent chain child ⇒ hard FAIL, so leaves 139-143 MUST be authored before the apex, D-11);
`V-144-AUDIT-HARNESS` points at `v1.20-milestone-audit.mjs`, absent⇒FAIL, NESTED⇒skip re-run;
`V-144-SELF` dual-invariant (mirror `check-phase-138.mjs:249-256`).

**Stale-string trap — do NOT copy runtime strings literally.** `check-phase-138.mjs:41` says
`"17-check v1.19-milestone-audit.mjs"` but the harness registers only 16 checks (C8 absent).
`check-phase-144.mjs`'s own header/comment strings must be counted directly off the live `checks`
array length in `v1.20-milestone-audit.mjs` at authoring time — never copied from a predecessor.

**Archival-token guardrail — REPLACED, not copied** (D-15): assert the literal token string
`'v1.20-phases'` directly as a string-presence check in the apex source; do NOT rely on
`resolveArchivedPhasePath`'s null-vs-success behavior to catch a wrong token — it resolves the LIVE
path first (`_lib/archive-path.mjs:23-24`) and will silently succeed pre-archival regardless of
token correctness (counterexample: `check-phase-125.mjs:86` has carried the wrong `['v1.15-phases']`
token green forever).

**Expected result once all pieces land:** `101/0/0` (1 AUDIT + 96 CHAIN + 2 CHAIN_EXTRA + 1
AUDIT-HARNESS + 1 SELF); `100/0/1` before `144-VERIFICATION.md` exists; `99/1/1` if run before
`v1.20-milestone-audit.mjs` lands (AUDIT-HARNESS FAIL precedes NESTED guard).

---

### `scripts/validation/v1.20-milestone-audit.mjs` + `v1.20-audit-allowlist.json` (service, corpus audit)

**Analog:** `v1.18-milestone-audit.mjs` (the already-converted exemplar — literal template for the
conversion shape) copied onto the Path-A source `v1.19-milestone-audit.mjs` (current content/checks).

**Frozen-aware conversion shape** (source both sides live-verified):
```js
// UNCONVERTED shape (v1.19-milestone-audit.mjs, current):
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// CONVERTED shape (v1.18-milestone-audit.mjs, current -- literal template):
import { createFrozenCorpusReader } from './_lib/frozen-at-close.mjs';
const MILESTONE_TAG = 'V118';                                    // becomes 'V119' for v1.19; v1.20 harness uses the NEW V120?
const SIDECAR_PATH = 'scripts/validation/v1.18-audit-allowlist.json'; // literal -- GOV-02
const FROZEN = createFrozenCorpusReader(MILESTONE_TAG, { extraPaths: [SIDECAR_PATH] });

function readFile(relPath) {
  const c = FROZEN.get(relPath);
  return c === undefined ? null : c;
}
function walkMd(dir) {
  const prefix = dir.endsWith('/') ? dir : dir + '/';
  return FROZEN.paths.filter((p) => p.startsWith(prefix)).map((p) => join(process.cwd(), p));
}
function parseAllowlist() {
  const raw = FROZEN.get(SIDECAR_PATH);
  if (raw === undefined || raw === null) {
    throw new Error(`Sidecar absent at frozen SHA (${MILESTONE_TAG}): ${SIDECAR_PATH} -- D-07 fail-loud`);
  }
  try { return JSON.parse(raw); } catch (err) { return { _parseError: err.message, ... }; }
}
```
**NOTE:** `v1.20-milestone-audit.mjs` itself is a Path-A copy of the newly-CONVERTED `v1.19-milestone-audit.mjs`
— it is authored NOT frozen-aware initially (there is no V120 pin — V120-PIN-DEFERRAL), it is the
*template* v1.19's conversion produces that v1.20 is copied from structurally, but the v1.20 harness
reads its OWN corpus live (no frozen tag yet exists for v1.20's own not-yet-closed milestone). Treat
`v1.19-milestone-audit.mjs` post-conversion purely as the shape reference for `readFile`/`walkMd`/
`parseAllowlist`/error-throw idiom, not as implying v1.20 itself becomes frozen-aware this phase.

**C17 exception — copy the comment block verbatim** (`v1.18-milestone-audit.mjs:827-844`):
```js
run() {
  const CONTRACT = 'scripts/validation/c17-eee-contract.mjs';
  // SWEEP-05 EXCEPTION (Phase 140, deferred per CONTEXT.md <deferred>): this guard and the C17
  // spawn below intentionally stay LIVE-HEAD. c17-eee-contract.mjs is CARVE Category 3, owned by
  // Phase 143 -- converting this leg here would collide two phases' scopes.
  if (!existsSync(join(process.cwd(), CONTRACT))) { ... }
  execFileSync('node', [CONTRACT], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
}
```
D-02 extends this same carve-out to v1.19's converted C17 check — reuse the v1.18 comment text
verbatim (5-of-5 C17-bearing harnesses stay live-HEAD, registered as a NEW deferred item, not 5-of-17).

**Sidecar** — header-fields-only copy (`generated`, `phase`) of `v1.19-audit-allowlist.json`; note
`c13_rotting_external` is an object of nested arrays, not a flat list — a naive top-level walk finds
16 `docs/` files instead of the true 33 (D-17 trap).

---

### `.github/workflows/audit-harness-v1.20-integrity.yml` (CI workflow)

**Analog:** `.github/workflows/audit-harness-v1.19-integrity.yml`

**Literal substitution table** (all confirmed by direct read):
| v1.19 literal | Location | v1.20 replacement |
|---|---|---|
| `scripts/validation/v1.19-*` | `paths:` | `scripts/validation/v1.20-*` |
| Two separate `paths:` entries for `v1.19-MILESTONE-AUDIT.md` / `v1.19-DEFERRED-CLEANUP.md` | `paths:` | ONE glob covering `v1.20-CARVE.md`, `v1.20-DEFERRED-CLEANUP.md`, `v1.20-GOV-02-LEDGER.md`, `v1.20-MILESTONE-AUDIT.md` |
| `scripts/validation/v1.19-audit-allowlist.json` (grep target) | `path-match` job | `scripts/validation/v1.20-audit-allowlist.json` — verbatim copy of the grep string **exits 1** |
| `node scripts/validation/v1.19-milestone-audit.mjs --verbose` | `harness-run` job | `v1.20-milestone-audit.mjs` |
| `check-phase-138.mjs`, `[48..137]` notice text | `linux-chain-ubuntu-latest` job | `check-phase-144.mjs`, `[48..143]`, 600s timeout unchanged |
| Standalone `check-phase-138` job (v1.19-only — DUAL-APEX in one file) | separate job | v1.20 needs its OWN dual-apex pair for `check-phase-144.mjs` (chain job + standalone job) — never re-run the OLD apex `check-phase-138.mjs` forward |
| `check-phase-135`/`-136`/`-137` leaf jobs | 3 jobs | 5 leaf jobs: `check-phase-139`..`-143` |
| `frozen-read-probe` (no `needs:`) | unchanged | copy forward as-is unless adding a V119-specific probe (discretion) |
| `pin-helper-advisory` (`continue-on-error: true` + `\|\| true` + `\|\| echo`) | structurally always green | copy the SHAPE forward, but D-21(d): never treat it as HARN-19 evidence |

**Full `paths:` filter to author** (D-16, all six entries):
```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.20-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.20-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.20-*'
  schedule:
    - cron: '0 8 * * 1'
    - cron: '0 8 1 1,4,7,10 *'
  workflow_dispatch:
```
Keep verbatim: DUAL-APEX header contract; `fetch-depth: 0` on every checkout; `timeout-minutes: 30`
on chain jobs, `15` on leaf jobs.

---

### `_lib/frozen-at-close.mjs` (modify — append V119)

**Analog:** the existing V118 entry, as the template for the new V119 entry (source `:69-158`,
`:190-207`, `:258-273`).
```js
// Insert immediately after V118, BEFORE V14 (V14 stays deliberately last -- AUDIT-CLOSE, not
// milestone-close-gate):
  V118: '7af8a147',
  V119: 'a7bda73e',  // Phase 138 close-gate (v1.19 MILESTONE CLOSE) -- subject-line pair
                     // discriminator (count=1), full SHA a7bda73e23efc5e3f9607c3fef37abf8ec4030aa
                     // (144-CONTEXT.md <specifics>). Back-anchor invariant: V119 = PAST close SHA;
                     // V120 deferred to v1.21 (V120-PIN-DEFERRAL).
  V14: '0b3be9ab',

// Convenience exports, same insertion point:
export const readAtV119Close      = (p) => readAtClose('V119',         p);
export const lsTreeAtV119Close      = (dir, opts) => lsTreeAtClose('V119',          dir, opts);
```
**Store the ABBREVIATED (7-8 char) form** (`'a7bda73e'`), matching every predecessor V15..V118 — this
is load-bearing for `frozenCause()`'s stderr taxonomy, not a style choice.

Plus one comment-only correction at `:10-13` (D-31's carved exception to append-only): the
`check-phase-61` "deliberate exception... keeps a genuinely inline reader" description is stale after
Phase 141's delegation — correct per `141-03-SUMMARY.md:223-231`.

---

### `scripts/validation/check-phase-67.mjs` (modify — 10 fail-loud sites)

**Analog/idiom source:** Phase 141's landing of the same fail-loud idiom in `check-phase-61/68/70.mjs`.

**Target sites, code-verified this session:**
```
V-67-01  :72-74   nullCount === FILES.length (4 files)  -- VULNERABLE (partial-null silent pass)
V-67-02  :87-89   j === null (single sidecar read) -- not an accumulator block, still fail-loud site
V-67-03  :116-118 nullCount === FILES.length (2 files)  -- VULNERABLE
V-67-04  :131-133 j === null (single sidecar read) -- not an accumulator block, still fail-loud site
V-67-05  :164-166 nullCount === FILES.length (2 files)  -- already hard-fails on partial null
V-67-06  :198-200 nullCount === FILES.length (3 files)  -- VULNERABLE
V-67-07  :226-228 nullCount === FILES.length (3 files)  -- already hard-fails on partial null
```
7 chicken-and-egg returns total; 3 of the 5 `nullCount` accumulator blocks (01/03/06) are the
partial-null silent-pass class needing the fix; 05/07 already hard-fail.

**Frozen pin that must survive the edit** (`check-phase-73.mjs:266-302`, `V-73-CONVERT-67-05`/`-06`)
asserts on four literals against `check-phase-67.mjs`'s source — all four must remain present after
the edit: `content.includes('frozen-at-close')`, `/V-67-05.*v1\.7-frozen/`, `'Apple calls this
artifact'`, `'SWEEP-02'`.

**Pre-condition:** a GOV-02 target-scoped grep census must land as a row in
`.planning/milestones/v1.20-GOV-02-LEDGER.md` BEFORE this edit (D-03).

---

### `scripts/validation/regenerate-supervision-pins.mjs` (modify — append BASELINE_24)

**Analog:** BASELINE_23's comment block (self-referential — file already names BASELINE_24 as next
in the Path-A chain at `:531-532`). Header-fields-only append, no coordinate change.

---

### `.github/workflows/audit-harness-v1.7-integrity.yml:96` and `-v1.8-integrity.yml:95` (modify)

**Analog:** self — single-line `~102s` string correction in each file (replace with the measured
664,979 ms figure per `141-CONTEXT.md:480-481`; do not re-measure). Land both edits in the SAME
commit as the 17th workflow's authoring, never alone (D-06).

---

### `.planning/milestones/v1.20-CARVE.md` (modify — allowlist amendment, MUST land first, alone)

**Analog:** Phase 141/142/143's amendment commits (the D-09 amendment procedure — amendment can never
ride in the same commit as the edit it authorizes).

**Shape:** enumerate the six new validator paths LITERALLY (Category 5's style, do NOT use a
`check-phase-14*.mjs` glob — `globToRegExp` maps `*` to `[^/]*` with zero-width allowed and
over-matches):
```
scripts/validation/check-phase-139.mjs
scripts/validation/check-phase-140.mjs
scripts/validation/check-phase-141.mjs
scripts/validation/check-phase-142.mjs
scripts/validation/check-phase-143.mjs
scripts/validation/check-phase-144.mjs
scripts/validation/v1.20-audit-allowlist.json
scripts/pipeline/build-publish-bundle.mjs
scripts/pipeline/build-filename-map.mjs
```
**Trap:** `carve-gate.mjs` is NUL-classified binary — any grep census against it needs `-a`/`--text`
or it silently returns "Binary file … matches" with no line numbers.

---

### `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` (modify — absorb-and-append)

**Analog:** `v1.19-DEFERRED-CLEANUP.md` (30 `## ` entries, Part A/new + Part B/carried + Part C/dropped
shape). Preserve all 15 existing v1.20 rows verbatim; append the three parts. Do NOT wholesale-rewrite
(D-27) — would destroy VERIFIED evidence pinned in `142-VERIFICATION.md:56`, `143-VERIFICATION.md:50`,
`142-01-SUMMARY.md:91`.

## Shared Patterns

### Frozen-read core (unchanged this phase, all consumers use it)
**Source:** `scripts/validation/_lib/frozen-at-close.mjs:169-187`
**Apply to:** the V119 export, the v1.19 harness conversion, any future frozen consumer.
```js
export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  try {
    return execFileSync('git', ['show', sha + ':' + relPath], {
      encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'],
    }).replace(/\r\n/g, '\n');
  } catch (err) {
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
}
```

### Apex chain-loop (mechanism, do not hand-roll)
**Source:** `check-phase-138.mjs`'s single parametrized loop over `[...CHAIN_PHASES, ...CHAIN_EXTRA]`
with the NESTED guard, `maxBuffer: 20*1024*1024`, and the narrowed missing-child classifier
(`isMissing = err.code === 'ENOENT' || err.status === 127`).
**Apply to:** `check-phase-144.mjs` only — every apex since Phase 70 uses this identical shape; a
bespoke loop would silently drop one of the three HAZARD FIXes.

### Evidence-gathering (HARN-19, not a source file but a shared procedural pattern)
- Match GitHub Actions job results on the **display name** substring (`.jobs[].name`), never the YAML
  job key — `139-06-SUMMARY.md`'s trap, restated in D-21.
- `continue-on-error: true` jobs (e.g. `pin-helper-advisory`) are NON-EVIDENCE.
- `needs: harness-run` cascade skips are GAPS, never legitimate.

## No Analog Found

None — every file in this phase has a direct, code-verified Path-A analog already extracted by
CONTEXT.md/RESEARCH.md's live measurements.

## Metadata

**Analog search scope:** `scripts/validation/`, `scripts/validation/_lib/`, `.github/workflows/`,
`.planning/milestones/` — all confirmed via CONTEXT.md/RESEARCH.md's own live-verified excerpts
(this session's research already performed the codebase reads; no additional Read/Grep against
source files was needed to avoid redundant re-reads of content already quoted verbatim with line
numbers in the upstream artifacts).
**Files scanned (via upstream research):** `check-phase-135/136/137/138.mjs`, `check-phase-63.mjs`,
`check-phase-67.mjs`, `check-phase-73.mjs`, `check-phase-119.mjs`, `check-phase-125.mjs`,
`v1.18-milestone-audit.mjs`, `v1.19-milestone-audit.mjs`, `v1.19-audit-allowlist.json`,
`regenerate-supervision-pins.mjs`, `_lib/frozen-at-close.mjs`, `_lib/archive-path.mjs`,
`audit-harness-v1.19-integrity.yml`, `audit-harness-v1.7/-v1.8-integrity.yml`, `carve-gate.mjs`,
`v1.19-DEFERRED-CLEANUP.md`.
**Pattern extraction date:** 2026-08-12

---

*Phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close*
</content>
