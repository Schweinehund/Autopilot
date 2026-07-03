---
phase: 104-ios-ipados-802-1x-admin-setup-wi-fi-wired
plan: 01
subsystem: docs-802.1x
tags: [802.1x, ios, ipados, intune, wi-fi, wired, eap-tls, peap, eap-ttls, mac-randomization, scep, m-series-ipad]

requires:
  - phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
    provides: "01-eap-method-overview.md, 02-cert-delivery-foundation.md, _glossary-network.md -- link targets for per-platform guides"
  - phase: 103-macos-802-1x-admin-setup-wi-fi-wired
    provides: "04-macos.md as clone scaffold; A3 Hybrid template execution; wired SCEP-only callout pattern"

provides:
  - "docs/admin-setup-8021x/05-ios.md -- iOS/iPadOS Wi-Fi + wired 802.1X admin-setup guide for all three co-equal EAP methods"
  - "DOT1X-06 fully delivered (Wi-Fi SC1 + Wired SC2 + PEAP SC3)"
  - "00-overview.md item-5 entry linking 05-ios.md; placeholder narrowed from 5-7 to 6-7"

affects:
  - "phase-107-l1-runbooks: iOS diagnostic row sourced from 05-ios.md"
  - "phase-109-integration: iOS capability-matrix 802.1X row links to 05-ios.md"
  - "phase-112-harness: check-phase-104.mjs validates 05-ios.md"

tech-stack:
  added: []
  patterns:
    - "A3 Hybrid template (Common Mechanics -> Wi-Fi -> Wired) cloned from 04-macos.md for iOS/iPadOS"
    - "Callout discipline: only research-prescribed callouts (B-05 WARNING + wired SCEP-only NOTE); MAC-rand and three-profiles as plain prose"
    - "D-12 wired hedge: live-verified iOS wired UI shows Certificates (SCEP only) for wired PEAP and EAP-TTLS -- no username/password inner auth path"

key-files:
  created:
    - docs/admin-setup-8021x/05-ios.md
  modified:
    - docs/admin-setup-8021x/00-overview.md

key-decisions:
  - "Reworded three-profiles prose to exclude the phrase 'Apple Configurator' (acceptance criteria forbids the token; D-07 exclusion concept preserved as 'Manual .mobileconfig delivery is out of scope; Intune-managed-fleet only')"
  - "D-11 cross-reference placed as standalone prose after the wired matrix and also embedded in the wired PEAP Inner-method cell"

patterns-established:
  - "iOS-specific wired matrix hedge: wired PEAP and EAP-TTLS Inner-method cells read cert-only (Templates path) -- never clone iOS Wi-Fi username/password cells to wired matrix"
  - "MAC-randomization prominent prose pattern: plain text, not blockquote, leads with exact phrasing 'Disable MAC address randomization: Yes', iOS 14+ gate, inline freshness stamp, wired-unaffected statement"

requirements-completed: [DOT1X-06]

duration: 8min
completed: 2026-06-30
---

# Phase 104 Plan 01: iOS/iPadOS 802.1X Admin Setup Summary

**iOS/iPadOS 802.1X admin-setup guide (05-ios.md) covering Wi-Fi + wired Intune profiles for EAP-TLS / PEAP / EAP-TTLS with MAC-address randomization note (iOS 14+), M-series iPad wired use case, SCEP-only wired constraint, and PEAP MS-CHAPv2 enforcement**

## Performance

- **Duration:** 8 min
- **Started:** 2026-06-30T19:16:08Z
- **Completed:** 2026-06-30T19:24:10Z
- **Tasks:** 2
- **Files modified:** 2 (1 created, 1 edited)

## Accomplishments

- Authored `docs/admin-setup-8021x/05-ios.md` (152 lines) following the locked A3 Hybrid template (Common Mechanics -> Wi-Fi -> Wired -> See Also -> Change History)
- Common Profile Mechanics: three-profiles structural prose (D-05/D-06/D-07), no-auth-mode-selector note, Server Validation homed once as security requirement (disabling = security violation), Anonymous Outer Identity for all three EAP methods
- Wi-Fi section: co-equal per-EAP matrix (EAP-TLS/PEAP/EAP-TTLS), MAC-randomization prominent plain-prose note with exact "Disable MAC address randomization: Yes" phrasing (iOS 14+, inline freshness stamp, wired-unaffected statement), B-05 "What breaks" WARNING callout (PEAP must be MS-CHAPv2; PAP causes Authentication Failed on iOS while macOS/Windows may succeed)
- Wired section: "When to use this" D-09 paragraph (M-series iPads + USB-Ethernet + classrooms/labs), SCEP-only NOTE callout, single "Any Ethernet" note, full-peer wired matrix with hedged inner-method cells (live-verified: iOS wired UI shows Certificates only for wired PEAP and EAP-TTLS), D-11 cross-reference
- All STRIDE mitigations in place: T-104-01 (server validation), T-104-02 (PEAP PAP WARNING), T-104-03 (identity privacy), T-104-04 (MAC-randomization), T-104-05 (SCEP-only NOTE)
- Updated `00-overview.md` with item-5 iOS entry, placeholder narrowed to "6-7"

## Task Commits

1. **Task 1: Scaffold + Common Profile Mechanics + Wi-Fi subsection** - `a1d596f` (docs)
2. **Task 2: Wired subsection + SCEP-only NOTE + Any Ethernet + hedged matrix + closeout** - `441d7b2` (docs)

## Files Created/Modified

- `docs/admin-setup-8021x/05-ios.md` -- iOS/iPadOS 802.1X admin-setup guide (new, 152 lines); DOT1X-06 primary deliverable
- `docs/admin-setup-8021x/00-overview.md` -- Added item-5 iOS entry; narrowed placeholder from "5-7" to "6-7"

## Decisions Made

**1. Reworded three-profiles prose to avoid "Apple Configurator" token**
- The plan acceptance criteria and verify script require `! grep -qi "apple configurator"` (treating it as a macOS-side tool name to exclude from the file)
- CONTEXT.md D-07 says to state the exclusion explicitly; the concept is preserved by writing "Manual .mobileconfig delivery is out of scope; this guide covers Intune-managed-fleet configuration only"
- This satisfies both the acceptance criteria (token absent) and D-07 (exclusion stated)

**2. D-11 cross-reference placement**
- Placed as both a standalone prose line after the wired matrix AND embedded in the wired PEAP Inner-method cell ("see Wi-Fi PEAP WARNING above") to ensure wired-only readers encounter it near the PEAP row

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Reworded three-profiles prose to exclude forbidden "Apple Configurator" token**
- **Found during:** Task 1 (Task 1 automated verify)
- **Issue:** Initial prose used "Apple Configurator is explicitly excluded" which matched the Task 1 verify's `! grep -qi "apple configurator"` negative assertion
- **Fix:** Replaced with "Manual .mobileconfig profile delivery is out of scope; this guide covers Intune-managed-fleet configuration only" -- same concept, no forbidden token
- **Files modified:** docs/admin-setup-8021x/05-ios.md
- **Verification:** Verify re-ran PASS after the edit
- **Committed in:** a1d596f (Task 1 commit, fix applied before commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 -- content wording)
**Impact on plan:** Minor wording adjustment only; all locked decisions and acceptance criteria satisfied. No scope creep.

## Issues Encountered

None beyond the Apple Configurator token fix documented above.

## Known Stubs

None -- all content is factual documentation of verified Intune UI behavior (MS Learn live-verified 2026-06-30). The wired EAP-TTLS inner method cell hedge ("verify in Intune console if username/password EAP-TTLS on wired is required") is intentional and documented in the live-verification finding (RESEARCH.md §4) -- the Templates path wired UI shows Certificates only; Settings Catalog may differ and is out of scope.

## Threat Flags

None -- no new executable surface or network endpoints introduced. This is a pure-documentation phase.

## Next Phase Readiness

- DOT1X-06 fully delivered in `docs/admin-setup-8021x/05-ios.md`
- Phase 105 (Android 802.1X) can proceed; 05-ios.md is linked from 00-overview.md item-5
- Phase 109 (Integration) can add the iOS capability-matrix 802.1X row linking to 05-ios.md

---
*Phase: 104-ios-ipados-802-1x-admin-setup-wi-fi-wired*
*Completed: 2026-06-30*
