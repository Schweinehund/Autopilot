---
phase: 150-per-oem-bios-guides-capability-matrix
plan: 02
subsystem: docs
tags: [hp, intune, bios, firmware, sure-admin, hp-connect, documentation]

# Dependency graph
requires:
  - phase: 150-01
    provides: The proven nine-H2/seven-anchor guide skeleton (copied verbatim), the deferred-commit
      execution pattern (D-80), and the enumerated intermediate-red baseline this plan diffs against
provides:
  - A complete, shipping-quality HP BIOS guide covering BIOS-07 in full (HP Connect as a vendor
    connector, not a Win32 agent, all five D-23 claims), BIOS-09's HP half (30-day countdown,
    orphaned Remediations, both de-provisioning orders as separate objects), and HP's leg of the
    inverted-prerequisite story (BIOS-06) — uncommitted, staged for Plan 04's single content commit
  - Structural proof the HP guide is byte-identical at the H2 level to the Dell tracer (SC#1)
  - The two custody quotes (HP cloud-vault, Dell no-customer-data at its complete 241-character
    length) juxtaposed in one file with two separate evidence lines (SC#3, D-36, D-46)
  - The shrunk dangling-link set (5 failures, all naming only the Lenovo guide or the matrix — the
    HP file itself no longer appears as an unresolved target anywhere in the corpus)
affects: [150-03, 150-04, 150-05]

# Actuals (#2632) — chars/4 over the realized diff (the new 22,997-byte guide file).
actuals:
  tokens: 5749
  tasks: 3
  commits: 0

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Single-line blockquote discipline for grep-checked quotes: a quote whose exact substring is
      asserted by an acceptance criterion must ship as ONE unwrapped `> ` line, not soft-wrapped
      across multiple contiguous `>` lines — wrapping at ~100 characters (readable in an editor)
      silently breaks an exact-phrase grep match even though the rendered Markdown looks identical.
      Caught and fixed for the Dell 241-character quote, the Partner-portals quote, the
      partial-removal-trap quote and the 30-day-countdown/orphaned-scripts pair."
    - "Deferred-commit execution (D-80) confirmed a second time: authored and fully verified against
      all five binding gate classes while remaining uncommitted."

key-files:
  created:
    - docs/operations/firmware-bios/03-hp-bios-configuration.md
  modified: []

key-decisions:
  - "Kept HP's console-path literal 'Reports, Endpoint Analytics, Proactive Remediation' (D-27)
    verbatim as Task 1 explicitly requires, even though it contains the retired term 'Proactive
    Remediation' a second time outside the single D-71 first-use parenthetical — read Task 2's
    'at most 1' criterion as targeting the D-71 parenthretical convention specifically, not a
    blanket ban on the substring anywhere in prose, since Task 1 and Task 2 would otherwise
    directly contradict each other. Removed one redundant restating sentence to minimize the count;
    the console-path literal and the parenthetical are the only two non-blockquote occurrences of
    the phrase — see Verification Evidence."
  - "Fixed four quotes from soft-wrapped multi-line blockquotes to single unwrapped lines after the
    first verification pass found the Dell 241-character clause, the Partner-portals sentence, the
    partial-removal-trap sentence, and the 30-day-countdown/orphaned-scripts pair all failed their
    exact-substring acceptance greps despite being present and correctly quoted — the wrap broke
    the string, not the content."
  - "Used the Dell tracer's own short-form anchor ids (delivery, authentication, scope,
    prerequisites, offboarding, recovery, unsupported-callouts) rather than 150-PATTERNS.md's
    longer suggested form (offboarding-and-loss-of-the-management-plane) — the plan's read_first
    instruction to copy the tracer's skeleton 'exactly' takes precedence over the pattern-map draft,
    and the anchor-count acceptance criterion (7, matching Dell) confirms this was correct."

patterns-established:
  - "Second confirmation of the nine-H2/seven-anchor unenrolled-guide skeleton at zero drift from
    the tracer — the H2-line-set diff against 02-dell-bios-configuration.md produced no output."

requirements-completed: []

coverage:
  - id: D1
    description: "docs/operations/firmware-bios/03-hp-bios-configuration.md exists at exactly 9 H2s
      and 7 hand-authored anchors, structurally identical (H2 line-set diff empty) to the Dell
      tracer"
    requirement: "BIOS-05"
    verification:
      - kind: unit
        ref: "grep -c '^## ' == 9; grep -c '<a id=' == 7; diff of ^## line sets against Dell ==
          empty; c17-eee-contract.mjs unchanged at 234 files, 0 violations"
        status: pass
    human_judgment: false
  - id: D2
    description: "All five of D-23's HP Connect claims are present and HP Connect is named a vendor
      connector, not a Win32 agent, with Dell's per-device DCECMI stated as the explicit contrast"
    requirement: "BIOS-07"
    verification:
      - kind: unit
        ref: "grep checks for HPConnectForMEM- (script naming), Partner portals tab quote (U-6
          closure), Both types of authentication can not coexist, a payload can only be used once —
          all documented below under Verification Evidence"
        status: pass
    human_judgment: false
  - id: D3
    description: "Both custody quotes (HP cloud-vault, Dell no-customer-data at its complete
      241-character length) sit in this one file, adjacent, each with its own separate evidence
      line naming its own page — satisfying SC#3's 'quoted against' requirement in a single file"
    requirement: "BIOS-07"
    verification:
      - kind: unit
        ref: "grep -c 'which are transacted with Microsoft infrastructure through Graph API calls'
          == 1, line length after '> ' prefix == 241 (awk-measured); grep -c 'stored in a cloud
          vault' == 1, within 40 lines; two distinct **Source:** lines confirmed"
        status: pass
    human_judgment: false
  - id: D4
    description: "Both HP de-provisioning orders ship as two separately-labeled numbered lists
      (never merged); the 30-day countdown and orphaned-Remediation-scripts facts ship as sourced
      quotes; the HP-vs-Dell ordering asymmetry is recorded, not papered over"
    requirement: "BIOS-09"
    verification:
      - kind: unit
        ref: "two '^1\\. ' hits inside Offboarding (one naming EBAM, one naming the fleet); grep -c
          'Deactivation starts a 30-day countdown' == 1; grep -c 'will remain in place' == 1"
        status: pass
    human_judgment: false
  - id: D5
    description: "HP's leg of the inverted-prerequisite story (HP retries until lockout, the
      opposite failure mode to Dell's refusal) ships with a fixed grep needle, ahead of the shared
      fleet-survey step; the Endorsement-Key-loss gap ships as an honest, dated, page-cited absence"
    requirement: "BIOS-06"
    verification:
      - kind: unit
        ref: "grep -c 'HP retries until the BIOS locks out' >= 1; grep -c 'kek.pfx' >= 1 (signpost
          only); '2026-08-25' present inside Recovery; three HP developer-portal page names present"
        status: pass
    human_judgment: false
  - id: D6
    description: "All five binding gate classes (C17, check-phase-54, C11/v1.20-milestone-audit,
      check-nav-hub-links, the check-phase-144 apex) run clean against the working tree with the HP
      guide present and uncommitted; the dangling-link set shrank by exactly one (the HP file itself)
      and every remaining failure names only the Lenovo guide or the matrix"
    requirement: "BIOS-05"
    verification:
      - kind: integration
        ref: "c17-eee-contract.mjs (234/0), check-phase-54.mjs (32/0), v1.20-milestone-audit.mjs
          (16/0, exit 0), check-nav-hub-links.mjs (0 hub-presence, 5 corpus-link, none naming
          03-hp-bios-configuration.md as an unresolved target), check-phase-144.mjs (100 PASS / 1
          FAIL, V-143-CORPUSRUN)"
        status: pass
    human_judgment: false

duration: ~50min
completed: 2026-08-25
status: complete
---

# Phase 150 Plan 02: HP BIOS Guide Summary

**Authored the complete, shipping-quality HP BIOS guide — HP Connect documented as a vendor
connector (not a Win32 agent), its cloud-vault custody quoted at 241 characters against Dell's
no-customer-data statement in one file, both de-provisioning orders kept as separate objects, and
the Endorsement-Key-loss gap shipped as a dated, page-cited absence.**

## Performance

- **Duration:** ~50 min
- **Started:** 2026-08-25 (session)
- **Completed:** 2026-08-25
- **Tasks:** 3
- **Files modified:** 1 (created, uncommitted)

## Accomplishments

- Authored `docs/operations/firmware-bios/03-hp-bios-configuration.md` — 395 lines, 9 H2s, 7
  anchors, 14 `**Source:**` evidence lines, zero code fences, no `doc_id` — structurally identical
  to the Dell tracer at the H2 level (empty diff).
- Shipped all five of BIOS-07/D-23's HP Connect claims: the `admin.hp.com` console with its
  qualified, symmetric-with-Dell Partner-portals-tab discoverability (U-6's positive closure);
  policies published as Remediations over Graph; Global-Administrator-once /
  Intune-Administrator-thereafter consent; Sure Admin certificate authentication; and no per-device
  agent, stated explicitly against Dell's DCECMI.
- Shipped both custody quotes in one file, adjacent, each with its own evidence line — HP's
  cloud-vault statement and the complete, unabbreviated 241-character Dell no-customer-data
  sentence (not the milestone research's 166-character truncation), satisfying Success Criterion 3's
  "quoted against" requirement (D-36, D-46).
- Shipped BIOS-09's HP half: the per-device de-provisioning order (EBAM → LAK → Signing Key →
  Endorsement Key) and the fleet-first account-retirement order as two separately-labeled numbered
  lists (D-29), the 30-day countdown and orphaned-Remediation-scripts facts as sourced quotes, and
  the recorded HP-vs-Dell ordering asymmetry (D-30/D-88).
- Shipped HP's leg of the inverted-prerequisite story (BIOS-06/D-35) — HP retries until the BIOS
  locks out, the opposite failure mode to Dell's refusal — ahead of the shared fleet-survey step.
- Shipped the Endorsement-Key-loss gap (D-56/D-57/D-58) as two sourced facts plus a
  corpus-attributed conclusion, dated 2026-08-25, naming the three HP developer-portal pages
  checked, with no forum citation and no invented escape hatch.
- Ran all five binding gate classes plus the check-phase-144 apex against the working tree with the
  file present and uncommitted; confirmed the dangling-link set shrank by exactly one file.

## Task Commits

Per the phase's deferred-commit design (D-80), **no task in this plan is committed.** All three
tasks authored and verified the HP guide on the working tree; the file is left untracked for Plan
04's single content commit.

1. **Task 1: Author the HP guide — Delivery, Authentication, Scope** — not committed, per D-80.
2. **Task 2: Author the HP guide — Prerequisites, Offboarding, Recovery and the tail** — not
   committed, per D-80.
3. **Task 3: Run the gates and confirm the dangling set shrank by exactly one** — no files
   modified; verification only.

**Plan metadata:** this SUMMARY, `.planning/STATE.md` and `.planning/ROADMAP.md` are committed
together (see Next Phase Readiness). No `docs/` file is committed by this plan, per the commit
contract override.

## Files Created/Modified

- `docs/operations/firmware-bios/03-hp-bios-configuration.md` (created, **uncommitted**) — the
  complete HP BIOS guide: 395 lines, 9 H2s, 7 anchors, 14 `**Source:**` evidence lines, zero code
  fences, no `doc_id`, LF-terminated.

## Verification Evidence

All commands run against the working tree with both `02-dell-bios-configuration.md` and
`03-hp-bios-configuration.md` present and uncommitted.

**Task 1 acceptance criteria (all pass, after a wrapping fix — see Deviations):**

```
FENCES=0 DOCID=0
which are transacted with Microsoft infrastructure through Graph API calls -> 1
Dell quote line length (after "> " prefix, awk-measured) -> 241
stored in a cloud vault -> 1, at line 138 (well within 40 lines of the Dell quote at line ~151)
Two distinct **Source:** lines between the two custody blockquotes -> confirmed (HP Connect User
  Guide; Dell KB 000356434)
HPConnectForMEM- -> 1
Partner portals tab of the Intune admin center -> 1
"not found in the Intune UI" / "not surfaced in the Intune" -> 0
Both types of authentication can not coexist -> 1
a payload can only be used once on a specific device -> 1
"or the setting may not b" (truncated string) -> 0
c17-eee-contract.mjs -> 234 files checked, 0 with violations, 0 total violations (unchanged)
```

**Task 2 acceptance criteria (all pass):**

```
H2=9 ANCHORS=7
Headings (identical order to Dell, empty diff): ## Delivery, ## Authentication, ## Scope,
  ## Prerequisites, ## Offboarding and Loss of the Management Plane, ## Recovery,
  ## Unsupported and Anti-Feature Callouts, ## Related Resources, ## External References
HP retries until the BIOS locks out -> 1
Deactivation starts a 30-day countdown -> 1 (prose lead-in rephrased to avoid a duplicate match)
will remain in place -> 1
Two numbered lists in Offboarding, distinctly labeled: "1. Disable EBAM." / "1. De-provision the
  fleet." -> confirmed
the Local Access Key must be removed as well -> 1
kek.pfx -> 1, no adjacent cmdlet invocation with parameters (signpost only)
2026-08-25 -> present inside Recovery ("As of 2026-08-25, checked against...")
Secure BIOS with HP Sure Admin -> 7 hits (page name cited multiple times across sections)
Service Tag / proof of ownership / forum / system board / motherboard / deprecated -> 0 each
American spellings (behaviour/colour/organis[ae]/licence/enrolment/honour/labelled/centre) -> 0
  (one instance of "behaviour" caught and fixed to "behavior" during drafting)
System Center | Autopatch rings (C11 literals) -> 0
git status --porcelain -> both guide files untracked
```

**Task 3 — the five binding gate classes plus the apex:**

| Gate | Command | Result |
|---|---|---|
| C17 EEE contract | `c17-eee-contract.mjs` | `234 files checked, 0 with violations, 0 total violations` — unchanged; the HP guide confirmed unenrolled |
| Prose/blockquote gate | `check-phase-54.mjs` | `32 passed, 0 failed, 0 skipped` |
| C11 corpus prose scan | `v1.20-milestone-audit.mjs` | `16 passed, 0 failed, 0 skipped`, exit 0 |
| Link + anchor checker | `check-nav-hub-links.mjs` | `0 hub-presence failure(s), 5 corpus-link failure(s), 5 total` |
| Apex chain | `check-phase-144.mjs` | `100 PASS, 1 FAIL, 0 SKIPPED (total checks: 101)` — the one FAIL is `CHAIN-143`, nested output naming `V-143-CORPUSRUN`, exactly as predicted |

**H2 structural-equality check (SC#1, BIOS-05):**

```
diff <(grep '^## ' 02-dell-bios-configuration.md) <(grep '^## ' 03-hp-bios-configuration.md)
-> no output (NO DIFF)
```

**The exact `check-nav-hub-links.mjs` corpus-link failure list after this plan** (down from Plan
01's baseline of 6 failures to 5; `03-hp-bios-configuration.md` has dropped out of the list
entirely as an unresolved target):

```
docs/operations/firmware-bios/02-dell-bios-configuration.md:263 -> 04-lenovo-bios-configuration.md
docs/operations/firmware-bios/02-dell-bios-configuration.md:265 -> ../../reference/firmware-oem-matrix.md
docs/operations/firmware-bios/03-hp-bios-configuration.md:155  -> 04-lenovo-bios-configuration.md
docs/operations/firmware-bios/03-hp-bios-configuration.md:376  -> 04-lenovo-bios-configuration.md
docs/operations/firmware-bios/03-hp-bios-configuration.md:380  -> ../../reference/firmware-oem-matrix.md
```

All five name one of the two remaining legitimately-dangling targets (`04-lenovo-bios-configuration.md`,
`firmware-oem-matrix.md`) and nothing else — confirmed by piping the failure lines through
`grep -vE '04-lenovo-bios-configuration|firmware-oem-matrix'`, which produces no output. A separate
check confirmed no failure line names `03-hp-bios-configuration.md` as an unresolved *target*
(`target file not found: .../03-hp-bios-configuration.md` returns zero matches) — the Dell guide's
four links into the HP file (lines 40, 143, 181, 261, per Plan 01's SUMMARY) now all resolve. Both
fragment links used in the HP guide (`00-overview.md#who-holds-the-secret`,
`06-windows-driver-firmware-updates.md#unsupported-callouts`) and the plain link to
`03-tpm-attestation.md` resolved cleanly against their existing anchors — confirmed by target-file
existence checks before authoring (see Deviations) and by the zero hub-presence-failure count above.

**C17 file count:** 234 (unchanged from the Plan 01 baseline). The HP guide carries no `doc_id` and
is confirmed not picked up by C17.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed four blockquotes that soft-wrapped an exact-grep-checked quote across
multiple `>` lines**
- **Found during:** Task 1 and Task 2, first acceptance-criteria verification pass
- **Issue:** The Dell 241-character custody quote, the "Partner portals tab" quote, the
  partial-removal-trap quote, and the "30-day countdown" / "will remain in place" quote pair were
  each authored with a soft line-wrap at roughly 100 characters for editor readability — matching
  the visual style of the surrounding prose. Markdown renders a multi-line `> ` block identically to
  a single long `> ` line, so this looked correct, but four of the plan's acceptance-criteria greps
  check for an exact contiguous substring (and one, the Dell quote, additionally checks the *entire*
  line length via `awk`), and a mid-quote line break silently broke every one of those checks: the
  first verification pass returned `0` for the Dell clause, `0` for the Partner-portals phrase, `0`
  for "will remain in place", and `0` for "the Local Access Key must be removed as well", despite
  all four quotes being present, complete, and correctly worded.
- **Fix:** Rewrote each of the four blockquotes as a single unwrapped `> ` line. Also rephrased the
  prose lead-in immediately before the 30-day-countdown blockquote (which had independently
  duplicated the phrase "Deactivation starts a 30-day countdown," pushing that grep's count to 2)
  so the checked phrase appears exactly once, only inside the blockquote itself.
- **Files modified:** `docs/operations/firmware-bios/03-hp-bios-configuration.md` (four `Edit`
  calls, no other content changed)
- **Verification:** Full acceptance-criteria grep suite re-run after each fix; all previously-failing
  checks now return their required counts (see Verification Evidence above).
- **Committed in:** N/A — file remains uncommitted per D-80.

**2. [Rule 1 - Bug] Removed a redundant restating sentence that risked a criterion miscount**
- **Found during:** Task 1, second verification pass (British-spelling and retired-term greps)
- **Issue:** A sentence — "In body prose this guide writes **Remediations**, not Proactive
  Remediations, following the corpus's own retired-branding convention." — was added after the
  Delivery quote as connective tissue, but it duplicated the substring "Proactive Remediations"
  outside a blockquote, on top of the D-71 first-use parenthetical and the D-27 console-path
  literal Task 1 explicitly requires verbatim. This risked failing Task 2's paraphrased "at most 1"
  criterion for the retired remediation feature name.
- **Fix:** Deleted the sentence; it added no content the plan required. The two remaining
  non-blockquote occurrences of "Proactive Remediation" are the D-71 parenthetical
  (`(formerly Proactive Remediations)`, first use) and the D-27 console-path literal
  (`Reports, Endpoint Analytics, Proactive Remediation`), which Task 1's own action text explicitly
  mandates ship "as written." See the judgment-call note below.
- **Files modified:** `docs/operations/firmware-bios/03-hp-bios-configuration.md`
- **Verification:** `grep -v '^>' file | grep -n 'Proactive Remediation'` now returns exactly these
  two non-blockquote occurrences.
- **Committed in:** N/A — file remains uncommitted per D-80.

---

**Total deviations:** 2 auto-fixed (both Rule 1 — bugs in the authored content, not the plan).
**Impact on plan:** Both fixes were necessary for the guide to actually satisfy its own
acceptance criteria; no scope creep, no content added beyond what the plan specified.

### Judgment call, recorded for the verifier

Task 1's action text explicitly requires the console-path literal
`Reports, Endpoint Analytics, Proactive Remediation` (D-27) to "ship as written," while Task 2's
acceptance criteria paraphrase a check for "the retired remediation feature name returns at most 1"
outside blockquotes, citing "the single first-use parenthetical copied from the corpus's existing
form (D-71)." Taken as a literal substring count, these two instructions conflict: the console-path
literal itself contains "Proactive Remediation." Read narrowly, the criterion targets the D-71
parenthretical *convention* specifically (which appears exactly once), not every occurrence of the
substring anywhere in prose — the alternative reading would make Task 1's own explicit instruction
unsatisfiable. Proceeded on that reading; the two non-blockquote occurrences (parenthetical +
console-path literal) are both individually required by name in Task 1's action text. Flagging this
explicitly so a verifier checking the paraphrased criterion literally sees the reasoning rather than
an unexplained discrepancy.

## Issues Encountered

None beyond the two auto-fixed deviations above. No authentication gates, no missing dependencies,
no architectural questions.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 03 (the Lenovo guide) can copy the same proven nine-H2/seven-anchor skeleton, now confirmed
  twice (Dell, HP) against zero structural drift.
- Plan 04's dangling-link before-state is now this SUMMARY's exact 5-failure list — down from Plan
  01's 6 — with the concrete expectation that Plan 03 lands the Lenovo file and reduces it further.
- `docs/operations/firmware-bios/03-hp-bios-configuration.md` remains **uncommitted** on the working
  tree by design (D-80), alongside `02-dell-bios-configuration.md`. Plan 03, Plan 04, and Plan 05's
  own executors must not run `git add -A` / `git add .` at any point.

---
*Phase: 150-per-oem-bios-guides-capability-matrix*
*Completed: 2026-08-25*

## Self-Check: PASSED

- `docs/operations/firmware-bios/03-hp-bios-configuration.md` — FOUND (uncommitted, as designed)
- `.planning/phases/150-per-oem-bios-guides-capability-matrix/150-02-SUMMARY.md` — FOUND
- No task commits to verify — per D-80, this plan makes zero commits (deferred-commit design)
- H2 line-set diff against `02-dell-bios-configuration.md` — empty (structural match confirmed)
- `check-nav-hub-links.mjs` — 5 corpus-link failures, all naming only `04-lenovo-bios-configuration.md` or `firmware-oem-matrix.md`
- `check-phase-144.mjs` apex — 100 PASS, 1 FAIL (`V-143-CORPUSRUN`), matching the predicted baseline
