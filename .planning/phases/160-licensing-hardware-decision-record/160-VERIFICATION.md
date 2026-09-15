---
phase: 160-licensing-hardware-decision-record
verified: 2026-09-15T00:00:00Z
status: passed
score: 3/3 must-haves verified
behavior_unverified: 0
overrides_applied: 0
re_verification:
  previous_status: none
  previous_score: n/a
  gaps_closed: []
  gaps_remaining: []
  regressions: []
---

# Phase 160: Licensing / Hardware Decision Record Verification Report

**Phase Goal:** The licensing/hardware standard for the walk-up kiosk device class is decided and recorded, replacing the "IoT Enterprise via MAK" ambiguity with the two real arms and their consequences.
**Verified:** 2026-09-15
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | RE-237 carries an STD-05 admin decision-point block (blockquote + table, never a fence) comparing MAK-activated volume-licensed Windows Enterprise on current HP hardware vs. OEM-licensed Windows IoT Enterprise hardware, with per-arm Shell Launcher and OEM-cleanup consequences, and the owner's dated ruling | ✓ VERIFIED | `docs/recipes/06-walk-up-avd-kiosk-autologon.md` Step 4 (lines ~101-116): bridge sentence, `> **Ask the admin:**` lead-in, 2-row Case-1 table with real distinct Branch links (MAK → `#step-5-...` anchor, IoT → `WindowsApp_AutoLogon.xml`), P1/P2 prose naming "The Intune Admin Lead ruled on 2026-09-10 that the walk-up AVD kiosk class standardizes on MAK-activated, volume-licensed Windows Enterprise..." with the MAK-entitlement prerequisite, `> **What breaks if misconfigured:**` callout. Shell Launcher consequence cited to AssignedAccess CSP page only for what it says; OEM-cleanup class stated as staying under both arms ("Under either arm, the OEM-cleanup work in Step 8 is expected to stay in scope"). No `Windows 365` third arm (grep = 0). |
| 2 | `docs/reference/licensing-matrix.md` reflects the ruling, judged against the D-28-amended SC2 reading (no heading/column/row-structure change to pinned tables; one new blockquote line and one new Version History row admitted) | ✓ VERIFIED | ROADMAP Phase 160 SC2 and REQUIREMENTS LIC-02 both carry the `**[SUCCESS-CRITERION AMENDMENT, D-28]**` note with original antecedent text intact (verified present in both files). Matrix Notes cell (line 62) carries "Ruled 2026-09-10..." clause and corrected "see the following blockquote" phrase (each occurs exactly once; superseded phrase absent). One new blockquote (line 76, 186 chars, own run) inserted between "Not pilot-tested" and "See RE-237" lines, both of which survive verbatim. `## Feature-to-License Mapping` table unchanged: 10 rows (header+rule+8 data), no row added/removed. One new Version History row (2026-09-15, newest-first, 3-column with em-dash Author). Byte invariants hold: 6,993 bytes, 0 bare-LF, final byte `|` (no trailing newline introduced). |
| 3 | The `Class is not licensed for use` / `-2016281112` activation observation is present and labelled `[PILOT]`, and the "ShellLauncher node is not supported in Windows 10 Pro" claim is sourced to the AssignedAccess CSP page (ms.date 2025-03-12) | ✓ VERIFIED | `Class is not licensed for use` occurs 6 times in RE-237, each instance under a `**[PILOT]**` marker (lines 42, 121, 128, 191, 299, plus the Prerequisites line 31 carrying the `-2016281112` code at line 42/299). "not supported in Windows 10 Pro" cited inline (line 113) to the AssignedAccess CSP Learn link, and the `## See Also` entry for that same page carries `(ms.date 2025-03-12)` (line 319) — matching D-05's ruling that bracket-label text stays out of `docs/` prose and sourcing is via inline link + See Also gloss instead. This criterion was already satisfied at HEAD per 160-CONTEXT.md ("SC3 already met at HEAD") and remains true post-phase. |

**Score:** 3/3 truths verified (0 present, behavior-unverified)

### Plan-Level Must-Haves (spot-checked against PLAN.md frontmatter)

All three plans' `must_haves.truths`, `artifacts`, `key_links`, and `prohibitions` were cross-checked against the live tree. Representative measured checks:

| Check | Expected | Measured | Status |
|---|---|---|---|
| `Ask the admin` lead-ins | 5 | 5 | ✓ |
| `What breaks if misconfigured` callouts | 9 | 9 | ✓ |
| `reported as unactivated` | 6 | 6 | ✓ |
| `#step-5-author-the-assignedaccessconfiguration-xml` | 7 | 7 | ✓ |
| `administrator` (RE-237) | 10 | 10 | ✓ |
| `administrator` (matrix) | 1 | 1 | ✓ |
| `Windows 365` (RE-237, third-arm check) | 0 | 0 | ✓ |
| `Class is not licensed for use` | 6 (unchanged) | 6 | ✓ |
| `sign into` (corpus, V-156-SIGNINTO) | 0 | 0 | ✓ |
| RE-237 CRLF/bare-LF/EOF | 0 bare-LF, ends with newline | 326 CRLF, 0 bare-LF, ends with newline | ✓ |
| Matrix byte/EOF invariant | 0 bare-LF, final byte `\|` | 104 CRLF, 0 bare-LF, final byte `\|`, 6,993 bytes | ✓ |
| Matrix blockquote runs | 10 runs, max ≤200 | 10 runs, max 186, 0 over 200 | ✓ |
| RE-237 blockquote runs | 27 runs, max ≤200 | consistent with C17 assertion-12 = 0 violations | ✓ |
| `160-GATE-BASELINE.json` shape | single `phase_baseline` key, 6 structural_gate sub-objects | matches exactly | ✓ |
| `2026-09-DD` placeholder | 0 in both corpus files | 0 | ✓ |
| `scripts/validation/check-phase-160.mjs` | absent (Phase 167 owns it) | absent | ✓ |
| Identifier-field leak (`Activation ID`, `Application ID`, `Extended PID`, `Installation ID`, `Partial Product Key`) in EVIDENCE.md | 0 | 0 | ✓ |
| Pilot checkpoint outcome | `DECLINED` recorded, plan completes | `**Outcome: DECLINED 2026-09-14**` recorded in 160-EVIDENCE.md, LIC-01 still flipped | ✓ |

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `docs/recipes/06-walk-up-avd-kiosk-autologon.md` | STD-05 block, remedy cell, See Also, Version History, re-stamp | ✓ VERIFIED | All elements present and wired (see truths table) |
| `docs/reference/licensing-matrix.md` | Notes cell, blockquote, Version History row, re-stamp | ✓ VERIFIED | All elements present and wired |
| `.planning/phases/160-.../160-GATE-BASELINE.json` | single pre-edit snapshot | ✓ VERIFIED | Correct shape, all 6 structural gates present |
| `.planning/phases/160-.../160-EVIDENCE.md` | checkpoint outcome, measurements, needle list | ✓ VERIFIED | 377 lines, substantive, needle list present exactly once |
| `.planning/phases/160-.../160-FACTCHECK.md` | verdict transcript, dispatch_command | ✓ VERIFIED | 319 lines, dispatch_command present, real 3-round verdict transcript with round-1 invalidation logged honestly |
| `.planning/phases/160-.../160-FACTCHECK-RUBRIC.md`, `-PACKET.md` | committed before dispatch | ✓ VERIFIED | Both exist, referenced in FACTCHECK.md |
| `.planning/phases/160-.../160-src-licensing.html`, `160-src-assignedaccess-csp.html` | fetched source bytes, >10KB each | ✓ VERIFIED | 41,969 and 84,793 bytes respectively |
| `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md` | D-28 amendment appended, LIC-01/LIC-02 checked | ✓ VERIFIED | Both amendments present, both requirement bullets `[x]` |

### Key Link Verification

| From | To | Via | Status |
|---|---|---|---|
| Step-4 MAK Branch cell | `#step-5-author-the-assignedaccessconfiguration-xml` | in-file anchor | ✓ WIRED (nav-hub-links 0/0/0) |
| Step-4 IoT Branch cell | `WindowsApp_AutoLogon.xml` | relative path, byte-identical to existing Step-4 table link | ✓ WIRED |
| P1/P2 inline Learn links | fetched `160-src-*.html` / See Also gloss | ms.date consistency (2026-06-24, 2025-03-12) | ✓ WIRED, dates match across prose, See Also, and FACTCHECK.md |
| Matrix Notes cell | new blockquote | "see the following blockquote" directional phrase | ✓ WIRED |
| New blockquote | IoT Enterprise licensing page | same URL cited in RE-237 and See Also | ✓ WIRED |
| Matrix | RE-237 | "See RE-237" pointer line survives insertion above it | ✓ WIRED |
| `160-GATE-BASELINE.json` apex anchor | 160-03 post-edit apex run | both 117 PASS/0 FAIL, 116s vs 119s | ✓ WIRED, re-measured live at 115.2s in this verification |

### Validator Results (live re-run during verification)

| Validator | Result | Status |
|---|---|---|
| `check-phase-54.mjs` | Summary: 32 passed, 0 failed, 0 skipped | ✓ PASS |
| `c17-eee-contract.mjs` | 237 files checked, 0 with violations, 0 total (all 13 assertions 0) | ✓ PASS |
| `check-nav-hub-links.mjs` | 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total | ✓ PASS |
| `check-phase-155.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | ✓ PASS |
| `check-phase-156.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | ✓ PASS |
| `check-phase-159.mjs` (apex) | 117 PASS, 0 FAIL, 0 SKIPPED, wall-clock 1m55s | ✓ PASS |
| `check-phase-160.mjs` | does not exist (Phase 167 owns it, D-31) | ✓ as designed |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| LIC-01 | 160-02 | STD-05 decision block in RE-237, dated ruling, Shell Launcher + OEM-cleanup consequences | ✓ SATISFIED | RE-237 Step 4 block verified above; REQUIREMENTS.md `[x] **LIC-01**` |
| LIC-02 | 160-03 | Matrix reflects the ruling within amended D-28 scope | ✓ SATISFIED | Matrix Notes cell/blockquote/Version History verified above; REQUIREMENTS.md `[x] **LIC-02**` |
| (none) | 160-01 | `requirements: []` deliberate (D-28/D-35 flip-control tracer plan) | ✓ as designed | Amendment landed without prematurely flipping either LIC bullet |

No orphaned requirements: REQUIREMENTS.md's "Phase 160" mapping table lists only LIC-01 and LIC-02, both accounted for across 160-02/160-03.

### Anti-Patterns Found

None. `grep -nE "TBD|FIXME|XXX|TODO|HACK|PLACEHOLDER"` over both touched corpus files returns no matches. No stub returns, no empty handlers, no hardcoded-empty data patterns applicable (this is a documentation phase, not application code).

### Deviations From Plan (reviewed, none broke a must-have)

- 160-02: 3 auto-fixed deviations — (1) fact-check round-1 packet omitted source material, corrected and re-judged (round 2: 34/38 PRESERVED, round 3: 4/4 PRESERVED); (2) Task 5 remedy-cell hedge read as WEAKENED on first dispatch, re-worded and re-judged PRESERVED; (3) an `admin`-token overcount from a Version History description was caught and corrected before commit (16, not 17). All three are logged with commits and verification commands; none altered a locked (VERBATIM) string, none reduced pin counts below their required values (all re-measured above and match).
- 160-03: 1 auto-fixed deviation — a duplicate `## Needle list handed to Phase 167 (HARN-04)` heading introduced mid-edit was caught and removed before commit (final grep count = 1, confirmed above).
- The owner declined the pilot device reading at 160-02's checkpoint (`DECLINED 2026-09-14`). Per D-30 and the plan's own acceptance criteria, decline is a supported outcome; P2 was written without the pilot-measurement sentence and LIC-01 still flipped. Not treated as a gap, per the task brief's explicit guidance.

### Human Verification Required

None. All must-haves resolved programmatically via file content, git log, and live validator re-runs.

### Gaps Summary

No gaps found. All three ROADMAP success criteria are observably true in the codebase; all plan-level must-haves, key links, and prohibitions were verified against live file content; all structural validators (check-phase-54, c17-eee-contract, check-nav-hub-links, check-phase-155, check-phase-156, and the apex check-phase-159) pass at their expected tallies when re-run fresh during this verification; both LIC-01 and LIC-02 are checked complete in REQUIREMENTS.md with no orphaned requirements; and no debt markers or stub patterns were found in the touched files.

---

*Verified: 2026-09-15*
*Verifier: Claude (gsd-verifier)*
