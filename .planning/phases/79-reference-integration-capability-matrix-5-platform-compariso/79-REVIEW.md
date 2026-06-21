---
phase: 79-reference-integration-capability-matrix-5-platform-compariso
reviewed: 2026-06-21T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/reference/macos-capability-matrix.md
  - docs/reference/4-platform-capability-comparison.md
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 79: Code Review Report

**Reviewed:** 2026-06-21
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

This is a documentation-integration phase: a new `## Authentication` section was appended to `macos-capability-matrix.md` and a new `## Single Sign-On` section added to `4-platform-capability-comparison.md`, wiring the v1.9 macOS Platform SSO facts (authored in guides 08/09) into the two cross-platform reference docs via the link-not-copy architecture.

**Harness / convention compliance is clean.** I verified the frozen C12/C13 audit logic directly (`scripts/validation/v1.8-milestone-audit.mjs:608-679`) against the edited files:

- The comparison's `## Single Sign-On` macOS cell is byte-exact to the SC2 mandate: `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)` (em-dash confirmed `U+2014` via raw-byte inspection). It contains a valid `[text](link)` and so passes the C12 per-cell hyperlink rule (line 643 regex `/\[.+\]\(.+\)/`).
- The four non-macOS cells (Windows/iOS/Android/Linux) are bare uppercase `N/A` — the exact case-sensitive exemption at C12 line 643 (`trimmed !== 'N/A'`). A lowercase `n/a` or a link to a non-existent sibling `#authentication` would have tripped C12 / created a broken link; neither occurred.
- All six C12-named H2s (`## Enrollment`, `## Configuration`, `## App Deployment`, `## Compliance`, `## Software Updates`, `## Conditional Access`) are present and unrenamed in the comparison; the added `## Single Sign-On` is the harness-allowed 7th H2.
- Link/anchor integrity holds: the comparison's `[matrix](macos-capability-matrix.md#authentication)` resolves to the matrix's new `## Authentication` heading (GitHub slug `#authentication`); the matrix's X1 Configuration-row back-reference `— see [Authentication](#authentication)` resolves to the same in-file heading. No anchor slug drift; no existing heading was renamed or removed (cross-checked against `79-ANCHOR-INVENTORY.md`).
- DS-2 cadence honored (`last_verified: 2026-06-21` / `review_by: 2026-09-21` on both files); a Version-History row was appended to each.

The defects below are all **factual-sourcing / cross-reference** issues in the matrix Authentication cells, not harness or link-mechanics failures. The link-not-copy contract requires that each "see [guide 08]" promise actually be carried by the target; in three cells the promised content is absent from the cited source (guide 08), and one cell asserts an unsourced forward-looking Microsoft roadmap claim. These mislead admins making auth-architecture decisions and so are Warnings (not cosmetic), but none crashes the gate, so none is Critical.

## Warnings

### WR-01: Entra-licensing cell links guide 08 for "CA-integration licensing detail" that does not exist in guide 08

**File:** `docs/reference/macos-capability-matrix.md:109`
**Issue:** The cell reads `No Entra ID P1 or P2 required for Platform SSO itself; see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for CA-integration licensing detail`. Guide 08 (`08-auth-methods-deep-dive.md`) contains **zero** licensing content — no `P1`, `P2`, `Premium`, or CA-integration-licensing nuance anywhere in the file (verified by full-file grep). The link mechanically resolves (the file exists, whole-file link, no fragment) so it does not trip C13, but it is a **dangling content reference**: the link-not-copy contract (CONTEXT X1/D-01: "CA-integration P1 nuance lives in guide 08, link-not-copy — do NOT restate") presupposes guide 08 carries that nuance, and it does not. The actual P1-for-risk-based-CA nuance lives in `docs/admin-setup-linux/05-conditional-access.md`, `docs/reference/licensing-matrix.md`, etc. — never in guide 08. Separately, the bare assertion "No Entra ID P1 or P2 required for Platform SSO itself" is not grounded in either canonical source (08/09); it is plausibly true in reality but unsourced relative to the docs this phase is meant to summarize.
**Fix:** Either (a) point the link at a source that actually carries the CA-integration licensing nuance (e.g. `licensing-matrix.md` or the Linux CA guide), or (b) add the one-line CA-integration P1 nuance to guide 08 so the cited target carries it, or (c) drop the "see guide 08 for CA-integration licensing detail" clause and the unsourced P1/P2 assertion until a canonical source exists. Recommended minimal fix:
```markdown
| Entra ID licensing | n/a — not covered in this matrix | Platform SSO itself does not require Entra ID P1/P2; risk-based Conditional Access integration does require P1/P2 — see [Licensing Matrix](licensing-matrix.md) |
```

### WR-02: "Repair flow" listed as a macOS 14.0 feature is not documented in the cited guide 08 (or anywhere)

**File:** `docs/reference/macos-capability-matrix.md:108`
**Issue:** The macOS-version-floor cell enumerates the 14.0-gated capabilities as "all three methods, non-deprecated Settings Catalog key, NUAL, **Repair flow**" and then `see [guide 08] ... for macOS 13 absolute-minimum details`. Guide 08 documents three methods, the non-deprecated Settings Catalog key, and NUAL — but contains **no "Repair flow"** content. The only "repair" reference in the macOS guide set is `07-platform-sso-setup.md:192` ("There is no repair path that avoids a device wipe..."), which is the opposite of a feature. So "Repair flow" is an unsourced claim presented as a guide-08-backed, version-gated feature.
**Fix:** Remove "Repair flow" from the enumerated 14.0 feature list, or, if a PSSO "Repair" capability genuinely exists, author it in guide 08 first (link-not-copy requires the source to carry the fact) before referencing it here:
```markdown
| macOS version floor | n/a — not covered in this matrix | macOS 14.0 Sonoma (recommended floor — all three methods, non-deprecated Settings Catalog key, NUAL); see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for macOS 13 absolute-minimum details |
```

### WR-03: Hybrid-Entra-join cell asserts an unsourced forward-looking Microsoft roadmap claim ("no plans to support")

**File:** `docs/reference/macos-capability-matrix.md:112`
**Issue:** The cell reads `**Not supported** — macOS PSSO requires Entra ID (cloud-only) join; Microsoft has no plans to support hybrid Entra join on macOS`. The canonical anti-feature fact in guide 09 (`09-enterprise-sso-plugin-migration.md:51`) is: "**NOT SUPPORTED** -- Platform SSO requires Entra join (cloud-only). Hybrid Entra-joined devices are not supported by PSSO." The "requires cloud-only join / not supported" portion is correctly sourced. The trailing clause "Microsoft has no plans to support hybrid Entra join on macOS" is a forward-looking roadmap assertion that appears in **neither** guide 08 nor guide 09 — it is an embellishment beyond the canonical source. Forward-looking vendor-roadmap claims are high-drift and unverifiable; stating one in a frozen audit-gated reference doc risks going stale and misleading admins planning around it.
**Fix:** Drop the unsourced roadmap clause; keep only the sourced "not supported / requires cloud-only Entra join" fact:
```markdown
| Hybrid Entra join | n/a — not covered in this matrix | **Not supported** — macOS PSSO requires Entra ID (cloud-only) join; hybrid Entra-joined devices are not supported by PSSO — see [guide 09](../admin-setup-macos/09-enterprise-sso-plugin-migration.md) |
```
(Adding the guide-09 link is a bonus: the hybrid-join row currently carries no link at all, unlike the other six macOS auth cells, even though the canonical fact lives in guide 09.)

## Info

### IN-01: Matrix intro calls the comparison doc "4-Platform" while listing five platforms and linking a doc titled "5-Platform"

**File:** `docs/reference/macos-capability-matrix.md:11`
**Issue:** The intro sentence reads "...comparison of macOS capabilities against Windows, macOS, iOS, Android, and Linux, see [4-Platform Capability Comparison](4-platform-capability-comparison.md)." It lists **five** platforms but names the link "**4**-Platform Capability Comparison", and the target file's own H1 is "**5**-Platform Capability Comparison" (line 9). This 4-vs-5 naming drift is reader-facing and self-contradictory within the same sentence. (The filename `4-platform-capability-comparison.md` and this link text predate Phase 79, so this is a pre-existing inconsistency surfaced — not introduced — by this phase's diff; flagged as Info accordingly.)
**Fix:** Update the link text to match the target's actual title: `see [5-Platform Capability Comparison](4-platform-capability-comparison.md)` (leaving the filename as-is to avoid an out-of-scope rename + anchor/link churn across the suite).

### IN-02: Hybrid-join row is the only macOS auth cell with no link, breaking the section's link-not-copy pattern

**File:** `docs/reference/macos-capability-matrix.md:112`
**Issue:** Six of the seven macOS Authentication cells (rows 106-111) end with a `— see [guide 08]` / `[guide 09]` / `[Auth Methods Deep Dive]` link, honoring the section's stated link-not-copy contract. The hybrid-Entra-join cell (row 112) is the lone exception with no link, even though its canonical source exists (`09-enterprise-sso-plugin-migration.md:51`). This is a consistency gap, not a correctness bug. (Folded into the WR-03 fix above.)
**Fix:** Add `— see [guide 09](../admin-setup-macos/09-enterprise-sso-plugin-migration.md)` to the cell (see WR-03 snippet).

### IN-03: Comparison Single-Sign-On macOS cell deviates from the doc's locked verdict grammar (accepted by mandate)

**File:** `docs/reference/4-platform-capability-comparison.md:101`
**Issue:** The doc's verdict-vocabulary lock (line 15) specifies cells as `verdict-word` + `—` + link, with the five-state set `Supported / Partial / Not supported / Mode-dependent / n/a`. The macOS SSO cell `Supported (macOS 14+) — [matrix](...)` carries a parenthetical `(macOS 14+)` after the verdict word, deviating from that grammar. This is **intentional and sanctioned**: CONTEXT decision X3 mandates the SC2 string verbatim and notes it passes C12 (verified — the cell contains a valid `[text](link)`). No action required; recorded only so the deviation is not mistaken for an accidental grammar break in a future audit. SC2-verbatim compliance correctly outranks the editorial grammar preference here.
**Fix:** None — leave verbatim per X3. (If the verdict grammar is ever tightened to forbid parentheticals, reconcile X3 and the line-15 lock at that time.)

---

_Reviewed: 2026-06-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
