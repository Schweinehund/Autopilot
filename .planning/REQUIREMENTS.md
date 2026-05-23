# Requirements: v1.6 Apple Business Delegated Governance & Multi-Org Operations

**Defined:** 2026-05-20
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Intune without escalating to engineering — and now, internal organizations can manage their own Apple device pools (VPP catalogs, shared iPad passcode resets, device releases, MDM server assignments, account provisioning, device transfers, audit access, shared iPad / Apple TV lifecycle) without escalating to a central tenant admin

## v1.6 Requirements (Active)

Requirements for v1.6 release. Each maps to one phase. Phases 62-66 continue from v1.5 close at Phase 61.

### Pillar 1 — Foundation & Rebrand

- [ ] **AB-01**: Admin can find Apple Business rebrand timing (2026-04-14 GA), terminology mappings (Locations→Organizational Units / OUs, privileges→permissions, Managed Apple ID→Managed Apple Account, VPP location token→content token), and v1.6 doc-corpus conventions in a single glossary file `_glossary-apple-business.md` with bidirectional reciprocity to legacy terms
- [ ] **AB-02**: Admin can identify which of the 4 top-level roles (Organization Administrator / IT Administrator / Marketing Administrator / Staff) and which of the 5 preset custom roles (People Manager / Content Manager / Device Enrollment Manager / Device API Manager / Brand Manager) apply to their delegation use case in a role-permission overview doc, including hard-bordered "Account Holder — DO NOT delegate" callout per OP-2
- [ ] **AB-03**: Admin can find the canonical per-permission catalog across in-scope subgroups (Basic Organization / Organization Access / API+OAuth / People / Devices / AppleCare / Apps & Books — out of scope: Brand-related subgroups) with Edit-without-View dependency table per OP-3
- [ ] **AB-04**: Admin can find an Organizational Units (OUs) concept doc explaining hierarchy rules (flat-by-default with optional sub-OUs; no published max-count), what scopes per OU (devices / content tokens / MDM servers / accounts / role assignments), and how OUs replaced legacy Locations
- [ ] **AB-05**: Apple Business rebrand statement appears at exactly 3 canonical sites (`docs/cross-platform/apple-business/00-overview.md`, `docs/admin-setup-macos/01-abm-configuration.md` intro, `docs/admin-setup-ios/02-abm-token.md` intro) per Q5(b) no-corpus-sweep contract; each statement contains "Apple Business Manager", "Apple Business", and "2026-04-14" tokens for C14 PASS
- [ ] **AB-06**: 4 existing platform glossaries¹ each gain one reciprocal banner line pointing to `_glossary-apple-business.md`; `_glossary-macos.md` gains one inline see-also at the ABM entry per v1.5 CLEAN-08 pattern

  ¹ `_glossary-macos.md` covers macOS + iOS/iPadOS per its line-9 header — single Apple glossary, not separate macOS/iOS files. Count corrected from "5" to "4" during Phase 62 execution per D-05.
- [ ] **AB-07**: L1 admin-directory lookup convention published (external directory or contact-card format) so L1 runbooks have a stable "which admin owns this device pool" lookup target per DA-8

### Pillar 2 — Multi-OU Architecture & Admin Setup

- [x] **OU-01**: Admin can use an OUs-vs-Custom-Roles decision matrix (`03-ous-vs-custom-roles.md`) to choose the right delegation topology (OUs only / custom roles only / combined) with "most-permissive wins" callout per OP-4
- [x] **OU-02**: Admin can author a custom role with a documented min-viable sub-org admin permission bundle (4-6 permissions) — Apple ships no canonical template; v1.6 ships this as a differentiator
- [x] **OU-03**: Admin can onboard a sub-org admin via a documented workflow (`05-sub-org-admin-onboarding.md`) including Managed Apple Account creation, role assignment, OU scoping, and paired offboarding section per OP-8; `#which-admin-owns-this-pool` anchor present for C16
- [x] **OU-04**: Admin can assign devices to MDM servers per OU with documented "DENY-by-default on Manage MDM Servers privilege" guidance per OP-1 whitelist-first
- [x] **OU-05**: Admin can consolidate VPP content tokens per OU with hard-bordered "DO NOT TOUCH the new OU until full migration completes" callout per OP-9 untouched-OU trap
- [x] **OU-06**: Admin can provision Managed Apple Accounts via manual + SCIM + OIDC+JIT with a documented decision matrix
- [x] **OU-07**: Admin can manage Shared iPad lifecycle (`09-shared-ipad-lifecycle.md`) including sessions, user provisioning, and Find My disable per OP-12 under multi-OU per the Apple Business surface
- [x] **OU-08**: Admin can manage Apple TV lifecycle (`10-apple-tv-lifecycle.md`) including Configurator-only retail-purchase path, OU assignment, content-token-based app deployment, and shared-physical-space heuristic for Conference Room Display mode per OP-15
- [x] **OU-09**: 3 new rows added to `docs/reference/ios-capability-matrix.md` under existing Enrollment H2 (Apple TV management / Shared iPad sessions / Apple Business delegation surface); pre-edit anchor inventory artifact mandatory per DA-4
- [x] **OU-10**: `docs/reference/macos-capability-matrix.md` and `docs/reference/4-platform-capability-comparison.md` remain UNCHANGED — preserves C12 240-cell math and D-13/D-18 sibling-anchor-pin contract per D-A3

### Pillar 3 — Delegation Runbooks

- [x] **DELEG-01**: Admin can manage VPP catalog per OU via runbook `11-vpp-catalog-runbook.md` (claim + transfer + buy + payment-scoping) including untouched-OU OP-9 hard-bordered callout and post-migration license-count verification within 0.1%
- [x] **DELEG-02**: Admin can reset shared iPad passcode via 3-path decision matrix (Apple Business UI Path A primary L1-delegated / MDM ClearPasscode Path B L2-only / MDM EraseDevice Path C L2-with-approval) — canonical admin-context doc `12-shared-ipad-passcode-reset.md` that L1 #34 cross-links to per C16 gate
- [x] **DELEG-03**: Admin can release a device from Apple Business via runbook `13-device-release-runbook.md` with explicit "release ≠ removal" semantics per OP-6 soft-delete and 30-day provisional-period callout
- [x] **DELEG-04**: Admin can transfer a device cross-OU via runbook `14-device-transfer-runbook.md` with 4-cell impact matrix (VPP license / enrollment profile / Intune config profile / audit entry) and pre-transfer dependency checklist per OP-5
- [x] **DELEG-05**: Admin can reassign MDM server via single runbook `15-mdm-server-reassign-runbook.md` with OS-version eligibility matrix (iOS 26 / iPadOS 26 / macOS 26 / tvOS 26+ → in-place migration; legacy → factory erase) + 2 sub-H2s consolidating FEATURES Workflow 5.3 split per CI-5 anti-proliferation
- [x] **DELEG-06**: Admin can provision Managed Apple Accounts via runbook `16-managed-apple-account-runbook.md` covering manual + SCIM + OIDC+JIT including 60-day federation collision resolution sub-section per OP-7 and SCIM token renewal cadence
- [x] **DELEG-07**: Admin can scope audit log access per OU via runbook `17-audit-log-scoping-runbook.md` including author-scope vs target-scope semantics per OP-14, SIEM export pattern per OP-13, and "no public REST API" anti-feature documentation
- [x] **DELEG-08**: Cross-Org-Boundary Cheat Sheet `18-cross-org-boundary-cheat-sheet.md` shipped with Apple-Business-vs-Intune-vs-integration disambiguation table; harbors C15 anti-pattern allowlist exemptions in HTML comments

### Pillar 4 — L1 / L2 + Common-Issues + Hub Navigation (Navigation-Last)

- [x] **ABNAV-01**: L1 staff can use runbook `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` including "which admin owns this pool" lookup step + 3-path decision matrix with destructive paths gated by L2 approval per OP-11 prevention; `platform: ios+macos+shared-ipad` compound frontmatter; L1 #00-index appended
- [x] **ABNAV-02**: L2 engineering can use runbook `docs/l2-runbooks/26-apple-business-permission-denied.md` with 7-leaf Mermaid decision tree per DA-9 decomposing Apple's generic permission error (role-lacks-permission / OU-boundary / Apple-Business-scope / Intune-scope / federation-state / quota-limit / Account-Holder-lockout); L2 #00-index appended
- [x] **ABNAV-03**: Cross-platform symptom-to-runbook routing for Apple Business governance failure modes added to `docs/common-issues.md` under new `## Apple Business Governance Failure Scenarios` H2 (append-only)
- [x] **ABNAV-04**: L1 quick-ref card `docs/quick-ref-l1.md` has new `## Apple Business Quick Reference` H2 section (append-only)
- [x] **ABNAV-05**: L2 quick-ref card `docs/quick-ref-l2.md` has new `## Apple Business Quick Reference` H2 section (append-only)
- [x] **ABNAV-06**: `docs/operations/00-index.md` has Apple Business as 5th sub-section alongside Co-Management / Patch / App / Drift (append-only)
- [x] **ABNAV-07**: `docs/index.md` has Apple Business as 5th sub-section under `## Operations` H2 + Cross-Platform References entries + platform-coverage banner clause appendix at line 9 (surgical edits)

### Pillar 5 — Validation Tooling

- [ ] **AUDIT-09**: `scripts/validation/v1.6-milestone-audit.mjs` ships as Path-A copy from `v1.5-milestone-audit.mjs` with C1-C13 preserved (lineage from v1.4.1 → v1.5 → v1.6)
- [ ] **AUDIT-10**: C14 (rebrand-statement presence at 3 canonical sites) lands blocking from Phase 62; harness fails if any of 3 sites missing the required tokens
- [ ] **AUDIT-11**: C15 (Intune-delegation anti-pattern guard) lands blocking from Phase 62; harness fails if v1.6 docs contain banned phrases from Intune-side delegation deny-list (8-regex list); allowlist exemptions live in `18-cross-org-boundary-cheat-sheet.md` HTML comments
- [ ] **AUDIT-12**: C16 (L1 #34 cross-link integrity triangle) lands blocking from Phase 62; harness fails if any of the 4 edges break (L1 #34 ↔ admin doc `12-shared-ipad-passcode-reset.md` ↔ `common-issues.md` ↔ `quick-ref-l1.md`)
- [ ] **AUDIT-13**: Per-phase validators `check-phase-62.mjs..check-phase-66.mjs` ship as deliverables (validator-as-deliverable pattern from v1.3+); CI workflow `audit-harness-v1.6-integrity.yml` Path-A from v1.5
- [ ] **AUDIT-14**: BASELINE_10 refreshes in atomic harness commit (closes BASELINE_9 v1.5 carry-over); new sidecar category `c13_rotting_external` added with quarterly audit job; `scripts/validation/v1.6-audit-allowlist.json` migrated co-located with harness
- [ ] **AUDIT-15**: Terminal re-audit at Phase 66 from fresh worktree per v1.5 D-22 auditor-independence precedent exits 0; `.planning/milestones/v1.6-MILESTONE-AUDIT.md` authored confirming all checks PASS; `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` finalized with CI-1/CI-2/CI-3 rotting-reference candidates for v1.7+

## v1.7+ Requirements (Deferred)

Deferred to future release. Tracked but not in v1.6 roadmap.

### Rotting-reference corpus sweep

- **CI-1**: Apple Business Manager rotting URL references (~30 sites across `admin-setup-ios/*` + `admin-setup-macos/*` + `_glossary-macos.md`) — quarterly audit via `c13_rotting_external` sidecar; surgical sweep when Apple drops legacy URL support or v1.7 scope explicitly includes corpus sweep
- **CI-2**: VPP location token rotting references at 2 specific lines (`admin-setup-ios/05-app-deployment.md:201`, `admin-setup-macos/04-app-deployment.md:148`) — surgical rename deferred
- **CI-3**: Managed Apple ID rotting references pervasive corpus-wide — corpus-wide rename deferred contingent on Microsoft Intune adopting the rebrand

### Additional Apple Business surface (v1.7+)

- Multi-tenant Apple Business (separate accounts) workflows — Q2 explicit scope-out
- Apple Business Device API public surface documentation — Apple has not yet published developer.apple.com landing
- ASM (Apple School Manager) education-specific surfaces — outside enterprise scope
- Apple TV Conference Room Display mode delegation deep-dive — Apple deployment guides thin on per-OU partitioning

## Out of Scope

Explicitly excluded from v1.6. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Intune-side RBAC, profile authoring, compliance, enrollment profile assignment | MDM concern; covered by existing v1.0–v1.5 docs and out-of-scope per milestone definition (Q3 confirmation) |
| Multiple separate Apple Business accounts (inter-tenant patterns) | Q2 explicit scope-out; v1.6 covers one Apple Business account with Locations (Q2 b) and/or custom roles (Q2 c) |
| Corpus-wide ABM→Apple Business rename of existing v1.0–v1.5 docs | Q5(b) explicit no-corpus-sweep contract; rebrand handling restricted to glossary + 2 intro callouts |
| Apple TV AirPlay restrictions / Single App Mode configuration | MDM-side (Intune Configuration Profiles), not Apple Business — out of scope per Apple Business surface boundary |
| Shared iPad passcode reset via MDM ClearPasscode / EraseDevice as L1 primary path | L1 #34 documents Path A (Apple Business UI) primary; Paths B/C documented in L2 #26 with hard L2-approval gate per OP-11 prevention |
| Apple School Manager (ASM) education-specific surfaces | Outside enterprise scope; ASM SIS integration / class-based device assignment defer to v1.7+ |
| ChromeOS / non-Apple identity cross-references | Different management platform; v1.6 stays inside Apple Business surface |
| Cleanup sweep of existing "VPP location token" / "Managed Apple ID" / legacy ABM URL references | Tracked as CI-2 / CI-3 / CI-1 in v1.7+ Deferred section; quarterly audit via new sidecar category |

## Traceability

Which phases cover which requirements. Populated by `/gsd-roadmapper` during ROADMAP.md creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AB-01 | Phase 62 | Pending |
| AB-02 | Phase 62 | Pending |
| AB-03 | Phase 62 | Pending |
| AB-04 | Phase 62 | Pending |
| AB-05 | Phase 62 | Pending |
| AB-06 | Phase 62 | Pending |
| AB-07 | Phase 62 | Pending |
| OU-01 | Phase 63 | Complete |
| OU-02 | Phase 63 | Complete |
| OU-03 | Phase 63 | Complete |
| OU-04 | Phase 63 | Complete |
| OU-05 | Phase 63 | Complete |
| OU-06 | Phase 63 | Complete |
| OU-07 | Phase 63 | Complete |
| OU-08 | Phase 63 | Complete |
| OU-09 | Phase 63 | Complete |
| OU-10 | Phase 63 | Complete |
| DELEG-01 | Phase 64 | Complete |
| DELEG-02 | Phase 64 | Complete |
| DELEG-03 | Phase 64 | Complete |
| DELEG-04 | Phase 64 | Complete |
| DELEG-05 | Phase 64 | Complete |
| DELEG-06 | Phase 64 | Complete |
| DELEG-07 | Phase 64 | Complete |
| DELEG-08 | Phase 64 | Complete |
| ABNAV-01 | Phase 65 | Complete |
| ABNAV-02 | Phase 65 | Complete |
| ABNAV-03 | Phase 65 | Complete |
| ABNAV-04 | Phase 65 | Complete |
| ABNAV-05 | Phase 65 | Complete |
| ABNAV-06 | Phase 65 | Complete |
| ABNAV-07 | Phase 65 | Complete |
| AUDIT-09 | Phase 62 | Pending |
| AUDIT-10 | Phase 62 | Pending |
| AUDIT-11 | Phase 62 | Pending |
| AUDIT-12 | Phase 62 | Pending |
| AUDIT-13 | Phase 62 | Pending |
| AUDIT-14 | Phase 66 | Pending |
| AUDIT-15 | Phase 66 | Pending |

**Coverage:**
- v1.6 requirements: 39 total
- Mapped to phases: 39 (100% coverage)
- Unmapped: 0 ✓
- Phase distribution: Phase 62 = 12 reqs (AB-01..07 + AUDIT-09..13); Phase 63 = 10 reqs (OU-01..10); Phase 64 = 8 reqs (DELEG-01..08); Phase 65 = 7 reqs (ABNAV-01..07); Phase 66 = 2 reqs (AUDIT-14, AUDIT-15)

**Rationale for Phase 62 absorbing AUDIT-09..13 (5 reqs) alongside the 7 Foundation reqs:** D-A9 mandates that C14/C15/C16 land blocking-from-start so the harness rejects bad content from Phase 1. The audit harness Path-A copy + C14/C15/C16 + per-phase validator scaffolds + CI workflow must all exist by Phase 62 close in a single atomic harness commit (v1.5 Plan 60-08 precedent). AUDIT-14 (BASELINE_10 refresh closing BASELINE_9 carry-over) and AUDIT-15 (terminal re-audit from fresh worktree) are inherently milestone-close concerns that route to Phase 66 per v1.5 Phase 60 + 61 precedent.

---
*Requirements defined: 2026-05-20*
*Last updated: 2026-05-20 — Traceability populated by /gsd-roadmapper; 39/39 requirements mapped across 5 phases (62-66); 100% coverage validated; no orphans, no duplicates*
