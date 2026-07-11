# Phase 127: Automated Milestone-Completion Trigger - Context

**Gathered:** 2026-07-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the **existing** Phase-126 publish-bundle pipeline (`scripts/pipeline/build-publish-bundle.mjs`) to fire **automatically at milestone close** — no manual operator step — so that closing a milestone produces/refreshes `dist/docs-library-vX.Y.zip`. The mechanism mirrors the existing Jira milestone Stop-hook pattern (a committed gate under `.claude/hooks/` + gitignored `settings.local.json` activation), degrades gracefully when its prerequisites (pandoc, pwsh, Node) are absent, and must **not block or corrupt** the milestone-close flow.

**In scope:** the trigger/detection hook; wiring it to invoke the already-green pipeline; graceful degradation; idempotency; and the small ZIP_NAME parameterization needed to emit the correct `vX.Y` name.
**Out of scope:** any change to the pipeline's conversion/guard logic (it is already green — reuse, don't re-derive); backfilling the trigger for past milestones.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via `/adversarial-review` (Finder → Adversary → Referee, 3 Opus agents). The four decisions **interlock into one coherent mechanism** — A1's constraints force B1, which forces C2 and D1. The full reasoning (43 flaws found, 5 disproved, surviving CRITICALs) is in `127-DISCUSSION-LOG.md`.

### D-01: Trigger mechanism → STATE-inspecting Stop-hook (option A1)
A **new Stop-hook, sibling to `.claude/hooks/jira-milestone-gate.cjs`**, that reads `.planning/STATE.md` and reacts on the milestone-complete transition. Activation lives in gitignored `.claude/settings.local.json` (takes effect only on Claude Code restart), the gate itself is committed.
- **Rejected A2 (git post-commit/post-tag hook):** git has **no `post-tag` hook** (technically infeasible as phrased); `.git/hooks/` is never cloned and not committed (worse portability); tag discipline is unreliable (**the `v1.6` tag is missing**; `v1.4.1` is a 3-part version); a synchronous run inside a commit hook hangs git, and a pre-hook `exit 1` would abort the close commit.
- **Rejected A3 (fold into the close-gate phase):** misses SC#2's required shape (under `.claude/hooks/` + `settings.local.json`, mirroring Jira) and the "no manual step" spirit; couples the multi-minute run into the single close-gate commit.

### D-02: Execution model → hook NUDGES the agent to run the pipeline in the foreground (option B1)
The hook does **not** run the pipeline itself. It emits a `block(reason)` nudge telling the agent to run `node scripts/pipeline/build-publish-bundle.mjs` in the foreground (where there is no timeout ceiling).
- **Rejected B2 (detached background process):** a hook-spawned detached child on this Windows-first repo is **job-object-killed at ~15s** → partial batch, no zip, no signal.
- **Rejected inline-in-hook:** the Stop hook's `timeout: 15` (`settings.local.json:9`) **cannot** synchronously host the multi-minute, 221-doc pandoc batch (A1-1, CRITICAL). This is the load-bearing constraint of the whole phase.

### D-03: Degradation & visibility → warn-and-allow via the `block(reason)` channel (option C2)
- The **only** visible channel from a Stop hook is `block(reason)` — a non-blocking `allow()` is a silent `exit 0` whose stdout Claude Code discards. So visibility and the D-02 nudge are unified over the same channel.
- The hook cheaply probes prerequisites (pandoc/pwsh/Node) **before** nudging. If any is absent, it degrades to a warn-and-allow `block(reason)` that **explicitly states the close is NOT blocked**.
- **Every pipeline `exit 1` must be treated as skip-not-block**, not just "pandoc missing": `preflightCheck()` (`build-publish-bundle.mjs:219-233`) exits 1 on absent pwsh OR pandoc, and `convert.ps1:52-55` exits 1 on **wrong** pandoc version too. Fail-open always (mirror the Jira gate's `try{main()}catch{exit(0)}`).
- **Rejected C1 (silent skip):** operator would ship the milestone believing the bundle regenerated when it silently didn't.

### D-04: Idempotency guard → read-only `dist/docs-library-v<version>.zip` existence check (option D1)
The hook stays silent when the versioned zip already exists — a purely **read-only** check that touches no state and needs no new artifact. Combined with the `stop_hook_active` guard (fires at most once per turn cascade), this prevents re-firing the multi-minute batch on every Stop after close.
- **Rejected D2 (STATE field):** a hook **writing** STATE breaks the read-only Jira-mirror contract AND **races the close-gate's single STATE-editing commit → can corrupt the close flow** (CRITICAL).
- **Rejected D3 (marker file):** tracked → dirties the single close-gate commit / frozen-surface invariant; gitignored → lost on clone (no cross-clone idempotency). No advantage over D1.

### D-05: Version derivation → derive `vX.Y` from STATE `milestone:`; parameterize the pipeline's hardcoded `ZIP_NAME` (folded into Phase 127)
`ZIP_NAME` is currently hardcoded `'docs-library-v1.17.zip'` (`build-publish-bundle.mjs:43`) with no CLI/env override — correct for the v1.17 close but silently wrong for v1.18+. Parameterize it (env var or CLI flag) to accept/derive the version, and have the trigger derive `vX.Y` from STATE `milestone:` (the Jira hook already parses this: `grab(/^milestone:\s*(.+)$/m)`, validated `^v?\d+\.\d+`). **Must handle 3-part versions** (`v1.4.1`). This makes both the auto-trigger output name and the D-04 idempotency filename correct for every future milestone.

### Claude's Discretion
- Exact prerequisite-probe implementation (cheap `--version` spawn vs. reusing the pipeline's own `preflightCheck` in a dry-run mode) — planner/researcher to choose the lightest reliable probe that fits inside the 15s budget.
- Exact `block(reason)` wording for both the nudge and the degraded warn.
- Whether ZIP_NAME parameterization is an env var vs. a `--version`/`--out` CLI flag — pick the one most consistent with the existing `--self-test` argv convention.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The pattern to mirror (trigger hook)
- `.claude/hooks/jira-milestone-gate.cjs` — the reference Stop-hook: fail-open (`try{main()}catch{exit(0)}`), `stop_hook_active` guard (line 28), reads STATE.md (`milestone:`/`status:`/`completed_phases`/`percent`) + ROADMAP.md, fires a `complete` nudge via `block(reason)` (line 79) on `completeSignal && mStatus!=='completed'`. **Strictly read-only on STATE** — never writes state, never does work itself. The new bundle hook is its sibling.
- `.claude/settings.local.json` — hook activation shape (gitignored). The existing Stop hook has `timeout: 15` — the hard ceiling that rules out inline pipeline execution.

### The pipeline to invoke (do not modify its conversion/guard logic)
- `scripts/pipeline/build-publish-bundle.mjs` — the Phase-126 orchestrator to auto-invoke. Note: `ZIP_NAME` hardcode at line ~43 (D-05 parameterizes this); `preflightCheck()` at ~219-233 (exits 1 on absent pwsh/pandoc); `rmSync` staging at ~359 (not concurrency-safe — another reason the D-04 idempotency + single-fire guard matter); only argv branch today is `--self-test` (line 36).
- `scripts/pipeline/convert.ps1` — per-doc pandoc wrapper; `exit 1` on missing OR wrong-version pandoc (pinned 3.7.0.2, lines 52-55).
- `scripts/pipeline/README.md` — pipeline usage/contract.

### State & requirement anchors
- `.planning/STATE.md` — tracked; source of `milestone:` (currently `v1.17`) and the close-transition `status:` signal the hook keys on.
- `.planning/ROADMAP.md` §"Phase 127" — Goal + SC#1-3 (SC#2 enumerates the three trigger-mechanism candidates resolved here).
- `.planning/REQUIREMENTS.md` — **HOOK-01** (the sole requirement for this phase).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`jira-milestone-gate.cjs`** — clone its skeleton wholesale: stdin parse, `stop_hook_active` early-allow, `allow()`/`block(reason)` helpers, STATE frontmatter `grab()` regex parser, `milestone:` extraction+validation, and the outer `try{main()}catch{exit(0)}` fail-open wrapper. The bundle hook differs only in *what transition it reacts to* and *what nudge it emits*.
- **`build-publish-bundle.mjs`** — invoked as-is via the nudge (`node scripts/pipeline/build-publish-bundle.mjs`); the only edit is the D-05 `ZIP_NAME` parameterization.

### Established Patterns
- **Fail-open Stop-hook contract:** any parse/IO error or missing file → `exit 0` (allow). Never block the turn. HOOK-01's "must not block/corrupt close" is satisfied by inheriting this exactly.
- **Committed gate + gitignored activation:** the `.cjs` is committed; `settings.local.json` is gitignored and requires a Claude Code restart to load. (Consequence: the hook is inactive on a fresh clone — acceptable and shared with the Jira hook, per SC#2.)
- **Zero-npm Node built-ins only** (`scripts/pipeline/*.mjs` + `.cjs` hooks) — no new dependencies.
- **`--self-test` argv convention** for the pipeline scripts — extend it for any new flag.

### Integration Points
- **STATE.md close transition** — the hook reads the same `milestone:`/`status:` fields the Jira gate reads; the milestone-complete Stop is observably fired *before* `/gsd-complete-milestone` bumps `milestone:` (confirmed by the working Jira `complete` nudge).
- **`dist/docs-library-v<version>.zip`** — the pipeline's output artifact doubles as the D-04 idempotency sentinel (read-only existence check).
- **Coexistence with the Jira Stop hook** — two Stop hooks will both evaluate each turn; keep the bundle hook's nudge condition tight so it fires at most once per close.

</code_context>

<specifics>
## Specific Ideas

- The winning design in one sentence: *a STATE-inspecting Stop-hook sibling to the Jira gate that, on the milestone-complete transition and only if the versioned zip is absent, nudges the agent (via `block(reason)`) to run the pipeline in the foreground — probing prerequisites first and warning-but-allowing when they're missing.*
- Absent-prerequisite / dry-run test (SC#3) is mandatory: prove the trigger does not block, fail, or corrupt the close when pandoc/pwsh/Node are absent.

</specifics>

<deferred>
## Deferred Ideas

- **Non-interactive / CI-driven close automation** — B1's nudge only works when a live agent session is driving the close. A fully headless close (tag/CI with no agent) would need a different runner. Out of scope for HOOK-01 (which targets the agent-driven GSD close flow); note for a future phase if headless closes become a requirement.
- **Backfilling the auto-trigger for already-shipped milestones (v1.0–v1.16)** — out of scope; the trigger is forward-looking from v1.17's close onward.
- **Concurrency-hardening the pipeline's shared staging dir** (`rmSync` at `build-publish-bundle.mjs:359`) — the D-04 single-fire guard makes overlapping runs unlikely in the trigger path; a general lock is a separate pipeline-hardening concern.

</deferred>

---

*Phase: 127-automated-milestone-completion-trigger*
*Context gathered: 2026-07-10*
