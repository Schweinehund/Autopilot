---
phase: 03-error-codes
verified: 2026-03-15T00:00:00Z
status: passed
score: 13/13 must-haves verified
re_verification: false
---

# Phase 3: Error Codes Verification Report

**Phase Goal:** Create comprehensive error code reference documentation covering all major Autopilot failure categories with diagnostic steps and remediation actions.
**Verified:** 2026-03-15
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

#### Plan 01 Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A technician can look up any 0x8018xxxx MDM enrollment error and see deployment mode, cause(s), L1 action, and L2 fix | VERIFIED | `01-mdm-enrollment.md` contains 10 error codes in 7-column table; all rows include Phase/Mode/Cause/L1/L2 columns with substantive content |
| 2 | 0x80180014 has two separate cause rows with different L1 actions (portal unblock vs escalate) | VERIFIED | Lines 22–23: row 1 = "Unblock device" portal action; row 2 = immediate `**Escalate**`; L1 actions are distinct |
| 3 | TPM attestation errors include hardware-specific notes for Infineon, ST Micro/Nuvoton, AMD fTPM, and Intel Tiger Lake | VERIFIED | `02-tpm-attestation.md` lines 33–51: dedicated H2 "Hardware-Specific Known Issues" section covers all 5 hardware types (Infineon SLB9672, ST Micro/Nuvoton, AMD fTPM, Intel Tiger Lake, clock skew); grep count = 8 occurrences |
| 4 | Each file has YAML frontmatter, version gate banner, table legend, error table, APv2 Notes, and Version History | VERIFIED | All 6 files confirmed: frontmatter (last_verified/review_by/applies_to/audience), version gate banner, table legend block, error table(s), APv2 Note blockquote, Version History table |

#### Plan 02 Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 5 | ESP errors cover both coded errors and no-code policy conflict patterns with distinct L1 actions | VERIFIED | `03-esp-enrollment.md`: 3-row coded error table (7-column) + separate 4-column Policy Conflicts table with 6 rows; each row has distinct L1 Action (all escalate with specific collection notes); ESP Timeout Patterns prose section also present |
| 6 | Pre-provisioning and self-deploying errors are combined in one file with cross-reference rows pointing to TPM category | VERIFIED | `04-pre-provisioning.md`: 1 primary entry (0xc1036501) + 7 cross-reference rows using "→ See [TPM Attestation Errors](02-tpm-attestation.md#...)" pattern; `02-tpm-attestation.md` linked 7 times |
| 7 | Hybrid join errors map all 6 required event IDs (807, 809, 815, 908, 171, 172) | VERIFIED | `05-hybrid-join.md` Event ID Mapping table: all 6 event IDs present as full 7-column rows with causes, L1 actions, and L2 fixes |
| 8 | 0x80070774 has three distinct cause rows for hybrid join failure scenarios | VERIFIED | Lines 38–40: cause 1 = "Assign user" feature active; cause 2 = domain mismatch; cause 3 = ODJ Connector insufficient permissions; all three present |
| 9 | ODJ Connector log path references the current location (Microsoft > Intune > ODJConnectorService) | VERIFIED | Lines 46, 48: current path `Applications and Services Logs > Microsoft > Intune > ODJConnectorService`; legacy stale path explicitly noted; minimum version 6.2501.2000.5 documented |

#### Plan 03 Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 10 | A technician can Ctrl+F any error code on the index page and immediately see which category file to open | VERIFIED | `00-index.md`: 29-row Quick Lookup table (23 hex codes + 6 event IDs) sorted hex ascending with Event IDs at end; each row has Code, Name, Mode, and linked Category column |
| 11 | The index lists every error from all 5 category files in a single condensed table | VERIFIED | 29 rows confirmed; cross-reference rows from `04-pre-provisioning.md` are excluded (pointing to primary files); each unique code appears exactly once |
| 12 | Each row links to the primary category file for that error | VERIFIED | All 29 Category column entries use markdown links with anchor fragments (e.g., `01-mdm-enrollment.md#0x80180014`) |
| 13 | The index has a Categories section linking to each category file with brief descriptions | VERIFIED | Lines 14–19: bulleted Categories section links to all 5 files with one-line descriptions |

**Score: 13/13 truths verified**

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/error-codes/01-mdm-enrollment.md` | MDM enrollment error lookup table (0x8018xxxx series) | VERIFIED | Exists, 46 lines, 10 error codes, substantive 7-column table, linked from index |
| `docs/error-codes/02-tpm-attestation.md` | TPM attestation error lookup with hardware-specific causes | VERIFIED | Exists, 64 lines, 8 error codes + Hardware-Specific Known Issues H2, Infineon SLB9672 confirmed present |
| `docs/error-codes/03-esp-enrollment.md` | ESP and enrollment error lookup including no-code policy conflicts | VERIFIED | Exists, 61 lines, AppLocker and AppWorkload.log both confirmed present |
| `docs/error-codes/04-pre-provisioning.md` | Pre-provisioning/self-deploying combined lookup with cross-references | VERIFIED | Exists, 53 lines, `02-tpm-attestation` linked 7 times via cross-reference rows |
| `docs/error-codes/05-hybrid-join.md` | Hybrid join error lookup with event ID mapping | VERIFIED | Exists, 67 lines, Event 807 confirmed present, ODJConnectorService confirmed |
| `docs/error-codes/00-index.md` | Master error code lookup table as single entry point | VERIFIED | Exists, 75 lines, `0x80180014` confirmed, all 5 category files linked |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `docs/error-codes/01-mdm-enrollment.md` | `docs/reference/powershell-ref.md` | Inline Markdown links in L2 Fix column | WIRED | 4 occurrences of `powershell-ref.md` confirmed |
| `docs/error-codes/02-tpm-attestation.md` | `docs/lifecycle/03-oobe.md` | Phase column links to lifecycle stage guide | WIRED | 10 occurrences of `lifecycle/03-oobe` confirmed |
| `docs/error-codes/04-pre-provisioning.md` | `docs/error-codes/02-tpm-attestation.md` | Cross-reference rows for TPM codes | WIRED | 7 occurrences of `02-tpm-attestation.md` confirmed |
| `docs/error-codes/05-hybrid-join.md` | `docs/error-codes/02-tpm-attestation.md` | Event 171/172 link to TPM attestation causes | WIRED | 1 occurrence confirmed in Event 171 row L2 Fix and L1 Action |
| `docs/error-codes/00-index.md` | `docs/error-codes/01-mdm-enrollment.md` | Category column links | WIRED | 11 occurrences confirmed |
| `docs/error-codes/00-index.md` | `docs/error-codes/05-hybrid-join.md` | Category column links | WIRED | 8 occurrences confirmed |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| ERRC-01 | Plan 03 | Master error code lookup table with deployment-mode tagging and phase-of-failure grouping | SATISFIED | `00-index.md` Quick Lookup table: 29 rows, Mode column populated (UD/PP/SD/All), Category links to phase-grouped files |
| ERRC-02 | Plan 01 | MDM enrollment errors section (0x8018xxxx series) with multi-cause handling | SATISFIED | `01-mdm-enrollment.md`: 10 codes, 0x80180014 has two rows with distinct L1 actions |
| ERRC-03 | Plan 01 | TPM attestation errors section with hardware-specific notes | SATISFIED | `02-tpm-attestation.md`: 8 codes, Hardware-Specific Known Issues H2 covers Infineon SLB9672, ST Micro/Nuvoton, AMD fTPM, Intel Tiger Lake |
| ERRC-04 | Plan 02 | ESP and enrollment errors section | SATISFIED | `03-esp-enrollment.md`: 3 coded errors + 6 policy conflict patterns + 3 timeout prose scenarios |
| ERRC-05 | Plan 02 | Pre-provisioning and self-deploying mode errors section | SATISFIED | `04-pre-provisioning.md`: 1 primary entry + 7 cross-references to TPM/MDM files; Pre-Provisioning Specific Notes and Self-Deploying Mode Requirements sections present |
| ERRC-06 | Plan 02 | Hybrid join and device registration errors section with event ID mapping | SATISFIED | `05-hybrid-join.md`: 6 event IDs mapped, 3 cause rows for 0x80070774, ODJ Connector notes with current path and minimum version |

No orphaned requirements found. All 6 ERRC requirements are claimed in plan frontmatter and verified in codebase.

---

## Anti-Patterns Found

No anti-patterns detected. Scan results:

- Zero TODO/FIXME/PLACEHOLDER occurrences across all 6 files
- No empty returns, stub functions, or placeholder text
- All L2 Fix cells contain substantive content or correctly annotated forward-links ("available after Phase 6")
- Forward-links to Phase 6 runbooks (`l2-runbooks/`) are annotated with "(available after Phase 6)" — this is by design, not a stub

---

## Human Verification Required

The following items cannot be verified programmatically:

### 1. Markdown anchor resolution

**Test:** Open `docs/error-codes/00-index.md`, click any Category link (e.g., `01-mdm-enrollment.md#0x80180014`). Verify the anchor navigates to the correct table row.
**Expected:** Browser or Markdown renderer jumps to the row for that code.
**Why human:** Anchor target `#0x80180014` depends on the renderer generating heading/row IDs from table content — not all renderers do this for table rows. If anchors don't resolve, links will still open the correct file but won't scroll to the exact row.

### 2. Cross-file navigation chain

**Test:** Starting from `00-index.md`, follow the Category link for Event 171, then follow the link to `02-tpm-attestation.md` in that row's L1 Action cell. Verify the path resolves without 404.
**Expected:** Seamless navigation: index → `05-hybrid-join.md` → `02-tpm-attestation.md`
**Why human:** Relative path resolution (`../`) depends on how files are served or rendered; programmatic grep confirms links exist but not that relative paths resolve correctly in the deployment environment.

### 3. Table readability at narrow viewport

**Test:** Open any category file on a mobile browser or narrow window. Verify the 7-column table is readable (horizontal scroll or responsive layout).
**Expected:** Table scrolls horizontally without breaking layout.
**Why human:** Visual/UX quality check not verifiable programmatically.

---

## Summary

All 13 observable truths are verified. All 6 required artifacts exist with substantive content and correct wiring. All 6 ERRC requirements are satisfied with evidence. No blocker anti-patterns found.

The phase goal — "comprehensive error code reference documentation covering all major Autopilot failure categories with diagnostic steps and remediation actions" — is achieved:

- 6 files covering all documented Autopilot failure categories
- 29 indexed error codes and event IDs (23 hex + 6 event IDs)
- All entries include cause, L1 action, and L2 fix
- Multi-cause pattern implemented for 0x80180014 (MDM) and 0x801c03ea (TPM)
- Hardware-specific notes present for 5 TPM hardware variants
- Cross-reference pattern avoids content duplication between category files
- Master index enables single-page Ctrl+F lookup

Three items flagged for human verification are cosmetic/navigational concerns (anchor resolution, relative path resolution, mobile layout) — none affect the core documentation content or goal achievement.

---

_Verified: 2026-03-15_
_Verifier: Claude (gsd-verifier)_
