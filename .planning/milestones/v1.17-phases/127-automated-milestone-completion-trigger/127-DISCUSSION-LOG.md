# Phase 127: Automated Milestone-Completion Trigger - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-10
**Phase:** 127-automated-milestone-completion-trigger
**Areas discussed:** Trigger mechanism, Execution model, Degradation & visibility, Idempotency guard + version
**Method:** User requested `/adversarial-review` on every option set. A 3-Opus finder/adversary/referee panel evaluated all four decisions against the ground-truth files. Finder surfaced 43 flaws (6 CRITICAL); Adversary disproved 5; Referee ruled all 5 FALSE POSITIVE and delivered one coherent interlocking recommendation.

---

## Trigger mechanism (DECISION A)

| Option | Description | Selected |
|--------|-------------|----------|
| A1 — STATE-inspecting Stop-hook (mirror Jira gate) | New Stop hook sibling to jira-milestone-gate.cjs; committed gate + gitignored settings.local.json | ✓ |
| A2 — git post-commit/post-tag hook | Keyed on the 'MILESTONE CLOSE' commit or vX.Y tag | |
| A3 — fold invocation into the close-gate phase | An authored agent step in Phase 128 | |

**User's choice:** A1 (adversarial-review recommendation).
**Notes:** A2 killed by CRITICAL infeasibility — git has no `post-tag` hook; `.git/hooks/` is never cloned; tag discipline unreliable (`v1.6` tag missing, `v1.4.1` is 3-part); a synchronous run in a commit hook hangs git and a pre-hook exit 1 aborts the close commit. A3 misses SC#2's required implementation locus (`.claude/hooks/` + `settings.local.json`, mirror Jira) and the "no manual step" spirit. The Finder's "A2/A3 fail SC#2 as written" was ruled a FALSE POSITIVE (SC#2 *enumerates* those as options to resolve here) — A2/A3 lose on their own merits, not on SC#2.

---

## Execution model (DECISION B)

| Option | Description | Selected |
|--------|-------------|----------|
| B1 — hook nudges the agent to run the pipeline | block(reason) tells the agent to run it in the foreground (like Jira) | ✓ |
| B2 — hook spawns a detached background process | Fire-and-forget child from the hook | |
| B3 — close-gate phase runs it inline as an agent step | Pairs with A3 | |

**User's choice:** B1 (adversarial-review recommendation) — confirmed via follow-up "Nudge agent to run it".
**Notes:** Inline-in-hook is INFEASIBLE against the Stop hook's `timeout: 15` (`settings.local.json:9`) vs a multi-minute 221-doc pandoc batch (A1-1, CRITICAL). B2 detached-on-Windows is unreliable — job-object kill at ~15s → partial batch, no zip, no signal (B2-1, CRITICAL). Foreground agent run has no timeout ceiling. B3 only made sense paired with the rejected A3.

---

## Degradation & visibility (DECISION C)

| Option | Description | Selected |
|--------|-------------|----------|
| C1 — silent skip with log only | | |
| C2 — warn-and-allow with a visible message while close proceeds | Via the block(reason) channel | ✓ |
| C3 — record a deferred-marker file | | |

**User's choice:** C2 (adversarial-review recommendation).
**Notes:** A non-blocking Stop hook's stdout is discarded by Claude Code — the *only* visible channel is `block(reason)`, which is the same channel B1's nudge uses, so visibility + nudge unify. On absent prerequisites the hook degrades to a warn-and-allow that explicitly says the close is NOT blocked. Every pipeline `exit 1` (absent pwsh/pandoc OR wrong pandoc version) is treated as skip-not-block. C1 rejected: operator would ship believing the bundle regenerated when it silently didn't.

---

## Idempotency guard + version derivation (DECISION D)

| Option | Description | Selected |
|--------|-------------|----------|
| D1 — dist/docs-library-vX.Y.zip existence check | Read-only, no new artifact | ✓ |
| D2 — a STATE field | | |
| D3 — a marker file | | |
| Version — derive vX.Y from STATE milestone: & parameterize ZIP_NAME | (sub-question) | ✓ Fold into 127 |

**User's choice:** D1 + fold ZIP_NAME parameterization into Phase 127 (both adversarial-review recommendations; version fold confirmed via follow-up).
**Notes:** D2 (STATE-write) is a CRITICAL close-corruption risk — a hook writing STATE breaks the read-only Jira-mirror contract AND races the close-gate's single STATE-editing commit. D3 marker has the tracked-dirties-close-commit / gitignored-lost-on-clone dilemma with no upside over D1. D1 is purely read-only and the zip doubles as the idempotency sentinel; combined with the `stop_hook_active` guard it fires at most once. Version: `ZIP_NAME` is hardcoded `docs-library-v1.17.zip` (`build-publish-bundle.mjs:43`) — correct today but silently wrong for v1.18+; parameterize it and derive `vX.Y` from STATE `milestone:` (handling 3-part versions like `v1.4.1`).

---

## Claude's Discretion

- Exact prerequisite-probe implementation (cheap `--version` spawn vs. a dry-run of the pipeline's own `preflightCheck`) — lightest reliable probe inside the 15s budget.
- Exact `block(reason)` wording for the nudge and the degraded warn.
- ZIP_NAME parameterization surface (env var vs. `--version`/`--out` CLI flag), consistent with the existing `--self-test` argv convention.

## Deferred Ideas

- Non-interactive / CI-driven (headless) close automation — B1's nudge needs a live agent session; out of scope for HOOK-01.
- Backfilling the auto-trigger for shipped milestones v1.0–v1.16 — forward-looking from v1.17 onward.
- Concurrency-hardening the pipeline's shared staging dir (`rmSync` at `build-publish-bundle.mjs:359`) — separate pipeline-hardening concern.
