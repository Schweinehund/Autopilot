---
phase: 151-recipe-5-the-enterprise-update-plan
plan: 04
subsystem: docs
tags: [device-recipe, std-05, ddm-enforcement, play-integrity, linux-attestation, exception-placement, deferrals-deadlines, reversibility-marker, case-3-free-value]

# Dependency graph
requires:
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-01 — docs/recipes/05-enterprise-update-plan.md created uncommitted at the locked eight-H2 skeleton, the Case 2 block anatomy, the restatement Source form, and the closed reversibility enum defined once under ## Steps"
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-02 — the class table-separator style and the split breaks-callout idiom (prose run, blank line, See run)"
  - phase: 151-recipe-5-the-enterprise-update-plan
    provides: "151-03 — six Windows-only markers, six anchors, fourteen Step headings, the 183-character blockquote high-water mark, and the click-path discipline of routing to the nearest verified blade"
  - phase: 147-linux-update-delivery
    provides: "docs/operations/patch-management/05-linux-update-delivery.md — the no-native-Linux-update-policy finding, the three-primitive mapping, the platform-script Root/frequency pair, and the compliance/Conditional-Access ceiling"
  - phase: 146-windows-driver-firmware-update-depth
    provides: "docs/operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior — the deferral/deadline asymmetry and the first-party ranges table"
provides:
  - "docs/recipes/05-enterprise-update-plan.md Step 7 — the non-Windows enforcement primitive as a three-row Case 2 block carrying the marker value 'macOS, iOS and Android', with all three non-Windows platform guides in the link roster and the Apple deprecation consequence in the recipe's own prose"
  - "docs/recipes/05-enterprise-update-plan.md Step 8 — the Linux posture as a three-row Case 2 block stating the absent update policy, the unenforceable script branch and the access-denial-only compliance branch"
  - "docs/recipes/05-enterprise-update-plan.md Step 9 — exception placement as a two-row Case 2 block carrying the lowercase-p 'All platforms' marker and the per-platform fragmentation consequence"
  - "docs/recipes/05-enterprise-update-plan.md Step 10 — deferrals and deadlines as a tableless Case 3 free-value prompt with an anchor but no marker and no rating, every restated range en-dash faithful and the expedite restart range absent"
  - "The Steps spine complete at ten Steps, eighteen Step headings, ten anchors, nine markers and nine ratings"
affects: [151-05, 152-integration-registry-navigation, 153-validator-harness]

# Actuals (#2632) — estimateTokens scale (chars/4 over the realized diff), not a harness token count.
actuals:
  tokens: 6825
  tasks: 2
  commits: 0

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Case 3 free-value Step — a Step heading, a hand-authored anchor, an Ask-the-admin lead-in, no marker line, no reversibility rating and no table, closing with a breaks-callout like every other Step"
    - "Absence-as-an-entry — a platform with no value to choose is written down as a finding ('Linux carries no value on this Step, and that is the correct entry rather than a missing one') rather than left blank"
    - "Dash-fidelity restatement — a range quoted with a hyphen inside a verbatim first-party quotation is restated in the paraphrased en-dash form rather than lifted out of its quotation marks"

key-files:
  created: []
  modified:
    - docs/recipes/05-enterprise-update-plan.md

key-decisions:
  - "Step 7's distinction link points at 00-overview.md#deferral-vs-enforcement, not the #ring-terminology anchor the plan's action text named — the three-primitive taxonomy lives in the following H2, and #ring-terminology is used at Step 10 where the driver deferral it actually carries is restated"
  - "No range ships tagged [SOURCED, search-summary], because every range Step 10 restates verifies in the corpus at 00-overview.md or 06-windows-driver-firmware-updates.md; D-59's tag is for a range the corpus does not carry, and this Step restates none such"
  - "The two ranges the corpus writes with a hyphen inside verbatim Microsoft quotations — the 2-30 deadline and the 0-7 grace period — are restated in the paraphrased en-dash form rather than lifted out of their quotation marks, which is the second branch D-61 permits"
  - "Step 9's fragmentation consequence is grounded on the enumerated surfaces this recipe already carries (deployment ring, driver policy, Microsoft 365 Apps channel, application deployments, Apple update policy, and Linux's absent surface) rather than on a first-party citation, because no first-party page makes the claim"
  - "Two breaks-callouts were measured at 197 and 186 characters and cut before the gate run, holding the file's blockquote high-water mark at the 183 characters Plan 03 handed forward"

patterns-established:
  - "A Case 3 Step still carries an anchor, a Verification entry and outbound links even though it carries no marker and no rating — scope of the marker is not scope of the Step"
  - "A recipe Step that restates a corpus taxonomy attributes it in prose and links the section, and carries no first-party **Source:** line for the taxonomy itself; Source lines stay attached to claims a named page actually makes"

requirements-completed: [RCP-01, RCP-03]

coverage:
  - id: D1
    description: "Step 7 exists as a Case 2 block — the anchor decision-non-windows-enforcement, a single-line Ask-the-admin lead-in, the byte-exact marker line '**Applies to:** macOS, iOS and Android · **Reversibility:** Reversible', a mandatory blank line, and a three-column Option/When to choose/Recorded as table with exactly three option rows (deferral, DDM enforcement, attestation gate)"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"decision-non-windows-enforcement\"' -> 1; byte-exact marker grep -> 1; Step 7 range grep -c '^|' -> 5 (header + separator + 3 option rows)"
        status: pass
    human_judgment: false
  - id: D2
    description: "All three non-Windows platform guides are in the link roster by full relative path — 02-macos-update-enforcement.md#ddm-enforcement, 03-ios-update-lifecycle.md#ddm-update-keys and 04-android-patch-delivery.md#play-integrity-attestation (D-63)"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '02-macos-update-enforcement.md' -> 4; '03-ios-update-lifecycle.md' -> 2; '04-android-patch-delivery.md' -> 2; numeric-prefix shorthand regex -> 0"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-nav-hub-links.mjs -> 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total"
        status: pass
    human_judgment: false
  - id: D3
    description: "Step 7 states that choosing deferral on Apple's forward path picks a primitive Apple is deprecating in favor of declarative device management, without softening it or presenting the legacy primitive as a live equal"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "Step 7 range grep -ciE 'deprecat' -> 2; the literal sentence 'choosing deferral on Apple's forward path picks a primitive Apple is deprecating in favor of declarative device management (DDM)' is present in bold"
        status: pass
    human_judgment: true
    rationale: "T-151-04's mitigation is that a reader who follows no link understands the legacy primitive has a published end. A grep proves the word 'deprecating' is present; whether the surrounding paragraph avoids presenting deferral as a live equal is a semantic property only a human read establishes."
  - id: D4
    description: "Step 8 exists as a three-row Case 2 block with the byte-exact Linux-only marker, stating that there is no native Intune Linux update policy, that the shell-script branch is unenforceable from the Intune side, and that the compliance-plus-Conditional-Access branch is enforceable only by access denial"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"decision-linux-posture\"' -> 1; byte-exact marker grep -> 1; Step 8 range grep -c '^|' -> 5; Step 8 range grep -ci 'access denial' -> 2"
        status: pass
    human_judgment: true
    rationale: "T-151-04's mitigation is that the recipe claims no enforcement Intune does not have. The 'access denial' grep proves the phrase is present; whether the Step as a whole reads as attestation rather than as enforcement is a human judgement against guide 05."
  - id: D5
    description: "The five-minute run-time cap belonging to compliance discovery scripts is not attributed to the Linux platform-script surface"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '5 minutes' -> 0; grep -c 'five-minute' -> 0"
        status: pass
    human_judgment: false
  - id: D6
    description: "Step 9 exists as a two-row Case 2 block with the deliberate lowercase-p prose marker '**Applies to:** All platforms · **Reversibility:** Reversible', while the header block still carries the D1 map's uppercase 'All Platforms' render — the two surfaces have not merged"
    requirement: "RCP-03"
    verification:
      - kind: other
        ref: "lowercase-p marker grep -> 1; grep -c '^**Platform:** All Platforms' -> 1; Step 9 range grep -c '^|' -> 4 (header + separator + 2 option rows)"
        status: pass
    human_judgment: false
  - id: D7
    description: "Step 10 exists as a Case 3 free-value prompt — the anchor deferrals-and-deadlines, an Ask-the-admin lead-in, no table, no platform marker and no reversibility rating — and carries outbound links and a breaks-callout like every other Step"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -c '<a id=\"deferrals-and-deadlines\"' -> 1; Step 10-to-Verification range grep -c '^|' -> 0; Applies-to total -> 9 and Reversibility total -> 9 with none on Step 10"
        status: pass
    human_judgment: false
  - id: D8
    description: "Every numeric range Step 10 restates verifies in the corpus and preserves its dash fidelity; the expedite restart range is dropped and appears nowhere in the recipe"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "grep -ci 'expedit' -> 0; all five restated ranges (0–30 quality, 0–365 feature, 2–30 deadline, 0–7 grace, 0–30 driver) use U+2013; grep for hyphenated forms 0-30/0-365/2-30/0-7 in the recipe -> 0"
        status: pass
    human_judgment: true
    rationale: "T-151-05's mitigation is that the recipe originates no number. The greps prove dash fidelity and the expedite absence mechanically; that each restated range actually corresponds to the corpus line it was taken from is established by the side-by-side table in this SUMMARY and is a human read."
  - id: D9
    description: "The Steps spine is complete at ten Steps: eighteen Step headings, ten anchors, nine Applies-to markers, nine Reversibility ratings summing 5 + 2 + 1 + 1 with exactly one Destructive and one Effectively irreversible, ten Ask-the-admin lead-ins and ten breaks-callouts"
    requirement: "RCP-03"
    verification:
      - kind: other
        ref: "'^### Step ' -> 18; '<a id=' -> 10; '^**Applies to:**' -> 9; '**Reversibility:**' -> 9; enum 5/2/1/1; Ask -> 10; breaks -> 10; '^## ' -> 8; '```' -> 0"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-144.mjs -> 101 PASS, 0 FAIL, 0 SKIPPED; node scripts/validation/c17-eee-contract.mjs -> 236 files checked, 0 with violations"
        status: pass
    human_judgment: false
  - id: D10
    description: "No commit was made by this plan; docs/recipes/05-enterprise-update-plan.md is still untracked and no other file under docs/ was touched"
    requirement: "RCP-01"
    verification:
      - kind: other
        ref: "git status --porcelain docs/ -> '?? docs/recipes/05-enterprise-update-plan.md' only, at every measurement point; git log --oneline -1 unchanged at 57f6d88d through both tasks"
        status: pass
    human_judgment: false

# Metrics
duration: 10 min
completed: 2026-08-26
status: complete
---

# Phase 151 Plan 04: Non-Windows Enforcement, Linux Posture, Exception Placement and the Free-Value Deferrals Step Summary

**Steps 7, 8, 9 and 10 authored into the uncommitted recipe — the three non-Windows platform guides brought into the link roster with Apple's deprecation of deferral stated as a consequence rather than a footnote, the Linux posture written as attestation-by-access-denial with the absent update policy stated first, exception placement carrying the deliberate lowercase-p All-platforms marker, and a tableless Case 3 tenth Step delivering RCP-01's named deadlines deliverable with every restated range en-dash faithful and the unverifiable expedite range dropped.**

## Performance

- **Duration:** 10 min
- **Started:** 2026-08-26T14:00:33Z
- **Completed:** 2026-08-26T14:10:35Z
- **Tasks:** 2
- **Files modified:** 1 (`docs/recipes/05-enterprise-update-plan.md`, left uncommitted)

## Accomplishments

- **Step 7 — enforcement primitive per non-Windows platform** authored as a Case 2 block: the anchor `decision-non-windows-enforcement`, a single-line `> **Ask the admin:**` lead-in, the byte-exact marker line `**Applies to:** macOS, iOS and Android · **Reversibility:** Reversible`, a mandatory blank line, and a three-column `| Option | When to choose | Recorded as |` table with exactly three option rows — deferral, declarative device management enforcement, and an attestation gate.
- **The three-way distinction is restated in the recipe and linked, not re-authored.** Deferral is named as a soft delay the user can shorten and that expires by itself; enforcement as a hard requirement that the OS install by a deadline; attestation as verification of an already-patched state that gates access and installs nothing. The reader is told to pick the primitive first and the mechanism second, with the full treatment linked.
- **The Apple deprecation consequence is stated in bold, in the Step's own prose.** *Choosing deferral on Apple's forward path picks a primitive Apple is deprecating in favor of declarative device management (DDM).* The three legacy surfaces that implement it are named (`forceDelayedSoftwareUpdates`, the `com.apple.SoftwareUpdate` payload and the `ScheduleOSUpdate` command), the two-stage cutover is stated (deprecated with the Apple OS 26 releases, non-functional in all Apple OS 27.0 operating systems), and the Step says outright that this is *not a live equal of the other two options*.
- **All three non-Windows platform guides are now in the link roster** by full relative path, closing D-63: `02-macos-update-enforcement.md#ddm-enforcement`, `03-ios-update-lifecycle.md#ddm-update-keys` and `04-android-patch-delivery.md#play-integrity-attestation`. The draft's roster, path shapes and See Also list omitted all three; a five-platform plan that never links three of the five platforms' guides is exactly what SC#1 and SC#5 fail on.
- **The iOS treatment names the enforcement pair and the key that is not one.** **Target OS Version** plus **Target Date Time** is the minimum pair, **Target Build Version** an optional qualifier, and the beta-programme key sitting in the same Settings Catalog category is named as governing beta enrolment rather than updates — the correction guide 03 makes about its own earlier categorisation.
- **The Android treatment scopes the patch-age condition correctly.** The twelve-month, all-partitions patch-age requirement is stated as a condition of the strongest verdict rather than of Android 13 and later generally, so a device holding the middle verdict indefinitely without a recent patch reads as expected rather than as a defect. The Step says explicitly that none of this installs an update.
- **Four Intune click-paths for Step 7**, including one for the migration case: the macOS Settings Catalog declarative assertion end to end, the iOS/iPadOS Apple-updates policy, the Android Enterprise compliance policy paired with a Conditional Access policy (with the note that the compliance policy on its own denies nothing), and an inventory path for tenants keeping an Apple deferral through a migration window so the retirement set is a list rather than a discovery.
- **Step 8 — Linux posture** authored as a Case 2 block carrying `**Applies to:** Linux-only · **Reversibility:** Reversible` with three option rows: a shell-script `unattended-upgrades` posture, a compliance policy plus a Conditional Access gate, and explicitly out of the update plan.
- **Step 8 leads with the absence rather than burying it.** *There is no native Intune Linux update policy* — no update ring, no deferral setting, no deadline, no grace period and no enforcement primitive of any kind — and the shell-script branch is therefore stated as **unenforceable** from the Intune side, with the three concrete failure modes named (the script fails, the device is powered off, the package manager cannot take a lock) and the observation that there is no deadline to notice any of them.
- **The compliance branch is stated as enforceable only by access denial.** The Step says Linux maps onto exactly one of Step 7's three primitives and it is attestation; that the lever gates web access to Entra-protected applications through Microsoft Edge for Linux at sign-in; and that the device-level Conditional Access grant the other platforms use is **not available for Linux at all**. Recording this branch as update enforcement is named as the failure mode: **claiming enforcement you do not have**.
- **The discovery-script ceiling is stated without importing the wrong limit.** The user-context elevation ceiling is stated (a rule built on an elevated state does not return a wrong answer, it fails to evaluate) and the reader is routed to the reboot-required marker rather than an installed package version. The run-time cap that belongs to compliance discovery scripts is **not** written anywhere: `grep -c '5 minutes'` and `grep -c 'five-minute'` both return **0**.
- **Six Intune click-path steps for Step 8**, using only paths the corpus verifies: `Devices > Linux > Scripts`, `Devices > Linux > Compliance policies > Scripts > Add`, `Devices > Compliance > Policies > Create Policy`, and the Entra path `Protection > Conditional Access > Policies > New policy` — including the explicit warning not to apply *Require device to be marked as compliant* to a Linux-scoped policy, because that grant is unavailable there and applying it blocks every Linux user.
- **Step 9 — where exceptions live** authored as a Case 2 block with exactly two option rows and the deliberate lowercase-p marker `**Applies to:** All platforms · **Reversibility:** Reversible`, while the header block's `**Platform:** All Platforms` uppercase D1 render is untouched. The two surfaces remain distinct, which is edge-probe row 4's adjacency requirement.
- **The fragmentation consequence is quantified against this recipe's own surfaces.** **Update-layer exclusions fragment per platform** is stated in bold, and the surfaces an update-layer exception has to be repeated on are enumerated from what this plan already configures: the deployment ring policy, the driver update policy with its own separate assignment, the Microsoft 365 Apps channel policy, the application deployments, and the Apple update policy. The failure it produces is named as a partial exception rather than a broken one — four of five surfaces honoring it and the fifth quietly not.
- **Two already-established facts are turned against the naive fix.** A device must be assigned to only one driver update policy and the most permissive approval status wins across policies, so implementing an update-layer exception by adding a second, more restrictive policy does not work; and Linux has no update policy to exclude from at all, so an update-layer exception has no home there.
- **Step 10 — deferrals and deadlines** authored as a Case 3 free-value prompt: the anchor `deferrals-and-deadlines`, an `> **Ask the admin:**` lead-in, **no table**, **no platform marker** and **no reversibility rating**, closing with a breaks-callout like every other Step. The Step opens by saying why it has no table — it is not a decision between named options, it is the point where the plan asks for numbers — and states that what it fixes is the range and the policy object, never the value.
- **All five verified ranges restated with en-dash fidelity**: quality deferral 0–30 days, feature deferral 0–365 days, deadline 2–30 days, grace period 0–7 days, driver policy deferral 0–30 days. The deadline-calculation subtlety is carried too — the clock starts at the client's update scan discovery, not at publication.
- **The driver asymmetry is stated as one rule.** The deployment ring's quality deferral does not reach drivers; the driver policy carries its own **Make updates available after (days)** deferral counted from the day the update entered the policy rather than the day the OEM published it; that deferral covers automatic approvals only; and the deadline, grace period and user-experience settings **do** reach drivers. Compressed for the record as *the deferral does not cross, the deadline does*.
- **The Apple and Android deadline surfaces are named as dates, not day counts**, which is the shape difference a Windows-shaped record silently omits. iOS declares an explicit device-local `Target Date Time`; macOS's dates are Apple's cutover dates, so the macOS entry is a migration date; Android's is the announced 31 October 2026 fleet-compliance date behind the strongest Play Integrity verdict, restated as **announced** on Intune's own in-development page rather than as shipped.
- **Linux's empty entry is written down as a finding.** *Linux carries no value on this Step, and that is the correct entry rather than a missing one* — Step 8's finding restated as arithmetic, with the instruction to write the absence down so the next administrator reads a finding instead of an omission.
- **The expedite restart range is absent.** `grep -ci 'expedit'` returns **0** across the whole recipe.
- **Fifteen per-claim `**Source:**` evidence lines** added across the four Steps, each covering one page only, in the restatement form Plan 01 established. The recipe now carries **44** in total.

## Task Commits

**None. Both tasks committed no content, by design (D-52).**

`docs/recipes/05-enterprise-update-plan.md` remains **untracked in the working tree** for Plan 05 to complete and land as Commit B. `git log --oneline -1` reads `57f6d88d` before Task 1 and after Task 2's gate run — unchanged.

**Plan metadata:** committed separately, `.planning/` paths only, staged explicitly. Nothing under `docs/` was staged at any point.

## Files Created/Modified

- `docs/recipes/05-enterprise-update-plan.md` (modified, **UNCOMMITTED**) — 520 lines to **765 lines**, 89,849 characters. 245 added lines, all inside `## Steps`, between Step 6's `> See:` line and `## Verification`.

## Requested Records

### The `check-nav-hub-links` failure list after each task

**Empty at both measurement points.** The verdict line after Task 1 and after Task 2 is identical:

```
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
```

The plan permitted an enumerated intermediate red confined to fragments Plan 05 still creates. **None materialized**, for the fourth consecutive plan and for the same reason: no forward link to a not-yet-authored section was authored. Step 10 refers to `## Verification`, `## Rollback/Recovery` and `## See Also` not at all, and every intra-recipe link this plan added points backward at an anchor that already exists.

All intra-recipe link targets added by this plan resolve against content authored in Plans 01 through 04:

| Link added | In | Resolves against |
|---|---|---|
| `#decision-m365-apps-channel` | Step 9's update-layer click-path | Plan 03's Step 5 anchor |
| `#decision-app-patch-mechanism` | Step 9's update-layer click-path | Plan 03's Step 6 anchor |
| `#decision-non-windows-enforcement` | Step 9's click-path and Step 10's Apple click-path | this plan's Step 7 anchor |
| `#decision-linux-posture` | Step 10's Linux paragraph | this plan's Step 8 anchor |

All outbound guide links added by this plan (all full relative paths, D-65):

| Target | Used by |
|---|---|
| `../operations/patch-management/00-overview.md#deferral-vs-enforcement` | Step 7's taxonomy paragraph |
| `../operations/patch-management/00-overview.md#ring-terminology` | Step 10's Windows deferral paragraph |
| `../operations/patch-management/02-macos-update-enforcement.md#ddm-enforcement` | Step 7 prose and one Source line |
| `../operations/patch-management/02-macos-update-enforcement.md#deadlines-cutover-dates` | Step 7 Source line and See line; Step 10 Source line |
| `../operations/patch-management/03-ios-update-lifecycle.md#ddm-update-keys` | Step 7 prose and one Source line |
| `../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation` | Step 7 prose and one Source line |
| `../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates` | Step 10 Source line |
| `../operations/patch-management/05-linux-update-delivery.md#what-intune-can-and-cannot-do` | Step 8 Source line |
| `../operations/patch-management/05-linux-update-delivery.md#deferral-enforcement-attestation` | Step 8 prose and See line |
| `../operations/patch-management/05-linux-update-delivery.md#compliance-conditional-access` | Step 8 prose and one Source line |
| `../operations/patch-management/05-linux-update-delivery.md#bash-platform-script-delivery` | Step 8 Source line |
| `../operations/patch-management/05-linux-update-delivery.md#configuring-unattended-upgrades` | Step 8 Source line |
| `../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior` | Step 9 Source line; Step 10 Source lines and See line |
| `../operations/patch-management/01-windows-wufb-rings.md#wufb-deployment-rings` | Step 9 See line |

`grep -c '05-linux-update-delivery.md'` returns **7** and `grep -cE '\]\(\.\./operations/patch-management/05-linux-update-delivery\.md'` returns **7** — every Linux link carries the full relative path, so no link in this web can resolve to the other `05-` document. `grep -cE '\]\((0[0-9]|[0-9])#'` returns **0** across the whole recipe.

### Dash fidelity — source line beside recipe line

Every range Step 10 restates, with the corpus line it came from. The character between the two numbers in every recipe line is **U+2013 (en-dash)**.

| Range | Corpus source line | Recipe line |
|---|---|---|
| Quality-update deferral | `00-overview.md:120-121` — *"Windows Update client policy deferral periods (0–30 days quality; 0–365 days feature)"* (en-dash) | `:682` — *"quality updates defer 0–30 days"* (en-dash) |
| Feature-update deferral | `00-overview.md:120-121`, same line (en-dash) | `:682` — *"feature updates defer 0–365 days"* (en-dash) |
| Deadline for quality and feature updates | `06-windows-driver-firmware-updates.md:373-374` — inside a verbatim Microsoft quotation: *"Specifies the number of days a user has before quality updates are installed on their devices automatically (2-30)."* (**hyphen**, inside quotation marks) | `:683` — *"its first-party range is 2–30 days"* (**en-dash**, restated as a paraphrase outside quotation marks) |
| Grace period | `06-windows-driver-firmware-updates.md:375` — inside a verbatim Microsoft quotation: *"Specifies a minimum number of days after deadline until restarts occur automatically (0-7)."* (**hyphen**, inside quotation marks) | `:684` — *"the grace period ... runs 0–7 days"* (**en-dash**, restated as a paraphrase outside quotation marks) |
| Driver policy deferral | `00-overview.md:92` — *"the driver policy has its own 0–30 day deferral instead"* (en-dash) | `:695` — *"supporting 0–30 days"* (en-dash). Also already present at `:220` from Plan 02, likewise en-dash |
| Expedite restart | **absent from the corpus** — `expedit` occurs twice in `docs/`, neither about restart grace | **not written**; `grep -ci 'expedit'` on the recipe returns `0` |

The two hyphenated sources are the exact case D-61 warns about: both sit inside verbatim Microsoft quotations in guide 06, and lifting `(2-30)` or `(0-7)` out of its quotation marks would have stripped the marking that distinguishes a quotation from a paraphrase. D-61 permits either keeping the quotation marks or restating in the paraphrased en-dash form; the second branch was taken, so all five ranges read uniformly and none is presented as a quotation it is not. A negative grep confirms no hyphenated form of any of the five appears anywhere in the recipe.

### Longest contiguous top-level blockquote run

Measured with the plan's own node one-liner, over the whole file, at every point.

| Point | Longest run | Which |
|---|---|---|
| Plan 03 handoff (baseline) | 183 | Step 5's `> See:` line |
| After Task 1 | 183 | Step 5's `> See:` line (unchanged) |
| Task 2, first draft | **197** | Step 10's breaks-callout |
| Task 2, second-longest first draft | **186** | Step 9's breaks-callout |
| After Task 2 trims (final) | **183** | Step 5's `> See:` line |

Step 10's breaks-callout measured **197** on first authoring — three characters of headroom against the 200-character C17 cap, which is the margin at which any later single-word edit anywhere in the run becomes a gate failure. Step 9's measured 186. Both were cut before the gate run, following the discipline Plan 03 established at its Step 4 and the explicit hand-forward instruction to cut anything above 185 rather than accept it. **The file's high-water mark is unchanged from the Plan 03 handoff at 183, so headroom for Plan 05 remains 17 characters.** The six longest runs after the trims are 183, 182, 182, 182, 179 and 178.

### Final Step-heading, anchor, marker and lead-in counts

| Point | `^### Step ` | `<a id=` | `^**Applies to:**` | `**Reversibility:**` | `Ask the admin` | `What breaks` | `^## ` |
|---|---|---|---|---|---|---|---|
| Plan 03 handoff | 14 | 6 | 6 | 6 | 6 | 6 | 8 |
| After Task 1 | 16 | 8 | 8 | 8 | 8 | 8 | 8 |
| After Task 2 | **18** | **10** | **9** | **9** | **10** | **10** | **8** |
| Contract on the finished recipe | 18 | 10 | 9 | 9 | 10 | 10 | 8 |

**Every phase-level count now stands at its contracted final value.** `grep -c '^**Applies to:** Windows-only'` remains **6** — Plan 03's count was not disturbed. `grep -c '```'` returns **0**. All four C11 anti-pattern literals return **0**.

### Full reversibility-rating tally (the explicit carry-forward)

Plan 03 flipped RCP-02's requirement flag to Complete on plan-declaration grounds while only six of the contracted nine ratings existed, and asked that the total be re-counted once the Steps spine closed. **It is now countable for the first time, and it is correct.**

| Enum value | Count | Steps carrying it |
|---|---|---|
| `Reversible` | **5** | 2 (hotpatch), 6 (application patch mechanism), 7 (non-Windows enforcement), 8 (Linux posture), 9 (exception placement) |
| `Reversible — disruptive` | **2** | 1 (Windows update topology), 5 (Microsoft 365 Apps channel) |
| `Destructive` | **1** | 3 (driver approval mode) |
| `Effectively irreversible` | **1** | 4 (BIOS and firmware surface) |
| **Total** | **9** | one per decision point; Step 10 carries none |

5 + 2 + 1 + 1 = **9**, matching `grep -c '**Reversibility:**'` = 9 and `grep -c '^**Applies to:**'` = 9 exactly. Every counting grep is anchored to end-of-line, so `Reversible` does not absorb `Reversible — disruptive`. Both RCP-02 named ratings land exactly once. **No contracted rating is missing, none is duplicated, and the per-Step assignment matches the Steps table in `151-01-PLAN.md` row for row** — verified by reading the nine marker lines in document order (lines 76, 127, 193, 263, 359, 432, 500, 571, 634) against that table. **The already-flipped RCP-02 flag now stands on a measured total rather than on a plan declaration.**

### Current file line count against D-33's budget

**765 lines**, against D-33's stated 600-700 line budget. **This is over budget and is reported rather than accepted silently.** Two facts about it:

1. **The overrun was inherited, not created here.** The recipe stood at **520 lines with 6 of 10 Steps authored** and four sections still near-empty. Six Steps consumed 439 lines of `## Steps`, an average of 73 lines per Step; this plan's four Steps consumed 245, an average of **61** — leaner than the Windows Steps, not fatter. At the Plan 03 handoff rate the artifact was already tracking past 700 before this plan started. Plan 03's own projection of "roughly 130-180 lines" of remaining work understated it.
2. **No gate binds the line count on this file.** `EXPECTED_LINE_COUNT` pins exist in `check-phase-135.mjs` and `check-phase-136.mjs` and bind recipes **03 and 04 only**. D-33 is a planning budget, and D-32's owner ruling explicitly accepted click-path length as the largest driver of it. The apex chain reports 101 PASS / 0 FAIL at 765 lines.

**Projection for Plan 05:** `## Verification` owes 9 more entries, `## Rollback/Recovery` 8 more mechanisms, `## Configuration-Caused Failures` further rows and `## See Also` two to three more entries — call it 60 to 100 lines, landing the finished artifact around **825 to 865 lines**, roughly 125 to 165 over D-33. Plan 05 should record the final number against the budget rather than trimming mandated content to meet an estimate that was made before the click-path ruling's cost was known.

### Confirmation that no commit was made

- `git log --oneline -1` returned `57f6d88d docs(151-03): complete BIOS surface, M365 Apps channel and app patch mechanism plan` before Task 1 and after Task 2's gate run.
- `git status --porcelain docs/` returns exactly one line at every point: `?? docs/recipes/05-enterprise-update-plan.md`.
- No `git add`, `git commit`, `git stash`, `git clean`, `git reset` or `git checkout` was run against any path under `docs/` at any point in this plan. No wildcard staging was used anywhere.
- No file under `docs/operations/` or `docs/reference/` was opened for writing; all six guides consulted were read-only.
- The only commit this plan makes is the `.planning/`-only metadata commit that carries this SUMMARY.

## Gate Verdicts (verbatim)

Each gate was run as its own invocation from `D:/claude/Autopilot`.

| Gate | After Task 1 | After Task 2 (final) |
|---|---|---|
| `node scripts/validation/check-phase-144.mjs` | not re-run (no committed change) | `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)` |
| `node scripts/validation/c17-eee-contract.mjs` | `C17 summary: 236 files checked, 0 with violations, 0 total violations` | `C17 summary: 236 files checked, 0 with violations, 0 total violations` |
| `node scripts/validation/v1.20-milestone-audit.mjs` | `Summary: 16 passed, 0 failed, 0 skipped` (exit 0) | `Summary: 16 passed, 0 failed, 0 skipped` (exit 0) |
| `node scripts/validation/check-nav-hub-links.mjs` | `check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | `check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` |

All thirteen C17 assertion counters read `0` at both points: `#1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0`.

The apex chain was run separately from the other three gates (D-78) and after the final content edit, not before it.

## Decisions Made

1. **Step 7's taxonomy link points at `#deferral-vs-enforcement`, not `#ring-terminology`.** The plan's `<action>` text says to link `../operations/patch-management/00-overview.md#ring-terminology` "for the full treatment" of the deferral / enforcement / attestation distinction. `[MEASURED]` that distinction is not in the `ring-terminology` section — `00-overview.md` has a `<a id="ring-terminology">` at line 66 covering `## Ring Terminology` (lines 67-111), and the three-primitive discussion lives in the **next** H2, `## Deferral vs Enforcement` at line 112. The plan's own `<read_first>` acknowledges this, asking the executor to read "the `ring-terminology` anchored section **and** the deferral-versus-enforcement-versus-attestation discussion that follows it". Linking `#ring-terminology` would have landed a reader one section above the content the sentence promises. The heading slug `#deferral-vs-enforcement` was used instead: heading slugs resolve in the checker (verified gate fact 10), and the identical link is already shipped and passing in the corpus at `05-linux-update-delivery.md:84`. `#ring-terminology` is still used, at Step 10, where the driver deferral it genuinely carries at `:92` is restated — so `00-overview.md` appears with both anchors and each points at the content it describes. Recorded as Deviation 2.

2. **No range ships tagged `[SOURCED, search-summary]`, and the reasoning matters more than the outcome.** D-59 tags a range "whose **only** provenance is a search summary of a page that was never fully fetched". `[MEASURED]` all five ranges Step 10 restates are carried by the corpus with first-party quotations: guide 06's ranges table at `:369-376` quotes `ref-update-ring-settings` (updated 2026-04-09) for the quality deferral, feature deferral, both deadlines and the grace period, and `00-overview.md:92` and `:120-121` carry the driver and quality/feature deferrals in paraphrase. Their provenance is therefore the corpus, restated in the recipe's own `**Source:** ... as carried by ...` form, not FEATURES.md's AF-6 relay. The one AF-6 range with no corpus anchor at all — the expedite restart range — is **dropped** under D-60 rather than tagged, because a tag would still have meant originating the number. The tag was authored for exactly one case and that case did not arise; writing it decoratively on a corpus-verified range would have misdescribed the evidence in the other direction.

3. **Step 9's fragmentation consequence is grounded on this recipe's own enumerated surfaces rather than on a citation.** FEATURES row D-9 gives the consequence as "update-layer exclusions fragment per platform" and rates it `[MEASURED corpus]` — it is not a first-party claim and no Microsoft page makes it. Attaching a `**Source:**` line to it would have been the fabricated-citation shape this milestone has already been burned by. The Step instead derives it from facts the recipe has already established Step by Step: the deployment ring policy, the driver update policy with its own separate assignment, the Microsoft 365 Apps channel policy, the application deployments and the Apple update policy are five distinct objects, and Linux has none at all. The one `**Source:**` line in Step 9 sits under the claim a named page does make — the one-driver-policy-per-device rule from the driver FAQ.

4. **The two hyphenated ranges were restated as paraphrases rather than quoted.** Guide 06 carries the deadline as `(2-30)` and the grace period as `(0-7)`, both inside verbatim Microsoft quotation blocks with a hyphen. D-61 offers two safe treatments and forbids only the third — lifting a hyphenated range out of its quotation marks. Quoting them verbatim would have put two block quotations inside a Case 3 Step whose whole point is that it carries no structure; restating them in the paraphrased en-dash form makes all five ranges read uniformly and marks every one of them as paraphrase, which is what they are. The side-by-side table above makes the transformation auditable rather than invisible.

5. **Step 10 says why it has no table, in the Step.** A reader who has just worked through nine tabulated decisions will read a missing table as an omission. The Step's second sentence states that it is not a decision between named options, which is why it carries no branch table and no reversibility rating — so the structural difference reads as deliberate rather than as an authoring gap, and a future editor does not "fix" it by adding a one-row table that would tabulate nothing (D-34).

6. **Linux's empty entry is written down rather than left implicit.** The naive treatment of a five-platform deferral Step is to cover four platforms and stop. Step 10 states the absence explicitly and instructs the reader to record it, on the same reasoning Plan 03 applied to Step 4d's "none" branch: a recorded absence tells the next administrator the question was asked; a blank tells them nothing and the estate gets surveyed again.

7. **Every click-path in these four Steps uses a corpus-verified path segment.** `[MEASURED]` the paths used are `Devices > macOS > Configuration profiles > Create profile` with the Settings Catalog category chain (`02-macos-update-enforcement.md:43-48`), `Devices > Apple updates > iOS/iPadOS update policies > Create` (`03-ios-update-lifecycle.md:39`), `Devices > Compliance > Android Enterprise > Create` (`04-android-patch-delivery.md:46-47`), `Devices > Configuration profiles` (`02-macos-update-enforcement.md:126`), `Devices > Linux > Scripts` (`admin-setup-linux/04-app-delivery.md:93`), `Devices > Linux > Compliance policies > Scripts > Add` and `Devices > Compliance > Policies > Create Policy` (`admin-setup-linux/03-compliance-policy.md:94` and `:59`), the Entra path `Protection > Conditional Access > Policies > New policy` (`admin-setup-linux/05-conditional-access.md:77-84`), plus the Windows paths Plans 01 through 03 already verified. The only place a leaf blade is not verified — the exclusion control on a policy's assignment surface in Step 9 — routes to the verified spine and tells the reader in the same numbered step to confirm the current control name, continuing the discipline of Plans 01, 02 and 03.

8. **Both breaks-callouts above 185 characters were cut before the gate run.** Plan 03's hand-forward asked for exactly this and warned that the measurement is worth nothing if a marginal result is accepted. 197 and 186 were cut to 165 and 155, holding the file's high-water mark at 183 so Plan 05 inherits the same 17 characters of headroom this plan did rather than three.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Both table row-count acceptance criteria are off by one against the shipped separator style**

- **Found during:** Tasks 1 and 2 (acceptance-criteria verification)
- **Issue:** The criteria read `... | grep -c '^| '` returns `5` for Steps 7 and 8 (header, separator, three option rows) and, by the same arithmetic, would count the separator for Step 9. That arithmetic counts the separator row, but the shipped recipe-class separator `|---|---|---|` does not start with `| `. This is the identical defect Plans 02 and 03 both recorded and the executor prompt's carry-forward rule 4 predicted in advance — three plans running, now four.
- **Fix:** No content change. The class separator style was kept, matching Steps 2, 5 and 6. The property each criterion grades — one header, one separator, three (respectively two) option rows — is proved with `grep -c '^|'`, which returns exactly the criterion's stated value.
- **Files modified:** none
- **Verification:** Step 7 range `grep -c '^|'` returns **5** (`^| ` returns 4); Step 8 range returns **5** (`^| ` returns 4); Step 9 range returns **4** (`^| ` returns 3) for its two option rows. The column-shape half of each criterion passes as written: `Consequence if wrong` occurs 0 times in all three ranges, confirming the Case 2 shape.
- **Committed in:** n/a (correction of record only)

**2. [Rule 1 - Bug] The plan's Step 7 anchor names the section above the content it describes**

- **Found during:** Task 1 (reading `00-overview.md` before authoring)
- **Issue:** The plan's `<action>` instructs Step 7 to "link `../operations/patch-management/00-overview.md#ring-terminology` for the full treatment" of the deferral / enforcement / attestation distinction. `[MEASURED]` `00-overview.md` carries exactly one `<a id=`, `ring-terminology` at line 66, covering `## Ring Terminology` (67-111). The three-primitive distinction is in the following H2, `## Deferral vs Enforcement` at line 112. A reader following `#ring-terminology` from a sentence promising the distinction lands on ring topology instead.
- **Fix:** Step 7 links `../operations/patch-management/00-overview.md#deferral-vs-enforcement` — the heading slug, which resolves (verified gate fact 10) and is already a shipped, passing link elsewhere in the corpus at `05-linux-update-delivery.md:84`. `#ring-terminology` is retained at Step 10, where the driver deferral it does carry at `:92` is restated, so the plan's named anchor still ships and points at content that supports the sentence using it.
- **Files modified:** `docs/recipes/05-enterprise-update-plan.md`
- **Verification:** `grep -n '<a id=' docs/operations/patch-management/00-overview.md` returns one line, `66:<a id="ring-terminology"></a>`; `grep -n '^## ' ` on the same file shows `112:## Deferral vs Enforcement`. `node scripts/validation/check-nav-hub-links.mjs` returns 0 corpus-link failures, so both anchors resolve.
- **Committed in:** n/a (uncommitted by design, D-52)

**3. [Rule 2 - Missing Critical] Two breaks-callouts shipped above the 185-character working ceiling and were cut**

- **Found during:** Task 2 (blockquote measurement)
- **Issue:** Step 10's `> **What breaks if misconfigured:**` run measured **197** against the hard 200-character C17 cap, and Step 9's measured **186**. Both passed the gate. Shipping 197 would have made the file's high-water mark 197 and left Plan 05 — which still edits four sections of this file — with three characters of headroom.
- **Fix:** Reworded to 165 and 155 characters respectively, with no loss of content: both the admin-visible and the user-visible symptom are still named in each. The file's high-water mark stayed at Plan 03's 183.
- **Files modified:** `docs/recipes/05-enterprise-update-plan.md`
- **Verification:** The node blockquote measurer returns **183** over the whole file, at line 425 (Step 5's `> See:` line, unchanged since Plan 03). The six longest runs are 183, 182, 182, 182, 179, 178.
- **Committed in:** n/a (uncommitted by design, D-52)

### Deliberate Scope Choices (not defects)

**4. No `[SOURCED, search-summary]` tag ships.** See Decision 2. Every range Step 10 restates verifies in the corpus with a first-party quotation behind it, so the first branch of the must-have truth ("verifies in the corpus and preserves its dash fidelity") applies to all five. The one range that would have needed the tag is the expedite restart range, and D-60 drops it outright.

**5. No forward link to `## Verification`, `## Rollback/Recovery` or `## See Also` was authored.** D-52's permitted enumerated-red state consequently did not materialize for the fourth consecutive plan; the checker stays at 0/0 through this wave.

**6. Fifteen `**Source:**` lines ship** — five in Step 7, four in Step 8, one in Step 9 and five in Step 10. Each covers one page only, per D-58 as Plan 02's Decision 4 read it (a page may appear on more than one line; a line may not carry more than one page). Step 7's taxonomy paragraph and Step 9's fragmentation paragraph deliberately carry **no** `**Source:**` line, because both restate the corpus's own framing rather than a claim any named page makes — the same treatment Step 6 already uses for its version-race paragraph.

**7. The line budget is reported as exceeded rather than met by trimming.** See the line-count record above. Nothing mandated by the plan — click-paths, per-claim Source lines, the three platform-guide links — was cut to reach a number no gate enforces.

---

**Total deviations:** 3 auto-fixed (1 criterion arithmetic correction, 1 wrong-anchor correction, 1 measured margin cut) plus 4 recorded scope choices.
**Impact on plan:** None on scope. Deviation 1 is the same acceptance-criteria arithmetic error the previous two plans recorded, discharged with a corrected command. Deviation 2 corrects a link target in the plan's own action text against the file it names — a correction that strengthens the artifact rather than diverging from it, and the plan's named anchor still ships where it is accurate. Deviation 3 is a margin decision the previous plan's hand-forward explicitly asked for. Steps 7, 8, 9 and 10 are exactly what the plan specified.

## Issues Encountered

- **D-33's line budget is unreachable and was already unreachable at the Plan 03 handoff.** Reported in full above with the arithmetic. Not resolved here, because resolving it would mean cutting content three owner rulings require.
- **`00-overview.md` carries only one hand-authored anchor.** Its other six H2 sections are reachable by heading slug only. This is fine for the checker and is why `#deferral-vs-enforcement` works, but it means any future plan citing that file has to check whether the fact it wants sits inside `ring-terminology` or in one of the unanchored sections. Recorded so the next author does not repeat Deviation 2.
- **Pre-existing working-tree dirt was not swept into any commit.** `.planning/config.json`, `.planning/jira/mapping.json` and the untracked `.agents/`, `.obsidian/`, `e1`, `e2`, `ee`, `skills-lock.json`, `.planning/milestone.lock`, `.planning/research/PER-OEM-BIOS-GAP.md`, `.claude/skills/fireworks-tech-graph/`, `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` and three stray `*-PATTERNS.md` files were all present before this plan started and remain untouched. The metadata commit staged explicit `.planning/` paths only.

## Known Stubs

`docs/recipes/05-enterprise-update-plan.md` remains **intentionally incomplete** — this is the phase design, not a defect. The state after this plan:

| Stub | Location | Resolved by |
|---|---|---|
| `## Verification` carries 1 of the contracted 10 checks | line 767 onward | Plan 05 (D-37) |
| `## Rollback/Recovery` carries 1 of 9 mechanisms | after Verification | Plan 05 (D-41, D-42, D-45) |
| `## Configuration-Caused Failures` carries 1 data row | after Rollback/Recovery | Plan 05 |
| `## See Also` carries 3 of the class-measured 5-6 entries | end of file | Plan 05 (D-66) |
| The expedite rollback mechanism has no guide to link | `## Rollback/Recovery` | Plan 05 cites RCP-04 directly and states the absence of corpus coverage (D-60) |
| No registry row for `RE-227`, no filename-map row, no canary bump, no index entry | n/a | **Phase 152** (INT-01/INT-04) |

**`## Steps` is no longer a stub.** All ten Steps and all eight branch bodies exist; the spine is complete.

The file is left uncommitted precisely so this incomplete state never enters git history (D-52). One `stub` entry was appended to `.planning/WINDOWS.md` covering the four partial tail sections.

## Threat Flags

None. No file created or modified in this plan introduces a network endpoint, an auth path, a file-access pattern or a schema change. The honest threat surface is what the published recipe tells an administrator to do:

- **T-151-05** (Step 10 originating a numeric range the corpus does not carry) — mitigated. The expedite restart range is absent (`grep -ci 'expedit'` returns 0); all five restated ranges are traced to a corpus line in the audit table above; both hyphenated sources are restated as paraphrases in en-dash form rather than lifted out of their quotation marks; no range ships as a bare first-party figure with search-summary-only provenance.
- **T-151-04** (Step 8 claiming Intune-side Linux update enforcement that does not exist) — mitigated. The absent update policy is the Step's first substantive statement; the shell-script branch is stated as unenforceable; the compliance branch is stated as enforceable only by access denial and named as attestation; the discovery-script run-time cap is negative-grepped to 0 so it cannot be misattributed to the platform-script surface.
- **T-151-07** (a Linux link resolving to the wrong `05-` document) — mitigated. All seven `05-linux-update-delivery.md` mentions carry the full `../operations/patch-management/` path, and the corpus-wide negative grep for numeric-prefix shorthand returns 0.
- **T-151-04** (Step 7 presenting a primitive Apple is deprecating as a live equal) — mitigated. The deprecation consequence is in bold in the Step's own prose, the two-stage cutover is stated with both release milestones, the Step says outright that this is "not a live equal of the other two options", and all three non-Windows guides are linked so a reader reaches the full treatment.
- **T-151-SC** (package-manager installs) — accepted, not applicable. No install command was run.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Ready for 151-05.** The uncommitted recipe carries all ten Steps and all eight branch bodies. Plan 05 completes `## Verification`, `## Rollback/Recovery`, `## Configuration-Caused Failures` and `## See Also`, retrofits recipes 01 and 02, closes the deferred-cleanup entry, and lands Commit B.
- **Every phase-level Steps contract is discharged and measured**: 18 Step headings, 10 anchors, 9 markers, 9 ratings (5 / 2 / 1 / 1), 10 lead-ins, 10 closers, 8 H2s, 0 code fences, 0 C11 literals, 0 numeric-prefix links.
- **The full reversibility tally is nine and correct.** RCP-02's Complete flag, flipped by Plan 03 on plan-declaration grounds, now rests on a measured total rather than on a declaration. Nothing is missing and nothing is duplicated.
- **The commit contract is intact.** Commit A (`285a65d5`) still holds exactly two files. Commit B is Plan 05's. HEAD is unchanged by this plan's content work at `57f6d88d`.
- **All four gates are at their measured baselines.** Apex 101/0/0, C17 236/0, milestone audit exit 0, link checker 0/0.
- **Blocker for the next executor:** the per-task commit default must stay overridden. Plan 05 makes exactly one content commit, at the end, carrying five files. Any earlier commit of `docs/recipes/05-enterprise-update-plan.md` destroys the D-52 design.
- **Hand-forward for Plan 05:** blockquote headroom is **17 characters** — Step 5's `> See:` line sits at 183, unchanged since Plan 03. Measure every new run with the node one-liner and cut anything above 185.
- **Hand-forward for Plan 05:** the file is at **765 lines**, already over D-33's 600-700 budget. Record the final number against the budget in the Plan 05 SUMMARY; do not trim mandated content to meet it. No validator pins a line count on this file.
- **Hand-forward for Plan 05 (D-37):** `## Verification` now owes a check for each of Steps 2 through 10, across all five platforms — Steps 7, 8, 9 and 10 supply the non-Windows half that a Windows-only Verification section would have failed RCP-03 on. Their anchors are `decision-non-windows-enforcement`, `decision-linux-posture`, `decision-exception-placement` and `deferrals-and-deadlines`.
- **Hand-forward for Plan 05 (D-42, D-60):** `## Rollback/Recovery` owes entries reflecting this plan's Steps. Step 7's Apple deferral has no rollback in the usual sense — the primitive itself is being withdrawn, so "undoing" a DDM assertion returns a fleet to a path with a published end date. Step 8's Linux script posture has none of the seven rollback vocabulary words anywhere in guide 05 (D-44), so it ships as an open gap and that guide is not cited for it. The expedite rollback mechanism still has no guide to link and cites RCP-04 directly.
- **Hand-forward for Plan 05 (D-66):** `## See Also` currently carries 3 entries. D-63 has now put `02-macos-update-enforcement.md`, `03-ios-update-lifecycle.md` and `04-android-patch-delivery.md` into the recipe's link roster, and D-66 requires See Also membership to be reconciled with that roster — so a See Also list that names only Windows guides would now contradict the body.
- **Recorded for the next author:** `00-overview.md` carries exactly one hand-authored anchor (`ring-terminology`); its other sections resolve by heading slug only. Check which section a fact actually sits in before citing that file. See Deviation 2.

## Self-Check: PASSED

**Modified files exist on disk:**

- `docs/recipes/05-enterprise-update-plan.md` — FOUND (765 lines, 89,849 characters, LF-terminated, untracked as designed)
- `.planning/phases/151-recipe-5-the-enterprise-update-plan/151-04-SUMMARY.md` — FOUND

**Commits:**

- No content commit exists or should exist. `git log --oneline -1` = `57f6d88d`, unchanged across both tasks.
- The `.planning/`-only metadata commit carrying this SUMMARY is the sole commit made by this plan.

**All plan `<verification>` commands re-run and logged** in the Gate Verdicts table above, each as its own invocation. Every task acceptance criterion was executed; the criteria that did not return their stated values are documented as Deviations 1 and 2, each with the corrected command and the proof that the property being graded holds.

---
*Phase: 151-recipe-5-the-enterprise-update-plan*
*Completed: 2026-08-26*
