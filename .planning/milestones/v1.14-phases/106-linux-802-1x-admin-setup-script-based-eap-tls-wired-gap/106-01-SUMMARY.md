---
phase: 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap
plan: 01
subsystem: documentation
tags: [802.1x, linux, nmcli, networkmanager, eap-tls, intune, ubuntu]

# Dependency graph
requires:
  - phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
    provides: "01-eap-method-overview.md, 02-cert-delivery-foundation.md, _glossary-network.md -- link targets for all per-platform guides"
  - phase: 105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap
    provides: "06-android.md structural template (front-matter stamp block, WARNING callout form, Wired H2, See-Also/Change-History footer)"
provides:
  - "docs/admin-setup-8021x/07-linux.md -- Linux (Ubuntu 24.04/26.04 LTS) 802.1X EAP-TLS admin-setup guide via nmcli 802-1x.* connection parameters; platform gap leads the guide (no native Intune Wi-Fi/wired/cert profiles); satisfies DOT1X-08"
affects: [106-02, 107-l1-runbooks-8021x-triage, 108-l2-runbooks-8021x, 109-8021x-integration-capability-matrices-nav-hubs, 112-harness-bump-milestone-close]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Deepest-gap degradation of A3 Hybrid template: SC1 WARNING leads entire guide (no native Intune profile surface at all); Wired H2 collapsed to same nmcli workaround via type ethernet (not consult-network-team)"
    - "Two-column nmcli 802-1x.* reference parameter table (not three-column per-EAP sibling matrix) for EAP-TLS-only doc scope"
    - "Source-confidence/documentation-scope framing for EAP-TLS exclusivity -- never a method preference (co-equal-EAP hard constraint)"
    - "D-04 two-callout separation: SC1 HIGH-confidence WARNING leads; SC3 MEDIUM-confidence actively-developing NOTE follows workaround"

key-files:
  created:
    - docs/admin-setup-8021x/07-linux.md
  modified: []

key-decisions:
  - "D-03: Lead gap callout is WARNING tier (Referee-verified; IMPORTANT out-of-vocab; CRITICAL/DANGER hazard-reserved); double-hyphen separator --"
  - "D-04: SC1 WARNING and SC3 NOTE are two SEPARATE callouts at different positions; not merged"
  - "D-05: Ubuntu 24.04 LTS + 26.04 LTS (live-verified Flag 3 supersedes CONTEXT.md 22.04+24.04; 22.04 support ends Aug 2026)"
  - "D-06: Discrete nmcli 802-1x.* command steps + two-column reference table; NOT a full standalone runnable Bash script"
  - "D-07: Placeholder file paths only for certs (/etc/certs/*.pem); no inline private-key material; T-106-CRED mitigated"
  - "D-08: Validate-before-fleet NOTE disclaimer at workaround lead-in (MEDIUM-confidence nmcli content; not MS Learn)"
  - "D-09: PEAP-MSCHAPv2 and EAP-TTLS each get exactly one out-of-scope sentence; no nmcli config detail for either"
  - "D-10: EAP-TLS-only framed as source-confidence boundary, not preference; links co-equal 01-eap-method-overview.md"
  - "D-01/D-02: Wired H2 shows concrete nmcli type ethernet command; NOT Android's consult-network-team punt"

patterns-established:
  - "Phase 106 deepest-gap: ENTIRE guide is an OS-level workaround frame with platform gap as opening content"
  - "Wired H2 body for nmcli-covered gap: show concrete type ethernet command, not a dead-end stub"

requirements-completed: [DOT1X-08]

# Metrics
duration: 5min
completed: 2026-07-01
---

# Phase 106 Plan 01: Linux 802.1X Admin-Setup (SC1/SC2/SC3 Scaffold + Workaround) Summary

**Linux 802.1X EAP-TLS admin-setup guide (07-linux.md) authored via nmcli 802-1x.* connection parameters with no-native-Intune-profile gap leading the guide, Ubuntu 24.04/26.04 LTS, out-of-band cert prerequisites, two-column reference table, locked verification trio, and collapsed Wired H2 -- satisfying DOT1X-08**

## Performance

- **Duration:** 5 min
- **Started:** 2026-07-01T00:34:15Z
- **Completed:** 2026-07-01T00:39:05Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Authored `docs/admin-setup-8021x/07-linux.md` (186 lines) -- the fifth and final per-platform 802.1X guide, the deepest gap platform: Intune provides ZERO native Wi-Fi, wired, or cert-delivery profiles for Linux
- SC1 satisfied: guide opens with prominent `> **WARNING --` callout (not IMPORTANT/CRITICAL/DANGER) stating the gap and the OS-level nmcli workaround nature, placed before any config content
- SC2 satisfied: followable nmcli `802-1x.*` EAP-TLS steps (Wi-Fi and wired) + two-column reference parameter table + locked verification trio (`nmcli connection show`, `ip addr show`, `journalctl -u NetworkManager`)
- SC3 satisfied: PEAP-MSCHAPv2 and EAP-TTLS each get one out-of-scope sentence; separate MEDIUM-confidence "actively developing" NOTE callout with 90-day inline freshness stamp follows the workaround content
- T-106-CRED mitigated: zero `-----BEGIN` PEM blocks; all nmcli cert parameters reference placeholder file paths only
- All 10 locked CONTEXT decisions (D-01..D-10) honored

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold + lead gap WARNING + EAP scope note + applies-to + cert-prerequisites** - `6337d8b` (feat)
2. **Task 2: nmcli steps + reference table + verification trio + Wired H2 + SC3 callout + closeout** - `d84c5e6` (feat)

## Files Created/Modified

- `docs/admin-setup-8021x/07-linux.md` (CREATE, 186 lines) -- Linux Ubuntu 24.04/26.04 LTS 802.1X EAP-TLS admin-setup guide via nmcli; SC1 WARNING gap callout leads; EAP method scope note (D-09/D-10 co-equal framing); Ubuntu applies-to (D-05 live-verified); out-of-band cert prerequisites (D-07); validate-before-fleet disclaimer (D-08); nmcli Wi-Fi + wired EAP-TLS steps + two-column 802-1x.* reference table; locked verification trio; Wired H2 with concrete type ethernet command (D-01/D-02); SC3 actively-developing NOTE callout (D-04); See-Also + Change-History footer

## Decisions Made

- Ubuntu 24.04 + 26.04 (not 22.04 + 24.04): RESEARCH Flag 3 live-verified MS Learn supersession -- 22.04 not listed as supported enrollment target; support ends Aug 2026
- WARNING tier for SC1 lead callout: Referee-verified census of suite callout vocabulary -- NOTE/WARNING/DANGER/CRITICAL only; IMPORTANT not in vocabulary; CRITICAL/DANGER reserved for auth-break/lockout hazards; WARNING is the lead-callout tier for every sibling
- Two-column reference parameter table: adapts sibling three-column per-EAP matrix for EAP-TLS-only documentation scope; avoids implying co-equal PEAP/TTLS coverage
- EAP-TLS-only framing links to co-equal `01-eap-method-overview.md` and explicitly names it a source-confidence/documentation-scope boundary, not a method preference

## Deviations from Plan

None -- plan executed exactly as written. All RESEARCH-specified content, CONTEXT decisions, and PATTERNS were applied directly.

## Issues Encountered

None.

## Known Stubs

Intentional placeholder file paths per D-07 (`/etc/certs/ca-root.pem`, `/etc/certs/client-cert.pem`, `/etc/certs/private-key.pem`) and illustrative SSID/identity strings are intentional -- required by the documentation pattern for security (no real credential material). These are NOT unintended stubs; the guide explicitly labels them as illustrative placeholders and instructs operators to validate before fleet deployment (D-08).

## Threat Flags

No new security-relevant surfaces introduced. `07-linux.md` is a static Markdown documentation file. T-106-CRED (no inline credential material) is verified: `grep -- "-----BEGIN" docs/admin-setup-8021x/07-linux.md` returns 0 matches.

## Next Phase Readiness

- `07-linux.md` is complete and committed; 106-02 can proceed to fill the `00-overview.md` item-7 placeholder and log the Change-History row
- DOT1X-08 is fully delivered; Phase 107 (L1 runbooks) can consume the Linux verification trio (`journalctl -u NetworkManager`) as its log-source row

## Self-Check: PASSED

- `docs/admin-setup-8021x/07-linux.md` EXISTS (verified)
- Commit `6337d8b` EXISTS (Task 1)
- Commit `d84c5e6` EXISTS (Task 2)

---
*Phase: 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap*
*Completed: 2026-07-01*
