# Milestones: Windows Autopilot Troubleshooter

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
