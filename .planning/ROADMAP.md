# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- ✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-19)
- ✅ **v1.4 Android Enterprise Enrollment Documentation** — Phases 34-42 (shipped 2026-04-24)
- ✅ **v1.4.1 Android Enterprise Completion & v1.4 Cleanup** — Phases 43-47 (shipped 2026-04-25)
- ✅ **v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup** — Phases 48-61 (shipped 2026-05-07)
- ✅ **v1.6 Apple Business Delegated Governance & Multi-Org Operations** — Phases 62-66 (shipped 2026-05-25)
- ✅ **v1.7 Deferred Backlog Closure + Validator Chain Hardening** — Phases 67-70 (shipped 2026-05-29)
- ✅ **v1.8 Tooling Debt Closure + Chain-Resilience Hardening** — Phases 71-74 (shipped 2026-06-08)
- ✅ **v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation** — Phases 75-82 (shipped 2026-06-22)
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (shipped 2026-06-24)
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (shipped 2026-06-26)
- [ ] **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (in progress)

## Phases

<details>
<summary>✅ v1.0–v1.11 (Phases 1-93) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** (Phases 83-88) — SHIPPED 2026-06-24 — `.planning/milestones/v1.10-ROADMAP.md`
- ✅ v1.0–v1.9 (Phases 1-82) — see milestone entries and `.planning/milestones/`

</details>

---

### v1.12 macOS MDM-Migration Verification Closure (started 2026-06-26)

**Milestone Goal:** Close the three Phase-90 post-migration verification gaps in `docs/macos-lifecycle/02-mdm-migration-psso.md` (Intune profile-based-enrollment config, Iru console delete UI path, supervision-status post-migration), then bump the audit harness to its 10th Path-A generation and close the milestone.

- [x] **Phase 94: Post-Migration Verification Content Closure** — Source-verify and document three open gaps in `docs/macos-lifecycle/02-mdm-migration-psso.md`: (1) Intune config beyond ADE token for profile-based enrollment (MIGV-01, full confidence after Microsoft Learn verification), (2) current Iru console delete UI path (MIGV-02, confirmed against support.iru.io), (3) supervision-status MEDIUM-confidence callout + pilot recommendation (MIGV-03, not a flat assertion). Carries `last_verified`/`review_by` stamps on all OS-26-gated additions. (completed 2026-06-26)
- [ ] **Phase 95: Harness Lineage Bump + Terminal Re-Audit + Milestone Close** — 10th Path-A lineage bump (Atom 1: `v1.12-milestone-audit.mjs` + `v1.12-audit-allowlist.json` + BASELINE_16; Atom 2: `check-phase-94..95.mjs` + `_lib/frozen-at-close.mjs` V111 pin + `audit-harness-v1.12-integrity.yml` as 9th CI coexistence workflow); 3-axis terminal re-audit (cross-OS EXACT MATCH); `v1.12-MILESTONE-AUDIT.md` + `v1.12-DEFERRED-CLEANUP.md` + 4-doc traceability closure.

## Phase Details

### Phase 94: Post-Migration Verification Content Closure

**Goal**: An operator reading `docs/macos-lifecycle/02-mdm-migration-psso.md` finds all three previously-unresolved post-migration verification questions answered at their correct confidence level — the Intune profile-based-enrollment config requirement documented at full confidence (source-verified against Microsoft Learn), the Iru console delete UI path confirmed-or-corrected against live vendor docs, and the supervision-status question documented as an explicit MEDIUM-confidence callout with a pilot recommendation
**Depends on**: Nothing (first and only content phase of v1.12)
**Requirements**: MIGV-01, MIGV-02, MIGV-03
**Success Criteria** (what must be TRUE):

  1. `docs/macos-lifecycle/02-mdm-migration-psso.md` contains a source-verified addendum (post-migration verification steps or pre-migration readiness-checklist sidebar) stating — at full confidence, citing current Microsoft Learn — whether any Intune configuration beyond ADE token assignment is required once an OS-26 in-place migration resolves to profile-based enrollment; carries `last_verified: <authoring-day>` and `review_by: <+90d>` stamps; `docs/l2-runbooks/30-macos-mdm-migration-failure.md` is updated only if the answer affects migration-failure triage
  2. The Kandji/Iru source-side steps section of guide `02` reflects the verified current Iru post-rebrand console device-deletion UI path (checked against `support.iru.io` or current Iru support portal); the text confirms whether the documented secret-retrieval pre-flight (FileVault recovery key / Activation Lock bypass) is still required; both "Kandji" and "Iru" names remain present for searchability
  3. Guide `02` contains an explicit MEDIUM-confidence callout on supervision status that (a) states the most-likely behavior with available sources, (b) recommends a pilot-device `profiles status` / `profiles list` before-and-after test without asserting unverified procedure as fact, and (c) makes no claim that the PSSO Secure Enclave key survives migration (Apple authoritative: re-registration always required); callout carries `last_verified` / `review_by` stamps; the callout is framed as MEDIUM confidence and does NOT assert supervision is preserved as a fact**Plans**: 1 plan
  - [x] 94-01-PLAN.md — Close all three MIGV gaps in docs/macos-lifecycle/02-mdm-migration-psso.md: MIGV-01 Microsoft-Learn-cited full-confidence upgrade (Stage 3/7) + MIGV-03 MEDIUM supervision callout refinement + MIGV-02 Iru/Kandji both-URL delete-path verification (Stage 2 + glossary) + D-04 hybrid freshness stamps

**UI hint**: no

### Phase 95: Harness Lineage Bump + Terminal Re-Audit + Milestone Close

**Goal**: The v1.12 audit harness ships as the 10th Path-A milestone harness (Atom 1 + Atom 2 two-atomic-commit pattern), the 3-axis terminal re-audit confirms cross-OS EXACT MATCH with Linux GHA apex authoritative, and the milestone is formally closed with all predecessor frozen surfaces byte-unchanged
**Depends on**: Phase 94
**Requirements**: HARN-01, HARN-02, HARN-03
**Success Criteria** (what must be TRUE):

  1. Atom 1 ships as one indivisible commit: `v1.12-milestone-audit.mjs` (Path-A from v1.11, C1-C16 inherited) + `v1.12-audit-allowlist.json` + BASELINE_16 freshness comment in `regenerate-supervision-pins.mjs`
  2. Atom 2 ships as one indivisible commit: `check-phase-94..95.mjs` (per-phase validators; chain-apex `CHAIN_PHASES=[48..93]`, `CHAIN_SKIP=new Set([])`) + `_lib/frozen-at-close.mjs` V111 entry (v1.11 close-gate SHA — confirm with `git log --grep="close-gate" --grep="v1.11" --all-match -1` on authoring day, candidate `919b23b`; pinned BEFORE any v1.12 validator is authored) + `audit-harness-v1.12-integrity.yml` as the 9th parallel CI coexistence workflow (predecessors v1.4–v1.11 byte-unchanged)
  3. 3-axis terminal re-audit completes: Axis 1 fresh `git clone --no-hardlinks` into `$env:TEMP\v1.12-audit-<rand>` + Axis 2 cross-OS Linux GHA (apex authoritative per D-03, given WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..93]) + Axis 3 fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP counts are EXACT MATCH
  4. `v1.12-MILESTONE-AUDIT.md` and `v1.12-DEFERRED-CLEANUP.md` are authored; 4-doc traceability closure (PROJECT.md / ROADMAP.md / STATE.md / REQUIREMENTS.md) flips all 6 requirements to Validated; predecessor v1.4–v1.11 frozen surfaces BYTE-UNCHANGED

**Plans**: 4 plans
**Wave 1**

  - [x] 95-01-PLAN.md — 95-CONVENTIONS.md constants lock + HARN-01 Atom 1 (v1.12-milestone-audit.mjs + v1.12-audit-allowlist.json + BASELINE_16)

**Wave 2** *(blocked on Wave 1 completion)*

  - [x] 95-02-PLAN.md — HARN-02 Atom 2 (check-phase-94 + check-phase-95 apex [48..94] + frozen-at-close V111 + 9th CI workflow); pushed to origin/master

**Wave 3** *(blocked on Wave 2 completion)*

  - [ ] 95-03-PLAN.md — HARN-03 3-axis terminal re-audit (4-row cross-OS; both chain validators Linux-authoritative)

**Wave 4** *(blocked on Wave 3 completion)*

  - [ ] 95-04-PLAN.md — HARN-03 close-gate (v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability 6/6 + D-01 apex patch + byte-unchanged gate)

**UI hint**: no

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 94. Post-Migration Verification Content Closure | 1/1 | Complete    | 2026-06-26 |
| 95. Harness Lineage Bump + Terminal Re-Audit + Milestone Close | 2/4 | In Progress|  |
