# Phase 36: Fully Managed COBO Admin - Context

**Gathered:** 2026-04-21
**Status:** Ready for planning
**Method:** Adversarial review (finder/adversary/referee scored pattern) across 12 candidate options in 4 gray areas. 67 flaws scored; 42 confirmed real; 25 disproved (1 CRIT, 4 MED, 20 LOW). Winners selected on lowest-real-flaw basis.

<domain>
## Phase Boundary

Phase 36 delivers one admin guide — the first mode-specific corporate-ownership admin guide in the v1.4 Android Enterprise milestone — building on Phase 34 foundation and Phase 35 prerequisites:

1. `docs/admin-setup-android/03-fully-managed-cobo.md` — Fully Managed (COBO) corporate-owned device admin setup: Entra join + CA exclusion, COPE migration note ("Google recommends WPCO"), enrollment profile + token management, all four provisioning methods (QR / NFC / afw#setup / Zero-Touch) with COBO-specific constraint callouts, Android 15 FRP + Enterprise FRP (EFRP) configuration. (AECOBO-01, AECOBO-02, AECOBO-03)

Phase 36 does NOT own:

- **MGP binding mechanics** — Phase 35 `01-managed-google-play.md` owns. COBO doc references, never duplicates (Anti-Pattern 1 guard, PITFALL 2).
- **ZT portal mechanics** (account creation, DPC extras JSON, ZT↔Intune linking) — Phase 35 `02-zero-touch-portal.md` owns. COBO doc references at enrollment-flow level only.
- **Corporate-scale ZTE content** (reseller-upload handoff, device claim workflow, profile assignment, dual-SIM IMEI 1 registration) — Phase 39 owns as extension to the Phase 35 ZT portal doc (per Phase 35 D-22). COBO doc does NOT carry dual-SIM IMEI 1.
- **Provisioning-method matrix** — Phase 34 `02-provisioning-methods.md` owns. COBO doc carries constraint callouts only.
- **Version matrix + Android 15 FRP breakpoint narrative** — Phase 34 `03-android-version-matrix.md` owns (lines 67-78 verified to contain FRP content + EFRP admin action). COBO doc cross-references the breakpoint.
- **Dedicated-specific FRP behavior during re-provisioning** — Phase 38 (AEDED-03) owns. Phase 36 carries EFRP configuration steps (AECOBO-03); Phase 38 carries parallel-but-distinct Dedicated re-provisioning FRP callout. Neither duplicates the other.
- **COBO L1 triage runbook 24** — Phase 40 (AEL1-04) owns per STATE.md v1.4 decisions. Phase 36 does NOT carry L1 runbook content.
- **COBO L2 investigation content** — Phase 41 (AEL2-02/AEL2-03) owns.

Carrying forward from Phases 34 and 35 (locked — do not re-open):

- **Tri-portal admin template** (Phase 34 D-16..D-22) — H4 sub-sections "In Intune admin center" / "In Managed Google Play" / "In Zero-Touch portal". COBO keeps ZT portal section because COBO can be provisioned via Zero-Touch. HTML-comment subtractive-deletion pattern applies if any sub-section is omitted.
- **Tri-portal shorthand** (Phase 34) — "Intune admin center" / "Managed Google Play (MGP)" / "Zero-Touch portal (ZT portal)". Full names on first appearance per doc, shorthand thereafter.
- **Mode labels** (Phase 34) — COBO (Fully Managed). Never use "supervision" as an Android management term (AEAUDIT-04, PITFALL 3).
- **Anti-Pattern 1 guard** (Phase 34 D-26) — matrices live in single canonical reference docs. COBO doc references Phase 34 provisioning-method matrix and version matrix via filtered-row link patterns; never duplicates.
- **PITFALL 1 discipline** — every behavioral assertion carries an inline version tag ("Applies to Android 10.0+", "Changed in Android 11", etc.). Milestone audit (AEAUDIT-04) greps for version-tagless assertions.
- **PITFALL 2 pattern** — "What breaks if misconfigured" callouts per every configurable setting (inherited from admin-template-macos/ios / admin-template-android precedent).
- **PITFALL 9 / PITFALL 11 guard** — no modifications to v1.0-v1.3 shared files (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`, `_glossary.md`, `_glossary-macos.md`, `docs/admin-setup-ios/*`).
- **60-day review cycle** — frontmatter `last_verified` + `review_by` with 60-day window (fast-moving platform).
- **Phase 36 / Phase 38 / Phase 40 / Phase 41 anchor-stability contract** — downstream phases consume Phase 36 stable anchors listed in D-06 below. Renaming breaks downstream cross-references.
- **Phase 34 `_glossary-android.md`** anchors are the cross-reference target for COBO terminology (`#fully-managed`, `#dpc`, `#managed-google-play`, `#zero-touch-enrollment`, `#play-integrity`, `#amapi`). Phase 34 D-10 cross-platform callout pattern applies per Android term on first appearance.

Research flags to verify at plan/execute time (from STATE.md):

- **COPE wording** — use "Google recommends WPCO" (NOT "COPE deprecated"); Google has not formally deprecated COPE as of v1.4 plan time. Verify current Google Android Enterprise Help and Microsoft Learn wording at plan time.
- **Enrollment token expiry** — COBO/Fully Managed tokens are configurable up to **65 years** (standard tokens; extended December 2022). The legacy "90-day max" language is WRONG for COBO and belongs only to AOSP tokens per PITFALLS.md line 31. Verify current Microsoft Learn statement.
- **Android 15 FRP + EFRP** — Intune admin center EFRP policy path and setting name verified against current Microsoft Learn at plan time. Phase 34 version matrix carries the behavioral breakpoint; Phase 36 carries the "how to configure" steps (AECOBO-03 SC3).
- **Chrome-tab CA exclusion** — Microsoft Intune cloud app exclusion navigation in Entra ID Conditional Access may shift; verify at plan time.

</domain>

<decisions>
## Implementation Decisions

### Provisioning-method treatment (AECOBO-01 / SC1)

- **D-01:** **Hybrid routing + inline constraint callouts.** The COBO guide's `## Provisioning method choice` section (a) routes to `docs/android-lifecycle/02-provisioning-methods.md` via a filtered-row link pattern (no grid duplication — Anti-Pattern 1 guard); (b) carries inline COBO-specific constraint callouts per method:
  - **QR code** — internet-before-scan requirement on Android 7-8; QR artifact sensitivity (never embed tenant-specific QR images in docs per PITFALL 5).
  - **NFC** — COPE support removed Android 11+ (still supported for COBO on Android 10+); NFC Forum Type 2 Tag, 888+ bytes payload limit (PITFALLS.md line 132).
  - **afw#setup (DPC identifier)** — Google-sign-in-screen tripwire; system apps disabled by default (PITFALL 5 caveat); still supported for COBO on Android 11+.
  - **Zero-Touch** — COBO-via-ZT requires Phase 35 ZT portal binding; links to `docs/admin-setup-android/02-zero-touch-portal.md#link-zt-to-intune`. See D-05 for Samsung KME/ZT mutual-exclusion requirement.

  Total section length 400-650 words. Forbids mechanics restatement. *Winner of Area 1 adversarial review (1C: 0 CRIT / 2 MED / 1 LOW) over 1A per-method walkthrough (2 CRIT / 1 MED / 2 LOW — F-001 Anti-Pattern 1 duplication, F-002 PITFALL 5 dual-source drift) and 1B routing-table-only (2 CRIT / 2 MED / 1 LOW — F-009 SC1 "inline callouts" buried in table cells, F-010 routing table functionally duplicates Phase 34 matrix).*

- **D-02:** **Filtered-row link pattern for method availability.** Every per-method callout in D-01 ends with a line of the form: "For version-availability and cross-mode support, see `02-provisioning-methods.md#[method-anchor]`." This is the Phase 34 D-26 reference pattern that prevents Anti-Pattern 1 drift. The COBO guide NEVER states a method's Android min-version directly; the version-matrix and provisioning-method matrix are authoritative.

### COPE migration-note placement (AECOBO-02 / SC2)

- **D-03:** **Dedicated top-of-page section with tight bounds.** A `## COPE Migration Note` section placed after the COBO overview and before the enrollment-profile section (NOT as a page-top banner; not as a bottom appendix). Section content:
  - Google's current wording verbatim: "Google recommends WPCO (Work Profile on Corporate-Owned)." This phrasing is the SC2 lock.
  - Explicit negative guard: the phrase "COPE deprecated" is FORBIDDEN in this section and throughout the doc.
  - Brief migration context: COPE still functional on Android 10+; NFC and afw#setup removed for COPE on Android 11+ (cross-link to `02-provisioning-methods.md`); WPCO is the forward-looking Google terminology.
  - Full COPE admin path deferred to v1.4.1 (per PROJECT.md Key Decisions); one-line "See also" stub referencing PROJECT.md deferred-items list.

  Length bound **150-250 words**. Stable anchor `#cope-migration`. *Winner of Area 2 adversarial review (2A: 1 CRIT / 1 MED — F-021 doc-reframing risk and F-023 doc-head real-estate, both mitigated by placement after COBO overview and tight length bound) over 2B inline-callout-only (1 CRIT / 2 MED / 1 LOW — F-026 skippable on non-linear skim per Phase 35 D-13 F-039 precedent) and 2C bottom-appendix + banner (1 CRIT / 2 MED — F-031 "separate gotchas pattern" per Phase 35 D-21 F-071 precedent; F-032 inverts pre-reset-decision requirement).*

- **D-04:** **COPE wording audit guard.** Milestone audit (AEAUDIT-04) pattern: grep the COBO doc for "COPE deprecated" / "deprecated COPE" — must return zero hits. Grep for "recommends WPCO" — must return exactly one hit in the COPE Migration Note section.

### Android 15 FRP + EFRP scope (AECOBO-03 / SC3)

- **D-05:** **COBO-owned EFRP configuration callout section + Phase 34 version-matrix cross-reference.** A `## Android 15 FRP and EFRP` callout section placed after enrollment-profile content (post-enrollment hardening context, semantically correct). Section content:
  - **What changed on Android 15:** FRP hardening enforces EFRP on reset pathways that were unrestricted on Android 13/14 (version-tagged per PITFALL 1).
  - **Admin action required:** configure Enterprise Factory Reset Protection (EFRP) via Intune policy BEFORE any device reset (SC3 "before any device reset" lock).
  - **Step-level EFRP configuration:** explicit Intune admin center navigation to the EFRP policy setting, required values, assignment target (all COBO devices or targeted group). Satisfies AECOBO-03 "configure EFRP via Intune policy" verbatim.
  - **Cross-link to Phase 34 `03-android-version-matrix.md#android-15-breakpoint`** for the authoritative behavioral breakpoint record — no duplication of the version-gate narrative.
  - **"Before you reset" warning placement** — a one-line blockquote at the top of the section: "⚠️ Configure EFRP before any factory reset on Android 15 devices; FRP hardening can block re-enrollment."

  Length 300-450 words. Stable anchors `#android-15-frp` and `#configure-efrp`. Phase 38 (Dedicated / AEDED-03) carries a **parallel-but-distinct** FRP callout framed for Dedicated re-provisioning scenarios; Phase 36 does NOT pre-empt Phase 38 content. *Winner of Area 3 adversarial review (3C: 0 CRIT / 2 MED / 2 LOW) over 3A full-EFRP-section-owned-in-COBO (2 CRIT / 2 MED — F-036 Phase 38 ref-or-duplicate ambiguity, F-037 cross-mode content architecturally misplaced) and 3B short-callout-only-with-Phase-38-ref (2 CRIT / 2 MED — F-041 AECOBO-03 SC3 "configure EFRP" violation, F-042 dangling forward-reference since Phase 38 is a sibling not yet published).*

- **D-06 (KME/ZT Samsung callout in COBO doc):** The Zero-Touch inline callout (per D-01) MUST carry a one-line KME/ZT mutual-exclusion note per PITFALL 11: "Samsung Knox fleets: choose Knox Mobile Enrollment (KME) or Zero-Touch, never both. Full KME coverage deferred to v1.4.1." Cross-link to `docs/admin-setup-android/02-zero-touch-portal.md#kme-zt-mutual-exclusion` (Phase 35 D-23 reserved anchor). The full device-claim-step KME callout lives in Phase 39 extension (per Phase 35 D-22).

### Entra join + CA-exclusion treatment (AECOBO-01 / SC4)

- **D-07:** **Hard-prereq block (tenant-conditional framing) + inline reminder at Chrome-tab step.** Top-of-doc prereq block carries two distinct entries:
  - **Entra join enabled** (hard prereq — MGP-level; without this COBO enrollment fails at token-generation).
  - **Conditional Access exclusion for Microsoft Intune cloud app — IF your tenant uses Conditional Access** (tenant-conditional — explicit framing acknowledges some tenants have no CA policies; prevents mis-scoping as universal hard prereq). Brief explanation: "Chrome tab is used during COBO setup for Entra authentication; a CA policy blocking or requiring additional claims on the Microsoft Intune cloud app will fail the Chrome-tab sign-in step."

  Inline reminder at the Chrome-tab setup step: "If your tenant has a Conditional Access policy affecting the Microsoft Intune cloud app, ensure the cloud app is excluded before proceeding. See Prerequisites above."

  Stable anchors `#entra-join-prerequisite` and `#ca-exclusion-intune-app`.

  *Winner of Area 4 adversarial review (4A: 0 CRIT / 2 MED — F-051 and F-052 on MGP-vs-CA conflation, both mitigated by explicit tenant-conditional framing) over 4B inline-only (2 CRIT / 1 MED — F-056 sequence violation "must be BEFORE Chrome-tab step, not at it"; F-057 PITFALL 2 hybrid-placement pattern required per Phase 35 D-13 F-039 precedent) and 4C dedicated-subsection-with-cross-refs (2 CRIT / 2 MED — F-061 reverses no-Android-in-shared-files guard per Phase 35 CONTEXT lines 159-163; F-062 `docs/security-compliance/enrollment-ca-timing.md` does NOT exist — verified dangling ref).*

- **D-08:** **Entra-join conceptual content placement.** The "work profile IS the entire device; no personal partition" conceptual statement (SC4) lives in an early `### Key Concepts` subsection of the COBO guide (precedent: iOS `03-ade-enrollment-profile.md` lines 24-47 Key Concepts subsection pattern) with a cross-link to `_glossary-android.md#fully-managed` for the authoritative definition. Not in the prereq block (which is action-oriented, not conceptual).

- **D-09:** **No cross-references to v1.0-v1.3 shared or iOS compliance files.** Specifically, no cross-refs to `docs/admin-setup-ios/06-compliance-policy.md` (v1.3 shared artifact per PITFALL 9 / PITFALL 11) or to any hypothetical `docs/security-compliance/enrollment-ca-timing.md` (verified non-existent). If admins need deeper CA guidance, they use their Intune/Entra ID admin knowledge — the COBO guide describes WHAT to exclude and WHY, not WHERE in Entra ID to configure it. Cross-platform nav integration is post-v1.4 per PROJECT.md.

### Document structure (overall COBO doc shape)

- **D-10:** **Stable anchors reserved for Phase 38 / 39 / 40 / 41 consumers.** Phase 36 MUST publish these anchors; renaming breaks downstream cross-references.
  - `#key-concepts` (Entra join = entire device, glossary cross-link)
  - `#prerequisites` (hard prereqs incl. MGP binding reference + Entra join + tenant-conditional CA exclusion)
  - `#cope-migration` (Google recommends WPCO section)
  - `#enrollment-profile` (Intune admin center profile creation)
  - `#enrollment-token` (token management: creation, 65-year expiry cap, rotation, revocation)
  - `#provisioning-method-choice` (routing + inline callouts per D-01)
  - `#entra-join-prerequisite` (hard prereq sub-anchor)
  - `#ca-exclusion-intune-app` (tenant-conditional prereq sub-anchor)
  - `#android-15-frp` (version-behavior callout per D-05)
  - `#configure-efrp` (EFRP Intune policy config steps per D-05)
  - `#what-breaks` (inline what-breaks callouts per setting, following Phase 35 D-12 hybrid pattern)
  - `#renewal-maintenance` (token rotation cadence, MGP binding review, EFRP policy drift check)

- **D-11:** **Length targets.** COBO guide target **2800-3800 words** (matches admin-guide length precedent from Phase 35 discretion block; larger than Phase 35 `01-managed-google-play.md` because COBO covers more ground — 4 methods, COPE migration, FRP/EFRP, Entra join + CA). Per-section allocations (approximate):
  - Overview / platform gate / how to use this guide: 200-300
  - Key Concepts (Entra join = entire device): 150-250
  - Prerequisites block (D-07): 200-300
  - COPE Migration Note (D-03): 150-250
  - Enrollment profile creation: 300-500
  - Enrollment token management: 200-350
  - Provisioning method choice (D-01): 400-650
  - Android 15 FRP + EFRP (D-05): 300-450
  - What-breaks (inline per-section): 300-500
  - Renewal / Maintenance: 150-250

- **D-12:** **Version-tag discipline (PITFALL 1 compliance).** Every behavioral assertion in the COBO guide carries an inline version tag. Specific lockdown:
  - "NFC lost COPE support on Android 11+" — version-tagged every mention.
  - "QR needs internet before scanning on Android 7-8" — version-tagged.
  - "afw#setup still works for COBO on Android 11+" — version-tagged.
  - "FRP hardening on Android 15 blocks re-enrollment that worked on Android 13/14" — version-tagged (SC3 lock).
  - "Android 12+ IMEI/serial removed from corporate identifiers" (if referenced) — cross-link to Phase 34 `03-android-version-matrix.md#android-12-corporate-identifiers`, not restated inline.
  - "Enrollment token expiry up to 65 years" — reference Microsoft Learn; label legacy "90-day" as outdated/mode-scoped-to-AOSP only.
  - SafetyNet must NOT appear (deprecated January 2025, replaced by Play Integrity per AEAUDIT-04).

- **D-13:** **Frontmatter.** `platform: Android`, `audience: admin`, `applies_to: COBO`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle per Phase 34 D-14 / Phase 35 D-18 precedent).

- **D-14:** **Shared-file modification guard.** Phase 36 MUST NOT modify: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, any file under `docs/admin-setup-ios/`, any file under `docs/admin-setup-macos/`, any file under `docs/l1-runbooks/`, any file under `docs/l2-runbooks/`. PITFALL 9 / PITFALL 11 enforcement.

### Research-flag verification protocol (locked for Phase 36)

- **D-15:** Plan-phase researcher MUST run plan-time verification for the four research flags before authoring tasks:
  1. Google Android Enterprise Help current wording on WPCO vs COPE (verify "Google recommends WPCO" phrasing; confirm COPE is NOT formally deprecated).
  2. Microsoft Learn current Intune admin center EFRP policy path and setting names (Android 15 FRP Intune policy UI).
  3. Microsoft Learn current Intune enrollment-token expiry language for COBO/Fully Managed (confirm 65-year cap, disconfirm "90-day max" for COBO).
  4. Entra ID Conditional Access current "exclude cloud app" UI path for the Microsoft Intune cloud app.

  Findings recorded in the phase RESEARCH.md.

- **D-16:** Executor re-verifies at execute time for any assertion that is portal-UI-specific (Intune admin center EFRP policy location, Entra ID CA exclusion navigation). Any unverifiable MEDIUM-confidence assertion is labeled inline with `MEDIUM confidence` + `last_verified: YYYY-MM-DD`.

- **D-17:** If a plan-time assertion cannot be verified against current Microsoft Learn or Google AE Help, it is either (a) omitted and noted in RESEARCH.md as pending or (b) documented with explicit MEDIUM-confidence labeling citing community consensus (Jason Bayton `bayton.org` for Android Enterprise; the Phase 35 CONTEXT source hierarchy applies). Never stated as authoritative without verification.

### Claude's Discretion

- Exact word counts within the section ranges in D-11 (total target 2800-3800 words).
- Mermaid diagram inclusion (a COBO setup flow diagram could help; author's call — iOS Phase 27 `03-ade-enrollment-profile.md` does not use one; Phase 35 `00-overview.md` does).
- Whether the COPE Migration Note section (D-03) opens with a one-line "If you have existing COPE deployments, read this before creating a new COBO profile" framing sentence or jumps straight to Google's current wording.
- Whether the Android 15 FRP warning blockquote (D-05 "⚠️ Configure EFRP before any factory reset") appears at the top of the FRP section or at the top of the doc (author's call — both are defensible; top-of-section is the D-05 recommendation but top-of-doc is acceptable if the warning is semantically load-bearing enough to warrant doc-level attention).
- Ordering of the what-breaks callouts per section (severity-descending recommended, matching Phase 35 D-12 ordering discretion).
- Exact phrasing of per-method constraint callouts in D-01 (short, one-to-three-sentence bites).
- Whether to include a COBO-specific "Portal shorthand reminder" at the top of the doc (e.g., "Throughout this guide, 'MGP' refers to Managed Google Play; 'ZT' refers to Zero-Touch") — iOS admin guides do not use this, but the tri-portal shorthand may benefit from inline reminder on first-read docs.

### Folded Todos

None — `gsd-tools todo match-phase 36` returned zero matches.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap

- `.planning/REQUIREMENTS.md` — AECOBO-01 / AECOBO-02 / AECOBO-03 verbatim at lines 29-35; AEDED-03 (Phase 38 FRP callout scope); AEAUDIT-04 (milestone audit rules: no "supervision", no SafetyNet, last_verified frontmatter); traceability table lines 156-194
- `.planning/ROADMAP.md` — Phase 36 entry lines 127-138 (goal, depends on Phase 35, SC1-5); Phase 38 entry lines 153-164 (FRP callout overlap); Phase 40 entry lines 179-190 (COBO L1 runbook 24 placement); Phase 41 entry lines 192-203 (COBO L2)
- `.planning/PROJECT.md` — v1.4 scope, Key Decisions (tri-portal admin template, COPE full path deferred to v1.4.1, Knox ME deferred to v1.4.1, 4-platform comparison deferred to v1.5), deferred items
- `.planning/STATE.md` — Phase 36 research flags to verify at plan time (COPE wording, enrollment token expiry, Android 15 FRP/EFRP); v1.4 decisions including "COBO L1 triage runbook 24 lands in Phase 40"

### v1.4 Android Enterprise Research (all 2026-04-19)

- `.planning/research/FEATURES.md` — Mode 2 Fully Managed / COBO lines 99-141 (Android 10+ hard requirement; all four provisioning methods; enrollment token configurable; work profile IS entire device; FRP behavior per mode); COPE note lines 143-144 ("Google's trajectory is toward WPCO"); Phase 2 Corporate Enrollment lines 474-478; COBO dependency DAG
- `.planning/research/ARCHITECTURE.md` — file dependency graph (MGP binding → COBO admin guide required-by chain); tri-portal template invocation for COBO (H4 structure with all three portals included); provisioning-method matrix cross-reference pattern; Phase 36 = line 266 `admin-setup-android/03-fully-managed-cobo.md`
- `.planning/research/PITFALLS.md` — PITFALL 1 (version decay, token 90-day myth line 31), PITFALL 2 (MGP binding what-breaks table), PITFALL 3 (supervision collision — use "fully managed"), PITFALL 5 (provisioning-method misrouting — all 4 methods with callouts), PITFALL 9 (append-only / no v1.0-v1.3 shared file mods), PITFALL 11 (KME/ZT mutual exclusion for Samsung), Pitfall-review-per-phase table lines 389-420 (COBO row), Content-quality checklist lines 408-422 (COBO row), Android 15 FRP behavioral concern lines 434-436
- `.planning/research/SUMMARY.md` — Phase 36 section lines 188-195 (COBO admin setup + COPE note + Android 15 FRP + Entra join + Chrome-tab CA exclusion); Pitfall 1 and Pitfall 11 detail; source-hierarchy confidence attribution
- `.planning/research/STACK.md` — portal URLs (`endpoint.microsoft.com`, `play.google.com/work`, `enterprise.google.com/android/zero-touch/customers`), frontmatter conventions, 60-day review cycle rationale

### Phase 34 Foundation (shipped 2026-04-21 — locked decisions feed Phase 36)

- `.planning/phases/34-android-foundation/34-CONTEXT.md` — Phase 34 locked decisions: tri-portal admin template structure (D-16..D-22), tri-portal shorthand, mode labels (COBO / BYOD WP / Dedicated / ZTE / AOSP), AEAUDIT-04 no-"supervision" guard, 60-day review cycle, HTML-comment subtractive-deletion pattern (D-17), cross-platform callout pattern (D-10), Anti-Pattern 1 matrix guard (D-26)
- `docs/_glossary-android.md` (Phase 34) — term anchors for cross-reference: `#fully-managed`, `#dpc`, `#managed-google-play`, `#zero-touch-enrollment`, `#play-integrity`, `#amapi`, `#afw-setup`
- `docs/_templates/admin-template-android.md` (Phase 34) — structural template for `03-fully-managed-cobo.md`; tri-portal H4 convention with all three portals (COBO uses all three)
- `docs/android-lifecycle/00-enrollment-overview.md` (Phase 34) — 5-column mode-comparison table; cross-reference target for `#fully-managed`, `#two-axes-of-android-enterprise`, `#for-admins-familiar-with-ios`
- `docs/android-lifecycle/02-provisioning-methods.md` (Phase 34) — canonical 5×4 provisioning matrix with Mode rows × Method cols; COBO row Notes column carries "Dual-SIM devices: register IMEI 1" (Phase 34 D-25); KME/ZT mutual-exclusion callout adjacent to ZT column header (Phase 34 D-27). Phase 36 references filtered rows, never duplicates.
- `docs/android-lifecycle/03-android-version-matrix.md` (Phase 34) — version breakpoints with narrative sections; **verified** Android 15 FRP breakpoint at lines 67-78 ("Factory Reset Protection Hardening" section) with EFRP admin action. Phase 36 D-05 cross-links this narrative.

### Phase 35 Prerequisites (shipped 2026-04-22 — locked decisions feed Phase 36)

- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-CONTEXT.md` — Phase 35 locked decisions: Phase 36 is a consumer of Phase 35 anchors (MGP doc `#bind-mgp` and `#disconnect-consequences`; ZT portal doc `#link-zt-to-intune`, `#dpc-extras-json`, `#kme-zt-mutual-exclusion`); D-22 Phase 35/39 ZT scope split (dual-SIM IMEI 1 is Phase 39 scope, NOT Phase 36); hybrid dual-placement pattern D-13 (precedent for Phase 36 D-07 hard-prereq + inline)
- `docs/android-lifecycle/01-android-prerequisites.md` (Phase 35) — concept-only orientation to tri-portal; cross-reference target for COBO guide's prereqs section when describing MGP binding as a prereq
- `docs/admin-setup-android/00-overview.md` (Phase 35) — 5-branch mermaid flowchart; COBO-path prerequisites checklist; Portal Navigation Note. COBO guide is the target of the mermaid's COBO branch.
- `docs/admin-setup-android/01-managed-google-play.md` (Phase 35) — MGP binding mechanics canonical doc; COBO guide references `#bind-mgp`, `#account-types`, `#disconnect-consequences` — never restates binding steps
- `docs/admin-setup-android/02-zero-touch-portal.md` (Phase 35) — ZT portal setup canonical doc; COBO guide references `#step-0-reseller`, `#link-zt-to-intune`, `#dpc-extras-json`, `#kme-zt-mutual-exclusion` for ZT-provisioning-path content. Phase 39 will extend this doc with corporate-scale content; COBO guide does NOT carry that content.

### v1.3 Validated Precedents (structural templates)

- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — **PRIMARY structural template** for `03-fully-managed-cobo.md`. Admin guide with Prerequisites + Key Concepts Before You Begin + Steps + What-Breaks callouts per setting. Single-method iOS (ADE) doc; Phase 36 extends the pattern to four methods via D-01 hybrid. Also demonstrates supervised-only callout placement precedent (Phase 36 uses "what breaks if misconfigured" inline callouts in the same positions).
- `docs/admin-setup-ios/06-compliance-policy.md` (28869 bytes, verified exists) — CA-timing pattern precedent. **NOT cross-referenced from Phase 36** per D-09 (PITFALL 9 / PITFALL 11 guard), but the pattern is useful for Phase 36 authors to review internally.
- `docs/admin-setup-ios/00-overview.md` — five-path mermaid flowchart precedent (Phase 35 `00-overview.md` inherited this pattern).
- `docs/_templates/admin-template-ios.md`, `docs/_templates/admin-template-macos.md` — HTML-comment subtractive-deletion pattern; tri-portal-analog dual-portal precedent.

### Cross-Platform Navigation (for awareness only — NOT modified in Phase 36)

- `docs/index.md` — navigation hub (Android stub integration deferred to Phase 42). Phase 36 does NOT add COBO entry to index.md.
- `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — cross-platform routing (Android integration deferred post-v1.4 per PROJECT.md). Phase 36 does NOT modify.
- `docs/_glossary-macos.md` — see-also cross-reference back to `_glossary-android.md` is Phase 42 (AEAUDIT-03) scope. Phase 36 does NOT modify.

### Adversarial Review Artifact

- `.planning/phases/36-fully-managed-cobo-admin/36-DISCUSSION-LOG.md` — full adversarial-review audit trail (finder / adversary / referee verdicts; all 67 flaws scored; 42 confirmed real / 25 false positive; winners selected on lowest-real-flaw basis)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phases 34-35 + v1.0-v1.3)

- **Admin template** (`docs/_templates/admin-template-android.md`, Phase 34) — drives `docs/admin-setup-android/03-fully-managed-cobo.md`. All three H4 sub-sections retained (Intune admin center / MGP / ZT portal) because COBO uses all three. HTML-comment subtractive-deletion pattern does NOT apply to COBO (none of the three sections deleted).
- **Android glossary** (`docs/_glossary-android.md`, Phase 34) — term anchors for COBO prose cross-references: `#fully-managed` (load-bearing for D-08 Entra-join conceptual link), `#managed-google-play`, `#zero-touch-enrollment`, `#dpc`, `#afw-setup`, `#play-integrity`.
- **Enrollment overview** (`docs/android-lifecycle/00-enrollment-overview.md`, Phase 34) — cross-reference target for COBO mode-definition anchor (`#fully-managed`) and "For Admins Familiar with iOS" supervision-analog subsection.
- **Version matrix** (`docs/android-lifecycle/03-android-version-matrix.md`, Phase 34) — verified Android 15 FRP breakpoint at lines 67-78 with EFRP admin action. Phase 36 D-05 cross-links this narrative via `#android-15-breakpoint` anchor; Phase 36 does NOT restate the breakpoint detail.
- **Provisioning-method matrix** (`docs/android-lifecycle/02-provisioning-methods.md`, Phase 34) — canonical source for method support per mode. COBO row (method availability per method × COBO) is the filtered-row target for D-01 inline callouts. Phase 34 D-25 Notes column carries "Dual-SIM IMEI 1" for COBO; D-27 KME/ZT mutual-exclusion adjacent to ZT column header.
- **Phase 35 MGP binding doc** (`docs/admin-setup-android/01-managed-google-play.md`) — Phase 36 Prerequisites block references `#bind-mgp` as the upstream prereq gate.
- **Phase 35 ZT portal doc** (`docs/admin-setup-android/02-zero-touch-portal.md`) — Phase 36 Zero-Touch provisioning inline callout references `#link-zt-to-intune`, `#dpc-extras-json`, `#kme-zt-mutual-exclusion`.
- **Frontmatter schema** — `last_verified`, `review_by`, `platform`, `audience`, `applies_to` established across 118+ docs. Phase 36 uses `platform: Android`, `audience: admin`, `applies_to: COBO`.
- **"What breaks if misconfigured" callout convention** — from admin-template-macos/ios/android; Phase 36 uses extensively per-setting (PITFALL 2 inheritance).
- **Platform gate blockquote pattern** — "`> **Platform gate:** This guide covers Android Enterprise Fully Managed (COBO) enrollment through Microsoft Intune. For [other-platform], see [link]. For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).`"
- **"How to Use This Guide" audience-routing section** — precedent from iOS `03-ade-enrollment-profile.md` context; Phase 36 adopts.
- **"Key Concepts Before You Begin" subsection** — precedent from iOS `03-ade-enrollment-profile.md` lines 24-47. Phase 36 D-08 uses this location for Entra-join-conceptual content (work profile = entire device).
- **Cross-platform callout pattern** (Phase 34 D-10) — per-term Android-definition blockquote with cross-platform note. COBO guide applies to: Fully Managed (no cross-platform analog per AEAUDIT-04 — just the Android definition); Zero-Touch Enrollment (contrast with Apple ADE); DPC / afw#setup (no iOS analog); Managed Google Play (contrast with Apple VPP).

### Established Patterns

- **60-day review cycle** — inherited from Phase 34/35.
- **Source-hierarchy confidence attribution** — HIGH: Google Android Enterprise Help; MEDIUM: Microsoft Learn; MEDIUM: Jason Bayton (bayton.org); LOW: community. Phase 36 MEDIUM-confidence assertions (e.g., Android 15 FRP Intune UI path if community-sourced) carry explicit labels + `last_verified` date.
- **Anti-Pattern 1 guard** — matrices live in canonical reference docs (Phase 34). Phase 36 rigorously references Phase 34 matrices via filtered-row link patterns; NEVER duplicates the grid.
- **PITFALL 1 version-tag discipline** — every behavioral assertion carries an inline version tag (D-12).
- **PITFALL 2 what-breaks pattern** — per-setting callouts inline at point of admin decision; no footnote, no bottom "gotchas" section.
- **PITFALL 5 provisioning-method callout inheritance** — per-method what-breaks callouts inherited from matrix; do NOT restate matrix failure-modes column. Only COBO-specific constraint flavor is Phase 36-owned.
- **PITFALL 11 KME/ZT Samsung callout** — Phase 35 D-23 anchor `#kme-zt-mutual-exclusion` is the cross-link target; Phase 36 D-06 carries a one-line reminder inside the Zero-Touch provisioning callout.
- **Phase 35 D-13 hybrid-placement pattern** (subsection + inline) — precedent reused for Phase 36 D-07 (hard-prereq block + inline reminder at Chrome-tab step).

### Integration Points

- `docs/admin-setup-android/` — directory created in Phase 35. Phase 36 adds `03-fully-managed-cobo.md`. File numbering: 00 (Phase 35), 01 (Phase 35), 02 (Phase 35), 03 (Phase 36), 04 (Phase 37), 05 (Phase 38), 06 (Phase 39 AOSP stub).
- **Anchor stability contract with Phase 38 / 39 / 40 / 41**: the anchors in D-10 are consumed by Phase 38 (Dedicated — references `#enrollment-profile` and `#provisioning-method-choice` for shared COBO provisioning mechanics), Phase 40 (L1 runbook 24 "Device not enrolled" — references `#enrollment-token`, `#provisioning-method-choice`), Phase 41 (L2 runbook 19 enrollment investigation — references `#enrollment-profile`, `#android-15-frp`). Renaming breaks downstream cross-refs.
- **Phase 38 shared provisioning mechanics dependency**: ROADMAP Phase 38 line 155 states Phase 38 depends on Phase 36 for "shared COBO provisioning mechanics; dedicated extends COBO enrollment profile structure." Phase 36 `#enrollment-profile` and `#provisioning-method-choice` anchors are Phase 38's consumption target. Phase 38 does NOT duplicate these sections; it cross-references and then layers Dedicated-specific content on top.
- **Phase 42 milestone audit dependencies** (AEAUDIT-04): Phase 36 must (a) carry `last_verified` frontmatter; (b) have zero "SafetyNet" occurrences (use Play Integrity only); (c) have zero uses of "supervision" as an Android management term; (d) have zero modifications to v1.0-v1.3 shared files; (e) carry version tags on all behavioral assertions (PITFALL 1). Phase 42 audit greps verify.
- **Phase 34/35 admin-setup-android directory structure verification**: before Phase 36 PLAN authoring, confirm `docs/admin-setup-android/00-overview.md`, `01-managed-google-play.md`, and `02-zero-touch-portal.md` are merged (Phase 35 complete per STATE.md). If Phase 35 is incomplete when Phase 36 planning runs, defer PLANs until Phase 35 anchors are stable.

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence

- **Hybrid routing for provisioning-methods (D-01)**: the doc does NOT contain a full per-method walkthrough (Anti-Pattern 1 violation) and does NOT contain a routing-table-only replacement of Phase 34's matrix (Anti-Pattern 1 near-collision). It contains a routing-to-Phase-34-matrix pointer + per-method inline constraint callouts that add value beyond what the matrix says (COBO-specific constraint flavor, not method mechanics). The filtered-row link pattern (D-02) is the mechanism: "For NFC provisioning on COBO devices, see `02-provisioning-methods.md#nfc` (row: Method=NFC, Mode=COBO). On Android 11+, NFC is not supported for COPE (not relevant here since COBO retains NFC support on Android 10+)."

- **COPE Migration Note as dedicated section (D-03)**: a `## COPE Migration Note` section placed after COBO overview (so readers have primary COBO context) but before enrollment-profile content (so they hit it before making any irreversible reset decision per ROADMAP Phase 36 goal "before the admin makes any irreversible device-reset decision"). 150-250 words. Contents: Google's current recommendation ("Google recommends WPCO (Work Profile on Corporate-Owned)"); COPE is still supported but NFC and afw#setup lost COPE support on Android 11+ (cross-link to provisioning matrix); WPCO is forward-looking Google terminology; full COPE admin path deferred to v1.4.1 with "See also" stub to PROJECT.md deferred items.

- **Android 15 FRP + EFRP callout (D-05)**: a `## Android 15 FRP and EFRP` section placed AFTER enrollment-profile content (post-enrollment hardening context is the semantically correct flow — admins first create the profile, enroll, then configure EFRP as a reset-path protection). Opens with a ⚠️ blockquote: "Configure EFRP before any factory reset on Android 15 devices; FRP hardening can block re-enrollment." Body covers: Android 15 behavioral change (version-tagged per PITFALL 1); admin action (configure EFRP); Intune policy path (plan-time-verified); cross-link to Phase 34 version matrix for authoritative breakpoint record. Phase 38 Dedicated will carry a parallel-but-distinct FRP callout framed for re-provisioning rather than re-enrollment — the two sections don't duplicate because they're scoped to different scenarios.

- **Entra join + CA exclusion hybrid (D-07)**: Prerequisites block carries TWO entries — "Entra join enabled" (hard prereq) and "Conditional Access exclusion for Microsoft Intune cloud app IF your tenant uses CA" (tenant-conditional). Explicit tenant-conditional framing is the mitigation for F-051/F-052 MEDs (don't mis-scope CA as universal hard prereq). Inline reminder at the Chrome-tab step re-surfaces the action. Pattern precedent: Phase 35 D-13 hybrid subsection + inline.

### Cross-Platform Callout Pattern (inherited from Phase 34 D-10)

Applied to Phase 36 COBO guide where Android terms are used:

- **Fully Managed** — no cross-platform analog per AEAUDIT-04 ("Android's Fully Managed is the management-scope mode; iOS has no direct analog — supervision is a related but structurally-different concept"). The glossary `_glossary-android.md#fully-managed` carries the "For Admins Familiar with iOS" bridge. Phase 36 does NOT restate the iOS-supervision analog.
- **Zero-Touch Enrollment (ZTE)** — brief cross-platform note comparing to Apple ADE (and pointing to Phase 35 ZT portal doc for mechanics).
- **DPC / afw#setup** — no iOS/macOS analog; Android-native.
- **Managed Google Play (MGP)** — brief cross-platform note comparing to Apple VPP (and pointing to Phase 35 MGP binding doc for mechanics).

### What-Breaks Callout Density

Every configurable setting in the enrollment-profile section carries a "What breaks if misconfigured" callout (PITFALL 2 inheritance):

- Enrollment token expiry — "What breaks: token expiry prematurely revoked; devices in enrollment flow fail at the token-check step with opaque error. Set to organizational default (e.g., 1 year) unless short-term pilot."
- Enrollment token assignment target — "What breaks: token assigned to group that does not include intended devices; devices fail token-check. Assign broadly or to a parent group."
- Provisioning method selection — "What breaks: selecting a method that the Android version does not support (e.g., NFC for COPE on Android 11+, not applicable here but demonstrates the pitfall pattern — see `02-provisioning-methods.md` for the full version-support matrix)."
- Entra join CA policy (with D-07 caveat for tenants without CA) — "What breaks: Microsoft Intune cloud app not excluded in Conditional Access; Chrome tab sign-in fails during COBO setup; admin sees an opaque 'sign-in blocked' error."
- EFRP policy assignment (for Android 15) — "What breaks: EFRP not assigned to COBO devices before a factory reset; FRP locks the device post-reset; re-enrollment requires Google account credential intervention."

### Known PITFALLS.md patterns to apply

- **PITFALL 1 version decay**: every behavioral assertion version-tagged; use Play Integrity (never SafetyNet); enrollment token 65-year cap (never "90-day max" for COBO); NFC COPE restriction Android 11+; Android 15 FRP callout; Android 12 IMEI/serial removal reference to Phase 34 matrix.
- **PITFALL 2 what-breaks per setting**: inherited from admin template; applied per every configurable setting in enrollment-profile section.
- **PITFALL 5 provisioning-method misrouting**: show all 4 methods with constraint callouts; never describe "the" COBO provisioning method.
- **PITFALL 11 KME/ZT Samsung**: one-line reminder inside the Zero-Touch provisioning callout (D-06) with cross-link to Phase 35 D-23 anchor `#kme-zt-mutual-exclusion`.
- **PITFALL 3 terminology**: COBO (Fully Managed) — never "supervision"; AEAUDIT-04 milestone audit greps verify.

</specifics>

<deferred>
## Deferred Ideas

Ideas that surfaced during adversarial review but belong in other phases, other milestones, or separate tracking:

- **Full COPE admin setup path** — deferred to v1.4.1 per PROJECT.md Key Decisions. Phase 36 ships the COPE Migration Note (D-03) with a "See also" stub to PROJECT.md deferred-items. If Google formally deprecates COPE by v1.4.1 planning, this is dropped entirely per AECOPE future-requirements.
- **Knox Mobile Enrollment (KME) full admin path** — deferred to v1.4.1 per PROJECT.md. Phase 36 Zero-Touch provisioning callout (D-06) carries a one-line KME/ZT mutual-exclusion reminder; full KME coverage is v1.4.1.
- **Corporate-scale ZTE content** (reseller-upload handoff, device claim workflow, profile assignment at scale, dual-SIM IMEI 1 registration) — Phase 39 extends Phase 35 ZT portal doc. Phase 36 COBO guide does NOT carry dual-SIM IMEI 1 callout.
- **COBO L1 triage runbook 24** ("Device not enrolled") — Phase 40 (AEL1-04) per STATE.md v1.4 decisions. Phase 36 provides the admin-guide anchor targets (`#enrollment-token`, `#provisioning-method-choice`) but does NOT carry L1 content.
- **COBO L2 investigation runbook** (token delivery verification, staged token workflow, log collection for COBO) — Phase 41 (AEL2-02 and AEL2-03) per ROADMAP.
- **Dedicated FRP re-provisioning behavior** (Phase 38 AEDED-03 scope) — Phase 38 carries parallel-but-distinct FRP callout; Phase 36 owns EFRP config steps but does NOT pre-empt Phase 38's re-provisioning-scoped content.
- **AOSP-mode provisioning** — Phase 39 AOSP stub (AEAOSP-01). Phase 36 does NOT reference AOSP.
- **BYOD Work Profile provisioning** — Phase 37 (AEBYOD). Phase 36 explicitly NOT BYOD scope.
- **Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference** — Phase 42 (AEAUDIT-03) scope. Phase 36 does NOT modify `_glossary-macos.md`.
- **Cross-platform nav integration** (Android stub in `docs/index.md`, `common-issues.md`, quick-refs) — post-v1.4 unification task per PROJECT.md. Phase 36 does NOT modify v1.0-v1.3 shared files.
- **Enrollment token rotation runbook** — research FEATURES.md line 55 identifies this as a useful deliverable. Not in Phase 36 scope; candidate for v1.4.1 operational-content phase or deferred to post-v1.4.
- **Factory Reset Protection behavior matrix per mode and reset method** (COBO / BYOD / Dedicated / AOSP × Settings reset / recovery reset / Intune wipe) — research FEATURES.md line 398 identifies this as high-value. Not in Phase 36 scope (Phase 36 covers COBO × Android 15 specifically). Candidate for v1.4.1 or milestone-audit artifact.
- **Full Android Enterprise FRP (EFRP) documentation spanning all corporate modes with OEM-specific behavior** — belongs in v1.4.1 operational-content phase if scope firms. Phase 36 covers COBO-scope EFRP via Intune policy only.
- **4-platform comparison document** — v1.5 per PROJECT.md. Phase 36 does not pre-empt.
- **Intune admin center navigation screenshots or visual artifacts** — out of scope per PROJECT.md "screenshots/visual evidence for admin portals" exclusion (v1.0-v1.3 text-first policy).

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 36` returned zero matches.

</deferred>

---

*Phase: 36-fully-managed-cobo-admin*
*Context gathered: 2026-04-21*
*Method: adversarial-review skill (finder → adversary → referee) — 67 flaws evaluated; 42 confirmed real; 25 false positives; 4 gray areas resolved on lowest-real-flaw basis (1C / 2A / 3C / 4A).*
