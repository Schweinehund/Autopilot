---
phase: 147-linux-update-delivery
reviewed: 2026-08-21T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - docs/operations/patch-management/05-linux-update-delivery.md
  - docs/operations/patch-management/00-overview.md
  - .planning/REQUIREMENTS.md
  - .planning/research/PITFALLS.md
findings:
  critical: 3
  warning: 11
  info: 0
  total: 14
status: issues_found
---

# Phase 147: Code Review Report

**Reviewed:** 2026-08-21
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Documentation corpus review, not application code. Four files in scope: the new
`05-linux-update-delivery.md` (482 lines), the five-platform sweep of `00-overview.md`, and two
planning artifacts.

The sourcing discipline that this phase was organised around largely held. I verified every load-bearing
first-party claim against the phase's own byte-verified quote bank (`147-RESEARCH.md`) and against the
in-repo files the guide reconciles with:

- The `Allowed-Origins` block quoted as "the default" is the **correct** block — `-updates`,
  `-proposed` and `-backports` are all commented with `//` plus two spaces, `grep -c 'PPA'` returns 0,
  and the block matches D-14's re-confirmed bytes exactly. LNX-03's central claim is **not** inverted.
- The Ubuntu Pro figure-to-tier bindings are all **correct**: 5 physical machines → personal use;
  50 machines → official Ubuntu Community members; 10 years → ESM over the entire Ubuntu Archive;
  15 years → Legacy add-on. No re-pairing.
- `/run/reboot-required` and `/var/run/reboot-required` are both present, each attributed to the page
  that carries it, with **no** asserted equivalence.
- Safety prohibitions hold: zero copy-pasteable package-upgrade commands
  (`grep -nE 'apt(-get)? +(upgrade|dist-upgrade|full-upgrade|install)|sudo apt'` → 0), zero code
  fences, and the guide explicitly bars removing a security origin, disabling automatic security
  updates, and widening origins outside a change process.
- All eight relative link targets resolve; both tables in `05-` and the six-column table in `00-` have
  correct cell counts on every row; all 8 declared anchors exist and no internal `](#...)` reference is
  dangling.
- The `**Source:**` date shapes are internally consistent and match `147-RESEARCH.md`'s
  `## External Sources — Verified` table (Microsoft = `updated_at`; Canonical = commit date or
  `(retrieved …)` plus an absence clause).

What did **not** hold is the class of defect this corpus has a documented history of and no validator
can see: two Linux-surface claims in the guide that are factually wrong and contradict the guide's own
central recommendation, and a repair in `PITFALLS.md` that re-commits the exact attribution defect it
was written to fix. Eleven further contradictions and overclaims follow.

I did **not** report the ruled deviations recorded in `147-01-SUMMARY.md` / `147-02-SUMMARY.md`
(RHEL 9/10 out of scope, `update-notifier-common` as a documented silence, the four stale sibling
routing blockquotes per D-49, the stale Windows Deferral table cell, the absent `doc_id`/registry row).

## Critical Issues

### CR-01: The guide names a Linux surface that does not exist — "custom attribute"

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:275` and `:279`

**Issue:** The guide offers "a discovery script or **custom attribute**" as the implementation path for
reading the reboot marker, then repeats it: "This is the compliance and **custom-attribute** source for
'is this device patched?'".

Intune custom attributes are a **macOS-only** surface. The corpus itself says so at the only other
occurrence in `docs/`:

```
docs/macos-lifecycle/00-ade-lifecycle.md:355
| Intune Management Extension (IME) | ... | Shell scripts, DMG/PKG apps, custom compliance scripts, custom attributes | ...
```

`grep -riE "custom[ -]attribute" docs/` returns exactly three hits: that macOS row, and the two new
Linux ones. There is no custom-attributes blade for Linux, no first-party source in `147-RESEARCH.md`
mentions one, and no requirement asks for one.

This is not only wrong, it is self-contradicting. The same guide states twice that the compliance
script is the **only** route:

- `:300-303` — "The only way a tenant learns whether a given device is attached is a custom compliance
  script that asks the device and reports the answer back"
- `:375-377` — "reaches a tenant by exactly the same route — a custom compliance script asking the
  device … **There is no second, privileged path to it.**"

`:275` and `:279` hand the reader exactly that second path. An administrator who goes looking for a
Linux custom attribute in the admin center finds nothing, and the guide's LNX-01 boundary claim reads
as unreliable from that point on.

**Fix:** Delete both mentions. The surface is the compliance discovery script named everywhere else in
the file.

```markdown
:275  actionable form is simply to check both: a discovery script that tests for the marker at
      `/run/reboot-required` and at `/var/run/reboot-required` returns the right answer whichever
      spelling a given device uses.

:279  This is the compliance source for "is this device patched?".
```

---

### CR-02: "cannot read a root-owned state file" over-reads the source and voids the guide's own primary recommendation

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:369` (claim), `:365` (the quote
it generalises from), `:342`, `:373`, `:414-415` (the recommendation it contradicts)

**Issue:** Microsoft's quoted constraint at `:365` is scoped to elevation:

> On Linux, discovery scripts run in the user's context. They can't check for system-level settings
> that require elevation. An example of this limitation is the state/hash of the /etc/sudoers file.

The guide restates this at `:369` as a different, broader claim:

> A discovery script therefore cannot read **a root-owned state file**, and a rule built on one will
> simply fail to evaluate.

Root ownership is not the constraint; requiring elevation is. Microsoft's own example, `/etc/sudoers`,
is mode `0440 root:root` — unreadable without elevation. The guide's generalisation sweeps in every
world-readable root-owned file.

The consequence is immediate and load-bearing: **the reboot-required marker is a root-created file**.
The guide recommends reading it as the remedy in the very next sentence (`:373` — "Read the reboot
marker described under Reboot Handling instead"), and six more times across the file (`:278-282`,
`:342-343`, `:414-416`, `:451`). Under the guide's own stated ceiling, the recommended remedy is
excluded. A careful reader concludes the guide's central actionable advice cannot work; a careless one
falls back to the package-version rule the guide spends a section warning against.

The same over-generalisation is the source line in `.planning/research/PITFALLS.md:538` ("a compliance
rule cannot read a root-owned patch-state file"), so it was inherited rather than invented — which
makes it more likely to propagate to Phase 148 and Phase 151.

**Fix:** Restate the ceiling in the source's own terms and say explicitly why the marker survives it.

```markdown
A discovery script therefore cannot read state that requires elevation — Microsoft's own example is
the state/hash of `/etc/sudoers` — and a rule built on such state will simply fail to evaluate. The
reboot-required marker is not in that class: the rule tests for a file's existence, not for a
privileged setting. A rule that quietly falls back to installed package version is worse than one
that fails outright: …
```

Correct `PITFALLS.md:538` at source in the same pass so the wrong generalisation stops being ground
truth for downstream phases.

---

### CR-03: The PITFALLS repair leaves a code-formatted literal newly attributed to a page that does not carry it

**File:** `.planning/research/PITFALLS.md:541`

**Issue:** The edit fixes the `update-notifier-common` half and, in the same sentence, **sharpens** the
attribution on the first half:

> `unattended-upgrades` will **never** reboot unless `Unattended-Upgrade::Automatic-Reboot "true"` is
> set; Canonical documents the default as `false`. **Source for that half:**
> `ubuntu.com/server/docs/how-to/software/automatic-updates/`.

`147-RESEARCH.md` D-12 measured that page and ruled on exactly this string:

> **`Automatic-Reboot "true"` does not exist on the cited page.** Line 328 is
> `Unattended-Upgrade::Automatic-Reboot "false";` … The only `"true"` assignment is a **different
> key**, `Automatic-Reboot-WithUsers "true";` … The claim is recoverable by rewording — *"set
> `Unattended-Upgrade::Automatic-Reboot` to `true`; Canonical documents the default as `false`"* …
> **Never ship the draft's original string as a verbatim quote.**

The shipped guide applied that rewording correctly (`05-…md:285-287`). The PITFALLS repair did not.
It kept the inline-code literal — the form that reads as a page verbatim — and attached a fresh,
narrower source claim to it. The page carries a same-shape decoy for a *different key*, which is the
precise trap D-12 flagged and precisely the defect class (`update-notifier` / `update-notifier-common`)
that the same sentence was edited to fix. A future phase greping `PITFALLS.md` for a sourced Canonical
literal gets a false confirmation.

**Fix:** Apply D-12's ruling to the surviving half.

```markdown
**On Ubuntu, the reboot never happens by itself.** **[SOURCED, secondary]** `unattended-upgrades`
will **never** reboot unless `Unattended-Upgrade::Automatic-Reboot` is set to `true`; Canonical
documents the default as `false`, and the only `"true"` assignment on that page belongs to a
different key, `Unattended-Upgrade::Automatic-Reboot-WithUsers`. Source for that half: …
```

## Warnings

### WR-01: "Four facts combine" followed by four bullets whose fourth says "The three together"

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:382-394`

**Issue:** The Root-context hazard opens "**Four facts combine, and none of them is safe to read on its
own**" and then lists four bullets — but the fourth is not a fact, it is the conclusion, and it says so:
"**The three together** produce a package-upgrade script running as root … 96 times a day."

The count contradicts itself inside twelve lines, in the guide's single most consequential callout, and
it is the callout a verifier reads against SC#2's four conjuncts. (The arithmetic itself is right:
1,440 / 15 = 96.)

**Fix:** Either say "Three facts combine" and keep the fourth bullet as the un-numbered consequence, or
promote the consequence out of the list:

```markdown
**Three facts combine, and none of them is safe to read on its own:**

- The **Root** execution context …
- The **Every 15 minutes** execution frequency …
- The platform-script article documents **no run-time cap on that surface** …

Together they produce a package-upgrade script running as root, on every assigned device, 96 times a
day. The arithmetic is exact: 1,440 minutes in a day divided by 15 minutes is 96 runs, per device,
fleet-wide.
```

---

### WR-02: The overview now asserts a cross-referencing state the phase deliberately did not create

**File:** `docs/operations/patch-management/00-overview.md:182-184`

**Issue:** The five-platform sweep changed "The **four** guides cross-reference each other" to "The
**five** guides cross-reference each other and route back to this overview via their own Platform
applicability blockquotes."

The second half is true — all five route back. The first half is now false in **both** directions:

- `01`, `02`, `03`, `04` each enumerate the other three siblings and omit Linux. This is D-49's
  knowingly-accepted staleness — **not** a finding.
- `05-linux-update-delivery.md` links **none** of the four platform siblings.
  `grep -nE '0[12346]-(windows|macos|ios|android)' 05-linux-update-delivery.md` → 0 hits.

D-49 accepted *not editing 01-04*. It did not license the hub to make an affirmative claim about a
state that does not exist. The sweep converted an accepted silence into a false statement — inside the
same file that carries the routing contract.

**Fix:** Scope the sentence to what is true, which needs no edits to 01-04:

```markdown
Each per-platform guide contains the configuration steps, prerequisites, deadlines callout (where
applicable), and Related Resources / External References footer for that platform. All five route
back to this overview via their own Platform applicability blockquotes.
```

---

### WR-03: The RHEL-8 `**Source:**` line attributes a claim the phase never verified on that page

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:47-50`

**Issue:** The guide states "Intune's custom-settings-for-Linux page still names RHEL 8" and attaches a
standalone `**Source:**` line pointing at
`learn.microsoft.com/…/configuration/custom-settings-linux` (updated 2026-07-01).

The phrasing was correctly reused from `docs/decision-trees/09-linux-triage.md:25` per D-58 — but that
file carries the claim as a **bare blockquote with no source line**. This phase upgraded an unsourced
corpus assertion into a formally cited one. `147-RESEARCH.md`'s `## External Sources — Verified` row 6
records that fetch as confirming only two things: the execution-defaults blockquote (D-53) and the
absence of any run-time-cap token (D-51). There is no record anywhere in the phase artifacts that the
string `RHEL 8` was observed on that page.

The claim is plausible and probably true. The problem is the evidence chain: this is the exact shape of
the defect class the phase's own D-13/D-14/D-32 work existed to eliminate, and no validator in this
repo can catch it (`grep -rn "Source:" scripts/` → 0).

**Fix:** Either record the verification (fetch the page, confirm the `RHEL 8` string, note it in the
phase artifacts), or drop the `**Source:**` line and reuse `09-linux-triage.md`'s unsourced blockquote
shape until it is verified.

---

### WR-04: The 24.04 / `noble` scoping clause does not reach `## Reboot Handling`

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:175-178` (scope) vs `:244-248`,
`:264-269` (unscoped quotes from the same page)

**Issue:** The scoping clause is written section-local — "**Everything in this section** is documented
by Canonical for Ubuntu 24.04, codename `noble`" — and lives in `## Configuring unattended-upgrades`.
`## Reboot Handling` is a separate H2, and it quotes the **same** Canonical `automatic-updates` page
twice (the `Automatic-Reboot` / `Automatic-Reboot-WithUsers` defaults, and the
`/var/run/reboot-required` log line) with no scoping at all.

D-15 is explicit: "**Scope every `unattended-upgrades` quote** as *'as documented for 24.04
(`noble`)'*" — because `26.04` occurs zero times on that page while the corpus's supported list
foregrounds it. As shipped, an admin on 26.04 reads the reboot defaults as validated for their release.

**Fix:** Add a one-line scoping sentence to `## Reboot Handling`, or change `:175` to a file-level
scope statement placed before `## Configuring unattended-upgrades` that names both sections.

---

### WR-05: "Expanded" vs "Extended" Security Maintenance — the guide renames the entries in the block it quotes, unflagged

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:187` (quote) vs `:203`, `:215`,
`:306`, `:375`, `:435` (prose)

**Issue:** The verbatim Canonical config block at `:187` reads
`// Extended Security Maintenance; doesn't necessarily exist for`. The guide's prose describing **those
exact two entries** calls them "the **Expanded** Security Maintenance apps-security pocket and the
**Expanded** Security Maintenance infra-security pocket" (`:203-204`), and uses "Expanded" five more
times. The `ubuntu.com/pro` quote at `:313` does say "Expanded Security Maintenance (ESM)" — so both
spellings are first-party, from two different Canonical pages.

That is the same situation as `/run/reboot-required` vs `/var/run/reboot-required`, which this guide
handles exemplarily (`:271-276`: both stated, each attributed, no equivalence asserted). Here the
divergence is silently flattened in the direction the quoted block contradicts, twelve lines below the
block. A reader comparing the two concludes one of them is a transcription error.

**Fix:** State the divergence once, in the shape already used for the path spellings:

```markdown
Canonical's configuration comment writes "Extended Security Maintenance" while `ubuntu.com/pro` writes
"Expanded Security Maintenance"; both are Canonical's own, and this guide uses the `ubuntu.com/pro`
spelling for the entitlement and quotes the configuration comment as written.
```

---

### WR-06: "documented end to end" overclaims what `04-app-delivery.md` contains

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:122-124` and `:459-460`

**Issue:** The guide routes the reader away for the mechanism: "The delivery mechanism itself —
authoring, upload, assignment, exit-code reporting — is already **documented end to end** in
[Linux App Delivery] and is not re-authored here", repeated in Related Resources as "The Bash platform
script mechanism itself: authoring, upload, assignment, exit-code reporting and the supply-chain
callout."

`docs/admin-setup-linux/04-app-delivery.md` is a ~115-line concept overview. It carries the four
elements only as a four-step bullet list (`:47-50`), and it self-scopes twice against exactly this
reading:

- `:52` — "Common patterns (**concept-level** — full deep-dive deferred to v1.5.1 LIN-DEFER-01 …)"
- `:78` — "**This is a concept illustration only.** See LIN-DEFER-01 … for production-grade script
  patterns including error handling, idempotency, and exit-code discipline."

`147-01-SUMMARY.md`'s own D-43 confirms the promise is still open: "LIN-DEFER-01 is **NOT** discharged
by Phase 147 … the standing promise at `04-app-delivery.md:104/:78` … stays open." The guide therefore
routes a reader looking for the mechanism at fleet scale into a page that says it does not have it —
while the guide's own hazard section tells that reader the script's lock-contention and
concurrent-run behaviour is theirs to design.

**Fix:** Downgrade the claim to what the target carries, at both sites:

```markdown
The delivery mechanism itself — authoring, upload, assignment and exit-code reporting — is introduced
at concept level in [Linux App Delivery](../../admin-setup-linux/04-app-delivery.md) and is not
re-authored here; the production-grade script patterns it defers to LIN-DEFER-01 are still open.
```

---

### WR-07: The D-73 driver correction drops the automatic-approval scoping that DRV-02 requires ride with it

**File:** `docs/operations/patch-management/00-overview.md:87-97`

**Issue:** The corrected clause now reads, unqualified:

> the driver policy has its own 0–30 day deferral instead, configured by its **Make updates available
> after (days)** setting and counted from the day the update was added to the policy rather than from
> the day the OEM published it.

`docs/operations/patch-management/06-windows-driver-firmware-updates.md:310-316` carries the scoping
condition as a first-party quote — "The deferral period only applies to **automatically approved**
driver and firmware updates. An admin must specify the date to start offering a driver with any manual
approval." — and `.planning/REQUIREMENTS.md:42` states DRV-02 requires it: "The scoping note **rides
with it** — the deferral applies only to **automatically approved** driver and firmware updates."

As shipped, an admin reading the hub concludes every driver approval inherits the deferral. Manual
approvals do not. The hub's `**Source:**` (`configure-driver-update-policy`) itself scopes the setting
to updates "automatically added to the policy with a status of *Approved*".

**Fix:** Six words restore the scoping without changing the hub's altitude:

```markdown
… the driver policy has its own 0–30 day deferral instead — scoped to automatically approved updates —
configured by its **Make updates available after (days)** setting and counted from …
```

---

### WR-08: The hazard bullet asserts the source *states* an absence it merely omits

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:390`

**Issue:** "The platform-script **documentation states** *no documented run-time cap on that surface*"
reads as Microsoft affirmatively documenting the absence. It does not. `147-RESEARCH.md` D-51 records
the finding correctly as a measured absence: the page "carr[ies] **no** timeout/MB/run-time-cap token
anywhere."

The guide gets this right at `:154-156` ("The platform-script article **documents no** maximum run
time, no timeout and no size limit") and wrong at `:390`. The two statements sit in the same file about
the same page. In a corpus whose failure mode is claims attributed to pages that do not carry them,
this is the wrong sentence to leave standing.

**Fix:** `The platform-script article documents **no** run-time cap on that surface — no maximum
duration, no timeout, no size limit. Nothing bounds a long-running invocation.`

---

### WR-09: LNX-03 flipped to Complete against text that names only one reboot-marker spelling

**File:** `.planning/REQUIREMENTS.md:53`

**Issue:** LNX-03's requirement text still reads "reboot-required detection via
`/var/run/reboot-required`" and is now `[x]` Complete. The phase's owner-ruled D-02 outcome is that
**two** spellings exist, that they come from two different Canonical pages, and that **no equivalence
between them may be asserted** — which is what the guide ships (`:271-276`).

The same bullet already carries an `**[OWNER-RULED IN SCOPE 2026-08-20]**` marker recording the
`update-notifier-common` correction. The path-spelling correction — a larger change to what LNX-03
actually means, and one that required an owner escalation path — is not recorded at all. Every future
phase reading REQUIREMENTS for the Linux reboot signal gets the single-spelling version.

**Fix:** Extend the existing marker rather than adding a second one:

```markdown
… Treat it as a documented silence, never as a sourced prerequisite. The reboot-required marker ships
as **two** spellings, each attributed to the page that carries it — `/run/reboot-required`
(`upgrade-your-release`) and `/var/run/reboot-required` (`automatic-updates` log output) — with no
equivalence asserted between them (Phase 147 D-02); a rule should test both paths.
```

---

### WR-10: The overview's Linux cadence clause narrows Linux to the security pocket, which the guide it routes to disproves

**File:** `docs/operations/patch-management/00-overview.md:195`

**Issue:** The Cadence-alignment bullet gained "Linux distro-native `apt` updates on the distribution's
own **security-pocket** cadence."

`05-linux-update-delivery.md:200-206` exists specifically to kill that reading:

> **Four origins are enabled by default, not one.** … **The default is therefore not security-only** —
> the base release origin is enabled, so a package can be upgraded from the release pocket with no
> security pocket involved at all.

The hub sentence is the "usual assumption" the guide names and refutes, printed in the file whose job
is to route the reader to that refutation. The overview's own Linux Cadence-model table cell gets it
right ("distro-native `apt` + `unattended-upgrades`, no Intune orchestration").

**Fix:** `Linux distro-native `apt` updates on the distribution's own release and security-pocket
cadence`, or simply reuse the table cell's wording.

---

### WR-11: Unsourced categorical claim placed directly beneath a sourced blockquote

**File:** `docs/operations/patch-management/05-linux-update-delivery.md:321-323`

**Issue:** Three lines after the `ubuntu.com/pro` blockquote and its `**Source:**` line, the guide
asserts: "**A managed enterprise fleet is on none of the free tiers at all** — an Intune-managed Ubuntu
estate **is** a commercial subscription, and the free figures are context for the model rather than an
option for the fleet."

Neither Canonical page cited carries this. `ubuntu.com/pro` says the free tier is "for personal use";
it does not say an Intune-managed estate is necessarily commercial, and the guide offers no route for a
reader to check. It is a reasonable inference, but it is written in the same declarative register as
the sourced material immediately above it, in a file where every other load-bearing claim carries a
`**Source:**` line within two lines. The one paragraph a reader is most likely to quote to a
procurement conversation is the one with no backing.

**Fix:** Mark it as the guide's own reading rather than a Canonical fact:

```markdown
The free tiers are scoped to personal use and to official Ubuntu Community members; a managed
enterprise estate does not fall inside either, so treat the free figures as context for the
entitlement model rather than as an option for the fleet.
```

---

_Reviewed: 2026-08-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
