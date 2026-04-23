# Phase 38: Dedicated Devices Admin - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning
**Method:** Adversarial review (finder/adversary/referee scored pattern) across 14 candidate options in 4 gray areas + 17 cross-cutting concerns. 90 flaws scored; 65 confirmed real; 25 disproved (1 CRIT, 18 MED, 6 LOW). Winners selected on lowest-real-flaw basis (lowest CRIT count first, then lowest weighted total: 5×CRIT + 2×MED + 1×LOW). Per-area winners: 1D / 2C / 3C / 4C (all 0 CRIT).

<domain>
## Phase Boundary

Phase 38 delivers ONE admin guide — the third mode-specific corporate-ownership admin guide in the v1.4 Android Enterprise milestone — extending Phase 36 COBO enrollment-profile mechanics with kiosk/COSU-specific structure and the Dedicated-mode-distinct re-provisioning behavior:

1. `docs/admin-setup-android/05-dedicated-devices.md` — Android Enterprise Dedicated (kiosk/COSU) device admin setup: dual-stakeholder persona callout (Intune Admin + LOB Operations Owner per PITFALL 7), 4-scenario overview (single-app / multi-app / digital signage / Entra shared device mode), enrollment-profile delta from COBO (token type Standard vs Entra shared device mode; static Entra device group; QR rotation discipline; MHS app config), MHS exit-PIN synchronization callout (the top repeated-escalation pattern for Dedicated devices), Android 15 FRP re-provisioning callout (3-pathway behavior matrix distinct from COBO re-enrollment), tri-portal H4 retention (Intune + MGP + ZT, since Dedicated supports ZTE provisioning), KME/ZT Samsung mutual-exclusion reminder. (AEDED-01, AEDED-02, AEDED-03)

Phase 38 does NOT own:

- **MGP binding mechanics** — Phase 35 `01-managed-google-play.md` owns. Dedicated doc references, never duplicates (Anti-Pattern 1 guard, PITFALL 2).
- **ZT portal mechanics** (account creation, DPC extras JSON, ZT↔Intune linking) — Phase 35 `02-zero-touch-portal.md` owns. Dedicated doc references at enrollment-flow level only.
- **Corporate-scale ZTE content** (reseller-upload handoff, device claim workflow, profile assignment at scale, dual-SIM IMEI 1 registration) — Phase 39 owns as extension to Phase 35 ZT portal doc. Phase 38 does NOT carry these.
- **COBO enrollment-profile mechanics** (Intune navigation, token creation step-by-step) — Phase 36 `03-fully-managed-cobo.md#enrollment-profile` and `#enrollment-token` own. Phase 38 cross-links via 3C hybrid pattern; restates only Dedicated-specific deltas.
- **EFRP policy configuration steps** — Phase 36 `#configure-efrp` owns. Phase 38 carries the parallel-but-distinct re-provisioning behavior matrix; cross-links Phase 36 for EFRP config (Phase 36 D-05 "no pre-empting" guard).
- **Provisioning-method matrix** — Phase 34 `02-provisioning-methods.md` owns. Dedicated doc carries constraint callouts only (filtered-row link pattern).
- **Version matrix + Android 15 breakpoint narrative** — Phase 34 `03-android-version-matrix.md` owns. Dedicated doc cross-references the breakpoint.
- **Dedicated L1 triage runbook** — Per PITFALL 7 line 197 "Do not write a standard L1 runbook for dedicated devices; the L1 triage tree should route kiosk failures to L2 (policy investigation) or the LOB operations owner (app-side issue)." Phase 40 triage tree handles routing; no Dedicated-specific L1 runbook is in scope for v1.4.
- **Dedicated L2 investigation content** — Phase 41 owns log-collection (`18-android-log-collection.md`) covering Dedicated as part of corporate-mode coverage. Phase 38 does NOT carry L2 content.
- **AOSP / BYOD WP / COBO mode content** — Phase 36 / 37 / 39 own.

Carrying forward from Phases 34, 35, 36, and 37 (LOCKED — do not re-open):

- **Tri-portal admin template** (Phase 34 D-16..D-22) — Dedicated retains all three H4 sub-sections "In Intune admin center" / "In Managed Google Play" / "In Zero-Touch portal" because Dedicated supports ZTE provisioning per the 5×4 provisioning-method matrix. HTML-comment subtractive-deletion pattern does NOT apply (none of the three sections deleted).
- **Tri-portal shorthand** (Phase 34) — "Intune admin center" / "Managed Google Play (MGP)" / "Zero-Touch portal (ZT portal)". Full names on first appearance per doc, shorthand thereafter.
- **Mode labels** (Phase 34) — "Dedicated (kiosk/COSU)" on first use; "Dedicated" thereafter. Never use "supervision" as an Android management term (AEAUDIT-04, PITFALL 3).
- **Anti-Pattern 1 guard** (Phase 34 D-26) — matrices live in single canonical reference docs. Dedicated doc references Phase 34 provisioning-method matrix and version matrix via filtered-row link patterns; never duplicates.
- **PITFALL 1 discipline** — every behavioral assertion carries an inline version tag ("Applies to Android 8.0+", "Changed in Android 15", etc.). Milestone audit (AEAUDIT-04) greps for version-tagless assertions.
- **PITFALL 2 pattern** — "What breaks if misconfigured" callouts per every configurable setting (inherited from admin-template-macos/ios/android precedent).
- **PITFALL 7 audience-mismatch mitigation** — persona callout (Intune Admin + LOB Operations Owner) MANDATORY before any Intune steps; scenario-based overview MANDATORY before any Intune steps; no Dedicated L1 runbook (Phase 40 triage tree routes to L2 or LOB ops only).
- **PITFALL 9 / PITFALL 11 guard** — no modifications to v1.0-v1.3 shared files (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`, `_glossary.md`, `_glossary-macos.md`, `docs/admin-setup-ios/*`, `docs/admin-setup-macos/*`, `docs/l1-runbooks/*`, `docs/l2-runbooks/*`).
- **AEAUDIT-04 guards** — no "supervision" as Android management term; Play Integrity only, never SafetyNet; `last_verified` frontmatter mandatory; no Android links in v1.0-v1.3 shared files.
- **60-day review cycle** — frontmatter `last_verified` + `review_by` with 60-day window (fast-moving platform; MHS exit-PIN MEDIUM-confidence claim is highest-drift in this phase).
- **Phase 36 anchor stability contract** — Phase 38 cross-references Phase 36 anchors `#enrollment-profile`, `#enrollment-token`, `#provisioning-method-choice`, `#android-15-frp`, `#configure-efrp`, `#cope-migration` (where COPE↔Dedicated note arises).
- **Phase 35 D-23 anchor `#kme-zt-mutual-exclusion`** — Dedicated doc ZT-provisioning inline callout cross-links per D-11 below.
- **Phase 37 D-10/D-11 source-confidence marker pattern** — inline markers `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` matching regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` apply to MHS exit-PIN MEDIUM-confidence claim and any FRP-pathway MEDIUM-confidence claim per D-12.
- **Phase 36 / Phase 38 / Phase 40 / Phase 41 anchor-stability contract** — Phase 38 publishes mandatory anchors per D-08 below; downstream phases consume them. Renaming breaks downstream cross-references.
- **Phase 34 `_glossary-android.md` cross-references** — Dedicated terms (`#dedicated-device`, `#cosu`, `#managed-home-screen`, `#lock-task-mode`, `#entra-shared-device-mode`, `#play-integrity`) use Phase 34 D-10 cross-platform callout pattern on first appearance.
- **Frontmatter schema** — `platform: Android`, `audience: admin`, `applies_to: Dedicated`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD`. Per Phase 36 D-13 / Phase 37 D-15 single-string convention for `applies_to`.

Research flags to verify at plan/execute time (from STATE.md + this phase):

- **MHS exit-PIN failure pattern** — MEDIUM confidence (community-confirmed via Bayton + community reports; not in current MS Learn as authoritative). Plan-time verification required against current Microsoft Learn `setup-dedicated` page + Jason Bayton bayton.org for current status; if not in MS Learn at plan time, MEDIUM-confidence label per Phase 37 D-10.
- **Dedicated device default token expiry** — verify what Intune sets by default when no expiry specified (FEATURES.md line 263 hints at token rotation needs for printed/laminated QR codes that go stale at expiry). Configurable up to 65 years standard; default value not currently documented in CANDIDATES research.
- **Dedicated FRP behavior 3-pathway nuance** — FEATURES.md line 261 states "Dedicated devices do NOT have FRP for Settings > Factory data reset; FRP applies only via recovery/bootloader reset; Intune wipe bypasses FRP" — verify against current Microsoft Learn `setup-dedicated` page; if community-only, MEDIUM-confidence label per Phase 37 D-10. This is materially DIFFERENT from COBO Android 15 FRP behavior.
- **Intune admin center Dedicated enrollment profile blade path** — current path per STACK.md line 74: "Devices > Enrollment > Android > Enrollment Profiles > Corporate-owned dedicated devices"; verify at plan time (Intune console renames frequently per Phase 36 D-15-D-16 verification protocol).
- **MHS app package ID** — `com.microsoft.launcher.enterprise` per FEATURES.md line 241; verify current package ID.
- **Verbatim Intune error string for MHS exit-PIN mismatch** — community sources cite "a PIN to exit kiosk mode has not been set by your IT admin" (FEATURES.md line 258) — verify exact quoted text against Microsoft Learn `setup-dedicated` page or Bayton reference; MEDIUM confidence if community-only.

</domain>

<decisions>
## Implementation Decisions

### Persona + scenario overview shape (AEDED-01 SC1 + SC5 + PITFALL 7) — GA1 winner: 1D

- **D-01:** **Persona callout in Key Concepts H2 + 4-row scenario comparison table + one-paragraph "How to choose" routing note.**
  - **Persona** lives as an `### Audience and stakeholders` H3 inside `## Key Concepts` H2 (Phase 36 D-08 precedent reapplied). ~150 words. Both stakeholders described with example responsibilities. Uses PITFALL 7 line 194 verbatim core wording: "Audience: Intune Admin + Line-of-Business Operations Owner. The operations owner defines the locked app(s); the Intune admin configures the enrollment and kiosk policy." Brief expansion follows naming concrete responsibilities (e.g., "LOB ops owner picks which apps run on the warehouse scanner; Intune admin configures the enrollment profile and kiosk lock-task allowlist"). Stable anchor `#audience-and-stakeholders`.
  - **Scenario overview** as `## Scenarios` H2 (after Key Concepts; before Prerequisites): one comparison table + one routing paragraph.
    - Table columns: **Scenario | Locking style | Token type | User identity model | Example deployment**. 4 rows: Single-app kiosk / Multi-app kiosk (MHS) / Digital signage (userless) / Entra shared device mode. ~250 words.
    - Routing paragraph `### How to choose` ~100 words: explicit Entra-shared-device-mode-vs-multi-app-kiosk disambiguation per SC5 lock (genuinely-shared = Entra identity per user; multi-app kiosk = single device account, no per-user sign-in). Disambiguation phrasing: "Multi-app kiosk = curated app set on a device with no per-user identity. Entra shared device mode = curated app set on a device where multiple workers sign in/out with their own Entra credentials."
  - **Total length:** persona ~150 + scenarios ~400 = ~550 words. Within constraint (persona 100-200 / scenario overview 300-600).
  - *Winner of GA1 adversarial review (1D: 0 CRIT / 3 MED / 1 LOW = weighted 7) over 1A (0 CRIT / 4 MED / 1 LOW = 9 — F-1A-01 banner-only persona underweights LOB owner contribution; F-1A-04 no anchor stability), 1B (1 CRIT / 2 MED / 1 LOW = 10 — F-1B-01 per-scenario H3 walkthrough creates structural pressure for matrix duplication, Anti-Pattern 1 collision; F-1B-04 SC5 risk via duplicate content), 1C (0 CRIT / 3 MED / 2 LOW = 8 — F-1C-01 decision-tree overlap actively harms SC5 disambiguation; F-1C-02 mermaid maintenance burden).*

### MHS exit-PIN sync callout placement & emphasis (AEDED-02 SC2) — GA2 winner: 2C

- **D-02:** **Dedicated H2 section `## Exit-kiosk PIN synchronization` + inline reminders at both affected settings.**
  - **H2 section** (~200 words) carries the SC2 lock phrase verbatim, source-confidence marker, and remediation. Body shape:
    - Opens with ⚠️ blockquote: "**Multi-app kiosks and digital signage:** the exit-kiosk PIN MUST be configured identically in both the device restrictions profile AND the Managed Home Screen app configuration. Mismatch causes a visible error at kiosk exit attempt — the top repeated-escalation pattern for Dedicated devices. `[MEDIUM: community/Bayton, last_verified YYYY-MM-DD]`"
    - Body (~120 words): explains the two locations, the failure mode, plan-time verification of the verbatim Intune error string per research flag, and remediation: "If you see 'a PIN to exit kiosk mode has not been set by your IT admin,' verify both locations match." (Verbatim error string MEDIUM-confidence per research flag.)
    - Stable anchor `#exit-kiosk-pin-synchronization` (sub-anchor `#exit-kiosk-pin` for short-form references).
    - Single canonical home for the source-confidence marker (other inline reminders MAY repeat but the H2 is source-of-truth).
  - **Inline reminders** at the two settings (~30 words each): one in the device restrictions profile section, one in the MHS app configuration section. Each cross-links to `#exit-kiosk-pin-synchronization` and quotes the SC2 lock phrase: "the exit-kiosk PIN MUST be configured identically in both this setting AND the [other location]; see Exit-kiosk PIN synchronization for the failure pattern."
  - **Section position:** H2 placed AFTER Provisioning method choice and BEFORE Android 15 FRP re-provisioning section (semantically: configure the kiosk → understand what breaks → understand re-provisioning behavior). Single-app kiosk scenario is exempted from the warning (no MHS used) — H2 framing makes scope explicit.
  - *Winner of GA2 adversarial review (2C: 0 CRIT / 2 MED / 1 LOW = weighted 5) over 2A (1 CRIT / 3 MED / 1 LOW = 12 — F-2A-01 PITFALL 2 violation, what-breaks must be inline at point of admin decision; F-2A-02 single-banner skim-skip per Phase 35 D-13 F-039 precedent), 2B (0 CRIT / 3 MED / 2 LOW = 8 — F-2B-01 no canonical anchor for Phase 40/41 routing — Phase 36 D-10 contract violation), 2D (1 CRIT / 3 MED / 1 LOW = 12 — F-2D-01 Phase 37 D-05 misappropriation: AMAPI was 3 distinct behavioral changes, MHS exit-PIN is one).*

### Phase 36 enrollment-profile cross-reference depth (AEDED-01 SC1, ROADMAP "extends COBO") — GA3 winner: 3C

- **D-03:** **Hybrid orientation paragraph cross-linking Phase 36 + Dedicated-specific deltas inline (Phase 36 D-01 winner pattern reapplied).**
  - **Orientation paragraph** (~80 words) at the top of `## Enrollment profile` H2: "Dedicated profile creation follows the same Intune flow as Fully Managed (COBO) — see [Phase 36 enrollment profile section](03-fully-managed-cobo.md#enrollment-profile) for the canonical step-by-step (open Intune admin center → Devices → Enrollment → Android → Enrollment Profiles → Corporate-owned dedicated devices). The Dedicated-specific deltas below explain what differs."
  - **Dedicated-specific deltas** inline (~280 words):
    - **Token type selection** (with inline what-breaks): Standard token vs "Corporate-owned dedicated device with Microsoft Entra ID shared mode" token. Decision criterion: per-user sign-in needed → Entra shared device mode token; otherwise Standard. What-breaks: wrong token type means the chosen scenario is structurally unavailable (e.g., picking Standard for a multi-shift sign-in scenario).
    - **MHS app config requirement** (multi-app + digital signage scenarios only): Managed Home Screen app (`com.microsoft.launcher.enterprise`) MUST be assigned as Required to the device group; cross-link to multi-app scenario row in `#scenarios` table. What-breaks: MHS not assigned → device boots to standard Android launcher; no kiosk lockdown.
    - **Static Entra device group assignment**: per STACK.md line 74. What-breaks: dynamic group used → token-check enrollment failures during burst provisioning when device group membership lags behind enrollment.
    - **Token expiry + QR rotation discipline** (per F-XCUT-05 / D-09): research-flag default value verification + practical guidance — laminated/posted QR codes go stale at token expiry; plan rotation before printing. Cross-link to Phase 36 `#enrollment-token` for general token mechanics.
  - **Total length** for `## Enrollment profile` section: ~360 words (orientation 80 + deltas 280).
  - **Anti-Pattern 1 discipline preserved:** Phase 36 canonical mechanics never restated; Dedicated deltas are net-new content not in Phase 36.
  - *Winner of GA3 adversarial review (3C: 0 CRIT / 3 MED / 2 LOW = weighted 8) over 3A (1 CRIT-equivalent + 3 MED / 1 LOW = 10 — F-3A-01 ROADMAP "extends COBO" wording violation; F-3A-02 admin journey discontinuity for LOB ops persona; F-3A-03 50-word delta orientation under-specifies 4 deltas), 3B (2 CRIT / 4 MED / 0 LOW = 18 — F-3B-01 Anti-Pattern 1 hard violation; F-3B-02 Phase 36 D-10 anchor contract abandonment; F-3B-03 doubles drift surface for portal-UI assertions), 3D (3 CRIT / 3 MED / 0 LOW = 21 — F-3D-01 Anti-Pattern 1 + explicit cross-link forbiddance; F-3D-02 ROADMAP wording violation; F-3D-03 Phase 36 D-10 anchor contract abandonment).*

### Android 15 FRP re-provisioning callout (AEDED-03 SC3) — GA4 winner: 4C

- **D-04:** **Dedicated-owned H2 callout section `## Android 15 FRP and re-provisioning` covering the 3-pathway behavior matrix + cross-link to Phase 36 for EFRP config (parallel-but-distinct from Phase 36 D-05).**
  - **H2 placement:** AFTER `## Exit-kiosk PIN synchronization` H2 and BEFORE `## Renewal / Maintenance` H2 (semantically: configure → understand kiosk failure → understand re-provisioning behavior → operate).
  - **H2 body** (~280 words):
    - Opens with ⚠️ blockquote: "Dedicated devices are typically re-provisioned (factory reset + re-enroll), not re-enrolled in place. On Android 15, FRP behavior depends on which reset pathway you use. `[MEDIUM: community/MS Learn, last_verified YYYY-MM-DD]`"
    - **3-pathway breakdown** with what-breaks per pathway (per D-12 source-confidence marker placement):
      1. **Settings > Factory data reset** — no FRP triggered on Dedicated devices; safe for routine re-provisioning. (Materially DIFFERENT from COBO behavior.) `[MEDIUM: FEATURES.md line 261, last_verified YYYY-MM-DD]` What-breaks: relying on Settings reset for offline/abandoned devices that no admin can reach is fine for FRP, but token expiry must still be valid.
      2. **Recovery/bootloader reset** — FRP applies. EFRP pre-config required to recover, otherwise Google account credential intervention needed. What-breaks: field-replacement workflow that uses recovery reset on devices without EFRP pre-configured = lockout.
      3. **Intune wipe** — bypasses FRP. Cleanest re-provisioning pathway when admin can reach the device through Intune. What-breaks: requires the device to be online and Intune-managed at the moment of wipe; offline devices need pathway 1 or 2.
    - **Closing cross-links:**
      - "Configure EFRP via Intune policy — see [Phase 36 EFRP configuration](03-fully-managed-cobo.md#configure-efrp)." (Phase 36 owns EFRP config canonical content per Phase 36 D-05.)
      - "For the Android 15 FRP behavioral breakpoint, see [Android version matrix § Android 15](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint)." (Phase 34 owns the breakpoint narrative.)
    - Stable anchor `#android-15-frp-reprovisioning`.
  - **Section-level version-tag** "Applies to Android 15+" at top of section satisfies PITFALL 1 for the Android-15-specific assertion umbrella; per-pathway content covered by section-level scope (per F-4A-02 Referee adjudication: pathways are sub-claims of one Android 15 assertion; section-level version-tag suffices).
  - **AEDED-03 SC3 verbatim compliance:** body explicitly describes "FRP behavior during factory-reset re-provisioning" via the 3-pathway breakdown.
  - **Phase 36 D-05 "no pre-empting" guard respected:** Phase 38 owns re-provisioning behavior matrix; Phase 36 owns EFRP config; cross-link consolidates EFRP step-level config in Phase 36.
  - *Winner of GA4 adversarial review (4C: 0 CRIT / 4 MED / 2 LOW = weighted 10) over 4A (0 CRIT / 3 MED / 2 LOW = 8 — F-4A-01 3-pathway nuance squeezed too tight at 150 words; F-4A-03 no H2/anchor for Phase 40/41 routing), 4B (2 CRIT / 3 MED / 0 LOW = 16 — F-4B-01 Phase 36 D-05 "no pre-empting" hard violation; F-4B-02 Anti-Pattern 1 violation restating EFRP config), 4D (1 CRIT / 4 MED / 3 LOW = 16 — F-4D-01 Anti-Pattern 1 near-violation 4× duplicate; F-4D-02 no canonical anchor for Phase 40/41; F-4D-06 SC3 "a callout" singular framing risk).* Note: 4A weighted (8) is lower than 4C (10), but 4C ranks higher on the lowest-CRIT-then-content-completeness rule applied per the user's "depth wins ties" preference for AEDED-03 SC3 verbatim coverage. Both are 0-CRIT; 4C provides the canonical anchor (resolving F-4A-03) and adequate 3-pathway depth (resolving F-4A-01) at the cost of 2 additional MED (F-4C-01 placement question — addressed by D-04 placement above; F-4C-04 PITFALL 1 burden per pathway — addressed by section-level version-tag per F-4A-02 Referee adjudication).

### Cross-cutting decisions to close confirmed gaps

- **D-05:** **LOB Operations Owner persona definition.** LOB Operations Owner = the business stakeholder who defines locked app(s) per Dedicated scenario (e.g., warehouse-floor manager picking the inventory-scanner app; retail manager picking the customer-self-service app set; signage operations lead picking the digital-signage app). NOT an Intune RBAC role; the LOB ops owner does not need Intune admin permissions. Persona callout (D-01) names example responsibilities so an Intune Admin reading the doc understands which decisions belong to the LOB ops counterpart. Closes F-XCUT-01.

- **D-06:** **Doc-shape lock (Phase 37 D-12 precedent reapplied).** H2 section order:
  1. Frontmatter (per D-18)
  2. Platform gate blockquote (per D-10)
  3. ARCH Q6 Platform note banner (per D-10)
  4. `## Key Concepts` H2 — includes `### Audience and stakeholders` H3 (D-01 persona) + `### Terminology` H3 (cross-platform callouts per D-19 + Phase 34 D-10 pattern; disambiguates Dedicated vs iOS Shared iPad vs Windows Shared PC via glossary cross-link)
  5. `## Scenarios` H2 — D-01 comparison table + `### How to choose` H3 routing paragraph (SC5 disambiguation)
  6. `## Prerequisites` H2 — MGP binding reference (Phase 35 `#bind-mgp`); Android 8.0+ device requirement; factory reset required; tenant-conditional ZT portal reference (only for Dedicated-via-ZTE scenarios)
  7. `## Enrollment profile` H2 — D-03 hybrid orientation + Dedicated-specific deltas
  8. `## Enrollment token` H2 — token expiry + rotation; QR code rotation discipline (D-09); cross-link to Phase 36 `#enrollment-token`
  9. `## Provisioning method choice` H2 — filtered-row link to Phase 34 `02-provisioning-methods.md` matrix per Phase 36 D-01 hybrid pattern + Dedicated-specific constraint callouts per method (QR-recommended primary; NFC available; afw#setup available; ZT covered with KME/ZT mutual-exclusion reminder per D-11)
  10. `## Exit-kiosk PIN synchronization` H2 — D-02 SC2 callout
  11. `## Android 15 FRP and re-provisioning` H2 — D-04 SC3 callout
  12. `## What-breaks (inline per setting)` — woven through enrollment profile + provisioning method sections per PITFALL 2; not a standalone H2 (Phase 36 D-11 precedent — what-breaks anchored as `#what-breaks` umbrella reference rather than a single section)
  13. `## Renewal / Maintenance` H2 — token rotation cadence; MGP binding review reminder; EFRP policy drift check (cross-link Phase 36); MHS app config drift check
  14. `## For L1 helpdesk agents` H2 (OPTIONAL — planner discretion) — admin-side context for L1 routing per PITFALL 7 mitigation; explicit guardrail "This section does NOT contain L1-executable steps; per PITFALL 7, Dedicated-device failures route to L2 or LOB ops owner."
  Closes F-XCUT-02 + F-XCUT-17.

- **D-07:** **Length envelope target: 3200-4200 words.** Above Phase 37 admin (3000-4000) to accommodate D-02 MHS exit-PIN H2 + D-04 Android 15 FRP re-provisioning H2 + 4-scenario coverage + D-01 persona/scenarios + D-03 enrollment-profile-deltas, all net-new content not in Phase 36/37 docs. Per-section approximate budget (Claude's discretion within ±10%):
  - Frontmatter / Platform gate / Platform note banner: 100-200
  - Key Concepts (persona + terminology): 250-400
  - Scenarios (table + routing): 350-450
  - Prerequisites: 200-300
  - Enrollment profile (D-03 orientation + deltas): 350-450
  - Enrollment token: 200-300
  - Provisioning method choice (per Phase 36 D-01 pattern adapted): 350-500
  - Exit-kiosk PIN synchronization (D-02): 200-280
  - Android 15 FRP and re-provisioning (D-04): 280-380
  - Renewal / Maintenance: 200-300
  - For L1 helpdesk agents (optional): 0-200
  Closes F-XCUT-03.

- **D-08:** **Mandatory anchor stability contract for Phase 40 / 41 consumers.** Phase 38 MUST publish these stable HTML-id anchors via `<a id="...">` scaffolding (Phase 36 / 37 precedent); renaming breaks downstream cross-references.
  - `#audience-and-stakeholders` (persona — Phase 40 may route LOB-vs-admin disambiguation here)
  - `#scenarios` (scenario overview — Phase 40 triage tree may anchor "which scenario?")
  - `#prerequisites` (MGP + device requirements)
  - `#enrollment-profile` (D-03 hybrid section — Phase 40 L1 runbook 24 may reference Dedicated deltas)
  - `#enrollment-token` (token mechanics + QR rotation — Phase 40 routing per D-09)
  - `#provisioning-method-choice` (filtered-row callouts — Phase 40 routing)
  - `#exit-kiosk-pin-synchronization` (D-02 H2 — primary Phase 40/41 routing target for kiosk failures)
  - `#exit-kiosk-pin` (sub-anchor for short-form refs)
  - `#android-15-frp-reprovisioning` (D-04 H2 — Phase 41 L2 investigation reference target for Dedicated FRP)
  - `#what-breaks` (umbrella anchor for inline what-breaks references)
  - `#renewal-maintenance` (token rotation, MGP review, EFRP drift, MHS app drift)
  Closes F-XCUT-04.

- **D-09:** **Token expiry default + QR rotation discipline in D-03 deltas.** D-03 enrollment-profile-deltas section MUST include:
  - **Default token expiry verification:** plan-time research-flag verification per FEATURES.md line 263 hint about token rotation; what Intune sets by default when no expiry specified. If default behavior cannot be verified at plan time, label MEDIUM-confidence per Phase 37 D-10 marker pattern.
  - **QR code rotation discipline:** "Token expiry rotation breaks any printed/laminated/posted QR enrollment artifacts. When rotating tokens, generate new QR + redistribute to all field locations using the old token. Plan rotation cadence to align with operational refresh windows." Cross-link to Phase 36 `#enrollment-token` for general token mechanics.
  Closes F-XCUT-05 + F-XCUT-16.

- **D-10:** **ARCH Q6 Platform note banner mandatory (cross-platform disambiguation).** At top of doc (after Platform gate blockquote, before Key Concepts H2): `> **Platform note:** "Dedicated device" in Android Enterprise (COSU — Corporate-Owned, Single-Use) is single-purpose kiosk hardware with no per-user identity. This is structurally distinct from iOS Shared iPad (multi-user shared identity) and Windows Shared PC (multi-user fast-switch). For cross-platform comparison, see [Android dedicated device disambiguation](../_glossary-android.md#dedicated-device).` Per ARCHITECTURE.md Q6 line 402 mandate. Closes F-XCUT-08.

- **D-11:** **KME/ZT Samsung mutual-exclusion callout in ZT-provisioning constraint callout.** Per Phase 36 D-06 precedent, Dedicated `## Provisioning method choice` H2 ZT callout MUST carry one-line note: "Samsung Knox fleets: choose Knox Mobile Enrollment (KME) or Zero-Touch, never both. Full KME coverage deferred to v1.4.1." Cross-link to Phase 35 `02-zero-touch-portal.md#kme-zt-mutual-exclusion` (Phase 35 D-23 reserved anchor). Closes F-XCUT-09.

- **D-12:** **Source-confidence marker scope (per Phase 37 D-10/D-11).** Inline markers `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` matching Phase 37 D-11 regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` apply to:
  - **MHS exit-PIN synchronization** (D-02 H2) — canonical marker location is the H2; inline reminders MAY repeat (Adversary correct that repetition isn't forbidden); H2 is source-of-truth.
  - **Verbatim Intune error string for MHS exit-PIN mismatch** — research flag MEDIUM-confidence per FEATURES.md line 258; marker required.
  - **Dedicated FRP 3-pathway behavior** (D-04 H2) — research flag MEDIUM-confidence per FEATURES.md line 261; marker required at section opening blockquote AND on each pathway line where source basis matters (e.g., Settings-reset-no-FRP claim is the most community-sourced of the three).
  - **Dedicated default token expiry** (D-09) — if plan-time verification doesn't yield HIGH MS Learn confirmation, MEDIUM marker required.
  Closes F-XCUT-10.

- **D-13:** **SC5 Entra shared device mode disambiguation mechanism — both table cell AND routing prose.** SC5 disambiguation lives in BOTH the D-01 scenarios table (User identity model column row-level) AND the `### How to choose` routing paragraph (sentence-level explicit contrast). Disambiguation phrasing locked: "Multi-app kiosk = curated app set on a device with no per-user identity. Entra shared device mode = curated app set on a device where multiple workers sign in/out with their own Entra credentials." Closes F-XCUT-13.

- **D-14:** **MHS scope explicit — multi-app + digital signage scenarios only.** D-02 H2 framing makes MHS scope explicit. Single-app kiosk does NOT use MHS (uses Lock Task Mode directly per FEATURES.md lines 234-238); D-02 H2 opening sentence explicitly excludes single-app from the warning ("Multi-app kiosks and digital signage:"). D-01 scenarios table flags which scenarios use MHS in the Locking style column. Closes F-XCUT-14.

- **D-15:** **Phase 39 ZT extension boundary.** D-03 enrollment-profile-deltas reference Phase 35 ZT portal anchor for ZT-provisioning mechanics; explicitly acknowledge in `## Provisioning method choice` H2 ZT callout that "corporate-scale ZTE content (reseller-upload handoff, device claim workflow, dual-SIM IMEI 1 registration) is delivered separately in Phase 39 — see Phase 35 ZT portal doc as the current canonical entry point." Phase 38 Dedicated does NOT carry corporate-scale ZTE content. Closes F-XCUT-15.

- **D-16:** **Research-flag verification protocol (Phase 36 D-15 / D-16 precedent reapplied).** Plan-phase researcher MUST run plan-time verification for:
  1. MHS exit-PIN failure pattern (current MS Learn `setup-dedicated` + Bayton bayton.org status; if not authoritative in MS Learn, MEDIUM-confidence label)
  2. Dedicated default token expiry behavior (Intune default value when no expiry specified)
  3. Android 15 Dedicated 3-pathway FRP behavior per FEATURES.md line 261 (verify Settings-reset-no-FRP, recovery-reset-FRP-applies, Intune-wipe-bypass against current Microsoft Learn)
  4. Intune admin center Dedicated enrollment profile blade path (current navigation per STACK.md line 74)
  5. MHS app package ID (`com.microsoft.launcher.enterprise` confirmation)
  6. Verbatim Intune error string for MHS exit-PIN mismatch
  Findings recorded in phase RESEARCH.md. Executor re-verifies portal-UI-specific assertions at execute time per Phase 36 D-16 precedent.
  Closes F-XCUT-16.

- **D-17:** **Shared-file modification guard (Phase 36 D-14 / Phase 37 D-16 precedent reapplied).** Phase 38 MUST NOT modify: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, `docs/_glossary-android.md`, any file under `docs/admin-setup-ios/`, any file under `docs/admin-setup-macos/`, any file under `docs/l1-runbooks/`, any file under `docs/l2-runbooks/`, any file under `docs/end-user-guides/`, any file under `docs/admin-setup-android/` except NEW file `05-dedicated-devices.md`, any file under `docs/android-lifecycle/`, any file under `docs/_templates/`. PITFALL 9 / PITFALL 11 / AEAUDIT-04 enforcement. Closes F-XCUT-17 (partial — Phase 37 D-12 doc-shape lock parallel handled in D-06).

### Frontmatter, audit, and review-cycle decisions

- **D-18:** **Frontmatter.** `platform: Android`, `audience: admin`, `applies_to: Dedicated`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle per Phase 34 D-14 / Phase 35 D-18 / Phase 36 D-13 / Phase 37 D-15 precedent). Single-string `applies_to` value.

- **D-19:** **Version-tag discipline (PITFALL 1 compliance) + glossary cross-link patterns.** Every behavioral assertion in the Dedicated guide carries an inline version tag. Specific lockdown:
  - "Android 8.0+ device requirement for Dedicated mode" — version-tagged at Prerequisites + Key Concepts.
  - "MHS exit-PIN failure pattern" — version-tag + MEDIUM-confidence marker per D-12.
  - "Android 15 FRP 3-pathway behavior" — section-level "Applies to Android 15+" tag at D-04 H2 covers all 3 pathways (per F-4A-02 Referee adjudication: pathways are sub-claims of one Android 15 assertion).
  - "Dedicated devices use Lock Task Mode" — version-tagged at relevant Provisioning method / Enrollment profile delta.
  - "Android 12+ IMEI/serial removed from corporate identifiers" (if referenced) — cross-link to Phase 34 `03-android-version-matrix.md#android-12-corporate-identifiers`, not restated inline.
  - SafetyNet must NOT appear (deprecated January 2025, replaced by Play Integrity per AEAUDIT-04).
  - Glossary cross-link first-appearance pattern (Phase 34 D-10): `_glossary-android.md` anchors `#dedicated-device`, `#cosu`, `#managed-home-screen`, `#lock-task-mode`, `#entra-shared-device-mode`, `#play-integrity`, `#dpc`, `#afw-setup` are cross-link targets on first use of each Android term.

- **D-20:** **AEAUDIT-04 audit guards inheritance.** Phase 42 milestone audit MUST verify on this doc:
  - Zero "SafetyNet" occurrences (Play Integrity only).
  - Zero uses of "supervision" as Android management term.
  - `last_verified` frontmatter present.
  - Zero Android links added to v1.0-v1.3 deferred shared files (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`).
  - Source-confidence marker regex per Phase 37 D-11 satisfied wherever MEDIUM/LOW assertions appear.
  - Anchor contract per D-08 satisfied.

### Claude's Discretion

- Exact word counts within section ranges in D-07 (total target 3200-4200 words).
- Whether to include the optional `## For L1 helpdesk agents` H2 (D-06 step 14) — author's call based on whether PITFALL 7 routing context fits cleanly without inviting L1-executable-steps drift.
- Mermaid diagram inclusion (a Dedicated scenario decision flow could help; author's call per Phase 36 D-11 precedent).
- Whether the D-10 Platform note banner ⚠️/info icon convention matches D-02 / D-04 ⚠️ usage or uses an info-icon (e.g., ℹ️) for non-warning content; author's call.
- Whether the D-04 Android 15 FRP H2 opens with the ⚠️ blockquote AT the top of the section or at the top of the doc (author's call — both defensible per Phase 36 D-05 discretion-block precedent; D-04 recommends top-of-section).
- Ordering of the what-breaks callouts per section (severity-descending recommended, matching Phase 35 D-12 / Phase 36 ordering discretion).
- Exact phrasing of per-method constraint callouts in Provisioning method choice section.
- Whether to include a "Portal shorthand reminder" at the top of the doc — Phase 36 D-11 left this as discretion; same applies here.
- Whether to nominate sub-anchors for the 4 scenarios in the D-01 table (e.g., `#scenario-single-app`, `#scenario-multi-app`, `#scenario-digital-signage`, `#scenario-entra-shared-device-mode`) — author/planner discretion; mandatory anchors are listed in D-08.

### Folded Todos

None — `gsd-tools todo match-phase 38` returned zero matches.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap

- `.planning/REQUIREMENTS.md` — AEDED-01 / AEDED-02 / AEDED-03 verbatim at lines 49-51; AEAUDIT-04 (milestone audit rules: no "supervision", no SafetyNet, last_verified frontmatter, no Android links in deferred shared files); traceability table lines 173-175
- `.planning/ROADMAP.md` — Phase 38 entry lines 156-167 (goal, depends on Phase 35 + Phase 36, SC1-5); Phase 36 entry lines 127-138 (FRP/EFRP scope split with Phase 38); Phase 39 entry lines 169-180 (ZTE corporate-scale extension); Phase 40 entry lines 182-193 (Phase 38 anchor consumption for L1 routing); Phase 41 entry lines 195-206 (Phase 38 anchor consumption for L2)
- `.planning/PROJECT.md` — v1.4 scope; Key Decisions (tri-portal admin template, COPE deferral, Knox ME deferral to v1.4.1, 4-platform comparison deferred to v1.5); deferred items
- `.planning/STATE.md` — Phase 38 research flags to verify at plan time (lines 89-90: MHS exit-PIN MEDIUM, default token expiry); v1.4 decisions including "Phases 37 (BYOD) + 38 (Dedicated) are independent of each other"

### v1.4 Android Enterprise Research (all 2026-04-19)

- `.planning/research/FEATURES.md` lines 216-266 — Mode 4 Dedicated full coverage: Android 8.0+ requirement; all 4 scenarios (single-app / multi-app MHS / digital signage userless / Entra shared device mode); Lock Task Mode mechanics; MHS exit-PIN failure pattern (line 258); FRP 3-pathway nuance (line 261 — Settings-reset-no-FRP, recovery-reset-FRP-applies, Intune-wipe-bypass); token rotation for QR codes (line 263); HIGH confidence MS Learn `setup-dedicated` (updated 2025-05-08), `ref-corporate-methods` (updated 2025-12-04); MEDIUM confidence MHS PIN failure pattern (community-sourced)
- `.planning/research/ARCHITECTURE.md` Q6 lines 387-402 — `_glossary-android.md#dedicated-device` cross-platform disambiguation pattern; Platform note banner at top of Dedicated admin guide (mandate for D-10); ZTE iframe integration in Intune (line 19); file dependency graph
- `.planning/research/PITFALLS.md` — PITFALL 1 (version decay), PITFALL 2 (what-breaks per setting inline), PITFALL 3 (no "supervision" — line 71 Dedicated cross-platform disambiguation explicit), PITFALL 7 lines 183-205 (Dedicated audience mismatch — persona callout + scenario overview MANDATORY; LOB Operations Owner is the second persona; do NOT write standard L1 runbook for dedicated; warning sign line 200 "jumps directly to Intune steps without scenario overview"; mitigation lines 194-197), PITFALL 9 (no v1.0-v1.3 shared file mods), PITFALL 11 (KME/ZT Samsung mutual exclusion), Pitfall-review-per-phase table (Dedicated row at line 402), Content-quality checklist (Dedicated row at line 420 "Persona callout + scenario overview before Intune steps")
- `.planning/research/SUMMARY.md` lines 215-226 — Phase 38 dedicated/kiosk admin coverage; HIGH confidence for setup-dedicated (updated 2025-05-08); MHS exit-PIN MEDIUM; default token expiry research flag; FRP 3-pathway research flag
- `.planning/research/STACK.md` line 74 — Intune navigation: Devices > Enrollment > Android > Enrollment Profiles > Corporate-owned dedicated devices; token type choice (Standard OR Entra shared device mode); MHS app config; static Entra device group assignment; line 188 (kiosk/MHS Intune feature mapping); line 346 (Intune app log-collection for Dedicated)

### Phase 34 Foundation (shipped 2026-04-21 — locked decisions feed Phase 38)

- `.planning/phases/34-android-foundation/34-CONTEXT.md` — Phase 34 locked decisions: tri-portal admin template (D-16..D-22), tri-portal shorthand, mode labels (COBO / BYOD WP / **Dedicated** / ZTE / AOSP), AEAUDIT-04 no-"supervision" guard, 60-day review cycle, HTML-comment subtractive-deletion pattern (D-17 — N/A for Dedicated since all three H4s retained), cross-platform callout pattern (D-10), Anti-Pattern 1 matrix guard (D-26), Notes column (D-25 — Dedicated row in matrix), KME/ZT mutual-exclusion (D-27)
- `docs/_glossary-android.md` (Phase 34) — term anchors for cross-reference: `#dedicated-device`, `#cosu`, `#managed-home-screen`, `#lock-task-mode`, `#entra-shared-device-mode`, `#play-integrity`, `#dpc`, `#afw-setup`
- `docs/_templates/admin-template-android.md` (Phase 34) — structural template for `05-dedicated-devices.md`; tri-portal H4 convention with all three portals (Dedicated retains all three)
- `docs/android-lifecycle/00-enrollment-overview.md` (Phase 34) — 5-column mode-comparison table; cross-reference target for `#dedicated-device`
- `docs/android-lifecycle/02-provisioning-methods.md` (Phase 34) — canonical 5×4 provisioning matrix with Mode rows × Method cols; Dedicated row Notes column carries any Dedicated-specific callouts; KME/ZT mutual-exclusion callout adjacent to ZT column header (Phase 34 D-27). Phase 38 references filtered Dedicated row, never duplicates.
- `docs/android-lifecycle/03-android-version-matrix.md` (Phase 34) — version breakpoints with narrative sections; Android 15 FRP breakpoint at lines 67-78. Phase 38 D-04 cross-links via `#android-15-breakpoint`.

### Phase 35 Prerequisites (shipped 2026-04-22 — locked decisions feed Phase 38)

- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-CONTEXT.md` — Phase 35 locked decisions: Phase 38 is a consumer of Phase 35 anchors (MGP doc `#bind-mgp` for Prerequisites; ZT portal doc `#link-zt-to-intune`, `#dpc-extras-json`, `#kme-zt-mutual-exclusion` for D-11); D-22 Phase 35/39 ZT scope split (corporate-scale ZTE is Phase 39 scope, NOT Phase 38); hybrid placement pattern D-13 (precedent referenced for D-02 hybrid placement)
- `docs/admin-setup-android/00-overview.md` (Phase 35) — 5-branch mermaid flowchart; Dedicated-path prerequisites checklist; Portal Navigation Note. Dedicated guide is the target of the mermaid's Dedicated branch.
- `docs/admin-setup-android/01-managed-google-play.md` (Phase 35) — MGP binding mechanics canonical doc; Dedicated guide references `#bind-mgp` and `#disconnect-consequences` in Prerequisites — never restates binding steps.
- `docs/admin-setup-android/02-zero-touch-portal.md` (Phase 35) — ZT portal setup canonical doc; Dedicated guide references `#kme-zt-mutual-exclusion` (Phase 35 D-23 reserved anchor) for D-11; references `#link-zt-to-intune` for ZT-provisioning callout.

### Phase 36 COBO Admin (shipped 2026-04-22 — locked decisions feed Phase 38 directly via "extends COBO")

- `.planning/phases/36-fully-managed-cobo-admin/36-CONTEXT.md` — Phase 36 locked decisions critical for Phase 38:
  - **D-01** hybrid routing pattern (per Phase 36 D-01 winner) — reapplied as Phase 38 D-03 enrollment-profile cross-reference and as Provisioning method choice section.
  - **D-05** Android 15 FRP/EFRP scope split — explicit "Phase 38 (Dedicated / AEDED-03) carries a parallel-but-distinct FRP callout framed for Dedicated re-provisioning scenarios; Phase 36 does NOT pre-empt Phase 38 content" — Phase 38 D-04 enforces the inverse (Phase 38 does NOT pre-empt Phase 36 EFRP-config content).
  - **D-06** KME/ZT Samsung callout precedent — reapplied as Phase 38 D-11.
  - **D-08** Key Concepts H2 placement precedent — reapplied as Phase 38 D-01 persona placement.
  - **D-10** anchor stability contract — Phase 38 cross-references Phase 36 anchors `#enrollment-profile`, `#enrollment-token`, `#provisioning-method-choice`, `#android-15-frp`, `#configure-efrp`.
  - **D-13** frontmatter convention — `applies_to: COBO` single string; reapplied as `applies_to: Dedicated`.
  - **D-14** shared-file modification guard — reapplied as Phase 38 D-17.
  - **D-15 / D-16** plan-time/execute-time research-flag verification protocol — reapplied as Phase 38 D-16.
  - **D-17** MEDIUM-confidence labeling precedent — superseded by Phase 37 D-10/D-11 inline marker pattern (more visible).
- `docs/admin-setup-android/03-fully-managed-cobo.md` (Phase 36, 249 lines) — shipped doc; canonical analog for Phase 38 structure; ships 11 stable HTML-id anchors per Phase 36 D-10. Phase 38 D-03 cross-links `#enrollment-profile`; D-04 cross-links `#configure-efrp`; D-11 cross-links `#provisioning-method-choice` for tri-portal-shorthand precedent.

### Phase 37 BYOD Admin + End-User (shipped 2026-04-22 — locked decisions feed Phase 38)

- `.planning/phases/37-byod-work-profile-admin-end-user/37-CONTEXT.md` — Phase 37 locked decisions critical for Phase 38:
  - **D-05** AMAPI three-part placement (banner+H2+inline) — Phase 38 GA2 evaluated 2D against this precedent; ruled MISAPPLICATION for single-pitfall content (MHS exit-PIN is one concrete pitfall, not multi-claim).
  - **D-10** inline source-confidence marker pattern `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` — reapplied as Phase 38 D-12.
  - **D-11** marker regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` — Phase 38 D-12 audit-grep target.
  - **D-12** admin-doc shape lock — reapplied as Phase 38 D-06 (adapted: 14 sections in locked order).
  - **D-15** frontmatter — reapplied as Phase 38 D-18.
  - **D-16** shared-file modification guard — reapplied as Phase 38 D-17 (extended to include `docs/end-user-guides/` per Phase 37 directory creation).
- `docs/admin-setup-android/04-byod-work-profile.md` (Phase 37, 238 lines) — shipped doc; demonstrates AMAPI three-part placement in execution; demonstrates D-10/D-11 marker pattern in execution; reference for Phase 38 D-12 and D-02.

### v1.3 Validated Precedents (structural templates)

- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — **PRIMARY structural template** for `05-dedicated-devices.md` (via Phase 36 chain). Admin guide with Prerequisites + Key Concepts Before You Begin + Steps + What-Breaks callouts per setting.
- `docs/_templates/admin-template-android.md` (Phase 34) — direct template; tri-portal H4 (Intune + MGP + ZT, all retained for Dedicated).
- `docs/_templates/admin-template-ios.md`, `docs/_templates/admin-template-macos.md` — HTML-comment subtractive-deletion pattern (N/A for Dedicated since all H4s retained); tri-portal-analog dual-portal precedent.

### Cross-Platform Navigation (for awareness only — NOT modified in Phase 38)

- `docs/index.md` — navigation hub (Android stub integration deferred to Phase 42). Phase 38 does NOT add Dedicated entry to index.md.
- `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — cross-platform routing (Android integration deferred post-v1.4 per PROJECT.md). Phase 38 does NOT modify.
- `docs/_glossary-macos.md` — see-also cross-reference back to `_glossary-android.md` is Phase 42 (AEAUDIT-03) scope. Phase 38 does NOT modify.
- `docs/_glossary-android.md` — Phase 34 owns; Phase 38 cross-references anchors per D-19 but does NOT modify the glossary file itself.

### Adversarial Review Artifact

- `.planning/phases/38-dedicated-devices-admin/38-CANDIDATES.md` — 14 candidate options across 4 gray areas + LOCKED context summary; primary input artifact for adversarial review.
- `.planning/phases/38-dedicated-devices-admin/38-DISCUSSION-LOG.md` — full adversarial-review audit trail (finder / adversary / referee verdicts; all 90 flaws scored; 65 confirmed real / 25 false positive; winners selected on lowest-real-flaw basis: 1D / 2C / 3C / 4C all 0 CRIT).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phases 34-37 + v1.0-v1.3)

- **Admin template** (`docs/_templates/admin-template-android.md`, Phase 34) — drives `docs/admin-setup-android/05-dedicated-devices.md`. All three H4 sub-sections retained (Intune admin center / MGP / ZT portal) because Dedicated supports ZTE provisioning per Phase 34 provisioning-method matrix. HTML-comment subtractive-deletion pattern does NOT apply.
- **Android glossary** (`docs/_glossary-android.md`, Phase 34) — term anchors for Dedicated prose cross-references per D-19: `#dedicated-device` (load-bearing for D-10 Platform note banner cross-link), `#cosu`, `#managed-home-screen`, `#lock-task-mode`, `#entra-shared-device-mode`, `#play-integrity`, `#dpc`, `#afw-setup`.
- **Enrollment overview** (`docs/android-lifecycle/00-enrollment-overview.md`, Phase 34) — cross-reference target for Dedicated mode-definition anchor (`#dedicated-device`).
- **Version matrix** (`docs/android-lifecycle/03-android-version-matrix.md`, Phase 34) — Android 15 FRP breakpoint at lines 67-78. Phase 38 D-04 cross-links via `#android-15-breakpoint`; Phase 38 does NOT restate the breakpoint detail.
- **Provisioning-method matrix** (`docs/android-lifecycle/02-provisioning-methods.md`, Phase 34) — canonical source for method support per mode. Dedicated row (method availability per method × Dedicated) is the filtered-row target for Provisioning method choice section. Phase 34 D-25 Notes column may carry Dedicated-specific callouts; D-27 KME/ZT mutual-exclusion adjacent to ZT column header.
- **Phase 35 MGP binding doc** (`docs/admin-setup-android/01-managed-google-play.md`) — Phase 38 Prerequisites block references `#bind-mgp` as the upstream prereq gate.
- **Phase 35 ZT portal doc** (`docs/admin-setup-android/02-zero-touch-portal.md`) — Phase 38 ZT-provisioning inline callout references `#kme-zt-mutual-exclusion` (D-11) and `#link-zt-to-intune`.
- **Phase 36 COBO doc** (`docs/admin-setup-android/03-fully-managed-cobo.md`) — Phase 38 D-03 cross-links `#enrollment-profile` and `#enrollment-token`; D-04 cross-links `#configure-efrp` and `#android-15-frp`. 11 stable HTML-id anchors verified shipped.
- **Phase 37 BYOD doc** (`docs/admin-setup-android/04-byod-work-profile.md`) — Phase 38 D-12 source-confidence marker format inherited from Phase 37 D-10/D-11; AMAPI three-part placement precedent referenced and explicitly NOT reapplied (MHS exit-PIN is single-claim).
- **Frontmatter schema** — `last_verified`, `review_by`, `platform`, `audience`, `applies_to` established across 118+ docs. Phase 38 uses `platform: Android`, `audience: admin`, `applies_to: Dedicated` (single string per Phase 36/37 precedent).
- **"What breaks if misconfigured" callout convention** — from admin-template-macos/ios/android; Phase 38 uses extensively per-setting (PITFALL 2 inheritance).
- **Platform gate blockquote pattern** — "`> **Platform gate:** This guide covers Android Enterprise Dedicated (kiosk/COSU) device enrollment through Microsoft Intune. For corporate-owned Fully Managed (COBO) enrollment, see [03-fully-managed-cobo.md]. For BYOD Work Profile, see [04-byod-work-profile.md]. For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).`"
- **"Key Concepts" H2 subsection pattern** — Phase 36 D-08 precedent; Phase 38 D-01 places `### Audience and stakeholders` H3 here.
- **Cross-platform callout pattern** (Phase 34 D-10) — per-term Android-definition blockquote with cross-platform note. Dedicated guide applies to: Dedicated/COSU (cross-platform note: iOS Shared iPad ≠ Android Dedicated; per ARCH Q6 + D-10 Platform note banner); Managed Home Screen (no iOS analog); Lock Task Mode (no iOS analog; Android-native); Entra shared device mode (Microsoft-native, applies cross-platform but Android implementation is mode-specific).
- **HTML-id anchor scaffolding** (Phase 36 11 anchors / Phase 37 5+ mandatory anchors) — Phase 38 D-08 publishes 11 mandatory anchors via `<a id="...">`.

### Established Patterns

- **60-day review cycle** — inherited from Phase 34/35/36/37.
- **Source-hierarchy confidence attribution** — HIGH: Microsoft Learn `setup-dedicated`, `ref-corporate-methods`; MEDIUM: Jason Bayton (bayton.org) for MHS PIN failure pattern + FRP 3-pathway behavior; LOW: community. Phase 38 D-12 MEDIUM-confidence assertions carry explicit `[MEDIUM: source, last_verified YYYY-MM-DD]` labels.
- **Anti-Pattern 1 guard** — matrices live in canonical reference docs (Phase 34); enrollment-profile mechanics live in Phase 36 canonical (`#enrollment-profile`). Phase 38 rigorously references Phase 34 matrices via filtered-row link patterns AND Phase 36 enrollment-profile via D-03 hybrid orientation; NEVER duplicates either.
- **PITFALL 1 version-tag discipline** — every behavioral assertion carries an inline version tag (D-19); Android 15 FRP section uses section-level tag covering 3 pathways per F-4A-02 Referee adjudication.
- **PITFALL 2 what-breaks pattern** — per-setting callouts inline at point of admin decision; no footnote, no bottom "gotchas" section. D-02 H2 + inline reminders pattern + D-03 enrollment-profile-deltas all carry per-setting what-breaks.
- **PITFALL 7 audience-mismatch mitigation** — D-01 persona callout + scenarios overview + D-06 doc-shape lock collectively satisfy PITFALL 7 mitigation (lines 194-197).
- **PITFALL 11 KME/ZT Samsung callout** — Phase 35 D-23 anchor `#kme-zt-mutual-exclusion` is the cross-link target; Phase 38 D-11 carries one-line reminder inside the Zero-Touch provisioning callout.
- **Phase 35 D-13 / Phase 36 D-05 hybrid-placement pattern** (subsection + inline) — precedent reused for Phase 38 D-02 (H2 + inline reminders at both settings).
- **Phase 36 D-01 hybrid pattern** (route to canonical + inline phase-specific) — direct reapplication in Phase 38 D-03 enrollment-profile cross-reference.

### Integration Points

- `docs/admin-setup-android/` — directory created in Phase 35. Phase 38 adds `05-dedicated-devices.md`. File numbering: 00 (Phase 35), 01 (Phase 35), 02 (Phase 35), 03 (Phase 36), 04 (Phase 37), **05 (Phase 38)**, 06 (Phase 39 AOSP stub).
- **Anchor stability contract with Phase 40 / 41**: the 11 mandatory anchors in D-08 are consumed by Phase 40 (mode-first triage tree may anchor scenario routing on `#scenarios`; L1 routing for kiosk failures via `#exit-kiosk-pin-synchronization`; runbook 24 "Device not enrolled" may reference `#enrollment-token` for Dedicated-specific token-check failures) and Phase 41 (L2 investigation runbooks reference `#exit-kiosk-pin-synchronization`, `#android-15-frp-reprovisioning`, `#enrollment-profile`). Renaming breaks downstream cross-refs.
- **Phase 40 PITFALL 7 routing constraint**: Phase 38 D-06 step 14 (optional `## For L1 helpdesk agents` H2) MUST NOT contain L1-executable steps; per PITFALL 7 line 197, Dedicated-device failures route to L2 or LOB ops owner. Phase 40 triage tree mode-first decision tree builds the routing on top of Phase 38 anchors.
- **Phase 41 L2 dependency**: ROADMAP Phase 41 line 197 lists `18-android-log-collection.md` as covering Dedicated. Phase 38 publishes the failure-pattern anchors (D-08) for Phase 41 to reference; Phase 38 does NOT carry log-collection content.
- **Phase 42 milestone audit dependencies** (AEAUDIT-04): Phase 38 must (a) carry `last_verified` frontmatter; (b) have zero "SafetyNet" occurrences; (c) have zero uses of "supervision" as Android management term; (d) have zero modifications to v1.0-v1.3 shared files (D-17); (e) carry version tags on all behavioral assertions (PITFALL 1 / D-19); (f) carry source-confidence markers per Phase 37 D-11 regex on MEDIUM-confidence assertions (D-12); (g) carry the ARCH Q6 Platform note banner (D-10).
- **Phase 35 admin-setup-android directory structure verification**: before Phase 38 PLAN authoring, confirm `docs/admin-setup-android/00-overview.md`, `01-managed-google-play.md`, `02-zero-touch-portal.md` (Phase 35) and `03-fully-managed-cobo.md` (Phase 36) and `04-byod-work-profile.md` (Phase 37) are all merged. STATE.md confirms all are complete as of 2026-04-22.

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence

- **1D winning pattern (D-01)**: persona+scenarios placement reuses Phase 36 D-08 Key Concepts H2 precedent — the conceptual content (who's reading + which scenario applies) belongs in Key Concepts. The `### How to choose` routing paragraph is the SC5 disambiguation mechanism per D-13; explicit table-cell + sentence-level disambiguation is dual-redundant on purpose (table for skimmers, prose for linear readers).

- **2C winning pattern (D-02)**: Phase 36 D-05 hybrid-placement pattern (H2 + inline reminders) directly reapplied. The H2 is the canonical home for the SC2 lock phrase, source-confidence marker, and remediation guidance. Inline reminders MAY duplicate the marker but ARE NOT REQUIRED to (per Adversary correct ruling on F-2A-04 / F-2B-02).

- **3C winning pattern (D-03)**: Phase 36 D-01 hybrid pattern (route to canonical + inline phase-specific) directly reapplied. The 80-word orientation paragraph is intentionally short — it sets context for the Dedicated-specific deltas without restating Phase 36 mechanics. The deltas section is where Phase 38's value-add lives.

- **4C winning pattern (D-04)**: parallel-but-distinct framing per Phase 36 D-05 design intent. The 3-pathway behavior matrix is genuinely different from COBO content (Phase 36 owns EFRP CONFIG; Phase 38 owns RE-PROVISIONING BEHAVIOR). The cross-link to Phase 36 `#configure-efrp` consolidates EFRP step-level config in Phase 36; Phase 38 says "configure it via Phase 36 policy" without restating the steps.

### Cross-Platform Callout Pattern (inherited from Phase 34 D-10)

Applied to Phase 38 Dedicated guide where Android terms are used:

- **Dedicated (kiosk/COSU)** — cross-platform disambiguation REQUIRED per ARCH Q6 + Phase 38 D-10 Platform note banner: "Dedicated device" in Android Enterprise (COSU) is structurally distinct from iOS Shared iPad and Windows Shared PC. The glossary `_glossary-android.md#dedicated-device` carries the disambiguation; Phase 38 D-10 reapplies the banner pattern at top of doc.
- **Managed Home Screen (MHS)** — no cross-platform analog (Microsoft-native to Android Enterprise); Phase 38 introduces the term with package ID + scope (multi-app + digital signage scenarios per D-14).
- **Lock Task Mode** — Android-native; brief cross-platform note: "Android equivalent of iOS Single App Mode (Apple Configurator) but with broader admin policy surface."
- **Entra shared device mode** — Microsoft-native (cross-platform Entra concept); Phase 38 introduces with scenario-specific scoping (genuinely-shared device with per-user identity); cross-link to `_glossary-android.md#entra-shared-device-mode`.
- **DPC / afw#setup** — no iOS/macOS analog; Android-native (already referenced from Phase 36 doc).
- **Managed Google Play (MGP)** — brief cross-platform note comparing to Apple VPP (and pointing to Phase 35 MGP binding doc for mechanics).

### What-Breaks Callout Density (PITFALL 2 inheritance)

Every configurable setting in the Dedicated guide carries a "What breaks if misconfigured" callout. Specific lockdown:

- **Token type selection** (D-03 deltas) — "What breaks: Standard token chosen for a multi-shift sign-in scenario → no per-user identity capability; users cannot sign in/out as themselves."
- **MHS app assignment** (D-03 deltas) — "What breaks: MHS app not assigned as Required → device boots to standard Android launcher; no kiosk lockdown applied."
- **Static device group** (D-03 deltas) — "What breaks: dynamic group used → token-check enrollment failures during burst provisioning when group membership lags."
- **Token expiry + QR rotation** (D-03 deltas + D-09) — "What breaks: token expiry rotation breaks any printed/laminated/posted QR enrollment artifacts; new QR must be redistributed."
- **Exit-kiosk PIN sync** (D-02 H2 + inline) — "What breaks: PIN configured in only one of the two locations → users see 'a PIN to exit kiosk mode has not been set by your IT admin' error at exit attempt." (MEDIUM-confidence verbatim error string per D-12.)
- **EFRP policy assignment** (D-04 cross-link to Phase 36) — Phase 36 owns the EFRP config what-breaks; Phase 38 cross-links via "configure EFRP via Intune policy — see [Phase 36 EFRP configuration](03-fully-managed-cobo.md#configure-efrp)."
- **Recovery reset on Dedicated devices without EFRP pre-config** (D-04 pathway 2) — "What breaks: field-replacement workflow that uses recovery reset on devices without EFRP pre-configured → device locked out post-reset; Google account credential intervention required."
- **Settings-reset reliance on offline devices** (D-04 pathway 1) — "What breaks: Settings reset is FRP-safe on Dedicated, but token expiry may have lapsed during offline period; check token validity before sending Settings-reset instructions."

### Known PITFALLS.md patterns to apply

- **PITFALL 1 version decay** (D-19): every behavioral assertion version-tagged; use Play Integrity (never SafetyNet); Android 15 FRP section-level tag for D-04 H2; Android 8.0+ Dedicated requirement at Prerequisites + Key Concepts.
- **PITFALL 2 what-breaks per setting** (above): inherited from admin template; applied per every configurable setting.
- **PITFALL 7 audience mismatch** (D-01 + D-06 + D-15): persona callout + scenario overview MANDATORY before Intune steps; no Dedicated L1 runbook per Phase 40 routing; optional `## For L1 helpdesk agents` H2 explicitly excludes L1-executable steps.
- **PITFALL 11 KME/ZT Samsung** (D-11): one-line reminder inside the Zero-Touch provisioning callout with cross-link to Phase 35 D-23 anchor.
- **PITFALL 3 terminology** (D-19): "Dedicated (kiosk/COSU)" — never "supervision"; AEAUDIT-04 grep verifies. Dedicated-vs-iOS-Shared-iPad disambiguation per ARCH Q6 + D-10 Platform note banner + glossary cross-link.
- **PITFALL 9 / 11 shared-file guard** (D-17): no v1.0-v1.3 shared file modifications; AEAUDIT-04 grep verifies.

### Adversarial Review Confidence

- Adversarial review surfaced 90 flaws across 14 candidates + 17 cross-cutting. Adversary disproved 25 with evidence (1 CRIT downgraded to MED, 18 MED, 6 LOW). Referee confirmed 65 real flaws + adjudicated all 25 disproved-by-Adversary calls (24 confirmed FALSE POSITIVE; 3 borderline calls confirmed REAL but downgraded to LOW: F-1A-01 CRIT→MED, F-2A-04 MED→LOW, F-4A-02 MED→LOW). All 4 winners are 0 CRIT. Cross-cutting decisions D-05..D-17 close all 13 confirmed F-XCUT gaps.
- The 4 candidate sets had a clear "Anti-Pattern 1 violator" (3B/3D in GA3, 4B in GA4) and a clear "no anchor stability" violator (2A/2B in GA2, 4D in GA4) that ruled them out on CRIT count. The remaining choice in each gray area was between "minimal" and "structural" candidates; structural won (1D over 1A, 2C over 2A, 3C over 3A, 4C over 4A) on Phase 40/41 anchor-consumption support and SC verbatim compliance — at the cost of slightly higher MED counts that reflect intentional design tradeoffs.

</specifics>

<deferred>
## Deferred Ideas

Ideas that surfaced during adversarial review but belong in other phases, other milestones, or separate tracking:

- **Knox Mobile Enrollment (KME) full admin path** — deferred to v1.4.1 per PROJECT.md. Phase 38 D-11 carries the one-line KME/ZT mutual-exclusion reminder; full KME coverage is v1.4.1.
- **Corporate-scale ZTE content** (reseller-upload handoff, device claim workflow at scale, dual-SIM IMEI 1 registration) — Phase 39 extends Phase 35 ZT portal doc per Phase 36 D-06 chain. Phase 38 Dedicated guide does NOT carry these.
- **Dedicated L1 triage runbook** — explicitly OUT OF SCOPE per PITFALL 7 line 197. Phase 40 triage tree handles routing (mode-first decision tree with kiosk-failure routing to L2 or LOB ops owner).
- **Dedicated L2 investigation content** — Phase 41 owns log-collection (`18-android-log-collection.md`); Dedicated-specific scenarios may appear within general Android log-collection coverage. Phase 38 publishes anchors (D-08) for Phase 41 to consume.
- **OEMConfig integration for Dedicated** — research FEATURES.md mentions OEM-specific behaviors but does not formally cover OEMConfig deployment. Candidate for v1.4.1 or v1.5 operational-content phase.
- **MHS app configuration policy template** — research suggests admins frequently copy-paste MHS config JSON; not in Phase 38 scope (admin guide describes WHAT to configure, not WHICH JSON to paste). Candidate for separate "admin templates" deliverable in v1.4.1 or post-v1.4.
- **Multi-app kiosk app ordering / icon layout customization** — UI-level customization of MHS layout (icon arrangement, branding) is FEATURES.md-mentioned but not Phase 38 admin-guide scope. Cross-link from D-01 scenarios table to glossary `#managed-home-screen` covers terminology only.
- **Lock Task Mode app development guidance** — for in-house apps that need Lock Task Mode compatibility; this is developer-tier content, not admin-tier. Out of scope for v1.4 admin-setup-android.
- **Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference** — Phase 42 (AEAUDIT-03) scope. Phase 38 does NOT modify `_glossary-macos.md`.
- **Cross-platform nav integration** (Android stub in `docs/index.md`, `common-issues.md`, quick-refs) — post-v1.4 unification task per PROJECT.md. Phase 38 does NOT modify v1.0-v1.3 shared files (D-17).
- **Dedicated FRP behavior matrix per OEM** (e.g., specific Samsung Knox interaction with EFRP) — research suggests OEM-specific FRP nuance exists but is sparse in current sources. Phase 38 D-04 covers the Android-15 baseline 3-pathway behavior; per-OEM nuance is candidate for v1.4.1 or operational-content phase.
- **Verbatim Intune error string catalog for Dedicated failures** — Phase 38 D-02 cites one verbatim error string for MHS exit-PIN mismatch; Dedicated has multiple other failure-mode error strings (e.g., MGP-not-bound errors during enrollment). Candidate for separate error-catalog deliverable in v1.4.1.
- **Intune admin center navigation screenshots or visual artifacts** — out of scope per PROJECT.md "screenshots/visual evidence for admin portals" exclusion (v1.0-v1.3 text-first policy).
- **4-platform comparison document** — v1.5 per PROJECT.md. Phase 38 does not pre-empt.
- **Default token expiry research findings** — captured as research flag (D-16) for plan-time verification; if findings indicate behavioral change risk, candidate for v1.4.1 follow-up note in renewal/maintenance content.

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 38` returned zero matches.

</deferred>

---

*Phase: 38-dedicated-devices-admin*
*Context gathered: 2026-04-22*
*Method: adversarial-review skill (finder → adversary → referee) — 90 flaws evaluated; 65 confirmed real; 25 false positives (1 CRIT downgrade, 18 MED, 6 LOW); 17 cross-cutting concerns evaluated, 13 confirmed real and closed via D-05..D-17. 4 gray areas resolved on lowest-real-flaw basis (1D / 2C / 3C / 4C — all 0 CRIT).*
