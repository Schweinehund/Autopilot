# Phase 74: v1.8 Audit Harness Lineage Bump + Milestone Close (Pillar D) - Context

**Gathered:** 2026-06-08
**Status:** Ready for planning

<domain>
## Phase Boundary

The **Wave D close-gate** of v1.8 — the terminal milestone-close phase. Direct v1.8 twin of **Phase 70** (v1.7 Pillar D). Ships 7 requirements: HARNESS-07..12 + VPP-01. Depends on Phases 71 (ARCHIVE-01 root-cause fix CLOSED — so v1.8 archival doesn't re-trigger the placeholder-label defect), 72 (CHAIN-WRAPPER-01 CLOSED), 73 (RETRO-01/02 frozen-aware conversions CLOSED — chain inherits **39 PASS / 0 FAIL / 1 SKIPPED**, CHAIN-DEGRADED-AT-HEAD-01 CLOSED at `a85da77`). Independent of nothing — this phase REQUIRES Pillars A/B/C complete.

**What this phase delivers (locked by ROADMAP SC#1-5 + REQUIREMENTS Pillar D):**

- **HARNESS-07** — `scripts/validation/v1.8-milestone-audit.mjs` Path-A copy from `v1.7-milestone-audit.mjs` (C1-C13 + C14/C15/C16 verbatim; 6th milestone in the v1.4→v1.4.1→v1.5→v1.6→v1.7→v1.8 lineage; self-test 9/9 PASS preserved).
- **HARNESS-08** — `scripts/validation/v1.8-audit-allowlist.json` Path-A copy from `v1.7-audit-allowlist.json` with `c13_rotting_external` reset for v1.8 (CI-1/CI-2 reflect Phase 67 SWEEP-01/02 closed state + **post-VPP-4-sites annotations**); `quarterly_audit` metadata carried forward (cadence `0 8 1 1,4,7,10 *`); **BASELINE_12 freshness comment** added to `regenerate-supervision-pins.mjs` (closes BASELINE_11 v1.7 carry-over).
- **HARNESS-09** — Per-phase validators `check-phase-71.mjs..check-phase-74.mjs` ship as deliverables. `check-phase-74.mjs` is the NEW chain-apex (Path-A from `check-phase-73.mjs`; CHAIN_PHASES = {48..73}; CHAIN_SKIP = `new Set([])`; V-74-SELF guard excludes 74). **Note:** check-phase-71/72/73.mjs ALREADY EXIST (shipped as validators-as-deliverable in Phases 71/72/73) — HARNESS-09's "ship check-phase-71..74" obligation is satisfied for 71/72/73 by their existing presence + verification they're chain-current; only `check-phase-74.mjs` is net-new authoring. Plan-phase confirms 71/72/73 need no re-authoring (predecessor-byte-unchanged does NOT cover chain validators, but no edit is needed).
- **HARNESS-10** — `.github/workflows/audit-harness-v1.8-integrity.yml` Path-A from v1.7; **5th parallel coexistence file** (coexists with `audit-harness-integrity.yml` + v1.5 + v1.6 + v1.7 — zero modifications to those 4); v1.8-scoped path-filter + 2 crons preserved + new validator jobs check-phase-71..74; `fetch-depth: 0` on linux-chain-ubuntu-latest preserved (FETCH-DEPTH-01 inheritance); PR-blocking per D-A9 (only `pin-helper-advisory` retains `continue-on-error: true`). **Authoritative count = "fifth" per ROADMAP SC#1; REQUIREMENTS HARNESS-10 "Fourth" is a stale headline — empirically only 4 audit-harness YAMLs exist today, so v1.8 is the 5th.**
- **HARNESS-11** — 3-axis terminal re-audit at v1.8 close (HARNESS-05 v1.7 precedent extended). Axis 1 local fresh `git clone --no-hardlinks` into `$env:TEMP\v1.8-audit-<rand>` via fresh `gsd-executor` sub-agent (D-03 LOCKED + D-22 INTENT auditor independence); Axis 2 cross-OS Linux GHA `workflow_dispatch` of `audit-harness-v1.8-integrity.yml`; Axis 3 fresh sub-agent zero context-carryover. Cross-OS PASS-Count **EXACT MATCH** across all cross-OS-applicable validators.
- **HARNESS-12** — `.planning/milestones/v1.8-MILESTONE-AUDIT.md` authored Path-A from v1.7 (3-axis Auditor-Independence Verification + NEW Discoveries Surfaced During Execution + Requirements Traceability + Sign-off /gsd-complete-milestone hand-off; ARCHIVE-01 recurrence-check now **PRE-VERIFIED by Pillar A** `e4887b2`); `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` **FINALIZED** (6 v1.7 carry-overs promoted to full sections; 6 existing sections preserved); 4-doc traceability closure (12 reqs Active→Validated across PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md).
- **VPP-01** — Surgical rename of **4** "VPP location token" sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155, **160**) → "content token" form per PITFALLS:657 first-mention-per-H2 convention. Mirrors Phase 67 SWEEP-02 atomic-within-plan pattern. **Site-count correction approved by user 2026-06-08:** the locked contract says "3 sites" but the source-of-truth that spawned VPP-01 (`v1.7-DEFERRED-CLEANUP.md:213`) records L160 as "the 4th occurrence; total 4". Renaming all 4 leaves zero legacy leak (see D-02).

**Entry-state (Phase 73 closed 2026-06-08):** clean chain (39 PASS / 0 FAIL / 1 SKIPPED); `_lib/frozen-at-close.mjs` available (`MILESTONE_CLOSE_SHAS` = V141 `5c976ec` / V15 `ba2cbc0` / V16 `9d8877c` / V17 `aa6de68` / V17_CLOSEGATE `4df3a16` — **no V18, no `readAtV18Close`**); `check-phase-73.mjs` is the current chain-apex (Path-A source for `check-phase-74.mjs`); CHAIN-DEGRADED-AT-HEAD-01 CLOSED; 5/12 v1.8 requirements complete (ARCHIVE-01/02 + WRAPPER-01 + RETRO-01/02); predecessor v1.4..v1.7 frozen surfaces BYTE-UNCHANGED.

**Out of scope (Phase 74 owns nothing else):**

- Any `docs/*` corpus edits beyond the VPP-01 4-site rename — v1.8 is tooling-only (`REQUIREMENTS.md` Out of Scope). The bare `VPP token` / `Apple VPP tokens` / `VPP tokens` forms at lines 142/150/161 are NOT "VPP location token" (different term, not the Apple-Business rebrand target) — explicitly NOT renamed (user picked "Rename all 4," not the "+ flag bare forms" option).
- Modification to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit harness MJS + sidecar JSONs — predecessor-byte-unchanged invariant per `REQUIREMENTS.md` (chain validators `check-phase-{48..73}.mjs` are NOT in that invariant per Phase 68/72/73 precedent).
- Re-opening the 5 v1.8 deferred stubs (ARCHIVE-UPSTREAM-01, CHAIN-DEGRADED-AT-HEAD-01 [CLOSED], v1.1-line-164 token-class, HELPER-SPAWN-STDERR-01, FROZEN-AWARE-ADOPTION-SWEEP-01, EXEC-FAIL-DETAIL-EXTRACTION-01) — preserved as-is; only the 6 v1.7 carry-overs get promoted.
- CI-3 (Managed Apple ID rename) + Multi-tenant + ABDevice API + per-OU CRD + Account Holder runbook + ASM — promoted to v1.8-DEFERRED-CLEANUP.md full sections but NOT implemented (v1.9+ triggers).
- A chicken-and-egg `Commit A` SHA-placeholder-fill — NOT needed (see D-04; RETRO-02 removed the inline-frozen-helper mechanism that forced Phase 70's Commit A).
- Worktree-based execution — `.planning/config.json:7` `use_worktrees:false` durable per memory `project_execphase_sequential.md`.
- New C-checks beyond v1.7 inheritance — v1.8 harness is Path-A (C1-C16 verbatim), no new C-categories.

</domain>

<decisions>
## Implementation Decisions

All four gray areas resolved via 4 parallel `gsd-advisor-researcher` agents in adversarial-review mode (Finder argues FOR each option, Adversary AGAINST, Referee scores; lower = better) per user memory `feedback_adversarial_review_preference`. Each advisor read REQUIREMENTS/ROADMAP/STATE Pillar-D sections + v1.7/v1.8-DEFERRED-CLEANUP + Phase 70 (the direct v1.7 Pillar D precedent) plans/CONTEXT/VERIFICATION + Phase 67 SWEEP-02 + actual source files (`scripts/validation/*.mjs`, `.github/workflows/*.yml`, the VPP target doc). Scores match prior-phase convention (D-01 winner band 6-10; D-02 4-9; D-03 8-14; D-04 1.5-7). User approved all 4 via single "Approve all 4 — write CONTEXT.md" selection, plus an explicit VPP scope decision (rename all 4 sites). Full dossiers at `.claude/tmp/phase74-D{01,02,03,04}-advisor.md`.

### D-01: Plan layout + VPP-01 placement — Option D (5-plan layout, VPP in scaffold plan) (score **D=7** / B=10 / A=12 / C=13)

**Decision:** 5-plan layout mirroring the Phase 70 twin. ROADMAP SC#1 pre-locks the two atoms as indivisible; VPP-01 lands in the scaffold plan (74-01) so BOTH SC#1 atoms stay pristine, revert-isolated, dedicated commits. VPP-corpus must precede Atom 1 because the VPP-01 `ci_2_vpp_location_token` sidecar annotations physically live INSIDE `v1.8-audit-allowlist.json` — the file Atom 1 creates.

```
Plan 74-01 (scaffold + VPP-01 corpus — 2 commits)
  Wave 1: VPP-01 corpus rename (4 sites 115/149/155/160 in 02-macos-pkg-dmg-pipeline.md
          + frontmatter last_verified bump + scoped PITFALL-6 leak-check) — ATOMIC commit (D-02)
  Wave 2: Scaffold — check-phase-74.mjs (Path-A from check-phase-73.mjs, CHAIN_PHASES={48..73})
          + 74-CONVENTIONS.md freshness/SHA matrix — commit
  (Note: V-74-VPP assertions in check-phase-74.mjs reference the post-Wave-1 corpus state)

Plan 74-02 (Atom 1 — HARNESS-07 + HARNESS-08 — 1 INDIVISIBLE commit)
  v1.8-milestone-audit.mjs (Path-A from v1.7) + v1.8-audit-allowlist.json (post-VPP, 4 new ci_2
  resolved entries) + BASELINE_12 freshness comment in regenerate-supervision-pins.mjs
  → 3 files indivisible per ROADMAP SC#1
    feat(74-02): v1.8 harness-core Path-A — HARNESS-07/08 + BASELINE_12 (atomic SC#1 Atom 1)

Plan 74-03 (Atom 2 — HARNESS-09 + HARNESS-10 — 1 INDIVISIBLE commit)
  check-phase-71..74.mjs (74 net-new; 71/72/73 verified chain-current) + audit-harness-v1.8-integrity.yml
  (5th coexistence file) → indivisible per ROADMAP SC#1 Atom 2
    feat(74-03): v1.8 validators + CI surface — HARNESS-09/10 (atomic SC#1 Atom 2)
  *** MUST be committed AND pushed to origin/master before Plan 74-04 (D-03 ordering gate) ***

Plan 74-04 (HARNESS-11 3-axis terminal re-audit — artifact-only commit)
  74-04-AUDIT-RESULTS.md (Axis 1 fresh-clone sub-agent + Axis 2 Linux GHA + Axis 3 fresh sub-agent;
  cross-OS EXACT MATCH across 6 cross-OS-applicable validators)
    docs(74-04): HARNESS-11 3-axis terminal re-audit results (artifact-only)

Plan 74-05 (HARNESS-12 close-gate — SINGLE commit per D-04)
  v1.8-MILESTONE-AUDIT.md (NEW) + v1.8-DEFERRED-CLEANUP.md (FINALIZE) + 4-doc traceability flip
  (PROJECT/ROADMAP/STATE/REQUIREMENTS — 12 reqs Active→Validated) + 74-VERIFICATION.md (NEW)
    docs(74-05): Phase 74 close-gate — v1.8 MILESTONE-AUDIT + DEFERRED-CLEANUP finalize + 4-doc traceability + v1.8 MILESTONE CLOSE
```

**Total commits:** 6 (74-01 × 2 + 74-02 + 74-03 + 74-04 + 74-05). Atoms 1 & 2 stay revert-isolated; VPP corpus revertable independent of harness; close-gate isolated.

**Rationale (per `.claude/tmp/phase74-D01-advisor.md`):**
- **Adversarial wedge:** the HARNESS-08↔VPP-01 sidecar coupling (VPP annotations live inside the file Atom 1 creates) forces VPP-before-Atom-1; the only winning layout lands VPP in the already-mixed scaffold plan, keeping both SC#1-locked atoms pristine while hitting the Phase-70 5-plan count exactly.
- **Option A (6 plans, VPP standalone first):** spends a 6th plan at the STATE plan-estimate ceiling on illusory isolation (VPP must couple to the allowlist anyway). Score 12.
- **Option B (VPP folded into Atom-1 plan):** contaminates the SC#1 Atom-1 plan and inverts corpus-before-freshness-matrix ordering. Score 10.
- **Option C (4-plan compress):** kills the structural scaffold plan — the v1.7-D-04-Option-C loser-clone. Score 13.
- **Phase-70 twin symmetry:** Phase 70 used 5 plans (70-01 scaffold/conventions, 70-02 Atom 1, 70-03 Atom 2, 70-04 re-audit artifact, 70-05 close-gate). Phase 74 inherits the shape; VPP-01 rides in 74-01 Wave 1.

### D-02: VPP-01 corpus-edit handling — Option C "convention-faithful hybrid" (score **C=4** / B=5 / A=8 / D=11)

**Decision:** "Mirror SWEEP-02" = mirror what SWEEP-02 EMPIRICALLY did (commit `55260b3`), not its headline. Explicit stances:

1. **Frontmatter `last_verified:` bump — YES.** It is this file family's native provenance mechanism; SWEEP-02 bumped every edited file. (Supersedes the prior-phase "no docs edits → no bump" note, which applied because 71/72/73 had no corpus edits; VPP-01 IS a corpus edit.)
2. **Version History rows — YES, but NOT in-file.** The target `02-macos-pkg-dmg-pipeline.md` (and every `app-lifecycle/` sibling) has NO `## Version History` H2 — SWEEP-02 only appended to PRE-EXISTING tail-tables and never fabricated one. Route provenance to the v1.8 milestone ledger (HARNESS-11/12) + glossary coordinating-row. In-file provenance = the frontmatter `last_verified` bump.
3. **Sidecar annotation — YES.** New v1.8 sidecar `c13_rotting_external.ci_2_vpp_location_token` gains all **4** sites, each `resolved_<phase74-date>: true`, SWEEP-02 ANNOTATE-not-remove shape (the v1.7 sidecar stays frozen — predecessor-byte-unchanged). JSON shape in dossier §5.
4. **PITFALL-6 anchor inventory — YES, scoped.** Substring pre/post leak-check (zero "VPP location token" remain; ≥4 "content token" present) + heading snapshot only; NO full anchor-inventory artifact (target has zero incoming deep links — exactly SWEEP-02's skip rule for non-glossary files).
5. **Per-phase validator assertion — YES.** `check-phase-74.mjs` ships V-74-VPP-01a/b (≥4 "content token", zero bare "VPP location token" leak, sidecar 4-resolved), mirroring V-67-03/04. Pseudocode in dossier §6.
6. **Atomic boundary — YES.** ONE commit (74-01 Wave 1): 4 rewrites + frontmatter bump + sidecar + scoped leak-check; clean `git revert`.

**Rationale (per `.claude/tmp/phase74-D02-advisor.md`):**
- **Adversarial wedge:** literal "mirror SWEEP-02" (Option A: fabricate a VH section + full anchor artifact) DIVERGES from what SWEEP-02 actually did and violates LEAST-INVASIVE — same failure that scored 67-CONTEXT D-01 Option A a 6.
- **Secondary empirical wedge:** the "3 sites" headline is wrong — 4 occurrences (115/149/155/160); `v1.7-DEFERRED-CLEANUP.md:213` records L160 as the 4th. Renaming only 3 leaves a live legacy leak — the exact rotting-reference debt v1.8 closes. **User approved 4-site rename 2026-06-08.**
- **Option D (skip sidecar / lighter):** breaks the HARNESS-08 "post-VPP annotations" contract. Score 11.

### D-03: 3-axis terminal re-audit (HARNESS-11) — Option A "exact Phase-70 replication" (score **A=9** / C=15 / B=16 / D=16)

**Decision:** Replicate the Phase 70 HARNESS-05 recipe, v1.8-relabeled.

- **Axis 1 (local physical independence):** ONE fresh `gsd-executor` sub-agent (Task/Agent tool) runs a ~10-step PowerShell recipe — generate `$rand` over `[0-9a-z]`; `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.8-audit-<rand>`; assert cloned HEAD SHA == source HEAD SHA; run `v1.8-milestone-audit.mjs` + `--self-test` + chain-apex `check-phase-74.mjs` (+ 70/71/72/73); capture exit codes + PASS/FAIL/SKIP counts; `Remove-Item -Recurse -Force` the temp clone; assert zero orphans. A fresh `git clone --no-hardlinks` into TEMP is NOT a worktree — it is exactly how D-22 auditor-independence is achieved under `use_worktrees:false`.
- **Axis 2 (cross-OS):** main-session `gh workflow run audit-harness-v1.8-integrity.yml --ref master`; capture run URL + per-job conclusions + Linux chain timing.
- **Axis 3 (logical/context independence):** the SAME sub-agent as Axis 1 serves zero-context-carryover. The requirement's Axis-1/Axis-3 are ONE dispatch covering two independence dimensions (physical clone + logical context) — **do NOT spawn two separate agents** (Option D literalism scored 16).
- **Cross-OS-applicable validator set = 6:** `v1.8-milestone-audit.mjs` + chain-apex `check-phase-70.mjs` + `check-phase-71.mjs` + `check-phase-72.mjs` + `check-phase-73.mjs` + `check-phase-74.mjs`. **Excluded** (with reasons): `pin-helper-advisory` (CI-only advisory, not run locally), `rotting-external-quarterly` (cron-only, skips on workflow_dispatch — negative control), harness `--self-test` (local supporting evidence, not a cross-OS row). No validator is Windows-path-specific (all CRLF-normalize + use `process.cwd()`).
- **Artifact:** separate artifact-only commit `74-04-AUDIT-RESULTS.md` (mirrors Phase 70's `8175f82`), consumed by HARNESS-12 close-gate.

**Plan-ordering gate (HARD):** Plan 74-04 runs only AFTER Plan 74-03 (Atom 2: check-phase-71..74 + yml) is committed AND pushed to `origin/master` — the workflow's check-phase-71..74 jobs are active `node` invocations that FAIL (not skip) if absent from the dispatched ref. Blocking gate: Atom 2 on `origin/master` + `gh auth status` OK + v1.8 workflow `state:active`.

**Rationale (per `.claude/tmp/phase74-D03-advisor.md`):**
- **Adversarial wedge "captured-before-authored auditor independence":** Option A is the only one that captures via one isolated fresh sub-agent fresh-clone, confirms cross-OS via GHA on the already-pushed Atom 2, and freezes a standalone artifact-only commit the close-gate later consumes. B collapses evidence into the citing doc (loses audit trail + bisect boundary, score 16); C inverts capture order inviting post-hoc fitting (15); D fractures one dispatch into two with zero added independence (16).
- **v1.8 simplification vs v1.7:** ARCHIVE-01 root-cause is already CLOSED (Phase 71 `e4887b2`), so the close-gate ARCHIVE-01 recurrence-check is PRE-VERIFIED rather than deferred-open as it was at v1.7 close.

### D-04: Close-gate SHA + traceability + DEFERRED finalize (HARNESS-12) — Option A "single close-gate commit, NO Commit A" (score **A=2.0** / D=5.0 / C=6.5 / B=8.0)

**Decision:** ONE close-gate commit (Plan 74-05). **Commit A (SHA-placeholder-fill) is NOT needed.** Empirically verified across all three candidate forward-coupling sites:

- **BASELINE_12** (in `regenerate-supervision-pins.mjs`): not yet placed (`grep -c` = 0); precedent BASELINE_11 anchors to a KNOWN-PAST SHA (`26a1ae9`, Phase 69 close), not a future close SHA. "BASELINE_12 refreshes at v1.8 close" is forward-pointer prose, not an embedded placeholder.
- **check-phase-71..74.mjs V-NN assertions:** `grep -rln phase_7N_close scripts/` = EMPTY. Structural reason (the decisive wedge): **Phase 73 RETRO-02 (`a85da77`) centralized all frozen reads into `_lib/frozen-at-close.mjs`**, whose `MILESTONE_CLOSE_SHAS` has V141/V15/V16/V17/V17_CLOSEGATE but **no V18 and no `readAtV18Close`**. `check-phase-74.mjs` (Path-A of 73) reads only PRIOR-milestone close SHAs.
- **v1.8-milestone-audit.mjs:** `close_commit:` is a literal markdown-frontmatter placeholder, not a live `git show` anchor.

**Close-gate structure:** ONE commit, ~7 files — `v1.8-MILESTONE-AUDIT.md` (NEW) + `v1.8-DEFERRED-CLEANUP.md` (FINALIZE) + REQUIREMENTS/PROJECT/ROADMAP/STATE (4-doc flip) + `74-VERIFICATION.md` (NEW). Flips **7** v1.8 reqs Active→Validated (HARNESS-07..12 + VPP-01; cumulative 12/12). HARNESS-07..11 + VPP-01 record their known atom SHAs (74-01..74-04); HARNESS-12 uses literal `{phase_74_close_SHA}` recoverable via `git log --all --grep="74-05" --grep="close-gate" --all-match -1 --format=%H` — same idiom as 71-03/72-02/73-03 (6× precedent). **HARD gate:** `git diff <pre-Phase-74-SHA> HEAD -- <v1.4/v1.4.1/v1.5/v1.6/v1.7 frozen surfaces>` returns EMPTY at close-gate commit time.

**DEFERRED-CLEANUP finalization shape:** Preserve all 6 existing sections as-is (ARCHIVE-UPSTREAM-01; CHAIN-DEGRADED-AT-HEAD-01 already CLOSED at `a85da77`; v1.1-line-164 token-class; HELPER-SPAWN-STDERR-01; FROZEN-AWARE-ADOPTION-SWEEP-01; EXEC-FAIL-DETAIL-EXTRACTION-01). Content-append the 6 promoted v1.7 carry-overs (CI-3, Multi-tenant Apple Business, ABDevice API, per-OU CRD, Account Holder runbook, ASM) from `v1.7-DEFERRED-CLEANUP.md:225-333` as full sections before Cross-References; bump trigger language v1.8+→v1.9+; footer STUB→FINALIZED. Net: 12 sections.

**v1.8-MILESTONE-AUDIT.md:** Path-A from `v1.7-MILESTONE-AUDIT.md` section skeleton (Executive Summary + 4-Pillar Closure Narrative + 3-axis Auditor-Independence Verification + Methodology Highlights + NEW "Discoveries Surfaced During Execution" + Requirements Traceability + Sign-off /gsd-complete-milestone hand-off). ARCHIVE-01 recurrence-check documented as a CLOSED vector (PRE-VERIFIED by Pillar A `e4887b2`), not an open monitor.

**Rationale (per `.claude/tmp/phase74-D04-advisor.md`):**
- **Adversarial wedge:** Phase 70's Commit A filled an ATOM SHA (`aa6de68`), NOT a close SHA — it existed only because Phase 70 authored NEW inline frozen-aware helpers during the lineage bump. RETRO-02 deleted that exact mechanism, so a v1.8 Commit A would substitute nothing (empty/no-op) while importing 70-05's own V-67-05/06 wrong-anchor bug class. Cargo-cult precedent (Option B score 8.0).
- **Option C/D (split / hybrid):** add commits without solving any real chicken-and-egg; the single-commit Option A is bisect-clean for the close narrative and matches the "verification IS the audit record" lesson. Scores 6.5 / 5.0.

### Claude's Discretion

- **HARNESS-09 check-phase-71/72/73 disposition** — these already exist (shipped in their own phases). Plan-phase confirms they're chain-current and need no re-authoring; only `check-phase-74.mjs` is net-new. If a 71/72/73 validator needs a trivial chain-currency touch, that is a chain-validator edit (NOT in predecessor-byte-unchanged invariant) — plan-phase author decides.
- **`74-CONVENTIONS.md` content** — freshness/SHA matrix + locked strings (mirrors `70-CONVENTIONS.md`). Plan-phase author finalizes which constants to lock (e.g., the 6-validator cross-OS-applicable set, the 4 VPP site lines, BASELINE_12 anchor SHA).
- **Exact `$rand` charset + temp-dir cleanup assertions** in the Axis-1 sub-agent recipe — plan-phase author tunes per Phase 70 70-04 recipe; recommend `[0-9a-z]` 8-char.
- **Whether `check-phase-74.mjs` V-74-VPP assertion counts ≥4 "content token" or asserts the exact 4 line anchors** — recommend substring class-signature (≥4 present + 0 "VPP location token" leak) over line-pinned (brittle to line drift), mirroring V-67-03/04. Plan-phase author decides.
- **Sidecar `resolved_` date key format** — recommend `resolved_2026-06-XX: true` matching SWEEP-02 sidecar convention; plan-phase author confirms exact key against the v1.7 sidecar shape.
- **v1.8-milestone-audit.mjs `close_commit:` frontmatter fill** — literal placeholder at authoring time (Plan 74-02), recoverable post-close; OR left as a documented placeholder. Plan-phase author picks; this is NOT a forward-coupled live anchor (per D-04 finding), so either is safe.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 74 contract docs
- `.planning/REQUIREMENTS.md` — Pillar D section (HARNESS-07..12 + VPP-01 full text) + Traceability table (5 complete / 7 pending) + "Future Requirements Deferred to v1.9+" list (the 6 carry-overs) + Out of Scope (byte-unchanged invariant)
- `.planning/ROADMAP.md` — Phase 74 section: Goal + SC#1 (2 indivisible atoms; "fifth parallel CI coexistence file") + SC#2 (VPP-01 + Version History + sidecar + SWEEP-02 pattern) + SC#3 (3-axis re-audit + cross-OS EXACT MATCH + D-03 LOCKED / D-22 INTENT) + SC#4 (MILESTONE-AUDIT + DEFERRED-CLEANUP finalize) + SC#5 (12-req flip + predecessor byte-unchanged) + "Entry-state from Phase 73" note
- `.planning/STATE.md` — v1.8 phase dependency summary + Wave designation map (Wave D = close-gate, requires A/B/C) + requirement coverage table + Phase 74 plan estimate
- `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` — current state (6 sections incl. CHAIN-DEGRADED-AT-HEAD-01 CLOSED at `a85da77`); HARNESS-12 FINALIZES (promote 6 v1.7 carry-overs, preserve 6 existing)
- `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` lines 208-223 — VPP-01 source-of-truth (records **4** sites incl. L160 as "4th occurrence"; 30min surgical-rename estimate; SWEEP-02 atomic-within-plan pattern) + lines 225-333 — the 6 carry-overs (CI-3 / Multi-tenant / ABDevice API / per-OU CRD / Account Holder / ASM) full content to promote

### Phase 70 — DIRECT v1.7 Pillar D PRECEDENT (Path-A model for the whole phase)
- `.planning/milestones/v1.7-phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONTEXT.md` — the D-NN decisions (plan-layout, 3-axis auditor independence D-03/D-22, close-gate Commit A/B); Phase 74 D-01/D-03/D-04 inherit + adapt
- `.../70-01-PLAN.md` (scaffold/conventions) + `70-02-PLAN.md` (Atom 1 harness-core HARNESS-01/02 + BASELINE_11) + `70-03-PLAN.md` (Atom 2 validators + CI HARNESS-03/04) + `70-04-PLAN.md` + `70-04-AUDIT-RESULTS.md` (HARNESS-05 3-axis re-audit recipe + cross-OS EXACT MATCH evidence) + `70-05-PLAN.md` (Commit A SHA-fill + Commit B close-gate HARNESS-06 — **Phase 74 D-04 determines Commit A is NOT needed**)
- `.../70-VERIFICATION.md` — close-gate format + cross-OS-applicable validator count (v1.7 = 6) + EXACT MATCH evidence; Phase 74 74-VERIFICATION.md inherits
- `.../70-CONVENTIONS.md` — Path-A source for `74-CONVENTIONS.md`
- `.planning/milestones/v1.7-MILESTONE-AUDIT.md` — Path-A source for `v1.8-MILESTONE-AUDIT.md` (section skeleton)

### Phase 67 SWEEP-02 — VPP-01 PATTERN SOURCE (READ BEFORE EDITING THE DOC)
- `.planning/milestones/v1.7-phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-CONTEXT.md` (D-01 least-invasive scoring) + the SWEEP-02 PLAN + SUMMARY + `67-VERIFICATION.md` (Verifier Cross-Check Observations — records the L160 4th-occurrence discovery)
- SWEEP-02 commit `55260b3` — empirical behavior: ANNOTATE-not-remove sidecar, append-to-existing-tail-tables (no fabricated VH section), full anchor inventory ONLY for glossary (skipped for link-free files), `last_verified` bump on edited files

### VPP-01 edit target (READ BEFORE EDITING)
- `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` — frontmatter (`last_verified`) + the **4** "VPP location token" sites at lines 115, 149, 155, 160 → "content token". Bare "VPP token"/"Apple VPP tokens"/"VPP tokens" at 142/150/161 are OUT of scope (different term).

### Path-A sources (READ BEFORE AUTHORING)
- `scripts/validation/v1.7-milestone-audit.mjs` — Path-A source for `v1.8-milestone-audit.mjs` (C1-C16 verbatim; self-test 9/9)
- `scripts/validation/v1.7-audit-allowlist.json` — Path-A source for `v1.8-audit-allowlist.json` (c13_rotting_external + CI-1/CI-2 + quarterly_audit metadata + `ci_2_vpp_location_token` sidecar shape for the 4 post-VPP annotations)
- `scripts/validation/check-phase-73.mjs` — Path-A source for `check-phase-74.mjs` (CHAIN_PHASES={48..73}, CHAIN_SKIP empty-Set, V-NN-SELF guard, uniform CHAIN+AUDIT stdout+stderr wrapper, `_lib/frozen-at-close.mjs` consumption)
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (V141/V15/V16/V17/V17_CLOSEGATE; **no V18** — confirms no Commit A per D-04)
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_11 region (Plan 70-02 placed it); BASELINE_12 comment lands here (HARNESS-08); anchors to a known-PAST SHA, not the future close SHA
- `.github/workflows/audit-harness-v1.7-integrity.yml` — Path-A source for `audit-harness-v1.8-integrity.yml` (linux-chain-ubuntu-latest, `fetch-depth: 0` FETCH-DEPTH-01, 2 crons, check-phase jobs, PR-blocking + `pin-helper-advisory` continue-on-error)
- `scripts/validation/check-phase-67.mjs` lines for V-67-03/04 — pattern for the `check-phase-74.mjs` V-74-VPP assertion

### Advisor dossiers (full reasoning, for planner deep-dive)
- `.claude/tmp/phase74-D01-advisor.md` (191 lines) — plan layout + VPP placement (Option D; 5-plan skeleton; HARNESS-08↔VPP sidecar coupling wedge; L160 4-site flag)
- `.claude/tmp/phase74-D02-advisor.md` (310 lines) — VPP corpus handling (Option C; items 1-6 stances; SWEEP-02 empirical comparison; current-vs-proposed wording for all 4 sites; sidecar JSON; validator pseudocode)
- `.claude/tmp/phase74-D03-advisor.md` (249 lines) — 3-axis re-audit (Option A; per-axis recipe; 6-validator cross-OS-applicable set + exclusions; Atom-2-on-master ordering gate)
- `.claude/tmp/phase74-D04-advisor.md` (191 lines) — close-gate (Option A; NO-Commit-A empirical proof across 3 forward-coupling sites; DEFERRED-CLEANUP 12-section shape; MILESTONE-AUDIT skeleton)

### Constraints / anti-regression
- `.planning/config.json` line 7 — `use_worktrees: false` durable per memory `project_execphase_sequential.md`
- Predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + milestone-audit MJS + sidecar JSONs BYTE-UNCHANGED through close-gate (chain validators `check-phase-{48..73}.mjs` are NOT in the invariant)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Path-A milestone-audit template** — `scripts/validation/v1.7-milestone-audit.mjs` (C1-C16, self-test 9/9). `v1.8-milestone-audit.mjs` is a verbatim Path-A copy with v1.8 labels.
- **Path-A allowlist + sidecar** — `scripts/validation/v1.7-audit-allowlist.json` (`c13_rotting_external` + `ci_2_vpp_location_token` enumeration + `quarterly_audit` cadence). v1.8 copy resets c13 for v1.8 + adds 4 post-VPP resolved entries.
- **Path-A chain-apex validator** — `scripts/validation/check-phase-73.mjs` (CHAIN_PHASES={48..72} → 74 uses {48..73}; CHAIN_SKIP empty-Set Phase 68 `7b635ca`; uniform stdout+stderr CHAIN+AUDIT wrapper from Phase 72; `_lib/frozen-at-close.mjs` consumption from Phase 73). `check-phase-74.mjs` Path-A copy.
- **Centralized frozen-aware helper** — `scripts/validation/_lib/frozen-at-close.mjs` (Phase 73 `a85da77`). `MILESTONE_CLOSE_SHAS` has NO V18 → confirms `check-phase-74.mjs` reads only prior-milestone close SHAs → NO Commit A (D-04).
- **Path-A CI workflow** — `.github/workflows/audit-harness-v1.7-integrity.yml` (5th-coexistence target shape; fetch-depth:0; 2 crons; check-phase jobs). v1.8 copy is the 5th parallel file.
- **VPP corpus-rename pattern** — Phase 67 SWEEP-02 `55260b3` (ANNOTATE-not-remove sidecar; last_verified bump; no fabricated VH section; scoped anchor check for link-free files).
- **3-axis re-audit recipe** — Phase 70 `70-04-AUDIT-RESULTS.md` + commit `8175f82` (artifact-only). Axis 1 fresh-clone sub-agent; Axis 2 GHA workflow_dispatch; Axis 3 same fresh sub-agent.
- **Close-gate pattern** — Plan 70-05 / 71-03 / 72-02 / 73-03 (chain re-run + VERIFICATION.md + 4-doc traceability flip). Phase 74 close-gate is single-commit (no Commit A).
- **Path-A conventions doc** — `70-CONVENTIONS.md` → `74-CONVENTIONS.md`.

### Established Patterns
- **CHAIN_SKIP empty-Set invariant** — permanent post-Phase 68 `7b635ca`. `check-phase-74.mjs` MUST declare `CHAIN_SKIP = new Set([])` (V-74-SELF enforces).
- **CHAIN_PHASES excludes validator's own phase** — `check-phase-74.mjs` CHAIN_PHASES = {48..73}; V-74-SELF asserts 74 not included (D-22 auditor-independence).
- **Atomic-commit indivisibility per ROADMAP SC#1** — Atom 1 (3 files) + Atom 2 (validators + yml) each land in ONE SHA (precedent: 60-08 / 62-08 / 66-02 / 70-02 / 70-03).
- **ANNOTATE-not-remove sidecar** — v1.7 sidecar frozen (predecessor-byte-unchanged); v1.8 sidecar gets the 4 new `ci_2_vpp_location_token` resolved entries.
- **Literal `{phase_NN_close_SHA}` placeholder** — recoverable via `git log --all --grep` (71-03/72-02/73-03 precedent, 6×). Phase 74 close-gate inherits.
- **3-axis auditor independence stacking** — D-03 fresh-clone + D-22 fresh sub-agent + cross-OS Linux GHA (first stacked at v1.7 Phase 70). Phase 74 re-stacks with the v1.8 6-validator cross-OS-applicable set.
- **Predecessor-byte-unchanged anti-regression** — `git diff <pre-74> HEAD -- <v1.4..v1.7 frozen surfaces>` EMPTY at close-gate.

### Integration Points
- **`scripts/validation/v1.8-milestone-audit.mjs`** — NEW; 6th in the milestone-audit lineage.
- **`scripts/validation/check-phase-74.mjs`** — NEW chain-apex (29th validator); future v1.9+ HARNESS Path-A source.
- **`.github/workflows/audit-harness-v1.8-integrity.yml`** — NEW; 5th coexistence file; check-phase-71..74 jobs MUST be on `origin/master` before Plan 74-04 Axis 2 dispatch (D-03 ordering gate).
- **`docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`** — VPP-01 4-site rename + last_verified bump (74-01 Wave 1 atomic).
- **`.planning/milestones/v1.8-DEFERRED-CLEANUP.md`** — FINALIZE (6 promoted + 6 preserved → 12 sections).
- **`.planning/milestones/v1.8-MILESTONE-AUDIT.md`** — NEW (Path-A from v1.7).
- **PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md** — 4-doc traceability flip (12 reqs Active→Validated) in the single close-gate commit.

</code_context>

<specifics>
## Specific Ideas

- **User invokes `/adversarial-review` for gray-area picks during /gsd-discuss-phase** (memory `feedback_adversarial_review_preference`) — Phase 74 honored verbatim: 4 parallel `gsd-advisor-researcher` agents (Finder/Adversary/Referee scoring). The D-01 + D-02 advisors independently surfaced the VPP-01 4-vs-3-site discovery (L160) — directly attributable to the adversarial-review pattern's empirical-grounding requirement. User-verified before approval.
- **User maximum-effort preference** (memory `feedback_effort_level`) — each dossier 190-310 lines with concrete operational recipes, drop-in pseudocode, anti-regression analysis, adversarial wedges.
- **Sequential-on-main-tree durable** (memory `project_execphase_sequential.md` + `.planning/config.json:7`). Plans 74-01..05 execute sequentially on the main tree. The Axis-1 `git clone --no-hardlinks` into TEMP is auditor-independence, NOT a worktree experiment.
- **VPP-01 4-site rename approved 2026-06-08** — user picked "Rename all 4" over the locked-contract "3 sites" headline, honoring the `v1.7-DEFERRED-CLEANUP.md:213` source-of-truth. Plan-phase must explicitly document the deviation from REQUIREMENTS.md:45 / ROADMAP SC#2 "3 sites" wording.
- **"Fifth coexistence file" locked** — REQUIREMENTS HARNESS-10 says "Fourth"; only 4 audit-harness YAMLs exist today, so v1.8 is the 5th (matches ROADMAP SC#1 "fifth"). Plan-phase uses "fifth."
- **Today's date is 2026-06-08.** Phase 74 discussion authoring date. Frontmatter `last_verified:` DOES bump for the VPP-01 corpus file (it IS a docs edit — unlike Phases 71/72/73 which had none).
- **"DO NOT mask via deletion" doctrine continued** — VPP-01 RENAMES (not deletes) the legacy term; sidecar ANNOTATES (not removes). DEFERRED-CLEANUP PRESERVES existing stubs + PROMOTES carry-overs (no deletion).
- **ARCHIVE-01 recurrence PRE-VERIFIED** — unlike v1.7 close (where ARCHIVE-01 recurred during `/gsd-complete-milestone v1.7`), v1.8 close runs `scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter` (Phase 71 D-01 coordination flag) as a Wave-1 pre-step before `/gsd-complete-milestone v1.8`, and the close-gate documents ARCHIVE-01 as a CLOSED vector.

</specifics>

<deferred>
## Deferred Ideas

### Already locked elsewhere (recorded for downstream awareness)
- **Bare "VPP token" / "Apple VPP tokens" / "VPP tokens" forms** at `02-macos-pkg-dmg-pipeline.md:142, 150, 161` — NOT the "VPP location token" rebrand target; out of VPP-01 scope (user picked "Rename all 4," not "+ flag bare forms"). If a future audit flags these, route to v1.9+.
- **6 v1.7 carry-overs** (CI-3 Managed Apple ID rename / Multi-tenant Apple Business / ABDevice API / per-OU CRD / Account Holder runbook / ASM) — PROMOTED to v1.8-DEFERRED-CLEANUP.md full sections by HARNESS-12 but NOT implemented; v1.9+ triggers (CI-3 gated on Microsoft Intune portal rebrand adoption post-2026-07-01).
- **5 existing v1.8 deferred stubs** — ARCHIVE-UPSTREAM-01 (upstream PR to get-shit-done-cc); CHAIN-DEGRADED-AT-HEAD-01 (CLOSED `a85da77`); v1.1-line-164 `Edit N --` token-class; HELPER-SPAWN-STDERR-01 (3 helper-spawn sites); FROZEN-AWARE-ADOPTION-SWEEP-01 (refactor inline helpers to `_lib/frozen-at-close.mjs`); EXEC-FAIL-DETAIL-EXTRACTION-01 (DRY catch-block via `_lib/exec-fail-detail.mjs`). HARNESS-12 preserves all as-is.

### Discovered during Phase 74 discussion (new)
- **VPP-01 was a 4-site, not 3-site, requirement** — REQUIREMENTS.md:45 + ROADMAP SC#2 "3 sites" headline dropped L160 despite the spawning source recording 4. Corrected in this phase (rename all 4). Flag for v1.9+ requirement-authoring hygiene: when carrying a DEFERRED-CLEANUP discovery into REQUIREMENTS, copy the full site list including parenthetical "Nth occurrence" notes.
- **HARNESS-10 "Fourth" vs ROADMAP "fifth" coexistence-file count mismatch** — stale headline in REQUIREMENTS; ROADMAP SC#1 authoritative. No action beyond using "fifth"; flag for v1.9+ requirement-authoring hygiene.

### Discussed but explicitly out of v1.8 scope
- **Worktree-based execution** — `use_worktrees:false` durable.
- **Modifications to v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs / harness MJS / sidecar JSONs** — predecessor-byte-unchanged invariant.
- **`docs/*` corpus edits beyond VPP-01 4-site rename** — v1.8 is tooling-only.
- **A chicken-and-egg Commit A** — D-04 proved no v1.8 artifact forward-references the close SHA (RETRO-02 removed the inline-frozen-helper mechanism). Single close-gate commit.
- **New C-checks beyond v1.7 inheritance** — v1.8 harness is Path-A verbatim (C1-C16).

</deferred>

---

*Phase: 74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d*
*Context gathered: 2026-06-08*
