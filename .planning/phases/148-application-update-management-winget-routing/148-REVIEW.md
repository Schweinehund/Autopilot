---
phase: 148-application-update-management-winget-routing
reviewed: 2026-08-23T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - docs/operations/patch-management/00-overview.md
  - docs/operations/patch-management/07-windows-autopatch.md
  - docs/operations/patch-management/08-windows-app-updates.md
findings:
  critical: 1
  warning: 4
  info: 0
  total: 5
status: issues_found
---

# Phase 148: Code Review Report

**Reviewed:** 2026-08-23T00:00:00Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

This is a documentation corpus review, so "correctness" was checked as citation integrity (every
quoted string attributable to the Microsoft Learn page named by its governing `**Source:**` line),
cross-file/intra-file consistency of facts, dates and version numbers, and link/anchor validity.

I fetched all nine distinct Microsoft Learn pages cited across the three files as live source bytes
and diffed roughly 40 quoted or paraphrased claims against the actual page text, including every
number that carries operational weight (the SLO percentages, the 8 EAM limitations, the 15
DesktopAppInstaller CSP settings, the 15-rings/300-groups ceiling, the two different administrative-
template namespace strings, the build number 20131.20000, and both quotes newly governed by the
148-04 insertion at `08:115`). The 148-04 insertion itself is correct: both quotes it now governs
("build numbers higher than 20131.20000..." and "Version 2508 is supported through September 8,
2026...") are verbatim on the `unified-update-channels` page and verbatim absent from the
`overview-update-channels` page that Source-at-`08:104` governs, so the fix closes the citation gap
without orphaning anything under the preceding Source line.

Against that very high bar, I found one claim in `08-windows-app-updates.md` that is presented with
citation confidence ("a companion article states plainly...") but does not appear on either Microsoft
Learn page the guide cites for it — a defect in the same class as the one 148-04 fixed, just not yet
caught. I also found four internal-consistency/quality issues: a citation date for the same source
page that disagrees between two sibling files, an ambiguous antecedent in `00-overview.md` that (on
its most natural reading) misstates which object type holds "15 rings," a policy name that is spelled
two different ways within the same file, and an internal GSD phase/roadmap reference that leaked into
a customer-facing guide's footer.

## Critical Issues

### CR-01: "Companion article" claim is not supported by either cited source page

**File:** `docs/operations/patch-management/08-windows-app-updates.md:132-136`
**Issue:** The paragraph states: "a companion article states plainly that the settings catalog
profile type has more settings available than the Administrative Templates profile type," governed
by the Source line immediately below it:
`**Source:** [Change the update channel with Microsoft Intune Administrative Templates](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/change-update-channels) (updated 2026-07-18)`

I fetched that page's live text in full (17,520 characters, "Last updated on 2026-07-18" confirmed —
so the date is correct). The string "settings catalog" does not occur anywhere on that page, and
there is no comparison of settings-available counts between the two Intune profile types anywhere in
its content. I also fetched the other candidate source in the same section — the settings-catalog
article cited at `08:126` (`.../settings-catalog/update-office`) — and it likewise never mentions
"Administrative Templates" and contains no "more settings" comparison. Neither of the two Microsoft
Learn pages this guide cites in the "Setting the Channel from Intune" section supports the claim as
written. This is the same defect class the `148-04` fix closed elsewhere in this file (a claim
attributed to a page that does not carry it) — it was simply not the specific instance `148-04`
targeted.

**Fix:** Either locate the actual Microsoft Learn page that states the settings-catalog-vs-
Administrative-Templates settings-count comparison and cite it directly, or remove the claim/replace
it with wording the two currently-cited pages actually support (e.g., drop "and a companion article
states plainly that..." and stop the sentence at "two different names.").

## Warnings

### WR-01: Citation date for the same source page disagrees across sibling files

**File:** `docs/operations/patch-management/00-overview.md:101` vs.
`docs/operations/patch-management/07-windows-autopatch.md:51,144,213,224,237,379`
**Issue:** Both files cite the identical URL —
`https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview`
("Windows Autopatch groups overview") — but `00-overview.md:101` annotates it "(updated 2026-06-19)"
while all six citations of the same page in `07-windows-autopatch.md` annotate it "(updated
2025-06-17)". Both files carry an identical `last_verified: 2026-08-23` frontmatter date, so these
are not citations captured months apart. I fetched the live page: its `ms.date` meta tag (the value
Microsoft Learn displays to readers as the article date) is `2025-06-17T00:00:00Z`, matching
`07-windows-autopatch.md`'s six citations exactly. `00-overview.md`'s `2026-06-19` matches a
different, non-displayed CMS field (`updated_at`) on the same page, not the article date a reader
would actually see. This is the exact "corrected coordinate/census row going stale" failure mode this
corpus has been bitten by before — one file's citation date and its sibling's disagree, and the
one that disagrees is also not what the source page currently displays.
**Fix:** Change `00-overview.md:101` to "(updated 2025-06-17)" to match the six citations in
`07-windows-autopatch.md` and the source page's own displayed `ms.date`.

### WR-02: Ambiguous antecedent misstates which object holds "15 rings"

**File:** `docs/operations/patch-management/00-overview.md:79-83`
**Issue:** The Ring Terminology bullet reads: "...both are always present, cannot be removed or
renamed, and each carries its own Entra group (a group supports up to 15 rings, and a tenant up to
300 groups)." The nearest antecedent to "a group" is the just-mentioned "Entra group," and read that
way the sentence states that an Entra group supports up to 15 rings — which is not the fact.
`07-windows-autopatch.md:216-224` states the real fact unambiguously, sourced from the same Microsoft
Learn page: an **Autopatch group** supports up to 15 deployment rings, and a tenant supports up to 300
Autopatch groups; the 15-ring ceiling has nothing to do with the Entra group used for device
distribution within a ring. The parenthetical in `00-overview.md` is very likely intending "group" as
shorthand back to "Autopatch group" (matching "a tenant up to 300 groups," which can only mean
Autopatch groups), but its placement immediately after "Entra group" invites the wrong reading of a
number this corpus has already needed to correct once.
**Fix:** Reword to remove the ambiguity, e.g.: "...and each carries its own Entra group for device
distribution (an Autopatch group supports up to 15 rings, and a tenant supports up to 300 Autopatch
groups)."

### WR-03: Same CSP setting given two different names within one file

**File:** `docs/operations/patch-management/08-windows-app-updates.md:305` vs. `:330`
**Issue:** The `DesktopAppInstaller/EnableMicrosoftStoreSource` CSP is named "**Enable Microsoft
Store source policy**" in the policy table at line 305, but "**Enable App Installer Microsoft Store
Source policy**" in prose 25 lines later at line 330 — two different names for the identical setting
in the same file. I confirmed via the live Policy CSP page that the actual ADMX friendly name
Microsoft assigns this setting is "Enable App Installer Microsoft Store Source" (matching the prose
at line 330, not the table at line 305). An administrator searching the Intune settings catalog or a
custom OMA-URI profile by the table's shortened name may not find the setting by that exact string.
**Fix:** Rename the table row at line 305 to "Enable App Installer Microsoft Store Source policy" to
match both the ADMX friendly name and the prose reference at line 330.

### WR-04: Internal GSD phase/roadmap reference leaked into a customer-facing footer

**File:** `docs/operations/patch-management/00-overview.md:266`
**Issue:** The last line of the "Related Resources" section reads: "[Operations Documentation
Index](../00-index.md) — Cross-reference only; Phase 54 does not amend the operations index per the
Phase 59 ROADMAP entry." "Phase 54" and "Phase 59 ROADMAP entry" are internal project-management
artifacts of this repo's own authoring process (GSD phase numbers), not concepts a Windows Autopilot
admin reading this operations guide has any use for or context to interpret. This is the only place
in any of the three reviewed files where internal authoring-process terminology appears in
reader-facing prose.
**Fix:** Remove the internal-process justification clause; keep only the link, e.g.: "[Operations
Documentation Index](../00-index.md) — Cross-reference only."

---

_Reviewed: 2026-08-23T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
