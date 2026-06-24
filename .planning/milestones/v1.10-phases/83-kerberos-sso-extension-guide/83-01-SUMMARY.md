---
phase: 83-kerberos-sso-extension-guide
plan: "01"
subsystem: docs
tags: [kerberos-sso, mobileconfig, intune-custom-template, platform-sso, documentation]
dependency_graph:
  requires: []
  provides: [docs/admin-setup-macos/10-kerberos-sso-extension.md (through Prerequisites section)]
  affects: [83-02 (appends to same file)]
tech_stack:
  added: []
  patterns: [suite-frontmatter, platform-gate-header, disambiguation-table, mobileconfig-xml, bounded-callout]
key_files:
  created:
    - docs/admin-setup-macos/10-kerberos-sso-extension.md
  modified: []
decisions:
  - "TeamIdentifier shown as literal string apple with explicit note that numeric App Store Team IDs are never correct (Pitfall 1 prevention without including the forbidden string in the file)"
  - "Redirect appears in disambiguation/callout context only -- never as the Kerberos profile Type value (K-5 prevention)"
  - "UBF8T346G9 entirely excluded from the file -- pitfall warning reworded to describe it as a numeric App Store Team ID without naming the literal string (acceptance criteria enforcement)"
metrics:
  duration: "~15 minutes"
  completed: "2026-06-22"
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 0
---

# Phase 83 Plan 01: Kerberos SSO Extension Guide Head Summary

**One-liner:** New guide 10 head through Prerequisites: Apple Kerberos SSO extension identity (`com.apple.AppSSOKerberos.KerberosExtension`, Type Credential, Team `apple`), verified on-prem .mobileconfig plist, Intune Custom Template upload steps, three-way disambiguation box, and bounded AD callout with macOS 14.6 / Company Portal 5.2408.0 prerequisites.

## What Was Built

Created `docs/admin-setup-macos/10-kerberos-sso-extension.md` through the Prerequisites section (175 lines). Plan 83-02 will append the PSSO TGT integration, Cloud Kerberos, diagnostics, Verification, See Also, and version-history sections to this same file.

**Task 1 -- frontmatter, platform-gate header, disambiguation box:**
- YAML frontmatter with all five suite keys in correct order: `last_verified: 2026-06-22`, `review_by: 2026-09-22`, `applies_to: ADE`, `audience: admin`, `platform: macOS`
- Three-line platform-gate blockquote with `**Platform gate:**` bold label, PSSO Setup link (07-platform-sso-setup.md), and glossary link (../_glossary-macos.md)
- H1 title "macOS Kerberos SSO Extension" with intro paragraph
- `## What This Guide Is NOT` disambiguation table: 3-row table with `com.apple.AppSSOKerberos.KerberosExtension` (Credential, Apple-native) vs `com.microsoft.CompanyPortalMac.ssoextension` (Redirect, Microsoft) vs Microsoft Enterprise SSO plug-in (umbrella product)
- Explicit K-1/K-2/K-5 key distinctions callout section

**Task 2 -- extension identity, payload, Custom Template deployment:**
- Payload key-value reference table (12 rows) covering all required keys with pitfall warnings
- Side-by-side Extension Identifier comparison table (Apple Kerberos vs Microsoft PSSO) clearly labeled "USE THIS for Kerberos"
- K-1 callout (wrong identifier) and K-5 callout (Redirect vs Credential type)
- Full verified on-prem .mobileconfig XML plist (verbatim from Microsoft Learn 2026-06-15) as fenced code block, with admin instructions to replace placeholder UUIDs
- Intune Custom Template upload steps (Templates > Custom path; user groups not device groups)

**Task 3 -- bounded on-prem AD callout + Prerequisites:**
- `## Prerequisites` section with four `**Label:**` bullets
- macOS 14.6 Sonoma floor (D-03); macOS 10.15 standalone noted as out-of-scope (D-02)
- Company Portal 5.2408.0 for PSSO TGT sharing; 2508 gate forward-referenced for custom_tgt_setting
- Pitfall-5 ordering note: `usePlatformSSOTGT: true` has no effect before PSSO is registered
- Bounded AD callout (`> **On-Premises AD / KDC Prerequisites**`) -- one paragraph only, links to both Apple developer.apple.com and Microsoft learn.microsoft.com; no nltest/SRV/DC/OU/forest content (K-4 ban enforced)

## Commits

| Task | Commit | Files | Description |
|------|--------|-------|-------------|
| 1 | 447425a | `docs/admin-setup-macos/10-kerberos-sso-extension.md` (create) | Frontmatter, platform-gate header, disambiguation box |
| 2 | c929ce8 | `docs/admin-setup-macos/10-kerberos-sso-extension.md` (append) | Extension identity, payload, Custom Template deployment, identifier comparison |
| 3 | ef3f6eb | `docs/admin-setup-macos/10-kerberos-sso-extension.md` (append) | Bounded on-prem AD callout + Prerequisites section |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Accuracy] Removed forbidden string `UBF8T346G9` from Pitfall 1 warning text**
- **Found during:** Task 2 post-write verification
- **Issue:** The acceptance criteria require `grep -c 'UBF8T346G9' file` returns 0 -- the string must not appear at all. The initial draft included the Microsoft Company Portal Team ID literally in the pitfall warning to show admins what NOT to use.
- **Fix:** Rewrote the TeamIdentifier pitfall warning to describe it as "a numeric App Store Team ID" without naming the literal string. The warning still conveys the exact same protection without violating the acceptance criteria.
- **Files modified:** `docs/admin-setup-macos/10-kerberos-sso-extension.md` (two lines)
- **Commit:** c929ce8

None other -- plan executed as written.

## Known Stubs

The file contains two intentional placeholder references:
- `PayloadUUID` and `PayloadIdentifier` sample values (`1aaaaaa1-2bb2-3cc3-4dd4-5eeeeeeeeee5`) -- these are the Microsoft Learn sample placeholders. The guide instructs admins to replace these with their own generated UUIDs before uploading. This is correct, intentional guidance per RESEARCH.md Security Domain requirements.

These are NOT content stubs -- they are correct admin instructions and do not prevent the plan's goal from being achieved.

## Threat Flags

No new threat surface introduced. This is a documentation-only plan. The guide contains only placeholder values (CONTOSO.COM, sample UUIDs) -- no real tenant/credential data. No executable code, network endpoints, auth paths, file access patterns, or schema changes are introduced.

## Success Criteria Evaluation

- [x] KRB-01 delivered through the Prerequisites section: extension identity, payload type, Intune Custom Template deployment, realm/KDC bounded prerequisite, three-way disambiguation
- [x] File left in a state that 83-02 can append to (no `## See Also` or version-history table yet)
- [x] Accuracy literals present: `com.apple.AppSSOKerberos.KerberosExtension`, `Type Credential`, `TeamIdentifier apple`, `CONTOSO.COM`, `.contoso.com`
- [x] Forbidden literals absent: no `UBF8T346G9`, no em-dash `—`, no `nltest`
- [x] Suite conventions honored: ` -- ` double-dash, backtick code-spans for identifiers
- [x] File exceeds 90-line minimum (175 lines)
- [x] Both external links present: developer.apple.com and learn.microsoft.com

## Self-Check: PASSED

All created files exist and commits are present:
- `docs/admin-setup-macos/10-kerberos-sso-extension.md`: EXISTS (175 lines)
- Commit 447425a: Task 1 -- frontmatter, platform-gate, disambiguation
- Commit c929ce8: Task 2 -- extension identity, payload, identifier comparison
- Commit ef3f6eb: Task 3 -- prerequisites + bounded AD callout
