---
phase: 53
plan: "03"
subsystem: co-management-docs
tags: [co-management, workload-sliders, ep-high-risk, windows, operations]
dependency_graph:
  requires: []
  provides:
    - docs/operations/co-management/02-windows-workload-sliders.md
  affects:
    - docs/operations/co-management/00-overview.md (sibling — same atomic commit)
    - docs/operations/co-management/01-windows-tenant-attach.md (sibling — same atomic commit)
    - docs/operations/co-management/03-cocmgmt-migration-paths.md (sibling — same atomic commit)
    - docs/operations/00-index.md (sibling — same atomic commit)
    - scripts/validation/check-phase-53.mjs (validator will test this file)
tech_stack:
  added: []
  patterns:
    - "EP HIGH-RISK three-layer callout (Phase 52 D-01 cross-domain transfer per DPO-Phase52-07)"
    - "Platform applicability inline blockquote at TOP (D-08)"
    - "Low-risk-first workload migration sequence (PITFALL-8 obligation triple)"
key_files:
  created:
    - docs/operations/co-management/02-windows-workload-sliders.md
  modified: []
decisions:
  - "Single 7-row workload table (2A-1 winner) preceded by small slider-state semantics block — PITFALL-8 obligations (1)+(2) as parallel structures"
  - "EP HIGH-RISK three-layer callout (2B-3 winner): Layer 1 table cell + Layer 2 verbatim blockquote + Layer 3 >= 2 inline reminders — PITFALL-8 obligation (3)"
  - "Verbatim Defender mandate on single line to satisfy grep-based V-53-16 check"
  - "iOS cross-link uses verified path 09-mam-app-protection.md (not non-existent 04-byod-mam-overview.md per RESEARCH Area 3 correction)"
  - "macOS cross-link uses verified path 02-enrollment-profile.md (singular, no trailing s)"
metrics:
  duration: "~20 minutes"
  completed: "2026-04-27"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 53 Plan 03: Workload Slider Migration Guide Summary

**One-liner:** 7-row low-risk-first workload sequence table with EP three-layer HIGH-RISK callout (verbatim Defender mandate), slider-state semantics block, and forward-links to v1.2 Windows migration content.

## File Authored

**Path:** `docs/operations/co-management/02-windows-workload-sliders.md`
**Line count:** 192 lines
**Section count:** 10 sections

## Sections Authored (in order)

1. **Frontmatter** — `platform: Windows`, `audience: admin`, `last_verified: 2026-04-27`, `review_by: 2026-06-26`, `applies_to: all`
2. **Platform applicability blockquote** (D-08 + V-53-18 + V-53-19) — inline `> **Platform applicability:**` blockquote at TOP (line 9, within first 50 body lines) covering macOS (Jamf → Intune via ABM MDM transfer), iOS (MAM → MDM transition), Android (Device Administrator deprecation); all 4 required tokens present
3. **H1 + intro paragraph** — title "Workload Slider Migration: ConfigMgr to Intune" + low-risk-first rationale + cross-links to sibling files 00/01/03
4. **Slider State Reference** (small slider-state semantics block — PITFALL-8 obligation 1) — 3-row table (Configuration Manager / Pilot Intune / Intune) with collection-scoped framing + Pilot Intune behavioral caveat blockquote; PRECEDES main workload table
5. **Workload Migration Sequence** (main 7-row workload sequence table — PITFALL-8 obligation 2) — full-spec 5-column table `| Workload | Migration Order | Risk | Validate Before Moving Slider | Pilot Collection Guidance |` with all 7 workload rows in low-risk-first order
6. **EP HIGH-RISK Layer 2 blockquote** (D-05 + V-53-16) — `> ⚠️ **Endpoint Protection HIGH-RISK:**` immediately below workload table; verbatim Defender mandate on single line
7. **Per-Workload Migration Notes** (7 subsections — PITFALL-8 "what breaks" pattern) — Layer 3 inline `[HIGH-RISK — see callout above]` reminders embedded in subsections 4 and 5 (3 total occurrences)
8. **Related v1.2 Windows Migration Content** (REQ COMG-02 + V-53-23) — forward-links to `imaging-to-autopilot.md` AND `04-tenant-migration.md` (BOTH provided for redundancy) plus GPO-to-Intune
9. **Related Resources** — internal cross-links to sibling co-management files
10. **External References** — Microsoft Learn workloads + how-to-switch-workloads + Windows Autopatch prerequisites

## V-53-NN Assertions Satisfied

| Validator | Assertion | Result |
|-----------|-----------|--------|
| V-53-03 | File exists | PASS |
| V-53-06 | Frontmatter: `platform: Windows` + `audience: admin` + 60-day cycle | PASS |
| V-53-10 | NEGATIVE: no `partially migrated` / `fully migrated` | PASS |
| V-53-13 | Literal column `Validate Before Moving Slider` + ≥6 data rows | PASS (7 rows) |
| V-53-14 | Migration order: Compliance(62) < EP(65) < DeviceConfig(66) < ClientApps(68) | PASS |
| V-53-15 | EP HIGH-RISK Layer 1: `**HIGH-RISK** — see callout` in EP table row Risk column | PASS |
| V-53-16 | EP HIGH-RISK Layer 2: `> ⚠️ **Endpoint Protection HIGH-RISK:**` + verbatim mandate | PASS |
| V-53-17 | EP HIGH-RISK Layer 3: ≥2 `[HIGH-RISK` tokens (found: 3) | PASS |
| V-53-18 | `> **Platform applicability:**` within first 50 body lines (line 9) | PASS |
| V-53-19 | Cross-platform tokens: Jamf, ABM MDM transfer, MAM, Device Administrator | PASS |
| V-53-23 | Forward-link to `imaging-to-autopilot.md` AND `04-tenant-migration.md` | PASS |
| V-53-25 | No TBD/TODO/FIXME/XXX/PLACEHOLDER | PASS |
| V-53-26 | `deprecated` + `CB 2203` + `CB 2403` within proximity of `Resource Access` | PASS |

## EP HIGH-RISK Three-Layer Callout Structural Verification

| Layer | Surface | Token / Check | Present |
|-------|---------|---------------|---------|
| Layer 1 | Workload table EP row Risk column | `**HIGH-RISK** — see callout` | Yes (line 65) |
| Layer 2 | Adjacent blockquote immediately below table | `> ⚠️ **Endpoint Protection HIGH-RISK:**` | Yes (line 70) |
| Layer 2 | Verbatim Defender mandate | `do not move this slider until Intune Defender for Endpoint policy is published, targeted, and confirmed reporting healthy` | Yes (line 70 — single line) |
| Layer 3 | Per-occurrence inline reminders | `[HIGH-RISK` token count | 3 occurrences (lines 113, 115, 134) |

**Verbatim mandate placement note:** The verbatim Defender mandate text is placed on a single line (line 70) to ensure grep-based V-53-16 can match it as a literal single-line string. The line begins with the blockquote opener and continues through the mandate text before the line break.

## Workload Migration Order Verification (V-53-14)

| Workload | Line Number | Expected Position |
|----------|-------------|-------------------|
| Compliance Policies | 62 | 1st (lowest risk) |
| Resource Access | 63 | 2nd (deprecated) |
| Windows Update Policies | 64 | 3rd |
| Endpoint Protection | 65 | 4th (HIGH-RISK) |
| Device Configuration | 66 | 5th |
| Office Click-to-Run Apps | 67 | 6th |
| Client Apps | 68 | 7th |

Document-position order: Compliance(62) < EP(65) < Device Config(66) < Client Apps(68) — V-53-14 will pass.

## Forward-Links Count (V-53-23)

| Target | Relative Path | Line |
|--------|---------------|------|
| imaging-to-autopilot.md | `../../reference/imaging-to-autopilot.md` | 168 |
| 04-tenant-migration.md | `../../device-operations/04-tenant-migration.md` | 171 |
| gpo-to-intune.md | `../../reference/gpo-to-intune.md` | 173 |

Both COMG-02-mandated v1.2 forward-links present. V-53-23 satisfied with redundancy.

## PITFALL-8 Obligation Triple Satisfaction Proof

| Obligation | PITFALL-8 Text | Implementation | Section |
|------------|----------------|----------------|---------|
| (1) Explain three slider states | "explain the three slider states (ConfigMgr / Pilot Intune / Intune) with Pilot Intune as collection-scoped" | `## Slider State Reference` 3-row table + behavioral caveat blockquote | Lines 38-56 |
| (2) Workload table with migration order + Validate column | "table the workloads with a recommended migration order and a 'Validate before moving slider' column" | `## Workload Migration Sequence` 7-row table with all 5 columns | Lines 57-68 |
| (3) EP HIGH-RISK callout with verbatim Defender mandate | "call out the Endpoint Protection workload specifically as HIGH-RISK — 'do not move this slider until...'" | Three-layer callout (table cell + blockquote + inline reminders) | Lines 65, 70-74, 113-135 |

All three PITFALL-8 obligations satisfied.

## Cross-Link Path Verification

| Path Used | Status | Note |
|-----------|--------|------|
| `../../admin-setup-macos/02-enrollment-profile.md` | Correct (singular) | RESEARCH Area 3 correction applied |
| `../../admin-setup-ios/09-mam-app-protection.md` | Correct | RESEARCH Area 3 correction — `04-byod-mam-overview.md` does not exist |
| `../../admin-setup-ios/00-overview.md` | Correct | Verified as existing |
| `../../admin-setup-android/00-overview.md` | Correct | Verified as existing |
| `../../reference/imaging-to-autopilot.md` | Correct | RESEARCH Area 4 verified |
| `../../device-operations/04-tenant-migration.md` | Correct | RESEARCH Area 4 verified |

## Deviations from Plan

**1. [Rule 1 - Bug] Verbatim Defender mandate text split across lines — fixed to single line**
- **Found during:** Task 1 verification
- **Issue:** The plan's Section 6 action showed the blockquote text wrapping after "Intune Defender for\n> Endpoint policy is published..." — this would cause V-53-16's literal grep to miss the mandate because it spans two lines
- **Fix:** Placed the full verbatim mandate text on one line (line 70) so grep-based V-53-16 can match it as a single-line literal string; subsequent lines carry the rest of the blockquote body
- **Files modified:** `docs/operations/co-management/02-windows-workload-sliders.md`
- **Commit:** N/A — no commit (53-07 owns atomicity)

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This is a documentation-only file. T-53-03-01 (EP coverage gap from premature slider move) is mitigated by the three-layer HIGH-RISK callout; all three layers verified present.

## Known Stubs

None. All content is fully authored. No hardcoded empty values, placeholder text, or unwired data sources.

## Commit Status

**NO COMMIT — atomic commit owned by 53-07 per CONTEXT D-14 + CDI-Phase53-04.**

File exists in working tree as an uncommitted staged file. All V-53-NN acceptance criteria pass. Plan 53-07 will commit all Phase 53 deliverables in a single atomic commit.

## Self-Check

- [x] `docs/operations/co-management/02-windows-workload-sliders.md` exists (192 lines)
- [x] All 13 V-53-NN assertions listed above pass (verified via Node.js check script)
- [x] EP HIGH-RISK three-layer callout present and structurally complete
- [x] Verbatim Defender mandate on single line — V-53-16 grep will match
- [x] `[HIGH-RISK` token count = 3 (>= 2 required for V-53-17)
- [x] Forward-links to BOTH `imaging-to-autopilot.md` AND `04-tenant-migration.md` present
- [x] No banned paths (`04-byod-mam-overview.md`, `02-enrollment-profiles.md`)
- [x] No banned phrasings (`partially migrated`, `fully migrated`)
- [x] No TBD/TODO/FIXME/XXX/PLACEHOLDER
- [x] No new git commits (atomic commit deferred to 53-07)

## Self-Check: PASSED
