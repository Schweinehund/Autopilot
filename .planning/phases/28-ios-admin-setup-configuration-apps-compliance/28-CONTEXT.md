# Phase 28: iOS Admin Setup — Configuration, Apps, Compliance - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 28 delivers three admin setup guides for iOS/iPadOS configuration, app deployment, and compliance policies:
1. A configuration profiles guide covering Wi-Fi, VPN, email, device restrictions, certificates, and home screen layout with supervised-only callouts per setting (ACFG-01)
2. An app deployment guide covering VPP device-licensed vs user-licensed, silent install (supervised-only), LOB apps, and managed app status (ACFG-02)
3. A compliance policy guide covering OS version gates, jailbreak detection, passcode, Conditional Access timing behavior, and default compliance posture (ACFG-03)

All three guides inherit the 🔒 supervised-only callout pattern established in Phase 27 (D-01 through D-04) verbatim. No BYOD content, no troubleshooting content, no navigation updates, no new template creation.

</domain>

<decisions>
## Implementation Decisions

### Device Restrictions Coverage Depth (ACFG-01)
- **D-01:** Modified category-based approach with supervision matrix. ALL supervised-only settings receive a one-liner 🔒 blockquote callout using the exact Phase 27 D-01 format, organized by category (Camera, iCloud, App Store, etc.). ~15 key settings receive full detailed treatment with "What breaks if misconfigured" callouts. This satisfies SC #1 literally (every supervised-only setting has the callout) and Phase 27 D-03 (exact blockquote format, no variations).
- **D-02:** One-liner 🔒 callouts follow the locked format: `> 🔒 **Supervised only:** [setting name] requires supervised mode. [1 sentence what unsupervised devices experience]. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).` These are not abbreviated — they use the exact blockquote format but with concise content.
- **D-03:** The ~15 key settings for full treatment are selected based on: most commonly misconfigured, highest impact on fleet management, and most likely to generate L1/L2 tickets. Selection is Claude's discretion based on research.
- **D-04:** Target document length: 300-500 lines. The two-tier pattern (category summary with one-liner callouts + detailed key settings) follows the precedent established in the ADE enrollment profile guide (03-ade-enrollment-profile.md), which uses a summary table followed by detailed sections.
- **D-05:** STATE.md research flag: Software update deferral supervision requirement changed in iOS 17 via DDM. MUST verify current supervised/unsupervised boundary against Microsoft Learn before documenting device restriction settings.

### App Deployment Structure (ACFG-02)
- **D-06:** Mirror macOS comparison table + per-type sections structure. Follows the locked "mirror macOS document structure" decision. The macOS app deployment guide (04-app-deployment.md) is the structural template: comparison table at top, per-type `##` sections with prerequisites and steps, Verification section, Configuration-Caused Failures table, See Also.
- **D-07:** Comparison table columns: **VPP Device-Licensed | VPP User-Licensed | LOB (.ipa) | Store Apps (without VPP)**. These are distinct deployment types in Intune with different behaviors (Apple Account requirements, silent install capability, assignment types, enrollment path compatibility).
- **D-08:** Add a "Key Concepts Before You Begin" section before the comparison table (following the enrollment profile guide's pattern at 03-ade-enrollment-profile.md lines 24-44). This section explains the VPP device-licensed vs user-licensed distinction concisely, giving readers the conceptual framework to interpret the table. Satisfies SC #2's "understands the distinction" requirement.
- **D-09:** Silent install gets a prominent 🔒 supervised-only callout in the VPP sections, placed immediately after the setting description per D-04 from Phase 27. This is the primary supervised-only feature in the app deployment guide.
- **D-10:** "Managed app status" coverage maps to a Verification section (similar to macOS guide's pattern) showing where to check managed app installation status in Intune admin center. Managed vs unmanaged maps to deployment types: VPP and LOB apps deployed through Intune are managed; user-installed App Store apps are unmanaged.

### Compliance-to-CA Timing Gap (ACFG-03)
- **D-11:** Dedicated `## Compliance Evaluation Timing and Conditional Access` section in the compliance guide. This is a standalone section (not an inline callout) that directly answers SC #4: "what happens to a device's CA access state in the window between enrollment completion and first compliance evaluation."
- **D-12:** The section states the key facts inline (the gap exists, default compliance posture behavior, CA behavior during grace period, first evaluation timing) — enough to satisfy SC #4's "from the compliance guide alone" requirement. Then cross-references `reference/compliance-timing.md` and `reference/ca-enrollment-timing.md` for detailed timing mechanics, edge cases, and resolution patterns.
- **D-13:** This hybrid approach resolves the duplication concern (reference docs remain canonical for deep-dive content) while providing a linkable `#compliance-evaluation-timing-and-conditional-access` anchor for Phase 30/31 L1/L2 runbooks.
- **D-14:** The section includes the "Mark devices with no compliance policy assigned as" toggle explanation (Compliant vs Not compliant default) since this is the key variable that determines CA behavior during the gap.
- **D-15:** Departs from macOS compliance guide structure (which uses a cross-reference-only approach for CA timing). This is an accepted structural difference because SC #4 explicitly requires the answer to be determinable "from the compliance guide alone" — macOS had no equivalent success criterion.

### Compliance Guide General Structure (ACFG-03)
- **D-16:** Mirror macOS compliance guide structure for the per-setting sections: "Compliance vs. Configuration" distinction table at top, per-setting sections with "What breaks" callouts (OS version, jailbreak detection, passcode), Actions for Noncompliance section.
- **D-17:** iOS-specific additions beyond macOS: jailbreak detection setting (no macOS equivalent), supervised-only callouts per setting where applicable, and the dedicated CA timing section (D-11).
- **D-18:** Default compliance posture ("Mark devices with no compliance policy assigned as") must be documented both in the CA timing section (D-14) and in the compliance policy creation steps, since it affects both CA behavior and compliance reporting.

### File Organization
- **D-19:** Files numbered sequentially continuing from Phase 27: `04-configuration-profiles.md`, `05-app-deployment.md`, `06-compliance-policy.md` in `docs/admin-setup-ios/`.
- **D-20:** Update `docs/admin-setup-ios/00-overview.md` to add links to the three new guides in the setup sequence and extend the Mermaid dependency diagram.
- **D-21:** Config-failures consolidation file deferred to Phase 30 or Phase 32 (when runbook links exist and all iOS admin guides are complete). Follows the macOS creation sequencing where `06-config-failures.md` was created after all 5 individual guides existed.
- **D-22:** Each guide includes its own inline `## Configuration-Caused Failures` table (matching the pattern already established in Phase 27 guides 01-03). Runbook column uses "iOS L1 runbooks (Phase 30)" placeholder text until Phase 30 delivers actual runbook files.
- **D-23:** Cross-references from supervised-only callouts use the established link target: `../ios-lifecycle/00-enrollment-overview.md#supervision` (locked in Phase 27 D-02).

### Claude's Discretion
- Selection of the ~15 key device restriction settings for full detailed treatment
- Comparison table row attributes for the app deployment guide (beyond the required: Apple Account, silent install, assignment types, size limits)
- Exact word count for each guide (target similar length to macOS equivalents, except configuration profiles which will be longer due to D-01)
- "What breaks" callout wording for individual settings
- Whether to include a "Compliance vs. Configuration" table adapted for iOS (macOS has one — may need iOS-specific adjustments)
- Number of compliance settings to detail beyond the required OS version, jailbreak, and passcode (e.g., device threat level if relevant)
- Mermaid diagram style in the updated overview page

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Structural Precedents (macOS equivalents — PRIMARY templates)
- `docs/admin-setup-macos/03-configuration-profiles.md` — macOS configuration profiles guide. Structural template for ACFG-01 (Wi-Fi, VPN, email, certificates, restrictions, "What breaks" pattern). iOS guide will be longer due to D-01 supervised-only one-liner coverage.
- `docs/admin-setup-macos/04-app-deployment.md` — macOS app deployment guide. PRIMARY structural template for ACFG-02 (comparison table, per-type sections, verification, config-caused failures).
- `docs/admin-setup-macos/05-compliance-policy.md` — macOS compliance guide. Structural template for ACFG-03 per-setting sections. iOS adds the dedicated CA timing section (D-11) which macOS does not have.

### Phase 26/27 Foundations (MUST cross-reference)
- `docs/ios-lifecycle/00-enrollment-overview.md` — Enrollment path overview with `## Supervision` section. Link target for ALL 🔒 supervised-only callouts (Phase 27 D-02).
- `docs/ios-lifecycle/01-ade-lifecycle.md` — ADE lifecycle with 7 stages. Cross-reference for enrollment context.
- `docs/admin-setup-ios/00-overview.md` — Admin setup overview/routing page. Must be updated with links to 04-06.
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — ADE enrollment profile guide. Pattern reference for "Key Concepts Before You Begin" section (D-08) and two-tier summary+detail structure (D-04).

### Existing Reference Docs (for CA timing cross-references)
- `docs/reference/compliance-timing.md` — Compliance evaluation timing mechanics. Cross-reference target from D-12.
- `docs/reference/ca-enrollment-timing.md` — CA and enrollment timing reference. Cross-reference target from D-12.

### Templates and Conventions
- `docs/_templates/admin-template-ios.md` — iOS admin template created in Phase 27. All three guides follow this template.
- `docs/_templates/admin-template-macos.md` — macOS admin template. Secondary reference for pattern consistency.
- `docs/_glossary-macos.md` — Shared Apple glossary for terminology links.

### Requirements and Planning
- `.planning/REQUIREMENTS.md` — ACFG-01, ACFG-02, ACFG-03 requirements and success criteria
- `.planning/ROADMAP.md` — Phase 28 details, dependencies, and 4 success criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- macOS admin setup guides (03-05) are the direct structural templates for all three Phase 28 iOS guides
- iOS admin template (`_templates/admin-template-ios.md`) provides the frontmatter schema, platform gate, and section structure
- "What breaks if misconfigured" callout pattern from macOS template — used across all admin guides
- 🔒 supervised-only callout pattern from Phase 27 (D-01) — established and tested in 03-ade-enrollment-profile.md
- "Key Concepts Before You Begin" section pattern from 03-ade-enrollment-profile.md — reusable for app deployment guide
- Configuration-Caused Failures table pattern from all Phase 27 iOS guides (01-03)

### Established Patterns
- All admin guides follow the iOS admin template structure: Prerequisites → Steps → What Breaks → Verification → Configuration-Caused Failures → See Also
- Cross-reference links use relative paths with section anchors
- Portal navigation steps use imperative voice ("Navigate to...", "Select...", "Enter...")
- Frontmatter: `platform: iOS`, `audience: admin`, `applies_to: ADE`
- Two-tier pattern (summary table/list + detailed sections) established in 03-ade-enrollment-profile.md

### Integration Points
- Three new files (04-06) in existing `docs/admin-setup-ios/` directory
- `00-overview.md` must be updated to include links and extend Mermaid diagram
- Each guide's Configuration-Caused Failures table has "Phase 30" placeholder runbook links
- Supervised-only callouts link back to Phase 26's enrollment overview supervision section
- CA timing section cross-references existing reference docs (not duplication)

</code_context>

<specifics>
## Specific Ideas

- Device restrictions one-liner callouts should be scannable — an admin should be able to quickly determine if a specific restriction is supervised-only without reading the full guide
- The VPP device vs user licensing "Key Concepts" section in the app deployment guide should make the Apple Account requirement difference unmissable — this is the #1 admin confusion point
- Silent install 🔒 callout should be one of the most prominent in the app deployment guide — it's a common deployment failure when admins expect silent install on unsupervised devices
- The CA timing dedicated section should be concise (not a full reference doc rewrite) — state the facts, answer SC #4, cross-reference for depth
- Default compliance posture toggle is the single most impactful compliance setting for Day 1 device experience — make it unmissable in both the CA timing section and the compliance policy steps

</specifics>

<deferred>
## Deferred Ideas

- Config-failures consolidation file (`07-config-failures.md`) — deferred to Phase 30 or Phase 32 when runbook links exist and all iOS admin guides are complete. Follows macOS creation sequencing precedent.

</deferred>

---

*Phase: 28-ios-admin-setup-configuration-apps-compliance*
*Context gathered: 2026-04-16*
