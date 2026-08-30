---
phase: 151-recipe-5-the-enterprise-update-plan
plan: 02
subsystem: docs
tags: [device-recipe, std-05, hotpatch, driver-updates, windows-autopatch, wufb-rings, reversibility-marker]

# Dependency graph
requires:
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-01 — docs/recipes/05-enterprise-update-plan.md created uncommitted at the locked eight-H2 skeleton with Decision 1 authored end to end; the block anatomy Steps 2 and 3 mirror"
  - phase: 146-windows-driver-firmware-update-depth
    provides: "docs/operations/patch-management/01-windows-wufb-rings.md#hotpatch and 06-windows-driver-firmware-updates.md — the corrected hotpatch position and the driver approval modes, workflow and deferral asymmetry"
  - phase: 147-linux-update-delivery
    provides: "docs/operations/patch-management/07-windows-autopatch.md#autopatch-hotpatch-licensing — the necessary-but-not-sufficient entitlement relationship"
provides:
  - "docs/recipes/05-enterprise-update-plan.md Step 2 — hotpatch posture, a three-row Case 2 block on the corrected enabled-by-default position with the two-level precedence rule stated explicitly"
  - "docs/recipes/05-enterprise-update-plan.md Step 3 — driver approval mode, a two-row Case 1 block carrying the recipe's single Destructive rating and its justifying consequence in the recipe's own prose"
  - "Steps 3a and 3b — two sibling H3 branch bodies with full Intune click-paths and reconvergence sentences to Step 4"
  - "The anchors decision-hotpatch-posture and decision-driver-approval-mode"
affects: [151-03, 151-04, 151-05, 152-integration-registry-navigation, 153-validator-harness]

# Actuals (#2632) — estimateTokens scale (chars/4 over the realized diff), not a harness token count.
actuals:
  tokens: 3619
  tasks: 2
  commits: 0

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Case 2 decision block — Ask-the-admin lead-in, marker line, blank line, three-column Option/When to choose/Recorded as table, no branch bodies"
    - "Restate-and-link on the sentence a rating exists to justify — the destroy-all-approvals consequence is authored in the recipe, not deferred to the guide it links"
    - "Click-path honesty marker — where the corpus records a model but not a control's leaf blade, the recipe names the verified path spine and tells the reader to confirm the blade"

key-files:
  created: []
  modified:
    - docs/recipes/05-enterprise-update-plan.md

key-decisions:
  - "Step 2 ships on the corrected hotpatch position — enabled by default for eligible devices, Arm64 supported once CHPE binary servicing is disabled, VBS required, Windows 11 Enterprise edition constraint with Windows 365 Enterprise qualifying, ineligible devices silently take the LCU"
  - "Step 3 carries the recipe's single Destructive rating and states the destroy-all-approvals consequence in its own prose, plus the stricter Intune-side rule that the approval type cannot be edited at all after policy creation"
  - "The hotpatch tenant-level click-path names Intune admin center > Tenant administration but instructs the reader to confirm the control's current blade — the corpus records the two-level model and hotpatch's prerequisites, not that control's leaf blade"
  - "The Step 2 and Step 3 table separator rows follow the shipped recipe-class style |---|, so the plan's `grep -c '^| '` row-count criteria are off by one; the underlying property is proved with `grep -c '^|'`"
  - "No commit was made — docs/recipes/05-enterprise-update-plan.md remains untracked for Plan 05's Commit B (D-52)"

patterns-established:
  - "Per-claim Source lines may cite the same first-party page twice in one Step when two separate claims rest on it; each line covers one page only"
  - "A branch body opens by fixing the mode/choice at creation time when the underlying setting is immutable afterward, so the destructive consequence is repeated where the admin acts"

requirements-completed: []

coverage:
  - id: D1
    description: "Step 2 exists as a Case 2 block — anchor decision-hotpatch-posture, single-line Ask-the-admin lead-in, the byte-exact `**Applies to:** Windows-only · **Reversibility:** Reversible` marker line, a blank line, and a three-column Option/When to choose/Recorded as table with exactly three option rows and no branch bodies"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"decision-hotpatch-posture\"' -> 1; marker-line grep anchored to EOL -> 1; '^### Step 2[ab]:' -> 0; Step 2 region grep -c '^|' -> 5; 'Consequence if wrong' in region -> 0"
        status: pass
      - kind: integration
        ref: "node scripts/validation/c17-eee-contract.mjs -> 236 files checked, 0 with violations, 0 total violations"
        status: pass
    human_judgment: false
  - id: D2
    description: "Step 2 is written on the corrected hotpatch position — enabled by default, Arm64 supported once CHPE is disabled, VBS required, Windows 11 Enterprise, silent LCU fallback — and neither falsified framing appears anywhere in the file"
    requirement: "RCP-02"
    verification:
      - kind: other
        ref: "grep -ci 'enabled by default' -> 1; grep -ci 'x64-only' -> 0; grep -ci 'opt-in' -> 0; grep -c 'CHPE' -> 2; grep -c 'VBS' -> 1"
        status: pass
    human_judgment: true
    rationale: "The greps prove the corrected literals are present and the falsified ones absent, but no automated check confirms that the eligibility paragraph, the licence divergence and the silent-LCU consequence read correctly against the two guides they synthesize. That is a human read."
  - id: D3
    description: "Step 2 states the two-level precedence rule explicitly — the tenant-wide default governs only devices that no Windows quality update policy targets — which is what makes the third branch a genuinely different choice rather than a restatement of the second"
    requirement: "RCP-02"
    verification:
      - kind: other
        ref: "Step 2 region grep -c 'quality update policy' -> 5; the paragraph beginning 'The posture is set at two levels'"
        status: pass
    human_judgment: true
    rationale: "D-27's ruling is a semantic property — that the third option is not a restatement of the second. A count of the phrase cannot establish that the precedence rule was stated correctly rather than merely mentioned."
  - id: D4
    description: "Step 3 exists as a Case 1 block — anchor decision-driver-approval-mode, the byte-exact Windows-only / Destructive marker line, and a four-column Option/When to choose/Consequence if wrong/Branch table with exactly two option rows"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"decision-driver-approval-mode\"' -> 1; 'Reversibility:** Destructive$' -> 1; 'Reversibility:** Effectively irreversible$' -> 0; Step 3 region grep -c '^|' -> 4 with 'Consequence if wrong' present"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-144.mjs -> 101 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
    human_judgment: false
  - id: D5
    description: "The Destructive rating's justifying consequence — switching approval mode destroys all existing approvals, paused drivers and declined drivers, with no recovery — is stated in the recipe's own prose and in the Consequence-if-wrong cell, not deferred to a link"
    requirement: "RCP-02"
    verification:
      - kind: other
        ref: "sed range anchor..EOF | grep -ciE 'approvals[,;].*(pause|decline)' -> 2 (the table cell and the prose paragraph)"
        status: pass
    human_judgment: true
    rationale: "T-151-03's mitigation is that a reader who follows only the link still gets the plan right. The regex proves a matching sentence exists; whether the paragraph correctly separates the Autopatch-side destructive switch from the stricter Intune-side immutability is a human read."
  - id: D6
    description: "Step 3 carries two sibling H3 branch bodies as prose step sequences, each with a full Intune click-path and a one-line routing sentence forward to Step 4, whose Branch-cell links resolve"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '^### Step 3[ab]:' -> 2; grep -c '^### Step ' -> 7; grep -c '```' -> 0"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-nav-hub-links.mjs -> 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total — no failure names #step-3a- or #step-3b-"
        status: pass
    human_judgment: false
  - id: D7
    description: "Each of Steps 2 and 3 carries exactly one What-breaks-if-misconfigured blockquote, no contiguous top-level blockquote run exceeds 200 characters, and every added link uses a full relative path with no numeric-prefix shorthand"
    requirement: "RCP-03"
    verification:
      - kind: other
        ref: "'> **Ask the admin:**' -> 3; '> **What breaks if misconfigured:**' -> 3; node blockquote measurer -> 182; grep -cE '\\]\\((0[0-9]|[0-9])#' -> 0"
        status: pass
      - kind: integration
        ref: "node scripts/validation/v1.20-milestone-audit.mjs -> exit 0, 16 passed, 0 failed"
        status: pass
    human_judgment: false
  - id: D8
    description: "No commit was made by this plan; docs/recipes/05-enterprise-update-plan.md is still untracked and no other file under docs/ was touched"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "git status --porcelain docs/ -> '?? docs/recipes/05-enterprise-update-plan.md' only; git log --oneline -1 unchanged from 720363b0 through both tasks"
        status: pass
    human_judgment: false

# Metrics
duration: 35 min
completed: 2026-08-26
status: complete
---

# Phase 151 Plan 02: Hotpatch Posture and Driver Approval Mode Summary

**Steps 2 and 3 authored into the uncommitted recipe — the hotpatch decision as a three-row Case 2 block on the corrected enabled-by-default position with its two-level precedence rule stated explicitly, and the driver approval mode as a two-row Case 1 block carrying the artifact's single `Destructive` rating with the destroy-all-approvals consequence written into the recipe's own prose and two sibling branch bodies below it.**

## Performance

- **Duration:** 35 min
- **Started:** 2026-08-26T13:02:00Z (approx)
- **Completed:** 2026-08-26T13:37:13Z
- **Tasks:** 2
- **Files modified:** 1 (`docs/recipes/05-enterprise-update-plan.md`, left uncommitted)

## Accomplishments

- **Step 2 — hotpatch posture** authored as a Case 2 block: the anchor `decision-hotpatch-posture`, a single-line `> **Ask the admin:**` lead-in, the byte-exact marker line `**Applies to:** Windows-only · **Reversibility:** Reversible`, a mandatory blank line, and a three-column `| Option | When to choose | Recorded as |` table with exactly three option rows — leave the tenant default, block at tenant level, override per cohort. No fourth column, no `Consequence if wrong`, no branch bodies.
- **Step 2 ships on all three RCP-02 corrections.** Hotpatch security updates are **enabled by default** for all eligible devices, so the decision framed is whether to leave hotpatch on. **Arm64 devices are supported** once CHPE binary servicing is disabled via the `DisableCHPE` system policy CSP or the `HotPatchRestrictions=1` registry value — a one-time change requiring a restart. What remains true is stated: **VBS** required at firmware and OS level, the **Windows 11 Enterprise** edition constraint with Windows 365 Enterprise qualifying, and the **silent LCU fallback** for ineligible devices, which does require a restart. Neither falsified framing occurs anywhere in the file.
- **The two-level precedence rule is stated explicitly** in its own paragraph: the tenant-wide default governs only devices that **no** Windows quality update policy targets, and where such a policy targets a device the policy's own setting decides and the tenant default is not consulted. The paragraph then says outright why that makes the third option a genuinely different choice rather than a restatement of the second (D-27).
- **The Autopatch entitlement is framed as necessary but not sufficient**, with the two divergent licence lists linked rather than re-authored (`#autopatch-hotpatch-licensing`).
- **Step 3 — driver approval mode** authored as a Case 1 block carrying `**Applies to:** Windows-only · **Reversibility:** Destructive` — the only occurrence of `Destructive` in a Reversibility field in the whole recipe — with a four-column table and exactly two option rows, each Branch cell linking to its sibling H3 by heading slug.
- **The `Destructive` rating's justification is in the recipe's own prose.** A dedicated paragraph states that switching between automatic and manual mode on the Autopatch side generates new policies to replace the old ones and loses all approvals, paused drivers and declined drivers previously made for those groups and deployment rings, with no recovery; and that the Intune side states the same rule in a stricter form — the approval type cannot be edited after policy creation at all. The same consequence is carried in both Consequence-if-wrong cells.
- **Steps 3a and 3b** authored as sibling H3 prose step sequences (7 numbered steps each), each with the full Intune click-path down to the driver and firmware updates blade including its alternate blade name, and each closing with a one-line routing sentence forward to Step 4.
- **The driver deferral asymmetry is stated**: the WUfB deployment ring's quality-update deferral does **not** reach drivers approved by a driver update policy, while the deadline, grace period and user-experience settings do; the policy's own `Make updates available after (days)` supports **0–30** days (U+2013, D-61) counted from the day the update entered the policy, not the day the OEM published it.
- **Seven per-claim `**Source:**` evidence lines** added, each covering one page only, in the restatement form Plan 01 established.

## Task Commits

**None. Both tasks committed no content, by design (D-52).**

`docs/recipes/05-enterprise-update-plan.md` remains **untracked in the working tree** for Plans 03 and 04 to expand and Plan 05 to land as Commit B. `git log --oneline -1` reads `720363b0` before Task 1, after Task 1, and after Task 2 — unchanged.

**Plan metadata:** committed separately, `.planning/` paths only, staged explicitly. Nothing under `docs/` was staged at any point.

## Files Created/Modified

- `docs/recipes/05-enterprise-update-plan.md` (modified, **UNCOMMITTED**) — 147 lines to 284 lines. 136 added lines / 14,475 added characters, all inside `## Steps`, between Step 1's breaks-callout and `## Verification`.

## Requested Records

### The `check-nav-hub-links` failure list

**Empty at every measurement point.** The verdict line after Task 1 and again after Task 2:

```
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
```

The plan permitted an intermediate red confined to fragments Plans 03-05 still create. None materialized, for the same reason as Plan 01: no forward link to a not-yet-authored section was authored. Both routing sentences reference **Step 4** in plain prose without a link, exactly as Plan 01 referenced Step 10. The three intra-recipe link targets added by this plan — `#step-3a-automatic-approval-configuration` and `#step-3b-manual-approval-configuration` from the two Branch cells — resolve against headings that exist in the same file.

### Longest contiguous top-level blockquote run

Measured with the plan's own node one-liner, over the whole file.

| Point | Longest run | Which |
|---|---|---|
| Plan 01 handoff (baseline) | 172 | `> **Scope:**` |
| After Task 1 | **182** | Step 2's `> See:` line |
| After Task 2 | **182** | Step 2's `> See:` line |

The cap is 200 and the shipped class maximum is 193. Step 3's `> See:` line measures 181 and its breaks-callout 148, both below Step 2's See line. Headroom at the end of this plan is **18 characters**.

### Running Step-heading count

| Point | `grep -c '^### Step '` |
|---|---|
| Plan 01 handoff | 3 (Steps 1, 1a, 1b) |
| After Task 1 | 4 (+ Step 2) |
| After Task 2 | **7** (+ Steps 3, 3a, 3b) |

The phase contract is 18 on the finished recipe. Plans 03 and 04 add the remaining 11.

### Running counts of the four Reversibility enum values

All anchored to end-of-line, as the phase-wide rules require.

| Enum value | Plan 01 handoff | After Task 1 | After Task 2 | Contract on the finished recipe |
|---|---|---|---|---|
| `Reversible` | 0 | 1 | 1 | 5 |
| `Reversible — disruptive` | 1 | 1 | 1 | 2 |
| `Destructive` | 0 | 0 | **1** | **1** |
| `Effectively irreversible` | 0 | 0 | 0 | **1** (Plan 03, Step 4) |
| Total `**Reversibility:**` lines | 1 | 2 | **3** | 9 |

`Destructive` has landed exactly once, on Step 3, and no second occurrence was introduced. `Effectively irreversible` is still at 0, confirming Step 4 has not been authored.

### Confirmation that no commit was made

- `git log --oneline -1` returned `720363b0 docs(151-01): complete amendments and Decision-1 tracer plan` before Task 1, after Task 1's gate run, and after Task 2's gate run.
- `git status --porcelain docs/` returns exactly one line at every point: `?? docs/recipes/05-enterprise-update-plan.md`.
- No `git add`, `git commit`, `git stash`, `git clean`, `git reset` or `git checkout` was run against any path under `docs/` at any point in this plan.
- The only commit this plan makes is the `.planning/`-only metadata commit that carries this SUMMARY.

## Gate Verdicts (verbatim)

Each gate was run as its own invocation from `D:/claude/Autopilot`.

| Gate | Verdict after Task 1 | Verdict after Task 2 |
|---|---|---|
| `node scripts/validation/check-phase-144.mjs` | not re-run (no committed change) | `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)` |
| `node scripts/validation/c17-eee-contract.mjs` | `236 files checked, 0 with violations, 0 total violations` | `236 files checked, 0 with violations, 0 total violations` |
| `node scripts/validation/v1.20-milestone-audit.mjs` | `16 passed, 0 failed, 0 skipped` (exit 0) | `16 passed, 0 failed, 0 skipped` (exit 0) |
| `node scripts/validation/check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` |

All thirteen C17 assertion counters read `0` at both points: `#1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0`.

## Decisions Made

1. **The tenant-level hotpatch click-path names a verified path spine and stops short of an unverified leaf blade.** `[MEASURED]` the corpus carries no blade location for the tenant-wide hotpatch default or for the Windows quality update policy: `grep -rn "quality update polic"` across `docs/operations/patch-management/` returns exactly one hit, and it describes the two-level model rather than a navigation path. The verified `Intune >` path segments in the corpus are `Devices > Windows > Update rings for Windows 10 and later`, `Devices > Windows > Driver and firmware updates`, `Tenant administration > Windows Autopatch`, `Devices > Windows Autopatch > Devices`, `Reports > Windows Updates` and `Devices > Monitor > Driver update policies with alerts`. Step 2's click-path therefore routes the tenant default to `**Intune admin center** > **Tenant administration**` and tells the reader in the same numbered step to confirm the control's current blade, saying outright that this plan fixes the decision and the two-level model rather than the admin center's blade layout. The per-cohort override routes to `**Intune admin center** > **Devices** > **Windows**` and then names the policy object, not an invented leaf blade. This is the same discipline Plan 01 applied at its Decision 3.
2. **Step 3's click-path carries both blade names the guide records.** `06-windows-driver-firmware-updates.md:73-75` states the surface as `Intune > Devices > Windows > Driver and firmware updates` **or** `Intune > Devices > Update policies for Windows 10 and later > Driver and firmware updates`, "depending on the Intune blade version at the time of access". Both branch bodies restate both, with the same hedge, rather than silently picking one.
3. **The destructive mode switch is stated with its scope intact.** The first-party quote is scoped to the Autopatch side — Autopatch-managed driver profiles, their groups and deployment rings. The Intune-side constraint is different and stricter: the approval type cannot be edited at all. Collapsing the two into one sentence would have made the recipe wrong on one side or the other, so both are stated and the practical rule ("decide the mode before you create anything") is drawn from their intersection.
4. **Two `**Source:**` lines cite the same first-party page.** `Configure hotpatch` grounds both the eligibility paragraph and the two-level precedence paragraph; `Hotpatch updates` grounds both the enabled-by-default paragraph and the absent-automatic-rollback paragraph. D-58 requires a per-claim line covering one page only — it does not require a page to appear once — and merging the claims under a single line would have put two separable claims behind one citation.
5. **The Windows 11 Pro question was not settled.** Both guides record it as unconfirmed: the hotpatch page states its prerequisite as a licence list, never as an edition list, and does not mention Windows 11 Pro at all. Step 2 therefore states the Enterprise edition constraint as RCP-02 requires and leaves Pro unmentioned rather than asserting an exclusion the corpus explicitly declines to make.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Both table row-count acceptance criteria are off by one against the shipped separator style**

- **Found during:** Task 1 (acceptance-criteria verification), recurring in Task 2
- **Issue:** The criteria read `... | grep -c '^| '` returns `5` "(one header row, one separator row, three option rows)" for Step 2, and `4` "(header, separator, two option rows)" for Step 3. That arithmetic counts the separator row, but a separator written in the shipped recipe-class style — `|---|---|---|` — does not start with `| `. `[MEASURED]` every table separator in `docs/recipes/03-windows-11-multi-app-kiosk.md` and in Step 1 of this recipe uses the `|-` form. Written that way, `grep -c '^| '` returns 4 and 3 respectively.
- **Fix:** No content change. The separator style was kept consistent with Step 1 and with the shipped recipe class rather than contorted to fit a miscounted grep. The underlying property the criterion is grading — one header, one separator, three (respectively two) option rows — is proved with `grep -c '^|'`, which returns exactly the criterion's stated `5` and `4`.
- **Files modified:** none
- **Verification:** `sed -n '/<a id="decision-hotpatch-posture"/,/^## Verification/p' … | grep -c '^|'` returns **5**; `sed -n '/<a id="decision-driver-approval-mode"/,/^### Step 3a/p' … | grep -c '^|'` returns **4**. The column-shape half of each criterion passes exactly as written: `Consequence if wrong` occurs 0 times in the Step 2 range and 1 time in the Step 3 range.
- **Committed in:** n/a (correction of record only)

**2. [Rule 1 - Bug] The Step 2 table-row criterion's `sed` range is unbounded before Step 3 exists**

- **Found during:** Task 1 (acceptance-criteria verification)
- **Issue:** The criterion ranges `/<a id="decision-hotpatch-posture"/,/^### Step 3/`. During Task 1, `### Step 3` did not yet exist, so `sed` ran the range to end of file and swept in the `## Configuration-Caused Failures` table — returning 6 rather than the intended Step 2 count.
- **Fix:** Measured the Step 2 region with the range `/<a id="decision-hotpatch-posture"/,/^## Verification/` during Task 1, which is the same region once Step 3 exists. Re-measured after Task 2 with the criterion's own range, which is then correctly bounded.
- **Files modified:** none
- **Verification:** Step 2 region rows = 4 with `^| `, 5 with `^|`, in both measurements.
- **Committed in:** n/a (correction of record only)

### Deliberate Scope Choices (not defects)

**3. No forward link to Step 4 was authored.** Both branch bodies reconverge with `Continue to Step 4, which decides the BIOS and firmware surface these driver updates arrive alongside.` — plain prose, no link, matching Plan 01's treatment of Step 10 and its stated reason. D-31 requires a reconvergence sentence, not a reconvergence link. The result is that `check-nav-hub-links` stays at 0/0 through this wave instead of entering the permitted enumerated-red state. Plan 03, which authors Step 4 and its anchor, can add the links alongside its own section at zero cost.

**4. Seven `**Source:**` lines ship, against a plan floor of "every substantive claim".** Four in Step 2 (enabled-by-default, eligibility, precedence, absent rollback), three in Step 3 and its branches (the destructive switch, the deferral asymmetry, the deferral range and workflow). Each covers one page only.

---

**Total deviations:** 2 auto-fixed (both criterion corrections, no content change) plus 2 recorded scope choices.
**Impact on plan:** None on scope. Both deviations are arithmetic errors in the acceptance criteria rather than defects in the artifact, and both are discharged with a corrected command that returns the criterion's own stated value. Steps 2 and 3 are exactly what the plan specified.

## Issues Encountered

- **Pre-existing working-tree dirt was not swept into any commit.** `.planning/config.json`, `.planning/jira/mapping.json` and the untracked `.agents/`, `.obsidian/`, `e1`, `e2`, `ee`, `skills-lock.json`, `.planning/milestone.lock`, `.planning/research/PER-OEM-BIOS-GAP.md` and three stray `*-PATTERNS.md` files were all present before this plan started and remain untouched. The metadata commit staged explicit `.planning/` paths only; no wildcard staging was used at any point.
- **The corpus does not record a blade for the hotpatch tenant default.** Resolved as Decision 1 above rather than by inventing one. This is the one place in Steps 2 and 3 where D-32's "full click-path down to the blade" could not be satisfied against a verified source, and the recipe says so to the reader instead of asserting a location.

## Known Stubs

`docs/recipes/05-enterprise-update-plan.md` remains **intentionally incomplete** — this is the phase design, not a defect. The state after this plan:

| Stub | Location | Resolved by |
|---|---|---|
| `## Steps` carries 3 of 10 Steps and 4 of 8 branch bodies | lines 71-259 | Plans 03, 04 |
| No Verification entry for Step 2 or Step 3 | `## Verification`, 1 of 10 checks | Plan 05 (D-37) |
| No Rollback/Recovery entry for the hotpatch uninstall path, the driver-update absence or the Autopatch driver mode switch | `## Rollback/Recovery`, 1 of 9 mechanisms | Plan 05 (D-41, D-42) |
| No Configuration-Caused Failures row for Step 2 or Step 3 | 1 data row | Plans 03-05 |
| `<a id=` count is 3 of the contracted 10 | n/a | Plans 03, 04 |
| `**Reversibility:**` count is 3 of the contracted 9 | n/a | Plans 03, 04 |
| No registry row for `RE-227`, no filename-map row, no canary bump, no index entry | n/a | **Phase 152** (INT-01/INT-04) |

The file is left uncommitted precisely so this incomplete state never enters git history (D-52).

## Threat Flags

None. No file created or modified in this plan introduces a network endpoint, an auth path, a file-access pattern or a schema change. The plan's own `<threat_model>` correctly identifies the honest threat surface as what the published recipe tells an administrator to do:

- **T-151-03** (switching driver approval mode destroys approvals) — mitigated. The consequence is in the recipe's own prose and in both Consequence-if-wrong cells, the rating is `Destructive`, and the greps target the sentence, not just the rating.
- **T-151-04** (hotpatch restated on a falsified framing) — mitigated. All three corrections present, both falsified framings at 0 occurrences.
- **T-151-05** (a deferral range restated without its dash marking) — mitigated. `0–30` verified as U+2013 by codepoint (`0x2013`), not by eye.
- **T-151-07** (a Branch-cell link resolving to nothing) — mitigated. Both branch headings carry a colon and no other punctuation; the link checker reports 0 corpus-link failures and names neither `#step-3a-` nor `#step-3b-`.
- **T-151-SC** (package-manager installs) — accepted, not applicable. No install command was run.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Ready for 151-03.** The uncommitted recipe now carries Steps 1, 1a, 1b, 2, 3, 3a and 3b. Plan 03 appends Step 4 (BIOS and firmware surface, four branch bodies, the `Effectively irreversible` rating), Step 5 and Step 6, and must not commit.
- **The commit contract is intact.** Commit A (`285a65d5`) still holds exactly two files. Commit B is Plan 05's. HEAD is unchanged by this plan's content work.
- **All four gates are at their measured baselines.** Apex 101/0/0, C17 236/0, milestone audit exit 0, link checker 0/0.
- **Blocker for the next executor:** the per-task commit default must stay overridden. Any executor that commits `docs/recipes/05-enterprise-update-plan.md` before Plan 05 destroys the D-52 design.
- **Hand-forward for Plan 03:** blockquote headroom is now **18 characters** against the 200-character C17 cap — Step 2's `> See:` line sits at 182. Step 4's four branch bodies will want longer `> See:` lines than any authored so far; measure each one with the node one-liner before moving on, and split the callout at a blank line as this recipe already does.
- **Hand-forward for Plan 03:** `Effectively irreversible` must land exactly once, on Step 4, anchored to end of line. It is currently at 0.

## Self-Check: PASSED

**Modified files exist on disk:**

- `docs/recipes/05-enterprise-update-plan.md` — FOUND (284 lines, 30,270 characters, LF-terminated, untracked as designed)
- `.planning/phases/151-recipe-5-the-enterprise-update-plan/151-02-SUMMARY.md` — FOUND

**Commits:**

- No content commit exists or should exist. `git log --oneline -1` = `720363b0`, unchanged across both tasks — verified before Task 1, after Task 1 and after Task 2.
- The `.planning/`-only metadata commit carrying this SUMMARY is the sole commit made by this plan.

**All plan `<verification>` commands re-run and logged** in the Gate Verdicts table above. Every task acceptance criterion was executed; the two criteria that did not return their stated values are documented as Deviations 1 and 2, each with the corrected command returning the criterion's own stated value.

---
*Phase: 151-recipe-5-the-enterprise-update-plan*
*Completed: 2026-08-26*
