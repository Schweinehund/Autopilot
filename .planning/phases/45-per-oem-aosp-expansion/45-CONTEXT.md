# Phase 45: Per-OEM AOSP Expansion — Context

**Gathered:** 2026-04-25
**Status:** Ready for planning
**Method:** 4-area 3-agent adversarial review (Finder / Adversary / Referee × 4 gray areas; 12 agents in 3 parallel waves) following Phase 39 + Phase 44 precedent. Per-area winners: GA1=1B / GA2=2B / GA3=3B / GA4=4A.

<domain>
## Phase Boundary

Phase 45 lifts the v1.4 hard-scoped AOSP stub (`docs/admin-setup-android/06-aosp-stub.md`, 696 words, 9-H2 whitelist locked) into real per-OEM coverage across 5 specialty-hardware OEMs while preserving the Phase 39 PITFALL-7 "not supported under AOSP" framing throughout. Scope:

**Five new per-OEM admin guides (REQUIREMENTS.md AEAOSPFULL-01..05):**
- `docs/admin-setup-android/09-aosp-realwear.md` — RealWear HMT-1, HMT-1Z1, Navigator 500; Wi-Fi-credentials-embedded-in-QR REQUIRED; Intune-direct OR hybrid with RealWear Cloud (Workspace Basic/Pro tier disambiguation)
- `docs/admin-setup-android/10-aosp-zebra.md` — Zebra WS50; OEMConfig-via-Intune-APK path (NOT Managed Google Play); StageNow desktop tool optional for profile generation
- `docs/admin-setup-android/11-aosp-pico.md` — Pico 4 Enterprise, Neo3 Pro/Eye; Enterprise SKU required (not consumer Pico 4); Pico Business Suite optional coexistence
- `docs/admin-setup-android/12-aosp-htc-vive-focus.md` — HTC Vive Focus 3, XR Elite, Focus Vision; direct-QR Intune flow (simplest of AR/VR OEMs); 3-model firmware minimum matrix
- `docs/admin-setup-android/13-aosp-meta-quest.md` — Meta Quest 2/3/3s/Pro; 4-portal pattern (Intune + Meta for Work; MGP/ZT N/A); Meta Horizon Managed Services subscription gate; regional restrictions per model; Feb 20, 2026 Meta Horizon wind-down re-verification gate at plan time

**One new reference doc (AEAOSPFULL-06):** `docs/reference/aosp-oem-matrix.md` — OEM × capability dimensions matrix (4 narrow tables grouped by capability per GA3 winner)

**Two new runbooks (AEAOSPFULL-07, AEAOSPFULL-08):**
- `docs/l1-runbooks/29-android-aosp-enrollment-failed.md` — single AOSP runbook with 5 OEM-scoped Causes A-E + aggregate `## Escalation Criteria` (per GA4 winner, mirrors Knox runbook 28 OEM-scoped pattern)
- `docs/l2-runbooks/23-android-aosp-investigation.md` — per-OEM Pattern A-E (1:1 routing from L1 Causes); Play Integrity 3-tier verdicts only; zero SafetyNet

**Atomic same-commit retrofits (AEAOSPFULL-09):**
- `docs/admin-setup-android/06-aosp-stub.md` deferred-content table COLLAPSED (PITFALL-7 framing + 9-H2 whitelist + `## Supported OEMs` enumeration PRESERVED)
- `docs/reference/android-capability-matrix.md:121-127` `#deferred-full-aosp-capability-mapping` anchor filled with link to `aosp-oem-matrix.md` (per AEAOSPFULL-09 "link to" verbatim)
- `docs/decision-trees/08-android-triage.md` ANDE1 escalation stub replaced by ANDR29 resolved click-link (single click target preserves Phase 40 D-05 LOCK + ROADMAP SC#4 singular wording)
- `docs/android-lifecycle/02-provisioning-methods.md` — surface 90-day AOSP token ceiling + per-OEM firmware rows in version matrix
- `docs/l1-runbooks/00-index.md` — append-only Android section update for runbook 29
- `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` DELETED in Phase 45 final commit (per Phase 43 D-20 lifecycle contract)

**Out of scope (deferred to other phases / milestones):**
- DigiLens, Lenovo, Vuzix per-OEM coverage (on MS Learn AOSP supported list but not in Phase 45 5-OEM scope per REQUIREMENTS.md AEAOSPFULL-01..05)
- Vendor-proprietary MDM deep docs (ArborXR / ManageXR / Ivanti / Omnissa) — locked Out of Scope per REQUIREMENTS.md
- RealWear HMT-1Z1 intrinsically-safe hardware certification — locked Out of Scope (hardware-docs scope)
- Consumer Pico 4 / consumer HTC Vive variants — locked Out of Scope (enterprise SKUs only)
- Zebra MX schema deep documentation — locked Out of Scope (vendor-owned)
- AOSP user-associated vs userless mode admin-guide-level disambiguation beyond per-OEM hint (deferred to Phase 47 integration if required)
- Cross-platform analogs (e.g., "iOS equivalent of AOSP?") — out of locked Phase 45 scope
- AOSP harness mechanical checks (AEINTEG-02 C6 PITFALL-7 / C7-equivalent for AOSP terms) — Phase 47 owns; informational-first per D-29

</domain>

<decisions>
## Implementation Decisions

### GA1 — Per-OEM Admin Doc Shape (D-01..D-05)

**Winner: Option 1B (Hybrid 8 fixed core + per-OEM REQUIRED add-ons), expanded to 11-H2 sibling-parity baseline**

- **D-01** — **Lock 11-H2 fixed core in fixed order** for all 5 per-OEM admin docs (`09-13`):
  1. `## Scope and Status` (PITFALL-7 framing inline at top)
  2. `## Hardware Scope` (models + firmware minimums)
  3. `## Prerequisites and Licensing`
  4. `## Enrollment Method` (QR-only / OEMConfig / 4-portal / etc.)
  5. `## Provisioning Steps` (step-numbered H3 children: `### Step 0 — ...`, `### Step 1 — ...` per Phase 44 D-02 sibling pattern)
  6. `## Verification`
  7. `## Common Failures`
  8. `## Renewal / Maintenance` (sibling parity per `02:214`, `03:218`, `05:249`, `07:193`)
  9. `## What Breaks Summary` (sibling parity per `03:197`, `05:229`, `07:202`)
  10. `## See Also`
  11. `## Changelog`

   **Why:** Referee GA1 expanded the 8-H2 hybrid core to 11 H2s after verifying every shipped sibling admin doc carries `## Renewal / Maintenance` and 3 of 4 carry `## What Breaks Summary`. The expansion restores sibling-parity without abandoning the H2-whitelist scope-guard precedent (Phase 39 D-11). Step-numbered H3 children inside `## Provisioning Steps` resolve the F-1B-MED-07 Step 0 omission while keeping the H2 contract clean.

- **D-02** — **Per-OEM REQUIRED add-on H2s** (added between H2 #5 `## Provisioning Steps` and H2 #6 `## Verification` unless otherwise noted):
  - **`09-aosp-realwear.md`**: `## Wi-Fi QR Embedding Walkthrough` (REQUIRED — preserves AEAOSPFULL-01 Wi-Fi-credentials-embedded-in-QR REQUIRED scope)
  - **`10-aosp-zebra.md`**: `## OEMConfig APK Push (Intune)` (REQUIRED — preserves AEAOSPFULL-02 OEMConfig-via-Intune-APK path; explicitly NOT Managed Google Play)
  - **`11-aosp-pico.md`**: `## Pico Business Suite Coexistence` (OPTIONAL — preserves AEAOSPFULL-03 literal "optional" wording)
  - **`12-aosp-htc-vive-focus.md`**: NO add-on H2s (preserves AEAOSPFULL-04 "simplest of AR/VR OEMs" framing)
  - **`13-aosp-meta-quest.md`**: `## Meta for Work Portal Setup` AND `## Meta Horizon Subscription Status` — BOTH REQUIRED REGARDLESS of Meta Horizon alive-status (override of F-1B-CRIT-01; per AEAOSPFULL-05 wind-down callout contract — see GA2 D-06)

   **Why:** Hybrid core + REQUIRED add-ons surface OEM-distinctive mechanics as first-class H2s (sibling pattern: `02:89` DPC Extras JSON earns own H2; `07:121` Step 5 DPC Custom JSON Data earns own H2). Audit harness check (informational-first per D-29) verifies core 11 + per-OEM REQUIRED add-on presence per file.

- **D-03** — **Universal banner contract**: Each doc opens with `> **Platform gate:** ...` + `> **Platform note:** ...` blockquotes BEFORE H1 (Phase 38 D-10 / Phase 34 D-21 precedent). Outside the H2 contract.

- **D-04** — **PITFALL-7 framing per-claim discipline**: Each "supported under AOSP" OEM assertion MUST pair with the AOSP baseline caveat at point-of-claim (Phase 39 D-13 + D-10 inheritance). Audit harness C6 PITFALL-7 preservation check is informational-first per D-29; per-claim discipline lives in plan-task-specs (planner enforces).

- **D-05** — **Anchor scaffolding contract**: Each doc publishes stable `<a id="..."></a>` anchors at minimum on `#prerequisites`, `#provisioning-steps`, `#verification`, `#renewal-maintenance`, `#what-breaks-summary`, plus per-OEM add-on anchors (`#wi-fi-qr-embedding`, `#oemconfig-apk-push`, `#pico-business-suite-coexistence`, `#meta-for-work-portal-setup`, `#meta-horizon-subscription-status`). Phase 47 AEINTEG-01 capability-matrix backlinks + AEAOSPFULL-08 L2-runbook-23 cross-links depend on these anchors per Phase 39 D-17 anchor-stability contract precedent.

### GA2 — Meta Horizon Strategy for `13-aosp-meta-quest.md` (D-06..D-10)

**Winner: Option 2B (Plan-time re-verification gate with branch-resolution rule + MEDIUM-marker fallback)**

- **D-06** — **Plan-time verification gate (Phase 39 D-22 reapplied)**: During Phase 45 plan-phase, researcher MUST verify Meta Horizon Managed Services wind-down status against authoritative sources — Meta Business Help, Meta for Work official channels — and at least one corroborating source (MS Learn AOSP supported-devices page, vendor-equivalent of Bayton FAQ). **Same-source MEDIUM community re-confirmation is INSUFFICIENT** per Phase 39 D-22 protocol. Findings recorded in `45-RESEARCH.md`.

- **D-07** — **Branch-resolution rule with MEDIUM-marker safe-default fallback**:
  - **Verified DISCONTINUED (HIGH-confidence authoritative)**: ship `13-aosp-meta-quest.md` with Intune-direct AOSP flow as primary + historical-context appendix (Meta Horizon pre-wind-down behavior) + the explicit Feb 20, 2026 callout per ROADMAP SC#3 (callout placed in `## Scope and Status` H2 as a `> ⚠️ ` blockquote matching `06-aosp-stub.md:23` precedent). The 4-portal pattern collapses to 2-portal (Intune + Managed Google Play absent / Meta absent / ZT absent) — document this as architectural note, not a forward-promise.
  - **Verified ALIVE (HIGH-confidence authoritative)**: ship `13-aosp-meta-quest.md` with full 4-portal pattern (Intune + Meta for Work; MGP/ZT N/A per AEAOSPFULL-05) WITH explicit Feb 20, 2026 wind-down re-verification callout AND Intune-direct fallback subsection. Subscription REQUIRED language preserved.
  - **Unresolvable at plan time**: apply Phase 39 D-20 source-confidence marker `[MEDIUM: <best source>, last_verified 2026-04-25]` on the wind-down assertion AND default to the dual-path (ALIVE) skeleton with explicit callout — bias-safe (preserves customer guidance for fleets with active subscriptions). NO plan-phase blocking; researcher proceeds with MEDIUM marker.

- **D-08** — **Locked deliverables PRESERVED across all branches** (override of F-2A-MED-03/-04 + alignment with REQUIREMENTS.md AEAOSPFULL-05):
  - 4-portal pattern documented (Intune + Meta for Work; MGP/ZT N/A)
  - Meta Horizon Managed Services subscription requirement documented (subscribed-fleet vs net-new clarification)
  - Regional restrictions per model documented (per-model H3 sub-anchors under `## Hardware Scope`)
  - Feb 20, 2026 wind-down re-verification callout MANDATORY in shipped doc regardless of branch
  - PITFALL-7 "not supported under AOSP" framing carry-forward (STATE.md "PITFALL-7 erosion (Phase 45)" Blocker)

- **D-09** — **Meta-for-Work approval gate (Phase 44 D-02 precedent reused)**: If verification reveals Meta Business approval/onboarding latency, render as `### Step 0 — Meta for Work account approval (<latency>)` H3 inside `## Provisioning Steps` (not standalone H2 — fits the 11-H2 contract from D-01). Top-of-step-sequence placement per Phase 44 KME B2B 1-2-business-day pattern.

- **D-10** — **One-off 30-day re-verify trigger for wind-down assertion**: 60-day Phase 34 D-14 cycle is calibrated for slow-drift content; wind-down date is a binary-cliff event. Document a 30-day re-verify trigger in `## Renewal / Maintenance` H2 of `13-aosp-meta-quest.md` for the Meta Horizon assertion specifically. Standard 60-day cycle still applies to all other content.

   **Why:** Referee GA2 verified that 2B is the only option literally satisfying both REQUIREMENTS.md AEAOSPFULL-05 ("plan-time re-verification gate") and ROADMAP SC#3 ("explicit Feb 20, 2026 wind-down re-verification callout with Intune-direct fallback guidance"). Adversary GA2 successfully disproved 3 of 4 2B-MED findings (paralysis, double-author, same-source-reuse) — Phase 39 D-22 protocol explicitly handles MEDIUM-marker fallback when researcher cannot determine status, so no actual planner-paralysis arises.

### GA3 — `aosp-oem-matrix.md` Shape (D-11..D-16)

**Winner: Option 3B (Multiple narrow tables grouped by capability — matches verified Android/iOS/macOS sibling pattern of 5 sub-tables under capability H2s)**

- **D-11** — **Four `## H2` sub-tables in fixed order** in `docs/reference/aosp-oem-matrix.md`:
  1. `## Hardware Scope` — OEM × device-models + minimum firmware
  2. `## Enrollment Method and Wi-Fi Embedding` — OEM × QR-only/OEMConfig + Wi-Fi REQUIRED|OPTIONAL
  3. `## Vendor Portals and Licensing` — OEM × vendor portal (REQUIRED|OPTIONAL|N/A) + Intune Plan tier (Plan 1 / Plan 2 / Suite)
  4. `## Intune AOSP Mode` — OEM × user-associated|userless support per MS Learn

   Each sub-table is OEM-as-row (5 rows: RealWear / Zebra / Pico / HTC / Meta) with capability-as-column. Mirrors verified sibling H2-grouping axis (`android-capability-matrix.md:11` "organized mode-first; columns = modes, rows = features" + 5 H2 sub-tables; iOS + macOS identical pattern). OEM-row axis is justified because OEMs ARE the entities being compared (analog to mode-as-column in sibling matrices).

- **D-12** — **Dimension fidelity**: All 5 AEAOSPFULL-06 verbatim dimensions ("enrollment methods, vendor portals required/optional, license tiers, Intune AOSP mode per-vendor, Wi-Fi embedding variance") appear as **named columns** across the 4 sub-tables. NO prose-Notes column anywhere (Phase 39 D-08 carry-forward). Per-OEM device-model lists (HMT-1, WS50, etc.) live in the `## Hardware Scope` cells as the row-key disambiguator.

- **D-13** — **PITFALL-7 placement**: Single `## Scope` H2 at top (above the 4 sub-table H2s) carries the "not supported under AOSP — use fully managed instead if GMS available" framing once. Do NOT repeat across sub-tables (PITFALL 12 scope-creep avoidance). Mirrors `06-aosp-stub.md:21-26` precedent.

- **D-14** — **Meta Horizon volatility handling via reference-style footnotes**: Use a Meta-row footnote anchor (e.g., `[^meta-volatility]`) under `## Vendor Portals and Licensing` and `## Enrollment Method and Wi-Fi Embedding` rows for Meta Quest. Footnote text contains the Feb 20, 2026 wind-down callout + Intune-direct fallback + plan-time re-verification gate reference. Markdown reference-style footnote — NOT a Notes column (D-08 compliance).

- **D-15** — **Source-confidence marker policy**: Per-OEM source-confidence pins live OUTSIDE the tables in a single `## Source Attribution` section at file bottom listing per-OEM `[HIGH|MEDIUM|LOW: source, last_verified YYYY-MM-DD]` lines. Inside-cell brackets BANNED (D-08 spirit + sibling matrix convention).

- **D-16** — **Cell-value rules** (closes 3B-MED-01 + 3B-LOW-02): Use literal strings (`Yes` / `No` / `REQUIRED` / `OPTIONAL` / `N/A` / `Plan 1` / `Plan 2` / `Suite`). NO `+` notation. Where a cell needs an exception or condition, attach a footnote `[^...]`, never inline prose.

   Frontmatter: `last_verified` + `review_by` (60-day cycle); `audience: admin`; `platform: Android`; `applies_to: AOSP`. Use `## Version History` H2 (NOT `## Changelog`) to align with sibling matrices (`android-capability-matrix.md:139`, `ios:103`, `macos:99`). AEAOSPFULL-09 anchor target per D-19 below.

   **Why:** Referee GA3 verified by reading sibling matrix files that the multi-sub-table-under-capability-H2 shape is the established pattern across Android/iOS/macOS reference matrices. Adversary GA3 decisively disproved 3B's CRITs: Anti-Pattern 1 is about CROSS-DOC duplication not within-doc table cardinality; AEAOSPFULL-09 verbatim wording is "link to" (file-level link, no section anchor required); REQUIREMENTS.md "table" is descriptive of the artifact-type, not normative singular cardinality.

### GA4 — L1/L2 Runbook Split + Triage Tree Integration (D-17..D-22)

**Winner: Option 4A (Single AOSP runbook 29 organized by OEM-scoped Causes A-E + aggregate `## Escalation Criteria` — mirrors Knox runbook 28 OEM-scoped pattern)**

- **D-17** — **L1 runbook 29 Cause structure** (`docs/l1-runbooks/29-android-aosp-enrollment-failed.md`): 5 OEM-scoped Causes A-E within AOSP scope mirroring `28-android-knox-enrollment-failed.md` KME-scoped pattern:
  - **Cause A** — RealWear enrollment failed (D-10 sectioned actor-boundary: Symptom / L1 Triage Steps / Admin Action Required / Verify / per-Cause Escalation; D-12 escalation packet)
  - **Cause B** — Zebra WS50 enrollment failed (D-10 + D-12)
  - **Cause C** — Pico enrollment failed (D-10 + D-12)
  - **Cause D** — HTC VIVE Focus enrollment failed (D-10 + D-12)
  - **Cause E** — Meta Quest enrollment failed (D-10 + D-12; cross-link to `13-aosp-meta-quest.md` Meta Horizon Subscription Status H2 for subscription-related failures)
  - PLUS unnamed `## Escalation Criteria` aggregate H2 mirroring `27:206-234` and `28:190-225` exactly (departure-from-Cause-E-precedent rationale: 5-OEM scope ≠ 4-failure-class scope).

- **D-18** — **L2 runbook 23 Pattern structure** (`docs/l2-runbooks/23-android-aosp-investigation.md`): Per-OEM Pattern A-E (Pattern A RealWear; B Zebra; C Pico; D HTC; E Meta Quest) mirroring `22-android-knox-investigation.md:113-254` Pattern + per-Pattern Microsoft Support escalation packet shape (token sync status / profile assignment state / enrollment profile GUID per Pattern). L1 Cause A→Pattern A, B→B, C→C, D→D, E→E (one-to-one per-OEM routing). Play Integrity 3-tier verdicts only; zero SafetyNet tokens.

- **D-19** — **Triage tree edit (single-target preserves D-05 LOCK + ROADMAP SC#4 verbatim wording)**: `docs/decision-trees/08-android-triage.md` Mermaid: AND1 AOSP branch → ANDR29 (single click target → `../l1-runbooks/29-android-aosp-enrollment-failed.md`). Single Routing Verification table row update (line `:100` "AOSP all paths" entry rewritten to point to Runbook 29 instead of "Escalate ANDE1"). NO new AND6 decision node. NO multi-terminal nodes.

- **D-20** — **In-runbook OEM-identification step** (deliberate departure from sibling-runbook no-pre-Cause-routing precedent): Insert a `## How to Use This Runbook` H2 BEFORE the Cause list, mirroring `27:30-39` "How to Use This Runbook" structure but adding: "Identify the device OEM (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest) — typically visible on device chassis or in Settings > About — then jump to the matching Cause." Departure rationale: AOSP scope spans 5 OEMs whereas ZTE/KME scope spans one provisioning-method-per-runbook. Document the departure in 45-PLAN.md to defuse F-4A-CRIT-03 (downgraded MED) at validator review time.

- **D-21** — **Cross-link anchor convention** (DEPENDENT on D-01 GA1 winner): Each Cause cross-links to its corresponding per-OEM admin guide H2 using `## Common Failures` anchor (per D-01 H2 #7). 45-PLAN.md task specs MUST verify per-OEM admin guide `## Common Failures` H2 ships before runbook 29 / 23 cross-links land. Wave structure (waves below) enforces this dependency.

- **D-22** — **Sibling-departure rationale entries (REQUIRED in 45-PLAN.md)**: Two explicit departure rationales — (a) 5-OEM Cause partitioning vs sibling 4-failure-class precedent; (b) in-runbook OEM-identification step vs sibling no-pre-Cause-routing precedent — must be captured to defuse F-4A-CRIT-01 + F-4A-CRIT-03 (both downgraded MED by Referee) at validator review time and prevent re-litigation in future per-OEM L1 runbook expansions (e.g., v1.5 Knox tablet/wearable variants).

   **Why:** Referee GA4 selected 4A on tiebreaker after 4A and 4B tied at 0 CRIT / 24 weighted. Decisive factors: (1) sibling-pattern fit — runbook 28 establishes that L1 runbooks CAN be scope-narrow (`Applies to KME only (Samsung)`); 4A's OEM-scoped Causes are a closer analog to 28's KME-scoped Causes; (2) ROADMAP SC#4 cross-link cleanness — 4A's per-OEM Cause structure naturally produces per-OEM cross-links in both L1 and L2 (one Cause → one admin guide); (3) F-4B-MED-03 unrebutted — symptom-routing forces multi-OEM cross-links per Cause (Zebra under Cause A AND Cause B), which sibling runbooks never do.

### Locked Carry-Forward Decisions (D-23..D-30)

These decisions are LOCKED by prior phases — Phase 45 inherits without re-litigation:

- **D-23 — PITFALL-7 framing carry-forward (Phase 39 D-10 + STATE.md Blocker)**: Every per-OEM "supported under AOSP" assertion across files 09-13, `aosp-oem-matrix.md`, runbook 29, runbook 23 MUST pair inline with the AOSP baseline caveat: "supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead." Phase 47 plans informational-first C6 harness regex check.

- **D-24 — `06-aosp-stub.md` 9-H2 whitelist preserved**: Phase 39 D-11 9-H2 whitelist remains LOCKED on the stub itself. Phase 45 only collapses the deferred-content table (per AEAOSPFULL-09); 9-H2 whitelist + PITFALL-7 framing + 8-OEM enumeration in `## Supported OEMs` + Platform note + scope blockquote ALL PRESERVED.

- **D-25 — Append-only contract on shared files (Phase 47 atomic-rebuild precedent)**: Phase 45 commits to `docs/reference/android-capability-matrix.md` (anchor fill at lines 121-127), `docs/admin-setup-android/00-overview.md` (Mermaid AOSP leaves), and `docs/_glossary-android.md` (any new AOSP-related terms) MUST be additive H2-block / H3-anchor / alphabetical-index additions. Phase 47 AEINTEG-01 owns atomic single-author rebuilds in Wave 1/2 pattern (mirrors v1.4 Phase 42 D-03 precedent).

- **D-26 — 60-day Android freshness rule (Phase 34 D-14)**: All new Phase 45 docs use `last_verified` + `review_by` (+60d) frontmatter. `13-aosp-meta-quest.md` carries an additional 30-day Meta Horizon re-verify trigger per D-10. Audit harness C5 freshness check applies.

- **D-27 — Frontmatter contract**: All 5 admin docs use `audience: admin`, `platform: Android`, `applies_to: AOSP` (single-string per Phase 37 D-15 / Phase 38 D-18 precedent). Both runbooks (29 + 23) use `audience: L1` / `audience: L2` respectively, `platform: Android`, `applies_to: AOSP`. Reference matrix uses `audience: admin`.

- **D-28 — Source-confidence marker regex (Phase 37 D-11 / Phase 39 D-20 inheritance)**: All MEDIUM/LOW-confidence assertions across Phase 45 deliverables carry `[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?]` markers. Plan-time researcher determines per-assertion confidence in `45-RESEARCH.md`.

- **D-29 — Shared-file modification guard (Phase 36/37/38/44 precedent)**: Phase 45 MUST NOT modify: `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/end-user-guides/`, `docs/_templates/`. Permitted writes: `docs/admin-setup-android/06-aosp-stub.md` (collapse deferred-content table), `docs/admin-setup-android/00-overview.md` (additive Mermaid leaf), new files 09-13, `docs/reference/aosp-oem-matrix.md`, `docs/reference/android-capability-matrix.md` (anchor fill at 121-127), `docs/decision-trees/08-android-triage.md` (single-row Mermaid + Routing Verification edit), `docs/android-lifecycle/02-provisioning-methods.md` (additive 90-day token + per-OEM firmware rows), `docs/_glossary-android.md` (additive AOSP-related entries), `docs/l1-runbooks/29-...md` + `docs/l1-runbooks/00-index.md` (append-only Android section), `docs/l2-runbooks/23-...md`. Phase 45 final commit DELETES `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` per Phase 43 D-20 lifecycle contract.

- **D-30 — Wave structure for plan parallelization** (anticipates `/gsd-plan-phase 45`):
  - **Wave 1** — 5 per-OEM admin docs in parallel (09-13). Each plan independent. Meta Quest doc (13) gates on D-06 plan-time re-verification gate result.
  - **Wave 2** — `aosp-oem-matrix.md` (depends on all 5 admin docs for column data) + `06-aosp-stub.md` deferred-content table collapse (independent of admin-doc waves; can shift earlier if scoped tightly).
  - **Wave 3** — L1 runbook 29 + L2 runbook 23 in parallel (both depend on all 5 admin docs' `## Common Failures` anchors per D-21).
  - **Wave 4** — Atomic same-commit retrofits: triage tree (08-android-triage.md ANDE1→ANDR29), capability matrix anchor fill (121-127), provisioning-methods matrix (90-day token + per-OEM firmware rows), L1 index Android section, glossary additive entries. Final commit also deletes `PHASE-45-AOSP-SOURCE.md`.

### Claude's Discretion

- **Exact word counts** within approximate envelope (per-OEM admin docs ~1500-2500 words each; matrix ~600-1000 words; L1 runbook 29 ~280-310 lines per Referee GA4 verification of sibling 28 length; L2 runbook 23 similar to sibling 22 ~305 lines).
- **Exact prose for PITFALL-7 framing pairings** (D-04 + D-23): planner authors per-claim, content discipline locked by D-23.
- **Mermaid diagram inclusion** in any per-OEM admin doc (e.g., RealWear Wi-Fi-QR-payload generation flow): not required; author's call.
- **`## See Also` cross-link composition**: targets within Phase 45 scope are natural; cross-links to Phase 35 ZT (`02-zero-touch-portal.md`), Phase 36 COBO (`03-fully-managed-cobo.md`), Phase 39 stub (`06-aosp-stub.md`) are recommended.
- **Footnote text composition** in `aosp-oem-matrix.md` per D-14: author's call within the locked content scope (Feb 20 wind-down + Intune-direct fallback + plan-time re-verify reference).
- **Per-OEM `## Common Failures` H2 internal structure** (table vs bullets vs sub-H3s): author's call; runbook 29 / 23 cross-links land at H2 anchor regardless.
- **Frontmatter `applies_to` value for runbook 29 / 23**: `AOSP` is the natural value; Phase 44 KME runbook used `KME` so single-mode-string convention permits `AOSP` here.
- **Wave 2 `06-aosp-stub.md` collapse timing**: Wave 2 is the natural slot but planner can shift earlier (Wave 0 / Wave 1 sibling) if collapse is decoupled from per-OEM admin docs.

### Folded Todos

None — `gsd-tools todo match-phase 45` returned 0 matches at discussion time (2026-04-25T05:42:56Z).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap

- `.planning/REQUIREMENTS.md` (search AEAOSPFULL-01..09) — 9 Phase 45 requirements with verbatim file paths, OEM specs, and SC contracts. AEAOSPFULL-05 verbatim wording for Meta Quest 4-portal pattern + Meta Horizon Managed Services + regional restrictions + Feb 20 2026 wind-down re-verification gate is load-bearing for D-06..D-10.
- `.planning/ROADMAP.md` lines 152-163 (Phase 45 entry — Goal + Depends + 5 success criteria + context risks). SC#3 verbatim "explicit Feb 20, 2026 wind-down re-verification callout with Intune-direct fallback guidance" anchors D-06/D-07. SC#4 verbatim "ANDE1 → ANDR29 resolved node with click-link" anchors D-19. SC#5 references `02-provisioning-methods.md` 90-day token + per-OEM firmware rows.
- `.planning/PROJECT.md` — vision; Out of Scope (DigiLens/Lenovo/Vuzix per-OEM, vendor-proprietary MDMs, RealWear intrinsically-safe, consumer Pico/HTC); v1.4.1 Key Decisions table.
- `.planning/STATE.md` — Phase 45 research flags (Meta Horizon wind-down volatility, per-OEM Wi-Fi embedding variance, Pico mid-2025 license terms, Intune Suite/Plan 2 AR/VR licensing, Zebra WS50 OEMConfig delivery); PITFALL-7 erosion Phase 45 Blocker; Meta Horizon volatility Blocker; D-29 informational-first audit-harness extension precedent.

### Phase 45 input artifact (Phase 43 → Phase 45 handoff)

- `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` — Verbatim RealWear deep content extracted from Phase 39 stub during Phase 43 AEAUDIT-04 trim. Lifecycle: Phase 45 final commit DELETES this file per Phase 43 D-20.

### Phase 39/43/44 prior phase contexts (locked decisions inherited)

- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-CONTEXT.md` — D-08 No-Notes-column matrix lock (carry-forward to D-12); D-10 PITFALL-7 framing mandate (carry-forward to D-23); D-11 9-H2 whitelist scope-guard precedent (architectural inheritance for D-01); D-13 Wi-Fi credential embedding RealWear discipline (anchor for D-02 RealWear add-on); D-17 anchor-stability contract pattern (anchor for D-05); D-20 source-confidence marker regex (anchor for D-28); D-22 research-flag verification protocol (anchor for D-06); D-26 Anti-Pattern 1 single-canonical-source matrix discipline (verified by GA3 Referee as cross-doc not within-doc).
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md` — D-14 60-day freshness inheritance (D-26 carry-forward); D-16/D-17/D-20 PITFALL-7 + 9-H2 + 8-OEM preservation in stub trim (D-24 carry-forward); D-19 no-forward-link from stub to prep shell (D-29 carry-forward); D-20 PHASE-45-AOSP-SOURCE.md lifecycle contract (D-29 carry-forward).
- `.planning/phases/44-knox-mobile-enrollment/44-CONTEXT.md` — D-02 Step 0 wait-gate H2 precedent (anchor for D-09 Meta-for-Work approval gate); D-03 anti-paste blockquote pattern (informational reference for any AOSP cross-portal anti-paste callouts); KME B2B 1-2-business-day Step 0 model (B2B onboarding latency template).

### Sibling shipped admin docs (Phase 45 must match patterns)

- `docs/admin-setup-android/02-zero-touch-portal.md` — sibling Step 0 H2 pattern (line 33); `## DPC Extras JSON Configuration` own-H2 precedent (line 89); `## Renewal / Maintenance` H2 (line 214); HTML-comment verify-UI pattern (lines 48, 50, 72, 73).
- `docs/admin-setup-android/03-fully-managed-cobo.md` — `## What Breaks Summary` H2 (line 197); `## Renewal / Maintenance` H2 (line 218); inline `> What breaks` blockquote callouts at action points.
- `docs/admin-setup-android/05-dedicated-devices.md` — `## What-breaks summary` H2 (line 229); `## Renewal / Maintenance` H2 (line 249); ARCH Q6 Platform note banner pattern (Phase 38 D-10 inheritance).
- `docs/admin-setup-android/06-aosp-stub.md` — current 9-H2 whitelist (LOCKED per D-24); PITFALL-7 framing in `## Scope and Status` (lines 21-26); 8-OEM enumeration in `## Supported OEMs` (lines 41-65); deferred-content table to be COLLAPSED per AEAOSPFULL-09.
- `docs/admin-setup-android/07-knox-mobile-enrollment.md` — most recent sibling precedent (Phase 44 shipped 2026-04-25); 7 step-numbered H2s (Step 0-6, lines 28-156) anchor D-01 step-numbered H3 children pattern; `## Renewal / Maintenance` H2 (line 193); `## What Breaks Summary` H2 (line 202); `## Knox SKU disambiguation (5 SKUs)` distinctive-content-as-H2 pattern (line 161); 4th-portal overlay narrative (anchor for Meta-for-Work + Meta Horizon as 4-portal extension).

### Sibling reference matrices (Phase 45 must match shape per D-11)

- `docs/reference/android-capability-matrix.md` — line 11 "organized mode-first; columns = modes, rows = features"; 5 H2 sub-tables (Enrollment line 13, Configuration line 27, App Deployment line 40, Compliance line 52, Software Updates line 63); line 121-127 `#deferred-full-aosp-capability-mapping` anchor TARGET for AEAOSPFULL-09 fill; line 139 `## Version History` (sibling convention; D-16 mandate).
- `docs/reference/ios-capability-matrix.md` — sibling matrix; same 5-H2-sub-table pattern (lines 13, 30, 44, 58, 70); line 103 `## Version History`.
- `docs/reference/macos-capability-matrix.md` — sibling matrix; same 5-H2-sub-table pattern (lines 13, 28, 42, 56, 68); line 99 `## Version History`.

### Sibling shipped runbooks (Phase 40/41/44 validator patterns LOCKED for D-17/D-18)

- `docs/l1-runbooks/27-android-zte-enrollment-failed.md` — Phase 40 multi-cause runbook precedent: 4 substantive Causes A-D + Cause E (escalate-only) inside `## Escalation Criteria` aggregate (lines 13, 39, 206-221); D-10 sectioned actor-boundary template (lines 43-83); `## How to Use This Runbook` structure (lines 30-39).
- `docs/l1-runbooks/28-android-knox-enrollment-failed.md` — Phase 44 single-OEM-scoped runbook precedent (`Applies to KME only (Samsung)` line 13); 4 substantive Causes A-D + Cause E (lines 33-39, 192-211); 234 lines total (anchor for ~280-310-line projection for runbook 29 per Referee GA4 verification); L1→L2 routing table (lines 21-25).
- `docs/l1-runbooks/25-android-compliance-blocked.md` — Phase 40 multi-cause runbook (4 Causes); failure-class Cause partitioning precedent.
- `docs/l2-runbooks/19-android-enrollment-investigation.md` — Phase 41 L2 enrollment investigation; Pattern A-E mode-class structure within GMS scope.
- `docs/l2-runbooks/22-android-knox-investigation.md` — Phase 44 L2 Pattern A-E precedent (lines 113-254): Pattern A KME profile / B Knox tripped / C KME→ZT collision / D Knox license / E DPC JSON; per-Pattern Microsoft Support escalation packet (3-bullet); 305 lines.

### Triage tree integration target

- `docs/decision-trees/08-android-triage.md` — current Mermaid (line 31-37 AND1 mode question; line 37 ANDE1 AOSP escalation stub to be replaced per D-19); Phase 40 D-05 LOCK enforcement (lines 15, 80 "All terminal nodes within 2 decision steps of root"); Routing Verification table (lines 82-102, AOSP single row at line 100); AOSP escalation data callout (line 121).

### v1.4.1 audit harness (Phase 43 LOCKED)

- `scripts/validation/v1.4.1-milestone-audit.mjs` — checks C2 supervision, C5 freshness, C6 PITFALL-7 (informational-first per D-29), C7 bare-Knox (informational-first); new Phase 45 content respects all checks.
- `scripts/validation/v1.4-audit-allowlist.json` — supervision_exemptions baseline; new Phase 45 supervision-related cross-platform bridge prose (if any) must be added as new pins per Phase 43 Plan 04 helper workflow.

### Microsoft Learn / vendor primary sources (researcher must verify currency at plan time)

- MS Learn — AOSP Supported Devices: https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices (last verified 2026-04-23 via stub; re-verify at plan time per STATE.md research flag)
- RealWear admin docs (HMT-1 / HMT-1Z1 / Navigator 500 firmware minimums + Wi-Fi-embed mechanics)
- Zebra Enterprise: WS50 OEMConfig schema + StageNow tool reference
- Pico Business Suite: Enterprise SKU licensing terms (mid-2025 changes per STATE.md)
- HTC VIVE Focus enterprise documentation (Vive Focus 3 / XR Elite / Focus Vision firmware floors)
- Meta for Work / Meta Business Help — Meta Horizon Managed Services subscription state (D-06 plan-time re-verification target)
- MS Learn — Intune Plan 2 / Suite licensing for AOSP per OEM (D-12 license tier column data)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/validation/v1.4.1-milestone-audit.mjs` — existing audit harness; C5 freshness + C6 PITFALL-7 (informational-first) cover Phase 45 content space. Phase 45 deliverables flow through this harness without harness modification.
- `scripts/validation/regenerate-supervision-pins.mjs` — Tier-1/Tier-2 classifier helper. If Phase 45 introduces any iOS-attributed bridge prose to AOSP content (e.g., comparing AOSP user-associated vs iOS User Enrollment), helper's `--emit-stubs` mode surfaces stub-eligible pins.
- `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` — verbatim RealWear deep content + suggested Wi-Fi-embedding section outline (5 numbered items + 2 failure modes); planner consumes for `09-aosp-realwear.md` Wave 1 task spec; final commit deletes this file.

### Established Patterns (Phase 34/35/36/37/38/44 precedent)

- **11-H2 admin guide skeleton** (Scope and Status / Hardware Scope / Prerequisites and Licensing / Enrollment Method / Provisioning Steps with step-numbered H3 children / Verification / Common Failures / Renewal-Maintenance / What-Breaks-Summary / See Also / Changelog) — D-01 baseline; sibling parity verified across 02/03/05/07.
- **Inline `> What breaks if misconfigured` blockquotes** at action points (sibling pattern in 03-fully-managed-cobo.md and 07-knox-mobile-enrollment.md).
- **Emoji-bearing blockquote callouts** for cross-portal mutex / safety warnings / wind-down callouts (`02:16` ⚠️ pattern; `06-aosp-stub.md:23` ⚠️ scope-and-status callout pattern).
- **D-10 sectioned actor-boundary + D-12 three-part escalation packet** for L1/L2 runbooks (Phase 40/41 validators; D-17/D-18 enforcement).
- **Play Integrity 3-tier verdicts only** in L2 investigation runbooks (zero SafetyNet — D-18 enforcement).
- **60-day Android freshness** (`last_verified` + `review_by` = +60d) per Phase 34 D-14 (D-26 carry-forward).
- **Multi-sub-table-under-capability-H2 reference matrix shape** (sibling android/ios/macos verified) — D-11 baseline.
- **HTML-comment subtractive deletion** for absent portal subsections (Phase 34 D-17; current usage in `06-aosp-stub.md:15-19`) — applies if any per-OEM doc needs to suppress a tri-portal subsection (most likely none for AOSP scope).
- **Source-confidence marker regex** `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?]` (Phase 37 D-11 / Phase 39 D-20) — D-28 enforcement.

### Integration Points

- `docs/reference/android-capability-matrix.md` line 113-127 — `#deferred-full-aosp-capability-mapping` anchor fill target per AEAOSPFULL-09 (Wave 4 atomic same-commit).
- `docs/admin-setup-android/00-overview.md` Mermaid — additive AOSP leaves for per-OEM enumeration (append-only per D-25; Phase 47 atomic rebuild owns final shape).
- `docs/admin-setup-android/06-aosp-stub.md` — collapse deferred-content table per AEAOSPFULL-09 while preserving 9-H2 whitelist + PITFALL-7 framing + 8-OEM enumeration (D-24).
- `docs/decision-trees/08-android-triage.md` — single-row Mermaid + Routing Verification edit per D-19 (ANDE1 → ANDR29).
- `docs/android-lifecycle/02-provisioning-methods.md` — additive 90-day AOSP token ceiling + per-OEM firmware rows in version matrix (per AEAOSPFULL-09 SC#5).
- `docs/_glossary-android.md` — additive AOSP-related entries (e.g., OEMConfig, Meta Horizon Managed Services if introduced); single-author append-only sequencing per D-25.
- `docs/l1-runbooks/00-index.md` — Android section append for runbook 29 (per Phase 40 AEL1-08 precedent).
- `docs/l1-runbooks/29-android-aosp-enrollment-failed.md` (NEW) — D-17 cause structure + D-20 OEM-identification step + D-22 sibling-departure rationale.
- `docs/l2-runbooks/23-android-aosp-investigation.md` (NEW) — D-18 Pattern structure mirroring `22-android-knox-investigation.md`.
- `docs/reference/aosp-oem-matrix.md` (NEW) — D-11 multi-sub-table shape + D-12 dimension fidelity + D-14 Meta footnote + D-15 source attribution + D-16 cell-value rules.

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review precedent (Phase 45 method)**: Phase 45 gray-area decisions resolved via 3-agent adversarial review (Finder / Adversary / Referee) on 2026-04-25 across all 4 gray areas. 12 agents in 3 parallel waves of 4 (4 Finders → 4 Adversaries → 4 Referees). Method matches Phase 39 + Phase 44 precedent for documentation-decision tradeoffs. See `45-DISCUSSION-LOG.md` for full audit trail.
- **Meta Horizon volatility framing**: STATE.md flags Feb 20, 2026 community-sourced wind-down date as MEDIUM confidence; today (2026-04-25) is 64 days past that date. D-06/D-07 build a bias-safe gate-then-default-to-ALIVE pattern that preserves customer guidance for fleets with active subscriptions while authoritatively re-verifying status before authoring.
- **OEM-scoped runbook precedent expansion**: D-17 5-OEM-scoped Causes A-E inside one runbook expands Knox runbook 28's single-OEM-scoped pattern. The expansion is documented in D-22 sibling-departure rationale to prevent future per-OEM expansion phases (e.g., v1.5 Knox tablet/wearable, v1.6 Honeywell/Epson AOSP additions) from re-litigating the OEM-scope axis.
- **In-runbook OEM-identification step (D-20)**: Deliberate departure from sibling no-pre-Cause-routing precedent; documented as "AOSP scope spans 5 OEMs whereas ZTE/KME scope spans one provisioning-method-per-runbook" — a scope-cardinality difference, not a methodology change.
- **Reference-matrix shape (D-11)**: Phase 45 selected 4-H2-sub-table shape after verifying that sibling Android/iOS/macOS reference matrices use 5-H2-sub-table shape. The 4-H2 vs 5-H2 difference is OEM-domain-driven (no analog to "Software Updates" cross-OEM dimension), not a sibling-pattern departure.

</specifics>

<deferred>
## Deferred Ideas

- **DigiLens, Lenovo (ThinkReality VRX), Vuzix per-OEM AOSP coverage** — on MS Learn AOSP supported list but not in Phase 45 5-OEM REQUIREMENTS.md scope. Future v1.5+ milestone if adoption warrants. Phase 39 stub already enumerates them in `## Other AOSP-Supported OEMs`.
- **AOSP user-associated vs userless mode admin-guide-level disambiguation** — beyond per-OEM hint in `13-aosp-meta-quest.md` and `aosp-oem-matrix.md` Mode column, full disambiguation deferred to Phase 47 integration if scope demands it; otherwise to v1.5 backlog.
- **AOSP harness mechanical checks (C7-equivalent for AOSP terms; C-N for OEMConfig discipline)** — Phase 47 owns audit-harness extensions per AEINTEG-02; Phase 45 ships content-only.
- **Vendor-proprietary MDM (ArborXR / ManageXR / Ivanti / Omnissa Workspace ONE) deep coverage** — locked Out of Scope per REQUIREMENTS.md. Document existence as alternatives only in `## See Also` cross-link sections if useful.
- **Zebra MX schema deep documentation** — locked Out of Scope (vendor-owned).
- **Knox tablet / wearable / Galaxy XR per-OEM variants** — Samsung-Suite scope; future milestone if user adoption warrants.
- **4-platform unified capability comparison doc (Windows + macOS + iOS + Android)** — DEFER-08 / AECOMPARE-01, routed to v1.5 per PROJECT.md.
- **Cross-platform nav unification (Android backport into `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`)** — DEFER-07 / AENAVUNIFY-04, routed to v1.5 per PROJECT.md.
- **Wi-Fi-embed QR generator UI walkthrough beyond Intune admin center steps** (e.g., RealWear Cloud QR generator vendor-side UI) — author's call per Phase 45 plan-time research; not in REQUIREMENTS.md scope.
- **Mermaid diagram in per-OEM admin docs** — Claude's discretion per `## Decisions §Claude's Discretion`; not required.

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 45` returned 0 pending todos at discussion time (2026-04-25).

</deferred>

---

*Phase: 45-per-oem-aosp-expansion*
*Context gathered: 2026-04-25*
*Method: 4-area 3-agent adversarial review (Finder / Adversary / Referee × 4 gray areas; 12 agents in 3 parallel waves) — winners 1B / 2B / 3B / 4A*
