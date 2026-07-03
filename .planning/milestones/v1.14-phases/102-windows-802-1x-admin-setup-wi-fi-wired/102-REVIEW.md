---
phase: 102-windows-802-1x-admin-setup-wi-fi-wired
reviewed: 2026-06-30T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/admin-setup-8021x/03-windows.md
  - docs/admin-setup-8021x/00-overview.md
findings:
  critical: 0
  warning: 3
  info: 2
  total: 5
status: issues_found
---

# Phase 102: Code Review Report

**Reviewed:** 2026-06-30
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Both files are Markdown admin-setup documentation, so the review targeted documentation-correctness defects that would mislead an Intune admin or break the corpus: link/anchor integrity, Intune nav-path and cmdlet accuracy, KB5014754 facts, freshness-stamp convention, co-equal-EAP discipline, D-05 compliance, and Markdown structure.

What passed cleanly:
- **Links/anchors:** Every relative link and anchor in both files resolves. Targets `01-eap-method-overview.md`, `02-cert-delivery-foundation.md`, and `../_glossary-network.md` all exist; anchors `#canonical-scope-callout`, `#peap-mschapv2`, `#server-name-validation`, `#inner-outer-identity`, `#per-platform-cert-delivery-support-matrix`, and the internal `#authentication-mode` all map to real headings. No double-hyphen slug traps.
- **Overview edit:** Item 3 links to `03-windows.md`; placeholder correctly narrowed from 3–7 to 4–7; no global-nav files touched.
- **Freshness stamps:** File front-matter is +90 (`2026-06-30` → `review_by: 2026-09-28`); the inline KB5014754 callout is +180 (`2026-06-30` → `review_by: 2026-12-27`). Differentiation is correct.
- **KB5014754 facts:** SID-in-SAN, 2025-02-11 enforcement, Hybrid-Entra-Joined-only (cloud-only unaffected) — all accurate.
- **Co-equal EAP:** Both Wi-Fi and wired matrices explicitly affirm co-equality; no "recommended default" creep. TEAP is correctly carved out as a non-co-equal awareness note.
- **D-05:** The dot3svc section describes the Intune Remediations detect/remediate *pattern* with inline cmdlets — it does not ship a full `Detect-*.ps1` / `Remediate-*.ps1` file. Compliant.
- **Tables / YAML:** All matrices are well-formed (4 columns, matching separators); front-matter YAML is valid in both files.

Three warnings and two info items remain, detailed below.

## Warnings

### WR-01: `sc query` cannot display START_TYPE — wrong command for the Manual-startup check

**File:** `docs/admin-setup-8021x/03-windows.md:111`
**Issue:** The Detect step instructs: "Run `sc query dot3svc` and look for `STATE: STOPPED` or `START_TYPE: DEMAND_START` (Manual)." `sc query` only emits the runtime state fields (SERVICE_NAME, TYPE, STATE, WIN32_EXIT_CODE, CHECKPOINT, WAIT_HINT). It does **not** emit `START_TYPE`. The startup-type field is produced by `sc qc` (query config). An admin following this instruction will never see a `START_TYPE` line in the output and may conclude the field is missing or the service is fine — which is exactly the silent-failure trap this section warns against. The `STATE: STOPPED` half is valid; only the `START_TYPE` half is misattributed to the wrong command.
**Fix:** Split the command, or point START_TYPE detection at `sc qc`:
```
Detect: Run `sc query dot3svc` and look for `STATE: STOPPED`.
        Run `sc qc dot3svc` and look for `START_TYPE: 3 DEMAND_START` (Manual).
```
(The PowerShell alternative immediately following — `Get-Service -Name dot3svc` checking `StartType`/`Status` — is already correct and can remain as the recommended path.)

### WR-02: Heading-level skip — `#### In Intune admin center` (h4) placed directly under `## Wi-Fi` / `## Wired` (h2)

**File:** `docs/admin-setup-8021x/03-windows.md:62, 99`
**Issue:** Both platform sections jump from an h2 (`## Wi-Fi` line 60, `## Wired` line 97) straight to an h4 (`#### In Intune admin center` lines 62 and 99), skipping h3. In the Wired section this is also out of order: the h4 at line 99 precedes the h3 siblings that follow it (`### dot3svc Service Dependency` line 105, `### 802.1X Enforcement Staging`, etc.), producing an h2 → h4 → h3 sequence. Heading skips break TOC generation and accessibility/lint tooling and are inconsistent with the h2/h3 structure used everywhere else in the file.
**Fix:** Promote the navigation micro-headings to h3 (`### In Intune admin center`) so the hierarchy is h2 → h3 with no skip, or demote them to a bold label (`**In Intune admin center**`) if they should not appear in the TOC. Apply consistently to both the Wi-Fi and Wired sections.

### WR-03: Internal inconsistency — EAP-TTLS inner-method list differs between the Wi-Fi and Wired matrices

**File:** `docs/admin-setup-8021x/03-windows.md:77` (Wi-Fi) vs `docs/admin-setup-8021x/03-windows.md:155` (Wired)
**Issue:** For the same EAP method (EAP-TTLS), the two matrices list different inner methods:
- Wi-Fi (line 77): `PAP / MS-CHAP / MS-CHAPv2`
- Wired (line 155): `PAP / CHAP / MS-CHAP / MS-CHAPv2`
The Wired row includes `CHAP`; the Wi-Fi row omits it. The Windows EAP-TTLS inner non-EAP method set is the same across the Wi-Fi and Wired templates, so one of these is wrong — most likely the Wi-Fi row should also list `CHAP`. An admin cross-referencing the two tables gets contradictory guidance on which inner methods are selectable.
**Fix:** Reconcile the two rows. Unless a documented UI difference exists, align the Wi-Fi EAP-TTLS inner-method cell to `PAP / CHAP / MS-CHAP / MS-CHAPv2 (must match RADIUS policy)` to match the Wired matrix.

## Info

### IN-01: Overview `last_verified` not bumped despite a 2026-06-30 edit

**File:** `docs/admin-setup-8021x/00-overview.md:2-3` vs `:54`
**Issue:** The Change History records a `2026-06-30` edit (item 3 added, placeholder narrowed), but the front-matter still reads `last_verified: 2026-06-29` / `review_by: 2026-09-27`. The stamp is internally consistent (+90) and the edit was a nav-only append rather than a content re-verification, so this is a judgment call — but the file-modified date and the freshness stamp now disagree by a day.
**Fix:** If corpus convention bumps `last_verified` on any edit, update to `last_verified: 2026-06-30` / `review_by: 2026-09-28`. If the convention only bumps on content re-verification, leave as-is intentionally.

### IN-02: "Settings Catalog … these Wi-Fi settings" scoped to Wi-Fi but placed in the common section

**File:** `docs/admin-setup-8021x/03-windows.md:54-56`
**Issue:** The `### Settings Catalog` subsection sits under `## Common Profile Mechanics` (settings shared by Wi-Fi and wired) but its text reads "also exposes these **Wi-Fi** settings." The Wi-Fi-only scoping is mismatched with the "common" parent section and may read as ambiguous about whether the Settings Catalog applies to wired profiles too.
**Fix:** Either move the Settings Catalog note into the `## Wi-Fi` section, or reword to clarify it applies to both network types (e.g., "also exposes these 802.1X settings with more granular options").

---

_Reviewed: 2026-06-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
