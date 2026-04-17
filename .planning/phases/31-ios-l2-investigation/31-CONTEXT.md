# Phase 31: iOS L2 Investigation - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 31 delivers L2 Desktop Engineering investigation content for iOS/iPadOS through Microsoft Intune:

1. **iOS L2 log collection runbook** at `docs/l2-runbooks/14-ios-log-collection.md` covering three collection methods (MDM diagnostic report, Company Portal upload, Mac+cable sysdiagnose) with explicit method-to-data-type mapping (L2TS-01, SC #1). The preamble explicitly states "no iOS equivalent to `mdmdiagnosticstool.exe`" (SC #2).
2. **ADE Token & Profile Delivery Investigation runbook** at `docs/l2-runbooks/15-ios-ade-token-profile.md` covering token sync status, profile assignment state, and enrollment profile GUID extraction, with known failure patterns and resolution steps (L2TS-02, SC #3).
3. **App Install Failure Diagnosis runbook** at `docs/l2-runbooks/16-ios-app-install.md` covering VPP device/user licensing failures, LOB app distribution failures, silent-install supervision boundaries, and managed app state verification — distinguishing config errors from timing issues and genuine defects (L2TS-02, SC #4).
4. **Compliance & CA Timing Investigation runbook** at `docs/l2-runbooks/17-ios-compliance-ca-timing.md` covering first-evaluation window, CA "Require compliant device" timing gap, Default compliance posture stuck state, jailbreak false-positives, and OS version gates — organized by SC #4 axes (configuration errors / timing issues / genuine defects) with sub-sections cross-referencing L1 runbook 21 Cause A/B/C (L2TS-02, SC #4).
5. **`docs/l2-runbooks/00-index.md` extension** adding an "## iOS L2 Runbooks" H2 section (mirroring the existing macOS L2 section at lines 71-97), an L1 Escalation Mapping table for iOS L1 runbooks 16-21 → iOS L2 runbooks 14-17, and a MAM-WE advisory note deferring ADDTS-01 scope.
6. **L2 template extension** at `docs/_templates/l2-template.md` adding `iOS` to the `platform:` enum (minor edit, mirrors Phase 30 D-24 for the L1 template).
7. **Resolution of all 13+ "Phase 31" placeholder references** across Phase 30 artifacts, iOS lifecycle, iOS triage tree, and admin-setup-ios per the cross-phase forward-contract established in Phase 30 D-16.

Phase 31 establishes the **tiered-log-collection pattern** for Apple-platform L2 runbooks where no single comprehensive diagnostic tool exists (contrasted with Phase 24 macOS IntuneMacODC-first pattern) and the **SC #4 three-axis investigation structure** (config/timing/defect) for compliance L2 investigation. No L2 MAM-WE content (ADDTS-01 deferred); no glossary additions (Phase 32 NAV-01); no navigation hub updates beyond `00-index.md` (Phase 32 NAV-02); no capability matrix entries (Phase 32 NAV-03).

</domain>

<decisions>
## Implementation Decisions

All decisions derived via adversarial review (Finder/Adversary/Referee pattern) on 2026-04-17. Finder surfaced 404 points of flaws (14 critical / 47 medium / 29 low = 90 flaws); Adversary attempted 11 disproves; Referee ruled 10 FALSE POSITIVE + 1 partial REAL ISSUE. Detailed flaw-by-flaw record in `31-DISCUSSION-LOG.md`.

### Log Collection Structure (SC #1, SC #2, L2TS-01)

- **D-01:** **Tiered flow** for `14-ios-log-collection.md` (A5 candidate winner):
  - **Tier 1 — MDM diagnostic report** (always start here; L2 self-service portal pull from Intune admin center > Devices > [device] > Download diagnostics). Low-friction, no user interaction, no physical device.
  - **Tier 2 — Company Portal log upload** (when device is user-held and basic logs suffice OR when MDM diagnostic report is insufficient and no Mac is available). User uploads from Company Portal app; data goes to Microsoft backend — L2 retrieves via Microsoft Support ticket.
  - **Tier 3 — Mac+cable sysdiagnose** (when Tier 1 + 2 insufficient OR profile-delivery-level verbosity required). Physical iOS device + Mac + cable + Console.app to trigger and extract `.tar.gz`.
  - **Rationale:** Phase 24 D-11 lead-with-comprehensive-tool precedent adapted to iOS's fragmented tool landscape. MDM diagnostic report is the closest iOS equivalent to IntuneMacODC's "portal-accessible comprehensive bundle" spirit. Company Portal leading would misdirect L2 workflow (data doesn't reach L2 directly). Sysdiagnose leading would exclude geo-distributed/remote L2 teams. A5 tiered honors iOS reality while providing a default first step.
- **D-02:** **Explicit SC #2 preamble statement** in `14-ios-log-collection.md` immediately after the "Context" H2:
  ```
  > **Tool landscape:** There is **no iOS equivalent to `mdmdiagnosticstool.exe`**. iOS diagnostic data is fragmented across three methods — MDM diagnostic report, Company Portal upload, and Mac+cable sysdiagnose. Each yields different data types; the decision matrix below guides method selection.
  ```
  - **Rationale:** SC #2 is a literal satisfaction requirement. Preamble placement (not buried mid-document) ensures an L2 arriving from Windows experience immediately understands the tool landscape.
- **D-03:** **Method-to-data-type decision matrix** as the first structural element of `14-ios-log-collection.md` after the SC #2 preamble (SC #1 literal). Table columns: `Method | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Typical Latency`. Covers all three methods. "Typical Latency" captures the MS Support roundtrip cost for Company Portal upload (days vs Tier 1 minutes).
- **D-04:** **Section order** for `14-ios-log-collection.md`: Context → Tool Landscape (D-02) → Decision Matrix (D-03) → Section 1 MDM Diagnostic Report → Section 2 Company Portal Upload → Section 3 Mac+Cable Sysdiagnose → Common Artifacts Cross-Reference. Mirrors Phase 24 macOS log collection section order.
- **D-05:** **Sysdiagnose procedure detail depth:** Full procedure documented inline — cable connection (Lightning for pre-iPhone 15; USB-C for iPhone 15+ and all iPads with USB-C), Console.app device-dropdown navigation, sysdiagnose trigger key combination, `.tar.gz` extraction path, artifact inventory. **Research flag:** per STATE.md Phase 31 flag, validate current steps against Microsoft Learn and Apple Developer documentation at research time before writing final steps.

### ADE Token & Profile Delivery Investigation (SC #3, L2TS-02)

- **D-06:** **Single runbook** at `docs/l2-runbooks/15-ios-ade-token-profile.md` covering both token sync AND profile delivery (B1 candidate winner). Mirrors Phase 24 macOS L2 four-file pattern — `11-macos-profile-delivery.md` is the structural parallel (191 lines; iOS runbook target 200-300 lines per macOS 13-macos-compliance.md 217-line precedent).
- **D-07:** **Hybrid investigation structure** (B5 candidate winner) — two-layer H2 organization satisfying SC #3's dual literal requirement (indicators AND known failure patterns):
  ```
  ## Investigation — Data Collection
    ### Step 1: Token sync status (Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens)
    ### Step 2: Profile assignment state (ABM token sync, Intune ADE profile assignment)
    ### Step 3: Enrollment profile GUID (Intune admin center URL extraction; Graph API GET supplement)
    ### Step 4: Device-side enrollment state (MDM diagnostic report + Company Portal logs)
  ## Analysis — Match Against Known Failure Patterns
    ### Pattern A: Token expired or sync stuck
    ### Pattern B: Profile never assigned to device in ABM
    ### Pattern C: Profile assigned but device never received it (APNs push or network path)
    ### Pattern D: Wrong MDM server on device (token rotation / tenant migration)
  ## Resolution
    ### (per-pattern resolution steps + Microsoft Support escalation criteria)
  ```
  - **Rationale:** SC #3 literal requires indicators-to-check AND known-failure-patterns with resolution-steps. B3 (per-indicator only) satisfies only indicators; B4 (per-pattern only) satisfies only patterns. B5 hybrid satisfies both.
- **D-08:** **GUID extraction depth:** Portal-first for all indicators, plus **read-only Graph API GET** for the single indicator (token rotation history) not surfaced in the Intune admin center (B7 candidate winner). Graph API is NOT the primary investigation path — it is a surgical supplement for one indicator family.
- **D-09:** **ADDTS-02 scope-boundary warning** — **preamble placement only** (no inline repetition at individual Graph GET steps):
  ```
  > **Graph API scope:** Where this runbook uses the Microsoft Graph API, usage is strictly READ-ONLY (GET requests). No modifications. No token regeneration. For deep token GUID extraction, write operations, or advanced enumeration, see **ADDTS-02** (future milestone — `L2 runbook for ADE token delivery deep-dive`).
  ```
  - **Rationale:** ADDTS-02 is a deferred deep-dive runbook, not a blanket Graph ban. Preamble-only placement trusts L2 to internalize the rule without cluttering every heading.
- **D-10:** **ABM portal access requirement** in `15-ios-ade-token-profile.md` Prerequisites section: L2 must have ABM read access (for device assignment state verification) AND Intune admin center read access (for token sync state) AND Entra read access (for user license assignment, referenced in cross-link). Triple-portal requirement explicitly flagged since L2 teams may have only Intune scope.

### App Install Investigation (SC #4, L2TS-02)

- **D-11:** **Single runbook** at `docs/l2-runbooks/16-ios-app-install.md` mirroring Phase 24 macOS L2 `12-macos-app-install.md` structural template (194 lines). Covers VPP device-licensed vs user-licensed failure modes, LOB (IPA) app distribution failures, silent-install supervision boundaries per Phase 28 (supervised-only callout), managed app state verification via Intune admin center.
- **D-12:** **Three-class disambiguation** (SC #4 literal): each failure pattern must be categorized explicitly as configuration error / timing issue / genuine defect with escalation criteria per class. Use the following visual marker convention: `⚙️ Config error` / `⏱️ Timing issue` / `🐛 Genuine defect`. Defects escalate to Microsoft Support with a data-collection checklist.
- **D-13:** App install runbook does NOT cover MAM-WE app protection policy failures — explicitly out of scope per Phase 30 D-31 ADDTS-01 deferral. Add a one-line "MAM-WE app protection policy failures: see [MAM advisory](00-index.md#mam-we-investigation-advisory)" cross-reference.

### Compliance & CA Timing Investigation (SC #4, L2TS-02)

- **D-14:** **Hybrid axis structure** (C3 candidate winner) for `docs/l2-runbooks/17-ios-compliance-ca-timing.md`:
  ```
  ## Investigation by Axis
    ### Configuration Errors (⚙️)
      #### Maps to L1 runbook 21 Cause B (actual policy mismatch) + Cause C (Default posture = Not compliant)
    ### Timing Issues (⏱️)
      #### Maps to L1 runbook 21 Cause A (first-evaluation window pending)
    ### Genuine Defects (🐛)
      #### Cross-cuts L1 Cause A/B/C — APNs-blocked "Not evaluated" stuck; jailbreak false-positives; OS-version gate behavior anomalies
  ## Per-Cause Deep-Dive
    ### Cause A: First-Evaluation Window (timing axis)
    ### Cause B: Policy Mismatch — OS Version / Jailbreak / Passcode / Restricted Apps (config axis + defects)
    ### Cause C: Default Compliance Posture Stuck (config axis + genuine-defect APNs-blocked)
  ```
  - **Rationale:** SC #4 literal demands config/timing/defect distinction as top-level axes. L1 runbook 21 Phase 30 D-28 uses Cause A/B/C sub-sections; C3 hybrid preserves L1→L2 handoff frictionless while satisfying SC #4 literal.
- **D-15:** **Full coverage with Pareto emphasis** (C7 candidate winner): CA timing + Default posture stuck are expanded with full investigation steps (~50% of runbook content). Jailbreak false-positives, OS-version gates, passcode, and restricted-apps Bundle ID issues receive compact sub-sections (~10 lines each) with explicit deep-links to `docs/admin-setup-ios/06-compliance-policy.md#[anchor]` anchors per Phase 28 D-11/D-14.
- **D-16:** **"Not evaluated" terminal state** (cross-cutting SC #4 genuine-defect class) gets an explicit sub-section covering: APNs-blocked at network edge (06-compliance-policy.md line 223), cross-platform APNs cert expiry impact (Phase 27 D-11), Microsoft Support escalation criteria (collect APNs tenant ID, expiry timestamp, network-path evidence from sysdiagnose kernel log).
- **D-17:** **L1 runbook 21 handoff block** at top of `17-ios-compliance-ca-timing.md` Context section:
  ```
  **From L1 escalation?** L1 runbook 21 classified the failure as Cause A / B / C. Skip to the matching "Per-Cause Deep-Dive" section below. The "Investigation by Axis" section is the starting point for fresh investigations where L1 did not narrow the cause.
  ```

### Runbook Count & Organization (L2TS-01, L2TS-02)

- **D-18:** **Four runbooks total** (D1 candidate winner) — one log collection + three investigation — mirrors Phase 24 macOS L2 file count exactly:
  ```
  14-ios-log-collection.md
  15-ios-ade-token-profile.md
  16-ios-app-install.md
  17-ios-compliance-ca-timing.md
  ```
- **D-19:** **File numbering: `14-17`** — continues the existing `l2-runbooks/` sequence (Windows 01-05, APv2 06-08, unfilled 09 slot, macOS 10-13, iOS 14-17). The unfilled 09 slot stays unfilled (no Phase 31 claim). Numbering continuation is the project's locked ARCHITECTURE.md Pattern 5 (Phase 24 D-01).
- **D-20:** **`00-index.md` iOS L2 section structure** injected after the existing macOS L2 section (after line 97). Mirrors the exact macOS section structure:
  ```
  ## iOS L2 Runbooks

  > **Version gate:** The runbooks below cover iOS/iPadOS through Microsoft Intune.
  > For macOS ADE runbooks, see above. For Windows Autopilot runbooks, see the tables above.

  The [iOS Log Collection Guide](14-ios-log-collection.md) is a **prerequisite for all iOS L2 investigation runbooks** — collect a diagnostic package via one of three methods (MDM diagnostic report / Company Portal upload / Mac+cable sysdiagnose) before beginning any investigation.

  ### When to Use
  | Runbook | When to Use | Prerequisite |
  | ... (4 rows, one per runbook) |

  ### iOS L1 Escalation Mapping
  | L1 Runbook Source | L2 Runbook |
  | ... (6 rows, one per L1 runbook 16-21) |

  ### MAM-WE Investigation Advisory
  > **MAM-WE investigation is out of Phase 31 scope** — deferred to **ADDTS-01** future milestone. Selective wipe failures, PIN loop, app protection not applying, and MAM-specific compliance failures currently have no L2 runbook. Escalate MAM-specific issues directly to Microsoft Support with Company Portal log upload + app protection policy JSON export.
  ```
- **D-21:** **MAM advisory placement** — **`00-index.md` only** (D6 candidate winner). No cross-references to the MAM advisory from individual runbook footers. Single source of truth; lower maintenance; L2 engineers hitting MAM issues find it in the index they already consult.

### L1→L2 Escalation Mapping (new placeholder retrofit contract — from adversarial review F4-MISSING.2)

- **D-22:** **Explicit L1→L2 placeholder target mapping** resolves all "iOS L2 Runbooks (Phase 31)" placeholder references in Phase 30 L1 runbooks + decision tree + iOS lifecycle + admin-setup-ios compliance policy. **Every placeholder resolves to a specific 14-17 runbook target — no generic links to `00-index.md`**.

  | Source | Line | L2 Target |
  |--------|------|-----------|
  | `l1-runbooks/16-ios-apns-expired.md` | 90 | `15-ios-ade-token-profile.md` (primary — APNs path through token diagnostic) + cross-link to `14-ios-log-collection.md` for Intune agent logs |
  | `l1-runbooks/17-ios-ade-not-starting.md` | 114 | `15-ios-ade-token-profile.md` (direct — ADE token/profile IS the L2 investigation for ADE-not-starting) |
  | `l1-runbooks/18-ios-enrollment-restriction-blocking.md` | 88 | `14-ios-log-collection.md` + `15-ios-ade-token-profile.md` (restrictions visible in enrollment blade; no dedicated L2 restriction runbook — restriction-specific diagnosis uses token/profile investigation) |
  | `l1-runbooks/19-ios-license-invalid.md` | 96 | `14-ios-log-collection.md` (MDM diagnostic report surfaces license assignment state) + cross-link to `15-ios-ade-token-profile.md` where ADE-path |
  | `l1-runbooks/20-ios-device-cap-reached.md` | 83 | `15-ios-ade-token-profile.md` (token/enrollment-profile diagnostic surfaces device cap state) |
  | `l1-runbooks/21-ios-compliance-blocked.md` | 179 | `17-ios-compliance-ca-timing.md` (direct — map Cause A→timing axis, Cause B→config-error axis, Cause C→config-error axis per D-14) |
  | `decision-trees/07-ios-triage.md` | 44 | `00-index.md#ios-l2-runbooks` (generic L2 routing — symptom not yet narrowed at the triage-tree terminal node) |
  | `decision-trees/07-ios-triage.md` | 72, 82, 89 | Route by failure category — profile/config/app → `15-ios-ade-token-profile.md` + `16-ios-app-install.md`; compliance → `17-ios-compliance-ca-timing.md` (per-row judgment at plan time) |
  | `decision-trees/07-ios-triage.md` | 94 | `00-index.md#ios-l2-runbooks` (Related Resources footer) |
  | `ios-lifecycle/01-ade-lifecycle.md` | 364 | `15-ios-ade-token-profile.md` + `14-ios-log-collection.md#section-3-mac-cable-sysdiagnose` (the sysdiagnose reference is the line's direct target) |
  | `admin-setup-ios/06-compliance-policy.md` | 182 | `17-ios-compliance-ca-timing.md` + `14-ios-log-collection.md` (prose rewrite per D-23 — not simple substitution) |

- **D-23:** **Prose retrofit** for `docs/admin-setup-ios/06-compliance-policy.md` line 182 — the current prose reads "L2 diagnosis of a stuck compliance state requires Company Portal log upload, MDM diagnostic report from Intune admin center, or Mac+cable sysdiagnose (documented in Phase 31 L2 runbooks)." Rewrite to past/present tense with concrete links:
  ```
  L2 diagnosis of a stuck compliance state uses [iOS Log Collection](../l2-runbooks/14-ios-log-collection.md) (three methods: MDM diagnostic report, Company Portal upload, Mac+cable sysdiagnose) followed by [Compliance & CA Timing Investigation](../l2-runbooks/17-ios-compliance-ca-timing.md).
  ```
  Matches Phase 30 D-18 prose retrofit pattern.

### Placeholder Retrofit Commit Grouping

- **D-24:** **Commit grouping** — placeholder retrofit grouped by source directory, NOT rolled into individual runbook commits (mirrors Phase 30 D-20 atomic-commit pattern):
  - `docs(31): resolve Phase 31 L2 placeholders in iOS L1 runbooks` — 6 files (`l1-runbooks/16-21`)
  - `docs(31): resolve Phase 31 L2 placeholders in iOS triage tree` — 1 file (`decision-trees/07-ios-triage.md`, 5 lines)
  - `docs(31): resolve Phase 31 L2 placeholder in iOS ADE lifecycle` — 1 file (`ios-lifecycle/01-ade-lifecycle.md`, 1 line)
  - `docs(31): resolve Phase 31 L2 placeholder in iOS compliance policy (prose rewrite)` — 1 file (`admin-setup-ios/06-compliance-policy.md`, prose rewrite)
- **D-25:** **Modification metadata on retrofitted files** — each receives a `last_verified` date bump to Phase 31 ship date and a 1-line Version History entry: `[date] | Resolved Phase 31 L2 cross-references | --`. Matches Phase 30 D-19 pattern.
- **D-26:** **Per-line enumeration** — like Phase 30 D-17, planner MUST produce a complete per-line placeholder resolution table in PLAN.md before execution. D-22 above provides the mapping; planner enumerates each line anchor with its target to eliminate execution-time ambiguity. Where a triage-tree terminal node routes to multiple L2 runbooks, the planner picks one "primary" target plus "see also" cross-refs.

### L2 Template Extension

- **D-27:** **L2 template `platform:` enum extension** at `docs/_templates/l2-template.md` — current enum is `platform: Windows | macOS | all` (line 19). Extend to `platform: Windows | macOS | iOS | all`. Minor template edit; mirrors Phase 30 D-24 pattern for the L1 template. Separate commit: `docs(31): extend L2 template platform enum with iOS`.

### Frontmatter & Platform Gate Conventions

- **D-28:** **Frontmatter per iOS L2 file** (inherits from Phase 30 D-25 pattern, adapted for L2):
  - `platform: iOS`
  - `audience: L2`
  - `applies_to: all` for `14-ios-log-collection.md` (all enrollment paths) and `16-ios-app-install.md` (all paths)
  - `applies_to: ADE` for `15-ios-ade-token-profile.md` (ADE-specific)
  - `applies_to: all` for `17-ios-compliance-ca-timing.md` (compliance applies to all enrolled devices)
  - `last_verified: YYYY-MM-DD`, `review_by: last_verified + 90 days`
- **D-29:** **Platform gate banner** per iOS L2 runbook — mirrors Phase 30 D-26 banner exactly:
  ```
  > **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
  ```

### Research Flags (for gsd-phase-researcher)

- **D-30:** **Sysdiagnose procedure verification** — STATE.md Phase 31 flag: validate Mac+cable sysdiagnose procedure and Console.app device-dropdown steps against current Microsoft Learn documentation AND current Apple Developer documentation (sysdiagnose tool has evolved; trigger key combinations may differ across iOS versions and device types).
- **D-31:** **MDM diagnostic report UI path verification** — Intune admin center navigation for "Download diagnostics" per-device action may have been reorganized 2025-2026 (Phase 27 UI research flag precedent). Verify "Intune admin center > Devices > [device] > Download diagnostics" path at research time.
- **D-32:** **Company Portal log upload path verification** — iOS Company Portal app has evolved; "Send logs" / "Help" menu structure and Microsoft backend retrieval path (ticket-based vs self-service) must be verified at research time.
- **D-33:** **Graph API endpoints for token rotation history** — verify the exact `GET /deviceManagement/depOnboardingSettings/{id}` (or equivalent) endpoint shape and the required permission scope (DeviceManagementServiceConfig.Read.All or narrower) at research time. This is the one Graph API indicator in `15-ios-ade-token-profile.md` per D-08.
- **D-34:** **iOS supervision fail-safe for app install** — supervised-only silent install requirement changed in iOS 17 via Declarative Device Management (STATE.md Phase 28 flag carried forward). Verify current boundary for `16-ios-app-install.md` at research time.
- **D-35:** **Default compliance posture stuck-state diagnosis** — Phase 28 D-11 compliance-timing reference is the cross-link target for `17-ios-compliance-ca-timing.md`. Verify the reference doc itself is current against Microsoft Learn.

### Claude's Discretion

- Exact depth of Section 1/2/3 content in `14-ios-log-collection.md` (constrained by D-01 tiered flow + D-03 decision matrix + D-05 sysdiagnose detail)
- Exact per-indicator sub-step ordering within `15-ios-ade-token-profile.md` data-collection section (constrained by D-07 hybrid structure)
- Exact Pattern A/B/C/D internal content within `15-ios-ade-token-profile.md` analysis section (constrained by D-07 pattern list)
- Exact content of the "Resolution" section in `15-ios-ade-token-profile.md` per failure pattern (constrained by D-12 three-class disambiguation applied to ADE investigation failures)
- Exact Pareto weight balance between expanded sub-sections (CA timing, Default posture) and compact sub-sections (jailbreak, OS version, passcode, restricted apps) in `17-ios-compliance-ca-timing.md` (constrained by D-15 Pareto emphasis + macOS 13-macos-compliance.md 217-line reference)
- Exact wording of the MAM advisory block in `00-index.md` (constrained by D-20 template)
- Exact wording of the Graph API READ-ONLY warning preamble block in `15-ios-ade-token-profile.md` (constrained by D-09 template)
- Per-runbook length (macOS parallel: log collection 160 lines, profile-delivery 191, app-install 194, compliance 217 — iOS target similar, with compliance likely longest at ~230 lines due to D-14 hybrid structure + D-15 Pareto)
- File-by-file decision on triage-tree terminal-node placeholder targets (D-26 per-line enumeration at plan time)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before taking action.**

### Structural Precedents (PRIMARY templates)
- `docs/l2-runbooks/10-macos-log-collection.md` — PRIMARY structural template for `14-ios-log-collection.md`. 160 lines; Section 1 IntuneMacODC / Section 2 Terminal targeted / Section 3 version-specific paths. iOS adapts: Tier 1 MDM report / Tier 2 Company Portal / Tier 3 sysdiagnose.
- `docs/l2-runbooks/11-macos-profile-delivery.md` — PRIMARY structural template for `15-ios-ade-token-profile.md`. 191 lines; step-numbered investigation flow. iOS adapts: hybrid data-collection + failure-pattern structure per D-07.
- `docs/l2-runbooks/12-macos-app-install.md` — PRIMARY structural template for `16-ios-app-install.md`. 194 lines; VPP + LOB + installer diagnostics. iOS adapts: SC #4 three-class disambiguation (⚙️/⏱️/🐛).
- `docs/l2-runbooks/13-macos-compliance.md` — PRIMARY structural template for `17-ios-compliance-ca-timing.md`. 217 lines; step-numbered compliance investigation with per-setting sub-sections in Step 5 + CA interaction in Step 6. iOS adapts: hybrid axis structure (D-14) + Pareto coverage emphasis (D-15).
- `docs/l2-runbooks/00-index.md` — index pattern with macOS L2 section at lines 71-97 (version gate + When to Use table + L1 Escalation Mapping table). D-20 extends with iOS L2 section mirroring macOS structure.

### Phase 26-30 Foundations (LOCKED decisions)
- `.planning/phases/26-ios-ipados-foundation/26-CONTEXT.md` — D-17 (numbering start), D-19 (`platform: iOS` frontmatter), D-14 (Supervision State) — applies to L2 frontmatter and Prerequisites sections.
- `.planning/phases/27-ios-admin-setup-corporate-ade-path/27-CONTEXT.md` — D-11 APNs cross-platform blast radius (15-ade-token-profile deep-link context), ABM cross-reference pattern (15-ade-token-profile ABM portal access in D-10).
- `.planning/phases/28-ios-admin-setup-configuration-apps-compliance/28-CONTEXT.md` — D-11/D-12 CA timing section (deep-link target `docs/admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access` for 17-compliance-ca-timing), D-14 Default compliance posture (17-compliance-ca-timing scope), D-22 placeholder forward-promise (parent of the D-22 Phase 31 retrofit contract), supervised-only silent-install callout (16-app-install scope).
- `.planning/phases/29-ios-admin-setup-byod-mam/29-CONTEXT.md` — D-08 shared Intune Enrollment Restrictions section (15-ade-token-profile cross-reference for restriction-based failures), D-13 placeholder pattern, D-31 MAM deferral (informs D-13/D-21 MAM handling).
- `.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md` — D-26 platform-gate banner (inherited by D-29), D-16/D-17/D-20 placeholder retrofit + atomic-commit pattern (inherited by D-22/D-24/D-26), D-31 MAM deferral (inherited by D-13/D-21), D-28 Cause A/B/C sub-cause pattern (informs D-14 L1→L2 handoff), D-22 iOS triage tree file (target of 5 placeholder lines in D-22 mapping), adversarial-review decision method (inherited for this phase).

### iOS Content Cross-Reference Targets (for L2 runbook deep-links)
- `docs/admin-setup-ios/00-overview.md` §`#intune-enrollment-restrictions` (Phase 29 D-08) — 15-ade-token-profile cross-reference (enrollment-restriction-blocking failures).
- `docs/admin-setup-ios/01-apns-certificate.md` — 15-ade-token-profile cross-reference (APNs certificate indicators).
- `docs/admin-setup-ios/02-abm-token.md` — 15-ade-token-profile primary cross-reference (ABM token scope, token rotation).
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — 15-ade-token-profile cross-reference (enrollment profile configuration).
- `docs/admin-setup-ios/04-configuration-profiles.md` — 17-compliance-ca-timing cross-reference (configuration-caused compliance failures; Wi-Fi SSID mismatch case).
- `docs/admin-setup-ios/05-app-deployment.md` — 16-app-install primary cross-reference (VPP, LOB, managed app status).
- `docs/admin-setup-ios/06-compliance-policy.md` §`#compliance-evaluation-timing-and-conditional-access` — 17-compliance-ca-timing primary cross-reference (Cause A first-evaluation window); also deep-link targets for default posture, jailbreak, OS version, passcode, restricted apps sub-sections per D-15.
- `docs/admin-setup-ios/07-device-enrollment.md` — 14-log-collection (Company Portal log upload context); 15-ade-token-profile (Company Portal enrollment variant).
- `docs/admin-setup-ios/08-user-enrollment.md` — 14-log-collection (Company Portal log upload in user-enrollment flow).
- `docs/ios-lifecycle/00-enrollment-overview.md` — enrollment path anchors (Supervision, User Enrollment) for contextualizing investigation by enrollment path.
- `docs/ios-lifecycle/01-ade-lifecycle.md` — 7-stage ADE pipeline. 15-ade-token-profile Pattern A-D cross-reference for Stage 1-2 token-sync context; also line 364 is a D-22 placeholder resolution target.

### iOS L1 Runbooks (LOCKED — Phase 30; referenced by L2 for escalation handoff)
- `docs/l1-runbooks/16-ios-apns-expired.md` — L1 handoff → 15-ade-token-profile (D-22 mapping; line 90 placeholder resolution).
- `docs/l1-runbooks/17-ios-ade-not-starting.md` — L1 handoff → 15-ade-token-profile (D-22 mapping; line 114 placeholder resolution).
- `docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` — L1 handoff → 14-log-collection + 15-ade-token-profile (D-22 mapping; line 88 placeholder resolution).
- `docs/l1-runbooks/19-ios-license-invalid.md` — L1 handoff → 14-log-collection (D-22 mapping; line 96 placeholder resolution).
- `docs/l1-runbooks/20-ios-device-cap-reached.md` — L1 handoff → 15-ade-token-profile (D-22 mapping; line 83 placeholder resolution).
- `docs/l1-runbooks/21-ios-compliance-blocked.md` — L1 handoff → 17-compliance-ca-timing (D-22 mapping; line 179 placeholder resolution). Cause A/B/C sub-cause structure informs D-14 hybrid axis structure.

### iOS Decision Tree (LOCKED — Phase 30; D-22 retrofit target)
- `docs/decision-trees/07-ios-triage.md` — lines 44, 72, 82, 89, 94 are all Phase 31 placeholder targets per D-22. Line 44 and 94 route to index; lines 72/82/89 route by failure category.

### Templates and Conventions
- `docs/_templates/l2-template.md` — L2 template. D-27 extends `platform:` enum to include `iOS`. Line 19 current state: `platform: Windows | macOS | all`.
- `docs/_glossary-macos.md` — shared Apple glossary. iOS L2 runbooks use plain-text first occurrences of iOS terms (APNs, MDM command pipeline, ADE token, VPP, Declarative Device Management); no new glossary entries (Phase 32 NAV-01 scope).
- `docs/ARCHITECTURE.md` — Pattern 5 (Numbering Continuation) governs D-19 file numbering at 14-17.

### Placeholder Retrofit Targets (D-22 enumeration — 13+ line references)
- `docs/l1-runbooks/16-ios-apns-expired.md` line 90 (escalation footer)
- `docs/l1-runbooks/17-ios-ade-not-starting.md` line 114 (escalation footer)
- `docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` line 88 (escalation footer)
- `docs/l1-runbooks/19-ios-license-invalid.md` line 96 (escalation footer)
- `docs/l1-runbooks/20-ios-device-cap-reached.md` line 83 (escalation footer)
- `docs/l1-runbooks/21-ios-compliance-blocked.md` line 179 (escalation footer)
- `docs/decision-trees/07-ios-triage.md` lines 44 (Mermaid node text), 72 (Routing Verification row), 82 (How to Check row), 89 (Escalation Data row), 94 (Related Resources footer)
- `docs/ios-lifecycle/01-ade-lifecycle.md` line 364 (sysdiagnose reference)
- `docs/admin-setup-ios/06-compliance-policy.md` line 182 (prose — requires rewrite per D-23, not substitution)

### Requirements and Planning
- `.planning/ROADMAP.md` — Phase 31 section (lines ~158-167); 4 success criteria (SC #1 3-method mapping, SC #2 no-mdmdiagnosticstool framing, SC #3 token/profile indicators + failure patterns, SC #4 config/timing/defect distinction).
- `.planning/REQUIREMENTS.md` — L2TS-01 (iOS log collection runbook with 3 methods), L2TS-02 (3 investigation areas: ADE token/profile, app install, compliance/CA timing), ADDTS-01 (deferred MAM L2 future milestone — informs D-13/D-21), ADDTS-02 (deferred ADE Graph API GUID deep-dive runbook — informs D-08/D-09 boundary).
- `.planning/STATE.md` — Phase 31 research flag (sysdiagnose validation, informs D-30).

### External Research Targets (for gsd-phase-researcher)
- Microsoft Learn — Intune iOS MDM diagnostic report per-device action (D-31 flag)
- Microsoft Learn — iOS Company Portal log upload flow and Microsoft backend retrieval (D-32 flag)
- Apple Developer Documentation — sysdiagnose on iOS/iPadOS (trigger combinations per device/OS version, Console.app flow) (D-30 flag)
- Microsoft Learn — Graph API DEP onboarding settings endpoints (D-33 flag)
- Microsoft Learn — iOS supervision boundary for silent install (D-34 flag)
- Microsoft Learn — Intune compliance evaluation timing and Default posture behavior (D-35 flag)
- Community sources (oofhours, Call4Cloud) — iOS L2 troubleshooting patterns if Microsoft coverage insufficient; confidence-label community content MEDIUM per project convention.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **L2 template** (`docs/_templates/l2-template.md`) — minor extension needed per D-27 (add `iOS` to `platform:` enum line 19). Frontmatter schema, section structure (Context / Investigation / Resolution), version-gate blockquote pattern, and cross-reference conventions all reused.
- **macOS L2 file set** (10/11/12/13) — direct structural templates per canonical refs above. iOS follows the same 4-file pattern, same section ordering, same frontmatter schema.
- **Platform gate banner pattern** (Phase 30 D-26) — reused verbatim in all 4 iOS L2 runbooks (D-29).
- **"Gather everything first, then investigate" principle** (Phase 24 D-14) — reused; all 4 iOS L2 runbooks open with "Before starting: collect a diagnostic package per [iOS Log Collection Guide](14-ios-log-collection.md)."
- **Escalation Mapping table in `00-index.md`** (macOS section lines 87-97) — extended with iOS section per D-20. Table columns and row structure preserved.
- **"Version gate" blockquote pattern** — reused verbatim.
- **Cross-reference anchor linking** (`../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access`) — reused throughout iOS L2 runbooks for admin-setup deep-links (Phase 28 D-11 anchor target).
- **Cross-phase placeholder pattern** (Phase 28 D-22 → Phase 30 D-16 → Phase 31 D-22) — reused; Phase 31 IS the resolution milestone for "Phase 31" placeholders planted by Phase 30.

### Established Patterns
- L2 runbook section order: Frontmatter → Platform gate banner → Title H1 → Context H2 → Triage H2 (From L1 escalation?) → Investigation H2 → Resolution H2 → Escalation Criteria H2 → Related Resources → Version History
- Frontmatter: `last_verified: YYYY-MM-DD`, `review_by: last_verified + 90d`, `audience: L2`, `platform: iOS`, `applies_to: all|ADE|BYOD`
- iOS L2 investigation uses portal + sysdiagnose + MDM diagnostic data (no CLI/shell access on iOS itself) — aligns with "no mdmdiagnosticstool.exe equivalent" framing
- L2 runbooks open with triage block: "From L1 escalation? L1 collected: [data list]. Skip to Step N. Starting fresh? Begin at Step 1."
- Relative cross-references with section anchors (`../admin-setup-ios/06-compliance-policy.md#[anchor]`, `../l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose`)
- Version History table at bottom of every file (1-line entries; Phase 30 pattern)

### Integration Points
- **5 new files:** `14-ios-log-collection.md`, `15-ios-ade-token-profile.md`, `16-ios-app-install.md`, `17-ios-compliance-ca-timing.md`, plus the `00-index.md` iOS L2 section injection
- **1 template edit:** `docs/_templates/l2-template.md` (D-27)
- **1 index-file edit:** `docs/l2-runbooks/00-index.md` (D-20 iOS L2 section injection; MAM advisory D-21)
- **9 placeholder retrofit files** (D-22 mapping): 6 iOS L1 runbooks + 1 triage tree + 1 lifecycle + 1 compliance-policy (13+ line anchors per D-26 per-line enumeration)
- **NO Mermaid graph modifications** to any decision tree file (D-22 text-only line changes; Phase 30 D-05 precedent)
- **NO modifications to Phase 30 L1 runbook structure** — only escalation-footer link substitution per D-22
- **NO new glossary entries** (Phase 32 NAV-01)
- **NO navigation hub edits** to `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md` beyond the 00-index section injection (Phase 32 NAV-02)
- **NO capability matrix entries** (Phase 32 NAV-03)
- **NO MAM-specific L2 runbook content** (ADDTS-01 deferred; D-13/D-21)
- **NO Graph API write operations** in any L2 runbook (D-09 scope boundary; ADDTS-02 deferred)

</code_context>

<specifics>
## Specific Ideas

- **Runbook length targets:** 14-log-collection ~160-180 lines (macOS 10 = 160); 15-ade-token-profile ~220-280 lines (longer than macOS 11's 191 lines due to D-07 hybrid structure); 16-app-install ~190-210 lines (macOS 12 = 194); 17-compliance-ca-timing ~220-250 lines (macOS 13 = 217, iOS slightly longer due to D-14 hybrid axis structure + D-15 Pareto emphasis).
- **`14-ios-log-collection.md` section 1 (MDM diagnostic report) must emphasize the mechanics:** L2 triggers from Intune admin center > Devices > [device], but the **device agent responds to the MDM command on its next check-in** (~8 hour default cadence) and surfaces results on subsequent pull. L2 must account for the round-trip latency — this is the Tier 1→2 escalation signal when sub-hour turnaround is needed.
- **Sysdiagnose trigger combinations vary by device type:** iPhone 8+ / iPhone SE / iPad with Touch ID: both volume buttons + sleep/wake. iPhone X+ and later iPhones: both volume buttons + side button. iPad with Face ID: top button + either volume button. The runbook MUST enumerate per-device-type triggers (D-30 research flag).
- **15-ade-token-profile Pattern A (token expired or sync stuck) is distinct from Pattern D (wrong MDM server on device):** Pattern A = Intune-side token state issue; Pattern D = device-side enrollment target mismatch (usually from tenant migration or a re-enrollment with stale MDM payload). Both surface as "device not receiving commands" but have different resolutions — Pattern A fixes in Intune; Pattern D requires device wipe + re-enrollment.
- **16-app-install three-class disambiguation visual markers** (⚙️/⏱️/🐛) are optional emoji — if the project prefers no emoji, use text markers: `[CONFIG ERROR]`, `[TIMING]`, `[DEFECT]`. Planner should confirm emoji permitted.
- **17-compliance-ca-timing L1→L2 handoff:** L1 runbook 21 Cause A text explicitly says "state remains 'Not evaluated' > 30 minutes after enrollment (overlap with runbook 16 — APNs check-in issue)." The overlap between Cause A (timing) and a potential genuine-defect (APNs check-in broken) is why D-14 hybrid structure is needed — the same L1 observation can route to the timing axis OR the genuine-defect axis depending on 30-minute evaluation window vs multi-day stuck state.
- **MAM advisory wording (D-20)** must reference ADDTS-01 by ID, not just "future milestone" — makes the deferred-ideas contract auditable. Specific wording: "deferred to **ADDTS-01** future milestone."
- **14-ios-log-collection decision matrix (D-03)** must have a "Typical Latency" column to make the Company Portal upload MS Support roundtrip cost visible. This is the signal that pushes L2 to Tier 3 (sysdiagnose) when time is critical — despite the Mac+cable friction.
- **Adversarial-review trail preservation:** 31-DISCUSSION-LOG.md records the 25 candidate options + 90 flaws + Adversary's 11 disproves + Referee's 10 FALSE POSITIVE + 1 REAL ISSUE rulings + per-Gray-Area winner reasoning. Full auditable record of decision derivation.
- **Runbook 17 "Not evaluated" terminal state (D-16)** is the only sub-section that may require Microsoft Support escalation criteria for reasons beyond tenant-config. APNs-blocked at network edge is an infrastructure issue Microsoft cannot fix without tenant data. The Microsoft Support escalation block lists: APNs tenant ID (Intune > Apple > APNs certificate > tenant ID field), expiry timestamp, network-path evidence from sysdiagnose (kernel.log APNs session records), and date range of "Not evaluated" state persistence.

</specifics>

<deferred>
## Deferred Ideas

- **iOS MAM-WE L2 runbooks** (selective wipe failures, PIN loop, app protection not applying, MAM-WE compliance failures) — **ADDTS-01** future milestone per Phase 30 D-31. Phase 31 surfaces the deferral via `00-index.md` MAM advisory note (D-20/D-21) but does NOT create a stub runbook (Phase 30 no-stub precedent).
- **Graph API ADE token GUID deep-dive runbook** — **ADDTS-02** future milestone per REQUIREMENTS.md line 60. Phase 31 uses Graph API read-only for ONE indicator (token rotation history) per D-08/D-09; write operations and deep enumeration are deferred.
- **iOS/iPadOS sysdiagnose per-device-type cheat sheet** — useful standalone reference that 14-ios-log-collection.md could deep-link. Deferred to Phase 32 NAV-03 (capability-matrix scope) or v1.4.
- **L2 runbook for Apple Configurator 2 manual enrollment diagnostics** — explicitly out of scope per REQUIREMENTS.md Out-of-Scope table.
- **iOS capability matrix entries** for L2 investigation depth vs macOS / Windows — Phase 32 NAV-03.
- **iOS L2 runbook cross-references to `_glossary-macos.md`** — deferred; Phase 32 NAV-01 will extend the shared glossary with iOS terms. Phase 31 uses plain-text first occurrences per Phase 30 precedent.
- **Navigation hub edits** to `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md` with iOS L2 links — Phase 32 NAV-02 scope.
- **iOS localization / language-variant error message handling** — not addressed. L1 runbook 21 uses English-only portal strings ("Not evaluated", "Non-compliant"); iOS L2 runbooks match L1's English-only framing. Localization is a broader project concern deferred beyond v1.3.
- **iOS vs iPadOS differentiation for sysdiagnose** — candidate file's sysdiagnose coverage glosses over iPhone vs iPad differences. D-30 research flag calls this out; Phase 31 runbook must enumerate per-device-type triggers but does not create separate iPad-specific runbook (scope violation).
- **Shared iPad L2 specifics** — SIPAD-01 future milestone; not covered by the 4 iOS L2 runbooks.
- **Automated link-check CI for placeholder-free iOS L1/L2 content post-Phase 31** — not in current tooling; noted for future milestone.

### Reviewed Todos (not folded)
None — `gsd-tools todo match-phase 31` returned 0 matches at context-gather time (no pending backlog todos relevant to iOS L2 scope).

</deferred>

---

*Phase: 31-ios-l2-investigation*
*Context gathered: 2026-04-17*
*Decision method: 4 Gray Areas × 5-8 candidate options each (25 candidates total) → adversarial review (Finder 404 pts / 90 flaws / Adversary 11 disproves / Referee 10 FALSE POSITIVE + 1 REAL ISSUE). Full flaw trail in 31-DISCUSSION-LOG.md. User confirmed winners with 3 open-question resolutions (Graph warning placement → preamble only; MAM advisory placement → 00-index.md only; numbering → 14-17).*
