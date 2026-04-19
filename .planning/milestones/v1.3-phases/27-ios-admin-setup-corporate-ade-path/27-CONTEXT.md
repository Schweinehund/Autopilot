# Phase 27: iOS Admin Setup — Corporate ADE Path - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 27 delivers four artifacts for corporate ADE admin setup:
1. An iOS admin template (`_templates/admin-template-ios.md`) adapting the macOS admin template for iOS-specific conventions
2. An admin setup overview page (`docs/admin-setup-ios/00-overview.md`) serving as index and prerequisites hub
3. An APNs certificate guide covering creation, renewal, and cross-platform expiry warning (ACORP-01)
4. An ABM/ADE token guide cross-referencing the macOS ABM guide for shared portal steps with iOS-specific differences inline (ACORP-02)
5. An ADE enrollment profile guide covering supervised mode, authentication methods, Setup Assistant customization, and locked enrollment with the 🔒 supervised-only callout pattern (ACORP-03)

This phase formally establishes the supervised-only callout pattern (blockquote format) that all subsequent iOS phases (28-32) inherit. No BYOD content, no troubleshooting content, no configuration profile content.

</domain>

<decisions>
## Implementation Decisions

### Supervised-Only Callout Pattern (SC #4)
- **D-01:** Blockquote format with lock emoji. Exact pattern:
  ```
  > 🔒 **Supervised only:** [feature/setting name] requires supervised mode. [1-2 sentence explanation of what this means for unsupervised devices.] See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).
  ```
- **D-02:** Link target is `../ios-lifecycle/00-enrollment-overview.md#supervision` (the conceptual anchor from Phase 26). This answers "what does supervised mean?" for the reader. Do NOT link to the enrollment profile guide — that's where you *enable* supervision, which is different context.
- **D-03:** Every supervised-only setting in all three guides MUST use this exact callout format. No variations, no abbreviated forms. Downstream phases (28-32) inherit this pattern verbatim.
- **D-04:** The callout is placed immediately after the setting description, before any configuration steps for that setting. It serves as a gate: "if your device is not supervised, this setting does not apply."

### ABM Cross-Reference Strategy (ACORP-02)
- **D-05:** Structured cross-reference with inline summary. Each section of the ABM/token guide:
  1. Summarizes what the macOS guide covers (1-2 sentences of context)
  2. Links to the specific macOS section: `[ABM Configuration: Section Name](../admin-setup-macos/01-abm-configuration.md#section-anchor)`
  3. States iOS-specific differences inline (e.g., device type filter, Intune portal location)
- **D-06:** iOS guide does NOT duplicate macOS portal click-paths. The macOS ABM guide (`admin-setup-macos/01-abm-configuration.md`) is the single source of truth for ABM portal navigation. iOS guide owns only enrollment profile creation (doc 03).
- **D-07:** If the macOS ABM guide section has no iOS-specific differences, a single sentence with the cross-reference link is sufficient. Do not pad with redundant summary.

### APNs Certificate Guide Scope (ACORP-01)
- **D-08:** Scope: creation, renewal, and cross-platform expiry impact warning. Per-step "What breaks if misconfigured" callouts following the macOS admin template convention.
- **D-09:** The renew-not-replace rule is the critical "What breaks" callout: creating a NEW certificate instead of renewing breaks ALL existing iOS, iPadOS, and macOS device MDM communication. Devices must be re-enrolled. Always renew, never create new.
- **D-10:** No diagnostic procedures or troubleshooting steps. That is Phase 31 (L1/L2 troubleshooting) scope. The guide is preventive, not reactive.
- **D-11:** APNs certificate is shared infrastructure across iOS/iPadOS/macOS. The guide must state this cross-platform impact explicitly — one expired certificate breaks management for ALL Apple platforms.

### Document Structure and Numbering
- **D-12:** File structure for `docs/admin-setup-ios/`:
  ```
  docs/admin-setup-ios/
  ├── 00-overview.md                  (index + shared prerequisites)
  ├── 01-apns-certificate.md          (ACORP-01)
  ├── 02-abm-token.md                 (ACORP-02)
  └── 03-ade-enrollment-profile.md    (ACORP-03)
  ```
- **D-13:** Overview (00) serves as admin-setup routing page with prerequisites checklist and links to all three guides. Phase 32 navigation updates will link to this page.
- **D-14:** Ordering follows dependency chain: APNs certificate must exist before ABM token can be created, ABM token must exist before enrollment profile can be assigned.

### iOS Admin Template
- **D-15:** Create `_templates/admin-template-ios.md` FIRST (Plan 01), adapting the macOS admin template (`_templates/admin-template-macos.md`). All three guides follow this template for structural consistency.
- **D-16:** Template adaptations from macOS:
  - `platform: iOS` in frontmatter
  - Platform gate blockquote references iOS enrollment overview and macOS cross-platform guide
  - "What breaks if misconfigured" callout convention carried over from macOS template
  - Supervised-only callout pattern (D-01) included as a template element with usage instructions
  - No Terminal/CLI steps (iOS has no Terminal access — all admin actions are portal-based)

### Research Flags (from STATE.md)
- **D-17:** ADE enrollment profile UI is being redesigned (Q2 CY2026). The enrollment profile guide (03) should document concepts and outcomes rather than exact click-paths. Include a note: "Portal navigation may vary by Intune admin center version." Verify current UI against Microsoft Learn before writing portal steps.

### Claude's Discretion
- Exact word count for each guide (target similar length to macOS equivalents)
- Prerequisites checklist content for the overview page
- Whether to include a "Renewal/Maintenance" section in guides beyond APNs (the macOS template says "include ONLY when the guide's subject has a renewable component")
- "What breaks" callout wording beyond the renew-not-replace rule
- Number of Setup Assistant panes to detail in the enrollment profile guide vs referencing Phase 26's Stage 4 list
- Mermaid diagram in overview showing the dependency chain (APNs → ABM → Enrollment Profile)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Structural Precedents
- `docs/admin-setup-macos/00-overview.md` -- macOS admin setup overview. Pattern for iOS overview page.
- `docs/admin-setup-macos/01-abm-configuration.md` -- macOS ABM guide. PRIMARY cross-reference target for ACORP-02. iOS ABM token guide links to specific sections of this doc.
- `docs/admin-setup-macos/02-enrollment-profile.md` -- macOS enrollment profile guide. Structural template for ACORP-03 (iOS enrollment profile guide).
- `docs/_templates/admin-template-macos.md` -- macOS admin template. BASIS for iOS admin template creation (D-15).

### Phase 26 Foundations (MUST cross-reference)
- `docs/ios-lifecycle/00-enrollment-overview.md` -- Enrollment path overview with `## Supervision` section. Link target for all supervised-only callouts (D-02).
- `docs/ios-lifecycle/01-ade-lifecycle.md` -- ADE lifecycle with 7 stages. Cross-reference for enrollment profile guide (Stage 3-4 context).

### Requirements and Planning
- `.planning/REQUIREMENTS.md` -- ACORP-01, ACORP-02, ACORP-03 requirements
- `.planning/ROADMAP.md` -- Phase 27 details, dependencies, and success criteria
- `docs/_glossary-macos.md` -- Shared Apple glossary for terminology links

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- macOS admin template (`_templates/admin-template-macos.md`) is the direct template for the iOS admin template
- macOS admin setup guides (00-05) provide structural precedent for all four iOS admin docs
- Frontmatter schema (`last_verified`, `review_by`, `applies_to`, `audience`, `platform`) established across 118 docs
- "What breaks if misconfigured" callout pattern from macOS admin template
- Platform gate blockquote pattern from macOS admin guides
- Prerequisites checklist format from macOS admin setup overview

### Established Patterns
- All admin guides follow the macOS admin template structure: Prerequisites → Steps → What Breaks → Renewal/Maintenance (if applicable) → See Also
- Cross-reference links use relative paths with section anchors
- Portal navigation steps use imperative voice ("Navigate to...", "Select...", "Enter...")
- Steps spanning both ABM and Intune portals use `#### In Apple Business Manager` and `#### In Intune admin center` sub-sections

### Integration Points
- `docs/admin-setup-ios/` directory is new — no existing content to integrate with
- Supervised-only callout pattern established here is inherited by Phase 28-32
- Overview page (00) will be linked from `docs/index.md` in Phase 32 navigation update
- APNs certificate guide is the first cross-platform infrastructure doc (affects iOS + macOS)

</code_context>

<specifics>
## Specific Ideas

- The supervised-only callout should feel like a gate/warning, not an afterthought — it's the most visible pattern in the entire v1.3 milestone
- APNs renew-not-replace is the single most critical "What breaks" callout across all Apple admin docs — make it unmissable
- ABM cross-reference should feel seamless, not like "go read another doc" — enough inline context that the reader understands what they're cross-referencing before clicking
- Enrollment profile guide will be the longest of the three — supervised mode, authentication methods (modern auth vs legacy vs none), Setup Assistant panes, locked enrollment, user affinity all need coverage
- Portal navigation caveat (D-17) should appear once in the overview, not repeated in every guide

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 27-ios-admin-setup-corporate-ade-path*
*Context gathered: 2026-04-16*
