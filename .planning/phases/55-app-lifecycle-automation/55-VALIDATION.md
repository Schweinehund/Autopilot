---
phase: 55
slug: app-lifecycle-automation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-28
---

# Phase 55 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Phase 55 is documentation-only (5 markdown files + 1 Node.js validator script + 1 commit) — no application code, no test framework install. Validation = `check-phase-55.mjs` + `v1.5-milestone-audit.mjs` + markdown-link-check + supervision-pin self-test.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js 20+ (file-reads-only regex-based validator pattern per Phase 48 D-25 + cascading inheritance) |
| **Config file** | `scripts/validation/v1.5-audit-allowlist.json` (sidecar; existing) |
| **Quick run command** | `node scripts/validation/check-phase-55.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~3-8 seconds (Phase 54 sibling check-phase-54.mjs runs in <5s; v1.5-milestone-audit.mjs runs in ~15s including markdown-link-check) |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-55.mjs` (file-reads-only; no side effects)
- **After every plan wave:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (C1-C12 PASS expected; C13 informational)
- **Before pre-commit gate:** Full suite must be green: `check-phase-55.mjs` + `v1.5-milestone-audit.mjs` + `regenerate-supervision-pins.mjs --self-test` + `markdown-link-check` against 5 new files
- **Max feedback latency:** ~15 seconds for the heaviest single check (v1.5-milestone-audit.mjs with C13 markdown-link-check enabled)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 55-01-01 | 01 | 1 | n/a (overview, no REQ) | — | n/a | structural | `grep -E '^\\| .* \\| .* \\| .* \\| .* \\| .* \\|' docs/operations/app-lifecycle/00-overview.md` (5+ row × 4-platform table presence) | ❌ W0 | ⬜ pending |
| 55-01-02 | 01 | 1 | n/a | — | n/a | structural | `grep -n '^## App-lifecycle terminology' docs/operations/app-lifecycle/00-overview.md` | ❌ W0 | ⬜ pending |
| 55-01-03 | 01 | 1 | n/a | — | n/a | structural | `grep -n '^> \\*\\*Platform applicability:\\*\\*' docs/operations/app-lifecycle/00-overview.md` (line 9 expected) | ❌ W0 | ⬜ pending |
| 55-01-04 | 01 | 1 | n/a | — | n/a | NEGATIVE | `! grep -E '(Win32ContentPrepTool\|\\.intunewin\|Required assignment\|Replace vs Update\|Installomator\|Intuneomator\|OEMConfig\|MGP private track\|AMAPI\|reclamation)' docs/operations/app-lifecycle/00-overview.md` (anti-scope-creep firewall) | ❌ W0 | ⬜ pending |
| 55-02-01 | 02 | 1 | APP-01 | — | n/a | structural | `grep -n '^## Supersedence' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` | ❌ W0 | ⬜ pending |
| 55-02-02 | 02 | 1 | APP-01 + PITFALL-10 | — | n/a | structural | `grep -A 30 '^## Supersedence' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md \\| grep -E 'Required.{0,5}assignment.{0,20}exception'` (callout adjacent to matrix) | ❌ W0 | ⬜ pending |
| 55-02-03 | 02 | 1 | APP-01 | — | n/a | structural | `grep -A 50 '^## Supersedence' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md \\| grep -E 'Available.*Required.*Uninstall.*Replace'` (behavior matrix table cells) | ❌ W0 | ⬜ pending |
| 55-02-04 | 02 | 1 | APP-02 | — | n/a | structural | `grep -n '^## Dependency Graphs' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` | ❌ W0 | ⬜ pending |
| 55-02-05 | 02 | 1 | APP-02 | — | n/a | structural | `grep -E '(max 100\|100 dependencies\|circular)' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` (max-100 + circular-detection literals) | ❌ W0 | ⬜ pending |
| 55-02-06 | 02 | 1 | APP-03 | — | n/a | structural | `grep -n '^## ContentPrepTool Packaging' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` | ❌ W0 | ⬜ pending |
| 55-02-07 | 02 | 1 | APP-03 | — | n/a | structural | `grep -E '(\\.intunewin\|MSI product code\|registry\|PowerShell)' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` (4 detection rule types + .intunewin literal) | ❌ W0 | ⬜ pending |
| 55-02-08 | 02 | 1 | APP-03 | — | n/a | structural | `grep -E 'MSIX.*does NOT support supersedence' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` (STACK.md:234 disclaimer) | ❌ W0 | ⬜ pending |
| 55-02-09 | 02 | 1 | APP-03 | — | n/a | structural | `grep -E '\\.\\./\\.\\./reference/win32-app-packaging\\.md' docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` (cross-link to existing reference doc) | ❌ W0 | ⬜ pending |
| 55-03-01 | 03 | 1 | APP-04 | — | n/a | structural | `grep -E '(LOB PKG\|unmanaged PKG\|DMG\|Apple Developer ID\|VPP\|Mac App Store\|Apple Business Manager)' docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (all 6 macOS app-type variants) | ❌ W0 | ⬜ pending |
| 55-03-02 | 03 | 1 | APP-05 | — | n/a | structural | `grep -E '> 📋 Community pattern.*MEDIUM confidence' docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (Installomator/Intuneomator confidence callout literal) | ❌ W0 | ⬜ pending |
| 55-03-03 | 03 | 1 | APP-05 | — | n/a | structural | `grep -E '(Installomator.*Intuneomator\|Intuneomator.*Installomator)' docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (both names within callout) | ❌ W0 | ⬜ pending |
| 55-03-04 | 03 | 1 | APP-05 | — | n/a | NEGATIVE | `! grep -E '^> 📋 [^C]' docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (no bare > 📋 without "Community pattern" qualifier) | ❌ W0 | ⬜ pending |
| 55-04-01 | 04 | 1 | APP-06 | — | n/a | structural | `grep -E '\\| (VPP )?Device-Licensed \\| (VPP )?User-Licensed' docs/operations/app-lifecycle/03-ios-vpp-licensing.md` (2-column attribute table headers) | ❌ W0 | ⬜ pending |
| 55-04-02 | 04 | 1 | APP-06 | — | n/a | structural | `grep -E '(retire/wipe.*device license\|retire and wipe.*device license)' docs/operations/app-lifecycle/03-ios-vpp-licensing.md` (reclamation-1 literal) | ❌ W0 | ⬜ pending |
| 55-04-03 | 04 | 1 | APP-06 | — | n/a | structural | `grep -E 'remove.*app.*user license' docs/operations/app-lifecycle/03-ios-vpp-licensing.md` (reclamation-2 literal) | ❌ W0 | ⬜ pending |
| 55-04-04 | 04 | 1 | APP-06 | — | n/a | NEGATIVE | `! grep -E '^\\\`\\\`\\\`mermaid' docs/operations/app-lifecycle/03-ios-vpp-licensing.md` (zero Mermaid blocks per D-09 + V-55-20) | ❌ W0 | ⬜ pending |
| 55-04-05 | 04 | 1 | APP-06 | — | n/a | structural | `grep -E '\\.\\./\\.\\./admin-setup-ios/05-app-deployment\\.md' docs/operations/app-lifecycle/03-ios-vpp-licensing.md` (cross-link to v1.3 iOS app deployment) | ❌ W0 | ⬜ pending |
| 55-05-01 | 05 | 1 | APP-07 | — | n/a | structural | `grep -E '^## Managed Google Play Private App Publishing' docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (or H2 variant matching MGP private-app token) | ❌ W0 | ⬜ pending |
| 55-05-02 | 05 | 1 | APP-07 | — | n/a | structural | `grep -E '(private (app )?track\|web app\|web clip)' docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (MGP private-app + web-clip literals) | ❌ W0 | ⬜ pending |
| 55-05-03 | 05 | 1 | APP-07 | — | n/a | structural | `grep -E 'AMAPI' docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (AMAPI literal — note: 2024 vs 2025 date subject to plan-author resolution per RESEARCH §7 LOW-MEDIUM caveat) | ❌ W0 | ⬜ pending |
| 55-05-04 | 05 | 1 | APP-08 | — | n/a | structural | `grep -E '^## Zebra OEMConfig' docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (peer H2 for OEMConfig) | ❌ W0 | ⬜ pending |
| 55-05-05 | 05 | 1 | APP-08 | — | n/a | structural | `grep -E 'NOT (via )?Managed Google Play' docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (mutual-exclusion disclaimer literal) | ❌ W0 | ⬜ pending |
| 55-05-06 | 05 | 1 | APP-08 | — | n/a | structural | `grep -E '\\.\\./\\.\\./admin-setup-android/10-aosp-zebra\\.md' docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (cross-link to Phase 45 Zebra SSoT) | ❌ W0 | ⬜ pending |
| 55-05-07 | 05 | 1 | APP-08 | — | n/a | structural | `grep -A 30 '^## Zebra OEMConfig' docs/operations/app-lifecycle/04-android-mgp-lifecycle.md \\| grep -E '(update.*revoke.*troubleshoot\|update\\b.*revoke\\b.*troubleshoot)'` (3-bullet operate-the-lifecycle list) | ❌ W0 | ⬜ pending |
| 55-06-01 | 06 | 2 | n/a (validator) | — | n/a | meta | `node scripts/validation/check-phase-55.mjs` (exits 0; all 30-34 V-55-NN PASS) | ❌ W0 | ⬜ pending |
| 55-07-01 | 07 | 3 | all | — | n/a | gate | `node scripts/validation/check-phase-55.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/regenerate-supervision-pins.mjs --self-test` (atomic pre-commit gate) | ❌ W0 | ⬜ pending |
| 55-07-02 | 07 | 3 | all | — | n/a | gate | `git log --name-only HEAD~1 \\| grep -E '(operations/app-lifecycle/.*\\.md\|check-phase-55\\.mjs)' \\| wc -l` (single atomic commit covers 5 + 1 = 6 files) | ❌ W0 | ⬜ pending |
| 55-07-03 | 07 | 3 | all | — | n/a | gate | All 5 new files contain `> **Platform applicability:**` blockquote at line ~9 (Phase 54 D-04 + V-55-26 inheritance) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `scripts/validation/check-phase-54.mjs` exists at 33,841 bytes — Phase 55 inherits this template pattern verbatim (file-reads-only, regex-based, no shared module dependencies, ~600-650 lines projected)
- [x] `scripts/validation/v1.5-milestone-audit.mjs` exists with C1-C13 checks — Phase 55 outputs validated against existing harness (no new C-check additions per CDI-Phase55-04)
- [x] `scripts/validation/v1.5-audit-allowlist.json` sidecar exists — no new entries required at Phase 55 ship per CDI-Phase55-03 YAGNI inheritance from Phase 54 D-16
- [x] `scripts/validation/regenerate-supervision-pins.mjs --self-test` operational (verified at v1.5 close per Phase 48 D-15)
- [x] `markdown-link-check` configuration `.mlc-config.json` exists from Phase 48 D-08
- [x] Phase 53 created `docs/operations/00-index.md` — Phase 55 cross-references it (does NOT amend per V-55-28 NEGATIVE regression-guard)
- [x] Phase 54 closed (commit be7f59d) — Phase 55 dependency from ROADMAP line 286 satisfied
- [ ] No new framework install required — Phase 55 is documentation-only

*Existing infrastructure covers all Phase 55 verification needs. No Wave 0 framework setup required.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Microsoft Learn current-GA Win32ContentPrepTool version verification | APP-03 | Microsoft Learn version-pin shifts independently of project release cadence; automated check would require live HTTP fetch (out of scope per Phase 48 D-08 markdown-link-check internal-only configuration) | Plan-author 55-02 verifies https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases for latest GA at execution time; updates RESEARCH.md "current GA version" pin if shifted from v1.8.7. Reference RESEARCH §7 corrections #1 |
| AMAPI 2024 vs 2025 date attribution resolution | APP-07 | Google AMAPI release notes show no 2024 entry for custom-apps; first appearance is August 2025. REQ APP-07 verbatim says "applicable since 2024." Plan-author must resolve: (a) verify TechCommunity post `ba-p/3849875` if accessible; (b) soften phrasing to "applicable since 2024-2025"; (c) flag for user discussion | Plan-author 55-05 verifies AMAPI custom-apps SDK release timing; if 2024 unverifiable, default to "applicable since 2024" wording per REQ literal but include footnote acknowledging Google release notes show August 2025. Reference RESEARCH §7 corrections #2 |
| Circular dependency detection contradiction in `docs/reference/win32-app-packaging.md:99` | APP-02 | Existing project doc says "Intune does NOT detect circular dependencies"; current Microsoft Learn behavior IS detected. Resolution requires editing the existing reference doc OR softening Phase 55 cross-link contract | Plan-author 55-02 chooses Option A (same-commit edit to win32-app-packaging.md:99 retracting "not detected" claim) OR Option B (Phase 55 cross-link with caveat) per RESEARCH §6 alternatives. Recommended Option A: same-commit atomicity per CDI-Phase55-05 inheritance from Phase 54 D-21 |
| iOS VPP reclamation 3-step workflow accuracy | APP-06 | REQ APP-06 wording "retire/wipe returns device license; remove app returns user license" is over-simplified — actual Microsoft Learn workflow is 3-step (remove assignment → change to Uninstall → Revoke license). macOS has 30-day grace period; iOS does not. Plan-author should encode actual workflow without bloating the 2-column attribute table | Plan-author 55-04 encodes full 3-step reclamation workflow as either (a) sub-section under reclamation rows, or (b) decision-flow described in narrative beneath table. CD-07 plan-author discretion preserved on row labels |

---

## Validation Sign-Off

- [ ] All 32 tasks have automated verify commands or Wave 0 dependencies — pending plan author confirmation
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify — verified by table inspection (max-2 stretch is `55-01-04` (NEGATIVE firewall) → `55-02-01` (Supersedence H2) → `55-02-02` (PITFALL-10 callout), all automated grep checks)
- [ ] Wave 0 covers all MISSING references — N/A (Phase 55 is documentation; no framework install needed)
- [ ] No watch-mode flags — verified (all commands are one-shot Node.js executions)
- [ ] Feedback latency < 15s — verified (Phase 54 sibling check-phase-54.mjs runs in <5s; full milestone audit ~15s)
- [ ] `nyquist_compliant: true` set in frontmatter — pending validator-as-deliverable (55-06) ship
- [ ] Plan-author resolution items (RESEARCH §7 corrections #1/#2/#3) addressed at execution time

**Approval:** pending
