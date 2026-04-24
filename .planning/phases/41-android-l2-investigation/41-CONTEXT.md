# Phase 41: Android L2 Investigation - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Method:** Adversarial review (Finder/Adversary/Referee scored pattern) across 16 candidate options in 4 gray areas + sub-decisions. Per-area winners: 1D / 2B / 3B / 4A. Sub-decision winners: Preamble (a) / USB-debug INCLUDE / command set (b) / SafetyNet callout (c). Weighted score = 5×CRIT + 2×MED + 1×LOW (post-Referee). 106 flaws adjudicated; 18 FALSE POSITIVE (including all "glossary link = glossary modification" claims and all "SC#1 strict per-command-only" claims); 88 REAL ISSUES distributed across options. Full trail in 41-DISCUSSION-LOG.md.

<domain>
## Phase Boundary

Phase 41 delivers L2 Desktop Engineering investigation content for Android Enterprise through Microsoft Intune:

1. **`docs/l2-runbooks/18-android-log-collection.md`** — mode-first tiered log collection guide covering three methods (Company Portal logs, Microsoft Intune app logs, adb logcat) with explicit method-to-data-type mapping (AEL2-01, SC #1). Preamble explicitly states "no Intune admin center Download Diagnostics per-device bundle for Android" (iOS Phase 31 D-02 analog).
2. **`docs/l2-runbooks/19-android-enrollment-investigation.md`** — multi-mode enrollment failure investigation runbook covering 5 failure patterns (Pattern A work-profile-not-created BYOD / Pattern B COBO-enrollment-stuck / Pattern C ZTE-device-claim-failure / Pattern D Dedicated-QR-scan-failure / Pattern E tenant-config-universal) with config/timing/defect distinction and three-part escalation packet (token sync status, profile assignment state, enrollment profile GUID) per SC #2 (AEL2-02).
3. **`docs/l2-runbooks/20-android-app-install-investigation.md`** — Managed Google Play app install failure diagnosis covering app states (license assignment / approval status / user-MGP-account binding), LOB app distribution, and MAM intersection using Phase 31 D-11/D-12 three-class ⚙️/⏱️/🐛 disambiguation (AEL2-03).
4. **`docs/l2-runbooks/21-android-compliance-investigation.md`** — Compliance & CA timing investigation using Phase 31 D-14 hybrid axis structure (⚙️ Config / ⏱️ Timing / 🐛 Defect top-level + Per-Cause Deep-Dive A/B/C/D mapping 1:1 to L1 runbook 25's 4 causes: Play Integrity / OS Version / CA Timing / Passcode-Encryption). ZERO literal "SafetyNet" token in runbook body; glossary cross-link only per Phase 40 D-17 rephrased precedent (AEL2-04, SC #4).
5. **`docs/l2-runbooks/00-index.md` Android L2 section append** — new `## Android L2 Runbooks` H2 injected after the iOS L2 section (line 131 area); L1 Escalation Mapping table for runbooks 22-27 → runbooks 18-21; MAM-WE advisory note mirroring Phase 31 D-20/D-21 pattern. Zero modifications to existing Windows APv1/APv2, macOS ADE, or iOS L2 sections (AEL2-05, SC #5 append-only).
6. **`docs/_templates/l2-template.md` platform enum extension** — current `platform: Windows | macOS | iOS | all` → `platform: Windows | macOS | iOS | Android | all` (Phase 31 D-27 mirror).
7. **Resolution of 10 "Phase 41" placeholder text instances** across 6 Phase 40 L1 runbooks (lines 73/96/80/240/92/210 of runbooks 22-27) + `docs/android-lifecycle/03-android-version-matrix.md` line 89 + 3 admin-setup-android files (03 line 22, 04 line 19, 05 line 20) per Phase 40 D-25 forward-promise retrofit contract.

Phase 41 establishes the **mode-first tiered log-collection pattern** for Android L2 — a deviation from Phase 31 iOS D-01's friction-ordered single-tier flow because Android has heterogeneous primary collection tool per enrollment mode (post-AMAPI April 2025: Microsoft Intune app is the BYOD management app; COBO/Dedicated/ZTE device-owner-mode may have no Company Portal installed at all). Phase 41 also extends the **SC #4 three-axis compliance investigation structure** from iOS to Android's 4-cause compliance topology (3×4 matrix) with Phase 40 D-17 strict-token SafetyNet avoidance (glossary cross-link only, zero literal "SafetyNet" in runbook body).

Phase 41 does NOT own:

- **Android capability matrix** — Phase 42 AEAUDIT-01 scope
- **`docs/index.md` Android stub** — Phase 42 AEAUDIT-02 scope
- **`_glossary-macos.md` see-also cross-reference** — Phase 42 AEAUDIT-03 scope
- **Milestone mechanical audit** (SafetyNet grep, supervision grep, AOSP scope-guard verification) — Phase 42 AEAUDIT-04 scope
- **Cross-platform nav integration** (backport Android into `docs/common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, full `index.md`) — post-v1.4 unification task per PROJECT.md Key Decisions
- **MAM-WE L2 runbooks** (selective wipe failures, PIN loop, app protection not applying, MAM-WE-specific compliance) — deferred to v1.4.1+ ADDTS-01 equivalent. Phase 41 surfaces the deferral via `00-index.md` Android MAM-WE advisory note (Phase 31 D-21 pattern) but does NOT create a stub runbook.
- **AOSP L2 investigation content** — explicit v1.4.1 deferral per Phase 39 AEAOSP-01 scope guard and PROJECT.md Key Decisions. Triage tree Phase 40 D-03 ANDE1 terminal already routes AOSP tickets to "L2 out of scope v1.4"; Phase 41 runbook 19 Pattern-A..E does NOT include an AOSP pattern.
- **Knox Mobile Enrollment L2 content** — AEKNOX future requirement; v1.4.1 scope.
- **Graph API write operations / DPC extras JSON mutation** — read-only investigation only; Phase 31 D-09 ADE analog applies (Graph scope discipline preamble placement if any Graph reference appears in runbook 19 ZTE cross-link chain).
- **Remediation commands** (state-mutating adb commands: `am broadcast`, `pm grant-permissions`, etc.) — diagnostic/remediation boundary per Phase 24 macOS D-10 + Phase 31 D-11 precedent; Phase 41 adb command set is strictly diagnostic (logcat, dumpsys, pm list).

Carrying forward from earlier phases (LOCKED — do NOT re-open):

- **Phase 31 D-01** — tiered log-collection flow structural pattern. Phase 41 ADAPTS (not violates) this with mode-first per-mode tier selection because Android tool landscape is mode-heterogeneous where iOS was uniform.
- **Phase 31 D-02** — tool-landscape preamble pattern. Phase 41 mirrors with "no Intune admin center Download Diagnostics per-device bundle for Android" framing.
- **Phase 31 D-03** — method-to-data-type decision matrix as first structural element after tool-landscape preamble. Columns: `Method | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Typical Latency`.
- **Phase 31 D-07** — hybrid investigation runbook structure (Investigation — Data Collection + Analysis — Match Against Known Patterns + Resolution). Phase 41 runbook 19 adapts with per-mode Pattern A-E.
- **Phase 31 D-11/D-12** — app install runbook single-runbook pattern + three-class ⚙️/⏱️/🐛 disambiguation. Phase 41 runbook 20 follows verbatim.
- **Phase 31 D-14** — compliance hybrid axis structure (config/timing/defect top + Per-Cause deep-dive). Phase 41 runbook 21 exact mirror with 4-cause A/B/C/D deep-dive matching L1 runbook 25's causes.
- **Phase 31 D-20/D-21** — MAM advisory placement on `00-index.md` only (Android MAM-WE analog; no per-runbook cross-refs to MAM advisory).
- **Phase 31 D-22** — L1→L2 placeholder retrofit with per-source explicit mapping (primary + see-also). Phase 41 enumerates 10 placeholder resolutions.
- **Phase 31 D-24** — commit grouping by source directory (not rolled into individual runbook commits).
- **Phase 31 D-25** — `last_verified` bump + 1-line Version History entry on every retrofitted file.
- **Phase 31 D-27** — L2 template `platform:` enum one-line extension.
- **Phase 31 D-28** — L2 frontmatter schema (`audience: L2`, `platform: Android`, `applies_to: <single-string>`, `last_verified: YYYY-MM-DD`, `review_by: last_verified + 90d`).
- **Phase 31 D-29** — platform-gate banner at top of every L2 runbook. Phase 41 extends with all 4 platform refs (Windows, macOS, iOS, Android).
- **Phase 34 D-04** — Android mode labels: "Fully managed (COBO)" / "Work profile (BYOD)" / "Dedicated (COSU)" / "ZTE" / "AOSP". **NEVER "supervision" as an Android management term** (AEAUDIT-04 hard rule).
- **Phase 34 D-10** — Cross-platform callouts `> **Cross-platform note:** ...`; tri-portal shorthand.
- **Phase 34 D-14** — 60-day review cycle on retrofitted files (Phase 40 precedent carries). **90-day** on new L2 runbooks per Phase 31 D-28 L2 cadence.
- **Phase 34 D-26** — Anti-Pattern 1: canonical matrices live in `02-provisioning-methods.md` and `03-android-version-matrix.md`; runbooks reference, never duplicate.
- **Phase 36 D-13 / Phase 37 D-15 / Phase 38 D-18 / Phase 39 D-16** — `applies_to:` frontmatter is **single-string** (never array); schema stable.
- **Phase 37 D-10/D-11** — Source-confidence marker regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` for MEDIUM/LOW assertions. Phase 41 adb commands use per-assertion markers with section-level default.
- **Phase 39 D-17 anchor stability** — Runbook 19 Pattern C cross-links LOCKED Phase 39 anchors in `02-zero-touch-portal.md`: `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#kme-zt-device-claim`, `#configuration-must-be-assigned`.
- **Phase 37 BYOD anchor stability** — Runbook 19 Pattern A cross-links verified-existing anchors in `04-byod-work-profile.md`: `#enrollment-restrictions` (line 84), `#work-profile-policy` (line 103), `#privacy-boundary` (line 148).
- **Phase 40 D-17 (rephrased)** — SafetyNet token avoidance in runbook body. Current shipped L1 runbook 25 Cause A body contains "the legacy API was deprecated by Google in January 2025; Play Integrity is the current replacement" — zero literal "SafetyNet". Phase 41 runbook 21 follows this precedent exactly.
- **Phase 40 D-20** — Phase 42 AEAUDIT-04 SafetyNet grep scope: zero case-insensitive `safetynet` in runbook body (glossary file entry is authorized). Phase 41 runbook 21 + 18 + 19 + 20 all zero literal token.
- **Phase 40 D-25** — "Android L2 runbooks (Phase 41)" forward-promise placeholder convention established by Phase 40 for this phase to resolve atomically.
- **AEAUDIT-04 hard rules** — `last_verified` frontmatter mandatory; zero "SafetyNet" references in runbook body (Play Integrity only); zero "supervision" as Android term; no Android links in deferred shared files (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`).
- **PITFALL 9 / PITFALL 11 shared-file guard** — zero modifications to v1.0-v1.3 shared files outside the explicitly-listed append-only and retrofit targets. Specifically: do NOT modify `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-android.md`, `docs/_glossary-macos.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/end-user-guides/`, or any `docs/l1-runbooks/` file BEYOND the 6 lines in runbooks 22-27 that resolve Phase 40 D-25 forward promises.

Research flags to verify at plan/execute time (from STATE.md + adversarial review):

- **Current Intune admin center Android device logs navigation** — portal UI for retrieving Company Portal logs (per-device Download Diagnostics for Android is unavailable per Preamble D-02); verify path at finalize time. MEDIUM-confidence marker on any portal-step specifics not re-sourced at execute time.
- **Microsoft Intune app log retrieval UI** — post-AMAPI April 2025 management app log retrieval; verify "Send logs" / "Help" menu structure and Microsoft backend retrieval path (ticket-based vs self-service) at research time.
- **adb command availability on managed devices** — per STATE.md Phase 41 flag, adb commands are LOW-confidence baseline; require MEDIUM labels with explicit last_verified markers per D-13/D-14. Verify `dumpsys device_policy` output format has not shifted across Android 12/13/14/15 before committing command examples.
- **Phase 39 D-17 ZTE anchor stability** — verify `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#kme-zt-device-claim`, `#configuration-must-be-assigned` anchors still resolve in `02-zero-touch-portal.md` at execute time.
- **Phase 37 BYOD anchor stability** — verify `#enrollment-restrictions` (line 84), `#work-profile-policy` (line 103), `#privacy-boundary` (line 148) anchors still resolve in `04-byod-work-profile.md` at execute time.
- **Play Integrity verdict naming in Intune UI** — verify current label text for "Basic integrity / Basic + Device integrity / Strong integrity (hardware-backed)" tiers matches Phase 34 `_glossary-android.md` canonical at execute time.
- **Managed Google Play app status labels in Intune** — runbook 20 references "license assigned / not licensed / pending approval / approval required" states; verify current portal language.
- **Company Portal log upload flow on Android** — verify "Settings > Help > Email support / Send logs" pattern and backend retrieval path at research time. Distinct from iOS flow.
- **Android compliance policy state strings** — verify current Intune naming for "Not compliant" / "Not evaluated" / "In grace period" default posture behavior; runbook 21 Cause B/C language depends on these strings matching current UI.

</domain>

<decisions>
## Implementation Decisions

### Log Collection Runbook 18 (AEL2-01 / SC #1) — GA1 winner: 1D + Preamble (a) + USB-debug INCLUDE

- **D-01:** **Mode-first tiering, not linear friction-ordered tiering.** Single `## Method Selection by Enrollment Mode` H2 block presents per-mode primary tool selection. The method-to-data-type decision matrix (D-03) carries a `Primary Tool (by mode)` column rather than a single "Tier" column. BYOD: Company Portal logs primary (pre-April-2025 legacy tenants) OR Microsoft Intune app primary (post-April-2025 AMAPI tenants; Phase 40 D-11 precedent) — include both with an AMAPI-era disambiguation note. COBO / Dedicated / ZTE: Microsoft Intune app primary (Company Portal may not be installed on device-owner-mode devices at all). All modes: adb logcat last-resort (Tier 3 analog; requires USB debugging enabled).

  *Winner of GA1 adversarial review (1D: 0 CRIT / 3 MED / 1 LOW = weighted 7) tied with 1A (0/3/1 = 7) but winning tiebreak on Phase 31 D-01 precedent-adaptation correctness — 1A applies iOS friction-order to heterogeneous Android tool landscape and misrepresents which tool is "Tier 1" for device-owner-mode devices; 1D directly models the mode-heterogeneous reality. Lost to neither 1B (1 CRIT / 2 MED / 1 LOW = 10; parallel-flow per-mode explodes maintenance) nor 1C (1 CRIT / 2 MED / 1 LOW = 10; abandons Phase 31 D-01 tiered-flow precedent entirely).*

- **D-02:** **Tool-landscape preamble — iOS Phase 31 D-02 analog.** Insert immediately after the `## Context` H2:
  ```
  > **Tool landscape:** There is **no single Intune admin center per-device Download Diagnostics bundle for Android** (contrast with Phase 31 iOS MDM diagnostic report and Phase 24 macOS IntuneMacODC). Android diagnostic data is fragmented across three methods — Company Portal logs, Microsoft Intune app logs, and adb logcat — each yielding different data scope on different trust boundaries. The decision matrix below selects the method by enrollment mode first, data-scope need second.
  ```
  - **Rationale:** SC #1 "three methods" literal satisfaction. Preamble placement (not buried mid-doc) ensures L2 arriving from Windows/iOS/macOS experience immediately understands Android tool-landscape asymmetry.

- **D-03:** **Method-to-data-type decision matrix as first structural element after the D-02 preamble.** Columns: `Method | Primary Tool (by mode) | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Confidence | Typical Latency`. "Primary Tool (by mode)" column has explicit BYOD-pre-AMAPI / BYOD-post-AMAPI / COBO / Dedicated / ZTE sub-rows. "Typical Latency" column captures the user-upload + Microsoft Support ticket roundtrip cost for Company Portal (days vs minutes for Intune app self-service retrieval).

- **D-04:** **USB-debugging disabled-by-policy note INCLUDED.** Section 3 (adb logcat) opens with an explicit callout:
  ```
  > **Device-owner-mode constraint:** On fully-managed (COBO), dedicated (COSU), and ZTE-enrolled devices, Android Enterprise device owner policy may disable USB debugging per [Phase 38 AEDED Android Enterprise device restrictions](../admin-setup-android/05-dedicated-devices.md) and equivalent Phase 36 COBO policy. If USB debugging is unavailable, adb logcat tier is unreachable — escalate to Microsoft Support for remote log retrieval via Company Portal or Microsoft Intune app upload path. [MEDIUM, last_verified YYYY-MM-DD]
  ```
  - **Rationale:** Omitting this note creates a hidden failure mode where L2 burns time attempting Tier 3 on device-owner-restricted hardware (1.U.Omit.1 CRIT flaw in Finder report; confirmed REAL ISSUE).

- **D-05:** **Section order** for `18-android-log-collection.md`: Context (with L1 handoff block) → Tool Landscape preamble (D-02) → Decision Matrix (D-03) → `## Method Selection by Enrollment Mode` (D-01 mode-first block) → Section 1: Company Portal Logs → Section 2: Microsoft Intune App Logs (with AMAPI April 2025 BYOD-primary note) → Section 3: adb logcat (with D-04 USB-debug callout; D-13 per-assertion confidence markers throughout) → Common Artifacts Cross-Reference footer. Mirrors Phase 31 D-04 section order with Android-specific D-01 mode-selection insertion.

- **D-06:** **No dedicated "Sysdiagnose" or "Mac+cable" analog section** — Android has no equivalent. Section 3 (adb logcat) replaces iOS's Section 3 (sysdiagnose) as the USB-privileged tier, but the tier presentation is mode-first (D-01), not strictly Tier 3.

### Enrollment Investigation Runbook 19 (AEL2-02 / SC #2) — GA2 winner: 2B

- **D-07:** **Multi-mode enrollment investigation — 5 failure patterns.** Single runbook at `docs/l2-runbooks/19-android-enrollment-investigation.md` covering:
  - **Pattern A: Work Profile Not Created (BYOD)** — device enrollment succeeded but work profile container creation failed; maps to L1 runbook 23. Cross-links Phase 37 BYOD anchors `#enrollment-restrictions` (line 84), `#work-profile-policy` (line 103), `#privacy-boundary` (line 148) in `04-byod-work-profile.md`.
  - **Pattern B: COBO Enrollment Stuck** — afw#setup / QR / NFC / DPC provisioning started but never completed; maps to L1 runbook 24 COBO-path. Cross-link `03-fully-managed-cobo.md` enrollment profile anchor.
  - **Pattern C: ZTE Device Claim Failure** — device never arrives in customer ZT portal device pool OR claimed but configuration not assigned; maps to L1 runbook 27. Cross-links Phase 39 D-17 LOCKED anchors in `02-zero-touch-portal.md`: `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#configuration-must-be-assigned`, `#kme-zt-device-claim`.
  - **Pattern D: Dedicated QR Scan Failure** — Dedicated kiosk provisioning QR rejected / token expired / COSU enrollment profile missing; maps to L1 runbook 24 Dedicated-path. Cross-link `05-dedicated-devices.md` enrollment profile anchor.
  - **Pattern E: Tenant-Config-Universal** — enrollment restriction blade blocks device platform/ownership; maps to L1 runbook 22 regardless of mode. Cross-link `04-byod-work-profile.md#enrollment-restrictions` (canonical location for restriction blade doc) and `00-overview.md#intune-enrollment-restrictions` equivalent.

  *Winner of GA2 adversarial review (2B: 0 CRIT / 2 MED / 3 LOW = weighted 7) tied with 2D (0/2/3 = 7) but winning tiebreak on sub-option safety — 2D's depth variant 2Dc risks 600+ line runbook (2.Dc.1 CRIT = 5), while 2B has zero CRIT sub-option risk. 2B also matches Phase 40 D-18 runbook 27 ZTE anchor-reuse pattern (established precedent). Lost to neither 2A (1 CRIT / 2 MED / 1 LOW = 10; BYOD-only cannot resolve L1 runbook 24/25/27 placeholders for non-BYOD causes) nor 2C (1 CRIT / 2 MED / 1 LOW = 10; hybrid-depth mix breaks Phase 31 D-07 uniformity).*

- **D-08:** **Runbook 19 structure — Phase 31 D-07 B5 hybrid mirror adapted for Android mode patterns.** Three-layer H2 organization:
  ```
  ## Investigation — Data Collection (mode-agnostic)
    ### Step 1: Device registration state (Intune admin center > Devices > All devices)
    ### Step 2: Enrollment restriction blade state (platform/ownership gate)
    ### Step 3: Token / profile sync state (mode-specific: ZTE token, COBO enrollment profile, BYOD work profile policy assignment)
    ### Step 4: Device-side enrollment state (collect per runbook 18 based on mode)
  ## Analysis — Match Against Known Patterns
    ### Pattern A: Work Profile Not Created (BYOD)
    ### Pattern B: COBO Enrollment Stuck
    ### Pattern C: ZTE Device Claim Failure
    ### Pattern D: Dedicated QR Scan Failure
    ### Pattern E: Tenant-Config-Universal (Enrollment Restriction)
  ## Resolution
    ### (per-pattern resolution + Microsoft Support escalation criteria)
  ```
  - **Rationale:** SC #2 literal requires indicators-to-check AND escalation packet (token sync status, profile assignment state, enrollment profile GUID). Data Collection Step 1-4 covers indicators; Pattern A-E covers known failure patterns with resolution steps per-pattern; Resolution section aggregates escalation. Each Pattern section carries config/timing/defect visual markers (⚙️ / ⏱️ / 🐛) per Phase 31 D-12 mirror applied at pattern level.

- **D-09:** **Escalation packet fields (SC #2 literal).** Every Pattern A-E Resolution sub-section ends with a structured "Microsoft Support escalation packet" block containing:
  1. **Token sync status** — ABM-analog for ZTE (ZT↔Intune linking state; Method A/B per Phase 35 D-21); enrollment profile token state for COBO (Phase 36 D-07 token lifecycle); BYOD work profile provisioning token for Pattern A
  2. **Profile assignment state** — Intune admin center > Devices > Enrollment > Android Enterprise > [profile] assignment diagnostic
  3. **Enrollment profile GUID** — extracted from Intune admin center URL (portal-first) plus Graph API `GET /deviceManagement/androidManagedStoreAccountEnterpriseSettings` or equivalent read-only endpoint (Phase 31 D-08/D-09 READ-ONLY analog for Android)

- **D-10:** **Graph API READ-ONLY scope preamble** in runbook 19 Context section (Phase 31 D-09 analog):
  ```
  > **Graph API scope:** Where this runbook references the Microsoft Graph API, usage is strictly READ-ONLY (GET requests). No modifications. No token regeneration. No DPC extras JSON mutation. For deep Android Enterprise Graph operations, see ADDTS-ANDROID-02 (future milestone — Android Graph API deep-dive).
  ```
  Preamble placement only (no inline repetition at individual Graph GET steps), mirroring Phase 31 D-09 restraint.

- **D-11:** **L1→L2 handoff block at top of runbook 19 Context.** Exact wording per Phase 31 D-17 analog:
  ```
  **From L1 escalation?** L1 runbook 22 (enrollment blocked) / 23 (work profile not created) / 24 (device not enrolled) / 27 (ZTE enrollment failed) has escalated. L1 collected: serial number, user UPN, mode (Fully managed / Work profile / Dedicated / ZTE), and device-side symptoms. Skip to the Pattern section matching L1's observation:
  - L1 22 → Pattern E (Enrollment Restriction)
  - L1 23 → Pattern A (Work Profile Not Created)
  - L1 24 → start at Data Collection Step 1-4 to narrow mode; then Pattern B / D as identified
  - L1 27 → Pattern C (ZTE Device Claim Failure)
  
  Starting fresh (no L1 escalation)? Begin at Data Collection Step 1.
  ```

- **D-12:** **Pattern-level config/timing/defect marker (⚙️/⏱️/🐛) applied per-pattern, not per-step.** Each Pattern A-E sub-section carries a visual marker row at its top:
  ```
  ### Pattern A: Work Profile Not Created (BYOD)
  **Typical class:** ⚙️ Config Error (enrollment restriction / work profile policy misalignment) — occasionally 🐛 Defect (AMAPI transition bug)
  ```
  Applied at pattern-level (aggregate) rather than per step because a single pattern often spans multiple class types (Phase 31 D-12 per-failure-mode precedent adapted).

### App Install Investigation Runbook 20 (AEL2-03) — Phase 31 D-11/D-12 mirror (not in gray-area scope)

- **D-13:** **Single runbook at `docs/l2-runbooks/20-android-app-install-investigation.md` mirroring Phase 31 D-11 macOS 12 template exactly.** Target length 190-220 lines (Phase 31 iOS 16 = 194 lines; macOS 12 = 194 lines). Covers:
  - Managed Google Play app states (license assigned / not licensed / pending approval / approval required / device install status)
  - License assignment verification (user-based VPP equivalent for Android: Google Play managed user token binding)
  - LOB (APK) app distribution failures
  - MAM intersection (Android app protection policy interaction with Managed Play app targeting)
  - Silent-install boundary for Fully managed (COBO) / Dedicated (COSU) — per Phase 36/38 device owner policy

- **D-14:** **Three-class disambiguation (Phase 31 D-12 mirror).** Each failure pattern categorized with visual marker: `⚙️ Config error` / `⏱️ Timing issue` / `🐛 Genuine defect`. Config errors: fix in Intune / Managed Google Play. Timing issues: 90-day policy propagation cycle, MGP user-account binding delay, first-sync cadence. Genuine defects: escalate Microsoft Support with data-collection checklist.

- **D-15:** **MAM-WE exclusion cross-link.** Runbook 20 does NOT cover MAM-WE app protection policy failures — one-line cross-reference: `> MAM-WE app protection policy failures: see [MAM-WE Advisory](00-index.md#android-mam-we-investigation-advisory)` (Phase 31 D-13 exact mirror).

### Compliance Investigation Runbook 21 (AEL2-04 / SC #4) — GA4 winner: 4A + SafetyNet (c)

- **D-16:** **Phase 31 D-14 hybrid axis structure — exact mirror with 4-cause deep-dive matching L1 runbook 25.** Section structure:
  ```
  ## Investigation by Axis
    ### Configuration Errors (⚙️)
      #### Maps to Cause B (OS Version Policy Mismatch), Cause D (Passcode / Encryption / Work Profile Security)
    ### Timing Issues (⏱️)
      #### Maps to Cause C (CA Timing Gap — first compliance evaluation pending)
    ### Genuine Defects (🐛)
      #### Cross-cuts Cause A (Play Integrity verdict anomalies), Cause C (stuck Not evaluated / APNs-equivalent network gap)
  ## Per-Cause Deep-Dive
    ### Cause A: Play Integrity Verdict Failure (attestation axis: ⚙️ policy + 🐛 verdict anomaly)
    ### Cause B: OS Version Policy Mismatch (⚙️ config axis)
    ### Cause C: CA Timing Gap / First Compliance Evaluation Pending (⏱️ timing axis + 🐛 stuck-state defect)
    ### Cause D: Passcode / Encryption / Work Profile Security Policy Mismatch (⚙️ config axis)
  ## Resolution
    ### (per-cause resolution + Microsoft Support escalation criteria)
  ```
  The 3×4 axis-top × cause-deep-dive matrix is Phase 31 D-14 locked precedent working as intended — hybrid structure catches multi-axis causes (e.g., Cause A spans both ⚙️ policy-tier mismatch and 🐛 verdict anomaly) that single-axis structures cannot express.

  *Winner of GA4 adversarial review (4A: 0 CRIT / 0 MED / 4 LOW = weighted 4) decisively over 4B (2 CRIT / 1 MED / 1 LOW = 13; inline "SafetyNet" token in Cause A body fails AEAUDIT-04 strict-token grep per Phase 40 D-17 rephrased precedent), 4C (1 CRIT / 2 MED / 1 LOW = 10; Part 1/2 split abandons L1 runbook 25 4-cause structure), and 4D (2 CRIT / 1 MED / 1 LOW = 13; drops Phase 31 D-14 LOCKED hybrid axis — locked deviation without justification = CRIT).*

- **D-17:** **L1 runbook 25 handoff block at top of runbook 21 Context.** Exact wording per Phase 31 D-17 analog:
  ```
  **From L1 escalation?** L1 runbook 25 classified the failure as Cause A (Play Integrity) / B (OS Version) / C (CA Timing) / D (Passcode / Encryption / Work Profile Security). Skip to the matching **Per-Cause Deep-Dive** section below. The **Investigation by Axis** section is the starting point for fresh investigations where L1 did not narrow the cause.
  ```
  Cause-letter-to-section anchors (`#cause-a-play-integrity-verdict-failure`, `#cause-b-os-version-policy-mismatch`, `#cause-c-ca-timing-gap`, `#cause-d-passcode-encryption-policy-mismatch`) are Phase 40 L1 runbook 25 anchor-reuse — identical names to L1 Cause A/B/C/D section anchors per Phase 40 D-16 mirror.

- **D-18:** **SafetyNet callout variant (c) — glossary cross-link only; ZERO literal "SafetyNet" token in runbook 21 body.** Phase 40 D-17 rephrased precedent: current shipped L1 runbook 25 Cause A body reads `"Android uses for compliance attestation (the legacy API was deprecated by Google in January 2025; Play Integrity is the current replacement)"` with ZERO literal "SafetyNet" token. Phase 41 runbook 21 Cause A body follows this exact pattern:
  ```
  > See [Play Integrity](../_glossary-android.md#play-integrity) for the attestation mechanism Android compliance uses. The legacy attestation API was deprecated by Google in January 2025; Play Integrity is the current replacement. All Phase 34 and later Android documentation uses Play Integrity terminology exclusively.
  ```
  The glossary file `docs/_glossary-android.md` (Phase 34 owned; NOT modified by Phase 41) contains the deprecated-term entry. Linking TO the glossary from Phase 41 runbook body does NOT modify the glossary file — this is precedent-established by Phase 40 L1 runbook 25 Cause A which already cross-links `_glossary-android.md#play-integrity`.

  *Winner of SafetyNet sub-decision (4Sc: 0 CRIT / 0 MED / 0 LOW = weighted 0) after Referee ruled `4.Sc.1` (glossary-link-is-mod) and `4.Sc.2` (case-insensitive link-text grep) both FALSE POSITIVE. Beats 4Se (0/0/2 = 2; functionally equivalent but weaker inline deprecation signal), 4Sa (0/2/0 = 4; preamble literal "SafetyNet" token fails strict grep), 4Sb (1/1/0 = 7; Cause-A-only inline token fails AEAUDIT-04), 4Sd (1/1/0 = 7; all-three multiplies occurrences).*

- **D-19:** **Play Integrity canonical 3-tier ladder.** Runbook 21 Cause A uses Phase 34 `_glossary-android.md` canonical terminology: **"Play Integrity verdict"** with 3 tiers `"Basic integrity / Basic + Device integrity / Strong integrity (hardware-backed)"`. Failing-verdict phrasing: "Play Integrity verdict below policy minimum". Never "SafetyNet" as a live compliance mechanism — deprecation context only via D-18 glossary cross-link pattern.

- **D-20:** **Cause C (CA Timing Gap) and Cause A (Play Integrity) get Pareto-expanded content** (Phase 31 D-15 mirror): ~50% of runbook 21 body. Cause B (OS Version) and Cause D (Passcode/Encryption) receive compact sub-sections (~15 lines each) with explicit deep-links to `docs/admin-setup-android/` compliance-policy anchors when they become available (Phase 38 D-XX / Phase 36 D-XX compliance callout anchors — verify at execute time).

- **D-21:** **"Not evaluated" terminal state gets explicit sub-section** (Phase 31 D-16 mirror): covers Android equivalent of iOS APNs-blocked-at-network-edge (Play services network gap, first-evaluation sync failure), Microsoft Support escalation criteria, and date-range of stuck-state persistence as escalation-packet data.

### adb Confidence Marking + Command Set (SC #1) — GA3 winner: 3B + command set (b)

- **D-22:** **Per-assertion confidence markers with section-level default for routine commands.** Runbook 18 Section 3 (adb logcat) opens with a section-level default block:
  ```
  > **Source confidence:** Commands in this section are sourced from Android Developer documentation and community troubleshooting guides; Microsoft Learn does not comprehensively document adb for Intune-managed Android. Section-level default confidence is **MEDIUM** unless overridden per-command. Verify command availability against current Android Developer docs at `review_by` cadence.
  ```
  Individual commands carry per-command overrides per Phase 37 D-10/D-11 regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified YYYY-MM-DD)?\]`:
  - `adb logcat` (universal, Android Developer primary) — `[HIGH, last_verified YYYY-MM-DD]`
  - `adb shell dumpsys device_policy` (Android Enterprise DPC state; output format shifts across OS versions) — `[MEDIUM, last_verified YYYY-MM-DD]`
  - `adb shell pm list packages` (universal) — `[HIGH, last_verified YYYY-MM-DD]`

  *Winner of GA3 adversarial review (3B: 0 CRIT / 2 MED / 2 LOW = weighted 6) decisively over 3A (0/3/1 = 7; section-only raises audit-mechanization risk per Ruling #3), 3C (0/3/1 = 7; mixed scheme hard to grep-audit), and 3D (2/1/1 = 13; zero labels = direct SC#1 violation).*

- **D-23:** **Phase 37 D-10/D-11 regex format preserved exactly.** No new marker format invented. Mechanical grep verification (Phase 42 AEAUDIT-04 audit-mechanization) operates on the existing regex.

- **D-24:** **Command set — "core troubleshooting triad" (variant b).** Exactly three adb command families permitted in runbook 18 Section 3 + runbook 19/20/21 adb references:
  1. `adb logcat` with enrollment-relevant filter tags (e.g., `WorkProfile`, `DevicePolicyManager`, `IntuneManagedAgent`) — HIGH baseline, per-tag filter examples labeled MEDIUM
  2. `adb shell dumpsys device_policy` — MEDIUM (output format drift across Android 12+)
  3. `adb shell pm list packages` with `-f` filter (full package path) and `pm list packages | grep <mgp-package>` for Managed Google Play app presence verification — HIGH

  EXCLUDED from Phase 41 scope:
  - `adb bugreport` — HEAVY (tens of MB), PII-laden, requires data-handling guidance outside L2 log-collection scope (Finder 3.Vc.1 REAL ISSUE confirmed). Deferred to v1.4.1 if Microsoft Support coordination patterns mature.
  - `adb shell am broadcast` — state-mutating (sends intents); violates diagnostic-only boundary (Phase 24 macOS D-10 / Phase 31 diagnostic-vs-remediation separation).
  - `adb shell pm grant-permissions` — state-mutating, bypasses device owner policy, potentially non-reversible; same boundary violation (Finder 3.Vd.1 CRIT confirmed).
  - `adb shell getprop ro.build.*` — wildcard glob portability issue across cmd.exe/bash shells (Finder 3.Vc.2 LOW); deferred unless specific OS-version checking becomes essential.

  *Winner of command-set sub-decision (3Vb: 0 CRIT / 0 MED / 2 LOW = weighted 2) decisively over 3Va (0/1/1 = 3; logcat-only too narrow for SC #2 escalation-packet fields), 3Vc (0/1/1 = 3; bugreport PII risk), 3Vd (1/1/1 = 8; state-mutating commands violate diagnostic boundary).*

- **D-25:** **adb section scoping discipline.** The per-command confidence markers are PRESERVATION markers (document the present source-confidence state), not GUARANTEES of command correctness. Runbook 18 Section 3 explicitly states: "L2 engineers should validate adb command output against current Android Developer documentation for the target device's Android version before relying on any output for Microsoft Support escalation packets." This caveat is placed ONCE at Section 3 opening, not repeated per-command.

### 00-index.md Android L2 Section + L2 Template Extension (AEL2-05 / SC #5)

- **D-26:** **Android L2 section injection location and structure.** New `## Android L2 Runbooks` H2 section injected in `docs/l2-runbooks/00-index.md` immediately after the existing iOS L2 section (after line 131 `### MAM-WE Investigation Advisory` block; verify exact line at execute time). Mirrors the exact iOS section structure (Phase 31 D-20 template adapted):
  ```
  ## Android L2 Runbooks

  > **Version gate:** The runbooks below cover Android Enterprise via Microsoft Intune.
  > For iOS/iPadOS runbooks, see above. For macOS ADE runbooks, see above. For Windows Autopilot runbooks, see the tables above.

  The [Android Log Collection Guide](18-android-log-collection.md) is a **prerequisite for all Android L2 investigation runbooks** — select a method via the mode-first decision matrix in that guide (Company Portal logs / Microsoft Intune app logs / adb logcat) before beginning any investigation.

  ### When to Use
  | Runbook | When to Use | Prerequisite |
  | ... (4 rows: 18 / 19 / 20 / 21) ... |

  ### Android L1 Escalation Mapping
  | L1 Runbook Source | L2 Runbook |
  | ... (6 rows: L1 22/23/24/25/26/27 → L2 18/19/20/21) ... |

  ### Android MAM-WE Investigation Advisory
  > **MAM-WE investigation is out of Phase 41 scope** — deferred to **ADDTS-ANDROID-01** future milestone. Selective wipe failures, PIN loop, app protection not applying, and MAM-specific compliance failures currently have no Android L2 runbook. Escalate MAM-specific issues directly to Microsoft Support with Company Portal log upload + app protection policy JSON export.
  ```
  MAM advisory placement: `00-index.md` ONLY per Phase 31 D-21 single-source-of-truth decision. Zero individual-runbook cross-references to the MAM advisory.

- **D-27:** **L2 template `platform:` enum one-line extension** at `docs/_templates/l2-template.md`. Current state (post-Phase-31): `platform: Windows | macOS | iOS | all`. Extend to `platform: Windows | macOS | iOS | Android | all`. Minor template edit; mirrors Phase 31 D-27 pattern. Separate commit: `docs(41): extend L2 template platform enum with Android`.

- **D-28:** **Platform-gate banner per Android L2 runbook** — extends Phase 31 D-29 with all 4 platform refs:
  ```
  > **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
  ```
  Banner appears at line ~9 of every new L2 runbook (`18-android-log-collection.md`, `19-android-enrollment-investigation.md`, `20-android-app-install-investigation.md`, `21-android-compliance-investigation.md`).

### Frontmatter Conventions (Phase 31 D-28 Android extension)

- **D-29:** **Frontmatter per Android L2 file** — schema inherits from Phase 31 D-28 with Android-specific values:
  - `platform: Android`
  - `audience: L2`
  - `applies_to: all` for `18-android-log-collection.md` (all enrollment modes) and `20-android-app-install-investigation.md` (all Managed Google Play modes) and `21-android-compliance-investigation.md` (compliance applies to all enrolled modes)
  - `applies_to: all` for `19-android-enrollment-investigation.md` as well (Pattern A-E covers BYOD / COBO / ZTE / Dedicated / universal)
  - `last_verified: 2026-04-23` (Phase 41 ship date; bump at each execute-time verification)
  - `review_by: last_verified + 90 days` per Phase 31 D-28 L2 cadence (distinct from 60-day L1 cadence Phase 34 D-14)

### L1→L2 Placeholder Retrofit Contract (Phase 40 D-25 resolution)

- **D-30:** **Explicit per-source L1→L2 placeholder target mapping.** Every "Phase 41" placeholder reference resolves to specific L2 runbook target(s) — no generic links to `00-index.md`. 10 total placeholders enumerated:

  | Source | Line | L2 Target |
  |--------|------|-----------|
  | `l1-runbooks/22-android-enrollment-blocked.md` | 73 | `19-android-enrollment-investigation.md#pattern-e-tenant-config-universal` (primary — enrollment restriction diagnosis) + cross-link to `18-android-log-collection.md` for log collection |
  | `l1-runbooks/23-android-work-profile-not-created.md` | 96 | `19-android-enrollment-investigation.md#pattern-a-work-profile-not-created-byod` (direct — BYOD work profile container failure IS the L2 investigation) + cross-link to `18-android-log-collection.md` |
  | `l1-runbooks/24-android-device-not-enrolled.md` | 80 | `19-android-enrollment-investigation.md` (start at Data Collection Step 1-4; mode-first disambiguation) + cross-link to `18-android-log-collection.md` |
  | `l1-runbooks/25-android-compliance-blocked.md` | 240 | `21-android-compliance-investigation.md` (direct — map L1 Cause A→Per-Cause Deep-Dive Cause A Play Integrity, L1 Cause B→Cause B OS Version, L1 Cause C→Cause C CA Timing, L1 Cause D→Cause D Passcode/Encryption per D-16 1:1 mapping) |
  | `l1-runbooks/26-android-mgp-app-not-installed.md` | 92 | `20-android-app-install-investigation.md` (direct — MGP app install diagnosis IS the L2 investigation) + cross-link to `18-android-log-collection.md` |
  | `l1-runbooks/27-android-zte-enrollment-failed.md` | 210 | `19-android-enrollment-investigation.md#pattern-c-zte-device-claim-failure` (direct — ZTE enrollment failure maps to Pattern C) + cross-link to `18-android-log-collection.md` |
  | `android-lifecycle/03-android-version-matrix.md` | 89 | `21-android-compliance-investigation.md#cause-a-play-integrity-verdict-failure` (Play Integrity failure troubleshooting per AEL2-04 forward-promise) |
  | `admin-setup-android/03-fully-managed-cobo.md` | 22 | `00-index.md#android-l2-runbooks` (generic L2 routing — admin guide sends admins/L2 to the L2 index for the runbook set; COBO-applicable runbooks are 18 / 19 / 20 / 21) |
  | `admin-setup-android/04-byod-work-profile.md` | 19 | `00-index.md#android-l2-runbooks` (generic — BYOD-applicable runbooks 18 / 19 / 20 / 21) |
  | `admin-setup-android/05-dedicated-devices.md` | 20 | `00-index.md#android-l2-runbooks` (generic — Dedicated-applicable runbooks 18 / 19 / 20 / 21 with note that runbook 19 Pattern A does not apply to Dedicated) |

  **Plan-phase MUST produce a complete row-by-row enumeration in PLAN.md before execution — no bulk sed / find-replace.** Per-row judgment on whether primary link is pattern-specific-anchor vs runbook-top vs `00-index.md#android-l2-runbooks`. Phase 31 D-26 precedent. Where L2 targets are pattern-specific anchors, verify anchor names against runbook 19 D-07 pattern-heading conventions at execute time.

- **D-31:** **Retrofit commit grouping — multi-commit by source directory.** Commit message pattern mirrors Phase 31 D-24:
  - `docs(41): resolve Phase 41 L2 placeholders in Android L1 runbooks` — 6 files (`l1-runbooks/22` through `l1-runbooks/27`)
  - `docs(41): resolve Phase 41 L2 placeholder in Android version matrix` — 1 file (`android-lifecycle/03-android-version-matrix.md`, 1 line)
  - `docs(41): resolve Phase 41 L2 placeholders in admin-setup-android` — 3 files (`03-fully-managed-cobo.md`, `04-byod-work-profile.md`, `05-dedicated-devices.md`)

- **D-32:** **Modification metadata on retrofitted files.** Each receives a `last_verified` frontmatter bump to Phase 41 ship date AND a 1-line Version History entry: `| <Phase-41-ship-date> | Resolved Phase 41 L2 cross-references | -- |`. Phase 31 D-25 exact pattern. For files without a Version History table (e.g., version matrix), skip the Version History row — frontmatter bump only.

- **D-33:** **Per-line enumeration before execution.** Planner MUST produce the full D-30 table in PLAN.md with exact current line numbers (re-verified at plan time; line drift possible between Phase 40 ship and Phase 41 execute) before execution. Eliminates execute-time ambiguity.

### Cross-File Shared-File Guard (PITFALL 9/11 + AEAUDIT-04)

- **D-34:** **Zero modifications** to the following files (shared-file guard):
  - `docs/index.md` (Phase 42 AEAUDIT-02 scope)
  - `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` (post-v1.4 unification task)
  - `docs/_glossary.md`, `docs/_glossary-android.md`, `docs/_glossary-macos.md` (Phase 34 / Phase 42 AEAUDIT-03 scope)
  - Any `docs/admin-setup-apv1/`, `docs/admin-setup-apv2/`, `docs/admin-setup-ios/`, `docs/admin-setup-macos/` file
  - Any `docs/end-user-guides/` file
  - Any `docs/decision-trees/` file (Phase 40 shipped `08-android-triage.md`; Phase 41 may reference but never modify)
  - Any existing Windows/macOS/iOS L2 runbook (`l2-runbooks/01-05`, `06-08`, `10-13`, `14-17`) — append-only constraint

  Allowed modifications:
  - NEW files: `l2-runbooks/18` / `19` / `20` / `21` (Phase 41 owned)
  - `l2-runbooks/00-index.md` — append `## Android L2 Runbooks` section per D-26
  - `_templates/l2-template.md` — one-line enum extension per D-27
  - `l1-runbooks/22` through `l1-runbooks/27` — SINGLE LINE modification each (D-30 placeholder resolution only; no structural changes)
  - `android-lifecycle/03-android-version-matrix.md` — single-line modification (D-30 line 89 only)
  - `admin-setup-android/03-fully-managed-cobo.md`, `04-byod-work-profile.md`, `05-dedicated-devices.md` — single-line modification each (D-30 placeholder resolution only; no structural changes beyond `last_verified` bump + Version History row per D-32)

### Claude's Discretion

- Exact section numbering within Runbook 18 Section 1/2/3 — subsections are Claude's call within D-05 section order
- Exact Pattern A-E ordering in Runbook 19 Analysis section (alphabetical by current D-07 naming OR frequency-descending; either acceptable per Phase 31 D-19 pattern-ordering precedent)
- Exact wording of runbook 19 Pattern sub-sections within D-07 scope and D-12 class-marker format
- Exact Cause C / Cause A Pareto-expanded content in runbook 21 (D-20 directs ~50% total; exact distribution within that budget)
- Exact "MAM-WE Investigation Advisory" wording in 00-index.md Android section (D-26 template)
- Exact wording of runbook 19 Graph API READ-ONLY preamble (D-10 template)
- Per-runbook length (Phase 31 parallels: 14-log-collection ~160-180 → Android 18 target ~180-220 lines with added USB-debug callout + mode-selection block; 15-ade-token-profile ~220-280 → Android 19 target ~260-320 lines with 5-pattern structure; 16-app-install ~194 → Android 20 target ~190-220 lines; 17-compliance-ca-timing ~220-250 → Android 21 target ~230-260 lines)
- File-by-file judgment on admin-setup-android retrofit target specificity (D-30 generic vs pattern-specific; plan-time choice)
- Exact filter-tag examples in `adb logcat` command set D-24 (plan-time research refinement)
- Whether `adb shell dumpsys device_policy` gets a sub-section or inline code block within Section 3 (readability call)

### Folded Todos

None — `gsd-tools todo match-phase 41` was not queried at context-gather time; re-verify at plan time. Phase 40 context gather returned zero matches; Phase 41 expected to be similar given v1.4 roadmap discipline.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer, Phase 42 auditor) MUST read these before planning or implementing.**

### Requirements and Roadmap
- `.planning/ROADMAP.md` — Phase 41 entry (lines 214-225) with goal, dependencies (Phase 40 L1 + Phase 37 BYOD anchors), and 5 success criteria (SC #1 3-method log collection with confidence labels, SC #2 enrollment investigation with config/timing/defect + escalation packet, SC #3 app install with 3-class disambiguation, SC #4 compliance with Play Integrity verdicts zero-SafetyNet-body, SC #5 00-index.md append-only)
- `.planning/REQUIREMENTS.md` — AEL2-01 (log collection 3-method) through AEL2-05 (L2 index append) with traceability table
- `.planning/PROJECT.md` — v1.4 scope decisions; MAM-WE deferral (runbook 20 D-15 cross-link; Android MAM-WE advisory in 00-index.md per D-26); AOSP v1.4.1 deferral (runbook 19 Pattern A-E scope guard — no AOSP pattern); Knox v1.4.1 deferral (runbook 19 ZTE-pattern Cause D scope); tri-portal admin template (runbook 19 Pattern C cross-links Zero-Touch portal anchors)
- `.planning/STATE.md` — current milestone state and Phase 41 research flag ("adb diagnostic commands — LOW confidence; label MEDIUM/LOW with explicit confidence callout if not verified against official source")

### Structural Precedents (PRIMARY templates)
- `.planning/milestones/v1.3-phases/31-ios-l2-investigation/31-CONTEXT.md` — **iOS Phase 31 PRIMARY structural precedent for ALL Phase 41 structure.** D-01 tiered log-collection flow (Phase 41 adapts with mode-first D-01), D-02 tool-landscape preamble (Phase 41 mirror), D-03 method-to-data-type matrix, D-04 section order, D-07 hybrid investigation structure (Phase 41 D-08 adapts), D-09 Graph API READ-ONLY preamble (Phase 41 D-10 mirror), D-11/D-12 app-install three-class disambiguation (Phase 41 D-13/D-14 mirror), D-14 compliance hybrid axis (Phase 41 D-16 exact mirror), D-15 Pareto expansion (Phase 41 D-20 mirror), D-16 "Not evaluated" terminal state (Phase 41 D-21 mirror), D-17 L1-handoff block (Phase 41 D-11/D-17 mirror), D-18/D-19 file numbering (Phase 41 extends 14-17 → 18-21), D-20 index section structure (Phase 41 D-26 exact mirror), D-21 MAM advisory placement (Phase 41 D-26 exact mirror), D-22 L1→L2 placeholder mapping (Phase 41 D-30 mirror), D-24 commit grouping (Phase 41 D-31 mirror), D-25 last_verified bump (Phase 41 D-32 mirror), D-27 template enum extension (Phase 41 D-27 mirror), D-28 frontmatter schema (Phase 41 D-29 Android extension), D-29 platform-gate banner (Phase 41 D-28 4-platform extension)
- `docs/l2-runbooks/14-ios-log-collection.md` — PRIMARY structural template for `18-android-log-collection.md` (~160 lines; iOS Phase 31 D-01 tiered; Phase 41 D-01 adapts to mode-first)
- `docs/l2-runbooks/15-ios-ade-token-profile.md` — PRIMARY structural template for `19-android-enrollment-investigation.md` (191 lines; iOS Phase 31 D-07 hybrid; Phase 41 D-08 adapts with 5-pattern)
- `docs/l2-runbooks/16-ios-app-install.md` — PRIMARY structural template for `20-android-app-install-investigation.md` (194 lines; iOS Phase 31 D-11/D-12; Phase 41 D-13/D-14 direct mirror)
- `docs/l2-runbooks/17-ios-compliance-ca-timing.md` — PRIMARY structural template for `21-android-compliance-investigation.md` (~230 lines; iOS Phase 31 D-14 hybrid axis; Phase 41 D-16 exact mirror applied to 4-cause L1 runbook 25 mapping)
- `docs/l2-runbooks/00-index.md` — index pattern with iOS L2 section at lines 99-131. D-26 extends with Android L2 section mirroring iOS structure.
- `docs/l2-runbooks/10-macos-log-collection.md` through `13-macos-compliance.md` — secondary macOS L2 templates referenced in Phase 31 D-18 4-runbook precedent

### Phase 26-40 Foundations (LOCKED decisions)
- `.planning/phases/34-android-foundation/34-CONTEXT.md` — D-04 (canonical mode labels; never "supervision"), D-10 (cross-platform callouts, tri-portal shorthand), D-11 (glossary first-occurrence plain-text pattern), D-14 (60-day review cycle for admin/L1; Phase 41 L2 uses 90-day per Phase 31 D-28), D-17 (HTML-comment subtractive-deletion pattern — runbook 18 `<!-- verify UI at execute time -->` inheritance), D-26 (Anti-Pattern 1 canonical-matrix discipline — runbook 21 Cause B OS Version references `03-android-version-matrix.md`, does NOT duplicate)
- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-CONTEXT.md` — D-20 (KME/ZT Samsung mutual exclusion — runbook 19 Pattern C cross-reference), D-21 (ZT↔Intune linking Method A/B — runbook 19 Pattern C SC #2 token-sync state context)
- `.planning/phases/36-fully-managed-cobo-admin/36-CONTEXT.md` — D-13 (single-string `applies_to` — runbook 18/19/20/21 frontmatter); COBO anchor stability for runbook 19 Pattern B cross-references
- `.planning/phases/37-byod-work-profile-admin-end-user/37-CONTEXT.md` — D-10/D-11 source-confidence marker regex (Phase 41 D-22/D-23 uses), D-15 (single-string applies_to); BYOD anchor stability (`#enrollment-restrictions` line 84, `#work-profile-policy` line 103, `#privacy-boundary` line 148) for runbook 19 Pattern A + Pattern E cross-references
- `.planning/phases/38-dedicated-devices-admin/38-CONTEXT.md` — D-18 (single-string applies_to); Dedicated anchor stability for runbook 19 Pattern D cross-references
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-CONTEXT.md` — **D-17 anchor stability contract** (`#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#kme-zt-device-claim`, `#configuration-must-be-assigned` in `02-zero-touch-portal.md`) — runbook 19 Pattern C LOCKED cross-links; Phase 39 D-17 `<!-- verify UI at execute time -->` pattern; AEAOSP-01 scope guard (runbook 19 Pattern A-E excludes AOSP)
- `.planning/phases/40-android-l1-triage-runbooks/40-CONTEXT.md` — **Phase 40 Android L1 PRIMARY precedent for terminology / anchor / handoff conventions.** D-02 triage-tree node ID `AND` prefix (runbook 21 Per-Cause anchor convention), D-06 canonical mode labels discipline, D-07..D-12 runbook `applies_to` frontmatter conventions, D-16 runbook 25 Cause A/B/C/D 4-cause structure (Phase 41 D-16 direct 1:1 mapping), D-17 Cause A rephrased SafetyNet-token-avoidance (Phase 41 D-18 exact pattern mirror), D-19 L1 handoff cause-ordering (Phase 41 D-11 L2 handoff cause mapping), D-20 SafetyNet Phase 42 audit grep anchor, D-25 "Android L2 runbooks (Phase 41)" placeholder convention (Phase 41 D-30 resolves), D-22 atomic commit pattern (Phase 41 D-31 multi-commit mirror)

### Android Content Cross-Reference Targets (for runbook deep-links)
- `docs/_glossary-android.md` — **canonical Android terminology source**. Runbook 21 Cause A cross-links `#play-integrity`; runbook 19 Pattern C cross-links `#zero-touch-enrollment`, `#dpc`; runbooks cross-link `#work-profile`, `#fully-managed`, `#dedicated`, `#managed-google-play` as needed. Phase 41 NEVER modifies this file.
- `docs/android-lifecycle/00-enrollment-overview.md` — ownership × management-scope concept anchors for runbook 19 Pattern A-E mode framing
- `docs/android-lifecycle/01-android-prerequisites.md` — tri-portal orientation for runbook 19 escalation packet tenant-config context
- `docs/android-lifecycle/02-provisioning-methods.md` — canonical provisioning matrix (Anti-Pattern 1 guard; runbooks reference, never duplicate)
- `docs/android-lifecycle/03-android-version-matrix.md` — canonical version matrix (runbook 21 Cause B OS-version policy cross-reference; Phase 41 D-30 line 89 placeholder resolution)
- `docs/admin-setup-android/00-overview.md` — admin setup overview with tri-portal sequence
- `docs/admin-setup-android/01-managed-google-play.md` — MGP binding (runbook 20 primary cross-reference)
- `docs/admin-setup-android/02-zero-touch-portal.md` — ZT portal + Phase 39-appended Corporate-Scale Operations section (runbook 19 Pattern C primary cross-reference; all Phase 39 D-17 LOCKED anchors)
- `docs/admin-setup-android/03-fully-managed-cobo.md` — COBO admin (runbook 19 Pattern B cross-reference; Phase 41 D-30 line 22 placeholder resolution)
- `docs/admin-setup-android/04-byod-work-profile.md` — BYOD admin (runbook 19 Pattern A cross-reference; Phase 37 BYOD anchor stability targets; Phase 41 D-30 line 19 placeholder resolution)
- `docs/admin-setup-android/05-dedicated-devices.md` — Dedicated admin (runbook 19 Pattern D cross-reference; Phase 41 D-30 line 20 placeholder resolution)
- `docs/admin-setup-android/06-aosp-stub.md` — AOSP stub (NO runbook cross-links; AOSP out of Phase 41 scope per Phase 39 AEAOSP-01 guard)
- `docs/end-user-guides/android-work-profile-setup.md` — BYOD end-user self-service (runbook 19 Pattern A may reference for user-side verification; NOT modified)

### Android L1 Runbooks (LOCKED — Phase 40; referenced by L2 for escalation handoff)
- `docs/l1-runbooks/22-android-enrollment-blocked.md` — L1 handoff → runbook 19 Pattern E (Phase 41 D-30; line 73 placeholder resolution)
- `docs/l1-runbooks/23-android-work-profile-not-created.md` — L1 handoff → runbook 19 Pattern A (Phase 41 D-30; line 96 placeholder resolution)
- `docs/l1-runbooks/24-android-device-not-enrolled.md` — L1 handoff → runbook 19 Data Collection Step 1-4 (Phase 41 D-30; line 80 placeholder resolution)
- `docs/l1-runbooks/25-android-compliance-blocked.md` — L1 handoff → runbook 21 Per-Cause Deep-Dive Cause A/B/C/D direct 1:1 mapping (Phase 41 D-30; line 240 placeholder resolution). **Cause A/B/C/D anchor structure is LOCKED — runbook 21 Per-Cause anchors MUST match L1 runbook 25's anchor names** (`#cause-a-play-integrity-verdict-failure`, `#cause-b-os-version-policy-mismatch`, `#cause-c-ca-timing-gap`, `#cause-d-passcode-encryption-policy-mismatch`)
- `docs/l1-runbooks/26-android-mgp-app-not-installed.md` — L1 handoff → runbook 20 (Phase 41 D-30; line 92 placeholder resolution)
- `docs/l1-runbooks/27-android-zte-enrollment-failed.md` — L1 handoff → runbook 19 Pattern C (Phase 41 D-30; line 210 placeholder resolution); runbook 27 Cause A/B/C/D structure informs Pattern C detail

### Android Decision Trees (LOCKED — Phase 40; NO modifications in Phase 41)
- `docs/decision-trees/08-android-triage.md` — Phase 40 mode-first triage tree; runbook 19/21 do NOT modify; runbook 00-index.md entry + runbooks cross-link to the triage tree entry points (but never rewrite)
- `docs/decision-trees/00-initial-triage.md` — Phase 40 D-23 banner already shipped; Phase 41 does NOT modify (decision-trees/ directory is append-only in Phase 41)

### Templates and Conventions
- `docs/_templates/l2-template.md` — L2 template. D-27 extends `platform:` enum to include `Android` (one-line edit). Line 19 current state: `platform: Windows | macOS | iOS | all` (Phase 31 D-27 state). Verify exact line number at execute time.

### Requirements & Scope Boundaries
- `.planning/REQUIREMENTS.md` Future Requirements section — `AEKNOX-03` (Knox ME L2 runbooks v1.4.1) informs runbook 19 Pattern C scope (KME/ZT mutual-exclusion handled at Phase 40 L1 runbook 27 level; L2 Pattern C references but does not deep-dive KME); `AEAOSPFULL-03` (AOSP L2 runbooks v1.4.1) informs runbook 19 Pattern A-E AOSP exclusion
- `.planning/REQUIREMENTS.md` Out of Scope table — SafetyNet explicit exclusion (D-18 glossary-link pattern), Android DA legacy mode exclusion, custom OMA-URI BYOD exclusion post-AMAPI (runbook 19 Pattern A AMAPI callout)

### Adversarial Review Artifact
- `.planning/phases/41-android-l2-investigation/41-DISCUSSION-LOG.md` — full adversarial-review audit trail (4 gray areas × 4 primary options + 4 sub-decisions = 16 primary candidates + sub-variants; 106 flaws adjudicated; Finder/Adversary/Referee verdicts; per-area winners with scores)

### External Research Targets (for gsd-phase-researcher)
- Microsoft Learn — Intune Android device log retrieval UI (current portal navigation; D-02 preamble "no Download Diagnostics per-device bundle" assertion verification)
- Microsoft Learn — Microsoft Intune app for Android (post-AMAPI April 2025 primary BYOD management app; log upload flow)
- Microsoft Learn — Company Portal app for Android (legacy BYOD + COBO/Dedicated fallback log collection flow)
- Microsoft Learn — Intune Android Enterprise enrollment restrictions blade (runbook 19 Pattern E)
- Microsoft Learn — Intune Android compliance policy configuration (runbook 21 Cause B/C/D)
- Microsoft Learn — Intune Android Play Integrity attestation settings (runbook 21 Cause A)
- Microsoft Learn — Managed Google Play app assignment and license management (runbook 20 primary)
- Microsoft Graph API — Android managed store account enterprise settings endpoint (runbook 19 D-09 GUID extraction; READ-ONLY verification)
- Android Developer Documentation — `adb logcat`, `dumpsys device_policy`, `pm list packages` (runbook 18 Section 3 D-24 command set; confidence labels per D-22)
- Google Zero-Touch customer-portal help (`https://support.google.com/work/android/topic/9158960`) — runbook 19 Pattern C source of truth
- Google Play Integrity API documentation — runbook 21 Cause A Play Integrity verdict semantics reference

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from v1.0-v1.3 + Phase 34-40)

- **L2 template** (`docs/_templates/l2-template.md`) — one-line platform enum extension (`| Android`) per Phase 31 D-27 precedent. Frontmatter schema, section structure (Context / Investigation / Resolution / Escalation Criteria), Version History table, and cross-reference conventions all reused verbatim.
- **Phase 31 iOS L2 4-file pattern** — direct structural templates per Canonical Refs above. Android follows the same 4-file pattern (log collection + 3 investigation runbooks), same section ordering, same frontmatter schema. Android adaptations: mode-first tiering in runbook 18 (D-01), 5-pattern structure in runbook 19 (D-07), direct 1:1 L1-runbook-25-cause mapping in runbook 21 (D-16).
- **L2 platform-gate banner pattern** (Phase 31 D-29) — reused verbatim with Android extension (D-28 4-platform refs).
- **"Gather everything first, then investigate" principle** (Phase 24 D-14) — reused; all 4 Android L2 runbooks open with "Before starting: collect a diagnostic package per [Android Log Collection Guide](18-android-log-collection.md)."
- **L1→L2 Escalation Mapping table in `00-index.md`** (iOS section lines 117-125) — extended with Android section per D-26. Table columns and row structure preserved.
- **"Version gate" blockquote pattern** — reused verbatim.
- **Three-class disambiguation markers** ⚙️/⏱️/🐛 (Phase 31 D-12) — runbook 20 D-14 direct mirror; runbook 19 D-12 adapted for per-pattern placement.
- **Hybrid axis structure** (Phase 31 D-14) — runbook 21 D-16 exact mirror with 4-cause deep-dive.
- **Cross-reference anchor linking** (`../admin-setup-android/02-zero-touch-portal.md#reseller-upload-handoff`) — reused throughout Android L2 runbooks for admin-setup deep-links (Phase 37 BYOD / Phase 39 ZTE LOCKED anchors).
- **Graph API READ-ONLY preamble pattern** (Phase 31 D-09) — runbook 19 D-10 mirror; preamble-only placement, no per-step repetition.
- **Cross-phase placeholder pattern** (Phase 28 D-22 → Phase 30 D-16 → Phase 31 D-22 → Phase 40 D-25 → Phase 41 D-30) — Phase 41 IS the resolution milestone for "Phase 41" placeholders planted by Phase 40. Atomic commit grouping by source directory (D-31).
- **SafetyNet token-avoidance rephrase pattern** (Phase 40 D-17) — runbook 21 D-18 exact mirror. Glossary cross-link only; zero literal "SafetyNet" in runbook body.
- **Per-assertion confidence marker regex** (Phase 37 D-10/D-11) — runbook 18 Section 3 adb commands use per-assertion markers per D-22.

### Established Patterns

- L2 runbook section order: Frontmatter → Platform-gate banner (D-28) → Title H1 → Context H2 (with L1 handoff block D-11/D-17) → Tool-Landscape preamble (runbook 18 only; D-02) → Decision Matrix (runbook 18 only; D-03) → Investigation / Analysis H2s (structure per-runbook per D-05/D-08/D-16) → Resolution H2 → Escalation Criteria H2 → Related Resources → Version History
- Frontmatter: `last_verified: 2026-04-23`, `review_by: last_verified + 90d`, `audience: L2`, `platform: Android`, `applies_to: all` (all 4 runbooks)
- Android L2 investigation uses portal + Company Portal / Intune app logs + optional adb logcat — no sysdiagnose analog; no `mdmdiagnosticstool.exe` analog
- L2 runbooks open with handoff block: "From L1 escalation? L1 runbook N classified as [Pattern/Cause X]. Skip to [section]. Starting fresh? Begin at [Step 1]."
- Relative cross-references with section anchors — e.g., `../admin-setup-android/04-byod-work-profile.md#enrollment-restrictions` (Phase 37 LOCKED anchor); `../admin-setup-android/02-zero-touch-portal.md#device-claim-workflow` (Phase 39 D-17 LOCKED anchor); `../l1-runbooks/25-android-compliance-blocked.md#cause-a-play-integrity-verdict-failure` (Phase 40 L1 anchor)
- Version History table at bottom of every file (1-line entries; Phase 30/31 pattern)
- 90-day review_by cadence on new L2 runbooks (distinct from 60-day L1 cadence per Phase 34 D-14)
- 4-platform "Platform gate" banner (Windows + macOS + iOS + Android refs)

### Integration Points

- **4 new files**: `docs/l2-runbooks/18-android-log-collection.md` + `19-android-enrollment-investigation.md` + `20-android-app-install-investigation.md` + `21-android-compliance-investigation.md`
- **2 file edits (template + index)**:
  - `docs/_templates/l2-template.md` — one-line platform enum extension (D-27)
  - `docs/l2-runbooks/00-index.md` — append `## Android L2 Runbooks` section per D-26 (zero mods to existing sections per AEL2-05 append-only)
- **10 single-line placeholder retrofits** per D-30:
  - `docs/l1-runbooks/22-android-enrollment-blocked.md` line 73
  - `docs/l1-runbooks/23-android-work-profile-not-created.md` line 96
  - `docs/l1-runbooks/24-android-device-not-enrolled.md` line 80
  - `docs/l1-runbooks/25-android-compliance-blocked.md` line 240
  - `docs/l1-runbooks/26-android-mgp-app-not-installed.md` line 92
  - `docs/l1-runbooks/27-android-zte-enrollment-failed.md` line 210
  - `docs/android-lifecycle/03-android-version-matrix.md` line 89
  - `docs/admin-setup-android/03-fully-managed-cobo.md` line 22
  - `docs/admin-setup-android/04-byod-work-profile.md` line 19
  - `docs/admin-setup-android/05-dedicated-devices.md` line 20
- **Per retrofit file**: `last_verified` bump + Version History row per D-32 (where applicable — files without Version History tables skip the row)
- **NO Mermaid graph modifications** to any decision tree file (Phase 40 D-05 precedent)
- **NO modifications to Phase 40 L1 runbook structure** — only escalation-footer single-line link substitution per D-30
- **NO glossary additions** (Phase 42 scope)
- **NO navigation hub edits** to `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` (Phase 42 AEAUDIT-02 / post-v1.4 unification)
- **NO capability matrix entries** (Phase 42 AEAUDIT-01)
- **NO Android MAM-WE L2 runbook content** (ADDTS-ANDROID-01 deferred; D-15/D-26)
- **NO Graph API write operations** in any L2 runbook (D-10 scope boundary)
- **NO state-mutating adb commands** in any L2 runbook (D-24 scope boundary; Phase 24 / Phase 31 diagnostic-vs-remediation separation)
- **Cross-phase stable anchors required from Phase 41 artifacts** (consumed by Phase 42 AEAUDIT + any future v1.4.1 retrofits):
  - `18-android-log-collection.md` — Section 1/2/3 anchors (`#section-1-company-portal-logs`, `#section-2-microsoft-intune-app-logs`, `#section-3-adb-logcat`)
  - `19-android-enrollment-investigation.md` — Pattern A-E anchors (`#pattern-a-work-profile-not-created-byod`, `#pattern-b-cobo-enrollment-stuck`, `#pattern-c-zte-device-claim-failure`, `#pattern-d-dedicated-qr-scan-failure`, `#pattern-e-tenant-config-universal`)
  - `20-android-app-install-investigation.md` — standard L2 H2 anchors (`#investigation`, `#resolution`, `#escalation-criteria`)
  - `21-android-compliance-investigation.md` — Per-Cause Deep-Dive anchors EXACTLY matching L1 runbook 25 (`#cause-a-play-integrity-verdict-failure`, `#cause-b-os-version-policy-mismatch`, `#cause-c-ca-timing-gap`, `#cause-d-passcode-encryption-policy-mismatch`) + axis anchors (`#configuration-errors`, `#timing-issues`, `#genuine-defects`)
  - `00-index.md#android-l2-runbooks` — section anchor for generic admin-setup-android retrofit links (D-30 lines 22/19/20)
  - `00-index.md#android-mam-we-investigation-advisory` — Phase 31 D-21 mirror advisory anchor for runbook 20 D-15 cross-link

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence (106 flaws adjudicated)

- **Mode-first tiering rationale (D-01)**: The 1D winner models Android's heterogeneous primary-tool-by-mode reality that iOS does not have. iOS Phase 31 D-01 friction-ordered worked because iOS has ONE primary collection tool per method regardless of enrollment path. Android has Company Portal (BYOD pre-AMAPI) vs Microsoft Intune app (BYOD post-AMAPI + COBO/Dedicated/ZTE) as the "primary user-facing tool" on a per-mode axis. Finder flaw 1.A.1 (iOS-mirror misapplies to heterogeneous Android) was downgraded to MEDIUM by Referee Ruling #4 but remains REAL — 1A's friction-order model cannot express this mode-axis without losing information.
- **Multi-mode runbook 19 scope rationale (D-07)**: BYOD-only scoping (2A) fails Phase 40 D-25 atomic placeholder resolution because L1 runbooks 24 (`applies_to: all`) and 25 (`applies_to: all`) and 27 (`applies_to: ZTE`) cannot forward to a BYOD-only L2 runbook. Phase 41 scope is "Android work profile enrollment failure" per ROADMAP SC #2 text, but Phase 40 D-25 contract expanded the de-facto resolution target. 2B (multi-mode 5-pattern) is the only option that resolves all 6 L1 placeholder lines without leaving non-BYOD L1 escalations orphaned. Phase 39 D-17 anchor re-use (concern from Finder 2.B.1 CRIT) was downgraded to LOW by Referee Ruling #9 — Phase 40 D-18 runbook 27 already successfully cross-links the same anchors, so Phase 41 runbook 19 Pattern C reusing them is precedent-matched not precedent-drift.
- **adb confidence per-assertion rationale (D-22)**: SC #1 "any adb command not sourced from MS Learn" is literally ambiguous between per-command marker and per-section marker coverage. Referee Ruling #3 interpreted Phase 37 D-10/D-11 regex as designed for mechanical grep — which requires per-assertion placement for reliable verification. Per-assertion with section-level default (3B) is the sweet spot: mechanical-grep-friendly AND avoids over-marking routine commands. 3A pure section-only fails mechanical audit; 3D zero-inline violates SC #1 outright.
- **SafetyNet strict-token avoidance (D-18)**: Phase 40 D-17 note on CONTEXT.md explicitly documented that the Phase 40 team rephrased Cause A wording to avoid the literal "SafetyNet" token because the AEAUDIT-04 audit-grep was strict (case-insensitive body grep fails on any occurrence). Phase 41 runbook 21 inherits this strict interpretation per Referee Ruling #1. All 4 SafetyNet-inline variants (a/b/c-text/d) that include the literal token in runbook body fail strict grep; only variant (c-glossary-link-only) + variant (e) survive. (c) provides stronger deprecation signal via the glossary cross-link; (e) is functionally equivalent but silent. Winner 4Sc combines Phase 40 rephrased body text with glossary cross-link.
- **Glossary cross-link IS NOT glossary modification (Adversary-correct disprove of 4.B.3 / 4.Sc.1 / 4.Sc.2)**: Referee Rulings #2 and #16 settled this decisively. Phase 40 L1 runbook 25 Cause A already cross-links `[Play Integrity](../_glossary-android.md#play-integrity)` without modifying the glossary. The shared-file guard forbids MODS to `_glossary-android.md`, not LINKS to it. This disprove applies to variants 4B, 4C, 4Sc — all involving glossary links — freeing the recommendations from a manufactured constraint.
- **Phase 31 D-14 hybrid axis applied to 4 Android causes (D-16)**: Finder worried (4.A.1 MED → LOW, 4.A.2 MED → LOW) that 3-axis top × 4-cause deep-dive creates a sparse 3×4 matrix. Referee Ruling #13/#14 confirmed this is Phase 31 precedent working as intended — the hybrid axis catches multi-axis causes (Cause A Play Integrity spans ⚙️ config + 🐛 defect). Dropping the axis (4D) is a real CRIT precedent violation (Phase 31 D-14 LOCKED).

### Runbook-Specific Length Targets and Notes

- **Runbook 18 (log collection)**: ~180-220 lines. Tool-landscape preamble D-02 + decision matrix D-03 + Method Selection by Mode D-01 block adds ~20-30 lines over Phase 31 iOS 14 (~160). Section 1/2/3 each ~40-50 lines. USB-debug callout D-04 ~10 lines. Confidence markers D-22 per-command add minor overhead.
- **Runbook 19 (enrollment investigation)**: ~260-320 lines. Most complex runbook per D-07 5-pattern structure. Data Collection Step 1-4 ~60 lines; Pattern A-E ~30-50 lines each (Pattern A and C deeper per Phase 37/39 anchor richness); Resolution + escalation-packet ~40 lines. Graph API READ-ONLY preamble D-10 ~10 lines.
- **Runbook 20 (app install)**: ~190-220 lines. Direct Phase 31 D-11 macOS 12 (194 lines) template mirror. Three-class disambiguation D-14 visual markers.
- **Runbook 21 (compliance)**: ~230-260 lines. Phase 31 D-14 hybrid structure; D-20 Pareto expansion on Cause A and C; D-18 glossary-link-only SafetyNet callout.

### Runbook 19 Pattern Enumeration

| Pattern | Mode | L1 Handoff | Phase Anchor Target(s) | Class |
|---------|------|-----------|------------------------|-------|
| A: Work Profile Not Created | BYOD | L1 runbook 23 | `04-byod-work-profile.md#enrollment-restrictions` (line 84), `#work-profile-policy` (line 103), `#privacy-boundary` (line 148) | ⚙️ Config (AMAPI-era transition occasionally 🐛 Defect) |
| B: COBO Enrollment Stuck | COBO | L1 runbook 24 (COBO-path) | `03-fully-managed-cobo.md` enrollment profile anchor | ⚙️ Config + ⏱️ Timing |
| C: ZTE Device Claim Failure | ZTE | L1 runbook 27 | `02-zero-touch-portal.md#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#configuration-must-be-assigned`, `#kme-zt-device-claim` (Phase 39 D-17 LOCKED) | ⚙️ Config (Phase 39 D-03 "configuration must be assigned") + 🐛 Defect (reseller upload gaps) |
| D: Dedicated QR Scan Failure | Dedicated | L1 runbook 24 (Dedicated-path) | `05-dedicated-devices.md` enrollment profile + MHS anchors | ⚙️ Config + ⏱️ Timing (QR token rotation) |
| E: Tenant-Config-Universal | all GMS | L1 runbook 22 | `04-byod-work-profile.md#enrollment-restrictions` (canonical) + `admin-setup-android/00-overview.md#intune-enrollment-restrictions` equivalent | ⚙️ Config (enrollment restriction blade) |

### L1→L2 Cross-Reference Mapping (D-30 detailed)

Already enumerated in D-30 table above. Plan-phase produces per-row substitution enumeration in PLAN.md.

### adb Command Set (D-24 detailed)

| Command Family | Example Invocation | Confidence | Phase 41 Scope |
|----------------|-------------------|------------|----------------|
| `adb logcat` | `adb logcat -s DevicePolicyManager:* WorkProfileManager:* IntuneManagedAgent:*` | `[HIGH, last_verified 2026-04-23]` baseline; per-tag filter examples labeled `[MEDIUM, last_verified 2026-04-23]` until Phase 42 audit confirms | Runbook 18 Section 3 primary; Runbook 19 all patterns; Runbook 21 Cause C |
| `adb shell dumpsys device_policy` | `adb shell dumpsys device_policy | head -100` | `[MEDIUM, last_verified 2026-04-23]` (output format drift across Android 12/13/14/15) | Runbook 18 Section 3; Runbook 19 Pattern A/B/D |
| `adb shell pm list packages` | `adb shell pm list packages | grep com.microsoft.intune` or `adb shell pm list packages -f` | `[HIGH, last_verified 2026-04-23]` (universal Android command) | Runbook 18 Section 3; Runbook 19 Pattern A/B (work profile / device owner app presence); Runbook 20 (MGP app package verification) |

EXCLUDED with rationale:
- `adb bugreport` — PII handling + Microsoft Support coordination outside Phase 41 L2 scope
- `adb shell am broadcast`, `adb shell pm grant-permissions` — state-mutating, diagnostic/remediation boundary violation
- `adb shell getprop ro.build.*` — wildcard glob portability issue; deferred unless specific OS-version checking becomes essential (likely Phase 42 if compliance policy references specific build numbers)

### Phase 41 D-18 SafetyNet Rephrase Exact Template

Runbook 21 Cause A opens with:
```
## Cause A: Play Integrity Verdict Failure {#cause-a-play-integrity-verdict-failure}

> See [Play Integrity](../_glossary-android.md#play-integrity) for the attestation mechanism Android compliance uses. The legacy attestation API was deprecated by Google in January 2025; Play Integrity is the current replacement. All Phase 34 and later Android documentation uses Play Integrity terminology exclusively.

**Typical class:** ⚙️ Config Error (policy-tier minimum mismatch) + 🐛 Defect (verdict anomaly on otherwise-compliant device)

[Cause A content — Investigation / Known Patterns / Resolution per D-16 hybrid axis structure]
```

Zero literal "SafetyNet" token in runbook body. AEAUDIT-04 strict grep passes.

### Adversarial-Review Trail Preservation

`41-DISCUSSION-LOG.md` records the 16 candidate options + sub-variants + 106 flaws + Adversary's 18 disproves + Referee's 17 interpretation rulings + per-Gray-Area winner reasoning. Full auditable record of decision derivation.

</specifics>

<deferred>
## Deferred Ideas

- **Android MAM-WE L2 runbooks** (selective wipe failures, PIN loop, app protection not applying, MAM-WE-specific compliance failures) — **ADDTS-ANDROID-01** future milestone (v1.4.1+). Phase 41 surfaces the deferral via `00-index.md` Android MAM-WE advisory note (D-26) but does NOT create a stub runbook (Phase 30/31 no-stub precedent).
- **Android AOSP L2 investigation runbooks** — **AEAOSPFULL-03** future requirement; v1.4.1 scope. Runbook 19 Pattern A-E excludes AOSP per Phase 39 AEAOSP-01 scope guard; Phase 40 D-03 ANDE1 triage terminal already routes AOSP to "L2 out of scope v1.4".
- **Knox Mobile Enrollment L2 runbooks** (KME-specific enrollment failure investigation, Knox Workspace interaction) — **AEKNOX-03** future requirement; v1.4.1 scope. Runbook 19 Pattern C Cause D (KME/ZT mutual exclusion) cross-links Phase 35 D-20 / Phase 39 D-06 / Phase 40 D-18 precedent but does not deep-dive KME-specific diagnostics.
- **Android bugreport integration** — data-handling and Microsoft Support coordination patterns for `adb bugreport` PII-laden comprehensive bundle. Not in Phase 41 scope (D-24 exclusion); deferred until Microsoft Support coordination patterns mature or compliance/legal review defines handling.
- **Android Graph API deep-dive runbook** (equivalent of Phase 31's ADDTS-02 for iOS) — Graph API write operations, DPC extras JSON enumeration, token rotation history, device claim automation. Phase 41 D-10 READ-ONLY scope forbids write ops; deep-dive deferred to ADDTS-ANDROID-02 equivalent (v1.4.1+).
- **Android `docs/index.md` H2 section** — Phase 42 AEAUDIT-02 scope (stub only in v1.4; full integration is post-v1.4 unification task).
- **Android capability matrix** — Phase 42 AEAUDIT-01 scope.
- **`docs/common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md` Android integration** — post-v1.4 unification task per PROJECT.md Key Decisions (backport regression risk against live v1.0-v1.3 shared files).
- **`_glossary-macos.md` Android see-also** — Phase 42 AEAUDIT-03 scope.
- **Android L1 runbook 27 Cause D (KME/ZT mutual exclusion) L2 deep-dive path** — Phase 41 runbook 19 Pattern C touches only surface (cross-link to Phase 40 D-18 Cause D via L1 runbook 27 anchor); deeper KME-side investigation is AEKNOX-03 deferred.
- **Additional adb diagnostic commands** (getprop ro.build.*, netstat, iptables) — deferred unless compliance or enrollment failure investigation reveals need. Phase 41 D-24 minimum-viable set is explicit.
- **Automated link-check CI for Phase 41 placeholder-free Android L1/L2 content** — not in current tooling; Phase 42 AEAUDIT-04 mechanical verification is the current check; CI automation is post-v1.4 tooling milestone.
- **Android L2 end-user-facing guide parity** — L2 runbooks reference end-user-guides (Phase 37 `android-work-profile-setup.md`) as supporting context but do not modify them; end-user L2 content is not in v1.4 scope (tier-inversion discipline).
- **Mermaid diagram in runbook 19** for Pattern A-E disambiguation — Claude's discretion at plan time; 5-pattern fanout may benefit from a 20-line Mermaid decision aid if readability improves, but Phase 31 iOS 15 did not use Mermaid and shipped at 191 lines. Default: no Mermaid unless plan-phase research surfaces clear reader benefit.
- **Android CA Timing first-evaluation SLA documentation** — runbook 21 Cause C references "typical first-evaluation window" as a Microsoft Learn claim; exact SLA text may require last_verified marker. Plan-phase research verifies.
- **Phase 42 audit automation for confidence markers** — Phase 42 AEAUDIT-04 mechanical grep currently handles SafetyNet / supervision / deferred-shared-file checks; confidence marker grep (per D-22/D-23 regex) coverage could be added. Post-v1.4 tooling.

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 41` query not run at context-gather time. Phase 40 returned zero matches; Phase 41 expected to be similar given v1.4 roadmap discipline. Verify at plan time.

</deferred>

---

*Phase: 41-android-l2-investigation*
*Context gathered: 2026-04-23*
*Decision method: adversarial-review skill (Finder / Adversary / Referee scored pattern) — 16 primary candidate options + sub-variants across 4 gray areas; 106 flaws adjudicated with 17 Referee interpretation rulings; per-area winners 1D / 2B / 3B / 4A + sub-decisions Preamble(a) / USB-debug INCLUDE / command set(b) / SafetyNet callout(c); user confirmed "Adopt all 4 winners" before CONTEXT.md write. Full flaw trail in 41-DISCUSSION-LOG.md.*
