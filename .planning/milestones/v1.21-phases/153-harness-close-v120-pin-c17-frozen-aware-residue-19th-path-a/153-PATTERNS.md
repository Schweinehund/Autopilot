# Phase 153: Harness Close — Pattern Map

**Mapped:** 2026-08-29
**Files analyzed:** ~19 (2 lib edits, 6 harness edits, 1 new harness+sidecar, 1 apex, 8 leaves, 1 workflow, 1 pipeline invocation, 1 governance doc read)
**Analogs found:** 19 / 19 (this is a harness/tooling phase — every file has a direct, named predecessor. No RESEARCH.md; canonical_refs in CONTEXT.md supersedes discovery search per phase instructions.)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/_lib/frozen-at-close.mjs` (V120 pin insert + `withDocsAtClose`) | utility/config | CRUD (git-object read) + new file-I/O | itself, prior V119 insert pattern | exact (self-precedent) |
| `scripts/validation/v1.1{5,6,7,8,9}-milestone-audit.mjs` (C17 cwd swap, 5 files) | validator/harness | batch | each other (identical leg) | exact |
| `scripts/validation/v1.20-milestone-audit.mjs` (full SWEEP-05 + C17 leg) | validator/harness | batch | v1.19 harness's already-converted C1-C16 legs (structural, not literal — v1.19 has no such conversion either; use `_lib` reader call shape from `check-phase-61/67/68/70`) | role-match |
| `scripts/validation/v1.21-milestone-audit.mjs` (new, Path-A copy) | validator/harness | batch | `v1.20-milestone-audit.mjs` **pre-conversion / unconverted form via `git show`** (D-45) | exact (copy-source) |
| `v1.21-audit-allowlist.json` (new sidecar) | config | file-I/O | v1.20's sidecar (header-fields-only copy) | exact |
| `scripts/validation/check-phase-153.mjs` (new apex) | controller/orchestrator | event-driven (subprocess fan-out) | `scripts/validation/check-phase-144.mjs` (structural copy, D-31) | exact |
| `scripts/validation/check-phase-145..152.mjs` (8 new content leaves) | validator/test | request-response (needle assertions) | `scripts/validation/check-phase-126.mjs` / `check-phase-132.mjs` (content-leaf family) | exact |
| `.github/workflows/audit-harness-v1.21-integrity.yml` (new, 18th) | config/CI | event-driven | `.github/workflows/audit-harness-v1.20-integrity.yml` (mechanical per-job diff, D-50) | exact |
| `scripts/pipeline/build-publish-bundle.mjs` invocation (`--version=v1.21`, no code edit) | CLI invocation | batch | itself, `VERSION` arg default at `:40` | exact |
| `scripts/validation/regenerate-supervision-pins.mjs` (`BASELINE_25` append) | config/comment-only | n/a | its own `BASELINE_24` block | exact |

## Pattern Assignments

### `scripts/validation/_lib/frozen-at-close.mjs` — D-01/D-03 (V120 pin) + D-13 (`withDocsAtClose`)

**Analog:** itself — the existing V18..V119 single-entry convenience-export pattern.

**Insert-before-V14 pin location** (`:147`, exact predecessor line to insert above):
```javascript
  V14: '0b3be9ab',  // Phase 43 terminal commit ...
```
New `V120` entry must be the line immediately **before** this, inside the `MILESTONE_CLOSE_SHAS` object literal (`:69` opens the object). `V-140-V14PIN` (`check-phase-140.mjs:118-143`) asserts via regex `/\n\s*V\w+:\s*'/` that **nothing** follows the literal string `V14: '0b3be9ab'` inside the object body — so V120 must land strictly earlier in the object, never appended.

**Single-entry convenience-export pattern** (`:218-219`, `:286-287` — the V118/V119 pair to copy for V120):
```javascript
export const readAtV118Close      = (p) => readAtClose('V118',         p);
export const readAtV119Close      = (p) => readAtClose('V119',         p);
...
export const lsTreeAtV118Close      = (dir, opts) => lsTreeAtClose('V118',          dir, opts);
export const lsTreeAtV119Close      = (dir, opts) => lsTreeAtClose('V119',          dir, opts);
```
Copy this exact one-line thin-wrapper shape for `readAtV120Close` / `lsTreeAtV120Close`, appended to the existing export blocks (append is correct HERE — only the pin insert is insert-before).

**Core primitives to build `withDocsAtClose` on** (`:244-` `lsTreeAtClose`, `:301-` `readManyAtClose`):
```javascript
export function lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {}) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  ...
  stdout = execFileSync('git', ['ls-tree', '-r', '-z', '--name-only', sha, '--', dirPrefix], {...});
}

export function readManyAtClose(milestoneTag, relPaths) {
  ...
  stdout = execFileSync('git', ['cat-file', '--batch'], { input, ... });
  // byte-exact slicing, CRLF normalized via .replace(/\r\n/g, '\n') at the end
}
```
`withDocsAtClose(tag, fn)` composes these two: `lsTreeAtClose(tag, 'docs')` → `readManyAtClose(tag, paths)` → write each to a tmpdir → call `fn(tmpdir)` → cleanup in `finally`.

**Existing write-verb imports to extend** (`:27` current import line):
```javascript
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
```
D-19: add `writeFileSync`, `mkdirSync` here — this is the module's first write verb; the current header (`:1-24`) is a "centralized frozen-aware readers" doc comment that must be amended to note the character change (D-19).

**No existing tmp-materialize analog exists.** Grep of the repo shows no comparable "freeze a tree of files to a tmpdir and spawn a live process against it" helper anywhere — `git worktree add` and `git archive | tar` are explicitly forbidden analogs (D-14), not just unused ones. `mkdtempSync`/`rmSync` are already imported (unused for writes today); the closest structural precedent for retry-wrapped `rmSync` is **absent** — `_lib/frozen-at-close.mjs:461` and `frozen-read-negative-test.mjs:290` both use bare `rmSync(dir,{recursive:true,force:true})` with no `maxRetries`/`retryDelay` (D-18 explicitly rejects copying those two bare calls forward).

---

### `scripts/validation/v1.1{5,6,7,8,9}-milestone-audit.mjs` — cwd swap only (5 files, D-11/D-12)

**Analog:** each other — identical C17 leg, byte-identical across all five except v1.15's extra `SWEEP-05 EXCEPTION` comment.

**v1.15 leg, current form** (`v1.15-milestone-audit.mjs:816-844`):
```javascript
run() {
  const CONTRACT = 'scripts/validation/c17-eee-contract.mjs';
  // SWEEP-05 EXCEPTION (Phase 140, deferred per CONTEXT.md <deferred>): this guard and the C17
  // spawn below intentionally stay LIVE-HEAD. c17-eee-contract.mjs is CARVE Category 3, owned by
  // Phase 143 -- converting this leg here would collide two phases' scopes. ...
  if (!existsSync(join(process.cwd(), CONTRACT))) {
    return { pass: false, detail: 'C17 FAIL: ' + CONTRACT + ' not present (EEE contract validator missing)' };
  }
  try {
    execFileSync('node', [CONTRACT], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
    return { pass: true, detail: 'c17-eee-contract.mjs exits 0 (all enrolled files pass 13 assertions)' };
  } catch (err) { ... }
}
```
D-15's absolutize-before-spawn requirement: `CONTRACT` is currently relative and spawned with `cwd: process.cwd()`. Swapping to `cwd: tmpdir` breaks `node`'s resolution of the *validator script path itself* (must stay absolute/live), while the `existsSync` guard also stays against the live repo root (D-11) — only the **data the spawned validator reads** (`docs/**`) is materialized at the frozen tree. Concretely: keep `CONTRACT` absolutized via `resolve(process.cwd(), CONTRACT)` or similar BEFORE computing the swapped `cwd`, and pass the tmpdir only as the child's `cwd`.

The `v1.16..v1.19` legs are byte-identical minus the `SWEEP-05 EXCEPTION` comment (v1.16-19 never had it — grep confirms only v1.15 carries the comment block; v1.20 has neither the comment nor the exception, having 7 hits vs 8).

---

### `scripts/validation/v1.20-milestone-audit.mjs` — full SWEEP-05 conversion (D-09)

**Analog:** its own C17 leg (`:814-834`, no exception comment) plus the `_lib` reader shape used by `check-phase-67/68/70.mjs` for the C1-C16 corpus reads (those chain validators already call `readAtV17Close`/`readCorpusFileAtV17Close` — the same call shape this file's C1-C16 checks must adopt for `readAtV120Close`/`lsTreeAtV120Close`).

**v1.20's C17 leg, pre-conversion** (`v1.20-milestone-audit.mjs:814-834`):
```javascript
run() {
  const CONTRACT = 'scripts/validation/c17-eee-contract.mjs';
  if (!existsSync(join(process.cwd(), CONTRACT))) {
    return { pass: false, detail: 'C17 FAIL: ' + CONTRACT + ' not present (EEE contract validator missing)' };
  }
  try {
    execFileSync('node', [CONTRACT], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
    return { pass: true, detail: 'c17-eee-contract.mjs exits 0 (all enrolled files pass 13 assertions)' };
  } catch (err) { ... }
}
```
D-09: this file's C1-C16 checks (not shown here, not spawned via subprocess — read live-HEAD directly, zero `frozen-at-close` imports today per `[MEASURED]`) each need their live `readFileSync`/`readdirSync`-style reads repointed through `readAtV120Close`/`lsTreeAtV120Close`, mirroring how `check-phase-70.mjs` and siblings already delegate to `readAtV17Close` rather than inlining `git show`.

**Path-A copy source rule (D-45):** `v1.21-milestone-audit.mjs` must be forked from the **git-history pre-conversion** blob:
```
git show <commit-before-D-09-lands>:scripts/validation/v1.20-milestone-audit.mjs
```
never from the post-SWEEP-05 file on disk — copying the converted form would make the new v1.21 harness audit v1.20's *frozen* corpus instead of its own live one.

---

### `scripts/validation/c17-eee-contract.mjs` — BYTE-UNCHANGED (D-11)

**Analog:** itself. Confirms the cwd-swap mechanism is viable without any edit here.

**Imports (Node built-ins only)** (`:15-17`):
```javascript
import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

**`readFile`/`walkMd` — both resolve off `process.cwd()`, never an absolute repo-root const** (`:60-74`):
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  ...
}
```
This is exactly what makes the `cwd: tmpdir` swap sufficient (D-11/D-12) — every read in normal mode routes through `process.cwd()`, and D-12's `[MEASURED]` confirms nothing outside `docs/**` is touched when `SELF_TEST` is false.

**Empty-corpus exit(0)** (`:540-545`):
```javascript
if (enrolledFiles.length === 0) {
  process.stdout.write('C17: no enrolled files found under docs/ (no doc_id frontmatter key)\n');
  process.stdout.write('C17 assertion-violation-counts: #1=0 ... #13=0\n');
  process.stdout.write('C17 summary: 0 files checked, 0 with violations, 0 total violations\n');
  process.exit(0);
}
```
This is the exact vacuous-green shape D-16 warns against — a materialize bug that copies the wrong milestone's `docs/` (or an empty tmpdir) hits this branch and exits 0 silently. D-16's known-member-path guard exists precisely to catch it upstream of this exit.

**Summary line to pin if any count-parsing survives** (`:585-587`):
```javascript
process.stdout.write(
  'C17 summary: ' + enrolledFiles.length + ' file' + (enrolledFiles.length !== 1 ? 's' : '') + ' checked, ' +
  filesWithViolations.length + ' with violations, ' +
  allViolations.length + ' total violation' + (allViolations.length !== 1 ? 's' : '') + '\n'
);
```

---

### `scripts/validation/check-phase-153.mjs` (new apex) — structural copy of `check-phase-144.mjs` (D-31)

**Analog:** `scripts/validation/check-phase-144.mjs` (300 lines) — full file is the template, not excerpted piecemeal.

**Module-load guards to re-derive (never copy the numbers), full block** (`:113-136`):
```javascript
const CHAIN_START = 48;
const CHAIN_END = 143; // [48..N-1] invariant for N=144
const CHAIN_PHASES = Array.from({ length: CHAIN_END - CHAIN_START + 1 }, (_, i) => CHAIN_START + i);
const CHAIN_SKIP = new Set([]);
if (new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length) { throw new Error(...); }
if (CHAIN_PHASES.length !== 96) { throw new Error(...); }
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 143) { throw new Error(...); }
```
For 153: `CHAIN_START = 48`, `CHAIN_END = 152`, length assert `!== 105`, termini `48..152`. `CHAIN_EXTRA = [30, 31]` carried verbatim (`:163`) with its own disjointness guard (`:169-171`).

**HAZARD FIX 2 — narrowed classifier (must copy, NOT the loose form)** (`:216-220`):
```javascript
const isMissing = err.code === 'ENOENT' || err.status === 127;
if (isMissing) return { pass: true, skipped: true, detail: 'node executable unavailable (ENOENT/127) -- skipped' };
return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' }) };
```
D-31 explicitly warns `check-phase-141.mjs:80` / `142.mjs:82` / `143.mjs:96,121,146` carry the WRONG loose form (`stderr.includes('not found') || stderr.includes('Could not resolve')`) — do not copy those.

**`subEnv` NESTED propagation** (`:178-201`):
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
...
run() {
  if (NESTED) {
    return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
  }
  const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
  if (!existsSync(join(process.cwd(), path))) { return { pass: false, detail: ... }; } // HAZARD FIX 3
  const isPeer = phaseNum >= 67;
  const subTimeout = isPeer ? 600000 : 300000;
  const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };
  try {
    execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, maxBuffer: SUBPROCESS_MAX_BUFFER, cwd: process.cwd(), env: subEnv });
    ...
```

**HAZARD FIX 1 — maxBuffer** (`:110-111`):
```javascript
const SUBPROCESS_MAX_BUFFER = 20 * 1024 * 1024;
```

**`HARNESS` const to repoint** (`:108`):
```javascript
const HARNESS = 'scripts/validation/v1.20-milestone-audit.mjs';
```
For 153: `'scripts/validation/v1.21-milestone-audit.mjs'`.

**Archive-root token literal (`:150`, and imports `:99`)** — never copy the string, re-derive it as this phase's own root:
```javascript
const ARCHIVE_ROOT_TOKEN = 'v1.20-phases';
...
const verifPath = resolveArchivedPhasePath(
  '144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-VERIFICATION.md',
  [ARCHIVE_ROOT_TOKEN]
);
```
For 153: `'v1.21-phases'` and the phase-153 slug path (D-36).

**Expected result triples to re-derive by arithmetic** (`:69-75` comment block, formula only — not the numbers): `1 AUDIT + 105 chain + 2 CHAIN_EXTRA + 1 AUDIT-HARNESS + 1 SELF = 110` (D-33).

---

### `scripts/validation/check-phase-145..152.mjs` (8 content leaves) — templated on `check-phase-126.mjs` / `check-phase-132.mjs` (D-22)

**Analog:** `scripts/validation/check-phase-126.mjs` (full file, 141 lines) — complete lightweight-leaf shape to copy structurally.

**Full lightweight header/import/lightweight-chain block** (`:1-33`):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Lightweight: NO chain (chain lives only in apex check-phase-128.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
```
For 145-152: `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])` (D-23), apex reference in the comment repoints to `check-phase-153.mjs`.

**Presence-check factory pattern** (`:44-53`):
```javascript
function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-126-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}
```

**Needle-check pattern (`.includes` on file content)** (`:65-72`):
```javascript
checks.push({
  id: 'PARSEREGISTRY',
  name: 'V-126-PARSEREGISTRY: parseRegistry export present in ' + DELIVERABLE_FILENAMEMAP_LIB,
  run() {
    const c = readFile(DELIVERABLE_FILENAMEMAP_LIB);
    if (c === null) return { pass: false, detail: DELIVERABLE_FILENAMEMAP_LIB + ' missing' };
    if (!c.includes('parseRegistry')) return { pass: false, detail: 'PARSEREGISTRY needle absent: parseRegistry' };
    return { pass: true, detail: 'parseRegistry export present ...' };
  }
});
```
For the eight leaves, D-22's needle-target rule differs from 126's ("scripts/ paths only") — needles here point at `docs/` deliverables and, per D-25, may assert corpus-wide **negatives** (e.g. `grep -rn "\.planning/research/\|\.planning/phases/" docs/` → 0) where a ratified invariant makes the durability test pass.

**Self-invariant, verbatim structure** (`:95-108`):
```javascript
checks.push({
  id: 'SELF',
  name: 'V-126-SELF: CHAIN_PHASES does NOT include 126; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(126)) { return { pass: false, detail: '...' }; }
    if (CHAIN_SKIP.size !== 0) { ... }
    return { pass: true, detail: '...' };
  }
});
```

**Runner loop, byte-identical across the whole family, copy verbatim** (`:112-140`):
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-126 -- Phase 126 deliverables (...)\n');
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  if (result.skipped) { skipped++; process.stdout.write(...'SKIPPED'...); }
  else if (result.pass) { passed++; process.stdout.write(...'PASS'...); }
  else { failed++; process.stdout.write(...'FAIL'...); }
}
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```

**`check-phase-152.mjs` — transcribe verbatim, do not re-derive (D-29):** the entire needle-spec lives at `152-04-SUMMARY.md:343-414`; treat that block as the literal source, using this same `check-phase-126.mjs` scaffold as the mechanical shape only.

---

### `.github/workflows/audit-harness-v1.21-integrity.yml` (18th) — mechanical per-job diff (D-50)

**Analog:** `.github/workflows/audit-harness-v1.20-integrity.yml` (279 lines) — full file, diffed job-by-job.

**Trigger block, both crons carried VERBATIM per D-51** (`:31-43`):
```yaml
name: Audit Harness v1.20 Integrity
on:
  push:
    paths: [ ... ]  # D-50: all 6 paths: entries incl. self-reference at :38
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check — NEVER re-stagger (D-51)
```

**`harness-run` — the only job that executes the harness, must repoint `name:` AND `run:`** (`:83-93`):
```yaml
  harness-run:
    name: Run v1.20 milestone audit harness
    needs: path-match
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Run v1.20-milestone-audit.mjs
        run: node scripts/validation/v1.20-milestone-audit.mjs --verbose
```

**`linux-chain` — apex `name:`/`run:` both, not just the `::notice` (D-50)** (`:95-114`):
```yaml
  linux-chain-ubuntu-latest:
    name: Validator chain on Linux LF (Phase 69 CILINUX-01)
    needs: harness-run
    steps:
      - name: Disable autocrlf BEFORE checkout
        run: git config --global core.autocrlf false
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Run chain-apex check-phase-144.mjs (recursively spawns 48..143)
        run: |
          ...
```
Repoint to `check-phase-153.mjs`, span `48..152`, and the standalone leaf job at `:186-197` (`name: check-phase-144 validator (apex; ...)`) — D-54: this 18th workflow carries **its own** apex job `check-phase-153`, no `check-phase-144` job at all.

**Standalone per-leaf job shape to replicate 8× (145..152), template** (`:115-127`, `check-phase-139` job):
```yaml
  check-phase-139:
    name: check-phase-139 validator
    needs: harness-run
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Run check-phase-139.mjs
        run: node scripts/validation/check-phase-139.mjs
```

**`pin-helper-advisory` — carry as NON-EVIDENCE verbatim** (`:234-248` region; `continue-on-error: true` + `|| true` + `|| echo` per D-54).

**`rotting-external-quarterly`'s sidecar inline node script — the THIRD sidecar reference, easy to miss** (`:199-225`, inside an always-skipping job): must be repointed to `v1.21-audit-allowlist.json` even though this job structurally almost never runs (D-50).

---

### `scripts/validation/regenerate-supervision-pins.mjs` — `BASELINE_25` append (D-47)

**Analog:** the file's own `BASELINE_24` block.

**Forward-pointer + opening line to follow** (`:548`, `:563`):
```javascript
// BASELINE_24 refreshed 2026-08-13 (Phase 144 Plan 06): closes BASELINE_23 v1.19 carry-over
...
// ... Resolution path: BASELINE_25 will refresh at the [next milestone close]
```
`BASELINE_25` is appended following this shape; do not touch the v1.7 hardcodes at `:290`/`:336`/`:582`/`:584` (out of scope — D-48 names them only as a "never cite as pin-drift proof" warning, not an edit target).

---

### `scripts/pipeline/build-publish-bundle.mjs` — invocation only, no code edit (D-68)

**Analog:** itself — `VERSION` arg default (`:38-39`):
```javascript
const versionArg = argv.find(a => a.startsWith('--version='));
const VERSION = versionArg ? versionArg.slice('--version='.length) : 'v1.17'; // fallback preserves current behavior
```
Run as `node scripts/pipeline/build-publish-bundle.mjs --version=v1.21`, producing `dist/docs-library-v1.21.zip` (`dist/` gitignored — verify post-run, no other proof exists). **Neither canary is bumped** — both self-test assertions sit at `236` already (`:522` `'(a) Approved selection yields exactly 236 rows'`, `:525` same count in `build-filename-map.mjs:284`); do not touch these lines.

## Shared Patterns

### Frozen-read cause classifier / error enrichment
**Source:** `_lib/frozen-at-close.mjs` (`frozenCause`, wired into `readAtClose`/`lsTreeAtClose`/`readManyAtClose` catch blocks, e.g. `:190-198`)
**Apply to:** `withDocsAtClose` — any git-object read failure inside the materialize step should route through the same `frozenCause`/`err.message = '[' + cause + '] ' + err.message` enrichment shape already used by the three existing readers, for consistency with `execFailDetail`'s 500-char truncation downstream.

### `execFailDetail` truncation on subprocess failure
**Source:** `_lib/exec-fail-detail.mjs`, called identically at the end of every C17 leg (`v1.15-milestone-audit.mjs:836`) and every chain-guard catch in `check-phase-144.mjs:218`
**Apply to:** all six C17-leg edits, the new `v1.21-milestone-audit.mjs`, and `check-phase-153.mjs`'s chain-guard catches — copy the exact call shape `execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: '<X> FAIL: ' })`.

### CRLF normalization on every read
**Source:** `readFile()` helper repeated verbatim in `c17-eee-contract.mjs:60-64`, `check-phase-126.mjs:24-27`, `check-phase-144.mjs:105-108` — `.replace(/\r\n/g, '\n')` after `readFileSync(..., 'utf8')`
**Apply to:** every new leaf's `readFile` helper and any inline read in the new apex — Windows is the primary authoring platform (D-18) and this is the load-bearing convention across the whole validator family.

### NESTED-aware AUDIT-HARNESS / chain guards
**Source:** `check-phase-144.mjs` `CHECK_PHASE_NESTED` handling at `:178-181` (chain) and equivalent at the AUDIT-HARNESS check
**Apply to:** `check-phase-153.mjs` only (the 8 leaves are lightweight, no chain — D-23) — this is what keeps the apex O(n) instead of exponential (D-31's second bullet).

### Node built-ins only, argument-array `execFileSync` (never shell string)
**Source:** stated explicitly in `c17-eee-contract.mjs:15` header and enforced throughout `check-phase-144.mjs`/`check-phase-139.mjs`
**Apply to:** every new/edited file in this phase, especially `withDocsAtClose`'s tmpdir writes (`mkdtempSync`/`writeFileSync`/`mkdirSync`/`rmSync` — no `tar`, no `git worktree add`, per D-14).

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `withDocsAtClose` write-verb body inside `_lib/frozen-at-close.mjs` | utility | file-I/O (temp materialize) | No existing helper in the repo materializes a frozen tree to disk; closest neighbors (`_lib/frozen-at-close.mjs:461`, `frozen-read-negative-test.mjs:290`) only show the bare non-retrying `rmSync` cleanup half, explicitly rejected as insufficient by D-18. Build from `lsTreeAtClose` + `readManyAtClose` + Node's own `mkdtempSync`/`writeFileSync`/`mkdirSync`/`rmSync({maxRetries, retryDelay})` docs (stdlib rung, not a new dependency). |
| `v1.21-MILESTONE-AUDIT.md`, `v1.21-DEFERRED-CLEANUP.md` (prose artifacts) | doc/config | file-I/O | Out of this pattern-mapper's scope (not `.mjs`/`.yml`/`.js` code) — content shape inherits v1.20's file structurally per D-66/CONTEXT.md, no code excerpt applicable. |

## Metadata

**Analog search scope:** files named explicitly in `153-CONTEXT.md`'s `<canonical_refs>` — no independent Glob/Grep discovery was needed since the phase context pre-identified every analog with line numbers; targeted `Bash`/`sed -n` reads confirmed each excerpt against the live repo.
**Files scanned:** 13 (`_lib/frozen-at-close.mjs`, `v1.15-milestone-audit.mjs`, `v1.20-milestone-audit.mjs`, `c17-eee-contract.mjs`, `check-phase-144.mjs`, `check-phase-126.mjs`, `check-phase-139.mjs`, `check-phase-140.mjs`, `audit-harness-v1.20-integrity.yml`, `build-publish-bundle.mjs`, `regenerate-supervision-pins.mjs`)
**Pattern extraction date:** 2026-08-29
