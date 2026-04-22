# Phase 37: BYOD Work Profile — Admin + End-User - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning
**Method:** Adversarial review (finder/adversary/referee scored pattern) across 2 rounds. Round 1 scored 48 candidate flaws across 4 gray areas (L2 runbook 19 scope, privacy boundary duplication, AMAPI callout placement, end-user guide scope). Round 2 scored 118 flaws across 4 additional gray areas (end-user length/structure, data transfer granularity, anchor-stability contract, AMAPI version-gate mechanism). 8 gray areas total resolved on lowest-real-flaw basis.

<domain>
## Phase Boundary

Phase 37 delivers two documents across two audiences — the FIRST tier-inverted content in v1.4 and the FIRST file in a new `docs/end-user-guides/` directory:

1. `docs/admin-setup-android/04-byod-work-profile.md` — BYOD (personally-owned) Work Profile admin setup: enrollment restrictions (block personal Android unless explicitly permitted), work profile policy, data transfer controls (6 directions × clipboard/contacts/calendar), privacy boundary canonical table (what admin CAN vs CANNOT see), AMAPI migration callout (custom OMA-URI removed April 2025, Wi-Fi cert-auth required, management app change Company Portal → Microsoft Intune app), web enrollment path awareness. (AEBYOD-01, AEBYOD-03)

2. `docs/end-user-guides/android-work-profile-setup.md` — End-user BYOD self-enrollment via Company Portal primary path + web enrollment sidebar, plain-language "what IT can/cannot see" summary, top-5 error messages with helpdesk routing, admin sidebar per PITFALL 6 tier-inversion pattern. **NEW DIRECTORY — first file in the end-user tier.** (AEBYOD-02)

Phase 37 does NOT own:

- **L2 enrollment investigation runbook 19** — `docs/l2-runbooks/19-android-enrollment-investigation.md` is owned by Phase 41 per REQUIREMENTS.md traceability (AEL2-02 → Phase 41 at line 187) and ARCHITECTURE.md Q8 prerequisite DAG (lines 447-450 place runbook 19 in Phase 6 L2 grouping alongside 18/20/21). See D-01 below; Phase 37 CONTEXT records the required STATE.md / SUMMARY.md / ROADMAP.md correction.
- **L1 runbook 23 "Work profile not created"** — Phase 40 (AEL1-03) owns per ROADMAP line 186. Phase 37 does NOT carry L1 content.
- **MGP binding mechanics** — Phase 35 `01-managed-google-play.md` owns. BYOD admin doc references `#bind-mgp` and `#disconnect-consequences`, never duplicates (Anti-Pattern 1 guard).
- **ZT portal mechanics** — Phase 35 `02-zero-touch-portal.md` owns. BYOD is a GMS mode that does NOT use ZT portal; the admin-template-android ZT portal H4 sub-section is OMITTED via HTML-comment subtractive-deletion pattern (Phase 34 D-17).
- **Corporate-mode privacy boundary contrast** — Phase 36 COBO admin guide is the corporate-ownership contrast; BYOD privacy boundary table references Phase 36 `#fully-managed` conceptually to ground the contrast (work-profile-only partition vs entire-device management) but does not duplicate COBO content.
- **Provisioning-method matrix** — Phase 34 `02-provisioning-methods.md` owns. BYOD row is the filtered-row cross-reference target; BYOD admin doc never duplicates the grid.
- **Version matrix** — Phase 34 `03-android-version-matrix.md` owns (BYOD minimum Android version is a research flag — see below).
- **AOSP / Dedicated / COBO / ZTE mode content** — Phase 36/38/39 own.

Carrying forward from Phases 34, 35, and 36 (locked — do not re-open):

- **Tri-portal admin template** (Phase 34 D-16..D-22) — BYOD OMITS the ZT portal H4 sub-section via HTML-comment subtractive-deletion pattern (D-17). Retained H4 sub-sections: "In Intune admin center" and "In Managed Google Play".
- **Tri-portal shorthand** (Phase 34) — MGP and ZT portal shorthand; full names on first appearance per doc.
- **Mode labels** (Phase 34) — "BYOD (Work Profile)" is the in-prose label; parenthetical clarification on first use (see D-08 terminology discipline).
- **Anti-Pattern 1 guard** (Phase 34 D-26) — matrices live in single canonical reference docs; BYOD admin references Phase 34 `02-provisioning-methods.md` and `03-android-version-matrix.md` via filtered-row link patterns.
- **PITFALL 1 version-tag discipline** — every behavioral assertion carries an inline version tag. AMAPI April-2025 migration is itself a version-gated behavioral claim.
- **PITFALL 2 what-breaks callout convention** — per every configurable setting inline at point of admin decision. Especially applies to the 6 direction settings in D-05 data transfer controls.
- **PITFALL 6 tier-inversion template** — end-user self-service guide template with admin sidebar for policy-side checks L1 CAN do; privacy boundary content required in BOTH docs in different voice.
- **PITFALL 8 AMAPI migration** — source all BYOD content from post-April-2025 Microsoft Learn; web enrollment path is a new post-AMAPI first-class option.
- **PITFALL 9 / PITFALL 11 guard** — no modifications to v1.0-v1.3 shared files (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`, `_glossary.md`, `_glossary-macos.md`, `docs/admin-setup-ios/*`, `docs/admin-setup-macos/*`, `docs/l1-runbooks/*`, `docs/l2-runbooks/*`).
- **AEAUDIT-04 guards** — no "supervision" as Android management term; Play Integrity only, never SafetyNet; `last_verified` frontmatter mandatory; no Android links in v1.0-v1.3 shared files.
- **60-day review cycle** — frontmatter `last_verified` + `review_by` with 60-day window (fast-moving platform; AMAPI-adjacent content is highest-drift in v1.4).
- **Anchor stability contract with Phase 40 / 41** — downstream phases consume Phase 37 admin guide anchors listed in D-06 below; renaming breaks cross-references.
- **Frontmatter schema** — `platform: Android`, `audience: admin | end-user`, `applies_to: BYOD`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD`. `audience: end-user` is a NEW value this phase introduces.
- **Phase 34 `_glossary-android.md` cross-references** — BYOD terms (`#byod`, `#work-profile`, `#managed-google-play`, `#amapi`, `#play-integrity`) use Phase 34 D-10 cross-platform callout pattern.

Research flags to verify at plan/execute time (from STATE.md + this phase):

- **BYOD Android minimum version** — Android 8 practical; verify current Microsoft Learn statement. Phase 34 `03-android-version-matrix.md` is the authoritative source target.
- **AMAPI migration completeness — web enrollment path** — verify post-April-2025 Microsoft Learn coverage of web enrollment as a first-class BYOD path per techcommunity blog 4370417.
- **AMAPI Wi-Fi cert-auth specifics** — verify exact cert-auth configuration requirement post-migration (username/password Wi-Fi profiles are reported broken).
- **Management app change end-user experience** — verify what Microsoft Intune app (vs Company Portal) experience looks like to the end user on enrollment; this drives end-user doc step accuracy.
- **Intune admin center BYOD Work Profile policy blade path** — the Intune console has renamed data transfer settings multiple times; verify each of the 6 direction setting labels at plan time.
- **Entra account preferred for MGP binding (Phase 35 D-13)** — Phase 37 admin doc references MGP binding as prereq; verify Entra preference still current.

</domain>

<decisions>
## Implementation Decisions

### L2 runbook 19 scope ownership (ROUND 1 AREA 1 — 1B winner)

- **D-01:** **Phase 41 owns `docs/l2-runbooks/19-android-enrollment-investigation.md` in full.** AEL2-02 maps to Phase 41 per REQUIREMENTS.md traceability table line 187; ROADMAP Phase 41 SC2 (line 199) explicitly specifies the file and its structured diagnostic steps; ARCHITECTURE.md Q8 prerequisite DAG (lines 447-450) places runbook 19 in "Phase 6 (L2 runbooks)" grouping alongside 18/20/21 — NOT in "Phase 4 (mode-specific admin guides)". Phase 37 admin guide reserves the 5 mandatory anchors (D-06) so Phase 41 runbook 19 can cross-reference Phase 37 admin guide without anchor collision. *Winner of Area 1 adversarial review (1B: 2 CRIT after F-B02 DAG-disprove / 5 MED / 5 LOW = 12 real-flaw score) over 1A (3 CRIT / 6 MED / 4 LOW = 13 — F-A01 ROADMAP scope lock, F-A02 Phase 36 precedent contradiction, F-A03 Phase 41 SC2 duplicate ownership) and 1C (3 CRIT / 7 MED / 6 LOW = 16 — F-C01 Phase 41 SC2 fails on skeleton, F-C02 Phase 35→39 precedent mis-cited, F-C03 SC5 two-distinct-files broken).*

- **D-02:** **Required correction of upstream artifacts during plan-phase or execute-phase** (NOT in discuss-phase commit scope):
  - **STATE.md line 75** — remove the clause "L2 enrollment investigation runbook 19 is delivered in Phase 37 (BYOD) per REQUIREMENTS.md AEL2-02 pairing with BYOD work-profile enrollment failure; remaining L2 runbooks (18 log collection, 20 app install, 21 compliance) in Phase 41. This is a deliberate cross-phase split honoring research ARCHITECTURE.md dependency DAG." Replace with: "All four L2 investigation runbooks (18, 19, 20, 21) are delivered in Phase 41 per REQUIREMENTS.md AEL2-01..AEL2-05 traceability and ARCHITECTURE.md Q8 DAG Phase 6 L2 grouping. The earlier Phase 37 runbook 19 claim misaligned with the DAG's own structure; corrected 2026-04-22."
  - **research/SUMMARY.md line 208** (Phase 37 section "Delivers" bullet list) — remove the runbook 19 bullet. Phase 37 delivers only `04-byod-work-profile.md` and `android-work-profile-setup.md`.
  - **research/SUMMARY.md line 201** — update section header from "Phase 37: BYOD Work Profile - Admin + End-User + L2" to "Phase 37: BYOD Work Profile - Admin + End-User".
  - **ROADMAP.md line 195** — rewrite Phase 41 depends-on clause from "Phase 37 (BYOD enrollment investigation runbook 19 was introduced in BYOD phase — this phase expands with app-install + compliance runbooks)" to "Phase 37 (BYOD admin guide anchors `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary` are runbook 19 cross-reference targets); Phase 40 (L1 runbooks exist; L2 investigation runbooks inherit L1 escalation framing)".
  - These three artifact corrections MUST land in a single commit during plan-phase or execute-phase so the record remains internally consistent. Phase 37 PLAN.md task list must include this correction as an explicit task.

### Privacy boundary table duplication strategy (ROUND 1 AREA 2 — 2A winner)

- **D-03:** **Canonical privacy boundary table in admin doc + plain-language summary in end-user doc.** The admin doc carries the authoritative table (Phase 37 SC1 requirement); the end-user doc carries a user-voice summary that preserves topic coverage without byte-for-byte duplication. Admin table columns: "Data category | Admin CAN see | Admin CANNOT see | Why (privacy mechanism)". Required rows (minimum): managed app inventory; device compliance state; work profile data; personal apps; personal data (photos, documents); personal call / SMS / browser history; device location outside work profile. End-user summary is ≤150 words of plain-language prose OR a two-column "✓ IT can see" / "✗ IT cannot see" list (text-first per 4c-i lock; no emoji/icons beyond ✓/✗ ASCII symbols) matching the admin table's topic rows. *Winner of Area 2 adversarial review (2A: 2 CRIT after F-2A01 Anti-Pattern 1 downgrade / 4 MED / 4 LOW = 10) over 2B (3 CRIT / 4 MED / 4 LOW = 11 — F-2B01 Anti-Pattern 1, F-2B02 PHASE-LEVEL.md new artifact, F-2B03 topic-parity unauditable), 2C (4 CRIT / 4 MED / 3 LOW = 11 — byte-for-byte copy violates SC1/SC2 voice lock), 2D (4 CRIT / 4 MED / 4 LOW = 12 — new _data/ infra out of scope).*

- **D-04:** **Sync contract** — Phase 42 milestone audit (AEAUDIT-04) grep extension adds four keyword-presence checks across both files: `work profile data`, `personal apps`, `personal data`, `device location`. Admin doc and end-user doc must both match on all four. If a new row is added to the admin canonical table, the author MUST also add the plain-language equivalent to the end-user summary in the same commit. Phase 37 PLAN.md must list this sync contract as a post-write verification task; Phase 37 executor runs the grep before commit. End-user doc MAY include a one-line "See the admin guide for technical details" footer pointing to `docs/admin-setup-android/04-byod-work-profile.md` (cross-tier linking is NOT forbidden — F-2A03 flagged the unsupported prohibition); the footer is optional author discretion.

### AMAPI migration callout placement (ROUND 1 AREA 3 — 3C winner)

- **D-05 (callout structure):** **Hybrid — top-of-doc banner + dedicated H2 after Key Concepts + inline reminders at affected settings.** Banner (≤50 words, one paragraph at top of doc after the platform-gate blockquote): "⚠️ This guide covers post-AMAPI-migration BYOD Work Profile (April 2025). See `## AMAPI Migration` for the three behavioral changes (custom OMA-URI removal, Wi-Fi certificate authentication requirement, management app change from Company Portal to Microsoft Intune app). Pre-April-2025 guidance does not apply." Dedicated H2 `## AMAPI Migration (April 2025)` placed AFTER Key Concepts subsection and BEFORE Prerequisites (matches Phase 35 D-13 hybrid-placement + Phase 36 D-03 post-overview-pre-decision-surface structure at a BYOD-doc-scoped adaptation). H2 body 300-500 words covering: (1) custom OMA-URI removal for BYOD Work Profile; (2) Wi-Fi policy certificate-based authentication required (username/password profiles broken post-migration); (3) management app change (Company Portal → Microsoft Intune app); (4) web enrollment path availability (PITFALL 8 warning sign guard). Inline reminders at Wi-Fi policy section, OMA-URI mention (if any), and management app mention — each inline reminder is a one-line blockquote pointing back to `#amapi-migration`. Length contributions: banner ~50 + H2 section ~400 + 3 inline reminders ~30 each = ~540 words total across placements. *Winner of Area 3 adversarial review (3C: 0 CRIT / 6 MED / 5 LOW = 11 — zero CRIT decisive on lowest-CRIT-count basis) over 3A (3 CRIT / 5 MED / 3 LOW = 11 — PITFALL 8 misread, Phase 36 D-03 contradiction, Phase 35 D-13 precedent violation), 3B (3 CRIT / 5 MED / 2 LOW after F-3B09 disprove = 10 but 3 CRIT — skip risk precedent), 3D (3 CRIT / 5 MED / 3 LOW = 11 — PITFALL 8 violated by post-prereqs placement, Phase 36 D-03 clone-framing incorrect).*

### Data transfer controls granularity (ROUND 2 AREA 6 — 6a winner)

- **D-05b:** **6-row direction-specific table in admin doc.** AEBYOD-01 SC1 "direction" is load-bearing; a full 6-row table is the only shape that mechanically guarantees per-direction coverage. Table columns: "Direction | Admin default | Recommended for BYOD | What breaks if misconfigured". Table rows (6 required):
  1. Clipboard: work profile → personal profile
  2. Clipboard: personal profile → work profile
  3. Contacts: work profile → personal profile
  4. Contacts: personal profile → work profile
  5. Calendar: work profile → personal profile
  6. Calendar: personal profile → work profile

  Each row carries an inline version tag in its cell content ("Applies to Android 8.0+; AMAPI post-April-2025"). Table placed in dedicated `## Data transfer controls` H2 section after `## Work profile policy`. Stable row-level sub-anchors via `<a id="...">` HTML-id scaffolding (Phase 36 03-fully-managed-cobo.md precedent — 11 such anchors shipped): `#clipboard-work-to-personal`, `#clipboard-personal-to-work`, `#contacts-work-to-personal`, `#contacts-personal-to-work`, `#calendar-work-to-personal`, `#calendar-personal-to-work`. Table total ~400-500 words; section frame (intro + post-table admin-center-path note) adds ~100-150 words. *Winner of Area 6 adversarial review (6a: 1 CRIT after F-6a-01 Anti-Pattern 1 downgrade / 5 MED / 2 LOW after F-6a-07 disprove = 36) over 6b (2 CRIT / 4 MED / 2 LOW = 42 — SC1 direction under-served by prose, PITFALL 2 callout wall density), 6c (3 CRIT / 3 MED / 1 LOW = 46 — scope creep creating new canonical matrix, SC1 literal non-compliance, Phase 36 no-precedent framing), 6d (2 CRIT / 4 MED / 2 LOW = 42 — table+prose dual-source drift, SC1 direction specificity lost in 3×3 cell collapse). F-6a-01 Anti-Pattern 1 downgraded CRIT→MED per Round 1 Referee precedent (F-2A01 downgrade): data transfer has no upstream canonical reference doc, so the 6a table IS the canonical form — not a duplicate.*

### End-user guide enrollment method coverage (ROUND 1 AREA 4a — 4a-iii winner)

- **D-06a:** **Company Portal primary enrollment path + web enrollment sidebar.** Main enrollment flow is Company Portal (install from Google Play → sign in → create work profile). Web enrollment appears as a `### Web enrollment (alternative)` H3 sub-section or boxed inset referenced from the main flow with framing: "If your IT team has enabled web enrollment, see below for the alternative sign-in flow." Web enrollment sidebar ≤150 words. The "if your IT has enabled X" wording is accepted as a known tradeoff (F-4a-iii-01 MED) — users cannot determine which method their tenant enabled without IT contact, but this is strictly preferable to 4a-i's PITFALL 8 line 224 anti-pattern match (Company-Portal-only violates the post-AMAPI warning sign). *Winner of 4a (0 CRIT / 3 MED / 3 LOW = 18) over 4a-i (2 CRIT / 3 MED / 2 LOW = 37 — PITFALL 8 anti-pattern, SC4 post-April-2025 sourcing violation) and 4a-ii (1 CRIT / 3 MED / 3 LOW = 28 — research-flag gate, plain-language confusion).*

### End-user guide troubleshooting scope (ROUND 1 AREA 4b — 4b-ii winner)

- **D-06b:** **Top-5 error messages + helpdesk routing.** End-user doc carries a `## If something goes wrong` H2 section containing a list of the 5 most common user-observable messages during BYOD enrollment (plan-time sourced from PITFALL 6 + Microsoft Learn troubleshoot page + Jason Bayton BYOD enrollment content). Each entry format: "**Message you might see:** [quoted UI text]. **What this means:** [plain-language explanation]. **Tell your IT helpdesk:** [specific detail to report, e.g., 'the error code at the bottom of the screen']." Five is the content-discipline upper bound; fewer is acceptable. Phase 40 L1 runbook 23 "Work profile not created" reserves the scope for L1-executable resolution steps — the end-user doc does NOT duplicate runbook 23 content (4b-iii CRIT violation avoided). *Winner of 4b (0 CRIT / 2 MED / 4 LOW = 14) over 4b-i (1 CRIT / 2 MED / 3 LOW = 23 — PITFALL 6 sidebar requirement, push-all-errors-to-helpdesk) and 4b-iii (2 CRIT / 3 MED / 2 LOW = 37 — explicit Phase 40 scope violation, PITFALL 6 L1-runbook-format anti-pattern).*

### End-user guide visuals policy (ROUND 1 AREA 4c — 4c-i winner)

- **D-06c:** **Text-first — no screenshots.** End-user doc follows v1.0-v1.3 text-first policy; no raster screenshots, no box-drawing ASCII art, no emoji-icon visual hierarchy. Step descriptions use plain text ("Open Company Portal" not a screenshot of the icon; "Tap **Sign In**" with bold for UI text). REQUIREMENTS.md Section 5 (policy carve-outs) documents the text-first policy; this phase's Folded Decisions preserve it for end-user tier. *Winner of 4c (0 CRIT / 3 MED / 3 LOW = 18) over 4c-ii (1 CRIT / 5 MED / 1 LOW = 36 — binary-asset hygiene CRIT, screenshot-rot amplification, accessibility alt-text discipline not in v1.0-v1.3 convention) and 4c-iii (1 CRIT / 3 MED / 3 LOW = 28 — ASCII/box-draw screen-reader accessibility CRIT).* F-4c-i-06 (LOW — "PROJECT.md doesn't contain 'text-first'") is accepted: the policy text lives in REQUIREMENTS.md (v1.0 carve-out), not PROJECT.md; CONTEXT.md cites the correct source per D-15 canonical refs.

### Terminology discipline (ROUND 1 AREA 4d — 4d-iii winner)

- **D-06d:** **"BYOD Work Profile" with first-use parenthetical + shorthand thereafter.** First appearance in each of the two docs: "BYOD Work Profile (also known as 'personally-owned work profile' in Google terminology)". Subsequent prose uses "BYOD Work Profile" or "BYOD" shorthand. Glossary cross-link to `_glossary-android.md#byod` on first appearance (Phase 34 D-10 cross-platform callout pattern). In the end-user doc first-use parenthetical appears in the overview paragraph only; top-5 error section and step-numbered enrollment flow use shorthand "work profile" or "BYOD Work Profile" without repeating parenthetical. PITFALLS.md line 83 "BYOD work profile without clarification" warning is satisfied by the first-use parenthetical disclosure. *Winner of 4d (0 CRIT / 2 MED / 5 LOW after F-4d-iii-05 disprove = 15) over 4d-i (1 CRIT / 2 MED / 3 LOW = 23 — PITFALLS line 83 violation "BYOD work profile throughout without clarification") and 4d-ii (0 CRIT / 4 MED / 2 LOW = 22 — ROADMAP/REQUIREMENTS primary-label mismatch, end-user plain-language awkwardness, anchor churn).*

### End-user guide length + structure pattern (ROUND 2 AREA 5 — 5a-iv winner)

- **D-07:** **Linear steps-based with inset callouts; 800-1500 word target.** Doc shape:
  - Audience callout (top-of-doc blockquote, ~40 words): "This guide is for personal-device users enrolling in BYOD Work Profile. If you administer Intune and are configuring BYOD policy, see `docs/admin-setup-android/04-byod-work-profile.md`."
  - Overview (~80-120 words) — includes 4d-iii first-use parenthetical for BYOD Work Profile terminology
  - Before you start (~80-100 words, end-user prereqs: personal device signed into personal Google account, organization's MGP binding is complete — user won't check this but should know it exists)
  - Enrollment steps (numbered, 300-500 words — Company Portal primary path per D-06a; includes web enrollment H3 sidebar ≤150 words)
  - Privacy summary `## What your IT team can and cannot see` (~150-200 words, plain-language mirror of admin canonical per D-03)
  - If something goes wrong `## If something goes wrong` (top-5 error messages per D-06b, ~200-300 words)
  - Brief blockquote insets (capped at ≤3 in the enrollment flow; privacy reminders only, e.g., "Reminder: IT cannot see what you do in this browser tab")
  - Admin sidebar `## For IT helpdesk agents` (H2 at end, ~200-250 words — tier-inversion per PITFALL 6: policy-side checks L1 CAN do in the Intune console, written in sidebar voice NOT step-by-step; explicit guardrail: NO specific Intune admin center navigation ("Devices > ...") — reference the admin guide instead)

  Total target: 800-1500 words. Frontmatter adds ~5 lines (not word-counted). *Winner of Area 5 adversarial review (5a-iv: 3 MED after F-5aiv-01 disprove / 4 LOW = 19) over 5a-i (2 CRIT / 3 MED / 2 LOW = 37 — envelope floor-math impossibility 700-1200, unresolved PITFALL 6 admin-sidebar placement), 5a-ii (2 CRIT / 3 MED / 2 LOW = 37 — FAQ voice inverts tier hierarchy, SC2 portal-step leak in Q&A reflex), 5a-iii (3 CRIT / 3 MED / 2 LOW = 47 — 2800 upper bound inverts tier hierarchy, plain-audience accessibility collapses, blockquote-simulated visual layout violates 4c-i).*

- **D-08 (end-user frontmatter):** `platform: Android`, `audience: end-user` (**NEW value**; first instance in the docs suite), `applies_to: BYOD`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle). The `end-user` value of `audience` is the beachhead for future iOS/macOS/Windows end-user guides; Phase 37 does not pre-commit other tier structure.

- **D-09 (admin sidebar SC2 guardrail):** The `## For IT helpdesk agents` H2 at the bottom of the end-user doc MUST NOT contain Intune admin center navigation like "Devices > Enrollment restrictions > …". Instead: "Policy-side checks the helpdesk can verify in the Intune admin console: enrollment restrictions for personal Android devices, Company Portal assignment to the enrolling user, compliance policy scope. For portal-step detail, see `docs/admin-setup-android/04-byod-work-profile.md`." Executor runs a `grep -E "Devices >|Apps >|> Enrollment" docs/end-user-guides/android-work-profile-setup.md` self-check before commit; any hit requires rewording.

### Anchor-stability contract (ROUND 2 AREA 7 — 7c winner)

- **D-06 (admin-doc anchor contract):** **Partial lock — 5 mandatory + secondary discretionary.**

  **MANDATORY (locked; downstream Phase 40 / 41 consume):**
  - `#key-concepts` — conceptual subsection (work-profile-is-personal-partition; terminology; tier-inversion framing)
  - `#amapi-migration` — dedicated H2 per D-05
  - `#enrollment-restrictions` — work-profile enrollment restriction configuration
  - `#work-profile-policy` — work profile policy block
  - `#privacy-boundary` — canonical privacy boundary table per D-03

  **SECONDARY (planner discretion; Phase 37 PLAN.md decides naming):**
  - `#prerequisites` (likely)
  - `#data-transfer-controls` (or alternative sub-anchors per D-05b row-anchors)
  - `#wifi-cert-auth` or `#wi-fi-certificate-authentication`
  - `#management-app-change`
  - `#what-breaks` (umbrella or inline per-setting)
  - `#renewal-maintenance`

  Admin doc uses `<a id="...">` HTML-id scaffolding (Phase 36 03-fully-managed-cobo.md precedent, 11 such anchors verified shipped) for ALL mandatory and discretionary anchors; auto-generated slugs are disabled in favor of explicit IDs. Anchor contract is self-enforced (AEAUDIT-04 does not mechanically verify anchor stability — known Phase 42 audit limitation).

- **D-06e (end-user-doc anchor contract):** No mandatory anchors locked at CONTEXT level. Phase 37 PLAN.md nominates end-user doc anchors; Phase 40 L1 runbook 23 may reference end-user doc anchors if it needs to point users at the "If something goes wrong" section. Natural anchor names derived from section headings; executor may override via HTML-id if PLAN.md requires.

  *Winner of Area 7 adversarial review (7c: 0 CRIT / 5 MED / 2 LOW = 27) over 7a (0 CRIT / 5 MED / 3 LOW = 28 — F-7a-02 #audience-callout not anchorable per Phase 36 shipped precedent, F-7a-03 pre-commit before Gray Area 6 settles, F-7a-06 ignores AMAPI-research-flag interaction), 7b (2 CRIT / 4 MED / 1 LOW = 36 after F-7b-05 disprove — breaks Phase 36 D-10 + Phase 35 D-17/D-23 precedent, Phase 40 SC5 "no broken anchors" failure risk), 7d (2 CRIT / 5 MED / 1 LOW = 41 after F-7d-03 disprove — Phase 40/41 PLAN.md don't exist yet so consumer list can't be derived).*

### AMAPI version-gate mechanism (ROUND 2 AREA 8 — 8d winner)

- **D-10:** **Inline HIGH/MEDIUM/LOW source-confidence markers with source name + last_verified date.** Format: `[HIGH: MS Learn, last_verified 2026-04-22]` (or `[MEDIUM: techcommunity, last_verified 2026-04-22]` or `[LOW: community, last_verified 2026-04-22]`) placed at the end of each AMAPI-affected assertion. This is a deliberate advancement on Phase 36 D-17 MEDIUM-confidence HTML-comment precedent — AEBYOD-02 SC4 literally requires "any assertion derived from pre-migration sources is labeled with a confidence marker AND last_verified date"; the verb "labeled" implies reader-visibility. Phase 36's HTML-comment markers are invisible to rendered output; 8d's inline rendered markers satisfy SC4's labeling literal. Phase 37 executor applies markers to every assertion in the `## AMAPI Migration` H2 section + the three inline reminders (Wi-Fi cert-auth, OMA-URI, management app change) AND any AMAPI-adjacent behavioral claim elsewhere in the doc (e.g., web enrollment path mention). HIGH is NOT assumed default; it is marked explicitly on first appearance of each source, then shorthand permitted ("Source marking first-use" convention applies: `[HIGH: MS Learn]` first, then bare `[HIGH]` acceptable for same-source repeats in the same H2 section). *Winner of Area 8 adversarial review (8d: 0 CRIT / 4 MED / 4 LOW = 24) over 8a (3 CRIT / 3 MED / 2 LOW = 47 — SC4 literal violations: scope phrase ≠ confidence marker, last_verified per-assertion missing, source hierarchy collapse), 8b (3 CRIT / 3 MED / 2 LOW = 47 — URL drift maximized, source hierarchy inversion, confidence marker missing), 8c (3 CRIT / 3 MED / 2 LOW = 47 — frontmatter schema break, unlinked audit signals, 60-day rotation cost 8×).*

- **D-11:** **Format regex for audit** (Phase 42 grep compatibility). Markers MUST match the regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`. Audit grep extension required in Phase 42 AEAUDIT-04 — this phase's PLAN.md must include a task adding the regex to the Phase 42 audit spec (or to a phase-level audit script carried forward).

### Document structure (overall shape lock)

- **D-12 (admin doc shape, locked sections in order):**
  1. Frontmatter
  2. Platform gate blockquote (`> **Platform gate:** This guide covers Android Enterprise BYOD (personally-owned) Work Profile enrollment through Microsoft Intune. For corporate-owned Fully Managed (COBO) enrollment, see [...]`)
  3. Top-of-doc AMAPI banner (D-05)
  4. `## Key Concepts` (H2) — work-profile-is-personal-partition, tier-inversion framing, terminology disambiguation (D-06d first-use parenthetical + glossary cross-link)
  5. `## AMAPI Migration (April 2025)` (H2) — D-05 dedicated section
  6. `## Prerequisites` (H2) — MGP binding reference, enrollment restriction prerequisite, Entra/Intune account prerequisites
  7. `## Enrollment restrictions` (H2)
  8. `## Work profile policy` (H2)
  9. `## Data transfer controls` (H2) — D-05b 6-row table
  10. `## Privacy boundary` (H2) — D-03 canonical table
  11. `## Wi-Fi policy (certificate authentication)` (H2) — inline AMAPI reminder per D-05
  12. `## Management app` (H2) — inline AMAPI reminder per D-05 (Company Portal → Microsoft Intune app context)
  13. `## Renewal / Maintenance` (H2)
  14. `## For L1 helpdesk agents` (H2) — admin-side-of-tier-inversion for L1 cross-consumption by Phase 40 runbook 23 (optional; planner discretion)

- **D-13 (end-user doc shape, locked sections in order):**
  1. Frontmatter (`audience: end-user`)
  2. Audience callout blockquote (`> **For personal-device users:** This guide...`)
  3. Overview (`## What is BYOD Work Profile?` H2 — includes D-06d first-use parenthetical)
  4. `## Before you start` (H2)
  5. `## Enroll your device` (H2) — Company Portal primary + web enrollment sidebar per D-06a
  6. `## What your IT team can and cannot see` (H2) — D-03 end-user summary
  7. `## If something goes wrong` (H2) — D-06b top-5 messages
  8. `## For IT helpdesk agents` (H2) — D-09 SC2-guardrail-compliant admin sidebar

- **D-14 (length targets):**
  - Admin doc target **3000-4000 words** (higher than Phase 36 COBO 2800-3800 to accommodate D-03 privacy table + D-05b data transfer table + D-05 AMAPI three-part callout, all net-new content not in Phase 36).
  - End-user doc target **800-1500 words** per D-07.
  - Combined Phase 37 content envelope ~3800-5500 words (higher than single-admin-doc Phase 36; plan count impact: likely 2 plans — see PATTERNS).

- **D-15 (frontmatter):** Admin doc: `platform: Android`, `audience: admin`, `applies_to: BYOD`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD`. End-user doc: `platform: Android`, `audience: end-user`, `applies_to: BYOD`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD`.

- **D-16 (shared-file modification guard):** Phase 37 MUST NOT modify: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, any file under `docs/admin-setup-ios/`, any file under `docs/admin-setup-macos/`, any file under `docs/l1-runbooks/`, any file under `docs/l2-runbooks/`, any file under `docs/admin-setup-android/` except NEW file `04-byod-work-profile.md`, any file under `docs/android-lifecycle/`. PITFALL 9 / PITFALL 11 enforcement.

### Research-flag verification protocol (locked for Phase 37)

- **D-17:** Plan-phase researcher MUST run plan-time verification for the six research flags listed in the domain boundary before authoring tasks:
  1. BYOD Android minimum version (verify against Phase 34 `03-android-version-matrix.md` and current MS Learn)
  2. AMAPI web enrollment path documentation completeness (techcommunity blog 4370417 + post-April-2025 MS Learn BYOD pages)
  3. AMAPI Wi-Fi certificate authentication specifics (which cert types; username/password break confirmation)
  4. Management app change end-user experience (Microsoft Intune app install/first-run flow)
  5. Intune admin center BYOD policy blade navigation + 6 data-transfer-direction setting labels
  6. Entra-preferred MGP binding (still current per Phase 35 D-13)

  Findings recorded in the phase RESEARCH.md with source hierarchy attribution (HIGH MS Learn / MEDIUM techcommunity or Jason Bayton / LOW community).

- **D-18:** Executor re-verifies at execute time for any portal-UI-specific assertion (Intune admin center paths, Microsoft Intune app UI). Any unverifiable MEDIUM-confidence assertion is labeled per D-10 inline marker with accurate last_verified date.

- **D-19:** If a plan-time assertion cannot be verified against current Microsoft Learn or Google AE Help, it is either (a) omitted and noted in RESEARCH.md as pending or (b) documented with explicit MEDIUM-confidence label citing techcommunity blog / Jason Bayton. Never stated as HIGH-confidence without verification.

### Claude's Discretion

- Exact word counts within the D-14 section ranges (total admin 3000-4000; end-user 800-1500).
- Web enrollment sidebar in the end-user doc: H3 within `## Enroll your device` vs dedicated `## Web enrollment (alternative)` H2 — author's call; H3 preferred for visual hierarchy (primary path stays prominent).
- End-user doc audience callout exact phrasing within the D-13 shape — the literal "This guide is for personal-device users..." example is suggestive, not mandatory.
- Whether the admin doc includes a mermaid diagram of the BYOD enrollment flow (neither Phase 35 nor Phase 36 universally did; author's call).
- Exact phrasing of the admin sidebar `## For IT helpdesk agents` in the end-user doc within the D-09 SC2-guardrail.
- Ordering of rows in the 6-row data transfer table (D-05b row order above is one defensible order; severity-descending or admin-journey-order acceptable alternatives).
- Whether the admin doc includes the optional `## For L1 helpdesk agents` H2 (D-12 item 14) — author's call; Phase 40 L1 runbook 23 content design may inform this at plan time.
- Whether the end-user "If something goes wrong" top-5 list uses numbered list, bulleted list, or sub-H3 for each message — plain-language legibility driver; author's call.
- Exact wording of D-10 inline confidence markers — format regex in D-11 is authoritative; prose surface wording within the regex is author's call.

### Folded Todos

None — `gsd-tools todo match-phase 37` returned zero matches.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap

- `.planning/REQUIREMENTS.md` — AEBYOD-01 / AEBYOD-02 / AEBYOD-03 verbatim at lines 37-43; AEL2-01..AEL2-05 at lines 82-86 (confirms AEL2-02 → Phase 41 per traceability line 187); AEL1-03 at lines 54-74 (Phase 40 runbook 23 ownership); Section 5 text-first policy reference
- `.planning/ROADMAP.md` — Phase 37 entry lines 141-152 (goal, depends on Phase 35, SC1-5); Phase 40 entry lines 180-190 (L1 runbook 23 ownership); Phase 41 entry lines 192-203 (AEL2-02 ownership, depends-on clause line 195 NEEDS CORRECTION per D-02)
- `.planning/PROJECT.md` — v1.4 scope, Key Decisions (deferred items including Knox ME v1.4.1, AOSP full v1.4.1, cross-platform nav post-v1.4, 4-platform comparison v1.5)
- `.planning/STATE.md` — Phase 37 research flags (BYOD Android min version, AMAPI completeness); v1.4 decisions line 75 NEEDS CORRECTION per D-02 (runbook 19 is Phase 41 per DAG, not Phase 37)

### v1.4 Android Enterprise Research (all 2026-04-19)

- `.planning/research/FEATURES.md` — Mode 3 BYOD Work Profile (Android 5.1+ minimum per line 21; AMAPI limitations per line 136); Phase 2 Corporate Enrollment; feature-gap analysis
- `.planning/research/ARCHITECTURE.md` — file dependency graph; **Q8 prerequisite DAG lines 442-450** (runbook 19 in Phase 6 L2 grouping — NOT Phase 4 BYOD group; D-01 evidence); Anti-Pattern 1 (matrix duplication)
- `.planning/research/PITFALLS.md` — **PITFALL 6 (lines 156-204)** BYOD Work Profile tier inversion (end-user self-service template + admin sidebar; privacy boundary not optional); **PITFALL 8 (lines 207-229)** AMAPI migration (custom OMA-URI removal + Wi-Fi cert-auth + mgmt app change; techcommunity blog 4370417 at line 220); PITFALL 1 version-decay; PITFALL 3 terminology (lines 66-84 Work Profile collision row + line 83 Google-canonical preference); PITFALL 9/11 append-only + shared-file modification guard
- `.planning/research/SUMMARY.md` — **Phase 37 section lines 201-213 NEEDS CORRECTION per D-02** (remove runbook 19 from deliverables; remove "+ L2" from section header); research flag lines 212-213 + 329-330
- `.planning/research/STACK.md` — frontmatter schema; source hierarchy; 60-day review cycle

### Phase 34 Foundation (shipped 2026-04-21 — locked decisions feed Phase 37)

- `.planning/phases/34-android-foundation/34-CONTEXT.md` — Phase 34 locked decisions: tri-portal admin template (D-16..D-22; BYOD OMITS ZT portal H4 via D-17 HTML-comment subtractive-deletion pattern), tri-portal shorthand, mode labels, AEAUDIT-04 no-"supervision" guard, 60-day review cycle, cross-platform callout pattern D-10, Anti-Pattern 1 matrix guard D-26
- `docs/_glossary-android.md` (Phase 34) — term anchors: `#byod`, `#work-profile`, `#managed-google-play`, `#amapi`, `#play-integrity`, `#fully-managed` (for privacy-boundary corporate-mode contrast)
- `docs/_templates/admin-template-android.md` (Phase 34) — structural template; BYOD OMITS "In Zero-Touch portal" H4 sub-section per subtractive-deletion pattern
- `docs/android-lifecycle/00-enrollment-overview.md` (Phase 34) — cross-reference target for BYOD mode definition
- `docs/android-lifecycle/02-provisioning-methods.md` (Phase 34) — BYOD row is filtered-row cross-reference target for D-06a Company Portal/web enrollment methods
- `docs/android-lifecycle/03-android-version-matrix.md` (Phase 34) — Android minimum version lookup (BYOD 5.1+ or 8.0+; plan-time research flag)

### Phase 35 Prerequisites (shipped 2026-04-22 — locked decisions feed Phase 37)

- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-CONTEXT.md` — **D-13 hybrid-placement pattern** (subsection + inline; Round 1 Area 3 3C winner's structural basis); **D-22 Phase 35/39 stub-then-extend model** (not applicable to Phase 37 → 41 per D-01 distinction); D-17/D-23 stable-anchors precedent
- `docs/admin-setup-android/00-overview.md` (Phase 35) — BYOD branch of the 5-mode mermaid flowchart; Phase 37 is the target of the BYOD branch
- `docs/admin-setup-android/01-managed-google-play.md` (Phase 35) — **Phase 37 admin doc Prerequisites block references `#bind-mgp`, `#account-types`, `#disconnect-consequences`** — never restates MGP binding mechanics

### Phase 36 COBO (shipped 2026-04-22 — locked decisions feed Phase 37)

- `.planning/phases/36-fully-managed-cobo-admin/36-CONTEXT.md` — **D-03 COPE Migration Note placement** (after overview, before decision surface — Phase 37 D-05 AMAPI placement adapts this); **D-05 Android 15 FRP placement** (after enrollment-profile, post-enrollment hardening); D-08 Key Concepts subsection pattern (Phase 37 D-12 Key Concepts adopts); **D-10 12-anchor list** (Phase 37 D-06 partial-lock-5 pattern is a precedent adaptation); D-11 length allocations; D-13 frontmatter; **D-15..D-17 research-flag verification + MEDIUM-confidence labeling protocol** (Phase 37 D-17..D-19 extends); code_context Phase 36 adversarial-review evidence hierarchy
- **`docs/admin-setup-android/03-fully-managed-cobo.md`** (shipped Phase 36) — **verified 11 explicit `<a id="...">` HTML-id anchor tags** (D-06 anchor scaffolding precedent); verified MEDIUM-confidence HTML-comment markers at lines 53/66/191 (D-10 precedent basis + deliberate advancement rationale); length 3684 words within Phase 36 2800-3800 target; **NO `#audience-callout` anchor** (D-06 secondary-discretionary rationale for F-7a-02 flaw evidence); serves as cross-link target for Phase 37 privacy-boundary `#fully-managed` corporate-mode contrast

### v1.3 Validated Precedents (structural templates)

- `docs/admin-setup-ios/08-user-enrollment.md` — **PRIMARY structural template** for BYOD admin doc shape. iOS User Enrollment is the closest iOS analog for BYOD Work Profile (personal device + work profile partition pattern). 2670-word admin-audience doc; Phase 37 admin target 3000-4000 (larger to accommodate D-03 privacy table + D-05b data transfer table + D-05 AMAPI hybrid callout). iOS 08 privacy boundary section (~230 words) is the length calibration for D-03 admin canonical.
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — Key Concepts subsection pattern (Phase 37 D-12 item 4)
- `docs/_templates/admin-template-ios.md`, `docs/_templates/admin-template-macos.md` — HTML-comment subtractive-deletion pattern precedent

### External Authoritative Sources (plan-time / execute-time verification targets)

- **Microsoft Community Hub — AMAPI migration announcement**: `https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-policy-implementation-and-web-enrollment-for-android-personally-owned-work-p/4370417` — per PITFALLS.md line 220; MEDIUM confidence (D-10 marker convention); primary evidence for AMAPI-migration D-05 callout content
- **Microsoft Learn — Android Enterprise personally-owned work profile enrollment** — HIGH confidence authoritative source for D-06a enrollment steps; plan-time researcher locates specific URL
- **Microsoft Learn — Troubleshoot Android Enterprise device enrollment** (per PITFALLS.md line 465) — HIGH confidence, source for D-06b top-5 error messages
- **Google Android Enterprise Help — Work Profile management** — HIGH confidence for personal-partition privacy boundary rationale
- **Jason Bayton — Android Enterprise provisioning methods** (per PITFALLS.md line 467) — MEDIUM confidence, community reference for BYOD enrollment edge cases

### Cross-Platform Navigation (for awareness only — NOT modified in Phase 37 per D-16)

- `docs/index.md` — navigation hub (Android stub integration deferred to Phase 42)
- `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — cross-platform routing (Android integration deferred post-v1.4 per PROJECT.md)
- `docs/_glossary-macos.md` — see-also back to `_glossary-android.md` is Phase 42 (AEAUDIT-03) scope

### Adversarial Review Artifact

- `.planning/phases/37-byod-work-profile-admin-end-user/37-DISCUSSION-LOG.md` — full two-round adversarial-review audit trail (Round 1: 4 gray areas / 48 flaws / 4 Adversary disproves / 4 winners declared on lowest-real-flaw basis. Round 2: 4 gray areas / 118 flaws / 4 Adversary disproves / 4 winners declared)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phases 34-36 + v1.0-v1.3)

- **Admin template** (`docs/_templates/admin-template-android.md`, Phase 34) — drives `docs/admin-setup-android/04-byod-work-profile.md`. "In Intune admin center" and "In Managed Google Play" H4 sub-sections retained; "In Zero-Touch portal" H4 sub-section OMITTED via HTML-comment subtractive-deletion pattern (Phase 34 D-17). BYOD is a GMS mode that does NOT use ZT portal (PITFALL 10 guidance line 278).
- **Android glossary** (`docs/_glossary-android.md`, Phase 34) — load-bearing anchor targets for BYOD prose: `#byod` (load-bearing for D-06d first-use parenthetical cross-link), `#work-profile`, `#managed-google-play`, `#amapi`, `#play-integrity` (for SC3 "Play Integrity not SafetyNet" lock), `#fully-managed` (for privacy-boundary corporate-mode contrast row context).
- **Enrollment overview** (`docs/android-lifecycle/00-enrollment-overview.md`, Phase 34) — cross-reference target for BYOD mode-definition anchor (`#byod` in glossary; `#work-profile` in overview).
- **Provisioning-method matrix** (`docs/android-lifecycle/02-provisioning-methods.md`, Phase 34) — BYOD row is the filtered-row cross-reference target for D-06a Company Portal enrollment method. Phase 37 admin doc references, never duplicates.
- **Version matrix** (`docs/android-lifecycle/03-android-version-matrix.md`, Phase 34) — BYOD minimum Android version lookup (research flag; 5.1+ per research SUMMARY.md vs 8.0+ practical — verify at plan time).
- **Phase 35 MGP binding doc** (`docs/admin-setup-android/01-managed-google-play.md`) — Phase 37 admin doc Prerequisites block references `#bind-mgp`, `#account-types`, `#disconnect-consequences` as upstream prereq gates.
- **Phase 36 COBO doc** (`docs/admin-setup-android/03-fully-managed-cobo.md`, shipped 2026-04-22) — **reusable precedent patterns**:
  - 11 explicit `<a id="...">` HTML-id anchor tags (evidence for D-06 anchor scaffolding convention);
  - MEDIUM-confidence HTML-comment markers at lines 53, 66, 191 (D-10 precedent basis; Phase 37 D-10 deliberately advances to reader-visible inline markers per SC4 "labeled");
  - `#fully-managed` H2 heading for corporate-mode contrast in D-03 privacy-boundary "why different from COBO" framing;
  - 3684-word admin doc within 2800-3800 target (Phase 37 calibration for 3000-4000);
  - NO `#audience-callout` anchor (evidence for D-06 secondary-discretionary decision; audience content is opening blockquote not anchored section).
- **Frontmatter schema** — `last_verified`, `review_by`, `platform`, `audience`, `applies_to` established across 118+ docs. Phase 37 admin doc uses `platform: Android / audience: admin / applies_to: BYOD`. **Phase 37 end-user doc introduces `audience: end-user` as a NEW enumeration value** (D-08).
- **Platform gate blockquote pattern** — `> **Platform gate:** This guide covers Android Enterprise BYOD (personally-owned) Work Profile enrollment through Microsoft Intune. For corporate-owned Fully Managed (COBO) enrollment, see [docs/admin-setup-android/03-fully-managed-cobo.md]. For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).`
- **"How to Use This Guide" audience-routing** — precedent from iOS `08-user-enrollment.md`; Phase 37 admin doc adopts adapted form.
- **Key Concepts Before You Begin subsection** — precedent from iOS `03-ade-enrollment-profile.md` lines 24-47 and Phase 36 D-08. Phase 37 admin doc `## Key Concepts` (D-12 item 4) uses this pattern for work-profile-is-personal-partition + terminology disambiguation.
- **Cross-platform callout pattern** (Phase 34 D-10) — per-term Android-definition blockquote with cross-platform note. Phase 37 admin doc applies to: Work Profile (contrast with iOS User Enrollment; PITFALLS line 68 collision); BYOD (Android-native, no iOS/macOS analog); Managed Google Play (contrast with Apple VPP); Microsoft Intune app (new Android-specific management-app context post-AMAPI).
- **iOS analog `docs/admin-setup-ios/08-user-enrollment.md`** — closest cross-platform precedent for BYOD admin-doc shape. 2670-word admin-audience doc; privacy boundary section ~230 words is length calibration for D-03 admin canonical. Phase 37 does NOT cross-reference this doc per D-16 (no cross-platform nav in v1.4).

### Established Patterns

- **60-day review cycle** — inherited from Phase 34/35/36.
- **Source-hierarchy confidence attribution** — HIGH: Microsoft Learn (authoritative for Intune-specific admin steps); HIGH: Google Android Enterprise Help (authoritative for Android platform mechanics); MEDIUM: Microsoft Community Hub blog (e.g., techcommunity AMAPI announcement 4370417); MEDIUM: Jason Bayton bayton.org; LOW: community blogs. Phase 37 D-10 inline marker convention extends Phase 36 D-17 from HTML-comment to reader-visible inline.
- **Anti-Pattern 1 guard** — matrices live in canonical reference docs. Phase 37 rigorously applies for Phase 34 matrices (provisioning-method, version) via filtered-row link. **Exception**: D-05b 6-row data transfer table is admin-doc-scoped (no upstream canonical doc exists; creating one is scope creep per F-6c-01/02/03); 6a is the canonical form, not a duplicate.
- **PITFALL 1 version-tag discipline** — every behavioral assertion carries an inline version tag (D-05b per-row version tags; D-10 per-assertion confidence markers for AMAPI-affected content).
- **PITFALL 2 what-breaks pattern** — per-setting callouts inline at point of admin decision. 6 direction settings in D-05b each have their own "What breaks" cell.
- **PITFALL 6 tier-inversion** — end-user self-service guide template with admin sidebar (D-07 item "For IT helpdesk agents" + D-09 SC2 guardrail).
- **PITFALL 8 AMAPI** — first major callout + source-hierarchy labeling (D-05 + D-10).
- **PITFALL 9 / PITFALL 11 guard** — no v1.0-v1.3 shared-file modifications (D-16).
- **Phase 35 D-13 hybrid-placement** — subsection + inline; Phase 37 D-05 AMAPI callout hybrid is a direct adaptation (banner + H2 + inline reminders).
- **Phase 36 D-03 migration-note placement** — after overview, before decision surface; Phase 37 D-05 AMAPI H2 placed after Key Concepts, before Prerequisites (adapted for BYOD-doc ordering).
- **Phase 36 D-10 verbatim anchor list** — Phase 37 D-06 adapts to partial-lock (5 mandatory + secondary discretionary) because Phase 37 has NEW content without pre-shipped anchor precedent (data transfer controls) and Phase 40/41 PLAN.md don't exist yet for full consumer derivation.

### Integration Points

- `docs/admin-setup-android/` — directory created in Phase 35. Phase 37 adds **`04-byod-work-profile.md`**. File numbering: 00 (Phase 35), 01 (Phase 35), 02 (Phase 35), 03 (Phase 36), **04 (Phase 37)**, 05 (Phase 38), 06 (Phase 39 AOSP stub).
- **`docs/end-user-guides/` — NEW directory created in Phase 37.** Phase 37 adds `android-work-profile-setup.md` as the FIRST file in this new 4th documentation tier. Phase 37 sets the end-user tier template for future iOS/macOS/Windows BYOD end-user guides (D-07 shape precedent; D-08 `audience: end-user` frontmatter enum new value; D-09 SC2 admin-sidebar guardrail).
- **Anchor stability contract with Phase 40 and Phase 41**: D-06 mandatory-5 anchors (`#key-concepts`, `#amapi-migration`, `#enrollment-restrictions`, `#work-profile-policy`, `#privacy-boundary`) are consumed by:
  - **Phase 40 L1 runbook 23** ("Work profile not created", AEL1-03) — references admin-doc `#enrollment-restrictions` for admin verification guidance + `#work-profile-policy` for policy-side checks + end-user-doc anchor for user-facing escalation
  - **Phase 41 L2 runbook 19** ("Android enrollment investigation", AEL2-02) — references admin-doc `#enrollment-restrictions` + `#amapi-migration` + `#privacy-boundary` for diagnostic scope + execution context
- **Phase 38 Dedicated admin guide anchor collision check**: Phase 38 `docs/admin-setup-android/05-dedicated-devices.md` will use similar section names (enrollment restrictions, work profile policy is N/A for Dedicated). Cross-phase anchor collision is file-scoped (anchors are per-file), so no collision risk; Phase 38 free to reuse section names in its own file.
- **Phase 42 milestone audit dependencies** (AEAUDIT-04): Phase 37 must (a) carry `last_verified` frontmatter on BOTH docs; (b) zero "SafetyNet" occurrences (Play Integrity only); (c) zero "supervision" as Android term; (d) zero modifications to v1.0-v1.3 shared files; (e) D-11 inline-marker regex audit grep must be added to Phase 42 AEAUDIT-04 spec; (f) D-04 privacy-boundary topic-parity grep on 4 keywords across both docs; (g) D-09 SC2 guardrail grep `grep -E "Devices >|Apps >|> Enrollment" docs/end-user-guides/android-work-profile-setup.md` returns zero hits.
- **Phase 34/35/36 admin-setup-android directory structure verification**: before Phase 37 PLAN authoring, confirm `docs/admin-setup-android/00-overview.md`, `01-managed-google-play.md`, `02-zero-touch-portal.md`, `03-fully-managed-cobo.md` are merged (all shipped per STATE.md). If upstream shifts during Phase 37 planning, defer PLANs until anchors are stable.
- **Correction-commit coordination** (D-02): Phase 37 PLAN.md task list MUST include the STATE.md line 75 + SUMMARY.md lines 201/208 + ROADMAP.md line 195 correction as an explicit task; executor lands corrections in same commit as Phase 37 CONTEXT deliverables (or in an immediately-adjacent dedicated correction commit) so the record remains internally consistent.

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence (Round 1)

- **Phase 41 DAG alignment (D-01)**: ARCHITECTURE.md Q8 prerequisite DAG (lines 442-450) is the source-of-truth on file placement in the 6-phase build order. STATE.md line 75's "honoring DAG" citation was backwards — the DAG places runbook 19 in Phase 6 L2 grouping, which maps to v1.4 Phase 41, not v1.4 Phase 37. Option 1B realigns STATE.md + SUMMARY.md + ROADMAP.md to the DAG's own structure.

- **Canonical privacy table in admin + plain-language mirror in end-user (D-03)**: Phase 36 D-03 (COPE Migration Note) + D-05 (Android 15 FRP warning) ship canonical-plus-summary patterns for migration content at the mode-guide level without external canonical docs — Phase 37 D-03 reuses this pattern for privacy-boundary content. Anti-Pattern 1 (Phase 34 D-26) is narrowly scoped to matrices that have a canonical upstream home; privacy-boundary has no upstream canonical so admin doc IS the SSOT, not a duplicate.

- **AMAPI hybrid placement (D-05)**: Phase 35 D-13 hybrid-placement (subsection + inline) + Phase 36 D-03 after-overview-before-decision-surface placement combine into the Phase 37 D-05 three-part structure (banner + H2-after-Key-Concepts + inline reminders at settings). The H2 at `Key Concepts → AMAPI Migration → Prerequisites` slot is the BYOD-doc adaptation of Phase 36 D-03's `Overview → COPE Migration Note → Enrollment Profile` ordering — both place migration context BEFORE the decision surface, as PITFALL 8 intent demands.

### From Adversarial Review Evidence (Round 2)

- **6-row direction table is the canonical form for data transfer controls (D-05b)**: SC1 "direction" is load-bearing; prose-grouping (6b) cannot mechanically guarantee directional coverage; 3×3 table (6d) collapses directions; reference-only (6c) creates scope-creep canonical dependency that doesn't exist. 6a's 6-row table IS the canonical form precisely because no upstream canonical data-transfer matrix exists. Phase 36's HTML-id scaffolding pattern (11 shipped anchors in 03-fully-managed-cobo.md) provides row-level anchor stability.

- **End-user hybrid structure 800-1500 words (D-07)**: Strict short (5a-i 700-1200) has content-envelope floor-math collision; FAQ (5a-ii) voice inverts tier hierarchy via SC2 portal-step leak in Q&A reflex; long split-style (5a-iii) upper bound hits admin-doc floor, plain-audience accessibility collapses. 5a-iv inherits Phase 35 D-13 hybrid-placement structural pattern (pattern is not audience-specific — Phase 36 D-07 reuses it across admin + end-user tiers implicitly).

- **Partial anchor lock bridges Phase 36 D-10 and planner autonomy (D-06)**: 7c's 5 mandatory anchors are the subset that (a) SC1/SC2/SC3 explicitly name (privacy boundary, AMAPI migration, work profile policy), (b) are load-bearing for tier-inversion (Key Concepts for terminology setup), or (c) are explicit downstream consumer targets (enrollment restrictions for Phase 40 L1 runbook 23). Secondary anchors are planner discretion because (a) they may change post-Gray-Area-6 (data transfer), (b) they depend on research-flag outcomes (AMAPI UI paths), or (c) they don't have explicit downstream consumers.

- **Reader-visible inline confidence markers satisfy SC4 "labeled" verb (D-10)**: Phase 36 D-17 MEDIUM-confidence labeling uses HTML comments (source-visible but not rendered). AEBYOD-02 SC4 explicitly requires "labeled with a confidence marker AND last_verified date" — the verb "labeled" implies reader-visibility. Phase 37 D-10 advances Phase 36 D-17 from HTML-comment to rendered inline brackets. This is a deliberate refinement, not a divergence.

### Cross-Platform Callout Pattern (inherited from Phase 34 D-10)

Applied to Phase 37 admin doc where Android terms are used:

- **BYOD Work Profile** — PITFALLS line 68 flags Work Profile cross-platform collision; Phase 37 D-06d first-use parenthetical + glossary `#byod` cross-link satisfies disambiguation. No iOS direct analog (User Enrollment is closest but structurally different).
- **Managed Google Play (MGP)** — brief cross-platform note (contrast with Apple VPP + MDM).
- **Microsoft Intune app** — new Android-specific post-AMAPI management app (contrast with iOS Intune company portal role; no direct analog). First-use parenthetical on the term in the AMAPI H2.
- **Play Integrity** — Android-native (deprecated SafetyNet replacement January 2025). AEAUDIT-04 milestone audit greps for zero "SafetyNet" occurrences.
- **Work profile** — Android-native technical construct; distinct from iOS "User Enrollment" partition (separate concept).

### What-Breaks Callout Coverage

Admin doc per-setting what-breaks callouts (PITFALL 2 inheritance):
- **Enrollment restrictions** — "What breaks: personal Android not blocked when organization requires work-profile-only enrollment; users inadvertently enroll as BYOD via personal Gmail account with no policy applied."
- **Work profile policy assignment** — "What breaks: work profile policy assigned to a group that excludes the BYOD user population; enrollment succeeds but no policy applies."
- **Data transfer direction settings (6 rows, D-05b)** — per-row what-breaks column.
- **Wi-Fi policy (post-AMAPI)** — "What breaks: Wi-Fi policy uses username/password authentication; breaks at deployment post-April-2025 with opaque auth-fail error on device. Certificate-based auth required."
- **Management app selection** — "What breaks: End-user instructed to install Company Portal instead of Microsoft Intune app; enrollment flow divergence; some policies not delivered. Post-AMAPI the two apps have different roles."

### Known PITFALLS.md patterns to apply

- **PITFALL 1 version decay**: every behavioral assertion version-tagged; D-10 confidence markers cover AMAPI-affected content; Play Integrity only (no SafetyNet); BYOD minimum Android version (5.1+ vs 8.0+ — research flag).
- **PITFALL 2 what-breaks per setting**: inherited; applied per every configurable setting.
- **PITFALL 3 terminology**: BYOD (Work Profile) with first-use parenthetical "personally-owned work profile" (D-06d); no "supervision" (AEAUDIT-04 grep verifies).
- **PITFALL 6 tier inversion**: end-user self-service guide + admin sidebar (D-07 / D-09).
- **PITFALL 8 AMAPI migration**: D-05 hybrid placement + D-10 source-confidence inline markers; web enrollment path covered (PITFALL 8 line 224 warning sign guard).
- **PITFALL 9 / PITFALL 11**: no modifications to v1.0-v1.3 shared files (D-16).

</specifics>

<deferred>
## Deferred Ideas

Ideas that surfaced during adversarial review but belong in other phases, other milestones, or separate tracking:

- **Full pre-AMAPI BYOD migration path** — deferred. Phase 37 content is post-April-2025 only per AEBYOD-02 SC4. Migration from a pre-AMAPI BYOD deployment to post-AMAPI is a candidate v1.4.1 operational-content phase (no consumer confirmed).
- **Knox Mobile Enrollment BYOD integration** — deferred to v1.4.1 per PROJECT.md Key Decisions. Phase 37 does NOT reference KME. BYOD does not use Knox ME.
- **Corporate-owned Work Profile (WPCO) admin path** — deferred to v1.4.1 per PROJECT.md Key Decisions. Phase 37 BYOD is personal-owned; WPCO is corporate-owned personally-partitioned (Google recommends WPCO per Phase 36 D-03). Phase 37 does NOT cover WPCO.
- **BYOD L1 runbook 23** ("Work profile not created") — Phase 40 (AEL1-03) owns per ROADMAP line 186. Phase 37 provides the admin-guide anchor targets (`#enrollment-restrictions`, `#work-profile-policy`) and end-user "If something goes wrong" top-5 context but does NOT carry L1 runbook content.
- **BYOD L2 runbook 19** ("Android enrollment investigation") — **Phase 41 owns per D-01**. Phase 37 provides admin-guide anchor targets (`#enrollment-restrictions`, `#amapi-migration`, `#privacy-boundary`) for runbook 19 cross-reference but does NOT carry L2 content.
- **AOSP-mode provisioning** — Phase 39 AOSP stub (AEAOSP-01). Phase 37 does NOT reference AOSP.
- **Dedicated device provisioning** — Phase 38 (AEDED). Phase 37 explicitly NOT Dedicated scope.
- **Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference** — Phase 42 (AEAUDIT-03) scope. Phase 37 does NOT modify `_glossary-macos.md`.
- **Cross-platform nav integration** (Android stub in `docs/index.md`, `common-issues.md`, quick-refs) — post-v1.4 unification task per PROJECT.md. Phase 37 does NOT modify v1.0-v1.3 shared files.
- **iOS User Enrollment → Android BYOD Work Profile comparison document** — cross-platform comparison deferred to v1.5 per PROJECT.md Key Decisions.
- **4-platform comparison document** — v1.5 per PROJECT.md. Phase 37 does not pre-empt.
- **Screenshots for end-user tier** — 4c-ii rejected per D-06c text-first lock. Future end-user guides (iOS/macOS/Windows) may revisit if binary-asset hygiene tooling exists; Phase 37 sets text-first precedent.
- **Box-drawing / ASCII-art diagrams** — 4c-iii rejected per accessibility concerns (screen readers). Not revisited absent an accessibility-first solution.
- **Per-section last_verified frontmatter extension** — 8c rejected per frontmatter-schema-uniformity guard. File-level `last_verified` stands.
- **Privacy boundary canonical as shared data file** — 2D rejected per new-infra scope creep. Markdown canonical table in admin doc stands.
- **FAQ-style end-user guide** — 5a-ii rejected per SC2 portal-step leak risk and tier-hierarchy inversion. Linear-with-inset (5a-iv) stands.
- **Web enrollment as primary path** — 4a-ii rejected per research-flag gate uncertainty. Company Portal primary + web sidebar (4a-iii) stands until research flag 2 resolves; if plan-time research finds MS Learn fully documents web enrollment as co-equal first-class, future review may revisit.
- **Full user-side troubleshooting in end-user doc** — 4b-iii rejected per Phase 40 scope violation. Top-5 + helpdesk routing (4b-ii) stands.
- **Canonical BYOD data-transfer matrix as a new upstream reference doc** — 6c rejected per scope creep + no-existing-canonical rationale. 6a admin-doc-scoped canonical 6-row table stands until such upstream reference is independently scoped (not v1.4).
- **Management app change end-user experience screenshots** — covered by D-06c text-first; end-user enrollment description uses bold UI text ("Tap **Sign In**"), no screenshots.
- **Intune admin center BYOD policy blade visual tour** — covered by D-16 / D-06c; admin doc uses text-first narrative without screenshots (admin-tier text-first policy inherited from v1.0-v1.3).

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 37` returned zero matches.

</deferred>

---

*Phase: 37-byod-work-profile-admin-end-user*
*Context gathered: 2026-04-22*
*Method: adversarial-review skill (finder → adversary → referee) — 2 rounds, 166 total flaws evaluated across 8 gray areas, 8 winners selected on lowest-real-flaw basis (1B / 2A / 3C / 4a-iii / 4b-ii / 4c-i / 4d-iii / 5a-iv / 6a / 7c / 8d).*
