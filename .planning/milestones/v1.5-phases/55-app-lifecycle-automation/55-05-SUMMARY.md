---
phase: 55
plan: 05
subsystem: documentation/operations/app-lifecycle
tags: [android, managed-google-play, mgp, zebra, oemconfig, app-lifecycle, app-07, app-08]
requirements_addressed: [APP-07, APP-08]
dependency_graph:
  requires:
    - .planning/phases/55-app-lifecycle-automation/55-CONTEXT.md (D-10 4C-prime hybrid; D-11 AMAPI inline; D-12 filename retention; D-13 platform applicability blockquote; D-15 zero hard-deadline; D-19 platform: Android; D-20 pinned anchor strings; D-21 atomic single-commit; CDI-Phase55-03 no three-layer; CDI-Phase55-07 Zebra OEMConfig content split)
    - .planning/phases/55-app-lifecycle-automation/55-RESEARCH.md (§7 LOW-MEDIUM caveat #2 AMAPI 2024-2025 softening; §8 MGP private-app publishing facts; §9 Zebra OEMConfig Phase 45 SSoT verification)
    - .planning/phases/55-app-lifecycle-automation/55-VALIDATION.md (Per-Task rows 55-05-01..07; Manual-Only Verifications row 2 plan-author resolution)
    - docs/operations/patch-management/04-android-patch-delivery.md (Phase 54 sibling — peer-H2-plus-cross-link pattern parity at lines 134 + 184; Platform applicability blockquote shape at line 9)
    - docs/admin-setup-android/10-aosp-zebra.md (Phase 45 v1.4.1 SSoT — 24,518 bytes; line 56 verbatim "OEMConfig profile delivery is via Intune APK push (NOT Managed Google Play — AOSP has no GMS, and therefore no MGP delivery channel)"; lines 116-119 two-OEMConfig-app disambiguation table — preserved unchanged)
    - docs/admin-setup-android/01-managed-google-play.md (Phase 45 v1.4 — MGP tenant binding admin guide; this Phase 55 file covers private-app *publishing*, the admin-setup file covers tenant *binding* — anti-duplication boundary respected)
  provides:
    - "Android-specific app-lifecycle operations guide covering MGP private-app publishing (APP-07) and Zebra OEMConfig APK side-load NOT via MGP (APP-08); 4C-prime hybrid pattern (peer H2s + Phase 45 cross-link) per CONTEXT D-10"
  affects:
    - "ROADMAP §Phase 55 Success Criteria #5 (admin can publish Android private apps via MGP AND operate Zebra OEMConfig app lifecycle using APK side-load NOT via MGP)"
    - "REQUIREMENTS.md APP-07 + APP-08 traceability rows"
tech_stack:
  added: []
  patterns:
    - "4C-prime hybrid: filename retention + two peer top-level H2s + Phase 45 cross-link to substantive Zebra OEMConfig SSoT (D-10 winner pattern)"
    - "AMAPI 2024-2025 softened phrasing per RESEARCH §7 LOW-MEDIUM caveat #2 (custom-apps SDK feature appears in Google AMAPI release notes August 2025; broader AMAPI custom-apps direction set April 2024)"
    - "Phase 54 sibling pattern parity: peer-H2-plus-cross-link mirrors docs/operations/patch-management/04-android-patch-delivery.md:134 substantive Zebra LifeGuard H2 + :184 cross-link to admin-setup"
    - "Platform applicability blockquote at TOP routing to 00-overview hub + 3 sibling per-platform files (D-13)"
    - "Zero hard-deadline; AMAPI is soft historical context with single inline mention (D-15 + CDI-Phase55-03 no three-layer treatment)"
    - "SSoT preservation: substantive Zebra OEMConfig content lives in Phase 45 admin guide (24,518 bytes preserved); Phase 55 file carries operational summary + 3-bullet operate-the-lifecycle list + cross-link only (D-10 + CDI-Phase55-07)"
key_files:
  created:
    - "docs/operations/app-lifecycle/04-android-mgp-lifecycle.md (146 lines)"
  modified: []
decisions: []
metrics:
  duration_minutes: 8
  completed_date: 2026-04-28
---

# Phase 55 Plan 05: Android MGP + Zebra OEMConfig Summary

**One-liner:** Authored `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` — Android app-lifecycle guide with two peer H2s (MGP private-app publishing substantive content for APP-07 + Zebra OEMConfig APK side-load operational summary with cross-link to Phase 45 SSoT for APP-08) per CONTEXT D-10 4C-prime hybrid pattern.

## Scope

This plan implements REQ APP-07 (Managed Google Play private-app publishing: direct APK upload to MGP private track + MGP web app for web-clip shortcuts + AMAPI custom-apps API change with softened 2024-2025 phrasing) and REQ APP-08 (Zebra OEMConfig APK side-load — explicitly NOT via Managed Google Play — per Phase 45 precedent; operate the OEMConfig app lifecycle: update / revoke / troubleshoot).

The output file is the **4C-prime hybrid winner per CONTEXT D-10**: filename retained for naming-convention parity with sibling per-platform files (`01-windows-win32-msix-scale.md`, `02-macos-pkg-dmg-pipeline.md`, `03-ios-vpp-licensing.md`) + two peer top-level H2s (NOT sub-H3 demotion; NOT verbose conjunction-form filename) + Phase 45 cross-link for substantive Zebra OEMConfig content. The pattern mirrors Phase 54 sibling `04-android-patch-delivery.md` (peer-H2-plus-cross-link at lines 134 substantive Zebra LifeGuard + 184 cross-link to Phase 45 Knox guide).

## Sections Authored

The output file contains the following sections in document order:

1. **Frontmatter** (D-19) — `last_verified: 2026-04-28`, `review_by: 2026-06-27`, `applies_to: all`, `audience: admin`, `platform: Android` (single-string per D-19; not array form)
2. **Platform applicability blockquote at TOP** (D-13 + V-55-26) — verbatim `> **Platform applicability:**` token routing back to 00-overview hub + 3 sibling per-platform files (Windows / macOS / iOS)
3. **H1 + intro paragraph** — `# Android App Lifecycle: Managed Google Play + Zebra OEMConfig` followed by intro covering both delivery paths and explicit cross-links to 00-overview + Phase 45 Zebra admin guide
4. **`## Managed Google Play Private App Publishing` peer H2** (substantive — APP-07) with 3 H3 subsections:
   - `### Direct APK upload to MGP private track` — Intune admin center > Apps > Add > Managed Google Play app embedded MGP iframe; APK signing + API level + permissions; private-track standard publishing surface for Android LOB
   - `### MGP web app for web-clip shortcuts` — MGP web app as Android analog of iOS web clip; URL + icon publishing form vs APK
   - `### AMAPI custom-apps API change (applicable since 2024-2025)` — AMAPI custom-apps direction set April 2024; custom-apps SDK feature in Google AMAPI release notes August 2025; soft historical context, NOT hard deadline; back-end integration; single inline mention with year reference
5. **`## Zebra OEMConfig APK Side-Load (NOT via MGP) {#zebra-oemconfig}` peer H2** (operational summary + cross-link — APP-08):
   - 5-line operational summary describing Zebra AOSP no-GMS / no-MGP delivery channel constraint with explicit cross-quote of Phase 45 line 56
   - 3-bullet **operate-the-lifecycle** list discharging APP-08 verb requirement: **Update** (re-upload new APK + Intune Management Extension push + verify in device-app inventory) / **Revoke** (change assignment to Uninstall + IME uninstall on next check-in + verify settings revert) / **Troubleshoot** (wrong-OEMConfig-app per Phase 45 lines 116-119 disambiguation; AOSP enrollment-mode mismatch; on-device profile assignment + check-in verification)
   - Closing cross-link to `../../admin-setup-android/10-aosp-zebra.md` for substantive content
6. **`## Related Resources`** — 4 cross-links: 00-overview hub + Phase 45 Zebra admin guide + Phase 45 MGP admin-setup (anti-duplication awareness) + Phase 54 Android patch-delivery sibling
7. **`## External References`** — 5 external links: Microsoft Learn MGP doc + Google MGP/AMAPI/custom-apps docs + Zebra OEMConfig + Operations Documentation Index back-reference

## V-55-NN Validator Assertions Satisfied

This file satisfies the following validator assertions enforced by `scripts/validation/check-phase-55.mjs` (authored by 55-06 in Wave 2):

| Assertion | Result | Evidence |
|-----------|--------|----------|
| V-55-05 | PASS | File exists at `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (146 lines) |
| V-55-07 | PASS | Frontmatter contains `platform: Android` + `audience: admin` + 60-day cycle (`last_verified: 2026-04-28` + `review_by: 2026-06-27` = 60-day delta) |
| V-55-22 | PASS | `## Managed Google Play Private App Publishing` H2 + literals `private track` (subsection 1 H3 + body) + `web app` (subsection 2 H3 + body) + `web clip` (subsection 2 H3 + body) + `AMAPI` (subsection 3 H3 + body, multiple) + `2024` (subsection 3 body, multiple including 2024-2025 framing) |
| V-55-23 | PASS | `## Zebra OEMConfig APK Side-Load (NOT via MGP) {#zebra-oemconfig}` peer H2 + literals `OEMConfig` (multiple) + `APK side-load` (operational summary + 3-bullet list) + `APK push` (cross-link prose) + `NOT via MGP` (in H2 title) + `NOT Managed Google Play` (operational summary cross-quote of Phase 45 line 56) |
| V-55-24 | PASS | Cross-link `../../admin-setup-android/10-aosp-zebra.md` appears 3× (intro paragraph + Zebra OEMConfig peer H2 closing + Related Resources) |
| V-55-25 | PASS | 3-bullet operate-the-lifecycle list within `## Zebra OEMConfig` H2 scope: `update` (bullet 1) + `revoke` (bullet 2) + `troubleshoot` (bullet 3) — discharges APP-08 "operate the OEMConfig app lifecycle" verb requirement |
| V-55-26 | PASS | `> **Platform applicability:**` blockquote present in body within first 50 lines (line 9 of body, frontmatter excluded) |
| V-55-27 | PASS (NEGATIVE) | 0 instances of bare `> **Platform:**` token (file uses `> **Platform applicability:**` D-13 form, not Phase 54 D-04 deprecated bare form) |
| V-55-30 | PASS (NEGATIVE) | 0 instances of TBD/TODO/FIXME/XXX/PLACEHOLDER tokens |
| V-55-31 | PASS | Multi-platform frontmatter present (`platform: Android` for D-19 single-string form) |

## Cross-Link Paths Used

| From | To | Purpose | Pattern |
|------|----|---------|--------|
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (multiple) | `docs/admin-setup-android/10-aosp-zebra.md` | Phase 45 v1.4.1 Zebra OEMConfig admin guide SSoT (substantive Hardware Scope, Prerequisites, Provisioning, OEMConfig APK Push, two-OEMConfig-app disambiguation; 24,518 bytes preserved) | `../../admin-setup-android/10-aosp-zebra.md` (×3 occurrences) |
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | `docs/operations/app-lifecycle/00-overview.md` | Cross-platform overview hub (Platform applicability blockquote + intro + Related Resources) | `00-overview.md` |
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` | Sibling per-platform reference (Platform applicability blockquote) | `01-windows-win32-msix-scale.md` |
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` | Sibling per-platform reference (Platform applicability blockquote) | `02-macos-pkg-dmg-pipeline.md` |
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` | Sibling per-platform reference (Platform applicability blockquote) | `03-ios-vpp-licensing.md` |
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | `docs/admin-setup-android/01-managed-google-play.md` | Phase 45 v1.4 MGP tenant-binding admin guide (anti-duplication boundary; this Phase 55 file covers *publishing* lifecycle on top of an already-bound tenant) | `../../admin-setup-android/01-managed-google-play.md` |
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | `docs/operations/patch-management/04-android-patch-delivery.md` | Phase 54 Android sibling (Zebra LifeGuard OTA firmware management; sibling ops-domain — OEMConfig app via APK push, device firmware via LifeGuard) | `../patch-management/04-android-patch-delivery.md` |
| `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | `docs/operations/00-index.md` | Cross-reference back to Operations Documentation Index (Phase 53 created; Phase 55 does NOT amend per V-55-28 NEGATIVE regression-guard) | `../00-index.md` |

External links: Microsoft Learn MGP doc (canonical reference) + Google MGP/AMAPI/custom-apps developer docs + Zebra OEMConfig product docs.

## AMAPI Phrasing Resolution (CD-11 + RESEARCH §7 caveat #2)

REQ APP-07 verbatim says "applicable since 2024" but Google's AMAPI release notes show the custom-apps SDK feature first appearing in **August 2025** — the 2024 attribution is unverifiable in primary Google evidence. Plan-author resolved this per RESEARCH §7 LOW-MEDIUM caveat #2 + 55-VALIDATION.md Manual-Only Verifications row 2 + CD-11 plan-author discretion as follows:

**Chosen phrasing:** "applicable since 2024-2025" (RESEARCH §7 caveat #2 option (a) — most conservative)

**Body content explicitly bridges both years:**
> "The Android Management API (AMAPI) custom-apps surface evolved during 2024-2025: the broader AMAPI custom-apps direction was set in **April 2024**, and the corresponding custom-apps SDK feature appears in Google's AMAPI release notes around **August 2025**."

**Rationale:**
- Validator V-55-22 accepts any phrasing containing both `AMAPI` AND `2024` literals — both present (multiple instances of each)
- Conservative softening preserves REQ APP-07 spirit ("since 2024") while honoring verifiable Google AMAPI release notes evidence (August 2025 for custom-apps SDK)
- Avoids over-claiming a 2024 GA date that primary Google evidence does not support
- Single inline mention placement within MGP H2 body content per D-11 (NOT at file top); NO `> ⚠️` blockquote per D-15 + CDI-Phase55-03 (zero hard-deadline items in Phase 55; AMAPI is soft historical context, not hard cutover deadline)

## Operational Summary Line Count (CDI-Phase55-07)

The Zebra OEMConfig peer H2 section spans approximately **30 lines including 5-line operational summary + 12-line 3-bullet operate-the-lifecycle list + 4-line closing cross-link prose**. This stays well within the CDI-Phase55-07 informal ~25-line guideline (slight over-run is acceptable because the 3-bullet operate-the-lifecycle list is required by V-55-25 and discharges APP-08 "operate" verb requirement; cross-link footer is required by V-55-24).

**SSoT preservation verified:**
- Phase 45 admin guide `docs/admin-setup-android/10-aosp-zebra.md` remains at 24,518 bytes — UNCHANGED by this plan
- This file does NOT duplicate Hardware Scope, Prerequisites, Provisioning Steps, OEMConfig APK Push mechanics, two-OEMConfig-app disambiguation table — all preserved in Phase 45 SSoT
- Cross-link prose explicitly redirects readers to Phase 45 for substantive content (3 cross-link occurrences)

## Deviations from Plan

None — plan executed exactly as written. All authored content matches the `<action>` block in 55-05-PLAN.md verbatim or substantively (with the two minor improvements below for consistency):

- **Improvement 1:** Added explicit Phase 45 admin-setup MGP tenant-binding cross-link (`docs/admin-setup-android/01-managed-google-play.md`) inside the `### Direct APK upload to MGP private track` H3 subsection to call out the anti-duplication boundary (this Phase 55 file covers private-app *publishing* lifecycle; the admin-setup file covers tenant *binding*). The CLAUDE.md instructions emphasize anti-duplication awareness and the plan's `<read_first>` block lists this admin-setup file as required reading. The cross-link makes the boundary explicit for admins navigating the doc tree.
- **Improvement 2:** Added a closing sentence to `### MGP web app for web-clip shortcuts` confirming web-app assignment intent parity with APK-published private apps (Required / Available accepted on both surfaces) — completes the parallel structure between the two H3 subsections.

Both improvements are non-structural prose additions that do not affect any V-55-NN validator assertion.

## Auth Gates

None — documentation-only plan; no authentication or authorization gates encountered.

## Self-Check: PASSED

**Files verified to exist:**
- `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` — FOUND (146 lines)

**Cross-link target verified to exist (D-10 SSoT preservation):**
- `docs/admin-setup-android/10-aosp-zebra.md` — FOUND (24,518 bytes; line 56 verbatim disclaimer present)
- `docs/admin-setup-android/01-managed-google-play.md` — FOUND (9,188 bytes)
- `docs/operations/patch-management/04-android-patch-delivery.md` — FOUND (sibling Phase 54 pattern reference)
- `docs/operations/app-lifecycle/00-overview.md` — FOUND (Phase 55 Wave 1 cross-platform hub; cross-link target authored by 55-01 in same atomic commit)

**Validator grep checks executed against output file:**

| V-NN | Check | Result |
|------|-------|--------|
| V-55-05 | `test -f docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` | PASS |
| V-55-07 | Frontmatter `platform: Android` + `audience: admin` + 60-day cycle | PASS |
| V-55-22 | MGP H2 + `private track` + `web app` + `AMAPI` + `2024` literals | PASS |
| V-55-23 | Zebra OEMConfig peer H2 + `OEMConfig` + `APK side-load`/`APK push` + `NOT via Managed Google Play`/`NOT Managed Google Play` literals | PASS |
| V-55-24 | Cross-link `../../admin-setup-android/10-aosp-zebra.md` (≥1) | PASS (3 occurrences) |
| V-55-25 | 3-bullet operate-the-lifecycle list `update` + `revoke` + `troubleshoot` within Zebra OEMConfig H2 scope | PASS |
| V-55-26 | `> **Platform applicability:**` blockquote within first 50 lines of body | PASS |
| V-55-27 | NEGATIVE: NO bare `> **Platform:**` token (`grep -c "^> \*\*Platform:\*\*$"` = 0) | PASS |
| V-55-30 | NEGATIVE: NO TBD/TODO/FIXME/XXX/PLACEHOLDER tokens | PASS |
| V-55-31 | Multi-platform frontmatter `platform: Android` (D-19 single-string form) | PASS |

**Content correctness checks (not validator-asserted):**

| Check | Result |
|-------|--------|
| Two peer top-level H2s in document order (NOT sub-H3 demotion; NOT three+ peer H2s) | PASS — `## Managed Google Play Private App Publishing` + `## Zebra OEMConfig APK Side-Load (NOT via MGP)` (Related Resources + External References are footer H2s, permitted per D-10) |
| Filename retained per D-12 | PASS — `04-android-mgp-lifecycle.md` (no rename to verbose conjunction-form) |
| AMAPI 2024 framing inside MGP H2 body (NOT at file top) per D-11 | PASS — single inline mention in `### AMAPI custom-apps API change` H3 subsection within MGP H2 |
| NO `> ⚠️ **Hard deadline` blockquote per D-15 + CDI-Phase55-03 | PASS — zero matches |
| AMAPI phrasing softened to "applicable since 2024-2025" per RESEARCH §7 caveat #2 + CD-11 | PASS — H3 title `### AMAPI custom-apps API change (applicable since 2024-2025)` + body bridges April 2024 + August 2025 |
| Substantive Zebra OEMConfig content NOT duplicated (Phase 45 SSoT preserved at 24,518 bytes) | PASS — file contains 5-line operational summary + 3-bullet operate-the-lifecycle list + cross-link only |

## Threat Flags

None — Phase 55 is documentation-only. No code paths modified, no API surface added, no authentication/authorization changes, no data handling, no third-party dependency additions. Documentation accuracy is the only safety surface and is enforced by literal-token regex validator (`check-phase-55.mjs`, authored by 55-06 in Wave 2) + Microsoft Learn citation discipline + 60-day `last_verified` frontmatter cycle.

## Atomic Commit Status

**NO COMMIT MADE** — Phase 55 uses single-atomic-commit pattern per CONTEXT D-21. Plan 55-07 (Wave 3 atomic-commit gate author) creates the single atomic commit covering all 5 markdown files (`00-overview.md` from 55-01 + `01-windows-win32-msix-scale.md` from 55-02 + `02-macos-pkg-dmg-pipeline.md` from 55-03 + `03-ios-vpp-licensing.md` from 55-04 + `04-android-mgp-lifecycle.md` from this plan) plus the validator script (`check-phase-55.mjs` from 55-06 in Wave 2).

Per the executor's `<commit_override>` directive:
- Skipped `git_commit_metadata` step
- Skipped per-task `git commit` invocations
- Did NOT update STATE.md or ROADMAP.md
- Authored output file + this SUMMARY.md only
