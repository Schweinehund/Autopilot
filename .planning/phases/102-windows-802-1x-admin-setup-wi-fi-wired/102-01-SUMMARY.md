---
phase: 102-windows-802-1x-admin-setup-wi-fi-wired
plan: "01"
subsystem: documentation
tags: [802.1x, windows, intune, wi-fi, wired, eap-tls, peap, eap-ttls, dot3svc, kb5014754]
dependency_graph:
  requires:
    - docs/admin-setup-8021x/01-eap-method-overview.md
    - docs/admin-setup-8021x/02-cert-delivery-foundation.md
    - docs/_glossary-network.md
  provides:
    - docs/admin-setup-8021x/03-windows.md
  affects:
    - docs/admin-setup-8021x/00-overview.md (platform-list entry -- Phase 102-02)
tech_stack:
  added: []
  patterns:
    - A3 per-platform guide structure (Common Mechanics -> Wi-Fi -> Wired)
    - Co-equal 3-column per-EAP-method config matrix
    - WARNING/DANGER/NOTE callout severity convention
    - Two-tier freshness stamp (file-level 90-day + inline KB callout 180-day)
    - dot3svc detect->remediate documented pattern (not productionized scripts)
    - Link-not-copy cross-references to 01- and 02-
key_files:
  created:
    - docs/admin-setup-8021x/03-windows.md
  modified: []
decisions:
  - "D-01: A3 hybrid structure with per-EAP-method matrix in each connection subsection"
  - "D-02: Wired-only concerns (dot3svc, enforcement staging, TEAP) homed once in Wired subsection"
  - "D-03: Common Mechanics links 02- rather than restating ordering rule / EKU / validation theory"
  - "D-04/D-05: dot3svc documented as detect->remediate pattern with cmdlets; no Detect-*.ps1 / Remediate-*.ps1 shipped"
  - "D-06: File-level review_by 2026-09-28 (90-day); KB5014754 callout review_by 2026-12-27 (180-day)"
  - "D-07/D-08: KB5014754 SID-in-SAN callout standalone NOTE section; cloud-only Entra Joined unaffected"
  - "D-09/D-10: Templates as primary authoring path; one-sentence Settings Catalog acknowledgment"
  - "D-11: TEAP as one-paragraph awareness note in Wired subsection; no co-equal config steps"
metrics:
  duration: "~20 min"
  completed: "2026-06-30"
  tasks: 2
  files_created: 1
  files_modified: 0
---

# Phase 102 Plan 01: Windows 802.1X Admin Setup (Wi-Fi + Wired) Summary

**One-liner:** Windows Intune 802.1X guide covering Wi-Fi and wired profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS with dot3svc Remediation pattern, enforcement-staging DANGER callout, and KB5014754 SID-in-SAN callout.

## What Was Built

Created `docs/admin-setup-8021x/03-windows.md` -- the Windows per-platform 802.1X admin-setup guide. The file follows the locked A3 structure:

1. **Common Profile Mechanics** -- authentication-mode decision table (User / Machine / User or machine / Guest), PerformServerValidation always-on guidance, anonymous outer identity (Identity privacy) for all three EAP methods, one-sentence Settings Catalog acknowledgment, link-not-copy cross-refs to `01-` and `02-`.

2. **Wi-Fi** -- `#### In Intune admin center` nav path (`Templates > Wi-Fi`), co-equal 3-column per-EAP-method matrix (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), SCEP/PKCS/Derived credential options for EAP-TLS client auth.

3. **Wired** -- `#### In Intune admin center` nav path (`Templates > Wired network`, WiredNetwork CSP), WARNING dot3svc callout with detect→remediate pattern and Intune Remediations UI path, DANGER enforcement-staging callout with staged-rollout and break-glass procedure, co-equal 3-column Wired matrix (adds PFX Import row, Disable user prompts row, Require cryptographic binding row unique to wired), TEAP one-paragraph awareness note.

4. **Hybrid Entra Joined -- Strong Certificate Mapping** -- standalone NOTE callout: KB5014754 enforcement since 2025-02-11, SID-in-SAN requirement, SCEP/PKCS SAN configuration action, cloud-only Entra Joined unaffected statement, 180-day inline freshness stamp (`review_by: 2026-12-27`).

5. **See Also** -- links to `01-`, `02-`, and `../_glossary-network.md`.

6. **Change History** -- initial-version row dated 2026-06-30.

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Scaffold + Common Profile Mechanics + Wi-Fi | 6fc703f | docs/admin-setup-8021x/03-windows.md (create) |
| 2 | Wired + dot3svc/enforcement callouts + KB5014754 + closeout | 9b822f4 | docs/admin-setup-8021x/03-windows.md (append) |

## Deviations from Plan

None -- plan executed exactly as written. All locked decisions (D-01 through D-11) honored. All threat model obligations (T-102-01 through T-102-05) satisfied.

## Success Criteria Verification

- **DOT1X-04:** Fully delivered. Windows Wi-Fi + wired 802.1X guide covering all three EAP methods with dot3svc Remediation pattern and PerformServerValidation requirement.
- **SC1:** Windows Wi-Fi 802.1X profile, three co-equal EAP methods, auth-mode decision table -- PRESENT.
- **SC2:** Windows wired profile with dot3svc dependency + Intune Remediations UI path + enforcement-staging DANGER callout -- PRESENT.
- **SC3:** SCEP / PKCS / PFX Import client-cert options + PerformServerValidation always-on requirement -- PRESENT. No `PerformServerValidation = false` example.
- **SC4:** KB5014754 Hybrid Entra Joined strong-mapping callout with SID-in-SAN content and 180-day freshness stamp -- PRESENT.

## Threat Model Obligations Fulfilled

| Threat ID | Mitigation | Location in file |
|-----------|-----------|-----------------|
| T-102-01 | PerformServerValidation always-on; no disabled-validation example; rogue-RADIUS link | Common Profile Mechanics, both matrices |
| T-102-02 | DANGER callout: Do-not-enforce-first + break-glass procedure | Wired -- 802.1X Enforcement Staging |
| T-102-03 | Identity privacy for all three EAP methods (EAP-TLS / PEAP / EAP-TTLS) | Common Profile Mechanics |
| T-102-04 | KB5014754 NOTE: SID-in-SAN, enforced 2025-02-11, 180-day stamp | Hybrid Entra Joined section |
| T-102-05 | WARNING callout: dot3svc silent-failure pattern; detect->remediate + Remediations UI path | Wired -- dot3svc Service Dependency |

## Known Stubs

None. All sections contain live content wired to the Windows 802.1X Intune configuration facts from RESEARCH.md.

## Threat Flags

None. `03-windows.md` is a static Markdown documentation file. No new network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

- `docs/admin-setup-8021x/03-windows.md` -- EXISTS (199 lines, above minimum 120)
- Commit `6fc703f` -- VERIFIED in git log
- Commit `9b822f4` -- VERIFIED in git log
- `review_by: 2026-09-28` in front-matter -- PRESENT
- `review_by: 2026-12-27` in KB5014754 callout -- PRESENT (two-tier stamp distinct)
- `## Common Profile Mechanics`, `## Wi-Fi`, `## Wired`, `## Hybrid Entra Joined -- Strong Certificate Mapping`, `## See Also`, `## Change History` -- ALL PRESENT
- `PerformServerValidation = false` -- NOT FOUND (correct)
- `Detect-*.ps1` / `Remediate-*.ps1` files -- NOT CREATED (correct; D-05)
- dot3svc, enforcement staging, TEAP -- homed only in Wired section (D-02)
- All three EAP methods co-equal in both Wi-Fi and Wired matrices (no "recommended"/"default" ranking)
