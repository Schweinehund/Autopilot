---
gsd_state_version: 1.0
milestone: v1.13
milestone_name: macOS Platform SSO Admin-Setup Documentation Accuracy & Depth
status: executing
last_updated: "2026-06-29T16:26:36.244Z"
last_activity: 2026-06-29 -- Phase 98 planning complete
progress:
  total_phases: 5
  completed_phases: 2
  total_plans: 7
  completed_plans: 4
  percent: 40
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-28 for v1.13 milestone)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices — including Apple-platform single sign-on (macOS Platform SSO + Kerberos SSO + programmatic Platform Credential management), end-to-end PSSO provisioning, and Kandji/Iru→Intune MDM migration — through Microsoft Intune / Entra ID without escalating to engineering.
**Current focus:** Phase 98 — guide 07 comprehensive pass

## Current Position

Phase: 98
Plan: Not started
Status: Ready to execute
Last activity: 2026-06-29 -- Phase 98 planning complete

## v1.13 Phase Dependency Summary

```
Phase 96 (Surgical Conflict Fixes)
  |       ACC-01, ACC-02, ACC-04, GLOS-01
  |       MODIFIED (surgical patches — no new files):
  |         - docs/macos-lifecycle/00-ade-lifecycle.md
  |           * ACC-01: remove VPP/Apps-and-Books Company Portal option at Stage-4/Stage-6
  |             lines (~309/319/411); remove Stage-4-vs-Stage-6 self-contradiction
  |           * ACC-02: ~line 250 — change "static device group" to "static user group"
  |             for A2 PSSO/SSO-extension policy assignment
  |         - docs/l1-runbooks/15-macos-company-portal-sign-in.md
  |           * ACC-04: ~line 30 — remediation corrected to user-group assignment
  |             for user-affinity devices (not device group)
  |         - docs/_glossary-macos.md
  |           * GLOS-01: Iru/Kandji entry updated to 3-URL reality
  |             (support.iru.io primary / support.kandji.io legacy redirect /
  |              docs.iru.com documentation source) — closes GLOSSARY-IRU-URL-FRESHNESS-01
  |       HARD CONSTRAINTS:
  |         - All edits are surgical patches to existing content only
  |         - No new files; no nav-hub edits in this phase
  |         - Freshness stamps not required on conflict-fix-only lines unless
  |           the containing section is macOS-26-gated
  |
  v
Phase 97 (Enrollment & FileVault Depth Formalization)
  |       DEP-01, DEP-02
  |       MODIFIED:
  |         - docs/admin-setup-macos/02-enrollment-profile.md
  |           * DEP-01: Account Settings section — local admin + local user account
  |             fields (account type / prefill / restrict-editing); PSSO account-creation
  |             ownership; password-prefill (passwordless/federated) behavior;
  |             UPN-via-Full-Name display note; last_verified/review_by stamps
  |         - docs/admin-setup-macos/03-configuration-profiles.md
  |           * DEP-02: FileVault (Full Disk Encryption) depth — 3 sub-payloads
  |             (FileVault / FileVault Options / Recovery Key Escrow), required Defer,
  |             Setup-Assistant enforcement, recovery-key-escrow verification procedure,
  |             assignment target; Local Password Policy (Passcode) section;
  |             last_verified/review_by stamps
  |       HARD CONSTRAINTS:
  |         - All OS-26-gated content carries per-section last_verified/review_by stamps
  |           (verified against Microsoft Learn 2026-06-27/28; 90-day review cycle)
  |         - Session-written depth additions are FORMALIZED (brought under REQ-IDs and
  |           harness coverage) — not net-new research; verified content only
  |         - No guide 07 edits in this phase (guide 07 is Phase 98's scope)
  |
  v
Phase 98 (Guide 07 Comprehensive Pass)
  |       ACC-03, TS-01, TS-02, TS-03, DEP-03
  |       MODIFIED:
  |         - docs/admin-setup-macos/07-platform-sso-setup.md
  |           * ACC-03: ~line 126 — remove "VPP from Apps and Books" Company Portal
  |             option; reword Step 2 "Deploy to the device" callout to distinguish
  |             install target (device) from assignment target (user group / device group)
  |           * TS-01: Configuration-Caused-Failures section — Extension-Identifier-typo
  |             failure (symptom, root cause, correct identifier
  |             com.microsoft.CompanyPortalMac.ssoextension, Intune-does-not-validate note,
  |             fix, affects A1+A2)
  |           * TS-02: A2 Company Portal delivery requirements consolidated (LOB app
  |             >= 5.2604.0, Required, same static user group as PSSO policy,
  |             Intune-licensed user, Included-apps trimmed to com.microsoft.CompanyPortalMac);
  |             cross-link from guide 01
  |           * TS-03: Setup-Assistant SSO-extension diagnostic tree (Intune device record
  |             → CP version → Extension Identifier → user license → A1 bisect via
  |             disabling Enable Registration During Setup)
  |           * DEP-03: PSSO admin-setup depth — AccountName token mapping
  |             (AccountShortName vs preferred_username + LAPS), Company Portal assignment
  |             target, Non Platform SSO Accounts, Optional & Advanced Platform SSO
  |             Settings (two account models + per-setting reference), Registration-Approach
  |             decision record, End-User Sign-In Experience (Secure Enclave) +
  |             local-password lifecycle; last_verified/review_by stamps
  |       HARD CONSTRAINTS:
  |         - All OS-26-gated content carries per-section last_verified/review_by stamps
  |         - TS-01/02/03 document verified real-world failures from 2026-06-27/28 session;
  |           DEP-03 formalizes session-written depth — no speculative content
  |         - All five requirements edit the same file; single-phase grouping avoids
  |           multiple passes over guide 07
  |
  v
Phase 99 (New Runbook + Navigation Wiring)
  |       RUN-01
  |       CREATED:
  |         - New (or extended) runbook: local-macOS-password-reset procedure for
  |           Secure-Enclave PSSO devices
  |           * Recovery paths: escrowed FileVault recovery key / managed admin (macOS LAPS)
  |             / Apple ID (where allowed)
  |           * Clarification: SSPR resets Entra password only — does NOT reset
  |             independent local password under Secure Enclave
  |           * Mandatory PSSO re-registration follow-up after local-password reset or
  |             FileVault-recovery-key unlock (cross-link to L1 #36)
  |       NAVIGATION-WIRED (append-only edits to hubs AFTER runbook committed):
  |         - docs/index.md (+ L1/L2 row as appropriate)
  |         - docs/common-issues.md (symptom entry)
  |         - docs/quick-ref-l1.md or docs/quick-ref-l2.md (role-appropriate entry)
  |       HARD CONSTRAINTS:
  |         - Navigation hub wiring ONLY after runbook file is committed (navigation-last)
  |         - No edits to guide 07 or guides 02/03 in this phase
  |         - Existing L1 #36 (36-macos-secure-enclave-key.md) is cross-linked FROM the
  |           new runbook; L1 #36 itself is minimally edited for reciprocal cross-link only
  |
  v
Phase 100 (Harness Lineage Bump + Terminal Re-Audit + Milestone Close — MUST BE LAST)
          HARN-01, HARN-02, HARN-03
          V112 (v1.12 close-gate SHA) pinned in _lib/frozen-at-close.mjs BEFORE
            any check-phase-96.mjs is authored; confirm with:
            `git log --grep="close-gate" --grep="v1.12" --all-match -1`
          Atom 1 (3 files indivisible — HARN-01):

            - v1.13-milestone-audit.mjs (Path-A from v1.12, C1-C16 inherited verbatim)
            - v1.13-audit-allowlist.json (sidecar repointed)
            - BASELINE_17 freshness comment in regenerate-supervision-pins.mjs
          Atom 2 (indivisible set — HARN-02):

            - check-phase-96.mjs through check-phase-100.mjs (per-phase validators;
              chain-apex CHAIN_PHASES=[48..100], CHAIN_SKIP=new Set([]))

            - _lib/frozen-at-close.mjs V112 entry (v1.12 close-gate SHA)
            - audit-harness-v1.13-integrity.yml (10th parallel CI coexistence workflow;
              predecessors v1.4-v1.12 byte-unchanged)
          3-axis terminal re-audit (HARN-03):

            - Axis 1: fresh git clone --no-hardlinks into $env:TEMP\v1.13-audit-<rand>
            - Axis 2: cross-OS Linux GHA (BOTH chain validators authoritative per D-03
              corrected OS split — WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..100])

            - Axis 3: fresh zero-context sub-agent
            - cross-OS PASS/FAIL/SKIP EXACT MATCH required
          Close-gate: v1.13-MILESTONE-AUDIT.md + v1.13-DEFERRED-CLEANUP.md +
            4-doc traceability closure (14/14 Validated)
          Predecessor v1.4-v1.12 frozen surfaces BYTE-UNCHANGED invariant
```

## v1.13 Requirement Coverage (14/14 mapped; 0/14 Validated — IN PROGRESS)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 96 | ACC-01, ACC-02, ACC-04, GLOS-01 | 4 |
| 97 | DEP-01, DEP-02 | 2 |
| 98 | ACC-03, TS-01, TS-02, TS-03, DEP-03 | 5 |
| 99 | RUN-01 | 1 |
| 100 | HARN-01, HARN-02, HARN-03 | 3 |
| **Total** | **14/14 mapped** | **14** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 100 terminal re-audit uses fresh `git clone --no-hardlinks` into `$env:TEMP\v1.13-audit-<rand>` (D-03 LOCKED — Linux GHA BOTH chain validators authoritative given WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..100]; same corrected D-03 OS split as v1.12).

**Named decisions (LOCKED at roadmap 2026-06-28):**

- PHASE-COUNT: 5 phases (96-100) — conflict-fixes (96) + enrollment/FileVault depth (97) + guide-07 comprehensive (98) + new runbook + nav (99) + harness/close (100)
- GUIDE-07-GROUPING: ACC-03 + TS-01/02/03 + DEP-03 all grouped into Phase 98 — all five requirements edit the same file; single-pass grouping avoids multiple round-trips over guide 07
- NAVIGATION-LAST: Phase 99 is navigation-last for the new local-password-reset runbook; nav hub entries committed only after the runbook file is committed (mirrors v1.11 Phase 92 pattern)
- HARNESS-LINEAGE: 11th Path-A milestone (v1.4→v1.13); BASELINE_17; V112 pin; 10th CI workflow
- CHAIN-APEX: CHAIN_PHASES=[48..100] — note WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 applies at this depth; Linux GHA chain validators are authoritative (same D-03 corrected split as v1.12)
- GLOS-01-PLACEMENT: GLOS-01 rides with Phase 96 (surgical corpus edits) — single-line glossary URL fix, thematically aligned with accuracy fixes, no phase fragmentation cost

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
- **v1.13 (in progress): 5 phases (96-100), plan count TBD**

## Accumulated Context

### Decisions

**v1.13 roadmap decisions (LOCKED 2026-06-28):**

- Five-phase structure: Phase 96 (surgical conflict fixes + glossary) → Phase 97 (guides 02/03 depth formalization) → Phase 98 (guide 07 comprehensive: remaining conflict fix + all troubleshooting captures + full depth formalization) → Phase 99 (new local-password-reset runbook + nav wiring) → Phase 100 (harness lineage bump + close)
- Guide 07 receives all five of ACC-03/TS-01/TS-02/TS-03/DEP-03 in a single phase — this is the natural grouping since all five modify the same file
- Phase 99 follows the navigation-last pattern established in v1.11 Phase 92 — nav hub entries committed only after the new runbook file is confirmed committed
- GLOS-01 (single-line Iru URL fix, v1.12-deferred) bundled with Phase 96 surgical accuracy fixes rather than given its own phase — zero fragmentation cost, thematically aligned
- HARN-01/02/03 in Phase 100 mirror v1.12 Phase 95 exactly: Atom 1 (v1.13-milestone-audit.mjs + allowlist + BASELINE_17) → Atom 2 (check-phase-96..100.mjs + V112 pin + 10th CI workflow) → HARN-03 (3-axis re-audit + close artifacts)

**Durable architectural decisions (carried forward from v1.12):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commit (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; predecessor frozen surfaces BYTE-UNCHANGED
- Per-section `last_verified`/`review_by` stamps required on all OS-26-gated additions (90-day review cycle; verified against Microsoft Learn 2026-06-27/28)
- Link-not-copy architecture preserved; no inline duplication across guides
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..100]: Linux GHA BOTH chain validators are authoritative (D-03 corrected OS split, same as v1.12)
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory)
- [Phase ?]: 96-01 execution
- [Phase ?]: 96-01 execution
- [Phase ?]: GLOS-01 (Phase 96-03): Kandji-Iru glossary updated to 3-URL durable reality; stale 'URL is unchanged' sentence removed per D-04
- [Phase ?]: Phase 97: DEP-01 and DEP-02 formalized with 2026-06-28 version-history rows; 4 bounded spot-verify claims CORRECT; frontmatter unchanged; 97-NEEDLE-SPEC.md recorded for Phase-100 validator authoring

### Pending Todos

- At Phase 96 plan time: confirm exact line numbers in 00-ade-lifecycle.md and 15-macos-company-portal-sign-in.md before patching (the SEED has approximate line numbers ~250/~309/~319/~30)
- At Phase 97 plan time: confirm current state of guides 02 and 03 — assess what was written in the live session vs. what needs to be added/adjusted to match DEP-01/DEP-02 scope
- At Phase 98 plan time: confirm guide 07 current state — assess session-written additions vs. what remains to formalize; confirm exact line for ACC-03 (~line 126)
- At Phase 99 plan time: determine whether new runbook is standalone (new file) or extended from an existing runbook; identify correct nav hub locations
- At Phase 100 plan time: confirm V112 (v1.12 close-gate SHA) via `git log --grep="close-gate" --grep="v1.12" --all-match -1` before authoring frozen-at-close.mjs; confirm CHAIN_PHASES=[48..100] count (53 entries)

### Blockers/Concerns

Execution-time checks (not blockers — must be addressed within specified phases):

- Phase 98: Guide 07 has had session-written additions during 2026-06-27/28 outside the GSD flow — assess current file state at plan time to avoid double-adding content
- Phase 99: Determine whether a new L1 runbook file or extension of an existing one best serves RUN-01; evaluate navigation targets at plan time
- Phase 100: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..100] — mitigated by D-03 corrected OS split; Linux GHA BOTH chain validators are authoritative; carried in v1.13-DEFERRED-CLEANUP.md

## Session Continuity

Last session: 2026-06-29T15:59:27.282Z
Stopped at: Phase 98 context gathered
Resume file: .planning/phases/98-guide-07-comprehensive-pass/98-CONTEXT.md
Next action: `/gsd-plan-phase 96`

## Operator Next Steps

- Run `/gsd-plan-phase 96` to plan Phase 96: Surgical Conflict Fixes
- At planning time for gray-area scoping decisions, invoke `/adversarial-review` per user preference

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| (v1.13 phases not yet started) | — | — | — |
| Phase 96 P01 | 8 | 2 tasks | 1 files |
| Phase 96 P03 | 5m | 1 tasks | 1 files |
| Phase 97 P01 | 10m | 3 tasks | 4 files |
