---
phase: 39-zero-touch-enrollment-aosp-stub
reviewed: 2026-04-23T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/admin-setup-android/02-zero-touch-portal.md
  - docs/admin-setup-android/06-aosp-stub.md
findings:
  critical: 0
  warning: 1
  info: 5
  total: 6
status: issues_found
---

# Phase 39: Code Review Report

**Reviewed:** 2026-04-23
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed two Markdown admin-setup guides authored/extended in Phase 39: the ZT portal guide (`02-zero-touch-portal.md`, Phase 39 appended the `## Corporate-Scale Operations` H2 block) and the AOSP stub guide (`06-aosp-stub.md`, fresh Phase 39 deliverable).

Scope discipline is strong: no "supervision" as an Android management term, no SafetyNet terminology (Play Integrity only where applicable), PITFALL 9/11 shared-file-modification guard honored (zero links into `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, or `docs/index.md`), D-11 9-H2 whitelist on the AOSP stub holds, all internal anchors within each file resolve, and Phase 39–authored source-confidence markers (`[MEDIUM: ...]`, `[HIGH: ...]`) match the Phase 37 D-11 canonical regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`.

One broken cross-reference was found: `06-aosp-stub.md` links to `../_glossary-android.md#aosp`, but the glossary contains no AOSP section and no `#aosp` anchor. Remaining findings are Info-level: two pre-existing Phase 35 source-confidence markers use parenthetical prose form that does not match the canonical regex (explicitly accepted by 39-01-PLAN.md as a prose-variant exception, preserved under D-22 append-only contract); two "Phase 35 scope / Phase 39 will append" sentences in the ZT portal guide are now contextually stale after the Phase 39 append (append-only contract prevents in-place rewording but the staleness is worth logging); a single orphan HTML anchor in the AOSP stub; and an inconsistency in how source-confidence markers are delimited (backticks vs plain brackets) between the two files.

## Warnings

### WR-01: Broken glossary cross-reference `#aosp`

**File:** `docs/admin-setup-android/06-aosp-stub.md:119`
**Issue:** The "See Also" list links to `../_glossary-android.md#aosp`, but `docs/_glossary-android.md` has no `### AOSP` heading and no `<a id="aosp"></a>` anchor. The glossary's Alphabetical Index (line 15) does not list AOSP either. AOSP is only mentioned in running prose inside `### User Enrollment` (line 29) and `### Managed Google Play` (line 118). The `#aosp` fragment will silently fail (browsers land at the top of the glossary), leaving admins without the disambiguation callout the link promises.
**Fix:** Either (a) change the link target to an existing anchor that disambiguates AOSP (for example `../_glossary-android.md#user-enrollment`, which is where AOSP user-associated enrollment is currently discussed), or (b) add an `### AOSP` entry to `docs/_glossary-android.md` — but note that would modify a shared file outside Phase 39's scope and should be deferred to v1.4.1 or a follow-up phase that owns glossary edits. Quickest in-scope fix:

```markdown
- [Android Enterprise Provisioning Glossary — User Enrollment (covers AOSP user-associated)](../_glossary-android.md#user-enrollment)
```

Or drop the fragment entirely and point to the glossary root:

```markdown
- [Android Enterprise Provisioning Glossary](../_glossary-android.md)
```

## Info

### IN-01: Pre-existing Phase 35 source-confidence markers use parenthetical prose form (regex-non-matching)

**File:** `docs/admin-setup-android/02-zero-touch-portal.md:52, 124`
**Issue:** Two source-confidence markers authored in Phase 35 use parenthetical prose form that does not match the Phase 37 D-11 canonical regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` (which requires square brackets):
- Line 52: `(MEDIUM, last_verified 2026-04-21)` — parentheses, not brackets
- Line 124: `(verified HIGH — Samsung Knox docs and Google Developers known issues)` — parentheses + prose "verified HIGH" form
The Phase 39 plan (`.planning/phases/39-zero-touch-enrollment-aosp-stub/39-01-PLAN.md:115-117`) explicitly acknowledges the parenthetical form as "regex-compatible per Phase 37 D-11 ... via parenthetical variant acceptable in prose," and Phase 39's D-22 append-only contract prohibits in-place rewrites of Phase 35 content. Logging for audit-completeness only — these two markers will not match an AEAUDIT-04 regex grep, so if Phase 42 runs that grep it should treat these as known exceptions rather than failures.
**Fix:** No action required in Phase 39 (D-22 append-only). If a future phase revisits the ZT portal guide, normalize to bracket form:

```markdown
[MEDIUM: ZT portal documentation, last_verified 2026-04-21]
[HIGH: Samsung Knox docs and Google Developers known issues, last_verified 2026-04-21]
```

### IN-02: Stale "Phase 35 scope / Phase 39 will append" framing after Phase 39 append

**File:** `docs/admin-setup-android/02-zero-touch-portal.md:18, 126`
**Issue:** Two sentences authored in Phase 35 describe Phase 39 content as forthcoming, but Phase 39 has since appended that content (visible at lines 128-196 of the same file):
- Line 18: "Corporate-scale content (device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1, reseller-upload handoff) is Phase 39 and will extend this guide."
- Line 126: "**Phase 35 scope is ZT portal setup only.** The full KME/ZT device-claim callout, device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1 registration, and reseller-upload handoff are Phase 39 scope and will be appended here."
A reader reaches these sentences and is told the content will appear later — but it already does, immediately below. Phase 39's D-22 append-only contract likely blocks in-place rewrites, so this is logged as Info rather than a higher severity.
**Fix:** No action required in Phase 39 (D-22 append-only). In a future phase with edit authority, reword to past tense, for example:

```markdown
> Phase 39 appended the `## Corporate-Scale Operations` H2 block below with device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1 registration, reseller-upload handoff, and KME/ZT at device-claim. Full KME admin coverage is deferred to v1.4.1.
```

### IN-03: Orphan HTML anchor `#other-aosp-supported-oems`

**File:** `docs/admin-setup-android/06-aosp-stub.md:62`
**Issue:** The `<a id="other-aosp-supported-oems"></a>` anchor immediately before the `### Other AOSP-Supported OEMs` heading (line 63) is never referenced — no other file or section links to it, and Markdown would auto-generate the identical `#other-aosp-supported-oems` slug from the heading itself. The companion anchor `<a id="realwear-confirmed-ga"></a>` (line 53) IS referenced (line 89 "[RealWear (confirmed GA)](#realwear-confirmed-ga)") so it belongs; this one is dead weight.
**Fix:** Remove the anchor line if no inbound link is planned:

```markdown
<!-- delete line 62: <a id="other-aosp-supported-oems"></a> -->
```

If a future AOSP v1.4.1 section plans to link to it, leave it as a stable contract (but log intent in a comment).

### IN-04: Inconsistent source-confidence marker delimiter style between files

**File:** `docs/admin-setup-android/02-zero-touch-portal.md:176` vs `docs/admin-setup-android/06-aosp-stub.md:60, 97`
**Issue:** The Phase 39 MEDIUM marker in the ZT portal guide uses plain square brackets: `[MEDIUM: Google Developers and Google AE Help, last_verified 2026-04-23]`. The two Phase 39 markers in the AOSP stub wrap the same construct in backticks to render as inline code: `` `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]` `` and `` `[MEDIUM: research inference, last_verified 2026-04-23]` ``. Both match the canonical regex, but the rendering style differs between sibling files authored in the same phase. The backtick form visually stands out as a marker; the plain-bracket form may look like an ordinary Markdown reference-style link to casual readers (though it is not one). Either is defensible; the inconsistency across files is the observation.
**Fix:** No functional bug. If unifying, pick one and apply consistently in v1.4.1 revisions — recommend the backtick form since it makes markers visually distinct from reference links and is less likely to be mis-parsed by linters. No change required in Phase 39 per D-22.

### IN-05: Duplicate `#### In Zero-Touch portal` H4 headings on same page

**File:** `docs/admin-setup-android/02-zero-touch-portal.md:46, 81`
**Issue:** The file contains two identical `#### In Zero-Touch portal` H4 headings (lines 46 and 81). Markdown slug generators typically disambiguate duplicates by appending `-1`, `-2`, etc., which means downstream link authors who assume a stable `#in-zero-touch-portal` anchor will hit the first occurrence only, and the second becomes unreachable via anchor. No current cross-reference targets either H4, so no broken link today. The pattern is a project convention (`#### In <admin-UI>`) documented across sibling admin-setup files, so it is defensible; the duplication is only a latent risk if someone adds a deep link later.
**Fix:** No action required. If deep-linking to either H4 becomes necessary, add explicit anchors to disambiguate:

```markdown
<a id="create-zt-portal-ui"></a>
#### In Zero-Touch portal

... (step 1 content) ...

<a id="method-b-zt-portal-ui"></a>
#### In Zero-Touch portal
```

---

_Reviewed: 2026-04-23_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
