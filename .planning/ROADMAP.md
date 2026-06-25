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
- 🚧 **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (in progress)

## Phases

<details>
<summary>✅ v1.0–v1.10 (Phases 1-88) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** (Phases 83-88) — SHIPPED 2026-06-24 — `.planning/milestones/v1.10-ROADMAP.md`
- ✅ v1.0–v1.9 (Phases 1-82) — see milestone entries and `.planning/milestones/`

</details>

---

### 🚧 v1.11 macOS PSSO End-to-End Provisioning & MDM Migration (In Progress — started 2026-06-24)

**Milestone Goal:** Give Intune/L1/L2 teams two consolidated, operator-followable macOS scenario guides — (1) deploying a Mac from enrollment profile to a fully PSSO-registered end user, and (2) migrating Macs from Kandji/Iru into Intune with PSSO — so the full device journey no longer requires hopping between guides 00/02/07.

- [x] **Phase 89: PSSO Provisioning Walkthrough** — New `01-psso-provisioning-walkthrough.md` covering both delivery paths (standard post-enrollment + ADE-during-Setup-Assistant macOS 26+), path-divergence selector, `app-sso platform -s` verification gates, cross-links to guides 00/02/07 and L1 #35/#36 + L2 #27, and reciprocal See Also edits to guides 00/02/07 (completed 2026-06-24)
- [x] **Phase 90: MDM Migration Walkthrough + L2 Runbook #30** — New `02-mdm-migration-psso.md` (ABM "Assign Device Management" + Deadline OS-26 in-place path + pre-macOS-26 fallback + mandatory PSSO re-registration) + new `30-macos-mdm-migration-failure.md` L2 runbook + `l2-runbooks/00-index.md` extension (completed 2026-06-24)
- [x] **Phase 91: Glossary + Capability Matrix** — Glossary terms (MDM Migration / Assign Device Management / Deadline / Kandji→Iru rebrand), `macos-capability-matrix.md` migration row (atomic V-63-08 hash update), `4-platform-capability-comparison.md` macOS migration cells (completed 2026-06-25)
- [ ] **Phase 92: Navigation Hub Integration** — Navigation-last integration into `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, and `docs/decision-trees/06-macos-triage.md`
- [ ] **Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close** — Path-A 9th lineage bump (Atom 1 + Atom 2), `frozen-at-close.mjs` V110 pin, 3-axis terminal re-audit, `v1.11-MILESTONE-AUDIT.md` + close-gate

## Phase Details

### Phase 89: PSSO Provisioning Walkthrough

**Goal**: An operator can follow a single consolidated walkthrough from enrollment profile to PSSO-registered end user, covering both the standard post-enrollment path and the ADE-during-Setup-Assistant zero-click path (macOS 26+), without needing to assemble steps from guides 00/02/07
**Depends on**: Nothing (first content phase of v1.11)
**Requirements**: PROV-01, PROV-02, PROV-03, PROV-04
**Success Criteria** (what must be TRUE):

  1. `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` exists with a path-divergence selector/table at the top, standard post-enrollment stages (enrollment profile → assignment → delivery → Setup Assistant → desktop → "Registration Required" → user PSSO registration → verify), and the "user-affinity-only" scope callout (userless devices never register)
  2. The walkthrough documents the ADE-during-Setup-Assistant zero-click path (macOS 26+ hard gate) including Company Portal 5.2604.0 LOB floor (not VPP), `EnableRegistrationDuringSetup`, the three-policy same-Assigned-static-user-group rule, SmartCard exclusion, and wipe-only misconfiguration recovery, all in a clearly delimited macOS-26-gated section with `last_verified` / `review_by` stamps
  3. `app-sso platform -s` → `Device Registration: REGISTERED` / `User Registration: REGISTERED` verification gates appear at each applicable stage; cross-links go link-not-copy to guides `00-ade-lifecycle`, `02-enrollment-profile`, and `07-platform-sso-setup` (no content duplicated inline)
  4. Cross-links to L1 #35/#36 and L2 #27 are placed at the PSSO registration stage for failure escalation (no inline triage in the walkthrough itself)
  5. Reciprocal "See Also" entries pointing to `01-psso-provisioning-walkthrough.md` are appended to guides `00-ade-lifecycle.md`, `02-enrollment-profile.md`, and `07-platform-sso-setup.md` (content-phase edits; nav-hub files are NOT touched in this phase)**Plans**: 2 plans

**Wave 1**

- [x] 89-01-PLAN.md — Author new `01-psso-provisioning-walkthrough.md` (selector-first opening, A1+A2 shared spine, hybrid anatomy, `app-sso platform -s` gates, A2 macOS-26 divergence callout, sibling footers)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 89-02-PLAN.md — Reciprocal See Also entries into guides 00/07/02 (each matching its own house style)

**UI hint**: no

### Phase 90: MDM Migration Walkthrough + L2 Runbook #30

**Goal**: An operator can follow a single consolidated walkthrough to migrate Macs from Kandji/Iru to Intune with PSSO, covering both the macOS-26-in-place path and the pre-26 fallback, and an L2 engineer has a structured investigation runbook for migration-specific failures
**Depends on**: Phase 89
**Requirements**: MIG-01, MIG-02, MIG-03, MIG-04, RUN-01
**Success Criteria** (what must be TRUE):

  1. `docs/macos-lifecycle/02-mdm-migration-psso.md` exists with an OS≥26-vs-OS<26 path selector at the top, a pre-migration readiness checklist (OS gate inventory, ADE token, PSSO policy, VPP/location-token sequencing, sync timing), and the ABM "Assign Device Management" + Deadline workflow (1–90 day range, notification cadence, non-dismissible deadline enforcement) for the macOS-26 in-place path
  2. The migration walkthrough documents the pre-macOS-26 fallback (retire/wipe/re-enroll), explicitly states that `profiles renew` is NOT a no-wipe shortcut for ADE-enrolled devices, and includes the Kandji/Iru source-side steps (FileVault key / Activation Lock bypass secret retrieval BEFORE deletion, Delete Device Record, ~15-min agent auto-removal) with both "Kandji" and "Iru" names surfaced
  3. The walkthrough documents mandatory post-migration PSSO re-registration as a required step (Apple authoritative: MDM unenrollment = IdP unregistration; Secure Enclave key re-created against the new tenant; ACME cert reissued); includes `app-sso platform -s` verification gate; bidirectionally cross-links `01-psso-provisioning-walkthrough.md` at the PSSO-registration handoff junction
  4. `docs/l2-runbooks/30-macos-mdm-migration-failure.md` exists with three failure tracks (deadline lockout + ABM admin recovery, profile-not-delivered / enrollment-failed with leftover source-MDM agent diagnostic, PSSO re-registration stuck); log collection prerequisite cross-links L2 #10
  5. `docs/l2-runbooks/00-index.md` is extended with a row for L2 #30 in the macOS ADE Runbooks table (internal hub edit, content-phase; top-level nav hubs are NOT touched in this phase); reciprocal See Also appended to `27-macos-sso-investigation.md`

**Plans**: 3 plans

**Wave 1**

- [x] 90-01-PLAN.md — Author `02-mdm-migration-psso.md` (selector-first opening, shared OS-gate + Kandji/Iru secret-retrieval pre-flight, B1 9-stage in-place track + Stage 9 PSSO re-registration delta + app-sso gate, B2 wipe fork, footers) (MIG-01..04)
- [x] 90-02-PLAN.md — Author `30-macos-mdm-migration-failure.md` L2 runbook (Context preamble + Track A deadline lockout / Track B profile-not-delivered / Track C PSSO re-registration stuck link-not-copy to #27; L2 #10 prereq) (RUN-01)

**Wave 2** *(blocked on Wave 1 — navigation-last)*

- [x] 90-03-PLAN.md — Internal-hub + reciprocal cross-links: `00-index.md` #30 row, `27` reciprocal See Also, `01`→`02` back-link completing the bidirectional MIG-04 junction (RUN-01, MIG-04)

**UI hint**: no

### Phase 91: Glossary + Capability Matrix

**Goal**: The macOS glossary captures the new MDM-migration terminology, the capability matrix documents in-place migration coverage, and all harness blob-hash coupling constraints are satisfied atomically
**Depends on**: Phase 90
**Requirements**: REF-01, REF-02
**Success Criteria** (what must be TRUE):

  1. `docs/_glossary-macos.md` contains entries for **MDM Migration**, **Assign Device Management**, and **Deadline** (with lockout behavior), plus a **Kandji→Iru rebrand** note (October 2025, support portal URL unchanged); reciprocal `_glossary.md` see-also updated
  2. A pre-edit anchor inventory artifact for `docs/reference/macos-capability-matrix.md` is committed before any matrix edits, recording all existing `## ` headings and anchor IDs (Phase 85 Plan 85-01 precedent)
  3. `docs/reference/macos-capability-matrix.md` contains an MDM-migration coverage row (in-place migration macOS 26+ via ABM "Assign Device Management" + Deadline, pre-26 retire/wipe-and-re-enroll fallback, PSSO re-registration required post-migration); the `check-phase-63.mjs` V-63-08 blob hash (`73f16378197223378a8507a6751c763902de58db` baseline — verify on authoring day) is updated in the SAME ATOMIC COMMIT as the matrix edit
  4. `docs/reference/4-platform-capability-comparison.md` macOS migration cells are updated link-not-copy (pointing to the new matrix row); the equivalent blob-hash update for this file is committed atomically with its edit

**Plans**: 3 plans
Plans:
**Wave 1**

- [x] 91-01-PLAN.md — REF-01: mint 9 glossary entries (all dead inbound anchors) + reciprocal _glossary.md see-also
- [x] 91-02-PLAN.md — REF-02: pre-edit anchor-inventory artifact for both pinned matrix files (committed first)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 91-03-PLAN.md — REF-02: atomic matrix + 4-platform migration rows + V-63-08/09 BASELINE pins (single commit)

**UI hint**: no

### Phase 92: Navigation Hub Integration

**Goal**: All new v1.11 content (two scenario docs + L2 #30) is reachable from every applicable navigation hub, and the navigation-last invariant is fully satisfied — no nav-hub link is committed until the content file it references is confirmed committed
**Depends on**: Phase 91
**Requirements**: NAV-01
**Success Criteria** (what must be TRUE):

  1. `docs/index.md` includes rows for `01-psso-provisioning-walkthrough.md` and `02-mdm-migration-psso.md` in the macOS Lifecycle/Provisioning section (accessible to both L1 Service Desk and L2 Desktop Engineering roles) and a row for L2 #30 in the Desktop Engineering L2 table; all referenced files are confirmed to exist in the repository before any nav-hub commit
  2. `docs/common-issues.md` macOS section includes a MDM migration failure entry routing to L2 #30 and a PSSO re-registration failure during migration entry cross-linking to L2 #27 and L2 #30
  3. `docs/quick-ref-l2.md` macOS section includes relevant migration diagnostic commands documented in L2 #30 (e.g., `app-sso platform -s`, `profiles status -type enrollment`)
  4. `docs/decision-trees/06-macos-triage.md` includes a migration failure leaf node routing to L2 #30

**Plans**: TBD
**UI hint**: no

### Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close

**Goal**: The v1.11 audit harness ships as the 9th Path-A milestone harness (Atom 1 + Atom 2 two-atomic-commit pattern), the 3-axis terminal re-audit confirms cross-OS EXACT MATCH, and the milestone is formally closed with all predecessor frozen surfaces byte-unchanged
**Depends on**: Phase 92
**Requirements**: HARN-01, HARN-02, HARN-03
**Success Criteria** (what must be TRUE):

  1. Atom 1 ships as one indivisible commit: `v1.11-milestone-audit.mjs` (Path-A from v1.10, C1-C16 inherited) + `v1.11-audit-allowlist.json` + BASELINE_15 freshness comment in `regenerate-supervision-pins.mjs`
  2. Atom 2 ships as one indivisible commit: `check-phase-89..93.mjs` (per-phase validators) + `_lib/frozen-at-close.mjs` V110 entry (v1.10 close-gate SHA `a3617e9` — confirm on authoring day) + `audit-harness-v1.11-integrity.yml` as the 8th parallel CI coexistence workflow (predecessors v1.4–v1.10 byte-unchanged)
  3. 3-axis terminal re-audit completes: Axis 1 fresh `git clone --no-hardlinks` local + Axis 2 cross-OS Linux GHA + Axis 3 fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP counts are EXACT MATCH
  4. `v1.11-MILESTONE-AUDIT.md` and `v1.11-DEFERRED-CLEANUP.md` are authored; 4-doc traceability closure (PROJECT.md / ROADMAP.md / STATE.md / REQUIREMENTS.md) flips all 15 requirements to Validated

**Plans**: TBD
**UI hint**: no

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 89. PSSO Provisioning Walkthrough | 2/2 | Complete    | 2026-06-24 |
| 90. MDM Migration Walkthrough + L2 Runbook #30 | 3/3 | Complete   | 2026-06-24 |
| 91. Glossary + Capability Matrix | 3/3 | Complete    | 2026-06-25 |
| 92. Navigation Hub Integration | 0/TBD | Not started | - |
| 93. Harness Lineage Bump + Terminal Re-Audit + Milestone Close | 0/TBD | Not started | - |
