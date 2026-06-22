---
phase: 76-platform-sso-admin-setup-guide
reviewed: 2026-06-21T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - docs/admin-setup-macos/07-platform-sso-setup.md
  - docs/admin-setup-macos/03-configuration-profiles.md
  - docs/admin-setup-macos/00-overview.md
findings:
  critical: 0
  warning: 1
  info: 3
  total: 4
status: issues_found
---

# Phase 76: Code Review Report

**Reviewed:** 2026-06-21
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Reviewed the three documentation files for the macOS Platform SSO admin setup guide phase. These are markdown docs, so the review targeted technical/factual accuracy, internal link and anchor integrity, corpus-convention consistency, and contradictions against the locked decisions.

**Overall assessment: the documentation is sound.** No Critical defects were found. Every authoritative fact in the review focus is present and internally consistent. All internal links resolve, all anchors are stable, the not-yet-existing guides (08/09) are correctly rendered as code spans rather than live links, and the DS-1 locked decision is explicitly honored (the ADE section states "This is NOT a supervised-only feature" and clearly separates the advanced ADE-during-Setup path from the default post-enrollment flow). Front-matter, Version-History tables, callout style, and heading skeletons all match sibling guides.

One Warning (a finding raised in the review focus that the docs do not address) and three Info items are noted below.

### Verification performed

- **Authoritative facts — all correct:** extension id `com.microsoft.CompanyPortalMac.ssoextension` (07.md:71), Team ID `UBF8T346G9` (07.md:72), payload `com.apple.extensiblesso` (07.md:15,67), token `{{DEVICEREGISTRATION}}` (07.md:74), dual-field macOS 13 `Authentication Method (Deprecated)` vs macOS 14+ `Platform SSO > Authentication Method` (07.md:79-80,99-110), ADE path macOS 26 + Company Portal 5.2604.0 (07.md:159-161), `app-sso platform -s` verification (07.md:124). Cross-checked against `_glossary-macos.md` (three mutually-exclusive auth methods, Smart Card macOS 14+, Error 10002, user-group assignment) — fully consistent.
- **Internal links — all resolve:** `_glossary-macos.md` and its anchors `#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in` all exist; `../macos-lifecycle/00-ade-lifecycle.md`, `03-configuration-profiles.md`, `01/04/05/06-*.md`, `../reference/endpoints.md#macos-ade-endpoints`, `../reference/macos-commands.md`, `../l1-runbooks/12-macos-profile-not-applied.md`, `../admin-setup-apv1/00-overview.md`, `../admin-setup-apv2/00-overview.md`, `../reference/macos-capability-matrix.md`, `../windows-vs-macos.md` all exist.
- **Guides 08/09 correctly NOT live links:** `08-auth-methods-deep-dive.md` and `09-enterprise-sso-plugin-migration.md` do not exist on disk and are rendered as code spans in 00-overview.md:47-49 and 07.md:59 context — no dangling link.
- **07.md live link present:** 03-configuration-profiles.md:168 links to `07-platform-sso-setup.md` as live markdown (matches the Phase 76 PSSO-01/D-06 changelog entry).
- **In-page anchors verified:** `#known-silent-blockers--resolve-before-deployment` (07.md:25, em-dash dropped + collapsed double-hyphen — correct GitHub slug) and `#advanced--optional-ade-during-setup-assistant` (07.md:150, slash+colon removed yielding double-hyphen — correct slug) both match their target headings.
- **Anchor stability in 03.md:** the repeated `#### In Intune admin center` sub-headings are intact across all sections (Wi-Fi, VPN, Email, Restrictions, FileVault, Firewall, Gatekeeper, PPPC, Extensible SSO); the Phase 76 edit only converted a code span to a live link and added a changelog row — no heading shift/rename.
- **Front-matter & convention parity:** 07.md/03.md front-matter (`last_verified: 2026-06-20`, `review_by: 2026-09-20`, `applies_to: ADE`, `audience: admin`, `platform: macOS`) matches sibling guides; all eight macOS guides use the same `| Date | Change | Author |` history-table format.
- **DS-1 (no supervised-only claim):** honored — 07.md:152 explicitly states the ADE-during-Setup path "is NOT a supervised-only feature" and the default standard path is post-enrollment.
- **Bootstrapping-blockers callout placement:** the "Known Silent Blockers — Resolve Before Deployment" callout (07.md:25-35) appears in Prerequisites, before the Settings Catalog step (Step 3, 07.md:61) — requirement met.

## Warnings

### WR-01: ADE section lacks its own `last_verified` / `review_by` provenance

**File:** `docs/admin-setup-macos/07-platform-sso-setup.md:150-190`
**Issue:** The review focus calls for front-matter `last_verified`/`review_by` on the ADE section specifically. The file carries a single document-level front-matter block (lines 2-3) that covers the whole guide, but the appended "Advanced / Optional: ADE-during-Setup-Assistant" section (lines 150-190) — which contains the most volatile, version-gated claims in the entire guide (macOS 26 hard gate, Company Portal 5.2604.0, wipe-and-re-enroll recovery) — carries no section-local verification stamp. Because this material is the likeliest to drift as the macOS 26 / Company Portal 5.2604.0 features GA, a reader cannot tell whether the ADE block was verified on the same date as the post-enrollment content, and a future reviewer updating only the standard path could leave the ADE claims stale without any signal. The document-level `last_verified` would silently vouch for unreviewed ADE content.
**Fix:** Add a lightweight provenance marker at the top of the ADE section, e.g. a callout line immediately under the `## Advanced / Optional: ADE-during-Setup-Assistant` heading:
```markdown
> **Section last verified:** 2026-06-20 · **Re-verify by:** 2026-09-20 — macOS 26 / Company Portal 5.2604.0 ADE-during-Setup-Assistant feature is newly GA; re-confirm version gates and the wipe-and-re-enroll recovery procedure against Microsoft Learn at re-verification.
```
This keeps the corpus single-front-matter convention intact while attaching dated provenance to the high-drift block, as the review focus requires.

## Info

### IN-01: 00-overview.md Mermaid diagram shows nodes 8/9 as solid boxes while the list marks them deferred

**File:** `docs/admin-setup-macos/00-overview.md:28-30, 47-49`
**Issue:** The Mermaid `graph LR` renders nodes H (`8. Auth Methods Deep-Dive`) and I (`9. Enterprise SSO Migration`) as ordinary solid nodes identical to the existing guides, while the numbered list correctly marks them as code spans with "(added in a later documentation phase)". A reader scanning the diagram may infer guides 8 and 9 already exist. This is not a broken link (Mermaid nodes are not clickable markdown links), so it is Info-only, but the diagram and list disagree on availability status.
**Fix:** Distinguish the not-yet-authored nodes visually, e.g. give H and I a dashed/greyed style and a "(planned)" suffix:
```mermaid
  G --> H[8. Auth Methods<br/>Deep-Dive<br/>planned]
  G --> I[9. Enterprise SSO<br/>Migration<br/>planned]
  style H stroke-dasharray: 5 5
  style I stroke-dasharray: 5 5
```

### IN-02: FileVault Policy version gate (`macOS 15+`) is asserted without a corroborating reference

**File:** `docs/admin-setup-macos/07-platform-sso-setup.md:81`
**Issue:** The table row `Platform SSO > FileVault Policy | AttemptAuthentication | macOS 15+; Password method only` introduces a macOS 15 gate that is not mentioned in the macOS-version prerequisites (line 23) nor cross-referenced anywhere else in the guide or glossary. It is not contradicted by anything in the corpus (so not a Warning), but it is a standalone version claim with no provenance, making it harder to re-verify than the other version gates (which are repeated/explained). Confirm the field is in fact macOS 15-gated rather than macOS 14.
**Fix:** Add a brief note or footnote citing the source for the macOS 15 floor, or fold the FileVault-method caveat into the dual-field/version discussion so it is traceable during the next `review_by` pass.

### IN-03: Runbook target `35-macos-sso-sign-in-failure.md` references a future phase and is intentionally not linked

**File:** `docs/admin-setup-macos/07-platform-sso-setup.md:135-137`
**Issue:** The Configuration-Caused Failures table lists the runbook as `35-macos-sso-sign-in-failure.md (Phase 80)` in plain text (code span, not a link), correctly avoiding a dangling link to an unwritten file. This is good practice and is flagged only as a tracking note: when Phase 80 lands, these three plain-text references should be converted to live links, mirroring the Phase 76 PSSO-01/D-06 pattern that converted the 07.md reference in 03-configuration-profiles.md.
**Fix:** No action required now. Add a backlog item to convert these to live markdown links once `35-macos-sso-sign-in-failure.md` exists.

---

_Reviewed: 2026-06-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
