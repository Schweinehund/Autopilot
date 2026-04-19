# Phase 29: iOS Admin Setup — BYOD & MAM - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 29 delivers three admin setup artifacts for iOS/iPadOS non-ADE enrollment paths plus a restructured admin setup overview:

1. A Device Enrollment guide covering Company Portal and web-based enrollment flows for personal/corporate devices without ABM (ABYOD-01)
2. An Account-driven User Enrollment guide covering privacy-preserving BYOD with explicit privacy-boundary callouts for what IT cannot see or do (ABYOD-02)
3. A MAM-WE App Protection Policies guide covering three-level data protection, enrolled-vs-unenrolled targeting, iOS-specific behaviors, and selective wipe — readable standalone without any MDM enrollment guide (ABYOD-03)
4. A restructured `admin-setup-ios/00-overview.md` that routes across all iOS admin paths (corporate ADE + BYOD + MAM-WE) instead of ADE only

This phase establishes the **privacy-limit callout pattern** for unsupervised BYOD docs, complementing (but NOT extending the visual lexicon of) the Phase 27 supervised-only callout pattern. No troubleshooting content, no navigation/index updates (Phase 32 scope), no Phase 27/28 See Also retrofits.

</domain>

<decisions>
## Implementation Decisions

### Callout Patterns for BYOD/Unsupervised (applies across ABYOD-01/02/03)

- **D-01:** ABYOD-02 uses a **hybrid privacy callout approach**: top-of-doc "Privacy Boundaries on User Enrollment" summary section + inline plain blockquote callouts at each capability's point of discussion. Inline format:
  ```
  > **Privacy limit:** [what IT cannot see/do for this capability]. See [User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).
  ```
  Top section lists the canonical privacy boundaries in bullet form; inline callouts repeat them at point-of-need so deep-link readers (from Phase 30 runbooks) are not dependent on reading the top.
- **D-02:** **NO new emoji/glyph** for privacy callouts. Plain blockquote only. Do NOT use 🔒 (overloads Phase 27 D-01/D-03 supervised-only semantics) or a new glyph like 🛡️ (extends the frozen visual lexicon). D-03 of Phase 27 locks "No variations, no abbreviated forms" for the 🔒 pattern — that lock extends in spirit to introducing parallel glyph conventions.
- **D-03:** Link target for privacy callouts is `../ios-lifecycle/00-enrollment-overview.md#user-enrollment` (parallel to Phase 27 D-02's conceptual-anchor pattern — link to the concept page, not to another admin guide).
- **D-04:** **NO inverse/unsupervised 🔓 callouts** in any guide. Unsupervised capability gaps are covered by (a) the "Capabilities Available Without Supervision" table in ABYOD-01 (D-14), and (b) short contrastive sentences where a reader might expect an ADE-only feature (e.g., "Silent install is an ADE-only capability — see [ADE enrollment profile](03-ade-enrollment-profile.md)."). This avoids proliferating the callout glyph lexicon Phase 27 locked.
- **D-05:** Add the privacy-limit callout pattern to `_templates/admin-template-ios.md` with usage rules, mirroring how Phase 27 D-01 introduced the supervised-only callout to the same template. Template comment block includes the exact format from D-01 and the link-target rule from D-03.

### Overview Page Restructure (admin-setup-ios/00-overview.md)

- **D-06:** **Rewrite** `docs/admin-setup-ios/00-overview.md` to cover ALL iOS admin paths (corporate ADE + Device Enrollment + User Enrollment + MAM-WE). Update frontmatter `applies_to: ADE` → `applies_to: all` (matching `ios-lifecycle/00-enrollment-overview.md` which already uses `applies_to: all`). Update title from "Corporate ADE Configuration and Device Management" to a path-agnostic title (Claude's discretion on exact wording — e.g., "iOS/iPadOS Admin Setup").
- **D-07:** Mermaid diagram restructured to represent ADE as a sequential chain AND BYOD/MAM-WE as parallel alternative paths. Non-ADE paths MUST NOT chain from ADE prerequisites (no dependency arrow from ADE enrollment profile to BYOD guides). Claude's discretion on visual approach — single extended diagram with branches OR path-selector matrix at top + per-path mini-diagrams. Core constraint: diagram communicates "choose your path," not "do step 7 after step 6."
- **D-08:** Overview hosts the SHARED **Intune Enrollment Restrictions** section covering platform filtering, personal/corporate ownership flag, per-user device limits, and enrollment-type blocking. This is config-tier content applicable across ABYOD-01 and ABYOD-02 (and to corporate ADE in Phase 27, though retrofit to Phase 27 guides is not in Phase 29 scope). ABYOD-01/02 cross-link to this section rather than duplicating.
- **D-09:** Prerequisites section splits into two: **ADE-path prereqs** (existing: APNs certificate Apple ID, ABM account, Intune Admin role, Intune Plan 1, enrollment path confirmed) and **BYOD-path prereqs** (APNs for Device Enrollment, Managed Apple ID considerations for User Enrollment, Microsoft 365 licensing baseline for MAM-WE). Portal navigation caveat (Phase 27 D-17) stays in the overview — not duplicated in individual guides.

### File Organization

- **D-10:** All three new guides live in `docs/admin-setup-ios/`. Directory adjacency does NOT violate SC #3 standalone-ness for MAM-WE — standalone-ness is enforced via **content rules** (no required MDM cross-reads to understand core concepts), NOT by filesystem isolation. A separate `mam-we-ios/` or similar directory would create Phase 30 runbook link churn and set a fragmented naming precedent inconsistent with `admin-setup-{platform}/`.
- **D-11:** **File numbering continues sequentially:**
  ```
  docs/admin-setup-ios/
  ├── 00-overview.md                     (restructured per D-06)
  ├── 01-apns-certificate.md             (Phase 27)
  ├── 02-abm-token.md                    (Phase 27)
  ├── 03-ade-enrollment-profile.md       (Phase 27)
  ├── 04-configuration-profiles.md       (Phase 28)
  ├── 05-app-deployment.md               (Phase 28)
  ├── 06-compliance-policy.md            (Phase 28)
  ├── 07-device-enrollment.md            (Phase 29 — ABYOD-01)
  ├── 08-user-enrollment.md              (Phase 29 — ABYOD-02)
  └── 09-mam-app-protection.md           (Phase 29 — ABYOD-03)
  ```
  The Phase 28 D-21 deferred config-failures consolidation file must be explicitly renumbered to **slot 10** (not 07) when Phase 30/32 creates it. This is called out in PLAN.md to prevent Phase 30 confusion.

### Device Enrollment Guide (ABYOD-01 — 07-device-enrollment.md)

- **D-12:** Coverage scope: **both** Company Portal enrollment AND web-based enrollment flows (REQUIREMENTS ABYOD-01 explicit). Structure: decision point at top (choose flow), then parallel per-flow sections with distinct prereqs (e.g., Company Portal app availability, Safari requirements for web-based).
- **D-13:** Depth strategy — admin prereqs first; concise conceptual + outcome walkthroughs per flow (NOT step-by-step click-paths — REQUIREMENTS out-of-scope rule "document concepts and outcomes, not click paths"); troubleshooting pointers use the **Phase 30 runbook placeholder pattern** established in Phase 28 D-22 (column text "iOS L1 runbooks (Phase 30)" until Phase 30 delivers actual files).
- **D-14:** **"Capabilities Available Without Supervision" table at TOP of guide** (before setup steps). Capability-level scannable list covering: MDM policies available, config profiles available, compliance evaluation available, app deployment modes available, AND what is NOT available (silent install, supervised-only restrictions, OS update enforcement, etc.). Satisfies SC #1 literally. Granularity is capability-level, which is distinct from the enrollment overview's per-path scope table (manageable drift).
- **D-15:** Coverage of Intune enrollment restrictions is handled in the overview (D-08) — NOT duplicated in ABYOD-01 or ABYOD-02. This guide cross-links to the overview's enrollment restrictions section.
- **D-16:** Personal vs corporate ownership flag behavior: covered as a short section in ABYOD-01 explaining the Intune "Personal" vs "Corporate" designation impact, when each applies (BYOD mode vs corporate-without-ABM mode), and how the flag affects wipe/retire behavior. Implementation mechanics only — no troubleshooting.
- **D-17:** **NO profile-based UE deprecation content in ABYOD-01** — topic belongs to ABYOD-02 (D-21). Topic-bleed is avoided.
- **D-18:** **NO privacy-limit callouts (D-01 style) in ABYOD-01** — those are ABYOD-02-scoped because account-driven User Enrollment's defining attribute is the managed APFS volume boundary. ABYOD-01 instead states management capabilities available (D-14) and links to User Enrollment for privacy-preserving use cases.

### Account-Driven User Enrollment Guide (ABYOD-02 — 08-user-enrollment.md)

- **D-19:** Privacy boundaries follow the D-01 hybrid pattern: top-of-doc "Privacy Boundaries on User Enrollment" summary section + inline plain blockquote callouts per-capability. Both layers use the same plain-blockquote format from D-01; no new glyphs (D-02).
- **D-20:** Privacy callouts cover at minimum these boundaries: (a) UDID, serial number, and IMEI not collected; (b) no device-level wipe — only managed-volume selective wipe; (c) no inventory of personal apps or data outside the managed volume; (d) no location tracking; (e) no full-device passcode enforcement (managed-content passcode only); (f) per-app VPN only (no system VPN); (g) the managed APFS volume separation (corp apps and data isolated from personal).
- **D-21:** Dedicated section in ABYOD-02 covering **profile-based User Enrollment deprecation** (iOS 18): framed forward-looking (use account-driven; profile-based is no longer available for new enrollments) rather than historical. Include the STATE.md research flag on MFA limitations (iOS 15.5, 15.7-16.3) with a "verify current requirements" note for the researcher.
- **D-22:** Prerequisites include: Managed Apple ID (with explicit distinction from personal Apple ID — critical BYOD confusion point), Service Discovery setup (`.well-known/com.apple.remotemanagement`), Microsoft Entra work account for JIT registration, iOS 15+ device support. Research flag: verify current requirements against Microsoft Learn at research time.
- **D-23:** Audience blend: REQUIREMENTS line 30 says "admin or end user." Write for admin-primary with end-user-readable prose — concise, jargon-controlled, glossary-linked where iOS/Intune terminology appears. Frontmatter: `audience: admin` (primary audience remains admin; end-user readability is a secondary quality bar).

### MAM-WE App Protection Policies Guide (ABYOD-03 — 09-mam-app-protection.md)

- **D-24:** **Standalone requirement** (SC #3, SC #4). The guide is readable without reading any MDM enrollment guide. Standalone-ness is enforced via content rules, NOT via file isolation (see D-10). Allowed: short contrast sentences disambiguating MDM-device MAM vs MAM-WE. Disallowed: required follow-through to any MDM guide for reader to understand core concepts. Opening paragraph introduces MAM-WE self-contained (what it is, what it is not, why it differs from enrollment).
- **D-25:** Three-level data protection framework coverage: **summary table** at top (all 3 levels with key differentiators — data ingress/egress, access controls, device conditions); **detailed sections with "What breaks if misconfigured" callouts for Level 2 AND Level 3**. Level 2 (typical BYOD default) and Level 3 (regulated/high-risk industries — where misconfiguration consequences are highest) both get full treatment. Level 1 gets summary table treatment only + Microsoft Learn deep link (least consequential misconfigurations, commonly used as "basic" baseline).
- **D-26:** **Dual-targeting coverage**: full both-modes (enrolled vs unenrolled devices) with decision guidance — SC #3 literal text "targeting enrolled vs unenrolled devices." Brief conceptual intro to enrolled-mode (1-2 sentences) so reader understands the distinction without needing to read Device Enrollment or ADE guides first. Per-mode sections follow with assignment UX and behavior differences.
- **D-27:** **Strictly iOS scope**. No Android references; no future-Android "See Also" placeholders; no cross-platform callouts (REQUIREMENTS Android MAM out-of-scope; PLAT-01 deferred to future milestone). Any platform-scope signaling uses iOS-specific phrasing ("on iOS devices...", "iOS-version-dependent...") — not "iOS-specific (unlike Android)".
- **D-28:** **Selective wipe coverage**: dedicated `## Selective Wipe` section placed near start of operational content (after targeting, before policy-level detail). Section covers: trigger sources (admin-initiated via Intune, user-initiated via Company Portal, conditional on compliance/Entra state), wipe scope (managed app data and corporate accounts only — NOT the device), verification steps. Includes ONE contrast sentence distinguishing from MDM device wipe (directly answers SC #4 "from the guide alone"). NO MDM-wipe subsection or comparison table (dragging MDM context in would undermine D-24).
- **D-29:** iOS-specific behaviors section: App SDK integration requirements, iOS-specific policy behaviors (keyboard restrictions, clipboard/copy-paste controls between managed and unmanaged apps), iOS-version-dependent features where applicable, and the Managed Open In boundary.

### Research Flags (from STATE.md; planner must propagate to RESEARCH.md)

- **D-30:** Verify current account-driven User Enrollment requirements against Microsoft Learn at research time: Managed Apple ID, Service Discovery configuration, iOS 15+ baseline, Entra work account integration.
- **D-31:** Verify MFA limitation ranges (iOS 15.5, 15.7-16.3) — these may have been resolved post-iOS 18.
- **D-32:** Verify profile-based User Enrollment deprecation status in Intune admin center — may have been fully removed (not just deprecated) by the time of writing.
- **D-33:** Verify three-level data protection setting lists current state against Microsoft Learn (Microsoft adds/removes settings periodically).

### Claude's Discretion

- Exact title for restructured overview (D-06)
- Mermaid diagram visual style: single extended diagram with branches, OR path-selector matrix + per-path mini-diagrams (D-07)
- Exact word count per guide (target 300-500 lines per Phase 28 D-04; MAM-WE may run slightly longer due to Level 2 + Level 3 detail)
- Which specific management capabilities populate the "Available Without Supervision" table in ABYOD-01 (D-14) — consult Microsoft Learn at research time
- Exact wording of individual privacy-limit callouts in ABYOD-02 (D-20 enumerates the boundaries; callout phrasing is content)
- Whether to add a brief "Choosing Your iOS Admin Path" decision-guide subsection in the overview (complement to the Mermaid)
- Configuration-Caused Failures table contents per guide (pattern established in Phase 27/28)
- Level 1 summary table column design in ABYOD-03 (D-25)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Structural Precedents (iOS admin setup pattern — PRIMARY templates)
- `docs/admin-setup-ios/00-overview.md` — current overview (to be restructured per D-06)
- `docs/admin-setup-ios/01-apns-certificate.md` — Phase 27 admin guide pattern
- `docs/admin-setup-ios/02-abm-token.md` — Phase 27 cross-reference pattern
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — detailed iOS admin guide pattern (Key Concepts Before You Begin, two-tier summary+detail structure, supervised-only callout usage). Structural template for ABYOD-02 (User Enrollment) and ABYOD-03 (MAM-WE) introductory sections.
- `docs/admin-setup-ios/04-configuration-profiles.md` — per-setting callout pattern
- `docs/admin-setup-ios/05-app-deployment.md` — comparison table + per-type sections pattern (structural template for ABYOD-03 three-level framework coverage)
- `docs/admin-setup-ios/06-compliance-policy.md` — **CA timing dedicated section pattern** (structural model for ABYOD-03 §Selective Wipe per D-28)

### Phase 26 Foundations (MUST cross-reference)
- `docs/ios-lifecycle/00-enrollment-overview.md` — enrollment path overview. Key sections: `#supervision` (link target for contrastive references per D-04), `#user-enrollment` (link target for privacy callouts per D-03), `### MAM Without Enrollment (MAM-WE)` (concept baseline for ABYOD-03 opening)
- `docs/ios-lifecycle/01-ade-lifecycle.md` — ADE 7-stage lifecycle (contrast context only — ABYOD-03 must NOT require reading this per SC #3)

### Phase 27/28 Pattern Context (LOCKED decisions)
- `.planning/phases/27-ios-admin-setup-corporate-ade-path/27-CONTEXT.md` — D-01 through D-17: supervised-only callout pattern (LOCKED — do not extend, overload, or parallel; see D-02 of this phase), ABM cross-reference strategy, file structure established
- `.planning/phases/28-ios-admin-setup-configuration-apps-compliance/28-CONTEXT.md` — D-01 through D-23: file numbering precedent (D-19), Phase 30 runbook placeholder pattern (D-22), config-failures consolidation deferral (D-21 — see D-11 of this phase for slot-10 correction), CA timing dedicated section approach (D-11 — model for ABYOD-03 selective wipe per D-28)

### Templates and Conventions
- `docs/_templates/admin-template-ios.md` — iOS admin template (MUST extend with privacy callout pattern per D-05)
- `docs/_templates/admin-template-macos.md` — secondary pattern reference
- `docs/_glossary-macos.md` — shared Apple glossary (User Enrollment, MAM, APNs, VPP, Managed Apple ID already live here)

### Requirements and Planning
- `.planning/REQUIREMENTS.md` — **ABYOD-01, ABYOD-02, ABYOD-03** requirements. Also enforces out-of-scope rules: Android MAM documentation (applies to D-27), Screenshot-heavy portal walkthroughs (applies to D-13).
- `.planning/ROADMAP.md` — Phase 29 details, dependencies on Phase 27, and 4 success criteria (SC #1/2/3/4 are referenced throughout decisions)
- `.planning/STATE.md` — research flags for account-driven enrollment, MFA limits, profile-based UE deprecation (applies to D-21/30/31/32)

### External Research Targets (for gsd-phase-researcher)
- Microsoft Learn — account-driven User Enrollment (requirements, Managed Apple ID, Service Discovery)
- Microsoft Learn — MAM app protection policies: three-level data protection framework (Level 1/2/3 setting inventories)
- Microsoft Learn — Intune enrollment restrictions for iOS (platform, version, personal/corporate ownership flag)
- Microsoft Learn — Intune selective wipe on MAM-WE (trigger sources, scope, verification)
- Apple Platform Deployment Reference — User Enrollment managed APFS volume architecture

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **iOS admin template** (`_templates/admin-template-ios.md`) — structural basis for all three new guides. Extension required per D-05 (add privacy callout pattern block).
- **Phase 27/28 iOS admin guides (01-06)** — structural patterns for each section (Prerequisites, Steps, What Breaks, Verification, Configuration-Caused Failures, See Also).
- **Existing overview Mermaid diagram** (`00-overview.md` lines 19-26) — base for D-07 restructure; do not discard, evolve.
- **"What breaks if misconfigured" callout pattern** from iOS admin template — used across all three new guides.
- **Phase 28 CA timing dedicated section pattern** (`06-compliance-policy.md`) — direct model for ABYOD-03 §Selective Wipe section (D-28).
- **Phase 28 "Key Concepts Before You Begin" pattern** (`03-ade-enrollment-profile.md` lines 24-44) — model for ABYOD-02's privacy boundaries summary section (D-19) and ABYOD-03's self-contained intro (D-24).
- **Phase 27 Configuration-Caused Failures table pattern** — required in all three new guides with Phase 30 runbook placeholders (D-13).
- **Existing enrollment overview capability table** (`ios-lifecycle/00-enrollment-overview.md` lines 31-36) — per-path scope reference; do not duplicate in guides (D-14 uses capability-level granularity instead).

### Established Patterns
- iOS admin template structure: Prerequisites → Key Concepts → Steps → What Breaks → Verification → Configuration-Caused Failures → See Also
- Cross-references use relative paths with section anchors (`../ios-lifecycle/00-enrollment-overview.md#supervision`)
- Frontmatter: `last_verified`, `review_by: last_verified + 90d`, `platform: iOS`, `audience: admin` (ABYOD-02 retains admin-primary per D-23)
- Forward-reference pattern for Phase 30 runbooks: placeholder text "iOS L1 runbooks (Phase 30)" in Configuration-Caused Failures tables (Phase 28 D-22)
- Portal navigation caveat centralized in overview (Phase 27 D-17); guides cross-reference — no duplication
- No Terminal/CLI steps (iOS has no command-line access; all admin actions portal-based per Phase 27 template)

### Integration Points
- Three new files in existing `docs/admin-setup-ios/` directory at slots 07/08/09 (D-11)
- `00-overview.md` evolved in place — not a new file (D-06); version-history table grows
- `_templates/admin-template-ios.md` extended with privacy callout pattern (D-05) — template evolution is part of Phase 29 scope
- `ios-lifecycle/00-enrollment-overview.md` **NOT modified** by Phase 29 — Phase 26's User Enrollment and MAM-WE sections already serve as conceptual anchors for Phase 29 guides' cross-references
- Phase 27/28 existing guides' See Also sections **NOT retrofitted** in Phase 29 — that's Phase 32 navigation-integration scope
- Each new guide's Configuration-Caused Failures table has Phase 30 placeholder runbook links
- Privacy callouts link back to Phase 26's `#user-enrollment` anchor (D-03)
- Contrastive "ADE-only capability" mentions in ABYOD-01/03 use inline prose + relative link to `03-ade-enrollment-profile.md`, not a new callout style (D-04)

</code_context>

<specifics>
## Specific Ideas

- Privacy callouts should read with end-user-plausible calm, not alarmist framing: "Privacy limit: Intune does not collect UDID, serial number, or IMEI on this enrollment path." (neutral, factual) — NOT "Privacy warning: IT cannot spy on your device..." (value-laden). Audience blend per D-23.
- The profile-based User Enrollment deprecation section in ABYOD-02 (D-21) should be framed forward-looking ("Use account-driven enrollment; profile-based UE is no longer supported for new deployments") rather than historical context. Readers arriving here want to know what to do now.
- MAM-WE opening paragraph (D-24) needs to address the "why is this here" question — readers landing on `09-mam-app-protection.md` from the overview might wonder why a non-enrollment doc lives alongside enrollment guides. One-sentence framing: "Although located alongside MDM enrollment guides, MAM-WE is an app-layer protection model that does not enroll the device in Intune..."
- The "Capabilities Available Without Supervision" table in ABYOD-01 (D-14) is the single most-scannable answer to SC #1. An admin asking "can I do X on a BYOD device?" should find the answer in <30 seconds by scanning this table. Prioritize high-signal capabilities (policy, profiles, compliance, app deployment modes, remote actions) over edge-case coverage.
- Selective wipe contrast sentence in ABYOD-03 (D-28) should be one sentence — e.g., "Unlike MDM device wipe (which resets the device to factory state), MAM-WE selective wipe removes only managed app data and corporate accounts." Anything longer drags MDM context in.
- Decision guidance in D-26 (enrolled vs unenrolled targeting) should map to real organizational patterns: enrolled mode for corporate devices with MAM-over-MDM posture; unenrolled mode for BYOD without enrollment; both for mixed fleets transitioning between models.
- Privacy callout pattern in the template (D-05) should follow the same "SUPERVISED-ONLY CALLOUT PATTERN" comment-block style that already lives in `admin-template-ios.md` — mirror the documentation convention.

</specifics>

<deferred>
## Deferred Ideas

- **Config-failures consolidation file (slot 10)** — deferred to Phase 30 or Phase 32 (same timing as macOS's `06-config-failures.md`). PLAN.md must explicitly reserve slot 10 when Phase 29 executes so Phase 30/32 has a clean slot.
- **Android MAM-WE parallel coverage** — REQUIREMENTS out-of-scope; future milestone via PLAT-01. No Android references in Phase 29 docs (D-27).
- **Shared iPad deep-dive** (multi-user partitions, Managed Apple ID requirements, iPadOS-only constraints) — future SIPAD-01.
- **iOS MAM-specific L1/L2 runbooks** (selective wipe failures, PIN loop, app protection not applying) — future ADDTS-01.
- **Apple Configurator 2 detailed guide** for manual BYOD enrollment — explicitly out of scope; one-paragraph callout in ADE guide sufficient per REQUIREMENTS out-of-scope table.
- **Retrofit of Phase 27/28 See Also sections** to link Phase 29 guides — deferred to Phase 32 navigation-integration phase.
- **Glossary additions** for MAM-WE, Managed Apple ID, Service Discovery, managed APFS volume, and related terms — deferred to Phase 32 (NAV-01) per STATE.md decision "Glossary additions extend `_glossary-macos.md`". Phase 29 guides may use these terms with plain-text first occurrences; the glossary links arrive in Phase 32.
- **ios-capability-matrix.md** cross-platform feature parity doc — Phase 32 (NAV-03).
- **Enrolled-mode MAM** (non-WE) as a separate topic — covered within ABYOD-03 as one of two targeting modes (D-26); no dedicated separate guide needed in v1.3.

</deferred>

---

*Phase: 29-ios-admin-setup-byod-mam*
*Context gathered: 2026-04-16*
*Adversarial review applied: 152 flaws evaluated across 13 sub-choices; winner-per-sub-choice backed by Finder/Adversary/Referee triangulation*
