---
phase: 34-android-foundation
reviewed: 2026-04-21T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - docs/_glossary-android.md
  - docs/android-lifecycle/00-enrollment-overview.md
  - docs/android-lifecycle/02-provisioning-methods.md
  - docs/android-lifecycle/03-android-version-matrix.md
  - docs/_templates/admin-template-android.md
findings:
  critical: 0
  warning: 1
  info: 5
  total: 6
status: issues_found
---

# Phase 34: Code Review Report

**Reviewed:** 2026-04-21
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

All five Phase 34 foundation documents are in strong shape. Cross-references between the glossary, overview, provisioning-method matrix, and version-breakpoint matrix resolve cleanly; every `#anchor` referenced in the five files has a matching heading or explicit `<a id="...">` target; table column counts and cell counts are consistent; YAML frontmatter is present on all five files with correct 60-day review cycles (2026-04-21 + 60d = 2026-06-20); and the "Google recommends WPCO" framing per PROJECT.md is preserved throughout (no "COPE deprecated" phrasing found). Samsung KME is consistently handled as a deferred-to-v1.4.1 callout rather than a full provisioning method.

Six minor findings were identified: one Warning about a terminology consistency gap between the comparison table's Provisioning Surface cell and the narrative / glossary treatment of BYOD post-AMAPI, and five Info-level items (a glossary term's category placement, one anchor alias mismatch between adjacent `<a id>` tags and the matching H3 slug, minor narrative/typo cleanups, and a cross-reference that could be strengthened). No security issues, no critical correctness issues, no broken internal links.

## Warnings

### WR-01: BYOD "Provisioning Surface" cell understates post-AMAPI management surface

**File:** `docs/android-lifecycle/00-enrollment-overview.md:27`
**Issue:** The Enrollment Mode Comparison table's BYOD row says "Company Portal (user-initiated)" in the Provisioning Surface column. That matches pre-April-2025 reality, but every other Phase 34 doc — the glossary `BYOD` entry (line 23: "installs Company Portal (or starts enrollment through the Microsoft Intune app post-AMAPI)"), the glossary `AMAPI` entry (line 126: "Microsoft Intune app is the primary BYOD management surface, replacing Company Portal as the DPC for BYOD"), this overview's own per-mode BYOD narrative (line 67: "End users install the Microsoft Intune app... the primary management surface post-2025"), and the provisioning-methods matrix Notes cell (line 26) — centers the Microsoft Intune app post-AMAPI. A reader scanning only the comparison table will walk away thinking Company Portal is still the primary BYOD surface, contradicting the rest of the phase. Low severity because the rest of the content corrects it, but the comparison table is the primary quick-reference surface for L1 audiences per `How to Use This Guide`.
**Fix:** Update the BYOD row's Provisioning Surface cell to reflect the post-AMAPI reality. Suggested wording:
```markdown
| BYOD Work Profile | Personally-owned | Work profile (containerized) | Microsoft Intune app (user-initiated; post-AMAPI April 2025) — see [02-provisioning-methods.md#byod-work-profile](02-provisioning-methods.md#byod-work-profile) | BYOD with data separation; user keeps personal side; admin sees only work-profile telemetry |
```

## Info

### IN-01: Managed Home Screen categorized under "Compliance & Attestation" — arguably misplaced

**File:** `docs/_glossary-android.md:122-134`
**Issue:** `### Managed Home Screen` (line 130) sits under the `## Compliance & Attestation` category (line 122), alongside `AMAPI` and `Play Integrity`. MHS is Microsoft's kiosk-launcher app for Dedicated (COSU) devices — it enforces kiosk mode and holds an exit-PIN sync concern, which is a provisioning / deployment / UX concern, not a compliance-or-attestation concern. `AMAPI` and `Play Integrity` are legitimately compliance/attestation (AMAPI is the management-API that drives compliance; Play Integrity is literally a device-attestation verdict). MHS sits in the wrong category by definition.
**Fix:** Move `### Managed Home Screen` out of "Compliance & Attestation." Two reasonable placements:
- (preferred) Under `## Ownership & Management Scope` near the `### Dedicated` entry (line 53), since MHS is the launcher layer that makes Dedicated mode work.
- Alternatively, under `## Provisioning Methods` since MHS configuration is part of the Dedicated provisioning sequence.
Update the alphabetical index anchor `[Managed Home Screen](#managed-home-screen)` if the H3 heading text changes (it shouldn't need to; only the category parent changes).

### IN-02: Duplicate `<a id="afw-setup">` anchor in glossary could surface as redundant DOM id

**File:** `docs/_glossary-android.md:83-84`
**Issue:** Line 83 adds an explicit `<a id="afw-setup"></a>` immediately before `### afw#setup` on line 84. Most Markdown renderers (GitHub, MkDocs, Docusaurus) auto-generate a slugified id for H3 headings — `### afw#setup` renders as `id="afwsetup"` under strict CommonMark slugification OR `id="afw-setup"` under pandoc-style slugification, depending on the renderer's handling of `#`. The explicit `<a id="afw-setup">` is a safety belt for renderers that strip `#` from slugs, which is correct and defensive. However, for renderers that keep the hash as a hyphen, you now get two elements with the same id on the page, which is invalid HTML and may confuse anchor navigation. The same dual-id pattern appears intentionally on `docs/android-lifecycle/02-provisioning-methods.md:41-42` for the same reason.
**Fix:** Not a required fix — this pattern is defensive. If the project's renderer is GitHub-flavored Markdown (most likely for this repo), GFM produces the slug `afwsetup` (drops `#`), so the explicit `<a id="afw-setup">` is load-bearing and the auto-generated id is `afwsetup`, which means the two ids don't collide. Confirm renderer behavior at milestone-audit time (Phase 42). If both ids collide under the chosen renderer, drop the H3's auto-slug by wrapping the heading: `### <a id="afw-setup"></a>afw#setup` (inline the anchor in the heading text to prevent the duplicate id from rendering above it).

### IN-03: "all 19 Android terms" wording vs 13 + 6 decomposition elsewhere

**File:** `docs/android-lifecycle/00-enrollment-overview.md:79`
**Issue:** The "See Also" bullet says "for all 19 Android terms including [Fully Managed]..." — the count 19 is correct (13 disambiguation + 6 Android-native, confirmed by counting the alphabetical index pipe-delimited entries at `_glossary-android.md:15`), but it's a bare count with no decomposition, while the glossary Version History at line 148 and the phase CONTEXT document both break it down as "13 disambiguation entries + 6 Android-native terms." A reader cross-referencing the two surfaces may wonder where "19" came from.
**Fix:** Change the See Also bullet to preserve the decomposition:
```markdown
- [Android Enterprise Provisioning Glossary](../_glossary-android.md) — 13 cross-platform disambiguation entries plus 6 Android-native terms including [Fully Managed](../_glossary-android.md#fully-managed), [Work Profile](../_glossary-android.md#work-profile), and [Zero-Touch Enrollment](../_glossary-android.md#zero-touch-enrollment)
```
Not strictly required — "19 Android terms" is mathematically correct, just less informative than the project's own decomposition vocabulary.

### IN-04: Glossary DPC entry ends mid-paragraph — small grammar issue

**File:** `docs/_glossary-android.md:100`
**Issue:** The cross-platform note on DPC ends: "...but there is no analog to the 'DPC as a distinct on-device app' Android model. Do not conflate the Microsoft Intune DPC app on Android with the separate 'Company Portal' app, which is the end-user portal for BYOD enrollment and app discovery." That final sentence blends two topics — (a) "no analog on other platforms" and (b) "don't conflate Intune DPC app with Company Portal." Sentence (b) is internal-to-Android disambiguation and doesn't belong inside a cross-platform note blockquote.
**Fix:** Move the "Do not conflate the Microsoft Intune DPC app on Android with the separate Company Portal app" sentence out of the `> **Cross-platform note:**` blockquote and into the definition body (before the blockquote). Suggested rewording:
```markdown
### DPC

Device Policy Controller (DPC) is the on-device app responsible for applying Android Enterprise policies. In Intune-managed scenarios, the Microsoft Intune app is the DPC for Fully Managed, Dedicated, WPCO, and post-AMAPI BYOD Work Profile; Company Portal was the legacy DPC for BYOD prior to the April 2025 AMAPI migration. The DPC receives configuration from Intune via Google Play Services on GMS devices, and enforces restrictions, certificate deployment, Wi-Fi profiles, and app assignments locally. Do not conflate the Microsoft Intune DPC app on Android with the separate "Company Portal" app, which is the end-user portal for BYOD enrollment and app discovery.

> **Cross-platform note:** On iOS/iPadOS and macOS, the analog is the MDM profile itself — the OS-level MDM framework plays the policy-controller role, and there is no separately-installed on-device management agent. On Windows, the MDM client is built into the operating system; Intune extends it via the Intune Management Extension for Win32 apps and PowerShell scripts, but there is no analog to the "DPC as a distinct on-device app" Android model.
```

### IN-05: Admin template `### Step 2` placeholder text is empty prose — template usability nit

**File:** `docs/_templates/admin-template-android.md:96-98`
**Issue:** `### Step 2: [Next configuration action]` is immediately followed by `[Repeat the tri-portal sub-section pattern per the rules above — include #### In Intune admin center and #### In Managed Google Play always; include #### In Zero-Touch portal only if applicable to this guide's mode.]` — a meta-instruction wrapped in brackets rather than a worked stub like Step 1. iOS and macOS templates (admin-template-ios.md and admin-template-macos.md) both include stub H4 subsection headers for Step 2 so authors have a copy-paste skeleton. A Phase 35+ author copying this template gets a clean Step 1 but has to re-type all three `#### In ...` subsection headers for Step 2.
**Fix:** Non-blocking. If desired, expand Step 2 to include the three stub H4 headers with their own placeholder callouts (mirroring Step 1 structure) so the template is more self-serve. Alternatively, leave as-is and accept that authors will copy Step 1's structure when writing Step 2.

---

_Reviewed: 2026-04-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
