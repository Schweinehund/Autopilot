# Phase 40: Android L1 Triage & Runbooks - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Method:** Adversarial review (Finder/Adversary/Referee scored pattern) across 16 candidate options in 4 gray areas. Per-area winners: 1D / 2A / 3A / 4A. Weighted score = 5×CRIT + 2×MED + 1×LOW (post-Referee).

<domain>
## Phase Boundary

Phase 40 delivers Android L1 Service Desk content that lets an L1 agent triage and either resolve (portal-only) or escalate (detect-and-escalate packet) any Android enrollment / compliance symptom. Three artifact classes:

1. **`docs/decision-trees/08-android-triage.md`** — mode-first triage tree routing to one of 6 runbooks or to L2 escalation. ROADMAP SC #1 mandate: mode (Fully managed / Work profile / Dedicated / ZTE / AOSP) BEFORE symptom.
2. **Six new L1 runbooks** in `docs/l1-runbooks/` numbered 22-27 with `android-` filename prefix:
   - `22-android-enrollment-blocked.md` (AEL1-02) — enrollment restriction / "device cannot enroll"
   - `23-android-work-profile-not-created.md` (AEL1-03) — BYOD work-profile container creation failure
   - `24-android-device-not-enrolled.md` (AEL1-04) — generic "device never appeared in Intune"
   - `25-android-compliance-blocked.md` (AEL1-05) — compliance / CA access-blocked (multi-cause)
   - `26-android-mgp-app-not-installed.md` (AEL1-06) — Managed Google Play app delivery failure
   - `27-android-zte-enrollment-failed.md` (AEL1-07) — Zero-Touch enrollment failure (multi-cause)
3. **Append-only edits** to three existing files:
   - `docs/l1-runbooks/00-index.md` — append new "## Android L1 Runbooks" H2 section; **zero modifications** to Windows / APv2 / macOS / iOS sections (AEL1-08; PITFALL 11)
   - `docs/decision-trees/00-initial-triage.md` — add Android banner + Scenario Trees list entry + See Also footer entry (Phase 30 D-04 banner-only pattern); **no Mermaid-graph modification** (Phase 30 D-05)
   - Three Android admin files (`03-fully-managed-cobo.md`, `04-byod-work-profile.md`, `05-dedicated-devices.md`) — resolve 6 text instances of the "Phase 40 runbooks (when shipped)" forward-promise (Phase 30 D-16 retrofit contract); bump `last_verified`; add Version History row

Phase 40 does NOT own:

- **L2 investigation content** (log-collection guide + 3 investigation runbooks) — Phase 41 scope per ROADMAP and AEL2-01..AEL2-05
- **AOSP L1 content** — explicit deferral per Phase 39 AEAOSP-01 scope guard and PITFALL 12; triage tree routes AOSP tickets to explicit L2 escalation with "out of scope in v1.4" note
- **`docs/index.md` Android stub** — Phase 42 AEAUDIT-02 scope
- **Android capability matrix** — Phase 42 AEAUDIT-01 scope
- **`_glossary-macos.md` see-also cross-reference** — Phase 42 AEAUDIT-03 scope
- **Milestone mechanical audit** — Phase 42 AEAUDIT-04 scope (including SafetyNet grep, supervision grep, AOSP scope-guard verification)
- **Cross-platform nav integration** (backport Android into `docs/common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, full index.md) — post-v1.4 unification task per PROJECT.md Key Decisions
- **MAM-WE-specific or Knox-specific L1 runbooks** — deferred to v1.4.1 (Knox) or left as existing deferrals

Carrying forward from earlier phases (LOCKED — do NOT re-open):

- **Phase 30 D-02** — Triage tree structural template: Mermaid graph → Routing Verification table → How to Check table → Escalation Data table → Related Resources footer
- **Phase 30 D-03** — No network-reachability gate at root (redundant with path-specific runbook steps)
- **Phase 30 D-10** — Runbooks use **sectioned H2 actor-boundary format**: `## Symptom` / `## L1 Triage Steps` / `## Admin Action Required` / (optional) `## User Action Required` / `## Escalation Criteria`. ROADMAP SC #3 mandates D-10.
- **Phase 30 D-12** — "Admin Action Required" section is the **three-part escalation packet**: (1) Ask the admin to / (2) Verify / (3) If the admin confirms none of the above applies. ROADMAP SC #2 mandates D-12.
- **Phase 30 D-11** — "Symptom" section opens with 1-3 concrete indicators and links back to the triage-tree entry node
- **Phase 30 D-13** — "User Action Required" section appears **only** where genuine user device-side action contributes; OMITTED entirely when not applicable (no "N/A" filler). Likely only runbook 25 carries this section.
- **Phase 30 D-14** — "Say to the user" callouts used **sparingly** for status communication only (tenant-config failures = admin-only fix; L1 doesn't script pseudo-remediation for the user)
- **Phase 30 D-15** — "Escalation Criteria" mirrors macOS/iOS precedent format: "Escalate to [L2 | Intune Admin | Infrastructure/Network] if:" followed by bullet conditions + "Before escalating, collect:" data checklist
- **Phase 30 D-21** — Runbook filename convention: `l1-runbooks/` directory, sequential numbering starting at **22** (continuing 16-21 iOS), `android-` prefix
- **Phase 30 D-26** — Platform-gate banner at top of each runbook: `> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).`
- **Phase 34 D-04** — Android mode labels: "Fully managed (COBO)" / "Work profile (BYOD)" / "Dedicated (COSU)" / "ZTE" / "AOSP". **NEVER use "supervision" as an Android management term** (AEAUDIT-04 hard rule)
- **Phase 34 D-10** — Cross-platform callouts use `> **Cross-platform note:** ...` pattern; tri-portal shorthand "Intune admin center / Managed Google Play (MGP) / Zero-Touch portal (ZT portal)"
- **Phase 34 D-14** — `last_verified` + `review_by` frontmatter with **60-day review cycle** (fast-moving platform)
- **Phase 34 D-26** — Anti-Pattern 1: canonical matrices live in `02-provisioning-methods.md` and `03-android-version-matrix.md`; runbooks reference, never duplicate
- **Phase 36 D-13 / Phase 37 D-15 / Phase 38 D-18 / Phase 39 D-16** — `applies_to:` frontmatter is **single-string** (never array); schema stable
- **Phase 37 D-10/D-11** — Source-confidence marker regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` for MEDIUM/LOW assertions that cannot be sourced against Microsoft Learn or Google canonical docs
- **Phase 39 D-17 anchor stability** — Runbook 27 cross-links to Phase 39 shipped anchors `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#kme-zt-device-claim`, `#configuration-must-be-assigned` in `docs/admin-setup-android/02-zero-touch-portal.md`; these anchors are LOCKED
- **AEAUDIT-04 hard rules** — `last_verified` frontmatter mandatory; zero "SafetyNet" references (Play Integrity only per Phase 34 canonical terminology; SafetyNet deprecated January 2025); zero "supervision" as Android term; no Android links in deferred shared files (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`)
- **PITFALL 9 / PITFALL 11 shared-file guard** — zero modifications to v1.0-v1.3 shared files outside the three explicitly-listed append-only targets (00-index.md, 00-initial-triage.md, and the 3 Android admin files whose forward-promises this phase resolves). Specifically: do NOT modify `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/end-user-guides/`, or `docs/l2-runbooks/`.

Research flags to verify at plan/execute time (from STATE.md + adversarial review):

- **Current Intune admin center Android Enrollment Restrictions navigation** — portal UI has reorganized; verify path (Devices > Enrollment > Enrollment restrictions, or current equivalent) before finalizing runbook 22 admin-action wording. MEDIUM-confidence marker on any portal-step specifics not re-sourced at execute time.
- **Android compliance policy state strings** — verify current Intune naming for "Not compliant" vs "Not evaluated" default posture behavior; runbook 25 Cause C language depends on these strings matching current UI.
- **Play Integrity verdict level naming in Intune** — verify current label text for "Basic integrity / Basic + Device integrity / Strong integrity (hardware-backed)" tiers matches the Phase 34 `_glossary-android.md` canonical terms at execute time.
- **Zero-Touch portal device-claim UI** — inherited from Phase 39 research flag; runbook 27 Cause A-D language depends on current ZT portal navigation matching Phase 39 shipped content. `<!-- verify UI at execute time -->` HTML comments on any portal-step specifics per Phase 39 pattern.
- **Managed Google Play app status labels** — runbook 26 references "license assigned / not licensed / pending approval / approval required" style states; verify current MGP portal language at execute time.
- **Samsung Knox Mobile Enrollment interaction with ZTE** — runbook 27 Cause D mirrors Phase 35 D-20 / Phase 39 D-06 mutual-exclusion; confirm language parity at execute time.

</domain>

<decisions>
## Implementation Decisions

### Triage Tree Root Structure (AEL1-01 / 08-android-triage.md) — GA1 winner: 1D

- **D-01:** **Mode-first root diamond with 6 labeled options (compound mode+ownership plain-language gate).** Root Mermaid diamond asks: **"What type of Android enrollment does this device use?"** Six branches using Phase 34 D-04 canonical labels with parenthetical plain-language disambiguators for L1 ticket-language matching:
  1. "Personal phone, work profile (BYOD)"
  2. "Corporate phone, fully managed (COBO)"
  3. "Kiosk or single-purpose device (Dedicated / COSU)"
  4. "Corporate Zero-Touch enrolled (ZTE)"
  5. "Specialty hardware (AOSP)"
  6. "Don't know / Can't tell"

  Each non-AOSP / non-Unknown branch leads to a second diamond asking the primary symptom, routing to 1 of runbooks 22-27 or to L2 escalation. Structural template per Phase 30 D-02: Mermaid graph → Routing Verification table → How to Check table → Escalation Data table → Related Resources. No network gate at root (Phase 30 D-03). Platform-gate banner per Phase 30 D-26 adapted for Android.

  *Winner of GA1 adversarial review (1D: 0 CRIT / 1 MED / 2 LOW = weighted 4) over 1A (0/2/2 = 4; lost tiebreak 2 on Phase 34 D-01/D-04 alignment), 1C (2 CRIT = 13; directly violates ROADMAP SC #1 "mode BEFORE symptom"), and 1B (2 CRIT = 15; 2-axis ownership-first inverts SC #1 and breaks on corporate work-profile cases).*

- **D-02:** **Mermaid node ID prefix `AND`.** Root: `AND1`. Symptom sub-diamonds per mode branch: `AND2` / `AND3` / `AND4` / `AND5` / `AND6`. Resolved (green) terminal nodes: `ANDR22` / `ANDR23` / `ANDR24` / `ANDR25` / `ANDR26` / `ANDR27` (matched to runbook numbers for scan-ability). Escalate-to-L2 (red) terminal nodes: `ANDE1` (AOSP-out-of-scope), `ANDE2` (unknown-mode), `ANDE3` (unclear-symptom within a GMS mode), additional `ANDEn` as needed per path. Grep-verified: no collision with existing `TRD*` (Windows), `MAC*` (macOS), `IOS*` (iOS) prefixes. 4-char prefix convention matches Phase 30 D-02.

- **D-03:** **AOSP branch terminal node `ANDE1` (explicit L2 out-of-scope escalation).** Node text: "Escalate L2 — AOSP L1 troubleshooting is out of scope in v1.4 (see [AOSP stub](../admin-setup-android/06-aosp-stub.md)). Collect device OEM / model, serial, ticket context, and route to L2." Anchors Phase 39 PITFALL 12 / AEAOSP-01 scope-guard at the L1 entry point; prevents L1 fabricating AOSP steps.

- **D-04:** **"Don't know / Can't tell" escape-hatch terminal node `ANDE2`.** Node text: "Collect device serial + user UPN + lock-screen / Settings screenshots + last-known management app name (Company Portal vs Microsoft Intune app); escalate to L2 for mode identification." Addresses real L1 ticket pattern where end users cannot self-describe enrollment mode. Mirrors Phase 30 iOS `IOSE1` "Other / unclear" pattern.

- **D-05:** **Node-budget compliance — 2 decision steps from root to any terminal.** Mode gate (root) → symptom diamond (per-mode) → runbook or escalate terminal. Matches Phase 30 iOS "within 2 decision steps" budget verbatim. ROADMAP SC #1 "within 5 decision nodes" is comfortably satisfied. Routing Verification table in `08-android-triage.md` enumerates all ~12-14 paths with their Step 1 / Step 2 / Destination columns (Phase 30 iOS-triage precedent format).

- **D-06:** **Mode-label canonical discipline.** Mermaid branch labels use Phase 34 D-04 canonical labels verbatim ("Fully managed", "Work profile", "Dedicated (COSU)", "ZTE", "AOSP") — the plain-language parentheticals in D-01 are L1 ticket-matching disambiguators only. Runbook body text, cross-references, and admin-action language use canonical labels only. Zero "supervision" as an Android management term in any Phase 40 artifact (AEAUDIT-04 hard rule).

### Runbook-to-Mode Scope Matrix (AEL1-02..AEL1-07) — GA2 winner: 2A

- **D-07:** **Runbook 22 (enrollment blocked) frontmatter `applies_to: all`.** Enrollment restrictions blade applies across all GMS modes (COBO / BYOD / Dedicated / ZTE); AOSP exclusion is enforced at the triage tree (AOSP branch never routes to runbook 22). Mirrors Phase 30 iOS runbook 16/21 `applies_to: all` precedent.

- **D-08:** **Runbook 23 (work profile not created) frontmatter `applies_to: BYOD`.** Work profile container is BYOD-exclusive in v1.4 scope (COPE deferred per PROJECT.md Key Decisions; Dedicated and COBO have no work profile). Mirrors Phase 30 iOS runbook 17 `applies_to: ADE` mode-specific narrow scoping.

- **D-09:** **Runbook 24 (device not enrolled) frontmatter `applies_to: all`.** Generic "device doesn't appear in Intune" spans all GMS modes; triage tree mode-first gate is responsible for routing, runbook 24 is the catch-all leaf for non-22 / non-27 enrollment-failure cases.

- **D-10:** **Runbook 25 (compliance blocked) frontmatter `applies_to: all`.** Compliance / Conditional Access failures apply across all modes including ZTE post-enrollment. ZTE enrollment-failure routes to 27; ZTE post-enrollment compliance routes to 25.

- **D-11:** **Runbook 26 (Managed Google Play app not installed) frontmatter `applies_to: all`.** MGP app delivery affects all GMS modes; AOSP exclusion enforced at triage tree (AOSP doesn't use MGP).

- **D-12:** **Runbook 27 (ZTE enrollment failed) frontmatter `applies_to: ZTE`.** Zero-Touch-specific enrollment failure; mirrors Phase 39 D-16 ZTE frontmatter convention and Phase 30 iOS runbook 17 ADE-specific narrow-scoping precedent.

- **D-13:** **Triage tree 22-vs-24 disambiguation sub-question.** Within any GMS mode branch (COBO / BYOD / Dedicated / ZTE post-enrollment attempt), the symptom sub-diamond includes an explicit disambiguator with plain-English aliases for L1 ticket matching: **"Did the user (or the enrollment flow) see a visible 'enrollment blocked' / 'enrollment restriction' / 'this device cannot enroll' error message, OR does the Intune admin center Enrollment Restrictions blade show the device's platform/ownership as Blocked?"** — YES → `ANDR22` (runbook 22); NO (device simply never appeared, no restriction-specific error) → `ANDR24` (runbook 24).

- **D-14:** **Triage tree 23-vs-24 disambiguation sub-question (BYOD branch only).** Within the BYOD branch, insert: **"Did the device successfully enroll (device visible in Intune admin center > Devices > Android) but the user reports no work profile / no Work badge / work apps never installed?"** — YES → `ANDR23` (runbook 23, enrollment succeeded but container-creation failed); NO (device never appeared in Intune at all) → `ANDR24` (runbook 24). Both runbooks' Related Resources footers explicitly document the visibility-based disambiguation: "23 = device visible in Intune but work profile missing; 24 = device not visible in Intune". Mirrors Phase 30 iOS runbook 18 vs 20 disambiguation callout pattern.

- **D-15:** **No mode-scope body callout. Frontmatter is single source of truth.** Do NOT add an "## Applies to" or "## Mode scope" body callout in any runbook — the `applies_to:` frontmatter per D-07..D-12 is authoritative. Adding a body callout would duplicate the frontmatter decision and create drift risk (Phase 34 D-26 Anti-Pattern 1 logic). The platform-gate banner at runbook top (Phase 30 D-26 adapted) is the only scope-signal in the runbook body.

### Multi-Cause Runbook Structure (Runbooks 25, 27) — GA3 winner: 3A

- **D-16:** **Runbook 25 (compliance blocked) structure — sub-H2 per cause + "How to Use This Runbook" mini-nav.** Phase 30 D-28 iOS runbook 21 pattern verbatim. Four causes:
  1. `## Cause A: Play Integrity Verdict Failure` — device fails Basic integrity / Basic + Device integrity / Strong integrity check per policy minimum
  2. `## Cause B: OS Version Policy Mismatch` — device below minimum Android version per compliance policy
  3. `## Cause C: CA Timing Gap (First Compliance Evaluation Pending)` — first post-enrollment compliance evaluation not yet completed; Android CA-timing analog of iOS Phase 28 D-11 CA-gap pattern
  4. `## Cause D: Passcode / Encryption / Work Profile Security Policy Mismatch` — standard compliance gates (passcode complexity, encryption posture, work-profile-specific password)

  Each cause carries its own Entry Condition / Symptom / L1 Triage Steps / Admin Action Required / (optional) User Action Required sub-structure. Top-of-runbook "## How to Use This Runbook" sub-nav lists the 4 causes with entry-condition one-liners (macOS runbook 11 line 22-27 template). Overall `## Escalation Criteria` H2 at bottom aggregates cross-cause escalation (Phase 30 D-15).

- **D-17:** **Runbook 25 Cause A language — Play Integrity canonical only.** Use Phase 34 `_glossary-android.md` canonical terminology: **"Play Integrity verdict"** with the three-tier ladder **"Basic integrity / Basic + Device integrity / Strong integrity (hardware-backed)"**. Failing-verdict phrasing: "Play Integrity verdict below policy minimum". **NEVER "SafetyNet" in any runbook — SafetyNet deprecated by Google January 2025; AEAUDIT-04 violation = CRIT.** Cause A opens with glossary cross-link: `> See [Play Integrity](../_glossary-android.md#play-integrity) for the attestation mechanism Android uses (SafetyNet is NOT used — deprecated January 2025).`

- **D-18:** **Runbook 27 (ZTE enrollment failed) structure — sub-H2 per cause + "How to Use This Runbook" mini-nav.** Four L1-diagnosable causes:
  1. `## Cause A: Device Not Uploaded by Reseller` — device serial never arrived in the customer's Zero-Touch portal device pool
  2. `## Cause B: Configuration Not Assigned to Device Set` — device uploaded and claimed, but no configuration profile assigned; devices fall through to consumer setup (Phase 39 D-03 "configuration must be assigned" pitfall)
  3. `## Cause C: ZT ↔ Intune Linking Broken` — token linking between Zero-Touch portal and Intune is broken (Phase 35 D-21 Method A/B token)
  4. `## Cause D: KME/ZT Mutual-Exclusion Conflict (Samsung)` — Samsung device also registered in Knox Mobile Enrollment; KME takes precedence (Phase 35 D-20 / Phase 39 D-06 mutual-exclusion rule)

  **Cause E "DPC extras JSON invalid" is NOT an L1-actionable cause** — admin-config failure only; mentioned in the `## Escalation Criteria` section at bottom as "If all Cause A-D checks pass but devices still fail at enrollment, escalate to Intune admin for DPC-extras JSON review (see [DPC Extras JSON](../admin-setup-android/02-zero-touch-portal.md#dpc-extras-json))". L1 never modifies JSON.

  Cross-link targets are the LOCKED Phase 39 D-17 anchors in `02-zero-touch-portal.md`: `#reseller-upload-handoff` (Cause A), `#device-claim-workflow` (Cause A-B boundary), `#profile-assignment` and `#configuration-must-be-assigned` (Cause B), `#kme-zt-device-claim` (Cause D). `<!-- verify UI at execute time -->` HTML comments on any ZT portal click-path specifics per Phase 39 discipline.

- **D-19:** **Runbook 27 "How to Use This Runbook" nav cause ordering.** Present causes in frequency-descending order per Phase 39 STACK.md SPARSE DOC FLAG and PITFALL 4 analysis: A (reseller upload — most frequent per Google canonical source) → B (configuration not assigned — Phase 39 D-03 explicit pitfall) → C (ZT↔Intune linking — Phase 35 boundary) → D (KME/ZT conflict — Samsung-only, narrowest scope). **Ordering is presentation-only — causes are independently enterable.** L1 jumps to whichever cause matches observation; they do not rule out prior causes sequentially. Make this explicit in the nav header: "Check the cause that matches your observation. Causes are independently diagnosable — you do not need to rule out prior causes."

- **D-20:** **SafetyNet prohibition — Phase 42 milestone audit anchor.** Phase 42 AEAUDIT-04 must grep runbooks 25 and 27 (and the entire `docs/l1-runbooks/` tree for Android runbooks) for zero case-insensitive occurrences of `safetynet`. Any occurrence = CRIT audit failure. This decision exists in CONTEXT.md explicitly so the planner, executor, reviewer, and Phase 42 auditor all have the same anchor. Only exception: `_glossary-android.md` may mention SafetyNet in a "deprecated since January 2025 — do not use" note (Phase 34 D-11 authorized).

### Cross-File Touch Scope — GA4 winner: 4A

- **D-21:** **Retrofit scope — exact enumeration of 6 forward-promise text instances across 3 admin files.** Verified by grep:
  - `docs/admin-setup-android/03-fully-managed-cobo.md` — 2 instances:
    - Line ~20: "COBO L1 runbook (Phase 40)" style reference → resolve to concrete link `[Android L1 Runbooks: COBO-applicable runbooks](../l1-runbooks/00-index.md#android-l1-runbooks)` plus direct links to runbooks 22 / 24 / 25 / 26 as relevant
    - Line ~22: "Phase 40 and Phase 41 runbooks" → split: Phase 40 runbooks resolve to `../l1-runbooks/00-index.md#android-l1-runbooks` with direct links; Phase 41 reference stays as Phase 41 placeholder (Phase 41 contract)
  - `docs/admin-setup-android/04-byod-work-profile.md` — 1 instance:
    - Line ~19: "Phase 40 and Phase 41 runbooks" → split: Phase 40 resolves to direct links to runbooks 22 / 23 / 24 / 25 / 26 as BYOD-relevant; Phase 41 stays placeholder
  - `docs/admin-setup-android/05-dedicated-devices.md` — 3 instances:
    - Line ~20: "Phase 40 and Phase 41 runbooks" → split as above; Phase 40 resolves to 22 / 24 / 25 / 26 as Dedicated-relevant plus explicit note that runbook 23 (work profile) is NOT Dedicated-applicable
    - Line ~265: "v1.4 Phase 40 triage tree boundary" → resolve to `../decision-trees/08-android-triage.md` (the boundary section) with direct link
    - Line ~267: "Phase 40 Android triage tree (when shipped)" → resolve to `../decision-trees/08-android-triage.md` direct link and update surrounding prose ("when shipped" removed)

  **Plan-phase MUST produce a complete row-by-row enumeration in PLAN.md before execution — no bulk sed / find-replace.** Per-row judgment on which runbooks each admin file should link to given that file's mode-scope. Phase 30 D-17 precedent.

- **D-22:** **Retrofit commit grouping — ONE atomic commit.** Commit message: `docs(40): resolve Android L1 runbook placeholders in admin-setup-android`. Do NOT fold into per-runbook commits. Phase 30 D-20 pattern — keeps the cross-phase-contract fulfillment traceable as a single audit row.

- **D-23:** **`docs/decision-trees/00-initial-triage.md` banner integration (Phase 30 D-04 pattern).** Insert new line immediately after the iOS banner (which was Phase 30's line 10 insertion):
  ```
  > **Android:** For Android enrollment/compliance troubleshooting, see [Android Triage](08-android-triage.md).
  ```
  **Do NOT modify the Mermaid graph** (Phase 30 D-05). **Keep `applies_to: APv1` in frontmatter unchanged** — banner-only integration does not expand scope-of-applicability. Bump `last_verified` in frontmatter to Phase 40 ship date.

- **D-24:** **`docs/decision-trees/00-initial-triage.md` Scenario Trees list + See Also footer entries.** Append below the iOS entry in the `## Scenario Trees` list:
  ```
  - [Android Triage](08-android-triage.md) — Android enrollment/compliance failure routing
  ```
  Append matching entry in `## See Also` footer:
  ```
  - [Android Triage](08-android-triage.md) -- Android enrollment/compliance triage
  ```
  Add 1-row entry to the file's `## Version History` table: `| <Phase-40-ship-date> | Added Android banner + triage link | -- |`.

- **D-25:** **L2 placeholder convention for runbooks 22-27 Escalation Criteria sections.** Exact wording pattern (to be used in every runbook's `## Escalation Criteria` intro line):
  > Escalate to L2 (or to the Intune admin directly if not already done). Android L2 investigation runbooks (Phase 41) will live in `docs/l2-runbooks/` — use the L2 runbook index once Phase 41 ships.

  Establishes **"Android L2 runbooks (Phase 41)"** as a new forward-promise placeholder category for Phase 41 to resolve atomically (Phase 30 Deferred Ideas pattern — iOS runbooks shipped with "iOS L2 runbooks (Phase 31)" placeholders that Phase 31 then resolved).

- **D-26:** **`last_verified` bump on retrofitted admin files.** All three Android admin files (`03-fully-managed-cobo.md`, `04-byod-work-profile.md`, `05-dedicated-devices.md`) get `last_verified` frontmatter bumped to the Phase 40 ship date. `review_by` recalculated as `last_verified + 60 days` per Phase 34 D-14 60-day review cycle. Phase 30 D-19 pattern.

- **D-27:** **Version History entries on retrofitted admin files.** Each of the 3 admin files gets a single-row append to its existing `## Version History` table:
  ```
  | <Phase-40-ship-date> | Resolved Android L1 runbook cross-references | -- |
  ```
  Phase 30 D-19 exact wording pattern. Consistent audit trail across all retrofit files.

### Claude's Discretion

- Exact Mermaid styling within D-02 node-ID convention (stroke colors, classDef syntax) — constrained to match Phase 30 iOS triage pattern
- Exact symptom sub-diamond wording within D-13 / D-14 plain-English alias list — may add 1-2 additional aliases if research surfaces more common ticket phrases
- Whether runbook 25 "How to Use This Runbook" nav uses a bulleted list or a compact decision tree (Phase 30 D-28 left exact format to Claude's discretion)
- Exact runbook length within the sibling norms — 22 / 24 / 26 target ~100-140 lines (single-cause); 23 target ~120-160 lines (BYOD-specific with slightly broader scope); 25 target ~200-240 lines (4 causes); 27 target ~180-220 lines (4 causes + Cause E escalate-only)
- Exact "Say to the user" wording per runbook (Phase 30 D-14 restrains application to status-communication; exact wording is Claude's discretion within that constraint)
- Cross-link ordering and "Related Resources" section content at each runbook's bottom
- Mermaid click-directive URLs to runbooks (relative path pattern locked to `../l1-runbooks/<filename>`)
- Whether to include a sibling "TPM Attestation Note" style advisory in the Android index section (e.g., "No L1 runbook for AOSP failures — escalate to L2") — recommended per D-03, exact placement is author's call

### Folded Todos

None — `gsd-tools todo match-phase 40` returned zero matches at context-gather time.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer, Phase 42 auditor) MUST read these before planning or implementing.**

### Requirements and Roadmap
- `.planning/ROADMAP.md` — Phase 40 entry lines 191-202 with goal, dependencies (Phases 36/37/38/39), and 5 success criteria (SC #1 mode-first, SC #2 per-runbook structure, SC #3 D-10/D-12 actor-boundary + escalation packet, SC #4 append-only 00-index.md, SC #5 `last_verified` frontmatter + cross-phase anchor stability)
- `.planning/REQUIREMENTS.md` — AEL1-01 (triage tree) through AEL1-08 (L1 index append) with traceability table
- `.planning/PROJECT.md` — v1.4 scope decisions; COPE deferral (runbook 23 BYOD-exclusive scope); KME v1.4.1 deferral (runbook 27 Cause D Samsung-only); AOSP v1.4.1 full coverage deferral (runbook scope guard at D-03 ANDE1)
- `.planning/STATE.md` — current milestone state and research flags (Phase 40 inherits ZT portal UI, AOSP OEM matrix, adb diagnostic commands flags)

### Structural Precedents (PRIMARY templates)
- `.planning/milestones/v1.3-phases/30-ios-l1-triage-runbooks/30-CONTEXT.md` — **iOS Phase 30 PRIMARY structural precedent.** D-02 triage-tree structural template, D-03 no-network-gate, D-04 banner-only integration, D-05 no-Mermaid-modification, D-10 sectioned actor-boundary format, D-11 Symptom section pattern, D-12 three-part escalation packet, D-13 User Action Required optional, D-14 "Say to the user" restraint, D-15 Escalation Criteria format, D-16..D-20 atomic placeholder retrofit, D-21 filename convention, D-25 per-runbook applies_to pattern, D-26 platform-gate banner, D-28 multi-cause sub-H2 runbook structure
- `docs/decision-trees/07-ios-triage.md` — **PRIMARY Mermaid template for 08-android-triage.md.** Two-axis root (visibility + symptom), green/red classDef, `click` directives, Routing Verification table, How to Check table, Escalation Data table, Related Resources footer
- `docs/decision-trees/06-macos-triage.md` — secondary Mermaid template (macOS MAC1→MAC2/MAC3 pattern) for structural reference
- `docs/decision-trees/00-initial-triage.md` — integration target for D-23/D-24 banner + Scenario Trees list + See Also footer; macOS banner at line 9 is the established pattern; Phase 30 iOS banner likely at line 10 (verify at execute time)
- `docs/l1-runbooks/16-ios-apns-expired.md` — PRIMARY structural template for single-cause tenant-config runbook with D-10 sectioned format; line 9 platform-gate banner precedent
- `docs/l1-runbooks/17-ios-ade-not-starting.md` through `20-ios-device-cap-reached.md` — additional single-cause sibling templates
- `docs/l1-runbooks/21-ios-compliance-blocked.md` — **PRIMARY template for runbook 25 and runbook 27 multi-cause structure** (Phase 30 D-28 sub-H2 per cause + "How to Use This Runbook" mini-nav)
- `docs/l1-runbooks/11-macos-setup-assistant-failed.md` — secondary multi-symptom H2 template (Phase 30 D-28 citation; macOS precedent that informed iOS 21 which informs Android 25/27)
- `docs/l1-runbooks/00-index.md` — sectioning pattern (APv1 lines 15-23, APv2 lines 25-34, macOS ADE lines 36-47, iOS lines 49-62); D-27 appends new "## Android L1 Runbooks" H2 after iOS section; zero modifications to existing sections per AEL1-08

### Phase 34-39 Android Foundations (LOCKED decisions)
- `.planning/phases/34-android-foundation/34-CONTEXT.md` — D-01 (5-column enrollment overview comparison table informs triage-tree mode labeling), D-04 (canonical mode labels — Fully managed / Work profile / Dedicated (COSU) / ZTE / AOSP; never "supervision"), D-10 (cross-platform callout pattern, tri-portal shorthand), D-14 (60-day review cycle for Android), D-23 (provisioning-matrix orientation — mode rows), D-26 (Anti-Pattern 1 canonical-matrix discipline)
- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-CONTEXT.md` — D-20 (KME/ZT Samsung mutual exclusion — runbook 27 Cause D cross-reference), D-21 (ZT↔Intune linking Method A/B — runbook 27 Cause C context), D-22 split contract (do not violate Phase 35-owned anchors when runbook 27 cross-links)
- `.planning/phases/36-fully-managed-cobo-admin/36-CONTEXT.md` — D-13 (single-string `applies_to` convention — informs D-07..D-12); COBO anchor stability for runbook 22 / 24 / 25 / 26 cross-references
- `.planning/phases/37-byod-work-profile-admin-end-user/37-CONTEXT.md` — D-10/D-11 source-confidence marker regex (used by runbooks for MEDIUM/LOW-confidence assertions), D-15 (single-string `applies_to` convention); BYOD admin guide anchor stability for runbook 22 / 23 / 24 / 25 / 26 cross-references
- `.planning/phases/38-dedicated-devices-admin/38-CONTEXT.md` — D-18 (single-string `applies_to` convention); Dedicated anchor stability for runbook 22 / 24 / 25 / 26 cross-references
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-CONTEXT.md` — **D-17 anchor stability contract** (`#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#kme-zt-device-claim`, `#configuration-must-be-assigned` in `02-zero-touch-portal.md`; `06-aosp-stub.md` anchors) — runbook 27 D-18 LOCKED cross-links; Phase 39 D-03 "configuration must be assigned" pitfall (runbook 27 Cause B source); Phase 39 AEAOSP-01 scope guard (runbook triage tree AOSP-out-of-scope at D-03 ANDE1); Phase 39 D-17 `<!-- verify UI at execute time -->` pattern for ZT portal UI specifics

### Android Admin-Guide Cross-Reference Targets (for runbook deep-links)
- `docs/admin-setup-android/00-overview.md` — admin setup overview with tri-portal sequence
- `docs/admin-setup-android/01-managed-google-play.md` — MGP binding (runbook 26 primary cross-reference)
- `docs/admin-setup-android/02-zero-touch-portal.md` — ZT portal + Phase 39-appended Corporate-Scale Operations section (runbook 27 primary cross-reference; all Phase 39 D-17 anchors)
- `docs/admin-setup-android/03-fully-managed-cobo.md` — COBO (runbook 22/24/25/26 cross-reference; D-21 retrofit target — 2 forward-promise text instances)
- `docs/admin-setup-android/04-byod-work-profile.md` — BYOD admin (runbook 22/23/24/25/26 cross-reference; D-21 retrofit target — 1 forward-promise text instance)
- `docs/admin-setup-android/05-dedicated-devices.md` — Dedicated admin (runbook 22/24/25/26 cross-reference; D-21 retrofit target — 3 forward-promise text instances)
- `docs/admin-setup-android/06-aosp-stub.md` — AOSP stub (runbook triage tree D-03 ANDE1 cross-reference; no runbooks actually route here)
- `docs/android-lifecycle/00-enrollment-overview.md` — ownership × management-scope concept anchors for triage-tree labeling
- `docs/android-lifecycle/02-provisioning-methods.md` — canonical provisioning matrix (Anti-Pattern 1 guard; runbooks reference, never duplicate)
- `docs/android-lifecycle/03-android-version-matrix.md` — canonical version matrix (runbook 25 Cause B OS-version policy cross-reference)
- `docs/_glossary-android.md` — **canonical Android terminology source**. Runbook 25 Cause A cross-links to `#play-integrity`; runbook 27 cross-links to `#zero-touch-enrollment`, `#dpc`; runbook 22/23/24/26 cross-link to `#work-profile`, `#fully-managed`, `#dedicated`, `#managed-google-play` as needed
- `docs/end-user-guides/android-work-profile-setup.md` — BYOD end-user self-service guide (runbook 23 may reference for "did the user complete the Company Portal steps?" L1 verification — but runbook 23 must not instruct the user directly; Phase 37 tier-inversion pattern applies)

### Templates and Conventions
- `docs/_templates/l1-template.md` — L1 template currently supports `platform: Windows | macOS | iOS | all` (Phase 30 D-24 extension). Phase 40 extends to `platform: Windows | macOS | iOS | Android | all`. One-line template edit per D-24 precedent.
- `docs/_templates/admin-template-android.md` — tri-portal admin template (not directly used by L1 runbooks but referenced for tri-portal shorthand convention and HTML-comment subtractive-deletion pattern)

### Requirements & Scope Boundaries
- `.planning/REQUIREMENTS.md` Future Requirements section — `AEKNOX-02` (Knox ME L1 runbooks v1.4.1) informs runbook 27 Cause D scope limit (Samsung-only, no KME-specific L1 path in v1.4); `AEAOSPFULL-03` (AOSP L1 runbooks v1.4.1) informs triage-tree D-03 AOSP-out-of-scope terminal
- `.planning/REQUIREMENTS.md` Out of Scope table — SafetyNet explicit exclusion (D-17 / D-20 audit anchor), Android DA legacy mode exclusion, Android TV / Auto / Wear OS exclusions (triage tree need not consider these)

### Adversarial Review Artifact
- `.planning/phases/40-android-l1-triage-runbooks/40-DISCUSSION-LOG.md` — full adversarial-review audit trail (4 gray areas × 3-4 candidate options; Finder / Adversary / Referee verdicts per flaw; per-area winners with scores)

### External Research Targets (for gsd-phase-researcher)
- Microsoft Learn — Intune Android enrollment restrictions blade (current UI for D-13 sub-question and runbook 22 admin-action wording)
- Microsoft Learn — Intune Android compliance policy configuration (current UI for runbook 25 Cause B/C/D admin-action wording)
- Microsoft Learn — Intune Android Play Integrity attestation settings (current UI for runbook 25 Cause A admin-action wording)
- Microsoft Learn — Managed Google Play app assignment and license management (current UI for runbook 26 admin-action wording)
- Microsoft Learn — Microsoft Intune app vs Company Portal for Android (runbook 23 BYOD post-AMAPI enrollment flow)
- Google Zero-Touch customer-portal help (`https://support.google.com/work/android/topic/9158960`) — runbook 27 Cause A/B/D source of truth; Phase 39 STACK.md SPARSE DOC FLAG applies
- Google Developers Zero-Touch known issues — runbook 27 Cause C (token-sync) context; MEDIUM-confidence source per Phase 37 D-10/D-11 marker regex

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from v1.0-v1.3 + Phase 34-39)

- **L1 template** (`docs/_templates/l1-template.md`) — one-line platform enum extension (`| Android`) per Phase 30 D-24 precedent. Frontmatter schema, section structure, "Say to the user" callout pattern reused verbatim.
- **Triage-tree Mermaid pattern** (`docs/decision-trees/07-ios-triage.md` and `06-macos-triage.md`) — Mermaid graph TD → branching diamonds → terminal rounded-rectangle resolved/escalate nodes → `click` directives for runbook deep-links → classDef styling (green fill for resolved, red fill for escalate). Directly applicable to `08-android-triage.md` with `AND` prefix substitution.
- **L1 runbook sectioned format** (all 21 existing Windows/macOS/iOS L1 runbooks) — Phase 30 D-10 sectioned actor-boundary format + Phase 30 D-12 three-part escalation packet are LOCKED. Reuse verbatim.
- **Platform-gate banner pattern** — all Windows/macOS/iOS L1 runbooks have a top-of-file platform-gate banner. Adapt for Android per D-06 canonical mode labels.
- **`docs/l1-runbooks/00-index.md` platform-section pattern** — four existing sections (APv1 / APv2 / macOS ADE / iOS). Append 5th "Android L1 Runbooks" H2 section after iOS per D-23 / AEL1-08.
- **"How to Use This Runbook" mini-nav** (macOS runbook 11 lines 22-27; iOS runbook 21) — multi-cause runbook sub-navigation template. Reuse verbatim for runbooks 25 and 27 per D-16 / D-18.
- **Phase 39 `<!-- verify UI at execute time -->` HTML-comment pattern** — runbook 27 inherits for any ZT portal click-path specifics (Phase 39 D-17 precedent). Syntactically distinct from Phase 34 D-17 `<!-- subsection intentionally omitted -->` subtractive-deletion pattern.
- **Phase 37 D-10/D-11 source-confidence marker regex** — `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` applies to any runbook assertion with MEDIUM/LOW confidence per D-20 discipline. Used in runbook 27 cross-links to Google canonical sources.
- **Glossary cross-link pattern** (`docs/_glossary-android.md` entries established in Phase 34) — `[term](../_glossary-android.md#term)` format; Phase 34 D-10 "Cross-platform note" callout pattern for terms that collide with Windows/macOS/iOS.

### Established Patterns

- **L1 is portal-only on Android**: no CLI / adb / PowerShell execution at L1 level; runbook format aligns naturally with Phase 30 D-07 detect-and-escalate scope
- **60-day review cycle** on all Phase 40 artifacts (Phase 34 D-14)
- **Frontmatter schema**: `last_verified: YYYY-MM-DD`, `review_by: last_verified + 60d`, `audience: L1`, `platform: Android`, `applies_to: <single-string>` per D-07..D-12
- **Cross-references use relative paths with section anchors** — e.g., `../admin-setup-android/02-zero-touch-portal.md#configuration-must-be-assigned` (Phase 39 D-17 LOCKED anchor)
- **Phase 28 D-22 / Phase 29 D-13 / Phase 30 D-16 forward-promise retrofit pattern** — placeholder text named by downstream phase; that phase is the resolution milestone; atomic commit for all retrofit edits

### Integration Points

- **8 new files**: `docs/decision-trees/08-android-triage.md` + `docs/l1-runbooks/22-android-enrollment-blocked.md` + `23-android-work-profile-not-created.md` + `24-android-device-not-enrolled.md` + `25-android-compliance-blocked.md` + `26-android-mgp-app-not-installed.md` + `27-android-zte-enrollment-failed.md`
- **4 file edits**:
  - `docs/_templates/l1-template.md` — one-line platform enum extension
  - `docs/l1-runbooks/00-index.md` — append Android L1 Runbooks section (zero mods to existing sections)
  - `docs/decision-trees/00-initial-triage.md` — banner + Scenario Trees list entry + See Also footer entry + `last_verified` bump + 1-row Version History (no Mermaid-graph mod)
  - *(3 admin files grouped as 1 retrofit commit per D-22, enumerated in D-21)*
- **3 admin-file retrofits**: `docs/admin-setup-android/03-fully-managed-cobo.md` + `04-byod-work-profile.md` + `05-dedicated-devices.md` — resolve 6 forward-promise text instances; bump `last_verified`; add Version History row
- **Cross-phase stable anchors required from Phase 40 artifacts** (consumed by Phase 41 L2 runbooks):
  - `08-android-triage.md` — `AND1` root node (for cross-reference from admin files and index)
  - `00-index.md#android-l1-runbooks` — anchor for the new section (used by D-21 retrofit links)
  - Each runbook's section anchors (`#symptom`, `#l1-triage-steps`, `#admin-action-required`, `#escalation-criteria`) — Phase 41 L2 runbooks may back-link to specific runbook sections
  - Runbook 25 cause anchors (`#cause-a-play-integrity-verdict-failure`, `#cause-b-os-version-policy-mismatch`, `#cause-c-ca-timing-gap`, `#cause-d-passcode-encryption-policy-mismatch`) — Phase 41 AEL2-04 compliance investigation may back-link
  - Runbook 27 cause anchors (`#cause-a-device-not-uploaded-by-reseller`, `#cause-b-configuration-not-assigned`, `#cause-c-zt-intune-linking-broken`, `#cause-d-kme-zt-mutual-exclusion-conflict`) — Phase 41 AEL2-02 enrollment investigation may back-link

- **NO modifications** (PITFALL 9/11 + AEAUDIT-04 hard rules):
  - `docs/index.md` (Phase 42 AEAUDIT-02 scope)
  - `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` (post-v1.4 unification task)
  - `docs/_glossary.md`, `docs/_glossary-macos.md` (Phase 42 AEAUDIT-03 scope for macOS see-also)
  - Any `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/admin-setup-apv2/` file
  - Any `docs/l2-runbooks/` file (Phase 41 scope)
  - Any `docs/end-user-guides/` file
  - Any `docs/_glossary-android.md` (Phase 34 owns; additions deferred to future phase or Phase 42 audit)

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence

- **Mode-first root rationale (D-01)**: The 1D winner adopts Phase 34 D-04 canonical labels while folding plain-language ticket-matching aids into parentheticals. This satisfies ROADMAP SC #1 "mode BEFORE symptom" without forcing L1 to learn mode taxonomy before handling tickets. The "Don't know / Can't tell" branch (D-04 ANDE2) is not weakness but realism — L1 commonly gets tickets where the end user cannot self-describe enrollment mode.
- **Visibility-first rejected explicitly (Phase 30 D-01 precedent does NOT apply here)**: ROADMAP SC #1 states "Android failure root causes differ fundamentally by mode" — this is a deliberate deviation FROM the iOS precedent, not an inheritance of it. Visibility questions become mode-dependent on Android (work-profile devices appear under Personal view; dedicated devices may not appear until kiosk provisioning completes) — asking visibility first creates false-negative triage.
- **Symptom sub-question wording (D-13, D-14)**: Plain-English aliases matter — L1 agents will receive tickets with user-reported phrases like "my phone won't connect to work" or "I got an error and can't enroll". The disambiguator must match multiple phrasings. Exact aliases may expand at research time if Microsoft Learn surface new canonical error strings; any additions carry MEDIUM-confidence marker until re-sourced.
- **Single-cause vs multi-cause runbook structure (D-16, D-18)**: Runbooks 22 / 23 / 24 / 26 are single-signature (one failure mode → one flow). Runbook 25 has 4 genuinely-independent causes (Play Integrity / OS / CA timing / passcode-encryption) — each diagnosable in isolation. Runbook 27 has 4 L1-diagnosable causes (reseller upload / config assignment / ZT-Intune linking / KME/ZT conflict) plus Cause E (DPC extras JSON) which is admin-escalate only. The sub-H2 structure for 25 and 27 is not "longer" for its own sake — it is required by the epistemic shape of the failure mode.
- **SafetyNet audit anchor placement (D-20)**: Explicit, repeated, inline. SafetyNet deprecation (January 2025) is a recurring risk vector because AI models trained before that date have SafetyNet embedded in their "how do I check Android compliance" pattern library. The AEAUDIT-04 grep must catch any drift.
- **Phase 39 anchor architecture drives Phase 40 runbook 27 structure**: The Phase 39 D-17 shipped anchors (`#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#kme-zt-device-claim`, `#configuration-must-be-assigned`) are the infrastructure that makes runbook 27's parallel-addressable Cause A-D structure work. The runbook does not invent sub-cause structure; it mirrors the anchor topology that Phase 39 already committed to.

### Runbook-Specific Length Targets and Notes

- **Runbook 22 (enrollment blocked)**: ~100-130 lines. Single-cause. Key cross-references: enrollment restrictions blade in Intune admin center; `04-byod-work-profile.md` and `03-fully-managed-cobo.md` admin-side enrollment-restriction config.
- **Runbook 23 (work profile not created)**: ~120-160 lines. BYOD-specific; may include a concise "did the user complete the Company Portal flow?" L1 verification (the end-user-guide flow is the pre-condition). Cross-link to `end-user-guides/android-work-profile-setup.md` for user-facing flow reference only — L1 does not instruct the user directly per Phase 37 tier-inversion.
- **Runbook 24 (device not enrolled)**: ~120-150 lines. The "catch-all" leaf. Key discriminator vs 22 is the visibility gate in the triage-tree (D-13); vs 23 is BYOD-only work-profile-creation gate (D-14). Cross-references to mode-specific admin guides (COBO / BYOD / Dedicated) plus prerequisites pages.
- **Runbook 25 (compliance blocked)**: ~200-240 lines. Four sub-H2 causes per D-16. "How to Use This Runbook" mini-nav at top. Play Integrity Cause A MUST use Phase 34 canonical terminology; zero SafetyNet references.
- **Runbook 26 (MGP app not installed)**: ~120-160 lines. Key checks: license assignment in Intune, app approval status in MGP portal, user-MGP-account binding. Single flow; no multi-cause structure.
- **Runbook 27 (ZTE enrollment failed)**: ~180-220 lines. Four sub-H2 L1-diagnosable causes per D-18 + Cause E escalate-only mention. "How to Use This Runbook" nav per D-19 cause ordering (reseller upload first). Phase 39 D-17 anchors are the cross-link topology.

### Triage Tree Tracking Table (for Routing Verification section in 08-android-triage.md)

Expected path enumeration (~12-14 paths) produced at plan time:

| Path | Step 1 (mode) | Step 2 (symptom) | Destination |
|------|---------------|------------------|-------------|
| BYOD enrollment blocked | Personal phone, work profile (BYOD) | Enrollment-restriction error visible | Runbook 22 |
| BYOD work profile failed | Personal phone, work profile (BYOD) | Device enrolled but work profile missing | Runbook 23 |
| BYOD device not enrolled | Personal phone, work profile (BYOD) | Device never appeared in Intune | Runbook 24 |
| BYOD compliance blocked | Personal phone, work profile (BYOD) | Non-compliant / access-blocked | Runbook 25 |
| BYOD MGP app missing | Personal phone, work profile (BYOD) | Expected work app not installed | Runbook 26 |
| COBO enrollment blocked | Corporate phone, fully managed (COBO) | Enrollment-restriction error visible | Runbook 22 |
| COBO device not enrolled | Corporate phone, fully managed (COBO) | Device never appeared in Intune | Runbook 24 |
| COBO compliance blocked | Corporate phone, fully managed (COBO) | Non-compliant / access-blocked | Runbook 25 |
| COBO MGP app missing | Corporate phone, fully managed (COBO) | Expected app not installed | Runbook 26 |
| Dedicated enrollment blocked | Kiosk or single-purpose (Dedicated/COSU) | Enrollment-restriction error visible | Runbook 22 |
| Dedicated device not enrolled | Kiosk or single-purpose (Dedicated/COSU) | Device never appeared in Intune | Runbook 24 |
| Dedicated compliance blocked | Kiosk or single-purpose (Dedicated/COSU) | Non-compliant / access-blocked | Runbook 25 |
| Dedicated MGP app missing | Kiosk or single-purpose (Dedicated/COSU) | Expected app not installed | Runbook 26 |
| ZTE enrollment failed | Corporate Zero-Touch enrolled (ZTE) | Enrollment never started or stalled | Runbook 27 |
| ZTE post-enrollment compliance | Corporate Zero-Touch enrolled (ZTE) | Non-compliant / access-blocked post-ZTE | Runbook 25 |
| AOSP all paths | Specialty hardware (AOSP) | — | Escalate ANDE1 (L2 out-of-scope v1.4) |
| Unknown mode | Don't know / Can't tell | — | Escalate ANDE2 (mode identification) |
| Other / unclear within GMS mode | Any GMS mode | Symptom doesn't match a runbook | Escalate ANDE3+ |

### Adversarial-Review Trail Preservation

`40-DISCUSSION-LOG.md` records the 16 candidate options + flaw IDs + Finder/Adversary/Referee verdicts for all 4 gray areas. Full trail is the auditable record of how decisions were derived. Do not summarize away.

</specifics>

<deferred>
## Deferred Ideas

- **AOSP L1 triage content** — explicit v1.4.1 deferral per PROJECT.md Key Decisions and Phase 39 AEAOSP-01 scope guard. Triage tree routes AOSP to `ANDE1` L2-out-of-scope terminal (D-03).
- **Knox Mobile Enrollment L1 runbook** — `AEKNOX-02` future requirement; v1.4.1 scope. Runbook 27 Cause D handles the KME/ZT *conflict* symptom only (the "Samsung device registered in both" pitfall); KME-specific enrollment flows remain out of scope.
- **MAM-WE-specific L1 runbooks** (PIN loop, app protection not applying, selective wipe failures) — `AEMAMWE-*` style future requirements; not in v1.4 scope (ROADMAP mentions MAM intersection at L2 level only via AEL2-03).
- **Android L2 investigation content** — Phase 41 scope. Runbooks 22-27 use D-25 "Android L2 runbooks (Phase 41)" placeholder convention; Phase 41 resolves these atomically.
- **`docs/index.md` Android H2 section** — Phase 42 AEAUDIT-02 scope (stub only in v1.4; full integration is post-v1.4 unification task).
- **Android capability matrix** — Phase 42 AEAUDIT-01 scope.
- **`docs/common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md` Android integration** — post-v1.4 unification task per PROJECT.md Key Decisions (backport regression risk against live v1.0-v1.3 shared files).
- **`_glossary-macos.md` Android see-also** — Phase 42 AEAUDIT-03 scope; Phase 34 D-15 flagged the deferred reciprocal cross-reference.
- **Glossary additions for Phase 40 L1 terminology** (enrollment restriction, device cap, Play Integrity verdict levels, DPC extras) — use inline first-occurrence plain text; Phase 34 `_glossary-android.md` already has canonical entries for Play Integrity, DPC, Zero-Touch Enrollment, Managed Google Play, work profile, fully managed, dedicated.
- **Mermaid diagram tooling for D-01 root** — Claude's discretion at plan time (styling / layout); 6-branch fanout is within Phase 30 iOS IOS2 6-branch precedent and will not exceed Mermaid graph TD readability.
- **Automated SafetyNet-absent CI check** — Phase 42 AEAUDIT-04 handles mechanically at milestone audit; a standalone CI check is post-v1.4 tooling milestone.
- **iOS/macOS APNs runbook parity** — Phase 30 Deferred Ideas noted "macOS L1 APNs-expired runbook — deferred to v1.4". Not part of Phase 40 (v1.4 Android scope). Surface only if it becomes blocking.

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 40` returned 0 matches at context-gather time.

</deferred>

---

*Phase: 40-android-l1-triage-runbooks*
*Context gathered: 2026-04-23*
*Decision method: adversarial-review skill (Finder / Adversary / Referee scored pattern) — 16 candidate options across 4 gray areas; per-area winners 1D / 2A / 3A / 4A; user confirmed "Adopt all 4" before CONTEXT.md write. Full flaw trail in 40-DISCUSSION-LOG.md.*
