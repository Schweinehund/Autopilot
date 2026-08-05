# Phase 139: Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair - Pattern Map

**Mapped:** 2026-08-05
**Files analyzed:** 12 (new + modified)
**Analogs found:** 12 / 12 — every atom has a same-repo precedent (per RESEARCH.md "Don't Hand-Roll")

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `.planning/milestones/v1.20-CARVE.md` | config (governance doc) | request-response (read by gate + hook) | `.planning/milestones/v1.18-phases/133-.../133-ONE-N-ATTESTATION.md` (narrative+contract shape) | role-match |
| `scripts/validation/carve-gate.mjs` | utility (diff gate) | batch (git diff/status → exit code) | `scripts/validation/check-phase-63.mjs:208-250` (byte-unchanged gate class) | partial (new script, not a chain validator) |
| `.claude/hooks/v1.20-carve-gate.cjs` (name TBD) | middleware (Stop-hook) | event-driven | `.claude/hooks/publish-bundle-gate.cjs` | exact |
| `.planning/milestones/v1.20-GOV-02-LEDGER.md` | model (append-only log) | event-driven (row-per-edit) | none in repo (new artifact shape) — closest is CARVE.md's own fenced-block idea | no analog |
| `scripts/validation/_lib/frozen-at-close.mjs` (modified: `lsTreeAtClose`, `frozenCause`, `--self-test`) | utility/service (frozen-read library) | file-I/O (git plumbing) | itself — `readAtClose` (lines 334-340) is the mirror signature; `check-phase-60.mjs` `--self-test` pattern for the CLI entrypoint | exact (self-extension) |
| `scripts/validation/check-phase-49.mjs` (delete 3 try/catch: :264,:297,:334) | test/validator | request-response (chain check) | itself — runner's own outer try/catch at `:362` | exact |
| `scripts/validation/check-phase-51.mjs` (delete 1 try/catch: :31) | test/validator | request-response | itself — runner's outer try/catch at `:411` | exact |
| `scripts/validation/check-phase-69.mjs` (`PRED_BLOBS` → frozen-to-frozen) | test/validator | CRUD (compare recorded vs live) | `scripts/validation/check-phase-63.mjs:208-250` (`V-63-08`/`V-63-09`) | exact |
| `scripts/validation/check-phase-70.mjs` (same conversion) | test/validator | CRUD | `scripts/validation/check-phase-63.mjs:208-250` | exact |
| `.github/workflows/audit-harness-integrity.yml` (4 checkouts → `fetch-depth: 0`, + `paths:` filter) | config (CI workflow) | batch | `.github/workflows/audit-harness-v1.7-integrity.yml:74-84,101-102` (already-deep checkout idiom) | exact |
| `.github/workflows/audit-harness-v1.5-integrity.yml` (18 checkouts) + `-v1.6-` (10) + 13× `v1.{7..19}` (5 each) | config (CI workflow) | batch | same v1.7 idiom, `with: { fetch-depth: 0 }` inline flow-mapping | exact |
| `frozen-read-probe` job (new, one per retrofitted workflow) | route/job (CI step) | request-response (dispatched, no `needs:`) | existing `check-phase-67` job skeleton at `audit-harness-v1.7-integrity.yml:101-102` (bare `uses: actions/checkout@v4` + `with: { fetch-depth: 0 }`, no upstream `needs:`) | role-match |

## Pattern Assignments

### `.claude/hooks/v1.20-carve-gate.cjs` (middleware, Stop-hook)

**Analog:** `.claude/hooks/publish-bundle-gate.cjs` (full file, 257 lines, already read this session)

**Skeleton to clone verbatim** (lines 1-30):
```javascript
#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('node:child_process');

function readStdin(){ try { return fs.readFileSync(0,'utf8'); } catch { return ''; } }
function allow(){ process.exit(0); }
function block(reason){ process.stdout.write(JSON.stringify({decision:'block',reason})); process.exit(0); }
```

**Fail-open + nudge/warn shape:** `publish-bundle-gate.cjs` never throws past its own boundary — every parse/IO error or missing file resolves to `allow()` (exit 0). The CARVE hook (D-08 "nudge-then-warn") should reuse this exact `allow()`/`block(reason)` pair: first fire = nudge (block with an informational reason but no hard stop, matching D-04's degrade-to-warn posture at lines 17-18 of the analog's header comment), second fire = warn. Do NOT invent a third exit path.

**Anchored-regex precedent for any tag/version string the hook derives a path from** (lines 32-41):
```javascript
const VERSION_RE = /^v?\d+\.\d+(\.\d+)?$/;
```
Reuse this exact anchoring discipline if the hook ever needs to validate `v1.20` against a milestone-tag-shaped string (RESEARCH.md's Security Domain section names this as the load-bearing path-traversal mitigation).

**Registration pattern (both existing Stop-hooks):** `.claude/settings.local.json` (gitignored), 15s timeout ceiling, command form `node "$CLAUDE_PROJECT_DIR/.claude/hooks/<file>.cjs"`. Register the new hook the same way — RESEARCH.md's Open Question 2 confirms this is the accepted repo convention (hook activation is machine-local, does not travel with `git clone`), not a defect to fix.

---

### `scripts/validation/_lib/frozen-at-close.mjs` (utility, extend in place)

**Analog:** itself — `readAtClose` is the exact mirror for `lsTreeAtClose`'s signature and pin-gate reuse.

**Current full relevant surface** (verified in full this session, 135 lines):
```javascript
export const MILESTONE_CLOSE_SHAS = {
  V141: '5c976ec', V15: 'ba2cbc0', V16: '9d8877c', V17: 'aa6de68',
  V17_CLOSEGATE: '4df3a16', V18: '2bd79d8', V19: 'b29dca5', V110: 'a3617e9',
  V111: '919b23b', V112: '12f2c7b', V113: 'ba24f1a', V114: '7d922a7',
  V115: '29a3599', V116: '3dd2512', V117: 'b56bba5', V118: '7af8a147',
  // V14 omitted -- see :94-96 rationale; no V119 entry yet (Phase 144's HARN-17)
};

export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\r\n/g, '\n');
}
// + 15 per-milestone convenience exports: readAtV141Close .. readAtV118Close
```

**`lsTreeAtClose` build target (D-34..D-40):**
- Signature: `lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {})` — reuse the `MILESTONE_CLOSE_SHAS[milestoneTag]` pin gate verbatim (`if (!sha) throw`), same `stdio: ['ignore','pipe','pipe']`, same `timeout` pattern (bump above 10000 per D-38's "above the 203 KB a full-tree `-r` already emits").
- Invocation: `git ls-tree -r -z --name-only <sha> -- <prefix>`, split on `'\0'`, **`.filter(Boolean)` mandatory** (D-37 — NUL-terminated final entry produces a phantom empty element).
- Error semantics: throw on any git failure (nonzero exit); return `[]` only when git exits 0 with empty stdout (valid-but-empty prefix) — do NOT catch-and-return-`[]` on failure (D-36).
- Per-milestone convenience exports mirroring `readAtV15Close` etc. (e.g. `lsTreeAtV15Close(dir)`).

**`frozenCause` classifier (D-28) — six-pattern union, attach to both `readAtClose` and `lsTreeAtClose` throws:**
```
unreachable-sha  ← 'invalid object name' | 'Not a valid object name' | 'not a tree object'
absent-path      ← 'does not exist in' | 'exists on disk, but not in'
other            ← everything else
```
Live-verified exact strings this session (RESEARCH.md Code Examples):
```
$ git show ba2cbc0:docs/_glossary-linux.md   (inside a depth-1 file:// clone)
fatal: invalid object name 'ba2cbc0'.

$ git show HEAD:docs/does-not-exist-anywhere.md
fatal: path 'docs/does-not-exist-anywhere.md' does not exist in 'HEAD'

$ git show HEAD~10:.planning/phases/139-.../139-CONTEXT.md
fatal: path '...' exists on disk, but not in 'HEAD~10'
```
`err.stderr` is available for classification only because `stdio: ['ignore','pipe','pipe']` is already set — do not change that option.

**`--self-test` entrypoint:** no existing scaffolding in this file (RESEARCH.md Finding 13 — greenfield within the file). Use `check-phase-60.mjs`'s `--self-test` / `execFailDetail` idiom (`n: 500` truncation, `require.main === module`-gated) as the CLI-entry shape, and the six D-39 assertions verbatim: exact count 34 for `lsTreeAtV15Close('docs/l1-runbooks')`, known-member-path presence, unpinned-tag throw, empty-prefix `[]`, `file://` shallow-clone `unreachable-sha` throw, wall-clock print.

---

### `scripts/validation/check-phase-69.mjs` and `check-phase-70.mjs` (test/validator, `PRED_BLOBS` → frozen-to-frozen)

**Analog:** `scripts/validation/check-phase-63.mjs:208-230` — the ONLY frozen-to-frozen instance in the repo. Do not confuse with the worktree-hash instance below.

**Frozen-to-frozen gate (what to copy) — reads a git blob at a FROZEN SHA, never the worktree:**
```javascript
// Source: scripts/validation/check-phase-63.mjs:208-230
{
  id: 8, name: 'V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 732588a57fd762c294400a4f6fd9a065c974216c [v1.13-frozen @ ba24f1a]',
  run() {
    const BASELINE = '732588a57fd762c294400a4f6fd9a065c974216c';
    const FROZEN_SHA = MILESTONE_CLOSE_SHAS.V113;  // ba24f1a
    try {
      const result = execFileSync('git', ['rev-parse', FROZEN_SHA + ':' + MACOS_MATRIX], { stdio: 'pipe', cwd: process.cwd() });
      const actual = result.toString().trim();
      if (actual !== BASELINE) {
        return { pass: false, detail: '... blob hash CHANGED @v1.13-close: expected ' + BASELINE + ', got ' + actual + ' ...' };
      }
      return { pass: true, detail: '... blob @v1.13-close matches baseline ' + BASELINE };
    } catch (err) {
      return { pass: true, skipped: true, detail: 'git rev-parse not available -- skipped' };
    }
  }
}
```
**REQUIRED AMENDMENT (D-22):** the `catch → { pass: true, skipped: true }` above is the exact swallow class SWEEP-03 deletes elsewhere. When copying this into 69/70, the catch must fail loud (delete the try/catch or rethrow), not skip-pass.

**Current worktree-coupled code being REPLACED (the read source only — structure survives):**
```javascript
// Source: scripts/validation/check-phase-69.mjs:37-41, 138-162
const PRED_BLOBS = {
  '.github/workflows/audit-harness-integrity.yml':       '08449a338b6ce87de946ad9d8e58af544cae01d8',
  '.github/workflows/audit-harness-v1.5-integrity.yml':  '6990de2894b026551aba62d1f5ce9c95c0ff88e9',
  '.github/workflows/audit-harness-v1.6-integrity.yml':  '89b536b3ec55e23beecb56a2e348f99fe5a3cf8c',
};
run() {
  const drift = [];
  for (const [path, expected] of Object.entries(PRED_BLOBS)) {
    if (!existsSync(join(process.cwd(), path))) { drift.push(path + ' (missing)'); continue; }
    try {
      const actual = execFileSync('git', ['hash-object', path], { encoding: 'utf8', timeout: 10000 }).trim(); // <-- WORKTREE read; REPLACE with git rev-parse <V17>:<path>
      if (actual !== expected) drift.push(path + ' (expected ' + expected.slice(0,7) + '; got ' + actual.slice(0,7) + ')');
    } catch (err) { drift.push(path + ' (hash-object failed: ' + err.message.slice(0, 80) + ')'); }
  }
  if (drift.length > 0) return { pass: false, detail: drift.length + ' predecessor workflow(s) drifted: ' + drift.join('; ') };
  return { pass: true, detail: '3/3 predecessor workflows BYTE-UNCHANGED (v1.4 + v1.5 + v1.6)' };
}
```
`PRED_BLOBS` values ARE the recorded baselines — `[VERIFIED]` `git hash-object` on all three files this session reproduced them exactly. Conversion: replace `git hash-object <worktree path>` with `git rev-parse <MILESTONE_CLOSE_SHAS.V17>:<path>` compared against the same `PRED_BLOBS` baseline values, per the `check-phase-63` model, fail-loud per D-22.

**Identical structure duplicated at:** `check-phase-70.mjs:73-77` (`PRED_BLOBS`) and `:342-364` (`V-70-17`) — both files edited together.

**Ordering constraint (D-41 atom 4 before atom 5):** this conversion MUST land before any of the three workflow files are edited, or the apex chain (`check-phase-138.mjs`, which runs 69/70 among 90 members) goes RED the instant a byte changes on disk, because `git hash-object` reads the worktree pre-commit.

---

### `scripts/validation/check-phase-49.mjs` / `check-phase-51.mjs` (fail-loud, SWEEP-03)

**Analog:** the runner's own outer try/catch already in both files — this is the smallest-diff analog: delete the inner catch, let the outer one do the work it already does.

**The 4 exact current sites (verbatim, to be deleted):**
```javascript
// check-phase-49.mjs:264
try { content = readAtV15Close(f); } catch { content = null; }

// check-phase-49.mjs:297
try { androidContent = readAtV116Close(GLOSSARY_ANDROID_PATH); } catch { androidContent = ""; }

// check-phase-49.mjs:334  (the 4th site, D-30)
try { content = readAtV116Close(GLOSSARY_ANDROID_PATH); } catch { content = null; }

// check-phase-51.mjs:30-32
function readTreeFrozen() {
  try { return readAtV115Close(TREE); } catch { return null; }
}
```

**What already exists and makes this safe (the outer catch — DO NOT touch):**
```javascript
// check-phase-49.mjs:362, check-phase-51.mjs:411 (runner-level, unchanged)
try { result = check.run(); } catch (e) { result = { pass: false, detail: "Unexpected error: " + e.message }; }
```
then `process.exit(failed > 0 ? 1 : 0)`. Deleting the four inner try/catch blocks lets the `readAt*Close` throw propagate up to this existing wrapper, which converts it into one honest FAIL row automatically — no per-site message formatting needed.

**Import header (check-phase-49.mjs:1-10, for context/consistency when editing):**
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { readAtV15Close, readAtV116Close } from './_lib/frozen-at-close.mjs';
```

**Truncation constraint (D-27):** `check-phase-60.mjs:247` truncates detail strings at `n: 500` — the `frozenCause` must be emitted at the FRONT of any message the classifier produces, never appended, or it gets silently cut off.

---

### `.github/workflows/*.yml` (SWEEP-01, 97 checkouts across 16 files)

**Analog:** every already-converted checkout in the same repo — 100% inline flow-mapping, zero multi-line exceptions.

```yaml
# Source: .github/workflows/audit-harness-v1.7-integrity.yml:74-84,101-102
  linux-chain-ubuntu-latest:
    ...
    steps:
      - name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
        run: git config --global core.autocrlf false
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      ...
  check-phase-67:
    ...
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
```
Replicate this exact `with: { fetch-depth: 0 }` inline form on all 97 shallow checkouts (32 in the 3 named files: 4+18+10, plus 5 each in the other 13 `v1.{7..19}` files that have `harness-run` jobs not yet retrofitted for this specific line — confirm per-file before editing since v1.7+ already carries this pattern on SOME jobs).

**Grep discipline (avoid false positives, D-15/Pitfall 4):** use `fetch-depth: 0` WITH THE SPACE. `fetch-depth:0` (no space) matches 13 header-comment prose lines, not real YAML keys (e.g. `.github/workflows/audit-harness-v1.7-integrity.yml:6`).

**D-17 companion edit — `paths:` filter on `audit-harness-integrity.yml` needs `.github/workflows/**` added** (it does not currently watch its own file).

**`frozen-read-probe` job (new, one per retrofitted workflow, no `needs:`):** model the job skeleton on the existing bare `check-phase-67` job form above — `uses: actions/checkout@v4` + `with: { fetch-depth: 0 }`, then a step running `git show <old-sha>:<path>` plus one real `readAtClose`/`readAtV15Close` call from `_lib/frozen-at-close.mjs`. Suggested SHA:path pairs (Claude's discretion, RESEARCH.md Open Question 1): `MILESTONE_CLOSE_SHAS.V15` for the v1.5 probe, `.V16` for v1.6, `.V141` (or a synthetic `.planning/REQUIREMENTS.md` read) for the base workflow.

---

## Shared Patterns

### Frozen-vs-worktree gate class (GOV-01 core distinction — do not conflate)
**Two DIFFERENT gate classes exist in this repo:**
1. **Frozen-to-frozen** (`check-phase-63.mjs:208-250`) — `git rev-parse <FROZEN_SHA>:<path>` compared against a recorded baseline blob. Both sides immutable; the live worktree never enters the comparison. **This is what D-19 requires for check-phase-69/70's PRED_BLOBS conversion.**
2. **Worktree-hash** (`check-phase-69.mjs:138-162`, `check-phase-70.mjs:342-364`, current/pre-conversion state) — `git hash-object <worktree-path>` reads whatever is on disk right now, even pre-commit. This is the class being REPLACED, not extended.

Apply to: `carve-gate.mjs` (D-06/D-07 explicitly makes it a live-diff script, NOT a frozen-to-frozen chain assertion — it is intentionally the opposite of pattern 1), and `check-phase-69/70.mjs` (converts from pattern 2 to pattern 1).

### Fail-loud discipline (SWEEP-03, applies to all 4 sites + future SWEEP-09)
**Source:** the runner-level catch already present at `check-phase-49.mjs:362` / `check-phase-51.mjs:411`
**Apply to:** any `try { readAt*Close(...) } catch { ... null/"" }` site — delete the inner try/catch; do not convert to an explicit `{ pass: false }` return (D-27). The outer runner catch already exists and does the formatting.

### Call-site pinning discipline (GOV-02)
**Source:** `scripts/validation/check-phase-111.mjs:76-87` (`V-111-TOOL03`)
```javascript
const needle = "execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })";
if (!c.includes(needle)) return { pass: false, detail: 'TOOL03 call-site absent (...): ' + needle };
```
Plain `String.includes()` on a literal substring — not AST, not a capturing regex. **Apply to:** every atom in this phase before editing a frozen validator — grep for both the exact call-site string AND the file-path string (D-12's "target-scoped, not symbol-scoped" — `check-phase-66.mjs:42`'s `CI_WORKFLOW` path-string literal is the D-12 example of what a symbol-only grep misses).

### `execFileSync` with argument arrays (security pattern, all new git invocations)
Every git call in this repo already uses `execFileSync('git', [...args])` — never `execSync` with string interpolation. Continue this for `lsTreeAtClose`'s `git ls-tree` call and the frozen-to-frozen `git rev-parse` calls in 69/70.

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `.planning/milestones/v1.20-GOV-02-LEDGER.md` | model (append-only log) | event-driven | No existing per-edit evidence ledger in this repo; closest conceptual precedent is the CARVE's own fenced-block idea, but the row schema (file, grep command, hit count, regression gate run, result) is net-new. Claude's Discretion per CONTEXT.md — exact row schema is open.
| `.planning/milestones/v1.20-CARVE.md` allowlist fenced block format | config | request-response | No prior milestone has authored a category-based (not file-enumerated) allowlist artifact; `133-ONE-N-ATTESTATION.md` is the closest shape precedent but is explicitly a human-only artifact (not machine-parsed) per `check-phase-133.mjs:10`. |

## Metadata

**Analog search scope:** `scripts/validation/` (all `check-phase-*.mjs`, `_lib/`), `.github/workflows/` (all 16), `.claude/hooks/` (both existing Stop-hooks), `.planning/milestones/` (v1.18 Phase 133 precedent)
**Files scanned:** RESEARCH.md's own primary-source list (18 files/ranges) plus 2 targeted reads this pass (`publish-bundle-gate.cjs:1-80`, `check-phase-49.mjs:1-30`) confirming the analog excerpts already captured in RESEARCH.md
**Pattern extraction date:** 2026-08-05
**Note:** RESEARCH.md (139-RESEARCH.md) already contains every excerpt above with `[VERIFIED]` tags from live reads this session — this file re-packages them by target-file for the planner's direct consumption; it introduces no new claims.
