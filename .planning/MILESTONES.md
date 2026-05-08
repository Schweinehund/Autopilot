# Milestones: Windows Autopilot Troubleshooter

## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-08)

**Phases completed:** 14 phases, 101 plans, 70 tasks

**Key accomplishments:**

- One-liner:
- SUBSUMED BY PLAN 48-01.
- SUBSUMED BY PLAN 48-01.
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- Co-management overview with 7 CB 2503 workloads, 3 slider states (Pilot Intune collection-scoped disambiguation H2), Resource Access deprecation note (CB 2203/CB 2403), Device Configuration implicit-switching callout, and cross-platform Platform applicability blockquote at TOP (macOS/iOS/Android analog migration paths with corrected cross-link targets)
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- Found during:
- NO COMMIT
- NO COMMIT MADE.
- This plan does NOT commit.
- NO COMMIT.
- NOT COMMITTED.
- MUST ship in same atomic commit as:
- Pre-edit:
- Hash:
- Total file size:
- NO COMMIT MADE.
- Choice: Option (a) — dedicated `## Reclamation Workflow` H2 sub-section beneath the comparison table.
- One-liner:
- 1. [Rule 1 — Validator-tuning bug] V-55-13 ASCII-art node-count regex too narrow
- None.
- Windows Intune Remediations drift detection guide with DRIFT-01 portal path + 3 status report literals + DRIFT-02 canonical script-authoring pattern (exit 1/exit 0) + Log Analytics surface + v1.2 registration-drift cross-link
- One-liner:
- File:
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- File existence:
- Insertion position:
- Single deliverable:
- One-liner:
- Pre-edit anchor inventory captures 24 pre-retrofit + 3 expected post-retrofit + 2 compat shim anchors across 4 capability matrices; PITFALL-6 / PITFALL-15 baseline locked at HEAD 22161b9b for Phase 58 close cross-check.
- 5-platform capability comparison doc shipped at `docs/reference/4-platform-capability-comparison.md` with 6 H2s × 5 platform columns × 48 rows = 240 link-bearing data cells (100% verdict + em-dash + matrix-anchor link compliance); D-09 APv1/APv2 footnote applied to 3 Enrollment rows; D-10 Windows-source-acknowledgment intro present; SC#1 + SC#2 + SC#5 satisfied; DEFER-08 / AECOMPARE-01 / CLEAN-05 closed.
- Sibling matrix intro cross-refs added to macOS/iOS/Android (D-12 5C); Linux `(when shipped)` hedge closed at lines 70+112 (D-13); Android footer F3 applied (body retargeted, anchor preserved, intro forward-link added) — D-14 satisfied; W-8 Android `five → six locked domains` rewrite landed; Phase 45 AEAOSPFULL-09 anchor untouched.
- Plan goal:
- C12 promoted from informational → blocking via single-line removal of `informational: true` flag at v1.5-milestone-audit.mjs:508 + Rule 1 col-0 cell-shape fix to C12 verifier; V-58-25 in check-phase-58.mjs flips FAIL → PASS; full 26/26 V-58-NN PASS achieved; harness exit 0 with C12 PASS in blocking mode; AUDIT-04 contract honored at Phase 58 close per D-17 routing override
- Phase 58 (DEFER-08) closed; 5/5 SCs satisfied; 26/26 V-58-NN PASS; 12/12 v1.5-milestone-audit checks PASS (including newly-promoted C12 in blocking mode); CLEAN-05 + AUDIT-04 + AUDIT-06 closed; comparison doc + 4 modified sibling matrices + validator + harness promotion + C2 carry-over resolution all landed across 7-plan progressive-landing (16b98ad..3f1ec7f + close commit).
- 1. Quick-ref H2 naming differs from CONTEXT prose estimate
- One-liner:
- ops/00-index.md expanded from a 25-line stub to a fully-populated cross-platform operations routing table with 4 H2 sections (Co-Management + Patch + App + Drift) covering all 15 sub-dir files across Phases 53-56 deliverables; discharges DPO-Phase56-01 hand-off chain
- One-liner:
- One-liner:
- One-liner:
- 1. [Rule 1 - Known validator issue] CRLF line endings cause H3 regex matching failure
- One-liner:
- One-liner:
- 10 GFM-honored `<a id="..."></a>` anchor shims added across 4 macOS L1 runbooks via D-08(b) HTML-shim cluster-edit pattern; 10 of 51 Category A baseline broken-anchor findings closed; mlc 3.14.2 confirms 0 broken refs in fixed files post-edit
- V-53-06/V-53-22 aligned with Phase 59 D-10 supersession (check-phase-53.mjs 24->26 PASS; V-60-16 FAIL->PASS); docs/index.md Choose Your Platform expanded to 7 bullets with Linux + Operations jump-links
- 43 of 44 active REQUIREMENTS.md checkboxes flipped with inline traceability comments per CONTEXT D-09 template; 4 stale ROADMAP §Progress rows reconciled; active section has exactly 1 unchecked req (AUDIT-08 deferred to Plan 61-04)
- Single atomic commit migrating 56 v1.5 reqs to §Validated + appending ## Closed Deferred Items (v1.4.1 → v1.5) subsection + adding 7-bullet v1.5 milestone narrative to §What's been built — no harness regression (12/12 PASS + 25/25 PASS).
- v1.5 milestone closed: check-phase-61.mjs 34/34 PASS; MILESTONES.md entry inserted; all 14 v1.5 phases marked Complete in ROADMAP; 57/57 reqs traceable; harness lineage check-phase-48..61.mjs complete

---

## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)

**Phases completed:** 14 phases (48-61), 96+ plans, ~150 tasks
**Timeline:** 2026-04-26 → 2026-05-07 (~12 days)
**Audit status:** `passed` (.planning/milestones/v1.5-MILESTONE-AUDIT.md; terminal re-audit: 12/12 v1.5-milestone-audit.mjs PASS in fully-blocking mode; all 12 chain validators check-phase-{48..60}.mjs PASS; regenerate-supervision-pins.mjs --self-test PASS; all 57 requirements closed)
**Git range:** `e19ee90` (Phase 48 context capture) → Phase 61 Plan 61-05 close commit

**Key accomplishments:**

- **Pillar 1 — Cleanup & Cross-Platform Hardening** (Phases 48 + 57 + 58 + 59 + 60, CLEAN-01..08) — Android nav unification (DEFER-07 closure at Phase 57: backport into `docs/index.md` + `docs/common-issues.md` + `docs/quick-ref-l1.md` + `docs/quick-ref-l2.md`); 4-platform capability comparison (DEFER-08 closure at Phase 58: `docs/reference/4-platform-capability-comparison.md`, 5 platform columns × 6 H2 domains × 48 feature rows = 240 link-bearing data cells per D-01 cell-shape compliance); hub navigation integration (Phase 59: `docs/index.md` `## Linux Provisioning` + `## Operations` H2s; `docs/operations/00-index.md` cross-platform 4-domain index per DPO-Phase56-01 hand-off discharge); broken-link sweep (Phase 48 first-pass + Phase 60 second-pass: 75 Phase 48 baseline findings closed — 60 FIXED-PHASE-60 + 15 ALLOWLISTED); glossary cross-reference normalization across all 5 platform glossaries at Phase 59 Plan 59-05 (CLEAN-08).
- **Pillar 2 — Linux via Intune (Ubuntu 22.04/24.04 LTS) as 5th platform** (Phases 49-52, LIN-01..13) — Ubuntu LTS taxonomy + glossary (`_glossary-linux.md` with 9 Linux-native terms + reciprocal see-also entries to all 4 existing glossaries) at Phase 49; admin setup guide with Identity Broker v2.0.2+ re-enrollment pitfall callout + 4-category compliance + `linux-capability-matrix.md` (bilateral cross-links to 4-platform-comparison per C12 gate) + end-user enrollment walkthrough at Phase 50; 4 L1 runbooks (enrollment-failed / non-compliant / CA-blocking-Edge / agent-service-not-running) + Mermaid triage tree at Phase 51 (commits `c8a644d` + `57c5f8d`); 2 L2 investigation runbooks (24-linux-log-collection + 25-linux-agent-investigation) with journalctl patterns + intune-portal log paths at Phase 52 (commit `38e25e9`).
- **Pillar 3 — Operational Depth (Windows + macOS + iOS + Android)** (Phases 53-56, COMG-01..05 + PATCH-01..08 + APP-01..08 + DRIFT-01..07) — Co-management workload sliders + tenant attach disambiguation + Autopatch prereqs (Phase 53, commit `8d37ab2`); WUfB rings + Hotpatch (Windows 11 Enterprise 24H2+ default May 2026) + macOS DDM (legacy MDM commands deprecated Apple OS 26) + iOS DDM (supervised-only constraint retracted iOS 17+) + Play Integrity MEETS_STRONG_INTEGRITY enforcement + Zebra LifeGuard (Phase 54, commit `be7f59d`); Win32 supersedence/dependency graphs + macOS .pkg/.dmg pipelines + Installomator MEDIUM-confidence callout + iOS VPP licensing + Android MGP + Zebra OEMConfig APK side-load (Phase 55, commit `aecf014`); Windows Intune Remediations + cross-platform drift detection + tenant-to-tenant migration runbooks (BitLocker re-key + ABM token re-issue + MGP re-binding) + cross-platform encryption-drift section (Phase 56, commits `4dd7122` + `6b26488`).
- **Pillar 4 — Validation Tooling** (Phases 48 + 60 + 61, AUDIT-01..08) — Path-A copy `v1.4.1-milestone-audit.mjs` → `v1.5-milestone-audit.mjs` at Phase 48 (AUDIT-01); C10 Linux frontmatter check added as blocking (AUDIT-02); C11 ops-domain anti-patterns + C12 4-platform comparison structural + C13 broken-link automation scaffolded informational (AUDIT-03/04/05) then promoted to blocking at Phase 60 Plan 60-08 atomic harness commit `c2abdd4` (AUDIT-03/04/05); BASELINE_9 refreshed + `--self-test` exits 0 (AUDIT-07, commit `c2abdd4`); `check-phase-60.mjs` validator-as-deliverable (AUDIT-06, commit `6626253`); Phase 61 Plan 61-04 v1.5-MILESTONE-AUDIT.md authored from fresh auditor worktree confirming 12/12 PASS + AUDIT-08 closed (commit `690624d`); `check-phase-61.mjs` close-gate validator with 34 V-61-NN assertions (this plan, commit `d80090c`).

**v1.4.1 deferred items closed:** DEFER-07 (Cross-Platform Navigation Unification — Phase 57, commits `1dee562` + `867560c`); DEFER-08 (4-Platform Capability Comparison — Phase 58 Plan 58-03, commits `0a55ecd` + `629d7fc`).

**Known deferred items at close (routed to v1.5.1 or v1.6+):** LIN-DEFER-01 (Linux custom compliance Bash deep-dive — v1.5.1); RHEL-01 (RHEL 9/10 Intune Linux client — v1.6+); BYOPC-01 (BYOPC/Cloud PC/W365/AVD — v1.6+); WEB-01 (Entra app gallery + SCIM — v1.6+); CHROMEOS-01 (ChromeOS Google Admin — v1.6+); CODE-01 (PowerShell+FastAPI+React scaffolding — v1.6+).

**Methodology highlights:** Wave-based parallel execution (Wave A: Phases 51+53 disjoint file sets; Wave B: Phases 54+55+56 three concurrent executor branches); progressive-landing per-plan commits (Phases 56/58/59/60 multi-commit progressive-landing + atomic close per Phase 43 D-07 contract); auditor-independence via fresh worktree spawn at Plan 61-04 (mirrors Phase 47 Plan 47-04 v1.4.1 close precedent — worktree `agent-a5336372f28300cea` distinct from Plans 61-01/02/03 author-agents per CONTEXT D-22); informational-first harness check rollout (C9/C11/C12/C13 scaffolded without breaking pre-existing PASS state then promoted to blocking at Phase 60 Plan 60-08 per CONTEXT D-25 graduation pattern); atomicity-contract single-commit harness changes (Phase 60 Plan 60-08 atomic harness commit `c2abdd4` landed C9/C11/C13 promotion + C12 H2 expansion + 3 sidecar arrays + BASELINE_9 refresh simultaneously); 75-finding broken-link inventory closure (Phase 48 baseline → Phase 60 second-pass triage: 60 FIXED + 15 ALLOWLISTED; PITFALL-14/15 mitigated via sidecar); chain validator lineage from check-phase-48.mjs through check-phase-61.mjs (13 per-phase validators, all registered in `audit-harness-v1.5-integrity.yml`).

---

## v1.4.1 Android Enterprise Completion & v1.4 Cleanup (Shipped: 2026-04-25)

**Phases completed:** 5 phases (43-47), 33 plans, 40 tasks
**Timeline:** 2026-04-24 → 2026-04-25 (~2 days)
**Audit status:** `passed` (v1.4 milestone audit re-flipped from `tech_debt` via terminal re-audit; all 6 v1.4 deferred items closed)
**Git range:** `a868882` (43-01 audit harness rescue) → `ed3bb4e` (47-VERIFICATION PASSED)

**Key accomplishments:**

- **v1.4 cleanup & audit harness fix** (Phase 43, 10 plans, AEAUDIT-02..05) — Restored `v1.4-audit-allowlist.json` sidecar to persistent `scripts/validation/` (atomic harness-line-57 update); expanded allow-list from ~10 to 18 supervision pins + 4 SafetyNet (flipped C2 FAIL→PASS); normalized 60-day freshness across L2 runbooks 18-21 + Android admin template sentinel; trimmed `06-aosp-stub.md` 1089→696 words (PITFALL-7 + 9-H2 + 8-OEM locks preserved, RealWear deep content migrated to Phase 45 prep shell); shipped `regenerate-supervision-pins.mjs` helper with self-test dogfood gate; bootstrapped first CI surface (4-job GitHub Action + native-shell pre-commit hook).
- **Knox Mobile Enrollment shipped** (Phase 44, 7 plans, AEKNOX-01..07) — Samsung KME admin guide as 4th-portal overlay on the tri-portal pattern with 5-SKU disambiguation H2 (KME / KPE Std / KPE Premium / Knox Suite / Knox Manage / Knox Configure); B2B Step 0 onboarding gate; L1 runbook 28 + L2 runbook 22 (Play Integrity 3-tier, zero SafetyNet); capability matrix `#knox-mobile-enrollment-row` anchor renamed and populated; `00-overview.md` Mermaid extended 5→6 branches; reciprocal Phase 35 ZT mutex callout + Phase 36 COBO Samsung-admin retrofit closing v1.4 forward-promises.
- **Per-OEM AOSP coverage shipped** (Phase 45, 10 plans, AEAOSPFULL-01..09) — 5 per-OEM admin guides — RealWear (HMT-1/HMT-1Z1/Navigator 500, REQUIRED Wi-Fi-QR-embedding), Zebra WS50 (REQUIRED OEMConfig APK push, two-OEMConfig-app disambiguation, Android-12-NOT-supported), Pico (4 Enterprise + Neo3 Pro/Eye, OPTIONAL Business Suite coexistence), HTC VIVE Focus (3-model firmware matrix, simplest baseline NO add-on H2s), Meta Quest (4-portal pattern, mandatory Feb 20 2026 wind-down callout, Meta Horizon ALIVE-in-transformed-form framing); 5-OEM `aosp-oem-matrix.md` reference; L1 runbook 29 (5 OEM-scoped Causes A-E) + L2 runbook 23 (1:1 Pattern routing); ANDR29 single-target swap closing ANDE1 escalation stub; PITFALL-7 framing preserved across all 5 OEM docs.
- **COPE Full Admin shipped** (Phase 46, 2 plans, AECOPE-01..04) — `08-cope-full-admin.md` parallel-structured to COBO with Path A LOCKED full-admin scope (NOT deprecation-rationale); Android 15 Private space ⚠️ unmanaged callout (NEW for v1.4.1); 5×3 COPE-vs-COBO decision matrix; Android 11+ removal of NFC + afw#setup + token-entry methods; atomic same-commit Wave 2 retrofit landing capability matrix COPE column at index 1, Private Space row across all modes, COBO migration-note γ3 sentence-scoped trim, glossary Private Space H3.
- **Integration & terminal re-audit** (Phase 47, 4 plans, AEINTEG-01..04) — Atomic glossary alphabetical re-canonicalization (Provisioning Methods H3 reorder); audit harness extended (C4 regex 8→24 tokens; C6 PITFALL-7 preservation 1→6 files; C7 Knox attribution 5→11 forms; C9 COPE banned-phrase 3→8 patterns) with informational-first grace; **terminal re-audit via `v1.4.1-milestone-audit.mjs` exits 0 (8/8 PASS) and flips v1.4-MILESTONE-AUDIT.md `status: tech_debt → passed`** with `re_audit_resolution` sibling block recording DEFER-01..06 closing SHAs; PROJECT.md AEAUDIT-02..05 / AEKNOX-01..07 / AEAOSPFULL-01..09 / AECOPE-01..04 / AEINTEG-01..04 all flipped Active→Validated.

**v1.4 deferred items closed:** DEFER-01 (allow-list expansion), DEFER-02 (60-day freshness), DEFER-03 (AOSP stub re-validation), DEFER-04 (Knox Mobile Enrollment), DEFER-05 (full AOSP per-OEM expansion), DEFER-06 (COPE full admin). DEFER-07 (cross-platform nav unification) and DEFER-08 (4-platform comparison doc) remain deferred to v1.5.

**Methodology highlights:** Wave-based parallel execution (Phases 44/45/46 disjoint file sets, append-only contract on shared files); informational-first harness check rollout (C6/C7/C9 added without flipping pre-existing PASS state); atomic same-commit retrofits for forward-promise closures (Phase 35:16 + Phase 36:64 + Phase 36:162); hand-authored 9 iOS-attributed supervision pins via two-tier classifier (Tier 2 never auto-pinned per D-11 invariant).

---

## v1.4 Android Enterprise Enrollment Documentation (Shipped: 2026-04-24)

**Phases completed:** 9 phases (34-42), 40 plans
**Timeline:** 2026-04-21 → 2026-04-24 (4 days)
**Audit status:** tech_debt (accepted) — 3 defer items routed to v1.4.1

**Key accomplishments:**

- **Android foundation** (Phase 34) — 13-term disambiguation glossary, 5-mode enrollment overview with supervision-analog narrative bridge, NFC / QR / afw#setup / Zero-Touch provisioning-method matrix, Android 11 / 12 / 15 version-breakpoint matrix, and tri-portal admin template (Intune admin center + Managed Google Play + Zero-Touch portal).
- **Android prerequisites** (Phase 35) — Admin setup overview with 5-branch mermaid flowchart, Managed Google Play binding guide (Entra-preferred since Aug 2024) with disconnect-consequences table, and Zero-Touch portal admin guide with Step 0 reseller gate + KME/ZT Samsung mutual-exclusion callout.
- **Mode-specific admin guides** (Phases 36-39) — COBO (Fully Managed) with COPE→WPCO migration note + Android 15 FRP callout, BYOD Work Profile with admin + end-user tier-inverted dual-guide and AMAPI migration callout, Dedicated (COSU) with Managed Home Screen exit-PIN sync requirement, ZTE corporate-scale extension of Phase 35 ZT portal doc, and hard-scoped AOSP stub with RealWear GA + OEM deferral matrix.
- **Android L1 triage** (Phase 40) — Mode-first L1 decision tree (deviating from iOS visibility-first) + 6 scenario runbooks (enrollment blocked, work profile not created, device not enrolled, compliance blocked, MGP app not installed, ZTE enrollment failed) with D-10 sectioned format and D-12 three-part escalation packets; L1 index Android section appended.
- **Android L2 investigation** (Phase 41) — 3-method log collection runbook (Company Portal + Microsoft Intune app + adb logcat with confidence markers) + 3 investigation runbooks (enrollment, app install, compliance) using Play Integrity 3-tier verdicts (Basic / Basic+Device / Strong); zero SafetyNet references (deprecated January 2025). L2 template platform enum extended; L2 index Android section appended.
- **Integration & milestone audit** (Phase 42) — Android capability matrix (5-domain iOS-sibling spine + Cross-Platform Equivalences H2 with 3 paired rows: iOS Supervision↔Android Fully Managed, Apple ADE↔Google Zero-Touch, iOS User Enrollment↔Android Work Profile), `docs/index.md` minimal Android stub (Choose-Your-Platform bullet + H2 + Cross-Platform References row), `docs/_glossary-macos.md` reciprocal line-10 see-also, and v1.4-MILESTONE-AUDIT.md produced via 5-check Node harness with committed allow-list sidecar.

**Validation harness shipped:** `scripts/validation/v1.4-milestone-audit.mjs` (319-line Node ESM, 5 mechanical checks: C1 SafetyNet semantic-zero, C2 supervision-as-Android-term, C3 AOSP stub word-count informational, C4 deferred-file Android-link guard, C5 last_verified 60-day freshness) + `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` sidecar.

**Methodology highlight:** Phase 42 gray-area decisions resolved via 12-agent adversarial-review pattern (4 finder + 4 adversary + 4 referee, 3 parallel waves) — produced lowest-real-flaw winners per sub-choice and surfaced 3 critical pre-existing contradictions (AEAUDIT-01 singular "column" vs SC#1 plural "columns" wording; 4 shipped SafetyNet deprecation-context tokens; AOSP body word-count drift vs Phase 39 envelope) that pure planning would have missed.

**Known deferred items at close (routed to v1.4.1):**

- **DEFER-01** — Audit allow-list expansion: 27 additional legitimate iOS-attributed supervision bridge-prose references in `_glossary-android.md` + `android-capability-matrix.md` Cross-Platform Equivalences section not yet pinned (allow-list was CONTEXT-enumerated at 10 pins, reality needs ~37 total).
- **DEFER-02** — last_verified freshness normalization: 4 L2 runbooks (18-21) carry 90-day review_by cycle from authoring time; Phase 34 D-14 Android 60-day rule requires retroactive re-dating. Plus `admin-template-android.md` frontmatter normalization.
- **DEFER-03** — Phase 39 AOSP stub re-validation: body word count 1089 exceeds Phase 39 self-certified 600-900 envelope by ~189 words; recommend `/gsd-validate-phase 39` in v1.4.1 to decide whether to trim or update the envelope.
- **DEFER-04 (from PROJECT.md)** — Knox Mobile Enrollment documentation (Samsung KME row in provisioning matrix + dedicated admin guide).
- **DEFER-05 (from PROJECT.md)** — Full AOSP per-OEM expansion (RealWear + Zebra + Pico + HTC VIVE Focus + Meta Quest).
- **DEFER-06 (from PROJECT.md)** — COPE full admin path (beyond the migration-note callout inside COBO guide).
- **DEFER-07 (from PROJECT.md)** — Cross-platform navigation unification (backport Android into `docs/index.md` banner/H1 + `common-issues.md` + `quick-ref-l1.md` + `quick-ref-l2.md`); AENAVUNIFY-04 post-v1.4.
- **DEFER-08 (from PROJECT.md)** — 4-platform (Windows+macOS+iOS+Android) capability comparison document; AECOMPARE-01 for v1.5.

---

## v1.3 iOS/iPadOS Provisioning Documentation (Shipped: 2026-04-19)

**Phases completed:** 8 phases (26-33), 44 plans, ~50 tasks
**Git range:** `329843a..HEAD` (plus v1.3 work from 2026-04-16 onward)
**Timeline:** 2026-04-16 → 2026-04-19 (4 days including gap closure)

**Key accomplishments:**

- **iOS/iPadOS enrollment path overview and ADE lifecycle** (Phase 26) — 4-path comparison (ADE / Device Enrollment / User Enrollment / MAM-WE), supervision axis, 7-stage ADE lifecycle mirroring macOS format.
- **iOS admin setup — corporate ADE path** (Phase 27) — APNs certificate, ABM/ADE token (cross-referencing macOS ABM guide), ADE enrollment profile with supervised-only callout pattern.
- **iOS admin setup — configuration, apps, compliance** (Phase 28) — configuration profiles (Wi-Fi, VPN, email, device restrictions, certificates, home screen), app deployment (VPP device/user, LOB, silent-install), compliance policy (OS version, jailbreak, passcode, CA timing) with per-setting 🔒 supervised-only callouts.
- **iOS admin setup — BYOD & MAM** (Phase 29) — overview rewrite for all 4 paths, Device Enrollment (Company Portal + web-based, capabilities-without-supervision table), account-driven User Enrollment with 7 privacy-limit callouts + profile-UE deprecation section, standalone MAM-WE app protection guide (three-level data protection, dual-targeting, selective wipe).
- **iOS L1 triage runbooks** (Phase 30) — triage decision tree (Mermaid) + 6 L1 scenario runbooks (APNs expired, ADE not starting, enrollment restriction blocking, license invalid, device cap reached, compliance blocked) with D-10 actor-boundary sections and D-12 three-part escalation packets.
- **iOS L2 investigation runbooks** (Phase 31) — 4 L2 runbooks (log collection with Mac+cable sysdiagnose, ADE token & profile delivery, app install failure, compliance & CA timing) using iOS-native methods (no CLI tool exists on iOS).
- **Navigation integration & references** (Phase 32) — hub index, common-issues routing, quick-reference cards with iOS sections, iOS capability matrix, 44-file reachability verified; UAT Test 15 AssistiveTouch sysdiagnose closure.
- **v1.3 gap closure** (Phase 33) — closed I-1 broken anchor (`01-ade-lifecycle.md:364`), I-2 71-placeholder retrofit across 9 `docs/admin-setup-ios/*.md` files, produced Phase 30 `30-VERIFICATION.md`, ran full Phase 30 validator (12 PASS, 1 SKIPPED), captured human sign-off, flipped milestone audit status `gaps_found → passed` (18/18 requirements, 0 MAJOR integration findings).

**Validation harnesses shipped:** `scripts/validation/check-phase-30.mjs` (13 automated checks for iOS L1 triage artifacts), `scripts/validation/check-phase-31.mjs` (29 automated checks for iOS L2 investigation artifacts), `scripts/validation/check-phase-32.mjs` (iOS navigation integration checks).

**Known deferred items at close:**

- 4 pre-existing human verification items in `29-HUMAN-UAT.md` — all passed during v1.3 close (see `.planning/milestones/v1.3-phases/` references). Final status: complete.
- Phase 28 REVIEW WR-01 (Safari web domains supervision marker) — deferred to 2026-07-15 review cycle pending live-tenant fact-check against Microsoft Learn.
- Phase 26 I1 (glossary display-name H1) — resolved via rename to "Apple Provisioning Glossary".

---

## v1.2 Cross-Platform Provisioning & Operational Gaps (Shipped: 2026-04-16)

**Phases completed:** 6 phases, 20 plans, 23 tasks

**Key accomplishments:**

- docs/index.md restructured as a dual-platform navigation hub with Choose Your Platform selector, Windows Autopilot and macOS Provisioning H2 sections, and a Cross-Platform References section linking all Phase 20 artifacts
- One-liner:
- One-liner:
- Commit:
- One-liner:
- Complete 7-stage macOS ADE lifecycle narrative (414 lines) with Mermaid pipeline diagram, per-stage breakdown using macOS-native terminology, and 15 glossary cross-references
- macOS Terminal commands reference (6 tools), log paths reference (9 paths), extended network endpoints with ADE section (18 endpoints), and docs hub navigation linking all Phase 22 artifacts
- Cross-platform symptom routing wired into common-issues.md, quick-ref-l1.md, and quick-ref-l2.md with macOS ADE sections, platform selectors, and bidirectional cross-reference banners

---

## v1.1 APv2 Documentation & Admin Setup Guides (Shipped: 2026-04-13)

**Phases completed:** 9 phases, 18 plans, 42 tasks

**Key accomplishments:**

- APv1 admin setup overview index, hardware hash upload guide with 3-path decision tree, deployment profile with 11 OOBE settings documented, and ESP policy with critical Windows quality update default change
- Dynamic groups with ZTDId rule and sync delays, 3-mode comparison table, and full admin guides for user-driven (hybrid join), pre-provisioning (TPM 2.0/Win+F12/reseal), and self-deploying (no user affinity)
- Intune Connector guide with critical version gate (6.2501.2000.5) and OU XML config, plus 30-entry consolidated reverse-lookup table across 6 failure categories linking to all guide files and L1 runbooks
- Edit 1 -- docs/error-codes/00-index.md:

---

## v1.0 — Autopilot Documentation & Troubleshooting Guides (In Progress)

**Started:** 2026-03-10
**Goal:** End-to-end Autopilot lifecycle documentation with integrated troubleshooting, tiered for L1 and L2 teams.
