# Phase 61: Gap Closure + Terminal Re-Audit + Milestone Close - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning
**Methodology:** Adversarial review (finder/adversary/referee). Finder 862 raw points → Adversary +171 disproved → Referee verdicts on 22 disproves with 2 severity-downgrade overrides. All 4 gray areas resolved. Referee analytical error on GA1 (silently redefined Option 1C as content-revert) corrected via Phase 59 D-10 cross-check; user accepted corrected pick (Option 1A — refresh validator).

<domain>
## Phase Boundary

Formally close the v1.5 milestone — Linux Platform, Operational Depth & Cross-Platform Cleanup. Phase 61 is a **closing/traceability phase** mirroring the Phase 47 v1.4.1 close pattern: NO new content authoring beyond the score-0.9 deferred jump-link bullets in `docs/index.md` and a surgical `check-phase-53.mjs` validator alignment with Phase 59 D-10.

**5 Phase 61 success criteria** (ROADMAP:418-423):
1. `node scripts/validation/v1.5-milestone-audit.mjs` exits 0 with all blocking checks PASS from a fresh auditor worktree (live state already PASS — 12/12 in fully-blocking mode).
2. `v1.5-MILESTONE-AUDIT.md` exists in `.planning/` documenting terminal re-audit result, all C10-C13 check outcomes, and any items routed to v1.5.1/v1.6+ with closing rationale.
3. All 57 active REQUIREMENTS.md checkboxes flipped from `[ ]` to `[x]` (or explicitly deferred with documented reasoning) — committed at phase close, not deferred further.
4. PROJECT.md v1.5 requirements moved Active → Validated with phase references; v1.5 milestone entry added to "What's been built" narrative.
5. `.planning/MILESTONES.md` has v1.5 entry with phases completed, plans shipped, key accomplishments, and file count delta.

**Inherited starting state from Phase 60 close** (commit `c2abdd4` atomic harness + `6626253` check-phase-60.mjs + close commits `b76cb2e..6d3bb5a`):
- `v1.5-milestone-audit.mjs` exits 0; 12/12 PASS in fully-blocking mode (verified live).
- `regenerate-supervision-pins.mjs --self-test` exits 0 (AUDIT-07 closed at Phase 60).
- `48-VERIFICATION-broken-links.md` 75-finding inventory closed: 60 FIXED-PHASE-60 + 15 ALLOWLISTED in `c13_broken_link_allowlist[]` (6 transient_external + 9 template_placeholder).
- `check-phase-60.mjs` reports 24 PASS / 1 FAIL (V-60-16 chain regression-guard surfaces V-53-06 + V-53-22 in `check-phase-53.mjs`).

**Phase 61 scope = 4 work classes spanning 5 plans** (per GA4 winner 4B, mirroring Phase 47's 4-plan structure with todo fold-in):
- Validator alignment + jump-link bullets fold-in (V-53-06/22 + score-0.9 todo) — 1 plan
- REQUIREMENTS.md verify-and-flip + traceability comments — 1 plan
- PROJECT.md Active → Validated migration + Closed Deferred Items section — 1 plan
- `v1.5-MILESTONE-AUDIT.md` authoring + terminal re-audit from fresh auditor worktree — 1 plan
- MILESTONES.md v1.5 entry + close gate — 1 plan

</domain>

<decisions>
## Implementation Decisions

### Chain validator alignment (Gray Area 1 — winner: Option 1A, REFRESH check-phase-53.mjs)

- **D-01:** REFRESH `scripts/validation/check-phase-53.mjs` V-53-06 + V-53-22 assertions to align with Phase 59 D-10's deliberate superseding decision (per `.planning/phases/59-hub-navigation-integration-linux-operations-sections/59-CONTEXT.md:76` D-10 "`docs/operations/00-index.md` completion is MANDATORY same-commit per DPO-Phase56-01 hand-off chain"). The validator is stale relative to Phase 59 D-10's intentional architectural evolution; Phase 61 close is the canonical alignment moment. Atomic single-commit refresh.
- **D-02:** **V-53-06 refresh:** Accept `platform: cross-platform` (or any non-empty `platform:` value) in `docs/operations/00-index.md` frontmatter. Original Phase 53 D-02 single-platform contract scoped only the co-management-only stub state; Phase 59 D-10 expanded the file to a 4-domain cross-platform index. Replace the `if (!/^platform: Windows\s*$/m.test(fm))` literal at `check-phase-53.mjs:86` with a permissive `platform:` presence check OR a per-file scope-exemption (preferred: per-file exemption keeps the strict pin for the 4 co-management content files while exempting `00-index.md` specifically). Plan author chooses mechanism at plan time.
- **D-03:** **V-53-22 refresh:** Expand the V-53-22 NEGATIVE regression-guard's forbidden-H2 list to permit the 3 ops-domain H2s authored by Phase 59 D-10 (`## Patch & Update Management`, `## App Lifecycle Automation`, `## Compliance Drift Detection + Tenant Migration`). Mechanism: add a Phase-59-D-10-authorized allow-list inside `check-phase-53.mjs` OR scope-restrict V-53-22 to the 4 co-management content files (which legitimately should NOT contain those H2s) and exempt the `00-index.md` cross-platform index. Plan author preference: scope-restrict pattern (cleaner; matches Phase 53 V-53-10 SCOPE_RESTRICTED pattern at line 280-ish per `check-phase-53.mjs:230` precedent).
- **D-04:** **Atomic single-commit** for the validator refresh (Phase 43 D-07 atomicity-contract intent — single commit for harness/validator changes). Plan must run `node scripts/validation/check-phase-53.mjs` post-refresh and confirm 26/26 V-53-NN PASS. Then re-run `node scripts/validation/check-phase-60.mjs` and confirm V-60-16 flips FAIL → PASS (25/25 V-60-NN PASS). Refresh commit message: `fix(check-phase-53): align V-53-06 + V-53-22 with Phase 59 D-10 superseding decision`.
- **D-05:** **NOT reverting Phase 59 content evolution** (rejected Option 1C/1D). The Referee initially picked 1C with a silent redefinition as "fix content"; cross-check against `59-CONTEXT.md:76 D-10` confirmed Phase 59 deliberately authored the H2 expansion as a DPO-Phase56-01 hand-off discharge. Reverting would destroy CLEAN-08 + Phase 59 deliverables + DPO-Phase56-01 chain (per STATE.md:101). The validator is the stale piece, not the content.
- **D-06:** **NOT carrying over to v1.5.1/v1.6+** (rejected Option 1B). Carry-over preserves CI red-state through v1.5 close — mirrors v1.4 anti-pattern that v1.4.1 close specifically corrected (per MILESTONES.md:7). Phase 61 close is the canonical alignment moment.
- **D-07:** Severity-downgrade override applied: Finder's 1A.CRIT-3 ("modifying check-phase-53.mjs is out-of-Phase-61-SC scope") downgraded to MED — Referee accepted that SC#3 ("any items routed to v1.5.1/v1.6+ with closing rationale") grants Phase 61 alignment authority at terminal close. The refresh is not "retroactive contract weakening"; it is "validator catch-up to Phase 59 D-10 superseding decision."

### REQUIREMENTS.md flip strategy (Gray Area 2 — winner: Option 2A, VERIFY-AND-FLIP with traceability)

- **D-08:** SINGLE-PLAN VERIFY-AND-FLIP for the 44 unchecked REQUIREMENTS.md checkboxes. Per-req mechanism:
  1. Look up req → phase mapping in REQUIREMENTS.md §Traceability table (lines 121-141 + ops/Linux/AUDIT extensions).
  2. Read that phase's `${PHASE}-VERIFICATION.md` to confirm requirement-mapping table marks the req as `Complete`.
  3. Spot-check ROADMAP §Progress row for phase status (verify-and-reconcile if stale; STATE.md trumps stale ROADMAP rows per 2A.CRIT-1..5 disprove rationale).
  4. Flip checkbox `[ ]` → `[x]` and append inline traceability comment matching the existing CLEAN-05 line-17 pattern: `(closes ... — completed YYYY-MM-DD in Phase NN Plan NN-NN; commits abc1234 + def5678)`.
- **D-09:** TRACEABILITY COMMENT TEMPLATE (lock-shaped per CLEAN-05 line-17 reference):
  - Form: `— completed [YYYY-MM-DD] in Phase [NN] [Plan NN-NN if single plan; else "(plans NN-NN..NN-NN)"]; commits ` + 1-3 commit SHA references (close commit + key content commit if separable; per CLEAN-05 line-17 reference: `commits 0a55ecd + 629d7fc`)
  - Source: phase VERIFICATION.md §Close Commits or §Plan-Level Summary
  - Length: keep under 200 chars per req to fit checkbox readability
- **D-10:** **44-req flip surface** (post-Phase-60-close inventory):
  - **Pillar 1 (Cleanup):** CLEAN-01..04 (Phase 57), CLEAN-06..07 (Phase 48 sweeps closed via Phase 60 75-finding inventory)
  - **Pillar 2 (Linux):** LIN-01..02 (Phase 49), LIN-03..06+13 (Phase 50), LIN-07..11 (Phase 51) — note LIN-12 already `[x]`
  - **Pillar 3 (Ops Depth):** PATCH-01..08 (Phase 54), APP-01..08 (Phase 55), DRIFT-01..07 (Phase 56) — note COMG-01..05 already `[x]`
  - **Pillar 4 (Validation Tooling):** AUDIT-01..02 (Phase 48), AUDIT-08 (Phase 60-61 second-pass) — AUDIT-03..07 already `[x]`
- **D-11:** **Stale ROADMAP §Progress reconciliation:** ROADMAP rows for Phase 48 (`8/9 In Progress`), Phase 49 (`3/5 In Progress`), Phase 50 (`0/? Not started`), Phase 56 (`0/? Not started`) are stale tracking artifacts (per Adversary disprove of 2A.CRIT-1..5 + verified VERIFICATION.md presence on disk for all phases + STATE.md:91 confirmations). Plan 61-02 reconciles these rows in same commit as REQUIREMENTS.md flips: update plans-complete numerator/denominator (e.g., Phase 50 `0/? Not started` → `5/5 Complete    2026-04-26`; Phase 56 `0/? Not started` → `7/7 Complete    2026-04-30`); copy completion dates from each phase's VERIFICATION.md.
- **D-12:** **No deferred reqs at v1.5 close in active REQUIREMENTS.md** — all 44 unchecked are content-shipped per VERIFICATION.md evidence. The 6 already-named v1.5.1/v1.6+ deferrals (LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01 per REQUIREMENTS.md:95-100 §Future Requirements) stay in their existing §Future Requirements section; Phase 61 does NOT migrate them.
- **D-13:** **NOT bulk-flipping** (rejected Option 2B) per audit-trail mandate (PROJECT.md:175 v1.4.1 close pattern includes traceability tagging). **NOT spot-checking deeper** (rejected Option 2C) per SC#3 wording "committed at phase close, not deferred further" implying decisive single-pass close. **NOT separate v1.5-deferred-items.md file** (rejected Option 2D) per v1.4 schema continuity (deferrals embedded in MILESTONE-AUDIT.md frontmatter, not separate file).

### v1.5-MILESTONE-AUDIT.md schema shape (Gray Area 3 — winner: Option 3B, HYBRID v1.4 schema + v1.5-specific sections)

- **D-14:** **Frontmatter shape mirrors v1.4-MILESTONE-AUDIT.md verbatim** for cross-milestone schema continuity (Path A copy lineage per Phase 48 D-16):
  - `milestone: v1.5`
  - `milestone_name: Linux Platform, Operational Depth & Cross-Platform Cleanup`
  - `audited: <ISO timestamp>`
  - `status: passed`
  - `scores: { requirements: 57/57, phases: 14/14, integration: <calc>, flows: <calc>, nyquist: <calc> }`
  - `mechanical_checks: { harness: scripts/validation/v1.5-milestone-audit.mjs, allowlist: scripts/validation/v1.5-audit-allowlist.json, last_run: <ISO>, commit: <SHA>, results: { C1..C13: passed/informational/skipped }, raw_exit_code: 0, failed_checks_classification: <text or null> }`
  - `performed_by: "<auditor agent ID> (distinct from Phase 60 close worktree agents per D-02 auditor-independence rule; fresh worktree spawn verified at execution start)"` — mirrors v1.4-MILESTONE-AUDIT.md:25 verbatim.
  - `gaps_closed: []` (or fill if any v1.4-style gaps closed within v1.5)
  - `tech_debt: []` (after Plan 61-01 V-53 alignment lands, expected empty; if any residual surfaces, populate per v1.4 schema)
  - `nyquist: { compliant_phases: [...], partial_phases: [...], missing_phases: [], overall: <text> }` — enumerate 14 v1.5 phases (48-61); reconcile per Plan 61-02 ROADMAP refresh
  - `deferred_items: []` — populate from REQUIREMENTS.md §Future Requirements section (LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01) with classification + severity + routing to v1.5.1/v1.6+
- **D-15:** **Body sections** (v1.5-specific narrative additions, layered AFTER frontmatter, mirroring v1.4-MILESTONE-AUDIT.md body structure):
  - `## v1.5 Three-Pillar Closure Narrative` — pillar-by-pillar narrative summary (Pillar 1 Cleanup / Pillar 2 Linux / Pillar 3 Ops Depth / Pillar 4 Validation Tooling) with phase ranges + key accomplishments + commit SHAs (mirrors MILESTONES.md v1.4.1 entry style at lines 5-22)
  - `## AUDIT-08 Broken-Link Inventory Close-Out` — summary table of 75 Phase 48 baseline findings: 60 FIXED-PHASE-60 (51 anchor-fixes + 9 path-fixes) + 15 ALLOWLISTED (6 transient_external + 9 template_placeholder); cite `48-VERIFICATION-broken-links.md` Triage Decision column as canonical record (no inventory duplication per 3B.CRIT-2 acknowledgment — narrative summary only)
  - `## v1.5 Audit Harness Lineage Phase 48→60` — Path-A-copy lineage trace: `v1.4.1-milestone-audit.mjs` (frozen) → `v1.5-milestone-audit.mjs` (Phase 48 Plan 48-NN copy) → C10 added (Phase 48) → C11/C12/C13 informational scaffolds (Phase 48) → C12 promoted to blocking (Phase 58 Plan 58-06) → C9/C11/C13 promoted + C12 H2 expansion (Phase 60 Plan 60-08 atomic harness commit `c2abdd4`); per-phase validator file count (`check-phase-48..60.mjs`); CI workflow registration at `audit-harness-v1.5-integrity.yml`
  - `## Auditor-Independence Verification` — fresh worktree spawn record: agent ID, worktree path, timestamp, harness exit code, BASELINE_9 self-test exit code, chain validator results 48-61. Mirrors v1.4-MILESTONE-AUDIT.md `performed_by` pattern but as expanded body section.
- **D-16:** **NO `re_audit_resolution` block at initial v1.5 close** (the v1.4-MILESTONE-AUDIT.md `re_audit_resolution` block was added by v1.4.1 Plan 47-04 to flip `tech_debt → passed`). v1.5 ships with `status: passed` from initial close per Plan 61-04 fresh-worktree re-audit (no v1.5.1 follow-up planned at close time). If a future v1.5.1 emerges, it can append a sibling `re_audit_resolution` block per the v1.4.1 precedent.
- **D-17:** **NO duplication of 48-VERIFICATION-broken-links.md content** — D-15's AUDIT-08 close-out section is narrative summary only, NOT a re-listing of the 75 findings. The canonical record stays in `48-VERIFICATION-broken-links.md`; v1.5-MILESTONE-AUDIT.md cites file:line.
- **D-18:** **External URLs from 75-finding inventory NOT included** in v1.5-MILESTONE-AUDIT.md narrative (per 3B.LOW-2 risk). Use category-counts only (6 transient_external; 9 template_placeholder); don't paste URLs.
- **D-19:** Severity-downgrade overrides applied: 3A.CRIT-1+2+3 (under-records 7 checks; Phase 50/56 nyquist ambiguity; doesn't capture 3-pillar) accepted as REAL but addressed via 3B's body-section additions; 3B.CRIT-1+2 (schema drift; AUDIT-08 inventory duplication) downgraded to MED — Referee accepted body-section v1.5-extensions are valid Path-A-copy-with-additions per Phase 48 D-16 lineage discipline (additions don't break frontmatter continuity).

### Pending todo fold-in + plan structure (Gray Area 4 — winner: Option 4B, FOLD TODO + multi-plan close)

- **D-20:** **Fold the score-0.9 pending todo** `2026-05-06-choose-your-platform-linux-operations-bullets.md` (target_phase: 61 OR v1.6 cleanup per todo file:9 OR-routing) into Phase 61 Plan 61-01. Surface area: append 2 bullets to `docs/index.md` lines 21-22 jump-link list (after Android Enterprise bullet, before Cross-Platform References) per the todo's own §Solution body specification:
  ```markdown
  - [Linux Provisioning](#linux-provisioning) -- Linux device provisioning via Microsoft Intune Linux client (Ubuntu 22.04 / 24.04 LTS, intune-portal package, web-app conditional access)
  - [Operations](#operations) -- Cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration)
  ```
  Also update the platform-coverage blockquote at `docs/index.md:9` to mention Linux + Operations per the todo body §Solution. Append-only contract per Phase 57 D-31 (existing 5 bullets preserved byte-identical).
- **D-21:** **5-plan multi-plan progressive-landing structure** for Phase 61 (mirrors Phase 47 v1.4.1 close 4-plan structure with todo-fold-in addition). Plan-by-plan:
  - **Plan 61-01:** Chain validator alignment (V-53-06 + V-53-22 refresh in `check-phase-53.mjs` per D-01..D-04) + jump-link bullets fold-in (`docs/index.md` per D-20). Atomic harness commit + atomic content commit. 2 commits, 2 file edits.
  - **Plan 61-02:** REQUIREMENTS.md verify-and-flip (44 reqs per D-08..D-12) + ROADMAP §Progress row reconciliation (per D-11). Multi-commit progressive landing per phase-mapping cluster (4 commits clustered: Pillar 1 + Pillar 2 + Pillar 3 + Pillar 4 + AUDIT/ROADMAP refresh).
  - **Plan 61-03:** PROJECT.md Active → Validated migration (per ROADMAP SC#4) + new "Closed Deferred Items (v1.4.1 → v1.5)" subsection mirroring PROJECT.md:234 v1.4.1 pattern. Single commit.
  - **Plan 61-04:** `v1.5-MILESTONE-AUDIT.md` authoring (per D-14..D-19) + terminal re-audit from FRESH AUDITOR WORKTREE (per Phase 47 Plan 42-06 / 47-04 precedent). Atomic re-audit commit landing the audit doc with verified harness exit code.
  - **Plan 61-05:** MILESTONES.md v1.5 entry append (per ROADMAP SC#5) + close gate (`check-phase-61.mjs` validator-as-deliverable per AUDIT-06 lineage; ~15-20 V-61-NN structural assertions). Final close commit.
- **D-22:** **Auditor-independence enforcement at Plan 61-04** — spawn FRESH WORKTREE per `superpowers:using-git-worktrees` skill (or equivalent gsd-executor isolation: `worktree` mode), run harness + chain validators 48-61 + `regenerate-supervision-pins.mjs --self-test`. Capture: worktree branch, commit SHA, agent ID, exit codes, timestamp. Record in v1.5-MILESTONE-AUDIT.md `## Auditor-Independence Verification` body section per D-15.
- **D-23:** **Progressive-landing commit pattern** per Phase 60 D-25 / Phase 58 progressive-landing precedent. Each plan ships its own SUMMARY.md per Phase 60 D-25 model. Phase 61 close commit count estimate: 8-12 commits (2 + 4-5 + 1 + 1 + 1).
- **D-24:** **`check-phase-61.mjs` validator-as-deliverable** (Plan 61-05; AUDIT-06 lineage). Estimated ~15-20 V-61-NN structural assertions:
  - V-61-01..04: REQUIREMENTS.md `[ ]` count == 0 for active reqs (≤6 deferrals in §Future Requirements stay `[ ]` per design)
  - V-61-05..08: ROADMAP §Progress all 14 v1.5 phases marked `Complete` with completion date
  - V-61-09..12: PROJECT.md v1.5 reqs all moved to Validated; Closed Deferred Items section exists
  - V-61-13..16: v1.5-MILESTONE-AUDIT.md frontmatter has all required fields per D-14; body has all 4 D-15 sections
  - V-61-17..20: MILESTONES.md has v1.5 entry with required subsections (Phases completed / Plans shipped / Key accomplishments / Methodology / Deferred items)
  - V-61-CHAIN: NEGATIVE regression-guards confirming check-phase-{48..60}.mjs all exit 0 post-Plan-61-01 alignment landing (i.e., V-60-16 PASS)
  - V-61-AUDIT: terminal re-audit subprocess invoke `node scripts/validation/v1.5-milestone-audit.mjs` exits 0 + 12/12 PASS
  - V-61-SELF-TEST: subprocess invoke `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0
- **D-25:** **CI workflow registration** at `audit-harness-v1.5-integrity.yml` lazy-skip slot per Phase 48 D-18 graceful-degradation pattern. No yml edit required — file presence activates the slot. Per Phase 60 D-24 + D-23 lineage; v1.5 yml is the canonical lineage path despite ROADMAP SC#5 wording fix landing in Phase 60 commit (per 60-CONTEXT D-23 close-out).

### Plan structure + atomicity

- **D-26:** **Phase 61 plan structure = 5-plan multi-plan progressive-landing** (per D-21). Phase 47 v1.4.1 close used 4 plans across ~2 days (per MILESTONES.md:5-22). Phase 61 adds Plan 61-01 (chain alignment + todo) for the validator catch-up + jump-link work that has no Phase 47 analog. Wave structure: serial (no parallelism — each plan has dependencies on prior plan's state). Plan 61-04 is the hardest dependency — requires Plans 61-01 + 61-02 + 61-03 to have landed before fresh-worktree re-audit can confirm GREEN.
- **D-27:** **All Phase 49-60 V-NN-NN structural assertions MUST remain PASS post-Phase-61-close.** Pre-commit gate per Plan 61-05: run `check-phase-{48..60}.mjs` + `v1.5-milestone-audit.mjs --verbose` + `check-phase-61.mjs` before close commit. Post-commit verification: same suite plus auditor-independence record from Plan 61-04.
- **D-28:** **No Phase 53 D-02 retroactive contract weakening** despite refreshing V-53-22. Phase 59 D-10 already authored the superseding decision (per `59-CONTEXT.md:76`); Phase 61 V-53-22 refresh records the alignment, not a fresh contract change. Plan author MUST cite Phase 59 D-10 in the Plan 61-01 PLAN.md justification + commit message.
- **D-29:** Severity-downgrade override #2 applied: 4A.CRIT-2 ("D-07 atomicity violation in single-plan-atomic close") downgraded to MED — Referee accepted Adversary's correct reading that Phase 43 D-07 is about HARNESS atomic commit, not phase-close commit count. Phase 60 ran ~43 commits and honored D-07 at the artifact level.

### Calibration / verification artifacts

- **D-30:** **`61-VERIFICATION.md` per-plan section pattern** mirroring Phase 60 60-VERIFICATION.md structure: SC-by-SC verification + per-plan summary (Plan 61-01..05) + close-commit log + chain validator status table + auditor-independence verification block.
- **D-31:** **Optional: `61-RESEARCH.md` lightweight** if Plan 61-04 fresh-worktree spawn discovers any unforeseen invariants needing analysis (e.g., new chain regression surfaced by fresh-clone audit). Phase 60 produced both 60-RESEARCH.md + 60-CALIBRATION.md (calibration was for harness pattern refinement); Phase 61 may not need either since the close work is mechanical.

### Claude's Discretion

- V-53-06 + V-53-22 refresh mechanism choice (per-file scope-exemption vs allow-list expansion vs permissive regex) in D-02 + D-03 — plan author chooses at plan time based on what cleanest matches existing `check-phase-53.mjs` patterns (e.g., V-53-10 SCOPE_RESTRICTED precedent at line ~280).
- Per-req traceability comment exact wording in D-09 — plan author may adapt the CLEAN-05 line-17 reference template if it doesn't fit a specific req's commit pattern (e.g., multi-phase reqs like AUDIT-08 spanning Phase 48 + 60 may need 2 commit refs).
- v1.5-MILESTONE-AUDIT.md `audited` ISO timestamp + `last_run` ISO timestamp + `commit` SHA — auto-populated at Plan 61-04 fresh-worktree re-audit time.
- `check-phase-61.mjs` exact V-61-NN count (~15-20) — plan author finalizes at plan time based on D-24 enumeration; may consolidate or split assertions.
- ROADMAP §Progress row reconciliation in D-11 — plan author copies completion dates from each phase's VERIFICATION.md frontmatter; may also refresh `last_updated` STATE.md fields in same commit.
- Whether to author `61-RESEARCH.md` per D-31 is plan-author discretion.
- Plan 61-04 fresh-worktree mechanism (worktree directory, branch name, agent dispatch) — plan author follows `superpowers:using-git-worktrees` or `gsd-executor isolation:worktree` per current project tooling.

### Folded Todos

- **`2026-05-06-choose-your-platform-linux-operations-bullets.md`** (score 0.9, area: docs, phase_origin: 59, target_phase: 61 OR v1.6 cleanup):
  - Folded into **Plan 61-01** per D-20.
  - Original problem: `docs/index.md` "Choose Your Platform" jump-link list at lines 16-22 (5 bullets) is incomplete after Phase 59 added `## Linux Provisioning` (line 199) + `## Operations` (line 231) H2 sections.
  - Fold scope: Append 2 bullets per todo §Solution body verbatim (Linux Provisioning + Operations); update platform-coverage blockquote at `docs/index.md:9`.
  - Fits Phase 61 scope: docs/index.md surface is in Plan 61-01 alongside chain validator alignment (both are surgical post-Phase-59 cleanup work); folding honors the todo's OR-routing (target_phase: 61 OR v1.6 cleanup).
  - Verification: post-fix `grep -c "linux-provisioning" docs/index.md ≥ 2` + `grep -c "#operations" docs/index.md ≥ 2` + `node scripts/validation/check-phase-59.mjs --verbose` exits 0 + `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before authoring or implementing.**

### Phase 61 success criteria + traceability (authoritative scope)

- `.planning/ROADMAP.md` §"Phase 61: Gap Closure + Terminal Re-Audit + Milestone Close" (lines 414-424) — Goal, 5 success criteria, requirement mapping (terminal verification — closes all 57 active requirements via audit confirmation and traceability sync)
- `.planning/ROADMAP.md` §"Progress" (line 492) — Phase 61 status row + dependency note
- `.planning/ROADMAP.md` §"v1.5 Shared Write Hotspot Ownership" (lines 488-510) — Phase 61 owns milestone close artifacts
- `.planning/REQUIREMENTS.md` (full file) — 57 active requirements; §"Future Requirements (deferred to v1.5.1 or v1.6+)" lines 95-100; §"Out of Scope (explicit exclusions with reasoning)" lines 104-117; §"Traceability — Requirement → Phase Mapping" lines 121-141 + extended ops/Linux/AUDIT mappings
- `.planning/PROJECT.md` §"Current Milestone: v1.5" (lines 177-202) — three-pillar scope; §"Active" (line 204); §"Closed Deferred Items (v1.4 → v1.4.1)" (line 234) — pattern for v1.5 close subsection
- `.planning/STATE.md` (full) — v1.5 milestone state; phase decisions log lines 88-102; §"v1.5 Phase Dependency Summary" lines 117-137

### v1.5 milestone close pattern (Phase 47 precedent — MUST mirror)

- `.planning/MILESTONES.md` §"v1.4.1 Android Enterprise Completion & v1.4 Cleanup" (lines 3-22) — v1.4.1 close pattern: 5 phases / 33 plans / 40 tasks / 2-day timeline / re-audit pattern / DEFER-01..06 closure
- `.planning/MILESTONES.md` §"v1.4 Android Enterprise Enrollment Documentation" (lines 24-53) — v1.4 close narrative pattern (per-phase deliverables + methodology highlights + deferred items routing)
- `.planning/milestones/v1.4-MILESTONE-AUDIT.md` (full) — schema reference for v1.5-MILESTONE-AUDIT.md frontmatter (audited / status / scores / mechanical_checks / gaps_closed / tech_debt / nyquist / deferred_items / performed_by / re_audit_resolution sibling block); body structure reference

### Phase 60 inheritance + carry-overs

- `.planning/phases/60-audit-harness-v1-5-finalization/60-CONTEXT.md` — Phase 60 D-01..D-28 establish C9/C11/C13 promotion + C12 expansion + AUDIT-07 close + 75-finding inventory close-out + atomic harness commit + check-phase-60.mjs deliverable
- `.planning/phases/60-audit-harness-v1-5-finalization/60-VERIFICATION.md` — Phase 60 close-state of harness/sidecar/BASELINE_9/CI; "Pre-Existing Chain Regressions (Out of Scope)" section at lines 325-345 documents V-53-06+22 + V-58-09+10 + V-51-06+07+09 as out-of-Phase-60 scope
- `.planning/phases/60-audit-harness-v1-5-finalization/deferred-items.md` — out-of-scope discoveries from Plan 60-08 + 60-09 (V-60-14/16/21 chain regression-guards documented)
- `.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md` — C9 + C11 corpus scan results (Phase 53-56 calibration)

### Phase 59 D-10 superseding decision (authoritative for V-53-22 refresh in Plan 61-01)

- `.planning/phases/59-hub-navigation-integration-linux-operations-sections/59-CONTEXT.md` §"docs/index.md Operations H2 + ops/00-index.md amendment" (lines 63-90); D-10 specifically at line 76 (`docs/operations/00-index.md` completion is MANDATORY same-commit per DPO-Phase56-01 hand-off chain)
- `.planning/phases/59-hub-navigation-integration-linux-operations-sections/59-VERIFICATION.md` — Phase 59 close-state confirming H2 expansion + DPO-Phase56-01 discharge

### Phase 53 D-02 prior-locked contract (refreshed by Plan 61-01)

- `.planning/phases/53-co-management-operational-docs/53-CONTEXT.md` D-02 — original single-H2 contract for `docs/operations/00-index.md` (was authored when only Co-Management content existed); SUPERSEDED by Phase 59 D-10
- `scripts/validation/check-phase-53.mjs` (375 lines) — V-53-06 platform: Windows assertion at line ~86; V-53-22 NEGATIVE regression-guard for forbidden ops-domain H2s at lines ~341-348; V-53-10 SCOPE_RESTRICTED pattern at line ~230-280 (PRECEDENT for D-03 scope-restrict mechanism)

### Pending todo fold (Plan 61-01)

- `.planning/todos/pending/2026-05-06-choose-your-platform-linux-operations-bullets.md` — score 0.9 todo; phase_origin: 59; target_phase: 61 OR v1.6; §Solution body specifies 2-bullet append + blockquote update; §Verification post-fix lists grep + chain validator commands

### v1.5 harness + sidecar (terminal re-audit target — Plan 61-04)

- `scripts/validation/v1.5-milestone-audit.mjs` (606+ lines) — terminal re-audit target; 12/12 PASS in fully-blocking mode at Phase 60 close (verified live)
- `scripts/validation/v1.5-audit-allowlist.json` — sidecar with all Phase 48-60 entries (supervision_exemptions, safetynet_exemptions, c7_knox_allowlist, cope_banned_phrases, c9_exemptions, c11_ops_exemptions, c13_broken_link_allowlist 15 entries)
- `scripts/validation/regenerate-supervision-pins.mjs` (496 lines) — `--self-test` exits 0 post-Phase-60 BASELINE_9 refresh (AUDIT-07 closed)
- `scripts/validation/check-phase-{48..60}.mjs` — chain validators (Plan 61-04 + 61-05 verifies all PASS post-Phase-61-01 alignment)

### Audit harness lineage doc surface (D-15 narrative source)

- `.planning/research/SUMMARY.md` — v1.5 research executive summary (Path A copy lineage)
- `.planning/research/PITFALLS.md` §Pitfall 11 — Path A copy hazard; FROZEN-marker discipline; informational-first graduation contract
- `.github/workflows/audit-harness-v1.5-integrity.yml` (293 lines) — CI workflow with lazy-skip slot pattern (Phase 48 D-18); check-phase-61.mjs activates the next slot via file-presence
- `.github/workflows/audit-harness-integrity.yml` (92 lines) — FROZEN v1.4 + v1.4.1 yml (do not modify per Phase 48 D-16)

### Project-level context

- `.planning/PROJECT.md` (full) — v1.0..v1.5 milestone history; §"Closed Deferred Items (v1.4 → v1.4.1)" pattern at line 234; §"Key Decisions" at line 250
- `.planning/STATE.md` — current focus = Phase 61; v1.5 progress 13/14 phases complete

### Downstream-phase dependencies (none — Phase 61 closes v1.5)

- v1.5 milestone closes at Phase 61. No Phase 62+ inherits Phase 61 state. Future v1.5.1 (if it emerges) inherits via `re_audit_resolution` sibling block pattern from v1.4.1 close.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/validation/check-phase-53.mjs` lines ~80-100 (V-53-06 platform-frontmatter assertion) — refresh target for D-02; replace literal `platform: Windows` with permissive check OR per-file scope-exemption.
- `scripts/validation/check-phase-53.mjs` lines ~230-280 (V-53-10 SCOPE_RESTRICTED pattern with `CO_MGMT_FILES` glob) — PRECEDENT for D-03 scope-restrict mechanism on V-53-22; V-53-10 already excludes `00-index.md` from a similar negative-token check, providing an existing pattern to mirror.
- `scripts/validation/check-phase-53.mjs` lines ~341-348 (V-53-22 NEGATIVE regression-guard with forbidden-H2 list) — refresh target for D-03; expand allow-list OR scope-restrict to 4 co-management content files (`00-overview.md` / `01-windows-tenant-attach.md` / `02-windows-workload-sliders.md` / `03-cocmgmt-migration-paths.md`).
- `scripts/validation/v1.5-milestone-audit.mjs` lines 71-79 (`parseAllowlist()`) — sidecar loader; reused at Plan 61-04 terminal re-audit
- `scripts/validation/check-phase-30.mjs` + `check-phase-58.mjs` + `check-phase-59.mjs` + `check-phase-60.mjs` — pattern exemplars for `check-phase-61.mjs` author (file-reads-only / regex-based / no-shared-module per Phase 48 D-25 lineage)
- `.planning/milestones/v1.4-MILESTONE-AUDIT.md` — schema template for D-14 frontmatter; body structure for D-15 v1.5-specific sections

### Established Patterns

- **Atomic harness/validator commit (Phase 43 D-07, Phase 48 D-14, Phase 60 Plan 60-08 commit `c2abdd4`)** — Plan 61-01 ships V-53-06 + V-53-22 refresh in single atomic commit per D-04
- **Cluster-edit per-file commit (Phase 58/60 progressive-landing)** — Plan 61-02 REQUIREMENTS.md flips clustered by Pillar (4 commits) per D-21
- **Validator-as-deliverable + lazy-skip in CI (Phase 42 D-31, Phase 48 D-18)** — Plan 61-05 `check-phase-61.mjs` per D-24
- **Auditor-independence via fresh worktree spawn (Phase 47 Plan 47-04, v1.4-MILESTONE-AUDIT.md:25 `Plan 42-06 fresh worktree spawn verified`)** — Plan 61-04 per D-22
- **`re_audit_resolution` sibling block pattern (v1.4 close + v1.4.1 retroactive append)** — NOT used at v1.5 initial close per D-16 (no v1.5.1 planned); preserved for future use
- **Path-A-copy lineage (Phase 48 D-16, Phase 60 D-23)** — D-14 frontmatter mirrors v1.4-MILESTONE-AUDIT.md verbatim; D-15 body extensions are additive per Path-A-copy-with-additions
- **Append-only contract on docs/index.md (Phase 57 D-31, Phase 59 D-11)** — Plan 61-01 todo fold-in appends 2 bullets without modifying existing 5

### Integration Points

- **Harness invocation:** `node scripts/validation/v1.5-milestone-audit.mjs [--verbose]` — Plan 61-04 must keep this exit-0 in fully-blocking mode (12/12 PASS, no informational hits except C3 Phase 39 self-cert)
- **Chain validator invocation:** `node scripts/validation/check-phase-{48..60}.mjs` — Plan 61-04 + 61-05 verify all exit 0 post-Plan-61-01 alignment landing
- **Self-test invocation:** `node scripts/validation/regenerate-supervision-pins.mjs --self-test` — Plan 61-04 confirms exit 0 (AUDIT-07 close persistence)
- **Pre-commit gate:** Phase 60 advisory hook (Phase 48 D-21) remains advisory-only at v1.5 close; Phase 61 doesn't promote
- **CI lazy-skip slot:** `audit-harness-v1.5-integrity.yml:261-275` activates check-phase-61.mjs by file presence per Phase 48 D-18; no yml edit needed

### PITFALL surface

- **PITFALL-12 (sidecar pin coordinate stability):** NOT applicable to Plan 61-01 V-53 refresh — `check-phase-53.mjs` has no sidecar pin coords; Phase 60 deferred-items.md confirms only `_glossary-android.md:16` intersects pinned territory. V-53 refresh has zero pin-shift risk.
- **PITFALL-6 (anchor inventory before edits):** Applicable to Plan 61-01 docs/index.md jump-link bullet append. Pre-edit anchor inventory artifact `61-ANCHOR-INVENTORY.md` MAY be authored if append produces line-shifts in cross-doc references; Phase 57/58/59 D-NN inheritance pattern. (Likely unnecessary for 2-bullet append below an already-present `## Choose Your Platform` heading; plan author judgment.)
- **PITFALL-7 (whitelist-first framing):** Doesn't apply to Phase 61 (no new content authoring beyond jump-link bullets which are descriptive not capability-claim).

</code_context>

<specifics>
## Specific Ideas

- **Adversarial review traceability:** Finder 862 raw points → Adversary disproved 22 concerns (+171 estimated; CRIT=13×10, MED=8×5, LOW=1×1) → Referee verdicts on 22 disproves with 2 severity-downgrade overrides (1A.CRIT-3 + 4A.CRIT-2 both downgraded CRIT→MED). Referee analytical error on GA1 (silent redefinition of Option 1C as content-revert) corrected via Phase 59 D-10 cross-check; user accepted corrected GA1 pick (Option 1A). Full per-option score table preserved in 61-DISCUSSION-LOG.md for audit.

- **Phase 59 D-10 supersession is the load-bearing argument for D-01 (refresh validator).** `59-CONTEXT.md:76` literal: "`docs/operations/00-index.md` completion is MANDATORY same-commit per DPO-Phase56-01 hand-off chain. Phase 59 fills out the 3 currently-empty sub-domain sections...". This is a deliberate architectural decision; Phase 53 D-02 single-H2 contract was scoped to the original 25-line stub state and Phase 59 D-10 supersedes it. Plan 61-01 records the validator catch-up; not a contract weakening.

- **"V-60-16 was out-of-scope for Phase 60" is true and reversible.** 60-VERIFICATION.md:325-345 explicitly cites V-60-14/16/21 chain regressions as "Out of Scope per Orchestrator Boundary". Phase 60's orchestrator-defined scope (must_haves: AUDIT-03/04/05/06/07 + Phase 48 D-06 C9 promotion) didn't include cross-phase chain regression repair. Phase 61's scope (per ROADMAP:415 "broken-link fixes; v1.5-MILESTONE-AUDIT.md; harness exits 0 all blocking PASS; REQUIREMENTS.md synced; PROJECT.md traceability closure") explicitly includes "harness exits 0 all blocking PASS" — V-53-22 alignment fits per the SC#3 broad cleanup authority.

- **44-req flip is mechanically ~95% verified-shipped.** Only `AUDIT-08` is genuinely "shipped at Phase 61 close" (it requires the v1.5-MILESTONE-AUDIT.md artifact authored by Plan 61-04 to flip). All other 43 reqs map to a phase whose VERIFICATION.md confirms Complete status; verify-and-flip is per-req file-read followed by mechanical flip.

- **Stale ROADMAP §Progress reconciliation surface:** Phase 48 (8/9), Phase 49 (3/5), Phase 50 (0/?), Phase 56 (0/?). Each row needs numerator/denominator + status + completion-date refresh. Plan 61-02 lands in same commit as REQUIREMENTS.md flips per D-11.

- **v1.5-MILESTONE-AUDIT.md frontmatter `tech_debt: []` post-Plan-61-01:** With V-53-06+22 alignment landing in Plan 61-01, no V-53 tech_debt remains at v1.5 close. If Plan 61-04 fresh-worktree audit surfaces ANY new chain regression (unforeseen), it goes into `tech_debt[]` per v1.4 schema; otherwise empty.

- **Auditor-independence verification record:** Plan 61-04 fresh worktree records analogous to v1.4-MILESTONE-AUDIT.md:25 "(distinct from Plans 42-02/03/04 content-author worktree agents per D-02 auditor-independence rule; fresh worktree spawn verified at execution start)". For v1.5, the auditor must be distinct from the Plan 61-01..03 author-agents (worktree path + agent ID + branch + spawn timestamp captured).

- **Plan 61-05 close commit naming convention:** `chore(61): close v1.5 milestone` per Phase 47 close commit style (commit `ed3bb4e` in MILESTONES.md:8). Earlier plans use `feat(61-NN)` / `fix(61-NN)` / `docs(61-NN)` per Phase 60 D-25 progressive-landing convention.

- **Choose Your Platform jump-link bullets fold-in is genuinely 5-min work** per todo body line 46. Plan 61-01 budget should reflect: ~30 min for V-53-06+22 refresh (validator-pattern-mirror work) + ~5 min for jump-link bullets + ~10 min verification. ~45-60 min total.

</specifics>

<deferred>
## Deferred Ideas

- **`re_audit_resolution` sibling block pattern** — NOT used at v1.5 initial close per D-16 (no v1.5.1 planned). If a future v1.5.1 emerges (e.g., to fix late-discovered v1.5 issues), it can append a sibling block per v1.4-MILESTONE-AUDIT.md:143 precedent.
- **`broken_link_external_allowlist[]` array (Phase 48 D-15 explicit rejection)** — preserved as Phase 60 deferred per its CONTEXT D-10. Not added at v1.5 close. v1.6+ may revisit only if MS Learn redirect-chain validation becomes high-signal.
- **Pre-commit hook hard-block for pin-drift** (Phase 48 D-22 promotion ladder) — pre-commit remains advisory-only at v1.5 close. v1.6+ promotion concern.
- **`audit-harness-v1.5-integrity.yml` archive lifecycle at v1.6 milestone-start** — Phase 48 D-19 deferred concern. v1.6 ships own yml; v1.5 yml freezes.
- **iOS/macOS/Windows admin template `last_verified` normalization** — Phase 48 deferred carry-over (Android-scope lock per Phase 43 D-25). v1.5 broken-link sweep (C13) doesn't surface freshness drift. v1.6+ concern.
- **C11 pattern expansion (SCCM-bare / AMAPI-deprecation / Ubuntu-20.04-EOL)** — Phase 60 D-03 keeps current 4-pattern set. v1.6+ if false-negative rate observed.
- **`c11_ops_exemptions[]` lazy population** — Reserved-empty at Phase 60 close per CONTEXT D-02. v1.6+ first occurrence.
- **`c9_exemptions[]` lazy expansion** — v1.6+ as new COPE content emerges.
- **Sibling-matrix `#conditional-access` regression-guard duplication in C12** — rejected per Phase 60 D-14 (V-58-25 covers it). v1.6+ if check-phase-58.mjs retired.
- **Per-row data-cell column-count assertion in C12** — rejected per Phase 60 D-15.
- **6 pre-existing v1.5.1 / v1.6+ deferrals stay in REQUIREMENTS.md §Future Requirements** (LIN-DEFER-01 Linux Bash deep-dive; RHEL-01 RHEL Linux client; BYOPC-01 Cloud PC/AVD; WEB-01 Entra app gallery + SCIM; CHROMEOS-01 ChromeOS; CODE-01 PowerShell+FastAPI+React scaffolding integration). Plan 61-04 v1.5-MILESTONE-AUDIT.md `deferred_items[]` enumerates them with classification + severity + routing.
- **PROJECT.md "Closed Deferred Items (v1.4.1 → v1.5)" subsection** — Plan 61-03 authors per ROADMAP SC#4 + PROJECT.md:234 v1.4.1 pattern. Records whatever v1.4.1-era forward-promises closed in v1.5 (e.g., DEFER-07 Android nav unification → Phase 57; DEFER-08 4-platform comparison → Phase 58 — already closed at v1.4.1 → v1.5 transition).

### Reviewed Todos (not folded)

*All matching todos folded — none reviewed-but-deferred.* The single matching todo (`2026-05-06-choose-your-platform-linux-operations-bullets.md` score 0.9) was folded into Plan 61-01 per D-20.

</deferred>

---

*Phase: 61-gap-closure-terminal-re-audit-milestone-close*
*Context gathered: 2026-05-07*
*Adversarial review applied: finder/adversary/referee on all 4 gray areas; Finder 862 → Adversary +171 disproved → Referee 2 severity-downgrade overrides + 1 GA1 analytical-error correction (Option 1C silent redefinition → corrected to Option 1A per Phase 59 D-10 cross-check; user accepted corrected pick)*
