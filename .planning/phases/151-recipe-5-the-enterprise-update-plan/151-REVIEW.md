---
phase: 151-recipe-5-the-enterprise-update-plan
reviewed: 2026-08-26T00:00:00Z
depth: standard
files_reviewed: 6
files_reviewed_list:
  - docs/recipes/05-enterprise-update-plan.md
  - docs/_standards/EEE-SOP-standard.md
  - docs/_templates/recipe-template.md
  - docs/recipes/01-shared-windows-avd-client.md
  - docs/recipes/02-shared-ipad-full-provisioning.md
  - .planning/milestones/v1.19-DEFERRED-CLEANUP.md
findings:
  critical: 4
  warning: 13
  info: 5
  total: 22
status: issues_found
---

# Phase 151: Code Review Report

**Reviewed:** 2026-08-26
**Depth:** standard
**Files Reviewed:** 6
**Status:** issues_found

## Summary

Reviewed the new fleet-configuration recipe (`docs/recipes/05-enterprise-update-plan.md`, 851 lines,
10 Steps / 9 decision blocks), the STD-05 D-08 amendment that legitimises it, the template promotion
of `## Rollback/Recovery`, the retrofits into recipes 01 and 02, and the v1.19 deferred-cleanup
closure.

Mechanically the change is sound. Every relative link and every anchor in the new recipe resolves
against a real heading or `<a id>` in its target (verified programmatically, 25 distinct targets).
All internal `#decision-*` and `#step-*` anchors resolve. The `5-of-5` uniformity claim in
`v1.19-DEFERRED-CLEANUP.md` is true. The `Rollback/Recovery` "nine mechanisms / six RCP-04 absences
/ minus two partial paths = four" arithmetic is followable and the nine bold pseudo-headings
actually number nine. The Verification checklist and the Configuration-Caused Failures table each
carry exactly one entry per Step. Roughly forty first-party claims were spot-checked line-by-line
against the operations guides they cite (Autopatch prerequisites, Autopatch group Test/Last model,
driver approval transitions and bulk limits, the 0–30 / 0–365 / 2–30 / 0–7 ranges, the M365 rollback
window row, the DFCI nine/six/one manufacturer lists and four registration channels, the Play
Integrity verdict tiers, the Apple OS 26/27 two-stage cutover, the Linux execution-context defaults)
and all of them are faithfully carried.

The defects are concentrated in exactly the places no validator can look: three claims that are
*stronger than the corpus they cite*, one entitlement gate that is silently absent from a plan whose
Prerequisites section declares itself the complete gate list, one cross-Step interaction the plan's
own Summary promises to prevent and then creates, and a planning-artifact identifier that leaked
into published prose six times.

The most consequential single finding is CR-01: the recipe manufactures a Windows 11 **Enterprise**
edition requirement for hotpatch that *both* of its cited carriers explicitly decline to state — one
of them says in as many words that the prerequisite is a licence list, "never as an edition list",
and records the Windows 11 Pro question as unconfirmed. An admin acting on the recipe would exclude
Microsoft 365 Business Premium and Education A3/A5 fleets from a capability they are licensed for.

## Critical Issues

### CR-01: Hotpatch eligibility invents a "Windows 11 Enterprise" edition gate its own sources refuse to state

**File:** `docs/recipes/05-enterprise-update-plan.md:141-143`
**Issue:** The recipe states as settled fact:

> "A device is offered hotpatch only when it holds an eligible license, runs Windows 11
> **Enterprise** — Windows 365 Enterprise qualifies — and has **VBS** … enabled"

Both carriers cited for this paragraph say the opposite:

- `docs/operations/patch-management/07-windows-autopatch.md:343-348` — "**Windows 11 Pro.** Whether a
  Windows 11 Pro device with an otherwise-eligible license receives Hotpatch stays **unconfirmed**:
  the Hotpatch page states its prerequisite as the license list quoted above, **never as an edition
  list**, and 'Windows 11 Pro' does not occur on that page at all."
- `docs/operations/patch-management/01-windows-wufb-rings.md:141-144` — "this guide's earlier
  **Windows 11 Pro** exclusion is not restated by the current article; treat it as **unconfirmed**
  rather than as a settled yes or no."

Three separate errors follow:

1. An explicitly-unconfirmed absence has been converted into a confident positive requirement. This
   is the exact failure mode both operations guides were corrected to avoid.
2. `Windows 365 Enterprise` is a row on the **licence** list (07:327-328), not an edition. Presenting
   it as an edition carve-out ("Windows 365 Enterprise qualifies") mis-teaches the taxonomy.
3. The eligible-licence list includes **Microsoft 365 Business Premium** and **Windows 11 Education
   A3 or A5**. A reader applying the recipe's edition gate will conclude those fleets are ineligible
   and will not check the licence list at all — while Step 2's own next paragraph (line 162-166)
   tells them the licence lists are the thing to check directly.

The consequence is not cosmetic: Step 2's procedure step 1 says "Confirm eligibility against the list
above before you change anything," so this sentence *is* the list a reader confirms against.

**Fix:** Carry the carriers' position rather than a stronger one. Replace lines 141-143 with:

```markdown
Eligibility is what makes that default consequential. A device is offered hotpatch only when it
holds an eligible license — the hotpatch list is Windows 11-only and is not the Autopatch list; both
are set out in full at [Windows Autopatch](../operations/patch-management/07-windows-autopatch.md#autopatch-hotpatch-licensing)
— and has **VBS** (Virtualization-Based Security) enabled at both firmware and OS level. Whether a
Windows 11 Pro device holding an otherwise-eligible license is offered hotpatch is **unconfirmed**:
Microsoft states the prerequisite as a license list, never as an edition list, and this plan carries
that unresolved state rather than settling it.
```

Then delete the "runs Windows 11 **Enterprise** — Windows 365 Enterprise qualifies —" clause
entirely.

---

### CR-02: Step 5 lets a reader pick a Microsoft 365 Apps channel that Step 1's Autopatch branch has already pinned

**File:** `docs/recipes/05-enterprise-update-plan.md:355-425` (table at 361-365; procedure at 412-419)
**Issue:** Step 5 presents Current Channel / Monthly Enterprise / Semi-Annual as three open branches
and instructs the reader unconditionally to "create a settings catalog policy … enable the **Update
Channel** setting and select the channel this Step decided." It never mentions Step 1.

The corpus this plan is built on records the interaction as a hard constraint, twice:

- `docs/operations/patch-management/07-windows-autopatch.md:284-288` — "because an Autopatch-enrolled
  device is steered toward the Monthly Enterprise Channel, and a device can run only one Microsoft
  365 Apps update channel at a time, **enabling Autopatch effectively pins the channel decision for
  that device**. Any channel choice made elsewhere for an Autopatch-managed device **works against,
  rather than alongside**, this 90% MEC objective."
- `docs/operations/patch-management/07-windows-autopatch.md:241` — an Autopatch group is a container
  that creates and assigns "**Microsoft 365 App update policies**" among its software update
  policies.
- `docs/operations/patch-management/08-windows-app-updates.md:84-86` — "An Autopatch-enrolled device
  is steered toward the Monthly Enterprise Channel."

A reader who takes Step 1's Autopatch branch and then picks Current Channel or Semi-Annual at Step 5
authors exactly the dual-authority condition the plan's Summary (line 19-20) promises to eliminate:
"every managed device is covered by exactly one update authority per surface." Step 1a's step 6 warns
only about "any **Update rings** policy the group now contains" — it does not extend the warning to
the Microsoft 365 Apps update policies the same group also creates.

This is the plan's stated failure mode fired by following the plan.

**Fix:** Add a routing gate to Step 5, immediately after the table, and extend Step 1a step 6. In
Step 5:

```markdown
**If you took the service-managed branch of [Step 1](#decision-windows-update-topology), this Step
is already decided.** An Autopatch group creates and assigns Microsoft 365 App update policies among
the policies it contains, and the service steers eligible devices toward the Monthly Enterprise
Channel. Because only one channel can be configured per device, enabling Autopatch pins the channel
for every device it manages, and a channel set elsewhere works against the service rather than
alongside it. Record Monthly Enterprise Channel as the outcome and skip the procedure below; the
other two branches of this table are open only on the self-authored branch of Step 1.

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13), as carried by [Windows Autopatch](../operations/patch-management/07-windows-autopatch.md#update-workloads-objectives).
```

And in Step 1a step 6, change "any Update rings policy the group now contains" to "any policy the
group now contains — the Update rings policy, the driver update policy, the Microsoft 365 App update
policy and the Microsoft Edge update policy alike".

---

### CR-03: Step 7 pushes every Apple fleet onto DDM without stating the macOS 14.0 / iOS 17.0 floor that gates it

**File:** `docs/recipes/05-enterprise-update-plan.md:496-560` (and `31-46`, Prerequisites)
**Issue:** Step 7 tells the reader that deferral on Apple "picks a primitive Apple is deprecating",
that the legacy payloads "become non-functional in all Apple OS 27.0 operating systems", and that
"The DDM assertion in the Settings Catalog is the **only** forward-compatible enforcement path". It
then routes them to create it. The recipe contains **zero** occurrences of `macOS 14`, `macOS 13`,
`iOS 17` or `iOS 16` (verified by grep).

The corpus records a hard eligibility floor on that one forward path:

- `docs/operations/patch-management/02-macos-update-enforcement.md:55-58` — "**Eligibility:** macOS
  14.0+ supports the DDM software update assertion. macOS 13 and earlier must use legacy MDM commands
  … **any macOS 13 fleet not yet on macOS 14+ at Apple OS 26 release loses MDM-driven update
  enforcement entirely.**"
- `docs/operations/patch-management/03-ios-update-lifecycle.md:42-44` — "**Eligibility:** iOS 17.0 and
  later. Earlier iOS versions cannot receive DDM update enforcement."

The recipe's own Prerequisites section (line 32-34) declares itself the complete gate list: "These
are entitlement gates. They decide which decisions below are even open to you — a gate you cannot
meet closes a branch outright rather than making it a worse choice." It carries the Autopatch
licensing/ownership/workload gates and the Dell BIOS-password gate. It omits the two OS-version gates
that close the *recommended* branch of Step 7 on an older Apple fleet — and Step 7 offers no third
option for a fleet that can meet neither the deferral path (deprecated) nor the DDM path
(unsupported OS). That fleet loses MDM update enforcement outright and the plan never says so.

**Fix:** Add a Prerequisites bullet and a sentence in Step 7. Prerequisites:

```markdown
- **OS-version gate on the declarative branch of [Step 7](#decision-non-windows-enforcement):** the
  DDM software update assertion requires macOS 14.0 or later, and DDM update enforcement on iOS and
  iPadOS requires iOS 17.0 or later. A macOS 13 or iOS 16 fleet cannot take that branch, and because
  the legacy primitives become non-functional in all Apple OS 27.0 operating systems, such a fleet
  loses MDM-driven update enforcement entirely rather than falling back to a worse option. Treat the
  OS upgrade as a prerequisite of this Step, not as a consequence of it. See
  [macOS Update Enforcement](../operations/patch-management/02-macos-update-enforcement.md#ddm-enforcement)
  and [iOS Update Lifecycle](../operations/patch-management/03-ios-update-lifecycle.md#ddm-update-keys).
```

---

### CR-04: A planning-artifact requirement ID (`RCP-04`) leaked into published prose six times and is presented as a citable source

**File:** `docs/recipes/05-enterprise-update-plan.md:759, 760, 761, 770, 804, 810`
**Issue:** The `## Rollback/Recovery` section's reconciliation is built entirely on an identifier
that exists nowhere in `docs/`:

> "The count reconciles against **RCP-04** by arithmetic rather than by assertion, **so it can be
> audited**. RCP-04 enumerates six absences; **the research behind this plan** lists nine
> mechanisms…" (759-761)
>
> "…so **RCP-04 is cited here directly** rather than a link being invented to stand in for one."
> (804)

`RCP-04` is a Phase-151 requirement ID. `grep -rn "RCP-0" docs/` returns only these six occurrences
in this file (plus an unrelated `RCP-01` inside a changelog row). Its definition lives in
`.planning/phases/151-recipe-5-the-enterprise-update-plan/151-01-PLAN.md`, which is not part of the
published corpus and which a reader of an Approved guide cannot reach.

Three consequences:

1. The paragraph explicitly claims auditability ("so it can be audited") while its anchor term is
   unresolvable to its stated audience. The claim is false for every reader.
2. Line 804 presents RCP-04 as a **source of record** — "RCP-04 is cited here directly rather than a
   link being invented" — which inverts the honesty argument it is making: an unresolvable internal
   ID is weaker than no citation, not stronger.
3. "The research behind this plan" (760, 824) and "carries no confidence rating for it at all —
   uniquely among the nine" (824) are further unresolvable references to planning artifacts, and
   "confidence rating" is a planning-artifact concept with no meaning in `docs/`.

**Fix:** Rewrite the reconciliation in reader-resolvable terms. The arithmetic is sound; only its
anchor is unpublishable. For example:

```markdown
Four of the nine mechanisms below have no rollback path at all. Read that as this section's finding
rather than as a caveat inside it: removing a policy and undoing what the policy did are different
operations throughout this plan, and for four of these mechanisms only the first one is available.

The count is auditable by arithmetic. Six of the nine mechanisms carry a first-party recorded
absence; the other three — DFCI, the Dell BIOS password and Linux `unattended-upgrades` — are listed
here because each carries a recovery path or an open gap rather than a recorded absence. Of the six,
two hold a documented but partial path: an expedited update's in-progress installation can be
cancelled on a best-effort basis, and a hotpatch can be uninstalled at the cost of a restart. Six
less those two leaves four with nothing behind them — the driver update, the Autopatch driver mode
switch, Enterprise App Catalog auto-update, and Current Channel.
```

Apply the same treatment at 770, 804 and 810 and at 824 ("the research behind this plan carries no
confidence rating" → "this corpus has established no first-party position on it").

## Warnings

### WR-01: The same source URL is dated two different ways eleven lines apart

**File:** `docs/recipes/05-enterprise-update-plan.md:90` and `:101`
**Issue:** Line 90 cites *Windows Autopatch groups overview* as `(updated 2026-06-19)`; line 101
cites the identical URL as `(updated 2025-06-17)`. A reader comparing two `**Source:**` lines in the
same Step sees the same page with a fourteen-month date spread and cannot tell which is current.

Root cause is upstream: `01-windows-wufb-rings.md:76,101` and `00-overview.md:101` use 2026-06-19,
while `07-windows-autopatch.md` uses 2025-06-17 at six sites. The recipe faithfully mirrors whichever
carrier it routes through, which is why the divergence becomes visible here for the first time.

**Fix:** Pick one date for this URL across the corpus and normalise. Both recipe lines should carry
the same value; the fix belongs in `07-windows-autopatch.md` or `01-windows-wufb-rings.md` (a
successor phase's scope), but the recipe should not ship two dates for one page in the meantime.

---

### WR-02: Prerequisites and Summary state the required role as Intune Administrator; two Step-4 branches require Global Administrator

**File:** `docs/recipes/05-enterprise-update-plan.md:24-25` and `:37` vs `:310` and `:325`
**Issue:** Both the Summary and the `**RBAC:**` prerequisite say the plan "requires the Intune
Administrator role, or an equivalent custom role covering update ring policies, device configuration
profiles, application assignment and compliance policy."

Two branch bodies contradict it:

- 4b step 3 — the Dell Management Portal consent grant "requires a Global Administrator, and it
  includes reading BitLocker recovery keys and read-write access to Intune device configuration and
  policies."
- 4c step 2 — HP consent "is granted once by a **Global Administrator** signing in at the HP
  administration console".

The plan's own contract makes this a defect rather than a duplication choice: the Prerequisites intro
(32-34) declares that section the complete gate list, and 4b step 1 explicitly states of the BIOS
password gate that "the gate is stated there once and is not restated here." A Global Administrator
consent grant is precisely an entitlement gate that "closes a branch outright" for a reader who
cannot obtain one — and it carries a BitLocker-key read scope that a security reviewer needs to see
at planning time, not at step 3 of branch b.

**Fix:** Add to Prerequisites:

```markdown
- **Global Administrator gate on the Dell branch of Step 4 and the HP branch of Step 4:** both vendor
  paths require a one-time consent grant performed by a Global Administrator, not by an Intune
  Administrator. The Dell grant additionally carries read access to BitLocker recovery keys and
  read-write access to Intune device configuration and policies. Day-to-day operation on both paths
  runs under Intune Administrator; only the consent grant needs the higher role.
```

And amend the Summary sentence to "requires the Intune Administrator role … ; two branches of Step 4
additionally require a one-time Global Administrator consent grant."

---

### WR-03: Step 1b describes a "promotion gate" the mechanism cannot provide, contradicting Step 1's own table

**File:** `docs/recipes/05-enterprise-update-plan.md:111`
**Issue:**

> "Set your own promotion gate: **do not let content advance to the broad deployment ring until**
> every pilot device reports Compliant … The policy objects are fixed; only the content advances,
> **by virtue of the longer deferral on the broad deployment ring**."

The second half withdraws the first. A WUfB deferral expires on a calendar, not on a compliance
signal — nothing in the described configuration holds content back pending pilot compliance. Step 1's
own decision table already says so for this branch: "**Nothing promotes validated content between
cohorts for you**" (line 81).

An admin who reads step 5 as written believes their broad ring is gated on pilot health when it is
gated on a clock. The only real lever — extending the broad ring's deferral, or pausing, when the
pilot goes bad — is never named.

**Fix:** Say what the admin actually has to do:

```markdown
5. Understand what you do and do not have here. Nothing promotes validated content between cohorts
   for you, and the broad deployment ring's deferral expires on a calendar rather than on a
   compliance signal. Your gate is therefore manual: before each broad-ring deferral expires, check
   that every pilot device reports Compliant at **Intune admin center** > **Reports** >
   **Windows Updates** and that no driver-regression incident is open. If either check fails, extend
   the broad ring's deferral or pause the update — editing the policy is the only lever, because the
   policy objects are fixed and only the content advances.
```

---

### WR-04: `## See Also` omits the operations guide the plan cites most, and routes its subject to a guide that disclaims it

**File:** `docs/recipes/05-enterprise-update-plan.md:843-851`
**Issue:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md` is the owning
guide for Step 3 (the plan's only **Destructive** decision) and for Step 10's central
deferral/deadline asymmetry. The recipe links it seven times in the body. It is absent from See Also.

Worse, See Also reassigns its subject matter to a guide that explicitly disclaims ownership. Line 847
reads:

> "[Windows WUfB Rings](…01-windows-wufb-rings.md) — deployment ring topology, the containment
> relationship, hotpatch, and **the driver and firmware update policy**"

`01-windows-wufb-rings.md:172-176` says the opposite: "Driver and firmware updates are configured
**separately** … See [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md) for
approval modes, the approval workflow, deferral and deadline behavior". `06`'s own See Also line 777
describes `01` as carrying only "the driver/firmware policy **stub**".

A reader following See Also for driver behaviour lands on a stub that forwards them onward. The
recipe's Unsupported table (line 54) sets the contract this breaks: "Each Step … links the operations
guide for the mechanism's full treatment."

**Fix:** Correct line 847 and add the missing entry:

```markdown
- [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md) — deployment ring topology, the containment relationship behind Step 1, and hotpatch
- [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md) — the driver and firmware update policy behind Steps 3 and 10: approval modes, the approval workflow and its one-way transitions, and the deferral-does-not-cross / deadline-does asymmetry
```

---

### WR-05: The Summary promises packaged-application coverage on macOS, iOS and Android; no Step delivers it

**File:** `docs/recipes/05-enterprise-update-plan.md:19-23` and frontmatter `applies_to` at `:9`
**Issue:** The Summary claims the plan yields a fleet where "every managed device is covered by
exactly one update authority per surface — Windows quality and feature updates, drivers and firmware,
BIOS settings, Microsoft 365 Apps, **packaged applications**, and the macOS, iOS, Android and Linux
estates". `applies_to` repeats it: "Every Intune-managed device in the tenant … across **all** update
surfaces."

Step 6 (Application patch mechanism) is marked `**Applies to:** Windows-only`. Step 7 decides OS
update primitives only — its three "Recorded as" cells are a legacy update payload, a DDM software
update assertion and a Play Integrity compliance policy. No Step decides how packaged applications
are kept current on macOS, iOS or Android.

The Prerequisites "platform reach gate" (line 46) makes this an active claim rather than a silence:
"A Windows-only decision has no macOS, iOS, Android or Linux equivalent to make, and leaving it
unmade does not leave those platforms ungoverned — **their own Steps cover them**." For the
packaged-application surface on the three non-Windows platforms, no such Step exists.

The corpus has the guides that would have been routed to and the recipe links none of them:
`docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`, `03-ios-vpp-licensing.md`,
`04-android-mgp-lifecycle.md` (verified: the recipe's link set contains zero `app-lifecycle`
targets).

**Fix:** Either narrow the promise or route the surface. Narrowing is the smaller diff — change the
Summary to "…Microsoft 365 Apps, packaged Windows applications, and the OS-update posture of the
macOS, iOS, Android and Linux estates", amend `applies_to` correspondingly, and add one sentence
under Step 6:

```markdown
This Step is Windows-only, and unlike the other Windows-only Steps that is a scope boundary rather
than a platform absence: macOS, iOS and Android application updates are governed by the app-lifecycle
guides and are outside this plan. See [App Lifecycle Overview](../operations/app-lifecycle/00-overview.md).
```

---

### WR-06: The reversibility-rating rule cannot be applied to eight of the nine decisions, and Step 4's rating contradicts it

**File:** `docs/recipes/05-enterprise-update-plan.md:67-69`
**Issue:** The plan declares:

> "A rating is assigned at the branch this plan **recommends**, not at the worst-case branch. Where a
> non-recommended branch is worse, the consequence is stated in that decision's own text…"

Only **Step 5** names a recommended branch ("This is the channel this plan recommends, and the branch
its reversibility rating is assigned at", line 364). Steps 1, 2, 3, 4, 6, 7, 8 and 9 name none — they
route by fact (hardware, entitlement, surface) rather than by recommendation. For those eight, a
reader cannot determine which branch the rating describes, which is the one thing the rule exists to
tell them.

Step 4 is a demonstrated counter-example rather than an ambiguity. Its rating is **Effectively
irreversible**, justified at 272-280 by the DFCI / Dell / vendor custody consequences — while its
fourth branch is described at line 270 as "the one branch whose wrong choice costs a technician visit
rather than the device" and at 342 as one where "no branch of this Step can strand a device at
retirement". The rating is therefore assigned at the *worst* branch, which the stated rule forbids.

**Fix:** Amend the rule to match the document, rather than the reverse:

```markdown
A rating is assigned at the branch this plan **recommends** where it recommends one, and otherwise at
the branch carrying the highest cost to undo — so read the rating as the ceiling for the Step, not as
a property of the branch you happen to pick. Each decision's own text names which branch its rating
describes.
```

Then add the missing one-line attribution to each of the eight decisions, e.g. for Step 4: "This
rating is assigned at the three managed branches; the *None* branch is reversible by definition,
because it creates nothing to reverse."

---

### WR-07: Step 1's `Reversible — disruptive` rating does not satisfy the closed vocabulary's own definition

**File:** `docs/recipes/05-enterprise-update-plan.md:76` (definition at `:63`)
**Issue:** The vocabulary is declared closed with four fixed definitions. `Reversible — disruptive` is
defined at line 63 as: "the choice can be undone, but undoing it **re-imposes on users** the exact
cost the choice was made to avoid."

Step 1 carries that rating. But every cost the plan attributes to undoing Autopatch is an
**administrator** cost: "You own every rotation decision and every regression window by hand. Nothing
promotes validated content between cohorts for you" (line 81). No user-facing cost of *reversal* is
stated anywhere in Step 1. The user-visible restart prompts at line 118 are the consequence of
*misconfiguration*, not of reversal.

Step 5, which carries the same rating, does satisfy the definition ("undoing it … can take back
features users have started to depend on", 370-371). The contrast makes the mismatch visible rather
than pedantic: within one closed vocabulary, one Step earns its rating and the other asserts it.

**Fix:** Either state Step 1's user-facing reversal cost, or widen the definition once at line 63:

```markdown
- **Reversible — disruptive** — the choice can be undone, but undoing it re-imposes the exact cost the choice was made to avoid, on users or on the administrators who took the choice to avoid it.
```

---

### WR-08: Step 6's "guided supersedence" branch is unsourced, its carrier says the opposite, and the branch defeats Step 6's own routing rule

**File:** `docs/recipes/05-enterprise-update-plan.md:437` and `:481`
**Issue:** Two problems, one root.

(a) The middle branch — "Enterprise App Catalog guided supersedence … A catalog application deployed
as an app object, with an explicit supersedence relationship to the version it replaces" — carries no
`**Source:**` of its own, and the guide it routes to records the contrary position:
`08-windows-app-updates.md:204-208` — "Enterprise App Management's auto-update is explicitly **not**
supersedence … This guide does not link the Win32 supersedence anchor from this section for that
reason; supersedence is a Win32 application-object mechanism this capability does not use." The
corpus routing at `08:36-51` enumerates **three** mechanisms (catalog auto-update, Microsoft Store
app type, Win32 supersedence) and has no fourth. The recipe adds one and attributes it, by proximity,
to a section that declines it.

(b) Step 6's procedure step 1 states the routing rule: "mark, for each one, which surface already
holds it — the Enterprise App Catalog, the Microsoft Store, or neither. **That answer picks the
branch; preference does not.**" But two of the three branches share the surface "Enterprise App
Catalog", and are distinguished solely by preference ("without surrendering the gate — you decide
when each version goes"). The stated rule cannot pick between them.

**Fix:** Source the branch or reframe it. If it stays, give it its own `**Source:**` line and correct
step 1:

```markdown
1. List the applications in scope and mark, for each one, which surface already holds it — the
   Enterprise App Catalog, the Microsoft Store, or neither. That answer narrows the branch: "neither"
   forces the hand-packaged branch and the Microsoft Store routes out of this Step entirely. Only
   where the application is in the catalog do you then choose between the two catalog branches, and
   that second choice is a preference — whether you want the release gate or the least work.
```

---

### WR-09: Recipes 01 and 02 had `last_verified` advanced by 40 days on an additive-only edit

**File:** `docs/recipes/01-shared-windows-avd-client.md:7-8`, `docs/recipes/02-shared-ipad-full-provisioning.md:7-8`
**Issue:** Both files moved `last_verified: 2026-07-17 → 2026-08-26` and `review_by: 2026-10-15 →
2026-10-25`. The diff shows the only other change in each file is an appended `## Rollback/Recovery`
section. Roughly 250 lines of Intune procedure per file were not re-verified.

`last_verified` is a factual assertion that the document's content was checked on that date. The
standard under review states the governing principle at `docs/_standards/EEE-SOP-standard.md:200-207`
(META-04, D2 Last Reviewed Semantics): on retrofit, "`last_verified` is carried **verbatim** … the
staleness clock is **not** reset … the content is not re-reviewed. Content accuracy review remains
the normal 90-day freshness cadence's responsibility."

META-04 is written for the v1.15 Phase-1 retrofit specifically, so this is a principle violation
rather than a rule violation — but the situation is identical (a structural retrofit that does not
re-review content) and the effect is real: recipe 01's review date slipped ten days later than it
would have been, and both files now assert a verification that did not happen.

**Fix:** Restore `last_verified: 2026-07-17` / `review_by: 2026-10-15` on both files, or — if the
content genuinely was re-verified during the phase — say so, since no artifact in the diff records
it. If the project wants a rule for the general case rather than the Phase-1 case, widen META-04 to
"on any structural retrofit that does not re-review content".

---

### WR-10: The DFCI rollback entry presents refresh-from-network recovery without the precondition that removes it

**File:** `docs/recipes/05-enterprise-update-plan.md:814-815`
**Issue:** The Rollback entry states the recovery route flatly:

> "Where a device is already locked, the documented route runs through the UEFI menu on the device
> itself and its option to refresh management from the network … That is a physical visit"

`docs/operations/firmware-bios/01-windows-dfci.md` (`#recovering-locked-device`) records two
qualifications the recipe drops:

1. "Recovery unlocks the menus, but **leaves all UEFI (BIOS) settings set to the values in the
   previous Intune DFCI profile**." The recipe implies recovery restores the device; it restores
   access only.
2. "**Precondition: the refresh-from-network route can itself have been configured away.** A device
   whose last DFCI profile disabled both Boot from external media (USB, SD) and USB type A cannot
   perform a DFCI refresh from the network … there is no software route back on any OEM, Surface
   included, and the device is a hardware repair rather than a recovery."

Disabling external boot and USB ports is a routine hardening choice on exactly the shared/kiosk
fleets this corpus documents. The recipe re-authors the good news of the recovery route while leaving
the trap behind a link — the inverse of the selective-restatement discipline it applies everywhere
else. The Step-4 rating text ("on some fleets not at all", line 65) gestures at it but never names
the configuration that causes it.

**Fix:** Extend the bullet:

```markdown
- Where a device is already locked, the documented route runs through the UEFI menu on the device itself and its option to refresh management from the network, treated at [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#recovering-locked-device). Read two limits with it: recovery unlocks the menus but leaves every setting at the last profile's values, and a device whose last profile disabled **both** Boot from external media and USB type A cannot perform the refresh at all — that pairing has no software route back on any OEM and makes the device a hardware repair. That is a physical visit at best, which is why [Step 4](#decision-bios-firmware-surface) is rated **Effectively irreversible** rather than reversible.
```

---

### WR-11: An unsourced operational warning — "applying it blocks every Linux user"

**File:** `docs/recipes/05-enterprise-update-plan.md:618`
**Issue:** Step 8's procedure step 5 states: "Do not apply *Require device to be marked as compliant*
to a policy scoped to Linux — that grant is not available there and **applying it blocks every Linux
user**."

The carrier supports the first half only. `05-linux-update-delivery.md:106-110`: "device-level
Conditional Access grants — 'Require device to be marked as compliant' applied to a policy targeting
all client apps — **are not available for Linux at all**." The corpus records unavailability; it
records no consequence.

The clause carries no `**Source:**` — the two Source lines that follow the procedure (621, 623) cover
`custom-settings-linux` and Canonical's automatic-updates page, neither of which speaks to Entra
Conditional Access grants. In a document that is otherwise scrupulous about attributing every
strengthened reading (see the `[INFERENCE]` marker at 778), this is an unmarked escalation from
"unavailable" to a specific lockout outcome.

**Fix:** Carry the sourced claim and mark the inference, or drop it:

```markdown
5. **Attach the access gate.** In the **Entra portal**, navigate to **Protection** > **Conditional Access** > **Policies** > **New policy**, include **Linux** in the device-platform scope, and grant on controls Linux actually supports. The device-level grant *Require device to be marked as compliant*, applied to a policy targeting all client apps, is not available for Linux at all — so do not build a Linux gate on it. Validate any Linux-scoped policy in report-only mode before enforcing it.
```

---

### WR-12: Step 5's Semi-Annual "When to choose" cell asserts the cadence the corpus records as unsupportable

**File:** `docs/recipes/05-enterprise-update-plan.md:365` vs `:404-410`
**Issue:** The decision table tells the reader to choose Semi-Annual Enterprise Channel when "Your
change process cannot absorb monthly feature change, or a line-of-business dependency needs a build
to hold still for longer than a month." That is routing advice on a behaviour the corpus says is in
dispute from July 2026 — and this document's `last_verified` is 2026-08-26, after that date.

`08-windows-app-updates.md:88-113` records both readings and concludes: "**Neither reading is
supportable from Microsoft's own pages** as of this guide's last-verified date". Microsoft's own
announcement is that from July 2026 SAEC "will begin receiving **monthly** feature and security
updates" and is unified with Monthly Enterprise Channel.

The recipe does carry the caveat — but forty lines below the table, at 404-410, after the reader has
already used the "When to choose" cell to pick. A decision table's whole function is to be read
before the prose around it.

**Fix:** Move the contingency into the cell it governs:

```markdown
| Semi-Annual Enterprise Channel | Your change process cannot absorb monthly feature change, or a line-of-business dependency needs a build to hold still for longer than a month — **but read the July 2026 cadence conflict below before choosing this row**, because Microsoft's own pages describe this channel two ways from that date and one of them is monthly | An Update Channel setting assigned to the devices in scope, carrying a two-month rollback window |
```

---

### WR-13: Step 10 opens a decision block but carries no marker line, contradicting the rule twelve lines earlier and the Summary's count

**File:** `docs/recipes/05-enterprise-update-plan.md:58-59` and `:26-27` vs `:672-679`
**Issue:** Line 58 states: "**Every** decision Step below carries a marker line naming the platforms
the decision applies to and the reversibility of the branch this plan recommends." The Summary says
"Ten Steps … **nine of them are decisions**".

Step 10 opens with `> **Ask the admin:** What deferral, deadline and grace values will each cohort
carry…` — which is the STD-05 D-01 decision-block opener, Case 3 (free-value prompt, no table
needed), as specified in `docs/_templates/recipe-template.md:82-87`. By the governing standard's own
three-case taxonomy, Step 10 **is** a decision block. It then carries no marker line, so line 46's
"platform reach gate" rule ("a decision below applies only to the platforms its marker line names")
leaves Step 10's reach formally undefined — for a Step that explicitly discusses Windows, Apple,
Android and Linux entries.

Step 10's own self-description ("not a decision between named options, which is why it carries no
branch table and no reversibility rating", 676-677) explains the missing *table*, not the missing
*marker*.

**Fix:** Give Step 10 a marker and correct the two counts:

```markdown
**Applies to:** All platforms · **Reversibility:** Reversible
```

and change line 58 to "Every decision Step that chooses between named options carries a marker
line…", or simply add the marker and change the Summary to "ten of them are decisions" — the latter
is the smaller and truer edit.

## Info

### IN-01: The tenant-wide hotpatch blade is hedged in Step 2 and asserted flatly in Verification

**File:** `docs/recipes/05-enterprise-update-plan.md:173` vs `:743`
**Issue:** Step 2 step 2 says "Set the tenant-wide default from **Intune admin center** > **Tenant
administration**. … **Confirm the control's current blade in the admin center before you change it**
— this plan fixes the decision and the two-level model, not the admin center's blade layout." The
Verification checklist drops the hedge: "The tenant-wide default at **Intune admin center** >
**Tenant administration** matches the posture you recorded". No corpus source names this blade.
**Fix:** Carry the same hedge into the Verification item, or drop the path from both and say "the
tenant-wide hotpatch control, wherever the admin center currently exposes it".

---

### IN-02: The first Prerequisites bullet is not a prerequisite

**File:** `docs/recipes/05-enterprise-update-plan.md:36`
**Issue:** The section intro declares "These are entitlement gates. They decide which decisions below
are even open to you." The first bullet is "**This plan is NOT:** a per-platform procedure guide, an
approval-workflow tool, or a source of tenant-specific ring sizes…" — a scope statement, not a gate,
and it duplicates the first two rows of the Unsupported and Anti-Feature Callouts table twelve lines
later.
**Fix:** Move it into the `> **Scope:**` blockquote at line 29 where the other scope statement
already lives, leaving Prerequisites as a pure gate list.

---

### IN-03: "the D-08 amendment" is ambiguous — STD-04 also has a D-08

**File:** `docs/recipes/05-enterprise-update-plan.md:845`
**Issue:** See Also refers to "the D-08 amendment that admits a fleet configuration plan to the
Device Recipe class" without naming the section. `docs/_standards/EEE-SOP-standard.md` carries two
D-08 identifiers: the new STD-05 D-08 (line 551) and STD-04's "D-08 Non-MECE precedence rule"
(referenced in the changelog at line 644). `recipe-template.md:5` gets this right, writing
"EEE-SOP-standard.md STD-05 D-08".
**Fix:** Write "the STD-05 D-08 amendment" in the recipe's See Also entry, matching the template.

---

### IN-04: The template still instructs `review_by = last_verified + 90 days`; every v1.21 document uses +60

**File:** `docs/_templates/recipe-template.md:7`
**Issue:** The template comment says "Fill in last_verified and review_by dates at doc creation time
(review_by = last_verified + 90 days)". Recipes 01, 02 and 05 all shipped this phase at
`2026-08-26 / 2026-10-25` (+60), as did every guide in `operations/patch-management` and
`operations/firmware-bios` verified in v1.21 (+60 across all fourteen). Recipes 03 and 04 follow the
template's +90. The template was edited twice in this phase and the drift was not addressed.
**Fix:** Update the template comment to the convention actually in force, or record why the two
differ. The frontmatter schema (`EEE-SOP-standard.md:58`) requires only `≤ 90 days`, so both satisfy
the gate — this is an instruction-versus-practice divergence, not a violation.

---

### IN-05: "all four application surfaces" counts WinGet as a surface

**File:** `docs/recipes/05-enterprise-update-plan.md:493` (and `:470-475`)
**Issue:** The See callout promises "the routing order across all **four** application surfaces". The
corpus routing at `08-windows-app-updates.md:36-51` has three surfaces (Enterprise App Catalog,
Microsoft Store, neither/Win32) plus a fourth numbered item that is a warning about WinGet — "It is
not a supported unattended patching path through Intune for any of **the three surfaces above**". The
recipe's own body gets it right at 470-471 ("a fourth path this Step does not decide — the Microsoft
Store app type"), so the count in the callout is a separate slip.
**Fix:** "for the routing order across the three application surfaces and the WinGet warning that
follows them."

---

_Reviewed: 2026-08-26_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_

---

## Remediation (added 2026-08-26)

All 4 Critical and 13 Warning findings were dispatched for fix after this report was committed.
Info findings (IN-01..IN-05) were out of scope.

**Commit:** `8ffd7faa` — `fix(151): correct four critical and thirteen warning findings from code review`
**Files:** `docs/recipes/05-enterprise-update-plan.md` only (+91 / -47). Recipes 01 and 02 byte-unchanged.

**Note on the two-commit contract.** Plan 05's SUMMARY records "exactly two content commits" for
this phase (D-52). That statement was true when written. `8ffd7faa` is a third content commit,
landed deliberately as post-review remediation. D-52's design intent — a green tree at every commit
boundary — is preserved: all four gates were green before the commit and are green after it.

### Disposition

| ID | Status | Note |
|---|---|---|
| CR-01 | fixed | Fabricated "Windows 11 Enterprise" edition gate removed; replaced with the carriers' license-list framing and their explicit `unconfirmed` position on Windows 11 Pro. |
| CR-02 | fixed | Routing gate added after Step 5's table; Step 1a widened to all four policy types an Autopatch group contains. |
| CR-03 | fixed | macOS 14.0 / iOS 17.0 DDM floor added to Prerequisites and to Step 7. |
| CR-04 | fixed | All six `RCP-04` occurrences removed from published prose; the nine-vs-six arithmetic re-anchored on "recorded absence" so D-42 survives. `grep -c 'RCP-0'` on the recipe returns 0. |
| WR-01 | fixed | Both recipe citations of the Autopatch-groups URL now agree on `2025-06-17`. The corpus-wide date divergence between guides 01 and 07 is left to a successor phase — this phase may not edit operations guides. |
| WR-02 | fixed | Global Administrator gate (with BitLocker-key read scope) added to Prerequisites; Summary amended. |
| WR-03 | fixed | Step 1b's "promotion gate" rewritten to name the calendar expiry, the manual check and the real lever. |
| WR-04 | fixed | False driver claim removed from the `01` entry; guide `06` added. See Also is now **7 entries**, one above D-66's measured 5-6 class range — accepted, because omitting the guide the plan cites seven times was the actual defect and D-66's stated purpose is roster reconciliation, which 7 satisfies. No validator pins the count. |
| WR-05 | fixed | Summary narrowed to packaged *Windows* applications plus the OS-update posture of the non-Windows estates; scope-boundary sentence added under Step 6. |
| WR-06 | fixed | Rating rule amended to promise only what it can deliver; Step 4 given its attribution line. No rating changed, so D-11 and D-12 both hold. |
| WR-07 | fixed | `Reversible — disruptive` definition widened to cover cost borne by administrators. Vocabulary stays a closed four-value enum (D-13). |
| WR-08 | fixed | Middle branch reframed as Win32 supersedence carrying a catalog-supplied package; the "auto-update is explicitly not supersedence" position stated and sourced. |
| WR-09 | **not fixed — finding is wrong** | It asks that recipes 01/02 have `last_verified` reverted. D-47 is `[OWNER-RULED 2026-08-26]` and states the opposite outright: both files "need their `last_verified` and `review_by` re-stamped". Locked decision wins. |
| WR-10 | fixed | DFCI rollback entry extended with both dropped qualifications, including the external-boot/USB-type-A precondition. |
| WR-11 | fixed | Unsourced "blocks every Linux user" replaced with the carrier's actual claim. |
| WR-12 | fixed | The July 2026 cadence contingency moved into the Semi-Annual "When to choose" cell. |
| WR-13 | fixed via counts, not via a marker | Step 10 now states it carries no branch table, no rating and no marker line. Adding the marker would have produced a tenth rating, violating D-12 and D-26. |

One edit beyond the findings: Step 5's Verification checkbox gained an Autopatch-branch caveat,
because CR-02's fix tells a service-managed reader to skip creating the policy that Verification
demanded exist.

**Post-remediation gates** (each its own invocation, re-measured independently by the orchestrator):
`check-phase-144.mjs` 101 PASS / 0 FAIL / 0 SKIPPED · `check-nav-hub-links.mjs` 0/0 ·
`c17-eee-contract.mjs` 236 files, 0 with violations · `v1.20-milestone-audit.mjs` exit 0, 16 passed.
