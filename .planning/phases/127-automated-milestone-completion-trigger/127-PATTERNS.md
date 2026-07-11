# Phase 127: Automated Milestone-Completion Trigger - Pattern Map

**Mapped:** 2026-07-10
**Files analyzed:** 4 (1 new hook, 1 modified pipeline script, 1 modified settings file, 1 new/embedded self-test)
**Analogs found:** 4 / 4

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `.claude/hooks/bundle-trigger-gate.cjs` (NEW; name is planner's discretion, e.g. `bundle-trigger-gate.cjs`) | middleware (Stop-hook gate) | event-driven (stdin JSON → stdout JSON decision) | `.claude/hooks/jira-milestone-gate.cjs` | exact (same role, same data flow, same STATE.md read, same fail-open contract) |
| `scripts/pipeline/build-publish-bundle.mjs` (MODIFIED — argv parsing + `ZIP_NAME`) | config/utility (CLI orchestrator) | batch / transform | itself — extend the existing `--self-test` argv block (lines 35-37) and the `ZIP_NAME` const (line 43) | exact (self-referential edit, no external analog needed) |
| `.claude/settings.local.json` (MODIFIED — add second `Stop[]` entry) | config | event-driven (hook activation registry) | itself — mirror the existing `Stop[0]` entry (lines 3-13) | exact |
| Self-test / dry-run harness for the new hook (embedded `--self-test` branch, satisfies SC#3) | test | transform (pure `computeDecision()` over synthetic fixtures) | `scripts/pipeline/build-publish-bundle.mjs` self-test block (lines 470-616, `stAssert`/`stTry`/`padLabel`) | role-match (pipeline convention transplanted into a `.cjs` hook — first precedent of this kind per RESEARCH.md Open Question #3) |

## Pattern Assignments

### `.claude/hooks/bundle-trigger-gate.cjs` (middleware, event-driven)

**Analog:** `.claude/hooks/jira-milestone-gate.cjs` (read in full — 95 lines)

**Imports + stdin/allow/block helpers** (lines 1-25, VERIFIED):
```javascript
#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
function readStdin(){ try { return fs.readFileSync(0,'utf8'); } catch { return ''; } }
function allow(){ process.exit(0); }
function block(reason){ process.stdout.write(JSON.stringify({decision:'block',reason})); process.exit(0); }
```
Clone these four lines verbatim. Note: `block()` still exits **0** — it relies on the JSON `decision` field being parsed by Claude Code, not on exit code 2 (per RESEARCH.md Pattern 1). Never use `exit(2)` — it discards stdout/JSON.

**`stop_hook_active` early-allow + input parse** (lines 26-29, VERIFIED):
```javascript
function main(){
  let input={}; try { input=JSON.parse(readStdin()||'{}'); } catch { input={}; }
  if (input.stop_hook_active===true) allow();
  const projectDir = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  ...
}
try { main(); } catch { process.exit(0); }
```
This guard (line 28) is what prevents the multi-turn cascade from re-firing the hook within the same Stop resolution — combine with D-04's zip-existence check for full idempotency.

**STATE frontmatter `grab()` parser** (lines 30-46, VERIFIED — reuse verbatim, do not reimplement):
```javascript
const statePath = path.join(projectDir,'.planning','STATE.md');
if (!fs.existsSync(statePath)) allow();
let stateText;
try { stateText=fs.readFileSync(statePath,'utf8'); } catch { allow(); }
const fmMatch = stateText.match(/^---\s*([\s\S]*?)\s*---/);
const fm = fmMatch ? fmMatch[1] : stateText;
const grab=(re,src=fm)=>{ const m=src.match(re); return m?m[1].trim().replace(/^["']|["']$/g,''):null; };
const version = grab(/^milestone:\s*(.+)$/m);
const status = (grab(/^status:\s*(.+)$/m)||'').toLowerCase();
const completedPhases = parseInt(grab(/completed_phases:\s*(\d+)/)||'0',10);
const percent = parseInt(grab(/percent:\s*(\d+)/)||'0',10);
if (!version || !/^v?\d+\.\d+(\.\d+)?$/.test(version)) allow(); // ANCHORED ($-terminated) — rejects traversal-shaped milestone values
```
The bundle hook does **not** need `mappingPath`/`jira/mapping.json`, `roadmapText`, or the ROADMAP phase-count derivation (lines 31-32, 36, 56-69 of the Jira hook) — those are Jira-specific. Drop them; keep only STATE.md reads.

**`completeSignal` regex — reuse identical logic** (line 72, VERIFIED, RESEARCH.md "Don't Hand-Roll"):
```javascript
const totalPhases = completedPhases; // or however the bundle hook derives it — RESEARCH recommends
                                       // NOT re-deriving ROADMAP phase-count (Jira-specific adaptation);
                                       // percent===100 alone is sufficient for this hook's simpler gate
const completeSignal = /milestone[_\s-]*complete|awaiting next milestone|shipped|archived/.test(status) && (percent===100 || (totalPhases>0 && completedPhases>=totalPhases));
```
CRITICAL per RESEARCH.md Don't-Hand-Roll table: use the **exact same regex string** as the Jira hook. A "simpler" independent reimplementation risks disagreeing with the Jira hook about when the milestone is complete.

**D-05 version derivation → D-04 idempotency check** (RESEARCH.md Code Examples, "Hook-side derivation"):
```javascript
const normalizedVersion = version.startsWith('v') ? version : 'v' + version;
const zipName = `docs-library-${normalizedVersion}.zip`;
const zipPath = path.join(projectDir, 'dist', zipName);
if (fs.existsSync(zipPath)) allow(); // D-04: read-only idempotency guard, already built
```

**Prerequisite probe (self-contained, NOT a cross-module import)** (RESEARCH.md Pattern 3, adapted from `build-publish-bundle.mjs:202-217` VERIFIED):
```javascript
const { execFileSync } = require('node:child_process');
const PROBE_TIMEOUT_MS = 4000; // tight: two probes worst-case = 8s, well under the 15s hook ceiling

function probePandoc() {
  try {
    execFileSync('pandoc', ['--version'], { stdio: 'pipe', timeout: PROBE_TIMEOUT_MS });
    return true;
  } catch (e) {
    if (e.code === 'ENOENT' || e.status === 127) {
      const localAppData = process.env.LOCALAPPDATA;
      if (localAppData) {
        const fallback = require('node:path').join(localAppData, 'Pandoc', 'pandoc.exe');
        return require('node:fs').existsSync(fallback);
      }
      return false;
    }
    return true; // non-ENOENT error still means the binary exists; version-pin is the pipeline's job
  }
}

function probePwsh() {
  try {
    execFileSync('pwsh', ['-NoProfile', '-Command', 'exit 0'], { stdio: 'pipe', timeout: PROBE_TIMEOUT_MS });
    return true;
  } catch {
    return false;
  }
}
```
Node itself needs **no probe** — the hook process could not have started without it (degrades by construction). Do **not** reuse `preflightCheck()`'s 10000ms timeout constant verbatim — it is designed for the pipeline's unconstrained context, not the hook's 15s ceiling.

**Nudge / warn dispatch (D-02/D-03 — the load-bearing branch)**:
```javascript
if (completeSignal /* && zip absent, per above */) {
  const pandocOk = probePandoc();
  const pwshOk = probePwsh();
  if (pandocOk && pwshOk) {
    block(`Milestone ${version} is complete and ${zipName} has not been built yet.\nRun this now in the foreground: node scripts/pipeline/build-publish-bundle.mjs --version=${normalizedVersion}\n(This is NOT a block on the close — you may also skip this and run it later.)`);
  } else {
    const missing = [!pandocOk && 'pandoc', !pwshOk && 'pwsh'].filter(Boolean).join(', ');
    block(`Milestone ${version} is complete but the publish-bundle prerequisite(s) [${missing}] are not available in this environment.\nThe milestone close is NOT blocked. Once ${missing} is installed, run manually:\n  node scripts/pipeline/build-publish-bundle.mjs --version=${normalizedVersion}`);
  }
}
allow();
```
Per RESEARCH.md Pitfall 4: write `reason` text fully self-contained — never assume the Jira hook's `reason` was also shown on the same turn. Per RESEARCH.md Security Domain: never emit `{"continue":false}` — verify this explicitly in the self-test (assert no `continue` key in any output).

**Fail-open wrapper — reuse verbatim** (line 94, VERIFIED):
```javascript
try { main(); } catch { process.exit(0); }
```

**Command-injection avoidance (CLAUDE.md Security Notes + RESEARCH.md Anti-Patterns):** never build a `pwsh -Command "..."` string via concatenation/template-literal interpolation of the parsed `version`. Use `execFileSync` with an argv array throughout (matches `build-publish-bundle.mjs`'s established `T-126-02-01` convention) — the probes above already do this correctly.

---

### `scripts/pipeline/build-publish-bundle.mjs` (config/utility, batch — MODIFIED, D-05)

**Analog:** itself — extend the existing argv convention, do not introduce a new pattern.

**Existing argv block to extend** (lines 35-37, VERIFIED):
```javascript
const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);
```

**Existing hardcode to parameterize** (line 43, VERIFIED — the primary D-05 target):
```javascript
const ZIP_NAME = 'docs-library-v1.17.zip';
```

**Recommended replacement** (RESEARCH.md Code Examples, "Complete ZIP_NAME / version reference audit"):
```javascript
const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');
const versionArg = argv.find(a => a.startsWith('--version='));
const VERSION = versionArg ? versionArg.slice('--version='.length) : 'v1.17'; // fallback preserves current behavior
if (!/^v\d+\.\d+/.test(VERSION)) {
  process.stderr.write('FATAL: --version must look like v1.17 or v1.4.1 (got: ' + VERSION + ')\n');
  process.exit(1);
}
const ZIP_NAME = `docs-library-${VERSION}.zip`;
```
Handles 3-part versions (`v1.4.1`) unchanged — no special-casing needed. Only **3 total references** exist in the file (VERIFIED via grep, exhaustive): the comment at line 11 (informational, update for clarity), the `ZIP_NAME` const at line 43 (above), and the single usage site at line 452 (`const zipDest = join(distDirAbs, ZIP_NAME);` — unchanged, reads the new derived const automatically).

**Error-handling / fail-closed exit pattern to preserve** (lines 618-632, VERIFIED — do not disturb):
```javascript
if (isMainModule && !SELF_TEST) {
  try {
    runBatch();
  } catch (err) {
    process.stderr.write('FATAL: unexpected error: ' + (err.stack || err.message) + '\n');
    process.exit(1);
  }
}
```
This is a structural anchor — the new `--version=` flag parsing must happen *before* this block (alongside the existing `SELF_TEST` parse at line 36), not inside it.

---

### `.claude/settings.local.json` (config, event-driven — MODIFIED)

**Analog:** itself — the file's existing single `Stop[]` entry (lines 3-13, VERIFIED, gitignored).

**Current shape:**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/jira-milestone-gate.cjs\"",
            "timeout": 15
          }
        ]
      }
    ]
  },
  "permissions": { ... }
}
```

**Required edit — add a second sibling entry to `hooks.Stop[]`, do not edit the existing entry in place** (RESEARCH.md Pattern 2, confirmed shape):
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/jira-milestone-gate.cjs\"", "timeout": 15 }
        ]
      },
      {
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/bundle-trigger-gate.cjs\"", "timeout": 15 }
        ]
      }
    ]
  }
}
```
Preserve the existing `permissions` block untouched. `timeout: 15` is a **per-hook-process** ceiling (both hooks run in parallel, each gets its own 15s) — do not share/reduce it for the new entry. Activation requires a Claude Code restart to take effect (same as the existing Jira hook — acceptable, documented tradeoff).

---

### Self-test / dry-run harness for the new hook (test, transform — satisfies SC#3)

**Analog:** `scripts/pipeline/build-publish-bundle.mjs` self-test block (lines 470-616, VERIFIED — `padLabel`/`stAssert`/`stTry` convention). This is a **role-match transplant**, not an exact analog: `jira-milestone-gate.cjs` has no self-test precedent at all (first of its kind for a `.claude/hooks/*.cjs` file per RESEARCH.md Open Question #3).

**Pattern to transplant — pure assertion harness, gated behind main-module check** (lines 470-477, 613-616, VERIFIED):
```javascript
function stAssert(label, pass, detail) {
  const tag = pass ? 'PASS' : 'FAIL';
  process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
  if (pass) stPassed++; else stFailed++;
}
function stTry(label, fn) {
  try { fn(); } catch (err) { stAssert(label, false, err.message); }
}
// ... assertions ...
process.stdout.write('\n' + stPassed + ' passed, ' + stFailed + ' failed\n');
process.exit(stFailed > 0 ? 1 : 0);
```

**CJS equivalent of the `.mjs` `isMainModule` check** (RESEARCH.md Open Question #3 recommendation): gate the self-test branch behind `require.main === module` instead of `process.argv[1] === fileURLToPath(import.meta.url)` (the ESM idiom used at line 37 of the pipeline file — not portable to `.cjs`).

**Design requirement (RESEARCH.md Open Question #3):** extract the decision logic into a pure, exported `computeDecision({stop_hook_active, milestone, status, percent, completedPhases, zipExists, pandocOk, pwshOk})` function, separate from the stdin/fs I/O in `main()`. Exercise it with synthetic fixtures covering the full matrix: zip-exists / zip-missing × prereqs-present / prereqs-missing × `completeSignal` true/false × `stop_hook_active` true/false. This is what proves SC#3 ("the trigger does not block, fail, or corrupt the close when pandoc/pwsh/Node are absent") without needing an environment with actually-uninstalled tools.

```javascript
// Recommended module shape (new pattern, no direct analog — first CJS self-test in this repo):
function computeDecision({ stopHookActive, version, status, percent, completedPhases, zipExists, pandocOk, pwshOk }) {
  if (stopHookActive) return { action: 'allow' };
  if (!version || !/^v?\d+\.\d+(\.\d+)?$/.test(version)) return { action: 'allow' }; // ANCHORED: the $-terminated form rejects v1.17/../../secrets before it reaches the dist/<zipName> path
  const completeSignal = /milestone[_\s-]*complete|awaiting next milestone|shipped|archived/.test((status||'').toLowerCase())
    && (percent === 100 || completedPhases >= 1);
  if (!completeSignal) return { action: 'allow' };
  if (zipExists) return { action: 'allow' };
  if (pandocOk && pwshOk) return { action: 'block', kind: 'nudge' };
  return { action: 'block', kind: 'warn' };
}
if (require.main === module) {
  module.exports = { computeDecision }; // exported for --self-test AND for a future require() in a test file
  // ... main()/self-test dispatch ...
}
```

## Shared Patterns

### Fail-open Stop-hook contract
**Source:** `.claude/hooks/jira-milestone-gate.cjs:24-28,94`
**Apply to:** `.claude/hooks/bundle-trigger-gate.cjs` (the entire file)
```javascript
function allow(){ process.exit(0); }
function block(reason){ process.stdout.write(JSON.stringify({decision:'block',reason})); process.exit(0); }
...
try { main(); } catch { process.exit(0); }
```
Any parse/IO error or missing file → `exit 0` (allow). Never emit `exit 2` or `{"continue":false}`.

### STATE.md frontmatter parsing
**Source:** `.claude/hooks/jira-milestone-gate.cjs:37-39`
**Apply to:** `.claude/hooks/bundle-trigger-gate.cjs`
```javascript
const fmMatch = stateText.match(/^---\s*([\s\S]*?)\s*---/);
const fm = fmMatch ? fmMatch[1] : stateText;
const grab=(re,src=fm)=>{ const m=src.match(re); return m?m[1].trim().replace(/^["']|["']$/g,''):null; };
```
Do not reimplement — copy verbatim so both hooks parse STATE.md identically.

### `completeSignal` computation
**Source:** `.claude/hooks/jira-milestone-gate.cjs:72`
**Apply to:** `.claude/hooks/bundle-trigger-gate.cjs`
```javascript
/milestone[_\s-]*complete|awaiting next milestone|shipped|archived/.test(status) && (percent===100 || (totalPhases>0 && completedPhases>=totalPhases))
```
Reuse the identical regex/logic — a "simpler" reimplementation risks the two Stop hooks disagreeing about when the milestone is complete on the same turn.

### Zero-npm Node built-ins only
**Source:** repo-wide convention (`scripts/pipeline/*.mjs`, `.claude/hooks/*.cjs`)
**Apply to:** all four files in scope
No new dependencies anywhere in this phase — `node:fs`, `node:path`, `node:child_process` only.

### argv-array subprocess spawning (never shell-string interpolation)
**Source:** `scripts/pipeline/build-publish-bundle.mjs:202-217` (`resolvePandocBin`), CLAUDE.md Security Notes
**Apply to:** `.claude/hooks/bundle-trigger-gate.cjs` probes
```javascript
execFileSync('pandoc', ['--version'], { stdio: 'pipe', timeout: PROBE_TIMEOUT_MS });
```
Never build a `pwsh -Command "..."` string via concatenation of a STATE-derived value (the parsed `milestone:` field). Use `execFileSync(cmd, [argv...])` array form exclusively — matches the pipeline's `T-126-02-01` convention and closes the path-traversal / command-injection surface identified in RESEARCH.md's Security Domain table.

## No Analog Found

None — every file in scope has a strong analog (3 exact, 1 role-match transplant). The self-test harness for a `.claude/hooks/*.cjs` file is a first-of-its-kind pattern in this repo (no existing `.cjs` hook has one), but its structure is fully specified by transplanting the pipeline's proven `stAssert`/`stTry` convention plus a pure `computeDecision()` extraction — not a gap requiring RESEARCH.md fallback.

## Metadata

**Analog search scope:** `.claude/hooks/`, `.claude/settings.local.json`, `scripts/pipeline/build-publish-bundle.mjs`, `scripts/pipeline/convert.ps1` (referenced, not modified)
**Files scanned:** 3 read in full (`jira-milestone-gate.cjs` 95 lines, `settings.local.json` 23 lines), 1 read in targeted non-overlapping ranges (`build-publish-bundle.mjs`: lines 1-60, 195-239, 440-519, 613-632 — ~180 of ~633 lines, sufficient for all D-05/self-test excerpts; full audit trail already exhaustively verified in 127-RESEARCH.md via grep)
**Pattern extraction date:** 2026-07-10
