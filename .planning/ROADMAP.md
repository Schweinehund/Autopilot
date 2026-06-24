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
- 🚧 **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (in progress)

## Phases

<details>
<summary>✅ v1.0–v1.9 (Phases 1-82) — SHIPPED</summary>

Full details in milestone entries above and in `.planning/milestones/`.

</details>

### 🚧 v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL (In Progress)

**Milestone Goal:** Close the v1.9-deferred Platform SSO follow-on backlog (PSSO-FUT-01/02/04) with discoverable, fully-integrated documentation, so Intune/Entra admins and L1/L2 teams can configure and troubleshoot macOS Kerberos SSO and programmatic Platform Credential management without escalating to engineering.

- [x] **Phase 83: Kerberos SSO Extension Guide** — New `10-kerberos-sso-extension.md` + guide 09 surgical edit + glossary entry + 00-overview.md extension (completed 2026-06-23)
- [x] **Phase 84: Graph API Doc + NUAL Key Table** — New `11-graph-api-platform-credential.md` (Option A) + guide 08 NUAL surgical edit + glossary extension (completed 2026-06-23)
- [x] **Phase 85: Capability Matrix + L2 Runbooks** — Kerberos matrix row (atomic with V-63-08 hash update) + L2 runbooks #28 and #29 + l2-runbooks/00-index extension (completed 2026-06-23)
- [x] **Phase 86: Chain Health Pass** — Frozen-aware conversion of 10 legacy FAILs (check-phase-{58-66,73}) + restore 73-RETRO-INVENTORY.md; chain apex exits 0 FAIL on Windows and Linux (completed 2026-06-24)
- [x] **Phase 87: Navigation Hub Integration** — Navigation-last integration into docs/index.md, common-issues.md, quick-ref-l2.md, l2-runbooks/00-index.md, decision-trees/06-macos-triage.md (completed 2026-06-24)
- [ ] **Phase 88: Harness Lineage Bump + Terminal Re-Audit + Milestone Close** — Path-A v1.10 harness (Atom 1 + Atom 2) + 3-axis terminal re-audit + close-gate

## Phase Details

### Phase 83: Kerberos SSO Extension Guide

**Goal**: Admins can configure and understand the Apple Kerberos SSO extension from a complete new guide, and the legacy guide 09 deferred-item note is replaced with a live forward link
**Depends on**: Nothing (first content phase of v1.10)
**Requirements**: KRB-01, KRB-02, KRB-03, KRB-04
**Success Criteria** (what must be TRUE):

  1. `docs/admin-setup-macos/10-kerberos-sso-extension.md` exists with extension identity `com.apple.AppSSOKerberos.KerberosExtension`, Type: Credential (not Redirect), Intune Custom Template deployment path, realm/KDC config, and explicit disambiguation from Platform SSO and the Microsoft Enterprise SSO plug-in
  2. Guide 10 documents the macOS 14.6 floor for PSSO + Kerberos TGT integration (`usePlatformSSOTGT`), the Company Portal version prerequisites, the cosmetic "Not signed in" note, and Azure Files Cloud-Kerberos as a limited-preview callout
  3. Guide 10 documents `app-sso platform -s` + `klist` as the canonical diagnostic pair; ticket lifecycle and realm/KDC reachability checks are present
  4. Guide 09's `## Kerberos SSO Extension (Coexistence)` deferred-item sentence is replaced with a live forward link to guide 10 (no other prose in guide 09 changes)
  5. `docs/admin-setup-macos/00-overview.md` Mermaid + bullet list includes a node for guide 10; `docs/_glossary-macos.md` contains a Kerberos SSO Extension entry

**Plans**: 3 plans
Plans:
**Wave 1**

- [x] 83-01: Author `10-kerberos-sso-extension.md` — extension identity, payload type, Intune Custom Template path, realm/KDC config, disambiguation table
- [x] 83-03: Surgical edits — guide 09 forward-link replacement (one sentence), `00-overview.md` Mermaid/bullet extension (guide 10 node), glossary Kerberos SSO Extension entry

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 83-02: Author guide 10 PSSO TGT integration section — macOS 14.6 floor, Company Portal versions, `usePlatformSSOTGT`, cosmetic note, Cloud-Kerberos preview callout; diagnostics section (`app-sso platform -s`, `klist`, ticket lifecycle)

### Phase 84: Graph API Doc + NUAL Key Table

**Goal**: Admins can manage macOS Secure Enclave Platform Credentials programmatically via a dedicated Graph-API operations doc, and guide 08's NUAL section contains the verified MDM plist key literals with no deferred-item callout
**Depends on**: Phase 83
**Requirements**: GRAPH-01, GRAPH-02, NUAL-01
**Success Criteria** (what must be TRUE):

  1. `docs/admin-setup-macos/11-graph-api-platform-credential.md` exists with the GA `platformCredentialAuthenticationMethod` resource (Graph v1.0), List/Get/Delete operations (with HTTP and PowerShell SDK examples), key properties, and a permissions matrix distinguishing read vs delete scopes and delegated vs application
  2. The Graph doc contains a mandatory `> [!WARNING]` callout specifying that Delete severs the Entra binding (forces PSSO re-registration) and does NOT remote-erase the Secure Enclave key; automation examples include a dry-run step
  3. Guide 08's NUAL Settings Catalog table contains the verified MDM payload key literals `NewUserAuthorizationMode` (one-time; Standard/Admin/Groups/Temporary) and `UserAuthorizationMode` (persistent; Standard/Admin/Groups) plus the `EnableCreateUserAtLogin` prerequisite, the one-time-vs-persistent behavioral asymmetry, and a note that Temporary is defined in Apple schema but not surfaced in Intune UI
  4. The v1.9 deferred-item callout blockquote in guide 08's NUAL section is removed; PSSO-FUT-01 is closed
  5. `docs/admin-setup-macos/00-overview.md` includes a node for guide 11; `docs/_glossary-macos.md` contains a Platform Credential Graph API entry or extended Platform SSO term with a see-also to guide 11

**Plans**: 2 plans

Plans:
**Wave 1**

- [x] 84-01-PLAN.md — Author `11-graph-api-platform-credential.md` (hybrid suite-anchored Graph API operations-reference): resource reference, List/Get/Delete with HTTP-primary + PowerShell SDK companion examples (`platformCredentialMethods` nav-property per D-08), verified permissions matrix (D-09), mandatory Delete `[!WARNING]`, and dry-run-gated leaver/offboarding pattern (GRAPH-01, GRAPH-02). Pre-task endpoint/permission verification is pre-resolved in 84-RESEARCH.md.

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 84-02-PLAN.md — Surgical integration edits: guide 08 NUAL consolidated table with verified key literals + deferred-blockquote removal (NUAL-01 / PSSO-FUT-01 closed); `00-overview.md` guide 11 node; `_glossary-macos.md` Platform SSO see-also extension (GRAPH-01 integration; completes SC#5).

### Phase 85: Capability Matrix + L2 Runbooks

**Goal**: The macOS capability matrix documents Kerberos SSO Extension support, two new L2 runbooks give engineers structured investigation paths, and the harness V-63-08 blob-hash baseline remains consistent with the matrix file
**Depends on**: Phase 84
**Requirements**: REF-01, REF-02, RUN-01, RUN-02
**Success Criteria** (what must be TRUE):

  1. A pre-edit anchor inventory artifact for `docs/reference/macos-capability-matrix.md` is committed before any matrix edits, recording all existing `## ` headings and anchor IDs
  2. `docs/reference/macos-capability-matrix.md` contains a Kerberos SSO Extension row (under `## Authentication` or a new `## SSO Extensions` H2) with links to guide 10; the `check-phase-63.mjs` V-63-08 blob hash is updated in the same atomic commit
  3. `docs/_glossary-macos.md` contains a Kerberos SSO Extension entry and a Platform Credential (Graph API) entry or see-also; `docs/reference/4-platform-capability-comparison.md` macOS cells are updated link-not-copy for the new Kerberos row
  4. `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` exists with ticket acquisition triage, realm/KDC reachability checks, TGT verification (`app-sso platform -s` / `klist`), and log collection steps
  5. `docs/l2-runbooks/29-macos-graph-credential-investigation.md` exists with enumerate/verify/delete workflow, the delete-and-re-register flow, and permission/role troubleshooting steps

**Plans**: 3 plans
Plans:
**Wave 1**

- [x] 85-01-PLAN.md — Pre-edit anchor inventory for `macos-capability-matrix.md` (committed artifact); add Kerberos SSO Extension row(s) under `## Authentication` + atomic V-63-08 hash update in one commit (REF-01)
- [x] 85-03-PLAN.md — Author L2 runbook `28-macos-kerberos-sso-investigation.md` + `29-macos-graph-credential-investigation.md`; extend `00-index.md` macOS ADE Runbooks table (RUN-01, RUN-02)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 85-02-PLAN.md — Verify macOS glossary terms (no recreate); reciprocal Windows `_glossary.md` Kerberos + Platform-Credential see-also; `4-platform-capability-comparison.md` macOS cell link-not-copy + atomic V-63-09 hash update (REF-02)

### Phase 86: Chain Health Pass

**Goal**: The 10 pre-existing legacy chain FAILs (check-phase-{58,59,60,61,62,63,64,65,66,73}) are resolved via frozen-aware conversion with no CHAIN_SKIP masking, and the full validator chain exits 0 FAIL on both Windows local and Linux GHA before any v1.10 harness files are authored
**Depends on**: Phase 85
**Requirements**: CHAIN-01, CHAIN-02
**Success Criteria** (what must be TRUE):

  1. All 10 legacy HEAD-coupled assertions in check-phase-{58,59,60,61,62,63,64,65,66,73}.mjs are converted to frozen-aware reads via `_lib/frozen-at-close.mjs` helpers; no `CHAIN_SKIP` entry is added or expanded
  2. The missing `73-RETRO-INVENTORY.md` is restored or regenerated so check-phase-73.mjs exits PASS
  3. The full validator chain (check-phase-{48..82}.mjs) exits 0 FAIL / 0 SKIPPED on Windows local
  4. The full validator chain exits 0 FAIL / 0 SKIPPED on Linux GHA (cross-OS EXACT MATCH with Windows)

**Plans**: 2 plans
Plans:
**Wave 1**

- [x] 86-01-PLAN.md — Convert V-58-10/V-59-24 to frozen-aware (ba2cbc0) + V-72/73/74/82 VERIFICATION + V-73-INVENTORY to archive-aware (SKIP-PASS→FAIL); cascade 60-66 untouched; CHAIN_SKIP stays Set([])

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 86-02-PLAN.md — Run apex 0 FAIL / 0 SKIPPED on Windows; dispatch existing v1.9 GHA workflow; confirm Linux green + cross-OS EXACT MATCH

### Phase 87: Navigation Hub Integration

**Goal**: All new v1.10 content is reachable from every applicable navigation hub, and no nav-hub link is committed until the content file it references is confirmed committed (navigation-last invariant satisfied)
**Depends on**: Phase 86
**Requirements**: REF-03
**Success Criteria** (what must be TRUE):

  1. `docs/index.md` macOS Admin Setup table includes rows for guide 10 (`10-kerberos-sso-extension.md`) and guide 11 (`11-graph-api-platform-credential.md`); the Desktop Engineering L2 table includes rows for L2 #28 and L2 #29
  2. `docs/common-issues.md` macOS section includes a Kerberos SSO extension escalation entry routing to L2 #28
  3. `docs/quick-ref-l2.md` macOS section includes `app-sso platform -s` and `klist` as Kerberos diagnostic commands
  4. `docs/l2-runbooks/00-index.md` macOS ADE Runbooks table includes rows for L2 #28 and L2 #29 with escalation mapping
  5. `docs/decision-trees/06-macos-triage.md` includes a Kerberos SSO extension leaf node routing to L2 #28

**Plans**: 2 plans (Wave 1, parallel — disjoint file sets)

Plans:
**Wave 1**

- [x] 87-01-PLAN.md — Append-only edits to `docs/index.md` (D-01 enrich Platform SSO admin-setup row for guides 10/11; D-02 two L2 rows #28/#29 → `00-index.md#macos-ade-runbooks`) and `docs/common-issues.md` (D-05 standalone Kerberos SSO Extension Failure entry → L2 #28)
- [x] 87-02-PLAN.md — Append-only edits to `docs/quick-ref-l2.md` (D-04 Kerberos SSO Diagnostics block, klist only + pointer), VERIFY-ONLY `docs/l2-runbooks/00-index.md` (D-03 rows #28/#29 present, no L1-mapping row), and `docs/decision-trees/06-macos-triage.md` (D-06/D-07 RED MACE2 Kerberos leaf under MACSSO → L2 #28)

### Phase 88: Harness Lineage Bump + Terminal Re-Audit + Milestone Close

**Goal**: The v1.10 audit harness ships as the 8th Path-A milestone harness (Atom 1 + Atom 2 two-atomic-commit pattern), the 3-axis terminal re-audit confirms cross-OS EXACT MATCH, and the milestone is formally closed with all predecessor frozen surfaces byte-unchanged
**Depends on**: Phase 87
**Requirements**: HARN-01, HARN-02, HARN-03
**Success Criteria** (what must be TRUE):

  1. Atom 1 ships as one indivisible commit: `v1.10-milestone-audit.mjs` (Path-A from v1.9, C1-C16 inherited) + `v1.10-audit-allowlist.json` + BASELINE_14 freshness comment in `regenerate-supervision-pins.mjs`
  2. Atom 2 ships as one indivisible commit: `check-phase-83..88.mjs` (per-phase validators) + `_lib/frozen-at-close.mjs` V19 SHA entry (v1.9 close-gate SHA pinned before any check-phase-83.mjs is authored) + `audit-harness-v1.10-integrity.yml` as the 7th parallel CI coexistence workflow (predecessors v1.4-v1.9 byte-unchanged)
  3. 3-axis terminal re-audit completes: Axis 1 fresh `git clone --no-hardlinks` local + Axis 2 cross-OS Linux GHA + Axis 3 fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP counts are EXACT MATCH
  4. `v1.10-MILESTONE-AUDIT.md` and `v1.10-DEFERRED-CLEANUP.md` are authored; 4-doc traceability closure (PROJECT.md / ROADMAP.md / STATE.md / REQUIREMENTS.md) flips all 17 requirements to Validated

**Plans**: 4 plans
Plans:
**Wave 1**

- [x] 88-01: Pin V19 (v1.9 close-gate SHA) in `_lib/frozen-at-close.mjs`; author Atom 1 (3-file indivisible commit)

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 88-02: Author `check-phase-83..88.mjs` validators + Atom 2 (indivisible commit: validators + CI workflow + frozen-at-close V19 entry)

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 88-03: 3-axis terminal re-audit (Axis 1 fresh-clone + Axis 2 Linux GHA + Axis 3 fresh sub-agent); document cross-OS EXACT MATCH

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 88-04: Close-gate commit — `v1.10-MILESTONE-AUDIT.md` + `v1.10-DEFERRED-CLEANUP.md` + 4-doc traceability closure (17/17 Validated)

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 83. Kerberos SSO Extension Guide | 3/3 | Complete    | 2026-06-23 |
| 84. Graph API Doc + NUAL Key Table | 2/2 | Complete    | 2026-06-23 |
| 85. Capability Matrix + L2 Runbooks | 3/3 | Complete    | 2026-06-23 |
| 86. Chain Health Pass | 2/2 | Complete    | 2026-06-24 |
| 87. Navigation Hub Integration | 2/2 | Complete    | 2026-06-24 |
| 88. Harness Lineage Bump + Terminal Re-Audit + Milestone Close | 1/4 | In Progress|  |
