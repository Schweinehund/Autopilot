---
phase: 23
slug: macos-admin-setup
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-14
---

# Phase 23 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (documentation-only phase — no automated test runner) |
| **Config file** | N/A |
| **Quick run command** | File existence + frontmatter check (manual grep) |
| **Full suite command** | Cross-reference link verification + content structure audit |
| **Estimated runtime** | ~30 seconds (manual inspection) |

---

## Sampling Rate

- **After every task commit:** Verify file exists and has correct frontmatter
- **After every plan wave:** Verify cross-references resolve and content structure matches template
- **Before `/gsd-verify-work`:** All files exist, frontmatter valid, links resolve, what-breaks callouts present
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Verification Method | File Exists | Status |
|---------|------|------|-------------|-----------|---------------------|-------------|--------|
| 23-01-01 | 01 | 1 | MADM-01 | manual | `01-abm-configuration.md` exists with Renewal/Maintenance H2 + `platform: macOS` frontmatter | No — Wave 0 | ⬜ pending |
| 23-02-01 | 02 | 1 | MADM-02 | manual | `02-enrollment-profile.md` has Setup Assistant screen table (27 screens) + what-breaks callouts | No — Wave 0 | ⬜ pending |
| 23-03-01 | 03 | 1 | MADM-03 | manual | `03-configuration-profiles.md` has 6 profile types (Wi-Fi, VPN, email, restrictions, FileVault, firewall) with what-breaks | No — Wave 0 | ⬜ pending |
| 23-04-01 | 04 | 1 | MADM-04 | manual | `04-app-deployment.md` has comparison table + 3 H2 sections (DMG, PKG, VPP) with size limits | No — Wave 0 | ⬜ pending |
| 23-05-01 | 05 | 1 | MADM-05 | manual | `05-compliance-policy.md` has "no Intune security baselines" callout + 5 settings | No — Wave 0 | ⬜ pending |
| 23-06-01 | 06 | 1 | MADM-06 | manual | `macos-capability-matrix.md` has 5 domain sections (Enrollment, Configuration, App, Compliance, Updates) | No — Wave 0 | ⬜ pending |
| 23-07-01 | 07 | 2 | — | manual | `00-overview.md` links to all 6 guides + dependency diagram | No — Wave 0 | ⬜ pending |
| 23-08-01 | 08 | 2 | — | manual | `docs/index.md` macOS Admin Setup links resolve; `windows-vs-macos.md` TBD refs updated | Partial | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/admin-setup-macos/` directory created
- [ ] All 7 new files created with correct frontmatter (`platform: macOS`)
- [ ] `docs/reference/macos-capability-matrix.md` created
- [ ] Navigation files updated (`docs/index.md`, `docs/reference/00-index.md`, `docs/windows-vs-macos.md`)

*Documentation phase — "Wave 0" means file creation during execution, not test infrastructure setup.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ABM renewal lifecycle has certificate/token expiry timelines | MADM-01 | Content accuracy, not structure | Verify renewal dates and consequences documented |
| Setup Assistant screen list matches 27 official screens | MADM-02 | Content count, not code | Count screen entries vs. research reference table |
| What-breaks callouts exist for every configurable setting | MADM-02, MADM-03 | Subjective completeness | Verify each step section has blockquote callout |
| App size limits match verified values (DMG 8GB, managed PKG 2GB, unmanaged PKG 8GB) | MADM-04 | Factual accuracy | Cross-check values against RESEARCH.md sources |
| "No security baselines for macOS" callout is prominent | MADM-05 | Content presence | Search for callout in compliance guide |
| Capability matrix covers all 5 domains | MADM-06 | Structural completeness | Verify H2 or table columns for each domain |
| Config-failures reverse-lookup has entries from all guides | — | Cross-file completeness | Verify rows reference all 5 admin guides |

---

## Validation Sign-Off

- [ ] All tasks have manual verification methods defined
- [ ] Sampling continuity: every task has a post-commit check
- [ ] Wave 0 covers all file creation requirements
- [ ] No watch-mode flags (N/A — documentation phase)
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
