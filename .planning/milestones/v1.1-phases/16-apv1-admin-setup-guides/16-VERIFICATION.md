---
phase: 16-apv1-admin-setup-guides
verified: 2026-04-13T09:30:00Z
status: passed
score: 7/7 must-haves verified
re_verification: false
---

# Phase 16: APv1 Admin Setup Guides Verification Report

**Phase Goal:** Intune admins can configure a complete APv1 deployment -- hardware hash registration, deployment profiles, ESP policies, dynamic groups, and deployment modes -- with configuration-caused failure chains documented at each step
**Verified:** 2026-04-13
**Status:** PASSED
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths (from ROADMAP.md Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Admin can follow the hardware hash upload guide covering all three paths (OEM, CSV, PowerShell) and know which path applies to their scenario | VERIFIED | `01-hardware-hash-upload.md` (162 lines) has Mermaid flowchart TD decision tree at top, OEM section (5 steps), CSV section with ANSI encoding warning and error reference table, PowerShell section with TLS 1.2, NuGet, Graph auth, and stale hash callouts. 6 references to Get-WindowsAutopilotInfo |
| 2 | Admin can configure a deployment profile with correct OOBE settings and read per-setting "what breaks" warnings for each configurable option | VERIFIED | `02-deployment-profile.md` (117 lines) documents all 11 OOBE settings with 11 "What breaks" callouts, profile conflict resolution (oldest-wins), and links to 05-oobe-failure and 03-profile-not-assigned runbooks |
| 3 | Admin can configure an ESP policy with recommended timeout values, app tracking list, and Windows Update setting, with misconfiguration consequences documented per setting | VERIFIED | `03-esp-policy.md` (145 lines) covers 11 ESP settings, prominent "Critical Default Change" callout for Windows quality updates, hybrid join +40 min buffer (5 references), TrustedInstaller MSI/Win32 conflict warning, app tracking table, and L2 ESP deep-dive details block |
| 4 | Admin can create a dynamic device group using the correct ZTDId membership rule with sync delay expectations and profile conflict resolution guidance included | VERIFIED | `04-dynamic-groups.md` (95 lines) has `devicePhysicalIDs` ZTDId membership rule, group tag targeting with case-sensitivity warning, sync delay expectations (5-15 min to 24 hours), profile conflict resolution (oldest-wins), and 5-entry config failures table |
| 5 | Admin can select and configure any of the three APv1 deployment modes (user-driven, pre-provisioning, self-deploying) with mode-specific prerequisites and known limitations documented | VERIFIED | `05-deployment-modes-overview.md` (61 lines) with comparison table covering TPM, ethernet, credentials, hybrid, ESP, user affinity. `06-user-driven.md` (97 lines) with hybrid join cross-ref to connector. `07-pre-provisioning.md` (106 lines) with TPM 2.0, Win+F12 (5 refs), wired ethernet mandatory. `08-self-deploying.md` (104 lines) with no user affinity (8 refs), hybrid not supported |
| 6 | Admin can look up any configuration mistake from a "configuration-caused failures" reverse-lookup table that links to the relevant v1.0 troubleshooting runbook | VERIFIED | `10-config-failures.md` (102 lines) has 32 entries across 6 categories (hardware hash, deployment profile, ESP, dynamic groups, deployment modes, Intune connector). 4-column format (Misconfiguration, Symptom, Guide, Runbook). Links to all 5 L1 runbooks and all relevant guide files. L2 details block with 4 L2 runbook references |
| 7 | Admin can set up the Intune Connector for AD for hybrid join deployments with connector version gate and current log path documented | VERIFIED | `09-intune-connector-ad.md` (136 lines) has CAUTION callout with version gate 6.2501.2000.5 (4 refs), current version 6.2504.2001.8 with WebView2 note, OU config with XML example (OrganizationalUnitsUsedForOfflineDomainJoin, 3 refs), multi-domain guidance, msaODJ MSA naming, Event Viewer log path (ODJConnectorService, 4 refs), L2 hybrid join details block |

**Score:** 7/7 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/admin-setup-apv1/00-overview.md` | Sequential index with Mermaid flow and Consider APv2 callout | VERIFIED | 60 lines, Mermaid graph, "Consider APv2" callout with "APv1 silently wins" warning, links to all 10 files, apv1-vs-apv2 linked 3 times |
| `docs/admin-setup-apv1/01-hardware-hash-upload.md` | Hardware hash upload with OEM/CSV/PowerShell paths | VERIFIED | 162 lines, decision tree, 3 paths, 7+ what-breaks callouts, 6-entry config failures table |
| `docs/admin-setup-apv1/02-deployment-profile.md` | Deployment profile with OOBE settings | VERIFIED | 117 lines, 11 OOBE settings, per-setting what-breaks, 6-entry config failures table |
| `docs/admin-setup-apv1/03-esp-policy.md` | ESP policy with timeout/app tracking/quality updates | VERIFIED | 145 lines, 11 settings, critical default change callout, hybrid +40 min, L2 details block |
| `docs/admin-setup-apv1/04-dynamic-groups.md` | Dynamic groups with ZTDId rule and sync delays | VERIFIED | 95 lines, devicePhysicalIDs rule, group tag targeting, sync delay expectations, 5-entry table |
| `docs/admin-setup-apv1/05-deployment-modes-overview.md` | 3-mode comparison table and selection guidance | VERIFIED | 61 lines, comparison table with 9 features, mode selection guidance, no config failures table (correct per D-08) |
| `docs/admin-setup-apv1/06-user-driven.md` | User-driven mode with hybrid join cross-reference | VERIFIED | 97 lines, hybrid join subsection, connector cross-ref (3 refs to 09-intune-connector-ad), L2 hybrid join details |
| `docs/admin-setup-apv1/07-pre-provisioning.md` | Pre-provisioning with TPM 2.0 and Win+F12 | VERIFIED | 106 lines, TPM 2.0 prerequisite, Win+F12 trigger, reseal workflow, wired ethernet mandatory, L2 TPM details |
| `docs/admin-setup-apv1/08-self-deploying.md` | Self-deploying with no user affinity | VERIFIED | 104 lines, no user affinity callout, TPM 2.0 required, hybrid not supported, device-based licensing, L2 TPM details |
| `docs/admin-setup-apv1/09-intune-connector-ad.md` | Intune Connector with version gate and log paths | VERIFIED | 136 lines, CAUTION version gate, OU XML config, multi-domain, msaODJ, Event Viewer paths, L2 hybrid join details |
| `docs/admin-setup-apv1/10-config-failures.md` | Consolidated reverse-lookup table | VERIFIED | 102 lines, 32 entries, 6 categories, 4-column format, all 5 L1 runbooks, all relevant guide files, L2 details block, "Return to" footer |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| 00-overview.md | apv1-vs-apv2.md | Consider APv2 callout | WIRED | 3 links to comparison page, target file exists |
| 01-hardware-hash-upload.md | l1-runbooks/01-device-not-registered.md | What breaks callout | WIRED | Multiple links, target exists |
| 02-deployment-profile.md | l1-runbooks/03-profile-not-assigned.md | What breaks callout | WIRED | Multiple links, target exists |
| 02-deployment-profile.md | l1-runbooks/05-oobe-failure.md | What breaks callout | WIRED | Multiple links, target exists |
| 03-esp-policy.md | l1-runbooks/02-esp-stuck-or-failed.md | What breaks callout | WIRED | Multiple links, target exists |
| 04-dynamic-groups.md | l1-runbooks/03-profile-not-assigned.md | What breaks callout | WIRED | Multiple links, target exists |
| 06-user-driven.md | 09-intune-connector-ad.md | Hybrid join cross-reference | WIRED | 3 references, target exists |
| 07-pre-provisioning.md | 09-intune-connector-ad.md | Hybrid join cross-reference | WIRED | 2 references, target exists |
| 09-intune-connector-ad.md | l1-runbooks/05-oobe-failure.md | What breaks callout | WIRED | Multiple links, target exists |
| 09-intune-connector-ad.md | l2-runbooks/04-hybrid-join.md | L2 details block | WIRED | Link in details block, target exists |
| 10-config-failures.md | l1-runbooks/01-device-not-registered.md | Reverse-lookup table | WIRED | 6 links, target exists |
| 10-config-failures.md | l1-runbooks/02-esp-stuck-or-failed.md | Reverse-lookup table | WIRED | 6 links, target exists |
| 10-config-failures.md | l1-runbooks/03-profile-not-assigned.md | Reverse-lookup table | WIRED | 6 links, target exists |
| 10-config-failures.md | l1-runbooks/04-network-connectivity.md | Reverse-lookup table | WIRED | 1 link, target exists |
| 10-config-failures.md | l1-runbooks/05-oobe-failure.md | Reverse-lookup table | WIRED | 13 links, target exists |
| Sequential navigation | 00 -> 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 07 -> 08 -> 09 -> 10 -> 00 | Next step footers | WIRED | Complete unbroken chain verified |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| ADMN-01 | 16-01 | Hardware hash upload guide (all 3 paths) | SATISFIED | `01-hardware-hash-upload.md` with OEM, CSV, PowerShell paths and decision tree |
| ADMN-02 | 16-01 | Deployment profile with per-setting what-breaks | SATISFIED | `02-deployment-profile.md` with 11 OOBE settings and per-setting callouts |
| ADMN-03 | 16-01 | ESP policy with timeout, app tracking, quality updates | SATISFIED | `03-esp-policy.md` with 11 settings and critical default change callout |
| ADMN-04 | 16-02 | Dynamic groups with ZTDId rule and sync delays | SATISFIED | `04-dynamic-groups.md` with membership rule and sync delay expectations |
| ADMN-05 | 16-02 | Three deployment mode guides with mode-specific prerequisites | SATISFIED | `05-08` covering all three modes with comparison table and mode-specific guides |
| ADMN-06 | 16-03 | Consolidated config-caused failures reverse-lookup table | SATISFIED | `10-config-failures.md` with 32 entries, 6 categories, 4-column format |
| ADMN-07 | 16-03 | Intune Connector guide with version gate and log path | SATISFIED | `09-intune-connector-ad.md` with version gate, OU config, Event Viewer log path |

**Note:** ADMN-01 through ADMN-07 are referenced in ROADMAP.md Phase 16 and all 3 plan frontmatters, but are NOT defined in REQUIREMENTS.md. The REQUIREMENTS.md file only covers v1.0 requirements (FOUND, LIFE, ERRC, L1DT, L1RB, L2RB, NAV). The ADMN-* requirements appear to be implicit v1.1 requirements that have not been added to REQUIREMENTS.md. This is an orphan in REQUIREMENTS.md terms -- the requirements are tracked in the ROADMAP but not formally defined in the requirements document.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (none) | - | - | - | All 11 files clean -- no TODO, FIXME, placeholder, or stub patterns detected |

### Human Verification Required

### 1. Sequential Navigation Flow

**Test:** Open `00-overview.md` and follow "Next step" links through all 11 files in sequence
**Expected:** Each link leads to the correct next file; final file (10) returns to overview
**Why human:** Markdown link rendering and relative path resolution in the actual documentation viewer

### 2. Mermaid Diagram Rendering

**Test:** View `00-overview.md` and `01-hardware-hash-upload.md` in a Mermaid-capable renderer
**Expected:** Setup sequence diagram renders as a left-to-right flow; decision tree renders as a top-down flowchart
**Why human:** Mermaid syntax validity and visual layout cannot be verified by grep

### 3. Version Gate Visibility

**Test:** Open `09-intune-connector-ad.md` and check the CAUTION callout
**Expected:** Version gate (6.2501.2000.5) is prominently visible as a boxed callout, not buried in text
**Why human:** Visual prominence and styling depend on the renderer

### 4. Config Failures Table Usability

**Test:** Open `10-config-failures.md` and try to find a specific failure (e.g., "CSV encoding") using browser search
**Expected:** Table is scannable, links work, 4-column layout renders correctly
**Why human:** Table rendering and usability are visual

## Structural Verification

- [x] All 11 files (00-10) exist in `docs/admin-setup-apv1/`
- [x] All 11 files have `applies_to: APv1` frontmatter
- [x] All 11 files have version gate blockquote
- [x] All 11 files have `last_verified` and `review_by` frontmatter
- [x] Sequential navigation chain complete (00 -> 01 -> ... -> 10 -> 00)
- [x] All cross-reference link targets exist (5 L1 runbooks, 4 L2 runbooks, apv1-vs-apv2, lifecycle overview, L1 index)
- [x] Per-file Configuration-Caused Failures tables present on files 01-04, 06-09 (05 correctly omitted per D-08)
- [x] L2 `<details>` blocks present on files 03, 06, 07, 08, 09, 10
- [x] 32 entries in consolidated config failures table (exceeds 25 minimum)
- [x] All 8 commits verified in git history
- [x] Total content: 1,185 lines across 11 files (substantive, not stubs)

---

_Verified: 2026-04-13_
_Verifier: Claude (gsd-verifier)_
