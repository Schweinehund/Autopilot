---
phase: 55
plan: 03
subsystem: documentation
tags: [phase-55, app-lifecycle, macos, pkg, dmg, vpp, mac-app-store, abm, installomator, intuneomator, community-pattern]
requires: []
provides:
  - macos-app-delivery-pipeline-guide
affects:
  - docs/operations/app-lifecycle/
tech-stack:
  added: []
  patterns:
    - "platform-applicability-blockquote (D-13)"
    - "community-pattern-medium-confidence-callout (D-16)"
    - "single-string-platform-frontmatter (D-19)"
key-files:
  created:
    - docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md
  modified: []
decisions:
  - "Encoded all 6 macOS app-type variant literals (LOB PKG, unmanaged PKG, DMG, Apple Developer ID Installer, VPP, Mac App Store, ABM/Apple Business Manager) per APP-04 + V-55-16"
  - "Authored single > 📋 Community pattern — MEDIUM confidence blockquote callout containing both Installomator AND Intuneomator literals per D-16 + APP-05 + V-55-17"
  - "Routed cross-link to ../../admin-setup-macos/04-app-deployment.md for v1.2 admin-setup walkthrough rather than duplicating Included-apps detection list and Configuration-Caused-Failures runbook table"
  - "Surfaced macOS-specific 30-day post-revoke grace period in VPP section (distinct from iOS), routing licensing-decision-support detail to 03-ios-vpp-licensing.md"
  - "Used em-dash variant `> 📋 Community pattern — MEDIUM confidence` (V-55-17 accepts both em-dash and hyphen per D-16)"
metrics:
  duration: ~30min
  completed: 2026-04-28
---

# Phase 55 Plan 03: macOS PKG/DMG Pipeline (APP-04 + APP-05) Summary

macOS-specific app delivery pipeline guide covering 5 Microsoft-supported macOS app types (LOB PKG, unmanaged PKG, DMG, VPP, Mac App Store via ABM) plus a community-pattern adjacency callout for Installomator and Intuneomator as non-Microsoft-supported automation tooling.

## What Was Built

Authored `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (213 lines) — the macOS sibling in the Phase 55 5-file `docs/operations/app-lifecycle/` suite. Discharges requirements **APP-04** (all supported macOS app types) and **APP-05** (Installomator / Intuneomator MEDIUM-confidence community-pattern attribution).

## Sections Authored

| Section | Anchor | Purpose |
|---------|--------|---------|
| Frontmatter | n/a | `platform: macOS` (D-19), `audience: admin` (CD-10), `last_verified: 2026-04-28`, `review_by: 2026-06-27` (60-day), `applies_to: all` |
| Platform applicability blockquote | line 9 | D-13 + V-55-26 verbatim `> **Platform applicability:**` token routing back to 00-overview + 3 sibling per-platform files |
| H1 + intro | line 17 | Document scope: 5 Microsoft-supported types + 1 community-pattern adjacency |
| `## LOB PKG (Managed)` | line 32 | Apple Developer ID Installer cert + signed; 4 PKG-content rules; assignment-Required-only; Uninstall-only-when-Install-as-managed=Yes |
| `## Unmanaged PKG (via Intune Agent)` | line 61 | Pre/post-install scripts; agent 2308.006+; Required + Available (no Uninstall — Known Issue) |
| `## DMG (via Intune Agent)` | line 81 | Agent mounts DMG → /Applications; full Required + Available + Uninstall intent coverage; 8 GB max |
| `## VPP (Microsoft 365 Native + Volume Purchased)` | line 106 | M365 native VPP/managed; volume-purchased commercial; default-now-device; user→device migration only on Required; 30-day macOS grace period |
| `## Mac App Store (via ABM)` | line 138 | ABM/VPP token sync; silent install on supervised; 1-year token expiry; 3,000 tokens per tenant |
| `## Community Pattern: Installomator / Intuneomator` | line 163 | `> 📋 Community pattern — MEDIUM confidence` blockquote callout; Installomator (MIT-licensed Bash CLI) + Intuneomator (Swift wrapper, 900+ labels); explicit non-Microsoft-supported attribution |
| `## Related Resources` | line 197 | 6 cross-links (overview hub, 3 platform siblings, v1.2 admin-setup, Phase 54 macOS sibling) |
| `## External References` | line 206 | Microsoft Learn lob-apps-macos / macos-unmanaged-pkg / vpp-apps-ios + Installomator + Intuneomator GitHubs + ops-docs index |

## V-55-NN Assertions Satisfied (Per Plan Contract)

| Assertion | Coverage | Verification |
|-----------|----------|--------------|
| V-55-03 | File exists | `test -f docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` PASS |
| V-55-07 | Frontmatter: `platform: macOS`, `audience: admin`, `last_verified: 2026-04-28`, `review_by: 2026-06-27` | `grep -c "platform: macOS"` returns 1 |
| V-55-16 | All 6 macOS app-type literals: LOB PKG (10), unmanaged PKG (10), DMG (15), Apple Developer ID Installer (6), VPP (23), Mac App Store (6), ABM + Apple Business Manager (multi) | All 7 grep checks PASS |
| V-55-17 POSITIVE | `> 📋 Community pattern — MEDIUM confidence` blockquote at line 165; both `Installomator` AND `Intuneomator` present within blockquote scope (lines 165-185) | PASS |
| V-55-17 NEGATIVE | No bare `> 📋` blockquote without `Community pattern` qualifier | `grep -cE "^> 📋 [^C]"` returns 0 |
| V-55-26 | `> **Platform applicability:**` blockquote at line 9 (within first 50 body lines) | PASS |
| V-55-27 | NEGATIVE: no bare `> **Platform:**` token | `grep -cE "^> \*\*Platform:\*\*"` returns 0 |
| V-55-30 | NEGATIVE: no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens | `grep -cE "\b(TBD\|TODO\|FIXME\|XXX\|PLACEHOLDER)\b"` returns 0 |
| V-55-31 | SC#5 multi-platform frontmatter (`platform: macOS` per D-19 single-string contract) | PASS |

## 6 macOS App-Type Variants (V-55-16 Literal-Token Coverage)

Per APP-04 + V-55-16 plan contract, all 6 macOS app-type literal tokens are present:

| Variant | Literal Token | Section H2 | Microsoft Learn Anchor |
|---------|---------------|------------|------------------------|
| 1 | `LOB PKG` | `## LOB PKG (Managed)` | lob-apps-macos |
| 2 | `unmanaged PKG` | `## Unmanaged PKG (via Intune Agent)` | macos-unmanaged-pkg |
| 3 | `DMG` | `## DMG (via Intune Agent)` | (Intune-agent DMG workflow) |
| 4 | `Apple Developer ID Installer` | (cited in LOB PKG H2 + intro) | lob-apps-macos signing requirement |
| 5 | `VPP` | `## VPP (Microsoft 365 Native + Volume Purchased)` | vpp-apps-ios (covers macOS) |
| 6 | `Mac App Store` + `ABM` (`Apple Business Manager`) | `## Mac App Store (via ABM)` | vpp-apps-ios + ABM portal |

## Community-Pattern Callout Exact Wording (CD-06 Plan-Author Discretion)

The Installomator / Intuneomator MEDIUM-confidence callout (lines 165-185) uses the verbatim
literal `> 📋 Community pattern — MEDIUM confidence` (em-dash variant; V-55-17 accepts both
em-dash and hyphen per D-16). The callout content includes:

- **Headline blockquote line:** `> 📋 Community pattern — MEDIUM confidence`
- **Tool descriptions:** Installomator labeled as "community-OSS, MIT-licensed Bash command-line tool"; Intuneomator labeled as "Swift-based wrapper that bridges Installomator's 900+ application labels into Intune deployment workflows"
- **Non-Microsoft-supported attribution:** Three explicit statements within the blockquote — "**NOT Microsoft-supported**", "**does not endorse them as a supported delivery path**", "Microsoft Support will not assist with troubleshooting Installomator-driven app failures"
- **Link references:** GitHub paths (Installomator/Installomator + gilburns/Intuneomator) and Installomator project page (installomator.com)

## Cross-Link Decisions

| Direction | Target | Why |
|-----------|--------|-----|
| 02-macos → 00-overview.md | Platform applicability blockquote routes to overview hub | D-13 contract |
| 02-macos → 01-windows-win32-msix-scale.md / 03-ios-vpp-licensing.md / 04-android-mgp-lifecycle.md | Sibling routing in Platform applicability blockquote | D-13 contract — 3 sibling per-platform files |
| 02-macos → ../../admin-setup-macos/04-app-deployment.md | LOB PKG H2 + Related Resources | v1.2 admin walkthrough avoids duplication of Included-apps detection list + Configuration-Caused-Failures runbook table (anti-duplication; v1.2 owns the substantive deployment-walkthrough surface) |
| 02-macos → 03-ios-vpp-licensing.md (VPP H2) | iOS sibling for full reclamation 3-step workflow + device-vs-user licensing comparison | macOS file surfaces only macOS-specific 30-day grace period; broader licensing-decision support lives in iOS sibling per Phase 55 file-structure contract |
| 02-macos → ../patch-management/02-macos-update-enforcement.md | Related Resources footer | Phase 54 macOS sibling — frontmatter shape parity reference |

## Deviations from Plan

None — plan executed exactly as written. All 4 plan task-row acceptance criteria (V-55-16 / V-55-17 POSITIVE / V-55-17 NEGATIVE bare-📋 regression guard / V-55-26 + V-55-27 + V-55-30) discharged on first pass.

## Authentication Gates

None — documentation-only authoring task; no external API calls, no MS-tenant access required.

## Self-Check: PASSED

- [x] File `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` exists (created; 213 lines)
- [x] All 6 macOS app-type variants present (V-55-16): LOB PKG, unmanaged PKG, DMG, Apple Developer ID Installer, VPP, Mac App Store, ABM (+ Apple Business Manager)
- [x] `> 📋 Community pattern — MEDIUM confidence` blockquote present at line 165 (V-55-17 POSITIVE)
- [x] `Installomator` AND `Intuneomator` literals within blockquote scope lines 165-185 (V-55-17 POSITIVE scope)
- [x] No bare `> 📋` without `Community pattern` qualifier (V-55-17 NEGATIVE — `grep -cE "^> 📋 [^C]"` returns 0)
- [x] `> **Platform applicability:**` blockquote at line 9, within first 50 body lines (V-55-26)
- [x] No bare `> **Platform:**` token (V-55-27 — returns 0)
- [x] No TBD/TODO/FIXME/XXX/PLACEHOLDER tokens (V-55-30 — returns 0)
- [x] Frontmatter `platform: macOS` + `audience: admin` + `last_verified: 2026-04-28` + `review_by: 2026-06-27` + `applies_to: all` (D-19 + V-55-07)
- [x] Installomator + Intuneomator explicitly labeled community-OSS / non-Microsoft-supported (3 explicit attributions within callout)

## Atomic Commit Note

**NO COMMIT MADE.** Per CONTEXT D-21 + CDI-Phase55-05, Phase 55 ships as a single atomic commit covering all 5 new content files + 1 validator. Plan 55-07 owns the atomic commit. This plan (55-03) authored the file and stopped without `git add` / `git commit`. STATE.md and ROADMAP.md were NOT modified by this plan.

## Next Steps (Inherits to Plan 55-07 Atomic Commit Owner)

- 55-04 / 55-05 author iOS + Android per-platform sibling files (Wave 1 parallel-track)
- 55-06 authors `scripts/validation/check-phase-55.mjs` validator with V-55-NN assertions including V-55-16/17/26/27/30/31 enforcement against this file (Wave 2)
- 55-07 stages all 6 files + runs `check-phase-55.mjs` + `v1.5-milestone-audit.mjs` + `regenerate-supervision-pins.mjs --self-test` + `markdown-link-check` + creates the single atomic commit per D-21 (Wave 3)
