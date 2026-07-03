---
gsd_state_version: 1.0
milestone: v1.15
milestone_name: EEE SOP Documentation-Standard Retrofit (Phase-1)
status: completed
last_updated: "2026-07-03T17:59:46.725Z"
last_activity: 2026-07-03 — v1.15 roadmap authored (7 phases, 16/16 requirements mapped)
progress:
  total_phases: 7
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-03 after v1.14 milestone)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices — including Apple-platform single sign-on (macOS Platform SSO + Kerberos SSO + programmatic Platform Credential management), end-to-end PSSO provisioning, Kandji/Iru→Intune MDM migration, and 802.1X enterprise network authentication across all five platforms — through Microsoft Intune / Entra ID without escalating to engineering. NEW in v1.15: the knowledge base grounds cleanly in Copilot Studio / SharePoint and returns clickable citations to L1/L2/Intune-Admin audiences.
**Current focus:** v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1) — roadmap authored 2026-07-03; 7 phases (113-119); ready for `/gsd-discuss-phase 113`.

## Current Position

Phase: 113 (not started — ready to plan)
Plan: —
Status: Roadmap complete; awaiting first discuss-phase
Last activity: 2026-07-03 — v1.15 roadmap authored (7 phases, 16/16 requirements mapped)

Progress bar: `░░░░░░░░░░` 0% (0/7 phases complete)

## v1.15 Phase Dependency Summary

```
Phase 113 (Conversion Pipeline Lock + Representative-Set Grounding Validation)
  |       PIPE-01, PIPE-02
  |       DELIVERS:
  |         - Pandoc version pinned + --reference-doc Word template committed
  |         - Post-conversion guard script (YAML-leak assertion in first 500 chars)
  |         - 3-5 representative docs: convert → upload → live Copilot Studio queries
  |         - Empirical open questions resolved: citation title source; Status:Draft
  |             retrieval behavior; chunk boundary behavior
  |         - Deployment policy documented (only .docx in indexed library; Draft excluded)
  |       HARD CONSTRAINTS:
  |         - FIRST content phase; no doc file may be retrofitted before this exits
  |         - PIPE-02 grounding validation runs here (not deferred to close);
  |             close-gate at Phase 119 requires a SECOND grounding-confirmation pass
  |             against the full retrofit corpus
  |         - Research says this is the ONLY phase requiring live platform testing;
  |             all other phases are standard authoring/harness patterns
  |       DISCUSS-PHASE FLAG (PIPE-02): agent-run vs. owner-run if harness lacks
  |         live Copilot Studio access; what "pass" means without programmatic access
  |
  v
Phase 114 (EEE Standard, Templates, Doc ID Registry + Metadata Rules)
  |       META-01, META-02, META-03, META-04, STD-01, STD-02, STD-03
  |       DELIVERS:
  |         - C10 lenient-unknown-key precondition verified BEFORE any file is edited
  |         - docs/_standards/EEE-SOP-standard.md (single-line format; D1 normalization
  |             map; D2 last_verified semantics; Doc Type taxonomy; Version-History rule)
  |         - docs/_templates/* updated (all new docs born EEE-conformant; Status:Draft default)
  |         - docs/_registry/RE-index.md (outside indexed library; all Phase-1 Doc IDs
  |             assigned collision-free from RE-001)
  |       HARD CONSTRAINTS:
  |         - META-01 (C10 lenient check) is a PRECONDITION — must be verified before
  |             any file in the corpus gains the new frontmatter keys
  |         - EEE standard doc itself lives OUTSIDE the grounded SharePoint library
  |             (it is meta-documentation, not an operator runbook)
  |         - Doc ID Registry lives OUTSIDE the grounded library (if included, queries
  |             about a specific doc return the registry row instead of doc content)
  |         - All Phase-1 Doc IDs assigned in ONE collision-free pass before authoring
  |             (prevents RE-NNN conflicts across the three retrofit phases)
  |         - D1 normalization map must cover ALL ~19-20 real platform: variants
  |             (case/separator chaos + Apple compounds + all/cross-platform); unmapped
  |             value = hard failure (C17 FAILS, no silent fallback)
  |       DISCUSS-PHASE FLAG: Owner field placement — render Owner in the visible
  |         block vs. frontmatter-only (research escape-valve for citation noise);
  |         C17 asserts key presence regardless
  |
  v
Phase 115 (C17 Harness Check — Validator Atom)
  |       HARN-01
  |       DELIVERS:
  |         - C17 blocking harness check as ONE indivisible validator atom
  |             (all 13 needle-spec assertions in a single atomic commit)
  |         - C17 registered in harness chain alongside C1-C16
  |         - C17 exits 0 on Phase 113 representative set and on docs/_templates/*
  |       HARD CONSTRAINTS:
  |         - C17 is ONE indivisible atom — content phases 116-118 hand off a
  |             needle-spec only; the validator is NEVER re-opened during content phases
  |             (per v1.13 validator-atom deferral pattern)
  |         - C17 must be live BEFORE any retrofitted file is merged to main
  |         - DISCUSS-PHASE FLAG: C17 strictness / staging — ship fully blocking from
  |             the start, or informational-then-graduate (v1.5 C9/C11/C13 precedent)
  |             given ~150 docs must conform before it can be green
  |
  v
Phase 116 (L1/L2 Runbook Retrofit — ~75 docs)
  |       RETRO-01
  |       DELIVERS:
  |         - All L1/L2 runbooks: EEE header block + D3-A structure + scope/safety Summary
  |             banner + Version-History row + Last Reviewed = last_verified verbatim
  |         - C17 green on every L1/L2 runbook file before phase close
  |       HARD CONSTRAINTS:
  |         - L1/L2 runbooks are highest operator-impact doc class → retrofit first
  |         - No content re-review (v1.15 is reformat-only; last_verified carried verbatim)
  |         - C17 must gate every file before merge
  |         - DISCUSS-PHASE FLAG: whether the ~75 docs warrant splitting L1 vs L2 into
  |             separate sub-phases (discuss-phase 116 resolves)
  |
  v
Phase 117 (Admin-Setup Guide Retrofit — all platforms)
  |       RETRO-02
  |       DELIVERS:
  |         - All admin-setup guides (Windows / macOS / iOS / Android / Linux / 802.1X):
  |             EEE header block + D3-A structure + Version-History row + verbatim dates
  |         - C17 green on all admin-setup guide files before phase close
  |       HARD CONSTRAINTS:
  |         - Admin-setup guides retrofit SECOND (after runbooks, before reference docs)
  |         - Platform normalization via D1 map — no unmapped platform: values survive
  |         - DISCUSS-PHASE FLAG: whether ~8 guide sets across 6 platform families warrant
  |             sub-phases (discuss-phase 117 resolves)
  |
  v
Phase 118 (Reference Doc Retrofit + Table Remediation — ~26 docs)
  |       RETRO-03
  |       DELIVERS:
  |         - All reference docs: EEE header block + D3-A structure + Version-History row
  |         - Capability-matrix table remediation: prose summary within 5 lines of any
  |             table >25 rows (P-02 chunk-boundary protection)
  |         - C17 green on all reference doc files before phase close
  |       HARD CONSTRAINTS:
  |         - Reference docs retrofit LAST — highest table-chunking risk (P-02)
  |         - C17 table-row-cap assertion enforces ~25-row cap or prose-summary gate
  |         - DISCUSS-PHASE FLAG: row-cap threshold + whether to split oversized matrices
  |             vs. add prose summaries only (discuss-phase 118 resolves)
  |         - DISCUSS-PHASE FLAG: Doc Type edge cases (comparison docs, error-codes,
  |             end-user guides: Reference vs Guide) — resolve before registry phase for
  |             these files to get correct doc_type assigned
  |
  v
Phase 119 (Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Terminal Re-audit Close)
          HARN-02, HARN-03, HARN-04
          SOLE DELIVERABLE CLUSTER OF THIS PHASE — never batch with content or retrofit
          DELIBERATE INVERSION: this milestone INTENTIONALLY re-pins all Phase-1 frozen
            surfaces at the new close SHAs — the first milestone to invert the
            byte-unchanged invariant every prior milestone protected
          V114 pin (v1.14 close-gate SHA 7d922a7) rides Atom 2 (same commit as
            check-phase-119); BASELINE_19; 12th CI coexistence workflow
          Atom 1 (3 files indivisible — HARN-03 partial):

            - v1.15-milestone-audit.mjs (Path-A from v1.14, C1-C17 inherited)
            - v1.15-audit-allowlist.json (sidecar repointed)
            - BASELINE_19 freshness comment in regenerate-supervision-pins.mjs
          Atom 2 (indivisible set — HARN-02 + HARN-03 partial):

            - check-phase-113.mjs through check-phase-119.mjs (per-phase validators;
              chain-apex CHAIN_PHASES=[48..118], CHAIN_SKIP=new Set([]))

            - _lib/frozen-at-close.mjs V114 entry (v1.14 close-gate SHA 7d922a7)
            - audit-harness-v1.15-integrity.yml (12th parallel CI coexistence workflow;
              predecessors v1.4–v1.14 byte-unchanged)
          Frozen-surface re-baseline (HARN-02):

            - Phase-1 frozen surfaces are DELIBERATELY RE-PINNED at new close SHAs
            - Apex + continuity chain validators MUST exit 0 TOGETHER atomically
            - Non-Phase-1 predecessor frozen surfaces remain BYTE-UNCHANGED
          3-axis terminal re-audit + PIPE-02 grounding confirmation (HARN-04):

            - Axis 1: fresh git clone --no-hardlinks into $env:TEMP\v1.15-audit-<rand>
            - Axis 2: cross-OS Linux GHA (BOTH chain validators Linux-GHA authoritative
              per corrected D-03 OS split — WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at
              depth [48..118])

            - Axis 3: fresh zero-context sub-agent
            - Cross-OS PASS/FAIL/SKIP EXACT MATCH required
            - PIPE-02 grounding-validation confirmation: retrofitted corpus queried via
              live Copilot Studio; correct citations returned
          Close-gate: v1.15-MILESTONE-AUDIT.md + v1.15-DEFERRED-CLEANUP.md +
            4-doc traceability closure (16/16 Validated)
          Predecessor v1.4–v1.14 frozen surfaces BYTE-UNCHANGED invariant
            (NON-Phase-1 surfaces only; Phase-1 surfaces deliberately re-pinned)
```

## v1.15 Requirement Coverage (0/16 — In Progress)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 113 | PIPE-01, PIPE-02 | 2 |
| 114 | META-01, META-02, META-03, META-04, STD-01, STD-02, STD-03 | 7 |
| 115 | HARN-01 | 1 |
| 116 | RETRO-01 | 1 |
| 117 | RETRO-02 | 1 |
| 118 | RETRO-03 | 1 |
| 119 | HARN-02, HARN-03, HARN-04 | 3 |
| **Total** | **16/16 mapped** | **16** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 119 chain-apex CHAIN_PHASES=[48..118] (per [48..N-1] invariant where N=119; WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..118] — Linux GHA BOTH chain validators authoritative per corrected D-03 OS split, same as v1.12–v1.14).

**Named decisions (LOCKED at roadmap 2026-07-03):**

- PHASE-COUNT: 7 phases (113-119) — derived from natural delivery boundaries: pipeline gate (113) → standard+preconditions (114) → C17 atom (115) → L1/L2 retrofit (116) → admin-setup retrofit (117) → reference retrofit (118) → harness+close (119)
- PIPE-02-PLACEMENT: folded into Phase 113 (not its own gate phase) — the representative-set validation is a direct output of pipeline lock; a separate gate phase would be artificially thin; close-gate (Phase 119) provides the SECOND grounding-validation pass against the full corpus
- META-04-ASSIGNMENT: assigned to Phase 114 (standard phase) — META-04 specifies the rule ("verbatim last_verified + Version-History row"); the rule is authored in the EEE standard document; its application in RETRO-01/02/03 is a natural consequence of following the standard
- RETRO-ORDER: L1/L2 runbooks (Phase 116) → admin-setup guides (Phase 117) → reference docs (Phase 118) — ordered by operator impact and table-chunking risk; reference docs last per research P-02 severity
- HARNESS-PHASE: Phase 119 is the sole deliverable of the closing cluster — harness lineage bump never batches with content or retrofit (mirrors v1.13 Phase 100 / v1.14 Phase 112 exactly)
- FROZEN-SURFACE-INVERSION: Phase 119 DELIBERATELY re-pins all Phase-1 frozen surfaces — this is the stated dominant risk of this milestone and the intentional inversion of the byte-unchanged invariant; non-Phase-1 predecessor surfaces remain byte-unchanged
- HARNESS-LINEAGE: 13th Path-A milestone (v1.4→v1.15); BASELINE_19; V114 pin (7d922a7); 12th CI workflow; CHAIN_PHASES=[48..118] (71 entries)
- DISCUSS-PHASE-FLAGS: 7 gray-area flags from REQUIREMENTS.md are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` per project convention (PIPE-02 execution mode; C17 strictness/staging; RETRO-02/03 sub-phase splits; Owner field placement; reference table remediation depth; Summary authoring method; Doc Type edge cases)

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- v1.6: 5 phases (62-66), 30 plans — shipped 2026-05-25
- v1.7: 4 phases (67-70), 15 plans — shipped 2026-05-29
- v1.8: 4 phases (71-74), 13 plans — shipped 2026-06-08
- v1.9: 8 phases (75-82), 19 plans — shipped 2026-06-22
- v1.10: 6 phases (83-88), 16 plans — shipped 2026-06-24
- v1.11: 5 phases (89-93), 13 plans — shipped 2026-06-26
- v1.12: 2 phases (94-95), 5 plans — shipped 2026-06-26
- v1.13: 5 phases (96-100), 14 plans — shipped 2026-06-29
- **v1.14: 12 phases (101-112), 38 plans — shipped 2026-07-02**
- v1.15: 7 phases (113-119), TBD plans — in progress

## Accumulated Context

### Decisions

**v1.15 roadmap decisions (LOCKED 2026-07-03):**

- Seven-phase structure: Pipeline lock + grounding (113) → Standard + templates + registry + preconditions (114) → C17 validator atom (115) → L1/L2 runbook retrofit (116) → Admin-setup guide retrofit (117) → Reference doc retrofit + table remediation (118) → Frozen-surface re-baseline + 13th Path-A lineage bump + 3-axis close (119)
- PIPE-02 folded into Phase 113: representative-set grounding validation is a direct output of pipeline lock; close-gate (Phase 119) provides the second grounding-confirmation pass against the full retrofit corpus
- Phase 114 batches all seven META/STD requirements: the EEE standard document (STD-01), templates (STD-02), and registry (STD-03) are co-authored with the metadata rules (META-01–04) they enforce; META-01 C10 lenient check is a phase-opening precondition before any file is edited
- Phase 115 is the C17 indivisible validator atom: follows the v1.13 validator-atom deferral convention; content phases hand off a needle-spec only; C17 is never re-opened during content phases
- Retrofit phases (116–118) follow RETRO-01→02→03 mandatory ordering: L1/L2 first (highest operator impact), admin-setup second, reference docs last (highest table-chunking risk per research P-02)
- Phase 119 is the sole closing cluster: frozen-surface re-baseline + lineage bump + close; never batches with content or retrofit; mirrors v1.13 Phase 100 / v1.14 Phase 112
- Frozen-surface re-baseline is DELIBERATELY re-pinning Phase-1 surfaces (intentional inversion of byte-unchanged invariant); non-Phase-1 predecessor surfaces remain byte-unchanged
- 7 discuss-phase flags from REQUIREMENTS.md are NOT resolved at roadmap — deferred to /gsd-discuss-phase per project convention

**Durable architectural decisions (carried forward from v1.14):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-Phase-1 predecessor frozen surfaces BYTE-UNCHANGED
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..118]: Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, same as v1.12–v1.14)
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory)
- Navigation-last hard constraint: all nav hub edits committed after the content files they reference
- Per-section `last_verified`/`review_by` freshness stamps on version-gated content (carried policy; v1.15 carries verbatim — does not reset the clock)

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- Phase 113 (PIPE-02): Verify Copilot Studio access mode before grounding validation — agent-run vs. owner-run; determine what "pass" means without programmatic access (discuss-phase flag 1)
- Phase 113 (PIPE-01): Pin exact Pandoc version at plan time; verify custom-property promotion behavior for non-standard YAML keys (`doc_id`, `status`, `owner`, `doc_type`) with the pinned version (tracks Pandoc issue #3034)
- Phase 114 (META-01): Confirm C10 strict-vs-lenient behavior against a synthetic test file with the four new keys BEFORE any corpus edit — this is the phase-opening gate
- Phase 114 (STD-01): Status-as-retrieval-gate vs. label-only decision is required before the EEE standard is authored (owner decision: does `Status: Draft` prevent indexing, or only label the doc? — impacts whether SharePoint content-approval must be enabled)
- Phase 116 (RETRO-01): Confirm exact L1/L2 runbook count and file paths at plan time (should be 37 L1 + 33 L2 = ~70 as of v1.14 close; v1.15 does not add new runbooks)
- Phase 118 (RETRO-03): Confirm exact reference doc file list and identify which capability matrices exceed 25 rows before authoring starts

### Pending Todos

- At Phase 113 plan time: confirm test SharePoint library access for PIPE-02 grounding validation; identify the 3-5 representative docs (should span multiple platform: values and include at least one capability-matrix table); confirm Pandoc version available in project environment
- At Phase 114 plan time: run C10 against a test file with the four new keys to confirm lenient behavior BEFORE writing the EEE standard spec; confirm the Doc Type taxonomy (Runbook / Guide / RCA / Reference) covers all Phase-1 doc classes including comparison docs and error-codes
- At Phase 115 plan time: confirm the full C17 needle-spec (13 assertions from SUMMARY.md) is complete before authoring; review discuss-phase flag on C17 strictness/staging (informational-first vs. fully-blocking from the start)
- At Phase 116 plan time: enumerate exact L1/L2 runbook file paths; decide L1-vs-L2 split per discuss-phase flag; confirm whether the ~75 docs warrant multiple sub-phases
- At Phase 119 plan time: confirm V114 pin (v1.14 close-gate SHA `7d922a7`) via `git log --grep="close-gate" --grep="v1.14" --all-match -1`; confirm CHAIN_PHASES=[48..118] count (71 entries per [48..N-1] invariant)

### Blockers/Concerns

None at roadmap stage. Execution-time watch items (not blockers — address within specified phases):

- Phase 113: Live Copilot Studio access for PIPE-02 grounding validation — if unavailable to the harness, discuss-phase flag 1 resolves the owner-run vs. agent-run question
- Phase 113: YAML frontmatter leak (P-08) and heading style loss (P-09) are HIGH-confidence risks in Pandoc conversion — the post-conversion guard script is the mitigation; must be green before proceeding
- Phase 114: D1 platform normalization map must cover ALL ~19-20 real `platform:` variants in the corpus — a missed value will cause C17 to FAIL all files using it; enumerate real values at plan time
- Phase 119: The frozen-surface re-baseline is the dominant technical risk — first milestone to deliberately re-pin ~all Phase-1 frozen surfaces at once; requires the same apex+continuity atomic-green discipline used at v1.12–v1.14 closes
- Phase 119: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 now at depth [48..118] (71 entries, +7 from v1.14); Linux GHA BOTH chain validators remain authoritative (D-03 OS split unchanged)

## Session Continuity

Last session: 2026-07-03T17:59:46.711Z
Stopped at: Phase 113 context gathered (A1/B3→SharePoint/C3/D2 locked via adversarial-review)
Resume file: .planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/113-CONTEXT.md
Next action: `/gsd-discuss-phase 113` to plan Phase 113 (Conversion Pipeline Lock + Grounding Validation)

## Operator Next Steps

- ✅ `/gsd-new-milestone` DONE — v1.15 requirements defined (2026-07-03)
- ✅ Roadmap authored — 7 phases (113-119); ROADMAP.md + STATE.md written
- Run `/gsd-discuss-phase 113` to begin Phase 113 planning (pipeline lock + grounding validation)
- Note: 7 discuss-phase flags deferred from REQUIREMENTS.md — raise at the appropriate phase

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| (v1.15 phases not yet started) | — | — | — |
