---
phase: 83-kerberos-sso-extension-guide
plan: "02"
subsystem: docs/admin-setup-macos
tags: [kerberos, psso, tgt-integration, cloud-kerberos, diagnostics, macos]
dependency_graph:
  requires: ["83-01"]
  provides: ["KRB-02", "KRB-03"]
  affects: ["docs/admin-setup-macos/10-kerberos-sso-extension.md"]
tech_stack:
  added: []
  patterns:
    - "Suite-conformant Markdown guide with YAML frontmatter, platform-gate header, See Also, version-history table"
    - "Double-dash ` -- ` em-dash convention throughout"
    - "Backtick code-spans for all identifiers, commands, key names"
    - "Configuration-Caused Failures table with 4-column format (Misconfiguration | Portal | Symptom | Runbook)"
key_files:
  modified:
    - docs/admin-setup-macos/10-kerberos-sso-extension.md
decisions:
  - "app-sso diagnose: 0 occurrences in file -- prohibited command guard enforced throughout all three tasks"
  - "kdestroy: 0 occurrences -- removal from initial diagnostics-scope callout (originally mentioned by name; reworded to omit the command string itself)"
  - "custom_tgt_setting placement tagged [ASSUMED] with executor confirmation note per RESEARCH open question A4"
  - "Cloud Kerberos callout tagged [ASSUMED -- re-verify status] per RESEARCH A3"
  - "klist pinned to bare form -- klist -v explicitly excluded from all examples and steps (D-11)"
  - "Standalone Kerberos-without-PSSO appears only as a brief note, never a co-equal path (D-02)"
metrics:
  duration: "~15 minutes"
  completed_date: "2026-06-23"
  tasks_completed: 3
  files_modified: 1
---

# Phase 83 Plan 02: Kerberos SSO Extension Guide (Part 2) Summary

**One-liner:** Completed guide 10 with PSSO TGT integration (usePlatformSSOTGT, custom_tgt_setting, macOS 14.6 floor, cosmetic "Not signed in" note), Cloud Kerberos limited-preview callout (KERBEROS.MICROSOFTONLINE.COM, azurefiles@microsoft.com), and locked diagnostic pair (app-sso platform -s + klist with tgt_ad/tgt_cloud interpretation).

## What Was Built

Plan 83-02 appended four major sections to `docs/admin-setup-macos/10-kerberos-sso-extension.md`, completing the guide started by 83-01.

### Task 1 -- PSSO + Kerberos TGT Integration + Cloud Kerberos Preview Callout (commit 3397b75)

**`## Configuration: PSSO + Kerberos TGT Integration`** section (KRB-02):
- Documents `usePlatformSSOTGT: true` with macOS 14.6 floor and PSSO-first ordering constraint (Pitfall 5)
- Key settings table for PSSO-combined deployments: `performKerberosOnly`, `syncLocalPassword`, `allowPlatformSSOAuthFallback`
- `custom_tgt_setting` values table (0=both, 1=on-prem only, 2=cloud only, 3=none) with Company Portal 2508+ gate
- Pitfall-4 placement warning: key belongs in PSSO Settings Catalog policy ExtensionData, NOT Kerberos .mobileconfig; tagged `[ASSUMED]` per RESEARCH A4
- Cosmetic "Not signed in" menu-bar note: explicitly labeled non-failure, instructs admins to trust `app-sso platform -s` over menu-bar display (D-12)
- Brief note that standalone Kerberos-without-PSSO exists but is outside v1.10 scope (D-02)

**`## Configuration: Cloud Kerberos Profile (Limited Preview)`** section (D-04):
- LIMITED PREVIEW callout (not GA, not primary path)
- Realm `KERBEROS.MICROSOFTONLINE.COM` (ALL CAPS), Hosts `["windows.net", ".windows.net"]`, `preferredKDCs` kkdcp:// endpoint
- `azurefiles@microsoft.com` onboarding contact
- `[ASSUMED -- re-verify status]` note per RESEARCH A3
- Explains Cloud Kerberos profile is separate from on-prem profile, not replacing it

### Task 2 -- Verification + Configuration-Caused Failures (commit 1e5396e)

**`## Verification`** section (KRB-03):
- `app-sso platform -s` documented as Step 1 with output interpretation table: `tgt_ad` = on-prem AD TGT functioning; `tgt_cloud` = Cloud Kerberos available; neither = misconfiguration or PSSO incomplete
- `klist` documented as Step 2 in version-stable bare form; `klist -v` explicitly excluded (D-11)
- Service principal examples: `krbtgt/CONTOSO.COM@CONTOSO.COM` (on-prem) and `krbtgt/KERBEROS.MICROSOFTONLINE.COM@KERBEROS.MICROSOFTONLINE.COM` (cloud)
- Cosmetic "Not signed in" disambiguation repeated (D-12) -- trust `app-sso platform -s`, not menu-bar display
- One-sentence ticket-lifecycle note: proactive renewal on network state change; KDC-set TTL (typically 10 hours)
- Intune-admin-level realm/KDC reachability checklist (profile assignment, PSSO registration, Company Portal version, KDC escalation path to AD team)

**`## Configuration-Caused Failures`** table:
- Row 1: Type: Redirect instead of Credential -- silent TGT failure
- Row 2: Wrong ExtensionIdentifier (Microsoft PSSO value) -- extension never loads
- Row 3: usePlatformSSOTGT: true without PSSO registered -- no tgt_ad
- Runbook column: `-- (Phase 85)` placeholder for L2 runbook #28

**Deviation (Rule 1 -- auto-fix):** Initial draft of the diagnostics-scope callout mentioned `app-sso diagnose` and `kdestroy` by name in a prohibition notice, causing grep count = 1 for each (failing the plan's automated `[ "$(grep -c ...)" = "0" ]` gate). Reworded the callout to convey the same prohibition without naming the banned commands as code-span identifiers. Zero-occurrence gates now pass.

### Task 3 -- See Also + Version-History Table (commit bada112)

**`## See Also`** section:
- Cross-links to guides 07, 08, 09 with double-dash descriptions
- Glossary links: `#kerberos-sso-extension`, `#platform-sso`, `#enterprise-sso-plug-in`
- External links: Apple Developer Docs (ExtensibleSingleSignOnKerberos) + Microsoft Learn (Kerberos-PSSO tutorial)

**Closing version-history table** (final element per D-07):
- Single initial row: `| 2026-06-22 | Phase 83 (KRB-01..04): initial Kerberos SSO Extension guide | -- |`
- Author column `--` per suite convention

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Reworded diagnostics-scope callout to satisfy zero-occurrence gate for app-sso diagnose and kdestroy**
- **Found during:** Task 2 post-write verification
- **Issue:** The initial diagnostics-scope warning callout referenced `app-sso diagnose` and `kdestroy` by name in backtick code-spans to explain what admins must NOT use. The plan's automated verify block requires `grep -c 'app-sso diagnose' ... = "0"` and `grep -c 'kdestroy' ... = "0"`, which counts any occurrence including prohibition notices.
- **Fix:** Rewrote the callout to convey the prohibition (read-only commands only; avoid write-operations) without naming the banned commands as identifiable code-span strings. `kinit` retained as a named "do not use" example (not a prohibited-occurrence item in the verify block).
- **Files modified:** `docs/admin-setup-macos/10-kerberos-sso-extension.md`
- **Commit:** 1e5396e (included in Task 2 commit after inline fix)

## Known Stubs

None. All sections are substantively authored with real content. The `-- (Phase 85)` Runbook placeholder in the Configuration-Caused Failures table is an intentional tracked stub -- the L2 Kerberos runbook #28 is explicitly out of scope for Phase 83 and scoped to Phase 85 per CONTEXT.md and the plan's design.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan produces documentation only. The STRIDE mitigations T-83-03 and T-83-04 are satisfied:

- **T-83-03 (unsafe CLI guidance):** `app-sso diagnose` = 0 occurrences; `kdestroy` = 0 occurrences; `klist` pinned to version-stable bare form; only read-only diagnostics published.
- **T-83-04 (incorrect guidance):** `custom_tgt_setting` placement tagged `[ASSUMED]` with confirmation instruction; Cloud Kerberos preview status flagged for re-verification at deploy time.

## Self-Check: PASSED

**Files exist:**
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` -- FOUND (337 lines, >= 200 minimum)
- `.planning/phases/83-kerberos-sso-extension-guide/83-02-SUMMARY.md` -- FOUND (this file)

**Commits exist:**
- 3397b75: docs(83-02): PSSO + Kerberos TGT integration + Cloud Kerberos preview callout
- 1e5396e: docs(83-02): Verification + diagnostics + Configuration-Caused Failures table
- bada112: docs(83-02): See Also section + version-history table (guide 10 complete)

**Acceptance criteria:**
- `## Configuration: PSSO + Kerberos TGT Integration` heading: PRESENT
- `usePlatformSSOTGT` with macOS `14.6` floor: PRESENT
- `custom_tgt_setting` values table (0/1/2/3): PRESENT
- Pitfall-4 placement warning tagged `[ASSUMED]`: PRESENT
- Company Portal `2508` gate: PRESENT
- Cosmetic "Not signed in" note -- labeled cosmetic/not-a-failure: PRESENT
- `## Configuration: Cloud Kerberos Profile (Limited Preview)` heading: PRESENT
- Realm `KERBEROS.MICROSOFTONLINE.COM` ALL CAPS: PRESENT
- `limited preview` wording: PRESENT
- `azurefiles@microsoft.com` contact: PRESENT
- Re-verify-status note: PRESENT
- Standalone-without-PSSO as out-of-scope note only (D-02): PRESENT
- `## Verification` heading: PRESENT
- `app-sso platform -s` and `klist` canonical pair (D-10): PRESENT
- `tgt_ad` and `tgt_cloud` interpretation: PRESENT
- `klist` bare form; `klist -v` NOT presented (D-11): SATISFIED
- Cosmetic "Not signed in" in Verification; ticket-lifecycle note; KDC reachability note: PRESENT
- `app-sso diagnose` count = 0: SATISFIED
- `kdestroy` count = 0: SATISFIED
- `kinit` not as a diagnostic step: SATISFIED
- `## Configuration-Caused Failures` table with 3 rows + `-- (Phase 85)`: PRESENT
- `## See Also` with guides 07, 08, 09 + glossary links + external links: PRESENT
- Version-history table (final element) with Phase 83 KRB-01..04 row: PRESENT
- em-dash `—` count = 0: SATISFIED
- `com.apple.AppSSOKerberos.KerberosExtension` present: SATISFIED
- `UBF8T346G9` count = 0: SATISFIED
- min_lines 200: SATISFIED (337 lines)
- `_glossary-macos.md#kerberos-sso-extension` See Also link: PRESENT
- `09-enterprise-sso-plugin-migration.md` See Also link: PRESENT
