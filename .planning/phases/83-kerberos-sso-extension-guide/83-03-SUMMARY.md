---
phase: 83-kerberos-sso-extension-guide
plan: "03"
subsystem: documentation
tags: [kerberos, sso, cross-links, surgical-edit, glossary, overview]
dependency_graph:
  requires: []
  provides: [KRB-04]
  affects:
    - docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
    - docs/admin-setup-macos/00-overview.md
    - docs/_glossary-macos.md
tech_stack:
  added: []
  patterns:
    - Suite surgical-edit convention (frontmatter date refresh + version-history row)
    - Double-dash ` -- ` em-dash substitute
    - Mermaid sibling-descent topology (G --> H, G --> I, G --> J)
key_files:
  modified:
    - docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
    - docs/admin-setup-macos/00-overview.md
    - docs/_glossary-macos.md
decisions:
  - "Arrow source for guide 10 Mermaid node is G (Platform SSO, guide 07), not I (guide 09) -- per A2 topology: guide 10 depends on PSSO, not on Enterprise SSO Migration"
  - "Em-dashes in pre-existing glossary entries (Platform SSO, Secure Enclave, Enterprise SSO Plug-in) left unchanged -- only new Kerberos SSO Extension entry uses ` -- ` per suite convention"
metrics:
  duration_seconds: 277
  completed_date: "2026-06-22"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 3
---

# Phase 83 Plan 03: KRB-04 Cross-Link Surgical Edits Summary

**One-liner:** Three surgical edits anchoring the new Kerberos SSO Extension guide into the suite -- guide 09 deferred-note replaced with live forward link, 00-overview extended with Mermaid node J and bullet item 10, glossary given a Kerberos SSO Extension entry under `## Authentication`.

## Tasks Completed

| Task | Name | Commit | Files Changed |
|------|------|--------|---------------|
| 1 | Guide 09 forward-link replacement (line 148) | `1019cc1` | `09-enterprise-sso-plugin-migration.md` |
| 2 | 00-overview.md Mermaid node J + bullet item 10 | `2534f5f` | `00-overview.md` |
| 3 | Glossary Kerberos SSO Extension entry + Alphabetical Index | `11dfb03` | `_glossary-macos.md` |

## Changes Made

### Task 1: Guide 09 Forward-Link Replacement

**File:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md`

- Replaced the PSSO-FUT-04 deferred-note sentence (line 148) with: "For the full Kerberos SSO extension configuration guide (payload walkthrough, Extension Identifier values, PSSO TGT integration, and diagnostics), see [Kerberos SSO Extension](10-kerberos-sso-extension.md)."
- The three preceding coexistence paragraphs (lines 142-146) are byte-unchanged.
- PSSO-FUT-04 token count: 0 (confirmed by grep).
- Appended version-history row: `Phase 83 (KRB-04): replaced deferred-note sentence with forward link to guide 10`.
- Updated frontmatter: `last_verified: 2026-06-22`, `review_by: 2026-09-22`.

### Task 2: 00-overview.md Mermaid Node J + Bullet Item 10

**File:** `docs/admin-setup-macos/00-overview.md`

- Added Mermaid line `  G --> J[10. Kerberos SSO<br/>Extension]` after the `G --> I` line. Arrow source is G (Platform SSO, guide 07) -- matching sibling-descent topology `G --> H`, `G --> I`, `G --> J`. Uses `<br/>` (not `<br>`).
- Added numbered bullet item 10 after item 9, before `## Cross-Platform References`: full description naming `com.apple.AppSSOKerberos.KerberosExtension`, `usePlatformSSOTGT`, `app-sso platform -s` / `klist`.
- Appended version-history row: `Phase 83 (KRB-04): added guide 10 node to Mermaid diagram and item 10 to numbered list`.
- Updated frontmatter: `last_verified: 2026-06-22`, `review_by: 2026-09-22`.

### Task 3: Glossary Kerberos SSO Extension Entry + Alphabetical Index

**File:** `docs/_glossary-macos.md`

- Added `### Kerberos SSO Extension` entry under `## Authentication`, after the Enterprise SSO Plug-in entry, before the `---` rule that precedes `## Version History`.
- Entry body contains: `com.apple.AppSSOKerberos.KerberosExtension`, payload Type: Credential, Team Identifier: `apple`, `usePlatformSSOTGT: true`, macOS 14.6 floor for PSSO TGT integration, macOS 10.15 standalone (out of scope).
- Entry `> See also:` line links `#platform-sso`, `#enterprise-sso-plug-in`, and `admin-setup-macos/10-kerberos-sso-extension.md`.
- Added `[Kerberos SSO Extension](#kerberos-sso-extension)` to Alphabetical Index line between `[Jailbreak Detection](#jailbreak-detection)` and `[MAM-WE](#mam-we)` (K between J and M).
- Appended version-history row: `Phase 83 (KRB-04): added Kerberos SSO Extension entry to ## Authentication and Alphabetical Index`.
- Updated frontmatter: `last_verified: 2026-06-22`, `review_by: 2026-09-22`.
- New Kerberos SSO Extension entry uses ` -- ` (double-dash) convention throughout. The 5 em-dashes present in the file are all in pre-existing entries (Platform SSO, Secure Enclave, Enterprise SSO Plug-in) -- not introduced by this plan.

## Deviations from Plan

None -- plan executed exactly as written. All three surgical edits were scoped precisely to the targeted lines. No other prose in any file was altered.

## Verification Results

All automated acceptance criteria passed:

```
Guide 09:
  PASS: [Kerberos SSO Extension](10-kerberos-sso-extension.md) present
  PASS: PSSO-FUT-04 count = 0
  PASS: version-history row present

00-overview.md:
  PASS: G --> J[10. Kerberos SSO<br/>Extension] present
  PASS: 10. **[Kerberos SSO Extension](10-kerberos-sso-extension.md)** present
  PASS: version-history row present

_glossary-macos.md:
  PASS: ### Kerberos SSO Extension entry present
  PASS: [Kerberos SSO Extension](#kerberos-sso-extension) in Alphabetical Index
  PASS: admin-setup-macos/10-kerberos-sso-extension.md link present
  PASS: version-history row present
  PASS: com.apple.AppSSOKerberos.KerberosExtension in entry
  PASS: usePlatformSSOTGT in entry
  PASS: 14.6 in entry

DI-1 Scope Guard:
  PASS: no nav-hub files touched (docs/index.md, common-issues.md, quick-ref-l2.md)
```

## Known Stubs

None -- this plan does not create user-visible UI or data endpoints. The forward link in guide 09 points to `10-kerberos-sso-extension.md`, which is authored in plan 83-01 (same phase, wave 1 parallel execution).

## Threat Flags

None -- no new network endpoints, auth paths, file access patterns, or schema changes introduced. Documentation-only surgical edits.

## Self-Check: PASSED

- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` -- FOUND (modified)
- `docs/admin-setup-macos/00-overview.md` -- FOUND (modified)
- `docs/_glossary-macos.md` -- FOUND (modified)
- Commit `1019cc1` -- FOUND (git log confirmed)
- Commit `2534f5f` -- FOUND (git log confirmed)
- Commit `11dfb03` -- FOUND (git log confirmed)
