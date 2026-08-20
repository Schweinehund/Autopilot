---
phase: 146-windows-driver-firmware-update-depth
reviewed: 2026-08-20T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - docs/operations/patch-management/06-windows-driver-firmware-updates.md
  - docs/operations/patch-management/01-windows-wufb-rings.md
  - docs/operations/patch-management/00-overview.md
  - .planning/REQUIREMENTS.md
findings:
  critical: 2
  warning: 8
  info: 6
  total: 16
status: partial
---

# Phase 146: Code Review Report

**Reviewed:** 2026-08-20
**Depth:** standard (documentation corpus — factual, sourcing, link and coherence review)
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Phase 146 authored a 764-line first-party-sourced guide, reduced `01`'s driver/firmware section to a
stub, re-routed `00-overview.md` and corrected the `REQUIREMENTS.md` C11 row. The load-bearing traps
this phase was set up to fail were all cleared, and I verified each mechanically rather than by
reading the summaries:

- **Quote fidelity — clean.** 27 spot-checked strings from RESEARCH §2 (Q2, Q3, Q5, Q6b, Q11, Q12,
  Q13, Q19, Q22, Q23, Q25, Q26, Q27, Q29, Q30, Q31, Q33, Q34, Q36, Q39, Q41, Q42, Q43, Q47, Q50,
  Q62, Q28b) all match the bank byte-for-byte after the ruled U+2019/U+2011 fold. `06` contains
  exactly one non-ASCII codepoint class (U+2014 × 39) — the fold rule was applied, not skipped.
- **The B-5 two-page trap — avoided.** Q5 (once-Approved-never-Declined) at `06:213` cites
  `configure-driver-update-policy`; Q6's *"If it can't halt the installation…"* at `06:268` cites
  `driver-updates-faq`. Separate blockquotes, separate `**Source:**` lines, correct pages.
- **The corrected firmware claim — clean.** `grep -rn "automatic firmware delivery" docs/` returns
  **0**. The wrong sentence survives nowhere, and `06:375-393` ships the two sourced facts.
- **All eight `updated_at` dates** on `**Source:**` lines match RESEARCH §1's table exactly.
- **Links — clean.** Six relative link targets, all resolve; both in-file anchors are defined; no
  link to `05-`, `07-`, `08-` or a firmware/BIOS guide.
- **Validators — green.** `check-phase-54` **32/0/0**, `v1.20-milestone-audit` **16/0**,
  `check-nav-hub-links` **0/0**, `c17-eee-contract` **234/0**.
- **The `REQUIREMENTS.md` C11 row is accurate, not merely different.** I re-ran C11's four patterns
  against a live `walkMd('docs')` clone: exactly **one** `\bAutopatch rings\b` hit corpus-wide
  (`01:65`, keeper `disambiguation`), **zero** in `00-overview.md`, and exactly **two**
  `\bSCCM\b[^.]*\bIntune\b` hits in `01` at `:182` and `:187`. I dumped the ±200-char window for
  `:187`: the link *text* `Migration` falls **outside** the window boundary (it truncates to
  `tion](`), so the row's claim that the path segment `co-management` is the **only** keeper is
  literally correct.

What the phase did not clear is a set of claim-level defects the validators structurally cannot see.
Two are Critical: an action instruction in `01` that names a control which does not exist on the
named policy — a correction RESEARCH §2.10 explicitly assigned to `06`, which `06` never makes — and
a bold assertion in `06` that is contradicted by the first-party quote printed two lines beneath it.
The rest are sourcing-scope, staleness and internal-consistency defects concentrated where the move
crossed a file boundary.

## Structural Findings (fallow)

No `<structural_findings>` block was supplied with this review. Nothing to reconcile.

## Narrative Findings (AI reviewer)

## Critical Issues

### CR-01: `01`'s mitigation 2 names a control that does not exist, and the correction assigned to `06` was never written

**File:** `docs/operations/patch-management/01-windows-wufb-rings.md:200-202` (and the missing
correction at `docs/operations/patch-management/06-windows-driver-firmware-updates.md:115-118`)

**Issue:** `01:200` instructs the admin:

> 2. Set the WUfB driver/firmware policy to "Block automatic driver delivery" until the WU workload
>    migration completes — this disables WUfB-side driver delivery so the SCCM-WSUS source is the
>    sole verdict.

There is no "Block automatic driver delivery" setting on an Intune driver update policy. The
first-party lever with that effect is the **update ring** setting `Windows drivers`
(*Allow* / *Block*, CSP `ExcludeWUDriversInQualityUpdate`) — a ring-policy setting, on a different
policy object, with a different blast radius ("**Block** — To prevent scanning for drivers", i.e. it
suppresses driver scanning for every device on that ring, not just the ones the driver policy
targets).

`146-RESEARCH.md` §2.10 identified this precisely and assigned the discharge:

> **Q61 is directly relevant to `01`.** The existing mitigation 2 at `01:204-206` says *"Set the WUfB
> driver/firmware policy to 'Block automatic driver delivery'"*. The first-party lever with that
> effect is the **update ring** `Windows drivers` setting … a **ring** setting, not a driver-policy
> setting. `01:204-206` is inside the frozen zone (D-07) and must not be re-worded, **but `06` can
> state the mechanism correctly.**

`06` does not state it. The only place `06` touches Q61 is `:115-118`, where it appears as a
*prerequisite that must not be blocking* ("Ensure the *Windows driver* setting is set to *Allow*"),
never as *the control you use when you want to block*. The corpus therefore ships an actionable
mitigation pointing at a nonexistent toggle, with the correction dropped between RESEARCH and
execution. This is the exact FIX-pillar failure mode RESEARCH §5.7 named — with the twist that the
wrong claim was left in place rather than relocated.

**Fix:** Add a bold sub-label to `06`'s `## Deferral and Deadline Behavior` (or
`## Unsupported and Anti-Feature Callouts`) that names the real lever and its scope, then point `01`
item 2 at it — a link append is legal inside the frozen zone under the same append-only licence D-24
used. Note the `ring`-token rule (D-16) applies to any bytes added to `01`, so the appended pointer
must carry the anchor, not a slug containing `ring`:

```markdown
<!-- in 06, near the ring/driver boundary -->
**Blocking driver delivery is a ring setting, not a driver-policy setting.** There is no
"block" control on the driver update policy itself. The lever is the WUfB deployment ring's
`Windows drivers` setting:

> **Allow** - To include Windows Update drivers during updates. **Block** - To prevent scanning
> for drivers.

Blocking applies to every device assigned to that WUfB deployment ring, not only to the devices a
driver update policy targets.

**Source:** [Update rings policy settings](https://learn.microsoft.com/en-us/intune/device-updates/windows/ref-update-ring-settings) (updated 2026-04-09)
```

```markdown
<!-- 01:200-202, append only -->
2. Set the WUfB driver/firmware policy to "Block automatic driver delivery" until the WU workload
   migration completes — this disables WUfB-side driver delivery so the SCCM-WSUS source is the
   sole verdict. See
   [the real control](06-windows-driver-firmware-updates.md#deferral-deadline-behavior).
```

Re-gate on `check-phase-54` (**32/0/0**) and `v1.20-milestone-audit` (**16/0**) after the `01` edit.

---

### CR-02: `06` asserts feature updates are excluded from the co-existence path, then quotes first-party text saying otherwise

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:580-589`

**Issue:** The bold lead-in and the second quote under it are incompatible:

```
580  **The co-existence path covers drivers only.** Quality and feature updates are not included:
582  > Using Update Ring policies in Intune for Quality or Feature Updates requires you to move the
583  > **Windows Update** workload to Intune.
585  > You can move Feature update management to the cloud in Intune by configuring a [Feature update]
586  > policy in Intune and setting the **Feature Updates** setting to **Windows Update** using the
587  > [Specify source for specific classes of Windows Updates policy] group policy.
```

Q47 constrains **Update Ring policies**; Q47b describes a *different* policy type (**Feature update**
policy) reaching the cloud through the *same* scan-source GPO the procedure already uses at step 3 —
i.e. feature updates **are** extendable onto this path without moving the workload. The guide gives
no prose distinguishing the two policy types, so the bold takeaway is what a reader carries away, and
it is false for feature updates.

The consequence is not cosmetic: the reader's next decision is whether a workload migration is
required, and the guide tells them it is when first-party text in the same block says it is not.

**Fix:** Replace the lead-in with one that separates the two policy types, and add the missing
reconciling sentence:

```markdown
**The co-existence path covers drivers by default, and feature updates by extension.** What it does
*not* cover is running Intune **update ring** policies for quality or feature updates — those still
require the workload move:

> Using Update Ring policies in Intune for Quality or Feature Updates requires you to move the
> **Windows Update** workload to Intune.

A **Feature update** policy is a different policy type, and it can ride the same scan source group
policy that step 3 already configures:

> You can move Feature update management to the cloud in Intune by configuring a [Feature update]
> policy in Intune and setting the **Feature Updates** setting to **Windows Update** using the
> [Specify source for specific classes of Windows Updates policy] group policy.

Quality updates have no equivalent extension — they stay with Configuration Manager until the
workload moves.
```

## Warnings

### WR-01: `01`'s new `**Source:**` line is scoped to the whole mitigation list, not to the deprecation it was authored for

**File:** `docs/operations/patch-management/01-windows-wufb-rings.md:203-210`

**Issue:** D-25 required mitigation 3's deprecation to carry "**a `**Source:**` line** citing the
Windows Autopatch FAQ". The line was placed at `:210`, after item 4 and after a blank line — outside
the ordered list entirely. Rendered, it reads as sourcing all four mitigations. The Autopatch FAQ
(Q54) supports exactly one of them: item 3's deprecation. It does not source item 1 (the workload
slider), item 4 (the ConfigMgr co-existence path, which is `driver-updates-faq`'s content), or
item 2 — whose claim is the one CR-01 shows to be wrong. The mis-scoped citation lends first-party
authority to a false statement.

**Fix:** Move the citation inside item 3 so its scope is unambiguous, and leave item 4 uncited (it is
a pointer to a sourced section, not a claim):

```markdown
3. **(Deprecated)** Use Group Policy to disable dual-scan during the transition
   (`HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\DisableDualScan = 1`) — note this
   disables ALL WUfB cloud scan, not just driver/firmware, so it should be a transitional measure
   only.
   **Source:** [Windows Autopatch FAQ](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq) (updated 2026-05-28)
4. Keep the Windows Update workload on Configuration Manager while approving drivers and firmware
   from Intune — see [Configuration Manager co-existence](06-windows-driver-firmware-updates.md#configmgr-coexistence).
```

Re-gate on `check-phase-54` (**32/0/0**) and `v1.20-milestone-audit` (**16/0**) — the edit sits
inside the D-06 frozen zone.

---

### WR-02: `01`'s own H1 summary still claims it carries the driver/firmware policy surface

**File:** `docs/operations/patch-management/01-windows-wufb-rings.md:22` (and `:9-10`)

**Issue:** D-55 corrected `00-overview.md:211-213` precisely because describing `01` as carrying
*"the driver/firmware update policy surface"* became false after the move. The identical claim inside
`01`'s own intro was not touched:

```
22  eligible devices from May 2026, and the separate driver and firmware update policy surface.
```

After the surgery, `01` holds a four-line pointer stub, a "this is NOT a ring" disambiguation and the
dual-scan pitfall — not the policy surface. The Platform-applicability blockquote at `:9-10` has the
same problem in miniature (`"WUfB Update rings + Autopatch disambiguation + Hotpatch + driver/firmware"`
with no route to `06`, while the blockquote does route to the other three siblings).

Neither line is inside the D-07 frozen zone (`:168-214`), so both were editable; D-55's three-site
ruling simply never looked inside `01`. A reader landing on `01` from any inbound link is promised
content the file no longer has.

**Fix:**

```markdown
22  eligible devices from May 2026, and the disambiguation stub for the separate driver and firmware
23  update policy, whose full treatment is in
24  [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md).
```

Note D-16: the added bytes must contain no `ring`/`rings` token, including in any link target. Gate
on `check-phase-54` (**32/0/0**) and `v1.20-milestone-audit` (**16/0**).

---

### WR-03: `06` promises the co-existence warning comes before the procedure, then places it after

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:499` vs `:526-554`

**Issue:** `:499` states:

> …and it carries a warning severe enough that it **must be read before the procedure, not after**.

The undefined-and-unpredictable-device-state warning is at `:547-554`. The procedure is at
`:526-543`. The warning is after. The guide's own stated safety ordering is violated by its own
layout, and the reader most at risk — one who follows the numbered steps and stops — reaches step 3
without it. SC#4 requires the warning to accompany the procedure; it does, but the sentence advertising
its placement is false.

**Fix:** Either hoist the warning block above the numbered list, or amend `:499` to describe the real
layout. Hoisting is the safer fix and costs one block move:

```markdown
…and it carries a warning severe enough that it must be read before the procedure, not after.

**Do not configure the update-source setting from two places.** Step 3 below says *domain-based
group policy* deliberately:

> Because Configuration Manager uses a local group policy to configure the update source policy,
> using Intune or a CSP to attempt to configure these same settings result in an undefined and
> unpredictable device state.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)
```

---

### WR-04: `06:165-167` blurs the Intune/Autopatch surface split the research explicitly told the planner not to blur

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:165-167`

**Issue:**

```
165  **The approval type is immutable after policy creation.** Decide the mode before creating the
166  policy: changing your mind later means creating a different policy, and doing it by switching
167  modes is destructive, as [Unsupported and Anti-Feature Callouts](#unsupported-callouts) records.
```

The sentence asserts the type cannot be changed and, in the same breath, describes what happens when
you change it. Those are two different products' behaviour: Q11 (Intune driver update policy — the
approval type is not editable) and Q31 (**Windows Autopatch** driver profiles — switching modes
regenerates policies and discards approvals). RESEARCH §3 flagged exactly this:

> ⚠ **Scope note the planner must not blur.** Q31 is on the **Autopatch** page and is scoped to
> *"those groups and/or deployment rings"* … the guide should keep them attributed to their own
> surfaces rather than implying one page said all four.

The callouts section does it correctly at `:679-682`. The Approval Modes section does not, and it is
the section an admin reads while deciding the mode.

**Fix:**

```markdown
**The approval type is immutable after policy creation.** Decide the mode before creating the policy
— on an Intune driver update policy the approval type cannot be edited at all afterwards. On the
Windows Autopatch side, where a mode switch *is* possible, it is destructive; see
[Unsupported and Anti-Feature Callouts](#unsupported-callouts).
```

---

### WR-05: two unsourced behavioural claims in an otherwise citation-dense guide

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:93-94`, `:733`

**Issue:** `06` carries a `**Source:**` line for essentially every factual claim — which makes the
two that do not stand out as assertions the reader will assume are sourced:

- `:93-94` — *"Confirm all of the following before creating a policy, because several of them **fail
  silently rather than blocking policy creation**."* Nothing in RESEARCH §2.10 (Q55–Q61) states the
  failure mode. Whether an unsupported edition, an absent licence, a GCC High tenant, disabled
  telemetry or a stopped `wlidsvc` blocks policy creation or fails quietly is a per-prerequisite
  behavioural claim, asserted here as uniform.
- `:733` — *"Windows Enterprise LTSC … The policy **silently** covers none of those devices."* Q55
  states LTSC is unsupported; it says nothing about silence.

Both are load-bearing operationally: "fails silently" is the reason an admin would bother to
pre-check, and it is exactly the kind of claim the milestone's Pillar E exists to stop shipping
unsourced.

**Fix:** Downgrade to what the sources support, or cite one:

```markdown
**Prerequisites and scope limits.** Confirm all of the following before creating a policy — the
sources state the requirements, not what a device does when one is unmet, so treat an unmet
prerequisite as a probable silent no-op and verify with the reports rather than assuming policy
creation will block.
```

and, in the LTSC row, `"Windows Enterprise LTSC (Long Term Service Channel) isn't supported."` without
the word *silently*.

---

### WR-06: D-43(b)'s ring-qualification rule is violated four times in `06`'s own prose

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:19`, `:297`,
`:315`, `:680`

**Issue:** D-43(b) is unambiguous: *"in the guide's own prose, qualify every `ring` as `WUfB
deployment ring` or `Autopatch ring`, singular preferred"*. Verbatim quotes are exempt (D-43(a));
these four are not quotes:

- `:19` — "which **update ring** settings reach it and which do not"
- `:297` — "**The ring deferral** does not reach drivers."
- `:315` — "read as 'the **ring settings** are irrelevant to drivers'"
- `:680` — "scoped to Autopatch-managed driver profiles and their groups and **deployment rings**"

`:297` also introduces a second ambiguity: the ring policy has *two* deferrals (quality and feature)
and the sourced claim (Q1) is about the quality-update deferral specifically. In a corpus whose
adjacent file exists to disambiguate three different meanings of "ring", these are the exact
ambiguity the rule was written to prevent. No validator catches it — `check-phase-54`'s bare-`ring`
NEGATIVE is scoped to `PATCH_FILES`, which does not include `06`.

**Fix:** `:19` → "which WUfB deployment ring settings reach it"; `:297` → "**The WUfB deployment ring
quality-update deferral does not reach drivers.**"; `:315` → "the WUfB deployment ring settings are
irrelevant to drivers"; `:680` → "their groups and Autopatch deployment rings".

---

### WR-07: `01`'s `(Deprecated)` label understates the first-party status of `DisableDualScan`

**File:** `docs/operations/patch-management/01-windows-wufb-rings.md:203-206`

**Issue:** Mitigation 3 is now labelled `**(Deprecated)**` and still described as a usable
"transitional measure". `06:616-619` quotes what the first-party sources actually say (Q50):

> The policy … also known as Dual Scan, **is no longer supported on Windows 11** and on Windows 10
> it's replaced by the new Windows scan source policy and isn't recommended for use. **If you
> configure both on Windows 10, you won't get updates from Windows Update.**

"Deprecated" reads as "still works, prefer something else". On a Windows 11 fleet the setting is
unsupported; on Windows 10 combining it with the scan source policy stops updates entirely. `01`
carries neither fact and gives the reader no route to them — the co-existence link on item 4 points
at `#configmgr-coexistence`, and Q50 is 120 lines further into that section.

**Fix:** Since `:204-206` is frozen, append rather than rewrite:

```markdown
3. **(Deprecated — unsupported on Windows 11)** Use Group Policy to disable dual-scan during the
   transition
   (`HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\DisableDualScan = 1`) — note this
   disables ALL WUfB cloud scan, not just driver/firmware, so it should be a transitional measure
   only. See
   [the scan source policy](06-windows-driver-firmware-updates.md#configmgr-coexistence) for what
   replaced it and what breaks if both are set.
```

Verify no `ring` token enters `01` (D-16) and re-gate both validators.

---

### WR-08: `00-overview.md:86-87` attributes *approval mode* to the deployment ring — a distinct error from the deferred D-73 item, and this phase linked the refuting guide directly to it

**File:** `docs/operations/patch-management/00-overview.md:86-88`

**Issue:** Scoping this precisely, because the deferral half is out of bounds: **D-73 defers
`00-overview.md:87`'s "the 0–30 day deferral are set per deployment ring" phrasing to Phase 147, and
I am not re-raising it.** The finding here is the *other* half of the same clause, which D-73 does not
cover:

```
86  firmware updates are an independent policy surface that admins approve per-update. Approval mode
87  and the 0–30 day deferral are set per deployment ring, and the quality-update deadline and grace
```

**Approval mode** is not a deployment-ring property under any reading. It is chosen at driver-policy
creation and is immutable thereafter (Q11), which is precisely what `06:165-172` and `06:686-691`
now state twice. The bullet also opens by asserting driver/firmware is "NOT a 'ring' in either WUfB
or Autopatch sense" and then attributes two of its settings to a ring — self-contradictory within
five lines.

This phase's edit made the coupling tighter rather than looser: `:88` now appends
*"See [Windows Driver and Firmware Updates](06-…) for the full approval-mode, workflow, and deferral
treatment"* — a routing sentence that sends the reader from a false statement about approval mode
straight to the guide that refutes it, advertising "the full approval-mode treatment" as the
elaboration of a claim `06` contradicts.

**Fix:** Correct the approval-mode half now (it is a two-word edit, outside D-73's scope) and leave
the deferral wording for Phase 147:

```markdown
  firmware updates are an independent policy surface that admins approve per-update. Approval mode is
  fixed when the driver policy is created, the 0–30 day deferral are set per deployment ring, and the
  quality-update deadline and grace period do apply to drivers. See
  [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md)
  for the full approval-mode, workflow, and deferral treatment.
```

(If the fixer prefers a single clean pass, hand the whole clause to Phase 147 with D-73 — but record
the approval-mode error explicitly, because D-73's text does not name it and would not catch it.)

## Info

### IN-01: `00-overview.md`'s corrected `01` description leaks edit-history into reader-facing prose

**File:** `docs/operations/patch-management/00-overview.md:214-216`

**Issue:** *"…and the driver/firmware **disambiguation plus dual-scan pitfall retained alongside the
ring topology**"*. "Retained" is meta-commentary about this phase's stub-and-move; a reader has no
idea what was retained or from what. The bullet also uses "disambiguation" twice ("Autopatch
disambiguation" then "driver/firmware disambiguation").

**Fix:** `"— WUfB deployment ring topology, Autopatch ring disambiguation, the in-memory kernel
patching servicing model, and the dual-scan source-conflict pitfall"`.

---

### IN-02: two quotes are reproduced verbatim twice with identical `**Source:**` lines

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:169-172` /
`:688-691`, and `:88-91` / `:723-726`

**Issue:** Q11 (approval type immutable) and Q36b (no installed-driver inventory) each appear as a
full blockquote plus citation in two sections. Everywhere else the guide cross-references instead
(e.g. `:715-718` points at `#oem-catalog-firmware` for the CHID quote rather than re-quoting it). The
inconsistency makes the file longer than it needs to be and doubles the surface D-53's verifier
diffs.

**Fix:** Keep the quote where the claim is first made and replace the second instance with the
cross-reference form already used for CHID.

---

### IN-03: the A2 inference is handled two different ways in two sections

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:199-200` vs
`:391-393`

**Issue:** RESEARCH's Assumptions Log A2 instructs: *"The guide should state the two sourced facts and
let the reader draw the conclusion."* `:391-393` does exactly that ("Those are the two sourced facts.
Read them together…"). `:199-200` instead states the syllogism in the guide's own voice ("Because
firmware updates arrive on the *other drivers* list, that rule is what governs firmware"). Not wrong,
but the deliberate epistemic restraint of one section is undone by the other.

**Fix:** Reduce `:199-200` to the pointer only: *"Firmware updates arrive on the* other drivers *list
— see [OEM Catalog and Firmware Delivery](#oem-catalog-firmware)."*

---

### IN-04: the Intune blade path carries no `**Source:**` line

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:73-75`

**Issue:** D-54 required every claim landing in `06` to get an evidence line authored from scratch.
The admin-console path — the one concrete thing a reader will act on first — sits between two cited
blocks with no citation of its own, and RESEARCH §2 has no quote for it. `00-overview.md:84-85`
carries the same path under a `**Source:**` at `:95`, so a precedent exists.

**Fix:** Attach the `manage-driver-updates` citation to it, or mark the blade-version caveat as an
in-repo observation rather than sourced content.

---

### IN-05: two typography inconsistencies

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:734`, `:299`,
`:552`, `:641`, `:643`

**Issue:** `:734` uses `N/A -- no alternative exists` (ASCII double hyphen) in a file containing 39
em dashes and no other `--`. Separately, `:299`, `:552`, `:641` and `:643` are unwrapped 122–155-char
blockquote lines sitting inside quotes whose remaining lines wrap at ~95, so a single quote renders
with one very long line and three short ones in raw view.

**Fix:** `--` → `—`; re-wrap the four long quote lines to the file's ~95-column norm (they are inside
blockquotes, so re-wrapping does not alter the quoted string once `>` prefixes and whitespace are
normalised — and `06` is not under D-07's byte-freeze).

---

### IN-06: "a floor on health" is the wrong direction for half the columns

**File:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md:466-468`

**Issue:** *"the summary report's device counts are a floor on health, not a per-update tally"*.
Under worst-status-wins the **Success** column is a floor (it understates how many updates succeeded);
the **NeedsReview / Error / Cancelled** columns are inflated, not floors. Applying "floor" to "the
device counts" collectively is backwards for the columns an admin actually investigates.

**Fix:** *"…mean the Success column understates per-update health, while every worse-status column
overstates the number of devices genuinely stuck there — a single unreviewed other-driver update
moves an otherwise healthy device into the worst column."*

---

_Reviewed: 2026-08-20_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_

---

## Post-Review Fixes

**Fixed at:** 2026-08-20
**Commit:** `1f17c6c4` — `docs(146-04): fix code-review CR-01/CR-02 + 6 warnings in the driver/firmware guide`
**Scope applied:** both Criticals + WR-01, WR-02, WR-03, WR-04, WR-05, WR-06, WR-08. WR-07 and all
six Info findings were explicitly out of the fix scope and are untouched.

### CR-01 — the impossible instruction

**Changed:** `06-windows-driver-firmware-updates.md:349-360` (new block in
`## Deferral and Deadline Behavior`, immediately before the ranges table). It states that there is no
"block" control on the driver update policy itself, names the real lever — the WUfB deployment ring's
*Windows drivers* setting, CSP `ExcludeWUDriversInQualityUpdate` — quotes it verbatim, and states its
ring-wide blast radius: *Block* suppresses driver scanning for every device assigned to that WUfB
deployment ring, not only for the devices a driver update policy targets. It also ties the block back
to the *Allow* prerequisite already stated at `:115-118`, which is the same setting seen from the
other side.

**Traces to:** RESEARCH §2.10, the Q61 note — S5 `:34-38`, *"**Allow** - To include Windows Update
drivers during updates. **Block** - To prevent scanning for drivers."*, CSP
`ExcludeWUDriversInQualityUpdate`. The `**Source:**` line cites `ref-update-ring-settings`
(updated 2026-04-09), matching RESEARCH §1's table and `06`'s existing citation of the same page at
the ranges table.

**Not done, deliberately:** `01:200-202` was NOT edited and carries no new pointer. The fix brief
forbade touching it. The false instruction therefore still stands in `01`; the correction now exists
in `06` where RESEARCH §2.10 assigned it, but a reader who only reads `01`'s mitigation 2 is still
misinstructed. **This needs a follow-up** to append a pointer from `01` item 2 to
`06#deferral-deadline-behavior` — legal under D-24's append-only licence, and `ring`-token-free, so
D-16 permits it.

### CR-02 — the self-contradiction

**Changed:** `06:600-618`. The bold lead-in is now *"The co-existence path covers drivers by default,
and feature updates by extension."* The two quotes are separated by prose that distinguishes the two
policy types: Q47 constrains WUfB deployment ring policies, which do require the workload move; Q47b
describes a **Feature update** policy riding the same scan source group policy that step 3 already
configures. Closing sentence: *"The FAQ names no equivalent extension for quality updates: managing
those from an Intune WUfB deployment ring policy still requires the workload move."*

**Traces to:** RESEARCH §2.8 Q47 and Q47b, both quoted unchanged. The closing sentence is an
absence-of-a-Q47b-analogue statement scoped explicitly to the FAQ, deliberately **not** the review's
suggested *"Quality updates have no equivalent extension — they stay with Configuration Manager until
the workload moves"*, which would have been false against Q49 (the scan source policy routes *Windows
quality updates* as one of its four classes) and Q53 (*"whether you move only drivers to the cloud
today or drivers and quality updates"*). Both of those facts already ship 15 lines later in the same
section.

### WR-01 — mis-scoped `**Source:**` line

**Changed:** `01-windows-wufb-rings.md` — the Autopatch FAQ citation moved from its standalone
position after item 4 to an indented continuation line inside mitigation 3 (now `:209`). It scopes to
the deprecation it was authored for and no longer lends first-party authority to mitigation 2's false
claim. Added bytes: three spaces of indentation; no `ring` token.

**Traces to:** D-25 (*"a `**Source:**` line citing the Windows Autopatch FAQ"*) and RESEARCH §2.9
Q54. URL and the `updated 2026-05-28` stamp unchanged.

### WR-02 — `01:22`'s stale self-description

**Changed:** `01:22-24`. Now *"…and the disambiguation stub for the separate driver and firmware
update policy, whose full treatment is in [Windows Driver and Firmware
Updates](06-windows-driver-firmware-updates.md)."*

**Traces to:** in-repo reality after the DRV-07 move, and D-55's identical correction to
`00-overview.md:211-213`. Outside the D-07 frozen zone; no `ring` token in the added bytes, link
target included (D-16).

**Not done:** the `:9-10` Platform-applicability blockquote, mentioned in WR-02's second paragraph,
was outside the briefed fix scope and is untouched.

### WR-03 — warning placed after the procedure it says to read first

**Changed:** `06`. The whole *"The step 3 warning — do not configure the same setting from two
places"* block (lead-in, Q43 blockquote, `**Source:**` line) moved from after the six-step list to
immediately after the `:499` sentence that promises it. `"Step 3 says"` became `"Step 3 below says"`
to match the new position. The layout now matches the text, and a reader who follows the numbered
steps and stops has already passed the warning.

**Traces to:** RESEARCH §2.8 Q43, quoted byte-unchanged by the move. The `**Source:**` line moved
with the block, unchanged.

### WR-04 — blurred Intune/Autopatch surface split

**Changed:** `06:167-171`. Each behaviour is now attributed to its own product: on an Intune driver
update policy the approval type cannot be edited at all afterwards (Q11); on the Windows Autopatch
side, where a mode switch between automatic and manual *is* possible, it is destructive (Q31). The
cross-reference to the callouts section is retained.

**Traces to:** RESEARCH §3's scope note (*"Q31 is on the **Autopatch** page … keep them attributed to
their own surfaces"*), Q11 (S1) and Q31 (S7).

### WR-05 — two unsourced behavioural claims

**Changed:**

- `06:93-96` — *"fail silently rather than blocking policy creation"* replaced with an explicit
  statement that the sources state the requirements and not the unmet-prerequisite behaviour, so the
  reader should treat an unmet prerequisite as a probable silent no-op and verify against the reports
  rather than assume policy creation will block. **Hedged, not sourced** — RESEARCH §2.10 (Q55–Q61)
  contains no failure-mode statement, and none was invented.
- `06:761` — the word *silently* removed from the LTSC row. It now reads *"…isn't supported." The
  policy covers none of those devices*, which is Q55 and nothing more.

**Traces to:** RESEARCH §2.10 Q55 for the LTSC row. The prerequisites lead-in traces to the *absence*
of a behavioural claim in Q55–Q61 and says so on its face. No `**Source:**` line was fabricated for
either.

### WR-06 — four D-43(b) bare-`ring` violations

All four are in `06`'s own prose; none is inside a blockquote.

| Was | Now | Line |
|---|---|---|
| "which update ring settings reach it" | "which WUfB deployment ring settings reach it" | `:19` |
| "**The ring deferral does not reach drivers.**" | "**The WUfB deployment ring quality-update deferral does not reach drivers.**" | `:301` |
| "the ring settings are irrelevant to drivers" | "the WUfB deployment ring settings are irrelevant to drivers" | `:320` |
| "their groups and deployment rings" | "their groups and Autopatch deployment rings" | `:708` |

**Traces to:** D-43(b) and (a). `:301` also resolves the review's second ambiguity — the sourced
claim (Q1) is about the quality-update deferral specifically, and the sub-label now says so. Verbatim
quotes were re-qualified nowhere (D-43(a)). A re-scan of `06` confirms these four were the complete
set of bare-`ring` tokens in its own prose. `"Autopatch deployment rings"` does not match C11's
`\bAutopatch rings\b`.

### WR-08 — `00-overview.md:86` approval-mode attribution

**Changed:** `00-overview.md:86-88`. Now *"Approval mode is fixed when the driver policy is created
and cannot be changed afterwards; the 0–30 day deferral are set per deployment ring, and the
quality-update deadline and grace period do apply to drivers."* D-73's exact target phrasing — *"the
0–30 day deferral are set per deployment ring"* — is preserved verbatim so Phase 147 can still find
and correct it.

**Traces to:** RESEARCH §2.3 Q11 (*"After a policy is created, you won't be able to edit the policy
to change the approval type."*), and to `06:167-176` / `06:714-719`, which the same bullet
hard-links.

**Caveat recorded:** the bullet's existing `**Source:**` line at `:95` cites `manage-driver-updates`
and `driver-updates-faq`; Q11 is on `configure-driver-update-policy`, which that line does not name.
No citation was added or altered (D-55 ruled that appending at `:90` orphans a Phase-145 citation),
so the corrected claim traces through the in-bullet link to `06` rather than through `:95`. Worth
tidying when Phase 147 takes its D-73 pass at this bullet.

### Constraint verification

- `01-windows-wufb-rings.md:182-187` — the dual-scan block carrying both live C11
  `\bSCCM\b[^.]*\bIntune\b` hits and the `../co-management/02-windows-workload-sliders.md` link path
  that holds the second one green — is **byte-identical**. This was asserted programmatically during
  the edit, not by eye. The block shifted down two lines because of the `:22` rewrap; no byte inside
  it changed.
- **D-16** — `git diff -U0 -- 01… | grep '^+' | grep -v '^+++' | grep -i ring` returns nothing. No
  `ring`/`rings` token entered `01` in any byte, link targets and `**Source:**` URLs included.
- `## Driver and Firmware Update Policy` H2 in `01` — untouched.
- No forward link from `06` to `05-`, `07-`, `08-` or any firmware/BIOS guide was added.
- No registry row, filename-map row, canary bump or ops-index row.
- `last_verified` / `review_by` stamps unchanged in all three files (`2026-08-20` / `2026-10-19`).

### Gate results

| Gate | Required | Actual |
|---|---|---|
| `check-phase-54.mjs` | 32 / 0 / 0 | **32 passed, 0 failed, 0 skipped** |
| `v1.20-milestone-audit.mjs` | 16 / 0 | **16 passed, 0 failed, 0 skipped** |
| `check-nav-hub-links.mjs` | 0 / 0 | **0 hub-presence failure(s), 0 corpus-link failure(s), 0 total** |
| `c17-eee-contract.mjs` | 234 files, 0 violations | **234 files checked, 0 with violations, 0 total violations** |

**Verification environment:** all gates ran in the **main checkout** at `D:/claude/Autopilot` on
branch `master`. No worktree was created, so every number above is reproducible from the tree as it
stands.

### Why `status:` is `partial`, not `clean`

CR-02 and all seven in-scope Warnings are genuinely resolved. **CR-01 is resolved only on the `06`
side.** The correction RESEARCH §2.10 assigned to `06` now exists, but `01:200-202` still instructs
an admin to set a control that does not exist, and the fix brief forbade editing it. Until a
follow-up appends the pointer, the corpus still ships an actionable instruction pointing at a
nonexistent toggle — so this review is not clean.

Also still open by design: **WR-07** (the `(Deprecated)` label understating `DisableDualScan`'s
first-party status) and **IN-01** through **IN-06**, all out of the fix scope.

_Fixed: 2026-08-20_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
