# Phase 95: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Context

**Gathered:** 2026-06-26
**Status:** Ready for planning

<domain>
## Phase Boundary

The **terminal close-gate of v1.12** — the **10th** Path-A milestone harness in the lineage
v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → **v1.12**. Direct **Path-A twin
of Phase 93** (v1.11 close), itself the twin of Phase 88 (v1.10) and Phase 82 (v1.9). **Tooling-ONLY**
(no `docs/*` corpus edits — v1.12's content shipped in Phase 94). Ships 3 requirements: **HARN-01,
HARN-02, HARN-03**. Depends on Phase 94 — the harness is authored LAST (Phase 94 committed before any
`check-phase-9N.mjs` is authored and before the V111 SHA is consumed; AP-5 anti-pattern prevention).

**What this phase delivers (locked by ROADMAP SC#1–4 + REQUIREMENTS HARN-01..03, with ONE adjudicated
correction at D-01 below):**

- **HARN-01 (Atom 1, indivisible — 3 files)** — `scripts/validation/v1.12-milestone-audit.mjs` Path-A
  copy from `v1.11-milestone-audit.mjs` (**C1–C16 inherited verbatim; NO new C-category**; 10th
  milestone in the lineage; self-test PRESERVED) + `scripts/validation/v1.12-audit-allowlist.json`
  Path-A copy (`c13_rotting_external` reset for v1.12; `quarterly_audit` cadence carried forward) +
  **BASELINE_16** freshness comment in `regenerate-supervision-pins.mjs` (closes BASELINE_15 v1.11
  carry-over).
- **HARN-02 (Atom 2, indivisible — 4 files)** — Per-phase validators **`check-phase-94.mjs` +
  `check-phase-95.mjs` — BOTH NET-NEW** (currently MISSING) + `_lib/frozen-at-close.mjs` gains a
  **`V111`** entry (`919b23b`) + **`readAtV111Close`** export + `.github/workflows/
  audit-harness-v1.12-integrity.yml` as the **9th** parallel CI coexistence workflow (predecessors
  v1.4–v1.11 byte-unchanged). **The `frozen-at-close.mjs` V111 entry rides ATOM 2** (per ROADMAP SC#2 +
  HARN-02 — same divergence v1.11 adopted). Still ordering-safe: `919b23b` is a known-PAST SHA and
  `check-phase-95` reads only PRIOR-milestone closes via `_lib/frozen-at-close.mjs`.
- **HARN-03** — 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` into
  `$env:TEMP\v1.12-audit-<rand>` + Axis 2 cross-OS Linux GHA `workflow_dispatch` + Axis 3 fresh
  sub-agent zero-context-carryover; cross-OS PASS/FAIL/SKIP **EXACT MATCH** across the leaf rows +
  Linux-authoritative chain rows — see D-03) + `v1.12-MILESTONE-AUDIT.md` (canonical
  `.planning/milestones/`, Path-A from v1.11) + `v1.12-DEFERRED-CLEANUP.md` (canonical
  `.planning/milestones/`, Path-A from v1.11) + 4-doc traceability closure
  (PROJECT/ROADMAP/STATE/REQUIREMENTS — all **6 v1.12 reqs Validated**).

**Entry-state (verified 2026-06-26, Phase 94 closed):**
- `scripts/validation/check-phase-94.mjs` + `check-phase-95.mjs` **BOTH MISSING** → both net-new this
  phase.
- `scripts/validation/_lib/frozen-at-close.mjs` `MILESTONE_CLOSE_SHAS` last entry = **V110** (`a3617e9`)
  + `readAtV110Close` — **no V111, no `readAtV111Close`**.
- **V111 SHA = `919b23b`** (`docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP
  + 4-doc traceability + v1.11 MILESTONE CLOSE`; **single-commit close** — verified: following `f7a7e6b`
  (SUMMARY) and `c0be124` (state+roadmap SDK updates) are post-close chores, NOT part of the atom).
- **BASELINE_15** is the current freshest (v1.11, Phase 93) → BASELINE_16 closes it.
- 8 existing `audit-harness-*-integrity.yml` workflows → v1.12 is the **9th**.
- Prior apex `check-phase-93.mjs` = `CHAIN_PHASES=[48..92]` (confirms the `[48..N-1]` invariant — see
  D-01).
- Guide `docs/macos-lifecycle/02-mdm-migration-psso.md` is a **PRE-EXISTING v1.11 file** that Phase 94
  only PATCHED (last touched `docs(94-01)`) → a bare PRESENCE check is trivially green on the old bytes
  (drives D-02).
- Predecessor v1.4–v1.11 frozen surfaces (workflow YAMLs + milestone-audit MJS + sidecar JSONs)
  BYTE-UNCHANGED. (Chain validators `check-phase-{48..94}.mjs` are NOT in that invariant.)
- v1.12 reqs: 3 Complete (MIGV-01/02/03, Phase 94) + 3 HARN Active = **6 total**.

**Out of scope (Phase 95 owns nothing else):**
- Any `docs/*` corpus edits — v1.12 Phase 95 is **tooling-ONLY** (incl. the newly-surfaced glossary
  CR-01 follow-up — routed to DEFERRED-CLEANUP, NOT fixed here).
- Modification to v1.4–v1.11 workflow YAMLs + milestone-audit MJS + sidecar JSONs —
  predecessor-byte-unchanged invariant.
- A new **global blocking C17 category** — v1.12 ROADMAP locks "C1–C16 inherited" with no C17 hook.
  Phase-94 content verification routes to a phase-scoped `check-phase-94.mjs` needle net (D-02).
- A chicken-and-egg **Commit A** — D-04 grep-proves no v1.12 artifact forward-references the close SHA.
- A second **`V111_CLOSEGATE`** frozen entry — v1.11 closed in a single commit (atom == close-gate).
- **Worktree-based execution** — `.planning/config.json` `use_worktrees:false` durable per memory
  `project_execphase_sequential.md`. The Axis-1 `git clone --no-hardlinks` into TEMP is
  auditor-independence, NOT a worktree experiment.
- **Working-tree cruft cleanup** (stale `.claude/worktrees/agent-*`, `TEMP*.txt` junk, `docs.zip`,
  `scratchpad/`, `.obsidian/`, `.agents/`, etc.) — D-04 leaves untouched; deletion of any stray
  pre-close `.planning/v1.12-MILESTONE-AUDIT.md` is deferred to `/gsd-complete-milestone` (mirrors
  v1.11's boundary).
- **The CI-3 Managed-Apple-ID→Account rename** — remains deferred (byte-unchanged hazard; carried in
  DEFERRED-CLEANUP).

</domain>

<decisions>
## Implementation Decisions

All four gray areas resolved via 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode
(Finder argues FOR each option, Adversary AGAINST, Referee scores; **lower = better**) per user memory
`feedback_adversarial_review_preference` + `feedback_effort_level`, and the user's explicit instruction
"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide
your reasoning." Each advisor read REQUIREMENTS/ROADMAP/STATE + the Phase 93 (v1.11) precedent + the
actual source files. **User approved all 4 — including the D-01 roadmap-lock correction — via single
"Approve all 4 + correct apex" selection.** Full dossiers at `.claude/tmp/phase95-GA{1,2,3,4}-advisor.md`.

### D-01: check-phase-95 chain-apex range — Option A "`CHAIN_PHASES=[48..94]`" (score **A=2** / C=6 / B=8)

**Decision:** `check-phase-95.mjs` declares **`CHAIN_PHASES=[48,49,…,94]` (47 entries)**, `CHAIN_SKIP =
new Set([])`, V-95-SELF guard asserts 95 NOT in CHAIN_PHASES and CHAIN_SKIP empty. This **CORRECTS the
roadmap/STATE `[48..93]` lock**, which is an off-by-one.

- **The `[48..N-1]` rule is a triple-confirmed invariant:** v1.9 apex-82 = [48..81]; v1.10 apex-88 =
  [48..87]; v1.11 apex-93 = **[48..92]** — each milestone's apex includes that milestone's own content
  phase(s). The locked `[48..93]` would make v1.12 the **first** milestone to drop its content phase
  (94) from its own apex chain.
- **Decisive wedge:** v1.11 deliberately put content-phase-92 in its chain *because* `check-phase-92`
  carries blocking `V-92-CROSSLINK` assertions the frozen milestone-audit harness is **blind to** — the
  recursive chain is the ONLY durable mechanism that replays them on every CI run. `check-phase-94` is
  the **exact structural twin** for v1.12: it carries the `V-94-CONTENT-*` MIGV needles (D-02).
  Excluding 94 from the apex silently removes the only *recurring* net protecting guide 02's MIGV
  content in all future CI runs; a one-time standalone re-audit row (rejected Options B/C) does not.
- **Depth is a non-factor:** both `[48..93]` and `[48..94]` are already past the
  `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` firing threshold and both are Linux-GHA-sole-authoritative per
  D-03. Auditor-independence is untouched (apex still excludes only itself, 95).
- **Lock disposition — CORRECT, not honor-as-is:** STATE.md:174 already flags `[48..93]` as an
  *unconfirmed pending* check ("confirm chain-apex count CHAIN_PHASES=[48..93] (46 entries)") — it was
  written asking to be verified; verification against precedent fails it. The close-gate (Plan 95-04)
  patches ROADMAP SC#2, STATE.md (dep-summary + pending-todo), and REQUIREMENTS HARN-02/03 from
  `[48..93]` (46 entries) → `[48..94]` (47 entries), and the HARN-03 re-audit set + deep-nest depth
  carry-forward update to match.

### D-02: check-phase-94 validator content/shape — Option B "PRESENCE+SELF + `V-94-CONTENT-*` needles" (score **B=3** / C=6 / A=8)

**Decision:** `check-phase-94.mjs` carries `V-94-PRESENCE` + `V-94-SELF` **plus** a hard-asserted
`V-94-CONTENT-*` net using the `check-phase-81` / `check-phase-92` FORM (`{id, file, needle}` array,
CRLF-normalizing file read, forward-slash substring `includes()`, **no allowlist/sidecar, no line
numbers**).

- **Why not lightweight PRESENCE+SELF (Option A):** Phase 94 only PATCHED `docs/macos-lifecycle/
  02-mdm-migration-psso.md` (existing since v1.11 Phase 90), so a bare PRESENCE check is trivially green
  on the OLD bytes and can never fail on a regression of *this phase's* deliverable — durable-net value
  ≈ 0. (Phase-94 review CR-01 shows a sibling-glossary single-URL flat assertion is *still live*,
  proving the regression vector is real.)
- **Why not content-needles-only (Option C):** breaks the V-NN-SELF/PRESENCE structural symmetry every
  other validator in the lineage shares, for no gain.
- **Recommended 5-needle set** (file = `docs/macos-lifecycle/02-mdm-migration-psso.md`; planner
  confirms exact strings against `94-VERIFICATION.md` grep-counts before authoring):

  | id | needle | guards | rot-risk |
  |----|--------|--------|----------|
  | `V-94-CONTENT-URLS-IRU`    | `support.iru.io`                          | MIGV-02 both-URLs lock (D-02)            | LOW |
  | `V-94-CONTENT-URLS-KANDJI` | `support.kandji.io`                       | MIGV-02 anchor URL + searchability       | LOW |
  | `V-94-CONTENT-DOCS-IRU`    | `docs.iru.com`                            | MIGV-02 confirmed delete-path source     | LOW-MED |
  | `V-94-CONTENT-MIGV03`      | `Supervision status (MEDIUM confidence)` | MIGV-03 never-flat-assertion lock        | LOW |
  | `V-94-CONTENT-MIGV01`      | `learn.microsoft.com`                     | MIGV-01 full-confidence-requires-citation| MED |

- **Needle design rules (LOCKED):** assert only 94-CONTEXT-locked, rot-stable invariants
  (brand/URL/domain presence, MEDIUM-confidence framing). **EXCLUDE** rot-brittle pins: exact dates
  (`review_by: 2026-09-24` — author bumps it), exact MS-Learn sentences/URL paths, HTTP-200 strings,
  and any negative `!includes()` needle. The lone MED-rot needle (`learn.microsoft.com`) rots only if
  MIGV-01 loses its citation — exactly the regression it exists to catch (true-positive).

### D-03: 3-axis terminal re-audit (HARN-03) — Option A "full standalone set, CORRECTED OS split" (score **A=2** / C=7 / B=9)

**Decision:** Replicate the Phase 93 recipe, v1.12-relabeled, with the **corrected** Windows-vs-Linux
authority split — the v1.11 plan's "continuity = fast non-apex" label was WRONG.

- **Cross-OS-applicable validator set = 4 diffable rows:**

  | Validator | Type | Windows Axis-1 | Linux Axis-2 | Expected P/F/S | Authority |
  |-----------|------|----------------|--------------|----------------|-----------|
  | `v1.12-milestone-audit.mjs` (`--verbose` + `--self-test` folded) | leaf | **YES** | YES | `15/0/0` | cross-OS EXACT MATCH |
  | `check-phase-94.mjs` (PRESENCE+SELF+CONTENT) | **leaf** | **YES** | YES | net-new — capture (≈`7/0/0`, 2 base + 5 needles) | cross-OS EXACT MATCH |
  | `check-phase-93.mjs` (continuity, CHAIN [48..92]) | **chain** | **NO** (cascades) | YES | `~47/0/1` | **Linux sole-authoritative** |
  | `check-phase-95.mjs` (apex, CHAIN [48..94]) | **chain** | **NO** (cascades) | YES | capture at audit (`~49/0/1`) | **Linux sole-authoritative** |

- **The corrected split (memory `reference_milestone_close_harness_gotchas` #2, code-verified):** ANY
  chain validator (spawns `CHECK_PHASE_NESTED` children over a `[48..N]` range) triggers the O(n²)
  deep-nest cascade on a cold Windows clone (3+ min hang, 12+ node procs — empirically recorded in
  `93-03-AUDIT-RESULTS.md` for the *shallower* `check-phase-88` [48..87]). BOTH `check-phase-95`
  (apex [48..94]) AND continuity `check-phase-93` (CHAIN [48..92]) are chain validators → BOTH cascade
  → BOTH counts come from Linux GHA SOLE-authoritatively. Only the genuine LEAF validators
  (milestone-audit + the PRESENCE/SELF/needle `check-phase-94`) run on Windows Axis-1.
- **Why `check-phase-94` needs a STANDALONE row:** authored this session, never run on Linux; the apex
  emits only a single `CHAIN-94 exits 0` line for nested children, never a diffable triplet. Its
  standalone Linux row is the signal the re-audit most needs.
- **Exclusions (with reasons):** `rotting-external-quarterly` (cron-only; SKIPs on `workflow_dispatch`
  — negative control), `pin-helper-advisory` (CI-only advisory), harness `--self-test` (folded into the
  milestone-audit row), inherited `check-phase-48..92` chain (covered transitively by apex-95 + the
  continuity-93 row).
- **Plan-ordering gate (HARD):** Plan 95-03 runs only AFTER Plan 95-02 (Atom 2) is committed AND
  **pushed to `origin/master`** — the v1.12 workflow's `check-phase-94/95` jobs FAIL (not skip) if
  absent from the dispatched ref. Pre-flight: Atom 2 on `origin/master` + `gh auth status` OK + v1.12
  workflow `state:active`.
- Carry `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` forward to `v1.12-DEFERRED-CLEANUP.md` (update depth →
  **[48..94]**).

### D-04: Plan layout + atom→commit map + close-gate / DEFERRED-CLEANUP routing — Option A across all 4 sub-decisions (scores **A=2** / B=8–9)

**SD-1 — Plan layout / atom→commit map → keep the RATIFIED 4-plan / 5-commit skeleton** (Phase 82 chose
it; Phase 88 + Phase 93 reproduced it verbatim). The layout's value is the revert/ordering invariants,
orthogonal to validator count. Sequential on main tree (`use_worktrees:false`).

```
Plan 95-01 (conventions + Atom 1)
  Wave 1: 95-CONVENTIONS.md (freshness/SHA matrix + locked strings) — COMMIT 1
          docs(95-01): 95-CONVENTIONS.md — Phase 95 constants lock
  Wave 2: ATOM 1 (HARN-01) — INDIVISIBLE commit (3 files) — COMMIT 2
          v1.12-milestone-audit.mjs (Path-A from v1.11, C1-C16 verbatim, self-test preserved)
          + v1.12-audit-allowlist.json (c13 reset for v1.12; quarterly_audit carried)
          + BASELINE_16 freshness comment in regenerate-supervision-pins.mjs
          feat(95-01): v1.12 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)

Plan 95-02 (Atom 2 — HARN-02) — INDIVISIBLE commit (4 files) — COMMIT 3
  check-phase-94.mjs (PRESENCE+SELF + V-94-CONTENT-* needles per D-02)
  + check-phase-95.mjs (chain-apex CHAIN_PHASES=[48..94] per D-01, CHAIN_SKIP=Set([]), V-95-SELF)
  + _lib/frozen-at-close.mjs: V111 = 919b23b entry + readAtV111Close export
  + audit-harness-v1.12-integrity.yml (9th coexistence; new check-phase-94/95 jobs)
    feat(95-02): v1.12 validators + V111 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)
  *** MUST be committed AND pushed to origin/master before Plan 95-03 (D-03 ordering gate) ***

Plan 95-03 (HARN-03 3-axis re-audit — artifact-only commit) — COMMIT 4
  95-03-AUDIT-RESULTS.md (Axis 1 fresh-clone sub-agent [leaf rows only] + Axis 2 Linux GHA
  [chain rows authoritative] + Axis 3 same fresh sub-agent; cross-OS EXACT MATCH per D-03)
    docs(95-03): HARN-03 3-axis terminal re-audit results (artifact-only)

Plan 95-04 (HARN-03 close-gate — SINGLE commit, NO Commit A per SD-2) — COMMIT 5
  v1.12-MILESTONE-AUDIT.md (NEW canonical .planning/milestones/) + v1.12-DEFERRED-CLEANUP.md (NEW)
  + 95-VERIFICATION.md (NEW) + 4-doc traceability flip (PROJECT/ROADMAP/STATE/REQUIREMENTS —
  3 HARN reqs Active→Validated, 6/6; PLUS the D-01 apex [48..93]→[48..94] roadmap/STATE/REQ patch)
    docs(95-04): Phase 95 close-gate — v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.12 MILESTONE CLOSE
```

**Total commits:** 5. Atom 1 = exactly 3 files/1 SHA; Atom 2 = exactly 4 files/1 SHA — both
independently revertable. (Rejected Option B "compress to 3-plan": breaks re-audit/close-gate
revert-isolation and the D-03→D-04 push-ordering gate that two milestones ratified.)

**SD-2 — Close-gate structure → ONE commit, NO Commit A, SINGLE `V111` entry** (A=2 / B=9). Three
convergent proofs: (1) grep-empty (`grep -rn "V111\|readAtV111\|phase_9._close" scripts/validation/` =
EMPTY before this phase); (2) `check-phase-95` (Path-A from `check-phase-93`) reads only PRIOR-milestone
close SHAs via `_lib/frozen-at-close.mjs`, never its own future close SHA; (3) v1.11 closed in a SINGLE
commit → atom == close-gate → a second `V111_CLOSEGATE` would be a dead, misleading export.
`close_commit:` = literal `{phase_95_close_SHA}` placeholder, recoverable via `git log --all
--grep="95-04" --grep="close-gate" --all-match -1 --format=%H`.

**SD-3 — DEFERRED-CLEANUP routing (the v1.12-specific divergence) → DROP resolved / CARRY open / ADD
new** (A=2 / B=9). Path-A from `.planning/milestones/v1.11-DEFERRED-CLEANUP.md`. The "do NOT mask via
deletion" doctrine governs *open* items only — it does not compel carrying *resolved* ones (v1.11
itself dropped its resolved PROV/MIG/RUN/REF/NAV reqs).
- **DROP** (resolved by Phase 94 — recorded Closed in MILESTONE-AUDIT, not silently deleted):
  `INTUNE-PROFILE-ENROLLMENT-01`→MIGV-01, `IRU-CONSOLE-DELETE-01`→MIGV-02,
  `SUPERVISION-STATUS-POST-MIGRATION-01`→MIGV-03.
- **CARRY** verbatim: `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (depth **[48..92]→[48..94]**); MTPSSO-01/02/03;
  KRBFUT-01/02; all v1.8 Part C (ARCHIVE-UPSTREAM-01, HELPER-SPAWN-STDERR-01,
  FROZEN-AWARE-ADOPTION-SWEEP-01, EXEC-FAIL-DETAIL-EXTRACTION-01, **CI-3 Managed-Apple-ID→Account
  rename**, Multi-tenant Apple Business, Apple Business Device API, Per-OU CRD, Account-Holder-lockout,
  ASM); MIGFUT-01/02.
- **ADD:** `GLOSSARY-IRU-URL-FRESHNESS-01` — NEW from Phase-94 code-review CR-01
  (`docs/_glossary-macos.md:~114` still asserts "support portal URL is unchanged: support.kandji.io,"
  contradicting the 3-URL reality MIGV-02 established). A **corpus** follow-up for v1.12+, **NOT** a
  Phase-95 close-gate edit (Phase 95 is tooling-only).

**SD-4 — working-tree cruft + stray pre-close audit → leave untouched** (A=2 / B=8). Tooling-only
phase; cruft cleanup + any stray `.planning/v1.12-MILESTONE-AUDIT.md` deletion deferred to
`/gsd-complete-milestone`. The close-gate authors the CANONICAL `.planning/milestones/
v1.12-MILESTONE-AUDIT.md` (Path-A 7-section: Executive Summary + Phase Closure Narrative + 3-axis
Auditor-Independence Verification + Methodology + Discoveries + Requirements Traceability 6/6 +
sign-off) and **cross-links** (never deletes) any stray pre-close file.

**Net close-gate:** ONE indivisible commit, 7 files (MILESTONE-AUDIT + DEFERRED-CLEANUP +
95-VERIFICATION + PROJECT/ROADMAP/STATE/REQUIREMENTS). **HARD gate:** `git diff <pre-Phase-95-SHA> HEAD
-- <v1.4..v1.11 frozen surfaces>` returns EMPTY at close-gate commit time.

### Claude's Discretion (plan-phase author decides)
- **`95-CONVENTIONS.md` content** — freshness/SHA matrix + locked strings (mirror `88-CONVENTIONS.md`/
  `93-CONVENTIONS.md`): the 4-row cross-OS-applicable set, V111 = `919b23b`, BASELINE_16 anchor SHA, the
  5 `V-94-CONTENT-*` needles, apex `CHAIN_PHASES=[48..94]`.
- **Exact `$rand` charset + temp-dir cleanup assertions** in the Axis-1 sub-agent recipe — recommend
  `[0-9a-z]` 8-char; tune per the v1.11 `93-03` recipe.
- **Final `V-94-CONTENT-*` needle strings** — confirm the 5 chosen needles against `94-VERIFICATION.md`
  grep-counts; keep substring class-signatures (CRLF-normalized), never line-pinned.
- **BASELINE_16 anchor** — recommend a known-PAST SHA (mirrors BASELINE_15 anchoring to a past close),
  NOT the future Phase-95 close SHA.
- **Re-confirm V111 = `919b23b`** on authoring day via `git log --grep="close-gate" --grep="v1.11"
  --all-match -1` (per STATE.md execution-time check) — already verified this session.
- **Exact roadmap/STATE/REQUIREMENTS patch text** for the D-01 apex correction (`[48..93]`→`[48..94]`,
  46→47 entries) — full candidate text in `.claude/tmp/phase95-GA1-advisor.md`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 95 contract docs
- `.planning/ROADMAP.md` — Phase 95 section: Goal + SC#1 (Atom 1: milestone-audit + allowlist +
  BASELINE_16) + SC#2 (Atom 2: check-phase-94..95 + **frozen-at-close V111 entry** + 9th coexistence
  workflow; predecessor byte-unchanged) + SC#3 (3-axis re-audit + cross-OS EXACT MATCH) + SC#4
  (MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability 6/6). **NOTE: SC#2's `CHAIN_PHASES=[48..93]`
  is corrected to `[48..94]` per D-01 — patch at close-gate.**
- `.planning/REQUIREMENTS.md` — HARN-01/02/03 full text + Traceability table (v1.12 = 6 total). Patch
  HARN-02/03 apex-range references to `[48..94]` at close-gate (D-01).
- `.planning/STATE.md` — v1.12 phase dependency summary + "Blockers/Concerns" (Phase 95 execution-time
  checks: confirm V111 = `919b23b`; WINDOWS-CLONE-DEEPNEST mitigation) + the Phase 94 deferred-item
  sources. Patch the dep-summary + pending-todo apex-range from `[48..93]` to `[48..94]` at close-gate
  (D-01).

### Phase 93 (v1.11) — DIRECT Path-A PRECEDENT (the model for the whole phase)
- `.planning/milestones/v1.11-phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/
  93-CONTEXT.md` — the D-01..D-04 decision structure Phase 95 inherits (phase-scoped validator content
  / 4-plan layout / 3-axis auditor independence / single close-gate + NO Commit A).
- `.planning/milestones/v1.11-phases/93-harness-lineage-bump-terminal-re-audit-milestone-close/`
  93-01..93-04 PLAN + SUMMARY files + `93-03-AUDIT-RESULTS.md` (cross-OS EXACT MATCH evidence +
  `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` firing evidence) + 93-CONVENTIONS.md + 93-VERIFICATION.md.
- `.planning/milestones/v1.11-MILESTONE-AUDIT.md` — Path-A source for `v1.12-MILESTONE-AUDIT.md`
  (7-section skeleton).
- `.planning/milestones/v1.11-DEFERRED-CLEANUP.md` — Path-A source for `v1.12-DEFERRED-CLEANUP.md`
  (DROP resolved MIGV / CARRY open / ADD glossary CR-01 per SD-3).

### Phase 94 — content-phase artifacts (READ BEFORE AUTHORING check-phase-94 needles)
- `.planning/phases/94-post-migration-verification-content-closure/94-CONTEXT.md` — the MIGV D-01..D-04
  decisions = what the `V-94-CONTENT-*` needles must assert.
- `.planning/phases/94-post-migration-verification-content-closure/94-VERIFICATION.md` — grep-counts of
  every candidate needle string (confirm robustness before pinning).
- the 94-01 PLAN + SUMMARY + `git show acdbdeb -- docs/macos-lifecycle/02-mdm-migration-psso.md` — the
  actual MIGV-02 edit + surrounding 94-01 commits.
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — the file `check-phase-94` asserts content needles
  against (the 5 needles target this path).

### Path-A sources (READ BEFORE AUTHORING)
- `scripts/validation/v1.11-milestone-audit.mjs` — Path-A source for `v1.12-milestone-audit.mjs`
  (C1–C16 verbatim; self-test).
- `scripts/validation/v1.11-audit-allowlist.json` — Path-A source for `v1.12-audit-allowlist.json`
  (c13 reset; `quarterly_audit` cadence).
- `scripts/validation/check-phase-93.mjs` — Path-A source for `check-phase-95.mjs` (CHAIN_PHASES →
  {48..94}; CHAIN_SKIP empty-Set; V-NN-SELF guard; `CHECK_PHASE_NESTED=1` child-spawn relevant to D-03)
  AND the v1.12 continuity row in the re-audit set.
- `scripts/validation/check-phase-84.mjs..87.mjs` — the lightweight `V-NN-PRESENCE` + `V-NN-SELF` base
  shape for `check-phase-94`.
- `scripts/validation/check-phase-81.mjs` / `check-phase-92.mjs` — the `{id,file,needle}` content-needle
  assertion FORM (CRLF-normalized read, forward-slash substring) for `V-94-CONTENT-*` (D-02).
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (…**V110: 'a3617e9'**; no
  V111) + `readAtClose` + `readAtV110Close` — the exact shape the `V111: '919b23b'` entry +
  `readAtV111Close` must follow.
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_15 region; BASELINE_16 comment lands
  here (HARN-01); anchors to a known-PAST SHA.
- `.github/workflows/audit-harness-v1.11-integrity.yml` — Path-A source for
  `audit-harness-v1.12-integrity.yml` (9th coexistence; `fetch-depth: 0`, `core.autocrlf false`,
  `continue-on-error: false`, `timeout-minutes: 30`; check-phase jobs; negative-control + advisory job
  structure).

### Advisor dossiers (full reasoning, for planner deep-dive)
- `.claude/tmp/phase95-GA1-advisor.md` (155 lines) — apex range (Option A `[48..94]`; off-by-one
  correction; exact roadmap/STATE/REQ patch text).
- `.claude/tmp/phase95-GA2-advisor.md` — check-phase-94 shape (Option B; 5-needle table w/ rot-risk;
  exclusions).
- `.claude/tmp/phase95-GA3-advisor.md` (91 lines) — 3-axis re-audit (Option A; 4-row validator/OS-split
  table; both-chain-validators-Linux-authoritative correction).
- `.claude/tmp/phase95-GA4-advisor.md` (134 lines) — plan layout + close-gate (Option A ×4; commit map;
  DEFERRED-CLEANUP DROP/CARRY/ADD ledger; V111=919b23b verification).

### Constraints / anti-regression
- `.planning/config.json` — `use_worktrees: false` durable per memory `project_execphase_sequential.md`.
- Predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7/v1.8/v1.9/v1.10/v1.11 workflow YAMLs + milestone-audit MJS +
  sidecar JSONs BYTE-UNCHANGED through close-gate (chain validators `check-phase-{48..94}.mjs` are NOT
  in the invariant).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Path-A milestone-audit template** — `scripts/validation/v1.11-milestone-audit.mjs` (C1–C16,
  self-test). `v1.12-milestone-audit.mjs` is a verbatim Path-A copy with v1.12 labels — no new
  C-category (D-04/SD-1).
- **Path-A allowlist + sidecar** — `scripts/validation/v1.11-audit-allowlist.json`
  (`c13_rotting_external` + `quarterly_audit` cadence). v1.12 copy resets c13 for v1.12.
- **Path-A chain-apex validator** — `scripts/validation/check-phase-93.mjs` (CHAIN_PHASES → {48..92};
  CHAIN_SKIP empty-Set; `CHECK_PHASE_NESTED=1` child-spawn). `check-phase-95.mjs` Path-A copy →
  **{48..94}** (D-01). Also serves as the v1.12 continuity re-audit row (Linux-authoritative, D-03).
- **Lightweight per-phase validator shape** — `scripts/validation/check-phase-84..87.mjs`
  (V-NN-PRESENCE + V-NN-SELF). Base shape for `check-phase-94` (extended with V-94-CONTENT-* per D-02).
- **Content-needle assertion FORM** — `scripts/validation/check-phase-81.mjs` / `check-phase-92.mjs`
  (`{id,file,needle}`; CRLF-normalized; forward-slash substring). Model for `V-94-CONTENT-E1..E5`.
- **Centralized frozen-aware helper** — `scripts/validation/_lib/frozen-at-close.mjs` (last entry
  V110='a3617e9'; no V111 yet → confirms `check-phase-95` reads only prior closes → NO Commit A). V111 =
  `919b23b` + `readAtV111Close` added in Atom 2.
- **Path-A CI workflow** — `.github/workflows/audit-harness-v1.11-integrity.yml` (9th-coexistence target
  shape). v1.12 copy is the 9th parallel file.
- **3-axis re-audit recipe** — v1.11 `93-03-AUDIT-RESULTS.md` (Axis 1 fresh-clone sub-agent; Axis 2 GHA
  workflow_dispatch; Axis 3 same fresh sub-agent; the deep-nest firing evidence).
- **Close-gate pattern** — Plan 93-04 (single-commit; VERIFICATION.md + 4-doc traceability flip + literal
  `{phase_NN_close_SHA}` placeholder). The v1.11 stray pre-close audit boundary (cross-link, don't
  delete) is the SD-4 precedent.

### Established Patterns
- **CHAIN_SKIP empty-Set invariant** — `check-phase-95.mjs` MUST declare `CHAIN_SKIP = new Set([])`
  (V-95-SELF enforces).
- **CHAIN_PHASES excludes validator's own phase** — `check-phase-95.mjs` CHAIN_PHASES = {48..94}; V-95-SELF
  asserts 95 not included (auditor-independence). Includes content phase 94 per the [48..N-1] invariant
  (D-01).
- **Atomic-commit indivisibility per ROADMAP SC#1** — Atom 1 (3 files) + Atom 2 (4 files) each land in
  ONE SHA.
- **Predecessor-byte-unchanged anti-regression** — `git diff <pre-95> HEAD -- <v1.4..v1.11 frozen
  surfaces>` EMPTY at close-gate.
- **CHECK_PHASE_NESTED=1 child-spawn** — chain children short-circuit to a single `CHAIN-NN exits 0`
  line → net-new `check-phase-94` needs a STANDALONE cross-OS row (D-03).
- **Deep-nest timeout is depth-monotone AND hits ALL chain validators** — fired at [48..87] in v1.10;
  BOTH continuity-93 ([48..92]) AND apex-95 ([48..94]) cascade on cold Windows → both counts Linux-GHA
  sole-authoritative (D-03; memory `reference_milestone_close_harness_gotchas` #2).

### Integration Points
- **`scripts/validation/v1.12-milestone-audit.mjs`** — NEW; 10th in the milestone-audit lineage.
- **`scripts/validation/check-phase-94.mjs`** (PRESENCE+SELF+CONTENT) + **`check-phase-95.mjs`**
  (chain-apex {48..94}; future v1.13+ Path-A source) — 2 NEW validators.
- **`scripts/validation/_lib/frozen-at-close.mjs`** — V111 = `919b23b` + `readAtV111Close` (Atom 2).
- **`.github/workflows/audit-harness-v1.12-integrity.yml`** — NEW; 9th coexistence file; check-phase-94/95
  jobs MUST be on `origin/master` before Plan 95-03 Axis 2 dispatch (D-03 ordering gate).
- **`.planning/milestones/v1.12-MILESTONE-AUDIT.md`** + **`v1.12-DEFERRED-CLEANUP.md`** — NEW canonical
  artifacts (cross-link any pre-close `.planning/v1.12-MILESTONE-AUDIT.md`, do NOT delete it).
- **PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md** — 4-doc traceability flip (3 HARN reqs
  Active→Validated; 6/6) + the D-01 apex `[48..93]`→`[48..94]` correction, in the single close-gate commit.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (memory
  `feedback_adversarial_review_preference`) — honored verbatim: 4 parallel `gsd-advisor-researcher`
  agents (Finder/Adversary/Referee scoring, lower = better). User explicitly instructed "For each choice
  in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."
  User approved all 4 — including the D-01 roadmap-lock correction — in one selection.
- **User maximum-effort preference** (memory `feedback_effort_level`) — each dossier 91–155 lines with
  concrete operational recipes, drop-in needle tables, anti-regression analysis, adversarial wedges.
- **The D-01 off-by-one is the headline finding.** The roadmap `[48..93]` lock contradicts the
  triple-confirmed `[48..N-1]` invariant; STATE.md:174 itself flagged it as unconfirmed. Correcting to
  `[48..94]` keeps the recurring CI net over guide-02 MIGV content (via the apex replaying
  `check-phase-94`'s V-94-CONTENT needles).
- **check-phase-94 is a CONTENT-PATCH validator, not a NEW-FILE validator** — unlike every v1.11
  per-phase validator. Bare PRESENCE is meaningless on the pre-existing guide 02 → V-94-CONTENT needles
  are load-bearing (D-02).
- **The "continuity = fast non-apex" label from v1.11 was wrong** — continuity `check-phase-93` recurses
  [48..92] and cascades on cold Windows just like the apex. Both Linux-authoritative (D-03).
- **V111 = `919b23b`** — verified the v1.11 close-gate SHA (`docs(93-04)`, single-commit close). Lands in
  **Atom 2** (per ROADMAP SC#2 + HARN-02).
- **Today's date is 2026-06-26.** Phase 95 discussion authoring date. No `docs/*` corpus edit → no
  frontmatter `last_verified:` bumps (tooling-only phase).
- **"9th coexistence file" locked** — coexists with the 8 prior audit-harness YAMLs (v1.4 + v1.5..v1.11);
  zero modifications to those 8.
- **"DO NOT mask via deletion" doctrine continued, correctly scoped** — it governs *open* deferred items
  only. The 3 MIGV items are genuinely RESOLVED by Phase 94 → recorded Closed in MILESTONE-AUDIT and
  DROPPED from DEFERRED-CLEANUP (mirrors v1.11 dropping its own resolved reqs); carrying them would be
  stale. The stray pre-close `.planning/v1.12-MILESTONE-AUDIT.md` (if any) is cross-linked, NOT deleted.

</specifics>

<deferred>
## Deferred Ideas

### Routed to v1.12-DEFERRED-CLEANUP.md by this phase (HARN-03 / SD-3)
- **`GLOSSARY-IRU-URL-FRESHNESS-01`** (NEW) — `docs/_glossary-macos.md:~114` still asserts "support
  portal URL is unchanged: support.kandji.io," contradicting the 3-URL reality MIGV-02 established
  (source: Phase-94 code-review CR-01). A **corpus** follow-up for v1.12+, NOT a Phase-95 tooling-close
  edit.
- **`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`** carried forward (update chain depth → **[48..94]**); mitigation
  = both chain-validator counts (apex-95 + continuity-93) from Linux GHA.
- Plus all carried-forward v1.11 deferred items (preserved Path-A from `v1.11-DEFERRED-CLEANUP.md`:
  MTPSSO/KRBFUT/MIGFUT futures, CI-3 Managed-Apple-ID→Account rename, v1.8 Part C carry-forwards) + any
  discoveries surfaced during execution.

### Dropped from DEFERRED-CLEANUP (resolved by Phase 94 — recorded Closed in MILESTONE-AUDIT)
- **`INTUNE-PROFILE-ENROLLMENT-01`** → resolved by MIGV-01 (Microsoft-Learn-cited full-confidence).
- **`IRU-CONSOLE-DELETE-01`** → resolved by MIGV-02 (both-URL + verified delete path).
- **`SUPERVISION-STATUS-POST-MIGRATION-01`** → resolved by MIGV-03 (MEDIUM-confidence callout + pilot).

### Discussed but explicitly out of v1.12 Phase-95 scope
- **A new global blocking C17 category** — D-02 routes Phase-94 content verification to a phase-scoped
  `check-phase-94.mjs` V-94-CONTENT net instead (keeps Path-A C1–C16 verbatim; v1.12 ROADMAP has no C17).
- **A chicken-and-egg Commit A** — SD-2 grep-proves no v1.12 artifact forward-references the close SHA.
- **A second `V111_CLOSEGATE` frozen entry** — v1.11 closed in a single commit (atom == close-gate).
- **Worktree-based execution** — `use_worktrees:false` durable.
- **`docs/*` corpus edits** (incl. the glossary CR-01 fix) — v1.12 Phase 95 is tooling-only.
- **Working-tree cruft cleanup + stray pre-close audit deletion in the close-gate** — out of scope;
  deferred to `/gsd-complete-milestone` (keeps the close-gate a clean 7-file atom).

</deferred>

---

*Phase: 95-harness-lineage-bump-terminal-re-audit-milestone-close*
*Context gathered: 2026-06-26*
