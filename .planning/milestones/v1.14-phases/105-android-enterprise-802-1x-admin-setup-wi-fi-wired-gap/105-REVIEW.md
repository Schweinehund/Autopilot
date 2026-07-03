---
phase: 105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap
reviewed: 2026-06-30T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/admin-setup-8021x/06-android.md
  - docs/admin-setup-8021x/00-overview.md
findings:
  critical: 0
  warning: 2
  info: 0
  total: 2
status: issues_found
---

# Phase 105: Code Review Report

**Reviewed:** 2026-06-30
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed `docs/admin-setup-8021x/06-android.md` (the Android Enterprise 802.1X admin-setup guide) and `docs/admin-setup-8021x/00-overview.md` (overview edit adding item 6) against the 14 locked decisions in `105-CONTEXT.md` and the live-verified facts in `105-RESEARCH.md`.

**The load-bearing D-10 check passes without reservation.** The UPN-in-SAN WARNING (lines 79–83 of `06-android.md`) is correctly titled "Personally owned work profile (BYOD-WP)," scoped in body prose to "in a **personally owned work profile**," and makes no reference to COBO, COPE, COSU, or "all enrollment types." The PITFALLS B-06 scope-creep trap was avoided.

All other locked constraints also pass:

- Exactly two `> **WARNING` blockquotes (UPN-in-SAN + combined version-gate); no DANGER, no `> **NOTE` callouts. ✓
- Wired section: one plain-prose paragraph, bold lead, no callout, no table, no sub-headings, four required facts present. ✓
- Cert-access B-08 is structural/inline prose, not a callout. ✓
- MAC randomization is plain-prose with freshness stamp, uses Android's real control name "Use device MAC" (not iOS's label). ✓
- Combined version-gate WARNING scoped to "Radius server name" field (corporate-owned/AOSP), with explicit note that personally-owned tab uses "Certificate server names" and does not carry the version-specific sub-requirements. ✓
- EAP-TTLS inner methods: PAP / MS-CHAP / MS-CHAPv2 only — no plain CHAP. ✓
- AOSP one-line inline stub (not a callout, not a full treatment). ✓
- Co-equal EAP framing; no "recommended default." ✓
- Front-matter freshness stamps and 90-day inline stamps on the two version-gated items. ✓
- `00-overview.md` item 6 added, placeholder narrowed from "6–7" to "7," Mermaid left unchanged per resolved Q3. ✓
- Navigation-last constraint honored: no capability-matrix rows or global-nav wiring in either file. ✓
- Plain GitHub auto-slug anchors; no `{#id}` overrides; double-hyphen trap avoided. ✓

Two warnings are raised below.

---

## Warnings

### WR-01: `00-overview.md` — "Wired 802.1X availability note" blockquote is out of locked scope, undocumented in Change History, and pre-references the not-yet-authored Linux guide

**File:** `docs/admin-setup-8021x/00-overview.md:38-39`

**Issue:** The Phase 105 locked edit scope for `00-overview.md` was precisely defined in CONTEXT.md (code_context block): add item 6 entry, narrow the placeholder from "6–7" to "7," update the Change History, and leave the Mermaid node unchanged (per resolved Q3). The following blockquote was added and appears nowhere in that locked scope:

```
> **Wired 802.1X availability note:** Android Enterprise has no native Intune
> wired-network profile type -- Wi-Fi only; see the Android guide for details.
> Linux has no native Intune Wi-Fi or wired profile -- script-based EAP-TLS only
> via nmcli; see the Linux guide for details.
```

Three compounding defects:

1. **Out-of-scope addition.** Neither CONTEXT.md nor RESEARCH.md Pattern 9 prescribes this blockquote. It is an unlocked change to a file that had a tightly-scoped edit plan.

2. **Undocumented in Change History.** The Change History entry for this phase (line 63: "Added item 6 -- Android Enterprise platform-guide entry linking 06-android.md; narrowed placeholder range from 6–7 to 7") does not mention this blockquote. If it was added in this phase, the Change History is incomplete.

3. **Forward reference to non-existent content.** The note says "see the Linux guide for details." The Linux guide is Phase 106 and has not been authored. No `07-linux.md` exists yet. A reader following that forward reference hits a dead end.

**Fix:** Remove the blockquote from `00-overview.md` for now. Its content is forward-looking Linux Phase 106 material. When Phase 106 is complete, that phase's `00-overview.md` item-7 edit is the correct moment to add a wired-availability note that references both the Android and Linux guides by their real links. If the note is retained, it must be documented in the Change History and its Linux-guide forward reference must be removed or replaced with a placeholder acknowledgment that the Linux guide is forthcoming.

---

### WR-02: `06-android.md:77` — SCEP-cert pointer does not cross-reference the UPN-in-SAN WARNING, violating D-09's dual-source cross-reference requirement

**File:** `docs/admin-setup-8021x/06-android.md:77`

**Issue:** Decision D-09 (CONTEXT.md and RESEARCH.md) explicitly instructs: "Executor: cross-ref TO the WARNING from the SCEP-cert pointer AND mode matrix — not the reverse." The mode matrix cross-reference is correctly present (line 61: `(see [WARNING below](#wi-fi))`). However, the SCEP-cert pointer at line 77 contains no such cross-reference:

```markdown
For SCEP and PKCS certificate profile configuration, and the deployment ordering rule,
see [Certificate Delivery Foundation](02-cert-delivery-foundation.md). The [per-platform
cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix)
documents certificate delivery availability across all platforms.
```

An admin who follows this link to `02-cert-delivery-foundation.md` without returning to the guide may miss the UPN-in-SAN WARNING entirely. The BYOD-WP deployment failure is the highest-consequence Android-specific pitfall; D-09's dual-source cross-reference intent was to ensure two natural reading paths (via the mode matrix and via the SCEP pointer) both surface the WARNING.

**Fix:** Add an explicit BYOD-WP callout to the SCEP-cert pointer sentence. For example:

```markdown
For SCEP and PKCS certificate profile configuration, and the deployment ordering rule,
see [Certificate Delivery Foundation](02-cert-delivery-foundation.md). The [per-platform
cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix)
documents certificate delivery availability across all platforms. For Android Enterprise
personally owned work profile (BYOD-WP), the SCEP certificate SAN must include the UPN --
see the [UPN-in-SAN WARNING below](#wi-fi).
```

---

_Reviewed: 2026-06-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
