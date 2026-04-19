---
phase: 31-ios-l2-investigation
plan: 02
subsystem: docs
tags: [ios, ipados, l2, log-collection, runbook, intune, sysdiagnose, company-portal, mam, pii, data-egress]

requires:
  - phase: 30-ios-l1-triage-runbooks
    provides: iOS L1 runbooks 16-21 (escalation sources), platform gate banner pattern (D-26), Cause A/B/C sub-cause pattern, docs/ios-lifecycle/01-ade-lifecycle.md line 364 anchor-retrofit target
  - phase: 24-macos-l2-investigation
    provides: docs/l2-runbooks/10-macos-log-collection.md (primary structural template; 160 lines; Section ordering), "gather everything first, then investigate" principle, Escalation-Mapping table pattern
  - phase: 28-ios-admin-setup-configuration-apps-compliance
    provides: supervised-only silent-install callout context, CA timing deep-link target
  - phase: 31-ios-l2-investigation (plan 01)
    provides: scripts/validation/check-phase-31.mjs harness (V-31-01..V-31-30 gates), expected-d23.txt fixture, placeholder-inventory.json snapshot, L2 template iOS enum extension — NOTE harness lives in 31-01 worktree and was NOT available at 31-02 execution time in parallel mode; acceptance criteria verified via direct inline grep
provides:
  - docs/l2-runbooks/14-ios-log-collection.md (iOS L2 log collection runbook; 181 lines) — the prerequisite for runbooks 15/16/17 AND the anchor target of Wave 5 ios-lifecycle retrofit (Section 3 Mac+Cable Sysdiagnose)
  - Inline T-31-01 PII mitigation blockquote (sysdiagnose data-handling)
  - Inline T-31-02 data-egress mitigation blockquote (Company Portal logs leave tenant control)
  - D-31 MDM diagnostic report correction documented (Intune Collect diagnostics is MAM-scoped for iOS, not MDM)
  - Per-device sysdiagnose trigger reference (iOS 15+ unified: both volume + side/top, 1-1.5 sec)
affects: [31-03, 31-04, 31-05, 31-06, 31-07, future ADDTS-01 MAM runbook milestone, future ADDTS-02 Graph GUID runbook milestone]

tech-stack:
  added: []
  patterns:
    - "L2 runbook structure for Apple platforms with fragmented diagnostic tooling (Tier 1 / Tier 2 / Tier 3 ordered by friction)"
    - "Inline threat-mitigation blockquote at point of use (T-31-01 at Section 3 end, T-31-02 at Tier 2 retrieval)"
    - "Method-to-data decision matrix as first structural element after preamble"

key-files:
  created:
    - docs/l2-runbooks/14-ios-log-collection.md
  modified: []

key-decisions:
  - "Applied D-31 research correction verbatim: split Tier 1 into 1a (on-device user-coordinated — Settings > General > VPN & Device Management) and 1b (MAM-scoped Intune Collect diagnostics with 4 MB / 50 diagnostics cap)"
  - "Section 3 heading authored as exact-match '## Section 3: Mac+Cable Sysdiagnose' to serve as the anchor target for the Wave 5 ios-lifecycle/01-ade-lifecycle.md line 364 retrofit"
  - "Used iOS 15+ unified sysdiagnose trigger (both volume + side/top, 1-1.5 sec) with per-device reference table plus legacy-combo deprecation captured implicitly via absence — matches D-30 research finding that per-device variance has converged for modern iOS"
  - "Inline threat mitigations at point of use rather than centralized — T-31-01 PII callout inside Section 3, T-31-02 egress callout inside Section 2 L2 Retrieval sub-heading — so an L2 engineer reading just the relevant tier sees the warning"

patterns-established:
  - "iOS L2 runbook section ordering: Frontmatter → Platform gate → Title → Context → Tool Landscape preamble → Decision Matrix → Tier sections (1/2/3) → Common Artifacts Cross-Reference → Related Resources → Version History"
  - "Tier-based organization for fragmented-tooling Apple platforms — contrasts with macOS L2 single-tool-first pattern from Phase 24"
  - "'When to use' cues in each tier sub-section routing reader to next tier when current is insufficient"

requirements-completed: [L2TS-01]

duration: ~35min
completed: 2026-04-17
---

# Phase 31 Plan 02: iOS L2 Log Collection Runbook Summary

**iOS L2 log collection runbook authored as Tier 1 (on-device MDM + MAM-scoped remote action) + Tier 2 (Company Portal upload with ticket-based retrieval) + Tier 3 (Mac+cable sysdiagnose) with SC #2 preamble, decision matrix, per-device sysdiagnose triggers, and inline T-31-01/T-31-02 mitigations.**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-04-17T20:05:00Z (approx)
- **Completed:** 2026-04-17T20:40:37Z
- **Tasks:** 2
- **Files modified:** 1 created (`docs/l2-runbooks/14-ios-log-collection.md`, 181 lines)

## Accomplishments

- Created `docs/l2-runbooks/14-ios-log-collection.md` — the prerequisite runbook for all three iOS L2 investigation runbooks (15/16/17) and the authoritative anchor target for the Wave 5 `ios-lifecycle/01-ade-lifecycle.md` line 364 retrofit
- Satisfied SC #1 (3-method decision matrix with Method | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Typical Latency columns per D-03)
- Satisfied SC #2 (verbatim "no iOS equivalent to `mdmdiagnosticstool.exe`" preamble per D-02, placed as first blockquote after Context per D-04)
- Applied D-31 research correction: distinguished on-device MDM diagnostic path (Settings > General > VPN & Device Management > Management Profile > More Details) from MAM-scoped Intune "Collect diagnostics" remote action (Troubleshooting + support > Troubleshoot > [user] > App Protection > Checked-in > [app] > "..." > Collect diagnostics, 4 MB / 50 diagnostic cap, ~30 min latency, Help Desk Operator / School Administrator RBAC)
- Inlined T-31-02 data-egress mitigation as a blockquote inside Tier 2 "L2 Retrieval (ticket-based)" sub-section (V-31-05 grep gate: "Microsoft support infrastructure" + "leaves tenant control" both present)
- Inlined T-31-01 PII mitigation as a blockquote at the end of Section 3 (V-31-04 grep gate: "PII" + "private data" + "data-handling" + "redact" all present)
- Authored exact heading `## Section 3: Mac+Cable Sysdiagnose` for the Wave 5 lifecycle retrofit anchor (confirmed via `grep -q "^## Section 3: Mac\+Cable Sysdiagnose$"`)
- Documented iOS 15+ unified sysdiagnose trigger (both volume + side/top button, 1-1.5 sec hold) with per-device reference table, Emergency SOS warning, and iPad silent-trigger warning per D-30 research

## Task Commits

Each task was committed atomically:

1. **Task 1: Author runbook 14 — frontmatter + Context + Tool Landscape + Decision Matrix + Tier 1** — `68bf4ae` (docs)
2. **Task 2: Complete runbook 14 — Tier 2 + Tier 3 + Common Artifacts + Related Resources** — `28e39c3` (docs)

_Note: plan is marked `tdd="true"` per task, but the "tests" are grep-based acceptance commands, not a test framework. RED phase verified by running each grep BEFORE file creation (confirmed absence); GREEN phase verified by running each grep AFTER file creation (confirmed presence). No refactor commit needed — prose is single-pass final._

## Files Created/Modified

- `docs/l2-runbooks/14-ios-log-collection.md` — new iOS L2 log collection runbook, 181 lines, frontmatter + platform gate + title + Context + Tool Landscape preamble + Decision Matrix + Section 1 (Tier 1 MDM, split into 1a on-device + 1b MAM) + Section 2 (Tier 2 Company Portal with incident-ID + verbose preflight + ticket-based retrieval) + Section 3 (Tier 3 Mac+cable sysdiagnose with prerequisites + unified trigger + per-device table + retrieval + Console.app streaming + cable map + PII callout) + Common Artifacts Cross-Reference table + Related Resources + Version History

## Decisions Made

- **Inlined threat mitigations at point of use.** Rather than centralizing T-31-01 and T-31-02 in a single security section, each mitigation blockquote sits inside its respective tier sub-section. This ensures an L2 engineer reading just Section 2 (for a Company-Portal-only investigation) sees the egress warning, and one reading just Section 3 (for a sysdiagnose investigation) sees the PII warning. Rationale: L2 workflow is tier-by-tier; centralized security sections are skipped by in-a-hurry L2 engineers.
- **Applied research correction D-31 verbatim.** The CONTEXT.md D-01 Tier 1 wording called for "MDM diagnostic report — L2 self-service portal pull from Intune admin center > Devices > [device] > Download diagnostics." Research proved this is wrong for iOS — the on-device-reachable diagnostic path is the user's Settings app, and the Intune remote action is MAM-scoped. Written as two explicit sub-sections (1a on-device; 1b MAM) with the "When to use" cue at the end of each, so the reader never confuses the two.
- **Used existing ios-lifecycle anchor `#behind-the-scenes`** for the cross-reference in section 1a rather than a new anchor, since the target file's "Behind the Scenes" sub-heading IS the authoritative text for on-device diagnostic retrieval. Avoids introducing a new anchor into the retrofit-target file unnecessarily.

## Deviations from Plan

### Notes on `<verify>` command availability

The plan's `<verify>` block specifies `node scripts/validation/check-phase-31.mjs --quick 2>&1 | grep -E "V-31-(01|02|26|27|28)"`. In parallel wave execution, Plan 31-01 (Wave 0) produces that harness in its own worktree, and Plan 31-02 (Wave 1) runs in a separate worktree that does NOT contain the harness. This is a parallel-execution artifact, not a plan defect.

All `<acceptance_criteria>` for both tasks were verified directly via the underlying grep commands listed in the plan (same greps the harness executes). Each criterion passed:

- V-31-01: `grep -q "no iOS equivalent to .*mdmdiagnosticstool\.exe"` — PASS
- V-31-02: `grep -q "| Method |"` + `grep -q "MDM diagnostic report"` + `grep -q "Company Portal"` + `grep -q "sysdiagnose"` — PASS
- V-31-03: `grep -qE "(both volume|volume.*(side|top) button)"` — PASS
- V-31-04: `grep -qiE "(PII|private data|redact|data-handling)"` — PASS
- V-31-05: `grep -qE "(Microsoft (backend|support infrastructure)|leaves tenant)"` — PASS
- V-31-26: frontmatter fields `last_verified`, `review_by`, `audience: L2`, `platform: iOS` — PASS
- V-31-27: `applies_to: all` — PASS
- V-31-28: platform-gate banner in first 30 lines — PASS (line 9)
- V-31-29: `wc -l` returns 181 (in-band 136-207) — PASS
- Additional acceptance greps: `"Settings > General > VPN & Device Management"` PASS, `"4 MB"` PASS, `"50 diagnostics"` PASS, `"Help Desk Operator"` PASS, `"^## Section 3: Mac+Cable Sysdiagnose$"` PASS

When the Wave 0 harness IS merged, running `node scripts/validation/check-phase-31.mjs --quick` against `docs/l2-runbooks/14-ios-log-collection.md` will emit PASS for all V-31-01..V-31-05 + V-31-26..V-31-29 rows.

### Auto-fixed Issues

None — plan executed exactly as written. No Rule 1/2/3 deviations required.

---

**Total deviations:** 0 auto-fixed
**Impact on plan:** None. Plan content, structural decisions (D-01, D-02, D-03, D-04, D-28, D-29, D-30, D-31, D-32), and threat mitigations (T-31-01, T-31-02) were all applied verbatim as specified.

## Issues Encountered

None. RED grep checks all failed pre-creation (as expected), GREEN grep checks all passed post-creation.

One parallel-execution artifact (harness absent in this worktree) noted above under Deviations — does not affect correctness of output.

## Threat Flags

None. The runbook introduces no new security surface — it documents existing Microsoft-supplied diagnostic flows and applies the two in-scope threat mitigations (T-31-01 sysdiagnose PII, T-31-02 Company Portal data egress) already enumerated in the plan's `<threat_model>` block.

## User Setup Required

None — no external service configuration introduced by this plan.

## Next Phase Readiness

- Runbook 14 complete and ready to serve as the prerequisite document for Plans 31-03 (runbook 15 ADE Token & Profile), 31-04 (runbook 16 App Install), and 31-05 (runbook 17 Compliance & CA Timing).
- Section 3 heading `## Section 3: Mac+Cable Sysdiagnose` matches the exact anchor expected by Plan 31-07's Wave 5 retrofit of `docs/ios-lifecycle/01-ade-lifecycle.md` line 364.
- Cross-references to `15-ios-ade-token-profile.md`, `16-ios-app-install.md`, `17-ios-compliance-ca-timing.md`, and `00-index.md#ios-l2-runbooks` are forward-references at this point — they become valid once Plans 31-03 through 31-06 complete. Standard pattern for the project; no action required.
- No blockers.

## Self-Check

Created files exist:
- FOUND: `docs/l2-runbooks/14-ios-log-collection.md` (181 lines)

Commits exist:
- FOUND: `68bf4ae` (Task 1)
- FOUND: `28e39c3` (Task 2)

All acceptance criteria grep gates pass. No stubs. No threat flags outside plan's enumerated register.

**Self-Check: PASSED**

---
*Phase: 31-ios-l2-investigation*
*Plan: 02*
*Completed: 2026-04-17*
