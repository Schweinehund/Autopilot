# Phase 26: iOS/iPadOS Foundation - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 26 delivers two foundational documents that anchor all downstream iOS/iPadOS phases (27-32):
1. An enrollment path overview covering all 4 iOS enrollment paths (ADE, device enrollment, user enrollment, MAM-WE) with a comparison table and selection guidance
2. An ADE lifecycle document covering supervised corporate enrollment end-to-end from Setup Assistant to post-enrollment

This phase establishes the supervision concept and enrollment type matrix that Phase 27 builds the supervised-only callout pattern upon. No admin setup content, no troubleshooting content, no navigation updates.

</domain>

<decisions>
## Implementation Decisions

### Enrollment Path Overview Format (LIFE-01)
- **D-01:** Narrative overview with embedded table format. Introductory narrative (2-3 paragraphs) establishing the iOS enrollment landscape, followed by the SC #1 comparison table, then individual per-path sections with "When to use" callouts. Target 800-1200 words total.
- **D-02:** SC #1 comparison table columns: Enrollment Path, Ownership Model, Supervision State, Management Scope, Appropriate Use Case. All four paths as rows.
- **D-03:** MAM-WE must be visually separated from the three MDM enrollment paths (distinct subsection or horizontal rule + callout) to satisfy SC #4's requirement that it be clearly identified as an app-layer model with no device enrollment.
- **D-04:** Per-path `###` heading sections (3-5 sentences each) serve as anchor targets for Phase 27-29 cross-references. Keep brief to avoid duplication with downstream admin setup guides.

### ADE Lifecycle Document Structure (LIFE-02)
- **D-05:** Mirror macOS 7-stage format with same 4 subsections per stage (What the Admin Sees, What Happens, Behind the Scenes, Watch Out For). Maximum cross-platform consistency for L2 teams managing both macOS and iOS.
- **D-06:** Mandatory supervision preamble: add a dedicated "Supervision" section before Stage 1 (or within Stage 3 as a prominent subsection) that explains the supervised/unsupervised distinction, states the enrollment-time constraint, and documents the full device erase consequence.
- **D-07:** Stage 7 rewritten for single-channel MDM management (no IME dual-channel content — iOS has no Intune Management Extension agent).
- **D-08:** Stage 4 rewritten for iOS-specific Setup Assistant panes (biometric enrollment, Display Zoom, SOS, Screen Time, etc. — NOT macOS panes like FileVault, Siri).
- **D-09:** Stage 6 rewritten for iOS Company Portal as an App Store app deployed via VPP/Apps and Books (NOT macOS DMG/PKG deployment).
- **D-10:** ABM/token content (Stages 1-2) duplicated from macOS rather than cross-referenced. Accepted ~2800 words of overlap as the cost of LIFE-02 self-containment ("without consulting external sources"). Keep iOS-specific differences inline (device types, platform filters in ABM).
- **D-11:** ACME certificate version threshold updated to iOS 16+ (macOS uses 13.1+).

### Supervision Axis Presentation
- **D-12:** Both dedicated section AND inline reinforcement (Option C). Dedicated section defines the concept, states the enrollment-time constraint, documents the full device erase (not selective wipe) consequence, and notes verification location (Settings > General > About). Inline callouts per enrollment path link back to the dedicated section anchor.
- **D-13:** The dedicated section does NOT list specific supervised-only features or capabilities. That is Phase 27/28 scope. It explains WHAT supervision is, WHEN it is set, and WHAT HAPPENS if you need to change it.
- **D-14:** SC #1's comparison table includes a "Supervision State" column with values: Supervised (ADE), Unsupervised (Device Enrollment), Unsupervised (User Enrollment), N/A (MAM-WE).
- **D-15:** Forward-reference the Phase 27 callout pattern: "Subsequent admin setup guides mark supervised-only settings with the supervised-only callout pattern."

### File Organization
- **D-16:** Create `docs/ios-lifecycle/` directory for Phase 26 content. Follows the macOS flat-directory convention (`macos-lifecycle/`, `admin-setup-macos/`).
- **D-17:** Phase 27 creates `docs/admin-setup-ios/` when admin setup content begins. Phase 30-31 L1/L2 runbooks go in shared `l1-runbooks/` and `l2-runbooks/` with `ios-` prefix and sequential numbering starting at 16.
- **D-18:** iOS admin template `_templates/admin-template-ios.md` created during Phase 27 (mirrors macOS template creation timing).
- **D-19:** Frontmatter `platform: iOS` for iOS-specific docs. The `applies_to` field uses enrollment-type-specific values where applicable (e.g., `ADE`, `all`).

### Claude's Discretion
- Mermaid pipeline diagram style and complexity (can follow macOS precedent or simplify)
- Stage Summary Table layout and "Key Pitfall" column content
- "How to Use This Guide" section wording and audience routing
- Exact word count within the 800-1200 word target for enrollment overview
- Whether to include a "Glossary Quick Reference" table at the bottom of the ADE lifecycle doc (macOS has one)
- Behind the Scenes subsection depth for iOS (no Terminal/shell access on iOS — L2 content focuses on Company Portal logs, Intune admin center inspection, MDM protocol details)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Structural Precedents
- `docs/macos-lifecycle/00-ade-lifecycle.md` -- 7-stage single-file narrative with 4 subsections per stage. PRIMARY structural template for the iOS ADE lifecycle document.
- `docs/lifecycle/00-overview.md` -- Windows lifecycle overview with mermaid diagrams and stage summary table. Secondary structural reference.
- `docs/windows-vs-macos.md` -- Cross-platform concept comparison. Pattern for table-driven comparison content.
- `docs/apv1-vs-apv2.md` -- Framework comparison with table + prose selection guidance. Pattern for enrollment path overview.

### Templates and Conventions
- `docs/_templates/admin-template-macos.md` -- macOS admin template. Basis for iOS admin template in Phase 27.
- `docs/_glossary-macos.md` -- Shared Apple glossary. iOS terms (supervision, MAM-WE, account-driven user enrollment) will be added here per Phase 32 NAV-01.

### Requirements and Planning
- `.planning/REQUIREMENTS.md` -- LIFE-01, LIFE-02 requirements and success criteria
- `.planning/ROADMAP.md` -- Phase 26 details, dependencies, and success criteria

### Existing Navigation (for awareness of cross-reference targets)
- `docs/index.md` -- Hub page that will need iOS sections in Phase 32
- `docs/common-issues.md` -- Common issues routing that Phase 32 updates
- `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` -- Quick reference cards updated in Phase 32

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- macOS ADE lifecycle document structure (7 stages, 4 subsections) is the direct template for the iOS ADE lifecycle
- Frontmatter schema (`last_verified`, `review_by`, `applies_to`, `audience`, `platform`) is established across all 116 docs
- Mermaid pipeline diagram pattern from macOS lifecycle (Stage 1 → Stage 2 → ... → conditional branch → final stage)
- Glossary cross-reference link pattern: `[term](../_glossary-macos.md#anchor)`
- Version gate blockquote pattern at top of each document

### Established Patterns
- All overview/lifecycle docs include a "How to Use This Guide" section with per-audience routing
- "Watch Out For" subsections in lifecycle stages provide inline troubleshooting context
- "Behind the Scenes" subsections serve L2 audience with technical details (endpoints, daemon behavior, log paths)
- Callout blockquotes used for version gates, operational notes, and cross-platform equivalents
- Stage Summary Table at top of lifecycle docs for quick navigation

### Integration Points
- `docs/ios-lifecycle/` directory is new — no existing content to integrate with
- Enrollment path overview must provide anchor headings (`###`) for Phase 27-29 cross-references
- ADE lifecycle doc must use consistent stage naming for Phase 30-31 triage/runbook references
- Glossary links to `_glossary-macos.md` — terms may not exist yet (Phase 32 adds them); use inline definitions with planned glossary link pattern

</code_context>

<specifics>
## Specific Ideas

- Supervision section should be prominent and unmissable — this is THE conceptual anchor for the entire v1.3 milestone
- Use "full device erase" (not just "wipe") when describing supervision change consequence, to avoid ambiguity with selective wipe
- iOS supervision verification: Settings > General > About shows "This iPhone is supervised and managed by..." (no CLI equivalent)
- Behind the Scenes on iOS differs from macOS — no Terminal access, no `pgrep`, no direct daemon inspection. L2 content focuses on Company Portal log upload, Intune admin center device properties, and MDM protocol behavior
- Account-driven user enrollment is the current standard (profile-based user enrollment deprecated in iOS 18). Document only account-driven in the enrollment overview

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 26-ios-ipados-foundation*
*Context gathered: 2026-04-16*
