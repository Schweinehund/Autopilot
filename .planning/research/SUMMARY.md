# Project Research Summary

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite — v1.6 Apple Business Delegated Governance & Multi-Org Operations
**Domain:** Apple Business (formerly Apple Business Manager) delegated permission surface — markdown documentation tier (Intune-side RBAC out of scope)
**Researched:** 2026-05-20
**Confidence:** HIGH overall

## Executive Summary

v1.6 documents Apple's 2026-04-14 rebrand of **Apple Business Manager → Apple Business**, which concurrently retired the legacy 5-role triad in name (replaced by Organization Administrator / IT Administrator / Marketing Administrator / Staff plus 5 preset custom roles), renamed **Locations → Organizational Units (OUs)**, renamed **privileges → permissions**, and earlier (2024) renamed **Managed Apple ID → Managed Apple Account**. The portal URL `business.apple.com` is preserved; the User Guide migrates from `/guide/apple-business-manager/` to `/guide/business/` with article IDs stable across both paths. **Microsoft Intune has not yet renamed its in-portal label "Apple VPP tokens"** as of the 2026-04-30 tutorial refresh — v1.6 must preserve Intune's current verbatim labels while using Apple's new terminology for Apple-side surfaces. This terminology fork is the central authoring discipline of the milestone.

The recommended architecture is a **new `docs/cross-platform/apple-business/` tree** (analogous to v1.5's `docs/operations/` pattern — a peer-of-platforms, not a 6th platform directory) housing foundation + multi-OU architecture + delegation runbooks + Apple TV / Shared iPad lifecycle, with **surgical edits at exactly 3 canonical rebrand-callout sites** (Q5(b) no-corpus-sweep contract). A new `_glossary-apple-business.md` (6th glossary node) holds delegation-specific terms with single-line reciprocal see-also entries added to the 5 existing glossaries via the proven v1.5 CLEAN-08 pattern. The 240-cell 5-platform comparison matrix is **deliberately preserved unchanged** — Apple Business delegation is not a device-capability axis comparable to Enrollment/Configuration/etc., so adding a 7th H2 would cascade D-13/D-18 sibling-matrix reciprocity through 4 sibling matrices and break C12 validator math without commensurate value.

Key risks cluster around five themes: (1) **Account Holder lockout** — only role that can re-accept Apple T&Cs and manage federation root, structurally locks org out if transferred to personal Apple ID or departed employee; (2) **VPP content-token migration "untouched OU" data loss** — Apple's tool transfers ALL licenses ONLY while destination OU is untouched, silently degrades on first test purchase; (3) **Shared iPad 3-path passcode reset data loss** — Intune Reset/Remove Passcode actions affect device-level NOT per-user partition, leading L1 to use destructive EraseDevice when non-destructive Apple Business UI path was correct; (4) **Microsoft↔Apple terminology lag** ("Apple VPP tokens" in Intune vs "content tokens" in Apple Business); (5) **Federation collision** — personal Apple ID on corp email collides with Managed Apple Account federation; Apple's 60-day rename window is sent to personal mailbox and frequently missed. The Pillar 3 delegation runbooks are the value prop; the audit harness C14-C16 blocking-from-start checks are the structural enforcement.

## Key Findings

### Recommended Stack

v1.6 is a markdown documentation milestone (no executable stack). "Stack" here means the canonical Apple-side surfaces and Intune-side surfaces that v1.6 docs MUST cite accurately. Apple-side surfaces use Apple's new 2026 terminology; Intune-side surfaces preserve Microsoft's current verbatim labels. See [STACK.md](STACK.md) for complete URL list, article IDs, and confidence per finding.

**Core surfaces (Apple-side — use new 2026 terminology):**
- Apple Business portal `business.apple.com` (URL unchanged across rebrand) — primary admin surface
- Apple Business User Guide `support.apple.com/guide/business/` (legacy `/guide/apple-business-manager/` still resolves; same article IDs at both paths)
- Apple Newsroom rebrand announcement (2026-03-24 announcement, **2026-04-14 GA** = canonical glossary callout date)
- Apple Support transition banner article `axmd79d79dea`
- Apple Deployment Guides for Entra federation (`depa85a35cf2`), Apple TV (`dep027e1d5a0`), Shared iPad (`dep6fa9dd532`), OS 26+ in-place migration (`dep4acb2aa44`)

**Core surfaces (Intune-side — preserve verbatim labels):**
- `Tenant administration > Connectors and tokens > Apple VPP tokens` — label UNCHANGED in Intune despite Apple renaming to "content token"
- `Devices > Enrollment > Apple > Enrollment program tokens` (ADE token surface) — unchanged
- `Devices > Enrollment > Apple > MDM Push Certificate` — unchanged
- Microsoft Learn ADE tutorial refreshed 2026-04-30 (uses "Apple Business" in prose but retains "Apple VPP tokens" UI label)
- Microsoft Enterprise SSO plug-in for Apple devices GA 2025-11-04

**Terminology canon (reconciles inter-researcher drift):**
- **OU vs Locations:** v1.6 docs use **"Organizational Unit (OU) (formerly Location)"** on first mention per H2, then "OU" thereafter (mirrors v1.5 Linux first-mention convention); decision-matrix file = `03-ous-vs-custom-roles.md`
- **Content token model:** **per-OU, NOT consolidated** (FEATURES + STACK agree). Compound phrasing "content token (Apple VPP token in Intune)" on first mention per section
- **Managed Apple Account:** v1.6 new docs use new term; existing v1.0-v1.5 "Managed Apple ID" references untouched per Q5(b); glossary bidirectional reciprocity

### Expected Features

See [FEATURES.md](FEATURES.md) for full 8-category workflow landscape with classifications, dependencies, cross-platform applicability, and audience reach per workflow.

**Must have (table stakes — MUST land in v1.6):**

- **Custom Role Authoring Guide** with **Min-Viable Sub-Org Admin Bundle Template** (Apple doesn't publish; v1.6 ships canonical 4-6 permission recipe)
- **Multi-OU Architecture Guide** with hard prerequisites for OU deletion + cross-OU device transfer impact
- **VPP Content Token Consolidation Runbook** with **hard-bordered untouched-OU OP-9 callout**
- **Shared iPad Passcode Reset Runbook — Path A (Apple Business UI)** with L1-delegated workflow + 3-path decision matrix
- **Device Release Runbook** (release ≠ removal — soft-delete semantics)
- **Device Transfer (cross-OU) Runbook** with 4-cell impact matrix
- **MDM Server Reassign Runbook** — **single runbook with OS-version eligibility matrix** + sub-H2 A legacy erase + sub-H2 B OS 26+ in-place migration (reconciles FEATURES Workflow 5.3 split into one doc per CI-5 anti-proliferation)
- **Managed Apple Account Provisioning Runbook** (manual + SCIM + OIDC+JIT decision matrix)
- **Audit Log Scoping Runbook** (UI download-only; no public REST API)
- **Apple TV Multi-Org Provisioning Runbook**
- **Sub-Org Admin Onboarding Runbook** with paired offboarding section
- **Cross-Org-Boundary Cheat Sheet** ("Apple Business owns vs Intune owns" disambiguation)

**Should have (competitive differentiators):**

- **OS-26+ In-Place Migration runbook coverage** — newest path; preserves user data
- **3-canonical-site rebrand-callout discipline** (alternative to corpus-wide ABM→Apple Business sweep)
- **L1 "which admin owns this device pool" lookup convention** — Apple Business has no native query
- **L2 7-leaf permission-denied decision tree** — decomposes Apple's generic permission error
- **Audit harness C14/C15/C16 blocking-from-start** — first milestone shipping all new checks blocking from Phase 1

**Anti-features (LOOK like they should exist but don't — must be documented as warnings):**

1. **Intune "Reset Passcode" / "Remove Passcode" on Shared iPad per-user partition** — highest-stakes anti-feature; both Intune actions affect DEVICE-level passcode (rarely set on managed Shared iPad), NOT per-user Shared iPad partition passcode. Per-user reset ONLY via Apple Business UI Path A or factory wipe. Drives the L2 permission-denied diagnostic.
2. **Single global content token / consolidated catalog post-2024** — reality is still per-OU
3. **Device move between OUs preserving VPP licenses** — license transfer is separate workflow, unassigned-only prerequisite
4. **Audit log public REST API** — UI-only download (CSV)
5. **OS 26 in-place migration on mixed-OS fleets** — only iOS 26 / iPadOS 26 / macOS 26 / tvOS 26+ eligible
6. **OU deletion without prerequisites** — accounts + licenses + devices + role scopes all moved first; no archive state
7. **SCIM-from-Entra OU override on manual roaming** — SCIM mapping overwrites manual moves on next sync
8. **"Reset Shared iPad Passcode" changing federated Entra password** — separate credentials
9. **Release-then-readd round-trip preserving status** — Configurator re-add triggers 30-day provisional period
10. **Custom role privilege change isolated to one user** — change affects EVERY user holding that role across EVERY OU

**Defer to v1.7+:**

- Multi-tenant Apple Business (separate accounts) workflows — Q2 explicit scope-out
- Apple Business Device API public surface (Apple hasn't published `developer.apple.com` landing yet)
- ASM (Apple School Manager) education-specific surfaces
- ChromeOS / non-Apple identity cross-references

### Architecture Approach

See [ARCHITECTURE.md](ARCHITECTURE.md) for 10 architectural decisions (D-A1..D-A10) with options taken / alternatives rejected / rejection rationale / inherited precedent / confidence per the quality_gate requirements.

**Major components (consolidated decisions):**

| # | Decision | Choice |
|---|----------|--------|
| **D-A1** | Directory placement | NEW `docs/cross-platform/apple-business/` tree (hybrid Option d — modeled on v1.5 `docs/operations/`); 2 surgical intro-callout edits at existing macOS / iOS ABM docs per Q5(b); NOT a 6th platform |
| **D-A2** | Glossary architecture | Split (Option c) — NEW `_glossary-apple-business.md` for delegation terms; existing Apple-platform terms stay in `_glossary-macos.md` with single see-also addition; 4 other glossaries gain 1 reciprocal banner line each |
| **D-A3** | Capability matrix changes | 3 incremental rows added to `ios-capability-matrix.md` under existing Enrollment H2 (Apple TV mgmt / Shared iPad sessions / Apple Business delegation); `macos-capability-matrix.md` UNCHANGED; **`4-platform-capability-comparison.md` UNCHANGED — no 7th H2** (preserves C12 240-cell math + D-13/D-18 sibling-anchor-pin contract) |
| **D-A4** | Hub navigation integration | Apple Business as 5th sub-section under existing `## Operations` H2 in `docs/index.md`, alongside Co-Management / Patch / App / Drift |
| **D-A5** | L1/L2 numbering + frontmatter | L1 #34 = first v1.6 runbook; L2 #26 = first v1.6 runbook; NEW compound-platform frontmatter `platform: ios+macos[+shared-ipad\|+apple-tv]` with `applies_to: governance`; NEW `+` separator parsing required in harness |
| **D-A6** | Quick-ref card placement | Append new top-level `## Apple Business Quick Reference` H2 to BOTH `quick-ref-l1.md` and `quick-ref-l2.md` |
| **D-A7** | Apple TV + Shared iPad doc surface | First-class admin workflows inside `cross-platform/apple-business/` tree as dedicated files `09-shared-ipad-lifecycle.md` + `10-apple-tv-lifecycle.md`; NOT new platform directories |
| **D-A8** | Cross-link contract | v1.6 NEW docs link OUT to existing docs freely (read-only); existing docs receive ZERO modifications EXCEPT 3 sanctioned canonical sites; smallest-footprint test = `git diff` shows 3 modified existing-doc files + 5 append-only hub edits + many new files |
| **D-A9** | Audit harness C14/C15/C16 | Path-A copy `v1.5-milestone-audit.mjs` → `v1.6-milestone-audit.mjs`; **C14** rebrand-statement at 3 canonical sites (BLOCKING); **C15** Intune-delegation anti-pattern guard via deny-list regex + allowlist exemption (BLOCKING); **C16** L1 #34 cross-link integrity triangle (BLOCKING). All blocking-from-start |
| **D-A10** | Phase build order | OUs before custom roles; custom roles before delegation runbooks; glossary before admin guides; admin guides before L1/L2; capability matrix rows before hub nav; navigation files LAST (v1.5 Phase 57+59 precedent); audit harness scaffolds at Phase 62 with C14-C16 functional from Phase 1 |

### Critical Pitfalls

See [PITFALLS.md](PITFALLS.md) for full 30-pitfall catalog (15 operational OP-1..OP-15 / 9 doc-authoring DA-1..DA-9 / 6 corpus-integrity CI-1..CI-6) with severity + warning sign + prevention strategy + addressing phase per pitfall.

**Top 7 highest-severity pitfalls (must be addressed in v1.6 content):**

1. **OP-2: Account Holder lockout (HIGH)** — only role that can re-accept Apple T&Cs, transfer Account Holder, manage federation root. Once transferred to personal Apple ID or departed employee, org structurally locked out; recovery requires Apple Enterprise Support paid ticket. **Prevention:** Phase 62 hard-bordered "DO NOT delegate" callout in role/privilege overview + every custom-role authoring runbook.

2. **OP-9: Untouched-OU VPP content-token migration trap (HIGH)** — Apple's migration tool transfers ALL licenses ONLY while destination OU is "untouched." First test purchase/assignment silently degrades to unassigned-only. Recovery HIGH cost. **Prevention:** Phase 64 VPP consolidation runbook with hard-bordered "DO NOT TOUCH the new OU until full migration completes" callout + post-migration license-count verification within 0.1%.

3. **OP-11: 3-path Shared iPad passcode reset data loss (HIGH)** — three paths (Apple Business UI / MDM ClearPasscode / MDM EraseDevice); time-pressured L1 picks destructive when non-destructive would suffice. **Prevention:** Phase 65 L1 runbook IS the canonical 3×3 decision matrix; ordering Apple Business UI FIRST → ClearPasscode SECOND → EraseDevice LAST with hard L2-approval gate; C16 enforces cross-link integrity.

4. **OP-7: Personal Apple ID federation collision (HIGH)** — user has personal Apple ID at corp email; Apple's 60-day rename window often missed (notification to personal mailbox). **Prevention:** Phase 64 federation runbook with 60-day collision-resolution sub-section + user-comms template; L1 federation-rejected runbook first-step verifies collision before MDM troubleshooting.

5. **OP-10 + DA-3 + CI-2 + CI-3: Intune-Apple Business terminology lag rotting references (MEDIUM-HIGH, compounding)** — Apple rebranded content tokens / OUs / Managed Apple Account; Intune retains "Apple VPP tokens" / "Locations" colloquially / "Managed Apple ID." Existing v1.0-v1.5 corpus becomes increasingly stale. Q5(b) explicitly leaves unchanged. **Prevention:** Phase 62 bidirectional reciprocal glossary entries; compound-phrasing convention; deferred-cleanup tracking artifact `.planning/milestones/v1.6-DEFERRED-CLEANUP.md`; NEW harness sidecar category `c13_rotting_external` with quarterly audit.

6. **OP-5: Cross-OU device transfer breaks license + profile assignments (HIGH)** — mixed-state side effects: VPP licenses tied to source-OU token; enrollment profile doesn't follow; Intune-side config profiles survive. **Prevention:** Phase 64 device-transfer runbook with 4-cell impact matrix + pre-transfer license-dependency checklist + Graph API query template.

7. **DA-2 + DA-5: Rebrand inconsistency within v1.6 + C12 240-cell math drift (HIGH for harness integrity)** — author completionist instinct to rename ABM→Apple Business outside 3 sanctioned sites; Path-A copy leaves C12 H2 list hardcoded → silent false-negative if 7th H2 added. **Prevention:** harness C14 = negative-check via git diff against baseline; C12 explicitly preserves 240-cell math because no 7th H2 added per D-A3; atomic-harness-commit pattern lands C14/C15/C16 + sidecar + BASELINE refresh in ONE commit.

## Implications for Roadmap

**Reconciled phase structure: 5 phases (62-66, no gaps)** — reconciles ARCHITECTURE's 4-phase proposal (62/63/64/65) + PITFALLS' 6-phase proposal with gaps (62-65 + 68-69) + PROJECT.md's 5-pillar scope via clean 1:1 pillar-to-phase mapping. Numbering continues from Phase 61 without gaps.

### Phase 62: Foundation & Rebrand (Pillar 1)

**Rationale:** Glossary establishes the Apple Business / OU / permissions vocabulary that all subsequent phases reference. Audit harness must scaffold here because C14-C16 are blocking-from-start. Account Holder lockout (OP-2) and Edit-without-View dependency (OP-3) callouts must exist before any custom-role authoring runbook can be safely produced. **11 pitfalls gate here — critical-path bottleneck.**

**Delivers:** `_glossary-apple-business.md` + reciprocal lines in 5 existing glossaries; `cross-platform/apple-business/00-overview.md` (canonical rebrand callout site #1); `01-role-permission-model.md` (per-permission catalog); `02-ous-architecture.md`; 2 intro callouts at existing macOS/iOS ABM doc sites #2 + #3; single inline see-also at `_glossary-macos.md:62`; audit harness v1.6 Path-A copy + C14/C15/C16 + new sidecar category `c13_rotting_external` + `+` separator parsing; style-guide HTML comment block convention; L1 admin-directory lookup convention.

**Addresses:** OP-1 / OP-2 / OP-3 / OP-4 / OP-10 / DA-1 / DA-2 / DA-3 / DA-8 / CI-2 / CI-3

### Phase 63: Multi-OU Architecture & Admin Setup (Pillar 2)

**Rationale:** Admin setup docs depend on the foundation glossary + role model + OUs concept. OUs must exist before custom-role authoring. Sub-org onboarding must contain `#which-admin-owns-this-pool` anchor required by C16. Shared iPad + Apple TV lifecycle docs unblock Phase 64 runbook cross-links.

**Delivers:** `03-ous-vs-custom-roles.md` (decision matrix); `04-custom-role-authoring.md` (min-viable bundle template; whitelist-first per OP-1); `05-sub-org-admin-onboarding.md` (paired offboarding per OP-8); `06-mdm-server-assignment.md`; `07-content-token-consolidation.md` (untouched-OU OP-9 callout); `08-managed-apple-account.md`; `09-shared-ipad-lifecycle.md`; `10-apple-tv-lifecycle.md`; 3 new rows in `reference/ios-capability-matrix.md` under existing Enrollment H2 (pre-edit anchor inventory artifact mandatory per DA-4).

**Uses:** STACK Apple Business URLs + Apple Deployment Guide article IDs from STACK.md §9.

**Implements:** D-A1 directory placement; D-A3 capability matrix changes; D-A7 Apple TV + Shared iPad first-class.

**Addresses:** OP-4 / OP-12 / OP-15 / DA-4 / DA-6 / CI-4

### Phase 64: Delegation Runbooks (Pillar 3)

**Rationale:** Runbooks depend on Phase 63 admin foundation docs. `12-shared-ipad-passcode-reset.md` is the canonical admin-context that L1 #34 cross-links to (C16 gate). Cross-org-boundary cheat sheet harbors C15 anti-pattern allowlist exemptions in HTML comments.

**Delivers:** `11-vpp-catalog-runbook.md`; `12-shared-ipad-passcode-reset.md` (3-path decision matrix per OP-11); `13-device-release-runbook.md` (release ≠ removal per OP-6); `14-device-transfer-runbook.md` (4-cell impact matrix per OP-5); `15-mdm-server-reassign-runbook.md` (single runbook with OS-version eligibility matrix + 2 sub-H2s — reconciles FEATURES Workflow 5.3 split; avoids CI-5 proliferation); `16-managed-apple-account-runbook.md` (60-day federation collision per OP-7); `17-audit-log-scoping-runbook.md` (no-API anti-feature; SIEM export); `18-cross-org-boundary-cheat-sheet.md`.

**Addresses:** OP-5 / OP-6 / OP-7 / OP-8 / OP-9 / OP-13 / OP-14

### Phase 65: L1 / L2 / Common-Issues + Hub Navigation (Pillar 4 — NAVIGATION-LAST)

**Rationale:** Navigation files modified LAST per v1.5 Phase 57+59 precedent. L1 #34 depends on Phase 64 `12-...md` + Phase 63 `05-...md#which-admin-owns-this-pool` (C16 gate). All edits to existing hub files are append-only.

**Delivers:** `l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (`platform: ios+macos+shared-ipad`); `l1-runbooks/00-index.md` append; `l2-runbooks/26-apple-business-permission-denied.md` (7-leaf Mermaid decision tree per DA-9); `l2-runbooks/00-index.md` append; `docs/common-issues.md` append (`## Apple Business Governance Failure Scenarios` H2); `docs/quick-ref-l1.md` + `docs/quick-ref-l2.md` append (`## Apple Business Quick Reference` H2); `docs/operations/00-index.md` append (5th sub-section); `docs/index.md` mods (5th sub-section under `## Operations` H2 + Cross-Platform References + platform-coverage banner appendix).

**Addresses:** OP-11 / OP-12 / DA-8 / DA-9 / CI-5

### Phase 66: Validation Tooling Closure + Milestone Audit (Pillar 5)

**Rationale:** C11 CALIBRATION + C15 banned-phrase refinement against drafted v1.6 corpus requires Phases 62-65 content to exist first. Terminal re-audit must be from fresh worktree per v1.5 D-22 auditor independence. BASELINE_10 refresh closes BASELINE_9 v1.5 carry-over.

**Delivers:** C11 keyword set extended with `apple-business-side|intune-side|integration-handshake|owned-by-apple-business|owned-by-intune|scope-boundary`; C15 banned-phrase list refinement; BASELINE_10 refresh; per-phase `check-phase-62.mjs..check-phase-65.mjs` validators; CI workflow `audit-harness-v1.6-integrity.yml` (Path-A from v1.5); new sidecar `v1.6-audit-allowlist.json` migrated to `scripts/validation/`; terminal re-audit from fresh worktree (must exit 0); `v1.6-MILESTONE-AUDIT.md` authored; PROJECT.md traceability closure (REQ-IDs Active→Validated); `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` finalized (CI-1/CI-2/CI-3 rotting-reference candidates for v1.7+).

**Addresses:** DA-5 / DA-7 / CI-1 / CI-6

### Phase Ordering Rationale

- **Dependency DAG:** OUs (P62) → custom roles (P63) → delegation runbooks (P64) → L1/L2 + hub nav (P65) → audit harness closure (P66)
- **Critical-path bottleneck:** Phase 62 — 11 pitfalls gate here; foundation glossary + role model + audit scaffolds must land before parallelism opens
- **Wave-based parallelism opportunity** (inheriting v1.5 Wave B): Phase 63 + first half of Phase 64 are file-disjoint after Phase 63 `05-...md#which-admin-owns-this-pool` anchor lands → Apple TV + Shared iPad lifecycle docs (`09-` + `10-`) can run in parallel with custom-role authoring + sub-org onboarding
- **Navigation-files-last:** Phase 65 mirrors v1.5 Phase 57+59 precedent (DEFER-07 / DEFER-08 / hub integration after content stabilizes)
- **Atomic-harness-commit:** Phase 62 audit harness landing (C14/C15/C16 + sidecar + new category) inherits v1.5 Plan 60-08 atomic commit pattern
- **Auditor-independence:** Phase 66 terminal re-audit from fresh worktree inherits v1.5 D-22 / Phase 61 Plan 61-04 precedent

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 62:** Apple Business permission catalog complete enumeration (per-permission tables on 11 subgroup sub-pages NOT WebFetch-extractable; manual scrape required ~1 hour effort); Apple Business audit log retention SLA (Apple does NOT publish; community reports 90-365 days; needs live-tenant verification or hedge-language); cross-OU audit visibility 3×3 matrix (author-scope vs target-scope semantics not single-source documented); Apple TV Conference Room Display mode delegation specifics (Apple deployment guides thin on per-OU partitioning for shared physical spaces)
- **Phase 63:** OU sub-OU nesting depth (Apple new docs describe primarily flat; legacy ABM supported one level — needs portal verification); Apple Business Device API public surface (Apple has not yet published developer.apple.com landing for Device API Manager preset role)

Phases with standard patterns (skip phase-research):

- **Phase 64:** Well-precedented runbook authoring patterns from v1.3 (iOS L1/L2) + v1.4 (Android L1/L2) + v1.5 (Linux L1/L2)
- **Phase 65:** Direct lineage from v1.3-v1.5 L1/L2 / common-issues / quick-ref / hub-nav patterns; v1.5 Phase 57+59 navigation-last precedent
- **Phase 66:** Path-A copy + CALIBRATION + terminal re-audit are procedural patterns inherited from v1.5 Phase 60+61

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH (overall); MEDIUM (per-permission enumeration); LOW (OU max counts) | Rebrand + portals + role categories + content token + federation verified via Apple Newsroom + support.apple.com/guide/business/ + Microsoft Learn 2026-04-30; per-permission sub-pages JS-rendered |
| Features | HIGH (overall); MEDIUM (per-role privilege enumeration + min-viable bundle synthesis); LOW (audit log retention exact period) | 8 workflow categories all verified Apple-side; min-viable bundle is v1.6 synthesis from scope (Apple ships no template) |
| Architecture | HIGH (all 10 D-A decisions inherit from v1.2/v1.4/v1.4.1/v1.5 precedents); MEDIUM (Apple Business permission surface) | Each architectural decision cites a documented prior decision |
| Pitfalls | HIGH (OP-1..OP-12 verified Apple official + Intune Learn); HIGH (DA-1..DA-9 directly observable in corpus); MEDIUM (OP-13 / OP-14 / CI-1..CI-3 predictive) | All 30 pitfalls mapped to phase + severity + warning sign + prevention |

**Overall confidence:** HIGH

### Gaps to Address

5 explicit MEDIUM/LOW-confidence gaps flagged for Phase 62 resolution:

1. **Per-permission enumeration tables** — Phase 62 manual scrape of Apple's 11 subgroup permission sub-pages required (~1 hour effort) before custom-role authoring runbook can ship complete
2. **Audit log retention SLA** — Phase 62 must validate against live tenant OR explicitly document the "Apple does not publish — configure periodic SIEM export for compliance >1 year" hedge in `17-audit-log-scoping-runbook.md`
3. **Cross-OU audit visibility matrix** — Phase 62 must produce definitive 3×3 visibility matrix (OU A admin / OU B admin / tenant-wide admin × {visible / redacted / absent}) for `17-audit-log-scoping-runbook.md`
4. **Apple TV Conference Room Display mode delegation specifics** — Phase 62 must clarify shared-physical-space → central-tenant-admin assignment heuristic for `10-apple-tv-lifecycle.md`
5. **Apple Business Device API public surface** — Apple has not yet published `developer.apple.com` landing; acknowledge-but-do-not-document-deeply in `01-role-permission-model.md`

### Deferred Items (for v1.6-DEFERRED-CLEANUP.md at Phase 66 close)

Rotting-reference candidates from PITFALLS CI-1 / CI-2 / CI-3 — Q5(b) leaves unchanged in v1.6; candidates for v1.7+ surgical sweep:

- **CI-1** Apple Business Manager rotting URL references (~30 sites across `admin-setup-ios/*` + `admin-setup-macos/*` + `_glossary-macos.md`) — tracked via NEW Phase 66 sidecar category `c13_rotting_external`; quarterly audit job
- **CI-2** VPP location token rotting references (2 specific lines: `admin-setup-ios/05-app-deployment.md:201`, `admin-setup-macos/04-app-deployment.md:148`)
- **CI-3** Managed Apple ID rotting references (pervasive corpus-wide); Phase 62 glossary ships bidirectional reciprocity as v1.6 mitigation; corpus-wide rename deferred to v1.7+ contingent on Microsoft Intune adopting the rebrand

Final site enumeration finalized at Phase 66 milestone close (not Phase 62) — depends on Phase 62-65 author-discovery of additional candidates.

## Sources

### Primary (HIGH confidence)

- Apple Newsroom 2026-03-24 rebrand announcement — `apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/`
- Apple Business User Guide canonical — `support.apple.com/guide/business/`
- Apple Support transition banner — `support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web`
- Apple Business roles & privileges overview — `support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`
- Apple Business content tokens — `support.apple.com/guide/apple-business-manager/manage-content-tokens-axme0f8659ec/web`
- Apple Business federated authentication — `support.apple.com/guide/apple-business-manager/intro-to-federated-authentication-axmb19317543/web`
- Apple Deployment Guides — `dep4acb2aa44` (OS 26+ migration), `dep027e1d5a0` (Apple TV), `dep6fa9dd532` (Shared iPad), `depa85a35cf2` (Entra)
- Microsoft Intune Apple VPP tutorial 2026-04-30 — `learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple`
- Microsoft Intune ADE tutorial — `learn.microsoft.com/en-us/intune/device-enrollment/apple/tutorial-automated-ios`
- Existing v1.0-v1.5 corpus (file:line citations throughout PITFALLS.md axis 2 / axis 3)
- v1.5 audit harness implementation — `scripts/validation/v1.5-milestone-audit.mjs`

### Secondary (MEDIUM confidence)

- IT Pro 2026-04 — "Apple Business: Everything you need to know"
- MacRumors 2026-03-24 — "Apple Unveils Apple Business All-in-One Platform"
- HardSoft Computers — "What are Role Privileges in Apple Business Manager?"
- PinMeTo — "Apple Business Connect Is Now Apple Business"
- HCS Technology Group SCIM guide

### Tertiary (LOW confidence — needs validation)

- Community reports of Apple Business audit log retention period (90-365 days range) — needs live-tenant verification at Phase 62
- Apple Business Device API public surface — Apple has not yet published developer.apple.com landing; mark UNKNOWN

---

*Research completed: 2026-05-20*
*Ready for roadmap: yes*
