# Phase 36: Fully Managed COBO Admin - Research

**Researched:** 2026-04-21
**Domain:** Android Enterprise Fully Managed (COBO) admin documentation — single-file delivery of `docs/admin-setup-android/03-fully-managed-cobo.md`
**Confidence:** HIGH (research-flag verification against current Microsoft Learn 2026-04-16 and published Google AE Help / Jason Bayton) / MEDIUM on one research flag (COPE/WPCO wording — see flag 1 below)

## Summary

Phase 36 is a documentation phase. It produces one new markdown file (`docs/admin-setup-android/03-fully-managed-cobo.md`) that covers COBO enrollment profile, token management, four provisioning methods (QR / NFC / afw#setup / Zero-Touch), a COPE migration note, Android 15 FRP + EFRP configuration, and Entra join behavior including Chrome-tab Conditional Access exclusion. No code, no config, no scripts; tests are content-quality audits (grep-based milestone audit gates, cross-reference integrity checks, anchor-stability contracts).

The research landscape is tightly constrained: 17 locked decisions in CONTEXT.md determine structure, placement, length, anchors, and cross-references. Four research flags required plan-time verification. All four were verified against Microsoft Learn (updated 2026-04-16), Google Android Enterprise Help, and Jason Bayton's 2024-10 Android 15 enterprise post. Verification findings are consolidated in the Research-Flag Verifications section below. One flag (COPE/WPCO wording) has a MEDIUM-confidence finding that needs an executor acknowledgement: the literal phrase "Google recommends WPCO" is NOT verbatim quoted in Google Android Enterprise Help; it is the project's internal framing in `_glossary-android.md` line 49, supported by (a) Google's Android-11 deprecation of work-profile-on-fully-managed in favor of work-profile-on-company-owned, (b) Bayton's description of that shift, and (c) current Google AE Help presenting work profile as "ideal for BYOD and COPE deployments." Phase 36 D-03 already locks this phrasing; the research flag is *satisfied* in the sense that no current Google source contradicts it, but the exact phrase is a project-authored paraphrase of Google's recommendation, not a quote. This must be reflected in the doc as supported-but-paraphrased.

**Primary recommendation:** ONE plan file (single-file deliverable); structure follows the iOS `03-ade-enrollment-profile.md` template with explicit Phase 36 extensions (four provisioning methods in a hybrid routing section, COPE migration note, Android 15 FRP callout, Entra-join Chrome-tab CA exclusion). Content authored in a single pass because the 2800-3800 word target and 10 interrelated sections cannot be meaningfully parallelized across plans.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

The following decisions are locked by Phase 36 CONTEXT.md (finalized 2026-04-21 via adversarial-review skill; 67 flaws scored; 42 real; 25 disproved; winners selected on lowest-real-flaw basis 1C / 2A / 3C / 4A). Research and planning MUST honor these verbatim and MUST NOT explore alternatives.

**Provisioning-method treatment (AECOBO-01 / SC1):**

- **D-01:** Hybrid routing + inline constraint callouts. `## Provisioning method choice` section routes to `docs/android-lifecycle/02-provisioning-methods.md` via filtered-row link pattern and carries inline COBO-specific callouts for QR, NFC, afw#setup, Zero-Touch. 400-650 words. No grid duplication (Anti-Pattern 1 guard).
- **D-02:** Filtered-row link pattern: "For version-availability and cross-mode support, see `02-provisioning-methods.md#[method-anchor]`." Never restate method's Android min-version in the COBO doc.

**COPE migration-note placement (AECOBO-02 / SC2):**

- **D-03:** Dedicated `## COPE Migration Note` section placed after COBO overview and before enrollment-profile section. Content: "Google recommends WPCO (Work Profile on Corporate-Owned)" phrasing as the SC2 lock; explicit negative guard — phrase "COPE deprecated" is FORBIDDEN; brief migration context; "See also" stub to PROJECT.md deferred items for full COPE path (v1.4.1). Length 150-250 words. Stable anchor `#cope-migration`.
- **D-04:** COPE wording audit guard — grep zero hits for "COPE deprecated" / "deprecated COPE"; grep exactly one hit for "recommends WPCO" inside the COPE Migration Note section.

**Android 15 FRP + EFRP scope (AECOBO-03 / SC3):**

- **D-05:** COBO-owned EFRP configuration callout section + Phase 34 version-matrix cross-reference. `## Android 15 FRP and EFRP` section placed after enrollment-profile content. Content: what changed on Android 15 (version-tagged per PITFALL 1); admin action required (configure EFRP via Intune policy BEFORE any device reset — SC3 lock); step-level EFRP configuration (explicit Intune admin center navigation; satisfies AECOBO-03 verbatim); cross-link to Phase 34 `03-android-version-matrix.md#android-15-breakpoint`; "Before you reset" blockquote. Length 300-450 words. Stable anchors `#android-15-frp` and `#configure-efrp`.
- **D-06:** Zero-Touch inline callout in D-01 MUST carry one-line KME/ZT mutual-exclusion note: "Samsung Knox fleets: choose Knox Mobile Enrollment (KME) or Zero-Touch, never both. Full KME coverage deferred to v1.4.1." Cross-link to `02-zero-touch-portal.md#kme-zt-mutual-exclusion`.

**Entra join + CA-exclusion treatment (AECOBO-01 / SC4):**

- **D-07:** Hard-prereq block (tenant-conditional framing) + inline reminder at Chrome-tab step. Top-of-doc prereq block carries (a) Entra join enabled (hard MGP-level prereq) and (b) Conditional Access exclusion for Microsoft Intune cloud app — IF tenant uses Conditional Access (tenant-conditional). Inline reminder at Chrome-tab setup step. Stable anchors `#entra-join-prerequisite` and `#ca-exclusion-intune-app`.
- **D-08:** Entra-join conceptual content ("work profile IS the entire device; no personal partition") lives in an early `### Key Concepts` subsection with cross-link to `_glossary-android.md#fully-managed`. Not in prereq block.
- **D-09:** No cross-references to v1.0-v1.3 shared or iOS compliance files. No cross-refs to `docs/admin-setup-ios/06-compliance-policy.md` or to any hypothetical `docs/security-compliance/enrollment-ca-timing.md` (verified non-existent).

**Document structure (overall COBO doc shape):**

- **D-10:** Stable anchors reserved for Phase 38/39/40/41 consumers — MUST publish: `#key-concepts`, `#prerequisites`, `#cope-migration`, `#enrollment-profile`, `#enrollment-token`, `#provisioning-method-choice`, `#entra-join-prerequisite`, `#ca-exclusion-intune-app`, `#android-15-frp`, `#configure-efrp`, `#what-breaks`, `#renewal-maintenance`.
- **D-11:** Length targets — 2800-3800 words total, with per-section allocations as specified in CONTEXT.md D-11.
- **D-12:** Version-tag discipline (PITFALL 1 compliance) — every behavioral assertion carries an inline version tag. SafetyNet MUST NOT appear.
- **D-13:** Frontmatter — `platform: Android`, `audience: admin`, `applies_to: COBO`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle).
- **D-14:** Shared-file modification guard — Phase 36 MUST NOT modify `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`, `_glossary.md`, `_glossary-macos.md`, any file under `admin-setup-ios/`, `admin-setup-macos/`, `l1-runbooks/`, `l2-runbooks/`.

**Research-flag verification protocol (locked):**

- **D-15 / D-16 / D-17:** Plan researcher runs plan-time verification for the four research flags; executor re-verifies portal-UI-specific assertions at execute time; unverifiable claims labeled MEDIUM confidence inline with `last_verified` date or omitted.

### Claude's Discretion

- Exact word counts within section ranges in D-11 (total 2800-3800 words).
- Mermaid diagram inclusion for a COBO setup flow (iOS Phase 27 does not use one; Phase 35 `00-overview.md` does). Author's call.
- Whether COPE Migration Note (D-03) opens with a one-line framing sentence or jumps straight to Google's current wording.
- Whether Android 15 FRP warning blockquote (D-05) appears at the top of the FRP section or at the top of the doc. Top-of-section recommended per D-05.
- Ordering of what-breaks callouts (severity-descending recommended per Phase 35 D-12 precedent).
- Exact phrasing of per-method constraint callouts (one to three sentences each).
- Whether to include a COBO-specific "Portal shorthand reminder" at the top of the doc.

### Deferred Ideas (OUT OF SCOPE)

- Full COPE admin setup path — v1.4.1 per PROJECT.md Key Decisions.
- Knox Mobile Enrollment (KME) full admin path — v1.4.1.
- Corporate-scale ZTE content (reseller-upload handoff, device claim workflow, profile assignment at scale, dual-SIM IMEI 1) — Phase 39.
- COBO L1 triage runbook 24 ("Device not enrolled") — Phase 40 (AEL1-04).
- COBO L2 investigation runbook — Phase 41 (AEL2-02 / AEL2-03).
- Dedicated FRP re-provisioning behavior — Phase 38 (AEDED-03) owns parallel-but-distinct callout.
- AOSP-mode provisioning — Phase 39 AOSP stub.
- BYOD Work Profile — Phase 37.
- Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference — Phase 42 (AEAUDIT-03).
- Cross-platform nav integration — post-v1.4 unification task.
- Enrollment token rotation runbook, Factory Reset Protection behavior matrix per mode × reset method, full EFRP documentation spanning all corporate modes with OEM-specific behavior — v1.4.1 candidates.
- 4-platform comparison document — v1.5.
- Intune admin center screenshots / visual artifacts — excluded per PROJECT.md text-first policy.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description (from REQUIREMENTS.md lines 33-35) | Research Support |
|----|------------------------------------------------|------------------|
| **AECOBO-01** | Intune admin can provision a Fully Managed (COBO) corporate device via any of four provisioning methods (QR, NFC, DPC identifier, Zero-Touch) with enrollment profile, token management, and Entra join behavior documented. | MS Learn `ref-corporate-methods` (updated 2026-04-16) confirms all four methods supported for COBO. Section 5 below maps each method to its COBO-specific constraint callout. Section 6 below documents Entra-join + Chrome-tab CA exclusion (MS Learn `setup-fully-managed` confirms). Section 7 below documents enrollment profile + token (MS Learn `setup-fully-managed` confirms 65-year staging-token expiry and "doesn't expire" default token). |
| **AECOBO-02** | Intune admin can read a COPE migration note using Google's current language ("Google recommends WPCO") rather than "COPE deprecated". | Section 1 Research-Flag Verification flag 1: verified that Google AE Help does NOT use the verbatim phrase "COPE deprecated" (MEDIUM confidence); Bayton describes the Android 11 shift; project's internal framing (`_glossary-android.md` line 49) is consistent with Google's direction. Phase 36 D-03 locks the phrasing. |
| **AECOBO-03** | Intune admin can read an Android 15 FRP callout explaining how FRP hardening affects re-enrollment and how to configure Enterprise FRP via Intune policy. | Phase 34 `03-android-version-matrix.md#android-15-breakpoint` (lines 67-78) carries the version-behavior narrative; Phase 36 cross-links and carries the Intune admin center step-level EFRP configuration per D-05. MS Learn `ref-corporate-methods` confirms Android 15 behavior for COPE-mode re-enrollment requires Google-account re-entry after Settings reset. Bayton (2024-10) confirms Android 15 FRP hardening. |

</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| COBO enrollment profile creation | Intune admin center (portal) | — | Profile is created and stored in Intune; no MGP or ZT portal involvement for profile creation itself. |
| Enrollment token lifecycle (create / expire / rotate / revoke) | Intune admin center (portal) | — | Token is an Intune artifact; MS Learn `setup-fully-managed` confirms token operations are Intune-side. |
| MGP binding (upstream prereq) | Managed Google Play portal | Intune admin center | Binding flow initiated from `endpoint.microsoft.com` per Phase 35 `01-managed-google-play.md`; Phase 36 references, does not duplicate. |
| ZT portal provisioning mechanics | Zero-Touch portal | Intune admin center (iframe) | Phase 35 `02-zero-touch-portal.md` is canonical; Phase 36 cross-links only. |
| Chrome-tab authentication during device setup | Device (Chrome Custom Tab) | Microsoft Entra ID | Entra authentication triggered by Chrome Custom Tab at device setup; CA policies against Microsoft Intune cloud app intercept this flow. |
| Enterprise Factory Reset Protection (EFRP) configuration | Intune admin center (policy) | Device (enforcement) | EFRP is policy-deployed from Intune; enforced on-device post-reset per Google's EFRP design. |
| Conditional Access policy exclusion | Microsoft Entra ID (portal) | — | CA policies managed in Entra ID; the Phase 36 doc tells admins WHAT to exclude (Microsoft Intune cloud app) and WHY, not WHERE in Entra ID to configure it (per D-09 guard). |
| Doc anchor stability contract | Phase 36 doc itself | Phase 38/40/41 consumers | Phase 36 publishes anchors listed in D-10; downstream phases consume them. Renaming breaks cross-references. |

## Project Constraints (from CLAUDE.md)

The repository's CLAUDE.md describes the broader Autopilot diagnostic toolkit (PowerShell + FastAPI + React) but the v1.4 Android Enterprise work is pure documentation in `docs/`. The following CLAUDE.md directives apply to Phase 36:

- Markdown documentation in `docs/` — version-controlled, exportable to wiki. Phase 36 files land in `docs/admin-setup-android/`.
- Audience-segmented writing (L1 / L2 / Admin separately) — Phase 36 is an Admin guide; it does not serve L1 or L2 directly (those are Phase 40/41).
- Generic Microsoft Intune guidance; not tied to a specific tenant — no tenant-specific QR codes, screenshots, or hardcoded GUIDs.
- Accuracy — reflect current Windows/macOS/iOS/Android behavior through Intune. Research-flag verification enforces this for Phase 36.

CLAUDE.md does not introduce additional directives beyond what CONTEXT.md and the Phase 34/35 shared conventions already lock.

## Research-Flag Verifications

Phase 36 CONTEXT.md D-15 requires the plan-researcher to verify four research flags at plan time. All four verifications completed 2026-04-21. Findings below are tagged HIGH / MEDIUM / LOW per Phase 35 source-hierarchy protocol.

### Flag 1: COPE wording — "Google recommends WPCO" vs "COPE deprecated"

**Verification sources checked (2026-04-21):**
- Google AE Help: `support.google.com/work/android/answer/6174145` (Get started with Android Enterprise) — [CITED: support.google.com/work/android]
- Google AE Help: `support.google.com/work/android/answer/9563584` (Work Profile and its features) — [CITED: support.google.com/work/android]
- Jason Bayton: `bayton.org/android/what-is-android-enterprise-and-why-is-it-used/` — [CITED: bayton.org]
- Jason Bayton: `bayton.org/android/android-11-cope-changes/` — [CITED: bayton.org]
- Jason Bayton: `bayton.org/blog/2024/10/actually-new-for-enterprise-android-15/` — [CITED: bayton.org]
- Microsoft Learn: `learn.microsoft.com/en-us/intune/intune-service/enrollment/android-corporate-owned-work-profile-enroll` — [CITED: learn.microsoft.com, May 2025]
- Project internal: `docs/_glossary-android.md` line 49 (Phase 34 deliverable) — [VERIFIED: repo grep]

**Findings:**

[VERIFIED: Google AE Help] No current Google source contains the verbatim phrase "Google recommends WPCO" or describes COPE as formally deprecated. Google's `answer/6174145` lists COPE alongside BYOD and COBO as a supported deployment type; `answer/9563584` describes work profile as "ideal for BYOD and COPE deployments." Google distinguishes personally-owned from company-owned devices without using the "WPCO" acronym in consumer-facing help pages.

[VERIFIED: bayton.org] Bayton's Android-11 COPE changes article states: "From Android 11, the COPE experience has changed. Work profiles on fully managed devices... was completely deprecated in Android 11 in favour of work profiles on company owned devices, a work profile derived experience with additional device control, and enhanced end-user privacy." This supports the direction (WPCO is the replacement) but Bayton does not use "Google recommends WPCO" as a verbatim phrase. Bayton's Android-15 enterprise article says "Google has been busy this year boosting the functionality of the company-owned work profile deployment scenario" — supportive of COPE's continued development under the new naming, not deprecatory.

[VERIFIED: Microsoft Learn, updated May 2025] MS Learn describes "Android Enterprise corporate-owned devices with a work profile" (using the long-form name, not the acronym "WPCO"). No formal deprecation language.

[VERIFIED: repo grep] The project's `_glossary-android.md` line 49 already codifies the phrase: *"Google recommends WPCO as the successor pattern for the same use case, so new deployments should provision WPCO rather than COPE. COPE is still functionally supported on existing fleets — no formal deprecation notice from Google — but WPCO is the preferred terminology and the path documented in current Google Android Enterprise guidance."* This is a Phase 34 locked convention. Phase 36 D-03 aligns.

**Confidence:** MEDIUM. The exact phrase "Google recommends WPCO" is the project's paraphrase of Google's technical direction, not a verbatim Google quote. The underlying claim (Google's trajectory is WPCO; COPE is not formally deprecated) IS supported by (a) Android 11 removal of work-profile-on-fully-managed, (b) Bayton's Android 15 enterprise article, and (c) MS Learn's long-form name usage. Phase 36 CONTEXT.md D-03 has locked this phrasing.

**Implication for plan:** Use the D-03-locked phrasing "Google recommends WPCO (Work Profile on Corporate-Owned)" as prescribed. Add a MEDIUM-confidence marker in the COPE Migration Note and cite `_glossary-android.md#cope` plus Bayton's Android 11 COPE changes article as the supporting sources. Explicit negative guard: "COPE deprecated" / "deprecated COPE" MUST return zero grep hits (D-04 audit rule).

### Flag 2: Enrollment token expiry — up to 65 years (not 90 days)

**Verification sources checked (2026-04-21):**
- Microsoft Learn: `learn.microsoft.com/en-us/intune/device-enrollment/android/setup-fully-managed` (ms.date 2025-05-08; updated_at 2026-04-16) — [CITED: learn.microsoft.com]
- Microsoft Learn: `learn.microsoft.com/en-us/intune/intune-service/enrollment/android-dedicated-devices-fully-managed-enroll` (ms.date 2025-12-04; updated_at 2026-04-16) — [CITED: learn.microsoft.com]

**Findings:**

[VERIFIED: MS Learn `setup-fully-managed`] Exact wording: *"**Token expiration date**: Only available with the staging token. Enter the date you want the token to expire, up to 65 years in the future. Acceptable date format: `MM/DD/YYYY` or `YYYY-MM-DD`. The token expires on the selected date at 12:59:59 PM in the time zone it was created."*

[VERIFIED: MS Learn `ref-corporate-methods`] Exact wording: *"The token works for all Intune-licensed users and doesn't expire."* (This refers to the default enrollment token, distinct from the staging token.)

[VERIFIED: MS Learn `setup-fully-managed`] Two token types exist:
1. **Default (corporate-owned, fully managed)**: no expiry; supports enrollment-time grouping.
2. **Staging (corporate-owned, fully managed, via staging)**: configurable up to 65 years; does NOT support enrollment-time grouping; for third-party pre-provisioning workflows.

**Confidence:** HIGH. Both Microsoft Learn pages are current (updated 2026-04-16). The PITFALLS.md legacy "90-day max" language confirmed to apply only to AOSP corporate user-associated tokens, not COBO/Fully Managed. Phase 36 MUST state (a) default token has no expiry, (b) staging token configurable up to 65 years, (c) "90-day" reference is explicitly AOSP-only and must not appear in COBO context.

**Implication for plan:** The `## Enrollment token management` section (D-11 200-350 words) MUST document both token types, correct expiry semantics (no expiry for default; 65 years for staging), and the enrollment-time-grouping tradeoff. Include a "What breaks if misconfigured" callout per D-11 for token expiry prematurely revoked and token assigned to wrong group. Explicitly disavow the legacy "90-day max" phrasing per PITFALL 1 version-decay discipline.

### Flag 3: Android 15 FRP + EFRP specifics + Intune admin-center path

**Verification sources checked (2026-04-21):**
- Microsoft Learn: `learn.microsoft.com/en-us/intune/intune-service/enrollment/android-dedicated-devices-fully-managed-enroll` — [CITED: learn.microsoft.com, updated 2026-04-16]
- Microsoft Learn: `learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced` — [CITED: learn.microsoft.com]
- Microsoft Learn: `learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-android-for-work` — [CITED: learn.microsoft.com]
- Google AE Help: `support.google.com/work/android/answer/14549362` (Enable enterprise factory reset protection) — [CITED: support.google.com/work/android]
- Jason Bayton: `bayton.org/blog/2024/10/actually-new-for-enterprise-android-15/` — [CITED: bayton.org]
- Jason Bayton: `bayton.org/android/feature-spotlight-factory-reset-protection/` — [CITED: bayton.org]
- Jason Bayton: `bayton.org/android/android-enterprise-faq/frp-vs-enterprise-frp/` — [CITED: bayton.org]
- Project internal: `docs/android-lifecycle/03-android-version-matrix.md` lines 67-78 — [VERIFIED: repo read]

**Findings (what changed on Android 15):**

[VERIFIED: bayton.org 2024-10] Exact phrasing: *"Enabling OEM unlock in developer settings will no longer deactivate FRP"* and *"Bypassing the setup wizard...will no longer deactivate FRP. Adding accounts, passwords, and applications will no longer be possible while FRP is active."* Bayton also states EFRP is *"enforced after a hard factory reset regardless of whether OEM unlocking was toggled on."*

[VERIFIED: MS Learn `ref-corporate-methods`] Exact phrasing: *"For corporate owned devices with a work profile running Android 15, you will need to re-enter the Google account associated with the configuration after any reset done via the Settings app. It's important to plan your reprovisioning workflow (such as applying an Intune wipe or resetting via the Settings app) accordingly so that you can provide the required credentials if needed."*

[VERIFIED: Phase 34 version matrix, line 72] Exact project phrasing already committed: *"On Android 15, the OEM unlocking setting no longer affects the reset process — after a hard reset, Enterprise Factory Reset Protection (EFRP) is always enforced. FRP now triggers on more reset pathways than on Android 13 / 14, meaning re-enrollment flows that worked on Android 13 / 14 can block on Android 15 unless EFRP is configured BEFORE devices are reset."*

**Findings (Intune admin-center EFRP configuration path):**

[VERIFIED: MS Learn via search] EFRP configuration in Intune is done through a **Device restriction profile** on the Android Enterprise platform for Fully Managed / Dedicated / Corporate-Owned Work Profile. The Factory Reset Protection Emails setting is configured there. The canonical path as of 2026-04-16 is: Microsoft Intune admin center → Devices → Configuration → Create profile → Platform: Android Enterprise → Profile type: "Fully managed, dedicated, and corporate-owned work profile — Device restrictions" → under **General**, configure **Factory reset protection emails** (EFRP allowlist of Google account email addresses).

[CITED: Google AE Help `answer/14549362`] Google's EFRP page describes the feature as *"specify which Google Accounts can activate a device that has been factory reset and locked by factory reset protection."* This is the allowlist the Intune Device Restrictions profile deploys.

**Confidence:** HIGH for the Android 15 behavioral change (Bayton + MS Learn + Phase 34 matrix agreement). MEDIUM for the exact current Intune admin center navigation path (portal UIs shift; MS Learn doc confirms the feature exists and is in Device Restrictions but the top-level breadcrumb may differ between tenants on the "unified" admin center rollout). Phase 36 D-16 executor-time re-verification locked.

**Implication for plan:** The `## Android 15 FRP and EFRP` section (D-05 300-450 words) MUST carry:
1. Version-tagged behavior statement (per PITFALL 1).
2. Explicit cross-link to Phase 34 `03-android-version-matrix.md#android-15-breakpoint` — NOT a restatement.
3. Step-level Intune admin center navigation to the EFRP setting, with a MEDIUM-confidence inline callout and `last_verified` date per D-16.
4. Required values (EFRP allowlist of Google account email addresses) and assignment target (all COBO devices or targeted group).
5. Top-of-section ⚠️ blockquote per D-05: "Configure EFRP before any factory reset on Android 15 devices; FRP hardening can block re-enrollment."
6. A "What breaks if misconfigured" callout per D-11: EFRP not assigned → post-reset FRP locks device → re-enrollment requires Google-account credential intervention.

### Flag 4: Chrome-tab CA exclusion for Microsoft Intune cloud app

**Verification sources checked (2026-04-21):**
- Microsoft Learn: `learn.microsoft.com/en-us/intune/intune-service/enrollment/android-dedicated-devices-fully-managed-enroll` — [CITED: learn.microsoft.com, updated 2026-04-16]
- Microsoft Learn: `learn.microsoft.com/en-us/intune/device-enrollment/android/setup-fully-managed` — [CITED: learn.microsoft.com, updated 2026-04-16]
- Microsoft Learn: `learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps` — [CITED: learn.microsoft.com]

**Findings:**

[VERIFIED: MS Learn `ref-corporate-methods`, updated 2026-04-16] Exact wording: *"If you have a Microsoft Entra Conditional Access policy defined that uses the *require a device to be marked as compliant* Grant control or a Block policy and applies to **All Cloud apps**, **Android**, and **Browsers**, you must exclude the **Microsoft Intune** cloud app from this policy. This is because the Android setup process uses a Chrome tab to authenticate your users during enrollment."*

[VERIFIED: MS Learn `setup-fully-managed`, updated 2026-04-16] Exact wording: *"The Android setup process uses a Chrome tab to authenticate device users during enrollment. If you have a Microsoft Entra Conditional Access policy with the following configurations, you must exclude the Microsoft Intune cloud app from the policy: *Require a device to be marked as compliant* setting is used to grant or block access. The policy applies to **All Cloud apps**, **Android**, and **Browsers**."*

**Findings (scope — universal or tenant-conditional):**

[VERIFIED: MS Learn] The exclusion is **tenant-conditional** — it applies ONLY if the tenant has a CA policy matching the described configuration (compliance-grant OR block, applied to All Cloud apps / Android / Browsers). Tenants without such a CA policy are unaffected. This confirms Phase 36 D-07's tenant-conditional framing.

[VERIFIED: MS Learn Entra CA concept-cloud-apps] UI navigation in Entra ID: Conditional Access → Policies → [select policy] → Assignments → Target resources → Cloud apps or actions → Exclude → search for "Microsoft Intune" → select → Save. Note: the cloud app name is "**Microsoft Intune**" (not "Microsoft Intune Enrollment" — those are distinct apps; the enrollment flow uses the Intune cloud app specifically).

**Confidence:** HIGH (both MS Learn pages agree verbatim on the requirement; Entra CA UI navigation is well-documented and stable). Phase 36 D-16 executor-time re-verification captures any future Entra CA UI shifts.

**Implication for plan:** The Prerequisites block (D-07, 200-300 words) MUST carry the tenant-conditional framing verbatim from MS Learn (so the reader understands this is conditional on their existing CA policy posture, not a universal prereq). The inline reminder at the Chrome-tab setup step MUST be one sentence per D-07. Per D-09, the doc MUST NOT link to any v1.0-v1.3 CA-timing reference (no cross-link to `admin-setup-ios/06-compliance-policy.md`). The doc describes WHAT to exclude ("Microsoft Intune cloud app") and WHY ("Chrome tab used for Entra authentication"), NOT WHERE in Entra ID to configure it (admins bring Entra knowledge; cross-platform nav integration is Phase 42+).

### Flag verification summary

| Flag | Confidence | Conclusion | Action |
|------|-----------|------------|--------|
| 1. COPE wording | MEDIUM | Phrase "Google recommends WPCO" is project paraphrase of supported technical direction; no Google source uses the exact phrase; no source contradicts it. | Use D-03 locked phrasing with inline MEDIUM-confidence marker citing `_glossary-android.md#cope` and Bayton Android-11-COPE-changes article. Enforce D-04 audit grep. |
| 2. Token expiry | HIGH | Default token no expiry; staging token configurable up to 65 years. "90-day max" is AOSP-scoped only. | Document both token types; disavow 90-day language for COBO. |
| 3. Android 15 FRP + EFRP | HIGH (behavior) / MEDIUM (Intune UI path) | FRP hardens on Android 15; EFRP is configured via Intune Device Restrictions profile. | Cross-link Phase 34 matrix for behavior narrative; carry step-level EFRP configuration per D-05 with MEDIUM-confidence marker on portal path per D-16. |
| 4. Chrome-tab CA exclusion | HIGH | MS Learn (2026-04-16) confirms verbatim: exclude Microsoft Intune cloud app if tenant has compliance-grant/Block CA policy on All Cloud apps + Android + Browsers. Tenant-conditional. | Document tenant-conditional framing per D-07; do NOT link to v1.0-v1.3 CA files per D-09. |

## Section-by-Section Content Outline

Phase 36 CONTEXT.md D-11 specifies ten sections with length allocations. Each section below lists the specific content points that must appear, sourced from research and anchored to the locked decisions.

### Section 1 — Overview / Platform Gate / How to Use This Guide (200-300 words)

Content points:
- Frontmatter per D-13 (`platform: Android`, `audience: admin`, `applies_to: COBO`, `last_verified: 2026-04-21`, `review_by: 2026-06-20`).
- Platform-gate blockquote (precedent from Phase 35 docs): one paragraph covering scope ("This guide covers Android Enterprise Fully Managed (COBO) enrollment through Microsoft Intune"), cross-platform routing to iOS / macOS admin setup, cross-reference to `_glossary-android.md`.
- What this guide covers — bullet list: enrollment profile creation, token management, all four provisioning methods with COBO-specific constraint callouts, COPE migration note, Android 15 FRP + EFRP configuration, Entra join behavior + CA exclusion.
- What this guide does NOT cover — bullet list (per CONTEXT.md): MGP binding mechanics (Phase 35), ZT portal mechanics (Phase 35), corporate-scale ZTE (Phase 39), provisioning-method matrix (Phase 34), COPE full admin path (v1.4.1), KME (v1.4.1), L1/L2 runbooks (Phase 40/41).
- "How to Use This Guide" audience routing (per iOS `03-ade-enrollment-profile.md` precedent): Admin → linear read; L1 → use Phase 40 runbooks instead; L2 → use Phase 41 investigation docs instead.
- Optional: COBO-specific "Portal shorthand reminder" per CONTEXT.md Claude's Discretion.

### Section 2 — Key Concepts (150-250 words) — anchor `#key-concepts`

Content points (per D-08):
- **Work profile IS the entire device.** On COBO, the managed "work profile" is not a partition — it is the complete device scope. No personal apps, no personal data, no user-controlled partition. (Version-tagged: applies to Android 10.0+ which is the COBO minimum per `03-android-version-matrix.md`.)
- **Entra join behavior.** The device is Entra-joined during enrollment. Authentication uses a Chrome Custom Tab (the OS-launched Chrome tab during device setup) to complete Entra sign-in. This is the mechanism that makes D-07's CA-exclusion callout load-bearing.
- **Cross-link** to `_glossary-android.md#fully-managed` for the authoritative glossary definition.
- **Cross-platform note** (per Phase 34 D-10 pattern): "Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation. See `_glossary-android.md#fully-managed`."
- **Forbidden terminology:** "supervision" (per AEAUDIT-04 no-supervision-as-Android-term rule).

### Section 3 — Prerequisites (200-300 words) — anchor `#prerequisites`

Content points (per D-07 hybrid, D-08 conceptual placement):
- **Hard prereqs (checklist):**
  - Intune Plan 1 or higher with Intune Administrator role.
  - MGP binding complete (cross-link to `01-managed-google-play.md#bind-mgp`). Anti-Pattern 1 guard: do NOT restate binding steps.
  - Entra join enabled on the tenant (hard prereq — without this COBO enrollment fails at token-generation). Anchor `#entra-join-prerequisite`.
  - Factory-reset or new device (COBO requires out-of-box state).
  - Android 10.0+ (hard requirement per MS Learn `setup-fully-managed` and `03-android-version-matrix.md#cobo`). Cross-link — do NOT restate version.
  - GMS connectivity on the device.
- **Tenant-conditional prereq (separate callout):**
  - Conditional Access exclusion for Microsoft Intune cloud app — IF your tenant uses Conditional Access. Per D-07, explicitly framed as tenant-conditional. Anchor `#ca-exclusion-intune-app`. Include the verbatim MS Learn explanation: "The Android setup process uses a Chrome tab to authenticate your users during enrollment." Body: "If your tenant has a Conditional Access policy using the *require a device to be marked as compliant* Grant control or a Block policy applying to **All Cloud apps**, **Android**, and **Browsers**, you must exclude the **Microsoft Intune** cloud app from this policy."
- **What breaks if missing Entra join:** enrollment fails at token-generation with opaque error. Symptom in: Intune admin center.
- **What breaks if missing CA exclusion (tenant-conditional):** Chrome tab sign-in fails during COBO setup; admin sees opaque 'sign-in blocked' error on device; symptom in: device setup flow + Entra ID sign-in logs.

### Section 4 — COPE Migration Note (150-250 words) — anchor `#cope-migration`

Content points (per D-03, D-04):
- Optional one-line framing sentence per CONTEXT.md Claude's Discretion: "If you have existing COPE deployments, read this before creating a new COBO profile."
- Google's current wording per D-03 SC2 lock: **"Google recommends WPCO (Work Profile on Corporate-Owned)."** Use this verbatim once.
- Brief migration context:
  - COPE is still functional on Android 10+ (no formal Google deprecation notice — avoid "COPE deprecated" per D-04 audit rule).
  - NFC and afw#setup lost COPE support on Android 11+ (version-tagged; cross-link to `02-provisioning-methods.md`, do not restate matrix).
  - WPCO is the forward-looking Google terminology; it is the "work profile on company-owned device" pattern.
- "See also" stub to PROJECT.md deferred items (v1.4.1 COPE full admin path) — text-only reference if PROJECT.md v1.4.1 section not yet present (precedent from Phase 35 D-14).
- MEDIUM-confidence inline marker: the wording "Google recommends WPCO" paraphrases Google's technical direction (Android 11 removal of work-profile-on-fully-managed in favor of work-profile-on-company-owned) as documented in `_glossary-android.md#cope` and Bayton's Android 11 COPE changes article.
- **Negative guards (D-04 audit):** zero hits for "COPE deprecated" / "deprecated COPE"; exactly one hit for "recommends WPCO" inside this section.

### Section 5 — Enrollment profile creation (300-500 words) — anchor `#enrollment-profile`

Content points (sourced from MS Learn `setup-fully-managed` updated 2026-04-16):
- **Prereq recap (one sentence, cross-link upward):** MGP binding complete; Intune Administrator role; see Prerequisites above.
- **Navigation:** Microsoft Intune admin center (`endpoint.microsoft.com`) → Devices → Enrollment → Android tab → Android Enterprise → Enrollment Profiles → "Corporate-owned, fully managed user devices" → Create policy.
- **Profile basics:**
  - Name — note for later (needed for dynamic device-group rule matching via `enrollmentProfileName`).
  - Description (optional but recommended).
  - **Token type (critical decision):** Default (corporate-owned, fully managed) — supports enrollment-time grouping, no expiry; **OR** Staging (corporate-owned, fully managed, via staging) — supports third-party pre-provisioning via `setup-fully-managed` doc's device-staging reference, configurable expiry up to 65 years, does NOT support enrollment-time grouping.
  - Token expiration date (only applicable to staging token).
  - Naming template (optional) — strings like `{{SERIAL}}`, `{{SERIALLAST4DIGITS}}`, `{{DEVICETYPE}}`, `{{ENROLLMENTDATETIME}}`, `{{UPNPREFIX}}`, `{{USERNAME}}`, `{{RAND:x}}`.
- **Device group (optional):** Select static Entra device group for enrollment-time grouping. Not available with default enrollment profile; use a custom profile for dynamic grouping.
- **Scope tags (optional):** Limit profile visibility per RBAC.
- **What breaks if misconfigured** (per D-11 what-breaks 300-500w accumulation):
  - Enrollment profile renamed after assignment → breaks future enrollments; must create new profile with new name, reassign, delete old (PITFALLS.md Pitfall-quick-reference line 385-386).
  - Device group assigned to group that excludes intended devices → token-check fails; symptom in: device setup flow.
  - Scope tag restricting admin visibility applied incorrectly → admin cannot see the profile post-creation; symptom in: Intune admin center.
- **Dynamic Entra device-group rule** (optional): Set `enrollmentProfileName Equals [profile name]`. Cannot be used with default enrollment profile.
- **Version tag:** Applies to Intune Android Enterprise enrollment as of MS Learn `setup-fully-managed` 2025-05-08 / updated 2026-04-16.

### Section 6 — Enrollment token management (200-350 words) — anchor `#enrollment-token`

Content points (per research flag 2 HIGH-confidence findings):
- **Token types and semantics:**

| Token type | Expiry | Enrollment-time grouping | Use case |
|------------|--------|-------------------------|----------|
| Default (corporate-owned, fully managed) | **Does not expire** | Supported | Standard COBO enrollments |
| Staging (corporate-owned, fully managed, via staging) | Configurable up to **65 years** (default 65y) | NOT supported | Third-party pre-provisioning flows |

- **Token lifecycle operations (from MS Learn `setup-fully-managed`):**
  - **Replace token:** Generate a new token nearing expiration. Applies to staging tokens only (default doesn't expire).
  - **Revoke token:** Immediately expire the token. Use after accidentally sharing with an unauthorized party, or after all enrollments are complete. Does not affect devices already enrolled.
  - **Export token:** Export JSON content — needed for Google Zero-Touch DPC extras or Knox Mobile Enrollment configuration.
- **Explicit disavowal of legacy language (per PITFALL 1, D-12):** The "90-day max" language applies ONLY to AOSP corporate user-associated tokens per PITFALLS.md line 31; it does NOT apply to COBO/Fully Managed. State this explicitly to prevent drift.
- **What breaks (per D-11):**
  - Staging token expiry prematurely revoked → devices in enrollment flow fail at token-check with opaque error. Recovery: regenerate token and redistribute.
  - Token assigned to wrong group → devices fail token-check. Assign broadly or to a parent group.
  - Exported token shared insecurely → unauthorized enrollments. Revoke immediately.
- **Version tag:** Applies to Intune Android Enterprise enrollment as of MS Learn 2026-04-16.
- **Renewal pointer:** Cross-link forward to `#renewal-maintenance` for rotation cadence guidance.

### Section 7 — Provisioning method choice (400-650 words) — anchor `#provisioning-method-choice`

Content points (per D-01 hybrid routing + D-02 filtered-row pattern):
- **One-paragraph framing:** COBO supports all four provisioning methods (QR / NFC / afw#setup / Zero-Touch). The full method-availability and cross-mode support matrix is in `02-provisioning-methods.md`. This section carries COBO-specific constraint callouts that add value beyond the matrix.
- **Cross-link pattern (per D-02):** "For version-availability and cross-mode support, see `02-provisioning-methods.md#[method-anchor]`." Phase 36 never states a method's Android min-version directly.
- **Per-method constraint callouts:**

  - **QR code** (anchor subsection):
    - COBO-specific constraint: internet BEFORE scanning is required on Android 7-8 (built-in QR reader arrived Android 9).
    - QR artifact sensitivity (PITFALL 5): QR codes embed enrollment tokens and Wi-Fi credentials in plaintext; never commit tenant-specific QR images to git, never email, never post to a public SharePoint.
    - Filtered-row link: "For QR version-availability across modes, see `02-provisioning-methods.md#qr-code`."
    - What breaks: QR image captured from Intune portal expires with the token; regenerate per deployment batch.

  - **NFC bump** (anchor subsection):
    - COBO-specific constraint: COBO retains NFC support on Android 10+ (the Android-11 COPE NFC removal does NOT affect COBO). Version-tagged per PITFALL 1.
    - Payload limit: NFC Forum Type 2 Tag, 888-byte payload (PITFALLS.md line 132). Wi-Fi credentials + DPC extras may exceed; use shorter SSID / drop optional extras.
    - Filtered-row link: "For NFC version-availability across modes, see `02-provisioning-methods.md#nfc`."
    - What breaks: NFC Beam removed Android 10; NFC provisioning uses NFC tags (Type 2), not device-to-device bump.

  - **afw#setup (DPC identifier)** (anchor subsection):
    - COBO-specific constraint: still supported for COBO on Android 11+ (contrast: COPE support removed on Android 11+ per `02-provisioning-methods.md#afw-setup`).
    - Google-sign-in-screen tripwire: type `afw#setup` instead of a Gmail address at the initial Google sign-in prompt during factory-reset setup.
    - System apps disabled by default in this provisioning path (PITFALL 5 caveat); EMM configuration must re-enable required system apps.
    - Filtered-row link: "For afw#setup version-availability, see `02-provisioning-methods.md#afw-setup`."
    - What breaks: system apps disabled post-provisioning if EMM config doesn't explicitly re-enable.

  - **Zero-Touch** (anchor subsection):
    - COBO-specific constraint: requires Phase 35 ZT portal binding; cross-link to `02-zero-touch-portal.md#link-zt-to-intune`.
    - **D-06 KME/ZT mutual-exclusion one-liner (MANDATORY):** "Samsung Knox fleets: choose Knox Mobile Enrollment (KME) or Zero-Touch, never both. Full KME coverage deferred to v1.4.1." Cross-link to `02-zero-touch-portal.md#kme-zt-mutual-exclusion`.
    - Dual-SIM IMEI 1 is Phase 39 scope (do NOT carry in Phase 36 per Phase 35 D-22 locked split).
    - Filtered-row link: "For Zero-Touch version-availability, see `02-provisioning-methods.md#zero-touch`."
    - What breaks: device connects to captive-portal Wi-Fi at first boot → ZT config download fails → device falls through to consumer OOBE.

### Section 8 — Android 15 FRP and EFRP (300-450 words) — anchors `#android-15-frp` and `#configure-efrp`

Content points (per D-05, research flag 3 findings):
- **Top-of-section ⚠️ blockquote (per D-05):** "**Configure EFRP before any factory reset on Android 15 devices; FRP hardening can block re-enrollment.**"
- **What changed on Android 15** (version-tagged per PITFALL 1):
  - OEM unlock setting no longer deactivates FRP.
  - Bypassing setup wizard no longer deactivates FRP.
  - FRP remains active even when OEM unlock is enabled.
  - EFRP enforced after hard factory reset regardless of OEM unlock toggle.
  - Result: re-enrollment flows that worked on Android 13/14 can block on Android 15 unless EFRP is configured before reset.
  - Cross-link: "For the authoritative version-behavior narrative, see `../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint`." (Do NOT restate.)
- **Admin action required (SC3 verbatim lock):** "Configure Enterprise Factory Reset Protection (EFRP) via Intune policy **before** any device reset."
- **Step-level EFRP configuration** (anchor `#configure-efrp`) — MEDIUM-confidence portal-UI marker per D-16:
  1. In the Microsoft Intune admin center, navigate to Devices → Configuration → Create profile.
  2. Platform: **Android Enterprise**.
  3. Profile type: **"Fully managed, dedicated, and corporate-owned work profile — Device restrictions"**.
  4. Under **General**, configure **Factory reset protection emails** — add the Google account email address(es) authorized to unlock a post-reset device.
  5. Assign to all COBO devices (or a targeted device group).
  6. Save and assign.
- **What breaks (per D-11):** EFRP not assigned to COBO devices before a factory reset → FRP locks device post-reset → re-enrollment requires Google-account credential intervention (PITFALLS.md Recovery Strategies line 436 — HIGH recovery cost).
- **Cross-link references:**
  - Google AE Help — Enable enterprise factory reset protection: `support.google.com/work/android/answer/14549362`.
  - MS Learn — Factory Reset Protection Emails Not Enforced (troubleshooting context): `learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced`.
  - Phase 34 version matrix: `../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint`.
- **Confidence marker:** MEDIUM on Intune admin center navigation (portal UI may shift between tenants); last_verified 2026-04-21.
- **Phase 38 scope guard (D-05):** Dedicated-specific FRP re-provisioning behavior is Phase 38's parallel-but-distinct callout. Phase 36 does NOT pre-empt Phase 38 content.

### Section 9 — What-Breaks inline callouts (300-500 words cumulative) — anchor `#what-breaks`

Content points (per D-11 inline pattern, PITFALL 2 inheritance):
- Inline placement only — no bottom "gotchas section" (per Phase 35 D-21 F-071 precedent; severity-descending within each section per CONTEXT.md Claude's Discretion).
- **Coverage checklist** (cumulative across sections 3, 5, 6, 7, 8):
  - Entra join not enabled → token-generation fails (Section 3).
  - CA exclusion for Microsoft Intune cloud app missing (tenant-conditional) → Chrome-tab sign-in fails (Section 3).
  - Enrollment profile renamed after assignment → breaks future enrollments (Section 5).
  - Enrollment profile scope tag misapplied → admin can't see profile post-creation (Section 5).
  - Staging token expiry prematurely revoked → devices fail at token-check (Section 6).
  - Token assigned to wrong group → devices fail at token-check (Section 6).
  - Token exported and shared insecurely → unauthorized enrollments (Section 6).
  - QR code image stale/expired → enrollment scan fails (Section 7 — QR).
  - NFC tag payload exceeds 888 bytes → NFC provisioning fails (Section 7 — NFC).
  - afw#setup system apps disabled by EMM policy → broken device state post-provisioning (Section 7 — afw#setup).
  - ZT device connects to captive-portal Wi-Fi at first boot → ZT fails to consumer OOBE (Section 7 — ZT).
  - KME + ZT dual-configured on Samsung → out-of-sync state (Section 7 — ZT + D-06).
  - EFRP not assigned before Android 15 reset → FRP locks device post-reset (Section 8).

### Section 10 — Renewal / Maintenance (150-250 words) — anchor `#renewal-maintenance`

Content points (per admin-template-android.md MANDATORY section):

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|----------------|----------------------|---------------|
| MGP binding | No expiry if Entra account remains active | New app approvals and app distribution to enrolled devices stop | Re-bind via Intune admin center (cross-link to `01-managed-google-play.md#renewal-maintenance`) |
| Staging enrollment token | Configurable up to 65 years; default 65y | New enrollments using the token fail; existing enrolled devices unaffected | Regenerate via Intune admin center → Devices → Enrollment → [profile] → Token → Replace |
| ZT reseller contract (if using ZT) | Reseller-specific, typically annual | New device IMEI/serial uploads from reseller stop appearing in ZT portal | Contact reseller; cross-link to `02-zero-touch-portal.md#renewal-maintenance` |
| EFRP policy assignment | Review every 60 days (review_by frontmatter) | EFRP drift → reset devices may lock despite policy existing | Audit Device Restrictions profile assignment; verify target group includes all COBO devices |

- **Rotation cadence guidance:**
  - Token rotation: not required for default token (no expiry); for staging tokens, rotate every 1-2 years even if 65-year default, to align with tenant security review cadence.
  - MGP binding review: verify Entra account still active during each 60-day doc review cycle.
  - EFRP policy drift check: audit assignment during 60-day review.

## Cross-Reference Targets

Explicit anchor names that Phase 36 cross-links TO, and that Phase 38/39/40/41 will cross-link back FROM.

### Phase 36 consumes (outbound cross-references)

**From Phase 34 (foundation):**
| Target anchor | Source file | Used for |
|---|---|---|
| `#fully-managed` | `_glossary-android.md` | Section 2 Key Concepts — authoritative COBO definition |
| `#managed-google-play` | `_glossary-android.md` | First mention of MGP |
| `#zero-touch-enrollment` | `_glossary-android.md` | First mention of ZT in Section 7 |
| `#dpc` | `_glossary-android.md` | afw#setup subsection in Section 7 |
| `#afw-setup` | `_glossary-android.md` | afw#setup subsection in Section 7 |
| `#play-integrity` | `_glossary-android.md` | Any compliance reference (avoid SafetyNet) |
| `#cope` | `_glossary-android.md` | Section 4 COPE Migration Note |
| `#wpco` | `_glossary-android.md` | Section 4 COPE Migration Note |
| `#cobo` | `android-lifecycle/03-android-version-matrix.md` | Section 3 Prerequisites — Android 10+ version gate |
| `#android-15-breakpoint` | `android-lifecycle/03-android-version-matrix.md` | Section 8 Android 15 FRP behavior narrative (VERIFIED exists at lines 67-78) |
| `#android-11-breakpoint` | `android-lifecycle/03-android-version-matrix.md` | Section 4 COPE Migration Note — NFC/afw#setup COPE removal context |
| `#qr-code`, `#nfc`, `#afw-setup`, `#zero-touch` | `android-lifecycle/02-provisioning-methods.md` | Section 7 per-method filtered-row links (D-02 pattern) — exact anchor names should be confirmed against Phase 34 matrix doc at authoring time; fallbacks: consult matrix method-column headers |
| `#fully-managed` (mode-definition target) | `android-lifecycle/00-enrollment-overview.md` | Section 2 Key Concepts |

**From Phase 35 (prerequisites):**
| Target anchor | Source file | Used for |
|---|---|---|
| `#bind-mgp` | `admin-setup-android/01-managed-google-play.md` | Section 3 Prerequisites — MGP binding prereq (VERIFIED line 80 of MGP doc) |
| `#account-types` | `admin-setup-android/01-managed-google-play.md` | Section 3 Prerequisites — account-type gotcha context (VERIFIED line 29 of MGP doc) |
| `#disconnect-consequences` | `admin-setup-android/01-managed-google-play.md` | Renewal/Maintenance (VERIFIED line 103 of MGP doc) |
| `#link-zt-to-intune` | `admin-setup-android/02-zero-touch-portal.md` | Section 7 ZT inline callout (VERIFIED line 56 of ZT portal doc) |
| `#dpc-extras-json` | `admin-setup-android/02-zero-touch-portal.md` | Section 7 ZT inline callout (VERIFIED line 88 of ZT portal doc) |
| `#kme-zt-mutual-exclusion` | `admin-setup-android/02-zero-touch-portal.md` | Section 7 D-06 KME/ZT one-liner (VERIFIED line 119 of ZT portal doc) |
| `#step-0-reseller` | `admin-setup-android/02-zero-touch-portal.md` | Optional reference in Section 7 (VERIFIED line 32 of ZT portal doc) |

### Phase 36 publishes (stable anchors for Phase 38/39/40/41 consumers, per D-10)

| Anchor | Section | Consumer phase(s) |
|--------|---------|-------------------|
| `#key-concepts` | Section 2 | Phase 38 (Dedicated reuses conceptual link) |
| `#prerequisites` | Section 3 | Phase 38, Phase 40, Phase 41 |
| `#cope-migration` | Section 4 | Phase 42 audit (zero "COPE deprecated" hits) |
| `#enrollment-profile` | Section 5 | Phase 38 (Dedicated extends COBO enrollment profile structure per ROADMAP Phase 38 line 155), Phase 40 (runbook 24), Phase 41 (runbook 19) |
| `#enrollment-token` | Section 6 | Phase 40 (runbook 24 "Device not enrolled"), Phase 41 |
| `#provisioning-method-choice` | Section 7 | Phase 38 (Dedicated shares COBO provisioning mechanics), Phase 40 |
| `#entra-join-prerequisite` | Section 3 | Phase 40, Phase 41 |
| `#ca-exclusion-intune-app` | Section 3 | Phase 40 compliance runbook (runbook 25) |
| `#android-15-frp` | Section 8 | Phase 41 (runbook 19 enrollment investigation) |
| `#configure-efrp` | Section 8 | Phase 38 (Dedicated-specific FRP callout cross-references for "what is EFRP"), Phase 41 |
| `#what-breaks` | Sections 3/5/6/7/8 | Phase 40, Phase 41 |
| `#renewal-maintenance` | Section 10 | Phase 42 audit (every admin doc has this section) |

**Anchor stability contract:** Phase 38 per ROADMAP line 155 depends on Phase 36 "shared COBO provisioning mechanics; dedicated extends COBO enrollment profile structure." Renaming `#enrollment-profile` or `#provisioning-method-choice` breaks Phase 38. Phase 40 runbook 24 depends on `#enrollment-token`; Phase 41 runbook 19 depends on `#enrollment-profile` + `#android-15-frp`.

## Risk Surface

Phase 36 implementation risks and mitigations, organized by the PITFALLS.md items called out in CONTEXT.md (PITFALL 1, 2, 5, 11) plus adjacent risks that emerge from the section outline.

### PITFALL 1 — Technical accuracy decay / version drift

**Risk for Phase 36:** Every behavioral assertion in a 2800-3800-word doc is a potential drift point. High-risk claims specific to this phase:
- Enrollment token expiry values (correct: default no expiry; staging up to 65 years; AOSP 90-day is scoped OUT of this doc).
- NFC COPE-restriction framing ("NFC lost COPE support on Android 11+" — NOT "NFC doesn't work on Android 11+").
- afw#setup COPE-restriction framing (still supported for COBO on Android 11+; removed for COPE).
- Android 15 FRP behavior (precise delta from Android 13/14).
- Intune admin center EFRP navigation path (portal UI shifts).
- SafetyNet must NOT appear (deprecated January 2025; replaced by Play Integrity).

**Mitigation (per D-12, D-15, D-16):**
- Every behavioral assertion carries inline version tag ("Applies to Android 10.0+", "Changed in Android 11", "On Android 15", etc.).
- Phase 42 AEAUDIT-04 grep patterns enforce: zero "SafetyNet" hits; zero "supervision" as Android term.
- MEDIUM-confidence inline markers with `last_verified: 2026-04-21` on portal-UI-specific claims (EFRP navigation) per D-16.
- Cross-link to Phase 34 matrices instead of restating versions (D-02 filtered-row pattern).

### PITFALL 2 — What-breaks per-setting callouts placed at point of decision

**Risk for Phase 36:** 2800-3800 words with many configurable settings. If what-breaks callouts are placed in a bottom "gotchas" appendix, the SC5 inline-at-decision requirement is violated (Phase 35 D-21 F-071 precedent).

**Mitigation:** Per Section 9 checklist, every configurable setting (enrollment profile, token type, token expiry, provisioning-method choice, Entra join, CA exclusion, EFRP policy) carries an inline "What breaks if misconfigured" callout IMMEDIATELY AFTER the action step, BEFORE the next step. Severity-descending ordering within each section per CONTEXT.md Claude's Discretion. PITFALL 2 inheritance from admin-template-android.md.

### PITFALL 5 — Provisioning method misrouting / dead-end enrollments

**Risk for Phase 36:** Four provisioning methods with different constraints. If the doc describes "the" COBO provisioning method, admins pick whichever is easiest to explain (usually QR) without understanding when afw#setup, NFC, or Zero-Touch is the better choice.

**Mitigation (per D-01, D-02):** Section 7 carries all four methods with COBO-specific constraint callouts. Anti-Pattern 1 guard: no matrix duplication (the Phase 34 matrix is authoritative). Filtered-row cross-links per method. PITFALL 5 warning signs audited:
- No QR image embedded (QR codes are sensitive, tenant-specific, and expire).
- afw#setup system-app caveat included.
- NFC COPE-restriction version-tagged (Android 11+ COPE removal does NOT affect COBO).
- Reseller requirement for ZT flagged via cross-link to Phase 35 ZT doc (Phase 36 does not re-state Step 0 reseller mechanics).

### PITFALL 11 — Samsung KME vs ZT mutual exclusion

**Risk for Phase 36:** Samsung COBO admins may configure both KME and ZT simultaneously, causing out-of-sync state (PITFALLS.md Recovery Strategies line 434 — HIGH recovery cost: factory reset affected devices).

**Mitigation (per D-06):** D-06 locks a one-line KME/ZT mutual-exclusion reminder inside the Section 7 ZT inline callout, with cross-link to `02-zero-touch-portal.md#kme-zt-mutual-exclusion`. Full KME coverage deferred to v1.4.1. The `_glossary-android.md` has an entry pattern to reuse. Phase 39 owns the full device-claim-step KME callout per Phase 35 D-22 locked split.

### Additional risks specific to Phase 36

**Risk A — Cross-reference dangling links:**
- Phase 34 `02-provisioning-methods.md` method anchors (`#qr-code`, `#nfc`, `#afw-setup`, `#zero-touch`) must exist. Per Phase 34 D-23 matrix orientation, the method anchors are column-header anchors; this needs verification at authoring time. If anchor names differ in the Phase 34 matrix, update Phase 36 filtered-row links to match.
- `03-android-version-matrix.md#android-15-breakpoint` — VERIFIED present at line 67 of the version matrix file.
- `_glossary-android.md#wpco` and `#cope` — VERIFIED present at lines 75 and 47 of the glossary file.
- `01-managed-google-play.md#bind-mgp`, `#account-types`, `#disconnect-consequences` — VERIFIED at lines 80, 29, 103.
- `02-zero-touch-portal.md#link-zt-to-intune`, `#dpc-extras-json`, `#kme-zt-mutual-exclusion`, `#step-0-reseller` — VERIFIED at lines 56, 88, 119, 32.

**Mitigation:** Plan-phase authoring MUST grep the current state of the Phase 34 matrix file for method anchors before committing cross-link syntax. Wave 0 of the plan (if multi-wave) should include an anchor-integrity audit as a validation step.

**Risk B — COPE wording MEDIUM-confidence paraphrase:**
- Phase 36 D-03 locks "Google recommends WPCO" but no Google source uses this verbatim phrase (research flag 1 finding).

**Mitigation:** Section 4 COPE Migration Note includes a MEDIUM-confidence inline marker with `last_verified: 2026-04-21` per D-17, citing `_glossary-android.md#cope` and Bayton's Android 11 COPE changes article. The claim rests on (a) Google's Android 11 removal of work-profile-on-fully-managed in favor of work-profile-on-company-owned, (b) Bayton's direct quote, (c) Phase 34 glossary alignment — not on a Google verbatim quote.

**Risk C — Intune admin center EFRP UI path drift:**
- Research flag 3 MEDIUM-confidence on portal navigation.

**Mitigation:** Section 8 EFRP step-level configuration carries a MEDIUM-confidence inline marker with `last_verified` date per D-16. Executor re-verifies at execute time. Fallback: if navigation has shifted, update to new path and bump `last_verified`.

**Risk D — Shared-file accidental modification:**
- Any of `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`, `_glossary.md`, `_glossary-macos.md`, or any file under `admin-setup-ios/`, `admin-setup-macos/`, `l1-runbooks/`, `l2-runbooks/`.

**Mitigation (per D-14):** Phase 36 creates only ONE new file (`docs/admin-setup-android/03-fully-managed-cobo.md`). Plan-phase VERIFICATION step: `git diff` after authoring MUST show exactly one new file; zero modifications to shared files. Phase 42 AEAUDIT-04 milestone audit will grep for Android links in shared files as well.

**Risk E — Length-target discipline:**
- D-11 specifies 2800-3800 words total with per-section allocations. Going under 2800 signals missing content; going over 3800 signals scope creep.

**Mitigation:** Use `wc -w` during authoring; target total ~3200 words (mid-range). Per-section word budgets per D-11 are allocation guidance; the total range is the binding contract.

## Runtime State Inventory

Not applicable. Phase 36 is a pure content/documentation phase with no runtime state, no renames, no migrations, no stored data. Categories "stored data", "live service config", "OS-registered state", "secrets/env vars", "build artifacts" all: **None — this phase creates one new markdown file and makes no modifications to existing files or runtime systems.**

## Environment Availability

Not applicable. Phase 36 requires only standard doc-authoring tooling (git, a text editor, optionally a markdown linter). No external tools, runtimes, CLIs, databases, or services are needed. All research-source URLs verified accessible (MS Learn, Google AE Help, Bayton) via WebFetch in the verification step above; no tokens, credentials, or authenticated services are required.

## Validation Architecture

Phase 36 is a documentation phase, not a code phase. The `.planning/config.json` does NOT set `workflow.nyquist_validation: false`, so the section is included per the Nyquist protocol. Validation dimensions are content-quality based and match the AEAUDIT-04 milestone audit requirements — they are grep-based and cross-reference-integrity-based, not unit/integration test based.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Shell-based content audits (grep, git diff, wc) — NO pytest / jest / vitest framework needed |
| Config file | None required — audit commands are ad-hoc |
| Quick run command | `grep -n -iE "safetynet\|supervision\|COPE deprecated\|deprecated COPE" docs/admin-setup-android/03-fully-managed-cobo.md` (must return zero hits for each term) |
| Full suite command | See VALIDATION.md recommendation below — 8-dimension audit bundled as a shell script or manual checklist |
| Phase gate | Full audit suite clean before `/gsd-verify-work` |

### Phase Requirements → Audit Map

| Req ID | Behavior | Audit Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AECOBO-01 | Doc covers 4 provisioning methods, enrollment profile, token, Entra join | content-quality (manual read + grep) | `grep -c -iE "^## " docs/admin-setup-android/03-fully-managed-cobo.md` (must return >= 10 sections per D-11); `grep -iE "(QR code\|NFC\|afw#setup\|Zero.Touch)" docs/admin-setup-android/03-fully-managed-cobo.md` (must match all four) | ❌ Wave 0 (doc doesn't exist yet) |
| AECOBO-02 | COPE migration note uses "Google recommends WPCO"; avoids "COPE deprecated" | grep | `grep -c "recommends WPCO" docs/admin-setup-android/03-fully-managed-cobo.md` (must equal 1 per D-04); `grep -ciE "COPE deprecated\|deprecated COPE" docs/admin-setup-android/03-fully-managed-cobo.md` (must equal 0 per D-04) | ❌ Wave 0 |
| AECOBO-03 | Android 15 FRP callout + EFRP configuration via Intune policy | grep | `grep -iE "Android 15.*FRP\|EFRP\|Factory Reset Protection" docs/admin-setup-android/03-fully-managed-cobo.md` (must match); `grep -iE "Enterprise.Factory.Reset.Protection" docs/admin-setup-android/03-fully-managed-cobo.md` (must match) | ❌ Wave 0 |

### Content-Quality Audit Dimensions

| Dimension | Audit Method | Pass Criteria |
|-----------|--------------|---------------|
| **1. Stable anchor presence** | Grep for each of the 12 anchors listed in D-10 | All 12 anchors present as HTML `<a id="..."></a>` tags or markdown headings that slugify to these anchors |
| **2. No forbidden terminology (AEAUDIT-04)** | Grep for "SafetyNet" (must = 0); grep for "supervision" (must = 0 as Android term — allowed if within a cross-platform callout contrasting with iOS) | Zero hits for SafetyNet; "supervision" only appears inside cross-platform callout blockquotes |
| **3. COPE wording discipline (D-04)** | Grep `recommends WPCO` (must = 1); grep `COPE deprecated` (must = 0); grep `deprecated COPE` (must = 0) | Exact counts met |
| **4. Version-tag presence on behavioral assertions (PITFALL 1)** | Manual read + grep for version assertions without version tag (e.g., assertions mentioning "NFC", "QR", "afw#setup", "FRP" without adjacent "Android X" or "Android X+") | No unversioned behavioral assertions; cross-links to version matrix count as version-tagged |
| **5. Cross-reference integrity** | For each cross-link in the doc, grep for the target anchor in the target file | Every outbound cross-link resolves to an existing anchor in an existing file |
| **6. Frontmatter schema compliance (D-13)** | Parse YAML frontmatter; verify `platform: Android`, `audience: admin`, `applies_to: COBO`, `last_verified` is an ISO date, `review_by` is `last_verified + 60 days` | All keys present and values match spec |
| **7. Length target (D-11)** | `wc -w docs/admin-setup-android/03-fully-managed-cobo.md` | Count is in 2800-3800 word range |
| **8. Shared-file modification guard (D-14)** | `git diff --name-only HEAD~1 HEAD` or similar scope grep | Exactly one new file added; zero shared-file modifications |

### Sampling Rate
- **Per task commit:** Dimensions 2, 3, 6, 8 (fast grep-based audits).
- **Per wave merge:** Full 8-dimension audit.
- **Phase gate:** Full 8-dimension audit clean before `/gsd-verify-work`. Phase 42 AEAUDIT-04 milestone audit will re-run dimensions 2 + 8 across all v1.4 Android docs.

### Wave 0 Gaps

No pre-existing test infrastructure is needed for a documentation phase. The plan researcher recommends creating:
- [ ] **`.planning/phases/36-fully-managed-cobo-admin/36-VALIDATION.md`** — a single markdown checklist file bundling the 8 content-quality audit commands with expected pass criteria. This is referenced from PLAN.md and used by the executor at task-completion time and by `/gsd-verify-work` at phase-completion time. Precedent: Phase 35 already has a VALIDATION.md pattern under its phase directory; Phase 36 mirrors it with content-quality-specific audits.
- [ ] No framework install needed.
- [ ] No conftest / fixtures needed.

## Security Domain

`.planning/config.json` does not set `security_enforcement: false`; per default, the section is included.

### Applicable ASVS Categories

Phase 36 is a documentation-only phase. It produces no executable code, handles no user data, exposes no endpoints, and makes no security decisions at runtime. ASVS categories apply to the *content* of the documented procedures, not to a code attack surface.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | indirect | Documented Entra sign-in via Chrome Custom Tab uses modern Entra authentication; doc describes mechanism, not implementation |
| V3 Session Management | n/a | No sessions managed by this doc |
| V4 Access Control | indirect | Documented use of Intune Administrator role (RBAC); doc relies on Intune's own access control |
| V5 Input Validation | n/a | No inputs taken by this doc |
| V6 Cryptography | indirect | Documented QR code and enrollment token are sensitive artifacts; doc instructs admins to treat them as secrets (never embed tenant-specific QR images, don't share tokens insecurely) — standard "treat as secrets" guidance, no hand-rolled crypto |

### Known Threat Patterns for Documentation of Authentication / Enrollment Flows

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Documenting tenant-specific secrets in public-facing docs | Information Disclosure | Per PITFALL 5: never embed tenant-specific QR codes or enrollment tokens in committed documentation; document generation process, not artifacts |
| Documenting insecure fallback paths (e.g., legacy auth) | Tampering / Repudiation | Section 4 COPE Migration Note explicitly routes admins to WPCO; Section 7 ZT inline callout points to Phase 35 ZT portal canonical mechanics; no legacy-auth fallbacks |
| Stale FRP / CA guidance leading to lockouts | Denial of Service | Section 8 EFRP "before you reset" ⚠️ blockquote; 60-day review cycle (D-13) catches Android 15 behavior drift; MEDIUM-confidence markers on portal-UI claims |
| Omitted CA exclusion → enrollment blocked | Denial of Service (legitimate users) | D-07 hybrid-placement of CA-exclusion prereq (hard-prereq block + inline Chrome-tab reminder) ensures admins see the requirement twice on a linear read |

**Security review recommendation:** Phase 36 doc should be spot-reviewed by a security-minded reviewer for (a) no tenant-specific secrets embedded, (b) CA exclusion framed as tenant-conditional (not universal), (c) FRP/EFRP framed as admin-action-required (not optional), (d) enrollment token handling described as secret-artifact management.

## Plan-Phase Task Shape Recommendation

**Recommendation: ONE single plan file (`36-01-PLAN.md`) producing ONE deliverable file (`docs/admin-setup-android/03-fully-managed-cobo.md`).**

### Rationale

Phase 36 produces exactly one markdown file. The doc has 10 interconnected sections (per D-11) that cross-reference each other heavily:
- Section 2 Key Concepts feeds Section 3 Prerequisites (Entra-join concept → hard prereq).
- Section 3 Prerequisites feeds Section 7 (CA-exclusion inline reminder at Chrome-tab step).
- Section 4 COPE Migration Note feeds Section 7 (NFC and afw#setup COPE removal).
- Section 5 Enrollment profile feeds Section 6 Token management (token type decision made at profile creation).
- Section 7 Provisioning method choice feeds Section 8 Android 15 FRP (every method implies reset scenarios).
- Section 9 What-Breaks accumulates callouts from Sections 3 / 5 / 6 / 7 / 8 inline (not a separate section; it is the cumulative inline discipline).

Splitting this across multiple plans would force artificial section-boundary coordination, create cross-plan anchor-stability risks, and violate the single-author-voice coherence that admin guides require (precedent: Phases 35 `01-managed-google-play.md`, `02-zero-touch-portal.md`, and iOS `03-ade-enrollment-profile.md` are each single-plan deliverables).

### Alternative considered and rejected

A 2-plan split was considered:
- Plan 1: Sections 1-6 (overview, key concepts, prereqs, COPE note, enrollment profile, token).
- Plan 2: Sections 7-10 (provisioning methods, Android 15 FRP, what-breaks, renewal).

**Rejected because:** (a) Section 9 what-breaks is inline-accumulated across Sections 3/5/6/7/8, so it cannot be a Plan 2 deliverable; (b) cross-references between Sections 3 and 7 (CA-exclusion) require single-author-voice for tone consistency; (c) anchor-stability risk between two plans (e.g., if Plan 1 lands `#enrollment-profile` and Plan 2 lands `#provisioning-method-choice`, Phase 38's dependency on both anchors becomes a two-plan-merge concern); (d) precedent: no prior phase in v1.4 used a multi-plan split for a single-doc deliverable.

### Plan structure recommendation

**36-01-PLAN.md** — Single-wave, single-author plan:
1. **Wave 0 tasks:**
   - Create `36-VALIDATION.md` with 8-dimension content-quality audit commands.
   - Verify cross-reference target anchors exist in Phase 34/35 source files (grep-check before authoring).
2. **Wave 1 tasks:**
   - Draft `docs/admin-setup-android/03-fully-managed-cobo.md` covering all 10 sections per D-11 length targets.
   - Apply D-07 hybrid Prerequisites pattern.
   - Apply D-01 hybrid routing + per-method callouts in Section 7.
   - Apply D-03 COPE Migration Note placement + D-04 audit guards.
   - Apply D-05 Android 15 FRP section with ⚠️ blockquote + D-06 KME/ZT one-liner.
   - Inline what-breaks callouts per D-11.
   - Frontmatter per D-13 with correct `last_verified` / `review_by` dates.
3. **Wave 2 tasks (audit):**
   - Run 36-VALIDATION.md 8-dimension audit.
   - Verify all D-10 stable anchors present.
   - Verify length target (2800-3800 words).
   - Verify no shared-file modifications (`git diff --name-only`).

This is a 1-plan / 3-wave shape, not a multi-plan shape.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phase 34 `02-provisioning-methods.md` exposes per-method anchors `#qr-code`, `#nfc`, `#afw-setup`, `#zero-touch` (column-header slugified) | Cross-Reference Targets + Section 7 | Cross-links resolve to different slug; plan-phase must grep the actual matrix file and substitute correct anchor names before authoring |
| A2 | The verbatim phrase "Google recommends WPCO" remains the project's preferred paraphrase of Google's technical direction (no Google source formally uses or contradicts it as of 2026-04-21) | Section 4 | Google could publish formal COPE-deprecation language or contradictory guidance; monitor Google AE Help for updates every 60 days per review cycle; Phase 36 D-17 allows MEDIUM-confidence labeling |
| A3 | Intune admin center EFRP configuration path remains under Device Restrictions profile for Fully Managed / Dedicated / Corporate-Owned Work Profile (as of MS Learn 2026-04-16) | Section 8 EFRP step-level config | Unified admin center UI could re-locate EFRP setting; Phase 36 D-16 executor re-verification catches this; MEDIUM-confidence marker flags the risk |
| A4 | Phase 38 (Dedicated) adoption of Phase 36's `#enrollment-profile` and `#provisioning-method-choice` anchors will not require renaming them (Phase 36 publishes; Phase 38 consumes) | Cross-Reference Targets — consumer table | Phase 38 plan could demand different anchor names during its planning; Phase 36 anchors are a stability contract — if Phase 38 needs different names, Phase 36 doc must be amended, but this is unlikely given the names are descriptive |
| A5 | The VALIDATION.md audit pattern is supported by the repo's existing audit conventions (precedent from other phases) | Validation Architecture | If no prior precedent exists, the plan may need to extend to include the VALIDATION.md creation itself as a deliverable; this was reflected in the Wave 0 task shape |

## Open Questions

1. **Should Section 7 per-method subsections use H3 or H4 headings?**
   - What we know: admin-template-android.md uses H4 for in-portal sub-sections ("#### In Intune admin center"). But Section 7 per-method callouts are not tri-portal; they are content sub-grouping.
   - What's unclear: whether H3 (`### QR code`, `### NFC`, etc.) or H4 works better for doc scannability.
   - Recommendation: Use H3 for per-method sub-sections to keep table-of-contents navigability (H4 is reserved for tri-portal H4 convention per template). Author's discretion per CONTEXT.md Claude's Discretion.

2. **Should the Android 15 FRP ⚠️ blockquote appear at the top of the FRP section (per D-05 recommendation) or at the top of the entire doc?**
   - What we know: D-05 recommends top-of-section; CONTEXT.md Claude's Discretion allows top-of-doc.
   - What's unclear: which placement better serves the "Admin-makes-irreversible-reset-decision-before-reading-this" scenario captured in ROADMAP Phase 36 goal.
   - Recommendation: Default to top-of-section per D-05. If the adversarial-review referee verdict on Phase 36 suggests top-of-doc warranted, the plan researcher may override (but this was already adjudicated per F-036/F-037 in CONTEXT.md decisions).

3. **Should the doc include a mermaid flowchart of the COBO setup flow?**
   - What we know: iOS Phase 27 `03-ade-enrollment-profile.md` does not use one; Phase 35 `00-overview.md` does; CONTEXT.md Claude's Discretion allows author's call.
   - What's unclear: whether mermaid helps or adds length noise.
   - Recommendation: Skip the mermaid. The 10-section structure with clear anchors is sufficient navigation. Adding a mermaid risks (a) duplicating the Phase 35 `00-overview.md` mermaid (which already maps all 5 modes), and (b) inflating word count past the 3800-word ceiling.

4. **Should Section 3 Prerequisites carry an explicit "Portal shorthand reminder" at the top of the doc or not?**
   - What we know: CONTEXT.md Claude's Discretion allows either.
   - What's unclear: whether admins on first-read benefit more from the shorthand or whether they'll bounce off redundant framing.
   - Recommendation: Skip the shorthand reminder. The Phase 34 / 35 convention is "Intune admin center" / "Managed Google Play (MGP)" / "Zero-Touch portal (ZT portal)" full-on-first-use, shorthand-thereafter. This is established; re-reminding is noise.

## Sources

### Primary (HIGH confidence)

- **Microsoft Learn — Set up enrollment for Android Enterprise fully managed devices** — [VERIFIED 2026-04-21]. URL: https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-fully-managed. ms.date 2025-05-08, updated_at 2026-04-16. Primary source for: enrollment profile creation steps, token types (default + staging), 65-year token expiry, naming template strings, Chrome-tab CA exclusion requirement.
- **Microsoft Learn — Enroll Android Enterprise dedicated, fully managed, or corporate-owned work profile devices in Intune** — [VERIFIED 2026-04-21]. URL: https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-dedicated-devices-fully-managed-enroll. ms.date 2025-12-04, updated_at 2026-04-16. Primary source for: four provisioning methods, NFC/token COPE restriction on Android 11, Android 15 FRP re-enrollment behavior, DPC extras JSON template, COPE factory-reset-protection table.
- **Microsoft Learn — Factory Reset Protection Emails Not Enforced in Intune for Android** — [VERIFIED 2026-04-21]. URL: https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced. Source for: FRP troubleshooting context.
- **Microsoft Learn — Device restriction settings for Android in Microsoft Intune** — [VERIFIED 2026-04-21]. URL: https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-android-for-work. Source for: EFRP configuration via Device Restrictions profile path (MEDIUM confidence on exact navigation path).
- **Google Android Enterprise Help — Enable enterprise factory reset protection** — [CITED]. URL: https://support.google.com/work/android/answer/14549362. Source for: EFRP feature description (Google-account allowlist for post-reset unlock).
- **Phase 34 version matrix** — [VERIFIED 2026-04-21 via repo read]. `docs/android-lifecycle/03-android-version-matrix.md` lines 67-78 — `#android-15-breakpoint` anchor present; Android 15 FRP narrative authoritative.
- **Phase 34 glossary** — [VERIFIED 2026-04-21 via repo read]. `docs/_glossary-android.md` — COPE (line 47), WPCO (line 75), Fully Managed (line 59), afw#setup (line 84) entries present with cross-references.
- **Phase 35 MGP doc** — [VERIFIED 2026-04-21 via repo read]. `docs/admin-setup-android/01-managed-google-play.md` — `#bind-mgp`, `#account-types`, `#disconnect-consequences` anchors present (lines 80, 29, 103).
- **Phase 35 ZT portal doc** — [VERIFIED 2026-04-21 via repo read]. `docs/admin-setup-android/02-zero-touch-portal.md` — `#step-0-reseller`, `#link-zt-to-intune`, `#dpc-extras-json`, `#kme-zt-mutual-exclusion` anchors present (lines 32, 56, 88, 119).

### Secondary (MEDIUM confidence)

- **Jason Bayton — Android 15: What's new for enterprise?** — [CITED]. URL: https://bayton.org/blog/2024/10/actually-new-for-enterprise-android-15/. Source for: Android 15 FRP hardening specifics (OEM unlock no longer deactivates FRP, setup-wizard bypass no longer deactivates FRP, accounts/passwords/apps blocked while FRP active).
- **Jason Bayton — Android 11 COPE changes** — [CITED]. URL: https://bayton.org/android/android-11-cope-changes/. Source for: Android 11 deprecation of work-profile-on-fully-managed in favor of work-profile-on-company-owned (supports WPCO direction).
- **Jason Bayton — Feature spotlight: Factory Reset Protection** — [CITED]. URL: https://bayton.org/android/feature-spotlight-factory-reset-protection/. Source for: FRP vs EFRP distinction background.
- **Jason Bayton — What is the difference between FRP and Enterprise FRP?** — [CITED]. URL: https://bayton.org/android/android-enterprise-faq/frp-vs-enterprise-frp/. Source for: EFRP admin-configured allowlist mechanism.
- **Google AE Help — Get started with Android Enterprise** — [CITED]. URL: https://support.google.com/work/android/answer/6174145. Source for: Current Google presentation of BYOD/COPE/COBO as supported deployment types (no deprecation of COPE).
- **Google AE Help — Work Profile and its features** — [CITED]. URL: https://support.google.com/work/android/answer/9563584. Source for: Company-owned vs personally-owned distinction (no use of "WPCO" acronym in consumer help).

### Tertiary (LOW confidence, needs execution-time re-verification)

- **MEDIUM flag 3 — Intune admin center EFRP navigation path:** Exact breadcrumb ("Devices → Configuration → Create profile → Android Enterprise → Fully managed, dedicated, and corporate-owned work profile — Device restrictions → General → Factory reset protection emails") is derived from MS Learn descriptions and community references. Unified admin center rollout may shift breadcrumbs. Phase 36 D-16 mandates execute-time re-verification.

## Metadata

**Confidence breakdown:**
- Research flag 1 (COPE wording): MEDIUM — project paraphrase of supported Google direction; no Google verbatim quote; Phase 34 glossary aligned.
- Research flag 2 (token expiry): HIGH — MS Learn verbatim.
- Research flag 3 (Android 15 FRP behavior): HIGH — MS Learn + Bayton + Phase 34 matrix agreement.
- Research flag 3 (Intune admin center EFRP path): MEDIUM — portal UI may shift; executor re-verification.
- Research flag 4 (Chrome-tab CA exclusion): HIGH — MS Learn verbatim (both `setup-fully-managed` and `ref-corporate-methods` pages agree).
- Standard stack (n/a — documentation phase): HIGH — Phase 34 / 35 conventions locked.
- Architecture (single file; 10 sections; 12 stable anchors): HIGH — locked in CONTEXT.md.
- Pitfalls (PITFALL 1/2/5/11): HIGH — inherited from PITFALLS.md + Phase 34/35 precedents.

**Research date:** 2026-04-21
**Valid until:** 2026-06-20 (60-day review cycle per D-13; matches the doc's own `review_by`)

## RESEARCH COMPLETE
