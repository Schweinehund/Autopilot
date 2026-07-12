# Phase 127: Automated Milestone-Completion Trigger - Research

**Researched:** 2026-07-10
**Domain:** Claude Code Stop-hook mechanics + Node.js/PowerShell subprocess orchestration (Windows)
**Confidence:** HIGH

## Summary

All architectural decisions for this phase are locked in `127-CONTEXT.md` (D-01..D-05, resolved via `/adversarial-review`). This research does not re-open them — it verifies the *implementation mechanics* needed to execute them: the exact Claude Code Stop-hook stdin/stdout contract, how two Stop hooks coexist in `settings.local.json`, the empirically-observed STATE.md close-transition sequence (verified against actual v1.16 close commits, not assumed), the full set of `ZIP_NAME`/version references in `build-publish-bundle.mjs` that D-05 must parameterize, and a concrete, budget-safe design for the prerequisite probe.

The single most consequential mechanical finding: **`build-publish-bundle.mjs` is ESM (`.mjs`) and the hooks directory is CommonJS (`.cjs`)** — `require()` cannot load it. Any reuse of pipeline internals (e.g. `preflightCheck`/`resolvePandocBin`, which are *not currently exported*) from the new hook requires either `await import()` (async, adds latency/complexity inside a 15s-ceiling synchronous-feeling hook) or spawning `node build-publish-bundle.mjs <flag>` as a subprocess. Given the "lightest reliable probe" instruction in CONTEXT's Claude's Discretion section, this research recommends a **third, simpler option**: a small self-contained probe duplicated directly in the new `.cjs` hook (two `execFileSync` version-checks, mirroring `resolvePandocBin`'s PATH-then-`%LOCALAPPDATA%` fallback logic exactly), with tight per-probe timeouts. This avoids ESM/CJS interop entirely and keeps the hook dependency-free, matching `jira-milestone-gate.cjs`'s self-contained style.

The second key finding, verified empirically against this repo's own v1.16 close commit history (not assumed): the "observable Stop window" for the complete-signal is **narrower** than "before milestone: bumps" — `status:` transitions `shipped` → `completed` (archive step) *before* `milestone:` itself is bumped to the next version, and the jira hook's `completeSignal` regex does **not** match the bare word `completed` (it requires `milestone[_\s-]*complete`, `shipped`, `archived`, or `awaiting next milestone`). So the actual firing window is bounded by the `shipped`→`completed` transition, which in the observed v1.16 close spanned exactly 2 commits (2 Stop turns), not the full multi-commit gap until the version number changes.

**Primary recommendation:** Clone `jira-milestone-gate.cjs`'s skeleton verbatim (stdin parse, `stop_hook_active` guard, `grab()`/`allow()`/`block()`, fail-open wrapper). Add a self-contained, short-timeout prerequisite probe (no cross-module import). Reuse the *exact same* `completeSignal` regex/logic as the Jira hook but gate on `mStatus` via **D-04's read-only zip-existence check** instead of a mapping.json entry. Extend `build-publish-bundle.mjs` with a `--version=vX.Y[.Z]` CLI flag (or `ZIP_VERSION` env var) that overrides the hardcoded `ZIP_NAME`, following the existing `--self-test` argv-flag convention — there are only 3 references to parameterize (comment, const, one usage site).

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Milestone-close detection | Claude Code hook layer (`.claude/hooks/*.cjs`, Stop event) | — | Only the Stop-hook layer has a synchronous, no-manual-step observation point into STATE.md at end-of-turn; already the pattern for the Jira gate |
| Prerequisite probing (pandoc/pwsh) | Hook layer (cheap subprocess spawn) | Pipeline layer (`preflightCheck()` — authoritative, run again inside the real batch) | The hook's probe is advisory/fast (budget-constrained); the pipeline's own `preflightCheck()` remains the authoritative fail-closed gate when the agent actually runs the batch — duplication here is intentional defense-in-depth, not redundancy to eliminate |
| Batch conversion + bundling | Node/PowerShell pipeline (`scripts/pipeline/build-publish-bundle.mjs` + `convert.ps1`) | — | Already built (Phase 126), out of scope to modify except the D-05 version parameterization |
| Version derivation | Hook layer (reads STATE `milestone:`) | Pipeline layer (accepts derived version via new CLI flag/env var) | The hook is the only place that reads STATE; the pipeline must not read STATE itself (keeps it a pure batch tool invocable standalone with an explicit version) |
| Idempotency state | Filesystem (`dist/docs-library-vX.Y.zip` existence) | — | D-04: read-only, no new tracked/gitignored state artifact |

## User Constraints (from CONTEXT.md)

<user_constraints>

### Locked Decisions

**D-01 (Trigger mechanism):** A new Stop-hook, sibling to `.claude/hooks/jira-milestone-gate.cjs`, that reads `.planning/STATE.md` and reacts on the milestone-complete transition. Activation lives in gitignored `.claude/settings.local.json` (takes effect only on Claude Code restart), the gate itself is committed. Rejected: git post-tag hook (no `post-tag` hook exists; `.git/hooks/` not cloned/committed; tag discipline unreliable — `v1.6` tag missing, `v1.4.1` is 3-part; synchronous commit-hook run would hang git). Rejected: folding into close-gate phase (misses the `.claude/hooks/` + `settings.local.json` shape; couples multi-minute run into the close commit).

**D-02 (Execution model):** The hook does **not** run the pipeline itself. It emits a `block(reason)` nudge telling the agent to run `node scripts/pipeline/build-publish-bundle.mjs` in the foreground (no timeout ceiling there). Rejected: detached background process (Windows job-object-killed at ~15s → partial batch, no zip, no signal). Rejected: inline-in-hook (the Stop hook's `timeout: 15` cannot host the multi-minute, 221-doc pandoc batch — the load-bearing constraint of the whole phase).

**D-03 (Degradation & visibility):** `block(reason)` is the only visible channel from a Stop hook — a non-blocking `allow()` is silent (`exit 0`, stdout discarded). The hook cheaply probes prerequisites (pandoc/pwsh/Node) **before** nudging. If any is absent, it degrades to a warn-and-allow `block(reason)` that explicitly states the close is NOT blocked. Every pipeline `exit 1` must be treated as skip-not-block (not just "pandoc missing"): `preflightCheck()` exits 1 on absent pwsh OR pandoc, and `convert.ps1` exits 1 on wrong pandoc version too. Fail-open always (mirror the Jira gate's `try{main()}catch{exit(0)}`). Rejected: silent skip (operator would believe the bundle regenerated when it silently didn't).

**D-04 (Idempotency guard):** Read-only `dist/docs-library-v<version>.zip` existence check — no state writes, no new artifact. Combined with the `stop_hook_active` guard, this prevents re-firing the multi-minute batch on every Stop after close. Rejected: STATE field (a hook writing STATE breaks the read-only contract and races the close-gate's single STATE-editing commit — CRITICAL). Rejected: marker file (tracked dirties the close-gate commit / frozen-surface invariant; gitignored is lost on clone — no advantage over D-04).

**D-05 (Version derivation):** `ZIP_NAME` is currently hardcoded `'docs-library-v1.17.zip'` (`build-publish-bundle.mjs:43`), correct for v1.17 but silently wrong for v1.18+. Parameterize it (env var or CLI flag) to accept/derive the version; the trigger derives `vX.Y` from STATE `milestone:` (the Jira hook already parses this: `grab(/^milestone:\s*(.+)$/m)`, validated `^v?\d+\.\d+`). Must handle 3-part versions (`v1.4.1`). This makes both the auto-trigger output name and the D-04 idempotency filename correct for every future milestone.

### Claude's Discretion

- Exact prerequisite-probe implementation (cheap `--version` spawn vs. reusing the pipeline's own `preflightCheck` in a dry-run mode) — planner/researcher to choose the lightest reliable probe that fits inside the 15s budget. **Research recommendation below: self-contained inline probe, not a subprocess reuse of the pipeline (see ESM/CJS finding in Summary).**
- Exact `block(reason)` wording for both the nudge and the degraded warn.
- Whether ZIP_NAME parameterization is an env var vs. a `--version`/`--out` CLI flag — pick the one most consistent with the existing `--self-test` argv convention. **Research recommendation: `--version=vX.Y[.Z]` CLI flag, argv-parsed like `--self-test`.**

### Deferred Ideas (OUT OF SCOPE)

- **Non-interactive / CI-driven close automation** — B1's nudge only works when a live agent session is driving the close. A fully headless close (tag/CI with no agent) would need a different runner. Out of scope for HOOK-01; note for a future phase if headless closes become a requirement.
- **Backfilling the auto-trigger for already-shipped milestones (v1.0–v1.16)** — out of scope; forward-looking from v1.17's close onward.
- **Concurrency-hardening the pipeline's shared staging dir** (`rmSync` at `build-publish-bundle.mjs:359`) — the D-04 single-fire guard makes overlapping runs unlikely in the trigger path; a general lock is a separate pipeline-hardening concern.

</user_constraints>

## Phase Requirements

<phase_requirements>

| ID | Description | Research Support |
|----|-------------|------------------|
| HOOK-01 | The publish bundle regenerates automatically at milestone completion with no manual step — closing a milestone produces/refreshes `docs-library-vX.Y.zip` (invoking the PUB pipeline). Mechanism must degrade gracefully when prerequisites (pandoc, Node) are absent and must not block or corrupt the milestone-close flow. Mirrors the existing Jira hook pattern. | Stop-hook JSON contract verified (Environment/Code Examples sections); empirical STATE.md close-transition sequence verified against v1.16 git history (Common Pitfalls #1); ZIP_NAME parameterization sites fully enumerated (Code Examples); graceful-degradation probe design specified (Architecture Patterns, Pattern 2) |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

The repo's root `CLAUDE.md` describes a **different sub-project** (a "Windows Autopilot Troubleshooter & Improvement Suite" — PowerShell/FastAPI/React three-tier diagnostic toolkit) than the one actually being worked on in this milestone (`project_title` from init: "Windows Autopilot & macOS Provisioning Documentation Suite" — a docs-publishing pipeline). None of CLAUDE.md's PowerShell-module/FastAPI/React sections apply to this phase's `.claude/hooks/*.cjs` + `scripts/pipeline/*.mjs` work. The only CLAUDE.md directives with any bearing here:

- **Security Notes → "Validate all user inputs in API endpoints"** — analog for this phase: the hook must not shell-interpolate untrusted strings (STATE.md `milestone:` value) into a command string; use `execFileSync` with an argv array (already the established pattern in `build-publish-bundle.mjs`), never string-concatenated `pwsh -Command "..."` built from the parsed version.
- **Error Handling → "Use try-catch...for non-critical operations"** — directly consistent with D-03's fail-open (`try{main()}catch{exit(0)}`) requirement; no conflict.
- No CLAUDE.md directive contradicts any locked D-01..D-05 decision.

## Standard Stack

No new external dependencies. This phase is Node.js built-ins (`node:fs`, `node:path`, `node:child_process`) plus the existing `pwsh`/`pandoc` toolchain already required by Phase 126. Per CONTEXT's "Zero-npm Node built-ins only" established pattern (`code_context` section) and the "Established Patterns" note, no npm packages are introduced.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-ins (`fs`, `path`, `child_process`) | Node runtime as installed (`node --version` confirmed present — see Environment Availability) | STATE.md parse, zip-existence check, prerequisite probe spawns | Matches `jira-milestone-gate.cjs` and `build-publish-bundle.mjs` conventions exactly; zero install/audit surface |

### Supporting

None — no supporting libraries needed.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Self-contained inline prerequisite probe in the `.cjs` hook | `await import('../scripts/pipeline/build-publish-bundle.mjs')` and call an exported preflight function | Requires converting the hook's `main()` to `async`, and exporting `preflightCheck`/`resolvePandocBin` from the `.mjs` file (currently unexported). Avoids duplicating ~15 lines of probe logic but adds ESM/CJS interop surface and asynchronous control flow to an otherwise fully synchronous hook. Not recommended — the duplicated logic is small and stable. |
| Self-contained inline probe | Spawn `node scripts/pipeline/build-publish-bundle.mjs --preflight-only` as a subprocess (new flag) and check its exit code | Reuses the pipeline's actual `preflightCheck()` verbatim (guaranteed agreement with what the real batch run will see) at the cost of a nested Node process start (~100-300ms) plus two more subprocess spawns underneath it, and requires adding yet another argv flag to the pipeline. Viable second choice if the planner wants single-source-of-truth prereq logic over probe simplicity. |

**Installation:** N/A — no new packages.

**Version verification:** `node --version`, `pwsh -Command '$PSVersionTable.PSVersion'`, and `pandoc --version` were probed in this environment (see Environment Availability). Node.js and PowerShell 7 confirmed present; pandoc is installed at `%LOCALAPPDATA%\Pandoc\pandoc.exe` and was proven working end-to-end by Phase 126's actual output artifact (`dist/docs-library-v1.17.zip`, 3.7MB, present in the working tree — gitignored, produced by a real pipeline run).

## Package Legitimacy Audit

**N/A — this phase installs no external packages.** Both the hook (`.cjs`) and the pipeline extension (`.mjs` edit) use Node.js built-ins only, per the project's established zero-npm-dependency convention for `scripts/pipeline/` and `.claude/hooks/`. No `slopcheck`/registry verification required.

## Architecture Patterns

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  Claude Code agent turn ends (any turn, not just close-gate turns)   │
└───────────────────────────────┬───────────────────────────────────┘
                                 │ Stop event fires
                                 ▼
              ┌──────────────────────────────────────┐
              │  BOTH Stop hooks run in PARALLEL       │
              │  (settings.local.json hooks.Stop[])    │
              └───────────┬────────────────┬──────────┘
                           │                │
             ┌─────────────▼───┐   ┌────────▼──────────────────┐
             │ jira-milestone-  │   │ NEW: bundle-trigger-       │
             │ gate.cjs         │   │ gate.cjs (this phase)      │
             │ (unchanged)      │   │                            │
             └──────────────────┘   └────────────┬───────────────┘
                                                   │
                                    stdin: {stop_hook_active, cwd, ...}
                                                   │
                                     stop_hook_active===true? ──yes──▶ allow() [exit 0]
                                                   │ no
                                                   ▼
                                     read .planning/STATE.md frontmatter
                                                   │
                                     parse milestone: / status: / percent /
                                     completed_phases (same grab() regex as
                                     jira-milestone-gate.cjs)
                                                   │
                                     completeSignal? (same regex/logic as
                                     jira hook: shipped|archived|milestone
                                     complete|awaiting next milestone, AND
                                     percent===100 or completed>=total)
                                                   │
                                    no ──▶ allow() [exit 0, silent]
                                                   │ yes
                                                   ▼
                                     derive zipName = `docs-library-
                                     ${normalizeV(milestone)}.zip`
                                                   │
                                     dist/<zipName> exists? (D-04, read-only)
                                                   │
                                    yes ──▶ allow() [exit 0, silent — already built]
                                                   │ no
                                                   ▼
                                     probe pandoc + pwsh presence (cheap,
                                     short-timeout execFileSync --version)
                                                   │
                              ┌────────────────────┴────────────────────┐
                              │ all present                 any missing │
                              ▼                                         ▼
                block(reason): "nudge" — run          block(reason): "warn" — degraded,
                `node scripts/pipeline/                explicitly states close is NOT
                build-publish-bundle.mjs               blocked, prerequisite X missing,
                --version=<milestone>` in               operator must run pipeline manually
                the foreground now                      once <tool> is installed
                              │                                         │
                              └────────────────────┬────────────────────┘
                                                    ▼
                                     Claude Code shows `reason` to agent,
                                     conversation continues (does not stop)
```

### Recommended Project Structure

```
.claude/hooks/
├── jira-milestone-gate.cjs        # existing, unchanged
└── bundle-trigger-gate.cjs        # NEW — this phase's Stop hook (naming: planner's discretion,
                                    #        e.g. bundle-trigger-gate.cjs or publish-bundle-gate.cjs)

.claude/settings.local.json        # EDIT: add a second entry to hooks.Stop[] array (gitignored)

scripts/pipeline/
└── build-publish-bundle.mjs       # EDIT: parameterize ZIP_NAME (D-05) — 3 reference sites only
```

### Pattern 1: Stop-hook stdin/stdout contract (Claude Code, verified via official docs)

**What:** The `Stop` event fires when Claude finishes responding, before the turn ends. Hooks configured under this event receive a JSON object on stdin and control turn continuation via stdout JSON + exit code.

**stdin shape** (confirmed via `code.claude.com/docs/en/hooks`):
```json
{
  "session_id": "abc123",
  "prompt_id": "550e8400-...",
  "transcript_path": "/home/user/.claude/projects/.../transcript.jsonl",
  "cwd": "/home/user/my-project",
  "permission_mode": "default",
  "hook_event_name": "Stop",
  "last_assistant_message": "I've completed the implementation...",
  "stop_hook_active": false
}
```
`Stop` hooks do **not** support matchers — every configured `Stop` hook fires on every Stop event, unconditionally (no filtering by tool/file).

**stdout/exit-code contract:**
| Exit Code | Behavior |
|-----------|----------|
| `0` | stdout parsed as JSON. `{"decision":"block","reason":"..."}` → Claude continues, sees `reason`. Anything else (or no JSON) → Claude stops normally. |
| `2` | Blocking error — stdout/JSON ignored, stderr fed to Claude as the block reason. |
| other | Non-blocking error — first line of stderr shown in transcript; Claude still stops. |

This exactly matches `jira-milestone-gate.cjs`'s existing `allow()`/`block()` helpers:
```javascript
// Source: .claude/hooks/jira-milestone-gate.cjs:24-25 (VERIFIED: existing codebase file)
function allow(){ process.exit(0); }
function block(reason){ process.stdout.write(JSON.stringify({decision:'block',reason})); process.exit(0); }
```
Note both helpers exit **0** — `block()` still exits 0 and relies on the JSON `decision` field, not exit code 2. This is the correct, already-proven pattern; the new hook should reuse it verbatim. `[CITED: code.claude.com/docs/en/hooks]`

### Pattern 2: Two Stop hooks coexisting (VERIFIED via official docs)

**What:** Multiple `Stop` hook entries in `settings.local.json`'s `hooks.Stop[]` array all run **in parallel** on every Stop event. Resolution logic when they disagree:
- If **any** hook returns `{"decision":"block"}`, Claude continues and is shown **all** blocking hooks' `reason` fields (the exact combination format is not pinned down further in official docs, but multiple blocking reasons are all surfaced — not silently dropped).
- If **any** hook exits 2, that takes precedence for the error-continuation path.
- If **any** hook returns `{"continue": false}`, the whole session stops — takes precedence over everything else. **Neither existing hook nor the new one should ever emit `continue:false`** — this is a hard requirement inherited from D-03 ("must not block or corrupt the milestone-close flow").
- If all hooks allow (exit 0, no blocking JSON), Claude stops normally.

**Practical consequence for this phase:** the Jira hook and the new bundle hook are fully independent — each reads STATE.md separately, computes its own decision, and neither hook's `reason` needs to reference the other. If both fire a `block(reason)` on the same close-gate turn (plausible: Jira hook's `complete` nudge AND the bundle hook's build nudge could both trigger off the same `status:shipped` STATE), the agent will see **both** reasons and should act on both — this is expected and safe, not a conflict. `[CITED: code.claude.com/docs/en/hooks]`

**settings.local.json shape to add** (confirmed against current file content):
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
Each `Stop[]` array entry is its own `HookMatcher` object with a nested `hooks[]` array — the existing single entry should NOT be edited in place; add a **second sibling entry**, matching the existing file's exact structure (`.claude/settings.local.json`, read directly — VERIFIED). `timeout: 15` is a **per-hook-process** ceiling, not shared across the two hooks (they run in parallel, each gets its own 15s).

### Pattern 3: Prerequisite probe within the 15s budget (RECOMMENDED design)

**What:** Duplicate `resolvePandocBin`'s PATH-then-`%LOCALAPPDATA%` fallback logic and a bare `pwsh --version`-equivalent check directly in the new hook, with **tight timeouts** independent of the pipeline's own (10s-per-call) `preflightCheck()` timeouts — the hook's total budget is 15s for the *entire* process (stdin read + STATE parse + fs check + both probes + stdout write), so two 10s-timeout probes run sequentially could theoretically consume 20s and blow the budget on a genuinely hung binary. Node presence needs **no probe at all**: the hook is itself invoked via `node "...hookfile.cjs"` by Claude Code (per `settings.local.json`'s `command` field) — if Node were absent, the hook process could never have started, and the whole check is silently moot (this degrades gracefully by construction, not by explicit logic).

```javascript
// Source: pattern adapted from build-publish-bundle.mjs:202-217 (VERIFIED: existing codebase file),
// with a tightened timeout for the 15s hook budget (was 10000ms per call there).
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
    return true; // non-ENOENT error (e.g. wrong version banner) still means the binary exists;
                 // the pipeline's own preflightCheck/convert.ps1 version guard is authoritative
                 // for the actual version-pin check — this probe only answers "does it exist"
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

**Why not check pandoc's *version*, only presence:** `convert.ps1`'s own version guard (pinned `3.7.0.2`, exits 1 on mismatch) is the authoritative gate — CONTEXT's D-03 explicitly says "every pipeline `exit 1` must be treated as skip-not-block, **not just 'pandoc missing'**." Re-implementing the version-pin check in the hook would duplicate logic that's already fail-closed at the pipeline layer and could drift out of sync with `convert.ps1`'s `$expectedVer`. The hook's probe only needs to answer "is there a plausible reason the nudge would immediately fail" (binary absent) — a wrong-version pandoc still gets the "nudge" path, and the operator sees the pipeline's own clear version-mismatch error when they run it, which is the correct fail-closed behavior at the correct layer.

### Anti-Patterns to Avoid

- **Writing to STATE.md from the hook:** explicitly rejected as D2 in CONTEXT (races the close-gate's single STATE-editing commit — CRITICAL). The new hook must be as read-only as `jira-milestone-gate.cjs` (which never writes STATE either — it only ever nudges the agent to invoke the `jira-milestone` *skill*, which does the mutation).
- **Shell-string command construction:** never build a `pwsh -Command "..."` string via `+`/template-literal interpolation of the parsed `milestone:` value or any STATE-derived string — use `execFileSync` with an argv array (matches `T-126-02-01`'s established convention in `build-publish-bundle.mjs`) to avoid injection if STATE.md is ever hand-edited with unexpected characters.
- **Using `exit 2` instead of the JSON `decision` field:** exit 2 discards stdout/JSON and feeds raw stderr to Claude — less structured than the `{"decision":"block","reason":...}` pattern the Jira hook already uses successfully. Stay consistent.
- **Sequential probe timeouts that sum close to or over the 15s hook ceiling:** the pipeline's own `preflightCheck()` uses 10000ms per subprocess call, appropriate for its unconstrained context — do NOT reuse that constant verbatim inside the hook; use a materially tighter timeout (this research suggests ≤4000ms per probe).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| STATE.md frontmatter parsing | A new YAML/regex parser | The exact `grab()` closure + frontmatter-boundary regex from `jira-milestone-gate.cjs:37-39` | Already proven against this repo's real STATE.md across 17 milestones; re-deriving risks a subtly different regex (e.g. different quote-stripping) that silently diverges from the Jira hook's parse of the same file |
| `completeSignal` computation | A new "is milestone done" heuristic | The identical regex/logic from `jira-milestone-gate.cjs:72`: `/milestone[_\s-]*complete\|awaiting next milestone\|shipped\|archived/.test(status) && (percent===100 \|\| (totalPhases>0 && completedPhases>=totalPhases))` | This exact logic is empirically verified against the actual v1.16 close-transition STATE.md history in this session (see Common Pitfalls #1) — a "simpler" independent reimplementation risks disagreeing with the Jira hook about when the milestone is complete, causing one hook to fire and the other not to, or vice versa, on the same turn |
| Pandoc binary resolution | A new "where is pandoc" search | `resolvePandocBin()`'s PATH-then-`%LOCALAPPDATA%\Pandoc\pandoc.exe` fallback logic (`build-publish-bundle.mjs:202-217`) | This exact two-step resolution is what the pipeline itself uses when it actually runs — the hook's probe must agree with it or it will nudge when the pipeline would have failed preflight anyway (false positive) |
| Zip archive creation | Any new archiving code | N/A — the hook never zips anything; it only checks `dist/<zipName>` existence with `fs.existsSync` | D-04 is explicitly a read-only check; zipping remains entirely `build-publish-bundle.mjs`'s job via `Compress-Archive` |

**Key insight:** every piece of "don't hand-roll" logic here already exists once in this codebase (Jira hook's STATE parser/completeSignal, or the pipeline's pandoc resolution) — the entire implementation surface of this phase is small precisely because it's mostly cloning two already-proven patterns and adding one new, tightly-scoped read (`dist/` existence check) plus one new CLI flag.

## Common Pitfalls

### Pitfall 1: The complete-signal window is narrower than "before milestone: bumps" — VERIFIED against actual v1.16 close history

**What goes wrong:** Assuming the hook has a wide, multi-commit window to fire (from the close-gate commit all the way until `/gsd-start-milestone` bumps `milestone:` to the next version) leads to under-designing the graceful-degradation path, on the theory that "there's plenty of time, the operator can retry."

**Why it happens:** CONTEXT.md's own wording ("confirmed by the working Jira `complete` nudge... the milestone-complete Stop is observably fired before `/gsd-complete-milestone` bumps `milestone:`") is true but imprecise about *how much* before. This research walked the actual v1.16 STATE.md history via `git show <sha>:.planning/STATE.md` across the real close commits:

| Commit | `milestone:` | `status:` | `completeSignal` (Jira regex) |
|--------|--------------|-----------|-------------------------------|
| `3dd2512` (close-gate) | v1.16 | `shipped` | **TRUE** (percent=100) |
| `9754629` (close-gate plan tracking) | v1.16 | `shipped` | **TRUE** |
| `e0d381a` (archive step) | v1.16 | `completed` | **FALSE** — `completed` alone does not match `/milestone[_\s-]*complete\|shipped\|archived\|awaiting next milestone/` |
| `9608c9a` (start v1.17) | v1.17 | `planning` | FALSE (different milestone, not a complete signal) |

The signal window is therefore bounded by the `shipped`→`completed` transition (the archive step), which happened **2 commits/Stop-turns** after the close-gate commit — not by the much-later milestone-number bump (which happened 2 commits after *that*).

**How to avoid:** Design the hook assuming it may only get 1-2 Stop turns to fire before the window closes. This is exactly why D-04's zip-existence idempotency check matters (fires cleanly on turn 1) and why the graceful-degradation "warn, don't block" behavior (D-03) is correct as designed — if the window closes before prerequisites become available, the automatic path simply never completes for that milestone and the operator falls back to the documented manual invocation. This is expected behavior per the phase's own deferred-scope note ("headless close is out of scope"), not a defect to engineer around.

**Warning signs:** If a future STATE.md close-transition sequence ever skips straight from `shipped` to a `milestone:` bump without an intermediate `status: completed` archive commit, the window could be even narrower (0 extra turns) or could vanish if `status:` is set directly by a single atomic close-gate+archive commit in some future workflow revision — the hook's design (fire on `completeSignal===true`, gate re-fire only via D-04's read-only zip check) is robust to that variation without any code change, since it re-evaluates from scratch on every Stop.

### Pitfall 2: `build-publish-bundle.mjs` is ESM; the hooks directory is CommonJS

**What goes wrong:** Attempting `require('../scripts/pipeline/build-publish-bundle.mjs')` from the new `.cjs` hook throws `ERR_REQUIRE_ESM` immediately — Node's CommonJS `require()` cannot load an ES module synchronously.

**Why it happens:** `build-publish-bundle.mjs` uses `import`/`export` syntax and has an `.mjs` extension (always ESM regardless of the root `package.json`'s missing `"type"` field, which defaults CJS for `.js`/`.cjs` files but has no effect on `.mjs`). `jira-milestone-gate.cjs` uses `require()`/`module.exports` and has a `.cjs` extension (always CJS). These are two incompatible module systems in the same repo by design (VERIFIED: root `package.json` has no `"type"` field; `scripts/pipeline/*.mjs` files use `import`; `.claude/hooks/*.cjs` files use `require`).

**How to avoid:** Do not attempt static/synchronous cross-module reuse between the new hook and the pipeline. Either (a) duplicate the small, stable probe logic inline in the `.cjs` hook (recommended — see Pattern 3), or (b) if the planner prefers single-source-of-truth prereq logic, use `await import()` inside an `async function main()` — which is legal Node.js (dynamic `import()` works from CJS), but changes the hook's control flow from fully synchronous to promise-based and needs its own top-level `.catch()` to preserve the fail-open guarantee.

**Warning signs:** `ERR_REQUIRE_ESM` in the hook's stderr (which Claude Code would show only as a generic non-blocking-error transcript line per the exit-code-other row of the Stop contract — the agent would NOT see a helpful reason, defeating D-03's visibility requirement). Test this specific failure mode manually (`node .claude/hooks/<name>.cjs < fixture.json`) before relying on the Stop-hook harness alone to catch it.

### Pitfall 3: `dist/` is gitignored — the idempotency check target won't exist on a fresh clone

**What goes wrong:** Assuming `dist/docs-library-vX.Y.zip`'s absence always means "not yet built this run" — on a fresh clone (or after `dist/` is manually cleared), the zip is legitimately absent even for an *already-shipped* milestone, because `dist/` is gitignored (VERIFIED: `.gitignore` contains `dist/`).

**Why it happens:** This is explicitly acceptable per CONTEXT's own framing of the sibling Jira hook: "the hook is inactive on a fresh clone — acceptable and shared with the Jira hook, per SC#2." The same tradeoff applies here: on a fresh clone, `settings.local.json` itself is also gitignored and absent, so the hook wouldn't even be *registered* until a maintainer restores it and restarts Claude Code — by which point re-running the pipeline once for a past milestone (if its `status:`/`milestone:` still happens to satisfy `completeSignal`, which is unlikely long after a real close) is harmless, not a bug.

**How to avoid:** No code change needed — just don't design the idempotency logic to require any additional "have I built successfully before" state beyond the zip's existence; the gitignored nature of both `dist/` and `settings.local.json` is a consistent, already-accepted tradeoff in this codebase, not a new risk introduced by this phase.

### Pitfall 4: Parallel Stop hooks both blocking on the same turn is not a conflict — but the `reason` text should be self-contained

**What goes wrong:** Writing the new hook's `block(reason)` text assuming the agent has *just* seen the Jira hook's `reason` (e.g., referencing "the epic" or assuming shared context) — if the Jira hook happens to `allow()` on a given turn while the bundle hook `block()`s (or vice versa), a reason that assumes the other hook's output was also shown will read confusingly.

**Why it happens:** The two hooks are fully independent processes with no shared state or ordering guarantee beyond "both run in parallel" (per Pattern 2). Their firing conditions (`completeSignal` for the bundle hook combined with the D-04 zip check; `completeSignal` combined with `mStatus!=='completed'` from `mapping.json` for the Jira hook) can diverge — e.g. the Jira epic might already be marked `completed` in `mapping.json` (Jira hook silent) while the zip has never been built (bundle hook fires), or vice versa.

**How to avoid:** Write the bundle hook's `reason` strings to be fully self-contained and actionable without assuming any other hook's output was shown in the same turn.

## Code Examples

### Complete `ZIP_NAME` / version reference audit for D-05 (VERIFIED: grep of entire `scripts/pipeline/` directory)

Exactly **3** references exist in `build-publish-bundle.mjs` — no other file in `scripts/pipeline/` (including `README.md`) references the zip filename or a hardcoded version string:

```javascript
// Source: scripts/pipeline/build-publish-bundle.mjs (VERIFIED via Grep, 3 total matches)
// Line 11 (comment, informational only, should be updated for clarity but not load-bearing):
// + a single versioned dist/docs-library-v1.17.zip. Any conversion/guard/parity/naming/

// Line 43 (the actual hardcode -- D-05's primary target):
const ZIP_NAME = 'docs-library-v1.17.zip';

// Line 452 (the only usage site):
const zipDest = join(distDirAbs, ZIP_NAME);
```

**Recommended parameterization** (argv flag, consistent with the existing `--self-test` convention at line 36):
```javascript
// Pattern: extend the existing argv parsing block (build-publish-bundle.mjs:35-37)
const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');
const versionArg = argv.find(a => a.startsWith('--version='));
const VERSION = versionArg ? versionArg.slice('--version='.length) : 'v1.17'; // fallback preserves current behavior if invoked with no flag
// Validate: must start with v<digit> and at least one dot, mirroring the Jira hook's
// milestone validation regex but ANCHORED as /^v?\d+\.\d+(\.\d+)?$/ (the trailing $ is required — an unanchored prefix-only form would admit a path-traversal sequence like v1.17/../../secrets) so a malformed --version never produces a
// silently-wrong or path-unsafe zip filename.
if (!/^v\d+\.\d+(\.\d+)?$/.test(VERSION)) {
  process.stderr.write('FATAL: --version must look like v1.17 or v1.4.1 (got: ' + VERSION + ')\n');
  process.exit(1);
}
const ZIP_NAME = `docs-library-${VERSION}.zip`;
```
This handles 3-part versions (`v1.4.1`) unchanged — the regex only requires *at least* `v<digits>.<digits>`, and the template literal passes the full string through verbatim, so `--version=v1.4.1` yields `docs-library-v1.4.1.zip` with no special-casing needed.

**Hook-side derivation** (mirrors `jira-milestone-gate.cjs`'s `grab()` pattern exactly):
```javascript
// Source: pattern lifted directly from .claude/hooks/jira-milestone-gate.cjs:37-46 (VERIFIED)
const fmMatch = stateText.match(/^---\s*([\s\S]*?)\s*---/);
const fm = fmMatch ? fmMatch[1] : stateText;
const grab=(re,src=fm)=>{ const m=src.match(re); return m?m[1].trim().replace(/^["']|["']$/g,''):null; };
const version = grab(/^milestone:\s*(.+)$/m);
if (!version || !/^v?\d+\.\d+(\.\d+)?$/.test(version)) allow(); // ANCHORED ($-terminated): rejects traversal-shaped values like v1.17/../../secrets before they reach the dist/<zipName> path
const normalizedVersion = version.startsWith('v') ? version : 'v' + version;
const zipName = `docs-library-${normalizedVersion}.zip`;
```

### Fail-open wrapper + `stop_hook_active` guard to reuse verbatim

```javascript
// Source: .claude/hooks/jira-milestone-gate.cjs:26-28,94 (VERIFIED: existing codebase file)
function main(){
  let input={}; try { input=JSON.parse(readStdin()||'{}'); } catch { input={}; }
  if (input.stop_hook_active===true) allow();
  const projectDir = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  // ... hook-specific logic ...
  allow();
}
try { main(); } catch { process.exit(0); }
```

## State of the Art

Not applicable in the usual "library API changed" sense — this is a small, self-contained mechanism built entirely from patterns already present and working in this exact repository (no external framework/library version drift to track). The one genuinely external fact verified this session is the Claude Code Stop-hook contract itself, confirmed current via the official docs fetch (`code.claude.com/docs/en/hooks`) rather than relying on training-data assumptions about hook behavior.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The exact `reason` text combination behavior when *multiple* Stop hooks all return `decision:block` on the same turn is not fully pinned down by official docs beyond "Claude sees all reason fields combined" | Architecture Patterns, Pattern 2 | Low — even in the worst case (only one reason shown, or reasons concatenated oddly), each hook's `reason` is written to be self-contained (Pitfall 4), so partial visibility degrades gracefully rather than causing incorrect behavior |
| A2 | `dist/docs-library-v1.17.zip` currently present in the working tree was produced by an actual Phase-126 pipeline run (not manually placed) | Standard Stack, version verification note | Low — this is corroborating evidence for "pandoc+pwsh work end-to-end in this environment," not a load-bearing claim for the phase's implementation; if wrong, the Environment Availability probe results (pwsh confirmed working directly) still stand independently |

**If this table is empty:** N/A — two low-risk assumptions logged above; both are corroborating/confidence-building rather than decision-driving. All D-01..D-05 mechanics claims in this document are `[VERIFIED]` (direct file reads, git history, or official Claude Code docs fetch) or `[CITED: code.claude.com/docs/en/hooks]`.

## Open Questions (RESOLVED)

1. **Exact hook filename**
   - What we know: CONTEXT.md refers to it generically as "a new Stop-hook, sibling to `.claude/hooks/jira-milestone-gate.cjs`" without naming it.
   - What's unclear: whether the planner should name it `bundle-trigger-gate.cjs`, `publish-bundle-gate.cjs`, or something else.
   - Recommendation: any name consistent with the `<noun>-gate.cjs` convention works; this research uses `bundle-trigger-gate.cjs` as a placeholder throughout — not a locked choice.
   - **RESOLVED:** `publish-bundle-gate.cjs` (locked in 127-02 Task 1, for parity with `jira-milestone-gate.cjs`).

2. **Env var vs. CLI flag for D-05's version override**
   - What we know: CONTEXT.md explicitly leaves this to discretion; this research recommends a `--version=vX.Y[.Z]` CLI flag for consistency with the existing `--self-test` argv convention (argv flags are already the pipeline's established idiom; no other `.mjs` in `scripts/pipeline/` reads `process.env` for configuration).
   - What's unclear: whether the planner might prefer an env var (`ZIP_VERSION`) instead, e.g. to avoid the agent needing to construct the exact flag string in its nudge-response command.
   - Recommendation: CLI flag, as the nudge's `block(reason)` text can simply state the exact full command (`node scripts/pipeline/build-publish-bundle.mjs --version=v1.17`) with the version already substituted in — no extra indirection needed either way.
   - **RESOLVED:** `--version=` CLI flag (locked in 127-01 Task 1).

3. **Self-test harness structure for the new hook (SC#3's mandatory dry-run test)**
   - What we know: the pipeline's `.mjs` scripts follow a `--self-test` argv convention with pure, exported, synthetic-input-driven assertion functions (`stAssert`/`stTry` pattern in `build-publish-bundle.mjs`). `jira-milestone-gate.cjs` itself has **no** self-test mode — it has never needed one before this phase.
   - What's unclear: whether the planner should introduce a `--self-test` mode for the new `.cjs` hook (first precedent of this kind for a `.claude/hooks/*.cjs` file), structured as pure `computeDecision({...})` helper functions separate from the stdin/fs I/O, exercised with synthetic STATE-fixture inputs covering: zip-exists / zip-missing × prereqs-present / prereqs-missing × `completeSignal` true/false × `stop_hook_active` true/false.
   - Recommendation: yes — extract the decision logic into a pure, exported function (mirrors `build-publish-bundle.mjs`'s already-proven pattern of pure functions tested via synthetic fixtures) and gate a `--self-test` branch behind `require.main === module` (the CJS equivalent of the `.mjs` files' `isMainModule` check), so `node .claude/hooks/bundle-trigger-gate.cjs --self-test` can be run standalone by a developer/CI without needing a live Claude Code Stop event. This directly satisfies SC#3's "prove the trigger does not block, fail, or corrupt the close when pandoc/pwsh/Node are absent" via synthetic prereq-presence fixtures rather than requiring an environment with actually-uninstalled tools.
   - **RESOLVED:** embedded `--self-test` branch gated behind `require.main === module`, exercising a pure exported `computeDecision()` over synthetic fixtures (locked in 127-02 Task 2).

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Hook execution itself (`node "...hookfile.cjs"`), pipeline orchestrator | ✓ | confirmed present (session `node --version` succeeded) | — (if absent, the hook process itself cannot start — degrades gracefully by construction, no explicit check needed) |
| PowerShell 7+ (`pwsh`) | `preflightCheck()`, `convert.ps1`, the hook's own probe | ✓ | Major version `7` confirmed via `$PSVersionTable.PSVersion.Major` | Probe reports absent → hook emits warn-and-allow `block(reason)` per D-03 |
| pandoc 3.7.0.2 (pinned) | `convert.ps1`'s version-guarded conversion | ✓ | Installed at `%LOCALAPPDATA%\Pandoc\pandoc.exe`; a direct `pandoc --version` invocation from the Git-Bash shell used for this research timed out (likely a Git-Bash/Windows-binary stdin-handling quirk, not a real absence — Phase 126's actual output artifact `dist/docs-library-v1.17.zip` proves the same binary converts successfully when invoked the way the pipeline invokes it, via `execFileSync`/`pwsh -File`) | Probe reports absent → hook emits warn-and-allow `block(reason)` per D-03 |
| `dist/` directory + `docs-library-v1.17.zip` | D-04's idempotency check target | ✓ (already present, 3.7MB, gitignored) | — | N/A — read-only existence check, no fallback needed |

**Missing dependencies with no fallback:** none — every dependency this phase touches already has an explicit graceful-degradation path per D-03 (warn-and-allow), which is itself the "fallback."

**Missing dependencies with fallback:** none observed missing in this environment; the fallback behavior (D-03's warn-and-allow) is exercised by design regardless of whether a real absence is ever hit in practice, and should be tested via synthetic fixtures per the Open Questions #3 recommendation (self-test harness) rather than by actually uninstalling pandoc/pwsh in this environment.

## Security Domain

`security_enforcement` is absent from `.planning/config.json` (workflow-scoped keys only: `research`, `_auto_chain_active`, `ui_safety_gate`, `ui_phase`, `use_worktrees`, `nyquist_validation`) — per protocol, absence means enabled. This phase has an unusually small attack surface: no network calls, no user-facing input, no authentication, no new external packages. The applicable ASVS categories are limited accordingly.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface — local hook, local filesystem only |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A — runs with the same local-user privileges as the Claude Code session itself |
| V5 Input Validation | Yes (narrow) | STATE.md's `milestone:` field is the only "external" input the hook parses. It must be validated with an ANCHORED `^v?\d+\.\d+(\.\d+)?$` (the trailing `$` is required to reject traversal sequences; mirrors 127-01's `deriveZipName`) before being used to construct either a filesystem path (`dist/docs-library-<version>.zip`) or a subprocess argv element (`--version=<version>` passed to the pipeline in the nudge text) |
| V6 Cryptography | No | N/A — no secrets, no crypto operations in this phase |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|----------------------|
| Command injection via STATE.md `milestone:` value flowing into a shell string | Tampering | Never build a shell command via string concatenation of the parsed version; use `execFileSync(cmd, [argv...])` array form throughout (matches `T-126-02-01`'s established convention) — this applies both to the hook's own probe calls and to any subprocess spawn added to `build-publish-bundle.mjs` for the new `--version=` flag (which itself only needs `argv` parsing, no subprocess spawn at all) |
| Path traversal via a malformed `milestone:` value producing a `dist/../../something.zip` existence check | Tampering / Information Disclosure | The version string must be gated by an ANCHORED `^v?\d+\.\d+(\.\d+)?$` regex (note the trailing `$`). The `$` terminator is what excludes `/`, `\`, and `..` sequences — an UNANCHORED `^v?\d+\.\d+` (as an earlier draft of this row wrongly claimed was sufficient) matches only the *prefix* and would admit `v1.17/../../secrets`, turning the read-only `dist/<version>.zip` existsSync into an arbitrary-file-existence oracle outside `dist/`. Use the same anchored form as 127-01's `deriveZipName`; the hook's self-test must assert a traversal-shaped milestone fails validation (resolves to `allow`) |
| A future, differently-configured Stop hook silently corrupting the close flow via `continue:false` | Tampering / Denial of Service | This phase's own hook must never emit `{"continue":false}` — verify this explicitly in the self-test harness (assert the hook's output never contains a `continue` key at all, since `false` "takes precedence over decision" per the official Stop-hook contract and would abort the entire session, directly violating D-03's "must not block or corrupt the milestone-close flow") |

## Sources

### Primary (HIGH confidence)
- `code.claude.com/docs/en/hooks` — Stop hook stdin/stdout schema, exit-code semantics, multiple-hooks-in-parallel resolution logic, `settings.json` hooks shape (fetched this session)
- `.claude/hooks/jira-milestone-gate.cjs` — read directly this session; the reference pattern to clone
- `.claude/settings.local.json` — read directly this session; the exact activation shape to extend
- `scripts/pipeline/build-publish-bundle.mjs` — read directly this session, including the full ZIP_NAME/version reference audit via Grep (3 matches, exhaustive)
- `scripts/pipeline/convert.ps1` — read directly this session; pandoc version-pin/exit-1 behavior
- `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, `.planning/phases/127-.../127-CONTEXT.md` — read directly this session
- `git show <sha>:.planning/STATE.md` across the actual v1.16 close commits (`3dd2512`, `9754629`, `e0d381a`, `9608c9a`) — empirical verification of the close-transition `status:` sequence, run this session

### Secondary (MEDIUM confidence)
- None — all findings were either verified directly against this repository's files/history or against the official Claude Code documentation.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new dependencies, all Node built-ins already in use elsewhere in this repo
- Architecture: HIGH — Stop-hook contract confirmed via official docs fetch this session; STATE.md close-transition timing confirmed via actual git history, not inferred
- Pitfalls: HIGH — all four pitfalls are either directly observed in this repo (ESM/CJS split, gitignored `dist/`, empirical close-window timing) or directly derivable from the verified Stop-hook contract (parallel-hook reason visibility)

**Research date:** 2026-07-10
**Valid until:** 30 days (stable domain — no fast-moving external dependencies; the Claude Code hooks contract is the only externally-sourced fact and is treated as stable documentation, not a fast-moving API)
