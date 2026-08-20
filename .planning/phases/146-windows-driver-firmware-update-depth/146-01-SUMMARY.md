---
phase: 146-windows-driver-firmware-update-depth
plan: 01
subsystem: docs/operations/patch-management
tags: [windows, drivers, firmware, intune, patch-management, configuration-manager, autopilot]
status: complete

requires: []
provides:
  - "docs/operations/patch-management/06-windows-driver-firmware-updates.md"
  - "H1 `# Windows Driver and Firmware Updates` (Phase 152 registry Title, D-67)"
  - "Eight own-line <a id> anchors (Phase 148 cross-link contract, D-66)"
  - "Anchor `#configmgr-coexistence` (plan 02's fourth mitigation item target)"
affects:
  - "docs/operations/patch-management/01-windows-wufb-rings.md (plan 02 — stub-and-move)"
  - "docs/operations/patch-management/00-overview.md (plan 03 — routing)"

tech-stack:
  added: []
  patterns:
    - "Blockquoted verbatim first-party quote + standalone **Source:** line — new to docs/operations/patch-management/ (PATTERNS §3)"
    - "Two consecutive **Source:** lines for dual-page attribution (01:165-166 precedent)"
    - "Bold sub-label absence callouts + three-column recipe table, both in one Unsupported section"

key-files:
  created:
    - docs/operations/patch-management/06-windows-driver-firmware-updates.md
  modified: []

decisions:
  - "D-70's midnight branch FIRED: execution began 2026-08-19 and commit 1 landed 2026-08-20, so 06 is stamped last_verified 2026-08-20 / review_by 2026-10-19, not the 2026-08-19 / 2026-10-18 the plan predicted."
  - "Checkpoint auto-resolved to `proceed-as-planned` under AUTO_MODE (see Checkpoint below)."
  - "Q5 and Q6 cited to two different pages, correcting FEATURES.md:83's B-5 misattribution."
  - "01:177's firmware claim corrected, not relocated — 06 states the two sourced facts (Q21, Q12) and lets the reader draw the conclusion, per Assumptions-Log A2."

metrics:
  duration: ~70 min
  completed: 2026-08-20
  tasks: 3
  commits: 1
  files: 1

actuals:
  tokens: 24000
  tasks: 3
  commits: 1
---

# Phase 146 Plan 01: Windows Driver and Firmware Update Guide Summary

Authored `06-windows-driver-firmware-updates.md` (764 lines, 63 `**Source:**` lines over eight
first-party Learn pages) covering DRV-01 through DRV-06, landing commit 1 of D-61's three-commit
sequence with all six gates at their exact HEAD baselines.

## What Was Built

One new file: `docs/operations/patch-management/06-windows-driver-firmware-updates.md`.

Ten H2s in D-37's order, the first eight each preceded by its own-line `<a id>` anchor (the D-66
contract Phase 148 and this phase's plans 02/03 consume):

| Anchor | H2 | Requirements |
|---|---|---|
| `what-this-policy-does` | `## What This Policy Does` | DRV-01 |
| `approval-modes` | `## Approval Modes` | DRV-01 |
| `approval-workflow` | `## The Approval Workflow` | DRV-01, DRV-03 |
| `deferral-deadline-behavior` | `## Deferral and Deadline Behavior` | DRV-02 |
| `oem-catalog-firmware` | `## OEM Catalog and Firmware Delivery` | DRV-01 |
| `driver-update-reporting` | `## Reporting` | DRV-01 |
| `configmgr-coexistence` | `## Configuration Manager Co-management and Co-existence` | DRV-06 |
| `unsupported-callouts` | `## Unsupported and Anti-Feature Callouts` | DRV-03, DRV-04, DRV-05 |

`## Related Resources` and `## External References` carry no anchor, matching the measured sibling
convention.

## Validator Output — actual, recorded at execution

Apex baseline, run as Task 1's first action before any file existed:

```
node scripts/validation/check-phase-144.mjs
Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)
```

The six commit-1 gates, re-run after the D-70 stamp correction and immediately before the commit:

| Gate | Actual output | Baseline | Status |
|---|---|---|---|
| `v1.20-milestone-audit.mjs` | `Summary: 16 passed, 0 failed, 0 skipped` | 16/0 | at baseline |
| `check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | 0/0 | at baseline |
| `check-phase-54.mjs` | `Summary: 32 passed, 0 failed, 0 skipped` | 32/0/0 | at baseline |
| `c17-eee-contract.mjs` | `234 files checked, 0 with violations, 0 total violations` | 234/0 | at baseline (not 235 — D-33 held) |
| `build-filename-map.mjs --self-test` | `8 passed, 0 failed` | 8/0 | at baseline (D-64 held) |
| `build-publish-bundle.mjs --self-test` | `15 passed, 0 failed` | 15/0 | at baseline (D-64 held) |

C11 saw ~700 lines of new prose under its live `walkMd('docs')` and stayed at 16/0. R2's avoidance
strategy is confirmed by measurement, not by reading the keyword list: `grep -cE '\bSCCM\b|\bSystem
Center\b'` returns 0, so no C11 hit exists in `06` for a ±200-char window keyword to have to keep
green.

## Structural Acceptance Checks — all measured

| Check | Expected | Actual |
|---|---|---|
| `grep -c '^doc_id:'` | 0 | 0 |
| `grep -n '^# '` | one line, `# Windows Driver and Firmware Updates` | exactly one, at `:16` |
| `grep -c '^<a id='` | 8 | 8, ids exactly as the D-66 contract |
| `grep -n '^## '` | 10 in D-37's order | 10, ending Related Resources then External References |
| `grep -c '^## Version History'` | 0 | 0 |
| ` ```mermaid ` fences | 0 | 0 |
| `grep -cE '^> \*\*Platform:\*\*'` | 0 | 0 (full `**Platform applicability:**` used) |
| `grep -cE '\bSCCM\b\|\bSystem Center\b'` | 0 | 0 |
| `grep -c 'Autopatch rings'` | 0 | 0 |
| forward links `\(0?5-\|\(0?7-\|\(0?8-\|firmware-bios` | 0 | 0 |
| `grep -cP '[\x{2019}\x{2011}]'` | 0 | 0 |
| `grep -c 'one-to-one'` | 0 | 0 |
| `grep -cE 'PITFALL-(5\|8\|11\|13)'` | 0 | 0 |
| `grep -cE '^## .*(Limitation\|Absence)'` | 0 | 0 |
| `grep -c 'automatic firmware delivery for OEM-published catalogs'` | 0 | 0 |
| `grep -v '^>' \| grep -c 'driver deployment ring'` | 0 | 0 (present once, inside Q1's blockquote) |
| `**Source:**` lines matching R7's regex | all | 63 of 63 conform |
| `git show --stat HEAD` | one file | one file, 764 insertions, 0 deletions |

Required literals, each verified present exactly once:

- `can never be Declined` (Q5 / DRV-03 / SC#3, the D-50 one-way constraint)
- `If it can't halt the installation, the update completes its installation` (Q6 / B-5)
- `does not apply to drivers that are approved using the Driver Update Policy` (Q1 / DRV-02 / SC#2)
- `The deferral period only applies to automatically approved driver and firmware updates` (Q2)
- `The Quality Update deadline and grace period settings apply to drivers` (Q3)
- `undefined and unpredictable device state` (Q43 / SC#4 / DRV-06)
- `Driver updates aren't supported during Windows Autopilot` (Q29 / DRV-04)
- `These updates may include critical driver updates that have not yet been approved by an admin` (Q30)
- `new policies are generated to` (Q31 / DRV-05)
- `Computer Hardware ID` (Q19)
- `| Feature | Why it's unsupported / what breaks | Do this instead |` (PATTERNS §5, byte-exact)

## Quote Fidelity

Every quoted string in `06` was transcribed from `146-RESEARCH.md` §2 and then verified back against
it by exact-substring grep. 50+ distinct phrases checked, all traced to the bank. Nothing was
paraphrased, reconstructed from memory, or invented for a claim §2 does not carry.

The R1 two-codepoint fold was applied and verified byte-level: RESEARCH carries `You` + `U+2019` +
`ll lose` (octal `342 200 231`), `06` carries ASCII `You'll lose`. `U+2019` and `U+2011` occurrences
in `06`: **0**. Every other non-ASCII codepoint — em dashes throughout — ships byte-verbatim.

B-5's dual attribution is measured correct: the `**Source:**` line nearest the Q6 halt quote is
`driver-updates-faq` (`:270`), and the one nearest Q5's verbatim blockquote is
`configure-driver-update-policy` (`:215`). `FEATURES.md:83`'s claim that both come from the latter is
not reproduced.

## Checkpoint (auto-resolved)

**Task 2 of the plan is `checkpoint:decision gate="blocking"` — Confirm the DRV-03 sourcing contract
before any first-party quote is authored into `06`.**

Options as written in the plan:

1. **`proceed-as-planned`** — Quote from the §2 bank, cite each half to its real page, apply the R1
   fold. Pros: matches D-50, D-53 and RESEARCH §4 exactly; the re-fetch already succeeded so no
   network work is required and no fabrication risk is taken. Cons: none identified; this is the
   recorded intent.
2. **`escalate`** — Escalate to the owner because a bank quote cannot be reproduced from RESEARCH §2.
   Pros: honours D-50's block-and-escalate rule if the bank is incomplete for a claim DRV-03 or SC#3
   mandates. Cons: halts the phase; only legitimate if a required quote is genuinely absent.

**⚡ Auto-selected: `proceed-as-planned`** (AUTO_MODE active, first option).

The selection is also the substantively correct one and not merely the default: RESEARCH §4 records
the D-50 trigger re-fetch as SUCCEEDED (HTTP 200 rendered 80,680 B and source markdown 29,935 B),
with DRV-03's once-Approved-never-Declined constraint confirmed verbatim at source `:218`. No bank
quote was found missing during authoring, so the `escalate` branch had no factual trigger.

## Deviations from Plan

### 1. [D-70 conditional branch fired] Date stamps are 2026-08-20, not the predicted 2026-08-19

- **Found during:** Task 3, at the commit step.
- **Issue:** Execution began 2026-08-19 and commit 1 landed 2026-08-20 00:01 local. The plan's Task 1
  wrote "If the execution date is 2026-08-19 the stamps are `last_verified: 2026-08-19` /
  `review_by: 2026-10-18`, matching all five siblings exactly."
- **Resolution:** D-70 governs this exact case — *"if execution spans midnight, all three files take
  the date of commit 1"*. `06` is stamped `last_verified: 2026-08-20` / `review_by: 2026-10-19`,
  computed by 60-day arithmetic per 145 D-06 and verified (`2026-08-20 + 60 = 2026-10-19`). Both
  stamps moved together, per D-60's rule that one must never advance without the other. All six
  gates were re-run after the change and all six stayed at baseline.
- **Files modified:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md`
- **Commit:** `9367c368`

**⚠ Knock-on for plans 02 and 03 — read this before executing them.** D-59 recorded the re-stamp
instruction as *"conditional and probably a no-op"* because all five siblings already read
`2026-08-19 / 2026-10-18`. **That condition is now met and the instruction is no longer a no-op.**
D-59's rule reads: *if the execution date differs from 2026-08-19, re-stamp `last_verified` to the
actual execution date and recompute `review_by = last_verified + 60` by arithmetic in the same
commit.* Plan 02 (`01-windows-wufb-rings.md`) and plan 03 (`00-overview.md`) must therefore stamp
`last_verified: 2026-08-20` / `review_by: 2026-10-19` rather than treating the instruction as a
deliberate no-op. Note that this is a frontmatter edit only and does not touch D-06's frozen zone.

### 2. [Rule 3 - editorial] One bare `ring` in the guide's own prose qualified

- **Found during:** Task 2 self-check against R4b.
- **Issue:** The prerequisites paragraph read *"In the update ring policy, ..."* — a bare `ring` in
  the guide's own prose rather than inside a quote.
- **Fix:** Changed to *"In the WUfB deployment ring policy, ..."*. The quoted portion
  (*"Ensure the Windows driver setting is set to Allow."*) was not altered.
- **Commit:** `9367c368`

Nothing else deviated. No architectural change was needed, no auth gate was hit, no package was
installed, and no validator was edited.

## Deliberately Not Done (D-64, D-65)

No registry row, no filename-map row, no canary bump, no `docs/operations/00-index.md` row, no
nav-hub wiring, no `## Version History`. All of it is Phase 152's single atomic unit. Both pipeline
self-tests were run after the commit content was final and both are unchanged (8/0 and 15/0),
confirming the abstention held.

## Known Stubs

None. All eight content sections are fully authored from the quote bank; no placeholder, `TODO`,
`FIXME` or `TBD` token remains (the Task 1 tracer placeholders were all replaced in Tasks 2 and 3
and the substitution script hard-failed on any missing tag).

## Threat Flags

None. `06` defines no endpoint, parses no untrusted input, executes no code and holds no credential.
T-146-01 (unverified `https://learn.microsoft.com` targets) is accepted as planned — the eight Learn
URLs in `## External References` and the 63 `**Source:**` lines are not machine-verifiable, because
`check-nav-hub-links.mjs:242` returns null for `http(s)` targets. The orchestrator confirms each URL
manually during verification, which is the Phase-145 precedent. T-146-02 is mitigated as planned: the
deferral section gives first-party ranges and branch criteria only, with no worked tenant schedule,
no tenant id, no device name and no serial anywhere in the guide.

## Notes for Verification

- The eight Learn URLs are the manual-confirmation set (D-69). The single quote most worth
  re-confirming is Q31 (the destructive mode switch), whose page S7 is the oldest in the bank at
  `updated_at 2025-06-04`.
- D-53's verifier contract is amended by RESEARCH Open Question 1: apply the same two-codepoint fold
  to the re-fetched page text before diffing. A normalized comparison is still a real comparison; an
  un-normalized one will show four false positives (Q11, Q18, Q19, Q31).
- Do **not** expect the sections to map one-to-one onto DRV-01..06 (D-40). DRV-01 maps to five
  sections; DRV-03 and DRV-05 map to two each.
- The apex `check-phase-144` is **not** re-run in this plan by design. D-63 splits it: once before
  commit 1 (done, 101/0/0) and once after the last commit, which is plan 03's final task.

## Self-Check: PASSED

- `docs/operations/patch-management/06-windows-driver-firmware-updates.md` — FOUND
- Commit `9367c368` — FOUND in `git log`, one file changed, 764 insertions, 0 deletions
- All six gates re-run post-stamp-change and recorded above with their actual output
