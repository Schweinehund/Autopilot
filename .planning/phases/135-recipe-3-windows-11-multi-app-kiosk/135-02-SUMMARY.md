---
phase: 135-recipe-3-windows-11-multi-app-kiosk
plan: 02
subsystem: docs
tags: [documentation, device-recipe, assignedaccess, windows-kiosk, intune, oma-uri, eee-sop, c17-contract]

requires:
  - "135-01 — RE-224 file identity (slug, doc_id, status: Draft, H1, ## Summary), sentinel-stripped and C17-enrolled at 233 files"
  - "135-01 — HYG-05 corrected in EEE-SOP-standard.md before any payload fence exists (D7.7 satisfied at wave granularity)"
provides:
  - "docs/recipes/03-windows-11-multi-app-kiosk.md — RE-224, the Windows 11 multi-app kiosk recipe, third live instantiation of the Phase-129 Device Recipe doc class, delivering ROADMAP SC1-SC5 / KIOSK-01..05"
  - "The corpus's first payload-artifact fence convention inside a Device Recipe (one column-0 xml fence PLUS a field-decomposition table)"
  - "The first STD-05 Case-1 block whose second arm is a routing cross-link rather than a worked branch (D4.2 precedent for Phase 136)"
  - "HARN-16 de-risked in-phase: the payload fence is proven pandoc-convertible and guard-docx-clean on a real (non-vacuous) run"
affects: [136-recipe-4-android-dedicated, 137-registry-and-navigation-wiring, 138-milestone-close]

tech-stack:
  added: []
  patterns:
    - "Device Recipe doc class (Phase-129 D-06 skeleton) with one named KIOSK-04 divergence"
    - "STD-05 Case-1 decision block with a routing-cross-link arm"
    - "Column-0 payload fence + field-decomposition table (both surfaces, D1.1)"

key-files:
  created: []
  modified:
    - docs/recipes/03-windows-11-multi-app-kiosk.md

key-decisions:
  - "Checkpoint ratified augment-locked: ## Verification RETAINS ROADMAP SC5's clean `AssignedAccess > Operational` line verbatim and ADDS the enable precondition plus Admin-channel Event 31000 — never substitutes the Admin channel for the Operational one"
  - "D5.5 ruled in the NEGATIVE per research §3.D: the user-account-control and console-only/no-RDP requirements are NOT stated, because both self-scope to the kiosk experience while RE-224 is the restricted user experience; the recipe is silent, not reassuring"
  - "D4.2's three grounds for a Case-1 block with a routing-cross-link arm recorded so Phase 136 inherits rather than re-litigates"
  - "Intune Data type = String is the single MEDIUM-confidence item in the delivery step and is tagged as such in the shipped body"

patterns-established:
  - "A payload artifact in a Device Recipe ships on BOTH surfaces: one column-0 ```xml fence carrying the assembled document (schema-correct element order) plus a field-decomposition table carrying decision-relevant semantics in indexed body text"
  - "A column-0 fence placed immediately after a numbered click-list INSIDE the authoring step does not restart list numbering (T-2, empirically disproved premise) — placement follows the reader's sequence, not a numbering superstition"

requirements-completed: [KIOSK-01, KIOSK-02, KIOSK-03, KIOSK-04, KIOSK-05]

coverage:
  - id: SC1
    description: "Linear happy-path spine in ROADMAP order — self-deploying enrollment, kiosk account model, apps pre-installed device-context Required, AssignedAccessConfiguration XML authored, pushed via an Intune custom OMA-URI profile to ./Vendor/MSFT/AssignedAccess/Configuration, then verification. The single-app case is a ONE-LINE cross-link to recipe 01's Step 5a anchor and recipe 01 receives ZERO edits."
    requirement: "KIOSK-01"
    verification:
      - kind: other
        ref: "6 `### Step` headings in SC1 order; git status --porcelain on docs/recipes/01-shared-windows-avd-client.md empty across all three tasks; check-phase-130.mjs (which pins recipe 01's Step 5a/5b headings as literal strings against live HEAD) exits 0"
        status: pass
    human_judgment: false
  - id: SC2
    description: "Worked XML on BOTH surfaces — exactly one closed column-0 ```xml fence carrying the complete assembled payload, plus a 22-row field-decomposition table with its prose summary line, plus the exact 3-row year-labelled namespace/version-floor table asserting NO failure mode for a below-floor element."
    requirement: "KIOSK-02"
    verification:
      - kind: other
        ref: "Gate A OK — one column-0 xml fence, XSD profile_t order (AllAppsList < v5:StartPins < Taskbar), two identical braced guid_t GUIDs, packagedAppId sample casing, doubled backslashes in the JSON with single backslashes in every DesktopAppPath, applyOnce absent, and zero banned tokens (the T-8 element-spelling trap, the T-7 `default:` prefix, BreakoutSequence, TaskbarLayout, StartLayout, rs5:, ClassicAppPath)"
        status: pass
    human_judgment: false
  - id: SC3
    description: "STD-05 Case-1 account-model decision block with the four-column Option / When to choose / Consequence if wrong / Branch header and the autologon arm's Branch cell routing to a new anti-feature row; the anti-feature table covers every mandated row plus D4.3's autologon-tradeoff row and D4.5's app-provisioning-timing row."
    requirement: "KIOSK-03"
    verification:
      - kind: other
        ref: "Case-1 four-column header present with `> **Ask the admin:**` lead-in and its mandatory blank line; 12 anti-feature rows; every distinguishing token present (AADSTS50158, AADSTS50076, `Multi app kiosk`, KioskModeApp, AUMID, AssignedAccess/Status, nested); the autologon Branch cell's in-doc anchor resolves via the mirrored-slugify gate"
        status: pass
    human_judgment: false
  - id: SC4
    description: "## Rollback/Recovery exists BETWEEN ## Verification and ## Configuration-Caused Failures as a named documented divergence from recipe-template.md, bounded to first-party facts, shaped as bold pseudo-headings plus plain bullets with ZERO blockquotes."
    requirement: "KIOSK-04"
    verification:
      - kind: other
        ref: "Gate B OK — exact 8-H2 set and order proves the D-06 skeleton, the D2.4 placement, and no extra H2; the section is proven blockquote-free; `security screen` and `Clear-AssignedAccess` both negative-grep to 0; `Remove-Logoff` (hyphenated) greps to 0"
        status: pass
    human_judgment: false
  - id: SC5
    description: "Admin-executable verification retaining SC5's clean `AssignedAccess > Operational` line verbatim, ADDING the enable-the-channel-before-the-first-kiosk-sign-in precondition and the Admin-channel Event ID 31000 line; AppNotFound DELETED from ## Verification and shipping only as a named prerequisite symptom."
    requirement: "KIOSK-05"
    verification:
      - kind: other
        ref: "Gate B section-scoped assertions — `AssignedAccess > Operational` and `31000` both present inside ## Verification; AppNotFound absent from ## Verification and present elsewhere in the file; 9 `- [ ]` checklist items across the D3.2 seam; three channels (AssignedAccess/Operational, AssignedAccess/Admin, AAD/Operational) each present and distinguished"
        status: pass
    human_judgment: false
  - id: GATES
    description: "Harness green with C17 #9 and #12 LIVE (the sentinel was stripped in 135-01), plus in-phase HARN-16 de-risking."
    verification:
      - kind: other
        ref: "c17-eee-contract.mjs 233 files checked / 0 with violations, all 13 assertion counts 0, --self-test 4 passed 0 failed; check-phase-114/120/129/130 all exit 0; check-nav-hub-links 0 outbound / 0 inbound + self-test 7 passed; build-filename-map --self-test 8 passed 0 failed at 223 registry rows; pandoc 3.7.0.2 -> convert.ps1 exit 0 -> guard-docx 3 PASS / 0 FAIL / 0 SKIPPED"
        status: pass
    human_judgment: false

duration: 38min
completed: 2026-07-30
status: complete
---

# Phase 135 Plan 2: Windows 11 Multi-App Kiosk Recipe Body Summary

**Authored the complete RE-224 recipe body — a 328-line linear path from self-deploying Autopilot enrollment to a verified Windows 11 restricted user experience delivered through the AssignedAccess CSP `Configuration` node via a custom OMA-URI profile — shipping the worked payload on both surfaces with all eight anti-regression traps held, and de-risking HARN-16 in-phase on a real pandoc run.**

## Performance

- **Duration:** ~38 min
- **Tasks:** 3 auto + 1 checkpoint:decision (surfaced and ratified)
- **Files modified:** 1 (`docs/recipes/03-windows-11-multi-app-kiosk.md`, 20 lines to 328 lines)

## Accomplishments

- **SC1** — six `### Step` headings in ROADMAP order (enrollment, account model, apps, the two-scope step, XML authoring, OMA-URI delivery) with the single-app case as one cross-link to `01-shared-windows-avd-client.md#step-5a-kiosk-configuration`, framed explicitly as the single-app case. Recipe 01 received **zero** edits; `check-phase-130.mjs`, which pins its Step 5a/5b headings as literal strings against live HEAD inside every apex chain, exits 0.
- **SC2** — exactly one closed column-0 ```` ```xml ```` fence carrying research §1.A's payload verbatim, placed immediately after the numbered click-list *inside* the authoring step (D1.7 as corrected), plus the 22-row field-decomposition table with its prose summary and the exact 3-row year-labelled namespace table.
- **SC3** — the STD-05 Case-1 block with its four-column header, its `> **Ask the admin:**` lead-in and mandatory blank line, and the autologon arm's Branch cell routing to a new anti-feature row instead of a worked branch. Twelve anti-feature rows shipped (ten mandated plus the two clean bonus rows the table had budget for).
- **SC4** — `## Rollback/Recovery` between `## Verification` and `## Configuration-Caused Failures`, blockquote-free, bounded to first-party facts.
- **SC5** — the Operational line retained verbatim, the enable precondition and Event 31000 added, `AppNotFound` proven absent from the section.
- **HARN-16 de-risked** — `pandoc --version` confirmed **3.7.0.2** *first*, so `guard-docx.mjs:234-236`'s vacuous-pass path was not taken: the run reports **3 PASS, 0 FAIL, 0 SKIPPED**.

## Task Commits

1. **Task 1: Scope banner, Prerequisites, anti-feature table** — `dff66fe1` (docs)
2. **Task 2: Steps spine, Case-1 block, payload fence, decomposition + namespace tables, OMA-URI delivery** — `e91e955f` (docs)
3. **Checkpoint: D3.1 verification disposition** — no commit (decision gate; see below)
4. **Task 3: Verification, Rollback/Recovery, failures table, See Also, full gate sweep** — `dd756278` (docs)

**Plan metadata:** (this commit)

## Checkpoint: D3.1 Ratified — AUGMENT, NOT SUBSTITUTE

The plan's `checkpoint:decision` (gate `blocking`, reversibility `one-way`) was **surfaced, not silently resolved**, and resolved to **`augment-locked`** — the option CONTEXT.md D3.1 locks and the plan itself marks RECOMMENDED.

- **Auto-mode state at executor start:** `workflow._auto_chain_active = true`, `workflow.auto_advance = false`. Auto mode is active via the chain flag; the task carries `gate="blocking"`, **not** `gate="blocking-human"`, so it falls in the auto-selectable class rather than the human-only carve-out.
- **Why the locked option is also the only safe one:** `gsd-verifier.md:169` forbids a plan from subtracting a ROADMAP SC, and `130-VERIFICATION.md:18` shows the verifier enumerating SCs verbatim with `overrides_applied: 0`. ROADMAP SC5 and KIOSK-05 both name *a clean `AssignedAccess > Operational` event log*. `substitute-admin` would therefore fail SC5 **as written, in-phase**, and would be unrepairable after Phase 138's close-gate flips SC5 to Validated.
- **What shipped:** (1) SC5's `AssignedAccess > Operational` line retained verbatim; (2) the enable-the-channel-before-the-first-kiosk-sign-in precondition added, with the Event Viewer path and the right-click → **Enable Log** action, which is what makes the SC5 line executable and closes T-3's guaranteed-false-pass hazard; (3) `Microsoft-Windows-AssignedAccess/Admin` Event ID 31000 absence added as a *further* secondary line, phrased as an instruction to check the channel rather than an assertion about its default state.
- **The logged correction, reframed per D3.1(4):** ROADMAP SC5 and KIOSK-05 are **incomplete, not wrong**. The named correction is the missing enable-precondition, already appended to four research sites by Plan 135-01 (D8.2).

## Anti-Regression Traps — Disposition

| Trap | How it was held in the shipped body |
|---|---|
| **T-1** backslashes | Doubled **only** inside the `v5:StartPins` JSON string; **single** in every XML attribute including `App/@DesktopAppPath`. Both forms are in the one payload twelve lines apart, and the rule is stated explicitly as a bullet. Gate A hard-fails the inversion. |
| **T-2** fence numbering | The fence sits at column 0 immediately after the numbered click-list *inside* the authoring step. No sentence anywhere justifies anything by "a fence restarts numbering" — the premise is empirically false. |
| **T-3** Operational disabled by default | The enable step ships as the first Verification item with the one-time-events caveat. The two supporting quotes come from **different H2s** on the same page (*disabled by default* under `## Multi-app kiosk issues`; the one-time-events Tip under `## Single-app kiosk issues`) — recorded as applicable-by-placement, never implied co-located (Concern #4). |
| **T-4** `AppNotFound` | Absent from `## Verification` (Gate B asserts this section-scoped) and present only as a named prerequisite symptom, with the reason stated: it is a `Status`-node code and `Status` is not Intune-readable. |
| **T-5** shortcuts | Ships research Concern #1's **fully-sourced** rewording. The unsourced "only Ctrl+Alt+Del reaches the security screen" clause does **not** ship; `security screen` negative-greps to 0. `Remove Logoff` unhyphenated; `Remove-Logoff` greps to 0. |
| **T-6** 22H2 not categorical | Uses D5.3's exact wording ("this recipe's worked Start layout uses `v5:StartPins`, which requires 22H2 or later") plus the caution that 21H2 equivalence is undocumented. Nothing asserts 22H2 is categorical for any Windows 11 multi-app kiosk. |
| **T-7** 2017 = unprefixed root | Stated as the unprefixed root written bare on every child element, mandatory including on Windows 11. The alias cell Microsoft fills with the word `default` is named as an XSD-internal XPath prefix an instance document never writes. No `default:`-prefixed element appears anywhere. |
| **T-8** `AllAppsList` vs `AllAppList` | The payload and the decomposition table use the **element** spelling `<AllAppsList>`. The one-letter-shorter profile-type spelling appears only in prose and in the namespace table's "what it adds" cell, **never inside angle brackets**. One explicit caution line distinguishes the two registers. |

## First-Party Citations Supporting the Body (D5.4 — these live here, not in the recipe)

The shipped recipe carries **zero** inline external URLs, matching both shipped recipes. Every mechanism in it traces to one of these:

| Source page | What it supports in the recipe |
|---|---|
| `assigned-access/configuration-file` | The XSD-ordered `profile_t` sequence; `Taskbar` minimum-occurrence 1 and `ShowTaskbar` required; the `v5:StartPins` CDATA JSON; `### User accounts` vs `### Group accounts` scoping (C-2c); the internet-connectivity-for-groups sentence; standard-users-only (C-2b); nested-`UserGroup` unsupported; group `Configs` cannot use a kiosk profile; the `AllAppList` must-define-the-Start-layout prose; the app-dependency rule; "If an app isn't installed for the user… the app isn't shown on the Start screen"; the `AutoLogonAccount` local-standard-user fact and the EAS-breaks-autologon Important |
| `assigned-access/xsd` | `profile_t` verbatim; `guid_t`'s braces-required pattern; `taskbar_t`; the breakout-sequence element living only in the other branch of the `xs:choice`; `groupType_t`'s three values; the `AllowedApps` uniqueness constraints; `default:` appearing only in XSD-internal XPath selectors (T-7) |
| `assigned-access/examples` | The Windows-11-pivot restricted-user-experience sample; the two-sided backslash confirmation (single in `DesktopAppPath`, doubled in the `v5:StartPins` JSON, **both inside CDATA**) |
| `assigned-access/overview` | The four edition families with LTSC spelled out; the definitions of *kiosk experience* vs *restricted user experience* (the Scope banner's taxonomy sentence); the two system requirements that self-scope to the kiosk experience (D5.5, ruled OUT) |
| `assigned-access/recommendations` | The group-targeting recommendation for authenticated apps, in the paragraph covering *a kiosk **or** a restricted user experience* (D4.1); the competing local-nonadministrator sentence scoped to the kiosk profile; the `#keyboard-shortcuts` four-unblocked list; the `## Kiosk user account` domain-resources caution (the autologon row, Concern #11); the enable-the-Operational-channel path; the three Assigned Access registry keys |
| `assigned-access/policy-settings` | `Remove Logoff` / `Remove Task Manager` / `Remove Change Password` under `Ctrl+Alt+Del Options`, scoped to *targeted user accounts when you deploy a restricted user experience*; the device-scope statement that every user including administrators is subject; the blocked-keyboard-shortcut list (the Verification lines); the AppLocker-rules-not-manageable-in-MMC and new-UWP-not-blocked-until-next-sign-in bonus rows |
| `assigned-access/configure-multi-app-kiosk` | The Intune/CSP mechanism (Setting `./Vendor/MSFT/AssignedAccess/Configuration`, Value = content of the XML configuration file); assign to a device group; removal-is-not-rollback with the Start-menu-maintained example; Settings-path unavailability; the 30-second relaunch time-out and `IdleTimeOut`; the touch-keyboard-not-on-VMs Tip |
| `client-management/mdm/assignedaccess-csp` | `Configuration`'s `chr` format and Add/Delete/Get/Replace access; `Status` Get-only; `AppNotFound` = status code 2; the `KioskModeApp`-becomes-No-Op-but-returns-SUCCESS Important; **the direct backslash rule statement** (*"For the same reason, `domain\user` used in Configuration xml does not need `\\` but only one `\`"*) |
| `start/layout` | The `pinnedList` key table (the `packagedAppID` table form) vs 19 sample occurrences of `packagedAppId`; the `applyOnce` 24H2 + KB5062660 version gate; `Export-StartLayout`; the pins-don't-appear-until-installed Important; the String-data-type analogue for an XML-payload CSP node |
| `troubleshoot/.../kiosk-mode-issues-troubleshooting` | The Operational-channel-disabled-by-default statement and the right-click → **Enable Log** action; the one-time-events Tip; "Verify that the configuration XML file is authored and formatted correctly"; the Start-layout-not-as-expected diagnostics |
| `troubleshoot/mem/intune/.../users-cannot-logon-windows-multi-app-kiosk` | `Microsoft-Windows-AssignedAccess/Admin` Event ID 31000 verbatim; Event 1098 in `Microsoft-Windows-AAD/Operational` with `AADSTS50076` (MFA) and `AADSTS50158` (Terms of Use); the by-design cause; the CA-exclusion remedy whose blast radius is disclosed |
| `autopilot/self-deploying` | TPM 2.0 with attestation; the VM / Hyper-V vTPM `0x800705B4` limitation; the Ethernet-vs-Wi-Fi OOBE precision; the first documented outcome (remain at the sign-on screen with Entra credentials — D4.0/D4.1 compatibility); EAS-breaks-autologon; no-automatic-re-enrollment |
| `intune/device-configuration/templates/configure-kiosk` | GATE 1, re-cited fresh: the multi-app kiosk template is documented for Windows 10 devices and Windows 11 routes to the AssignedAccess CSP family; the Templates click-path that makes the trap recognisable |
| `intune/.../configure-custom-settings` + `configure-custom-settings-windows` | The 11-step click-path; the OMA-URI row fields with the case-sensitivity note; the Data-type dropdown's complete option list; the obscured-stored-value Note and the roles that can read it back |

## MEDIUM-Confidence Item (the one delivery-step value not presented as verified)

**Intune **Data type** = `String`.** No first-party sentence states which Intune data type `./Vendor/MSFT/AssignedAccess/Configuration` takes — that is a genuine `[NOT-FOUND]`. The recommendation rests on two things: the CSP node's own Format is `chr` (string), and Microsoft documents **String** explicitly for a *different* CSP node whose value is likewise the content of an XML file. The shipped body tags this **MEDIUM confidence** inline and names `String (XML file)` as the plausible wrong pick **without** claiming first-party support for the exclusion. This is the only value in the delivery step that a reader should verify against their own tenant.

## Remaining `[ASSUMED]` Items

| Item | Why it stays assumed | How the body handles it |
|---|---|---|
| `Microsoft-Windows-AssignedAccess/Admin` is enabled by default | No page fetched states it in so many words; the inference is that it is a standard Admin channel and the troubleshooting article instructs reading it with no enable step | The line is phrased as an instruction to *check* the channel for Event 31000, never as an assertion about the channel's default state |
| The autologon-vs-Entra recovery differential | Two separately-cited facts exist (the autologon account is a local standard user Assigned Access creates and manages; an Entra-group `Config` needs internet connectivity at sign-in) but nothing ranks them | Shipped as two bullets under an explicit heading saying they are separate facts, not a ranking, with the comparison marked `[ASSUMED]` — never welded |
| The PowerShell well-formedness-cast idiom | `$x = [xml](Get-Content .\kiosk.xml -Raw)` is standard PowerShell, not a fetched first-party instruction | Presented as one of two practical author-time checks, alongside the first-party device-side schema-acceptance check; the recipe explicitly does **not** promise XSD validation |
| The desktop-pin-by-AUMID key's casing | The key appears in Microsoft's key table exactly once and in **zero** worked samples | Resolved by avoidance: the payload uses `desktopAppLink`, and the decomposition table row carries an explicit *casing unconfirmed by any published sample — prefer `desktopAppLink`* note |

## D5.5 — The Two-Sided NOT-FOUND Ruling (recorded because getting the scope wrong in either direction is a defect)

The recipe **does not state** the user-account-control requirement and **does not state** the console-only / no-remote-desktop requirement. Both bullets self-scope in their own opening clause to *"To use a kiosk experience"*, and `assigned-access/overview` defines that term as the single-app case, whereas RE-224 is the restricted user experience.

Recorded precisely: the two bullets sit under a section whose lead-in is *"Here are the requirements for Assigned Access"* — a **section-level** framing broader than the **bullet-level** scoping. The explicit, narrower bullet-level scoping governs. Corroborating: `kiosk-mode-issues-troubleshooting` places its user-account-control step under `## Single-app kiosk issues` → `### Sign-in issues`, and its `## Multi-app kiosk issues` section has no such step — two independent pages scope it to the single-app case.

**What is NOT established, in both directions:** no first-party sentence says the restricted user experience *does* work over a remote desktop connection, and none says it *does not* need user account control. Both are `[NOT-FOUND]`. The recipe is therefore **silent, not reassuring** — it neither states the requirements nor tells the reader they do not apply. Both negatives are grep-asserted to 0 in the shipped file.

## D2.1 / D2.2 — The `## Rollback/Recovery` Template Divergence, Named

`docs/recipes/03-windows-11-multi-app-kiosk.md` carries a `## Rollback/Recovery` H2 that `docs/_templates/recipe-template.md` does not define. This is a **named documented divergence**, not a template amendment, and it is **not** inherited by Phase 136.

**The real reason the amendment was rejected:** amending the template would retroactively make recipes 01 and 02 non-conformant to their own template — a foundation-class ripple v1.19 is not scoped for. It is **not** a harness block: `check-phase-129.mjs:57-68` pins `recipe-template.md` only by existence plus `TEMPLATE-SENTINEL`, and **no validator asserts an H2 set or order** at all. Stating "the harness blocks it" would be false and is deliberately avoided here.

**`v1.19-DEFERRED-CLEANUP.md` entries this plan contributes** (HARN-16 creates that file in Phase 138 — a real landing spot, per D8.3's rule that unanchored corrections evaporate):

1. **`recipe-template.md` gaining an optional `## Rollback/Recovery` slot.** A genuine third option to the amend/diverge binary, because an *optional* slot creates no non-conformance for recipes 01 or 02. KIOSK-04 locks "named divergence" for v1.19; this is a candidate for the next recipe milestone, when a third recipe needs the slot.
2. **The C17-vs-`convert.ps1` fence-mask divergence** (per `REQUIREMENTS.md:68`). `c17-eee-contract.mjs:150` masks fences with a `^`-anchored pattern (column 0 only) while `convert.ps1:108` uses `^\s*` (leading whitespace tolerated). Column 0 is the only position where the two agree, which is why D1.2 mandates it — an indented fence would be *unmasked* by C17, so assertions `#2`–`#5` would read the payload's own lines as content and the `#11`/`#12` masks would misbehave. This phase avoids the divergence by construction; the root fix is out of scope.

## D4.2 — Three Grounds for a Case-1 Block With a Routing-Cross-Link Arm (so Phase 136 does not re-litigate)

Phase 135 is the first lander for this shape. The grounds, recorded verbatim in intent:

1. **STD-05 D-01's *"(each option is a fully-worked downstream path)"* is a case-selection criterion, not a constraint on arm content.** It decides *which case* applies, not what a `Branch` cell may contain.
2. **`ROADMAP.md:82` locks the identical shape at SC level for Phase 136** — Phase-136 SC2 reads *"the Case-1 decision block is the irreversible token-type choice (Standard vs. Entra SDM, **SDM as a routing cross-link only**)"* — which sits above `REQUIREMENTS.md:23` MHS-02's requirement-level lock.
3. **`REQUIREMENTS.md:79`'s "a Case-1 branch whose second arm *cannot* be authored fails STD-05 D-01 and D-06" is scoped to the SharedPC NOT-FOUND case.** The autologon arm **can** be authored — and was, as an anti-feature row — so the objection does not apply.

**Case 2 is wrong here** on independent grounds: its `| Option | When to choose | Recorded as |` header drops the consequence column, and `FEATURES.md:114` rates the account-model decision CRITICAL.

## D6.1 — First-Lander Handoff List, With an Inherit-or-Justify-Divergence Gate for Phase 136

Post-archive paths per A-5 (the v1.18 phase directories now live under `.planning/milestones/v1.18-phases/`; `131-CONTEXT.md:80-81`'s pre-archive citations are stale — this is the recurring archival-drift class, checked *before* the apex chain runs, not after).

| # | Precedent set here | Phase 136 disposition |
|---|---|---|
| (a) | Single-path-delta discipline — one worked arm, alternatives stated in place with their reason | **Inherit** |
| (b) | One-line cross-link for anchor-owned content, never a copy | **Inherit** |
| (c) | **Case 1 with a routing-cross-link arm** when the second arm is authorable but not worked | **Inherit** — carry the three grounds above; do not re-litigate. `ROADMAP.md:82` already locks this at SC level for MHS-02's token-type choice |
| (d) | The payload-artifact fence convention (one column-0 fence + a decomposition table) | **Inherit the convention. The CDATA-JSON tension is native to RE-224 and is NOT inherited** — RE-225 has no JSON-inside-CDATA payload, so nothing about backslash doubling, `pinnedList` key casing, or `applyOnce` carries over |
| (e) | Anti-feature table in its normal skeleton slot — **no Phase-129 D-06 reorder**. (Note the two numbering spaces: *Phase-129* D-06 at `129-CONTEXT.md:39` is the fixed-H2-skeleton rule; `EEE-SOP:523`'s D-06 is the Summary end-state. Cite the phase explicitly.) | **Inherit** |
| (f) | `## Rollback/Recovery` as a **named, non-inherited** divergence | **Phase 136 rules its own case** — not barred categorically: MHS-02's token-type choice is irreversible and its recovery is anchor-owned |
| (g) | `## Configuration-Caused Failures` **Runbook-column routing** — in-recipe anchors and existing refs only, **no fabricated runbook links**, because no Windows-kiosk runbook exists corpus-wide (`REQUIREMENTS.md:81` puts one out of scope) and `130-VERIFICATION.md:32` T6 already locked the resolution | **Inherit as an explicit named non-inheritance alongside D2.1** |

**Gray area #8 (the shared conceptual anchor / kiosk-dedicated taxonomy) stays chartered to Phase 136** per `ROADMAP.md:89`. Phase 135 ruled the taxonomy sentence for **RE-224's own Scope banner only** (D6.2, Option A scoped to RE-224) and deliberately did **not** duplicate it into RE-225's banner — an instruction to do so would have decided a Phase-136-chartered gray area with no landing spot in Phase 136's scope, which is this milestone's own #1 recurring lesson.

## Decisions Made

- **Scope banner split into three sub-200-char runs.** Measured *after* Plan 135-01's sentinel strip (C17 `#12` is live now). The first draft measured **249 chars** against the 200-char cap, so it was split at the taxonomy sentence per the `01:101`/`01:103` idiom. Four `> **What breaks if misconfigured:**` callouts also overflowed on first draft (220 / 213 / 223 / 245) and were each split into two blank-line-separated runs rather than truncated, so no first-party content was lost to the cap.
- **Twelve anti-feature rows, not ten.** The table had budget, so both clean bonus rows shipped: new UWP installs are not blocked until the next sign-in, and the generated AppLocker rules cannot be managed in MMC snap-ins. Both are first-party and genuinely surprising.
- **`## Verification` uses bold pseudo-heading lead lines, not sub-headings**, to carry D3.2's seam — matching recipe 01's shipped `**Kiosk branch:**` idiom. Neither shipped recipe uses `###` inside `## Verification`.
- **Two `####` sub-headings inside the XML-authoring step** (`#### Field decomposition`, `#### Namespaces and version floors`) keep the step navigable at 100+ lines without adding an H2. Gate B confirms the H2 set is unchanged at exactly eight.
- **The excluded elements were genuinely not authored** — no breakout-sequence element (schema-illegal in this profile branch), no managed folders, no v5 taskbar-layout element, no classic-app-path attributes, no file-explorer-namespace-restrictions element, no Windows-10 start-layout element, no auto-launch attribute. The two extra namespaces Microsoft's own samples declare but never use were also omitted, with one sentence saying so, because a bounded payload declaring unused namespaces invites the reader to think they are required.
- **XSD validation is not promised.** The five schema documents import one another without resolvable locations and the add-ons need an XSD 1.1 processor, so the recipe says validation requires assembling the schema set by hand and ships the two genuinely executable checks instead (a PowerShell well-formedness cast before pasting; device-side schema acceptance surfacing in the Operational channel).

## Deviations from Plan

**One Rule 1 auto-fix.**

**1. [Rule 1 - Bug] Replaced "a mismatched tag" with "an unclosed tag" in the XSD-validation paragraph**
- **Found during:** Task 2 acceptance-criteria sweep
- **Issue:** `grep -ci 'mismatch'` returned **1**, against an acceptance criterion requiring **0** (or that every occurrence be an explicit statement that no failure mode is documented — KIOSK-02's bar on asserting an undocumented namespace-version failure mode). The single hit was `a mismatched tag`, describing an XML well-formedness error the PowerShell `[xml]` cast catches — semantically unrelated to a namespace-version failure mode, but it fails the criterion as literally written and would read as a near-miss to any successor grepping for the KIOSK-02 bar.
- **Fix:** reworded to `an unclosed tag`, which is equally accurate for what the `[xml]` cast throws on and removes the collision entirely.
- **Files modified:** `docs/recipes/03-windows-11-multi-app-kiosk.md`
- **Commit:** `e91e955f`

Everything else executed exactly as written. No Rule 2, 3, or 4 deviations; no architectural questions arose; no `<precondition>` was unmet (pandoc 3.7.0.2 and `pwsh` 7.6.3 both confirmed present before the conversion check, so the HARN-16 run is real and not the `guard-docx.mjs:234-236` vacuous pass).

## Issues Encountered

None beyond the blockquote-length iteration, which is expected authoring work rather than a defect: C17 `#12` is live for the first time on this file (the sentinel was stripped in 135-01), so five separate blockquote runs had to be measured and split. The measurement script mirrors `c17-eee-contract.mjs:388-407` exactly — same `^>` prefix strip, same `join(' ')`, same 200-char threshold — so the local measurement and the validator agree by construction rather than by luck.

## User Setup Required

None.

## Next Phase Readiness

- **Phase 136** (RE-225, Android dedicated) inherits the D6.1 handoff list above, with (c), (d) and (g) carrying explicit inherit-or-justify-divergence dispositions and gray area #8 still chartered to it.
- **Phase 137** (navigation-last) owns everything deliberately not done here: the `docs/_registry/RE-index.md` row, both `docs/index.md` surfaces in one commit (the WR-01 defect class), the `filename-map.md` regeneration with the 223 → 225 canary bump, and the two-site `status: Draft` → `Approved` flip (frontmatter plus the EEE header block, because C17 `#9` ties them together). The registry is verified still at **223** rows.
- **Phase 138** authors `check-phase-135.mjs` with needles derived from `135-VERIFICATION.md`, and creates `v1.19-DEFERRED-CLEANUP.md` — the landing spot for this plan's two entries above.
- **No blockers.** `status: Draft` is untouched, as required.

## Self-Check: PASSED

- `docs/recipes/03-windows-11-multi-app-kiosk.md` confirmed present on disk at 328 lines (min_lines 170) and contains `## Rollback/Recovery`.
- `.planning/phases/135-recipe-3-windows-11-multi-app-kiosk/135-02-SUMMARY.md` confirmed present.
- All three task commit hashes confirmed in `git log`: `dff66fe1`, `e91e955f`, `dd756278`.
- `git status --porcelain` shows only the intended recipe file as modified; recipe 01, `docs/index.md`, `docs/_registry/RE-index.md`, `docs/_templates/recipe-template.md`, `scripts/validation/` and `scripts/pipeline/` all clean.

---
*Phase: 135-recipe-3-windows-11-multi-app-kiosk*
*Completed: 2026-07-30*
