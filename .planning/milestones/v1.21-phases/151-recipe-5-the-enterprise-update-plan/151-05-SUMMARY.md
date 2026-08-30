---
phase: 151-recipe-5-the-enterprise-update-plan
plan: 05
subsystem: docs
tags: [device-recipe, std-05, rollback-recovery, rcp-04, rcp-05, template-divergence, retrofit, commit-b, link-audit]

# Dependency graph
requires:
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-01 — Commit A (285a65d5) widened the Device Recipe class in EEE-SOP-standard.md and promoted `## Rollback/Recovery` into docs/_templates/recipe-template.md; created the recipe at the locked eight-H2 skeleton with the first Verification check, the first Rollback mechanism, the first Failures row and three See Also entries"
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-02 — the class table-separator style, the split breaks-callout idiom, and the corrected hotpatch and driver-mode positions the Rollback entries restate"
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-03 — the click-path discipline of routing to the nearest verified blade, the 183-character blockquote high-water mark, and Steps 4, 5 and 6 whose consequences the Rollback entries must not contradict"
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-04 — Steps 7 through 10, the three non-Windows platform guides added to the link roster (D-63), and the two open items this plan closes"
  - phase: 135-recipe-3-windows-11-multi-app-kiosk
    provides: "docs/recipes/03-windows-11-multi-app-kiosk.md — the donor `## Rollback/Recovery` prose shape and the V-135-ROLLBACKORDER slot; also the self-deploying re-enrollment fact recipe 01's retrofit restates"
  - phase: 136-recipe-4-android-dedicated-mhs
    provides: "docs/recipes/04-android-dedicated-mhs-multi-app.md — the shorter two-mechanism donor shape recipe 02's retrofit follows, and V-136-H2SKELETON's pinned eight-element H2 order"
provides:
  - "docs/recipes/05-enterprise-update-plan.md complete and committed — ten Verification checks across five platforms, nine pairwise-distinct worst-first Rollback/Recovery mechanisms opening on the true count of four, an eleven-row Configuration-Caused Failures table whose Runbook column carries intra-recipe decision anchors, and a six-entry See Also reconciled with the decision link roster"
  - "docs/recipes/01-shared-windows-avd-client.md — `## Rollback/Recovery` retrofitted in the V-135-pinned slot with five file-specific mechanisms, date pair re-stamped"
  - "docs/recipes/02-shared-ipad-full-provisioning.md — `## Rollback/Recovery` retrofitted in the same slot with two file-specific mechanisms, date pair re-stamped"
  - "The Device Recipe class uniform at 5-of-5 on `## Rollback/Recovery`, with the template carrying the section and the tracked divergence entry closed"
  - ".planning/milestones/v1.19-DEFERRED-CLEANUP.md — ROLLBACK-RECOVERY-DIVERGENCE-COUNT closed at 5-of-5, verbatim transcription byte-unchanged"
  - "Commit B (a8305b7e) — the phase's second and final content commit, exactly four files"
affects: [152-integration-registry-navigation, 153-validator-harness]

# Actuals (#2632) — estimateTokens scale (chars/4 over the realized diff), not a harness token count.
actuals:
  tokens: 6019
  tasks: 3
  commits: 1

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Auditable-arithmetic honesty section — the opening states the true count, then reconciles that count against the requirement's own enumeration by naming which mechanisms leave the set and why, so a reader can check the number rather than trust it"
    - "Open-gap entry — a mechanism whose research row carries no confidence rating ships as an explicit statement that the answer is unknown here, with an instruction not to read the silence as a finding, rather than as a sourced absence or a plausible filled-in sentence"
    - "Class-cap reconciliation by hub — where a See Also cap measured from the class cannot carry every guide the body links, the domain hub takes the slot and names the guides it indexes inline, so membership stays consistent with the link roster without exceeding the cap"
    - "Insertion-only retrofit of a shipped Approved document — one H2 inserted at a machine-pinned slot plus a two-line frontmatter re-stamp, proved by a `git diff` whose only deletions are the two date lines"

key-files:
  created:
    - .planning/phases/151-recipe-5-the-enterprise-update-plan/151-05-SUMMARY.md
  modified:
    - docs/recipes/05-enterprise-update-plan.md
    - docs/recipes/01-shared-windows-avd-client.md
    - docs/recipes/02-shared-ipad-full-provisioning.md
    - .planning/milestones/v1.19-DEFERRED-CLEANUP.md

key-decisions:
  - "The nine-versus-six arithmetic is stated in a form that actually adds up: nine mechanisms, minus the three RCP-04 does not name (DFCI, the Dell BIOS password, Linux unattended-upgrades), minus the two of the six that hold a documented but partial path (expedite's best-effort cancellation, hotpatch's restart-requiring uninstall), leaves four. D-42's own phrasing stops at 9 minus 3 = 6 and does not reach four; the extra subtraction is stated explicitly so the count is auditable rather than asserted"
  - "The Linux entry closes on an instruction not to read its silence as a finding — 'It is unwritten here because it is unknown here' — which is the difference D-43 draws between an open gap and a sourced absence, made explicit for a reader who has no access to the research row's empty Confidence cell"
  - "`## See Also` is reconciled to six entries by giving the second slot to the patch-management domain hub and naming the four non-Windows guides as inline links inside that entry, rather than spending four of six slots on them or leaving the list Windows-only. The class-measured cap of 5-6 cannot carry sixteen roster members individually"
  - "The Configuration-Caused Failures table ships eleven rows — one per Step, Steps 1 through 10, plus Plan 01's existing row — after a twelfth (a second Step 6 row) was cut so the table reads as one row per decision rather than as an uneven sample"
  - "Recipe 01's retrofit names the self-deploying deployment profile as the mechanism with no clean rollback and says so in bold, because the honesty that section exists to carry is worth nothing if the retrofit into a shipped recipe quietly omits its own worst case"
  - "No `> See:` blockquote lines were added inside any `## Rollback/Recovery` section. The first draft used them and one measured well past the 200-character C17 cap; folding the same links into the bullet prose matches what recipes 03 and 04 ship in that section and leaves the blockquote budget untouched"
  - "`last_verified: 2026-08-26` / `review_by: 2026-10-25` on both retrofitted files — a 60-day interval computed by arithmetic, per D-71's ratified FIX-10 in-milestone cadence applied to D-47's re-stamp. The template's +90 rule at line 5 is deliberately unedited (D-50) and now diverges from these two files; that is a recorded consequence of two owner rulings, not drift"

patterns-established:
  - "A Rollback/Recovery section's opening count is only defensible if the section also shows the subtraction. Stating 'four of nine' without naming which five leave the set and why produces a number a reviewer must trust; naming them produces one a reviewer can check"
  - "When an acceptance criterion counts markdown rows with a leading-pipe-plus-space grep, the separator row is invisible to it; when it counts bold pseudo-headings, per-claim `**Source:**` lines are visible to it. Both are off-by-one in opposite directions and both must be discharged with a corrected command rather than by reshaping the document"
  - "A retrofit into a shipped Approved document is proved by its deletions, not by its insertions: `git diff -U0 | grep '^-'` returning only the lines you intended to replace is the evidence that nothing was reflowed, reordered or renumbered"

requirements-completed: [RCP-01, RCP-04, RCP-05]

coverage:
  - id: D1
    description: "docs/recipes/05-enterprise-update-plan.md ships complete — ring topology, deadlines, driver and firmware approval cadence and app-update channels as one prescriptive artifact, C17-green"
    requirement: "RCP-01"
    verification:
      - kind: automated_ui
        ref: "node scripts/validation/c17-eee-contract.mjs → 236 files checked, 0 with violations, 0 total violations"
        status: pass
      - kind: automated_ui
        ref: "node scripts/validation/check-nav-hub-links.mjs → 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total"
        status: pass
    human_judgment: false
  - id: D2
    description: "`## Rollback/Recovery` reads truthfully as a catalogue of absences — nine pairwise-distinct worst-first mechanisms, the true count of four in the opening sentence, both RCP-04 flagship absences expanded, the Linux entry as an open gap, the expedite entry citing RCP-04 directly"
    requirement: "RCP-04"
    verification:
      - kind: other
        ref: "sed range greps: 9 non-Source pseudo-headings, 9 distinct, 0 vague quantifiers, 0 hits for 05-linux-update-delivery.md, 6 hits for RCP-04, 2 hits for restart"
        status: pass
    human_judgment: true
    rationale: "The greps prove the shape and the negative constraints; whether each of the nine entries is a truthful account of its mechanism is a claim only a reader who knows the mechanism can grade, and this is the section the requirement designates as the milestone's flagship honesty artifact"
  - id: D3
    description: "The recipe-template divergence resolved on the record — promoted into the template, retrofitted into recipes 01 and 02, tracked entry closed at 5-of-5, every outbound link resolving"
    requirement: "RCP-05"
    verification:
      - kind: other
        ref: "grep -c '^## Rollback/Recovery' → 1 in each of recipes 01, 02, 03, 04, 05 and in docs/_templates/recipe-template.md"
        status: pass
      - kind: automated_ui
        ref: "node scripts/validation/check-phase-129.mjs / 130 / 131 / 135 / 136 → 0 FAIL each"
        status: pass
      - kind: automated_ui
        ref: "node scripts/validation/check-phase-144.mjs → 101 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
    human_judgment: false

# Metrics
duration: 41min
completed: 2026-08-26
status: complete
---

# Phase 151 Plan 05: Finish the Artifact and Close the Divergence Summary

**The enterprise update plan ships complete at 850 lines with a `## Rollback/Recovery` section that opens on the true count of four and shows the subtraction that produces it; recipes 01 and 02 carry the retrofitted section in the machine-pinned slot, making the Device Recipe class uniform at 5-of-5; and Commit B `a8305b7e` lands exactly four files as the phase's second and final content commit with all four gates green.**

## Performance

- **Duration:** 41 min
- **Started:** 2026-08-26T14:00:00Z
- **Completed:** 2026-08-26T14:41:00Z
- **Tasks:** 3 of 3
- **Files modified:** 4 (1 created, 3 modified)

## Accomplishments

- **`## Rollback/Recovery` ships with an auditable count, not an asserted one.** The opening sentence states that four of the nine mechanisms have no rollback path at all, and the paragraph beneath it performs the subtraction: nine mechanisms, minus the three RCP-04 does not name because they carry recovery paths, minus the two of the remaining six that hold a documented but partial path, leaves four — the driver update, the Autopatch driver mode switch, Enterprise App Catalog auto-update, and Current Channel. `grep -ciE '\b(most|many|generally|largely)\b'` over the section returns 0.
- **Both RCP-04 flagship absences are expanded and correctly ordered.** The default Microsoft 365 Apps channel entry stays first with Plan 01's `[INFERENCE]`-tagged reading of the source's `Not applicable` cell intact; hotpatch sits sixth, behind the four with nothing and behind expedite, because it holds a documented uninstall path — one that requires the very device restart hotpatch exists to avoid.
- **The Linux entry ships as an open gap and the Linux guide is never cited for it.** `grep -c '05-linux-update-delivery.md'` over the section returns 0, and the entry closes by telling the reader not to read its silence as a finding.
- **The class is genuinely uniform at 5-of-5.** Recipes 01 and 02 each gained exactly one `## Rollback/Recovery` H2, inserted between `## Verification` and `## Configuration-Caused Failures`, with file-specific content: five mechanisms for recipe 01 (the self-deploying profile, the ESP policy, dynamic group membership, the app assignment, the kiosk-versus-Shared-PC configuration) and two for recipe 02 (the Shared iPad enrollment, the federated sign-in configuration). Both retrofits are insertion-only.
- **The divergence entry is closed with its verbatim transcription byte-unchanged.** `git diff HEAD~1 -- .planning/milestones/v1.19-DEFERRED-CLEANUP.md | grep -cE '^[-+]>'` returns 0; the whole change is one Status line.
- **Every gate is green after Commit B**, each run as its own invocation. The intermediate red state D-52 permitted never materialized in any of the five plans.

## Task Commits

Per the phase's D-52 two-commit contract, Tasks 1 and 2 authored without committing and Task 3 landed everything as one commit.

1. **Task 1: Complete the recipe's four tail sections** — authored, not committed (D-52)
2. **Task 2: Retrofit Rollback/Recovery into recipes 01 and 02, and re-stamp both** — authored, not committed (D-52)
3. **Task 3: Flip the divergence entry, run every gate, and land Commit B** — `a8305b7e` (docs)

**Plan metadata:** see the metadata commit that carries this SUMMARY.

## Commit B — SHA and exact file list

**SHA:** `a8305b7ef3400c92c0620ca3a1fafc419d73f912` (short `a8305b7e`)

**Message:** `docs(151): ship Recipe #5 the enterprise update plan, retrofit recipes 01-02, close the divergence (RCP-01..RCP-05)`

`git show --stat --name-only HEAD` lists exactly four files and nothing else:

```
.planning/milestones/v1.19-DEFERRED-CLEANUP.md
docs/recipes/01-shared-windows-avd-client.md
docs/recipes/02-shared-ipad-full-provisioning.md
docs/recipes/05-enterprise-update-plan.md
```

`4 files changed, 902 insertions(+), 5 deletions(-)`. The five deletions are the four frontmatter date lines re-stamped in recipes 01 and 02 plus the one Status line in the deferred-cleanup file. `git diff --diff-filter=D --name-only HEAD~1 HEAD` returns empty — no file was deleted.

`git status --porcelain docs/` returns **empty** after the commit.

**Exactly two content commits exist for the whole phase.** `git log --oneline 1a52ce54..HEAD -- docs/` returns two lines and only two:

| | SHA | Subject | Files |
|---|---|---|---|
| Commit A | `285a65d5` | widen the Device Recipe class and promote Rollback/Recovery into the template (D-04, D-47) | `docs/_standards/EEE-SOP-standard.md`, `docs/_templates/recipe-template.md` |
| Commit B | `a8305b7e` | ship Recipe #5, retrofit recipes 01-02, close the divergence | the four files above |

The four commits sitting between them (`720363b0`, `3ee55b44`, `57f6d88d`, `8e5df261`) are the Plan 01-04 metadata commits and touch `.planning/` only.

## Gate verdicts after Commit B — recorded verbatim (D-78)

Each was run as its own invocation from `D:/claude/Autopilot`, after the commit.

| Gate | Command | Verdict (verbatim) |
|---|---|---|
| C17 EEE contract | `node scripts/validation/c17-eee-contract.mjs` | `C17 summary: 236 files checked, 0 with violations, 0 total violations` |
| Link + anchor checker | `node scripts/validation/check-nav-hub-links.mjs` | `check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` |
| Apex chain | `node scripts/validation/check-phase-144.mjs` | `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)` — exit 0 |
| Current-milestone harness | `node scripts/validation/v1.20-milestone-audit.mjs` | `Summary: 16 passed, 0 failed, 0 skipped` — exit 0 |

C17's per-assertion line is `#1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0`. The corpus moved from 235 enrolled files to **236** exactly as D-79 predicted.

Leaf pin validators, also run individually after the commit:

| Validator | Verdict |
|---|---|
| `check-phase-129.mjs` (template pins) | `Result: 3 PASS, 0 FAIL, 0 SKIPPED` |
| `check-phase-130.mjs` (recipe 01 needles) | `Result: 5 PASS, 0 FAIL, 0 SKIPPED` |
| `check-phase-131.mjs` (recipe 02 needles) | `Result: 5 PASS, 0 FAIL, 0 SKIPPED` |
| `check-phase-135.mjs` (recipe 03 + V-135-RECIPE01ZEROEDIT) | `Result: 7 PASS, 0 FAIL, 0 SKIPPED` |
| `check-phase-136.mjs` (recipe 04) | `Result: 11 PASS, 0 FAIL, 0 SKIPPED` |

**There was no accepted-red disposition in this phase and none was needed.**

## RCP-05 uniformity — the three independently-checkable facts

| Fact | Check | Result |
|---|---|---|
| The template carries the section (Plan 01) | `grep -c '^## Rollback/Recovery' docs/_templates/recipe-template.md` | `1` (at line 131) |
| Every recipe carries it | same grep, per file, recipes 01 through 05 | `1 · 1 · 1 · 1 · 1` |
| The tracked entry is closed | `sed` range over `ROLLBACK-RECOVERY-DIVERGENCE-COUNT` | `5-of-5` present once, `OPEN` absent |

`grep -c '^## Rollback/Recovery'` returns exactly 1 in each of recipes 01, 02, 03, 04 and 05 — the class is uniform and the retrofit is idempotent. `grep -c '^## '` on recipes 03 and 04 is unchanged at **8**, and `wc -l` on them still reports **328** and **301** with `git status --porcelain` empty for both.

## The D-56 residue verification

D-56 requires a successor tracking entry for anything the promotion leaves unresolved. **With D-47's retrofit executed, the promotion leaves no RCP-05 residue**, and that was verified rather than assumed: all five recipes plus the template carry the section, so the 2-of-5 mandated-section gap D-47 exists to prevent does not exist. **No empty tracking entry was opened for it.**

`RECIPE-OUTBOUND-LINK-COVERAGE` in `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` is left **carried and unedited** (D-81). `git diff HEAD~1 --stat -- .planning/milestones/v1.20-DEFERRED-CLEANUP.md` returns empty output. Its trigger is conjunctive and the second conjunct — the coverage gap becoming an operational cost — is unmet; the entry names a future tooling milestone as its home.

D-56 **was** applied to a different residue: see the line-budget section below.

## The final line count against D-33's budget

**850 lines**, against D-33's stated budget of **600 to 700**. The budget is **exceeded by 150 lines**, and that is recorded here rather than met by trimming.

- **The overrun was inherited, not created here.** Plan 04 handed the file over at **765 lines** with four tail sections unwritten, already 65 over the ceiling, and projected 825-865 for the finished artifact. The realized 850 sits inside that projection. This plan added 108 lines: the nine remaining Verification checks, eight more Rollback mechanisms with the opening arithmetic, ten more Failures rows and three more See Also entries.
- **The driver is an owner ruling.** D-32 put the full Intune click-path into every Step because the operations guides carry blade locations rather than numbered procedures, and Plan 03 recorded click-path length as the single largest contributor. D-33's 600-700 figure was set before that ruling's cost was known.
- **No gate binds it.** `EXPECTED_LINE_COUNT` pins live at `check-phase-135.mjs:49` and `check-phase-136.mjs:44` and bind recipes **03 and 04 only**. The apex reports 101 PASS / 0 FAIL at 850 lines.
- **Nothing mandated was cut to chase the number.** The one thing cut was a duplicate second Step 6 row in the Failures table, removed for table shape rather than for length.

**A successor tracking entry has been filed per D-56** in `.planning/WINDOWS.md` (ledger entry 7, kind `deviation`, phase 151), naming the decision owed: adjudicate whether D-33's budget or the artifact's scope is the thing that is wrong, before the next recipe is planned. Filing it rather than reporting-and-forgetting is the difference D-56 exists to enforce.

## The two open items Wave 4 handed forward — both closed

### 1. `## See Also` reconciled with the body

Wave 4 left the list at three entries, all Windows guides, after D-63 had put `02-macos-update-enforcement.md`, `03-ios-update-lifecycle.md` and `04-android-patch-delivery.md` into the recipe's link roster — a five-platform plan whose See Also named only Windows.

**What was added:** three entries, taking the list to **six**, the top of the class-measured 5-6 range.

| # | Entry | Why |
|---|---|---|
| 1 | `../_standards/EEE-SOP-standard.md` (unchanged) | class convention, first in all four shipped recipes |
| 2 | **new** — `../operations/patch-management/00-overview.md` | the domain hub, carrying the deferral-versus-enforcement-versus-attestation taxonomy behind Step 7 **and naming as inline links all four non-Windows guides** — macOS, iOS, Android and Linux. This is the reconciliation |
| 3 | `../operations/patch-management/01-windows-wufb-rings.md` (unchanged) | ring topology, containment, hotpatch, driver policy |
| 4 | `../operations/patch-management/07-windows-autopatch.md` (unchanged) | the service, its prerequisites, the Test and Last model |
| 5 | **new** — `../operations/patch-management/08-windows-app-updates.md` | the six Microsoft 365 Apps channels with their rollback windows (Step 5) and Enterprise App Management's gates (Step 6) |
| 6 | **new** — `../operations/firmware-bios/00-overview.md` | the custody routing behind Step 4, the plan's `Effectively irreversible` decision |

The recipe's body links sixteen distinct roster members; a six-entry cap cannot name them individually. Giving slot 2 to the hub and naming the four non-Windows guides inside it is what makes the list consistent with the roster rather than a second, different set. `grep -c 'app-lifecycle'` over the section returns **0** — the past-due app-lifecycle overview stays excluded (D-02), and it was neither re-stamped nor added.

### 2. D-33's line budget — recorded, not silently ignored

Closed as set out in the section above: the final number is stated, the overrun is quantified at 150 lines, the inheritance is shown, and a successor tracking entry is filed.

## Measured longest blockquote run in each edited recipe

C17 assertion 12 caps a contiguous top-level blockquote run at 200 characters.

| File | Longest run | Headroom | Change |
|---|---|---|---|
| `docs/recipes/05-enterprise-update-plan.md` | **183** | 17 | unchanged — this plan added no blockquote to the recipe |
| `docs/recipes/01-shared-windows-avd-client.md` | **183** | 17 | unchanged — the retrofit added no blockquote |
| `docs/recipes/02-shared-ipad-full-provisioning.md` | **162** | 38 | unchanged — the retrofit added no blockquote |

The recipe's high-water mark of 183 is the same value Plan 03 established and Plan 04 preserved. It is unchanged because the first draft of the Rollback entries used `> See:` blockquote lines in the class idiom, one of which measured well past 200 once its two DFCI links were counted; they were converted to inline links inside the bullet prose before any gate ran. Recipes 03 and 04 carry no blockquotes in their own `## Rollback/Recovery` sections either, so the conversion moved toward the class shape rather than away from it.

## The date pair used for the two retrofits, and its rationale

**`last_verified: 2026-08-26`** (the execution date) and **`review_by: 2026-10-25`**, computed by arithmetic: 26 August plus 60 days is 25 October. Both files previously carried `2026-07-17` / `2026-10-15`.

Verified: `(new Date(review_by) - new Date(last_verified)) / 86400000` returns **60** for both files.

**Why 60 days, stated explicitly so a reviewer does not read it as drift.** D-47 requires the re-stamp but does not name an interval. D-71 is the owner ruling that fixes the interval for this milestone at `last_verified` + 60 days, on FIX-10's ratified in-milestone cadence, which all fourteen guides authored in Phases 146 through 150 follow exactly and which the new recipe itself carries. Combining the two is a plan-time discretionary reading, and it is recorded as one.

**The recorded consequence.** The recipe template's own `review_by` rule at line 5 is `+90` days, and D-50 deliberately left the template unedited beyond the promoted section. The two retrofitted files therefore now diverge from the template's stated interval. That divergence is a consequence of two owner rulings interacting (D-50 keeps the template's rule; D-71 fixes the milestone's cadence), not a defect and not drift. It is recorded here so a successor reading the template and the files together finds the reason rather than a contradiction.

## The recorded decline of research item X-9 (D-39, D-40)

Research item X-9 prioritised a "no-rollback summary table" for this section. **This plan declines it** and ships prose with one bold pseudo-heading per mechanism instead, matching what recipes 03 and 04 ship in this same section.

**The decline stands on house precedent alone.** D-40 records what a successor would otherwise get wrong: **STD-05 D-04 rule 2 does not bind this section** — it scopes *branch bodies* — so a table would in fact have been permitted here. No constraint drove D-39. The draft's stated reason (that a table "flattens you-cannot into a cell") was an unevidenced aesthetic claim contradicted by its own source, which is itself a three-column table. Anyone revisiting this choice should know the door was open and the class shape, not a rule, is what kept it closed.

## Files Created/Modified

- `docs/recipes/05-enterprise-update-plan.md` — 765 → **850 lines**, 106,810 characters. Lines 743-850 replaced the four stub tail sections with: ten `- [ ]` Verification checks (nine decision points plus Step 10, spanning Windows, macOS, iOS, Android and Linux), a `## Rollback/Recovery` section of three framing paragraphs plus nine mechanism entries, an eleven-row `## Configuration-Caused Failures` table, and a six-entry `## See Also`. Committed in `a8305b7e`.
- `docs/recipes/01-shared-windows-avd-client.md` — 242 → **273 lines**. `+33 / −2`: a 31-line `## Rollback/Recovery` section inserted at line 225, between `## Verification` (206) and `## Configuration-Caused Failures` (now 256), plus the two re-stamped frontmatter date lines. Committed in `a8305b7e`.
- `docs/recipes/02-shared-ipad-full-provisioning.md` — 289 → **305 lines**. `+18 / −2`: a 16-line `## Rollback/Recovery` section inserted at line 273, between `## Verification` (262) and `## Configuration-Caused Failures` (now 289), plus the two date lines. Committed in `a8305b7e`.
- `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` — `+1 / −1`, the `**Status:**` line of `ROLLBACK-RECOVERY-DIVERGENCE-COUNT` only. Committed in `a8305b7e`.
- `.planning/WINDOWS.md` — ledger entries 5 and 6 (the Plan 01-04 partial-artifact stubs) marked `fixed`; entry 7 filed for the D-33 line-budget residue; entry 8 filed for the recurring acceptance-criteria arithmetic.

## The link audit (D-80) — every outbound link, not just the decision roster

The recipe makes **51 distinct outbound relative links**, counting See Also entries, per-branch links and Verification links, not only the decision roster. All 51 resolve: `check-nav-hub-links.mjs` reports `0 corpus-link failure(s)`.

Every fragment target was additionally checked against the verified anchor roster in `151-01-PLAN.md` by grepping the target file for a literal `<a id="…">`. **One target resolves by heading slug rather than by an anchor id:** `../operations/patch-management/00-overview.md#deferral-vs-enforcement`, which resolves against the `## Deferral vs Enforcement` heading at line 112 of that file. This is Plan 04's recorded correction — the three-primitive taxonomy lives in that H2, not behind the roster's `#ring-terminology` anchor — and it is legitimate under verified gate fact 10, which establishes that the checker resolves heading slugs as well as `<a id>` tags. Every other fragment target is a literal `<a id>` on the roster.

Intra-recipe fragments: ten resolve to the recipe's own hand-authored `<a id>` anchors (`decision-…` × 9 plus `deferrals-and-deadlines`), and ten resolve to heading slugs (`#prerequisites`, `#rollbackrecovery`, and the eight branch-body headings). All twenty resolve.

## Structural contract checks on the finished recipe

| Contract | Command | Result |
|---|---|---|
| Eight-H2 skeleton, in order | `grep -c '^## '` | `8` — Summary, Prerequisites, Unsupported and Anti-Feature Callouts, Steps, Verification, Rollback/Recovery, Configuration-Caused Failures, See Also |
| Ten hand-authored anchors | `grep -c '<a id='` | `10` |
| Nine platform markers | `grep -c '^\*\*Applies to:\*\*'` | `9` |
| Nine reversibility ratings | `grep -c '\*\*Reversibility:\*\*'` | `9` |
| Six Windows-only decisions | `grep -c '^\*\*Applies to:\*\* Windows-only'` | `6` |
| One Destructive, one Effectively irreversible | anchored end-of-line greps | `1` and `1` |
| Ten Ask-the-admin prompts | `grep -c '> \*\*Ask the admin:\*\*'` | `10` |
| Ten breaks-callouts | `grep -c '> \*\*What breaks if misconfigured:\*\*'` | `10` |
| Eighteen Step headings | `grep -c '^### Step '` | `18` |
| No code fence | `grep -c '```'` | `0` |
| Ten Verification checks | `grep -c '^- \[ \]'` in range | `10` |
| Five platforms in Verification | per-platform greps in range | macOS 2 · iOS 2 · Android 2 · Linux 3 · Windows 3 |
| Nine distinct rollback mechanisms | pseudo-heading grep in range, Source lines excluded | `9` raw, `9` after `sort -u` |
| No vague quantifier in Rollback | `grep -ciE '\b(most\|many\|generally\|largely)\b'` in range | `0` |
| Linux guide not cited for a rollback claim | `grep -c '05-linux-update-delivery.md'` in range | `0` |
| Expedite entry cites the requirement | `grep -c 'RCP-04'` in range | `6` |
| Hotpatch restart path stated | `grep -ci 'restart'` in range | `2` |
| Failures table shape | `grep -c '^| '` in range | `11` (header + 11 data rows; the separator row does not match) |
| Every data-row Runbook cell is an intra-recipe decision anchor | `grep -cE '\(#(decision-\|deferrals-and-deadlines)'` over data rows | `10` of 10 new rows, plus Plan 01's existing row |
| See Also sized to the class | `grep -c '^- \['` in range | `6` |
| App-lifecycle overview excluded | `grep -c 'app-lifecycle'` in range | `0` |

Boundary checks, all held: `git status --porcelain docs/_registry/ scripts/pipeline/ docs/index.md docs/operations/00-index.md` returns empty; `scripts/validation/check-phase-151.mjs` does not exist; `grep -c 'RE-227' docs/_registry/RE-index.md` returns `0`.

## Decisions Made

See the `key-decisions` frontmatter block. The seven recorded there are the ones a successor could otherwise mistake for drift or for arbitrariness; everything else followed the plan as written.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] The Failures-table row criterion counts a row its own grep cannot match**

- **Found during:** Task 1
- **Issue:** The acceptance criterion states that `grep -c '^| '` over the `## Configuration-Caused Failures` range should return 8 to 12 for "a header row, a separator row and 6 to 10 data rows". The separator row is `|------------------|---------|---------|` — it begins `|-`, not `| `, so the grep cannot see it. The arithmetic is off by one. This is the fifth consecutive plan in this phase to hit the same class of error.
- **Fix:** The criterion was discharged with the corrected reading — header plus data rows only — and the table was authored at eleven data rows, which returns `12` on the criterion's own command and sits inside the stated 8-12 window either way. No document shape was changed to satisfy a miscount.
- **Files modified:** none (measurement only)
- **Verification:** `grep -c '^| '` returns `11` after the twelfth row was cut for table shape; `grep -c '^|'` returns `13` (header + separator + 11 data).
- **Committed in:** `a8305b7e` (part of Commit B)

**2. [Rule 3 - Blocking] The rollback pseudo-heading criterion counts D-58 Source lines as mechanism headings**

- **Found during:** Task 1
- **Issue:** The criterion greps `^\*\*[^*]+:\*\*` over the `## Rollback/Recovery` range and expects `9` for the nine mechanism pseudo-headings. Plan 01's per-claim `**Source:**` line, required by D-58 and carrying the verbatim `Not applicable` / `Three months` / `Two months` values that D-46's inference attribution rests on, also matches that pattern. The raw grep therefore returns `10` on a correct document.
- **Fix:** The Source line was **kept** — removing it to satisfy a grep would have stripped the citation that makes the flagship entry's inference attributable. The count was proved with the corrected command, excluding `^\*\*Source:\*\*`. No new Source lines were added inside the section, matching what recipes 03 and 04 ship there.
- **Files modified:** none (measurement only)
- **Verification:** raw grep `10`; excluding Source lines, `9` raw and `9` after `sort -u`, so the nine are pairwise distinct.
- **Committed in:** `a8305b7e` (part of Commit B)

**3. [Rule 1 - Bug] A `> See:` blockquote in the Rollback section exceeded the C17 cap**

- **Found during:** Task 1
- **Issue:** The first draft of the Rollback entries followed the recipe's per-Step `> See:` blockquote idiom. The DFCI entry's version carried two full `01-windows-dfci.md` links in one line and measured well past the 200-character C17 assertion-12 cap; the driver entry's sat at roughly 178, inside the cap but above the 185 working ceiling Plan 04's hand-forward set.
- **Fix:** All four `> See:` lines were removed from the section and their links folded into the bullet prose. Recipes 03 and 04 carry no blockquotes in their own `## Rollback/Recovery` sections, so this is the class shape rather than a departure from it. The file's blockquote high-water mark stayed at 183.
- **Files modified:** `docs/recipes/05-enterprise-update-plan.md`
- **Verification:** the C17 assertion-12 measuring one-liner returns `183`; `c17-eee-contract.mjs` reports `#12=0`.
- **Committed in:** `a8305b7e` (part of Commit B)

**4. [Rule 2 - Missing critical] D-42's stated arithmetic does not reach D-41's count**

- **Found during:** Task 1
- **Issue:** D-42 requires the section to state that the three extras "are precisely the ones with documented recovery paths, which is the arithmetic that makes D-41 true". That subtraction gives nine minus three equals six, not four. Shipping it as written would have put a visibly broken sum in the first paragraph of the section RCP-04 designates as the milestone's flagship honesty artifact — the exact failure mode D-41 exists to prevent, arriving one paragraph later.
- **Fix:** The paragraph states both subtractions: the three extras leave the set because each carries a recovery path rather than an absence, and two of the remaining six — expedite and hotpatch — hold a documented but partial path, leaving four. D-43's finding is honored in the same sentence: the Linux extra is described as an open gap rather than as a documented recovery, so the paragraph does not overclaim on its behalf.
- **Files modified:** `docs/recipes/05-enterprise-update-plan.md`
- **Verification:** the paragraph names all five mechanisms that leave the set and the four that remain, and the four named match D-41's list exactly.
- **Committed in:** `a8305b7e` (part of Commit B)

**5. [Rule 3 - Blocking] The two-content-commit criterion cannot be checked with `git log -2`**

- **Found during:** Task 3
- **Issue:** The criterion states that `git log -2 --format=%s` should show exactly the phase's two content commits. Four `.planning/`-only metadata commits from Plans 01 through 04 sit between Commit A and Commit B, so `git log -2` shows Commit B and the Plan 04 metadata commit.
- **Fix:** Checked the real invariant instead — `git log --oneline 1a52ce54..HEAD -- docs/` — which path-filters to commits that actually touch the corpus. It returns exactly two: `285a65d5` and `a8305b7e`.
- **Files modified:** none (measurement only)
- **Verification:** recorded in the Commit B section above.
- **Committed in:** n/a

**6. [Rule 2 - Missing critical] The Failures table gained a duplicate Step 6 row**

- **Found during:** Task 1
- **Issue:** The first authoring pass produced twelve data rows, two of which routed to Step 6, while the plan's stated proportion was 6 to 10 rows. The table read as an uneven sample rather than as a survey.
- **Fix:** The weaker Step 6 row (an auto-update catalog application assigned Available rather than Required — already covered by the Step 6 body and by the Verification check) was cut, leaving eleven data rows, one per Step for Steps 1 through 10 plus Plan 01's original row. Nothing was cut for length.
- **Files modified:** `docs/recipes/05-enterprise-update-plan.md`
- **Verification:** every one of Steps 1 through 10 appears exactly once in the Runbook column.
- **Committed in:** `a8305b7e` (part of Commit B)

---

**Total deviations:** 6 auto-fixed (3 × Rule 3 blocking, 2 × Rule 2 missing-critical, 1 × Rule 1 bug). **Zero architectural decisions (Rule 4) were required and no checkpoint was raised.**

Deviations 1, 2 and 5 are all the same class — an acceptance criterion whose counting command does not match what it counts — and this is now the fifth consecutive plan in this phase to record one. Ledger entry 8 in `.planning/WINDOWS.md` records that a planner-side fix is owed, so the sixth recurrence lands against a tracked item rather than a fresh discovery.

## Known Stubs

**None.** The recipe carries no placeholder text, no TODO, no FIXME and no unwired section. Ledger entries 5 and 6 in `.planning/WINDOWS.md` — the partial-artifact stubs Plans 03 and 04 filed — are marked `fixed` by this plan, naming Commit B as the closure.

## Threat Flags

No file created or modified by this plan introduces a network endpoint, an auth path, a file-access pattern or a schema change at a trust boundary. All four changed files are documentation.

The threats this plan was assigned to mitigate were mitigated as specified:

- **T-151-01 (Tampering — Rollback/Recovery overstating a recovery path).** The true count of four ships in the opening sentence with its subtraction shown; vague quantifiers grep to zero; the Linux entry ships as an open gap with the Linux guide grepped out of the section; the source's `Not applicable` wording is preserved and the stronger reading stays `[INFERENCE]`-tagged; the expedite entry cites RCP-04 rather than an invented link target.
- **T-151-07 (Spoofing — a dangling or wrong outbound link).** The link checker was run by hand and reports `0 corpus-link failure(s)`; the apex was run as its own invocation after the commit; the audit covered all 51 outbound links including See Also, per-branch and Verification links, with each fragment target checked against the roster individually.
- **T-151-04 (Tampering — breaking a shipped Approved recipe, and editing the archived transcription).** Both retrofits are insertion-only, proved by a `git diff -U0` whose only deletions are the four date lines; `V-135-RECIPE01ZEROEDIT`'s two pinned heading strings each grep to `1`; recipes 03 and 04 are byte-unchanged at 328 and 301 lines; and the deferred-cleanup diff adds and removes zero blockquote lines.

## Phase 152 hand-forward

Phase 152 owns integration: every registry row, the filename-map regeneration, both canary bumps and the navigation wiring. This plan added none of it — `grep -c 'RE-227' docs/_registry/RE-index.md` returns `0` and `git status --porcelain docs/_registry/ scripts/pipeline/ docs/index.md docs/operations/00-index.md` is empty.

**1. The registry row — and the rule behind it.**

Add a row to `docs/_registry/RE-index.md` for `docs/recipes/05-enterprise-update-plan.md` at **`RE-227`**, `Status: Approved`, `doc_type: Guide`, `platform: all`, `owner: Intune Admin Lead`.

**Its Title must be copied verbatim from the recipe's H1.** The registry Title column is the sole source of the `.docx` output filename, so a paraphrased or tidied title silently renames the published file and no gate catches it. The H1, exactly as shipped:

```
Enterprise Update Plan: A Governed Update Posture for the Whole Fleet
```

`RE-226` is already in use by `docs/reference/firmware-oem-matrix.md`, whose own registry row is also deferred to Phase 152. Allocate any further ids by `max(registry, enrolled corpus) + 1`, never from the registry maximum alone — during this deferral window the registry maximum is stale and yields a collision.

**2. The filename map is regenerated, never hand-edited.**

Run `scripts/pipeline/build-filename-map.mjs`. Do not add, edit or reorder a row in its output by hand. A hand-edited map diverges from what the generator would produce and the divergence surfaces later as a byte-mismatch nobody can attribute.

**3. Both canary targets are recomputed from the registry after the rows land — never hard-coded from a document count.**

There are **two** canaries, not one: `build-filename-map.mjs` carries one and `build-publish-bundle.mjs` carries its own, and **they count different sets**. Bumping one and inferring the other from a document count is how the second canary sat red for a whole milestone. Land the registry rows first, then recompute each canary from the registry against the set that canary actually counts.

**4. Navigation is wired last.**

The ops-index entry, the `docs/index.md` entry and the quick-nav entry this recipe needs are the final edits in the phase, after the registry rows and the map regeneration. Wiring them first produces a nav-hub link to a document the registry does not yet know about.

**5. Two things this plan deliberately did not do, which Phase 152 should not read as oversights.**

- **No back-link** was added from any operations guide or from recipes 01 through 04 to this recipe (D-67). For recipes 03 and 04 this is forced by their line-count pins. Guide-level back-links are genuinely unowned by any phase — Phase 152's SC#4 names only the docs index and the operations index — and are recorded as a deferred idea rather than silently absorbed.
- **`docs/operations/app-lifecycle/00-overview.md` was neither re-stamped nor added to See Also** (D-02). Its `review_by` is `2026-06-27`, 60 days past due. Re-stamping it is not this phase's work, and the exclusion is recorded in `151-01-PLAN.md`'s anchor roster so a successor does not re-add it without first refreshing that file.

## Phase 153 hand-forward

Phase 153 authors the leaf validators for Phases 145 through 152, including `scripts/validation/check-phase-151.mjs`. This plan did not create it — `test ! -f scripts/validation/check-phase-151.mjs` succeeds.

**Needle-spec for `check-phase-151.mjs`.** Cheap, stable, non-overlapping with existing pins.

| Needle | Assertion | Why it is safe |
|---|---|---|
| `V-151-RECIPEEXISTS` | `docs/recipes/05-enterprise-update-plan.md` exists and is non-empty | the cheapest possible regression detector; matches the `check-phase-130` opening needle for recipe 01 |
| `V-151-H2SKELETON` | `grep -c '^## '` returns `8`, and the eight strings appear in this exact order: `## Summary`, `## Prerequisites`, `## Unsupported and Anti-Feature Callouts`, `## Steps`, `## Verification`, `## Rollback/Recovery`, `## Configuration-Caused Failures`, `## See Also` | the same shape `V-136-H2SKELETON` pins in recipe 04; order is what a careless later edit breaks |
| `V-151-ANCHORS` | all ten hand-authored anchor ids are present: `decision-windows-update-topology`, `decision-hotpatch-posture`, `decision-driver-approval-mode`, `decision-bios-firmware-surface`, `decision-m365-apps-channel`, `decision-app-patch-mechanism`, `decision-non-windows-enforcement`, `decision-linux-posture`, `decision-exception-placement`, `deferrals-and-deadlines` | these are the recipe's link targets; the intra-recipe and any future inbound links all resolve against them |
| `V-151-MARKERS` | `grep -c '^**Applies to:**'` returns `9`; `Reversibility:** Destructive$` returns `1`; `Reversibility:** Effectively irreversible$` returns `1` | RCP-02's two named ratings, each landing exactly once. Anchor both rating greps to end-of-line — the enum values are chosen so neither counted value is a substring of another, but the anchor costs nothing |
| `V-151-ROLLBACKCLASS` | `grep -c '^## Rollback/Recovery'` returns exactly `1` in **each** of the five recipes and in `docs/_templates/recipe-template.md` | this is RCP-05's uniformity itself. Nothing else in the corpus asserts it, so a later recipe authored without the section, or a template revert, would otherwise go unnoticed |
| `V-151-CLASSDEFINITION` | the widened Device Recipe class-definition string in `docs/_standards/EEE-SOP-standard.md` (the D-04 amendment that admits a fleet configuration plan to the class) is present verbatim | `docs/recipes/05-enterprise-update-plan.md`'s filename breaks the 4-of-4 device-end-state naming convention and is defensible **only** because of that amendment. A future style pass that narrows the definition back would silently make this recipe non-compliant; the apex should catch that rather than a reader |

**Do not propose a line-count pin on this recipe.** The artifact is expected to grow, and a line-count pin is exactly what makes recipes 03 and 04 untouchable today — a cost this phase paid in full when D-48 barred any edit to them. `grep`-based content needles cost nothing and survive growth.

**Two facts a validator author will want.** The recipe carries no code fence at all (`grep -c '```'` returns `0`), which makes it safe to grep without a fence mask. And its blockquote high-water mark is 183 characters against C17's 200-character cap, so a needle that inserts nothing is free but any future prose edit inside a blockquote run has only 17 characters of headroom.

## Next Steps

- **Phase 151 is complete.** All five plans are executed; RCP-01 through RCP-05 are satisfied; the phase's two content commits are `285a65d5` and `a8305b7e`.
- **Nothing is left uncommitted in `docs/`.**
- **Next:** `/gsd-execute-phase 152` for integration, registry and navigation, carrying the four-item hand-forward above.
- **Open successor items:** `.planning/WINDOWS.md` entry 7 (D-33's line budget versus the artifact's scope) and entry 8 (the recurring acceptance-criteria arithmetic). `RECIPE-OUTBOUND-LINK-COVERAGE` remains carried in `.planning/milestones/v1.20-DEFERRED-CLEANUP.md`, untouched.

## Self-Check: PASSED

Files claimed as created or modified, verified on disk:

- `docs/recipes/05-enterprise-update-plan.md` — FOUND (850 lines, 106,810 characters, LF-terminated, tracked)
- `docs/recipes/01-shared-windows-avd-client.md` — FOUND (273 lines)
- `docs/recipes/02-shared-ipad-full-provisioning.md` — FOUND (305 lines)
- `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` — FOUND (Status line flipped, transcription byte-unchanged)
- `.planning/phases/151-recipe-5-the-enterprise-update-plan/151-05-SUMMARY.md` — FOUND (this file)

Commit claimed, verified in git:

- `a8305b7ef3400c92c0620ca3a1fafc419d73f912` — FOUND, four files, `git status --porcelain docs/` empty afterwards
- `285a65d5` (Commit A, Plan 01) — FOUND, two files
