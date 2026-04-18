---
phase: 32
plan: "06"
subsystem: docs-navigation
tags: [quick-ref, l1, ios, cheat-sheet, nav-02, append-only]
requires: [32-00, 32-04, 32-05]
provides:
  - "docs/quick-ref-l1.md#iosipados-quick-reference anchor for Plan 05 forward reference"
  - "iOS/iPadOS Quick Reference H2 with Top Checks / Escalation Triggers / Decision Tree / Runbooks subsections"
affects: ["docs/quick-ref-l1.md"]
tech-stack:
  added: []
  patterns:
    - "Append-at-bottom platform H2 (Phase 25 D-01 pattern, reused verbatim)"
    - "Mirror-macOS-structure quick-ref (D-29 locked)"
    - "Exactly 4 Top Checks matching macOS precedent (D-30 + RESEARCH.md Open Q3)"
    - "PII-safe placeholder portal paths ([user], [token], [device]) per T-32-01 mitigation"
key-files:
  created: []
  modified:
    - path: docs/quick-ref-l1.md
      commit: "035a401"
      change: "Appended ## iOS/iPadOS Quick Reference H2 (33 lines) between line 113 (macOS section end) and Version History H2; bumped frontmatter (last_verified 2026-04-17 / review_by 2026-07-16); updated platform coverage blockquote to include 'and iOS/iPadOS'; added Version History row"
decisions:
  - "Used macOS section structural template verbatim per D-29: Top Checks → Escalation Triggers → Decision Tree → Runbooks ordering preserved"
  - "Top Checks count exactly 4 per D-30 + W3-style clarification (matching macOS precedent; referee F-D1-06 ruling)"
  - "5 Escalation Triggers selected (within 4-5 discretionary range) — one per L1 runbook domain (16 APNs/17 ADE/18 Enrollment Restriction/19 License Invalid/20 Device Cap/21 Compliance Blocked) synthesized into symptom-centric triggers"
  - "PII-safe placeholders: [user], [token], [device] — no tenant URLs, no real serial numbers (T-32-01)"
  - "Did NOT modify pre-existing Windows/APv2/macOS sections (D-38 additive-only); link-check.sh exit 0 confirms no regression"
metrics:
  duration_minutes: 8
  tasks_completed: 2
  files_modified: 1
  lines_added: 38
  lines_removed: 3
  commits: 1
  completed: 2026-04-17
---

# Phase 32 Plan 06: iOS/iPadOS Quick-Ref L1 Append Summary

Appended a mirror-macOS-structure `## iOS/iPadOS Quick Reference` H2 section to `docs/quick-ref-l1.md` (33 lines, between the macOS runbooks and Version History) with exactly 4 Top Checks, 5 Escalation Triggers, 1 iOS Triage decision tree link, and 6 L1 runbook links (16-21), producing the `#iosipados-quick-reference` anchor that Plan 05's `index.md` L1 table forward-references.

## What Was Built

### iOS/iPadOS Quick Reference Section (docs/quick-ref-l1.md:115-147)

**Structure** — exact mirror of macOS section at lines 83-113 per D-29:
- `---` horizontal rule separator (line 115)
- `## iOS/iPadOS Quick Reference` H2 (line 117) → produces `#iosipados-quick-reference` GitHub anchor
- `**Platform:** iOS/iPadOS through Microsoft Intune` one-liner (line 119)
- `### Top Checks` — **exactly 4** numbered items per D-30:
  1. ABM/Intune-license dual-path check (ADE-path OR BYOD-path)
  2. Device in Intune (search by serial)
  3. Enrollment profile assigned (ADE-path only, Enrollment program tokens path)
  4. Compliance state (Compliant vs Non-compliant)
- `### iOS Escalation Triggers` — **5 bullets** (within 4-5 discretionary range per Claude's discretion):
  1. Serial in ABM but device not in Intune after 24h → L2 (APNs/ADE domain)
  2. Setup Assistant stuck or auth failure → L2 (ADE domain)
  3. Enrollment restriction blocking when config does not obviously apply → L2 (enrollment-restriction domain)
  4. License invalid after 24h sync despite verified Entra license → L2 (license domain)
  5. Compliant but CA still blocks M365 → L2 (compliance/CA domain)
- `### iOS Decision Tree` — single bullet to `decision-trees/07-ios-triage.md`
- `### iOS Runbooks` — 6 bullets with brief context descriptors:
  - 16-ios-apns-expired (cross-platform blast radius note)
  - 17-ios-ade-not-starting (three failure signatures note)
  - 18-ios-enrollment-restriction-blocking (reciprocal disambiguation note)
  - 19-ios-license-invalid (dual manifestation note)
  - 20-ios-device-cap-reached (scope note)
  - 21-ios-compliance-blocked (multi-cause A/B/C note)

### Frontmatter Bump (docs/quick-ref-l1.md:1-7)
- `last_verified: 2026-04-15` → `2026-04-17`
- `review_by: 2026-07-14` → `2026-07-16` (last_verified + 90d)

### Platform Coverage Blockquote Update (docs/quick-ref-l1.md:9)
- Before: `Windows Autopilot (classic/APv1), Autopilot Device Preparation (APv2), and macOS ADE.`
- After: `Windows Autopilot (classic/APv1), Autopilot Device Preparation (APv2), macOS ADE, and iOS/iPadOS.` (D-41 canonical suffix)

### Version History Row (docs/quick-ref-l1.md:153)
`| 2026-04-17 | Phase 32: added iOS/iPadOS Quick Reference section with 4 top checks, 5 escalation triggers, decision tree link, and 6 runbook links (16-21) | -- |`

## Acceptance Criteria Results

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| `## iOS/iPadOS Quick Reference` H2 count | 1 | 1 | PASS |
| iOS Top Checks numbered items | 4 (exact, per D-30 W3 clarification) | 4 | PASS |
| L1 runbook links (16-21) | 6 | 6 | PASS |
| iOS triage decision tree link | 1 | 1 | PASS |
| iOS-section Escalate L2 bullets | 4-5 (discretionary) | 5 | PASS |
| `last_verified` = 2026-04-17 | yes | yes | PASS |
| `review_by` = 2026-07-16 | yes | yes | PASS |
| Platform coverage contains "and iOS/iPadOS" | yes | yes | PASS |
| Section line count | ~30 (D-30 target) | 33 | PASS |
| File total line count | ~155 (D-30 target) | 156 | PASS |

## Validation Harness Results

| Script | Exit Code | Notes |
|--------|-----------|-------|
| `link-check.sh docs/quick-ref-l1.md` | 0 | All pre-existing links remain valid (SC #4); all 7 new iOS links (1 decision tree + 6 runbooks) resolve to shipped Phase 30 files |
| `anchor-collision.sh docs/quick-ref-l1.md` | 0 (WARN) | WARN emitted for `### Top Checks` H3 duplicate (macOS lines 87 + iOS line 121). Duplicate is intentional per D-29 mirror-macOS structure — GitHub auto-suffixes `top-checks-1` for the second occurrence. Primary consumer anchor is `#iosipados-quick-reference` (H2), which is unique. Script exits 0 (WARN is informational). |

## Cross-Plan Integration

- **Plan 05 forward reference resolves**: `docs/index.md` iOS Provisioning → Service Desk (L1) table → `quick-ref-l1.md#iosipados-quick-reference` link target now exists. Verified anchor slugification: `iOS/iPadOS Quick Reference` → lowercase → strip `/` → `ios` + `ipados` → hyphenated → `iosipados-quick-reference`.
- **Plan 08 reachability audit**: quick-ref-l1.md is depth-1 from index.md (direct link) and remains so post-edit; iOS anchor is reachable at depth-1 via Plan 05's L1 table.
- **Phase 30 dependency satisfied**: All 6 L1 runbook files (16-21) and `decision-trees/07-ios-triage.md` exist as shipped Phase 30 artifacts; zero broken links.

## Deviations from Plan

None. Plan executed exactly as written. All D-29/D-30 constraints satisfied; no auto-fix rules triggered; no checkpoints; no authentication gates.

## Threat Register Outcomes

| Threat ID | Disposition | Mitigation Applied |
|-----------|-------------|--------------------|
| T-32-01 (Information Disclosure, portal paths) | mitigate | All 4 Top Checks use generic placeholders: `[user]`, `[token]`, `[device]`. No tenant IDs. No real serial numbers. ABM URL shown as `business.apple.com` bracketed reference only. Intune admin center paths use generic "Intune admin center > Devices > ..." navigation strings matching macOS precedent. |
| T-32-02 (Information Disclosure, stale UI strings) | accept | 4 Top Checks are the only portal-path density. Navigation strings chosen for stability (by Devices > iOS/iPadOS / Enrollment > Apple landmarks). Full research-flag footnotes applied in Plan 07 (quick-ref-l2) where density is higher. |

## Known Stubs

None. No hardcoded empty values, placeholder text, or unwired data sources introduced.

## Threat Flags

None. No new security-relevant surface introduced; section is pure navigation content appended additively.

## Self-Check: PASSED

- File exists: `docs/quick-ref-l1.md` (156 lines after edit)
- Commit exists: `035a401` verified via `git log --oneline -3`
- Anchor exists: `#iosipados-quick-reference` produced by H2 at line 117
- All 6 L1 runbook link targets verified present (Phase 30 shipped)
- Decision tree link target verified present (`docs/decision-trees/07-ios-triage.md`, 8033 bytes)
