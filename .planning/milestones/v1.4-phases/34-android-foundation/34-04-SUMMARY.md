---
phase: 34-android-foundation
plan: 04
subsystem: documentation / android-version-matrix
tags:
  - android
  - version-matrix
  - breakpoints
  - AEBASE-04
  - phase-42-audit-anchor
requires:
  - .planning/phases/34-android-foundation/34-CONTEXT.md (D-29 through D-33)
  - .planning/phases/34-android-foundation/34-PATTERNS.md (version-matrix authoring guidance)
  - docs/_glossary-android.md (Wave 1 glossary — cross-ref targets: Play Integrity, AMAPI, COPE, WPCO, Corporate Identifiers, Fully Managed)
  - docs/android-lifecycle/00-enrollment-overview.md (Wave 1 — establishes mode ordering convention)
  - .planning/research/FEATURES.md (lines 350-358 — canonical Intune minimum OS data)
provides:
  - docs/android-lifecycle/03-android-version-matrix.md (3-col version matrix + Version Breakpoint Details + Non-Version Breakpoints)
  - Anchors consumed by Phase 35-42: #android-11-breakpoint, #android-12-breakpoint, #android-15-breakpoint, #non-version-breakpoints, #cobo, #byod, #dedicated, #zte, #aosp
  - Load-bearing `last_verified: 2026-04-21` drift anchor for Phase 42 milestone audit (D-33)
affects:
  - Phase 36 (COBO admin guide) — cites #android-11-breakpoint for COPE migration note, #android-15-breakpoint for EFRP configuration
  - Phase 37 (BYOD admin guide) — cites #android-12-breakpoint for corporate-identifier ceiling + AMAPI migration subsection
  - Phase 38 (Dedicated admin guide) — cites #android-15-breakpoint for EFRP re-provisioning
  - Phase 39 (ZTE admin guide) — cites #android-15-breakpoint for re-enrollment flows
  - Phase 41 (L2 investigation) — cites #non-version-breakpoints / Play Integrity verdict levels for attestation troubleshooting
  - Phase 42 (milestone audit) — uses `last_verified` as drift anchor per D-33
tech-stack:
  added: []
  patterns:
    - two-axes-version-referencing (Intune Minimum OS axis vs Notable Version Breakpoints axis — kept distinct from per-method × per-mode gating in 02-provisioning-methods.md)
    - explicit-short-anchor-tags (`<a id="android-11-breakpoint"></a>` etc. for stable Phase 35-42 cross-refs, avoiding drift on long auto-anchors — Pitfall 7 guard)
    - supplementary-non-version-breakpoints (policy-gated drift documented alongside version-gated drift for single-drift-surface reading model per D-32)
    - load-bearing-last-verified (`last_verified` frontmatter on this file gates Phase 42 audit anchor per D-33)
key-files:
  created:
    - docs/android-lifecycle/03-android-version-matrix.md (10,632 bytes, 108 lines, 1,299 words)
  modified: []
key-decisions:
  - "D-29 applied: 3-column matrix (Mode / Intune Minimum OS / Notable Version Breakpoints) — no Recommended column"
  - "D-30 applied: breakpoint narratives in a separate ## Version Breakpoint Details H2 below the matrix with 3 H3 subsections"
  - "D-31 applied: NO min_android_version frontmatter key anywhere — grep check returns 0 in the file and 0 across docs/android-lifecycle/"
  - "D-32 applied: ## Non-Version Breakpoints H2 with SafetyNet -> Play Integrity and AMAPI Migration subsections"
  - "D-33 applied: last_verified: 2026-04-21 + review_by: 2026-06-20 (60-day cycle) — load-bearing drift anchor for Phase 42 audit"
  - "Pitfall 4 honored: 'Google recommends WPCO' language used; zero 'COPE deprecated' occurrences"
  - "Pitfall 7 honored: explicit short-form anchor tags for Android 11/12/15 breakpoints (not relying on long auto-anchors)"
patterns-established:
  - "Intune Minimum OS vs Notable Version Breakpoints axis distinction (intro prose) — prevents drift with 02-provisioning-methods.md per-method × per-mode version cells"
  - "Breakpoint H3 4-block skeleton: Affected modes / What changed / Admin action required / References"
  - "Non-version breakpoints tracking policy-gated drift alongside version-gated drift"
requirements-completed: [AEBASE-04]
duration: ~4min
completed: 2026-04-21
---

# Phase 34 Plan 04: Android Version Matrix Summary

**One-liner:** Created `docs/android-lifecycle/03-android-version-matrix.md` — a 3-column Android version matrix (Mode / Intune Minimum OS / Notable Version Breakpoints) across 5 modes, plus three version-breakpoint narrative H3s (Android 11 COPE NFC removal, Android 12 corporate-identifier IMEI/serial removal on BYOD, Android 15 EFRP hardening), plus two non-version-breakpoint H3s (SafetyNet → Play Integrity January 2025, AMAPI migration for BYOD April 2025), with load-bearing `last_verified: 2026-04-21` as the Phase 42 milestone audit drift anchor.

## Performance

- **Duration:** ~4 min
- **Started:** 2026-04-21T21:27:04Z
- **Completed:** 2026-04-21T21:31:25Z
- **Tasks:** 3 (all `type="auto"`, fully autonomous)
- **Files created:** 1
- **Files modified:** 0
- **Commits:** 3 atomic + 1 intra-task fix (inline, same commit as Task 3)

## Accomplishments

- Published the single canonical Android version reference for v1.4 — mode-level Intune minimum OS values sourced verbatim from `.planning/research/FEATURES.md` lines 350-358
- Narrative H3 sections for the three Google-driven version breakpoints that materially affect admin operations: Android 11 COPE NFC removal, Android 12 IMEI/serial removal from BYOD corporate identifiers, Android 15 Enterprise Factory Reset Protection hardening
- Supplementary `## Non-Version Breakpoints` H2 section captures policy-gated drift (SafetyNet → Play Integrity, AMAPI migration for BYOD) on a single drift-surface
- Stable anchors published for Phase 35-42 cross-references: `#android-11-breakpoint`, `#android-12-breakpoint`, `#android-15-breakpoint`, `#non-version-breakpoints`, plus per-mode row anchors (`#cobo`, `#byod`, `#dedicated`, `#zte`, `#aosp`)
- Load-bearing `last_verified: 2026-04-21` + `review_by: 2026-06-20` set as the Phase 42 audit drift anchor per D-33
- Zero `min_android_version` frontmatter keys anywhere (D-31 prohibition enforced)

## Task Commits

Each task committed atomically:

1. **Task 1: Scaffold file with frontmatter (no min_android_version), platform gate, H1, intro prose, 3-col matrix** — `4b748fa` (docs)
2. **Task 2: ## Version Breakpoint Details with Android 11/12/15 H3 subsections** — `b1f8ee1` (docs)
3. **Task 3: ## Non-Version Breakpoints (SafetyNet → Play Integrity, AMAPI) + ## See Also + full-file negative checks** — `ee05ac6` (docs)

## Files Created/Modified

**Created:**
- `docs/android-lifecycle/03-android-version-matrix.md` (10,632 bytes, 108 lines, 1,299 words) — D-31-compliant frontmatter, 3-col matrix with 5 mode rows, 3 Version Breakpoint Details H3s, 2 Non-Version Breakpoint H3s, See Also

**Modified:** (none)

## Validation Sweep (all checks pass)

Per-task grep checks from 34-04-PLAN.md `<verify>` blocks and 34-VALIDATION.md:

| Check | Result | Details |
|-------|--------|---------|
| File exists | PASS | `docs/android-lifecycle/03-android-version-matrix.md` present |
| 34-all-01: review_by - last_verified ≤ 60 days | PASS | 2026-04-21 + 60 = 2026-06-20 (exact) |
| 34-all-02: `platform: Android` | PASS | 1 match |
| 34-all-03: deferred-file link count | PASS | 0 (no common-issues/quick-ref-l1/quick-ref-l2/windows-vs-macos) |
| 34-04-01: 3-col matrix header | PASS | `\| Mode \| Intune Minimum OS \| Notable Version Breakpoints \|` matched |
| 34-04-02: `^### Android 11` count = 1 | PASS | 1 |
| 34-04-03: `^### Android 12` count = 1 | PASS | 1 |
| 34-04-04: `^### Android 15` count = 1 | PASS | 1 |
| 34-04-05: `## Non-Version Breakpoints` count = 1 | PASS | 1 |
| 34-04-06: `min_android_version` count (file) | PASS | 0 |
| 34-04-06: `grep -l "min_android_version" docs/android-lifecycle/` | PASS | empty (directory-wide) |
| 34-04-07: SafetyNet count ≤ 2 | PASS | 2 (H3 heading + body explanatory mention inside Non-Version Breakpoints; T-34-19 guard holds) |
| Mode rows: Fully Managed (COBO) | PASS | 1 |
| Mode rows: BYOD Work Profile | PASS | 1 |
| Mode rows: Dedicated (COSU) | PASS | 1 |
| Mode rows: Zero-Touch Enrollment | PASS | 1 |
| Mode rows: `\| AOSP \|` | PASS | 1 |
| Explicit anchor: `<a id="android-11-breakpoint"></a>` | PASS | 1 |
| Explicit anchor: `<a id="android-12-breakpoint"></a>` | PASS | 1 |
| Explicit anchor: `<a id="android-15-breakpoint"></a>` | PASS | 1 |
| Bold block: `Affected modes:` count ≥ 3 | PASS | 3 |
| Bold block: `What changed:` count ≥ 3 | PASS | 3 |
| Bold block: `Admin action required:` count ≥ 3 | PASS | 3 |
| Bold block: `References:` count ≥ 3 | PASS | 3 (Android 11, Android 12, Android 15 sections) |
| Negative: `COPE deprecated` count | PASS | 0 (Pitfall 4 — uses "Google recommends WPCO") |
| Negative: EFRP / Enterprise Factory Reset Protection present | PASS | 3 matches in Android 15 section |
| Play Integrity count ≥ 2 | PASS | 6 |
| AMAPI count ≥ 2 | PASS | 6 |
| Glossary cross-refs (`_glossary-android.md`) count ≥ 3 | PASS | 6 |
| Total H2 count (after matrix) | PASS | 3 (`## Version Breakpoint Details`, `## Non-Version Breakpoints`, `## See Also`) |

## Locked-Decision Confirmations

- **D-29** applied: 3-column matrix `Mode / Intune Minimum OS / Notable Version Breakpoints` — the "Recommended" column alternative was explicitly NOT added
- **D-30** applied: breakpoint narratives live in a separate `## Version Breakpoint Details` H2 below the matrix (not inside cells)
- **D-31** applied: no `min_android_version` key in frontmatter; `grep -c min_android_version` returns 0; `grep -l min_android_version docs/android-lifecycle/` returns empty
- **D-32** applied: supplementary `## Non-Version Breakpoints` H2 with two H3 subsections captures SafetyNet → Play Integrity (January 2025) and AMAPI migration for BYOD (April 2025) — policy-gated drift on the single drift-surface
- **D-33** applied: `last_verified: 2026-04-21` + `review_by: 2026-06-20` (exactly 60 days) — noted as load-bearing for Phase 42 audit anchor both in intro prose and in breakpoint details introduction
- **Pitfall 4** honored: zero `COPE deprecated` occurrences; Android 11 section uses "Google recommends WPCO as the successor pattern"
- **Pitfall 7** honored: explicit short-form anchor tags `<a id="android-NN-breakpoint"></a>` immediately before each Android-version H3 for stable cross-refs
- **T-34-19** honored: SafetyNet appears exactly 2 times, both inside the `### SafetyNet → Play Integrity (January 2025)` H3 (H3 heading + body explanatory mention) — zero occurrences in matrix rows, platform gate, or See Also

## Decisions Made

- Phrased the platform-gate blockquote to reference "Play Integrity attestation cutover January 2025" rather than "SafetyNet → Play Integrity January 2025" to keep the mechanical SafetyNet count ≤ 2 (T-34-19 guard). This preserves navigational signal (readers learn the scope) while satisfying the grep contract.
- Used explicit short anchor tags (`<a id="android-NN-breakpoint"></a>`) rather than relying on GitHub's auto-anchor of long H3 titles like `### Android 11 — COPE NFC Provisioning Removed`, because Phase 35-42 plans cite the short form and the long auto-anchors are subject to drift if the H3 heading wording is ever edited.
- Added a cross-reference from the AOSP row to `../admin-setup-android/06-aosp-stub.md` as a forward-reference to Phase 39 — not a live link yet (file is created in Phase 39) but a documented dependency target.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Verification] Reduced SafetyNet occurrence count from 3 to 2 for T-34-19 / check 34-04-07 compliance**

- **Found during:** Task 3 verification sweep
- **Issue:** The initial Task 1 platform-gate blockquote enumerated "SafetyNet → Play Integrity January 2025" as one of the non-version breakpoints the file covers, and Task 3 added two additional mentions inside the `### SafetyNet → Play Integrity (January 2025)` subsection (H3 heading + body). Combined total was 3 SafetyNet occurrences, but the plan's verify block requires `grep -ci "safetynet" ... ≤ 2` and threat T-34-19 specifies "SafetyNet appears ≤ 2 times total (H3 heading + body explanatory mention). Any accidental 'SafetyNet' in Matrix row content or See Also is a violation."
- **Fix:** Rephrased the platform-gate blockquote's non-version-breakpoints enumeration to "Play Integrity attestation cutover January 2025" — preserves the navigational signal (the blockquote still tells the reader what drift surfaces this file covers) while removing the extraneous third SafetyNet occurrence. SafetyNet now appears exactly 2 times, both inside the dedicated H3 subsection.
- **Files modified:** `docs/android-lifecycle/03-android-version-matrix.md` (1 line, platform-gate blockquote)
- **Verification:** `grep -ci "safetynet" docs/android-lifecycle/03-android-version-matrix.md` = 2; all matches inside the `### SafetyNet → Play Integrity` H3 subsection at lines 84 and 86
- **Committed in:** `ee05ac6` (rolled into Task 3 commit — fix was in same file as Task 3 content, so committed atomically)

### Intentional Divergences (per locked decisions — not deviations)

- **Phase 39 AOSP stub link** at `../admin-setup-android/06-aosp-stub.md` in the AOSP row is a forward-reference to a file Phase 39 creates — permitted because cross-refs into not-yet-created sibling files are part of the v1.4 dependency DAG and Pitfall 8 only prohibits links to deferred v1.0-v1.3 navigation hubs (common-issues, quick-ref-l1, quick-ref-l2, index). The AOSP stub is in-scope for v1.4.
- **Techcommunity link without path** (`https://techcommunity.microsoft.com/`) in the AMAPI Migration References — Microsoft Tech Community post URLs change, and the general site anchor is more durable than a deep link that 404s at next CMS migration. This matches the source-confidence hierarchy guidance in RESEARCH.md.

---

**Total deviations:** 1 auto-fixed (1 verification tolerance adjustment)
**Impact on plan:** No scope change; all acceptance criteria met; all verify-block grep contracts satisfied.

## Issues Encountered

None beyond the documented SafetyNet-count auto-fix.

## User Setup Required

None — documentation-only plan. No secrets, environment variables, or portal configuration required.

## Downstream Impact

This file becomes the single canonical Android version reference for v1.4. Phase 35-42 plans and admin guides cite into these anchors:

- **Phase 36 (COBO admin guide)** — will cite `#android-11-breakpoint` for the COPE → QR/Zero-Touch migration note and `#android-15-breakpoint` for EFRP configuration step (AECOBO-02, AECOBO-03)
- **Phase 37 (BYOD admin guide)** — will cite `#android-12-breakpoint` for the Android 11 corporate-identifier ceiling and `### AMAPI Migration for BYOD` for the April 2025 migration callout (AEBYOD-03)
- **Phase 38 (Dedicated admin guide)** — will cite `#android-15-breakpoint` for EFRP re-provisioning scope (AEDED-03)
- **Phase 39 (ZTE admin guide)** — will cite `#android-15-breakpoint` for re-enrollment-flow impact
- **Phase 41 (L2 investigation runbooks)** — will cite `### SafetyNet → Play Integrity` for attestation verdict interpretation (AEL2-04)
- **Phase 42 (milestone audit)** — will read `last_verified: 2026-04-21` as the drift anchor; if >60 days elapsed since that date at audit time, this file must be re-verified before v1.4 ships (D-33)

Downstream admin guides must NOT restate Android version numbers inline per Pitfall 1 — they cite back to this matrix (for mode-level Intune minimums) or `02-provisioning-methods.md` (for per-method × per-mode version gates).

## Next Phase Readiness

Wave 2 of Phase 34 is complete with this plan. The only remaining foundation deliverable outside this plan is Plan 03 (provisioning methods matrix) — already committed on this branch by the parallel worktree agent. The phase has landed:

- Wave 1 (Plans 01, 02, 05): glossary, enrollment overview, admin template — complete per STATE.md
- Wave 2 (Plans 03, 04): provisioning methods matrix, version matrix — this plan (04) complete

Phase 35 (android-prerequisites / MGP binding + ZT portal) can now consume all foundation files — enrollment overview, glossary, provisioning methods matrix, version matrix, admin template.

## Self-Check: PASSED

- FOUND: `docs/android-lifecycle/03-android-version-matrix.md` (10,632 bytes, 108 lines, 1,299 words)
- FOUND commit `4b748fa`: Task 1 scaffold (`git log --oneline --all | grep 4b748fa`)
- FOUND commit `b1f8ee1`: Task 2 Version Breakpoint Details
- FOUND commit `ee05ac6`: Task 3 Non-Version Breakpoints + See Also + SafetyNet fix
- All per-task `<verify>` grep blocks return expected values
- All 34-VALIDATION.md check IDs applicable to this plan (34-04-01 through 34-04-07 + 34-all-01, 34-all-02, 34-all-03) return expected values
- Zero modifications to STATE.md or ROADMAP.md (orchestrator-owned)
- Zero modifications to v1.0-v1.3 shared files (Pitfall 9 / 34-all-04 guard upheld)
- One documented auto-fix (Rule 1 — SafetyNet count tolerance)

## Threat Flags

(None — this plan creates only markdown documentation content; no new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. Threats T-34-17 through T-34-20 from the plan's threat register are addressed by the validation checks above: T-34-17 tampering via cited sources + References blocks per breakpoint; T-34-18 anchor resolution via explicit `<a id="...">` tags; T-34-19 SafetyNet terminology hygiene via the 2-occurrence cap enforced inline; T-34-20 frontmatter schema leak prevented by the `min_android_version` grep-zero guard.)

---
*Phase: 34-android-foundation*
*Plan: 04*
*Completed: 2026-04-21*
