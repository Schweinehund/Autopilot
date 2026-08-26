---
phase: 150-per-oem-bios-guides-capability-matrix
reviewed: 2026-08-26T03:57:29Z
depth: standard
files_reviewed: 6
files_reviewed_list:
  - docs/operations/firmware-bios/02-dell-bios-configuration.md
  - docs/operations/firmware-bios/03-hp-bios-configuration.md
  - docs/operations/firmware-bios/04-lenovo-bios-configuration.md
  - docs/reference/firmware-oem-matrix.md
  - docs/_glossary.md
  - docs/operations/firmware-bios/00-overview.md
findings:
  critical: 2
  warning: 3
  info: 1
  total: 6
status: resolved
resolved: 2026-08-26
resolution_commit: 6f21903b
resolution_note: all 6 findings fixed; gates re-run green (apex 101/0/0, C17 235/0, nav-hub-links 0/0/0)
---

# Phase 150: Code Review Report

**Reviewed:** 2026-08-26T03:57:29Z
**Depth:** standard
**Files Reviewed:** 6
**Status:** issues_found

## Summary

Six files reviewed: three new per-OEM BIOS guides (Dell, HP, Lenovo), a new capability matrix that
transposes them, a four-term glossary addition, and the domain overview's routing correction.

What holds up. All three guides are structurally identical — 9 H2s / 7 hand-authored anchors each,
confirmed by a byte-level diff of the `^## ` line sets, satisfying SC#1. Both custody quotes SC#3
requires (HP's cloud-vault statement and Dell's complete 241-character no-customer-data sentence)
ship inside `03-hp-bios-configuration.md`, each on one unwrapped line with its own `**Source:**`
line, 8 lines apart. The Lenovo tooling fork (SC#4) is stated plainly with a first-party quote, and
the certificate-tool model-floor sentence (ThinkPad 2022+ / ThinkCentre 2020+ / ThinkStation 2020+)
is attached to the certificate tool by name in every one of its three appearances (Delivery, Scope,
Prerequisites) — it never migrates onto the settings tool. The reconciliation between the two
first-party Lenovo statements is explicitly labeled "this corpus's own reading," not a vendor claim.
BIOS-06's inverted-prerequisite pair (Dell wants a virgin BIOS; Lenovo needs a provisioned one)
lands with fixed grep needles in both guides, the matrix's 2×2 sub-table, and the overview's
canonical sentence — four placements, all mutually consistent. Every relative link and `#anchor` in
all six files resolves to a real target and a real hand-authored id, confirmed by grepping every
target file directly rather than assuming slug rules. The false "not yet written" sentence in the
overview is gone, replaced with working links to all four new files. Cell-by-cell transposition
checking across the matrix's six capability tables against the three guides found the vocabulary
correctly applied everywhere except the one cell below.

What does not. The overview's own "oldest source in this domain" superlative is falsified by a
source this same phase shipped — a live cross-file contradiction, not a stale count from an earlier
phase. The matrix's HP "Lost password" Recovery cell asserts a documented silence that traces to no
sentence in the HP guide, was never part of any of the phase's researched recovery gaps, carries no
`as-of` date or pages-checked citation anywhere (unlike every other silence cell in the same table),
and is quietly missing from `## Key Gaps Summary`'s own silence enumeration — even that section's
own table-summary blockquote names only "HP's and Lenovo's key-loss cases" as silences, skipping the
cell it sits three lines above. Below that: an unlabeled inference stretching an "we announced X
would be joining" quote into "X has appeared since," repeated verbatim in two files; a cell-vocabulary
self-contradiction in the matrix's own Offboarding table; a source-confidence claim in the Lenovo
guide that overstates what the research trail actually re-verified; and one circularly-worded
glossary entry.

## Narrative Findings (AI reviewer)

## Critical Issues

### CR-01: Overview's "oldest source in this domain" claim is falsified by this same phase's own Lenovo citation

**File:** `docs/operations/firmware-bios/00-overview.md:57`
**Issue:**
The overview states, about the HP Connect User Guide:

> That guide is version 1.2.0 from 2022 and is the oldest source cited anywhere in this domain.

This sentence originates from Phase 149 (when it was true — the only other dated sources in the
domain were 2024-2025 Learn pages). Phase 150's own Plan 05 edited this exact file (Commit
`2fab0ac5`) and left the sentence standing, but the same phase's Plan 03 shipped a source dated
seven years earlier, cited in the sibling guide this overview links to two paragraphs later:

`docs/operations/firmware-bios/04-lenovo-bios-configuration.md:227`
```
**Source:** [Types of password for ThinkPad (Lenovo Support, ht036206)]
(https://support.lenovo.com/us/en/solutions/ht036206-types-of-password-for-thinkpad) —
published 2015-06-09, retrieved 2026-08-25.
```

2015-06-09 predates the HP guide's 2022-09-27 by more than seven years. The claim is not merely
imprecise — it is a superlative ("the oldest … cited anywhere in this domain") that the author had
direct means to check, since the very phase that left the sentence in place is the phase that shipped
the older source. This is the "a count or claim that went stale inside its own authoring phase"
defect class, here landing on a factual assertion rather than a number.

**Fix:** Either drop the superlative or update it to name the actual oldest source:

```markdown
That guide is version 1.2.0 from 2022. The custody model it documents is the durable fact; the
console details, and the Microsoft Endpoint Manager branding carried in the connector's own product
name, both predate Intune's current naming. Confirm the connector's current name and its
administration surface at `admin.hp.com` before acting on this section.
```

If a currency caveat specifically flagging "oldest first-party source in the domain" is still wanted,
point it at the Lenovo Support KB (`ht036206`, 2015) instead, or drop the superlative framing
entirely and caveat each source on its own age.

---

### CR-02: Matrix's HP "Lost password" Recovery cell is an unverified silence claim, traceable to no guide sentence and missing from the Key Gaps Summary

**File:** `docs/reference/firmware-oem-matrix.md:129`
**Issue:**
The Recovery table's HP row reads:

```
| HP | Not documented by vendor — HP's Recovery material addresses only the certificate model's
Endorsement Key, not legacy-password loss | Not documented by vendor — HP's Endorsement Key loss has
no documented recovery path | Escalate to HP Support and stop |
```

Three separate problems converge on the first cell:

1. **Not traceable to the guide (SC#1 violation).** `03-hp-bios-configuration.md:326-348`'s entire
   `## Recovery` section discusses only the Endorsement-Key-loss gap. It contains no sentence about
   legacy BIOS-password loss at all — not even an implicit one. There is nothing in the guide this
   matrix cell transposes.
2. **Never researched.** `150-RESEARCH.md`'s three named recovery gaps are U-1 (Lenovo lost
   supervisor password), U-2 (Lenovo lost certificate private key), and U-3 (HP lost Endorsement
   Key). "HP lost legacy BIOS password" is not one of them, and no page-check or search-term record
   for it exists anywhere in `150-RESEARCH.md` or `150-CONTEXT.md` (confirmed by grep — the term
   returns zero hits outside this one matrix cell and its cross-reference).
3. **Missing from its own Key Gaps Summary.** `firmware-oem-matrix.md:150-159`'s "Documentation
   silences" enumeration lists exactly three items (HP Endorsement Key, Lenovo certificate private
   key, Dell de-provisioning order) — not four. The table's own summary blockquote at
   `firmware-oem-matrix.md:132-133` reinforces the omission: *"HP's and Lenovo's key-loss cases are
   silences"* — naming only the key-loss cases, three lines below the password-loss cell it never
   mentions.

Every other "documented silence" cell in this file carries an `as-of` date and named pages checked
(D-57/D-58's own house rule, followed everywhere else in this matrix and both guides). This one cell
carries neither. This is exactly the "documented silence filed without the verification the rest of
the corpus requires" failure the phase's own D-14/D-19/D-57 machinery exists to prevent — it just
landed on a cell the machinery never actually enumerated.

**Fix:** Either research and source the claim properly (search HP's legacy-password documentation for
a loss/reset path, add an `as-of` date and pages-checked citation, and add the fourth bullet to Key
Gaps Summary), or, if the gap is intentionally out of scope, mark the cell honestly as unresearched
rather than as a checked silence:

```markdown
| HP | Out of this phase's research scope — see the Endorsement Key gap for HP's one researched
recovery silence | Not documented by vendor — HP's Endorsement Key loss has no documented recovery
path | Escalate to HP Support and stop |
```

Or add the fourth Key Gaps Summary bullet and its evidence pin, matching the other three's shape, if
the check is actually performed.

---

## Warnings

### WR-01: An announcement date is presented as a go-live date, unlabeled, in two files

**File:** `docs/operations/firmware-bios/03-hp-bios-configuration.md:31-33`, `docs/operations/firmware-bios/00-overview.md:49-51`
**Issue:**
Both files state, as settled fact:

> since April 2023, HP Connect has appeared under the Intune admin center's Partner portals tab

The two sources this claim rests on (both quoted or cited in `150-RESEARCH.md`'s Sources section)
say only that HP Connect's joining the Partner portals tab was *announced* in April 2023 — neither
uses "appeared," "launched," or any go-live language:

- *"In April 2023, we announced HP Connect would be joining Surface in the Partner portals tab of
  the Intune admin center."* (quoted directly in the HP guide at line 37)
- *"joining the HP Connect Portal announced in spring of 2023"* (the corroborating Oct-2025 post,
  cited only in `150-RESEARCH.md`, not quoted in the corpus)

An announcement that a feature "would be joining" is a reasonable but unstated basis for inferring a
contemporaneous go-live date — it is not what the source states. This corpus elsewhere labels exactly
this kind of stretch explicitly (the Lenovo Azure Key Vault RBAC/audit-logging comparison two
paragraphs later in the same overview: *"Lenovo makes no such comparative claim … Read that
comparison as this corpus's own inference"*). The April-2023 dating gets no equivalent label in
either file it appears in.

**Fix:** Either hedge the dating or label it as inference, in both files:

```markdown
HP Connect is also discoverable from inside Intune: Microsoft announced in April 2023 that HP
Connect would join the Intune admin center's Partner portals tab, the same discovery surface Dell's
own Management Portal uses (this corpus did not independently verify the exact date HP Connect began
appearing there).
```

---

### WR-02: Matrix's Offboarding table applies its own three-way cell vocabulary inconsistently to the same underlying fact

**File:** `docs/reference/firmware-oem-matrix.md:113, 117-118`
**Issue:**
The Offboarding table's Dell row:

```
| Dell | The ability to retrieve BIOS passwords through Intune once the subscription ends | n/a |
Not documented by vendor |
```

The adjacent "De-provisioning order" cell is correctly `Not documented by vendor` (a checked
silence — Dell KB 000356434 was re-confirmed 2026-08-25 to document no order at all). But the
"Countdown or deadline" cell in the same row is `n/a`, which per this file's own D-19 vocabulary
(stated at the top of `## Source Attribution`, `firmware-oem-matrix.md:169`) means a *structural*
absence, not a documented one. The table's own summary blockquote gives away the mismatch:

> Dell's countdown is `n/a` **because no de-provisioning order is documented**; Lenovo's countdown
> and order are `n/a` for a different reason — no vendor plane exists to lose.

"Because no de-provisioning order is documented" is a silence-shaped reason (we don't know), not a
structural-absence reason (we know there is none) — the summary itself distinguishes Dell's reasoning
from Lenovo's genuinely structural one in the same sentence, which means Dell's cell is using the
wrong tag by the vocabulary's own definition.

**Fix:** Change the Dell countdown cell to match the order cell:

```markdown
| Dell | The ability to retrieve BIOS passwords through Intune once the subscription ends | Not
documented by vendor | Not documented by vendor |
```

And adjust the table summary to state one reason for Dell (undocumented) and a different, genuinely
structural reason for Lenovo only.

---

### WR-03: A source-confidence claim overstates what was actually re-verified this session

**File:** `docs/operations/firmware-bios/04-lenovo-bios-configuration.md:169-174`
**Issue:**
The Prerequisites section states:

> Lenovo's own first-party pointers are bootstrap alternatives and never recovery paths: System
> Deployment Boot Mode, and the third-party Remote SVP option Lenovo names from Absolute. **Both were
> re-confirmed as directly sourced on 2026-08-25.**

`150-RESEARCH.md`'s own fetch log (D-55's research addendum, line 427) explicitly re-confirms only
one of the two claims this session: *"The 'System Deployment Boot Mode' bootstrap-alternative
language was independently re-confirmed this session as `[DIRECT]`-sourced, from a **different page**
than D-55 originally cites."* No equivalent statement anywhere in `150-RESEARCH.md` or
`150-CONTEXT.md` confirms the Remote SVP/Absolute claim was independently re-verified this session —
it is carried from the original milestone research (`PER-OEM-BIOS-GAP.md:346`) at `[RELAYED]`
confidence (search-summary sourced), the same confidence tier D-44 explicitly says must be
re-verified before being presented as directly sourced.

**Fix:** Scope the confidence claim to what the research trail actually supports:

```markdown
Lenovo's own first-party pointers are bootstrap alternatives and never recovery paths: System
Deployment Boot Mode, independently re-confirmed as directly sourced on 2026-08-25, and the
third-party Remote SVP option Lenovo names from Absolute, carried from the milestone research at its
original confidence.
```

---

## Info

### IN-01: Glossary "Sure Admin" entry names Sure Admin as one of its own two authentication models

**File:** `docs/_glossary.md:198-199`
**Issue:** *"Its two authentication models — Sure Admin and a legacy BIOS password — cannot coexist
on one device."* "Its" refers back to Sure Admin, so the sentence reads as "Sure Admin's two
authentication models are Sure Admin and a legacy BIOS password" — a self-referential construction.
The intended referent is HP (or HP Connect), not Sure Admin itself.
**Fix:**

```markdown
HP's two authentication models — Sure Admin and a legacy BIOS password — cannot coexist on one
device.
```

---

_Reviewed: 2026-08-26T03:57:29Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
