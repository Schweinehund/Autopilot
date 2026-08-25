---
phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
reviewed: 2026-08-25T05:01:21Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - docs/_glossary.md
  - docs/operations/firmware-bios/00-overview.md
  - docs/operations/firmware-bios/01-windows-dfci.md
findings:
  critical: 3
  warning: 10
  info: 5
  total: 18
status: issues_found
---

# Phase 149: Code Review Report

**Reviewed:** 2026-08-25T05:01:21Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Three documentation files reviewed: two new operations guides founding the firmware/BIOS domain
(`00-overview.md`, `01-windows-dfci.md`) and a four-term addition to `docs/_glossary.md`.

What holds up. The ruled Surface-removal warning (`01:470-476`) is present, carries all three
required clauses (deletes registration before unlock / default sequence is the inverse / not safe on
a non-Surface DFCI fleet), and is positioned above the numbered steps with an explicit "Read the
warning before the steps" instruction at `01:468`. The default retire order (unlock → wipe → delete
record last) is stated correctly and its inverse-failure mode is explained. Every cross-file claim I
could check against a target file is accurate: the four-row Import Methods table in
`docs/lifecycle/01-hardware-hash.md`, the APv1-deregistration prerequisite in
`docs/admin-setup-apv2/00-overview.md`, the manufacturer/model/serial CSV in
`docs/admin-setup-apv2/04-corporate-identifiers.md`, the L1 audience of
`docs/decision-trees/03-tpm-attestation.md`, and the VBS→Hotpatch coverage in
`docs/operations/patch-management/01-windows-wufb-rings.md` (the link text promises the driver and
firmware policy and the target does carry that stub). Counts verified correct: nine / six / eight
OEMs, four registration channels, eight setting categories, three-part gate, three retire steps,
four not-owned adjacencies. The three-way OEM conflict, the OEM ordering, the Dell/HP/Lenovo
absences, the single-bricking-quote-per-file split and the deliberate non-reproduction of the vendor
matrices are all as designed and are not reported.

What does not. Three findings rise to BLOCKER. The recovery section sells refresh-from-network as
the route out of a wrong-order retire without noting that a boot lockdown documented 160 lines
earlier in the same file destroys exactly that route — the file contains both facts and never
connects them, on the one page a reader consults after already bricking something. The
virtualization chain and its anti-feature callout are stated as universal properties of the
interface while the file's own Surface quote lists that setting as one that does not apply to
Surface, and the file separately states such non-application is silent in the console. And the Dell
custody claim — the load-bearing premise of the entire routing model — is unsourced yet sits
directly above a `**Source:**` line whose quote supports only "Currently, only Dell is supported",
in a document that elsewhere flags a far weaker Lenovo inference in its own paragraph.

Below that: one self-referential count that does not reproduce (I count 10, the file says twelve),
an unsourced firmware-integration mechanism claim asserted twice in different words, two paragraphs
of GSD planning vocabulary addressed to reviewers rather than administrators (`requirements
document`, `success criterion`, `over-delivery` — zero occurrences anywhere else in the 249-doc
corpus), a stale "a second Microsoft page" that undercounts the deliberate three-list conflict, and
a glossary `last_verified` that now asserts verification two months before the content it covers was
written.

## Narrative Findings (AI reviewer)

## Critical Issues

### CR-01: Recovery section promises a route the same file documents how to destroy

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:444-476`
**Issue:**
The Recovery section is the file's safety net for a device retired in the wrong order. It states the
route out unconditionally:

- `01:458-463` — "Refreshing management from the network is also a physical operation performed at
  the device" — presented as always available, cost is only bench time.
- `01:473-476` — "This order is recoverable **only because** Surface's own UEFI menu carries the
  refresh-from-network command".

But 160 lines earlier the same file quotes Microsoft saying that command can be taken away by a DFCI
profile the guide itself teaches how to build (`01:304`, Surface source):

> If you disable both Boot from external media and USB type A—and the device becomes unbootable for
> any reason—you won't be able to recover the device without replacing the SSD. You'll be unable to
> boot from external media and perform **a PXE boot or DFCI refresh from the network**.

So the recovery route is conditional on a boot configuration the guide never re-checks at the point
of recovery. A reader who locks external boot + USB type A (a plausible kiosk/high-security profile,
and precisely the configuration `01:289-310` describes) and then retires in the wrong order has no
route at all — the section that exists to catch that reader tells them there is one. The Surface
removal steps at `01:478-484` compound it: step 3 is "Connect the device to wired Internet with a
Surface-branded Ethernet adapter", which is exactly the boot/port path the earlier trap may have
disabled.

This is the highest-consequence unstated interaction in the domain: outcome is SSD replacement, and
the reader meets this page after the mistake, not before.

**Fix:** Add a precondition to the recovery section, before the Surface steps, wiring it to the
existing trap:

```markdown
**Precondition: the refresh-from-network route can itself have been configured away.** A device
whose last DFCI profile disabled both Boot from external media (USB, SD) and USB type A cannot
perform a DFCI refresh from the network — the Surface guide names that pairing as unrecoverable
without replacing the SSD (see the boot-and-port trap above). Check the last-applied profile's boot
and port values before planning any recovery on this path. If both were disabled, there is no
software route back on any OEM, Surface included.
```

And cross-link forward from the trap at `01:308-310`: note there that disabling the pair also
removes the recovery path documented in "Recovering a Device Locked in the Wrong Order".

---

### CR-02: Virtualization chain and callout stated universally, contradicted by the file's own Surface quote

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:255-258, 320-336, 503-508`
**Issue:**
The file states as an unqualified property of the interface:

- `01:256-258` — "there is no Disabled value for it, so DFCI can switch platform virtualization on
  and structurally cannot switch it off"
- `01:323-326` — "DFCI can switch the platform's CPU and IO virtualization capabilities on"
- `01:503-505` — "**DFCI can switch platform virtualization on and structurally cannot switch it
  off.**"

The same file, at `01:214-219`, quotes Microsoft's Surface page:

> DFCI in Intune includes settings that don't currently apply to Surface devices: **CPU and IO
> virtualization**, Disable Boot from network adapters, Windows Platform Binary Table (WPBT), NFC,
> and SD card.

Surface is the only OEM this guide profiles in depth and the only one with a dedicated Microsoft
page. On that fleet, DFCI cannot switch platform virtualization on either — the setting is inert.
The file never reconciles the two, and the "on" half of the asymmetry is the premise the whole
update-eligibility chain at `01:320-340` rests on. Worse, the file itself establishes at `01:210-212`
that non-application is silent: "nothing in the Intune console presents that as an error, so the
absence is easy to miss."

Net reader outcome: an administrator with a Surface fleet whose devices are hotpatch-ineligible for
lack of VBS reads this chain, sets CPU and IO virtualization to Enabled in a DFCI profile, sees no
error, and gets nothing. That is incorrect actionable guidance produced by an internal contradiction,
not by a source ambiguity.

**Fix:** Qualify all three sites against the inert-on-Surface quote already in the file. At the
first occurrence (`01:255-258`) and in the callout (`01:503-508`):

```markdown
**Scope caveat: not on Surface.** The Surface guide lists CPU and IO virtualization among the
settings that do not currently apply to Surface devices (quoted in Surface Eligibility above), so on
Surface hardware DFCI can neither enable nor disable it, and the profile reports no error either
way. The asymmetry below describes the interface as documented for the OEMs where the setting does
apply.
```

At `01:327-329`, the "therefore" step is unaffected — the fix on the manufacturer's own BIOS surface
is correct for Surface too — but say so explicitly rather than leaving the reader to infer it.

---

### CR-03: Dell custody claim is unsourced and sits under a Source line that does not support it

**File:** `docs/operations/firmware-bios/00-overview.md:32-45`
**Issue:**
The overview's stated organising principle is custody: "This overview routes by custody of the BIOS
secret rather than by tool" (`00:22`). Two of the three custody claims are quoted first-party:

- HP (`00:51`) — "Passwords are managed by HP Connect and stored in a cloud vault." Supports the claim.
- Lenovo (`00:59`) — Azure Key Vault quote, and the comparative inference beyond it is explicitly
  disclaimed at `00:63-68` ("Lenovo makes no such comparative claim ... Read that comparison as this
  corpus's own inference").

The Dell claim is not:

- `00:34` (table) — "Microsoft Intune, inside your tenant"
- `00:39-41` — "The BIOS password is held by Intune inside your own tenant, **with no vendor cloud
  service between the console and the device**."
- Quote supplied: "Currently, only Dell is supported." (`00:43`)
- `**Source:**` line: `00:45`

The quote establishes vendor coverage, not password custody. Because the `**Source:**` line follows
the whole paragraph, a reader — and any downstream verifier — reads it as sourcing the custody
sentence. It does not. The claim may well be true, but it is asserted, and this document applies a
visibly stricter standard to a weaker Lenovo inference two paragraphs later. The asymmetry is the
tell.

Consequence is not cosmetic: this is row one of the routing table and the premise of the "what
happens when the relationship ends" argument at `00:70-72`. If Dell custody is wrong, the domain's
routing model is wrong.

**Fix:** Either quote the custody fact from the same Microsoft page (the surface-comparison table on
`configure-bios-windows` carries a BIOS-password row — quote that row's Dell/BIOS-configuration
value verbatim under its own `**Source:**` line), or demote the claim to a labelled inference in the
same form the Lenovo paragraph already uses:

```markdown
The page quoted above establishes vendor coverage, not custody. That Intune holds the Dell BIOS
password inside your tenant is this corpus's reading of the profile's own design — the password is
supplied to and stored by the Intune profile — rather than a sentence Microsoft states. Do not read
the Source line below as covering it.
```

Also drop or source "with no vendor cloud service between the console and the device", which is a
stronger negative-existential than anything cited.

---

## Warnings

### WR-01: "twelve individual setting names" does not reproduce — I count 10

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:260-269`
**Issue:**
The file pins a self-referential count and dates it: "Applying that rule honestly means **twelve**
individual setting names still appear in this file, **counted at this revision**, across this
section, the Surface section above, the retire sequence below and the callouts near the end."

Full enumeration of individual (non-category) DFCI setting names in the file:

| # | Setting name | Lines |
|---|---|---|
| 1 | CPU and IO virtualization | 217, 256, 323, 324, 503 |
| 2 | Boot from network adapters (Surface page renders it "Disable Boot from network adapters") | 217, 222-223, 291, 295 |
| 3 | Windows Platform Binary Table (WPBT) | 217 |
| 4 | NFC | 217 |
| 5 | SD card | 217 |
| 6 | Microphones | 273 |
| 7 | Wi-Fi | 273, 280, 284 |
| 8 | Boot from external media (USB, SD) | 290, 295, 304 |
| 9 | USB type A | 304 |
| 10 | Allow local user to change UEFI (BIOS) settings | 396 |

That is **10** distinct settings, or **11** distinct name-strings if the Disable-prefixed Surface
variant counts separately (the file itself treats it as a display-name divergence of one setting at
`01:221-225`). Twelve is only reachable by counting the two *category* names used in the conflict
trap — "Microphones and speakers" and "Radios (Bluetooth, Wi-Fi, NFC, etc.)" — as individual
settings, which the same section explicitly refuses to do ("Some DFCI settings are categories ... and
some are granular members"). If categories count, the correct number is 18, because all eight are
named at `01:246-248` and seven again at `01:513-514`.

This is the stale-count class this corpus has shipped repeatedly, and here the count went stale (or
was never right) inside its own authoring phase.

**Fix:** Either correct to ten and state the counting rule, or delete the number. The paragraph's
argument survives without it:

```markdown
Applying that rule honestly means a bounded set of individual setting names still appears in this
file — across this section, the Surface section above, the retire sequence below and the callouts
near the end. The rule bounds which ones, not whether any do.
```

Deleting is preferable: a self-referential count is guaranteed to rot on the next edit and no reader
benefits from it.

---

### WR-02: Unsourced firmware-integration mechanism asserted as fact, twice, in two different wordings

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:176-182, 523-529`
**Issue:**
Two paragraphs explain *why* Dell, HP and Lenovo lack DFCI, in causal terms, with no `**Source:**`
line anywhere in either paragraph:

- `01:179-180` — "because the manufacturer never integrated the DFCI code and **the Microsoft Device
  Management Trust certificate** into the firmware in the first place"
- `01:526-527` — "because the manufacturer never carried the DFCI code and **the Microsoft trust
  anchor** into the firmware"

What Microsoft actually publishes is an absence from a list. Absence from a support list does not
establish that a vendor "never integrated" anything — it is consistent with integration existing but
unsupported, with a partnership not concluded, or with the list being incomplete (the same page says
"Other OEMs are pending"). The file is scrupulous about exactly this distinction elsewhere (`01:109-111`
"Microsoft does not state it, and no citation here should be read as if it did"; `00:152-153` "No
Microsoft page states the exclusion as a limitation"), which makes this pair a self-inconsistency
rather than an oversight.

Compounding it: "Microsoft Device Management Trust certificate" occurs nowhere else in `docs/` (grep:
1 file), so it is an unresolvable term for a reader, and the two occurrences name the same artifact
differently ("certificate" vs "trust anchor"), so a reader cannot tell whether one thing or two is
meant.

**Fix:** Reduce to what the sources support, and either drop the mechanism or label it as inference:

```markdown
On that hardware DFCI is unavailable rather than declined: none of Microsoft's three published
manufacturer lists names them, so there is no profile to assign and no license or firmware setting
that changes the answer. Microsoft publishes no statement of *why*, and this corpus does not infer
one.
```

If the mechanism is retained, give it one consistent name and a citation (the Project Mu DfciPkg
documentation already cited at `01:167` is the plausible home for it).

---

### WR-03: GSD planning vocabulary shipped to readers — "requirements document", "success criterion", "over-delivery"

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:233-241, 260-269, 488-494`
**Issue:**
Three passages address the phase's own reviewers rather than an Intune administrator, and reference
artifacts the reader cannot open (`.planning/`):

- `01:234-236` — "That is a deliberate scope choice, not an omission: **the requirements document's
  Out of Scope section** bars per-model matrices literally"
- `01:266-269` — "It is also why the **requirements bar** on per-model matrices does not reach the
  page cited above"
- `01:488-494` — "**No requirement clause and no success criterion** for this domain's **initial
  delivery** covers a recovery runbook; retire and reuse are what they ask for, and this section is
  **over-delivery** against both. It ships anyway on two grounds..."

Corpus-wide grep across `docs/` (249+ files):

| Term | Files containing it |
|---|---|
| `requirements document` | 1 — this file |
| `success criterion` | 1 — this file |
| `Out of Scope section` | 1 — this file |
| `over-delivery` | 1 — this file |
| `at this revision` | 1 — this file |

Zero precedent. "who they ask for" has no referent for a reader; "initial delivery" names a phase
boundary invisible outside `.planning/`. The `01:488-494` paragraph in particular is ~90 words of
justification for a section's existence, addressed to an audience that is not reading the file.

**Fix:** Keep the reader-useful half of each passage (the durable-vs-high-churn reasoning and the
"check the vendor page" instruction), delete the planning half. For `01:488-494`, replace the whole
paragraph with a one-line orientation:

```markdown
This section is written for the service-desk reader who meets these devices after the mistake rather
than before it. Every step and constraint in it is sourced first-party.
```

For `01:234-236` and `01:266-269`, drop the "requirements document" clauses; the independent
rationale already present ("a model list is high-churn data with a short useful life ... wrong the
first time Microsoft ships a new Surface generation, and wrong silently") carries the point alone.

---

### WR-04: Overview says one conflicting list; the DFCI guide carries two

**File:** `docs/operations/firmware-bios/00-overview.md:80-84, 194-196`
**Issue:**
`00:82-84` describes `01-windows-dfci.md` as carrying "that list, its trailing statement about OEMs
still pending, and **the narrower conflicting list a second Microsoft page publishes**" — singular,
one additional list, one additional page.

`01-windows-dfci.md` carries **three** lists from **three** pages, and says so at `01:142-144` ("Two
other pages carry shorter variants of it"): the canonical nine (`01:136`), the six-OEM variant from
`configure-bios-windows` (`01:149`), and the one-OEM variant from the Project Mu DFCI Scenarios page
(`01:160-167`). `01:523-524` reinforces: "All three lists this guide records".

The documented three-way conflict is deliberate per the phase design; the overview's description of
it is not — it undercounts, and a reader who arrives at the DFCI page expecting one divergence finds
two. Same elision at `00:195` ("None of the three appears on **the DFCI OEM list**", singular) and
`00:81` ("DFCI reaches the nine OEMs", stated flatly with no hint that the count is contested).

**Fix:** `00:82-84`:

```markdown
[Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md), which carries that list, its
trailing statement about OEMs still pending, and the two shorter conflicting lists that two further
Microsoft pages publish — recorded there as a documented conflict rather than resolved.
```

And at `00:195`, "None of the three appears on any of the three DFCI OEM lists".

---

### WR-05: Nine-OEM blockquote is a reformatted list presented as verbatim source text

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:136-140`
**Issue:**
The canonical list is rendered as one line of full-stop-separated tokens inside a blockquote that the
prose introduces as what the page says ("names nine and states plainly"):

> Acer. Asus. Dynabook. Fujitsu. Microsoft Surface. Panasonic. VAIO. Samsung. NEC.
>
> Other OEMs are pending.

Nine consecutive one-word sentences is not how any Microsoft Learn page renders a manufacturer list;
this is a bulleted list flattened into prose. The tell is internal: the six-OEM variant at `01:149`,
taken from a table cell on a different page, is rendered comma-separated. Two different separators
for two lists of the same kind of thing means at least one was normalized by the author.

Every other blockquote in these files is verbatim (including Microsoft's own "Bitlocker" casing at
`00:178`, which is a good verbatim signal). This one is not, while carrying the same visual
authority — the exact shape of the three fabricated-citation near-misses this milestone has already
absorbed.

**Fix:** Reproduce the source's own structure, or move the list out of the blockquote and keep only
the genuinely-sentence-shaped part quoted:

```markdown
> - Acer
> - Asus
> - Dynabook
> - Fujitsu
> - Microsoft Surface
> - Panasonic
> - VAIO
> - Samsung
> - NEC
>
> Other OEMs are pending.
```

Re-fetch the page as source bytes (not a summarizing fetch) to confirm both the structure and the
exact ordering before committing the fix.

---

### WR-06: "Disable Boot from network adapters" ≡ "Boot from network adapters" asserted with no source, and the prefix inverts polarity

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:221-225`
**Issue:**
"The Intune DFCI settings reference names **the same underlying setting** Boot from network
adapters, without the leading Disable the Surface page uses. The two first-party pages genuinely
differ on the display name."

No source supports the identification. It is the author's cross-page inference, and it is a
polarity-inverting one: `Disable Boot from network adapters = Enabled` and `Boot from network
adapters = Enabled` mean opposite things if the names are literal. The file draws two conclusions
from the identification — that the setting is inert on Surface, and (at `01:289-299`) that "Boot from
network adapters" is the counterpart in the external-boot trap — so if the mapping is wrong, a reader
configures the inverse of what they intend on a boot path, which is the file's own named
unrecoverable failure mode.

Note the file labels a comparable inference correctly two sections earlier (`01:82-84`, `01:109-111`)
and here does not.

**Fix:** Label it as inference rather than fact, and say what happens if it is wrong:

```markdown
The Intune DFCI settings reference names a setting **Boot from network adapters**, without the
leading **Disable** the Surface page uses. This corpus reads the two as the same underlying setting
under two display names; Microsoft states no mapping between them. Because the Disable prefix would
invert the meaning of a value, confirm which name your Intune tenant presents before setting it, and
set it from the settings reference's own name.
```

---

### WR-07: Both new files are unreachable — zero inbound links anywhere in `docs/`

**File:** `docs/operations/firmware-bios/00-overview.md:1`, `docs/operations/firmware-bios/01-windows-dfci.md:1`
**Issue:**
`grep -rn "firmware-bios" docs/ --include=*.md` excluding the directory itself returns **nothing**.
The domain is absent from both hubs:

- `docs/index.md:289-329` — `## Operations` lists Co-Management, Patch & Update Management, App
  Lifecycle, Drift + Migration. No firmware/BIOS row.
- `docs/operations/00-index.md` — same four domains, no firmware/BIOS section.

The seam the overview asserts is also one-directional:
`docs/operations/patch-management/06-windows-driver-firmware-updates.md` and
`01-windows-wufb-rings.md` do not link back, although `00:141-143` and `00:158-165` build a whole
section on updates-vs-configuration and `01:338-340` routes readers into `01-windows-wufb-rings.md`.
Every link across that seam points one way.

If hub wiring is deliberately deferred (this repo's navigation-last pattern), this is a scoped
carry-forward rather than a defect — but it must be recorded, because at HEAD the entire domain is
reachable only by knowing the path. The reverse links from patch-management are the ones most likely
to be forgotten, since they live outside the phase's file set.

**Fix:** Either wire now (one row in `docs/operations/00-index.md`, one in `docs/index.md:289-329`,
one reciprocal line in `patch-management/06`), or record an explicit deferral naming all four
touch points so the nav phase inherits a checklist rather than a guess.

---

### WR-08: Glossary `last_verified` unchanged while four sourced terms were added

**File:** `docs/_glossary.md:6-7, 301`
**Issue:**
Frontmatter still reads `last_verified: 2026-06-29` / `review_by: 2026-09-27`. The Version History
row added in this phase is dated `2026-08-24` and records four new terms carrying new verifiable
facts: the 2 MB `.cctk` file-size limit, Dell-only vendor support, DFCI's eight setting categories,
and the OEM-or-CSP-partner registration gate.

The metadata now asserts the file was verified on 2026-06-29 — roughly two months **before** that
content was written. The file's own precedent goes the other way: Phase 75 added `### Entra ID SSO`
on 2026-06-20 and Phase 91 added a see-also on 2026-06-24, both covered by the 2026-06-29
`last_verified`. Only the 2026-07-07 EEE reformat was left uncovered, and it is explicitly annotated
"content not re-reviewed" because it added no facts. This change adds facts.

C17 checks the field's presence and format only, not its relationship to the edit date, so no
validator catches this.

**Fix:**

```yaml
last_verified: 2026-08-24
review_by: 2026-11-22
```

(90-day window per the current C5 rule.) If the new terms' sources were in fact verified on
2026-08-24 during this phase — the two operations files both carry that date — the bump is a pure
correction, not a new claim.

---

### WR-09: Glossary Summary not updated for the new coverage area

**File:** `docs/_glossary.md:19`
**Issue:**
The Summary enumerates exactly what the glossary covers: "enrollment concepts (OOBE, ESP, device and
user phase), hardware and security terms (hardware hash, TPM, TPM attestation, Secure Boot), network
components (WinHTTP proxy, NCSI), deployment modes (self-deploying, pre-provisioning, user-driven),
and device lifecycle actions (Autopilot Reset, tenant migration, retirement, wipe)."

Firmware and BIOS terminology is now a fifth area (DFCI, UEFI CSP, BIOS password, BIOS configuration
and other settings) and appears in none of the five buckets. The Summary is the abstract consumed by
the publish bundle's manifest, so the staleness propagates outside the file.

**Fix:** Extend the hardware/security bucket or add a clause:

```markdown
... network components (WinHTTP proxy, NCSI), firmware and BIOS management (DFCI, UEFI CSP, BIOS
password custody), deployment modes ...
```

---

### WR-10: Oldest source in the domain carries no staleness caveat, while a newer one gets two paragraphs

**File:** `docs/operations/firmware-bios/00-overview.md:47-53, 108-110`
**Issue:**
The HP custody claim rests on `HP Connect for Microsoft Endpoint Manager — User Guide` **Version
1.2.0, published 2022-09-27** (`00:53`) — the oldest source cited anywhere in the domain, by roughly
two years, and the only non-Microsoft vendor PDF. It is presented with no staleness treatment at all,
and the operating instruction at `00:108-110` ("Work through HP Connect for Microsoft Endpoint
Manager") is given in the present tense as current practice.

Contrast `01:153-158`, where a 2024-06-06 Microsoft page gets an explicit two-paragraph aging
argument ending "Treat the nine-OEM list as current and this one as stale." The domain applies its
sharpest staleness discipline to its second-newest source and none to its oldest.

Aggravating detail a reader will notice: "Microsoft Endpoint Manager" is a retired Microsoft brand.
Quoting HP's product name verbatim is correct, but shipping it unannotated leaves the reader unable
to tell whether the connector still exists under that name.

**Fix:** Add a one-line currency caveat beside the HP paragraph, in the same voice as the DFCI
staleness note:

```markdown
The HP guide cited here is version 1.2.0 from 2022 and is the oldest source in this domain. The
custody model it documents is the durable fact; the console details, and the "Microsoft Endpoint
Manager" branding in the product name, predate Intune's current naming. Confirm the current
connector name and administration surface at `admin.hp.com` before acting on this section.
```

---

## Info

### IN-01: Glossary disjointness claim is a non sequitur as written

**File:** `docs/_glossary.md:177`
**Issue:** "Dell is the only vendor this profile type supports today, **so** it is disjoint from
DFCI: no device is reachable by both surfaces." Dell-only does not imply disjointness — that requires
the additional premise that Dell is absent from every DFCI list, which the glossary never states.
`00:97-99` states the argument correctly ("The manufacturers DFCI supports are not the manufacturer
the Templates policy supports"); the glossary compressed the middle term out.
**Fix:** "Dell is the only vendor this profile type supports today, and Dell appears on no DFCI
manufacturer list, so the two surfaces are disjoint: no device is reachable by both."

---

### IN-02: Version History describes a see-also as "reciprocal" when it is one-way

**File:** `docs/_glossary.md:301`
**Issue:** The row claims "a **reciprocal** `> See also:` from DFCI to Secure Boot and UEFI CSP".
`### Secure Boot` (`_glossary.md:219-221`) carries no see-also back to DFCI, and `### UEFI CSP`
(`:189-191`) mentions DFCI only in its definition prose, not as a see-also. Nothing is reciprocal.
Prior rows use the word precisely (Phase 91: "reciprocal `> See also:` to ### Tenant migration
pointing to _glossary-macos.md#mdm-migration").
**Fix:** Either drop "reciprocal" from the row, or add the return see-also to `### Secure Boot`.

---

### IN-03: "the in-memory quality-update path" is a coined term with no corpus resolution

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:331-332`
**Issue:** The phrase occurs in one file corpus-wide. The concept is Hotpatch, and the link target
(`../patch-management/01-windows-wufb-rings.md:119-168`) has a `## Hotpatch` section using that name
throughout. A reader following the link must infer the mapping.
**Fix:** "...can be temporarily ineligible for Hotpatch, the in-memory quality-update path".

---

### IN-04: Eight-category enumeration reproduced three times, against the file's own routing rule

**File:** `docs/operations/firmware-bios/00-overview.md:146-148`, `docs/operations/firmware-bios/01-windows-dfci.md:246-248, 513-514`
**Issue:** The same eight-item list is spelled out three times across the two files, while
`01:260-263` states the rule that high-churn enumerable data routes out to the source page rather
than being reproduced. It is also the list most likely to change if the interface gains a category —
three sites to update, one Source line each.
**Fix:** Keep the full enumeration once (`01:246-248`, where it introduces the settings surface) and
reference it from the other two sites.

---

### IN-05: "Four things on that page" is followed by five bolded items

**File:** `docs/operations/firmware-bios/01-windows-dfci.md:188-241`
**Issue:** `01:188-189` promises "Four things on that page change what an administrator can plan
for." Five bolded items follow: the prerequisite floor, self-registered devices, inert settings,
model eligibility, and "The bound this section works to, stated on the record". The fifth is scope
meta, not a fact from the page, so the count is defensible — but it reads as an off-by-one, and the
fifth item is itself flagged in WR-03.
**Fix:** Removing the fifth item per WR-03 resolves this; otherwise reword to "Four things on that
page change what an administrator can plan for, and a fifth note records this section's scope."

---

_Reviewed: 2026-08-25T05:01:21Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
