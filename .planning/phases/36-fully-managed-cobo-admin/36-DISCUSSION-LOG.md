# Phase 36: Fully Managed COBO Admin - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-21
**Phase:** 36-fully-managed-cobo-admin
**Areas discussed:** Provisioning-method treatment; COPE migration-note placement; Android 15 FRP + EFRP scope; Entra join + CA-exclusion treatment
**Method:** Adversarial review — finder/adversary/referee scored pattern. User directive: "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."

---

## Adversarial Review Summary

| Phase | Agent | Output | Net |
|-------|-------|--------|-----|
| 1 | Finder | 67 flaws identified (16 CRIT / 25 MED / 26 LOW) | Score 311 |
| 2 | Adversary | 25 disproved (1 CRIT / 4 MED / 20 LOW); 42 confirmed | Net +50 |
| 3 | Referee | 42 real flaws confirmed (14 CRIT / 17 MED / 11 LOW); 25 false positive | Winners per area |

Winners selected on **lowest real-flaw count** basis (matches Phase 34 / Phase 35 precedent).

---

## Area 1 — Provisioning-method treatment

| Option | Description | Referee real flaws | Selected |
|--------|-------------|--------------------|----------|
| 1A | Per-method walkthrough — 4 separate subsections (QR, NFC, afw#setup, ZT), each ~150-250w with full enrollment steps + per-method what-breaks. 600-1000w total. | 2 CRIT (F-001, F-002) / 1 MED (F-005) / 2 LOW (F-006, F-007) = 5 | |
| 1B | Consolidated "How to provision" + method-choice routing table at top (columns Method/Android-version/When-to-use/Link-to-matrix-row). No per-method walkthroughs; callouts in table cells only. 200-350w total. | 2 CRIT (F-009, F-010) / 2 MED (F-011, F-013) / 1 LOW (F-014) = 5 | |
| 1C | **Hybrid** — method-choice routing table at top + short per-method subsections (~60-120w each) focused on COBO-specific constraints (NFC Android 11+ COPE loss; QR internet Android 7-8; ZT dual-SIM IMEI 1; afw#setup Google-sign-in). Mechanics reference Phase 34 matrix. 400-650w total. | 0 CRIT / 2 MED (F-016, F-017) / 1 LOW (F-019) = 3 | ✓ |

**User's choice:** 1C Hybrid (adversarial referee recommendation adopted).

**Rationale:** 1A and 1B both had 2 CRIT each — Anti-Pattern 1 matrix-duplication (1A per-method walkthrough = Phase 34 matrix duplicate per D-26 locked constraint; 1B routing table = Phase 34 matrix duplicate filtered for COBO rows). 1C's MEDs (partial-mechanics bleed, dual-maintenance) are mitigable with strict "routing + callouts only, no mechanics" authoring discipline. 1C aligns naturally with SC1's "inline callouts for mode-specific constraints" phrasing: route to Phase 34 matrix for the grid; inline the COBO-specific constraint flavor only. F-019 (dual-SIM IMEI 1 scope boundary with Phase 35 D-22 / Phase 39) is resolved by explicit design constraint (COBO doc does NOT carry dual-SIM IMEI 1 — that lives in Phase 39 ZT portal extension).

**Notes:** Key false positives that could have changed the outcome but didn't survive: F-003 (word-count crowding out SC2/3/4 — disproved as speculative), F-004 (ZT walkthrough duplicating Phase 35 D-20 — disproved since COBO walkthrough is enrollment-flow-level, not portal-mechanics-level), F-012/F-015 (Phase 40 L1 runbook anchor-level targeting — disproved since Phase 40 L1 triage is mode-first per STATE.md, not method-level).

---

## Area 2 — COPE migration-note placement

| Option | Description | Referee real flaws | Selected |
|--------|-------------|--------------------|----------|
| 2A | **Dedicated top-of-page section** "If you have COPE deployments" (before enrollment-profile content). 100-200w. | 1 CRIT (F-021) / 1 MED (F-023) = 2 | ✓ |
| 2B | Inline callout box at the enrollment-profile step only. 80-120w. | 1 CRIT (F-026) / 2 MED (F-027, F-028) / 1 LOW (F-029) = 4 | |
| 2C | Bottom "COPE context" appendix cross-linked from top-of-page banner. Banner ~15w; appendix ~100-200w. | 1 CRIT (F-031) / 2 MED (F-032, F-033) = 3 | |

**User's choice:** 2A Top-of-page section (with tight bounds — 150-250w; placed after COBO overview, not as page-top banner).

**Rationale:** 2B's CRIT (F-026) is Phase 35 D-13 F-039 MED precedent: inline-only callouts are skippable on non-linear skim. 2C's CRIT (F-031) is Phase 35 D-21 F-071 MED precedent: bottom-appendix + top banner = "separate gotchas pattern" explicitly rejected. 2A's CRIT (F-021: doc reframed as COPE-migration-first) is mitigable by placing the section AFTER the COBO overview (so readers have COBO context first) and capping length at 150-250w to preserve doc-head real estate. AECOBO-02 SC2 phrasing "Intune admin reading the COPE migration **section**" literally requires section-ness, which 2A delivers.

**Notes:** Key false positives: F-022 ("two competing 'before enrollment' headers" with 3C — disproved as sequential-not-competing), F-024/F-025 (style preferences with no locked-in constraint). The "COPE deprecated" wording guard (F-024) is enforced at requirement level (AECOBO-02 / D-04 milestone audit grep pattern).

---

## Area 3 — Android 15 FRP + EFRP scope

| Option | Description | Referee real flaws | Selected |
|--------|-------------|--------------------|----------|
| 3A | Full EFRP configuration section owned in COBO doc — EFRP Intune policy mechanics + config steps. Phase 38 references or duplicates. | 2 CRIT (F-036, F-037) / 2 MED (F-038, F-039) = 4 | |
| 3B | Short FRP callout only (~80w) + forward-reference to Phase 38 for EFRP mechanics. COBO carries only "before you reset" warning + what happens on Android 15. EFRP deferred. | 2 CRIT (F-041, F-042) / 2 MED (F-043, F-044) = 4 | |
| 3C | **Hybrid** — "before you reset" FRP warning BEFORE provisioning-methods section; "Configuring EFRP" subsection AFTER provisioning/enrollment; version behavior references Phase 34 version matrix Android-15 breakpoint. COBO owns EFRP config; Phase 38 references back. | 0 CRIT / 2 MED (F-046, F-047) / 2 LOW (F-049, F-050) = 4 | ✓ |

**User's choice:** 3C Hybrid — COBO-owned EFRP configuration callout section + Phase 34 version-matrix cross-reference (no duplication of behavioral breakpoint narrative).

**Rationale:** All three options had 4 real flaws, but severity differs decisively. 3A had 2 CRIT (F-036 Phase 38 ref-or-duplicate ambiguity; F-037 cross-mode content in mode-specific doc architecturally misplaced). 3B had 2 CRIT (F-041 AECOBO-03 SC3 verbatim violation — "how to configure EFRP" cannot be deferred to a not-yet-published Phase 38; F-042 dangling forward-reference since Phase 38 is a sibling shipping AFTER Phase 36 per ROADMAP ordering). 3C had 0 CRIT. Additionally, verified via Referee check: `docs/android-lifecycle/03-android-version-matrix.md` lines 67-78 already contain the Android 15 FRP breakpoint with EFRP admin-action section — 3C's cross-link target is real. 3C's MEDs (F-046 Phase 38 Dedicated FRP behavior distinction; F-047 competing "before X" headers) mitigated by explicit "parallel-but-distinct" framing (Phase 38 carries re-provisioning-scoped FRP callout; Phase 36 owns EFRP config steps only).

**Implementation adjustment:** Per referee Final Verdict on F-046: Phase 36 owns the EFRP configuration steps; Phase 38 carries a **distinct** FRP callout for re-provisioning scenarios. The two callouts don't duplicate because they're scoped to different scenarios (enrollment vs re-provisioning).

**Notes:** F-042 was particularly consequential — a Phase 36 forward-reference to Phase 38 would be dangling at Phase 36 publish time (sibling phase not yet shipped). Phase 35 F-050 "dangling cross-ref" rule applies.

---

## Area 4 — Entra join + CA-exclusion treatment

| Option | Description | Referee real flaws | Selected |
|--------|-------------|--------------------|----------|
| 4A | **Hard-prereq block + inline reminder** at Entra-join step. Admin configures CA exclusion BEFORE starting enrollment. | 0 CRIT / 2 MED (F-051, F-052) = 2 | ✓ |
| 4B | Inline callout at Entra-join step only (no prereq listing). | 2 CRIT (F-056, F-057) / 1 MED (F-058) = 3 | |
| 4C | Dedicated "Conditional Access exclusion" subsection + cross-refs to `docs/security-compliance/enrollment-ca-timing.md` and `docs/admin-setup-ios/06-compliance-policy.md`. | 2 CRIT (F-061, F-062) / 2 MED (F-064, F-065) = 4 | |

**User's choice:** 4A Hard-prereq block + inline reminder, with tenant-conditional framing ("IF your tenant uses Conditional Access...") to address F-051/F-052.

**Rationale:** 4B's CRITs are structurally fatal — F-056 (CA exclusion "must be BEFORE Chrome-tab step, not at it") is a sequence violation; admin encountering the inline callout mid-enrollment has already failed the Chrome-tab sign-in. F-057 is Phase 35 D-13 F-039 MED precedent on inline-only skip-proof callouts. 4C's CRITs are locked-constraint violations — F-061 (Phase 35 CONTEXT lines 159-163: cross-platform nav integration deferred post-v1.4; creating Android → shared/iOS cross-refs reverses the guard); F-062 (verified via referee check: `docs/security-compliance/enrollment-ca-timing.md` does NOT exist — dangling ref confirmed real). 4A's MEDs (F-051, F-052 on MGP-hard-prereq vs CA-tenant-conditional conflation) are both mitigable by explicit tenant-conditional framing: "Conditional Access exclusion for Microsoft Intune cloud app — **IF your tenant uses Conditional Access**." This framing distinguishes the universal MGP prereq from the conditional CA prereq, eliminating the mis-scoping concern. Pattern precedent: Phase 35 D-13 validated dual-placement (subsection + inline) for the analogous Entra-account Aug-2024 callout.

**Notes:** Key false positive: F-063 (`docs/admin-setup-ios/06-compliance-policy.md` unverified) — referee verified file exists (28869 bytes). However, file existence does NOT overturn F-061: the file is a v1.3 iOS-scoped artifact, and adding an Android → iOS cross-reference from the COBO guide reverses the no-Android-in-shared-files guard per Phase 35 CONTEXT lines 159-163 (Phase 42 AEAUDIT-03 scope). The correct pattern is for Phase 36 to describe WHAT to exclude and WHY in the prereq block + inline reminder; admins use their own Intune/Entra ID knowledge for WHERE in the portal — platform-agnostic CA content is not Phase 36's to own.

---

## Cross-Area Claude's Discretion

Captured in CONTEXT.md `<decisions>` → Claude's Discretion subsection. Not scored in adversarial review.

- Word counts within per-section ranges (total 2800-3800w).
- Mermaid diagram (author's call — iOS precedent does not use one).
- Opening framing sentence for COPE Migration Note.
- Top-of-section vs top-of-doc placement for Android 15 FRP ⚠️ warning.
- Ordering of per-section what-breaks callouts (severity-descending recommended).
- Exact phrasing of per-method constraint callouts.
- Portal-shorthand reminder at doc-top (optional).

---

## Deferred Ideas

Ideas mentioned during discussion that were noted for future phases. Captured in CONTEXT.md `<deferred>` section. Summary:

- Full COPE admin setup path — v1.4.1 (if COPE still non-deprecated) or dropped
- Knox Mobile Enrollment (KME) full admin path — v1.4.1
- Corporate-scale ZTE content (reseller-upload, device-claim, dual-SIM IMEI 1, profile assignment at scale) — Phase 39
- COBO L1 triage runbook 24 — Phase 40 (AEL1-04)
- COBO L2 investigation runbook — Phase 41 (AEL2-02/03)
- Dedicated FRP re-provisioning behavior — Phase 38 (AEDED-03)
- Enrollment token rotation runbook — v1.4.1 operational content or post-v1.4
- Factory Reset Protection behavior matrix per mode × reset method — v1.4.1 or milestone-audit artifact
- Cross-platform nav integration for Android — post-v1.4 unification task
- 4-platform comparison document — v1.5
- Intune admin center navigation screenshots — out of scope per text-first policy

---

## Audit-Trail Verifications

The following facts were verified during Referee adjudication and inform CONTEXT.md decisions:

1. `docs/android-lifecycle/03-android-version-matrix.md` lines 67-78 carry Android 15 FRP breakpoint with EFRP admin action. **3C cross-reference target is real** (F-048 false positive).
2. `docs/admin-setup-ios/06-compliance-policy.md` exists (28869 bytes). **File existence confirmed** but cross-referencing it from Android doc is barred by Phase 35 CONTEXT lines 159-163 / PITFALL 9 / PITFALL 11 (F-061 real, F-063 false positive — file exists but reference pattern is wrong).
3. `docs/security-compliance/enrollment-ca-timing.md` does NOT exist. **Dangling ref confirmed real** (F-062 real).
4. ROADMAP Phase 38 line 155: Phase 38 depends on Phase 36. Phase 38 is a sibling that ships AFTER Phase 36. **Forward-reference from Phase 36 to Phase 38 would be dangling at publish time** (F-042 real).
5. AECOBO-03 requires Phase 36 COBO guide to explain "how to configure Enterprise FRP via Intune policy." **3B (defer EFRP to Phase 38) violates AECOBO-03 verbatim** (F-041 real).
6. PITFALL 11 line 301 requires KME/ZT mutual-exclusion callout in "every doc that mentions Zero-Touch for fully managed and dedicated devices." **Phase 36 Zero-Touch provisioning callout MUST carry KME note** (F-007, F-014, F-020 real).

---

*Adversarial review log gathered 2026-04-21*
*67 flaws → 42 real / 25 false positive → 4 winners (1C / 2A / 3C / 4A) → 17 D-## decisions captured in CONTEXT.md*
