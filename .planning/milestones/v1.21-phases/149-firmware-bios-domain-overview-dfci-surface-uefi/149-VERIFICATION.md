---
phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
verified: 2026-08-25T05:33:24Z
human_verification_discharged: 2026-08-25T06:30:00Z
human_verification_evidence: 149-UAT.md (4/4 passed — 3 closed by orchestrator against live re-fetched sources, 1 closed by owner ruling)
status: passed
score: 5/5 must-haves verified
behavior_unverified: 0
overrides_applied: 0
deferred:
  - truth: "Both new files are reachable from the corpus — hub rows, index entries and registry/filename-map rows"
    addressed_in: "Phase 152"
    evidence: "Phase 152 SC#3 'New docs/operations/** documents carry registry and filename-map rows ... and a reader finds them in the regenerated publish bundle'; SC#4 'the docs index gains ... an Operations entry; the operations index gains a Patch row, a Firmware H2'"
  - truth: "The inbound link from docs/admin-setup-apv1/01-hardware-hash-upload.md back to the DFCI prerequisites section"
    addressed_in: "Phase 152"
    evidence: "149-05-SUMMARY.md Hand-Forward Contract to Phase 152, item 4, names the file and the direction explicitly"
human_verification:
  - test: "Open https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows, find the 'BIOS configuration vs DFCI' comparison table, and read the Supported OEMs cell for the BIOS-configuration column. Compare it against docs/operations/firmware-bios/00-overview.md:206-209."
    expected: "The source cell reads 'Dell / Possibly more in the future'. The overview asserts the opposite framing — 'Not one manufacturer today with others announced -- one, stated flatly on the Microsoft page quoted above ... do not budget for it to widen' — and never discloses the hedge, on the same page it quotes for the six-OEM list. Decide: soften the callout to match the source, disclose the hedge, or accept the editorial position on the record."
    why_human: "Both facts are verified; what needs deciding is disposition. This is an editorial-overreach judgment against a phase whose stated goal is honest presentation, not a mechanical check."
  - test: "Read docs/operations/firmware-bios/01-windows-dfci.md:37-44 (the certificate-trust-chain paragraph) and 00-overview.md:126 ('no BIOS password is involved at all'). Look for a **Source:** line covering either claim."
    expected: "Neither claim carries a citation. Both ARE first-party supportable: https://learn.microsoft.com/en-us/autopilot/dfci-management states verbatim 'DFCI's trust chain uses public key cryptography, and doesn't depend on local UEFI password security.' Decide whether to quote that sentence under its own dfci-management **Source:** line (the phase's own D-56/evidence-line contract), or accept the claims as uncited synthesis."
    why_human: "This is the same shape the review flagged as WR-02 and the executor fixed by deletion; here the mechanism is genuinely sourceable, so the fix is additive rather than a deletion, and whether to spend it now or in Phase 150 is a scoping call."
  - test: "Grep .planning/ for WR-07, WR-08 and IN-04. Then check whether the reciprocal link from docs/operations/patch-management/06-windows-driver-firmware-updates.md (and 01-windows-wufb-rings.md) back into docs/operations/firmware-bios/ appears in any phase's hand-forward or in Phase 152's Success Criteria."
    expected: "Zero hits for all three finding IDs — the two rejections and one skip exist nowhere in the planning record. And WR-07's fourth touch point (the patch-management reciprocal) is in neither 149-05-SUMMARY.md's Phase-152 hand-forward (which names 5 items, not including it) nor Phase 152's SC#4 (which names the docs index and the operations index only). Decide whether to record the dispositions and add the reciprocal to Phase 152's inheritance, or accept a permanently one-directional seam."
    why_human: "WR-07 made its own deferral conditional: 'record an explicit deferral naming all four touch points so the nav phase inherits a checklist rather than a guess.' Three of four were recorded. Whether the fourth matters is a scoping decision, and whether unrecorded dispositions are acceptable is a process decision."
  - test: "Read docs/_glossary.md front matter (last_verified: 2026-06-29) against its own Version History row dated 2026-08-24, which records four new terms carrying four new verifiable facts (2 MB .cctk limit, Dell-only support, eight DFCI categories, the OEM-or-CSP-partner gate)."
    expected: "The metadata asserts the file was verified roughly two months before that content was written. This is D-63-conformant (plan 02 made the frozen front matter both a must_have and a prohibition), so the executor's rejection of WR-08 follows the plan — but the plan's own precedent (Phase 75 and Phase 91 additions were both covered by a later last_verified) goes the other way. Decide: bump, or record the deliberate exception."
    why_human: "The plan and the file's own precedent conflict. C17 checks format only, so no validator resolves it, and the correct answer depends on what last_verified is meant to assert in this corpus."
---

# Phase 149: Firmware/BIOS Domain — Overview, DFCI & Surface UEFI Verification Report

**Phase Goal:** A greenfield firmware/BIOS domain exists that routes by **who holds the BIOS secret**, and DFCI is presented honestly — including to the three fleets where it is simply unavailable.
**Verified:** 2026-08-25T05:33:24Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Method

Goal-backward, against the shipped corpus rather than the SUMMARYs. Both new documents were read
end to end as a service-desk reader would. **All seven mandated sources were re-fetched live during
this verification** and every blockquote in both files was checked byte-for-byte against the fetched
page, including the HP Connect PDF (extracted via its content-stream `TJ` operators after two
simpler extraction methods failed). Zero fabricated quotes were found. The validator suite was not
used as primary evidence per the verification brief; `check-nav-hub-links.mjs` was re-run once as a
regression check (0/0).

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `00-overview.md` routes by secret custody rather than by tool — Dell/Intune, HP/vendor cloud vault, Lenovo/customer, and Lenovo as the only vendor whose key can sit under the customer's own RBAC, logging and rotation | ✓ VERIFIED | `00:31-38` custody table with a **Who holds the BIOS secret** column; three custody paragraphs each under its own **Source:** line. `"Passwords are managed by HP Connect and stored in a cloud vault."` confirmed verbatim in HPConnectUserGuide.pdf (57pp, v1.2.0, 2022-09-27) under the heading *Adding Password secrets to the Vault*. Lenovo Azure Key Vault sentence confirmed verbatim on blog.lenovocdrt.com. Dell custody now sourced (CR-03 fix): `"Intune stores the BIOS passwords for each device."` confirmed live |
| 1b | The "only vendor" superlative is this corpus's own inference, never attributed to Lenovo *(plan 01 backstop-tier truth)* | ✓ VERIFIED | `00:70-75` states "Lenovo makes no such comparative claim, and the post cited above uses none of those three terms" and sits **outside** the Lenovo blockquote and below its **Source:** line. Independently confirmed by fetch: the Lenovo post returns **0** hits for `RBAC` / `role-based access control`, **0** for `audit logging`, **0** for `key rotation`. Exogenous evidence, not presence |
| 2 | Both native Intune BIOS surfaces are named and named as **disjoint** — DFCI, and the Dell-only Templates policy with its configuration file and 2 MB limit | ✓ VERIFIED | `00:82-108`. `"For Dell, upload the Dell Client Configuration Tool Kit file (.cctk). The file size limit is 2 MB."` confirmed verbatim live. Disjointness argued from the two reaches, with the middle term the review demanded (IN-01) present in both the guide and the glossary. **See WARNING-1** |
| 3 | DFCI OEM support cites the **nine** OEMs + *"Other OEMs are pending."*, records the six-OEM and one-OEM variants as a documented conflict, and presents DFCI as **unavailable** on Dell/HP/Lenovo rather than declined; "the six" and "most business OEMs" appear nowhere | ✓ VERIFIED | `01:130-191`. Nine names in the source's own order and the source's own list structure (WR-05 fix), followed by the pending sentence — all confirmed verbatim at `dfci-management`. Six-OEM string confirmed verbatim at `configure-bios-windows`, under its own **Source:** line, correctly described as a comparison column. Project Mu variant confirmed: the *OEMs that support DFCI* section is **one** Surface logo image linking to the Surface guide, then `"More are in the works..."` — the guide's description is accurate to the byte. Dell/HP/Lenovo confirmed absent from all three lists. `grep -rniE "the six\|most business OEMs"` returns only the permitted hyphenated `six-OEM` |
| 3b | The phase asserts no unsourced **reason** for that absence | ✓ VERIFIED | `01:186` "Microsoft publishes the absence and not a reason for it, so no reason is recorded here"; `01:562-563` same in the callout. `grep -rniE "never integrated\|never carried\|Device Management Trust\|trust anchor"` over the directory returns **0** — WR-02's mechanism claim is fully gone from both passages |
| 4 | DFCI's disqualifying prerequisites are complete; the registration paths are classified; the 24H2 Professional known issue and workaround are carried | ✓ VERIFIED (through the amendment) | **The amendment exists** at `REQUIREMENTS.md:74` marked `**[AMENDED 2026-08-24]**`, names Partner Center with its corpus coordinate and names the APv2 case. **Its coordinate is true**: `docs/lifecycle/01-hardware-hash.md:57-62` is a four-row Import Methods table whose Partner Center row reads *Who Initiates: CSP partner*. **The gate is true**: `"By design, DFCI management requires external attestation of the device's commercial acquisition through an OEM or a Microsoft CSP partner registration to Windows Autopilot."` confirmed verbatim live. `01:88-95` classifies all four channels in a table (2 qualify / 2 disqualify); `01:103-111` documents the APv2 no-registration case and attributes it to this corpus's own reading, not to Microsoft. Both 24H2 sentences confirmed verbatim; the Enterprise-upgrade route paraphrased accurately |
| 5 | The bricking surface is quoted first-party, and retire and reuse are documented as **distinct**, including that deleting the profile or the group assignment does not remove settings | ✓ VERIFIED | Two bricking quotes, one per file, each verified verbatim and each under its own **Source:** line (D-38 honored — no repetition). The re-imaging sentence carried under its own separate **Source:** line. `"Deleting the DFCI profile, or removing a device from the group assigned to the profile doesn't remove DFCI settings or re-enable the UEFI (BIOS) menus."` verbatim, framed as the wrong instinct. Retire (`01:417`) and Reuse (`01:451`) are two H2s with an explicitly written discriminator at `01:466-472`. The three-step retire order was checked against the source's own section order and matches |

**Score:** 5/5 Success Criteria verified (0 present, behavior-unverified)

### Ruled Blocking-Gate Decisions

| Ruling | Status | Evidence |
|---|---|---|
| `four-channel` (human ruling 2026-08-24 on SC#4) | ✓ HONORED | Amendment filed in `REQUIREMENTS.md` only, per D-05/D-06; ROADMAP SC#4 text deliberately unedited as designed; four channels + APv2 case shipped |
| `ship-with-warning` (human ruling 2026-08-24, Surface removal path) | ✓ HONORED | Warning at `01:508`, all three clauses present: *deletes the Autopilot registration before the device is unlocked* / *the exact inverse of the default retire sequence above, which unlocks through the profile, then wipes, then deletes the record last* / *applying this order to a non-Surface DFCI fleet leaves the firmware locked beyond Intune's reach with nothing left to unlock it*. It **precedes** the delete-registration step (`01:518`) and the unlock step (`01:522`), with "Read the warning before the steps, not after them" at `01:506`. The hazard is real: the vendor page's own sequence was fetched and its step 2 is the registration delete, its step 4 the Refresh from Network |

### Fix Verification (from 149-REVIEW.md)

| Finding | Claimed | Actual |
|---|---|---|
| CR-01 — recovery route destroyed by a boot lockdown taught in the same file | fixed | ✓ Connected in **both** directions. Trap → recovery at `01:334-337` ("removes the recovery path described under Recovering a Device Locked in the Wrong Order below, before that mistake is ever made"). Recovery → trap at `01:496-502` under **Precondition:**, naming the exact pairing and the SSD-replacement outcome |
| CR-02 — virtualization asymmetry stated universally | fixed | ✓ Bounded in all three places (`01:266-271`, `01:344-350`, `01:539-542`); the Surface non-application carries its own quote and source |
| CR-03 — Dell custody unsourced | fixed | ✓ `"Intune stores the BIOS passwords for each device."` added, verified live |
| WR-01 — setting-name count did not reproduce | fixed | ✓ Independently recounted below: **10**, and the file now states its counting rule |
| WR-02 — unsourced firmware-integration mechanism | fixed | ✓ Zero residue (grep above) |
| WR-05 — nine-OEM list reformatted | fixed | ✓ Source confirmed to be a bullet list with trailing periods; the blockquote now matches |
| WR-06 — display-name mapping asserted with no source | fixed | ✓ `01:225-236` labels it as this corpus's inference and adds a polarity-inversion caution. Confirmed: the settings reference spells it `Boot from network adapters`, the Surface page `Disable Boot from network adapters` |
| WR-03 — GSD planning vocabulary shipped to readers | fixed | ✓ Removed. **Side effect:** plan 05's must_have "its ground stated on the record as a deliberate over-delivery covered by no requirement clause and no Success Criterion" no longer holds in the corpus, and plan 03's "because the requirements document bars per-model matrices" rationale is replaced by an independent one. Both substitutions are improvements for the reader and the *bound itself* is still stated on the record at `01:250-255`. Recorded, not counted against the phase |
| WR-07 — both files unreachable | rejected | Confirmed true at HEAD: `grep -rn "firmware-bios" docs/` outside the directory returns **nothing**. Deferred to Phase 152 (see `deferred`) — but only 3 of the 4 touch points were recorded. **See WARNING-3** |
| WR-08 — glossary `last_verified` stale | rejected | Confirmed true at HEAD. D-63-conformant. **See human item 4** |
| IN-04 — eight-category enumeration reproduced three times | skipped | Confirmed: enumerated at `00:155-158`, `01:257-259`, `01:553-555`. All three are complete and identical; no drift |

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `docs/operations/firmware-bios/00-overview.md` | 237 lines, 9 H2 / 7 anchors, no doc_id, no fences, no version history | ✓ VERIFIED | Exactly 1 H1, 9 H2, 7 `<a id=`; `Related Resources` and `External References` unanchored. `last_verified: 2026-08-24` / `review_by: 2026-10-23` = **+60 days exactly** (D-30/D-69 arithmetic correct, not mirrored) |
| `docs/operations/firmware-bios/01-windows-dfci.md` | 590 lines, 12 H2 / 10 anchors | ✓ VERIFIED | Exactly 1 H1, 12 H2, 10 anchors, both tail sections unanchored — D-24 met to the number. Same +60-day arithmetic |
| `docs/_glossary.md` | four new H3 terms + index + one Version History row, front matter frozen | ✓ VERIFIED | `### BIOS configuration and other settings` (:175), `### BIOS password` (:179), `### Device Firmware Configuration Interface (DFCI)` (:183), `### UEFI CSP` (:189), all under the existing `## Hardware` H2. All four in alphabetical position in the single-line index at :31. One VH row naming Phase 149. Front matter unchanged (`2026-06-29` / `2026-09-27`) per D-63. No `{#id}` overrides, no ampersand or spaced slash in any new heading. New `> See also:` blockquote = **180 chars** (C17 #12 cap is 200) |
| `.planning/REQUIREMENTS.md` | SC#4 premise amendment | ✓ VERIFIED | `:74`, `[AMENDED 2026-08-24]`, coordinate independently confirmed true |

### Key Link Verification

| From | To | Via | Status |
|---|---|---|---|
| `00-overview.md` | `01-windows-dfci.md` | file-level, 4 occurrences | ✓ WIRED |
| `01-windows-dfci.md` | `00-overview.md` | file-level, 5 occurrences | ✓ WIRED (no dangle — both files landed in one commit per D-28/D-29) |
| `00-overview.md` | `../../_glossary.md#secure-boot` | the phase's only anchor-bearing cross-file link | ✓ WIRED — `### Secure Boot` exists at `_glossary.md:219`; slug matches |
| `01-windows-dfci.md` | `../../lifecycle/01-hardware-hash.md` | the four-channel corpus source | ✓ WIRED, and the target's content matches the claim |
| `01-windows-dfci.md` | `../../admin-setup-apv1/01-hardware-hash-upload.md` | "you registered manually, so DFCI is unavailable" | ✓ WIRED outbound; inbound handed to Phase 152 by name |
| `01-windows-dfci.md` | `../patch-management/01-windows-wufb-rings.md` | update-eligibility half of the virtualization chain | ✓ WIRED — target carries `## Driver and Firmware Update Policy` and Hotpatch, so the link text's promise holds |
| `00-overview.md` | `../patch-management/06-windows-driver-firmware-updates.md`, `../../decision-trees/03-tpm-attestation.md`, `../../reference/security-baseline-conflicts.md` | updates/configuration seam and the not-owned owners | ✓ WIRED — all targets exist |
| corpus → `docs/operations/firmware-bios/` | any inbound link | ⚠️ NONE (0 inbound) | Deferred to Phase 152 by roadmap SC — see `deferred` |

### Source Verification (Level 4 — every quote traced to a live page)

| Source | Quotes checked | Result |
|---|---|---|
| `intune/.../configure-dfci-windows` | 10 | 10/10 byte-exact, incl. the load-bearing `"or a Microsoft CSP partner"` gate and all four retire/reuse/recover quotes |
| `autopilot/dfci-management` | 4 | 4/4 byte-exact; nine OEMs confirmed in the source's own order as a bullet list, followed by the pending sentence |
| `intune/.../ref-dfci-settings-windows` | 5 | 5/5 byte-exact; the eight category headings confirmed present in exactly the file's order |
| `intune/.../configure-bios-windows` | 6 | 6/6 byte-exact |
| `surface/surface-manage-dfci-guide` | 4 + the 4-step removal path | 4/4 byte-exact (the shipped SSD quote strips only the source's `CAUTION:` label); the removal-path step order confirmed exactly as characterized |
| `blog.lenovocdrt.com` | 1 + a negative | Quote byte-exact; the three superlative terms confirmed **absent**, which is what makes the inference framing honest |
| `connect.admin.hp.com/.../HPConnectUserGuide.pdf` | 1 | Byte-exact; PDF metadata confirms Version 1.2.0 / September 27, 2022, matching the citation |
| `microsoft.github.io/mu/.../DfciScenarios/` | 1 + a structural claim | `"More are in the works..."` byte-exact; the one-OEM section confirmed to be a single Surface logo image, exactly as described |
| `windows-autopatch-faq` | 1 | Byte-exact |

**D-07 independently confirmed against the source**: `CPU and IO virtualization: Your options: Not configured / Enabled` — there is no `Disabled` value. The file's asymmetry claim is true, and the reversed draft claim it replaced would have been false.

### Independent Counts

| Count | File claims | Independently measured | Status |
|---|---|---|---|
| DFCI OEMs (canonical) | nine | 9 (Acer, Asus, Dynabook, Fujitsu, Microsoft Surface, Panasonic, VAIO, Samsung, NEC) — source order | ✓ |
| DFCI OEMs (stale variant) | six | 6 (Surface, Acer, Asus, Dynabook, Fujitsu, Panasonic) — strict subset of the nine, as stated | ✓ |
| DFCI OEMs (Project Mu variant) | one | 1 (Microsoft Surface, as a logo image) | ✓ |
| DFCI setting categories | eight | 8, identical in all three enumerations, matching the source's own headings and order | ✓ |
| Registration channels | four | 4 table rows, matching the 4-row source table | ✓ |
| Individual setting names shipped | ten, under a stated counting rule | **10**: CPU and IO virtualization; Boot from network adapters (counted once across both display names); Windows Platform Binary Table (WPBT); NFC; SD card; Boot from external media (USB, SD); Microphones; Wi-Fi; Allow local user to change UEFI (BIOS) settings; USB type A | ✓ — reproducible. The only ambiguity is `Bluetooth`, which occurs 3× but **only** inside the category display name `Radios (Bluetooth, Wi-Fi, NFC, etc.)`, never as a setting the file names; the file identifies that whole string as the category at `01:294`, so excluding it is consistent |
| H2s / anchors | 9/7 and 12/10 | 9/7 and 12/10 | ✓ |

### Requirements Coverage

Plan-declared union = `{BIOS-01, BIOS-02, BIOS-03, BIOS-04, BIOS-11}`. `REQUIREMENTS.md:243` maps
exactly those five to Phase 149. **Zero orphaned, zero extra.**

| Requirement | Source Plans | Status | Evidence |
|---|---|---|---|
| BIOS-01 | 01 | ✓ SATISFIED | Custody routing table + three sourced custody positions + the framed Lenovo inference. *Note: the requirement's parenthetical Graph `hardwarePasswordDetails` locator is not named in the shipped file; the custody claim it locates is present and sourced, and SC#1 does not require the API name* |
| BIOS-02 | 01, 02, 03, 04 | ✓ SATISFIED | Both surfaces disjoint; DFCI's UEFI CSP quoted (correctly attributed to the settings reference — `configure-dfci-windows` was confirmed to contain **0** occurrences of the string, per the plan's prohibition); per-setting reporting stated; `.cctk` + 2 MB verbatim; eight categories enumerated; glossary terms added |
| BIOS-03 | 03 | ✓ SATISFIED | Nine/six/one lists, each under its own **Source:** line, recorded as a conflict rather than resolved; unavailable-not-declined in both files; barred phrasings zero |
| BIOS-04 | 02, 03 | ✓ SATISFIED | Four classified channels + APv2 case + 24H2 known issue and both workaround routes; premise amendment filed and its coordinate verified |
| BIOS-11 | 01, 04, 05 | ✓ SATISFIED | Two distinct bricking quotes one-per-file; retire and reuse as separate H2s with a written discriminator; delete-profile-removes-nothing quoted; the ordering warning ruled and shipped |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|---|---|---|---|---|
| — | — | `TBD` / `FIXME` / `XXX` / `TODO` / `HACK` / `PLACEHOLDER` / "coming soon" / "not yet implemented" | — | **Zero across all three modified files.** No debt-marker gate trip |

### Prohibition Scan

| Prohibition | Result |
|---|---|
| No fenced code block in either new file | ✓ 0 |
| No version-history section in either new file | ✓ 0 |
| No document-identifier front-matter key | ✓ 0 |
| No ampersand in any H1/H2 | ✓ 0 |
| No outbound link to `02-`/`03-`/`04-` | ✓ 0 |
| No anchored cross-file link except `_glossary.md#secure-boot` | ✓ only the 2 permitted occurrences |
| D-34 — the deferred vendor tool (`SEMM`) is never mentioned | ✓ 0 |
| D-49 — barred OEM phrasings | ✓ 0 (only the permitted `six-OEM`) |
| D-58 — C11 forms (`System Center`, `SCCM`, `Autopatch rings`, `SafetyNet`) | ✓ 0 |
| D-59 — British spelling forms (12-form grep) | ✓ 0 |
| C17 #12 — every new top-level blockquote ≤ 200 chars | ✓ max new = 180 |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|---|---|---|---|
| Every corpus link written by this phase resolves | `node scripts/validation/check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | ✓ PASS |
| Every blockquote is byte-exact first-party | live `curl` of all 7 mandated sources + tag-strip + literal `grep -F` | 32/32 quotes matched; 0 fabrications | ✓ PASS |
| Full suite | — | Not re-run — already independently verified green at HEAD by the requester, and the brief states green gates are not evidence of goal achievement | ? SKIP (by instruction) |

## Warnings

**WARNING-1 — the Templates-surface callout overstates a hedged source (`00:206-209`).**
The overview writes: *"Not one manufacturer today with others announced — one, stated flatly on the
Microsoft page quoted above. Plan Dell BIOS configuration as a single-vendor capability, and do not
budget for it to widen."* The cited page's `BIOS configuration vs DFCI` comparison table — the same
table the phase quotes for its six-OEM list — reads **`Dell / Possibly more in the future`** under
*Supported OEMs*. The page states both things; the phase quotes only the flat one and then argues
against the hedged one without disclosing it. `grep -rniE "possibly more|more in the future"` over
the directory returns 0. This is the same class of finding the review caught three times (WR-02,
WR-04, WR-06) and is the one instance that survived. It does not falsify SC#2 — the surfaces are
named and disjoint, and disjointness holds today regardless — so it is a warning, not a gap.
Routed to human decision (item 1).

**WARNING-2 — two uncited mechanism claims (`01:37-44`, `00:126`).**
The certificate-trust-chain paragraph and *"no BIOS password is involved at all"* carry no
**Source:** line; the citation below the former covers a different quote from a different page.
Both are genuinely first-party supportable — `autopilot/dfci-management` states verbatim *"DFCI's
trust chain uses public key cryptography, and doesn't depend on local UEFI password security."* —
so this is a missing evidence line, not a fabrication, and the fix is additive. Routed to human
decision (item 2).

**WARNING-3 — WR-07's deferral is 3/4 recorded.**
The review's own condition for accepting a deferral was to *"record an explicit deferral naming all
four touch points."* `149-05-SUMMARY.md`'s Phase-152 hand-forward names the registry rows, the
ops-index rows and the `docs/index.md` entry, plus the `admin-setup-apv1` inbound link. It does not
name the reciprocal from `patch-management/06` (or `01-windows-wufb-rings.md`), and Phase 152's
Success Criteria do not reach those files either — so that seam is currently nobody's job. Routed to
human decision (item 3).

**WARNING-4 — no review disposition is recorded anywhere in `.planning/`.**
`grep -rn "WR-07\|WR-08\|IN-04" .planning/` returns nothing. The two rejections and the one skip
exist only outside the artifact record, so the next phase, the milestone audit and any future
verifier will re-discover all three as open findings. Folded into human items 3 and 4.

**WARNING-5 — SUMMARY counts are stale relative to HEAD (informational).**
`149-04-SUMMARY.md` claims *"about a dozen"* / *"11 distinct setting names"* / *"a twelfth"*;
`149-05-SUMMARY.md` claims *"exactly twelve distinct names, so the prose now states twelve."* The
shipped file states **ten**, the reviewer independently counted ten, and this verification
independently counted ten. The corpus is correct and the SUMMARYs are pre-review artifacts, so this
is not a defect — it is recorded because it is the concrete instance of why SUMMARY claims are not
evidence in this phase.

**WARNING-6 — plan 02's `reciprocal` see-also is one-way (informational).**
The DFCI entry links to `#secure-boot` and `#uefi-csp`; neither target links back. Plan 02's
key_link says *"reciprocal"*, while plan 02's own prohibition bars rewriting an existing term body.
The executor resolved toward the prohibition and IN-02 corrected the Version History row to say
*"one-way"* rather than leave a false label. Deliberate, disclosed, and touches no Success Criterion.

## Deferred Items

| # | Item | Addressed In | Evidence |
|---|---|---|---|
| 1 | Both new files are reachable from the corpus (hubs, indexes, registry, filename-map, publish bundle) | Phase 152 | SC#3: *"New `docs/operations/**` documents carry registry and filename-map rows ... and a reader finds them in the regenerated publish bundle"*; SC#4: *"the docs index gains ... an Operations entry; the operations index gains a Patch row, a Firmware H2"* |
| 2 | Inbound link from `admin-setup-apv1/01-hardware-hash-upload.md` | Phase 152 | Named explicitly as item 4 of `149-05-SUMMARY.md`'s Phase-152 hand-forward contract |
| 3 | Per-OEM Dell/HP/Lenovo procedures and the capability matrix | Phase 150 | ROADMAP Phase 150: *"Dell, HP and Lenovo at an identical five-section shape so the matrix is a transposition"*; `00:127-129` states the absence on the record |

## Human Verification Required

### 1. The `Possibly more in the future` contradiction

**Test:** Open `configure-bios-windows`, read the *Supported OEMs* cell of the BIOS-configuration
column in the `BIOS configuration vs DFCI` table, and compare with `00-overview.md:206-209`.
**Expected:** Source says `Dell / Possibly more in the future`; the overview says the page states it
"flatly" and instructs "do not budget for it to widen", disclosing no hedge.
**Why human:** Both facts are verified — what needs deciding is disposition (soften, disclose, or
accept on the record).

### 2. The uncited trust-chain and no-password claims

**Test:** Look for a **Source:** line covering `01:37-44` and `00:126`.
**Expected:** None. The supporting first-party sentence exists and is quotable:
*"DFCI's trust chain uses public key cryptography, and doesn't depend on local UEFI password
security."* (`autopilot/dfci-management`).
**Why human:** Additive fix; whether to spend it here or in Phase 150 is a scoping call.

### 3. The unowned patch-management reciprocal, and unrecorded dispositions

**Test:** `grep -rn "WR-07\|WR-08\|IN-04" .planning/`; then check Phase 152 SC#4 and the Phase-152
hand-forward for `patch-management/06`.
**Expected:** Zero hits for the finding IDs; the reciprocal is in neither list.
**Why human:** WR-07 made its deferral conditional on recording all four touch points. Whether the
fourth matters, and whether unrecorded dispositions are acceptable, are both process decisions.

### 4. Glossary `last_verified` versus its own Version History row

**Test:** Compare `_glossary.md` front matter (`2026-06-29`) with its `2026-08-24` VH row recording
four new sourced facts.
**Expected:** Metadata asserts verification two months before the content was written.
D-63-conformant, but against the file's own Phase-75/Phase-91 precedent.
**Why human:** Plan and precedent conflict; C17 checks format only, so no validator resolves it.

## Gaps Summary

**None.** All five ROADMAP Success Criteria are met in the shipped corpus, all five requirement IDs
are satisfied with zero orphans, both ruled blocking-gate decisions are honored exactly as ruled,
every prohibition returns zero, and every one of the 32 first-party quotations across both files was
confirmed byte-exact against a live fetch of its cited page — including the HP PDF and the two
non-Microsoft vendor sources. The three review Criticals are genuinely closed, not narrated closed:
CR-01's connection exists in both directions with the SSD outcome named, CR-02's bound appears in
all three affected passages, and CR-03's quote is real.

The phase goal's two halves both hold. The domain routes by custody — the routing table is the
first thing after the H1, the tool names are downstream of it, and each custody position carries its
own evidence. And DFCI is presented honestly where it is unavailable: absent from all three
published lists, stated as unavailable-not-declined in both files, with the tempting causal
explanation deleted rather than sourced-badly.

What remains are four dispositions, not defects. One is a genuine accuracy overreach on the *other*
surface (WARNING-1); one is a missing evidence line for a claim that is true and quotable
(WARNING-2); two are record-keeping (WARNING-3, WARNING-4). None blocks Phase 150.

---

_Verified: 2026-08-25T05:33:24Z_
_Verifier: Claude (gsd-verifier)_
