# Roadmap: Windows Autopilot Documentation Suite

## Overview

Seven phases build the documentation suite in strict dependency order: shared foundation first (glossary, reference tables, templates), lifecycle content second (shared mental model for both audiences), error codes third (referenced by every runbook), L1 decision trees fourth (required before L1 runbooks embed them), L1 runbooks fifth, L2 runbooks sixth, and navigation indexes last (link to everything, written after everything exists). Each phase delivers a coherent, independently verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Shared terminology, reference tables, document templates, and APv1/APv2 disambiguation (completed 2026-03-12)
- [x] **Phase 2: Lifecycle** - End-to-end Autopilot lifecycle documentation across all six deployment stages (completed 2026-03-14)
- [x] **Phase 3: Error Codes** - Master error code lookup tables with deployment-mode tagging and multi-cause structure (completed 2026-03-15)
- [x] **Phase 4: L1 Decision Trees** - Mermaid flowcharts for structured L1 triage with explicit terminal states (completed 2026-03-20)
- [x] **Phase 5: L1 Runbooks** - Scripted Service Desk procedures with no registry or PowerShell access required (completed 2026-03-20)
- [x] **Phase 6: L2 Runbooks** - Technical investigation guides with registry paths, event IDs, and PowerShell invocations (completed 2026-03-21)
- [x] **Phase 7: Navigation** - Master index, quick-reference cards, and navigation indexes written after all content exists (completed 2026-03-23)
- [ ] **Phase 8: Reference & Index Anchor Completeness** - Gap closure: registry-paths.md Winlogon entry + anchors, glossary Entra/Intune headings, error-code index heading anchors
- [ ] **Phase 9: Navigation Wiring Fixes** - Gap closure: broken L2 runbook nav footers, missing OOBE entry in common-issues, orphaned architecture.md

## Phase Details

### Phase 1: Foundation
**Goal**: Shared reference infrastructure exists that every subsequent phase can link to without repeating content inline
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06
**Success Criteria** (what must be TRUE):
  1. A reader can look up any Autopilot term (OOBE, ESP, TPM, ZTD, APv1, APv2) in a single glossary file
  2. A writer creating any L1 or L2 doc can apply a template that enforces "Last verified" and "Review by" frontmatter without inventing it
  3. Any doc referencing a registry path links to a single canonical registry-paths.md rather than defining the path inline
  4. Any doc referencing a network endpoint links to a single canonical endpoints.md that includes test commands
  5. Any doc mentioning a PowerShell function links to powershell-ref.md where all 12 exported functions are documented
**Plans:** 3/3 plans complete

Plans:
- [ ] 01-01-PLAN.md — Glossary and APv1 vs APv2 disambiguation page
- [ ] 01-02-PLAN.md — Registry paths, network endpoints, and PowerShell function reference
- [ ] 01-03-PLAN.md — L1 and L2 document templates

### Phase 2: Lifecycle
**Goal**: Both L1 and L2 audiences share a complete mental model of the Autopilot deployment sequence before any troubleshooting content is written
**Depends on**: Phase 1
**Requirements**: LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-05, LIFE-06
**Success Criteria** (what must be TRUE):
  1. An L1 agent reading the lifecycle overview can identify which stage of the flow a reported failure occurred in
  2. The lifecycle overview contains a Mermaid flow diagram that shows user-driven and pre-provisioning as distinct paths
  3. Each of the six stages has a standalone guide covering what happens, what success looks like, and what failure looks like
  4. The pre-provisioning (technician) flow is documented as a first-class path, not a subsection of another mode
**Plans:** 3/3 plans complete

Plans:
- [ ] 02-01-PLAN.md — Stage guides 1-3 (hardware hash, profile assignment, OOBE)
- [ ] 02-02-PLAN.md — Stage guides 4-5 (ESP, post-enrollment verification)
- [ ] 02-03-PLAN.md — Lifecycle overview with Mermaid diagrams and actor table

### Phase 3: Error Codes
**Goal**: Every error code an IT team encounters has a single lookup location with deployment-mode context, failure phase, root cause(s), and per-cause fix
**Depends on**: Phase 1
**Requirements**: ERRC-01, ERRC-02, ERRC-03, ERRC-04, ERRC-05, ERRC-06
**Success Criteria** (what must be TRUE):
  1. A technician can look up any error code and immediately see which deployment mode(s) it applies to and which failure phase produced it
  2. MDM enrollment errors (0x8018xxxx series) are documented with multi-cause entries where the same code has different fixes under different conditions
  3. TPM attestation errors include hardware-specific notes (ST Micro, Nuvoton RSA-3072, Infineon, AMD fTPM, Intel Tiger Lake)
  4. Hybrid join errors include event ID mappings (807, 809, 815, 908, 171, 172) alongside hex codes
  5. Every error row specifies escalation conditions (when L1 should stop and call L2)
**Plans:** 3/3 plans complete

Plans:
- [ ] 03-01-PLAN.md — MDM enrollment and TPM attestation error code tables
- [ ] 03-02-PLAN.md — ESP, pre-provisioning/self-deploying, and hybrid join error code tables
- [ ] 03-03-PLAN.md — Master error code index and human verification

### Phase 4: L1 Decision Trees
**Goal**: Service Desk agents have structured triage flowcharts that route them to a resolution or explicit escalation point without ambiguity
**Depends on**: Phase 2, Phase 3
**Requirements**: L1DT-01, L1DT-02, L1DT-03, L1DT-04
**Success Criteria** (what must be TRUE):
  1. Every decision tree opens with a network reachability gate before any scenario-specific branches
  2. Every flowchart has three and only three terminal categories: Resolved, Escalate to L2 (with data collection checklist), Escalate to infrastructure/network
  3. An L1 agent following the ESP failure tree can distinguish device phase from user phase failures without registry access
  4. All flowcharts are Mermaid source (not images) and render correctly in GitHub Markdown
**Plans:** 2/2 plans complete

Plans:
- [x] 04-01-PLAN.md — ESP, Profile assignment, and TPM attestation scenario decision trees
- [x] 04-02-PLAN.md — Initial triage hub decision tree with network gate and scenario routing

### Phase 5: L1 Runbooks
**Goal**: Service Desk agents can resolve the five highest-volume Autopilot failure scenarios by following scripted steps with no registry access, no PowerShell execution, and clear escalation triggers
**Depends on**: Phase 3, Phase 4
**Requirements**: L1RB-01, L1RB-02, L1RB-03, L1RB-04, L1RB-05
**Success Criteria** (what must be TRUE):
  1. Every runbook opens with prerequisites and "start here: check X first" — no background context before the first action step
  2. No runbook contains a PowerShell command, registry path, or log file reference
  3. Every runbook includes explicit escalation criteria specifying what data to collect before calling L2
  4. An L1 agent can complete any runbook without needing to interpret ambiguous branching — every branch has a stated outcome
**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md — Device not registered, profile not assigned, and network connectivity runbooks
- [x] 05-02-PLAN.md — ESP stuck/failed runbook (with sub-sections) and OOBE failure runbook
- [x] 05-03-PLAN.md — Runbook index and Phase 4 forward-link updates

### Phase 6: L2 Runbooks
**Goal**: Desktop Engineers have technical investigation guides that cover the five most complex Autopilot failure modes with registry paths, event IDs, and PowerShell function references sourced from the Phase 1 canonical references
**Depends on**: Phase 1, Phase 3
**Requirements**: L2RB-01, L2RB-02, L2RB-03, L2RB-04, L2RB-05
**Success Criteria** (what must be TRUE):
  1. An L2 engineer can collect a complete diagnostic package (MDM logs, Event Viewer exports, registry snapshots) using only the log collection guide
  2. The ESP deep-dive guide documents the registry structure for device phase and user phase separately, including LOB and Win32 app conflict indicators
  3. The hybrid join runbook covers the ODJ Connector prerequisites and failure modes including 0x80070774 with the current connector version noted
  4. The TPM attestation runbook documents hardware-specific error codes with firmware update paths for each affected chipset
  5. Every L2 runbook links to phase 1 reference files for registry paths, PowerShell functions, and network endpoints rather than duplicating them inline
**Plans:** 3/4 plans executed

Plans:
- [x] 06-01-PLAN.md — Log collection prerequisite guide and L2 runbook index
- [x] 06-02-PLAN.md — ESP deep-dive and policy conflict analysis guides
- [x] 06-03-PLAN.md — TPM attestation and hybrid join investigation guides
- [x] 06-04-PLAN.md — Forward-link resolution in all upstream files

### Phase 8: Reference & Index Anchor Completeness
**Goal**: Close foundation reference and error-code index anchor gaps identified by v1.0 milestone audit so that inbound anchor links from error codes, L2 runbooks, and the master error-code index resolve to their intended targets rather than falling back to file-top
**Depends on**: Phase 1, Phase 3
**Requirements**: (Gap closure — no new requirements; fixes existing FOUND-01, FOUND-02, ERRC-01 artifacts)
**Gap Closure**: Closes tech debt items from `.planning/v1.0-MILESTONE-AUDIT.md`
**Success Criteria** (what must be TRUE):
  1. `reference/registry-paths.md` contains an entry for `HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon` with the same columns as existing rows
  2. `reference/registry-paths.md` has heading-level anchors for `#autopilotsettings`, `#provisioning-diagnostics`, and `#winlogon` so inbound fragment links from error-code files resolve
  3. `_glossary.md` has `### Entra` and `### Intune` defined-term headings so 6 inbound `#entra`/`#intune` links from error-code files resolve
  4. `error-codes/00-index.md` fragment IDs (`#0x...`, `#event-...`) resolve to the specific error row — either via heading anchors, an alternative index structure, or equivalent GFM-compatible anchoring
**Plans:** 2/2 plans complete

Plans:
- [x] 08-01-PLAN.md — Foundation reference anchors (registry-paths.md Winlogon entry + anchors, glossary Entra/Intune headings)
- [x] 08-02-PLAN.md — Error-code index fragment anchors (inline HTML id anchors in 5 category files)

### Phase 9: Navigation Wiring Fixes
**Goal**: Close navigation and cross-phase wiring gaps identified by v1.0 milestone audit so that L2 runbook footer navigation works, OOBE failure is reachable from common-issues.md, and architecture.md is discoverable from Phase 7 navigation entry points
**Depends on**: Phase 5, Phase 6, Phase 7
**Requirements**: (Gap closure — no new requirements; fixes existing L2RB-03, L2RB-04, NAV-02, NAV-01 artifacts)
**Gap Closure**: Closes high-severity and medium-severity integration gaps from `.planning/v1.0-MILESTONE-AUDIT.md`
**Success Criteria** (what must be TRUE):
  1. `l2-runbooks/03-tpm-attestation.md` Prev nav link points to an existing file (`02-esp-deep-dive.md`, not `02-device-registration.md`)
  2. `l2-runbooks/04-hybrid-join.md` Next nav link points to `05-policy-conflicts.md` (not `05-policy-conflict.md`)
  3. `common-issues.md` has an OOBE failure entry routing to `l1-runbooks/05-oobe-failure.md`
  4. `docs/architecture.md` is linked from at least one Phase 7 navigation entry point (`index.md` Shared References)
**Plans:** 0/0 plans complete

### Phase 7: Navigation
**Goal**: Both L1 and L2 audiences can reach all documentation from role-specific entry points without traversing content intended for the other audience
**Depends on**: Phase 5, Phase 6
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. An L1 agent opening the master index reaches their runbooks and decision trees without passing through L2 technical content
  2. An L2 engineer opening the master index reaches their runbooks, reference tables, and PowerShell tools without passing through scripted L1 steps
  3. The L1 quick-reference card fits on one screen and contains the top checks and escalation triggers without any prose context
  4. The existing common-issues.md becomes a navigation index with links to the appropriate runbooks rather than standalone content
**Plans:** 2/2 plans complete

Plans:
- [x] 07-01-PLAN.md — Master documentation index and common-issues.md navigation transformation
- [x] 07-02-PLAN.md — L1 and L2 quick-reference cards

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete   | 2026-03-12 |
| 2. Lifecycle | 3/3 | Complete   | 2026-03-14 |
| 3. Error Codes | 3/3 | Complete   | 2026-03-15 |
| 4. L1 Decision Trees | 2/2 | Complete   | 2026-03-20 |
| 5. L1 Runbooks | 3/3 | Complete   | 2026-03-20 |
| 6. L2 Runbooks | 4/4 | Complete   | 2026-03-21 |
| 7. Navigation | 2/2 | Complete   | 2026-03-23 |
| 8. Reference & Index Anchor Completeness | 0/0 | Not started | - |
| 9. Navigation Wiring Fixes | 0/0 | Not started | - |
