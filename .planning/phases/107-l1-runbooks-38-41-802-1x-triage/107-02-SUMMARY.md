---
phase: 107-l1-runbooks-38-41-802-1x-triage
plan: 02
subsystem: documentation
tags: [802.1x, l1-runbooks, triage, cross-platform, eapol, radius, server-trust, eap-negotiation]

# Dependency graph
requires:
  - phase: 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap
    provides: journalctl -u NetworkManager verified as Linux primary L1 signal; callout vocabulary census (NOTE/WARNING/DANGER/CRITICAL)
  - phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
    provides: 02-cert-delivery-foundation.md (RADIUS server-name validation section) — link target for #40 First Checks; 01-eap-method-overview.md — link target for #41 First Checks
  - plan: 107-01
    provides: Established 1C skeleton, compound frontmatter, per-platform table shape, footer pattern — #40/#41 clone directly
provides:
  - L1 runbook #40 (802.1X server trust failure): cross-platform symptom-primary triage; platform divergence (Windows trust dialog vs silent macOS/iOS); server-name-validation linked; dual D-07 routing (#33 primary + #32 cross-ref)
  - L1 runbook #41 (802.1X EAP negotiation failure): cross-platform symptom-primary triage; iOS-PEAP-PAP discriminator; iOS symptom pattern as the primary signal; EAP method overview linked; D-07 routing to #33
affects:
  - 107-l1-runbooks-38-41-802-1x-triage plan 03 (decision tree #10 can now reference all four completed runbooks)
  - Phase 108 (L2 runbooks #31-33 wire the live links referenced here in prose)
  - Phase 109 (navigation hubs — 00-index.md 802.1X section, capability matrix rows)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "1C runbook structure replicated from Plan 01: shared Symptom + Prerequisites + First Checks (All Platforms) → per-platform diagnostic-signal table → per-platform escalation notes → Escalation Criteria"
    - "#40 dual D-07 routing: escalation prose names L2 #33 as primary + L2 #32 as cross-ref (trusted-root chain mechanism); #31 named as log-collection prerequisite"
    - "#41 iOS-as-pattern-signal: no device command; symptom pattern (iOS fails, others succeed) IS the L1 diagnostic signal for PEAP inner-auth mismatch"
    - "link-not-copy enforced: #40 links RADIUS Server-Name Validation section of 02-cert-delivery-foundation.md; #41 links 01-eap-method-overview.md"

key-files:
  created:
    - docs/l1-runbooks/40-8021x-server-trust-failure.md
    - docs/l1-runbooks/41-8021x-eap-negotiation-failure.md
  modified: []

key-decisions:
  - "D-01 (locked): 1C structure applied identically to #40 and #41; structure cloned from Plan 01 pair"
  - "D-02 (locked): compound frontmatter platform: windows+macos+ios+android+linux; audience: L1; applies_to: both; 90-day freshness 2026-06-30/2026-09-28"
  - "D-05 (locked): per-platform-calibrated depth — Windows/macOS/Linux get named signal + one read-only command; iOS = portal + symptom-pattern signal; Android = adb logcat named as escalation-collected"
  - "D-06/D-07 (locked): #40 → L2 #31 → L2 #33 (primary) + L2 #32 (cross-ref), prose-only; #41 → L2 #31 → L2 #33, prose-only; no live markdown links to ../l2-runbooks/"
  - "D-07 dual routing for #40: L2 #33 named as primary (server-name validation per ROADMAP:228); L2 #32 named as cross-ref (trusted-root chain mechanism) — surfaced inline in escalation prose"
  - "D-08 (locked): docs/l1-runbooks/00-index.md NOT edited — conscious defer to Phase 109 (navigation-last per ROADMAP.md:241,243)"
  - "RESEARCH correction applied: Wired-AutoConfig/Operational used everywhere; Dot3Svc/Operational never appears"

requirements-completed: [DOT1X-09]

# Metrics
duration: 7min
completed: 2026-06-30
---

# Phase 107 Plan 02: L1 Runbooks #40 and #41 Summary

**Two cross-platform 802.1X L1 triage runbooks (server-trust failure #40 and EAP-negotiation failure #41) with five-platform diagnostic-signal tables, dual D-07 L2 routing for #40, iOS-PEAP-PAP discriminator in #41, and prose-only L2 forward-references.**

## Performance

- **Duration:** ~7 min
- **Completed:** 2026-07-01
- **Tasks:** 2 of 2
- **Files modified:** 2

## Accomplishments

- Authored L1 runbook #40 (802.1X Server Trust Failure): captured platform divergence (Windows trust dialog vs silent Apple failure); linked RADIUS Server-Name Validation to `02-cert-delivery-foundation.md` (link-not-copy); per-platform diagnostic table with exact RESEARCH-verified signal strings; D-07 dual routing prose naming L2 #33 as primary + L2 #32 as cross-ref for trusted-root chain
- Authored L1 runbook #41 (802.1X EAP Negotiation Failure): captured iOS-PEAP-PAP discriminator ("iOS fails, others succeed" is the L1 signal); linked EAP method context to `01-eap-method-overview.md` (link-not-copy); iOS cell explicitly states symptom pattern as primary signal (no device command); Android `adb logcat -s "wpa_supplicant"` named as escalation-collected with explicit do-NOT-run qualifier; D-07 routing to L2 #33
- Applied exact Windows channel corrections from RESEARCH in both files (Wired-AutoConfig/Operational, never Dot3Svc/Operational)
- Enforced per-platform calibrated depth per D-05 in both files: iOS portal-only, Android escalation-collected, macOS `log show --last 2h` fallback note, Linux journalctl
- Callout vocabulary enforced (NOTE only used; IMPORTANT never appears; no DANGER/CRITICAL needed for read-only triage content)

## Task Commits

Each task was committed atomically:

1. **Task 1: Author L1 runbook #40 — 802.1X Server Trust Failure** - `b6bd47e` (docs)
2. **Task 2: Author L1 runbook #41 — 802.1X EAP Negotiation Failure** - `d495737` (docs)

## Files Created/Modified

- `docs/l1-runbooks/40-8021x-server-trust-failure.md` — L1 #40: 802.1X server-trust/validation-failure triage; 126 lines; SC2 four-part structure; dual D-07 routing (#33 primary + #32 cross-ref)
- `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` — L1 #41: 802.1X EAP-negotiation-failure triage; 137 lines; SC2 four-part structure; iOS-PEAP-PAP discriminator; D-07 routing to #33

## Decisions Made

All decisions locked at CONTEXT.md phase-planning time (D-01 through D-08); no plan-time decisions deferred to execution:

- D-07 dual routing for #40: L2 #33 named as primary inline in escalation prose; L2 #32 surfaced as a cross-reference in the same paragraph (Claude's discretion — inline rather than See-Also, per D-07 allowance)
- iOS signal for #41: symptom pattern ("iOS fails, others succeed") explicitly named as the primary diagnostic signal in both the per-platform table and the Per-Platform Escalation Notes — consistent with D-05 (iOS = portal inspection + pattern identification; no device command exists)
- RESEARCH macOS correction applied: `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` with `--last 2h` fallback; `app-sso platform -s` never used (Pitfall 2 avoided)

## Deviations from Plan

None — plan executed exactly as written. Both files satisfy all acceptance criteria and pass all automated verify checks.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required. Pure documentation phase.

## Known Stubs

None. Both runbooks deliver complete L1 triage content. L2 links are intentionally prose-only (not stubs) — live links are Phase 108's deliverable per D-06/D-07.

## Threat Flags

None. Both files contain placeholder identifiers only (no real credentials, keys, device serials, or UPNs). T-107-01 mitigated as planned.

## Next Phase Readiness

- Plans 01 and 02 complete; all four runbooks (#38-#41) are authored and committed
- Decision tree #10 (plan 03 or later) can now reference all four runbooks via `click` directives
- Phase 108 (L2 runbooks) can wire the live links to `../l2-runbooks/31-`, `32-`, `33-` when those files are committed

## Self-Check

- [x] `docs/l1-runbooks/40-8021x-server-trust-failure.md` exists — FOUND
- [x] `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` exists — FOUND
- [x] Commit `b6bd47e` exists — FOUND
- [x] Commit `d495737` exists — FOUND

## Self-Check: PASSED

---
*Phase: 107-l1-runbooks-38-41-802-1x-triage*
*Completed: 2026-06-30*
