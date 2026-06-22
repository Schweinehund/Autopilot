# Phase 82: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Context

**Gathered:** 2026-06-22
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Wave-D close-gate** of v1.9 — the terminal milestone-close phase. Direct **Path-A twin of Phase 74** (v1.8 Pillar D) and its lineage (62 → 66 → 70 → 74 → 82). Ships 4 requirements: **SSOHARN-01..04**. Depends on Phases 75–81 (harness is authored LAST; ALL content phases must be committed before the V18 SHA is pinned and before any `check-phase-NN.mjs` is authored — AP-5 anti-pattern prevention).

**What this phase delivers (locked by ROADMAP SC#1–4 + REQUIREMENTS SSOHARN-01..04):**

- **SSOHARN-01 (Atom 1, indivisible)** — `scripts/validation/v1.9-milestone-audit.mjs` Path-A copy from `v1.8-milestone-audit.mjs` (**C1–C16 inherited verbatim; NO new C-category — see D-01**; 6th milestone in the v1.4→v1.4.1→v1.5→v1.6→v1.7→v1.8→v1.9 lineage; self-test **9/9 PRESERVED**) + `scripts/validation/v1.9-audit-allowlist.json` Path-A copy (c13_rotting_external reset for v1.9; `quarterly_audit` cadence carried forward) + **BASELINE_13** freshness comment in `regenerate-supervision-pins.mjs` (closes BASELINE_12 v1.8 carry-over). Plus `_lib/frozen-at-close.mjs` gains a **`V18`** entry + **`readAtV18Close`** export (the v1.8 close-gate SHA, pinned BEFORE any validator is authored — satisfied structurally because Atom 1 commits before Atom 2).
- **SSOHARN-02 (Atom 2, indivisible)** — Per-phase validators **`check-phase-75.mjs` through `check-phase-82.mjs` — ALL 8 NET-NEW** (unlike v1.8, where 71/72/73 pre-existed; phases 75–81 did NOT ship per-phase validators during execution). Chain-apex `check-phase-82.mjs` (Path-A from `check-phase-74.mjs`): `CHAIN_PHASES=[48..81]`, `CHAIN_SKIP = new Set([])` (empty — zero suppressions), V-82-SELF guard excludes 82. **`check-phase-81.mjs` additionally carries the `V-81-CROSSLINK-*` 8-edge SSO-E assertions (D-01).**
- **SSOHARN-03 (in Atom 2)** — `.github/workflows/audit-harness-v1.9-integrity.yml`, the **6th parallel CI coexistence workflow** (coexists with `audit-harness-integrity.yml` + v1.5 + v1.6 + v1.7 + v1.8 — zero modifications to those 5); inherits `fetch-depth: 0`, `core.autocrlf false`, `continue-on-error: false`, `timeout-minutes: 30`; new validator jobs check-phase-75..82.
- **SSOHARN-04** — 3-axis terminal re-audit (Axis 1 local fresh `git clone --no-hardlinks` into `$env:TEMP\v1.9-audit-<rand>` + Axis 2 cross-OS Linux GHA `workflow_dispatch` + Axis 3 fresh sub-agent zero context-carryover; cross-OS PASS-Count **EXACT MATCH** across the 10-validator cross-OS-applicable set — see D-03) + `v1.9-MILESTONE-AUDIT.md` (Path-A from v1.8) + `v1.9-DEFERRED-CLEANUP.md` (canonical `.planning/milestones/` artifact, Path-A from v1.8, ~14–16 sections) + 4-doc traceability closure (PROJECT/ROADMAP/STATE/REQUIREMENTS — 27/27 reqs Validated).

**Entry-state (verified 2026-06-22, Phase 81 closed):**
- `scripts/validation/check-phase-75..82.mjs` **ALL MISSING** → all 8 are net-new authoring this phase.
- `scripts/validation/_lib/frozen-at-close.mjs` `MILESTONE_CLOSE_SHAS` = V141/V15/V16/V17/V17_CLOSEGATE — **no V18, no `readAtV18Close`**.
- **V18 SHA = `2bd79d8`** (`2bd79d89440c6bd7b1f749dafcb29ed309e58295` — `docs(74-05): … v1.8 MILESTONE CLOSE`).
- Predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7/v1.8 frozen surfaces (workflow YAMLs + milestone-audit MJS + sidecar JSONs) BYTE-UNCHANGED. (Chain validators `check-phase-{48..81}.mjs` are NOT in that invariant.)
- 23 v1.9 reqs Complete + 4 SSOHARN Pending = 27 total.

**Out of scope (Phase 82 owns nothing else):**
- Any `docs/*` corpus edits — v1.9 Phase 82 is **tooling-ONLY** (no VPP-01-style corpus rename twin; that was a v1.8-specific coupling).
- Modification to v1.4/v1.4.1/v1.5/v1.6/v1.7/v1.8 workflow YAMLs + milestone-audit MJS + sidecar JSONs — predecessor-byte-unchanged invariant.
- A new **global blocking C17 category** — D-01 routes the 8 SSO-E edges to a phase-scoped `check-phase-81.mjs` assertion instead (keeps the Path-A C1–C16-verbatim lineage pristine).
- A chicken-and-egg **Commit A** (SHA-placeholder-fill) — D-04 proved no v1.9 artifact forward-references the close SHA (RETRO-02 centralized frozen reads; validators read only PRIOR closes).
- Worktree-based execution — `.planning/config.json` `use_worktrees:false` durable per memory `project_execphase_sequential.md`. The Axis-1 `git clone --no-hardlinks` into TEMP is auditor-independence, NOT a worktree experiment.
- Re-opening the v1.8 deferred stubs — preserved as-is; v1.9-DEFERRED-CLEANUP carries them forward + adds the 4 PSSO-FUT items.

</domain>

<decisions>
## Implementation Decisions

All four gray areas resolved via 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder argues FOR each option, Adversary AGAINST, Referee scores; **lower = better**) per user memory `feedback_adversarial_review_preference` and the ROADMAP Phase-82 research flag. Each advisor read REQUIREMENTS/ROADMAP/STATE + the Phase 74 v1.8 Pillar-D precedent (CONTEXT + plans) + the actual source files (`scripts/validation/*.mjs`, `.github/workflows/*.yml`, `_lib/frozen-at-close.mjs`, Phase 81 closure artifacts). User approved all 4 via single "Approve all 4 — write CONTEXT.md" selection. Full dossiers at `.claude/tmp/phase82-D{01,02,03,04}-advisor.md`.

### D-01: C17 cross-link harness check — Option D "phase-scoped V-81 assertion, NO global C17" (score **D=4** / B=7 / A=9 / C=13)

**Decision:** The 8 SSO-E1..E8 cross-link edges (wired in Phase 81, verified in `81-CROSSLINK-CLOSURE.md`) become **blocking `V-81-CROSSLINK-*` assertions inside the net-new `check-phase-81.mjs`** — NOT a new global C17 category in `v1.9-milestone-audit.mjs`.

- **Hard-assert** (all 8 edges present today) — no allowlist/sidecar entries needed; mirrors C16's current `c16_missing_endpoint_exemptions: []` empty state.
- Use a **CRLF-normalizing file-read + forward-slash substring** check → deterministic, no Windows-path hazard, cross-OS-safe.
- This resolves the ROADMAP SC#1 conditional ("C17 added if /adversarial-review determines it"): **no C17.** `v1.9-milestone-audit.mjs` stays a **pristine verbatim Path-A copy** (C1–C16, self-test 9/9).

**Rationale (per `.claude/tmp/phase82-D01-advisor.md`):**
- **Decisive wedge:** the 8 edges are a *phase-scoped Phase-81 deliverable*, not a *cross-milestone invariant* — a global C-category is inherited by ALL future milestones (v1.10+) forever, which over-scopes 8 macOS-SSO-specific paths. The project already homes such deliverables in per-phase validators (C16's endpoints are themselves re-asserted in check-phase-63/64/65). A blocking numbered C-category has only ever entered at a *foundation* phase (62), never a tooling-only close-gate.
- **Verified gap:** C13 does NOT crawl internal links locally (only validates allowlist shape; mlc sweep deferred to CI) — so Option B's "an existing check already covers it" is FALSE; there is a real durable net to add. A chain-replayed phase assertion is permanent + blocking, giving exactly what a C-category would, at correct scope.
- **Option A (blocking C17):** real permanence but global pollution + breaks "C1–C16 inherited verbatim" + inflates Atom 1 and self-test 9/9. Score 9.
- **Option C (advisory C17):** no precedent for an advisory numbered C-category; pollution without enforcement. Score 13.

### D-02: Plan layout & atom scope — Option B "4-plan layout (conventions folds into Atom-1 plan)" (score **B=4** / A=9 / D=11 / C=12)

**Decision:** 4 plans, 5 commits. The dedicated Phase-74-style scaffold plan is dropped (it only existed to carry VPP-01 corpus work, which v1.9 lacks).

```
Plan 82-01 (conventions + Atom 1)
  Wave 1: 82-CONVENTIONS.md (freshness/SHA matrix + locked strings) — commit
  Wave 2: ATOM 1 (SSOHARN-01) — INDIVISIBLE commit
          v1.9-milestone-audit.mjs (Path-A from v1.8, C1-C16 verbatim, self-test 9/9)
          + v1.9-audit-allowlist.json (c13 reset for v1.9; quarterly_audit carried)
          + BASELINE_13 freshness comment in regenerate-supervision-pins.mjs
          + _lib/frozen-at-close.mjs: V18 = 2bd79d8 entry + readAtV18Close export
    feat(82-01): v1.9 harness-core Path-A — SSOHARN-01 + V18 pin (atomic SC#1 Atom 1)

Plan 82-02 (Atom 2 — SSOHARN-02 + SSOHARN-03) — INDIVISIBLE commit
  check-phase-75..82.mjs (8 NET-NEW; 82 chain-apex CHAIN_PHASES=[48..81], CHAIN_SKIP=Set([]);
  81 carries V-81-CROSSLINK-* per D-01) + audit-harness-v1.9-integrity.yml (6th coexistence; 8 new jobs)
    feat(82-02): v1.9 validators + CI surface — SSOHARN-02/03 (atomic SC#1 Atom 2)
  *** MUST be committed AND pushed to origin/master before Plan 82-03 (D-03 ordering gate) ***

Plan 82-03 (SSOHARN-04 3-axis re-audit — artifact-only commit)
  82-03-AUDIT-RESULTS.md (Axis 1 fresh-clone sub-agent + Axis 2 Linux GHA + Axis 3 fresh sub-agent;
  cross-OS EXACT MATCH across the 10-validator set per D-03)
    docs(82-03): SSOHARN-04 3-axis terminal re-audit results (artifact-only)

Plan 82-04 (SSOHARN-04 close-gate — SINGLE commit, NO Commit A per D-04)
  v1.9-MILESTONE-AUDIT.md (NEW) + v1.9-DEFERRED-CLEANUP.md (NEW canonical .planning/milestones/ artifact)
  + 4-doc traceability flip (PROJECT/ROADMAP/STATE/REQUIREMENTS — 4 SSOHARN reqs Active→Validated, 27/27)
  + 82-VERIFICATION.md (NEW)
    docs(82-04): Phase 82 close-gate — v1.9 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.9 MILESTONE CLOSE
```

**Total commits:** 5 (82-01 × 2 + 82-02 + 82-03 + 82-04). Both SC#1 atoms stay revert-isolated; re-audit artifact isolated; close-gate isolated.

**Rationale (per `.claude/tmp/phase82-D02-advisor.md`):**
- **Decisive wedge:** Phase 74's 5th plan existed solely because VPP-01 corpus work rode in its scaffold plan. v1.9 has **no corpus edit** (Delta 1) → the scaffold's only payload is one thin `82-CONVENTIONS.md`, too light for a dedicated commit. The **8 net-new validators** (Delta 2) feel like they need more structure, but SC#2 locks all 8 into ONE indivisible commit → they enlarge a task list, never a commit count. The two deltas cancel toward FEWER plans.
- **V18 placement:** SC#1 bundles the `frozen-at-close.mjs` V18 entry INTO Atom 1; since Atom 1 commits before Atom 2, "V18 pinned before any validator" is satisfied structurally. `2bd79d8` is a known-PAST SHA → no chicken-and-egg, no Commit A. **Option D (hoist V18 to a micro-commit) would VIOLATE SC#1's mandated Atom-1 indivisibility** → score 11.
- **Option C (6-plan, split validators):** violates SC#2 atom indivisibility. Score 12.
- **C17 coupling is layout-neutral:** D-01's outcome lives entirely inside the two pre-locked atoms' existing files → changes content, never plan count/ordering.

### D-03: 3-axis terminal re-audit (SSOHARN-04) — Option A "exact Phase-74 replication, FULL grown net-new set" (score **A=8** / B=13 / C=15 / D=16)

**Decision:** Replicate the Phase 70/74 recipe, v1.9-relabeled, with the full net-new cross-OS-applicable set.

- **Cross-OS-applicable validator set = 10:** `v1.9-milestone-audit.mjs` + `check-phase-74.mjs` (prior-apex continuity row, mirrors Phase 74 carrying check-phase-70) + the **8 net-new** `check-phase-75/76/77/78/79/80/81/82.mjs`. (Minimum defensible = 9 if the continuity row is dropped; 10 recommended for precedent fidelity.)
- **Axis 1 (local physical independence):** ONE fresh `gsd-executor` sub-agent runs a ~10-step PowerShell recipe — `$rand` over `[0-9a-z]` 8-char; `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.9-audit-<rand>`; assert cloned HEAD == source HEAD; run `v1.9-milestone-audit.mjs` + `--self-test` + the validator set; capture exit codes + PASS/FAIL/SKIP counts; `Remove-Item -Recurse -Force` + assert zero orphans.
- **Axis 2 (cross-OS):** main-session `gh workflow run audit-harness-v1.9-integrity.yml --ref master`; capture run URL + per-job conclusions + Linux chain timing.
- **Axis 3 (logical/context independence):** the SAME sub-agent as Axis 1 serves zero-context-carryover. **ONE dispatch covering two independence dimensions — do NOT spawn two agents** (Option D literalism scored 16).
- **Exclusions (with reasons):** `pin-helper-advisory` (CI-only advisory, not run locally), `rotting-external-quarterly` (cron-only, SKIPs on workflow_dispatch — negative control), harness `--self-test` (folded into the milestone-audit row, not a standalone cross-OS row), the inherited `check-phase-48..73` chain (covered transitively by the apex; listing 26+ = noise).
- **Artifact:** separate artifact-only commit `82-03-AUDIT-RESULTS.md`, consumed by the SSOHARN-04 close-gate.

**Plan-ordering gate (HARD):** Plan 82-03 runs only AFTER Plan 82-02 (Atom 2: check-phase-75..82 + yml) is committed AND **pushed to `origin/master`** — the workflow's check-phase-75..82 jobs FAIL (not skip) if absent from the dispatched ref. Blocking precondition: Atom 2 on `origin/master` + `gh auth status` OK + v1.9 workflow `state:active`.

**Rationale (per `.claude/tmp/phase82-D03-advisor.md`):**
- **Decisive wedge:** every per-phase validator 75–82 is net-new THIS session and has NEVER run on Linux. The chain-apex spawns children with `CHECK_PHASE_NESTED=1`, so a child's assertions surface only as the apex's single `CHAIN-NN exits 0` line — never a standalone PASS/FAIL/SKIP triplet you can cross-OS-diff. Standalone rows for 75–81 are therefore **load-bearing** (their FIRST cross-OS confirmation), the exact OPPOSITE of Phase 74's small 6-set (whose 71/72/73 were inherited-from-own-phase). Option B (apex-only) hides them behind the nested short-circuit → score 13.
- **Axis-3 matters MORE here** (validators authored this session) → argues for freshness rigor, not a 2nd agent (D=16).
- ⚠️ **Carry forward `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`** — the cold-clone apex O(n²) cascade is WORSE at Phase 82 (chain now [48..81], +8 deeper). Mitigate by taking apex counts from warm-tree × Linux-GHA rather than cold-clone re-run.

### D-04: Close-gate (V18 pin + traceability + MILESTONE-AUDIT) + DEFERRED-CLEANUP routing — Option A "single close-gate commit, NO Commit A, single V18 entry" (score **A=1.8** / D=5.0 / C=6.5 / B=8.0)

**Decision:** ONE close-gate commit (Plan 82-04). **No Commit A. Single `V18` entry (not V18 + V18_CLOSEGATE).**

- **V18 = `2bd79d8`** (`docs(74-05)` — the v1.8 close-gate commit touching the 4-doc set + v1.8-MILESTONE-AUDIT NEW + DEFERRED-CLEANUP FINALIZE + 74-VERIFICATION). Pinned in `_lib/frozen-at-close.mjs` `MILESTONE_CLOSE_SHAS` + `readAtV18Close = (p) => readAtClose('V18', p)` convenience export (mirrors `readAtV15Close`/`readAtV16Close`/`readAtV17Close` shape).
- **ONE entry, NOT two:** the V17/V17_CLOSEGATE split existed ONLY because v1.7 closed in TWO commits (5/12 reqs landed at Commit B `4df3a16`, read by check-phase-70.mjs V-70-24). **v1.8 closed in a SINGLE commit** with all 12/12 reqs flipping together → atom == close-gate → a second `V18_CLOSEGATE` would be a dead, misleading export.
- **No Commit A:** `grep` for `phase_82_close | readAtV18 | V18` forward-references = EMPTY. RETRO-02 (`a85da77`) centralized frozen reads into `_lib/frozen-at-close.mjs`; check-phase-82 (Path-A from check-phase-74) reads only PRIOR-milestone close SHAs, never its own future close SHA. The Phase-70 Commit A filled an ATOM SHA (not a close SHA) and that mechanism was deleted — re-deriving a v1.9 Commit A would substitute nothing (cargo-cult; Option B score 8.0).
- **Close-gate structure:** ONE commit — `v1.9-MILESTONE-AUDIT.md` (NEW, Path-A from v1.8 skeleton: Executive Summary + Pillar/Phase Closure Narrative + 3-axis Auditor-Independence Verification + Methodology + "Discoveries Surfaced During Execution" + Requirements Traceability + Sign-off /gsd-complete-milestone hand-off) + `v1.9-DEFERRED-CLEANUP.md` (NEW canonical artifact) + REQUIREMENTS/PROJECT/ROADMAP/STATE 4-doc flip (4 SSOHARN reqs Active→Validated; cumulative **27/27**) + `82-VERIFICATION.md` (NEW). **HARD gate:** `git diff <pre-Phase-82-SHA> HEAD -- <v1.4..v1.8 frozen surfaces>` returns EMPTY at close-gate commit time. Literal `{phase_82_close_SHA}` placeholder recoverable via `git log --all --grep="82-04" --grep="close-gate" --all-match -1 --format=%H` (71-03/72-02/73-03/74-05 precedent).

**DEFERRED-CLEANUP routing (PSSO-FUT items → source phase → trigger):**

| Item | Source | Routing trigger (v1.10+) |
|------|--------|--------------------------|
| **PSSO-FUT-01** `NewUserAuthorizationMode` key verification | Phase 77 (PSSO-11 / D3=B) | verify MDM plist key vs Settings Catalog schema |
| **PSSO-FUT-02** Graph API Platform Credential | v1.9 scoping (REQ:71,85) | programmatic demand / Graph GA |
| **PSSO-FUT-03** Multi-tenant PSSO | v1.9 scoping (REQ:72,84) | multi-tenant deployment demand |
| **PSSO-FUT-04** Kerberos deep-dive | Phase 78 (SSOMIG-04) | Kerberos config demand → new guide 10 |

- **`v1.9-DEFERRED-CLEANUP.md` shape:** Path-A from `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (~14–16 sections = the carried v1.8 deferred items PRESERVED + 4 PSSO-FUT NEW sections + any discoveries surfaced during execution).
- **Discovery — do NOT delete:** a working `docs/v1.9-DEFERRED-CLEANUP.md` (PSSO-FUT-01 only) ALREADY EXISTS from Phase 77 (`bba11f6`). Phase 82 authors the **canonical `.planning/milestones/v1.9-DEFERRED-CLEANUP.md`** and cross-links the docs/ file — does NOT delete or duplicate-overwrite it.
- **Not deferrals:** Phase-77 Entra CBA walk-through and Phase-80 `app-sso diagnose` / `log stream --predicate` research flags were RESOLVED in-phase → they do NOT route to DEFERRED-CLEANUP.

**Rationale (per `.claude/tmp/phase82-D04-advisor.md`):**
- **Decisive wedge:** v1.8's single-commit close means atom == close-gate (byte-identical), so a second `V18_CLOSEGATE` would be dead/misleading. One V18, no Commit A. The single-commit close-gate is bisect-clean and matches the "verification IS the audit record" lesson (Options C/D add commits solving no real chicken-and-egg → 6.5 / 5.0).

### Claude's Discretion (plan-phase author decides)
- **`82-CONVENTIONS.md` content** — freshness/SHA matrix + locked strings (mirror `74-CONVENTIONS.md`). Finalize which constants to lock: the 10-validator cross-OS-applicable set, V18 = `2bd79d8`, BASELINE_13 anchor SHA, the 8 SSO-E edge needles for V-81-CROSSLINK.
- **Exact `$rand` charset + temp-dir cleanup assertions** in the Axis-1 sub-agent recipe — recommend `[0-9a-z]` 8-char; tune per Phase 74 `74-04` recipe.
- **V-81-CROSSLINK assertion form** — recommend substring class-signature (all 8 forward-slash edge needles present, CRLF-normalized read) over line-pinned; plan-phase author confirms the exact 8 needles against `81-CROSSLINK-CLOSURE.md`.
- **BASELINE_13 anchor** — recommend a known-PAST SHA (mirrors BASELINE_12 anchoring to a past close), NOT the future Phase-82 close SHA.
- **Whether to list 9 vs 10 in the cross-OS set** — recommend 10 (include the `check-phase-74.mjs` prior-apex continuity row) for precedent fidelity with Phase 74's carry of check-phase-70.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 82 contract docs
- `.planning/ROADMAP.md` — Phase 82 section (lines ~545–557): Goal + SC#1 (2 indivisible atoms; V18 pinned before validators; "C17 added if /adversarial-review determines it" — **resolved NO C17 per D-01**) + SC#2 (check-phase-75..82; chain-apex CHAIN_PHASES=[48..81], CHAIN_SKIP empty; 6th coexistence workflow; predecessor byte-unchanged) + SC#3 (3-axis re-audit + cross-OS EXACT MATCH) + SC#4 (MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability 27/27) + the research flag at lines ~203–207/550
- `.planning/REQUIREMENTS.md` — SSOHARN-01..04 full text (lines ~57–60) + Traceability table (lines ~122–125) + v1.9 coverage (27 total)
- `.planning/STATE.md` — v1.9 phase dependency summary + Wave map (Wave D = close-gate, requires 75–81) + "Blockers/Concerns" (Phase 82 C17 flag — now resolved)

### Phase 74 — DIRECT v1.8 Pillar D PRECEDENT (Path-A model for the whole phase)
- `.planning/milestones/v1.8-phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-CONTEXT.md` — the D-01..D-04 decisions (5-plan layout [but v1.8 had VPP-01], 3-axis auditor independence, single close-gate / NO Commit A); Phase 82 D-02/D-03/D-04 inherit + adapt
- `.../74-01-PLAN.md` (scaffold + VPP-01) + `74-02-PLAN.md` (Atom 1) + `74-03-PLAN.md` (Atom 2 validators + CI) + `74-04-PLAN.md` + `74-04-AUDIT-RESULTS.md` (3-axis recipe + cross-OS EXACT MATCH evidence format) + `74-05-PLAN.md` (single close-gate)
- `.../74-VERIFICATION.md` — close-gate format + cross-OS-applicable validator count (v1.8 = 6) + EXACT MATCH evidence; `82-VERIFICATION.md` inherits
- `.../74-CONVENTIONS.md` — Path-A source for `82-CONVENTIONS.md`
- `.planning/milestones/v1.8-MILESTONE-AUDIT.md` — Path-A source for `v1.9-MILESTONE-AUDIT.md` (section skeleton)
- `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` — Path-A source for `v1.9-DEFERRED-CLEANUP.md` (preserve carried items + add 4 PSSO-FUT)

### Phase 81 — SSO-E edge source (READ BEFORE AUTHORING V-81-CROSSLINK)
- `.planning/phases/81-nav-hub-integration/81-CROSSLINK-CLOSURE.md` — the 8 SSO-E1..E8 edges + how they were verified (the exact needles for the `check-phase-81.mjs` V-81-CROSSLINK assertion); line ~117 confirms the harness is currently "blind" to these edges (the gap D-01 closes)
- `.planning/phases/81-nav-hub-integration/81-CONTEXT.md` + `81-VERIFICATION.md`

### Path-A sources (READ BEFORE AUTHORING)
- `scripts/validation/v1.8-milestone-audit.mjs` — Path-A source for `v1.9-milestone-audit.mjs` (C1–C16 verbatim; self-test 9/9); also the reference for how C13/C14/C15/C16 are implemented (D-01 confirmed C13 does NOT crawl internal links locally)
- `scripts/validation/v1.8-audit-allowlist.json` — Path-A source for `v1.9-audit-allowlist.json` (c13_rotting_external + CI annotations + `quarterly_audit` cadence)
- `scripts/validation/check-phase-74.mjs` — Path-A source for `check-phase-82.mjs` (CHAIN_PHASES → {48..81}; CHAIN_SKIP empty-Set; V-NN-SELF guard; uniform CHAIN+AUDIT stdout/stderr wrapper; `_lib/frozen-at-close.mjs` consumption; `CHECK_PHASE_NESTED=1` child-spawn behavior relevant to D-03)
- `scripts/validation/check-phase-67.mjs` (V-67-03/04) and check-phase-63/64/65 (C16-endpoint re-assertions) — patterns for the `check-phase-81.mjs` V-81-CROSSLINK assertion shape
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (V141/V15/V16/V17/V17_CLOSEGATE; **no V18**) + `readAtClose` + convenience exports — the exact shape the V18 entry + `readAtV18Close` must follow
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_12 region (Plan 74-02 placed it); BASELINE_13 comment lands here (SSOHARN-01); anchors to a known-PAST SHA, not the future close SHA
- `.github/workflows/audit-harness-v1.8-integrity.yml` — Path-A source for `audit-harness-v1.9-integrity.yml` (6th coexistence file; `fetch-depth: 0`, `core.autocrlf false`, `continue-on-error: false`, `timeout-minutes: 30`; check-phase jobs; negative-control + advisory job structure)

### Advisor dossiers (full reasoning, for planner deep-dive)
- `.claude/tmp/phase82-D01-advisor.md` (246 lines) — C17 decision (Option D; phase-scoped V-81 assertion; C13-doesn't-crawl-links wedge; permanence/scope argument)
- `.claude/tmp/phase82-D02-advisor.md` (181 lines) — plan layout (Option B; 4-plan skeleton; no-corpus-edit + 8-net-new-validators cancellation wedge; V18-in-Atom-1)
- `.claude/tmp/phase82-D03-advisor.md` (221 lines) — 3-axis re-audit (Option A; 10-validator set + exclusions; CHECK_PHASE_NESTED standalone-row wedge; drop-in Axis-1 recipe + Axis-2 gh command; clone-deepnest-timeout carry)
- `.claude/tmp/phase82-D04-advisor.md` (145 lines) — close-gate (Option A; verified V18=2bd79d8; one-vs-two-entry proof; NO-Commit-A proof; PSSO-FUT routing table; pre-existing docs/ DEFERRED-CLEANUP discovery)

### Constraints / anti-regression
- `.planning/config.json` — `use_worktrees: false` durable per memory `project_execphase_sequential.md`
- Predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7/v1.8 workflow YAMLs + milestone-audit MJS + sidecar JSONs BYTE-UNCHANGED through close-gate (chain validators `check-phase-{48..81}.mjs` are NOT in the invariant)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Path-A milestone-audit template** — `scripts/validation/v1.8-milestone-audit.mjs` (C1–C16, self-test 9/9). `v1.9-milestone-audit.mjs` is a verbatim Path-A copy with v1.9 labels — **no new C-category** (D-01).
- **Path-A allowlist + sidecar** — `scripts/validation/v1.8-audit-allowlist.json` (`c13_rotting_external` + `quarterly_audit` cadence). v1.9 copy resets c13 for v1.9.
- **Path-A chain-apex validator** — `scripts/validation/check-phase-74.mjs` (CHAIN_PHASES → {48..81}; CHAIN_SKIP empty-Set; uniform stdout/stderr CHAIN+AUDIT wrapper; `_lib/frozen-at-close.mjs` consumption; `CHECK_PHASE_NESTED=1` child-spawn). `check-phase-82.mjs` Path-A copy.
- **Centralized frozen-aware helper** — `scripts/validation/_lib/frozen-at-close.mjs` (Phase 73 `a85da77`). `MILESTONE_CLOSE_SHAS` has NO V18 → confirms `check-phase-82.mjs` reads only prior-milestone close SHAs → NO Commit A (D-04). V18 = `2bd79d8` + `readAtV18Close` added here.
- **Path-A CI workflow** — `.github/workflows/audit-harness-v1.8-integrity.yml` (6th-coexistence target shape; fetch-depth:0; autocrlf false; check-phase jobs). v1.9 copy is the 6th parallel file.
- **3-axis re-audit recipe** — Phase 74 `74-04-AUDIT-RESULTS.md` (artifact-only). Axis 1 fresh-clone sub-agent; Axis 2 GHA workflow_dispatch; Axis 3 same fresh sub-agent.
- **Close-gate pattern** — Plan 74-05 (single-commit; VERIFICATION.md + 4-doc traceability flip + literal `{phase_NN_close_SHA}` placeholder recoverable via `git log --all --grep`).
- **C16-endpoint-in-per-phase-validator pattern** — check-phase-63/64/65 re-assert C16 endpoints → the precedent that homes the 8 SSO-E edges in `check-phase-81.mjs` (D-01).

### Established Patterns
- **CHAIN_SKIP empty-Set invariant** — permanent post-Phase 68. `check-phase-82.mjs` MUST declare `CHAIN_SKIP = new Set([])` (V-82-SELF enforces).
- **CHAIN_PHASES excludes validator's own phase** — `check-phase-82.mjs` CHAIN_PHASES = {48..81}; V-82-SELF asserts 82 not included (auditor-independence).
- **Atomic-commit indivisibility per ROADMAP SC#1** — Atom 1 + Atom 2 each land in ONE SHA (precedent: 60-08 / 62-08 / 66-02 / 70-02 / 70-03 / 74-02 / 74-03).
- **Predecessor-byte-unchanged anti-regression** — `git diff <pre-82> HEAD -- <v1.4..v1.8 frozen surfaces>` EMPTY at close-gate.
- **3-axis auditor independence stacking** — D-03 fresh-clone + fresh sub-agent zero-context + cross-OS Linux GHA. Phase 82 re-stacks with the v1.9 10-validator set.
- **CHECK_PHASE_NESTED=1 child-spawn** — chain children short-circuit to a single `CHAIN-NN exits 0` line → net-new 75–81 need STANDALONE cross-OS rows (D-03).

### Integration Points
- **`scripts/validation/v1.9-milestone-audit.mjs`** — NEW; 7th in the milestone-audit lineage.
- **`scripts/validation/check-phase-75..82.mjs`** — 8 NEW validators (82 = chain-apex; future v1.10+ Path-A source). check-phase-81 carries V-81-CROSSLINK (D-01).
- **`scripts/validation/_lib/frozen-at-close.mjs`** — V18 = `2bd79d8` + `readAtV18Close` (Atom 1).
- **`.github/workflows/audit-harness-v1.9-integrity.yml`** — NEW; 6th coexistence file; check-phase-75..82 jobs MUST be on `origin/master` before Plan 82-03 Axis 2 dispatch (D-03 ordering gate).
- **`.planning/milestones/v1.9-DEFERRED-CLEANUP.md`** — NEW canonical artifact (cross-links the pre-existing `docs/v1.9-DEFERRED-CLEANUP.md`, does NOT delete it).
- **`.planning/milestones/v1.9-MILESTONE-AUDIT.md`** — NEW (Path-A from v1.8).
- **PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md** — 4-doc traceability flip (4 SSOHARN reqs Active→Validated; 27/27) in the single close-gate commit.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (memory `feedback_adversarial_review_preference`) — honored verbatim: 4 parallel `gsd-advisor-researcher` agents (Finder/Adversary/Referee scoring). User explicitly instructed "For each choice in each of the areas, use /adversarial-review to recommend the best one." User approved all 4 in one selection.
- **User maximum-effort preference** (memory `feedback_effort_level`) — each dossier 145–246 lines with concrete operational recipes, drop-in pseudocode, anti-regression analysis, adversarial wedges.
- **Sequential-on-main-tree durable** (memory `project_execphase_sequential.md` + `.planning/config.json`). Plans 82-01..04 execute sequentially on the main tree. The Axis-1 `git clone --no-hardlinks` into TEMP is auditor-independence, NOT a worktree experiment.
- **V18 = `2bd79d8`** — verified the v1.8 close-gate SHA (`docs(74-05)`), pinned BEFORE any validator authored (structurally satisfied: Atom 1 commits before Atom 2).
- **Today's date is 2026-06-22.** Phase 82 discussion authoring date. No `docs/*` corpus edit → no frontmatter `last_verified:` bumps (tooling-only phase).
- **"6th coexistence file" locked** — coexists with the 5 prior audit-harness YAMLs (v1.4-integrity + v1.5 + v1.6 + v1.7 + v1.8); zero modifications to those 5.
- **"DO NOT mask via deletion" doctrine continued** — V-81-CROSSLINK ASSERTS edges (not deletes); DEFERRED-CLEANUP PRESERVES carried v1.8 items + ADDS 4 PSSO-FUT; the pre-existing `docs/v1.9-DEFERRED-CLEANUP.md` is cross-linked, NOT deleted.
- **ALL 8 check-phase-75..82 net-new** — divergence from the Phase-74 precedent (which only authored check-phase-74); enlarges Atom 2's task list and makes the D-03 standalone-row argument load-bearing.

</specifics>

<deferred>
## Deferred Ideas

### Routed to v1.9-DEFERRED-CLEANUP.md by this phase (SSOHARN-04)
- **PSSO-FUT-01** `NewUserAuthorizationMode` key verification (source: Phase 77; trigger: verify MDM plist key vs Settings Catalog schema)
- **PSSO-FUT-02** Graph API Platform Credential (source: v1.9 scoping; trigger: programmatic demand / Graph GA)
- **PSSO-FUT-03** Multi-tenant PSSO (source: v1.9 scoping; trigger: multi-tenant deployment demand)
- **PSSO-FUT-04** Kerberos deep-dive (source: Phase 78; trigger: Kerberos config demand → new guide 10)
- Plus all carried-forward v1.8 deferred items (preserved Path-A from `v1.8-DEFERRED-CLEANUP.md`) + any discoveries surfaced during execution.

### Discovered during Phase 82 discussion (new)
- **Pre-existing `docs/v1.9-DEFERRED-CLEANUP.md`** (PSSO-FUT-01 only) from Phase 77 (`bba11f6`) — Phase 82 authors the canonical `.planning/milestones/` artifact and cross-links the docs/ file; does NOT delete or duplicate-overwrite. Flag for v1.10+ hygiene: DEFERRED-CLEANUP authoring should converge on a single canonical location.
- **C13 does NOT crawl internal links locally** — only validates allowlist shape; the mlc internal-link sweep is CI-deferred. So broken SSO-E edges had NO local blocking net before D-01's V-81-CROSSLINK assertion. Flag for harness hygiene: consider whether a future milestone wants a local internal-link crawl.

### Discussed but explicitly out of v1.9 Phase-82 scope
- **A new global blocking C17 category** — D-01 routes the 8 edges to a phase-scoped `check-phase-81.mjs` assertion instead (keeps Path-A C1–C16 verbatim).
- **A chicken-and-egg Commit A** — D-04 proved no v1.9 artifact forward-references the close SHA.
- **A second `V18_CLOSEGATE` frozen entry** — v1.8 closed in a single commit (atom == close-gate), so one V18 suffices.
- **Worktree-based execution** — `use_worktrees:false` durable.
- **`docs/*` corpus edits** — v1.9 Phase 82 is tooling-only.
- **Phase-77 Entra CBA / Phase-80 `app-sso diagnose` research flags** — resolved in-phase, NOT deferrals.

</deferred>

---

*Phase: 82-harness-lineage-bump-terminal-re-audit-milestone-close*
*Context gathered: 2026-06-22*
