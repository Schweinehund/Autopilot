---
phase: 45-per-oem-aosp-expansion
plan: 02
subsystem: documentation
tags: [android, aosp, zebra, ws50, intune, oem-config, oemconfig-apk-push, stagenow, mx-schema, android-12-not-supported, pitfall-7]

# Dependency graph
requires:
  - phase: 39-zero-touch-enrollment-aosp-stub
    provides: PITFALL-7 framing precedent (D-10 + D-13); 9-H2 whitelist scope-guard architecture; source-confidence marker regex (D-20)
  - phase: 44-knox-mobile-enrollment
    provides: 11-H2 sibling-parity baseline (07-knox-mobile-enrollment.md); inline "What breaks if misconfigured" blockquote pattern; <a id="..."></a> anchor convention; verify-UI HTML-comment pattern
  - phase: 45-per-oem-aosp-expansion
    provides: Wave 1 RealWear sibling (09-aosp-realwear.md from Plan 45-01) — 11-H2 + add-on-H2 + PITFALL-7-per-claim + anchor-scaffolding template inherited verbatim
provides:
  - docs/admin-setup-android/10-aosp-zebra.md (Zebra WS50 AOSP admin guide)
  - Stable #common-failures anchor (Wave 3 runbook 29 Cause B cross-link landing target per D-21)
  - Stable #oemconfig-apk-push anchor (Wave 3 L2 runbook 23 Pattern B cross-link target)
  - Zebra column data for Wave 2 aosp-oem-matrix.md (Hardware Scope, Wi-Fi OPTIONAL, vendor portal None, Plan 1 baseline, OEMConfig APK push)
affects:
  - 45-03 Pico admin (sibling Wave 1 — same 11-H2 pattern; independent file)
  - 45-04 HTC VIVE Focus admin (sibling Wave 1 — same)
  - 45-05 Meta Quest admin (sibling Wave 1 — same)
  - 45-06 aosp-oem-matrix.md (Wave 2 — consumes Zebra row from this guide)
  - 45-07 06-aosp-stub.md collapse (Wave 2 — Zebra OEMConfig deep content now lives in 10-aosp-zebra.md)
  - 45-08 L1 runbook 29 (Wave 3 — Cause B cross-links to #common-failures + #oemconfig-apk-push)
  - 45-09 L2 runbook 23 (Wave 3 — Pattern B cross-links to #common-failures)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "11-H2 sibling-parity baseline + REQUIRED OEMConfig APK Push add-on H2 (D-01 + D-02) — applied verbatim from Phase 44 KME admin doc + Plan 45-01 RealWear sibling"
    - "PITFALL-7 framing per-claim discipline (D-04 + D-23) — every 'supported under AOSP' assertion paired inline with AOSP baseline caveat (5 hits)"
    - "Anchor scaffolding contract (D-05) — stable <a id=\"...\"></a> anchors on prerequisites/provisioning-steps/verification/common-failures/renewal-maintenance/what-breaks-summary/oemconfig-apk-push"
    - "Source-confidence marker regex (D-28) — HIGH/MEDIUM markers with last_verified pins on every assertion of fact"
    - "HTML-comment subtractive deletion (D-29 inheritance from Phase 34 D-17) — Managed Google Play + Zero-Touch portal subsections explicitly omitted"
    - "Inline 'What breaks if misconfigured' blockquote at every action point (sibling pattern from 07-knox-mobile-enrollment.md + Plan 45-01 RealWear)"
    - "Two-OEMConfig-app disambiguation table (Powered by MX vs Legacy Zebra OEMConfig) — required per AEAOSPFULL-02 + RESEARCH.md §1 Zebra"
    - "OEMConfig-via-Intune-APK delivery framing (NOT Managed Google Play) — verbatim AEAOSPFULL-02 contrast"
    - "Android-12-NOT-supported callout discipline — 4 hits across Scope and Status (⚠️ blockquote) + Hardware Scope + Common Failures (CRITICAL row) + What Breaks Summary"
    - "License-tier escalation pathway bullet (W-1 fix) — RESEARCH.md Open Question §3 escalation trigger captured at Prerequisites"

key-files:
  created:
    - docs/admin-setup-android/10-aosp-zebra.md
  modified: []

key-decisions:
  - "Authored 12 H2s (11 baseline per D-01 + 1 REQUIRED OEMConfig APK Push add-on per D-02) — matches plan acceptance criterion of >=12"
  - "Two-OEMConfig-app disambiguation table is the load-bearing add-on H2 content: Zebra OEMConfig Powered by MX (Android 13+ AND 11; new app; single-profile recommended) vs Legacy Zebra OEMConfig (Android 11 and earlier; multi-profile supported)"
  - "Android 12 NOT-supported callout placed at 4 surfaces: Scope and Status ⚠️ blockquote + Hardware Scope follow-up paragraph + Common Failures CRITICAL row + What Breaks Summary CRITICAL row — exceeds plan minimum of 1"
  - "PITFALL-7 framing emitted 5 times (Scope and Status canonical statement + Hardware Scope opening + Enrollment Method second paragraph + Common Failures opening + Changelog framing) — exceeds plan minimum of 4 per per-claim discipline"
  - "Anchor scaffolding shipped 7 stable anchors (D-05 minimum) — ready for Wave 3 runbook 29 Cause B + L2 runbook 23 Pattern B cross-link landing"
  - "License-tier escalation pathway bullet authored verbatim from W-1 fix at PLAN line 99 — captures RESEARCH.md Open Question §3 escalation trigger as deployment-blocking ambiguity recovery"
  - "OEMConfig profile authoring path (Step 4) explicitly disambiguates StageNow Export-to-MDM (complex MX-schema bundles) vs direct Intune OEMConfig profile UI (simple cases) — closes RESEARCH.md anti-pattern §'Don't hand-roll MX schema XML'"
  - "Wi-Fi embedding documented as OPTIONAL for WS50 (interactive Wi-Fi UI fallback) — explicitly contrasted with RealWear's REQUIRED stance to avoid OEM cross-pollination"
  - "Userless 90-day vs user-associated 65-year token expiry asymmetry surfaced inline at Step 1 + Common Failures + Renewal/Maintenance (RESEARCH.md headline finding #2)"

patterns-established:
  - "Per-OEM AOSP admin guide template inheritance — Plan 45-02 Zebra is the second of 5 Wave 1 plans; reuses the 11-H2 + add-on-H2 + PITFALL-7-per-claim + anchor-scaffolding + source-confidence-marker discipline established by Plan 45-01 RealWear; no template drift detected"
  - "OEMConfig-via-Intune-APK push delivery framing (Zebra-specific) — Wave 2 aosp-oem-matrix.md OEMConfig delivery column consumes this row's NOT-MGP verdict + APK-push verdict"
  - "Two-OEMConfig-app version-bound disambiguation table convention (Powered by MX vs Legacy Zebra OEMConfig by Android version) — anti-pattern §'Wrong OEMConfig app for Android version' referenced by Common Failures CRITICAL row"

requirements-completed: [AEAOSPFULL-02]

# Metrics
duration: 4min
completed: 2026-04-25
---

# Phase 45 Plan 02: Zebra AOSP Expansion Summary

**Zebra WS50 AOSP admin guide shipped with 11-H2 sibling parity, REQUIRED `## OEMConfig APK Push (Intune)` add-on H2 with two-OEMConfig-app disambiguation (Powered by MX vs Legacy), Android-12-NOT-supported callout (4 hits), OEMConfig-via-Intune-APK push framing (NOT Managed Google Play), license-tier escalation pathway bullet (W-1 fix), PITFALL-7 framing per-claim discipline (5 hits), 7 stable anchors for Wave 3 cross-link landing — 197 lines, audit harness 8/8 PASS, single new file (D-29 shared-file guard satisfied).**

## Performance

- **Duration:** ~4 min (Task 1 author + verify + commit)
- **Started:** 2026-04-25T15:07:31Z
- **Completed:** 2026-04-25T15:11:26Z
- **Tasks:** 1 (Author 10-aosp-zebra.md)
- **Files modified:** 1 created (docs/admin-setup-android/10-aosp-zebra.md), 0 modified
- **Lines:** 197 (must_haves min_lines: 180 satisfied with 17-line headroom)
- **H2 count:** 12 (11 baseline per D-01 + 1 REQUIRED `## OEMConfig APK Push (Intune)` add-on per D-02)
- **OEMConfig prevalence:** 38 occurrences (acceptance min 5)
- **PITFALL-7 framing:** 5 hits (per-claim discipline; plan minimum 4)
- **Anchors:** 7 stable D-05 anchors (`#hardware-scope` is a bonus 8th)

## Accomplishments

- **AEAOSPFULL-02 closed.** Zebra AOSP admin guide live at `docs/admin-setup-android/10-aosp-zebra.md` covering the WS50 wearable scanner with firmware minimum 11-49-15.00, AOSP enrollment mechanics, OEMConfig APK Push add-on H2, two-OEMConfig-app disambiguation table, StageNow Export-to-MDM workflow guidance, MX schema versioning note, and 7-row Common Failures table.
- **OEMConfig two-app disambiguation discipline applied.** The REQUIRED `## OEMConfig APK Push (Intune)` add-on H2 carries the load-bearing two-app table — `Zebra OEMConfig Powered by MX` (Android 13+ AND Android 11; new app; single-profile recommended) versus `Legacy Zebra OEMConfig` (Android 11 and earlier; multi-profile supported). Sourced verbatim from RESEARCH.md §1 Zebra row.
- **OEMConfig-via-Intune-APK push framing locked.** Verbatim AEAOSPFULL-02 contrast "NOT Managed Google Play" present at Enrollment Method paragraph 3 ("OEMConfig-via-Intune-APK path (NOT Managed Google Play) is the locked AOSP delivery method for Zebra"). The HTML-comment subtractive deletion at the top of the file additionally enforces the no-MGP framing for AOSP scope.
- **Android-12-NOT-supported callout discipline.** Four explicit assertions of "Android 12 not supported" — `## Scope and Status` ⚠️ blockquote (canonical statement), `## Hardware Scope` follow-up paragraph (Android 11 → 13+ jump rationale), `## Common Failures` CRITICAL row ("Deployment attempted on Android 12"), and `## What Breaks Summary` CRITICAL row. All sourced from MS Learn `oemconfig-zebra-android-devices` HIGH-confidence marker.
- **License-tier escalation pathway bullet (W-1 fix) authored.** Per RESEARCH.md Open Question §3 recommendation, the Prerequisites section bullet explicitly captures the "escalate to user via STATE.md flag for tenant-specific Plan 1 vs Plan 2 confirmation" trigger — the MEDIUM marker on the baseline Plan 1 assertion documents the ambiguity, and the escalation bullet captures the execute-time disposition. This satisfies the plan's L99 W-1 fix verbatim.
- **PITFALL-7 framing per-claim discipline (D-04 + D-23) honored 5 times** — `## Scope and Status` canonical statement, `## Hardware Scope` opening, `## Enrollment Method` second paragraph, `## Common Failures` opening, plus a Changelog summary line. Exceeds plan minimum of 4.
- **Wave 3 runbook cross-link landing targets shipped** — `<a id="common-failures"></a>` and `<a id="oemconfig-apk-push"></a>` anchors are stable per D-05 contract, ready for L1 runbook 29 Cause B and L2 runbook 23 Pattern B cross-links to land in Wave 3.
- **Token expiry asymmetry surfaced** — userless 90-day vs user-associated 65-year ceilings called out at Step 1 + Common Failures HIGH row + Renewal/Maintenance per RESEARCH.md headline finding #2.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author docs/admin-setup-android/10-aosp-zebra.md (197 lines)** — `6b14514` (feat)

**Plan metadata commit (final):** TBD (final commit ships SUMMARY.md + STATE.md + ROADMAP.md updates)

## Files Created/Modified

- `docs/admin-setup-android/10-aosp-zebra.md` (NEW, 197 lines, ~2200 words) — Zebra WS50 AOSP admin guide. 12 H2s (11 baseline per D-01 + 1 REQUIRED `## OEMConfig APK Push (Intune)` add-on per D-02), 7 stable anchors per D-05, 12+ source-confidence markers per D-28, PITFALL-7 framing 5 hits per D-04 + D-23, frontmatter contract per D-26 + D-27 (last_verified 2026-04-25 + review_by 2026-06-24 + audience admin + platform Android + applies_to AOSP).

## Decisions Made

- **Two-OEMConfig-app disambiguation rendered as a 4-column table** (OEMConfig App | Android Versions | Profile Model | Notes) — RESEARCH.md §1 Zebra row pre-authorized this shape; CONTEXT Claude's Discretion permits author choice for table structure within the add-on H2.
- **Wi-Fi embedding documented as OPTIONAL for WS50** — explicit contrast with RealWear's REQUIRED stance prevents OEM cross-pollination of Wi-Fi-embedding policy. The MEDIUM marker on the OPTIONAL claim sources the MS Learn user-associated profile note ("Wi-Fi details are required if the device doesn't have a button or option that lets it automatically connect"; WS50 has such a UI).
- **Common Failures rendered as 7-row severity-descending table** — 2 CRITICAL (wrong OEMConfig app + Android 12 deployment), 3 HIGH (profile assignment Failed, StageNow XML rejected, userless token expiry), 2 MEDIUM (Wi-Fi stall rare for WS50, LOB APK install failed). Plan acceptance specified 5-7 rows; this delivers 7.
- **Step 4 (OEMConfig profile authoring) split into two explicit paths** — Option A (direct Intune OEMConfig profile UI for simple configs) and Option B (StageNow Export to MDM for complex MX-schema bundles). Closes RESEARCH.md anti-pattern §"Don't hand-roll MX schema XML; use StageNow Export to MDM workflow OR direct OEMConfig profile in Intune."
- **License-tier escalation pathway bullet authored verbatim from W-1 fix at PLAN line 99** — preserves the plan's explicit RESEARCH.md Open Question §3 reference and the STATE.md flag mechanism wording without paraphrasing.
- **No Step 0 wait-gate H3** — plan does not require a Step 0 wait-gate for Zebra (no B2B onboarding latency analogous to Samsung Knox or Meta for Work). Steps numbered 1-5 directly per plan.action item 5.
- **`See Also` section uses bare links (no backticks around paths)** — preserves visual consistency with sibling 07-knox-mobile-enrollment.md and 09-aosp-realwear.md.

## Deviations from Plan

None — plan executed exactly as written.

The line-count target (`min_lines: 180`) was met cleanly on first authoring (197 lines vs 180 floor); no trailer-line addition was needed (Plan 45-01 RealWear required a trailer; Plan 45-02 Zebra did not because the OEMConfig add-on H2 carried more content density). All 11 acceptance criteria from the plan passed on first audit-harness run.

**Total deviations:** 0
**Impact on plan:** None — verbatim execution of plan instructions.

## Issues Encountered

None — context loaded cleanly, the Plan 45-01 RealWear sibling pattern transferred 1:1 to Zebra with the OEMConfig-add-on substituted for the Wi-Fi-QR-embedding add-on, and the audit harness PASS on first execution.

## Self-Check: PASSED

**File existence:**
- `docs/admin-setup-android/10-aosp-zebra.md` — FOUND (197 lines)

**Commit existence:**
- `6b14514` (feat: author Zebra AOSP admin guide) — FOUND in `git log --oneline`

**Acceptance criteria (all from plan):**
- File exists: PASS
- H2 count >=12: PASS (12)
- OEMConfig prevalence >=5: PASS (38)
- Android-12 NOT-supported callout: PASS (4 hits with explicit "not support" / "NOT supported" qualifier)
- "NOT Managed Google Play" verbatim: PASS (1+ hits in Enrollment Method paragraph 3 + HTML-comment + add-on H2 framing)
- PITFALL-7 framing >=4: PASS (5 hits)
- Required anchors >=7: PASS (7 anchors: prerequisites, provisioning-steps, verification, common-failures, renewal-maintenance, what-breaks-summary, oemconfig-apk-push; plus hardware-scope = 8 total)
- Frontmatter (applies_to AOSP, audience admin, last_verified 2026-04-25, review_by 2026-06-24, platform Android): PASS (all 5 fields)
- HTML-comment subtractive deletions (Managed Google Play + Zero-Touch): PASS (both present)
- Universal banner (Platform gate + Platform note): PASS (both blockquotes present before H1)
- Two-OEMConfig-app disambiguation present (Powered by MX + Legacy Zebra OEMConfig): PASS (both terms present in OEMConfig APK Push table + Step 5 + Common Failures CRITICAL row)
- Audit harness PASS: PASS (8/8 PASS, exit 0)
- Shared-file modification guard (D-29): PASS (only `docs/admin-setup-android/10-aosp-zebra.md` created; no other writes in scope)
- License-tier escalation pathway bullet (W-1 fix L99): PASS (Prerequisites bullet authored verbatim)

## User Setup Required

None — documentation-only plan. No external service configuration required.

## Next Phase Readiness

**Wave 1 unlocks:** This is the second of 5 Wave 1 per-OEM admin docs (Plans 45-01 through 45-05). Plans 45-03 (Pico), 45-04 (HTC VIVE Focus), and 45-05 (Meta Quest) inherit the same 11-H2 skeleton + PITFALL-7-per-claim + anchor-scaffolding + source-confidence-marker discipline established by Plan 45-01 RealWear and reused here. Each is independent (disjoint file sets) per D-30 Wave 1 parallelization contract.

**Wave 2 readiness:** When all Wave 1 plans land, Wave 2 plans (45-06 aosp-oem-matrix.md, 45-07 06-aosp-stub.md collapse) can consume the Zebra column data shipped here:
- Hardware Scope row: WS50 + 11-49-15.00 firmware floor + Wearable Scanner type + Android 11 (NOT 12)
- Enrollment Method and Wi-Fi Embedding row: QR-only AOSP, Wi-Fi OPTIONAL (interactive UI fallback)
- Vendor Portals and Licensing row: None required (StageNow OPTIONAL), Plan 1 baseline (Plan 2 ambiguity flagged)
- Intune AOSP Mode row: BOTH user-associated AND userless supported (userless typical for shared-shift wearable scanners)
- OEMConfig delivery: APK push via Intune LOB (NOT MGP); two apps disambiguated by Android version

**Wave 3 readiness:** L1 runbook 29 Cause B and L2 runbook 23 Pattern B can land cross-links at the stable `#common-failures` and `#oemconfig-apk-push` anchors per D-21 + D-05.

**Blockers:** None.

---
*Phase: 45-per-oem-aosp-expansion*
*Completed: 2026-04-25*
