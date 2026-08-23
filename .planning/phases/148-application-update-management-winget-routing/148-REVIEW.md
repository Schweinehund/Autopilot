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
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---

# Phase 148: Code Review Report

**Reviewed:** 2026-08-23
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Reviewed the cross-platform patch-management hub (`00-overview.md`, lightly amended this phase — two
routing bullets, two Related Resources bullets, date bump) and two wholly new guides
(`07-windows-autopatch.md`, `08-windows-app-updates.md`). This corpus is unusually well sourced: every
`**Source:**` line I traced against `148-RESEARCH.md`'s verbatim quote bank matched exactly, including
several traps the phase's own research flagged as easy to get wrong (the eight Enterprise App Management
limitation headings in exact order, the `office16v2~Policy~` vs `office16~Policy~` namespace
non-explanation, the two genuinely different GPO/Intune path strings for the Update Channel (2.0)
setting, the Version 2508/2606/build-20131.20000 figures, the 15-setting `DesktopAppInstaller` CSP
count, and the Autopatch-vs-Hotpatch license-list divergence). The specific phantom-anchor trap named in
this phase's review brief (`01-windows-wufb-rings.md#ring-terminology`) does not occur anywhere in the
three files — the real `#ring-terminology` anchor correctly lives in `00-overview.md`, and every
cross-file anchor link I checked (`#autopatch-disambiguation`, `#hotpatch`, `#driver-update-reporting`,
`#autopatch-prerequisites`, `#supersedence`, `#update-workloads-objectives`, plus every same-file anchor
in all three files) resolves to a real, own-line `<a id>` target. All three files carry `last_verified`
+ `review_by` = +60 days correctly, no `doc_id` field, zero code fences, and Title Case H2s throughout.

Two Warnings remain: an incomplete `External References` footer in `00-overview.md` (pre-existing, not
introduced by this phase's diff, but present in the file as reviewed) that drops seven URLs the body
actually cites via `**Source:**` lines — a pattern the phase's own new files (`07`, `08`) get exactly
right by contrast — and an ambiguous antecedent in the Ring Terminology section that lets a reader
misattribute an Autopatch-group capacity limit to Entra groups.

## Warnings

### WR-01: `00-overview.md` External References footer omits seven URLs the body already cites

**File:** `docs/operations/patch-management/00-overview.md:258-266`
**Issue:** The body cites nine distinct `learn.microsoft.com` / `support.apple.com` URLs via
`**Source:**` lines (Ring Terminology section, lines 99-105, 145). The `## External References` footer
lists only two of the Microsoft/Apple URLs actually used in-body
(`waas-overview`, `windows-autopatch/`) plus the three non-Microsoft ones. Seven URLs cited in the body
are absent from the footer:
- `https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb`
- `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview`
- `https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates`
- `https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq`
- `https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy`
- `https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings`
- `https://support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web`

This is a real regression relative to the convention this same phase establishes: `07-windows-autopatch.md`
and `08-windows-app-updates.md` (both new this phase) have an exact 1:1 match between every body
`**Source:**` URL and the `## External References` list (verified by diff — zero URLs on either side
without a match). `00-overview.md` breaks that pattern. A reader who wants the full citation list from
the footer alone will not find the driver-update or Apple-DDM citations this hub's own Ring Terminology
and Deferral vs Enforcement sections rely on.
**Fix:** Add the seven missing URLs to `## External References` in `00-overview.md`, e.g.:
```markdown
- [Manage Windows Update for client policies (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb)
- [Windows Autopatch groups overview (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview)
- [Manage driver updates (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates)
- [Driver updates FAQ (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq)
- [Configure Windows driver update policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy)
- [Intune ref-apple-settings (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings)
- [Apple: Software Update Settings declarative configuration](https://support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web)
```

### WR-02: Ambiguous antecedent lets "Entra group" read as if it carries the 15-ring cap

**File:** `docs/operations/patch-management/00-overview.md:80-82`
**Issue:** The Ring Terminology bullet reads: *"...both are always present, cannot be removed or
renamed, and each carries its own Entra group (a group supports up to 15 rings, and a tenant up to 300
groups)."* The parenthetical's "a group" sits immediately after "Entra group" but is actually restating
`07-windows-autopatch.md`'s sourced facts about **Autopatch groups**: *"You can set up to 15 deployment
rings per Autopatch group"* and *"Windows Autopatch supports up to 300 Autopatch groups in your
tenant"* (`07-windows-autopatch.md:216-224`). As written, the nearest-noun reading is that an **Entra**
group supports up to 15 rings — which is not a real Entra group property and is not the fact either
source page states. This is exactly the kind of prose-level defect a link/anchor validator cannot catch:
the sentence parses fine and every number in it is individually correct, but the pairing is wrong.
**Fix:** Re-scope the parenthetical to name "Autopatch group" explicitly, e.g.: *"...and each carries
its own Entra group. (An Autopatch group supports up to 15 deployment rings, and a tenant up to 300
Autopatch groups.)"*

## Info

### IN-01: `PITFALL-9` and `07`'s "corrected containment position" language assume prior context

**File:** `docs/operations/patch-management/07-windows-autopatch.md:53-58, 239-246`
**Issue:** Phrases like "Stated positively" (line 53) and "**The containment position, in full**" (line
239) read as if responding to a previously-stated *negative* or *incomplete* framing, but neither
`00-overview.md` nor `07` itself ever states the containment relationship "negatively" first within
these files — the corrective framing only makes sense against `01-windows-wufb-rings.md`'s own
`PITFALL-9` callout (confirmed to exist there), which a reader of `07` in isolation has not necessarily
read yet despite the file linking to it. This is not a factual error — the anchor and cross-links all
resolve — but a reader who lands on `07` directly (e.g., via a search engine or the `08` cross-link) may
find "Stated positively" mid-paragraph disorienting without having seen the negative framing it's
correcting.
**Fix:** Optional polish — replace "Stated positively:" with something self-contained, e.g. "To be
explicit about the relationship:", so the sentence does not imply an antecedent the reader may not have.

---

_Reviewed: 2026-08-23_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
