# Phase 31 Gray Area Candidates — Adversarial Review Input

**Phase:** 31 — iOS L2 Investigation
**Goal:** L2 Desktop Engineering log collection + investigation runbooks for iOS/iPadOS.

## Fixed (not up for debate — carried from prior phases)

- Folder: `docs/l2-runbooks/` with numbered continuation starting at `14-*` (Phase 24 D-01).
- Frontmatter: `platform: iOS`, `audience: L2`, `applies_to: all|ADE|BYOD` (Phase 26 D-19, Phase 30 D-25).
- Platform-gate banner per file (Phase 30 D-26 pattern — "For Windows Autopilot... / For macOS ADE...").
- 00-index.md section-injection: "## iOS L2 Runbooks" H2 after existing macOS L2 section.
- "Gather everything first, then investigate" principle (Phase 24 D-14).
- L2 template extension: add `iOS` to `platform:` enum (mirrors Phase 30 D-24 L1 edit).
- No glossary additions, no nav hub edits beyond 00-index (Phase 32 scope).
- No MAM-specific L2 content — ADDTS-01 deferred to future milestone (Phase 30 D-31).

## Success Criteria (ROADMAP.md Phase 31)

1. L2 engineer can follow the log collection runbook to obtain diagnostic data via any of 3 methods — Company Portal upload, MDM diagnostic report, Mac+cable sysdiagnose — with clear guidance on which method yields which data type.
2. Log collection runbook explicitly states "no iOS equivalent to mdmdiagnosticstool.exe" — an L2 arriving from Windows understands the tool landscape immediately.
3. ADE token/profile delivery failure runbook has specific indicators to check (token sync status, profile assignment state, enrollment profile GUID) and known failure patterns with resolution steps.
4. App install and compliance/CA timing runbooks distinguish config errors vs timing issues vs genuine defects requiring Microsoft support escalation.

## Cross-Phase Obligations (MUST fulfill)

- Resolve 9 "Phase 31" placeholder references inline in same phase (mirrors Phase 30 D-16 placeholder-retrofit pattern):
  - `docs/l1-runbooks/16-ios-apns-expired.md` line 90
  - `docs/l1-runbooks/17-ios-ade-not-starting.md` line 114
  - `docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` line 88
  - `docs/l1-runbooks/19-ios-license-invalid.md` line 96
  - `docs/l1-runbooks/20-ios-device-cap-reached.md` line 83
  - `docs/l1-runbooks/21-ios-compliance-blocked.md` line 179
  - `docs/decision-trees/07-ios-triage.md` lines 44, 72, 82, 89, 94
  - `docs/ios-lifecycle/01-ade-lifecycle.md` line 364
  - `docs/admin-setup-ios/06-compliance-policy.md` line 182

---

# GRAY AREA 1: Log Collection Method Ordering (L2TS-01)

**Context:** iOS offers 3 collection methods. Unlike macOS (IntuneMacODC = single comprehensive script) or Windows (mdmdiagnosticstool.exe = single tool), iOS has no single "run this first" tool. SC #1 demands "clear guidance on which method yields which type of data." SC #2 demands explicit "no mdmdiagnosticstool.exe equivalent" framing.

## Method characteristics

| Method | Who Triggers | Data Scope | L2 Access Path | Physical Requirements |
|--------|--------------|------------|----------------|-----------------------|
| Company Portal log upload | End user on device | Company Portal app logs + basic device info | Uploaded to Microsoft backend — L2 must request via Microsoft Support ticket to retrieve | None — user-only procedure |
| MDM diagnostic report | L2 from Intune admin center | Managed device inventory + commands history + install state | Intune admin center → Devices → [device] → Download diagnostics | None — portal-only |
| Mac+cable sysdiagnose | L2 with device in hand + a Mac | Full iOS system logs (verbose), kernel log, wireless log, full profile dump, full app-install log | `.tar.gz` on local Mac via Console.app while device is cabled | Physical iOS device + physical Mac + Lightning/USB-C cable |

## Candidate options

**A1:** Lead with **Company Portal upload** — present as Method 1 primary.
  - Rationale: least friction for L1-to-L2 handoff (user already has Company Portal), no physical device required.
  - Concerns: data doesn't reach L2 directly; requires MS Support ticket roundtrip; doesn't yield enough data for most investigations.

**A2:** Lead with **MDM diagnostic report** — present as Method 1 primary.
  - Rationale: L2 self-service, no user interaction, no physical device needed. Matches macOS IntuneMacODC spirit (L2 pulls a comprehensive bundle first).
  - Concerns: narrower data scope than sysdiagnose; doesn't include kernel/wireless logs that matter for network/enrollment issues.

**A3:** Lead with **Mac+cable sysdiagnose** — present as Method 1 primary.
  - Rationale: most comprehensive data; closest to Windows `mdmdiagnosticstool.exe` output in depth. Best for deep ADE / profile / compliance investigation.
  - Concerns: requires physical device AND a Mac — high-friction; impossible for remote L2 (geo-distributed support).

**A4:** Present all **3 methods as equal peers** with a method-selection decision matrix ("pick by scenario") as the first structural element of the runbook.
  - Rationale: honest representation — no method dominates; L2 picks based on symptom category. Matches SC #1 literal "which method yields which type of data."
  - Concerns: no "run this first" guidance; requires L2 to read the decision matrix every time; doesn't satisfy L2s looking for a "default first step."

**A5:** **Tiered flow** — Method 1 = MDM diagnostic report (always start here, low-friction portal pull), Method 2 = Company Portal upload (when device is user-held and basic logs suffice), Method 3 = sysdiagnose (when Method 1 + 2 insufficient OR when profile-delivery-level verbosity is required).
  - Rationale: hybrid — provides a "start here" default + escalation path. Matches IntuneMacODC precedent (lead with portal-accessible bundle) while respecting iOS reality (no single tool).
  - Concerns: slight complexity; the decision matrix still matters at Tier 2→3 transition.

---

# GRAY AREA 2: ADE Token / Profile Delivery Investigation Scope (L2TS-02a, SC #3)

**Context:** Literal SC #3: indicators to check include "token sync status, profile assignment state, enrollment profile GUID" — three distinct indicator families. Graph API token GUID extraction is flagged as ADDTS-02 deferred in REQUIREMENTS.md Future Requirements.

## Candidate structure options

**B1:** **Single runbook** — "ADE Token & Profile Delivery Investigation" (one file, like macOS 11-profile-delivery).
  - Rationale: matches macOS pattern; token + profile are tightly coupled (token-sync failure manifests as profile-not-delivering from device POV). One entry point.
  - Concerns: runbook length bloats (4 indicator families × 3-5 failure patterns each = ~300+ lines); L2 may miss sub-scenarios.

**B2:** **Two runbooks** — "ADE Token Sync Investigation" + "ADE Profile Delivery Investigation" (split).
  - Rationale: cleaner mental model — token-sync issues are ABM/Intune-plane; profile-delivery issues are device-plane + APNs-push path.
  - Concerns: forces L2 to pick the right runbook up-front without knowing yet; artificial boundary (most ADE failures span both).

## Candidate internal structure options

**B3:** **Per-indicator H2** structure (mirrors macOS 11-profile-delivery):
  ```
  ## Step 1: Verify token sync status
  ## Step 2: Verify profile assignment state
  ## Step 3: Extract enrollment profile GUID
  ## Step 4: Correlate with device-side enrollment state
  ```
  - Rationale: matches macOS investigation step pattern; indicator-first fits the "gather data" L2 ethos.
  - Concerns: doesn't directly map to failure patterns — L2 has to synthesize.

**B4:** **Per-failure-pattern H2** structure:
  ```
  ## Pattern A: Token expired or sync stuck
  ## Pattern B: Profile never assigned to device in ABM
  ## Pattern C: Profile assigned but device never received it
  ## Pattern D: Wrong MDM server on device
  ```
  - Rationale: matches L1 runbook 21 multi-cause pattern (Phase 30 D-28); helps L2 jump to known-pattern.
  - Concerns: doesn't teach generic diagnostic methodology; if the pattern list is incomplete, L2 has no fallback.

**B5:** **Hybrid** — per-indicator data-collection steps first, then per-failure-pattern analysis section:
  ```
  ## Investigation — Data Collection
    ### Step 1: Token sync status
    ### Step 2: Profile assignment state
    ### Step 3: Enrollment profile GUID
  ## Analysis — Match Against Known Failure Patterns
    ### Pattern A: ...
    ### Pattern B: ...
    ### Pattern C: ...
  ## Resolution
  ```
  - Rationale: teaches methodology (data first) + catalogs known patterns (quick match).
  - Concerns: longer runbook; two-layer structure adds cognitive overhead.

## Candidate GUID extraction depth

**B6:** **Portal-only** — enrollment profile GUID surfaced from Intune admin center URL or JSON copy-link (no Graph API steps).
  - Rationale: respects ADDTS-02 boundary; portal-only fits L2 universe (not requiring dev tooling).
  - Concerns: some indicators not surfaced in portal (token rotation history, profile assignment history).

**B7:** **Portal + Graph API read-only** — portal steps for most indicators, `GET` Graph API for a single "when portal is inadequate" step (token rotation history).
  - Rationale: pragmatic — ADDTS-02 is about Graph extraction DEEP-DIVE (token GUID extraction for advanced scenarios), not a blanket ban on Graph API usage.
  - Concerns: blurs the ADDTS-02 boundary; requires L2 to know Graph Explorer or have API permissions.

**B8:** **Portal + explicit ADDTS-02 pointer** — portal-only steps PLUS a "For deep token-GUID extraction via Graph API, see ADDTS-02 (future milestone)" pointer.
  - Rationale: preserves scope boundary while signaling the escalation path for Microsoft Support cases.
  - Concerns: creates a placeholder reference to a non-existent future doc.

---

# GRAY AREA 3: Compliance / CA Timing Investigation Scope (L2TS-02c, SC #4)

**Context:** SC #4 literal: "distinguish between configuration errors, timing issues, and genuine defects requiring Microsoft support escalation." L1 runbook 21 has 3 sub-causes per Phase 30 D-28: Cause A = CA gap (first-eval pending), Cause B = actual policy mismatch, Cause C = Default posture = Not compliant.

## Candidate structure options

**C1:** **Mirror L1 runbook 21 sub-causes A/B/C** — L2 runbook matches L1 structure one-to-one.
  - Rationale: L1→L2 handoff is frictionless — L1 escalation says "Cause B investigated to Step 4, need L2"; L2 picks up at its Cause B section.
  - Concerns: bakes L1's sub-cause taxonomy into L2 — if new causes emerge (e.g., jailbreak false positives), structure breaks.

**C2:** **Re-frame by L2 investigation axis** — config-errors / timing-issues / genuine-defects (directly maps SC #4's three classes).
  - Rationale: SC #4 literal — L2 runbook organized by the exact distinction SC #4 demands.
  - Concerns: L1→L2 handoff requires mental remapping (L1 Cause A = timing issue; Cause B = config error; Cause C = config error); cause-to-axis mapping not 1:1.

**C3:** **Hybrid** — top-level axes by SC #4 (config/timing/defect), but each axis includes sub-sections mapped back to L1 Cause A/B/C where relevant.
  - Rationale: satisfies SC #4 literally and preserves L1→L2 handoff.
  - Concerns: more complex structure; may introduce cross-referencing overhead.

**C4:** **Symptom-driven investigation tree** — L2 runbook leads with a "What did L1 observe?" branching diagnostic (matches macOS 13-macos-compliance approach of symptom-first).
  - Rationale: closest to macOS L2 precedent; L2 engineers think symptom-first, not cause-first.
  - Concerns: structural divergence from L1 runbook 21; doesn't meet SC #4 literal as cleanly as C2/C3.

## Candidate coverage scope options

**C5:** **Full coverage** — all 5 sub-topics in-scope (first-eval window, CA "Require compliant" gap, jailbreak false-positives, OS-version gates blocking new Apple release, Default posture stuck).
  - Rationale: SC #4 demands config/timing/defect distinction across ALL compliance failure types; partial coverage leaves L2 stranded on edge cases.
  - Concerns: runbook length bloats; some sub-topics (jailbreak false-positives) are rare and may warrant MS Support escalation directly.

**C6:** **Core only** — CA timing + Default posture stuck (high-volume); jailbreak / OS-version / other cases reference `docs/admin-setup-ios/06-compliance-policy.md` + escalate to MS Support.
  - Rationale: Pareto — covers 80%+ of compliance tickets with 50% of the content; admin-setup guide already has the config reference.
  - Concerns: violates SC #4 literal if "distinguish config vs timing vs defect" requires handling all three classes.

**C7:** **Full coverage + Pareto emphasis** — all 5 sub-topics, but CA timing + Default posture are expanded (full investigation steps); jailbreak / OS-version / passcode get compact sub-sections with deep-links to admin-setup-ios references.
  - Rationale: SC #4 coverage satisfied; practical emphasis matches ticket volume.
  - Concerns: runbook length still bloats; sub-section balance is subjective.

---

# GRAY AREA 4: Runbook Count & Grouping + MAM Stub

## Candidate count options

**D1:** **4 files** — 1 log collection + 3 investigation (ADE token/profile, app install, compliance/CA). Mirrors macOS pattern exactly (10 / 11 / 12 / 13).
  - Rationale: structural parallel to macOS; minimum viable coverage; L2 doesn't navigate between artificially-split files.
  - Concerns: ADE investigation runbook may bloat to 300+ lines (covering 3 indicator families across 4+ failure patterns).

**D2:** **5 files** — split ADE into token + profile (D1 + split B2).
  - Rationale: honors indicator-family-as-file boundary; smaller files.
  - Concerns: artificial boundary (tokens + profile are the same ADE lifecycle stage); breaks macOS structural parallel.

**D3:** **5 files** — split compliance+CA into compliance (policy/defect) + CA timing (eval gap).
  - Rationale: Phase 28 D-11 established CA timing as a dedicated section — could be its own L2 file.
  - Concerns: L1 runbook 21 treats them as one runbook with sub-causes; splitting L2 diverges from L1.

**D4:** **6 files** — both splits (D2 + D3).
  - Rationale: maximum granularity.
  - Concerns: file proliferation; 00-index.md bloat; violates macOS structural parallel.

## Candidate MAM handling options

**D5:** **No MAM entry at all** — 00-index.md iOS L2 section includes ONLY runbook entries (log + ADE + app install + compliance).
  - Rationale: ADDTS-01 deferred per Phase 30 D-31; Phase 31 doesn't own MAM L2.
  - Concerns: 09-mam-app-protection.md readers hitting "escalate to L2" have no clear destination; Phase 30 L1 runbook 21 escalation criteria may hint at MAM issues without a target.

**D6:** **00-index.md advisory note** — add a "## Note on MAM-WE Investigation" callout at the end of the iOS L2 section: "MAM-WE investigation (selective wipe failures, PIN loop, app protection not applying) is not in Phase 31 scope — deferred to ADDTS-01 future milestone. Escalate MAM-specific issues directly to Microsoft Support with Company Portal and app protection policy details."
  - Rationale: explicit boundary; gives MAM-failure L2s a clear path; fulfills Phase 30 deferred-ideas contract.
  - Concerns: adds a non-runbook entry to a runbook index — slight format inconsistency.

**D7:** **Stub runbook** — `14-ios-mam-investigation.md` as a 20-line stub file stating "deferred to ADDTS-01" with redirect to Microsoft Support + L1 runbook 21.
  - Rationale: reserves the filename; future ADDTS-01 just fills it in.
  - Concerns: creates a stub file (anti-pattern — Phase 30 explicitly used D-31 "no stub files" pattern); wastes a file-number slot.

---

# Decision Drivers Priority

1. **SC literal satisfaction** (highest weight — these are contractual).
2. **Phase 24 macOS structural precedent** (established lived pattern for Apple-platform L2).
3. **Phase 30 L1 structure coherence** (L1→L2 handoff efficiency).
4. **L2 workflow reality** (remote vs on-site; portal-first vs tool-first).
5. **Scope discipline** (ADDTS-01, ADDTS-02 deferrals preserved).
6. **Runbook length** (avoid bloat but don't split artificially).
