# Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Context

**Gathered:** 2026-06-25
**Status:** Ready for planning

<domain>
## Phase Boundary

The **terminal close-gate of v1.11** — the **9th** Path-A milestone harness in the lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → **v1.11**. Direct **Path-A twin of Phase 82** (v1.9 close) and Phase 88 (v1.10 close). **Tooling-ONLY** (no `docs/*` corpus edits — v1.11's content shipped in Phases 89–92). Ships 3 requirements: **HARN-01, HARN-02, HARN-03**. Depends on Phase 92 — the harness is authored LAST (ALL content phases 89–92 committed before any `check-phase-NN.mjs` is authored and before the V110 SHA is consumed; AP-5 anti-pattern prevention).

**What this phase delivers (locked by ROADMAP SC#1–4 + REQUIREMENTS HARN-01..03):**

- **HARN-01 (Atom 1, indivisible)** — `scripts/validation/v1.11-milestone-audit.mjs` Path-A copy from `v1.10-milestone-audit.mjs` (**C1–C16 inherited verbatim; NO new C-category**; 9th milestone in the lineage; self-test PRESERVED) + `scripts/validation/v1.11-audit-allowlist.json` Path-A copy (`c13_rotting_external` reset for v1.11; `quarterly_audit` cadence carried forward) + **BASELINE_15** freshness comment in `regenerate-supervision-pins.mjs` (closes BASELINE_14 v1.10 carry-over).
- **HARN-02 (Atom 2, indivisible)** — Per-phase validators **`check-phase-89.mjs` through `check-phase-93.mjs` — ALL 5 NET-NEW** + `_lib/frozen-at-close.mjs` gains a **`V110`** entry (`a3617e9`) + **`readAtV110Close`** export + `.github/workflows/audit-harness-v1.11-integrity.yml` as the **8th** parallel CI coexistence workflow (predecessors v1.4–v1.10 byte-unchanged). **⚠ DIVERGENCE from v1.9/v1.10: the `frozen-at-close.mjs` V110 entry rides ATOM 2 here (per ROADMAP SC#2 + HARN-02), NOT Atom 1.** Still ordering-safe: `a3617e9` is a known-PAST SHA and `check-phase-93` reads only PRIOR-milestone closes.
- **HARN-03** — 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` into `$env:TEMP\v1.11-audit-<rand>` + Axis 2 cross-OS Linux GHA `workflow_dispatch` + Axis 3 fresh sub-agent zero-context-carryover; cross-OS PASS/FAIL/SKIP **EXACT MATCH** across the 7-validator cross-OS-applicable set — see D-03) + `v1.11-MILESTONE-AUDIT.md` (canonical `.planning/milestones/`, Path-A from v1.10) + `v1.11-DEFERRED-CLEANUP.md` (canonical `.planning/milestones/`, Path-A from v1.10) + 4-doc traceability closure (PROJECT/ROADMAP/STATE/REQUIREMENTS — all **15 v1.11 reqs Validated**).

**Entry-state (verified 2026-06-25, Phase 92 closed):**
- `scripts/validation/check-phase-89..93.mjs` **ALL MISSING** → all 5 are net-new this phase.
- `scripts/validation/_lib/frozen-at-close.mjs` `MILESTONE_CLOSE_SHAS` last entry = **V19** — **no V110, no `readAtV110Close`**.
- **V110 SHA = `a3617e9`** (`docs(88-04): Phase 88 close-gate — v1.10 MILESTONE CLOSE`; **single-commit close** — verified: following `9a0a9a9`/`6315581`/`3888555`/`ae1ee45` are archive/jira chores, NOT part of the atom).
- **BASELINE_14** is the current freshest (v1.10, Phase 88) → BASELINE_15 closes it.
- 7 existing `audit-harness-*-integrity.yml` workflows → v1.11 is the **8th**.
- Predecessor v1.4–v1.10 frozen surfaces (workflow YAMLs + milestone-audit MJS + sidecar JSONs) BYTE-UNCHANGED. (Chain validators `check-phase-{48..92}.mjs` are NOT in that invariant.)
- v1.11 reqs: 12 Complete (PROV/MIG/RUN/REF/NAV) + 3 HARN Active = **15 total**.

**Out of scope (Phase 93 owns nothing else):**
- Any `docs/*` corpus edits — v1.11 Phase 93 is **tooling-ONLY**.
- Modification to v1.4–v1.10 workflow YAMLs + milestone-audit MJS + sidecar JSONs — predecessor-byte-unchanged invariant.
- A new **global blocking C17 category** — D-01 routes the Phase-92 nav-hub edges to a phase-scoped `check-phase-92.mjs` assertion instead (keeps the Path-A C1–C16-verbatim lineage pristine). v1.11 ROADMAP has NO C17 conditional at all.
- Re-asserting **V-63-08/V-63-09 blob-hash pins** inside `check-phase-91` — `check-phase-63.mjs` already owns them (updated by Phase 91 in atomic commit `7039630`, replayed every apex run). D-01 defers to check-phase-63 to avoid a two-place-update hazard.
- A chicken-and-egg **Commit A** — D-04 grep-proved no v1.11 artifact forward-references the close SHA.
- A second **`V110_CLOSEGATE`** frozen entry — v1.10 closed in a single commit (atom == close-gate).
- **Worktree-based execution** — `.planning/config.json` `use_worktrees:false` durable per memory `project_execphase_sequential.md`. The Axis-1 `git clone --no-hardlinks` into TEMP is auditor-independence, NOT a worktree experiment.
- **Working-tree cruft cleanup** (stale `.claude/worktrees/agent-*`, `TEMP*.txt` junk, `docs.zip`, `scratchpad/`, etc.) — D-04 leaves untouched; deletion of the stray pre-close `.planning/v1.11-MILESTONE-AUDIT.md` is deferred to `/gsd-complete-milestone` (mirrors v1.10's `3888555`).

</domain>

<decisions>
## Implementation Decisions

All four gray areas resolved via 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder argues FOR each option, Adversary AGAINST, Referee scores; **lower = better**) per user memory `feedback_adversarial_review_preference` + `feedback_effort_level`, and the user's explicit instruction "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning." Each advisor read REQUIREMENTS/ROADMAP/STATE + the Phase 82 (v1.9) AND Phase 88 (v1.10) precedents + the actual source files. User approved all 4 via single "Approve all 4 — write CONTEXT.md" selection. Full dossiers at `.claude/tmp/phase93-D{01,02,03,04}-advisor.md`.

### D-01: Per-phase validator content — Option C "concentrate cross-link net in check-phase-92; 89/90/91 lightweight" (score **C=3** / B=5 / A=8 / D=12)

**Decision:** Re-apply Phase 82 D-01's routing exactly, adapted to v1.11's single cross-link deliverable (Phase 92 nav-hub edges).

- **`check-phase-89/90/91`** = lightweight `V-NN-PRESENCE` + `V-NN-SELF` only (mirrors the v1.10 84–87 shape; each v1.10 validator header literally cites "Phase 88 D-01" as the authority). PRESENCE targets: 89 → `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`; 90 → `docs/l2-runbooks/30-macos-mdm-migration-failure.md`; 91 → `docs/_glossary-macos.md`.
- **`check-phase-92`** = `V-92-SELF` + a hard-asserted **`V-92-CROSSLINK-E1..E8`** net using the `check-phase-81.mjs` FORM (`{id, file, needle}` array, CRLF-normalizing file read, forward-slash substring `includes()`, NO allowlist/sidecar). The 8 needles are line-cited to `92-VERIFICATION.md` (L54–63) and `89-VERIFICATION.md` (L36) in the dossier — plan-phase confirms them against `92-VERIFICATION.md`.
- **`check-phase-93`** = chain-apex ONLY (Path-A from `check-phase-88`: `CHAIN_PHASES=[48..92]`, `CHAIN_SKIP = new Set([])`, V-93-SELF guard excludes 93).
- **V-63-08/V-63-09: `check-phase-91` does NOT re-assert them — DEFER to `check-phase-63`**, which owns the `BASELINE` blob-hash pins (lines ~202–242), was already updated by Phase 91 in atomic commit `7039630`, and is replayed every apex run via the chain. Re-asserting would create a two-place-update hazard.
- **No C17** — v1.11 ROADMAP locks "C1–C16 inherited" with no C17 conditional hook at all (Option D scored 12, strong reject; over-scopes a phase-specific deliverable into a cross-milestone-global category inherited by all future milestones).

**Decisive wedge:** milestone-audit C13 does NOT crawl internal links locally (only validates allowlist shape; mlc sweep is CI-deferred), and `92-VERIFICATION.md:89` confirms the harness is currently BLIND to Phase 92's nav edges → there IS a real durable net to add, and the project already homes such phase-scoped deliverables in per-phase validators (Phase 82's V-81-CROSSLINK precedent).

### D-02: Plan layout & atom→commit mapping — Option A "4-plan / 5-commit (Phase 82 + Phase 88 lineage skeleton)" (score **A=3** / B=9 / C=12 / D=14)

**Decision:** 4 plans, 5 commits — the ratified lineage invariant (Phase 82 chose it via D-02; **Phase 88 reproduced it verbatim**). Sequential on main tree (`use_worktrees:false`).

```
Plan 93-01 (conventions + Atom 1)
  Wave 1: 93-CONVENTIONS.md (freshness/SHA matrix + locked strings) — COMMIT 1
          docs(93-01): 93-CONVENTIONS.md — Phase 93 constants lock
  Wave 2: ATOM 1 (HARN-01) — INDIVISIBLE commit (3 files) — COMMIT 2
          v1.11-milestone-audit.mjs (Path-A from v1.10, C1-C16 verbatim, self-test preserved)
          + v1.11-audit-allowlist.json (c13 reset for v1.11; quarterly_audit carried)
          + BASELINE_15 freshness comment in regenerate-supervision-pins.mjs
          feat(93-01): v1.11 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)

Plan 93-02 (Atom 2 — HARN-02) — INDIVISIBLE commit (7 files) — COMMIT 3
  check-phase-89..93.mjs (5 NET-NEW; 93 chain-apex CHAIN_PHASES=[48..92], CHAIN_SKIP=Set([]);
  92 carries V-92-CROSSLINK-E1..E8 per D-01)
  + _lib/frozen-at-close.mjs: V110 = a3617e9 entry + readAtV110Close export
  + audit-harness-v1.11-integrity.yml (8th coexistence; new check-phase-89..93 jobs)
    feat(93-02): v1.11 validators + V110 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)
  *** MUST be committed AND pushed to origin/master before Plan 93-03 (D-03 ordering gate) ***

Plan 93-03 (HARN-03 3-axis re-audit — artifact-only commit) — COMMIT 4
  93-03-AUDIT-RESULTS.md (Axis 1 fresh-clone sub-agent + Axis 2 Linux GHA + Axis 3 fresh sub-agent;
  cross-OS EXACT MATCH across the 7-validator set per D-03)
    docs(93-03): HARN-03 3-axis terminal re-audit results (artifact-only)

Plan 93-04 (HARN-03 close-gate — SINGLE commit, NO Commit A per D-04) — COMMIT 5
  v1.11-MILESTONE-AUDIT.md (NEW canonical .planning/milestones/) + v1.11-DEFERRED-CLEANUP.md (NEW)
  + 93-VERIFICATION.md (NEW) + 4-doc traceability flip (PROJECT/ROADMAP/STATE/REQUIREMENTS —
  3 HARN reqs Active→Validated, 15/15)
    docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE
```

**Total commits:** 5. Atom 1 = exactly 3 files/1 SHA; Atom 2 = exactly 7 files/1 SHA — both independently revertable. Re-audit artifact, close-gate, and CONVENTIONS each isolated; CONVENTIONS is docs-only and cannot pollute either atom.

**Decisive wedge:** two consecutive milestones shipped this EXACT layout — no longer a gray area, a ratified invariant. Every deviation loses: B breaks re-audit/close-gate revert-isolation and the D-03→D-04 ordering gate; C re-adds the corpus-less 5th plan D-02 explicitly killed; D splits Atom 2 against mandate.

### D-03: 3-axis terminal re-audit (HARN-03) — Option A "full grown set, 7 standalone cross-OS rows" (score **A=7** / C=11 / B=14 / D=16)

**Decision:** Replicate the Phase 82/88 recipe, v1.11-relabeled, with the full net-new cross-OS-applicable set.

- **Cross-OS-applicable validator set = 7:** `v1.11-milestone-audit.mjs` + `check-phase-88.mjs` (prior-apex continuity row) + the **5 net-new** `check-phase-89/90/91/92/93.mjs`. Net-new 89–92 expect `2/0/0` each; continuity 88 carries the `42/0/1` baseline; apex 93 count comes from Linux GHA (~48/0/1, capture at audit time).
- **Axis 1 (local physical independence):** ONE fresh `gsd-executor` sub-agent runs a ~10-step PowerShell recipe — `$rand` over `[0-9a-z]` 8-char; `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.11-audit-<rand>`; assert cloned HEAD == source HEAD; run the **6 fast non-apex validators** + capture exit codes + PASS/FAIL/SKIP; `Remove-Item -Recurse -Force` + assert zero orphans.
- **Axis 2 (cross-OS):** main-session `gh workflow run audit-harness-v1.11-integrity.yml --ref master`; capture run URL + per-job conclusions + Linux chain timing. **The apex `check-phase-93` count is Linux-GHA SOLE-authoritative.**
- **Axis 3 (logical/context independence):** the SAME sub-agent as Axis 1 serves zero-context-carryover. **ONE dispatch covering two independence dimensions — do NOT spawn two agents** (Option D literalism scored 16).
- **Exclusions (with reasons):** `pin-helper-advisory` (CI-only advisory), `rotting-external-quarterly` (cron-only, SKIPs on workflow_dispatch — negative control), harness `--self-test` (folded into the milestone-audit row), inherited `check-phase-48..87` chain (covered transitively by apex 93 + continuity 88).
- **Artifact:** separate artifact-only commit `93-03-AUDIT-RESULTS.md`, consumed by the HARN-03 close-gate.

**Plan-ordering gate (HARD):** Plan 93-03 runs only AFTER Plan 93-02 (Atom 2) is committed AND **pushed to `origin/master`** — the workflow's check-phase-89..93 jobs FAIL (not skip) if absent from the dispatched ref. Pre-flight: Atom 2 on `origin/master` + `gh auth status` OK + v1.11 workflow `state:active`.

**Decisive wedge (two compounding):**
1. **Coverage** — `check-phase-88.mjs:78-80` confirms the apex spawns children with `CHECK_PHASE_NESTED=1`, returning a single `CHAIN-NN exits 0` line, never a cross-OS-diffable triplet. The 5 net-new validators are authored THIS session and have never run on Linux → each needs a STANDALONE row (B hides 89-92 → 14; C re-hides 88 → 11).
2. **Deep-nest (HARDENED beyond Phase 82)** — `88-03-AUDIT-RESULTS.md` shows `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` **ACTUALLY FIRED** at [48..87] (spurious warm-tree `41/1/1` truncation vs clean Linux `42/0/1`). Phase 93 is [48..92], +5 deeper and depth-monotone → the Windows apex is guaranteed unreliable, so the apex count is Linux-GHA **sole-authoritative** (stronger than Phase 82's "warm-tree × Linux cross-check"). Carry `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` forward to `v1.11-DEFERRED-CLEANUP.md` (update depth to [48..92]).

### D-04: Close-gate + DEFERRED-CLEANUP routing + v1.11 reconciliation — Option A across all 4 sub-decisions (scores **1.5–1.8**)

**Sub-decision 1 — V110 entry + Commit A (score A=1.8 / D=5.0 / C=6.5 / B=8.0):** ONE close-gate commit, **SINGLE `V110` entry** (no `V110_CLOSEGATE`), **NO Commit A**.
- **V110 = `a3617e9`** (`docs(88-04)` v1.10 close-gate) + `readAtV110Close = (p) => readAtClose('V110', p)` export (mirrors `readAtV19Close` shape). **Lands in ATOM 2** per D-02 (divergence from v1.9/v1.10 where the frozen entry rode Atom 1).
- **ONE entry, NOT two:** v1.10 closed in a SINGLE commit → atom == close-gate → a second `V110_CLOSEGATE` would be a dead, misleading export.
- **No Commit A:** grep proof — `grep -rn "V110\|readAtV110\|phase_9._close\|readAtV111" scripts/validation/` = EMPTY; `check-phase-93` (Path-A from check-phase-88) reads only PRIOR-milestone close SHAs, never its own future close SHA (RETRO-02 centralized frozen reads in `_lib/frozen-at-close.mjs`). `close_commit:` = literal `{phase_93_close_SHA}` placeholder, recoverable via `git log --all --grep="93-04" --grep="close-gate" --all-match -1 --format=%H`.

**Sub-decision 2 — DEFERRED-CLEANUP routing (score 1.5):** canonical `.planning/milestones/v1.11-DEFERRED-CLEANUP.md` (Path-A from v1.10). **No pre-existing `docs/v1.11-DEFERRED-CLEANUP.md`** (unlike v1.9) → no docs/ cross-link needed.
- **NEW v1.11 items:** Intune profile-based-enrollment config gap (Phase 90), Iru console device-deletion steps (Phase 90), supervision-status-post-migration (Phase 90), + any Phase 89 CR-01/WR-01/IN-01 residue.
- **CARRY verbatim** (DO NOT mask via deletion): all v1.10-DEFERRED-CLEANUP items (MTPSSO/KRBFUT futures, Part B v1.8 carry-forwards) + `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (update depth → [48..92]).
- **DROP** resolved reqs (PROV/MIG/RUN/REF/NAV — satisfied in 89–92).

**Sub-decision 3 — pre-close-audit reconciliation (score A=1.8 / C=5.5 / B=7.0):** the close-gate authors the canonical `.planning/milestones/v1.11-MILESTONE-AUDIT.md` (Path-A 7-section: Executive Summary + Phase Closure Narrative + 3-axis Auditor-Independence Verification + Methodology + Discoveries + Requirements Traceability 15/15 + sign-off). It **cross-links** the existing pre-close `.planning/v1.11-MILESTONE-AUDIT.md` (12/15, `gaps_found`) as evidence input. **Do NOT rewrite/touch/delete the stray pre-close file in the close-gate** — its deletion belongs to `/gsd-complete-milestone`.
- **What v1.10 did (decisive precedent):** `a3617e9` authored canonical `milestones/v1.10-MILESTONE-AUDIT.md`; a stray `.planning/v1.10-MILESTONE-AUDIT.md` (`6315581`, 138 lines) was later DELETED by the archive commit `3888555` (numstat `0 138`, pure deletion — confirmed GONE at HEAD). Phase 93 mirrors this boundary exactly.

**Sub-decision 4 — working-tree cruft (score A=1.5 / C=5.0 / B=6.5):** **leave untouched.** Phase 88 D-06 verbatim excluded cruft from both the close-gate and DEFERRED-CLEANUP — Phase 93 is tooling-only; cruft is out of scope. Keeps the close-gate a clean 7-file atom.

**Net close-gate:** ONE indivisible commit, 7 files (MILESTONE-AUDIT + DEFERRED-CLEANUP + 93-VERIFICATION + PROJECT/ROADMAP/STATE/REQUIREMENTS). **HARD gate:** `git diff <pre-Phase-93-SHA> HEAD -- <v1.4..v1.10 frozen surfaces>` returns EMPTY at close-gate commit time.

### Claude's Discretion (plan-phase author decides)
- **`93-CONVENTIONS.md` content** — freshness/SHA matrix + locked strings (mirror `74-CONVENTIONS.md`/`88-CONVENTIONS.md`): the 7-validator cross-OS-applicable set, V110 = `a3617e9`, BASELINE_15 anchor SHA, the 8 nav-edge needles for V-92-CROSSLINK.
- **Exact `$rand` charset + temp-dir cleanup assertions** in the Axis-1 sub-agent recipe — recommend `[0-9a-z]` 8-char; tune per the v1.10 `88-03` recipe.
- **V-92-CROSSLINK assertion form** — recommend substring class-signature (all 8 forward-slash edge needles present, CRLF-normalized read) over line-pinned; confirm the exact 8 needles against `92-VERIFICATION.md`.
- **BASELINE_15 anchor** — recommend a known-PAST SHA (mirrors BASELINE_14 anchoring to a past close), NOT the future Phase-93 close SHA.
- **Confirm V110 = `a3617e9`** on authoring day via `git log --grep="close-gate" --grep="v1.10" --all-match -1` (per STATE.md execution-time check) — already verified this session.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 93 contract docs
- `.planning/ROADMAP.md` — Phase 93 section: Goal + SC#1 (Atom 1: milestone-audit + allowlist + BASELINE_15) + SC#2 (Atom 2: check-phase-89..93 + **frozen-at-close V110 entry** + 8th coexistence workflow; predecessor byte-unchanged) + SC#3 (3-axis re-audit + cross-OS EXACT MATCH) + SC#4 (MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability 15/15)
- `.planning/REQUIREMENTS.md` — HARN-01/02/03 full text + Traceability table (v1.11 = 15 total)
- `.planning/STATE.md` — v1.11 phase dependency summary + "Blockers/Concerns" (Phase 93 execution-time check: confirm V110 = `a3617e9`) + the Phase 90 deferred-item sources

### Phase 82 (v1.9) + Phase 88 (v1.10) — DIRECT Path-A PRECEDENTS (the model for the whole phase)
- `.planning/milestones/v1.9-phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-CONTEXT.md` — the D-01..D-04 decision structure Phase 93 inherits (phase-scoped cross-link assertion / 4-plan layout / 3-axis auditor independence / single close-gate + NO Commit A)
- `.planning/milestones/v1.10-phases/88-harness-lineage-bump-terminal-re-audit-milestone-close/` — the **FRESHEST** precedent (88-CONTEXT.md + 88-01..88-04 plans + `88-03-AUDIT-RESULTS.md` cross-OS EXACT MATCH evidence + `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` firing evidence + 88-CONVENTIONS.md + 88-VERIFICATION.md)
- `.planning/milestones/v1.10-MILESTONE-AUDIT.md` — Path-A source for `v1.11-MILESTONE-AUDIT.md` (section skeleton)
- `.planning/milestones/v1.10-DEFERRED-CLEANUP.md` — Path-A source for `v1.11-DEFERRED-CLEANUP.md` (preserve carried items + add v1.11 new)

### Phase 89–92 — content-phase artifacts (READ BEFORE AUTHORING per-phase validators)
- `.planning/phases/92-navigation-hub-integration/92-VERIFICATION.md` (L54–63) — the 8 nav-edge needles for `check-phase-92` V-92-CROSSLINK; L89 confirms the harness is currently blind to them
- `.planning/phases/89-psso-provisioning-walkthrough/89-VERIFICATION.md` (L36) — additional cross-link needle source
- `.planning/phases/91-glossary-capability-matrix/91-VERIFICATION.md` — V-63-08/09 baseline update (commit `7039630`); confirms check-phase-63 ownership (DEFER, do not re-assert in check-phase-91)
- `.planning/phases/{89,90,91,92}-*/` SUMMARY + VERIFICATION — PRESENCE targets for check-phase-89/90/91

### Path-A sources (READ BEFORE AUTHORING)
- `scripts/validation/v1.10-milestone-audit.mjs` — Path-A source for `v1.11-milestone-audit.mjs` (C1–C16 verbatim; self-test)
- `scripts/validation/v1.10-audit-allowlist.json` — Path-A source for `v1.11-audit-allowlist.json` (c13 reset; `quarterly_audit` cadence)
- `scripts/validation/check-phase-88.mjs` — Path-A source for `check-phase-93.mjs` (CHAIN_PHASES → {48..92}; CHAIN_SKIP empty-Set; V-NN-SELF guard; `CHECK_PHASE_NESTED=1` child-spawn at L78-80 relevant to D-03)
- `scripts/validation/check-phase-84.mjs..87.mjs` — the lightweight `V-NN-PRESENCE` + `V-NN-SELF` shape for check-phase-89/90/91 (D-01)
- `scripts/validation/check-phase-81.mjs` — the `V-81-CROSSLINK-*` assertion FORM (`{id,file,needle}`, CRLF-normalized read, forward-slash substring) for `check-phase-92` V-92-CROSSLINK
- `scripts/validation/check-phase-63.mjs` — V-63-08/09 BASELINE blob-hash pins (lines ~202–242); the validator that OWNS them (D-01 defers here)
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (…V19; **no V110**) + `readAtClose` + convenience exports — the exact shape the `V110: 'a3617e9'` entry + `readAtV110Close` must follow
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_14 region; BASELINE_15 comment lands here (HARN-01); anchors to a known-PAST SHA
- `.github/workflows/audit-harness-v1.10-integrity.yml` — Path-A source for `audit-harness-v1.11-integrity.yml` (8th coexistence; `fetch-depth: 0`, `core.autocrlf false`, `continue-on-error: false`, `timeout-minutes: 30`; check-phase jobs; negative-control + advisory job structure)

### Advisor dossiers (full reasoning, for planner deep-dive)
- `.claude/tmp/phase93-D01-advisor.md` (95 lines) — validator content (Option C; concentrate cross-link net in check-phase-92; V-63-08/09 defer-to-63; 8-needle table)
- `.claude/tmp/phase93-D02-advisor.md` (89 lines) — plan layout (Option A; 4-plan/5-commit; V110-in-Atom-2 correction; exact commit map)
- `.claude/tmp/phase93-D03-advisor.md` (147 lines) — 3-axis re-audit (Option A; 7-validator set + exclusions; Linux-GHA-sole-authoritative apex; drop-in Axis-1 recipe + Axis-2 gh command; deep-nest evidence)
- `.claude/tmp/phase93-D04-advisor.md` (125 lines) — close-gate (Option A ×4; V110 single entry + grep proof; DEFERRED-CLEANUP routing; pre-close-audit reconciliation + v1.10 deletion precedent; cruft-untouched)

### Constraints / anti-regression
- `.planning/config.json` — `use_worktrees: false` durable per memory `project_execphase_sequential.md`
- Predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7/v1.8/v1.9/v1.10 workflow YAMLs + milestone-audit MJS + sidecar JSONs BYTE-UNCHANGED through close-gate (chain validators `check-phase-{48..92}.mjs` are NOT in the invariant)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Path-A milestone-audit template** — `scripts/validation/v1.10-milestone-audit.mjs` (C1–C16, self-test). `v1.11-milestone-audit.mjs` is a verbatim Path-A copy with v1.11 labels — no new C-category (D-01).
- **Path-A allowlist + sidecar** — `scripts/validation/v1.10-audit-allowlist.json` (`c13_rotting_external` + `quarterly_audit` cadence). v1.11 copy resets c13 for v1.11.
- **Path-A chain-apex validator** — `scripts/validation/check-phase-88.mjs` (CHAIN_PHASES → {48..87}; CHAIN_SKIP empty-Set; `CHECK_PHASE_NESTED=1` child-spawn at L78-80). `check-phase-93.mjs` Path-A copy → {48..92}.
- **Lightweight per-phase validator shape** — `scripts/validation/check-phase-84..87.mjs` (V-NN-PRESENCE + V-NN-SELF; each cites "Phase 88 D-01"). Model for check-phase-89/90/91.
- **Cross-link assertion FORM** — `scripts/validation/check-phase-81.mjs` (V-81-CROSSLINK-*; `{id,file,needle}`; CRLF-normalized; forward-slash substring). Model for check-phase-92 V-92-CROSSLINK-E1..E8.
- **Blob-hash pin owner** — `scripts/validation/check-phase-63.mjs` (BASELINE pins, lines ~202–242) — already updated by Phase 91 (`7039630`); check-phase-91 DEFERS (no re-assert).
- **Centralized frozen-aware helper** — `scripts/validation/_lib/frozen-at-close.mjs` (no V110 yet → confirms check-phase-93 reads only prior closes → NO Commit A). V110 = `a3617e9` + `readAtV110Close` added in Atom 2.
- **Path-A CI workflow** — `.github/workflows/audit-harness-v1.10-integrity.yml` (8th-coexistence target shape). v1.11 copy is the 8th parallel file.
- **3-axis re-audit recipe** — v1.10 `88-03-AUDIT-RESULTS.md` (Axis 1 fresh-clone sub-agent; Axis 2 GHA workflow_dispatch; Axis 3 same fresh sub-agent; the deep-nest firing evidence).
- **Close-gate pattern** — Plan 88-04 (single-commit; VERIFICATION.md + 4-doc traceability flip + literal `{phase_NN_close_SHA}` placeholder). The v1.10 stray pre-close audit deleted later by archive `3888555` (D-04 sub-3 precedent).

### Established Patterns
- **CHAIN_SKIP empty-Set invariant** — `check-phase-93.mjs` MUST declare `CHAIN_SKIP = new Set([])` (V-93-SELF enforces).
- **CHAIN_PHASES excludes validator's own phase** — `check-phase-93.mjs` CHAIN_PHASES = {48..92}; V-93-SELF asserts 93 not included (auditor-independence).
- **Atomic-commit indivisibility per ROADMAP SC#1** — Atom 1 (3 files) + Atom 2 (7 files) each land in ONE SHA.
- **Predecessor-byte-unchanged anti-regression** — `git diff <pre-93> HEAD -- <v1.4..v1.10 frozen surfaces>` EMPTY at close-gate.
- **CHECK_PHASE_NESTED=1 child-spawn** — chain children short-circuit to a single `CHAIN-NN exits 0` line → net-new 89–92 need STANDALONE cross-OS rows (D-03).
- **Deep-nest timeout is depth-monotone** — fired at [48..87] in v1.10; guaranteed at [48..92] → apex count Linux-GHA sole-authoritative (D-03).

### Integration Points
- **`scripts/validation/v1.11-milestone-audit.mjs`** — NEW; 9th in the milestone-audit lineage.
- **`scripts/validation/check-phase-89..93.mjs`** — 5 NEW validators (93 = chain-apex; future v1.12+ Path-A source). check-phase-92 carries V-92-CROSSLINK (D-01).
- **`scripts/validation/_lib/frozen-at-close.mjs`** — V110 = `a3617e9` + `readAtV110Close` (Atom 2).
- **`.github/workflows/audit-harness-v1.11-integrity.yml`** — NEW; 8th coexistence file; check-phase-89..93 jobs MUST be on `origin/master` before Plan 93-03 Axis 2 dispatch (D-03 ordering gate).
- **`.planning/milestones/v1.11-MILESTONE-AUDIT.md`** + **`v1.11-DEFERRED-CLEANUP.md`** — NEW canonical artifacts (cross-link the pre-close `.planning/v1.11-MILESTONE-AUDIT.md`, do NOT delete it).
- **PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md** — 4-doc traceability flip (3 HARN reqs Active→Validated; 15/15) in the single close-gate commit.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (memory `feedback_adversarial_review_preference`) — honored verbatim: 4 parallel `gsd-advisor-researcher` agents (Finder/Adversary/Referee scoring, lower = better). User explicitly instructed "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning." User approved all 4 in one selection.
- **User maximum-effort preference** (memory `feedback_effort_level`) — each dossier 89–147 lines with concrete operational recipes, drop-in pseudocode, anti-regression analysis, adversarial wedges.
- **Sequential-on-main-tree durable** (memory `project_execphase_sequential.md` + `.planning/config.json`). Plans 93-01..04 execute sequentially on the main tree. The Axis-1 `git clone --no-hardlinks` into TEMP is auditor-independence, NOT a worktree experiment.
- **V110 = `a3617e9`** — verified the v1.10 close-gate SHA (`docs(88-04)`, single-commit close). Lands in **Atom 2** (per ROADMAP SC#2 + HARN-02 — divergence from v1.9/v1.10).
- **Today's date is 2026-06-25.** Phase 93 discussion authoring date. No `docs/*` corpus edit → no frontmatter `last_verified:` bumps (tooling-only phase).
- **"8th coexistence file" locked** — coexists with the 7 prior audit-harness YAMLs (v1.4-integrity + v1.5..v1.10); zero modifications to those 7.
- **"DO NOT mask via deletion" doctrine continued** — V-92-CROSSLINK ASSERTS edges (not deletes); DEFERRED-CLEANUP PRESERVES carried v1.10 items + ADDS v1.11 new; the stray pre-close `.planning/v1.11-MILESTONE-AUDIT.md` is cross-linked, NOT deleted in the close-gate (deletion → `/gsd-complete-milestone`).
- **ALL 5 check-phase-89..93 net-new** — enlarges Atom 2's task list and makes the D-03 standalone-row argument load-bearing (89–92 have never run on Linux).
- **Apex deep-nest is WORSE than ever** — chain [48..92], +5 deeper than v1.10. Apex-93 count is Linux-GHA sole-authoritative (the timeout already fired in v1.10).

</specifics>

<deferred>
## Deferred Ideas

### Routed to v1.11-DEFERRED-CLEANUP.md by this phase (HARN-03)
- **Intune profile-based-enrollment config gap** for OS-26-migrated macOS devices (source: Phase 90; trigger: verify whether Intune needs explicit config beyond ADE token assignment)
- **Iru console post-rebrand device-deletion steps** (source: Phase 90; trigger: confirm against support.kandji.io)
- **Supervision-status-post-migration** preservation (source: Phase 90; trigger: pilot-device test — MEDIUM confidence, Apple guide silent)
- **`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`** carried forward (update chain depth → [48..92]); mitigation = apex count from Linux GHA
- Plus all carried-forward v1.10 deferred items (preserved Path-A from `v1.10-DEFERRED-CLEANUP.md`: MTPSSO/KRBFUT futures, Part B v1.8 carry-forwards) + any discoveries surfaced during execution.

### Discovered during Phase 93 discussion (new)
- **Stray pre-close `.planning/v1.11-MILESTONE-AUDIT.md`** (12/15, `gaps_found`, from `/gsd-audit-milestone` 2026-06-25) — Phase 93 authors the canonical `.planning/milestones/` artifact and cross-links the stray; its DELETION is deferred to `/gsd-complete-milestone` (mirrors v1.10's archive commit `3888555` which deleted the v1.10 stray, numstat `0 138`).
- **Working-tree cruft** (stale `.claude/worktrees/agent-*`, `TEMP*.txt` junk, `docs.zip`, `scratchpad/`, `.obsidian/`, `.agents/`, loose `91-PATTERNS.md`/`91-RESEARCH.md`) — D-04 leaves untouched (tooling-only phase, out of scope). Flag for `/gsd-complete-milestone` or a dedicated hygiene pass.

### Discussed but explicitly out of v1.11 Phase-93 scope
- **A new global blocking C17 category** — D-01 routes the Phase-92 nav-hub edges to a phase-scoped `check-phase-92.mjs` assertion instead (keeps Path-A C1–C16 verbatim; v1.11 ROADMAP has no C17 conditional).
- **Re-asserting V-63-08/09 in check-phase-91** — `check-phase-63` already owns them (D-01 defers).
- **A chicken-and-egg Commit A** — D-04 grep-proved no v1.11 artifact forward-references the close SHA.
- **A second `V110_CLOSEGATE` frozen entry** — v1.10 closed in a single commit (atom == close-gate), so one V110 suffices.
- **Worktree-based execution** — `use_worktrees:false` durable.
- **`docs/*` corpus edits** — v1.11 Phase 93 is tooling-only.
- **Working-tree cruft cleanup in the close-gate** — out of scope (keeps the close-gate a clean 7-file atom).

</deferred>

---

*Phase: 93-harness-lineage-bump-terminal-re-audit-milestone-close*
*Context gathered: 2026-06-25*
