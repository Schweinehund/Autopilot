---
phase: 146-windows-driver-firmware-update-depth
verified: 2026-08-20T00:00:00Z
status: passed
score: 15/16 must-haves verified
behavior_unverified: 1
overrides_applied: 0
requirements_verified: [DRV-01, DRV-02, DRV-03, DRV-04, DRV-05, DRV-06, DRV-07]
gates_run_by_verifier: 7
gates_green: 7
live_source_refetch:
  pages_fetched: 8
  verbatim_strings_diffed: 36
  fabrications_found: 0
  updated_at_dates_confirmed: 8
warnings:
  - item: "REQUIREMENTS.md:128's corrected C11 row carries coordinates that went 2 lines stale inside this phase"
    detail: "Row asserts 01:182 / 01:187 (SCCM-Intune keepers) and 01:65 (Autopatch rings). Measured at HEAD: :184 / :189 / :67. Commit 1f17c6c4 added +2 lines to 01's intro after the row was written at 5a359753; the row was never re-measured."
    severity: warning
    blocking: false
    rationale: "The load-bearing content (four C11 patterns, one corpus-wide Autopatch-rings hit, the keeper-lives-in-a-link-path mechanism, the write-Configuration-Manager defence) is all correct and live-verified. Both phantom coordinates named in plan 03's truth ARE removed. No validator reads this row; the apex is 101/0/0. CONTEXT's Claude's-Discretion rule instructs every downstream planner to re-measure rather than transcribe."
    human_decision: "Fix the three numbers now, or add to the milestone-close cleanup list beside the carried V-54-18 row clarification."
documented_deviations:
  - item: "D-16's strict 'no ring/rings token in any byte added to 01'"
    detail: "One qualified `WUfB deployment ring` token appears in the CR-01 tail Correction clause. ZERO ring tokens appear in any added link target or **Source:** URL — D-16's actual measured hazard. V-54-11 verified green (32/0/0)."
    disposition: "Owner-ruled and recorded in 146-REVIEW.md 'CR-01 Tail'. Not a gap."
behavior_unverified_items:
  - truth: "The guide's non-quoted connective prose accurately characterizes the first-party quotes it introduces"
    test: "Read 06-windows-driver-firmware-updates.md end to end, checking each bold lead-in and each interpretive sentence against the blockquote it frames."
    expected: "No bold assertion or editorial gloss contradicts, overstates or under-scopes the quote printed beside it."
    why_human: "Roughly 60% of the file is the verifier's own connective prose. Verbatim diffing proves the quotes are real and correctly attributed; it cannot prove the sentences around them are true. The phase's own code review found exactly one defect of this class (CR-02: a bold assertion contradicted by the quote two lines beneath it), which establishes the failure mode is live rather than theoretical."
human_verification:
  - test: "Read 06 end to end for connective-prose accuracy (see behavior_unverified_items)."
    expected: "No CR-02-class contradiction between an editorial lead-in and the quote it frames."
    why_human: "Not reachable by validator exit code or verbatim diff."
  - test: "Decide the disposition of the REQUIREMENTS.md:128 coordinate drift (:182/:187/:65 -> :184/:189/:67)."
    expected: "Either corrected in place now, or added to the milestone-close cleanup list."
    why_human: "A scope decision, not a correctness question — the numbers are measurably wrong but nothing gates on them."
---

# Phase 146: Windows Driver & Firmware Update Depth — Verification Report

**Phase Goal:** An admin planning driver and firmware updates finds one guide that tells them what
the policy does, what it silently does not do, and what happens during Autopilot — and the
disambiguation stub it was promoted from still holds every literal the chain pins.

**Verified:** 2026-08-20
**Status:** human_needed (0 blockers, 1 warning, 1 backstop abstention)
**Re-verification:** No — initial verification.

## Method

This is a documentation phase: there is no application code and no test suite, so **the validators
are the tests**. Every number below was produced by running the validator in this session against
the live tree at HEAD `8b9eb69e`, not read from a SUMMARY. Every quoted string was diffed against
the **live Microsoft Learn page**, not merely against `146-RESEARCH.md` §2.

## Gate Results — all seven re-run by the verifier

| Gate | Expected (D-63) | **Measured** | Status |
|---|---|---|---|
| `check-phase-144.mjs` (apex) | 101 PASS / 0 FAIL / 0 SKIPPED | **101 PASS, 0 FAIL, 0 SKIPPED** | PASS |
| `check-phase-54.mjs` | 32/0/0 | **32 passed, 0 failed, 0 skipped** (exit 0) | PASS |
| `v1.20-milestone-audit.mjs` | 16/0 | **16 passed, 0 failed, 0 skipped** | PASS |
| `check-nav-hub-links.mjs` | 0/0 | **0 hub-presence, 0 corpus-link failures** | PASS |
| `c17-eee-contract.mjs` | 234 files / 0 violations | **234 files checked, 0 violations** (all 13 assertions at 0) | PASS |
| `build-filename-map.mjs --self-test` | 8/0 | **8 passed, 0 failed** | PASS |
| `build-publish-bundle.mjs --self-test` | 15/0 | **15 passed, 0 failed** | PASS |

C17 is **234, not 235** — `06` is deliberately unenrolled (D-33, `grep -c '^doc_id:' 06` = 0). Both
pipeline canaries are unmoved, confirming Phase 152's registry atom was not pre-empted (D-64).

No archival drift. No chain regression.

## Goal Achievement — Observable Truths

| # | Truth | Status | Evidence |
|---|---|---|---|
| 1 | **SC#1** — `06-windows-driver-firmware-updates.md` exists and documents approval modes, the approval workflow, OEM-published catalog behaviour AND reporting as substantive sections | VERIFIED | 792-line file. `## Approval Modes` (:131-205, 75 lines), `## The Approval Workflow` (:207-291, 85 lines), `## OEM Catalog and Firmware Delivery` (:380-454, 75 lines), `## Reporting` (:456-513, 58 lines). All four carry multiple first-party blockquotes with `**Source:**` lines. No stubs. |
| 2 | **SC#2** — deferral/deadline asymmetry verbatim-sourced, all three parts | VERIFIED | Part 1 Q1 at :304 ("does not apply to drivers that are approved using the Driver Update Policy"); part 2 Q3/Q3b at :323 ("The Quality Update deadline and grace period settings apply to drivers."); part 3 the automatically-approved scoping note Q2 at :314. All three live-confirmed on `driver-updates-faq`. Framed explicitly as a triad at :296-301. |
| 3 | **SC#3** — three absences documented AS absences | VERIFIED | (a) No rollback at :681-697 with Microsoft's two named mitigations (staged `deployment rings` + manual PowerShell removal) AND the once-Approved-never-Declined constraint at :217; (b) BOTH Autopilot halves at :667-673 AND a one-line warning at :28-31 (D-42 pairing honoured in both places); (c) destructive Automatic→Manual switch at :700-711 ("lose any approvals, paused drivers, and declined drivers"). |
| 4 | **SC#4** — ConfigMgr co-existence procedure with its first-party undefined-state warning | VERIFIED | `## Configuration Manager Co-management and Co-existence` at :515-660. Full six-step procedure (four required, two optional), unelided, with step 3's link target resolved to `wufb-wsus`. The warning is at :526, placed **before** the procedure. |
| 5 | **SC#5** — `01` still carries the driver+firmware H2, the `driver-firmware-policy` anchor, the "this is NOT a ring" disambiguation and the ENTIRE dual-scan section; `check-phase-54` exits 0 including `V-54-11` | VERIFIED | Anchor `:170` and H2 `## Driver and Firmware Update Policy` byte-identical (untouched in the phase diff). `**This is NOT a ring**` present at `:178`. Dual-scan section retained whole, including the `[Workload Slider Migration](../co-management/02-windows-workload-sliders.md)` C11 keeper link. `check-phase-54` **32/0/0, exit 0**. `dual-scan` literal count 4 (V-54-13 satisfied). |
| 6 | Apex `check-phase-144` at 101/0/0 post-phase | VERIFIED | Measured 101 PASS, 0 FAIL, 0 SKIPPED. |
| 7 | `v1.20-milestone-audit` at 16/0 — the only live C11 enforcer sees `06`'s ~500 new lines | VERIFIED | 16/0. `06` writes zero `SCCM` and zero `System Center` (R2 avoidance defence measured: both counts 0) and zero plural `Autopatch rings` (R3). |
| 8 | `check-nav-hub-links` at 0/0 — every outbound link and anchor fragment in `06` resolves | VERIFIED | 0/0. No link to `05-`, `07-`, `08-` or a firmware/BIOS guide (D-36 measured: 0 hits). |
| 9 | C17 at 234 files / 0 violations, `06` unenrolled | VERIFIED | 234/0. `doc_id` count 0, `## Version History` count 0 (D-33, D-65). |
| 10 | Both pipeline self-tests unmoved (Phase 152's atom not pre-empted) | VERIFIED | 8/0 and 15/0. |
| 11 | **D-53 sourcing contract** — every first-party claim's `**Source:**` URL and date is re-fetchable and diffs clean against the quoted string | VERIFIED | See "Live Source Re-fetch" below. 8 pages fetched, **36 verbatim strings matched, 0 fabrications**, all 8 `updated_at` values confirmed against live page metadata. |
| 12 | `01:177`'s contradicted firmware claim is corrected, not relocated (RESEARCH U-3) | VERIFIED | `grep -rn "automatic firmware delivery" docs/ .planning/REQUIREMENTS.md` = **0 hits**. `06:390-400` ships the two sourced replacements instead (firmware arrives on the *other drivers* list; other-list updates always require explicit approval). |
| 13 | B-5's two halves are attributed to their two different pages | VERIFIED | Q6 *"If it can't halt the installation…"* at :272 cites `driver-updates-faq`; Q5 *"can never be Declined"* at :217 cites `configure-driver-update-policy`. Both confirmed on those exact live pages, and confirmed absent from the other. The FEATURES B-5 misattribution did not propagate. |
| 14 | `REQUIREMENTS.md:128`'s C11 row no longer asserts the two phantoms and records the real hit map | VERIFIED (with warning) | Both phantoms (`00-overview.md:78`, `01:77`) removed. The four-pattern reality, the single corpus-wide `Autopatch rings` hit, and the keeper-lives-in-a-link-path mechanism are all recorded and all independently confirmed by me. **Warning:** the row's replacement coordinates are 2 lines stale — see below. |
| 15 | `00-overview.md`'s three D-55 sites re-routed, site-1 `**Source:**` trap avoided | VERIFIED | Site 1 appended at the end of the bullet's prose, with the blank line and the three Phase-145 `**Source:**` lines intact below it. Site 2 split into two bullets, driver/firmware readers routed to `06`. Site 3 Related-Resources description amended. No new row in the 4-platform table (D-57) and the leading applicability blockquote unchanged (D-56). |
| 16 | The guide's non-quoted connective prose accurately characterizes the quotes it frames | **PRESENT_BEHAVIOR_UNVERIFIED** | Not reachable by validator exit code or verbatim diff — routed to human verification. See below. |

**Score: 15/16 truths verified (1 backstop abstention).**

## Live Source Re-fetch (D-53's verifier contract, discharged)

D-53 requires the verifier to re-fetch the named pages and diff the quoted strings rather than
trusting the research file. Network was available, so this was executed rather than abstained.

| Page | Bytes fetched | Live `updated_at` | Date on `06`'s `**Source:**` lines | Match |
|---|---|---|---|---|
| `driver-updates-faq` | 83,527 | 2026-04-09 | 2026-04-09 | YES |
| `configure-driver-update-policy` | 80,680 | 2026-04-24 | 2026-04-24 | YES |
| `manage-driver-updates` | 54,950 | 2026-04-09 | 2026-04-09 | YES |
| `monitor-driver-updates` | 56,373 | 2026-04-29 | 2026-04-29 | YES |
| `ref-update-ring-settings` | — | 2026-04-09 | 2026-04-09 | YES |
| `windows-autopatch-manage-driver-and-firmware-updates` | 59,391 | 2025-06-04 | 2025-06-04 | YES |
| `wufb-wsus` | 53,999 | 2025-10-02 | 2025-10-02 | YES |
| `windows-autopatch-faq` (cited in `01`) | — | 2026-05-28 | 2026-05-28 | YES |

**36 quoted strings diffed against live page text after the ruled two-codepoint fold (U+2019, U+2011)
— 36 matched, 0 fabrications.** Includes every SC-mandated quote: Q1/Q2/Q3/Q3c (the SC#2 triad),
Q4 with both named mitigations and Q5's never-Declined constraint (SC#3, the D-50 close-gate risk),
Q29/Q30 (both Autopilot halves), Q31 (destructive switch), the undefined-and-unpredictable-device-state
warning and the six-step procedure's step 1 (SC#4), plus AF-6's five range strings.

A separate corpus-side check confirmed all 38 sampled strings also match `146-RESEARCH.md` §2
verbatim, and 20 sampled `**Source:**` attributions name the page §2 assigns the quote to.

## Requirements Coverage

| Req | Description | Status | Evidence |
|---|---|---|---|
| DRV-01 | Dedicated guide documents the policy as its own surface — approval modes, approval workflow, OEM-published catalog behaviour, reporting | SATISFIED | Truth 1. All four sections substantive. |
| DRV-02 | Deferral/deadline asymmetry verbatim-sourced with the automatically-approved scoping note | SATISFIED | Truth 2. All three parts, live-confirmed. |
| DRV-03 | Rollback absence with Microsoft's named mitigations and once-Approved-never-Declined | SATISFIED | Truth 3(a). Both mitigations present; Q5 live-confirmed on `configure-driver-update-policy`. |
| DRV-04 | Both Autopilot halves together | SATISFIED | Truth 3(b). Paired at :28-31 and again as the first callout at :666-673. |
| DRV-05 | Destructive Automatic→Manual switch; approved-always-wins; assignment filters; Extension and PnP drivers | SATISFIED | Truth 3(c) plus :247 (approved always wins), the callouts table (assignment filters), :722-732 (Extension), :736-742 (PnP). |
| DRV-06 | ConfigMgr co-existence procedure with the undefined-state warning | SATISFIED | Truth 4. |
| DRV-07 | Stub-and-move, never a clean deletion | SATISFIED | Truth 5. `V-54-13`'s driver+firmware H2 and `dual-scan` literal both survive; `V-54-11` green. |

**All 7 phase requirement IDs accounted for.** No orphans: `REQUIREMENTS.md:226` maps exactly
`DRV-01..DRV-07` (7) to Phase 146, and the three PLAN frontmatter `requirements:` arrays union to
the same set. The checkboxes at `:41-47` remain `[ ]` and the traceability rows at `:174-180` remain
`Pending` — that is the project's established close-gate pattern (flipped at milestone close), not
a phase gap.

## Warning — the corrected C11 row went stale inside its own phase

`REQUIREMENTS.md:128` is the row D-20 exists to correct, and its substance is right. Its coordinates
are not.

| Claim in the row | Measured at HEAD | Drift |
|---|---|---|
| `01-windows-wufb-rings.md:65` — the `Autopatch Rings (Disambiguation)` H2 | `:67` | +2 |
| `01` SCCM↔Intune keeper #1 at `:182` | `:184` | +2 |
| `01` SCCM↔Intune keeper #2 at `:187` (link-path keeper) | `:189` | +2 |

Traced by measuring the C11 regexes against `01` at each phase commit: the row was written at
`5a359753` when `:182`/`:187` were correct; commit **`1f17c6c4`** (the post-code-review fix) added
two lines to `01`'s intro paragraph and shifted every hit by +2. The row was never re-measured.
`146-REVIEW.md`'s CR-01 Tail table even records the frozen block "still opens at `:184`" — the
corrected value was known at close time and did not reach the row.

**Not a blocker:** the mechanism content is correct and independently confirmed by me; both phantoms
plan 03's truth names are gone; no validator reads the row; the apex is 101/0/0; and CONTEXT's
Claude's-Discretion rule instructs every downstream planner to re-measure rather than transcribe.

**Human decision requested:** fix the three numbers now, or add to the milestone-close cleanup list
alongside the already-carried `V-54-18` row clarification.

## Documented Deviation (not a gap)

D-16's strict rule — no `ring`/`rings` token in any byte added to `01` — carries one qualified
`WUfB deployment ring` token in the CR-01 tail Correction clause. Verified independently:

- ZERO `ring` tokens in any **added link target or `**Source:**` URL** — D-16's actual measured
  hazard (the `V-54-11` link-target trap, locked from 145 D-03) is fully discharged.
- `V-54-11` green; `check-phase-54` 32/0/0.
- Owner-ruled and recorded in `146-REVIEW.md` under "CR-01 Tail — Closed 2026-08-20", with the
  reasoning that the binding constraint is `V-54-11` (which accepts a token qualified within the
  preceding 40 characters) and D-16's absolute form was a convenience heuristic.

## Deliberate Absences Confirmed (not flagged)

`06` carries no `doc_id` and C17 stands at 234 not 235 (D-33) · no registry row, filename-map row,
canary bump or ops-index row, both pipeline self-tests unmoved (D-64) · no `## Version History`
(D-65) · `01`'s H2 string unshortened (D-11/D-12, owner-backed) · `02`/`03`/`04` still at
`2026-08-19 / 2026-10-18`, untouched, while `00`/`01`/`06` moved to `2026-08-20 / 2026-10-19`
(D-59, 60-day arithmetic correct) · `00-overview.md`'s "per deployment ring" deferral phrasing
retained (D-73, deferred to Phase 147) · `01` mitigation 2's original sentence retained with an
appended **Correction:** clause (SC#5 retention + CR-01 tail).

## Anti-Patterns

| Scan | Result |
|---|---|
| `TBD` / `FIXME` / `XXX` / `PLACEHOLDER` / `TODO` in `06`, `01`, `00-overview` | **0 hits** |
| "coming soon" / "not yet implemented" / placeholder prose | **0 hits** |
| Forward links to `05-`, `07-`, `08-`, firmware/BIOS guides | **0 hits** (D-36) |
| `SCCM` / `System Center` in `06` (R2 C11 avoidance) | **0 / 0** |
| Plural `Autopatch rings` in `06` (R3) | **0** |
| Working tree dirty under `docs/` or `REQUIREMENTS.md` | clean |

## Human Verification Required

### 1. Connective-prose accuracy in `06`

**Test:** Read `docs/operations/patch-management/06-windows-driver-firmware-updates.md` end to end,
checking each bold lead-in and each interpretive sentence against the blockquote it frames.
**Expected:** No bold assertion or editorial gloss contradicts, overstates or under-scopes the quote
printed beside it.
**Why human:** Roughly 60% of the file is the author's own connective prose. Verbatim diffing against
the live pages proves the quotes are real and correctly attributed; it cannot prove the sentences
around them are true. The phase's own code review found exactly one defect of this class (CR-02: a
bold assertion contradicted by the quote two lines beneath it, since fixed), which establishes the
failure mode is live rather than theoretical.

### 2. Disposition of the `REQUIREMENTS.md:128` coordinate drift

**Test:** Decide whether to correct `:182`/`:187`/`:65` to `:184`/`:189`/`:67` now, or carry it to
the milestone-close cleanup list.
**Expected:** Either outcome is defensible; the choice is a scope call.
**Why human:** The numbers are measurably wrong, but nothing gates on them and CONTEXT already
instructs downstream planners to re-measure.

## Gaps Summary

**None blocking.** All five ROADMAP success criteria are literally satisfied, all seven DRV
requirements are substantively covered, all seven gates are green at their exact D-63 baselines, and
the sourcing contract was discharged by live re-fetch rather than by trusting the research file —
36 verbatim strings, zero fabrications, eight `updated_at` dates confirmed. The phase's two
highest-risk traps both held: `01:186-191`'s C11 keeper zone survived byte-intact (audit 16/0), and
the B-5 two-page attribution split landed correctly.

One warning (a 2-line coordinate drift in the very row the phase corrected) and one backstop
abstention (connective-prose accuracy, unreachable by any validator) hold the status at
`human_needed` rather than `passed`.

---

_Verified: 2026-08-20_
_Verifier: Claude (gsd-verifier) — 7 gates re-run, 8 source pages re-fetched, 36 verbatim strings diffed_

---

## WR-01 — Resolved 2026-08-20 (orchestrator)

The coordinate drift in `REQUIREMENTS.md:128`'s C11 row is corrected. Measured live and re-written:
`01-windows-wufb-rings.md:65` → **`:67`**; the two `\bSCCM\b[^.]*\bIntune\b` hits `:182`/`:187` →
**`:184`/`:189`**.

**Why it happened, recorded because the phase is *about* this failure mode.** The row was correct
when authored at `5a359753`. Two commits later `1f17c6c4` (the WR-02 fix to `01`'s intro paragraph)
added two lines above the H2, shifting every downstream coordinate +2. Nobody re-measured, because
the row had already been "corrected" and read as settled. `146-REVIEW.md`'s own CR-01 Tail table
recorded the post-shift `:184` correctly at the same time — the right number existed in the phase and
did not reach the row.

**Hardened, not merely re-bumped.** Line numbers rot; the fix adds an identity that does not:
- The `Autopatch rings` hit is now located by its H2 text as well as its number.
- The two `SCCM…Intune` hits are located by the paragraph opening `**Dual-scan source conflict
  pitfall:**` and the `- The Windows Update Agent receives both` bullet.
- An explicit **Drift note** states that every number in the row is a convenience pointer rather than
  an identity, cites this exact incident (`5a359753` correct → `1f17c6c4` +2), and instructs a reader
  to locate by quoted text and re-measure.

**Gates re-run after the edit:** `check-phase-54` **32/0/0** · `v1.20-milestone-audit` **16/0** ·
apex `check-phase-144` **101 PASS, 0 FAIL, 0 SKIPPED**.

Commit: `5516eca5`.

**Remaining open item:** the backstop abstention on connective-prose technical accuracy (~60% of `06`
is editorial framing between the verbatim quotes, which verbatim diffing cannot reach). This is
correctly an abstention, not a pass — see the owner disposition recorded below.

## Backstop disposition — OWNER-RULED 2026-08-20: accept and seal

The connective-prose accuracy backstop is **accepted as a recorded known-limit**, not passed.

**Rationale.** The framing prose has already had one adversarial pass: it is precisely where
`146-REVIEW.md` found CR-02 (the co-existence-scope self-contradiction) plus eight warnings, all
since fixed and re-gated. A second read would re-cover reviewed text at low expected yield.

**What is and is not established:**
- **Established by execution:** every verbatim quote (36 strings diffed against 8 live Learn pages,
  0 fabrications), every `updated_at` date, every link and anchor, every validator-pinned literal,
  and all five success criteria.
- **Not machine-established:** the technical accuracy of the editorial sentences *between* the
  quotes. One human-equivalent adversarial pass covered them; no automated check can.

**Trigger for re-examination:** Phase 151 (Recipe #5) synthesises this guide and will read it
closely by necessity — any surviving connective-prose defect is most likely to surface there. Any
correction found is a Phase 151 finding against `06`, not a reopening of Phase 146.
