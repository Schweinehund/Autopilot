---
phase: 76-platform-sso-admin-setup-guide
plan: "01"
subsystem: docs/admin-setup-macos
tags: [platform-sso, macos, intune, documentation, psso]
dependency_graph:
  requires: [75-glossary-lifecycle-foundation-stub-correction]
  provides: [07-platform-sso-setup.md, 03-stub-live-link]
  affects: [docs/admin-setup-macos/07-platform-sso-setup.md, docs/admin-setup-macos/03-configuration-profiles.md]
tech_stack:
  added: []
  patterns: [corpus-outer-skeleton, hard-bordered-callout, deferred-code-span-pattern, dual-field-table, version-history-row]
key_files:
  created: [docs/admin-setup-macos/07-platform-sso-setup.md]
  modified: [docs/admin-setup-macos/03-configuration-profiles.md]
decisions:
  - "ADE-during-Setup-Assistant subsection placed at guide end as bordered Advanced/Optional block; post-enrollment is the documented default (D1/PSSO-12)"
  - "Bootstrapping blockers callout (DF-3/DF-9/DF-10) placed in Prerequisites subsection BEFORE any Settings Catalog step (D-01a/C4)"
  - "03-stub code-span converted to live link in same commit as guide 07 creation (D-06/C13 atomicity)"
  - "Dual-field side-by-side table (macOS 13 deprecated + macOS 14+ field) placed in Settings Catalog step (D-04/VR-4)"
metrics:
  duration: "3 minutes"
  completed_date: "2026-06-21"
  tasks_completed: 2
  files_changed: 2
---

# Phase 76 Plan 01: Platform SSO Admin Setup Guide Summary

End-to-end macOS Platform SSO admin guide authored using `com.apple.extensiblesso` Settings Catalog payload with corpus outer skeleton, three-blocker upfront callout, dual-field mixed-fleet table preventing Error 10001, ADE-during-Setup-Assistant Advanced/Optional subsection, and atomic live-link conversion of the Phase-75 D-06 deferred 03-stub.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author guide 07 head through Steps section | 3f523fa | docs/admin-setup-macos/07-platform-sso-setup.md (created) |
| 2 | Complete guide 07 + convert 03-stub code-span to live link | 3f523fa | docs/admin-setup-macos/03-configuration-profiles.md (edited) |

Both tasks landed in a single atomic commit (3f523fa) per the D-06 / C13 mandate: the live link in `03-configuration-profiles.md` and its target `07-platform-sso-setup.md` exist in the same commit — no broken-link window at any commit boundary.

## Deliverables

### docs/admin-setup-macos/07-platform-sso-setup.md (CREATE — 196 lines)

New end-to-end admin guide covering:

- **Front matter:** `last_verified: 2026-06-20` / `review_by: 2026-09-20` (DS-2 90-day PSSO cadence, mandatory carry-over)
- **Platform gate blockquote** (corpus pattern, verbatim from 02-enrollment-profile.md analog)
- **## Prerequisites** with all Entra/Intune/CP/macOS-version requirements
- **### Known Silent Blockers — Resolve Before Deployment** — hard-bordered callout naming all three blockers (DF-3 per-user MFA, DF-9 CA bootstrap exclusion, DF-10 TLS break-and-inspect) BEFORE any Settings Catalog step (D-01a ordering invariant satisfied)
- **## Steps:**
  - Step 1: Entra prerequisites + CA exclusion cross-ref + TLS exemption cross-ref + USER-group assignment rule
  - Step 2: Install / verify Company Portal ≥ 5.2404.0
  - Step 3: Create Settings Catalog policy with `com.apple.extensiblesso` payload, all verified identifiers (`com.microsoft.CompanyPortalMac.ssoextension`, `UBF8T346G9`, `{{DEVICEREGISTRATION}}`), all required fields and URLs, per-user MFA point-of-use cross-ref, and dual-field mixed-fleet side-by-side table (PSSO-02/VR-4)
  - Step 4: Assign to user groups (not device groups / not filters)
- **## Verification** — `app-sso platform -s` device-side check + Intune portal profile status + System Settings Profiles check (D-01b)
- **## Configuration-Caused Failures** — 4-column table with code-span runbook placeholders (Phase 80 not yet authored); bootstrapping blockers NOT in this table (D-03)
- **## See Also** — Phase 75 glossary anchors (#platform-sso, #secure-enclave, #enterprise-sso-plug-in), Configuration Profiles back-link, macOS ADE Lifecycle Overview
- **## Advanced / Optional: ADE-during-Setup-Assistant** — bordered subsection at guide END with ADE-only callout (DS-1 compliant), macOS 26 hard gate, CP 5.2604.0 LOB-app prerequisite, static-groups-only / three-policy-same-group rule, Enable Registration During Setup field path, Smart Card excluded note, "update to macOS 26 first" achievable branch, wipe-to-fix recovery (PSSO-12/D1/D-04a)
- **Version-History** — initial row `2026-06-20 | Phase 76 (PSSO-01/02/03/12): initial Platform SSO admin setup guide | -- |`

### docs/admin-setup-macos/03-configuration-profiles.md (EDIT)

- **Line 168:** `Continue with Platform SSO setup in \`07-platform-sso-setup.md\` (added in the next documentation phase).` → `Continue with Platform SSO setup in [07-platform-sso-setup.md](07-platform-sso-setup.md).` (D-06 mandatory carry-over)
- **Version-History row prepended:** `| 2026-06-20 | Phase 76 (PSSO-01 / D-06): converted \`07-platform-sso-setup.md\` code-span to live markdown link | -- |`
- All nine `#### In Intune admin center` subheadings unchanged (PITFALL-6 anchor stability)
- `## Extensible SSO` heading unchanged

## Acceptance Criteria Verification

| Criterion | Status | Evidence |
|-----------|--------|----------|
| SC1 (PSSO-01): com.apple.extensiblesso payload, all identifiers, Entra prereqs, USER-group assignment, CP prereq, app-sso platform -s verification | PASS | Task 1 node verify passed; all identifiers present |
| SC2 (PSSO-02): dual-field side-by-side table (macOS 13 deprecated + macOS 14+) preventing Error 10001 | PASS | Table in Step 3 with Error 10001 consequence |
| SC3 (PSSO-03): three bootstrapping blockers in upfront callout BEFORE Settings Catalog step | PASS | Task 1 node verify: bIdx < scIdx confirmed |
| SC4 (PSSO-12): ADE Advanced/Optional subsection at guide end; macOS 26 + CP 5.2604.0; static-groups; Smart-card-excluded; wipe-to-fix; post-enrollment default | PASS | Task 2 node verify: macOS 26, 5.2604.0, ADE-only callout, wipe present |
| D-06 carry-over: 03-stub code-span → live link; same commit as guide 07 | PASS | Both files in commit 3f523fa; C13 PASS |
| DS-1: no supervised-only callout in main PSSO section; ADE subsection has ADE-only callout | PASS | Task 1 node verify: DS-1 check passed |
| DS-2: last_verified 2026-06-20 / review_by 2026-09-20 | PASS | Front matter confirmed |

## Automated Verification Results

**Task 1 node verify:** OK
**Task 2 node verify:** OK
**v1.8-milestone-audit.mjs:** 15 passed, 0 failed, 0 skipped (C13 PASS — allowlist.length=15, 6 transient_external, 9 template_placeholder)

## Deviations from Plan

None — plan executed exactly as written. The two tasks were committed in a single atomic commit (per the D-06/C13 mandate that guide 07 and the live link land together).

## Known Stubs

The `## Configuration-Caused Failures` Runbook column references `35-macos-sso-sign-in-failure.md` (Phase 80) as a code-span placeholder for three rows. This is intentional per RESEARCH.md D-06 pattern: runbook files do not yet exist; Phase 80 will convert these code-spans to live links in the same commits that create the runbooks. These stubs do not prevent the plan's goal (admin setup walkthrough) from being achieved.

## Threat Flags

None — documentation-only plan, no new network endpoints, auth paths, file access patterns, or schema changes.

## Self-Check: PASSED

- [x] `docs/admin-setup-macos/07-platform-sso-setup.md` exists (196 lines, > 90 minimum)
- [x] `docs/admin-setup-macos/03-configuration-profiles.md` contains `[07-platform-sso-setup.md](07-platform-sso-setup.md)`
- [x] Commit 3f523fa exists in git log
- [x] v1.8 C13 gate: PASS (15/15 checks)
- [x] Nine `#### In Intune admin center` subheadings in 03-configuration-profiles.md (unchanged)
