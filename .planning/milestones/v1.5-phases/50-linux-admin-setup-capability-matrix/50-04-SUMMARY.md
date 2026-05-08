---
phase: 50
plan: "04"
subsystem: docs/reference
tags: [linux, capability-matrix, bilateral, cross-platform-equivalences, CA-elevated]
dependency_graph:
  requires: [50-01, 50-02]
  provides: [docs/reference/linux-capability-matrix.md]
  affects: [docs/admin-setup-linux/03-compliance-policy.md, docs/admin-setup-linux/05-conditional-access.md]
tech_stack:
  added: []
  patterns: [Win|Linux bilateral 2-column matrix, Cross-Platform Equivalences paired rows, 3-status closed-set Linux column]
key_files:
  created: [docs/reference/linux-capability-matrix.md]
  modified: []
decisions:
  - "CA elevated to own H2 (not folded into Compliance) per D-02 — provides anchor linux-capability-matrix.md#conditional-access for Phase 51 runbook 32 + Phase 58 4-platform comparison"
  - "platform: Linux frontmatter (not platform: all) per D-03 — satisfies AUDIT-02 C10 blocking check"
  - "3-pair Cross-Platform Equivalences per D-12/D-13/D-14/D-15 with rephrased Pair 1 per W-CRIT-1/2/3 corrections"
metrics:
  duration: "~15min"
  completed: "2026-04-27"
  tasks_total: 1
  tasks_completed: 1
  files_created: 1
  files_modified: 0
---

# Phase 50 Plan 04: Linux Capability Matrix Summary

**One-liner:** Win|Linux bilateral capability matrix with CA-elevated H2, 3-pair Cross-Platform Equivalences (intune-portal deb ≈ macOS LaunchAgent; intune-agent.timer ≈ APNs; web-app CA ≈ MAM-WE), and explicit Not supported cells per LIN-13.

## File Created

**`docs/reference/linux-capability-matrix.md`** — 118 lines

## Frontmatter Verification

| Field | Value | Requirement |
|-------|-------|-------------|
| `platform` | `Linux` | D-03: Linux-focal-platform, NOT `all` |
| `applies_to` | `both` | D-03: bilateral matrix |
| `audience` | `admin` | D-03: admin-facing reference |
| `last_verified` | `2026-04-27` | C10: 60-day cycle |
| `review_by` | `2026-06-26` | C10: 60 days from last_verified |

## 10 H2 Verification (D-06)

| # | H2 | Present |
|---|----|---------|
| 1 | `## Enrollment` | FOUND |
| 2 | `## Configuration` | FOUND |
| 3 | `## App Deployment` | FOUND |
| 4 | `## Compliance` | FOUND |
| 5 | `## Software Updates` | FOUND |
| 6 | `## Conditional Access` | FOUND |
| 7 | `## Cross-Platform Equivalences` | FOUND |
| 8 | `## Key Gaps Summary` | FOUND |
| 9 | `## See Also` | FOUND |
| 10 | `## Version History` | FOUND |

Total: 10 H2s (grep -c '^## ' = 10)

## CA Cell Literal Verification (V-50-15 / PITFALL-2)

`Not supported — web-app CA only` (em-dash U+2014) — PRESENT in `## Conditional Access` domain table, Device-based CA row, Linux column.

Byte sequence: `Not supported \u2014 web-app CA only` — verified via `c.includes()` check.

## 6 Glossary Anchor Verification (V-50-16 / D-13/D-14/D-15)

| Anchor | Glossary | Pair | Present |
|--------|----------|------|---------|
| `_glossary-linux.md#intune-portal-package` | Linux | Pair 1 Linux side | FOUND |
| `_glossary-linux.md#microsoft-identity-broker` | Linux | Pair 1 Linux side | FOUND |
| `_glossary-linux.md#intune-agenttimer` | Linux | Pair 1 + Pair 2 Linux side | FOUND |
| `_glossary-linux.md#web-app-ca` | Linux | Pair 3 Linux side | FOUND |
| `_glossary-macos.md#mam-we` | macOS | Pair 1 + Pair 3 Apple side | FOUND |
| `_glossary-macos.md#apns` | macOS | Pair 2 Apple side | FOUND |

All 6 anchors verified (D-16: no glossary appends needed; all anchor targets pre-exist from Phase 49).

## 3-Pair Attribution Verification (D-13/D-14/D-15)

**Pair 1 (D-13) lead line:** `Linux 'intune-portal' deb + 'microsoft-identity-broker' systemd unit` ≈ `macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent`
- W-CRIT-1 corrected: uses "deb" not "service" for intune-portal
- W-CRIT-2 corrected: uses "LaunchAgent" (has anchor) not "LaunchDaemon" (no anchor)
- W-CRIT-3 corrected: body distinguishes system-scope (broker) vs user-scope (timer)
- Partial-mapping disclosure: "Pairing is structural — both deliver client-side enrollment + token broker"

**Pair 2 (D-14) lead line:** `Linux 'intune-agent.timer' user-scope check-in` ≈ `iOS APNs-triggered MDM check-in cycle`
- Transport divergence disclosed: "timer-poll; iOS is APNs-push"
- Structural framing: "device-side schedule on which compliance is re-evaluated"

**Pair 3 (D-15) lead line:** `Linux web-app CA (Microsoft Edge for Linux 102.x+)` ≈ `iOS MAM-WE (Managed App Without Enrollment)`
- LIN-13-named compliance-lite pattern present
- Architectural divergence disclosed: "BROWSER-CHALLENGE (per-session token at sign-in); iOS MAM-WE is APP-LAYER selective-wipe"
- Mapping framed as STRUCTURAL, not behavioral

## DPO-07 Anti-Duplication Verification

The file does NOT contain verbatim Phase 49 whitelist H2 content. References the whitelist via back-link only:
- Intro paragraph: `see [Linux Enrollment Overview](../linux-lifecycle/00-enrollment-overview.md#supported-management-surface) — this matrix EXTENDS the whitelist with bilateral comparison; it does not duplicate the whitelist.`
- `## See Also`: links to `../linux-lifecycle/00-enrollment-overview.md`

No verbatim copy of Phase 49 whitelist H2 headings or table content.

## Explicit "Not Supported" Cells (SC#4)

| Item | H2 | Present |
|------|----|---------|
| Zero-touch / autopilot enrollment | Enrollment | `Not supported` |
| Hybrid Entra Join | Enrollment | `Not supported` |
| MDM configuration profiles (Settings Catalog) | Configuration | `Not supported — Linux has no MDM configuration profile concept in Intune` |
| Binary package delivery | App Deployment | `Not supported — script-based only (no Win32/MSIX/.pkg analog; no .deb direct delivery)` |
| Device-based CA | Conditional Access | `Not supported — web-app CA only` |

## Cross-Link Anchors (CDI-Phase50-04)

The following anchors exist in the created file for downstream consumers:
- `#enrollment` — H2 anchor for enrollment domain
- `#configuration` — H2 anchor for configuration domain
- `#app-deployment` — H2 anchor for app deployment domain (referenced from admin-setup-linux/04-app-delivery.md)
- `#compliance` — H2 anchor for compliance domain (referenced from admin-setup-linux/03-compliance-policy.md)
- `#software-updates` — H2 anchor for software updates domain
- `#conditional-access` — H2 anchor for CA domain (referenced from admin-setup-linux/03-compliance-policy.md + 05-conditional-access.md + Phase 51 runbook 32)
- `#cross-platform-equivalences` — H2 anchor for equivalences section (referenced from CA H2 row body)

## Commit

- `e472a63`: feat(50-04): author linux-capability-matrix.md (LIN-13 bilateral Win|Linux matrix)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all 6 domain tables have complete content. Cross-Platform Equivalences section fully authored. Key Gaps Summary is prose-complete with 6 substantive items.

## Threat Flags

None — documentation-only plan. No new network endpoints, auth paths, file access patterns, or schema changes.

## Self-Check: PASSED

- `docs/reference/linux-capability-matrix.md` — FOUND
- Commit `e472a63` — VERIFIED
- 10 H2s — VERIFIED (grep -c '^## ' = 10)
- CA cell literal (em-dash) — VERIFIED
- All 6 glossary anchors — VERIFIED
- Frontmatter `platform: Linux`, `applies_to: both` — VERIFIED
