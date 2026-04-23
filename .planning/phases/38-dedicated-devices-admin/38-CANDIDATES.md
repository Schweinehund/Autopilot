# Phase 38: Dedicated Devices Admin — Candidate Options for Adversarial Review

**Purpose:** This file is the input artifact for the adversarial-review skill (finder/adversary/referee scored pattern). It captures 14 candidate options across 4 gray areas for Phase 38 design decisions. After review completes and CONTEXT.md is written, this file may be retained for audit (see Phase 36/37 precedent).

---

## Phase 38 Context Summary

**Phase 38 deliverable:** ONE admin guide — `docs/admin-setup-android/05-dedicated-devices.md` — Android Enterprise Dedicated (kiosk/COSU) device admin setup. Builds on Phase 35 (MGP binding) and Phase 36 (COBO enrollment profile mechanics).

**Requirements (verbatim from `.planning/REQUIREMENTS.md` lines 49-51):**
- **AEDED-01**: Intune admin can provision a Dedicated (kiosk/COSU) device (`docs/admin-setup-android/05-dedicated-devices.md`) with persona callout (Intune Admin + LOB Operations Owner), scenario overview (single-app / multi-app / digital signage / Entra shared device mode), enrollment profile, and MHS exit-PIN sync requirement documented
- **AEDED-02**: Intune admin can read a Managed Home Screen exit-PIN synchronization callout explaining that exit-kiosk PIN must match between device restrictions profile and Managed Home Screen app config or the user will hit a visible error
- **AEDED-03**: Intune admin can read an Android 15 FRP callout in the Dedicated guide describing FRP behavior during factory-reset re-provisioning

**Success Criteria** (verbatim from `.planning/ROADMAP.md` Phase 38 lines 160-165):
1. Persona callout (both stakeholders) + scenario overview table + enrollment profile for chosen scenario
2. MHS exit-PIN must be **configured identically in both** device restrictions profile AND MHS app configuration (mismatch = visible error at exit-kiosk attempt — top repeated-escalation pattern for dedicated)
3. Android 15 FRP callout for factory-reset re-provisioning (distinct from COBO because dedicated devices are typically re-provisioned, not re-enrolled)
4. Provisioning-method section references centralized `02-provisioning-methods.md` matrix (filtered row for dedicated mode); does NOT duplicate the 5x4 grid
5. Entra shared device mode guidance distinguishes genuinely-shared devices (Entra identity) from multi-app kiosks (single device account)

**LOCKED carrying forward (DO NOT CHALLENGE — these are inherited from Phases 34/35/36/37):**
- Tri-portal admin template (Phase 34 D-16..D-22) — Dedicated retains all three H4s (Intune + MGP + ZT, since Dedicated supports ZTE provisioning per provisioning-method matrix)
- Anti-Pattern 1 guard (Phase 34 D-26) — matrices live in `docs/android-lifecycle/02-provisioning-methods.md` and `03-android-version-matrix.md`; cross-link via filtered-row pattern, NEVER duplicate
- PITFALL 1 version-tag discipline / PITFALL 2 what-breaks callouts / PITFALL 3 no "supervision" / PITFALL 9-11 no shared file mods
- Phase 36 D-10 anchor stability — Phase 38 cross-references Phase 36 anchors `#enrollment-profile`, `#provisioning-method-choice`, `#android-15-frp`, `#configure-efrp`
- Phase 36 D-05 FRP/EFRP precedent — Phase 38 carries PARALLEL-BUT-DISTINCT FRP callout for re-provisioning; Phase 38 does NOT pre-empt Phase 36 EFRP-config content
- Phase 35 D-23 anchor `#kme-zt-mutual-exclusion` for ZT Samsung note in ZT provisioning callout
- Phase 37 D-10/D-11 inline source-confidence markers `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` matching regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` — applies to MHS exit-PIN MEDIUM-confidence claim
- AEAUDIT-04 guards: no SafetyNet, no "supervision" as Android management term, `last_verified` frontmatter mandatory, no Android links in v1.0-v1.3 shared files
- 60-day review cycle frontmatter (`last_verified` + `review_by`)
- Frontmatter: `platform: Android`, `audience: admin`, `applies_to: Dedicated`

**Research flags to verify at plan/execute time (from `.planning/STATE.md` lines 89-90):**
- MHS exit-PIN failure pattern: MEDIUM confidence (community-confirmed via Bayton + community reports; not in current MS Learn as authoritative) — must use Phase 37 D-10 source-confidence label
- Dedicated device default token expiry: verify what Intune sets by default when no expiry specified (FEATURES.md line 263 hints at token rotation needs for printed QR codes)
- Dedicated FRP behavior: FEATURES.md line 261 states "Dedicated devices do NOT have FRP for Settings > Factory data reset; FRP applies only via recovery/bootloader reset; Intune wipe bypasses FRP" — materially DIFFERENT from COBO

**Key research sources (from `.planning/research/`):**
- `FEATURES.md` lines 216-266 — Mode 4 Dedicated full coverage including all 4 scenarios, MHS exit-PIN failure mode, FRP nuance
- `PITFALLS.md` Pitfall 7 (lines 183-205) — Dedicated audience mismatch: persona callout + scenario overview MANDATORY before Intune steps; LOB Operations Owner is the second persona; do NOT write standard L1 runbook for dedicated (Phase 40 routing only)
- `ARCHITECTURE.md` Q6 (lines 387-402) — `_glossary-android.md#dedicated-device` cross-platform disambiguation pattern; Platform note banner at top of Dedicated admin guide
- `STACK.md` line 74 — Intune navigation: Devices > Enrollment > Android > Enrollment Profiles > Corporate-owned dedicated devices; token type choice (standard OR Entra shared device mode); MHS app config; static Entra device group assignment
- `SUMMARY.md` lines 215-226 — Phase 38 dedicated/kiosk admin coverage; HIGH confidence for setup-dedicated (updated 2025-05-08); MHS exit-PIN MEDIUM

**Phase 36 PRECEDENT (close analog — shipped doc at `docs/admin-setup-android/03-fully-managed-cobo.md`, 249 lines):** Structure: Frontmatter → Platform gate → Key Concepts → Prerequisites → COPE Migration Note → Enrollment profile → Enrollment token → Provisioning method choice (D-01 hybrid: route to matrix + inline callouts) → Android 15 FRP + EFRP → What-breaks (inline) → Renewal/Maintenance. Length 2800-3800 words. 11 stable HTML-id anchors per D-10.

**Phase 37 PRECEDENT (close analog — shipped doc at `docs/admin-setup-android/04-byod-work-profile.md`, 238 lines):** Structure includes top-of-doc AMAPI three-part placement (banner + dedicated H2 + inline reminders) for similarly-load-bearing content. Inline source-confidence markers `[HIGH/MEDIUM/LOW: source, last_verified YYYY-MM-DD]` per D-10/D-11.

---

## GRAY AREA 1: Persona + scenario overview shape (AEDED-01 SC1 + SC5 + PITFALL 7)

**Question:** How is the dual-stakeholder persona callout (Intune Admin + LOB Operations Owner) structured AND how is the 4-scenario overview (single-app / multi-app / digital signage / Entra shared device mode) presented? First dual-persona pattern in v1.4 docs.

**Constraints:**
- PITFALL 7 mandates persona callout BEFORE Intune steps (see `.planning/research/PITFALLS.md` line 194)
- SC5 requires Entra shared device mode disambiguation from multi-app kiosks
- Phase 34 admin-template-android H4 sub-sections preserved
- Length budget: persona block 100-200 words; scenario overview 300-600 words

### Candidates

**1A: Top-of-doc audience banner (compact persona) + scenario comparison table only.**
- Persona: blockquote banner immediately after Platform gate, ~80 words. "Audience: Intune Admin + LOB Operations Owner. The operations owner defines locked app(s); the Intune admin configures enrollment and kiosk policy."
- Scenarios: 4-row comparison table with columns: Scenario | Use case | Intune kiosk mode | Token type | Example device. ~250 words.
- Pros: minimal length; mirrors v1.0-v1.3 banner pattern; table is scannable.
- Cons: no scenario-routing decision support; banner persona may underweight LOB owner's contribution to decisions.

**1B: Persona callout in Key Concepts H2 + 4 H3 scenario subsections (per-scenario walkthrough).**
- Persona: full H3 subsection inside Key Concepts with both persona descriptions (~150 words).
- Scenarios: 4 H3 subsections (`### Single-app kiosk`, `### Multi-app kiosk (Managed Home Screen)`, `### Digital signage (userless)`, `### Entra shared device mode`). Each H3 covers: use case, Intune kiosk mode, token type, configuration touchpoints. ~600 words total.
- Pros: deep per-scenario coverage; satisfies SC5 disambiguation natively (Entra shared device mode gets its own H3); discoverable by section anchor.
- Cons: longest option; risk of de-facto duplication of multi-app kiosk vs Entra shared device mode content; per-scenario walkthrough creates pressure to also walk through provisioning-method choice per scenario (Anti-Pattern 1 risk).

**1C: Persona callout banner + scenario decision tree (mermaid or numbered) + scenario comparison table.**
- Persona: blockquote banner (~100 words) like 1A.
- Scenarios: numbered decision tree (`1. Locking to one app? → Single-app kiosk; 2. Curated set of approved apps? → Multi-app kiosk; 3. Userless display? → Digital signage; 4. Multi-shift sign-in? → Entra shared device mode`) followed by 4-row comparison table. ~400 words.
- Pros: routes admin to correct scenario before they read details; satisfies SC5 disambiguation via routing; supports L1 helpdesk who may need to confirm scenario from user description.
- Cons: decision tree has overlap (multi-app vs Entra shared device mode both have multiple approved apps); mermaid syntax adds maintenance burden.

**1D: Persona callout in Key Concepts H2 + scenario comparison table + a one-paragraph "How to choose" routing note.**
- Persona: H3 subsection in Key Concepts, ~150 words, both stakeholders described with example responsibilities.
- Scenarios: single comparison table (5 columns: Scenario | Locking style | Token type | User identity model | Example) + a short `### How to choose` paragraph (~100 words) routing on key questions. ~400 words total for scenarios.
- Pros: Key Concepts H2 is the established pattern for persona/concept content (Phase 36 D-08 precedent); table is scannable; routing paragraph is lighter than mermaid; SC5 disambiguation handled in routing paragraph + table side-by-side.
- Cons: routing prose may be skipped on non-linear skim; table cell width pressures Entra shared device mode disambiguation into shorthand.

---

## GRAY AREA 2: MHS exit-PIN sync callout placement & emphasis (AEDED-02 SC2)

**Question:** Where and how strongly does the Managed Home Screen exit-PIN synchronization requirement surface? "The top repeated-escalation pattern for dedicated devices."

**Constraints:**
- SC2 lock phrase: "configured identically in both" (must appear verbatim or near-verbatim)
- MEDIUM-confidence claim — REQUIRES Phase 37 D-10 source-confidence marker `[MEDIUM: community/Bayton, last_verified YYYY-MM-DD]`
- Affects only multi-app kiosk scenario (single-app kiosk doesn't use MHS); placement must be scenario-aware
- Phase 37 AMAPI banner precedent (top-of-doc warning) is structurally available

### Candidates

**2A: Top-of-doc warning banner ONLY (single point of truth).**
- ⚠️ blockquote at top of doc (after persona callout), ~60 words: "Multi-app kiosks: the exit-kiosk PIN MUST be configured identically in both the device restrictions profile AND the Managed Home Screen app configuration. Mismatch causes a visible error at kiosk exit attempt. [MEDIUM: community/Bayton, last_verified YYYY-MM-DD]"
- Pros: maximum visibility; one source of truth; mirrors Phase 37 AMAPI banner pattern.
- Cons: PITFALL 2 violation — what-breaks must be inline at point of admin decision, not relegated to a banner; banner gets skipped on non-linear skim per Phase 35 D-13 F-039 precedent.

**2B: Inline callouts at BOTH settings (device restrictions + MHS app config) with reciprocal cross-link.**
- Two paired ⚠️ callouts inline at the two affected settings; each callout names the other location and the SC2 lock phrase; both carry source-confidence marker.
- Pros: PITFALL 2 compliant; admin sees the warning at the moment of configuration; reciprocal cross-link prevents one-side-only mistakes.
- Cons: no doc-level emphasis for skim readers; no canonical location for downstream cross-references (Phase 40/41 anchor consumption); two reminders of an MEDIUM-confidence claim doubles audit surface.

**2C: Dedicated H2 section `## Exit-kiosk PIN synchronization` + inline reminders at both settings.**
- Standalone H2 section (~200 words) carrying full callout, SC2 lock phrase, source-confidence marker, and remediation guidance ("If you see 'a PIN to exit kiosk mode has not been set by your IT admin,' verify both locations match"). Inline ~30-word reminders at both settings cross-link to `#exit-kiosk-pin`.
- Pros: PITFALL 2 hybrid-placement satisfied (Phase 36 D-05 FRP/EFRP precedent: H2 + inline); stable anchor for Phase 40 routing; SC2 lock phrase has a definitive home; one canonical location for source-confidence marker.
- Cons: H2 section adds ~200 words; section position must avoid pre-empting MHS configuration step flow.

**2D: Top-of-doc banner + dedicated H2 + inline reminders at both settings (triple-placement, max-emphasis).**
- Phase 37 D-05 AMAPI three-part pattern adapted (banner + H2 + inline reminders); ~300 words combined.
- Pros: maximum signal for "top repeated-escalation pattern" framing per Phase 38 goal; matches Phase 37 D-05 precedent for similarly-load-bearing content.
- Cons: Phase 37 AMAPI was 3 distinct behavioral changes (custom OMA-URI / Wi-Fi cert / management app); MHS exit-PIN is ONE concrete pitfall — triple-placement is over-engineered for single-claim content; banner+H2 redundancy may dilute rather than amplify; MEDIUM-confidence claim placed in 4 locations is audit-heavy.

---

## GRAY AREA 3: Phase 36 enrollment-profile cross-reference depth (AEDED-01 SC1, ROADMAP "extends COBO")

**Question:** ROADMAP Phase 38 says Dedicated "extends COBO enrollment profile structure"; Anti-Pattern 1 says "no duplication of canonical content". How is the enrollment profile creation section scoped relative to Phase 36's `#enrollment-profile` anchor?

**Constraints:**
- Phase 36 D-10 published `#enrollment-profile` and `#enrollment-token` as stable consumer anchors specifically for Phase 38
- Dedicated-specific deltas: token type choice (Standard vs "Corporate-owned dedicated device with Microsoft Entra ID shared mode"); MHS app config requirement (multi-app + digital signage); static Entra device group assignment requirement; QR code rotation discipline (FEATURES.md line 263 — laminated/posted QR codes go stale at token expiry)
- Phase 40 L1 runbook 24 ("Device not enrolled") consumes Phase 36 `#enrollment-token` and `#provisioning-method-choice` for COBO scope; routing to Phase 38 is for kiosk-failure-specific paths

### Candidates

**3A: Brief cross-link only — restate nothing; Dedicated-specific deltas inline.**
- ~50-word "See Phase 36 `#enrollment-profile` for the corporate enrollment profile creation flow. Dedicated profiles use the same Intune navigation; the differences are below." Then list deltas only (token type choice, MHS app config, static device group).
- Pros: maximum Anti-Pattern 1 discipline; minimum drift surface; respects Phase 36 D-10 anchor contract.
- Cons: forces admin to read two docs to provision one device; ROADMAP "extends COBO enrollment profile structure" suggests structural extension, not pure delegation; weak admin journey continuity.

**3B: Full restatement — recreate enrollment profile creation steps with Dedicated-flavored callouts; no cross-link.**
- ~600 words full enrollment profile creation walkthrough with Dedicated-specific examples throughout.
- Pros: standalone admin journey; admin can provision without leaving the Dedicated guide.
- Cons: Anti-Pattern 1 hard violation (canonical mechanics live in Phase 36); when Phase 36 corrects an error or updates UI navigation, Phase 38 silently drifts; doubles audit surface for portal-UI assertions.

**3C: Hybrid — short orientation prose cross-linking Phase 36 mechanics + Dedicated-specific deltas inline (Phase 36 D-01 hybrid pattern).**
- ~80-word orientation paragraph: "Dedicated profile creation follows the same Intune flow as Fully Managed (COBO) — see Phase 36 `#enrollment-profile` for the canonical step-by-step. The Dedicated-specific deltas below explain what differs." Then ~250 words covering: token-type selection (with what-breaks for wrong type), MHS app config requirement (cross-link to multi-app scenario H3), static Entra device group assignment (with what-breaks if dynamic group used), QR rotation discipline.
- Pros: matches Phase 36 D-01 winner pattern (route to canonical + inline phase-specific); preserves Anti-Pattern 1 discipline; preserves admin journey continuity via orientation paragraph; deltas live where the admin is already reading.
- Cons: orientation paragraph could be skipped; deltas count toward Phase 38 doc length budget.

**3D: Full enrollment profile section, no cross-link to Phase 36; Phase 38 owns Dedicated enrollment profile end-to-end.**
- Like 3B but explicitly forbids any Phase 36 cross-link (treats Dedicated as an entirely separate enrollment mode).
- Pros: clear ownership boundary; no Phase 36 dependency.
- Cons: Anti-Pattern 1 hard violation; Phase 36 D-10 anchor contract abandoned; ignores ROADMAP "extends COBO enrollment profile structure" wording entirely.

---

## GRAY AREA 4: Android 15 FRP re-provisioning callout (AEDED-03 SC3)

**Question:** Phase 36 D-05 reserved a "parallel-but-distinct FRP callout for Dedicated re-provisioning". How does Phase 38 frame this content relative to Phase 36's `#android-15-frp` and `#configure-efrp` anchors? Dedicated FRP behavior is genuinely DIFFERENT from COBO (FEATURES.md line 261: Settings reset doesn't trigger FRP for Dedicated; only recovery/bootloader reset does; Intune wipe bypasses FRP).

**Constraints:**
- Phase 36 D-05 forbids Phase 38 from "pre-empting" Phase 36 EFRP configuration steps
- AEDED-03 SC3: callout describing FRP behavior during factory-reset RE-PROVISIONING (not re-enrollment)
- "Dedicated devices are typically re-provisioned, not re-enrolled" — distinct admin scenario from COBO
- Three reset pathways for Dedicated have different FRP behaviors per FEATURES.md line 261: Settings reset (no FRP) / recovery-bootloader reset (FRP applies) / Intune wipe (bypasses FRP)
- PITFALL 1 version-tag discipline applies (Android 15 explicit)

### Candidates

**4A: Brief Dedicated-FRP-behavior callout + cross-link to Phase 36 #android-15-frp + #configure-efrp for EFRP config steps.**
- ~150-word callout. Body: "Dedicated devices use a distinct reset pathway from re-enrollment. Three reset behaviors on Android 15: (1) Settings > Factory data reset — no FRP (safe for routine re-provisioning); (2) Recovery/bootloader reset — FRP applies (requires EFRP pre-config or Google account credential to recover); (3) Intune wipe — bypasses FRP. Configure EFRP via the Phase 36 EFRP policy if any Dedicated devices may be reset via recovery mode. See `03-fully-managed-cobo.md#configure-efrp`."
- Pros: respects Phase 36 D-05 "no pre-empting" guard; minimum content surface; cross-link reuses Phase 36 EFRP config canonical.
- Cons: 3-pathway FRP nuance squeezed into a short callout; admin must context-switch to Phase 36 for EFRP config steps even though they're already in the Dedicated scenario.

**4B: Full Dedicated-owned FRP H2 section restating Android 15 FRP behavior + EFRP config + Dedicated-specific reset pathways.**
- ~500-word H2 section paralleling Phase 36 D-05 structure. Restates Android 15 FRP behavioral change, EFRP policy configuration steps, then layers Dedicated-specific 3-pathway reset behavior.
- Pros: standalone Dedicated FRP content; admin doesn't context-switch to Phase 36.
- Cons: violates Phase 36 D-05 "Phase 38 does NOT pre-empt Phase 36 content" guard; restates EFRP config steps that are Phase 36-canonical; doubles drift surface for Intune EFRP UI navigation.

**4C: Dedicated-owned H2 callout section covering ONLY the 3-pathway re-provisioning FRP behavior + cross-link to Phase 36 for EFRP config.**
- ~300-word H2 section `## Android 15 FRP and re-provisioning`. Body: opens with ⚠️ blockquote ("Dedicated devices are typically re-provisioned, not re-enrolled. Android 15 FRP behavior depends on the reset pathway."); then 3-pathway breakdown (Settings reset / recovery reset / Intune wipe) with what-breaks per pathway; then closes with "Configure EFRP via Intune policy — see `03-fully-managed-cobo.md#configure-efrp`. Cross-link to Phase 34 `03-android-version-matrix.md#android-15-breakpoint` for the authoritative behavioral breakpoint."
- Pros: parallel-but-distinct from Phase 36 (Phase 36 owns EFRP config; Phase 38 owns re-provisioning behavior matrix); satisfies AEDED-03 SC3 verbatim ("FRP behavior during factory-reset re-provisioning"); 3-pathway nuance gets dedicated treatment; respects Phase 36 D-05 no-pre-empting guard; cross-link consolidates EFRP config in Phase 36.
- Cons: H2 placement question (after enrollment profile? after MHS sync section? at end?); admin still context-switches to Phase 36 for EFRP step-level config but only once.

**4D: Inline FRP reminder per scenario H3 (one ~50-word callout in each of 4 scenarios) + no dedicated H2.**
- 4 scenario-specific FRP reminders, each calling out the 3-pathway behavior in scenario-relevant terms (e.g., "Single-app kiosk re-provisioning typically uses Intune wipe — bypasses FRP. If recovery reset is used in field replacement, EFRP applies — see Phase 36 #configure-efrp.").
- Pros: scenario-specific framing helps admins reason about their own deployment.
- Cons: 4× duplicate of FRP content (Anti-Pattern 1 near-violation); MEDIUM-confidence ambiguity (which pathway is typical per scenario?) leaves audit surface high; no canonical anchor for Phase 40/41 routing.
