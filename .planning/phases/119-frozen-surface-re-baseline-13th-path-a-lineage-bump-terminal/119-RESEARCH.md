# Phase 119: Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Terminal Re-audit Close - Research

**Researched:** 2026-07-06
**Domain:** Milestone-close harness authoring (Node.js validator scripts, GitHub Actions CI, git-anchored frozen-surface pins) + owner-run grounding-validation procedure fork. NOT a content/code feature domain.
**Confidence:** HIGH — every mechanical claim below is grounded in live reads of the actual v1.14 scaffold files (not training-data recall) plus git-log/glob verification of what does and does not exist on disk today.

## Summary

This phase is a **copy-and-repoint** operation with one genuinely new authoring task (folding C17 into the Path-A harness) and one genuinely new procedural task (forking the PIPE-02 owner-run runbook for a second, real-corpus pass). Every other artifact has a byte-identical structural analog already committed at Phase 112 (the v1.14 close). This research verified, by direct file read and git-log query, exactly which strings must change, which files do not yet exist and must be authored from scratch, and where two subtle timing/scope traps live that are easy to get wrong by pattern-matching too literally on v1.14.

The **dominant finding**: `check-phase-113.mjs` through `check-phase-118.mjs` do **not exist on disk** — confirmed by glob and by git-log showing check-phase-96.mjs (v1.13 lineage) and check-phase-101.mjs (v1.14 lineage) were BOTH authored in their respective milestone's **close-phase Atom 2 commit** (`dc9ead9` / `998eeae`), not during their own content phase. This is not a deviation for v1.15 — it is the established, unbroken Path-A pattern (confirmed at v1.12/v1.13/v1.14). Phase 119's Atom 2 must therefore author **seven** new `check-phase-*.mjs` files in one commit: six lightweight leaf validators (113–118, needles derived inline from each phase's CONTEXT/VERIFICATION/SUMMARY docs, since no `*-NEEDLE-SPEC.md` hand-offs exist for any of them) plus the apex (119, `CHAIN_PHASES=[48..118]`, 71 entries).

The **second dominant finding**: C17 (`c17-eee-contract.mjs`, authored Phase 115) is explicitly self-described in its own header comment as "the Phase-119 seed for `v1.15-milestone-audit.mjs` C17 (Atom 1)... Keep it standalone now; the audit-fold is Phase 119's job." It is a self-executing top-level script (no exported functions, no module boundary) — the only architecturally consistent fold mechanism is a **subprocess spawn** (`execFileSync('node', ['scripts/validation/c17-eee-contract.mjs'], ...)`), exactly mirroring how `check-phase-112.mjs`'s `AUDIT-HARNESS` check already spawns `v1.14-milestone-audit.mjs` as a subprocess. This is a genuinely new C-check (id 17) with no C1–C16 precedent for "wrap a whole separate corpus-wide validator as one check" — flagged below as the phase's single largest design decision.

**Primary recommendation:** Treat this phase as five discrete file-copy operations (harness, sidecar, BASELINE comment, frozen-at-close pin, CI workflow) + one new-authoring operation (7 check-phase files, needles derived from existing VERIFICATION.md/CONTEXT.md/SUMMARY.md artifacts, zero net-new research needed) + one fork operation (PIPE-02-CLOSE-RUNBOOK.md). Follow the v1.14 close (`.planning/milestones/v1.14-MILESTONE-AUDIT.md`) commit-by-commit as the literal template; every deviation this research found (C17 fold, no-real-Draft-doc tension, BASELINE-anchor SHA timing) is called out explicitly in Common Pitfalls / Open Questions below.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Corpus-wide lint (C1–C17) | Harness/Validator tier (`scripts/validation/v1.15-milestone-audit.mjs`) | — | Runs against the live working tree; node-builtins-only self-contained script |
| Per-phase deliverable regression (113–118) | Harness/Validator tier (`check-phase-{113..118}.mjs`) | — | Lightweight presence + content-needle checks, no chain |
| Full predecessor-chain proof | Harness/Validator tier (`check-phase-119.mjs` apex) | CI tier (GHA) | Apex recurses 48..118 as subprocesses; Windows times out at this depth, so authoritative execution moves to CI tier |
| Cross-OS authoritative re-audit | CI tier (`audit-harness-v1.15-integrity.yml` on `ubuntu-latest`) | Git/VCS tier (push trigger) | SC4 explicitly names Linux GHA as authoritative; Windows corroborates only |
| Frozen-surface pin anchoring | Git/VCS tier (`_lib/frozen-at-close.mjs`, `MILESTONE_CLOSE_SHAS`) | Harness/Validator tier (consumed by chain validators) | Pure git-SHA lookup table; back-anchors only to PAST commits |
| Grounding-validation confirmation | External-platform tier (Copilot Studio / SharePoint, owner-run) | Documentation-corpus tier (the `.docx` representative set) | No programmatic access exists (REQUIREMENTS L77); agent prepares artifacts, owner executes and asserts PASS |
| Milestone requirement-status flip | Documentation-corpus tier (`.planning/PROJECT.md` / `ROADMAP.md` / `STATE.md` / `REQUIREMENTS.md`) | — | Single close-gate commit; no code/runtime surface |

This phase has no Browser/Frontend-Server/API/Database tiers in the conventional web-app sense — it is a documentation-repository harness-and-CI domain. The table above substitutes the project's own five operative tiers (Harness, CI, Git/VCS, Documentation-corpus, External-grounding-platform) for the standard web-app tier list, consistent with how prior v1.15 harness-adjacent phases (115) framed this.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-02 | Atomic frozen-surface re-baseline: apex + continuity chain validators green together at new close SHAs; non-Phase-1 predecessor surfaces byte-unchanged | Architecture Patterns §D1 skeleton; Common Pitfalls #1 (chain-health remediation is the empirically-proven dominant risk); Code Examples §check-phase-119.mjs apex |
| HARN-03 | 13th Path-A lineage bump: `v1.15-milestone-audit.mjs` (C1–C17) + sidecar + BASELINE_19 + `check-phase-113..119.mjs` + `frozen-at-close.mjs` V114 pin + 12th CI coexistence workflow | File-by-File Worklist (all 6 artifact classes); Code Examples (exact diffs for every file) |
| HARN-04 | 3-axis terminal re-audit (fresh clone + Linux GHA authoritative + fresh sub-agent, cross-OS EXACT MATCH) + PIPE-02 grounding confirmation, single close-gate commit flipping 16 reqs | Architecture Patterns §Execution-Ordering Interlock; PIPE-02-CLOSE-RUNBOOK fork basis; the v1.14-MILESTONE-AUDIT.md close-narrative template (reused verbatim as the authoring skeleton for `v1.15-MILESTONE-AUDIT.md`) |

</phase_requirements>

## User Constraints (from CONTEXT.md)

<user_constraints>

### Locked Decisions

**D-119-1 — PIPE-02 second grounding-confirmation pass: representative set, owner-run, close-gate BLOCKS (Area A → A1)**
Run the SECOND grounding-confirmation pass on a statistically representative `.docx` set, owner-run live in Copilot Studio. Agent **prepares** the representative set + an executable `PIPE-02-CLOSE-RUNBOOK.md`; owner **executes** and records `PIPE-02-CLOSE-FINDINGS.md`. The close-gate BLOCKS until the owner attests PASS.
- MANDATORY RIDER — define "PASS": carry Phase-113 acceptance (grounded answer + clickable document-level citation + no hallucination), across N queries spanning all 5 platforms + a Draft-label retrieval probe + a capability-matrix chunk-survival probe.
- MANDATORY RIDER — use the REAL retrofitted corpus, not the Phase-113 synthetic fixtures. Representative set must be actual shipped `RE-NNN` `Status: Approved` docs.
- MANDATORY RIDER — probe a POST-remediation WIDE matrix (a RETRO-03 deliverable) — test what v1.15 CHANGED, not what Phase 113 already proved.
- RIDER — include a dedicated Linux doc (don't rely on the Phase-113 compound-802.1X proxy again).
- RIDER — capture the raw transcript in-repo (`PIPE-02-CLOSE-FINDINGS.md`); Phase 113 left it owner-local.
- *Rejected A2 (full ~174-doc corpus):* redundant owner burden for zero SC-required benefit. *Rejected A3 (non-blocking/attestation-pending deferral):* contradicts "included in the close-gate."

**D-119-2 — Cross-OS Axis 2: push → new v1.15 CI workflow, GHA green is authoritative (Area B → B1)**
Push the close branch → `audit-harness-v1.15-integrity.yml` (12th coexistence workflow, Atom 2) runs BOTH chain validators on `ubuntu-latest` — apex (`linux-chain-ubuntu-latest` job, `core.autocrlf false` + `fetch-depth:0` + `continue-on-error:false`) + continuity (standalone per-phase jobs). GHA green is authoritative; Windows-local corroborates only.
- MANDATORY RIDER — repoint the Path-A `paths:` filter from `v1.14-*`/`v1.14-MILESTONE-AUDIT.md` to `v1.15-*`/`v1.15-MILESTONE-AUDIT.md`.
- RIDER — push-timing/D-03 ordering gate: Atom 2 must be pushed to a branch/PR FIRST before Axis-2 can run at all; the close-gate commit necessarily post-dates the Atom-2 push (the B↔C↔D interlock).
- *Rejected B2 (local WSL2/Docker Linux):* mechanically possible but not the SC4-named authoritative surface. *Rejected B3 (sub-agent runs chain, GHA skipped):* hits WINDOWS-CLONE-DEEPNEST-TIMEOUT-01; collapses Axis 2 into Axis 3.

**D-119-3 — Re-baseline atomic-green: v1.14-exact + pre-authorized emergent remediation slot (Area C → C1)**
`BASELINE_19` freshness refresh in Atom 1, back-anchored to a PAST HEAD (the Wave-0/pre-Atom-1 SHA — mirrors `BASELINE_18 → 1a0ee15`), never the close-gate SHA. Pre-authorize an EMERGENT chain-health remediation slot (like v1.14 Plan 112-06) that fires only if the authoritative Axis-2 GHA apex comes back RED.
- MANDATORY RIDER — remediation constraints (exact v1.14 112-06 discipline): edits ONLY predecessor `check-phase-NN.mjs` validators, NEVER a frozen surface, NEVER value-masks, `CHAIN_SKIP` stays EMPTY. Honest audit record is MANDATORY.
- RIDER — predecessor-byte-unchanged HARD gate at close: `git diff ⟨pre-Atom-1 anchor⟩ HEAD` over non-Phase-1 frozen surfaces = EMPTY.
- *Why risk-correct:* v1.14's first Axis-2 apex ran RED (44/22/1), needed 3 remediation commits — same failure mode highly probable here (EEE retrofit reformatted ~174 docs across shared surfaces predecessor validators assert against).
- Honest-atomicity note: "atomic-green" holds at the TERMINAL close-gate SHA, not continuously.
- *Rejected C2 (green-before-commit, no separate remediation commit):* local green cannot guarantee authoritative GHA green; would force predecessor edits into Atom 2 (violates SC2). *Rejected C3 (standalone re-baseline commit):* built to solve the non-existent self-reference problem.

**D-119-4 — Close commit/plan structure: D1 3-commit skeleton + Wave-0 anchor + remediation slot (Area D → D1)**
3-commit skeleton: (1) Atom 1, (2) Atom 2 [validators + V114 pin + CI workflow + BASELINE_19 ride here], (3) close-gate (flips all 16 reqs). Re-audit runs against the tree BEFORE the close-gate commit.
- PLUS a Wave-0 pre-anchor commit BEFORE Atom 1 (the BASELINE_19 back-anchor target + predecessor-byte-unchanged gate base; cf. v1.14 Plan 112-01 anchor `0a7699f`).
- PLUS an emergent remediation slot between the Atom-2 push and the close-gate (only if GHA is RED; may be 1-or-more commits — v1.14 took 3). Close-gate remains the single commit flipping all 16.
- Read "3 commits" as a skeleton/FLOOR, not a ceiling — v1.14's honest history was ~7 commits (Wave-0 + Atom1 + Atom2 + re-audit + 3×remediation + close-gate).
- *Rejected D2 (standalone 4th re-baseline commit):* falls with C3. *Rejected D3 (fold Atom 1 into Atom 2):* violates SC1/SC2 "indivisibly (one commit)" each.

**Execution ordering (the B↔C↔D interlock — bake into the plan)**
`Wave-0 pre-anchor → Atom 1 (BASELINE_19 back-anchored to Wave-0 SHA) → Atom 2 (validators + V114=7d922a7 + v1.15-integrity.yml + re-baseline pins) → PUSH` → triggers the authoritative GHA re-audit. **If GHA apex is RED** → execute the pre-authorized remediation slot (predecessor `check-phase-NN` validators only, no value-masking, `CHAIN_SKIP` stays ∅, honest record) → re-push → re-audit to green. **Only once GHA is green AND the owner has attested PIPE-02 PASS** does the close-gate commit land, flipping all 16 reqs. The close-gate SHA is never referenced by any pin.

### Claude's Discretion

- Exact plan count / plan-to-commit mapping within the D1 skeleton (Wave-0 anchor + Atom 1 + Atom 2 + remediation slot + close-gate).
- Exact composition of the representative `.docx` set (which specific `RE-NNN` Approved docs per platform/class), subject to the D-119-1 riders (5 platforms + Draft + wide post-remediation matrix + Linux doc).
- Exact `PIPE-02-CLOSE-RUNBOOK.md` query list (N queries), inheriting the Phase-113 runbook shape.
- Whether to run a local corroborating Linux (WSL/Docker) chain pass before the authoritative GHA push (optional confidence step; NOT authoritative).

### Deferred Ideas (OUT OF SCOPE)

- V115 pin (freezing the v1.15 corpus) → v1.16 — pins back-anchor; the successor milestone pins v1.15's close SHA. Explicitly NOT authored this phase.
- v1.16 — orphan docs + structural classes (glossaries, Mermaid decision-trees, orphan nav-hubs, lifecycle) + the parked Mermaid-vs-code-fenced-diagrams collision + the 1 carved mermaid reference file (RE-147) + end-user Guides (RE-175/176) + the v1.16 descriptive-filename rename pass (PIPE-02 OQ1 citation-label quality).
- Programmatic Copilot Studio access — remains out of scope (REQUIREMENTS L77); PIPE-02 stays owner-run.

</user_constraints>

## Project Constraints (from CLAUDE.md)

The project `CLAUDE.md` describes an unrelated codebase (a Windows Autopilot Troubleshooter PowerShell/FastAPI/React suite) that does not correspond to the actual working tree at `D:\claude\Autopilot`, which is a **documentation corpus + validation-harness** repository (v1.15 EEE SOP Documentation-Standard Retrofit milestone). No PowerShell/Python/TypeScript directives in that file apply to this phase's actual artifacts (`scripts/validation/*.mjs`, `.github/workflows/*.yml`, `docs/*.md`). Treat `CLAUDE.md` as stale/non-applicable to this repo's actual state; the governing conventions are the ones embedded in the harness scripts themselves (node-builtins-only, `--self-test` dual-invariant, `padLabel`/`readFile` shared helper shapes) and in `.planning/` (STATE.md, ROADMAP.md, config.json).

No project-skill `rules/*.md` files were found under `.claude/skills/` or `.agents/skills/` that govern this phase's artifact classes (validator `.mjs` authoring, GHA YAML, milestone-audit markdown).

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-ins (`node:fs`, `node:path`, `node:process`, `node:child_process`) | Node 20 (CI) / Node 24.17.0 (local, `node --version` confirmed) | All validator/harness scripting | Every `scripts/validation/*.mjs` file in this repo is node-builtins-only by explicit convention (repeated header comment across all 15+ prior harness files); zero npm dependency footprint is load-bearing for the "self-contained harness" invariant |
| git CLI | 2.51.0.windows.2 (confirmed via `git --version`) | Frozen-SHA reads (`git show <SHA>:<path>`), fresh-clone Axis 1, byte-unchanged diffs | `_lib/frozen-at-close.mjs` shells out via `execFileSync('git', ...)` — this is the only external-process dependency in the entire harness lineage |
| GitHub Actions (`ubuntu-latest`, `actions/checkout@v4`, `actions/setup-node@v4`) | Pinned action versions unchanged from v1.14 workflow | Axis-2 authoritative cross-OS execution | Verbatim precedent; `node-version: '20'` fixed across all 11 prior coexistence workflows |
| `gh` CLI | 2.81.0, authenticated (`gh auth status` confirmed: Schweinehund, github.com, workflow scope) | Dispatching/polling the GHA workflow run for Axis 2 | Used at v1.14 close (`gh workflow run audit-harness-v1.14-integrity.yml --ref master`) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `markdown-link-check` | `3.14.2` (pinned, unchanged) | Quarterly `rotting-external-quarterly` CI job | Carried verbatim from v1.14 workflow — no version bump needed this phase |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Subprocess-spawn C17 fold (`execFileSync('node', ['c17-eee-contract.mjs'])`) | Inline-copy the 13 assertions' logic directly into `v1.15-milestone-audit.mjs` as a check id 17 | Copy-inline duplicates ~570 lines and creates two divergence-prone copies of the D1_MAP/13-assertion logic; subprocess-spawn (analog to `check-phase-112.mjs`'s existing `AUDIT-HARNESS` pattern) is the DRY, precedent-matching choice — **recommended** |
| Local WSL2/Docker Linux chain run as authoritative Axis 2 | GHA `ubuntu-latest` | Locked by D-119-2/B1 — WSL2+Docker confirmed present on this box (`docker --version` → 29.2.0; `wsl --list` → docker-desktop distro) but explicitly REJECTED as authoritative per SC4 wording; usable only as an optional pre-push corroboration step |

### Package Legitimacy Audit

**Not applicable this phase.** No new external packages are installed. Every artifact this phase authors or copies (`.mjs` validator scripts, `.json` sidecar, `.yml` workflow, `.md` milestone-audit/runbook docs) uses only Node.js built-ins and tools already present in the repo/CI image (`markdown-link-check@3.14.2`, already pinned since Phase 66). No `npm install` step is introduced. Skip the slopcheck/registry-verification gate — there is nothing to verify.

## Architecture Patterns

### System Architecture Diagram

```
                    ┌─────────────────────────────────────────────────────────┐
                    │  Wave-0 pre-anchor commit (captures anchor SHA)          │
                    └──────────────────────────┬────────────────────────────────┘
                                                 │
                    ┌────────────────────────────▼────────────────────────────┐
                    │  Atom 1 (ONE commit): v1.15-milestone-audit.mjs (C1-C17) │
                    │  + v1.15-audit-allowlist.json + BASELINE_19 comment      │
                    │  BASELINE_19 back-anchors to Wave-0/pre-Atom-1 HEAD SHA  │
                    └──────────────────────────┬────────────────────────────────┘
                                                 │
                    ┌────────────────────────────▼────────────────────────────┐
                    │  Atom 2 (ONE commit): check-phase-113..119.mjs (7 files) │
                    │  + frozen-at-close.mjs V114='7d922a7' pin                │
                    │  + audit-harness-v1.15-integrity.yml (12th CI workflow)  │
                    └──────────────────────────┬────────────────────────────────┘
                                                 │
                                            PUSH to branch/PR
                                                 │
                    ┌────────────────────────────▼────────────────────────────┐
                    │  GHA: audit-harness-v1.15-integrity.yml fires             │
                    │  (paths: filter matches v1.15-* changed files)           │
                    │  → parse → path-match → harness-run                     │
                    │  → check-phase-113..119 (leaf jobs, parallel)            │
                    │  → linux-chain-ubuntu-latest (apex, recurses 48..118)    │
                    └──────────────────────────┬────────────────────────────────┘
                                                 │
                                    ┌────────────┴────────────┐
                                    │ GHA apex result?         │
                                    └────────────┬────────────┘
                                     RED │                │ GREEN
                          ┌──────────────▼──┐              │
                          │ Remediation slot │              │
                          │ (predecessor     │              │
                          │  check-phase-NN  │              │
                          │  edits ONLY;     │              │
                          │  1+ commits)     │              │
                          └──────────────┬───┘              │
                                 re-push  │                  │
                                 re-audit └──────────►GREEN──┤
                                                              │
                    ┌────────────────────────────▼────────────────────────────┐
                    │  Axis 1 (fresh clone, Windows) + Axis 3 (fresh sub-agent)│
                    │  cross-verify PASS/FAIL/SKIP EXACT MATCH vs Axis 2       │
                    └──────────────────────────┬────────────────────────────────┘
                                                 │
                    ┌────────────────────────────▼────────────────────────────┐
                    │  PIPE-02-CLOSE-RUNBOOK.md executed OWNER-SIDE (parallel, │
                    │  independent of the GHA gate — owner attests PASS)      │
                    └──────────────────────────┬────────────────────────────────┘
                                                 │
                              GHA green AND owner PASS attested
                                                 │
                    ┌────────────────────────────▼────────────────────────────┐
                    │  Close-gate (ONE commit): v1.15-MILESTONE-AUDIT.md +     │
                    │  v1.15-DEFERRED-CLEANUP.md + 4-doc traceability closure  │
                    │  flips all 16 v1.15 reqs to Validated                    │
                    └───────────────────────────────────────────────────────────┘
```

### Recommended Plan/Commit Structure

```
Wave-0 plan   — capture pre-Atom-1 anchor SHA; no code changes beyond the plan doc itself
                (cf. v1.14 Plan 112-01: added D-00 NESTED-guard defensively; v1.15 may not
                need an equivalent guard-repair since v1.14 already completed that doctrine —
                confirm at plan time whether any NEW class of frozen-audit-vs-live-corpus
                collision exists for the EEE 90-day-inherited freshness fields; see Common
                Pitfalls #4)
Atom-1 plan   — v1.15-milestone-audit.mjs (C1-C17) + sidecar + BASELINE_19 (ONE commit)
Atom-2 plan   — check-phase-113..119.mjs (7 files) + frozen-at-close.mjs V114 + CI workflow
                (ONE commit) + PUSH to a branch/PR
Re-audit plan — dispatch/await GHA; run Axis 1 (fresh clone) + Axis 3 (fresh sub-agent);
                author 119-04-AUDIT-RESULTS.md (mirrors 112-04-AUDIT-RESULTS.md)
[Remediation plan(s) — ONLY IF GHA apex RED; 1-or-more commits, predecessor validators only]
PIPE-02 plan  — author PIPE-02-CLOSE-RUNBOOK.md + representative-set selection;
                OWNER CHECKPOINT: owner executes, records PIPE-02-CLOSE-FINDINGS.md
Close-gate plan — v1.15-MILESTONE-AUDIT.md + v1.15-DEFERRED-CLEANUP.md + 4-doc traceability
                  closure (ONE commit); requires (GHA green) AND (owner PIPE-02 PASS)
```

### Anti-Patterns to Avoid

- **Folding Atom 1 and Atom 2 into one commit:** violates SC1/SC2's "indivisibly (one commit)" EACH — explicitly rejected as D3 in CONTEXT.md.
- **Anchoring BASELINE_19 to the close-gate SHA:** architecturally impossible (SHA doesn't exist yet at Atom-1 authoring time) and explicitly the "self-reference" framing CONTEXT.md's adversarial review proved false — always back-anchor to a PAST SHA.
- **Editing a frozen milestone-audit `.mjs`/sidecar/workflow during remediation:** the v1.14 precedent (Plan 112-06) is explicit — remediation touches ONLY predecessor `check-phase-NN.mjs` validators (in-class chain maintenance); a frozen milestone-audit validates its OWN close-SHA corpus, never future live corpus.
- **Value-masking during remediation:** bumping an expected value in a predecessor validator to match the evolved corpus state, rather than genuinely fixing the NESTED-guard/frozen-aware-read gap, is "T1 masking" — explicitly forbidden and was the GA3-C self-disqualifier at a prior milestone.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Corpus-wide EEE contract check inside the Path-A harness | A fresh reimplementation of the 13 C17 assertions inside `v1.15-milestone-audit.mjs` | Subprocess-spawn `c17-eee-contract.mjs` exactly as `check-phase-112.mjs`'s `AUDIT-HARNESS` check spawns `v1.14-milestone-audit.mjs` (`execFileSync('node', [path], {...})`, treat exit code as pass/fail) | `c17-eee-contract.mjs` already exists, is self-tested (4/4 sub-tests), and its own header comment names Phase 119 as the fold-consumer — reimplementing risks D1_MAP / assertion-numbering drift between two copies |
| Per-phase needle derivation for check-phase-113..118 | Inventing needle strings from scratch by re-reading raw corpus diffs | Read each phase's `*-VERIFICATION.md` "Required Artifacts" + "Observable Truths" tables — these already enumerate exact file paths, byte-counts, and verbatim landing strings (confirmed present for 113/114/115; likely present for 116/117/118, not yet read in full this session) | This is the exact sourcing method `check-phase-96.mjs`/`check-phase-101.mjs` cite ("Lineage: ... content needles derived from 96-CONTEXT.md + 100-RESEARCH.md") |
| Cross-OS byte-equivalence proof | A hand-rolled Windows/Linux diff script | The existing `_lib/frozen-at-close.mjs` `readAtClose()` + the established 14-row Cross-OS PASS-Count EXACT MATCH table format (see `.planning/milestones/v1.14-MILESTONE-AUDIT.md` lines 264-289) | This exact table shape is what the close-gate audit doc must reproduce; inventing a new comparison format breaks the audit-trail continuity across 12 prior milestone closes |
| Representative-.docx-set selection logic | A new script that queries `RE-index.md` programmatically | Direct `grep`/manual read of `docs/_registry/RE-index.md` Approved rows (166 of 178 rows are `Approved` in the retrofit-lifecycle sense; confirmed via `grep -c "| Approved |"`) — this is a one-time manual selection task, not a recurring script need | No prior phase built registry-query tooling; Phase 113/114 selected fixtures by direct inspection |

**Key insight:** every "don't hand-roll" item above resolves to "read/spawn an artifact that already exists in this repo" — this phase's entire risk profile is in **faithful repointing and correct sourcing**, not in inventing new logic.

## Common Pitfalls

### Pitfall 1: Assuming the GHA apex will be green on first push (it was NOT at v1.14, v1.13, or any prior Path-A close with a large content-phase count)
**What goes wrong:** The plan author writes only a 3-commit skeleton with no remediation slot, then the phase blocks mid-execution when GHA comes back RED with no pre-authorized path forward.
**Why it happens:** Leaf validators being green locally (Windows fresh clone, Axis 1) does not guarantee the recursive apex is green — predecessor validators each carry their OWN `AUDIT`/self-test step that re-runs a frozen milestone-audit or supervision-pin self-test against the LIVE (evolved) tree. v1.14's first Axis-2 run was 44 PASS / 22 FAIL / 1 SKIP despite 15/15 leaf harness checks passing.
**How to avoid:** CONTEXT.md already pre-authorizes the remediation slot (D-119-3/C1) — the plan MUST include it as a real, budgeted step (not an implicit "if needed" footnote), and the plan's task list should explicitly describe the constraint set (predecessor-only, no value-masking, `CHAIN_SKIP` stays empty) so an executor doesn't improvise a shortcut under time pressure.
**Warning signs:** Any predecessor `check-phase-NN.mjs` whose `AUDIT-HARNESS`/self-test step lacks the `CHECK_PHASE_NESTED` guard, OR any predecessor validator with a content-assertion (byte-blob comparison, frontmatter-freshness check) that isn't frozen-aware (reads live corpus instead of `readAtClose()`), is a candidate RED site. v1.14 found 22 such sites; v1.15's EEE retrofit touched ~174 files across shared surfaces (glossaries, capability matrices, nav hubs) that predecessor validators from v1.5–v1.13 assert against — the surface area for collision is at least as large as v1.14's, likely larger.

### Pitfall 2: No real corpus document exists with `status: Draft` — the "Draft-label retrieval probe" rider cannot be satisfied by "actual shipped RE-NNN Status: Approved docs" alone
**What goes wrong:** The plan author tries to find a real `RE-NNN` doc with `status: Draft` frontmatter for the representative set and cannot, then either skips the mandatory Draft-probe rider or silently reintroduces a Phase-113-style synthetic fixture (violating the "use the REAL retrofitted corpus" rider).
**Why it happens:** Verified this session: `grep -rl "^status: Draft" docs/` returns only the 7 files under `docs/_templates/` (the born-Draft-by-default templates, per STD-02) — every real content doc across L1/L2 runbooks, admin-setup guides, and reference docs was retrofitted directly to `status: Approved` (RETRO-01/02/03 all specify Status: Approved for retrofitted docs; there was never an intermediate real Draft state for shipped content).
**How to avoid:** This is a genuine tension between two MANDATORY riders that CONTEXT.md did not reconcile at discuss-phase (it was resolved at the "gray area" level, not down to this granularity). Flag as Open Question #1 below — the most surgical resolution is: convert ONE real Approved `.docx` a second time with only its frontmatter `status:` value changed to `draft` for the TEST-library upload (source `.md` untouched; this is a test-artifact-only mutation, analogous to how Phase 113 used a synthetic `draft-test-doc.md` but now substituting real content). This satisfies "use real corpus content" for the Draft probe while still exercising the Draft-retrieval behavior. Confirm this approach with the user before executing (it is a plan-time decision, not a locked one).
**Warning signs:** Any plan that either (a) silently drops the Draft-probe rider, or (b) reuses `draft-test-doc.md` verbatim from Phase 113 without flagging the "REAL retrofitted corpus" rider conflict, should be caught in review.

### Pitfall 3: `docs/admin-setup-linux/00-overview.md` (RE-128) is mermaid-deferred and stuck at registry-Status `Pending` — do not select it as the representative set's "dedicated Linux doc"
**What goes wrong:** Selecting RE-128 for the Linux-doc rider produces a representative-set member that is NOT EEE-retrofitted (keyless, no `doc_id`/`status`/`owner`/`doc_type`, no visible header block) — defeating the purpose of the grounding probe (which is to confirm the EEE header block survives indexing).
**Why it happens:** RE-128 hard-fails C17 assertion #1 (top-level `\`\`\`mermaid` fence) and was deliberately left un-enrolled/keyless per Phase 117's D-05 carve-out, deferred to v1.16. Confirmed via `docs/_registry/RE-index.md:144` still showing `Pending` and Phase 117's `117-08-SUMMARY.md` explicitly stating "RE-128 ... correctly left untouched at Pending."
**How to avoid:** Use an Approved Linux doc instead — e.g., `docs/admin-setup-linux/01-intune-linux-agent.md` (RE-129, Approved) or `02-enrollment-profile.md` (RE-130, Approved), both fully EEE-retrofitted per this session's registry read.
**Warning signs:** Any representative-set list containing `docs/admin-setup-linux/00-overview.md` should be corrected before the PIPE-02-CLOSE-RUNBOOK is authored.

### Pitfall 4: The BASELINE_19 "pre-Atom-1 HEAD" anchor SHA may NOT equal the Wave-0 commit SHA if an automated intervening commit lands between them
**What goes wrong:** The plan hard-codes the Wave-0 plan-creation commit SHA as the BASELINE_19 anchor, but by the time Atom 1 is actually authored, an intervening automated commit (this repo has a Jira-milestone Stop-hook per project memory that auto-commits on phase-state transitions) has landed, making the recorded anchor SHA stale/incorrect relative to what "pre-Atom-1 HEAD" actually means.
**Why it happens:** Verified via git log for the v1.14 precedent: Wave-0 anchor commit `0a7699f` ("docs(112): create phase plan") is an ANCESTOR of, not identical to, the actual BASELINE_18 anchor SHA `1a0ee15` ("chore(jira): v1.14 sync — phase 112 ... execution started") — a Jira-sync commit landed between Wave-0 and Atom 1, and BASELINE_18's comment correctly anchored to the LATER SHA (`1a0ee15`, the true immediate predecessor of Atom 1's commit `8fb74a5`), not the earlier Wave-0 commit.
**How to avoid:** Capture the BASELINE_19 anchor SHA via `git rev-parse HEAD` at the literal moment immediately before authoring the Atom-1 commit (not at Wave-0 plan-creation time) — these may differ by one or more automated commits. The Wave-0 anchor SHA remains the correct base for the SEPARATE predecessor-byte-unchanged HARD gate assertion (`git diff <Wave-0 anchor> HEAD`), which is a different invariant than the BASELINE_19 freshness-comment anchor. Do not conflate the two anchor SHAs even though v1.14's were close in the commit graph.
**Warning signs:** If the plan describes "capture the anchor SHA" as a single one-time action at Wave-0 rather than a just-in-time capture at Atom-1-authoring time, this pitfall is live.

### Pitfall 5: Assuming `regenerate-supervision-pins.mjs`'s `--self-test` mode needs a v1.15 sidecar repoint
**What goes wrong:** An executor "fixes" the hardcoded `parseAllowlist('scripts/validation/v1.7-audit-allowlist.json')` calls (3 occurrences, lines 290/336/489) to point at `v1.15-audit-allowlist.json`, believing this is a stale repoint bug.
**Why it happens:** These calls are NOT stale — `--self-test` mode intentionally dogfoods the ORIGINAL Phase-43 hand-authored NEW-pin set, which is permanently anchored to the v1.7-era sidecar as a historical fixture (BASELINE_9 predates that expansion). This has been left unchanged through 6 prior BASELINE refreshes (BASELINE_10 through BASELINE_18) — it is a deliberate, stable design, not drift.
**How to avoid:** Only touch the BASELINE_N freshness-comment block (append a new BASELINE_19 paragraph following the exact prose template used for BASELINE_10..18) and, if genuinely required, the `BASELINE_9` line-coordinate array itself (only if v1.15 corpus changes shifted the specific 9 pinned lines — confirm via `--self-test` run showing FAIL before assuming a change is needed). Do NOT touch the `v1.7-audit-allowlist.json` self-test references.
**Warning signs:** A diff touching lines 290/336/489 of `regenerate-supervision-pins.mjs` should prompt a second look.

### Pitfall 6: Two GHA jobs both run the full apex recursion (this is not a bug to fix — preserve verbatim)
**What goes wrong:** An executor notices `check-phase-119` (standalone job) and `linux-chain-ubuntu-latest` both invoke `node scripts/validation/check-phase-119.mjs` and "deduplicates" by removing one, believing it to be redundant CI waste.
**Why it happens:** In the v1.14 workflow, the standalone `check-phase-112` job and the `linux-chain-ubuntu-latest` job both run the SAME full 64-subprocess recursive chain (`check-phase-112.mjs` always executes its embedded `CHAIN_PHASES` loop unless invoked with `CHECK_PHASE_NESTED=1`, which neither top-level GHA job sets) — this redundancy exists in the shipped, audited v1.14 workflow and is reflected in the v1.14-MILESTONE-AUDIT.md's own job-conclusion list treating both as independent evidence rows.
**How to avoid:** Preserve this exact structure in `audit-harness-v1.15-integrity.yml` — do not "clean up" apparent duplication without a CONTEXT.md-level decision to change it (out of scope for this phase; HARN-03 mandates a Path-A copy, not a refactor).
**Warning signs:** Any diff that removes the standalone `check-phase-119` job or that adds `CHECK_PHASE_NESTED=1` to one of the two invocations changes audited CI behavior — flag for explicit review.

## Code Examples

### File-by-File Worklist (the six artifact classes)

#### 1. `scripts/validation/v1.14-milestone-audit.mjs` → `scripts/validation/v1.15-milestone-audit.mjs`

Confirmed via full read: imports ONLY `node:fs`, `node:path`, `node:process` (self-contained; no `child_process` currently — **adding C17 via subprocess-spawn will add `node:child_process`**, still a node builtin, satisfying the self-containment convention). Contains checks C1–C16 (ids 1–16, skipping 8 — no C8 exists in this lineage, confirmed by array inspection). No C17 present.

Exact string repoints required (every `v1.14`/`1.14`/`112` token in the header comment block, lines 1–36):
```diff
- // v1.14 Milestone Audit Harness (Path A copy of v1.13; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12 → v1.13 → v1.14; C1-C16 inherited verbatim EXCEPT C5/C10 freshness threshold 60d→90d per Phase 112 D-01a / discuss-flag #7)
+ // v1.15 Milestone Audit Harness (Path A copy of v1.14; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12 → v1.13 → v1.14 → v1.15; C1-C16 inherited verbatim from v1.14 [no freshness-threshold change this milestone]; C17 (EEE contract) FOLDED IN per Phase 119 D-119 [subprocess-spawn of c17-eee-contract.mjs — see check id 17])
- // Source of truth: .planning/phases/112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl/112-CONTEXT.md (D-00..D-04)
+ // Source of truth: .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-CONTEXT.md (D-119-1..D-119-4)
- // Sidecar allow-list: scripts/validation/v1.14-audit-allowlist.json (v1.14 Path-A from v1.13 with docs/_glossary-android.md + docs/reference/android-capability-matrix.md line-pins repointed +1 per Phase 112 D-04)
+ // Sidecar allow-list: scripts/validation/v1.15-audit-allowlist.json (v1.15 Path-A from v1.14 — repointed; confirm line-pin drift per corpus diff before assuming +0)
```
Every subsequent `parseAllowlist()` call reading `'scripts/validation/v1.14-audit-allowlist.json'` (line 79) → `'scripts/validation/v1.15-audit-allowlist.json'`.

**New check to append (id 17):**
```javascript
{
  id: 17,
  name: 'C17: EEE document contract (13 assertions, all enrolled docs/ files)',
  // Phase 119 fold: c17-eee-contract.mjs (Phase 115) is self-executing (no exports) and its
  // own header names Phase 119 as the fold-consumer. Subprocess-spawn mirrors check-phase-112.mjs's
  // existing AUDIT-HARNESS pattern (spawn a separate validator, treat exit code as pass/fail).
  run() {
    try {
      execFileSync('node', ['scripts/validation/c17-eee-contract.mjs'], {
        stdio: 'pipe', timeout: 300000, cwd: process.cwd(),
      });
      return { pass: true, detail: 'c17-eee-contract.mjs exits 0 (all enrolled files pass 13 assertions)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      return { pass: false, detail: 'C17 FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
    }
  }
}
```
Requires adding `import { execFileSync } from 'node:child_process';` to the import block.

#### 2. `scripts/validation/v1.14-audit-allowlist.json` → `scripts/validation/v1.15-audit-allowlist.json`

Confirmed shape (531 lines): `schema_version`, `generated`, `phase`, `safetynet_exemptions[]`, `supervision_exemptions[]`, `cope_banned_phrases[]`, `c7_knox_allowlist[]`, `c9_exemptions[]`, `c11_ops_exemptions[]`, `c13_broken_link_allowlist[]` (15-entry, count-asserted by C13), `c13_rotting_external{}`, `c16_missing_endpoint_exemptions[]`.

Repoint required:
```diff
- "phase": "112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl",
+ "phase": "119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal",
```
Every `safetynet_exemptions[]`/`supervision_exemptions[]`/`c7_knox_allowlist[]` entry carries a `{file, line}` pin against Android/glossary files (`docs/_glossary-android.md`, `docs/reference/android-capability-matrix.md`, etc.). **Verify at plan time** whether the v1.15 EEE retrofit shifted any of these pinned line numbers — the EEE header-block insertion (a new line near the top of every retrofitted file) and Version-History row insertions are exactly the kind of edit that shifted these same pins by +1/+2 at Phase 62/68 (Apple Business banner) and Phase 112 (802.1X shifts). None of the pinned files (`_glossary-android.md`, `android-capability-matrix.md`) are in the Phase-1 EEE retrofit scope (L1/L2 runbooks, admin-setup guides, reference docs) per REQUIREMENTS.md's explicit v1.16 deferral of "glossaries ... structural classes" — **however**, `docs/reference/android-capability-matrix.md` IS in RETRO-03's reference-doc retrofit scope (confirmed: `RE-144`, retrofitted in Phase 118) and DID receive an EEE header block + Version-History row. **This means the C1/C2/C7 sidecar line-pins against `android-capability-matrix.md` almost certainly shifted and MUST be re-verified/repointed, not copied verbatim.** Run `node scripts/validation/v1.14-milestone-audit.mjs` against current HEAD first to see which checks (if any) already FAIL due to stale pins before assuming a clean copy suffices — this is the single highest-probability "silent copy-error" site in this artifact class.

The `c13_rotting_external.quarterly_audit.next_review` field (currently `"2027-01-01"`) may also need a refreshed cadence date — verify against current date (2026-07-06) and the quarterly cron schedule (`0 8 1 1,4,7,10 *`).

#### 3. `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_19 comment addition only

Append a new comment paragraph after the existing BASELINE_18 block (line 473), following the exact template of the 9 prior refresh paragraphs:
```javascript
// BASELINE_19 refreshed <DATE> (Phase 119 Plan <NN>): closes BASELINE_18 v1.14 carry-over
// per HARN-03 contract (REQUIREMENTS.md + ROADMAP.md Phase 119 SC#1); v1.15 line positions
// verified against HEAD <PRE-ATOM-1 SHA — captured via `git rev-parse HEAD` immediately
// before authoring Atom 1, NOT the Wave-0 plan-creation commit; see Common Pitfalls #4>.
// BASELINE_9 entries above remain unchanged -- Phase 119 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 119
// close and remain valid for the v1.15 corpus. Resolution path: BASELINE_20 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.14 -> BASELINE_18 -> v1.15 -> BASELINE_19).
```
Do NOT touch the `BASELINE_9` array itself (9 fixed line-coordinate entries, all against pre-Phase-43 Android files) unless a live `--self-test` run shows a FAIL. Do NOT touch the `v1.7-audit-allowlist.json` self-test references (Pitfall 5).

#### 4. `scripts/validation/_lib/frozen-at-close.mjs` — one-line V114 addition + export

Insert after the `V113` entry (line 44), before the `V14 omitted` comment block:
```diff
  V113: 'ba24f1a',  // Phase 100 Plan 100-04 close-gate — v1.13 milestone close-gate (docs(100-04);
                    // 4-doc traceability + v1.13 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                    // Single entry (v1.13 closed in ONE commit; atom == close-gate;
                    // no separate closegate entry — V18/V19/V110/V111/V112 single-entry pattern applies).
+ V114: '7d922a7',  // Phase 112 Plan 112-05 close-gate — v1.14 milestone close-gate.
+                   // Single entry (v1.14 closed in ONE commit; atom == close-gate;
+                   // no separate closegate entry — same single-entry pattern as V18..V113).
  // V14 omitted — ...
```
And append the convenience export after line 80:
```diff
  export const readAtV113Close      = (p) => readAtClose('V113',         p);
+ export const readAtV114Close      = (p) => readAtClose('V114',         p);
```
**Verify the literal SHA `7d922a7` is correct before committing** — CONTEXT.md/STATE.md both assert it as "the v1.14 close-gate SHA," and the v1.14-MILESTONE-AUDIT.md's `{phase_112_close_SHA}` placeholder is the SAME value (the audit doc explicitly documents its own recovery command: `git log --all --grep="112-05" --grep="close-gate" --all-match -1 --format=%H`). Run that exact command at plan/execution time to positively confirm `7d922a7` resolves, rather than trusting the CONTEXT.md-transcribed value blind — this is a single point of failure for the entire re-baseline (a wrong SHA here silently reads the wrong frozen-corpus state for any future validator that adopts `readAtV114Close`).

#### 5. `scripts/validation/check-phase-113.mjs` through `check-phase-118.mjs` — 6 new lightweight leaf validators

None exist on disk (confirmed via glob + git log — the highest existing file is `check-phase-112.mjs`). Author each following the `check-phase-101.mjs`/`check-phase-96.mjs` "lightweight, NO chain, needles derived inline" template exactly:

```javascript
#!/usr/bin/env node
// check-phase-113.mjs -- Phase 113 deliverables (Conversion Pipeline Lock + Representative-Set
// Grounding Validation)
//
// v1.15 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-119.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 pattern, inherited from check-phase-96/101 precedent):
// Phase 113 shipped without a needle-spec hand-off; no retroactive 113-NEEDLE-SPEC.md exists.
// Needles sourced from 113-VERIFICATION.md "Required Artifacts" + "Observable Truths" tables.
//
// Assertion classes (derive from 113-VERIFICATION.md, read this session):
//   V-113-PRESENCE-OOXML   scripts/pipeline/lib/ooxml.mjs exists + non-empty
//   V-113-PRESENCE-GUARD   scripts/pipeline/guard-docx.mjs exists + non-empty
//   V-113-PRESENCE-CONVERT scripts/pipeline/convert.ps1 exists + non-empty
//   V-113-VERSION-PIN      convert.ps1 contains "$expectedVer = '3.7.0.2'"
//   V-113-README-SC3       scripts/pipeline/README.md contains the SC3 deployment-policy heading
//   V-113-SELF             CHAIN_PHASES does NOT include 113 AND CHAIN_SKIP is empty Set
//
// Usage: node scripts/validation/check-phase-113.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
const checks = [];
// ... presence + needle checks per the table above ...
checks.push({
  id: 'SELF',
  name: 'V-113-SELF: CHAIN_PHASES does NOT include 113; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(113)) return { pass: false, detail: 'CHAIN_PHASES includes 113 -- self-reference regression' };
    if (CHAIN_SKIP.size !== 0) return { pass: false, detail: 'CHAIN_SKIP non-empty' };
    return { pass: true, detail: 'CHAIN_PHASES = [] (113 absent); CHAIN_SKIP = []' };
  }
});
// ... runner loop verbatim from check-phase-101.mjs ...
```

Repeat the same shape for 114 (source: `114-VERIFICATION.md` — EEE-SOP-standard.md presence + D1-map-20-entries + templates), 115 (source: `115-VERIFICATION.md` — c17-eee-contract.mjs presence + fixture presence + self-test-exit-0, **noting** 115-VERIFICATION.md's own "Deferred Items" table explicitly assigns "C17 registered in the harness chain" to Phase 119 — so `check-phase-115.mjs` should assert presence/self-test of the standalone script, NOT assert chain registration; that assertion belongs in the C17-fold work item above, not here), 116/117/118 (source: each phase's `*-VERIFICATION.md`, not yet read in full this session — **read all three before authoring their needle checks**; each phase's registry-flip-to-Approved event and C17-exit-0 confirmation are the natural needle candidates, mirroring 118-PATTERNS.md's "SC-[batch]-ENROLL / SC-[batch]-C17" two-part convention).

#### 6. `scripts/validation/check-phase-119.mjs` — new apex

Fork `check-phase-112.mjs` verbatim, with these substitutions:
```diff
- const HARNESS = 'scripts/validation/v1.14-milestone-audit.mjs';
+ const HARNESS = 'scripts/validation/v1.15-milestone-audit.mjs';

- // Phase 112 chain-apex extends the chain through Phase 111 (every integer 48..111).
- // 64 entries: integers 48 through 111 inclusive.
- const CHAIN_PHASES = [48,49,50, ... ,111];
+ // Phase 119 chain-apex extends the chain through Phase 118 (every integer 48..118).
+ // 71 entries: integers 48 through 118 inclusive. [48..N-1] invariant: N=119, apex EXCLUDES 119.
+ const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
+                       67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
+                       86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,
+                       104,105,106,107,108,109,110,111,112,113,114,115,116,117,118];

  const CHAIN_SKIP = new Set([]);  // unchanged -- NEVER add entries

- if (CHAIN_PHASES.includes(112)) { ... }
+ if (CHAIN_PHASES.includes(119)) { ... }
```
The `resolveArchivedPhasePath` call for `V-119-AUDIT` targets `119-VERIFICATION.md` under the current phase directory (`119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/`). Both `_lib/archive-path.mjs` and `_lib/exec-fail-detail.mjs` are stable, unmodified dependencies (confirmed present, last touched Phase 111 TOOL-01, no changes needed).

#### 7. `.github/workflows/audit-harness-v1.14-integrity.yml` → `.github/workflows/audit-harness-v1.15-integrity.yml`

Confirmed structure (313 lines, 15 jobs total: `parse` → `path-match` → `harness-run` → [`linux-chain-ubuntu-latest` + `check-phase-101`..`check-phase-112` (12 parallel jobs)] → `rotting-external-quarterly` + `pin-helper-advisory`).

Exact repoints:
```diff
- name: Audit Harness v1.14 Integrity
+ name: Audit Harness v1.15 Integrity

  on:
    pull_request:
      paths:
-       - 'scripts/validation/v1.14-*'
+       - 'scripts/validation/v1.15-*'
        - 'scripts/validation/check-phase-*.mjs'
-       - '.github/workflows/audit-harness-v1.14-integrity.yml'
+       - '.github/workflows/audit-harness-v1.15-integrity.yml'
        - '.planning/REQUIREMENTS.md'
-       - '.planning/milestones/v1.14-MILESTONE-AUDIT.md'
-       - '.planning/milestones/v1.14-DEFERRED-CLEANUP.md'
+       - '.planning/milestones/v1.15-MILESTONE-AUDIT.md'
+       - '.planning/milestones/v1.15-DEFERRED-CLEANUP.md'
```
(`scripts/validation/check-phase-*.mjs` is already a wildcard — no change needed there.)

Every `v1.14-audit-allowlist.json` / `v1.14-milestone-audit.mjs` string inside job steps (parse job's inline node -e script, path-match job's grep target, harness-run job's invocation) → `v1.15-*`. The `check-phase-101`..`check-phase-112` job block (12 jobs, lines 94–260) is replaced with `check-phase-113`..`check-phase-119` (7 jobs — fewer jobs than v1.14 since v1.15 has 6 content phases + 1 apex vs v1.14's 11 content phases + 1 apex). The `linux-chain-ubuntu-latest` job's comment/command changes from `check-phase-112.mjs` (spawns 48..111) to `check-phase-119.mjs` (spawns 48..118); update the `CHAIN_TIMING_LINUX` notice text accordingly. The header-comment line 2 (`v1.4 + v1.4.1 + ... + v1.13 harnesses frozen`) gains `+ v1.14`; the `11th coexistence workflow` → `12th coexistence workflow` language throughout comments.

Preserve VERBATIM (per D-119-2 rider + CONTEXT.md explicit instruction): `linux-chain-ubuntu-latest`'s `core.autocrlf false` (set BEFORE checkout), `fetch-depth: 0`, `continue-on-error: false`, `timeout-minutes: 30`. Preserve the two apparently-redundant apex invocations (Pitfall 6) — do not deduplicate.

## State of the Art

| Old Approach (v1.14, Phase 112) | Current Approach (v1.15, Phase 119) | When Changed | Impact |
|--------------|------------------|--------------|--------|
| No C17 in the Path-A harness (content verification routed entirely to phase-scoped `check-phase-101..111.mjs`) | C17 folded into `v1.15-milestone-audit.mjs` as check id 17 (subprocess-spawn of `c17-eee-contract.mjs`) | This phase (HARN-03) | First milestone where the Path-A harness itself gates a corpus-wide structural-lint contract, not just semantic-terminology/link checks |
| Frozen-surface byte-unchanged invariant protected for ALL predecessor surfaces | Phase-1 frozen surfaces (docs `docs/l1-runbooks/`, `docs/admin-setup-*/`, `docs/reference/`, `docs/error-codes/`) DELIBERATELY re-pinned; non-Phase-1 surfaces (harness `.mjs`/sidecar/workflow files v1.4–v1.14) remain byte-unchanged | This phase (HARN-02) | First deliberate INVERSION of the byte-unchanged invariant — a new class of "intentional re-pin" now coexists with "protect forever" for different surface categories |
| C5/C10 freshness threshold: 60d→90d (v1.14's own invariant-loosening) | No freshness-threshold change this milestone (v1.15 does not touch Android/Linux freshness cadence) | N/A this phase | Simpler Atom-1 diff than v1.14's — the ONLY C1-C16 behavioral change this phase should make is none; a diff touching C5/C10 logic would be an unexpected regression, not an intentional change |

**Deprecated/outdated:** None specific to this phase's artifact classes — the Path-A lineage pattern itself (12 prior milestones) is stable and is being extended, not replaced.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The literal SHA `7d922a7` is the correct v1.14 close-gate commit | Code Examples §4 | If wrong, `readAtV114Close()` silently reads the wrong frozen corpus state for any future validator/remediation that adopts it — MUST be positively re-verified via the documented `git log --grep` recovery command before committing, not merely transcribed from CONTEXT.md |
| A2 | Subprocess-spawn (not inline-copy) is the correct C17-fold mechanism | Code Examples §1, Don't Hand-Roll | If the plan/executor instead inline-copies the 13 assertions, two divergence-prone copies of D1_MAP/assertion-numbering logic result; this is a recommendation grounded in precedent (check-phase-112's AUDIT-HARNESS pattern) and c17-eee-contract.mjs's own header comment, but the EXACT fold mechanics were never locked by CONTEXT.md (it is Claude's Discretion-adjacent, not explicitly enumerated as a discretion item) — confirm at plan time |
| A3 | `docs/reference/android-capability-matrix.md`'s sidecar line-pins (C1/C2/C7 exemptions) shifted due to its Phase-118 EEE retrofit and need re-verification, not verbatim copy | Code Examples §2 | If the pins were NOT re-verified and the file's C1/C2 SafetyNet/supervision lines actually shifted, `v1.15-milestone-audit.mjs` will silently FALSE-FAIL (or worse, false-pass on a genuinely new unpinned violation) on first run — this is inferred from the file's known retrofit status, not from actually running the harness against current HEAD this session |
| A4 | The representative-set Draft-probe should use a real-content doc with a test-only frontmatter mutation (status: draft), rather than a synthetic file or a template file | Common Pitfalls #2 | This is a recommended resolution to a genuine rider conflict CONTEXT.md left unreconciled at this granularity — not a locked decision; the user should confirm this approach (or an alternative) before the PIPE-02-CLOSE-RUNBOOK is authored |
| A5 | `check-phase-116.mjs`/`117.mjs`/`118.mjs` needle derivation is fully supported by each phase's `*-VERIFICATION.md` "Required Artifacts" tables | Code Examples §5 | These three VERIFICATION.md files were confirmed to EXIST this session but their internal table contents were NOT read in full (only 113/114/115 were read in depth) — the planner/executor MUST read all three before authoring those three check-phase files; if their tables are structured differently or lack sufficiently unique needle strings, additional research may be needed at plan time |

**If this table is empty:** N/A — five assumptions listed above, all flagged for plan-time confirmation.

## Open Questions

1. **Draft-label probe vs. real-corpus-only rider (the D-119-1 tension)**
   - What we know: No real `RE-NNN` doc has `status: Draft` (verified via corpus-wide grep). D-119-1 mandates BOTH "actual shipped RE-NNN Status: Approved docs" AND "a Draft-label retrieval probe."
   - What's unclear: Whether the user intends a test-only frontmatter mutation of a real Approved doc (Assumption A4's recommendation), reuse of a template file (`docs/_templates/*.md`, which ARE real committed files with genuine `status: Draft`, though they are scaffolding, not shipped content), or a hybrid.
   - Recommendation: Surface this explicitly to the user at plan time (or via `/gsd-discuss-phase` if not already resolved) rather than silently picking one option — it affects what "PASS" means for one of the four mandatory probe legs.

2. **Exact C17-fold implementation location and error-surface granularity**
   - What we know: c17-eee-contract.mjs is self-executing; subprocess-spawn is architecturally consistent with the existing AUDIT-HARNESS pattern.
   - What's unclear: Whether C17's assertion-level detail (13 separate assertion IDs, machine-readable counts-by-assertion line) should be surfaced through the single pass/fail check-17 result, or whether the fold should capture and forward the full stdout detail (the `execFailDetail` helper already exists in `_lib/exec-fail-detail.mjs` for exactly this purpose, per TOOL-01).
   - Recommendation: Use `_lib/exec-fail-detail.mjs`'s helper for the failure-detail formatting (DRY, in-repo, zero new code) rather than a hand-rolled slice/trim.

3. **Whether any NEW frozen-audit-vs-live-corpus collision class exists for v1.15 beyond what v1.14's Plan 112-06 already fixed**
   - What we know: v1.14's remediation completed the NESTED-guard doctrine across the full predecessor cohort (48/60/61-66/67-74/82/88/93/95/100) and frozen-aware-converted 6 content assertions. This should mean the SAME collision class (frozen-audit AUDIT-step re-running against live corpus) is now largely closed for those predecessors.
   - What's unclear: Whether the EEE retrofit's specific edit shape (header-block insertion, Version-History row insertion) trips a DIFFERENT, not-yet-guarded assertion class in validators 96-99/101-111 (i.e., ones added AFTER Phase 112's remediation, which by definition v1.14's fix couldn't have covered).
   - Recommendation: Do not assume v1.14's remediation fully inoculates v1.15 — budget the emergent remediation slot per D-119-3/C1 regardless, and treat any RED result as informative (which specific validator/assertion class) rather than surprising.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `.mjs` validator authoring/execution | ✓ | v24.17.0 (local; CI pins `20`) | — |
| git CLI | Frozen-SHA reads, fresh-clone Axis 1, byte-unchanged diffs | ✓ | 2.51.0.windows.2 | — |
| `gh` CLI (authenticated) | Dispatching/polling Axis-2 GHA workflow run | ✓ | 2.81.0, logged in as Schweinehund (github.com, workflow scope) | — |
| Docker Desktop | Optional local Linux corroboration (NOT authoritative; Claude's Discretion item) | ✓ | 29.2.0 | Skip — GHA is authoritative regardless per D-119-2/B1 |
| WSL2 (docker-desktop distro) | Same as above | ✓ | Confirmed present via `wsl --list` | Same as above |
| Live Copilot Studio / SharePoint access | PIPE-02-CLOSE grounding queries | ✗ (agent has none; owner-run) | — | Owner executes `PIPE-02-CLOSE-RUNBOOK.md` manually — this is the LOCKED A1 resolution, not a gap to fill |

**Missing dependencies with no fallback:** None — the one "missing" dependency (live Copilot Studio access) already has its locked fallback (owner-run) baked into D-119-1.
**Missing dependencies with fallback:** None beyond the above.

## Validation Architecture

Skipped — `.planning/config.json` sets `workflow.nyquist_validation: false` explicitly.

## Security Domain

`.planning/config.json` does not set `security_enforcement` (absent = enabled per protocol), so this section is included for completeness, matching the pattern established in Phases 116/117/118's research. This phase has effectively no security surface: it is harness-authoring (Node.js scripts operating on the local git repo and filesystem) + CI-workflow authoring (GitHub Actions YAML) + milestone-audit documentation. No user input, network service, authentication, or session surface is introduced.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface; `gh` CLI auth is an existing out-of-band operator credential, not something this phase configures |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Yes (narrow) | The harness scripts' own file-existence/parse-error-degradation guards (`parseAllowlist()`'s try/catch-to-empty-array pattern, `existsSync` checks before every `readFileSync`) — carried verbatim from the existing convention |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

Not applicable in the injection/auth/crypto sense. The one process-level risk worth naming: `execFileSync` subprocess spawns (both the pre-existing `check-phase-112.mjs`→harness pattern and the new C17-fold) always invoke `node <literal-relative-path>` with NO shell interpolation and NO user-controlled input in the argument list — this is the safe form (`execFileSync` with an argument array, not `execSync` with a concatenated string), and the new C17-fold code should follow the identical safe form, never introduce string-concatenated shell invocation.

## Sources

### Primary (HIGH confidence — read in full or executed this session)

- `scripts/validation/v1.14-milestone-audit.mjs` — read in full (982 lines)
- `scripts/validation/v1.14-audit-allowlist.json` — read in full (531 lines)
- `scripts/validation/_lib/frozen-at-close.mjs` — read in full (81 lines)
- `scripts/validation/regenerate-supervision-pins.mjs` — read BASELINE comment block + self-test section (lines 1-60, 380-510)
- `scripts/validation/check-phase-112.mjs` — read in full (198 lines, the apex fork-base)
- `scripts/validation/check-phase-101.mjs` / `check-phase-96.mjs` — read (the lightweight leaf-validator fork-base + needle-derivation precedent)
- `scripts/validation/c17-eee-contract.mjs` — read header/D1_MAP block + tail/runner block (the C17 fold-source, confirms self-executing/no-exports shape and its own Phase-119 fold directive)
- `scripts/validation/_lib/archive-path.mjs` — read in full (30 lines)
- `.github/workflows/audit-harness-v1.14-integrity.yml` — read in full (313 lines)
- `.planning/milestones/v1.14-MILESTONE-AUDIT.md` — read in full (391 lines, the close-narrative template)
- `.planning/phases/113-.../PIPE-02-RUNBOOK.md` + `PIPE-02-FINDINGS.md` — read in full (the PIPE-02-CLOSE fork basis)
- `.planning/phases/113-.../113-VERIFICATION.md`, `114-.../114-VERIFICATION.md`, `115-.../115-VERIFICATION.md` — read in full (needle-derivation source; 116/117/118 confirmed to exist but not read in full this session — flagged in Assumptions Log A5)
- `docs/_registry/RE-index.md` — read header + grepped (`Approved`/`Draft`/`Pending` row counts; Linux + error-codes rows)
- `.planning/phases/119-.../119-CONTEXT.md`, `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `.planning/ROADMAP.md` §Phase 119, `.planning/config.json` — read in full
- Live commands executed this session: `node --version`, `git --version`, `gh --version`, `gh auth status`, `docker --version`, `wsl --list --quiet`, `grep -c "| Approved |"`/`"| Draft |"`/`"| Pending |"` against RE-index.md, `grep -rl "^status: Draft" docs/`, `git log --follow` for check-phase-96/101 authorship, `git merge-base --is-ancestor` for the Wave-0-vs-BASELINE-anchor SHA ordering proof, `for i in 48..118` existence loop confirming exactly six missing check-phase files (113-118)

### Secondary (MEDIUM confidence)

- `.planning/phases/118-.../118-PATTERNS.md` — read in full for the RETRO-03 registry/enrollment convention cross-reference (not a check-phase artifact itself, but confirms the "SC-[batch]-ENROLL/SC-[batch]-C17" needle-naming convention used as a model for check-phase-116/117/118 authoring)
- `.planning/phases/117-.../117-08-SUMMARY.md`, `117-CONTEXT.md`, `117-PATTERNS.md`, `117-RESEARCH.md` — grepped for the RE-128/mermaid-deferred confirmation (Pitfall 3)

### Tertiary (LOW confidence)

- None — every claim in this document is either a direct file read, a live command execution, or an explicit CONTEXT.md/STATE.md/ROADMAP.md citation this session.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; every tool version confirmed live this session
- Architecture (D1 skeleton, file-by-file diffs): HIGH — every artifact class has a byte-read v1.14 analog; exact repoint strings extracted from the real files, not recalled
- Pitfalls: HIGH — all six pitfalls are grounded in either a live grep/glob/git-log this session or a direct quote from an existing VERIFICATION/SUMMARY/CONTEXT doc, not speculation
- Open Questions: MEDIUM — these are genuine unresolved tensions in the locked CONTEXT.md riders, correctly surfaced rather than silently resolved by this research pass

**Research date:** 2026-07-06
**Valid until:** Effectively the lifetime of this single phase (harness-lineage-bump phases are one-shot, non-recurring within a milestone) — no meaningful staleness window; if Phase 119 planning is delayed by more than a few days, re-verify the `7d922a7` SHA claim and re-run the `grep -c "| Approved |"` registry count (RE-index.md rows could shift if a mid-milestone data-migration touches the registry, though none is currently planned).
