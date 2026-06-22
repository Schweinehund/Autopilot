---
phase: 81-nav-hub-integration
plan: 01
subsystem: documentation
tags: [macos, platform-sso, navigation, append-only, nav-hub]

requires:
  - phase: 80-l1-l2-runbooks
    provides: L1 runbooks #35/#36 and L2 runbook #27 that the nav rows link to
  - phase: 76-platform-sso-admin-setup
    provides: Guide 07 (platform-sso-setup.md) referenced in Admin Setup nav row
  - phase: 77-auth-methods-deep-dive
    provides: Guide 08 (auth-methods-deep-dive.md) referenced in Admin Setup nav row
  - phase: 78-legacy-sso-plugin-migration
    provides: Guide 09 (enterprise-sso-plugin-migration.md) referenced in Admin Setup nav row

provides:
  - Three Platform SSO grouped rows appended to docs/index.md macOS Provisioning tables (Admin Setup, L1, L2)
  - Platform SSO Sign-In Failure H3 routing entry in docs/common-issues.md macOS section
  - Two SSO escalation trigger bullets in docs/quick-ref-l1.md macOS section
  - Two SSO runbook links in docs/quick-ref-l1.md macOS section
  - Platform SSO Log Paths sub-section in docs/quick-ref-l2.md
  - Verbatim `app-sso platform -s` attestation command in docs/quick-ref-l2.md
  - L2 #27 investigation runbook bullet in docs/quick-ref-l2.md

affects:
  - 81-02 (decision-tree SSO leaf)
  - 81-03 (cross-link E2/E3/E4/E8 wiring)
  - 81-04 (crosslink closure checklist)
  - 82-harness-lineage (terminal re-audit)

tech-stack:
  added: []
  patterns:
    - "append-only nav hub wiring: new grouped rows appended after last existing row in table, before section boundary"
    - "grouped-row house style: single row per topic group with multi-item When-to-Use cell"
    - "D-04 guardrail: Admin Setup SSO row names all three guides 07/08/09 by topic"

key-files:
  created: []
  modified:
    - docs/index.md
    - docs/common-issues.md
    - docs/quick-ref-l1.md
    - docs/quick-ref-l2.md

key-decisions:
  - "D-04 honored: one grouped row per macOS table in index.md (Admin Setup / L1 / L2) matching established house style"
  - "Admin Setup row When-to-Use cell names all three guides by topic (guide 07 setup / guide 08 auth-methods / guide 09 legacy SSO migration)"
  - "app-sso platform -s reproduced verbatim in quick-ref-l2.md; security find-certificate absent"
  - "Platform SSO entry in common-issues.md placed as H3 inside macOS section, before iOS boundary, no banner (house-style)"

patterns-established:
  - "Navigation-last: all prior-phase content (guides/runbooks) must exist before hub is touched"
  - "Version History rows prepended as newest-first in each file's Version History table"

requirements-completed: [SSOREF-04]

duration: 6min
completed: 2026-06-22
---

# Phase 81 Plan 01: Nav Hub Integration (index.md + common-issues + quick-refs) Summary

**Append-only wiring of Platform SSO guides 07/08/09 and runbooks #35/#36/#27 into four reader-facing nav hubs via grouped-row table entries, macOS failure-scenario routing, and SSO escalation triggers with the verbatim `app-sso platform -s` attestation command.**

## Performance

- **Duration:** 6 min
- **Started:** 2026-06-22T13:08:00Z
- **Completed:** 2026-06-22T13:14:00Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Three Platform SSO grouped rows appended to `docs/index.md` macOS Provisioning sub-tables (Admin Setup, L1, L2) per D-04; Admin Setup row names guides 07/08/09 by topic; L1 row names #35/#36; L2 row names #27
- Platform SSO Sign-In Failure H3 entry appended to `docs/common-issues.md` macOS section (before iOS boundary), routing to L1 #35 and L2 #27 with four root-cause summary
- SSO escalation triggers (#36 Secure Enclave key error, #35 sign-in loop) and two runbook links added to `docs/quick-ref-l1.md` macOS section
- Platform SSO Log Paths sub-section + verbatim `app-sso platform -s` attestation command + L2 #27 runbook link added to `docs/quick-ref-l2.md` macOS section; `security find-certificate` absent
- Version History rows appended to all four files dated 2026-06-22

## Appended Content Reference

### docs/index.md — Three new rows

**L1 row (appended after `[L1 Quick-Reference Card]` at ~line 109):**
```
| [macOS Platform SSO Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Platform SSO sign-in failure (runbook #35: "Registration Required" not appearing) or Secure Enclave key loss after password reset (runbook #36) |
```

**L2 row (appended after `[L2 Quick-Reference Card]` at ~line 121):**
```
| [macOS Platform SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | PSSO registration failure or Password-sync failure investigation (runbook #27) |
```

**Admin Setup row (appended after `[macOS Admin Setup Guides]` at ~line 129):**
```
| [macOS Platform SSO Admin Setup Guides](admin-setup-macos/00-overview.md) | Platform SSO deployment (guide 07: setup), authentication method selection and deep-dive (guide 08: Secure Enclave key, Password sync, Smart card), and legacy SSO plug-in migration (guide 09) |
```

**Version History:**
```
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO rows to macOS Admin Setup / L1 / L2 nav tables | -- |
```

### docs/common-issues.md — New H3 entry

**Appended after `### Company Portal Sign-In Failure` entry, before `## iOS/iPadOS Failure Scenarios`:**
```
### Platform SSO Sign-In Failure

Platform SSO "Registration Required" notification never appeared despite Intune reporting Succeeded, or Platform SSO sign-in is failing after registration.

- **L1:** [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) — four root causes: old Company Portal, Error 10002 legacy conflict, mistyped registration token, dismissed notification
- **L2:** [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)
```

**Version History:**
```
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO Sign-In Failure entry routing to L1 #35 / L2 #27 | -- |
```

### docs/quick-ref-l1.md — Two escalation triggers + two runbook links

**Escalation triggers (appended after last existing bullet in `### macOS Escalation Triggers`):**
```
- Secure Enclave key error after password reset or FileVault recovery --> **Escalate L2** via [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) first; escalate to L2 if re-registration fails (collect: serial number, macOS version, `app-sso platform -s` output)
- Platform SSO sign-in loop or "Registration Required" notification never appeared --> **Use [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) runbook** (collect: Intune Succeeded screenshot, Company Portal version, `app-sso platform -s` output)
```

**Runbook links (appended after `[Company Portal Sign-In]` bullet in `### macOS Runbooks`):**
```
- [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) — "Registration Required" not appearing, sign-in loop
- [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) — key loss after password reset
```

**Version History:**
```
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO escalation triggers (#36 Secure Enclave, #35 sign-in loop) and runbook links to macOS section | -- |
```

### docs/quick-ref-l2.md — Log paths + attestation command + runbook bullet

**Platform SSO Log Paths sub-section (appended after `Full reference:` line in `### Critical Log Paths`, before `### macOS Investigation Runbooks`):**
```
### Platform SSO Log Paths

| Path | Purpose |
|------|---------|
| `/Library/Logs/Microsoft/CompanyPortal/CompanyPortal*.log` | Company Portal PSSO registration events |
| `/var/log/DiagnosticMessages` | System-level SSO framework messages (search for `ssoextension`) |

#### Platform SSO Attestation Command

Verify PSSO registration state -- run on the affected Mac:

```bash
app-sso platform -s
```

Expected healthy output includes both `Device Registration: REGISTERED` and `User Registration: REGISTERED` with SSO tokens listed. See [07-platform-sso-setup.md — Verification](admin-setup-macos/07-platform-sso-setup.md) for the full expected output format.
```

**Investigation runbook bullet (appended after `[Compliance Evaluation Investigation]` bullet):**
```
- [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) -- PSSO registration failure and Password-sync failure investigation
```

**Version History:**
```
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO Log Paths section + app-sso platform -s attestation command + L2 #27 investigation runbook bullet to macOS section | -- |
```

## Task Commits

Each task was committed atomically:

1. **Task 1: Append three Platform SSO grouped rows to docs/index.md macOS Provisioning tables** - `ccdc0dc` (feat)
2. **Task 2: Append Platform SSO failure entry to docs/common-issues.md macOS section** - `0591d55` (feat)
3. **Task 3: Append SSO triggers + log paths + app-sso command to quick-ref-l1.md and quick-ref-l2.md** - `52eec7a` (feat)

## Files Created/Modified

- `docs/index.md` — Three Platform SSO grouped rows appended to macOS Admin Setup / L1 / L2 tables + Version History row
- `docs/common-issues.md` — Platform SSO Sign-In Failure H3 entry appended to macOS section + Version History row
- `docs/quick-ref-l1.md` — Two SSO escalation trigger bullets + two runbook links appended to macOS section + Version History row
- `docs/quick-ref-l2.md` — Platform SSO Log Paths sub-section + app-sso platform -s command + L2 #27 bullet appended + Version History row

## Decisions Made

- D-04 honored: one grouped row per macOS table (Admin Setup / L1 / L2) matching established grouped-row house style; no per-guide rows
- Admin Setup row `When to Use` cell names all three guides 07/08/09 by topic as required by D-04 GUARDRAIL
- `app-sso platform -s` reproduced verbatim as the canonical attestation command; `security find-certificate` never introduced
- Platform SSO entry in common-issues.md placed as plain H3 with no `> **macOS:**` banner (house-style: banners not used on section-internal H3 entries)
- Version History rows inserted at top (newest-first) of each file's Version History table

## Deviations from Plan

None — plan executed exactly as written. All three tasks executed append-only; automated verification assertions all passed.

Note on acceptance criteria: The plan's Task 1 acceptance criteria expected `grep -c "macOS Admin Setup Guides\](admin-setup-macos/00-overview.md)"` to return 2 (original + new row). In practice this returns 1 — the new row link text is `macOS Platform SSO Admin Setup Guides` (not `macOS Admin Setup Guides`), so the substring does not match both. The original row is byte-unchanged (confirmed by diff). All three primary acceptance checks (`grep -c` = 1 for each of the three SSO rows) pass; the "returns 2" check is a false expectation in the plan that doesn't affect correctness.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required. Documentation-only changes.

## Next Phase Readiness

- Plan 81-01 complete: all four reader-facing nav hubs (index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md) updated with Platform SSO content
- Plan 81-02 can proceed: decision-tree SSO leaf (06-macos-triage.md D-01 wiring)
- Plan 81-03 can proceed: cross-link E2/E3/E4/E8 creation (revised D-03)
- Plan 81-04 can proceed: 81-CROSSLINK-CLOSURE.md checklist creation (D-02)

## Known Stubs

None — all nav entries link to existing committed files (guides 07/08/09, runbooks #35/#36/#27); no placeholder text or TODO stubs introduced.

## Threat Flags

None — documentation-only append-only changes; no executable code, network surface, auth paths, or data persistence introduced.

## Self-Check: PASSED

Files modified confirmed present:
- docs/index.md: contains 1 occurrence each of "macOS Platform SSO Admin Setup Guides", "macOS Platform SSO Runbooks", "macOS Platform SSO Investigation" ✓
- docs/common-issues.md: contains 1 occurrence of "### Platform SSO Sign-In Failure" ✓
- docs/quick-ref-l1.md: contains "35-macos-sso-sign-in-failure" and "36-macos-secure-enclave-key" ✓
- docs/quick-ref-l2.md: contains "app-sso platform -s", "27-macos-sso-investigation"; "security find-certificate" absent ✓

Commits confirmed:
- ccdc0dc: feat(81-01): append Platform SSO grouped rows to macOS Admin Setup / L1 / L2 nav tables in index.md ✓
- 0591d55: feat(81-01): append Platform SSO Sign-In Failure entry to macOS section of common-issues.md ✓
- 52eec7a: feat(81-01): append SSO escalation triggers, log paths, and attestation command to quick-ref-l1 and quick-ref-l2 ✓

---
*Phase: 81-nav-hub-integration*
*Completed: 2026-06-22*
