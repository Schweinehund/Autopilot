# Phase 39: Zero-Touch Enrollment + AOSP Stub - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Method:** Adversarial review (finder / adversary / referee scored pattern) across 16 candidate options in 4 gray areas. 80 flaws scored; 73 confirmed real; 7 disputed by Adversary, all 7 ruled FALSE POSITIVE by Referee. Winners selected on lowest CRIT count first, then lowest weighted total (5×CRIT + 2×MED + 1×LOW). Per-area winners: 1A / 2B / 3B / 4B.

<domain>
## Phase Boundary

Phase 39 delivers TWO artifacts, appended to the v1.4 Android Enterprise admin-setup-android surface:

1. **Extension** to `docs/admin-setup-android/02-zero-touch-portal.md` — corporate-scale ZTE content appended to Phase 35's shipped file. Per Phase 35 D-22 split contract: reseller-upload handoff workflow, device-claim workflow, profile assignment at scale, dual-SIM IMEI 1 registration, full KME/ZT mutual-exclusion callout at device-claim, configuration-must-be-assigned gotcha. Reserved Phase 39 anchors: `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, plus sub-anchors `#kme-zt-device-claim`, `#configuration-must-be-assigned` authorized by D-22 content inventory. (AEZTE-01)

2. **New file** `docs/admin-setup-android/06-aosp-stub.md` — hard-scoped AOSP stub: scope callout ("stub in v1.4; full coverage v1.4.1"), what AOSP is, when to use it, OEM matrix from MS Learn (RealWear confirmed GA), QR-only enrollment, one-device-at-a-time, Wi-Fi credential embedding requirement (RealWear-specific), deferred-content table. (AEAOSP-01)

Phase 39 does NOT own:

- **Phase 35 ZT portal setup mechanics** (Step 0 reseller gate, ZT account creation, DPC extras JSON, ZT↔Intune linking Methods A/B, existing KME/ZT H2) — Phase 35 owns; Phase 39 appends, never duplicates.
- **ZTE L1 triage runbook 27** — Phase 40 owns per STATE.md v1.4 decision.
- **AOSP L1 and L2 runbooks** — no AOSP L1/L2 in v1.4 by explicit scope (PITFALL 12).
- **AOSP full failure catalog / per-OEM enrollment steps / AOSP user-associated + userless full coverage** — deferred to v1.4.1 per PROJECT.md Key Decisions.
- **Knox Mobile Enrollment full admin coverage** — deferred to v1.4.1; Phase 39 carries only the KME/ZT mutual-exclusion reminder at device-claim.
- **Cross-platform nav integration** — Phase 42 scope / post-v1.4 unification task.
- **Android 15 FRP re-provisioning content** — Phase 36 / Phase 38 own (EFRP config in Phase 36; Dedicated FRP 3-pathway in Phase 38).

Carrying forward from Phases 34, 35, 36, 37, and 38 (LOCKED — do not re-open):

- **Phase 35 D-22 split contract** — Phase 39 appends content to `02-zero-touch-portal.md`; never inline-inserts inside Phase-35-owned H2 sections. "Same file, different sections or new content in Phase 39 PLANs" means additive H2 blocks, not H3 infiltration.
- **Phase 35 D-23 anchor contract** — Phase 39's anchors must not collide with Phase 35's (`#prerequisites`, `#step-0-reseller`, `#create-zt-account`, `#dpc-extras-json`, `#link-zt-to-intune`, `#kme-zt-mutual-exclusion`, `#renewal-maintenance`). D-23 is NOT a cap on Phase 39 anchor count — D-22 lists additional deliverables (KME/ZT at device-claim, configuration-must-be-assigned) that require their own anchors. H3 sub-anchors under Phase 39 H2s are authorized.
- **Phase 34 tri-portal template + HTML-comment subtractive-deletion pattern (D-17)** — AOSP stub omits MGP and ZT portal H4 sub-sections via `<!-- subsection intentionally omitted -->` pattern (AOSP uses neither portal).
- **Tri-portal shorthand** (Phase 34) — "Intune admin center" / "Managed Google Play (MGP)" / "Zero-Touch portal (ZT portal)". Full names on first appearance per doc, shorthand thereafter.
- **Mode labels** (Phase 34) — "Zero-Touch Enrollment (ZTE)" on first use; "ZTE" thereafter. AOSP: "Android Open Source Project (AOSP)" on first use; "AOSP" thereafter. Never use "supervision" as an Android management term (AEAUDIT-04, PITFALL 3).
- **Anti-Pattern 1 guard** (Phase 34 D-26) — matrices live in single canonical reference docs. Phase 34 `02-provisioning-methods.md` and `03-android-version-matrix.md` are the canonical matrices. AOSP OEM matrix has no upstream canonical in v1.4 (Phase 34 `02-provisioning-methods.md` defers AOSP OEM detail to Phase 39); the AOSP stub becomes the canonical host for the OEM matrix per AEAOSP-01 SC3 explicit requirement.
- **PITFALL 1 discipline** — every behavioral assertion carries an inline version tag.
- **PITFALL 2 pattern** — "What breaks if misconfigured" callouts placed inline at the point of admin decision.
- **PITFALL 4** — ZT reseller Step 0 upfront (Phase 35 owns); dual-SIM IMEI 1 note (Phase 39 owns — D-08); KME/ZT mutual exclusion (Phase 35 owns top-of-doc + link-step callout; Phase 39 owns device-claim-step callout per D-06/D-11).
- **PITFALL 7 AOSP mandatory framing** — stub MUST explicitly state "Other OEMs (non-RealWear) are not supported under AOSP management in Intune — use Android Enterprise fully managed instead if GMS is present" (D-10 below). Not deferred, not punted.
- **PITFALL 9 / PITFALL 11 guard** — no modifications to v1.0-v1.3 shared files (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `_glossary.md`, `_glossary-macos.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/l1-runbooks/`, `docs/l2-runbooks/`, `docs/end-user-guides/`).
- **PITFALL 12** — AOSP stub scope-guard enforcement. H2 whitelist (D-03). Explicit deferred-content table. No L1/L2 for AOSP in v1.4.
- **AEAUDIT-04 guards** — no "supervision" as Android management term; Play Integrity only, never SafetyNet; `last_verified` frontmatter mandatory; no Android links in v1.0-v1.3 shared files; AOSP stub passes H2 whitelist mechanical audit.
- **60-day review cycle** — frontmatter `last_verified` + `review_by` with 60-day window (fast-moving platform; ZT portal UI and AOSP OEM matrix are both HIGH-drift research flags).
- **Phase 36/37/38 anchor stability contracts** — Phase 39 does not modify anchors in Phase 36 `03-fully-managed-cobo.md`, Phase 37 `04-byod-work-profile.md` / `android-work-profile-setup.md`, or Phase 38 `05-dedicated-devices.md`.
- **Phase 37 D-10/D-11 source-confidence marker pattern** — inline markers `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` matching regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` apply to MEDIUM/LOW-confidence claims per D-20.
- **ARCH Q6 Platform note banner pattern** (Phase 38 D-10) — AOSP stub carries Platform note disambiguating AOSP from iOS/macOS/Windows equivalents where applicable.
- **Phase 34 `_glossary-android.md` cross-references** — ZTE, AOSP, DPC, and RealWear terms use Phase 34 D-10 cross-platform callout pattern on first appearance.
- **HTML-comment verify-UI-at-execute-time pattern** — existing shipped `02-zero-touch-portal.md` (lines 48, 50, 72, 73) uses `<!-- verify UI at execute time -->` for portal-nav claims subject to research-flag drift. Phase 39 inherits this pattern; it is SYNTACTICALLY DISTINCT from Phase 34 D-17 `<!-- subsection intentionally omitted -->` subtractive-deletion pattern.
- **STACK.md SPARSE DOC FLAG (line 275-277)** — Microsoft Learn does not document reseller-side ZT portal steps; admin-facing documentation must link to Google's reseller guide and note the purchase-time constraint. Google-canonical source area. D-07 locks this discipline for device-claim workflow depth.
- **Frontmatter schema** — `platform: Android`, `audience: admin`, `applies_to: ZTE` (for ZT portal doc extension sections — applies_to value already locked by Phase 35 D-24) / `applies_to: AOSP` (for new AOSP stub). Single-string `applies_to` convention per Phase 36 D-13 / Phase 37 D-15 precedent.

Research flags to verify at plan/execute time (from STATE.md + this phase):

- **Zero-Touch portal UI current navigation** — portal has history of redesigns; `enterprise.google.com/android/zero-touch/customers` layout and breadcrumb paths may have changed since research (2026-04-19). Plan-time re-verification required for device-claim workflow decision points. MEDIUM-confidence markers on any portal-step specifics that cannot be re-sourced.
- **AOSP supported-devices page current state** — MS Learn `learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices` last verified 2025-05-12 per research. This is ~12 months stale; AOSP OEM list and per-device models MUST be re-verified at plan time before the stub ships. If the page has added/removed OEMs since 2025-05-12, the stub matrix reflects current state with `last_verified` frontmatter date.
- **Intune Plan 2 / Suite licensing requirement for AOSP** — per SUMMARY.md line 254, "Verify Intune Plan 2 / Suite requirement per OEM type before publishing enrollment guide with licensing notes." Plan-time verification required before the stub's Prerequisites and Licensing H2 is populated; if unverified, MEDIUM-confidence marker per D-20.
- **Enrollment token expiry language for ZT portal** — 90-day max is MEDIUM confidence per STATE.md (not in current MS Learn); ZTE extension sections referencing token mechanics cross-link to Phase 35's `#renewal-maintenance` and inherit Phase 35's verification discipline.
- **Reseller-upload handoff specifics** — Google-canonical source area per STACK.md SPARSE DOC FLAG; plan-time verification against Google reseller guide at `https://support.google.com/work/android/answer/9040598` (reseller-side documentation) required.
- **Device-claim workflow UI** — same ZT portal redesign risk; decision-points-as-prose per D-01 WINNER mitigates screen-by-screen staleness but individual click-path specifics still require execute-time verify-UI HTML comments per D-07.

</domain>

<decisions>
## Implementation Decisions

### ZTE Extension Structural Placement + Device-Claim Depth (AEZTE-01 SC1) — GA1 winner: 1A

- **D-01:** **Single appended H2 block `## Corporate-Scale Operations` inserted at position 7 of `docs/admin-setup-android/02-zero-touch-portal.md` — AFTER Phase 35's `## KME/ZT Mutual Exclusion (Samsung)` and BEFORE Phase 35's `## Verification`. Device-claim workflow depth: decision-points-as-prose + Google canonical link + existing verify-UI-comment pattern.**

  Sub-structure (H3 within the H2):
  1. `### Reseller-Upload Handoff Workflow` (anchor `#reseller-upload-handoff`)
  2. `### Device Claim Workflow` (anchor `#device-claim-workflow`)
  3. `### Profile Assignment at Scale` (anchor `#profile-assignment`)
  4. `### Dual-SIM IMEI 1 Registration` (anchor `#dual-sim-imei-1`)
  5. `### KME/ZT Mutual Exclusion — At Device Claim` (anchor `#kme-zt-device-claim`)
  6. `### Configuration Must Be Assigned` (anchor `#configuration-must-be-assigned`) — with prose cross-link to Phase 35's `#dpc-extras-json` at natural decision point to satisfy PITFALL 2 "point of admin decision" discipline without violating Phase 35 D-22 append-only contract

  Device-claim UI discipline:
  - Decision-points-as-prose (NOT screen-by-screen) per STACK.md SPARSE DOC FLAG.
  - Link to Google ZT customer-portal help (`https://support.google.com/work/android/topic/9158960`) and, where in-scope for decision-making, specific Google help-article URLs.
  - HTML comments `<!-- verify UI at execute time -->` for any portal-nav specifics that survive the decision-points discipline (same pattern as Phase 35 shipped file lines 48, 50, 72, 73).

  Updates to Phase 35-owned sections:
  - `## Verification` H2 — APPEND a `- [ ]` checkbox item referencing Phase 39 device-claim testing. The existing line 135 placeholder "A test device from reseller-uploaded stock boots into the Intune DPC — Phase 39 covers device-claim testing at scale" is updated to a confirmed cross-reference to `#device-claim-workflow`. This is the only content in a Phase-35-owned H2 that Phase 39 modifies, and only because the placeholder explicitly invited this update.
  - `## Changelog` — new row per changelog convention.

  *Winner of GA1 adversarial review (1A: 0 CRIT / 2 MED / 2 LOW = weighted 6 after Referee rulings) over 1B (3 CRIT / 3 MED / 1 LOW = 22 — F-1B-01 AEPREQ-04 SC4 "starts at Step 0" violation; F-1B-02 D-22 append-contract violation; F-1B-03 Anti-Pattern 1 reseller-topic duplication), 1C (3 CRIT / 2 MED / 1 LOW = 20 after F-1C-04 ruling — F-1C-01 STATE.md ZT-portal-redesign research-flag violation; F-1C-02 STACK.md SPARSE-DOC-FLAG violation; F-1C-03 Phase 37 D-10/D-11 source-confidence marker dilution), and 1D (3 CRIT / 1 MED / 1 LOW = 18 after F-1D-04 ruling — F-1D-01 D-22 append-contract violation via inline Method B insertion; F-1D-02 Anti-Pattern 1 dual-location for dual-SIM content; F-1D-03 full KME/ZT callout without own stable anchor).*

- **D-02:** **H2 title "Corporate-Scale Operations" (not "Zero-Touch Enrollment at Scale").** Rationale: the shipped file title is `# Configure Zero-Touch Portal`; repeating "Zero-Touch Enrollment" inside the file is redundant and introduces a fabricated concept ("at Scale" vs "at Scale what?"). "Corporate-Scale Operations" names the admin task (operating ZTE at fleet scale) without redundancy. Closes F-1A-02 MED.

- **D-03:** **Configuration-must-be-assigned placement resolution.** The `### Configuration Must Be Assigned` H3 lives inside the appended `## Corporate-Scale Operations` block per D-01 (Phase 35 D-22 append contract is strict). BUT the H3 opens with a prose sentence: "When you paste the DPC extras JSON (see [DPC Extras JSON Configuration](#dpc-extras-json) in Phase 35 scope), the configuration must also be ASSIGNED to the device set before the first boot — otherwise devices fall through to consumer setup." This cross-link satisfies PITFALL 2 "point of admin decision" discipline without violating D-22 append-only. Closes F-1A-03 MED.

- **D-04:** **Device-claim workflow source-strategy.** Per STACK.md line 275-277 SPARSE DOC FLAG, Microsoft Learn does not document reseller-side steps; Google is the canonical source. `### Device Claim Workflow` MUST:
  - State the decision points (which devices to claim, which configuration to assign, per-device vs bulk assignment) in prose.
  - Link to Google's Zero-Touch customer-portal help as the canonical source for current UI.
  - Carry `<!-- verify UI at execute time -->` HTML comments on any specific click-path claim that survives decision-points discipline (same pattern as Phase 35 shipped file).
  - Carry `[MEDIUM: source, last_verified YYYY-MM-DD]` source-confidence markers on any assertion that cannot be re-sourced against Microsoft Learn or Google's canonical docs at plan/execute time. Do NOT put source-confidence markers on every portal-step (F-1C-03 discipline).

- **D-05:** **Dual-SIM IMEI 1 source-confidence marker.** PITFALL 4 states "dual-SIM devices: register with IMEI 1 only" is MEDIUM-confidence (community-sourced via Google Developers known issues). `### Dual-SIM IMEI 1 Registration` H3 opens with the assertion AND a single inline marker at the assertion: `[MEDIUM: Google Developers Zero-touch known issues, last_verified YYYY-MM-DD]`. Closes F-1A-06 LOW.

- **D-06:** **Full KME/ZT callout at device claim.** `### KME/ZT Mutual Exclusion — At Device Claim` H3 inside the appended block carries the DEVICE-CLAIM-SPECIFIC callout — framed as guidance for Samsung admins at the moment of claiming devices in ZT portal. This is NOT a duplication of Phase 35's existing `## KME/ZT Mutual Exclusion (Samsung)` H2 (which handles the top-of-page warning + link-to-Intune-step callout per Phase 35 D-21); it is the DEVICE-CLAIM-STEP callout that Phase 35 D-22 explicitly lists as Phase 39 scope. Body text: Samsung-fleet admin at device-claim time verifies KME is not also configured for the same device set before claiming into ZT portal. Cross-link to Phase 35's `#kme-zt-mutual-exclusion` for full context; do NOT restate Phase 35's content. Closes F-1D-05 concern via strict scope discipline.

### AOSP OEM Matrix Shape and Depth (AEAOSP-01 SC3) — GA2 winner: 2B

- **D-07:** **RealWear-spotlight H3 + enumerate-all-MS-Learn-OEMs bulleted list + PITFALL-7-mandated "not supported" framing + deferred-content table as separate H2.**

  `## Supported OEMs` H2 structure:

  - `### RealWear (confirmed GA)` H3 — detailed prose:
    - HMT-1, HMT-1Z1, Navigator 500 device models
    - AR/VR headset usage context (hands-free frontline work)
    - Wi-Fi credential embedding requirement in the QR enrollment payload (RealWear-specific)
    - QR-only enrollment confirmed for these models
    - Source attribution: `[HIGH: MS Learn aosp-supported-devices, last_verified YYYY-MM-DD]`
    - Stable anchor `#realwear-confirmed-ga`

  - `### Other AOSP-Supported OEMs` H3 — enumerate ALL OTHER OEMs from MS Learn as currently listed at plan-time re-verification:
    - Bulleted list. Complete enumeration: DigiLens, HTC (Vive Focus 3 / Vive XR Elite / Vive Focus Vision), Lenovo (ThinkReality VRX), Meta (Quest 2 / Quest 3 / Quest 3s / Quest Pro), PICO, Vuzix (Blade 2 / M400 / M4000), Zebra (WS50). Actual list at publish time is whatever MS Learn currently lists — re-verify at plan time per research flag.
    - Frame with PITFALL-7-mandated language (D-10 below): "The OEMs above appear in Microsoft's AOSP supported-devices list. Per v1.4 scope, per-OEM enrollment mechanics for non-RealWear OEMs are deferred to v1.4.1 — current guidance: if GMS is present, use Android Enterprise fully managed instead of AOSP for these devices."
    - Cross-link to `#deferred-content` H2 and MS Learn authoritative page.
    - Stable anchor `#other-aosp-supported-oems`

  Source attribution block at H2 bottom: `[HIGH: MS Learn aosp-supported-devices, last_verified YYYY-MM-DD]` — single marker for the matrix, not per-row.

  *Winner of GA2 adversarial review (2B: 1 CRIT / 3 MED / 1 LOW = weighted 12 — 1 CRIT is the shared-across-all-candidates MS Learn list incompleteness flaw, already resolved in D-09 below via full enumeration) over 2A (2 CRIT / 2 MED / 1 LOW = 15 after F-2A-03 ruling — F-2A-02 PITFALL 7 internal contradiction), 2C (2 CRIT / 3 MED / 1 LOW = 17 — F-2C-02 SC3 "matrix" literal violation), and 2D (2 CRIT / 2 MED / 1 LOW = 15 after F-2D-05 ruling — F-2D-02 PITFALL 7 punt; F-2D-03 banner stacking).*

- **D-08:** **No inline "Notes" column in the OEM matrix.** Anti-Pattern 1 and PITFALL 12 scope-creep discipline. RealWear-specific content (Wi-Fi credential embedding, device models) lives in the RealWear H3 prose, not in a per-row table Notes cell. Closes F-2A-04 scope-creep-vector concern.

- **D-09:** **Complete enumeration of MS Learn OEM list.** The stub MUST enumerate every OEM currently listed on MS Learn's aosp-supported-devices page at plan-time re-verification. As of research snapshot (2025-05-12, stale at ~12 months), this is 8 OEMs: DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix, Zebra. Plan-time executor MUST re-verify the current list; if OEMs have been added/removed, the stub reflects current state. Prior-phase research missed DigiLens, Lenovo, Vuzix — this decision explicitly closes that gap. Closes F-2A-01 / F-2B-01 / F-2C-01 / F-2D-01 CRIT shared flaws.

- **D-10:** **PITFALL-7-mandated "not supported under AOSP" framing.** The `### Other AOSP-Supported OEMs` H3 carries the explicit framing: "Per v1.4 scope, per-OEM enrollment mechanics for non-RealWear OEMs are deferred to v1.4.1. If GMS is present on these devices, use Android Enterprise fully managed instead of AOSP." This directly encodes PITFALL 7 research guidance. Non-negotiable. Closes F-2B-02 / F-2C-05 / F-2D-02 concerns.

### AOSP Stub Scope-Guard Enforcement Mechanism (AEAOSP-01 SC4) — GA3 winner: 3B

- **D-11:** **Fixed H2 section whitelist (9 sections, no version-suffix in names).** The AOSP stub MUST contain exactly these H2 sections in this order, no more, no fewer:

  1. `## Scope and Status` — scope callout blockquote ("stub in v1.4; full coverage v1.4.1") + explicit deferred-content forward-reference
  2. `## What AOSP Is` — Android Open Source Project context (no Google Mobile Services; direct polling instead of FCM; corporate modes mark ownership automatically)
  3. `## When to Use AOSP` — AR/VR headsets and wearable scanners (mainstream Android phones/tablets should use COBO/BYOD/Dedicated instead); Platform note per D-21 disambiguating AOSP from non-Intune-Android
  4. `## Supported OEMs` — RealWear-spotlight H3 + other-OEMs H3 per D-07
  5. `## Enrollment Constraints` — QR-only; one-device-at-a-time; Wi-Fi credential embedding explicit content requirement per D-13
  6. `## Prerequisites and Licensing` — per plan-time re-verification per research flag (Intune Plan 2 / Suite requirement); if unverified at plan time, MEDIUM-confidence marker per D-14
  7. `## Deferred Content` — deferred-content table (no "v1.4.1" version suffix in H2 name per D-12)
  8. `## See Also` — cross-links to Phase 34 docs, `_glossary-android.md#aosp`, MS Learn canonical
  9. `## Changelog` — standard changelog convention

  AEAUDIT-04 mechanical check (Phase 42) verifies:
  - Exactly these 9 H2 names present (string match on H2 headings)
  - No additional H2s (audit flags any H2 not in the whitelist)
  - No H2 ordering violations (whitelist order enforced)

  *Winner of GA3 adversarial review (3B: 2 CRIT / 2 MED / 1 LOW = weighted 15 — ties 3A and 3C on weighted total but wins on mechanical-enforceability and precedent alignment with Phase 37 D-12 / Phase 38 D-06 doc-shape-lock pattern) over 3A (2 CRIT / 2 MED / 1 LOW = 15 — F-3A-01 broken sed/awk shell pipeline; F-3A-02 arbitrary 800 word ceiling), 3C (2 CRIT / 2 MED / 1 LOW = 15 — F-3C-01 inherits 3A + 3B flaws; F-3C-02 raising to 1000 words contradicts PITFALL 12 "≤2 pages"), and 3D (3 CRIT / 2 MED / 1 LOW = 20 — F-3D-01 sibling-drift coupling; F-3D-02 Windows shell brokenness; F-3D-03 no structural guard).*

- **D-12:** **Deferred Content H2 name without version suffix.** "## Deferred Content" (NOT "## Deferred Content (v1.4.1)"). The V1.4.1 target is documented inside the H2's deferred-content TABLE (per row), not in the H2 name. This avoids self-staling when v1.4.1 ships. The corresponding anchor is `#deferred-content` (clean URL-safe, no version-specific collision). Closes F-3B-02 CRIT.

- **D-13:** **Wi-Fi credential embedding explicit content requirement inside `## Enrollment Constraints`.** The H2 body MUST include:
  - QR-only statement with inline version tag per PITFALL 1
  - One-device-at-a-time statement with inline version tag
  - Wi-Fi credential embedding requirement (RealWear-specific): **explicit prose** stating that the QR enrollment payload must include Wi-Fi credentials for RealWear devices because they cannot join networks interactively during enrollment. Cross-link to `#realwear-confirmed-ga` for RealWear device-model specifics.

  The H2 whitelist (D-11) cannot enforce this content mechanically; it is captured here in CONTEXT.md as explicit content-level planning requirement for the executor. Plan-phase planner MUST surface this requirement in `39-02-PLAN.md` task specs. Closes F-3B-01 CRIT structurally by moving enforcement from audit-regex to plan-task-specs.

- **D-14:** **Intune Plan 2 / Suite research-flag re-verification protocol.** Per STATE.md and SUMMARY.md line 254, Intune Plan 2 / Suite licensing requirement for AOSP enrollment per OEM type is unverified at research time. Plan-phase researcher MUST re-verify at plan time. If verified HIGH against Microsoft Learn, populate `## Prerequisites and Licensing` H2 with authoritative statement. If unverified at plan time, H2 body carries the assertion with `[MEDIUM: research-inference, last_verified YYYY-MM-DD]` marker per D-20. If research time reveals the licensing is PER-OEM (not uniform), the H2 body documents per-OEM licensing (RealWear verified; others per-OEM TBD). Closes F-3B-06 LOW.

### Phase 39 PLAN Structure (execution parallelism) — GA4 winner: 4B

- **D-15:** **Two plans, parallelizable within Phase 39.**

  - `39-01-PLAN.md` — ZTE extension to `docs/admin-setup-android/02-zero-touch-portal.md`. Scope: the `## Corporate-Scale Operations` H2 block per D-01 + supporting changes per D-02..D-06. Requirement map: AEZTE-01. Waves: W0 anchor-stability verify (Phase 35 anchors still present in shipped file) + W1 author appended H2 block + W2 audit (AEZTE-01 SC coverage + anchor stability + source-confidence marker regex).
  - `39-02-PLAN.md` — new `docs/admin-setup-android/06-aosp-stub.md`. Scope: full stub authoring per D-07..D-14 + frontmatter per D-16 + Platform note per D-21. Requirement map: AEAOSP-01. Waves: W0 research-flag re-verification (AOSP supported-devices page; Intune Plan 2/Suite licensing) + W1 author stub + W2 audit (AEAOSP-01 SC coverage + H2 whitelist mechanical check + deferred-content table presence).

  Both plans parallelizable per ROADMAP "Runs in parallel with Phases 36-38 (independent after Phase 35)" and STATE.md v1.4 decision "Phase 39 combines ZTE admin + AOSP stub because both are independent of COBO/BYOD/Dedicated after Phase 35 and both have low plan-count surface (1 major doc each). Parallelizable during execution."

  Plan numbering is chronological (39-01 / 39-02), NOT ordering — both plans ready for W0 at phase start. Matches Phase 37 precedent (37-01 / 37-02 with independent W0 verifications).

  *Winner of GA4 adversarial review (4B: 0 CRIT / 2 MED / 2 LOW = weighted 6 after F-4B-02 Referee ruling) over 4A (1 CRIT / 3 MED / 1 LOW = 12 — F-4A-01 Phase 37 precedent violation; F-4A-04 loses parallelism), 4C (1 CRIT / 2 MED / 2 LOW = 11 — F-4C-01 ROADMAP parallelism clause + STATE.md decision contradicted), and 4D (1 CRIT / 3 MED / 1 LOW = 12 — F-4D-01 Phase 37 precedent departure without commensurate benefit; F-4D-02 novel W1a/W1b wave-lettering).*

### Cross-cutting decisions to close confirmed gaps

- **D-16:** **Frontmatter schema.** Single-string `applies_to` convention per Phase 36 D-13 / Phase 37 D-15 / Phase 38 D-18 precedent.
  - ZTE extension sections inherit Phase 35's existing frontmatter (no frontmatter change in 39-01): `platform: Android`, `audience: admin`, `applies_to: ZTE`, `last_verified: 2026-04-23`, `review_by: 2026-06-22` (Phase 39 updates last_verified and review_by upon append).
  - AOSP stub (39-02 new file): `platform: Android`, `audience: admin`, `applies_to: AOSP`, `last_verified: YYYY-MM-DD` (execute-time date), `review_by: YYYY-MM-DD` (60-day window from last_verified).

- **D-17:** **Anchor stability contract for Phase 40/41/42 consumers.** Phase 39 MUST publish these stable HTML-id anchors via `<a id="...">` scaffolding (Phase 35/36/37/38 precedent):
  - `#reseller-upload-handoff` (D-01; Phase 40 L1 runbook 27 may route reseller-vs-Intune-side failures here)
  - `#device-claim-workflow` (D-01; primary Phase 40 runbook 27 target; Phase 41 L2 investigation reference)
  - `#profile-assignment` (D-01; Phase 40 routing for configuration-not-applied failures)
  - `#dual-sim-imei-1` (D-01; Phase 40 runbook 27 dual-SIM troubleshooting reference)
  - `#kme-zt-device-claim` (D-06; Phase 40 Samsung-specific routing)
  - `#configuration-must-be-assigned` (D-03; Phase 40 routing for consumer-setup-fallthrough failures)
  - `#realwear-confirmed-ga` (D-07; AOSP audit reference)
  - `#other-aosp-supported-oems` (D-07; AOSP audit reference)
  - `#deferred-content` (D-12; v1.4.1 planning reference)

  Renaming any of these anchors breaks Phase 40/41/42 cross-references — treat as a stability contract. AEAUDIT-04 (Phase 42) audit includes anchor-presence check for this set.

- **D-18:** **Shared-file modification guard** (Phase 36 D-14 / Phase 37 D-16 / Phase 38 D-17 precedent). Phase 39 MUST NOT modify: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, `docs/_glossary-android.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/l1-runbooks/`, `docs/l2-runbooks/`, `docs/end-user-guides/`, any file under `docs/admin-setup-android/` except `02-zero-touch-portal.md` (Phase 35's shipped file, appended via D-01) and new `06-aosp-stub.md`, any file under `docs/android-lifecycle/`, any file under `docs/_templates/`.

  PITFALL 9 / PITFALL 11 / AEAUDIT-04 enforcement.

- **D-19:** **Phase 39 plans use 3-wave structure** matching Phase 36/37/38 precedent:
  - **W0**: anchor-stability re-verify (for 39-01 — Phase 35 ZT portal anchors still present; for 39-02 — no 06-aosp-stub.md exists yet, so W0 is research-flag re-verification instead of anchor-verify). Closes F-4A-05 LOW concern via per-plan semantically-appropriate W0.
  - **W1**: author. For 39-01, author appended H2 block per D-01. For 39-02, author new stub per D-07..D-14.
  - **W2**: audit. Per-plan, not merged (39-01 audits AEZTE-01 SC coverage; 39-02 audits AEAOSP-01 SC coverage + H2 whitelist mechanical check). Closes F-4A-03 audit-responsibility-mixing concern via per-plan W2.

- **D-20:** **Source-confidence marker regex** matches Phase 37 D-11 verbatim: `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`. Markers applied to:
  - **Dual-SIM IMEI 1 registration** (D-05) — MEDIUM: Google Developers Zero-touch known issues
  - **Device-claim workflow portal-UI specifics that survive decision-points discipline** (D-04) — MEDIUM: at executor's discretion where re-sourced against current Google docs
  - **AOSP OEM matrix source** (D-07) — HIGH: MS Learn aosp-supported-devices, with last_verified
  - **Intune Plan 2 / Suite licensing assertion** (D-14) — MEDIUM if research-inference only; HIGH if verified against Microsoft Learn at plan time
  - **Enrollment token 90-day expiry language** (if referenced in ZTE extension sections) — MEDIUM per STATE.md research flag

- **D-21:** **ARCH Q6 Platform note banner mandatory for AOSP stub.** Per Phase 38 D-10 precedent. Top of `06-aosp-stub.md` (after Platform gate blockquote, before Key Concepts or Scope and Status): `> **Platform note:** AOSP (Android Open Source Project) management in Intune is a distinct enrollment surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE). AOSP devices have no Google Mobile Services (GMS), no FCM push, and no Managed Google Play — this is structurally distinct from iOS User Enrollment (which has user identity) and macOS Automated Device Enrollment (which has Apple ID). For cross-platform comparison, see [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).`

  ZTE extension (39-01) inherits Phase 35's existing framing (no new banner; Phase 35 owns doc-level framing).

- **D-22:** **Research-flag verification protocol** (Phase 36 D-15/D-16 / Phase 37 D-12 / Phase 38 D-16 precedent reapplied). Plan-phase researcher MUST run plan-time verification for:
  1. Zero-Touch portal UI current navigation — verify against `enterprise.google.com/android/zero-touch/customers` current layout before writing device-claim-workflow decision points
  2. AOSP supported-devices page current OEM list — verify against `learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices` and update D-09 enumeration accordingly if OEMs have changed since 2025-05-12 snapshot
  3. Intune Plan 2 / Suite licensing for AOSP per OEM — verify against current Microsoft Learn licensing guidance; per-OEM variation surface
  4. Reseller-upload handoff — verify Google reseller-guide currency at `support.google.com/work/android/answer/9040598`
  5. Dual-SIM IMEI 1 MEDIUM-confidence claim — verify against current Google Developers Zero-touch known issues page
  6. Enrollment token expiry behavior — verify if referenced in Phase 39 sections (Phase 35's existing `## Renewal / Maintenance` already carries this; Phase 39 cross-links, not restates)

  Findings recorded in phase RESEARCH.md. Executor re-verifies portal-UI-specific assertions at execute time. Any unverifiable MEDIUM-confidence assertion carries D-20 marker.

- **D-23:** **Executor parallelization discipline.** Per D-15, 39-01 and 39-02 are parallelizable with no dependencies between them. Executor MAY run both plans in parallel (subject to gsd-execute-phase wave-parallelization config). If serial execution is chosen (e.g., single-executor context), order is irrelevant (neither blocks the other); 39-01 / 39-02 numbering implies chronological not ordering.

### Claude's Discretion

- **Exact word counts** within approximate envelope (600-900 words for AOSP stub per PITFALL 12 "≤2 pages"; appended `## Corporate-Scale Operations` H2 block roughly 600-800 words per H3 across the 6 sub-sections).
- **Exact prose for PITFALL-7-mandated "not supported under AOSP" framing** (D-10) — core assertion locked; prose phrasing is author's choice.
- **Whether to include a small mermaid diagram** in the ZTE extension (e.g., Reseller → Upload → Customer Claim → Configuration Assign → Device First-Boot) — not required; author's call.
- **Deferred-content table column design** (D-12 H2 name is locked; table columns inside are author's call — suggested: "Topic / Current state in v1.4 / Target milestone / Reason for deferral" is a natural 4-column shape but 3-column "Topic / Target / Rationale" also works).
- **Cross-platform callout presence** for non-RealWear OEMs in D-07 other-OEMs H3 (the PITFALL 7 framing is mandatory; additional per-OEM cross-platform notes are author's discretion).
- **See Also section composition** — cross-link targets within the Phase 39 scope (Phase 34 `_glossary-android.md`, Phase 34 `02-provisioning-methods.md`, Phase 35 `01-managed-google-play.md` and `02-zero-touch-portal.md`) are natural; additional links are author's call.
- **Exact wording of the cross-link from `### Configuration Must Be Assigned` back to Phase 35's `#dpc-extras-json`** (D-03) — cross-link IS mandatory; phrasing is author's.
- **Whether the `## Verification` Phase 35 section gets a new `- [ ]` checkbox for device-claim testing or just a prose update** (D-01) — currently specified as append-only; executor selects the minimal-disruption update.

### Folded Todos

None — `gsd-tools todo match-phase 39` returned zero matches.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap

- `.planning/REQUIREMENTS.md` — AEZTE-01 (Phase 39 ZTE extension scope); AEAOSP-01 (AOSP stub scope with SC3 "OEM matrix from MS Learn with RealWear confirmed GA" + SC4 word-count/section-count scope guard); future requirements (AEKNOX, AEAOSPFULL, AECOPE, AENAVUNIFY, AECOMPARE)
- `.planning/ROADMAP.md` — Phase 39 entry lines 162-173 (goal, depends on Phase 35, "Runs in parallel with Phases 36-38 (independent after Phase 35)", SC1-5); Phase 40 entry (ZTE L1 runbook 27 placement); Phase 42 entry (AEAUDIT-04)
- `.planning/PROJECT.md` — v1.4 scope, tri-portal admin template decision (applies to Phase 35-shipped file that Phase 39 extends), deferred items (Knox ME / AOSP full / nav-unification / 4-platform comparison)
- `.planning/STATE.md` — Phase 35/39 research flags (ZT portal UI current nav; enrollment token 90-day expiry MEDIUM); Phase 40 AOSP supported-devices research flag; v1.4 decisions including "ZTE L1 runbook 27 lands in Phase 40" and "Phase 39 combines ZTE admin + AOSP stub — Parallelizable during execution"

### v1.4 Android Enterprise Research (all 2026-04-19)

- `.planning/research/FEATURES.md` — ZTE table-stakes, AOSP specialty-hardware context, RealWear GA status
- `.planning/research/ARCHITECTURE.md` — tri-portal template H4 structure (ZT portal H4 subsection in Phase 35 doc; AOSP uses subtractive deletion per Phase 34 D-17), prerequisite DAG, Anti-Pattern 1 (canonical matrix single-source discipline — AOSP OEM matrix is the canonical AOSP source per D-07)
- `.planning/research/PITFALLS.md` — PITFALL 4 (ZT reseller upfront, dual-SIM IMEI 1, KME exclusion), PITFALL 7 (AOSP non-RealWear "not supported under AOSP" framing mandate), PITFALL 9 (append-only; no v1.0-v1.3 shared file mods), PITFALL 11 (shared-file modification guard), PITFALL 12 (AOSP scope creep; hard audit; stub size bounded)
- `.planning/research/SUMMARY.md` — Phase 39 section lines 230-241 (ZTE admin rationale, reseller-side vs Intune-side failure distinction), Phase 40 section lines 245-254 (AOSP stub rationale, scope-guard audit), research flags and confidence assessment for both Phase 39 and Phase 40 content
- `.planning/research/STACK.md` — AOSP section 3.5 lines 116-145 (OEM matrix as of 2025-05-12; 8 OEMs; RealWear/Zebra/Pico/HTC/Meta/DigiLens/Lenovo/Vuzix; AOSP-specific endpoint `intunecdnpeasd.manage.microsoft.com`); ZTE reseller ecosystem section 7 lines 249-272 (dual-SIM IMEI 1 registration; corporate Google account; reseller directory); SPARSE DOC FLAG line 275-277 (Google-canonical source for reseller-side steps)

### Phase 34/35/36/37/38 Foundations (all locked — feed Phase 39)

- `.planning/phases/34-android-foundation/34-CONTEXT.md` — tri-portal template + HTML-comment subtractive-deletion pattern (D-17); tri-portal shorthand; mode labels; AEAUDIT-04 guards; 60-day review cycle; cross-platform callout pattern (D-10)
- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-CONTEXT.md` — D-19 Step 0 dual-placement; D-20 DPC extras JSON skeleton; D-21 KME/ZT Samsung top-and-inline placement; **D-22 Phase 35 / Phase 39 ZT portal split contract** (Phase 39 appends: reseller-upload handoff, device-claim workflow, profile assignment at scale, dual-SIM IMEI 1, full KME/ZT callout at device-claim, configuration-must-be-assigned gotcha); **D-23 anchor-namespace reservation** (Phase 39 appends `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff` as primary; sub-anchors under these are authorized per D-22 content inventory)
- `.planning/phases/36-fully-managed-cobo-admin/36-CONTEXT.md` — hybrid cross-reference pattern (D-01; applied in D-01/D-03 of Phase 39 ZTE extension); anchor-stability contract precedent (D-10); 3-wave plan structure (W0/W1/W2); research-flag verification protocol (D-15/D-16); shared-file modification guard (D-14)
- `.planning/phases/37-byod-work-profile-admin-end-user/37-CONTEXT.md` — D-10/D-11 source-confidence marker pattern with regex (Phase 39 D-20 inherits); D-12 doc-shape lock precedent (Phase 39 D-11 inherits for AOSP stub H2 whitelist); D-15 single-string applies_to frontmatter convention; D-16 shared-file modification guard; two-plan precedent (37-01 + 37-02 parallelizable per doc)
- `.planning/phases/38-dedicated-devices-admin/38-CONTEXT.md` — D-10 ARCH Q6 Platform note banner pattern (Phase 39 D-21 inherits for AOSP stub); D-12 source-confidence marker scope; D-15 Phase 39 ZT extension boundary acknowledgment; D-16 research-flag verification protocol; D-17 shared-file modification guard

### Phase 35 Shipped File (Phase 39's extension target)

- `docs/admin-setup-android/02-zero-touch-portal.md` (Phase 35 deliverable — Phase 39 appends) — existing H2 order: Prerequisites / Step 0 / Create ZT Account / Link ZT to Intune (Methods A/B) / DPC Extras JSON / KME/ZT Mutual Exclusion (Samsung) / Verification / Renewal / See Also / Changelog. Phase 35 reserved anchors: `#prerequisites`, `#step-0-reseller`, `#create-zt-account`, `#dpc-extras-json`, `#link-zt-to-intune`, `#kme-zt-mutual-exclusion`, `#renewal-maintenance`. Existing `<!-- verify UI at execute time -->` HTML-comment pattern (lines 48, 50, 72, 73) — Phase 39 inherits.
- `docs/_glossary-android.md` (Phase 34 deliverable) — term anchors for cross-reference: `#zero-touch-enrollment`, `#aosp`, `#dpc`, `#mgp`, `#fully-managed`
- `docs/_templates/admin-template-android.md` (Phase 34 deliverable) — structural template for AOSP stub (39-02); HTML-comment subtractive-deletion pattern applies (AOSP omits both MGP and ZT portal H4 sub-sections)
- `docs/android-lifecycle/00-enrollment-overview.md` (Phase 34 deliverable) — cross-reference target for AOSP Platform note per D-21 (`#aosp` anchor)
- `docs/android-lifecycle/01-android-prerequisites.md` (Phase 35 deliverable) — cross-reference target for AOSP GMS-vs-AOSP split
- `docs/android-lifecycle/02-provisioning-methods.md` (Phase 34 deliverable) — AOSP row in provisioning-methods matrix (defers OEM detail to Phase 39); cross-reference for Phase 39 AOSP stub when discussing QR-only enrollment
- `docs/android-lifecycle/03-android-version-matrix.md` (Phase 34 deliverable) — Android version breakpoints (not directly Phase 39 scope but cross-reference target for any version-tagged assertion in Phase 39)

### Phase 36/37/38 Shipped Files (peer precedent for structural patterns)

- `docs/admin-setup-android/03-fully-managed-cobo.md` (Phase 36 deliverable) — structural pattern for admin-guide H2 organization
- `docs/admin-setup-android/04-byod-work-profile.md` (Phase 37 deliverable) — D-10/D-11 source-confidence marker examples (Phase 39 D-20 inherits the regex)
- `docs/admin-setup-android/05-dedicated-devices.md` (Phase 38 deliverable) — D-10 ARCH Q6 Platform note banner example (Phase 39 D-21 inherits for AOSP stub)

### v1.3 Structural Precedents (for AOSP stub shape)

- `docs/admin-setup-ios/00-overview.md` — mermaid + prerequisites-split pattern (not directly applicable to AOSP stub but cross-platform reference for admin-guide shape)
- `docs/admin-setup-macos/01-abm-configuration.md` — admin-guide structural template (H2 sequence + what-breaks callouts + See Also)

### Cross-Platform Navigation (for awareness only — NOT modified in Phase 39)

- `docs/index.md` — navigation hub (Android stub integration is Phase 42 AEAUDIT-02 scope)
- `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — cross-platform routing (Android integration deferred post-v1.4 per PROJECT.md)
- `docs/_glossary-macos.md` — see-also cross-reference back to `_glossary-android.md` is Phase 42 AEAUDIT-03 scope

### Adversarial Review Artifact (this phase's audit trail)

- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-DISCUSSION-LOG.md` — full adversarial-review audit trail (finder → adversary → referee verdicts; 80 flaws scored; 7 disputed; all 7 ruled FALSE POSITIVE)
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-CANDIDATES.md` — brief used by adversarial-review agents

### External Canonical Sources (executor verifies at plan/execute time)

- `https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices` — MS Learn AOSP supported-devices page (HIGH confidence; currently stale ~12 months — re-verify at plan time per D-22)
- `https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-zero-touch` — MS Learn ZTE configuration page (re-verify portal navigation at plan time per D-22)
- `https://enterprise.google.com/android/zero-touch/customers` — Google ZT customer portal (live UI; portal has history of redesigns)
- `https://support.google.com/work/android/topic/9158960` — Google ZT customer-portal help (canonical device-claim workflow reference)
- `https://support.google.com/work/android/answer/9040598` — Google ZT reseller-guide (canonical reseller-upload handoff reference)
- `https://developers.google.com/zero-touch/known-issues` — Google Developers Zero-touch known issues (dual-SIM IMEI 1, KME mutual exclusion sources)
- `https://androidenterprisepartners.withgoogle.com/resellers/` — Android Enterprise Business Device Solutions Directory — Resellers

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phases 34-38 + v1.0-v1.3)

- **Admin template** (`docs/_templates/admin-template-android.md`, Phase 34) — drives AOSP stub (39-02). AOSP stub OMITS both MGP H4 and ZT portal H4 sub-sections via Phase 34 D-17 HTML-comment subtractive-deletion pattern (AOSP uses neither portal).
- **Android glossary** (`docs/_glossary-android.md`, Phase 34) — term anchors for `#zero-touch-enrollment`, `#aosp`, `#dpc`, `#mgp`, `#fully-managed` cross-references in Phase 39 prose.
- **Enrollment overview** (`docs/android-lifecycle/00-enrollment-overview.md`, Phase 34) — cross-reference target for `#aosp` in Platform note banner (D-21); `#fully-managed` reference for PITFALL 7 "use fully managed instead" framing (D-10).
- **Version matrix** (`docs/android-lifecycle/03-android-version-matrix.md`, Phase 34) — inline version-tag source per PITFALL 1 discipline for any Android-version-specific assertion in Phase 39.
- **Provisioning-method matrix** (`docs/android-lifecycle/02-provisioning-methods.md`, Phase 34) — single-source for method support; AOSP stub cross-references for "QR-only" assertion (not a duplication since Phase 34 row for AOSP defers to Phase 39 for OEM detail — Phase 39 AOSP stub IS the canonical AOSP detail per Anti-Pattern 1 analysis in F-2A-03 Referee ruling).
- **Phase 35 shipped ZT portal doc** (`docs/admin-setup-android/02-zero-touch-portal.md`) — Phase 39 appends `## Corporate-Scale Operations` H2 block; inherits existing `<!-- verify UI at execute time -->` HTML-comment pattern.
- **Frontmatter schema** — `last_verified`, `review_by`, `platform`, `audience`, `applies_to` — established across 120+ docs. Phase 39 ZT extension inherits Phase 35's frontmatter (updates `last_verified` and `review_by`); Phase 39 AOSP stub initializes fresh with `applies_to: AOSP`.
- **"What breaks if misconfigured" callout convention** — from `admin-template-android.md` (Phase 34 D-19 inherited from macOS/iOS templates). Phase 39 uses this pattern in `### Configuration Must Be Assigned` H3, `### KME/ZT Mutual Exclusion — At Device Claim` H3, and the AOSP stub `## Enrollment Constraints` H2.
- **Platform gate blockquote pattern** — standard opening. AOSP stub uses `> **Platform gate:** This guide covers AOSP (Android Open Source Project) device management in Intune — specialty AR/VR and wearable-scanner hardware with no Google Mobile Services. For other Android Enterprise modes (COBO/BYOD/Dedicated/ZTE), see [Android Admin Setup Overview](00-overview.md).`
- **HTML-comment subtractive-deletion pattern** — `<!-- The #### In Managed Google Play subsection is intentionally omitted. AOSP does not use MGP. -->` and same for ZT portal sub-section in AOSP stub.
- **HTML-comment verify-UI-at-execute-time pattern** — `<!-- verify UI at execute time -->` already in shipped `02-zero-touch-portal.md` (lines 48, 50, 72, 73); Phase 39's appended `## Corporate-Scale Operations` block uses same pattern for device-claim workflow portal-UI specifics per D-04.
- **Source-confidence marker regex** — Phase 37 D-11 pattern `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` inherited via D-20. Phase 39 applies to dual-SIM (MED), device-claim UI specifics (MED at executor discretion), AOSP OEM matrix source (HIGH), Intune Plan 2 licensing (MED or HIGH per D-14 plan-time verification).
- **ARCH Q6 Platform note banner pattern** — Phase 38 D-10 inherited via D-21 for AOSP stub (ZT extension does not get a new banner; Phase 35's existing doc framing owns doc-level banners).
- **Cross-platform callout pattern** (Phase 34 D-10 / inherited from Phase 35 D-25) — Phase 39 AOSP stub uses on first appearance of AOSP, Zero-Touch Enrollment, and DPC terms, cross-linking `_glossary-android.md` and sibling-platform glossaries.

### Established Patterns

- **60-day review cycle** — ZT portal UI and AOSP OEM matrix are both HIGH-drift research flags; 60-day is correct window (not 90-day). Phase 39 frontmatter inherits.
- **Source-hierarchy confidence attribution** — HIGH: Google Android Enterprise Help, Google Developers Zero-touch docs, Microsoft Learn AOSP supported-devices page. MEDIUM: Microsoft Learn coverage of Google-canonical topics. MEDIUM: community (Bayton, jasonbayton.com), Android Enterprise Business Device Solutions Directory. LOW: community blogs not cross-referenced.
- **Anti-Pattern 1 guard** — matrices live in single canonical reference docs. Phase 39 AOSP OEM matrix is the canonical AOSP OEM artifact (no upstream canonical in Phase 34; Phase 34 `02-provisioning-methods.md` defers AOSP detail to Phase 39).
- **PITFALL 2 what-breaks pattern** — Phase 39 inline what-breaks callouts at point of admin decision for: (a) ZT extension `### Configuration Must Be Assigned` (D-03 cross-link handles the point-of-admin-decision discipline); (b) AOSP `## Enrollment Constraints` H2 for QR-only / one-device-at-a-time / Wi-Fi credential embedding.
- **PITFALL 4 Step 0 discipline** — Phase 35 already owns. Phase 39 does not restate; cross-references Phase 35 where ZT extension sections refer to reseller relationships.
- **PITFALL 7 AOSP "not supported under AOSP" framing** — mandatory in D-07 / D-10.
- **PITFALL 12 AOSP scope-guard discipline** — H2 whitelist per D-11; no L1/L2 runbooks for AOSP in v1.4 per ROADMAP Phase 39 SC5.
- **SC5 inline-at-decision callout guard** — PITFALL 2 discipline applied to D-03 cross-link pattern for Configuration Must Be Assigned.

### Integration Points

- `docs/admin-setup-android/` — Phase 39 adds `06-aosp-stub.md` (39-02 new file) and appends to Phase 35's `02-zero-touch-portal.md` (39-01). File numbering 06 preserves non-contiguous convention (Phase 35 owns 00/01/02; Phase 36 owns 03; Phase 37 owns 04; Phase 38 owns 05; Phase 39 owns 06).
- **Anchor stability contract with Phase 40-42** — the 9 anchors listed in D-17 are consumed by Phase 40 (L1 runbook 27), Phase 41 (L2 investigation), and Phase 42 (AEAUDIT-04 mechanical audit). Renaming or removing these anchors breaks cross-references — treat as a stability contract.
- **Phase 35 append boundary** — Phase 39 appends a single H2 block to Phase 35's `02-zero-touch-portal.md` at position 7 (after KME/ZT, before Verification); Phase 35 owns everything else in the file. `## Verification` H2 placeholder line 135 is the only Phase-35-content Phase 39 touches, and only because the placeholder explicitly invited the update.
- **Phase 34 admin-template structural template** — 39-02 AOSP stub is authored from `docs/_templates/admin-template-android.md` with MGP H4 and ZT portal H4 sub-sections subtracted via HTML-comment pattern.
- **Phase 40 consumer-dependency** — Phase 40's L1 runbook 27 "Zero-Touch enrollment failed" routes through `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#configuration-must-be-assigned`, and `#kme-zt-device-claim` anchors (D-17). AOSP has no Phase 40 consumer (no AOSP L1 in v1.4 by explicit scope).
- **Phase 42 AEAUDIT-04 consumer-dependency** — audit greps for (a) `#` anchors in D-17 anchor-stability list; (b) H2 whitelist per D-11 for AOSP stub; (c) no "supervision" / no "SafetyNet" / Play Integrity only; (d) `last_verified` frontmatter present on both Phase 39 deliverables; (e) no Android links in v1.0-v1.3 shared files.

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence

- **Appended-H2 block discipline for ZTE extension** (D-01 winner 1A): the appended `## Corporate-Scale Operations` H2 sits in isolation at position 7 — preserves Phase 35's locked H2 order from position 1 through 6 and position 8 onward. Phase 35 D-22 append-contract treated as strict.
- **Decision-points-as-prose for device-claim workflow** (D-04): STACK.md SPARSE DOC FLAG at line 275-277 is the governing discipline. "Admin chooses which devices to claim → admin selects configuration → admin assigns to device group → devices available for first-boot" is the decision narrative; specific portal click-paths are either cross-linked to Google's help or marked `<!-- verify UI at execute time -->` with cautious phrasing.
- **RealWear-spotlight for AOSP** (D-07 winner 2B): RealWear confirmed GA carries full device-model detail (HMT-1, HMT-1Z1, Navigator 500), AR/VR headset usage context, and Wi-Fi credential embedding requirement. Non-RealWear OEMs enumerated completely (all 8 per D-09) but not individually described — PITFALL-7-mandated framing routes admins to Android Enterprise fully managed instead.
- **H2 whitelist for AOSP scope-guard** (D-11 winner 3B): the 9 H2 names are locked. AEAUDIT-04 Phase 42 mechanical check greps H2 headings against the whitelist and flags deviations. Content-level enforcement (Wi-Fi credential embedding inside Enrollment Constraints per D-13) is plan-task-specs responsibility, not audit-regex responsibility.
- **Two-plan split for Phase 39** (D-15 winner 4B): 39-01 covers ZT portal extension; 39-02 covers AOSP stub. Parallelizable per Phase 37 precedent and STATE.md explicit decision. Per-plan W2 audit isolates AEZTE-01 vs AEAOSP-01 SC coverage.

### Cross-Platform Callout Pattern (inherited from Phase 34)

Each Phase 39 doc that references an Android-specific term with a sibling-platform equivalent uses:

```markdown
[Android-native term description.]

> **Cross-platform note:** On [Apple/Windows platform], "[term]" refers to [different concept]. See [sibling glossary link]. Do not conflate.
```

Phase 39 applies to: Zero-Touch Enrollment (contrast with Apple ADE — explicit analog note), AOSP (no Apple/Windows equivalent — note absent or only glossary-link note), DPC (no iOS/macOS analog), Android Enterprise fully managed (mentioned in PITFALL-7 framing; cross-link to `_glossary-android.md#fully-managed`).

### What-Breaks Callout Patterns Inherited

For ZTE extension (39-01):

```markdown
> **What breaks if misconfigured:** [Failure mode description]. Symptom appears in: [ZT portal / Intune admin center / device first-boot]. Recovery: [remediation steps]. `[MEDIUM: source, last_verified YYYY-MM-DD]` (if MEDIUM-confidence).
```

For AOSP stub (39-02), callouts live inside `## Enrollment Constraints`:
- QR-only: what breaks if admin attempts NFC/Zero-Touch/DPC identifier enrollment → enrollment fails silently or falls through to consumer setup
- One-device-at-a-time: what breaks if admin attempts bulk enrollment → only first device enrolls; subsequent devices need separate sessions
- Wi-Fi credential embedding (RealWear): what breaks if Wi-Fi credentials NOT in QR payload → device cannot connect to enrollment server after first boot

### Deferred-Content Table Suggested Shape (D-12 lock: H2 name without version suffix)

```markdown
## Deferred Content

The following AOSP content is tracked for v1.4.1 and out of scope for v1.4:

| Topic | Current state in v1.4 | Target | Rationale |
|---|---|---|---|
| Per-OEM enrollment steps (non-RealWear) | Stub lists OEMs; defers mechanics | v1.4.1 | Sparse public docs per OEM; speculative content risks immediate staleness |
| AOSP user-associated enrollment specifics | Mentioned as AOSP mode; no admin-guide depth | v1.4.1 | OEM matrix must firm up first |
| AOSP userless (shared-device) enrollment specifics | Mentioned as AOSP mode; no admin-guide depth | v1.4.1 | Same as user-associated |
| AOSP L1 triage runbook | No L1 runbook for AOSP in v1.4 | v1.4.1 | Specialty device class; volume-low; L2 routing is current approach |
| AOSP L2 investigation runbook | No L2 runbook for AOSP in v1.4 | v1.4.1 | Specialty device class; volume-low |
| AOSP OEM behavioral failure catalog | Not written; links to MS Learn / Google only | v1.4.1 | Depends on full OEM matrix firming |
| Knox Mobile Enrollment full admin path | Phase 39 D-06 cross-references KME/ZT mutual-exclusion only | v1.4.1 | Paid Knox license tier; Samsung-specific; velocity compression |
```

Table columns are D-12-flexible at Claude's Discretion; suggested 4-column is natural.

</specifics>

<deferred>
## Deferred Ideas

Ideas that surfaced during adversarial review or contextual analysis but belong in other phases, other milestones, or separate tracking:

- **Per-OEM (non-RealWear) AOSP enrollment steps** — deferred to v1.4.1 per PROJECT.md Key Decisions. Phase 39 AOSP stub lists OEMs per D-09, routes admins to Android Enterprise fully managed per D-10, and surfaces via Deferred Content H2 table.
- **AOSP user-associated vs userless enrollment full coverage** — deferred to v1.4.1 per PROJECT.md Key Decisions and REQUIREMENTS.md AEAOSPFULL-01/-02/-03/-04. Phase 39 stub does not differentiate user-associated from userless in detail.
- **Knox Mobile Enrollment full admin path** — deferred to v1.4.1 per PROJECT.md Key Decisions and REQUIREMENTS.md AEKNOX-01..AEKNOX-04. Phase 39 D-06 carries only the device-claim-step KME/ZT mutual-exclusion callout; Phase 35 D-21 carries the top-of-doc + link-to-Intune-step callouts; full KME coverage is v1.4.1.
- **COPE full admin path** — Phase 36 COBO migration-note scope (AECOBO-02); not Phase 39 scope.
- **Android 15 FRP re-provisioning content** — Phase 36 (COBO, AECOBO-03) and Phase 38 (Dedicated, AEDED-03) own. Phase 39 does not carry FRP content.
- **ZTE L1 triage runbook 27** — Phase 40 owns per STATE.md v1.4 decision. Phase 39 publishes the consumer-anchor contract (D-17) for Phase 40 to route through, but does not author the runbook.
- **Phase 40 Android mode-first triage decision tree** — Phase 40 scope. Phase 39 does not preempt the triage structure.
- **Phase 41 L2 log-collection and investigation runbooks** — Phase 41 scope. Phase 39 publishes anchor-stability contract for Phase 41 to reference.
- **Phase 42 Android capability matrix and milestone audit** — Phase 42 scope. Phase 39 outputs must pass AEAUDIT-04 per D-11 H2 whitelist; Phase 42 performs the mechanical audit.
- **Cross-platform navigation integration** (Android stub in `docs/index.md`, `common-issues.md`, quick-refs) — Phase 42 AEAUDIT-02 scope (docs/index.md Android stub) and post-v1.4 unification task for full nav integration. Phase 39 does NOT modify v1.0-v1.3 shared files.
- **Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference** — Phase 42 AEAUDIT-03 scope. Phase 39 does NOT modify `_glossary-macos.md`.
- **ZT portal migration for legacy consumer Gmail bindings** (post-August-2024 migration path) — Phase 35 D-14 defers to v1.4.1. Phase 39 does not expand this scope.
- **4-platform comparison document** — v1.5 per PROJECT.md Key Decisions. Phase 39 does not preempt.
- **AOSP OEM full behavioral matrix with per-OEM failure catalog** — v1.4.1 per REQUIREMENTS.md AEAOSPFULL-04 and research SUMMARY.md deferral rationale.
- **Samsung Knox Workspace, Samsung E-FOTA, Samsung DeX MDM** — v1.4 Out of Scope per PROJECT.md; Phase 39 does not reference beyond the KME/ZT mutual-exclusion cross-reference per D-06.
- **AOSP enrollment for mainstream Android phones/tablets** — not supported per STACK.md line 141 (AOSP supported list contains only AR/VR headsets and wearable scanners). Phase 39 AOSP stub states this explicitly in `## When to Use AOSP` H2 per D-11.

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 39` returned zero matches.

</deferred>

---

*Phase: 39-zero-touch-enrollment-aosp-stub*
*Context gathered: 2026-04-23*
*Method: adversarial-review skill (finder → adversary → referee) — 80 flaws evaluated, 73 confirmed real, 7 disputed, all 7 ruled FALSE POSITIVE on referee review. Per-gray-area winners selected on lowest-real-flaw basis (lowest CRIT first, then lowest weighted 5×CRIT + 2×MED + 1×LOW): 1A / 2B / 3B / 4B.*
