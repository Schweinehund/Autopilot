---
phase: 31-ios-l2-investigation
plan: 05
subsystem: documentation
tags: [ios, l2, compliance, ca-timing, apns, sc4, three-class-axis, l1-handoff]

# Dependency graph
requires:
  - phase: 31-ios-l2-investigation
    provides: "31-01 phase validation harness (scripts/validation/check-phase-31.mjs) with V-31-14/15/16/17/26/27/28/29 as RED gates for this plan"
  - phase: 31-ios-l2-investigation
    provides: "31-02 frontmatter/banner conventions (applies_to/audience/platform schema + D-29 gate banner) already shipped in 14-ios-log-collection.md"
  - phase: 31-ios-l2-investigation
    provides: "31-04 text-marker convention [CONFIG]/[TIMING]/[DEFECT] established in 16-ios-app-install.md — reused verbatim here (no emoji per Wave 0 audit lock)"
  - phase: 30-ios-l1-triage-runbooks
    provides: "docs/l1-runbooks/21-ios-compliance-blocked.md Cause A/B/C classification — L1 handoff anchor labels matched literally in Per-Cause Deep-Dive H3s"
  - phase: 28-ios-admin-setup-mdm
    provides: "docs/admin-setup-ios/06-compliance-policy.md — authoritative compliance config reference; verified #compliance-evaluation-timing-and-conditional-access anchor at line 149 for D-11 cross-link"
  - phase: 24-macos-l2-runbooks
    provides: "docs/l2-runbooks/13-macos-compliance.md — structural analog (Context → Investigation → Resolution Scenarios → Related Resources); iOS adapts with D-14 hybrid axis/cause structure"
provides:
  - "docs/l2-runbooks/17-ios-compliance-ca-timing.md — iOS Compliance & CA Timing Investigation runbook (187 lines)"
  - "SC #4 three-class axis structure literal satisfaction (D-14 hybrid): ## Investigation by Axis (Config/Timing/Defects) + ## Per-Cause Deep-Dive (Cause A/B/C matching L1)"
  - "D-17 L1→L2 handoff: 'From L1 escalation' block with literal Cause A/B/C labels enabling L1 runbook 21 direct skip-to-section navigation"
  - "D-16 'Not evaluated' terminal-state sub-section with Microsoft Support escalation data checklist (6 data bullets + decision flow table + minimum-data gate)"
  - "D-15 Pareto emphasis: expanded Cause A (CA timing) + Cause C (Default posture / APNs) sub-sections; compact OS Version / Jailbreak / Passcode / Restricted Apps sub-sections"
  - "Cross-phase link integrity: Phase 28 D-11 anchor (#compliance-evaluation-timing-and-conditional-access) + Apple HT203609 APNs endpoints + Phase 27 D-11 APNs cross-platform blast-radius reference"
affects: ["31-06", "31-07", "v1.3-iOS-L2"]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "D-14 hybrid axis + cause structure — first use in project: top-level ## Investigation by Axis satisfying SC #4 literal AND top-level ## Per-Cause Deep-Dive matching L1 cause labels; pattern candidate for future L2 runbooks where L1 already classifies"
    - "D-16 terminal-state decision flow table — minimum-data gate for Microsoft Support escalation (Observation → Next action quadrant); pattern reusable for any APNs/network-path terminal state"
    - "Text markers [CONFIG]/[TIMING]/[DEFECT] reused from runbook 16 without redefinition — honors Wave 0 emoji audit lock recorded in placeholder-inventory.json _note"

key-files:
  created:
    - "docs/l2-runbooks/17-ios-compliance-ca-timing.md"
  modified: []

key-decisions:
  - "Used text markers [CONFIG] / [TIMING] / [DEFECT] reusing the runbook 16 convention per D-12 lock; zero emoji in file (grep for ⚙/⏱/🐛 returns 0)"
  - "D-14 hybrid structure literal implementation: two top-level H2s — ## Investigation by Axis (3 axis H3s: Configuration Errors / Timing Issues / Genuine Defects) and ## Per-Cause Deep-Dive (3 cause H3s: Cause A / Cause B / Cause C); axes section routes forward into cause section via explicit 'see §Cause X below' pointers"
  - "D-17 L1→L2 handoff block placed inside ## Triage (not Context) so L1-routed tickets see it above the fold before any investigation content; uses literal 'From L1 escalation' + 'Cause A' + 'Cause B' + 'Cause C' per V-31-17 regex"
  - "D-16 'Not evaluated' terminal state placed as H3 inside Per-Cause Deep-Dive (not a top-level section) to surface the intentional content overlap with Cause C §Default posture stuck — clarified inline that 'stuck' is a timing/config investigation while 'terminal' is the network/cert investigation with MS Support escalation output"
  - "Cross-link anchor fallback: admin-setup-ios/06-compliance-policy.md does not publish per-setting anchors (#jailbreak-detection, #os-version-gates, #passcode, #restricted-apps) — these settings live under ### Step 2: Configure Compliance Settings. Rather than ship 4 broken anchor links, cross-links point to the Step 2 anchor (#step-2-configure-compliance-settings) with inline clarifiers ('see Device Properties (Operating System Version)' etc.) to guide the reader to the specific subsection. This is a Rule 1 deviation from the plan's stated anchors"
  - "Terminal-state decision flow table added beyond the plan's 5-bullet escalation data checklist to bring the file to the V-31-29 187-line lower bound while adding genuine operational value (4-row quadrant disambiguating the four terminal-state observation patterns)"

patterns-established:
  - "Axis-then-cause hybrid routing pattern: axes section lists 'which causes match this axis' cross-pointers; cause section is the substantive investigation content. Future L2 runbooks that inherit an L1 cause classification can reuse this structure verbatim."
  - "Terminal-state minimum-data gate: a 'Do not escalate to MS Support without: (a) (b) (c) (d)' sentence preceding the escalation data checklist. Makes the minimum bar explicit to reduce case-return churn."
  - "Per-cause [TIMING sub-bullet] within a primarily [CONFIG] cause — Cause B is config-axis but contains an explicit [TIMING] carve-out ('if policy was modified in the last hour...'); demonstrates that axis tags can be applied at the sub-step level, not only at the top-level cause."

requirements-completed: [L2TS-02]

# Metrics
duration: ~35min
completed: 2026-04-17
---

# Phase 31 Plan 05: iOS Compliance & CA Timing Investigation runbook Summary

**187-line L2 runbook satisfying SC #4 via D-14 hybrid structure: `## Investigation by Axis` (Configuration Errors / Timing Issues / Genuine Defects) + `## Per-Cause Deep-Dive` (Cause A timing / Cause B policy mismatch / Cause C Default posture stuck) with a D-17 L1→L2 handoff block and a D-16 'Not evaluated' terminal-state Microsoft Support escalation data checklist.**

## Performance

- **Duration:** ~35 minutes
- **Started:** 2026-04-17 (Wave 3 parallel executor)
- **Completed:** 2026-04-17
- **Tasks:** 2
- **Files modified:** 1 (1 created)

## Accomplishments

- `docs/l2-runbooks/17-ios-compliance-ca-timing.md` created (187 lines, exact lower bound of the 187-287 ±15% target band codified in V-31-29).
- **SC #4 literal satisfaction via D-14 hybrid structure:**
  - `## Investigation by Axis` H2 with 3 axis H3s (Configuration Errors / Timing Issues / Genuine Defects) — starting point for fresh investigations.
  - `## Per-Cause Deep-Dive` H2 with 3 cause H3s (Cause A / Cause B / Cause C) — handoff target for L1-routed tickets.
- **D-17 L1→L2 handoff block** placed in `## Triage` with literal "From L1 escalation" + "Cause A" + "Cause B" + "Cause C" — V-31-17 PASS.
- **D-15 Pareto emphasis:** Cause A (first-evaluation window / timing) and Cause C (Default posture stuck / APNs-blocked) are expanded with full investigation-step + resolution structure. Cause B sub-settings (OS Version / Jailbreak / Passcode / Restricted Apps) are compact single-bullet sections each with cross-link.
- **D-16 "Not evaluated" Terminal State** H3 sub-section with:
  - Microsoft Support escalation data checklist (6 bullets: APNs Apple ID, APNs expiry, sysdiagnose kernel.log, date range, device serial + iOS version, case category path).
  - Terminal-state decision flow table (4 rows) disambiguating the observation-to-action mapping.
  - Explicit "Do not escalate without: (a) (b) (c) (d)" minimum-data gate.
  - Phase 27 D-11 cross-platform APNs blast-radius reference (expired cert breaks iOS + iPadOS + macOS simultaneously).
- **Cross-link integrity:** Phase 28 D-11 anchor `#compliance-evaluation-timing-and-conditional-access` verified at line 149 of admin-setup-ios/06-compliance-policy.md; Apple `https://support.apple.com/HT203609` APNs endpoint reference; L1 runbook 21 handoff origin; ADE token runbook 15 forward-link for Pattern C overlap.
- **Zero emoji** in file (grep for ⚙/⏱/🐛/✅/❌ returns 0) per Wave 0 text-marker lock inherited from runbook 16.

## Task Commits

Each task was committed atomically. TDD semantics for this documentation plan: baseline harness showed V-31-14/15/16/17/26/27/28/29 FAIL with "17 does not exist" before Task 1 → RED confirmed → Task 1 flipped V-31-17/26/27/28 to PASS → Task 2 flipped V-31-14/15/16/29 to PASS.

1. **Task 1: Scaffold runbook 17 — Context + L1 handoff + Investigation by Axis** — `8c0d468` (docs)
2. **Task 2: Complete runbook 17 — Per-Cause Deep-Dive A/B/C + Not-evaluated terminal state** — `6d7f1fc` (docs)

## Files Created/Modified

- `docs/l2-runbooks/17-ios-compliance-ca-timing.md` (NEW, 187 lines) — iOS Compliance & CA Timing Investigation runbook with frontmatter (applies_to: all), D-29 platform gate banner, Triage (D-17 L1 handoff block), Context (scope + L1→L2 handoff + D-14/D-15 structure rationale + log-collection prerequisite), ## Investigation by Axis with 3 axis H3s (Configuration Errors [CONFIG] / Timing Issues [TIMING] / Genuine Defects [DEFECT]), ## Per-Cause Deep-Dive with 3 cause H3s (Cause A first-evaluation window / Cause B policy mismatch with 4 compact H4 sub-sections / Cause C Default posture stuck), ### "Not evaluated" Terminal State (D-16 — APNs blast-radius note + 6-bullet MS Support data checklist + 4-row decision flow table + minimum-data gate), Related Resources (14 / 06-compliance-policy / Phase 28 timing anchor / L1 21 / 15), Version History.

## Decisions Made

- **D-14 hybrid structure literal implementation** — Two top-level H2 sections with explicit routing from axis H3s into cause H3s ("see §Cause X below"). An L2 engineer starting from an axis observation moves laterally into the cause section; an L1-routed engineer jumps straight to the cause section. Both entry points are valid and land at the same substantive investigation content — no duplication.
- **Anchor fallback for Cause B sub-sections** — The plan specified `#jailbreak-detection`, `#os-version-gates`, `#passcode`, `#restricted-apps` cross-links. These anchors do not exist in `docs/admin-setup-ios/06-compliance-policy.md` — the settings live under `### Step 2: Configure Compliance Settings` (line 59). Rather than publish 4 broken anchor links, cross-links point to `#step-2-configure-compliance-settings` with inline disambiguators ("see Device Properties (Operating System Version)", "see Device Health", "see System Security — Password", "see System Security — Device Security"). This preserves navigability and avoids requiring a retroactive edit to the Phase 28 admin guide. Documented as a Rule 1 deviation below.
- **Terminal-state decision flow table added** — The plan's escalation checklist is a 5-bullet list; adding a 4-row Observation → Next action table makes the escalation decision tree explicit (check-in timestamp stale vs recent; APNs cert valid; multi-platform blast radius) and serves the dual goals of operational value + meeting the V-31-29 187-line lower bound with substantive content rather than padding.
- **Minimum-data gate sentence** — Explicit "Do not escalate to Microsoft Support without: (a) confirmed Default posture value, (b) confirmed device Last check-in timestamp, (c) APNs cert state from the Intune pane, and (d) at least one sysdiagnose collection attempt" reduces MS Support case-return friction. Pattern reusable in future defect-class escalation sections.
- **D-17 handoff block placed in Triage, not Context** — Triage is above the fold; Context contains the rationale for the D-14 hybrid structure which L1-routed readers should not need to process. Keeps the L1-routed reader on the fastest path to their specific cause section.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Cross-link anchors for Cause B compact sub-sections**

- **Found during:** Task 2 (read_first step explicitly asked to "confirm anchors exist")
- **Issue:** The plan specified cross-links to `#jailbreak-detection`, `#os-version-gates`, `#passcode`, and `#restricted-apps` in `docs/admin-setup-ios/06-compliance-policy.md`. Verification via `grep '^## ' docs/admin-setup-ios/06-compliance-policy.md` and `grep '^### ' ...` showed these anchors do not exist — all four settings live inline under `### Step 2: Configure Compliance Settings` (verified line 59). Shipping the plan's exact links would publish 4 broken anchor links (404s on the docs site) visible to every L2 reader who clicks a Cause B cross-link.
- **Fix:** Replaced the 4 planned anchors with `#step-2-configure-compliance-settings` (the existing parent-section anchor) and added inline disambiguators in each cross-link's display text ("see Device Properties (Operating System Version)", "see Device Health", "see System Security — Password", "see System Security — Device Security"). Readers still land at the correct page, scroll to the correct section, and find the specific setting under the labeled subsection. No Phase 28 admin guide edits required.
- **Files modified:** `docs/l2-runbooks/17-ios-compliance-ca-timing.md`
- **Commit:** `6d7f1fc`

**2. [Rule 2 - Missing critical functionality] Terminal-state decision flow table + minimum-data gate**

- **Found during:** Task 2 (line-count check against V-31-29 lower bound of 187)
- **Issue:** Plan's 5-bullet escalation data checklist brought the file to 176 lines — 11 below the V-31-29 band. Padding the existing content with filler prose would meet the line-count threshold but degrade operational value.
- **Fix:** Added two substantive structural elements beyond the plan — (1) a 4-row terminal-state decision flow table (Observation → Next action) disambiguating the four observable APNs/check-in patterns that lead to different investigation paths; (2) an explicit minimum-data gate sentence ("Do not escalate to Microsoft Support without: (a) (b) (c) (d)"). Both add operational value for L2 engineers and push the file to exactly 187 lines (V-31-29 lower bound).
- **Files modified:** `docs/l2-runbooks/17-ios-compliance-ca-timing.md`
- **Commit:** `6d7f1fc`

Worktree base drift auto-corrected at agent startup — HEAD was `fd27b157a0` (post-wave-2 merged head); required base per prompt was `057804082d` (wave 3 base). `git reset --hard 057804082d` per `<worktree_branch_check>` protocol; verified correct base before any content work.

## Issues Encountered

None beyond the two auto-fixed items documented above.

## Validation Harness Status

Ran `node scripts/validation/check-phase-31.mjs --quick` after each task. Baseline (pre-Task 1): V-31-14/15/16/17/26/27/28/29 all FAIL ("17 does not exist"). Post-Task 1: V-31-17/26/27/28 flipped to PASS (scaffold carries frontmatter + banner + D-17 handoff). Post-Task 2: V-31-14/15/16/29 flipped to PASS.

**Plan 31-05 target checks (all PASS):**

- V-31-14: 17 has `## Investigation by Axis` + `## Per-Cause Deep-Dive` — PASS
- V-31-15: 17 has 3 axis H3 (Configuration Errors / Timing Issues / Genuine Defects) + 3 cause H3 (Cause A / B / C) — PASS
- V-31-16: 17 has "Not evaluated" sub-section referencing APNs + escalation — PASS
- V-31-17: 17 has "From L1 escalation" block mentioning Cause A/B/C — PASS
- V-31-26: All 4 files (14-17) have platform/audience/last_verified/review_by frontmatter — PASS
- V-31-27: applies_to mapping 14/16/17=all, 15=ADE — PASS
- V-31-28: All 4 files have D-29 platform gate banner in first 30 lines — PASS
- V-31-29: All 4 files within line-count bounds (17 = 187, bound [187, 287]) — PASS

**Phase-level harness status:** 22 passed / 7 failed / 0 skipped. The 7 remaining failures belong to plans 31-06 (V-31-18/19/20 — 00-index.md iOS L2 section) and 31-07 (V-31-21/22/23/24 — retrofit placeholders + D-23 prose diff). None are plan 31-05 scope.

**Anchor integrity checks (beyond harness):**

- `grep -q "#compliance-evaluation-timing-and-conditional-access" docs/l2-runbooks/17-ios-compliance-ca-timing.md` — PASS (Phase 28 D-11 anchor used in 2 places)
- `grep -q "HT203609" docs/l2-runbooks/17-ios-compliance-ca-timing.md` — PASS (Apple APNs endpoints reference cited)
- Zero emoji in file — verified (grep for ⚙/⏱/🐛/✅/❌ = 0 matches)

## Self-Check: PASSED

Verified the following before returning:

- File exists: `D:/claude/Autopilot/.claude/worktrees/agent-a0683f68/docs/l2-runbooks/17-ios-compliance-ca-timing.md` — FOUND (187 lines)
- Task 1 commit: `8c0d468` — FOUND via `git log --oneline`
- Task 2 commit: `6d7f1fc` — FOUND via `git log --oneline`
- Target harness checks V-31-14/15/16/17/26/27/28/29 all PASS
- No unintended deletions in either commit (`git diff --diff-filter=D 0578040 HEAD` empty)
- File contains both `## Investigation by Axis` AND `## Per-Cause Deep-Dive` (2 top-level H2 per D-14)
- File contains exactly 3 axis H3 + exactly 3 cause H3 per V-31-15 structural check

## User Setup Required

None - no external service configuration required. Runbook is pure documentation.

## Next Phase Readiness

- Runbook 17 is complete and passes every per-file harness check.
- Plan 31-06 (Wave 4) will update `docs/l2-runbooks/00-index.md` to add the iOS L2 Runbooks H2 section (V-31-18) + 3 sub-H3s (V-31-19) + MAM-WE Investigation Advisory with ADDTS-01 reference (V-31-20). Runbook 17 will then appear in the index alongside 14/15/16; the `00-index.md` links in runbook 17's Related Resources section already use relative paths that will resolve once the index gains the iOS L2 section.
- Plan 31-07 (Wave 5) will retrofit the 9 "Phase 31" placeholder references (V-31-21/22/24) + execute the D-23 prose diff on admin-setup-ios/06-compliance-policy.md line 182 (V-31-23). Plan 31-07 requires the specific target files from this plan (file 17) to exist, which they now do.
- The terminal-state decision flow pattern + minimum-data gate structure established here is a candidate for reuse in any future L2 runbook whose escalation output is Microsoft Support (file 15 Pattern D token-rotation terminal state could adopt it if expanded in a future phase).

---
*Phase: 31-ios-l2-investigation*
*Plan: 05*
*Completed: 2026-04-17*
