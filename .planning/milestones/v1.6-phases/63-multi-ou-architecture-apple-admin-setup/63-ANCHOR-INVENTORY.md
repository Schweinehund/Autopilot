# Phase 63 Pre-Edit Anchor Inventory

**Captured:** 2026-05-21 (BEFORE any Phase 63 edits to existing files)
**Files inventoried:** 2 existing files receiving surgical edits in Phase 63
**Purpose:** PITFALL-6 / DA-4 anchor-stability surface — compare pre/post to verify zero anchor shift
**Mirrors format:** `.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md`

---

## File 1: docs/reference/ios-capability-matrix.md

**Pre-edit git SHA (last commit touching file):** `610b3bb91393b5175925994e4828f42de36fc601`
**Receiving:** Exactly 3 new data rows appended under Enrollment H2 (before `## Configuration`) — Phase 63 OU-09.

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `13:## Enrollment`
- `30:## Configuration`
- `44:## App Deployment`
- `57:## Compliance`
- `70:## Software Updates`
- `80:## Conditional Access`
- `90:## Key Gaps Summary`
- `103:## See Also`
- `113:## Version History`

H3 anchors: (none — this file uses H2-only section headings)

**Permitted edits per Plan 63-05 Task 2:**
- 3 data rows APPENDED inside the Enrollment H2 table (before `## Configuration` at line 30)
- Zero H2/H3 headings renamed
- Zero existing prose modified
- Byte-frozen sibling matrices (`macos-capability-matrix.md`, `4-platform-capability-comparison.md`) NOT touched

---

## File 2: docs/cross-platform/apple-business/02-ous-architecture.md

**Pre-edit git SHA (last commit touching file):** `74060b7ec665bb0d544236f4ea409988f099aa76`
**Receiving:** Single atomic D-05 stale-reference repair at lines 102-105 (Untouched-OU Trap section).

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `32:## Hierarchy Rules`
- `65:## Locations to OUs Migration Framing`
- `107:## OU Scope Coverage`
- `123:## Cross-References`
- `143:## Version History`

H3 anchors:
- `67:### Conceptual Continuity`
- `80:### Automatic Tenant Migration (2026-04-14)`
- `97:### Untouched-OU Trap (Cross-OU Content Token Migration)`

**Permitted edits per Plan 63-05 Task 3:**
- Lines 102-105 ONLY: replace stale `05-vpp-catalog-consolidation` forward-reference with reconciled Phase 63/64 targets
- Zero H2/H3 headings renamed
- Zero other lines modified
- This is the ONLY change to this frozen Phase 62 file in Phase 63

---

## Byte-Unchanged Baseline: Guard Files (OU-10 / D-A3)

These two files MUST NOT be modified by Phase 63. The git blob hashes below are the baseline; Phase 63 post-execution must produce identical `git hash-object` results.

| File | Baseline git blob hash | Status |
|------|----------------------|--------|
| `docs/reference/macos-capability-matrix.md` | `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` | BYTE-UNCHANGED REQUIRED (OU-10 / D-A3) |
| `docs/reference/4-platform-capability-comparison.md` | `f25ff51a14b7feac46611c4c0511ed5c074ce03f` | BYTE-UNCHANGED REQUIRED (OU-10 / D-A3; preserves C12 240-cell math) |

**Recompute command:** `git hash-object <file>` — must match exactly post-phase.

---

## Post-Edit Verification Checklist (Plan 63-05)

- [ ] `ios-capability-matrix.md` Enrollment H2 now contains exactly 3 new rows (Apple TV management / Shared iPad sessions / Apple Business delegation surface) — no other H2 touched
- [ ] `ios-capability-matrix.md` H2/H3 anchor list unchanged byte-for-byte vs. pre-edit inventory above
- [ ] `02-ous-architecture.md` no longer contains string `05-vpp-catalog-consolidation`
- [ ] `02-ous-architecture.md` contains `11-vpp-catalog-runbook.md` reference
- [ ] `02-ous-architecture.md` retains `does not duplicate that callout` sentence
- [ ] `02-ous-architecture.md` H2/H3 anchor list unchanged byte-for-byte vs. pre-edit inventory above
- [ ] `git hash-object docs/reference/macos-capability-matrix.md` == `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716`
- [ ] `git hash-object docs/reference/4-platform-capability-comparison.md` == `f25ff51a14b7feac46611c4c0511ed5c074ce03f`
