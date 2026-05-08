---
phase: 54
plan: 02
subsystem: docs/operations/patch-management
tags: [patch-management, windows, wufb, autopatch, hotpatch, driver-firmware, pitfall-9]
requires: [Phase 53 co-management cross-link targets (already shipped: commits fbf2bf2 + a5f9fba)]
provides:
  - "docs/operations/patch-management/01-windows-wufb-rings.md (Windows WUfB + Autopatch + Hotpatch + Driver/Firmware reference)"
  - "PITFALL-9 mutual-exclusion narrative + strict per-occurrence ring qualifier discipline"
  - "PATCH-02 Hotpatch H2 (May 2026 default + VBS + April 2026 opt-out)"
  - "PATCH-03 Driver/Firmware H2 + dual-scan source conflict pitfall"
  - "Phase 53 forward-promise close: 02-windows-workload-sliders.md + 03-cocmgmt-migration-paths.md cross-links present"
affects:
  - "Future Phase 54 plans 54-01 (00-overview.md cross-link target validation)"
  - "Phase 54 atomic commit by 54-09 author"
tech-stack:
  added: []
  patterns:
    - "Phase 53 D-08 cross-platform inline blockquote token reuse: > **Platform applicability:**"
    - "Per-platform frontmatter contract: platform: Windows + audience: admin + 60-day cycle"
    - "PITFALL-9 strict per-occurrence ring qualifier (V-54-11 dual-defense POSITIVE+NEGATIVE)"
    - "Pinned H2 anchor strings (## Hotpatch, ## Driver and Firmware Update Policy) per D-20"
key-files:
  created:
    - "docs/operations/patch-management/01-windows-wufb-rings.md"
  modified: []
decisions: []
metrics:
  duration: ~12 minutes (drafting + 7 ring-qualifier audit iterations + reflow fixes)
  completed: 2026-04-28
  file_lines: 210
---

# Phase 54 Plan 02: Windows WUfB Rings + Hotpatch + Driver/Firmware Summary

Authored `docs/operations/patch-management/01-windows-wufb-rings.md` — the Windows-specific patch
management reference folding three requirements (PATCH-01 + PATCH-02 + PATCH-03) into one file
per REQ traceability lines 161-163. PITFALL-9 strict per-occurrence ring-qualifier discipline
applied across 41 `WUfB deployment ring` and 25 `Autopatch ring` occurrences with zero bare-ring
tokens surviving audit.

## File Path + Line Count

- **Path:** `docs/operations/patch-management/01-windows-wufb-rings.md`
- **Lines:** 210
- **Status:** Created (new file; directory `docs/operations/patch-management/` also created since
  it did not previously exist)

## Sections Authored (in order)

1. **Frontmatter** (D-19): `last_verified: 2026-04-28`, `review_by: 2026-06-27`, `applies_to: all`,
   `audience: admin`, `platform: Windows`
2. **Platform applicability blockquote** at TOP (D-04 + 2B-prime; pointer-only routing back to
   `00-overview.md` + 3 sibling per-platform files)
3. **H1 + intro paragraph** — Windows WUfB Rings + Hotpatch + Driver/Firmware
4. **WUfB Deployment Rings H2** (`## WUfB Deployment Rings {#wufb-deployment-rings}`) — Pilot/Broad
   ring reference table, deferral periods, deadline enforcement, restart-behavior, promotion gate
5. **Windows Autopatch Rings (Disambiguation) H2** (`## Windows Autopatch Rings (Disambiguation)
   {#autopatch-disambiguation}`) — service-managed cohorts (Test/First/Fast/Broad), PITFALL-9
   mutual-exclusion blockquote, 4-step migration sequence (WUfB deployment ring → Autopatch ring)
6. **Hotpatch H2** (`## Hotpatch {#hotpatch}`) — May 2026 default + VBS prereq + April 2026
   Intune admin center opt-out toggle + reboot-reduction compliance reporting impact
7. **Driver and Firmware Update Policy H2** (`## Driver and Firmware Update Policy
   {#driver-firmware-policy}`) — separate Intune surface (NOT a ring), dual-scan source conflict
   pitfall when SCCM co-management still controls WU workload, three mitigation options
8. **Related Resources** — 6 internal cross-links (overview, 3 sibling per-platform, 2 Phase 53
   co-management cross-links closing forward-promise)
9. **External References** — 4 Microsoft Learn URLs (WUfB, Autopatch, Hotpatch, WUfB driver
   updates)

## V-54-NN Validator Assertions Satisfied (8 assertions)

| Validator | Assertion | This file |
|-----------|-----------|-----------|
| V-54-02   | File exists | PASS — `docs/operations/patch-management/01-windows-wufb-rings.md` exists |
| V-54-07   | Frontmatter `platform: Windows`, `audience: admin`, 60-day cycle | PASS — all 5 frontmatter keys present in first 7 lines |
| V-54-11   | POSITIVE: every `ring` qualified `WUfB deployment` or `Autopatch`; NEGATIVE: zero bare-`ring` tokens | PASS — singular bare-ring audit empty; plural bare-ring audit empty |
| V-54-12   | Literal `## Hotpatch` H2 + 4 sub-tokens (`default`, `May 2026`, `VBS`, `opt-out` or `April 2026`) | PASS — `## Hotpatch` count=1; May 2026 count=6; VBS count=2; opt-out count=2; April 2026 count=2 |
| V-54-13   | H2 covering driver/firmware + literal `dual-scan` token | PASS — `## Driver and Firmware Update Policy` count=1; dual-scan count=3 |
| V-54-26   | `> **Platform applicability:**` blockquote within first 50 lines | PASS — blockquote at line 9-14 (post-frontmatter, pre-H1) |
| V-54-27   | NEGATIVE: zero bare `> **Platform:**` tokens | PASS — count=0 |
| V-54-30   | NEGATIVE: zero TBD/TODO/FIXME/XXX/PLACEHOLDER | PASS — grep empty |

## Requirement Traceability

- **PATCH-01** (WUfB rings + Autopatch + PITFALL-9): WUfB Deployment Rings H2 + Autopatch
  Disambiguation H2 + explicit PITFALL-9 mutual-exclusion blockquote ("WUfB deployment rings and
  Autopatch rings are **mutually exclusive** — they cannot coexist on the same device") + 4-step
  migration narrative (steps 1-4 in Autopatch Disambiguation H2)
- **PATCH-02** (Hotpatch H2 default May 2026 + VBS + opt-out April 2026): `## Hotpatch` H2 with
  prerequisites bullet list (Windows 11 Enterprise 24H2+ / VBS / eligible processor / device
  assigned to a WUfB deployment ring or Autopatch ring), Default-on behavior paragraph
  (May 2026 onwards), Opt-out toggle paragraph (April 2026 Intune admin center addition),
  Compliance reporting impact paragraph (reboot frequency monthly→quarterly re-baseline guidance)
- **PATCH-03** (driver/firmware separate + dual-scan): `## Driver and Firmware Update Policy` H2
  explicitly stating "This is NOT a ring — neither a WUfB deployment ring nor an Autopatch ring",
  Dual-scan source conflict pitfall paragraph (SCCM-WSUS scan source vs. WUfB-cloud scan source
  oscillation), three mitigation options (workload slider migration / block automatic driver
  delivery / GPO DisableDualScan)

## Phase 53 Forward-Promise Closure

Two Phase 53 forward-links resolved by this file:

1. **Phase 53 V-53-23 forward-promise** (from `02-windows-workload-sliders.md`): closed by Phase 54
   cross-link `[Workload Slider Migration](../co-management/02-windows-workload-sliders.md)` in
   the Autopatch Disambiguation H2 step 1 + the Driver/Firmware H2 dual-scan mitigation step 1 +
   Related Resources footer
2. **Phase 53 forward-promise to PITFALL-9 disambiguation** (from `03-cocmgmt-migration-paths.md`):
   closed by Phase 54 cross-link `[Migration Paths and
   Autopatch](../co-management/03-cocmgmt-migration-paths.md)` in Related Resources footer

## Deviations from Plan

None — plan executed exactly as written. Multiple ring-qualifier audit iterations were required
to eliminate line-wrap-induced bare-`ring` tokens (markdown 100-column reflow split `WUfB
deployment` and `ring` across line breaks); rewording brought every `ring` and `rings` occurrence
onto the same line as its qualifier, satisfying V-54-11 NEGATIVE per-occurrence regex discipline.

## Atomicity Status

**NO COMMIT** — file is staged only via the Phase 54 atomic commit owned by 54-09 author per
CONTEXT D-21 + CDI-Phase54-05 + ROADMAP:271.

## Self-Check: PASSED

- File `docs/operations/patch-management/01-windows-wufb-rings.md` exists (210 lines)
- All 16 must_haves.contains tokens present (all counts ≥ 1)
- All 6 key_links cross-reference paths present
- All 8 V-54-NN assertions satisfied for this file (V-54-02/07/11/12/13/26/27/30)
- All 3 negative checks pass (zero `## Deadlines`, zero bare `> **Platform:**`, zero TBD/TODO/FIXME/XXX/PLACEHOLDER)
- Strict ring-qualifier audit: empty (singular + plural)
- Plan automated verify command: PASS
