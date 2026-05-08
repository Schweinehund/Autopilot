---
phase: 50
plan: 01
subsystem: docs/admin-setup-linux
tags: [linux, intune, admin-setup, enrollment, LIN-03, LIN-05]
requires: [49-01, 49-02, 49-03, 49-04, 49-05]
provides: [admin-setup-linux/00-overview, admin-setup-linux/01-intune-linux-agent, admin-setup-linux/02-enrollment-profile]
affects: [docs/linux-lifecycle/01-linux-prerequisites.md, docs/linux-lifecycle/00-enrollment-overview.md, docs/_glossary-linux.md]
tech_stack:
  added: []
  patterns: [macOS-analog-mirror, DPO-03-back-link, DPO-01-anchor-inheritance, D-08-pinned-H2s, D-10-cross-link, PITFALL-3-callout, LIN-05-callout]
key_files:
  created:
    - docs/admin-setup-linux/00-overview.md
    - docs/admin-setup-linux/01-intune-linux-agent.md
    - docs/admin-setup-linux/02-enrollment-profile.md
  modified: []
decisions:
  - "DPO-03: 00-overview.md back-links to Phase 49 cross-platform bridge via literal docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android and does NOT duplicate the H2"
  - "DPO-01: 01-intune-linux-agent.md LIN-05 callout contains literal docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints"
  - "D-08: 02-enrollment-profile.md has exactly 5 pinned H2s in order with no forbidden H2s"
  - "D-10: 02-enrollment-profile.md cross-links to ../end-user-guides/linux-intune-portal-enrollment.md near top"
  - "CD-02: Mermaid flowchart included in 00-overview.md (recommended and included)"
metrics:
  duration_minutes: 15
  completed_date: 2026-04-27
  tasks_completed: 3
  files_created: 3
  files_modified: 0
---

# Phase 50 Plan 01: Linux Admin Setup — Overview + Agent Install + Enrollment Profile Summary

**One-liner:** Three admin-setup-linux files authored with LIN-05 Identity Broker re-enrollment callout, PITFALL-3 deb-vs-Snap deprecation, D-08 5-pinned-H2 enrollment-profile, and DPO-03 Phase 49 bridge back-link.

## Tasks Completed

| Task | File | Lines | Commit |
|------|------|-------|--------|
| 1 | docs/admin-setup-linux/00-overview.md | 58 | 444f861 |
| 2 | docs/admin-setup-linux/01-intune-linux-agent.md | 120 | 2ef7d85 |
| 3 | docs/admin-setup-linux/02-enrollment-profile.md | 103 | b4bcef2 |

**Total lines authored:** 281

## Frontmatter Values (C10-compliant)

All 3 files carry identical C10-compliant frontmatter:

```yaml
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: enrollment
audience: admin
platform: Linux
```

60-day review cycle confirmed: 2026-04-27 → 2026-06-26.

## LIN-05 Callout Verification (01-intune-linux-agent.md)

Exact callout text (lines 19-28):

```
> ⚠️ **Known admin pitfall — Identity Broker re-enrollment (intune-portal 2.0.2+):** The `intune-portal` 2.0.2 release replaced the Java-based broker with `microsoft-identity-broker` (systemd unit). Updating from a pre-2.0.2 install triggers AUTOMATIC RE-ENROLLMENT of all already-enrolled Linux devices with NEW device IDs. Admin action required after the rollout: review device-based Conditional Access assignments, Intune filters, and Entra ID group memberships scoped to Linux devices — old device IDs become stale and the new device IDs may not match prior assignments. See [Non-version Breakpoints](../linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints) for the full breakpoint matrix.
```

Back-link verified: literal string `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints` present in file (DPO-01 contract).

Validator assertion: regex `^> ⚠️ \*\*Known admin pitfall/m` matches at line 19.

## PITFALL-3 Callout Verification (01-intune-linux-agent.md)

Exact callout text:

```
> 📋 **Note — deb vs Snap:** The Snap package (`snap install intune-portal`) was available during preview and is **deprecated**. Use the deb package via `packages.microsoft.com` for general-availability deployments. The Snap path will not receive Identity Broker 2.0.2+ updates.
```

Verification:
- "Snap" present: YES
- "deprecated" present: YES (applied to Snap)
- GA install command `sudo apt install intune-portal`: YES
- `packages.microsoft.com` deb source: YES

## D-08 5-H2 Pinning Verification (02-enrollment-profile.md)

All 5 required H2s present in correct order:

| H2 | Present |
|----|---------|
| `## Prerequisites` | YES |
| `## Steps` | YES |
| `## Verification` | YES |
| `## Configuration-Caused Failures` | YES |
| `## See Also` | YES |

Forbidden H2s absent:
- `## End-User Enrollment Steps`: ABSENT
- `## Appendix:`: ABSENT
- `## Validate End-User Flow`: ABSENT

## D-10 Cross-Link Verification (02-enrollment-profile.md)

Forward direction (admin → end-user) present near top of file:

```
> **For end users:** Personal-device or self-enrolling users follow [Linux Intune Portal Enrollment](../end-user-guides/linux-intune-portal-enrollment.md). This guide covers admin-side enrollment configuration only.
```

Literal string `../end-user-guides/linux-intune-portal-enrollment.md` verified present.

Reverse direction (end-user → admin) will be authored in plan 03 (end-user guides) per D-10 both-directions contract.

## DPO-03 Back-Link + Negative Assertion Verification (00-overview.md)

Back-link verified: literal string `docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android` present in Cross-Platform References section.

Negative assertion: regex `^## For Admins Familiar with Windows / macOS / Android\s*$` does NOT match — anti-duplication guard holds.

## Threat Model Coverage

| Threat ID | Mitigation Status |
|-----------|------------------|
| T-50-01 (LIN-05 Identity Broker callout) | MITIGATED — callout present with DPO-01 anchor back-link |
| T-50-02 (PITFALL-3 deb-vs-Snap supply chain) | MITIGATED — Snap labeled deprecated; packages.microsoft.com deb sourced |

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

**Note on DPO-03 back-link literal:** The plan requires the literal string `docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android`. The body blockquote uses the relative link `../linux-lifecycle/00-enrollment-overview.md#...` (correct for Markdown navigation), while the Cross-Platform References section was updated to include the full `docs/` path literal as a code-span reference to satisfy the validator's string probe. Both forms are present; the relative link is the functional hyperlink, the full-path literal satisfies the validator assertion.

## Known Stubs

None. All links and cross-references are intentional forward-references:
- `../end-user-guides/linux-intune-portal-enrollment.md` — authored in plan 03
- `../reference/linux-capability-matrix.md` — authored in plan 04
- `../l1-runbooks/30-linux-enrollment-failed.md` — authored in Phase 51
- `../l1-runbooks/32-linux-ca-blocking-web-access.md` — authored in Phase 51
- `03-compliance-policy.md`, `04-app-delivery.md`, `05-conditional-access.md` — authored in plans 02/03

Per D-18 (atomic commit), all content resolves at Phase 50 final commit.

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes introduced. Documentation-only phase.

## Self-Check

**Commit hashes verified:**
- 444f861: feat(50-01): author docs/admin-setup-linux/00-overview.md
- 2ef7d85: feat(50-01): author docs/admin-setup-linux/01-intune-linux-agent.md
- b4bcef2: feat(50-01): author docs/admin-setup-linux/02-enrollment-profile.md

**Files exist:**
- docs/admin-setup-linux/00-overview.md: FOUND
- docs/admin-setup-linux/01-intune-linux-agent.md: FOUND
- docs/admin-setup-linux/02-enrollment-profile.md: FOUND

## Self-Check: PASSED
