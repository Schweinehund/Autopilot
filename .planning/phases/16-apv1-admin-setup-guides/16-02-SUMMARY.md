---
phase: 16-apv1-admin-setup-guides
plan: "02"
subsystem: documentation
tags: [autopilot, apv1, admin-guide, dynamic-groups, deployment-modes, user-driven, pre-provisioning, self-deploying, intune, entra-id]

# Dependency graph
requires:
  - phase: 16-apv1-admin-setup-guides plan 01
    provides: docs/admin-setup-apv1/00-03 (overview, hardware hash, deployment profile, ESP policy)
  - phase: 11-apv2-lifecycle
    provides: admin-template.md pattern and frontmatter conventions
provides:
  - docs/admin-setup-apv1/04-dynamic-groups.md — ZTDId membership rule, group tag targeting, sync delay callouts, profile conflict resolution
  - docs/admin-setup-apv1/05-deployment-modes-overview.md — three-mode comparison table, mode selection guidance, next step navigation
  - docs/admin-setup-apv1/06-user-driven.md — full user-driven admin guide with Entra/hybrid join paths and end-user OOBE walkthrough
  - docs/admin-setup-apv1/07-pre-provisioning.md — full pre-provisioning guide with TPM 2.0, Win+F12, Reseal workflow, 0x80180005 error
  - docs/admin-setup-apv1/08-self-deploying.md — full self-deploying guide with no-user-affinity and device-group assignment requirements
affects: [16-apv1-admin-setup-guides plan 03, 17-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Two-phase pre-provisioning walkthrough pattern: technician flow (staging) + user flow (post-reseal)"
    - "No-user-affinity self-deploying pattern with device-group-only app assignment guidance"
    - "Hybrid join cross-reference pattern: 06 and 07 reference 09-intune-connector-ad; 08 does not (per D-10)"

key-files:
  created:
    - docs/admin-setup-apv1/04-dynamic-groups.md
    - docs/admin-setup-apv1/05-deployment-modes-overview.md
    - docs/admin-setup-apv1/06-user-driven.md
    - docs/admin-setup-apv1/07-pre-provisioning.md
    - docs/admin-setup-apv1/08-self-deploying.md
  modified: []

key-decisions:
  - "05-deployment-modes-overview.md has no Configuration-Caused Failures table — it is a comparison/index page, not a step-by-step config guide (per D-08)"
  - "08-self-deploying.md Next step footer links to 09-intune-connector-ad.md for sequential navigation but contains no hybrid join cross-reference body content (per D-10)"
  - "Connector version gate 6.2501.2000.5 documented in both 06 and 07 hybrid join sections as a 'What breaks' callout"

patterns-established:
  - "Mode-specific prerequisites prominent pattern: TPM 2.0 and wired ethernet called out as MANDATORY with bold text in Prerequisites section headers"
  - "L2 supplementary details block pattern: <details> blocks used only for L2 runbook cross-references, not for primary admin procedures"

requirements-completed: [ADMN-04, ADMN-05]

# Metrics
duration: 8min
completed: 2026-04-13
---

# Phase 16 Plan 02: Dynamic Groups, Deployment Modes Overview, and All Three Deployment Mode Admin Guides Summary

**Five APv1 admin guides covering dynamic device group creation with ZTDId rules, a three-mode comparison table, and full configuration guides for User-Driven (with hybrid join), Pre-Provisioning (Win+F12/Reseal/TPM 2.0), and Self-Deploying (no user affinity, device-group-only) modes**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-13T12:51:27Z
- **Completed:** 2026-04-13T12:59:30Z
- **Tasks:** 3
- **Files modified:** 5 created

## Accomplishments

- Dynamic groups guide with ZTDId and group tag membership rules, sync delay callouts (5-15 min / up to 24 hours), and "oldest-created profile wins" conflict resolution
- Deployment modes overview with three-mode comparison table covering TPM, ethernet, user credentials, hybrid support, ESP phases, and Win+F12 trigger
- User-driven guide with Entra join and Hybrid Entra join paths, 7-step end-user OOBE walkthrough, connector version gate callout (≥ 6.2501.2000.5), and L2 hybrid join details block
- Pre-provisioning guide with TPM 2.0/wired ethernet mandatory prerequisites, Win+F12 technician flow, 7-step staging walkthrough, Reseal step, error 0x80180005, and L2 TPM attestation details block
- Self-deploying guide with no-user-affinity callout, device-group-only app assignment guidance, 6-step automated deployment flow, hybrid join NOT supported, and L2 TPM attestation details block

## Task Commits

Each task was committed atomically:

1. **Task 1: Create dynamic groups guide and deployment modes overview** - `f145c28` (feat)
2. **Task 2: Create user-driven and pre-provisioning mode guides** - `609a5f7` (feat)
3. **Task 3: Create self-deploying mode guide** - `7f412ef` (feat)

## Files Created/Modified

- `docs/admin-setup-apv1/04-dynamic-groups.md` — ZTDId and group tag membership rules, sync delay expectations, profile conflict resolution (oldest-created wins), Configuration-Caused Failures table
- `docs/admin-setup-apv1/05-deployment-modes-overview.md` — three-mode comparison table (8 feature rows), mode selection guidance, common OOBE profile settings, links to mode-specific guides
- `docs/admin-setup-apv1/06-user-driven.md` — Entra join and Hybrid Entra join paths, 7-step user OOBE walkthrough, connector version gate, Configuration-Caused Failures table, L2 details block
- `docs/admin-setup-apv1/07-pre-provisioning.md` — TPM 2.0 and wired ethernet prerequisites, Win+F12 technician flow, 7-step staging walkthrough with Reseal, 0x80180005 error documented, Configuration-Caused Failures table, L2 TPM details block
- `docs/admin-setup-apv1/08-self-deploying.md` — TPM-only authentication, no user affinity, wired ethernet mandatory, hybrid join NOT supported, 6-step automated flow, device-group assignment guidance, Configuration-Caused Failures table, L2 TPM details block

## Decisions Made

- `05-deployment-modes-overview.md` has no Configuration-Caused Failures table — it is a comparison/index page, not a step-by-step configuration guide (per D-08). Individual mode guides carry their own tables.
- `08-self-deploying.md` Next step footer links to `09-intune-connector-ad.md` for sequential navigation (required by D-02) but the file body contains no hybrid join cross-reference content (per D-10, hybrid cross-reference is from 06 and 07 only).
- All three mode guides include `<details>` L2 supplementary blocks: 06 links to L2 hybrid join runbook; 07 and 08 link to L2 TPM attestation runbook.

## Deviations from Plan

None — plan executed exactly as written. Files written to correct location at `docs/admin-setup-apv1/` in main repository after discovering worktree working directory was an empty placeholder.

## Issues Encountered

- Working directory `D:\claude\Autopilot\.claude\worktrees\agent-af330ef5` was an empty placeholder directory. First Write tool calls attempted to create files there (failed silently). Identified correct target as main repo `D:\claude\Autopilot\docs\admin-setup-apv1\` and wrote files there successfully. All git commits used the main repo (`/d/claude/Autopilot`).

## Known Stubs

None — all five files contain substantive content wired to correct cross-references. No placeholder text, hardcoded empty values, or TODO markers.

## Next Phase Readiness

- Plan 02 files (04-08) complete and committed. Plan 03 can proceed to create `09-intune-connector-ad.md` and `10-config-failures.md` which are the final two files in this phase.
- All cross-reference targets in this plan's files have been verified to exist: `docs/l1-runbooks/03-profile-not-assigned.md`, `docs/l1-runbooks/04-network-connectivity.md`, `docs/l1-runbooks/05-oobe-failure.md`, `docs/l2-runbooks/03-tpm-attestation.md`, `docs/l2-runbooks/04-hybrid-join.md`.

---
*Phase: 16-apv1-admin-setup-guides*
*Completed: 2026-04-13*
