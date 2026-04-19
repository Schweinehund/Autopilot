# Milestones: Windows Autopilot Troubleshooter

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
