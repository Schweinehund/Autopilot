# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- 🔄 **v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure** — Phases 129-134 (in progress)
- ✅ **v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)** — Phases 126-128 (shipped 2026-07-11)
- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** — Phases 120-125 (shipped 2026-07-10)
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** — Phases 113-119 (shipped 2026-07-06)
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** — Phases 101-112 (shipped 2026-07-02)
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** — Phases 96-100 (shipped 2026-06-29)
- ✅ **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (shipped 2026-06-26)
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (shipped 2026-06-26)
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (shipped 2026-06-24)
- ✅ **v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation** — Phases 75-82 (shipped 2026-06-22)
- ✅ **v1.8 Tooling Debt Closure + Chain-Resilience Hardening** — Phases 71-74 (shipped 2026-06-08)
- ✅ **v1.7 Deferred Backlog Closure + Validator Chain Hardening** — Phases 67-70 (shipped 2026-05-29)
- ✅ **v1.6 Apple Business Delegated Governance & Multi-Org Operations** — Phases 62-66 (shipped 2026-05-25)
- ✅ **v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup** — Phases 48-61 (shipped 2026-05-07)
- ✅ **v1.4.1 Android Enterprise Completion & v1.4 Cleanup** — Phases 43-47 (shipped 2026-04-25)
- ✅ **v1.4 Android Enterprise Enrollment Documentation** — Phases 34-42 (shipped 2026-04-24)
- ✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-19)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)

## Phases

- [x] **Phase 129: Device Recipe Doc-Class Foundation** - New "Device Recipe" doc class + template + decision-point block spec locked before content authoring (completed 2026-07-17)
- [x] **Phase 130: Recipe #1 — Shared Windows AVD-Client Device** - Self-deploying Entra-joined shared Windows device running Windows App as an AVD client, plus RE-084 Wi-Fi-claim hygiene fix (completed 2026-07-17)
- [x] **Phase 131: Recipe #2 — Shared iPad Full Provisioning** - Fully-provisioned Shared iPad from ADE enrollment through verification (completed 2026-07-18)
- [x] **Phase 132: Integration & Navigation-Last Close** - Both recipes registered, published, and discoverable (completed 2026-07-19)
- [ ] **Phase 133: Chain-Validator Tooling Debt Closure** - Frozen-aware adoption sweep + O(n²) chain-runner fix + carried nits
- [ ] **Phase 134: V117 Pin + 16th Path-A Lineage Bump + Terminal Close** - Mandatory harness lineage bump + 3-axis re-audit + close-gate

<details>
<summary>✅ v1.0–v1.17 (Phases 1-128) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)** (Phases 126-128) — SHIPPED 2026-07-11 — `.planning/milestones/v1.17-ROADMAP.md`
- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** (Phases 120-125) — SHIPPED 2026-07-10 — `.planning/milestones/v1.16-ROADMAP.md`
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** (Phases 113-119) — SHIPPED 2026-07-06 — `.planning/milestones/v1.15-ROADMAP.md`
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** (Phases 101-112) — SHIPPED 2026-07-02 — `.planning/milestones/v1.14-ROADMAP.md`
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** (Phases 96-100) — SHIPPED 2026-06-29 — `.planning/milestones/v1.13-ROADMAP.md`
- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ v1.0–v1.10 (Phases 1-88) — see milestone entries and `.planning/milestones/`

</details>

## Phase Details

### Phase 129: Device Recipe Doc-Class Foundation

**Goal**: A new Device Recipe doc class exists — standard ruling, template, and admin decision-point block format all locked — so both recipes can be authored consistently without retrofitting.
**Depends on**: Nothing (first phase of v1.18)
**Requirements**: CLASS-01, CLASS-02
**Success Criteria** (what must be TRUE):

  1. `docs/_standards/EEE-SOP-standard.md` carries a D-02 edge-case ruling row classifying `docs/recipes/*` as `doc_type: Guide` (the closed 4-value enum is not extended), plus a written spec for the admin decision-point block format.
  2. A canonical `docs/_templates/recipe-template.md` exists, is C17-green, and contains a worked decision-point block example with the TEMPLATE-SENTINEL convention.
  3. The decision-point block format (resolved via `/adversarial-review`) is documented precisely enough that Phases 130/131 apply it without further design decisions.**Plans**: 2 plans

**Wave 1**

- [x] 129-01-PLAN.md — Author STD-05 decision-point spec + D-02 recipe ruling in EEE-SOP-standard.md; fix ARCHITECTURE.md:61 (CLASS-01)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 129-02-PLAN.md — Create C17-green recipe-template.md with worked decision-point examples (CLASS-02)

**Discuss-phase flags**: CLASS-01 decision-point block format (dominant gray area for the content pillar — decision table vs. blockquote vs. composite, constrained by C17 #12's 200-char cap and the no-code-fence rule).

### Phase 130: Recipe #1 — Shared Windows AVD-Client Device

**Goal**: An Intune admin can follow a complete recipe to provision a self-deploying, Entra-joined shared Windows device running Windows App as an AVD client, covering both major configuration forks and the highest-cost pitfalls.
**Depends on**: Phase 129 (template + decision-point format must be locked first)
**Requirements**: AVD-01, AVD-02, AVD-03, AVD-04, AVD-05, HYG-04
**Success Criteria** (what must be TRUE):

  1. `docs/recipes/01-*.md` walks a linear happy path from zero to a verified working shared AVD-client device: self-deploying profile → device-phase ESP → dynamic group → Windows App (Store, Required, device-context) → feed/workspace subscription → verification.
  2. The kiosk-lockdown (Assigned Access) and Shared PC (SharedPC CSP) decision-point branches are both worked as complete step-by-step paths, with the Shell-Launcher/Assigned-Access mutual-exclusion constraint stated.
  3. The four highest-cost anti-features (hybrid Entra join, APv2/Device Preparation, Wi-Fi at OOBE, retired legacy MSRDC client) are called out explicitly.
  4. Session-hygiene/patch-cadence decision points (session-reset behaviors, `InactiveThreshold`, kiosk-tuned update ring) are documented, and the wired-vs-Wi-Fi decision point cross-links the existing 802.1X corpus without duplicating it.
  5. RE-084's "Wi-Fi unsupported for self-deploying" claim is independently re-verified against current Microsoft Learn; corrected with an updated `last_verified` if stale, or the verification result is recorded as a no-op if still accurate.

**Plans**: 2 plans

**Wave 1**

- [x] 130-01-PLAN.md — HYG-04: correct RE-084's stale Wi-Fi-unsupported claim (6 sites) + freshness/changelog

**Wave 2** *(blocked on Wave 1 — recipe links the corrected RE-084)*

- [x] 130-02-PLAN.md — Author docs/recipes/01-shared-windows-avd-client.md (AVD-01..05: spine, kiosk/SharedPC forks, anti-feature table, session-hygiene, 802.1X cross-link)

**Discuss-phase flags**: AVD-02 kiosk-path depth (MEDIUM-confidence `Azure/WindowsAppKiosk` sourcing needs plan-time verification); AVD-01 feed-subscription mechanism (device-context vs. user-context `AutoSubscription` CSP scope conflict); HYG-04 disposition (fix-or-record, decided by the plan-time verification result).

### Phase 131: Recipe #2 — Shared iPad Full Provisioning

**Goal**: An Intune admin can follow a complete recipe to provision a fully-configured Shared iPad, with unsupported-feature traps surfaced up front rather than discovered via silent failure.
**Depends on**: Phase 129 (template + decision-point format must be locked first); no dependency on Phase 130 (parallelizable in principle, executed sequentially per `use_worktrees:false`)
**Requirements**: IPAD-01, IPAD-02, IPAD-03, IPAD-04
**Success Criteria** (what must be TRUE):

  1. `docs/recipes/02-*.md` walks a linear happy path from zero to a verified working Shared iPad: ADE enrollment profile (Shared iPad = Yes, Supervised, no user affinity) → device eligibility floors → federated Managed Apple Account sign-in (cross-linked, not re-derived) → device-licensed Required VPP apps → device-vs-user profile-applicability split → home screen layout → verification.
  2. The recipe leads with unsupported-feature callouts (compliance policy, Conditional Access, app protection, email profiles, Company Portal, "Available" intent, user-licensed VPP) documented with WHY, and embeds the temporary/guest-session on-or-off admin decision-point block.
  3. A per-role layered-configuration worked example shows the device-group baseline + user-group overlay pattern, including the never-set-the-same-setting-twice conflict warning.
  4. Storage/session sizing decision points (per-user storage quota, session idle timeout + offline grace period, cached-users-per-device planning) are documented as admin decisions, not bare config fields.

**Plans**: 2 plans

**Wave 1**

- [x] 131-01-PLAN.md — Scaffold RE-223 + all-unsupported anti-feature table/passcode note (IPAD-02) + ADE-enrollment/sizing/sign-in/VPP happy-path front (IPAD-01, IPAD-04)

**Wave 2** *(blocked on Wave 1 — same single recipe file, serialized)*

- [x] 131-02-PLAN.md — Per-role layered-config worked example + conflict warning (IPAD-03), on-device verification/failures/See-Also, full-corpus C17 green gate (IPAD-01)

### Phase 132: Integration & Navigation-Last Close

**Goal**: Both recipes are registered, published, and discoverable — the doc-class integration is proven end-to-end on real content.
**Depends on**: Phase 130, Phase 131 (both recipes must be content-complete first — navigation-last discipline)
**Requirements**: CLASS-03, CLASS-04
**Success Criteria** (what must be TRUE):

  1. Both recipes live in `docs/recipes/`, carry RE-NNN rows in `docs/_registry/RE-index.md` at `Status: Approved`, and appear in a regenerated (never hand-edited) `filename-map.md` with zero pipeline code changes.
  2. `docs/index.md` gains a new recipes section linking both recipes, committed after both recipes are content-complete.
  3. `common-issues.md` / `quick-ref-l1.md` / `quick-ref-l2.md` are confirmed NOT wired to the recipes (recipes are provisioning Guides, not troubleshooting docs).
  4. C17 exits 0 on the full corpus including both new recipe files.

**Plans**: 2 plans

**Wave 1**

- [x] 132-01-PLAN.md — Register RE-222/223: flip Draft->Approved, append registry rows, regenerate filename-map (CLASS-03)

**Wave 2** *(blocked on Wave 1 completion — navigation-last)*

- [x] 132-02-PLAN.md — Add dedicated recipes section to index.md, confirm hubs not wired, C17 green (CLASS-04)

### Phase 133: Chain-Validator Tooling Debt Closure

**Goal**: The accumulated chain-validator tooling debt (frozen-aware adoption gaps, O(n²) chain-runner cost, carried retrospective nits) is resolved, structurally isolated from the content phases' work.
**Depends on**: None (structurally independent of Phases 129-132; sequenced after content per the project's frozen-surface-blast-radius isolation convention)
**Requirements**: TOOL-04, TOOL-05, TOOL-06
**Success Criteria** (what must be TRUE):

  1. The 11 standalone-RED predecessor CI workflows (v1.4-v1.16 harness jobs + base harness-replay) are green or formally re-dispositioned per whichever `/adversarial-review`-resolved TOOL-04 approach wins.
  2. Chain-validator subprocess results are cached within a single apex invocation — the deepening chain apex stops O(n²) cold-spawning — with Windows cold-clone apex behavior verified post-fix (Linux GHA remains authoritative per D-03).
  3. `HELPER-SPAWN-STDERR-01`'s residual slice-budget tuning at the 3 helper-spawn stderr sites is closed, along with any `DEFER-119-A` resolution that falls out of the TOOL-04 approach decision.

**Plans**: 4 plans

**Wave 1** *(parallel-eligible — zero file overlap; run sequentially on main tree per use_worktrees:false)*

- [x] 133-01-PLAN.md — TOOL-04 pin recon: freshness-guard + 6-target old->new coordinate tables + identity-preserving fragmentation list, no edits (TOOL-04)
- [x] 133-03-PLAN.md — TOOL-05 verify-and-attest single-apex O(n) + Windows cold-clone, no code; CARVE-2 hand-off (TOOL-05)
- [ ] 133-04-PLAN.md — TOOL-06 raise 3 --self-test stderr slice budgets, separate D-00a commit; DEFER-119-A ACCEPTED-ADVISORY (TOOL-06)

**Wave 2** *(blocked on 133-01 — needs the coordinate tables)*

- [ ] 133-02-PLAN.md — TOOL-04 apply re-pin to 14 sidecars, per-category green, atomic D-00a-exception commit; CARVE-1 hand-off (TOOL-04)

**Discuss-phase flags**: TOOL-04 approach (dominant gray area for the tooling pillar — (a) targeted frozen-sidecar re-pin vs. (b) frozen-aware own-close-snapshot reads; a genuine D-00a frozen-surface-edit exception decision).

### Phase 134: V117 Pin + 16th Path-A Lineage Bump + Terminal Close

**Goal**: The milestone closes with the mandatory back-anchor pin, the harness lineage bump, and a 3-axis re-audit — the sole deliverable cluster of this phase, per project convention.
**Depends on**: Phase 133 (all content + tooling work complete and green before the closing lineage bump + re-audit; mirrors Phase 100/112/119/125/128 precedent — harness close never batches with content/tooling work)
**Requirements**: HARN-11, HARN-12, HARN-13
**Success Criteria** (what must be TRUE):

  1. `_lib/frozen-at-close.mjs` gains the **V117** entry (v1.17 close-gate SHA positively confirmed via dual-token grep, subject-line verified per the v1.17 false-positive caveat) + `readAtV117Close` export.
  2. `v1.18-milestone-audit.mjs` (Path-A, C1-C17 inherited) + `v1.18-audit-allowlist.json` + BASELINE_22 + `check-phase-129..134.mjs` validators + the 15th CI coexistence workflow all exist and pass; predecessor frozen surfaces are byte-unchanged except the explicitly-scoped TOOL-04 remediation, with `CHAIN_SKIP` empty.
  3. A 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators + fresh zero-context sub-agent) achieves cross-OS PASS/FAIL/SKIP EXACT MATCH.
  4. A single close-gate commit flips all 20 v1.18 requirements to Validated across PROJECT/ROADMAP/STATE/REQUIREMENTS, alongside `v1.18-MILESTONE-AUDIT.md` and `v1.18-DEFERRED-CLEANUP.md`.

**Plans**: TBD

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
| v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure | 101-112 | ✅ Shipped | 2026-07-02 |
| v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1) | 113-119 | ✅ Shipped | 2026-07-06 |
| v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing | 120-125 | ✅ Shipped | 2026-07-10 |
| v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation) | 126-128 | ✅ Shipped | 2026-07-11 |
| v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure | 129-134 | 🔄 In Progress | - |

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 129. Device Recipe Doc-Class Foundation | 2/2 | Complete    | 2026-07-17 |
| 130. Recipe #1 — Shared Windows AVD-Client Device | 2/2 | Complete    | 2026-07-17 |
| 131. Recipe #2 — Shared iPad Full Provisioning | 2/2 | Complete    | 2026-07-18 |
| 132. Integration & Navigation-Last Close | 2/2 | Complete    | 2026-07-19 |
| 133. Chain-Validator Tooling Debt Closure | 2/4 | In Progress|  |
| 134. V117 Pin + 16th Path-A Lineage Bump + Terminal Close | 0/? | Not started | - |
