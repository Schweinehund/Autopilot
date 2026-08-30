---
phase: 147-linux-update-delivery
plan: 02
subsystem: documentation-corpus
tags: [linux, patch-management, cross-platform-hub, routing, requirements-correction, d-73]
status: complete
requires:
  - docs/operations/patch-management/05-linux-update-delivery.md (plan 01 — the link target; must exist or check-nav-hub-links reports "target file not found")
  - docs/operations/patch-management/06-windows-driver-firmware-updates.md (the already-correct D-73 treatment, transposed not re-derived)
  - docs/reference/4-platform-capability-comparison.md (the corpus's own 4-to-5 precedent — read, not edited)
  - .planning/phases/147-linux-update-delivery/147-RESEARCH.md (D-13 decoy finding; the configure-driver-update-policy citation)
provides:
  - "00-overview.md as a genuinely five-platform hub: five table columns with Linux last, five-platform prose at eleven sites, three inbound links to 05-"
  - "three **[OWNER-RULED IN SCOPE 2026-08-20]** markers in .planning/REQUIREMENTS.md on DRV-02, LNX-01 and LNX-03"
  - "a corrected attribution in .planning/research/PITFALLS.md — the update-notifier-common half is now a documented silence, not a Canonical claim"
affects:
  - Phase 148 (the fourth and last content phase to touch 00-overview.md — the table now has five columns, not four)
  - Phase 151 Recipe #5 (the three D-73 hand-offs, restated below)
  - Phase 152 (registry row, filename-map row, ops-index row, nav-hub wiring — none of it this phase)
  - every future phase reading .planning/REQUIREMENTS.md or .planning/research/PITFALLS.md
tech-stack:
  added: []
  patterns:
    - "parenthetical absence convention for absent capabilities in the comparison table — the table's own existing form, e.g. the Android Deferral cell (D-35)"
    - "**[OWNER-RULED IN SCOPE YYYY-MM-DD]** marker appended inline to a completed requirement bullet, followed by the correction and what is withdrawn — the DRV-06 instrument at REQUIREMENTS.md:46 (D-04)"
    - "**[CORRECTED YYYY-MM-DD — <defect class>, Phase N D-NN]** in-sentence marker in a research artifact: correct the attribution, never delete the claim (the Phase-145 FEATURES D-2 instrument)"
    - "line-array editing with an explicit EOL round-trip plus a match-count assertion per replacement — the CRLF zero-match countermeasure (R2, D-63)"
key-files:
  created: []
  modified:
    - docs/operations/patch-management/00-overview.md
    - .planning/REQUIREMENTS.md
    - .planning/research/PITFALLS.md
decisions:
  - "Related Resources insertion point: appended LAST, after the Android entry. The list's existing order is 01, 06, 02, 03, 04 — non-numeric because 06 is docked next to 01 on Windows adjacency, not on file number. Linux has no such adjacency, so it appends last, which also mirrors the comparison table's Linux-last column and the routing list's Linux-last bullet. Rationale recorded rather than left implicit (D-39)"
  - "The conditional date re-stamp FIRED. Commit 1 landed 2026-08-21, which differs from the file's last_verified: 2026-08-20, so both stamps advanced together: last_verified 2026-08-20 -> 2026-08-21 and review_by 2026-10-19 -> 2026-10-20, interval verified at exactly 60 days by arithmetic (R5, D-61)"
  - "S8 is written WITHOUT a numeral. The plan's action says the Ring Terminology sentence 'becomes four platforms including Linux', but Task 1's own criterion requires \\bfour\\b == 0 across the file. The two are in tension; resolved by phrasing the sentence as 'The other platforms (macOS, iOS, Android, Linux) do not use ring terminology', which satisfies both the intent and the grep"
  - "The four sibling routing blockquotes in 01, 02, 03 and 04 each enumerate the other three platform siblings and now silently omit Linux. Knowingly accepted, carried forward from plan 01's D-49 — the roadmap's blast radius locks edits to 00-overview.md only. 06 carries no platform enumeration and is unaffected"
  - "The Windows Deferral mechanism table cell stays 'WUfB deployment rings (quality/feature)' while the prose above it now states Windows has TWO deferral settings. Knowingly accepted debt, one table row deep, per the add-alongside ruling in the plan's assumption_delta_decision"
metrics:
  duration: ~35 min
  completed: 2026-08-21
  tasks: 3
  commits: 1
actuals:
  tokens: 9200
  tasks: 3
  commits: 1
---

# Phase 147 Plan 02: Five-Platform Overview Summary

`docs/operations/patch-management/00-overview.md` is now genuinely five-platform — a fifth Linux
column appended last to the Cross-Platform Comparison table with every row still on one physical
line, five-platform prose at all eleven swept sites (including the three that carry no `four` token),
three inbound links to the new Linux guide, and the Phase-146 D-73 driver-deferral defect corrected
with a Microsoft Learn source.

## What Shipped

| Site | Kind | Substance |
|---|---|---|
| S1 | prose sweep | Applicability blockquote enumeration → `Windows, macOS, iOS/iPadOS, Android, and Linux`. The `> **Platform applicability:**` lead-in substring is byte-identical (R4, `V-54-26`) |
| S2 | D-39 site 1 | `> **Linux:** See [Linux Update Delivery](05-linux-update-delivery.md) …` — three blockquote lines in the same bold-label shape as the four siblings, naming the absent update policy, the Bash platform-script root-context hazard, and `unattended-upgrades` |
| S3 | prose sweep | H1 intro enumeration → five platforms |
| S4 | prose sweep | `across all four platforms` → five; `the four sibling guides` → five |
| S5 | prose sweep | Column-order sentence gains Linux last; `(file numbers 01 through 04)` → `01 through 05` |
| S6 | D-39 site 2 | The Linux column: header, delimiter and all five body rows. Five D-35 cells verbatim, using the table's own parenthetical-absence convention |
| S7 | prose sweep | `all four platforms; both are detailed` → five. The hard-cutover count stays **two** — Linux adds none |
| S8 | prose sweep | Ring Terminology `The other three platforms (macOS, iOS, Android)` → `The other platforms (macOS, iOS, Android, Linux)`. Carries no `four` token; a `four` grep misses it entirely |
| S9 | D-39 site 6 | The D-73 correction, sourced |
| S10 | D-39 site 5 | Attestation `Examples:` gains a Linux clause scoped to **web access to Entra-protected applications through Microsoft Edge for Linux**, with the device-level exclusion stated in the same breath (D-30) |
| S11 | D-39 sites 3, 4 + sweep | Routing bullet; Related Resources entry; `The four guides` → five; `across all four platforms` → five; `The four platforms expose` → five; Linux clauses added to the Cadence alignment, Compliance signal harmonization, Communications cadence and Reporting parity bullets |
| — | requirements | Three `**[OWNER-RULED IN SCOPE 2026-08-20]**` markers on `DRV-02` (:42), `LNX-01` (:51) and `LNX-03` (:53), in the DRV-06 shape at `:46` |
| — | pitfalls | `PITFALLS.md:541`'s misattributed Canonical citation corrected at source |

### The five Linux cells (D-35), as shipped

| Row | Linux cell |
|---|---|
| Cadence model | distro-native `apt` + `unattended-upgrades`, no Intune orchestration |
| Deferral mechanism | `(No Intune-side deferral; distro-native only)` |
| Enforcement primitive | `(None — compliance policy + web-app CA is attestation only)` |
| Hotpatch / EOL surface | Livepatch via Ubuntu Pro (Canonical-side entitlement) |
| Hard deadline | `(no hard deadline)` |

### The D-73 correction, as shipped

The defective clause — *"the 0–30 day deferral are set per deployment ring"* — is gone. It now reads
that the quality-update deferral set in the WUfB deployment ring policy **does not reach** drivers
approved by the driver update policy; that the driver policy has its **own** 0–30 day deferral,
configured by its **Make updates available after (days)** setting and counted from the day the update
was added to the policy rather than from the day the OEM published it; and that the quality-update
deadline and grace period **do** apply to drivers. Approval mode fixed at creation and the cross-link
to `06-` are both intact. A fourth standalone `**Source:**` paragraph was added:
`[Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)`
— copied from `06-`'s existing in-repo citation for the same fact, never re-fetched (R6, T-147-09).

## Required Records

**Related Resources insertion point (D-39).** Appended **last**, after the Android entry. The list's
existing order is `01, 06, 02, 03, 04` — non-numeric because `06` is docked next to `01` on **Windows
adjacency**, not on file number. Linux has no Windows adjacency to dock against, so appending last is
the only placement the existing ordering logic actually supports; it also mirrors the comparison
table's Linux-last column and the routing list's Linux-last bullet, so all three lists now read in the
same order.

**Conditional date re-stamp (D-61) — FIRED.** Commit 1 (`8189c560`) landed **2026-08-21**, which
differs from the file's `last_verified: 2026-08-20`, so the instruction was not a no-op. Both stamps
advanced together: `last_verified: 2026-08-20 → 2026-08-21` and `review_by: 2026-10-19 → 2026-10-20`.
Interval verified at exactly **60** days by arithmetic, not by eye. Per R5, neither stamp moved alone —
`check-phase-54.mjs` tests only `if (days > 60)`, so a lone `last_verified` advance would drive the
interval negative and silently pass. The new stamps now match `05-linux-update-delivery.md`'s
`2026-08-21 / 2026-10-20`.

**Sibling routing blockquote staleness (D-49) — knowingly accepted.** `01-windows-wufb-rings.md`,
`02-macos-update-enforcement.md`, `03-ios-update-lifecycle.md` and `04-android-patch-delivery.md` each
open with a `> **Platform applicability:**` blockquote enumerating the *other three* platform siblings.
With `05-` landed, all four silently omit Linux. `06-windows-driver-firmware-updates.md` carries no
platform enumeration and is unaffected. Not edited, and not a new defect — the roadmap's blast radius
locks this phase's edits to `00-overview.md`. Recorded here so verification and code review read it as
accepted rather than as a missed edit.

**Windows `Deferral mechanism` cell staleness — knowingly accepted (`add-alongside`).** The D-73
correction now has the overview's prose state that Windows has *two* deferral settings — the WUfB
deployment ring's quality-update deferral, which does not reach drivers, and the driver update
policy's own `Make updates available after (days)`. The Cross-Platform Comparison table's single
`Deferral mechanism` row keeps its Windows cell `WUfB deployment rings (quality/feature)` untouched
(R8, D-64, and the no-degradation prohibition). The prose is corrected; the row above it still asserts
the singular. Calling that `no-change` would be false. The promote trigger, if a later phase needs it:
any phase that has to answer *which* deferral applies to a given update type **from the table** — the
fix is then to key that row by owning policy instead of by platform, a table-shape change outside this
phase's blast radius.

**The three Phase-151 hand-offs (D-73), restated from plan 01.** (1) The eight anchor ids in
`147-01-SUMMARY.md`'s frontmatter are the cross-link contract Recipe #5 cannot author for itself.
(2) The guide is **Ubuntu-scoped by owner ruling** — RHEL 9/10 are named as an absence, not covered.
(3) **Linux has no enforcement primitive at all**, which constrains every Linux decision a
prescriptive artifact can express to an attestation-only decision.

## Validation Gates — Actual Output

All eight R1 baselines held exactly. The apex ran once, after commit 2 — the post-phase half of D-59's
pair. It was **not** run between the two commits (redundant with the per-commit gates, ~19s each).

| Gate | Actual output | Baseline | Result |
|---|---|---|---|
| `check-phase-54.mjs` | `Summary: 32 passed, 0 failed, 0 skipped` | 32/0/0 | PASS |
| `check-phase-50.mjs` | `Summary: 26 passed, 0 failed, 0 skipped` | 26/0/0 | PASS |
| `check-nav-hub-links.mjs` | `check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | 0/0 | PASS — all three new inbound links resolve |
| `c17-eee-contract.mjs` | `C17 summary: 234 files checked, 0 with violations, 0 total violations` | 234/0 | PASS |
| `v1.20-milestone-audit.mjs` | `Summary: 16 passed, 0 failed, 0 skipped` | 16/0 | PASS — C11 verified by running the audit, never by reading the keyword list (D-67) |
| `build-filename-map.mjs --self-test` | `8 passed, 0 failed` | 8/0 | PASS — mechanical proof no registry row landed |
| `build-publish-bundle.mjs --self-test` | `15 passed, 0 failed` | 15/0 | PASS — second canary, same proof |
| `check-phase-144.mjs` (apex, **after** commit 2) | `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)` | 101/0/0 | PASS |

Individually confirmed PASS after the overview edits, per D-34/D-36/D-40: `V-54-07`, `V-54-08`,
`V-54-26`, `V-54-29`, `V-54-30`, `V-54-31`.

## Acceptance Criteria — Actual Probe Output

| Probe | Expected | Actual |
|---|---|---|
| `awk 'length > 300 && /^\|/'` count | ≥ 1 | **2** — line 52 (302 ch) and line 53 (403 ch), both single unwrapped table rows |
| `grep -c '^\|'` | 7, unchanged | **7** — one header, one delimiter, five body rows. No row wrapped (R3) |
| `grep -c 'No Intune-side deferral; distro-native only'` | 1 | **1** |
| `grep -c 'compliance policy + web-app CA is attestation only'` | 1 | **1** |
| `grep -c 'Livepatch via Ubuntu Pro'` | 1 | **1** |
| `grep -c '\bfour\b'` | 0 | **0** — all seven tokens swept |
| `grep -c 'three platforms (macOS, iOS, Android)'` | 0 | **0** |
| `grep -c 'file numbers 01 through 04'` / `… 05'` | 0 / 1 | **0** / **1** |
| `grep -c 'and Android — covering concept terminology'` | 0 | **0** |
| `grep -c '> \*\*Platform applicability:\*\*'` | 1, byte-identical | **1**, untouched (R4) |
| `grep -c '^platform: cross-platform$'` / `'^platform: cross-platform, '` | 1 / 0 | **1** / **0** (D-40) |
| `grep -cE '\bTBD\b\|\bTODO\b\|\bFIXME\b\|\bXXX\b\|\bPLACEHOLDER\b'` | 0 | **0** (`V-54-30`) |
| `grep -c '05-linux-update-delivery.md'` | exactly 3 | **3**, at lines 20, 179 and 246 — three distinct sections. Never 6 (idempotency edge probe) |
| `grep -cE '^> \*\*Linux:\*\* See'` | 1 | **1** |
| `grep -c 'Microsoft Edge'` | ≥ 1 | **1**, inside the Attestation `Examples:` list, scoped to web access |
| `grep -c 'the 0–30 day deferral are'` | 0 | **0** — defective clause gone |
| `grep -c 'Make updates available after'` | ≥ 1 | **1** |
| `grep -c 'configure-driver-update-policy'` | ≥ 1 | **1** |
| `last_verified` / `review_by` ISO form + 60-day interval | 1 / 1 / 60 | **1** / **1** / **60** |
| `grep -c '\*\*\[OWNER-RULED IN SCOPE 2026-08-20\]\*\*' REQUIREMENTS.md` | 3 | **3**, on `DRV-02` :42, `LNX-01` :51, `LNX-03` :53 |
| `grep -c '05-compliance-policy.md'` in REQUIREMENTS.md / ROADMAP.md | 0 / 0 | **0** / **0** (R6, `V-54-21`) |
| `grep -c 'update-notifier-common' PITFALLS.md` | ≥ 1 | **2** — claim preserved, attribution corrected |
| `git status --porcelain docs/_registry/ docs/operations/00-index.md` | empty | **empty** (D-64, D-65) |
| `git diff --diff-filter=D HEAD~1 HEAD` | no deletions | **0 files** |

Task 1's `git diff --stat` showed `28 insertions(+), 23 deletions(-)`; Task 2's showed
`50 insertions(+), 28 deletions(-)` — strictly greater, proving none of Task 2's replacements silently
no-opped against CRLF content (R2, D-63).

### Every replacement confirmed matched (R2 / D-63)

The file is **CRLF** in the worktree while its structural analog `06-` is LF, and a literal
string-replace authored against an LF mental model silently no-ops. Countermeasure used: all edits ran
through a line-array round-trip with the EOL detected from the file itself and a **hard assertion that
each anchor matched exactly one line** — a zero-match or a multi-match aborted the whole script rather
than writing a partial file. **31 of 31 replacements reported `OK … @line N`**; zero silent no-ops.

## `git show --stat` for commit 2

```
 .planning/REQUIREMENTS.md                       |  6 +-
 .planning/research/PITFALLS.md                  |  2 +-
 docs/operations/patch-management/00-overview.md | 78 ++++++++++++++++---------
 3 files changed, 54 insertions(+), 32 deletions(-)
```

Commit `9bc0015c` — exactly the three named files (R8, D-64). No new file, no registry row, no
filename-map row, no canary bump, no ops-index row, no nav-hub wiring, no edit to `docs/reference/`,
`docs/admin-setup-linux/`, `06-windows-driver-firmware-updates.md`, or any of the four sibling routing
blockquotes.

## Deviations from Plan

### 1. [Rule 1 - Bug] The Task 1 header-row acceptance criterion is mis-specified and is unsatisfiable as written

Criterion defect, not a content defect — the same class as plan 01's Deviations 1a and 1b, diagnosed
the same way rather than worked around, and the plan was not edited to make it pass.

The criterion asserts that
`grep -cE '^\| Concept \|.*\| Windows \|.*\| macOS \|.*\| iOS/iPadOS \|.*\| Android \|.*\| Linux \|'`
returns `1`. It returns **0**. The alternating `\| X \|` … `.*\| Y \|` construction requires a literal
pipe on **both** sides of every platform name, but adjacent table cells **share** one delimiter: in
`| Concept | Windows | macOS | …` the pipe that closes `Concept` is the same pipe that opens `Windows`.
The regex tries to consume it twice, so it cannot match a compact header row at all.

**Proof it is the criterion and not the edit:** the same regex, minus the `Linux` clause, run against
the **pre-edit** four-platform header via `git show HEAD:…` also returns **0**. It was already
unsatisfiable before this plan touched the file.

Corrected probe, run and recorded:
`grep -cE '^\| Concept \|[^|]*Windows[^|]*\|[^|]*macOS[^|]*\|[^|]*iOS/iPadOS[^|]*\|[^|]*Android[^|]*\|[^|]*Linux[^|]*\|'`
returns **1**. The shipped header is
`| Concept | Windows | macOS | iOS/iPadOS | Android | Linux |` — all five platforms, in order, on one
physical line. The criterion's intent (D-33) is fully met, and `V-54-08` PASSes independently.

Recorded as an open entry in `.planning/WINDOWS.md` (kind `deviation`, phase 147).

### 2. [Rule 1 - Bug] The Linux blockquote line was inserted mid-sentence and was corrected before commit

The S2 anchor matched the **first** of the Android entry's two physical lines, so the three Linux lines
landed between `> **Android:** … for Play Integrity` and `> enforcement (October 31 2026 …)`, splitting
the Android sentence in half. Caught by reading back the edited region rather than by any validator —
no gate in this repository can see a bisected blockquote sentence. Fixed in place by re-anchoring on
the Android entry's **closing** line; the Linux lines now follow a complete Android entry. Verified by
re-reading lines 9–23 before proceeding. Nothing was committed in the broken state.

### 3. [Rule 3 - Blocking] The S8 sweep is written without a numeral, because the plan's action text and its own criterion are in tension

The Task 1 action says the Ring Terminology sentence *"becomes four platforms including Linux"*, while
Task 1's own criterion requires `grep -c '\bfour\b'` to return **0** across the whole file. Writing
"The other four platforms" would satisfy the action and fail the criterion. Resolved by phrasing the
sentence with no count word at all: **"The other platforms (macOS, iOS, Android, Linux) do not use ring
terminology"**. This satisfies both — Linux is enumerated, the stale "three" is gone, and no `four`
token is reintroduced. `V-54-09` is untouched (~1,380 bytes of slack in its 1,500-byte window).

### 4. [Record] The phase stands at two CONTENT commits, plus GSD metadata commits

The Task 3 criterion reads *"`git log --oneline -2` shows exactly two commits for this phase"*. It
shows `9bc0015c` (commit 2) and `aa1aaac2` (plan 01's GSD close-out commit — SUMMARY/STATE/ROADMAP/
REQUIREMENTS/WINDOWS). D-59's two-commit shape refers to **content** commits: `8189c560` (the guide)
and `9bc0015c` (the overview + requirements + pitfalls). The GSD per-plan metadata commits are workflow
bookkeeping and sit outside D-59's count. No third content commit was opened — the two requirement-text
markers and the pitfalls fix rode in commit 2, per Phase 146's own precedent.

**Total deviations:** 3 auto-fixed (1 mis-specified criterion diagnosed with a corrected probe,
1 insertion-point bug caught and fixed pre-commit, 1 plan-internal tension resolved by phrasing) plus
1 record-only clarification. **Impact:** none on the shipped content. Every plan intent is met; only
the probe wording and one sentence's phrasing differ from the literal plan text.

## Prohibitions — Verified

| Prohibition | Check | Result |
|---|---|---|
| Linux cells must not imply Intune orchestrates, schedules, defers or enforces Linux updates; every absent capability is an explicit parenthetical absence, never blank or softened | read all five cells | PASS — Cadence says *"no Intune orchestration"*; Deferral, Enforcement and Hard deadline are all explicit parenthetical absences; Hotpatch/EOL names Livepatch as a **Canonical-side** entitlement. No cell is blank |
| The five-platform rewrite must not degrade, truncate or drop any existing platform's cells, routing sentences or capability statements | `git diff` reviewed line by line | PASS — every deletion in the diff is a re-wrap or a `four → five` word swap. No Windows, macOS, iOS or Android cell, routing sentence or capability statement lost content. The one Windows *addition* (the D-73 correction) is strictly more accurate than what it replaced |
| No `SCCM` / `System Center` in new prose; write `Configuration Manager` | `grep -cE '\bSCCM\b\|\bSystem Center\b'` on the overview | **0**; the pre-existing `Configuration Manager` mention in Related Resources is untouched (R6, D-67) |
| No `Hotpatch` / `VBS` / `MEETS_STRONG_INTEGRITY` in body prose | `V-54-29` | PASS — `Livepatch` ships inside a **table cell**; it neither is nor contains the banned token, and it never migrated into a sentence |
| Frontmatter `platform:` never gains Linux | `grep -c '^platform: cross-platform$'` = 1 | PASS (D-40, `ROADMAP.md:126`) |
| No re-fetch of any URL RESEARCH already carries byte-verified | the `configure-driver-update-policy` citation was copied from `06-`'s existing in-repo line | PASS (R6, T-147-09) |
| No edit to `05-linux-update-delivery.md` (plan 01 owns it) | `git status --porcelain docs/` | PASS — only `00-overview.md` modified under `docs/` |

## Known Stubs

None. All eleven edit sites are authored at final quality; no placeholder sentence, no `TBD`/`TODO`
token, and no cell left blank.

## Threat Flags

None. No new network endpoint, auth path, file-access pattern or schema change — the deliverables are
one Markdown hub document and two planning artifacts, and this plan ships no command of any kind.
T-147-09's one outbound `learn.microsoft.com` target is a copy of an already-verified in-repo citation,
not a fresh composition.

## Next Phase Readiness

Phase 147 is content-complete: both plans shipped, all four LNX requirements Complete, the Phase-146
D-73 deferral discharged, and the apex at 101/0/0. Ready for `/gsd-verify-work 147`.

## Self-Check: PASSED

- `docs/operations/patch-management/00-overview.md` — FOUND (259 lines, up from 236)
- `.planning/REQUIREMENTS.md` — FOUND, 3 markers present
- `.planning/research/PITFALLS.md` — FOUND, attribution corrected at `:541`
- Commit `9bc0015c` — FOUND in `git log`, `3 files changed, 54 insertions(+), 32 deletions(-)`,
  0 deletions of tracked files
- All eight R1 gate baselines re-measured and recorded above with actual output
