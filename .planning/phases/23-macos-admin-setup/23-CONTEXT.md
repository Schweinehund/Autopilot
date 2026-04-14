# Phase 23: macOS Admin Setup - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver end-to-end macOS device management configuration guides through Intune and ABM — admin setup guides with per-setting "what breaks" callouts for ABM configuration, enrollment profiles, configuration profiles, app deployment, and compliance policies. Also deliver a cross-platform capability matrix showing Windows/macOS feature parity gaps, and a consolidated configuration-caused failures reverse-lookup reference.

</domain>

<decisions>
## Implementation Decisions

### Folder Placement
- **D-01:** Create `docs/admin-setup-macos/` as the folder for all macOS admin setup guide files. Content-type-first naming (`admin-setup-{qualifier}`) matches the existing `admin-setup-apv1/` and `admin-setup-apv2/` convention. This groups all admin-setup folders together alphabetically in filesystem views and aligns with ARCHITECTURE.md's planned structure.
- **D-02:** Accept the naming inconsistency with Phase 22's `macos-lifecycle/` (platform-first). The two folders serve different content types (lifecycle narrative vs admin setup guides) and users navigate via `index.md`, not filesystem browsing. The `admin-setup-*` prefix grouping (3 folders) outweighs matching the single `macos-lifecycle/` precedent.

### Guide Organization (File Structure)
- **D-03:** One file per MADM requirement, plus an overview and a consolidated config-failures reference. Total: 7 files in `docs/admin-setup-macos/`:
  - `00-overview.md` — setup sequence, dependency diagram, links to all guides
  - `01-abm-configuration.md` (MADM-01) — ADE token creation, device assignment, MDM server linking, renewal lifecycle (~140-180 lines)
  - `02-enrollment-profile.md` (MADM-02) — Setup Assistant screen customization, Await Configuration, per-setting what-breaks (~120-160 lines)
  - `03-configuration-profiles.md` (MADM-03) — Wi-Fi, VPN, email, restrictions, FileVault, firewall with per-setting what-breaks callouts (~250-350 lines)
  - `04-app-deployment.md` (MADM-04) — DMG, PKG, VPP/Apps and Books in a single file with H2 per type, comparison table, per-type prerequisites as H3 sub-sections (~150-200 lines)
  - `05-compliance-policy.md` (MADM-05) — SIP, FileVault, firewall, Gatekeeper, password with explicit "no Intune security baselines for macOS" callout (~120-160 lines)
  - `06-config-failures.md` — Consolidated reverse-lookup table for all macOS admin setup misconfigurations, following APv1's `10-config-failures.md` pattern (~80-120 lines)
- **D-04:** Direct 1:1 requirement-to-file traceability. Each MADM requirement maps to exactly one file, making verification and phase tracking straightforward.
- **D-05:** If MADM-03 (configuration profiles) exceeds 350 lines during execution, split reactively into `03a-config-profiles-network.md` (Wi-Fi, VPN, email) and `03b-config-profiles-security.md` (restrictions, FileVault, firewall). This is a reactive decision during writing, not an upfront structural choice.

### Capability Matrix Placement (MADM-06)
- **D-06:** Place the capability matrix as a standalone file in `docs/reference/macos-capability-matrix.md`, NOT in the admin setup folder and NOT as an extension of `docs/windows-vs-macos.md`. Rationale:
  - Phase 20 D-03 explicitly prohibits capability matrix content in `windows-vs-macos.md` ("Do NOT duplicate the feature parity matrix")
  - The capability matrix is a cross-platform reference document; placing it in a macOS-only admin folder creates discoverability asymmetry for Windows admins
  - `docs/reference/` already has admin-audience content, the `macos-` prefix convention (`macos-commands.md`, `macos-log-paths.md`), and a heterogeneous section taxonomy
- **D-07:** Update `docs/reference/00-index.md` to add the capability matrix under the "macOS References" section. Update `docs/index.md` Cross-Platform References table with a direct link. Update the `windows-vs-macos.md` "TBD - Phase 23" forward references to point to the new file.

### App Deployment Structure (MADM-04)
- **D-08:** Single comprehensive file (`04-app-deployment.md`) with H2 sections per app type (DMG, PKG, VPP/Apps and Books). The requirement says "guide" (singular) covering all three types. Precedent: `win32-app-packaging.md` (134 lines, 4 concepts) and `00-ade-lifecycle.md` (414 lines, 7 stages) demonstrate single comprehensive files work well.
- **D-09:** Use per-type H3 prerequisite sub-sections under the H2 Prerequisites section to handle the zero-overlap between DMG/PKG prerequisites (Intune admin center, .intunemac wrapping) and VPP prerequisites (ABM account, VPP location token, purchased licenses). Do NOT use a shared prerequisites section.
- **D-10:** Include a comparison table near the top of the file (DMG vs PKG vs VPP: size limits, detection rules, uninstall capabilities, assignment types) for at-a-glance admin reference.
- **D-11:** Include Renewal/Maintenance section for VPP token renewal lifecycle, per the macOS admin template's conditional inclusion pattern.
- **D-12:** VPP/Apps and Books section uses dual-portal sub-sections (ABM + Intune) per the macOS admin template. DMG and PKG sections are Intune-only (no ABM sub-section needed).

### Cross-Phase Patterns (Carried Forward)
- **D-13:** All guides use `docs/_templates/admin-template-macos.md` with dual-portal structure (ABM + Intune admin center sub-sections where applicable).
- **D-14:** Per-setting "what breaks if misconfigured" callouts with cross-portal symptom visibility (Phase 20 D-13).
- **D-15:** Configuration-Caused Failures tables include "Portal" column (Phase 20 D-14).
- **D-16:** Troubleshooting runbook links use `[TBD - Phase 24]` placeholder format (Phase 20 D-17).
- **D-17:** `platform: macOS` frontmatter for all new files (Phase 20 D-19).
- **D-18:** WSEC-01 (Conditional Access enrollment timing) cross-referenced from compliance policy guide for macOS-specific patterns (Phase 21 D-10).

### Claude's Discretion
- Exact section headings within each guide (adapt from template as needed)
- Whether `03-configuration-profiles.md` uses H3 per profile type or groups related profiles
- Exact ordering of entries in comparison tables and config-failures reference
- Whether overview includes a Mermaid dependency diagram or a numbered list
- How to structure the `06-config-failures.md` rows — by guide or by symptom category
- Whether `00-overview.md` includes a brief "macOS vs Windows admin experience" paragraph

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Templates and Patterns (read for structural consistency)
- `docs/_templates/admin-template-macos.md` — macOS admin guide template with dual-portal structure; ALL guides must follow this template
- `docs/admin-setup-apv1/00-overview.md` — Windows APv1 admin setup overview; pattern for `00-overview.md`
- `docs/admin-setup-apv1/10-config-failures.md` — Consolidated config failures reverse-lookup table; pattern for `06-config-failures.md`
- `docs/reference/win32-app-packaging.md` — Windows app packaging reference; structural pattern for single-file multi-concept guide (MADM-04)
- `docs/apv1-vs-apv2.md` — Feature comparison table pattern; model for capability matrix table format

### Existing macOS Content (read for cross-referencing)
- `docs/macos-lifecycle/00-ade-lifecycle.md` — macOS ADE lifecycle narrative (7 stages); admin guides cross-reference this
- `docs/reference/macos-commands.md` — macOS Terminal diagnostic commands reference
- `docs/reference/macos-log-paths.md` — macOS log paths and config profile filesystem locations
- `docs/reference/endpoints.md` — Network endpoints reference with macOS ADE section
- `docs/_glossary-macos.md` — macOS glossary with bidirectional cross-references to Windows equivalents
- `docs/windows-vs-macos.md` — Platform concept comparison page (lines 10, 67: forward references to capability matrix that must be updated)

### Cross-Platform and Navigation
- `docs/index.md` — Navigation hub; macOS Admin Setup section (line 123) has TBD placeholder to update
- `docs/reference/00-index.md` — Reference index; add capability matrix entry under macOS References section

### Requirements
- `.planning/REQUIREMENTS.md` — MADM-01 through MADM-06 requirements with acceptance criteria

### Prior Phase Context
- `.planning/phases/20-cross-platform-foundation/20-CONTEXT.md` — Platform frontmatter taxonomy, macOS template decisions (D-11 through D-18), navigation restructure
- `.planning/phases/21-windows-operational-gaps/21-CONTEXT.md` — Folder organization, WSEC-01 cross-reference decision (D-10)
- `.planning/phases/22-macos-lifecycle-foundation/22-CONTEXT.md` — Lifecycle folder placement, reference file patterns, endpoint extension decisions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/admin-template-macos.md`: 91-line template with dual-portal structure, conditional Renewal/Maintenance section, Configuration-Caused Failures table with Portal column — use directly for all MADM guides
- `docs/admin-setup-apv1/10-config-failures.md`: 102-line consolidated reverse-lookup table — structural model for `06-config-failures.md`
- `docs/reference/win32-app-packaging.md`: 134-line single-file reference covering 4 concepts with H2 sections — structural model for `04-app-deployment.md`
- `docs/admin-setup-apv1/00-overview.md`: 60-line overview with setup sequence and file links — structural model for macOS overview

### Established Patterns
- **Frontmatter**: `last_verified`, `review_by` (90-day cycle), `applies_to`, `audience`, `platform: macOS` — all new docs use this
- **Dual-portal sub-sections**: `#### In Apple Business Manager` / `#### In Intune admin center` — used where steps span both portals
- **What-breaks callouts**: Every configurable setting gets a blockquote callout specifying consequence and which portal the symptom manifests in
- **Cross-references**: Relative markdown links; `_glossary-macos.md#anchor` pattern for glossary terms
- **Version gate**: Freetext blockquote at top: "This guide covers macOS ADE configuration via Apple Business Manager and Intune"
- **File numbering**: Sequential integers (00, 01, 02...) per the APv1 and APv2 convention

### Integration Points
- `docs/index.md` line 123: macOS Admin Setup placeholder → update with link to `admin-setup-macos/00-overview.md`
- `docs/index.md` Cross-Platform References section: add capability matrix link
- `docs/reference/00-index.md`: add capability matrix under macOS References section
- `docs/windows-vs-macos.md` lines 10, 67: update TBD forward references to point to `reference/macos-capability-matrix.md`
- `docs/macos-lifecycle/00-ade-lifecycle.md`: admin guides should cross-reference lifecycle stages where relevant
- `docs/_glossary-macos.md`: may need additional terms as admin guide content reveals gaps

</code_context>

<specifics>
## Specific Ideas

- All 4 decisions validated through adversarial review (Finder/Adversary/Referee pattern, 12 agents total, 3 per area)
- D-06 is the strongest decision: Phase 20 D-03 explicitly prohibits capability matrix in `windows-vs-macos.md`, making the `docs/reference/` placement the only viable alternative to admin-setup folder
- D-05 provides a reactive escape valve for MADM-03 size — split only if needed during execution, avoiding premature decomposition
- The `06-config-failures.md` addition was identified as a gap across ALL options during adversarial review — APv1's pattern is proven and should be replicated for macOS
- App deployment (D-08) prerequisite divergence between DMG/PKG and VPP is the key structural challenge — per-type H3 sub-sections solve it cleanly

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 23-macos-admin-setup*
*Context gathered: 2026-04-14*
