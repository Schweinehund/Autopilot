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
- ✅ **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (shipped 2026-06-26)
- 🔄 **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** — Phases 96-100 (active)

## Phases

<details>
<summary>✅ v1.0–v1.12 (Phases 1-95) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** (Phases 83-88) — SHIPPED 2026-06-24 — `.planning/milestones/v1.10-ROADMAP.md`
- ✅ v1.0–v1.9 (Phases 1-82) — see milestone entries and `.planning/milestones/`

</details>

---

### v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth (Phases 96-100)

- [x] **Phase 96: Surgical Conflict Fixes** — Patch verified factual errors in guide 00 (VPP/device-group conflicts) + L1 runbook 15 (user-group remediation) + macOS glossary (Iru 3-URL correction) (completed 2026-06-28)
- [x] **Phase 97: Enrollment & FileVault Depth Formalization** — Bring guide 02 Account Settings additions and guide 03 FileVault depth under requirements + harness coverage with freshness stamps (completed 2026-06-28)
- [ ] **Phase 98: Guide 07 Comprehensive Pass** — Fix the remaining guide 07 VPP conflict, add the full troubleshooting section (Extension-Identifier-typo + A2 delivery requirements + diagnostic tree), and formalize the PSSO admin-setup depth additions
- [ ] **Phase 99: New Runbook + Navigation Wiring** — Author the local-macOS-password-reset runbook for Secure-Enclave PSSO devices and wire it into all macOS navigation hubs
- [ ] **Phase 100: Harness Lineage Bump + Terminal Re-Audit + Milestone Close** — 11th Path-A audit-harness lineage bump, per-phase chain validators, V112 pin, 10th CI coexistence workflow, 3-axis terminal re-audit, and milestone close

## Phase Details

### Phase 96: Surgical Conflict Fixes

**Goal**: The three verified factual conflicts in shipped docs are corrected and the Iru glossary URL is updated — readers no longer encounter the VPP-on-macOS-Company-Portal error, the device-vs-user-group contradiction in guide 00, the wrong remediation in L1 runbook 15, or the stale Iru URL
**Depends on**: Nothing (first phase of v1.13)
**Requirements**: ACC-01, ACC-02, ACC-04, GLOS-01
**Success Criteria** (what must be TRUE):

  1. `docs/macos-lifecycle/00-ade-lifecycle.md` no longer describes Company Portal as VPP/Apps-and-Books deployable at the Stage-4/Stage-6 lines (~309/319/411), and the Stage-4-vs-Stage-6 self-contradiction is removed
  2. `docs/macos-lifecycle/00-ade-lifecycle.md` (~line 250) correctly states the A2 PSSO/SSO-extension policy is assigned to a static user group (not device group)
  3. `docs/l1-runbooks/15-macos-company-portal-sign-in.md` (~line 30) remediation correctly directs user-affinity devices to a user-group assignment (not device group)
  4. `docs/_glossary-macos.md` Iru/Kandji entry lists all three URLs: `support.iru.io` (primary), `support.kandji.io` (legacy redirect), and `docs.iru.com` (documentation source), consistent with guide 02's MIGV-02 content**Plans**: 3 plans
- [x] 96-01-PLAN.md — Guide 00: Stage-6 VPP→PKG/LOB rewrite + remove orphaned VPP row (ACC-01) and Stage-4 device→user group fix (ACC-02), stamps
- [x] 96-02-PLAN.md — L1 runbook 15: step-4 device→user group remediation fix (ACC-04), stamps
- [x] 96-03-PLAN.md — Glossary: Kandji-Iru 3-URL durable replacement (GLOS-01), stamps

**Cross-cutting constraints:**

- Frontmatter freshness stamps reflect the Phase 96 edit date with the +3-month invariant preserved

### Phase 97: Enrollment & FileVault Depth Formalization

**Goal**: The Account Settings depth additions in guide 02 and the FileVault/Local-Password-Policy depth additions in guide 03 — written during the live session outside the GSD flow — are formally covered by requirement IDs and carry per-section `last_verified`/`review_by` freshness stamps, so they become harness-validated corpus
**Depends on**: Phase 96
**Requirements**: DEP-01, DEP-02
**Success Criteria** (what must be TRUE):

  1. `docs/admin-setup-macos/02-enrollment-profile.md` documents the Account Settings section: local admin and local user account fields (account type, prefill, restrict-editing), PSSO account-creation ownership, password-prefill behavior for passwordless/federated accounts, and the UPN-via-Full-Name display note — all with `last_verified`/`review_by` stamps
  2. `docs/admin-setup-macos/03-configuration-profiles.md` documents FileVault (Full Disk Encryption) with all three sub-payloads (FileVault / FileVault Options / Recovery Key Escrow), the required `Defer` setting, Setup-Assistant enforcement, the recovery-key-escrow verification procedure, and the assignment target — with freshness stamps
  3. `docs/admin-setup-macos/03-configuration-profiles.md` includes a Local Password Policy (Passcode) section documenting the non-expiring best-practice and the compliance-mandated expiration alternative — with freshness stamps
  4. Both guide 02 and guide 03 additions are committed such that chain validators can assert their presence (frontmatter, section headers, or content markers as appropriate)

**Plans**: 1 plan

- [x] 97-01-PLAN.md — Guides 02/03 version-history formalization rows (DEP-01/DEP-02), bounded 4-claim spot-verify confirmation, REQUIREMENTS.md flip, Phase-100 needle-spec hand-off

### Phase 98: Guide 07 Comprehensive Pass

**Goal**: Guide 07 (`docs/admin-setup-macos/07-platform-sso-setup.md`) is corrected of its remaining VPP conflict, augmented with a full troubleshooting section covering the three real-world failure modes found in the 2026-06-27/28 session, and carries the full PSSO admin-setup depth (AccountName mapping, Non-PSSO-Accounts, Optional & Advanced settings, Registration-Approach decision record, End-User Sign-In Experience, local-password lifecycle) — all freshness-stamped and harness-covered
**Depends on**: Phase 97
**Requirements**: ACC-03, TS-01, TS-02, TS-03, DEP-03
**Success Criteria** (what must be TRUE):

  1. `07-platform-sso-setup.md` (~line 126) no longer lists "VPP from Apps and Books" as a Company Portal deployment option, and the Step 2 "Deploy to the device" callout distinguishes install target (device) from assignment target (user group for affinity / device group for userless)
  2. A Configuration-Caused-Failures section in guide 07 documents the Extension-Identifier-typo failure: symptom, root cause (`com.microsoft.CompanyPortalMac.ssoextension`; Intune does not validate this free-text field), fix, and the note that it affects both A1 and A2
  3. Guide 07 documents the A2 Company Portal delivery requirements in a consolidated, cross-linkable form: LOB app >= 5.2604.0, Required, same static user group as the PSSO policy, Intune-licensed user, `com.microsoft.CompanyPortalMac` as the only Included app
  4. Guide 07 includes the Setup-Assistant SSO-extension diagnostic tree (device record check → Company Portal version → Extension Identifier → user license → A1 bisect via disabling `Enable Registration During Setup`)
  5. Guide 07 carries the PSSO admin-setup depth: AccountName token mapping (AccountShortName vs preferred_username + LAPS), Company Portal assignment target, Non Platform SSO Accounts, Optional & Advanced settings with two account models, the Registration-Approach decision record, and the End-User Sign-In Experience (Secure Enclave) + local-password lifecycle — all freshness-stamped

**Plans**: 3 plans
**Wave 1**

- [ ] 98-01-PLAN.md — ACC-03 VPP fix + Step 2 callout reword; TS-02 ADE Path Prerequisites augmentation + A1/A2 pointer (D-03) + line-311 lockstep stamp (wave 1)

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 98-02-PLAN.md — TS-01 Extension-Identifier-typo failures row + deep-dive; TS-03 Setup-Assistant SSO-extension diagnostic-tree bisection ladder (wave 2)

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 98-03-PLAN.md — DEP-03 formalize-only + bounded spot-verify; D-04 frontmatter bump + version-history row; Phase-100 needle-spec hand-off (wave 3)

### Phase 99: New Runbook + Navigation Wiring

**Goal**: A dedicated local-macOS-password-reset runbook for Secure-Enclave PSSO devices exists and is reachable from all macOS navigation hubs — operators no longer have to assemble the procedure from scattered sources, and they understand that SSPR resets the Entra password only, that local-password reset invalidates the Secure Enclave key, and that PSSO re-registration is mandatory afterward
**Depends on**: Phase 98
**Requirements**: RUN-01
**Success Criteria** (what must be TRUE):

  1. A new or extended runbook documents all three local password recovery paths for Secure-Enclave PSSO devices: escrowed FileVault recovery key, managed admin account via macOS LAPS, and Apple ID (where allowed)
  2. The runbook explicitly states that SSPR resets the Entra password but does NOT reset the independent local password on Secure Enclave devices
  3. The runbook documents the mandatory PSSO re-registration follow-up after any local-password reset or FileVault-recovery-key unlock, and cross-links to L1 runbook #36
  4. The runbook is wired into the macOS navigation hubs (docs/index.md, common-issues.md, and/or quick-ref-l1.md as appropriate) so it is reachable from role-based entry points

**Plans**: TBD

### Phase 100: Harness Lineage Bump + Terminal Re-Audit + Milestone Close

**Goal**: The 11th Path-A audit-harness lineage is in place with per-phase validators covering all v1.13 phases, the V112 close-gate SHA pin is committed, the 3-axis terminal re-audit passes with cross-OS EXACT MATCH, and all 14 requirements are flipped to Validated in the milestone close-gate commit
**Depends on**: Phase 99 (all content phases complete)
**Requirements**: HARN-01, HARN-02, HARN-03
**Success Criteria** (what must be TRUE):

  1. `v1.13-milestone-audit.mjs` (C1-C16 inherited verbatim from v1.12) + `v1.13-audit-allowlist.json` sidecar + BASELINE_17 freshness comment are shipped as one indivisible Atom 1 commit
  2. `check-phase-96.mjs` through `check-phase-100.mjs` per-phase validators (chain-apex `CHAIN_PHASES=[48..100]`, `CHAIN_SKIP=new Set([])`), `_lib/frozen-at-close.mjs` V112 pin (v1.12 close-gate SHA), and `audit-harness-v1.13-integrity.yml` (10th parallel CI coexistence workflow; predecessors v1.4–v1.12 byte-unchanged) are shipped as one indivisible Atom 2 commit
  3. The 3-axis terminal re-audit (Axis 1: fresh `git clone --no-hardlinks`; Axis 2: cross-OS Linux GHA; Axis 3: fresh zero-context sub-agent) produces cross-OS PASS/FAIL/SKIP EXACT MATCH
  4. A single close-gate commit flips all 14 v1.13 requirements to Validated across PROJECT.md, ROADMAP.md, STATE.md, and REQUIREMENTS.md, and `v1.13-MILESTONE-AUDIT.md` + `v1.13-DEFERRED-CLEANUP.md` are authored

**Plans**: TBD
**Note**: This phase MUST execute after all content phases (96-99) are complete. Mirrors v1.12 Phase 95 / v1.11 Phase 93 close pattern.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 96. Surgical Conflict Fixes | 3/3 | Complete    | 2026-06-28 |
| 97. Enrollment & FileVault Depth Formalization | 1/1 | Complete    | 2026-06-28 |
| 98. Guide 07 Comprehensive Pass | 0/TBD | Not started | - |
| 99. New Runbook + Navigation Wiring | 0/TBD | Not started | - |
| 100. Harness Lineage Bump + Terminal Re-Audit + Milestone Close | 0/TBD | Not started | - |
