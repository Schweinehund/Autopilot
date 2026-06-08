# REQUIREMENTS — v1.8 Tooling Debt Closure + Chain-Resilience Hardening

**Milestone:** v1.8
**Status:** Active (defined 2026-06-03; awaiting roadmap)
**Goal:** Close v1.7 tooling debt — fix archive-automation root cause, harden chain-validator diagnostic surface, forward-port HEAD-coupled chain validators to frozen-aware pattern, close Phase 67 SWEEP-02 carry-over, bump audit harness lineage v1.7 → v1.8.

**Phase numbering:** Continues from v1.7 close (Phase 70) → v1.8 spans Phase 71+ (4 phases estimated)

---

## v1.8 Requirements

### Pillar A — Archive-Automation Root-Cause Fix

- [x] **ARCHIVE-01**: Root-cause fix for `.claude/commands/gsd-complete-milestone.md` (and/or `gsd-sdk query milestone.complete` SDK handler) extraction-pattern logic emitting placeholder-label garbage (`"One-liner:"`, `"SUBSUMED BY PLAN..."`, `"Hash:"`, `"Pre-edit:"`, `"Total file size:"`, `"File:"`, `"Insertion position:"`, `"Single deliverable:"`, `"Plan goal:"`, `"Found during:"`) into MILESTONES.md milestone-close entries. Ship regression-test fixture (synthetic milestone-close → diff-check assertion) that surfaces recurrence. Recurrence is ACTIVE as of v1.7 milestone close 2026-05-29 per `v1.7-DEFERRED-CLEANUP.md:28-34`. Per ARCHIVE-01 explicit guidance: **DO NOT mask via deletion — investigate the script.** **CLOSED Phase 71 Plan 71-01 atomic SHA `e4887b2` (vendored extractor + 3-case fixture + chain-apex validator in ONE SHA per SC#4 byte-exact).**

- [x] **ARCHIVE-02**: Historical residue sweep across `.planning/MILESTONES.md` entries v1.0..v1.4.1 for similar scripted-extraction debris (known site: v1.2 H2 entry has 3 `One-liner:` placeholder lines per `v1.7-DEFERRED-CLEANUP.md:38-48` + v1.1 line 164 `Edit 1 --` NEW DISCOVERY by D-03 advisor pre-sweep grep). Surgical deletion after ARCHIVE-01 root-cause confirms scope; coordinated with ARCHIVE-01 atomic-commit if recurrence-fix and historical-sweep are committed together. **CLOSED Phase 71 Plan 71-02 SHA `ff4514b` (v1.1 + v1.2 H2 re-authored from MILESTONE-AUDIT canonical source per D-03 LOCKED Option D REPLACEMENT-not-deletion; symmetric with v1.6+v1.7 retroactive-authoring at v1.7 close).**

### Pillar B — Chain-Wrapper Hardening

- [x] **WRAPPER-01**: Fix `scripts/validation/check-phase-66.mjs:313` chain-apex wrapper to capture both `err.stdout` AND `err.stderr` instead of stderr-only (per `v1.7-DEFERRED-CLEANUP.md:160-192` fix recommendation). Per-validator stdout-vs-stderr audit to identify any other masking surfaces. Chain-apex regression sweep to confirm no false positives introduced. Closes the 2-week-masking surface that hid SCOPE-GAP-61 on Windows local until GHA workflow_dispatch surfaced it. **CLOSED Phase 72 Plan 72-01 atomic SHA `d374095` (6 CHAIN wrapper fixes in check-phase-{66..71}.mjs + new check-phase-72.mjs regression-witness validator in ONE 7-file SHA per SC#4 byte-exact contract + D-02 Option B SC#3 second-clause discriminator satisfied via delta-diff witness; 8 pre-existing V-72-CHAIN-{61..67,70} FAILs are accepted-residual routed to v1.8-DEFERRED-CLEANUP.md CHAIN-DEGRADED-AT-HEAD-01 → Phase 73 Pillar C RETRO-01/02). Close-gate Plan 72-02 SHA `{phase_72_close_SHA}`.**

### Pillar C — Retrospective Forward-Port

- [x] **RETRO-01**: Class-wide scan of `scripts/validation/check-phase-{48..66}.mjs` (19 validators) for HEAD-coupled assertions whose validator name or docstring cites a milestone-close state (e.g., "4 stale rows reconciled per Plan 61-02", "deferred items LIN-DEFER-01..", "Methodology highlights from v1.5 close") but whose implementation reads HEAD via `readFile()`. Produce per-validator class signature inventory + assessment of conversion scope. Per `v1.7-DEFERRED-CLEANUP.md:127, 132`. **Closed: Phase 73 Plan 73-01 atomic SHA `d2b8917` + Plan 73-03 close-gate SHA (recoverable via `git log --all --grep="73-03" --grep="close-gate" --all-match -1 --format=%H`).**

- [x] **RETRO-02**: Per-validator conversion of identified HEAD-coupled assertions to v1.5/v1.6/v1.7-frozen-aware via SHA-pinned helpers parallel to existing `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` / `readCorpusFileAtV17Close()`. Mechanism: `execFileSync('git', ['show', '<frozen-SHA>:<path>'])` per milestone-close. Per-assertion freshness routing follows v1.7 D-01 LOCKED Option C convention (per-V-NN-NN matrix). Scope-discipline guardrail: if scan surfaces SCOPE-GAP-class discovery beyond initial inventory, route to v1.9+ rather than ballooning v1.8. **Closed: Phase 73 Plan 73-02 atomic SHA `a85da77` + Plan 73-03 close-gate SHA (recoverable via `git log --all --grep="73-03" --grep="close-gate" --all-match -1 --format=%H`).**

### Pillar D — v1.8 Audit Harness Lineage Bump + Milestone Close

- [x] **HARNESS-07**: `scripts/validation/v1.8-milestone-audit.mjs` Path-A copy from `v1.7-milestone-audit.mjs` with C1-C13 + C14/C15/C16 preserved verbatim. Lineage extends v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 (6th milestone). Self-test 9/9 PASS preserved.

- [x] **HARNESS-08**: `scripts/validation/v1.8-audit-allowlist.json` Path-A copy from `v1.7-audit-allowlist.json` with `c13_rotting_external` reset for v1.8 (CI-1/CI-2 entries reflect Phase 67 SWEEP-01/02 closed state + post-VPP-3-sites annotations); sidecar shape preserved; `quarterly_audit` metadata carried forward (cadence `0 8 1 1,4,7,10 *`). BASELINE_12 freshness comment added to `regenerate-supervision-pins.mjs` (closes BASELINE_11 v1.7 carry-over per per-milestone AUDIT-14-equivalent contract).

- [ ] **HARNESS-09**: Per-phase validators `check-phase-71.mjs..check-phase-74.mjs` ship as deliverables (validator-as-deliverable pattern from v1.3+). Each is Path-A from `check-phase-70.mjs` with phase-specific V-NN-NN assertions for that phase's deliverables. CHAIN_PHASES does NOT include the validator's own phase (V-NN-SELF guard per `check-phase-65.mjs:151` precedent). Per-assertion-class freshness routing per D-01 LOCKED Option C (per-V-NN-NN matrix).

- [ ] **HARNESS-10**: `.github/workflows/audit-harness-v1.8-integrity.yml` Path-A from v1.7 with v1.8-scoped path-filter + 2 crons preserved + new validator jobs check-phase-71..74. Fourth parallel coexistence file (coexists with v1.4/v1.5/v1.6/v1.7 workflows zero modifications). `fetch-depth: 0` on linux-chain-ubuntu-latest checkout step preserved per FETCH-DEPTH-01 inheritance. PR-blocking per D-A9 (only `pin-helper-advisory` retains `continue-on-error: true`).

- [ ] **HARNESS-11**: 3-axis terminal re-audit at v1.8 close (HARNESS-05 v1.7 precedent extended). Axis 1: local fresh `git clone --no-hardlinks` into `$env:TEMP\v1.8-audit-<rand>` via fresh `gsd-executor` sub-agent (D-03 LOCKED + D-22 INTENT). Axis 2: cross-OS Linux GHA `workflow_dispatch` of `audit-harness-v1.8-integrity.yml`. Axis 3: fresh sub-agent (zero context-carryover from content phases). Cross-OS PASS-Count EXACT MATCH required across all cross-OS-applicable validators.

- [ ] **HARNESS-12**: `.planning/milestones/v1.8-MILESTONE-AUDIT.md` authored Path-A from v1.7 with 3-axis Auditor-Independence Verification + NEW Discoveries Surfaced During Execution section + Requirements Traceability + Sign-off /gsd-complete-milestone hand-off (including ARCHIVE-01 recurrence-check now PRE-VERIFIED by v1.8 Pillar A). `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` FINALIZED with v1.7 carry-overs promoted to full sections (CI-3 + Multi-tenant + ABDevice API + per-OU CRD + Account Holder + ASM) + any v1.8 retrospective discoveries beyond scope. 4-doc traceability closure across PROJECT.md + ROADMAP.md + STATE.md + REQUIREMENTS.md.

### Pillar D Carry-Over

- [x] **VPP-01**: 3 VPP-location-token sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115, 149, 155) surgically renamed to "content token" form per PITFALLS:657 first-mention-per-H2 convention. Mirrors Phase 67 SWEEP-02 atomic-within-plan pattern (D-03 line rewrites + Version History rows + sidecar annotation; PITFALL-6 anchor inventory pre-edit). Phase 67 SWEEP-02 carry-over per `v1.7-DEFERRED-CLEANUP.md:208-223`.

---

## Future Requirements (Deferred to v1.9+)

These are tracked in `v1.7-DEFERRED-CLEANUP.md` and will carry into `v1.8-DEFERRED-CLEANUP.md` at v1.8 close:

- **CI-3 Managed Apple ID → Managed Apple Account corpus rename** — 45 occurrences / 16 files; trigger is post-2026-07-01 quarterly tutorial refresh + Microsoft Intune portal adopts rebrand portal-side
- **Multi-tenant Apple Business surfaces** — DEFERRED indefinitely; requires net-new architectural decisions
- **Apple Business Device API documentation** — DEFERRED pending Apple publishing `developer.apple.com/documentation/applebusiness/`
- **Per-OU Conference Room Display deep-dive** — TRACKER ONLY; trigger is customer demand
- **Account Holder lockout dedicated runbook** — CONDITIONAL; promote if 5+ escalations per quarter
- **Apple School Manager (ASM) education-specific surfaces** — DEFERRED; outside enterprise scope

---

## Out of Scope (Explicit Exclusions)

- **New content phases / new platforms** — v1.8 is tooling-only milestone. Reason: scope discipline. Reasoning preserves milestone coherence.
- **New L1/L2 runbooks** — L1 runbook count NOT changed in v1.8; L2 runbook count NOT changed in v1.8 (mirrors v1.7 invariant)
- **New corpus content beyond VPP-01 surgical rename** — Reason: VPP-01 is the only corpus-touching requirement and is calibrated (3 sites in 1 file)
- **HARNESS-FORWARD-01 retrospective scope expansion** — If RETRO-01 scan surfaces SCOPE-GAP-class discoveries beyond initial inventory, route to v1.9+ rather than expanding v1.8 (explicit guardrail prevents milestone ballooning)
- **CI-3 inclusion** — DEFERRED to v1.9+ per trigger gate (Microsoft Intune portal rebrand adoption). Reason: term-mismatch between docs and admin's portal experience.
- **Anti-regression invariant violation** — Predecessor v1.4 / v1.4.1 / v1.5 / v1.6 / v1.7 workflows + milestone-audit harnesses + sidecars MUST remain BYTE-UNCHANGED through v1.8 close
- **Worktree-based execution** — Sequential-on-main-tree per `.planning/config.json` `use_worktrees: false` (durable user constraint)

---

## Traceability

<!-- Empty at milestone open; populated by gsd-roadmapper. Each row maps a requirement to the phase(s) that satisfy it. -->

| REQ-ID | Description (short) | Phase | Status |
|--------|---------------------|-------|--------|
| ARCHIVE-01 | gsd-complete-milestone.md extraction-logic root-cause fix | Phase 71 | Complete (closing SHA `e4887b2`) |
| ARCHIVE-02 | MILESTONES.md v1.0..v1.4.1 historical residue sweep | Phase 71 | Complete (closing SHA `ff4514b`) |
| WRAPPER-01 | check-phase-66.mjs:313 stdout+stderr capture | Phase 72 | Complete (closing SHA `d374095`) |
| RETRO-01 | HEAD-coupled assertion class-wide scan | Phase 73 | Complete (closing SHA `d2b8917` + Plan 73-03 close-gate) |
| RETRO-02 | Per-validator conversion to frozen-aware | Phase 73 | Complete (closing SHA `a85da77` + Plan 73-03 close-gate) |
| HARNESS-07 | v1.8-milestone-audit.mjs Path-A copy | Phase 74 | Pending |
| HARNESS-08 | v1.8-audit-allowlist.json + BASELINE_12 | Phase 74 | Pending |
| HARNESS-09 | check-phase-71..74.mjs per-phase validators | Phase 74 | Pending |
| HARNESS-10 | audit-harness-v1.8-integrity.yml workflow | Phase 74 | Pending |
| HARNESS-11 | 3-axis terminal re-audit at v1.8 close | Phase 74 | Pending |
| HARNESS-12 | v1.8-MILESTONE-AUDIT.md + v1.8-DEFERRED-CLEANUP.md + 4-doc traceability | Phase 74 | Pending |
| VPP-01 | 3 VPP-location-token sites in app-lifecycle/02-macos-pkg-dmg-pipeline.md | Phase 74 | Pending |

**12 requirements** | **12 mapped** | **5 complete** (ARCHIVE-01 + ARCHIVE-02 + WRAPPER-01 + RETRO-01 + RETRO-02) | Phase 71: ARCHIVE-01, ARCHIVE-02 | Phase 72: WRAPPER-01 | Phase 73: RETRO-01, RETRO-02 | Phase 74: HARNESS-07..12, VPP-01

---

*Authored 2026-06-03 at `/gsd-new-milestone v1.8` invocation. REQ-IDs locked. Roadmapper populates Phase + Status columns.*
