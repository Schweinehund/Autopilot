# Phase 21: Windows Operational Gaps - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver 18 documentation files covering Windows Autopilot operational gaps beyond initial provisioning: device lifecycle management (reset, retire, re-provision, tenant migration), infrastructure prerequisites (network, Entra ID, licensing, Win32 apps, ESP timeout), security during enrollment (Conditional Access, baselines, compliance timing), migration between frameworks (APv1→APv2, on-prem imaging→Autopilot, GPO→Intune), and monitoring/operational readiness (deployment reporting, drift detection, new-batch workflow).

</domain>

<decisions>
## Implementation Decisions

### Folder Organization
- **D-01:** Create one new folder `docs/device-operations/` for post-enrollment MDM operations (WDLC-01 through WDLC-04: reset, retire, re-provision, tenant migration). This cleanly separates the deployment pipeline (`docs/lifecycle/`) from ongoing device management operations.
- **D-02:** Extend `docs/reference/` for infrastructure, security, and monitoring docs (WINF-01 through WINF-05, WSEC-01 through WSEC-03, WMON-01 through WMON-03). The reference folder's existing mixed-audience pattern (`audience: both` and `audience: L2`) accommodates this.
- **D-03:** Place migration docs (WMIG-01 through WMIG-03) in `docs/reference/` alongside other operational reference material. Migration playbooks are reference-class documents (readiness checklists, gap matrices, mapping tables).
- **D-04:** Do NOT extend `docs/lifecycle/` with post-deployment content. The existing lifecycle folder is explicitly a 5-stage deployment pipeline — Stage 5 says "final stage" and "Feeds into: Ongoing device management (outside lifecycle scope)." This scope fence is intentional and must be preserved.
- **D-05:** Do NOT create 5 new sub-domain folders (device-lifecycle, infrastructure, security-compliance, migration, monitoring). This would create shallow folder sprawl (3-4 files per folder) and break the role-based navigation model in index.md.
- **D-06:** Follow the existing `00-overview.md` or `00-index.md` convention for both `device-operations/` and any new sub-sections in `reference/`.

### Content Overlap Handling
- **D-07:** WINF-01 (network deep-dive) is a standalone doc that links to `docs/reference/endpoints.md` as the canonical URL source. WINF-01 discusses firewall rules, VPN configurations, and proxy settings FOR those endpoints — it does NOT duplicate the endpoint table. The existing pattern (lifecycle/03-oobe.md references specific URLs inline while linking to canonical source) is the model.
- **D-08:** `docs/reference/endpoints.md` stays unchanged as the compact 57-line reference table. Its 16 inbound links continue to work. New docs link TO it, not extend it.
- **D-09:** WDLC docs go in `docs/device-operations/`, NOT in `docs/lifecycle/`. A "See also" link from `lifecycle/05-post-enrollment.md` points readers to device-operations/ for reset/retire content. The "Feeds into: outside lifecycle scope" statement is reinforced, not contradicted.
- **D-10:** WSEC-01 (Conditional Access enrollment timing) is standalone with `platform: Windows` frontmatter. Phase 23 (macOS admin setup) will cross-reference it for macOS-specific resolution patterns, per REQUIREMENTS.md WSEC-01 specification.

### Migration Guide Format
- **D-11:** Adapt the existing `docs/_templates/admin-template.md` for all 3 migration guides. Do NOT create a new `migration-template.md` — only 3 instances is too thin for template amortization.
- **D-12:** Add an optional **Rollback/Recovery** section to migration guides, positioned after Steps and before Verification. For WMIG-01 (APv1→APv2 coexistence), rollback is fleet-level ("stop migrating new devices"), not device-level. Document this distinction explicitly.
- **D-13:** Reword "What breaks if misconfigured" callouts for migration context where appropriate: "What breaks if sequenced incorrectly" for timing-dependent migration steps. The underlying pattern (warning callout tied to a procedural step with runbook link) remains the same.
- **D-14:** Add an optional **Migration Prerequisites** subsection under Prerequisites for source-environment requirements (e.g., "SCCM client version X or higher", "GPO baseline documented before migration").
- **D-15:** Use `applies_to: both` frontmatter for migration docs covering both APv1 and APv2 — same convention as `docs/apv1-vs-apv2.md`. The version gate is freetext and can be adapted: "This guide covers migration from APv1 to APv2."
- **D-16:** WMIG-01's feature gap matrix is a standard Markdown table under a heading — the existing `apv1-vs-apv2.md` Feature Comparison table is the pattern. Link to it rather than duplicating.
- **D-17:** WMIG-03 (GPO→Intune) is structured by outcome (e.g., "Require device encryption", "Enforce password complexity"), NOT by GPO setting name or migration phase. Include a "Do not migrate" list for obsolete/environment-specific GPOs.
- **D-18:** WMIG-01 models an ongoing coexistence state, not a start-to-finish cutover. The guide includes criteria for when to move each device category and can run for weeks/months.

### Audience Targeting
- **D-19:** Use primary audience with cross-tier callouts — extending the existing pattern. `> **L2 Note:**` callouts already exist in lifecycle docs; add `> **L1 Action:**` callouts in admin docs and `> **Admin Note:**` callouts in shared docs.
- **D-20:** Maintain semantic distinction: `audience: both` = L1+L2 (used by lifecycle, error-codes); `audience: all` = L1+L2+admin (used by index, glossary, common-issues). Apply appropriate tag per doc.
- **D-21:** Most Phase 21 docs are `audience: admin` (infrastructure, security, migration, monitoring config). WDLC docs (device lifecycle operations) are `audience: both` since L1 handles basic resets and L2 investigates complex scenarios.
- **D-22:** For docs where L1/L2 procedures fundamentally diverge (not just depth differences), the primary doc captures the admin/configuration perspective and the divergent procedures go in cross-tier callout blocks. Do NOT create separate L1/L2 file variants — this creates maintenance drift with no shared-content mechanism.
- **D-23:** WDLC-04 (tenant-to-tenant migration) is `audience: admin` — this is a project-level operation, not an L1/L2 task. The "project team" persona maps closest to admin in the existing taxonomy.

### Claude's Discretion
- Exact file numbering within `device-operations/` and new `reference/` additions
- Whether `reference/` needs sub-sections or a new index file for the expanded content
- Exact wording for version gate adaptations in migration guides
- Ordering and grouping of WINF/WSEC/WMON docs within `reference/`
- Whether WINF-05 (ESP timeout tuning) cross-references or extends the existing `admin-setup-apv1/03-esp-policy.md` content (vs. standalone with link)
- How to handle the `common-issues.md` routing table updates for new content areas
- Whether `device-operations/` needs a decision-tree entry in `docs/decision-trees/`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Patterns (read for structural consistency)
- `docs/reference/endpoints.md` — Canonical network endpoints table; WINF-01 links here, does NOT duplicate
- `docs/lifecycle/05-post-enrollment.md` — "Feeds into: outside lifecycle scope" boundary; add "See also" link to device-operations/
- `docs/lifecycle/00-overview.md` — 5-stage pipeline structure to preserve (do NOT extend with WDLC)
- `docs/_templates/admin-template.md` — Base template for all Phase 21 docs, including migration guides (with extensions)
- `docs/_templates/l1-template.md` — L1 constraints (no PowerShell/registry); governs what L1 callout blocks can contain
- `docs/_templates/l2-template.md` — L2 investigation pattern for cross-tier callouts
- `docs/apv1-vs-apv2.md` — Feature comparison table pattern for WMIG-01 gap matrix; `applies_to: both` precedent
- `docs/admin-setup-apv1/03-esp-policy.md` — Existing ESP configuration content; WINF-05 extends or cross-references
- `docs/admin-setup-apv1/10-config-failures.md` — Configuration-Caused Failures reverse-lookup table pattern
- `docs/index.md` — Navigation hub; must be updated with new device-operations/ and reference/ entries

### Requirements
- `.planning/REQUIREMENTS.md` — WDLC-01 through WDLC-04, WINF-01 through WINF-05, WSEC-01 through WSEC-03, WMIG-01 through WMIG-03, WMON-01 through WMON-03

### Prior Phase Context
- `.planning/phases/20-cross-platform-foundation/20-CONTEXT.md` — Platform frontmatter taxonomy, template decisions, navigation restructure decisions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/reference/endpoints.md`: 57-line canonical endpoint table with test commands — WINF-01 links here as single source of truth
- `docs/apv1-vs-apv2.md`: Feature comparison table (18 rows) — reuse pattern for WMIG-01 feature gap matrix
- `docs/admin-setup-apv1/10-config-failures.md`: Configuration-Caused Failures reverse-lookup table — extend with device-operations and migration failure entries
- `docs/lifecycle/04-esp.md`: L2 Note callout pattern (`> **L2 Note:**`) — extend to L1 Action callouts for Phase 21

### Established Patterns
- **Frontmatter**: `last_verified`, `review_by` (90-day cycle), `applies_to` (APv1/APv2/both), `audience` (L1/L2/admin/both/all), `platform` (Windows/macOS/all)
- **Cross-references**: Relative markdown links (`../reference/endpoints.md`); 98+ cross-file glossary references
- **Version gate**: Freetext blockquote at top of each doc — adaptable for migration context
- **Audience callouts**: `> **L2 Note:**` in lifecycle docs; `<details><summary>L2 Deep Dive</summary>` in admin docs; `L1 Action` column in error-code tables
- **Folder convention**: `00-overview.md` or `00-index.md` in every multi-file folder

### Integration Points
- `docs/index.md`: Add device-operations/ and expanded reference/ content to navigation sections
- `docs/common-issues.md`: Add routing entries for new symptom categories (reset failures, migration issues, security enrollment loops)
- `docs/decision-trees/`: May need new tree for device lifecycle action selection ("What do you want to preserve?" per WDLC-02)
- `docs/_glossary.md`: Add new terms (device retirement, selective wipe, tenant migration, Conditional Access enrollment timing)
- `docs/lifecycle/05-post-enrollment.md`: Add "See also" link to device-operations/ content

</code_context>

<specifics>
## Specific Ideas

- WDLC-02 (device retirement) requires a "what do you want to preserve" decision tree — consider placing in `docs/decision-trees/` following established pattern
- WMIG-01 models ongoing coexistence (weeks/months of parallel APv1 + APv2), not a one-shot cutover — structure reflects this temporal dimension
- WMIG-03 uses outcome-based organization ("Require device encryption") not GPO-setting-name organization — includes "Do not migrate" list
- WINF-05 (ESP timeout tuning) extends content already in `admin-setup-apv1/03-esp-policy.md` — coordinate to avoid duplication
- All adversarial review decisions were validated through Finder/Adversary/Referee pattern (3 agents per area, 12 total) with scored confidence

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 21-windows-operational-gaps*
*Context gathered: 2026-04-13*
