# Phase 61: Gap Closure + Terminal Re-Audit + Milestone Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 61-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-07
**Phase:** 61-gap-closure-terminal-re-audit-milestone-close
**Areas discussed:** Chain validator regressions, REQUIREMENTS.md flip strategy, v1.5-MILESTONE-AUDIT.md schema shape, Pending todo fold-in + plan structure
**Methodology:** Adversarial review (finder/adversary/referee) — Finder 862 raw points → Adversary +171 disproved → Referee verdicts on 22 disproves with 2 severity-downgrade overrides. Referee analytical error on GA1 (silent redefinition of Option 1C as content-revert) corrected via Phase 59 D-10 cross-check; user accepted corrected pick.

---

## Gray Area 1 — Chain validator regressions (V-53-06 + V-53-22)

**Context:** `check-phase-53.mjs` V-53-06 expects `platform: Windows` in `docs/operations/00-index.md`; Phase 59 evolved it to `platform: cross-platform`. V-53-22 forbids `## App Lifecycle Automation` H2 (per Phase 53 D-02 single-H2 contract); Phase 59 D-10 added the H2 as a deliberate DPO-Phase56-01 hand-off discharge. Phase 61 SC#1 names only `v1.5-milestone-audit.mjs` (which exits 0); chain validators are NOT in SC scope but ARE invoked by `check-phase-60.mjs` V-60-16 (regression-guard).

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Refresh check-phase-53.mjs assertions in Phase 61 atomic single-commit. V-53-06 → accept `platform: cross-platform`; V-53-22 → expand allow-list / scope-restrict for ops-domain H2s reflecting Phase 59 D-10 superseding decision. | ✓ |
| 1B | Accept-as-documented-evolution carry-over. Add entry to v1.5-MILESTONE-AUDIT.md `tech_debt`; defer validator refresh to v1.5.1/v1.6+. Phase 61 ships no validator code change. | |
| 1C | Mixed — fix V-53-06 only; V-53-22 documented as carry-over. (Referee initially picked but silently redefined as "fix content"; user-corrected away.) | |
| 1D | Revert doc evolution in 00-index.md (undo Phase 59 hub work). | |

**Adversarial review scoring:**
- Finder concerns: 1A=11 (3 CRIT / 5 MED / 3 LOW), 1B=11 (2/6/3), 1C=11 (2/5/4), 1D=10 (4/4/2)
- Adversary disproves landed: 1A.CRIT-3 (modify-validator scope) FALSE POSITIVE / disproved; 1A.MED-5 (no Phase 53 author to consult) FALSE POSITIVE; 1A.LOW-3 (PITFALL-12 doesn't apply) FALSE POSITIVE; 1B.CRIT-1 (AUDIT-06 chain green) FALSE POSITIVE; 1B.CRIT-2 (SC#1 names only master) FALSE POSITIVE; 1B.MED-3 (AUDIT-08 cross-references) FALSE POSITIVE; 1B.MED-4 (no v1.5.1) FALSE POSITIVE; 1C.MED-2 (V-60-16 all-or-nothing) FALSE POSITIVE
- Surviving CRITs after Referee + downgrades: 1A=0 (1A.CRIT-3 downgraded to MED), 1B=1 (1B.CRIT-1 milestone-close coherence), 1C=2, 1D=4

**User's choice:** Option 1A (refresh validator). Selected after Referee analytical-error correction surfaced: Phase 59 D-10 (`59-CONTEXT.md:76`) explicitly authorized adding the H2 sections as a same-commit DPO-Phase56-01 hand-off discharge, making the validator (not the content) the stale piece. Option 1A is a validator catch-up to Phase 59's deliberate superseding decision, not a retroactive contract weakening.

**Notes:**
- Phase 60 explicitly punted V-60-16 / V-53-06+22 as "Out of Scope per Orchestrator Boundary" (60-VERIFICATION.md:325-345) — that scope-boundary was correct for Phase 60 (must_haves: AUDIT-03/04/05/06/07 + Phase 48 D-06 C9 promotion); Phase 61's broader cleanup authority (SC#3) absorbs the alignment.
- Severity-downgrade override: 1A.CRIT-3 (modify-validator scope) downgraded CRIT→MED per Phase 60 precedent of 2 referee overrides.
- Plan 61-01 ships V-53-06 + V-53-22 refresh as atomic single-commit; flips check-phase-60.mjs V-60-16 FAIL → PASS.

---

## Gray Area 2 — REQUIREMENTS.md flip strategy (44 unchecked, most shipped)

**Context:** 44/57 REQUIREMENTS.md checkboxes unchecked. ROADMAP §Progress shows Phase 48 (8/9 In Progress), Phase 49 (3/5 In Progress), Phase 50 (0/? Not started), Phase 56 (0/? Not started) — but VERIFICATION.md files exist on disk for all 4 phases and STATE.md confirms shipped (per phase decision log lines 91-102).

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Verify-and-flip — single plan reads each phase's VERIFICATION.md, confirms requirement-mapping table marks each as Complete, flips checkbox + appends inline traceability comment with phase + commit SHA (CLEAN-05 line-17 pattern). | ✓ |
| 2B | Trust ROADMAP progress table — bulk-flip mechanically; no traceability comments. Faster; lower confidence. | |
| 2C | Per-req VERIFICATION.md deeper audit + 1-2 deliverable file spot-check per req. Highest confidence; longest runtime. | |
| 2D | Flip-with-explicit-defer-list — flip obvious; produce separate `v1.5-deferred-items.md` for genuinely unfinished items. | |

**Adversarial review scoring:**
- Finder concerns: 2A=12 (5/4/3), 2B=10 (3/4/3), 2C=12 (2/5/4), 2D=10 (3/4/3)
- Adversary disproves: ALL 5 of 2A's CRITs disproved cleanly (Phase 56 VERIFICATION.md exists, Phase 50 VERIFICATION.md exists, AUDIT-01 SC satisfied per live audit 12/12 PASS, Phase 49 chain validator passes per STATE.md, AUDIT-08 narrowly scoped to anchor/link inventory which C13 covers and Phase 60 closed 75-finding inventory).
- Surviving CRITs after Referee: 2A=0, 2B=3 (stale-ROADMAP-trust + audit-trail-mandate-violation + CLEAN-05-comment-parity-required), 2C=2 (scope-balloon + SC#3-defer-violation), 2D=3 (no-obvious-criterion + duplication + v1.4-schema-deviation)

**User's choice:** Option 2A. Surviving concern count: 0. Reconciles stale ROADMAP "Not started" rows for Phases 50/56 against actual VERIFICATION.md state in same commit as REQUIREMENTS.md flips per D-11.

**Notes:**
- Per-req traceability comment template (D-09): `(closes ... — completed [YYYY-MM-DD] in Phase NN [Plan NN-NN]; commits abc1234 + def5678)` — matches existing CLEAN-05 line-17 reference.
- 44-req surface mapped per pillar in CONTEXT.md D-10. Pillar 1 (Cleanup): 6 reqs / Pillar 2 (Linux): 11 reqs (LIN-12 pre-flipped) / Pillar 3 (Ops): 20 reqs (COMG-01..05 pre-flipped) / Pillar 4 (Validation): 3 reqs (AUDIT-03..07 pre-flipped).
- AUDIT-08 flips at Plan 61-04 close after v1.5-MILESTONE-AUDIT.md authored.

---

## Gray Area 3 — v1.5-MILESTONE-AUDIT.md schema shape

**Context:** v1.4-MILESTONE-AUDIT.md schema has frontmatter (`audited`/`status`/`scores`/`mechanical_checks`/`gaps_closed`/`tech_debt`/`nyquist`/`deferred_items`/`performed_by`) plus `re_audit_resolution` sibling block (added by Phase 47 v1.4.1 close). v1.5 has 14 phases / 96 plans / 3-pillar architecture / harness lineage Phase 48→60.

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Mirror v1.4-MILESTONE-AUDIT.md schema verbatim. Drop-in template; loses v1.5-specific narrative. | |
| 3B | Hybrid — v1.4 schema frontmatter + v1.5-specific body sections (3-pillar narrative + AUDIT-08 75-finding inventory close-out + Phase 48→60 harness lineage + auditor-independence). | ✓ |
| 3C | New v1.5 schema (full re-design). Loses cross-milestone schema continuity. | |
| 3D | Minimal — exit-status proof + checkbox flip log + closing rationale. | |

**Adversarial review scoring:**
- Finder concerns: 3A=10 (3/4/3), 3B=11 (2/6/3), 3C=10 (3/4/3), 3D=10 (3/4/3)
- Adversary disproves: 3B.MED-3 (auditor-independence has no v1.4 precedent) FALSE POSITIVE — Adversary cited v1.4-MILESTONE-AUDIT.md:25 verbatim "fresh worktree spawn verified per D-02 auditor-independence rule".
- Surviving CRITs after Referee + downgrades: 3A=3 (under-records 7 checks + nyquist 14-phase ambiguity + 3-pillar narrative loss), 3B=0 (3B.CRIT-1+2 downgraded to MED — Path-A-copy-with-additions valid), 3C=3 (Path-A-copy-lineage break + zero prior art + v1.6 fork), 3D=3 (drops tech_debt + drops deferred_items + drops nyquist; fails SC#2 C10-C13 mandate)

**User's choice:** Option 3B. Surviving concern count: 0. Captures v1.5-specific structure (3 pillars, AUDIT-08 close-out, harness lineage 48→60, auditor-independence) without breaking cross-milestone schema continuity from v1.4.

**Notes:**
- Frontmatter mirrors v1.4 verbatim per D-14 (mechanical_checks expanded to C1..C13 from v1.4's C1..C5).
- Body sections per D-15: `## v1.5 Three-Pillar Closure Narrative` + `## AUDIT-08 Broken-Link Inventory Close-Out` + `## v1.5 Audit Harness Lineage Phase 48→60` + `## Auditor-Independence Verification`.
- No `re_audit_resolution` block at initial v1.5 close per D-16 (no v1.5.1 follow-up planned). Preserved for future appending if v1.5.1 emerges.
- External URLs from 75-finding inventory NOT included in narrative (per D-18); category counts only (6 transient_external + 9 template_placeholder).

---

## Gray Area 4 — Pending todo fold-in + plan structure

**Context:** Score-0.9 pending todo `2026-05-06-choose-your-platform-linux-operations-bullets.md` — `docs/index.md` jump-link list at lines 16-22 missing Linux Provisioning + Operations bullets (Phase 59 added the H2s but not the jump-links). 5-min effort estimate. Plan structure question: single-plan atomic close vs multi-plan (Phase 47 used 4 plans).

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Fold todo + single-plan atomic close. One PLAN.md covering all close work + todo. | |
| 4B | Fold todo + multi-plan close (4-5 plans mirroring Phase 47's 4-plan structure with todo addition). Progressive-landing per Phase 60 D-25. | ✓ |
| 4C | Defer todo + single-plan atomic close. Strict milestone-close discipline. | |
| 4D | Defer todo + multi-plan close. Same as 4B without todo. | |

**Adversarial review scoring:**
- Finder concerns: 4A=10 (3/4/3), 4B=11 (2/5/3), 4C=11 (2/5/3), 4D=11 (2/6/3)
- Adversary disproves: 4A.CRIT-1 (Phase 47 4-plan binding rule) FALSE POSITIVE — recent phases vary 6-10 plans; 4A.CRIT-2 (D-07 atomicity) PARTIAL (downgraded MED — Adversary correctly distinguished harness-atomic from phase-close-atomic); 4A.MED-1 (todo OR-routing) FALSE POSITIVE; 4B.CRIT-1 (SC#3 single-commit) FALSE POSITIVE; 4B.CRIT-2 (Phase 47 single-plan) FALSE POSITIVE — Phase 47 IS multi-plan (4 plans); 4C.CRIT-1 (todo routing ignored) FALSE POSITIVE — defer honors v1.6 leg of OR; 4C.MED-3 (no v1.6 milestone) FALSE POSITIVE; 4D.MED-6 (SC#3 single-commit) FALSE POSITIVE.
- Surviving CRITs after Referee + downgrades: 4A=0 (4A.CRIT-2 downgraded to MED), 4B=0, 4C=1 (defer-of-trivial-effort effort-allocation misalignment surviving), 4D=0

**User's choice:** Option 4B. Surviving concern count: 0. 5-plan multi-plan progressive-landing structure mirrors Phase 47 close pattern with Plan 61-01 added for chain validator alignment + jump-link bullets fold-in.

**Notes:**
- 5-plan structure per D-21:
  - Plan 61-01: chain validator alignment (V-53-06+22 refresh) + jump-link bullets fold-in (`docs/index.md`)
  - Plan 61-02: REQUIREMENTS.md verify-and-flip + ROADMAP §Progress reconciliation
  - Plan 61-03: PROJECT.md Active→Validated migration + Closed Deferred Items section
  - Plan 61-04: v1.5-MILESTONE-AUDIT.md authoring + terminal re-audit from FRESH AUDITOR WORKTREE
  - Plan 61-05: MILESTONES.md v1.5 entry + close gate (`check-phase-61.mjs` + ~15-20 V-61-NN assertions)
- Auditor-independence at Plan 61-04 per D-22 (worktree spawn distinct from Plans 61-01..03 author-agents).
- Severity-downgrade override #2: 4A.CRIT-2 D-07 atomicity conflation downgraded CRIT→MED.

---

## Claude's Discretion

- V-53-06 + V-53-22 refresh mechanism choice (per-file scope-exemption vs allow-list expansion vs permissive regex) per D-02 + D-03 — plan author chooses based on closest-matching existing `check-phase-53.mjs` patterns (V-53-10 SCOPE_RESTRICTED precedent at line ~230-280 likely best fit).
- Per-req traceability comment exact wording in D-09 — plan author may adapt the CLEAN-05 line-17 reference template for multi-phase reqs (e.g., AUDIT-08 spanning Phase 48 + 60 may need 2 commit refs).
- v1.5-MILESTONE-AUDIT.md `audited` ISO timestamp + `last_run` ISO timestamp + `commit` SHA — auto-populated at Plan 61-04 fresh-worktree re-audit time.
- `check-phase-61.mjs` exact V-61-NN count (~15-20) — plan author finalizes at plan time.
- ROADMAP §Progress row reconciliation in D-11 — plan author copies completion dates from each phase's VERIFICATION.md frontmatter.
- Whether to author `61-RESEARCH.md` per D-31 is plan-author discretion.
- Plan 61-04 fresh-worktree mechanism (worktree directory, branch name, agent dispatch) — plan author follows `superpowers:using-git-worktrees` skill or `gsd-executor isolation:worktree` per current project tooling.
- Pre-edit anchor inventory artifact `61-ANCHOR-INVENTORY.md` per PITFALL-6 — likely unnecessary for 2-bullet append; plan author judgment.

---

## Deferred Ideas

(All preserved in CONTEXT.md `<deferred>` block. Highlights:)

- `re_audit_resolution` sibling block — preserved for hypothetical future v1.5.1 close.
- 6 v1.5.1/v1.6+ deferrals stay in REQUIREMENTS.md §Future Requirements (LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01); enumerated in v1.5-MILESTONE-AUDIT.md `deferred_items[]` per Plan 61-04.
- C11 pattern expansion / `c11_ops_exemptions[]` lazy population / `c9_exemptions[]` lazy expansion / sibling-matrix CA regression-guard duplication — all rejected per Phase 60 CONTEXT D-NNs; remain v1.6+ concerns.
- Pre-commit hook hard-block for pin-drift — advisory-only at v1.5 close per Phase 48 D-22 ladder.
- iOS/macOS/Windows admin template `last_verified` normalization — Android-scope lock from Phase 43 D-25 carries forward; v1.6+ concern.
- `audit-harness-v1.5-integrity.yml` archive lifecycle at v1.6 milestone-start — Phase 48 D-19 deferred concern.

---

*Generated: 2026-05-07 — discuss-phase 61 --chain*
