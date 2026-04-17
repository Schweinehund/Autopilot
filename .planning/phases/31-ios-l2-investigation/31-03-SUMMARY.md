---
phase: 31-ios-l2-investigation
plan: 03
subsystem: docs
tags: [ios, l2, ade, token, profile-delivery, graph-api, apns, runbook, intune, abm]

requires:
  - phase: 31-ios-l2-investigation (plan 01)
    provides: scripts/validation/check-phase-31.mjs harness (V-31-06..V-31-10 + V-31-26..V-31-29 gates for file 15), L2 runbook template, expected-d23.txt fixture
  - phase: 31-ios-l2-investigation (plan 02)
    provides: docs/l2-runbooks/14-ios-log-collection.md (prereq cross-reference target — Section 3 Mac+Cable Sysdiagnose anchor, Tier 2 Company Portal egress callout)
  - phase: 24-macos-l2-investigation
    provides: docs/l2-runbooks/11-macos-profile-delivery.md (PRIMARY structural analog — 191 lines, Triage/Context/Investigation step-numbered flow, Resolution Scenarios + Escalation Ceiling shape)
  - phase: 30-ios-l1-triage-runbooks
    provides: L1 runbooks 16-20 ADE-path escalation sources (APNs expired, ADE not starting, enrollment restriction, license invalid, device cap), platform gate banner pattern (D-26 → inherited as D-29)
  - phase: 27-ios-admin-setup-corporate-ade-path
    provides: admin-setup-ios/01-apns-certificate.md + 02-abm-token.md + 03-ade-enrollment-profile.md (Pattern A/B/C Related Resources deep-links)

provides:
  - docs/l2-runbooks/15-ios-ade-token-profile.md (iOS ADE Token & Profile Delivery Investigation runbook, 190 lines)
  - D-07 hybrid three-layer structure realized: Investigation — Data Collection (Steps 1-4) / Analysis — Match Against Known Failure Patterns (A/B/C/D) / Resolution (per-pattern numbered steps) — SC #3 literal satisfied
  - D-09 verbatim Graph API READ-ONLY preamble citing ADDTS-02 deferred milestone (T-31-03 elevation-of-privilege mitigation layer 1)
  - D-10 triple-portal Prerequisites (ABM + Intune + Entra) + optional Graph scope with delegated-over-application preference (T-31-03 mitigation layer 2 — tenant-wide read warning)
  - D-28 frontmatter with applies_to: ADE (first L2 runbook in the set to use this narrower scope)
  - Pattern D inline "Destructive action" blockquote (T-31-D tampering mitigation — wipe required before wrong-MDM-server resolution)
  - Graph API response-field → Pattern mapping (tokenExpirationDateTime, lastModifiedDateTime, lastSuccessfulSyncDateTime, lastSyncTriggeredDateTime, lastSyncErrorCode, syncedDeviceCount, appleIdentifier)
  - Apple HT210060 network-requirements reference cited in Pattern C Resolution (network/firewall team handoff)

affects: [31-04 (16-ios-app-install — shares runbook 14 prereq pattern + Escalation Ceiling format), 31-05 (17-ios-compliance-ca-timing — shares L2 frontmatter + platform-gate banner + Related Resources shape), 31-06 (L1 retrofit wave — L1 runbooks 16-20 retarget bare 00-index.md links to 15-ios-ade-token-profile.md), 31-07 (00-index.md iOS L2 section update), future ADDTS-02 (Graph ADE Token GUID deep-dive runbook — write-op boundary enforced here)]

tech-stack:
  added: []
  patterns:
    - "D-07 hybrid three-layer H2 structure (Investigation — Data Collection / Analysis — Match Against Known Failure Patterns / Resolution) — first realization in phase 31; reusable for any dual-literal SC requiring 'indicators AND patterns'"
    - "Graph API read-only preamble pattern: verbatim blockquote in Context → optional Graph scope in Prerequisites → surgical supplement step inside Investigation (Step 1 Supplement) — avoids cluttering every Graph step with repeated warnings"
    - "Pattern response-field mapping inside Graph supplement: each API field annotated with the Pattern (A or D) it indicates — lets L2 read response body and jump straight to Analysis"
    - "Pattern A vs D disambiguation paragraph inside Pattern D body — Intune-side fix vs device-side wipe boundary explicitly named"
    - "Inline Destructive action blockquote at point of use (Pattern D Resolution intro) — matches phase 31-02 T-31-01/T-31-02 inline-mitigation-at-point-of-use pattern"

key-files:
  created:
    - docs/l2-runbooks/15-ios-ade-token-profile.md
  modified: []

key-decisions:
  - "Single-runbook scope per D-06: token sync AND profile delivery in one file (mirrors 11-macos-profile-delivery.md 191-line precedent); final length 190 lines sits one below the analog, confirming the iOS + Graph-API delta + triple-portal prereq fits in the same envelope"
  - "Graph supplement placed inside Investigation as Step 1 Supplement (not a separate top-level section) — keeps portal-first flow per D-08 while making the numeric-error-code path discoverable only when UI falls short"
  - "Pattern response-field mapping (7 fields → Pattern A or D) written as a bulleted list inside Step 1 Supplement rather than a table — preserves natural reading order for an L2 scanning a Graph GET response body top-to-bottom"
  - "Related Resources lists L1 runbooks 16-20 by number + short title rather than individual per-file links to avoid duplicating the phase 30 index — the directory-level [iOS L1 Runbooks](../l1-runbooks/) link carries the routing, not this runbook"
  - "Pattern A vs D disambiguation written inside Pattern D (not as a separate callout) so an L2 reading Pattern D first learns the Intune-vs-device boundary before attempting a wipe"

patterns-established:
  - "L2 runbook D-07 hybrid structure: Investigation — Data Collection (steps) / Analysis — Match Against Known Failure Patterns (named patterns with Indicators + Matches Data Collection + Resolution pointer) / Resolution (per-pattern numbered steps) + Escalation Ceiling + Related Resources"
  - "Inline threat-mitigation blockquote at point of use: T-31-03 preamble + T-31-03 access-control note + T-31-D Destructive action — three distinct callouts layered across Context, Prerequisites, and Resolution rather than centralized"
  - "applies_to: ADE frontmatter scoping for enrollment-path-specific L2 runbooks (vs applies_to: all for cross-path runbooks like 14 log collection)"

requirements-completed: [L2TS-02]

duration: 5min
completed: 2026-04-17
---

# Phase 31 Plan 03: iOS ADE Token & Profile Delivery Investigation Runbook Summary

**L2 runbook 15 authored — D-07 hybrid three-layer structure (Investigation/Analysis/Resolution) covering 4 named ADE failure patterns (A token/sync, B profile-never-assigned, C APNs/network, D wrong-MDM-server) with Graph API READ-ONLY supplement and triple-portal prerequisites.**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-17T20:50:08Z
- **Completed:** 2026-04-17T20:55:06Z
- **Tasks:** 2
- **Files modified:** 1 (created)

## Accomplishments

- **docs/l2-runbooks/15-ios-ade-token-profile.md** created at 190 lines — within the ±15% band of the macOS 11-profile-delivery.md 191-line analog per D-29 (V-31-29 PASS)
- **SC #3 literal satisfied:** indicators to check (Investigation Steps 1-4: token sync status, Graph API supplement, profile assignment, GUID extraction, device-side state) AND 4 known failure patterns (A/B/C/D) with resolution steps each
- **T-31-03 elevation-of-privilege mitigation layered twice:** (1) D-09 verbatim Graph API READ-ONLY preamble citing ADDTS-02 deferred milestone; (2) Prerequisites access-control note warning tenant-wide read scope + delegated-over-application preference
- **T-31-D tampering mitigation inline:** Pattern D Resolution opens with "Destructive action: Pattern D resolution requires a device wipe" blockquote before the wipe steps — L2 sees the warning before attempting the procedure
- **D-10 triple-portal prerequisite enforced:** ABM + Intune + Entra named explicitly as required portals, with the optional Graph scope scoped at L2-preferred delegated permissions
- **Graph API response-field → Pattern mapping** inline: 7 fields (tokenExpirationDateTime, lastModifiedDateTime, lastSuccessfulSyncDateTime, lastSyncTriggeredDateTime, lastSyncErrorCode, syncedDeviceCount, appleIdentifier) each annotated with the Pattern (A or D) they indicate

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold runbook 15 — Triage + Context + Graph preamble + Prerequisites + Investigation steps 1-4** - `b4080ef` (docs)
2. **Task 2: Complete runbook 15 — Pattern A/B/C/D analysis + Resolution + Escalation Ceiling** - `69ad302` (docs)

_Note: Plan 31-03 used doc-TDD — the "test" is the grep-based V-31-06..V-31-10 + V-31-26..V-31-29 harness; each task committed only after the in-scope harness gates flipped green._

## Files Created/Modified

- `docs/l2-runbooks/15-ios-ade-token-profile.md` — iOS ADE Token & Profile Delivery Investigation runbook. Covers both token-side (ABM-to-Intune sync, `lastSyncErrorCode`, `syncedDeviceCount` orphan detection) and profile-delivery-side (Intune-to-device assignment, APNs/network path, wrong-MDM-server tenant migration) investigation in a single file per D-06. Target of L1 runbooks 16-20 ADE-path escalations.

## Validation Harness Results

In-scope gates (for plan 31-03, file 15 only):

| Gate | Description | Result |
|------|-------------|--------|
| V-31-06 | 15 has exactly 4 Pattern [ABCD]: headings | PASS |
| V-31-07 | Each Pattern A/B/C/D has Indicators + Resolution text nearby | PASS |
| V-31-08 | 15 has 3 top-level H2: Investigation — Data Collection / Analysis — Match Against Known Failure Patterns / Resolution | PASS |
| V-31-09 | 15 Graph API preamble mentions endpoint + scope + READ-ONLY + ADDTS-02 | PASS |
| V-31-10 | 15 Prerequisites names ABM + Intune + Entra | PASS |
| (V-31-26 file 15) | frontmatter fields present | PASS (gate aggregate remains FAIL due to files 16/17 not yet existing — owned by 31-04/31-05) |
| (V-31-27 file 15) | applies_to: ADE | PASS (same) |
| (V-31-28 file 15) | D-29 platform gate banner in first 30 lines | PASS (same) |
| V-31-29 | Runbook 15 line count 190, in 187-322 band | PASS (for file 15; aggregate FAIL until 16/17 exist) |

Out-of-scope gates (owned by other plans in the wave): V-31-11..V-31-25, V-31-30 — unchanged by this plan.

## Decisions Made

See `key-decisions` frontmatter for full list. Three that drove content shape:

1. **Single-runbook scope per D-06** — token sync + profile delivery in one file. Final 190 lines confirms the iOS-specific delta (Graph API supplement, triple-portal prereq, Pattern A/B/C/D analysis body) fits inside the macOS 11-profile-delivery.md 191-line envelope without bloat.
2. **Graph supplement as Step 1 Supplement (not separate H2)** — preserves portal-first flow per D-08 while making the numeric-error-code path discoverable only when the Intune admin center UI falls short.
3. **Pattern A vs D disambiguation paragraph inside Pattern D body** — an L2 reading Pattern D first learns the Intune-side-fix vs device-side-wipe boundary before attempting a destructive procedure.

## Deviations from Plan

None — plan executed exactly as written. Both tasks committed after in-scope harness gates flipped green.

**Total deviations:** 0
**Impact on plan:** None; zero scope creep.

## Issues Encountered

None. The `Edit` tool initially fired a read-before-edit hook warning for Task 2's edit, but the edit had already succeeded (the file was created with the `Write` tool earlier in the same session). Verified by reading the file post-edit and running the harness — no corrective action needed.

## Known Stubs

None — no hardcoded empty values, placeholder text, or unwired data sources in the authored file. Version History row is real (dated 2026-04-17, "Initial version"), not a placeholder. All cross-reference links target files that exist (14-ios-log-collection.md from plan 31-02) or will be retrofitted by Wave 5 plan 31-06 (L1 runbooks 16-20 already exist in the repo; directory-level link `../l1-runbooks/` is always valid).

## Threat Flags

None — no new trust-boundary surface introduced beyond what was already enumerated in the plan's `<threat_model>`. T-31-03 (Graph tenant-wide read scope) and T-31-D (Pattern D wipe tampering) mitigations are in-file. T-31-05 (sysdiagnose PII in support tickets) is transferred to runbook 14's T-31-01 callout via inline cross-reference in the Escalation Ceiling data-checklist ("PII-redacted per runbook 14 Section 3 PII callout").

## User Setup Required

None — no external service configuration introduced by this plan. The runbook *references* three portals (ABM, Intune, Entra) and optional Graph API credentials, but these are runtime L2-engineer prerequisites documented inside the file itself, not environmental setup for this repository.

## Next Phase Readiness

- **For plan 31-04 (16-ios-app-install.md):** L2 frontmatter shape (applies_to enum usage, platform-gate banner verbatim, Version History table format), Escalation Ceiling per-pattern data-checklist pattern, and Related Resources directory-link shape all reusable.
- **For plan 31-05 (17-ios-compliance-ca-timing.md):** Same L2 runbook frontmatter + banner + Related Resources shape. The D-07 hybrid three-layer structure differs from D-14 hybrid axis structure (axis-by-cause vs data-collection-by-step), so analysis/resolution content is not directly reusable — but the Escalation Ceiling data-checklist pattern transfers.
- **For plan 31-06 (L1 retrofit wave):** L1 runbooks 16-20 currently link to bare `00-index.md`; this plan created the specific target (`15-ios-ade-token-profile.md`) that those 5 files should now point at. V-31-22 gate (no bare `00-index.md` links in retrofit files) is unblocked for that wave.
- **For plan 31-07 (00-index.md update):** The iOS L2 Runbooks section table will list 15-ios-ade-token-profile.md with `applies_to: ADE` tag — first L2 runbook in the set with a non-`all` scope, confirming D-28 frontmatter variation works.
- **For future ADDTS-02 milestone:** Write-op scope boundary enforced here — Graph POST `/syncWithAppleDeviceEnrollmentProgram` and POST `/uploadDepToken` remain deferred. Token GUID deep-dive runbook retains clear differentiation from this file.

## Self-Check

**File existence:**
- `docs/l2-runbooks/15-ios-ade-token-profile.md` — FOUND (190 lines)

**Commit existence:**
- `b4080ef` (Task 1: scaffold) — FOUND
- `69ad302` (Task 2: complete) — FOUND

## Self-Check: PASSED

---
*Phase: 31-ios-l2-investigation*
*Plan: 03*
*Completed: 2026-04-17*
