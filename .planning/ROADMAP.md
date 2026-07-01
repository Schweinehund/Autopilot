# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- ✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-19)
- ✅ **v1.4 Android Enterprise Enrollment Documentation** — Phases 34-42 (shipped 2026-04-24)
- ✅ **v1.4.1 Android Enterprise Completion & v1.4 Cleanup** — Phases 43-47 (shipped 2026-04-25)
- ✅ **v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup** — Phases 48-61 (shipped 2026-05-07)
- ✅ **v1.6 Apple Business Delegated Governance & Multi-Org Operations** — Phases 62-66 (shipped 2026-05-25)
- ✅ **v1.7 Deferred Backlog Closure + Validator Chain Hardening** — Phases 67-70 (shipped 2026-05-29)
- ✅ **v1.8 Tooling Debt Closure + Chain-Resilience Hardening** — Phases 71-74 (shipped 2026-06-08)
- ✅ **v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation** — Phases 75-82 (shipped 2026-06-22)
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (shipped 2026-06-24)
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (shipped 2026-06-26)
- ✅ **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (shipped 2026-06-26)
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** — Phases 96-100 (shipped 2026-06-29)
- 🚧 **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** — Phases 101-112 (in progress)

## Phases

<details>
<summary>✅ v1.0–v1.13 (Phases 1-100) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** (Phases 96-100) — SHIPPED 2026-06-29 — `.planning/milestones/v1.13-ROADMAP.md`
- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** (Phases 83-88) — SHIPPED 2026-06-24 — `.planning/milestones/v1.10-ROADMAP.md`
- ✅ v1.0–v1.9 (Phases 1-82) — see milestone entries and `.planning/milestones/`

</details>

### 🚧 v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure (In Progress)

**Milestone Goal:** Deliver complete 5-platform 802.1X network-authentication documentation (wired + Wi-Fi, all EAP methods, Intune client-side config) under the established admin-setup → L1/L2 → integration documentation pattern, and close the v1.14 backlog (corpus nits, iOS/iPadOS + Jamf/Mosyle migration walkthroughs, chain-validator tooling refactors) plus the 12th Path-A audit-harness lineage bump.

#### Phases Summary

- [x] **Phase 101: 802.1X Foundation — Glossary, EAP Methods & Cert Delivery** - Establish the cross-platform conceptual model, EAP-method co-equal overview, and cert-delivery ordering prerequisites all per-platform guides will link into (completed 2026-06-30)
- [x] **Phase 102: Windows 802.1X Admin-Setup (Wi-Fi + Wired)** - Complete Windows 802.1X guide covering all three EAP methods for both Wi-Fi and wired profiles including dot3svc dependency and authentication mode (completed 2026-06-30)
- [x] **Phase 103: macOS 802.1X Admin-Setup (Wi-Fi + Wired)** - Complete macOS 802.1X guide covering all three EAP methods with deployment-channel decision and wired SCEP-only constraint (completed 2026-06-30)
- [x] **Phase 104: iOS/iPadOS 802.1X Admin-Setup (Wi-Fi + Wired)** - Complete iOS/iPadOS 802.1X guide covering all three EAP methods with MAC-randomization NAC handling and M-series iPad wired support
 (completed 2026-06-30)

- [x] **Phase 105: Android Enterprise 802.1X Admin-Setup (Wi-Fi + Wired Gap)** - Android Wi-Fi 802.1X across all AE modes with version-gated RADIUS requirements and explicit no-native-wired-profile gap stub
 (completed 2026-06-30)

- [x] **Phase 106: Linux 802.1X Admin-Setup (Script-Based EAP-TLS + Wired Gap)** - Linux 802.1X guide leading with the platform gap then documenting the nmcli/script EAP-TLS workaround with wired gap stub (completed 2026-07-01)
- [x] **Phase 107: L1 Runbooks #38-41 (802.1X Triage)** - Four cross-platform L1 runbooks (cert failure, RADIUS reject, server-trust failure, EAP negotiation failure) with per-platform leaves (completed 2026-07-01)
- [ ] **Phase 108: L2 Runbooks #31-33 + Decision Tree #10** - Three L2 investigation runbooks (log collection, cert investigation, RADIUS/EAP investigation) and the 802.1X triage decision tree
- [ ] **Phase 109: 802.1X Integration — Capability Matrices + Navigation Hubs** - Capability-matrix 802.1X rows for all 5 platforms and navigation-last hub wiring across all six hub files
- [ ] **Phase 110: Pillar B + C — Corpus Fixes + MDM Migration Walkthroughs** - Three v1.13-deferred accuracy nits corrected plus iOS/iPadOS ABM Deadline migration walkthrough and Jamf/Mosyle source-MDM release steps
- [ ] **Phase 111: Pillar D — Chain-Validator Tooling Refactors** - Three DRY refactors to the validator chain (exec-fail-detail extraction, frozen-aware adoption sweep, helper-spawn stderr capture)
- [ ] **Phase 112: Pillar E — 12th Path-A Audit-Harness Lineage Bump + Milestone Close** - Atom 1 + Atom 2 harness bump, 3-axis terminal re-audit, and milestone close with all 22 requirements Validated

## Phase Details

### Phase 101: 802.1X Foundation — Glossary, EAP Methods & Cert Delivery

**Goal**: Operators and admins have the conceptual model, EAP-method co-equal overview, and cert-delivery ordering prerequisites that all five per-platform guides link into — without which any per-platform guide authoring violates link-not-copy
**Depends on**: Phase 100 (v1.13 close)
**Requirements**: DOT1X-01, DOT1X-02, DOT1X-03
**Success Criteria** (what must be TRUE):

  1. A reader can learn the 802.1X 3-actor model (supplicant / authenticator / authentication server), EAPOL, and RADIUS exchange from `docs/_glossary-network.md` with see-also banners wired to all existing platform glossaries
  2. An admin can choose among EAP-TLS, PEAP-MSCHAPv2, and EAP-TTLS as co-equal paths from `01-eap-method-overview.md`, including what each method requires from the client and when each is selected
  3. An admin can follow the cert-delivery foundation (`02-cert-delivery-foundation.md`) to understand the hard deployment ordering (trusted-root profile → SCEP/PKCS client cert → network profile), EKU requirements, RADIUS server-name validation, and the per-platform cert-delivery support matrix
  4. The scope callout template establishing the Intune-client-side-only boundary is present in the foundation and reusable by per-platform guides

**Plans**: 5 plans

**Wave 1**

- [x] 101-01-PLAN.md — Author `_glossary-network.md` (13 platform-neutral 802.1X terms, 3-actor model vocabulary) [DOT1X-01]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 101-02-PLAN.md — Author `01-eap-method-overview.md` (co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS + 3-actor Mermaid) [DOT1X-02]
- [x] 101-05-PLAN.md — Insert one-directional see-also banners into the 4 existing platform glossaries [DOT1X-01]

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 101-03-PLAN.md — Author `02-cert-delivery-foundation.md` (ordering rule, scope callout/SC4, EKU, server-name validation, per-platform cert matrix) [DOT1X-03]

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 101-04-PLAN.md — Author `00-overview.md` (thin A2 navigation entry point + wired-gap flag) [DOT1X-01]

**UI hint**: no

### Phase 102: Windows 802.1X Admin-Setup (Wi-Fi + Wired)

**Goal**: An Intune admin can configure 802.1X on Windows devices for both Wi-Fi and wired connections across all three EAP methods, with critical pitfalls (dot3svc, enforcement staging, auth mode, server validation) prominently documented
**Depends on**: Phase 101
**Requirements**: DOT1X-04
**Success Criteria** (what must be TRUE):

  1. An admin can create a Windows Wi-Fi 802.1X profile in Intune covering EAP-TLS, PEAP-MSCHAPv2, and EAP-TTLS at co-equal depth with user/machine/user-or-machine authentication mode selection
  2. An admin can create a Windows wired 802.1X profile with the `dot3svc` service dependency documented (including an Intune Remediation pattern to ensure the service is running) and a DANGER callout for enforcement-mode staging
  3. An admin can configure SCEP, PKCS, or PFX Import client certificate delivery and understands the `PerformServerValidation` security requirement
  4. The Hybrid Entra Joined strong certificate mapping requirement (KB5014754, SID in SAN, effective 2025-02-11) is documented with a freshness stamp

**Plans**: 2 plans
**Wave 1**

- [x] 102-01-PLAN.md — Author `03-windows.md` (Common Mechanics + Wi-Fi + Wired; dot3svc/enforcement/KB5014754 callouts; all 3 EAP methods) [DOT1X-04]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 102-02-PLAN.md — Add the Windows platform-guide entry (item 3) to the local `00-overview.md` list [DOT1X-04]

**UI hint**: no

### Phase 103: macOS 802.1X Admin-Setup (Wi-Fi + Wired)

**Goal**: An Intune admin can configure 802.1X on macOS devices for both Wi-Fi and wired connections across all three EAP methods, with the immutable deployment-channel decision and wired SCEP-only constraint prominently documented before any configuration steps
**Depends on**: Phase 101
**Requirements**: DOT1X-05
**Success Criteria** (what must be TRUE):

  1. An admin can create a macOS Wi-Fi 802.1X profile for all three EAP methods and understands the deployment-channel (User vs Device keychain) decision must be made before profile creation and cannot be changed after assignment
  2. An admin can create a macOS wired 802.1X profile using the network interface selector and understands that PKCS cert delivery is not supported for wired profiles (SCEP only)
  3. An admin knows that the RADIUS server name field should be populated on macOS to suppress the dynamic trust dialog, and understands the outer-identity/identity-privacy options per EAP method

**Plans**: 2 plans
**Wave 1**

- [x] 103-01-PLAN.md — Author `04-macos.md` (Common Mechanics + Wi-Fi + Wired; deployment-channel WARNING; SCEP-only wired callout; all 3 EAP methods) [DOT1X-05]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 103-02-PLAN.md — Add the macOS platform-guide entry (item 4) to the local `00-overview.md` list [DOT1X-05]

**UI hint**: no

### Phase 104: iOS/iPadOS 802.1X Admin-Setup (Wi-Fi + Wired)

**Goal**: An Intune admin can configure 802.1X on iOS/iPadOS devices for both Wi-Fi and wired connections across all three EAP methods, with MAC-address randomization control for NAC environments and the M-series iPad wired use case clearly framed
**Depends on**: Phase 101
**Requirements**: DOT1X-06
**Success Criteria** (what must be TRUE):

  1. An admin can create an iOS/iPadOS Wi-Fi 802.1X profile for all three EAP methods and knows to set "Disable MAC address randomization: Yes" in NAC environments (iOS 14+, freshness-stamped)
  2. An admin can create an iOS/iPadOS wired 802.1X profile targeting M-series iPads with USB Ethernet, with the SCEP-only cert constraint and PKCS-not-supported callout documented
  3. An admin understands that PEAP inner authentication must be MS-CHAPv2 (not PAP) and that three separate Intune profiles are required (trusted root + SCEP/PKCS cert + Wi-Fi or Wired)

**Plans**: 2 plans
**Wave 1**

- [x] 104-01-PLAN.md — Author `05-ios.md` (Common Mechanics three-profiles prose + Wi-Fi + Wired; MAC-randomization NAC note; B-05 PEAP=MS-CHAPv2 WARNING; SCEP-only wired callout; M-series iPad wired use case; all 3 EAP methods) [DOT1X-06]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 104-02-PLAN.md — Add the iOS/iPadOS platform-guide entry (item 5) to the local `00-overview.md` list [DOT1X-06]

**UI hint**: no

### Phase 105: Android Enterprise 802.1X Admin-Setup (Wi-Fi + Wired Gap)

**Goal**: An Intune admin can configure 802.1X Wi-Fi on Android Enterprise devices across all AE modes with version-gated RADIUS server-name requirements documented, the UPN-in-SAN deployment failure risk called out, and the no-native-wired-profile gap leading the wired section
**Depends on**: Phase 101
**Requirements**: DOT1X-07
**Success Criteria** (what must be TRUE):

  1. An admin can configure Android Enterprise Wi-Fi 802.1X across COBO/COPE/COSU/BYOD Work Profile modes for all three EAP methods, with the UPN-in-SAN requirement (profile deployment fails if absent for personally-owned work profile) prominently documented
  2. The Android 11+ RADIUS server-name requirement and Android 14+ 256-char / no-special-chars limit are documented with `last_verified`/`review_by` freshness stamps
  3. The wired 802.1X section explicitly states no native Intune wired-network profile type exists for Android Enterprise and documents the gap with a brief explanation of alternatives

**Plans**: 2 plans

**Wave 1**

- [x] 105-01-PLAN.md — Author `06-android.md` (Common Mechanics + Wi-Fi: single-path mode-applicability matrix, per-EAP matrix, UPN-in-SAN BYOD WARNING, combined Android 11+/14+ version-gate WARNING, "Use device MAC" note; Wired gap stub) [DOT1X-07]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 105-02-PLAN.md — Add the Android Enterprise platform-guide entry (item 6) to the local `00-overview.md` list [DOT1X-07]

**UI hint**: no

### Phase 106: Linux 802.1X Admin-Setup (Script-Based EAP-TLS + Wired Gap)

**Goal**: An operator can configure 802.1X on Linux (Ubuntu LTS) using the documented Bash script + nmcli (NetworkManager `802-1x`) EAP-TLS workaround, with the no-native-Intune-profile reality leading the guide and PEAP/EAP-TTLS explicitly marked out of scope
**Depends on**: Phase 101
**Requirements**: DOT1X-08
**Success Criteria** (what must be TRUE):

  1. The guide opens with a prominent callout stating that Intune provides no native Wi-Fi, wired, or cert-delivery profiles for Linux, and that the approach documented is a shell-script workaround (not an Intune profile)
  2. An operator can follow the nmcli `802-1x.*` connection parameter steps for EAP-TLS and verify connectivity via `nmcli connection show`, `ip addr show`, and `journalctl -u NetworkManager`
  3. PEAP-MSCHAPv2 and EAP-TTLS are documented as out of scope with a one-sentence explanation (not in verifiable Microsoft/vendor sources), and the guide carries a MEDIUM-confidence callout noting the Linux Intune surface is actively developing with a freshness stamp

**Plans**: 2 plans
**Wave 1**

- [x] 106-01-PLAN.md — Author the Linux 802.1X EAP-TLS-via-nmcli guide (07-linux.md): lead gap WARNING, EAP scope note, Ubuntu 24.04/26.04 applies-to, out-of-band cert prerequisites, nmcli steps + two-column reference table, verification trio, Wired H2, MEDIUM-confidence freshness callout [DOT1X-08]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 106-02-PLAN.md — Fill item 7 (Linux) in the local 00-overview.md platform-guide list linking 07-linux.md [DOT1X-08]

**UI hint**: no

### Phase 107: L1 Runbooks #38-41 (802.1X Triage)

**Goal**: An L1 technician can triage any 802.1X connection failure using four new cross-platform runbooks routed by a new decision tree, with per-platform symptom leaves and clear escalation triggers to L2
**Depends on**: Phase 106
**Requirements**: DOT1X-09
**Success Criteria** (what must be TRUE):

  1. L1 runbook #38 (cert failure) enables a technician to verify cert-profile status in Intune, check the deployment ordering constraint, and identify the platform-specific event log or diagnostic signal to examine
  2. L1 runbooks #39 (RADIUS reject), #40 (server-trust/validation failure), and #41 (EAP negotiation failure) each provide a symptom description, first-check steps, per-platform diagnostic commands, and a clear escalation trigger
  3. Decision tree `docs/decision-trees/10-8021x-triage.md` routes L1 by symptom to the correct runbook with per-platform leaves

**Plans**: 3 plans (Wave 1: 01 + 02 in parallel; Wave 2: 03)
**Wave 1**

- [x] 107-01-PLAN.md — L1 runbooks #38 (cert failure, SC1) + #39 (RADIUS reject, SC2)
- [x] 107-02-PLAN.md — L1 runbooks #40 (server-trust failure, SC2) + #41 (EAP negotiation, SC2)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 107-03-PLAN.md — decision tree #10 8021x-triage (symptom-primary routing, SC3)

**Cross-cutting constraints:**

- Both runbooks use structure 1C per D-01: shared symptom + First Checks + compact per-platform diagnostic-signal table + per-platform escalation-divergence notes (SC2:213 four-part ordering)
- Both runbooks carry compound frontmatter per D-02: platform: windows+macos+ios+android+linux + audience: L1 + applies_to + 90-day last_verified/review_by pair

**UI hint**: no

### Phase 108: L2 Runbooks #31-33 + Decision Tree #10

**Goal**: An L2 engineer can investigate any 802.1X failure using three new runbooks covering cross-platform log collection, certificate-chain investigation, and RADIUS/EAP investigation, all anchored to a per-platform diagnostic-signal map
**Depends on**: Phase 107
**Requirements**: DOT1X-10
**Success Criteria** (what must be TRUE):

  1. L2 runbook #31 (log collection) documents the per-platform log sources (Windows Event Viewer WLAN-AutoConfig/Dot3Svc channels, macOS Console.app/wifi.log, iOS Intune portal, Android `adb logcat` 802.1X filters, Linux `journalctl` wpa_supplicant) and serves as the prerequisite for #32 and #33
  2. L2 runbook #32 (cert investigation) enables an engineer to validate the certificate chain, check SCEP profile deployment status per platform, and identify EKU / SAN / expiry issues
  3. L2 runbook #33 (RADIUS/EAP investigation) documents what information to request from the RADIUS/NPS team (not NPS configuration steps) and how to diagnose EAP method mismatch and server-name validation failures per platform

**Plans**: 4 plans (Wave 1: 01; Wave 2: 02 + 03 in parallel; Wave 3: 04 link-wiring)

**Wave 1**

- [x] 108-01-PLAN.md — Author `31-8021x-log-collection.md` (cross-platform 802.1X L2 log collection; per-platform signal map; prerequisite for #32/#33) [DOT1X-10]

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 108-02-PLAN.md — Author `32-8021x-cert-investigation.md` (per-platform cert chain / SCEP status / EKU-SAN-expiry) [DOT1X-10]
- [ ] 108-03-PLAN.md — Author `33-8021x-radius-eap-investigation.md` (RADIUS-team request checklist + per-platform EAP-mismatch + server-name-validation diagnosis) [DOT1X-10]

**Wave 3** *(blocked on Wave 2 completion — navigation-last)*

- [ ] 108-04-PLAN.md — Wire live L2 links into `decision-trees/10-8021x-triage.md` + the four L1 runbooks #38-41 (after #31-33 commit) [DOT1X-10]
**UI hint**: no

### Phase 109: 802.1X Integration — Capability Matrices + Navigation Hubs

**Goal**: All 802.1X content is discoverable from every existing entry point in the documentation suite — capability matrices carry 802.1X rows for all 5 platforms, and all six nav-hub files are wired (navigation-last, after all content is committed)
**Depends on**: Phase 108
**Requirements**: DOT1X-11
**Success Criteria** (what must be TRUE):

  1. Network-Authentication rows appear in all five platform capability matrices and in the 4-platform capability comparison, deriving from per-platform guide content with accurate YES/NO/STUB entries
  2. All six navigation hubs (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`) carry entries for the new 802.1X guides, runbooks, and decision tree
  3. Glossary see-also banners in all existing platform glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-ios.md`, `_glossary-android.md`, `_glossary-linux.md`) point to the new `_glossary-network.md`
  4. All navigation edits are committed after the content files they reference are confirmed committed (navigation-last invariant)

**Plans**: TBD
**UI hint**: no

### Phase 110: Pillar B + C — Corpus Fixes + MDM Migration Walkthroughs

**Goal**: Three v1.13-deferred accuracy nits in existing files are corrected, an iOS/iPadOS ABM Deadline migration walkthrough is authored, and Jamf Pro + Mosyle source-MDM release steps are added as an addendum — all independent of 802.1X content
**Depends on**: Phase 100 (v1.13 close; independent of Pillar A phases)
**Requirements**: FIX-01, FIX-02, FIX-03, MIGF-01, MIGF-02
**Success Criteria** (what must be TRUE):

  1. `docs/index.md:108` reflects the correct macOS L1-runbook count (updated to include #35, #36, #37 and any 802.1X additions landed in Phase 109)
  2. `docs/quick-ref-l1.md:101` surfaces L1 #36 as an L1 "try this first" entry (not an L2 escalation target), with surrounding L1 #37 wiring confirmed correct
  3. `docs/common-issues.md:242-247` includes the L1 #36 mandatory PSSO re-registration step as an intermediate between L1 #37 (local password reset) and L2 #27 escalation
  4. An admin can follow the iOS/iPadOS ABM "Assign Device Management" + Deadline migration walkthrough covering iOS/iPadOS-specific forced-restart behavior (vs macOS full-screen lock) and post-migration enrollment verification
  5. An admin can follow source-MDM-specific release steps for Jamf Pro and Mosyle (FileVault key retrieval, Activation Lock bypass, device-record deletion) in the `02-mdm-migration-psso.md` addendum

**Plans**: TBD
**UI hint**: no

### Phase 111: Pillar D — Chain-Validator Tooling Refactors

**Goal**: Three DRY refactors are applied to the validator chain with the byte-unchanged-invariant on all predecessor frozen surfaces maintained — TOOL-01 centralizes failure-detail extraction, TOOL-02 adopts the centralized frozen-aware module across 13 inline sites, TOOL-03 fixes helper-spawn stderr capture at 3 sites
**Depends on**: Phase 100 (v1.13 close; isolated from content phases to protect byte-unchanged invariant)
**Requirements**: TOOL-01, TOOL-02, TOOL-03
**Success Criteria** (what must be TRUE):

  1. A new `scripts/validation/_lib/exec-fail-detail.mjs` helper exists and the `(stdout + stderr).slice(0, N).trim()` failure-detail pattern is consumed from it at all CHAIN/AUDIT/helper-spawn wrapper sites (~18-21 sites); no inline duplicates remain
  2. The ~13 inline frozen-aware helpers across `check-phase-{61,67,68,70}.mjs` are replaced with calls to the centralized `_lib/frozen-at-close.mjs` module; behavior is byte-equivalent
  3. The 3 helper-spawn stderr-only catch-block sites in `check-phase-{48,60,61}.mjs` capture both stdout and stderr with a `--self-test` discriminator; the full chain exits 0 after all three refactors

**Plans**: TBD
**UI hint**: no

### Phase 112: Pillar E — 12th Path-A Audit-Harness Lineage Bump + Milestone Close

**Goal**: The 12th Path-A audit-harness lineage bump is complete (Atom 1 + Atom 2 indivisible commits), the 3-axis terminal re-audit passes with cross-OS EXACT MATCH, and all 22 v1.14 requirements are Validated in the single close-gate commit
**Depends on**: Phase 111 (all content and tooling phases complete; must be the sole deliverable of this phase)
**Requirements**: HARN-01, HARN-02, HARN-03
**Success Criteria** (what must be TRUE):

  1. Atom 1 (HARN-01) is committed as one indivisible 3-file commit: `v1.14-milestone-audit.mjs` (Path-A from v1.13, C1-C16 inherited verbatim) + `v1.14-audit-allowlist.json` (sidecar repointed) + BASELINE_18 freshness comment
  2. Atom 2 (HARN-02) is committed as one indivisible set: `check-phase-101..112.mjs` per-phase validators (chain-apex `CHAIN_PHASES=[48..111]`, 64 entries, `CHAIN_SKIP=new Set([])`) + `_lib/frozen-at-close.mjs` V113 entry (v1.13 close-gate SHA `ba24f1a`) + `audit-harness-v1.14-integrity.yml` as the 11th parallel CI coexistence workflow (predecessors v1.4-v1.13 byte-unchanged)
  3. The 3-axis terminal re-audit (HARN-03) passes: Axis 1 fresh `git clone --no-hardlinks`, Axis 2 cross-OS Linux GHA, Axis 3 fresh zero-context sub-agent — with cross-OS PASS/FAIL/SKIP EXACT MATCH; `v1.14-MILESTONE-AUDIT.md` + `v1.14-DEFERRED-CLEANUP.md` authored; single close-gate commit flips all 22 requirements to Validated
  4. All predecessor v1.4-v1.13 frozen surfaces are byte-unchanged through the close-gate commit

**Plans**: TBD
**UI hint**: no

## Progress

| Milestone | Phases | Status | Shipped |
|-----------|--------|--------|---------|
| v1.0 Autopilot Documentation & Troubleshooting Guides | 1-10 | ✅ Shipped | 2026-04-10 |
| v1.1 APv2 Documentation & Admin Setup Guides | 11-19 | ✅ Shipped | 2026-04-13 |
| v1.2 Cross-Platform Provisioning & Operational Gaps | 20-25 | ✅ Shipped | 2026-04-15 |
| v1.3 iOS/iPadOS Provisioning Documentation | 26-33 | ✅ Shipped | 2026-04-19 |
| v1.4 Android Enterprise Enrollment Documentation | 34-42 | ✅ Shipped | 2026-04-24 |
| v1.4.1 Android Enterprise Completion & v1.4 Cleanup | 43-47 | ✅ Shipped | 2026-04-25 |
| v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup | 48-61 | ✅ Shipped | 2026-05-07 |
| v1.6 Apple Business Delegated Governance & Multi-Org Operations | 62-66 | ✅ Shipped | 2026-05-25 |
| v1.7 Deferred Backlog Closure + Validator Chain Hardening | 67-70 | ✅ Shipped | 2026-05-29 |
| v1.8 Tooling Debt Closure + Chain-Resilience Hardening | 71-74 | ✅ Shipped | 2026-06-08 |
| v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation | 75-82 | ✅ Shipped | 2026-06-22 |
| v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL | 83-88 | ✅ Shipped | 2026-06-24 |
| v1.11 macOS PSSO End-to-End Provisioning & MDM Migration | 89-93 | ✅ Shipped | 2026-06-26 |
| v1.12 macOS MDM-Migration Verification Closure | 94-95 | ✅ Shipped | 2026-06-26 |
| v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth | 96-100 | ✅ Shipped | 2026-06-29 |
| v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure | 101-112 | 🚧 In Progress | — |

### v1.14 Phase Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 101. 802.1X Foundation | 5/5 | Complete   | 2026-06-30 |
| 102. Windows 802.1X Admin-Setup | 2/2 | Complete    | 2026-06-30 |
| 103. macOS 802.1X Admin-Setup | 2/2 | Complete    | 2026-06-30 |
| 104. iOS/iPadOS 802.1X Admin-Setup | 2/2 | Complete    | 2026-06-30 |
| 105. Android Enterprise 802.1X Admin-Setup | 2/2 | Complete    | 2026-06-30 |
| 106. Linux 802.1X Admin-Setup | 2/2 | Complete    | 2026-07-01 |
| 107. L1 Runbooks #38-41 | 3/3 | Complete    | 2026-07-01 |
| 108. L2 Runbooks #31-33 + Decision Tree #10 | 1/4 | In Progress|  |
| 109. 802.1X Integration — Matrices + Nav Hubs | 0/TBD | Not started | - |
| 110. Corpus Fixes + MDM Migration Walkthroughs | 0/TBD | Not started | - |
| 111. Chain-Validator Tooling Refactors | 0/TBD | Not started | - |
| 112. 12th Path-A Harness Lineage Bump + Close | 0/TBD | Not started | - |
